/**
 * BIO-001 — BiomarkerConfig: the per-tenant configuration contract.
 *
 * The generic engine is implemented once. A biomarker is added by supplying a
 * `BiomarkerConfig` (and a context-bundle schema), never by editing engine code
 * (HANDOVER §H). ApoB is the first tenant; its config is `APOB_CONFIG`.
 *
 * Scientific values are referenced here by CSL claim id only — never inlined
 * (PI-5). The engine resolves them at interpretation time and disables the
 * dependent feature if a claim is unanchored.
 */

import type {
  DirectionSemantics,
  RecommendationPriority,
  RecommendationRouting,
} from './types'

export interface BiomarkerConfig {
  /** Matches CanonicalObservation.analyte. */
  analyte: string
  display_name: string

  ingestion: {
    unit_canonical: string
    /** factor to multiply a value in `unit` by to reach unit_canonical. */
    conversions: Record<string, number>
    aliases: string[]
    /** Population the thresholds apply to; out-of-scope → NOT_INTERPRETABLE. */
    scope_population: string
  }

  direction: DirectionSemantics
  cumulative_exposure_relevant: boolean

  /** CSL claim ids the engine resolves for each feature (PI-5). */
  constants: {
    threshold_set: string
    /** Scale of the continuous gap-to-target score (A-001). */
    score_gap_scale: string
    significant_change_threshold: string
    acute_recovery_window: string
    lifestyle_gap_ceiling: string
    low_investigation_threshold: string
    fh_pattern_threshold: string
    /** Companion-analyte thresholds required for discordance (Ch.4). */
    companion_threshold_set?: string
  }

  /**
   * Recommendation priority ladder — trigger → priority. Mapped from the frozen
   * triggers in the spec, never invented at runtime (Ch.12).
   */
  recommendation_ladder: Record<string, RecommendationPriority>

  /** Deterministic routing per recommendation class (Ch.12). */
  recommendation_routing: Record<string, RecommendationRouting>

  /** CSL lexicon claim ids the narrative validator enforces against. */
  lexicons: {
    drug_lexicon: string
    prohibited_condition_lexicon: string
  }

  /** The ONLY recommendation classes this biomarker may ever emit. */
  recommendation_allowlist: string[]
  /** Non-constructible classes — asserted here for audit; never produced. */
  prohibited_recommendation_classes: string[]

  /**
   * Structural nulls: fields that are permanently null/0/false by design
   * (Appendix C-5). Present so a future developer does not "fix" them.
   */
  structural_nulls: Record<string, null | 0 | false>

  config_version: string
}

/** Registry of all tenant configs, keyed by analyte id. */
const CONFIGS: Map<string, BiomarkerConfig> = new Map()

export function registerBiomarkerConfig(config: BiomarkerConfig): void {
  CONFIGS.set(config.analyte, config)
}

export function getBiomarkerConfig(analyte: string): BiomarkerConfig | undefined {
  return CONFIGS.get(analyte)
}
