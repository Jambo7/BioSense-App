'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Utensils,
  Dumbbell,
  CalendarClock,
  Heart,
  ChevronRight,
  Footprints,
  Bike,
  Moon,
  Settings2,
  Edit3,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { cn } from '@/lib/utils'

/**
 * AI > Preferences.
 *
 * Two surfaces in one tab (per image4):
 *   1. "What BioSense knows about you" — 4 cards of inferred knowledge with
 *      confidence ratings (sourced from Learning Mode + check-in patterns).
 *   2. "Your preferences" — the user's explicit, editable saved knowledge:
 *      foods, exercise, schedule, health goals. This is where the goals +
 *      health-context that USED to live in Profile now belong.
 *
 * Edit-in-place is scaffolded with local state; persistence will plug into
 * the existing `/api/user/profile` endpoint once we add the related fields.
 */
type Confidence = 'High' | 'Medium' | 'Low'

const KNOWS: { id: string; label: string; icon: LucideIcon; tone: 'sage' | 'amber' | 'rose' | 'ink'; body: string; confidence: Confidence }[] = [
  {
    id: 'exercise',
    label: 'Exercise preferences',
    icon: Footprints,
    tone: 'sage',
    body: 'You enjoy endurance training and usually work out in the morning.',
    confidence: 'High',
  },
  {
    id: 'nutrition',
    label: 'Nutrition preferences',
    icon: Utensils,
    tone: 'amber',
    body: 'You prefer whole foods, high-protein meals and enjoy salmon, eggs and greek yoghurt.',
    confidence: 'High',
  },
  {
    id: 'sleep',
    label: 'Sleep patterns',
    icon: Moon,
    tone: 'ink',
    body: 'You sleep best with a consistent bedtime before 10:30pm.',
    confidence: 'Medium',
  },
  {
    id: 'stress',
    label: 'Stress triggers',
    icon: Heart,
    tone: 'rose',
    body: 'Late caffeine and overcommitted days tend to increase your stress.',
    confidence: 'Medium',
  },
]

const CONFIDENCE_STYLE: Record<Confidence, string> = {
  High:   'text-sage-deep',
  Medium: 'text-[#A77530]',
  Low:    'text-[#A85454]',
}

type Pref = { id: string; label: string; icon: LucideIcon; value: string }

const DEFAULT_PREFS: Pref[] = [
  {
    id: 'foods',
    label: 'Foods you enjoy',
    icon: Utensils,
    value: 'Salmon, eggs, greek yoghurt, berries, sweet potato, avocado + 12 more',
  },
  {
    id: 'exercise',
    label: 'Exercise you enjoy',
    icon: Dumbbell,
    value: 'Running, cycling, strength training, swimming, yoga',
  },
  {
    id: 'schedule',
    label: 'Typical schedule',
    icon: CalendarClock,
    value: 'Train 5–6am, work 9–5, wind down 9:30pm, bed around 10:15pm',
  },
  {
    id: 'goals',
    label: 'Health goals',
    icon: Heart,
    value: 'Half Ironman in October, improve HRV, build endurance',
  },
]

export function PreferencesTab() {
  const [prefs, setPrefs] = useState<Pref[]>(DEFAULT_PREFS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  function startEdit(p: Pref) {
    setEditingId(p.id)
    setDraft(p.value)
  }

  function saveEdit() {
    if (!editingId) return
    setPrefs((prev) =>
      prev.map((p) => (p.id === editingId ? { ...p, value: draft } : p)),
    )
    setEditingId(null)
  }

  return (
    <div className="space-y-5">
      {/* What BioSense knows about you */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="font-sans text-h3 text-ink tracking-tight">
              What BioSense knows about you
            </h2>
            <p className="text-caption text-ink-2 mt-0.5">
              Key things I&apos;ve learned to personalise your health insights.
            </p>
          </div>
          <Link
            href="#"
            className="text-caption font-medium text-sage-deep hover:underline whitespace-nowrap"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {KNOWS.map((k) => (
            <button
              key={k.id}
              type="button"
              className={cn(
                'rounded-card tile tile-hover p-3 text-left group',
              )}
            >
              <IconBadge icon={k.icon} tone={k.tone} variant="gradient" size="sm" />
              <div className="text-[12px] font-semibold text-ink mt-2 leading-tight">
                {k.label}
              </div>
              <p className="text-[11px] text-ink-3 leading-snug mt-1 line-clamp-3">{k.body}</p>
              <div className={`flex items-center gap-1 text-[10px] font-medium mt-2 ${CONFIDENCE_STYLE[k.confidence]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {k.confidence} confidence
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Your preferences (editable) */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="font-sans text-h3 text-ink tracking-tight">
              Your preferences
            </h2>
            <p className="text-caption text-ink-2 mt-0.5">
              The choices you&apos;ve shared with me.
            </p>
          </div>
          <Pill tone="soft-sage" size="sm">
            <Settings2 className="w-3 h-3" />
            Manage
          </Pill>
        </div>

        <Card padding="none" className="divide-y divide-line shadow-[0_1px_2px_rgba(26,28,26,0.04),0_8px_24px_-12px_rgba(111,143,107,0.20)]">
          {prefs.map((p) => {
            const Icon = p.icon
            const isEditing = editingId === p.id
            return (
              <div
                key={p.id}
                className={cn(
                  'flex items-start gap-3 p-3.5 transition-colors',
                  !isEditing && 'hover:bg-[rgba(168,191,163,0.04)]',
                )}
              >
                <IconBadge icon={Icon} tone="sage" variant="gradient" size="sm" />
                <div className="flex-1 min-w-0">
                  <CardLabel className="mb-1">{p.label}</CardLabel>
                  {isEditing ? (
                    <>
                      <textarea
                        rows={3}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        className="w-full rounded-card bg-white ring-1 ring-line p-3 text-[13px] text-ink leading-snug outline-none focus:ring-2 focus:ring-[rgba(111,143,107,0.45)] transition-all"
                      />
                      <div className="flex gap-2 mt-2.5">
                        <button
                          type="button"
                          onClick={saveEdit}
                          className={cn(
                            'h-9 px-4 rounded-pill text-[12px] font-semibold text-white bg-grad-sage',
                            'shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_2px_4px_rgba(40,56,38,0.18),0_6px_14px_-3px_rgba(111,143,107,0.50)]',
                            'hover:scale-[1.02] active:scale-[0.98] transition-transform',
                          )}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="h-9 px-4 rounded-pill text-[12px] font-medium text-ink-2 bg-white ring-1 ring-line hover:ring-[rgba(168,191,163,0.55)] transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-[12px] text-ink-2 leading-snug">{p.value}</p>
                  )}
                </div>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => startEdit(p)}
                    aria-label="Edit"
                    className={cn(
                      'shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-ink-3',
                      'bg-white ring-1 ring-line shadow-[0_1px_2px_rgba(26,28,26,0.04)]',
                      'hover:text-sage-deep hover:ring-[rgba(168,191,163,0.55)] hover:shadow-[0_2px_6px_-2px_rgba(111,143,107,0.30)]',
                      'transition-all',
                    )}
                  >
                    <Edit3 className="w-3.5 h-3.5" strokeWidth={2.25} />
                  </button>
                )}
                {!isEditing && (
                  <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 mt-2" strokeWidth={2} />
                )}
              </div>
            )
          })}
        </Card>
      </section>

      <p className="text-caption text-ink-3 text-center pt-1">
        Items here came from the Learning Mode chat or from your onboarding.
      </p>
    </div>
  )
}
