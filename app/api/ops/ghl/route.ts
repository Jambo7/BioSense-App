import { NextResponse } from 'next/server'
import { isOpsAuthenticated } from '@/lib/ops-auth'
import { syncAllToGhl } from '@/lib/ghl'

export async function POST() {
  if (!(await isOpsAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const result = await syncAllToGhl()
  return NextResponse.json(result)
}
