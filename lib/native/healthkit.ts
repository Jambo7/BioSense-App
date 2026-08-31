import { Capacitor } from '@capacitor/core'

type NativeCap = {
  nativePromise?: (plugin: string, method: string, options?: unknown) => Promise<unknown>
  isNativePlatform?: () => boolean
  getPlatform?: () => string
  PluginHeaders?: Array<{ name: string }>
}

type HealthHandler = { postMessage: (body: unknown) => void }

function windowCap(): NativeCap | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as unknown as { Capacitor?: NativeCap }).Capacitor
}

function healthHandler(): HealthHandler | undefined {
  if (typeof window === 'undefined') return undefined
  return (
    window as unknown as {
      webkit?: { messageHandlers?: { biosenseHealth?: HealthHandler } }
    }
  ).webkit?.messageHandlers?.biosenseHealth
}

function iosBridgePresent(): boolean {
  if (typeof window === 'undefined') return false
  const handlers = (
    window as unknown as {
      webkit?: { messageHandlers?: { bridge?: unknown; biosenseHealth?: unknown } }
    }
  ).webkit?.messageHandlers
  return Boolean(handlers?.biosenseHealth || handlers?.bridge)
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

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = window.setTimeout(() => {
      reject(new Error(`${label} timed out. Install TestFlight 1.0 (4), then try Connect again.`))
    }, ms)
    promise.then(
      (v) => {
        window.clearTimeout(t)
        resolve(v)
      },
      (err) => {
        window.clearTimeout(t)
        reject(err)
      },
    )
  })
}

function callScriptHandler<T>(method: string, options: Record<string, unknown>): Promise<T> {
  const handler = healthHandler()
  if (!handler) {
    return Promise.reject(new Error('missing handler'))
  }
  const win = window as unknown as {
    __biosenseHealthCb?: Record<string, { resolve: (v: T) => void; reject: (e: Error) => void }>
  }
  win.__biosenseHealthCb = win.__biosenseHealthCb || {}
  const id = `hk_${Date.now()}_${Math.random().toString(16).slice(2)}`
  return new Promise<T>((resolve, reject) => {
    win.__biosenseHealthCb![id] = { resolve, reject }
    handler.postMessage({ id, method, options })
  })
}

async function nativeCall<T>(method: string, options: Record<string, unknown> = {}): Promise<T> {
  const timeoutMs = method === 'requestAuthorization' ? 90_000 : 12_000

  if (healthHandler()) {
    return withTimeout(callScriptHandler<T>(method, options), timeoutMs, 'Apple Health')
  }

  const cap = windowCap()
  const exported = Boolean(cap?.PluginHeaders?.some((h) => h.name === 'BiosenseHealth'))
  if (exported && typeof cap?.nativePromise === 'function') {
    return withTimeout(
      cap.nativePromise('BiosenseHealth', method, options) as Promise<T>,
      timeoutMs,
      'Apple Health',
    )
  }

  throw new Error(
    'Apple Health is not in this app yet. Install TestFlight 1.0 (4) when Neil has uploaded it, then tap Connect.',
  )
}

export const BiosenseHealth: BiosenseHealthPlugin = {
  available: () => nativeCall('available'),
  requestAuthorization: () => nativeCall('requestAuthorization'),
  queryDays: (options) => nativeCall('queryDays', options),
}

export async function healthKitPluginReady(): Promise<boolean> {
  try {
    const { available } = await BiosenseHealth.available()
    return Boolean(available)
  } catch {
    return false
  }
}
