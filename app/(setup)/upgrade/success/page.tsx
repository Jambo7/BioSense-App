import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { afterAuthPath, getStripe, hasMembership } from '@/lib/stripe'
import { SuccessClient } from './success-client'

export default async function UpgradeSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const { session_id: checkoutId } = await searchParams
  if (checkoutId) {
    try {
      const checkout = await getStripe().checkout.sessions.retrieve(checkoutId)
      const ownerId = checkout.metadata?.userId
      const paid =
        checkout.status === 'complete' || checkout.payment_status === 'paid'
      if (paid && ownerId === session.user.id) {
        const customerId =
          typeof checkout.customer === 'string'
            ? checkout.customer
            : checkout.customer?.id
        const subscriptionId =
          typeof checkout.subscription === 'string'
            ? checkout.subscription
            : checkout.subscription?.id
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            subscriptionStatus: 'ACTIVE',
            subscriptionId: subscriptionId ?? undefined,
            stripeCustomerId: customerId,
            cancelAtPeriodEnd: false,
          },
        })
      }
    } catch (err) {
      console.error('Stripe success confirm failed:', err)
    }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { hasConsented: true, onboardingDone: true, subscriptionStatus: true },
  })
  if (!user) redirect('/login')
  if (!hasMembership(user.subscriptionStatus)) redirect('/upgrade')

  return (
    <SuccessClient
      next={afterAuthPath({
        hasConsented: user.hasConsented,
        onboardingDone: user.onboardingDone,
        subscriptionStatus: user.subscriptionStatus,
      })}
    />
  )
}
