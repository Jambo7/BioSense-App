import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'
import { getIntelligenceFeed } from '@/lib/intelligence'
import { getBioAgeUnlockStatus, getLatestBiologicalAge } from '@/lib/maturity'
import { DashboardClient } from './dashboard-client'
import { shouldShowGlucoseSurface } from '@/lib/glucose'

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
    mealsTodayRows,
    todayGlucose,
    anyGlucose,
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
    prisma.mealLog.findMany({
      where: { userId, date: today },
      select: { calories: true },
    }),
    prisma.wearableDay.findUnique({
      where: { userId_date: { userId, date: today } },
      select: { glucoseMgdl: true },
    }),
    prisma.wearableDay.findFirst({
      where: { userId, glucoseMgdl: { not: null } },
      select: { id: true },
    }),
  ])

  const connectedProviders = wearables.map((w) => w.provider)
  const glucose = {
    show: shouldShowGlucoseSurface({
      glucoseTracking: user?.glucoseTracking,
      connectedProviders,
      hasGlucoseReading: Boolean(anyGlucose || todayGlucose?.glucoseMgdl),
    }),
    todayMgdl: todayGlucose?.glucoseMgdl ?? null,
    connected:
      connectedProviders.includes('apple') || connectedProviders.includes('dexcom'),
  }

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
      connectedWearables={connectedProviders}
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
      mealsToday={{
        count: mealsTodayRows.length,
        calories: mealsTodayRows.reduce((sum, row) => sum + row.calories, 0),
      }}
      glucose={glucose}
    />
  )
}
