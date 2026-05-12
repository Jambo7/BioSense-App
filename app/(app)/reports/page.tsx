import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { computeStats, METRICS, type MetricSlug, type SeriesPoint } from '@/lib/trends'
import { TrendsClient } from './trends-client'

const WINDOW_DAYS = 30

export default async function TrendsPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const since = new Date()
  since.setDate(since.getDate() - WINDOW_DAYS)

  const [checkins, scores, weeklyCount, monthlyCount] = await Promise.all([
    prisma.dailyCheckin.findMany({
      where: { userId: session.user.id, date: { gte: since } },
      orderBy: { date: 'asc' },
    }),
    prisma.healthScore.findMany({
      where: { userId: session.user.id, date: { gte: since } },
      orderBy: { date: 'asc' },
    }),
    prisma.weeklyReport.count({ where: { userId: session.user.id } }),
    prisma.monthlyReport.count({ where: { userId: session.user.id } }),
  ])

  // Build a series for each metric.
  const seriesByMetric: Record<MetricSlug, SeriesPoint[]> = {
    score:  scores.map((s) => ({ date: iso(s.date), value: s.score })),
    energy: checkins.map((c) => ({ date: iso(c.date), value: c.energy })),
    sleep:  checkins.map((c) => ({ date: iso(c.date), value: c.sleep })),
    mood:   checkins.map((c) => ({ date: iso(c.date), value: c.mood })),
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

  return (
    <TrendsClient
      summaries={summaries}
      windowDays={WINDOW_DAYS}
      reportsCount={weeklyCount + monthlyCount}
    />
  )
}

function iso(d: Date) {
  return d.toISOString().split('T')[0]
}
