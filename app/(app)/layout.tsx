import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AppNav } from '@/components/app-nav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')
  if (!session.user.hasConsented) redirect('/consent')
  // onboardingDone redirect lives in root page.tsx only — (setup)/onboarding
  // is outside this layout, so we never create a redirect loop here.

  return (
    <div className="min-h-screen bg-sand">
      <AppNav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-28 lg:pb-16 pt-5 sm:pt-8">
        {children}
      </main>

      {/* Persistent legal footer */}
      <footer className="hidden lg:block fixed bottom-0 left-0 right-0 pointer-events-none z-10">
        <div className="max-w-5xl mx-auto px-4 pb-3 text-right">
          <span className="text-micro text-ink-3 bg-sand/90 px-2 py-0.5 rounded-pill">
            Educational insights only — not medical advice
          </span>
        </div>
      </footer>
    </div>
  )
}
