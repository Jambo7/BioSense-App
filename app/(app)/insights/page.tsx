import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'
import { MATURITY } from '@/lib/maturity-config'
import { InsightsClient } from './insights-client'

/**
 * /insights — the "WHY" view.
 * Backed by real check-ins, persisted patterns, learned facts, and wearables.
 */
export default async function InsightsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const userId = session.user.id

  const [latestScore, recentCheckins, patterns, learnedFacts, wearables, checkinCount] =
    await Promise.all([
      prisma.healthScore.findFirst({
        where: { userId },
        orderBy: { date: 'desc' },
      }),
      prisma.dailyCheckin.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 7,
      }),
      prisma.pattern.findMany({
        where: { userId },
        orderBy: { discoveredAt: 'desc' },
        take: 10,
      }),
      prisma.learnedFact.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 12,
        select: { id: true, section: true, text: true },
      }),
      prisma.wearableSync.findMany({
        where: { userId },
        select: { lastSync: true, data: true, provider: true },
      }),
      prisma.dailyCheckin.count({ where: { userId } }),
    ])

  return (
    <InsightsClient
      healthScore={latestScore?.score ?? null}
      recentCheckins={recentCheckins.map((c) => ({
        date: c.date.toISOString().split('T')[0],
        energy: c.energy,
        sleep: c.sleep,
        mood: c.mood,
        stress: c.stress,
      }))}
      patterns={patterns.map((p) => ({
        id: p.id,
        type: p.type,
        description: p.description,
        confidence: p.confidence,
        scoreImpact: p.scoreImpact,
      }))}
      learnedFacts={learnedFacts}
      wearableMetrics={aggregateWearableMetrics(wearables)}
      checkinCount={checkinCount}
      patternMinCheckins={MATURITY.PATTERN_MIN_CHECKINS}
    />
  )
}
