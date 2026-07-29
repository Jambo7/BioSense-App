/**
 * BIO-001 — APOB_CONFIG: the first tenant's configuration layer.
 *
 * Consolidated Spec §4. ApoB supplies configuration onto the generic engine.
 * Every scientific value is a CSL claim id (see ./csl-data/apob.json), never a
 * literal — so ApoB currently ships with banding, scoring, discordance, trend
 * significance and the FH pathway DISABLED pending the anchoring pass, exactly
 * as Consolidated Spec §5 mandates.
 */

import { registerBiomarkerConfig, type BiomarkerConfig } from './config'

export const APOB_CONFIG: BiomarkerConfig = {
  analyte: 'APOB_TOTAL',
  display_name: 'Apolipoprotein B',

  ingestion: {
    unit_canonical: 'mg/dL',
    // g/L → mg/dL ×100; mg/L → mg/dL ÷10.
    conversions: { 'mg/dL': 1, 'g/L': 100, 'mg/L': 0.1 },
    aliases: ['ApoB', 'Apolipoprotein B', 'APOB', 'Apo B'],
    scope_population: 'ADULT',
  },

  direction: 'LOWER_BETTER',
  cumulative_exposure_relevant: true,

  constants: {
    threshold_set: 'BIOSENSE_APOB_THRESHOLD_SET',
    score_gap_scale: 'APOB_SCORE_GAP_SCALE',
    significant_change_threshold: 'APOB_SIGNIFICANT_CHANGE_THRESHOLD',
    acute_recovery_window: 'APOB_ACUTE_RECOVERY_WINDOW',
    lifestyle_gap_ceiling: 'APOB_LIFESTYLE_ADDRESSABLE_GAP_CEILING',
    low_investigation_threshold: 'APOB_LOW_INVESTIGATION_THRESHOLD',
    fh_pattern_threshold: 'APOB_FH_PATTERN_THRESHOLD',
    companion_threshold_set: 'BIOSENSE_LDLC_THRESHOLD_SET',
  },

  // Consolidated Spec §4 — the frozen ApoB priority ladder.
  recommendation_ladder: {
    fh_pattern: 'URGENT',
    large_gap: 'HIGH',
    reassurance_failure: 'HIGH',
    low_investigation: 'MEDIUM',
    discordance_review: 'MEDIUM',
    // Gap-driven lifestyle route, used only while the gap sits below
    // APOB_LIFESTYLE_ADDRESSABLE_GAP_CEILING; above it, `large_gap` escalates
    // to a clinician instead (BLOCKER-006).
    lifestyle_addressable: 'MEDIUM',
    maintenance: 'LOW',
  },

  // Deterministic routing from recommendation class (Ch.12). URGENT priority
  // overrides these to URGENT_CLINICIAN regardless of class.
  recommendation_routing: {
    LIFESTYLE_DIETARY: 'SELF_CARE',
    LIFESTYLE_ACTIVITY: 'SELF_CARE',
    MONITOR: 'SELF_CARE',
    MEASURE_APOB: 'CLINICIAN',
    REMEASURE_APOB: 'CLINICIAN',
    CLINICIAN_DISCUSSION: 'CLINICIAN',
  },

  lexicons: {
    drug_lexicon: 'BIOSENSE_LIPID_DRUG_LEXICON',
    prohibited_condition_lexicon: 'BIOSENSE_PROHIBITED_CONDITION_LEXICON',
  },

  recommendation_allowlist: [
    'LIFESTYLE_DIETARY',
    'LIFESTYLE_ACTIVITY',
    'MEASURE_APOB',
    'REMEASURE_APOB',
    'CLINICIAN_DISCUSSION',
    'MONITOR',
  ],
  prohibited_recommendation_classes: [
    'PHARMACOLOGICAL_START',
    'PHARMACOLOGICAL_STOP',
    'PHARMACOLOGICAL_CHANGE',
    'THERAPY_UNNECESSARY',
  ],

  // Appendix C-5 — permanently null/0/false by design.
  structural_nulls: {
    apob_derived_risk_score: null,
    apob_risk_reduction_pct: null,
    condition_named: null,
    diagnostic_criteria_score: null,
    simon_broome_score: null,
    dlcn_score: null,
    genetic_diagnosis_probability: null,
    apob_corrected_value: null,
    apob_interference_direction: null,
    apob_value_imputed: null,
    ldlc_value_imputed: null,
    genetic_origin_penalty: 0,
    low_value_penalty: 0,
  },

  config_version: 'APOB_CONFIG@1.0.0',
}

registerBiomarkerConfig(APOB_CONFIG)
