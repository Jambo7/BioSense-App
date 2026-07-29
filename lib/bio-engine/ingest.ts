/**
 * BIO-001 — Ingestion (Ch.9.1). Turns a raw source into a CanonicalObservation
 * or a Rejection. Trust is derived from measurement origin, never acquisition
 * channel (PI-1). Units are normalised from the config conversion table; a
 * missing/unknown unit is NEVER guessed — value_canonical stays null and the
 * value displays without interpretation.
 */

import { randomUUID } from 'crypto'
import type {
  AcquisitionChannel,
  CanonicalObservation,
  MeasurementOrigin,
  Rejection,
  ResultStatus,
  SourcedValue,
  TrustTier,
} from './types'
import type { BiomarkerConfig } from './config'
import { getBiomarkerConfig } from './config'

export interface RawResult {
  analyte: string
  value: number | string | null
  unit: string | null
  acquisition_channel: AcquisitionChannel
  measurement_origin: MeasurementOrigin
  result_status?: ResultStatus
  collection_datetime?: string | null
  extraction_confidence?: number | null
  verified?: boolean
  lab_reference_interval?: string | null
  lab_flag?: string | null
  report_id?: string | null
  source_record_id?: string | null
  context?: Record<string, SourcedValue<unknown>>
}

/** Trust tier from origin + verification + extraction confidence (PI-1). */
function deriveTrustTier(raw: RawResult): TrustTier {
  switch (raw.measurement_origin) {
    case 'ACCREDITED_LAB':
      return raw.verified ? 'VERIFIED' : 'MEASURED'
    case 'POINT_OF_CARE_DEVICE':
    case 'CONSUMER_DEVICE':
      return 'MEASURED'
    case 'USER_REPORTED':
      return 'DECLARED'
    case 'UNKNOWN':
    default:
      return 'ABSENT'
  }
}

function normaliseValue(
  raw: RawResult,
  config: BiomarkerConfig,
): { value_canonical: number | null; unit_canonical: string | null } {
  const numeric = typeof raw.value === 'number' ? raw.value : Number(raw.value)
  if (!Number.isFinite(numeric)) return { value_canonical: null, unit_canonical: null }

  // Never guess a missing unit (DR-9). Display, don't interpret.
  if (!raw.unit) return { value_canonical: null, unit_canonical: null }

  const factor = config.ingestion.conversions[raw.unit]
  if (factor == null) return { value_canonical: null, unit_canonical: null }

  return {
    value_canonical: numeric * factor,
    unit_canonical: config.ingestion.unit_canonical,
  }
}

export function ingest(raw: RawResult): CanonicalObservation | Rejection {
  if (raw.result_status === 'CANCELLED') {
    return { rejected: true, stage: 'RESULT_STATUS', reason: 'cancelled result' }
  }

  const config = getBiomarkerConfig(raw.analyte)
  const { value_canonical, unit_canonical } = config
    ? normaliseValue(raw, config)
    : { value_canonical: null, unit_canonical: null }

  return {
    observation_id: randomUUID(),
    report_id: raw.report_id ?? null,
    source_record_id: raw.source_record_id ?? null,
    source_locator: null,
    analyte: raw.analyte,
    acquisition_channel: raw.acquisition_channel,
    measurement_origin: raw.measurement_origin,
    trust_tier: deriveTrustTier(raw),
    result_status: raw.result_status ?? 'FINAL',
    value_canonical,
    unit_canonical,
    value_raw: raw.value,
    unit_raw: raw.unit,
    lab_reference_interval: raw.lab_reference_interval ?? null,
    lab_flag: raw.lab_flag ?? null,
    collection_datetime: raw.collection_datetime ?? null,
    freshness: raw.collection_datetime ? 'FRESH' : 'UNKNOWN_AGE',
    extraction_confidence: raw.extraction_confidence ?? null,
    parser_version: 'bio-engine@1.0.0',
    raw_source_fragment_ref: null,
    supersedes_observation_id: null,
    context: raw.context ?? {},
  }
}
