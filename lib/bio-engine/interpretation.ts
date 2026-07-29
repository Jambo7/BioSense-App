/**
 * BIO-001 — Gate 4a–4c: stratum/therapy resolution, banding, gap-to-target and
 * the continuous score contribution.
 *
 * [GENERIC] All logic here is biomarker-agnostic. It reads the anchored
 * threshold set and the direction semantics from config.
 *
 * Key frozen rules honoured here:
 *  - Bands are assigned against BIOSENSE thresholds, NEVER lab reference
 *    intervals (HANDOVER §D).
 *  - The band vocabulary never includes "normal" (DR-3.1-B).
 *  - Score is continuous and monotonic on gap-to-target (A-001), has NO low-end
 *    penalty, and a null gap yields EXCLUDED — never 0 (a zero would read as
 *    "worst possible", which is the opposite of "unknown").
 *  - Stratum is never inferred from the biomarker value or from age alone
 *    (DR-3.2-B); UNKNOWN defaults to the unselected primary-prevention stratum,
 *    reduces confidence, and is tagged.
 *  - Therapy UNKNOWN is interpreted as UNTREATED and tagged (DR-3.4-B).
 */

import type { CanonicalObservation, SourcedValue } from './types'
import type { BiomarkerConfig } from './config'
import { resolveConstant } from './csl'

/** Band vocabulary. Deliberately excludes "NORMAL" (DR-3.1-B). */
export type Band = 'AT_TARGET' | 'NEAR_TARGET' | 'ABOVE_TARGET' | 'NOT_ASSIGNED'

/** One stratum's thresholds, in the canonical unit. */
export interface StratumThresholds {
  optimal_max: number
  above_target_min: number
}

export type ThresholdSet = Record<string, StratumThresholds>

/** The default stratum when risk stratum is UNKNOWN (DR-3.2-B). */
export const DEFAULT_STRATUM = 'PRIMARY_PREVENTION_UNSELECTED'

function ctx<T>(obs: CanonicalObservation, key: string): SourcedValue<T> | undefined {
  return obs.context[key] as SourcedValue<T> | undefined
}

function ctxString(obs: CanonicalObservation, key: string): string | null {
  const sv = ctx<string>(obs, key)
  if (!sv || sv.missingness !== 'PRESENT') return null
  return typeof sv.value === 'string' ? sv.value : null
}

// ── 4a — stratum & therapy resolution ───────────────────────────────────────

export interface StratumResolution {
  stratum: string
  stratum_assumed: boolean
  therapy: 'TREATED' | 'UNTREATED'
  therapy_status_assumed: boolean
  flags: string[]
  narrative_required: string[]
}

/**
 * Resolve risk stratum and therapy status. Never infers stratum from the value
 * or from age; an unknown stratum is *assumed*, flagged and narrated, not
 * guessed silently.
 */
export function resolveStratum(obs: CanonicalObservation): StratumResolution {
  const declared = ctxString(obs, 'apob_risk_stratum')
  const stratum_assumed = declared == null || declared === 'UNKNOWN'
  const stratum = stratum_assumed ? DEFAULT_STRATUM : declared

  const therapyRaw = ctxString(obs, 'lipid_therapy_status')
  const therapy_status_assumed = therapyRaw == null || therapyRaw === 'UNKNOWN'
  const therapy: 'TREATED' | 'UNTREATED' =
    therapyRaw === 'TREATED' ? 'TREATED' : 'UNTREATED'

  const flags: string[] = []
  const narrative_required: string[] = []
  if (stratum_assumed) {
    flags.push('stratum_assumed')
    // The narrative must state the threshold assumes no known cardiovascular
    // disease (DR-3.2-B).
    narrative_required.push('THRESHOLD_ASSUMES_NO_KNOWN_CVD')
  }
  if (therapy_status_assumed) {
    flags.push('therapy_status_assumed')
  }
  if (therapy === 'TREATED') {
    // A low TREATED value must never imply low untreated risk, and the narrative
    // must not imply therapy can stop (DR-3.4-B).
    narrative_required.push('VALUE_REFLECTS_CURRENT_THERAPY')
  }

  return {
    stratum,
    stratum_assumed,
    therapy,
    therapy_status_assumed,
    flags,
    narrative_required,
  }
}

// ── Threshold access ────────────────────────────────────────────────────────

/** Narrow an unknown CSL value to a ThresholdSet. Returns null if malformed. */
export function parseThresholdSet(value: unknown): ThresholdSet | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const out: ThresholdSet = {}
  for (const [stratum, raw] of Object.entries(value as Record<string, unknown>)) {
    if (!raw || typeof raw !== 'object') continue
    const r = raw as Record<string, unknown>
    const optimal_max = typeof r.optimal_max === 'number' ? r.optimal_max : null
    const above_target_min =
      typeof r.above_target_min === 'number' ? r.above_target_min : null
    if (optimal_max == null || above_target_min == null) continue
    out[stratum] = { optimal_max, above_target_min }
  }
  return Object.keys(out).length > 0 ? out : null
}

/** Resolve the thresholds for a stratum, or null when unavailable. */
export function thresholdsFor(
  config: BiomarkerConfig,
  stratum: string,
  claimId: string = config.constants.threshold_set,
): StratumThresholds | null {
  const resolved = resolveConstant(claimId)
  if (resolved.status !== 'ANCHORED') return null
  const set = parseThresholdSet(resolved.value)
  if (!set) return null
  return set[stratum] ?? set[DEFAULT_STRATUM] ?? null
}

// ── 4b — band & gap-to-target ───────────────────────────────────────────────

export interface BandResult {
  band: Band
  gap_to_target: number | null
}

/**
 * Assign a band and gap-to-target. `gap` is the signed distance past target in
 * the unfavourable direction, floored at 0 — a value better than target has a
 * gap of 0, never a negative "credit".
 */
export function assignBand(
  value: number | null,
  thresholds: StratumThresholds | null,
  direction: BiomarkerConfig['direction'],
): BandResult {
  if (value == null || thresholds == null) {
    return { band: 'NOT_ASSIGNED', gap_to_target: null }
  }

  const { optimal_max, above_target_min } = thresholds

  if (direction === 'LOWER_BETTER') {
    const gap = Math.max(0, value - optimal_max)
    if (value >= above_target_min) return { band: 'ABOVE_TARGET', gap_to_target: gap }
    if (value > optimal_max) return { band: 'NEAR_TARGET', gap_to_target: gap }
    return { band: 'AT_TARGET', gap_to_target: 0 }
  }

  if (direction === 'HIGHER_BETTER') {
    // For higher-better markers `optimal_max` is read as the optimal *floor*.
    const gap = Math.max(0, optimal_max - value)
    if (value <= above_target_min) return { band: 'ABOVE_TARGET', gap_to_target: gap }
    if (value < optimal_max) return { band: 'NEAR_TARGET', gap_to_target: gap }
    return { band: 'AT_TARGET', gap_to_target: 0 }
  }

  // TARGET_BAND / NEUTRAL semantics need their own configured shape; until a
  // biomarker supplies one we do not guess.
  return { band: 'NOT_ASSIGNED', gap_to_target: null }
}

// ── 4c — continuous monotonic score contribution ────────────────────────────

export type ScoreContribution =
  | { status: 'COMPUTED'; value: number }
  | { status: 'EXCLUDED'; reason: string }

/**
 * Continuous, monotonic score on gap-to-target (A-001).
 *
 *   gap 0            → 100
 *   gap >= scale     → 0
 *   in between       → linear, strictly decreasing
 *
 * A null gap is EXCLUDED, never 0 (a 0 would read as the worst possible result
 * when the truth is "we don't know"). There is no low-end penalty: a value
 * better than target scores 100 and `low_value_penalty` stays structurally 0.
 */
export function scoreContribution(
  gap: number | null,
  config: BiomarkerConfig,
): ScoreContribution {
  if (gap == null) {
    return { status: 'EXCLUDED', reason: 'gap-to-target unavailable (band not assigned)' }
  }

  const scaleClaim = resolveConstant(config.constants.score_gap_scale)
  if (scaleClaim.status !== 'ANCHORED' || typeof scaleClaim.value !== 'number') {
    return {
      status: 'EXCLUDED',
      reason: 'score gap scale not anchored (feature disabled per PI-5)',
    }
  }

  const scale = scaleClaim.value
  if (!(scale > 0)) {
    return { status: 'EXCLUDED', reason: 'score gap scale must be greater than zero' }
  }

  const ratio = Math.min(1, gap / scale)
  return { status: 'COMPUTED', value: Math.round((1 - ratio) * 100) }
}
