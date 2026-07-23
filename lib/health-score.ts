/**
 * Shared health-score recalculation.
 *
 * Combines today's check-in (if any) with the latest wearable metrics and
 * persists today's HealthScore. Called both when a user submits a check-in
 * and when fresh wearable data arrives via the Terra webhook — so connecting
 * a device moves the score even without a manual check-in.
 *
 * Wearable influence is tapered by DATA_HALF_LIFE_DAYS (Aspect 1 dial) so
 * stale syncs fade toward the no-wearable baseline instead of dominating.
 */
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { calcHealthScore } from '@/lib/score'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'
import { refreshBiologicalAge, wearableFreshnessWeight } from '@/lib/maturity'
import { refreshUserPatterns } from '@/lib/pattern-store'
import { recountTiers, sanitizeBloodMarkers } from '@/lib/blood-sanity'

type ScoreResult = ReturnType<typeof calcHealthScore>

function startOfToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function blendScores(withWearable: ScoreResult, withoutWearable: ScoreResult, weight: number): ScoreResult {
  const w = Math.min(1, Math.max(0, weight))
  const blend = (a: number, b: number) => Math.round(b + (a - b) * w)
  return {
    score: blend(withWearable.score, withoutWearable.score),
    breakdown: {
      sleep: blend(withWearable.breakdown.sleep, withoutWearable.breakdown.sleep),
      recovery: blend(withWearable.breakdown.recovery, withoutWearable.breakdown.recovery),
      stress: blend(withWearable.breakdown.stress, withoutWearable.breakdown.stress),
      activity: blend(withWearable.breakdown.activity, withoutWearable.breakdown.activity),
      biomarkers: blend(withWearable.breakdown.biomarkers, withoutWearable.breakdown.biomarkers),
    },
  }
}

export async function recalculateHealthScore(userId: string) {
  const today = startOfToday()

  const [checkin, wearables, latestScore, latestBlood] = await Promise.all([
    prisma.dailyCheckin.findUnique({ where: { userId_date: { userId, date: today } } }),
    prisma.wearableSync.findMany({
      where: { userId },
      select: { lastSync: true, data: true },
    }),
    prisma.healthScore.findFirst({ where: { userId }, orderBy: { date: 'desc' } }),
    prisma.bloodResult.findFirst({
      where: { userId },
      orderBy: { drawDate: 'desc' },
      select: { markers: true },
    }),
  ])

  const wearable = aggregateWearableMetrics(wearables)
  const hasWearable = Object.keys(wearable).length > 0
  const freshestSync = wearables.reduce<Date | null>((best, row) => {
    if (!row.lastSync) return best
    if (!best || row.lastSync > best) return row.lastSync
    return best
  }, null)
  const freshness = hasWearable ? wearableFreshnessWeight(freshestSync) : 0

  const personalWeights =
    (latestScore?.personalWeights as Record<string, number> | null) ?? undefined

  const checkinInput = checkin
    ? {
        energy: checkin.energy,
        sleep: checkin.sleep,
        mood: checkin.mood,
        stress: checkin.stress,
      }
    : undefined

  const rawMarkers = Array.isArray(latestBlood?.markers) ? latestBlood.markers : []
  const bloodMarkers = sanitizeBloodMarkers(rawMarkers).markers
  const bloodTiers = bloodMarkers.length > 0 ? recountTiers(bloodMarkers) : null
  const bloodInput =
    bloodTiers && bloodTiers.t1Count + bloodTiers.t2Count + bloodTiers.t3Count > 0
      ? bloodTiers
      : undefined

  const withWearable = calcHealthScore({
    checkin: checkinInput,
    wearable: hasWearable ? wearable : undefined,
    blood: bloodInput,
    personalWeights,
  })
  const withoutWearable = calcHealthScore({
    checkin: checkinInput,
    wearable: undefined,
    blood: bloodInput,
    personalWeights,
  })

  const { score, breakdown } =
    hasWearable && freshness < 1
      ? blendScores(withWearable, withoutWearable, freshness)
      : hasWearable
        ? withWearable
        : withoutWearable

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

  // Side effects: refresh patterns + bio age when unlock gates allow.
  // Failures here must not fail the score write.
  try {
    await refreshUserPatterns(userId)
  } catch (err) {
    console.error('[health-score] pattern refresh failed:', err)
  }
  try {
    await refreshBiologicalAge(userId)
  } catch (err) {
    console.error('[health-score] bio-age refresh failed:', err)
  }

  return { score, breakdown, usedWearable: hasWearable && freshness > 0, freshness }
}
