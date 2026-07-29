/**
 * BIO-001 — Gate 4g: longitudinal trend engine (Ch.8).
 *
 * Trend reporting is TERMINAL: it runs only on interpreted, validity-passed,
 * state-tagged observations.
 *
 * The suppression gauntlet is ORDERED and TOTAL. A change is reported only if it
 * survives all five, in this order:
 *   1. VALIDITY_EXCLUSION  — a suspect value is never compared.
 *   2. METHOD_CHANGE       — a different assay is not a change in the person.
 *   3. ACUTE_STATE         — an acute value is not a new baseline.
 *   4. SUB_NOISE_FLOOR     — a delta below biological+analytical variation.
 *   5. SCOPE_EXCLUSION     — undated or out-of-scope points.
 *
 * Suppressions are AUDITED, never silently dropped. The cumulative-exposure
 * proxy covers the observed window only — never a lifetime figure, never a risk
 * figure.
 */

import type {
  CanonicalObservation,
  TrendEventType,
  TrendPoint,
  TrendResult,
  TrendSuppressionClass,
  Trajectory,
} from './types'
import type { BiomarkerConfig } from './config'
import { resolveConstant } from './csl'
import type { Band } from './interpretation'

interface Suppression {
  class: TrendSuppressionClass
  detail: string
}

/** Run the ordered gauntlet for one comparison. Returns the first suppression. */
function gauntlet(
  current: TrendPoint,
  previous: TrendPoint,
  significantChange: number | null,
): Suppression | null {
  // 1 — VALIDITY_EXCLUSION
  if (current.validity === 'VALIDITY_SUSPECT' || previous.validity === 'VALIDITY_SUSPECT') {
    return { class: 'VALIDITY_EXCLUSION', detail: 'a compared value is validity-suspect' }
  }

  // 2 — METHOD_CHANGE
  if (current.method != null && previous.method != null && current.method !== previous.method) {
    return {
      class: 'METHOD_CHANGE',
      detail: `assay changed (${previous.method} → ${current.method})`,
    }
  }

  // 3 — ACUTE_STATE
  if (current.acute || previous.acute) {
    return { class: 'ACUTE_STATE', detail: 'a compared value carries acute_context' }
  }

  // 4 — SUB_NOISE_FLOOR
  if (current.value_canonical == null || previous.value_canonical == null) {
    return { class: 'SCOPE_EXCLUSION', detail: 'a compared value has no canonical value' }
  }
  if (significantChange == null) {
    // The significance floor is unanchored, so we cannot claim a change is real.
    return {
      class: 'SUB_NOISE_FLOOR',
      detail: 'significance threshold not anchored (trend significance disabled per PI-5)',
    }
  }
  const delta = Math.abs(current.value_canonical - previous.value_canonical)
  if (delta < significantChange) {
    return {
      class: 'SUB_NOISE_FLOOR',
      detail: `delta ${delta.toFixed(1)} below significance floor ${significantChange}`,
    }
  }

  // 5 — SCOPE_EXCLUSION (undated → trend-excluded; out-of-scope → excluded)
  if (current.collection_datetime == null || previous.collection_datetime == null) {
    return { class: 'SCOPE_EXCLUSION', detail: 'undated observation is trend-excluded' }
  }
  if (!current.in_scope || !previous.in_scope) {
    return { class: 'SCOPE_EXCLUSION', detail: 'a compared value is out of scope' }
  }

  return null
}

/** Direction-aware improvement test. */
function isImprovement(
  deltaSigned: number,
  direction: BiomarkerConfig['direction'],
): boolean {
  if (direction === 'LOWER_BETTER') return deltaSigned < 0
  if (direction === 'HIGHER_BETTER') return deltaSigned > 0
  return false
}

/**
 * Cumulative-exposure proxy: trapezoidal area of value over the observed window,
 * in value·days. A magnitude-over-time proxy ONLY. It is not a risk figure and
 * not a lifetime exposure — callers must never present it as either.
 */
function cumulativeExposureProxy(points: TrendPoint[]): number | null {
  const usable = points
    .filter(
      (p): p is TrendPoint & { value_canonical: number; collection_datetime: string } =>
        p.value_canonical != null && p.collection_datetime != null,
    )
    .sort(
      (a, b) =>
        new Date(a.collection_datetime).getTime() - new Date(b.collection_datetime).getTime(),
    )

  if (usable.length < 2) return null

  let area = 0
  for (let i = 1; i < usable.length; i++) {
    const t0 = new Date(usable[i - 1].collection_datetime).getTime()
    const t1 = new Date(usable[i].collection_datetime).getTime()
    const days = (t1 - t0) / 86_400_000
    if (!(days > 0)) continue
    area += ((usable[i - 1].value_canonical + usable[i].value_canonical) / 2) * days
  }

  return area > 0 ? Math.round(area) : null
}

/**
 * Evaluate the trend for the current observation against its prior series.
 *
 * `series` must be the prior points only (oldest → newest order is not required;
 * the function sorts by collection date where dates exist).
 */
export function evaluateTrend(
  obs: CanonicalObservation,
  currentBand: Band,
  series: TrendPoint[],
  config: BiomarkerConfig,
): TrendResult {
  const events: { type: TrendEventType; detail: string }[] = []
  const suppressions: Suppression[] = []

  const sigClaim = resolveConstant(config.constants.significant_change_threshold)
  const significantChange =
    sigClaim.status === 'ANCHORED' && typeof sigClaim.value === 'number'
      ? sigClaim.value
      : null

  const acuteRaw = obs.context['acute_state']
  const currentPoint: TrendPoint = {
    observation_id: obs.observation_id,
    value_canonical: obs.value_canonical,
    collection_datetime: obs.collection_datetime,
    validity: 'PRESUMED_VALID',
    band: currentBand === 'NOT_ASSIGNED' ? null : currentBand,
    method: obs.context['assay_method']?.value as string | null ?? null,
    acute: acuteRaw?.missingness === 'PRESENT' && acuteRaw.value === 'ACTIVE',
    in_scope: true,
  }

  const dated = [...series, currentPoint].filter((p) => p.collection_datetime != null)
  const sorted = dated.sort(
    (a, b) =>
      new Date(a.collection_datetime as string).getTime() -
      new Date(b.collection_datetime as string).getTime(),
  )

  if (series.length === 0) {
    return {
      trajectory: 'INSUFFICIENT_DATA',
      events,
      suppressions,
      cumulative_exposure_proxy: null,
      window: { from: null, to: obs.collection_datetime },
    }
  }

  // Most recent prior point that carries a date, else the last supplied point.
  const previous =
    sorted.length >= 2 ? sorted[sorted.length - 2] : series[series.length - 1]

  const suppression = gauntlet(currentPoint, previous, significantChange)

  let trajectory: Trajectory = 'INSUFFICIENT_DATA'

  if (suppression) {
    suppressions.push(suppression)
    // A suppressed comparison yields no event and no trajectory claim. The value
    // is still recorded; we simply do not assert a change.
    trajectory = 'STABLE'
  } else {
    const deltaSigned =
      (currentPoint.value_canonical as number) - (previous.value_canonical as number)

    events.push({
      type: 'VALUE_DELTA',
      detail: `${deltaSigned > 0 ? '+' : ''}${deltaSigned.toFixed(1)} ${
        obs.unit_canonical ?? ''
      }`.trim(),
    })

    if (previous.band != null && currentPoint.band != null && previous.band !== currentPoint.band) {
      events.push({
        type: 'BAND_TRANSITION',
        detail: `${previous.band} → ${currentPoint.band}`,
      })
    }

    trajectory = isImprovement(deltaSigned, config.direction) ? 'IMPROVING' : 'WORSENING'
  }

  return {
    trajectory,
    events,
    suppressions,
    cumulative_exposure_proxy: config.cumulative_exposure_relevant
      ? cumulativeExposureProxy(sorted)
      : null,
    window: {
      from: sorted[0]?.collection_datetime ?? null,
      to: obs.collection_datetime,
    },
  }
}
