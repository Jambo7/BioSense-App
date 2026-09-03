import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NotificationsClient } from './notifications-client'

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const notifications = await prisma.notificationLog.findMany({
    where: { userId: session.user.id, result: 'SENT' },
    orderBy: { sentAt: 'desc' },
    take: 50,
  })

  return (
    <NotificationsClient
      initial={notifications.map((n) => ({
        id: n.id,
        trigger: n.trigger,
        message: n.message,
        url: n.url,
        readAt: n.readAt?.toISOString() ?? null,
        sentAt: n.sentAt.toISOString(),
      }))}
    />
  )
}
