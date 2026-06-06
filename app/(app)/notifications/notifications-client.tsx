'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, ChevronRight } from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { cn } from '@/lib/utils'

type Notif = {
  id: string
  trigger: string
  message: string
  url: string | null
  readAt: string | null
  sentAt: string
}

export function NotificationsClient({ initial }: { initial: Notif[] }) {
  const [items, setItems] = useState(initial)

  async function markRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, readAt: new Date().toISOString() } : n)),
    )
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="max-w-2xl mx-auto fade-up space-y-5">
      <header className="pt-2">
        <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-2">
          <Bell className="w-3.5 h-3.5" strokeWidth={2.25} />
          <span>Notifications</span>
        </div>
        <h1 className="font-sans text-h1 text-ink tracking-tight">
          Your <span className="italic-accent">updates.</span>
        </h1>
        <p className="text-body-sm text-ink-2 mt-2">
          Push notifications from BioSense appear here. Tap to jump to the relevant section.
        </p>
      </header>

      {items.length === 0 ? (
        <Card padding="lg" variant="soft" className="text-center">
          <IconBadge icon={Bell} tone="sage" variant="gradient" size="lg" className="mx-auto mb-3" />
          <div className="text-body-sm font-semibold text-ink">No notifications yet</div>
          <p className="text-caption text-ink-2 mt-1">
            When BioSense has something important for you, it will show up here.
          </p>
        </Card>
      ) : (
        <Card padding="none" className="divide-y divide-line">
          {items.map((n) => {
            const href = n.url ?? '/dashboard'
            const unread = !n.readAt
            const inner = (
              <>
                <div className="flex-1 min-w-0">
                  <CardLabel className="mb-0.5">{n.trigger}</CardLabel>
                  <p className="text-[12.5px] text-ink-2 leading-snug">{n.message}</p>
                  <p className="text-[10.5px] text-ink-3 mt-1">
                    {new Date(n.sentAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {unread && (
                  <span className="w-2 h-2 rounded-full bg-sage shrink-0 mt-1" aria-hidden />
                )}
                <ChevronRight className="w-4 h-4 text-ink-3 shrink-0" strokeWidth={2.25} />
              </>
            )
            const cls = cn(
              'flex items-start gap-3 p-4 transition-colors',
              unread && 'bg-[rgba(168,191,163,0.06)]',
            )
            return (
              <Link
                key={n.id}
                href={href}
                onClick={() => markRead(n.id)}
                className={cls}
              >
                {inner}
              </Link>
            )
          })}
        </Card>
      )}
    </div>
  )
}
