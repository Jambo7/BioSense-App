'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  Leaf,
  Wind,
  TrendingUp,
  TrendingDown,
  Heart,
  BatteryCharging,
  Lock,
  Lightbulb,
  Target,
  Sparkles,
  Eye,
  Brain,
  Bookmark,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import { scoreLabel } from '@/lib/score'
import type { WearableMetrics } from '@/lib/wearable-metrics'
import type { InsightCard, InsightType } from '@/lib/intelligence'
import { Card } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'
import { IconBadge } from '@/components/ui/icon-badge'
import { SparkLine } from '@/components/ui/spark-line'
import { cn } from '@/lib/utils'

// ── Time-of-day greeting context ──────────────────────────────────────────
function timeContext() {
  const h = new Date().getHours()
  if (h < 5)  return { label: 'Late night',     Icon: Moon    }
  if (h < 12) return { label: 'Good morning',   Icon: Sunrise }
  if (h < 17) return { label: 'Good afternoon', Icon: Sun     }
  if (h < 21) return { label: 'Good evening',   Icon: Sunset  }
  return         { label: 'Evening',                Icon: Moon    }
}

// ── Greeting hero headline ────────────────────────────────────────────────
function greetingHeadline(delta: number, hasData: boolean): { lead: string; accent: string } {
  if (!hasData)    return { lead: "Let's begin",     accent: 'your health story.' }
  if (delta >= 4)  return { lead: "You're trending", accent: 'in the right direction.' }
  if (delta <= -4) return { lead: "Let's rebuild",   accent: 'some momentum.' }
  return             { lead: "You're holding",   accent: 'steady ground.' }
}

// ── Long-term trajectory copy ─────────────────────────────────────────────
function trajectoryCopy(
  score: number | null,
  trajectoryDelta: number,
): { lead: string; accent: string; body: string } {
  if (score == null) {
    return {
      lead: 'Your long-term',
      accent: 'health story starts here.',
      body: 'Once you have a few weeks of data, your overall trajectory will appear here.',
    }
  }
  if (trajectoryDelta >= 4) {
    return {
      lead: 'Your long-term health',
      accent: 'is improving.',
      body: 'Your Health Score is a wellness view of recent data — not a clinical assessment.',
    }
  }
  if (trajectoryDelta <= -4) {
    return {
      lead: 'Your long-term health',
      accent: 'is slipping.',
      body: 'Recent habits are pulling your trajectory the wrong way — small consistent changes will help.',
    }
  }
  return {
    lead: 'Your long-term health',
    accent: 'is holding steady.',
      body: 'Your Health Score is a wellness view of recent data — not a clinical assessment.',
  }
}

// ── Today's readiness copy ────────────────────────────────────────────────
function readinessCopy(score: number | null): { lead: string; accent: string; body: string } {
  if (score == null) {
    return {
      lead: 'Log your check-in to',
      accent: 'see today\'s readiness.',
      body: 'A quick four-tap check-in gives us enough to score your body\'s readiness today.',
    }
  }
  if (score >= 75) {
    return {
      lead: 'Your body is',
      accent: 'primed to perform today.',
      body: 'Sleep, HRV and stress are all in your green zone — a good day for intensity.',
    }
  }
  if (score >= 55) {
    return {
      lead: 'Your body is',
      accent: 'fairly ready today.',
      body: 'You\'re in the middle of your usual range — a moderate session is appropriate.',
    }
  }
  return {
    lead: 'Your body is slightly',
    accent: 'under-recovered today.',
    body: 'Elevated stress and inconsistent sleep timing are the main reasons.',
  }
}

// ── Types ─────────────────────────────────────────────────────────────────
type Checkin = { date: string; energy: number; sleep: number; mood: number; stress: number }
type Tone = 'sage' | 'amber' | 'rose' | 'violet' | 'sky' | 'teal' | 'ink'

interface BioAgeProps {
  unlocked: boolean
  trackingDays: number
  unlockDays: number
  value: number | null
  deltaYears: number | null
  calendarAge: number | null
}

interface DashboardClientProps {
  user: { name: string; age: number | null; goalType: string | null; goalText: string | null }
  healthScore: number | null
  scoreBreakdown: Record<string, number> | null
  hasCheckinToday: boolean
  checkinCount: number
  recentCheckins: Checkin[]
  hasBlood: boolean
  connectedWearables: string[]
  wearableMetrics: WearableMetrics
  bioAge: BioAgeProps
  /** Real Health Score history (oldest → newest), for the trajectory chart. */
  scoreSeries: number[]
  /** Days between the first and last point of scoreSeries. */
  scoreSeriesDays: number
  /** Latest Intelligence feed — persisted, deduped insights from real data. */
  intelligence: InsightCard[]
}

// Maps a 0-100 daily stress level (Garmin/Samsung scale) to a display band.
function stressBandFromLevel(level: number): string {
  if (level < 30) return 'Low'
  if (level < 60) return 'Moderate'
  return 'High'
}

// ── Latest Intelligence card styling ──────────────────────────────────────
const INSIGHT_ICONS: Record<InsightType, { icon: LucideIcon; tone: Tone }> = {
  NEW_DISCOVERY:   { icon: Lightbulb, tone: 'violet' },
  WHATS_CHANGED:   { icon: TrendingUp, tone: 'sky' },
  OPPORTUNITY:     { icon: Target, tone: 'sage' },
  PROJECTION:      { icon: Sparkles, tone: 'teal' },
  WATCH_LIST:      { icon: Eye, tone: 'amber' },
  LONG_TERM_TREND: { icon: Leaf, tone: 'sage' },
  LEARNED:         { icon: Brain, tone: 'ink' },
}

// ── Locked-preview sample data ────────────────────────────────────────────
const DEMO_CHECKINS: Checkin[] = [
  { date: '', energy: 8, sleep: 8, mood: 8, stress: 3 },
  { date: '', energy: 7, sleep: 8, mood: 7, stress: 3 },
  { date: '', energy: 8, sleep: 7, mood: 8, stress: 4 },
  { date: '', energy: 7, sleep: 7, mood: 7, stress: 4 },
  { date: '', energy: 6, sleep: 6, mood: 7, stress: 5 },
  { date: '', energy: 6, sleep: 7, mood: 6, stress: 5 },
]
const DEMO_SERIES = [58, 60, 59, 62, 63, 65, 64, 67, 69, 70, 72, 74]

// ── Component ─────────────────────────────────────────────────────────────
export function DashboardClient({
  user,
  healthScore,
  hasCheckinToday,
  checkinCount,
  recentCheckins,
  hasBlood,
  connectedWearables,
  wearableMetrics,
  bioAge: bioAgeProp,
  scoreSeries,
  scoreSeriesDays,
  intelligence,
}: DashboardClientProps) {
  // Fresh account: nothing connected, no check-ins, no blood, no score yet.
  // Keep the full dashboard but render the hero cards as a locked, blurred
  // preview seeded with sample data.
  const isNewUser =
    healthScore == null &&
    checkinCount === 0 &&
    connectedWearables.length === 0 &&
    !hasBlood

  const locked = isNewUser
  const displayScore = locked ? 74 : healthScore
  const displayCheckins = locked ? DEMO_CHECKINS : recentCheckins

  const ctx = timeContext()
  const sl = displayScore != null ? scoreLabel(displayScore) : null
  const hasData = displayScore != null

  // Trajectory delta — from real score history when we have it, otherwise
  // from the recent check-in composite.
  const longTermDelta = (() => {
    if (locked) return 6
    if (scoreSeries.length >= 3) {
      return Math.round(scoreSeries[scoreSeries.length - 1] - scoreSeries[0])
    }
    if (displayCheckins.length < 4) return 0
    const recent = displayCheckins.slice(0, 3)
    const older  = displayCheckins.slice(3, 7)
    const avgRecent = recent.reduce((s, c) => s + (c.energy + c.sleep + c.mood + (10 - c.stress)) / 4, 0) / recent.length
    const avgOlder  = older.reduce((s, c) => s + (c.energy + c.sleep + c.mood + (10 - c.stress)) / 4, 0) / older.length
    return Math.round((avgRecent - avgOlder) * 10)
  })()
  const trajectory = trajectoryCopy(displayScore, longTermDelta)
  const hero = greetingHeadline(longTermDelta, hasData)

  // Trajectory chart: real Health Score history. Demo walk only behind the
  // locked blur; real accounts with <3 points get a "still building" note.
  const series = locked ? DEMO_SERIES : scoreSeries
  const showChart = series.length >= 3

  // Biological age: real stored value after unlock gate; otherwise progress.
  const bioUnlocked = !locked && bioAgeProp.unlocked && bioAgeProp.value != null
  const bio = bioUnlocked
    ? {
        value: bioAgeProp.value!,
        deltaYears: bioAgeProp.deltaYears ?? 0,
        age: bioAgeProp.calendarAge ?? user.age ?? 0,
        locked: false as const,
        progressLabel: null as string | null,
      }
    : {
        value: null as number | null,
        deltaYears: 0,
        age: bioAgeProp.calendarAge ?? user.age,
        locked: true as const,
        progressLabel: locked
          ? `Track for ${bioAgeProp.unlockDays} days to unlock`
          : `Day ${Math.min(bioAgeProp.trackingDays, bioAgeProp.unlockDays)} of ${bioAgeProp.unlockDays}`,
      }

  // Real wearable data (when a device is connected).
  const wm = locked ? null : wearableMetrics

  // Daily readiness — a logged check-in takes priority; otherwise fall back to
  // the wearable's own recovery/readiness score.
  const latest = displayCheckins[0]
  const readiness = latest
    ? Math.round(((latest.energy + latest.sleep + latest.mood + (10 - latest.stress)) / 40) * 100)
    : wm?.recovery != null
      ? Math.round(wm.recovery)
      : null
  const readinessText = readinessCopy(readiness)

  const sleepHours =
    wm?.sleepHours ??
    (latest ? Math.round((4 + (latest.sleep / 10) * 5) * 10) / 10 : 6.7)
  const hrvMs =
    wm?.hrv != null
      ? Math.round(wm.hrv)
      : latest
        ? Math.round(36 + (10 - latest.stress) * 3.5)
        : 52
  const stressBand =
    wm?.stress != null
      ? stressBandFromLevel(wm.stress)
      : latest
        ? latest.stress <= 3.5
          ? 'Low'
          : latest.stress <= 6
            ? 'Moderate'
            : 'High'
        : 'High'
  const recoveryPct = wm?.recovery != null ? Math.round(wm.recovery) : readiness ?? 54

  return (
    <div className="space-y-5 stagger">
      {/* ── 1 / Greeting hero ───────────────────────────────────────────── */}
      <header className="pt-4 pb-5 sm:pt-5 sm:pb-6">
        <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep">
          <ctx.Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
          <span>
            {ctx.label}
            {user.name && `, ${user.name.split(' ')[0]}`}
          </span>
        </div>
        <h1 className="mt-3 font-serif text-[30px] sm:text-[40px] text-ink tracking-tight leading-[1.08]">
          {hero.lead}{' '}
          <span className="italic-accent text-sage-deep">{hero.accent}</span>
        </h1>
        <p className="mt-2.5 text-[14px] sm:text-[15px] text-ink-2 leading-snug max-w-[42ch]">
          Here&apos;s your latest health intelligence.
        </p>
      </header>

      {/* ── 2 / Long-term HEALTH SCORE ──────────────────────────────────── */}
      <Card variant="premium" padding="lg" className="relative overflow-hidden">
        <div className={cn(locked && 'blur-[3px] pointer-events-none select-none')}>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-3">
          <div className="flex items-center gap-2 min-w-0 shrink-0">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep whitespace-nowrap">
              <Leaf className="w-3 h-3" strokeWidth={2.25} />
              Health score
            </div>
            <span className="inline-flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-pill text-[10px] font-semibold uppercase tracking-wide bg-[rgba(168,191,163,0.24)] text-sage-deep">
              Long-term
            </span>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1 whitespace-nowrap text-[11.5px] font-medium text-sage-deep px-2.5 h-7 rounded-pill tile tile-hover shrink-0"
          >
            View score factors
            <ArrowRight className="w-3 h-3" strokeWidth={2.25} />
          </Link>
        </div>

        <div className="font-serif text-[24px] sm:text-[26px] text-ink leading-[1.1] tracking-tight">
          {trajectory.lead}{' '}
          <span className="italic-accent text-[1em] text-sage-deep">{trajectory.accent}</span>
        </div>
        <p className="text-caption text-ink-2 mt-1.5 leading-snug max-w-[52ch]">
          {trajectory.body}
        </p>

        {/* Stats row — two mini-stats side-by-side. */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <MiniStat
            eyebrow="Health score"
            value={hasData ? `${Math.round(displayScore!)}` : '—'}
            suffix={hasData ? '/100' : undefined}
            caption={sl?.label ?? ''}
            tone="sage"
          />
          <MiniStat
            eyebrow="Age estimate"
            value={bioUnlocked ? `${bio.value}` : '—'}
            caption={
              bioUnlocked
                ? bio.deltaYears > 0
                  ? `${bio.deltaYears.toFixed(1)} yrs younger (estimate vs ${bio.age})`
                  : bio.deltaYears < 0
                    ? `${Math.abs(bio.deltaYears).toFixed(1)} yrs older (estimate vs ${bio.age})`
                    : `Matching your age (${bio.age}) — wellness estimate`
                : (bio.progressLabel ?? 'Unlock with tracking')
            }
            tone={bioUnlocked && bio.deltaYears >= 0 ? 'sage' : 'amber'}
          />
        </div>
        <p className="text-[11px] text-ink-3 mt-2 leading-snug max-w-[52ch]">
          Age estimate is a wellness figure from your available health and wearable
          signals. It is not a clinical test or medical age.
        </p>

        {/* Trajectory chart — real Health Score history. */}
        {showChart ? (
          <div className="mt-4">
            <SparkLine
              values={series}
              width={320}
              height={110}
              tone="sage"
              showFill
              showDots
              highlightLast
              className="w-full h-auto"
            />
            <div className="flex items-center justify-between mt-1.5 text-[9.5px] uppercase tracking-[0.10em] text-ink-3">
              {locked || scoreSeriesDays >= 80 ? (
                <>
                  <span>90d ago</span>
                  <span>60d</span>
                  <span>30d</span>
                  <span>Today</span>
                </>
              ) : (
                <>
                  <span>{Math.max(scoreSeriesDays, 1)}d ago</span>
                  <span>Today</span>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-[16px] tile px-3.5 py-3 text-[12px] text-ink-2 leading-snug">
            Your trajectory chart appears once a few days of score history have
            built up — keep checking in.
          </div>
        )}

        {/* Bottom callout: key insight + weekly update meta */}
        <div className="mt-4 -mx-7 sm:-mx-8 -mb-7 sm:-mb-8 px-7 sm:px-8 py-3 bg-[linear-gradient(180deg,rgba(168,191,163,0.18)_0%,rgba(168,191,163,0.10)_100%)] border-t border-[rgba(111,143,107,0.20)] flex items-start gap-3">
          <Leaf className="w-3.5 h-3.5 text-sage-deep shrink-0 mt-0.5" strokeWidth={2.25} />
          <div className="flex-1 min-w-0 flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep">
                Key insight
              </div>
              <p className="text-[12px] text-ink-2 leading-snug mt-0.5 max-w-[52ch]">
                {longTermDelta >= 0
                  ? 'Your consistent habits are driving your trajectory in the right direction.'
                  : 'A few weeks of inconsistency are showing in your trajectory — small daily wins will turn it around.'}
              </p>
            </div>
            <div className="text-right shrink-0 hidden sm:block">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3">
                Updates with your data
              </div>
              <div className="text-[11px] text-ink-2 mt-0.5">Check-ins, wearables, blood</div>
            </div>
          </div>
        </div>
        </div>
        {locked && (
          <LockedOverlay
            title="Unlock your Health Score"
            subtitle="See your age estimate and 90-day health trajectory."
          />
        )}
      </Card>

      {/* ── 3 / Daily check-in nudge ────────────────────────────────────────
          The feed replaces the old daily-focus blocks, but check-ins remain
          the fuel for pattern detection — keep a single low-key entry point. */}
      {!locked && !hasCheckinToday && (
        <Link
          href="/checkin"
          className="group flex items-center gap-3 rounded-[20px] tile tile-hover px-4 py-3.5"
        >
          <IconBadge icon={CheckCircle2} tone="sage" variant="tint" size="md" />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-ink leading-tight">
              30-second check-in
            </div>
            <p className="text-[11.5px] text-ink-3 leading-snug mt-0.5">
              Today&apos;s check-in feeds tomorrow&apos;s discoveries.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 group-hover:text-ink-2 transition-colors" strokeWidth={2.25} />
        </Link>
      )}

      {/* ── 4 / LATEST INTELLIGENCE ─────────────────────────────────────────
          The core of the new homepage: a feed of persisted insights derived
          from the user's real data. NEW badges clear once viewed; the
          bookmark keeps an insight in the saved list (Reports page). */}
      <LatestIntelligence cards={intelligence} locked={locked} />

      {/* ── 5 / TODAY'S READINESS ───────────────────────────────────────── */}
      <Card variant="premium" padding="lg" className="relative overflow-hidden">
        <div className={cn(locked && 'blur-[3px] pointer-events-none select-none')}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep">
              <Sun className="w-3 h-3" strokeWidth={2.25} />
              Today&apos;s readiness
            </div>
            <span className="inline-flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-pill text-[10px] font-semibold uppercase tracking-wide bg-[rgba(237,198,138,0.36)] text-[#A77530]">
              Short-term
            </span>
          </div>
        </div>

        <div className="font-serif text-[22px] sm:text-[24px] text-ink leading-[1.15] tracking-tight">
          {readinessText.lead}{' '}
          <span className="italic-accent text-[1em] text-sage-deep">{readinessText.accent}</span>
        </div>
        <p className="text-caption text-ink-2 mt-1.5 leading-snug max-w-[52ch]">
          {readinessText.body}
        </p>

        <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-4 sm:gap-6 items-center">
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="relative">
              <ScoreRing
                value={readiness ?? 0}
                size={132}
                thickness={9}
                tone={readiness == null ? 'ink' : readiness >= 75 ? 'sage' : readiness >= 55 ? 'amber' : 'rose'}
                centerSize={0}
                glow
                breathe
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <div className="font-serif text-[34px] text-ink leading-none tabular-nums tracking-[-0.02em]">
                  {readiness ?? '—'}
                </div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">/100</div>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-2">
              Today&apos;s readiness
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <SubStat icon={Moon}             label="Sleep"    tone="ink"   value={`${Math.floor(sleepHours)}h ${Math.round((sleepHours % 1) * 60).toString().padStart(2,'0')}m`} arrow={sleepHours >= 7 ? 'up' : 'down'} />
            <SubStat icon={Heart}            label="HRV"      tone="sage"  value={`${hrvMs} ms`}                arrow={hrvMs >= 55 ? 'up' : 'down'} />
            <SubStat icon={Wind}             label="Stress"   tone="amber" value={stressBand}                   arrow={stressBand === 'Low' ? 'down' : 'up'} invert />
            <SubStat icon={BatteryCharging}  label="Recovery" tone="rose"  value={`${recoveryPct}%`}            arrow={recoveryPct >= 70 ? 'up' : 'down'} />
          </div>
        </div>

        <div className="mt-4 -mx-7 sm:-mx-8 -mb-7 sm:-mb-8 px-7 sm:px-8 py-3 bg-[rgba(232,226,214,0.30)] border-t border-line flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BatteryCharging className="w-3.5 h-3.5 text-ink-3" strokeWidth={2.25} />
            <span className="text-[12px] text-ink-2">Daily snapshot</span>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-sage-deep hover:underline"
          >
            View full breakdown
            <ArrowRight className="w-3 h-3" strokeWidth={2.25} />
          </Link>
        </div>
        </div>
        {locked && (
          <LockedOverlay
            title="Unlock daily readiness"
            subtitle="Know each morning whether to push hard or recover — from your sleep, HRV and stress."
          />
        )}
      </Card>
    </div>
  )
}

// ── Latest Intelligence feed ──────────────────────────────────────────────
function LatestIntelligence({
  cards,
  locked,
}: {
  cards: InsightCard[]
  locked: boolean
}) {
  const [savedIds, setSavedIds] = useState<Set<string>>(
    () => new Set(cards.filter((c) => c.saved).map((c) => c.id)),
  )

  // Clear NEW badges shortly after the feed has actually been on screen.
  // Badges stay visible for this visit; they're gone next time.
  useEffect(() => {
    if (locked || !cards.some((c) => c.isNew)) return
    const t = setTimeout(() => {
      fetch('/api/intelligence', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seen' }),
      }).catch(() => {})
    }, 4000)
    return () => clearTimeout(t)
  }, [cards, locked])

  const toggleSave = (id: string) => {
    const saving = !savedIds.has(id)
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (saving) next.add(id)
      else next.delete(id)
      return next
    })
    fetch('/api/intelligence', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: saving ? 'save' : 'unsave', id }),
    }).catch(() => {
      // Roll back on network failure so the icon doesn't lie.
      setSavedIds((prev) => {
        const next = new Set(prev)
        if (saving) next.delete(id)
        else next.add(id)
        return next
      })
    })
  }

  return (
    <Card variant="glass" padding="lg" className="relative overflow-hidden">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="text-eyebrow uppercase text-ink-3 leading-none">
            Latest intelligence
          </div>
          <p className="text-caption text-ink-2 mt-1.5 leading-snug">
            What BioSense has found in your data recently.
          </p>
        </div>
        <Link
          href="/insights"
          className="text-[12px] font-medium text-sage-deep hover:underline whitespace-nowrap shrink-0"
        >
          View all insights →
        </Link>
      </div>

      {cards.length === 0 ? (
        <div className="rounded-[20px] tile p-4 sm:p-5 flex items-start gap-3">
          <IconBadge icon={Sparkles} tone="sage" variant="tint" size="md" />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-ink leading-tight">
              Your feed is warming up
            </div>
            <p className="text-[12px] text-ink-3 leading-snug mt-1 max-w-[52ch]">
              BioSense surfaces discoveries here as your data builds — check in
              daily and keep your wearable synced, and the first insights
              usually land within a week.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5">
          {cards.map((card) => {
            const { icon, tone } = INSIGHT_ICONS[card.type] ?? {
              icon: Sparkles,
              tone: 'sage' as Tone,
            }
            const series = Array.isArray(card.data?.series)
              ? (card.data.series as number[])
              : null
            const saved = savedIds.has(card.id)
            return (
              <div
                key={card.id}
                className="rounded-[20px] tile p-4 flex items-start gap-3"
              >
                <IconBadge icon={icon} tone={tone} variant="tint" size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3">
                      {card.label}
                    </span>
                    {card.isNew && (
                      <span className="inline-flex items-center px-2 py-[1px] rounded-pill text-[9px] font-bold uppercase tracking-[0.10em] text-white bg-grad-sage shadow-button">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-[13.5px] font-semibold text-ink leading-tight mt-1.5">
                    {card.title}
                  </div>
                  <p className="text-[12px] text-ink-2 leading-snug mt-1">
                    {card.body}
                  </p>
                  {series && series.length >= 3 && (
                    <div className="mt-2.5 max-w-[220px]">
                      <SparkLine
                        values={series}
                        width={220}
                        height={34}
                        tone={tone === 'amber' ? 'amber' : 'sage'}
                        showFill
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggleSave(card.id)}
                  aria-label={saved ? 'Remove from saved insights' : 'Save this insight'}
                  className={cn(
                    'shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors',
                    saved
                      ? 'text-sage-deep bg-[rgba(168,191,163,0.24)]'
                      : 'text-ink-3 hover:text-sage-deep hover:bg-[rgba(168,191,163,0.16)]',
                  )}
                >
                  <Bookmark
                    className="w-4 h-4"
                    strokeWidth={2.25}
                    fill={saved ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

// ── Locked preview overlay ────────────────────────────────────────────────
function LockedOverlay({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center p-5 bg-[rgba(247,245,240,0.45)]">
      <div className="relative flex flex-col items-center text-center max-w-[300px]">
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/85 ring-1 ring-[rgba(111,143,107,0.22)] shadow-[0_2px_12px_rgba(26,28,26,0.10)]">
          <Lock className="w-[18px] h-[18px] text-sage-deep" strokeWidth={2.25} />
        </div>
        <div className="font-serif text-[19px] sm:text-[20px] text-ink leading-tight tracking-tight mt-3">
          {title}
        </div>
        <p className="text-[12.5px] text-ink-2 leading-snug mt-1.5">{subtitle}</p>
        <Link
          href="/wearables"
          className="inline-flex items-center gap-1.5 mt-4 px-4 h-10 rounded-pill text-white bg-grad-sage shadow-button text-[13px] font-medium hover:shadow-[var(--shadow-button-hover)] transition-shadow"
        >
          Connect a wearable
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
        </Link>
        <div className="flex items-center gap-1.5 text-[11px] text-ink-3 mt-2.5">
          <Lock className="w-3 h-3" strokeWidth={2.25} />
          Age estimate unlocks after 14 days of tracking
        </div>
      </div>
    </div>
  )
}

// ── Local helpers ─────────────────────────────────────────────────────────
function MiniStat({
  eyebrow,
  value,
  suffix,
  caption,
  tone,
}: {
  eyebrow: string
  value: string
  suffix?: string
  caption: string
  tone: 'sage' | 'amber' | 'rose'
}) {
  const captionColor =
    tone === 'sage'  ? 'text-sage-deep'
    : tone === 'amber' ? 'text-[#A77530]'
    : 'text-[#A85454]'
  return (
    <div className="rounded-[16px] tile px-3.5 py-3">
      <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-3">
        {eyebrow}
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="font-serif text-[26px] sm:text-[28px] text-ink leading-none tabular-nums tracking-[-0.02em]">
          {value}
        </span>
        {suffix && <span className="text-[11px] text-ink-3 leading-none">{suffix}</span>}
      </div>
      <div className={cn('text-[11px] mt-1 leading-snug', captionColor)}>{caption}</div>
    </div>
  )
}

function SubStat({
  icon: Icon,
  label,
  value,
  arrow,
  invert,
  tone = 'sage',
}: {
  icon: LucideIcon
  label: string
  value: string
  arrow: 'up' | 'down'
  /** For inverted metrics (e.g. Stress) the colour of the arrow flips. */
  invert?: boolean
  tone?: 'sage' | 'amber' | 'rose' | 'ink'
}) {
  const isPositive = invert ? arrow === 'down' : arrow === 'up'
  return (
    <div className="flex items-center gap-2.5">
      <IconBadge icon={Icon} tone={tone} variant="tint" size="sm" />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-[0.10em] text-ink-3 leading-none">
          {label}
        </div>
        <div className="text-[14px] font-semibold text-ink leading-tight tabular-nums mt-0.5">
          {value}
        </div>
      </div>
      {arrow === 'up' ? (
        <TrendingUp className={cn('w-3.5 h-3.5 shrink-0', isPositive ? 'text-sage-deep' : 'text-[#A85454]')} strokeWidth={2.5} />
      ) : (
        <TrendingDown className={cn('w-3.5 h-3.5 shrink-0', isPositive ? 'text-sage-deep' : 'text-[#A85454]')} strokeWidth={2.5} />
      )}
    </div>
  )
}
