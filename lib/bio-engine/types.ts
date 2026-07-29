/**
 * BIO-001 — Generic Biomarker Engine: core types & enums.
 *
 * Faithful to BIO-001-CONSOLIDATED-SPEC + HANDOVER §C. These types are
 * GENERIC (PI-2): they carry no biomarker prefix. Biomarker specificity lives
 * only in config (`BiomarkerConfig`) and context bundles.
 *
 * Nothing here encodes a scientific value. Every threshold/coefficient is a
 * CSL-anchored constant (see ./csl). Unanchored constants leave their feature
 * DISABLED (PI-5) — the engine displays the value and abstains.
 */

// ─── Ingestion enums (HANDOVER §C) ──────────────────────────────────────────

/** How a result physically arrived. Transport only — never a trust input (PI-1). */
export type AcquisitionChannel =
  | 'API'
  | 'FILE_UPLOAD'
  | 'MANUAL_ENTRY'
  | 'CONNECTED_SYSTEM'
  | 'INTERNAL_MIGRATION'

/** Where a result was produced. The epistemic origin — trust derives from this. */
export type MeasurementOrigin =
  | 'ACCREDITED_LAB'
  | 'POINT_OF_CARE_DEVICE'
  | 'CONSUMER_DEVICE'
  | 'USER_REPORTED'
  | 'UNKNOWN'

/** Trust tier, a function of origin+verification+extraction+provenance (PI-1). */
export type TrustTier = 'VERIFIED' | 'MEASURED' | 'DECLARED' | 'ABSENT'

export type ResultStatus = 'PRELIMINARY' | 'FINAL' | 'CORRECTED' | 'CANCELLED'

// ─── Four-state model enums (Ch.10, PI-3) ───────────────────────────────────

/** Gate 1. Generic — note the absence of a biomarker prefix (PI-2). */
export type ObservationValidity = 'PRESUMED_VALID' | 'VALIDITY_SUSPECT'

/** Gate 2. Orthogonal to validity. */
export type Interpretability = 'INTERPRETABLE' | 'NOT_INTERPRETABLE'

/**
 * Gate 3. NOT_ASSESSABLE is reserved for states that never reach Gate 3
 * (validity failed, or eligibility failed). NOT_ASSESSABLE ≠ REDUCED.
 */
export type Confidence = 'HIGH' | 'REDUCED' | 'NOT_ASSESSABLE'

// ─── Missingness / freshness (per-field; UNKNOWN ≠ NONE, STALE ≠ CURRENT) ────

export type Missingness = 'PRESENT' | 'UNKNOWN' | 'STALE'
export type Freshness = 'FRESH' | 'AGING' | 'STALE' | 'UNKNOWN_AGE'

// ─── Trend enums (Ch.8) ─────────────────────────────────────────────────────

export type TrendEventType = 'VALUE_DELTA' | 'BAND_TRANSITION' | 'STATE_TRANSITION'
export type TrendSuppressionClass =
  | 'VALIDITY_EXCLUSION'
  | 'METHOD_CHANGE'
  | 'ACUTE_STATE'
  | 'SUB_NOISE_FLOOR'
  | 'SCOPE_EXCLUSION'
export type Trajectory = 'IMPROVING' | 'STABLE' | 'WORSENING' | 'INSUFFICIENT_DATA'

/** Direction semantics — supplied by config, never inferred. */
export type DirectionSemantics =
  | 'LOWER_BETTER'
  | 'HIGHER_BETTER'
  | 'TARGET_BAND'
  | 'NEUTRAL'

// ─── Recommendation enums (Ch.12) ───────────────────────────────────────────

export type RecommendationPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
export type RecommendationRouting = 'SELF_CARE' | 'CLINICIAN' | 'URGENT_CLINICIAN'

// ─── Safety / narrative (Ch.11) ─────────────────────────────────────────────

export type ForbiddenTokenClass = 'SAFETY_CLASS' | 'QUALITY_CLASS'

/** CSL constant lifecycle (Ch.13, PI-5). */
export type ConstantState = 'DECLARED' | 'ANCHORED' | 'VERSIONED'

// ─── SourcedValue<T> — every independent field wraps its own provenance ──────

export interface Provenance {
  measurement_origin: MeasurementOrigin
  captured_at: string | null
  verified: boolean
  method: string | null
}

export interface SourceLocator {
  page?: number | null
  table?: string | null
  row?: number | null
  bounding_box?: string | null
  text_fragment_ref?: string | null
}

/**
 * Wraps every independent context field with its own value, missingness,
 * provenance, freshness and confidence. Fields never share a provenance record
 * (A-008). UNKNOWN is never NONE; STALE is never CURRENT.
 */
export interface SourcedValue<T> {
  value: T | null
  missingness: Missingness
  provenance: Provenance | null
  freshness: Freshness
  confidence: Confidence
}

// ─── CanonicalObservation — the single inbound contract (Ch.9.1) ─────────────

export interface CanonicalObservation {
  observation_id: string
  report_id: string | null
  source_record_id: string | null
  source_locator: SourceLocator | null

  /** Biomarker identity — resolves to a `BiomarkerConfig` by this id. */
  analyte: string

  acquisition_channel: AcquisitionChannel
  measurement_origin: MeasurementOrigin
  trust_tier: TrustTier
  result_status: ResultStatus

  /** Canonical numeric value after unit normalisation. null = unit unresolved. */
  value_canonical: number | null
  unit_canonical: string | null

  /** Raw source value/unit, preserved verbatim — never interpreted. */
  value_raw: number | string | null
  unit_raw: string | null

  /** Lab-provided reference interval + flag, preserved verbatim, never interpreted. */
  lab_reference_interval: string | null
  lab_flag: string | null

  collection_datetime: string | null
  freshness: Freshness

  extraction_confidence: number | null
  parser_version: string | null
  raw_source_fragment_ref: string | null
  supersedes_observation_id: string | null

  /** Biomarker-specific context bundle (all fields SourcedValue<T>). */
  context: Record<string, SourcedValue<unknown>>
}

/** Result of ingestion when a source cannot become a CanonicalObservation. */
export interface Rejection {
  rejected: true
  stage: string
  reason: string
}

// ─── OutputPayload — the single engine decision (Ch.10 §10.5) ────────────────

export interface ConcordanceResult {
  state: string
  narrative_required: string[]
  narrative_forbidden: string[]
}

export interface TrendResult {
  trajectory: Trajectory
  events: { type: TrendEventType; detail: string }[]
  /** Suppressions are audited, never silently dropped (Ch.8). */
  suppressions: { class: TrendSuppressionClass; detail: string }[]
  /**
   * Cumulative-exposure proxy over the OBSERVED WINDOW ONLY. Never a lifetime
   * figure and never a risk figure (Ch.8). null when not computable.
   */
  cumulative_exposure_proxy: number | null
  window: { from: string | null; to: string | null }
}

/** One prior point in a longitudinal series, already state-tagged (Ch.8). */
export interface TrendPoint {
  observation_id: string
  value_canonical: number | null
  collection_datetime: string | null
  validity: ObservationValidity
  band: string | null
  /** Assay/method identifier — a change suppresses comparison (METHOD_CHANGE). */
  method: string | null
  acute: boolean
  in_scope: boolean
}

export interface Recommendation {
  id: string
  class: string
  priority: RecommendationPriority
  /** Every trigger that produced or merged into this item, retained for audit. */
  drivers: string[]
  routing: RecommendationRouting
  provisional: boolean
  /** URGENT must present a clinical-contact route in view (Ch.12). */
  contact_route_required: boolean
}

/**
 * The ONE engine output shape for every biomarker. The four-state fields are
 * ALWAYS present, even in abstention. `abstain()` produces this too — an
 * abstention is a first-class payload, never an error.
 */
export interface OutputPayload {
  observation_id: string
  analyte: string

  // Four-state — always present.
  validity: ObservationValidity
  interpretability: Interpretability
  confidence: Confidence

  /** true when the engine declined to interpret. is_error is always false. */
  abstained: boolean
  abstention_reason: string | null
  is_error: false

  // Interpretation (null / empty while abstaining or feature DISABLED).
  band: string | null
  gap_to_target: number | null
  score_contribution: number | null
  concordance: ConcordanceResult | null
  flags: string[]
  trend: TrendResult | null
  /** Approved, consolidated recommendations (Ch.12). Allowlisted classes only. */
  recommendations: Recommendation[]

  // Narrative contract handed to the AI renderer (Ch.10/11).
  narrative_required: string[]
  narrative_forbidden: string[]
  mandatory_caveats: string[]

  // Which features were disabled for want of an anchored constant (PI-5).
  disabled_features: string[]

  // Reproducibility (Ch.13).
  config_version: string
  evidence_versions: Record<string, string>

  /** Structural nulls — permanently null/0 by design (Appendix C-5). */
  structural_nulls: Record<string, null | 0 | false>
}

// ─── Closed renderer input (Ch.11, PI-4 — no CanonicalObservation) ───────────

export interface RendererInput {
  payload: OutputPayload
  narrative_required: string[]
  narrative_forbidden: string[]
  mandatory_caveats: string[]
  approved_recommendations: Recommendation[]
  explanation_tokens: string[]
  permitted_evidence_refs: string[]
}
