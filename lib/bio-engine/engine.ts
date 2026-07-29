/**
 * BIO-001 — Four-state interpretation machine (Ch.10, PI-3).
 *
 * Fixed, generic, acyclic order:
 *   Gate 1 VALIDITY        → suspect? abstain; confidence never evaluated.
 *   Gate 2 INTERPRETABILITY→ eligible? else abstain (safety pathways still run).
 *   Gate 3 CONFIDENCE      → HIGH | REDUCED.
 *   Gate 4 ASSEMBLY 4a–4h  → stratum, band, gap, score, discordance, flags,
 *                            recommendations, trend, narrative gates.
 *
 * Every scientific decision is gated on an anchored CSL constant (PI-5). While
 * a constant is unanchored, its feature is DISABLED — the engine records the
 * value and abstains from that interpretation. This is the specified,
 * correct-by-design "current ship state", not an incomplete build.
 */

import type {
  CanonicalObservation,
  Confidence,
  Interpretability,
  ObservationValidity,
  OutputPayload,
  Recommendation,
  SourcedValue,
  TrendPoint,
} from './types'
import type { BiomarkerConfig } from './config'
import { getBiomarkerConfig } from './config'
import { resolveConstant, evidenceVersions } from './csl'
import { composeConfidence, deriveReducerContext } from './confidence'
import {
  assignBand,
  resolveStratum,
  scoreContribution,
  thresholdsFor,
  type Band,
} from './interpretation'
import { evaluateConcordance } from './concordance'
import { buildRecommendations, type RecommendationTrigger } from './recommendations'
import { evaluateTrend } from './trend'

/**
 * Standing prohibitions (Ch.5 §5.10). These apply to EVERY payload, in every
 * state, and are appended to whatever the state-specific contract adds. A
 * prohibition enforced only by prompt is unenforced — these ride on the payload
 * so the validator can check them independently.
 */
const STANDING_FORBIDDEN = [
  'NUMERIC_RISK_ESTIMATE',
  'DETERMINISTIC_PREDICTION',
  'EFFECT_SIZE_CLAIM',
  'DRUG_RECOMMENDATION',
  'CLEAN_BILL_OF_HEALTH',
  'THERAPY_UNNECESSARY_IMPLICATION',
  'GOOD_ENOUGH_TO_STOP_IMPLICATION',
]

export interface InterpretOptions {
  /** Prior observations for trend evaluation (Ch.8). */
  series?: TrendPoint[]
  /** A clinician has acknowledged: downgrades one tier, never suppresses. */
  clinician_acknowledged?: boolean
}

/** Build the base payload with four-state fields, structural nulls, versions. */
function basePayload(
  obs: CanonicalObservation,
  config: BiomarkerConfig,
  validity: ObservationValidity,
  interpretability: Interpretability,
  confidence: Confidence,
): OutputPayload {
  const constantIds = Object.values(config.constants).filter(
    (v): v is string => typeof v === 'string',
  )
  return {
    observation_id: obs.observation_id,
    analyte: config.display_name,
    validity,
    interpretability,
    confidence,
    abstained: false,
    abstention_reason: null,
    is_error: false,
    band: null,
    gap_to_target: null,
    score_contribution: null,
    concordance: null,
    flags: [],
    trend: null,
    recommendations: [],
    narrative_required: [],
    narrative_forbidden: [],
    mandatory_caveats: [],
    disabled_features: [],
    config_version: config.config_version,
    evidence_versions: evidenceVersions(constantIds),
    structural_nulls: { ...config.structural_nulls },
  }
}

/**
 * A first-class abstention (Ch.10). NOT an error. Interpretive fields stay null,
 * but any safety escalation the caller already established is carried through —
 * abstention from interpretation is never abstention from protection
 * (DR-10.2-B).
 */
export function abstain(
  obs: CanonicalObservation,
  config: BiomarkerConfig,
  reason: string,
  opts: {
    validity?: ObservationValidity
    interpretability?: Interpretability
    confidence?: Confidence
    disabled_features?: string[]
    flags?: string[]
    recommendations?: Recommendation[]
    narrative_required?: string[]
    narrative_forbidden?: string[]
    mandatory_caveats?: string[]
  } = {},
): OutputPayload {
  const payload = basePayload(
    obs,
    config,
    opts.validity ?? 'PRESUMED_VALID',
    opts.interpretability ?? 'NOT_INTERPRETABLE',
    opts.confidence ?? 'NOT_ASSESSABLE',
  )
  payload.abstained = true
  payload.abstention_reason = reason
  payload.disabled_features = opts.disabled_features ?? []
  payload.flags = opts.flags ?? []
  payload.recommendations = opts.recommendations ?? []
  payload.narrative_required = opts.narrative_required ?? []
  payload.narrative_forbidden = dedupe([
    ...(opts.narrative_forbidden ?? []),
    ...STANDING_FORBIDDEN,
  ])
  payload.mandatory_caveats = opts.mandatory_caveats ?? []
  return payload
}

function dedupe(items: string[]): string[] {
  return Array.from(new Set(items))
}

/** Which Gate-4 features depend on which constants (for disabled_features). */
function featureDependencies(config: BiomarkerConfig): { feature: string; claim: string }[] {
  const deps = [
    { feature: 'banding', claim: config.constants.threshold_set },
    { feature: 'gap_to_target', claim: config.constants.threshold_set },
    { feature: 'score_contribution', claim: config.constants.score_gap_scale },
    { feature: 'trend_significance', claim: config.constants.significant_change_threshold },
    { feature: 'low_investigation_routing', claim: config.constants.low_investigation_threshold },
    { feature: 'lifestyle_escalation', claim: config.constants.lifestyle_gap_ceiling },
    { feature: 'acute_tagging', claim: config.constants.acute_recovery_window },
    { feature: 'fh_pattern_pathway', claim: config.constants.fh_pattern_threshold },
  ]
  if (config.constants.companion_threshold_set) {
    deps.push({ feature: 'discordance', claim: config.constants.companion_threshold_set })
  }
  return deps
}

function disabledFeatures(config: BiomarkerConfig): string[] {
  return dedupe(
    featureDependencies(config)
      .filter((d) => resolveConstant(d.claim).status !== 'ANCHORED')
      .map((d) => d.feature),
  )
}

function ctxNumber(obs: CanonicalObservation, key: string): number | null {
  const sv = obs.context[key] as SourcedValue<number> | undefined
  if (!sv || sv.missingness !== 'PRESENT') return null
  return typeof sv.value === 'number' ? sv.value : null
}

function ctxString(obs: CanonicalObservation, key: string): string | null {
  const sv = obs.context[key] as SourcedValue<string> | undefined
  if (!sv || sv.missingness !== 'PRESENT') return null
  return typeof sv.value === 'string' ? sv.value : null
}

/**
 * The executable pipeline. `interpret(obs, config) → OutputPayload`.
 *
 * `config` is optional; when omitted it resolves from the observation's analyte.
 */
export function interpret(
  obs: CanonicalObservation,
  configArg?: BiomarkerConfig,
  options: InterpretOptions = {},
): OutputPayload {
  const config = configArg ?? getBiomarkerConfig(obs.analyte)
  if (!config) {
    return noConfigPayload(obs)
  }

  const disabled = disabledFeatures(config)

  // ── GATE 1 — VALIDITY ─────────────────────────────────────────────────────
  // Interference / sample-quality suspicion. When suspect: not interpreted at
  // any confidence, never corrected, never direction-guessed (Ch.7).
  const interference = obs.context['interference']
  const suspect = interference?.missingness === 'PRESENT' && interference.value === 'ACTIVE'
  if (suspect) {
    return abstain(obs, config, 'value flagged validity-suspect; not interpreted', {
      validity: 'VALIDITY_SUSPECT',
      interpretability: 'NOT_INTERPRETABLE',
      confidence: 'NOT_ASSESSABLE',
      disabled_features: disabled,
      narrative_required: [
        'MEASUREMENT_MAY_BE_AFFECTED',
        'VALUE_NOT_INTERPRETED',
        'RETEST_RECOMMENDED',
      ],
      narrative_forbidden: [
        'INTERPRET_SUSPECT_VALUE',
        'REPORT_CORRECTED_VALUE',
        'REPORT_INTERFERENCE_DIRECTION',
        'ASSIGN_BAND',
      ],
    })
  }

  // ── GATE 2 — INTERPRETABILITY (eligibility, Appendix C-4) ─────────────────
  const age = ctxNumber(obs, 'age')
  const paediatric = age != null && age < 18
  const scopeOk = isInScope(obs, config)
  const thresholdsAnchored =
    resolveConstant(config.constants.threshold_set).status === 'ANCHORED'
  const unitOk = obs.value_canonical != null
  const statusOk = obs.result_status !== 'CANCELLED'

  // Non-interpretive safety pathways run regardless of interpretability
  // (DR-10.2-B). The paediatric FH referral (A-003) is the canonical case: full
  // interpretive abstention, but the referral still fires.
  const safety = runSafetyPathways(obs, config, { paediatric })

  if (!scopeOk || !thresholdsAnchored || !unitOk || !statusOk) {
    const reason = !unitOk
      ? 'unit unresolved — value displayed, not interpreted'
      : !statusOk
        ? 'result cancelled'
        : !scopeOk
          ? `out of scope population (requires ${config.ingestion.scope_population})`
          : 'interpretation thresholds not yet anchored (feature disabled per PI-5)'

    return abstain(obs, config, reason, {
      validity: 'PRESUMED_VALID',
      interpretability: 'NOT_INTERPRETABLE',
      confidence: 'NOT_ASSESSABLE',
      disabled_features: disabled,
      flags: safety.flags,
      // Safety escalations survive abstention.
      recommendations: buildRecommendations(safety.triggers, config, {
        provisional: obs.result_status === 'PRELIMINARY',
        clinician_acknowledged: options.clinician_acknowledged,
      }),
      narrative_required: safety.narrative_required,
      narrative_forbidden: safety.narrative_forbidden,
      mandatory_caveats: safety.mandatory_caveats,
    })
  }

  // ── GATE 3 — CONFIDENCE ───────────────────────────────────────────────────
  const { confidence, reducers } = composeConfidence(obs, deriveReducerContext(obs))

  // ── GATE 4 — ASSEMBLY (fixed, acyclic) ────────────────────────────────────
  const payload = basePayload(obs, config, 'PRESUMED_VALID', 'INTERPRETABLE', confidence)
  payload.disabled_features = disabled

  // 4a — stratum & therapy resolution.
  const stratum = resolveStratum(obs)

  // 4b — band & gap-to-target.
  const thresholds = thresholdsFor(config, stratum.stratum)
  const { band, gap_to_target } = assignBand(
    obs.value_canonical,
    thresholds,
    config.direction,
  )
  payload.band = band === 'NOT_ASSIGNED' ? null : band
  payload.gap_to_target = gap_to_target

  // 4c — continuous monotonic score. A null gap is EXCLUDED, never 0.
  const score = scoreContribution(gap_to_target, config)
  payload.score_contribution = score.status === 'COMPUTED' ? score.value : null

  // 4d — discordance. Requires both bands; otherwise INDETERMINATE.
  const companionBand = companionBandFor(obs, config)
  const concordance = evaluateConcordance(band, companionBand)
  payload.concordance =
    concordance.state === 'INDETERMINATE'
      ? null
      : {
          state: concordance.state,
          narrative_required: concordance.narrative_required,
          narrative_forbidden: concordance.narrative_forbidden,
        }

  // 4e — flags.
  const flags = [...safety.flags, ...stratum.flags, ...concordance.flags]

  // 4f — recommendations (allowlist + ladder + consolidation).
  const triggers: RecommendationTrigger[] = [...safety.triggers]

  const gapCeiling = resolveConstant(config.constants.lifestyle_gap_ceiling)
  const ceiling =
    gapCeiling.status === 'ANCHORED' && typeof gapCeiling.value === 'number'
      ? gapCeiling.value
      : null

  if (gap_to_target != null && gap_to_target > 0) {
    if (ceiling != null && gap_to_target > ceiling) {
      triggers.push({ trigger: 'large_gap', class: 'CLINICIAN_DISCUSSION' })
    } else if (ceiling != null) {
      triggers.push({ trigger: 'lifestyle_addressable', class: 'LIFESTYLE_DIETARY' })
    }
    // With no anchored ceiling we cannot tell an addressable gap from one needing
    // escalation, so we emit neither rather than guess.
  }

  if (concordance.flags.includes('reassurance_failure_case')) {
    triggers.push({ trigger: 'reassurance_failure', class: 'CLINICIAN_DISCUSSION' })
  }
  if (concordance.state === 'DISCORDANT_LDLC_HIGHER') {
    triggers.push({ trigger: 'discordance_review', class: 'CLINICIAN_DISCUSSION' })
  }
  if (concordance.state === 'CONCORDANT_FAVOURABLE') {
    triggers.push({ trigger: 'maintenance', class: 'MONITOR' })
  }

  payload.recommendations = buildRecommendations(triggers, config, {
    provisional: obs.result_status === 'PRELIMINARY',
    clinician_acknowledged: options.clinician_acknowledged,
  })

  // 4g — trend (ordered suppression gauntlet).
  payload.trend = evaluateTrend(obs, band, options.series ?? [], config)

  // 4h — narrative gates.
  const required = [...safety.narrative_required, ...stratum.narrative_required]
  const forbidden = [...safety.narrative_forbidden]

  if (band === 'ABOVE_TARGET' || band === 'NEAR_TARGET') {
    required.push('APOB_ABOVE_TARGET', 'RAISES_RISK_PROBABILISTIC', 'APOB_IS_ONE_INPUT_TO_RISK')
    if (ceiling != null && gap_to_target != null && gap_to_target > ceiling) {
      required.push('GAP_LARGE_REFER')
    }
  } else if (band === 'AT_TARGET') {
    required.push('APOB_AT_TARGET')
    // At target WITH other named risk factors → mandatory caveat, and the
    // "your cardiovascular risk is low" claim becomes forbidden (Ch.5).
    if (ctxString(obs, 'cardiovascular_risk_context') === 'KNOWN') {
      required.push('NAMED_RISK_FACTORS_PRESENT')
      forbidden.push('CARDIOVASCULAR_RISK_IS_LOW')
    }
  }

  if (concordance.state !== 'INDETERMINATE') {
    required.push(...concordance.narrative_required)
    forbidden.push(...concordance.narrative_forbidden)
  }

  payload.flags = dedupe(flags)
  payload.narrative_required = dedupe(required)
  payload.narrative_forbidden = dedupe([...forbidden, ...STANDING_FORBIDDEN])
  payload.mandatory_caveats = dedupe([
    ...safety.mandatory_caveats,
    ...reducerCaveats(reducers),
  ])

  return payload
}

/** Payload for an analyte with no registered tenant config. */
function noConfigPayload(obs: CanonicalObservation): OutputPayload {
  return {
    observation_id: obs.observation_id,
    analyte: obs.analyte,
    validity: 'PRESUMED_VALID',
    interpretability: 'NOT_INTERPRETABLE',
    confidence: 'NOT_ASSESSABLE',
    abstained: true,
    abstention_reason: `no biomarker config registered for analyte "${obs.analyte}"`,
    is_error: false,
    band: null,
    gap_to_target: null,
    score_contribution: null,
    concordance: null,
    flags: [],
    trend: null,
    recommendations: [],
    narrative_required: [],
    narrative_forbidden: [...STANDING_FORBIDDEN],
    mandatory_caveats: [],
    disabled_features: [],
    config_version: 'none',
    evidence_versions: {},
    structural_nulls: {},
  }
}

/**
 * Band the companion analyte (LDL-C) for discordance. Returns NOT_ASSIGNED when
 * the companion value is absent or its thresholds are unanchored — which yields
 * INDETERMINATE upstream. The companion is NEVER imputed from the primary
 * (DR-4.1-C).
 */
function companionBandFor(obs: CanonicalObservation, config: BiomarkerConfig): Band {
  const claim = config.constants.companion_threshold_set
  if (!claim) return 'NOT_ASSIGNED'

  const value = ctxNumber(obs, 'ldlc_value')
  if (value == null) return 'NOT_ASSIGNED'

  const stratum = resolveStratum(obs)
  const thresholds = thresholdsFor(config, stratum.stratum, claim)
  // LDL-C shares ApoB's direction semantics; a companion with different
  // semantics would supply its own biomarker config.
  return assignBand(value, thresholds, 'LOWER_BETTER').band
}

/** Population scope check (DR-3.4-A). */
function isInScope(obs: CanonicalObservation, config: BiomarkerConfig): boolean {
  if (config.ingestion.scope_population !== 'ADULT') return true
  const age = ctxNumber(obs, 'age')
  if (age == null) {
    // Cannot confirm scope. Defaulting to "adult" would silently apply adult
    // thresholds to a child, so we treat unconfirmed scope as out of scope.
    return false
  }
  return age >= 18
}

interface SafetyPathwayResult {
  flags: string[]
  triggers: RecommendationTrigger[]
  narrative_required: string[]
  narrative_forbidden: string[]
  mandatory_caveats: string[]
}

/**
 * Non-interpretive safety pathways (DR-10.2-B). These run even when
 * interpretation abstains — the paediatric FH referral is the canonical case
 * (A-003): no band, no target, no interpretation, but the referral still fires.
 *
 * Both pathways are gated on anchored constants, so both are currently inert
 * (BLOCKER-009 / BLOCKER-011). They activate on anchoring with no code change.
 */
function runSafetyPathways(
  obs: CanonicalObservation,
  config: BiomarkerConfig,
  ctx: { paediatric: boolean },
): SafetyPathwayResult {
  const result: SafetyPathwayResult = {
    flags: [],
    triggers: [],
    narrative_required: [],
    narrative_forbidden: [],
    mandatory_caveats: [],
  }

  const value = obs.value_canonical
  if (value == null) return result

  // ── FH-pattern pathway: escalate hard, name nothing (Ch.6). ───────────────
  const fh = resolveConstant(config.constants.fh_pattern_threshold)
  const fhThreshold =
    fh.status === 'ANCHORED' && typeof fh.value === 'number' ? fh.value : null

  if (fhThreshold != null && value >= fhThreshold) {
    result.flags.push('apob_fh_pattern_flag', 'apob_suspected_genetic_origin')
    result.triggers.push({ trigger: 'fh_pattern', class: 'CLINICIAN_DISCUSSION' })

    if (ctx.paediatric) {
      // A-003 — referral only, despite full interpretive abstention.
      result.narrative_required.push(
        'VALUE_MARKEDLY_OUTSIDE_TYPICAL_FOR_AGE',
        'WARRANTS_MEDICAL_REVIEW',
        'NO_INTERPRETATION_PROVIDED',
      )
      result.narrative_forbidden.push(
        'ADULT_THRESHOLD_REFERENCE',
        'NUMERIC_TARGET',
        'PAEDIATRIC_INTERPRETATION',
      )
    } else {
      result.narrative_required.push(
        'APOB_MARKEDLY_ELEVATED',
        'VALUES_IN_THIS_RANGE_UNCOMMON',
        'WARRANTS_MEDICAL_ASSESSMENT_SOON',
        'TREATABLE_CAUSES_EXIST_UNNAMED',
      )
    }

    // Naming prohibitions apply in both branches, always.
    result.narrative_forbidden.push(
      'CONDITION_NAME_ANY',
      'GENE_NAME_DIAGNOSTIC_FRAMING',
      'DIAGNOSTIC_INSTRUMENT_NAME',
      'GENETIC_DIAGNOSIS_PROBABILITY',
      'GENETIC_TESTING_RECOMMENDATION',
      'CASCADE_SCREENING_INSTRUCTION',
      'LIFESTYLE_AS_SUFFICIENT',
    )
  }

  // ── Low-value investigation pathway (DR-6.4-A). ────────────────────────────
  // Routes to investigation. Never a lipid warning, never a score penalty
  // (`low_value_penalty` stays structurally 0), never a named cause.
  const low = resolveConstant(config.constants.low_investigation_threshold)
  const lowThreshold =
    low.status === 'ANCHORED' && typeof low.value === 'number' ? low.value : null

  if (lowThreshold != null && value < lowThreshold) {
    result.flags.push('apob_low_investigation_flag')
    result.triggers.push({ trigger: 'low_investigation', class: 'CLINICIAN_DISCUSSION' })
    result.narrative_required.push(
      'APOB_UNUSUALLY_LOW',
      'NOT_A_CARDIOVASCULAR_CONCERN',
      'FAVOURABLE_FROM_LIPID_STANDPOINT',
      'WORTH_MENTIONING_TO_DOCTOR',
    )
    result.narrative_forbidden.push(
      'LIPID_RISK_WARNING',
      'SECONDARY_CAUSE_SPECULATION',
      'ALARMING_TONE',
    )
  }

  return result
}

function reducerCaveats(reducers: string[]): string[] {
  const map: Record<string, string> = {
    fasting_status: 'CONTEXT_GAPS_NAMED',
    stratum_assumed: 'STRATUM_ASSUMED_CAVEAT',
    acute_state: 'VALUE_MAY_REFLECT_TEMPORARY_STATE',
    risk_context_unknown_or_stale: 'CONTEXT_GAPS_NAMED',
    trust_declared: 'DECLARED_SOURCE_CAVEAT',
    low_extraction_confidence: 'EXTRACTION_UNCERTAINTY_CAVEAT',
  }
  return reducers.map((r) => map[r]).filter((c): c is string => Boolean(c))
}
