import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

export async function GET(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const notifications = await prisma.notificationLog.findMany({
    where: { userId: authed.id },
    orderBy: { sentAt: 'desc' },
    take: 50,
  })

  const unread = notifications.filter((n) => !n.readAt).length

  return NextResponse.json({ notifications, unread })
}

export async function PATCH(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const id = body.id as string | undefined

  if (id) {
    await prisma.notificationLog.updateMany({
      where: { id, userId: authed.id },
      data: { readAt: new Date() },
    })
  } else {
    await prisma.notificationLog.updateMany({
      where: { userId: authed.id, readAt: null },
      data: { readAt: new Date() },
    })
  }

  return NextResponse.json({ success: true })
}
