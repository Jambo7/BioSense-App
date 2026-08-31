import { Capacitor, registerPlugin } from '@capacitor/core'

export function isNativeIos(): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios') return true
  } catch {
    /* ignore */
  }
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string } })
    .Capacitor
  return Boolean(cap?.isNativePlatform?.() && cap.getPlatform?.() === 'ios')
}

/** True when the native HealthKit plugin is actually answering (TestFlight / App Store). */
export async function healthKitPluginReady(): Promise<boolean> {
  try {
    const { available } = await BiosenseHealth.available()
    return Boolean(available)
  } catch {
    return false
  }
}

export interface HealthKitDay {
  date: string
  steps?: number
  rhr?: number
  hrv?: number
  activeMinutes?: number
  sleepHours?: number
}

export interface BiosenseHealthPlugin {
  available(): Promise<{ available: boolean }>
  requestAuthorization(): Promise<{ granted: boolean }>
  queryDays(options: { days?: number }): Promise<{ days: HealthKitDay[] }>
}

export const BiosenseHealth = registerPlugin<BiosenseHealthPlugin>('BiosenseHealth')
