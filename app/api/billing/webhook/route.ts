import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

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
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionId: session.subscription as string,
            subscriptionStatus: 'ACTIVE',
            cancelAtPeriodEnd: false,
          },
        })
      }
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const userId = await getUserIdFromCustomer(sub.customer as string)
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
      const userId = await getUserIdFromCustomer(sub.customer as string)
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
