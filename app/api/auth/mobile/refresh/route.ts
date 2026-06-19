import { NextResponse } from 'next/server'
import { encode } from 'next-auth/jwt'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

const MAX_AGE = 30 * 24 * 60 * 60 // 30 days

/**
 * Refreshes a mobile bearer token. The client calls this with its current
 * (still valid) token to get a fresh one — keeping the user logged in without
 * re-entering a password. It also re-reads consent/onboarding state from the
 * database, so the new token reflects any changes made since login.
 */
export async function POST(req: Request) {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Server auth is not configured' }, { status: 500 })
  }

  const authed = await getRequestUser(req)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: authed.id },
    select: { id: true, email: true, name: true, hasConsented: true, onboardingDone: true },
  })
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const accessToken = await encode({
    token: {
      id: user.id,
      email: user.email,
      name: user.name,
      hasConsented: user.hasConsented,
      onboardingDone: user.onboardingDone,
    },
    secret,
    maxAge: MAX_AGE,
  })

  return NextResponse.json({
    accessToken,
    tokenType: 'Bearer',
    expiresIn: MAX_AGE,
    user,
  })
}
