'use client'

import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Watch,
  Sun,
  Droplet,
  Leaf,
  Heart,
  Sparkles,
  TrendingUp,
  Lock,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { IconBadge, type IconBadgeTone } from '@/components/ui/icon-badge'
import { ScoreRing } from '@/components/ui/score-ring'
import { cn } from '@/lib/utils'

interface DashboardEmptyStateProps {
  name: string
  hasWearable: boolean
  hasCheckin: boolean
  hasBlood: boolean
}

// ── Getting-started steps ──────────────────────────────────────────────────
// Each step maps to one of the three data sources that bring the dashboard to
// life. Connecting a wearable is the headline action (it's the lowest-effort,
// highest-payoff path) so it's marked `primary` and rendered with emphasis.
type Step = {
  key: string
  icon: LucideIcon
  tone: IconBadgeTone
  title: string
  body: string
  href: string
  cta: string
  done: boolean
  primary?: boolean
}

// ── What you'll unlock — payoff teasers ─────────────────────────────────────
const UNLOCKS: Array<{ icon: LucideIcon; tone: IconBadgeTone; title: string; body: string }> = [
  {
    icon: Leaf,
    tone: 'sage',
    title: 'Your Health Score',
    body: 'A single 0–100 score and a biological age that show how your habits are really tracking.',
  },
  {
    icon: Sun,
    tone: 'amber',
    title: 'Daily readiness',
    body: 'Each morning, know whether to push hard or recover — from your sleep, HRV and stress.',
  },
  {
    icon: Sparkles,
    tone: 'violet',
    title: 'Personalised insights',
    body: 'We surface the hidden patterns driving your energy, sleep and recovery, and what to do about them.',
  },
  {
    icon: TrendingUp,
    tone: 'sky',
    title: 'Long-term trends',
    body: 'Watch your trajectory climb week over week as small, consistent choices compound.',
  },
]

export function DashboardEmptyState({
  name,
  hasWearable,
  hasCheckin,
  hasBlood,
}: DashboardEmptyStateProps) {
  const steps: Step[] = [
    {
      key: 'wearable',
      icon: Watch,
      tone: 'sage',
      title: 'Connect a wearable',
      body: 'Sync sleep, HRV, steps and recovery automatically from Oura, Whoop, Garmin, Fitbit and more.',
      href: '/wearables',
      cta: 'Connect',
      done: hasWearable,
      primary: true,
    },
    {
      key: 'checkin',
      icon: Heart,
      tone: 'amber',
      title: 'Log your first check-in',
      body: 'A 20-second daily check-in on energy, sleep, mood and stress powers your readiness score.',
      href: '/checkin',
      cta: 'Check in',
      done: hasCheckin,
    },
    {
      key: 'blood',
      icon: Droplet,
      tone: 'rose',
      title: 'Add your blood results',
      body: "Upload a blood test and we'll translate every marker into plain-language insight.",
      href: '/blood/upload',
      cta: 'Upload',
      done: hasBlood,
    },
  ]

  const doneCount = steps.filter((s) => s.done).length

  return (
    <div className="space-y-5 stagger">
      {/* ── 1 / Welcome hero ─────────────────────────────────────────────── */}
      <header className="pt-4 pb-2 sm:pt-5 sm:pb-3">
        <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep">
          <Sparkles className="w-3.5 h-3.5" strokeWidth={2.25} />
          <span>Welcome to BioSense{name && `, ${name.split(' ')[0]}`}</span>
        </div>
        <h1 className="mt-3 font-serif text-[30px] sm:text-[40px] text-ink tracking-tight leading-[1.08]">
          Let&apos;s begin{' '}
          <span className="italic-accent text-sage-deep">your health story.</span>
        </h1>
        <p className="mt-2.5 text-[14px] sm:text-[15px] text-ink-2 leading-snug max-w-[46ch]">
          BioSense turns your wearables, check-ins and blood results into one clear
          picture of your health — and what to do next. Connect your first source to
          bring your dashboard to life.
        </p>
      </header>

      {/* ── 2 / Getting started checklist ────────────────────────────────── */}
      <Card variant="premium" padding="lg" className="relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-4">
          <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep whitespace-nowrap">
            <Leaf className="w-3 h-3" strokeWidth={2.25} />
            Get started
          </div>
          <span className="inline-flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-pill text-[10px] font-semibold uppercase tracking-wide bg-[rgba(168,191,163,0.24)] text-sage-deep">
            {doneCount} of {steps.length} complete
          </span>
        </div>

        <div className="font-serif text-[24px] sm:text-[26px] text-ink leading-[1.1] tracking-tight">
          Three steps to your{' '}
          <span className="italic-accent text-[1em] text-sage-deep">first Health Score.</span>
        </div>
        <p className="text-caption text-ink-2 mt-1.5 leading-snug max-w-[52ch]">
          Start with any one — even a single source unlocks your score. The more you
          connect, the sharper and more personal it gets.
        </p>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 w-full rounded-full bg-[rgba(26,28,26,0.06)] overflow-hidden">
          <div
            className="h-full rounded-full bg-grad-sage transition-[width] duration-500"
            style={{ width: `${(doneCount / steps.length) * 100}%` }}
          />
        </div>

        <div className="mt-4 space-y-2.5">
          {steps.map((s) => (
            <StepRow key={s.key} step={s} />
          ))}
        </div>
      </Card>

      {/* ── 3 / What you'll unlock ────────────────────────────────────────── */}
      <Card variant="glass" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="text-eyebrow uppercase text-ink-3 leading-none">
              What you&apos;ll unlock
            </div>
            <p className="text-caption text-ink-2 mt-1.5 leading-snug max-w-[52ch]">
              Here&apos;s what your dashboard becomes the moment your data starts flowing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)] gap-4 sm:gap-6 items-center">
          {/* Teaser score ring — softly veiled to read as "coming soon" */}
          <div className="relative shrink-0 mx-auto sm:mx-0">
            <div className="relative opacity-70">
              <ScoreRing value={82} size={132} thickness={9} tone="sage" centerSize={0} glow breathe />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <div className="font-serif text-[34px] text-ink/40 leading-none tabular-nums tracking-[-0.02em]">
                  82
                </div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">/100</div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-ink-3">
              <Lock className="w-3 h-3" strokeWidth={2.25} />
              Your score awaits
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {UNLOCKS.map((u) => (
              <div key={u.title} className="rounded-[18px] tile p-3.5 flex flex-col">
                <IconBadge icon={u.icon} tone={u.tone} variant="tint" size="md" />
                <div className="text-[13px] font-semibold text-ink mt-2.5 leading-tight">
                  {u.title}
                </div>
                <p className="text-[11.5px] text-ink-3 leading-snug mt-1">{u.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing nudge — the emphasised path back to the connectables */}
        <Link
          href="/wearables"
          className={cn(
            'group mt-5 flex items-center justify-between gap-3 rounded-[20px] px-4 sm:px-5 py-4',
            'bg-[linear-gradient(180deg,rgba(168,191,163,0.22)_0%,rgba(168,191,163,0.10)_100%)]',
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.70),0_1px_2px_rgba(26,28,26,0.04)]',
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <IconBadge icon={Watch} tone="sage" variant="gradient" size="lg" />
            <div className="min-w-0">
              <div className="font-serif text-[17px] sm:text-[19px] text-ink leading-tight tracking-tight">
                Connect your first wearable
              </div>
              <p className="text-[12px] text-ink-2 leading-snug mt-0.5 max-w-[40ch]">
                The fastest way in — your readiness starts updating within hours.
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 px-4 h-10 rounded-pill text-white bg-grad-sage shadow-button text-[13.5px] font-medium group-hover:shadow-[var(--shadow-button-hover)]">
            Start
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
          </span>
        </Link>
      </Card>
    </div>
  )
}

// ── Step row ────────────────────────────────────────────────────────────────
function StepRow({ step }: { step: Step }) {
  const { icon, tone, title, body, href, cta, done, primary } = step

  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center gap-3 sm:gap-4 rounded-[20px] p-3.5 sm:p-4 transition-all',
        done
          ? 'bg-[rgba(168,191,163,0.12)] tile'
          : primary
            ? 'bg-[linear-gradient(180deg,rgba(168,191,163,0.16)_0%,rgba(168,191,163,0.06)_100%)] tile tile-hover ring-1 ring-inset ring-[rgba(111,143,107,0.20)]'
            : 'tile tile-hover',
      )}
    >
      <div className="relative shrink-0">
        <IconBadge icon={icon} tone={done ? 'sage' : tone} variant={done ? 'solid' : 'tint'} size="lg" />
        {done && (
          <span className="absolute -right-1 -bottom-1 bg-white rounded-full">
            <CheckCircle2 className="w-4 h-4 text-sage-deep" strokeWidth={2.5} />
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-ink leading-tight">{title}</span>
          {primary && !done && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-pill text-[9.5px] font-semibold uppercase tracking-wide bg-[rgba(168,191,163,0.28)] text-sage-deep">
              Recommended
            </span>
          )}
        </div>
        <p className="text-[11.5px] text-ink-3 leading-snug mt-1 max-w-[46ch]">{body}</p>
      </div>

      {done ? (
        <span className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-sage-deep">
          <CheckCircle2 className="w-4 h-4" strokeWidth={2.25} />
          <span className="hidden sm:inline">Done</span>
        </span>
      ) : (
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 px-3.5 h-9 rounded-pill text-[12.5px] font-medium transition-all',
            primary
              ? 'text-white bg-grad-sage shadow-button group-hover:shadow-[var(--shadow-button-hover)]'
              : 'bg-white/80 text-sage-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.80),0_1px_2px_rgba(26,28,26,0.05)] group-hover:bg-white',
          )}
        >
          {cta}
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
        </span>
      )}
    </Link>
  )
}
