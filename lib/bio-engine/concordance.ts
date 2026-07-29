/**
 * BIO-001 — Gate 4d: concordance / discordance (Ch.4, Appendix C-2).
 *
 * Method is THRESHOLD_BASED only. Fixed. Not configurable.
 * Percentile-based discordance: NEVER implement (DR-4.2-A).
 *
 * Requires BOTH bands. If either is NOT_ASSIGNED → INDETERMINATE and the engine
 * abstains from any discordance narrative. Discordance inherits every abstention
 * condition of both parent analytes.
 *
 * The state labels are the ApoB/LDL-C pair's frozen names from Ch.4; the
 * mechanism below is generic and reads both bands as primary/companion.
 */

import type { ConcordanceResult } from './types'
import type { Band } from './interpretation'

export type ConcordanceState =
  | 'CONCORDANT_FAVOURABLE'
  | 'CONCORDANT_UNFAVOURABLE'
  | 'DISCORDANT_APOB_HIGHER'
  | 'DISCORDANT_LDLC_HIGHER'
  | 'INDETERMINATE'

export interface ConcordanceOutcome extends ConcordanceResult {
  state: ConcordanceState
  flags: string[]
  /**
   * Which analyte drives the atherogenic-lipid domain. MAX-priority select, not
   * SUM — the companion contributes ZERO to the domain when the primary is
   * present (DR-4.1-B, no double-count).
   */
  domain_driver: 'PRIMARY' | 'COMPANION' | 'NONE'
  /** True when the primary must be surfaced prominently, not in a side panel. */
  surface_prominently: boolean
}

function atOrBelowTarget(band: Band): boolean {
  return band === 'AT_TARGET'
}

function aboveTarget(band: Band): boolean {
  return band === 'ABOVE_TARGET' || band === 'NEAR_TARGET'
}

/**
 * Evaluate concordance between the primary analyte (ApoB) and its companion
 * (LDL-C). `companionBand` is NOT_ASSIGNED whenever the companion is missing or
 * its thresholds are unanchored — which correctly yields INDETERMINATE rather
 * than a guess.
 *
 * No imputation ever occurs: a missing companion is missing, never derived from
 * the primary or a conversion factor (DR-4.1-C).
 */
export function evaluateConcordance(
  primaryBand: Band,
  companionBand: Band,
): ConcordanceOutcome {
  // INDETERMINATE — abstain from the discordance narrative entirely.
  if (primaryBand === 'NOT_ASSIGNED' || companionBand === 'NOT_ASSIGNED') {
    const primaryPresent = primaryBand !== 'NOT_ASSIGNED'
    return {
      state: 'INDETERMINATE',
      flags: [],
      domain_driver: primaryPresent ? 'PRIMARY' : 'NONE',
      surface_prominently: false,
      narrative_required: [],
      narrative_forbidden: [
        // Even indeterminate, we must never resolve a pair into reassurance.
        'NET_NEUTRAL_ASSESSMENT',
        'LDLC_REASSURANCE',
        'NO_ACTION_REQUIRED',
      ],
    }
  }

  const primaryOk = atOrBelowTarget(primaryBand)
  const companionOk = atOrBelowTarget(companionBand)

  // Both at/below target.
  if (primaryOk && companionOk) {
    return {
      state: 'CONCORDANT_FAVOURABLE',
      flags: [],
      domain_driver: 'PRIMARY',
      surface_prominently: false,
      // NEVER "normal" — DR-3.1-B binds here too.
      narrative_required: ['BOTH_MEASURES_AT_TARGET', 'MAINTENANCE'],
      narrative_forbidden: ['CLEAN_BILL_OF_HEALTH', 'NO_ACTION_NEEDED'],
    }
  }

  // Both above target.
  if (aboveTarget(primaryBand) && aboveTarget(companionBand)) {
    return {
      state: 'CONCORDANT_UNFAVOURABLE',
      flags: [],
      domain_driver: 'PRIMARY',
      surface_prominently: true,
      narrative_required: ['BOTH_MEASURES_ABOVE_TARGET', 'APOB_ABOVE_TARGET'],
      narrative_forbidden: ['NET_NEUTRAL_ASSESSMENT', 'NO_ACTION_REQUIRED'],
    }
  }

  // Primary above target, companion at target — THE reassurance-failure case and
  // the highest-value output of the engine. Must not lead with the reassuring
  // companion, and must not be attenuated by it.
  if (aboveTarget(primaryBand) && companionOk) {
    return {
      state: 'DISCORDANT_APOB_HIGHER',
      flags: ['reassurance_failure_case'],
      domain_driver: 'PRIMARY',
      surface_prominently: true,
      narrative_required: ['LDLC_UNDERSTATES_PARTICLE_BURDEN', 'APOB_ABOVE_TARGET'],
      narrative_forbidden: [
        'NET_NEUTRAL_ASSESSMENT',
        'LDLC_REASSURANCE',
        'NO_ACTION_REQUIRED',
        'TARGET_ACHIEVED',
        'LIPIDS_WELL_CONTROLLED',
      ],
    }
  }

  // Companion above target, primary at target — where the engine must not
  // overreach. De-escalation of alarm, but explicitly NOT "you're fine".
  return {
    state: 'DISCORDANT_LDLC_HIGHER',
    flags: [],
    domain_driver: 'PRIMARY',
    surface_prominently: false,
    narrative_required: [
      'PARTICLE_COUNT_AT_TARGET',
      'LDLC_ABOVE_TARGET',
      'CLINICIAN_DISCUSSION',
    ],
    narrative_forbidden: [
      'LDLC_IRRELEVANT',
      'ONLY_APOB_MATTERS',
      'NO_ACTION_REQUIRED',
      'NET_NEUTRAL_ASSESSMENT',
    ],
  }
}
