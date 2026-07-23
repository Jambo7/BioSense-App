// Read-only probe: asks Terra to generate a widget session scoped to GOOGLE.
// If it returns a URL, Google is enabled as a Connection on this Terra account.
// If it errors, Google isn't set up (needs adding in Terra dashboard).
//
// Run: $env:TERRA_DEV_ID="..."; $env:TERRA_API_KEY="..."; node scripts/terra-check-google.mjs

const DEV_ID = process.env.TERRA_DEV_ID ?? ''
const API_KEY = process.env.TERRA_API_KEY ?? ''
const BASE = 'https://api.tryterra.co/v2'

async function probe(providers) {
  const res = await fetch(`${BASE}/auth/generateWidgetSession`, {
    method: 'POST',
    headers: { 'dev-id': DEV_ID, 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reference_id: 'probe-google-check',
      language: 'en',
      ...(providers ? { providers } : {}),
    }),
  })
  const text = await res.text()
  console.log(`providers="${providers ?? '(all)'}" → HTTP ${res.status}`)
  console.log(`   ${text.slice(0, 400)}\n`)
}

async function main() {
  await probe('GOOGLE')
  await probe(undefined) // all enabled providers — shows the full picker set
}

main().catch((e) => { console.error(e); process.exit(1) })
