/**
 * Global Scientific Configuration (GSC) — methodology pins.
 *
 * GSC-000/001/002 define architecture and method *form*. Numeric weights,
 * freshness curves and confidence calibration are owned by GSC-003/004/008/009
 * (not yet delivered). Launch Biological Age is BAG-06: wellness estimate via
 * lib/bio-age.ts. Full GSC-002 composition waits on GSC-003/004/008/009.
 */
import gsc000 from './gsc-000.json'
import gsc001 from './gsc-001.json'
import gsc002 from './gsc-002.json'

export const GSC_LIBRARY = {
  'GSC-000': gsc000,
  'GSC-001': gsc001,
  'GSC-002': gsc002,
} as const

export type GscId = keyof typeof GSC_LIBRARY

/** Method versions currently pinned from ratified GSC docs. */
export const HEALTH_SCORE_METHOD_VERSION = gsc001.version
export const BIOLOGICAL_AGE_METHOD_VERSION = gsc002.version

/** Sibling packs still required before the full GSC composition can replace interim engines. */
export function gscBlockersFor(id: 'GSC-001' | 'GSC-002'): string[] {
  const doc = GSC_LIBRARY[id] as { blocked_until?: string[] }
  return doc.blocked_until ?? []
}

export function gscReadyForFullComposition(): boolean {
  return gscBlockersFor('GSC-001').length === 0 && gscBlockersFor('GSC-002').length === 0
}

export function auditGscLibrary(): {
  present: GscId[]
  pending_for_composition: string[]
  health_score_method_version: string
  biological_age_method_version: string
  interim_engines: { health_score: string; biological_age: string }
} {
  const pending = Array.from(
    new Set([...gscBlockersFor('GSC-001'), ...gscBlockersFor('GSC-002')]),
  )
  return {
    present: Object.keys(GSC_LIBRARY) as GscId[],
    pending_for_composition: pending,
    health_score_method_version: HEALTH_SCORE_METHOD_VERSION,
    biological_age_method_version: BIOLOGICAL_AGE_METHOD_VERSION,
    interim_engines: {
      health_score: 'lib/score.ts (JARVIS-derived interim)',
      biological_age: 'lib/bio-age.ts (JARVIS-derived interim)',
    },
  }
}
