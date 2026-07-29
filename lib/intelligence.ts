/**
 * Latest Intelligence — the homepage feed engine.
 *
 * Turns real stored data (wearable days, check-ins, patterns, learned facts,
 * health score history) into persistent Insight rows. Persistence is what
 * powers the product mechanics Neil asked for:
 *   - NEW badge      → seenAt is null until the user has viewed the feed
 *   - "nothing new"  → the previous insight for a type simply stays in place
 *   - save/favourite → savedAt, surfaced later in Reports
 *
 * Every generator is deterministic and only speaks when the data clears a
 * threshold — no invented numbers, no fabricated findings. Predictions are
 * deliberately framed as projections from the user's own trend, never as
 * probability claims ("84% chance…" is not something we can honestly compute).
 */
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { backfillWearableDaysFromSyncs, getWearableDays } from '@/lib/wearable-days'

export type InsightType =
  | 'NEW_DISCOVERY'
  | 'WHATS_CHANGED'
  | 'OPPORTUNITY'
  | 'PROJECTION'
  | 'WATCH_LIST'
  | 'LONG_TERM_TREND'
  | 'LEARNED'

/** Feed render order (mirrors the homepage design). */
export const INSIGHT_TYPE_ORDER: InsightType[] = [
  'NEW_DISCOVERY',
  'WHATS_CHANGED',
  'OPPORTUNITY',
  'PROJECTION',
  'WATCH_LIST',
  'LONG_TERM_TREND',
  'LEARNED',
]

export const INSIGHT_TYPE_LABELS: Record<InsightType, string> = {
  NEW_DISCOVERY: 'New discovery',
  WHATS_CHANGED: "What's changed",
  OPPORTUNITY: 'Biggest opportunity',
  PROJECTION: 'Projection',
  WATCH_LIST: 'Watch list',
  LONG_TERM_TREND: 'Long-term trend',
  LEARNED: 'We learned more about you',
}

export interface InsightCard {
  id: string
  type: InsightType
  label: string
  title: string
  body: string
  data: Record<string, unknown> | null
  isNew: boolean
  saved: boolean
  createdAt: string
}

interface InsightCandidate {
  type: InsightType
  title: string
  body: string
  data?: Record<string, unknown>
  dedupeKey: string
}

// ── Small helpers ────────────────────────────────────────────────────────────

function isoWeekKey(d = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

function monthKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function avg(nums: number[]): number {
  return nums.reduce((s, v) => s + v, 0) / nums.length
}

function formatHours(h: number): string {
  const totalMin = Math.round(h * 60)
  const hours = Math.floor(totalMin / 60)
  const mins = totalMin % 60
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`
}

function formatMinutesDelta(hoursDelta: number): string {
  const mins = Math.round(Math.abs(hoursDelta) * 60)
  return mins >= 60 ? formatHours(Math.abs(hoursDelta)) : `${mins} min`
}

/** Least-squares slope in units per day over (dayIndex, value) points. */
function slopePerDay(points: Array<{ x: number; y: number }>): number {
  const n = points.length
  if (n < 2) return 0
  const meanX = avg(points.map((p) => p.x))
  const meanY = avg(points.map((p) => p.y))
  let num = 0
  let denom = 0
  for (const p of points) {
    num += (p.x - meanX) * (p.y - meanY)
    denom += (p.x - meanX) ** 2
  }
  return denom === 0 ? 0 : num / denom
}

type DayRow = Awaited<ReturnType<typeof getWearableDays>>[number]

function metricSeries(
  rows: DayRow[],
  field: 'hrv' | 'rhr' | 'steps' | 'sleepHours',
): Array<{ x: number; y: number; date: Date }> {
  if (rows.length === 0) return []
  const first = rows[0].date.getTime()
  return rows
    .filter((r) => r[field] != null)
    .map((r) => ({
      x: Math.round((r.date.getTime() - first) / 86400000),
      y: r[field] as number,
      date: r.date,
    }))
}

// ── Generators ───────────────────────────────────────────────────────────────

interface CheckinRow {
  date: Date
  energy: number
  sleep: number
  mood: number
  stress: number
}

function genWhatsChanged(
  days: DayRow[],
  checkins: CheckinRow[],
): InsightCandidate | null {
  const now = Date.now()
  const weekAgo = now - 7 * 86400000
  const twoWeeksAgo = now - 14 * 86400000

  interface Change {
    metric: string
    phrase: string
    salience: number
  }
  const changes: Change[] = []

  const windowed = <T extends { date: Date }>(rows: T[]) => ({
    recent: rows.filter((r) => r.date.getTime() >= weekAgo),
    prior: rows.filter(
      (r) => r.date.getTime() >= twoWeeksAgo && r.date.getTime() < weekAgo,
    ),
  })

  const wearableMetrics: Array<{
    field: 'sleepHours' | 'rhr' | 'hrv' | 'steps'
    threshold: number
    phrase: (recent: number, delta: number) => string
  }> = [
    {
      field: 'sleepHours',
      threshold: 0.25,
      phrase: (recent, delta) =>
        `you averaged ${formatHours(recent)} of sleep (${delta > 0 ? 'up' : 'down'} ${formatMinutesDelta(delta)} on the week before)`,
    },
    {
      field: 'rhr',
      threshold: 2,
      phrase: (recent, delta) =>
        `your resting heart rate averaged ${Math.round(recent)} bpm (${delta > 0 ? 'up' : 'down'} ${Math.abs(Math.round(delta))} bpm)`,
    },
    {
      field: 'hrv',
      threshold: 5,
      phrase: (recent, delta) =>
        `your HRV averaged ${Math.round(recent)} ms (${delta > 0 ? 'up' : 'down'} ${Math.abs(Math.round(delta))} ms)`,
    },
    {
      field: 'steps',
      threshold: 1200,
      phrase: (recent, delta) =>
        `you averaged ${Math.round(recent).toLocaleString()} steps a day (${delta > 0 ? 'up' : 'down'} ${Math.abs(Math.round(delta)).toLocaleString()})`,
    },
  ]

  for (const { field, threshold, phrase } of wearableMetrics) {
    const { recent, prior } = windowed(days.filter((d) => d[field] != null))
    if (recent.length < 4 || prior.length < 4) continue
    const recentAvg = avg(recent.map((d) => d[field] as number))
    const priorAvg = avg(prior.map((d) => d[field] as number))
    const delta = recentAvg - priorAvg
    if (Math.abs(delta) < threshold) continue
    changes.push({
      metric: field,
      phrase: phrase(recentAvg, delta),
      salience: Math.abs(delta) / threshold,
    })
  }

  // Fallback when no wearable history: use check-in self-reports.
  if (changes.length === 0) {
    const { recent, prior } = windowed(checkins)
    if (recent.length >= 3 && prior.length >= 3) {
      const fields: Array<{ field: keyof CheckinRow; label: string }> = [
        { field: 'energy', label: 'energy' },
        { field: 'sleep', label: 'sleep quality' },
        { field: 'stress', label: 'stress' },
      ]
      for (const { field, label } of fields) {
        const recentAvg = avg(recent.map((c) => c[field] as number))
        const priorAvg = avg(prior.map((c) => c[field] as number))
        const delta = recentAvg - priorAvg
        if (Math.abs(delta) < 0.8) continue
        changes.push({
          metric: String(field),
          phrase: `your self-reported ${label} averaged ${recentAvg.toFixed(1)}/10 (${delta > 0 ? 'up' : 'down'} ${Math.abs(delta).toFixed(1)} on the week before)`,
          salience: Math.abs(delta) / 0.8,
        })
      }
    }
  }

  if (changes.length === 0) return null
  changes.sort((a, b) => b.salience - a.salience)
  const top = changes.slice(0, 2)

  const body = `This week ${top.map((c) => c.phrase).join(', and ')}.`
  return {
    type: 'WHATS_CHANGED',
    title: top.length > 1 ? 'Two shifts in your week' : 'A shift in your week',
    body,
    data: { metrics: top.map((c) => c.metric) },
    dedupeKey: `whats_changed:${isoWeekKey()}`,
  }
}

function genWatchList(days: DayRow[]): InsightCandidate | null {
  // Rising resting HR is the clearest early "keep an eye on this" signal.
  const rhr = metricSeries(days, 'rhr')
  if (rhr.length >= 8) {
    const slope = slopePerDay(rhr)
    const spanDays = rhr[rhr.length - 1].x - rhr[0].x
    const rise = slope * spanDays
    const firstAvg = avg(rhr.slice(0, 3).map((p) => p.y))
    const lastAvg = avg(rhr.slice(-3).map((p) => p.y))
    if (rise >= 3 && lastAvg - firstAvg >= 3) {
      return {
        type: 'WATCH_LIST',
        title: 'Resting heart rate drifting up',
        body: `Your resting heart rate has been drifting upward for about ${spanDays} days — roughly ${Math.round(lastAvg - firstAvg)} bpm above where it started. Not an alarm, but worth watching: extra sleep and easier training days usually bring it back down.`,
        data: { series: rhr.map((p) => p.y), metric: 'rhr' },
        dedupeKey: `watch:rhr:${isoWeekKey()}`,
      }
    }
  }

  const hrv = metricSeries(days, 'hrv')
  if (hrv.length >= 8) {
    const slope = slopePerDay(hrv)
    const spanDays = hrv[hrv.length - 1].x - hrv[0].x
    const firstAvg = avg(hrv.slice(0, 3).map((p) => p.y))
    const lastAvg = avg(hrv.slice(-3).map((p) => p.y))
    const dropPct = firstAvg > 0 ? (firstAvg - lastAvg) / firstAvg : 0
    if (slope < 0 && dropPct >= 0.12) {
      return {
        type: 'WATCH_LIST',
        title: 'HRV trending down',
        body: `Your HRV has slipped about ${Math.round(dropPct * 100)}% over the last ${spanDays} days. That often tracks with accumulated stress or lighter sleep — worth keeping an eye on recovery this week.`,
        data: { series: hrv.map((p) => p.y), metric: 'hrv' },
        dedupeKey: `watch:hrv:${isoWeekKey()}`,
      }
    }
  }

  return null
}

interface PatternRow {
  id: string
  description: string
  confidence: string
  isNew: boolean
  discoveredAt: Date
  relatedActions: Prisma.JsonValue
}

function genNewDiscovery(patterns: PatternRow[]): InsightCandidate | null {
  const newest = patterns
    .filter((p) => p.confidence !== 'LOW')
    .sort((a, b) => b.discoveredAt.getTime() - a.discoveredAt.getTime())[0]
  if (!newest) return null
  return {
    type: 'NEW_DISCOVERY',
    title: 'A new pattern in your data',
    body: `${newest.description}. Detected from your own check-ins (${newest.confidence.toLowerCase()} confidence) — it will sharpen as more data comes in.`,
    data: { patternId: newest.id, confidence: newest.confidence },
    dedupeKey: `discovery:${newest.id}`,
  }
}

function genOpportunity(
  patterns: PatternRow[],
  discoveryPatternId: string | null,
): InsightCandidate | null {
  const ranked = patterns
    .filter((p) => {
      const actions = Array.isArray(p.relatedActions) ? p.relatedActions : []
      return p.confidence === 'HIGH' && actions.length > 0
    })
    .sort((a, b) => b.discoveredAt.getTime() - a.discoveredAt.getTime())
  // Don't show the exact same pattern twice in one feed.
  const pick = ranked.find((p) => p.id !== discoveryPatternId) ?? null
  if (!pick) return null
  const actions = (pick.relatedActions as string[]) ?? []
  return {
    type: 'OPPORTUNITY',
    title: 'Your biggest lever right now',
    body: `${pick.description}. Based on that, the highest-leverage habit for you looks like: ${actions[0].toLowerCase()}.`,
    data: { patternId: pick.id },
    dedupeKey: `opportunity:${pick.id}`,
  }
}

interface ScoreRow {
  date: Date
  score: number
}

function genProjection(scores: ScoreRow[]): InsightCandidate | null {
  if (scores.length < 5) return null
  const sorted = [...scores].sort((a, b) => a.date.getTime() - b.date.getTime())
  const spanDays =
    (sorted[sorted.length - 1].date.getTime() - sorted[0].date.getTime()) / 86400000
  if (spanDays < 21) return null

  const first = sorted[0].date.getTime()
  const slope = slopePerDay(
    sorted.map((s) => ({ x: (s.date.getTime() - first) / 86400000, y: s.score })),
  )
  const current = sorted[sorted.length - 1].score
  const projected = Math.max(0, Math.min(100, current + slope * 60))
  if (Math.abs(projected - current) < 2) return null

  const targetDate = new Date(Date.now() + 60 * 86400000)
  const dateLabel = targetDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  })
  const rising = projected > current
  return {
    type: 'PROJECTION',
    title: rising
      ? `On track for a score of ~${Math.round(projected)}`
      : 'Your trend is pointing down',
    body: `If the last few weeks continue, your Health Score is on course to reach about ${Math.round(projected)} by ${dateLabel} (from ${Math.round(current)} today). This is a projection from your own recent trend — not a promise — and it updates as your data does.`,
    data: {
      series: sorted.slice(-14).map((s) => Math.round(s.score)),
      projected: Math.round(projected),
    },
    dedupeKey: `projection:score:${monthKey()}`,
  }
}

function genLongTermTrend(
  scores: ScoreRow[],
  days: DayRow[],
): InsightCandidate | null {
  // Health score version first (most users have this the longest).
  const sorted = [...scores].sort((a, b) => a.date.getTime() - b.date.getTime())
  if (sorted.length >= 10) {
    const spanDays =
      (sorted[sorted.length - 1].date.getTime() - sorted[0].date.getTime()) / 86400000
    if (spanDays >= 56) {
      const earliest = sorted.slice(0, 5)
      const latest = sorted.slice(-5)
      const from = avg(earliest.map((s) => s.score))
      const to = avg(latest.map((s) => s.score))
      const delta = to - from
      if (Math.abs(delta) >= 3) {
        const sinceLabel = sorted[0].date.toLocaleDateString('en-GB', {
          month: 'long',
        })
        return {
          type: 'LONG_TERM_TREND',
          title: delta > 0 ? 'The long game is working' : 'Slow slide over the months',
          body: `Since ${sinceLabel}, your Health Score has moved from around ${Math.round(from)} to around ${Math.round(to)}. Long, slow shifts like this matter more than any single week.`,
          data: { series: sorted.map((s) => Math.round(s.score)), metric: 'score' },
          dedupeKey: `trend:score:${monthKey()}`,
        }
      }
    }
  }

  // Sleep version from wearable history once it's long enough.
  const sleep = metricSeries(days, 'sleepHours')
  if (sleep.length >= 20 && sleep[sleep.length - 1].x - sleep[0].x >= 56) {
    const from = avg(sleep.slice(0, 7).map((p) => p.y))
    const to = avg(sleep.slice(-7).map((p) => p.y))
    const delta = to - from
    if (Math.abs(delta) >= 0.3) {
      return {
        type: 'LONG_TERM_TREND',
        title: delta > 0 ? 'Your sleep is building' : 'Sleep has been sliding',
        body: `Over the last couple of months your average night's sleep has gone from ${formatHours(from)} to ${formatHours(to)} — ${delta > 0 ? 'up' : 'down'} ${formatMinutesDelta(delta)} a night.`,
        data: { series: sleep.map((p) => p.y), metric: 'sleepHours' },
        dedupeKey: `trend:sleep:${monthKey()}`,
      }
    }
  }

  return null
}

interface FactRow {
  id: string
  section: string
  text: string
  createdAt: Date
}

function genLearned(facts: FactRow[]): InsightCandidate | null {
  const newest = facts.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  )[0]
  if (!newest) return null
  return {
    type: 'LEARNED',
    title: 'Added to your picture',
    body: newest.text,
    data: { section: newest.section, factId: newest.id },
    dedupeKey: `learned:${newest.id}`,
  }
}

// ── Refresh + feed ───────────────────────────────────────────────────────────

const REFRESH_INTERVAL_MS = 6 * 60 * 60 * 1000

/**
 * Regenerates insights if stale (or `force`), then returns the feed:
 * the latest insight per type, in display order.
 */
export async function getIntelligenceFeed(
  userId: string,
  opts: { force?: boolean } = {},
): Promise<InsightCard[]> {
  try {
    const newest = await prisma.insight.findFirst({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true },
    })
    const stale =
      !newest || Date.now() - newest.updatedAt.getTime() > REFRESH_INTERVAL_MS
    if (stale || opts.force) {
      await refreshInsights(userId)
    }
  } catch (err) {
    // Feed reads should never take the homepage down with them.
    console.error('[intelligence] refresh failed:', err)
  }

  const rows = await prisma.insight.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  const cards: InsightCard[] = []
  for (const type of INSIGHT_TYPE_ORDER) {
    const latest = rows.find((r) => r.type === type)
    if (!latest) continue
    cards.push({
      id: latest.id,
      type,
      label: INSIGHT_TYPE_LABELS[type],
      title: latest.title,
      body: latest.body,
      data: (latest.data as Record<string, unknown> | null) ?? null,
      isNew: latest.seenAt == null,
      saved: latest.savedAt != null,
      createdAt: latest.createdAt.toISOString(),
    })
  }
  return cards
}

async function refreshInsights(userId: string): Promise<void> {
  // Mine whatever daily history the current Terra snapshots contain.
  try {
    await backfillWearableDaysFromSyncs(userId)
  } catch (err) {
    console.error('[intelligence] wearable-day backfill failed:', err)
  }

  const since90 = new Date(Date.now() - 90 * 86400000)
  const [days, checkins, patterns, facts, scores] = await Promise.all([
    getWearableDays(userId, 90),
    prisma.dailyCheckin.findMany({
      where: { userId, date: { gte: new Date(Date.now() - 21 * 86400000) } },
      orderBy: { date: 'asc' },
    }),
    prisma.pattern.findMany({
      where: { userId },
      orderBy: { discoveredAt: 'desc' },
      take: 20,
    }),
    prisma.learnedFact.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.healthScore.findMany({
      where: { userId, date: { gte: since90 } },
      orderBy: { date: 'asc' },
      select: { date: true, score: true },
    }),
  ])

  const watchDays = days.filter(
    (d) => d.date.getTime() >= Date.now() - 21 * 86400000,
  )

  const discovery = genNewDiscovery(patterns)
  const discoveryPatternId =
    (discovery?.data?.patternId as string | undefined) ?? null

  const candidates = [
    discovery,
    genWhatsChanged(days, checkins),
    genOpportunity(patterns, discoveryPatternId),
    genProjection(scores),
    genWatchList(watchDays),
    genLongTermTrend(scores, days),
    genLearned(facts),
  ].filter((c): c is InsightCandidate => c != null)

  for (const c of candidates) {
    await prisma.insight.upsert({
      where: { userId_dedupeKey: { userId, dedupeKey: c.dedupeKey } },
      create: {
        userId,
        type: c.type,
        title: c.title,
        body: c.body,
        data: (c.data ?? undefined) as Prisma.InputJsonValue | undefined,
        dedupeKey: c.dedupeKey,
      },
      // Same finding, fresher numbers: update content without resetting the
      // NEW state the user has already cleared.
      update: {
        title: c.title,
        body: c.body,
        data: (c.data ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    })
  }
}

// ── User actions ─────────────────────────────────────────────────────────────

export async function markInsightsSeen(userId: string): Promise<void> {
  await prisma.insight.updateMany({
    where: { userId, seenAt: null },
    data: { seenAt: new Date() },
  })
}

export async function setInsightSaved(
  userId: string,
  insightId: string,
  saved: boolean,
): Promise<boolean> {
  const result = await prisma.insight.updateMany({
    where: { id: insightId, userId },
    data: { savedAt: saved ? new Date() : null },
  })
  return result.count > 0
}

export async function getSavedInsights(userId: string): Promise<InsightCard[]> {
  const rows = await prisma.insight.findMany({
    where: { userId, savedAt: { not: null } },
    orderBy: { savedAt: 'desc' },
    take: 50,
  })
  return rows.map((r) => ({
    id: r.id,
    type: r.type as InsightType,
    label: INSIGHT_TYPE_LABELS[r.type as InsightType] ?? r.type,
    title: r.title,
    body: r.body,
    data: (r.data as Record<string, unknown> | null) ?? null,
    isNew: false,
    saved: true,
    createdAt: r.createdAt.toISOString(),
  }))
}
