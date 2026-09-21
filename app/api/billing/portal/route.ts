import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { billingEnabled, getStripe } from '@/lib/stripe'

const RETURN_TO = new Set(['/profile', '/account'])

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!billingEnabled()) {
    return NextResponse.json({ error: 'Billing is not configured yet' }, { status: 501 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: 'No billing account found' }, { status: 400 })
  }

  let returnTo = '/profile'
  try {
    const body = (await req.json()) as { returnTo?: string }
    if (body.returnTo && RETURN_TO.has(body.returnTo)) returnTo = body.returnTo
  } catch {
    /* no body is fine; in-app Manage still returns to profile */
  }

  const origin = (process.env.NEXTAUTH_URL ?? '').replace(/\/$/, '')
  const portalSession = await getStripe().billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${origin}${returnTo}`,
  })

  return NextResponse.json({ url: portalSession.url })
}
