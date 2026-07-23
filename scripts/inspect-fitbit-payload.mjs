// Read-only: lists every stored Fitbit daily record with its date + key metrics
// so we can see whether ANY day has non-zero steps/activity.
//
// Run: node --env-file=.env scripts/inspect-fitbit-payload.mjs

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const row = await prisma.wearableSync.findFirst({ where: { provider: 'fitbit' } })
  if (!row) { console.log('No fitbit WearableSync row found.'); return }

  const data = row.data ?? {}
  for (const type of ['daily', 'activity', 'sleep']) {
    const arr = data?.payloads?.[type]?.data
    console.log(`\n=== ${type.toUpperCase()} — ${Array.isArray(arr) ? arr.length : 0} record(s) ===`)
    if (!Array.isArray(arr)) continue
    for (const rec of arr) {
      const date = rec?.metadata?.start_time ?? '?'
      const steps = rec?.distance_data?.steps ?? rec?.distance_data?.summary?.steps ?? '—'
      const actSec = rec?.active_durations_data?.activity_seconds ?? '—'
      const cal = rec?.calories_data?.total_burned_calories ?? '—'
      const rhr = rec?.heart_rate_data?.summary?.resting_hr_bpm ?? '—'
      console.log(`  ${String(date).slice(0,10)} | steps=${steps} | activeSec=${actSec} | cal=${cal} | rhr=${rhr}`)
    }
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect(); await pool.end() })
