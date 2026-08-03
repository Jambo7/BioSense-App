/**
 * BIO-001 — standing safety suite (Ch.13 §F release gate, DR-11.5-A).
 *
 * The spec requires a standing, versioned corpus that runs in CI with ZERO
 * safety failures, and that is APPEND-ONLY: cases are added, never removed or
 * weakened. Each case below asserts a frozen rule from the specification, so a
 * regression here means a safety rule has been broken, not that a test is fussy.
 *
 * Run with: npm run test:engine
 *
 * Note on structure: Part 1 exercises the production ship state after SCL-001
 * ApoB banding was anchored from Neil's pack (optimal <65 / above ≥80). Score /
 * FH / RCV stay disabled until those claims are filled. Part 3 registers a test
 * claim source to prove remaining features activate on anchoring with no code
 * change. Part-3 test values are arbitrary and carry no clinical meaning.
 */
import {
  ingest,
  interpret,
  deterministicTemplate,
  resolveConstant,
  registerClaimSource,
  auditLibrary,
  consolidateRecommendations,
  downgradeOneTier,
  APOB_CONFIG,
  type CanonicalObservation,
  type CSLClaim,
  type SourcedValue,
  type TrendPoint,
} from '../index'

let failures = 0
/** `undefined` (e.g. from an optional chain on a null trend) counts as a failure. */
function check(cond: boolean | undefined, msg: string) {
  if (cond === true) console.log('  ok   ' + msg)
  else {
    console.log('  FAIL ' + msg)
    failures++
  }
}
function section(s: string) {
  console.log('\n' + s)
}

const sv = <T,>(value: T): SourcedValue<T> => ({
  value,
  missingness: 'PRESENT',
  provenance: null,
  freshness: 'FRESH',
  confidence: 'HIGH',
})

function apobObs(
  value: number,
  unit: string | null,
  context: Record<string, SourcedValue<unknown>> = {},
  extra: Partial<Parameters<typeof ingest>[0]> = {},
): CanonicalObservation {
  return ingest({
    analyte: 'APOB_TOTAL',
    value,
    unit,
    acquisition_channel: 'FILE_UPLOAD',
    measurement_origin: 'ACCREDITED_LAB',
    verified: true,
    collection_datetime: '2026-07-01T00:00:00Z',
    context: { age: sv(42), ...context },
    ...extra,
  }) as CanonicalObservation
}

// ═══ PART 1 — production ship state (SCL-001 banding anchored) ═════════════
section('PART 1 — SCL-001 anchored banding; score/FH still disabled')

const obs1 = apobObs(1.1, 'g/L')
check(obs1.trust_tier === 'VERIFIED', 'verified accredited-lab upload is VERIFIED (PI-1)')
check(Math.abs((obs1.value_canonical ?? 0) - 110) < 1e-9, '1.1 g/L normalises to 110 mg/dL')

const out1 = interpret(obs1)
check(out1.abstained === false, 'interprets once SCL-001 thresholds are anchored')
check(out1.is_error === false, 'interpretation is not an error')
check(out1.band === 'ABOVE_TARGET', 'ApoB 110 mg/dL is ABOVE_TARGET under SCL-001 (≥80)')
check(
  out1.gap_to_target != null && Math.abs(out1.gap_to_target - 45) < 1e-6,
  'gap is 110 − 65 (optimal_max)',
)
check(out1.score_contribution === null, 'score EXCLUDED until APOB_SCORE_GAP_SCALE anchored')
check(!out1.disabled_features.includes('banding'), 'banding enabled from SCL-001')
check(out1.disabled_features.includes('fh_pattern_pathway'), 'FH pathway still disabled (no ApoB FH cut)')
check(
  out1.narrative_forbidden.includes('NUMERIC_RISK_ESTIMATE'),
  'standing prohibitions ride on every payload',
)
check(out1.structural_nulls.apob_derived_risk_score === null, 'risk score structurally null')
check(out1.structural_nulls.low_value_penalty === 0, 'low_value_penalty structurally 0')
check(deterministicTemplate(out1).length > 0, 'deterministic template renders')

const optimal = interpret(apobObs(60, 'mg/dL'))
check(optimal.band === 'AT_TARGET', 'ApoB 60 is AT_TARGET under SCL-001 (<65)')

const near = interpret(apobObs(70, 'mg/dL'))
check(near.band === 'NEAR_TARGET', 'ApoB 70 is NEAR_TARGET under SCL-001 (65–79)')

const noUnit = apobObs(90, null)
check(noUnit.value_canonical === null, 'missing unit → never guessed')

const paed = interpret(apobObs(110, 'mg/dL', { age: sv(9) }))
check(paed.abstained, 'paediatric value abstains (out of scope)')

const noAge = interpret(apobObs(1.1, 'g/L', { age: { ...sv(0), missingness: 'UNKNOWN' } }))
check(noAge.abstained, 'unconfirmed age treated as out of scope, not assumed adult')

// ═══ PART 2 — audit-field enforcement ══════════════════════════════════════
section('PART 2 — anchoring requires real audit fields')

registerClaimSource('test/sloppy', [
  {
    claim_id: 'APOB_SCORE_GAP_SCALE',
    assertion: 'sloppy',
    value: 60,
    unit: 'mg/dL',
    version: '0.0.0',
    effective_date: null,
    author: null,
    provenance: null,
    evidence_grade: null,
    review_status: 'ANCHORED',
  } as CSLClaim,
])
check(
  resolveConstant('APOB_SCORE_GAP_SCALE').status === 'DISABLED',
  'ANCHORED claim with no author/provenance is refused and stays disabled',
)
check(
  auditLibrary().refusals.some((r) => r.claim_id === 'APOB_SCORE_GAP_SCALE'),
  'refusal is recorded in the library audit',
)

// ═══ PART 3 — properly anchored: features light up ═════════════════════════
section('PART 3 — properly anchored: features activate with no code change')

const audit = {
  version: '1.0.0',
  effective_date: '2026-08-01',
  author: 'Test clinical lead',
  provenance: 'Test provenance reference',
  evidence_grade: 'A',
  review_status: 'ANCHORED' as const,
}

registerClaimSource('test/anchored', [
  {
    claim_id: 'BIOSENSE_APOB_THRESHOLD_SET',
    assertion: 'test thresholds',
    value: {
      PRIMARY_PREVENTION_UNSELECTED: { optimal_max: 80, above_target_min: 100 },
      SECONDARY_PREVENTION: { optimal_max: 55, above_target_min: 65 },
    },
    unit: 'mg/dL',
    ...audit,
  },
  { claim_id: 'APOB_SCORE_GAP_SCALE', assertion: 'test scale', value: 100, unit: 'mg/dL', ...audit },
  {
    claim_id: 'APOB_LIFESTYLE_ADDRESSABLE_GAP_CEILING',
    assertion: 'test ceiling', value: 30, unit: 'mg/dL', ...audit,
  },
  {
    claim_id: 'APOB_SIGNIFICANT_CHANGE_THRESHOLD',
    assertion: 'test sig', value: 10, unit: 'mg/dL', ...audit,
  },
  {
    claim_id: 'BIOSENSE_LDLC_THRESHOLD_SET',
    assertion: 'test ldlc',
    value: { PRIMARY_PREVENTION_UNSELECTED: { optimal_max: 100, above_target_min: 130 } },
    unit: 'mg/dL',
    ...audit,
  },
  {
    claim_id: 'APOB_FH_PATTERN_THRESHOLD',
    assertion: 'test fh', value: 190, unit: 'mg/dL', ...audit,
  },
  {
    claim_id: 'APOB_LOW_INVESTIGATION_THRESHOLD',
    assertion: 'test low', value: 40, unit: 'mg/dL', ...audit,
  },
] as CSLClaim[])

check(resolveConstant('BIOSENSE_APOB_THRESHOLD_SET').status === 'ANCHORED', 'threshold set now anchored')

// 3a — at target
const atTarget = interpret(apobObs(70, 'mg/dL'))
check(!atTarget.abstained, 'anchored thresholds → interpretation proceeds')
check(atTarget.band === 'AT_TARGET', 'ApoB 70 is AT_TARGET')
check(atTarget.gap_to_target === 0, 'at-target gap is 0')
check(atTarget.score_contribution === 100, 'at-target scores 100 (no low-end penalty)')
check(atTarget.narrative_required.includes('APOB_AT_TARGET'), 'at-target narrative token set')
check(
  atTarget.flags.includes('stratum_assumed'),
  'unknown stratum is assumed + flagged, never inferred',
)
check(
  atTarget.narrative_required.includes('THRESHOLD_ASSUMES_NO_KNOWN_CVD'),
  'assumed stratum forces the no-known-CVD caveat',
)
check(atTarget.confidence === 'REDUCED', 'assumed stratum reduces confidence')

// 3b — a value better than target still scores 100, never penalised
const veryLow = interpret(apobObs(45, 'mg/dL'))
check(veryLow.score_contribution === 100, 'below-target value is not penalised')

// 3c — above target, gap under ceiling → lifestyle route
const nearTarget = interpret(apobObs(95, 'mg/dL'))
check(nearTarget.band === 'NEAR_TARGET', 'ApoB 95 is NEAR_TARGET')
check(nearTarget.gap_to_target === 15, 'gap is 15 (95 − 80)')
check(nearTarget.score_contribution === 85, 'score is continuous: gap 15 of scale 100 → 85')
check(
  nearTarget.recommendations.some((r) => r.class === 'LIFESTYLE_DIETARY'),
  'gap under ceiling routes to lifestyle',
)
check(
  nearTarget.recommendations.every((r) => r.routing !== 'URGENT_CLINICIAN'),
  'no urgent escalation for a small gap',
)

// 3d — above target, gap over ceiling → clinician escalation
const bigGap = interpret(apobObs(130, 'mg/dL'))
check(bigGap.band === 'ABOVE_TARGET', 'ApoB 130 is ABOVE_TARGET')
check(bigGap.gap_to_target === 50, 'gap is 50')
check(bigGap.narrative_required.includes('GAP_LARGE_REFER'), 'large gap requires referral token')
check(
  bigGap.recommendations.some((r) => r.class === 'CLINICIAN_DISCUSSION'),
  'large gap escalates to clinician',
)
check(
  bigGap.narrative_required.includes('APOB_IS_ONE_INPUT_TO_RISK'),
  'above target must state ApoB is one input to risk',
)
check(
  bigGap.narrative_forbidden.includes('EFFECT_SIZE_CLAIM'),
  'effect-size claims forbidden',
)

// 3e — monotonicity of the score
const scores = [80, 90, 100, 120, 150, 200].map(
  (v) => interpret(apobObs(v, 'mg/dL')).score_contribution ?? -1,
)
check(
  scores.every((s, i) => i === 0 || s <= scores[i - 1]),
  `score is monotonic non-increasing as gap grows: ${scores.join(' → ')}`,
)

// 3f — THE reassurance-failure case: ApoB high, LDL-C at target
const reassurance = interpret(apobObs(130, 'mg/dL', { ldlc_value: sv(90) }))
check(
  reassurance.concordance?.state === 'DISCORDANT_APOB_HIGHER',
  'ApoB high + LDL-C at target → DISCORDANT_APOB_HIGHER',
)
check(
  reassurance.flags.includes('reassurance_failure_case'),
  'reassurance_failure_case flag raised',
)
check(
  reassurance.narrative_required.includes('LDLC_UNDERSTATES_PARTICLE_BURDEN'),
  'must state the cholesterol measure understates particle burden',
)
check(
  reassurance.narrative_forbidden.includes('LDLC_REASSURANCE') &&
    reassurance.narrative_forbidden.includes('NET_NEUTRAL_ASSESSMENT'),
  'LDL-C reassurance and net-neutral framing both forbidden',
)

// 3g — the opposite discordance: must not overreach
const ldlcHigher = interpret(apobObs(70, 'mg/dL', { ldlc_value: sv(150) }))
check(
  ldlcHigher.concordance?.state === 'DISCORDANT_LDLC_HIGHER',
  'LDL-C high + ApoB at target → DISCORDANT_LDLC_HIGHER',
)
check(
  ldlcHigher.narrative_required.includes('LDLC_ABOVE_TARGET') &&
    ldlcHigher.narrative_required.includes('CLINICIAN_DISCUSSION'),
  'must still state LDL-C is above target and route to a clinician',
)
check(
  ldlcHigher.narrative_forbidden.includes('ONLY_APOB_MATTERS'),
  '"only ApoB matters" is forbidden',
)

// 3h — no companion value → INDETERMINATE, never imputed
check(interpret(apobObs(130, 'mg/dL')).concordance === null, 'missing LDL-C → no discordance claim')

// 3i — FH pattern: escalate hard, name nothing
const fh = interpret(apobObs(210, 'mg/dL'))
check(fh.flags.includes('apob_fh_pattern_flag'), 'FH pattern flagged at 210')
check(
  fh.recommendations.some((r) => r.routing === 'URGENT_CLINICIAN'),
  'FH pattern escalates to URGENT_CLINICIAN',
)
check(
  fh.recommendations.some((r) => r.contact_route_required),
  'URGENT requires an in-view contact route',
)
check(
  fh.narrative_required.includes('TREATABLE_CAUSES_EXIST_UNNAMED'),
  'must say treatable causes exist — without naming them',
)
check(
  fh.narrative_forbidden.includes('CONDITION_NAME_ANY') &&
    fh.narrative_forbidden.includes('GENETIC_DIAGNOSIS_PROBABILITY'),
  'naming the condition and estimating probability both forbidden',
)
check(fh.structural_nulls.condition_named === null, 'condition_named stays structurally null')

// 3j — paediatric FH: referral fires despite full interpretive abstention (A-003)
const paedFh = interpret(apobObs(210, 'mg/dL', { age: sv(11) }))
check(paedFh.abstained, 'paediatric case still abstains from interpretation')
check(paedFh.band === null, 'no band assigned for a child')
check(
  paedFh.recommendations.some((r) => r.routing === 'URGENT_CLINICIAN'),
  'but the URGENT referral survives the abstention (A-003)',
)
check(
  paedFh.narrative_forbidden.includes('ADULT_THRESHOLD_REFERENCE'),
  'adult threshold reference forbidden for a child',
)

// 3k — low-value investigation route
const low = interpret(apobObs(30, 'mg/dL'))
check(low.flags.includes('apob_low_investigation_flag'), 'low value flags investigation')
check(low.score_contribution === 100, 'low value carries no score penalty')
check(
  low.narrative_required.includes('NOT_A_CARDIOVASCULAR_CONCERN'),
  'low value is explicitly not framed as cardiovascular risk',
)
check(
  low.narrative_forbidden.includes('SECONDARY_CAUSE_SPECULATION'),
  'no speculation about the cause',
)

// 3l — at target WITH known risk factors → cannot claim low risk
const atTargetRisk = interpret(
  apobObs(70, 'mg/dL', { cardiovascular_risk_context: sv('KNOWN') }),
)
check(
  atTargetRisk.narrative_forbidden.includes('CARDIOVASCULAR_RISK_IS_LOW'),
  'at target + known risk factors forbids "your risk is low"',
)
check(
  atTargetRisk.narrative_required.includes('NAMED_RISK_FACTORS_PRESENT'),
  'named risk factors must be surfaced',
)

// 3m — secondary prevention uses its own stratum thresholds
const secondary = interpret(
  apobObs(70, 'mg/dL', { apob_risk_stratum: sv('SECONDARY_PREVENTION') }),
)
check(
  secondary.band === 'ABOVE_TARGET',
  'ApoB 70 is ABOVE_TARGET for secondary prevention (stricter target)',
)
check(!secondary.flags.includes('stratum_assumed'), 'declared stratum is not flagged as assumed')

// ═══ PART 4 — validity, trend gauntlet, recommendations ════════════════════
section('PART 4 — validity gate, trend gauntlet, recommendation rules')

const suspect = interpret(apobObs(130, 'mg/dL', { interference: sv('ACTIVE') }))
check(suspect.validity === 'VALIDITY_SUSPECT', 'interference → VALIDITY_SUSPECT')
check(suspect.band === null, 'suspect value is not banded at any confidence')
check(
  suspect.narrative_forbidden.includes('REPORT_CORRECTED_VALUE') &&
    suspect.narrative_forbidden.includes('REPORT_INTERFERENCE_DIRECTION'),
  'never report a corrected value or guess interference direction',
)

const priorPoint = (
  value: number,
  date: string,
  over: Partial<TrendPoint> = {},
): TrendPoint => ({
  observation_id: 'prior-' + date,
  value_canonical: value,
  collection_datetime: date,
  validity: 'PRESUMED_VALID',
  band: 'ABOVE_TARGET',
  method: 'immunoturbidimetric',
  acute: false,
  in_scope: true,
  ...over,
})

const withMethod = { assay_method: sv('immunoturbidimetric') }

const trendReal = interpret(apobObs(110, 'mg/dL', withMethod), undefined, {
  series: [priorPoint(140, '2026-01-01T00:00:00Z')],
})
check(
  trendReal.trend?.trajectory === 'IMPROVING',
  'a real 30 mg/dL fall is IMPROVING (LOWER_BETTER)',
)
check(
  trendReal.trend?.events.some((e) => e.type === 'VALUE_DELTA'),
  'VALUE_DELTA event reported',
)
check(
  trendReal.trend?.cumulative_exposure_proxy != null,
  'cumulative exposure proxy computed over the observed window',
)

const trendNoise = interpret(apobObs(110, 'mg/dL', withMethod), undefined, {
  series: [priorPoint(115, '2026-01-01T00:00:00Z')],
})
check(
  trendNoise.trend?.suppressions.some((s) => s.class === 'SUB_NOISE_FLOOR'),
  'a 5 mg/dL delta is suppressed below the significance floor',
)
check(trendNoise.trend?.events.length === 0, 'suppressed comparison reports no event')

const trendMethod = interpret(apobObs(110, 'mg/dL', withMethod), undefined, {
  series: [priorPoint(140, '2026-01-01T00:00:00Z', { method: 'mass-spectrometry' })],
})
check(
  trendMethod.trend?.suppressions.some((s) => s.class === 'METHOD_CHANGE'),
  'an assay change suppresses the comparison before noise is even considered',
)

const trendAcute = interpret(apobObs(110, 'mg/dL', withMethod), undefined, {
  series: [priorPoint(140, '2026-01-01T00:00:00Z', { acute: true })],
})
check(
  trendAcute.trend?.suppressions.some((s) => s.class === 'ACUTE_STATE'),
  'an acute prior value is not treated as a baseline',
)

const trendSuspectPrior = interpret(apobObs(110, 'mg/dL', withMethod), undefined, {
  series: [
    priorPoint(140, '2026-01-01T00:00:00Z', {
      validity: 'VALIDITY_SUSPECT',
      method: 'mass-spectrometry',
      acute: true,
    }),
  ],
})
check(
  trendSuspectPrior.trend?.suppressions[0]?.class === 'VALIDITY_EXCLUSION',
  'gauntlet is ordered: validity exclusion fires before method/acute',
)

// Recommendation rules
check(downgradeOneTier('URGENT') === 'HIGH', 'acknowledged URGENT floors at HIGH, never lower')
check(downgradeOneTier('LOW') === 'LOW', 'LOW cannot be downgraded away')

const ackFh = interpret(apobObs(210, 'mg/dL'), undefined, { clinician_acknowledged: true })
check(
  ackFh.recommendations.length > 0 &&
    ackFh.recommendations.every((r) => r.priority !== 'URGENT'),
  'acknowledgement downgrades urgency but never suppresses the recommendation',
)

const prelim = interpret(
  apobObs(210, 'mg/dL', {}, { result_status: 'PRELIMINARY' }),
)
check(
  prelim.recommendations.every((r) => r.priority !== 'URGENT'),
  'a PRELIMINARY result cannot carry URGENT on its own',
)
check(prelim.recommendations.every((r) => r.provisional), 'preliminary recommendations are provisional')

const consolidated = consolidateRecommendations([
  {
    id: 'a', class: 'CLINICIAN_DISCUSSION', priority: 'MEDIUM', drivers: ['discordance_review'],
    routing: 'CLINICIAN', provisional: false, contact_route_required: false,
  },
  {
    id: 'b', class: 'CLINICIAN_DISCUSSION', priority: 'HIGH', drivers: ['large_gap'],
    routing: 'CLINICIAN', provisional: false, contact_route_required: false,
  },
])
check(consolidated.length === 1, 'one recommendation per routing target')
check(consolidated[0].priority === 'HIGH', 'highest priority wins consolidation')
check(
  consolidated[0].drivers.includes('large_gap') &&
    consolidated[0].drivers.includes('discordance_review'),
  'all drivers retained for audit',
)

// Prohibited classes are not constructible
const prohibited = interpret(apobObs(130, 'mg/dL'))
check(
  prohibited.recommendations.every(
    (r) => !APOB_CONFIG.prohibited_recommendation_classes.includes(r.class),
  ),
  'no prohibited (pharmacological) recommendation class can appear',
)
check(
  prohibited.recommendations.every((r) => APOB_CONFIG.recommendation_allowlist.includes(r.class)),
  'every recommendation comes from the allowlist',
)

section(failures === 0 ? `ALL CHECKS PASSED` : `${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
