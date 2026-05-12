import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { SparkLine } from '@/components/ui/spark-line'
import { Pill } from '@/components/ui/pill'
import {
  ChevronLeft,
  History,
  Upload,
  ArrowRight,
} from 'lucide-react'

interface BloodMarkerRecord {
  name: string
  value: number
  unit?: string
  refMin?: number
  refMax?: number
  tier: 'T1' | 'T2' | 'T3'
}

function tierCounts(markers: BloodMarkerRecord[]) {
  let t1 = 0
  let t2 = 0
  let t3 = 0
  for (const m of markers) {
    if (m.tier === 'T1') t1++
    else if (m.tier === 'T2') t2++
    else if (m.tier === 'T3') t3++
  }
  return { t1, t2, t3 }
}

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const results = await prisma.bloodResult.findMany({
    where: { userId: session.user.id },
    orderBy: { drawDate: 'desc' },
  })

  const enriched = results.map((r) => {
    const m = (r.markers as unknown as BloodMarkerRecord[] | null) ?? []
    const c = tierCounts(m)
    const total = m.length
    return {
      id: r.id,
      drawDate: r.drawDate,
      total,
      ...c,
      inRangePct: total > 0 ? Math.round((c.t1 / total) * 100) : 0,
    }
  })

  // Build the "in-range over time" series, in chronological order, for
  // the headline trend chart.
  const trend = [...enriched].reverse().map((e) => e.inRangePct)

  return (
    <div className="max-w-2xl mx-auto fade-up space-y-5">
      <Link
        href="/blood"
        className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2 transition-colors"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to Insights
      </Link>

      <header className="flex items-start gap-4">
        <IconBadge icon={History} size="xl" tone="amber" />
        <div className="flex-1">
          <div className="text-eyebrow uppercase text-sage-deep mb-1">History</div>
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1]">
            Past <span className="italic-accent">results.</span>
          </h1>
          <p className="text-body-sm text-ink-2 mt-1.5">
            {results.length} test{results.length === 1 ? '' : 's'} on file
          </p>
        </div>
      </header>

      {results.length === 0 ? (
        <Card padding="lg" className="text-center">
          <IconBadge icon={History} tone="ink" size="xl" className="mx-auto mb-3" />
          <h2 className="font-sans text-h3 text-ink">No history yet</h2>
          <p className="text-caption text-ink-2 mt-1.5 max-w-[36ch] mx-auto">
            Upload a lab PDF to begin tracking how your biomarkers change over time.
          </p>
          <Link
            href="/blood/upload"
            className="btn-sage mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-pill font-semibold text-caption"
          >
            <Upload className="w-4 h-4" strokeWidth={2.25} />
            Upload first lab
          </Link>
        </Card>
      ) : (
        <>
          {/* Trend overview */}
          {trend.length >= 2 && (
            <Card padding="lg" variant="glass-strong">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <CardLabel className="mb-1">In-range trend</CardLabel>
                  <div className="text-h3 text-ink leading-tight">
                    {enriched[0]?.inRangePct}%{' '}
                    <span className="text-body text-ink-2 font-normal">most recent</span>
                  </div>
                </div>
                <Pill tone="soft-sage" size="sm">
                  {trend.length} of {trend.length}
                </Pill>
              </div>
              <SparkLine
                values={trend}
                width={520}
                height={70}
                tone="sage"
                showFill
                showDots
                highlightLast
                className="w-full h-auto"
              />
            </Card>
          )}

          {/* Per-test list */}
          <Card padding="md">
            <CardLabel>All tests · newest first</CardLabel>
            <ul className="divide-y divide-line">
              {enriched.map((e) => (
                <li key={e.id} className="py-3 flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-12 shrink-0">
                    <span className="text-eyebrow uppercase text-ink-3 leading-none">
                      {e.drawDate.toLocaleDateString('en-GB', { month: 'short' })}
                    </span>
                    <span className="font-sans text-h3 text-ink tabular-nums leading-none mt-0.5">
                      {e.drawDate.toLocaleDateString('en-GB', { day: '2-digit' })}
                    </span>
                    <span className="text-[10px] text-ink-3 leading-none mt-0.5 tabular-nums">
                      {e.drawDate.getFullYear()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-body-sm font-semibold text-ink">
                      {e.total} marker{e.total === 1 ? '' : 's'}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <TierDot color="#6F8F6B" count={e.t1} />
                      <TierDot color="#D9A05B" count={e.t2} />
                      <TierDot color="#C97A7A" count={e.t3} />
                      <span className="text-caption text-ink-3 ml-1">
                        {e.inRangePct}% in range
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-ink-3 shrink-0" />
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </div>
  )
}

function TierDot({ color, count }: { color: string; count: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full pl-1 pr-2 py-0.5"
      style={{ background: `${color}1f` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span className="text-[11px] font-semibold tabular-nums text-ink">{count}</span>
    </span>
  )
}
