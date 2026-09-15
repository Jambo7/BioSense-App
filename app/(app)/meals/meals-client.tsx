'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  ArrowLeft,
  Camera,
  Check,
  Image as ImageIcon,
  Trash2,
  Utensils,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  MEAL_SLOTS,
  defaultMealSlot,
  slotLabel,
  todayDateParam,
  totalsFor,
  type MealEstimate,
  type MealSlot,
} from '@/lib/meals'

type MealRow = {
  id: string
  slot: string
  title: string
  items: { name: string; portion: string }[]
  calories: number
  proteinG: number
  carbsG: number
  fatG: number
  fibreG: number | null
  confidence: string
  assumptions: string | null
  userNote: string | null
  adjusted: boolean
}

type Draft = MealEstimate & {
  slot: MealSlot
  userNote: string
  previewUrl: string
  sourceCalories: number
  sourceProtein: number
  sourceCarbs: number
  sourceFat: number
}

function asItems(value: unknown): { name: string; portion: string }[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => item as { name?: string; portion?: string })
    .filter((item) => item.name)
    .map((item) => ({ name: item.name ?? '', portion: item.portion ?? '' }))
}

export function MealsClient() {
  const router = useRouter()
  const cameraRef = useRef<HTMLInputElement>(null)
  const libraryRef = useRef<HTMLInputElement>(null)
  const date = todayDateParam()
  const [meals, setMeals] = useState<MealRow[]>([])
  const [note, setNote] = useState('')
  const [reading, setReading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState<Draft | null>(null)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      const res = await fetch(`/api/meals?date=${date}`)
      if (!res.ok || cancelled) return
      const json = (await res.json()) as { meals?: MealRow[] }
      if (cancelled) return
      setMeals(
        (json.meals ?? []).map((meal) => ({
          ...meal,
          items: asItems(meal.items),
        })),
      )
    })()
    return () => {
      cancelled = true
    }
  }, [date])

  const totals = useMemo(() => totalsFor(meals), [meals])
  const isToday = true

  function tryAgain() {
    cameraRef.current?.click()
  }

  function failPhoto(message: string) {
    toast.error(message, {
      duration: 6500,
      action: {
        label: 'Try again',
        onClick: () => tryAgain(),
      },
    })
  }

  async function onFile(file: File | undefined) {
    if (!file) return

    const type = file.type || ''
    const name = file.name || ''
    if (/heic|heif/i.test(type) || /\.hei[cf]$/i.test(name)) {
      failPhoto('That library format will not read. Take a new photo, or pick a JPG or PNG.')
      return
    }
    if (file.size < 12 * 1024) {
      failPhoto('That photo looks too small or empty. Take another shot of the plate.')
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      failPhoto('That photo is too large. Try another shot, a bit closer to the plate.')
      return
    }
    if (
      type &&
      !type.startsWith('image/') &&
      !/\.(jpe?g|png|webp)$/i.test(name)
    ) {
      failPhoto('Please take a photo of the meal, or choose a JPG or PNG.')
      return
    }

    setReading(true)
    const previewUrl = URL.createObjectURL(file)
    try {
      const fd = new FormData()
      fd.append('file', file)
      if (note.trim()) fd.append('note', note.trim())
      const res = await fetch('/api/meals/analyse', { method: 'POST', body: fd })
      let json: { error?: string; isMeal?: boolean; reason?: string } = {}
      try {
        json = await res.json()
      } catch {
        throw new Error('Could not read that photo. Please try again.')
      }
      if (!res.ok) {
        throw new Error(json.error || 'Could not read that photo. Please try again.')
      }
      if (json.isMeal === false) {
        URL.revokeObjectURL(previewUrl)
        failPhoto(json.reason || 'That photo does not look like a meal. Take another shot of the plate.')
        return
      }
      const estimate = json as MealEstimate
      setDraft({
        ...estimate,
        slot: defaultMealSlot(),
        userNote: note.trim(),
        previewUrl,
        sourceCalories: estimate.calories,
        sourceProtein: estimate.proteinG,
        sourceCarbs: estimate.carbsG,
        sourceFat: estimate.fatG,
      })
      if (estimate.confidence === 'low') {
        toast('This estimate is a guess. You can retake the photo or adjust the numbers.', {
          duration: 5000,
          action: {
            label: 'Retake',
            onClick: () => {
              URL.revokeObjectURL(previewUrl)
              setDraft(null)
              tryAgain()
            },
          },
        })
      }
    } catch (err) {
      URL.revokeObjectURL(previewUrl)
      failPhoto(err instanceof Error ? err.message : 'Could not read that photo. Please try again.')
    } finally {
      setReading(false)
      if (cameraRef.current) cameraRef.current.value = ''
      if (libraryRef.current) libraryRef.current.value = ''
    }
  }

  async function saveDraft() {
    if (!draft) return
    setSaving(true)
    try {
      const res = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          slot: draft.slot,
          title: draft.title,
          items: draft.items,
          calories: Math.round(draft.calories),
          proteinG: draft.proteinG,
          carbsG: draft.carbsG,
          fatG: draft.fatG,
          fibreG: draft.fibreG,
          confidence: draft.confidence,
          assumptions: draft.assumptions,
          userNote: draft.userNote || undefined,
          adjusted:
            draft.calories !== draft.sourceCalories ||
            draft.proteinG !== draft.sourceProtein ||
            draft.carbsG !== draft.sourceCarbs ||
            draft.fatG !== draft.sourceFat,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Could not save meal')
      const saved = json.meal as MealRow
      setMeals((prev) => [
        ...prev,
        {
          ...saved,
          items: asItems(saved.items),
        },
      ])
      URL.revokeObjectURL(draft.previewUrl)
      setDraft(null)
      setNote('')
      toast.success('Meal logged')
      router.refresh()
    } catch (err) {
      toast.error('Could not save meal. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function removeMeal(id: string) {
    const res = await fetch(`/api/meals/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      toast.error('Could not remove that meal. Please try again.')
      return
    }
    setMeals((prev) => prev.filter((m) => m.id !== id))
    router.refresh()
  }

  return (
    <div className="max-w-2xl mx-auto fade-up space-y-5">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Home
      </Link>

      <header className="flex items-start gap-4">
        <IconBadge icon={Utensils} size="xl" tone="amber" />
        <div className="flex-1">
          <div className="text-eyebrow uppercase text-sage-deep mb-1">Meals</div>
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1]">
            Log today&apos;s <span className="italic-accent">plate.</span>
          </h1>
          <p className="text-body-sm text-ink-2 mt-2 leading-relaxed max-w-[54ch]">
            Photograph a meal. BioSense estimates calories and macros. You can
            adjust the numbers before you save. Estimates only, not a weighed
            portion or medical nutrition advice.
          </p>
        </div>
      </header>

      <Card padding="md">
        <div className="text-eyebrow uppercase text-ink-3 mb-3">
          {isToday ? 'Today' : date}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <MacroStat label="kcal" value={Math.round(totals.calories)} />
          <MacroStat label="Protein" value={`${Math.round(totals.proteinG)}g`} />
          <MacroStat label="Carbs" value={`${Math.round(totals.carbsG)}g`} />
          <MacroStat label="Fat" value={`${Math.round(totals.fatG)}g`} />
        </div>
      </Card>

      <Card>
        <label className="block text-eyebrow uppercase text-ink-3 mb-2">
          Anything the photo might miss?
        </label>
        <Input
          placeholder="e.g. olive oil on the side, extra rice"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={280}
        />
        <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
            variant="primary"
            size="lg"
            loading={reading}
            onClick={() => cameraRef.current?.click()}
          >
            <Camera className="w-4 h-4" />
            {reading ? 'Reading the plate' : 'Take photo'}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            disabled={reading}
            onClick={() => libraryRef.current?.click()}
          >
            <ImageIcon className="w-4 h-4" />
            Library
          </Button>
        </div>
        <input
          ref={cameraRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          className="hidden"
          onChange={(e) => void onFile(e.target.files?.[0])}
        />
        <input
          ref={libraryRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => void onFile(e.target.files?.[0])}
        />
        <p className="text-caption text-ink-3 mt-3 leading-relaxed">
          Photos are read once and not stored.
        </p>
      </Card>

      {draft && (
        <Card padding="lg" className="space-y-4">
          <div className="flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={draft.previewUrl}
              alt=""
              className="w-16 h-16 rounded-[12px] object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-eyebrow uppercase text-ink-3 mb-1">
                {draft.confidence} confidence
              </div>
              <Input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {MEAL_SLOTS.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setDraft({ ...draft, slot: slot.id })}
                className={cn(
                  'h-8 px-3 rounded-pill text-[12.5px] font-medium border',
                  draft.slot === slot.id
                    ? 'bg-sage-wash border-accent-ring text-sage-deep'
                    : 'bg-white border-line text-ink-2',
                )}
              >
                {slot.label}
              </button>
            ))}
          </div>

          {draft.items.length > 0 && (
            <ul className="text-body-sm text-ink-2 space-y-1">
              {draft.items.map((item, idx) => (
                <li key={`${item.name}-${idx}`}>
                  {item.name}
                  {item.portion ? ` · ${item.portion}` : ''}
                </li>
              ))}
            </ul>
          )}

          <p className="text-caption text-ink-3 leading-relaxed">{draft.assumptions}</p>
          {draft.confidence === 'low' && (
            <p className="text-caption text-ink-2 leading-relaxed">
              The photo was hard to read. Retake it in better light, or adjust the numbers below.
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <MacroField
              label="Calories"
              value={draft.calories}
              onChange={(n) => setDraft({ ...draft, calories: n })}
            />
            <MacroField
              label="Protein (g)"
              value={draft.proteinG}
              onChange={(n) => setDraft({ ...draft, proteinG: n })}
            />
            <MacroField
              label="Carbs (g)"
              value={draft.carbsG}
              onChange={(n) => setDraft({ ...draft, carbsG: n })}
            />
            <MacroField
              label="Fat (g)"
              value={draft.fatG}
              onChange={(n) => setDraft({ ...draft, fatG: n })}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              fullWidth
              onClick={() => {
                URL.revokeObjectURL(draft.previewUrl)
                setDraft(null)
                tryAgain()
              }}
            >
              Retake
            </Button>
            <Button variant="primary" fullWidth loading={saving} onClick={() => void saveDraft()}>
              <Check className="w-4 h-4" />
              Log meal
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {meals.length === 0 && !draft && (
          <p className="text-body-sm text-ink-3 leading-relaxed">
            No meals logged {isToday ? 'today' : 'on this day'} yet.
          </p>
        )}
        {meals.map((meal) => (
          <Card key={meal.id} className="flex items-start gap-3">
            <IconBadge icon={Utensils} tone="amber" size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-eyebrow uppercase text-ink-3">
                {slotLabel(meal.slot)}
                {meal.adjusted ? ' · adjusted' : ''}
              </div>
              <div className="font-semibold text-ink">{meal.title}</div>
              <div className="text-caption text-ink-2 mt-0.5">
                {meal.calories} kcal · P {Math.round(meal.proteinG)}g · C {Math.round(meal.carbsG)}g · F{' '}
                {Math.round(meal.fatG)}g
              </div>
              {meal.userNote && (
                <p className="text-caption text-ink-3 mt-1">{meal.userNote}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => void removeMeal(meal.id)}
              className="text-ink-3 hover:text-rose p-1"
              aria-label="Remove meal"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MacroStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.1em] text-ink-3">{label}</div>
      <div className="text-[15px] font-semibold text-ink tabular-nums">{value}</div>
    </div>
  )
}

function MacroField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (n: number) => void
}) {
  return (
    <Input
      label={label}
      type="number"
      min={0}
      value={Number.isFinite(value) ? String(value) : ''}
      onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
    />
  )
}
