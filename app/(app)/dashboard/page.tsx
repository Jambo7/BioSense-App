import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'
import { getIntelligenceFeed } from '@/lib/intelligence'
import { DashboardClient } from './dashboard-client'

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 86400000)
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const userId = session.user.id
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [
    user,
    latestScore,
    checkinCount,
    latestBlood,
    wearables,
    scoreHistory,
    intelligence,
    todayContext,
    todayCheckin,
    learningCount,
  ] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.healthScore.findFirst({
      where: { userId },
      orderBy: { date: 'desc' },
    }),
    prisma.dailyCheckin.count({ where: { userId } }),
    prisma.bloodResult.findFirst({
      where: { userId },
      orderBy: { drawDate: 'desc' },
      select: { id: true },
    }),
    prisma.wearableSync.findMany({ where: { userId } }),
    prisma.healthScore.findMany({
      where: { userId, date: { gte: daysAgo(90) } },
      orderBy: { date: 'asc' },
      select: { date: true, score: true },
    }),
    getIntelligenceFeed(userId),
    prisma.dayContext.findUnique({
      where: { userId_date: { userId, date: today } },
      select: { id: true },
    }),
    prisma.dailyCheckin.findUnique({
      where: { userId_date: { userId, date: today } },
      select: { id: true },
    }),
    prisma.learnedFact.count({ where: { userId } }),
  ])

  const step = Math.max(1, Math.ceil(scoreHistory.length / 24))
  const scoreSeries = scoreHistory
    .filter((_, i) => i % step === 0 || i === scoreHistory.length - 1)
    .map((s) => Math.round(s.score))
  const scoreSeriesDays =
    scoreHistory.length >= 2
      ? Math.round(
          (scoreHistory[scoreHistory.length - 1].date.getTime() -
            scoreHistory[0].date.getTime()) /
            86400000,
        )
      : 0

  return (
    <DashboardClient
      user={{
        name: user?.name ?? '',
        age: user?.age ?? null,
        goalType: user?.goalType ?? null,
        goalText: user?.goalText ?? null,
      }}
      healthScore={latestScore?.score ?? null}
      scoreBreakdown={
        (latestScore?.breakdown as Record<string, number> | null) ?? null
      }
      hasContextToday={Boolean(todayContext || todayCheckin)}
      checkinCount={checkinCount}
      hasBlood={Boolean(latestBlood)}
      connectedWearables={wearables.map((w) => w.provider)}
      wearableMetrics={aggregateWearableMetrics(wearables)}
      scoreSeries={scoreSeries}
      scoreSeriesDays={scoreSeriesDays}
      intelligence={intelligence}
      learningStarted={learningCount > 0}
      hasProfile={Boolean(user?.age || (user?.goals && user.goals.length) || user?.goalText)}
    />
  )
}
