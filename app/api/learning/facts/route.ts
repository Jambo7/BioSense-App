import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { SECTION_BY_ID } from '@/lib/learning'
import { z } from 'zod'

// GET — list every durable fact for the user.
export async function GET(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const facts = await prisma.learnedFact.findMany({
    where: { userId: authed.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true, section: true, text: true, confidence: true, source: true },
  })
  return NextResponse.json({ facts })
}

const createSchema = z.object({
  section: z.string().min(1),
  text: z.string().min(1).max(500),
  confidence: z.enum(['High', 'Medium', 'Low']).optional(),
})

// POST — manually add a fact (user-authored memory).
export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = createSchema.parse(body)
    if (!SECTION_BY_ID[data.section]) {
      return NextResponse.json({ error: 'Unknown section' }, { status: 400 })
    }
    const fact = await prisma.learnedFact.create({
      data: {
        userId: authed.id,
        section: data.section,
        text: data.text.trim(),
        confidence: data.confidence ?? 'High',
        source: 'manual',
      },
      select: { id: true, section: true, text: true, confidence: true, source: true },
    })
    return NextResponse.json({ fact }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? 'Validation error' }, { status: 400 })
    }
    console.error('Create fact error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE — wipe ALL saved knowledge (the "delete all" control).
export async function DELETE(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.learnedFact.deleteMany({ where: { userId: authed.id } })
  return NextResponse.json({ success: true })
}
