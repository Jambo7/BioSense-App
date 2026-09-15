import { prisma } from '@/lib/prisma'
import { billingEnabled, getStripe } from '@/lib/stripe'
import Stripe from 'stripe'

export const MARKETING_PRICING_URL = 'https://bio-sense.ai/pricing'

export function marketingJoinUrl(email?: string | null): string {
  if (!email) return MARKETING_PRICING_URL
  return `${MARKETING_PRICING_URL}?email=${encodeURIComponent(email)}`
}

export function checkoutEmail(checkout: Stripe.Checkout.Session): string | null {
  const fromDetails = checkout.customer_details?.email
  const fromSession = checkout.customer_email
  const email = (fromDetails || fromSession || '').trim().toLowerCase()
  return email || null
}

export async function activateMembership(params: {
  userId?: string | null
  email?: string | null
  customerId?: string | null
  subscriptionId?: string | null
}): Promise<boolean> {
  const data = {
    subscriptionStatus: 'ACTIVE' as const,
    cancelAtPeriodEnd: false,
    ...(params.subscriptionId ? { subscriptionId: params.subscriptionId } : {}),
    ...(params.customerId ? { stripeCustomerId: params.customerId } : {}),
  }

  if (params.userId) {
    try {
      await prisma.user.update({ where: { id: params.userId }, data })
      return true
    } catch {
      /* user id from Stripe metadata may be stale; fall through to email */
    }
  }

  if (params.email) {
    const user = await prisma.user.findUnique({ where: { email: params.email } })
    if (user) {
      await prisma.user.update({ where: { id: user.id }, data })
      return true
    }
  }

  return false
}

/** If they paid on bio-sense.ai before creating an app account, attach that sub at signup. */
export async function attachExistingStripeMembership(userId: string, email: string): Promise<void> {
  if (!billingEnabled()) return
  try {
    const stripe = getStripe()
    const customers = await stripe.customers.list({ email, limit: 5 })
    for (const customer of customers.data) {
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'all',
        limit: 10,
      })
      const live = subs.data.find(
        (sub) => sub.status === 'active' || sub.status === 'trialing' || sub.status === 'past_due',
      )
      if (!live) continue
      await prisma.user.update({
        where: { id: userId },
        data: {
          stripeCustomerId: customer.id,
          subscriptionId: live.id,
          subscriptionStatus: live.status === 'past_due' ? 'PAST_DUE' : 'ACTIVE',
          cancelAtPeriodEnd: Boolean(live.cancel_at_period_end),
        },
      })
      return
    }
  } catch (err) {
    console.error('Could not attach existing Stripe membership:', err)
  }
}
