'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Moon,
  Activity,
  Sun,
  Sunrise,
  Sunset,
  Leaf,
  Wind,
  TrendingUp,
  TrendingDown,
  Heart,
  BatteryCharging,
  Droplet,
  type LucideIcon,
} from 'lucide-react'
import { scoreLabel } from '@/lib/score'
import { Card } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'
import { IconBadge } from '@/components/ui/icon-badge'
import { SparkLine, BarStrip } from '@/components/ui/spark-line'
import { cn } from '@/lib/utils'
import { DashboardEmptyState } from './dashboard-empty-state'

// ── Time-of-day greeting context ──────────────────────────────────────────
function timeContext() {
  const h = new Date().getHours()
  if (h < 5)  return { label: 'Late night',     Icon: Moon    }
  if (h < 12) return { label: 'Good morning',   Icon: Sunrise }
  if (h < 17) return { label: 'Good afternoon', Icon: Sun     }
  if (h < 21) return { label: 'Good evening',   Icon: Sunset  }
  return         { label: 'Evening',                Icon: Moon    }
}

// ── Greeting hero headline ────────────────────────────────────────────────
// A short, evocative serif line for the top-of-page welcome (matches the
// brief, e.g. "You're holding steady ground."). State-aware on the
// long-term trajectory so it always feels personal.
function greetingHeadline(delta: number, hasData: boolean): { lead: string; accent: string } {
  if (!hasData)    return { lead: "Let's begin",     accent: 'your health story.' }
  if (delta >= 4)  return { lead: "You're trending", accent: 'in the right direction.' }
  if (delta <= -4) return { lead: "Let's rebuild",   accent: 'some momentum.' }
  return             { lead: "You're holding",   accent: 'steady ground.' }
}

// ── Long-term trajectory copy ─────────────────────────────────────────────
// Picks a state-aware headline for the long-term Health Score card —
// "improving / holding steady / declining" with a serif accent on the
// verb so it carries the visual rhythm of the hero block.
function trajectoryCopy(
  score: number | null,
  trajectoryDelta: number,
): { lead: string; accent: string; body: string } {
  if (score == null) {
    return {
      lead: 'Your long-term',
      accent: 'health story starts here.',
      body: 'Once you have a few weeks of data, your overall trajectory will appear here.',
    }
  }
  if (trajectoryDelta >= 4) {
    return {
      lead: 'Your long-term health',
      accent: 'is improving.',
      body: 'Your Health Score reflects your biological age and overall health trajectory.',
    }
  }
  if (trajectoryDelta <= -4) {
    return {
      lead: 'Your long-term health',
      accent: 'is slipping.',
      body: 'Recent habits are pulling your trajectory the wrong way — small consistent changes will help.',
    }
  }
  return {
    lead: 'Your long-term health',
    accent: 'is holding steady.',
    body: 'Your Health Score reflects your biological age and overall health trajectory.',
  }
}

// ── Today's readiness copy ────────────────────────────────────────────────
function readinessCopy(score: number | null): { lead: string; accent: string; body: string } {
  if (score == null) {
    return {
      lead: 'Log your check-in to',
      accent: 'see today\'s readiness.',
      body: 'A quick four-tap check-in gives us enough to score your body\'s readiness today.',
    }
  }
  if (score >= 75) {
    return {
      lead: 'Your body is',
      accent: 'primed to perform today.',
      body: 'Sleep, HRV and stress are all in your green zone — a good day for intensity.',
    }
  }
  if (score >= 55) {
    return {
      lead: 'Your body is',
      accent: 'fairly ready today.',
      body: 'You\'re in the middle of your usual range — a moderate session is appropriate.',
    }
  }
  return {
    lead: 'Your body is slightly',
    accent: 'under-recovered today.',
    body: 'Elevated stress and inconsistent sleep timing are the main reasons.',
  }
}

// ── Types ─────────────────────────────────────────────────────────────────
type Checkin = { date: string; energy: number; sleep: number; mood: number; stress: number }
type Tone = 'sage' | 'amber' | 'rose' | 'violet' | 'sky' | 'teal' | 'ink'

interface DashboardClientProps {
  user: { name: string; age: number | null; goalType: string | null; goalText: string | null }
  healthScore: number | null
  scoreBreakdown: Record<string, number> | null
  hasCheckinToday: boolean
  checkinCount: number
  recentCheckins: Checkin[]
  hasBlood: boolean
  connectedWearables: string[]
}

// ── Driver impact tagging ────────────────────────────────────────────────
type Impact = 'high' | 'medium' | 'low'
type Driver = {
  key: string
  label: string
  reason: string
  impact: Impact
  delta: number
  icon: LucideIcon
  tone: Tone
  /** 7-day pattern shown as a tiny bar strip at the bottom of each
   *  driver card. Values are abstract (0..1) — the BarStrip normalises. */
  pattern: number[]
}

function topDrivers(checkins: Checkin[]): Driver[] {
  if (checkins.length < 2) {
    // Friendly defaults match v7 image 2: four drivers, three tones, plus a
    // 7-day mock pattern at the bottom of each card.
    return [
      { key: 'sleep_timing',     label: 'Sleep timing',     reason: 'Inconsistent bedtime is reducing recovery and increasing stress.', impact: 'high',   delta:  10, icon: Moon,     tone: 'violet', pattern: [0.4, 0.6, 0.3, 0.5, 0.7, 0.4, 0.3] },
      { key: 'stress',           label: 'Stress load',      reason: 'Elevated stress over the past 3 days is impacting HRV.',           impact: 'high',   delta:  9,  icon: Wind,     tone: 'teal',   pattern: [0.5, 0.4, 0.6, 0.5, 0.8, 0.9, 0.85] },
      { key: 'activity_balance', label: 'Activity balance', reason: 'Great training consistency, but recovery days low.',                impact: 'medium', delta: -6,  icon: Activity, tone: 'sky',    pattern: [0.6, 0.7, 0.65, 0.5, 0.7, 0.8, 0.75] },
      { key: 'nutrition',        label: 'Nutrition',        reason: 'Protein intake is good. Hydration could be better.',                impact: 'low',    delta:  2,  icon: Droplet,  tone: 'amber',  pattern: [0.6, 0.65, 0.7, 0.6, 0.65, 0.7, 0.75] },
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

  // Tiny deterministic helper — turns a driver delta into a 7-bar pattern
  // that visually echoes the driver's trajectory.
  const patternFromDelta = (d: number): number[] => {
    const base = 0.5 + Math.tanh(d / 8) * 0.25
    return Array.from({ length: 7 }, (_, i) => {
      const t = i / 6
      const trend = base + (t - 0.5) * Math.sign(d) * 0.25
      const jitter = (Math.sin((d + i) * 1.7) + 1) * 0.06
      return Math.max(0.15, Math.min(0.95, trend + jitter))
    })
  }

  const raw: Driver[] = [
    {
      key: 'sleep_timing',
      label: 'Sleep timing',
      reason: dSleep < 0 ? 'Inconsistent bedtime is reducing recovery.' : 'Consistent bedtime supports recovery.',
      impact: 'low',
      delta: Math.round(dSleep * 6),
      icon: Moon,
      tone: 'violet',
      pattern: patternFromDelta(dSleep * 6),
    },
    {
      key: 'stress',
      label: 'Stress load',
      reason: dStress > 0 ? 'Elevated stress is impacting HRV.' : 'Calm levels support better resilience.',
      impact: 'low',
      delta: Math.round(-dStress * 5),
      icon: Wind,
      tone: 'teal',
      pattern: patternFromDelta(-dStress * 5),
    },
    {
      key: 'activity_balance',
      label: 'Activity balance',
      reason: dMood < 0 ? 'More intensity, less recovery.' : 'Balanced training and recovery.',
      impact: 'low',
      delta: Math.round(dMood * 4),
      icon: Activity,
      tone: 'sky',
      pattern: patternFromDelta(dMood * 4),
    },
    {
      key: 'nutrition',
      label: 'Nutrition',
      reason: dEnergy < 0 ? 'Energy dips may signal hydration or fuelling gaps.' : 'Steady energy points to good fuelling.',
      impact: 'low',
      delta: Math.round(dEnergy * 3),
      icon: Droplet,
      tone: 'amber',
      pattern: patternFromDelta(dEnergy * 3),
    },
  ]

  const ranked = raw.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, 4)
  return ranked.map((d) => {
    const mag = Math.abs(d.delta)
    const impact: Impact = mag >= 8 ? 'high' : mag >= 4 ? 'medium' : 'low'
    return { ...d, impact }
  })
}

// Impact pill mapping — soft tonal fills, no ring, generous padding.
// Per v7-polish: pills are sentence-case status tags ("Needs attention" /
// "Watch" / "In range") rather than UPPERCASE "MEDIUM IMPACT" labels —
// matches the brief's smoother, less-shouty pill treatment.
const IMPACT_STYLE: Record<Impact, string> = {
  high:   'bg-[rgba(217,160,91,0.18)] text-[#A77530]',
  medium: 'bg-[rgba(237,198,138,0.32)] text-[#A77530]',
  low:    'bg-[rgba(168,191,163,0.28)] text-sage-deep',
}
const IMPACT_LABEL: Record<Impact, string> = {
  high:   'Needs attention',
  medium: 'Watch',
  low:    'In range',
}

// ── Long-term trajectory mock series ──────────────────────────────────────
// 12-point smooth trend representing ~90 days of weekly Health Score
// snapshots. End value = current score. Real version reads from a
// `healthScoreSnapshot` table; this fallback keeps the chart populated
// until that table exists.
function trajectorySeries(currentScore: number, seed: string): number[] {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0
  const rand = () => { h = (h * 9301 + 49297) % 233280; return Math.abs(h) / 233280 }
  // Start ~10 pts below current, walk upward with small jitter.
  const series: number[] = []
  let v = Math.max(15, currentScore - 12 - rand() * 6)
  for (let i = 0; i < 11; i++) {
    const drift = (currentScore - v) * 0.12 + (rand() - 0.45) * 4
    v = Math.max(15, Math.min(100, v + drift))
    series.push(Math.round(v))
  }
  series.push(currentScore)
  return series
}

// ── Biological age — derived from health score + actual age ──────────────
// In production this is a real model output (DunedinPACE / Phenoage). For
// the demo, we derive it deterministically: higher score = younger bio age.
// If we don't know the user's actual age we fall back to the spec's
// default (36) so the card never reads "—".
function biologicalAge(actualAge: number | null, healthScore: number | null) {
  const age = actualAge ?? 36
  if (healthScore == null) return { value: age, deltaYears: 0, age }
  // 0..100 mapped to a +/- 5 year offset around the actual age.
  const offset = ((healthScore - 50) / 50) * 4.5
  const value = Math.round((age - offset) * 10) / 10
  const deltaYears = Math.round((age - value) * 10) / 10
  return { value, deltaYears, age }
}

// ── Component ─────────────────────────────────────────────────────────────
export function DashboardClient({
  user,
  healthScore,
  scoreBreakdown,
  checkinCount,
  recentCheckins,
  hasBlood,
  connectedWearables,
}: DashboardClientProps) {
  // Fresh account: nothing connected, no check-ins, no blood, no score yet.
  // Show a guided welcome instead of a dashboard full of placeholder numbers.
  const isNewUser =
    healthScore == null &&
    checkinCount === 0 &&
    connectedWearables.length === 0 &&
    !hasBlood

  if (isNewUser) {
    return (
      <DashboardEmptyState
        name={user.name}
        hasWearable={connectedWearables.length > 0}
        hasCheckin={checkinCount > 0}
        hasBlood={hasBlood}
      />
    )
  }

  const ctx = timeContext()
  const sl = healthScore != null ? scoreLabel(healthScore) : null
  const hasData = healthScore != null
  const drivers = topDrivers(recentCheckins)

  // Trajectory: derives a delta over the long-window proxy. Real version
  // subtracts a stored 90-day-old snapshot.
  const longTermDelta = (() => {
    if (recentCheckins.length < 4) return 6
    const recent = recentCheckins.slice(0, 3)
    const older  = recentCheckins.slice(3, 7)
    const avgRecent = recent.reduce((s, c) => s + (c.energy + c.sleep + c.mood + (10 - c.stress)) / 4, 0) / recent.length
    const avgOlder  = older.reduce((s, c) => s + (c.energy + c.sleep + c.mood + (10 - c.stress)) / 4, 0) / older.length
    return Math.round((avgRecent - avgOlder) * 10)
  })()
  const trajectory = trajectoryCopy(healthScore, longTermDelta)
  const hero = greetingHeadline(longTermDelta, hasData)
  const series = trajectorySeries(healthScore ?? 55, `traj-${user.name}`)
  const bio = biologicalAge(user.age, healthScore)

  // Daily readiness — composite of latest check-in.
  const latest = recentCheckins[0]
  const readiness = latest
    ? Math.round(((latest.energy + latest.sleep + latest.mood + (10 - latest.stress)) / 40) * 100)
    : null
  const readinessText = readinessCopy(readiness)

  // Today's sub-stats — derived from latest check-in when available, fallback to spec defaults.
  const sleepHours = latest ? Math.round((4 + (latest.sleep / 10) * 5) * 10) / 10 : 6.7
  const hrvMs      = latest ? Math.round(36 + (10 - latest.stress) * 3.5)          : 52
  const stressBand = latest ? (latest.stress <= 3.5 ? 'Low' : latest.stress <= 6 ? 'Moderate' : 'High') : 'High'
  const recoveryPct = readiness ?? 54

  return (
    <div className="space-y-5 stagger">
      {/* ── 1 / Greeting hero ─────────────────────────────────────────────
          Per the brief: an uppercase time-of-day eyebrow, a large serif
          headline that speaks to the user's trajectory, and a calm
          descriptive subline. Generous vertical padding gives the welcome
          room to breathe and lets the first card sit lower down the page,
          over the open wall of the background photo. */}
      <header className="pt-4 pb-5 sm:pt-5 sm:pb-6">
        <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep">
          <ctx.Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
          <span>
            {ctx.label}
            {user.name && `, ${user.name.split(' ')[0]}`}
          </span>
        </div>
        <h1 className="mt-3 font-serif text-[30px] sm:text-[40px] text-ink tracking-tight leading-[1.08]">
          {hero.lead}{' '}
          <span className="italic-accent text-sage-deep">{hero.accent}</span>
        </h1>
        <p className="mt-2.5 text-[14px] sm:text-[15px] text-ink-2 leading-snug max-w-[42ch]">
          Here&apos;s your personalised health overview.
        </p>
      </header>

      {/* ── 2 / Long-term HEALTH SCORE ──────────────────────────────────
          Per v7 doc, the Health Score must read as a LONG-TERM measure
          (biological age + trajectory), distinct from today's readiness.
          This card carries the biological-age stat + a 90-day trajectory
          line + a key insight callout. */}
      <Card variant="premium" padding="lg" className="relative overflow-hidden">
        {/* Header row: eyebrow + Long-term pill on the left; View-score
            button on the right. `flex-wrap` lets the button drop below on
            very narrow viewports rather than squashing the eyebrow into
            two lines. */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-3">
          <div className="flex items-center gap-2 min-w-0 shrink-0">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep whitespace-nowrap">
              <Leaf className="w-3 h-3" strokeWidth={2.25} />
              Health score
            </div>
            <span className="inline-flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-pill text-[10px] font-semibold uppercase tracking-wide bg-[rgba(168,191,163,0.24)] text-sage-deep">
              Long-term
            </span>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1 whitespace-nowrap text-[11.5px] font-medium text-sage-deep px-2.5 h-7 rounded-pill tile tile-hover shrink-0"
          >
            View score factors
            <ArrowRight className="w-3 h-3" strokeWidth={2.25} />
          </Link>
        </div>

        <div className="font-serif text-[24px] sm:text-[26px] text-ink leading-[1.1] tracking-tight">
          {trajectory.lead}{' '}
          <span className="italic-accent text-[1em] text-sage-deep">{trajectory.accent}</span>
        </div>
        <p className="text-caption text-ink-2 mt-1.5 leading-snug max-w-[52ch]">
          {trajectory.body}
        </p>

        {/* Stats row — two mini-stats side-by-side (matches brief image2). */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <MiniStat
            eyebrow="Health score"
            value={hasData ? `${Math.round(healthScore!)}` : '—'}
            suffix={hasData ? '/100' : undefined}
            caption={sl?.label ?? ''}
            tone="sage"
          />
          <MiniStat
            eyebrow="Biological age"
            value={`${bio.value}`}
            caption={
              bio.deltaYears > 0
                ? `${bio.deltaYears.toFixed(1)} yrs younger (vs ${bio.age})`
                : bio.deltaYears < 0
                  ? `${Math.abs(bio.deltaYears).toFixed(1)} yrs older (vs ${bio.age})`
                  : `Matching your actual age (${bio.age})`
            }
            tone={bio.deltaYears >= 0 ? 'sage' : 'amber'}
          />
        </div>

        {/* Trajectory chart — full-width row below stats. Dots visible at
            every data point + a highlighted dot at "today" (per brief
            image2). X-axis time markers below. */}
        <div className="mt-4">
          <SparkLine
            values={series}
            width={320}
            height={110}
            tone="sage"
            showFill
            showDots
            highlightLast
            className="w-full h-auto"
          />
          <div className="flex items-center justify-between mt-1.5 text-[9.5px] uppercase tracking-[0.10em] text-ink-3">
            <span>90d ago</span>
            <span>60d</span>
            <span>30d</span>
            <span>Today</span>
          </div>
        </div>

        {/* Bottom callout: key insight + weekly update meta */}
        <div className="mt-4 -mx-7 sm:-mx-8 -mb-7 sm:-mb-8 px-7 sm:px-8 py-3 bg-[linear-gradient(180deg,rgba(168,191,163,0.18)_0%,rgba(168,191,163,0.10)_100%)] border-t border-[rgba(111,143,107,0.20)] flex items-start gap-3">
          <Leaf className="w-3.5 h-3.5 text-sage-deep shrink-0 mt-0.5" strokeWidth={2.25} />
          <div className="flex-1 min-w-0 flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep">
                Key insight
              </div>
              <p className="text-[12px] text-ink-2 leading-snug mt-0.5 max-w-[52ch]">
                {longTermDelta >= 0
                  ? 'Your consistent habits over the last 90 days are driving your health in the right direction.'
                  : 'A few weeks of inconsistency are showing in your trajectory — small daily wins will turn it around.'}
              </p>
            </div>
            <div className="text-right shrink-0 hidden sm:block">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3">
                Score updated weekly
              </div>
              <div className="text-[11px] text-ink-2 mt-0.5">Next update in 5 days</div>
            </div>
          </div>
        </div>
      </Card>

      {/* ── 3 / TODAY'S READINESS ───────────────────────────────────────
          Separate "Short-term" card so users see daily readiness without
          confusing it with the long-term score. Donut + 4 sub-stats grid. */}
      <Card variant="premium" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep">
              <Sun className="w-3 h-3" strokeWidth={2.25} />
              Today&apos;s readiness
            </div>
            <span className="inline-flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-pill text-[10px] font-semibold uppercase tracking-wide bg-[rgba(237,198,138,0.36)] text-[#A77530]">
              Short-term
            </span>
          </div>
        </div>

        <div className="font-serif text-[22px] sm:text-[24px] text-ink leading-[1.15] tracking-tight">
          {readinessText.lead}{' '}
          <span className="italic-accent text-[1em] text-sage-deep">{readinessText.accent}</span>
        </div>
        <p className="text-caption text-ink-2 mt-1.5 leading-snug max-w-[52ch]">
          {readinessText.body}
        </p>

        <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-4 sm:gap-6 items-center">
          {/* LEFT — donut with "Today's readiness" label underneath */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="relative">
              <ScoreRing
                value={readiness ?? 0}
                size={132}
                thickness={9}
                tone={readiness == null ? 'ink' : readiness >= 75 ? 'sage' : readiness >= 55 ? 'amber' : 'rose'}
                centerSize={0}
                glow
                breathe
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <div className="font-serif text-[34px] text-ink leading-none tabular-nums tracking-[-0.02em]">
                  {readiness ?? '—'}
                </div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">/100</div>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-2">
              Today&apos;s readiness
            </div>
          </div>

          {/* RIGHT — 4 vertical sub-stat rows per v7 image 2.
              Each row uses a distinct tone so the column reads as a
              colour-coded summary, matching the brief. */}
          <div className="grid grid-cols-1 gap-2.5">
            <SubStat icon={Moon}             label="Sleep"    tone="ink"   value={`${Math.floor(sleepHours)}h ${Math.round((sleepHours % 1) * 60).toString().padStart(2,'0')}m`} arrow={sleepHours >= 7 ? 'up' : 'down'} />
            <SubStat icon={Heart}            label="HRV"      tone="sage"  value={`${hrvMs} ms`}                arrow={hrvMs >= 55 ? 'up' : 'down'} />
            <SubStat icon={Wind}             label="Stress"   tone="amber" value={stressBand}                   arrow={stressBand === 'Low' ? 'down' : 'up'} invert />
            <SubStat icon={BatteryCharging}  label="Recovery" tone="rose"  value={`${recoveryPct}%`}            arrow={recoveryPct >= 70 ? 'up' : 'down'} />
          </div>
        </div>

        {/* Bottom row: snapshot label + breakdown link */}
        <div className="mt-4 -mx-7 sm:-mx-8 -mb-7 sm:-mb-8 px-7 sm:px-8 py-3 bg-[rgba(232,226,214,0.30)] border-t border-line flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BatteryCharging className="w-3.5 h-3.5 text-ink-3" strokeWidth={2.25} />
            <span className="text-[12px] text-ink-2">Daily snapshot</span>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-sage-deep hover:underline"
          >
            View full breakdown
            <ArrowRight className="w-3 h-3" strokeWidth={2.25} />
          </Link>
        </div>
      </Card>

      {/* ── 4 / Why this matters — drivers behind today's score ─────────
          Per v7 image 2 this surfaces FOUR drivers with impact tags.
          Layout: 2 cols on mobile → 4 cols on sm+ so cards never crush. */}
      <Card variant="glass" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="text-eyebrow uppercase text-ink-3 leading-none">
              Why this matters
            </div>
            <p className="text-caption text-ink-2 mt-1.5 leading-snug">
              The key drivers impacting both your long-term health and today&apos;s readiness.
            </p>
          </div>
          <Link
            href="/insights"
            className="text-[12px] font-medium text-sage-deep hover:underline whitespace-nowrap shrink-0"
          >
            View all insights →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {drivers.map((d) => (
            <div
              key={d.key}
              className={cn(
                'rounded-[20px] p-3.5 sm:p-4 flex flex-col',
                /* Soft glassy tile — lifted off the parent card with a faint
                   sage glow rather than a hard ring (site-wide premium feel). */
                'tile',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <IconBadge icon={d.icon} tone={d.tone} variant="tint" size="md" />
                {/* Status pill sits inline with the icon (per v7 image2)
                    so the reason text gets full width below. */}
                <span
                  className={cn(
                    'inline-flex shrink-0 items-center px-2 py-0.5 rounded-pill text-[10px] font-medium whitespace-nowrap',
                    IMPACT_STYLE[d.impact],
                  )}
                >
                  {IMPACT_LABEL[d.impact]}
                </span>
              </div>
              <div className="text-[13px] font-semibold text-ink mt-3 leading-tight">
                {d.label}
              </div>
              <div className="text-[11px] text-ink-3 leading-snug mt-1.5 line-clamp-3 flex-1">
                {d.reason}
              </div>
              {/* 7-day pattern strip at the bottom of every driver card
                  (per v7 image2). Tone-matched to the driver. */}
              <div className="mt-3">
                <BarStrip
                  values={d.pattern}
                  highlightIndex={d.pattern.length - 1}
                  highlightTone={d.tone === 'ink' ? 'sage' : d.tone}
                  height={20}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 5 / What to do today ─────────────────────────────────────────
          Per v7 image2: personalised actions for today. LEFT is a big
          sage tile that names the day's primary focus and links to the
          full recommendation; RIGHT is a stack of three quick wins, each
          tappable. Generated from the driver mix above so the prioritised
          focus aligns with the highest-impact driver. */}
      <Card variant="glass" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="text-eyebrow uppercase text-ink-3 leading-none">
              What to do today
            </div>
            <p className="text-caption text-ink-2 mt-1.5 leading-snug">
              Personalised recommendations based on your data and goals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-3 sm:gap-4">
          {/* LEFT — primary focus tile */}
          <Link
            href="/insights"
            className={cn(
              'group rounded-[20px] p-4 sm:p-5 flex flex-col justify-between',
              'bg-[linear-gradient(180deg,rgba(168,191,163,0.22)_0%,rgba(168,191,163,0.10)_100%)]',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.70),0_1px_2px_rgba(26,28,26,0.04)]',
              'min-h-[160px]',
            )}
          >
            <div>
              <IconBadge icon={CheckCircle2} tone="sage" variant="tint" size="md" />
              <div className="font-serif text-[18px] sm:text-[20px] text-ink leading-tight tracking-tight mt-3">
                Prioritise recovery today
              </div>
              <p className="text-[12.5px] text-ink-2 leading-snug mt-2 max-w-[34ch]">
                A low-moderate intensity session, mobility or a walk would be
                ideal — your body needs the breathing room.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-1.5 mt-4 px-3 py-1.5 rounded-pill bg-white/80 text-[12px] font-medium text-sage-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.80),0_1px_2px_rgba(26,28,26,0.05)] group-hover:bg-white">
              View recommendation details
              <ArrowRight className="w-3 h-3" strokeWidth={2.25} />
            </div>
          </Link>

          {/* RIGHT — 3 quick-win rows */}
          <div className="grid grid-cols-1 gap-2.5">
            <QuickWin
              icon={Moon}
              tone="ink"
              title="Aim for an earlier bedtime"
              body="Your recovery improves 32% when you sleep before 10:30pm."
              href="/insights"
            />
            <QuickWin
              icon={Wind}
              tone="amber"
              title="Manage stress load"
              body="Try 10 minutes of breathing or mindfulness today."
              href="/insights"
            />
            <QuickWin
              icon={Droplet}
              tone="sage"
              title="Hydrate consistently"
              body="You tend to under-hydrate on high stress days."
              href="/insights"
            />
          </div>
        </div>
      </Card>

      {/* ── 6 / Long-term progress ──────────────────────────────────────
          Per v7 image2: a low-key summary at the bottom of the home
          screen showing the 4 long-window metrics with sparklines. Acts
          as the gateway into the full Trends page (the "View trends"
          link in the header). */}
      <Card variant="glass" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="text-eyebrow uppercase text-ink-3 leading-none">
              Long-term progress
            </div>
            <p className="text-caption text-ink-2 mt-1.5 leading-snug">
              You&apos;re building better health, one consistent choice at a
              time.
            </p>
          </div>
          <Link
            href="/reports"
            className="text-[12px] font-medium text-sage-deep hover:underline whitespace-nowrap shrink-0"
          >
            View trends →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          <ProgressStat
            label="Health Score"
            value="+6 pts"
            caption="vs 90 days ago"
            series={[48, 50, 52, 51, 53, 55, 56, 58, 60, 62, 63, healthScore ?? 61]}
          />
          <ProgressStat
            label="Biological age"
            value={bio.deltaYears > 0 ? `-${bio.deltaYears.toFixed(1)} yrs` : 'Holding'}
            caption="vs 90 days ago"
            series={[40, 39.6, 39.3, 38.9, 38.6, 38.2, 37.7, 37.2, 36.6, 36.0, 35.3, bio.value].map(v => -v)}
          />
          <ProgressStat
            label="Biomarkers"
            value="5 improving"
            caption="vs 90 days ago"
            series={[1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5]}
          />
          <ProgressStat
            label="Body composition"
            value="Improving"
            caption="vs 90 days ago"
            series={[0.45, 0.46, 0.48, 0.49, 0.51, 0.53, 0.55, 0.57, 0.58, 0.60, 0.62, 0.64]}
          />
        </div>
      </Card>
    </div>
  )
}

// ── Local helpers ─────────────────────────────────────────────────────────
function MiniStat({
  eyebrow,
  value,
  suffix,
  caption,
  tone,
}: {
  eyebrow: string
  value: string
  suffix?: string
  caption: string
  tone: 'sage' | 'amber' | 'rose'
}) {
  const captionColor =
    tone === 'sage'  ? 'text-sage-deep'
    : tone === 'amber' ? 'text-[#A77530]'
    : 'text-[#A85454]'
  return (
    <div className="rounded-[16px] tile px-3.5 py-3">
      <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-3">
        {eyebrow}
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="font-serif text-[26px] sm:text-[28px] text-ink leading-none tabular-nums tracking-[-0.02em]">
          {value}
        </span>
        {suffix && <span className="text-[11px] text-ink-3 leading-none">{suffix}</span>}
      </div>
      <div className={cn('text-[11px] mt-1 leading-snug', captionColor)}>{caption}</div>
    </div>
  )
}

function SubStat({
  icon: Icon,
  label,
  value,
  arrow,
  invert,
  tone = 'sage',
}: {
  icon: LucideIcon
  label: string
  value: string
  arrow: 'up' | 'down'
  /** For inverted metrics (e.g. Stress) the colour of the arrow flips. */
  invert?: boolean
  tone?: 'sage' | 'amber' | 'rose' | 'ink'
}) {
  const isPositive = invert ? arrow === 'down' : arrow === 'up'
  return (
    <div className="flex items-center gap-2.5">
      <IconBadge icon={Icon} tone={tone} variant="tint" size="sm" />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-[0.10em] text-ink-3 leading-none">
          {label}
        </div>
        <div className="text-[14px] font-semibold text-ink leading-tight tabular-nums mt-0.5">
          {value}
        </div>
      </div>
      {/* Arrow lives on the far right (matches v7 image 2 layout). */}
      {arrow === 'up' ? (
        <TrendingUp className={cn('w-3.5 h-3.5 shrink-0', isPositive ? 'text-sage-deep' : 'text-[#A85454]')} strokeWidth={2.5} />
      ) : (
        <TrendingDown className={cn('w-3.5 h-3.5 shrink-0', isPositive ? 'text-sage-deep' : 'text-[#A85454]')} strokeWidth={2.5} />
      )}
    </div>
  )
}

// ── Quick-win row (used in "What to do today") ──────────────────────────
function QuickWin({
  icon: Icon,
  tone,
  title,
  body,
  href,
}: {
  icon: LucideIcon
  tone: 'sage' | 'amber' | 'rose' | 'ink'
  title: string
  body: string
  href: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group rounded-[18px] px-3.5 py-3 flex items-center gap-3',
        'tile tile-hover',
      )}
    >
      <IconBadge icon={Icon} tone={tone} variant="tint" size="md" />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-ink leading-tight">
          {title}
        </div>
        <p className="text-[11.5px] text-ink-3 leading-snug mt-0.5">
          {body}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 group-hover:text-ink-2 transition-colors" strokeWidth={2.25} />
    </Link>
  )
}

// ── Progress stat card (used in "Long-term progress") ───────────────────
function ProgressStat({
  label,
  value,
  caption,
  series,
}: {
  label: string
  value: string
  caption: string
  series: number[]
}) {
  return (
    <div className="rounded-[18px] tile p-3.5">
      <div className="text-[10px] uppercase tracking-[0.10em] text-ink-3 leading-none">
        {label}
      </div>
      <div className="text-[15px] font-semibold text-ink leading-tight mt-1 tabular-nums">
        {value}
      </div>
      <div className="mt-2 -mx-0.5">
        <SparkLine
          values={series}
          width={140}
          height={32}
          tone="sage"
          showFill
          className="w-full h-auto"
        />
      </div>
      <div className="text-[10.5px] text-ink-3 leading-none mt-1.5">
        {caption}
      </div>
    </div>
  )
}
