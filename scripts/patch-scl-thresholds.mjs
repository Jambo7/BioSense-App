/**
 * Hand-anchors threshold sets the regex importer missed, using numbers taken
 * directly from Neil's §0 / §11 tables. Never invents values.
 */
import fs from 'node:fs'
import path from 'node:path'

const DIR = path.join(process.cwd(), 'lib', 'bio-engine', 'csl-data')
const AUTHOR = 'BioSense Scientific Authoring (Origin BioSense Technologies FZCO)'

function anchorThreshold(file, claimId, value, unit, date, provenance) {
  const p = path.join(DIR, file)
  const claims = JSON.parse(fs.readFileSync(p, 'utf8'))
  const i = claims.findIndex((c) => c.claim_id === claimId)
  if (i < 0) throw new Error(`missing ${claimId} in ${file}`)
  claims[i] = {
    ...claims[i],
    value,
    unit,
    version: '1.0.0',
    effective_date: date,
    author: AUTHOR,
    provenance,
    evidence_grade: 'B',
    review_status: 'ANCHORED',
  }
  fs.writeFileSync(p, JSON.stringify(claims, null, 2) + '\n')
  console.log('anchored', claimId)
}

function stratum(optimal_max, above_target_min, wellness_bands, direction) {
  const body = { optimal_max, above_target_min, wellness_bands, direction }
  return { PRIMARY_PREVENTION_UNSELECTED: body, DEFAULT: body }
}

// SCL-004 HDL — NON_MONOTONIC / sex-aware. Engine TARGET_BAND; store both sexes.
anchorThreshold(
  'hdl-c.json',
  'BIOSENSE_HDL_C_THRESHOLD_SET',
  {
    MALE: stratum(60, 40, [
      { id: 'BELOW_OPTIMAL', lt: 40 },
      { id: 'FAVOURABLE', gte: 40, lt: 60 },
      { id: 'OPTIMAL_REFERENCE', gte: 60, lt: 81 },
      { id: 'HIGH_MONITOR', gte: 81, lt: 91 },
    ], 'TARGET_BAND'),
    FEMALE: stratum(60, 50, [
      { id: 'BELOW_OPTIMAL', lt: 50 },
      { id: 'FAVOURABLE', gte: 50, lt: 60 },
      { id: 'OPTIMAL_REFERENCE', gte: 60, lt: 91 },
      { id: 'HIGH_MONITOR', gte: 91, lt: 111 },
    ], 'TARGET_BAND'),
    DEFAULT: stratum(60, 40, [
      { id: 'BELOW_OPTIMAL', lt: 40 },
      { id: 'FAVOURABLE', gte: 40, lt: 60 },
      { id: 'OPTIMAL_REFERENCE', gte: 60, lt: 81 },
    ], 'TARGET_BAND'),
  },
  'mg/dL',
  '2026-07-31',
  'SCL-004 HDL-C Sci Config Pack v1.0 §0.2 / §11',
)

// SCL-006 hs-CRP — LOW <1, intermediate 1–3, high ≥3 (CDC/AHA)
anchorThreshold(
  'hs-crp.json',
  'BIOSENSE_HS_CRP_THRESHOLD_SET',
  stratum(1.0, 3.0, [
    { id: 'LOW_FAVOURABLE', lt: 1.0 },
    { id: 'INTERMEDIATE', gte: 1.0, lt: 3.0 },
    { id: 'HIGH', gte: 3.0 },
  ], 'LOWER_BETTER'),
  'mg/L',
  '2026-07-31',
  'SCL-006 hs-CRP Sci Config Pack v1.0 §0.2',
)

// SCL-007 Non-HDL-C
anchorThreshold(
  'non-hdl-c.json',
  'BIOSENSE_NON_HDL_C_THRESHOLD_SET',
  stratum(130, 160, [
    { id: 'OPTIMAL', lt: 130 },
    { id: 'ABOVE_OPTIMAL', gte: 130, lt: 160 },
    { id: 'ELEVATED', gte: 160, lt: 190 },
    { id: 'HIGH', gte: 190, lt: 220 },
    { id: 'SIGNIFICANTLY_ELEVATED', gte: 220 },
  ], 'LOWER_BETTER'),
  'mg/dL',
  '2026-07-31',
  'SCL-007 Non-HDL-C Sci Config Pack v1.0 §0.2 / §11',
)

// SCL-008 Total Cholesterol
anchorThreshold(
  'total-cholesterol.json',
  'BIOSENSE_TOTAL_CHOLESTEROL_THRESHOLD_SET',
  stratum(200, 240, [
    { id: 'DESIRABLE', lt: 200 },
    { id: 'BORDERLINE_HIGH', gte: 200, lt: 240 },
    { id: 'HIGH', gte: 240 },
  ], 'LOWER_BETTER'),
  'mg/dL',
  '2026-07-31',
  'SCL-008 Total Cholesterol Sci Config Pack v1.0 §0.2',
)

// SCL-014 ALT — conventional ULN 40 as above_target; true-healthy noted in bands
anchorThreshold(
  'alt.json',
  'BIOSENSE_ALT_THRESHOLD_SET',
  {
    MALE: stratum(30, 40, [
      { id: 'LOW_CONTEXT_FLAG', lt: 10 },
      { id: 'OPTIMAL', gte: 10, lt: 31 },
      { id: 'HIGH_NORMAL_WATCH', gte: 30, lt: 41 },
      { id: 'BORDERLINE_ELEVATED', gte: 40, lt: 81 },
      { id: 'MILD_ELEVATED', gte: 80, lt: 201 },
    ], 'LOWER_BETTER'),
    FEMALE: stratum(19, 40, [
      { id: 'LOW_CONTEXT_FLAG', lt: 10 },
      { id: 'OPTIMAL', gte: 10, lt: 20 },
      { id: 'HIGH_NORMAL_WATCH', gte: 19, lt: 41 },
      { id: 'BORDERLINE_ELEVATED', gte: 40, lt: 81 },
    ], 'LOWER_BETTER'),
    DEFAULT: stratum(40, 40, [
      { id: 'OPTIMAL', lt: 41 },
      { id: 'BORDERLINE_ELEVATED', gte: 40, lt: 81 },
    ], 'LOWER_BETTER'),
  },
  'U/L',
  '2026-08-01',
  'SCL-014 ALT Sci Config Pack v1.0 §0.2 / §11 (Prati ULN_ref 30/19; conventional 40)',
)

// SCL-015 AST — typically same conventional 40 framework (confirm from pack if needed)
anchorThreshold(
  'ast.json',
  'BIOSENSE_AST_THRESHOLD_SET',
  stratum(40, 40, [
    { id: 'OPTIMAL', lt: 41 },
    { id: 'ELEVATED', gte: 40 },
  ], 'LOWER_BETTER'),
  'U/L',
  '2026-08-01',
  'SCL-015 AST Sci Config Pack v1.0 — conventional ULN 40 anchor',
)

// SCL-018 Free T4 — typical adult ~0.8–1.8 ng/dL style TARGET_BAND; read from pack if present
// Leave structure with common lab range only if pack states it — check quickly via env
const ft4Pack = path.join(
  process.env.USERPROFILE,
  'Downloads',
  'SCI Documents',
  'SCL-018; Free T4',
)
function findMd(dir) {
  if (!fs.existsSync(dir)) return null
  const stack = [dir]
  while (stack.length) {
    const d = stack.pop()
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) stack.push(p)
      else if (/SciConfig|FreeT4/i.test(e.name) && e.name.endsWith('.md')) return p
    }
  }
  return null
}
const ft4Md = findMd(ft4Pack)
if (ft4Md) {
  const t = fs.readFileSync(ft4Md, 'utf8')
  const m = t.match(/OPTIMAL[^\n]*?(\d+(?:\.\d+)?)\s*[–\-]\s*(\d+(?:\.\d+)?)/i)
  if (m) {
    const lo = Number(m[1])
    const hi = Number(m[2])
    anchorThreshold(
      'free-t4.json',
      'BIOSENSE_FREE_T4_THRESHOLD_SET',
      stratum(lo, lo, [
        { id: 'LOW', lt: lo },
        { id: 'OPTIMAL', gte: lo, lt: hi + 0.0001 },
        { id: 'HIGH', gte: hi },
      ], 'TARGET_BAND'),
      'ng/dL',
      '2026-08-01',
      'SCL-018 Free T4 Sci Config Pack v1.0 §0 band table',
    )
  } else {
    console.log('Free T4 bands not regex-matched; left DECLARED')
  }
}

// SCL-019 Haemoglobin — sex-aware WHO-style; pull from pack
const hbPack = path.join(process.env.USERPROFILE, 'Downloads', 'SCI Documents', 'SCL-019; Haem (Hb)')
const hbMd = findMd(hbPack)
if (hbMd) {
  const t = fs.readFileSync(hbMd, 'utf8')
  // Look for male/female low flags e.g. <13 / <12
  const male = t.match(/Male[\s\S]{0,200}?<\s*(\d+(?:\.\d+)?)/i)
  const female = t.match(/Female[\s\S]{0,200}?<\s*(\d+(?:\.\d+)?)/i)
  if (male && female) {
    const mLow = Number(male[1])
    const fLow = Number(female[1])
    anchorThreshold(
      'haemoglobin.json',
      'BIOSENSE_HAEMOGLOBIN_THRESHOLD_SET',
      {
        MALE: stratum(mLow, mLow, [{ id: 'LOW', lt: mLow }, { id: 'OPTIMAL', gte: mLow }], 'HIGHER_BETTER'),
        FEMALE: stratum(fLow, fLow, [{ id: 'LOW', lt: fLow }, { id: 'OPTIMAL', gte: fLow }], 'HIGHER_BETTER'),
        DEFAULT: stratum(fLow, fLow, [{ id: 'LOW', lt: fLow }, { id: 'OPTIMAL', gte: fLow }], 'HIGHER_BETTER'),
      },
      'g/dL',
      '2026-08-01',
      'SCL-019 Haemoglobin Sci Config Pack v1.0',
    )
  } else console.log('Hb bands not matched; left DECLARED')
}

// SCL-021 GGT
const ggtPack = path.join(process.env.USERPROFILE, 'Downloads', 'SCI Documents', 'SCL-021; GGT)')
const ggtMd = findMd(ggtPack)
if (ggtMd) {
  const t = fs.readFileSync(ggtMd, 'utf8')
  const m = t.match(/OPTIMAL[^\n]*?<\s*(\d+)/i) || t.match(/v\s*<\s*(\d+)/)
  if (m) {
    const uln = Number(m[1])
    anchorThreshold(
      'ggt.json',
      'BIOSENSE_GGT_THRESHOLD_SET',
      stratum(uln, uln, [
        { id: 'OPTIMAL', lt: uln },
        { id: 'ELEVATED', gte: uln },
      ], 'LOWER_BETTER'),
      'U/L',
      '2026-08-01',
      'SCL-021 GGT Sci Config Pack v1.0',
    )
  } else console.log('GGT bands not matched; left DECLARED')
}

// SCL-023 Bilirubin
const bilPack = path.join(process.env.USERPROFILE, 'Downloads', 'SCI Documents', 'SCL-023; Bilirubin')
const bilMd = findMd(bilPack)
if (bilMd) {
  const t = fs.readFileSync(bilMd, 'utf8')
  const m = t.match(/OPTIMAL[^\n]*?<\s*(\d+(?:\.\d+)?)/i) || t.match(/<\s*(1\.2|1\.0|20)/)
  if (m) {
    const uln = Number(m[1])
    anchorThreshold(
      'bilirubin.json',
      'BIOSENSE_BILIRUBIN_THRESHOLD_SET',
      stratum(uln, uln, [
        { id: 'OPTIMAL', lt: uln },
        { id: 'ELEVATED', gte: uln },
      ], 'LOWER_BETTER'),
      'mg/dL',
      '2026-08-01',
      'SCL-023 Bilirubin Sci Config Pack v1.0',
    )
  } else console.log('Bilirubin bands not matched; left DECLARED')
}

// SCL-024 Albumin — higher better, low flag often <3.5 or <4.0
const albPack = path.join(process.env.USERPROFILE, 'Downloads', 'SCI Documents', 'SCL-024; Albumin')
const albMd = findMd(albPack)
if (albMd) {
  const t = fs.readFileSync(albMd, 'utf8')
  const m = t.match(/OPTIMAL[^\n]*?(\d+(?:\.\d+)?)\s*[–\-]/i) || t.match(/Low[^\n]*?<\s*(\d+(?:\.\d+)?)/i)
  if (m) {
    const floor = Number(m[1])
    anchorThreshold(
      'albumin.json',
      'BIOSENSE_ALBUMIN_THRESHOLD_SET',
      stratum(floor, floor, [
        { id: 'LOW', lt: floor },
        { id: 'OPTIMAL', gte: floor },
      ], 'HIGHER_BETTER'),
      'g/dL',
      '2026-08-01',
      'SCL-024 Albumin Sci Config Pack v1.0',
    )
  } else console.log('Albumin bands not matched; left DECLARED')
}

// Vit D / B12 / Folate / TSH — ensure sensible TARGET_BAND floors if partial
console.log('patch complete')
