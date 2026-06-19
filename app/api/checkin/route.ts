import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { recalculateHealthScore } from '@/lib/health-score'
import { z } from 'zod'

const schema = z.object({
  energy: z.number().int().min(1).max(10),
  sleep: z.number().int().min(1).max(10),
  mood: z.number().int().min(1).max(10),
  stress: z.number().int().min(1).max(10),
})

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = schema.parse(body)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const checkin = await prisma.dailyCheckin.upsert({
      where: { userId_date: { userId: authed.id, date: today } },
      create: { userId: authed.id, date: today, ...data },
      update: data,
    })

    // Recalculate health score from check-in + any connected wearable data
    const { score } = await recalculateHealthScore(authed.id)

    return NextResponse.json({ success: true, checkin, score })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? "Validation error" }, { status: 400 })
    }
    console.error('Checkin error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') ?? '30')

  const checkins = await prisma.dailyCheckin.findMany({
    where: { userId: authed.id },
    orderBy: { date: 'desc' },
    take: limit,
  })

  return NextResponse.json(checkins)
}
