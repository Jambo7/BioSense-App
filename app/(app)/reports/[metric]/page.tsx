import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  CalendarDays,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { Pill } from '@/components/ui/pill'
import { SparkLine } from '@/components/ui/spark-line'
import {
  computeStats,
  formatValue,
  METRICS,
  type MetricSlug,
  type SeriesPoint,
} from '@/lib/trends'

const VALID_SLUGS = new Set(Object.keys(METRICS))
const WINDOW_DAYS = 90

export default async function MetricDetailPage({
  params,
}: {
  params: Promise<{ metric: string }>
}) {
  const { metric } = await params
  if (!VALID_SLUGS.has(metric)) notFound()
  const slug = metric as MetricSlug
  const meta = METRICS[slug]
  const Icon = meta.icon

  const session = await getServerSession(authOptions)
  if (!session) return null

  const since = new Date()
  since.setDate(since.getDate() - WINDOW_DAYS)

  let series: SeriesPoint[] = []
  if (slug === 'score') {
    const scores = await prisma.healthScore.findMany({
      where: { userId: session.user.id, date: { gte: since } },
      orderBy: { date: 'asc' },
    })
    series = scores.map((s) => ({ date: iso(s.date), value: s.score }))
  } else {
    const checkins = await prisma.dailyCheckin.findMany({
      where: { userId: session.user.id, date: { gte: since } },
      orderBy: { date: 'asc' },
    })
    series = checkins.map((c) => ({
      date: iso(c.date),
      value:
        slug === 'energy' ? c.energy
        : slug === 'sleep'  ? c.sleep
        : slug === 'mood'   ? c.mood
        :                     c.stress,
    }))
  }

  const stats = computeStats(series, !!meta.invert)

  return (
    <div className="max-w-2xl mx-auto fade-up space-y-5">
      {/* Back link */}
      <Link
        href="/reports"
        className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2 transition-colors"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to Trends
      </Link>

      {/* Header */}
      <header className="flex items-start gap-4">
        <span
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-button"
          style={{
            background:
              meta.tone === 'sage'  ? 'linear-gradient(180deg,#A8BFA3 0%,#6F8F6B 100%)'
            : meta.tone === 'amber' ? 'linear-gradient(180deg,#E5B477 0%,#C88A45 100%)'
            : meta.tone === 'rose'  ? 'linear-gradient(180deg,#D49595 0%,#B86B6B 100%)'
            :                         'linear-gradient(180deg,#3A3D3A 0%,#1A1C1A 100%)',
          }}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
        </span>
        <div className="flex-1">
          <div className="text-eyebrow uppercase text-sage-deep mb-1">
            Trend · last {WINDOW_DAYS} days
          </div>
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1]">
            {meta.label}
          </h1>
          <p className="text-body-sm text-ink-2 mt-1.5 leading-relaxed max-w-[58ch]">
            {meta.description}
          </p>
        </div>
      </header>

      {stats.series.length < 2 ? (
        <EmptyState slug={slug} />
      ) : (
        <>
          {/* Hero chart */}
          <Card padding="lg" variant="glass-strong" className="relative overflow-hidden">
            <div className="flex items-end justify-between gap-3 mb-3">
              <div>
                <CardLabel className="mb-1">Latest</CardLabel>
                <div className="font-sans text-[40px] font-bold text-ink leading-none tabular-nums tracking-tight">
                  {formatValue(meta, stats.latest)}
                </div>
              </div>
              <DeltaPill stats={stats} invert={!!meta.invert} unitDecimals={meta.range[1] >= 50 ? 1 : 1} />
            </div>

            <SparkLine
              values={stats.series.map((p) => p.value)}
              width={520}
              height={120}
              tone={meta.tone === 'ink' ? 'ink' : meta.tone}
              showFill
              showDots
              highlightLast
              className="w-full h-auto"
            />

            <div className="mt-3 flex items-center justify-between gap-3 text-caption text-ink-3">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                {fmtRange(stats.series)}
              </span>
              <span className="tabular-nums">
                {stats.series.length} point{stats.series.length === 1 ? '' : 's'}
              </span>
            </div>
          </Card>

          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <StatCell label="Average" value={formatValue(meta, stats.avg)} />
            <StatCell label="Lowest"  value={formatValue(meta, stats.min)} />
            <StatCell label="Highest" value={formatValue(meta, stats.max)} />
          </div>

          {/* Recent entries */}
          <Card padding="md">
            <CardLabel>Recent entries</CardLabel>
            <ul className="divide-y divide-line">
              {stats.series
                .slice()
                .reverse()
                .slice(0, 14)
                .map((p, i) => (
                  <RecentRow
                    key={`${p.date}-${i}`}
                    date={p.date}
                    value={p.value}
                    range={meta.range}
                    tone={meta.tone}
                  />
                ))}
            </ul>
          </Card>
        </>
      )}
    </div>
  )
}

/* ── Helpers ───────────────────────────────────────────────────────────── */

function iso(d: Date) {
  return d.toISOString().split('T')[0]
}

function fmtRange(series: SeriesPoint[]) {
  if (series.length === 0) return ''
  const f = new Date(series[0].date)
  const l = new Date(series[series.length - 1].date)
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
  return `${f.toLocaleDateString('en-GB', opts)} → ${l.toLocaleDateString('en-GB', opts)}`
}

function DeltaPill({
  stats,
  unitDecimals,
}: {
  stats: ReturnType<typeof computeStats>
  invert: boolean
  unitDecimals: number
}) {
  if (stats.delta === null) {
    return (
      <Pill tone="ink" size="md" className="!bg-[rgba(26,28,26,0.04)]">
        <Minus className="w-3 h-3" strokeWidth={2.25} />
        Need more data
      </Pill>
    )
  }
  if (stats.improving === null) {
    return (
      <Pill tone="ink" size="md" className="!bg-[rgba(26,28,26,0.04)]">
        <Minus className="w-3 h-3" strokeWidth={2.25} />
        Stable vs last week
      </Pill>
    )
  }
  const Arrow = stats.improving ? TrendingUp : TrendingDown
  const tone = stats.improving ? 'soft-sage' : 'rose'
  const decimals = unitDecimals
  return (
    <Pill tone={tone} size="md">
      <Arrow className="w-3.5 h-3.5" strokeWidth={2.25} />
      <span className="tabular-nums">
        {stats.delta > 0 ? '+' : '−'}{Math.abs(stats.delta).toFixed(decimals)}
      </span>
      <span className="opacity-80">vs last 7d</span>
    </Pill>
  )
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <Card padding="sm" className="text-center">
      <div className="text-eyebrow uppercase text-ink-3 mb-1.5">{label}</div>
      <div className="font-sans text-h3 text-ink tabular-nums tracking-tight">
        {value}
      </div>
    </Card>
  )
}

function RecentRow({
  date,
  value,
  range,
  tone,
}: {
  date: string
  value: number
  range: [number, number]
  tone: 'sage' | 'amber' | 'rose' | 'ink'
}) {
  const pct = Math.max(2, Math.min(100, ((value - range[0]) / (range[1] - range[0])) * 100))
  const color =
    tone === 'sage'  ? '#6F8F6B'
  : tone === 'amber' ? '#D9A05B'
  : tone === 'rose'  ? '#C97A7A'
  :                    '#1A1C1A'
  const decimals = range[1] >= 50 ? 0 : 1

  const d = new Date(date)
  return (
    <li className="py-2.5 flex items-center gap-3">
      <span className="text-caption text-ink-3 w-20 shrink-0 tabular-nums">
        {d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-[rgba(26,28,26,0.05)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-body-sm font-semibold text-ink tabular-nums w-12 text-right">
        {value.toFixed(decimals)}
      </span>
    </li>
  )
}

function EmptyState({ slug }: { slug: MetricSlug }) {
  const isScore = slug === 'score'
  return (
    <Card padding="lg" className="text-center">
      <div className="font-sans text-h3 text-ink mb-2">
        {isScore ? 'No score history yet' : 'Not enough check-ins yet'}
      </div>
      <p className="text-caption text-ink-2 max-w-[40ch] mx-auto leading-relaxed">
        {isScore
          ? 'Your composite health score builds after a few daily check-ins.'
          : 'Log a few daily check-ins and your trend chart will appear here.'}
      </p>
      <Link
        href="/checkin"
        className="btn-sage mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-pill font-semibold text-caption"
      >
        Start a check-in
      </Link>
    </Card>
  )
}
