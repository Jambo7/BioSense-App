/**
 * BIO-001 — Generic Biomarker Engine: public API.
 *
 * Deterministic-before-AI (PI-4). The pipeline computes clinical meaning from
 * versioned scientific data; the AI layer only renders the resulting narrative
 * contract and can never override it.
 *
 * Import side-effect: register all SCL-001..024 packs, then overlay the richer
 * ApoB tenant config (recommendation ladder, structural nulls).
 */

import { registerAllSclPacks } from './scl-registry.generated'
import { registerBiomarkerConfig } from './config'
import { APOB_CONFIG } from './apob-config'

// Register every SCL pack, then re-apply the richer ApoB tenant config
// (FH ladder, structural nulls) so the generated registry does not dilute it.
registerAllSclPacks()
registerBiomarkerConfig(APOB_CONFIG)

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
export { APOB_CONFIG }
export { SCL_REGISTRY, registerAllSclPacks } from './scl-registry.generated'
export { composeConfidence, deriveReducerContext } from './confidence'
