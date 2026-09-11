import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'
import { getIntelligenceFeed } from '@/lib/intelligence'
import { getBioAgeUnlockStatus, getLatestBiologicalAge } from '@/lib/maturity'
import { DashboardClient } from './dashboard-client'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const userId = session.user.id
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [
    user,
    checkinCount,
    latestBlood,
    wearables,
    intelligence,
    todayContext,
    todayCheckin,
    learningCount,
    bioUnlock,
    latestBioAge,
  ] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.dailyCheckin.count({ where: { userId } }),
    prisma.bloodResult.findFirst({
      where: { userId },
      orderBy: { drawDate: 'desc' },
      select: { id: true },
    }),
    prisma.wearableSync.findMany({ where: { userId } }),
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
    getBioAgeUnlockStatus(userId),
    getLatestBiologicalAge(userId),
  ])

  return (
    <DashboardClient
      user={{
        name: user?.name ?? '',
        age: user?.age ?? null,
        goalType: user?.goalType ?? null,
        goalText: user?.goalText ?? null,
      }}
      hasContextToday={Boolean(todayContext || todayCheckin)}
      checkinCount={checkinCount}
      hasBlood={Boolean(latestBlood)}
      connectedWearables={wearables.map((w) => w.provider)}
      wearableMetrics={aggregateWearableMetrics(wearables)}
      intelligence={intelligence}
      learningStarted={learningCount > 0}
      hasProfile={Boolean(user?.age || (user?.goals && user.goals.length) || user?.goalText)}
      bioAge={{
        unlocked: bioUnlock.unlocked,
        trackingDays: bioUnlock.trackingDays,
        unlockDays: bioUnlock.unlockDays,
        value: latestBioAge?.bioAge ?? null,
        calendarAge: latestBioAge?.calendarAge ?? user?.age ?? null,
        delta: latestBioAge?.delta ?? null,
      }}
    />
  )
}
