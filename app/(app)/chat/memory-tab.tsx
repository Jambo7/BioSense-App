'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Lock,
  Trash2,
  ChevronRight,
  Shield,
  Cookie,
  Database,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'

/**
 * AI > Memory & Privacy.
 *
 * Mirrors the bottom band of image4:
 *   · How I use your data       → link card
 *   · Review or delete what I know → link card
 *   · Delete all saved knowledge   → destructive action with confirmation
 *
 * Acts as the "control surface" the v6 brief asks for under Learning Mode:
 * the user can always find, edit and delete what's been saved.
 */
export function MemoryTab() {
  const [confirming, setConfirming] = useState(false)
  const [deleted, setDeleted] = useState(false)

  return (
    <div className="space-y-4">
      <Card padding="md" variant="soft">
        <div className="flex items-start gap-3">
          <IconBadge icon={Shield} tone="sage" variant="tint" size="sm" />
          <div className="flex-1 min-w-0">
            <CardLabel className="mb-1">You&apos;re in control of your data</CardLabel>
            <p className="text-caption text-ink-2 leading-snug">
              Everything BioSense learns about you is private. You can review, edit
              or delete any piece of saved knowledge at any time. Memory is never
              sold or shared.
            </p>
          </div>
        </div>
      </Card>

      <Card padding="none" className="divide-y divide-line shadow-[0_1px_2px_rgba(26,28,26,0.04),0_8px_24px_-12px_rgba(111,143,107,0.20)]">
        <ItemRow
          icon={Lock}
          title="How I use your data"
          body="Personalised insights and recommendations based on your wearables, blood results and check-ins."
        />
        <ItemRow
          icon={Database}
          title="Review or delete what I know"
          body="View, edit or delete anything I've learned about you."
        />
        <ItemRow
          icon={Cookie}
          title="Conversation history"
          body="Saved chats stay on your device. Turn off saving in Settings."
        />
      </Card>

      {/* Destructive action */}
      <Card padding="md" className="shadow-[0_1px_2px_rgba(26,28,26,0.04),0_8px_24px_-12px_rgba(168,84,84,0.20)]">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[linear-gradient(180deg,rgba(233,201,201,0.45)_0%,rgba(201,122,122,0.22)_100%)] ring-1 ring-inset ring-[rgba(168,84,84,0.30)] shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_2px_6px_-2px_rgba(168,84,84,0.30)] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-[#A85454]" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-ink leading-tight">
              Delete all saved knowledge
            </div>
            <p className="text-caption text-ink-3 leading-snug mt-0.5">
              Removes everything I&apos;ve learned about you. You can always start
              again from the Learning Mode tab. Your account stays open.
            </p>

            {!deleted ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {!confirming ? (
                  <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-pill text-[12px] font-medium text-[#A85454] bg-[rgba(168,84,84,0.08)] ring-1 ring-[rgba(168,84,84,0.20)] hover:bg-[rgba(168,84,84,0.14)] transition-colors"
                  >
                    <Trash2 className="w-3 h-3" strokeWidth={2.25} />
                    Delete all
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleted(true)
                        setConfirming(false)
                      }}
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-pill text-[12px] font-semibold text-white bg-[#A85454] shadow-[0_4px_12px_-3px_rgba(168,84,84,0.40)] hover:bg-[#9A4848] transition-colors"
                    >
                      Yes, delete everything
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirming(false)}
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-pill text-[12px] font-medium text-ink-2 bg-white ring-1 ring-line"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p className="text-caption text-sage-deep font-medium mt-3">
                ✓ All saved knowledge has been deleted.
              </p>
            )}
          </div>
        </div>
      </Card>

      <p className="text-caption text-ink-3 text-center">
        For full account deletion, go to{' '}
        <Link href="/profile" className="text-sage-deep font-medium hover:underline">
          Account
        </Link>
        .
      </p>
    </div>
  )
}

function ItemRow({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Lock
  title: string
  body: string
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-[rgba(168,191,163,0.06)] transition-colors group"
    >
      <IconBadge icon={Icon} tone="sage" variant="gradient" size="sm" />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-ink leading-tight">{title}</div>
        <p className="text-[11.5px] text-ink-3 leading-snug mt-0.5">{body}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 group-hover:text-sage-deep group-hover:translate-x-0.5 transition-all" strokeWidth={2} />
    </button>
  )
}
