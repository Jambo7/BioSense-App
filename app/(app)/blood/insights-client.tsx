'use client'

import Link from 'next/link'
import {
  Upload,
  ListChecks,
  History,
  Sparkles,
  ArrowRight,
  CalendarDays,
  Droplets,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { SparkLine } from '@/components/ui/spark-line'
import { BloodDonut } from '@/components/ui/blood-donut'

interface InsightsClientProps {
  hasResult: boolean
  drawDate: string | null
  totalCount: number
  t1: number
  t2: number
  t3: number
  history: { date: string; inRangePct: number }[]
  historyTotal: number
}

const ACTIONS: {
  href: string
  label: string
  hint: string
  icon: typeof Upload
  tone: 'sage' | 'rose' | 'amber' | 'ink'
}[] = [
  {
    href: '/blood/upload',
    label: 'Upload PDF',
    hint: 'Add a new lab',
    icon: Upload,
    tone: 'sage',
  },
  {
    href: '/blood/markers',
    label: 'Biomarkers',
    hint: 'Browse the list',
    icon: ListChecks,
    tone: 'rose',
  },
  {
    href: '/blood/history',
    label: 'History',
    hint: 'Past results',
    icon: History,
    tone: 'amber',
  },
  {
    href: '/chat',
    label: 'Ask AI',
    hint: 'Explain results',
    icon: Sparkles,
    tone: 'ink',
  },
]

function formatDrawDate(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function InsightsClient({
  hasResult,
  drawDate,
  totalCount,
  t1,
  t2,
  t3,
  history,
  historyTotal,
}: InsightsClientProps) {
  // Whole page is a flex column sized to the viewport (minus the topbar
  // and the bottom tab bar) so everything fits in one screen on mobile.
  return (
    <div
      className={cn(
        'max-w-2xl mx-auto flex flex-col fade-up',
        'h-[calc(100dvh-180px)] lg:h-[calc(100dvh-140px)]',
      )}
    >
      {/* ── Compact header ─────────────────────────────────────────────── */}
      <header className="shrink-0 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-1.5">
          <Droplets className="w-3.5 h-3.5" strokeWidth={2} />
          Insights · Blood
        </div>
        <h1 className="font-sans text-[26px] sm:text-h1 text-ink tracking-tight leading-[1.1]">
          Your blood,{' '}
          <span className="italic-accent">decoded.</span>
        </h1>
      </header>

      {/* ── Hero: chart + key stats ────────────────────────────────────── */}
      <Card
        padding="lg"
        variant="glass-strong"
        className="relative overflow-hidden flex-1 min-h-0 flex flex-col justify-center"
      >
        {/* Inner sage halo bloom behind the donut */}
        <div
          className="absolute -top-14 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(168,191,163,0.28) 0%, transparent 70%)',
            filter: 'blur(22px)',
          }}
          aria-hidden
        />

        <div className="relative flex flex-col items-center text-center">
          {hasResult ? (
            <>
              <BloodDonut t1={t1} t2={t2} t3={t3} size={172} thickness={13} />

              {/* Tier counts row — soft chips under the donut */}
              <div className="mt-4 grid grid-cols-3 gap-2 w-full max-w-[320px]">
                <TierChip label="In range" count={t1} color="#6F8F6B" tint="rgba(168,191,163,0.18)" />
                <TierChip label="Watch"    count={t2} color="#D9A05B" tint="rgba(217,160,91,0.16)"  />
                <TierChip label="Action"   count={t3} color="#C97A7A" tint="rgba(201,122,122,0.16)" />
              </div>

              {/* Footer line: draw date + (when we have ≥2 tests) tiny trend */}
              <div className="mt-4 pt-4 border-t border-line w-full flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-caption text-ink-2">
                  <CalendarDays className="w-3.5 h-3.5 text-ink-3" />
                  <span>Last drawn {formatDrawDate(drawDate)}</span>
                </div>
                {history.length >= 2 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-caption text-ink-3">Trend</span>
                    <SparkLine
                      values={history.map((h) => h.inRangePct)}
                      width={72}
                      height={22}
                      tone="sage"
                      showFill
                      highlightLast
                    />
                  </div>
                ) : (
                  <Pill tone="soft-sage" size="sm">
                    {historyTotal} of {historyTotal} test{historyTotal === 1 ? '' : 's'}
                  </Pill>
                )}
              </div>
            </>
          ) : (
            // Empty state — no blood data yet
            <>
              <BloodDonut t1={0} t2={0} t3={0} size={172} thickness={13} emptyState />
              <h2 className="font-sans text-h3 text-ink mt-4">No blood data yet</h2>
              <p className="text-caption text-ink-2 mt-1.5 max-w-[34ch]">
                Upload your first lab PDF to extract biomarkers, see what&apos;s in range,
                and start tracking trends over time.
              </p>
              <Link
                href="/blood/upload"
                className={cn(
                  'btn-sage mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-pill',
                  'font-semibold text-caption',
                )}
              >
                <Upload className="w-4 h-4" strokeWidth={2.25} />
                Upload first lab
              </Link>
            </>
          )}
        </div>
      </Card>

      {/* ── Action grid — 4 buttons, 2x2 on mobile, 4x1 on desktop ───── */}
      <div className="shrink-0 mt-3 sm:mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {ACTIONS.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={cn(
              'group relative tap',
              'rounded-card border border-line bg-white shadow-card',
              'hover:border-accent-ring hover:shadow-card-hover',
              'transition-all px-3 py-3 sm:px-3.5 sm:py-3.5',
              'flex items-center gap-3',
            )}
          >
            <IconBadge icon={a.icon} tone={a.tone} size="md" variant="tint" />
            <div className="min-w-0 flex-1">
              <div className="text-body-sm font-semibold text-ink leading-tight">
                {a.label}
              </div>
              <div className="text-caption text-ink-3 leading-snug truncate">
                {a.hint}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-ink-3 group-hover:text-sage-deep transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ── Helpers ───────────────────────────────────────────────────────────── */

function TierChip({
  label,
  count,
  color,
  tint,
}: {
  label: string
  count: number
  color: string
  tint: string
}) {
  return (
    <div
      className="rounded-pill px-2.5 py-1.5 flex items-center gap-1.5 justify-center"
      style={{ background: tint }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: color }}
      />
      <span className="text-caption text-ink font-semibold tabular-nums">{count}</span>
      <span className="text-[10.5px] text-ink-2 leading-none">{label}</span>
    </div>
  )
}
