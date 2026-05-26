'use client'

import { useState } from 'react'
import { History } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChatTab } from './chat-tab'
import { LearningTab } from './learning-tab'
import { PreferencesTab } from './preferences-tab'
import { MemoryTab } from './memory-tab'

/**
 * /chat — the AI section.
 *
 * v6 brief: tab strip Chat / Learning Mode / Preferences / Memory & privacy.
 * Defaults to Chat (the existing conversational experience) so tapping the
 * central AI button in the tab bar lands directly on the conversation.
 *
 * Tabs are managed via local state so the URL stays at `/chat` and the page
 * never reloads when the user swaps tabs. The History button (top-right)
 * scaffolds the conversation-history feature; wiring it up to a real store
 * is a follow-up.
 */
type Tab = 'chat' | 'learning' | 'preferences' | 'memory'

const TABS: { id: Tab; label: string }[] = [
  { id: 'chat',        label: 'Chat'             },
  { id: 'learning',    label: 'Learning Mode'    },
  { id: 'preferences', label: 'Preferences'      },
  { id: 'memory',      label: 'Memory & privacy' },
]

export default function AIPage() {
  const [tab, setTab] = useState<Tab>('chat')

  return (
    <div className="max-w-3xl mx-auto fade-up">
      {/* Sticky AI page chrome — title + tab strip.
          z-30 sits ABOVE the chat-tab's fixed background (z-0) but BELOW
          the global glass nav (z-40). White-ish backdrop keeps the text
          and tabs readable when the chat lifestyle photo is behind them. */}
      <div className="sticky top-[60px] z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-3 pb-2 bg-[rgba(255,255,255,0.92)] backdrop-blur-md border-b border-line">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3 max-w-3xl mx-auto">
          <div className="min-w-0">
            <h1 className="font-sans text-[22px] sm:text-h2 text-ink tracking-tight leading-none">AI</h1>
            <p className="text-caption text-ink-2 mt-0.5 leading-none">Your personal health assistant</p>
          </div>
          <button
            type="button"
            className={cn(
              'inline-flex items-center gap-1.5 h-8 px-3 rounded-pill shrink-0',
              'text-[12px] font-medium text-ink-2',
              'bg-white ring-1 ring-line shadow-[0_1px_2px_rgba(26,28,26,0.04)]',
              'hover:ring-[rgba(168,191,163,0.55)] transition-colors',
            )}
            aria-label="Conversation history"
          >
            <History className="w-3.5 h-3.5" strokeWidth={2} />
            History
          </button>
        </div>

        {/* Tab strip */}
        <div className="-mx-4 sm:-mx-6 px-4 sm:px-6 mt-2.5">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5 max-w-3xl mx-auto">
            {TABS.map((t) => {
              const active = t.id === tab
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'shrink-0 h-8 px-3 rounded-pill text-[12px] font-medium transition-all',
                    active
                      ? 'bg-grad-sage text-white shadow-button'
                      : 'text-ink-2 hover:bg-[rgba(26,28,26,0.04)]',
                  )}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Active tab content — NO z-index wrapper so the chat-tab's fixed
          background (z-0) sits at the root level, never above the sticky
          chrome above. */}
      <div className="pt-3">
        {tab === 'chat'        && <ChatTab />}
        {tab === 'learning'    && <LearningTab />}
        {tab === 'preferences' && <PreferencesTab />}
        {tab === 'memory'      && <MemoryTab />}
      </div>
    </div>
  )
}
