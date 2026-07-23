// Read-only diagnostic — prints the Fitbit (and any other) WearableSync rows so
// we can see whether Terra is delivering REAL data payloads (sleep/daily/etc)
// or only the connect handshake.
//
// Run:
//   node --env-file=.env scripts/check-fitbit-sync.mjs
// (or --env-file=.env.local if that's where your DATABASE_URL lives)

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

function ago(date) {
  if (!date) return 'never'
  const ms = Date.now() - new Date(date).getTime()
  const mins = Math.round(ms / 60000)
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 48) return `${hrs} hr ago`
  return `${Math.round(hrs / 24)} days ago`
}

const rows = await prisma.wearableSync.findMany({
  orderBy: { lastSync: 'desc' },
})

if (rows.length === 0) {
  console.log('No WearableSync rows at all — nobody is connected in this database.')
} else {
  console.log(`Found ${rows.length} wearable connection(s):\n`)
  for (const r of rows) {
    const data = (r.data ?? {}) ?? {}
    const payloads = data.payloads ?? {}
    const dataTypes = Object.keys(payloads)

    console.log(`── provider: ${r.provider} ──────────────────────────────`)
    console.log(`  userId:         ${r.userId}`)
    console.log(`  lastSync:       ${r.lastSync ? new Date(r.lastSync).toISOString() : 'never'} (${ago(r.lastSync)})`)
    console.log(`  connectedAt:    ${data.connectedAt ?? 'n/a'}`)
    console.log(`  lastAuthStatus: ${data.lastAuthStatus ?? 'n/a'}`)
    console.log(`  terraUserId:    ${data.terraUserId ?? 'n/a'}`)
    if (dataTypes.length === 0) {
      console.log('  data payloads:  NONE  ← only the connect handshake landed, no real data yet')
    } else {
      console.log('  data payloads:')
      for (const t of dataTypes) {
        const p = payloads[t] ?? {}
        console.log(`     - ${t}: received ${p.receivedAt ?? '?'} (${ago(p.receivedAt)})`)
      }
    }
    console.log('')
  }
}

await prisma.$disconnect()
await pool.end()
