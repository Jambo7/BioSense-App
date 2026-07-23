/**
 * Biomarker taxonomy — the full preset catalogue of markers the platform
 * recognises, grouped into categories, plus alias matching so uploaded lab
 * names (e.g. "LDL-C", "Hgb", "25-OH Vitamin D") auto-assign to the right
 * place. Used for auto-categorisation on upload, the category-grouped list,
 * and the browsable Explanations catalogue.
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
    markers: [
      'Ferritin', 'Iron', 'Transferrin', 'Transferrin Saturation', 'TIBC',
      'Haemoglobin', 'Haematocrit', 'Red Blood Cells', 'MCV', 'MCH', 'MCHC',
      'RDW', 'Reticulocytes', 'Platelets', 'MPV', 'White Blood Cells',
      'Neutrophils', 'Lymphocytes', 'Monocytes', 'Eosinophils', 'Basophils',
    ],
  },
  {
    id: 'vitamins',
    label: 'Vitamins & minerals',
    description: 'Essential nutrients and deficiencies',
    markers: [
      'Vitamin D', 'Vitamin B12', 'Active B12', 'Folate', 'Vitamin A',
      'Vitamin C', 'Vitamin E', 'Vitamin K', 'Vitamin B1', 'Vitamin B2',
      'Vitamin B6', 'Magnesium', 'Zinc', 'Selenium', 'Copper', 'Iodine',
    ],
  },
  {
    id: 'lipids',
    label: 'Cholesterol & lipids',
    description: 'Heart and cardiovascular health',
    markers: [
      'Total Cholesterol', 'LDL Cholesterol', 'HDL Cholesterol',
      'Non-HDL Cholesterol', 'Triglycerides', 'ApoB', 'ApoA1',
      'Lipoprotein(a)', 'Omega-3 Index', 'VLDL Cholesterol',
      'Cholesterol/HDL Ratio', 'Small Dense LDL',
    ],
  },
  {
    id: 'metabolic',
    label: 'Blood sugar & metabolic',
    description: 'Metabolic health and insulin sensitivity',
    markers: [
      'HbA1c', 'Fasting Glucose', 'Random Glucose', 'Insulin', 'HOMA-IR',
      'C-Peptide', 'Fructosamine', 'Uric Acid', 'Leptin', 'Adiponectin',
    ],
  },
  {
    id: 'inflammation',
    label: 'Inflammation markers',
    description: 'Systemic inflammation and long-term health',
    markers: [
      'C-Reactive Protein', 'hs-CRP', 'ESR', 'Homocysteine', 'Fibrinogen',
      'Interleukin-6', 'GlycA', 'D-Dimer',
    ],
  },
  {
    id: 'hormones',
    label: 'Hormones',
    description: 'Balance, energy and performance',
    markers: [
      'Testosterone', 'Free Testosterone', 'SHBG', 'Oestradiol',
      'Progesterone', 'Cortisol', 'DHEA-S', 'FSH', 'LH', 'Prolactin',
      'IGF-1', 'Growth Hormone', 'AMH', 'PSA',
    ],
  },
  {
    id: 'thyroid',
    label: 'Thyroid',
    description: 'Metabolism and energy regulation',
    markers: [
      'TSH', 'Free T4', 'Free T3', 'Total T4', 'Total T3', 'Reverse T3',
      'TPO Antibodies', 'Thyroglobulin Antibodies', 'TSH Receptor Antibodies',
    ],
  },
  {
    id: 'liver',
    label: 'Liver & kidney markers',
    description: 'Organ function and detoxification',
    markers: [
      'ALT', 'AST', 'GGT', 'ALP', 'Total Bilirubin', 'Direct Bilirubin',
      'Albumin', 'Total Protein', 'Globulin', 'LDH', 'Creatinine', 'eGFR',
      'Urea', 'Cystatin C', 'Amylase', 'Lipase',
    ],
  },
  {
    id: 'electrolytes',
    label: 'Electrolytes & hydration',
    description: 'Fluid balance, nerves and muscle function',
    markers: [
      'Sodium', 'Potassium', 'Chloride', 'Bicarbonate', 'Calcium',
      'Corrected Calcium', 'Phosphate', 'Osmolality',
    ],
  },
  {
    id: 'cardiac',
    label: 'Heart & muscle',
    description: 'Cardiac strain and muscle breakdown',
    markers: ['Troponin', 'NT-proBNP', 'Creatine Kinase', 'CK-MB', 'Myoglobin'],
  },
]

/**
 * Common lab-report aliases → canonical catalogue name. Keys are matched
 * after normalisation (lowercase, alphanumeric only).
 */
const ALIASES: Record<string, string> = {
  // Lipids
  'LDL': 'LDL Cholesterol',
  'LDL-C': 'LDL Cholesterol',
  'HDL': 'HDL Cholesterol',
  'HDL-C': 'HDL Cholesterol',
  'Non HDL': 'Non-HDL Cholesterol',
  'Cholesterol': 'Total Cholesterol',
  'Trigs': 'Triglycerides',
  'Apolipoprotein B': 'ApoB',
  'Apolipoprotein A1': 'ApoA1',
  'Lp(a)': 'Lipoprotein(a)',
  // Blood count
  'Hb': 'Haemoglobin',
  'Hgb': 'Haemoglobin',
  'Hemoglobin': 'Haemoglobin',
  'Hct': 'Haematocrit',
  'Hematocrit': 'Haematocrit',
  'RBC': 'Red Blood Cells',
  'RBC Count': 'Red Blood Cells',
  'Erythrocytes': 'Red Blood Cells',
  'WBC': 'White Blood Cells',
  'WBC Count': 'White Blood Cells',
  'Leukocytes': 'White Blood Cells',
  'Plt': 'Platelets',
  'Platelet Count': 'Platelets',
  // Vitamins & minerals
  '25-OH Vitamin D': 'Vitamin D',
  '25-Hydroxyvitamin D': 'Vitamin D',
  'Vitamin D3': 'Vitamin D',
  'Cobalamin': 'Vitamin B12',
  'B12': 'Vitamin B12',
  'Folic Acid': 'Folate',
  'Serum Folate': 'Folate',
  'Thiamine': 'Vitamin B1',
  'Riboflavin': 'Vitamin B2',
  'Pyridoxine': 'Vitamin B6',
  // Metabolic
  'Glucose': 'Fasting Glucose',
  'Blood Glucose': 'Fasting Glucose',
  'A1c': 'HbA1c',
  'Glycated Haemoglobin': 'HbA1c',
  'Fasting Insulin': 'Insulin',
  'Urate': 'Uric Acid',
  // Inflammation
  'CRP': 'C-Reactive Protein',
  'High Sensitivity CRP': 'hs-CRP',
  'Sed Rate': 'ESR',
  'IL-6': 'Interleukin-6',
  // Hormones
  'Estradiol': 'Oestradiol',
  'E2': 'Oestradiol',
  'Total Testosterone': 'Testosterone',
  'DHEA': 'DHEA-S',
  'DHEA Sulphate': 'DHEA-S',
  // Thyroid
  'Free Thyroxine': 'Free T4',
  'Thyroxine': 'Total T4',
  'Free Triiodothyronine': 'Free T3',
  'Thyroid Peroxidase Antibodies': 'TPO Antibodies',
  'Thyroid Antibodies': 'TPO Antibodies',
  // Liver & kidney
  'Bilirubin': 'Total Bilirubin',
  'SGPT': 'ALT',
  'SGOT': 'AST',
  'Alkaline Phosphatase': 'ALP',
  'Gamma GT': 'GGT',
  'BUN': 'Urea',
  'Blood Urea Nitrogen': 'Urea',
  // Cardiac
  'CK': 'Creatine Kinase',
  'Troponin I': 'Troponin',
  'Troponin T': 'Troponin',
  'BNP': 'NT-proBNP',
}

/** Short, human "what is this" sub-label per marker (fallback: category description). */
const MARKER_SUBS: Record<string, string> = {
  'Ferritin': 'Iron stores',
  'Iron': 'Circulating iron',
  'Transferrin': 'Iron transport protein',
  'Transferrin Saturation': 'Iron transport usage',
  'TIBC': 'Iron-binding capacity',
  'Haemoglobin': 'Oxygen transport',
  'Haematocrit': 'Red cell volume',
  'Red Blood Cells': 'Oxygen-carrying cells',
  'MCV': 'Red cell size',
  'MCH': 'Haemoglobin per cell',
  'MCHC': 'Haemoglobin concentration',
  'RDW': 'Red cell size variation',
  'Reticulocytes': 'New red blood cells',
  'Platelets': 'Blood clotting cells',
  'MPV': 'Platelet size',
  'White Blood Cells': 'Immune cells',
  'Neutrophils': 'First-response immune cells',
  'Lymphocytes': 'Adaptive immune cells',
  'Monocytes': 'Clean-up immune cells',
  'Eosinophils': 'Allergy & parasite response',
  'Basophils': 'Inflammatory response cells',
  'Vitamin D': 'Bone & immune health',
  'Vitamin B12': 'Energy & cognitive',
  'Active B12': 'Usable B12',
  'Folate': 'Cell renewal & B-vitamin status',
  'Vitamin A': 'Vision & immune health',
  'Vitamin C': 'Antioxidant & immune support',
  'Vitamin E': 'Cell-protecting antioxidant',
  'Vitamin K': 'Clotting & bone health',
  'Vitamin B1': 'Energy metabolism',
  'Vitamin B2': 'Energy metabolism',
  'Vitamin B6': 'Mood & metabolism',
  'Magnesium': 'Muscle & nerve function',
  'Zinc': 'Immunity & repair',
  'Selenium': 'Thyroid & antioxidant support',
  'Copper': 'Iron use & connective tissue',
  'Iodine': 'Thyroid hormone building block',
  'Total Cholesterol': 'Overall cholesterol',
  'LDL Cholesterol': 'Artery-depositing cholesterol',
  'HDL Cholesterol': 'Protective cholesterol',
  'Non-HDL Cholesterol': 'All artery-risk particles',
  'Triglycerides': 'Circulating blood fats',
  'ApoB': 'Atherogenic particle count',
  'ApoA1': 'Protective particle protein',
  'Lipoprotein(a)': 'Inherited heart-risk particle',
  'Omega-3 Index': 'Heart & brain health',
  'VLDL Cholesterol': 'Triglyceride-rich particles',
  'Cholesterol/HDL Ratio': 'Overall lipid balance',
  'Small Dense LDL': 'Higher-risk LDL particles',
  'HbA1c': 'Blood sugar control',
  'Fasting Glucose': 'Baseline blood sugar',
  'Random Glucose': 'Spot blood sugar',
  'Insulin': 'Blood sugar regulation',
  'HOMA-IR': 'Insulin resistance score',
  'C-Peptide': 'Insulin production',
  'Fructosamine': 'Short-term sugar control',
  'Uric Acid': 'Purine metabolism',
  'Leptin': 'Appetite & energy signalling',
  'Adiponectin': 'Metabolic health hormone',
  'C-Reactive Protein': 'Inflammation',
  'hs-CRP': 'Low-grade inflammation',
  'ESR': 'General inflammation',
  'Homocysteine': 'B-vitamin & vascular health',
  'Fibrinogen': 'Clotting & inflammation',
  'Interleukin-6': 'Inflammatory signalling',
  'GlycA': 'Composite inflammation',
  'D-Dimer': 'Clot breakdown product',
  'Testosterone': 'Hormonal health',
  'Free Testosterone': 'Usable testosterone',
  'SHBG': 'Hormone transport protein',
  'Oestradiol': 'Oestrogen status',
  'Progesterone': 'Cycle & pregnancy hormone',
  'Cortisol': 'Stress hormone',
  'DHEA-S': 'Hormone precursor',
  'FSH': 'Reproductive signalling',
  'LH': 'Reproductive signalling',
  'Prolactin': 'Reproductive & stress hormone',
  'IGF-1': 'Growth & repair signalling',
  'Growth Hormone': 'Growth & metabolism',
  'AMH': 'Ovarian reserve',
  'PSA': 'Prostate health',
  'TSH': 'Thyroid signalling',
  'Free T4': 'Available thyroid hormone',
  'Free T3': 'Active thyroid hormone',
  'Total T4': 'Total thyroid hormone',
  'Total T3': 'Total active hormone',
  'Reverse T3': 'Thyroid braking signal',
  'TPO Antibodies': 'Thyroid autoimmunity',
  'Thyroglobulin Antibodies': 'Thyroid autoimmunity',
  'TSH Receptor Antibodies': 'Thyroid autoimmunity',
  'ALT': 'Liver cell health',
  'AST': 'Liver & muscle enzyme',
  'GGT': 'Liver & alcohol sensitivity',
  'ALP': 'Liver & bone enzyme',
  'Total Bilirubin': 'Red cell breakdown',
  'Direct Bilirubin': 'Liver processing',
  'Albumin': 'Main blood protein',
  'Total Protein': 'Overall protein status',
  'Globulin': 'Immune & transport proteins',
  'LDH': 'Tissue turnover',
  'Creatinine': 'Kidney filtration',
  'eGFR': 'Kidney filtration rate',
  'Urea': 'Protein waste clearance',
  'Cystatin C': 'Kidney filtration',
  'Amylase': 'Pancreatic enzyme',
  'Lipase': 'Pancreatic enzyme',
  'Sodium': 'Fluid balance',
  'Potassium': 'Heart & muscle function',
  'Chloride': 'Acid-base balance',
  'Bicarbonate': 'Acid-base balance',
  'Calcium': 'Bone, nerve & muscle',
  'Corrected Calcium': 'Adjusted calcium',
  'Phosphate': 'Bone & energy metabolism',
  'Osmolality': 'Hydration status',
  'Troponin': 'Heart muscle stress',
  'NT-proBNP': 'Heart strain',
  'Creatine Kinase': 'Muscle breakdown',
  'CK-MB': 'Heart muscle enzyme',
  'Myoglobin': 'Muscle injury marker',
}

/** Placeholder optimal panel — to be refined with Dr input. */
export const OPTIMAL_BIOMARKERS = [
  'Ferritin', 'Vitamin D', 'Vitamin B12', 'Omega-3 Index',
  'CRP', 'HbA1c', 'LDL', 'HDL', 'Triglycerides',
  'TSH', 'Testosterone', 'ALT', 'Creatinine',
]

function normalizeMarker(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

// Normalised canonical name → category id, and alias → canonical name.
const CANONICAL_CATEGORY: Record<string, string> = {}
const CANONICAL_NAME: Record<string, string> = {}
for (const cat of BIOMARKER_CATEGORIES) {
  for (const m of cat.markers) {
    const key = normalizeMarker(m)
    CANONICAL_CATEGORY[key] = cat.id
    CANONICAL_NAME[key] = m
  }
}
for (const [alias, canonical] of Object.entries(ALIASES)) {
  const key = normalizeMarker(alias)
  if (!CANONICAL_NAME[key]) {
    CANONICAL_NAME[key] = canonical
    CANONICAL_CATEGORY[key] = CANONICAL_CATEGORY[normalizeMarker(canonical)] ?? 'other'
  }
}

/**
 * Resolve any uploaded marker name to its canonical catalogue name
 * (e.g. "LDL-C" → "LDL Cholesterol"). Unknown names pass through unchanged.
 */
export function canonicalMarker(name: string): string {
  const key = normalizeMarker(name)
  if (CANONICAL_NAME[key]) return CANONICAL_NAME[key]
  // Loose containment fallback (e.g. "Serum Ferritin" → "Ferritin").
  for (const [normCanon, canon] of Object.entries(CANONICAL_NAME)) {
    if (normCanon.length >= 4 && (key.includes(normCanon) || normCanon.includes(key))) {
      return canon
    }
  }
  return name
}

export function categoryForMarker(name: string): string {
  const key = normalizeMarker(name)
  if (CANONICAL_CATEGORY[key]) return CANONICAL_CATEGORY[key]
  const canon = canonicalMarker(name)
  const canonKey = normalizeMarker(canon)
  return CANONICAL_CATEGORY[canonKey] ?? 'other'
}

/** Short sub-label for a marker (e.g. "Iron stores"); falls back to its category description. */
export function markerSub(name: string): string {
  const canon = canonicalMarker(name)
  if (MARKER_SUBS[canon]) return MARKER_SUBS[canon]
  const catId = categoryForMarker(name)
  const cat = BIOMARKER_CATEGORIES.find((c) => c.id === catId)
  return cat?.description ?? ''
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

/**
 * Value-aware personalised recommendation snippet. When the reference range
 * is supplied, copy adapts to whether the result is low or high, not just
 * its traffic-light tier.
 */
export function personalisedRec(
  name: string,
  value: number,
  unit: string,
  tier: 'T1' | 'T2' | 'T3',
  refMin?: number,
  refMax?: number,
): string {
  const key = normalizeMarker(canonicalMarker(name))
  const flagged = tier === 'T2' || tier === 'T3'
  const isLow = refMin != null && value < refMin
  const isHigh = refMax != null && value > refMax
  const reading = `Your ${name} is ${value} ${unit}`.trim()

  if (key.includes('vitamind') || key.includes('25oh')) {
    if (flagged) {
      return `${reading} — try to spend at least 60 minutes outdoors daily and eat more oily fish, eggs and fortified dairy, which are high in vitamin D. A D3 supplement through winter is worth discussing with your provider.`
    }
    return `${reading} and within a healthy range. Maintain it with regular daylight exposure and vitamin D-rich foods.`
  }

  if (key.includes('ferritin') || key === 'iron' || key.includes('transferrin') || key.includes('tibc')) {
    if (flagged && isHigh) {
      return `${reading}, above the optimal range. High iron markers can reflect inflammation or iron overload — limit alcohol, avoid iron supplements for now and discuss the result with your healthcare provider.`
    }
    if (flagged) {
      return `${reading} — focus on iron-rich foods like lean red meat, lentils and spinach, paired with vitamin C (peppers, citrus) to boost absorption. Avoid tea and coffee right around iron-rich meals.`
    }
    return `${reading} and looks well supported. Keep balancing training load with recovery and iron-rich whole foods.`
  }

  if (key.includes('haemoglobin') || key.includes('haematocrit')) {
    if (flagged && isLow) {
      return `${reading}, on the low side. Support red blood cell production with iron-rich foods, B12 and folate, and raise it with your provider if you feel tired or breathless.`
    }
    if (flagged) {
      return `${reading}, outside the optimal range. Hydration, altitude and training can all shift this — worth re-testing and reviewing with your provider.`
    }
    return `${reading} and in a healthy range, supporting good oxygen delivery and energy.`
  }

  if (key.includes('b12') || key.includes('folate')) {
    if (flagged && isLow) {
      return `${reading} — increase B-vitamin-rich foods: meat, fish, eggs and dairy for B12, and leafy greens, beans and lentils for folate. If you eat little animal produce, a supplement is sensible.`
    }
    return `${reading} and well within range, supporting steady energy and clear thinking.`
  }

  if (key.includes('omega3')) {
    if (flagged) {
      return `${reading} — aim for oily fish (salmon, mackerel, sardines) 2–3 times a week, or consider an EPA/DHA supplement. Cutting back on processed, omega-6-heavy foods helps the balance too.`
    }
    return `${reading} and in a healthy zone. Keep oily fish a regular part of your week.`
  }

  if (key.includes('creactiveprotein') || key.includes('hscrp') || key === 'esr' || key.includes('interleukin') || key.includes('glyca')) {
    if (tier === 'T3') {
      return `${reading} — prioritise anti-inflammatory foods (oily fish, leafy greens, berries, olive oil), aim for 7–8 hours of sleep and manage stress with daily walks or breathwork. Re-test in 8–12 weeks; persistent elevation is worth discussing with your provider.`
    }
    if (flagged) {
      return `${reading}, slightly raised. Recent training, illness or poor sleep can nudge this up — focus on whole foods, recovery and consistent sleep, then re-test.`
    }
    return `${reading}. Keep supporting low inflammation with whole foods, quality sleep and consistent recovery.`
  }

  if (key.includes('homocysteine')) {
    if (flagged) {
      return `${reading} — elevated homocysteine often responds to B vitamins. Eat more leafy greens, eggs, legumes and whole grains (folate, B6 and B12), and consider a B-complex if levels stay raised.`
    }
    return `${reading} and in a healthy range, a good sign for vascular and brain health.`
  }

  if (key.includes('hba1c') || key.includes('glucose') || key.includes('insulin') || key.includes('homair') || key.includes('fructosamine')) {
    if (flagged) {
      return `${reading} — reduce refined carbs and sugary drinks, build each meal around protein, fibre and healthy fats, and take a 10–15 minute walk after your biggest meals. Strength training 2–3 times a week meaningfully improves insulin sensitivity.`
    }
    return `${reading} and shows good blood sugar control. Keep up regular movement and balanced, fibre-rich meals.`
  }

  if (key.includes('ldl') || key.includes('apob') || key.includes('nonhdl') || key === 'totalcholesterol' || key.includes('smalldense') || key.includes('vldl')) {
    if (flagged) {
      return `${reading} — increase soluble fibre (oats, beans, lentils, fruit), swap saturated fats for olive oil, nuts and oily fish, and cut back on processed meat and pastries. Regular cardio and a healthy weight both lower it further.`
    }
    return `${reading} and within the optimal range — good news for long-term heart health.`
  }

  if (key.includes('hdl')) {
    if (flagged && isLow) {
      return `${reading} — raise protective HDL with regular aerobic exercise, oily fish, olive oil and nuts, and by stopping smoking if you smoke. Cutting refined carbs helps too.`
    }
    return `${reading} and at a protective level. Regular exercise and healthy fats keep it there.`
  }

  if (key.includes('triglyceride')) {
    if (flagged) {
      return `${reading} — triglycerides respond quickly to cutting sugar, refined carbs and alcohol. Add oily fish twice a week and regular exercise, and you should see this fall within weeks.`
    }
    return `${reading} and in a healthy range. Keep alcohol moderate and meals balanced.`
  }

  if (key === 'tsh' || key.includes('freet4') || key.includes('freet3') || key.includes('thyrox')) {
    if (flagged) {
      return `${reading}, outside the optimal range. Thyroid results need interpreting together (TSH with T4/T3), so review this with your healthcare provider. Supporting nutrients include iodine (fish, dairy) and selenium (brazil nuts, seafood).`
    }
    return `${reading} and in a healthy range, supporting steady metabolism and energy.`
  }

  if (key.includes('testosterone')) {
    if (flagged && isLow) {
      return `${reading} — support healthy levels with resistance training 3+ times a week, 7–9 hours of sleep, adequate dietary fat and protein, and active stress management. Persistent low levels are worth a conversation with your provider.`
    }
    if (flagged) {
      return `${reading}, outside the typical range — worth reviewing alongside SHBG and free testosterone with your provider.`
    }
    return `${reading} and within a healthy range, supporting strength, recovery and drive.`
  }

  if (key.includes('cortisol')) {
    if (flagged && isHigh) {
      return `${reading} — bring cortisol down with a consistent wind-down routine, caffeine before noon only, daily walks outdoors and breathwork or meditation. Avoid stacking intense training on poor sleep.`
    }
    if (flagged) {
      return `${reading}, outside the typical range. Cortisol varies a lot by time of day, so confirm with a morning sample and review with your provider.`
    }
    return `${reading} and looks balanced. Keep protecting sleep and recovery.`
  }

  if (key === 'alt' || key === 'ast' || key === 'ggt') {
    if (flagged) {
      return `${reading} — support your liver by reducing alcohol, cutting ultra-processed and sugary foods, and moving daily. Liver enzymes often normalise within weeks of consistent changes; re-test to confirm.`
    }
    return `${reading} and in a healthy range — your liver is processing well.`
  }

  if (key.includes('creatinine') || key.includes('egfr') || key.includes('cystatin') || key === 'urea') {
    if (flagged) {
      return `${reading}, outside the typical range. Stay well hydrated, moderate protein and creatine intake before re-testing, and review the result with your healthcare provider — recent hard training can also skew it.`
    }
    return `${reading} and shows healthy kidney function. Staying hydrated keeps it that way.`
  }

  if (key.includes('magnesium')) {
    if (flagged && isLow) {
      return `${reading} — add magnesium-rich foods daily: leafy greens, nuts, seeds, whole grains and dark chocolate. Magnesium glycinate in the evening is a well-tolerated supplement option.`
    }
    return `${reading} and well supported, helping muscle recovery and sleep quality.`
  }

  if (key === 'zinc') {
    if (flagged && isLow) {
      return `${reading} — boost zinc with red meat, shellfish, pumpkin seeds and legumes. Zinc supports immunity, skin repair and hormone production.`
    }
    return `${reading} and in a healthy range, supporting immunity and recovery.`
  }

  if (key.includes('uricacid')) {
    if (flagged && isHigh) {
      return `${reading} — lower uric acid by cutting alcohol (especially beer), sugary drinks and excess red or organ meat. Stay well hydrated; tart cherries and vitamin C-rich foods may help too.`
    }
    return `${reading} and in a healthy range.`
  }

  if (key === 'sodium' || key === 'potassium' || key === 'calcium' || key.includes('correctedcalcium')) {
    if (flagged) {
      return `${reading}, outside the typical range. Electrolyte shifts are often about hydration, medication or sampling — re-test and review with your provider rather than self-correcting with supplements.`
    }
    return `${reading} and nicely balanced, supporting nerve and muscle function.`
  }

  // Generic fallbacks for everything else.
  if (tier === 'T3') {
    return `${reading} and outside the optimal range. Discuss this with your healthcare provider and focus on the lifestyle factors most relevant to this marker — the Explanations tab covers what influences it.`
  }
  if (tier === 'T2') {
    return `${reading} — there's room to optimise. Small consistent changes to nutrition, sleep and activity can shift this marker over time; re-test in 8–12 weeks to see your trend.`
  }
  return `${reading} and in a healthy range. Keep doing what's working.`
}
