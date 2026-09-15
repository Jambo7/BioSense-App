import Stripe from 'stripe'

let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder')
  }
  return _stripe
}

// Convenience export (lazy)
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as unknown as Record<string, unknown>)[prop as string]
  },
})

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID ?? '',
    amount: 149,
    currency: 'AED',
    interval: 'month',
    label: 'AED 149 / month',
  },
  annual: {
    priceId: process.env.STRIPE_ANNUAL_PRICE_ID ?? '',
    amount: 1499,
    currency: 'AED',
    interval: 'year',
    label: 'AED 1,499 / year',
    save: 'Save 16%',
  },
}

/** True when live Stripe keys and both prices are set. Local dev without keys stays ungated. */
export function billingEnabled(): boolean {
  const key = process.env.STRIPE_SECRET_KEY ?? ''
  return (
    (key.startsWith('sk_live_') || key.startsWith('sk_test_')) &&
    Boolean(process.env.STRIPE_MONTHLY_PRICE_ID) &&
    Boolean(process.env.STRIPE_ANNUAL_PRICE_ID)
  )
}

export function hasMembership(status?: string | null): boolean {
  return status === 'ACTIVE' || status === 'PAST_DUE'
}

/** Signup → consent → pay on the website → onboarding → app. */
export function afterAuthPath(user: {
  hasConsented: boolean
  onboardingDone: boolean
  subscriptionStatus?: string | null
}): string {
  if (!user.hasConsented) return '/consent'
  if (billingEnabled() && !hasMembership(user.subscriptionStatus)) return '/upgrade'
  if (!user.onboardingDone) return '/onboarding'
  return '/dashboard'
}
