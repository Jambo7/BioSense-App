import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local', override: true })

const connectionString = process.env.DATABASE_URL.replace(
  /sslmode=(?:require|prefer|verify-ca)/gi,
  'sslmode=verify-full',
)
const prisma = new PrismaClient({ adapter: new PrismaPg(new Pool({ connectionString })) })

try {
  const syncs = await prisma.wearableSync.findMany({
    select: { userId: true, provider: true, lastSync: true, data: true },
  })

  for (const s of syncs) {
    const data = s.data ?? {}
    const payloads = data.payloads ?? {}
    console.log(`\n=== ${s.provider} | user ${s.userId} | lastSync ${s.lastSync?.toISOString() ?? 'never'} ===`)
    console.log('terraUserId:', data.terraUserId ?? '(none)')

    for (const [type, entry] of Object.entries(payloads)) {
      const recs = Array.isArray(entry?.data) ? entry.data : []
      console.log(`\n  [${type}] receivedAt=${entry?.receivedAt ?? '?'} records=${recs.length}`)
      const first = recs[0]
      if (first) {
        // Show a few identifying fields to judge real-vs-generator.
        const meta = first.metadata ?? {}
        console.log('    metadata.start_time :', meta.start_time ?? meta.date ?? '?')
        console.log('    metadata.upload_type:', meta.upload_type ?? '?')
        console.log('    data_enrichment     :', first.data_enrichment ? 'present' : 'absent')
        // Print a compact slice of the record keys so we can see what's populated.
        console.log('    record keys         :', Object.keys(first).join(', '))
      }
    }
  }
} finally {
  await prisma.$disconnect()
}
