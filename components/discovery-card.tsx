'use client'

import { useRef } from 'react'
import { Brain, Share2 } from 'lucide-react'
import { IntelligenceMark } from '@/components/brand-mark'
import { cn } from '@/lib/utils'

interface DiscoveryCardProps {
  headline: string
  accent: string
  detail: string
  className?: string
}

/** Shareable "BioSense Discovered" viral snapshot card (3rd-June spec). */
export function DiscoveryCard({ headline, accent, detail, className }: DiscoveryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  async function handleShare() {
    const text = `${headline} ${accent} — ${detail} #MyBioSense`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'BioSense Discovered', text })
        return
      } catch {
        /* fall through */
      }
    }
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-card p-6 sm:p-8 bg-[linear-gradient(180deg,#FAFAF8_0%,#F0F4EE_100%)] ring-1 ring-inset ring-[rgba(168,191,163,0.35)] shadow-float"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(168,191,163,0.25)_0%,transparent_70%)]" aria-hidden />
        <div className="relative text-center">
          <IntelligenceMark size="md" className="mx-auto mb-4" />
          <div className="flex items-center justify-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-3">
            <Brain className="w-3.5 h-3.5" strokeWidth={2.25} />
            BioSense Discovered
          </div>
          <p className="font-serif text-[22px] sm:text-[26px] text-ink leading-[1.15] tracking-tight">
            {headline}{' '}
            <span className="italic-accent text-sage-deep">{accent}</span>
          </p>
          <p className="text-caption text-ink-2 mt-3 max-w-[36ch] mx-auto leading-snug">
            {detail}
          </p>
          <div className="mt-6 pt-4 border-t border-line flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sage-deep flex items-center justify-center text-white text-[11px] font-bold">
                B
              </div>
              <span className="text-[11px] text-ink-2">Small consistent actions create powerful change.</span>
            </div>
            <span className="text-[11px] font-semibold text-sage-deep">#MyBioSense</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-2 h-10 rounded-pill text-[13px] font-semibold text-white bg-grad-sage shadow-button hover:scale-[1.01] active:scale-[0.99] transition-all"
      >
        <Share2 className="w-4 h-4" strokeWidth={2.25} />
        Share discovery
      </button>
    </div>
  )
}
