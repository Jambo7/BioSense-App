/**
 * Maps stored Terra webhook payloads → the WearableData shape the health
 * score engine (lib/score.ts) expects.
 *
 * Terra normalises 500+ devices into a consistent schema, but not every
 * provider fills every field, so extraction is defensive: we read known
 * paths with fallbacks and simply omit anything missing (the score engine
 * already handles absent metrics gracefully).
 *
 * Prefer the most recent record that actually carries signal (non-zero steps,
 * HRV, etc.) — Fitbit/Oura often append an empty "today" stub that would
 * otherwise wipe real yesterday metrics if we always took the array tail.
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
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v)
    if (Number.isFinite(n)) return n
  }
  return undefined
}

/** Prefer newest record that satisfies `hasSignal`; else newest overall. */
function latestMeaningful(
  v: unknown,
  hasSignal: (rec: unknown) => boolean,
): unknown {
  if (!Array.isArray(v) || v.length === 0) return undefined
  for (let i = v.length - 1; i >= 0; i--) {
    if (hasSignal(v[i])) return v[i]
  }
  return v[v.length - 1]
}

function dailyHasSignal(rec: unknown): boolean {
  const steps =
    num(getPath(rec, 'distance_data.steps')) ??
    num(getPath(rec, 'distance_data.summary.steps'))
  const hrv =
    num(getPath(rec, 'heart_rate_data.summary.avg_hrv_rmssd')) ??
    num(getPath(rec, 'heart_rate_data.summary.avg_hrv_sdnn'))
  const rhr = num(getPath(rec, 'heart_rate_data.summary.resting_hr_bpm'))
  const recovery =
    num(getPath(rec, 'scores.recovery')) ?? num(getPath(rec, 'scores.readiness'))
  return (
    (steps != null && steps > 0) ||
    hrv != null ||
    rhr != null ||
    recovery != null
  )
}

function sleepHasSignal(rec: unknown): boolean {
  const eff = num(getPath(rec, 'sleep_durations_data.sleep_efficiency'))
  const asleep = num(
    getPath(rec, 'sleep_durations_data.asleep.duration_asleep_state_seconds'),
  )
  const score = num(getPath(rec, 'scores.sleep'))
  const hrv =
    num(getPath(rec, 'heart_rate_data.summary.avg_hrv_rmssd')) ??
    num(getPath(rec, 'heart_rate_data.summary.avg_hrv_sdnn'))
  return eff != null || (asleep != null && asleep > 0) || score != null || hrv != null
}

function activityHasSignal(rec: unknown): boolean {
  const steps =
    num(getPath(rec, 'distance_data.steps')) ??
    num(getPath(rec, 'distance_data.summary.steps'))
  const aSec = num(getPath(rec, 'active_durations_data.activity_seconds'))
  return (steps != null && steps > 0) || (aSec != null && aSec > 0)
}

/** Extract metrics from one WearableSync.data JSON blob. */
export function metricsFromSyncData(data: unknown): WearableMetrics {
  const m: WearableMetrics = {}
  if (!data || typeof data !== 'object') return m

  // --- Daily summary: steps, resting HR, HRV, active time, recovery ---
  const daily = latestMeaningful(getPath(data, 'payloads.daily.data'), dailyHasSignal)
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
    const activitySec =
      num(getPath(daily, 'active_durations_data.activity_seconds')) ??
      num(getPath(daily, 'active_durations_data.moderate_intensity_seconds')) ??
      num(getPath(daily, 'active_durations_data.vigorous_intensity_seconds'))
    if (activitySec != null) m.activeMinutes = Math.round(activitySec / 60)
    m.recovery =
      num(getPath(daily, 'scores.recovery')) ??
      num(getPath(daily, 'scores.readiness')) ??
      m.recovery
    const avgStress =
      num(getPath(daily, 'stress_data.avg_stress_level')) ??
      num(getPath(daily, 'stress_data.stress_duration_seconds'))
    if (avgStress != null && avgStress <= 100) m.stress = avgStress
  }

  // --- Sleep: efficiency / score, duration, overnight HRV/RHR ---
  const sleep = latestMeaningful(getPath(data, 'payloads.sleep.data'), sleepHasSignal)
  if (sleep) {
    const eff = num(getPath(sleep, 'sleep_durations_data.sleep_efficiency'))
    const sleepScore =
      num(getPath(sleep, 'scores.sleep')) ??
      (eff != null ? (eff <= 1 ? Math.round(eff * 100) : Math.round(eff)) : undefined)
    if (sleepScore != null) m.sleepScore = sleepScore

    const asleepSec =
      num(getPath(sleep, 'sleep_durations_data.asleep.duration_asleep_state_seconds')) ??
      num(getPath(sleep, 'sleep_durations_data.asleep_duration_seconds')) ??
      num(getPath(sleep, 'metadata.duration_seconds'))
    if (asleepSec != null && asleepSec > 0) {
      m.sleepHours = Math.round((asleepSec / 3600) * 10) / 10
    }

    m.hrv =
      num(getPath(sleep, 'heart_rate_data.summary.avg_hrv_rmssd')) ??
      num(getPath(sleep, 'heart_rate_data.summary.avg_hrv_sdnn')) ??
      m.hrv
    m.rhr = m.rhr ?? num(getPath(sleep, 'heart_rate_data.summary.resting_hr_bpm'))
    m.recovery =
      m.recovery ??
      num(getPath(sleep, 'scores.recovery')) ??
      num(getPath(sleep, 'scores.readiness'))
  }

  // --- Activity: fallback for steps / active minutes (Strava etc.) ---
  const activity = latestMeaningful(getPath(data, 'payloads.activity.data'), activityHasSignal)
  if (activity) {
    if (m.steps == null || m.steps === 0) {
      const s =
        num(getPath(activity, 'distance_data.summary.steps')) ??
        num(getPath(activity, 'distance_data.steps'))
      if (s != null && s > 0) m.steps = s
    }
    const aSec = num(getPath(activity, 'active_durations_data.activity_seconds'))
    if (m.activeMinutes == null && aSec != null) m.activeMinutes = Math.round(aSec / 60)
  }

  // --- Body: occasional RHR / composition-adjacent resting measures ---
  const body = latestMeaningful(getPath(data, 'payloads.body.data'), (rec) => {
    return num(getPath(rec, 'heart_data.heart_rate_data.summary.resting_hr_bpm')) != null
  })
  if (body && m.rhr == null) {
    m.rhr =
      num(getPath(body, 'heart_data.heart_rate_data.summary.resting_hr_bpm')) ??
      num(getPath(body, 'heart_rate_data.summary.resting_hr_bpm'))
  }

  // Drop pure-zero steps (empty Fitbit stub) so aggregation can keep an older day.
  if (m.steps === 0) delete m.steps
  if (m.activeMinutes === 0) delete m.activeMinutes

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

/** Compact one-line summary for reports / chat. */
export function formatWearableMetricsSummary(m: WearableMetrics): string {
  const parts: string[] = []
  if (m.hrv != null) parts.push(`HRV≈${Math.round(m.hrv)}ms`)
  if (m.rhr != null) parts.push(`RHR≈${Math.round(m.rhr)}bpm`)
  if (m.steps != null) parts.push(`steps≈${Math.round(m.steps)}`)
  if (m.sleepScore != null) parts.push(`sleepScore≈${Math.round(m.sleepScore)}`)
  if (m.sleepHours != null) parts.push(`sleep≈${m.sleepHours}h`)
  if (m.recovery != null) parts.push(`recovery≈${Math.round(m.recovery)}`)
  if (m.activeMinutes != null) parts.push(`active≈${m.activeMinutes}m`)
  return parts.length > 0 ? parts.join(', ') : 'no wearable metrics extracted'
}
