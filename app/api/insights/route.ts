import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'
import { MATURITY } from '@/lib/maturity-config'

/**
 * JSON insights data for API clients. Includes real persisted patterns,
 * learned facts, and wearable metrics — no demo placeholders.
 */
export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = authed.id

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

  return NextResponse.json({
    healthScore: latestScore?.score ?? null,
    scoreBreakdown: (latestScore?.breakdown as Record<string, number> | null) ?? null,
    recentCheckins: recentCheckins.map((c) => ({
      date: c.date.toISOString().split('T')[0],
      energy: c.energy,
      sleep: c.sleep,
      mood: c.mood,
      stress: c.stress,
    })),
    patterns: patterns.map((p) => ({
      id: p.id,
      type: p.type,
      description: p.description,
      confidence: p.confidence,
      scoreImpact: p.scoreImpact,
      relatedActions: p.relatedActions,
    })),
    learnedFacts,
    wearableMetrics: aggregateWearableMetrics(wearables),
    connectedWearables: wearables.map((w) => w.provider),
    checkinCount,
    patternMinCheckins: MATURITY.PATTERN_MIN_CHECKINS,
  })
}
