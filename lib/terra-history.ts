import { prisma } from '@/lib/prisma'
import { requestTerraUserData } from '@/lib/terra'
import { storeTerraDataPayloads } from '@/lib/terra-store'

/** Terra answers inline for ranges up to 28 days. Longer is forced async. */
export const TERRA_INLINE_HISTORY_DAYS = 28

/**
 * Pulls the longest inline Terra window for a connected account and persists
 * it. Used on first connect and when Connections opens with a thin history.
 */
export async function pullTerraHistory(params: {
  userId: string
  provider: string
  terraUserId: string
  days?: number
}): Promise<number> {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - (params.days ?? TERRA_INLINE_HISTORY_DAYS))

  const typeResults = await requestTerraUserData({
    terraUserId: params.terraUserId,
    startDate: start,
    endDate: end,
    toWebhook: false,
  })

  const stored = typeResults
    .filter((t) => t.ok && t.data && t.data.length > 0)
    .map((t) => ({ type: t.type, data: t.data ?? null }))

  if (stored.length === 0) return 0

  await storeTerraDataPayloads({
    referenceId: params.userId,
    provider: params.provider,
    terraUserId: params.terraUserId,
    payloads: stored,
  })
  return stored.length
}

/** If we have fewer than `minDays` of persisted history, refill from Terra. */
export async function backfillTerraHistoryIfThin(
  userId: string,
  minDays = 21,
): Promise<void> {
  if (!process.env.TERRA_DEV_ID || !process.env.TERRA_API_KEY) return

  const persisted = await prisma.wearableDay.count({ where: { userId } })
  if (persisted >= minDays) return

  const syncs = await prisma.wearableSync.findMany({ where: { userId } })
  for (const sync of syncs) {
    const data = (sync.data as Record<string, unknown> | null) ?? {}
    const terraUserId = typeof data.terraUserId === 'string' ? data.terraUserId : null
    if (!terraUserId) continue
    try {
      await pullTerraHistory({
        userId,
        provider: sync.provider,
        terraUserId,
      })
    } catch (err) {
      console.error(`[terra] history backfill failed ${userId}/${sync.provider}:`, err)
    }
  }
}
