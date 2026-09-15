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
  usedWebLookup: boolean
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
        ? enforceOutputSafety(parsed.assumptions.trim().slice(0, 400))
        : 'Portion size was estimated from the photo.',
    usedWebLookup: parsed.usedWebLookup === true,
  }
}

export async function analyseMealPhoto(params: {
  buffer: Buffer
  mime: string
  note?: string
}): Promise<MealAnalysis> {
  return analyseMealPhotos({
    mode: 'plate',
    images: [{ buffer: params.buffer, mime: params.mime }],
    notes: [params.note ?? ''],
  })
}

export async function analyseMealPhotos(params: {
  mode: 'plate' | 'ingredients'
  images: { buffer: Buffer; mime: string }[]
  notes: string[]
}): Promise<MealAnalysis> {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'placeholder') {
    throw new Error('AI is not configured')
  }
  if (params.images.length === 0) {
    return { isMeal: false, reason: 'Please add at least one photo.' }
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const noteLines = params.images
    .map((_, i) => {
      const note = params.notes[i]?.trim()
      return note
        ? `Photo ${i + 1} note: ${note.slice(0, 280)}`
        : `Photo ${i + 1}: no extra note.`
    })
    .join('\n')

  const task =
    params.mode === 'ingredients'
      ? 'These photos are ingredients or packs that make one meal. Combine them. Apply each note to that photo only (for example "half this pack"). Search the web for readable brand names.'
      : 'This is one plated meal or a single pack. Apply the member note to the portion. If a brand is readable, search the web for that product.'

  const userText = `${task}\n${noteLines}\nReturn JSON only.`

  const parsed =
    (await analyseWithSearch(client, params.images, userText)) ??
    (await analyseWithVisionOnly(client, params.images, userText))

  if (!parsed) {
    return {
      isMeal: false,
      reason: 'Could not read those photos clearly. Try a brighter, closer shot.',
    }
  }
  return parsed
}

async function analyseWithSearch(
  client: OpenAI,
  images: { buffer: Buffer; mime: string }[],
  userText: string,
): Promise<MealAnalysis | null> {
  try {
    const res = await client.responses.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o',
      instructions: MEAL_ANALYSIS_PROMPT,
      tools: [{ type: 'web_search' }],
      input: [
        {
          role: 'user',
          content: [
            { type: 'input_text', text: userText },
            ...images.map((image) => ({
              type: 'input_image' as const,
              image_url: `data:${image.mime};base64,${image.buffer.toString('base64')}`,
              detail: 'auto' as const,
            })),
          ],
        },
      ],
    })
    return parseMealAnalysis(res.output_text ?? '')
  } catch (err) {
    console.error('Meal web lookup failed, using photo only:', err)
    return null
  }
}

async function analyseWithVisionOnly(
  client: OpenAI,
  images: { buffer: Buffer; mime: string }[],
  userText: string,
): Promise<MealAnalysis | null> {
  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o',
    max_tokens: 1000,
    store: false,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: MEAL_ANALYSIS_PROMPT },
      {
        role: 'user',
        content: [
          { type: 'text', text: userText },
          ...images.map((image) => ({
            type: 'image_url' as const,
            image_url: {
              url: `data:${image.mime};base64,${image.buffer.toString('base64')}`,
            },
          })),
        ],
      },
    ],
  })
  return parseMealAnalysis(res.choices[0]?.message?.content ?? '')
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
