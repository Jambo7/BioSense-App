import { NextResponse, after } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { nudgeStaleWearableSyncs } from '@/lib/wearable-sync-nudge'

// Allow the post-response refresh (via after()) time to hit Terra + write back.
export const maxDuration = 60

export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Terra often never auto-polls; refresh stale connections when the user opens
  // Wearables so lastSync stays current even if the provider's real-time webhook
  // goes quiet. Runs via after() — not fire-and-forget `void` — so the work
  // actually completes on Vercel (a returned function is otherwise frozen before
  // an un-awaited promise resolves). Fresh data lands by the next page load.
  after(async () => {
    try {
      await nudgeStaleWearableSyncs(authed.id)
    } catch (err) {
      console.error('[wearables] stale sync nudge failed:', err)
    }
  })

  const syncs = await prisma.wearableSync.findMany({
    where: { userId: authed.id },
    select: { provider: true, lastSync: true },
  })

  return NextResponse.json(syncs)
}
