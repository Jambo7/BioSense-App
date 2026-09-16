import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { GlucoseClient } from './glucose-client'

export default async function GlucosePage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const userId = session.user.id
  const since = new Date()
  since.setHours(0, 0, 0, 0)
  since.setDate(since.getDate() - 13)

  const [user, days, apple] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { glucoseTracking: true },
    }),
    prisma.wearableDay.findMany({
      where: { userId, date: { gte: since }, glucoseMgdl: { not: null } },
      orderBy: { date: 'asc' },
      select: { date: true, glucoseMgdl: true, sleepHours: true },
    }),
    prisma.wearableSync.findUnique({
      where: { userId_provider: { userId, provider: 'apple' } },
      select: { lastSync: true },
    }),
  ])

  return (
    <GlucoseClient
      tracking={user?.glucoseTracking ?? 'NONE'}
      appleConnected={Boolean(apple)}
      lastSync={apple?.lastSync ? apple.lastSync.toISOString() : null}
      days={days.map((d) => ({
        date: d.date.toISOString().slice(0, 10),
        glucoseMgdl: d.glucoseMgdl,
        sleepHours: d.sleepHours,
      }))}
    />
  )
}
