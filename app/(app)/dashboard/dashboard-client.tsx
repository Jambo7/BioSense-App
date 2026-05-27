'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Sparkles,
  ArrowRight,
  Moon,
  Activity,
  Sun,
  Sunrise,
  Sunset,
  Leaf,
  Zap,
  Wind,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Heart,
  BatteryCharging,
  Droplet,
  type LucideIcon,
} from 'lucide-react'
import { scoreLabel } from '@/lib/score'
import { Card } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'
import { IconBadge } from '@/components/ui/icon-badge'
import { SparkLine } from '@/components/ui/spark-line'
import { cn } from '@/lib/utils'

// ── Time-of-day greeting context ──────────────────────────────────────────
function timeContext() {
  const h = new Date().getHours()
  if (h < 5)  return { label: 'Late night',     Icon: Moon    }
  if (h < 12) return { label: 'Good morning',   Icon: Sunrise }
  if (h < 17) return { label: 'Good afternoon', Icon: Sun     }
  if (h < 21) return { label: 'Good evening',   Icon: Sunset  }
  return         { label: 'Evening',                Icon: Moon    }
}

// Hero copy keyed off the latest health score so the headline feels alive.
// The `accent` fragment is what gets the playful serif treatment.
function heroCopy(score: number | null) {
  if (score == null) return { lead: 'Let\'s start', accent: 'understanding you.' }
  if (score >= 85)   return { lead: 'You\'re ready to',   accent: 'perform.'         }
  if (score >= 70)   return { lead: 'You\'re building',   accent: 'better balance.'  }
  if (score >= 55)   return { lead: 'You\'re holding',    accent: 'steady ground.'   }
  if (score >= 40)   return { lead: 'Your body needs',    accent: 'recovery.'        }
  return                   { lead: 'Time to',             accent: 'reset.'           }
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

// Heuristic insight derived from recent check-ins. Deterministic so the
// screen always feels populated; swap to live AI output once wired.
function insight(
  checkins: Checkin[],
): { title: string; body: string; tone: 'sage' | 'amber' | 'rose' } {
  if (checkins.length < 2) {
    return {
      title: 'Building your picture',
      body: 'Log a few daily check-ins and connect a wearable and your personalised insight will appear here.',
      tone: 'sage',
    }
  }
  const recent = checkins.slice(0, 3)
  const older  = checkins.slice(3, 7)
  const avg = (arr: Checkin[], k: keyof Checkin) =>
    arr.length ? arr.reduce((s, c) => s + (c[k] as number), 0) / arr.length : 0
  const dEnergy = avg(recent, 'energy') - avg(older, 'energy')
  const dSleep  = avg(recent, 'sleep')  - avg(older,  'sleep')
  const dStress = avg(recent, 'stress') - avg(older,  'stress')

  if (dSleep >= 0.5 && dStress <= -0.3) {
    return {
      title: 'Your recovery is improving',
      body: 'Great sleep and lower stress are positively impacting your energy levels today.',
      tone: 'sage',
    }
  }
  if (dEnergy <= -0.7 || dStress >= 0.8) {
    return {
      title: 'Stress is creeping in',
      body: 'Energy and stress have shifted the wrong way this week. A lighter day with extra sleep would help reset.',
      tone: 'rose',
    }
  }
  if (dEnergy >= 0.5) {
    return {
      title: 'Energy is on the rise',
      body: 'Your last few days show stronger energy than the week before. Keep up the rhythm you\'ve built.',
      tone: 'amber',
    }
  }
  return {
    title: 'You\'re tracking steadily',
    body: 'No big shifts this week — consistency is itself a win. Look for one small habit to push forward.',
    tone: 'sage',
  }
}

// ── Types ─────────────────────────────────────────────────────────────────
type Checkin = { date: string; energy: number; sleep: number; mood: number; stress: number }
type Tone = 'sage' | 'amber' | 'rose' | 'ink'

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
}

function topDrivers(checkins: Checkin[]): Driver[] {
  if (checkins.length < 2) {
    // Friendly defaults match v7 image 2: four drivers, three tones.
    return [
      { key: 'sleep_timing',     label: 'Sleep timing',     reason: 'Inconsistent bedtime is reducing recovery and increasing stress.', impact: 'high',   delta:  10, icon: Moon,     tone: 'rose'  },
      { key: 'stress',           label: 'Stress load',      reason: 'Elevated stress over the past 3 days is impacting HRV.',           impact: 'high',   delta:  9,  icon: Wind,     tone: 'rose'  },
      { key: 'activity_balance', label: 'Activity balance', reason: 'Great training consistency, but recovery days low.',                impact: 'medium', delta: -6,  icon: Activity, tone: 'amber' },
      { key: 'nutrition',        label: 'Nutrition',        reason: 'Protein intake is good. Hydration could be better.',                impact: 'low',    delta:  2,  icon: Droplet,  tone: 'sage'  },
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

  const raw: Driver[] = [
    {
      key: 'sleep_timing',
      label: 'Sleep timing',
      reason: dSleep < 0 ? 'Inconsistent bedtime is reducing recovery.' : 'Consistent bedtime supports recovery.',
      impact: 'low',
      delta: Math.round(dSleep * 6),
      icon: Moon,
      tone: dSleep < 0 ? 'rose' : 'sage',
    },
    {
      key: 'stress',
      label: 'Stress load',
      reason: dStress > 0 ? 'Elevated stress is impacting HRV.' : 'Calm levels support better resilience.',
      impact: 'low',
      delta: Math.round(-dStress * 5),
      icon: Wind,
      tone: dStress > 0 ? 'rose' : 'sage',
    },
    {
      key: 'activity_balance',
      label: 'Activity balance',
      reason: dMood < 0 ? 'More intensity, less recovery.' : 'Balanced training and recovery.',
      impact: 'low',
      delta: Math.round(dMood * 4),
      icon: Activity,
      tone: dMood < 0 ? 'amber' : 'sage',
    },
    {
      key: 'nutrition',
      label: 'Nutrition',
      reason: dEnergy < 0 ? 'Energy dips may signal hydration or fuelling gaps.' : 'Steady energy points to good fuelling.',
      impact: 'low',
      delta: Math.round(dEnergy * 3),
      icon: Droplet,
      tone: dEnergy < 0 ? 'amber' : 'sage',
    },
  ]

  const ranked = raw.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, 4)
  return ranked.map((d) => {
    const mag = Math.abs(d.delta)
    const impact: Impact = mag >= 8 ? 'high' : mag >= 4 ? 'medium' : 'low'
    return { ...d, impact }
  })
}

// Impact pill mapping — colour intensity scales with impact level.
const IMPACT_STYLE: Record<Impact, string> = {
  high:   'bg-[rgba(168,84,84,0.14)] text-[#A85454] ring-1 ring-inset ring-[rgba(168,84,84,0.22)]',
  medium: 'bg-[rgba(167,117,48,0.14)] text-[#A77530] ring-1 ring-inset ring-[rgba(167,117,48,0.22)]',
  low:    'bg-[rgba(111,143,107,0.14)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.24)]',
}
const IMPACT_LABEL: Record<Impact, string> = {
  high:   'High impact',
  medium: 'Medium impact',
  low:    'Low impact',
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
  recentCheckins,
}: DashboardClientProps) {
  const ctx = timeContext()
  const sl = healthScore != null ? scoreLabel(healthScore) : null
  const hasData = healthScore != null
  const hero = heroCopy(healthScore)
  const ins = insight(recentCheckins)
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
      {/* ── 1 / Hero greeting ──────────────────────────────────────────── */}
      <header className="relative pt-2 pb-1">
        <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-2">
          <ctx.Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
          <span>{ctx.label}</span>
          {user.name && <span className="text-ink-3 normal-case tracking-normal text-caption">, {user.name.split(' ')[0]}</span>}
        </div>
        <h1 className="font-sans text-[30px] sm:text-[36px] text-ink tracking-tight leading-[1.04] max-w-[18ch] font-bold">
          {hero.lead}
          <br />
          <span className="italic-accent text-[1.02em] text-sage-deep font-normal">
            {hero.accent}
          </span>
        </h1>
        <p className="text-caption text-ink-2 mt-2.5 max-w-[34ch] leading-snug">
          Here&apos;s your personalised health overview.
        </p>
      </header>

      {/* ── 2 / Long-term HEALTH SCORE ──────────────────────────────────
          Per v7 doc, the Health Score must read as a LONG-TERM measure
          (biological age + trajectory), distinct from today's readiness.
          This card carries the biological-age stat + a 90-day trajectory
          line + a key insight callout. */}
      <Card variant="premium" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep">
              <Leaf className="w-3 h-3" strokeWidth={2.25} />
              Health score
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-pill text-[10px] font-semibold uppercase tracking-wide bg-[rgba(168,191,163,0.20)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.22)]">
              Long-term
            </span>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1 text-[11.5px] font-medium text-sage-deep px-2.5 h-7 rounded-pill bg-white/70 ring-1 ring-inset ring-[rgba(111,143,107,0.22)] hover:bg-white"
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

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-3 sm:gap-5 items-end">
          {/* LEFT — two mini-stats stack */}
          <div className="space-y-2.5">
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
                  ? `${bio.deltaYears.toFixed(1)} yrs younger than your actual age (${bio.age})`
                  : bio.deltaYears < 0
                    ? `${Math.abs(bio.deltaYears).toFixed(1)} yrs older than your actual age (${bio.age})`
                    : `Matching your actual age (${bio.age})`
              }
              tone={bio.deltaYears >= 0 ? 'sage' : 'amber'}
            />
          </div>

          {/* RIGHT — trajectory chart */}
          <div>
            <div className="relative">
              <SparkLine
                values={series}
                width={300}
                height={92}
                tone="sage"
                showFill
                highlightLast
                className="w-full h-auto"
              />
            </div>
            <div className="flex items-center justify-between mt-1 text-[9.5px] uppercase tracking-[0.12em] text-ink-3">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
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
            <span className="inline-flex items-center px-2 py-0.5 rounded-pill text-[10px] font-semibold uppercase tracking-wide bg-[rgba(237,198,138,0.30)] text-[#A77530] ring-1 ring-inset ring-[rgba(217,160,91,0.30)]">
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
          {/* LEFT — donut */}
          <div className="relative shrink-0">
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

          {/* RIGHT — 4 sub-stats */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
            <SubStat icon={Moon}             label="Sleep"    value={`${Math.floor(sleepHours)}h ${Math.round((sleepHours % 1) * 60).toString().padStart(2,'0')}m`} arrow={sleepHours >= 7 ? 'up' : 'down'} />
            <SubStat icon={Heart}            label="HRV"      value={`${hrvMs} ms`}                arrow={hrvMs >= 55 ? 'up' : 'down'} />
            <SubStat icon={Wind}             label="Stress"   value={stressBand}                   arrow={stressBand === 'Low' ? 'down' : 'up'} invert />
            <SubStat icon={BatteryCharging}  label="Recovery" value={`${recoveryPct}%`}            arrow={recoveryPct >= 70 ? 'up' : 'down'} />
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

      {/* ── 4 / AI Insight (premium) ────────────────────────────────────── */}
      <Link href="/insights" className="block group">
        <Card variant="premium" padding="lg" className="relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
                <Sparkles className="w-3 h-3" strokeWidth={2.25} />
                AI insight
              </div>
              <div className="font-serif text-[20px] sm:text-[22px] text-ink leading-[1.15] tracking-tight mb-1.5">
                {ins.title}
              </div>
              <p className="text-[13px] text-ink-2 leading-snug max-w-[42ch]">
                {ins.body}
              </p>
            </div>
            <div className="relative shrink-0 w-[96px] h-[96px]">
              <div className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-[rgba(168,191,163,0.45)] shadow-[inset_0_2px_6px_rgba(26,28,26,0.10),0_8px_22px_-6px_rgba(111,143,107,0.35)]">
                <Image
                  src="/insight-mountains.png"
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <span
                className={cn(
                  'absolute -bottom-1 -right-1 inline-flex items-center justify-center',
                  'w-9 h-9 rounded-full bg-white text-sage-deep',
                  'ring-1 ring-[rgba(184,168,144,0.30)] shadow-[0_4px_14px_-4px_rgba(26,28,26,0.18)]',
                  'transition-transform group-hover:translate-x-0.5',
                )}
              >
                <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
              </span>
            </div>
          </div>
        </Card>
      </Link>

      {/* ── 5 / Why this matters — drivers behind today's score ─────────
          Per v7 image 2 this surfaces FOUR drivers with impact tags.
          Layout: 2 cols on mobile → 4 cols on sm+ so cards never crush. */}
      <Card variant="glass" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <IconBadge icon={Lightbulb} tone="amber" variant="tint" size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-eyebrow uppercase text-ink-3 leading-none">
                Why this matters
              </div>
              <p className="text-caption text-ink-2 mt-1.5 leading-snug">
                The key drivers impacting your long-term health and today&apos;s readiness.
              </p>
            </div>
          </div>
          <Link
            href="/insights"
            className="text-[12px] font-medium text-sage-deep hover:underline whitespace-nowrap shrink-0"
          >
            View all insights →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {drivers.map((d) => (
            <div
              key={d.key}
              className={cn(
                'rounded-card p-3 sm:p-3.5 flex flex-col',
                'bg-white/55 backdrop-blur-sm',
                'ring-1 ring-inset ring-[rgba(184,168,144,0.18)]',
              )}
            >
              <IconBadge icon={d.icon} tone={d.tone} variant="tint" size="sm" />
              <div className="text-[12.5px] font-semibold text-ink mt-2.5 leading-tight">
                {d.label}
              </div>
              <span
                className={cn(
                  'inline-flex w-fit items-center mt-1.5 px-1.5 py-0.5 rounded-pill text-[9.5px] font-semibold uppercase tracking-wide',
                  IMPACT_STYLE[d.impact],
                )}
              >
                {IMPACT_LABEL[d.impact]}
              </span>
              <div className="text-[11px] text-ink-3 leading-snug mt-2 line-clamp-3 flex-1">
                {d.reason}
              </div>
            </div>
          ))}
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
    <div className="rounded-[14px] bg-white/65 ring-1 ring-inset ring-[rgba(184,168,144,0.18)] px-3 py-2.5">
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
}: {
  icon: LucideIcon
  label: string
  value: string
  arrow: 'up' | 'down'
  /** For inverted metrics (e.g. Stress) the colour of the arrow flips. */
  invert?: boolean
}) {
  const isPositive = invert ? arrow === 'down' : arrow === 'up'
  return (
    <div className="flex items-center gap-2">
      <IconBadge icon={Icon} tone="sage" variant="tint" size="sm" />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-[0.10em] text-ink-3 leading-none">
          {label}
        </div>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="font-sans text-[14px] font-semibold text-ink leading-none tabular-nums">
            {value}
          </span>
          {arrow === 'up' ? (
            <TrendingUp className={cn('w-3 h-3', isPositive ? 'text-sage-deep' : 'text-[#A85454]')} strokeWidth={2.5} />
          ) : (
            <TrendingDown className={cn('w-3 h-3', isPositive ? 'text-sage-deep' : 'text-[#A85454]')} strokeWidth={2.5} />
          )}
        </div>
      </div>
    </div>
  )
}
