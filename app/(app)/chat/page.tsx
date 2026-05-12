'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Zap,
  Moon,
  Heart,
  Target,
  Plus,
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
  icon: React.ElementType
  tone: 'sage' | 'amber' | 'rose' | 'ink'
  /** Subtle wash background so each suggestion has a hint of personality. */
  bg: string
}

const SUGGESTED: Suggested[] = [
  { text: 'Why was my energy low last week?', icon: Zap,    tone: 'amber', bg: 'bg-[rgba(217,160,91,0.07)]' },
  { text: 'How can I improve my sleep?',      icon: Moon,   tone: 'sage',  bg: 'bg-[rgba(111,143,107,0.07)]' },
  { text: "What's impacting my recovery?",    icon: Heart,  tone: 'rose',  bg: 'bg-[rgba(201,122,122,0.07)]' },
  { text: 'How close am I to my goal?',       icon: Target, tone: 'ink',   bg: 'bg-[rgba(26,28,26,0.04)]'   },
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
    <div
      className={cn(
        'max-w-2xl mx-auto flex flex-col fade-up',
        'h-[calc(100dvh-252px)] lg:h-[calc(100dvh-176px)]',
      )}
    >
      {empty ? (
        // ── EMPTY STATE ────────────────────────────────────────────────────
        <div className="flex-1 flex flex-col justify-center min-h-0 stagger">
          <div className="text-center mb-7">
            <div className="inline-block mb-4">
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
            <span className="h-px flex-1 bg-line" />
            <span className="text-eyebrow uppercase text-ink-3 tracking-wider">
              Try asking
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {SUGGESTED.map((s) => (
              <button
                key={s.text}
                onClick={() => send(s.text)}
                className={cn(
                  'group flex items-center gap-2.5 px-3 py-2.5 text-left',
                  'rounded-2xl border border-line shadow-card',
                  'hover:border-accent-ring hover:shadow-card-hover',
                  'transition-all tap',
                  s.bg,
                )}
              >
                <IconBadge icon={s.icon} tone={s.tone} size="sm" />
                <span className="text-caption text-ink-2 group-hover:text-ink leading-snug">
                  {s.text}
                </span>
              </button>
            ))}
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
