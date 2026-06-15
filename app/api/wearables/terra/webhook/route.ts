/**
 * Terra webhook — receives normalised wearable data for connected users.
 *
 * Terra POSTs here whenever a user connects (auth events) or new data syncs
 * (sleep/activity/daily/etc). We verify the signature, then persist the
 * payload onto WearableSync keyed by (userId, provider).
 *
 * Stage 1 goal: prove the pipe works — verify + store + log. Mapping the
 * stored payloads into the health score (lib/score.ts) is Stage 3.
 */
import { NextRequest, NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { recalculateHealthScore } from '@/lib/health-score'
import { getReferenceId, verifyTerraSignature, type TerraWebhookPayload } from '@/lib/terra'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const AUTH_EVENT_TYPES = new Set([
  'auth',
  'user_reauth',
  'connection_error',
])

const DEAUTH_EVENT_TYPES = new Set(['deauth', 'access_revoked'])

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

  let payload: TerraWebhookPayload
  try {
    payload = JSON.parse(rawBody) as TerraWebhookPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { type } = payload
  const provider = (payload.user?.provider ?? 'terra').toLowerCase()
  const terraUserId = payload.user?.user_id ?? null
  const referenceId = getReferenceId(payload)

  console.log(
    `[terra] webhook type=${type} provider=${provider} terraUser=${terraUserId} ref=${referenceId}`,
  )

  // Infra ping — nothing to store.
  if (type === 'healthcheck') {
    return NextResponse.json({ ok: true })
  }

  // We can only attribute events to a user via the reference_id we set at
  // connect time (= our User.id). Without it, acknowledge so Terra doesn't
  // retry, but skip storage.
  if (!referenceId) {
    console.warn(`[terra] event type=${type} has no reference_id — skipping storage`)
    return NextResponse.json({ ok: true, stored: false, reason: 'no_reference_id' })
  }

  // The reference_id must map to a real user. Terra test/data-generator events
  // (and stale connections) can carry ids we don't recognise — acknowledge
  // those with 200 so Terra doesn't retry, but skip storage.
  const userExists = await prisma.user.findUnique({
    where: { id: referenceId },
    select: { id: true },
  })
  if (!userExists) {
    console.warn(`[terra] event type=${type} reference_id=${referenceId} is not a known user — skipping storage`)
    return NextResponse.json({ ok: true, stored: false, reason: 'unknown_user' })
  }

  try {
    if (DEAUTH_EVENT_TYPES.has(type)) {
      await prisma.wearableSync
        .delete({ where: { userId_provider: { userId: referenceId, provider } } })
        .catch(() => undefined)
      return NextResponse.json({ ok: true, disconnected: true })
    }

    const isAuthEvent = AUTH_EVENT_TYPES.has(type)
    const existing = await prisma.wearableSync.findUnique({
      where: { userId_provider: { userId: referenceId, provider } },
    })

    const prevData = (existing?.data as Record<string, unknown> | null) ?? {}
    const prevPayloads = (prevData.payloads as Record<string, unknown>) ?? {}

    const nextData: Record<string, unknown> = {
      ...prevData,
      terraUserId,
      provider,
      // Keep the latest payload per event type for inspection / later mapping.
      payloads: isAuthEvent
        ? prevPayloads
        : { ...prevPayloads, [type]: { receivedAt: new Date().toISOString(), data: payload.data ?? null } },
    }
    if (isAuthEvent) {
      nextData.connectedAt = prevData.connectedAt ?? new Date().toISOString()
      nextData.lastAuthStatus = payload.status ?? type
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

    // Fresh wearable data → refresh the user's health score so connected
    // sleep/HRV/steps move the number even without a manual check-in.
    if (!isAuthEvent) {
      try {
        await recalculateHealthScore(referenceId)
      } catch (scoreErr) {
        console.error('[terra] health score recalc failed:', scoreErr)
      }
    }

    return NextResponse.json({ ok: true, stored: true })
  } catch (err) {
    console.error('[terra] webhook processing error:', err)
    // Return 500 so Terra retries with backoff rather than dropping the event.
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}

// Some Terra dashboard flows send a GET to validate the URL is reachable.
export async function GET() {
  return NextResponse.json({ ok: true, service: 'terra-webhook' })
}
