/**
 * Apple Health JSON upload — ported from JARVIS server.js /api/health
 * Parses Health Auto Export format and stores data
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

interface HealthExportMetric {
  name: string
  units: string
  data: Array<{ date: string; qty?: number; Max?: number; Min?: number; Avg?: number; Heartrate?: number; value?: string | number }>
}

interface HealthExport {
  data: {
    metrics: HealthExportMetric[]
    workouts?: unknown[]
  }
}

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const text = await file.text()
    let exportData: HealthExport

    try {
      exportData = JSON.parse(text)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON file' }, { status: 422 })
    }

    const metrics = exportData?.data?.metrics ?? []
    let recordCount = 0

    // Process each metric type and store relevant data
    const summary: Record<string, number[]> = {}

    for (const metric of metrics) {
      const name = metric.name.toLowerCase().replace(/\s+/g, '_')
      const values: number[] = []

      for (const point of metric.data ?? []) {
        const val = point.qty ?? point.Avg ?? (typeof point.value === 'number' ? point.value : null)
        if (val != null) {
          values.push(val)
          recordCount++
        }
      }

      if (values.length > 0) {
        summary[name] = values
      }
    }

    // Store aggregated data in WearableSync
    await prisma.wearableSync.upsert({
      where: { userId_provider: { userId: authed.id, provider: 'apple' } },
      create: {
        userId: authed.id,
        provider: 'apple',
        lastSync: new Date(),
        data: summary,
      },
      update: {
        lastSync: new Date(),
        data: summary,
      },
    })

    return NextResponse.json({ success: true, recordCount })
  } catch (err) {
    console.error('Apple Health upload error:', err)
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 })
  }
}
