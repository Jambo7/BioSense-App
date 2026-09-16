import type { GlucoseTracking } from '@prisma/client'

/** UK / UAE display. Terra and HealthKit store mg/dL. */
export function mgdlToMmol(mgdl: number): number {
  return Math.round((mgdl / 18.018) * 10) / 10
}

export function formatGlucose(mgdl: number): string {
  return `${mgdlToMmol(mgdl)} mmol/L`
}

export function shouldShowGlucoseSurface(params: {
  glucoseTracking?: GlucoseTracking | null
  connectedProviders: string[]
  hasGlucoseReading: boolean
}): boolean {
  const tracking = params.glucoseTracking
  if (tracking === 'CGM' || tracking === 'OTHER') return true
  if (params.connectedProviders.includes('dexcom')) return true
  return params.hasGlucoseReading
}
