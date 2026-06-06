'use client'

import { useEffect, useState } from 'react'
import {
  Zap,
  Moon,
  Wind,
  Dumbbell,
  Utensils,
  CalendarClock,
  HeartPulse,
  FlaskConical,
  Target,
  Edit3,
  Check,
  X,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'
import { IconBadge, type IconBadgeTone } from '@/components/ui/icon-badge'
import { SECTIONS } from '@/lib/learning'
import { cn } from '@/lib/utils'

type Confidence = 'High' | 'Medium' | 'Low'
type Fact = { id: string; section: string; text: string; confidence: string; source: string }
type ProgressSection = { id: string; label: string; phase: string; percent: number; status: string }

const SECTION_DISPLAY: Record<string, { icon: LucideIcon; tone: IconBadgeTone }> = {
  energy:            { icon: Zap,          tone: 'amber'  },
  sleep:             { icon: Moon,         tone: 'violet' },
  stress:            { icon: Wind,         tone: 'teal'   },
  exercise:          { icon: Dumbbell,     tone: 'sky'    },
  nutrition:         { icon: Utensils,     tone: 'sage'   },
  lifestyle:         { icon: CalendarClock,tone: 'ink'    },
  health_history:    { icon: HeartPulse,   tone: 'rose'   },
  biomarker_context: { icon: FlaskConical, tone: 'rose'   },
  goals:             { icon: Target,       tone: 'violet' },
}

const CONFIDENCE_STYLE: Record<Confidence, string> = {
  High:   'text-sage-deep',
  Medium: 'text-[#A77530]',
  Low:    'text-[#A85454]',
}

const CONF_RANK: Record<string, number> = { High: 3, Medium: 2, Low: 1 }

/**
 * AI > Memory — mirrors Learning Mode "My understanding" sections with
 * per-fact edit/delete. Per 3rd-June spec.
 */
export function MemoryTab() {
  const [facts, setFacts] = useState<Fact[]>([])
  const [sections, setSections] = useState<ProgressSection[]>([])
  const [overall, setOverall] = useState(0)
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const [factsRes, overviewRes] = await Promise.all([
          fetch('/api/learning/facts'),
          fetch('/api/learning/overview'),
        ])
        if (factsRes.ok) {
          const data = await factsRes.json()
          setFacts(data.facts ?? [])
        }
        if (overviewRes.ok) {
          const data = await overviewRes.json()
          setSections(data.progress?.sections ?? [])
          setOverall(data.progress?.overall ?? 0)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function saveEdit(id: string) {
    const text = draft.trim()
    if (!text) {
      setEditingId(null)
      return
    }
    setFacts((prev) => prev.map((f) => (f.id === id ? { ...f, text } : f)))
    setEditingId(null)
    try {
      await fetch(`/api/learning/facts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
    } catch {
      /* optimistic */
    }
  }

  async function remove(id: string) {
    setFacts((prev) => prev.filter((f) => f.id !== id))
    try {
      await fetch(`/api/learning/facts/${id}`, { method: 'DELETE' })
    } catch {
      /* ignore */
    }
  }

  const grouped = SECTIONS.map((s) => ({
    meta: s,
    items: facts.filter((f) => f.section === s.id),
  }))

  if (loading) {
    return <p className="text-caption text-ink-3 text-center py-10">Loading your memory…</p>
  }

  return (
    <div className="space-y-5">
      <Card padding="md">
        <div className="flex items-center gap-3 mb-4">
          <ScoreRing value={overall} size={54} thickness={6} tone="sage" centerSize={20} label="%" />
          <div className="flex-1 min-w-0">
            <CardLabel className="mb-0">My understanding</CardLabel>
            <p className="text-caption text-ink-2 leading-snug">
              {overall}% overall — built from your answers over time.
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {sections.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className="w-[120px] shrink-0 text-[12px] text-ink-2 truncate">{s.label}</div>
              <div className="flex-1 h-2 rounded-pill bg-sand-deep overflow-hidden">
                <div
                  className="h-full rounded-pill bg-grad-sage transition-all duration-500"
                  style={{ width: `${s.percent}%` }}
                />
              </div>
              <div className="w-[78px] shrink-0 text-right text-[11px] font-medium text-ink-3">
                {s.percent}% · {s.status}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {facts.length === 0 ? (
        <Card padding="lg" variant="soft" className="text-center">
          <IconBadge icon={Sparkles} tone="sage" variant="gradient" size="lg" className="mx-auto mb-3" />
          <div className="text-body-sm font-semibold text-ink">Nothing learned yet</div>
          <p className="text-caption text-ink-2 leading-snug mt-1 max-w-[40ch] mx-auto">
            Start a conversation in <span className="text-sage-deep font-medium">Learning Mode</span> and
            BioSense will begin building your memory here.
          </p>
        </Card>
      ) : (
        <>
          {grouped.filter((g) => g.items.length > 0).map(({ meta, items }) => {
            const disp = SECTION_DISPLAY[meta.id] ?? { icon: Sparkles, tone: 'sage' as IconBadgeTone }
            return (
              <section key={meta.id}>
                <div className="flex items-center gap-2 mb-2.5 px-1">
                  <IconBadge icon={disp.icon} tone={disp.tone} variant="gradient" size="sm" />
                  <h2 className="font-sans text-[14px] font-semibold text-ink">{meta.label}</h2>
                  <span className="text-[11px] text-ink-3">{items.length} item{items.length === 1 ? '' : 's'}</span>
                </div>

                <Card padding="none" className="divide-y divide-line">
                  {items.map((f) => {
                    const isEditing = editingId === f.id
                    const conf = f.confidence as Confidence
                    return (
                      <div
                        key={f.id}
                        className={cn(
                          'flex items-start gap-3 p-3.5 transition-colors',
                          !isEditing && 'hover:bg-[rgba(168,191,163,0.04)]',
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          {isEditing ? (
                            <>
                              <textarea
                                rows={2}
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                className="w-full rounded-card bg-white ring-1 ring-line p-2.5 text-[13px] text-ink leading-snug outline-none focus:ring-2 focus:ring-[rgba(111,143,107,0.45)] transition-all"
                                autoFocus
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  type="button"
                                  onClick={() => saveEdit(f.id)}
                                  className="inline-flex items-center gap-1 h-8 px-3 rounded-pill text-[12px] font-semibold text-white bg-grad-sage shadow-button"
                                >
                                  <Check className="w-3 h-3" strokeWidth={3} /> Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingId(null)}
                                  className="h-8 px-3 rounded-pill text-[12px] font-medium text-ink-2 bg-white ring-1 ring-line"
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-[12px] text-ink-2 leading-snug">{f.text}</p>
                              <div className={cn('flex items-center gap-1 text-[10px] font-medium mt-1.5', CONFIDENCE_STYLE[conf] ?? 'text-ink-3')}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {f.confidence} confidence
                              </div>
                            </>
                          )}
                        </div>
                        {!isEditing && (
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(f.id)
                                setDraft(f.text)
                              }}
                              aria-label="Edit"
                              className="w-8 h-8 rounded-full flex items-center justify-center text-ink-3 bg-white ring-1 ring-line hover:text-sage-deep hover:ring-[rgba(168,191,163,0.55)] transition-all"
                            >
                              <Edit3 className="w-3.5 h-3.5" strokeWidth={2.25} />
                            </button>
                            <button
                              type="button"
                              onClick={() => remove(f.id)}
                              aria-label="Delete"
                              className="w-8 h-8 rounded-full flex items-center justify-center text-ink-3 bg-white ring-1 ring-line hover:text-[#A85454] hover:ring-[rgba(168,84,84,0.4)] transition-all"
                            >
                              <X className="w-3.5 h-3.5" strokeWidth={2.25} />
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </Card>
              </section>
            )
          })}
        </>
      )}
    </div>
  )
}
