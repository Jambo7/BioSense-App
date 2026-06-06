import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const createSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  pillars: z.string().max(120).optional(),
  targetDate: z.string().optional(),
})

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const goals = await prisma.userGoal.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ goals })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = createSchema.parse(await req.json())
    const goal = await prisma.userGoal.create({
      data: {
        userId: session.user.id,
        title: body.title,
        description: body.description,
        pillars: body.pillars,
        targetDate: body.targetDate ? new Date(body.targetDate) : null,
        progress: 0,
        status: 'On track',
      },
    })
    return NextResponse.json({ goal })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten() }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 })
  }
}
