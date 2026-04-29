import { BrandWordmark } from '@/components/brand-mark'

/**
 * (setup) group — wraps consent-dependent setup flows (onboarding).
 * No redirect logic here; redirects are handled by (app)/layout and root page.tsx.
 */
export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand">
      <header className="h-[60px] flex items-center px-6 sm:px-10 border-b border-line bg-sand/85 backdrop-blur-xl sticky top-0 z-40">
        <BrandWordmark size={26} textSize={16} tone="ink" />
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {children}
      </main>
    </div>
  )
}
