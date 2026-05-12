import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { InsightsClient } from './insights-client'

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

export default async function InsightsPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  // Pull the most recent test for the hero summary, plus the last 6 tests
  // for the small history sparkline (in-range % over time).
  const results = await prisma.bloodResult.findMany({
    where: { userId: session.user.id },
    orderBy: { drawDate: 'desc' },
    take: 6,
  })

  const latest = results[0]
  const latestMarkers = (latest?.markers as unknown as BloodMarkerRecord[] | null) ?? []
  const latestCounts = tierCounts(latestMarkers)
  const totalCount = latestMarkers.length

  const history = results
    .slice()
    .reverse()
    .map((r) => {
      const m = (r.markers as unknown as BloodMarkerRecord[] | null) ?? []
      const c = tierCounts(m)
      const total = m.length
      const inRangePct = total > 0 ? Math.round((c.t1 / total) * 100) : 0
      return {
        date: r.drawDate.toISOString().split('T')[0],
        inRangePct,
      }
    })

  return (
    <InsightsClient
      hasResult={!!latest}
      drawDate={latest?.drawDate.toISOString().split('T')[0] ?? null}
      totalCount={totalCount}
      t1={latestCounts.t1}
      t2={latestCounts.t2}
      t3={latestCounts.t3}
      history={history}
      historyTotal={results.length}
    />
  )
}
