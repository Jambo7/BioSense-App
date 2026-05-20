/**
 * Trends — central registry of trackable metrics + helpers to compute
 * series, deltas and stats from raw check-in / health-score records.
 */

import {
  Activity,
  Zap,
  Moon,
  Smile,
  Flame,
  type LucideIcon,
} from 'lucide-react'

export type MetricSlug = 'score' | 'energy' | 'sleep' | 'mood' | 'stress'

export interface MetricMeta {
  slug: MetricSlug
  label: string
  hint: string
  icon: LucideIcon
  /** Visual tone used by the SparkLine + accents. */
  tone: 'sage' | 'amber' | 'rose' | 'ink'
  /** Numeric range used for chart axes / stat formatting. */
  range: [number, number]
  /** Display unit appended to numbers (e.g. "/10", " score"). */
  unit: string
  /**
   * If true, lower values are "better" — used to flip the colour of the
   * delta arrow (lower stress = sage / good).
   */
  invert?: boolean
  /** A short interpretation sentence shown on the detail page. */
  description: string
}

export const METRICS: Record<MetricSlug, MetricMeta> = {
  score: {
    slug: 'score',
    label: 'Health score',
    hint: 'Composite of all pillars',
    icon: Activity,
    tone: 'sage',
    range: [0, 100],
    unit: '',
    description:
      'A daily composite of sleep, recovery, stress, activity and biomarkers — your overall readiness signal.',
  },
  energy: {
    slug: 'energy',
    label: 'Energy',
    hint: 'How charged you felt',
    icon: Zap,
    tone: 'amber',
    range: [1, 10],
    unit: '/10',
    description:
      'How energised you felt at check-in. Driven by sleep, nutrition, stress and recovery in the days prior.',
  },
  sleep: {
    slug: 'sleep',
    label: 'Sleep',
    hint: 'Subjective sleep quality',
    icon: Moon,
    tone: 'sage',
    range: [1, 10],
    unit: '/10',
    description:
      'Your subjective rating of how well you slept. Strong, consistent sleep tends to lift every other pillar within 2 days.',
  },
  mood: {
    slug: 'mood',
    label: 'Mood',
    hint: 'Overall emotional tone',
    icon: Smile,
    tone: 'rose',
    range: [1, 10],
    unit: '/10',
    description:
      'A check on overall emotional tone. Often correlates with sleep quality and social/light exposure earlier in the day.',
  },
  stress: {
    slug: 'stress',
    label: 'Stress',
    hint: 'Lower is better',
    icon: Flame,
    tone: 'rose',
    invert: true,
    range: [1, 10],
    unit: '/10',
    description:
      'Perceived stress at check-in. Persistent elevated stress typically suppresses sleep quality and recovery.',
  },
}

/* ── Computation helpers ─────────────────────────────────────────────── */

export interface SeriesPoint {
  date: string  // YYYY-MM-DD
  value: number
}

export interface MetricStats {
  series: SeriesPoint[]    // chronological (oldest → newest)
  latest: number | null
  avg: number | null
  min: number | null
  max: number | null
  /** Difference between recent-window avg and previous-window avg. */
  delta: number | null
  /** Whether `delta` represents an improvement (respects `invert`). */
  improving: boolean | null
}

function avg(nums: number[]) {
  if (nums.length === 0) return null
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

/**
 * Build stats for a metric from a chronological series of points.
 *
 * `windowSize` controls the recent vs previous comparison (defaults to 7
 * for the standard "vs last week" delta).
 */
export function computeStats(
  points: SeriesPoint[],
  invert: boolean,
  windowSize = 7,
): MetricStats {
  if (points.length === 0) {
    return {
      series: [],
      latest: null,
      avg: null,
      min: null,
      max: null,
      delta: null,
      improving: null,
    }
  }

  const values = points.map((p) => p.value)
  const latest = values[values.length - 1]
  const seriesAvg = avg(values)!

  const recent = values.slice(-windowSize)
  const previous = values.slice(-windowSize * 2, -windowSize)
  const aR = avg(recent)
  const aP = avg(previous)
  const delta = aR !== null && aP !== null ? aR - aP : null

  let improving: boolean | null = null
  if (delta !== null) {
    if (Math.abs(delta) < 0.05) improving = null // ~flat
    else improving = invert ? delta < 0 : delta > 0
  }

  return {
    series: points,
    latest,
    avg: seriesAvg,
    min: Math.min(...values),
    max: Math.max(...values),
    delta,
    improving,
  }
}

/** Format a number with the metric's unit, sensible decimals. */
export function formatValue(meta: MetricMeta, n: number | null): string {
  if (n === null) return '—'
  // Health score (0-100) wants no decimals; check-in metrics (1-10) want 1.
  const decimals = meta.range[1] >= 50 ? 0 : 1
  return `${n.toFixed(decimals)}${meta.unit}`
}

export function formatDelta(meta: MetricMeta, n: number | null): string {
  if (n === null) return ''
  const decimals = meta.range[1] >= 50 ? 1 : 1
  const abs = Math.abs(n).toFixed(decimals)
  if (Math.abs(n) < 0.05) return 'no change'
  return `${n > 0 ? '+' : '−'}${abs}`
}
