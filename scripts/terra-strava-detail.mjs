import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local', override: true })
dotenv.config({ path: '.env.terra-prod.local', override: true })

const headers = { 'dev-id': process.env.TERRA_DEV_ID, 'x-api-key': process.env.TERRA_API_KEY }
const userId = 'afa99c98-47b0-4ce1-b4b1-7eb52f5a8af7' // strava

const fmt = (d) => d.toISOString().split('T')[0]
const end = new Date()
const start = new Date()
start.setDate(start.getDate() - 14)

const url = `https://api.tryterra.co/v2/activity?user_id=${userId}&start_date=${fmt(start)}&end_date=${fmt(end)}&to_webhook=false`
const res = await fetch(url, { headers })
const json = await res.json()
const acts = Array.isArray(json.data) ? json.data : []

console.log(`activity records in last 14 days: ${acts.length}\n`)
for (const a of acts) {
  const m = a.metadata ?? {}
  console.log('name          :', m.name ?? a.active_durations_data?.activity_seconds ?? '(unnamed)')
  console.log('type          :', m.type ?? m.activity_type ?? '?')
  console.log('start_time    :', m.start_time)
  console.log('end_time      :', m.end_time)
  console.log('upload/created:', m.upload_type ?? m.created_at ?? '?')
  console.log('summary_id    :', m.summary_id ?? '?')
  console.log('calories      :', a.calories_data?.total_burned_calories ?? '?')
  console.log('avg HR        :', a.heart_rate_data?.summary?.avg_hr_bpm ?? '?')
  console.log('distance (m)  :', a.distance_data?.summary?.distance_meters ?? '?')
  console.log('---')
}
