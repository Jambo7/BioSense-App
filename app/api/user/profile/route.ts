import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1).optional(),
  age: z.number().int().min(18).max(120).nullable().optional(),
  goalType: z.enum(['PERFORMANCE', 'HEALTH', 'BODY_COMP', 'WELLBEING']).optional(),
  goalText: z.string().optional(),
  goalDeadline: z.string().nullable().optional(),
  allergies: z.array(z.string()).optional(),
  conditions: z.array(z.string()).optional(),
  lifestyle: z.string().optional(),
})

export async function PATCH(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = schema.parse(body)

    const updated = await prisma.user.update({
      where: { id: authed.id },
      data: {
        ...data,
        goalDeadline: data.goalDeadline ? new Date(data.goalDeadline) : data.goalDeadline,
      },
    })

    return NextResponse.json({ success: true, name: updated.name })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? "Validation error" }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: authed.id },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      goalType: true,
      goalText: true,
      goalDeadline: true,
      allergies: true,
      conditions: true,
      lifestyle: true,
      onboardingDone: true,
    },
  })

  return NextResponse.json(user)
}
