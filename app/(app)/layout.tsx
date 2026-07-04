import { redirect } from 'next/navigation'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AppNav } from '@/components/app-nav'
import { TourProvider } from '@/components/tour/tour-context'
import { TourOverlay } from '@/components/tour/tour-overlay'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')
  if (!session.user.hasConsented) redirect('/consent')

  // Check if profile is actually complete (has required fields from onboarding).
  // This catches: 1) normal users who haven't done onboarding, 2) test/manual accounts
  // created with onboardingDone=true but no profile data.
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboardingDone: true, goals: true, dob: true, biologicalSex: true },
  })

  const profileIncomplete =
    !user?.onboardingDone ||
    !user.goals?.length ||
    !user.dob ||
    !user.biologicalSex

  if (profileIncomplete) redirect('/onboarding')

  return (
    <div className="min-h-screen relative bg-off-white">
      {/* Drifting sage + amber orbs (deepest layer). */}
      <div className="ambient-bg" aria-hidden>
        <div className="orb" />
      </div>

      {/* Background: soft flowing sage streamlines (per brief image2 —
          replaces the plant photo). See scripts/build-waves-bg.cjs. */}
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
          {/* pb-32 leaves room for the edge-to-edge tab bar + its overhanging
              Ask CTA on mobile. lg+ uses the top nav so no bottom padding. */}
          <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-32 lg:pb-16 pt-5 sm:pt-8">
            {children}
          </main>

          {/* Persistent legal footer (desktop) */}
          <footer className="hidden lg:block fixed bottom-0 left-0 right-0 pointer-events-none z-10">
            <div className="max-w-5xl mx-auto px-4 pb-3 text-right">
              <span className="text-micro text-ink-3 glass px-2.5 py-1 rounded-pill">
                Educational insights only — not medical advice
              </span>
            </div>
          </footer>
        </div>

        {/* Interactive walkthrough overlay (spotlights real controls). */}
        <TourOverlay />
      </TourProvider>
    </div>
  )
}
