'use client'

import Link from 'next/link'
import {
  ClipboardCheck,
  Droplets,
  Wifi,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Moon,
  Heart,
  Activity,
  Flame,
  TestTube2,
  ChevronRight,
} from 'lucide-react'
import { scoreLabel } from '@/lib/score'
import { Card, CardLabel, CardTitle } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { SparkLine } from '@/components/ui/spark-line'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function greet(name: string) {
  const h = new Date().getHours()
  const first = name.split(' ')[0]
  if (h < 12)  return `Good morning, ${first}.`
  if (h < 17)  return `Good afternoon, ${first}.`
  if (h < 21)  return `Good evening, ${first}.`
  return `Evening, ${first}.`
}

const PILLAR_META: Record<string, { label: string; icon: React.ElementType; tone: 'sage' | 'rose' | 'amber' | 'ink' }> = {
  sleep:      { label: 'Sleep',      icon: Moon,     tone: 'sage'  },
  recovery:   { label: 'Recovery',   icon: Heart,    tone: 'sage'  },
  stress:     { label: 'Stress',     icon: Flame,    tone: 'amber' },
  activity:   { label: 'Activity',   icon: Activity, tone: 'sage'  },
  biomarkers: { label: 'Biomarkers', icon: TestTube2,tone: 'sage'  },
}

const GOAL_LABELS: Record<string, string> = {
  PERFORMANCE: 'Performance',
  HEALTH: 'Longevity & Health',
  BODY_COMP: 'Body Composition',
  WELLBEING: 'Wellbeing',
}

interface DashboardClientProps {
  user: { name: string; goalType: string | null; goalText: string | null }
  healthScore: number | null
  scoreBreakdown: Record<string, number> | null
  hasCheckinToday: boolean
  checkinCount: number
  recentCheckins: {
    date: string
    energy: number
    sleep: number
    mood: number
    stress: number
  }[]
  hasBlood: boolean
  connectedWearables: string[]
}

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
  const sl = healthScore != null ? scoreLabel(healthScore) : null
  const hasData = healthScore != null

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const todayIdx = (new Date().getDay() + 6) % 7

  const trendValues = recentCheckins.slice().reverse().map(c => (c.energy + c.sleep + c.mood) / 3)

  return (
    <div className="space-y-6 fade-up">
      {/* ── Page header ── */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-eyebrow uppercase text-sage-deep mb-2">
            {user.goalType ? GOAL_LABELS[user.goalType] : 'Your'} dashboard
          </div>
          <h1 className="font-sans text-h1 text-ink tracking-tight">
            {greet(user.name || 'there')}
          </h1>
          {user.goalText && (
            <p className="text-body-sm text-ink-2 mt-2 leading-relaxed">
              Goal: <span className="italic-accent text-base">{user.goalText}</span>
            </p>
          )}
        </div>

        {!hasCheckinToday && (
          <Link href="/checkin" className="shrink-0">
            <Button variant="primary" size="md" className="gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              Today&apos;s check-in
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        )}
        {hasCheckinToday && (
          <Pill tone="soft-sage" size="md" className="shrink-0 self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" /> Checked in today
          </Pill>
        )}
      </header>

      {/* ── Hero card: Score ring + breakdown + streak ── */}
      <Card padding="lg" className="overflow-hidden relative">
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(168,191,163,0.35) 0%, transparent 70%)' }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 items-center">
          {/* Ring */}
          <div className="flex flex-col items-center text-center">
            <CardLabel className="mb-3 self-start lg:self-center">Health score</CardLabel>
            <ScoreRing
              value={healthScore ?? 0}
              size={156}
              thickness={11}
              tone={sl?.tone ?? 'ink'}
              label={sl?.label ?? 'No data'}
              sublabel={hasData ? 'Based on your latest data' : 'Add data to begin'}
            />
          </div>

          {/* Breakdown */}
          <div className="lg:border-l lg:border-line lg:pl-8">
            <CardLabel>Pillar breakdown</CardLabel>
            {hasData && scoreBreakdown ? (
              <div className="space-y-3 mt-1">
                {Object.entries(scoreBreakdown).map(([key, val]) => {
                  const meta = PILLAR_META[key] ?? { label: key, icon: Activity, tone: 'sage' as const }
                  const tone = scoreLabel(val).tone
                  const color = scoreLabel(val).color
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <IconBadge icon={meta.icon} tone={tone} size="sm" />
                      <span className="text-body-sm text-ink w-[88px] shrink-0">{meta.label}</span>
                      <div className="flex-1 h-1.5 rounded-pill bg-sand-deep overflow-hidden">
                        <div
                          className="h-full rounded-pill transition-all duration-700"
                          style={{ width: `${val}%`, background: color }}
                        />
                      </div>
                      <span className="text-body-sm font-semibold text-ink w-[32px] text-right tabular-nums">
                        {val}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-body-sm text-ink-2 leading-relaxed">
                Complete your first check-in to start calculating your health score and unlock pillar insights.
              </p>
            )}
          </div>

          {/* Streak */}
          <div className="lg:border-l lg:border-line lg:pl-8 min-w-[170px]">
            <CardLabel>Check-in streak</CardLabel>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans text-[44px] font-bold text-ink leading-none tabular-nums">{checkinCount}</span>
              <span className="text-body-sm text-ink-3">day{checkinCount === 1 ? '' : 's'}</span>
            </div>

            <div className="flex gap-1.5 mt-4">
              {weekDays.map((day, i) => {
                const filled = i <= todayIdx && checkinCount > 0
                const isToday = i === todayIdx
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all',
                        filled
                          ? 'bg-sage text-white'
                          : 'bg-sand-deep text-ink-3',
                        isToday && !filled && 'ring-2 ring-sage ring-offset-2 ring-offset-white',
                      )}
                    >
                      {day}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* ── Trend strip ── */}
      {recentCheckins.length > 1 && (
        <Card>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <CardLabel className="mb-1">This week</CardLabel>
              <CardTitle>Energy, sleep & mood trend</CardTitle>
            </div>
            <Pill tone="soft-sage" size="md">
              {recentCheckins.length}/7 check-ins
            </Pill>
          </div>
          <div className="-mx-1">
            <SparkLine
              values={trendValues}
              width={800}
              height={80}
              tone="sage"
              showFill
              showDots
              highlightLast
              className="w-full h-auto"
            />
          </div>
          <div className="grid grid-cols-7 gap-1 mt-1">
            {weekDays.map((d, i) => (
              <div key={i} className={cn('text-center text-[10px]', i === todayIdx ? 'text-sage-deep font-semibold' : 'text-ink-3')}>
                {d}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── Quick action grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link href="/checkin">
          <Card
            className={cn(
              'group transition-all hover:border-line-2 hover:bg-off-white cursor-pointer h-full',
              hasCheckinToday && 'opacity-70',
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <IconBadge icon={ClipboardCheck} size="md" tone="sage" />
              <ChevronRight className="w-4 h-4 text-ink-3 group-hover:text-ink transition-colors" />
            </div>
            <div className="text-h3 text-ink mb-1">
              {hasCheckinToday ? 'Done for today' : 'Daily check-in'}
            </div>
            <div className="text-caption text-ink-2 leading-relaxed">
              {hasCheckinToday ? 'Come back tomorrow to keep your streak alive.' : '4 quick taps · under 15 seconds'}
            </div>
          </Card>
        </Link>

        <Link href="/blood">
          <Card className="group transition-all hover:border-line-2 hover:bg-off-white cursor-pointer h-full">
            <div className="flex items-start justify-between mb-3">
              <IconBadge icon={Droplets} size="md" tone="rose" />
              <ChevronRight className="w-4 h-4 text-ink-3 group-hover:text-ink transition-colors" />
            </div>
            <div className="text-h3 text-ink mb-1">
              {hasBlood ? 'Upload new results' : 'Upload blood results'}
            </div>
            <div className="text-caption text-ink-2 leading-relaxed">
              {hasBlood ? 'Add your latest panel for trend analysis.' : 'Drop a lab PDF · AI analysis in seconds'}
            </div>
          </Card>
        </Link>

        <Link href="/wearables">
          <Card className="group transition-all hover:border-line-2 hover:bg-off-white cursor-pointer h-full">
            <div className="flex items-start justify-between mb-3">
              <IconBadge icon={Wifi} size="md" tone="amber" />
              <ChevronRight className="w-4 h-4 text-ink-3 group-hover:text-ink transition-colors" />
            </div>
            <div className="text-h3 text-ink mb-1">
              {connectedWearables.length > 0
                ? `${connectedWearables.length} connected`
                : 'Connect wearables'}
            </div>
            <div className="text-caption text-ink-2 leading-relaxed truncate">
              {connectedWearables.length > 0
                ? connectedWearables.join(', ')
                : 'Oura, Whoop, Garmin, Apple Health'}
            </div>
          </Card>
        </Link>
      </div>

      {/* ── Ask Anything CTA ── */}
      <Link href="/chat">
        <div className="group flex items-center gap-4 p-5 rounded-card cursor-pointer transition-all bg-gradient-to-r from-sage-wash to-transparent hover:from-sage-tint border border-accent-ring">
          <IconBadge icon={Sparkles} size="lg" tone="sage" />
          <div className="flex-1 min-w-0">
            <div className="text-h3 text-ink mb-0.5">Ask Anything</div>
            <div className="text-caption text-ink-2">
              Your personal health AI · built on your data · educational only
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-sage-deep group-hover:translate-x-1 transition-transform shrink-0" />
        </div>
      </Link>
    </div>
  )
}
