import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail } from '@/lib/notifications'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  country: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, country, email, password } = schema.parse(body)

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 },
      )
    }

    const hashed = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        country,
        email: email.toLowerCase(),
        password: hashed,
        ageVerified: true, // confirmed on the form
      },
    })

    // Fire the welcome email at account creation so every registrant receives
    // it even if they drop off mid-onboarding. Fail soft — never block signup.
    try {
      const firstName = name.split(' ')[0] ?? name
      await sendWelcomeEmail(user.email, firstName)
      await prisma.user.update({
        where: { id: user.id },
        data: { welcomeEmailSentAt: new Date() },
      })
    } catch (emailErr) {
      console.error('Welcome email failed (non-blocking):', emailErr)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? "Validation error" }, { status: 400 })
    }
    console.error('Signup error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
