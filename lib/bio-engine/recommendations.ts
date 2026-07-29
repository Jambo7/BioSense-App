/**
 * BIO-001 — Gate 4f: recommendation & escalation engine (Ch.12).
 *
 * Frozen rules honoured here:
 *  - Allowlist only. A class outside `recommendation_allowlist` is dropped, and
 *    a class in `prohibited_recommendation_classes` can never be constructed.
 *  - Priority comes from the config ladder (mapped from frozen triggers), never
 *    invented at runtime.
 *  - URGENT requires an in-view clinical-contact route.
 *  - Consolidation: one recommendation per routing target; highest priority
 *    wins; ALL drivers retained for audit.
 *  - Clinician acknowledgement downgrades exactly one tier and never suppresses;
 *    URGENT floors at HIGH (A-014).
 *  - A PRELIMINARY result is provisional and cannot carry URGENT on its own.
 */

import type {
  Recommendation,
  RecommendationPriority,
  RecommendationRouting,
} from './types'
import type { BiomarkerConfig } from './config'

const PRIORITY_ORDER: RecommendationPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']

function priorityRank(p: RecommendationPriority): number {
  return PRIORITY_ORDER.indexOf(p)
}

/** A trigger emitted by Gate 4 that wants to become a recommendation. */
export interface RecommendationTrigger {
  /** Ladder key, e.g. 'fh_pattern' | 'large_gap' | 'reassurance_failure'. */
  trigger: string
  /** Allowlisted recommendation class. */
  class: string
}

export interface BuildOptions {
  /** PRELIMINARY results cannot carry URGENT alone. */
  provisional?: boolean
  /** A clinician has acknowledged: downgrade one tier, never suppress. */
  clinician_acknowledged?: boolean
}

/**
 * Build recommendations from triggers. Classes outside the allowlist — or in the
 * prohibited set — are silently refused: they are not constructible, so no
 * caller can produce one by mistake.
 */
export function buildRecommendations(
  triggers: RecommendationTrigger[],
  config: BiomarkerConfig,
  opts: BuildOptions = {},
): Recommendation[] {
  const out: Recommendation[] = []

  for (const t of triggers) {
    if (config.prohibited_recommendation_classes.includes(t.class)) continue
    if (!config.recommendation_allowlist.includes(t.class)) continue

    const laddered = config.recommendation_ladder[t.trigger]
    if (!laddered) continue // priority is never invented

    let priority = laddered

    // PRELIMINARY alone cannot be URGENT (Ch.9.1 result-status pathway).
    if (opts.provisional && priority === 'URGENT') priority = 'HIGH'

    // Acknowledgement downgrades one tier; URGENT floors at HIGH; never suppress.
    if (opts.clinician_acknowledged) priority = downgradeOneTier(priority)

    out.push({
      id: `${t.class}:${t.trigger}`,
      class: t.class,
      priority,
      drivers: [t.trigger],
      routing: routeFor(t.class, priority, config),
      provisional: Boolean(opts.provisional),
      contact_route_required: priority === 'URGENT',
    })
  }

  return consolidateRecommendations(out)
}

/**
 * Downgrade one tier. URGENT floors at HIGH — an acknowledged urgent finding
 * never drops below HIGH, and nothing is ever suppressed to nothing (A-014).
 */
export function downgradeOneTier(p: RecommendationPriority): RecommendationPriority {
  if (p === 'URGENT') return 'HIGH'
  const idx = priorityRank(p)
  return idx <= 0 ? 'LOW' : PRIORITY_ORDER[idx - 1]
}

/** Deterministic routing from (class, priority). URGENT always escalates. */
export function routeFor(
  cls: string,
  priority: RecommendationPriority,
  config: BiomarkerConfig,
): RecommendationRouting {
  if (priority === 'URGENT') return 'URGENT_CLINICIAN'
  return config.recommendation_routing[cls] ?? 'CLINICIAN'
}

/**
 * One recommendation per routing target. Highest priority wins; every driver is
 * retained on the survivor so the audit trail explains what fired.
 */
export function consolidateRecommendations(recs: Recommendation[]): Recommendation[] {
  const byTarget = new Map<RecommendationRouting, Recommendation>()

  for (const rec of recs) {
    const existing = byTarget.get(rec.routing)
    if (!existing) {
      byTarget.set(rec.routing, { ...rec, drivers: [...rec.drivers] })
      continue
    }

    const winner =
      priorityRank(rec.priority) > priorityRank(existing.priority) ? rec : existing
    const loser = winner === rec ? existing : rec

    byTarget.set(rec.routing, {
      ...winner,
      // Drivers from both are retained, de-duplicated, for audit.
      drivers: Array.from(new Set([...winner.drivers, ...loser.drivers])),
      provisional: winner.provisional || loser.provisional,
      contact_route_required: winner.priority === 'URGENT',
    })
  }

  // Most urgent first, so an URGENT contact route is never buried.
  return Array.from(byTarget.values()).sort(
    (a, b) => priorityRank(b.priority) - priorityRank(a.priority),
  )
}
