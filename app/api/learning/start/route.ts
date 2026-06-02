import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { learningTurn } from '@/lib/claude'
import {
  SECTIONS,
  SECTION_BY_ID,
  PHASE_LABEL,
  SESSION_QUESTION_CAP,
  computeProgress,
  type LearningMessage,
} from '@/lib/learning'
import { z } from 'zod'

const schema = z.object({
  section: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id

  try {
    const body = await req.json().catch(() => ({}))
    const { section: requested } = schema.parse(body)

    // Choose the focus section: explicit request, else the least-understood one.
    let sectionMeta = requested ? SECTION_BY_ID[requested] : undefined
    if (!sectionMeta) {
      const facts = await prisma.learnedFact.groupBy({
        by: ['section'],
        where: { userId },
        _count: { _all: true },
      })
      const counts: Record<string, number> = {}
      for (const f of facts) counts[f.section] = f._count._all
      const { sections } = computeProgress(counts)
      const lowest = [...sections].sort((a, b) => a.percent - b.percent)[0]
      sectionMeta = SECTION_BY_ID[lowest.id] ?? SECTIONS[0]
    }

    const [user, knownFacts] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId }, select: { name: true } }),
      prisma.learnedFact.findMany({
        where: { userId, section: sectionMeta.id },
        select: { text: true },
        take: 12,
      }),
    ])

    const turn = await learningTurn({
      sectionId: sectionMeta.id,
      sectionLabel: sectionMeta.label,
      phaseLabel: PHASE_LABEL[sectionMeta.phase],
      userName: user?.name,
      knownFacts: knownFacts.map((f) => f.text),
      transcript: [],
      questionCount: 0,
      questionCap: SESSION_QUESTION_CAP,
      fallbackIntro: sectionMeta.intro,
      fallbackQuestions: sectionMeta.questions,
    })

    const opening: LearningMessage = {
      role: 'assistant',
      content: turn.reply,
      chips: turn.chips,
      at: new Date().toISOString(),
    }

    const created = await prisma.learningSession.create({
      data: {
        userId,
        phase: sectionMeta.phase,
        section: sectionMeta.id,
        title: sectionMeta.label,
        messages: [opening] as unknown as Prisma.InputJsonValue,
        questionCount: 1,
        status: 'active',
      },
    })

    return NextResponse.json({
      sessionId: created.id,
      section: sectionMeta.id,
      sectionLabel: sectionMeta.label,
      phaseLabel: PHASE_LABEL[sectionMeta.phase],
      message: opening,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? 'Validation error' }, { status: 400 })
    }
    console.error('Learning start error:', err)
    return NextResponse.json({ error: 'Failed to start session' }, { status: 500 })
  }
}
