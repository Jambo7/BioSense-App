'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Zap,
  Moon,
  Heart,
  ArrowUp,
  ArrowUpRight,
  Plus,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { IntelligenceMark } from '@/components/brand-mark'
import { RichText } from '@/components/ui/rich-text'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Chip {
  text: string
  icon: LucideIcon
}

// 3 clean chips below the input (matches image 4 in the v6 brief).
const SUGGESTED: Chip[] = [
  { text: 'Why is my recovery low?', icon: Zap   },
  { text: 'Best pre-workout meals?', icon: Heart },
  { text: 'How can I sleep better?', icon: Moon  },
]

/**
 * The Chat tab of the AI section.
 *
 * Empty state mirrors image 4 of the v6 brief:
 *   · sage-tinted hero card
 *   · greeting + intro copy
 *   · single inline input pill (NOT floating)
 *   · 3 suggestion chips below the input
 *
 * Once a conversation is in progress, the layout switches to a standard
 * scrolling thread with a fixed input pill anchored above the bottom tab
 * bar — the way every chat app on earth does it.
 */
export function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const heroInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    // Auto-focus whichever input is currently visible.
    if (messages.length === 0) heroInputRef.current?.focus()
    else inputRef.current?.focus()
  }, [messages.length])

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

  // ── EMPTY STATE — clean hero card, no floating elements ─────────────
  if (empty) {
    return (
      <div className="relative">
        <div
          className={cn(
            'relative overflow-hidden rounded-card',
            'bg-[linear-gradient(180deg,rgba(220,232,217,0.55)_0%,rgba(244,247,242,0.85)_100%)]',
            'ring-1 ring-inset ring-[rgba(168,191,163,0.40)]',
            'shadow-[0_1px_2px_rgba(26,28,26,0.04),0_8px_28px_-12px_rgba(111,143,107,0.30)]',
            'p-5 sm:p-6',
          )}
        >
          {/* Soft sage glow in the top-right behind the bot mark */}
          <div
            aria-hidden
            className="absolute -top-10 -right-10 w-[180px] h-[180px] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(168,191,163,0.45) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          <div className="relative flex items-start gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <div className="text-eyebrow uppercase text-sage-deep mb-1.5">
                Your Health AI
              </div>
              <h2 className="font-sans text-[22px] sm:text-[26px] text-ink tracking-tight leading-[1.15] font-bold">
                Hi, I&apos;m here to{' '}
                <span className="italic-accent text-sage-deep font-normal">
                  help you feel your best.
                </span>
              </h2>
              <p className="text-caption text-ink-2 mt-2 leading-snug max-w-[44ch]">
                Ask me anything about your health, recovery, training, nutrition
                and more.
              </p>
            </div>

            {/* Brand mark — tucked into the top-right */}
            <div className="shrink-0 -mt-1 hidden sm:block">
              <IntelligenceMark size="lg" thinking={loading} />
            </div>
          </div>

          {/* Inline input pill — sits INSIDE the hero card */}
          <div className="relative">
            <div className="input-pill flex items-end gap-2 p-1.5 pl-4 bg-white">
              <textarea
                ref={heroInputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your Health AI anything…"
                rows={1}
                className="flex-1 bg-transparent text-ink text-body-sm placeholder:text-ink-3 outline-none resize-none leading-relaxed py-2 pr-1"
                style={{ maxHeight: '120px' }}
              />
              <button
                type="button"
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className={cn(
                  'relative w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                  'bg-grad-sage text-white',
                  'shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_2px_4px_rgba(40,56,38,0.18),0_8px_18px_-3px_rgba(111,143,107,0.55)]',
                  'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.40),0_2px_6px_rgba(40,56,38,0.22),0_10px_22px_-3px_rgba(111,143,107,0.65)]',
                  'hover:scale-[1.03] active:scale-[0.97]',
                  'disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100',
                  'transition-all',
                )}
                aria-label="Send"
              >
                <ArrowUp className="w-4 h-4" strokeWidth={2.75} />
              </button>
            </div>
          </div>

          {/* Suggestion rows — quick-action style. Full-width on purpose,
              with a clear left icon disc + right chevron so the form factor
              reads as deliberate (not as a chip that stretched too far).
              Soft sage tint, no ring — feels lighter & on-brand. */}
          <div className="relative mt-4 space-y-2">
            {SUGGESTED.map((s) => {
              const Icon = s.icon
              return (
                <button
                  key={s.text}
                  type="button"
                  onClick={() => send(s.text)}
                  className={cn(
                    'group w-full flex items-center gap-3 h-12 pl-2 pr-3.5 rounded-pill text-left',
                    'bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(244,247,242,0.85)_100%)]',
                    'shadow-[0_1px_2px_rgba(26,28,26,0.04),0_4px_14px_-6px_rgba(111,143,107,0.18)]',
                    'hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(232,240,228,0.95)_100%)]',
                    'hover:shadow-[0_1px_2px_rgba(26,28,26,0.05),0_8px_22px_-6px_rgba(111,143,107,0.30)]',
                    'hover:-translate-y-px active:translate-y-0 transition-all',
                  )}
                >
                  <span
                    className={cn(
                      'w-9 h-9 rounded-full flex items-center justify-center shrink-0',
                      'bg-[linear-gradient(180deg,rgba(168,191,163,0.32)_0%,rgba(111,143,107,0.18)_100%)]',
                      'ring-1 ring-inset ring-[rgba(168,191,163,0.40)]',
                      'shadow-[inset_0_1px_0_rgba(255,255,255,0.40)]',
                      'group-hover:bg-grad-sage group-hover:text-white group-hover:ring-[rgba(111,143,107,0.55)]',
                      'group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_2px_6px_-1px_rgba(111,143,107,0.45)]',
                      'transition-all',
                    )}
                  >
                    <Icon className="w-4 h-4 text-sage-deep group-hover:text-white transition-colors" strokeWidth={2.25} />
                  </span>
                  <span className="flex-1 text-[13px] font-medium text-ink leading-snug">
                    {s.text}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 text-ink-3 shrink-0 group-hover:text-sage-deep group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    strokeWidth={2.25}
                  />
                </button>
              )
            })}
          </div>
        </div>

        <p className="text-caption text-ink-3 text-center mt-3 px-2 leading-snug">
          Private · educational only · not medical advice
        </p>
      </div>
    )
  }

  // ── CONVERSATION STATE — fixed bottom input, scrolling thread ───────
  return (
    <>
      <div
        className={cn(
          'flex flex-col',
          // Subtract: nav (60) + sticky AI chrome (~100) + bottom tab bar
          // (72) + input pill area (~80). Generous so the thread never
          // sits behind the input.
          'h-[calc(100dvh-320px)] lg:h-[calc(100dvh-240px)]',
        )}
      >
        <header className="shrink-0 flex items-center gap-3 pb-3 mb-3 border-b border-line">
          <IntelligenceMark size="md" thinking={loading} />
          <div className="min-w-0 flex-1">
            <div className="text-eyebrow uppercase text-sage-deep leading-none mb-1">
              Live chat
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
              className={cn(
                'flex items-end gap-2',
                m.role === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              {m.role === 'assistant' && (
                <div className="mb-1 hidden sm:block shrink-0">
                  <IntelligenceMark size="sm" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[85%] inline-block px-4 py-2.5 text-body-sm leading-[1.6] rounded-3xl',
                  m.role === 'user'
                    ? 'bg-grad-sage text-white font-medium rounded-br-md shadow-[0_2px_10px_-2px_rgba(111,143,107,0.45),inset_0_1px_0_rgba(255,255,255,0.22)]'
                    : 'bg-[#F2F4F0] text-ink rounded-bl-md shadow-[0_1px_2px_rgba(26,28,26,0.04),0_4px_14px_-8px_rgba(111,143,107,0.20)]',
                )}
              >
                {m.role === 'assistant' ? (
                  <RichText text={m.content} />
                ) : (
                  m.content.split('\n').map((line, j, arr) => (
                    <span key={j}>
                      {line}
                      {j < arr.length - 1 && <br />}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2 justify-start">
              <div className="mb-1 hidden sm:block shrink-0">
                <IntelligenceMark size="sm" thinking />
              </div>
              <div className="px-4 py-3 rounded-3xl rounded-bl-md bg-[#F2F4F0] shadow-[0_1px_2px_rgba(26,28,26,0.04),0_4px_14px_-8px_rgba(111,143,107,0.20)] flex items-center gap-1.5">
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
      </div>

      {/* Fixed input pill — ONLY in conversation state. */}
      <div
        className={cn(
          'fixed left-0 right-0 z-30 px-4 sm:px-6 pointer-events-none',
          'bottom-[calc(72px+env(safe-area-inset-bottom))] lg:bottom-5',
        )}
      >
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <div className="input-pill flex items-end gap-2 p-1.5 pl-5">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your Health AI anything…"
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
