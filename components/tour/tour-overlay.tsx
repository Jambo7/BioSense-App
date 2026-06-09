'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import { ArrowRight, ArrowLeft, X } from 'lucide-react'
import { useTour } from './tour-context'
import { IconBadge } from '@/components/ui/icon-badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Rect = { top: number; left: number; width: number; height: number }

const PAD = 8 // breathing room around the spotlit element

/** First visible element carrying the given data-tour key. */
function findTarget(key: string): HTMLElement | null {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>(`[data-tour="${key}"]`),
  )
  return (
    nodes.find((el) => {
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    }) ?? null
  )
}

function rectsDiffer(a: Rect | null, b: Rect | null) {
  if (a === b) return false
  if (!a || !b) return true
  return (
    Math.abs(a.top - b.top) > 0.5 ||
    Math.abs(a.left - b.left) > 0.5 ||
    Math.abs(a.width - b.width) > 0.5 ||
    Math.abs(a.height - b.height) > 0.5
  )
}

export function TourOverlay() {
  const { active, step, index, total, next, back, finish, stop } = useTour()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [rect, setRect] = useState<Rect | null>(null)
  const [viewport, setViewport] = useState({ w: 0, h: 0 })
  const rectRef = useRef<Rect | null>(null)

  useEffect(() => setMounted(true), [])

  // Track the target's on-screen box every frame while the tour is active.
  // A rAF loop (rather than one-shot measurement) keeps the spotlight glued
  // to the element through scrolling, layout shifts and route changes.
  useEffect(() => {
    if (!active || !step) return

    let raf = 0
    const tick = () => {
      const el = step.target ? findTarget(step.target) : null
      const nextRect: Rect | null = el
        ? (() => {
            const r = el.getBoundingClientRect()
            return { top: r.top, left: r.left, width: r.width, height: r.height }
          })()
        : null

      if (rectsDiffer(rectRef.current, nextRect)) {
        rectRef.current = nextRect
        setRect(nextRect)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, step])

  // Bring the target into view when the step changes.
  useEffect(() => {
    if (!active || !step?.target) return
    const el = findTarget(step.target)
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [active, step, pathname])

  // Keep viewport size current for tooltip placement.
  useEffect(() => {
    if (!active) return
    const sync = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [active])

  // Advance when the user actually taps the highlighted control.
  // Capture phase so we register the intent before any navigation fires;
  // we don't preventDefault, so real links still navigate.
  useEffect(() => {
    if (!active || !step?.target) return
    const handler = (e: MouseEvent) => {
      const el = step.target ? findTarget(step.target) : null
      if (el && e.target instanceof Node && el.contains(e.target)) next()
    }
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [active, step, next])

  // Esc to exit.
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') stop()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, stop, next, back])

  if (!mounted || !active || !step) return null

  const Icon = step.icon
  const isCentered = !step.target || !rect
  const isLast = index === total - 1

  // Spotlight geometry (with padding), clamped to viewport.
  const spot = rect
    ? {
        top: Math.max(rect.top - PAD, 0),
        left: Math.max(rect.left - PAD, 0),
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
      }
    : null

  // Decide whether the tooltip sits above or below the spotlight.
  const placeBelow = (() => {
    if (!rect) return true
    if (step.placement === 'bottom') return true
    if (step.placement === 'top') return false
    return rect.top < viewport.h / 2
  })()

  const tooltip = (
    <div
      className={cn(
        'tour-card pointer-events-auto w-[min(360px,calc(100vw-32px))]',
        'rounded-[20px] bg-white shadow-[0_18px_50px_-12px_rgba(40,56,38,0.45)]',
        'ring-1 ring-[rgba(168,191,163,0.40)] p-5 fade-up',
      )}
    >
      <div className="flex items-start gap-3.5">
        <IconBadge icon={Icon} tone="sage" variant="gradient" size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-eyebrow uppercase text-sage-deep">
              {index === 0
                ? 'Walkthrough'
                : isLast
                  ? 'All set'
                  : `Step ${index} of ${total - 2}`}
            </span>
            <button
              onClick={stop}
              aria-label="Exit walkthrough"
              className="w-7 h-7 -mr-1 -mt-1 rounded-full flex items-center justify-center text-ink-3 hover:bg-[rgba(26,28,26,0.05)] transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={2.25} />
            </button>
          </div>
          <h2 className="font-sans text-[18px] leading-tight text-ink tracking-tight mt-1">
            {step.title}
          </h2>
        </div>
      </div>

      <p className="text-body-sm text-ink-2 leading-relaxed mt-3">{step.body}</p>
      {step.hint && (
        <p className="text-caption text-sage-deep font-medium mt-2">{step.hint}</p>
      )}

      <div className="flex items-center justify-between gap-3 mt-5">
        {index > 0 ? (
          <Button variant="ghost" size="sm" onClick={back}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Button>
        ) : (
          <button
            onClick={stop}
            className="text-caption text-ink-3 hover:text-ink-2 transition-colors px-1"
          >
            Skip tour
          </button>
        )}

        <Button variant="primary" size="sm" onClick={isLast ? finish : next}>
          {isLast ? 'Go to dashboard' : index === 0 ? 'Start' : 'Next'}
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* progress dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              'h-1 rounded-pill transition-all',
              i === index ? 'w-5 bg-sage' : 'w-1.5 bg-sand-deep',
            )}
          />
        ))}
      </div>
    </div>
  )

  return createPortal(
    <div className="fixed inset-0 z-[60]" aria-live="polite" role="dialog">
      {isCentered ? (
        // Intro / finale — full dim + centred card.
        <>
          <div className="absolute inset-0 bg-[rgba(20,26,18,0.55)] backdrop-blur-[2px] pointer-events-auto" />
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-auto">{tooltip}</div>
          </div>
        </>
      ) : (
        spot && (
          <>
            {/* Dimmer with a rounded cut-out via a giant outer box-shadow. */}
            <div
              className="absolute rounded-[16px] pointer-events-none transition-all duration-300 ease-out"
              style={{
                top: spot.top,
                left: spot.left,
                width: spot.width,
                height: spot.height,
                boxShadow:
                  '0 0 0 9999px rgba(20,26,18,0.58), 0 0 0 2px rgba(255,255,255,0.9), 0 0 0 5px rgba(168,191,163,0.55)',
              }}
            />
            {/* Pulsing ring affordance ("you can press this"). */}
            <div
              className="absolute rounded-[16px] pointer-events-none tour-pulse ring-2 ring-sage"
              style={{
                top: spot.top,
                left: spot.left,
                width: spot.width,
                height: spot.height,
              }}
            />

            {/* Click-blockers around the spotlight so only the real control
                (in the clear gap) stays tappable. */}
            <ClickBlockers spot={spot} viewport={viewport} />

            {/* Tooltip, anchored above or below the spotlight. */}
            <div
              className="absolute pointer-events-none transition-all duration-300 ease-out"
              style={tooltipStyle(spot, placeBelow, viewport)}
            >
              <div className="pointer-events-auto">{tooltip}</div>
            </div>
          </>
        )
      )}
    </div>,
    document.body,
  )
}

/** Four transparent panels that absorb taps everywhere except the spotlight. */
function ClickBlockers({ spot, viewport }: { spot: Rect; viewport: { w: number; h: number } }) {
  const block = 'absolute bg-transparent pointer-events-auto'
  const w = viewport.w || (typeof window !== 'undefined' ? window.innerWidth : 0)
  const h = viewport.h || (typeof window !== 'undefined' ? window.innerHeight : 0)
  const stop = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  return (
    <>
      <div className={block} style={{ top: 0, left: 0, width: w, height: spot.top }} onClick={stop} />
      <div
        className={block}
        style={{ top: spot.top + spot.height, left: 0, width: w, height: Math.max(h - (spot.top + spot.height), 0) }}
        onClick={stop}
      />
      <div className={block} style={{ top: spot.top, left: 0, width: spot.left, height: spot.height }} onClick={stop} />
      <div
        className={block}
        style={{ top: spot.top, left: spot.left + spot.width, width: Math.max(w - (spot.left + spot.width), 0), height: spot.height }}
        onClick={stop}
      />
    </>
  )
}

/** Position the tooltip above/below the spotlight, clamped to the viewport. */
function tooltipStyle(
  spot: Rect,
  placeBelow: boolean,
  viewport: { w: number; h: number },
): React.CSSProperties {
  const w = viewport.w || (typeof window !== 'undefined' ? window.innerWidth : 360)
  const cardW = Math.min(360, w - 32)
  let left = spot.left + spot.width / 2 - cardW / 2
  left = Math.max(16, Math.min(left, w - cardW - 16))
  const gap = 14
  if (placeBelow) {
    return { top: spot.top + spot.height + gap, left, width: cardW }
  }
  return { top: undefined, bottom: viewport.h - spot.top + gap, left, width: cardW }
}
