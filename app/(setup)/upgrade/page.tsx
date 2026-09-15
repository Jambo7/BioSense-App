import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { marketingJoinUrl } from '@/lib/billing'
import { afterAuthPath, billingEnabled, hasMembership } from '@/lib/stripe'
import { UpgradeClient } from './upgrade-client'

export default async function UpgradePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  if (!session.user.hasConsented) redirect('/consent')

  if (!billingEnabled()) {
    redirect(
      afterAuthPath({
        hasConsented: true,
        onboardingDone: session.user.onboardingDone,
        subscriptionStatus: 'ACTIVE',
      }),
    )
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboardingDone: true, subscriptionStatus: true, email: true },
  })
  if (!user) redirect('/login')

  if (hasMembership(user.subscriptionStatus)) {
    redirect(
      afterAuthPath({
        hasConsented: true,
        onboardingDone: user.onboardingDone,
        subscriptionStatus: user.subscriptionStatus,
      }),
    )
  }

  return <UpgradeClient email={user.email} joinUrl={marketingJoinUrl(user.email)} />
}
