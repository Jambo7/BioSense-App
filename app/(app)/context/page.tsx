import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'
import { getWearableDays } from '@/lib/wearable-days'
import { suggestContextPrompt } from '@/lib/day-context'
import { ContextClient } from './context-client'

export default async function TodayContextPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const userId = session.user.id
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [row, days, wearables] = await Promise.all([
    prisma.dayContext.findUnique({
      where: { userId_date: { userId, date: today } },
    }),
    getWearableDays(userId, 8),
    prisma.wearableSync.findMany({ where: { userId } }),
  ])

  const latest = aggregateWearableMetrics(wearables)
  const suggestion = suggestContextPrompt({
    rhr: latest.rhr,
    rhrHistory: days.map((d) => d.rhr).filter((n): n is number => n != null),
    sleepHours: latest.sleepHours,
    sleepHistory: days.map((d) => d.sleepHours).filter((n): n is number => n != null),
  })

  return (
    <ContextClient
      initial={
        row
          ? { tags: row.tags, feeling: row.feeling, note: row.note ?? '' }
          : null
      }
      suggestion={suggestion}
    />
  )
}
