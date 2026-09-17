'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { startAppleHealthForegroundSync } from '@/lib/native/apple-sync'
import { isIosDevice, isNativeAndroid, isNativeIos } from '@/lib/native/healthkit'

export function NativeBootstrap() {
  const { update, status } = useSession()

  useEffect(() => {
    if (isIosDevice()) document.documentElement.classList.add('is-ios')
    if (isNativeAndroid()) document.documentElement.classList.add('is-android')
    if (!isNativeIos()) return
    return startAppleHealthForegroundSync()
  }, [])

  // After joining on the website, coming back to the app should pick up ACTIVE.
  useEffect(() => {
    if (status !== 'authenticated') return
    const onVis = () => {
      if (document.visibilityState === 'visible') void update({ refresh: true })
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [status, update])

  return null
}
