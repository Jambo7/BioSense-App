import { NextRequest, NextResponse } from 'next/server'
import { getRequestUser } from '@/lib/api-auth'
import { parseAppleHealthKitDays, persistAppleHealthKit } from '@/lib/apple-healthkit'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const days = parseAppleHealthKitDays(
    body && typeof body === 'object' ? (body as { days?: unknown }).days : undefined,
  )

  const dayCount = await persistAppleHealthKit(authed.id, days)
  return NextResponse.json({ success: true, dayCount })
}
