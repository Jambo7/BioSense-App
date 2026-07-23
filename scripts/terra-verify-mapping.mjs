/**
 * Verifies that the stored Terra payloads actually map to the metrics the
 * health-score engine expects — by replicating lib/wearable-metrics.ts paths
 * against the REAL stored data, and printing the latest HealthScore per user.
 */
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local', override: true })

const connectionString = process.env.DATABASE_URL.replace(/sslmode=(?:require|prefer|verify-ca)/gi, 'sslmode=verify-full')
const prisma = new PrismaClient({ adapter: new PrismaPg(new Pool({ connectionString })) })

const getPath = (obj, path) => {
  let cur = obj
  for (const key of path.split('.')) {
    if (cur && typeof cur === 'object' && key in cur) cur = cur[key]
    else return undefined
  }
  return cur
}
const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : undefined)
const latest = (v) => (Array.isArray(v) && v.length > 0 ? v[v.length - 1] : undefined)

function metricsFromSyncData(data) {
  const m = {}
  if (!data || typeof data !== 'object') return m
  const daily = latest(getPath(data, 'payloads.daily.data'))
  if (daily) {
    m.rhr = num(getPath(daily, 'heart_rate_data.summary.resting_hr_bpm')) ?? m.rhr
    m.hrv = num(getPath(daily, 'heart_rate_data.summary.avg_hrv_rmssd')) ?? num(getPath(daily, 'heart_rate_data.summary.avg_hrv_sdnn')) ?? m.hrv
    m.steps = num(getPath(daily, 'distance_data.steps')) ?? num(getPath(daily, 'distance_data.summary.steps')) ?? m.steps
    const activitySec = num(getPath(daily, 'active_durations_data.activity_seconds'))
    if (activitySec != null) m.activeMinutes = Math.round(activitySec / 60)
  }
  const sleep = latest(getPath(data, 'payloads.sleep.data'))
  if (sleep) {
    const eff = num(getPath(sleep, 'sleep_durations_data.sleep_efficiency'))
    if (eff != null) m.sleepScore = eff <= 1 ? Math.round(eff * 100) : Math.round(eff)
    m.hrv = num(getPath(sleep, 'heart_rate_data.summary.avg_hrv_rmssd')) ?? num(getPath(sleep, 'heart_rate_data.summary.avg_hrv_sdnn')) ?? m.hrv
    m.rhr = m.rhr ?? num(getPath(sleep, 'heart_rate_data.summary.resting_hr_bpm'))
  }
  return m
}

try {
  const syncs = await prisma.wearableSync.findMany({ select: { userId: true, provider: true, data: true } })
  for (const s of syncs) {
    const metrics = metricsFromSyncData(s.data)
    const score = await prisma.healthScore.findFirst({ where: { userId: s.userId }, orderBy: { date: 'desc' } })
    console.log(`\n=== ${s.provider} (${s.userId}) ===`)
    console.log('  extracted metrics:', JSON.stringify(metrics))
    console.log('  latest HealthScore:', score ? `${score.score} on ${score.date.toISOString().slice(0,10)}` : '(none)')
  }
} finally {
  await prisma.$disconnect()
}
