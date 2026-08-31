import { Capacitor, registerPlugin } from '@capacitor/core'

type NativeCap = {
  nativePromise?: (plugin: string, method: string, options?: unknown) => Promise<unknown>
  isNativePlatform?: () => boolean
  getPlatform?: () => string
  PluginHeaders?: Array<{ name: string }>
}

function windowCap(): NativeCap | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as unknown as { Capacitor?: NativeCap }).Capacitor
}

function iosBridgePresent(): boolean {
  if (typeof window === 'undefined') return false
  const handlers = (
    window as unknown as {
      webkit?: { messageHandlers?: { bridge?: unknown } }
    }
  ).webkit?.messageHandlers
  return Boolean(handlers?.bridge)
}

export function isIosDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  if (/iPhone|iPod|iPad/i.test(ua)) return true
  return /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1
}

export function isNativeIos(): boolean {
  if (typeof window === 'undefined') return false
  if (iosBridgePresent()) return true
  try {
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios') return true
  } catch {
    /* ignore */
  }
  const cap = windowCap()
  return Boolean(cap?.isNativePlatform?.() && cap.getPlatform?.() === 'ios')
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

/**
 * Next.js can evaluate registerPlugin before Capacitor has attached PluginHeaders,
 * which makes HealthKit look "unimplemented" even inside TestFlight.
 * Call the injected native bridge at tap-time instead.
 */
async function nativeCall<T>(method: string, options: Record<string, unknown> = {}): Promise<T> {
  const cap = windowCap()
  if (typeof cap?.nativePromise === 'function') {
    return (await cap.nativePromise('BiosenseHealth', method, options)) as T
  }
  if (!iosBridgePresent()) {
    throw new Error(
      'Apple Health needs the BioSense iPhone app with HealthKit. Install the latest TestFlight build and try Connect again.',
    )
  }
  const plugin = registerPlugin<BiosenseHealthPlugin>('BiosenseHealth')
  const fn = plugin[method as keyof BiosenseHealthPlugin] as (
    opts?: Record<string, unknown>,
  ) => Promise<T>
  return fn(options)
}

export const BiosenseHealth: BiosenseHealthPlugin = {
  available: () => nativeCall('available'),
  requestAuthorization: () => nativeCall('requestAuthorization'),
  queryDays: (options) => nativeCall('queryDays', options),
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
