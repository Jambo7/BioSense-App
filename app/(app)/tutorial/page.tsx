'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sun,
  Watch,
  Target,
  FlaskConical,
  Lightbulb,
  TrendingUp,
  Camera,
  User,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IconBadge, type IconBadgeTone } from '@/components/ui/icon-badge'
import { BiosenseS } from '@/components/brand-mark'
import { useTour } from '@/components/tour/tour-context'

const HIGHLIGHTS: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  tone: IconBadgeTone
  title: string
  body: string
}[] = [
  { icon: Sun,          tone: 'amber',  title: 'Home',            body: 'Your health intelligence at a glance' },
  { icon: Watch,        tone: 'sage',   title: 'Connections',      body: 'Link wearables and health data to sync automatically' },
  { icon: Camera,      tone: 'amber',  title: 'Meal Scanner',     body: 'Photograph a meal for a calorie and macro estimate' },
  { icon: Target,      tone: 'sky',    title: 'Goals',           body: 'Give BioSense a destination to work towards' },
  { icon: BiosenseS,   tone: 'violet', title: 'BioSense AI',     body: 'Answer questions and help BioSense learn' },
  { icon: FlaskConical, tone: 'amber',  title: 'Biomarkers',      body: 'Upload, understand and track your blood results' },
  { icon: Lightbulb,    tone: 'teal',   title: 'Insights',         body: 'Patterns, predictions and new discoveries' },
  { icon: TrendingUp,   tone: 'rose',   title: 'Trends & Reports', body: 'Track progress over time with tailored reports' },
  { icon: User,         tone: 'ink',    title: 'Your account',    body: 'Privacy, profile and settings, under Updates' },
]

export default function TutorialPage() {
  const router = useRouter()
  const { start } = useTour()
  const [loading, setLoading] = useState(false)

  function beginTour() {
    start()
    router.push('/dashboard')
  }

  async function skip() {
    setLoading(true)
    try {
      await fetch('/api/user/tutorial', { method: 'POST' })
    } catch {
      /* non-fatal */
    } finally {
      router.push('/dashboard')
    }
  }

  return (
    <div className="max-w-xl mx-auto fade-up pb-8">
      <div className="text-eyebrow uppercase text-sage-deep mb-2">Tutorial</div>
      <h1 className="font-sans text-[28px] sm:text-[34px] font-bold text-ink tracking-tight leading-[1.06]">
        Take the <span className="italic-accent text-sage-deep font-normal">interactive tour</span>
      </h1>
      <p className="text-[14px] text-ink-2 leading-relaxed mt-2 mb-6 max-w-[52ch]">
        See how BioSense turns your data into personalised health intelligence. We&apos;ll walk you
        through the key parts of the app and show you how they work together.
      </p>

      <div className="grid grid-cols-2 gap-2.5 mb-8">
        {HIGHLIGHTS.map((h) => (
          <div key={h.title} className="flex items-start gap-2.5 rounded-[18px] tile p-3">
            <IconBadge icon={h.icon} tone={h.tone} variant="tint" size="sm" />
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-ink leading-tight">{h.title}</div>
              <div className="text-[11.5px] text-ink-2 leading-snug mt-0.5">{h.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="primary" size="lg" fullWidth onClick={beginTour}>
          Start Tour <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="lg" loading={loading} onClick={skip}>
          Skip for now
        </Button>
      </div>
    </div>
  )
}
