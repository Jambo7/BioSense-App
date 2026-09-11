'use client'

import { useEffect } from 'react'

/**
 * WKWebView treats each tab as a browser history entry, so a left-edge swipe
 * slides the previous screen in. Native apps do not do that for tab switches.
 * This blocks the edge gesture in the current TestFlight shell; the iOS
 * binary also turns the gesture off on the next native build.
 */
export function IosNavLock() {
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      const x = e.touches[0]?.clientX ?? 0
      if (x < 24) e.preventDefault()
    }
    document.addEventListener('touchstart', onTouchStart, { passive: false })
    return () => document.removeEventListener('touchstart', onTouchStart)
  }, [])

  return null
}
