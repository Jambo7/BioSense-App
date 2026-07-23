// Manually request Strava data from Terra for our connected user.
// Run: node --env-file=.env scripts/terra-pull-strava.mjs

const DEV_ID = process.env.TERRA_DEV_ID ?? ''
const API_KEY = process.env.TERRA_API_KEY ?? ''
const BASE = 'https://api.tryterra.co/v2'

// Terra user_id for strava@biosense.test
const TERRA_USER_ID = 'afa99c98-47b0-4ce1-b4b1-7eb52f5a8af7'

if (!DEV_ID || !API_KEY) {
  console.error('TERRA_DEV_ID / TERRA_API_KEY not set')
  process.exit(1)
}

console.log(`Using dev-id: ${DEV_ID.slice(0, 10)}...\n`)

const headers = { 'dev-id': DEV_ID, 'x-api-key': API_KEY }

function fmtDate(d) {
  return d.toISOString().split('T')[0]
}

async function getJson(url) {
  const res = await fetch(url, { headers })
  const text = await res.text()
  let json
  try { json = JSON.parse(text) } catch { json = text }
  return { status: res.status, json }
}

async function main() {
  // Check if user is known
  console.log('1) Checking userInfo...')
  const info = await getJson(`${BASE}/userInfo?user_id=${TERRA_USER_ID}`)
  console.log(`   HTTP ${info.status}`)
  if (info.status === 200) {
    console.log('   User found:', info.json?.user?.provider, info.json?.user?.last_webhook_update)
  } else {
    console.log('  ', JSON.stringify(info.json).slice(0, 200))
  }
  console.log('')

  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 7)
  const range = `start_date=${fmtDate(start)}&end_date=${fmtDate(end)}`

  // Request activity data (most relevant for Strava)
  for (const type of ['activity', 'daily', 'body']) {
    console.log(`2) Requesting ${type} (last 7 days)...`)
    const r = await getJson(`${BASE}/${type}?user_id=${TERRA_USER_ID}&${range}&to_webhook=false`)
    const count = Array.isArray(r.json?.data) ? r.json.data.length : 'n/a'
    console.log(`   HTTP ${r.status} · status="${r.json?.status ?? '?'}" · records=${count}`)
    if (r.json?.message) console.log(`   message: ${r.json.message}`)
    if (Array.isArray(r.json?.data) && r.json.data.length > 0) {
      console.log('   Sample record:', JSON.stringify(r.json.data[0]).slice(0, 300))
    }
    console.log('')
  }

  // Also nudge webhook delivery
  console.log('3) Nudging webhook delivery...')
  for (const type of ['activity', 'daily']) {
    const r = await getJson(`${BASE}/${type}?user_id=${TERRA_USER_ID}&${range}&to_webhook=true`)
    console.log(`   ${type}: HTTP ${r.status}`)
  }
}

main().catch(console.error)
