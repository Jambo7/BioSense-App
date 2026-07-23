/**
 * Anomaly check — smart notification triggers:
 * energy ≤3 for 3 days, sleep ≤3 for 3 days, positive recovery trends.
 * Scheduled daily via Vercel Cron (vercel.json).
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isCronAuthorized } from '@/lib/cron-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

async function handle(req: NextRequest) {
  if (!isCronAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  const users = await prisma.user.findMany({
    where: { onboardingDone: true, hasConsented: true },
    select: { id: true },
  })

  const triggered: string[] = []

  for (const user of users) {
    const recent = await prisma.dailyCheckin.findMany({
      where: { userId: user.id, date: { gte: threeDaysAgo } },
      orderBy: { date: 'desc' },
      take: 3,
    })

    if (recent.length < 3) continue

    const allEnergyLow = recent.every((c) => c.energy <= 3)
    const allSleepLow = recent.every((c) => c.sleep <= 3)

    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const prevWeek = await prisma.dailyCheckin.findMany({
      where: { userId: user.id, date: { gte: weekAgo, lt: threeDaysAgo } },
    })
    const prevAvgRecovery = prevWeek.length
      ? prevWeek.reduce((s, c) => s + (c.energy + c.sleep) / 2, 0) / prevWeek.length
      : null

    let trigger = ''
    let message = ''

    if (allEnergyLow) {
      trigger = 'energy_low_3d'
      message = 'Energy has been trending down for 3 days. Want a quick plan?'
    } else if (allSleepLow) {
      trigger = 'sleep_low_3d'
      message = "Sleep quality has been low for 3 days. Let's look at what might be affecting it."
    } else if (
      prevAvgRecovery != null &&
      (recent[0].energy + recent[0].sleep) / 2 > prevAvgRecovery + 1.5
    ) {
      trigger = 'positive_trend'
      message = 'Strong week — your recovery has improved. See what worked.'
    }

    const urlMap: Record<string, string> = {
      energy_low_3d: '/insights',
      sleep_low_3d: '/insights',
      positive_trend: '/reports',
    }

    if (trigger) {
      // Avoid spamming the same trigger on consecutive daily runs.
      const since = new Date()
      since.setDate(since.getDate() - 2)
      const recentSame = await prisma.notificationLog.findFirst({
        where: { userId: user.id, trigger, sentAt: { gte: since } },
      })
      if (recentSame) continue

      await prisma.notificationLog.create({
        data: {
          userId: user.id,
          trigger,
          message,
          channel: 'push',
          url: urlMap[trigger] ?? '/dashboard',
        },
      })
      triggered.push(`${user.id}:${trigger}`)
    }
  }

  return NextResponse.json({ triggered, checked: users.length })
}

export async function GET(req: NextRequest) {
  return handle(req)
}

export async function POST(req: NextRequest) {
  return handle(req)
}
