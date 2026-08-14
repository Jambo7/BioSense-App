'use client'

import Image from 'next/image'
import {
  Activity,
  BatteryCharging,
  Bell,
  Brain,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Heart,
  Leaf,
  Lightbulb,
  Moon,
  Plug,
  Sparkles,
  Sun,
  TrendingDown,
  TrendingUp,
  Watch,
  Wind,
  User as UserIcon,
} from 'lucide-react'
import { BrandWordmark } from '@/components/brand-mark'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { ScoreRing } from '@/components/ui/score-ring'
import { SparkLine } from '@/components/ui/spark-line'
import { cn } from '@/lib/utils'

function Phone({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <figure className="space-y-3">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-3">{title}</p>
      <div className="mx-auto w-[min(100%,390px)] rounded-[40px] bg-[#1A1C1A] p-[10px] shadow-[0_24px_64px_-20px_rgba(26,28,26,0.45)]">
        <div className="relative rounded-[30px] bg-[#FAFAF8] overflow-hidden h-[760px]">
          <div className="relative z-10 h-full overflow-hidden flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </figure>
  )
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-2.5 pb-1 text-[12px] font-semibold text-ink">
      <span>9:41</span>
      <span className="flex gap-1 text-[10px] text-ink-3">LTE ████</span>
    </div>
  )
}

function TopBar({ connectionsActive }: { connectionsActive?: boolean }) {
  return (
    <header className="h-[52px] flex items-center justify-between px-4 gap-2 shrink-0">
      <BrandWordmark height={22} />
      <div className="flex items-center gap-1.5">
        <span className="hidden xs:inline-flex h-8 px-2.5 rounded-pill text-[11px] font-medium text-ink-2 bg-white/70 ring-1 ring-inset ring-line items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5" />
          Tutorial
        </span>
        <span
          className={cn(
            'h-8 px-2.5 rounded-pill text-[11px] font-medium inline-flex items-center gap-1',
            connectionsActive
              ? 'bg-[rgba(111,143,107,0.16)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.28)]'
              : 'bg-white/70 text-ink-2 ring-1 ring-inset ring-line',
          )}
        >
          <Watch className="w-3.5 h-3.5" />
          Connections
        </span>
        <span className="w-8 h-8 rounded-full bg-white/70 ring-1 ring-inset ring-line inline-flex items-center justify-center text-ink-2">
          <Bell className="w-3.5 h-3.5" />
        </span>
        <span className="w-8 h-8 rounded-full inline-flex items-center justify-center bg-[linear-gradient(180deg,rgba(168,191,163,0.35)_0%,rgba(111,143,107,0.25)_100%)] ring-1 ring-inset ring-[rgba(168,191,163,0.45)] text-sage-deep">
          <UserIcon className="w-3.5 h-3.5" />
        </span>
      </div>
    </header>
  )
}

function TabBar({ active }: { active: 'home' | 'insights' | 'other' }) {
  const items = [
    { id: 'home', label: 'Home', Icon: Sun },
    { id: 'insights', label: 'Insights', Icon: Lightbulb },
    { id: 'ai', label: 'AI', Icon: Sparkles, center: true },
    { id: 'blood', label: 'Biomarkers', Icon: FlaskConical },
    { id: 'trends', label: 'Trends', Icon: TrendingUp },
  ] as const

  return (
    <nav className="tabbar-pill mt-auto shrink-0 px-1 pt-1.5 pb-3">
      <div className="flex items-end justify-around">
        {items.map((item) => {
          const isActive =
            (active === 'home' && item.id === 'home') ||
            (active === 'insights' && item.id === 'insights')
          if ('center' in item && item.center) {
            return (
              <div key={item.id} className="flex-1 flex flex-col items-center justify-end">
                <div className="relative -mt-6 mb-0.5">
                  <div
                    className="w-[48px] h-[48px] rounded-full flex items-center justify-center ring-[3px] ring-white bg-[linear-gradient(180deg,#8DB389_0%,#6F8F6B_55%,#5A7556_100%)]"
                  >
                    <Image src="/biosense-mark-white.png" alt="" width={24} height={24} />
                  </div>
                </div>
                <span className="text-[9px] text-ink-2 font-medium">AI</span>
              </div>
            )
          }
          return (
            <div key={item.id} className="flex-1 flex flex-col items-center gap-0.5 py-1">
              <div className="relative w-8 h-8 flex items-center justify-center">
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(168,191,163,0.40)_0%,rgba(111,143,107,0.22)_100%)]" />
                )}
                <item.Icon
                  className={cn('w-4 h-4 relative', isActive ? 'text-sage-deep' : 'text-ink-3')}
                  strokeWidth={isActive ? 2.25 : 1.85}
                />
              </div>
              <span className={cn('text-[9px]', isActive ? 'text-sage-deep font-semibold' : 'text-ink-3')}>
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

function MiniStat({
  eyebrow,
  value,
  suffix,
  caption,
}: {
  eyebrow: string
  value: string
  suffix?: string
  caption: string
}) {
  return (
    <div className="rounded-[16px] tile px-3 py-2.5">
      <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-3">{eyebrow}</div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="font-serif text-[24px] text-ink leading-none tabular-nums">{value}</span>
        {suffix && <span className="text-[10px] text-ink-3">{suffix}</span>}
      </div>
      <div className="text-[10px] mt-1 text-sage-deep leading-snug">{caption}</div>
    </div>
  )
}

function SubStat({
  icon: Icon,
  label,
  value,
  tone,
  up,
}: {
  icon: typeof Moon
  label: string
  value: string
  tone: 'sage' | 'amber' | 'rose' | 'ink'
  up: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <IconBadge icon={Icon} tone={tone} variant="tint" size="sm" />
      <div className="flex-1 min-w-0">
        <div className="text-[9px] uppercase tracking-[0.10em] text-ink-3 leading-none">{label}</div>
        <div className="text-[13px] font-semibold text-ink tabular-nums mt-0.5">{value}</div>
      </div>
      {up ? (
        <TrendingUp className="w-3 h-3 text-sage-deep" strokeWidth={2.5} />
      ) : (
        <TrendingDown className="w-3 h-3 text-[#A85454]" strokeWidth={2.5} />
      )}
    </div>
  )
}

const WEARABLES = [
  { id: 'oura', name: 'Oura Ring', image: '/wearables/oura.png', desc: 'Sleep, HRV, readiness, temperature' },
  { id: 'whoop', name: 'Whoop', image: '/wearables/whoop.png', desc: 'Recovery, strain, sleep performance', highlight: true },
  { id: 'garmin', name: 'Garmin', image: '/wearables/garmin.png', desc: 'Activity, HRV, steps, VO₂ max' },
]

function ConnectionsScreen() {
  return (
    <Phone title="Connections — connect WHOOP">
      <StatusBar />
      <TopBar connectionsActive />
      <div className="flex-1 overflow-hidden px-4 pt-2 space-y-4">
        <header className="flex items-start gap-3">
          <IconBadge icon={Activity} size="lg" tone="amber" />
          <div>
            <div className="text-eyebrow uppercase text-sage-deep mb-1">Data sources</div>
            <h1 className="font-sans text-[22px] font-bold text-ink tracking-tight leading-[1.1]">
              Connect <span className="italic-accent font-normal text-sage-deep">your wearables.</span>
            </h1>
            <p className="text-[12px] text-ink-2 mt-1.5 leading-snug">
              Auto-enrich your health score with real-time HRV, sleep, recovery and activity.
            </p>
          </div>
        </header>
        <Pill tone="ink" size="md">
          <Plug className="w-3.5 h-3.5" />
          0 connected
        </Pill>
        <div className="space-y-2">
          {WEARABLES.map((w) => (
            <Card
              key={w.id}
              padding="md"
              className={cn(w.highlight && 'ring-1 ring-inset ring-[rgba(111,143,107,0.35)]')}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white ring-1 ring-inset ring-[rgba(26,28,26,0.06)] shrink-0">
                  <Image src={w.image} alt={w.name} fill sizes="48px" className="object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-ink">{w.name}</div>
                  <div className="text-[11px] text-ink-2 leading-snug">{w.desc}</div>
                </div>
                <Button variant="ghost" size="sm" type="button" tabIndex={-1}>
                  <ExternalLink className="w-3.5 h-3.5" />
                  Connect
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <TabBar active="other" />
    </Phone>
  )
}

function HomeScreen() {
  return (
    <Phone title="Home — WHOOP recovery, sleep, strain">
      <StatusBar />
      <TopBar />
      <div className="flex-1 overflow-hidden px-4 pt-1 pb-2 space-y-3">
        <header>
          <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep">
            <Sun className="w-3.5 h-3.5" />
            Good morning
          </div>
          <h1 className="mt-2 font-serif text-[26px] text-ink tracking-tight leading-[1.08]">
            You&apos;re trending{' '}
            <span className="italic-accent text-sage-deep">in the right direction.</span>
          </h1>
        </header>

        <Card variant="premium" padding="lg" className="overflow-hidden">
          <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
            <Leaf className="w-3 h-3" />
            Health score
            <span className="ml-1 px-2 py-0.5 rounded-pill text-[9px] font-semibold uppercase bg-[rgba(168,191,163,0.24)] text-sage-deep">
              Long-term
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <MiniStat eyebrow="Health score" value="56" suffix="/100" caption="Fair" />
            <MiniStat eyebrow="Biological age" value="35" caption="Matching actual age" />
          </div>
          <div className="mt-3">
            <SparkLine
              values={[48, 50, 49, 52, 54, 53, 56]}
              width={280}
              height={72}
              tone="sage"
              showFill
              showDots
              highlightLast
              className="w-full h-auto"
            />
          </div>
        </Card>

        <Card variant="premium" padding="lg" className="overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep">
              <Sun className="w-3 h-3" />
              Today&apos;s readiness
            </div>
            <span className="px-2 py-0.5 rounded-pill text-[9px] font-semibold uppercase bg-[rgba(237,198,138,0.36)] text-[#A77530]">
              Short-term
            </span>
          </div>
          <div className="font-serif text-[18px] text-ink leading-snug">
            Your body is{' '}
            <span className="italic-accent text-sage-deep">fairly ready today.</span>
          </div>
          <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-3 items-center">
            <div className="relative shrink-0">
              <ScoreRing value={68} size={96} thickness={8} tone="amber" centerSize={0} glow={false} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="font-serif text-[26px] text-ink leading-none">68</div>
                <div className="text-[8px] uppercase tracking-wider text-ink-3">/100</div>
              </div>
            </div>
            <div className="grid gap-2">
              <SubStat icon={Moon} label="Sleep" value="7h 24m" tone="ink" up />
              <SubStat icon={Heart} label="HRV" value="58 ms" tone="sage" up />
              <SubStat icon={Wind} label="Strain" value="12.1" tone="amber" up={false} />
              <SubStat icon={BatteryCharging} label="Recovery" value="72%" tone="rose" up />
            </div>
          </div>
        </Card>
      </div>
      <TabBar active="home" />
    </Phone>
  )
}

function InsightsScreen() {
  return (
    <Phone title="Insights — WHOOP sleep & recovery in context">
      <StatusBar />
      <TopBar />
      <div className="flex-1 overflow-hidden px-4 pt-2 space-y-3">
        <header>
          <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-1">
            <Brain className="w-3.5 h-3.5" />
            Insights
          </div>
          <h1 className="font-sans text-[24px] font-bold text-ink tracking-tight leading-[1.05]">
            Understand what&apos;s
            <br />
            <span className="italic-accent font-normal text-sage-deep">driving your health.</span>
          </h1>
        </header>

        <Card variant="premium" padding="lg">
          <div className="flex items-start gap-3">
            <IconBadge icon={Sparkles} tone="sage" variant="tint" size="md" />
            <div>
              <div className="text-eyebrow uppercase text-sage-deep mb-1">Primary insight</div>
              <div className="font-serif text-[17px] text-ink leading-snug">
                Recovery is tracking with last night&apos;s sleep.
              </div>
              <p className="text-[12px] text-ink-2 leading-snug mt-1.5">
                WHOOP recovery and sleep duration moved together this week. Educational only — not a diagnosis.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-1.5 overflow-hidden">
          {['Today', 'Patterns', 'Predictions'].map((t, i) => (
            <span
              key={t}
              className={cn(
                'shrink-0 h-8 px-3 rounded-pill text-[11px] font-medium',
                i === 0 ? 'btn-sage text-white' : 'tile text-ink-2',
              )}
            >
              {t}
            </span>
          ))}
        </div>

        <Card variant="glass" padding="lg">
          <div className="text-eyebrow uppercase text-ink-3 mb-2">Latest intelligence</div>
          <div className="rounded-[16px] tile p-3 flex items-start gap-2.5">
            <IconBadge icon={Moon} tone="sage" variant="tint" size="sm" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-ink">What&apos;s changed</span>
                <span className="text-[9px] font-semibold uppercase text-sage-deep bg-[rgba(111,143,107,0.16)] px-1.5 py-0.5 rounded-pill">
                  New
                </span>
              </div>
              <p className="text-[11.5px] text-ink-2 leading-snug mt-0.5">
                Sleep averaged 6h 40m this week — a shift from your usual pattern.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-2 text-[11px] text-ink-3 px-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-sage-deep" />
          Source: connected WHOOP
        </div>
      </div>
      <TabBar active="insights" />
    </Phone>
  )
}

export function WhoopScreens() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 items-start">
      <ConnectionsScreen />
      <HomeScreen />
      <InsightsScreen />
    </div>
  )
}
