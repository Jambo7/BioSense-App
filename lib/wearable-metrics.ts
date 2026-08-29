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

  const rec = data as Record<string, unknown>
  if (rec.source === 'healthkit') {
    const latest = rec.latest
    if (latest && typeof latest === 'object') {
      const l = latest as Record<string, unknown>
      if (typeof l.hrv === 'number') m.hrv = l.hrv
      if (typeof l.rhr === 'number') m.rhr = l.rhr
      if (typeof l.steps === 'number') m.steps = l.steps
      if (typeof l.activeMinutes === 'number') m.activeMinutes = l.activeMinutes
      if (typeof l.sleepHours === 'number') m.sleepHours = l.sleepHours
    }
    if (m.steps === 0) delete m.steps
    if (m.activeMinutes === 0) delete m.activeMinutes
    return m
  }

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

// ── Per-day breakdown ────────────────────────────────────────────────────────
// Terra payloads overwrite each other per event type, so the only history we
// can mine is whatever date range the *current* payload arrays cover (webhook
// backfills often span 7-28 days). This walks every record, buckets metrics by
// calendar date, and lets callers persist them into WearableDay rows.

function recordDate(rec: unknown, preferEnd = false): string | null {
  const start = getPath(rec, 'metadata.start_time')
  const end = getPath(rec, 'metadata.end_time')
  const raw = preferEnd ? (end ?? start) : (start ?? end)
  if (typeof raw !== 'string' || raw.length < 10) return null
  const d = raw.slice(0, 10)
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null
}

function mergeDay(
  map: Map<string, WearableMetrics>,
  date: string,
  patch: WearableMetrics,
): void {
  const prev = map.get(date) ?? {}
  const next = { ...prev }
  for (const [k, v] of Object.entries(patch)) {
    if (v != null) (next as Record<string, number>)[k] = v
  }
  map.set(date, next)
}

/** Extract per-calendar-day metrics from one WearableSync.data JSON blob. */
export function dailyBreakdownFromSyncData(
  data: unknown,
): Map<string, WearableMetrics> {
  const days = new Map<string, WearableMetrics>()
  if (!data || typeof data !== 'object') return days

  const rec = data as Record<string, unknown>
  if (rec.source === 'healthkit' && Array.isArray(rec.days)) {
    for (const row of rec.days) {
      if (!row || typeof row !== 'object') continue
      const d = row as Record<string, unknown>
      if (typeof d.date !== 'string') continue
      mergeDay(days, d.date, {
        steps: typeof d.steps === 'number' ? d.steps : undefined,
        rhr: typeof d.rhr === 'number' ? d.rhr : undefined,
        hrv: typeof d.hrv === 'number' ? d.hrv : undefined,
        activeMinutes: typeof d.activeMinutes === 'number' ? d.activeMinutes : undefined,
        sleepHours: typeof d.sleepHours === 'number' ? d.sleepHours : undefined,
      })
    }
    return days
  }

  const dailyArr = getPath(data, 'payloads.daily.data')
  if (Array.isArray(dailyArr)) {
    for (const rec of dailyArr) {
      const date = recordDate(rec)
      if (!date) continue
      const m: WearableMetrics = {}
      m.rhr = num(getPath(rec, 'heart_rate_data.summary.resting_hr_bpm'))
      m.hrv =
        num(getPath(rec, 'heart_rate_data.summary.avg_hrv_rmssd')) ??
        num(getPath(rec, 'heart_rate_data.summary.avg_hrv_sdnn'))
      const steps =
        num(getPath(rec, 'distance_data.steps')) ??
        num(getPath(rec, 'distance_data.summary.steps'))
      if (steps != null && steps > 0) m.steps = Math.round(steps)
      const activitySec =
        num(getPath(rec, 'active_durations_data.activity_seconds')) ??
        num(getPath(rec, 'active_durations_data.moderate_intensity_seconds')) ??
        num(getPath(rec, 'active_durations_data.vigorous_intensity_seconds'))
      if (activitySec != null && activitySec > 0) {
        m.activeMinutes = Math.round(activitySec / 60)
      }
      m.recovery =
        num(getPath(rec, 'scores.recovery')) ?? num(getPath(rec, 'scores.readiness'))
      const avgStress =
        num(getPath(rec, 'stress_data.avg_stress_level'))
      if (avgStress != null && avgStress <= 100) m.stress = avgStress
      mergeDay(days, date, m)
    }
  }

  // Sleep is attributed to the wake date (end_time) so "last night" lands on today.
  const sleepArr = getPath(data, 'payloads.sleep.data')
  if (Array.isArray(sleepArr)) {
    for (const rec of sleepArr) {
      const date = recordDate(rec, true)
      if (!date) continue
      const m: WearableMetrics = {}
      const eff = num(getPath(rec, 'sleep_durations_data.sleep_efficiency'))
      m.sleepScore =
        num(getPath(rec, 'scores.sleep')) ??
        (eff != null ? (eff <= 1 ? Math.round(eff * 100) : Math.round(eff)) : undefined)
      const asleepSec =
        num(getPath(rec, 'sleep_durations_data.asleep.duration_asleep_state_seconds')) ??
        num(getPath(rec, 'sleep_durations_data.asleep_duration_seconds'))
      if (asleepSec != null && asleepSec > 0) {
        m.sleepHours = Math.round((asleepSec / 3600) * 10) / 10
      }
      m.hrv =
        num(getPath(rec, 'heart_rate_data.summary.avg_hrv_rmssd')) ??
        num(getPath(rec, 'heart_rate_data.summary.avg_hrv_sdnn'))
      m.rhr = num(getPath(rec, 'heart_rate_data.summary.resting_hr_bpm'))
      m.recovery =
        num(getPath(rec, 'scores.recovery')) ?? num(getPath(rec, 'scores.readiness'))
      mergeDay(days, date, m)
    }
  }

  const activityArr = getPath(data, 'payloads.activity.data')
  if (Array.isArray(activityArr)) {
    for (const rec of activityArr) {
      const date = recordDate(rec)
      if (!date) continue
      const existing = days.get(date)
      const m: WearableMetrics = {}
      const steps =
        num(getPath(rec, 'distance_data.summary.steps')) ??
        num(getPath(rec, 'distance_data.steps'))
      if ((existing?.steps == null || existing.steps === 0) && steps != null && steps > 0) {
        m.steps = Math.round(steps)
      }
      const aSec = num(getPath(rec, 'active_durations_data.activity_seconds'))
      if (existing?.activeMinutes == null && aSec != null && aSec > 0) {
        m.activeMinutes = Math.round(aSec / 60)
      }
      mergeDay(days, date, m)
    }
  }

  // Drop days that carry nothing.
  for (const [date, m] of days) {
    if (Object.values(m).every((v) => v == null)) days.delete(date)
  }
  return days
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
