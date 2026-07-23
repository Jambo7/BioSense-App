'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Filter,
  Leaf,
  Droplet,
  Flame,
  Heart,
  Activity,
  Pill as PillIcon,
  ArrowRight,
  ArrowLeft,
  Upload,
  Moon,
  Wind,
  Footprints,
  UtensilsCrossed,
  Sparkles,
  ChevronDown,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  Check,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  groupMarkersByCategory,
  personalisedRec,
  BIOMARKER_CATEGORIES,
  canonicalMarker,
} from '@/lib/biomarkers'
import {
  getContent,
  iconForMarker,
  iconForCategory,
  markerTone,
  subForMarker,
} from '@/lib/biomarker-content'
import { BiomarkerGuidanceButton } from '@/components/biomarker-guidance'
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
  /** Real values across past uploads (oldest → newest), when ≥ 2 exist. */
  series?: number[]
  /** Real previous result for this marker, when one exists. */
  prev?: { value: number; date: string }
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
function tierToStatus(tier?: 'T1' | 'T2' | 'T3'): Status {
  if (!tier) return 'no_data'
  return tier === 'T1' ? 'in_range' : tier === 'T2' ? 'optimise' : 'out_of_range'
}
const STATUS_META: Record<Status, { label: string; cls: string; dot: string }> = {
  in_range:     { label: 'In range',     cls: 'bg-[rgba(168,191,163,0.22)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.22)]', dot: '#6F8F6B' },
  optimise:     { label: 'Optimise',     cls: 'bg-[rgba(237,198,138,0.30)] text-[#A77530] ring-1 ring-inset ring-[rgba(217,160,91,0.30)]',  dot: '#D9A05B' },
  out_of_range: { label: 'Out of range', cls: 'bg-[rgba(233,201,201,0.40)] text-[#A85454] ring-1 ring-inset ring-[rgba(201,122,122,0.30)]', dot: '#C97A7A' },
  no_data:      { label: 'No data',      cls: 'bg-[rgba(26,28,26,0.06)]   text-ink-2 ring-1 ring-inset ring-[rgba(26,28,26,0.08)]',         dot: '#8A8C8A' },
}

// ── Tabs ─────────────────────────────────────────────────────────────────
type Tab = 'list' | 'comparisons' | 'explanations' | 'recommendations'
const TABS: { id: Tab; label: string }[] = [
  { id: 'list',            label: 'Biomarker list'  },
  { id: 'explanations',    label: 'Explanations'    },
  { id: 'comparisons',     label: 'Comparisons'     },
  { id: 'recommendations', label: 'Recommendations' },
]

// Uploaded markers enriched with display metadata. Always real data —
// there is no demo/mock fallback; pre-upload states show empty sections.
type VMarker = BloodMarker & { icon: LucideIcon; sub: string }

// Looser shape used by the drill-downs so catalogue markers the user
// hasn't uploaded yet can still be explored (Explanations is educational).
type DrillMarker = {
  name: string
  sub: string
  icon: LucideIcon
  value?: number
  unit?: string
  refMin?: number
  refMax?: number
  tier?: 'T1' | 'T2' | 'T3'
  series?: number[]
  prev?: { value: number; date: string }
}

function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export function InsightsClient({ hasResult, drawDate, markers }: InsightsClientProps) {
  const [tab, setTab] = useState<Tab>('list')
  // The currently drilled-into biomarker. `null` → overview. Selecting a
  // marker scopes Comparisons / Explanations / Recommendations to it.
  const [selected, setSelected] = useState<string | null>(null)

  const visible: VMarker[] = useMemo(
    () =>
      markers.map((m) => ({
        ...m,
        icon: iconForMarker(m.name),
        sub: subForMarker(m.name),
      })),
    [markers],
  )

  // Drill into a biomarker from list and jump to Explanations (3rd-June spec).
  function drillInto(name: string) {
    setSelected(name)
    setTab('explanations')
  }

  function goToComparisons(name: string) {
    setSelected(name)
    setTab('comparisons')
  }
  const clearSelection = () => setSelected(null)

  // Resolve the selection: an uploaded marker when the user has it, else a
  // catalogue-only marker (educational content, no values).
  const selectedMarker: DrillMarker | null = selected
    ? visible.find((m) => m.name === selected) ?? {
        name: selected,
        sub: subForMarker(selected),
        icon: iconForMarker(selected),
      }
    : null

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
            {drawDate && (
              <p className="text-caption text-ink-3 mt-2">
                Last upload:{' '}
                <Link href="/blood/history" className="text-sage-deep font-medium hover:underline">
                  {new Date(drawDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Link>
              </p>
            )}
          </div>
          <BiomarkerGuidanceButton />
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

      {tab === 'list' && (
        <ListTab markers={visible} hasReal={hasResult} onSelect={drillInto} />
      )}
      {tab === 'comparisons' && (
        <ComparisonsTab
          markers={visible}
          selected={selectedMarker}
          onSelect={setSelected}
          onClear={clearSelection}
        />
      )}
      {tab === 'explanations' && (
        <ExplanationsTab
          markers={visible}
          selected={selectedMarker}
          onSelect={setSelected}
          onClear={clearSelection}
          onGoToComparisons={goToComparisons}
        />
      )}
      {tab === 'recommendations' && (
        <RecommendationsTab
          markers={visible}
          selected={selectedMarker}
          onSelect={setSelected}
          onClear={clearSelection}
        />
      )}
    </div>
  )
}

// ── Summary line computed from the user's actual results ─────────────────
function summariseMarkers(markers: VMarker[]): { accent: string; body: string } {
  const t3 = markers.filter((m) => m.tier === 'T3')
  const t2 = markers.filter((m) => m.tier === 'T2')

  const nameList = (ms: VMarker[]) => {
    const names = ms.slice(0, 3).map((m) => m.name)
    const extra = ms.length - names.length
    const joined = names.length > 1
      ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
      : names[0]
    return extra > 0 ? `${joined} (+${extra} more)` : joined
  }

  if (t3.length > 0) {
    return {
      accent: 'worth some attention.',
      body: `${nameList(t3)} ${t3.length === 1 ? 'is' : 'are'} outside the optimal range — open Recommendations for specific actions.`,
    }
  }
  if (t2.length > 0) {
    return {
      accent: 'balanced overall.',
      body: `${nameList(t2)} could be optimised — see Recommendations for next steps.`,
    }
  }
  return {
    accent: 'in great shape.',
    body: `All ${markers.length} markers are within their optimal ranges. Keep doing what's working.`,
  }
}

// ── Tab 1: BIOMARKER LIST ────────────────────────────────────────────────
function ListTab({
  markers,
  hasReal,
  onSelect,
}: {
  markers: VMarker[]
  hasReal: boolean
  onSelect: (name: string) => void
}) {
  const [query, setQuery] = useState('')
  const [attentionOnly, setAttentionOnly] = useState(false)

  const counts = markers.reduce(
    (acc, m) => {
      const s = tierToStatus(m.tier)
      acc[s] += 1
      return acc
    },
    { in_range: 0, optimise: 0, out_of_range: 0, no_data: 0 } as Record<Status, number>,
  )

  const q = query.trim().toLowerCase()
  const filtered = markers.filter((m) => {
    if (attentionOnly && m.tier === 'T1') return false
    if (q === '') return true
    return (
      m.name.toLowerCase().includes(q) ||
      m.sub.toLowerCase().includes(q) ||
      canonicalMarker(m.name).toLowerCase().includes(q)
    )
  })

  const summary = hasReal && markers.length > 0 ? summariseMarkers(markers) : null

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="AI summary"
        lead="Your biomarkers look"
        accent={summary?.accent ?? 'ready to discover.'}
        body={
          summary?.body ??
          'Upload your first lab panel to see your real biomarkers in this view.'
        }
        decoration="leaves"
        cta={
          hasReal
            ? { label: 'View details', href: '/blood/markers' }
            : { label: 'Upload first lab', href: '/blood/upload', icon: Upload }
        }
      />

      <Card variant="glass" padding="lg">
        {/* Search + needs-attention filter */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 h-10 rounded-pill bg-white/70 ring-1 ring-inset ring-[rgba(184,168,144,0.22)] px-3.5">
            <Search className="w-4 h-4 text-ink-3" strokeWidth={2} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search biomarkers..."
              className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-ink-3 outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setAttentionOnly((v) => !v)}
            className={cn(
              'inline-flex items-center gap-1.5 h-10 px-3.5 rounded-pill text-[12px] font-medium transition-colors',
              attentionOnly
                ? 'btn-sage text-white'
                : 'text-sage-deep bg-white/70 ring-1 ring-inset ring-[rgba(111,143,107,0.22)] hover:bg-white',
            )}
            title="Show only markers that need attention"
          >
            <Filter className="w-3.5 h-3.5" strokeWidth={2} />
            Needs attention
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <LegendChip status="in_range"     count={counts.in_range}     />
          <LegendChip status="optimise"     count={counts.optimise}     />
          <LegendChip status="out_of_range" count={counts.out_of_range} />
          {counts.no_data > 0 && <LegendChip status="no_data" count={counts.no_data} />}
        </div>

        <div className="space-y-5">
          {groupMarkersByCategory(filtered).map(({ category, items }) => {
            if (!hasReal && items.length === 0) {
              return (
                <div key={category.id}>
                  <div className="text-eyebrow uppercase text-ink-3 mb-1.5">{category.label}</div>
                  <p className="text-[11.5px] text-ink-3 italic px-1">No biomarkers yet — upload a result to populate this section.</p>
                </div>
              )
            }
            if (items.length === 0) return null
            return (
              <div key={category.id}>
                <div className="text-eyebrow uppercase text-ink-3 mb-1.5">{category.label}</div>
                <div className="space-y-2.5">
                  {items.map((m) => {
                    const status = tierToStatus(m.tier)
                    const meta = STATUS_META[status]
                    return (
                      <button
                        key={m.name}
                        type="button"
                        onClick={() => onSelect(m.name)}
                        className="w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile tile-hover group"
                      >
                        <IconBadge icon={m.icon} tone={markerTone(m.name)} variant="tint" size="md" />
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
                        <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
          {hasReal && filtered.length === 0 && (
            <p className="text-[12px] text-ink-3 italic px-1">
              No markers match {q !== '' ? `"${query.trim()}"` : 'this filter'}.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}

// ── Tab 2: COMPARISONS ───────────────────────────────────────────────────
function ComparisonsTab({
  markers,
  selected,
  onSelect,
  onClear,
}: {
  markers: VMarker[]
  selected: DrillMarker | null
  onSelect: (name: string) => void
  onClear: () => void
}) {
  if (selected) {
    return (
      <ComparisonsDrill
        marker={selected}
        markers={markers}
        onSelect={onSelect}
        onClear={onClear}
      />
    )
  }
  if (markers.length === 0) {
    return (
      <HeroIntroCard
        eyebrow="Comparisons"
        lead="See how your results compare"
        accent="to key reference points."
        body="Once you upload a blood test, each biomarker is compared against your own baseline, the optimal range and the population average."
        decoration="leaves"
        cta={{ label: 'Upload first lab', href: '/blood/upload', icon: Upload }}
      />
    )
  }
  return <ComparisonsOverview markers={markers} onSelect={onSelect} />
}

function ComparisonsOverview({
  markers,
  onSelect,
}: {
  markers: VMarker[]
  onSelect: (name: string) => void
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
              <button
                key={m.name}
                type="button"
                onClick={() => onSelect(m.name)}
                className="w-full text-left p-3 sm:p-3.5 rounded-card tile tile-hover group"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconBadge icon={m.icon} tone={markerTone(m.name)} variant="tint" size="sm" />
                    <div className="min-w-0">
                      <div className="font-sans text-[13px] font-semibold text-ink leading-tight">
                        {m.name}
                      </div>
                      <div className="text-[10.5px] text-ink-3 leading-snug">{m.sub}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide',
                        meta.cls,
                      )}
                    >
                      {meta.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-ink-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
                  </div>
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
              </button>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ── Comparisons: single-biomarker drill-down (v7 image 6) ─────────────────
function ComparisonsDrill({
  marker,
  markers,
  onSelect,
  onClear,
}: {
  marker: DrillMarker
  markers: VMarker[]
  onSelect: (name: string) => void
  onClear: () => void
}) {
  const status = tierToStatus(marker.tier)
  const meta = STATUS_META[status]
  const c = getContent(marker.name)
  const unit = marker.unit ?? ''

  // Catalogue-only marker (not uploaded yet) → no values to compare.
  if (marker.value == null) {
    return (
      <div className="space-y-5">
        <DrillHeader marker={marker} markers={markers} onSelect={onSelect} onClear={onClear} />
        <HeroIntroCard
          eyebrow="No data yet"
          lead={`No ${marker.name} result`}
          accent="on file yet."
          body={`Upload a blood test that includes ${marker.name} and we'll compare it against the optimal range and population average here.`}
          decoration="leaves"
          cta={{ label: 'Upload a result', href: '/blood/upload', icon: Upload }}
        />
      </div>
    )
  }

  // Real reference points only: previous result and personal range come
  // from the user's actual upload history, never placeholder values.
  const prevValue = marker.prev?.value
  const prevLabel = marker.prev ? formatMonthYear(marker.prev.date) : undefined
  const hasTrend = !!marker.series && marker.series.length >= 2
  const personalMin = hasTrend ? Math.min(...marker.series!) : undefined
  const personalMax = hasTrend ? Math.max(...marker.series!) : undefined

  // Build a shared scale spanning every reference point so all the bars
  // line up against the same axis.
  const pts: number[] = [marker.value]
  if (prevValue != null) pts.push(prevValue)
  if (personalMin != null) pts.push(personalMin)
  if (personalMax != null) pts.push(personalMax)
  if (marker.refMin != null) pts.push(marker.refMin)
  if (marker.refMax != null) pts.push(marker.refMax)
  if (c.populationAvg != null) pts.push(c.populationAvg)
  const lo = Math.min(...pts)
  const hi = Math.max(...pts)
  const padScale = (hi - lo) * 0.08 || 1
  const scaleMin = lo - padScale
  const scaleMax = hi + padScale

  return (
    <div className="space-y-5">
      <DrillHeader marker={marker} markers={markers} onSelect={onSelect} onClear={onClear} />

      {/* YOUR RESULT */}
      <Card variant="glass" padding="lg">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-eyebrow uppercase text-ink-3 mb-1.5">Your result</div>
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-[34px] font-bold text-ink leading-none tabular-nums">
                {marker.value}
              </span>
              <span className="text-[13px] text-ink-3">{unit}</span>
              <span
                className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide',
                  meta.cls,
                )}
              >
                {meta.label}
              </span>
            </div>
          </div>
          {hasTrend && (
            <div className="shrink-0 w-[88px]">
              <SparkLine
                values={marker.series!}
                width={88}
                height={40}
                tone={status === 'in_range' ? 'sage' : status === 'optimise' ? 'amber' : 'rose'}
                showFill
                highlightLast
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </Card>

      {/* COMPARISONS */}
      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-4">Comparisons</div>
        <div className="space-y-4">
          {prevValue != null && (
            <CompareRow
              label="Your previous result"
              sub={prevLabel}
              valueText={`${prevValue} ${unit}`}
              scaleMin={scaleMin}
              scaleMax={scaleMax}
              optimalMin={marker.refMin}
              optimalMax={marker.refMax}
              point={prevValue}
            />
          )}
          {personalMin != null && personalMax != null && (
            <CompareRow
              label="Your personal range"
              sub="Across your uploads"
              valueText={`${personalMin}–${personalMax} ${unit}`}
              scaleMin={scaleMin}
              scaleMax={scaleMax}
              optimalMin={marker.refMin}
              optimalMax={marker.refMax}
              rangeMin={personalMin}
              rangeMax={personalMax}
            />
          )}
          {marker.refMin != null && marker.refMax != null && (
            <CompareRow
              label="Optimal range"
              valueText={`${marker.refMin}–${marker.refMax} ${unit}`}
              scaleMin={scaleMin}
              scaleMax={scaleMax}
              optimalMin={marker.refMin}
              optimalMax={marker.refMax}
              rangeMin={marker.refMin}
              rangeMax={marker.refMax}
              emphasiseRange
            />
          )}
          {c.populationAvg != null && (
            <CompareRow
              label="Population average"
              sub={c.populationLabel}
              valueText={`${c.populationAvg} ${unit}`}
              scaleMin={scaleMin}
              scaleMax={scaleMax}
              optimalMin={marker.refMin}
              optimalMax={marker.refMax}
              point={c.populationAvg}
              pointTone="ink"
            />
          )}
        </div>

        {/* Trend / summary note */}
        <Link
          href="/blood/markers"
          className="mt-5 flex items-center justify-between gap-3 rounded-card tile tile-hover px-3.5 py-3 group"
        >
          <p className="text-[12px] text-ink-2 leading-snug">{c.trendNote}</p>
          <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
      </Card>
    </div>
  )
}

// ── Tab 3: EXPLANATIONS ──────────────────────────────────────────────────
function ExplanationsTab({
  markers,
  selected,
  onSelect,
  onClear,
  onGoToComparisons,
}: {
  markers: VMarker[]
  selected: DrillMarker | null
  onSelect: (name: string) => void
  onClear: () => void
  onGoToComparisons: (name: string) => void
}) {
  if (selected) {
    return (
      <ExplanationsDrill
        marker={selected}
        markers={markers}
        onSelect={onSelect}
        onClear={onClear}
        onGoToComparisons={onGoToComparisons}
      />
    )
  }
  return <ExplanationsCatalogue markers={markers} onSelect={onSelect} />
}

// Full catalogue browser: every preset marker, grouped by category, with
// search — so finding one marker among ~150 takes seconds. Markers the user
// has uploaded show their value and status; the rest are browsable as
// educational content ("No data" until a panel includes them).
function ExplanationsCatalogue({
  markers,
  onSelect,
}: {
  markers: VMarker[]
  onSelect: (name: string) => void
}) {
  const [query, setQuery] = useState('')
  const [openCats, setOpenCats] = useState<Set<string>>(new Set())

  // Uploaded markers keyed by canonical name so catalogue rows can show
  // the user's real value where one exists.
  const owned = useMemo(() => {
    const map = new Map<string, VMarker>()
    for (const m of markers) map.set(canonicalMarker(m.name), m)
    return map
  }, [markers])

  const q = query.trim().toLowerCase()
  const searching = q !== ''

  // Uploaded markers that don't map onto a preset catalogue entry still
  // deserve a home — surface them in an extra section at the end.
  const catalogueNames = useMemo(() => {
    const set = new Set<string>()
    for (const cat of BIOMARKER_CATEGORIES) {
      for (const name of cat.markers) set.add(canonicalMarker(name))
    }
    return set
  }, [])
  const uncatalogued = markers
    .filter((m) => !catalogueNames.has(canonicalMarker(m.name)))
    .map((m) => m.name)

  const sections = [
    ...BIOMARKER_CATEGORIES.map((cat) => ({ cat, allMarkers: cat.markers })),
    ...(uncatalogued.length > 0
      ? [{
          cat: { id: 'other', label: 'Other markers', description: 'Additional biomarkers from your uploads', markers: uncatalogued },
          allMarkers: uncatalogued,
        }]
      : []),
  ]
    .map(({ cat, allMarkers }) => {
      const items = allMarkers.filter(
        (name) =>
          !searching ||
          name.toLowerCase().includes(q) ||
          subForMarker(name).toLowerCase().includes(q),
      )
      return { cat, items }
    })
    .filter((s) => s.items.length > 0)

  function toggleCat(id: string) {
    setOpenCats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Understand your biomarkers"
        lead="Learn what your biomarkers mean"
        accent="and why they matter."
        body="Browse every biomarker we track, by category — clear, science-backed explanations in plain language."
        decoration="leaves"
      />

      <Card variant="glass" padding="lg">
        {/* Search across the full catalogue */}
        <div className="flex items-center gap-2 h-10 rounded-pill bg-white/70 ring-1 ring-inset ring-[rgba(184,168,144,0.22)] px-3.5 mb-4">
          <Search className="w-4 h-4 text-ink-3" strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all biomarkers, e.g. LDL..."
            className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-ink-3 outline-none"
          />
        </div>

        <div className="space-y-2.5">
          {sections.map(({ cat, items }) => {
            const open = searching || openCats.has(cat.id)
            const ownedCount = cat.markers.filter((name) => owned.has(canonicalMarker(name))).length
            return (
              <div key={cat.id} className="rounded-card tile overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleCat(cat.id)}
                  className="w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 group"
                >
                  <IconBadge icon={iconForCategory(cat.id)} tone="sage" variant="tint" size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                      {cat.label}
                    </div>
                    <div className="text-[11.5px] text-ink-3 leading-snug mt-0.5">
                      {cat.description}
                    </div>
                  </div>
                  <span className="text-[10.5px] text-ink-3 font-medium tabular-nums shrink-0">
                    {ownedCount > 0 ? `${ownedCount} of ${cat.markers.length} tracked` : `${cat.markers.length} markers`}
                  </span>
                  <ChevronDown
                    className={cn('w-4 h-4 text-ink-3 shrink-0 transition-transform', open && 'rotate-180')}
                    strokeWidth={2.25}
                  />
                </button>

                {open && (
                  <div className="px-2 pb-2 space-y-1">
                    {items.map((name) => {
                      const mine = owned.get(canonicalMarker(name))
                      const status = tierToStatus(mine?.tier)
                      const meta = STATUS_META[status]
                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => onSelect(mine?.name ?? name)}
                          className="w-full text-left flex items-center gap-3 px-2.5 py-2 rounded-[12px] hover:bg-[rgba(26,28,26,0.04)] transition-colors group"
                        >
                          <IconBadge icon={iconForMarker(name)} tone={markerTone(name)} variant="tint" size="sm" />
                          <span className="flex-1 min-w-0">
                            <span className="block text-[13px] font-medium text-ink truncate leading-tight">{name}</span>
                            <span className="block text-[10.5px] text-ink-3 truncate leading-tight">{subForMarker(name)}</span>
                          </span>
                          {mine ? (
                            <>
                              <span className="text-[12px] font-semibold text-ink tabular-nums shrink-0">
                                {mine.value} <span className="text-[10px] font-normal text-ink-3">{mine.unit}</span>
                              </span>
                              <span
                                className={cn(
                                  'inline-flex items-center px-2 py-0.5 rounded-pill text-[10px] font-semibold uppercase tracking-wide shrink-0',
                                  meta.cls,
                                )}
                              >
                                {meta.label}
                              </span>
                            </>
                          ) : (
                            <span
                              className={cn(
                                'inline-flex items-center px-2 py-0.5 rounded-pill text-[10px] font-semibold uppercase tracking-wide shrink-0',
                                STATUS_META.no_data.cls,
                              )}
                            >
                              No data
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
          {sections.length === 0 && (
            <p className="text-[12px] text-ink-3 italic px-1">
              No biomarkers match &quot;{query.trim()}&quot;.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}

// ── Explanations: single-biomarker drill-down (v7 image 6) ────────────────
function ExplanationsDrill({
  marker,
  markers,
  onSelect,
  onClear,
  onGoToComparisons,
}: {
  marker: DrillMarker
  markers: VMarker[]
  onSelect: (name: string) => void
  onClear: () => void
  onGoToComparisons: (name: string) => void
}) {
  const c = getContent(marker.name)
  const first = marker.name.split(' ')[0]

  return (
    <div className="space-y-5">
      <DrillHeader marker={marker} markers={markers} onSelect={onSelect} onClear={onClear} />
      {marker.value != null && (
        <button
          type="button"
          onClick={() => onGoToComparisons(marker.name)}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-pill text-[12px] font-medium text-sage-deep tile tile-hover"
        >
          View comparisons for {marker.name}
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
        </button>
      )}

      <Card variant="premium" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
              <Sparkles className="w-3 h-3" strokeWidth={2.25} />
              Understanding {marker.name.toLowerCase()}
            </div>
            <div className="font-serif text-[22px] sm:text-[26px] text-ink leading-[1.12] tracking-tight">
              What does {first.toLowerCase()}{' '}
              <span className="italic-accent text-[1em] text-sage-deep">do?</span>
            </div>
            <p className="text-caption text-ink-2 mt-2 leading-snug max-w-[44ch]">
              {c.explainIntro}
            </p>
          </div>
          <div className="relative w-[88px] h-[88px] shrink-0">
            <Leaf className="absolute top-2 right-6 w-7 h-7 text-sage-deep rotate-[18deg]" strokeWidth={1.5} />
            <Leaf className="absolute top-8 right-2 w-9 h-9 text-sage rotate-[-12deg]" strokeWidth={1.5} />
            <Leaf className="absolute bottom-2 right-8 w-5 h-5 text-sage-soft rotate-[35deg]" strokeWidth={1.5} />
          </div>
        </div>
      </Card>

      <Card variant="glass" padding="lg">
        <Accordion
          items={[
            { icon: ShieldCheck,     title: 'Why it matters',                          body: c.whyItMatters,     defaultOpen: true },
            { icon: Droplet,         title: 'What low levels may mean',                body: c.lowMeans },
            { icon: Flame,           title: 'What high levels may mean',               body: c.highMeans },
            { icon: Activity,        title: `Factors that influence ${first.toLowerCase()}`, body: c.factors },
            { icon: Heart,           title: 'How it relates to your health',           body: c.relatesToHealth },
          ]}
        />
      </Card>

      <Card variant="glass-sage" padding="lg" className="relative overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="font-sans text-[14px] font-semibold text-ink leading-tight">
              Want to learn more?
            </div>
            <p className="text-[12px] text-ink-2 leading-snug mt-1 max-w-[40ch]">
              Explore our full guide to {marker.name.toLowerCase()} and {marker.sub.toLowerCase() || 'your health'}.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 mt-3 h-8 px-3 rounded-pill text-[12px] font-medium text-sage-deep bg-white/80 ring-1 ring-inset ring-[rgba(111,143,107,0.22)] hover:bg-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" strokeWidth={2.25} />
              Read guide
            </Link>
          </div>
          <div className="relative w-[72px] h-[72px] shrink-0">
            <Leaf className="absolute top-1 right-4 w-7 h-7 text-sage rotate-[14deg]" strokeWidth={1.5} />
            <Leaf className="absolute bottom-1 right-7 w-5 h-5 text-sage-soft rotate-[40deg]" strokeWidth={1.5} />
          </div>
        </div>
      </Card>
    </div>
  )
}

// ── Tab 4: RECOMMENDATIONS ───────────────────────────────────────────────
function RecommendationsTab({
  markers,
  selected,
  onSelect,
  onClear,
}: {
  markers: VMarker[]
  selected: DrillMarker | null
  onSelect: (name: string) => void
  onClear: () => void
}) {
  if (selected) {
    return (
      <RecommendationsDrill
        marker={selected}
        markers={markers}
        onSelect={onSelect}
        onClear={onClear}
      />
    )
  }
  if (markers.length === 0) {
    return (
      <HeroIntroCard
        eyebrow="Personalised recommendations"
        lead="Actionable steps to improve"
        accent="your biomarker health."
        body="Upload a blood test and you'll get specific, value-aware recommendations for every marker that needs attention."
        decoration="leaves"
        cta={{ label: 'Upload first lab', href: '/blood/upload', icon: Upload }}
      />
    )
  }
  return <RecommendationsOverview markers={markers} onSelect={onSelect} />
}

function RecommendationsOverview({
  markers,
  onSelect,
}: {
  markers: VMarker[]
  onSelect: (name: string) => void
}) {
  const needsAttention = markers.filter((m) => m.tier === 'T2' || m.tier === 'T3')
  const focusAreas = (needsAttention.length > 0 ? needsAttention.slice(0, 5) : markers.slice(0, 3)).map((m) => ({
    key: m.name,
    icon: m.icon,
    title: m.name,
    detail: personalisedRec(m.name, m.value, m.unit ?? '', m.tier, m.refMin, m.refMax),
    marker: m,
  }))

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
            <button
              key={f.key}
              type="button"
              onClick={() => onSelect(f.marker.name)}
              className="w-full text-left flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile tile-hover group"
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
              <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
            </button>
          ))}
        </div>
      </Card>

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-3">Lifestyle foundations</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {foundations.map((f) => (
            <div
              key={f.key}
              className="rounded-card p-3 tile flex flex-col items-center text-center"
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
          className="mt-4 flex items-center justify-between gap-3 rounded-card tile-sage tile-hover px-3.5 py-3 group"
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

// ── Recommendations: single-biomarker drill-down (v7 image 6) ─────────────
function RecommendationsDrill({
  marker,
  markers,
  onSelect,
  onClear,
}: {
  marker: DrillMarker
  markers: VMarker[]
  onSelect: (name: string) => void
  onClear: () => void
}) {
  const c = getContent(marker.name)
  const recText = marker.value != null && marker.tier
    ? personalisedRec(marker.name, marker.value, marker.unit ?? '', marker.tier, marker.refMin, marker.refMax)
    : `Upload a blood test that includes ${marker.name} and your recommendations here will be tailored to your exact level.`

  return (
    <div className="space-y-5">
      <DrillHeader marker={marker} markers={markers} onSelect={onSelect} onClear={onClear} />

      <Card variant="premium" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
              <Sparkles className="w-3 h-3" strokeWidth={2.25} />
              Personalised for you
            </div>
            <div className="font-serif text-[22px] sm:text-[26px] text-ink leading-[1.12] tracking-tight">
              Here are ways to optimise{' '}
              <span className="italic-accent text-[1em] text-sage-deep">your {marker.name.toLowerCase()}.</span>
            </div>
            <p className="text-caption text-ink-2 mt-2 leading-snug max-w-[44ch]">
              {recText}
            </p>
          </div>
          <div className="relative w-[88px] h-[88px] shrink-0">
            <Leaf className="absolute top-2 right-6 w-7 h-7 text-sage-deep rotate-[18deg]" strokeWidth={1.5} />
            <Leaf className="absolute top-8 right-2 w-9 h-9 text-sage rotate-[-12deg]" strokeWidth={1.5} />
            <Leaf className="absolute bottom-2 right-8 w-5 h-5 text-sage-soft rotate-[35deg]" strokeWidth={1.5} />
          </div>
        </div>
      </Card>

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-3">Lifestyle recommendations</div>
        <div className="space-y-2.5">
          {c.lifestyle.map((l) => (
            <div
              key={l.title}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile"
            >
              <IconBadge icon={l.icon} tone="sage" variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                  {l.title}
                </div>
                <p className="text-[11.5px] text-ink-3 leading-snug mt-1">{l.detail}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 mt-0.5" strokeWidth={2.25} />
            </div>
          ))}
        </div>
      </Card>

      {c.supplements.length > 0 && (
        <Card variant="glass" padding="lg">
          <div className="text-eyebrow uppercase text-ink-3 mb-3">Supplements to consider</div>
          <div className="space-y-2.5">
            {c.supplements.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile"
              >
                <IconBadge icon={PillIcon} tone="amber" variant="tint" size="md" />
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                    {s.name}
                  </div>
                  <p className="text-[11.5px] text-ink-3 leading-snug mt-1">{s.detail}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide shrink-0 bg-[rgba(237,198,138,0.30)] text-[#A77530] ring-1 ring-inset ring-[rgba(217,160,91,0.30)]">
                  {s.tag}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex items-start gap-2.5 rounded-card tile px-3.5 py-3">
        <ShieldCheck className="w-4 h-4 text-ink-3 shrink-0 mt-0.5" strokeWidth={2} />
        <p className="text-[11px] text-ink-3 leading-snug">
          Always consult a healthcare professional before starting any new supplements.
        </p>
      </div>
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
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill tile">
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
          ? 'btn-sage text-white'
          : 'tile tile-hover text-ink-2',
      )}
    >
      {children}
    </button>
  )
}

// ── Drill-down: shared header (back + biomarker selector) ─────────────────
function DrillHeader({
  marker,
  markers,
  onSelect,
  onClear,
}: {
  marker: DrillMarker
  markers: VMarker[]
  onSelect: (name: string) => void
  onClear: () => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1 h-9 px-2.5 rounded-pill text-[12px] font-medium text-ink-2 tile tile-hover shrink-0"
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.25} />
        All
      </button>
      <BiomarkerSelect marker={marker} markers={markers} onSelect={onSelect} />
    </div>
  )
}

// Pill-style dropdown to switch the drilled biomarker (v7 image 6).
function BiomarkerSelect({
  marker,
  markers,
  onSelect,
}: {
  marker: DrillMarker
  markers: VMarker[]
  onSelect: (name: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 h-9 px-3 rounded-pill text-[13px] font-medium text-ink tile tile-hover"
      >
        <span className="flex items-center gap-2 min-w-0">
          <marker.icon className="w-3.5 h-3.5 text-sage-deep shrink-0" strokeWidth={2.25} />
          <span className="truncate">{marker.name}</span>
        </span>
        <ChevronDown
          className={cn('w-4 h-4 text-ink-3 shrink-0 transition-transform', open && 'rotate-180')}
          strokeWidth={2.25}
        />
      </button>

      {open && markers.length > 0 && (
        <>
          {/* Click-away backdrop */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute z-50 mt-1.5 left-0 right-0 max-h-72 overflow-y-auto rounded-card bg-white shadow-float ring-1 ring-inset ring-[rgba(184,168,144,0.22)] p-1.5">
            {markers.map((m) => {
              const active = m.name === marker.name
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => {
                    onSelect(m.name)
                    setOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[12px] text-left transition-colors',
                    active ? 'bg-[rgba(168,191,163,0.18)]' : 'hover:bg-[rgba(26,28,26,0.04)]',
                  )}
                >
                  <m.icon className="w-3.5 h-3.5 text-sage-deep shrink-0" strokeWidth={2.25} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13px] font-medium text-ink truncate leading-tight">{m.name}</span>
                    <span className="block text-[10.5px] text-ink-3 truncate leading-tight">{m.sub}</span>
                  </span>
                  {active && <Check className="w-4 h-4 text-sage-deep shrink-0" strokeWidth={2.5} />}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// A single comparison row: label + value, with a track that shows the
// optimal band and either a point marker or a highlighted range band.
function CompareRow({
  label,
  sub,
  valueText,
  scaleMin,
  scaleMax,
  optimalMin,
  optimalMax,
  point,
  pointTone = 'sage',
  rangeMin,
  rangeMax,
  emphasiseRange,
}: {
  label: string
  sub?: string
  valueText: string
  scaleMin: number
  scaleMax: number
  optimalMin?: number
  optimalMax?: number
  point?: number
  pointTone?: 'sage' | 'ink'
  rangeMin?: number
  rangeMax?: number
  emphasiseRange?: boolean
}) {
  const span = scaleMax - scaleMin || 1
  const pct = (v: number) => Math.max(0, Math.min(100, ((v - scaleMin) / span) * 100))
  const dotColor = pointTone === 'ink' ? '#8A8C8A' : '#6F8F6B'

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-1.5">
        <span className="text-[12px] text-ink-2">
          {label}
          {sub && <span className="text-ink-3"> · {sub}</span>}
        </span>
        <span className="text-[12px] font-semibold text-ink tabular-nums shrink-0">{valueText}</span>
      </div>
      <div className="relative h-2.5 rounded-pill bg-[rgba(26,28,26,0.05)] overflow-hidden">
        {/* Faint optimal band for context on every row */}
        {optimalMin != null && optimalMax != null && (
          <div
            className="absolute top-0 h-full bg-[rgba(168,191,163,0.22)]"
            style={{ left: `${pct(optimalMin)}%`, width: `${pct(optimalMax) - pct(optimalMin)}%` }}
          />
        )}
        {/* Solid range band (personal / optimal-emphasised rows) */}
        {rangeMin != null && rangeMax != null && (
          <div
            className={cn(
              'absolute top-0 h-full rounded-pill',
              emphasiseRange ? 'bg-[rgba(111,143,107,0.55)]' : 'bg-[rgba(111,143,107,0.40)]',
            )}
            style={{ left: `${pct(rangeMin)}%`, width: `${Math.max(pct(rangeMax) - pct(rangeMin), 2)}%` }}
          />
        )}
        {/* Point marker */}
        {point != null && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-2 ring-white shadow-[0_2px_4px_rgba(26,28,26,0.18)]"
            style={{ left: `calc(${pct(point)}% - 6px)`, background: dotColor }}
          />
        )}
      </div>
    </div>
  )
}

// Lightweight expand/collapse list used by the Explanations drill-down.
function Accordion({
  items,
}: {
  items: { icon: LucideIcon; title: string; body: string; defaultOpen?: boolean }[]
}) {
  return (
    <div className="divide-y divide-[rgba(184,168,144,0.20)]">
      {items.map((it, i) => (
        <AccordionItem key={i} {...it} />
      ))}
    </div>
  )
}

function AccordionItem({
  icon: Icon,
  title,
  body,
  defaultOpen,
}: {
  icon: LucideIcon
  title: string
  body: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="py-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 py-2.5 text-left group"
      >
        <IconBadge icon={Icon} tone="sage" variant="tint" size="sm" />
        <span className="flex-1 min-w-0 font-sans text-[13.5px] font-semibold text-ink leading-tight">
          {title}
        </span>
        <ChevronDown
          className={cn('w-4 h-4 text-ink-3 shrink-0 transition-transform', open && 'rotate-180')}
          strokeWidth={2.25}
        />
      </button>
      {open && (
        <p className="text-[12.5px] text-ink-2 leading-relaxed pb-3 pl-10 pr-1">{body}</p>
      )}
    </div>
  )
}
