import { getServerSession } from 'next-auth'
import { decode } from 'next-auth/jwt'
import { authOptions } from './auth'

export interface RequestUser {
  id: string
  hasConsented: boolean
  onboardingDone: boolean
}

/**
 * Resolves the authenticated user for an API route from EITHER:
 *  1. An `Authorization: Bearer <token>` header (native mobile clients), or
 *  2. The NextAuth session cookie (the web app).
 *
 * The bearer token is a NextAuth JWT minted by /api/auth/mobile/login using the
 * same NEXTAUTH_SECRET, so web and mobile share one identity format. Returns
 * null when neither path yields a valid, unexpired user.
 */
export async function getRequestUser(req: Request): Promise<RequestUser | null> {
  const secret = process.env.NEXTAUTH_SECRET

  const authHeader = req.headers.get('authorization')
  if (secret && authHeader && /^bearer\s+/i.test(authHeader)) {
    const token = authHeader.replace(/^bearer\s+/i, '').trim()
    try {
      const decoded = await decode({ token, secret })
      const exp = typeof decoded?.exp === 'number' ? decoded.exp : Number(decoded?.exp)
      const notExpired = !Number.isFinite(exp) || exp * 1000 > Date.now()
      if (decoded?.id && notExpired) {
        return {
          id: String(decoded.id),
          hasConsented: Boolean(decoded.hasConsented),
          onboardingDone: Boolean(decoded.onboardingDone),
        }
      }
    } catch {
      // Invalid/garbled token — fall through to the cookie session below.
    }
  }

  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    return {
      id: session.user.id,
      hasConsented: session.user.hasConsented,
      onboardingDone: session.user.onboardingDone,
    }
  }

  return null
}
