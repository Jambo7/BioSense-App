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

/**
 * JSON of the latest blood panel for API clients. Mirrors the Biomarkers
 * page: markers from the most recent test, sorted action -> watch -> in range
 * (and alphabetically within each tier).
 */
export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const latest = await prisma.bloodResult.findFirst({
    where: { userId: authed.id },
    orderBy: { drawDate: 'desc' },
  })

  const markers = (latest?.markers as unknown as BloodMarkerRecord[] | null) ?? []

  const tierOrder = { T3: 0, T2: 1, T1: 2 } as const
  const sorted = [...markers].sort((a, b) => {
    const t = tierOrder[a.tier] - tierOrder[b.tier]
    if (t !== 0) return t
    return a.name.localeCompare(b.name)
  })

  return NextResponse.json({
    drawDate: latest?.drawDate.toISOString() ?? null,
    markers: sorted,
  })
}
