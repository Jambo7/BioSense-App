'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { ShieldCheck, Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconBadge } from '@/components/ui/icon-badge'

export default function ConsentPage() {
  const router = useRouter()
  const { update } = useSession()
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleAccept() {
    if (!accepted) {
      toast.error('Please tick the checkbox to continue')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/user/consent', { method: 'POST' })
      if (!res.ok) throw new Error()
      await update({ refresh: true })
      router.push('/onboarding')
    } catch {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[440px] w-full">
      <IconBadge icon={ShieldCheck} size="xl" tone="sage" className="mb-6" />

      <div className="text-eyebrow uppercase text-sage-deep mb-3">
        Before you continue
      </div>
      <h2 className="font-sans text-[28px] font-bold text-ink mb-6 leading-[1.1] tracking-tight">
        Important — please read.
      </h2>

      <div className="rounded-card p-5 mb-6 bg-sage-wash border border-accent-ring space-y-4">
        <p className="text-body text-ink font-semibold leading-relaxed">
          BioSense provides educational health insights only.
        </p>
        <p className="text-body-sm text-ink-2 leading-[1.7]">
          BioSense is not a medical service. The platform does not provide medical advice,
          diagnoses or treatment recommendations. All insights are AI-generated and intended for
          general educational and informational purposes only.
        </p>
        <p className="text-body-sm text-ink-2 leading-[1.7]">
          You must consult a qualified healthcare professional before making any changes to your
          health, medication or lifestyle based on anything you see in BioSense.
        </p>
      </div>

      <div className="space-y-2.5 mb-6">
        {[
          'Insights are AI-generated and may not always be accurate or complete',
          'BioSense does not replace your doctor or any clinical service',
          'You are responsible for how you interpret and act on information here',
          'If you experience symptoms, always seek professional medical advice',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2.5 text-body-sm text-ink-2">
            <Check className="w-4 h-4 text-sage-deep mt-0.5 shrink-0" strokeWidth={2.5} />
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
      </div>

      <label className="flex items-start gap-3 cursor-pointer mb-6 pt-5 border-t border-line">
        <button
          type="button"
          onClick={() => setAccepted(!accepted)}
          className={cn(
            'mt-0.5 w-[18px] h-[18px] rounded-[5px] flex-shrink-0 border flex items-center justify-center transition-all',
            accepted
              ? 'bg-sage border-sage'
              : 'bg-white border-line-2 hover:border-sage',
          )}
        >
          {accepted && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
        </button>
        <span className="text-body-sm text-ink leading-relaxed">
          I agree to the{' '}
          <a href="/consent-agreement" target="_blank" className="text-sage-deep underline font-medium">
            User Consent Agreement
          </a>
          . I understand that BioSense provides educational insights only and does not provide
          medical advice.
        </span>
      </label>

      <Button
        variant="primary"
        size="lg"
        loading={loading}
        disabled={!accepted}
        fullWidth
        onClick={handleAccept}
      >
        I understand — continue
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
