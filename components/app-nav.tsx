'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState, useEffectEvent } from 'react'
import { cn } from '@/lib/utils'
import { BrandWordmark } from '@/components/brand-mark'
import {
  Sun,
  Lightbulb,
  Sparkles,
  TrendingUp,
  FlaskConical,
  Bell,
  Watch,
  GraduationCap,
  User as UserIcon,
} from 'lucide-react'

/** Small inline avatar placeholder. Replace with `<Image src={user.image} />`
 *  once we wire real avatars in via NextAuth session. */
function UserMark() {
  return <UserIcon className="w-4 h-4" strokeWidth={2.25} />
}

/**
 * Bottom (mobile) / top centre (desktop) navigation.
 *
 *  Today      → /dashboard (with /checkin nested under it as a child action)
 *  Insights   → /insights  (the "Why" view — what's driving your score today)
 *  AI         → /chat      (Health AI Assistant — chat + learning mode)
 *  Trends     → /reports   (the "Am I improving?" view — progression over time)
 *  Biomarkers → /blood     (blood-panel biomarker results + history)
 *
 * Account / sign-out live behind the avatar button in the top-right, NOT in
 * the primary tab bar (per the v6 spec).
 *
 * Wearables shortcut remains as the sage pill in the top bar — it's a setup
 * action, not a primary destination.
 */
type NavItem = {
  href: string
  label: string
  icon: typeof Sun
  matchPaths?: string[]
  /** Marks this item as the central floating CTA in the mobile tab bar. */
  center?: boolean
  /** Anchor key for the interactive walkthrough spotlight. */
  tourId?: string
}

// Per v7 spec: page concept renamed Today → Home; bottom-tab order
// flipped so Trends sits last (Biomarkers shifts left of Trends).
const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Home',       icon: Sun,           matchPaths: ['/dashboard', '/checkin'], tourId: 'home' },
  { href: '/insights',  label: 'Insights',   icon: Lightbulb,     tourId: 'insights' },
  { href: '/chat',      label: 'AI',         icon: Sparkles,      center: true, tourId: 'ai' },
  { href: '/blood',     label: 'Biomarkers', icon: FlaskConical,  matchPaths: ['/blood', '/biomarkers'], tourId: 'biomarkers' },
  { href: '/reports',   label: 'Trends',     icon: TrendingUp,    tourId: 'trends' },
]

function isActive(pathname: string, item: (typeof navItems)[number]) {
  const paths = item.matchPaths ?? [item.href]
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export function AppNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [pendingHref, setPendingHref] = useState<string | null>(null)

  const clearPending = useEffectEvent(() => {
    setPendingHref(null)
  })

  // Warm the five primary tabs so the first tap feels instant.
  useEffect(() => {
    for (const item of navItems) {
      router.prefetch(item.href)
    }
  }, [router])

  useEffect(() => {
    clearPending()
  }, [pathname, clearPending])

  const tabActive = (item: NavItem) =>
    pendingHref
      ? pendingHref === item.href || (item.matchPaths?.includes(pendingHref) ?? false)
      : isActive(pathname, item)

  return (
    <>
      {/* ── Top bar ──
          Per v7-polish: header is now fully transparent — logo, Wearables
          pill, bell, and avatar sit naturally over the page texture (no
          defined header rectangle, no border, no blur). A very soft
          top-down scrim drawn from inside `.glass-nav::before` keeps text
          legible when content scrolls under the bar. */}
      <header className="glass-nav sticky top-0 z-40 min-h-[60px] flex items-center justify-between px-4 sm:px-6 gap-3 w-full max-w-full overflow-x-clip box-border">
        {/* Wordmark */}
        <Link href="/dashboard" className="flex items-center group shrink-0">
          <BrandWordmark height={28} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const active = isActive(pathname, item)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                data-tour={item.tourId}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 h-9 rounded-pill text-caption font-medium transition-all relative',
                  active ? 'text-sage-deep' : 'text-ink-2 hover:text-ink',
                )}
              >
                {active && (
                  <span
                    className="absolute inset-0 rounded-pill bg-[linear-gradient(180deg,rgba(168,191,163,0.30)_0%,rgba(111,143,107,0.18)_100%)] ring-1 ring-inset ring-[rgba(168,191,163,0.40)]"
                    aria-hidden
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative" strokeWidth={2} />
                <span className="relative">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <Link
            href="/tutorial"
            className={cn(
              'inline-flex items-center gap-1 h-8 px-2.5 sm:px-3.5 rounded-pill',
              'text-[11px] sm:text-[12px] font-medium text-white',
              'bg-grad-sage shadow-button',
              'transition-all hover:scale-[1.02] active:scale-[0.98]',
            )}
            aria-label="Tutorial"
          >
            <GraduationCap className="w-[14px] h-[14px]" strokeWidth={2} />
            <span>Tutorial</span>
          </Link>

          <Link
            href="/wearables"
            data-tour="wearables"
            className={cn(
              'inline-flex items-center gap-1 h-8 px-2.5 sm:px-3.5 rounded-pill',
              'text-[11px] sm:text-[12px] font-medium text-sage-deep',
              'bg-white/70 backdrop-blur-sm',
              'ring-1 ring-inset ring-[rgba(111,143,107,0.32)]',
              'transition-colors',
              'hover:bg-white/90 hover:ring-[rgba(111,143,107,0.50)]',
              'active:scale-[0.98]',
            )}
            aria-label="Connections"
          >
            <Watch className="w-[14px] h-[14px]" strokeWidth={2} />
            <span>Connections</span>
          </Link>

          <Link
            href="/notifications"
            data-tour="notifications"
            className="relative w-8 h-8 sm:w-9 sm:h-9 inline-flex items-center justify-center rounded-full text-ink-2 hover:text-ink hover:bg-[rgba(26,28,26,0.04)] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.85} />
            <span
              aria-hidden
              className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-sage ring-1 ring-white"
            />
          </Link>

          {/* Profile avatar — replaces the old sign-out button. Sign-out
              now lives inside the Profile / Account page. */}
          <Link
            href="/profile"
            aria-label="Account"
            data-tour="profile"
            className={cn(
              'w-8 h-8 sm:w-9 sm:h-9 inline-flex items-center justify-center rounded-full overflow-hidden',
              'bg-[linear-gradient(180deg,rgba(168,191,163,0.35)_0%,rgba(111,143,107,0.25)_100%)]',
              'ring-1 ring-inset ring-[rgba(168,191,163,0.45)]',
              'text-sage-deep text-[12px] font-semibold',
              'hover:ring-[rgba(168,191,163,0.65)] transition-all',
              isActive(pathname, { href: '/profile', label: '', icon: Sun }) && 'ring-sage-deep',
            )}
          >
            <UserMark />
          </Link>
        </div>
      </header>

      {/* ── Mobile bottom tab bar ──
          Edge-to-edge bar that hugs the bottom of the screen — matches the
          v7 docx reference images (image1 + image2 both show this shape,
          not a floating pill). The bar carries a soft sage halo above its
          top edge so it still reads as "lifted" from the page, and the
          central Ask CTA overhangs above the bar's top edge via the
          `-mt-7` on the button itself. `overflow-visible` on the bar lets
          that CTA extend up cleanly. */}
      <nav
        className="lg:hidden tabbar-pill fixed bottom-0 left-0 right-0 z-40 overflow-visible rounded-none border-x-0"
        style={{ paddingBottom: 'max(34px, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="flex items-end justify-around max-w-3xl mx-auto px-1 pt-2 pb-1">
          {navItems.map((item) => {
            const active = tabActive(item)
            const Icon = item.icon
            const onTabClick = () => setPendingHref(item.href)

            // ── Central floating CTA (Ask) ─────────────────────────────
            if (item.center) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  aria-label={item.label}
                  data-tour={item.tourId}
                  onClick={onTabClick}
                  className="flex-1 flex flex-col items-center justify-end gap-0.5 relative min-h-[52px]"
                >
                  <div className="relative -mt-8 mb-0.5">
                    <span
                      aria-hidden
                      className={cn(
                        'absolute -inset-2.5 rounded-full pointer-events-none',
                        'bg-[radial-gradient(circle,rgba(168,191,163,0.45)_0%,rgba(168,191,163,0.15)_45%,transparent_75%)]',
                        active ? 'opacity-100' : 'opacity-70',
                      )}
                    />
                    <div
                      className={cn(
                        'relative w-[56px] h-[56px] rounded-full flex items-center justify-center',
                        'bg-[linear-gradient(180deg,#8DB389_0%,#6F8F6B_55%,#5A7556_100%)]',
                        'ring-[4px] ring-white',
                        'transition-transform duration-150 active:scale-[0.96]',
                        active && 'scale-[1.03]',
                        pendingHref === item.href && 'opacity-90',
                      )}
                      style={{
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.30), 0 2px 4px rgba(40,56,38,0.18), 0 10px 24px -4px rgba(111,143,107,0.55)',
                      }}
                    >
                      <Image
                        src="/biosense-mark-white.png"
                        alt=""
                        width={30}
                        height={30}
                        priority
                        className="relative block select-none [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.18))]"
                      />
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-[10px] leading-none',
                      active ? 'text-sage-deep font-semibold' : 'text-ink-2 font-medium',
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                data-tour={item.tourId}
                onClick={onTabClick}
                className={cn(
                  'flex-1 flex flex-col items-center justify-center gap-1 py-1.5 transition-colors duration-150 relative min-h-[52px]',
                  pendingHref === item.href && !active && 'opacity-70',
                )}
              >
                <div className="relative w-9 h-9 flex items-center justify-center">
                  {active && (
                    <span
                      className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(168,191,163,0.40)_0%,rgba(111,143,107,0.22)_100%)] ring-1 ring-inset ring-[rgba(168,191,163,0.45)]"
                      aria-hidden
                    />
                  )}
                  <Icon
                    className={cn(
                      'w-[19px] h-[19px] relative transition-transform duration-150',
                      active ? 'text-sage-deep scale-105' : 'text-ink-3',
                    )}
                    strokeWidth={active ? 2.25 : 1.85}
                  />
                </div>
                <span
                  className={cn(
                    'text-[10px] leading-none transition-colors duration-150',
                    active ? 'text-sage-deep font-semibold' : 'text-ink-3',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
