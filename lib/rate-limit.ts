import { prisma } from '@/lib/prisma'

export async function isRateLimited(
  key: string,
  limit: number,
): Promise<{ locked: boolean; retryAfterSec: number }> {
  const now = new Date()
  const row = await prisma.abuseWindow.findUnique({ where: { key } })
  if (!row || row.resetAt <= now) return { locked: false, retryAfterSec: 0 }
  if (row.count < limit) return { locked: false, retryAfterSec: 0 }
  return {
    locked: true,
    retryAfterSec: Math.max(1, Math.ceil((row.resetAt.getTime() - now.getTime()) / 1000)),
  }
}

export async function hitRateLimit(params: {
  key: string
  limit: number
  windowMs: number
}): Promise<{ ok: boolean; retryAfterSec: number }> {
  const now = new Date()
  const row = await prisma.abuseWindow.findUnique({ where: { key: params.key } })

  if (!row || row.resetAt <= now) {
    await prisma.abuseWindow.upsert({
      where: { key: params.key },
      create: {
        key: params.key,
        count: 1,
        resetAt: new Date(now.getTime() + params.windowMs),
      },
      update: {
        count: 1,
        resetAt: new Date(now.getTime() + params.windowMs),
      },
    })
    return { ok: true, retryAfterSec: Math.ceil(params.windowMs / 1000) }
  }

  if (row.count >= params.limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((row.resetAt.getTime() - now.getTime()) / 1000)),
    }
  }

  await prisma.abuseWindow.update({
    where: { key: params.key },
    data: { count: { increment: 1 } },
  })
  return {
    ok: true,
    retryAfterSec: Math.max(1, Math.ceil((row.resetAt.getTime() - now.getTime()) / 1000)),
  }
}

export function clientIp(req: { headers: Headers }): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}
