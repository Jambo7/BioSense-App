import { timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const COOKIE = 'biosense_ops'

export function opsSecretConfigured(): boolean {
  return Boolean(process.env.OPS_SECRET)
}

export function opsSecretMatches(input: string): boolean {
  const expected = process.env.OPS_SECRET ?? ''
  if (!expected || !input) return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function isOpsAuthenticated(): Promise<boolean> {
  if (!opsSecretConfigured()) return false
  const jar = await cookies()
  return opsSecretMatches(jar.get(COOKIE)?.value ?? '')
}

export { COOKIE as OPS_COOKIE }
