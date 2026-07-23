/**
 * Maturity / unlock helpers driven by Aspect 1 dials in maturity-config.
 */
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { calcBiologicalAge } from '@/lib/bio-age'
import { MATURITY } from '@/lib/maturity-config'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'

const MS_PER_DAY = 86_400_000

function startOfUtcDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

function daysBetween(earlier: Date, later: Date): number {
  const a = startOfUtcDay(earlier).getTime()
  const b = startOfUtcDay(later).getTime()
  return Math.max(0, Math.floor((b - a) / MS_PER_DAY)) + 1
}

/**
 * Tracking span = days since the earliest of first check-in or first wearable
 * connection (inclusive of today). Zero if the user has no tracking data yet.
 */
export async function getTrackingDayCount(userId: string): Promise<number> {
  const [firstCheckin, firstWearable] = await Promise.all([
    prisma.dailyCheckin.findFirst({
      where: { userId },
      orderBy: { date: 'asc' },
      select: { date: true },
    }),
    prisma.wearableSync.findFirst({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: { createdAt: true },
    }),
  ])

  const starts: Date[] = []
  if (firstCheckin) starts.push(firstCheckin.date)
  if (firstWearable) starts.push(firstWearable.createdAt)
  if (starts.length === 0) return 0

  const earliest = starts.reduce((a, b) => (a.getTime() < b.getTime() ? a : b))
  return daysBetween(earliest, new Date())
}

export async function getBioAgeUnlockStatus(userId: string): Promise<{
  trackingDays: number
  unlockDays: number
  unlocked: boolean
}> {
  const trackingDays = await getTrackingDayCount(userId)
  const unlockDays = MATURITY.BIO_AGE_UNLOCK_DAYS
  return {
    trackingDays,
    unlockDays,
    unlocked: trackingDays >= unlockDays,
  }
}

/**
 * Exponential freshness weight for wearable influence.
 * ageDays == halfLife → 0.5; brand-new → ~1.
 */
export function wearableFreshnessWeight(
  lastSync: Date | null | undefined,
  halfLifeDays: number = MATURITY.DATA_HALF_LIFE_DAYS,
): number {
  if (!lastSync) return 0
  const ageDays = Math.max(0, (Date.now() - lastSync.getTime()) / MS_PER_DAY)
  return Math.pow(0.5, ageDays / halfLifeDays)
}

export async function refreshBiologicalAge(userId: string): Promise<{
  stored: boolean
  unlocked: boolean
  trackingDays: number
}> {
  const status = await getBioAgeUnlockStatus(userId)
  if (!status.unlocked) {
    return { stored: false, unlocked: false, trackingDays: status.trackingDays }
  }

  const [user, wearables, recentCheckins] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { age: true } }),
    prisma.wearableSync.findMany({
      where: { userId },
      select: { lastSync: true, data: true },
    }),
    prisma.dailyCheckin.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 14,
    }),
  ])

  const calendarAge = user?.age
  if (calendarAge == null || calendarAge < 18) {
    return { stored: false, unlocked: true, trackingDays: status.trackingDays }
  }

  const metrics = aggregateWearableMetrics(wearables)
  const sleepAvg =
    recentCheckins.length > 0
      ? recentCheckins.reduce((s, c) => s + c.sleep, 0) / recentCheckins.length
      : undefined
  const energyAvg =
    recentCheckins.length > 0
      ? recentCheckins.reduce((s, c) => s + c.energy, 0) / recentCheckins.length
      : undefined

  const signals = [metrics.hrv, metrics.rhr, sleepAvg, energyAvg].filter((v) => v != null)
  if (signals.length < MATURITY.BIO_AGE_MIN_SIGNALS) {
    return { stored: false, unlocked: true, trackingDays: status.trackingDays }
  }

  const result = calcBiologicalAge({
    calendarAge,
    hrv: metrics.hrv,
    rhr: metrics.rhr,
    sleepAvg,
    energyAvg,
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const existing = await prisma.biologicalAge.findFirst({
    where: { userId, date: today },
    select: { id: true },
  })

  const payload = {
    bioAge: result.bioAge,
    calendarAge,
    delta: result.delta,
    drivers: result.drivers as unknown as Prisma.InputJsonValue,
  }

  if (existing) {
    await prisma.biologicalAge.update({ where: { id: existing.id }, data: payload })
  } else {
    await prisma.biologicalAge.create({
      data: { userId, date: today, ...payload },
    })
  }

  return { stored: true, unlocked: true, trackingDays: status.trackingDays }
}

/** Latest biological age row for UI, if any. */
export async function getLatestBiologicalAge(userId: string) {
  return prisma.biologicalAge.findFirst({
    where: { userId },
    orderBy: { date: 'desc' },
  })
}
