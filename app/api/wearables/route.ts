import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { nudgeStaleWearableSyncs } from '@/lib/wearable-sync-nudge'

export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Terra often never auto-polls; refresh stale connections in the background
  // when the user opens Wearables so lastSync stays current without a cron.
  void nudgeStaleWearableSyncs(authed.id).catch((err) =>
    console.error('[wearables] stale sync nudge failed:', err),
  )

  const syncs = await prisma.wearableSync.findMany({
    where: { userId: authed.id },
    select: { provider: true, lastSync: true },
  })

  return NextResponse.json(syncs)
}
