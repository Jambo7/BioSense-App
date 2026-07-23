// At-a-glance status of the 8 wearable tester accounts: who has connected their
// device, when it last synced, and whether REAL data (sleep/daily/activity) has
// landed vs just the connect handshake.
//
// Run:
//   node --env-file=.env scripts/monitor-wearable-testers.mjs

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const PROVIDERS = ['oura', 'whoop', 'garmin', 'samsung', 'fitbit', 'strava', 'google', 'peloton']
const emailFor = (slug) => `${slug}@biosense.test`

function ago(date) {
  if (!date) return '—'
  const mins = Math.round((Date.now() - new Date(date).getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 48) return `${hrs}h ago`
  return `${Math.round(hrs / 24)}d ago`
}

async function main() {
  const rows = []

  for (const slug of PROVIDERS) {
    const user = await prisma.user.findUnique({
      where: { email: emailFor(slug) },
      include: { wearableSyncs: true },
    })

    if (!user) {
      rows.push({ wearable: slug, status: 'NO ACCOUNT', lastSync: '—', dataTypes: '—' })
      continue
    }

    // The tester might connect under the provider slug OR a generic 'terra'.
    const sync = user.wearableSyncs.find((s) => s.provider === slug) ?? user.wearableSyncs[0]

    if (!sync) {
      rows.push({ wearable: slug, status: 'not connected', lastSync: '—', dataTypes: '—' })
      continue
    }

    const data = sync.data ?? {}
    const payloads = data.payloads ?? {}
    const types = Object.keys(payloads)
    rows.push({
      wearable: slug,
      status: types.length > 0 ? 'DATA FLOWING' : 'connected (handshake only)',
      lastSync: ago(sync.lastSync),
      dataTypes: types.length > 0 ? types.join(', ') : 'none yet',
    })
  }

  console.log(`\nWearable tester status — ${new Date().toLocaleString()}\n`)
  console.table(rows)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
