import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateMonthlyReport } from '@/lib/reports'
import { isCronAuthorized } from '@/lib/cron-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

async function handle(req: NextRequest) {
  if (!isCronAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const period = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const users = await prisma.user.findMany({
    where: { onboardingDone: true, hasConsented: true },
    select: { id: true },
  })

  let generated = 0
  const errors: string[] = []

  for (const user of users) {
    try {
      const report = await generateMonthlyReport(user.id, period)
      if (report) generated++
    } catch (err) {
      errors.push(user.id)
      console.error(`Monthly report failed for ${user.id}:`, err)
    }
  }

  return NextResponse.json({ generated, errors, period })
}

export async function GET(req: NextRequest) {
  return handle(req)
}

export async function POST(req: NextRequest) {
  return handle(req)
}
