'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  ArrowLeft,
  Check,
  Lock,
  TrendingUp,
  Link2,
  Brain,
  Wine,
  Utensils,
  Dumbbell,
  Wind,
  Plane,
  Thermometer,
  Moon,
  Smile,
  Frown,
  Meh,
  Laugh,
  Sparkles,
  Activity,
  User,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { cn } from '@/lib/utils'
import { CONTEXT_TAGS, FEELINGS, type FeelingId } from '@/lib/day-context'

const TAG_ICONS: Record<string, LucideIcon> = {
  alcohol: Wine,
  late_meal: Utensils,
  hard_training: Dumbbell,
  high_stress: Wind,
  travel: Plane,
  illness: Thermometer,
  poor_sleep: Moon,
  nothing: Smile,
}

const FEELING_ICONS: Record<FeelingId, LucideIcon> = {
  low: Frown,
  okay: Meh,
  good: Smile,
  great: Laugh,
}

export function ContextClient({
  initial,
  suggestion,
}: {
  initial: { tags: string[]; feeling: string; note: string } | null
  suggestion: { notice: string | null; prompt: string; basedOn: string[] }
}) {
  const router = useRouter()
  const [tags, setTags] = useState<string[]>(initial?.tags ?? [])
  const [feeling, setFeeling] = useState<string | null>(initial?.feeling ?? null)
  const [note, setNote] = useState(initial?.note ?? '')
  const [saving, setSaving] = useState(false)

  const canSave = feeling != null
  const prompt = useMemo(() => suggestion.prompt, [suggestion.prompt])

  function toggleTag(id: string) {
    setTags((prev) => {
      if (id === 'nothing') return prev.includes('nothing') ? [] : ['nothing']
      const next = prev.filter((t) => t !== 'nothing')
      return next.includes(id) ? next.filter((t) => t !== id) : [...next, id]
    })
  }

  async function save() {
    if (!feeling) {
      toast.error('Please tell us how you are feeling.')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags, feeling, note, prompt }),
      })
      if (!res.ok) throw new Error()
      toast.success('Context saved')
      router.push('/dashboard')
      router.refresh()
    } catch {
      toast.error('Could not save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto fade-up space-y-5 pb-8">
      <header className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full tile flex items-center justify-center mt-1 shrink-0"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.25} />
        </button>
        <div>
          <h1 className="font-sans text-[28px] sm:text-[32px] font-bold text-ink tracking-tight leading-[1.08]">
            Today&apos;s <span className="italic-accent text-sage-deep font-normal">Context</span>
          </h1>
          <p className="text-[14px] text-ink-2 mt-2 leading-relaxed max-w-[46ch]">
            Help BioSense understand what may be influencing your readiness today.
          </p>
        </div>
      </header>

      <Card padding="md" className="flex items-start gap-3">
        <IconBadge icon={Sparkles} tone="sage" variant="tint" size="md" />
        <div>
          <div className="text-[12px] font-semibold text-ink">Context check-in · 20 sec</div>
          <p className="text-[13px] text-ink-2 mt-0.5 leading-snug">
            {suggestion.notice ?? 'A little context helps BioSense understand what may be influencing today.'}
          </p>
        </div>
      </Card>

      <Card padding="lg" className="space-y-5">
        <div className="flex items-start gap-3">
          <IconBadge icon={Activity} tone="sage" variant="tint" size="md" />
          <div>
            <div className="text-[15px] font-semibold text-ink">Help us interpret today&apos;s readiness</div>
            <p className="text-[13px] text-ink-2 mt-1 leading-relaxed">{prompt}</p>
            {suggestion.basedOn.length > 0 && (
              <div className="text-[11px] text-ink-3 mt-2">Based on: {suggestion.basedOn.join(' · ')}</div>
            )}
          </div>
        </div>

        <div>
          <div className="text-[12px] font-semibold text-ink mb-2">What might explain this?</div>
          <div className="flex flex-wrap gap-2">
            {CONTEXT_TAGS.map((t) => {
              const on = tags.includes(t.id)
              const Icon = TAG_ICONS[t.id] ?? Smile
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTag(t.id)}
                  className={cn(
                    'h-9 px-3 rounded-pill text-[12.5px] font-medium ring-1 ring-inset transition-colors inline-flex items-center gap-1.5',
                    on
                      ? 'bg-white text-sage-deep ring-sage-deep'
                      : 'bg-white text-ink-2 ring-[rgba(26,28,26,0.08)] hover:ring-sage-deep/40',
                  )}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  {t.label}
                  {on && <Check className="w-3.5 h-3.5" strokeWidth={2.4} />}
                </button>
              )
            })}
          </div>
        </div>

        <label className="block">
          <div className="text-[12px] font-semibold text-ink mb-2">
            Anything else we should know? <span className="font-normal text-ink-3">(optional)</span>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="Add anything that may help explain today…"
            className="w-full rounded-[16px] tile px-3.5 py-3 text-[13px] text-ink placeholder:text-ink-3 outline-none focus:ring-2 ring-sage-deep/30"
          />
        </label>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <IconBadge icon={User} tone="amber" variant="tint" size="sm" />
            <div className="text-[15px] font-semibold text-ink">How are you feeling right now?</div>
          </div>
          <p className="text-[12px] text-ink-3 mt-0.5 mb-2">This helps us refine today&apos;s readiness.</p>
          <div className="flex flex-wrap gap-2">
            {FEELINGS.map((f) => {
              const on = feeling === f.id
              const Icon = FEELING_ICONS[f.id]
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFeeling(f.id)}
                  className={cn(
                    'h-9 px-3.5 rounded-pill text-[12.5px] font-medium ring-1 ring-inset inline-flex items-center gap-1.5',
                    on
                      ? 'bg-white text-[#A77530] ring-[rgba(167,117,48,0.55)]'
                      : 'bg-white text-ink-2 ring-[rgba(26,28,26,0.08)]',
                  )}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  {f.label}
                  {on && <Check className="w-3.5 h-3.5" strokeWidth={2.4} />}
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-[16px] bg-[rgba(168,191,163,0.12)] px-3.5 py-3 text-[12px] text-ink-2 leading-relaxed space-y-1.5">
          <p>This helps BioSense refine today&apos;s readiness and improve future pattern detection.</p>
          <p className="flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={2.25} />
            Your wearable data stays primary. Your answers add context. They do not overwrite objective data.
          </p>
        </div>
      </Card>

      <div>
        <div className="text-[12px] font-semibold text-ink mb-2">What happens next</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: TrendingUp, label: "Refines today's readiness" },
            { icon: Link2, label: 'Improves future connections' },
            { icon: Brain, label: 'Learns which factors affect you most' },
          ].map((x) => (
            <div key={x.label} className="rounded-[16px] tile p-3 text-center">
              <div className="w-9 h-9 rounded-full bg-[rgba(168,191,163,0.18)] flex items-center justify-center mx-auto mb-1.5">
                <x.icon className="w-4 h-4 text-sage-deep" strokeWidth={2} />
              </div>
              <div className="text-[11px] text-ink-2 leading-snug">{x.label}</div>
            </div>
          ))}
        </div>
      </div>

      <Button variant="primary" size="lg" fullWidth loading={saving} disabled={!canSave} onClick={save}>
        Save context
      </Button>
      <button
        type="button"
        onClick={() => router.push('/dashboard')}
        className="w-full text-center text-[13px] text-ink-3 py-1"
      >
        Skip for now
      </button>
    </div>
  )
}
