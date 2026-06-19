import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  await prisma.$transaction([
    prisma.consent.create({
      data: {
        userId: authed.id,
        tcVersion: '1.0',
        privacyVersion: '1.0',
        consentVersion: '1.0',
        dataConsentFlag: true,
        ipAddress: ip,
      },
    }),
    prisma.user.update({
      where: { id: authed.id },
      data: { hasConsented: true },
    }),
  ])

  return NextResponse.json({ success: true })
}
