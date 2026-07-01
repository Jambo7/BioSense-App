import { prisma } from '@/lib/prisma'
import { requestTerraUserData } from '@/lib/terra'

/** Re-nudge Terra if a connection hasn't received data in this long. */
const STALE_MS = 6 * 60 * 60 * 1000

/**
 * For each Terra-backed WearableSync belonging to `userId`, ask Terra to push
 * the last 7 days to our webhook when the row looks stale. Terra does not
 * reliably poll providers on its own (`last_polled_at: null` is common).
 *
 * Intended to be called fire-and-forget from page/API handlers so the user
 * gets a refresh when they open Wearables without waiting for a cron.
 */
export async function nudgeStaleWearableSyncs(userId: string): Promise<void> {
  if (!process.env.TERRA_DEV_ID || !process.env.TERRA_API_KEY) return

  const syncs = await prisma.wearableSync.findMany({ where: { userId } })
  const now = Date.now()

  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 7)

  for (const sync of syncs) {
    const data = (sync.data as Record<string, unknown> | null) ?? {}
    const terraUserId = typeof data.terraUserId === 'string' ? data.terraUserId : null
    if (!terraUserId) continue

    const lastSyncMs = sync.lastSync?.getTime() ?? 0
    if (now - lastSyncMs < STALE_MS) continue

    try {
      await requestTerraUserData({
        terraUserId,
        startDate: start,
        endDate: end,
        toWebhook: true,
      })
    } catch (err) {
      console.error(`[wearable-sync] nudge failed ${userId}/${sync.provider}:`, err)
    }
  }
}
