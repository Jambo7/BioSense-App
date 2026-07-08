/**
 * Maps stored Terra webhook payloads → the WearableData shape the health
 * score engine (lib/score.ts) expects.
 *
 * Terra normalises 500+ devices into a consistent schema, but not every
 * provider fills every field, so extraction is defensive: we read known
 * paths with fallbacks and simply omit anything missing (the score engine
 * already handles absent metrics gracefully).
 *
 * NOTE: field paths follow Terra's normalised data models. If a real
 * provider turns out to nest a value differently, adjust the paths here —
 * this is the single place that knows about Terra's payload shape.
 */

export interface WearableMetrics {
  hrv?: number
  rhr?: number
  steps?: number
  activeMinutes?: number
  sleepScore?: number
  /** Total time asleep, in hours (for the readiness "Sleep" tile). */
  sleepHours?: number
  /** Recovery / readiness score 0-100 (Whoop `scores.recovery`, etc.). */
  recovery?: number
  /** Average daily stress level 0-100 (Garmin/Samsung); absent for Whoop. */
  stress?: number
}

function getPath(obj: unknown, path: string): unknown {
  let cur: unknown = obj
  for (const key of path.split('.')) {
    if (cur && typeof cur === 'object' && key in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[key]
    } else {
      return undefined
    }
  }
  return cur
}

function num(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined
}

/** Terra sends arrays of summaries; take the most recent entry. */
function latest(v: unknown): unknown {
  return Array.isArray(v) && v.length > 0 ? v[v.length - 1] : undefined
}

/** Extract metrics from one WearableSync.data JSON blob. */
export function metricsFromSyncData(data: unknown): WearableMetrics {
  const m: WearableMetrics = {}
  if (!data || typeof data !== 'object') return m

  // --- Daily summary: steps, resting HR, HRV, active time ---
  const daily = latest(getPath(data, 'payloads.daily.data'))
  if (daily) {
    m.rhr = num(getPath(daily, 'heart_rate_data.summary.resting_hr_bpm')) ?? m.rhr
    m.hrv =
      num(getPath(daily, 'heart_rate_data.summary.avg_hrv_rmssd')) ??
      num(getPath(daily, 'heart_rate_data.summary.avg_hrv_sdnn')) ??
      m.hrv
    m.steps =
      num(getPath(daily, 'distance_data.steps')) ??
      num(getPath(daily, 'distance_data.summary.steps')) ??
      m.steps
    const activitySec = num(getPath(daily, 'active_durations_data.activity_seconds'))
    if (activitySec != null) m.activeMinutes = Math.round(activitySec / 60)
    m.recovery = num(getPath(daily, 'scores.recovery')) ?? m.recovery
    const avgStress = num(getPath(daily, 'stress_data.avg_stress_level'))
    if (avgStress != null) m.stress = avgStress
  }

  // --- Sleep: sleep efficiency as a 0-100 proxy score, plus overnight HRV/RHR ---
  const sleep = latest(getPath(data, 'payloads.sleep.data'))
  if (sleep) {
    const eff = num(getPath(sleep, 'sleep_durations_data.sleep_efficiency'))
    if (eff != null) m.sleepScore = eff <= 1 ? Math.round(eff * 100) : Math.round(eff)
    const asleepSec = num(
      getPath(sleep, 'sleep_durations_data.asleep.duration_asleep_state_seconds'),
    )
    if (asleepSec != null) m.sleepHours = Math.round((asleepSec / 3600) * 10) / 10
    m.hrv =
      num(getPath(sleep, 'heart_rate_data.summary.avg_hrv_rmssd')) ??
      num(getPath(sleep, 'heart_rate_data.summary.avg_hrv_sdnn')) ??
      m.hrv
    m.rhr = m.rhr ?? num(getPath(sleep, 'heart_rate_data.summary.resting_hr_bpm'))
  }

  // --- Activity: fallback for steps / active minutes ---
  const activity = latest(getPath(data, 'payloads.activity.data'))
  if (activity) {
    if (m.steps == null) m.steps = num(getPath(activity, 'distance_data.summary.steps'))
    const aSec = num(getPath(activity, 'active_durations_data.activity_seconds'))
    if (m.activeMinutes == null && aSec != null) m.activeMinutes = Math.round(aSec / 60)
  }

  return m
}

/**
 * Merge metrics across all of a user's connected providers. Rows are applied
 * oldest → newest by lastSync, so the freshest non-null value wins.
 */
export function aggregateWearableMetrics(
  rows: Array<{ lastSync: Date | null; data: unknown }>,
): WearableMetrics {
  const sorted = [...rows].sort(
    (a, b) => (a.lastSync?.getTime() ?? 0) - (b.lastSync?.getTime() ?? 0),
  )
  let merged: WearableMetrics = {}
  for (const row of sorted) {
    const m = metricsFromSyncData(row.data)
    for (const [key, value] of Object.entries(m)) {
      if (value != null) merged = { ...merged, [key]: value }
    }
  }
  return merged
}
