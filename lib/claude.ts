/**
 * BioSense AI service — OpenAI-backed.
 *
 * All AI features in the app (Ask Anything chat, blood analysis, reports and
 * Learning Mode) funnel through `callClaude()` below. The name is kept for
 * historical reasons; under the hood it now calls OpenAI. Switch the model via
 * the OPENAI_MODEL env var (defaults to gpt-4o).
 */
import OpenAI from 'openai'

let _client: OpenAI | null = null
function getClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY ?? 'placeholder',
    })
  }
  return _client
}

const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o'

/**
 * Core LLM wrapper with retry on rate-limit / transient server errors.
 */
export async function callClaude(
  system: string,
  user: string,
  maxTokens = 1500,
): Promise<string> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await getClient().chat.completions.create({
        model: MODEL,
        max_tokens: maxTokens,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      })
      return res.choices[0]?.message?.content ?? ''
    } catch (err) {
      const status = (err as { status?: number })?.status
      if ((status === 429 || status === 500 || status === 503 || status === 529) && attempt < 2) {
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)))
        continue
      }
      throw err
    }
  }
  return ''
}

/**
 * BioSense App 5 system prompt — enforces prohibited/approved language.
 * Every response follows: Data Summary → Educational Context → Trend Analysis
 * → Neutral Guidance → Disclaimer
 */
export const BIOSENSE_SYSTEM_PROMPT = `You are BioSense AI — a personalised health education assistant.

MANDATORY RESPONSE STRUCTURE:
1. Data Summary — what the data shows (factual, neutral)
2. Educational Context — what is generally known about this (cited if possible)
3. Trend Analysis — how this has changed over time (if data available)
4. Neutral Guidance — general actions commonly associated with improvement
5. Disclaimer — always end with: "This information is for educational purposes only and is not medical advice. Consult a qualified healthcare professional before making any changes."

APPROVED LANGUAGE (always use):
- "may be associated with"
- "commonly observed in"
- "within / outside typical ranges"
- "educational insight"
- "general information"

PROHIBITED LANGUAGE (never use):
- "causes / leads to / results in" (causal claims)
- "you should / you must / you need to" (directives)
- "you have [condition]" (diagnoses)
- "I recommend / I suggest" (medical recommendations)
- "This is dangerous / Seek immediate care" (acute risk, unless genuine emergency)
- Never combine multiple abnormal markers to infer a condition
- Acknowledge incomplete or missing data rather than guessing

If a user appears to be in acute distress or danger, only say:
"If you are feeling unwell, consider seeking urgent medical attention."

You must never pretend to be a doctor, nurse, or any medical professional.`

// ── Learning Mode ──────────────────────────────────────────────────────────

export const LEARNING_MODE_SYSTEM_PROMPT = `You are BioSense AI running "Learning Mode" — a warm, conversational onboarding-over-time experience that gradually builds understanding of the user so insights can be personalised.

PERSONALITY & STYLE:
- Sound human, curious and encouraging — never like a clinical questionnaire.
- Ask EXACTLY ONE question per turn. Keep replies to 1–3 short sentences.
- Acknowledge what the user just said before asking the next question (reference their actual words).
- Briefly explain WHY a question matters when it isn't obvious.
- Stay strictly within the current focus topic for this session.
- Never diagnose, never give medical advice, never use causal/directive language.
- If the user gives a thin or "skip" answer, gently move on — don't push.

OUTPUT FORMAT — you MUST return ONLY a single JSON object, no prose, no markdown fences:
{
  "reply": "your next message to the user (acknowledgement + one question, OR a wrap-up if done)",
  "chips": ["optional", "quick-reply", "suggestions"],   // 0–4 short options when a question suits chips; otherwise []
  "facts": [ { "text": "a concise durable thing you learned, written in third person", "confidence": "High|Medium|Low" } ],  // 0–2 items extracted from the LAST user answer; [] if nothing concrete
  "done": false   // true when this session has covered enough or should pause
}`

export interface LearningTurnInput {
  sectionId: string
  sectionLabel: string
  phaseLabel: string
  userName?: string | null
  knownFacts: string[]
  transcript: { role: 'assistant' | 'user'; content: string }[]
  questionCount: number
  questionCap: number
  fallbackIntro: string
  fallbackQuestions: string[]
}

export interface LearningTurnResult {
  reply: string
  chips: string[]
  facts: { text: string; confidence: string }[]
  done: boolean
}

function extractJsonObject(raw: string): Record<string, unknown> | null {
  if (!raw) return null
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  try {
    return JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>
  } catch {
    return null
  }
}

function sentenceCase(s: string): string {
  const t = s.trim()
  if (!t) return t
  return t.charAt(0).toUpperCase() + t.slice(1)
}

/**
 * Scripted fallback used when ANTHROPIC_API_KEY is absent or the API fails,
 * so Learning Mode always works (great for local dev and resilience).
 */
function learningFallback(input: LearningTurnInput): LearningTurnResult {
  const isOpening = input.transcript.length === 0
  if (isOpening) {
    const hi = input.userName ? `Hi ${input.userName.split(' ')[0]}! ` : ''
    return {
      reply: `${hi}${input.fallbackIntro}`,
      chips: [],
      facts: [],
      done: false,
    }
  }

  const lastUser = [...input.transcript].reverse().find((m) => m.role === 'user')
  const answer = lastUser?.content?.trim() ?? ''
  const facts: { text: string; confidence: string }[] = []
  const skipped = /^(skip|pass|not sure|idk|i don'?t know|n\/?a)$/i.test(answer)
  if (answer.length > 1 && !skipped) {
    facts.push({ text: sentenceCase(answer), confidence: 'Medium' })
  }

  // questionCount counts assistant questions already asked (incl. the intro).
  const nextIndex = input.questionCount - 1
  const reachedCap = input.questionCount >= input.questionCap
  const exhausted = nextIndex >= input.fallbackQuestions.length

  if (reachedCap || exhausted) {
    return {
      reply: "That's really helpful, thank you. That's enough for now — I've saved what we covered and we can pick this up again whenever you like.",
      chips: [],
      facts,
      done: true,
    }
  }

  const ack = skipped ? 'No problem.' : 'Got it, thank you.'
  return {
    reply: `${ack} ${input.fallbackQuestions[nextIndex]}`,
    chips: [],
    facts,
    done: false,
  }
}

/**
 * Produce the assistant's next turn in a Learning Mode session: an
 * acknowledgement + one question (or a wrap-up), plus any facts extracted
 * from the user's most recent answer. Uses Claude when available, otherwise
 * a scripted fallback so the experience never breaks.
 */
export async function learningTurn(input: LearningTurnInput): Promise<LearningTurnResult> {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'placeholder') {
    return learningFallback(input)
  }

  const transcriptText = input.transcript.length
    ? input.transcript.map((m) => `${m.role === 'assistant' ? 'BioSense' : 'User'}: ${m.content}`).join('\n')
    : '(no messages yet — this is the opening turn)'

  const knownText = input.knownFacts.length
    ? input.knownFacts.map((f) => `- ${f}`).join('\n')
    : '(nothing learned yet)'

  const user = `FOCUS SECTION: ${input.sectionLabel} (phase: ${input.phaseLabel})
USER NAME: ${input.userName ?? 'Unknown'}
QUESTIONS ASKED THIS SESSION: ${input.questionCount} of a soft cap of ${input.questionCap}

ALREADY KNOWN ABOUT THIS USER:
${knownText}

CONVERSATION SO FAR:
${transcriptText}

INSTRUCTIONS:
${input.transcript.length === 0
    ? `This is the OPENING turn. Warmly introduce this topic in one short sentence and ask your first question about ${input.sectionLabel.toLowerCase()}. "facts" must be [] and "done" must be false.`
    : `Extract any concrete facts from the user's LAST answer, then either ask ONE natural follow-up question about ${input.sectionLabel.toLowerCase()} that builds on what they said, OR set "done": true with a brief, warm wrap-up if you've gathered enough (or the cap is reached).`}

Return ONLY the JSON object.`

  try {
    const raw = await callClaude(LEARNING_MODE_SYSTEM_PROMPT, user, 700)
    const parsed = extractJsonObject(raw)
    if (!parsed || typeof parsed.reply !== 'string') return learningFallback(input)

    const rawFacts = Array.isArray(parsed.facts) ? parsed.facts : []
    const facts = rawFacts
      .map((f) => f as Record<string, unknown>)
      .filter((f) => typeof f.text === 'string' && (f.text as string).trim())
      .slice(0, 2)
      .map((f) => {
        const conf = f.confidence
        return {
          text: (f.text as string).trim(),
          confidence:
            typeof conf === 'string' && ['High', 'Medium', 'Low'].includes(conf) ? conf : 'Medium',
        }
      })

    const rawChips = Array.isArray(parsed.chips) ? parsed.chips : []
    const chips = rawChips
      .filter((c): c is string => typeof c === 'string' && c.trim().length > 0)
      .slice(0, 4)

    return {
      reply: (parsed.reply as string).trim(),
      chips,
      facts,
      done: parsed.done === true || input.questionCount >= input.questionCap,
    }
  } catch (err) {
    console.error('learningTurn error, falling back:', err)
    return learningFallback(input)
  }
}

/**
 * Blood analysis prompt — returns structured JSON analysis.
 */
export const BLOOD_ANALYSIS_PROMPT = `You are BioSense AI analysing a blood test result.

Extract ALL biomarkers from the provided text. For each biomarker, return:
{
  "name": "marker name",
  "value": numeric value,
  "unit": "unit of measurement",
  "refMin": reference range minimum (numeric),
  "refMax": reference range maximum (numeric),
  "tier": "T1" | "T2" | "T3"
}

Tier definitions:
- T1 (Normal/🟢): value within reference range
- T2 (Moderate/🟡): value 10-20% outside range OR borderline
- T3 (Red Flag/🔴): value >20% outside range OR clinically significant deviation

Return a JSON object:
{
  "markers": [...],
  "summary": "2-3 sentence educational summary following App 5 language rules",
  "t1Count": number,
  "t2Count": number,
  "t3Count": number
}

${BIOSENSE_SYSTEM_PROMPT}`
