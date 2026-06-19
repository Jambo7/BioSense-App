import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const syncs = await prisma.wearableSync.findMany({
    where: { userId: authed.id },
    select: { provider: true, lastSync: true },
  })

  return NextResponse.json(syncs)
}
