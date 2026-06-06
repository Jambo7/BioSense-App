'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Watch,
  Target,
  Sparkles,
  FlaskConical,
  Upload,
  Bell,
  FileText,
  Share2,
  ArrowRight,
  ArrowLeft,
  X,
  Heart,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IconBadge, type IconBadgeTone } from '@/components/ui/icon-badge'
import { cn } from '@/lib/utils'

const STEPS: { icon: LucideIcon; tone: IconBadgeTone; title: string; body: string }[] = [
  {
    icon: Watch,
    tone: 'sage',
    title: 'Wearables & Device Connections',
    body: 'Connect your favourite wearables and health devices by clicking the Wearables button at the top of the app. Connecting your devices enables automatic synchronisation of key health data into BioSense. A full list of supported wearables, health devices and integrations can be viewed within the Wearables section.',
  },
  {
    icon: Target,
    tone: 'violet',
    title: 'Goal Setting',
    body: 'Found within the Trends section of the app, Goal Setting gives BioSense a destination to work towards by setting goals that matter most to you. Whether your objective is weight loss, improved fitness, better sleep, longevity, preparing for an event or simply feeling healthier, setting goals helps BioSense personalise your insights, recommendations and progress tracking around your unique health journey.',
  },
  {
    icon: Sparkles,
    tone: 'violet',
    title: 'AI Learning Mode',
    body: 'Access AI Learning Mode by clicking the AI button at the bottom of the app. Learning Mode is a guided conversation designed to help BioSense better understand your lifestyle, routines, habits, health history and personal objectives. The more BioSense learns about you, the more personalised, relevant and actionable your insights become over time.',
  },
  {
    icon: FlaskConical,
    tone: 'amber',
    title: 'Biomarker Guide',
    body: "The Biomarker Guide can be found within the Biomarkers section of the app. It is designed to help you explore and understand a wide range of biomarkers that you may wish to discuss with your doctor, medical provider or wellness centre when arranging blood testing. For each biomarker, you'll learn what it measures, why it matters, potential health implications and how it may relate to your overall wellbeing.",
  },
  {
    icon: Upload,
    tone: 'rose',
    title: 'Upload Blood Test Results',
    body: 'The Upload Blood Test Results feature can be found within the Biomarkers section of the app. Simply upload any blood test results and BioSense will help analyse your biomarkers, explain what they mean, track changes over time and identify important trends. BioSense is designed to work with blood test results from any provider.',
  },
  {
    icon: Bell,
    tone: 'sky',
    title: 'Notifications',
    body: 'Your Notifications can be accessed by clicking the notification icon at the top of the app. Any push notifications sent by BioSense will appear within your Notifications Centre. Simply click on a notification to be taken directly to the relevant section of the app.',
  },
  {
    icon: FileText,
    tone: 'teal',
    title: 'Weekly & Monthly Reports',
    body: 'Your Weekly and Monthly Reports can be found within the Trends section of the app. These reports bring together data from across BioSense to provide a broader view of your health. As BioSense learns more about you, your reports become increasingly personalised and relevant to your unique health profile.',
  },
  {
    icon: Share2,
    tone: 'sage',
    title: 'BioSense Discovery',
    body: 'Your weekly BioSense Discovery can be found within the Trends section of the app. Great discoveries are worth sharing. Celebrate important improvements, breakthrough moments and personalised BioSense Discoveries with friends and family through beautifully designed shareable cards.',
  },
]

const TOTAL = STEPS.length + 1

export default function TutorialPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  async function finish() {
    setLoading(true)
    try {
      await fetch('/api/user/tutorial', { method: 'POST' })
    } catch {
      /* non-fatal */
    } finally {
      router.push('/dashboard')
    }
  }

  const isFinal = step === STEPS.length

  return (
    <div className="max-w-xl mx-auto fade-up">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="text-eyebrow uppercase text-sage-deep">Tutorial</div>
        <Link
          href="/dashboard"
          className="w-8 h-8 rounded-full flex items-center justify-center text-ink-3 hover:bg-[rgba(26,28,26,0.04)]"
          aria-label="Close tutorial"
        >
          <X className="w-4 h-4" strokeWidth={2.25} />
        </Link>
      </div>

      <div className="flex gap-1 mb-8">
        {Array.from({ length: TOTAL }, (_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-pill transition-all',
              i <= step ? 'bg-sage' : 'bg-sand-deep',
            )}
          />
        ))}
      </div>

      {!isFinal ? (
        <div>
          <IconBadge icon={STEPS[step].icon} tone={STEPS[step].tone} variant="gradient" size="xl" className="mb-5" />
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1] mb-3">
            {STEPS[step].title}
          </h1>
          <p className="text-body text-ink-2 leading-relaxed">{STEPS[step].body}</p>

          <div className="flex justify-between gap-3 mt-10">
            <Button variant="ghost" size="lg" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button variant="primary" size="lg" onClick={() => setStep((s) => s + 1)}>
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <IconBadge icon={Heart} size="xl" tone="sage" variant="gradient" className="mx-auto mb-5" />
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1] mb-3">
            Your Journey <span className="italic-accent">Starts Here</span>
          </h1>
          <p className="text-body text-ink-2 leading-relaxed mb-4">
            Every health journey is unique. Whether your goal is to improve performance, increase energy,
            optimise longevity, lose weight or simply gain a better understanding of your body, BioSense
            is designed to help you make more informed decisions along the way.
          </p>
          <p className="text-body-sm text-ink-2 leading-relaxed mb-8">
            Connect your devices, set your goals, engage with Learning Mode, upload blood results and
            continue exploring your insights to unlock the full potential of your health data.
            Your next discovery could be the one that changes everything.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="ghost" size="lg" onClick={() => setStep(STEPS.length - 1)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button variant="primary" size="lg" loading={loading} onClick={finish}>
              Go to dashboard <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
