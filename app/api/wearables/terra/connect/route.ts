import { NextRequest, NextResponse } from 'next/server'
import { getRequestUser } from '@/lib/api-auth'
import { TERRA_PROVIDER_SLUGS } from '@/lib/connectables'
import { generateWidgetSession } from '@/lib/terra'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const providerParam = req.nextUrl.searchParams.get('provider')?.toLowerCase()
  const slug = providerParam ? TERRA_PROVIDER_SLUGS[providerParam] : undefined
  const providers = slug ? [slug] : undefined

  const base = process.env.NEXTAUTH_URL ?? req.nextUrl.origin

  try {
    const { url } = await generateWidgetSession({
      referenceId: authed.id,
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
