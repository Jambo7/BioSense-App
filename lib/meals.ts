import OpenAI from 'openai'
import { MEAL_ANALYSIS_PROMPT } from '@/lib/claude'
import { enforceOutputSafety } from '@/lib/safety-gate'

export const MEAL_SLOTS = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snack', label: 'Snack' },
] as const

export type MealSlot = (typeof MEAL_SLOTS)[number]['id']

export interface MealItem {
  name: string
  portion: string
}

export interface MealEstimate {
  isMeal: true
  title: string
  items: MealItem[]
  calories: number
  proteinG: number
  carbsG: number
  fatG: number
  fibreG: number | null
  confidence: 'high' | 'medium' | 'low'
  assumptions: string
}

export interface MealReject {
  isMeal: false
  reason: string
}

export type MealAnalysis = MealEstimate | MealReject

export function defaultMealSlot(hour = new Date().getHours()): MealSlot {
  if (hour >= 6 && hour < 11) return 'breakfast'
  if (hour >= 11 && hour < 15) return 'lunch'
  if (hour >= 15 && hour < 17) return 'snack'
  if (hour >= 17 && hour < 22) return 'dinner'
  return 'snack'
}

export function slotLabel(slot: string): string {
  return MEAL_SLOTS.find((s) => s.id === slot)?.label ?? 'Meal'
}

export function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T00:00:00.000Z`)
  return Number.isNaN(date.getTime()) ? null : date
}

export function todayDateParam(now = new Date()): string {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function asNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }
  return null
}

function clampMacro(value: number, max: number): number {
  return Math.max(0, Math.min(max, Math.round(value)))
}

export function parseMealAnalysis(raw: string): MealAnalysis | null {
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>
  } catch {
    return null
  }

  if (parsed.isMeal === false) {
    const reason =
      typeof parsed.reason === 'string' && parsed.reason.trim()
        ? parsed.reason.trim()
        : 'This photo does not look like a meal.'
    return { isMeal: false, reason: enforceOutputSafety(reason) }
  }

  const calories = asNumber(parsed.calories)
  const proteinG = asNumber(parsed.proteinG)
  const carbsG = asNumber(parsed.carbsG)
  const fatG = asNumber(parsed.fatG)
  if (calories == null || proteinG == null || carbsG == null || fatG == null) return null

  const rawItems = Array.isArray(parsed.items) ? parsed.items : []
  const items: MealItem[] = rawItems
    .map((item) => item as Record<string, unknown>)
    .filter((item) => typeof item.name === 'string' && item.name.trim())
    .slice(0, 12)
    .map((item) => ({
      name: String(item.name).trim().slice(0, 80),
      portion: typeof item.portion === 'string' ? item.portion.trim().slice(0, 80) : '',
    }))

  const confidence =
    parsed.confidence === 'high' || parsed.confidence === 'low' ? parsed.confidence : 'medium'

  const fibre = asNumber(parsed.fibreG)

  return {
    isMeal: true,
    title:
      typeof parsed.title === 'string' && parsed.title.trim()
        ? parsed.title.trim().slice(0, 80)
        : 'Logged meal',
    items,
    calories: clampMacro(calories, 6000),
    proteinG: clampMacro(proteinG, 400),
    carbsG: clampMacro(carbsG, 600),
    fatG: clampMacro(fatG, 300),
    fibreG: fibre == null ? null : clampMacro(fibre, 120),
    confidence,
    assumptions:
      typeof parsed.assumptions === 'string' && parsed.assumptions.trim()
        ? enforceOutputSafety(parsed.assumptions.trim().slice(0, 280))
        : 'Portion size was estimated from the photo.',
  }
}

export async function analyseMealPhoto(params: {
  buffer: Buffer
  mime: string
  note?: string
}): Promise<MealAnalysis> {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'placeholder') {
    throw new Error('AI is not configured')
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const b64 = params.buffer.toString('base64')
  const hint = params.note?.trim()
    ? `The member added this note about the meal: ${params.note.trim().slice(0, 280)}`
    : 'The member did not add a note.'

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o',
    max_tokens: 800,
    store: false,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: MEAL_ANALYSIS_PROMPT },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `${hint}\nEstimate the meal in the photo. Return JSON only.`,
          },
          {
            type: 'image_url',
            image_url: { url: `data:${params.mime};base64,${b64}` },
          },
        ],
      },
    ],
  })

  const parsed = parseMealAnalysis(res.choices[0]?.message?.content ?? '')
  if (!parsed) {
    return {
      isMeal: false,
      reason: 'Could not read that photo clearly. Try a brighter, closer shot of the plate.',
    }
  }
  return parsed
}

export function totalsFor(meals: Array<{ calories: number; proteinG: number; carbsG: number; fatG: number }>) {
  return meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      proteinG: acc.proteinG + meal.proteinG,
      carbsG: acc.carbsG + meal.carbsG,
      fatG: acc.fatG + meal.fatG,
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 },
  )
}

export function mealChatSummary(
  rows: Array<{
    date: Date
    slot: string
    title: string
    calories: number
    proteinG: number
    carbsG: number
    fatG: number
  }>,
): string {
  if (rows.length === 0) return 'No meals logged recently.'
  return rows
    .map((row) => {
      const day = row.date.toISOString().split('T')[0]
      return `${day} ${row.slot}: ${row.title} (~${row.calories} kcal, P${Math.round(row.proteinG)} C${Math.round(row.carbsG)} F${Math.round(row.fatG)}). Estimates only.`
    })
    .join('\n')
}
