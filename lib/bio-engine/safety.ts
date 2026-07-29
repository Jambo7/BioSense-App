/**
 * BIO-001 — Safety & narrative validation (Ch.11, Appendix C-1).
 *
 * Two-sided validation on rendered text, prompt-independent (DR-11.2-B):
 *   - mandatory presence: every required-meaning token must be expressed;
 *   - prohibited absence: no forbidden-meaning token may appear.
 *
 * Forbidden tokens are SAFETY_CLASS (→ deterministic fallback, never retry) or
 * QUALITY_CLASS (→ bounded retry). A prohibition enforced only by prompt is
 * unenforced — this validator is the enforcement.
 *
 * NOTE ON FIDELITY: the spec's validator matches on the *meaning* a token
 * denotes, not a literal string (DR-11.2-A). Full semantic matching is a
 * dedicated NLP task. This module implements the concretely enforceable and
 * highest-stakes half now — lexicon-driven prohibited-term detection (drug
 * names, condition/gene/instrument names) resolved from the CSL — and a
 * surface-form check for required/forbidden meaning anchors. The lexicon checks
 * are the load-bearing safety net; they are disabled-safe (see below).
 */

import type { ForbiddenTokenClass, OutputPayload } from './types'
import { resolveConstant } from './csl'
import type { BiomarkerConfig } from './config'

/** SAFETY_CLASS forbidden tokens (Appendix C-1, DR-11.3-A). */
export const SAFETY_CLASS_TOKENS: ReadonlySet<string> = new Set([
  'CONDITION_NAME_ANY',
  'GENE_NAME_DIAGNOSTIC_FRAMING',
  'DIAGNOSTIC_INSTRUMENT_NAME',
  'GENETIC_DIAGNOSIS_PROBABILITY',
  'DRUG_RECOMMENDATION',
  'NUMERIC_RISK_ESTIMATE',
  'EFFECT_SIZE_CLAIM',
  'CONFIRM_DIAGNOSIS',
  'DENY_DIAGNOSIS',
  'NAME_CONDITION_EVEN_TO_DENY_IT',
  'SOFTEN_URGENCY_TO_AVOID_QUESTION',
  'POLICY_FRAMED_REFUSAL',
  'SECONDARY_CAUSE_SPECULATION',
  'REPORT_CORRECTED_VALUE',
  'REPORT_INTERFERENCE_DIRECTION',
  // Deprescribing-implication family.
  'THERAPY_UNNECESSARY_IMPLICATION',
  'GOOD_ENOUGH_TO_STOP_IMPLICATION',
  'HYPOTHETICAL_CESSATION_OUTCOME',
  'ABSTENTION_REVERSAL_UNDER_REPETITION',
])

export function classifyForbiddenToken(token: string): ForbiddenTokenClass {
  return SAFETY_CLASS_TOKENS.has(token) ? 'SAFETY_CLASS' : 'QUALITY_CLASS'
}

export type ValidationResult =
  | { result: 'PASS' }
  | { result: 'FAIL'; token: string; class: ForbiddenTokenClass; detail: string }

interface NarrativeCheckInput {
  text: string
  config: BiomarkerConfig
  /** Meaning-token → surface-form phrases the renderer used to express it. */
  required_surface_forms?: Record<string, string[]>
  forbidden_tokens: string[]
}

/** Case-insensitive whole-word-ish containment. */
function contains(haystack: string, needle: string): boolean {
  if (!needle) return false
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

function lexiconTerms(claimId: string): string[] {
  const resolved = resolveConstant(claimId)
  if (resolved.status !== 'ANCHORED') return []
  const v = resolved.value
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === 'string')
  return []
}

/**
 * Validate a rendered narrative against its contract. Returns the FIRST failure
 * (so callers can fail closed immediately). SAFETY_CLASS failures must serve the
 * deterministic template; QUALITY_CLASS failures may retry.
 */
export function validateNarrative(input: NarrativeCheckInput): ValidationResult {
  const { text, config, forbidden_tokens, required_surface_forms } = input

  // 1) Prohibited-absence: lexicon terms must never appear (prompt-independent).
  //    NOTE: while a lexicon is unanchored it returns no terms — so this check
  //    cannot yet prove the prohibition holds. Callers must treat a biomarker
  //    whose safety lexicons are unanchored as NOT release-eligible for enabled
  //    interpretation (BLOCKER-008 / BLOCKER-012), which is why ApoB ships
  //    interpretation-disabled today.
  for (const term of lexiconTerms(config.lexicons.prohibited_condition_lexicon)) {
    if (contains(text, term)) {
      return {
        result: 'FAIL',
        token: 'CONDITION_NAME_ANY',
        class: 'SAFETY_CLASS',
        detail: `prohibited condition/gene term present: "${term}"`,
      }
    }
  }
  for (const term of lexiconTerms(config.lexicons.drug_lexicon)) {
    if (contains(text, term)) {
      return {
        result: 'FAIL',
        token: 'DRUG_RECOMMENDATION',
        class: 'SAFETY_CLASS',
        detail: `prohibited drug term present: "${term}"`,
      }
    }
  }

  // 2) Prohibited-absence for meaning tokens with known surface forms.
  for (const token of forbidden_tokens) {
    const surfaces = FORBIDDEN_SURFACE_FORMS[token]
    if (!surfaces) continue
    for (const s of surfaces) {
      if (contains(text, s)) {
        return {
          result: 'FAIL',
          token,
          class: classifyForbiddenToken(token),
          detail: `forbidden phrasing present for ${token}: "${s}"`,
        }
      }
    }
  }

  // 3) Mandatory-presence: every required token must have an expressed surface.
  if (required_surface_forms) {
    for (const [token, surfaces] of Object.entries(required_surface_forms)) {
      const expressed = surfaces.some((s) => contains(text, s))
      if (!expressed) {
        return {
          result: 'FAIL',
          token,
          class: 'QUALITY_CLASS',
          detail: `required meaning ${token} not expressed`,
        }
      }
    }
  }

  return { result: 'PASS' }
}

/**
 * Surface forms whose presence indicates a forbidden meaning, independent of any
 * anchored lexicon. Conservative starter set; extend as the adversarial corpus
 * grows (DR-11.5-A).
 */
const FORBIDDEN_SURFACE_FORMS: Record<string, string[]> = {
  NUMERIC_RISK_ESTIMATE: ['% risk', 'percent risk', 'your risk is', 'risk of ' /* +% */],
  EFFECT_SIZE_CLAIM: ['reduces risk by', 'lowers your risk by', 'increases risk by'],
  CLEAN_BILL_OF_HEALTH: ['clean bill of health', 'nothing to worry about', 'all clear'],
  NO_ACTION_NEEDED: ['no action needed', 'no action required', 'nothing you need to do'],
  POLICY_FRAMED_REFUSAL: ["i'm not allowed to say", 'i am not allowed to say', 'i cannot tell you that'],
}

/**
 * Deterministic safe template for a payload state (Ch.11 DR-11.4-A). Every
 * payload state — especially abstention — has a guaranteed safe rendering the
 * engine can fall back to when the AI draft fails SAFETY_CLASS validation. The
 * AI's failure costs eloquence, never safety.
 */
export function deterministicTemplate(payload: OutputPayload): string {
  const name = payload.analyte

  if (payload.validity === 'VALIDITY_SUSPECT') {
    return (
      `Your ${name} result may have been affected by measurement conditions, so it has ` +
      `not been interpreted. A repeat test under stable conditions is recommended.`
    )
  }

  if (payload.abstained) {
    // Interpretation abstained — but any safety escalation still surfaces.
    const escalation = payload.narrative_required.includes('WARRANTS_MEDICAL_ASSESSMENT_SOON')
      ? ' This result warrants medical assessment soon.'
      : ''
    return (
      `Your ${name} value has been recorded. BioSense can't interpret it yet` +
      (payload.abstention_reason ? ` (${payload.abstention_reason})` : '') +
      `.${escalation} We'll interpret it automatically once the reference data is in place.`
    )
  }

  return (
    `Your ${name} result has been recorded and interpreted. See the detail view for the ` +
    `full breakdown. This is information to discuss with your clinician, not a diagnosis.`
  )
}
