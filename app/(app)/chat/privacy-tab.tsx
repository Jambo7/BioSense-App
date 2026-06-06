'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Lock,
  Trash2,
  Shield,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'

/**
 * AI > Privacy — data control surface.
 * Keeps intro, "How I use your data", and delete-all. Per 3rd-June spec.
 */
export function PrivacyTab() {
  const [confirming, setConfirming] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/learning/facts')
        if (res.ok) {
          const data = await res.json()
          setCount(data.facts?.length ?? 0)
        }
      } catch {
        /* non-fatal */
      }
    })()
  }, [])

  async function deleteAll() {
    setDeleting(true)
    try {
      const res = await fetch('/api/learning/facts', { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setDeleted(true)
      setConfirming(false)
      setCount(0)
    } catch {
      toast.error('Could not delete your saved knowledge. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card padding="md" variant="soft">
        <div className="flex items-start gap-3">
          <IconBadge icon={Shield} tone="sage" variant="tint" size="sm" />
          <div className="flex-1 min-w-0">
            <CardLabel className="mb-1">You&apos;re in control of your data</CardLabel>
            <p className="text-caption text-ink-2 leading-snug">
              Everything BioSense learns about you is private. Memory is never
              sold or shared.
              {count !== null && (
                <>
                  {' '}
                  <span className="text-sage-deep font-medium">
                    {count} item{count === 1 ? '' : 's'} saved.
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </Card>

      <Card padding="md" variant="glass">
        <div className="flex items-start gap-3">
          <IconBadge icon={Lock} tone="sage" variant="gradient" size="sm" />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-ink leading-tight">How I use your data</div>
            <p className="text-caption text-ink-2 leading-snug mt-1">
              Personalised insights and recommendations based on your wearables, blood results and check-ins.
              Your data is used only to improve your experience — never sold to third parties.
            </p>
          </div>
        </div>
      </Card>

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
              again from Learning Mode. Your account stays open.
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
                      onClick={deleteAll}
                      disabled={deleting}
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-pill text-[12px] font-semibold text-white bg-[#A85454] shadow-[0_4px_12px_-3px_rgba(168,84,84,0.40)] hover:bg-[#9A4848] transition-colors disabled:opacity-60"
                    >
                      {deleting ? 'Deleting…' : 'Yes, delete everything'}
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
                All saved knowledge has been deleted.
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
