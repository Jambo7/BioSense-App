import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { recalculateHealthScore } from '@/lib/health-score'
import { CONTEXT_TAGS, FEELINGS, feelingToCheckin, type FeelingId } from '@/lib/day-context'

const schema = z.object({
  tags: z.array(z.string()).max(8),
  note: z.string().max(500).optional(),
  feeling: z.enum(['low', 'okay', 'good', 'great']),
  prompt: z.string().max(240).optional(),
})

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please choose how you are feeling.' }, { status: 400 })
  }

  const allowed = new Set(CONTEXT_TAGS.map((t) => t.id))
  const tags = parsed.data.tags.filter((t) => allowed.has(t as (typeof CONTEXT_TAGS)[number]['id']))
  const feeling = parsed.data.feeling as FeelingId
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  await prisma.dayContext.upsert({
    where: { userId_date: { userId: authed.id, date: today } },
    create: {
      userId: authed.id,
      date: today,
      tags,
      note: parsed.data.note?.trim() || null,
      feeling,
      prompt: parsed.data.prompt ?? null,
    },
    update: {
      tags,
      note: parsed.data.note?.trim() || null,
      feeling,
      prompt: parsed.data.prompt ?? null,
    },
  })

  const checkin = feelingToCheckin(feeling)
  await prisma.dailyCheckin.upsert({
    where: { userId_date: { userId: authed.id, date: today } },
    create: { userId: authed.id, date: today, ...checkin },
    update: checkin,
  })

  const { score } = await recalculateHealthScore(authed.id)
  return NextResponse.json({ success: true, score })
}

export async function GET(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const row = await prisma.dayContext.findUnique({
    where: { userId_date: { userId: authed.id, date: today } },
  })
  return NextResponse.json({ context: row, feelings: FEELINGS, tags: CONTEXT_TAGS })
}
