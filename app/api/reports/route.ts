import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { computeStats, METRICS, type MetricSlug, type SeriesPoint } from '@/lib/trends'

const WINDOW_DAYS = 30
const iso = (d: Date) => d.toISOString().split('T')[0]

/**
 * JSON trends summary for API clients. Mirrors the server-rendered Trends
 * page: a 30-day series per metric with latest value, delta and direction,
 * plus the count of generated reports.
 */
export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const since = new Date()
  since.setDate(since.getDate() - WINDOW_DAYS)

  const [checkins, scores, weeklyCount, monthlyCount] = await Promise.all([
    prisma.dailyCheckin.findMany({
      where: { userId: authed.id, date: { gte: since } },
      orderBy: { date: 'asc' },
    }),
    prisma.healthScore.findMany({
      where: { userId: authed.id, date: { gte: since } },
      orderBy: { date: 'asc' },
    }),
    prisma.weeklyReport.count({ where: { userId: authed.id } }),
    prisma.monthlyReport.count({ where: { userId: authed.id } }),
  ])

  const seriesByMetric: Record<MetricSlug, SeriesPoint[]> = {
    score: scores.map((s) => ({ date: iso(s.date), value: s.score })),
    energy: checkins.map((c) => ({ date: iso(c.date), value: c.energy })),
    sleep: checkins.map((c) => ({ date: iso(c.date), value: c.sleep })),
    mood: checkins.map((c) => ({ date: iso(c.date), value: c.mood })),
    stress: checkins.map((c) => ({ date: iso(c.date), value: c.stress })),
  }

  const summaries = (Object.keys(METRICS) as MetricSlug[]).map((slug) => {
    const meta = METRICS[slug]
    const stats = computeStats(seriesByMetric[slug], !!meta.invert)
    return {
      slug,
      label: meta.label,
      hint: meta.hint,
      tone: meta.tone,
      unit: meta.unit,
      range: meta.range,
      values: stats.series.map((p) => p.value),
      latest: stats.latest,
      delta: stats.delta,
      improving: stats.improving,
      points: stats.series.length,
    }
  })

  return NextResponse.json({
    summaries,
    windowDays: WINDOW_DAYS,
    reportsCount: weeklyCount + monthlyCount,
  })
}
