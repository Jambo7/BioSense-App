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
  Sun,
  Sunrise,
  Sunset,
  Leaf,
  type LucideIcon,
} from 'lucide-react'
import { scoreLabel } from '@/lib/score'
import { Card, CardLabel } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { SparkLine } from '@/components/ui/spark-line'
import { cn } from '@/lib/utils'

function timeContext(name: string) {
  const h = new Date().getHours()
  const first = name.split(' ')[0]
  if (h < 5)  return { greet: `Late night, ${first}.`,    Icon: Moon,    iconTone: 'sage'  as const }
  if (h < 12) return { greet: `Good morning, ${first}.`,  Icon: Sunrise, iconTone: 'amber' as const }
  if (h < 17) return { greet: `Good afternoon, ${first}.`,Icon: Sun,     iconTone: 'amber' as const }
  if (h < 21) return { greet: `Good evening, ${first}.`,  Icon: Sunset,  iconTone: 'amber' as const }
  return         { greet: `Evening, ${first}.`,             Icon: Moon,    iconTone: 'sage'  as const }
}

const PILLAR_META: Record<string, { label: string; icon: LucideIcon }> = {
  sleep:      { label: 'Sleep',      icon: Moon       },
  recovery:   { label: 'Recovery',   icon: Heart      },
  stress:     { label: 'Stress',     icon: Flame      },
  activity:   { label: 'Activity',   icon: Activity   },
  biomarkers: { label: 'Biomarkers', icon: TestTube2  },
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
  const ctx = timeContext(user.name || 'there')

  const todayLabel = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const todayIdx = (new Date().getDay() + 6) % 7

  const trendValues = recentCheckins.slice().reverse().map(c => (c.energy + c.sleep + c.mood) / 3)

  const heroLine = !hasData
    ? 'Add your first data to see your readiness.'
    : healthScore! >= 85 ? 'Your body is ready to perform.'
    : healthScore! >= 70 ? 'You\'re in a strong recovery zone.'
    : healthScore! >= 55 ? 'Steady — small wins this week add up.'
    : healthScore! >= 40 ? 'Take it gently — recovery first.'
    : 'Time to rest and reset.'

  return (
    <div className="space-y-4 sm:space-y-5 stagger">
      {/* ── Greeting ── */}
      <header>
        <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-2">
          <ctx.Icon className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="truncate">{todayLabel}</span>
        </div>
        <h1 className="font-sans text-[28px] sm:text-h1 text-ink tracking-tight leading-[1.1]">
          {ctx.greet}
        </h1>
        {user.goalText && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <Pill tone="soft-sage" size="sm">
              {user.goalType ? GOAL_LABELS[user.goalType] : 'Goal'}
            </Pill>
            <span className="text-caption italic-accent text-base truncate">
              {user.goalText}
            </span>
          </div>
        )}
      </header>

      {/* ── Today's check-in: hero panel button (always prominent) ── */}
      <Link href="/checkin" className="block group">
        <Card
          padding="lg"
          variant={hasCheckinToday ? 'glass-strong' : 'glass-sage'}
          className="tap relative overflow-hidden"
        >
          {/* Soft sage bloom — only when there's still an action to take */}
          {!hasCheckinToday && (
            <div
              className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none opacity-80"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(168,191,163,0.45) 0%, transparent 70%)',
                filter: 'blur(22px)',
              }}
              aria-hidden
            />
          )}

          <div className="relative flex items-center gap-4">
            <div className="relative shrink-0">
              {!hasCheckinToday && (
                <span className="absolute inset-0 rounded-full bg-sage pulse-ring" />
              )}
              <span
                className={cn(
                  'relative w-14 h-14 rounded-full flex items-center justify-center shadow-button',
                  hasCheckinToday
                    ? 'bg-white ring-1 ring-[rgba(168,191,163,0.45)]'
                    : 'bg-grad-sage',
                )}
              >
                {hasCheckinToday ? (
                  <CheckCircle2 className="w-6 h-6 text-sage-deep" strokeWidth={2.2} />
                ) : (
                  <ClipboardCheck className="w-6 h-6 text-white" strokeWidth={2.2} />
                )}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-sans text-[20px] sm:text-h3 font-semibold text-ink leading-tight tracking-tight">
                  {hasCheckinToday ? "Today's check-in done" : "Today's check-in"}
                </span>
                {!hasCheckinToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-sage pulse-dot" />
                )}
              </div>
              <div className="text-caption text-ink-2 leading-snug">
                {hasCheckinToday
                  ? `${checkinCount} day${checkinCount === 1 ? '' : 's'} logged · view or update`
                  : '4 quick taps · keep your streak alive'}
              </div>
            </div>

            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                'transition-transform group-hover:translate-x-0.5',
                hasCheckinToday
                  ? 'bg-[rgba(168,191,163,0.18)] text-sage-deep'
                  : 'bg-white/35 text-white backdrop-blur-sm',
              )}
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
            </div>
          </div>
        </Card>
      </Link>

      {/* ── Hero score card ── */}
      <Card padding="lg" variant="glass-strong" className="relative overflow-hidden">
        {/* Inner sage halo bloom */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[72%] h-[60%] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168,191,163,0.30) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        <div className="relative flex flex-col items-center text-center pt-1 pb-2">
          <div className="text-eyebrow uppercase text-sage-deep mb-5 flex items-center gap-2">
            <Leaf className="w-3 h-3" />
            Health score
          </div>

          <ScoreRing
            value={healthScore ?? 0}
            size={196}
            thickness={12}
            tone={sl?.tone ?? 'ink'}
            label={sl?.label ?? 'No data'}
            glow
            breathe
            centerSize={68}
          />

          <p className="text-body text-ink-2 mt-6 max-w-[34ch] leading-[1.55]">
            {heroLine}
          </p>
        </div>

        {/* Pillar breakdown */}
        {hasData && scoreBreakdown && (
          <div className="relative mt-6 pt-6 border-t border-line space-y-2.5">
            <CardLabel className="mb-1">Pillar breakdown</CardLabel>
            {Object.entries(scoreBreakdown).map(([key, val]) => {
              const meta = PILLAR_META[key] ?? { label: key, icon: Activity }
              const tone = scoreLabel(val).tone
              const pillarGrad =
                tone === 'sage'
                  ? 'linear-gradient(90deg,#A8BFA3 0%,#5A7556 100%)'
                  : tone === 'rose'
                    ? 'linear-gradient(90deg,#E5B5B5 0%,#A85454 100%)'
                    : tone === 'amber'
                      ? 'linear-gradient(90deg,#EDC68A 0%,#A77530 100%)'
                      : 'linear-gradient(90deg,#5A5C5A 0%,#1A1C1A 100%)'
              return (
                <div key={key} className="flex items-center gap-3">
                  <IconBadge icon={meta.icon} tone={tone} variant="tint" size="sm" />
                  <span className="text-body-sm text-ink w-[78px] sm:w-[88px] shrink-0">{meta.label}</span>
                  <div className="flex-1 h-2 rounded-pill bg-[rgba(26,28,26,0.05)] overflow-hidden">
                    <div
                      className="h-full rounded-pill"
                      style={{
                        width: `${val}%`,
                        background: pillarGrad,
                        transition: 'width 1100ms cubic-bezier(0.16,1,0.3,1)',
                      }}
                    />
                  </div>
                  <span className="text-body-sm font-semibold text-ink w-[28px] text-right tabular-nums">
                    {val}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {!hasData && (
          <div className="relative mt-6 pt-6 border-t border-line text-center">
            <p className="text-body-sm text-ink-2 leading-relaxed max-w-[34ch] mx-auto">
              Complete your first check-in to start calculating your score and unlock pillar insights.
            </p>
          </div>
        )}
      </Card>

      {/* ── Streak + Trend (stacked on mobile, side-by-side on desktop) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Streak */}
        <Card padding="md" className="tap">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <IconBadge icon={Flame} size="md" tone="amber" variant="gradient" />
              {checkinCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber pulse-dot ring-2 ring-white" />
              )}
            </div>
            <div className="flex-1">
              <CardLabel className="mb-0">Check-in streak</CardLabel>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-sans text-[44px] font-bold text-ink leading-none tabular-nums tracking-tight">
              {checkinCount}
            </span>
            <span className="text-body-sm text-ink-3 italic-accent text-base">
              day{checkinCount === 1 ? '' : 's'}
            </span>
          </div>

          <div className="flex gap-1.5">
            {weekDays.map((day, i) => {
              const filled = i <= todayIdx && checkinCount > 0
              const isToday = i === todayIdx
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      'w-full aspect-square max-w-[36px] rounded-full flex items-center justify-center text-[10px] font-semibold transition-all',
                      filled
                        ? 'bg-grad-sage text-white shadow-[0_2px_6px_-1px_rgba(111,143,107,0.40)]'
                        : 'bg-[rgba(26,28,26,0.05)] text-ink-3',
                      isToday && !filled && 'ring-2 ring-sage ring-offset-2 ring-offset-white',
                    )}
                  >
                    {day}
                  </div>
                </div>
              )
            })}
          </div>

          {checkinCount === 0 && (
            <p className="text-caption text-ink-2 mt-4 leading-relaxed">
              Tap today&apos;s check-in above to start your streak.
            </p>
          )}
        </Card>

        {/* Trend */}
        {recentCheckins.length > 1 ? (
          <Card padding="md" className="tap">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <CardLabel className="mb-1">This week</CardLabel>
                <div className="text-h3 text-ink leading-tight">Energy &amp; mood</div>
              </div>
              <Pill tone="soft-sage" size="sm">{recentCheckins.length}/7</Pill>
            </div>
            <div className="-mx-1">
              <SparkLine
                values={trendValues}
                width={400}
                height={70}
                tone="sage"
                showFill
                showDots
                highlightLast
                className="w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-7 gap-1 mt-1">
              {weekDays.map((d, i) => (
                <div
                  key={i}
                  className={cn(
                    'text-center text-[10px]',
                    i === todayIdx ? 'text-sage-deep font-semibold' : 'text-ink-3',
                  )}
                >
                  {d}
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card padding="md" className="tap flex flex-col items-center justify-center text-center min-h-[180px]">
            <IconBadge icon={Activity} tone="sage" variant="gradient" size="lg" className="mb-3" />
            <div className="text-body font-semibold text-ink mb-1">Build your trend</div>
            <p className="text-caption text-ink-2 leading-relaxed max-w-[24ch]">
              After a few check-ins your weekly trend appears here.
            </p>
          </Card>
        )}
      </div>

      {/* ── Action grid ── */}
      <div>
        <CardLabel className="mb-3 px-1">Add to your data</CardLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/checkin">
            <Card
              padding="md"
              className={cn(
                'tap group h-full flex items-center gap-3 sm:flex-col sm:items-start sm:gap-4',
                hasCheckinToday && 'opacity-70',
              )}
            >
              <IconBadge icon={ClipboardCheck} size="lg" tone="sage" variant="gradient" />
              <div className="flex-1 min-w-0">
                <div className="text-body font-semibold text-ink mb-0.5">
                  {hasCheckinToday ? 'Done for today' : 'Daily check-in'}
                </div>
                <div className="text-caption text-ink-2 leading-snug">
                  {hasCheckinToday ? 'Back tomorrow.' : 'Under 30 seconds'}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-ink-3 sm:hidden" />
            </Card>
          </Link>

          <Link href="/blood">
            <Card padding="md" className="tap group h-full flex items-center gap-3 sm:flex-col sm:items-start sm:gap-4">
              <IconBadge icon={Droplets} size="lg" tone="rose" variant="gradient" />
              <div className="flex-1 min-w-0">
                <div className="text-body font-semibold text-ink mb-0.5">
                  {hasBlood ? 'New results' : 'Blood results'}
                </div>
                <div className="text-caption text-ink-2 leading-snug">
                  {hasBlood ? 'Add the latest panel' : 'Drop a lab PDF'}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-ink-3 sm:hidden" />
            </Card>
          </Link>

          <Link href="/wearables">
            <Card padding="md" className="tap group h-full flex items-center gap-3 sm:flex-col sm:items-start sm:gap-4">
              <IconBadge icon={Wifi} size="lg" tone="amber" variant="gradient" />
              <div className="flex-1 min-w-0">
                <div className="text-body font-semibold text-ink mb-0.5">
                  {connectedWearables.length > 0
                    ? `${connectedWearables.length} connected`
                    : 'Wearables'}
                </div>
                <div className="text-caption text-ink-2 leading-snug truncate">
                  {connectedWearables.length > 0
                    ? connectedWearables.join(', ')
                    : 'Oura, Whoop, Garmin…'}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-ink-3 sm:hidden" />
            </Card>
          </Link>
        </div>
      </div>

      {/* ── Ask Anything CTA ── */}
      <Link href="/chat">
        <Card padding="md" variant="glass-sage" className="tap relative overflow-hidden flex items-center gap-4">
          <IconBadge icon={Sparkles} size="lg" tone="sage" variant="gradient" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-body font-semibold text-ink">Ask Anything</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sage pulse-dot" />
            </div>
            <div className="text-caption text-ink-2 leading-snug">
              Your personal health AI · educational only
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-sage-deep shrink-0" />
        </Card>
      </Link>
    </div>
  )
}
