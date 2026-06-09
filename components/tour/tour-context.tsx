'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import { TOUR_STEPS, TOUR_TOTAL, type TourStep } from '@/lib/tour'

const STORAGE_KEY = 'biosense.tour'

type TourContextValue = {
  active: boolean
  index: number
  total: number
  step: TourStep | null
  start: () => void
  next: () => void
  back: () => void
  stop: () => void
  finish: () => void
}

const TourContext = createContext<TourContextValue | null>(null)

/**
 * Provides interactive-walkthrough state to the whole app shell.
 *
 * Lives inside the persistent `(app)` layout, so its state survives
 * client-side navigation between pages (e.g. tapping the AI tab mid-tour).
 * It also mirrors `{ active, index }` to sessionStorage so a hard refresh
 * resumes the tour where it left off.
 */
export function TourProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [active, setActive] = useState(false)
  const [index, setIndex] = useState(0)

  // Resume from sessionStorage on first mount (hard reload during a tour).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as { active?: boolean; index?: number }
      if (saved.active) {
        setActive(true)
        setIndex(Math.min(Math.max(saved.index ?? 0, 0), TOUR_TOTAL - 1))
      }
    } catch {
      /* ignore malformed storage */
    }
  }, [])

  // Persist whenever it changes.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ active, index }))
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [active, index])

  const start = useCallback(() => {
    setIndex(0)
    setActive(true)
  }, [])

  const stop = useCallback(() => {
    setActive(false)
    setIndex(0)
  }, [])

  const finish = useCallback(() => {
    setActive(false)
    setIndex(0)
    // Mark complete — non-blocking, mirrors the original tutorial behaviour.
    fetch('/api/user/tutorial', { method: 'POST' }).catch(() => {})
    router.push('/dashboard')
  }, [router])

  const next = useCallback(() => {
    setIndex((i) => {
      if (i >= TOUR_TOTAL - 1) {
        finish()
        return i
      }
      return i + 1
    })
  }, [finish])

  const back = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1))
  }, [])

  const value = useMemo<TourContextValue>(
    () => ({
      active,
      index,
      total: TOUR_TOTAL,
      step: active ? TOUR_STEPS[index] ?? null : null,
      start,
      next,
      back,
      stop,
      finish,
    }),
    [active, index, start, next, back, stop, finish],
  )

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>
}

export function useTour() {
  const ctx = useContext(TourContext)
  if (!ctx) throw new Error('useTour must be used within a TourProvider')
  return ctx
}
