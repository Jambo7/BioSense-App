/**
 * CRON endpoint — recurring wearable sync.
 *
 * Terra does not reliably poll connected providers on its own (we've seen
 * `last_polled_at: null` for days after a healthy connect). This job loops over
 * every Terra-backed WearableSync and pulls the last week of data inline
 * (`to_webhook=false`), storing the response directly and recalculating the
 * health score. Pulling inline (rather than pushing via the webhook) avoids the
 * host's inbound request-body limit, which rejects large data days with 413.
 *
 * Auth accepts any of:
 *   - `x-cron-secret: <CRON_SECRET>`            (GCP Cloud Scheduler — gcp/scheduler.sh)
 *   - `Authorization: Bearer <CRON_SECRET>`     (Vercel Cron, when CRON_SECRET is set)
 *   - a `vercel-cron/1.0` user-agent            (Vercel's own cron invocations)
 *
 * The user-agent check means the daily job works out-of-the-box on Vercel even
 * if CRON_SECRET was never configured — which is exactly the failure mode we hit
 * (endpoint 401'd every night for a week). Set CRON_SECRET for stronger auth of
 * external callers; Vercel-originated cron requests are accepted either way.
 *
 * Scheduled once daily (Vercel Hobby allows at most one run per day).
 * Stale connections are also refreshed when users open the Wearables page.
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requestTerraUserData } from '@/lib/terra'
import { storeTerraDataPayloads } from '@/lib/terra-store'
import { isCronAuthorized } from '@/lib/cron-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

async function handle(req: NextRequest) {
  if (!isCronAuthorized(req)) {
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
      // Pull inline (to_webhook=false) and store the response directly. This
      // avoids routing large data through the webhook, whose inbound body is
      // capped at ~4.5 MB on Vercel (HTTP 413). Our window is 7 days, well
      // within Terra's 28-day inline limit.
      const typeResults = await requestTerraUserData({
        terraUserId,
        startDate: start,
        endDate: end,
        toWebhook: false,
      })

      const stored = typeResults
        .filter((t) => t.ok && t.data && t.data.length > 0)
        .map((t) => ({ type: t.type, data: t.data ?? null }))

      if (stored.length > 0) {
        await storeTerraDataPayloads({
          referenceId: sync.userId,
          provider: sync.provider,
          terraUserId,
          payloads: stored,
        })
      }

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
