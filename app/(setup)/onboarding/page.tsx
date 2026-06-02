'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import {
  Zap,
  Moon,
  Activity,
  HeartPulse,
  Scale,
  Dumbbell,
  Wind,
  Target,
  Apple,
  ShieldCheck,
  User,
  LineChart,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  CheckCircle2,
  Watch,
  FlaskConical,
  BarChart3,
  Heart,
  Lock,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IconBadge, type IconBadgeTone } from '@/components/ui/icon-badge'
import { cn } from '@/lib/utils'
import { GOAL_OPTIONS } from '@/lib/registration'

type Sex = 'MALE' | 'FEMALE' | 'UNDISCLOSED'
type Activity = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH'
type Sleep = 'GREAT' | 'OKAY' | 'POOR'
type Energy = 'HIGH' | 'VARIABLE' | 'LOW'

const GOAL_META: Record<string, { Icon: LucideIcon; tone: IconBadgeTone }> = {
  more_energy:      { Icon: Zap,        tone: 'amber'  },
  better_sleep:     { Icon: Moon,       tone: 'violet' },
  improve_fitness:  { Icon: Activity,   tone: 'sky'    },
  improve_recovery: { Icon: HeartPulse, tone: 'rose'   },
  weight_loss:      { Icon: Scale,      tone: 'teal'   },
  muscle_gain:      { Icon: Dumbbell,   tone: 'ink'    },
  reduce_stress:    { Icon: Wind,       tone: 'teal'   },
  better_focus:     { Icon: Target,     tone: 'sky'    },
  improve_nutrition:{ Icon: Apple,      tone: 'sage'   },
  longterm_health:  { Icon: ShieldCheck,tone: 'sage'   },
  understand_body:  { Icon: User,       tone: 'violet' },
  track_biomarkers: { Icon: LineChart,  tone: 'rose'   },
}

interface Choice<T extends string> {
  value: T
  title: string
  desc: string
  Icon: LucideIcon
}

const ACTIVITY_CHOICES: Choice<Activity>[] = [
  { value: 'LOW',       title: 'Low',       desc: 'Little to no exercise',        Icon: Wind     },
  { value: 'MODERATE',  title: 'Moderate',  desc: '1–3 days of exercise per week', Icon: Activity },
  { value: 'HIGH',      title: 'High',      desc: '4–6 days of exercise per week', Icon: Dumbbell },
  { value: 'VERY_HIGH', title: 'Very high', desc: 'Daily intense training',        Icon: Zap      },
]

const SLEEP_CHOICES: Choice<Sleep>[] = [
  { value: 'GREAT', title: 'Great', desc: 'I sleep well and wake up refreshed',          Icon: Sparkles },
  { value: 'OKAY',  title: 'Okay',  desc: "It's inconsistent",                           Icon: Moon     },
  { value: 'POOR',  title: 'Poor',  desc: 'I often struggle to fall or stay asleep',     Icon: Wind     },
]

const ENERGY_CHOICES: Choice<Energy>[] = [
  { value: 'HIGH',     title: 'High',     desc: 'I feel energised and ready to go',         Icon: Zap          },
  { value: 'VARIABLE', title: 'Variable', desc: 'My energy fluctuates throughout the day',  Icon: TrendingUp   },
  { value: 'LOW',      title: 'Low',      desc: 'I often feel tired or drained',            Icon: Moon         },
]

const FEATURE_CARDS: { Icon: LucideIcon; tone: IconBadgeTone; title: string; body: string }[] = [
  { Icon: Sparkles,   tone: 'violet', title: 'Learning Mode',        body: 'Help BioSense understand your lifestyle, routines and goals so your insights become more personalised over time.' },
  { Icon: CheckCircle2,tone: 'sky',   title: 'Daily Check-ins',      body: 'Quickly log how you feel each day to help BioSense understand what your wearable data can’t always see.' },
  { Icon: Watch,      tone: 'sage',   title: 'Connect your wearables', body: 'Sync your wearable data to unlock automatic insights around sleep, recovery, stress and activity.' },
  { Icon: FlaskConical,tone: 'amber', title: 'Upload blood results', body: 'Add blood test results anytime to unlock deeper biomarker analysis and long-term health tracking.' },
  { Icon: BarChart3,  tone: 'rose',   title: 'Reports & insights',   body: 'Receive personalised insights, trends and reports based on your data, habits and goals.' },
]

const TOTAL_STEPS = 9

export default function OnboardingPage() {
  const router = useRouter()
  const { update } = useSession()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [goals, setGoals] = useState<string[]>([])
  const [dob, setDob] = useState('')
  const [sex, setSex] = useState<Sex | null>(null)
  const [activity, setActivity] = useState<Activity | null>(null)
  const [sleep, setSleep] = useState<Sleep | null>(null)
  const [energy, setEnergy] = useState<Energy | null>(null)
  const [stress, setStress] = useState<number | null>(null)
  const [notes, setNotes] = useState('')

  function toggleGoal(id: string) {
    setGoals((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]))
  }

  function next() {
    setStep((s) => Math.min(TOTAL_STEPS, s + 1))
  }
  function back() {
    setStep((s) => Math.max(1, s - 1))
  }

  async function handleComplete() {
    setLoading(true)
    try {
      const res = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goals,
          dob: dob || null,
          biologicalSex: sex,
          activityLevel: activity,
          sleepQuality: sleep,
          energyLevel: energy,
          baselineStress: stress,
          registrationNotes: notes.trim() || null,
        }),
      })
      if (!res.ok) throw new Error()
      await update()
      toast.success('Welcome to BioSense.')
      router.push('/dashboard')
      router.refresh()
    } catch {
      toast.error('Failed to save your profile. Please try again.')
      setLoading(false)
    }
  }

  // Per-step gate for the Continue button.
  const canContinue =
    (step === 1 && goals.length > 0) ||
    (step === 2 && !!dob && !!sex) ||
    (step === 3 && !!activity) ||
    (step === 4 && !!sleep) ||
    (step === 5 && !!energy) ||
    (step === 6 && stress !== null) ||
    step === 7 ||
    step === 8

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <div>
      {/* Progress strip */}
      <div className="mb-9">
        <div className="flex justify-between items-center mb-3">
          <span className="text-eyebrow uppercase text-sage-deep">
            Setup · Step {step} of {TOTAL_STEPS}
          </span>
          <span className="text-caption text-ink-3">{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 rounded-pill bg-sand-deep overflow-hidden">
          <div
            className="h-full rounded-pill bg-grad-sage transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* STEP 1 — Goals */}
      {step === 1 && (
        <div className="fade-up">
          <StepHead
            eyebrow="Your goals"
            title={<>What are you <span className="italic-accent">hoping to improve?</span></>}
            sub="Your goals help BioSense personalise your experience from day one. Select all that apply."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-7">
            {GOAL_OPTIONS.map((g) => {
              const meta = GOAL_META[g.id]
              const active = goals.includes(g.id)
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => toggleGoal(g.id)}
                  className={cn(
                    'relative flex flex-col items-start gap-2 p-3.5 rounded-card text-left transition-all duration-150',
                    active
                      ? 'tile-sage ring-2 ring-[rgba(111,143,107,0.55)] -translate-y-px'
                      : 'tile tile-hover',
                  )}
                >
                  <IconBadge icon={meta.Icon} tone={meta.tone} variant="gradient" size="md" />
                  <span className="text-body-sm font-semibold text-ink leading-tight">{g.label}</span>
                  {active && (
                    <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-grad-sage flex items-center justify-center shadow-button">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          <NavRow onBack={null} onNext={next} disabled={!canContinue} />
        </div>
      )}

      {/* STEP 2 — Basic info */}
      {step === 2 && (
        <div className="fade-up">
          <StepHead
            eyebrow="Basic information"
            title={<>Tell us a bit <span className="italic-accent">about yourself.</span></>}
            sub="This helps us personalise your experience. Your data is private and secure."
          />
          <div className="tile rounded-card p-5 sm:p-6 mt-7 space-y-6">
            <div>
              <label htmlFor="dob" className="block text-eyebrow uppercase text-ink-3 mb-2">
                Date of birth
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 h-11 bg-white border border-line rounded-[10px] text-ink text-[14px] outline-none transition-all hover:border-line-2 focus:border-[var(--a-ring)] focus:ring-2 focus:ring-[rgba(111,143,107,0.10)]"
              />
            </div>
            <div>
              <span className="block text-eyebrow uppercase text-ink-3 mb-2">Biological sex</span>
              <div className="grid grid-cols-3 gap-2.5">
                {([
                  { value: 'MALE', label: 'Male' },
                  { value: 'FEMALE', label: 'Female' },
                  { value: 'UNDISCLOSED', label: 'Prefer not to say' },
                ] as { value: Sex; label: string }[]).map((o) => {
                  const active = sex === o.value
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setSex(o.value)}
                      className={cn(
                        'h-12 px-3 rounded-card text-[13px] font-medium transition-all',
                        active
                          ? 'tile-sage ring-2 ring-[rgba(111,143,107,0.55)] text-ink'
                          : 'tile tile-hover text-ink-2',
                      )}
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <NavRow onBack={back} onNext={next} disabled={!canContinue} />
        </div>
      )}

      {/* STEP 3 — Activity level */}
      {step === 3 && (
        <ChoiceStep
          eyebrow="Baseline · activity"
          title={<>How would you describe your <span className="italic-accent">activity level?</span></>}
          sub="This helps us calibrate your insights."
          choices={ACTIVITY_CHOICES}
          selected={activity}
          onSelect={setActivity}
          onBack={back}
          onNext={next}
        />
      )}

      {/* STEP 4 — Sleep quality */}
      {step === 4 && (
        <ChoiceStep
          eyebrow="Baseline · sleep"
          title={<>How would you rate your <span className="italic-accent">sleep quality?</span></>}
          sub="On most nights."
          choices={SLEEP_CHOICES}
          selected={sleep}
          onSelect={setSleep}
          onBack={back}
          onNext={next}
        />
      )}

      {/* STEP 5 — Energy levels */}
      {step === 5 && (
        <ChoiceStep
          eyebrow="Baseline · energy"
          title={<>How are your <span className="italic-accent">energy levels</span> on most days?</>}
          sub="Pick the one that fits best."
          choices={ENERGY_CHOICES}
          selected={energy}
          onSelect={setEnergy}
          onBack={back}
          onNext={next}
        />
      )}

      {/* STEP 6 — Stress slider */}
      {step === 6 && (
        <div className="fade-up">
          <StepHead
            eyebrow="Baseline · stress"
            title={<>How would you rate your <span className="italic-accent">stress</span> on average?</>}
            sub="On a scale of 1–10. This helps us understand what impacts you most."
          />
          <div className="tile rounded-card p-5 sm:p-6 mt-7">
            <div className="flex justify-between text-caption text-ink-3 mb-3">
              <span>Low stress</span>
              <span>High stress</span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
                const active = stress === n
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setStress(n)}
                    className={cn(
                      'h-11 rounded-card text-[14px] font-semibold transition-all',
                      active
                        ? 'bg-grad-sage text-white shadow-button -translate-y-px'
                        : 'tile tile-hover text-ink-2',
                    )}
                  >
                    {n}
                  </button>
                )
              })}
            </div>
          </div>
          <NavRow onBack={back} onNext={next} disabled={!canContinue} />
        </div>
      )}

      {/* STEP 7 — Optional notes */}
      {step === 7 && (
        <div className="fade-up">
          <StepHead
            eyebrow="Almost there"
            title={<>Anything else you&apos;d like <span className="italic-accent">us to know?</span></>}
            sub="Optional — you can update this anytime."
          />
          <div className="tile rounded-card p-5 sm:p-6 mt-7">
            <textarea
              rows={5}
              maxLength={250}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share anything that feels important about your health, lifestyle or current challenges."
              className="w-full px-4 py-3 bg-white border border-line rounded-[10px] text-ink text-[14px] placeholder:text-ink-4 outline-none transition-all resize-y min-h-[120px] hover:border-line-2 focus:border-[var(--a-ring)] focus:ring-2 focus:ring-[rgba(111,143,107,0.10)]"
            />
            <div className="text-right text-caption text-ink-3 mt-1.5">{notes.length} / 250</div>
          </div>
          <NavRow onBack={back} onNext={next} disabled={false} nextLabel="Continue" />
        </div>
      )}

      {/* STEP 8 — Why we ask */}
      {step === 8 && (
        <div className="fade-up">
          <StepHead
            eyebrow="Why we ask"
            title={<>Why we ask <span className="italic-accent">these questions.</span></>}
            sub="A quick word on what happens with what you share."
          />
          <div className="space-y-3 mt-7">
            {[
              { Icon: Sparkles, tone: 'violet' as const, title: 'Personalised insights', body: 'We tailor everything — your Health Score, insights and guidance — to you.' },
              { Icon: TrendingUp, tone: 'sage' as const, title: 'Smarter over time', body: 'The better we learn, the more helpful BioSense becomes for you.' },
              { Icon: Lock, tone: 'teal' as const, title: 'Your privacy matters', body: 'Your data is private, secure and never sold or shared.' },
            ].map((r) => (
              <div key={r.title} className="tile rounded-card p-4 flex items-start gap-3.5">
                <IconBadge icon={r.Icon} tone={r.tone} variant="gradient" size="md" />
                <div>
                  <div className="text-body-sm font-semibold text-ink">{r.title}</div>
                  <p className="text-caption text-ink-2 leading-snug mt-0.5">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
          <NavRow onBack={back} onNext={next} disabled={false} nextLabel="Complete setup" />
        </div>
      )}

      {/* STEP 9 — All set */}
      {step === 9 && (
        <div className="fade-up text-center">
          <IconBadge icon={CheckCircle2} size="xl" tone="sage" variant="gradient" className="mx-auto mb-6" />
          <h1 className="font-sans text-h1 text-ink mb-3 tracking-tight">
            You&apos;re all set, let&apos;s get the most out of{' '}
            <span className="italic-accent">BioSense.</span>
          </h1>
          <p className="text-body text-ink-2 mb-8 leading-relaxed max-w-[460px] mx-auto">
            Here&apos;s what we recommend you do next to unlock the full power of BioSense.
          </p>

          <div className="space-y-2.5 text-left max-w-[460px] mx-auto">
            {FEATURE_CARDS.map((c) => (
              <div key={c.title} className="tile tile-hover rounded-card p-4 flex items-start gap-3.5">
                <IconBadge icon={c.Icon} tone={c.tone} variant="gradient" size="md" />
                <div>
                  <div className="text-body-sm font-semibold text-ink">{c.title}</div>
                  <p className="text-caption text-ink-2 leading-snug mt-0.5">{c.body}</p>
                </div>
              </div>
            ))}
            <div className="tile-sage rounded-card p-4 flex items-center gap-3.5">
              <IconBadge icon={Heart} tone="rose" variant="gradient" size="md" />
              <p className="text-body-sm text-ink leading-snug">
                The more BioSense understands you, the{' '}
                <span className="font-semibold text-sage-deep">more valuable it becomes.</span>
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <Button variant="ghost" size="lg" onClick={back}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button variant="primary" size="lg" loading={loading} onClick={handleComplete}>
              Go to my dashboard <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Reusable bits ──────────────────────────────────────────────────────────

function StepHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: React.ReactNode
  sub: string
}) {
  return (
    <div>
      <div className="text-eyebrow uppercase text-sage-deep mb-2">{eyebrow}</div>
      <h1 className="font-sans text-h1 text-ink mb-2 tracking-tight leading-[1.1]">{title}</h1>
      <p className="text-body text-ink-2 max-w-[56ch] leading-relaxed">{sub}</p>
    </div>
  )
}

function NavRow({
  onBack,
  onNext,
  disabled,
  nextLabel = 'Continue',
}: {
  onBack: (() => void) | null
  onNext: () => void
  disabled: boolean
  nextLabel?: string
}) {
  return (
    <div className={cn('flex gap-3 mt-7', onBack ? 'justify-between' : 'justify-end')}>
      {onBack && (
        <Button variant="ghost" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      )}
      <Button variant="primary" size="lg" disabled={disabled} onClick={onNext}>
        {nextLabel} <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  )
}

function ChoiceStep<T extends string>({
  eyebrow,
  title,
  sub,
  choices,
  selected,
  onSelect,
  onBack,
  onNext,
}: {
  eyebrow: string
  title: React.ReactNode
  sub: string
  choices: Choice<T>[]
  selected: T | null
  onSelect: (v: T) => void
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="fade-up">
      <StepHead eyebrow={eyebrow} title={title} sub={sub} />
      <div className="space-y-2.5 mt-7">
        {choices.map((c) => {
          const active = selected === c.value
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => onSelect(c.value)}
              className={cn(
                'w-full flex items-center gap-3.5 p-4 rounded-card text-left transition-all duration-150',
                active ? 'tile-sage ring-2 ring-[rgba(111,143,107,0.55)] -translate-y-px' : 'tile tile-hover',
              )}
            >
              <IconBadge icon={c.Icon} tone={active ? 'sage' : 'sand'} variant="gradient" size="md" />
              <div className="flex-1 min-w-0">
                <div className="text-body-sm font-semibold text-ink">{c.title}</div>
                <div className="text-caption text-ink-2 leading-snug">{c.desc}</div>
              </div>
              <span
                className={cn(
                  'w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors',
                  active ? 'bg-grad-sage border-transparent' : 'border-line-2 bg-white',
                )}
              >
                {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </span>
            </button>
          )
        })}
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!selected} />
    </div>
  )
}
