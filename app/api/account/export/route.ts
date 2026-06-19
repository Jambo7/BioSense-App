import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [user, checkins, healthScores, bloodResults, patterns, chatMessages, consents] =
    await Promise.all([
      prisma.user.findUnique({
        where: { id: authed.id },
        select: {
          name: true,
          email: true,
          age: true,
          goalType: true,
          goalText: true,
          allergies: true,
          conditions: true,
          lifestyle: true,
          createdAt: true,
        },
      }),
      prisma.dailyCheckin.findMany({ where: { userId: authed.id } }),
      prisma.healthScore.findMany({ where: { userId: authed.id } }),
      prisma.bloodResult.findMany({
        where: { userId: authed.id },
        select: { drawDate: true, markers: true, aiSummary: true },
      }),
      prisma.pattern.findMany({ where: { userId: authed.id } }),
      prisma.chatMessage.findMany({ where: { userId: authed.id } }),
      prisma.consent.findMany({ where: { userId: authed.id } }),
    ])

  const exportData = {
    exportedAt: new Date().toISOString(),
    user,
    checkins,
    healthScores,
    bloodResults,
    patterns,
    chatMessages,
    consents,
  }

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="biosense-data-${authed.id}.json"`,
    },
  })
}
