import { BrandWordmark } from '@/components/brand-mark'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand flex flex-col lg:flex-row">

      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-gradient-to-br from-sand via-sand to-[#E5DFD0]">
        {/* Soft sage bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 20% 30%, rgba(168,191,163,0.30) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 80%, rgba(111,143,107,0.18) 0%, transparent 55%)',
          }}
        />
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(26,28,26,0.25) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 flex flex-col h-full p-12 xl:p-16">
          <BrandWordmark height={28} priority />

          {/* Hero copy */}
          <div className="mt-auto mb-auto max-w-[540px]">
            <div className="inline-flex items-center gap-2.5 mb-7">
              <div className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              <span className="text-eyebrow uppercase text-sage-deep">
                Longevity intelligence · Private beta
              </span>
            </div>

            <h1 className="font-sans text-display text-ink mb-6">
              Understand
              <br />
              your biology.
              <br />
              <span className="italic-accent">Live your best.</span>
            </h1>

            <p className="text-body text-ink-2 max-w-[42ch]">
              Personalised insights that help you sleep better, recover faster
              and perform at your best — built from your wearables, blood
              results and daily check-ins.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-line">
              {[
                { v: '5+',   l: 'Wearable integrations' },
                { v: '20+',  l: 'Biomarkers tracked' },
                { v: '100%', l: 'Personalised to you' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-sans text-h1 text-sage-deep leading-none tracking-tight">
                    {s.v}
                  </div>
                  <div className="text-caption text-ink-3 mt-2 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-6 border-t border-line">
            {['GDPR & DIFC compliant', 'UAE registered', 'Educational insights only', 'Cancel anytime'].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-caption text-ink-3">
                <span className="text-sage-deep font-bold">✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-[480px] flex flex-col justify-center p-6 sm:p-10 lg:p-12 relative bg-off-white lg:border-l border-line">
        {/* Mobile wordmark */}
        <div className="flex items-center justify-between mb-10 lg:hidden">
          <BrandWordmark height={26} priority />
        </div>

        {children}

        <p className="text-micro text-ink-3 mt-8 leading-relaxed max-w-[40ch]">
          BioSense provides educational health insights only. It does not provide medical advice,
          diagnosis or treatment. Always consult a qualified healthcare professional.
        </p>
      </div>
    </div>
  )
}
