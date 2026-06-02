// Learning Mode — shared metadata, section taxonomy, phase mapping, a scripted
// question bank (used as a graceful fallback when the LLM is unavailable), and
// progress helpers. Mirrors the client's "Structure & Conversational Journey".

export type LearningPhaseId = 'FOUNDATIONS' | 'LIFESTYLE' | 'HEALTH_CONTEXT' | 'LONGITUDINAL'

export interface SectionMeta {
  id: string
  label: string
  phase: LearningPhaseId
  /** Roughly how many durable facts represent a "complete" understanding. */
  target: number
  /** Opening line + scripted follow-ups used when the LLM is offline. */
  intro: string
  questions: string[]
}

// The 9 surfaced sections (match the "My understanding" dashboard in the brief).
export const SECTIONS: SectionMeta[] = [
  {
    id: 'energy',
    label: 'Energy',
    phase: 'FOUNDATIONS',
    target: 4,
    intro: "I'd love to start with your energy. How have your energy levels felt recently?",
    questions: [
      'When during the day do you usually feel best?',
      'When do you usually feel most tired?',
      'Do you notice energy crashes after meals?',
      'What tends to drain your energy most lately?',
    ],
  },
  {
    id: 'sleep',
    label: 'Sleep',
    phase: 'FOUNDATIONS',
    target: 4,
    intro: 'How have you been sleeping lately?',
    questions: [
      'What time do you normally fall asleep?',
      'What time do you usually wake up?',
      'Do you usually wake feeling refreshed?',
      'Does anything tend to disrupt your sleep?',
    ],
  },
  {
    id: 'stress',
    label: 'Stress',
    phase: 'FOUNDATIONS',
    target: 4,
    intro: 'How stressed do you usually feel during the week?',
    questions: [
      'What tends to raise your stress the most?',
      'Do you feel mentally tired, physically tired, or both?',
      'Do you find stress affects your sleep?',
      'What helps you recover or feel better when stress is high?',
    ],
  },
  {
    id: 'exercise',
    label: 'Exercise',
    phase: 'FOUNDATIONS',
    target: 4,
    intro: 'What type of exercise do you enjoy most?',
    questions: [
      'How many days per week do you normally train?',
      'Do you prefer the gym, outdoor activity, classes or sports?',
      'Do you currently feel fit?',
      'Does exercise tend to boost your energy or drain it?',
    ],
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    phase: 'FOUNDATIONS',
    target: 4,
    intro: 'What does a normal breakfast look like for you?',
    questions: [
      'Do you tend to eat consistently or irregularly?',
      'How much caffeine do you usually consume?',
      'Do you notice energy crashes after meals?',
      'How would you describe your relationship with food?',
    ],
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    phase: 'LIFESTYLE',
    target: 4,
    intro: 'What does a typical work week look like for you?',
    questions: [
      'Do you travel often, and does it disrupt your routine?',
      'Are there family or work demands that shape your days?',
      'How consistent are your routines week to week?',
      'What recovery habits help you wind down?',
    ],
  },
  {
    id: 'health_history',
    label: 'Health history',
    phase: 'HEALTH_CONTEXT',
    target: 4,
    intro: 'Are there any symptoms or health concerns on your mind lately?',
    questions: [
      'Do you take any supplements regularly?',
      'Are you taking any medications?',
      'Is there anything in your health history that feels relevant?',
      'Have you noticed any hormonal patterns worth tracking?',
    ],
  },
  {
    id: 'biomarker_context',
    label: 'Biomarker context',
    phase: 'HEALTH_CONTEXT',
    target: 3,
    intro: 'Have you had any blood tests or biomarkers checked recently?',
    questions: [
      'Are there any markers you specifically want to keep an eye on?',
      'Has a clinician ever flagged anything for you to monitor?',
      'What would you most like to understand about your biomarkers?',
    ],
  },
  {
    id: 'goals',
    label: 'Goals & motivation',
    phase: 'LONGITUDINAL',
    target: 3,
    intro: 'What matters most to you health-wise over the next few months?',
    questions: [
      'What does success look like for you?',
      'What tends to get in the way of your goals?',
      'How do you like to stay motivated?',
    ],
  },
]

export const SECTION_BY_ID: Record<string, SectionMeta> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s]),
)

export const PHASE_LABEL: Record<LearningPhaseId, string> = {
  FOUNDATIONS: 'Foundations',
  LIFESTYLE: 'Lifestyle & patterns',
  HEALTH_CONTEXT: 'Health context',
  LONGITUDINAL: 'Longitudinal intelligence',
}

/** Max questions in a single session before we offer to pause (brief: 5–8). */
export const SESSION_QUESTION_CAP = 7

export function progressStatus(percent: number): string {
  if (percent >= 50) return 'Good'
  if (percent >= 25) return 'Fair'
  return 'Just started'
}

/** Compute per-section percent from how many durable facts exist per section. */
export function computeProgress(factCountsBySection: Record<string, number>) {
  const sections = SECTIONS.map((s) => {
    const count = factCountsBySection[s.id] ?? 0
    const percent = Math.min(100, Math.round((count / s.target) * 100))
    return {
      id: s.id,
      label: s.label,
      phase: s.phase,
      percent,
      status: progressStatus(percent),
    }
  })
  const overall = Math.round(
    sections.reduce((sum, s) => sum + s.percent, 0) / sections.length,
  )
  return { sections, overall }
}

export interface LearningMessage {
  role: 'assistant' | 'user'
  content: string
  /** Optional quick-reply chips offered alongside an assistant question. */
  chips?: string[]
  at?: string
}
