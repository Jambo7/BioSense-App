import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { dailyBreakdownFromSyncData, metricsFromSyncData } from '@/lib/wearable-metrics'
import { deauthenticateTerraUser } from '@/lib/terra'

export const dynamic = 'force-dynamic'

function quality(daysWith: number, total: number, complete = false): string {
  if (daysWith <= 0) return 'Building'
  if (complete && total >= 7 && daysWith / total >= 0.75) return 'Complete'
  if (daysWith >= 5 || (total >= 7 && daysWith / total >= 0.5)) return 'Strong'
  return 'Building'
}

/**
 * Preview a single connected wearable — returns the latest normalised metrics
 * we've received from it (HRV, resting HR, steps, active minutes, sleep score)
 * plus sync timestamps, so the UI can show a small "you're connected" snapshot.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { provider } = await params

  const sync = await prisma.wearableSync.findUnique({
    where: { userId_provider: { userId: authed.id, provider } },
    select: { provider: true, lastSync: true, createdAt: true, data: true },
  })

  if (!sync) {
    return NextResponse.json({ error: 'Not connected' }, { status: 404 })
  }

  const days = dailyBreakdownFromSyncData(sync.data)
  const total = days.size
  let sleep = 0
  let hrv = 0
  let recovery = 0
  let activity = 0
  for (const m of days.values()) {
    if (m.sleepHours != null || m.sleepScore != null) sleep += 1
    if (m.hrv != null) hrv += 1
    if (m.recovery != null) recovery += 1
    if (m.steps != null || m.activeMinutes != null) activity += 1
  }

  return NextResponse.json({
    provider: sync.provider,
    connectedAt: sync.createdAt.toISOString(),
    lastSync: sync.lastSync ? sync.lastSync.toISOString() : null,
    metrics: metricsFromSyncData(sync.data),
    historyDays: total,
    coverage: {
      sleep: quality(sleep, total),
      hrv: quality(hrv, total),
      recovery: quality(recovery, total),
      activity: quality(activity, total, true),
    },
  })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { provider } = await params

  const sync = await prisma.wearableSync.findUnique({
    where: { userId_provider: { userId: authed.id, provider } },
    select: { data: true },
  })
  const data = sync?.data
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const terraUserId = (data as Record<string, unknown>).terraUserId
    if (typeof terraUserId === 'string' && terraUserId) {
      await deauthenticateTerraUser(terraUserId).catch((err) =>
        console.error('[wearables] Terra deauth failed', err),
      )
    }
  }

  await prisma.wearableSync.deleteMany({
    where: { userId: authed.id, provider },
  })

  return NextResponse.json({ success: true })
}
