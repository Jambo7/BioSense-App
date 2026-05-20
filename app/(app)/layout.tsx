import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AppNav } from '@/components/app-nav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')
  if (!session.user.hasConsented) redirect('/consent')

  return (
    <div className="min-h-screen relative bg-white">
      {/* Ambient drifting sage + amber orbs behind everything */}
      <div className="ambient-bg" aria-hidden>
        <div className="orb" />
      </div>

      <div className="relative z-10">
        <AppNav />
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
