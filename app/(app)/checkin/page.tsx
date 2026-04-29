'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Zap,
  Moon,
  Smile,
  Waves,
  Calendar,
  Clock,
  CheckCircle2,
  Flame,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { cn } from '@/lib/utils'

type SliderKey = 'energy' | 'sleep' | 'mood' | 'stress'

interface Metric {
  id: SliderKey
  label: string
  Icon: React.ElementType
  inverted?: boolean // stress: low is good
  lowLabel: string
  highLabel: string
}

const metrics: Metric[] = [
  { id: 'energy', label: 'Energy levels', Icon: Zap,   lowLabel: 'Low',  highLabel: 'High' },
  { id: 'sleep',  label: 'Sleep quality', Icon: Moon,  lowLabel: 'Low',  highLabel: 'High' },
  { id: 'mood',   label: 'Mood',          Icon: Smile, lowLabel: 'Low',  highLabel: 'High' },
  { id: 'stress', label: 'Stress',        Icon: Waves, inverted: true, lowLabel: 'Low', highLabel: 'High' },
]

// Map face index (0-4) to 1-10 score. Face 0 = 2, face 4 = 10.
// For inverted metrics (stress), face 0 still maps to 2 (low value = low stress).
const FACE_TO_VALUE = [2, 4, 6, 8, 10]

// Convert stored 1-10 value back to face index (0-4)
function valueToFace(value: number) {
  if (value <= 2) return 0
  if (value <= 4) return 1
  if (value <= 6) return 2
  if (value <= 8) return 3
  return 4
}

// Faces from low → high. Each metric gets the same set of faces.
// We render faces with SVG so we can colour them on the fly.
function FaceIcon({ index, active, tone }: { index: number; active: boolean; tone: 'positive' | 'neutral' | 'negative' }) {
  // index 0 = saddest, 4 = happiest
  const fills = active
    ? { positive: '#6F8F6B', neutral: '#A8BFA3', negative: '#C97A7A' }[tone]
    : { positive: 'rgba(168,191,163,0.35)', neutral: 'rgba(168,191,163,0.30)', negative: 'rgba(201,122,122,0.30)' }[tone]

  const stroke = active ? '#FFFFFF' : '#1A1C1A'

  // Mouth path varies by index
  const mouths = [
    'M 11 22 Q 16 18 21 22', // very sad
    'M 11 22 Q 16 19 21 22', // sad
    'M 11 21 L 21 21',       // neutral
    'M 11 20 Q 16 23 21 20', // happy
    'M 10.5 19 Q 16 25 21.5 19', // very happy
  ]

  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%" className="block">
      <circle cx="16" cy="16" r="14" fill={fills} />
      <circle cx="12" cy="14" r="1.4" fill={stroke} />
      <circle cx="20" cy="14" r="1.4" fill={stroke} />
      <path d={mouths[index]} fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function metricTone(metric: Metric, faceIndex: number): 'positive' | 'neutral' | 'negative' {
  const effective = metric.inverted ? 4 - faceIndex : faceIndex
  if (effective >= 3) return 'positive'
  if (effective === 2) return 'neutral'
  return 'negative'
}

const STREAK_MILESTONES = [5, 10, 20, 30]

export default function CheckinPage() {
  const router = useRouter()
  const [values, setValues] = useState<Record<SliderKey, number>>({
    energy: 6, sleep: 6, mood: 6, stress: 4,
  })
  const [loading, setLoading] = useState(false)
  const [alreadyDone, setAlreadyDone] = useState(false)
  const [streak] = useState(0) // populated from API in real version
  const [startTime] = useState(Date.now())

  useEffect(() => {
    fetch('/api/checkin/today')
      .then((r) => r.json())
      .then((d) => {
        if (d.done) {
          setAlreadyDone(true)
          setValues({
            energy: d.checkin.energy,
            sleep: d.checkin.sleep,
            mood: d.checkin.mood,
            stress: d.checkin.stress,
          })
        }
      })
      .catch(() => {})
  }, [])

  const elapsed = Math.round((Date.now() - startTime) / 1000)

  async function handleSubmit() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error()
      toast.success(elapsed <= 30 ? `Logged in ${elapsed}s` : 'Check-in saved')
      router.push('/dashboard')
    } catch {
      toast.error('Failed to save check-in')
      setLoading(false)
    }
  }

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="max-w-xl mx-auto fade-up">
      {/* Page header */}
      <div className="flex items-start gap-4 mb-2">
        <IconBadge icon={Calendar} size="xl" tone="sage" />
        <div className="flex-1">
          <h1 className="font-sans text-h1 text-ink tracking-tight">Daily Check-in</h1>
          <Pill tone="soft-sage" size="md" className="mt-2">
            <Clock className="w-3 h-3" />
            Daily prompt · {today}
          </Pill>
        </div>
      </div>

      <p className="text-body text-ink-2 mt-4 mb-8 leading-relaxed">
        Your health isn&apos;t just numbers — it&apos;s how you feel.
        <br />
        Your input helps us understand what your data can&apos;t.
      </p>

      <div className="space-y-3">
        {metrics.map((m) => {
          const currentFace = valueToFace(values[m.id])
          return (
            <Card key={m.id} padding="md">
              <div className="flex items-center gap-3 mb-4">
                <IconBadge icon={m.Icon} size="md" tone="sage" />
                <span className="text-h3 text-ink">{m.label}</span>
              </div>

              <div className="flex items-center justify-between gap-1.5 sm:gap-2.5">
                {[0, 1, 2, 3, 4].map((faceIdx) => {
                  const isActive = faceIdx === currentFace
                  const tone = metricTone(m, faceIdx)
                  return (
                    <button
                      key={faceIdx}
                      type="button"
                      disabled={alreadyDone}
                      onClick={() => setValues((prev) => ({ ...prev, [m.id]: FACE_TO_VALUE[faceIdx] }))}
                      className={cn(
                        'relative w-12 h-12 sm:w-14 sm:h-14 transition-all',
                        isActive && 'scale-110',
                        !alreadyDone && 'hover:scale-105 cursor-pointer',
                        alreadyDone && 'cursor-not-allowed',
                      )}
                      aria-label={`Set ${m.label} to ${faceIdx + 1} of 5`}
                    >
                      {isActive && (
                        <div
                          className={cn(
                            'absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-white',
                            tone === 'positive' && 'ring-sage-deep',
                            tone === 'neutral'  && 'ring-sage-soft',
                            tone === 'negative' && 'ring-rose',
                          )}
                        />
                      )}
                      <FaceIcon index={faceIdx} active={isActive} tone={tone} />
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-between mt-3">
                <span className="text-micro text-ink-3">{m.inverted ? m.highLabel : m.lowLabel}</span>
                <span className="text-micro text-ink-3">{m.inverted ? m.lowLabel : m.highLabel}</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Status bar */}
      {!alreadyDone ? (
        <div className="mt-5 px-4 py-2.5 rounded-pill bg-sage-wash border border-accent-ring inline-flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-sage-deep" />
          <span className="text-caption text-sage-deep font-medium">
            {elapsed > 0 ? `In ${elapsed}s` : 'Logged in seconds'}
          </span>
          <CheckCircle2 className="w-3.5 h-3.5 text-sage-deep" />
        </div>
      ) : (
        <div className="mt-5 px-4 py-2.5 rounded-pill bg-sage-wash border border-accent-ring inline-flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-sage-deep" />
          <span className="text-caption text-sage-deep font-medium">Check-in saved · come back tomorrow</span>
        </div>
      )}

      {/* Streak card */}
      <Card className="mt-5">
        <div className="flex items-center gap-4">
          <IconBadge icon={Flame} size="lg" tone="amber" />
          <div className="flex-1">
            <div className="text-h3 text-ink">Streak</div>
            <div className="text-caption text-ink-2">
              {streak === 0 ? "You're starting today!" : 'Great consistency!'}
            </div>
          </div>
          <div className="flex gap-2">
            {STREAK_MILESTONES.map((days) => {
              const reached = streak >= days
              return (
                <div key={days} className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-9 h-9 rounded-full flex items-center justify-center text-caption font-semibold transition-all',
                      reached ? 'bg-sage text-white' : 'bg-sand-deep text-ink-3',
                    )}
                  >
                    {days}
                  </div>
                  <span className="text-[9px] text-ink-3 mt-1">days</span>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {!alreadyDone && (
        <div className="mt-6">
          <Button variant="primary" size="lg" loading={loading} onClick={handleSubmit} fullWidth>
            Save check-in
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      <p className="text-micro text-ink-3 mt-5 text-center leading-relaxed">
        Educational data only · not a clinical assessment
      </p>
    </div>
  )
}
