/**
 * Read-only production Terra introspection.
 *
 * Loads DB config from .env.local but overrides the Terra credentials from
 * .env.terra-prod.local, so we can inspect the *production* Terra connections
 * for the users stored in the database — without disturbing the local
 * (testing) env used by the dev server.
 *
 * Usage: node scripts/terra-prod-check.mjs
 */
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local', override: true })
dotenv.config({ path: '.env.terra-prod.local', override: true })

const devId = process.env.TERRA_DEV_ID
const apiKey = process.env.TERRA_API_KEY
if (!devId || !apiKey) {
  console.error('TERRA creds not found — create .env.terra-prod.local with TERRA_DEV_ID and TERRA_API_KEY')
  process.exit(1)
}
console.log('Using TERRA_DEV_ID:', devId)
if (!devId.includes('prod')) {
  console.warn('WARNING: dev id does not look like a production id — is .env.terra-prod.local set?')
}

const TERRA_API_BASE = 'https://api.tryterra.co/v2'
const TYPES = ['daily', 'sleep', 'activity', 'body']
const headers = { 'dev-id': devId, 'x-api-key': apiKey }

const fmt = (d) => d.toISOString().split('T')[0]
const end = new Date()
const start = new Date()
start.setDate(start.getDate() - 7)

const connectionString = process.env.DATABASE_URL.replace(
  /sslmode=(?:require|prefer|verify-ca)/gi,
  'sslmode=verify-full',
)
const prisma = new PrismaClient({ adapter: new PrismaPg(new Pool({ connectionString })) })

async function summarise(records) {
  // Pull a couple of telltale numbers so we can judge real-vs-generated data.
  const first = records[0]
  if (!first) return '(no records)'
  const steps = first?.distance_data?.steps ?? first?.summary?.steps
  const cals = first?.calories_data?.total_burned_calories ?? first?.calories_data?.net_activity_calories
  const hrAvg = first?.heart_rate_data?.summary?.avg_hr_bpm
  return `firstRecord: steps=${steps ?? '?'} cals=${cals ?? '?'} avgHR=${hrAvg ?? '?'} tz=${first?.metadata?.start_time ?? '?'}`
}

try {
  const syncs = await prisma.wearableSync.findMany({ select: { userId: true, provider: true, data: true } })

  for (const s of syncs) {
    const terraUserId = typeof s.data?.terraUserId === 'string' ? s.data.terraUserId : null
    console.log(`\n========== ${s.provider} | user ${s.userId} ==========`)
    console.log('terraUserId:', terraUserId ?? '(none)')
    if (!terraUserId) continue

    // 1) Who is this user, per production Terra?
    const infoRes = await fetch(`${TERRA_API_BASE}/userInfo?user_id=${terraUserId}`, { headers })
    const info = await infoRes.json().catch(() => ({}))
    console.log(`userInfo HTTP ${infoRes.status}:`, JSON.stringify({
      status: info.status,
      provider: info.user?.provider,
      active: info.user?.active,
      scopes: info.user?.scopes,
      last_webhook_update: info.user?.last_webhook_update,
      created_at: info.user?.created_at,
      reference_id: info.user?.reference_id,
    }))

    // 2) What data does production return for the last 7 days?
    for (const type of TYPES) {
      const url = `${TERRA_API_BASE}/${type}?user_id=${terraUserId}&start_date=${fmt(start)}&end_date=${fmt(end)}&to_webhook=false`
      const res = await fetch(url, { headers })
      let line = `  ${type.padEnd(9)} HTTP ${res.status}`
      if (res.ok) {
        const json = await res.json().catch(() => ({}))
        const recs = Array.isArray(json.data) ? json.data : []
        line += `  records=${recs.length}  ${await summarise(recs)}`
      }
      console.log(line)
    }
  }
} finally {
  await prisma.$disconnect()
}
