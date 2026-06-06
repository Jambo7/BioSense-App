'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Upload, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { OPTIMAL_BIOMARKERS, BIOMARKER_CATEGORIES } from '@/lib/biomarkers'

export function BiomarkerGuidanceButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center gap-1.5 h-8 px-3 rounded-pill',
          'text-[12px] font-medium text-sage-deep',
          'tile tile-hover shrink-0 whitespace-nowrap',
        )}
      >
        <BookOpen className="w-3 h-3" strokeWidth={2.25} />
        Biomarker guidance
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-[rgba(26,28,26,0.35)] backdrop-blur-[2px] cursor-default"
          />
          <div className="fixed inset-x-4 top-[72px] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-50 max-h-[calc(100vh-96px)] overflow-y-auto rounded-card bg-white shadow-float ring-1 ring-inset ring-[rgba(184,168,144,0.22)] p-5 fade-up">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <CardLabel className="mb-1">Biomarker guidance</CardLabel>
                <p className="text-caption text-ink-2 leading-snug">
                  BioSense can analyse blood results from any provider.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-full flex items-center justify-center text-ink-3 hover:bg-[rgba(26,28,26,0.04)]"
              >
                <X className="w-4 h-4" strokeWidth={2.25} />
              </button>
            </div>

            <Card padding="md" variant="soft" className="mb-4">
              <p className="text-[12.5px] text-ink-2 leading-relaxed">
                You can visit any medical or wellness clinic for a blood sample. BioSense works
                with results from most recognised laboratories — simply upload your panel and
                we&apos;ll analyse, explain and track your biomarkers over time.
              </p>
            </Card>

            <div className="mb-4">
              <div className="text-eyebrow uppercase text-ink-3 mb-2">Optimal biomarker panel</div>
              <p className="text-caption text-ink-2 mb-2.5 leading-snug">
                For the best visibility, ask your provider for these markers:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {OPTIMAL_BIOMARKERS.map((m) => (
                  <span
                    key={m}
                    className="px-2 py-0.5 rounded-pill text-[10.5px] font-medium text-sage-deep bg-[rgba(168,191,163,0.16)] ring-1 ring-inset ring-[rgba(168,191,163,0.30)]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-eyebrow uppercase text-ink-3 mb-2">Categories we track</div>
              <div className="space-y-1.5">
                {BIOMARKER_CATEGORIES.map((c) => (
                  <div key={c.id} className="text-[12px] text-ink-2">
                    <span className="font-semibold text-ink">{c.label}</span>
                    <span className="text-ink-3"> — {c.markers.slice(0, 4).join(', ')}{c.markers.length > 4 ? '…' : ''}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/blood/upload"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 rounded-card tile-sage tile-hover px-3.5 py-3 group"
            >
              <div className="flex items-center gap-3">
                <IconBadge icon={Upload} tone="sage" variant="gradient" size="sm" />
                <div>
                  <div className="font-sans text-[13px] font-semibold text-ink">Upload blood results</div>
                  <div className="text-[11.5px] text-ink-3">PDF or JPG screenshots</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-sage-deep transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
            </Link>
          </div>
        </>
      )}
    </>
  )
}
