import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { z } from 'zod'

const patchSchema = z.object({
  text: z.string().min(1).max(500),
})

// PATCH — edit the text of a single learned fact.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  try {
    const body = await req.json()
    const { text } = patchSchema.parse(body)

    const existing = await prisma.learnedFact.findUnique({ where: { id } })
    if (!existing || existing.userId !== authed.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const fact = await prisma.learnedFact.update({
      where: { id },
      data: { text: text.trim() },
      select: { id: true, section: true, text: true, confidence: true, source: true },
    })
    return NextResponse.json({ fact })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? 'Validation error' }, { status: 400 })
    }
    console.error('Update fact error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE — remove a single learned fact.
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  const existing = await prisma.learnedFact.findUnique({ where: { id } })
  if (!existing || existing.userId !== authed.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await prisma.learnedFact.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
