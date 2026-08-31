import { App } from '@capacitor/app'
import { BiosenseHealth, isNativeIos, type HealthKitDay } from '@/lib/native/healthkit'

async function postDays(days: HealthKitDay[]): Promise<{ dayCount: number } | null> {
  const res = await fetch('/api/wearables/apple/healthkit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ days }),
  })
  if (!res.ok) return null
  return res.json() as Promise<{ dayCount: number }>
}

export async function syncAppleHealthKit(days = 14): Promise<{ dayCount: number; error?: string }> {
  try {
    const { available } = await BiosenseHealth.available()
    if (!available) {
      return { dayCount: 0, error: 'Apple Health is not available on this device' }
    }
    await BiosenseHealth.requestAuthorization()
    const { days: rows } = await BiosenseHealth.queryDays({ days })
    const result = await postDays(rows)
    if (!result) return { dayCount: 0, error: 'Could not save Apple Health data' }
    return { dayCount: result.dayCount }
  } catch (err) {
    const raw = err instanceof Error ? err.message : 'Apple Health sync failed'
    const unimplemented = /not implemented|unimplemented/i.test(raw)
    return {
      dayCount: 0,
      error: unimplemented
        ? 'Open BioSense from the TestFlight app (not Safari) and try Connect again'
        : raw,
    }
  }
}

/** Quiet refresh when the app comes back to the foreground. */
export function startAppleHealthForegroundSync(): () => void {
  if (!isNativeIos()) return () => {}

  const run = async () => {
    try {
      const list = await fetch('/api/wearables', { cache: 'no-store' }).then((r) => r.json())
      const connected = Array.isArray(list) && list.some((row: { provider?: string }) => row.provider === 'apple')
      if (!connected) return
      await syncAppleHealthKit(7)
    } catch {
      /* ignore background failures */
    }
  }

  void run()
  const sub = App.addListener('appStateChange', ({ isActive }) => {
    if (isActive) void run()
  })
  return () => {
    void sub.then((h) => h.remove())
  }
}
