/**
 * Import Neil's SCL-001..024 Scientific Configuration packs into
 * lib/bio-engine/csl-data/*.json and a generated registry.
 *
 * Only anchors values explicitly present in §0 / band tables. Missing
 * constants stay DECLARED (feature off) — never guessed.
 */
import fs from 'node:fs'
import path from 'node:path'

const SCI_ROOT = path.join(
  process.env.USERPROFILE || '',
  'Downloads',
  'SCI Documents',
)
const OUT_DIR = path.join(process.cwd(), 'lib', 'bio-engine', 'csl-data')
const DOCS_DIR = path.join(process.cwd(), 'docs', 'scl')
const REGISTRY_PATH = path.join(
  process.cwd(),
  'lib',
  'bio-engine',
  'scl-registry.generated.ts',
)

const AUTHOR = 'BioSense Scientific Authoring (Origin BioSense Technologies FZCO)'
const EFFECTIVE = '2026-07-26'

/** Manual overrides where regex is ambiguous or packs use special shapes. */
const MANUAL = {
  'SCL-001': {
    analyte: 'APOB_TOTAL',
    display_name: 'Apolipoprotein B',
    aliases: ['ApoB', 'Apolipoprotein B', 'APOB', 'Apo B'],
    unit: 'mg/dL',
    conversions: { 'mg/dL': 1, 'g/L': 100, 'mg/L': 0.1 },
    direction: 'LOWER_BETTER',
    optimal_max: 65,
    above_target_min: 80,
    lifestyle_gap_ceiling: 65, // SIGNIFICANTLY_ELEVATED ≥130 → gap 65 from optimal
    companion: 'BIOSENSE_LDLC_THRESHOLD_SET',
    date: '2026-07-26',
  },
  'SCL-002': {
    analyte: 'HBA1C',
    display_name: 'HbA1c',
    aliases: ['HbA1c', 'A1c', 'Glycated Haemoglobin', 'glycohaemoglobin'],
    unit: '%',
    conversions: { '%': 1 },
    direction: 'LOWER_BETTER',
    optimal_max: 5.4,
    above_target_min: 5.7,
    low_investigation_threshold: 4.0,
    date: '2026-07-30',
  },
  'SCL-003': {
    analyte: 'LDL_C',
    display_name: 'LDL Cholesterol',
    aliases: ['LDL-C', 'LDL C', 'LDL Cholesterol', 'LDL'],
    unit: 'mg/dL',
    conversions: { 'mg/dL': 1, 'mmol/L': 38.67 },
    direction: 'LOWER_BETTER',
    optimal_max: 100,
    above_target_min: 130,
    companion: 'BIOSENSE_APOB_THRESHOLD_SET',
    date: '2026-07-31',
  },
  'SCL-004': {
    analyte: 'HDL_C',
    display_name: 'HDL Cholesterol',
    aliases: ['HDL-C', 'HDL', 'HDL Cholesterol'],
    unit: 'mg/dL',
    conversions: { 'mg/dL': 1, 'mmol/L': 38.67 },
    direction: 'TARGET_BAND', // NON_MONOTONIC / sex-aware in SCL-004
    date: '2026-07-31',
  },
  'SCL-005': {
    analyte: 'TRIGLYCERIDES',
    display_name: 'Triglycerides',
    aliases: ['Triglycerides', 'TG', 'Trigs'],
    unit: 'mg/dL',
    conversions: { 'mg/dL': 1, 'mmol/L': 88.57 },
    direction: 'LOWER_BETTER',
    date: '2026-07-31',
  },
  'SCL-006': {
    analyte: 'HS_CRP',
    display_name: 'hs-CRP',
    aliases: ['hs-CRP', 'hsCRP', 'high-sensitivity CRP', 'CRP'],
    unit: 'mg/L',
    conversions: { 'mg/L': 1 },
    direction: 'LOWER_BETTER',
    date: '2026-07-31',
  },
  'SCL-007': {
    analyte: 'NON_HDL_C',
    display_name: 'Non-HDL Cholesterol',
    aliases: ['Non-HDL-C', 'non-HDL', 'Non HDL-C'],
    unit: 'mg/dL',
    conversions: { 'mg/dL': 1, 'mmol/L': 38.67 },
    direction: 'LOWER_BETTER',
    date: '2026-07-31',
  },
  'SCL-008': {
    analyte: 'TOTAL_CHOLESTEROL',
    display_name: 'Total Cholesterol',
    aliases: ['Total Cholesterol', 'TC', 'Cholesterol'],
    unit: 'mg/dL',
    conversions: { 'mg/dL': 1, 'mmol/L': 38.67 },
    direction: 'LOWER_BETTER',
    date: '2026-07-31',
  },
  'SCL-009': {
    analyte: 'FASTING_GLUCOSE',
    display_name: 'Fasting Glucose',
    aliases: ['Fasting Glucose', 'Glucose', 'FPG', 'FBG'],
    unit: 'mg/dL',
    conversions: { 'mg/dL': 1, 'mmol/L': 18.018 },
    direction: 'LOWER_BETTER',
    date: '2026-07-31',
  },
  'SCL-010': {
    analyte: 'FERRITIN',
    display_name: 'Ferritin',
    aliases: ['Ferritin', 'serum ferritin'],
    unit: 'µg/L',
    conversions: { 'µg/L': 1, 'ng/mL': 1, 'ug/L': 1 },
    direction: 'TARGET_BAND',
    date: '2026-07-31',
    sex_aware: true,
  },
  'SCL-011': {
    analyte: 'VITAMIN_D',
    display_name: 'Vitamin D (25-OH)',
    aliases: ['Vitamin D', '25(OH)D', '25-OH Vitamin D', 'calcidiol'],
    unit: 'ng/mL',
    conversions: { 'ng/mL': 1, 'nmol/L': 1 / 2.496 },
    direction: 'TARGET_BAND',
    date: '2026-07-31',
  },
  'SCL-012': {
    analyte: 'VITAMIN_B12',
    display_name: 'Vitamin B12',
    aliases: ['Vitamin B12', 'B12', 'Cobalamin'],
    unit: 'pg/mL',
    conversions: { 'pg/mL': 1, 'ng/L': 1, 'pmol/L': 1.355 },
    direction: 'TARGET_BAND',
    date: '2026-08-01',
  },
  'SCL-013': {
    analyte: 'FOLATE',
    display_name: 'Folate',
    aliases: ['Folate', 'Folic acid', 'Serum folate'],
    unit: 'ng/mL',
    conversions: { 'ng/mL': 1, 'nmol/L': 1 / 2.266 },
    direction: 'TARGET_BAND',
    date: '2026-08-01',
  },
  'SCL-014': {
    analyte: 'ALT',
    display_name: 'ALT',
    aliases: ['ALT', 'Alanine aminotransferase', 'SGPT'],
    unit: 'U/L',
    conversions: { 'U/L': 1, 'IU/L': 1 },
    direction: 'LOWER_BETTER',
    date: '2026-08-01',
  },
  'SCL-015': {
    analyte: 'AST',
    display_name: 'AST',
    aliases: ['AST', 'Aspartate aminotransferase', 'SGOT'],
    unit: 'U/L',
    conversions: { 'U/L': 1, 'IU/L': 1 },
    direction: 'LOWER_BETTER',
    date: '2026-08-01',
  },
  'SCL-016': {
    analyte: 'EGFR',
    display_name: 'eGFR',
    aliases: ['eGFR', 'Estimated GFR', 'Creatinine eGFR'],
    unit: 'mL/min/1.73m²',
    conversions: { 'mL/min/1.73m²': 1, 'mL/min/1.73m2': 1 },
    direction: 'HIGHER_BETTER',
    optimal_max: 90, // G1 floor
    above_target_min: 60, // below G3a watch → unfavourable
    date: '2026-08-01',
  },
  'SCL-017': {
    analyte: 'TSH',
    display_name: 'TSH',
    aliases: ['TSH', 'Thyroid Stimulating Hormone', 'thyrotropin'],
    unit: 'mIU/L',
    conversions: { 'mIU/L': 1, 'µIU/mL': 1, 'mU/L': 1 },
    direction: 'TARGET_BAND',
    date: '2026-08-01',
  },
  'SCL-018': {
    analyte: 'FREE_T4',
    display_name: 'Free T4',
    aliases: ['Free T4', 'FT4', 'free thyroxine'],
    unit: 'ng/dL',
    conversions: { 'ng/dL': 1, 'pmol/L': 1 / 12.87 },
    direction: 'TARGET_BAND',
    date: '2026-08-01',
  },
  'SCL-019': {
    analyte: 'HAEMOGLOBIN',
    display_name: 'Haemoglobin',
    aliases: ['Haemoglobin', 'Hemoglobin', 'Hb', 'Hgb'],
    unit: 'g/dL',
    conversions: { 'g/dL': 1, 'g/L': 0.1 },
    direction: 'TARGET_BAND',
    sex_aware: true,
    date: '2026-08-01',
  },
  'SCL-020': {
    analyte: 'WBC',
    display_name: 'White Blood Cell Count',
    aliases: ['WBC', 'White cell count', 'Leukocytes'],
    unit: '×10⁹/L',
    conversions: { '×10⁹/L': 1, 'x10^9/L': 1, '/µL': 0.001 },
    direction: 'TARGET_BAND',
    date: '2026-08-01',
  },
  'SCL-021': {
    analyte: 'GGT',
    display_name: 'GGT',
    aliases: ['GGT', 'Gamma-GT', 'γ-GT'],
    unit: 'U/L',
    conversions: { 'U/L': 1, 'IU/L': 1 },
    direction: 'LOWER_BETTER',
    date: '2026-08-01',
  },
  'SCL-022': {
    analyte: 'ALP',
    display_name: 'Alkaline Phosphatase',
    aliases: ['ALP', 'Alkaline Phosphatase'],
    unit: 'U/L',
    conversions: { 'U/L': 1, 'IU/L': 1 },
    direction: 'TARGET_BAND',
    date: '2026-08-01',
  },
  'SCL-023': {
    analyte: 'BILIRUBIN',
    display_name: 'Bilirubin',
    aliases: ['Bilirubin', 'Total bilirubin'],
    unit: 'mg/dL',
    conversions: { 'mg/dL': 1, 'µmol/L': 1 / 17.1 },
    direction: 'LOWER_BETTER',
    date: '2026-08-01',
  },
  'SCL-024': {
    analyte: 'ALBUMIN',
    display_name: 'Albumin',
    aliases: ['Albumin', 'Serum albumin'],
    unit: 'g/dL',
    conversions: { 'g/dL': 1, 'g/L': 0.1 },
    direction: 'HIGHER_BETTER',
    date: '2026-08-01',
  },
}

function findPackMd(folder) {
  const hits = []
  function walk(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name)
      if (ent.isDirectory()) walk(p)
      else if (/SciConfig|Sci-Config|Scientific-Config|Sci Config/i.test(ent.name) && ent.name.endsWith('.md')) {
        hits.push(p)
      } else if (/SCL-\d{3}.*v1\.0.*\.md$/i.test(ent.name) && !/EVIDENCE|APPENDICES|CHANGELOG|PRESENTATION/i.test(ent.name)) {
        hits.push(p)
      }
    }
  }
  walk(folder)
  // Prefer r2 / Final paths
  hits.sort((a, b) => {
    const score = (p) => (p.includes('r2') ? 0 : 1) + (p.includes('Final') ? 0 : 2)
    return score(a) - score(b)
  })
  return hits[0] ?? null
}

function parseBands(text) {
  // Lines like: OPTIMAL < 65  OR  OPTIMAL 65 – 79  OR Low Storage <15
  const bands = []
  const re =
    /^\s*([A-Za-z][A-Za-z0-9_/ -]*?)\s+(?:([<>]=?|≥|≤)\s*)?(\d+(?:\.\d+)?)\s*(?:[–\-—]\s*(\d+(?:\.\d+)?))?\s*(?:#|$)/gm
  let m
  while ((m = re.exec(text)) !== null) {
    const id = m[1].trim().replace(/\s+/g, '_').toUpperCase()
    if (/DIRECTION|CANONICAL|CONFIG|VALIDITY|CONFIDENCE|TIER|CAV|S\d/.test(id)) continue
    const op = m[2]
    const a = Number(m[3])
    const b = m[4] != null ? Number(m[4]) : null
    if (op === '<' || op === '≤') bands.push({ id, lt: op === '≤' ? a + 1e-9 : a })
    else if (op === '>' || op === '≥') bands.push({ id, gte: a })
    else if (b != null) bands.push({ id, gte: a, lt: b + (text.includes('≤') ? 1e-9 : 0) })
    else bands.push({ id, gte: a })
  }
  return bands
}

function deriveLegacyThresholds(direction, bands, manual) {
  if (manual.optimal_max != null && manual.above_target_min != null) {
    return {
      optimal_max: manual.optimal_max,
      above_target_min: manual.above_target_min,
    }
  }
  if (!bands.length) return null

  if (direction === 'LOWER_BETTER') {
    // First band ceiling = optimal; first "elevated/above/high/significant" floor = above_target
    const opt = bands.find((b) => /OPTIMAL|GOOD|REFERENCE/.test(b.id) && b.lt != null)
    const above = bands.find((b) =>
      /ABOVE|ELEVATED|HIGH|SIGNIFICANT|FLAG|WATCH/.test(b.id),
    )
    if (opt?.lt != null && above?.gte != null) {
      return { optimal_max: opt.lt, above_target_min: above.gte }
    }
    if (opt?.lt != null && bands[1]?.gte != null) {
      return { optimal_max: opt.lt, above_target_min: bands[1].gte }
    }
  }

  if (direction === 'HIGHER_BETTER') {
    const opt = bands.find((b) => /OPTIMAL|GOOD|G1|REFERENCE/.test(b.id))
    const low = bands.find((b) => /LOW|BELOW|G3|REDUCED|FLAG/.test(b.id))
    if (opt?.gte != null && low?.lt != null) {
      return { optimal_max: opt.gte, above_target_min: low.lt }
    }
    if (manual.optimal_max != null && manual.above_target_min != null) {
      return {
        optimal_max: manual.optimal_max,
        above_target_min: manual.above_target_min,
      }
    }
  }

  return null
}

function extractFromMd(mdPath) {
  const text = fs.readFileSync(mdPath, 'utf8')
  const unit =
    text.match(/canonical_unit:\s*([^\n#]+)/i)?.[1]?.trim().split(/\s+/)[0] ?? null
  const direction =
    text.match(/DIRECTION:\s*(LOWER_BETTER|HIGHER_BETTER|TWO_SIDED|TARGET_BAND)/i)?.[1]?.toUpperCase() ??
    null
  const version = text.match(/config_version:\s*([\d.]+)/i)?.[1] ?? '1.0'
  const date =
    text.match(/\*\*Date:\*\*\s*([^\n*]+)/i)?.[1]?.trim() ??
    text.match(/Date:\s*([0-9]{1,2}\s+\w+\s+20\d{2})/i)?.[1]?.trim() ??
    null

  // Prefer §0.2 / wellness band fenced block
  const impl = text.split(/#\s*0\.\s*IMPLEMENTATION SUMMARY/i)[1] ?? text
  const bandBlock =
    impl.match(/```[\s\S]*?(OPTIMAL|Low Storage|G1|Suppressed|Very Low)[\s\S]*?```/i)?.[0] ??
    impl.slice(0, 4000)
  const bands = parseBands(bandBlock)

  return { unit, direction, version, date, bands, text }
}

function claim({
  claim_id,
  assertion,
  value,
  unit,
  version,
  date,
  anchored,
  provenance,
}) {
  return {
    claim_id,
    assertion,
    value: value ?? null,
    unit: unit ?? null,
    version: anchored ? version : '0.0.0',
    effective_date: anchored ? date : null,
    author: anchored ? AUTHOR : null,
    provenance: anchored ? provenance : null,
    evidence_grade: anchored ? 'B' : null,
    review_status: anchored ? 'ANCHORED' : 'DECLARED',
  }
}

function buildClaims(sclId, manual, extracted) {
  const date = isoDate(manual.date || extracted.date || EFFECTIVE)
  const version = extracted.version || '1.0.0'
  if (!version.includes('.')) {
    // ok
  }
  const semver = version.split('.').length >= 2 ? `${version}.0`.replace(/(\d+\.\d+)\.0\.0/, '$1.0') : `${version}.0`
  const v = /^\d+\.\d+\.\d+$/.test(version) ? version : version === '1.0' ? '1.0.0' : `${version}.0`

  const direction =
    manual.direction ||
    (extracted.direction === 'TWO_SIDED' ? 'TARGET_BAND' : extracted.direction) ||
    'LOWER_BETTER'

  const thresholds = deriveLegacyThresholds(direction, extracted.bands, manual)
  const thresholdClaimId = `BIOSENSE_${manual.analyte}_THRESHOLD_SET`
  const prefix = manual.analyte

  const thresholdValue = thresholds
    ? {
        PRIMARY_PREVENTION_UNSELECTED: {
          optimal_max: thresholds.optimal_max,
          above_target_min: thresholds.above_target_min,
          wellness_bands: extracted.bands,
          direction,
        },
        // Default key the engine falls back to
        DEFAULT: {
          optimal_max: thresholds.optimal_max,
          above_target_min: thresholds.above_target_min,
          wellness_bands: extracted.bands,
          direction,
        },
      }
    : direction === 'TARGET_BAND' && extracted.bands.length
      ? {
          DEFAULT: {
            format: 'wellness_bands',
            direction: 'TARGET_BAND',
            wellness_bands: extracted.bands,
            // Placeholder floors so parseThresholdSet still accepts the shape
            // for display metadata; assignBand for TARGET_BAND uses wellness_bands.
            optimal_max: extracted.bands.find((b) => b.gte != null)?.gte ?? 0,
            above_target_min: extracted.bands.find((b) => b.lt != null)?.lt ?? 0,
          },
        }
      : null

  const prov = `${sclId} Scientific Configuration Pack v${v} — ${manual.display_name}`

  const claims = [
    claim({
      claim_id: thresholdClaimId,
      assertion: `${manual.display_name} BioSense wellness band / threshold set from ${sclId}.`,
      value: thresholdValue,
      unit: manual.unit || extracted.unit,
      version: v,
      date,
      anchored: thresholdValue != null,
      provenance: prov,
    }),
    claim({
      claim_id: `${prefix}_SCORE_GAP_SCALE`,
      assertion: `Gap-to-target scale for ${manual.display_name} continuous score (product decision; not set in SCL pack).`,
      value: null,
      unit: manual.unit || extracted.unit,
      version: v,
      date,
      anchored: false,
      provenance: prov,
    }),
    claim({
      claim_id: `${prefix}_SIGNIFICANT_CHANGE_THRESHOLD`,
      assertion: `Significant-change / RCV threshold for ${manual.display_name}. Numeric delta not specified in ${sclId}; qualitative only.`,
      value: null,
      unit: manual.unit || extracted.unit,
      version: v,
      date,
      anchored: false,
      provenance: prov,
    }),
    claim({
      claim_id: `${prefix}_ACUTE_RECOVERY_WINDOW`,
      assertion: `Acute-context recovery window (days) for ${manual.display_name}.`,
      value: null,
      unit: 'days',
      version: v,
      date,
      anchored: false,
      provenance: prov,
    }),
    claim({
      claim_id: `${prefix}_LIFESTYLE_ADDRESSABLE_GAP_CEILING`,
      assertion: `Gap ceiling above which ${manual.display_name} escalates from lifestyle to clinician discussion.`,
      value: manual.lifestyle_gap_ceiling ?? null,
      unit: manual.unit || extracted.unit,
      version: v,
      date,
      anchored: manual.lifestyle_gap_ceiling != null,
      provenance: prov,
    }),
    claim({
      claim_id: `${prefix}_LOW_INVESTIGATION_THRESHOLD`,
      assertion: `Low-end investigation threshold for ${manual.display_name}.`,
      value: manual.low_investigation_threshold ?? null,
      unit: manual.unit || extracted.unit,
      version: v,
      date,
      anchored: manual.low_investigation_threshold != null,
      provenance: prov,
    }),
    claim({
      claim_id: `${prefix}_FH_PATTERN_THRESHOLD`,
      assertion: `Pattern-referral threshold for ${manual.display_name}. Unanchored unless the SCL pack defines one.`,
      value: null,
      unit: manual.unit || extracted.unit,
      version: v,
      date,
      anchored: false,
      provenance: prov,
    }),
  ]

  // Shared lexicons once (ApoB pack owns the IDs the engine already references)
  if (sclId === 'SCL-001') {
    claims.push(
      claim({
        claim_id: 'BIOSENSE_LIPID_DRUG_LEXICON',
        assertion: 'Lipid drug names the narrative must never emit. Enumerable list not supplied in SCL-001; policy is never recommend meds.',
        value: null,
        unit: null,
        version: v,
        date,
        anchored: false,
        provenance: prov,
      }),
      claim({
        claim_id: 'BIOSENSE_PROHIBITED_CONDITION_LEXICON',
        assertion: 'Condition/gene names the narrative must never emit. Enumerable list not supplied; rule is never name conditions.',
        value: null,
        unit: null,
        version: v,
        date,
        anchored: false,
        provenance: prov,
      }),
    )
  }

  return {
    claims,
    meta: {
      scl_id: sclId,
      analyte: manual.analyte,
      display_name: manual.display_name,
      aliases: manual.aliases,
      unit: manual.unit || extracted.unit,
      conversions: manual.conversions || { [manual.unit || 'value']: 1 },
      direction,
      threshold_claim: thresholdClaimId,
      companion_threshold_set: manual.companion ?? null,
      config_version: `${manual.analyte}_CONFIG@${v}`,
      banding_anchored: thresholdValue != null,
      band_count: extracted.bands.length,
      source_date: date,
    },
  }
}

function isoDate(d) {
  if (!d) return EFFECTIVE
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d
  const t = Date.parse(d)
  if (!Number.isNaN(t)) return new Date(t).toISOString().slice(0, 10)
  return EFFECTIVE
}

function slug(analyte) {
  return analyte.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function main() {
  if (!fs.existsSync(SCI_ROOT)) {
    console.error('SCI Documents folder not found:', SCI_ROOT)
    process.exit(1)
  }
  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.mkdirSync(DOCS_DIR, { recursive: true })

  const registry = []
  const summary = []

  for (const folder of fs.readdirSync(SCI_ROOT)) {
    const m = folder.match(/^(SCL-\d{3})/)
    if (!m) continue
    const sclId = m[1]
    const manual = MANUAL[sclId]
    if (!manual) {
      console.warn('No MANUAL entry for', sclId)
      continue
    }
    const folderPath = path.join(SCI_ROOT, folder)
    const md = findPackMd(folderPath)
    if (!md) {
      console.warn('No pack md for', sclId)
      continue
    }

    // Copy source into docs/scl for provenance
    const destDocDir = path.join(DOCS_DIR, sclId)
    fs.mkdirSync(destDocDir, { recursive: true })
    fs.copyFileSync(md, path.join(destDocDir, path.basename(md)))

    const extracted = extractFromMd(md)
    const { claims, meta } = buildClaims(sclId, manual, extracted)
    const outFile = path.join(OUT_DIR, `${slug(manual.analyte)}.json`)
    fs.writeFileSync(outFile, JSON.stringify(claims, null, 2) + '\n')

    registry.push(meta)
    summary.push({
      scl: sclId,
      analyte: manual.analyte,
      banding: meta.banding_anchored ? 'ANCHORED' : 'DECLARED',
      bands: meta.band_count,
      unit: meta.unit,
      direction: meta.direction,
      file: path.relative(process.cwd(), outFile),
    })
    console.log(
      `${sclId} ${manual.analyte}: banding=${meta.banding_anchored ? 'ON' : 'OFF'} bands=${meta.band_count} ← ${path.basename(md)}`,
    )
  }

  // Also write LDL-C claim into ApoB companion id used by engine
  // (SCL-003 writes BIOSENSE_LDL_C_THRESHOLD_SET; engine expects BIOSENSE_LDLC_THRESHOLD_SET)
  const ldlPath = path.join(OUT_DIR, 'ldl-c.json')
  if (fs.existsSync(ldlPath)) {
    const ldlClaims = JSON.parse(fs.readFileSync(ldlPath, 'utf8'))
    const set = ldlClaims.find((c) => c.claim_id.includes('THRESHOLD_SET'))
    if (set) {
      const alias = {
        ...set,
        claim_id: 'BIOSENSE_LDLC_THRESHOLD_SET',
        assertion:
          set.assertion + ' (alias id for ApoB companion binding).',
      }
      // Ensure ApoB file also carries the companion alias
      const apobPath = path.join(OUT_DIR, 'apob-total.json')
      // Keep classic filename apob.json for existing imports too
      const classic = path.join(OUT_DIR, 'apob.json')
      for (const p of [apobPath, classic]) {
        if (!fs.existsSync(p) && p.endsWith('apob.json')) continue
      }
      // Merge alias into apob-total + rewrite apob.json as the canonical engine load
      const apobClaims = JSON.parse(fs.readFileSync(apobPath, 'utf8'))
      const withoutOld = apobClaims.filter(
        (c) => c.claim_id !== 'BIOSENSE_LDLC_THRESHOLD_SET',
      )
      withoutOld.push(alias)
      // Rename ApoB threshold claim to the ID the engine already binds
      for (const c of withoutOld) {
        if (c.claim_id === 'BIOSENSE_APOB_TOTAL_THRESHOLD_SET') {
          c.claim_id = 'BIOSENSE_APOB_THRESHOLD_SET'
        }
        if (c.claim_id.startsWith('APOB_TOTAL_')) {
          c.claim_id = c.claim_id.replace('APOB_TOTAL_', 'APOB_')
        }
      }
      fs.writeFileSync(classic, JSON.stringify(withoutOld, null, 2) + '\n')
      fs.writeFileSync(apobPath, JSON.stringify(withoutOld, null, 2) + '\n')
      console.log('Wrote canonical apob.json with LDLC companion alias')
    }
  }

  const ts = `/**
 * AUTO-GENERATED by scripts/import-scl-packs.mjs — do not edit by hand.
 * Re-run the importer after Neil drops updated SCL packs.
 */
import type { BiomarkerConfig } from './config'
import { registerBiomarkerConfig } from './config'
import { registerClaimSource } from './csl'

${registry
  .map((r) => `import ${r.analyte}_CLAIMS from './csl-data/${slug(r.analyte)}.json'`)
  .join('\n')}

export const SCL_REGISTRY = ${JSON.stringify(registry, null, 2)} as const

export function registerAllSclPacks(): void {
${registry
  .map(
    (r) => `  registerClaimSource('csl-data/${slug(r.analyte)}.json', ${r.analyte}_CLAIMS as never)
  registerBiomarkerConfig({
    analyte: '${r.analyte}',
    display_name: '${r.display_name.replace(/'/g, "\\'")}',
    ingestion: {
      unit_canonical: '${r.unit}',
      conversions: ${JSON.stringify(r.conversions)},
      aliases: ${JSON.stringify(r.aliases)},
      scope_population: 'ADULT',
    },
    direction: '${r.direction}',
    cumulative_exposure_relevant: ${r.direction === 'LOWER_BETTER' ? 'true' : 'false'},
    constants: {
      threshold_set: '${r.analyte === 'APOB_TOTAL' ? 'BIOSENSE_APOB_THRESHOLD_SET' : r.threshold_claim}',
      score_gap_scale: '${r.analyte === 'APOB_TOTAL' ? 'APOB_SCORE_GAP_SCALE' : r.analyte + '_SCORE_GAP_SCALE'}',
      significant_change_threshold: '${r.analyte === 'APOB_TOTAL' ? 'APOB_SIGNIFICANT_CHANGE_THRESHOLD' : r.analyte + '_SIGNIFICANT_CHANGE_THRESHOLD'}',
      acute_recovery_window: '${r.analyte === 'APOB_TOTAL' ? 'APOB_ACUTE_RECOVERY_WINDOW' : r.analyte + '_ACUTE_RECOVERY_WINDOW'}',
      lifestyle_gap_ceiling: '${r.analyte === 'APOB_TOTAL' ? 'APOB_LIFESTYLE_ADDRESSABLE_GAP_CEILING' : r.analyte + '_LIFESTYLE_ADDRESSABLE_GAP_CEILING'}',
      low_investigation_threshold: '${r.analyte === 'APOB_TOTAL' ? 'APOB_LOW_INVESTIGATION_THRESHOLD' : r.analyte + '_LOW_INVESTIGATION_THRESHOLD'}',
      fh_pattern_threshold: '${r.analyte === 'APOB_TOTAL' ? 'APOB_FH_PATTERN_THRESHOLD' : r.analyte + '_FH_PATTERN_THRESHOLD'}',
      ${r.companion_threshold_set ? `companion_threshold_set: '${r.companion_threshold_set}',` : ''}
    },
    recommendation_ladder: {
      large_gap: 'HIGH',
      lifestyle_addressable: 'MEDIUM',
      maintenance: 'LOW',
      low_investigation: 'MEDIUM',
    },
    recommendation_routing: {
      LIFESTYLE_DIETARY: 'SELF_CARE',
      LIFESTYLE_ACTIVITY: 'SELF_CARE',
      MONITOR: 'SELF_CARE',
      CLINICIAN_DISCUSSION: 'CLINICIAN',
    },
    lexicons: {
      drug_lexicon: 'BIOSENSE_LIPID_DRUG_LEXICON',
      prohibited_condition_lexicon: 'BIOSENSE_PROHIBITED_CONDITION_LEXICON',
    },
    recommendation_allowlist: [
      'LIFESTYLE_DIETARY',
      'LIFESTYLE_ACTIVITY',
      'MONITOR',
      'CLINICIAN_DISCUSSION',
    ],
    prohibited_recommendation_classes: [
      'PHARMACOLOGICAL_START',
      'PHARMACOLOGICAL_STOP',
      'PHARMACOLOGICAL_CHANGE',
      'THERAPY_UNNECESSARY',
    ],
    structural_nulls: {
      condition_named: null,
      numeric_risk_score: null,
      low_value_penalty: 0,
    },
    config_version: '${r.config_version}',
  } satisfies BiomarkerConfig)
`,
  )
  .join('\n')}
}
`

  fs.writeFileSync(REGISTRY_PATH, ts)
  fs.writeFileSync(
    path.join(OUT_DIR, '_import-summary.json'),
    JSON.stringify(summary, null, 2) + '\n',
  )
  console.log('\nRegistry →', path.relative(process.cwd(), REGISTRY_PATH))
  console.log(
    `Anchored banding: ${summary.filter((s) => s.banding === 'ANCHORED').length}/${summary.length}`,
  )
}

main()
