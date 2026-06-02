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
import { IconBadge, type IconBadgeTone } from '@/components/ui/icon-badge'
import { SECTIONS } from '@/lib/learning'
import { cn } from '@/lib/utils'

type Confidence = 'High' | 'Medium' | 'Low'
type Fact = { id: string; section: string; text: string; confidence: string; source: string }

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

export function PreferencesTab() {
  const [facts, setFacts] = useState<Fact[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/learning/facts')
        if (res.ok) {
          const data = await res.json()
          setFacts(data.facts ?? [])
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
      /* optimistic; ignore */
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

  // Group into the sections that actually have facts, in canonical order.
  const grouped = SECTIONS.map((s) => ({
    meta: s,
    items: facts.filter((f) => f.section === s.id),
  })).filter((g) => g.items.length > 0)

  if (loading) {
    return <p className="text-caption text-ink-3 text-center py-10">Loading what BioSense knows…</p>
  }

  if (facts.length === 0) {
    return (
      <Card padding="lg" variant="soft" className="text-center">
        <IconBadge icon={Sparkles} tone="sage" variant="gradient" size="lg" className="mx-auto mb-3" />
        <div className="text-body-sm font-semibold text-ink">Nothing learned yet</div>
        <p className="text-caption text-ink-2 leading-snug mt-1 max-w-[40ch] mx-auto">
          Start a short conversation in <span className="text-sage-deep font-medium">Learning Mode</span> and
          BioSense will begin building your profile here. You can edit or delete anything it learns.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-5">
      {/* What BioSense knows about you — grouped knowledge */}
      <section>
        <div className="mb-3 px-1">
          <h2 className="font-sans text-h3 text-ink tracking-tight">What BioSense knows about you</h2>
          <p className="text-caption text-ink-2 mt-0.5">
            Built from Learning Mode and your registration — {facts.length} thing{facts.length === 1 ? '' : 's'} learned so far.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {grouped.map(({ meta, items }) => {
            const disp = SECTION_DISPLAY[meta.id] ?? { icon: Sparkles, tone: 'sage' as IconBadgeTone }
            const topConf = items
              .map((i) => i.confidence)
              .sort((a, b) => (CONF_RANK[b] ?? 0) - (CONF_RANK[a] ?? 0))[0] as Confidence
            return (
              <div key={meta.id} className="rounded-card tile tile-hover p-3">
                <IconBadge icon={disp.icon} tone={disp.tone} variant="gradient" size="sm" />
                <div className="text-[12px] font-semibold text-ink mt-2 leading-tight">{meta.label}</div>
                <p className="text-[11px] text-ink-3 leading-snug mt-1 line-clamp-3">
                  {items[0].text}
                  {items.length > 1 && <span className="text-ink-4"> +{items.length - 1} more</span>}
                </p>
                <div className={cn('flex items-center gap-1 text-[10px] font-medium mt-2', CONFIDENCE_STYLE[topConf])}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {topConf} confidence
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Editable list — every learned fact */}
      <section>
        <div className="mb-3 px-1">
          <h2 className="font-sans text-h3 text-ink tracking-tight">Everything I&apos;ve learned</h2>
          <p className="text-caption text-ink-2 mt-0.5">Edit or delete anything — you&apos;re always in control.</p>
        </div>

        <Card padding="none" className="divide-y divide-line shadow-[0_1px_2px_rgba(26,28,26,0.04),0_8px_24px_-12px_rgba(111,143,107,0.20)]">
          {facts.map((f) => {
            const disp = SECTION_DISPLAY[f.section] ?? { icon: Sparkles, tone: 'sage' as IconBadgeTone }
            const isEditing = editingId === f.id
            return (
              <div key={f.id} className={cn('flex items-start gap-3 p-3.5 transition-colors', !isEditing && 'hover:bg-[rgba(168,191,163,0.04)]')}>
                <IconBadge icon={disp.icon} tone={disp.tone} variant="gradient" size="sm" />
                <div className="flex-1 min-w-0">
                  <CardLabel className="mb-1">{SECTIONS.find((s) => s.id === f.section)?.label ?? f.section}</CardLabel>
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
                    <p className="text-[12px] text-ink-2 leading-snug">{f.text}</p>
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

      <p className="text-caption text-ink-3 text-center pt-1">
        Items here came from Learning Mode or your registration. Delete all from{' '}
        <span className="text-sage-deep font-medium">Memory &amp; privacy</span>.
      </p>
    </div>
  )
}
