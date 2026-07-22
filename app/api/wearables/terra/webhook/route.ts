/**
 * Terra webhook — receives normalised wearable data for connected users.
 *
 * Terra POSTs here whenever a user connects (auth events) or new data syncs
 * (sleep/activity/daily/etc). We verify the signature, then persist the
 * payload onto WearableSync keyed by (userId, provider).
 *
 * Supports "ping mode" for large payloads — when enabled, Terra sends a small
 * JSON with a pre-signed S3 URL instead of the full data. We download the
 * full payload from that URL. Enable via Terra dashboard → destination →
 * Delivery mode = Ping.
 *
 * CRITICAL: Terra only waits ~8s for a 2xx. S3 download + DB write + score
 * recalc regularly exceeds that and Terra records it as 5xx ("no usable
 * response"), which is what triggers the auto-disable emails. So we verify
 * the signature, ACK immediately with 200, and do the heavy work in
 * after() — the same pattern as GET /api/wearables.
 */
import { NextRequest, NextResponse, after } from 'next/server'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { getReferenceId, verifyTerraSignature, type TerraWebhookPayload } from '@/lib/terra'
import { storeTerraDataPayloads } from '@/lib/terra-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// Headroom for the post-response after() work (S3 download + DB + score).
export const maxDuration = 60

const AUTH_EVENT_TYPES = new Set([
  'auth',
  'user_reauth',
  'connection_error',
])

const DEAUTH_EVENT_TYPES = new Set(['deauth', 'access_revoked'])

type IncomingPayload = TerraWebhookPayload & { url?: string; expires_in?: number }

async function resolvePayload(initial: IncomingPayload): Promise<TerraWebhookPayload | null> {
  if (initial.type === 's3_payload' && initial.url) {
    console.log('[terra] ping mode: downloading payload from S3...')
    try {
      const s3Response = await fetch(initial.url)
      if (!s3Response.ok) {
        console.error(`[terra] failed to download S3 payload: ${s3Response.status}`)
        return null
      }
      const payload = (await s3Response.json()) as TerraWebhookPayload
      console.log('[terra] ping mode: payload downloaded successfully')
      return payload
    } catch (err) {
      console.error('[terra] failed to fetch S3 payload:', err)
      return null
    }
  }
  return initial as TerraWebhookPayload
}

async function processTerraEvent(initial: IncomingPayload): Promise<void> {
  const payload = await resolvePayload(initial)
  if (!payload) return

  const { type } = payload
  const provider = (payload.user?.provider ?? 'terra').toLowerCase()
  const terraUserId = payload.user?.user_id ?? null
  const referenceId = getReferenceId(payload)

  console.log(
    `[terra] webhook type=${type} provider=${provider} terraUser=${terraUserId} ref=${referenceId}`,
  )

  // Infra ping — nothing to store (also handled synchronously before after()).
  if (type === 'healthcheck') return

  // We can only attribute events to a user via the reference_id we set at
  // connect time (= our User.id). Without it, skip storage.
  if (!referenceId) {
    console.warn(`[terra] event type=${type} has no reference_id — skipping storage`)
    return
  }

  // The reference_id must map to a real user. Terra test/data-generator events
  // (and stale connections) can carry ids we don't recognise — skip those.
  const userExists = await prisma.user.findUnique({
    where: { id: referenceId },
    select: { id: true },
  })
  if (!userExists) {
    console.warn(
      `[terra] event type=${type} reference_id=${referenceId} is not a known user — skipping storage`,
    )
    return
  }

  if (DEAUTH_EVENT_TYPES.has(type)) {
    await prisma.wearableSync
      .delete({ where: { userId_provider: { userId: referenceId, provider } } })
      .catch(() => undefined)
    return
  }

  // Auth/connection events: record connection metadata, no data payload.
  if (AUTH_EVENT_TYPES.has(type)) {
    const existing = await prisma.wearableSync.findUnique({
      where: { userId_provider: { userId: referenceId, provider } },
    })
    const prevData = (existing?.data as Record<string, unknown> | null) ?? {}

    const nextData: Record<string, unknown> = {
      ...prevData,
      terraUserId,
      provider,
      connectedAt: prevData.connectedAt ?? new Date().toISOString(),
      lastAuthStatus: payload.status ?? type,
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
    return
  }

  // Data event: store the payload + refresh the health score via the shared
  // helper (same path used by the cron/nudge inline pulls).
  await storeTerraDataPayloads({
    referenceId,
    provider,
    terraUserId,
    payloads: [{ type, data: (payload.data as unknown[] | undefined) ?? null }],
  })
}

export async function POST(req: NextRequest) {
  // Raw body is required for signature verification — read it before parsing.
  const rawBody = await req.text()
  const signature = req.headers.get('terra-signature')
  const signingSecret = process.env.TERRA_SIGNING_SECRET

  if (signingSecret) {
    if (!verifyTerraSignature(rawBody, signature, signingSecret)) {
      console.error('[terra] webhook signature verification failed')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  } else if (process.env.NODE_ENV === 'production') {
    console.error('[terra] TERRA_SIGNING_SECRET not set in production — rejecting webhook')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 401 })
  } else {
    console.warn('[terra] TERRA_SIGNING_SECRET not set — skipping verification (dev only)')
  }

  let initialPayload: IncomingPayload
  try {
    initialPayload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Fast path for Terra's infra healthcheck — no after() needed.
  if (initialPayload.type === 'healthcheck') {
    return NextResponse.json({ ok: true })
  }

  // ACK within Terra's ~8s delivery window, then process in after() so S3
  // download / DB writes / score recalc can't surface as 5xx and trip
  // auto-disable. after() (not bare `void`) keeps the work alive on Vercel
  // after the response is sent.
  after(async () => {
    try {
      await processTerraEvent(initialPayload)
    } catch (err) {
      console.error('[terra] webhook processing error:', err)
    }
  })

  return NextResponse.json({ ok: true, accepted: true })
}

// Some Terra dashboard flows send a GET to validate the URL is reachable.
export async function GET() {
  return NextResponse.json({ ok: true, service: 'terra-webhook' })
}
