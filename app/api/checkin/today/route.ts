import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const checkin = await prisma.dailyCheckin.findUnique({
    where: { userId_date: { userId: authed.id, date: today } },
  })

  return NextResponse.json({ done: !!checkin, checkin })
}
