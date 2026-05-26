'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ClipboardCheck,
  Sparkles,
  ArrowRight,
  Moon,
  Heart,
  Activity,
  Flame,
  TestTube2,
  Sun,
  Sunrise,
  Sunset,
  Leaf,
  Zap,
  Wind,
  BatteryCharging,
  TrendingUp,
  TrendingDown,
  Minus,
  Lightbulb,
  Target,
  Footprints,
  Play,
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
// The italic-accent fragment is what gets the playful serif treatment.
function heroCopy(score: number | null) {
  if (score == null) return { lead: 'Let\'s start', accent: 'understanding you.' }
  if (score >= 85)   return { lead: 'You\'re ready to',   accent: 'perform.'         }
  if (score >= 70)   return { lead: 'You\'re building',   accent: 'better balance.'  }
  if (score >= 55)   return { lead: 'You\'re holding',    accent: 'steady ground.'   }
  if (score >= 40)   return { lead: 'Your body needs',    accent: 'recovery.'        }
  return                   { lead: 'Time to',             accent: 'reset.'           }
}

// Heuristic insight derived from recent check-ins. In a real deployment this
// would be the latest cached AI-generated paragraph (Anthropic) — here we
// keep it deterministic from the data so the screen always feels populated.
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

interface DashboardClientProps {
  user: { name: string; goalType: string | null; goalText: string | null }
  healthScore: number | null
  scoreBreakdown: Record<string, number> | null
  hasCheckinToday: boolean
  checkinCount: number
  recentCheckins: Checkin[]
  hasBlood: boolean
  connectedWearables: string[]
}

// ── Pillar metadata ───────────────────────────────────────────────────────
// Recovery + Biomarkers are surfaced as composite bars below the snapshot
// row, so they get distinct icons from the daily-metric `Activity` heart.
const PILLAR_META: Record<string, { label: string; icon: LucideIcon }> = {
  sleep:      { label: 'Sleep',      icon: Moon            },
  recovery:   { label: 'Recovery',   icon: BatteryCharging },
  stress:     { label: 'Stress',     icon: Wind            },
  activity:   { label: 'Activity',   icon: Heart           },
  biomarkers: { label: 'Biomarkers', icon: TestTube2       },
}

// ── Today's snapshot metric definitions ──────────────────────────────────
// Matches the four metrics in the client design: Energy · Sleep · Activity ·
// Stress. We don't have a true Activity input on the check-in form yet, so
// for the demo Activity uses the `mood` check-in field as a stand-in — a
// connected wearable (Oura / Whoop / Apple Health) would replace it cleanly.
type Tone = 'sage' | 'amber' | 'rose' | 'ink'
const SNAPSHOTS: {
  key: keyof Checkin
  label: string
  icon: LucideIcon
  tone: Tone
  /** Higher is better? STRESS is inverted — high stress = bad. */
  invert?: boolean
  /** Custom band labels for inverted metrics like stress. */
  bands?: { good: number; fair: number }
}[] = [
  { key: 'energy', label: 'Energy',   icon: Zap,    tone: 'amber' },
  { key: 'sleep',  label: 'Sleep',    icon: Moon,   tone: 'sage'  },
  { key: 'mood',   label: 'Activity', icon: Heart,  tone: 'rose'  },
  { key: 'stress', label: 'Stress',   icon: Wind,   tone: 'ink', invert: true, bands: { good: 3.5, fair: 6 } },
]

// Composite pillar shown UNDER the snapshot row as a horizontal bar.
// Biomarkers has its own dedicated tab in the bottom nav now (per the v6
// spec), so it no longer lives in this band. Recovery stays — it's an
// always-on composite of sleep/HRV/stress that complements the snapshot.
const COMPOSITE_PILLAR_KEYS = ['recovery'] as const

function snapshotLabel(value: number, invert?: boolean, bands?: { good: number; fair: number }): string {
  if (invert && bands) {
    if (value <= bands.good) return 'Low'
    if (value <= bands.fair) return 'Fair'
    return 'High'
  }
  if (value >= 7.5) return 'Good'
  if (value >= 5)   return 'Fair'
  return 'Low'
}

// ── Driver-impact tagging for the "Why this matters" panel ───────────────
// Inspects recent check-in deltas vs the previous window and surfaces the
// top 3 drivers behind today's health score. Each driver carries an impact
// rating that maps directly to the design's High / Medium / Low tag colours.
//
// The shape mirrors what Insights → "Top drivers today" will surface — so
// when we wire real model output later, the same driver objects flow from
// the API straight into both places without restructuring.
type Impact = 'high' | 'medium' | 'low'
type Driver = {
  key: string
  label: string
  reason: string
  impact: Impact
  delta: number       // signed integer pts attributed to health score
  icon: LucideIcon
  tone: Tone
}

function topDrivers(checkins: Checkin[]): Driver[] {
  if (checkins.length < 2) return []
  const recent = checkins.slice(0, 3)
  const older  = checkins.slice(3, 7)
  const avg = (arr: Checkin[], k: keyof Checkin) =>
    arr.length ? arr.reduce((s, c) => s + (c[k] as number), 0) / arr.length : 0
  // Each delta is on the 0–10 scale; multiply for human-readable pts.
  const dSleep  = avg(recent, 'sleep')  - avg(older, 'sleep')
  const dStress = avg(recent, 'stress') - avg(older, 'stress')   // higher = worse
  const dEnergy = avg(recent, 'energy') - avg(older, 'energy')
  const dMood   = avg(recent, 'mood')   - avg(older, 'mood')

  const raw: Driver[] = [
    {
      key: 'sleep_timing',
      label: 'Sleep timing',
      reason: dSleep < 0 ? 'Inconsistent bedtime' : 'Consistent bedtime',
      impact: 'low',
      delta: Math.round(dSleep * 6),
      icon: Moon,
      tone: dSleep < 0 ? 'rose' : 'sage',
    },
    {
      key: 'stress',
      label: 'Stress',
      reason: dStress > 0 ? 'Elevated yesterday' : 'Calmer than usual',
      impact: 'low',
      delta: Math.round(-dStress * 5),
      icon: Wind,
      tone: dStress > 0 ? 'rose' : 'sage',
    },
    {
      key: 'activity_balance',
      label: 'Activity balance',
      reason: dMood < 0 ? 'More intensity, less recovery' : 'Balanced output',
      impact: 'low',
      delta: Math.round(dMood * 4),
      icon: Activity,
      tone: dMood < 0 ? 'amber' : 'sage',
    },
    {
      key: 'energy',
      label: 'Energy',
      reason: dEnergy < 0 ? 'Trending lower' : 'Steady through the day',
      impact: 'low',
      delta: Math.round(dEnergy * 4),
      icon: Zap,
      tone: dEnergy < 0 ? 'amber' : 'sage',
    },
  ]

  // Sort by absolute attributed pts (largest impact first) and tag impact.
  const ranked = raw.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, 3)
  return ranked.map((d) => {
    const mag = Math.abs(d.delta)
    const impact: Impact = mag >= 10 ? 'high' : mag >= 5 ? 'medium' : 'low'
    return { ...d, impact }
  })
}

const IMPACT_STYLE: Record<Impact, string> = {
  high:   'bg-[rgba(168,84,84,0.12)] text-[#A85454] ring-1 ring-inset ring-[rgba(168,84,84,0.20)]',
  medium: 'bg-[rgba(167,117,48,0.12)] text-[#A77530] ring-1 ring-inset ring-[rgba(167,117,48,0.20)]',
  low:    'bg-[rgba(111,143,107,0.12)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.22)]',
}
const IMPACT_LABEL: Record<Impact, string> = {
  high:   'High impact',
  medium: 'Medium impact',
  low:    'Low impact',
}

// ── Today's Focus — single highest-impact action ─────────────────────────
function todaysFocus(drivers: Driver[]): { title: string; body: string; action: string } {
  const top = drivers[0]
  if (!top || top.impact === 'low') {
    return {
      title: 'Maintain your rhythm',
      body: 'No single big lever today. Stay consistent with sleep, hydration and movement.',
      action: 'Keep doing what works',
    }
  }
  if (top.key === 'sleep_timing') {
    return {
      title: 'Prioritise recovery',
      body: 'Your body will benefit more from recovery today than pushing for intensity.',
      action: 'Aim for consistent sleep timing and manage stress.',
    }
  }
  if (top.key === 'stress') {
    return {
      title: 'Reset your nervous system',
      body: 'Stress is the biggest lever today — short breathwork or a walk will move the needle.',
      action: 'Try a 5-minute box-breathing reset.',
    }
  }
  if (top.key === 'activity_balance') {
    return {
      title: 'Re-balance training',
      body: 'You\'ve pushed hard this week with limited recovery — lighter session today.',
      action: 'Swap intensity for mobility or zone 2.',
    }
  }
  return {
    title: 'Lift your energy',
    body: 'Energy is the lever today — protein-rich meals, hydration and movement.',
    action: 'Hit your hydration target before lunch.',
  }
}

// ── What's improving — micro stats for the weekly wins band ──────────────
type Improvement = { key: string; label: string; pct: number; icon: LucideIcon; tone: Tone }
function whatsImproving(checkins: Checkin[]): Improvement[] {
  if (checkins.length < 4) {
    // Deterministic friendly defaults so the band always feels alive on demo data.
    return [
      { key: 'sleep_consistency', label: 'Sleep consistency', pct: 14, icon: Moon,        tone: 'sage' },
      { key: 'hrv_trend',         label: 'HRV trend',         pct:  8, icon: Heart,       tone: 'sage' },
      { key: 'activity_balance',  label: 'Activity balance',  pct: 11, icon: Footprints,  tone: 'amber' },
    ]
  }
  const recent = checkins.slice(0, 3)
  const older  = checkins.slice(3, 7)
  const avg = (arr: Checkin[], k: keyof Checkin) =>
    arr.length ? arr.reduce((s, c) => s + (c[k] as number), 0) / arr.length : 0
  // % change vs older window. Floor to stop noise becoming a "win".
  const pct = (a: number, b: number) => (b === 0 ? 0 : Math.round(((a - b) / b) * 100))
  const sleepPct  = pct(avg(recent, 'sleep'),  avg(older, 'sleep'))
  const energyPct = pct(avg(recent, 'energy'), avg(older, 'energy'))
  const stressPct = pct(avg(older, 'stress'),  avg(recent, 'stress'))  // inverted

  return [
    { key: 'sleep',  label: 'Sleep consistency', pct: Math.max(2, sleepPct),  icon: Moon,  tone: 'sage'  },
    { key: 'energy', label: 'Energy',            pct: Math.max(2, energyPct), icon: Zap,   tone: 'amber' },
    { key: 'stress', label: 'Calmer days',       pct: Math.max(2, stressPct), icon: Wind,  tone: 'sage'  },
  ]
}

// ── Suggested action — one tappable mini-suggestion ──────────────────────
// In a real deployment this rotates per the user's biggest lever; for the
// demo it picks deterministically from the top driver so the suggestion
// always feels relevant to what the rest of the screen is saying.
function suggestedAction(drivers: Driver[]): {
  title: string
  body: string
  duration: string
  href: string
} {
  const top = drivers[0]
  if (top?.key === 'stress') {
    return {
      title: '5 min evening reset',
      body: 'Reduce stress and improve sleep quality.',
      duration: '5 min',
      href: '/chat',
    }
  }
  if (top?.key === 'sleep_timing') {
    return {
      title: 'Wind-down routine',
      body: 'A simple 10-minute pre-bed sequence to stabilise sleep timing.',
      duration: '10 min',
      href: '/chat',
    }
  }
  if (top?.key === 'activity_balance') {
    return {
      title: 'Mobility flow',
      body: 'Gentle full-body mobility to balance a heavy training block.',
      duration: '8 min',
      href: '/chat',
    }
  }
  return {
    title: '5 min evening reset',
    body: 'Reduce stress and improve sleep quality.',
    duration: '5 min',
    href: '/chat',
  }
}

// ── Component ─────────────────────────────────────────────────────────────
export function DashboardClient({
  user,
  healthScore,
  scoreBreakdown,
  hasCheckinToday,
  checkinCount,
  recentCheckins,
  hasBlood,
  connectedWearables,
}: DashboardClientProps) {
  const ctx = timeContext()
  const sl = healthScore != null ? scoreLabel(healthScore) : null
  const hasData = healthScore != null
  const hero = heroCopy(healthScore)
  const ins = insight(recentCheckins)
  const drivers = topDrivers(recentCheckins)
  const focus = todaysFocus(drivers)
  const wins = whatsImproving(recentCheckins)
  const suggestion = suggestedAction(drivers)

  // Score trend: compare current to a synthesised baseline from the
  // 4–7 day window of check-ins (proxy for "vs last week"). Real
  // version stores nightly snapshots and just subtracts the 7-day-ago row.
  const trendDelta = (() => {
    if (recentCheckins.length < 4) return null
    const recent = recentCheckins.slice(0, 3)
    const older  = recentCheckins.slice(3, 7)
    const avgRecent = recent.reduce((s, c) => s + (c.energy + c.sleep + c.mood + (10 - c.stress)) / 4, 0) / recent.length
    const avgOlder  = older.reduce((s, c) => s + (c.energy + c.sleep + c.mood + (10 - c.stress)) / 4, 0) / older.length
    return Math.round((avgRecent - avgOlder) * 10)
  })()

  // Pillars in healthy range (>= 60). 6 is the design's intended total once
  // body-composition lands; we count what we actually compute today.
  const pillarsInRange = scoreBreakdown
    ? Object.values(scoreBreakdown).filter((v) => v >= 60).length
    : 0
  const totalPillars = scoreBreakdown ? Object.keys(scoreBreakdown).length : 0

  // Daily readiness — composite of the latest check-in. If no data yet,
  // omit the card rather than show a hollow zero.
  const latest = recentCheckins[0]
  const readiness = latest
    ? Math.round(((latest.energy + latest.sleep + latest.mood + (10 - latest.stress)) / 40) * 100)
    : null

  return (
    <div className="space-y-3 stagger">
      {/* ── Hero greeting with decorative wellness still life ────────────── */}
      <header className="relative overflow-hidden -mx-1 px-1">
        {/* Decorative leaves / vase still life. Sits behind the headline,
            biased to the right so the left half remains legible. */}
        <div
          aria-hidden
          className="absolute -top-2 right-0 w-[58%] h-[170px] pointer-events-none select-none"
          style={{
            maskImage:
              'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 35%, #000 75%)',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 35%, #000 75%)',
          }}
        >
          <Image
            src="/dashboard-hero-leaves.png"
            alt=""
            fill
            priority
            sizes="(min-width: 640px) 50vw, 70vw"
            className="object-cover object-right"
          />
        </div>

        <div className="relative pt-1 pr-2">
          <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-1.5">
            <ctx.Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
            <span>{ctx.label}</span>
          </div>
          <h1 className="font-sans text-[26px] sm:text-[32px] text-ink tracking-tight leading-[1.02] max-w-[16ch] font-bold">
            {hero.lead}{' '}
            <br className="sm:hidden" />
            <span className="italic-accent text-[1.02em] text-sage-deep font-normal">{hero.accent}</span>
          </h1>
          <p className="text-caption text-ink-2 mt-1.5 max-w-[34ch] leading-snug">
            Here&apos;s your personalised health overview.
          </p>
        </div>
      </header>

      {/* ── Hero score card — number · donut · trend + pillars ──────────── */}
      <Card padding="none" variant="glass-strong" className="relative overflow-hidden p-4 sm:p-5">
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[68%] h-[55%] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168,191,163,0.22) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        <div className="relative">
          <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
            <Leaf className="w-3 h-3" strokeWidth={2.25} />
            Health score
          </div>

          {/* Tight 3-col grid: number block · donut · trend/pillars stack. */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-1.5 sm:gap-2 items-center">
            {/* Left — number + label + delta pill. The big score is set in
                the DM Serif Display face for a slightly more editorial,
                "smarter" feel (matches the client mockup). */}
            <div>
              <div className="font-serif text-[46px] sm:text-[54px] text-ink leading-[0.92] tabular-nums tracking-[-0.02em]">
                {hasData ? Math.round(healthScore!) : '—'}
              </div>
              {sl && (
                <div className="italic-accent text-h3 text-sage-deep leading-none mt-1">
                  {sl.label}
                </div>
              )}
              {trendDelta != null && (
                <div className="inline-flex items-center gap-1 mt-2 px-1.5 py-0.5 rounded-pill bg-[rgba(168,191,163,0.16)]">
                  <DeltaIcon delta={trendDelta} />
                  <span className="text-[10px] text-ink-2 whitespace-nowrap leading-none">
                    {Math.abs(trendDelta)} vs last 7 days
                  </span>
                </div>
              )}
            </div>

            {/* Centre — donut with absolutely-positioned caption inside */}
            <div className="relative shrink-0">
              <ScoreRing
                value={healthScore ?? 0}
                size={128}
                thickness={9}
                tone={sl?.tone ?? 'ink'}
                centerSize={0}
                glow
                breathe
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
                <div className="text-[10.5px] font-semibold text-ink leading-tight">
                  {hasData && healthScore! >= 70
                    ? "You're in a good place today."
                    : hasData
                      ? 'Some ground to recover.'
                      : 'No data yet.'}
                </div>
                <div className="italic-accent text-[12px] text-sage-deep mt-0.5 leading-none">
                  {hasData && healthScore! >= 70
                    ? 'Keep going'
                    : hasData
                      ? 'Reset tonight'
                      : 'Log to begin'}
                </div>
              </div>
            </div>

            {/* Right — trend + pillars in range. */}
            <div className="text-right">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-3 mb-0.5">
                  Trend
                </div>
                <div className="flex items-center justify-end gap-1 leading-none">
                  {trendDelta != null && <DeltaIcon delta={trendDelta} large />}
                  <span className="font-sans text-[18px] font-bold text-ink tabular-nums leading-none">
                    {trendDelta == null ? '—' : `${trendDelta >= 0 ? '+' : ''}${trendDelta}`}
                  </span>
                </div>
                <div className="text-[8.5px] text-ink-3 mt-0.5 uppercase tracking-wider whitespace-nowrap">
                  vs last 7 days
                </div>
              </div>
              <div className="h-px bg-line ml-auto w-2/3 my-1.5" />
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-3 mb-0.5 whitespace-nowrap">
                  Pillars in range
                </div>
                <div className="font-sans text-[18px] font-bold text-ink tabular-nums leading-none">
                  {totalPillars > 0 ? `${pillarsInRange} / ${totalPillars}` : '—'}
                </div>
                <div className="text-[8.5px] text-sage-deep mt-0.5 uppercase tracking-wider whitespace-nowrap">
                  {pillarsInRange === totalPillars && totalPillars > 0
                    ? 'All in range'
                    : 'Keep improving'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>


      {/* ── AI insight card — compact, image right, floating CTA on image ── */}
      <Link href="/chat" className="block group">
        <Card padding="none" className="relative overflow-hidden p-3.5 sm:p-4">
          <div className="flex items-center gap-3.5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-1">
                <Sparkles className="w-3 h-3" strokeWidth={2.25} />
                AI insight
              </div>
              <div className="font-sans text-[16px] font-semibold text-ink leading-tight tracking-tight mb-0.5">
                {ins.title}
              </div>
              <p className="text-[12px] text-ink-2 leading-snug max-w-[40ch]">
                {ins.body}
              </p>
            </div>

            {/* Landscape thumbnail with arrow CTA floating bottom-right */}
            <div className="relative shrink-0 w-[76px] h-[76px]">
              <div className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-[rgba(168,191,163,0.45)] shadow-[0_6px_18px_-6px_rgba(111,143,107,0.30)]">
                <Image
                  src="/insight-mountains.png"
                  alt=""
                  fill
                  sizes="76px"
                  className="object-cover"
                />
              </div>
              <span
                className={cn(
                  'absolute -bottom-1 -right-1 inline-flex items-center justify-center',
                  'w-6 h-6 rounded-full bg-white text-sage-deep',
                  'ring-1 ring-[rgba(26,28,26,0.06)] shadow-[0_2px_8px_-2px_rgba(26,28,26,0.16)]',
                  'transition-transform group-hover:translate-x-0.5',
                )}
              >
                <ArrowRight className="w-3 h-3" strokeWidth={2.25} />
              </span>
            </div>
          </div>
        </Card>
      </Link>

      {/* ── Why this matters — drivers behind the AI insight + score ─────
          Sits directly under the AI Insight (per v6 brief) and gives the
          user a quick "why is the AI saying this?" view with impact-tagged
          driver cards. Tapping "View all factors" jumps to the full
          Insights → Why-it-matters tab. */}
      {drivers.length > 0 && (
        <Card padding="none" className="relative overflow-hidden p-3.5 sm:p-4">
          <div className="flex items-start gap-2.5 mb-3">
            <IconBadge icon={Lightbulb} tone="amber" variant="tint" size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-eyebrow uppercase text-ink-3 leading-none">
                Why this matters
              </div>
              <p className="text-caption text-ink-2 mt-1 leading-snug">
                These are the main drivers impacting your score today.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {drivers.map((d) => (
              <div
                key={d.key}
                className="rounded-card bg-[rgba(168,191,163,0.06)] ring-1 ring-inset ring-[rgba(26,28,26,0.05)] p-2.5"
              >
                <IconBadge icon={d.icon} tone={d.tone} variant="tint" size="sm" />
                <div className="text-[11px] font-semibold text-ink mt-1.5 leading-tight">
                  {d.label}
                </div>
                <div className="text-[10px] text-ink-3 leading-snug mt-0.5 line-clamp-2">
                  {d.reason}
                </div>
                <span
                  className={cn(
                    'inline-flex items-center mt-2 px-1.5 py-0.5 rounded-pill text-[9px] font-semibold uppercase tracking-wide',
                    IMPACT_STYLE[d.impact],
                  )}
                >
                  {IMPACT_LABEL[d.impact]}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/insights"
            className="block text-center text-caption font-medium text-sage-deep mt-3 hover:underline"
          >
            View all factors →
          </Link>
        </Card>
      )}

      {/* ── Today's Focus — single highest-impact action ──────────────────
          A coloured callout with the day's "one thing", lifted from image1.
          The sage gradient + small Target badge match the mockup. */}
      <Link href="/chat" className="block group">
        <Card
          padding="none"
          variant="plain"
          className={cn(
            'relative overflow-hidden p-3.5 sm:p-4',
            'bg-[linear-gradient(180deg,rgba(168,191,163,0.18)_0%,rgba(168,191,163,0.10)_100%)]',
            'ring-1 ring-inset ring-[rgba(111,143,107,0.30)]',
          )}
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-grad-sage shadow-button flex items-center justify-center">
              <Target className="w-4 h-4 text-white" strokeWidth={2.25} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-eyebrow uppercase text-sage-deep leading-none">
                Today&apos;s focus
              </div>
              <div className="font-sans text-[15px] font-semibold text-ink leading-tight tracking-tight mt-1">
                {focus.title}
              </div>
              <p className="text-[12px] text-ink-2 leading-snug mt-0.5 max-w-[44ch]">
                {focus.body}
              </p>
            </div>
          </div>
          <div className="mt-3 -mx-3.5 sm:-mx-4 -mb-3.5 sm:-mb-4 px-3.5 sm:px-4 py-2.5 bg-[rgba(168,191,163,0.18)] flex items-center justify-between gap-3">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-sage-deep">
                Highest impact action
              </div>
              <div className="text-[12px] text-ink leading-snug mt-0.5">
                {focus.action}
              </div>
            </div>
            <ArrowRight
              className="w-4 h-4 text-sage-deep shrink-0 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2.25}
            />
          </div>
        </Card>
      </Link>

      {/* ── Today's snapshot — 4 micro metric cards ──────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="text-eyebrow uppercase text-ink-3">Today&apos;s snapshot</div>
          {!hasCheckinToday && (
            <Link
              href="/checkin"
              className="text-caption text-sage-deep font-medium inline-flex items-center gap-1 hover:underline"
            >
              Log check-in
              <ArrowRight className="w-3 h-3" strokeWidth={2.25} />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
          {SNAPSHOTS.map((m) => {
            const value = latest ? (latest[m.key] as number) : null

            // Pull the real series from recent check-ins; if we don't yet
            // have enough rows, fall back to a deterministic mock walk so
            // every card always shows a sparkline (per the design). The
            // moment >= 2 real check-ins exist, the real series takes over
            // automatically — same shape, no other code changes needed.
            const realSeries = recentCheckins
              .slice()
              .reverse()
              .map((c) => (m.invert ? 10 - (c[m.key] as number) : (c[m.key] as number)))
            const series = realSeries.length >= 2
              ? realSeries
              : metricTrendMock(
                  value != null ? (m.invert ? 10 - value : value) : 6,
                  `snapshot-${m.key}`,
                )

            return (
              <MetricCard
                key={m.key}
                icon={m.icon}
                label={m.label}
                value={value != null ? Number(value.toFixed(1)) : null}
                suffix="/10"
                status={value != null ? snapshotLabel(value, m.invert, m.bands) : 'No data'}
                tone={m.tone}
                series={series}
              />
            )
          })}
        </div>

        {/* ── Composite pillars — Recovery + Biomarkers as horizontal bars.
              These are static score-out-of-100 composites, not daily
              fluctuating metrics, so bars communicate their nature better
              than sparkline cards. Sits as a quiet secondary band under
              the snapshot row. */}
        {hasData && scoreBreakdown && (
          <div className="mt-2.5">
            <Card padding="none" variant="plain" className="p-3">
              <div className="space-y-2">
                {COMPOSITE_PILLAR_KEYS.map((key) => {
                  const val = scoreBreakdown[key]
                  if (val == null) return null
                  const meta = PILLAR_META[key] ?? { label: key, icon: Activity }
                  const tone = scoreLabel(val).tone
                  const grad =
                    tone === 'sage'
                      ? 'linear-gradient(90deg,#A8BFA3 0%,#5A7556 100%)'
                      : tone === 'rose'
                        ? 'linear-gradient(90deg,#E5B5B5 0%,#A85454 100%)'
                        : tone === 'amber'
                          ? 'linear-gradient(90deg,#EDC68A 0%,#A77530 100%)'
                          : 'linear-gradient(90deg,#5A5C5A 0%,#1A1C1A 100%)'
                  return (
                    <div key={key} className="flex items-center gap-2.5">
                      <IconBadge icon={meta.icon} tone={tone} variant="tint" size="sm" />
                      <span className="text-[12px] text-ink w-[78px] sm:w-[92px] shrink-0">
                        {meta.label}
                      </span>
                      <div className="flex-1 h-1.5 rounded-pill bg-[rgba(26,28,26,0.05)] overflow-hidden">
                        <div
                          className="h-full rounded-pill"
                          style={{
                            width: `${val}%`,
                            background: grad,
                            transition: 'width 1100ms cubic-bezier(0.16,1,0.3,1)',
                          }}
                        />
                      </div>
                      <span className="text-[12px] font-semibold text-ink w-[28px] text-right tabular-nums">
                        {val}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* ── What's improving this week — 3 vs-last-week micro stats ──────
          A reassurance band that surfaces wins. Each card shows the metric
          label, % change vs last week and an up-arrow. Tapping "View your
          weekly report" jumps to /reports (Trends). */}
      <Card padding="none" className="relative overflow-hidden p-3.5 sm:p-4">
        <div className="flex items-start gap-2.5 mb-3">
          <IconBadge icon={TrendingUp} tone="sage" variant="tint" size="sm" />
          <div className="flex-1 min-w-0">
            <div className="text-eyebrow uppercase text-ink-3 leading-none">
              What&apos;s improving
            </div>
            <p className="text-caption text-ink-2 mt-1 leading-snug">
              You&apos;re trending in the right direction.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {wins.map((w) => (
            <div
              key={w.key}
              className="rounded-card bg-[rgba(168,191,163,0.06)] ring-1 ring-inset ring-[rgba(26,28,26,0.05)] p-2.5"
            >
              <IconBadge icon={w.icon} tone={w.tone} variant="tint" size="sm" />
              <div className="text-[10.5px] font-semibold text-ink mt-1.5 leading-tight">
                {w.label}
              </div>
              <div className="flex items-baseline gap-0.5 mt-1.5">
                <span className="font-sans text-[18px] font-bold text-sage-deep leading-none tabular-nums">
                  +{w.pct}%
                </span>
              </div>
              <div className="flex items-center gap-1 text-[9.5px] text-ink-3 mt-0.5">
                <span>vs last week</span>
                <TrendingUp className="w-2.5 h-2.5 text-sage-deep" strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/reports"
          className="block text-center text-caption font-medium text-sage-deep mt-3 hover:underline"
        >
          View your weekly report →
        </Link>
      </Card>

      {/* ── Suggested for you — one tappable mini action ─────────────────
          A single highly actionable suggestion derived from the day's top
          driver. In production this rotates per user; here it picks
          deterministically so the demo feels alive. */}
      <Link href={suggestion.href} className="block group">
        <Card padding="none" className="relative overflow-hidden p-3 sm:p-3.5">
          <div className="flex items-center gap-2 text-eyebrow uppercase text-violet-700/80 mb-2.5">
            <Sparkles className="w-3 h-3" strokeWidth={2.25} />
            Suggested for you
          </div>

          <div className="flex items-center gap-3">
            {/* Visual — small painterly thumbnail (reuses the mountains
                image for now; designers can swap per suggestion type). */}
            <div className="relative shrink-0 w-[58px] h-[58px] rounded-card overflow-hidden ring-1 ring-[rgba(26,28,26,0.06)]">
              <Image
                src="/insight-mountains.png"
                alt=""
                fill
                sizes="58px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(40,56,38,0.35)_100%)]"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-sans text-[14px] font-semibold text-ink leading-tight tracking-tight">
                {suggestion.title}
              </div>
              <p className="text-[11.5px] text-ink-2 leading-snug mt-0.5">
                {suggestion.body}
              </p>
            </div>

            <button
              type="button"
              className={cn(
                'shrink-0 inline-flex items-center gap-1 px-3 h-8 rounded-pill',
                'text-[12px] font-semibold text-white',
                'bg-grad-sage shadow-button',
                'transition-transform group-hover:scale-[1.02] active:scale-[0.98]',
              )}
            >
              <Play className="w-3 h-3 fill-current" strokeWidth={0} />
              Start
            </button>
          </div>
        </Card>
      </Link>

      {/* ── Daily readiness — mini donut + actionable copy ───────────────── */}
      {readiness != null && (
        <Card padding="none" variant="glass-strong" className="relative overflow-hidden p-3.5 sm:p-4">
          <div className="flex items-center gap-4">
            <ScoreRing
              value={readiness}
              size={72}
              thickness={6}
              tone={readiness >= 70 ? 'sage' : readiness >= 50 ? 'amber' : 'rose'}
              centerSize={22}
              label="%"
            />
            <div className="flex-1 min-w-0">
              <div className="text-eyebrow uppercase text-ink-3 mb-0.5">Daily readiness</div>
              <div className="font-sans text-[15px] font-semibold text-ink leading-tight">
                {readiness >= 75
                  ? 'Ready to perform'
                  : readiness >= 55
                    ? 'Steady — listen to your body'
                    : 'Take it gently today'}
              </div>
              <p className="text-[12px] text-ink-2 leading-snug mt-0.5 max-w-[44ch]">
                {readiness >= 75
                  ? 'Your body is primed for a productive day. Consider a high-intensity workout.'
                  : readiness >= 55
                    ? 'A moderate session and an extra glass of water will serve you well.'
                    : 'Prioritise sleep, hydration and movement at low intensity.'}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-ink-3 shrink-0" strokeWidth={2.25} />
          </div>
        </Card>
      )}

      {/* ── Quietly retain check-in nudge when not done today ────────────── */}
      {!hasCheckinToday && (
        <Link href="/checkin" className="block group">
          <Card padding="md" variant="glass-sage" className="tap flex items-center gap-3.5">
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-sage pulse-ring" />
              <span className="relative w-10 h-10 rounded-full flex items-center justify-center bg-grad-sage shadow-button">
                <ClipboardCheck className="w-5 h-5 text-white" strokeWidth={2.2} />
              </span>
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-body font-semibold text-ink leading-tight">
                Today&apos;s check-in
              </div>
              <div className="text-caption text-ink-2 leading-snug">
                4 quick taps · keep your streak{' '}
                <span className="text-sage-deep font-medium">({checkinCount} day{checkinCount === 1 ? '' : 's'})</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-sage-deep" strokeWidth={2.25} />
          </Card>
        </Link>
      )}

      {/* ── Footer status — wearables + blood (tiny, calm) ───────────────── */}
      <div className="flex items-center justify-between text-caption text-ink-3 px-1 pt-1">
        <span>
          {connectedWearables.length > 0
            ? `${connectedWearables.length} wearable${connectedWearables.length === 1 ? '' : 's'} connected`
            : 'No wearables yet'}
        </span>
        <span className="flex items-center gap-1">
          {hasBlood ? 'Blood panel on file' : 'No blood panel yet'}
          {!hasBlood && (
            <Link href="/blood" className="text-sage-deep font-medium ml-1">Add</Link>
          )}
        </span>
      </div>
    </div>
  )
}

// ── Local helpers ─────────────────────────────────────────────────────────
function DeltaIcon({ delta, large }: { delta: number; large?: boolean }) {
  const cls = large ? 'w-4 h-4' : 'w-3 h-3'
  if (delta > 0) return <TrendingUp className={cn(cls, 'text-sage-deep')} strokeWidth={2.5} />
  if (delta < 0) return <TrendingDown className={cn(cls, 'text-[#A85454]')} strokeWidth={2.5} />
  return <Minus className={cn(cls, 'text-ink-3')} strokeWidth={2.5} />
}

// ── Shared metric card — used by both "Pillars" and "Today's Snapshot".
// Compact vertical stack: icon at top-left, eyebrow label below, big
// number with small unit suffix, italic-accent status, mini sparkline.
// Designed to sit in a 4 or 5-column grid on all viewport widths.
function MetricCard({
  icon,
  label,
  value,
  suffix,
  status,
  tone,
  series,
}: {
  icon: LucideIcon
  label: string
  value: number | null
  suffix: string
  status: string
  tone: Tone
  series?: number[]
}) {
  const statusColor =
    tone === 'sage'  ? 'text-sage-deep'
    : tone === 'amber' ? 'text-[#A77530]'
    : tone === 'rose'  ? 'text-[#A85454]'
    : 'text-ink-2'

  // Stress uses rose-tinted sparkline (visually flags the inverted-good
  // metric); other "ink" tones fall back to sage so the line still pops.
  const sparkTone: 'sage' | 'rose' | 'amber' | 'ink' =
    tone === 'ink' ? 'rose' : tone

  return (
    <Card padding="none" className="tap p-2.5 sm:p-3">
      <IconBadge
        icon={icon}
        tone={tone === 'ink' ? 'rose' : tone}
        size="sm"
        variant="tint"
      />
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3 mt-2">
        {label}
      </div>
      <div className="flex items-baseline gap-0.5 mt-1">
        <span className="font-sans text-[20px] sm:text-[22px] font-bold text-ink leading-none tabular-nums tracking-tight">
          {value != null ? value : '—'}
        </span>
        <span className="text-[10px] text-ink-3 leading-none">{suffix}</span>
      </div>
      <div className={cn('italic-accent text-[13px] leading-none mt-1', statusColor)}>
        {status}
      </div>
      {series && series.length >= 2 && (
        <div className="-mx-1.5 mt-1.5 -mb-0.5">
          <SparkLine
            values={series}
            width={80}
            height={18}
            tone={sparkTone}
            showFill
            className="w-full h-auto"
          />
        </div>
      )}
    </Card>
  )
}

// ── Mock trend generators ────────────────────────────────────────────────
// Two helpers that produce a deterministic 7-point series ending on the
// current value. Used as a fallback ONLY when the real DB doesn't yet have
// enough rows. The shape (number[7]) is the same as the real series we'll
// load from check-ins / nightly health-score snapshots, so swapping mock
// → real is a single-line change at the call site.
//
// Deterministic = same seed always yields same shape, no flicker on rerender.

/** Pillar score series (0–100 scale). */
function pillarTrend(currentValue: number, seed: string): number[] {
  return makeWalk(currentValue, seed, { min: 20, max: 100, step: 14, jolt: 24 })
}

/** Daily metric series (0–10 scale). Used for snapshot sparklines. */
function metricTrendMock(currentValue: number, seed: string): number[] {
  return makeWalk(currentValue, seed, { min: 2, max: 10, step: 1.4, jolt: 2.4 })
}

function makeWalk(
  end: number,
  seed: string,
  opts: { min: number; max: number; step: number; jolt: number },
): number[] {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0
  const rand = () => {
    h = (h * 9301 + 49297) % 233280
    return Math.abs(h) / 233280
  }
  const series: number[] = []
  let v = end + (rand() - 0.5) * opts.jolt
  for (let i = 0; i < 6; i++) {
    v = Math.max(opts.min, Math.min(opts.max, v + (rand() - 0.5) * opts.step))
    series.push(Number(v.toFixed(1)))
  }
  series.push(end)
  return series
}
