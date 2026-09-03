import { NextResponse } from 'next/server'
import { encode } from 'next-auth/jwt'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hitRateLimit, isRateLimited } from '@/lib/rate-limit'
import { sessionMaxAgeSeconds, TSB } from '@/lib/security-baseline'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const MAX_AGE = sessionMaxAgeSeconds()

/**
 * Token login for native mobile clients (iOS/Android).
 * Validates email + password and returns a NextAuth-compatible bearer token
 * that lib/api-auth.ts accepts on protected API routes. The web app is
 * unaffected — it continues to use cookie sessions via NextAuth.
 */
export async function POST(req: Request) {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Server auth is not configured' }, { status: 500 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const { email, password } = parsed.data
  const lower = email.toLowerCase()
  const failKey = `login-fail:${lower}`
  const locked = await isRateLimited(failKey, TSB.loginFailuresBeforeFriction)
  if (locked.locked) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { email: lower } })
  if (!user || !user.password) {
    await hitRateLimit({
      key: failKey,
      limit: TSB.loginFailuresBeforeFriction,
      windowMs: TSB.loginFailureWindowMinutes * 60 * 1000,
    })
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    await hitRateLimit({
      key: failKey,
      limit: TSB.loginFailuresBeforeFriction,
      windowMs: TSB.loginFailureWindowMinutes * 60 * 1000,
    })
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
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
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      hasConsented: user.hasConsented,
      onboardingDone: user.onboardingDone,
    },
  })
}
