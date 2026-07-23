'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Brain,
  Sparkles,
  Moon,
  Wind,
  Activity,
  Heart,
  Leaf,
  TrendingUp,
  ArrowRight,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { IconBadge, type IconBadgeTone } from '@/components/ui/icon-badge'
import type { WearableMetrics } from '@/lib/wearable-metrics'
import { cn } from '@/lib/utils'

type Checkin = { date: string; energy: number; sleep: number; mood: number; stress: number }
type Tone = IconBadgeTone
type Impact = 'high' | 'medium' | 'low' | 'moderate'

type PatternRow = {
  id: string
  type: string
  description: string
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  scoreImpact: number | null
}

type LearnedFact = { id: string; section: string; text: string }

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
  patterns: PatternRow[]
  learnedFacts: LearnedFact[]
  wearableMetrics: WearableMetrics
  checkinCount: number
  patternMinCheckins: number
}

export function InsightsClient({
  healthScore,
  recentCheckins,
  patterns,
  learnedFacts,
  wearableMetrics,
  checkinCount,
  patternMinCheckins,
}: InsightsClientProps) {
  const [tab, setTab] = useState<Tab>('today')
  const primary = pickPrimaryInsight({
    patterns,
    checkins: recentCheckins,
    wearableMetrics,
    healthScore,
    checkinCount,
    patternMinCheckins,
  })

  return (
    <div className="max-w-3xl mx-auto fade-up space-y-5">
      <header className="relative pt-2 pb-1">
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
      </header>

      {primary && (
        <Card variant="premium" padding="lg" className="relative overflow-hidden">
          <div className="flex items-start gap-3">
            <IconBadge icon={Sparkles} tone="sage" variant="tint" size="md" />
            <div className="flex-1 min-w-0">
              <div className="text-eyebrow uppercase text-sage-deep mb-1">Primary insight</div>
              <div className="font-serif text-[20px] sm:text-[22px] text-ink leading-snug tracking-tight">
                {primary.title}
              </div>
              <p className="text-[13px] text-ink-2 leading-snug mt-1.5">{primary.body}</p>
            </div>
          </div>
        </Card>
      )}

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
                    ? 'btn-sage text-white'
                    : 'text-ink-2 tile tile-hover',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {tab === 'today' && (
        <TodayTab checkins={recentCheckins} wearableMetrics={wearableMetrics} />
      )}
      {tab === 'patterns' && (
        <PatternsTab
          patterns={patterns}
          checkinCount={checkinCount}
          patternMinCheckins={patternMinCheckins}
        />
      )}
      {tab === 'predictions' && <PredictionsTab patterns={patterns} checkinCount={checkinCount} />}
      {tab === 'knows' && <KnowsTab facts={learnedFacts} />}
    </div>
  )
}

function pickPrimaryInsight(input: {
  patterns: PatternRow[]
  checkins: Checkin[]
  wearableMetrics: WearableMetrics
  healthScore: number | null
  checkinCount: number
  patternMinCheckins: number
}): { title: string; body: string } | null {
  const { patterns, checkins, wearableMetrics: wm, healthScore, checkinCount, patternMinCheckins } =
    input

  const top = [...patterns].sort((a, b) => {
    const rank = (c: string) => (c === 'HIGH' ? 3 : c === 'MEDIUM' ? 2 : 1)
    return rank(b.confidence) - rank(a.confidence) || (b.scoreImpact ?? 0) - (a.scoreImpact ?? 0)
  })[0]
  if (top) {
    return {
      title: top.description,
      body: `Strongest association in your data so far (${top.confidence.toLowerCase()} confidence). Educational only — not a diagnosis.`,
    }
  }

  if (wm.recovery != null && wm.recovery < 45) {
    return {
      title: 'Recovery looks lower than usual on your latest wearable sync.',
      body: 'Worth watching sleep and strain over the next couple of days as you keep logging.',
    }
  }
  if (wm.hrv != null && checkins[0] && checkins[0].stress >= 7) {
    return {
      title: 'Higher stress check-ins are showing up alongside your latest HRV reading.',
      body: 'Keep tracking both — patterns often become clearer after a week of consistent data.',
    }
  }
  if (checkins.length >= 2) {
    const dEnergy = checkins[0].energy - checkins[1].energy
    if (dEnergy <= -2) {
      return {
        title: 'Energy dipped versus yesterday’s check-in.',
        body: 'A single day isn’t a pattern yet — a few more check-ins will show whether this sticks.',
      }
    }
  }
  if (healthScore != null && checkinCount < patternMinCheckins) {
    return {
      title: `Health score is ${Math.round(healthScore)} — patterns unlock at ${patternMinCheckins} check-ins.`,
      body: `You’ve logged ${checkinCount}. Keep going to unlock sleep/stress ↔ energy/mood associations.`,
    }
  }
  if (checkinCount === 0 && !wm.hrv && !wm.steps) {
    return {
      title: 'Connect a wearable or log a check-in to start.',
      body: 'Insights stay empty until we have real data — we won’t invent patterns.',
    }
  }
  return {
    title: 'Still gathering signal.',
    body: 'As check-ins and wearables accumulate, your primary insight will focus on the strongest real association — not a demo script.',
  }
}

function EmptyState({
  title,
  body,
  href,
  cta,
}: {
  title: string
  body: string
  href?: string
  cta?: string
}) {
  return (
    <Card variant="glass" padding="lg">
      <div className="flex flex-col items-start gap-3 py-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(111,143,107,0.12)] ring-1 ring-[rgba(111,143,107,0.22)]">
          <Leaf className="w-4 h-4 text-sage-deep" strokeWidth={2.25} />
        </div>
        <div>
          <div className="font-sans text-[15px] font-semibold text-ink">{title}</div>
          <p className="text-[13px] text-ink-2 leading-snug mt-1 max-w-[46ch]">{body}</p>
        </div>
        {href && cta && (
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 mt-1 px-3.5 h-9 rounded-pill text-white bg-grad-sage text-[12.5px] font-medium"
          >
            {cta}
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
          </Link>
        )}
      </div>
    </Card>
  )
}

function TodayTab({
  checkins,
  wearableMetrics,
}: {
  checkins: Checkin[]
  wearableMetrics: WearableMetrics
}) {
  const drivers = todayDrivers(checkins, wearableMetrics)
  if (drivers.length === 0) {
    return (
      <div className="space-y-5">
        <HeroIntroCard
          eyebrow="Why it matters"
          lead="Here's what's"
          accent="influencing your health today."
          body="These are the key factors impacting your recovery and wellbeing right now."
          decoration="leaves"
        />
        <EmptyState
          title="Not enough recent data yet"
          body="Log a few daily check-ins or connect a wearable so we can show what’s moving your score today."
          href="/checkin"
          cta="Log today’s check-in"
        />
      </div>
    )
  }

  const focus = drivers
    .filter((d) => d.impact === 'high' || d.impact === 'moderate' || d.impact === 'medium')
    .slice(0, 2)
    .map((d) => d.label.toLowerCase())

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
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile"
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
                <p className="text-[12.5px] text-ink-2 leading-snug mt-1">{d.reason}</p>
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

        {focus.length > 0 && (
          <div className="mt-4 flex items-start gap-2.5 rounded-card tile px-3.5 py-3">
            <Sparkles className="w-3.5 h-3.5 text-sage-deep mt-0.5 shrink-0" strokeWidth={2.25} />
            <p className="text-[12.5px] text-ink leading-snug flex-1 min-w-0">
              Focusing on{' '}
              <span className="font-semibold text-sage-deep">{focus.join(' and ')}</span>{' '}
              looks like the highest-leverage move from your recent data.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

function PatternsTab({
  patterns,
  checkinCount,
  patternMinCheckins,
}: {
  patterns: PatternRow[]
  checkinCount: number
  patternMinCheckins: number
}) {
  const iconFor = (type: string): { icon: LucideIcon; tone: Tone } => {
    if (type.includes('sleep')) return { icon: Moon, tone: 'violet' }
    if (type.includes('stress')) return { icon: Wind, tone: 'teal' }
    if (type.includes('mood')) return { icon: Heart, tone: 'rose' }
    return { icon: Activity, tone: 'sky' }
  }

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Patterns & connections"
        lead="Your habits show clear"
        accent="patterns and connections."
        body="These are associations we found in your check-in history — educational, not causal."
        decoration="circles"
      />

      {patterns.length === 0 ? (
        <EmptyState
          title={
            checkinCount < patternMinCheckins
              ? `Patterns unlock after ${patternMinCheckins} check-ins`
              : 'No clear patterns yet'
          }
          body={
            checkinCount < patternMinCheckins
              ? `You’ve logged ${checkinCount} of ${patternMinCheckins} days. Keep checking in — we’ll surface sleep/stress ↔ energy/mood links when the signal is strong enough.`
              : 'We looked at your recent check-ins but didn’t find associations above the confidence floor. Keep logging — patterns emerge with consistency.'
          }
          href="/checkin"
          cta="Log a check-in"
        />
      ) : (
        <Card variant="glass" padding="lg">
          <div className="space-y-3">
            {patterns.map((p) => {
              const { icon, tone } = iconFor(p.type)
              return (
                <div
                  key={p.id}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile"
                >
                  <IconBadge icon={icon} tone={tone} variant="tint" size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                      {p.description}
                    </div>
                    <p className="text-[12px] text-ink-3 leading-snug mt-1">
                      Confidence: {p.confidence.toLowerCase()}
                      {p.scoreImpact != null ? ` · impact score ${p.scoreImpact}` : ''}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide shrink-0',
                      p.confidence === 'HIGH'
                        ? 'bg-[rgba(111,143,107,0.14)] text-sage-deep'
                        : p.confidence === 'MEDIUM'
                          ? 'bg-[rgba(167,117,48,0.14)] text-[#A77530]'
                          : 'bg-[rgba(26,28,26,0.06)] text-ink-2',
                    )}
                  >
                    {p.confidence === 'HIGH' ? 'Strong' : p.confidence === 'MEDIUM' ? 'Moderate' : 'Weak'}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}

function PredictionsTab({
  patterns,
  checkinCount,
}: {
  patterns: PatternRow[]
  checkinCount: number
}) {
  const confidenceStyle: Record<string, string> = {
    HIGH:   'bg-[rgba(111,143,107,0.14)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.24)]',
    MEDIUM: 'bg-[rgba(167,117,48,0.14)] text-[#A77530] ring-1 ring-inset ring-[rgba(167,117,48,0.22)]',
    LOW:    'bg-[rgba(26,28,26,0.06)] text-ink-2 ring-1 ring-inset ring-[rgba(26,28,26,0.10)]',
  }

  // Honest framing: these are lag associations restated as forward-looking notes —
  // not a forecasting engine (ENG-007). No invented charts or percentages.
  const predictions = patterns.slice(0, 3).map((p) => ({
    key: p.id,
    icon: p.type.includes('sleep') ? Moon : p.type.includes('stress') ? Wind : TrendingUp,
    tone: (p.type.includes('sleep') ? 'violet' : p.type.includes('stress') ? 'teal' : 'sage') as Tone,
    title: p.description,
    detail:
      'Based on a past association in your check-ins — if the link continues, similar days may show a similar next-day effect. Not a forecast model.',
    confidence: p.confidence,
  }))

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Predictions"
        lead="Early signals from"
        accent="patterns we’ve already found."
        body="These are educational restatements of detected associations — not clinical forecasts."
        decoration="mountains"
      />

      {predictions.length === 0 ? (
        <EmptyState
          title="No predictions yet"
          body={
            checkinCount < 7
              ? 'Predictions appear once we have enough check-ins to detect a pattern.'
              : 'We’ll surface likely next-day effects when a pattern clears the confidence floor.'
          }
          href="/checkin"
          cta="Keep checking in"
        />
      ) : (
        <Card variant="glass" padding="lg">
          <div className="space-y-3">
            {predictions.map((p) => (
              <div
                key={p.key}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile"
              >
                <IconBadge icon={p.icon} tone={p.tone} variant="tint" size="md" />
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                    {p.title}
                  </div>
                  <p className="text-[12px] text-ink-3 leading-snug mt-1">{p.detail}</p>
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
                    {p.confidence === 'HIGH' ? 'High' : p.confidence === 'MEDIUM' ? 'Medium' : 'Low'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

function KnowsTab({ facts }: { facts: LearnedFact[] }) {
  const toneCycle: Tone[] = ['sky', 'violet', 'teal', 'amber', 'sage']
  const iconCycle: LucideIcon[] = [CalendarDays, Moon, Wind, Heart, Activity]

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Knows about you"
        lead="A summary of what"
        accent="BioSense has learned about you."
        body="Facts from Learning Mode and registration — not invented demo traits."
        decoration="brain"
      />

      {facts.length === 0 ? (
        <EmptyState
          title="Nothing learned yet"
          body="Complete a few Learning Mode answers or keep chatting — durable facts you share will show up here."
          href="/chat"
          cta="Open Learning Mode"
        />
      ) : (
        <Card variant="glass" padding="lg">
          <div className="space-y-3">
            {facts.map((f, i) => (
              <Link
                key={f.id}
                href="/chat"
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile tile-hover group"
              >
                <IconBadge
                  icon={iconCycle[i % iconCycle.length]}
                  tone={toneCycle[i % toneCycle.length]}
                  variant="tint"
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                    {f.text}
                  </div>
                  <p className="text-[12px] text-ink-3 leading-snug mt-1 capitalize">
                    From {f.section.replace(/_/g, ' ')}
                  </p>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-ink-3 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.25}
                />
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

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
          <p className="text-caption text-ink-2 mt-2 leading-snug max-w-[42ch]">{body}</p>
        </div>
        <HeroDecoration kind={decoration} />
      </div>
    </Card>
  )
}

function HeroDecoration({ kind }: { kind: 'leaves' | 'circles' | 'mountains' | 'brain' }) {
  if (kind === 'circles') {
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
  return (
    <div className="relative w-[88px] h-[88px] shrink-0">
      <Leaf className="absolute top-2 right-6 w-7 h-7 text-sage-deep rotate-[18deg]" strokeWidth={1.5} />
      <Leaf className="absolute top-8 right-2 w-9 h-9 text-sage rotate-[-12deg]" strokeWidth={1.5} />
      <Leaf className="absolute bottom-2 right-8 w-5 h-5 text-sage-soft rotate-[35deg]" strokeWidth={1.5} />
    </div>
  )
}

type TodayDriver = {
  key: string
  label: string
  reason: string
  impact: Impact
  icon: LucideIcon
  tone: Tone
}

function todayDrivers(checkins: Checkin[], wm: WearableMetrics): TodayDriver[] {
  if (checkins.length < 2 && wm.hrv == null && wm.steps == null && wm.recovery == null) {
    return []
  }

  const drivers: TodayDriver[] = []

  if (checkins.length >= 2) {
    const recent = checkins.slice(0, 3)
    const older = checkins.slice(3, 7)
    const avg = (arr: Checkin[], k: keyof Checkin) =>
      arr.length ? arr.reduce((s, c) => s + (c[k] as number), 0) / arr.length : 0
    const dSleep = avg(recent, 'sleep') - (older.length ? avg(older, 'sleep') : avg(recent, 'sleep'))
    const dStress = avg(recent, 'stress') - (older.length ? avg(older, 'stress') : avg(recent, 'stress'))
    const dEnergy = avg(recent, 'energy') - (older.length ? avg(older, 'energy') : avg(recent, 'energy'))

    drivers.push({
      key: 'sleep',
      label: 'Sleep',
      reason:
        dSleep < -0.3
          ? 'Recent sleep ratings are below your earlier average.'
          : dSleep > 0.3
            ? 'Sleep ratings have been trending up versus earlier this week.'
            : 'Sleep ratings are roughly in line with your recent baseline.',
      impact: Math.abs(dSleep) >= 1.2 ? 'high' : Math.abs(dSleep) >= 0.5 ? 'moderate' : 'low',
      icon: Moon,
      tone: 'violet',
    })
    drivers.push({
      key: 'stress',
      label: 'Stress',
      reason:
        dStress > 0.3
          ? 'Stress check-ins have been elevated versus earlier days.'
          : dStress < -0.3
            ? 'Stress ratings have eased compared with earlier this week.'
            : 'Stress is close to your recent baseline.',
      impact: Math.abs(dStress) >= 1.2 ? 'high' : Math.abs(dStress) >= 0.5 ? 'moderate' : 'low',
      icon: Wind,
      tone: 'teal',
    })
    drivers.push({
      key: 'energy',
      label: 'Energy',
      reason:
        dEnergy < -0.3
          ? 'Energy has dipped versus your earlier check-ins.'
          : dEnergy > 0.3
            ? 'Energy is trending higher than earlier this week.'
            : 'Energy is holding near your recent average.',
      impact: Math.abs(dEnergy) >= 1.2 ? 'high' : Math.abs(dEnergy) >= 0.5 ? 'moderate' : 'low',
      icon: Activity,
      tone: 'sky',
    })
  }

  if (wm.hrv != null) {
    drivers.push({
      key: 'hrv',
      label: 'HRV',
      reason: `Latest wearable HRV ≈ ${Math.round(wm.hrv)} ms.`,
      impact: wm.hrv < 40 ? 'high' : wm.hrv < 55 ? 'moderate' : 'low',
      icon: Heart,
      tone: 'rose',
    })
  }
  if (wm.recovery != null) {
    drivers.push({
      key: 'recovery',
      label: 'Recovery',
      reason: `Latest recovery / readiness ≈ ${Math.round(wm.recovery)}.`,
      impact: wm.recovery < 40 ? 'high' : wm.recovery < 60 ? 'moderate' : 'low',
      icon: Activity,
      tone: 'sage',
    })
  }
  if (wm.steps != null) {
    drivers.push({
      key: 'steps',
      label: 'Activity',
      reason: `Latest step count ≈ ${Math.round(wm.steps).toLocaleString()}.`,
      impact: wm.steps < 4000 ? 'moderate' : 'low',
      icon: Activity,
      tone: 'sky',
    })
  }

  return drivers.slice(0, 5)
}
