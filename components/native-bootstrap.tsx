'use client'

import { useEffect } from 'react'
import { startAppleHealthForegroundSync } from '@/lib/native/apple-sync'
import { isIosDevice, isNativeIos } from '@/lib/native/healthkit'

export function NativeBootstrap() {
  useEffect(() => {
    if (isIosDevice()) document.documentElement.classList.add('is-ios')
    if (!isNativeIos()) return
    return startAppleHealthForegroundSync()
  }, [])
  return null
}
