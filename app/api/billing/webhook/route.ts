import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { activateMembership, checkoutEmail } from '@/lib/billing'
import Stripe from 'stripe'

export async function GET() {
  return NextResponse.json({
    ok: true,
    message:
      'This is the Stripe webhook endpoint. Stripe sends POST events here. It is not a page, and billing for members happens on https://bio-sense.ai/pricing',
  })
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''
  const stripe = getStripe()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? '',
    )
  } catch (err) {
    console.error('Stripe webhook error:', err)
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 })
  }

  const seen = await prisma.processedWebhook.findUnique({
    where: { id: `stripe:${event.id}` },
  })
  if (seen) return NextResponse.json({ received: true, duplicate: true })

  switch (event.type) {
    case 'checkout.session.completed': {
      const checkout = event.data.object as Stripe.Checkout.Session
      const customerId =
        typeof checkout.customer === 'string'
          ? checkout.customer
          : checkout.customer?.id
      const subscriptionId =
        typeof checkout.subscription === 'string'
          ? checkout.subscription
          : checkout.subscription?.id
      await activateMembership({
        userId: checkout.metadata?.userId || null,
        email: checkoutEmail(checkout),
        customerId: customerId ?? null,
        subscriptionId: subscriptionId ?? null,
      })
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const userId =
        sub.metadata?.userId ||
        (await getUserIdFromCustomer(sub.customer as string))
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionId: sub.id,
            cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end),
            subscriptionStatus:
              sub.status === 'active' || sub.status === 'trialing'
                ? 'ACTIVE'
                : sub.status === 'past_due'
                  ? 'PAST_DUE'
                  : 'CANCELLED',
          },
        })
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const customerId =
        typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
      if (customerId) {
        const userId = await getUserIdFromCustomer(customerId)
        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: { subscriptionStatus: 'PAST_DUE' },
          })
        }
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const userId =
        sub.metadata?.userId ||
        (await getUserIdFromCustomer(sub.customer as string))
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionStatus: 'CANCELLED',
            subscriptionId: null,
            cancelAtPeriodEnd: false,
          },
        })
      }
      break
    }
  }

  await prisma.processedWebhook.create({
    data: { id: `stripe:${event.id}`, source: 'stripe' },
  })

  return NextResponse.json({ received: true })
}

async function getUserIdFromCustomer(customerId: string): Promise<string | null> {
  const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } })
  return user?.id ?? null
}
