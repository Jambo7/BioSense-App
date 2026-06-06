import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const updateSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  description: z.string().max(500).optional(),
  pillars: z.string().max(120).optional(),
  targetDate: z.string().nullable().optional(),
  progress: z.number().min(0).max(100).optional(),
  status: z.string().optional(),
})

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const goal = await prisma.userGoal.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!goal) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ goal })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    const body = updateSchema.parse(await req.json())
    const goal = await prisma.userGoal.updateMany({
      where: { id, userId: session.user.id },
      data: {
        ...body,
        targetDate: body.targetDate === null ? null : body.targetDate ? new Date(body.targetDate) : undefined,
      },
    })
    if (goal.count === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const updated = await prisma.userGoal.findUnique({ where: { id } })
    return NextResponse.json({ goal: updated })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten() }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const result = await prisma.userGoal.deleteMany({
    where: { id, userId: session.user.id },
  })

  if (result.count === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
