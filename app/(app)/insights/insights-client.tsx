'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Brain,
  Sparkles,
  Settings,
  Moon,
  Wind,
  Activity,
  Heart,
  Sun,
  Sunrise,
  Cloud,
  Droplet,
  Check,
  Leaf,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { SparkLine } from '@/components/ui/spark-line'
import { cn } from '@/lib/utils'

type Checkin = { date: string; energy: number; sleep: number; mood: number; stress: number }
type Tone = 'sage' | 'amber' | 'rose' | 'ink' | 'violet'
type Impact = 'high' | 'medium' | 'low' | 'moderate'

const IMPACT_STYLE: Record<Impact, string> = {
  high:     'bg-[rgba(168,84,84,0.14)] text-[#A85454] ring-1 ring-inset ring-[rgba(168,84,84,0.22)]',
  medium:   'bg-[rgba(167,117,48,0.14)] text-[#A77530] ring-1 ring-inset ring-[rgba(167,117,48,0.22)]',
  moderate: 'bg-[rgba(167,117,48,0.14)] text-[#A77530] ring-1 ring-inset ring-[rgba(167,117,48,0.22)]',
  low:      'bg-[rgba(111,143,107,0.14)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.24)]',
}
const IMPACT_LABEL: Record<Impact, string> = {
  high:     'High',
  medium:   'Medium',
  moderate: 'Moderate',
  low:      'Low',
}

// ── Tab definitions per v7 spec ───────────────────────────────────────────
type Tab = 'today' | 'patterns' | 'predictions' | 'knows'
const TABS: { id: Tab; label: string }[] = [
  { id: 'today',       label: 'Today'                  },
  { id: 'patterns',    label: 'Patterns & Connections' },
  { id: 'predictions', label: 'Predictions'            },
  { id: 'knows',       label: 'Knows about you'        },
]

interface InsightsClientProps {
  healthScore: number | null
  recentCheckins: Checkin[]
}

export function InsightsClient({ recentCheckins }: InsightsClientProps) {
  const [tab, setTab] = useState<Tab>('today')

  return (
    <div className="max-w-3xl mx-auto fade-up space-y-5">
      {/* Header */}
      <header className="relative pt-2 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-2">
              <Brain className="w-3.5 h-3.5" strokeWidth={2.25} />
              <span>Insights</span>
            </div>
            <h1 className="font-sans text-[28px] sm:text-[34px] text-ink tracking-tight leading-[1.04] max-w-[18ch] font-bold">
              Understand what&apos;s
              <br />
              <span className="italic-accent text-[1.02em] text-sage-deep font-normal">
                driving your health.
              </span>
            </h1>
          </div>
          <button
            type="button"
            className={cn(
              'inline-flex items-center gap-1.5 h-8 px-3 rounded-pill',
              'text-[12px] font-medium text-sage-deep',
              'bg-white/70 backdrop-blur-sm',
              'ring-1 ring-inset ring-[rgba(111,143,107,0.22)]',
              'hover:bg-white transition-colors shrink-0 whitespace-nowrap',
            )}
          >
            <Settings className="w-3 h-3" strokeWidth={2.25} />
            Insights settings
          </button>
        </div>
      </header>

      {/* Tab strip */}
      <div className="relative -mx-1 px-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {TABS.map((t) => {
            const active = t.id === tab
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  'shrink-0 h-9 px-3.5 rounded-pill text-[12.5px] font-medium transition-all',
                  active
                    ? 'bg-grad-sage text-white shadow-button'
                    : 'text-ink-2 hover:bg-white/70 bg-white/40 ring-1 ring-inset ring-[rgba(184,168,144,0.18)]',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {tab === 'today'       && <TodayTab       checkins={recentCheckins} />}
      {tab === 'patterns'    && <PatternsTab    />}
      {tab === 'predictions' && <PredictionsTab />}
      {tab === 'knows'       && <KnowsTab       />}
    </div>
  )
}

// ── Tab 1: TODAY ─────────────────────────────────────────────────────────
// Replaces the old "Why it matters" tab. Surfaces the key factors
// influencing the user's health right now with an impact pill and a
// short reason line per factor.
function TodayTab({ checkins }: { checkins: Checkin[] }) {
  const drivers = todayDrivers(checkins)
  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Why it matters"
        lead="Here's what's"
        accent="influencing your health today."
        body="These are the key factors impacting your recovery and wellbeing right now."
        decoration="leaves"
      />

      <Card variant="glass" padding="lg">
        <div className="space-y-3">
          {drivers.map((d) => (
            <div
              key={d.key}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)]"
            >
              <IconBadge icon={d.icon} tone={d.tone} variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-sans text-[14px] font-semibold text-ink leading-tight">
                    {d.label}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.10em] text-ink-3 shrink-0 hidden sm:block">
                    Impact
                  </span>
                </div>
                <p className="text-[12.5px] text-ink-2 leading-snug mt-1">
                  {d.reason}
                </p>
              </div>
              <span
                className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide shrink-0 self-start mt-1',
                  IMPACT_STYLE[d.impact],
                )}
              >
                {IMPACT_LABEL[d.impact]}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-card bg-[rgba(232,226,214,0.40)] ring-1 ring-inset ring-[rgba(184,168,144,0.22)] px-3.5 py-3">
          <Sparkles className="w-3.5 h-3.5 text-sage-deep mt-0.5 shrink-0" strokeWidth={2.25} />
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] text-ink leading-snug">
              Focusing on{' '}
              <span className="font-semibold text-sage-deep">
                sleep timing
              </span>{' '}
              and{' '}
              <span className="font-semibold text-sage-deep">
                stress management
              </span>{' '}
              will have the biggest positive impact on your recovery.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-ink-3 shrink-0" strokeWidth={2.25} />
        </div>
      </Card>
    </div>
  )
}

// ── Tab 2: PATTERNS & CONNECTIONS ────────────────────────────────────────
function PatternsTab() {
  const patterns = [
    {
      key: 'sleep_recovery',
      icon: Moon,
      tone: 'violet' as Tone,
      title: 'Consistent sleep timing leads to better recovery.',
      detail: 'On nights you go to bed between 9:30pm and 10:30pm, your recovery score is 28% higher on average.',
      delta: '+28%',
      positive: true,
      series: [40, 45, 55, 50, 65, 70, 75, 80, 85],
    },
    {
      key: 'morning_focus',
      icon: Sunrise,
      tone: 'sage' as Tone,
      title: 'Morning activity boosts your focus.',
      detail: 'Days you exercise in the morning, your focus is 22% higher compared to other days.',
      delta: '+22%',
      positive: true,
      series: [50, 55, 60, 65, 60, 70, 75, 78, 82],
    },
    {
      key: 'stress_sleep',
      icon: Cloud,
      tone: 'amber' as Tone,
      title: 'Stress impacts your sleep quality.',
      detail: 'On days with high stress, your sleep quality is 18% lower on average.',
      delta: '-18%',
      positive: false,
      series: [75, 70, 68, 65, 60, 58, 55, 50, 48],
    },
  ]

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Patterns & connections"
        lead="Your habits show clear"
        accent="patterns and connections."
        body="These are the patterns we've found in your data over time."
        decoration="circles"
      />

      <Card variant="glass" padding="lg">
        <div className="space-y-3">
          {patterns.map((p) => (
            <div
              key={p.key}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)]"
            >
              <IconBadge
                icon={p.icon}
                tone={p.tone === 'violet' ? 'sage' : p.tone}
                variant="tint"
                size="md"
              />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                  {p.title}
                </div>
                <p className="text-[12px] text-ink-3 leading-snug mt-1">
                  {p.detail}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span
                  className={cn(
                    'font-sans text-[14px] font-bold tabular-nums leading-none',
                    p.positive ? 'text-sage-deep' : 'text-[#A85454]',
                  )}
                >
                  {p.delta}
                </span>
                <SparkLine
                  values={p.series}
                  width={64}
                  height={26}
                  tone={p.positive ? 'sage' : 'rose'}
                  showFill
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ── Tab 3: PREDICTIONS ───────────────────────────────────────────────────
function PredictionsTab() {
  const predictions = [
    {
      key: 'recovery_improve',
      icon: TrendingUp,
      tone: 'sage' as Tone,
      title: 'Recovery likely to improve in 3-5 days.',
      detail: 'If your sleep timing stays consistent and stress remains managed.',
      confidence: 'High',
    },
    {
      key: 'sleep_decline',
      icon: Moon,
      tone: 'amber' as Tone,
      title: 'Sleep quality may decline later this week.',
      detail: 'A busy schedule and rising stress may impact your sleep Fri-Sat.',
      confidence: 'Medium',
    },
    {
      key: 'hydration_pay_off',
      icon: Droplet,
      tone: 'sage' as Tone,
      title: 'Hydration improvement will pay off.',
      detail: 'Improving your hydration consistently will support better energy and focus.',
      confidence: 'Medium',
    },
  ]

  const confidenceStyle: Record<string, string> = {
    High:   'bg-[rgba(111,143,107,0.14)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.24)]',
    Medium: 'bg-[rgba(167,117,48,0.14)] text-[#A77530] ring-1 ring-inset ring-[rgba(167,117,48,0.22)]',
    Low:    'bg-[rgba(26,28,26,0.06)] text-ink-2 ring-1 ring-inset ring-[rgba(26,28,26,0.10)]',
  }

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Predictions"
        lead="Here's what's likely"
        accent="to happen next."
        body="These predictions are based on your trends and behaviours."
        decoration="mountains"
      />

      <Card variant="glass" padding="lg">
        <div className="space-y-3">
          {predictions.map((p) => (
            <div
              key={p.key}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)]"
            >
              <IconBadge icon={p.icon} tone={p.tone} variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                  {p.title}
                </div>
                <p className="text-[12px] text-ink-3 leading-snug mt-1">
                  {p.detail}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[9.5px] uppercase tracking-[0.10em] text-ink-3">
                  Confidence
                </span>
                <span
                  className={cn(
                    'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide',
                    confidenceStyle[p.confidence],
                  )}
                >
                  {p.confidence}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-card bg-[rgba(232,226,214,0.40)] ring-1 ring-inset ring-[rgba(184,168,144,0.22)] px-3.5 py-3">
          <Sparkles className="w-3.5 h-3.5 text-sage-deep mt-0.5 shrink-0" strokeWidth={2.25} />
          <p className="text-[12.5px] text-ink leading-snug flex-1 min-w-0">
            Small consistent actions today can lead to big improvements in the next few days.
          </p>
          <ArrowRight className="w-4 h-4 text-ink-3 shrink-0" strokeWidth={2.25} />
        </div>
      </Card>
    </div>
  )
}

// ── Tab 4: KNOWS ABOUT YOU ───────────────────────────────────────────────
function KnowsTab() {
  const knowledge = [
    {
      key: 'weekday_consistency',
      icon: CalendarDays,
      title: "You're most consistent on weekdays.",
      detail: 'Your routines are stronger Mon–Fri than weekends.',
    },
    {
      key: 'sleep_need',
      icon: Moon,
      title: 'You need 7-8h of sleep to feel your best.',
      detail: 'Below 7h, your energy and mood drop noticeably.',
    },
    {
      key: 'stress_response',
      icon: Wind,
      title: 'You respond strongly to stress.',
      detail: 'Your HRV drops quickly when stress is high.',
    },
    {
      key: 'protein_response',
      icon: Heart,
      title: 'You perform better with higher protein.',
      detail: 'Higher protein days = better recovery & focus.',
    },
  ]

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Knows about you"
        lead="A summary of what"
        accent="BioSense has learned about you."
        body="This helps us personalise insights and recommendations."
        decoration="brain"
      />

      <Card variant="glass" padding="lg">
        <div className="space-y-3">
          {knowledge.map((k) => (
            <Link
              key={k.key}
              href="/chat"
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)] hover:bg-white/80 hover:ring-[rgba(111,143,107,0.30)] transition-all group"
            >
              <IconBadge icon={k.icon} tone="sage" variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                  {k.title}
                </div>
                <p className="text-[12px] text-ink-3 leading-snug mt-1">
                  {k.detail}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-3 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
            </Link>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-card bg-[rgba(168,191,163,0.14)] ring-1 ring-inset ring-[rgba(111,143,107,0.22)] px-3.5 py-3">
          <Leaf className="w-3.5 h-3.5 text-sage-deep mt-0.5 shrink-0" strokeWidth={2.25} />
          <p className="text-[12.5px] text-ink leading-snug flex-1 min-w-0">
            We&apos;re always learning and will continue to update this as we learn more about you.
          </p>
          <Check className="w-4 h-4 text-sage-deep shrink-0" strokeWidth={2.25} />
        </div>
      </Card>
    </div>
  )
}

// ── Shared: Hero intro card ──────────────────────────────────────────────
// The big premium card at the top of each tab. Serif headline + body +
// decorative element on the right (changes per tab). Sits over the page
// texture and reads as the "anchor" of the tab.
function HeroIntroCard({
  eyebrow,
  lead,
  accent,
  body,
  decoration,
}: {
  eyebrow: string
  lead: string
  accent: string
  body: string
  decoration: 'leaves' | 'circles' | 'mountains' | 'brain'
}) {
  return (
    <Card variant="premium" padding="lg" className="relative overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
            <Leaf className="w-3 h-3" strokeWidth={2.25} />
            {eyebrow}
          </div>
          <div className="font-serif text-[22px] sm:text-[26px] text-ink leading-[1.12] tracking-tight">
            {lead}{' '}
            <span className="italic-accent text-[1em] text-sage-deep">{accent}</span>
          </div>
          <p className="text-caption text-ink-2 mt-2 leading-snug max-w-[42ch]">
            {body}
          </p>
        </div>
        <HeroDecoration kind={decoration} />
      </div>
    </Card>
  )
}

function HeroDecoration({ kind }: { kind: 'leaves' | 'circles' | 'mountains' | 'brain' }) {
  if (kind === 'circles') {
    // Three intersecting sage-tinted circles — a Venn-y connections motif.
    return (
      <div className="relative w-[88px] h-[88px] shrink-0">
        <span className="absolute top-1 left-1 w-12 h-12 rounded-full bg-[rgba(111,143,107,0.20)] ring-1 ring-[rgba(111,143,107,0.30)]" />
        <span className="absolute top-1 right-1 w-12 h-12 rounded-full bg-[rgba(168,191,163,0.20)] ring-1 ring-[rgba(168,191,163,0.30)]" />
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[rgba(200,214,197,0.22)] ring-1 ring-[rgba(168,191,163,0.30)]" />
      </div>
    )
  }
  if (kind === 'mountains') {
    return (
      <div className="relative w-[88px] h-[88px] shrink-0 rounded-full overflow-hidden ring-1 ring-[rgba(168,191,163,0.40)] shadow-[inset_0_2px_6px_rgba(26,28,26,0.10),0_6px_18px_-6px_rgba(111,143,107,0.30)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/insight-mountains.png" alt="" className="w-full h-full object-cover" />
      </div>
    )
  }
  if (kind === 'brain') {
    return (
      <div className="relative w-[88px] h-[88px] shrink-0 rounded-full bg-white/70 ring-1 ring-[rgba(168,191,163,0.40)] shadow-[inset_0_2px_6px_rgba(26,28,26,0.06),0_6px_18px_-6px_rgba(111,143,107,0.25)] flex items-center justify-center">
        <Brain className="w-9 h-9 text-sage-deep" strokeWidth={1.5} />
      </div>
    )
  }
  // leaves (default)
  return (
    <div className="relative w-[88px] h-[88px] shrink-0">
      <Leaf className="absolute top-2 right-6 w-7 h-7 text-sage-deep rotate-[18deg]" strokeWidth={1.5} />
      <Leaf className="absolute top-8 right-2 w-9 h-9 text-sage rotate-[-12deg]" strokeWidth={1.5} />
      <Leaf className="absolute bottom-2 right-8 w-5 h-5 text-sage-soft rotate-[35deg]" strokeWidth={1.5} />
    </div>
  )
}

// ── Today drivers heuristic ──────────────────────────────────────────────
type TodayDriver = {
  key: string
  label: string
  reason: string
  impact: Impact
  icon: LucideIcon
  tone: Tone
}

function todayDrivers(checkins: Checkin[]): TodayDriver[] {
  if (checkins.length < 2) {
    // Friendly defaults that mirror v7 image 3 panel 1.
    return [
      { key: 'sleep',    label: 'Sleep timing', reason: 'You went to bed 52 mins later than your usual average.',  impact: 'high',     icon: Moon,     tone: 'rose'  },
      { key: 'stress',   label: 'Stress',       reason: 'Stress levels have been elevated since yesterday afternoon.', impact: 'high', icon: Wind,     tone: 'rose'  },
      { key: 'hrv',      label: 'HRV',          reason: 'Your 7-day average is slightly below your usual range.',  impact: 'moderate', icon: Heart,    tone: 'amber' },
      { key: 'activity', label: 'Activity',     reason: 'You moved less than usual today.',                        impact: 'low',      icon: Activity, tone: 'sage'  },
    ]
  }
  const recent = checkins.slice(0, 3)
  const older  = checkins.slice(3, 7)
  const avg = (arr: Checkin[], k: keyof Checkin) =>
    arr.length ? arr.reduce((s, c) => s + (c[k] as number), 0) / arr.length : 0
  const dSleep  = avg(recent, 'sleep')  - avg(older, 'sleep')
  const dStress = avg(recent, 'stress') - avg(older, 'stress')
  const dEnergy = avg(recent, 'energy') - avg(older, 'energy')
  const dMood   = avg(recent, 'mood')   - avg(older, 'mood')

  const raw: TodayDriver[] = [
    {
      key: 'sleep',
      label: 'Sleep timing',
      reason: dSleep < 0 ? 'You went to bed later than your usual average.' : 'Bedtime is consistent with your usual rhythm.',
      impact: 'low',
      icon: Moon,
      tone: dSleep < 0 ? 'rose' : 'sage',
    },
    {
      key: 'stress',
      label: 'Stress',
      reason: dStress > 0 ? 'Stress levels have been elevated since yesterday.' : 'Stress has eased over the last few days.',
      impact: 'low',
      icon: Wind,
      tone: dStress > 0 ? 'rose' : 'sage',
    },
    {
      key: 'hrv',
      label: 'HRV',
      reason: dEnergy < 0 ? 'Slightly below your usual range.' : 'Tracking inside your healthy range.',
      impact: 'low',
      icon: Heart,
      tone: dEnergy < 0 ? 'amber' : 'sage',
    },
    {
      key: 'activity',
      label: 'Activity',
      reason: dMood < 0 ? 'You moved less than usual.' : 'Activity is on rhythm with your usual week.',
      impact: 'low',
      icon: Activity,
      tone: dMood < 0 ? 'amber' : 'sage',
    },
  ]

  // Magnitude → impact tag mapping
  const withMags = raw.map((d) => {
    const mag = Math.abs(
      d.key === 'sleep'  ? dSleep * 6 :
      d.key === 'stress' ? dStress * 5 :
      d.key === 'hrv'    ? dEnergy * 3 :
      d.key === 'activity' ? dMood * 4 : 0,
    )
    const impact: Impact = mag >= 8 ? 'high' : mag >= 4 ? 'moderate' : 'low'
    return { ...d, impact }
  })
  return withMags
}
