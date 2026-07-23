import fs from 'node:fs'

// Read the key straight from the file (bypass dotenv layering entirely).
const raw = fs.readFileSync('.env.terra-prod.local', 'utf8')
const get = (k) => (raw.match(new RegExp(`^${k}=(.*)$`, 'm'))?.[1] ?? '').trim()
const fileDevId = get('TERRA_DEV_ID')
const apiKey = get('TERRA_API_KEY')

console.log('dev-id in file :', fileDevId)
console.log('api-key length :', apiKey.length, '(first 6:', apiKey.slice(0, 6) + '…)')

// Try the key against a few candidate dev-ids to see which (if any) authenticates.
const candidates = [fileDevId, 'biosense-prod-VLkp5ack0v', 'biosense-prod-VLkp5acWOv']
const seen = new Set()

for (const devId of candidates) {
  if (!devId || seen.has(devId)) continue
  seen.add(devId)
  const res = await fetch('https://api.tryterra.co/v2/subscriptions', {
    headers: { 'dev-id': devId, 'x-api-key': apiKey },
  })
  let note = ''
  if (res.ok) {
    const j = await res.json().catch(() => ({}))
    const users = j.users ?? j.subscriptions ?? []
    note = `OK — ${Array.isArray(users) ? users.length : '?'} users`
  } else {
    note = await res.text().catch(() => '')
  }
  console.log(`\n[${devId}]  HTTP ${res.status}  ${note.slice(0, 200)}`)
}
