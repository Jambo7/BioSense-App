import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

/**
 * JSON insights data for API clients. Mirrors the Insights page, which is
 * backed by the same latest score + 7-day check-in window the dashboard uses,
 * so both surfaces stay in lock-step.
 */
export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [latestScore, recentCheckins] = await Promise.all([
    prisma.healthScore.findFirst({
      where: { userId: authed.id },
      orderBy: { date: 'desc' },
    }),
    prisma.dailyCheckin.findMany({
      where: { userId: authed.id },
      orderBy: { date: 'desc' },
      take: 7,
    }),
  ])

  return NextResponse.json({
    healthScore: latestScore?.score ?? null,
    scoreBreakdown: (latestScore?.breakdown as Record<string, number> | null) ?? null,
    recentCheckins: recentCheckins.map((c) => ({
      date: c.date.toISOString().split('T')[0],
      energy: c.energy,
      sleep: c.sleep,
      mood: c.mood,
      stress: c.stress,
    })),
  })
}
