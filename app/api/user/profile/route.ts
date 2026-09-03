import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { recordPreferenceChange } from '@/lib/comms'
import { CONSENT } from '@/lib/consent'
import { clientIp } from '@/lib/rate-limit'

const schema = z.object({
  name: z.string().min(1).optional(),
  age: z.number().int().min(18).max(120).nullable().optional(),
  goalType: z.enum(['PERFORMANCE', 'HEALTH', 'BODY_COMP', 'WELLBEING']).optional(),
  goalText: z.string().optional(),
  goalDeadline: z.string().nullable().optional(),
  allergies: z.array(z.string()).optional(),
  conditions: z.array(z.string()).optional(),
  lifestyle: z.string().optional(),
  notifyProductEmail: z.boolean().optional(),
  notifyMarketingEmail: z.boolean().optional(),
})

export async function PATCH(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = schema.parse(body)

    const current = await prisma.user.findUnique({
      where: { id: authed.id },
      select: { notifyProductEmail: true, notifyMarketingEmail: true },
    })

    const updated = await prisma.user.update({
      where: { id: authed.id },
      data: {
        ...data,
        goalDeadline: data.goalDeadline ? new Date(data.goalDeadline) : data.goalDeadline,
      },
    })

    if (current && data.notifyProductEmail != null && data.notifyProductEmail !== current.notifyProductEmail) {
      await recordPreferenceChange({
        userId: authed.id,
        field: 'notifyProductEmail',
        previous: String(current.notifyProductEmail),
        next: String(data.notifyProductEmail),
        source: 'profile',
      })
    }
    if (current && data.notifyMarketingEmail != null && data.notifyMarketingEmail !== current.notifyMarketingEmail) {
      const granted = data.notifyMarketingEmail
      await recordPreferenceChange({
        userId: authed.id,
        field: 'notifyMarketingEmail',
        previous: String(current.notifyMarketingEmail),
        next: String(data.notifyMarketingEmail),
        source: 'profile',
      })
      await prisma.consent.create({
        data: {
          userId: authed.id,
          tcVersion: CONSENT.tcVersion,
          privacyVersion: CONSENT.privacyVersion,
          consentVersion: CONSENT.consentVersion,
          dataConsentFlag: granted,
          purpose: 'MARKETING',
          status: granted ? 'GRANTED' : 'WITHDRAWN',
          withdrawnAt: granted ? null : new Date(),
          ipAddress: clientIp(req),
        },
      })
    }

    return NextResponse.json({ success: true, name: updated.name })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? "Validation error" }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: authed.id },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      goalType: true,
      goalText: true,
      goalDeadline: true,
      allergies: true,
      conditions: true,
      lifestyle: true,
      onboardingDone: true,
    },
  })

  return NextResponse.json(user)
}
