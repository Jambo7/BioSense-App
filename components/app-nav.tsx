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
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/checkin', label: 'Check-in', icon: ClipboardCheck },
  { href: '/blood', label: 'Blood', icon: Droplets },
  { href: '/wearables', label: 'Wearables', icon: Activity },
  { href: '/chat', label: 'Ask Anything', icon: MessageSquare },
  { href: '/reports', label: 'Reports', icon: FileText },
]

export function AppNav() {
  const pathname = usePathname()

  return (
    <>
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-[54px]"
      style={{
        background: 'rgba(245,241,236,0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(26,26,22,0.07)',
      }}
    >
      {/* Wordmark */}
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <BrandMark size={24} />
        <span className="font-sans text-[15px] font-semibold text-t1 tracking-[-0.01em]">
          BioSense
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-all',
              pathname.startsWith(href)
                ? 'text-accent bg-accent-subtle'
                : 'text-t3 hover:text-t2 hover:bg-s2',
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        <Link
          href="/profile"
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-all',
            pathname === '/profile'
              ? 'text-accent bg-accent-subtle'
              : 'text-t3 hover:text-t2 hover:bg-s2',
          )}
        >
          <User className="w-3.5 h-3.5" />
          <span className="hidden md:block">Profile</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-medium text-t3 hover:text-urg hover:bg-s2 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden md:block">Sign out</span>
        </button>
      </div>
    </header>

    {/* Mobile bottom tab bar */}
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]"
      style={{
        background: 'rgba(245,241,236,0.96)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(26,26,22,0.07)',
      }}
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors',
              active ? 'text-accent' : 'text-t3 active:text-t2',
            )}
          >
            <Icon className="w-[18px] h-[18px]" />
            <span className="leading-none">{label}</span>
          </Link>
        )
      })}
    </nav>
    </>
  )
}
