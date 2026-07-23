import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local', override: true })
dotenv.config({ path: '.env.terra-prod.local', override: true })

const headers = { 'dev-id': process.env.TERRA_DEV_ID, 'x-api-key': process.env.TERRA_API_KEY }
const WEBHOOK = 'https://bio-sense-app-navy.vercel.app/api/wearables/terra/webhook'
const whoopUser = 'cb037aa7-db4e-44f1-b241-bc5d0978ccf5'

// 1) Is the production webhook deployed & reachable?
const ping = await fetch(WEBHOOK, { method: 'GET' })
console.log(`webhook GET ${WEBHOOK}`)
console.log('  ->', ping.status, (await ping.text().catch(() => '')).slice(0, 120))

// 2) Ask Terra to PUSH this user's data to the webhook (real-time path).
const fmt = (d) => d.toISOString().split('T')[0]
const end = new Date()
const start = new Date()
start.setDate(start.getDate() - 7)

console.log('\nrequesting Terra to push to webhook (to_webhook=true):')
for (const type of ['sleep', 'daily', 'activity', 'body']) {
  const url = `https://api.tryterra.co/v2/${type}?user_id=${whoopUser}&start_date=${fmt(start)}&end_date=${fmt(end)}&to_webhook=true`
  const res = await fetch(url, { headers })
  const body = await res.json().catch(() => ({}))
  console.log(`  ${type.padEnd(9)} HTTP ${res.status}  ${JSON.stringify(body).slice(0, 120)}`)
}
console.log('\nPush requested. Terra will deliver to the webhook asynchronously (a few seconds).')
