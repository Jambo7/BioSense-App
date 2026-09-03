/**
 * Ask Anything — ported from JARVIS /api/chat
 * Full context: profile + 30-day check-ins + latest blood + patterns
 * All output constrained by App 5 language rules via BIOSENSE_SYSTEM_PROMPT
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { callClaude, BIOSENSE_SYSTEM_PROMPT } from '@/lib/claude'
import { aggregateWearableMetrics } from '@/lib/wearable-metrics'
import {
  getBioAgeUnlockStatus,
  getLatestBiologicalAge,
} from '@/lib/maturity'
import { MATURITY } from '@/lib/maturity-config'
import { degradedChatReply, sanitizeChatReply } from '@/lib/chat-safety'
import { classifyUserMessage, safetyTemplate } from '@/lib/safety-gate'
import { hitRateLimit } from '@/lib/rate-limit'
import { TSB } from '@/lib/security-baseline'
import { z } from 'zod'

const schema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(z.object({ role: z.enum(['user', 'assistant']), content: z.string() }))
    .max(20)
    .optional(),
})

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { message, history } = schema.parse(body)

    const limited = await hitRateLimit({
      key: `chat:${authed.id}`,
      limit: TSB.chatPerUserPerMinute,
      windowMs: 60 * 1000,
    })
    if (!limited.ok) {
      return NextResponse.json(
        { error: 'Too many messages. Wait a moment and try again.' },
        { status: 429 },
      )
    }

    const blocked = classifyUserMessage(message)
    if (blocked) {
      const reply = safetyTemplate(blocked)
      await prisma.chatMessage.createMany({
        data: [
          { userId: authed.id, role: 'user', content: message },
          { userId: authed.id, role: 'assistant', content: reply },
        ],
      })
      return NextResponse.json({ reply, safety: blocked })
    }

    // Gather user context
    const [
      user,
      recentCheckins,
      latestScore,
      latestBlood,
      patterns,
      chatHistory,
      learnedFacts,
      wearables,
      bioUnlock,
      latestBioAge,
    ] = await Promise.all([
      prisma.user.findUnique({ where: { id: authed.id } }),
      prisma.dailyCheckin.findMany({
        where: { userId: authed.id },
        orderBy: { date: 'desc' },
        take: 30,
      }),
      prisma.healthScore.findFirst({
        where: { userId: authed.id },
        orderBy: { date: 'desc' },
      }),
      prisma.bloodResult.findFirst({
        where: { userId: authed.id },
        orderBy: { drawDate: 'desc' },
      }),
      prisma.pattern.findMany({
        where: { userId: authed.id },
        orderBy: { discoveredAt: 'desc' },
        take: 5,
      }),
      prisma.chatMessage.findMany({
        where: { userId: authed.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.learnedFact.findMany({
        where: { userId: authed.id },
        orderBy: { createdAt: 'desc' },
        take: 25,
        select: { section: true, text: true },
      }),
      prisma.wearableSync.findMany({
        where: { userId: authed.id },
        select: { provider: true, lastSync: true, data: true },
      }),
      getBioAgeUnlockStatus(authed.id),
      getLatestBiologicalAge(authed.id),
    ])

    const wearableMetrics = aggregateWearableMetrics(wearables)
    const wearableSummary =
      wearables.length > 0
        ? [
            `Connected: ${wearables.map((w) => w.provider).join(', ')}`,
            wearableMetrics.hrv != null ? `HRV≈${Math.round(wearableMetrics.hrv)}ms` : null,
            wearableMetrics.rhr != null ? `RHR≈${Math.round(wearableMetrics.rhr)}bpm` : null,
            wearableMetrics.steps != null ? `Steps≈${Math.round(wearableMetrics.steps)}` : null,
            wearableMetrics.sleepScore != null
              ? `Sleep score≈${Math.round(wearableMetrics.sleepScore)}`
              : null,
            wearableMetrics.recovery != null
              ? `Recovery≈${Math.round(wearableMetrics.recovery)}`
              : null,
          ]
            .filter(Boolean)
            .join(' | ')
        : 'No wearables connected'

    const bioAgeSummary = bioUnlock.unlocked
      ? latestBioAge
        ? `Unlocked — wellness estimate ${latestBioAge.bioAge} (calendar ${latestBioAge.calendarAge}, delta ${latestBioAge.delta >= 0 ? '+' : ''}${latestBioAge.delta}). Not a clinical or diagnostic age.`
        : `Unlocked (day ${bioUnlock.trackingDays}/${bioUnlock.unlockDays}) but not enough signals yet (need ≥${MATURITY.BIO_AGE_MIN_SIGNALS} of HRV/RHR/sleep/energy)`
      : `Locked — day ${bioUnlock.trackingDays} of ${bioUnlock.unlockDays} tracking`

    // Build context string
    const checkinSummary =
      recentCheckins.length > 0
        ? recentCheckins
            .slice(0, 7)
            .map(
              (c) =>
                `${new Date(c.date).toISOString().split('T')[0]}: energy=${c.energy} sleep=${c.sleep} mood=${c.mood} stress=${c.stress}`,
            )
            .join('\n')
        : 'No check-ins yet'

    const bloodSummary = latestBlood
      ? `Latest blood (${new Date(latestBlood.drawDate).toISOString().split('T')[0]}): ${latestBlood.aiSummary ?? 'No summary available'}`
      : 'No blood results uploaded'

    const patternSummary =
      patterns.length > 0
        ? patterns.map((p) => `- ${p.description} (${p.confidence} confidence)`).join('\n')
        : 'No patterns detected yet'

    const previousQuestions =
      chatHistory.length > 0
        ? chatHistory
            .filter((m) => m.role === 'user')
            .slice(0, 3)
            .map((m) => `"${m.content.slice(0, 100)}"`)
            .join(', ')
        : null

    const learnedSummary =
      learnedFacts.length > 0
        ? learnedFacts.map((f) => `- [${f.section}] ${f.text}`).join('\n')
        : 'Nothing learned yet'

    const contextBlock = `
USER PROFILE:
- Name: ${user?.name ?? 'Unknown'}
- Goals: ${user?.goals?.join(', ') || user?.goalText || 'Not set'}
- Conditions: ${user?.conditions?.join(', ') || 'None stated'}
- Lifestyle: ${user?.lifestyle || 'Not specified'}

WHAT BIOSENSE HAS LEARNED (from Learning Mode + registration):
${learnedSummary}

CURRENT HEALTH SCORE: ${latestScore?.score ?? 'Not calculated'}

WEARABLES:
${wearableSummary}

BIOLOGICAL AGE:
${bioAgeSummary}
(Wellness estimate from available signals only.)

LAST 7 CHECK-INS (energy/sleep/mood/stress out of 10):
${checkinSummary}

BLOOD RESULTS:
${bloodSummary}

PATTERNS:
${patternSummary}
${previousQuestions ? `\nPREVIOUS QUESTIONS: ${previousQuestions}` : ''}
`.trim()

    const systemPrompt = `${BIOSENSE_SYSTEM_PROMPT}

--- USER CONTEXT ---
${contextBlock}
--- END CONTEXT ---

Use the above context to personalise your educational response. Reference specific data points where relevant. Always follow the mandatory response structure.`

    // Build conversation
    const conversationHistory =
      history?.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })) ?? []

    const userContent =
      conversationHistory.length > 0
        ? `[Previous conversation context provided]\n\n${message}`
        : message

    let reply: string
    try {
      reply = sanitizeChatReply(await callClaude(systemPrompt, userContent, 2000))
    } catch (llmErr) {
      console.error('Chat LLM error:', llmErr)
      reply = degradedChatReply('error')
    }

    // Persist messages
    await prisma.chatMessage.createMany({
      data: [
        { userId: authed.id, role: 'user', content: message },
        { userId: authed.id, role: 'assistant', content: reply },
      ],
    })

    return NextResponse.json({ reply })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? "Validation error" }, { status: 400 })
    }
    console.error('Chat error:', err)
    return NextResponse.json({ reply: degradedChatReply('error') })
  }
}
