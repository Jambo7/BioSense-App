import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  CalendarDays,
  CalendarClock,
  Bell,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'

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
            Weekly and monthly AI-generated insights, automatically delivered Sunday 7am
            and on the final day of each month.
          </p>
        </div>
      </header>

      <Card padding="md" className="flex items-center gap-3">
        <IconBadge icon={Bell} size="md" tone="sage" />
        <div className="flex-1 min-w-0">
          <div className="text-body-sm font-semibold text-ink">
            Notify me when reports drop
          </div>
          <div className="text-caption text-ink-2 leading-snug">
            Push notification at 7am every Sunday and end of month
          </div>
        </div>
        <div className="w-10 h-6 rounded-pill bg-sage relative shrink-0">
          <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
        </div>
      </Card>

      {!hasAnyReports && <LockedReports />}

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
                          {r.checkinsCompleted ?? 0}/7 context days
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

      <Card variant="soft" padding="md">
        <CardLabel>Report schedule</CardLabel>
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <div className="flex items-start gap-3">
            <IconBadge icon={CalendarDays} tone="sage" size="sm" />
            <div className="text-caption text-ink-2 leading-relaxed">
              <div className="text-body-sm text-ink font-semibold">Weekly</div>
              Sunday 7am. Headline, what changed, why it happened, 3 actions, effort vs
              impact, best/worst day.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <IconBadge icon={CalendarClock} tone="amber" size="sm" />
            <div className="text-caption text-ink-2 leading-relaxed">
              <div className="text-body-sm text-ink font-semibold">Monthly</div>
              Last day of month. Progress graphs, patterns, personal drivers, biological
              age trend.
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function LockedReports() {
  return (
    <section>
      <Card padding="lg" className="space-y-3">
        <h2 className="font-sans text-[20px] font-bold text-ink tracking-tight">
          Your first report is still{' '}
          <span className="italic-accent text-sage-deep font-normal">being built.</span>
        </h2>
        <p className="text-[13px] text-ink-2 leading-relaxed">
          Weekly and monthly reports unlock once BioSense has enough of your own days to
          summarise honestly. Nothing here is filled with sample numbers.
        </p>
        <p className="text-[12px] text-ink-3">
          Keep adding today&apos;s context and keep your wearable connected. The first weekly
          report usually lands after a consistent week.
        </p>
      </Card>
    </section>
  )
}
