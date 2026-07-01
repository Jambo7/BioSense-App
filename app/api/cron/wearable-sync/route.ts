/**
 * CRON endpoint — recurring wearable sync.
 *
 * Terra does not reliably poll connected providers on its own (we've seen
 * `last_polled_at: null` for days after a healthy connect). This job loops over
 * every Terra-backed WearableSync and asks Terra for the last week of data with
 * `to_webhook=true`, which makes Terra push fresh data to our webhook — the
 * webhook then stores it and recalculates the health score as usual.
 *
 * Auth accepts either:
 *   - `x-cron-secret: <CRON_SECRET>`            (GCP Cloud Scheduler — gcp/scheduler.sh)
 *   - `Authorization: Bearer <CRON_SECRET>`     (Vercel Cron — vercel.json)
 *
 * Scheduled once daily (Vercel Hobby allows at most one run per day).
 * Stale connections are also refreshed when users open the Wearables page.
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requestTerraUserData } from '@/lib/terra'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  if (req.headers.get('x-cron-secret') === secret) return true
  if (req.headers.get('authorization') === `Bearer ${secret}`) return true
  return false
}

async function handle(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.TERRA_DEV_ID || !process.env.TERRA_API_KEY) {
    console.error('[cron] wearable-sync: Terra not configured')
    return NextResponse.json({ error: 'Terra not configured' }, { status: 503 })
  }

  // A 7-day window catches any fresh data without forcing a heavy backfill.
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 7)

  const syncs = await prisma.wearableSync.findMany()

  let requested = 0
  let skipped = 0
  const results: Array<{
    userId: string
    provider: string
    ok: boolean
    types?: Array<{ type: string; status: number }>
  }> = []

  for (const sync of syncs) {
    const data = (sync.data as Record<string, unknown> | null) ?? {}
    const terraUserId = typeof data.terraUserId === 'string' ? data.terraUserId : null

    // Only Terra-backed connections can be pulled this way (skips e.g. the
    // Apple Health manual-upload path, which has no Terra user id).
    if (!terraUserId) {
      skipped++
      continue
    }

    try {
      const typeResults = await requestTerraUserData({
        terraUserId,
        startDate: start,
        endDate: end,
        toWebhook: true,
      })
      requested++
      results.push({
        userId: sync.userId,
        provider: sync.provider,
        ok: typeResults.some((t) => t.ok),
        types: typeResults.map((t) => ({ type: t.type, status: t.status })),
      })
    } catch (err) {
      console.error(`[cron] wearable-sync failed for ${sync.userId}/${sync.provider}:`, err)
      results.push({ userId: sync.userId, provider: sync.provider, ok: false })
    }
  }

  console.log(`[cron] wearable-sync: requested=${requested} skipped=${skipped}`)
  return NextResponse.json({ requested, skipped, results })
}

// Vercel Cron issues a GET; GCP Cloud Scheduler issues a POST. Support both.
export async function GET(req: NextRequest) {
  return handle(req)
}

export async function POST(req: NextRequest) {
  return handle(req)
}
