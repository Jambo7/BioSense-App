'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  Hand,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IconBadge, type IconBadgeTone } from '@/components/ui/icon-badge'
import { useTour } from '@/components/tour/tour-context'

const HIGHLIGHTS: { icon: LucideIcon; tone: IconBadgeTone; title: string; body: string }[] = [
  { icon: Watch, tone: 'sage', title: 'Wearables', body: 'Connect your devices to sync data automatically.' },
  { icon: Target, tone: 'violet', title: 'Goals', body: 'Give BioSense a destination to work towards.' },
  { icon: Sparkles, tone: 'violet', title: 'AI Learning Mode', body: 'A guided chat that personalises your insights.' },
  { icon: FlaskConical, tone: 'amber', title: 'Biomarker Guide', body: 'Understand what each blood marker means.' },
  { icon: Upload, tone: 'rose', title: 'Upload results', body: 'Add blood tests from any provider.' },
  { icon: Bell, tone: 'sky', title: 'Notifications', body: 'Alerts and nudges, all in one place.' },
  { icon: FileText, tone: 'teal', title: 'Reports', body: 'Weekly & monthly views of your progress.' },
  { icon: Share2, tone: 'sage', title: 'Discovery', body: 'Shareable cards for your breakthroughs.' },
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
    <div className="max-w-xl mx-auto fade-up">
      <div className="text-eyebrow uppercase text-sage-deep mb-4">Tutorial</div>

      <IconBadge icon={Hand} tone="sage" variant="gradient" size="xl" className="mb-5" />
      <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1] mb-3">
        Take the <span className="italic-accent">interactive tour</span>
      </h1>
      <p className="text-body text-ink-2 leading-relaxed mb-6">
        Rather than just reading about BioSense, let me walk you through it live. I&apos;ll
        highlight each part of the app, explain what it does, and let you tap along as we go —
        so by the end you&apos;ll know exactly where everything lives.
      </p>

      <div className="grid grid-cols-2 gap-2.5 mb-8">
        {HIGHLIGHTS.map((h) => (
          <div
            key={h.title}
            className="flex items-start gap-2.5 rounded-2xl bg-white/70 ring-1 ring-[rgba(168,191,163,0.30)] p-3"
          >
            <IconBadge icon={h.icon} tone={h.tone} variant="gradient" size="sm" />
            <div className="min-w-0">
              <div className="text-caption font-semibold text-ink leading-tight">{h.title}</div>
              <div className="text-micro text-ink-3 leading-snug mt-0.5">{h.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="primary" size="lg" fullWidth onClick={beginTour}>
          Start the walkthrough <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="lg" loading={loading} onClick={skip}>
          Skip for now
        </Button>
      </div>
    </div>
  )
}
