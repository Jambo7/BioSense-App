import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

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

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.hasConsented = (user as any).hasConsented
        token.onboardingDone = (user as any).onboardingDone
      }
      // Refresh from DB on update trigger
      if (trigger === 'update' && session) {
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
