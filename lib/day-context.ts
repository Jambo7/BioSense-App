export const CONTEXT_TAGS = [
  { id: 'alcohol', label: 'Alcohol' },
  { id: 'late_meal', label: 'Late meal' },
  { id: 'hard_training', label: 'Hard training' },
  { id: 'high_stress', label: 'High stress' },
  { id: 'travel', label: 'Travel' },
  { id: 'illness', label: 'Illness' },
  { id: 'poor_sleep', label: 'Poor sleep' },
  { id: 'nothing', label: 'Nothing unusual' },
] as const

export const FEELINGS = [
  { id: 'low', label: 'Low' },
  { id: 'okay', label: 'Okay' },
  { id: 'good', label: 'Good' },
  { id: 'great', label: 'Great' },
] as const

export type FeelingId = (typeof FEELINGS)[number]['id']

/** Maps Today's Context feeling onto the existing DailyCheckin 1-10 fields. */
export function feelingToCheckin(feeling: FeelingId): {
  energy: number
  sleep: number
  mood: number
  stress: number
} {
  switch (feeling) {
    case 'low':
      return { energy: 3, sleep: 4, mood: 3, stress: 7 }
    case 'okay':
      return { energy: 5, sleep: 6, mood: 5, stress: 5 }
    case 'good':
      return { energy: 7, sleep: 7, mood: 7, stress: 4 }
    case 'great':
      return { energy: 9, sleep: 8, mood: 9, stress: 3 }
  }
}

function avg(values: number[]): number | null {
  if (values.length === 0) return null
  return values.reduce((a, b) => a + b, 0) / values.length
}

/** Honest prompt from real wearable history. Never invents a signal. */
export function suggestContextPrompt(input: {
  rhr?: number
  rhrHistory: number[]
  sleepHours?: number
  sleepHistory: number[]
}): { notice: string | null; prompt: string; basedOn: string[] } {
  const basedOn: string[] = []
  if (input.rhr != null) basedOn.push('RHR')
  if (input.sleepHours != null) basedOn.push('Sleep')
  if (input.rhrHistory.length >= 3 || input.sleepHistory.length >= 3) basedOn.push('7-day baseline')

  const rhrBaseline = avg(input.rhrHistory)
  if (input.rhr != null && rhrBaseline != null && input.rhrHistory.length >= 3) {
    const delta = Math.round(input.rhr - rhrBaseline)
    if (delta >= 3) {
      return {
        notice: 'We noticed your resting heart rate was higher last overnight.',
        prompt: `Your resting heart rate was ${delta} bpm above your recent baseline. A little context helps BioSense understand what may be influencing today.`,
        basedOn,
      }
    }
    if (delta <= -3) {
      return {
        notice: 'Resting heart rate looks a little lower than your recent baseline.',
        prompt: `Your resting heart rate was ${Math.abs(delta)} bpm below your recent baseline. A little context helps BioSense understand what may be influencing today.`,
        basedOn,
      }
    }
  }

  const sleepBaseline = avg(input.sleepHistory)
  if (input.sleepHours != null && sleepBaseline != null && input.sleepHistory.length >= 3) {
    const delta = input.sleepHours - sleepBaseline
    if (delta <= -0.75) {
      return {
        notice: 'Last night looked shorter than your usual sleep.',
        prompt: 'A little context helps BioSense understand what may be influencing today.',
        basedOn,
      }
    }
  }

  return {
    notice: null,
    prompt: 'A little context helps BioSense understand what may be influencing today.',
    basedOn,
  }
}
