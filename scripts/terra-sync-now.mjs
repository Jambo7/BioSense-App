/**
 * One-off manual sync using PRODUCTION Terra creds.
 * Pulls the last 14 days inline (to_webhook=false) for every connected user and
 * stores it onto WearableSync exactly like the cron/webhook helper does.
 * Read+write against the prod DB. Score recalculation is left to the app.
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
const headers = { 'dev-id': devId, 'x-api-key': apiKey }
console.log('Terra dev-id:', devId)

const TYPES = ['daily', 'sleep', 'activity', 'body']
const fmt = (d) => d.toISOString().split('T')[0]
const end = new Date()
const start = new Date()
start.setDate(start.getDate() - 14)

const connectionString = process.env.DATABASE_URL.replace(
  /sslmode=(?:require|prefer|verify-ca)/gi,
  'sslmode=verify-full',
)
const prisma = new PrismaClient({ adapter: new PrismaPg(new Pool({ connectionString })) })

try {
  const syncs = await prisma.wearableSync.findMany({
    select: { userId: true, provider: true, data: true },
  })

  for (const s of syncs) {
    const terraUserId = typeof s.data?.terraUserId === 'string' ? s.data.terraUserId : null
    if (!terraUserId) {
      console.log(`\n${s.provider} (${s.userId}) — no terraUserId, skipping`)
      continue
    }

    const prevData = s.data ?? {}
    const prevPayloads = prevData.payloads ?? {}
    const receivedAt = new Date().toISOString()
    const merged = { ...prevPayloads }
    const summary = []

    for (const type of TYPES) {
      const url = `https://api.tryterra.co/v2/${type}?user_id=${terraUserId}&start_date=${fmt(start)}&end_date=${fmt(end)}&to_webhook=false`
      const res = await fetch(url, { headers })
      if (!res.ok) {
        summary.push(`${type}:HTTP${res.status}`)
        continue
      }
      const json = await res.json().catch(() => ({}))
      const recs = Array.isArray(json.data) ? json.data : []
      if (recs.length > 0) {
        merged[type] = { receivedAt, data: recs }
      }
      summary.push(`${type}:${recs.length}`)
    }

    const nextData = { ...prevData, terraUserId, provider: s.provider, payloads: merged }
    await prisma.wearableSync.update({
      where: { userId_provider: { userId: s.userId, provider: s.provider } },
      data: { lastSync: new Date(), data: nextData },
    })
    console.log(`\n${s.provider} (${s.userId}) stored — ${summary.join('  ')}`)
  }
  console.log('\nDone.')
} finally {
  await prisma.$disconnect()
}
