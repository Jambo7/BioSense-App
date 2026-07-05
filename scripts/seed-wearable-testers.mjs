// Creates one ready-to-use test account per Terra wearable provider, so a
// person who owns that device can log in on the live app and connect it while
// we monitor the data flowing in.
//
// Each account is pre-flagged (ageVerified / hasConsented / onboardingDone) so
// the tester lands straight on the Wearables page with no onboarding friction.
//
// Run (create or refresh all accounts):
//   node --env-file=.env scripts/seed-wearable-testers.mjs
//
// Remove them all again (cleanup — cascades to their wearable connections):
//   node --env-file=.env scripts/seed-wearable-testers.mjs --remove

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// The 8 Terra providers wired up in app/api/wearables/terra/connect/route.ts.
// Passwords are fixed so testers can keep using the same credentials.
const PROVIDERS = [
  { slug: 'oura', label: 'Oura', password: 'BioSense-Oura-1813' },
  { slug: 'whoop', label: 'Whoop', password: 'BioSense-Whoop-3421' },
  { slug: 'garmin', label: 'Garmin', password: 'BioSense-Garmin-2205' },
  { slug: 'samsung', label: 'Samsung', password: 'BioSense-Samsung-2885' },
  { slug: 'fitbit', label: 'Fitbit', password: 'BioSense-Fitbit-5025' },
  { slug: 'strava', label: 'Strava', password: 'BioSense-Strava-6137' },
  { slug: 'google', label: 'Google Fit', password: 'BioSense-GoogleFit-1044' },
  { slug: 'peloton', label: 'Peloton', password: 'BioSense-Peloton-9799' },
]

const emailFor = (slug) => `${slug}@biosense.test`

const remove = process.argv.includes('--remove')

async function main() {
  if (remove) {
    const emails = PROVIDERS.map((p) => emailFor(p.slug))
    const res = await prisma.user.deleteMany({ where: { email: { in: emails } } })
    console.log(`Removed ${res.count} wearable-tester account(s).`)
    return
  }

  console.log('Creating / refreshing wearable tester accounts...\n')
  const rows = []

  for (const { slug, label, password } of PROVIDERS) {
    const email = emailFor(slug)
    const passwordHash = await bcrypt.hash(password, 10)

    await prisma.user.upsert({
      where: { email },
      update: {
        password: passwordHash,
        name: `${label} Tester`,
        ageVerified: true,
        hasConsented: true,
        onboardingDone: true,
        tutorialDone: true,
      },
      create: {
        email,
        password: passwordHash,
        name: `${label} Tester`,
        ageVerified: true,
        hasConsented: true,
        onboardingDone: true,
        tutorialDone: true,
        allergies: [],
        conditions: [],
        preferences: [],
        goals: [],
      },
    })

    rows.push({ wearable: label, email, password })
  }

  console.log('Done. Credentials (share each with the matching device owner):\n')
  console.table(rows)
  console.log('\nLogin at https://bio-sense-app-navy.vercel.app → Wearables → Connect.')
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
