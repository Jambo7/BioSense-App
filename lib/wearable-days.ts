/**
 * Persists per-day wearable metrics into the WearableDay table.
 *
 * Terra payloads replace each other per event type on WearableSync.data, so
 * without this table there is no daily history — and no way to answer
 * "what's changed this week?" or "has resting HR been rising for 17 days?".
 *
 * Called from terra-store on every inbound payload, and from the intelligence
 * refresh as a backfill (mining whatever range the currently-stored payload
 * arrays cover).
 */
import { prisma } from '@/lib/prisma'
import {
  dailyBreakdownFromSyncData,
  type WearableMetrics,
} from '@/lib/wearable-metrics'

/** Upsert one row per date, merging non-null fields over what's stored. */
export async function upsertWearableDays(
  userId: string,
  days: Map<string, WearableMetrics>,
): Promise<void> {
  for (const [date, m] of days) {
    const fields = {
      hrv: m.hrv ?? undefined,
      rhr: m.rhr ?? undefined,
      steps: m.steps ?? undefined,
      activeMinutes: m.activeMinutes ?? undefined,
      sleepHours: m.sleepHours ?? undefined,
      sleepScore: m.sleepScore ?? undefined,
      recovery: m.recovery ?? undefined,
      stress: m.stress ?? undefined,
    }
    await prisma.wearableDay.upsert({
      where: { userId_date: { userId, date: new Date(date) } },
      create: { userId, date: new Date(date), ...fields },
      update: fields,
    })
  }
}

/** Mine all of a user's stored sync blobs into WearableDay rows. */
export async function backfillWearableDaysFromSyncs(
  userId: string,
): Promise<number> {
  const syncs = await prisma.wearableSync.findMany({
    where: { userId },
    select: { data: true },
  })
  const merged = new Map<string, WearableMetrics>()
  for (const sync of syncs) {
    for (const [date, m] of dailyBreakdownFromSyncData(sync.data)) {
      const prev = merged.get(date) ?? {}
      const next = { ...prev }
      for (const [k, v] of Object.entries(m)) {
        if (v != null) (next as Record<string, number>)[k] = v
      }
      merged.set(date, next)
    }
  }
  await upsertWearableDays(userId, merged)
  return merged.size
}

/** Fetch the last `daysBack` days of history, oldest first. */
export async function getWearableDays(userId: string, daysBack: number) {
  const since = new Date()
  since.setDate(since.getDate() - daysBack)
  return prisma.wearableDay.findMany({
    where: { userId, date: { gte: since } },
    orderBy: { date: 'asc' },
  })
}
