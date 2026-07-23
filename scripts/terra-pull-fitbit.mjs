// Actively asks Terra's API what it holds for our connected Fitbit user, rather
// than waiting for Terra to push. This tells us:
//   1. Are the local Terra creds Production (do they recognise this user)?
//   2. Does Terra actually have any Fitbit data for them?
//   3. Requesting data also nudges Terra to (re)deliver it to our webhook.
//
// Run:
//   node --env-file=.env scripts/terra-pull-fitbit.mjs

const DEV_ID = process.env.TERRA_DEV_ID ?? ''
const API_KEY = process.env.TERRA_API_KEY ?? ''
const BASE = 'https://api.tryterra.co/v2'

// The Terra user_id for demo@biosense.app (the main tester)
const TERRA_USER_ID = 'e2c32260-2b2a-4513-b4a3-5c4f13a3528c'

if (!DEV_ID || !API_KEY) {
  console.error('TERRA_DEV_ID / TERRA_API_KEY are not set in your local .env.')
  console.error('Tip: these must be the PRODUCTION keys to query a production user.')
  process.exit(1)
}

console.log(`Using dev-id starting "${DEV_ID.slice(0, 6)}…" (length ${DEV_ID.length})\n`)

const headers = { 'dev-id': DEV_ID, 'x-api-key': API_KEY }

function fmtDate(d) {
  return d.toISOString().split('T')[0]
}

async function getJson(url) {
  const res = await fetch(url, { headers })
  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    json = text
  }
  return { status: res.status, json }
}

async function main() {
  // 1. Is this user known to these creds?
  console.log('1) userInfo — is this user known to these credentials?')
  const info = await getJson(`${BASE}/userInfo?user_id=${TERRA_USER_ID}`)
  console.log(`   HTTP ${info.status}`)
  console.log('  ', JSON.stringify(info.json).slice(0, 500))
  console.log('')

  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 14)
  const range = `start_date=${fmtDate(start)}&end_date=${fmtDate(end)}`

  // 2. Ask for actual data across the main types — inline (to_webhook=false)
  //    so the records come back in the response body and we can count them.
  for (const type of ['daily', 'sleep', 'activity']) {
    console.log(`2) ${type} — pulling last 14 days inline`)
    const r = await getJson(`${BASE}/${type}?user_id=${TERRA_USER_ID}&${range}&to_webhook=false`)
    const count = Array.isArray(r.json?.data) ? r.json.data.length : 'n/a'
    console.log(`   HTTP ${r.status} · status="${r.json?.status ?? '?'}" · records=${count}`)
    if (r.json?.message) console.log(`   message: ${r.json.message}`)
    if (Array.isArray(r.json?.data) && r.json.data.length > 0) {
      const keys = Object.keys(r.json.data[0]).slice(0, 8)
      console.log(`   first record keys: ${keys.join(', ')}`)
    }
    console.log('')
  }

  // 3. Now also fire the nudge that pushes data to our webhook so the app DB
  //    fills in (separate from the inline read above).
  console.log('3) Nudging webhook delivery (to_webhook=true) for each type…')
  for (const type of ['daily', 'sleep', 'activity']) {
    const r = await getJson(`${BASE}/${type}?user_id=${TERRA_USER_ID}&${range}&to_webhook=true`)
    console.log(`   ${type}: HTTP ${r.status} status="${r.json?.status ?? '?'}"`)
  }
  console.log('')

  console.log('Done. If records=0 everywhere, Terra has no Fitbit data for this user yet')
  console.log('(common if the Fitbit account itself has little/no recent data, or the')
  console.log('connection needs a reauth). If userInfo was 404, the local keys are not the')
  console.log('Production keys that own this user.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
