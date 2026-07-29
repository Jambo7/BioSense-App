/**
 * BIO-001 — Canonical Scientific Library (CSL) binding & constant resolution.
 *
 * PI-5: "No engine constant is populated except from an anchored,
 * provenance-bearing CSL claim. Unanchored → dependent feature ships DISABLED,
 * never guessed or defaulted."
 *
 * This module is the single gate through which every scientific value enters the
 * engine. It reads claims (data, not code) from ./csl-data and exposes a
 * resolver that returns either an ANCHORED value or a DISABLED result — the
 * engine never sees a raw constant that has not passed anchoring.
 *
 * Populating the library is BioSense's (founder) responsibility. Every claim
 * carries the constitutional audit fields: version, effective_date, author,
 * provenance, review_status. Set `review_status` to ANCHORED (or VERSIONED) and
 * supply a value to switch a feature on — no code change required.
 */

import type { ConstantState } from './types'

/**
 * A single Canonical Scientific Library claim. Founder-owned data.
 *
 * `value` may be a number, a string, or a structured object (e.g. a
 * stratum-keyed threshold set). It is `null` while DECLARED-but-unanchored.
 */
export interface CSLClaim {
  claim_id: string
  /** Human description of what this claim asserts (for the review UI/audit). */
  assertion: string
  value: number | string | Record<string, unknown> | null
  unit: string | null

  // Constitutional audit fields (required for ANCHORED/VERSIONED).
  version: string
  effective_date: string | null
  author: string | null
  provenance: string | null
  evidence_grade: string | null
  review_status: ConstantState
}

/** A resolved constant: either usable, or explicitly disabled (never guessed). */
export type ResolvedConstant =
  | {
      status: 'ANCHORED'
      claim_id: string
      value: number | string | Record<string, unknown>
      unit: string | null
      version: string
    }
  | {
      status: 'DISABLED'
      claim_id: string
      /** Why the dependent feature is off (unanchored / missing / null value). */
      reason: string
    }

// ── Library loading ─────────────────────────────────────────────────────────
// Claims live as JSON data files. Import statically so the bundler includes them
// and so resolution is synchronous and deterministic.
import apobClaims from './csl-data/apob.json'

const LIBRARY: Map<string, CSLClaim> = new Map()
/** claim_id → which source supplied it (audit). */
const CLAIM_SOURCE: Map<string, string> = new Map()
/** Claims whose ANCHORED status was refused for missing audit fields. */
const REFUSALS: { claim_id: string; source: string; reason: string }[] = []

/**
 * Registering a claim source is how a biomarker's science enters the engine
 * (ApoB now; Ferritin, Vitamin D and the rest later).
 *
 * Registration ENFORCES the constitutional audit fields rather than trusting
 * them: a claim that says ANCHORED but carries no author, provenance or
 * effective date is demoted to DECLARED and recorded as a refusal. That keeps
 * PI-5 honest — "anchored" cannot mean "someone typed a number in".
 */
export function registerClaimSource(source: string, claims: CSLClaim[]): void {
  for (const claim of claims) {
    const missing = missingAuditFields(claim)
    if (missing.length > 0) {
      REFUSALS.push({
        claim_id: claim.claim_id,
        source,
        reason: `marked ${claim.review_status} but missing: ${missing.join(', ')}`,
      })
      LIBRARY.set(claim.claim_id, { ...claim, review_status: 'DECLARED' })
    } else {
      LIBRARY.set(claim.claim_id, claim)
    }
    CLAIM_SOURCE.set(claim.claim_id, source)
  }
}

/** Which audit fields an ANCHORED/VERSIONED claim is missing. */
function missingAuditFields(claim: CSLClaim): string[] {
  if (claim.review_status === 'DECLARED') return []
  const missing: string[] = []
  if (!claim.author) missing.push('author')
  if (!claim.provenance) missing.push('provenance')
  if (!claim.effective_date) missing.push('effective_date')
  if (!claim.version || claim.version === '0.0.0') missing.push('version')
  return missing
}

registerClaimSource('csl-data/apob.json', apobClaims as CSLClaim[])

/**
 * Resolve a CSL claim to a usable constant, or DISABLED.
 *
 * A claim is usable only when review_status ∈ {ANCHORED, VERSIONED} AND it has a
 * non-null value. Anything else disables the dependent feature (PI-5).
 */
export function resolveConstant(claimId: string): ResolvedConstant {
  const claim = LIBRARY.get(claimId)
  if (!claim) {
    return { status: 'DISABLED', claim_id: claimId, reason: 'claim not present in CSL' }
  }
  if (claim.review_status === 'DECLARED') {
    return {
      status: 'DISABLED',
      claim_id: claimId,
      reason: 'claim DECLARED but not yet anchored (awaiting founder anchoring pass)',
    }
  }
  if (claim.value === null || claim.value === undefined) {
    return {
      status: 'DISABLED',
      claim_id: claimId,
      reason: `claim marked ${claim.review_status} but carries no value`,
    }
  }
  return {
    status: 'ANCHORED',
    claim_id: claimId,
    value: claim.value,
    unit: claim.unit,
    version: claim.version,
  }
}

/** True when a claim is anchored and usable. Convenience for gate checks. */
export function isAnchored(claimId: string): boolean {
  return resolveConstant(claimId).status === 'ANCHORED'
}

/** Raw claim access, for audit/versioning surfaces only. */
export function getClaim(claimId: string): CSLClaim | undefined {
  return LIBRARY.get(claimId)
}

/**
 * Library audit for the release gate (Ch.13 §F): "every constant ANCHORED, or
 * its feature provably DISABLED". Lists every claim's state, its source, and any
 * refused anchoring attempt.
 */
export function auditLibrary(): {
  anchored: string[]
  declared: string[]
  refusals: { claim_id: string; source: string; reason: string }[]
} {
  const anchored: string[] = []
  const declared: string[] = []
  for (const [id] of LIBRARY) {
    if (resolveConstant(id).status === 'ANCHORED') anchored.push(id)
    else declared.push(id)
  }
  return { anchored, declared, refusals: [...REFUSALS] }
}

/** Which source supplied a claim (audit trail). */
export function claimSource(claimId: string): string | undefined {
  return CLAIM_SOURCE.get(claimId)
}

/** Snapshot of every claim's version — recorded on each OutputPayload (Ch.13). */
export function evidenceVersions(claimIds: string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const id of claimIds) {
    const claim = LIBRARY.get(id)
    if (claim) out[id] = claim.version
  }
  return out
}
