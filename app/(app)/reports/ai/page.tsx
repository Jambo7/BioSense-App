import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  FileText,
  CalendarDays,
  CalendarClock,
  Bell,
  TrendingDown,
  Sparkles,
  Lightbulb,
  Target,
  Scale,
  Eye,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { ScoreRing } from '@/components/ui/score-ring'
import { BarStrip } from '@/components/ui/spark-line'

export default async function AiReportsPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const [weeklyReports, monthlyReports] = await Promise.all([
    prisma.weeklyReport.findMany({
      where: { userId: session.user.id },
      orderBy: { generatedAt: 'desc' },
      take: 12,
    }),
    prisma.monthlyReport.findMany({
      where: { userId: session.user.id },
      orderBy: { generatedAt: 'desc' },
      take: 12,
    }),
  ])

  const hasAnyReports = weeklyReports.length + monthlyReports.length > 0

  return (
    <div className="max-w-3xl mx-auto fade-up space-y-6">
      <Link
        href="/reports"
        className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2 transition-colors"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to Trends
      </Link>

      {/* Page header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="text-eyebrow uppercase text-sage-deep mb-1">
            Intelligence reports
          </div>
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1]">
            Your{' '}
            <span className="italic-accent">health reports.</span>
          </h1>
          <p className="text-body text-ink-2 mt-2 max-w-[58ch] leading-relaxed">
            Weekly and monthly AI-generated insights — automatically delivered Sunday 7am
            and on the final day of each month.
          </p>
        </div>
      </header>

      {/* Push notification card (matches moodboard) */}
      <Card padding="md" className="flex items-center gap-3">
        <IconBadge icon={Bell} size="md" tone="sage" />
        <div className="flex-1 min-w-0">
          <div className="text-body-sm font-semibold text-ink">
            Notify me when reports drop
          </div>
          <div className="text-caption text-ink-2 leading-snug">
            Push notification at 7am every Sunday & end of month
          </div>
        </div>
        <div className="w-10 h-6 rounded-pill bg-sage relative shrink-0">
          <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
        </div>
      </Card>

      {/* Empty state — show a preview of what reports look like */}
      {!hasAnyReports && <SampleWeeklyReport />}

      {/* Weekly reports list */}
      {weeklyReports.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <IconBadge icon={CalendarDays} tone="sage" size="sm" />
            <h2 className="text-h2 text-ink">Weekly reports</h2>
            <Pill tone="ink" size="sm" className="ml-1">
              {weeklyReports.length}
            </Pill>
          </div>
          <div className="space-y-2.5">
            {weeklyReports.map((r) => {
              const content = (r.content as Record<string, unknown>) ?? {}
              const headline =
                typeof content.headline === 'string' ? content.headline : 'Weekly summary'
              return (
                <Card
                  key={r.id}
                  className="cursor-pointer transition-all hover:border-line-2 hover:bg-off-white group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <CardLabel className="mb-0">Week {r.period}</CardLabel>
                        <Pill tone="soft-sage" size="sm">
                          {r.checkinsCompleted ?? 0}/7 check-ins
                        </Pill>
                      </div>
                      <p className="text-body text-ink font-medium leading-snug truncate">
                        {headline}
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-caption text-ink-3 mt-1.5">
                        {r.bestDay && (
                          <span>
                            Best:{' '}
                            <span className="text-sage-deep font-medium">{r.bestDay}</span>
                          </span>
                        )}
                        {r.worstDay && (
                          <span>
                            Worst:{' '}
                            <span className="text-rose font-medium">{r.worstDay}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-ink-3 group-hover:text-ink shrink-0" />
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {/* Monthly reports list */}
      {monthlyReports.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <IconBadge icon={CalendarClock} tone="amber" size="sm" />
            <h2 className="text-h2 text-ink">Monthly reports</h2>
            <Pill tone="ink" size="sm" className="ml-1">
              {monthlyReports.length}
            </Pill>
          </div>
          <div className="space-y-2.5">
            {monthlyReports.map((r) => {
              const content = (r.content as Record<string, unknown>) ?? {}
              const summary =
                typeof content.summary === 'string' ? content.summary : 'Monthly summary'
              return (
                <Card
                  key={r.id}
                  className="cursor-pointer transition-all hover:border-line-2 hover:bg-off-white group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <CardLabel className="mb-0">{r.period}</CardLabel>
                        <Pill tone="ink" size="sm">
                          {new Date(r.generatedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </Pill>
                      </div>
                      <p className="text-body-sm text-ink-2 leading-relaxed line-clamp-2">
                        {summary}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-ink-3 group-hover:text-ink shrink-0" />
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {/* Schedule reference */}
      <Card variant="soft" padding="md">
        <CardLabel>Report schedule</CardLabel>
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <div className="flex items-start gap-3">
            <IconBadge icon={CalendarDays} tone="sage" size="sm" />
            <div className="text-caption text-ink-2 leading-relaxed">
              <div className="text-body-sm text-ink font-semibold">Weekly</div>
              Sunday 7am · headline, what changed, why it happened, 3 actions, effort vs
              impact, best/worst day.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <IconBadge icon={CalendarClock} tone="amber" size="sm" />
            <div className="text-caption text-ink-2 leading-relaxed">
              <div className="text-body-sm text-ink font-semibold">Monthly</div>
              Last day of month · progress graphs, patterns, personal drivers, biological
              age trend.
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

/**
 * Sample weekly report preview rendered when the user has none yet.
 */
function SampleWeeklyReport() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const dayValues = [85, 78, 70, 45, 65, 80, 76]

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IconBadge icon={FileText} tone="sage" size="sm" />
          <h2 className="text-h2 text-ink">Sample weekly report</h2>
        </div>
        <Pill tone="ink" size="sm">
          Preview · not your data
        </Pill>
      </div>

      <Card padding="lg" className="space-y-6">
        {/* Hero callout */}
        <div className="rounded-[12px] bg-rose-tint border border-[rgba(201,122,122,0.25)] p-5 flex items-center gap-5">
          <ScoreRing value={42} size={108} thickness={8} tone="rose" label="Energy score" />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-rose mb-1">
              <TrendingDown className="w-4 h-4" />
              <span className="text-caption font-semibold">↓ 21% vs last week</span>
            </div>
            <p className="text-body text-ink leading-snug">
              Your energy dropped this week — mainly driven by{' '}
              <span className="font-semibold">inconsistent sleep</span> and{' '}
              <span className="font-semibold">rising stress mid-week</span>.
            </p>
          </div>
        </div>

        {/* What changed + why it happened */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card variant="soft" padding="md">
            <div className="flex items-center gap-2 mb-3">
              <IconBadge icon={TrendingDown} tone="rose" size="sm" />
              <span className="text-h3 text-ink">What changed</span>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Energy', delta: '↓ 21%' },
                { label: 'Sleep consistency', delta: '↓ 26%' },
                { label: 'Stress', delta: '↑ 18%' },
                { label: 'Resting heart rate', delta: '↑ 3 bpm' },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between text-body-sm">
                  <span className="text-ink-2">{r.label}</span>
                  <span className="text-rose font-semibold">{r.delta}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="soft" padding="md">
            <div className="flex items-center gap-2 mb-3">
              <IconBadge icon={Lightbulb} tone="amber" size="sm" />
              <span className="text-h3 text-ink">Why it happened</span>
            </div>
            <p className="text-body-sm text-ink-2 leading-[1.65]">
              Your sleep window shifted later in the week (Tue–Thu), with bedtimes moving
              60–90 minutes later than usual. This compounded mid-week stress and likely
              drove the dip in recovery.
            </p>
          </Card>
        </div>

        {/* Actions + effort vs impact */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card variant="soft" padding="md">
            <div className="flex items-center gap-2 mb-3">
              <IconBadge icon={Target} tone="sage" size="sm" />
              <span className="text-h3 text-ink">Your 3 actions</span>
            </div>
            <ol className="space-y-2.5">
              {[
                'Lock your sleep window — in bed by 11pm, ≥4 nights',
                'No caffeine after 2pm',
                'Add 2 light recovery sessions (walk, mobility)',
              ].map((a, i) => (
                <li key={a} className="flex items-start gap-2.5 text-body-sm text-ink-2">
                  <span className="w-5 h-5 rounded-full bg-sage text-white text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{a}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card variant="soft" padding="md">
            <div className="flex items-center gap-2 mb-3">
              <IconBadge icon={Scale} tone="ink" size="sm" />
              <span className="text-h3 text-ink">Effort vs impact</span>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Sleep timing', impact: 'High',   tone: 'sage' as const },
                { label: 'Caffeine',     impact: 'Medium', tone: 'amber' as const },
                { label: 'Recovery',     impact: 'Medium', tone: 'amber' as const },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-body-sm text-ink-2">{r.label}</span>
                  <Pill tone={r.tone === 'sage' ? 'soft-sage' : 'amber'} size="sm">
                    {r.impact} impact
                  </Pill>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Insight + pattern */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card variant="sage" padding="md">
            <div className="flex items-center gap-2 mb-3">
              <IconBadge icon={Eye} tone="sage" size="sm" />
              <span className="text-h3 text-ink">Insight you didn&apos;t know</span>
            </div>
            <p className="text-body-sm text-ink leading-[1.65]">
              Your energy tends to drop <strong>2 days after</strong> disrupted sleep — not
              immediately. The impact of poor sleep often shows up later, not the next day.
            </p>
          </Card>

          <Card variant="soft" padding="md">
            <div className="flex items-center gap-2 mb-3">
              <IconBadge icon={Sparkles} tone="amber" size="sm" />
              <span className="text-h3 text-ink">Pattern snapshot</span>
            </div>
            <div className="text-caption text-ink-2 mb-3">
              Best: <span className="text-sage-deep font-semibold">Monday</span> · Worst:{' '}
              <span className="text-rose font-semibold">Thursday</span>
            </div>
            <BarStrip values={dayValues} labels={days} highlightIndex={3} highlightTone="rose" />
          </Card>
        </div>

        {/* Consistency check */}
        <div className="rounded-[12px] border border-line p-4 flex items-center gap-3 bg-off-white">
          <IconBadge icon={CheckCircle2} tone="sage" size="md" />
          <div className="flex-1">
            <div className="text-body-sm font-semibold text-ink">
              Consistency check · 5/7 days
            </div>
            <div className="text-caption text-ink-2">
              You&apos;re building a strong data baseline — keep going.
            </div>
          </div>
          <div className="hidden sm:flex gap-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => {
              const checked = i < 5
              return (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full text-[10px] font-semibold flex items-center justify-center ${checked ? 'bg-sage text-white' : 'bg-sand-deep text-ink-3'}`}
                >
                  {d}
                </div>
              )
            })}
          </div>
        </div>

        {/* Final note */}
        <div className="rounded-[12px] bg-sand-deep/40 border border-line p-4 flex items-start gap-3">
          <IconBadge icon={Sparkles} tone="amber" size="md" />
          <div>
            <div className="text-body-sm font-semibold text-ink mb-1">Final note</div>
            <p className="text-caption text-ink-2 leading-relaxed">
              This wasn&apos;t your strongest week, but the pattern is clear — and very
              fixable. Small improvements in sleep timing alone could reverse most of this
              in the next 7 days.
            </p>
          </div>
        </div>
      </Card>

      <p className="text-caption text-ink-3 mt-3 text-center">
        Your real reports start after 3 check-ins · monthly after your first full month.
      </p>
    </section>
  )
}
