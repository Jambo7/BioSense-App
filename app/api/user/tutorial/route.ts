import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { queueGhlSync } from '@/lib/ghl'

export async function POST(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.user.update({
    where: { id: authed.id },
    data: { tutorialDone: true },
  })

  queueGhlSync(authed.id)
  return NextResponse.json({ success: true })
}
