'use client'

import Link from 'next/link'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  FileText,
  Activity,
  Zap,
  Moon,
  Smile,
  Flame,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { SparkLine } from '@/components/ui/spark-line'
import { Pill } from '@/components/ui/pill'
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

const ICONS: Record<MetricSlug, LucideIcon> = {
  score:  Activity,
  energy: Zap,
  sleep:  Moon,
  mood:   Smile,
  stress: Flame,
}

// Soft tinted backgrounds keyed off tone — gives each panel a hint of
// personality while staying inside the brand palette.
const TONE_TINT: Record<MetricSummary['tone'], string> = {
  sage:  'rgba(168,191,163,0.10)',
  amber: 'rgba(217,160,91,0.09)',
  rose:  'rgba(201,122,122,0.09)',
  ink:   'rgba(26,28,26,0.04)',
}
const TONE_ICON_BG: Record<MetricSummary['tone'], string> = {
  sage:  'linear-gradient(180deg,#A8BFA3 0%,#6F8F6B 100%)',
  amber: 'linear-gradient(180deg,#E5B477 0%,#C88A45 100%)',
  rose:  'linear-gradient(180deg,#D49595 0%,#B86B6B 100%)',
  ink:   'linear-gradient(180deg,#3A3D3A 0%,#1A1C1A 100%)',
}

export function TrendsClient({ summaries, windowDays, reportsCount }: TrendsClientProps) {
  return (
    <div className="max-w-2xl mx-auto fade-up space-y-4 stagger">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="mb-1">
        <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-1.5">
          <TrendingUp className="w-3.5 h-3.5" strokeWidth={2} />
          Trends · last {windowDays} days
        </div>
        <h1 className="font-sans text-[26px] sm:text-h1 text-ink tracking-tight leading-[1.1]">
          How you&apos;re{' '}
          <span className="italic-accent">changing.</span>
        </h1>
      </header>

      {/* ── Metric panels ──────────────────────────────────────────────── */}
      <div className="space-y-3">
        {summaries.map((m) => (
          <TrendPanel key={m.slug} m={m} />
        ))}
      </div>

      {/* ── AI Reports entry point ─────────────────────────────────────── */}
      <Link href="/reports/ai" className="block group">
        <Card
          padding="md"
          variant="glass-sage"
          className="tap flex items-center gap-3 mt-2"
        >
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-button"
            style={{ background: TONE_ICON_BG.sage }}
          >
            <FileText className="w-4 h-4 text-white" strokeWidth={2.25} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-body-sm font-semibold text-ink leading-tight">
              AI reports
            </div>
            <div className="text-caption text-ink-2 leading-snug">
              {reportsCount > 0
                ? `${reportsCount} weekly & monthly summaries on file`
                : 'Weekly Sunday 7am · monthly end-of-month'}
            </div>
          </div>
          <ArrowRight
            className="w-4 h-4 text-sage-deep shrink-0 transition-transform group-hover:translate-x-0.5"
          />
        </Card>
      </Link>
    </div>
  )
}

/* ── Single trend panel ───────────────────────────────────────────────── */

function TrendPanel({ m }: { m: MetricSummary }) {
  const Icon = ICONS[m.slug]
  const decimals = m.range[1] >= 50 ? 0 : 1

  const empty = m.points < 2

  // For chart range we want a stable visual baseline: pad the visible
  // range a little either side of the metric's possible range.
  const chartTone = m.tone === 'ink' ? 'ink' : m.tone

  return (
    <Link
      href={`/reports/${m.slug}`}
      className="block group"
      aria-label={`Open ${m.label} detail view`}
    >
      <Card
        padding="md"
        variant="glass-strong"
        className="tap relative overflow-hidden"
      >
        {/* Soft tint wash for personality */}
        <div
          className="absolute inset-0 pointer-events-none rounded-card"
          style={{ background: TONE_TINT[m.tone] }}
          aria-hidden
        />

        <div className="relative">
          {/* Header row */}
          <div className="flex items-center gap-3">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-button"
              style={{ background: TONE_ICON_BG[m.tone] }}
            >
              <Icon className="w-[15px] h-[15px] text-white" strokeWidth={2.25} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-body-sm font-semibold text-ink leading-tight">
                {m.label}
              </div>
              <div className="text-caption text-ink-3 leading-snug truncate">
                {m.hint}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-ink-3 group-hover:text-sage-deep transition-colors shrink-0" />
          </div>

          {/* Value + delta + chart row */}
          <div className="mt-3 flex items-end gap-4">
            {/* Latest value + delta */}
            <div className="shrink-0 min-w-[88px]">
              {empty ? (
                <div className="text-h3 text-ink-3 leading-none tabular-nums">—</div>
              ) : (
                <div className="font-sans text-[28px] sm:text-h2 font-bold text-ink leading-none tabular-nums tracking-tight">
                  {m.latest!.toFixed(decimals)}
                  <span className="text-caption font-medium text-ink-3 ml-1 align-middle">
                    {m.unit}
                  </span>
                </div>
              )}
              <div className="mt-2">
                <DeltaPill delta={m.delta} improving={m.improving} decimals={decimals} />
              </div>
            </div>

            {/* Sparkline fills remaining space */}
            <div className="flex-1 min-w-0 relative h-[58px]">
              {empty ? (
                <div className="h-full flex items-center justify-center">
                  <span className="text-caption text-ink-3 italic">
                    Need more check-ins
                  </span>
                </div>
              ) : (
                <SparkLine
                  values={m.values}
                  width={400}
                  height={58}
                  tone={chartTone}
                  showFill
                  showDots={m.values.length <= 14}
                  highlightLast
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

function DeltaPill({
  delta,
  improving,
  decimals,
}: {
  delta: number | null
  improving: boolean | null
  decimals: number
}) {
  if (delta === null) {
    return (
      <Pill tone="ink" size="sm" className="!bg-[rgba(26,28,26,0.04)]">
        <Minus className="w-3 h-3" strokeWidth={2.25} />
        new data
      </Pill>
    )
  }

  if (improving === null) {
    return (
      <Pill tone="ink" size="sm" className="!bg-[rgba(26,28,26,0.04)]">
        <Minus className="w-3 h-3" strokeWidth={2.25} />
        flat
      </Pill>
    )
  }

  const Arrow = improving ? TrendingUp : TrendingDown
  const tone = improving ? 'soft-sage' : 'rose'

  return (
    <Pill tone={tone} size="sm">
      <Arrow className="w-3 h-3" strokeWidth={2.25} />
      <span className="tabular-nums">
        {delta > 0 ? '+' : '−'}{Math.abs(delta).toFixed(decimals)}
      </span>
      <span className="opacity-80">7d</span>
    </Pill>
  )
}
