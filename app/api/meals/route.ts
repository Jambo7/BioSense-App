import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { parseDateOnly, todayDateParam } from '@/lib/meals'

const itemSchema = z.object({
  name: z.string().min(1).max(80),
  portion: z.string().max(80).optional().default(''),
})

const createSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  title: z.string().min(1).max(80),
  items: z.array(itemSchema).max(12).optional().default([]),
  calories: z.number().int().min(0).max(6000),
  proteinG: z.number().min(0).max(400),
  carbsG: z.number().min(0).max(600),
  fatG: z.number().min(0).max(300),
  fibreG: z.number().min(0).max(120).nullable().optional(),
  confidence: z.enum(['high', 'medium', 'low']),
  assumptions: z.string().max(280).optional(),
  userNote: z.string().max(280).optional(),
  adjusted: z.boolean().optional(),
  includedWhole: z.boolean().optional(),
  eatenAmount: z.enum(['all', 'most', 'half', 'little']).optional(),
})

export async function GET(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dateParam = req.nextUrl.searchParams.get('date') ?? todayDateParam()
  const date = parseDateOnly(dateParam)
  if (!date) return NextResponse.json({ error: 'Invalid date' }, { status: 400 })

  const meals = await prisma.mealLog.findMany({
    where: { userId: authed.id, date },
    orderBy: { loggedAt: 'asc' },
  })

  return NextResponse.json({ date: dateParam, meals })
}

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the meal details.' }, { status: 400 })
  }

  const date = parseDateOnly(parsed.data.date)
  if (!date) return NextResponse.json({ error: 'Invalid date' }, { status: 400 })

  const meal = await prisma.mealLog.create({
    data: {
      userId: authed.id,
      date,
      slot: parsed.data.slot,
      title: parsed.data.title,
      items: parsed.data.items,
      calories: parsed.data.calories,
      proteinG: parsed.data.proteinG,
      carbsG: parsed.data.carbsG,
      fatG: parsed.data.fatG,
      fibreG: parsed.data.fibreG ?? null,
      confidence: parsed.data.confidence,
      assumptions: parsed.data.assumptions,
      userNote: parsed.data.userNote,
      adjusted: Boolean(parsed.data.adjusted),
      includedWhole: parsed.data.includedWhole ?? true,
      eatenAmount: parsed.data.eatenAmount ?? 'all',
    },
  })

  return NextResponse.json({ meal }, { status: 201 })
}
