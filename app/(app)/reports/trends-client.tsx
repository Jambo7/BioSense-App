'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  TrendingDown,
  Settings,
  ArrowRight,
  Moon,
  Wind,
  Heart,
  Footprints,
  UtensilsCrossed,
  Leaf,
  Sparkles,
  Trophy,
  Plus,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  FileEdit,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'
import { SparkLine } from '@/components/ui/spark-line'
import { IconBadge } from '@/components/ui/icon-badge'
import { type MetricSlug } from '@/lib/trends'

interface MetricSummary {
  slug: MetricSlug
  label: string
  hint: string
  tone: 'sage' | 'amber' | 'rose' | 'ink'
  unit: string
  range: [number, number]
  values: number[]
  latest: number | null
  delta: number | null
  improving: boolean | null
  points: number
}

interface TrendsClientProps {
  summaries: MetricSummary[]
  windowDays: number
  reportsCount: number
}

// ── Tab definitions per v7 spec ───────────────────────────────────────────
type Tab = 'goals' | 'trajectory' | 'lifestyle' | 'reports'
const TABS: { id: Tab; label: string }[] = [
  { id: 'goals',      label: 'Goals'             },
  { id: 'trajectory', label: 'Health trajectory' },
  { id: 'lifestyle',  label: 'Lifestyle trends'  },
  { id: 'reports',    label: 'Reports'           },
]

export function TrendsClient({ summaries, reportsCount }: TrendsClientProps) {
  const [tab, setTab] = useState<Tab>('goals')

  return (
    <div className="max-w-3xl mx-auto fade-up space-y-5">
      {/* Header */}
      <header className="relative pt-2 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-2">
              <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.25} />
              <span>Trends</span>
            </div>
            <h1 className="font-sans text-[28px] sm:text-[34px] text-ink tracking-tight leading-[1.04] max-w-[18ch] font-bold">
              Track progress towards
              <br />
              <span className="italic-accent text-[1.02em] text-sage-deep font-normal">
                what matters to you.
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
            Trends settings
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

      {tab === 'goals'      && <GoalsTab />}
      {tab === 'trajectory' && <TrajectoryTab summaries={summaries} />}
      {tab === 'lifestyle'  && <LifestyleTab summaries={summaries} />}
      {tab === 'reports'    && <ReportsTab reportsCount={reportsCount} />}
    </div>
  )
}

// ── Tab 1: GOALS ─────────────────────────────────────────────────────────
function GoalsTab() {
  const goals = [
    {
      key: 'ironman',
      title: 'Half Ironman readiness',
      pillars: 'Endurance · Recovery · Consistency',
      progress: 72,
      delta: 12,
      tone: 'sage' as const,
      status: 'On track',
      statusTone: 'sage' as const,
    },
    {
      key: 'sleep',
      title: 'Improve sleep consistency',
      pillars: 'Sleep · Routine · Recovery',
      progress: 48,
      delta: 6,
      tone: 'amber' as const,
      status: 'Needs focus',
      statusTone: 'amber' as const,
    },
  ]

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Goals overview"
        lead="You're making"
        accent="steady progress on 2 goals."
        body="Track the goals that matter most to you and see how your daily habits drive them forward."
        decoration="mountains"
      />

      <Card variant="glass" padding="lg">
        <div className="space-y-3">
          {goals.map((g) => (
            <Link
              key={g.key}
              href="/profile"
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)] hover:bg-white/80 transition-all group"
            >
              <ScoreRing
                value={g.progress}
                size={72}
                thickness={7}
                tone={g.tone}
                centerSize={22}
              />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[14.5px] font-semibold text-ink leading-tight">
                  {g.title}
                </div>
                <div className="text-[11.5px] text-ink-3 leading-snug mt-1">
                  {g.pillars}
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={cn(
                    'inline-flex items-center gap-1 text-[11px] font-semibold',
                    g.delta >= 0 ? 'text-sage-deep' : 'text-[#A85454]',
                  )}>
                    {g.delta >= 0 ? <TrendingUp className="w-3 h-3" strokeWidth={2.5} /> : <TrendingDown className="w-3 h-3" strokeWidth={2.5} />}
                    {g.delta >= 0 ? '+' : ''}{g.delta}% vs last 30 days
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide',
                  g.statusTone === 'sage'
                    ? 'bg-[rgba(168,191,163,0.22)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.22)]'
                    : 'bg-[rgba(237,198,138,0.30)] text-[#A77530] ring-1 ring-inset ring-[rgba(217,160,91,0.30)]',
                )}>
                  {g.status}
                </span>
                <ArrowRight className="w-4 h-4 text-ink-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/profile"
          className="mt-4 flex items-center justify-between gap-3 rounded-card bg-[rgba(168,191,163,0.10)] ring-1 ring-inset ring-[rgba(111,143,107,0.22)] px-3.5 py-3 hover:bg-[rgba(168,191,163,0.18)] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/80 ring-1 ring-inset ring-[rgba(111,143,107,0.20)] flex items-center justify-center">
              <Plus className="w-4 h-4 text-sage-deep" strokeWidth={2.25} />
            </div>
            <div>
              <div className="font-sans text-[13px] font-semibold text-ink leading-tight">
                Add a new goal
              </div>
              <div className="text-[11.5px] text-ink-3 leading-snug mt-0.5">
                Set a goal to guide your health journey
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-sage-deep transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
      </Card>
    </div>
  )
}

// ── Tab 2: HEALTH TRAJECTORY ─────────────────────────────────────────────
function TrajectoryTab({ summaries }: { summaries: MetricSummary[] }) {
  const scoreSummary = summaries.find((s) => s.slug === 'score')
  // 90d trajectory: take whatever the score series has + extend with mock if sparse.
  const baseSeries = scoreSummary?.values ?? []
  const series = baseSeries.length >= 8
    ? baseSeries
    : [42, 45, 48, 50, 52, 55, 58, 60, 62, 63, 64]
  const startScore = series[0]
  const endScore   = series[series.length - 1]

  const stats = [
    {
      eyebrow: 'Health score',
      from: `${Math.round(startScore)}`,
      to:   `${Math.round(endScore)}`,
      delta: `+${Math.max(0, Math.round(endScore - startScore))} points`,
      tone: 'sage' as const,
    },
    {
      eyebrow: 'Biological age',
      from: '47',
      to:   '45',
      delta: '-2 years',
      tone: 'sage' as const,
    },
    {
      eyebrow: 'Resilience',
      from: 'Moderate',
      to:   'High',
      delta: '+1 level',
      tone: 'sage' as const,
    },
  ]

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Health trajectory"
        lead="Your long-term health"
        accent="is trending upward."
        body="Sustained improvements over the last 90 days."
        decoration="mountains"
      />

      <Card variant="premium" padding="lg">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
          {stats.map((s) => (
            <div
              key={s.eyebrow}
              className="rounded-[14px] bg-white/65 ring-1 ring-inset ring-[rgba(184,168,144,0.18)] px-3 py-2.5"
            >
              <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-3">
                {s.eyebrow}
              </div>
              <div className="font-serif text-[18px] sm:text-[20px] text-ink leading-none tabular-nums tracking-[-0.02em] mt-1">
                {s.from}{' '}
                <span className="text-ink-3 text-[14px] mx-0.5">→</span>{' '}
                {s.to}
              </div>
              <div className="text-[10.5px] font-semibold text-sage-deep mt-1.5 leading-none">
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <SparkLine
            values={series}
            width={400}
            height={130}
            tone="sage"
            showFill
            highlightLast
            className="w-full h-auto"
          />
          {/* axis labels */}
          <div className="flex items-center justify-between mt-1 text-[9.5px] uppercase tracking-[0.12em] text-ink-3">
            <span>90 days ago</span>
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>

        <Link
          href="/insights"
          className="mt-5 flex items-center justify-between gap-3 rounded-card bg-[rgba(168,191,163,0.14)] ring-1 ring-inset ring-[rgba(111,143,107,0.22)] px-3.5 py-3 hover:bg-[rgba(168,191,163,0.20)] transition-colors group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Sparkles className="w-4 h-4 text-sage-deep shrink-0" strokeWidth={2.25} />
            <span className="text-[13px] font-semibold text-ink truncate">
              What&apos;s driving your improvement
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-sage-deep shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
      </Card>
    </div>
  )
}

// ── Tab 3: LIFESTYLE TRENDS ──────────────────────────────────────────────
function LifestyleTab({ summaries }: { summaries: MetricSummary[] }) {
  // Real series where available; deterministic mock fallback for everything else
  // (especially the metrics we don't yet have a wearable feed for).
  const findSeries = (slug: MetricSlug, fallback: number[]) => {
    const s = summaries.find((x) => x.slug === slug)
    return s && s.values.length >= 4 ? s.values : fallback
  }

  const lifestyle: {
    key: string
    icon: LucideIcon
    title: string
    value: string
    delta: string
    deltaPositive: boolean
    tone: 'sage' | 'amber' | 'rose'
    series: number[]
  }[] = [
    {
      key: 'sleep_consistency',
      icon: Moon,
      title: 'Sleep consistency',
      value: '78%',
      delta: '+16%',
      deltaPositive: true,
      tone: 'sage',
      series: findSeries('sleep', [6, 6.5, 7, 7.2, 7.4, 7.6, 7.5, 7.8]),
    },
    {
      key: 'stress',
      icon: Wind,
      title: 'Stress levels',
      value: 'Low-Mod',
      delta: '-12%',
      deltaPositive: true,
      tone: 'sage',
      series: findSeries('stress', [7, 6.5, 6, 5.5, 5.5, 5, 4.8, 4.5]).map((v) => 10 - v),
    },
    {
      key: 'activity',
      icon: Footprints,
      title: 'Activity',
      value: '7,842 steps',
      delta: '-5%',
      deltaPositive: false,
      tone: 'amber',
      series: [7200, 8400, 7800, 9100, 8200, 7500, 7800, 7842],
    },
    {
      key: 'nutrition',
      icon: UtensilsCrossed,
      title: 'Nutrition',
      value: 'Good',
      delta: '+9%',
      deltaPositive: true,
      tone: 'sage',
      series: [62, 65, 68, 70, 72, 74, 75, 76],
    },
    {
      key: 'recovery',
      icon: Heart,
      title: 'Recovery',
      value: '68 avg',
      delta: '+11%',
      deltaPositive: true,
      tone: 'sage',
      series: findSeries('mood', [55, 58, 60, 62, 64, 66, 67, 68]),
    },
  ]

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Lifestyle trends"
        lead="Your key habits"
        accent="over the last 90 days."
        body="Each row shows the trend, the value today and the change vs the previous 90 days."
        decoration="leaves"
      />

      <Card variant="glass" padding="lg">
        <div className="space-y-3">
          {lifestyle.map((l) => (
            <div
              key={l.key}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)]"
            >
              <IconBadge icon={l.icon} tone={l.tone} variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                  {l.title}
                </div>
                <div className="mt-1">
                  <SparkLine
                    values={l.series}
                    width={140}
                    height={26}
                    tone={l.deltaPositive ? 'sage' : 'amber'}
                    showFill
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0 min-w-[80px]">
                <span className="font-sans text-[13.5px] font-semibold text-ink leading-none tabular-nums whitespace-nowrap">
                  {l.value}
                </span>
                <span className={cn(
                  'inline-flex items-center gap-0.5 text-[11px] font-semibold leading-none',
                  l.deltaPositive ? 'text-sage-deep' : 'text-[#A85454]',
                )}>
                  {l.deltaPositive ? <TrendingUp className="w-3 h-3" strokeWidth={2.5} /> : <TrendingDown className="w-3 h-3" strokeWidth={2.5} />}
                  {l.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/insights"
          className="mt-4 flex items-center justify-between gap-3 rounded-card bg-[rgba(168,191,163,0.14)] ring-1 ring-inset ring-[rgba(111,143,107,0.22)] px-3.5 py-3 hover:bg-[rgba(168,191,163,0.20)] transition-colors group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Sparkles className="w-4 h-4 text-sage-deep shrink-0" strokeWidth={2.25} />
            <span className="text-[13px] font-semibold text-ink truncate">
              See deeper dive
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-sage-deep shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
      </Card>
    </div>
  )
}

// ── Tab 4: REPORTS ───────────────────────────────────────────────────────
function ReportsTab({ reportsCount }: { reportsCount: number }) {
  const reports = [
    {
      key: 'weekly',
      icon: CalendarDays,
      title: 'Weekly summary',
      date: '12 - 18 May 2025',
      detail: 'Recovery improved, stress trended lower and sleep was more consistent.',
      tone: 'sage' as const,
    },
    {
      key: 'monthly',
      icon: CalendarRange,
      title: 'Monthly summary',
      date: 'April 2025',
      detail: 'Strong progress across recovery and activity.',
      tone: 'amber' as const,
    },
    {
      key: 'quarterly',
      icon: CalendarClock,
      title: 'Quarterly summary',
      date: 'Q1 2025',
      detail: 'Your long-term health is on an upward path.',
      tone: 'sage' as const,
    },
  ]

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Reports"
        lead="Your journey"
        accent="at a glance."
        body={
          reportsCount > 0
            ? `${reportsCount} report${reportsCount === 1 ? '' : 's'} on file. Tap a card to read the full write-up.`
            : 'Weekly summaries land Sundays. Monthly summaries land at the end of every month.'
        }
        decoration="leaves"
      />

      <Card variant="glass" padding="lg">
        <div className="space-y-3">
          {reports.map((r) => (
            <Link
              key={r.key}
              href="/reports/ai"
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)] hover:bg-white/80 transition-all group"
            >
              <IconBadge icon={r.icon} tone={r.tone} variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                    {r.title}
                  </div>
                  <span className="text-[10.5px] uppercase tracking-[0.10em] text-ink-3 shrink-0">
                    {r.date}
                  </span>
                </div>
                <p className="text-[12px] text-ink-3 leading-snug mt-1">
                  {r.detail}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-3 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
            </Link>
          ))}
        </div>

        <Link
          href="/reports/ai"
          className="mt-4 flex items-center justify-between gap-3 rounded-card bg-[rgba(168,191,163,0.14)] ring-1 ring-inset ring-[rgba(111,143,107,0.22)] px-3.5 py-3 hover:bg-[rgba(168,191,163,0.20)] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/80 ring-1 ring-inset ring-[rgba(111,143,107,0.20)] flex items-center justify-center">
              <FileEdit className="w-4 h-4 text-sage-deep" strokeWidth={2.25} />
            </div>
            <div>
              <div className="font-sans text-[13px] font-semibold text-ink leading-tight">
                Custom report
              </div>
              <div className="text-[11.5px] text-ink-3 leading-snug mt-0.5">
                Choose a date range. Compare metrics and track what matters most to you.
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-sage-deep shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
      </Card>
    </div>
  )
}

// ── Shared: hero intro card ──────────────────────────────────────────────
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
  decoration: 'leaves' | 'mountains' | 'trophy'
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

function HeroDecoration({ kind }: { kind: 'leaves' | 'mountains' | 'trophy' }) {
  if (kind === 'mountains') {
    return (
      <div className="relative w-[88px] h-[88px] shrink-0 rounded-full overflow-hidden ring-1 ring-[rgba(168,191,163,0.40)] shadow-[inset_0_2px_6px_rgba(26,28,26,0.10),0_6px_18px_-6px_rgba(111,143,107,0.30)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/insight-mountains.png" alt="" className="w-full h-full object-cover" />
      </div>
    )
  }
  if (kind === 'trophy') {
    return (
      <div className="relative w-[88px] h-[88px] shrink-0 rounded-full bg-white/70 ring-1 ring-[rgba(168,191,163,0.40)] flex items-center justify-center">
        <Trophy className="w-9 h-9 text-sage-deep" strokeWidth={1.5} />
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
