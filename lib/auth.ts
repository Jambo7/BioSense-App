import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { TSB, sessionMaxAgeSeconds } from './security-baseline'
import { hitRateLimit, isRateLimited } from './rate-limit'

const isDev = process.env.NODE_ENV !== 'production'
const DEV_USER_EMAIL = 'dev@biosense.local'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = credentials.email.toLowerCase()
        const failKey = `login-fail:${email}`
        const locked = await isRateLimited(failKey, TSB.loginFailuresBeforeFriction)
        if (locked.locked) return null

        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user || !user.password) {
          await hitRateLimit({
            key: failKey,
            limit: TSB.loginFailuresBeforeFriction,
            windowMs: TSB.loginFailureWindowMinutes * 60 * 1000,
          })
          return null
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          await hitRateLimit({
            key: failKey,
            limit: TSB.loginFailuresBeforeFriction,
            windowMs: TSB.loginFailureWindowMinutes * 60 * 1000,
          })
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          hasConsented: user.hasConsented,
          onboardingDone: user.onboardingDone,
        }
      },
    }),
    // Dev-only bypass: hard-disabled in production at the provider level.
    // Even if the client-side button somehow reached prod, this provider
    // wouldn't be registered, so signIn('dev-bypass') would fail.
    ...(isDev
      ? [
          CredentialsProvider({
            id: 'dev-bypass',
            name: 'Dev bypass',
            credentials: {},
            async authorize() {
              const user = await prisma.user.upsert({
                where: { email: DEV_USER_EMAIL },
                update: {},
                create: {
                  email: DEV_USER_EMAIL,
                  name: 'Dev User',
                  ageVerified: true,
                  hasConsented: true,
                  onboardingDone: true,
                },
              })
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                hasConsented: user.hasConsented,
                onboardingDone: user.onboardingDone,
              }
            },
          }),
        ]
      : []),
  ],
  session: {
    strategy: 'jwt',
    maxAge: sessionMaxAgeSeconds(),
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.hasConsented = (user as any).hasConsented
        token.onboardingDone = (user as any).onboardingDone
      }
      // Refresh from DB on any update trigger (e.g. after onboarding/consent),
      // regardless of whether a session payload was passed to update().
      if (trigger === 'update') {
        const dbUser = await prisma.user.findUnique({ where: { id: token.id as string } })
        if (dbUser) {
          token.hasConsented = dbUser.hasConsented
          token.onboardingDone = dbUser.onboardingDone
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.hasConsented = token.hasConsented as boolean
        session.user.onboardingDone = token.onboardingDone as boolean
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
