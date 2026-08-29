import { LocalNotifications } from '@capacitor/local-notifications'
import { isNativeIos } from '@/lib/native/healthkit'

const CHECKIN_ID = 1001
const STORAGE_KEY = 'biosense.localReminders'

export function localRemindersEnabled(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(STORAGE_KEY) === 'on'
}

export async function setLocalReminders(enabled: boolean): Promise<void> {
  if (!isNativeIos()) {
    throw new Error('Reminders are available in the BioSense iPhone app')
  }

  if (!enabled) {
    await LocalNotifications.cancel({ notifications: [{ id: CHECKIN_ID }] })
    window.localStorage.setItem(STORAGE_KEY, 'off')
    return
  }

  const perm = await LocalNotifications.requestPermissions()
  if (perm.display !== 'granted') {
    throw new Error('Notifications were not allowed. You can enable them in iPhone Settings → BioSense.')
  }

  await LocalNotifications.cancel({ notifications: [{ id: CHECKIN_ID }] })
  await LocalNotifications.schedule({
    notifications: [
      {
        id: CHECKIN_ID,
        title: 'Daily check-in',
        body: 'A 20-second check-in keeps your BioSense score personal.',
        schedule: { on: { hour: 9, minute: 0 }, repeats: true, allowWhileIdle: true },
      },
    ],
  })
  window.localStorage.setItem(STORAGE_KEY, 'on')
}
