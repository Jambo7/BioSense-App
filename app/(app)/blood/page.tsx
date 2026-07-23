import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canonicalMarker } from '@/lib/biomarkers'
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

  const chronological = results.slice().reverse()

  const history = chronological.map((r) => {
    const m = (r.markers as unknown as BloodMarkerRecord[] | null) ?? []
    const c = tierCounts(m)
    const total = m.length
    const inRangePct = total > 0 ? Math.round((c.t1 / total) * 100) : 0
    return {
      date: r.drawDate.toISOString().split('T')[0],
      inRangePct,
    }
  })

  // Per-marker time series across past tests (oldest → newest), keyed by
  // canonical name so "LDL" and "LDL Cholesterol" line up across uploads.
  // Powers the inline trend graphs and the real "previous result" row.
  const seriesMap = new Map<string, { values: number[]; dates: string[] }>()
  for (const r of chronological) {
    const ms = (r.markers as unknown as BloodMarkerRecord[] | null) ?? []
    const date = r.drawDate.toISOString().split('T')[0]
    for (const m of ms) {
      if (typeof m.value !== 'number') continue
      const key = canonicalMarker(m.name)
      const entry = seriesMap.get(key) ?? { values: [], dates: [] }
      entry.values.push(m.value)
      entry.dates.push(date)
      seriesMap.set(key, entry)
    }
  }

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
      markers={latestMarkers.map((m) => {
        const entry = seriesMap.get(canonicalMarker(m.name))
        const hasTrend = !!entry && entry.values.length >= 2
        return {
          name:   m.name,
          value:  m.value,
          unit:   m.unit,
          refMin: m.refMin,
          refMax: m.refMax,
          tier:   m.tier,
          series: hasTrend ? entry.values : undefined,
          prev:   hasTrend
            ? { value: entry.values[entry.values.length - 2], date: entry.dates[entry.dates.length - 2] }
            : undefined,
        }
      })}
    />
  )
}
