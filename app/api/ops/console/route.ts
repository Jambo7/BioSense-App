import { NextResponse } from 'next/server'
import { isOpsAuthenticated } from '@/lib/ops-auth'
import { loadOpsConsole } from '@/lib/ops-console'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await isOpsAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const data = await loadOpsConsole()
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
