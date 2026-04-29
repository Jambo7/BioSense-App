'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { BrandMark } from '@/components/brand-mark'
import {
  LayoutDashboard,
  ClipboardCheck,
  Droplets,
  Activity,
  MessageSquare,
  FileText,
  User,
  LogOut,
  Bell,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/checkin',   label: 'Check-in',  icon: ClipboardCheck },
  { href: '/blood',     label: 'Blood',     icon: Droplets },
  { href: '/wearables', label: 'Wearables', icon: Activity },
  { href: '/chat',      label: 'Ask',       icon: MessageSquare },
  { href: '/reports',   label: 'Reports',   icon: FileText },
]

export function AppNav() {
  const pathname = usePathname()

  return (
    <>
      <header
        className="sticky top-0 z-40 h-[60px] flex items-center justify-between px-4 sm:px-6 bg-sand/85 backdrop-blur-xl border-b border-line"
      >
        {/* Wordmark */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <BrandMark size={26} tone="sage" />
          <span className="font-sans text-[16px] font-semibold text-ink tracking-[-0.015em]">
            BioSense
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 px-3 h-8 rounded-pill text-caption font-medium transition-all',
                  active
                    ? 'bg-sage-tint text-sage-deep'
                    : 'text-ink-2 hover:text-ink hover:bg-[rgba(26,28,26,0.04)]',
                )}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-9 h-9 inline-flex items-center justify-center rounded-full text-ink-2 hover:text-ink hover:bg-[rgba(26,28,26,0.04)] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>
          <Link
            href="/profile"
            className={cn(
              'w-9 h-9 inline-flex items-center justify-center rounded-full transition-colors',
              pathname === '/profile'
                ? 'bg-sage-tint text-sage-deep'
                : 'text-ink-2 hover:text-ink hover:bg-[rgba(26,28,26,0.04)]',
            )}
            aria-label="Profile"
          >
            <User className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full text-ink-3 hover:text-rose hover:bg-rose-tint transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-line pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex items-stretch justify-around max-w-3xl mx-auto px-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors',
                  active ? 'text-sage-deep' : 'text-ink-3 active:text-ink-2',
                )}
              >
                <div className={cn(
                  'flex items-center justify-center transition-all',
                  active && 'scale-105',
                )}>
                  <Icon className="w-[19px] h-[19px]" strokeWidth={active ? 2.25 : 1.75} />
                </div>
                <span className={cn('text-[10px] leading-none', active && 'font-semibold')}>
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
