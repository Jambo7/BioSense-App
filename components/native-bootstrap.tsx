'use client'

import { useEffect } from 'react'
import { startAppleHealthForegroundSync } from '@/lib/native/apple-sync'
import { isNativeIos } from '@/lib/native/healthkit'

export function NativeBootstrap() {
  useEffect(() => {
    if (!isNativeIos()) return
    return startAppleHealthForegroundSync()
  }, [])
  return null
}
