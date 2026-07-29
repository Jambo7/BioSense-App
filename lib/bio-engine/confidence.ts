/**
 * BIO-001 — Gate 3 confidence composition (Appendix C-4).
 *
 * Start HIGH; downgrade to REDUCED if ANY reducer is present. Confidence is
 * calculated, never guessed. NOT_ASSESSABLE is NOT produced here — it is
 * reserved for states that never reach Gate 3 (validity/eligibility failure)
 * and is assigned by the state machine.
 */

import type { CanonicalObservation, Confidence, SourcedValue } from './types'

export interface ConfidenceReducerContext {
  fasting_status: 'FASTED' | 'NON_FASTED' | 'UNKNOWN'
  stratum_assumed: boolean
  acute_state_active: boolean
  cardiovascular_risk_context: 'KNOWN' | 'UNKNOWN_OR_STALE'
}

export interface ConfidenceResult {
  confidence: Extract<Confidence, 'HIGH' | 'REDUCED'>
  reducers: string[]
}

/** Read a boolean/string context field defensively from the observation bundle. */
function ctxString(obs: CanonicalObservation, key: string): string | null {
  const sv = obs.context[key] as SourcedValue<unknown> | undefined
  if (!sv || sv.missingness !== 'PRESENT') return null
  return typeof sv.value === 'string' ? sv.value : null
}

/**
 * Compose Gate-3 confidence. Presupposes the observation reached Gate 3
 * (validity PRESUMED_VALID and interpretability INTERPRETABLE).
 */
export function composeConfidence(
  obs: CanonicalObservation,
  ctx: ConfidenceReducerContext,
): ConfidenceResult {
  const reducers: string[] = []

  if (ctx.fasting_status === 'NON_FASTED' || ctx.fasting_status === 'UNKNOWN') {
    reducers.push('fasting_status') // DR-2.3-A
  }
  if (ctx.stratum_assumed) {
    reducers.push('stratum_assumed') // DR-3.2-B
  }
  if (ctx.acute_state_active) {
    reducers.push('acute_state') // DR-7.3-A
  }
  if (ctx.cardiovascular_risk_context === 'UNKNOWN_OR_STALE') {
    reducers.push('risk_context_unknown_or_stale') // DR-5.3-B
  }
  // Trust: DECLARED tier or low extraction confidence reduces (Ch.9.1).
  if (obs.trust_tier === 'DECLARED') {
    reducers.push('trust_declared')
  }
  if (obs.extraction_confidence != null && obs.extraction_confidence < 0.7) {
    reducers.push('low_extraction_confidence')
  }

  return {
    confidence: reducers.length > 0 ? 'REDUCED' : 'HIGH',
    reducers,
  }
}

/**
 * Derive the confidence reducer context from the observation's context bundle.
 * Fields absent/unknown resolve to the confidence-reducing branch — absence of
 * information is never treated as good news.
 */
export function deriveReducerContext(obs: CanonicalObservation): ConfidenceReducerContext {
  const fasting = ctxString(obs, 'fasting_status')
  const stratum = ctxString(obs, 'apob_risk_stratum')
  const risk = ctxString(obs, 'cardiovascular_risk_context')

  return {
    fasting_status:
      fasting === 'FASTED' ? 'FASTED' : fasting === 'NON_FASTED' ? 'NON_FASTED' : 'UNKNOWN',
    // Stratum UNKNOWN → interpretation permitted but stratum_assumed (DR-3.2-B).
    stratum_assumed: stratum == null || stratum === 'UNKNOWN',
    acute_state_active: ctxString(obs, 'acute_state') === 'ACTIVE',
    cardiovascular_risk_context: risk === 'KNOWN' ? 'KNOWN' : 'UNKNOWN_OR_STALE',
  }
}
