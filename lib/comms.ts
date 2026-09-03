/**
 * One place BioSense decides whether to send automated email.
 * Resend only delivers. Stripe/Zoho are not the customer file.
 */
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { sendRawEmail } from '@/lib/resend-send'

export type CommsCategory = 'SERVICE' | 'PRODUCT' | 'MARKETING'

export async function recordPreferenceChange(params: {
  userId: string
  field: string
  previous: string
  next: string
  source: string
}) {
  await prisma.preferenceChange.create({ data: params })
}

async function logComms(data: Prisma.NotificationLogUncheckedCreateInput) {
  await prisma.notificationLog.create({ data })
}

export async function dispatchEmail(params: {
  userId: string
  category: CommsCategory
  trigger: string
  template: string
  subject: string
  html: string
  message: string
  url?: string
}): Promise<{ sent: boolean; reason?: string }> {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    select: {
      id: true,
      email: true,
      notifyProductEmail: true,
      notifyMarketingEmail: true,
      emailSuppressedAt: true,
    },
  })

  if (!user) {
    return { sent: false, reason: 'user_missing' }
  }

  let reason: string | undefined
  if (user.emailSuppressedAt) reason = 'email_suppressed'
  else if (params.category === 'PRODUCT' && !user.notifyProductEmail) reason = 'product_email_opt_out'
  else if (params.category === 'MARKETING' && !user.notifyMarketingEmail) reason = 'marketing_email_opt_out'

  if (reason) {
    await logComms({
      userId: user.id,
      trigger: params.trigger,
      message: params.message,
      channel: 'email',
      url: params.url,
      category: params.category,
      template: params.template,
      result: 'SUPPRESSED',
      suppressionReason: reason,
    })
    return { sent: false, reason }
  }

  try {
    const providerId = await sendRawEmail(user.email, params.subject, params.html)
    await logComms({
      userId: user.id,
      trigger: params.trigger,
      message: params.message,
      channel: 'email',
      url: params.url,
      category: params.category,
      template: params.template,
      providerId,
      result: 'SENT',
    })
    return { sent: true }
  } catch (err) {
    console.error('[comms] send failed:', err)
    await logComms({
      userId: user.id,
      trigger: params.trigger,
      message: params.message,
      channel: 'email',
      url: params.url,
      category: params.category,
      template: params.template,
      result: 'FAILED',
      suppressionReason: err instanceof Error ? err.message.slice(0, 180) : 'send_failed',
    })
    return { sent: false, reason: 'send_failed' }
  }
}
