import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function normalizeDatabaseUrl(url: string): string {
  // pg v8 warns when sslmode=require is used because it currently maps to
  // verify-full; be explicit so the Next.js dev overlay stays clean.
  return url.replace(/sslmode=(?:require|prefer|verify-ca)/gi, 'sslmode=verify-full')
}

function createPrismaClient(): PrismaClient {
  const raw = process.env.DATABASE_URL
  if (!raw) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  const connectionString = normalizeDatabaseUrl(raw)

  // Cloud SQL on Cloud Run uses Unix socket — pg handles this via the host path
  // e.g. postgresql://user:pass@/dbname?host=/cloudsql/project:region:instance
  // For local dev and Neon/Supabase, a standard TCP URL is used.
  const pool = new Pool({ connectionString })

  const adapter = new PrismaPg(pool)
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
