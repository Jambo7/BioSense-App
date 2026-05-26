'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
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
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Today',      icon: Sun,           matchPaths: ['/dashboard', '/checkin'] },
  { href: '/insights',  label: 'Insights',   icon: Lightbulb },
  { href: '/chat',      label: 'AI',         icon: Sparkles,      center: true },
  { href: '/reports',   label: 'Trends',     icon: TrendingUp },
  { href: '/blood',     label: 'Biomarkers', icon: FlaskConical,  matchPaths: ['/blood', '/biomarkers'] },
]

function isActive(pathname: string, item: (typeof navItems)[number]) {
  const paths = item.matchPaths ?? [item.href]
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export function AppNav() {
  const pathname = usePathname()

  return (
    <>
      {/* ── Top bar (glass) ── */}
      <header className="glass-nav sticky top-0 z-40 h-[60px] flex items-center justify-between px-4 sm:px-6 gap-3">
        {/* Wordmark */}
        <Link href="/dashboard" className="flex items-center group shrink-0">
          <BrandWordmark height={22} priority />
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
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Wearables shortcut — refined sage-tinted pill. Visibly green so
              it doesn't get lost, but softer than the heavy solid CTA so
              it still feels secondary to the floating Ask button. */}
          <Link
            href="/wearables"
            className={cn(
              'inline-flex items-center gap-1.5 h-8 px-3 sm:px-3.5 rounded-pill',
              'text-[12px] font-semibold text-white',
              'bg-[linear-gradient(180deg,rgba(141,179,137,0.95)_0%,rgba(111,143,107,0.95)_100%)]',
              'ring-1 ring-inset ring-[rgba(90,117,86,0.30)]',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_1px_2px_rgba(40,56,38,0.10),0_4px_12px_-3px_rgba(111,143,107,0.42)]',
              'transition-all',
              'hover:bg-[linear-gradient(180deg,rgba(151,188,147,1)_0%,rgba(119,151,115,1)_100%)]',
              'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(40,56,38,0.10),0_6px_16px_-3px_rgba(111,143,107,0.52)]',
              'active:scale-[0.98]',
            )}
            aria-label="Wearables"
          >
            <Watch className="w-[14px] h-[14px]" strokeWidth={2.25} />
            <span>Wearables</span>
          </Link>

          <button
            type="button"
            className="relative w-9 h-9 inline-flex items-center justify-center rounded-full text-ink-2 hover:text-ink hover:bg-[rgba(26,28,26,0.04)] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.85} />
            {/* Tiny sage dot for the placeholder notifications badge */}
            <span
              aria-hidden
              className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-sage ring-1 ring-white"
            />
          </button>

          {/* Profile avatar — replaces the old sign-out button. Sign-out
              now lives inside the Profile / Account page. */}
          <Link
            href="/profile"
            aria-label="Account"
            className={cn(
              'w-9 h-9 inline-flex items-center justify-center rounded-full overflow-hidden',
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

      {/* ── Mobile bottom tab bar (glass) ──
          Layout: 2 flat items, the floating Ask CTA, 2 flat items.
          The Ask button lifts out of the bar (negative top margin) and
          carries the brand colour + S mark, mirroring the pattern from
          Stealth's "Ask Claw". `overflow-visible` on the nav lets the
          button extend above the bar's top edge. */}
      <nav
        className="lg:hidden glass-tabbar fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)] overflow-visible"
      >
        <div className="flex items-stretch justify-around max-w-3xl mx-auto px-1 pt-1.5">
          {navItems.map((item) => {
            const active = isActive(pathname, item)
            const Icon = item.icon

            // ── Central floating CTA (Ask) ─────────────────────────────
            // Solid sage-gradient disc with the brand S in white.
            // White "notch" ring punches it cleanly out of the glass tab
            // bar (Stealth pattern). Soft sage halo behind the button
            // breathes — faster when on /chat so the button signals the
            // active destination.
            if (item.center) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  className="flex-1 flex flex-col items-center justify-end gap-1 py-2 relative"
                >
                  <div className="relative -mt-7">
                    {/* Soft sage halo behind the button */}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute -inset-3 rounded-full pointer-events-none',
                        'bg-[radial-gradient(circle,rgba(168,191,163,0.55)_0%,rgba(168,191,163,0.20)_45%,transparent_75%)]',
                        'blur-md',
                        active ? 'animate-mark-halo-fast' : 'animate-mark-halo',
                      )}
                    />
                    {/* The button itself */}
                    <div
                      className={cn(
                        'relative w-[60px] h-[60px] rounded-full flex items-center justify-center',
                        'bg-[linear-gradient(180deg,#8DB389_0%,#6F8F6B_55%,#5A7556_100%)]',
                        'ring-[5px] ring-white',
                        'transition-transform active:scale-[0.96]',
                        active && 'scale-[1.03]',
                      )}
                      style={{
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.30), 0 2px 4px rgba(40,56,38,0.18), 0 10px 24px -4px rgba(111,143,107,0.55)',
                      }}
                    >
                      <Image
                        src="/biosense-mark-white.png"
                        alt=""
                        width={32}
                        height={32}
                        priority
                        className="relative block select-none [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.18))]"
                      />
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-[10px] leading-none mt-1',
                      active ? 'text-sage-deep font-semibold' : 'text-ink-2 font-medium',
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            }

            // ── Regular flat tab item ──────────────────────────────────
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors relative"
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
                      'w-[19px] h-[19px] relative transition-all',
                      active ? 'text-sage-deep scale-105' : 'text-ink-3',
                    )}
                    strokeWidth={active ? 2.25 : 1.85}
                  />
                </div>
                <span
                  className={cn(
                    'text-[10px] leading-none transition-colors',
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
