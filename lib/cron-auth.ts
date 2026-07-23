import type { NextRequest } from 'next/server'

/**
 * Auth for scheduled jobs. Accepts:
 *  - Vercel Cron user-agent (Hobby/Pro platform invocations)
 *  - x-cron-secret / Bearer CRON_SECRET (external schedulers)
 */
export function isCronAuthorized(req: NextRequest): boolean {
  const userAgent = req.headers.get('user-agent') ?? ''
  if (userAgent.startsWith('vercel-cron/')) return true

  const secret = process.env.CRON_SECRET
  if (!secret) return false
  if (req.headers.get('x-cron-secret') === secret) return true
  if (req.headers.get('authorization') === `Bearer ${secret}`) return true
  return false
}
