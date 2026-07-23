import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'
import {
  getBioAgeUnlockStatus,
  getLatestBiologicalAge,
} from '@/lib/maturity'
import { DashboardClient } from './dashboard-client'

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
  ])

  const today = new Date().toISOString().split('T')[0]
  const hasCheckinToday = latestCheckin
    ? new Date(latestCheckin.date).toISOString().split('T')[0] === today
    : false

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
    />
  )
}
