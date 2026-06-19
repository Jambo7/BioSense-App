import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

/**
 * JSON dashboard summary for API clients (native mobile + future web fetches).
 * Mirrors the data the server-rendered dashboard page computes, so the mobile
 * app can render the same home screen without duplicating query logic.
 */
export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [user, latestCheckin, latestScore, checkinCount, recentCheckins, latestBlood, wearables] =
    await Promise.all([
      prisma.user.findUnique({ where: { id: authed.id } }),
      prisma.dailyCheckin.findFirst({
        where: { userId: authed.id },
        orderBy: { date: 'desc' },
      }),
      prisma.healthScore.findFirst({
        where: { userId: authed.id },
        orderBy: { date: 'desc' },
      }),
      prisma.dailyCheckin.count({ where: { userId: authed.id } }),
      prisma.dailyCheckin.findMany({
        where: { userId: authed.id },
        orderBy: { date: 'desc' },
        take: 7,
      }),
      prisma.bloodResult.findFirst({
        where: { userId: authed.id },
        orderBy: { drawDate: 'desc' },
      }),
      prisma.wearableSync.findMany({
        where: { userId: authed.id },
        select: { provider: true },
      }),
    ])

  const today = new Date().toISOString().split('T')[0]
  const hasCheckinToday = latestCheckin
    ? new Date(latestCheckin.date).toISOString().split('T')[0] === today
    : false

  return NextResponse.json({
    user: {
      name: user?.name ?? '',
      age: user?.age ?? null,
      goalType: user?.goalType ?? null,
      goalText: user?.goalText ?? null,
    },
    healthScore: latestScore?.score ?? null,
    scoreBreakdown: (latestScore?.breakdown as Record<string, number> | null) ?? null,
    hasCheckinToday,
    checkinCount,
    recentCheckins: recentCheckins.map((c) => ({
      date: c.date.toISOString().split('T')[0],
      energy: c.energy,
      sleep: c.sleep,
      mood: c.mood,
      stress: c.stress,
    })),
    hasBlood: !!latestBlood,
    connectedWearables: wearables.map((w) => w.provider),
  })
}
