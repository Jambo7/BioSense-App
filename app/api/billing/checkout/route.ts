import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { billingEnabled, getStripe, hasMembership, PLANS } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({
  plan: z.enum(['monthly', 'annual']),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!billingEnabled()) {
    return NextResponse.json({ error: 'Billing is not configured yet' }, { status: 501 })
  }

  const body = await req.json()
  const { plan } = schema.parse(body)
  const priceId = PLANS[plan].priceId

  if (!priceId) {
    return NextResponse.json(
      { error: 'Stripe prices are not configured yet' },
      { status: 501 },
    )
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  if (hasMembership(user.subscriptionStatus)) {
    return NextResponse.json({ error: 'You already have a membership' }, { status: 409 })
  }

  const stripe = getStripe()
  let customerId = user.stripeCustomerId
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name ?? undefined,
      metadata: { userId: session.user.id },
    })
    customerId = customer.id
    await prisma.user.update({
      where: { id: session.user.id },
      data: { stripeCustomerId: customerId },
    })
  }

  const origin = (process.env.NEXTAUTH_URL ?? '').replace(/\/$/, '')
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    client_reference_id: session.user.id,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${origin}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/upgrade`,
    metadata: { userId: session.user.id },
    subscription_data: {
      metadata: { userId: session.user.id },
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}
