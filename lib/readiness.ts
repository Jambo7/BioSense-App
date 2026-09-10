import type { WearableMetrics } from '@/lib/wearable-metrics'

/** Short-term readiness from wearable signals only. Null until we have enough. */
export function computeReadiness(m: WearableMetrics): number | null {
  const parts: number[] = []
  if (m.sleepHours != null && m.sleepHours > 0) {
    parts.push(Math.max(0, Math.min(100, (m.sleepHours / 8) * 100)))
  }
  if (m.sleepScore != null) parts.push(Math.max(0, Math.min(100, m.sleepScore)))
  if (m.recovery != null) parts.push(Math.max(0, Math.min(100, m.recovery)))
  if (m.hrv != null) parts.push(Math.max(0, Math.min(100, (m.hrv / 70) * 100)))
  if (m.stress != null) parts.push(Math.max(0, Math.min(100, 100 - m.stress)))
  if (parts.length < 2) return null
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length)
}

export function readinessCaption(score: number | null): string {
  if (score == null) return 'Getting to know your normal'
  if (score >= 75) return 'Your body looks fairly ready today.'
  if (score >= 50) return 'You are in the middle of your usual range.'
  return 'Today looks like a lighter day.'
}

export function formatSleep(hours?: number): string {
  if (hours == null || !Number.isFinite(hours)) return '-'
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}
