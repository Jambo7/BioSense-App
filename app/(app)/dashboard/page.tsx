import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'
import {
  getBioAgeUnlockStatus,
  getLatestBiologicalAge,
} from '@/lib/maturity'
import { getIntelligenceFeed } from '@/lib/intelligence'
import { DashboardClient } from './dashboard-client'

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 86400000)
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const userId = session.user.id

  const [
    user,
    latestCheckin,
    latestScore,
    checkinStreak,
    recentCheckins,
    latestBlood,
    wearables,
    bioUnlock,
    latestBioAge,
    scoreHistory,
    intelligence,
  ] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.dailyCheckin.findFirst({
      where: { userId },
      orderBy: { date: 'desc' },
    }),
    prisma.healthScore.findFirst({
      where: { userId },
      orderBy: { date: 'desc' },
    }),
    prisma.dailyCheckin.count({
      where: { userId },
    }),
    prisma.dailyCheckin.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 7,
    }),
    prisma.bloodResult.findFirst({
      where: { userId },
      orderBy: { drawDate: 'desc' },
    }),
    prisma.wearableSync.findMany({
      where: { userId },
    }),
    getBioAgeUnlockStatus(userId),
    getLatestBiologicalAge(userId),
    prisma.healthScore.findMany({
      where: {
        userId,
        date: { gte: daysAgo(90) },
      },
      orderBy: { date: 'asc' },
      select: { date: true, score: true },
    }),
    getIntelligenceFeed(userId),
  ])

  const today = new Date().toISOString().split('T')[0]
  const hasCheckinToday = latestCheckin
    ? new Date(latestCheckin.date).toISOString().split('T')[0] === today
    : false

  // Real trajectory: downsample score history to ≤24 points for the chart.
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
      hasCheckinToday={hasCheckinToday}
      checkinCount={checkinStreak}
      recentCheckins={recentCheckins.map((c) => ({
        date: c.date.toISOString().split('T')[0],
        energy: c.energy,
        sleep: c.sleep,
        mood: c.mood,
        stress: c.stress,
      }))}
      hasBlood={!!latestBlood}
      connectedWearables={wearables.map((w) => w.provider)}
      wearableMetrics={aggregateWearableMetrics(wearables)}
      bioAge={{
        unlocked: bioUnlock.unlocked,
        trackingDays: bioUnlock.trackingDays,
        unlockDays: bioUnlock.unlockDays,
        value: latestBioAge?.bioAge ?? null,
        deltaYears: latestBioAge?.delta ?? null,
        calendarAge: latestBioAge?.calendarAge ?? user?.age ?? null,
      }}
      scoreSeries={scoreSeries}
      scoreSeriesDays={scoreSeriesDays}
      intelligence={intelligence}
    />
  )
}
