import Link from 'next/link'
import { BrandWordmark } from '@/components/brand-mark'

export default function WebAccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand flex flex-col">
      <header className="border-b border-line bg-off-white/80 backdrop-blur-md">
        <div className="max-w-lg mx-auto px-5 h-16 flex items-center justify-between">
          <a href="https://bio-sense.ai" aria-label="BioSense home">
            <BrandWordmark height={26} priority />
          </a>
          <Link
            href="https://bio-sense.ai/pricing"
            className="text-caption font-medium text-sage-deep hover:text-sage transition-colors"
          >
            Pricing
          </Link>
        </div>
      </header>
      <main className="flex-1 w-full max-w-lg mx-auto px-5 py-10 sm:py-14">{children}</main>
      <footer className="px-5 py-8 text-center text-micro text-ink-3">
        Membership and billing only. Health intelligence lives in the BioSense app.
      </footer>
    </div>
  )
}
