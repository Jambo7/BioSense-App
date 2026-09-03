import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { CONSENT } from '@/lib/consent'
import { clientIp } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const ip = clientIp(req)
  let marketing = false
  try {
    const body = (await req.json()) as { marketing?: boolean }
    marketing = Boolean(body.marketing)
  } catch {
    marketing = false
  }

  await prisma.$transaction([
    prisma.consent.create({
      data: {
        userId: authed.id,
        tcVersion: CONSENT.tcVersion,
        privacyVersion: CONSENT.privacyVersion,
        consentVersion: CONSENT.consentVersion,
        dataConsentFlag: true,
        purpose: 'SERVICE',
        status: 'GRANTED',
        ipAddress: ip,
      },
    }),
    prisma.consent.create({
      data: {
        userId: authed.id,
        tcVersion: CONSENT.tcVersion,
        privacyVersion: CONSENT.privacyVersion,
        consentVersion: CONSENT.consentVersion,
        dataConsentFlag: marketing,
        purpose: 'MARKETING',
        status: marketing ? 'GRANTED' : 'WITHDRAWN',
        withdrawnAt: marketing ? null : new Date(),
        ipAddress: ip,
      },
    }),
    prisma.user.update({
      where: { id: authed.id },
      data: {
        hasConsented: true,
        notifyMarketingEmail: marketing,
      },
    }),
  ])

  return NextResponse.json({ success: true })
}
