import { NextResponse } from 'next/server'
import { encode } from 'next-auth/jwt'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const MAX_AGE = 30 * 24 * 60 * 60 // 30 days, matching the web session

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
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (!user || !user.password) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
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
