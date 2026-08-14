import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { BrandWordmark } from '@/components/brand-mark'
import { WhoopScreens } from './screens'

export const metadata: Metadata = {
  title: 'WHOOP integration — BioSense',
  description:
    'Production BioSense UI showing how WHOOP is connected and how recovery, sleep and strain appear in Home and Insights.',
  robots: { index: false, follow: false },
}

export default function WhoopUxPage() {
  return (
    <main className="relative z-10 min-h-screen bg-[#E8E2D6] text-[#1A1C1A]">
      <header className="border-b border-[rgba(26,28,26,0.08)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-5 flex items-center justify-between gap-4">
          <BrandWordmark height={22} priority />
          <span className="text-[11px] uppercase tracking-wide text-[#8A8C8A]">WHOOP API application</span>
        </div>
      </header>

      <article className="mx-auto max-w-6xl px-5 py-10 space-y-8">
        <section className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5A7556]">Product UI</p>
          <h1 className="mt-2 font-serif text-[32px] sm:text-[40px] leading-[1.1] tracking-tight text-[#1A1C1A]">
            BioSense × WHOOP
          </h1>
          <p className="mt-4 text-[15px] text-[#5A5C5A] leading-relaxed">
            These are the live BioSense screens — same layout, type, and components as production.
            Example values are shown so reviewers can see where WHOOP recovery, sleep and strain land
            after a member taps Connect.
          </p>
        </section>

        <WhoopScreens />

        <section className="rounded-3xl bg-white ring-1 ring-inset ring-line p-5 sm:p-6 space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sage-deep" />
            <h2 className="font-sans text-[16px] font-semibold">How the connection works</h2>
          </div>
          <ul className="text-[14px] text-ink-2 space-y-2 leading-relaxed list-disc pl-5">
            <li>Member opens Connections and taps Connect on Whoop.</li>
            <li>Secure OAuth via Terra. BioSense never receives WHOOP passwords.</li>
            <li>Recovery, sleep, strain/activity and HRV appear on Home and Insights.</li>
            <li>Used only for that member&apos;s insights — not to train models.</li>
            <li>
              Disconnect in-app or revoke in WHOOP.{' '}
              <Link href="/privacy" className="underline text-sage-deep">
                Privacy policy
              </Link>
              .
            </li>
          </ul>
        </section>
      </article>
    </main>
  )
}
