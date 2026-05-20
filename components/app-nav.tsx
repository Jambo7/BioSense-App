'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { BrandWordmark } from '@/components/brand-mark'
import {
  Sun,
  Lightbulb,
  MessageSquare,
  TrendingUp,
  User,
  LogOut,
  Bell,
  Watch,
} from 'lucide-react'

/**
 * Bottom (mobile) / top centre (desktop) navigation.
 *
 *  Today    → /dashboard (with /checkin nested under it as a child action)
 *  Insights → /blood     (will host expanded biomarker insights)
 *  Ask      → /chat      (the AI conversation experience)
 *  Trends   → /reports   (graphs + reports — historical data view)
 *  You      → /profile   (settings, goals, account, data export)
 *
 * Wearables intentionally lives OUTSIDE the primary nav now — it's reached
 * via the prominent coloured "Connect wearables" button in the top bar.
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
  { href: '/dashboard', label: 'Today',    icon: Sun,            matchPaths: ['/dashboard', '/checkin'] },
  { href: '/blood',     label: 'Insights', icon: Lightbulb },
  { href: '/chat',      label: 'Ask',      icon: MessageSquare, center: true },
  { href: '/reports',   label: 'Trends',   icon: TrendingUp },
  { href: '/profile',   label: 'You',      icon: User },
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
          {/* Connect wearables — primary brand-coloured CTA. Always visible
              so the user can reach it from anywhere; lives outside the
              primary nav since it's a setup action, not a destination.
              Visual treatment lives in `.btn-sage` (globals.css). */}
          <Link
            href="/wearables"
            className={cn(
              'btn-sage',
              'inline-flex items-center gap-1.5 h-9 px-3.5 sm:px-4 rounded-pill',
              'font-semibold text-caption',
            )}
            aria-label="Connect wearables"
          >
            <Watch className="w-[14px] h-[14px]" strokeWidth={2.25} />
            <span className="sm:hidden">Wearables</span>
            <span className="hidden sm:inline">Connect wearables</span>
          </Link>

          <button
            type="button"
            className="w-9 h-9 inline-flex items-center justify-center rounded-full text-ink-2 hover:text-ink hover:bg-[rgba(26,28,26,0.04)] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.85} />
          </button>

          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full text-ink-3 hover:text-rose hover:bg-rose-tint transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="w-[18px] h-[18px]" strokeWidth={1.85} />
          </button>
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
