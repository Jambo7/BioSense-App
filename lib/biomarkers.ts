/**
 * Biomarker taxonomy — preset categories and marker aliases for
 * auto-assignment on upload and category-grouped UI.
 */

export interface BiomarkerCategory {
  id: string
  label: string
  description: string
  markers: string[]
}

export const BIOMARKER_CATEGORIES: BiomarkerCategory[] = [
  {
    id: 'iron',
    label: 'Iron & blood cells',
    description: 'Energy, oxygen transport and recovery',
    markers: ['Ferritin', 'Iron', 'Haemoglobin', 'Haematocrit', 'Transferrin', 'TIBC'],
  },
  {
    id: 'vitamins',
    label: 'Vitamins & minerals',
    description: 'Essential nutrients and deficiencies',
    markers: ['Vitamin D', 'Vitamin B12', 'Folate', 'Magnesium', 'Zinc', 'Selenium'],
  },
  {
    id: 'lipids',
    label: 'Cholesterol & lipids',
    description: 'Heart and cardiovascular health',
    markers: ['Total Cholesterol', 'LDL', 'HDL', 'Triglycerides', 'Omega-3 Index', 'ApoB'],
  },
  {
    id: 'metabolic',
    label: 'Blood sugar control',
    description: 'Metabolic health and insulin sensitivity',
    markers: ['HbA1c', 'Fasting Glucose', 'Insulin', 'HOMA-IR'],
  },
  {
    id: 'inflammation',
    label: 'Inflammation markers',
    description: 'Systemic inflammation and long-term health',
    markers: ['C-Reactive Protein', 'CRP', 'ESR', 'Homocysteine'],
  },
  {
    id: 'hormones',
    label: 'Hormones',
    description: 'Balance, energy and performance',
    markers: ['Testosterone', 'Cortisol', 'TSH', 'Free T4', 'Free T3', 'Oestradiol', 'Progesterone'],
  },
  {
    id: 'liver',
    label: 'Liver & kidney markers',
    description: 'Organ function and detoxification',
    markers: ['ALT', 'AST', 'GGT', 'ALP', 'Creatinine', 'eGFR', 'Urea'],
  },
  {
    id: 'thyroid',
    label: 'Thyroid',
    description: 'Metabolism and energy regulation',
    markers: ['TSH', 'Free T4', 'Free T3', 'Reverse T3', 'Thyroid Antibodies'],
  },
]

/** Placeholder optimal panel — to be refined with Dr input. */
export const OPTIMAL_BIOMARKERS = [
  'Ferritin', 'Vitamin D', 'Vitamin B12', 'Omega-3 Index',
  'CRP', 'HbA1c', 'LDL', 'HDL', 'Triglycerides',
  'TSH', 'Testosterone', 'ALT', 'Creatinine',
]

const ALIAS_MAP: Record<string, string> = {}
for (const cat of BIOMARKER_CATEGORIES) {
  for (const m of cat.markers) {
    ALIAS_MAP[normalizeMarker(m)] = cat.id
  }
}

function normalizeMarker(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function categoryForMarker(name: string): string {
  const key = normalizeMarker(name)
  if (ALIAS_MAP[key]) return ALIAS_MAP[key]

  for (const cat of BIOMARKER_CATEGORIES) {
    for (const m of cat.markers) {
      const norm = normalizeMarker(m)
      if (key.includes(norm) || norm.includes(key)) return cat.id
    }
  }
  return 'other'
}

export function groupMarkersByCategory<T extends { name: string }>(
  markers: T[],
): { category: BiomarkerCategory; items: T[] }[] {
  const buckets = new Map<string, T[]>()

  for (const m of markers) {
    const catId = categoryForMarker(m.name)
    const list = buckets.get(catId) ?? []
    list.push(m)
    buckets.set(catId, list)
  }

  const result: { category: BiomarkerCategory; items: T[] }[] = []

  for (const cat of BIOMARKER_CATEGORIES) {
    const items = buckets.get(cat.id) ?? []
    result.push({ category: cat, items })
  }

  const other = buckets.get('other') ?? []
  if (other.length > 0) {
    result.push({
      category: { id: 'other', label: 'Other markers', description: 'Additional biomarkers', markers: [] },
      items: other,
    })
  }

  return result
}

/** Value-aware personalised recommendation snippet. */
export function personalisedRec(
  name: string,
  value: number,
  unit: string,
  tier: 'T1' | 'T2' | 'T3',
): string {
  const key = normalizeMarker(name)

  if (key.includes('vitamind') || key.includes('25oh')) {
    if (tier === 'T2' || tier === 'T3') {
      return `Your vitamin D is ${value} ${unit} — try to spend at least 60 minutes outdoors daily and eat more oily fish, eggs and fortified dairy which are high in vitamin D.`
    }
    return `Your vitamin D is ${value} ${unit} and within a healthy range. Maintain with regular daylight exposure and vitamin D-rich foods.`
  }

  if (key.includes('ferritin') || key.includes('iron')) {
    if (tier === 'T2' || tier === 'T3') {
      return `Your ${name} is ${value} ${unit} — focus on iron-rich foods like lean red meat, lentils and spinach, paired with vitamin C to boost absorption.`
    }
    return `Your ${name} is ${value} ${unit} and looks well supported. Keep balancing training load with recovery.`
  }

  if (key.includes('crp') || key.includes('creactive')) {
    if (tier === 'T3') {
      return `Your ${name} is ${value} ${unit} — prioritise anti-inflammatory foods (oily fish, leafy greens, berries), aim for 7–8 hours sleep and manage stress through daily walks or breathwork.`
    }
    return `Your ${name} is ${value} ${unit}. Keep supporting low inflammation with whole foods, quality sleep and consistent recovery.`
  }

  if (tier === 'T3') {
    return `Your ${name} is ${value} ${unit} and outside the optimal range. Discuss with your healthcare provider and focus on the lifestyle factors most relevant to this marker.`
  }
  if (tier === 'T2') {
    return `Your ${name} is ${value} ${unit} — there's room to optimise. Small consistent changes to nutrition, sleep and activity can help shift this marker over time.`
  }
  return `Your ${name} is ${value} ${unit} and in a healthy range. Keep doing what's working.`
}
