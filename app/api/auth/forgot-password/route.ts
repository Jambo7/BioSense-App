import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/notifications'
import { forgotPasswordSchema } from '@/lib/validations'
import { z } from 'zod'
import { hitRateLimit } from '@/lib/rate-limit'
import { passwordResetTtlMs, TSB } from '@/lib/security-baseline'

const TOKEN_TTL_MS = passwordResetTtlMs()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = forgotPasswordSchema.parse(body)
    const lower = email.toLowerCase()

    const limited = await hitRateLimit({
      key: `pwreset:${lower}`,
      limit: TSB.passwordResetPerEmailPerHour,
      windowMs: 60 * 60 * 1000,
    })
    if (!limited.ok) {
      return NextResponse.json({
        success: true,
        message: 'If an account exists for that email, a reset link is on its way.',
      })
    }

    const user = await prisma.user.findUnique({ where: { email: lower } })

    // Only act if the account exists AND uses password auth — but ALWAYS return
    // the same response so we never reveal whether an email is registered.
    if (user?.password) {
      const rawToken = crypto.randomBytes(32).toString('hex')
      const hashed = crypto.createHash('sha256').update(rawToken).digest('hex')

      // One active reset token per email.
      await prisma.verificationToken.deleteMany({ where: { identifier: lower } })
      await prisma.verificationToken.create({
        data: {
          identifier: lower,
          token: hashed,
          expires: new Date(Date.now() + TOKEN_TTL_MS),
        },
      })

      const base = process.env.NEXTAUTH_URL ?? 'https://biosense.app'
      const url = `${base}/reset-password?token=${rawToken}&email=${encodeURIComponent(lower)}`
      try {
        await sendPasswordResetEmail(user.id, user.name ?? '', url)
      } catch (mailErr) {
        console.error('Reset email failed:', mailErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists for that email, a reset link is on its way.',
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? 'Validation error' }, { status: 400 })
    }
    console.error('Forgot password error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
