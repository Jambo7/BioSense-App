import { redirect } from 'next/navigation'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AppNav } from '@/components/app-nav'
import { TourProvider } from '@/components/tour/tour-context'
import { TourOverlay } from '@/components/tour/tour-overlay'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')
  if (!session.user.hasConsented) redirect('/consent')
  // Trust the JWT flag — a Prisma round-trip here made every tab switch wait
  // on Neon. Incomplete profiles are still caught at /onboarding write-time
  // and when session is refreshed after onboarding.
  if (!session.user.onboardingDone) redirect('/onboarding')

  return (
    <div className="min-h-screen relative bg-off-white">
      {/* Drifting sage + amber orbs (deepest layer). Hidden on coarse
          pointers — blur/filter animations are expensive in iOS WKWebView. */}
      <div className="ambient-bg ambient-bg-desktop" aria-hidden>
        <div className="orb" />
      </div>

      <div className="page-texture page-texture-waves" aria-hidden>
        <Image
          src="/bg-waves-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-[0.92]"
        />
        <div className="page-texture-fade-top" />
        <div className="page-texture-fade-bot" />
      </div>

      <TourProvider>
        <div className="relative z-10">
          <AppNav />
          {/* Extra bottom pad so content clears the tab bar + home indicator. */}
          <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-36 lg:pb-16 pt-5 sm:pt-8">
            {children}
          </main>

          <footer className="hidden lg:block fixed bottom-0 left-0 right-0 pointer-events-none z-10">
            <div className="max-w-5xl mx-auto px-4 pb-3 text-right">
              <span className="text-micro text-ink-3 glass px-2.5 py-1 rounded-pill">
                Educational insights only — not medical advice
              </span>
            </div>
          </footer>
        </div>

        <TourOverlay />
      </TourProvider>
    </div>
  )
}
