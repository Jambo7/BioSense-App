import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { activateMembership } from '@/lib/billing'
import { billingEnabled, getStripe } from '@/lib/stripe'
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/stores'
import { AccountClient } from './account-client'

export const metadata = {
  title: 'Account — BioSense',
  description: 'Manage your BioSense membership, billing and app downloads.',
  robots: { index: false, follow: false },
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const session = await getServerSession(authOptions)
  const { session_id: checkoutId } = await searchParams

  if (session && checkoutId && billingEnabled()) {
    try {
      const checkout = await getStripe().checkout.sessions.retrieve(checkoutId)
      const ownerId = checkout.metadata?.userId
      const paid = checkout.status === 'complete' || checkout.payment_status === 'paid'
      if (paid && ownerId === session.user.id) {
        const customerId =
          typeof checkout.customer === 'string' ? checkout.customer : checkout.customer?.id
        const subscriptionId =
          typeof checkout.subscription === 'string'
            ? checkout.subscription
            : checkout.subscription?.id
        await activateMembership({
          userId: session.user.id,
          customerId: customerId ?? null,
          subscriptionId: subscriptionId ?? null,
        })
      }
    } catch (err) {
      console.error('Account checkout confirm failed:', err)
    }
  }

  if (!session) {
    return (
      <AccountClient
        billingEnabled={billingEnabled()}
        appStoreUrl={APP_STORE_URL}
        playStoreUrl={PLAY_STORE_URL}
      />
    )
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      subscriptionStatus: true,
      stripeCustomerId: true,
      cancelAtPeriodEnd: true,
    },
  })
  if (!user) {
    return (
      <AccountClient
        billingEnabled={billingEnabled()}
        appStoreUrl={APP_STORE_URL}
        playStoreUrl={PLAY_STORE_URL}
      />
    )
  }

  return (
    <AccountClient
      billingEnabled={billingEnabled()}
      appStoreUrl={APP_STORE_URL}
      playStoreUrl={PLAY_STORE_URL}
      user={{
        name: user.name,
        email: user.email,
        subscriptionStatus: user.subscriptionStatus,
        hasBillingAccount: Boolean(user.stripeCustomerId),
        cancelAtPeriodEnd: user.cancelAtPeriodEnd,
      }}
    />
  )
}
