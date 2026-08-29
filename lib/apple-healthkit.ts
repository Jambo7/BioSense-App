import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { recalculateHealthScore } from '@/lib/health-score'
import { upsertWearableDays } from '@/lib/wearable-days'
import type { WearableMetrics } from '@/lib/wearable-metrics'

export interface AppleHealthKitDayInput {
  date: string
  steps?: number
  rhr?: number
  hrv?: number
  activeMinutes?: number
  sleepHours?: number
}

function isYmd(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export function parseAppleHealthKitDays(raw: unknown): AppleHealthKitDayInput[] {
  if (!Array.isArray(raw)) return []
  const out: AppleHealthKitDayInput[] = []
  for (const row of raw) {
    if (!row || typeof row !== 'object') continue
    const rec = row as Record<string, unknown>
    if (typeof rec.date !== 'string' || !isYmd(rec.date)) continue
    const num = (v: unknown) =>
      typeof v === 'number' && Number.isFinite(v) ? v : undefined
    out.push({
      date: rec.date,
      steps: num(rec.steps),
      rhr: num(rec.rhr),
      hrv: num(rec.hrv),
      activeMinutes: num(rec.activeMinutes),
      sleepHours: num(rec.sleepHours),
    })
  }
  return out
}

export async function persistAppleHealthKit(
  userId: string,
  days: AppleHealthKitDayInput[],
): Promise<number> {
  const map = new Map<string, WearableMetrics>()
  for (const d of days) {
    map.set(d.date, {
      steps: d.steps,
      rhr: d.rhr,
      hrv: d.hrv,
      activeMinutes: d.activeMinutes,
      sleepHours: d.sleepHours,
    })
  }

  await upsertWearableDays(userId, map)

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  const latest = sorted[sorted.length - 1]
  const payload = {
    source: 'healthkit',
    latest: latest
      ? {
          steps: latest.steps,
          rhr: latest.rhr,
          hrv: latest.hrv,
          activeMinutes: latest.activeMinutes,
          sleepHours: latest.sleepHours,
        }
      : {},
    days,
  }

  await prisma.wearableSync.upsert({
    where: { userId_provider: { userId, provider: 'apple' } },
    create: {
      userId,
      provider: 'apple',
      lastSync: new Date(),
      data: payload as Prisma.InputJsonValue,
    },
    update: {
      lastSync: new Date(),
      data: payload as Prisma.InputJsonValue,
    },
  })

  try {
    await recalculateHealthScore(userId)
  } catch (err) {
    console.error('[apple-healthkit] score recalc failed:', err)
  }

  return days.length
}
