'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LearningTab } from './learning-tab'
import { MemoryTab } from './memory-tab'
import { PrivacyTab } from './privacy-tab'

/**
 * /chat — the AI section.
 *
 * 3rd-June spec: Learning Mode | Memory | Privacy.
 * Defaults to Learning Mode. Header matches Insights/Blood/Trends pattern.
 */
type Tab = 'learning' | 'memory' | 'privacy'

const TABS: { id: Tab; label: string }[] = [
  { id: 'learning', label: 'Learning Mode' },
  { id: 'memory',   label: 'Memory'        },
  { id: 'privacy',  label: 'Privacy'       },
]

export default function AIPage() {
  const [tab, setTab] = useState<Tab>('learning')

  return (
    <div className="max-w-3xl mx-auto fade-up space-y-5">
      <header className="relative pt-2 pb-1">
        <div>
          <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-2">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2.25} />
            <span>AI</span>
          </div>
          <h1 className="font-sans text-[28px] sm:text-[34px] text-ink tracking-tight leading-[1.04] max-w-[18ch] font-bold">
            Your personal
            <br />
            <span className="italic-accent text-[1.02em] text-sage-deep font-normal">
              health assistant.
            </span>
          </h1>
        </div>
      </header>

      <div className="relative -mx-1 px-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {TABS.map((t) => {
            const active = t.id === tab
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  'shrink-0 h-9 px-3.5 rounded-pill text-[12.5px] font-medium transition-all',
                  active
                    ? 'btn-sage text-white'
                    : 'text-ink-2 tile tile-hover',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        {tab === 'learning' && <LearningTab />}
        {tab === 'memory'   && <MemoryTab />}
        {tab === 'privacy'  && <PrivacyTab />}
      </div>
    </div>
  )
}
