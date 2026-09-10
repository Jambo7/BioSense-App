import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { MATURITY } from '@/lib/maturity-config'
import { getIntelligenceFeed } from '@/lib/intelligence'
import { Suspense } from 'react'
import { InsightsClient } from './insights-client'

export default async function InsightsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const userId = session.user.id

  const [patterns, learnedFacts, wearables, contextCount, intelligence, blood, user, learningCount] =
    await Promise.all([
      prisma.pattern.findMany({
        where: { userId },
        orderBy: { discoveredAt: 'desc' },
        take: 12,
      }),
      prisma.learnedFact.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 40,
        select: { id: true, section: true, text: true, createdAt: true, confidence: true },
      }),
      prisma.wearableSync.findMany({
        where: { userId },
        select: { provider: true, lastSync: true, data: true },
      }),
      prisma.dayContext.count({ where: { userId } }),
      getIntelligenceFeed(userId),
      prisma.bloodResult.findFirst({ where: { userId }, select: { id: true } }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { age: true, goals: true, goalText: true },
      }),
      prisma.learnedFact.count({ where: { userId } }),
    ])

  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto text-ink-3 text-sm">Loading insights…</div>}>
      <InsightsClient
        patterns={patterns.map((p) => ({
          id: p.id,
          type: p.type,
          description: p.description,
          confidence: p.confidence,
          scoreImpact: p.scoreImpact,
          discoveredAt: p.discoveredAt.toISOString(),
        }))}
        learnedFacts={learnedFacts.map((f) => ({
          id: f.id,
          section: f.section,
          text: f.text,
          createdAt: f.createdAt.toISOString(),
          confidence: f.confidence,
        }))}
        wearableConnected={wearables.length > 0}
        checkinCount={contextCount}
        patternMinCheckins={MATURITY.PATTERN_MIN_CHECKINS}
        intelligence={intelligence}
        hasBlood={Boolean(blood)}
        hasProfile={Boolean(user?.age || user?.goalText || (user?.goals && user.goals.length))}
        learningStarted={learningCount > 0}
      />
    </Suspense>
  )
}
