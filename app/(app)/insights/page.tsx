import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { InsightsClient } from './insights-client'

/**
 * /insights — the "WHY" view.
 *
 *   Reframed in v6 as the answer to "why is my score what it is today?".
 *   Sits between the Dashboard (Today) and the Trends page ("Am I
 *   improving?") and behind the third bottom-nav tab.
 *
 * Page composes:
 *  · AI insight summary card
 *  · Ranked top drivers w/ impact bars (high / medium / low)
 *  · Supporting factors (caffeine, nutrition, hydration)
 *  · Timeline strip — yesterday → today
 *
 * Backed by the same 7-day check-in window the dashboard uses so both
 * surfaces stay in lock-step.
 */
export default async function InsightsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const [latestScore, recentCheckins] = await Promise.all([
    prisma.healthScore.findFirst({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
    }),
    prisma.dailyCheckin.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
      take: 7,
    }),
  ])

  return (
    <InsightsClient
      healthScore={latestScore?.score ?? null}
      recentCheckins={recentCheckins.map((c) => ({
        date: c.date.toISOString().split('T')[0],
        energy: c.energy,
        sleep: c.sleep,
        mood: c.mood,
        stress: c.stress,
      }))}
    />
  )
}
