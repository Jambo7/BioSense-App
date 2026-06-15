/**
 * Shared health-score recalculation.
 *
 * Combines today's check-in (if any) with the latest wearable metrics and
 * persists today's HealthScore. Called both when a user submits a check-in
 * and when fresh wearable data arrives via the Terra webhook — so connecting
 * a device moves the score even without a manual check-in.
 */
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { calcHealthScore } from '@/lib/score'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'

function startOfToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export async function recalculateHealthScore(userId: string) {
  const today = startOfToday()

  const [checkin, wearables, latestScore] = await Promise.all([
    prisma.dailyCheckin.findUnique({ where: { userId_date: { userId, date: today } } }),
    prisma.wearableSync.findMany({
      where: { userId },
      select: { lastSync: true, data: true },
    }),
    prisma.healthScore.findFirst({ where: { userId }, orderBy: { date: 'desc' } }),
  ])

  const wearable = aggregateWearableMetrics(wearables)
  const hasWearable = Object.keys(wearable).length > 0

  const personalWeights =
    (latestScore?.personalWeights as Record<string, number> | null) ?? undefined

  const { score, breakdown } = calcHealthScore({
    checkin: checkin
      ? {
          energy: checkin.energy,
          sleep: checkin.sleep,
          mood: checkin.mood,
          stress: checkin.stress,
        }
      : undefined,
    wearable: hasWearable ? wearable : undefined,
    personalWeights,
  })

  await prisma.healthScore.upsert({
    where: { userId_date: { userId, date: today } },
    create: {
      userId,
      date: today,
      score,
      breakdown: breakdown as unknown as Prisma.InputJsonValue,
      personalWeights: (latestScore?.personalWeights ??
        null) as Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue,
    },
    update: {
      score,
      breakdown: breakdown as unknown as Prisma.InputJsonValue,
    },
  })

  return { score, breakdown, usedWearable: hasWearable }
}
