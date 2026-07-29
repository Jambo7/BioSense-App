/**
 * Latest Intelligence feed API.
 *
 * GET   → refresh-if-stale and return the current feed (used by mobile).
 * PATCH → user actions:
 *   { action: 'seen' }                  → clear NEW badges
 *   { action: 'save' | 'unsave', id }   → toggle a saved insight
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getRequestUser } from '@/lib/api-auth'
import {
  getIntelligenceFeed,
  markInsightsSeen,
  setInsightSaved,
} from '@/lib/intelligence'

export async function GET(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const insights = await getIntelligenceFeed(authed.id)
  return NextResponse.json({ insights })
}

const patchSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('seen') }),
  z.object({ action: z.literal('save'), id: z.string().min(1) }),
  z.object({ action: z.literal('unsave'), id: z.string().min(1) }),
])

export async function PATCH(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = patchSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const body = parsed.data
  if (body.action === 'seen') {
    await markInsightsSeen(authed.id)
    return NextResponse.json({ ok: true })
  }

  const ok = await setInsightSaved(authed.id, body.id, body.action === 'save')
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
