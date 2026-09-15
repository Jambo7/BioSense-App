import { NextRequest, NextResponse } from 'next/server'
import { billingEnabled, getStripe, PLANS } from '@/lib/stripe'
import { clientIp, hitRateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const ALLOWED_ORIGINS = new Set([
  'https://bio-sense.ai',
  'https://www.bio-sense.ai',
])

const schema = z.object({
  plan: z.enum(['monthly', 'annual']),
  email: z.string().email().optional(),
})

function corsHeaders(req: NextRequest): HeadersInit {
  const origin = req.headers.get('origin') ?? ''
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : 'https://bio-sense.ai'
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) })
}

/** Unauthenticated checkout for the marketing site (bio-sense.ai/pricing). */
export async function POST(req: NextRequest) {
  const headers = corsHeaders(req)
  const origin = req.headers.get('origin') ?? ''
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403, headers })
  }

  if (!billingEnabled()) {
    return NextResponse.json(
      { error: 'Billing is not configured yet' },
      { status: 501, headers },
    )
  }

  const limited = await hitRateLimit({
    key: `public-checkout:${clientIp(req)}`,
    limit: 10,
    windowMs: 60 * 60 * 1000,
  })
  if (!limited.ok) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429, headers })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Choose monthly or annual' }, { status: 400, headers })
  }

  const { plan, email } = parsed.data
  const priceId = PLANS[plan].priceId
  if (!priceId) {
    return NextResponse.json({ error: 'Stripe prices are not configured yet' }, { status: 501, headers })
  }

  const appUrl = (process.env.NEXTAUTH_URL ?? 'https://bio-sense-app-navy.vercel.app').replace(/\/$/, '')
  const checkout = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/signup?joined=1`,
    cancel_url: 'https://bio-sense.ai/pricing',
    ...(email ? { customer_email: email.toLowerCase() } : {}),
    metadata: { source: 'marketing', plan },
    subscription_data: { metadata: { source: 'marketing', plan } },
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: checkout.url }, { headers })
}
