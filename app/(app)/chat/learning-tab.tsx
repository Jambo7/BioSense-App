'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bike,
  Dumbbell,
  Footprints,
  Mountain,
  Users,
  Waves,
  Zap,
  MoreHorizontal,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Check,
  ArrowUp,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardLabel } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'
import { IntelligenceMark } from '@/components/brand-mark'

/**
 * AI > Learning Mode.
 *
 * Polished v2 — uses the branded IntelligenceMark for the assistant avatar,
 * lifted pill buttons, soft-edged selection cards with clear selected
 * states, and a calmer right-rail panel.
 */
type LearnedItem = {
  id: string
  label: string
  icon: LucideIcon
  confidence: 'High' | 'Medium' | 'Low'
}

const EXERCISE_OPTIONS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'running',  label: 'Running',           icon: Footprints },
  { id: 'cycling',  label: 'Cycling',           icon: Bike       },
  { id: 'strength', label: 'Strength training', icon: Dumbbell   },
  { id: 'swim',     label: 'Swimming',          icon: Waves      },
  { id: 'yoga',     label: 'Yoga / Pilates',    icon: Mountain   },
  { id: 'hiit',     label: 'HIIT / CrossFit',   icon: Zap        },
  { id: 'team',     label: 'Team sports',       icon: Users      },
  { id: 'other',    label: 'Other',             icon: MoreHorizontal },
]

const TIME_OPTIONS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'morning',   label: 'Morning',   icon: Sunrise },
  { id: 'midday',    label: 'Midday',    icon: Sun     },
  { id: 'afternoon', label: 'Afternoon', icon: Sunset  },
  { id: 'evening',   label: 'Evening',   icon: Moon    },
]

const TOTAL_TOPICS = 12

export function LearningTab() {
  const [started, setStarted] = useState(false)
  const [exerciseSelected, setExerciseSelected] = useState<string[]>([])
  const [exerciseSaved, setExerciseSaved] = useState(false)
  const [timeSelected, setTimeSelected] = useState<string | null>(null)
  const [learned, setLearned] = useState<LearnedItem[]>([])
  const [input, setInput] = useState('')

  function pushLearned(items: LearnedItem[]) {
    setLearned((prev) => {
      const ids = new Set(prev.map((p) => p.id))
      return [...prev, ...items.filter((i) => !ids.has(i.id))]
    })
  }

  function saveExercise() {
    if (exerciseSelected.length === 0) return
    setExerciseSaved(true)
    pushLearned(
      exerciseSelected.map((id) => {
        const o = EXERCISE_OPTIONS.find((e) => e.id === id)!
        return {
          id: `enjoys-${id}`,
          label: `Enjoys ${o.label.toLowerCase()}`,
          icon: o.icon,
          confidence: 'High' as const,
        }
      }),
    )
  }

  function pickTime(id: string) {
    setTimeSelected(id)
    const o = TIME_OPTIONS.find((t) => t.id === id)!
    pushLearned([
      {
        id: `time-${id}`,
        label: `Prefers ${o.label.toLowerCase()} workouts`,
        icon: o.icon,
        confidence: 'High',
      },
    ])
  }

  const progress = Math.min(100, Math.round((learned.length / TOTAL_TOPICS) * 100))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
      {/* ── Conversation column ─────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Hero banner — branded mark, sage-tinted, lifted */}
        <div
          className={cn(
            'relative overflow-hidden rounded-card',
            'bg-[linear-gradient(180deg,rgba(220,232,217,0.55)_0%,rgba(244,247,242,0.85)_100%)]',
            'ring-1 ring-inset ring-[rgba(168,191,163,0.40)]',
            'shadow-[0_1px_2px_rgba(26,28,26,0.04),0_8px_28px_-12px_rgba(111,143,107,0.30)]',
            'p-4 sm:p-5',
          )}
        >
          <div
            aria-hidden
            className="absolute -top-10 -right-10 w-[160px] h-[160px] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(168,191,163,0.40) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
          <div className="relative flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-eyebrow uppercase text-sage-deep">
                  AI learning mode
                </span>
                <span className="px-1.5 py-0.5 rounded-pill text-[9px] font-semibold uppercase tracking-wide bg-grad-sage text-white shadow-button">
                  Beta
                </span>
              </div>
              <p className="text-body-sm text-ink leading-snug font-medium">
                I&apos;ll ask you a few questions to understand you better.
              </p>
              <p className="text-caption text-ink-3 leading-snug mt-1">
                Saved info lives in{' '}
                <span className="text-sage-deep font-medium">Preferences</span>{' '}
                and{' '}
                <span className="text-sage-deep font-medium">Memory &amp; privacy</span>{' '}
                — edit or delete it any time.
              </p>
            </div>
            <div className="shrink-0">
              <IntelligenceMark size="lg" thinking={!exerciseSaved && started} />
            </div>
          </div>
        </div>

        {/* Conversation thread */}
        <div className="space-y-4">
          <BotBubble time="9:41 AM">
            <p>
              Hi! I&apos;d love to learn more about you so I can give you the most
              personalised advice.
            </p>
            <p className="mt-2">Shall we start with a few quick questions?</p>
          </BotBubble>

          {!started ? (
            <UserActionRow
              primary="Sure, let's do it"
              secondary="Maybe later"
              onPrimary={() => setStarted(true)}
            />
          ) : (
            <UserBubble time="9:41 AM">Sure, let&apos;s do it</UserBubble>
          )}

          {started && (
            <>
              <BotBubble time="9:41 AM">
                <p className="font-semibold text-ink mb-1.5">Great! First up…</p>
                <p>What types of exercise do you enjoy most?</p>
                <p className="text-caption text-ink-3 mt-1">Choose all that apply.</p>
              </BotBubble>

              <div className="grid grid-cols-2 gap-2 pl-9">
                {EXERCISE_OPTIONS.map((o) => {
                  const Icon = o.icon
                  const picked = exerciseSelected.includes(o.id)
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() =>
                        setExerciseSelected((prev) =>
                          prev.includes(o.id) ? prev.filter((x) => x !== o.id) : [...prev, o.id],
                        )
                      }
                      disabled={exerciseSaved}
                      className={cn(
                        'group relative flex items-center gap-2 h-11 pl-2 pr-3 rounded-pill text-[13px] font-medium text-left transition-all',
                        picked
                          ? 'bg-[linear-gradient(180deg,rgba(168,191,163,0.32)_0%,rgba(168,191,163,0.16)_100%)] ring-2 ring-[rgba(111,143,107,0.55)] text-ink shadow-[0_1px_2px_rgba(26,28,26,0.04),0_4px_12px_-3px_rgba(111,143,107,0.30)]'
                          : 'bg-white ring-1 ring-line text-ink shadow-[0_1px_2px_rgba(26,28,26,0.04)] hover:ring-[rgba(168,191,163,0.55)] hover:-translate-y-px hover:shadow-[0_1px_2px_rgba(26,28,26,0.04),0_4px_12px_-3px_rgba(111,143,107,0.22)]',
                        exerciseSaved && 'opacity-70 cursor-default hover:translate-y-0 hover:shadow-none',
                      )}
                    >
                      <span
                        className={cn(
                          'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors',
                          picked
                            ? 'bg-grad-sage text-white shadow-button'
                            : 'bg-[linear-gradient(180deg,rgba(168,191,163,0.28)_0%,rgba(111,143,107,0.14)_100%)] ring-1 ring-inset ring-[rgba(168,191,163,0.35)] text-sage-deep',
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
                      </span>
                      <span className="flex-1">{o.label}</span>
                      {picked && (
                        <Check className="w-3.5 h-3.5 text-sage-deep shrink-0" strokeWidth={3} />
                      )}
                    </button>
                  )
                })}
              </div>

              {!exerciseSaved ? (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={saveExercise}
                    disabled={exerciseSelected.length === 0}
                    className={cn(
                      'inline-flex items-center gap-1.5 h-10 px-5 rounded-pill text-[13px] font-semibold text-white',
                      'bg-grad-sage',
                      'shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_2px_4px_rgba(40,56,38,0.18),0_8px_18px_-3px_rgba(111,143,107,0.55)]',
                      'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.40),0_2px_6px_rgba(40,56,38,0.22),0_10px_22px_-3px_rgba(111,143,107,0.65)]',
                      'hover:scale-[1.02] active:scale-[0.98]',
                      'disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100',
                      'transition-all',
                    )}
                  >
                    Save my answer
                    <ArrowUp className="w-3.5 h-3.5 rotate-90" strokeWidth={2.75} />
                  </button>
                </div>
              ) : (
                <BotBubble time="9:41 AM" saved>
                  Got it. I&apos;ll remember that you enjoy{' '}
                  <span className="font-semibold text-ink">
                    {exerciseSelected
                      .map((id) => EXERCISE_OPTIONS.find((o) => o.id === id)?.label)
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                  .
                </BotBubble>
              )}

              {exerciseSaved && (
                <>
                  <BotBubble time="9:41 AM">
                    What time of day do you usually prefer to exercise?
                    <p className="text-caption text-ink-3 mt-1">Choose one.</p>
                  </BotBubble>

                  <div className="grid grid-cols-4 gap-2 pl-9">
                    {TIME_OPTIONS.map((o) => {
                      const Icon = o.icon
                      const picked = timeSelected === o.id
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => pickTime(o.id)}
                          disabled={timeSelected !== null && !picked}
                          className={cn(
                            'flex flex-col items-center gap-1.5 px-2 py-3 rounded-card transition-all',
                            picked
                              ? 'bg-[linear-gradient(180deg,rgba(168,191,163,0.32)_0%,rgba(168,191,163,0.16)_100%)] ring-2 ring-[rgba(111,143,107,0.55)] shadow-[0_1px_2px_rgba(26,28,26,0.04),0_4px_12px_-3px_rgba(111,143,107,0.30)]'
                              : 'bg-white ring-1 ring-line shadow-[0_1px_2px_rgba(26,28,26,0.04)] hover:ring-[rgba(168,191,163,0.55)] hover:-translate-y-px',
                            timeSelected !== null && !picked && 'opacity-50 cursor-default hover:translate-y-0',
                          )}
                        >
                          <span
                            className={cn(
                              'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                              picked
                                ? 'bg-grad-sage text-white shadow-button'
                                : 'bg-[linear-gradient(180deg,rgba(168,191,163,0.28)_0%,rgba(111,143,107,0.14)_100%)] ring-1 ring-inset ring-[rgba(168,191,163,0.35)] text-sage-deep',
                            )}
                          >
                            <Icon className="w-4 h-4" strokeWidth={2.25} />
                          </span>
                          <span className="text-[11.5px] font-medium text-ink">{o.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Inline message input — sage perimeter, lifted send disc */}
        <div className="sticky bottom-0 pt-2">
          <div className="input-pill flex items-center gap-2 p-1.5 pl-4 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 bg-transparent outline-none text-body-sm text-ink placeholder:text-ink-3 py-2"
            />
            <button
              type="button"
              disabled={!input.trim()}
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center shrink-0',
                'bg-grad-sage text-white',
                'shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_2px_4px_rgba(40,56,38,0.18),0_8px_18px_-3px_rgba(111,143,107,0.55)]',
                'hover:scale-[1.03] active:scale-[0.97]',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100',
                'transition-all',
              )}
              aria-label="Send"
            >
              <ArrowUp className="w-4 h-4" strokeWidth={2.75} />
            </button>
          </div>
          <p className="text-caption text-ink-3 mt-2 leading-snug">
            Your answers are private and help me personalise your insights.{' '}
            <Link href="#" className="text-sage-deep font-medium hover:underline">
              Learn more
            </Link>
          </p>
        </div>
      </div>

      {/* ── Side rail: What I'm learning ────────────────────────────── */}
      <aside className="lg:sticky lg:top-[176px] self-start space-y-3">
        <Card padding="md">
          <div className="flex items-center justify-between mb-2.5">
            <CardLabel className="mb-0">What I&apos;m learning</CardLabel>
            <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-sage-deep">
              <span className="relative flex items-center justify-center">
                <span className="absolute w-2 h-2 rounded-full bg-sage-deep animate-ping opacity-40" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-sage-deep" />
              </span>
              Live
            </span>
          </div>
          <p className="text-caption text-ink-3 mb-3">
            Currently saving{' '}
            <span className="text-ink-2 font-medium">{learned.length}</span> items
          </p>

          <div className="space-y-2 max-h-[280px] overflow-y-auto no-scrollbar pr-1">
            {learned.length === 0 && (
              <p className="text-caption text-ink-3 italic">
                I&apos;ll start saving things here as we chat.
              </p>
            )}
            {learned.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-2.5 p-2 rounded-card bg-[rgba(168,191,163,0.06)] ring-1 ring-inset ring-[rgba(26,28,26,0.04)]"
                >
                  <div className="w-8 h-8 rounded-full bg-[linear-gradient(180deg,rgba(168,191,163,0.32)_0%,rgba(111,143,107,0.18)_100%)] ring-1 ring-inset ring-[rgba(168,191,163,0.40)] flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                    <Icon className="w-3.5 h-3.5 text-sage-deep" strokeWidth={2.25} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold text-ink leading-tight truncate">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-sage-deep flex items-center gap-1 leading-none mt-0.5">
                      <span className="w-1 h-1 rounded-full bg-sage-deep" />
                      {item.confidence} confidence
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Link
            href="#"
            className="block text-center text-caption font-medium text-sage-deep mt-3 hover:underline"
          >
            View all →
          </Link>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <ScoreRing
              value={progress}
              size={56}
              thickness={6}
              tone="sage"
              centerSize={20}
              label="%"
            />
            <div className="flex-1 min-w-0">
              <CardLabel className="mb-0">Progress</CardLabel>
              <div className="text-[11px] text-ink-2 leading-snug">
                {learned.length} of {TOTAL_TOPICS} topics explored
              </div>
            </div>
          </div>
          <p className="text-caption text-ink-3 mt-2.5 leading-snug">
            More questions coming as I learn more about you.
          </p>
        </Card>
      </aside>
    </div>
  )
}

// ── Bubble helpers — iMessage-style chat pills ───────────────────────────
//
// Both bubbles use:
//   · large rounded-3xl (24px) corners for the pill feel
//   · ONE small pinched corner pointing at the speaker:
//        bot   → bottom-left (rounded-bl-md)  toward the avatar on the left
//        user  → bottom-right (rounded-br-md) toward the user side
//   · soft tinted fill (no ring), so they read as messages not cards
//   · soft drop shadow only
//
function BotBubble({
  children,
  time,
  saved,
}: {
  children: React.ReactNode
  time?: string
  saved?: boolean
}) {
  return (
    <div className="flex items-end gap-2 max-w-[88%]">
      <div className="shrink-0 mb-1">
        <IntelligenceMark size="sm" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            'inline-block px-4 py-2.5 text-[13px] text-ink leading-relaxed',
            'bg-[#F2F4F0]',
            'rounded-3xl rounded-bl-md',
            'shadow-[0_1px_2px_rgba(26,28,26,0.04),0_4px_14px_-8px_rgba(111,143,107,0.20)]',
          )}
        >
          {children}
        </div>
        <div className="flex items-center gap-1.5 mt-1 ml-2.5 text-[10px] text-ink-3">
          {time && <span>{time}</span>}
          {saved && (
            <>
              <span className="text-ink-4">·</span>
              <span className="inline-flex items-center gap-0.5 text-sage-deep font-medium">
                <Check className="w-2.5 h-2.5" strokeWidth={2.75} />
                Saved
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function UserBubble({ children, time }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="flex flex-col items-end max-w-[88%] ml-auto">
      <div
        className={cn(
          'inline-block px-4 py-2.5 text-[13px] text-white leading-snug font-medium',
          'bg-grad-sage',
          'rounded-3xl rounded-br-md',
          'shadow-[0_2px_10px_-2px_rgba(111,143,107,0.45),inset_0_1px_0_rgba(255,255,255,0.22)]',
        )}
      >
        {children}
      </div>
      {time && (
        <div className="flex items-center gap-1 mt-1 mr-2.5 text-[10px] text-ink-3">
          {time}
          <Check className="w-2.5 h-2.5 text-sage-deep" strokeWidth={2.75} />
        </div>
      )}
    </div>
  )
}

function UserActionRow({
  primary,
  secondary,
  onPrimary,
}: {
  primary: string
  secondary: string
  onPrimary: () => void
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      <button
        type="button"
        className={cn(
          'h-10 px-4 rounded-pill text-[13px] font-medium text-ink-2',
          'bg-white ring-1 ring-line',
          'shadow-[0_1px_2px_rgba(26,28,26,0.04)]',
          'hover:ring-[rgba(168,191,163,0.55)] hover:text-ink hover:-translate-y-px',
          'hover:shadow-[0_1px_2px_rgba(26,28,26,0.05),0_4px_12px_-3px_rgba(111,143,107,0.22)]',
          'active:translate-y-0 transition-all',
        )}
      >
        {secondary}
      </button>
      <button
        type="button"
        onClick={onPrimary}
        className={cn(
          'h-10 px-5 rounded-pill text-[13px] font-semibold text-white',
          'bg-grad-sage',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_2px_4px_rgba(40,56,38,0.18),0_8px_18px_-3px_rgba(111,143,107,0.55)]',
          'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.40),0_2px_6px_rgba(40,56,38,0.22),0_10px_22px_-3px_rgba(111,143,107,0.65)]',
          'hover:scale-[1.02] active:scale-[0.98]',
          'transition-all',
        )}
      >
        {primary}
      </button>
    </div>
  )
}
