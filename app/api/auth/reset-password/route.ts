import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { resetPasswordSchema } from '@/lib/validations'
import { z } from 'zod'

const schema = resetPasswordSchema.extend({
  email: z.string().email(),
  token: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, token, password } = schema.parse(body)
    const lower = email.toLowerCase()

    const hashed = crypto.createHash('sha256').update(token).digest('hex')
    const record = await prisma.verificationToken.findUnique({ where: { token: hashed } })

    if (!record || record.identifier !== lower || record.expires < new Date()) {
      return NextResponse.json(
        { error: 'This reset link is invalid or has expired. Please request a new one.' },
        { status: 400 },
      )
    }

    const user = await prisma.user.findUnique({ where: { email: lower } })
    if (!user) {
      return NextResponse.json({ error: 'Account not found.' }, { status: 404 })
    }

    const newHash = await bcrypt.hash(password, 12)
    await prisma.user.update({ where: { id: user.id }, data: { password: newHash } })
    // Burn all reset tokens for this email.
    await prisma.verificationToken.deleteMany({ where: { identifier: lower } })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? 'Validation error' }, { status: 400 })
    }
    console.error('Reset password error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
