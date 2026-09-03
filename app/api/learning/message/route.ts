import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { Prisma } from '@prisma/client'
import { learningTurn } from '@/lib/claude'
import {
  SECTION_BY_ID,
  PHASE_LABEL,
  SESSION_QUESTION_CAP,
  type LearningMessage,
} from '@/lib/learning'
import { z } from 'zod'
import { classifyUserMessage, safetyTemplate } from '@/lib/safety-gate'

const schema = z.object({
  sessionId: z.string().min(1),
  message: z.string().min(1).max(2000),
})

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = authed.id

  try {
    const body = await req.json()
    const { sessionId, message } = schema.parse(body)

    const ls = await prisma.learningSession.findUnique({ where: { id: sessionId } })
    if (!ls || ls.userId !== userId) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }
    if (ls.status !== 'active') {
      return NextResponse.json({ error: 'This session has ended' }, { status: 409 })
    }

    const blocked = classifyUserMessage(message)
    if (blocked) {
      return NextResponse.json({
        reply: safetyTemplate(blocked),
        chips: [],
        facts: [],
        done: true,
      })
    }

    const sectionMeta = SECTION_BY_ID[ls.section]
    const prior = (ls.messages as unknown as LearningMessage[]) ?? []

    const userMsg: LearningMessage = {
      role: 'user',
      content: message,
      at: new Date().toISOString(),
    }

    const [user, knownFacts] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId }, select: { name: true } }),
      prisma.learnedFact.findMany({
        where: { userId, section: ls.section },
        select: { text: true },
        take: 12,
      }),
    ])

    const turn = await learningTurn({
      sectionId: ls.section,
      sectionLabel: sectionMeta?.label ?? ls.section,
      phaseLabel: PHASE_LABEL[ls.phase],
      userName: user?.name,
      knownFacts: knownFacts.map((f) => f.text),
      transcript: [...prior, userMsg].map((m) => ({ role: m.role, content: m.content })),
      questionCount: ls.questionCount,
      questionCap: SESSION_QUESTION_CAP,
      fallbackIntro: sectionMeta?.intro ?? '',
      fallbackQuestions: sectionMeta?.questions ?? [],
    })

    // Persist any extracted facts.
    let createdFacts: { id: string; section: string; text: string; confidence: string }[] = []
    if (turn.facts.length) {
      await prisma.learnedFact.createMany({
        data: turn.facts.map((f) => ({
          userId,
          section: ls.section,
          text: f.text,
          confidence: f.confidence,
          source: 'learning',
          sessionId: ls.id,
        })),
      })
      createdFacts = await prisma.learnedFact.findMany({
        where: { userId, sessionId: ls.id },
        orderBy: { createdAt: 'desc' },
        take: turn.facts.length,
        select: { id: true, section: true, text: true, confidence: true },
      })
    }

    const assistantMsg: LearningMessage = {
      role: 'assistant',
      content: turn.reply,
      chips: turn.chips,
      at: new Date().toISOString(),
    }

    const newMessages = [...prior, userMsg, assistantMsg]

    await prisma.learningSession.update({
      where: { id: ls.id },
      data: {
        messages: newMessages as unknown as Prisma.InputJsonValue,
        questionCount: ls.questionCount + (turn.done ? 0 : 1),
        status: turn.done ? 'complete' : 'active',
        endedAt: turn.done ? new Date() : null,
      },
    })

    return NextResponse.json({
      reply: assistantMsg,
      facts: createdFacts,
      done: turn.done,
      questionCount: ls.questionCount + (turn.done ? 0 : 1),
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? 'Validation error' }, { status: 400 })
    }
    console.error('Learning message error:', err)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
