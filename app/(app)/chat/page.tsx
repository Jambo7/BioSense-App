'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  Send,
  Zap,
  Moon,
  Heart,
  Target,
  Plus,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconBadge } from '@/components/ui/icon-badge'
import { IntelligenceMark } from '@/components/brand-mark'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Suggested {
  text: string
  icon: LucideIcon
  tone: 'sage' | 'amber' | 'rose' | 'ink'
  /** Solid, on-brand wash. Diagonal gradient from white to a clear hit of
   *  the tone colour so each card has visible personality without going
   *  garish. Designed to read fully opaque (no glass / no blur). */
  bg: string
  /** Tone-coloured hairline border so the card's identity carries to the edge. */
  border: string
}

const SUGGESTED: Suggested[] = [
  {
    text: 'Why was my energy low last week?',
    icon: Zap,
    tone: 'amber',
    // Light translucent tone wash — keep just enough colour identity to
    // recognise the card, but let the photo backdrop dominate. Paired
    // with a defined 2px tone border for crisp card edges.
    bg: 'bg-[linear-gradient(150deg,rgba(247,222,184,0.30)_0%,rgba(229,180,119,0.26)_60%,rgba(200,138,69,0.22)_100%)]',
    border: 'border-[rgba(200,138,69,0.65)]',
  },
  {
    text: 'How can I improve my sleep?',
    icon: Moon,
    tone: 'sage',
    bg: 'bg-[linear-gradient(150deg,rgba(200,214,197,0.32)_0%,rgba(168,191,163,0.28)_60%,rgba(122,151,118,0.24)_100%)]',
    border: 'border-[rgba(111,143,107,0.65)]',
  },
  {
    text: "What's impacting my recovery?",
    icon: Heart,
    tone: 'rose',
    bg: 'bg-[linear-gradient(150deg,rgba(244,217,217,0.34)_0%,rgba(220,164,164,0.28)_60%,rgba(184,107,107,0.24)_100%)]',
    border: 'border-[rgba(184,107,107,0.62)]',
  },
  {
    text: 'How close am I to my goal?',
    icon: Target,
    tone: 'ink',
    bg: 'bg-[linear-gradient(150deg,rgba(232,226,214,0.38)_0%,rgba(160,162,160,0.24)_60%,rgba(60,62,60,0.18)_100%)]',
    border: 'border-[rgba(26,28,26,0.50)]',
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Auto-focus the input on first render so the user can start typing immediately.
  useEffect(() => {
    inputRef.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function send(text: string) {
    if (!text.trim() || loading) return

    const userMsg: Message = { role: 'user', content: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history: messages.slice(-10) }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply ?? 'I encountered an issue. Please try again.' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please try again.' },
      ])
    } finally {
      setLoading(false)
      // Re-focus so the next question is one keystroke away.
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  const empty = messages.length === 0

  return (
    // Content area sized so that the fixed-positioned input below never
    // overlaps it. Numbers below are: top bar (60) + main pt (20/32) + gap
    // for the fixed input zone (mobile keeps room for tab bar + disclaimer).
    <>
    {/* ── Lifestyle backdrop ────────────────────────────────────────────
        Rendered OUTSIDE any animated container. Critical: ancestors with a
        `transform` (including the fade-up animation's `translateY(0)`)
        become the containing block for fixed descendants, which would
        clip the photo to the constrained content column. Keeping this
        backdrop as a top-level sibling lets `fixed inset-0` anchor to the
        viewport so the photo truly fills the screen edge-to-edge. */}
    {empty && (
      <div
        aria-hidden
        className={cn(
          'fixed inset-0',
          'overflow-hidden pointer-events-none select-none z-0',
        )}
      >
        <Image
          src="/ask-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          // contrast + saturation pulls the sage greens forward and
          // cuts the misty white haze that's baked into the photograph.
          className="object-cover object-[30%_center] opacity-100 [filter:contrast(1.18)_saturate(1.25)_brightness(0.92)]"
        />
        {/* Sage-dominant tint — multiplies more green into the image and
            deepens the overall tone so the photo stops reading "white". */}
        <div className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(180deg,rgba(168,191,163,0.30)_0%,rgba(111,143,107,0.28)_55%,rgba(90,117,86,0.22)_100%)]" />
        {/* Soft white fade at top + bottom so the glass nav and tab bar
            land on a near-white surface (no harsh seam where the photo
            meets the bar). Matches the deployment look. */}
        <div className="absolute inset-x-0 top-0 h-[60px] bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[180px] bg-[linear-gradient(0deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.55)_45%,rgba(255,255,255,0)_100%)]" />
      </div>
    )}

    <div
      className={cn(
        'relative z-10 max-w-2xl mx-auto flex flex-col fade-up',
        'h-[calc(100dvh-252px)] lg:h-[calc(100dvh-176px)]',
      )}
    >
      {empty ? (
        // ── EMPTY STATE ────────────────────────────────────────────────────
        <div className="relative flex-1 flex flex-col justify-center min-h-0">
          {/* ── Header text — floats directly over the photo, no panel ──── */}
          <div className="relative stagger">
            <div className="text-center mb-7 [text-shadow:0_1px_2px_rgba(255,255,255,0.5)]">
              <div className="inline-block mb-4 [text-shadow:none]">
                <IntelligenceMark size="xl" thinking={loading} />
              </div>
              <div className="text-eyebrow uppercase text-sage-deep mb-2">Ask Anything</div>
              <h1 className="font-sans text-h1 text-ink tracking-tight">
                Your personal{' '}
                <span className="italic-accent">health AI.</span>
              </h1>
              <p className="text-body-sm text-ink-2 mt-2 mx-auto max-w-[42ch]">
                Grounded in your wearables, blood results and daily check-ins.
              </p>
            </div>

            <div className="flex items-center gap-2.5 mb-3 px-1">
              <span className="h-px flex-1 bg-[rgba(26,28,26,0.18)]" />
              <span className="text-eyebrow uppercase text-ink-2 tracking-wider [text-shadow:0_1px_2px_rgba(255,255,255,0.5)]">
                Try asking
              </span>
              <span className="h-px flex-1 bg-[rgba(26,28,26,0.18)]" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {SUGGESTED.map((s) => (
                <button
                  key={s.text}
                  onClick={() => send(s.text)}
                  className={cn(
                    'group relative flex items-start gap-3 px-3.5 py-3.5 text-left',
                    'rounded-2xl border-2',
                    // Frosted-glass surface: light translucent tone gradient
                    // + backdrop blur so the photo dominates and shows
                    // clearly through the cards. A crisp 2px tone border
                    // gives each card a defined, deliberate edge.
                    s.bg,
                    s.border,
                    'backdrop-blur-xl backdrop-saturate-150',
                    '[box-shadow:inset_0_1px_0_rgba(255,255,255,0.55),0_1px_0_rgba(26,28,26,0.04),0_10px_24px_-8px_rgba(26,28,26,0.10)]',
                    'hover:-translate-y-[1px] hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.65),0_1px_0_rgba(26,28,26,0.04),0_14px_32px_-8px_rgba(26,28,26,0.14)]',
                    'transition-all tap',
                  )}
                >
                  <IconBadge icon={s.icon} tone={s.tone} size="md" variant="gradient" />
                  <span className="text-caption font-semibold text-ink leading-snug pt-0.5">
                    {s.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // ── CONVERSATION STATE ─────────────────────────────────────────────
        <>
          <header className="shrink-0 flex items-center gap-3 pb-3 mb-3 border-b border-line">
            <IntelligenceMark size="md" thinking={loading} />
            <div className="min-w-0 flex-1">
              <div className="text-eyebrow uppercase text-sage-deep leading-none mb-1">
                Ask Anything
              </div>
              <div className="text-body-sm text-ink font-medium leading-none">
                Your health AI
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMessages([])}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-pill',
                'text-caption text-ink-3 hover:text-ink-2',
                'hover:bg-[rgba(26,28,26,0.04)] transition-colors',
              )}
              aria-label="Start a new chat"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
              <span>New</span>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto space-y-3 min-h-0 pr-1">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {m.role === 'assistant' && (
                  <div className="mr-2 mt-1 hidden sm:block shrink-0">
                    <IntelligenceMark size="sm" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[85%] px-4 py-2.5 rounded-card text-body-sm leading-[1.6]',
                    m.role === 'user'
                      ? 'bg-grad-sage text-white font-medium rounded-tr-md shadow-[0_2px_10px_-2px_rgba(111,143,107,0.45)]'
                      : 'bg-white border border-line text-ink rounded-tl-md shadow-card',
                  )}
                >
                  {m.content.split('\n').map((line, j, arr) => (
                    <span key={j}>
                      {line}
                      {j < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="mr-2 mt-1 hidden sm:block shrink-0">
                  <IntelligenceMark size="sm" thinking />
                </div>
                <div className="px-4 py-3 rounded-card bg-white border border-line shadow-card flex items-center gap-1.5">
                  {[0, 0.15, 0.3].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 rounded-full bg-sage animate-blink"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </>
      )}

    </div>

    {/* Input — fixed just above the mobile tab bar (and near the viewport
        bottom on desktop). Sits outside the flex container so the gap below
        it is precise rather than driven by the layout's pb-32. */}
    <div
      className={cn(
        'fixed left-0 right-0 z-30 px-4 sm:px-6 pointer-events-none',
        'bottom-[calc(72px+env(safe-area-inset-bottom))] lg:bottom-5',
      )}
    >
      <div className="max-w-2xl mx-auto pointer-events-auto">
        {/*
          Input pill — "hollow" perimeter design.
          • Pure white interior.
          • 2px coloured sage gradient ring around the outside.
          • Colours flow gently around the perimeter (animated via a CSS
            @property angle — the DIV itself never rotates, so nothing can
            ever leak outside the pill's bounds).
          • A faint breathing shadow (1px ring + small soft halo) keeps it
            feeling alive without bleeding colour into the white space.
          See `.input-pill` in globals.css for the full implementation.
        */}
        <div className="input-pill flex items-end gap-2 p-1.5 pl-5">

          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your health…"
            rows={1}
            className="flex-1 bg-transparent text-ink text-body-sm placeholder:text-ink-3 outline-none resize-none leading-relaxed py-2 pr-1 relative"
            style={{ maxHeight: '120px' }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className={cn(
              'relative w-10 h-10 rounded-[18px] flex items-center justify-center shrink-0',
              'bg-grad-sage text-white shadow-button',
              'hover:opacity-95 active:scale-[0.97]',
              'disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none',
              'transition-all',
            )}
            aria-label="Send"
          >
            <Send className="w-4 h-4" strokeWidth={2.25} />
          </button>
        </div>

        <p className="text-center text-[9.5px] leading-none tracking-wide text-ink-3/80 mt-1.5 lg:hidden">
          Private · educational only · not medical advice
        </p>
      </div>
    </div>
    </>
  )
}
