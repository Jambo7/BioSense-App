/**
 * Shared persistence for Terra data-event payloads.
 *
 * Both delivery paths funnel through here so data is stored identically:
 *  - the webhook (Terra pushes a single event), and
 *  - the cron / nudge inline pulls (we fetch data synchronously with
 *    `to_webhook=false` to avoid the host's inbound body-size limit).
 *
 * Records are merged onto WearableSync(userId, provider) keyed by event type,
 * then the health score is refreshed once so fresh sleep/HRV/steps move the
 * number even without a manual check-in.
 */
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { recalculateHealthScore } from '@/lib/health-score'

export interface TerraTypedPayload {
  type: string
  data: unknown[] | null
}

/**
 * Upserts one or more typed payloads for a user/provider and recalculates the
 * health score a single time. Safe to call with an empty list (no-op).
 */
export async function storeTerraDataPayloads(params: {
  /** Our internal User.id (Terra reference_id). */
  referenceId: string
  provider: string
  terraUserId: string | null
  payloads: TerraTypedPayload[]
}): Promise<void> {
  const { referenceId, provider, terraUserId, payloads } = params
  if (payloads.length === 0) return

  const existing = await prisma.wearableSync.findUnique({
    where: { userId_provider: { userId: referenceId, provider } },
  })

  const prevData = (existing?.data as Record<string, unknown> | null) ?? {}
  const prevPayloads = (prevData.payloads as Record<string, unknown>) ?? {}

  const receivedAt = new Date().toISOString()
  const mergedPayloads: Record<string, unknown> = { ...prevPayloads }
  for (const { type, data } of payloads) {
    mergedPayloads[type] = { receivedAt, data: data ?? null }
  }

  const nextData: Record<string, unknown> = {
    ...prevData,
    terraUserId: terraUserId ?? prevData.terraUserId ?? null,
    provider,
    payloads: mergedPayloads,
  }

  await prisma.wearableSync.upsert({
    where: { userId_provider: { userId: referenceId, provider } },
    create: {
      userId: referenceId,
      provider,
      lastSync: new Date(),
      data: nextData as Prisma.InputJsonValue,
    },
    update: {
      lastSync: new Date(),
      data: nextData as Prisma.InputJsonValue,
    },
  })

  try {
    await recalculateHealthScore(referenceId)
  } catch (scoreErr) {
    console.error('[terra] health score recalc failed:', scoreErr)
  }
}
