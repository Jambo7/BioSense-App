/**
 * Engineering plausibility checks on AI-extracted blood markers.
 * Rejects empty / non-numeric / absurd values before they become "truth".
 * Clinical reference ranges remain Aspect 2 (not enforced here).
 */

export interface RawBloodMarker {
  name?: unknown
  value?: unknown
  unit?: unknown
  refLow?: unknown
  refHigh?: unknown
  refMin?: unknown
  refMax?: unknown
  tier?: unknown
  [key: string]: unknown
}

export interface SanitizedBloodMarker {
  name: string
  value: number
  unit?: string
  refLow?: number
  refHigh?: number
  refMin?: number
  refMax?: number
  tier?: string
  category?: string
  [key: string]: unknown
}

const KNOWN_TIER = /^(t1|t2|t3|1|2|3|normal|optimal|borderline|moderate|high|low|abnormal)$/i

/** T1 inside the lab range, T2 up to 20% outside it, T3 beyond that. */
function tierFromRange(value: number, refMin: number | null, refMax: number | null): string | null {
  if (refMin == null || refMax == null || refMax <= refMin) return null
  if (value >= refMin && value <= refMax) return 'T1'
  const span = refMax - refMin
  const outside = value < refMin ? refMin - value : value - refMax
  return outside / span > 0.2 ? 'T3' : 'T2'
}

function asFiniteNumber(v: unknown): number | null {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string') {
    const n = Number(String(v).replace(/,/g, '').trim())
    if (Number.isFinite(n)) return n
  }
  return null
}

/** Absolute engineering bounds — not clinical optima. */
const ABSURD_ABS = 1_000_000

export function sanitizeBloodMarkers(markers: unknown[]): {
  markers: SanitizedBloodMarker[]
  rejected: number
} {
  const out: SanitizedBloodMarker[] = []
  let rejected = 0

  for (const raw of markers) {
    if (!raw || typeof raw !== 'object') {
      rejected++
      continue
    }
    const m = raw as RawBloodMarker
    const name = typeof m.name === 'string' ? m.name.trim() : ''
    const value = asFiniteNumber(m.value)
    if (!name || name.length < 2 || value == null) {
      rejected++
      continue
    }
    if (value < -ABSURD_ABS || value > ABSURD_ABS) {
      rejected++
      continue
    }

    const cleaned: SanitizedBloodMarker = { name, value }
    const unit = typeof m.unit === 'string' ? m.unit.trim() : ''
    if (unit) cleaned.unit = unit
    const refMin = asFiniteNumber(m.refMin ?? m.refLow)
    const refMax = asFiniteNumber(m.refMax ?? m.refHigh)
    if (refMin != null) {
      cleaned.refMin = refMin
      cleaned.refLow = refMin
    }
    if (refMax != null) {
      cleaned.refMax = refMax
      cleaned.refHigh = refMax
    }
    const givenTier = typeof m.tier === 'string' ? m.tier.trim() : ''
    const tier = KNOWN_TIER.test(givenTier) ? givenTier : tierFromRange(value, refMin, refMax)
    if (tier) cleaned.tier = tier
    if (typeof m.category === 'string') cleaned.category = m.category

    // Copy through any extra display fields that are plain strings/numbers.
    for (const [k, v] of Object.entries(m)) {
      if (k in cleaned) continue
      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        cleaned[k] = v
      }
    }

    out.push(cleaned)
  }

  return { markers: out, rejected }
}

export function recountTiers(markers: SanitizedBloodMarker[]): {
  t1Count: number
  t2Count: number
  t3Count: number
} {
  let t1Count = 0
  let t2Count = 0
  let t3Count = 0
  for (const m of markers) {
    const t = String(m.tier ?? '').toLowerCase()
    if (t === 't1' || t === '1' || t === 'normal' || t === 'optimal') t1Count++
    else if (t === 't2' || t === '2' || t === 'borderline' || t === 'moderate') t2Count++
    else if (t === 't3' || t === '3' || t === 'high' || t === 'low' || t === 'abnormal') t3Count++
  }
  return { t1Count, t2Count, t3Count }
}

/** Compact list for prompts. Names, values and tiers only. */
export function formatMarkerList(markers: unknown, limit = 40): string {
  if (!Array.isArray(markers)) return ''
  return markers
    .slice(0, limit)
    .map((raw) => {
      if (!raw || typeof raw !== 'object') return ''
      const m = raw as { name?: unknown; value?: unknown; unit?: unknown; tier?: unknown }
      const name = typeof m.name === 'string' ? m.name.trim() : ''
      if (!name) return ''
      const value = asFiniteNumber(m.value)
      const unit = typeof m.unit === 'string' ? m.unit.trim() : ''
      const tier = typeof m.tier === 'string' ? m.tier.trim() : ''
      return `${name} ${value ?? ''}${unit ? ` ${unit}` : ''}${tier ? ` (${tier})` : ''}`.trim()
    })
    .filter(Boolean)
    .join('; ')
}
