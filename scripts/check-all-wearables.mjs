import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const syncs = await prisma.wearableSync.findMany({
    include: { 
      user: { select: { email: true, name: true } }
    },
    orderBy: { lastSync: 'desc' }
  })
  
  console.log('All wearable connections:\n')
  console.table(syncs.map(s => ({
    user: s.user?.email || 'unknown',
    provider: s.provider,
    lastSync: s.lastSync?.toISOString() || 'never',
    hasData: s.data ? 'yes' : 'no',
    accessToken: s.accessToken ? s.accessToken.substring(0, 20) + '...' : 'none'
  })))
  
  // Show detailed data for each
  for (const s of syncs) {
    console.log(`\n=== ${s.user?.email} - ${s.provider} ===`)
    if (s.data) {
      const data = typeof s.data === 'string' ? JSON.parse(s.data) : s.data
      console.log('Terra User ID:', data.terraUserId || 'unknown')
      console.log('Connected at:', data.connectedAt || 'unknown')
      console.log('Last auth status:', data.lastAuthStatus || 'unknown')
      
      // Payloads are stored as { daily: {...}, sleep: {...}, activity: {...}, body: {...} }
      if (data.payloads && typeof data.payloads === 'object') {
        const types = Object.keys(data.payloads)
        console.log('Payload types received:', types.length ? types.join(', ') : 'none')
        for (const [type, payload] of Object.entries(data.payloads)) {
          const p = payload
          const receivedAt = p.receivedAt || 'unknown'
          const dataArr = p.data
          let summary = 'no data array'
          if (Array.isArray(dataArr)) {
            summary = `${dataArr.length} records`
          } else if (dataArr && typeof dataArr === 'object') {
            summary = `object with keys: ${Object.keys(dataArr).slice(0,5).join(', ')}`
          }
          console.log(`  - ${type}: ${summary} (received: ${receivedAt})`)
        }
      } else {
        console.log('No payloads yet')
      }
    } else {
      console.log('No data stored')
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
