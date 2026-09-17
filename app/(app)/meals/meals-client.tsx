'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  ArrowLeft,
  Camera,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Info,
  Plus,
  Trash2,
  Utensils,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Input } from '@/components/ui/input'
import { Pill } from '@/components/ui/pill'
import { cn } from '@/lib/utils'
import {
  EATEN_AMOUNTS,
  MEAL_SLOTS,
  aboutCalories,
  dayHeading,
  defaultMealSlot,
  eatenFactor,
  estimatedGrams,
  isTodayParam,
  shiftDateParam,
  slotLabel,
  todayDateParam,
  totalsFor,
  type EatenAmount,
  type MealEstimate,
  type MealSlot,
} from '@/lib/meals'

type Mode = 'plate' | 'ingredients'

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
  eatenAmount?: string
}

type Draft = MealEstimate & {
  slot: MealSlot
  userNote: string
  previewUrl: string
  sourceCalories: number
  sourceProtein: number
  sourceCarbs: number
  sourceFat: number
  capturedAt: string
  includedWhole: boolean
  eatenAmount: EatenAmount
  missingNote: string
  editingItems: boolean
  macrosEdited: boolean
}

type Ingredient = {
  id: string
  file: File
  previewUrl: string
  note: string
}

function asItems(value: unknown): { name: string; portion: string }[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => item as { name?: string; portion?: string })
    .filter((item) => item.name)
    .map((item) => ({ name: item.name ?? '', portion: item.portion ?? '' }))
}

function fileProblem(file: File): string | null {
  const type = file.type || ''
  const name = file.name || ''
  if (/heic|heif/i.test(type) || /\.hei[cf]$/i.test(name)) {
    return 'That library format will not read. Take a new photo, or pick a JPG or PNG.'
  }
  if (file.size < 12 * 1024) {
    return 'That photo looks too small or empty. Take another shot.'
  }
  if (file.size > 8 * 1024 * 1024) {
    return 'That photo is too large. Try another shot, a bit closer.'
  }
  if (type && !type.startsWith('image/') && !/\.(jpe?g|png|webp)$/i.test(name)) {
    return 'Please take a photo, or choose a JPG or PNG.'
  }
  return null
}

function roundMacro(value: number): number {
  return Math.max(0, Math.round(value * 10) / 10)
}

function clockLabel(now = new Date()): string {
  return now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export function MealsClient() {
  const router = useRouter()
  const plateCameraRef = useRef<HTMLInputElement>(null)
  const plateLibraryRef = useRef<HTMLInputElement>(null)
  const ingredientCameraRef = useRef<HTMLInputElement>(null)
  const ingredientLibraryRef = useRef<HTMLInputElement>(null)
  const [date, setDate] = useState(todayDateParam)
  const [meals, setMeals] = useState<MealRow[]>([])
  const [mode, setMode] = useState<Mode>('plate')
  const [plateNote, setPlateNote] = useState('')
  const [ingredientNote, setIngredientNote] = useState('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [reading, setReading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [photoPolicyOpen, setPhotoPolicyOpen] = useState(false)

  const viewingToday = isTodayParam(date)

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
  const mealWord = meals.length === 1 ? 'meal' : 'meals'

  function showError(message: string, retry?: () => void) {
    setError(message)
    toast.error(message, {
      duration: 7000,
      action: retry
        ? {
            label: 'Try again',
            onClick: () => retry(),
          }
        : undefined,
    })
  }

  function openPlateCamera() {
    plateCameraRef.current?.click()
  }

  function applyEstimate(estimate: MealEstimate, previewUrl: string, userNote: string) {
    setError(null)
    setDraft({
      ...estimate,
      slot: defaultMealSlot(),
      userNote,
      previewUrl,
      sourceCalories: estimate.calories,
      sourceProtein: estimate.proteinG,
      sourceCarbs: estimate.carbsG,
      sourceFat: estimate.fatG,
      capturedAt: clockLabel(),
      includedWhole: true,
      eatenAmount: 'all',
      missingNote: '',
      editingItems: false,
      macrosEdited: false,
    })
  }

  function editMacro(kind: 'calories' | 'protein' | 'carbs' | 'fat', next: number) {
    if (!draft) return
    const factor = eatenFactor(draft.eatenAmount) || 1
    if (kind === 'calories') {
      const calories = Math.min(6000, Math.max(0, Math.round(next)))
      setDraft({
        ...draft,
        calories,
        sourceCalories: Math.round(calories / factor),
        macrosEdited: true,
      })
      return
    }
    const value = roundMacro(Math.max(0, next))
    if (kind === 'protein') {
      const proteinG = Math.min(400, value)
      setDraft({ ...draft, proteinG, sourceProtein: roundMacro(proteinG / factor), macrosEdited: true })
      return
    }
    if (kind === 'carbs') {
      const carbsG = Math.min(600, value)
      setDraft({ ...draft, carbsG, sourceCarbs: roundMacro(carbsG / factor), macrosEdited: true })
      return
    }
    const fatG = Math.min(300, value)
    setDraft({ ...draft, fatG, sourceFat: roundMacro(fatG / factor), macrosEdited: true })
  }

  function setEatenAmount(amount: EatenAmount) {
    if (!draft) return
    const factor = eatenFactor(amount)
    setDraft({
      ...draft,
      eatenAmount: amount,
      calories: Math.round(draft.sourceCalories * factor),
      proteinG: roundMacro(draft.sourceProtein * factor),
      carbsG: roundMacro(draft.sourceCarbs * factor),
      fatG: roundMacro(draft.sourceFat * factor),
    })
  }

  async function analyse(files: File[], notes: string[], analyseMode: Mode) {
    setReading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append('mode', analyseMode)
      files.forEach((file) => fd.append('files', file))
      notes.forEach((note) => fd.append('notes', note))
      const res = await fetch('/api/meals/analyse', { method: 'POST', body: fd })
      let json: { error?: string; isMeal?: boolean; reason?: string } = {}
      try {
        json = await res.json()
      } catch {
        throw new Error('Could not read those photos. Please try again.')
      }
      if (!res.ok) throw new Error(json.error || 'Could not read those photos. Please try again.')
      if (json.isMeal === false) {
        throw new Error(json.reason || 'Those photos do not look like food. Try again.')
      }
      const previewUrl = URL.createObjectURL(files[0])
      applyEstimate(json as MealEstimate, previewUrl, notes.filter(Boolean).join(' · '))
    } catch (err) {
      showError(
        err instanceof Error ? err.message : 'Could not read those photos. Please try again.',
        analyseMode === 'plate' ? openPlateCamera : undefined,
      )
    } finally {
      setReading(false)
      if (plateCameraRef.current) plateCameraRef.current.value = ''
      if (plateLibraryRef.current) plateLibraryRef.current.value = ''
      if (ingredientCameraRef.current) ingredientCameraRef.current.value = ''
      if (ingredientLibraryRef.current) ingredientLibraryRef.current.value = ''
    }
  }

  async function onPlateFile(file: File | undefined) {
    if (!file) return
    const problem = fileProblem(file)
    if (problem) {
      showError(problem, openPlateCamera)
      return
    }
    await analyse([file], [plateNote], 'plate')
  }

  function addIngredient(file: File | undefined) {
    if (!file) return
    const problem = fileProblem(file)
    if (problem) {
      showError(problem, () => ingredientCameraRef.current?.click())
      return
    }
    if (ingredients.length >= 6) {
      showError('You can add up to 6 ingredient photos.')
      return
    }
    setError(null)
    setIngredients((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${file.name}`,
        file,
        previewUrl: URL.createObjectURL(file),
        note: ingredientNote.trim(),
      },
    ])
    setIngredientNote('')
    if (ingredientCameraRef.current) ingredientCameraRef.current.value = ''
    if (ingredientLibraryRef.current) ingredientLibraryRef.current.value = ''
  }

  function removeIngredient(id: string) {
    setIngredients((prev) => {
      const row = prev.find((item) => item.id === id)
      if (row) URL.revokeObjectURL(row.previewUrl)
      return prev.filter((item) => item.id !== id)
    })
  }

  async function createFromIngredients() {
    if (ingredients.length === 0) {
      showError('Add at least one ingredient photo first.')
      return
    }
    await analyse(
      ingredients.map((item) => item.file),
      ingredients.map((item) => item.note),
      'ingredients',
    )
  }

  function discardDraft() {
    if (!draft) return
    URL.revokeObjectURL(draft.previewUrl)
    setDraft(null)
    setError(null)
  }

  async function saveDraft() {
    if (!draft) return
    setSaving(true)
    try {
      const noteParts = [draft.userNote.trim(), !draft.includedWhole ? draft.missingNote.trim() : '']
        .filter(Boolean)
        .join(' · ')
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
          userNote: noteParts || undefined,
          adjusted:
            draft.macrosEdited ||
            draft.calories !== draft.sourceCalories ||
            draft.proteinG !== draft.sourceProtein ||
            draft.carbsG !== draft.sourceCarbs ||
            draft.fatG !== draft.sourceFat ||
            draft.eatenAmount !== 'all',
          includedWhole: draft.includedWhole,
          eatenAmount: draft.eatenAmount,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Could not save meal')
      const saved = json.meal as MealRow
      setMeals((prev) => [...prev, { ...saved, items: asItems(saved.items) }])
      URL.revokeObjectURL(draft.previewUrl)
      ingredients.forEach((item) => URL.revokeObjectURL(item.previewUrl))
      setDraft(null)
      setIngredients([])
      setPlateNote('')
      setError(null)
      toast.success('Meal observation saved')
      router.refresh()
    } catch {
      showError('Could not save that meal. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function removeMeal(id: string) {
    const res = await fetch(`/api/meals/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      showError('Could not remove that meal. Please try again.')
      return
    }
    setMeals((prev) => prev.filter((m) => m.id !== id))
    router.refresh()
  }

  if (draft) {
    return (
      <div className="max-w-2xl mx-auto fade-up space-y-5">
        <button
          type="button"
          onClick={discardDraft}
          className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Meal scanner
        </button>

        <header className="flex items-start gap-4">
          <IconBadge icon={Utensils} size="xl" tone="amber" />
          <div className="flex-1">
            <div className="text-eyebrow uppercase text-sage-deep mb-1">Meal review</div>
            <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1]">
              Review this <span className="italic-accent">meal.</span>
            </h1>
            <p className="text-body-sm text-ink-2 mt-2 leading-relaxed max-w-[54ch]">
              BioSense has estimated what it can see. Check the details before saving.
            </p>
          </div>
        </header>

        <Card padding="lg" className="space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={draft.previewUrl}
                alt=""
                className="w-16 h-16 rounded-[12px] object-cover shrink-0"
              />
              <div className="min-w-0">
                <Input
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                />
                <p className="text-caption text-ink-3 mt-1.5">
                  {slotLabel(draft.slot)} · {draft.capturedAt}
                </p>
              </div>
            </div>
            <Pill tone="soft-sage">AI estimate</Pill>
          </div>

          <div>
            <div className="text-eyebrow uppercase text-ink-3 mb-2">Meal type</div>
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
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-eyebrow uppercase text-ink-3">What we found</div>
              <button
                type="button"
                className="text-[13px] font-medium text-sage-deep"
                onClick={() => setDraft({ ...draft, editingItems: !draft.editingItems })}
              >
                {draft.editingItems ? 'Done' : 'Edit ingredients'}
              </button>
            </div>
            {draft.editingItems ? (
              <div className="space-y-2">
                {draft.items.map((item, idx) => (
                  <div key={`${item.name}-${idx}`} className="flex gap-2">
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        const items = [...draft.items]
                        items[idx] = { ...item, name: e.target.value }
                        setDraft({ ...draft, items })
                      }}
                    />
                    <button
                      type="button"
                      className="text-ink-3 hover:text-rose p-1"
                      aria-label="Remove ingredient"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          items: draft.items.filter((_, i) => i !== idx),
                        })
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      items: [...draft.items, { name: '', portion: '' }],
                    })
                  }
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add item
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {draft.items.length === 0 && (
                  <span className="text-caption text-ink-3">Nothing labelled yet.</span>
                )}
                {draft.items.map((item, idx) => (
                  <span
                    key={`${item.name}-${idx}`}
                    className="h-8 px-3 rounded-pill text-[12.5px] bg-white border border-line text-ink-2 inline-flex items-center"
                  >
                    {item.name}
                    {item.portion ? ` · ${item.portion}` : ''}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-eyebrow uppercase text-ink-3 mb-2">Estimated nutrients</div>
            <div className="grid grid-cols-4 gap-2">
              <MacroField
                label="kcal"
                value={draft.calories}
                max={6000}
                onChange={(n) => editMacro('calories', n)}
              />
              <MacroField
                label="protein"
                value={draft.proteinG}
                suffix="g"
                max={400}
                step={0.1}
                onChange={(n) => editMacro('protein', n)}
              />
              <MacroField
                label="carbs"
                value={draft.carbsG}
                suffix="g"
                max={600}
                step={0.1}
                onChange={(n) => editMacro('carbs', n)}
              />
              <MacroField
                label="fat"
                value={draft.fatG}
                suffix="g"
                max={300}
                step={0.1}
                onChange={(n) => editMacro('fat', n)}
              />
            </div>
            <p className="text-caption text-ink-3 mt-2 leading-relaxed">
              Estimates only. Ingredients and portion size can change these values.
            </p>
          </div>

          <div>
            <div className="text-[13.5px] font-semibold text-ink mb-2">
              Did the photo include the whole meal?
            </div>
            <div className="flex flex-wrap gap-2">
              <Choice
                label="Yes"
                active={draft.includedWhole}
                onClick={() => setDraft({ ...draft, includedWhole: true, missingNote: '' })}
              />
              <Choice
                label="No, add something"
                active={!draft.includedWhole}
                onClick={() => setDraft({ ...draft, includedWhole: false })}
              />
            </div>
            {!draft.includedWhole && (
              <div className="mt-3">
                <Input
                  placeholder="What was missing, e.g. a drink or extra rice"
                  value={draft.missingNote}
                  onChange={(e) => setDraft({ ...draft, missingNote: e.target.value })}
                  maxLength={280}
                />
              </div>
            )}
          </div>

          <div>
            <div className="text-[13.5px] font-semibold text-ink mb-2">How much did you eat?</div>
            <div className="flex flex-wrap gap-2">
              {EATEN_AMOUNTS.map((amount) => (
                <Choice
                  key={amount.id}
                  label={amount.label}
                  active={draft.eatenAmount === amount.id}
                  onClick={() => setEatenAmount(amount.id)}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[16px] bg-sage-wash px-4 py-3 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-sage-deep mt-0.5 shrink-0" strokeWidth={2} />
            <p className="text-caption text-ink-2 leading-relaxed">
              Saving records this meal only. It does not tell BioSense what you ate for the rest of the day.
            </p>
          </div>

          <Button variant="primary" size="lg" fullWidth loading={saving} onClick={() => void saveDraft()}>
            Save meal observation
          </Button>
          <button
            type="button"
            onClick={discardDraft}
            className="w-full text-center text-[13.5px] font-medium text-ink-3 hover:text-ink-2"
          >
            Discard
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto fade-up space-y-5">
      <button
        type="button"
        onClick={() => router.push('/dashboard')}
        className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Home
      </button>

      <header className="flex items-start gap-4">
        <IconBadge icon={Utensils} size="xl" tone="amber" />
        <div className="flex-1">
          <div className="text-eyebrow uppercase text-sage-deep mb-1">Meals</div>
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1]">
            Log a <span className="italic-accent">meal.</span>
          </h1>
          <p className="text-body-sm text-ink-2 mt-2 leading-relaxed max-w-[54ch]">
            Photograph the portion you plan to eat. BioSense will estimate what it can see, then ask you to review it.
          </p>
        </div>
      </header>

      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous day"
          onClick={() => setDate((current) => shiftDateParam(current, -1))}
          className="w-9 h-9 rounded-full inline-flex items-center justify-center text-ink-2 hover:bg-[rgba(26,28,26,0.04)]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="text-[15px] font-semibold text-ink">{dayHeading(date)}</div>
          {!viewingToday && (
            <button
              type="button"
              className="text-caption text-sage-deep font-medium"
              onClick={() => setDate(todayDateParam())}
            >
              Back to today
            </button>
          )}
        </div>
        <button
          type="button"
          aria-label="Next day"
          disabled={viewingToday}
          onClick={() => setDate((current) => shiftDateParam(current, 1))}
          className="w-9 h-9 rounded-full inline-flex items-center justify-center text-ink-2 hover:bg-[rgba(26,28,26,0.04)] disabled:opacity-30"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-card p-4 bg-rose-tint border border-[rgba(201,122,122,0.28)] space-y-3"
        >
          <p className="text-body-sm text-ink leading-relaxed">{error}</p>
          <Button
            variant="subtle"
            size="sm"
            onClick={() => {
              setError(null)
              if (mode === 'plate') openPlateCamera()
              else ingredientCameraRef.current?.click()
            }}
          >
            Try again
          </Button>
        </div>
      )}

      <Card padding="md">
        <div className="text-eyebrow uppercase text-ink-3 mb-1">Meals logged {viewingToday ? 'today' : dayHeading(date).toLowerCase()}</div>
        <div className="text-[28px] font-semibold tracking-tight text-ink leading-none">
          {meals.length} {mealWord}
        </div>
        <p className="text-caption text-ink-2 mt-2">
          {meals.length === 0
            ? 'No meal observations for this day. That does not mean meals were skipped.'
            : `Estimated from ${meals.length} logged ${mealWord}`}
        </p>
        {meals.length > 0 && (
          <>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <MacroStat label="kcal" value={`~${Math.round(totals.calories / 10) * 10}`} />
              <MacroStat label="protein" value={`~${Math.round(totals.proteinG)}g`} />
              <MacroStat label="carbs" value={`~${Math.round(totals.carbsG)}g`} />
              <MacroStat label="fat" value={`~${Math.round(totals.fatG)}g`} />
            </div>
            <p className="text-caption text-ink-3 mt-3 leading-relaxed">
              This may not represent everything you ate or drank {viewingToday ? 'today' : 'that day'}.
            </p>
          </>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMode('plate')}
          className={cn(
            'h-11 rounded-pill text-[13px] font-semibold border',
            mode === 'plate'
              ? 'bg-sage-wash border-accent-ring text-sage-deep'
              : 'bg-white border-line text-ink-2',
          )}
        >
          Whole plate
        </button>
        <button
          type="button"
          onClick={() => setMode('ingredients')}
          className={cn(
            'h-11 rounded-pill text-[13px] font-semibold border',
            mode === 'ingredients'
              ? 'bg-sage-wash border-accent-ring text-sage-deep'
              : 'bg-white border-line text-ink-2',
          )}
        >
          Ingredients
        </button>
      </div>

      {mode === 'plate' ? (
        <Card>
          <div className="text-eyebrow uppercase text-ink-3 mb-2">Whole plate</div>
          <p className="text-caption text-ink-2 mb-3 leading-relaxed">
            Photograph the portion you plan to eat. Add a note for oils, sauces, drinks or anything outside the photo.
          </p>
          <Input
            placeholder="e.g. extra rice, dressing, or half the portion"
            value={plateNote}
            onChange={(e) => setPlateNote(e.target.value)}
            maxLength={280}
          />
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              variant="primary"
              size="lg"
              loading={reading}
              onClick={openPlateCamera}
            >
              <Camera className="w-4 h-4" />
              {reading ? 'Reading the plate' : 'Take photo'}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              disabled={reading}
              onClick={() => plateLibraryRef.current?.click()}
            >
              <ImageIcon className="w-4 h-4" />
              Library
            </Button>
          </div>
          <input
            ref={plateCameraRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            className="hidden"
            onChange={(e) => void onPlateFile(e.target.files?.[0])}
          />
          <input
            ref={plateLibraryRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => void onPlateFile(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => setPhotoPolicyOpen((open) => !open)}
            className="text-caption text-sage-deep underline-offset-2 hover:underline mt-3"
          >
            How your photo is used
          </button>
          {photoPolicyOpen && (
            <p className="text-caption text-ink-3 mt-2 leading-relaxed">
              Photos are read once to estimate what is on the plate. They are not stored. An estimate is never saved until you review and confirm it.
            </p>
          )}
        </Card>
      ) : (
        <Card>
          <div className="text-eyebrow uppercase text-ink-3 mb-2">Build from ingredients</div>
          <p className="text-caption text-ink-2 mb-3 leading-relaxed">
            Photo each pack or ingredient, with a note such as &quot;having half this pack&quot;. Then create the meal. Brand names on packs are looked up for a closer estimate.
          </p>
          <Input
            placeholder='Note for the next photo, e.g. "half this pack"'
            value={ingredientNote}
            onChange={(e) => setIngredientNote(e.target.value)}
            maxLength={280}
          />
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              variant="ghost"
              size="lg"
              disabled={reading}
              onClick={() => ingredientCameraRef.current?.click()}
            >
              <Camera className="w-4 h-4" />
              Add photo
            </Button>
            <Button
              variant="ghost"
              size="lg"
              disabled={reading}
              onClick={() => ingredientLibraryRef.current?.click()}
            >
              <ImageIcon className="w-4 h-4" />
              Library
            </Button>
          </div>
          <input
            ref={ingredientCameraRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            className="hidden"
            onChange={(e) => addIngredient(e.target.files?.[0])}
          />
          <input
            ref={ingredientLibraryRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => addIngredient(e.target.files?.[0])}
          />

          {ingredients.length > 0 && (
            <ul className="mt-4 space-y-2">
              {ingredients.map((item, index) => (
                <li key={item.id} className="flex items-start gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.previewUrl}
                    alt=""
                    className="w-12 h-12 rounded-[10px] object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-caption text-ink-3">Photo {index + 1}</div>
                    <p className="text-body-sm text-ink leading-snug">
                      {item.note || 'No note'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeIngredient(item.id)}
                    className="text-ink-3 hover:text-rose p-1"
                    aria-label="Remove ingredient"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-4"
            loading={reading}
            disabled={ingredients.length === 0}
            onClick={() => void createFromIngredients()}
          >
            <Plus className="w-4 h-4" />
            {reading ? 'Creating meal' : 'Create meal'}
          </Button>
        </Card>
      )}

      <div className="space-y-3">
        <div className="text-eyebrow uppercase text-ink-3">Logged meals</div>
        {meals.length === 0 && (
          <p className="text-body-sm text-ink-3 leading-relaxed">
            Add as many meals as you like. Totals only cover what you photograph.
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
                {aboutCalories(meal.calories, meal.confidence)} kcal · {estimatedGrams(meal.proteinG)} protein
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

function Choice({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-10 px-4 rounded-pill text-[13px] font-semibold border',
        active
          ? 'bg-sage-deep text-white border-sage-deep'
          : 'bg-white border-line text-ink-2',
      )}
    >
      {label}
    </button>
  )
}

function MacroStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.1em] text-ink-3">{label}</div>
      <div className="text-[13px] font-semibold text-ink tabular-nums leading-snug">{value}</div>
    </div>
  )
}

function MacroField({
  label,
  value,
  suffix,
  max,
  step = 1,
  onChange,
}: {
  label: string
  value: number
  suffix?: string
  max: number
  step?: number
  onChange: (n: number) => void
}) {
  return (
    <label className="block min-w-0 rounded-[12px] border border-line bg-white px-2 py-2 focus-within:border-[var(--a-ring)] focus-within:ring-2 focus-within:ring-[rgba(111,143,107,0.10)]">
      <span className="text-[10px] uppercase tracking-[0.1em] text-ink-3">{label}</span>
      <span className="flex items-baseline gap-0.5">
        <input
          type="number"
          inputMode={step < 1 ? 'decimal' : 'numeric'}
          min={0}
          max={max}
          step={step}
          value={Number.isFinite(value) ? String(value) : ''}
          onChange={(e) => onChange(Math.max(0, Math.min(max, Number(e.target.value) || 0)))}
          className="w-full min-w-0 bg-transparent p-0 text-[13px] font-semibold text-ink tabular-nums leading-snug outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label={label}
        />
        {suffix ? <span className="text-[11px] text-ink-3 shrink-0">{suffix}</span> : null}
      </span>
    </label>
  )
}
