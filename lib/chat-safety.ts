/**
 * Soft safety net for educational chat — not the full ENG-010 safety floor.
 * Catches common diagnostic / directive slips in model output and provides
 * a degraded reply when the LLM is unavailable.
 */

const DIAGNOSIS_PATTERNS: RegExp[] = [
  /\byou have\b.{0,40}\b(diabetes|cancer|anemia|anaemia|infection|disease|disorder|syndrome)\b/i,
  /\b(diagnos(e|is|ed)|you are suffering from)\b/i,
  /\bi (recommend|suggest|prescribe)\b/i,
  /\byou (must|should|need to) (take|start|stop|increase|decrease)\b.{0,40}\b(medication|drug|dose|supplement)\b/i,
  /\bthis (is|means) (dangerous|life[- ]threatening|an emergency)\b/i,
]

const DISCLAIMER =
  'This information is for educational purposes only and is not medical advice. Consult a qualified healthcare professional before making any changes.'

export function sanitizeChatReply(reply: string): string {
  let text = reply.trim()
  if (!text) return degradedChatReply('empty')

  let flagged = false
  for (const re of DIAGNOSIS_PATTERNS) {
    if (re.test(text)) {
      flagged = true
      break
    }
  }

  if (flagged) {
    text =
      'I can share general educational context about health topics, but I can’t diagnose conditions or tell you what treatment to take.\n\n' +
      'If you’d like, ask about what your recent check-ins, wearables, or blood markers show in educational terms — or speak with a qualified clinician for personal medical advice.'
  }

  if (!/educational purposes only/i.test(text)) {
    text = `${text}\n\n${DISCLAIMER}`
  }

  return text
}

export function degradedChatReply(reason: 'error' | 'empty' = 'error'): string {
  const lead =
    reason === 'empty'
      ? 'I wasn’t able to compose a full reply just now.'
      : 'BioSense AI is temporarily unavailable.'
  return (
    `${lead} Your data is still saved — try again in a moment, or review your dashboard and insights in the meantime.\n\n` +
    DISCLAIMER
  )
}
