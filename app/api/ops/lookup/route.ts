import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isOpsAuthenticated } from '@/lib/ops-auth'

export async function GET(req: NextRequest) {
  if (!(await isOpsAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const email = req.nextUrl.searchParams.get('email')?.trim().toLowerCase()
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      onboardingDone: true,
      hasConsented: true,
      subscriptionStatus: true,
      cancelAtPeriodEnd: true,
      stripeCustomerId: true,
      subscriptionId: true,
      notifyProductEmail: true,
      notifyMarketingEmail: true,
      emailSuppressedAt: true,
      welcomeEmailSentAt: true,
      wearableSyncs: { select: { provider: true, lastSync: true } },
      notifLogs: {
        orderBy: { sentAt: 'desc' },
        take: 12,
        select: {
          sentAt: true,
          trigger: true,
          category: true,
          channel: true,
          result: true,
          suppressionReason: true,
          providerId: true,
        },
      },
    },
  })

  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(user)
}
