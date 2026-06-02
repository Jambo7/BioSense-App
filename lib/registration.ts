// Shared registration / info-gathering metadata. Used by the onboarding
// carousel (UI) and the onboarding API (to build a readable goal summary and
// seed initial "learned facts").

export const GOAL_OPTIONS: { id: string; label: string }[] = [
  { id: 'more_energy', label: 'More energy' },
  { id: 'better_sleep', label: 'Better sleep' },
  { id: 'improve_fitness', label: 'Improve fitness' },
  { id: 'improve_recovery', label: 'Improve recovery' },
  { id: 'weight_loss', label: 'Weight loss' },
  { id: 'muscle_gain', label: 'Muscle gain' },
  { id: 'reduce_stress', label: 'Reduce stress' },
  { id: 'better_focus', label: 'Better focus' },
  { id: 'improve_nutrition', label: 'Improve nutrition' },
  { id: 'longterm_health', label: 'Long-term health' },
  { id: 'understand_body', label: 'Understand my body better' },
  { id: 'track_biomarkers', label: 'Track biomarkers' },
]

export const GOAL_LABEL: Record<string, string> = Object.fromEntries(
  GOAL_OPTIONS.map((g) => [g.id, g.label]),
)

export const ACTIVITY_LABEL: Record<string, string> = {
  LOW: 'Low — little to no exercise',
  MODERATE: 'Moderate — 1–3 days of exercise per week',
  HIGH: 'High — 4–6 days of exercise per week',
  VERY_HIGH: 'Very high — daily intense training',
}

export const SLEEP_LABEL: Record<string, string> = {
  GREAT: 'Sleeps well and wakes refreshed',
  OKAY: 'Sleep is inconsistent',
  POOR: 'Often struggles to fall or stay asleep',
}

export const ENERGY_LABEL: Record<string, string> = {
  HIGH: 'Feels energised and ready to go',
  VARIABLE: 'Energy fluctuates throughout the day',
  LOW: 'Often feels tired or drained',
}
