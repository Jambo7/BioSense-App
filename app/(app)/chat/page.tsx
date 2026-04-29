'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Sparkles,
  MessageSquare,
  Zap,
  Moon,
  Heart,
  Target,
  Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED: { text: string; icon: React.ElementType; tone: 'sage' | 'amber' | 'rose' | 'ink' }[] = [
  { text: 'Why was my energy low last week?',     icon: Zap,    tone: 'amber' },
  { text: 'How can I improve my sleep?',           icon: Moon,   tone: 'sage'  },
  { text: 'What\'s impacting my recovery?',        icon: Heart,  tone: 'rose'  },
  { text: 'How close am I to my goal?',            icon: Target, tone: 'ink'   },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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
    <div className="max-w-2xl mx-auto flex flex-col min-h-[calc(100vh-180px)] fade-up">
      {/* Header */}
      <header className="flex items-start gap-4 mb-6 shrink-0">
        <IconBadge icon={Sparkles} size="xl" tone="sage" />
        <div className="flex-1">
          <div className="text-eyebrow uppercase text-sage-deep mb-1">Ask Anything</div>
          <h1 className="font-sans text-h1 text-ink tracking-tight">
            Your personal{' '}
            <span className="italic-accent">health AI.</span>
          </h1>
          <p className="text-body-sm text-ink-2 mt-2 max-w-[58ch]">
            Conversational insights built on your wearable, blood and check-in data.
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 space-y-4 mb-4">
        {empty && (
          <div className="space-y-5">
            <div className="rounded-card bg-sage-wash border border-accent-ring p-5 flex gap-3">
              <IconBadge icon={MessageSquare} tone="sage" size="md" />
              <div>
                <div className="text-body font-semibold text-ink mb-1">
                  Ask anything about your health.
                </div>
                <p className="text-caption text-ink-2 leading-[1.65]">
                  I have access to your recent check-ins, blood results, wearable data and patterns.
                  All replies are educational only — never medical advice.
                </p>
              </div>
            </div>

            <div>
              <div className="text-eyebrow uppercase text-ink-3 mb-3">Try asking</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SUGGESTED.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => send(s.text)}
                    className="group flex items-center gap-3 px-3.5 py-3 rounded-card bg-white border border-line hover:border-line-2 hover:bg-off-white transition-all text-left"
                  >
                    <IconBadge icon={s.icon} tone={s.tone} size="sm" />
                    <span className="text-body-sm text-ink-2 group-hover:text-ink leading-snug">
                      {s.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            {m.role === 'assistant' && (
              <div className="mr-2 mt-1 hidden sm:block">
                <IconBadge icon={Sparkles} tone="sage" size="sm" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[85%] px-4 py-3 rounded-card text-body-sm leading-[1.7]',
                m.role === 'user'
                  ? 'bg-sage text-white font-medium rounded-tr-sm'
                  : 'bg-white border border-line text-ink rounded-tl-sm',
              )}
            >
              {m.content.split('\n').map((line, j) => (
                <span key={j}>
                  {line}
                  {j < m.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="mr-2 mt-1 hidden sm:block">
              <IconBadge icon={Sparkles} tone="sage" size="sm" />
            </div>
            <div className="px-4 py-3 rounded-card bg-white border border-line flex items-center gap-1.5">
              {[0, 0.15, 0.3].map((delay) => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full bg-ink-3 animate-blink"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-24 lg:bottom-6 shrink-0">
        <div className="flex items-end gap-2.5 rounded-pill p-2 pl-5 bg-white border border-line shadow-card focus-within:border-accent-ring transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your health, trends, recovery, sleep or goals…"
            rows={1}
            className="flex-1 bg-transparent text-ink text-body-sm placeholder:text-ink-3 outline-none resize-none leading-relaxed py-2"
            style={{ maxHeight: '120px' }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-sage text-white hover:bg-sage-deep disabled:opacity-40 transition-all"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-2.5">
          <Pill tone="ink" size="sm">
            <Lock className="w-2.5 h-2.5" />
            Private · personal · built around you
          </Pill>
        </div>
      </div>
    </div>
  )
}
