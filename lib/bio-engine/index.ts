/**
 * BIO-001 — Generic Biomarker Engine: public API.
 *
 * Deterministic-before-AI (PI-4). The pipeline computes clinical meaning from
 * versioned scientific data; the AI layer only renders the resulting narrative
 * contract and can never override it.
 *
 * Import side-effect: registering the ApoB tenant config.
 */

import './apob-config'

export * from './types'
export { ingest, type RawResult } from './ingest'
export { interpret, abstain, type InterpretOptions } from './engine'
export {
  assignBand,
  resolveStratum,
  scoreContribution,
  thresholdsFor,
  parseThresholdSet,
  DEFAULT_STRATUM,
  type Band,
  type StratumThresholds,
  type ThresholdSet,
  type ScoreContribution,
} from './interpretation'
export {
  evaluateConcordance,
  type ConcordanceState,
  type ConcordanceOutcome,
} from './concordance'
export {
  buildRecommendations,
  consolidateRecommendations,
  downgradeOneTier,
  routeFor,
  type RecommendationTrigger,
} from './recommendations'
export { evaluateTrend } from './trend'
export {
  validateNarrative,
  deterministicTemplate,
  classifyForbiddenToken,
  SAFETY_CLASS_TOKENS,
  type ValidationResult,
} from './safety'
export {
  resolveConstant,
  isAnchored,
  getClaim,
  evidenceVersions,
  registerClaimSource,
  auditLibrary,
  claimSource,
  type CSLClaim,
  type ResolvedConstant,
} from './csl'
export {
  getBiomarkerConfig,
  registerBiomarkerConfig,
  type BiomarkerConfig,
} from './config'
export { APOB_CONFIG } from './apob-config'
export { composeConfidence, deriveReducerContext } from './confidence'
