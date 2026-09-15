import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

const patchSchema = z.object({
  slot: z.enum(['breakfast', 'lunch', 'dinner', 'snack']).optional(),
  title: z.string().min(1).max(80).optional(),
  calories: z.number().int().min(0).max(6000).optional(),
  proteinG: z.number().min(0).max(400).optional(),
  carbsG: z.number().min(0).max(600).optional(),
  fatG: z.number().min(0).max(300).optional(),
  fibreG: z.number().min(0).max(120).nullable().optional(),
  userNote: z.string().max(280).optional(),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the meal details.' }, { status: 400 })
  }

  const existing = await prisma.mealLog.findFirst({
    where: { id, userId: authed.id },
  })
  if (!existing) return NextResponse.json({ error: 'Meal not found' }, { status: 404 })

  const meal = await prisma.mealLog.update({
    where: { id },
    data: {
      ...parsed.data,
      adjusted: true,
    },
  })

  return NextResponse.json({ meal })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  const existing = await prisma.mealLog.findFirst({
    where: { id, userId: authed.id },
  })
  if (!existing) return NextResponse.json({ error: 'Meal not found' }, { status: 404 })

  await prisma.mealLog.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
