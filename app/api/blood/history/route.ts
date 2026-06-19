import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

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

/**
 * JSON blood-test history for API clients. Mirrors the Blood History page:
 * one entry per test (newest first) with tier counts and in-range %, plus a
 * chronological in-range trend series.
 */
export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = await prisma.bloodResult.findMany({
    where: { userId: authed.id },
    orderBy: { drawDate: 'desc' },
  })

  const enriched = results.map((r) => {
    const m = (r.markers as unknown as BloodMarkerRecord[] | null) ?? []
    const c = tierCounts(m)
    const total = m.length
    return {
      id: r.id,
      drawDate: r.drawDate.toISOString(),
      total,
      ...c,
      inRangePct: total > 0 ? Math.round((c.t1 / total) * 100) : 0,
    }
  })

  const trend = [...enriched].reverse().map((e) => e.inRangePct)

  return NextResponse.json({ results: enriched, trend })
}
