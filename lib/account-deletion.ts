import { createHash } from 'crypto'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { deauthenticateTerraUser } from '@/lib/terra'
import { getStripe } from '@/lib/stripe'

function emailHash(email: string): string {
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex')
}

function terraUserIdFromData(data: Prisma.JsonValue | null): string | null {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null
  const rec = data as Record<string, unknown>
  const id = rec.terraUserId
  return typeof id === 'string' && id.length > 0 ? id : null
}

async function deauthenticateTerra(terraUserId: string): Promise<'ok' | 'failed'> {
  try {
    return (await deauthenticateTerraUser(terraUserId)) ? 'ok' : 'failed'
  } catch (err) {
    console.error('[delete] Terra deauth error', err)
    return 'failed'
  }
}

async function cancelStripe(customerId: string): Promise<'ok' | 'failed'> {
  try {
    const stripe = getStripe()
    const subs = await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 20 })
    for (const sub of subs.data) {
      if (sub.status === 'canceled' || sub.status === 'incomplete_expired') continue
      await stripe.subscriptions.cancel(sub.id)
    }
    return 'ok'
  } catch (err) {
    console.error('[delete] Stripe cancel error', err)
    return 'failed'
  }
}

export async function deleteUserAccount(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { wearableSyncs: { select: { data: true } } },
  })
  if (!user) return

  const processors: Record<string, string> = {
    neon: 'pending',
    terra: 'skipped',
    stripe: user.stripeCustomerId ? 'pending' : 'skipped',
    openai: 'not_controllable',
  }

  const terraIds = new Set<string>()
  for (const sync of user.wearableSyncs) {
    const id = terraUserIdFromData(sync.data)
    if (id) terraIds.add(id)
  }
  if (terraIds.size > 0) {
    const results = await Promise.all([...terraIds].map(deauthenticateTerra))
    processors.terra = results.every((r) => r === 'ok') ? 'ok' : 'failed_contained'
  }

  if (user.stripeCustomerId) {
    processors.stripe = await cancelStripe(user.stripeCustomerId)
    // Customer record retained for accounting — not destroyed.
  }

  await prisma.verificationToken.deleteMany({ where: { identifier: user.email.toLowerCase() } })
  await prisma.user.delete({ where: { id: userId } })
  processors.neon = 'deleted'

  await prisma.deletionRecord.create({
    data: {
      emailHash: emailHash(user.email),
      processors,
    },
  })
}
