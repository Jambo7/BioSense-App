'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Bookmark,
  GraduationCap,
  Link2,
  Lock,
  Moon,
  Sparkles,
  Sun,
  TrendingUp,
  User,
  Watch,
  Heart,
  Footprints,
  Activity,
  Utensils,
  Droplets,
  type LucideIcon,
} from 'lucide-react'
import type { WearableMetrics } from '@/lib/wearable-metrics'
import type { InsightCard, InsightType } from '@/lib/intelligence'
import { Card } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'
import { IconBadge, type IconBadgeTone } from '@/components/ui/icon-badge'
import { SourceRow } from '@/components/source-status'
import { computeReadiness, formatSleep, readinessCaption } from '@/lib/readiness'
import { formatGlucose } from '@/lib/glucose'
import { cn } from '@/lib/utils'

type Tone = IconBadgeTone

const INSIGHT_ICONS: Record<InsightType, { icon: LucideIcon; tone: Tone; chip: string }> = {
  NEW_DISCOVERY: { icon: Link2, tone: 'sage', chip: 'Connection' },
  WHATS_CHANGED: { icon: TrendingUp, tone: 'sage', chip: 'Changed' },
  OPPORTUNITY: { icon: Sparkles, tone: 'amber', chip: 'Opportunity' },
  PROJECTION: { icon: TrendingUp, tone: 'sage', chip: 'Ahead' },
  WATCH_LIST: { icon: Sparkles, tone: 'amber', chip: 'Watch' },
  LONG_TERM_TREND: { icon: TrendingUp, tone: 'sage', chip: 'Trend' },
  LEARNED: { icon: GraduationCap, tone: 'sage', chip: 'Learned' },
}

interface DashboardClientProps {
  user: { name: string; age: number | null; goalType: string | null; goalText: string | null }
  hasContextToday: boolean
  checkinCount: number
  hasBlood: boolean
  connectedWearables: string[]
  wearableMetrics: WearableMetrics
  intelligence: InsightCard[]
  learningStarted: boolean
  hasProfile: boolean
  mealsToday: { count: number; calories: number }
  glucose: { show: boolean; todayMgdl: number | null; connected: boolean }
  bioAge: {
    unlocked: boolean
    trackingDays: number
    unlockDays: number
    value: number | null
    calendarAge: number | null
    delta: number | null
  }
}

export function DashboardClient(props: DashboardClientProps) {
  const {
    user,
    hasContextToday,
    connectedWearables,
    wearableMetrics: wm,
    intelligence,
    hasProfile,
    learningStarted,
    hasBlood,
    bioAge,
    mealsToday,
    glucose,
  } = props

  const hasEstimate = bioAge.unlocked && bioAge.value != null
  const isNew = !hasEstimate
  const firstName = user.name.split(' ')[0] || 'there'
  const readiness = computeReadiness(wm)
  const homeCards = intelligence.slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto fade-up space-y-4">
      {isNew && (
        <header className="pt-1 pb-1">
          <div className="text-eyebrow uppercase text-sage-deep mb-2">Welcome to BioSense</div>
          <h1 className="font-sans text-[28px] sm:text-[34px] font-bold text-ink tracking-tight leading-[1.06] max-w-[18ch]">
            We&apos;re building your{' '}
            <span className="italic-accent text-sage-deep font-normal">health picture.</span>
          </h1>
          <p className="text-[14px] text-ink-2 mt-2 leading-relaxed max-w-[48ch]">
            The more BioSense learns about you, the more personal your intelligence becomes.
          </p>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-[16px] tile px-3.5 py-2.5">
            <div className="text-[12.5px] text-ink-2 flex items-center gap-2">
              <span>Your BioSense picture · Getting started</span>
              <span className="inline-flex gap-1" aria-hidden>
                {[connectedWearables.length > 0, hasProfile, learningStarted, hasBlood].map((on, i) => (
                  <span
                    key={i}
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      on ? 'bg-sage-deep' : 'bg-[rgba(26,28,26,0.12)]',
                    )}
                  />
                ))}
              </span>
            </div>
            <Link href="/chat" className="text-[12.5px] font-semibold text-sage-deep shrink-0">
              Help us learn →
            </Link>
          </div>
        </header>
      )}

      <BioAgeCard
        isNew={isNew}
        bioAge={bioAge}
        wearableConnected={connectedWearables.length > 0}
        hasProfile={hasProfile}
      />

      <LatestIntelligence
        cards={homeCards}
        isNew={isNew}
        wearableConnected={connectedWearables.length > 0}
      />

      <ReadinessCard
        score={readiness}
        caption={readinessCaption(readiness)}
        wm={wm}
      />

      <ContextCard done={hasContextToday} name={firstName} />

      <MealsCard count={mealsToday.count} calories={mealsToday.calories} />

      {glucose.show && (
        <GlucoseCard todayMgdl={glucose.todayMgdl} connected={glucose.connected} />
      )}

      <DailySnapshot wm={wm} />
    </div>
  )
}

function BioAgeCard({
  isNew,
  bioAge,
  wearableConnected,
  hasProfile,
}: {
  isNew: boolean
  bioAge: DashboardClientProps['bioAge']
  wearableConnected: boolean
  hasProfile: boolean
}) {
  const daysLeft = Math.max(0, bioAge.unlockDays - bioAge.trackingDays)
  const younger =
    bioAge.delta != null && bioAge.delta >= 2
      ? 'younger'
      : bioAge.delta != null && bioAge.delta <= -2
        ? 'older'
        : 'in line'

  return (
    <Card variant="glass" padding="lg">
      <div className="flex items-center gap-2 text-eyebrow uppercase text-ink-3 mb-2">
        <span>Biological age</span>
        <span className="text-[10px] px-2 py-0.5 rounded-pill bg-[rgba(168,191,163,0.2)] text-sage-deep">
          Wellness estimate
        </span>
      </div>

      {isNew || bioAge.value == null ? (
        <>
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="font-sans text-[22px] font-bold text-ink tracking-tight">
                Building your estimate
              </h2>
              <p className="text-[13px] text-ink-2 mt-1.5 leading-relaxed max-w-[48ch]">
                {bioAge.unlocked
                  ? 'BioSense has enough days of tracking, and is waiting on a little more wearable or lifestyle signal before it can show an estimate.'
                  : daysLeft > 0
                    ? `BioSense needs about ${daysLeft} more day${daysLeft === 1 ? '' : 's'} of your own data before it can show a biological age estimate.`
                    : 'BioSense needs enough of your own data before it can show a biological age estimate.'}
              </p>
            </div>
            <EmptyRing icon={User} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1">
            <SourceRow
              compact
              icon={Watch}
              title="Wearable data"
              hint="Sleep, HRV, activity"
              state={wearableConnected ? 'done' : 'missing'}
            />
            <SourceRow
              compact
              icon={User}
              title="About you"
              hint="Age, goals, health profile"
              state={hasProfile ? 'done' : 'missing'}
              doneLabel="Started"
            />
            <SourceRow
              compact
              icon={TrendingUp}
              title="Enough history"
              hint="Your estimate appears after BioSense has a personal baseline."
              state={bioAge.unlocked ? 'done' : 'building'}
              doneLabel="Ready"
            />
          </div>
          <Link
            href="/wearables"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-sage-deep mt-3"
          >
            Help BioSense learn faster <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </>
      ) : (
        <Link href="/reports?tab=trajectory" className="flex items-start gap-4 group">
          <div className="flex-1 min-w-0">
            <h2 className="font-sans text-[20px] sm:text-[24px] font-bold text-ink tracking-tight leading-[1.12]">
              {younger === 'younger' ? (
                <>
                  Tracking{' '}
                  <span className="italic-accent text-sage-deep font-normal">younger</span>
                  {' '}than calendar age.
                </>
              ) : younger === 'older' ? (
                <>
                  Tracking a little{' '}
                  <span className="italic-accent text-sage-deep font-normal">older</span>
                  {' '}than calendar age.
                </>
              ) : (
                <>
                  Tracking{' '}
                  <span className="italic-accent text-sage-deep font-normal">in line</span>
                  {' '}with calendar age.
                </>
              )}
            </h2>
            <p className="text-[13px] text-ink-2 mt-1.5 leading-relaxed">
              {bioAge.delta != null && bioAge.calendarAge != null
                ? younger === 'in line'
                  ? `About the same as your calendar age of ${bioAge.calendarAge}.`
                  : `${Math.abs(Math.round(bioAge.delta))} year${Math.abs(Math.round(bioAge.delta)) === 1 ? '' : 's'} ${younger} than your calendar age of ${bioAge.calendarAge}.`
                : 'A wellness estimate from your available health and wearable signals.'}
            </p>
            <p className="text-[11.5px] text-ink-3 mt-2 leading-snug">
              A wellness estimate from your available signals. Not a clinical or medical age.
            </p>
            <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-sage-deep mt-3">
              See what this is based on <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <div className="w-[108px] h-[108px] rounded-full bg-[rgba(255,255,255,0.72)] ring-1 ring-inset ring-[rgba(168,191,163,0.28)] flex flex-col items-center justify-center">
              <div className="font-sans font-bold text-[34px] leading-none tabular-nums tracking-tight text-ink">
                {Math.round(bioAge.value)}
              </div>
              <div className="italic-accent text-[12px] text-sage-deep mt-1">years</div>
            </div>
          </div>
        </Link>
      )}
    </Card>
  )
}

function LatestIntelligence({
  cards,
  isNew,
  wearableConnected,
}: {
  cards: InsightCard[]
  isNew: boolean
  wearableConnected: boolean
}) {
  const [savedIds, setSavedIds] = useState<Set<string>>(
    () => new Set(cards.filter((c) => c.saved).map((c) => c.id)),
  )

  useEffect(() => {
    if (!cards.some((c) => c.isNew)) return
    const t = setTimeout(() => {
      fetch('/api/intelligence', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seen' }),
      }).catch(() => {})
    }, 4000)
    return () => clearTimeout(t)
  }, [cards])

  function toggleSave(id: string) {
    const saving = !savedIds.has(id)
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (saving) next.add(id)
      else next.delete(id)
      return next
    })
    fetch('/api/intelligence', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: saving ? 'save' : 'unsave', id }),
    }).catch(() => {})
  }

  const teasers = [
    {
      chip: 'Learned',
      icon: GraduationCap,
      tone: 'sage' as Tone,
      title: wearableConnected ? 'Your health picture has started' : 'Waiting on your first connection',
      body: wearableConnected
        ? 'Your wearable is connected and BioSense is beginning to analyse available health and activity history.'
        : 'Connect a wearable so BioSense can begin analysing your health and activity history.',
      state: wearableConnected ? null : 'Building',
      isNew: Boolean(wearableConnected),
    },
    {
      chip: 'Connections',
      icon: Link2,
      tone: 'violet' as Tone,
      title: 'Finding relationships in your data',
      body: 'BioSense will look for patterns between sleep, recovery, activity, biomarkers and what it learns about you.',
      state: 'Building',
      isNew: false,
    },
    {
      chip: 'Ahead',
      icon: TrendingUp,
      tone: 'violet' as Tone,
      title: 'Building your trajectory',
      body: 'Once your baseline is established, BioSense can begin identifying where your health appears to be heading.',
      state: 'Building',
      isNew: false,
    },
  ]

  return (
    <Card variant="glass" padding="lg">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="text-eyebrow uppercase text-ink-3">Latest intelligence</div>
          <p className="text-[12.5px] text-ink-2 mt-1">
            {isNew ? 'BioSense is starting to learn what makes you, you.' : 'What has shown up in your data recently.'}
          </p>
        </div>
        <Link href="/insights?tab=latest" className="text-[12.5px] font-semibold text-sage-deep whitespace-nowrap">
          View all insights →
        </Link>
      </div>

      {cards.length === 0 ? (
        <div className="divide-y divide-[rgba(26,28,26,0.06)]">
          {teasers.map((t) => (
            <div key={t.chip} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3">
              <IconBadge icon={t.icon} tone={t.tone} variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-sage-deep">
                    {t.chip}
                  </span>
                  {t.isNew && (
                    <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-[1px] rounded-pill text-white bg-grad-sage">
                      New
                    </span>
                  )}
                </div>
                <div className="text-[13.5px] font-semibold text-ink mt-1">{t.title}</div>
                <p className="text-[12px] text-ink-2 leading-snug mt-1">{t.body}</p>
              </div>
              {t.state && (
                <div className="flex flex-col items-center shrink-0 text-ink-3 pt-1">
                  <Lock className="w-3.5 h-3.5" strokeWidth={2} />
                  <span className="text-[10px] mt-0.5">{t.state}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {cards.map((card) => {
            const meta = INSIGHT_ICONS[card.type] ?? { icon: Sparkles, tone: 'sage' as Tone, chip: card.label }
            return (
              <Link
                key={card.id}
                href={
                  typeof card.data?.patternId === 'string'
                    ? `/insights/connection/${card.data.patternId}`
                    : `/insights/item/${card.id}`
                }
                className="rounded-[20px] tile p-3.5 flex items-start gap-3 block"
              >
                <IconBadge icon={meta.icon} tone={meta.tone} variant="tint" size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-sage-deep">
                      {meta.chip}
                    </span>
                    {card.isNew && (
                      <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-[1px] rounded-pill text-white bg-grad-sage">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-[14px] font-semibold text-ink mt-1 leading-tight">{card.title}</div>
                  <p className="text-[12.5px] text-ink-2 leading-snug mt-1 line-clamp-2">{card.body}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-sage-deep">
                      {typeof card.data?.patternId === 'string' ? 'Explore connection →' : 'Why it matters →'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Save"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleSave(card.id)
                  }}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    savedIds.has(card.id) ? 'text-sage-deep bg-[rgba(168,191,163,0.24)]' : 'text-ink-3',
                  )}
                >
                  <Bookmark className="w-4 h-4" strokeWidth={2.2} fill={savedIds.has(card.id) ? 'currentColor' : 'none'} />
                </button>
              </Link>
            )
          })}
        </div>
      )}
    </Card>
  )
}

function ReadinessCard({
  score,
  caption,
  wm,
}: {
  score: number | null
  caption: string
  wm: WearableMetrics
}) {
  return (
    <Card variant="glass" padding="lg">
      <div className="flex items-center gap-2 text-eyebrow uppercase text-ink-3 mb-2">
        <span>Today&apos;s readiness</span>
        <span className="text-[10px] px-2 py-0.5 rounded-pill bg-[rgba(217,160,91,0.18)] text-[#A77530]">
          Short-term
        </span>
      </div>
      <div className="flex items-start gap-4">
        {score != null ? (
          <ScoreRing value={score} size={92} thickness={7} label="Ready" sublabel="/100" tone="amber" />
        ) : (
          <EmptyRing icon={TrendingUp} tone="amber" size={92} />
        )}
        <div className="flex-1 min-w-0">
          <h2 className="font-sans text-[20px] font-bold text-ink tracking-tight">
            {score == null ? 'Getting to know your normal' : caption}
          </h2>
          <p className="text-[13px] text-ink-2 mt-1.5 leading-relaxed">
            {score == null
              ? 'We need a little more information before we can tell what ready looks like for you.'
              : 'Based on last night\'s sleep, HRV and recovery from your connected devices.'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <MetricChip icon={Moon} label="Sleep" value={formatSleep(wm.sleepHours)} />
            <MetricChip icon={Heart} label="HRV" value={wm.hrv != null ? `${Math.round(wm.hrv)} ms` : '-'} />
            <MetricChip icon={Activity} label="Stress" value={wm.stress != null ? `${Math.round(wm.stress)}` : '-'} />
            <MetricChip
              icon={Heart}
              label="Recovery"
              value={wm.recovery != null ? `${Math.round(wm.recovery)}%` : '-'}
            />
          </div>
          <Link href="/insights?tab=latest" className="inline-flex text-[13px] font-semibold text-sage-deep mt-3">
            Learn what affects your readiness →
          </Link>
        </div>
      </div>
    </Card>
  )
}

function ContextCard({ done }: { done: boolean; name: string }) {
  return (
    <Card padding="md" className="flex items-start sm:items-center gap-3">
      <IconBadge icon={Sun} tone="sage" variant="tint" size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13.5px] font-semibold text-ink">Today&apos;s context</span>
          {!done && (
            <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-[1px] rounded-pill text-white bg-grad-sage">
              New
            </span>
          )}
        </div>
        <p className="text-[12px] text-ink-2 leading-snug mt-0.5">
          {done
            ? 'Context saved for today. You can update it any time.'
            : 'Add a little context to help BioSense understand what may be influencing your readiness today.'}
        </p>
        <div className="text-[11px] text-ink-3 mt-1">Takes about 20 seconds</div>
      </div>
      <Link
        href="/context"
        className="shrink-0 h-9 px-3.5 rounded-pill btn-sage-outline text-[12.5px] font-semibold inline-flex items-center gap-1"
      >
        {done ? 'Update' : 'Context check-in'}
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </Card>
  )
}

function MealsCard({ count, calories }: { count: number; calories: number }) {
  return (
    <Card padding="md" className="flex items-start sm:items-center gap-3">
      <IconBadge icon={Utensils} tone="amber" variant="tint" size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13.5px] font-semibold text-ink">Meals</span>
          {count === 0 && (
            <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-[1px] rounded-pill text-white bg-grad-sage">
              New
            </span>
          )}
        </div>
        <p className="text-[12px] text-ink-2 leading-snug mt-0.5">
          {count === 0
            ? 'Photograph meals you want to log. Totals only cover what you add.'
            : `${count} logged today · about ${Math.round(calories)} kcal from those meals`}
        </p>
      </div>
      <Link
        href="/meals"
        className="shrink-0 h-9 px-3.5 rounded-pill btn-sage-outline text-[12.5px] font-semibold inline-flex items-center gap-1"
      >
        {count === 0 ? 'Log a meal' : 'Add meal'}
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </Card>
  )
}

function GlucoseCard({
  todayMgdl,
  connected,
}: {
  todayMgdl: number | null
  connected: boolean
}) {
  const body =
    todayMgdl != null
      ? `Today's average ${formatGlucose(todayMgdl)}. One signal next to sleep, meals and activity.`
      : connected
        ? 'Waiting for the first glucose sync. Wear your sensor and check back later today.'
        : 'Connect Apple Health. If Dexcom already shares with Health, glucose comes with it.'

  return (
    <Card padding="md" className="flex items-start sm:items-center gap-3">
      <IconBadge icon={Droplets} tone="teal" variant="tint" size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13.5px] font-semibold text-ink">Glucose</span>
        </div>
        <p className="text-[12px] text-ink-2 leading-snug mt-0.5">{body}</p>
      </div>
      <Link
        href="/glucose"
        className="shrink-0 h-9 px-3.5 rounded-pill btn-sage-outline text-[12.5px] font-semibold inline-flex items-center gap-1"
      >
        {todayMgdl != null ? 'View' : 'Set up'}
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </Card>
  )
}

function DailySnapshot({ wm }: { wm: WearableMetrics }) {
  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="text-eyebrow uppercase text-ink-3">Daily snapshot</div>
        <Link href="/reports" className="text-[12px] font-semibold text-sage-deep">
          View full breakdown →
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <SnapshotStat icon={Moon} label="Sleep" value={formatSleep(wm.sleepHours)} />
        <SnapshotStat icon={Heart} label="HRV" value={wm.hrv != null ? `${Math.round(wm.hrv)} ms` : '-'} />
        <SnapshotStat icon={Activity} label="RHR" value={wm.rhr != null ? `${Math.round(wm.rhr)} bpm` : '-'} />
        <SnapshotStat icon={Footprints} label="Steps" value={wm.steps != null ? wm.steps.toLocaleString() : '-'} />
      </div>
    </Card>
  )
}

function SnapshotStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <IconBadge icon={Icon} tone="sage" variant="tint" size="sm" />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.1em] text-ink-3">{label}</div>
        <div className="text-[13px] font-semibold text-ink tabular-nums leading-tight">{value}</div>
      </div>
    </div>
  )
}

function EmptyRing({
  icon: Icon,
  tone = 'sage',
  size = 108,
}: {
  icon: LucideIcon
  tone?: 'sage' | 'amber'
  size?: number
}) {
  const stroke = tone === 'amber' ? 'rgba(217,160,91,0.42)' : 'rgba(111,143,107,0.38)'
  const iconClass = tone === 'amber' ? 'text-[#A77530]' : 'text-sage-deep'
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 6) / 2}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeDasharray="5 7"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className={cn('w-6 h-6', iconClass)} strokeWidth={1.8} />
      </div>
    </div>
  )
}

function MetricChip({
  label,
  value,
  stacked,
  icon: Icon,
}: {
  label: string
  value: string
  stacked?: boolean
  icon?: LucideIcon
}) {
  if (stacked) {
    return (
      <div className="rounded-[14px] bg-[rgba(168,191,163,0.12)] px-2 py-2 text-center">
        <div className="text-[10px] uppercase tracking-[0.08em] text-ink-3">{label}</div>
        <div className="text-[13px] font-semibold text-ink tabular-nums mt-0.5">{value}</div>
      </div>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill pl-1 pr-2.5 h-7 bg-[rgba(168,191,163,0.14)] text-[11.5px] text-ink-2">
      {Icon && (
        <span className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center">
          <Icon className="w-3 h-3 text-sage-deep" strokeWidth={2.2} />
        </span>
      )}
      <span className="uppercase tracking-[0.08em] text-ink-3">{label}</span>
      <span className="font-semibold text-ink tabular-nums">{value}</span>
    </span>
  )
}
