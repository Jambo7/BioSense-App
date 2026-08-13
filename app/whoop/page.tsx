import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  BatteryCharging,
  HeartPulse,
  Moon,
  Activity,
  Plug,
  ShieldCheck,
  LineChart,
  Lightbulb,
  Watch,
} from 'lucide-react'
import { BrandWordmark } from '@/components/brand-mark'

export const metadata: Metadata = {
  title: 'WHOOP integration — BioSense',
  description:
    'How BioSense connects WHOOP and surfaces recovery, sleep, strain and workout data inside the product.',
  robots: { index: false, follow: false },
}

function Phone({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <figure className="space-y-2">
      <div className="mx-auto w-full max-w-[340px] rounded-[28px] bg-ink p-[10px] shadow-float">
        <div className="rounded-[20px] bg-[#FAFAF8] overflow-hidden min-h-[420px]">
          {children}
        </div>
      </div>
      <figcaption className="text-center text-[12px] text-ink-3">{caption}</figcaption>
    </figure>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Moon
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-inset ring-[rgba(26,28,26,0.06)] px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-sage-deep font-semibold">
        <Icon className="w-3 h-3" strokeWidth={2.25} />
        {label}
      </div>
      <div className="mt-1 font-serif text-[22px] text-ink leading-none">{value}</div>
      {hint && <div className="mt-1 text-[11px] text-ink-3">{hint}</div>}
    </div>
  )
}

export default function WhoopUxPage() {
  return (
    <main className="min-h-screen bg-sand text-ink">
      <header className="border-b border-line bg-white/80">
        <div className="mx-auto max-w-3xl px-5 py-5 flex items-center justify-between gap-4">
          <BrandWordmark height={22} priority />
          <span className="text-[11px] uppercase tracking-wide text-ink-3">WHOOP API application</span>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-10 space-y-12">
        <section>
          <p className="text-eyebrow uppercase text-sage-deep">UX overview</p>
          <h1 className="mt-2 font-serif text-[32px] sm:text-[40px] leading-[1.1] tracking-tight">
            How BioSense integrates WHOOP
          </h1>
          <p className="mt-4 text-[15px] text-ink-2 leading-relaxed max-w-[58ch]">
            BioSense is a personal health intelligence app. Members connect wearables so recovery,
            sleep and strain sit alongside blood biomarkers and daily check-ins. WHOOP is a
            first-class source — not a generic dump of device data.
          </p>
          <p className="mt-3 text-[13px] text-ink-3">
            Screens below are product UI with example numbers, matching the live app at{' '}
            <Link href="https://bio-sense-app-navy.vercel.app" className="underline text-sage-deep">
              bio-sense-app-navy.vercel.app
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-sans text-[18px] font-semibold">1. Connect WHOOP</h2>
          <p className="text-[14px] text-ink-2 leading-relaxed">
            From <strong>Connections</strong>, the member taps Whoop. BioSense starts a secure OAuth
            flow through Terra. We never see WHOOP login credentials. Disconnect is one tap in-app,
            and access can also be revoked in WHOOP account settings.
          </p>
          <Phone caption="Connections — connect Whoop">
            <div className="px-4 pt-5 pb-6 space-y-3">
              <div className="text-[10px] uppercase tracking-wide text-sage-deep font-semibold">Connections</div>
              <h3 className="font-serif text-[22px] leading-tight">Link your devices</h3>
              <div className="rounded-2xl bg-white ring-1 ring-inset ring-[rgba(111,143,107,0.28)] p-3 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white ring-1 ring-inset ring-[rgba(26,28,26,0.06)]">
                  <Image src="/wearables/whoop.png" alt="WHOOP" fill className="object-contain p-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold">Whoop</div>
                  <div className="text-[12px] text-ink-3">Recovery, strain, sleep performance</div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(111,143,107,0.14)] text-sage-deep text-[11px] font-semibold px-2.5 h-7">
                  <Plug className="w-3 h-3" />
                  Connect
                </span>
              </div>
              <p className="text-[11px] text-ink-3 leading-snug">
                You&apos;ll be sent to WHOOP to approve sharing. BioSense only receives the metrics you
                allow.
              </p>
            </div>
          </Phone>
        </section>

        <section className="space-y-4">
          <h2 className="font-sans text-[18px] font-semibold">2. Home — recovery, sleep, strain</h2>
          <p className="text-[14px] text-ink-2 leading-relaxed">
            After sync, WHOOP recovery, sleep duration / performance, HRV and activity/strain feed
            the Home view. These tiles sit next to the long-term health score so daily physiology
            is visible without opening WHOOP.
          </p>
          <Phone caption="Home — WHOOP-backed daily physiology">
            <div className="px-4 pt-5 pb-6 space-y-3">
              <div className="text-[10px] uppercase tracking-wide text-sage-deep font-semibold">Good morning</div>
              <h3 className="font-serif text-[22px] leading-tight">You&apos;re trending in the right direction.</h3>
              <div className="grid grid-cols-2 gap-2">
                <Metric icon={BatteryCharging} label="Recovery" value="72%" hint="From WHOOP" />
                <Metric icon={Moon} label="Sleep" value="7.4h" hint="Last night" />
                <Metric icon={Activity} label="Strain" value="12.1" hint="Day load" />
                <Metric icon={HeartPulse} label="HRV" value="58 ms" hint="RMSSD" />
              </div>
            </div>
          </Phone>
        </section>

        <section className="space-y-4">
          <h2 className="font-sans text-[18px] font-semibold">3. Insights — what changed and why</h2>
          <p className="text-[14px] text-ink-2 leading-relaxed">
            Insights explain shifts in sleep and recovery in plain language. WHOOP is cited as the
            source. Copy is educational, not medical advice.
          </p>
          <Phone caption="Insights — WHOOP sleep / recovery in context">
            <div className="px-4 pt-5 pb-6 space-y-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-sage-deep font-semibold">
                <Lightbulb className="w-3 h-3" />
                Latest intelligence
              </div>
              <div className="rounded-2xl bg-white ring-1 ring-inset ring-[rgba(26,28,26,0.06)] p-3.5 space-y-2">
                <div className="text-[10px] font-semibold uppercase text-ink-3">What&apos;s changed</div>
                <p className="text-[14px] leading-snug">
                  Sleep averaged 6h 40m this week — a shift from your usual pattern. Recovery has
                  eased with it.
                </p>
                <div className="text-[11px] text-sage-deep">Source: WHOOP</div>
              </div>
              <div className="rounded-2xl bg-white ring-1 ring-inset ring-[rgba(26,28,26,0.06)] p-3.5 space-y-2">
                <div className="text-[10px] font-semibold uppercase text-ink-3">Today&apos;s readiness</div>
                <p className="text-[14px] leading-snug">Your body looks fairly ready today.</p>
              </div>
            </div>
          </Phone>
        </section>

        <section className="space-y-4">
          <h2 className="font-sans text-[18px] font-semibold">4. Trends — recovery over time</h2>
          <p className="text-[14px] text-ink-2 leading-relaxed">
            Trends charts recovery and sleep across weeks so members can see whether load and rest
            are moving together — the same signals WHOOP measures, inside BioSense&apos;s longer view.
          </p>
          <Phone caption="Trends — recovery and sleep over time">
            <div className="px-4 pt-5 pb-6 space-y-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-sage-deep font-semibold">
                <LineChart className="w-3 h-3" />
                Recovery
              </div>
              <div className="rounded-2xl bg-white ring-1 ring-inset ring-[rgba(26,28,26,0.06)] p-3.5">
                <div className="h-24 flex items-end gap-1.5">
                  {[42, 55, 48, 61, 70, 66, 72].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-[linear-gradient(180deg,#A8BFA3_0%,#6F8F6B_100%)]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-ink-3">
                  <span>7 days ago</span>
                  <span>Today</span>
                </div>
              </div>
            </div>
          </Phone>
        </section>

        <section className="rounded-3xl bg-white ring-1 ring-inset ring-line p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-sage-deep">
            <ShieldCheck className="w-4 h-4" strokeWidth={2.25} />
            <h2 className="font-sans text-[16px] font-semibold text-ink">Data use</h2>
          </div>
          <ul className="text-[14px] text-ink-2 space-y-2 leading-relaxed list-disc pl-5">
            <li>WHOOP data is used only to generate personal insights for that member.</li>
            <li>It is not used to train or fine-tune models.</li>
            <li>Connection is user-initiated OAuth. Credentials are never stored by BioSense.</li>
            <li>
              Members can disconnect in BioSense or revoke access in WHOOP. Privacy policy:{' '}
              <Link href="/privacy" className="underline text-sage-deep">
                /privacy
              </Link>
              .
            </li>
          </ul>
          <p className="text-[13px] text-ink-3 pt-1 flex items-start gap-2">
            <Watch className="w-4 h-4 mt-0.5 shrink-0" />
            Live product: Connections, Home, Insights and Trends already render WHOOP-backed
            recovery, sleep and strain once a member connects.
          </p>
        </section>
      </article>
    </main>
  )
}
