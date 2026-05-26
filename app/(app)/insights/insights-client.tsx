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
  Coffee,
  UtensilsCrossed,
  Droplets,
  Sun,
  ChevronRight,
  TrendingUp,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { cn } from '@/lib/utils'

type Checkin = { date: string; energy: number; sleep: number; mood: number; stress: number }

type Impact = 'high' | 'medium' | 'low'
type Tone = 'sage' | 'amber' | 'rose' | 'ink'
type Driver = {
  key: string
  label: string
  reason: string
  impact: Impact
  delta: number
  icon: LucideIcon
  tone: Tone
}

const IMPACT_STYLE: Record<Impact, string> = {
  high:   'bg-[rgba(168,84,84,0.12)] text-[#A85454] ring-1 ring-inset ring-[rgba(168,84,84,0.22)]',
  medium: 'bg-[rgba(167,117,48,0.12)] text-[#A77530] ring-1 ring-inset ring-[rgba(167,117,48,0.22)]',
  low:    'bg-[rgba(111,143,107,0.12)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.24)]',
}
const IMPACT_BAR: Record<Impact, string> = {
  high:   'linear-gradient(90deg,#E5B5B5 0%,#A85454 100%)',
  medium: 'linear-gradient(90deg,#EDC68A 0%,#A77530 100%)',
  low:    'linear-gradient(90deg,#A8BFA3 0%,#5A7556 100%)',
}
const IMPACT_LABEL: Record<Impact, string> = {
  high:   'High impact',
  medium: 'Medium impact',
  low:    'Low impact',
}

// Mirrors the Dashboard's topDrivers() heuristic so both surfaces stay in
// sync. When we wire a real driver-attribution model, both call sites swap
// to it together.
function topDrivers(checkins: Checkin[]): Driver[] {
  if (checkins.length < 2) return []
  const recent = checkins.slice(0, 3)
  const older  = checkins.slice(3, 7)
  const avg = (arr: Checkin[], k: keyof Checkin) =>
    arr.length ? arr.reduce((s, c) => s + (c[k] as number), 0) / arr.length : 0
  const dSleep  = avg(recent, 'sleep')  - avg(older, 'sleep')
  const dStress = avg(recent, 'stress') - avg(older, 'stress')
  const dEnergy = avg(recent, 'energy') - avg(older, 'energy')
  const dMood   = avg(recent, 'mood')   - avg(older, 'mood')

  const raw: Driver[] = [
    {
      key: 'sleep_timing',
      label: 'Sleep timing',
      reason: dSleep < 0
        ? 'Inconsistent bedtime is reducing sleep quality.'
        : 'Consistent bedtime is supporting deep sleep.',
      impact: 'low',
      delta: Math.round(dSleep * 6),
      icon: Moon,
      tone: dSleep < 0 ? 'rose' : 'sage',
    },
    {
      key: 'stress',
      label: 'Stress',
      reason: dStress > 0
        ? 'Elevated stress is keeping your body in high alert.'
        : 'Calmer days are letting your nervous system reset.',
      impact: 'low',
      delta: Math.round(-dStress * 5),
      icon: Wind,
      tone: dStress > 0 ? 'rose' : 'sage',
    },
    {
      key: 'activity_balance',
      label: 'Activity balance',
      reason: dMood < 0
        ? "You've pushed hard with limited recovery time."
        : "You're balancing intensity with rest well.",
      impact: 'low',
      delta: Math.round(dMood * 4),
      icon: Activity,
      tone: dMood < 0 ? 'amber' : 'sage',
    },
    {
      key: 'hrv',
      label: 'HRV',
      reason: dEnergy < 0
        ? 'Slightly below your usual range.'
        : 'Tracking inside your healthy range.',
      impact: 'low',
      delta: Math.round(dEnergy * 3),
      icon: Heart,
      tone: dEnergy < 0 ? 'amber' : 'sage',
    },
  ]

  const ranked = raw.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
  return ranked.map((d) => {
    const mag = Math.abs(d.delta)
    const impact: Impact = mag >= 10 ? 'high' : mag >= 5 ? 'medium' : 'low'
    return { ...d, impact }
  })
}

function summaryHeadline(drivers: Driver[]) {
  const neg = drivers.filter((d) => d.delta < 0)
  const pos = drivers.filter((d) => d.delta > 0)
  if (neg.length >= 2) {
    return {
      lead: 'Your recovery is lower today mainly due to ',
      highlight: `${neg[0].label.toLowerCase()} and ${neg[1].label.toLowerCase()}.`,
      tail: 'These factors are impacting your HRV and recovery quality more than usual.',
      tone: 'rose' as const,
    }
  }
  if (pos.length >= 2) {
    return {
      lead: 'Your recovery is improving thanks to ',
      highlight: `${pos[0].label.toLowerCase()} and ${pos[1].label.toLowerCase()}.`,
      tail: "These factors are supporting your body's daily rebuild process.",
      tone: 'sage' as const,
    }
  }
  return {
    lead: 'Your recovery is ',
    highlight: 'tracking steadily.',
    tail: "No big shifts today — consistency is itself a win.",
    tone: 'sage' as const,
  }
}

type Tab = 'why' | 'patterns' | 'correlations' | 'learn'
const TABS: { id: Tab; label: string }[] = [
  { id: 'why',          label: 'Why it matters' },
  { id: 'patterns',     label: 'Patterns'       },
  { id: 'correlations', label: 'Correlations'   },
  { id: 'learn',        label: 'Learn about you'},
]

interface InsightsClientProps {
  healthScore: number | null
  recentCheckins: Checkin[]
}

export function InsightsClient({ healthScore, recentCheckins }: InsightsClientProps) {
  const [tab, setTab] = useState<Tab>('why')
  const drivers = topDrivers(recentCheckins)
  const summary = summaryHeadline(drivers)

  // Max absolute delta drives bar width relative scaling.
  const maxAbs = Math.max(1, ...drivers.map((d) => Math.abs(d.delta)))

  return (
    <div className="max-w-3xl mx-auto fade-up space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-1 pt-1">
        <div>
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-none">
            Insights
          </h1>
          <p className="text-caption text-ink-2 mt-1.5">
            Understand what&apos;s driving your health.
          </p>
        </div>
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-1.5 h-8 px-3 rounded-pill',
            'text-[12px] font-medium text-ink-2',
            'bg-white ring-1 ring-line shadow-[0_1px_2px_rgba(26,28,26,0.04)]',
            'hover:ring-[rgba(168,191,163,0.55)] transition-colors',
          )}
        >
          Insights settings
          <Settings className="w-3 h-3" strokeWidth={2.25} />
        </button>
      </div>

      {/* Tab strip */}
      <div className="relative -mx-1 px-1">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
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
                    : 'text-ink-2 hover:bg-[rgba(26,28,26,0.04)]',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {tab === 'why' && (
        <>
          {/* AI insight summary card */}
          <Card padding="none" className="relative overflow-hidden p-4 sm:p-5">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
              <Sparkles className="w-3 h-3" strokeWidth={2.25} />
              AI insight summary
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[19px] sm:text-[21px] text-ink leading-snug tracking-tight font-bold">
                  {summary.lead}
                  <span
                    className={cn(
                      summary.tone === 'rose' ? 'text-[#A85454]' : 'text-sage-deep',
                    )}
                  >
                    {summary.highlight}
                  </span>
                </p>
                <p className="text-caption text-ink-2 mt-1.5 leading-snug max-w-[44ch]">
                  {summary.tail}
                </p>
              </div>

              {/* Decorative brain ring — small. */}
              <div className="relative w-[88px] h-[88px] shrink-0">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(168,191,163,0.30) 0%, transparent 70%)',
                  }}
                />
                <div className="absolute inset-1 rounded-full bg-white ring-1 ring-[rgba(168,191,163,0.35)] flex items-center justify-center">
                  <Brain className="w-9 h-9 text-sage-deep" strokeWidth={1.5} />
                </div>
                {/* Floating mini badges — quick visual rhythm. */}
                <span className="absolute -top-1 right-1 w-5 h-5 rounded-full bg-violet-100 text-violet-700 ring-1 ring-violet-200 flex items-center justify-center">
                  <Moon className="w-2.5 h-2.5" strokeWidth={2.5} />
                </span>
                <span className="absolute bottom-0 -right-1 w-5 h-5 rounded-full bg-amber-100 text-amber-700 ring-1 ring-amber-200 flex items-center justify-center">
                  <Wind className="w-2.5 h-2.5" strokeWidth={2.5} />
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 rounded-card bg-[rgba(168,191,163,0.10)] ring-1 ring-inset ring-[rgba(111,143,107,0.18)] px-3.5 py-2.5">
              <div className="flex items-start gap-2 min-w-0">
                <Sparkles className="w-3.5 h-3.5 text-sage-deep mt-0.5 shrink-0" strokeWidth={2.25} />
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep">
                    Key takeaway
                  </div>
                  <p className="text-[12px] text-ink leading-snug mt-0.5">
                    Improving {drivers[0]?.label.toLowerCase() ?? 'sleep timing'} and managing stress will
                    have the biggest impact on your recovery.
                  </p>
                </div>
              </div>
              <Link
                href="/chat"
                className={cn(
                  'shrink-0 inline-flex items-center gap-1 h-8 px-3 rounded-pill',
                  'text-[11.5px] font-medium text-ink-2 bg-white ring-1 ring-line',
                  'hover:ring-sage-deep hover:text-ink transition-colors whitespace-nowrap',
                )}
              >
                See recommendations
                <ChevronRight className="w-3 h-3" strokeWidth={2.25} />
              </Link>
            </div>
          </Card>

          {/* Top drivers today */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-3">
              <div>
                <CardLabel className="mb-0">Top drivers today</CardLabel>
                <p className="text-caption text-ink-3 mt-0.5">
                  Ranked by impact on your recovery score
                </p>
              </div>
              <Lightbulb className="w-4 h-4 text-ink-3" strokeWidth={1.75} />
            </div>

            <div className="space-y-3">
              {drivers.length === 0 && (
                <p className="text-caption text-ink-3 text-center py-6">
                  Log a few daily check-ins to surface today&apos;s drivers.
                </p>
              )}
              {drivers.map((d) => {
                const widthPct = Math.max(8, Math.round((Math.abs(d.delta) / maxAbs) * 100))
                const positive = d.delta >= 0
                return (
                  <div key={d.key} className="flex items-center gap-3">
                    <IconBadge icon={d.icon} tone={d.tone} variant="tint" size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-ink">{d.label}</span>
                        <span
                          className={cn(
                            'inline-flex items-center px-1.5 py-0.5 rounded-pill text-[9.5px] font-semibold uppercase tracking-wide',
                            IMPACT_STYLE[d.impact],
                          )}
                        >
                          {IMPACT_LABEL[d.impact]}
                        </span>
                      </div>
                      <div className="text-[11.5px] text-ink-3 leading-snug mt-0.5 line-clamp-1">
                        {d.reason}
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-pill bg-[rgba(26,28,26,0.05)] overflow-hidden">
                        <div
                          className="h-full rounded-pill"
                          style={{
                            width: `${widthPct}%`,
                            background: IMPACT_BAR[d.impact],
                            transition: 'width 900ms cubic-bezier(0.16,1,0.3,1)',
                          }}
                        />
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div
                        className={cn(
                          'text-[13px] font-bold tabular-nums leading-none',
                          positive ? 'text-sage-deep' : 'text-[#A85454]',
                        )}
                      >
                        {positive ? '+' : ''}{d.delta} pts
                      </div>
                      <ChevronRight className="w-3 h-3 text-ink-3 inline-block mt-0.5" strokeWidth={2.25} />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* What's contributing (supporting factors) */}
          <Card padding="md">
            <CardLabel>What&apos;s contributing (supporting factors)</CardLabel>
            <div className="grid grid-cols-3 gap-2">
              <SupportingFactor
                icon={Coffee}
                tone="sage"
                label="Caffeine timing"
                body="Caffeine after 2pm may be affecting your sleep depth."
                status="Possible impact"
                statusTone="amber"
              />
              <SupportingFactor
                icon={UtensilsCrossed}
                tone="amber"
                label="Nutrition"
                body="Lower carb intake may be contributing to stress."
                status="Possible impact"
                statusTone="amber"
              />
              <SupportingFactor
                icon={Droplets}
                tone="sage"
                label="Hydration"
                body="Hydration looks good today."
                status="Neutral"
                statusTone="sage"
              />
            </div>
          </Card>

          {/* How this played out — timeline strip */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-3">
              <div>
                <CardLabel className="mb-0">How this played out</CardLabel>
                <p className="text-caption text-ink-3 mt-0.5">
                  A timeline of yesterday → today
                </p>
              </div>
              <span className="text-[11px] font-medium text-ink-2 px-2.5 py-1 rounded-pill bg-white ring-1 ring-line">
                Yesterday → Today
              </span>
            </div>

            {/* Tick marks */}
            <div className="relative px-2">
              <div className="flex justify-between text-[10px] text-ink-3 mb-1">
                {['7am', '12pm', '6pm', '11pm', '7am (Today)'].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="h-px bg-[rgba(26,28,26,0.08)] relative">
                {/* Dots */}
                {[0, 25, 50, 75, 100].map((pct, i) => {
                  const colors = ['#6F8F6B', '#A77530', '#A85454', '#7B68C7', '#A77530']
                  return (
                    <span
                      key={i}
                      className="absolute -top-[3px] w-2 h-2 rounded-full ring-2 ring-white"
                      style={{ left: `calc(${pct}% - 4px)`, background: colors[i] }}
                    />
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1.5 mt-3">
              <TimelineCell tone="sage"  title="Good energy"    sub="HRV in normal range" />
              <TimelineCell tone="amber" title="Caffeine at 2:30pm" sub="May impact sleep later" />
              <TimelineCell tone="rose"  title="High stress"    sub="Elevated cortisol" />
              <TimelineCell tone="ink"   title="Late bedtime"   sub="12:15am (inconsistent)" />
              <TimelineCell tone="amber" title="Lower recovery" sub="HRV down, stress high" />
            </div>

            <Link
              href="/reports"
              className="mt-3 inline-flex items-center gap-1 text-caption text-sage-deep font-medium hover:underline"
            >
              <Sun className="w-3.5 h-3.5" strokeWidth={2.25} />
              See full timeline analysis
              <ChevronRight className="w-3 h-3" strokeWidth={2.25} />
            </Link>
          </Card>
        </>
      )}

      {tab !== 'why' && <TabPlaceholder tab={tab} />}
    </div>
  )
}

function SupportingFactor({
  icon: Icon,
  tone,
  label,
  body,
  status,
  statusTone,
}: {
  icon: LucideIcon
  tone: Tone
  label: string
  body: string
  status: string
  statusTone: Tone
}) {
  const statusBg =
    statusTone === 'amber' ? 'bg-[rgba(167,117,48,0.10)] text-[#A77530]'
    : statusTone === 'rose'  ? 'bg-[rgba(168,84,84,0.10)] text-[#A85454]'
    : 'bg-[rgba(111,143,107,0.10)] text-sage-deep'
  return (
    <div className="rounded-card bg-[rgba(168,191,163,0.06)] ring-1 ring-inset ring-[rgba(26,28,26,0.05)] p-2.5">
      <div className="flex items-center justify-between">
        <IconBadge icon={Icon} tone={tone} variant="tint" size="sm" />
        <ChevronRight className="w-3 h-3 text-ink-3" strokeWidth={2.25} />
      </div>
      <div className="text-[11px] font-semibold text-ink mt-1.5 leading-tight">{label}</div>
      <p className="text-[10px] text-ink-3 leading-snug mt-0.5 line-clamp-2">{body}</p>
      <span
        className={cn(
          'inline-flex items-center mt-2 px-1.5 py-0.5 rounded-pill text-[9.5px] font-medium',
          statusBg,
        )}
      >
        {status}
      </span>
    </div>
  )
}

function TimelineCell({ tone, title, sub }: { tone: Tone; title: string; sub: string }) {
  const bg =
    tone === 'sage'  ? 'bg-[rgba(168,191,163,0.18)]'
    : tone === 'amber' ? 'bg-[rgba(237,198,138,0.22)]'
    : tone === 'rose'  ? 'bg-[rgba(229,181,181,0.22)]'
    : 'bg-[rgba(123,104,199,0.16)]'
  const accent =
    tone === 'sage'  ? 'text-sage-deep'
    : tone === 'amber' ? 'text-[#A77530]'
    : tone === 'rose'  ? 'text-[#A85454]'
    : 'text-[#7B68C7]'
  return (
    <div className={cn('rounded-card p-2', bg)}>
      <div className={cn('text-[10.5px] font-semibold leading-tight', accent)}>{title}</div>
      <div className="text-[9.5px] text-ink-3 leading-snug mt-0.5 line-clamp-2">{sub}</div>
    </div>
  )
}

function TabPlaceholder({ tab }: { tab: Tab }) {
  const copy: Record<Tab, { title: string; body: string; icon: LucideIcon }> = {
    why: {
      title: 'Why it matters',
      body: 'The current tab.',
      icon: Lightbulb,
    },
    patterns: {
      title: 'Patterns',
      body: 'Recurring rhythms across your daily metrics — when stress peaks, how sleep cycles, how recovery follows training.',
      icon: TrendingUp,
    },
    correlations: {
      title: 'Correlations',
      body: 'Surfaces relationships between two metrics — e.g. how caffeine timing affects deep sleep, or how step count relates to HRV the next morning.',
      icon: Sparkles,
    },
    learn: {
      title: 'Learn about you',
      body: 'A growing library of personalised lessons — your chronotype, training response, stress profile and how your numbers compare to your healthy baseline.',
      icon: Brain,
    },
  }
  const { title, body, icon: Icon } = copy[tab]
  return (
    <Card padding="lg" className="text-center">
      <div className="w-12 h-12 mx-auto rounded-full bg-sage-tint ring-1 ring-accent-ring flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-sage-deep" strokeWidth={1.75} />
      </div>
      <h3 className="font-sans text-h3 text-ink tracking-tight">{title}</h3>
      <p className="text-body-sm text-ink-2 max-w-[40ch] mx-auto mt-1.5">{body}</p>
      <p className="text-caption text-sage-deep mt-3 font-medium">Coming soon</p>
    </Card>
  )
}
