'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Brain,
  Check,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Link2,
  Sparkles,
  TrendingUp,
  Watch,
  User,
  Sun,
  Moon,
  Footprints,
  Heart,
  Bookmark,
  Clock,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PrivacyStrip } from '@/components/privacy-strip'
import { SourceRow } from '@/components/source-status'
import { IconBadge } from '@/components/ui/icon-badge'
import type { InsightCard } from '@/lib/intelligence'
import { cn } from '@/lib/utils'

type Tab = 'latest' | 'patterns' | 'predictions' | 'learned'
const TABS: { id: Tab; label: string }[] = [
  { id: 'latest', label: 'Latest Intelligence' },
  { id: 'patterns', label: 'Patterns & Connections' },
  { id: 'predictions', label: 'Predictions' },
  { id: 'learned', label: 'Learned Intelligence' },
]

type PatternRow = {
  id: string
  type: string
  description: string
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  scoreImpact: number | null
  discoveredAt: string
}

type LearnedFact = {
  id: string
  section: string
  text: string
  createdAt: string
  confidence: string
}

function confLabel(c: string) {
  if (c === 'HIGH' || c === 'High') return 'Strong'
  if (c === 'MEDIUM' || c === 'Medium') return 'Moderate'
  return 'Emerging'
}

function confTone(c: string) {
  if (c === 'HIGH') return 'text-sage-deep'
  if (c === 'MEDIUM') return 'text-[#A77530]'
  return 'text-[#7A6490]'
}

function patternKind(c: string) {
  if (c === 'HIGH') return 'Strong connection'
  if (c === 'MEDIUM') return 'Emerging connection'
  return 'Changing connection'
}

function monthsBetween(iso: string) {
  const then = new Date(iso).getTime()
  const days = Math.max(1, Math.round((Date.now() - then) / 86400000))
  if (days < 21) return `${days} day${days === 1 ? '' : 's'}`
  if (days < 60) return `${Math.round(days / 7)} weeks`
  return `${Math.round(days / 30)} months`
}

export function InsightsClient(props: {
  patterns: PatternRow[]
  learnedFacts: LearnedFact[]
  wearableConnected: boolean
  checkinCount: number
  patternMinCheckins: number
  intelligence: InsightCard[]
  hasBlood: boolean
  hasProfile: boolean
  learningStarted: boolean
}) {
  const search = useSearchParams()
  const router = useRouter()
  const initial = (search.get('tab') as Tab) || 'latest'
  const [tab, setTab] = useState<Tab>(TABS.some((t) => t.id === initial) ? initial : 'latest')

  function setTabId(id: Tab) {
    setTab(id)
    router.replace(`/insights?tab=${id}`, { scroll: false })
  }

  return (
    <div className="max-w-3xl mx-auto fade-up space-y-5">
      <header className="pt-1 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-eyebrow uppercase text-sage-deep mb-2">Insights</div>
          <h1 className="font-sans text-[28px] sm:text-[34px] font-bold text-ink tracking-tight leading-[1.06] max-w-[22ch]">
            {tab === 'latest' && (
              <>
                Here is what BioSense is{' '}
                <span className="italic-accent text-sage-deep font-normal">noticing now.</span>
              </>
            )}
            {tab === 'patterns' && props.patterns.length === 0 && (
              <>
                We&apos;re learning what{' '}
                <span className="italic-accent text-sage-deep font-normal">drives your health.</span>
              </>
            )}
            {tab === 'patterns' && props.patterns.length > 0 && (
              <>
                Here is what BioSense has{' '}
                <span className="italic-accent text-sage-deep font-normal">learned about you.</span>
              </>
            )}
            {tab === 'predictions' && (
              <>
                We&apos;re learning where{' '}
                <span className="italic-accent text-sage-deep font-normal">your health may be heading.</span>
              </>
            )}
            {tab === 'learned' && (
              <>
                A lifetime of insights,{' '}
                <span className="italic-accent text-sage-deep font-normal">built about you.</span>
              </>
            )}
          </h1>
          <p className="text-[14px] text-ink-2 mt-2 leading-relaxed max-w-[50ch]">
            BioSense looks across your sleep, recovery, activity, biomarkers and habits over time.
          </p>
        </div>
        <HeroArt kind={tab === 'predictions' ? 'path' : tab === 'learned' ? 'tree' : 'nodes'} />
      </header>

      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTabId(t.id)}
            className={cn(
              'shrink-0 h-9 px-3.5 rounded-pill text-[12.5px] font-medium',
              tab === t.id ? 'btn-sage text-white' : 'tile text-ink-2',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'latest' && <LatestTab cards={props.intelligence} />}
      {tab === 'patterns' && (
        <PatternsTab
          patterns={props.patterns}
          wearableConnected={props.wearableConnected}
          hasProfile={props.hasProfile}
          hasBlood={props.hasBlood}
          learningStarted={props.learningStarted}
          checkinCount={props.checkinCount}
          min={props.patternMinCheckins}
        />
      )}
      {tab === 'predictions' && (
        <PredictionsTab
          cards={props.intelligence}
          wearableConnected={props.wearableConnected}
          hasBlood={props.hasBlood}
          learningStarted={props.learningStarted}
        />
      )}
      {tab === 'learned' && (
        <LearnedTab
          facts={props.learnedFacts}
          saved={props.intelligence.filter((c) => c.saved)}
          patterns={props.patterns}
          wearableConnected={props.wearableConnected}
          hasProfile={props.hasProfile}
          hasBlood={props.hasBlood}
        />
      )}
    </div>
  )
}

function LatestTab({ cards }: { cards: InsightCard[] }) {
  if (cards.length === 0) {
    return (
      <Card padding="lg">
        <h2 className="font-sans text-[20px] font-bold text-ink">Your feed is warming up</h2>
        <p className="text-[13px] text-ink-2 mt-2 leading-relaxed">
          Home shows the most useful findings first. This page will list every intelligence item
          as soon as BioSense has enough of your own data to speak honestly.
        </p>
      </Card>
    )
  }
  return (
    <div className="space-y-2.5">
      {cards.map((card) => (
        <Link key={card.id} href={`/insights/item/${card.id}`} className="block">
          <Card padding="md" className="tile-hover flex items-start gap-3">
            <IconBadge icon={Sparkles} tone="sage" variant="tint" size="md" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-sage-deep">
                {card.label}
                {card.isNew ? ' · New' : ''}
              </div>
              <div className="text-[15px] font-semibold text-ink mt-1">{card.title}</div>
              <p className="text-[13px] text-ink-2 mt-1 leading-snug">{card.body}</p>
              <div className="text-[12.5px] font-semibold text-sage-deep mt-2 inline-flex items-center gap-0.5">
                View detail <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function PatternsTab({
  patterns,
  wearableConnected,
  hasProfile,
  hasBlood,
  learningStarted,
  checkinCount,
  min,
}: {
  patterns: PatternRow[]
  wearableConnected: boolean
  hasProfile: boolean
  hasBlood: boolean
  learningStarted: boolean
  checkinCount: number
  min: number
}) {
  if (patterns.length === 0) {
    return (
      <div className="space-y-3">
        <Card padding="lg">
          <h2 className="font-sans text-[20px] font-bold text-ink tracking-tight">
            We&apos;re starting to learn what{' '}
            <span className="italic-accent text-sage-deep font-normal">affects you.</span>
          </h2>
          <p className="text-[13px] text-ink-2 mt-2">
            The more data and context you share, the better BioSense can understand your unique
            patterns and connections.
          </p>
          <div className="mt-4">
            <div className="text-[13px] font-semibold text-ink mb-1">Building your first connections</div>
            <p className="text-[12.5px] text-ink-2 mb-2">
              BioSense is analysing your data from multiple sources. Your first connection will
              appear when we find a pattern strong enough to be useful.
            </p>
            <div className="divide-y divide-[rgba(26,28,26,0.06)]">
              <SourceRow icon={Watch} title="Wearable data" hint="Heart rate, HRV, sleep, activity, recovery" state={wearableConnected ? 'done' : 'missing'} />
              <SourceRow icon={User} title="Your profile" hint="Age, goals, health profile" state={hasProfile ? 'done' : 'missing'} />
              <SourceRow icon={Brain} title="Learning Mode" hint="Personalised understanding of you" state={learningStarted ? 'done' : 'building'} />
              <SourceRow icon={FlaskConical} title="Biomarkers" hint="Blood test results and trends" state={hasBlood ? 'done' : 'missing'} />
              <SourceRow icon={Sun} title="Today's Context" hint="Environmental and lifestyle factors" state="optional" />
            </div>
          </div>
        </Card>
        <Card padding="lg">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-ink mb-2">
            <Sparkles className="w-4 h-4 text-sage-deep" strokeWidth={2} />
            What we&apos;re looking for
          </div>
          <p className="text-[12.5px] text-ink-2 mb-3">
            Repeatable relationships in your own data. First connections usually appear after about{' '}
            {min} days of consistent information.
          </p>
          <div className="grid grid-cols-3 gap-2">
            <LookFor icon={Moon} title="Sleep ↔ Recovery" body="How sleep influences your recovery" />
            <LookFor icon={Footprints} title="Activity ↔ Readiness" body="How training impacts your readiness" />
            <LookFor icon={Heart} title="Lifestyle ↔ Health" body="How daily habits relate to your health" />
          </div>
          <p className="text-[12px] text-ink-3 mt-3">
            You currently have {checkinCount} context day{checkinCount === 1 ? '' : 's'} stored.
          </p>
        </Card>
        <PrivacyStrip body="Your data stays private and secure. Connections are based on your data only, never compared to others." />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Card padding="lg">
        <h2 className="font-sans text-[20px] font-bold text-ink tracking-tight">
          Your habits show clear{' '}
          <span className="italic-accent text-sage-deep font-normal">patterns and connections.</span>
        </h2>
        <p className="text-[13px] text-ink-2 mt-1.5">
          These are repeated relationships BioSense has observed in your own data over time.
        </p>
      </Card>
      {patterns.map((p) => (
        <Link key={p.id} href={`/insights/connection/${p.id}`} className="block">
          <Card padding="md" className="tile-hover flex items-start gap-3">
            <IconBadge
              icon={p.confidence === 'HIGH' ? Moon : p.confidence === 'MEDIUM' ? Brain : TrendingUp}
              tone={p.confidence === 'HIGH' ? 'sage' : p.confidence === 'MEDIUM' ? 'amber' : 'violet'}
              variant="tint"
              size="md"
            />
            <div className="flex-1 min-w-0">
              <div className={cn('text-[10px] font-bold uppercase tracking-[0.12em]', confTone(p.confidence))}>
                {patternKind(p.confidence)}
              </div>
              <div className="text-[15px] font-semibold text-ink mt-1 leading-snug">{p.description}</div>
              <div className="text-[12px] text-ink-3 mt-1.5">
                First noticed {monthsBetween(p.discoveredAt)} ago · Confidence: {confLabel(p.confidence)}
              </div>
            </div>
            <div className="text-[12.5px] font-semibold text-sage-deep shrink-0 pt-1 inline-flex items-center gap-0.5">
              Explore
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Card>
        </Link>
      ))}
      <SignalsStrip
        items={[
          { icon: Watch, label: 'Wearable data', hint: 'Heart rate, HRV, sleep, activity, recovery' },
          { icon: FlaskConical, label: 'Biomarkers', hint: 'Blood test results and trends' },
          { icon: Brain, label: 'Learning Mode', hint: 'Personalised understanding of you' },
          { icon: Sun, label: "Today's Context", hint: 'Environmental and lifestyle factors' },
        ]}
      />
      <PrivacyStrip body="Connections are based on your data only. BioSense surfaces repeated relationships, not fixed truths." />
    </div>
  )
}

function PredictionsTab({
  cards,
  wearableConnected,
  hasBlood,
  learningStarted,
}: {
  cards: InsightCard[]
  wearableConnected: boolean
  hasBlood: boolean
  learningStarted: boolean
}) {
  const preds = cards.filter((c) => c.type === 'PROJECTION' || c.type === 'LONG_TERM_TREND')
  if (preds.length === 0) {
    return (
      <div className="space-y-3">
        <Card padding="lg">
          <h2 className="font-sans text-[20px] font-bold text-ink">Building your first predictions</h2>
          <p className="text-[13px] text-ink-2 mt-2 leading-relaxed">
            BioSense needs enough reliable history before it can say where a trend may be heading.
          </p>
          <div className="mt-4 divide-y divide-[rgba(26,28,26,0.06)]">
            <SourceRow icon={TrendingUp} title="Health trajectory" hint="Analysing your current direction" state="building" />
            <SourceRow icon={Watch} title="Wearable history" hint="Sleep, activity, recovery and more" state={wearableConnected ? 'done' : 'missing'} />
            <SourceRow icon={Link2} title="Patterns & Connections" hint="Learning what affects you" state="building" />
            <SourceRow icon={FlaskConical} title="Biomarkers" hint="Lab results and trends" state={hasBlood ? 'done' : 'missing'} />
            <SourceRow icon={GraduationCap} title="Learning Mode" hint="Personalised understanding" state={learningStarted ? 'done' : 'building'} />
          </div>
        </Card>
        <Card padding="lg">
          <div className="text-[13px] font-semibold text-ink mb-3">What BioSense may predict</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <LookFor icon={Heart} title="Recovery trajectory" body="Whether your recovery appears to be improving or declining" />
            <LookFor icon={TrendingUp} title="Health Score direction" body="Whether your long-term score is likely to keep improving" />
            <LookFor icon={Moon} title="Sleep trend" body="Whether your current sleep pattern is likely to persist" />
            <LookFor icon={FlaskConical} title="Biomarker direction" body="Whether a biomarker may be trending up or down" />
          </div>
        </Card>
        <PrivacyStrip body="Predictions are based on your data only, never compared to others." />
      </div>
    )
  }
  return (
    <div className="space-y-3">
      <Card padding="lg">
        <h2 className="font-sans text-[20px] font-bold text-ink">
          Your current data suggests several developing trajectories.
        </h2>
      </Card>
      {preds.map((c) => (
        <Link key={c.id} href={`/insights/item/${c.id}`} className="block">
          <Card padding="md" className="tile-hover">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-sage-deep">
              {c.type === 'PROJECTION' ? 'Likely' : 'Developing'}
            </div>
            <div className="text-[15px] font-semibold text-ink mt-1">{c.title}</div>
            <p className="text-[13px] text-ink-2 mt-1 leading-snug">{c.body}</p>
            <div className="text-[12.5px] font-semibold text-sage-deep mt-2 inline-flex items-center gap-0.5">
              Explore prediction <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Card>
        </Link>
      ))}
      <SignalsStrip
        items={[
          { icon: Watch, label: 'Wearable data', hint: 'Continuous stream from your devices' },
          { icon: Link2, label: 'Patterns & Connections', hint: 'Recurring trends and relationships' },
          { icon: FlaskConical, label: 'Biomarkers', hint: 'Key lab results and biological signals' },
          { icon: GraduationCap, label: 'Learning Mode', hint: 'Personalised insights that improve over time' },
        ]}
      />
      <PrivacyStrip body="Predictions are based on your own data only and represent likely directions, not fixed outcomes." />
    </div>
  )
}

function LearnedTab({
  facts,
  saved,
  patterns,
  wearableConnected,
  hasProfile,
  hasBlood,
}: {
  facts: LearnedFact[]
  saved: InsightCard[]
  patterns: PatternRow[]
  wearableConnected: boolean
  hasProfile: boolean
  hasBlood: boolean
}) {
  const [filter, setFilter] = useState('all')
  const items = useMemo(() => {
    const rows: {
      id: string
      href: string
      title: string
      body: string
      chip: string
      section: string
    }[] = [
      ...saved.map((c) => ({
        id: `i-${c.id}`,
        href: `/insights/item/${c.id}`,
        title: c.title,
        body: c.body,
        chip: 'Saved by you',
        section: 'all',
      })),
      ...patterns.map((p) => ({
        id: `p-${p.id}`,
        href: `/insights/connection/${p.id}`,
        title: p.description,
        body: `First noticed ${monthsBetween(p.discoveredAt)} ago · Confidence: ${confLabel(p.confidence)}`,
        chip: 'Saved by BioSense',
        section: p.type.toLowerCase(),
      })),
      ...facts.map((f) => ({
        id: f.id,
        href: `/insights/learned/${f.id}`,
        title: f.text,
        body: f.section.replace(/_/g, ' '),
        chip: 'Learned',
        section: f.section.toLowerCase(),
      })),
    ]
    if (filter === 'all') return rows
    return rows.filter(
      (r) =>
        r.section.includes(filter) ||
        r.title.toLowerCase().includes(filter) ||
        r.body.toLowerCase().includes(filter),
    )
  }, [facts, saved, patterns, filter])

  const empty = items.length === 0
  const filters: { id: string; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'sleep', label: 'Sleep' },
    { id: 'recovery', label: 'Recovery' },
    { id: 'stress', label: 'Stress' },
    { id: 'biomarker', label: 'Biomarkers' },
  ]

  return (
    <div className="space-y-3">
      {empty ? (
        <>
          <Card padding="lg">
            <h2 className="font-sans text-[20px] font-bold text-ink">Your Learned Intelligence is being built</h2>
            <p className="text-[13px] text-ink-2 mt-2 leading-relaxed">
              BioSense is still learning from your data. As we discover meaningful insights about your
              health, they will appear here.
            </p>
            <div className="mt-4 relative">
              <div className="absolute top-5 left-[8%] right-[8%] h-px bg-[rgba(168,191,163,0.35)]" aria-hidden />
              <div className="relative grid grid-cols-5 gap-1">
                <Mini icon={Watch} source="Wearables" ok={wearableConnected} />
                <Mini icon={User} source="Profile" ok={hasProfile} />
                <Mini icon={Link2} source="Patterns" ok={patterns.length > 0} />
                <Mini icon={FlaskConical} source="Biomarkers" ok={hasBlood} />
                <Mini icon={Brain} source="Learning" ok={facts.length > 0} />
              </div>
            </div>
          </Card>
          <Card padding="lg">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-ink mb-3">
              <Bookmark className="w-4 h-4 text-sage-deep" strokeWidth={2} />
              What gets saved here
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <LookFor icon={Sparkles} title="High impact" body="Insights that strongly affect your health or results" />
              <LookFor icon={Clock} title="Long term" body="Important discoveries stay here, even if newer insights appear" />
              <LookFor icon={RefreshCw} title="Always up to date" body="We track whether each insight strengthens, changes or fades" />
              <LookFor icon={User} title="Yours to reflect on" body="Look back today, next year, or years from now" />
            </div>
          </Card>
          <Card padding="md" className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[13px] font-semibold text-ink">Keep going. Every data point helps.</div>
              <p className="text-[12px] text-ink-2 mt-0.5">
                The more consistent data you share, the more personal your intelligence becomes.
              </p>
            </div>
            <Link href="/context" className="shrink-0 h-9 px-3.5 rounded-pill btn-sage text-white text-[12.5px] font-semibold inline-flex items-center gap-0.5">
              Add today&apos;s context
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </>
      ) : (
        <>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  'h-8 px-3 rounded-pill text-[12px] font-medium',
                  filter === f.id ? 'btn-sage text-white' : 'tile text-ink-2',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          {items.map((row) => (
            <Link key={row.id} href={row.href} className="block">
              <Card padding="md" className="tile-hover flex items-start gap-3">
                <IconBadge icon={Sparkles} tone="sage" variant="tint" size="md" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-sage-deep">{row.chip}</div>
                  <div className="text-[15px] font-semibold text-ink mt-1">{row.title}</div>
                  <p className="text-[12.5px] text-ink-2 mt-1">{row.body}</p>
                </div>
                <div className="text-[12.5px] font-semibold text-sage-deep shrink-0 pt-1 inline-flex items-center gap-0.5">
                  View detail
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </Link>
          ))}
          <Card padding="md">
            <div className="text-[13px] font-semibold text-ink">Why this matters</div>
            <p className="text-[12.5px] text-ink-2 mt-1 leading-relaxed">
              These discoveries are preserved because they have long-term value for understanding
              your health. BioSense keeps them here unless your data stops supporting them.
            </p>
          </Card>
        </>
      )}
      <PrivacyStrip />
    </div>
  )
}

function LookFor({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="rounded-[16px] px-2 py-3 text-center">
      <div className="w-9 h-9 rounded-full bg-[rgba(168,191,163,0.18)] flex items-center justify-center mx-auto mb-2">
        <Icon className="w-4 h-4 text-sage-deep" strokeWidth={2} />
      </div>
      <div className="text-[12.5px] font-semibold text-ink">{title}</div>
      <p className="text-[11.5px] text-ink-2 mt-0.5 leading-snug">{body}</p>
    </div>
  )
}

function SignalsStrip({
  items,
}: {
  items: { icon: LucideIcon; label: string; hint: string }[]
}) {
  return (
    <Card padding="lg">
      <div className="text-[13px] font-semibold text-ink mb-3">Signals behind this</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {items.map((x) => (
          <div key={x.label} className="text-center px-1">
            <div className="w-9 h-9 rounded-full bg-[rgba(168,191,163,0.18)] flex items-center justify-center mx-auto mb-1.5">
              <x.icon className="w-4 h-4 text-sage-deep" strokeWidth={2} />
            </div>
            <div className="text-[11.5px] font-semibold text-ink">{x.label}</div>
            <div className="text-[10.5px] text-ink-3 leading-snug">{x.hint}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function Mini({ source, ok, icon: Icon }: { source: string; ok: boolean; icon: LucideIcon }) {
  return (
    <div className="text-center px-0.5 min-w-0">
      <div className="relative inline-flex">
        <IconBadge icon={Icon} tone={ok ? 'sage' : 'ink'} variant="tint" size="md" />
        {ok && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-sage-deep text-white flex items-center justify-center">
            <Check className="w-2.5 h-2.5" strokeWidth={3} />
          </span>
        )}
      </div>
      <div className="text-[11px] font-semibold text-ink mt-1.5 leading-tight">{source}</div>
      <div className={cn('text-[10px]', ok ? 'text-sage-deep' : 'text-ink-3')}>{ok ? 'Ready' : 'Building'}</div>
    </div>
  )
}

function HeroArt({ kind }: { kind: 'nodes' | 'path' | 'tree' }) {
  return (
    <svg viewBox="0 0 120 88" className="w-[88px] sm:w-[108px] h-auto shrink-0 mt-1" aria-hidden>
      {kind === 'nodes' && (
        <>
          <circle cx="60" cy="44" r="34" fill="none" stroke="rgba(168,191,163,0.28)" strokeWidth="1.2" />
          <circle cx="60" cy="44" r="22" fill="none" stroke="rgba(168,191,163,0.18)" strokeWidth="1" />
          <circle cx="88" cy="18" r="7" fill="#7DA379" />
          <text x="88" y="21.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">+</text>
          <circle cx="96" cy="52" r="6" fill="#D9A05B" />
          <circle cx="78" cy="72" r="6" fill="#8B7BB8" />
        </>
      )}
      {kind === 'path' && (
        <>
          <circle cx="60" cy="44" r="38" fill="rgba(168,191,163,0.10)" />
          <path d="M18 70 C38 62 44 50 60 52 S92 38 108 28" fill="none" stroke="#7DA379" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="86" cy="18" r="7" fill="#C9D9C4" />
        </>
      )}
      {kind === 'tree' && (
        <>
          <ellipse cx="60" cy="72" rx="28" ry="8" fill="rgba(168,191,163,0.18)" />
          <path d="M60 72 L60 48" stroke="#5A7556" strokeWidth="2.4" />
          <circle cx="60" cy="36" r="18" fill="#A8BFA3" />
          <circle cx="48" cy="40" r="10" fill="#7DA379" />
          <circle cx="74" cy="38" r="11" fill="#8FB089" />
        </>
      )}
    </svg>
  )
}
