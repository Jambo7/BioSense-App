/**
 * Terra connect — starts a hosted "widget session" so the logged-in user can
 * link a wearable. We pass our User.id as the reference_id so every webhook
 * Terra later sends is attributable back to this user.
 *
 * Returns { url } — the frontend opens it (new tab / redirect). On completion
 * Terra redirects back to /wearables and (separately) pushes auth + data
 * events to our webhook.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateWidgetSession } from '@/lib/terra'

export const runtime = 'nodejs'

// Map our internal wearable ids → Terra provider slugs (used to scope the
// widget to a single provider when the user clicks a specific brand).
const PROVIDER_SLUGS: Record<string, string> = {
  oura: 'OURA',
  whoop: 'WHOOP',
  garmin: 'GARMIN',
  samsung: 'SAMSUNG',
  fitbit: 'FITBIT',
  strava: 'STRAVA',
  google: 'GOOGLE',
  peloton: 'PELOTON',
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const providerParam = req.nextUrl.searchParams.get('provider')?.toLowerCase()
  const providers =
    providerParam && PROVIDER_SLUGS[providerParam] ? [PROVIDER_SLUGS[providerParam]] : undefined

  const base = process.env.NEXTAUTH_URL ?? req.nextUrl.origin

  try {
    const { url } = await generateWidgetSession({
      referenceId: session.user.id,
      successRedirectUrl: `${base}/wearables?connected=1`,
      failureRedirectUrl: `${base}/wearables?error=connect_failed`,
      providers,
    })
    return NextResponse.json({ url })
  } catch (err) {
    console.error('[terra] connect error:', err)
    const message = err instanceof Error ? err.message : 'Failed to start Terra connect'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
