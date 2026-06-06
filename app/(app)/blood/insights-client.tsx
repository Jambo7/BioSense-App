'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Filter,
  Leaf,
  Droplet,
  Sun,
  Flame,
  Heart,
  Activity,
  Beaker,
  Pill as PillIcon,
  ArrowRight,
  ArrowLeft,
  Upload,
  Moon,
  Wind,
  Footprints,
  UtensilsCrossed,
  Sparkles,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Dumbbell,
  ShieldCheck,
  Check,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { groupMarkersByCategory, personalisedRec, BIOMARKER_CATEGORIES, categoryForMarker } from '@/lib/biomarkers'
import { BiomarkerGuidanceButton } from '@/components/biomarker-guidance'
import { Card } from '@/components/ui/card'
import { IconBadge, type IconBadgeTone } from '@/components/ui/icon-badge'
import { SparkLine } from '@/components/ui/spark-line'

interface BloodMarker {
  name: string
  value: number
  unit?: string
  refMin?: number
  refMax?: number
  tier: 'T1' | 'T2' | 'T3'
}

interface InsightsClientProps {
  hasResult: boolean
  drawDate: string | null
  totalCount: number
  t1: number
  t2: number
  t3: number
  history: { date: string; inRangePct: number }[]
  historyTotal: number
  markers: BloodMarker[]
}

// ── Status mapping ───────────────────────────────────────────────────────
// T1 → In range  /  T2 → Optimise  /  T3 → Out of range (per v7 spec image 5).
type Status = 'in_range' | 'optimise' | 'out_of_range' | 'no_data'
function tierToStatus(tier: 'T1' | 'T2' | 'T3'): Status {
  return tier === 'T1' ? 'in_range' : tier === 'T2' ? 'optimise' : 'out_of_range'
}
const STATUS_META: Record<Status, { label: string; cls: string; dot: string }> = {
  in_range:     { label: 'In range',     cls: 'bg-[rgba(168,191,163,0.22)] text-sage-deep ring-1 ring-inset ring-[rgba(111,143,107,0.22)]', dot: '#6F8F6B' },
  optimise:     { label: 'Optimise',     cls: 'bg-[rgba(237,198,138,0.30)] text-[#A77530] ring-1 ring-inset ring-[rgba(217,160,91,0.30)]',  dot: '#D9A05B' },
  out_of_range: { label: 'Out of range', cls: 'bg-[rgba(233,201,201,0.40)] text-[#A85454] ring-1 ring-inset ring-[rgba(201,122,122,0.30)]', dot: '#C97A7A' },
  no_data:      { label: 'No data',      cls: 'bg-[rgba(26,28,26,0.06)]   text-ink-2 ring-1 ring-inset ring-[rgba(26,28,26,0.08)]',         dot: '#8A8C8A' },
}

// ── Mock biomarker set ────────────────────────────────────────────────────
// Used when the user hasn't uploaded a real panel yet. Mirrors v7 image 5:
// Ferritin, Vitamin D, Vitamin B12, Omega-3 Index, CRP, HbA1c, Testosterone.
const MOCK_MARKERS: (BloodMarker & { icon: LucideIcon; sub: string; series: number[] })[] = [
  { name: 'Ferritin',         value: 32,  unit: 'µg/L',   refMin: 70,  refMax: 120, tier: 'T2', icon: Beaker,   sub: 'Iron stores',           series: [45, 42, 40, 38, 36, 34, 33, 32] },
  { name: 'Vitamin D',        value: 42,  unit: 'ng/mL',  refMin: 30,  refMax: 70,  tier: 'T1', icon: Sun,      sub: 'Bone & immune health',  series: [38, 39, 41, 42, 43, 42, 42, 42] },
  { name: 'Vitamin B12',      value: 512, unit: 'pmol/L', refMin: 200, refMax: 900, tier: 'T1', icon: Beaker,   sub: 'Energy & cognitive',    series: [480, 490, 495, 500, 505, 510, 512, 512] },
  { name: 'Omega-3 Index',    value: 6.2, unit: '%',      refMin: 8,   refMax: 12,  tier: 'T2', icon: Heart,    sub: 'Heart & brain health',  series: [4.5, 5.0, 5.4, 5.7, 5.9, 6.0, 6.1, 6.2] },
  { name: 'C-Reactive Protein', value: 1.8, unit: 'mg/L', refMin: 0,   refMax: 3,   tier: 'T1', icon: Flame,    sub: 'Inflammation',          series: [2.5, 2.3, 2.1, 2.0, 1.9, 1.8, 1.8, 1.8] },
  { name: 'HbA1c',            value: 5.2, unit: '%',      refMin: 4,   refMax: 5.7, tier: 'T1', icon: Droplet,  sub: 'Blood sugar control',   series: [5.4, 5.3, 5.3, 5.2, 5.2, 5.2, 5.2, 5.2] },
  { name: 'Testosterone',     value: 18.4, unit: 'nmol/L',refMin: 10,  refMax: 35,  tier: 'T1', icon: Activity, sub: 'Hormonal health',       series: [17.5, 17.8, 18.0, 18.2, 18.3, 18.4, 18.4, 18.4] },
]

// ── Per-biomarker drill-down content (v7 image 6) ─────────────────────────
// When a single biomarker is selected, the Comparisons / Explanations /
// Recommendations tabs scope down to that marker. This map holds the
// reference points, plain-language explanation copy, lifestyle steps and
// supplement suggestions for each known marker. Unknown (real uploaded)
// markers fall back to `genericContent()`.
interface MarkerContent {
  previousResult?: number
  previousLabel?: string
  personalMin?: number
  personalMax?: number
  populationAvg?: number
  populationLabel?: string
  trendNote: string
  explainIntro: string
  whyItMatters: string
  lowMeans: string
  highMeans: string
  factors: string
  relatesToHealth: string
  lifestyle: { icon: LucideIcon; title: string; detail: string }[]
  supplements: { name: string; detail: string; tag: string }[]
}

function contentKey(name: string): string {
  const k = name.toLowerCase()
  if (k.includes('ferritin') || k.includes('iron'))         return 'ferritin'
  if (k.includes('vitamin d'))                               return 'vitaminD'
  if (k.includes('b12') || k.includes('vitamin b'))          return 'b12'
  if (k.includes('omega'))                                   return 'omega3'
  if (k.includes('crp') || k.includes('c-reactive'))         return 'crp'
  if (k.includes('hba1c') || k.includes('glucose'))          return 'hba1c'
  if (k.includes('testosterone') || k.includes('hormone'))   return 'testosterone'
  return 'generic'
}

// Stable category-identity colour per biomarker (independent of its status,
// which is shown separately via the pill). Gives the panel the multi-colour
// feel from the brief while keeping the red/amber/green status signal intact.
const MARKER_TONES: Record<string, IconBadgeTone> = {
  ferritin:     'rose',
  vitaminD:     'amber',
  b12:          'violet',
  omega3:       'sky',
  crp:          'teal',
  hba1c:        'sage',
  testosterone: 'violet',
  generic:      'sage',
}
function markerTone(name: string): IconBadgeTone {
  return MARKER_TONES[contentKey(name)] ?? 'sage'
}

const BIOMARKER_CONTENT: Record<string, MarkerContent> = {
  ferritin: {
    previousResult: 45,
    previousLabel: '3 months ago',
    personalMin: 27,
    personalMax: 150,
    populationAvg: 60,
    populationLabel: 'Women 30–40',
    trendNote: 'Your ferritin has declined over the last 3 months and is below your optimal range.',
    explainIntro: 'Ferritin is a protein that stores iron in your body and releases it when needed.',
    whyItMatters: 'Ferritin reflects your iron stores. Low ferritin can lead to fatigue, poor recovery, weakened immune function and reduced exercise performance.',
    lowMeans: 'Low levels may cause tiredness, breathlessness, poor concentration and reduced exercise capacity as oxygen transport drops.',
    highMeans: 'High levels can indicate inflammation, infection or — less commonly — iron overload that may stress the liver over time.',
    factors: 'Diet (red meat, leafy greens), menstruation and blood loss, gut absorption, inflammation and recent illness all influence ferritin.',
    relatesToHealth: 'Healthy iron stores support daily energy, athletic recovery, immune resilience and cognitive sharpness.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Focus on iron-rich foods and vitamin C to enhance absorption.' },
      { icon: Dumbbell,        title: 'Training',  detail: 'Balance intensity and recovery to support iron levels.' },
      { icon: Moon,            title: 'Sleep',     detail: 'Quality sleep supports iron metabolism and energy.' },
      { icon: ShieldCheck,     title: 'Stress management', detail: 'Chronic stress can impact iron regulation.' },
    ],
    supplements: [
      { name: 'Iron (bisglycinate)', detail: 'May help increase iron stores.', tag: 'Consider' },
      { name: 'Vitamin C',           detail: 'Taken with iron to improve absorption.', tag: 'Consider' },
    ],
  },
  vitaminD: {
    previousResult: 38,
    previousLabel: '3 months ago',
    personalMin: 25,
    personalMax: 80,
    populationAvg: 35,
    populationLabel: 'Adults, UK',
    trendNote: 'Your vitamin D has risen steadily and now sits comfortably within your optimal range.',
    explainIntro: 'Vitamin D is a hormone-like nutrient your skin makes from sunlight, supporting bone, immune and mood health.',
    whyItMatters: 'Adequate vitamin D supports calcium absorption, immune defence, mood regulation and muscle function.',
    lowMeans: 'Low levels can cause fatigue, low mood, frequent illness and weaker bones over time.',
    highMeans: 'Very high levels — usually from over-supplementation — can raise blood calcium and stress the kidneys.',
    factors: 'Sun exposure, skin tone, latitude, season, body fat and supplementation all influence vitamin D.',
    relatesToHealth: 'Healthy vitamin D underpins resilient immunity, strong bones and stable mood through darker months.',
    lifestyle: [
      { icon: Sun,             title: 'Daylight',  detail: 'Short, regular daylight exposure helps maintain levels.' },
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Oily fish, eggs and fortified foods support vitamin D.' },
      { icon: Dumbbell,        title: 'Training',  detail: 'Outdoor activity combines movement with sunlight.' },
      { icon: Moon,            title: 'Sleep',     detail: 'Consistent rest supports overall hormone balance.' },
    ],
    supplements: [
      { name: 'Vitamin D3', detail: 'Helps maintain healthy vitamin D levels.', tag: 'Maintain' },
      { name: 'Vitamin K2', detail: 'Helps direct calcium toward your bones.', tag: 'Optional' },
    ],
  },
  b12: {
    previousResult: 500,
    previousLabel: '3 months ago',
    personalMin: 200,
    personalMax: 900,
    populationAvg: 450,
    populationLabel: 'Adults',
    trendNote: 'Your B12 is stable and well within a healthy range.',
    explainIntro: 'Vitamin B12 is essential for red blood cell formation, nerve function and energy production.',
    whyItMatters: 'B12 supports energy, focus and a healthy nervous system; deficiency develops slowly but can be significant.',
    lowMeans: 'Low levels may cause fatigue, tingling, poor memory and mood changes.',
    highMeans: 'High levels are usually harmless and often reflect supplementation.',
    factors: 'Diet (animal foods), gut absorption, age and certain medications influence B12.',
    relatesToHealth: 'Healthy B12 supports steady energy, clear thinking and long-term nerve health.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Meat, fish, eggs and dairy are rich in B12.' },
      { icon: Dumbbell,        title: 'Training',  detail: 'Adequate B12 supports recovery and energy.' },
      { icon: Moon,            title: 'Sleep',     detail: 'Rest supports overall metabolic health.' },
      { icon: ShieldCheck,     title: 'Stress management', detail: 'Manage stress to protect digestion and absorption.' },
    ],
    supplements: [
      { name: 'Vitamin B12 (methylcobalamin)', detail: 'Supports energy and nerve health.', tag: 'Maintain' },
    ],
  },
  omega3: {
    previousResult: 5.4,
    previousLabel: '3 months ago',
    personalMin: 4,
    personalMax: 12,
    populationAvg: 5,
    populationLabel: 'Western diets',
    trendNote: 'Your omega-3 index is improving but remains below the optimal zone.',
    explainIntro: 'The omega-3 index measures EPA and DHA in your red blood cells — key fats for heart and brain health.',
    whyItMatters: 'A higher omega-3 index is linked to better cardiovascular health, lower inflammation and brain function.',
    lowMeans: 'Low levels are associated with higher inflammation and reduced cardiovascular protection.',
    highMeans: 'Very high intakes are generally well tolerated; extremely high doses can thin the blood slightly.',
    factors: 'Intake of oily fish and omega-3 supplements is the main driver; cooking oils high in omega-6 can offset it.',
    relatesToHealth: 'A healthy omega-3 index supports your heart, brain and recovery from training.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Eat oily fish 2–3 times per week.' },
      { icon: Dumbbell,        title: 'Training',  detail: 'Omega-3s support recovery and joint comfort.' },
      { icon: Flame,           title: 'Inflammation', detail: 'Limit processed, omega-6-heavy foods.' },
      { icon: ShieldCheck,     title: 'Stress management', detail: 'Lower stress complements anti-inflammatory diet.' },
    ],
    supplements: [
      { name: 'Omega-3 (EPA/DHA)', detail: 'Helps raise your omega-3 index.', tag: 'Consider' },
    ],
  },
  crp: {
    previousResult: 2.5,
    previousLabel: '3 months ago',
    personalMin: 0,
    personalMax: 5,
    populationAvg: 2.2,
    populationLabel: 'Adults',
    trendNote: 'Your CRP has fallen and now sits within a healthy, low-inflammation range.',
    explainIntro: 'C-reactive protein (CRP) is made by the liver and rises when there is inflammation in the body.',
    whyItMatters: 'CRP is a sensitive marker of inflammation, which is linked to recovery, metabolic and cardiovascular health.',
    lowMeans: 'Low CRP reflects low background inflammation — generally a good sign.',
    highMeans: 'High levels can indicate infection, injury, or chronic inflammation that warrants attention.',
    factors: 'Infection, body fat, sleep, stress, smoking and diet all influence CRP.',
    relatesToHealth: 'Keeping CRP low supports recovery, energy and long-term cardiovascular health.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Anti-inflammatory, whole-food eating helps lower CRP.' },
      { icon: Moon,            title: 'Sleep',     detail: 'Consistent quality sleep reduces inflammation.' },
      { icon: ShieldCheck,     title: 'Stress management', detail: 'Lower chronic stress to keep inflammation down.' },
      { icon: Dumbbell,        title: 'Training',  detail: 'Regular moderate exercise reduces baseline inflammation.' },
    ],
    supplements: [
      { name: 'Omega-3 (EPA/DHA)', detail: 'May help support a healthy inflammatory response.', tag: 'Optional' },
    ],
  },
  hba1c: {
    previousResult: 5.4,
    previousLabel: '3 months ago',
    personalMin: 4,
    personalMax: 5.7,
    populationAvg: 5.4,
    populationLabel: 'Adults',
    trendNote: 'Your HbA1c is stable and within a healthy range for blood sugar control.',
    explainIntro: 'HbA1c reflects your average blood sugar over the past 2–3 months.',
    whyItMatters: 'HbA1c indicates how well your body manages blood sugar, a key driver of long-term metabolic health.',
    lowMeans: 'Lower values reflect well-controlled blood sugar.',
    highMeans: 'Higher levels suggest rising blood sugar and increased metabolic risk over time.',
    factors: 'Diet, body composition, activity, sleep and stress all influence blood sugar control.',
    relatesToHealth: 'Healthy HbA1c supports stable energy, mood and long-term metabolic health.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Prioritise fibre, protein and fewer refined carbs.' },
      { icon: Dumbbell,        title: 'Training',  detail: 'Regular activity improves insulin sensitivity.' },
      { icon: Moon,            title: 'Sleep',     detail: 'Good sleep supports blood sugar regulation.' },
      { icon: ShieldCheck,     title: 'Stress management', detail: 'Stress hormones can raise blood sugar.' },
    ],
    supplements: [
      { name: 'Magnesium', detail: 'May support healthy glucose metabolism.', tag: 'Optional' },
    ],
  },
  testosterone: {
    previousResult: 17.5,
    previousLabel: '3 months ago',
    personalMin: 10,
    personalMax: 35,
    populationAvg: 18,
    populationLabel: 'Men 30–40',
    trendNote: 'Your testosterone is stable and within a healthy range.',
    explainIntro: 'Testosterone is a key hormone for energy, muscle, mood and libido in both men and women.',
    whyItMatters: 'Balanced testosterone supports strength, recovery, motivation and overall wellbeing.',
    lowMeans: 'Low levels may cause low energy, reduced strength, low mood and reduced libido.',
    highMeans: 'Unusually high levels may need investigation depending on the source.',
    factors: 'Sleep, body composition, training, stress and age all influence testosterone.',
    relatesToHealth: 'Healthy testosterone supports body composition, recovery and day-to-day drive.',
    lifestyle: [
      { icon: Dumbbell,        title: 'Training',  detail: 'Resistance training supports healthy levels.' },
      { icon: Moon,            title: 'Sleep',     detail: 'Most testosterone is produced during deep sleep.' },
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Adequate protein, fats and micronutrients matter.' },
      { icon: ShieldCheck,     title: 'Stress management', detail: 'High cortisol can suppress testosterone.' },
    ],
    supplements: [
      { name: 'Vitamin D3', detail: 'Supports healthy testosterone when levels are low.', tag: 'Optional' },
      { name: 'Zinc',       detail: 'Involved in healthy testosterone production.', tag: 'Optional' },
    ],
  },
}

function genericContent(name: string, sub: string): MarkerContent {
  return {
    trendNote: `Your ${name.toLowerCase()} is tracked over time so you can see how it responds to your habits.`,
    explainIntro: `${name} is one of the markers we track to understand ${sub.toLowerCase() || 'your health'}.`,
    whyItMatters: `${name} gives insight into ${sub.toLowerCase() || 'your health'} and how it changes over time.`,
    lowMeans: 'Levels below the optimal range may be worth supporting through lifestyle and, where appropriate, supplementation.',
    highMeans: 'Levels above the optimal range can have several causes and are best interpreted alongside your other markers.',
    factors: 'Diet, activity, sleep, stress and your individual physiology all influence this marker.',
    relatesToHealth: 'Keeping this marker in its optimal range supports your broader health goals.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'A balanced, whole-food diet supports healthy levels.' },
      { icon: Dumbbell,        title: 'Training',  detail: 'Regular activity supports overall health.' },
      { icon: Moon,            title: 'Sleep',     detail: 'Quality sleep aids recovery and balance.' },
      { icon: ShieldCheck,     title: 'Stress management', detail: 'Managing stress supports your results.' },
    ],
    supplements: [],
  }
}

function getContent(name: string, sub: string): MarkerContent {
  const key = contentKey(name)
  return BIOMARKER_CONTENT[key] ?? genericContent(name, sub)
}

// ── Tabs ─────────────────────────────────────────────────────────────────
type Tab = 'list' | 'comparisons' | 'explanations' | 'recommendations'
const TABS: { id: Tab; label: string }[] = [
  { id: 'list',            label: 'Biomarker list'  },
  { id: 'explanations',    label: 'Explanations'    },
  { id: 'comparisons',     label: 'Comparisons'     },
  { id: 'recommendations', label: 'Recommendations' },
]

export function InsightsClient({ hasResult, drawDate, markers }: InsightsClientProps) {
  const [tab, setTab] = useState<Tab>('list')
  // The currently drilled-into biomarker (v7 image 6). `null` → overview
  // (v7 image 5). Selecting a marker scopes Comparisons / Explanations /
  // Recommendations to that single marker.
  const [selected, setSelected] = useState<string | null>(null)

  // Real markers preferred; fall back to mock so demo always feels populated.
  const visible = markers.length > 0
    ? markers.map((m) => ({
        ...m,
        icon: iconForMarker(m.name),
        sub:  subForMarker(m.name),
        series: undefined as number[] | undefined,
      }))
    : MOCK_MARKERS

  // Drill into a biomarker from list and jump to Explanations (3rd-June spec).
  function drillInto(name: string) {
    setSelected(name)
    setTab('explanations')
  }

  function goToComparisons(name: string) {
    setSelected(name)
    setTab('comparisons')
  }
  const clearSelection = () => setSelected(null)
  const selectedMarker = visible.find((m) => m.name === selected) ?? null

  return (
    <div className="max-w-3xl mx-auto fade-up space-y-5">
      {/* Header */}
      <header className="relative pt-2 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-eyebrow uppercase text-sage-deep mb-2">
              <Droplet className="w-3.5 h-3.5" strokeWidth={2.25} />
              <span>Biomarkers</span>
            </div>
            <h1 className="font-sans text-[28px] sm:text-[34px] text-ink tracking-tight leading-[1.04] max-w-[18ch] font-bold">
              Understand your biology
              <br />
              <span className="italic-accent text-[1.02em] text-sage-deep font-normal">
                through your blood data.
              </span>
            </h1>
            {drawDate && (
              <p className="text-caption text-ink-3 mt-2">
                Last upload:{' '}
                <Link href="/blood/history" className="text-sage-deep font-medium hover:underline">
                  {new Date(drawDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Link>
              </p>
            )}
          </div>
          <BiomarkerGuidanceButton />
        </div>
      </header>

      {/* Tab strip */}
      <div className="relative -mx-1 px-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {TABS.map((t) => {
            const active = t.id === tab
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  'shrink-0 h-9 px-3.5 rounded-pill text-[12.5px] font-medium transition-all',
                  active
                    ? 'btn-sage text-white'
                    : 'text-ink-2 tile tile-hover',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {tab === 'list' && (
        <ListTab markers={hasResult ? visible : []} hasReal={hasResult} onSelect={drillInto} />
      )}
      {tab === 'comparisons' && (
        <ComparisonsTab
          markers={visible}
          selected={selectedMarker}
          onSelect={setSelected}
          onClear={clearSelection}
        />
      )}
      {tab === 'explanations' && (
        <ExplanationsTab
          markers={visible}
          selected={selectedMarker}
          onSelect={setSelected}
          onClear={clearSelection}
          onGoToComparisons={goToComparisons}
        />
      )}
      {tab === 'recommendations' && (
        <RecommendationsTab
          markers={visible}
          selected={selectedMarker}
          onSelect={setSelected}
          onClear={clearSelection}
        />
      )}
    </div>
  )
}

// Shared marker shape used across the tabs once enriched with display meta.
type VMarker = BloodMarker & { icon: LucideIcon; sub: string; series?: number[] }

// ── Tab 1: BIOMARKER LIST ────────────────────────────────────────────────
function ListTab({
  markers,
  hasReal,
  onSelect,
}: {
  markers: VMarker[]
  hasReal: boolean
  onSelect: (name: string) => void
}) {
  const counts = markers.reduce(
    (acc, m) => {
      const s = tierToStatus(m.tier)
      acc[s] += 1
      return acc
    },
    { in_range: 0, optimise: 0, out_of_range: 0, no_data: 0 } as Record<Status, number>,
  )

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="AI summary"
        lead="Your biomarkers look"
        accent="balanced overall."
        body={
          hasReal
            ? 'Iron stores, vitamin D and inflammation markers could be improved.'
            : 'Upload your first lab panel to see your real biomarkers in this view.'
        }
        decoration="leaves"
        cta={
          hasReal
            ? { label: 'View details', href: '/blood/markers' }
            : { label: 'Upload first lab', href: '/blood/upload', icon: Upload }
        }
      />

      <Card variant="glass" padding="lg">
        {/* Search + filter (visual scaffolding; wiring deferred) */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 h-10 rounded-pill bg-white/70 ring-1 ring-inset ring-[rgba(184,168,144,0.22)] px-3.5">
            <Search className="w-4 h-4 text-ink-3" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search biomarkers..."
              className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-ink-3 outline-none"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-pill text-[12px] font-medium text-sage-deep bg-white/70 ring-1 ring-inset ring-[rgba(111,143,107,0.22)] hover:bg-white transition-colors"
          >
            <Filter className="w-3.5 h-3.5" strokeWidth={2} />
            Filter
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <LegendChip status="in_range"     count={counts.in_range}     />
          <LegendChip status="optimise"     count={counts.optimise}     />
          <LegendChip status="out_of_range" count={counts.out_of_range} />
          <LegendChip status="no_data"      count={counts.no_data}      />
        </div>

        <div className="space-y-5">
          {groupMarkersByCategory(markers).map(({ category, items }) => {
            if (!hasReal && items.length === 0) {
              return (
                <div key={category.id}>
                  <div className="text-eyebrow uppercase text-ink-3 mb-1.5">{category.label}</div>
                  <p className="text-[11.5px] text-ink-3 italic px-1">No biomarkers yet — upload a result to populate this section.</p>
                </div>
              )
            }
            if (items.length === 0) return null
            return (
              <div key={category.id}>
                <div className="text-eyebrow uppercase text-ink-3 mb-1.5">{category.label}</div>
                <div className="space-y-2.5">
                  {items.map((m) => {
                    const status = tierToStatus(m.tier)
                    const meta = STATUS_META[status]
                    return (
                      <button
                        key={m.name}
                        type="button"
                        onClick={() => onSelect(m.name)}
                        className="w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile tile-hover group"
                      >
                        <IconBadge icon={m.icon} tone={markerTone(m.name)} variant="tint" size="md" />
                        <div className="flex-1 min-w-0">
                          <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                            {m.name}
                          </div>
                          <div className="text-[11px] text-ink-3 leading-snug mt-0.5">
                            {m.sub}
                          </div>
                        </div>
                        <div className="text-right shrink-0 min-w-[64px]">
                          <div className="font-sans text-[13px] font-semibold text-ink leading-none tabular-nums">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-ink-3 mt-1">{m.unit}</div>
                        </div>
                        {m.series && m.series.length >= 2 && (
                          <div className="shrink-0 w-[64px] hidden sm:block">
                            <SparkLine
                              values={m.series}
                              width={64}
                              height={26}
                              tone={status === 'in_range' ? 'sage' : status === 'optimise' ? 'amber' : 'rose'}
                              showFill
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide shrink-0 whitespace-nowrap',
                            meta.cls,
                          )}
                        >
                          {meta.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ── Tab 2: COMPARISONS ───────────────────────────────────────────────────
function ComparisonsTab({
  markers,
  selected,
  onSelect,
  onClear,
}: {
  markers: VMarker[]
  selected: VMarker | null
  onSelect: (name: string) => void
  onClear: () => void
}) {
  if (selected) {
    return (
      <ComparisonsDrill
        marker={selected}
        markers={markers}
        onSelect={onSelect}
        onClear={onClear}
      />
    )
  }
  return <ComparisonsOverview markers={markers} onSelect={onSelect} />
}

function ComparisonsOverview({
  markers,
  onSelect,
}: {
  markers: VMarker[]
  onSelect: (name: string) => void
}) {
  const [filter, setFilter] = useState<'all' | 'out' | 'optimise'>('all')
  const filtered = markers.filter((m) => {
    const s = tierToStatus(m.tier)
    if (filter === 'out') return s === 'out_of_range'
    if (filter === 'optimise') return s === 'optimise'
    return true
  })
  const outCount = markers.filter((m) => tierToStatus(m.tier) === 'out_of_range').length
  const optCount = markers.filter((m) => tierToStatus(m.tier) === 'optimise').length

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Comparisons overview"
        lead="See how your results compare"
        accent="to key reference points."
        body="These comparisons help you understand your results in context — against your own baseline, the optimal range, and the population average."
        decoration="leaves"
      />

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-2.5">Compare by</div>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <FilterPill active={filter === 'all'}      onClick={() => setFilter('all')}>
            All biomarkers
          </FilterPill>
          <FilterPill active={filter === 'out'}      onClick={() => setFilter('out')}>
            Out of range ({outCount})
          </FilterPill>
          <FilterPill active={filter === 'optimise'} onClick={() => setFilter('optimise')}>
            Optimise ({optCount})
          </FilterPill>
        </div>

        <div className="space-y-3">
          {filtered.map((m) => {
            const status = tierToStatus(m.tier)
            const meta   = STATUS_META[status]
            // Build a synthetic personal-vs-optimal track:
            // pos 0–100% mapped to actual value placement vs combined range.
            const trackMin = Math.min(m.value, m.refMin ?? m.value)
            const trackMax = Math.max(m.value, m.refMax ?? m.value)
            const span     = trackMax - trackMin || 1
            const valPos    = ((m.value - trackMin) / span) * 100
            const refMinPct = m.refMin != null ? ((m.refMin - trackMin) / span) * 100 : null
            const refMaxPct = m.refMax != null ? ((m.refMax - trackMin) / span) * 100 : null
            return (
              <button
                key={m.name}
                type="button"
                onClick={() => onSelect(m.name)}
                className="w-full text-left p-3 sm:p-3.5 rounded-card tile tile-hover group"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconBadge icon={m.icon} tone={markerTone(m.name)} variant="tint" size="sm" />
                    <div className="min-w-0">
                      <div className="font-sans text-[13px] font-semibold text-ink leading-tight">
                        {m.name}
                      </div>
                      <div className="text-[10.5px] text-ink-3 leading-snug">{m.sub}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide',
                        meta.cls,
                      )}
                    >
                      {meta.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-ink-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10.5px] text-ink-3 mb-1.5">
                  <span>Your result <span className="font-semibold text-ink ml-1">{m.value} {m.unit}</span></span>
                  <span className="text-center">Personal range</span>
                  <span className="text-right">Optimal range</span>
                </div>

                {/* Track with optimal range band + value marker */}
                <div className="relative h-2.5 rounded-pill bg-[rgba(26,28,26,0.05)] overflow-hidden">
                  {refMinPct != null && refMaxPct != null && (
                    <div
                      className="absolute top-0 h-full bg-[rgba(168,191,163,0.45)]"
                      style={{ left: `${refMinPct}%`, width: `${refMaxPct - refMinPct}%` }}
                    />
                  )}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-2 ring-white shadow-[0_2px_4px_rgba(26,28,26,0.18)]"
                    style={{ left: `calc(${valPos}% - 6px)`, background: meta.dot }}
                  />
                </div>

                {m.refMin != null && m.refMax != null && (
                  <div className="mt-1.5 text-[10px] text-ink-3 text-right">
                    Optimal: {m.refMin}–{m.refMax} {m.unit}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ── Comparisons: single-biomarker drill-down (v7 image 6) ─────────────────
function ComparisonsDrill({
  marker,
  markers,
  onSelect,
  onClear,
}: {
  marker: VMarker
  markers: VMarker[]
  onSelect: (name: string) => void
  onClear: () => void
}) {
  const status = tierToStatus(marker.tier)
  const meta = STATUS_META[status]
  const c = getContent(marker.name, marker.sub)
  const unit = marker.unit ?? ''

  // Build a shared scale spanning every reference point so all the bars
  // line up against the same axis.
  const pts: number[] = [marker.value]
  if (c.previousResult != null) pts.push(c.previousResult)
  if (c.personalMin != null) pts.push(c.personalMin)
  if (c.personalMax != null) pts.push(c.personalMax)
  if (marker.refMin != null) pts.push(marker.refMin)
  if (marker.refMax != null) pts.push(marker.refMax)
  if (c.populationAvg != null) pts.push(c.populationAvg)
  const lo = Math.min(...pts)
  const hi = Math.max(...pts)
  const padScale = (hi - lo) * 0.08 || 1
  const scaleMin = lo - padScale
  const scaleMax = hi + padScale

  return (
    <div className="space-y-5">
      <DrillHeader marker={marker} markers={markers} onSelect={onSelect} onClear={onClear} />

      {/* YOUR RESULT */}
      <Card variant="glass" padding="lg">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-eyebrow uppercase text-ink-3 mb-1.5">Your result</div>
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-[34px] font-bold text-ink leading-none tabular-nums">
                {marker.value}
              </span>
              <span className="text-[13px] text-ink-3">{unit}</span>
              <span
                className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide',
                  meta.cls,
                )}
              >
                {meta.label}
              </span>
            </div>
          </div>
          {marker.series && marker.series.length >= 2 && (
            <div className="shrink-0 w-[88px]">
              <SparkLine
                values={marker.series}
                width={88}
                height={40}
                tone={status === 'in_range' ? 'sage' : status === 'optimise' ? 'amber' : 'rose'}
                showFill
                highlightLast
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </Card>

      {/* COMPARISONS */}
      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-4">Comparisons</div>
        <div className="space-y-4">
          {c.previousResult != null && (
            <CompareRow
              label="Your previous result"
              sub={c.previousLabel}
              valueText={`${c.previousResult} ${unit}`}
              scaleMin={scaleMin}
              scaleMax={scaleMax}
              optimalMin={marker.refMin}
              optimalMax={marker.refMax}
              point={c.previousResult}
            />
          )}
          {c.personalMin != null && c.personalMax != null && (
            <CompareRow
              label="Your personal range"
              valueText={`${c.personalMin}–${c.personalMax} ${unit}`}
              scaleMin={scaleMin}
              scaleMax={scaleMax}
              optimalMin={marker.refMin}
              optimalMax={marker.refMax}
              rangeMin={c.personalMin}
              rangeMax={c.personalMax}
            />
          )}
          {marker.refMin != null && marker.refMax != null && (
            <CompareRow
              label="Optimal range"
              valueText={`${marker.refMin}–${marker.refMax} ${unit}`}
              scaleMin={scaleMin}
              scaleMax={scaleMax}
              optimalMin={marker.refMin}
              optimalMax={marker.refMax}
              rangeMin={marker.refMin}
              rangeMax={marker.refMax}
              emphasiseRange
            />
          )}
          {c.populationAvg != null && (
            <CompareRow
              label="Population average"
              sub={c.populationLabel}
              valueText={`${c.populationAvg} ${unit}`}
              scaleMin={scaleMin}
              scaleMax={scaleMax}
              optimalMin={marker.refMin}
              optimalMax={marker.refMax}
              point={c.populationAvg}
              pointTone="ink"
            />
          )}
        </div>

        {/* Trend / summary note */}
        <Link
          href="/blood/markers"
          className="mt-5 flex items-center justify-between gap-3 rounded-card tile tile-hover px-3.5 py-3 group"
        >
          <p className="text-[12px] text-ink-2 leading-snug">{c.trendNote}</p>
          <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
      </Card>
    </div>
  )
}

// ── Tab 3: EXPLANATIONS ──────────────────────────────────────────────────
function ExplanationsTab({
  markers,
  selected,
  onSelect,
  onClear,
  onGoToComparisons,
}: {
  markers: VMarker[]
  selected: VMarker | null
  onSelect: (name: string) => void
  onClear: () => void
  onGoToComparisons: (name: string) => void
}) {
  if (selected) {
    return (
      <ExplanationsDrill
        marker={selected}
        markers={markers}
        onSelect={onSelect}
        onClear={onClear}
        onGoToComparisons={onGoToComparisons}
      />
    )
  }
  return <ExplanationsOverview markers={markers} onSelect={onSelect} />
}

function ExplanationsOverview({
  markers,
  onSelect,
}: {
  markers: VMarker[]
  onSelect: (name: string) => void
}) {
  const topicIcons: Record<string, LucideIcon> = {
    iron: Beaker, vitamins: Leaf, lipids: Heart, metabolic: Droplet,
    inflammation: Flame, hormones: Activity, liver: Beaker, thyroid: Activity,
  }
  const topics = BIOMARKER_CATEGORIES.map((c) => ({
    key: c.id,
    icon: topicIcons[c.id] ?? Beaker,
    title: c.label,
    detail: c.description,
  }))

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Understand your biomarkers"
        lead="Learn what your biomarkers mean"
        accent="and why they matter."
        body="Clear, science-backed explanations in plain language."
        decoration="leaves"
      />

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-2.5">Browse topics</div>
        <div className="space-y-2.5">
          {topics.map((t) => {
            // Drill straight into the matching biomarker's explanation when
            // the user actually has it; otherwise hand off to the AI chat.
            const match = markers.find((m) => categoryForMarker(m.name) === t.key)
            const inner = (
              <>
                <IconBadge icon={t.icon} tone="sage" variant="tint" size="md" />
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                    {t.title}
                  </div>
                  <div className="text-[11.5px] text-ink-3 leading-snug mt-0.5">
                    {t.detail}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
              </>
            )
            const cls = 'w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile tile-hover group'
            return match ? (
              <button key={t.key} type="button" onClick={() => onSelect(match.name)} className={cls}>
                {inner}
              </button>
            ) : (
              <Link key={t.key} href="/chat" className={cls} title="Start Learning Mode">
                {inner}
              </Link>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ── Explanations: single-biomarker drill-down (v7 image 6) ────────────────
function ExplanationsDrill({
  marker,
  markers,
  onSelect,
  onClear,
  onGoToComparisons,
}: {
  marker: VMarker
  markers: VMarker[]
  onSelect: (name: string) => void
  onClear: () => void
  onGoToComparisons: (name: string) => void
}) {
  const c = getContent(marker.name, marker.sub)
  const first = marker.name.split(' ')[0]

  return (
    <div className="space-y-5">
      <DrillHeader marker={marker} markers={markers} onSelect={onSelect} onClear={onClear} />
      <button
        type="button"
        onClick={() => onGoToComparisons(marker.name)}
        className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-pill text-[12px] font-medium text-sage-deep tile tile-hover"
      >
        View comparisons for {marker.name}
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
      </button>

      <Card variant="premium" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
              <Sparkles className="w-3 h-3" strokeWidth={2.25} />
              Understanding {marker.name.toLowerCase()}
            </div>
            <div className="font-serif text-[22px] sm:text-[26px] text-ink leading-[1.12] tracking-tight">
              What does {first.toLowerCase()}{' '}
              <span className="italic-accent text-[1em] text-sage-deep">do?</span>
            </div>
            <p className="text-caption text-ink-2 mt-2 leading-snug max-w-[44ch]">
              {c.explainIntro}
            </p>
          </div>
          <div className="relative w-[88px] h-[88px] shrink-0">
            <Leaf className="absolute top-2 right-6 w-7 h-7 text-sage-deep rotate-[18deg]" strokeWidth={1.5} />
            <Leaf className="absolute top-8 right-2 w-9 h-9 text-sage rotate-[-12deg]" strokeWidth={1.5} />
            <Leaf className="absolute bottom-2 right-8 w-5 h-5 text-sage-soft rotate-[35deg]" strokeWidth={1.5} />
          </div>
        </div>
      </Card>

      <Card variant="glass" padding="lg">
        <Accordion
          items={[
            { icon: ShieldCheck,     title: 'Why it matters',                          body: c.whyItMatters,     defaultOpen: true },
            { icon: Droplet,         title: 'What low levels may mean',                body: c.lowMeans },
            { icon: Flame,           title: 'What high levels may mean',               body: c.highMeans },
            { icon: Activity,        title: `Factors that influence ${first.toLowerCase()}`, body: c.factors },
            { icon: Heart,           title: 'How it relates to your health',           body: c.relatesToHealth },
          ]}
        />
      </Card>

      <Card variant="glass-sage" padding="lg" className="relative overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="font-sans text-[14px] font-semibold text-ink leading-tight">
              Want to learn more?
            </div>
            <p className="text-[12px] text-ink-2 leading-snug mt-1 max-w-[40ch]">
              Explore our full guide to {marker.name.toLowerCase()} and {marker.sub.toLowerCase() || 'your health'}.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 mt-3 h-8 px-3 rounded-pill text-[12px] font-medium text-sage-deep bg-white/80 ring-1 ring-inset ring-[rgba(111,143,107,0.22)] hover:bg-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" strokeWidth={2.25} />
              Read guide
            </Link>
          </div>
          <div className="relative w-[72px] h-[72px] shrink-0">
            <Leaf className="absolute top-1 right-4 w-7 h-7 text-sage rotate-[14deg]" strokeWidth={1.5} />
            <Leaf className="absolute bottom-1 right-7 w-5 h-5 text-sage-soft rotate-[40deg]" strokeWidth={1.5} />
          </div>
        </div>
      </Card>
    </div>
  )
}

// ── Tab 4: RECOMMENDATIONS ───────────────────────────────────────────────
function RecommendationsTab({
  markers,
  selected,
  onSelect,
  onClear,
}: {
  markers: VMarker[]
  selected: VMarker | null
  onSelect: (name: string) => void
  onClear: () => void
}) {
  if (selected) {
    return (
      <RecommendationsDrill
        marker={selected}
        markers={markers}
        onSelect={onSelect}
        onClear={onClear}
      />
    )
  }
  return <RecommendationsOverview markers={markers} onSelect={onSelect} />
}

function RecommendationsOverview({
  markers,
  onSelect,
}: {
  markers: VMarker[]
  onSelect: (name: string) => void
}) {
  const needsAttention = markers.filter((m) => m.tier === 'T2' || m.tier === 'T3')
  const focusAreas = needsAttention.length > 0
    ? needsAttention.slice(0, 5).map((m) => ({
        key: m.name,
        icon: m.icon,
        title: m.name,
        detail: personalisedRec(m.name, m.value, m.unit ?? '', m.tier),
        marker: m,
      }))
    : markers.slice(0, 3).map((m) => ({
        key: m.name,
        icon: m.icon,
        title: m.name,
        detail: personalisedRec(m.name, m.value, m.unit ?? '', m.tier),
        marker: m,
      }))

  const foundations: { key: string; icon: LucideIcon; label: string; detail: string }[] = [
    { key: 'nutrition', icon: UtensilsCrossed, label: 'Nutrition', detail: 'Balanced eating patterns' },
    { key: 'movement',  icon: Footprints,      label: 'Movement',  detail: 'Regular exercise' },
    { key: 'sleep',     icon: Moon,            label: 'Sleep',     detail: 'Quality, consistent sleep' },
    { key: 'stress',    icon: Wind,            label: 'Stress',    detail: 'Manage daily stress' },
  ]

  return (
    <div className="space-y-5">
      <HeroIntroCard
        eyebrow="Personalised recommendations"
        lead="Actionable steps to improve"
        accent="your biomarker health."
        body="Recommendations based on your results, trends and lifestyle."
        decoration="leaves"
      />

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-3">Focus areas</div>
        <div className="space-y-3">
          {focusAreas.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => onSelect(f.marker.name)}
              className="w-full text-left flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile tile-hover group"
            >
              <IconBadge icon={f.icon} tone="rose" variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                  {f.title}
                </div>
                <p className="text-[11.5px] text-ink-3 leading-snug mt-1">
                  {f.detail}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
            </button>
          ))}
        </div>
      </Card>

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-3">Lifestyle foundations</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {foundations.map((f) => (
            <div
              key={f.key}
              className="rounded-card p-3 tile flex flex-col items-center text-center"
            >
              <IconBadge icon={f.icon} tone="sage" variant="tint" size="md" />
              <div className="font-sans text-[12.5px] font-semibold text-ink mt-2 leading-tight">
                {f.label}
              </div>
              <div className="text-[10.5px] text-ink-3 leading-snug mt-0.5">
                {f.detail}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/chat"
          className="mt-4 flex items-center justify-between gap-3 rounded-card tile-sage tile-hover px-3.5 py-3 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/80 ring-1 ring-inset ring-[rgba(111,143,107,0.20)] flex items-center justify-center">
              <PillIcon className="w-4 h-4 text-sage-deep" strokeWidth={2.25} />
            </div>
            <div>
              <div className="font-sans text-[13px] font-semibold text-ink leading-tight">
                Need a supplement plan?
              </div>
              <div className="text-[11.5px] text-ink-3 leading-snug mt-0.5">
                Get a personalised plan based on your results.
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-sage-deep shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
      </Card>
    </div>
  )
}

// ── Recommendations: single-biomarker drill-down (v7 image 6) ─────────────
function RecommendationsDrill({
  marker,
  markers,
  onSelect,
  onClear,
}: {
  marker: VMarker
  markers: VMarker[]
  onSelect: (name: string) => void
  onClear: () => void
}) {
  const c = getContent(marker.name, marker.sub)

  return (
    <div className="space-y-5">
      <DrillHeader marker={marker} markers={markers} onSelect={onSelect} onClear={onClear} />

      <Card variant="premium" padding="lg" className="relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
              <Sparkles className="w-3 h-3" strokeWidth={2.25} />
              Personalised for you
            </div>
            <div className="font-serif text-[22px] sm:text-[26px] text-ink leading-[1.12] tracking-tight">
              Here are ways to optimise{' '}
              <span className="italic-accent text-[1em] text-sage-deep">your {marker.name.toLowerCase()}.</span>
            </div>
            <p className="text-caption text-ink-2 mt-2 leading-snug max-w-[44ch]">
              {personalisedRec(marker.name, marker.value, marker.unit ?? '', marker.tier)}
            </p>
          </div>
          <div className="relative w-[88px] h-[88px] shrink-0">
            <Leaf className="absolute top-2 right-6 w-7 h-7 text-sage-deep rotate-[18deg]" strokeWidth={1.5} />
            <Leaf className="absolute top-8 right-2 w-9 h-9 text-sage rotate-[-12deg]" strokeWidth={1.5} />
            <Leaf className="absolute bottom-2 right-8 w-5 h-5 text-sage-soft rotate-[35deg]" strokeWidth={1.5} />
          </div>
        </div>
      </Card>

      <Card variant="glass" padding="lg">
        <div className="text-eyebrow uppercase text-ink-3 mb-3">Lifestyle recommendations</div>
        <div className="space-y-2.5">
          {c.lifestyle.map((l) => (
            <div
              key={l.title}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile"
            >
              <IconBadge icon={l.icon} tone="sage" variant="tint" size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                  {l.title}
                </div>
                <p className="text-[11.5px] text-ink-3 leading-snug mt-1">{l.detail}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-ink-3 shrink-0 mt-0.5" strokeWidth={2.25} />
            </div>
          ))}
        </div>
      </Card>

      {c.supplements.length > 0 && (
        <Card variant="glass" padding="lg">
          <div className="text-eyebrow uppercase text-ink-3 mb-3">Supplements to consider</div>
          <div className="space-y-2.5">
            {c.supplements.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-card tile"
              >
                <IconBadge icon={PillIcon} tone="amber" variant="tint" size="md" />
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-[13.5px] font-semibold text-ink leading-tight">
                    {s.name}
                  </div>
                  <p className="text-[11.5px] text-ink-3 leading-snug mt-1">{s.detail}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-pill text-[10.5px] font-semibold uppercase tracking-wide shrink-0 bg-[rgba(237,198,138,0.30)] text-[#A77530] ring-1 ring-inset ring-[rgba(217,160,91,0.30)]">
                  {s.tag}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex items-start gap-2.5 rounded-card tile px-3.5 py-3">
        <ShieldCheck className="w-4 h-4 text-ink-3 shrink-0 mt-0.5" strokeWidth={2} />
        <p className="text-[11px] text-ink-3 leading-snug">
          Always consult a healthcare professional before starting any new supplements.
        </p>
      </div>
    </div>
  )
}

// ── Shared bits ──────────────────────────────────────────────────────────
function HeroIntroCard({
  eyebrow,
  lead,
  accent,
  body,
  decoration,
  cta,
}: {
  eyebrow: string
  lead: string
  accent: string
  body: string
  decoration: 'leaves'
  cta?: { label: string; href: string; icon?: LucideIcon }
}) {
  return (
    <Card variant="premium" padding="lg" className="relative overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-eyebrow uppercase text-sage-deep mb-2">
            <Sparkles className="w-3 h-3" strokeWidth={2.25} />
            {eyebrow}
          </div>
          <div className="font-serif text-[22px] sm:text-[26px] text-ink leading-[1.12] tracking-tight">
            {lead}{' '}
            <span className="italic-accent text-[1em] text-sage-deep">{accent}</span>
          </div>
          <p className="text-caption text-ink-2 mt-2 leading-snug max-w-[44ch]">
            {body}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="inline-flex items-center gap-1.5 mt-3 h-8 px-3 rounded-pill text-[12px] font-medium text-sage-deep bg-white/70 ring-1 ring-inset ring-[rgba(111,143,107,0.22)] hover:bg-white transition-colors"
            >
              {cta.icon && <cta.icon className="w-3.5 h-3.5" strokeWidth={2.25} />}
              {cta.label}
              {!cta.icon && <ArrowRight className="w-3 h-3" strokeWidth={2.25} />}
            </Link>
          )}
        </div>
        {/* Decorative leaves cluster, matching the other tabs */}
        {decoration === 'leaves' && (
          <div className="relative w-[88px] h-[88px] shrink-0">
            <Leaf className="absolute top-2 right-6 w-7 h-7 text-sage-deep rotate-[18deg]" strokeWidth={1.5} />
            <Leaf className="absolute top-8 right-2 w-9 h-9 text-sage rotate-[-12deg]" strokeWidth={1.5} />
            <Leaf className="absolute bottom-2 right-8 w-5 h-5 text-sage-soft rotate-[35deg]" strokeWidth={1.5} />
          </div>
        )}
      </div>
    </Card>
  )
}

function LegendChip({ status, count }: { status: Status; count: number }) {
  const meta = STATUS_META[status]
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill tile">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.dot }} />
      <span className="text-[10.5px] text-ink-2 font-medium">{meta.label}</span>
      {count > 0 && (
        <span className="text-[10.5px] text-ink-3 font-semibold tabular-nums">· {count}</span>
      )}
    </span>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 h-8 rounded-pill text-[12px] font-medium transition-all',
        active
          ? 'btn-sage text-white'
          : 'tile tile-hover text-ink-2',
      )}
    >
      {children}
    </button>
  )
}

// ── Drill-down: shared header (back + biomarker selector) ─────────────────
function DrillHeader({
  marker,
  markers,
  onSelect,
  onClear,
}: {
  marker: VMarker
  markers: VMarker[]
  onSelect: (name: string) => void
  onClear: () => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1 h-9 px-2.5 rounded-pill text-[12px] font-medium text-ink-2 tile tile-hover shrink-0"
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.25} />
        All
      </button>
      <BiomarkerSelect marker={marker} markers={markers} onSelect={onSelect} />
    </div>
  )
}

// Pill-style dropdown to switch the drilled biomarker (v7 image 6).
function BiomarkerSelect({
  marker,
  markers,
  onSelect,
}: {
  marker: VMarker
  markers: VMarker[]
  onSelect: (name: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 h-9 px-3 rounded-pill text-[13px] font-medium text-ink tile tile-hover"
      >
        <span className="flex items-center gap-2 min-w-0">
          <marker.icon className="w-3.5 h-3.5 text-sage-deep shrink-0" strokeWidth={2.25} />
          <span className="truncate">{marker.name}</span>
        </span>
        <ChevronDown
          className={cn('w-4 h-4 text-ink-3 shrink-0 transition-transform', open && 'rotate-180')}
          strokeWidth={2.25}
        />
      </button>

      {open && (
        <>
          {/* Click-away backdrop */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute z-50 mt-1.5 left-0 right-0 max-h-72 overflow-y-auto rounded-card bg-white shadow-float ring-1 ring-inset ring-[rgba(184,168,144,0.22)] p-1.5">
            {markers.map((m) => {
              const active = m.name === marker.name
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => {
                    onSelect(m.name)
                    setOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[12px] text-left transition-colors',
                    active ? 'bg-[rgba(168,191,163,0.18)]' : 'hover:bg-[rgba(26,28,26,0.04)]',
                  )}
                >
                  <m.icon className="w-3.5 h-3.5 text-sage-deep shrink-0" strokeWidth={2.25} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13px] font-medium text-ink truncate leading-tight">{m.name}</span>
                    <span className="block text-[10.5px] text-ink-3 truncate leading-tight">{m.sub}</span>
                  </span>
                  {active && <Check className="w-4 h-4 text-sage-deep shrink-0" strokeWidth={2.5} />}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// A single comparison row: label + value, with a track that shows the
// optimal band and either a point marker or a highlighted range band.
function CompareRow({
  label,
  sub,
  valueText,
  scaleMin,
  scaleMax,
  optimalMin,
  optimalMax,
  point,
  pointTone = 'sage',
  rangeMin,
  rangeMax,
  emphasiseRange,
}: {
  label: string
  sub?: string
  valueText: string
  scaleMin: number
  scaleMax: number
  optimalMin?: number
  optimalMax?: number
  point?: number
  pointTone?: 'sage' | 'ink'
  rangeMin?: number
  rangeMax?: number
  emphasiseRange?: boolean
}) {
  const span = scaleMax - scaleMin || 1
  const pct = (v: number) => Math.max(0, Math.min(100, ((v - scaleMin) / span) * 100))
  const dotColor = pointTone === 'ink' ? '#8A8C8A' : '#6F8F6B'

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-1.5">
        <span className="text-[12px] text-ink-2">
          {label}
          {sub && <span className="text-ink-3"> · {sub}</span>}
        </span>
        <span className="text-[12px] font-semibold text-ink tabular-nums shrink-0">{valueText}</span>
      </div>
      <div className="relative h-2.5 rounded-pill bg-[rgba(26,28,26,0.05)] overflow-hidden">
        {/* Faint optimal band for context on every row */}
        {optimalMin != null && optimalMax != null && (
          <div
            className="absolute top-0 h-full bg-[rgba(168,191,163,0.22)]"
            style={{ left: `${pct(optimalMin)}%`, width: `${pct(optimalMax) - pct(optimalMin)}%` }}
          />
        )}
        {/* Solid range band (personal / optimal-emphasised rows) */}
        {rangeMin != null && rangeMax != null && (
          <div
            className={cn(
              'absolute top-0 h-full rounded-pill',
              emphasiseRange ? 'bg-[rgba(111,143,107,0.55)]' : 'bg-[rgba(111,143,107,0.40)]',
            )}
            style={{ left: `${pct(rangeMin)}%`, width: `${Math.max(pct(rangeMax) - pct(rangeMin), 2)}%` }}
          />
        )}
        {/* Point marker */}
        {point != null && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-2 ring-white shadow-[0_2px_4px_rgba(26,28,26,0.18)]"
            style={{ left: `calc(${pct(point)}% - 6px)`, background: dotColor }}
          />
        )}
      </div>
    </div>
  )
}

// Lightweight expand/collapse list used by the Explanations drill-down.
function Accordion({
  items,
}: {
  items: { icon: LucideIcon; title: string; body: string; defaultOpen?: boolean }[]
}) {
  return (
    <div className="divide-y divide-[rgba(184,168,144,0.20)]">
      {items.map((it, i) => (
        <AccordionItem key={i} {...it} />
      ))}
    </div>
  )
}

function AccordionItem({
  icon: Icon,
  title,
  body,
  defaultOpen,
}: {
  icon: LucideIcon
  title: string
  body: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="py-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 py-2.5 text-left group"
      >
        <IconBadge icon={Icon} tone="sage" variant="tint" size="sm" />
        <span className="flex-1 min-w-0 font-sans text-[13.5px] font-semibold text-ink leading-tight">
          {title}
        </span>
        <ChevronDown
          className={cn('w-4 h-4 text-ink-3 shrink-0 transition-transform', open && 'rotate-180')}
          strokeWidth={2.25}
        />
      </button>
      {open && (
        <p className="text-[12.5px] text-ink-2 leading-relaxed pb-3 pl-10 pr-1">{body}</p>
      )}
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────
function iconForMarker(name: string): LucideIcon {
  const k = name.toLowerCase()
  if (k.includes('ferritin') || k.includes('iron'))              return Beaker
  if (k.includes('vitamin d'))                                    return Sun
  if (k.includes('vitamin b') || k.includes('b12'))              return Beaker
  if (k.includes('omega'))                                       return Heart
  if (k.includes('crp') || k.includes('c-reactive'))             return Flame
  if (k.includes('hba1c') || k.includes('glucose'))              return Droplet
  if (k.includes('testosterone') || k.includes('hormone'))       return Activity
  if (k.includes('cholesterol') || k.includes('hdl') || k.includes('ldl')) return Heart
  return Beaker
}

function subForMarker(name: string): string {
  const k = name.toLowerCase()
  if (k.includes('ferritin'))    return 'Iron stores'
  if (k.includes('vitamin d'))   return 'Bone & immune health'
  if (k.includes('vitamin b'))   return 'Energy & cognitive'
  if (k.includes('omega'))       return 'Heart & brain health'
  if (k.includes('crp'))         return 'Inflammation'
  if (k.includes('hba1c'))       return 'Blood sugar control'
  if (k.includes('testosterone'))return 'Hormonal health'
  return ''
}
