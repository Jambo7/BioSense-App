'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Settings,
  Search,
  Filter,
  Leaf,
  Droplet,
  Sun,
  Flame,
  Heart,
  Activity,
  Beaker,
  Pill as PillIcon,
  ArrowRight,
  Upload,
  Moon,
  Wind,
  Footprints,
  UtensilsCrossed,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { SparkLine } from '@/components/ui/spark-line'

interface BloodMarker {
  name: string
  value: number
  unit?: string
  refMin?: number
  refMax?: number
  tier: 'T1' | 'T2' | 'T3'
}

interface InsightsClientProps {
  hasResult: boolean
  drawDate: string | null
  totalCount: number
  t1: number
  t2: number
  t3: number
  history: { date: string; inRangePct: number }[]
  historyTotal: number
  markers: BloodMarker[]
}

// ── Status mapping ───────────────────────────────────────────────────────
// T1 → In range  /  T2 → Optimise  /  T3 → Out of range (per v7 spec image 5).
type Status = 'in_range' | 'optimise' | 'out_of_range' | 'no_data'
function tierToStatus(tier: 'T1' | 'T2' | 'T3'): Status {
  return tier === 'T1' ? 'in_range' : tier === 'T2' ? 'optimise' : 'out_of_range'
}
const STATUS_META: Record<Status, { label: string; cls: string; dot: string }> = {
  in_range:     { label: 'In range',     cls: 'bg-[rgba(168,191,163,0.22)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.22)]', dot: '#6F8F6B' },
  optimise:     { label: 'Optimise',     cls: 'bg-[rgba(237,198,138,0.30)] text-[#A77530] ring-1 ring-inset ring-[rgba(217,160,91,0.30)]',  dot: '#D9A05B' },
  out_of_range: { label: 'Out of range', cls: 'bg-[rgba(233,201,201,0.40)] text-[#A85454] ring-1 ring-inset ring-[rgba(201,122,122,0.30)]', dot: '#C97A7A' },
  no_data:      { label: 'No data',      cls: 'bg-[rgba(26,28,26,0.06)]   text-ink-2 ring-1 ring-inset ring-[rgba(26,28,26,0.08)]',         dot: '#8A8C8A' },
}

// ── Mock biomarker set ────────────────────────────────────────────────────
// Used when the user hasn't uploaded a real panel yet. Mirrors v7 image 5:
// Ferritin, Vitamin D, Vitamin B12, Omega-3 Index, CRP, HbA1c, Testosterone.
const MOCK_MARKERS: (BloodMarker & { icon: LucideIcon; sub: string; series: number[] })[] = [
  { name: 'Ferritin',         value: 32,  unit: 'µg/L',   refMin: 70,  refMax: 120, tier: 'T2', icon: Beaker,   sub: 'Iron stores',           series: [45, 42, 40, 38, 36, 34, 33, 32] },
  { name: 'Vitamin D',        value: 42,  unit: 'ng/mL',  refMin: 30,  refMax: 70,  tier: 'T1', icon: Sun,      sub: 'Bone & immune health',  series: [38, 39, 41, 42, 43, 42, 42, 42] },
  { name: 'Vitamin B12',      value: 512, unit: 'pmol/L', refMin: 200, refMax: 900, tier: 'T1', icon: Beaker,   sub: 'Energy & cognitive',    series: [480, 490, 495, 500, 505, 510, 512, 512] },
  { name: 'Omega-3 Index',    value: 6.2, unit: '%',      refMin: 8,   refMax: 12,  tier: 'T2', icon: Heart,    sub: 'Heart & brain health',  series: [4.5, 5.0, 5.4, 5.7, 5.9, 6.0, 6.1, 6.2] },
  { name: 'C-Reactive Protein', value: 1.8, unit: 'mg/L', refMin: 0,   refMax: 3,   tier: 'T1', icon: Flame,    sub: 'Inflammation',          series: [2.5, 2.3, 2.1, 2.0, 1.9, 1.8, 1.8, 1.8] },
  { name: 'HbA1c',            value: 5.2, unit: '%',      refMin: 4,   refMax: 5.7, tier: 'T1', icon: Droplet,  sub: 'Blood sugar control',   series: [5.4, 5.3, 5.3, 5.2, 5.2, 5.2, 5.2, 5.2] },
  { name: 'Testosterone',     value: 18.4, unit: 'nmol/L',refMin: 10,  refMax: 35,  tier: 'T1', icon: Activity, sub: 'Hormonal health',       series: [17.5, 17.8, 18.0, 18.2, 18.3, 18.4, 18.4, 18.4] },
]

// ── Tabs ─────────────────────────────────────────────────────────────────
type Tab = 'list' | 'comparisons' | 'explanations' | 'recommendations'
const TABS: { id: Tab; label: string }[] = [
  { id: 'list',            label: 'Biomarker list'  },
  { id: 'comparisons',     label: 'Comparisons'     },
  { id: 'explanations',    label: 'Explanations'    },
  { id: 'recommendations', label: 'Recommendations' },
]

export function InsightsClient({ hasResult, markers }: InsightsClientProps) {
  const [tab, setTab] = useState<Tab>('list')

  // Real markers preferred; fall back to mock so demo always feels populated.
  const visible = markers.length > 0
    ? markers.map((m) => ({
        ...m,
        icon: iconForMarker(m.name),
        sub:  subForMarker(m.name),
        series: undefined as number[] | undefined,
      }))
    : MOCK_MARKERS

  return (
    <div className="max-w-3xl mx-auto fade-up space-y-5">
      {/* Header */}
      <header className="relative pt-2 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-2">
              <Droplet className="w-3.5 h-3.5" strokeWidth={2.25} />
              <span>Biomarkers</span>
            </div>
            <h1 className="font-sans text-[28px] sm:text-[34px] text-ink tracking-tight leading-[1.04] max-w-[18ch] font-bold">
              Understand your biology
              <br />
              <span className="italic-accent text-[1.02em] text-sage-deep font-normal">
                through your blood data.
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
            Biomarker settings
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

      {tab === 'list'            && <ListTab markers={visible} hasReal={hasResult} />}
      {tab === 'comparisons'     && <ComparisonsTab markers={visible} />}
      {tab === 'explanations'    && <ExplanationsTab />}
      {tab === 'recommendations' && <RecommendationsTab />}
    </div>
  )
}

// ── Tab 1: BIOMARKER LIST ────────────────────────────────────────────────
function ListTab({
  markers,
  hasReal,
}: {
  markers: (BloodMarker & { icon: LucideIcon; sub: string; series?: number[] })[]
  hasReal: boolean
}) {
  const counts = markers.reduce(
    (acc, m) => {
      const s = tierToStatus(m.tier)
      acc[s] += 1
      return acc
    },
    { in_range: 0, optimise: 0, out_of_range: 0, no_data: 0 } as Record<Status, number>,
  )

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="AI summary"
        lead="Your biomarkers look"
        accent="balanced overall."
        body={
          hasReal
            ? 'Iron stores, vitamin D and inflammation markers could be improved.'
            : 'Upload your first lab panel to see your real biomarkers in this view.'
        }
        decoration="leaves"
        cta={
          hasReal
            ? { label: 'View details', href: '/blood/markers' }
            : { label: 'Upload first lab', href: '/blood/upload', icon: Upload }
        }
      />

      <Card variant="glass" padding="lg">
        {/* Search + filter (visual scaffolding; wiring deferred) */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 h-10 rounded-pill bg-white/70 ring-1 ring-inset ring-[rgba(184,168,144,0.22)] px-3.5">
            <Search className="w-4 h-4 text-ink-3" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search biomarkers..."
              className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-ink-3 outline-none"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-pill text-[12px] font-medium text-sage-deep bg-white/70 ring-1 ring-inset ring-[rgba(111,143,107,0.22)] hover:bg-white transition-colors"
          >
            <Filter className="w-3.5 h-3.5" strokeWidth={2} />
            Filter
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <LegendChip status="in_range"     count={counts.in_range}     />
          <LegendChip status="optimise"     count={counts.optimise}     />
          <LegendChip status="out_of_range" count={counts.out_of_range} />
          <LegendChip status="no_data"      count={counts.no_data}      />
        </div>

        <div className="text-eyebrow uppercase text-ink-3 mb-2.5">Key biomarkers</div>

        <div className="space-y-2.5">
          {markers.map((m) => {
            const status = tierToStatus(m.tier)
            const meta = STATUS_META[status]
            return (
              <Link
                key={m.name}
                href="/blood/markers"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)] hover:bg-white/80 transition-all group"
              >
                <IconBadge icon={m.icon} tone={statusToTone(status)} variant="tint" size="md" />
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                    {m.name}
                  </div>
                  <div className="text-[11px] text-ink-3 leading-snug mt-0.5">
                    {m.sub}
                  </div>
                </div>
                <div className="text-right shrink-0 min-w-[64px]">
                  <div className="font-sans text-[13px] font-semibold text-ink leading-none tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[10px] text-ink-3 mt-1">{m.unit}</div>
                </div>
                {m.series && m.series.length >= 2 && (
                  <div className="shrink-0 w-[64px] hidden sm:block">
                    <SparkLine
                      values={m.series}
                      width={64}
                      height={26}
                      tone={status === 'in_range' ? 'sage' : status === 'optimise' ? 'amber' : 'rose'}
                      showFill
                      className="w-full h-auto"
                    />
                  </div>
                )}
                <span
                  className={cn(
                    'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide shrink-0 whitespace-nowrap',
                    meta.cls,
                  )}
                >
                  {meta.label}
                </span>
              </Link>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ── Tab 2: COMPARISONS ───────────────────────────────────────────────────
function ComparisonsTab({
  markers,
}: {
  markers: (BloodMarker & { icon: LucideIcon; sub: string; series?: number[] })[]
}) {
  const [filter, setFilter] = useState<'all' | 'out' | 'optimise'>('all')
  const filtered = markers.filter((m) => {
    const s = tierToStatus(m.tier)
    if (filter === 'out') return s === 'out_of_range'
    if (filter === 'optimise') return s === 'optimise'
    return true
  })
  const outCount = markers.filter((m) => tierToStatus(m.tier) === 'out_of_range').length
  const optCount = markers.filter((m) => tierToStatus(m.tier) === 'optimise').length

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Comparisons overview"
        lead="See how your results compare"
        accent="to key reference points."
        body="These comparisons help you understand your results in context — against your own baseline, the optimal range, and the population average."
        decoration="leaves"
      />

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-2.5">Compare by</div>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <FilterPill active={filter === 'all'}      onClick={() => setFilter('all')}>
            All biomarkers
          </FilterPill>
          <FilterPill active={filter === 'out'}      onClick={() => setFilter('out')}>
            Out of range ({outCount})
          </FilterPill>
          <FilterPill active={filter === 'optimise'} onClick={() => setFilter('optimise')}>
            Optimise ({optCount})
          </FilterPill>
        </div>

        <div className="space-y-3">
          {filtered.map((m) => {
            const status = tierToStatus(m.tier)
            const meta   = STATUS_META[status]
            // Build a synthetic personal-vs-optimal track:
            // pos 0–100% mapped to actual value placement vs combined range.
            const trackMin = Math.min(m.value, m.refMin ?? m.value)
            const trackMax = Math.max(m.value, m.refMax ?? m.value)
            const span     = trackMax - trackMin || 1
            const valPos    = ((m.value - trackMin) / span) * 100
            const refMinPct = m.refMin != null ? ((m.refMin - trackMin) / span) * 100 : null
            const refMaxPct = m.refMax != null ? ((m.refMax - trackMin) / span) * 100 : null
            return (
              <div
                key={m.name}
                className="p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)]"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconBadge icon={m.icon} tone={statusToTone(status)} variant="tint" size="sm" />
                    <div className="min-w-0">
                      <div className="font-sans text-[13px] font-semibold text-ink leading-tight">
                        {m.name}
                      </div>
                      <div className="text-[10.5px] text-ink-3 leading-snug">{m.sub}</div>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide shrink-0',
                      meta.cls,
                    )}
                  >
                    {meta.label}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10.5px] text-ink-3 mb-1.5">
                  <span>Your result <span className="font-semibold text-ink ml-1">{m.value} {m.unit}</span></span>
                  <span className="text-center">Personal range</span>
                  <span className="text-right">Optimal range</span>
                </div>

                {/* Track with optimal range band + value marker */}
                <div className="relative h-2.5 rounded-pill bg-[rgba(26,28,26,0.05)] overflow-hidden">
                  {refMinPct != null && refMaxPct != null && (
                    <div
                      className="absolute top-0 h-full bg-[rgba(168,191,163,0.45)]"
                      style={{ left: `${refMinPct}%`, width: `${refMaxPct - refMinPct}%` }}
                    />
                  )}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-2 ring-white shadow-[0_2px_4px_rgba(26,28,26,0.18)]"
                    style={{ left: `calc(${valPos}% - 6px)`, background: meta.dot }}
                  />
                </div>

                {m.refMin != null && m.refMax != null && (
                  <div className="mt-1.5 text-[10px] text-ink-3 text-right">
                    Optimal: {m.refMin}–{m.refMax} {m.unit}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ── Tab 3: EXPLANATIONS ──────────────────────────────────────────────────
function ExplanationsTab() {
  const topics = [
    { key: 'iron',     icon: Beaker,   title: 'Iron & ferritin',          detail: 'Energy, oxygen transport and recovery' },
    { key: 'vitd',     icon: Sun,      title: 'Vitamin D',                 detail: 'Immunity, mood and bone health' },
    { key: 'crp',      icon: Flame,    title: 'Inflammation markers',     detail: 'Systemic inflammation and long-term health' },
    { key: 'lipids',   icon: Heart,    title: 'Cholesterol & lipids',     detail: 'Heart and cardiovascular health' },
    { key: 'glucose',  icon: Droplet,  title: 'Blood sugar control',      detail: 'Metabolic health and insulin sensitivity' },
    { key: 'hormones', icon: Activity, title: 'Hormones',                  detail: 'Balance, energy and performance' },
    { key: 'vitamins', icon: Leaf,     title: 'Vitamins & minerals',      detail: 'Essential nutrients and deficiencies' },
    { key: 'liver',    icon: Droplet,  title: 'Liver & kidney markers',   detail: 'Detoxification and organ health' },
  ]

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Understand your biomarkers"
        lead="Learn what your biomarkers mean"
        accent="and why they matter."
        body="Clear, science-backed explanations in plain language."
        decoration="leaves"
      />

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-2.5">Browse topics</div>
        <div className="space-y-2.5">
          {topics.map((t) => (
            <Link
              key={t.key}
              href="/chat"
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)] hover:bg-white/80 transition-all group"
            >
              <IconBadge icon={t.icon} tone="sage" variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                  {t.title}
                </div>
                <div className="text-[11.5px] text-ink-3 leading-snug mt-0.5">
                  {t.detail}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-3 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ── Tab 4: RECOMMENDATIONS ───────────────────────────────────────────────
function RecommendationsTab() {
  const focusAreas = [
    { key: 'iron',         icon: Droplet, title: 'Improve iron stores',  detail: 'Your ferritin is below your optimal range. Focus on iron-rich foods and key nutrients to support healthy levels.' },
    { key: 'vitd',         icon: Sun,     title: 'Raise vitamin D',      detail: 'Your vitamin D is below optimal. More sunlight, vitamin D3 and foods can help improve your levels.' },
    { key: 'inflammation', icon: Flame,   title: 'Reduce inflammation',  detail: 'Your CRP is slightly above normal. Anti-inflammatory nutrition, quality sleep and stress management can help.' },
  ]

  const foundations: { key: string; icon: LucideIcon; label: string; detail: string }[] = [
    { key: 'nutrition', icon: UtensilsCrossed, label: 'Nutrition', detail: 'Balanced eating patterns' },
    { key: 'movement',  icon: Footprints,      label: 'Movement',  detail: 'Regular exercise' },
    { key: 'sleep',     icon: Moon,            label: 'Sleep',     detail: 'Quality, consistent sleep' },
    { key: 'stress',    icon: Wind,            label: 'Stress',    detail: 'Manage daily stress' },
  ]

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Personalised recommendations"
        lead="Actionable steps to improve"
        accent="your biomarker health."
        body="Recommendations based on your results, trends and lifestyle."
        decoration="leaves"
      />

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-3">Focus areas</div>
        <div className="space-y-3">
          {focusAreas.map((f) => (
            <Link
              key={f.key}
              href="/chat"
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)] hover:bg-white/80 transition-all group"
            >
              <IconBadge icon={f.icon} tone="rose" variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                  {f.title}
                </div>
                <p className="text-[11.5px] text-ink-3 leading-snug mt-1">
                  {f.detail}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-3 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
            </Link>
          ))}
        </div>
      </Card>

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-3">Lifestyle foundations</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {foundations.map((f) => (
            <div
              key={f.key}
              className="rounded-card p-3 bg-white/55 backdrop-blur-sm ring-1 ring-inset ring-[rgba(184,168,144,0.18)] flex flex-col items-center text-center"
            >
              <IconBadge icon={f.icon} tone="sage" variant="tint" size="md" />
              <div className="font-sans text-[12.5px] font-semibold text-ink mt-2 leading-tight">
                {f.label}
              </div>
              <div className="text-[10.5px] text-ink-3 leading-snug mt-0.5">
                {f.detail}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/chat"
          className="mt-4 flex items-center justify-between gap-3 rounded-card bg-[rgba(168,191,163,0.14)] ring-1 ring-inset ring-[rgba(111,143,107,0.22)] px-3.5 py-3 hover:bg-[rgba(168,191,163,0.20)] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/80 ring-1 ring-inset ring-[rgba(111,143,107,0.20)] flex items-center justify-center">
              <PillIcon className="w-4 h-4 text-sage-deep" strokeWidth={2.25} />
            </div>
            <div>
              <div className="font-sans text-[13px] font-semibold text-ink leading-tight">
                Need a supplement plan?
              </div>
              <div className="text-[11.5px] text-ink-3 leading-snug mt-0.5">
                Get a personalised plan based on your results.
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-sage-deep shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
      </Card>
    </div>
  )
}

// ── Shared bits ──────────────────────────────────────────────────────────
function HeroIntroCard({
  eyebrow,
  lead,
  accent,
  body,
  decoration,
  cta,
}: {
  eyebrow: string
  lead: string
  accent: string
  body: string
  decoration: 'leaves'
  cta?: { label: string; href: string; icon?: LucideIcon }
}) {
  return (
    <Card variant="premium" padding="lg" className="relative overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
            <Sparkles className="w-3 h-3" strokeWidth={2.25} />
            {eyebrow}
          </div>
          <div className="font-serif text-[22px] sm:text-[26px] text-ink leading-[1.12] tracking-tight">
            {lead}{' '}
            <span className="italic-accent text-[1em] text-sage-deep">{accent}</span>
          </div>
          <p className="text-caption text-ink-2 mt-2 leading-snug max-w-[44ch]">
            {body}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="inline-flex items-center gap-1.5 mt-3 h-8 px-3 rounded-pill text-[12px] font-medium text-sage-deep bg-white/70 ring-1 ring-inset ring-[rgba(111,143,107,0.22)] hover:bg-white transition-colors"
            >
              {cta.icon && <cta.icon className="w-3.5 h-3.5" strokeWidth={2.25} />}
              {cta.label}
              {!cta.icon && <ArrowRight className="w-3 h-3" strokeWidth={2.25} />}
            </Link>
          )}
        </div>
        {/* Decorative leaves cluster, matching the other tabs */}
        {decoration === 'leaves' && (
          <div className="relative w-[88px] h-[88px] shrink-0">
            <Leaf className="absolute top-2 right-6 w-7 h-7 text-sage-deep rotate-[18deg]" strokeWidth={1.5} />
            <Leaf className="absolute top-8 right-2 w-9 h-9 text-sage rotate-[-12deg]" strokeWidth={1.5} />
            <Leaf className="absolute bottom-2 right-8 w-5 h-5 text-sage-soft rotate-[35deg]" strokeWidth={1.5} />
          </div>
        )}
      </div>
    </Card>
  )
}

function LegendChip({ status, count }: { status: Status; count: number }) {
  const meta = STATUS_META[status]
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-white/65 ring-1 ring-inset ring-[rgba(184,168,144,0.20)]">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.dot }} />
      <span className="text-[10.5px] text-ink-2 font-medium">{meta.label}</span>
      {count > 0 && (
        <span className="text-[10.5px] text-ink-3 font-semibold tabular-nums">· {count}</span>
      )}
    </span>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 h-8 rounded-pill text-[12px] font-medium transition-all',
        active
          ? 'bg-grad-sage text-white shadow-button'
          : 'bg-white/65 text-ink-2 ring-1 ring-inset ring-[rgba(184,168,144,0.20)] hover:bg-white/85',
      )}
    >
      {children}
    </button>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────
function statusToTone(s: Status): 'sage' | 'amber' | 'rose' | 'ink' {
  return s === 'in_range' ? 'sage' : s === 'optimise' ? 'amber' : s === 'out_of_range' ? 'rose' : 'ink'
}

function iconForMarker(name: string): LucideIcon {
  const k = name.toLowerCase()
  if (k.includes('ferritin') || k.includes('iron'))              return Beaker
  if (k.includes('vitamin d'))                                    return Sun
  if (k.includes('vitamin b') || k.includes('b12'))              return Beaker
  if (k.includes('omega'))                                       return Heart
  if (k.includes('crp') || k.includes('c-reactive'))             return Flame
  if (k.includes('hba1c') || k.includes('glucose'))              return Droplet
  if (k.includes('testosterone') || k.includes('hormone'))       return Activity
  if (k.includes('cholesterol') || k.includes('hdl') || k.includes('ldl')) return Heart
  return Beaker
}

function subForMarker(name: string): string {
  const k = name.toLowerCase()
  if (k.includes('ferritin'))    return 'Iron stores'
  if (k.includes('vitamin d'))   return 'Bone & immune health'
  if (k.includes('vitamin b'))   return 'Energy & cognitive'
  if (k.includes('omega'))       return 'Heart & brain health'
  if (k.includes('crp'))         return 'Inflammation'
  if (k.includes('hba1c'))       return 'Blood sugar control'
  if (k.includes('testosterone'))return 'Hormonal health'
  return ''
}
