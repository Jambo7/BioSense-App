import { redirect } from 'next/navigation'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AppNav } from '@/components/app-nav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')
  if (!session.user.hasConsented) redirect('/consent')

  return (
    <div className="min-h-screen relative bg-off-white">
      {/* Drifting sage + amber orbs (deepest layer). */}
      <div className="ambient-bg" aria-hidden>
        <div className="orb" />
      </div>

      {/* Photographic foundation. Per v7-polish, the texture is now anchored
          to the TOP-RIGHT (matches the brief where the olive branches and
          vase concentrate in the upper-right quadrant and naturally fade
          out across the rest of the screen). Opacity bumped slightly so
          the photo reads as a real surface peeking through, not a ghost.
          Top fade is now barely there so the texture bleeds naturally
          behind the (now-transparent) top bar — no hard horizontal line. */}
      <div className="page-texture" aria-hidden>
        <Image
          src="/dashboard-hero-leaves-v6.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_0%] opacity-[0.65]"
        />
        <div className="page-texture-fade-top" />
        <div className="page-texture-fade-bot" />
      </div>

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
    </div>
  )
}
