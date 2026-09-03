import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { deleteUserAccount } from '@/lib/account-deletion'
import { hitRateLimit } from '@/lib/rate-limit'
import { TSB } from '@/lib/security-baseline'

const schema = z.object({
  password: z.string().min(1),
})

export async function DELETE(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const limited = await hitRateLimit({
    key: `delete:${authed.id}`,
    limit: TSB.deletePerUserPerHour,
    windowMs: 60 * 60 * 1000,
  })
  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSec) } },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Password required to delete your account' }, { status: 400 })
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Password required to delete your account' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: authed.id },
    select: { password: true },
  })
  if (!user?.password) {
    return NextResponse.json({ error: 'This account cannot be deleted this way' }, { status: 400 })
  }
  const ok = await bcrypt.compare(parsed.data.password, user.password)
  if (!ok) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  try {
    await deleteUserAccount(authed.id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[account] delete failed', err)
    return NextResponse.json({ error: 'Deletion failed. Try again or contact support.' }, { status: 500 })
  }
}
