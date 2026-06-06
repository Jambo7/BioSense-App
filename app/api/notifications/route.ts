import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const notifications = await prisma.notificationLog.findMany({
    where: { userId: session.user.id },
    orderBy: { sentAt: 'desc' },
    take: 50,
  })

  const unread = notifications.filter((n) => !n.readAt).length

  return NextResponse.json({ notifications, unread })
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const id = body.id as string | undefined

  if (id) {
    await prisma.notificationLog.updateMany({
      where: { id, userId: session.user.id },
      data: { readAt: new Date() },
    })
  } else {
    await prisma.notificationLog.updateMany({
      where: { userId: session.user.id, readAt: null },
      data: { readAt: new Date() },
    })
  }

  return NextResponse.json({ success: true })
}
