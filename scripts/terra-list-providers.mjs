// Read-only: lists the provider slugs Terra recognises / has enabled for our
// account, so we can wire the app's Google button to the correct one.
//
// Run: $env:TERRA_DEV_ID="..."; $env:TERRA_API_KEY="..."; node scripts/terra-list-providers.mjs

const DEV_ID = process.env.TERRA_DEV_ID ?? ''
const API_KEY = process.env.TERRA_API_KEY ?? ''
const BASE = 'https://api.tryterra.co/v2'
const headers = { 'dev-id': DEV_ID, 'x-api-key': API_KEY }

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`, { headers })
  const text = await res.text()
  try { return { status: res.status, json: JSON.parse(text) } }
  catch { return { status: res.status, json: text } }
}

async function main() {
  for (const path of ['/integrations', '/integrations/providers', '/subscriptions']) {
    const r = await getJson(path)
    console.log(`GET ${path} → HTTP ${r.status}`)
    const body = typeof r.json === 'string' ? r.json : JSON.stringify(r.json)
    // Surface anything that looks Google-related.
    console.log('  ' + body.slice(0, 1200))
    console.log('')
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
