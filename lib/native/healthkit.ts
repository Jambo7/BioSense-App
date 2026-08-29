import { Capacitor, registerPlugin } from '@capacitor/core'

export function isNativeIos(): boolean {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios'
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
