'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import {
  Activity,
  Heart,
  Weight,
  Sprout,
  Watch,
  Plus,
  ArrowRight,
  ArrowLeft,
  Lock,
  Check,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { IconBadge } from '@/components/ui/icon-badge'
import { cn } from '@/lib/utils'

type GoalType = 'PERFORMANCE' | 'HEALTH' | 'BODY_COMP' | 'WELLBEING'

interface GoalOption {
  type: GoalType
  Icon: LucideIcon
  title: string
  desc: string
  tone: 'sage' | 'rose' | 'amber' | 'ink'
}

const goals: GoalOption[] = [
  { type: 'PERFORMANCE', Icon: Activity, title: 'Performance',      desc: 'Improve athletic performance and reach new levels.',   tone: 'sage'  },
  { type: 'HEALTH',      Icon: Heart,    title: 'Health',           desc: 'Build better health and reduce future health risks.',  tone: 'rose'  },
  { type: 'BODY_COMP',   Icon: Weight,   title: 'Body composition', desc: 'Improve body composition and physical appearance.',    tone: 'amber' },
  { type: 'WELLBEING',   Icon: Sprout,   title: 'General wellbeing',desc: 'Feel better day to day and improve overall wellbeing.',tone: 'ink'   },
]

const wearables = [
  { id: 'oura',    label: 'Oura Ring' },
  { id: 'whoop',   label: 'Whoop' },
  { id: 'garmin',  label: 'Garmin' },
  { id: 'samsung', label: 'Samsung Health' },
  { id: 'apple',   label: 'Apple Health' },
  { id: 'none',    label: 'None yet' },
]

const TOTAL_STEPS = 5

export default function OnboardingPage() {
  const router = useRouter()
  const { update } = useSession()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [goalType, setGoalType] = useState<GoalType | null>(null)
  const [goalText, setGoalText] = useState('')
  const [goalDeadline, setGoalDeadline] = useState('')
  const [allergies, setAllergies] = useState('')
  const [conditions, setConditions] = useState('')
  const [lifestyle, setLifestyle] = useState('')
  const [selectedWearables, setSelectedWearables] = useState<string[]>([])

  function toggleWearable(id: string) {
    setSelectedWearables((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    )
  }

  async function handleComplete() {
    setLoading(true)
    try {
      const res = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goalType,
          goalText,
          goalDeadline: goalDeadline || null,
          allergies: allergies.split(',').map((s) => s.trim()).filter(Boolean),
          conditions: conditions.split(',').map((s) => s.trim()).filter(Boolean),
          lifestyle,
          preferences: selectedWearables,
        }),
      })

      if (!res.ok) throw new Error()
      await update()
      toast.success('Welcome to BioSense.')
      router.push('/dashboard')
    } catch {
      toast.error('Failed to save your profile. Please try again.')
      setLoading(false)
    }
  }

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <div>
      {/* Progress strip */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-eyebrow uppercase text-sage-deep">
            Setup · Step {step} of {TOTAL_STEPS}
          </span>
          <span className="text-caption text-ink-3">{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1 rounded-pill bg-sand-deep overflow-hidden">
          <div
            className="h-full rounded-pill bg-sage transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* STEP 1 — Goal type */}
      {step === 1 && (
        <div className="fade-up">
          <h1 className="font-sans text-h1 text-ink mb-3 tracking-tight">
            Your{' '}
            <span className="italic-accent">Goals</span>
          </h1>
          <p className="text-body text-ink-2 mb-2 max-w-[58ch]">
            &ldquo;Your goals shape everything — from your insights to your next steps.&rdquo;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-sage text-white text-caption font-semibold flex items-center justify-center shrink-0">1</div>
              <div>
                <div className="text-h3 text-ink mb-0.5">Choose a goal type</div>
                <div className="text-body-sm text-ink-2 leading-snug">Select the area that matters most to you right now.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-sand-deep text-ink-2 text-caption font-semibold flex items-center justify-center shrink-0">2</div>
              <div>
                <div className="text-h3 text-ink mb-0.5">Make it your own</div>
                <div className="text-body-sm text-ink-2 leading-snug">Tell us what you&apos;re working towards so we can personalise everything.</div>
              </div>
            </div>
          </div>

          <div className="mt-10 p-5 sm:p-6 bg-white rounded-card border border-line">
            <div className="text-eyebrow uppercase text-ink-3 mb-4">Step 1: Choose a goal type</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {goals.map((g) => {
                const active = goalType === g.type
                return (
                  <button
                    key={g.type}
                    onClick={() => setGoalType(g.type)}
                    className={cn(
                      'text-left p-4 rounded-card border-2 transition-all duration-150 group',
                      active
                        ? 'border-sage bg-sage-wash'
                        : 'border-line bg-off-white hover:border-line-2 hover:bg-white',
                    )}
                  >
                    <IconBadge icon={g.Icon} tone={g.tone} size="lg" className="mb-3" />
                    <div className="text-body-sm font-semibold text-ink mb-1">{g.title}</div>
                    <div className="text-caption text-ink-2 leading-snug">{g.desc}</div>
                    <div className="mt-3 flex items-center justify-end">
                      <div
                        className={cn(
                          'w-5 h-5 rounded-full border flex items-center justify-center transition-colors',
                          active ? 'bg-sage border-sage' : 'border-line-2 bg-white',
                        )}
                      >
                        {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="mt-4 flex items-center gap-2 text-caption text-ink-2 bg-sand-deep/50 rounded-pill px-3 py-2">
              <Sparkles className="w-3.5 h-3.5 text-sage-deep" />
              You can change or update your goal anytime.
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              variant="primary"
              size="lg"
              disabled={!goalType}
              onClick={() => setStep(2)}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2 — Goal text + deadline */}
      {step === 2 && (
        <div className="fade-up">
          <h1 className="font-sans text-h1 text-ink mb-2 tracking-tight">
            Make it{' '}
            <span className="italic-accent">your own.</span>
          </h1>
          <p className="text-body text-ink-2 mb-8 max-w-[58ch]">
            The more specific you are, the better BioSense can personalise your insights and recommendations.
          </p>

          <div className="bg-white rounded-card border border-line p-5 sm:p-6 space-y-4">
            <Textarea
              label="What are you working towards?"
              rows={3}
              maxLength={100}
              hint={`${goalText.length} / 100`}
              placeholder={
                goalType === 'PERFORMANCE'
                  ? 'e.g. Triathlon in November'
                  : goalType === 'HEALTH'
                    ? 'e.g. Reduce my biological age by 5 years in 12 months'
                    : goalType === 'BODY_COMP'
                      ? 'e.g. Reduce body fat from 22% to 15% while keeping muscle'
                      : 'e.g. Sleep 8 hours a night and reduce my stress level'
              }
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
            />
            <Input
              label="Target date (optional)"
              type="date"
              value={goalDeadline}
              onChange={(e) => setGoalDeadline(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-3 mt-6">
            <Button variant="ghost" size="lg" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              disabled={goalText.length < 5}
              onClick={() => setStep(3)}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3 — Health context */}
      {step === 3 && (
        <div className="fade-up">
          <h1 className="font-sans text-h1 text-ink mb-2 tracking-tight">
            A little{' '}
            <span className="italic-accent">context.</span>
          </h1>
          <p className="text-body text-ink-2 mb-5 max-w-[58ch]">
            Optional. Helps BioSense personalise your insights and flag anything relevant.
          </p>

          <div className="flex items-center gap-2 rounded-pill px-3.5 py-2 mb-6 bg-sage-wash border border-accent-ring inline-flex">
            <Lock className="w-3.5 h-3.5 text-sage-deep" />
            <span className="text-caption text-sage-deep font-medium">Encrypted end-to-end · only you can see this</span>
          </div>

          <div className="bg-white rounded-card border border-line p-5 sm:p-6 space-y-4">
            <Input
              label="Dietary restrictions or allergies"
              placeholder="Gluten-free, lactose intolerant, nut allergy"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
            <Input
              label="Known conditions or family history"
              placeholder="Family history of diabetes, mild hypertension"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
            />
            <Input
              label="Lifestyle notes"
              placeholder="Works night shifts, travels frequently, vegan"
              value={lifestyle}
              onChange={(e) => setLifestyle(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-3 mt-6">
            <Button variant="ghost" size="lg" onClick={() => setStep(2)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button variant="primary" size="lg" onClick={() => setStep(4)}>
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4 — Wearable picker */}
      {step === 4 && (
        <div className="fade-up">
          <h1 className="font-sans text-h1 text-ink mb-2 tracking-tight">
            Which wearables{' '}
            <span className="italic-accent">do you use?</span>
          </h1>
          <p className="text-body text-ink-2 mb-8 max-w-[58ch]">
            Select all that apply. You can connect them properly from your dashboard later.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {wearables.map((w) => {
              const active = selectedWearables.includes(w.id)
              const Icon = w.id === 'none' ? Plus : Watch
              return (
                <button
                  key={w.id}
                  onClick={() => toggleWearable(w.id)}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-card border-2 text-left transition-all',
                    active
                      ? 'border-sage bg-sage-wash'
                      : 'border-line bg-white hover:border-line-2',
                  )}
                >
                  <IconBadge icon={Icon} tone={active ? 'sage' : 'sand'} size="md" />
                  <span className="text-body-sm font-medium text-ink">{w.label}</span>
                  {active && <Check className="w-4 h-4 text-sage-deep ml-auto" strokeWidth={3} />}
                </button>
              )
            })}
          </div>

          <div className="flex justify-between gap-3 mt-6">
            <Button variant="ghost" size="lg" onClick={() => setStep(3)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button variant="primary" size="lg" onClick={() => setStep(5)}>
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 5 — Ready */}
      {step === 5 && (
        <div className="fade-up text-center">
          <IconBadge icon={Sprout} size="xl" tone="sage" className="mx-auto mb-6" />
          <h1 className="font-sans text-h1 text-ink mb-3 tracking-tight">
            You&apos;re{' '}
            <span className="italic-accent">all set.</span>
          </h1>
          <p className="text-body text-ink-2 mb-8 leading-relaxed max-w-[440px] mx-auto">
            BioSense is calibrating your personal health baseline. Your dashboard is ready — start
            with a quick daily check-in to begin building your data.
          </p>

          <div className="bg-white rounded-card border border-line p-5 sm:p-6 mb-8 text-left max-w-[440px] mx-auto">
            <div className="text-eyebrow uppercase text-ink-3 mb-3">Next up</div>
            <div className="space-y-2.5">
              {[
                'Health score personalises as you add data',
                'Upload a blood test PDF at any time',
                'Connect your wearables from the dashboard',
                'Ask Anything — your AI health co-pilot is ready',
              ].map((t) => (
                <div key={t} className="flex items-start gap-2.5 text-body-sm text-ink-2">
                  <Check className="w-4 h-4 text-sage-deep mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button variant="ghost" size="lg" onClick={() => setStep(4)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              loading={loading}
              onClick={handleComplete}
            >
              Open my dashboard <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
