'use client'

import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import {
  ArrowUp,
  Check,
  Pause,
  Sparkles,
  ShieldCheck,
  MessagesSquare,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardLabel } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'
import { IntelligenceMark } from '@/components/brand-mark'
import { RichText } from '@/components/ui/rich-text'
import { SECTION_BY_ID } from '@/lib/learning'

type Msg = { role: 'assistant' | 'user'; content: string; chips?: string[] }
type Fact = { id: string; section: string; text: string; confidence: string }
type ProgressSection = { id: string; label: string; phase: string; percent: number; status: string }
type Overview = {
  name: string | null
  factCount: number
  progress: { sections: ProgressSection[]; overall: number }
  snapshot: Snapshot
  activeSession: { id: string; section: string } | null
}
type Snapshot = {
  topPriorities: string[]
  activity: string | null
  sleep: string | null
  energy: string | null
  stress: string | null
  age: number | null
  country: string | null
  notes: string | null
}

type View = 'enter' | 'chat'

export function LearningTab() {
  const [view, setView] = useState<View>('enter')
  const [overview, setOverview] = useState<Overview | null>(null)
  const [loadingOverview, setLoadingOverview] = useState(true)

  // chat state
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sectionLabel, setSectionLabel] = useState('')
  const [messages, setMessages] = useState<Msg[]>([])
  const [sessionFacts, setSessionFacts] = useState<Fact[]>([])
  const [input, setInput] = useState('')
  const [starting, setStarting] = useState(false)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const threadEndRef = useRef<HTMLDivElement | null>(null)

  async function loadOverview() {
    try {
      const res = await fetch('/api/learning/overview')
      if (res.ok) setOverview(await res.json())
    } catch {
      /* non-fatal */
    } finally {
      setLoadingOverview(false)
    }
  }

  useEffect(() => {
    loadOverview()
  }, [])

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, done])

  async function startSession() {
    setStarting(true)
    try {
      const res = await fetch('/api/learning/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setSessionId(data.sessionId)
      setSectionLabel(data.sectionLabel)
      setMessages([{ role: 'assistant', content: data.message.content, chips: data.message.chips }])
      setSessionFacts([])
      setDone(false)
      setView('chat')
    } catch {
      toast.error('Could not start Learning Mode. Please try again.')
    } finally {
      setStarting(false)
    }
  }

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || !sessionId || sending || done) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setSending(true)
    try {
      const res = await fetch('/api/learning/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: trimmed }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply.content, chips: data.reply.chips },
      ])
      if (Array.isArray(data.facts) && data.facts.length) {
        setSessionFacts((prev) => [...prev, ...data.facts])
      }
      if (data.done) setDone(true)
    } catch {
      toast.error('Something went wrong. Please try again.')
      setMessages((prev) => prev.slice(0, -1))
      setInput(trimmed)
    } finally {
      setSending(false)
    }
  }

  async function editFact(id: string, text: string) {
    try {
      const res = await fetch(`/api/learning/facts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) throw new Error()
      setSessionFacts((prev) => prev.map((f) => (f.id === id ? { ...f, text } : f)))
    } catch {
      toast.error('Could not save that edit.')
    }
  }

  async function deleteFact(id: string) {
    try {
      const res = await fetch(`/api/learning/facts/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setSessionFacts((prev) => prev.filter((f) => f.id !== id))
    } catch {
      toast.error('Could not delete that.')
    }
  }

  function finishForNow() {
    setView('enter')
    setSessionId(null)
    setMessages([])
    setSessionFacts([])
    setDone(false)
    setLoadingOverview(true)
    loadOverview()
  }

  // ── Enter / overview screen ────────────────────────────────────────────
  if (view === 'enter') {
    return (
      <EnterScreen
        overview={overview}
        loading={loadingOverview}
        starting={starting}
        onStart={startSession}
      />
    )
  }

  // ── Conversation screen ────────────────────────────────────────────────
  const last = messages[messages.length - 1]
  const showChips = !done && !sending && last?.role === 'assistant' && (last.chips?.length ?? 0) > 0
  const showScale =
    !done &&
    !sending &&
    last?.role === 'assistant' &&
    !(last.chips?.length) &&
    /(scale of 1|1\s?[-–]\s?10|out of 10|1 to 10)/i.test(last.content)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
      <div className="space-y-4">
        {/* Session header */}
        <div
          className={cn(
            'relative overflow-hidden rounded-card p-4 sm:p-5',
            'bg-[linear-gradient(180deg,rgba(220,232,217,0.55)_0%,rgba(244,247,242,0.85)_100%)]',
            'ring-1 ring-inset ring-[rgba(168,191,163,0.40)]',
            'shadow-[0_1px_2px_rgba(26,28,26,0.04),0_8px_28px_-12px_rgba(111,143,107,0.30)]',
          )}
        >
          <div className="relative flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-eyebrow uppercase text-sage-deep">Learning Mode</span>
                <span className="px-1.5 py-0.5 rounded-pill text-[9px] font-semibold uppercase tracking-wide bg-grad-sage text-white shadow-button">
                  {sectionLabel}
                </span>
              </div>
              <p className="text-body-sm text-ink leading-snug font-medium">
                One question at a time. Stop whenever you like — everything saves as we go.
              </p>
            </div>
            <div className="shrink-0">
              <IntelligenceMark size="lg" thinking={sending} />
            </div>
          </div>
        </div>

        {/* Thread */}
        <div className="space-y-4">
          {messages.map((m, i) =>
            m.role === 'assistant' ? (
              <BotBubble key={i}>
                <RichText text={m.content} />
              </BotBubble>
            ) : (
              <UserBubble key={i}>{m.content}</UserBubble>
            ),
          )}

          {sending && (
            <div className="flex items-end gap-2">
              <IntelligenceMark size="sm" thinking />
              <div className="inline-flex items-center gap-1 px-4 py-3 rounded-3xl rounded-bl-md bg-[#F2F4F0]">
                <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
              </div>
            </div>
          )}

          {/* Quick-reply chips */}
          {showChips && (
            <div className="flex flex-wrap gap-2 pl-9">
              {last.chips!.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => send(c)}
                  className="h-9 px-4 rounded-pill text-[12.5px] font-medium text-ink bg-white ring-1 ring-line shadow-[0_1px_2px_rgba(26,28,26,0.04)] hover:ring-[rgba(168,191,163,0.55)] hover:-translate-y-px transition-all"
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* 1–10 scale quick-pick */}
          {showScale && (
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pl-9 max-w-[420px]">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => send(String(n))}
                  className="h-9 rounded-card text-[13px] font-semibold text-ink-2 bg-white ring-1 ring-line shadow-[0_1px_2px_rgba(26,28,26,0.04)] hover:ring-[rgba(168,191,163,0.55)] hover:-translate-y-px transition-all"
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          {/* Intelligent pause */}
          {done && (
            <Card padding="md" className="!rounded-card mt-2">
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full bg-grad-sage text-white flex items-center justify-center shrink-0 shadow-button">
                  <Pause className="w-4 h-4" strokeWidth={2.25} fill="currentColor" />
                </span>
                <div className="min-w-0">
                  <div className="text-body-sm font-semibold text-ink">That&apos;s enough for now.</div>
                  <p className="text-caption text-ink-2 leading-snug mt-0.5">
                    We&apos;ve learned a lot already — it&apos;s all saved and you can continue whenever you like.
                  </p>
                </div>
              </div>

              {sessionFacts.length > 0 && (
                <div className="mt-3 pt-3 border-t border-line">
                  <div className="text-eyebrow uppercase text-ink-3 mb-2">Today we talked about</div>
                  <div className="space-y-1.5">
                    {sessionFacts.map((f) => (
                      <div key={f.id} className="flex items-start gap-2 text-caption text-ink-2">
                        <Check className="w-3.5 h-3.5 text-sage-deep mt-0.5 shrink-0" strokeWidth={2.5} />
                        <span>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  type="button"
                  onClick={startSession}
                  disabled={starting}
                  className="h-10 px-5 rounded-pill text-[13px] font-semibold text-white bg-grad-sage shadow-button hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  Continue learning
                </button>
                <button
                  type="button"
                  onClick={finishForNow}
                  className="h-10 px-5 rounded-pill text-[13px] font-medium text-ink-2 bg-white ring-1 ring-line hover:ring-[rgba(168,191,163,0.55)] transition-colors"
                >
                  Finish for now
                </button>
              </div>
            </Card>
          )}

          <div ref={threadEndRef} />
        </div>

        {/* Composer */}
        {!done && (
          <div className="sticky bottom-0 pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="input-pill flex items-center gap-2 p-1.5 pl-4 bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your answer…"
                disabled={sending}
                className="flex-1 bg-transparent outline-none text-body-sm text-ink placeholder:text-ink-3 py-2 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-grad-sage text-white',
                  'shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_2px_4px_rgba(40,56,38,0.18),0_8px_18px_-3px_rgba(111,143,107,0.55)]',
                  'hover:scale-[1.03] active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100 transition-all',
                )}
                aria-label="Send"
              >
                <ArrowUp className="w-4 h-4" strokeWidth={2.75} />
              </button>
            </form>
            <p className="text-caption text-ink-3 mt-2 leading-snug">
              Your answers are private and help me personalise your insights.
            </p>
          </div>
        )}
      </div>

      {/* Side rail — what I've learned this session (editable) */}
      <aside className="lg:sticky lg:top-[176px] self-start space-y-3">
        <Card padding="md">
          <div className="flex items-center justify-between mb-2.5">
            <CardLabel className="mb-0">What I&apos;ve learned</CardLabel>
            <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-sage-deep">
              <span className="relative flex items-center justify-center">
                <span className="absolute w-2 h-2 rounded-full bg-sage-deep animate-ping opacity-40" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-sage-deep" />
              </span>
              Live
            </span>
          </div>
          <p className="text-caption text-ink-3 mb-3">
            Saved this session ·{' '}
            <span className="text-ink-2 font-medium">{sessionFacts.length}</span>
          </p>

          <div className="space-y-2 max-h-[320px] overflow-y-auto no-scrollbar pr-1">
            {sessionFacts.length === 0 && (
              <p className="text-caption text-ink-3 italic">
                I&apos;ll save what I learn here as we chat — you can edit or delete anything.
              </p>
            )}
            {sessionFacts.map((f) => (
              <EditableFact key={f.id} fact={f} onSave={editFact} onDelete={deleteFact} />
            ))}
          </div>
        </Card>
      </aside>
    </div>
  )
}

// ── Enter screen + overview ────────────────────────────────────────────────

function EnterScreen({
  overview,
  loading,
  starting,
  onStart,
}: {
  overview: Overview | null
  loading: boolean
  starting: boolean
  onStart: () => void
}) {
  const hasProgress = (overview?.factCount ?? 0) > 0
  const overall = overview?.progress.overall ?? 0

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Hero */}
      <div
        className={cn(
          'relative overflow-hidden rounded-card p-5 sm:p-7 text-center',
          'bg-[linear-gradient(180deg,rgba(220,232,217,0.6)_0%,rgba(244,247,242,0.9)_100%)]',
          'ring-1 ring-inset ring-[rgba(168,191,163,0.40)]',
          'shadow-[0_1px_2px_rgba(26,28,26,0.04),0_12px_32px_-14px_rgba(111,143,107,0.35)]',
        )}
      >
        <div className="flex justify-center mb-4">
          <IntelligenceMark size="xl" />
        </div>
        <h1 className="font-sans text-h2 text-ink tracking-tight">
          Let&apos;s <span className="italic-accent">get to know you.</span>
        </h1>
        <p className="text-body-sm text-ink-2 mt-2 max-w-[44ch] mx-auto leading-relaxed">
          The more BioSense learns about you, the more personalised your insights become. A few
          short, conversational questions at a time — never a long form.
        </p>

        <div className="grid sm:grid-cols-3 gap-2.5 mt-5 text-left">
          {[
            { Icon: MessagesSquare, title: 'Conversational & easy', body: 'A few questions at a time.' },
            { Icon: ShieldCheck, title: 'Your data, your control', body: 'Edit or delete anything we learn.' },
            { Icon: Sparkles, title: 'Smarter over time', body: 'Every session builds on the last.' },
          ].map((p) => (
            <div key={p.title} className="rounded-card bg-white/70 ring-1 ring-inset ring-[rgba(168,191,163,0.30)] p-3">
              <p.Icon className="w-4 h-4 text-sage-deep mb-1.5" strokeWidth={2.1} />
              <div className="text-[12px] font-semibold text-ink leading-tight">{p.title}</div>
              <div className="text-[11px] text-ink-3 leading-snug mt-0.5">{p.body}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onStart}
          disabled={starting}
          className="mt-6 h-12 px-7 rounded-pill text-[14px] font-semibold text-white bg-grad-sage shadow-button hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {starting ? 'Starting…' : hasProgress ? 'Continue learning' : 'Start learning'}
        </button>
      </div>

      {/* My understanding */}
      <Card padding="md">
        <div className="flex items-center gap-3 mb-4">
          <ScoreRing value={overall} size={54} thickness={6} tone="sage" centerSize={20} label="%" />
          <div className="flex-1 min-w-0">
            <CardLabel className="mb-0">My understanding</CardLabel>
            <p className="text-caption text-ink-2 leading-snug">
              {loading ? 'Loading…' : `${overall}% overall — built from your answers over time.`}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {(overview?.progress.sections ?? []).map((s) => (
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
        <p className="text-caption text-ink-3 mt-3 leading-snug">
          New insights are saved automatically and used to personalise your reports, coaching and
          daily guidance.
        </p>
      </Card>

      {/* Profile built by you */}
      {overview?.snapshot && hasProgress && (
        <ProfileSnapshot snapshot={overview.snapshot} />
      )}
    </div>
  )
}

function ProfileSnapshot({ snapshot }: { snapshot: Snapshot }) {
  const rows: { label: string; value: string }[] = []
  if (snapshot.activity) rows.push({ label: 'Activity', value: snapshot.activity })
  if (snapshot.sleep) rows.push({ label: 'Sleep', value: snapshot.sleep })
  if (snapshot.energy) rows.push({ label: 'Energy', value: snapshot.energy })
  if (snapshot.stress) rows.push({ label: 'Stress', value: snapshot.stress })

  return (
    <Card padding="md">
      <CardLabel className="mb-1">Your profile, built by you</CardLabel>
      <p className="text-caption text-ink-2 leading-snug mb-3">
        BioSense learns continuously and gets smarter with time. You&apos;re in control of what we
        learn.
      </p>

      {snapshot.topPriorities.length > 0 && (
        <div className="mb-3">
          <div className="text-eyebrow uppercase text-ink-3 mb-1.5">Top priorities</div>
          <div className="flex flex-wrap gap-1.5">
            {snapshot.topPriorities.map((p) => (
              <span
                key={p}
                className="px-2.5 py-1 rounded-pill text-[11px] font-medium text-sage-deep bg-[rgba(168,191,163,0.16)] ring-1 ring-inset ring-[rgba(168,191,163,0.30)]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {rows.length > 0 && (
        <div className="rounded-card bg-white/70 ring-1 ring-inset ring-line divide-y divide-line">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start gap-3 p-2.5">
              <div className="w-[68px] shrink-0 text-[11px] uppercase tracking-wide text-ink-3">{r.label}</div>
              <div className="text-[12px] text-ink-2 leading-snug">{r.value}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

// ── Editable fact row ────────────────────────────────────────────────────────

function EditableFact({
  fact,
  onSave,
  onDelete,
}: {
  fact: Fact
  onSave: (id: string, text: string) => void
  onDelete: (id: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(fact.text)
  const sectionLabel = SECTION_BY_ID[fact.section]?.label ?? fact.section

  if (editing) {
    return (
      <div className="p-2 rounded-card bg-white ring-1 ring-[rgba(168,191,163,0.4)]">
        <textarea
          rows={2}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full text-[12px] text-ink leading-snug outline-none resize-none bg-transparent"
          autoFocus
        />
        <div className="flex gap-1.5 mt-1.5 justify-end">
          <button
            type="button"
            onClick={() => {
              onSave(fact.id, draft.trim() || fact.text)
              setEditing(false)
            }}
            className="h-7 px-3 rounded-pill text-[11px] font-semibold text-white bg-grad-sage"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft(fact.text)
              setEditing(false)
            }}
            className="h-7 w-7 rounded-full flex items-center justify-center text-ink-3 bg-white ring-1 ring-line"
            aria-label="Cancel"
          >
            <X className="w-3 h-3" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group flex items-start gap-2 p-2 rounded-card bg-[rgba(168,191,163,0.06)] ring-1 ring-inset ring-[rgba(26,28,26,0.04)]">
      <Check className="w-3.5 h-3.5 text-sage-deep mt-0.5 shrink-0" strokeWidth={2.5} />
      <div className="min-w-0 flex-1">
        <div className="text-[12px] text-ink leading-snug">{fact.text}</div>
        <div className="text-[10px] text-ink-3 mt-0.5">{sectionLabel}</div>
      </div>
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="w-6 h-6 rounded-full flex items-center justify-center text-ink-3 hover:text-sage-deep hover:bg-white"
          aria-label="Edit"
        >
          <Pencil className="w-3 h-3" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(fact.id)}
          className="w-6 h-6 rounded-full flex items-center justify-center text-ink-3 hover:text-[#A85454] hover:bg-white"
          aria-label="Delete"
        >
          <Trash2 className="w-3 h-3" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  )
}

// ── Bubbles ──────────────────────────────────────────────────────────────────

function Dot({ delay = '0s' }: { delay?: string }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-sage-deep/60 animate-bounce"
      style={{ animationDelay: delay }}
    />
  )
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-2 max-w-[88%]">
      <div className="shrink-0 mb-1">
        <IntelligenceMark size="sm" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            'inline-block px-4 py-2.5 text-[13px] text-ink leading-relaxed whitespace-pre-wrap',
            'bg-[#F2F4F0] rounded-3xl rounded-bl-md',
            'shadow-[0_1px_2px_rgba(26,28,26,0.04),0_4px_14px_-8px_rgba(111,143,107,0.20)]',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-end max-w-[88%] ml-auto">
      <div
        className={cn(
          'inline-block px-4 py-2.5 text-[13px] text-white leading-snug font-medium',
          'bg-grad-sage rounded-3xl rounded-br-md',
          'shadow-[0_2px_10px_-2px_rgba(111,143,107,0.45),inset_0_1px_0_rgba(255,255,255,0.22)]',
        )}
      >
        {children}
      </div>
    </div>
  )
}
