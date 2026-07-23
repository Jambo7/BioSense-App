// Read-only: pulls the last 10 days of Fitbit data INLINE from Terra and prints
// the actual step / RHR / HRV / calorie values per day, so we can compare what
// Terra's Fitbit API holds vs. what the owner sees in their phone's health app.
//
// Run (production keys must be set):
//   $env:TERRA_DEV_ID="..."; $env:TERRA_API_KEY="..."; node scripts/terra-inline-values.mjs

const DEV_ID = process.env.TERRA_DEV_ID ?? ''
const API_KEY = process.env.TERRA_API_KEY ?? ''
const BASE = 'https://api.tryterra.co/v2'
const TERRA_USER_ID = '6c3814ce-fc16-4b02-a4df-eb89b9af129f'

if (!DEV_ID || !API_KEY) {
  console.error('Set TERRA_DEV_ID and TERRA_API_KEY (production) first.')
  process.exit(1)
}

const headers = { 'dev-id': DEV_ID, 'x-api-key': API_KEY }
const fmt = (d) => d.toISOString().split('T')[0]

async function getJson(url) {
  const res = await fetch(url, { headers })
  const text = await res.text()
  try { return { status: res.status, json: JSON.parse(text) } }
  catch { return { status: res.status, json: text } }
}

async function main() {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 10)
  const range = `start_date=${fmt(start)}&end_date=${fmt(end)}`

  const r = await getJson(`${BASE}/daily?user_id=${TERRA_USER_ID}&${range}&to_webhook=false`)
  const recs = Array.isArray(r.json?.data) ? r.json.data : []
  console.log(`daily records: ${recs.length}\n`)
  for (const rec of recs) {
    const date = rec?.metadata?.start_time ?? '?'
    const steps = rec?.distance_data?.steps ?? '—'
    const cal = rec?.calories_data?.total_burned_calories ?? '—'
    const rhr = rec?.heart_rate_data?.summary?.resting_hr_bpm ?? '—'
    const hrv = rec?.heart_rate_data?.summary?.avg_hrv_rmssd
      ?? rec?.heart_rate_data?.summary?.avg_hrv_sdnn ?? '—'
    console.log(`${String(date).slice(0,10)} | steps=${steps} | cal=${cal} | rhr=${rhr} | hrv=${hrv}`)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
