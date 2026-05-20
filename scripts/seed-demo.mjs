// Idempotent seed script — creates (or refreshes) a single demo user so the
// app's polished screens have populated data for client walkthroughs.
//
// Run after `prisma db push`:
//   node --env-file=.env.local scripts/seed-demo.mjs
//
// Resets and rebuilds:
//   - User: demo@biosense.app  (password: BioSense2026!)
//   - 14 days of daily check-ins (slightly varied to show trend lines)
//   - 3 blood tests over 4 months with realistic marker breakdowns
//   - One health score per day
//   - A couple of discovered patterns

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const EMAIL = 'demo@biosense.app'
const PASSWORD = 'BioSense2026!'
const NAME = 'Demo User'

function daysAgo(n) {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - n)
  return d
}

function rand(min, max) {
  return Math.round(min + Math.random() * (max - min))
}

// Realistic biomarker set with a healthy spread of T1 (in range), T2 (watch),
// and T3 (action) so the BloodDonut shows all three colours.
function buildMarkers({ overall }) {
  // overall: 'good' | 'mixed' | 'improving'
  const base = [
    { name: 'HbA1c',      value: overall === 'good' ? 5.1 : 5.6, unit: '%',     refMin: 4.0, refMax: 5.6, tier: 'T1' },
    { name: 'Glucose',    value: overall === 'good' ? 4.8 : 5.4, unit: 'mmol/L',refMin: 3.9, refMax: 5.5, tier: 'T1' },
    { name: 'Total Cholesterol', value: overall === 'mixed' ? 6.1 : 4.8, unit: 'mmol/L', refMin: 3.0, refMax: 5.2, tier: overall === 'mixed' ? 'T2' : 'T1' },
    { name: 'LDL',        value: overall === 'mixed' ? 4.2 : 2.6, unit: 'mmol/L', refMin: 1.0, refMax: 3.0, tier: overall === 'mixed' ? 'T2' : 'T1' },
    { name: 'HDL',        value: overall === 'good' ? 1.6 : 1.2, unit: 'mmol/L', refMin: 1.0, refMax: 2.5, tier: 'T1' },
    { name: 'Triglycerides', value: 1.2, unit: 'mmol/L', refMin: 0.5, refMax: 1.7, tier: 'T1' },
    { name: 'Vitamin D',  value: overall === 'mixed' ? 38 : 72, unit: 'nmol/L', refMin: 75, refMax: 200, tier: overall === 'mixed' ? 'T3' : 'T2' },
    { name: 'Vitamin B12', value: 380, unit: 'pmol/L', refMin: 191, refMax: 663, tier: 'T1' },
    { name: 'Ferritin',   value: overall === 'mixed' ? 18 : 95, unit: 'ng/mL', refMin: 30, refMax: 400, tier: overall === 'mixed' ? 'T3' : 'T1' },
    { name: 'TSH',        value: 1.8, unit: 'mIU/L', refMin: 0.4, refMax: 4.0, tier: 'T1' },
    { name: 'ALT',        value: 28, unit: 'U/L', refMin: 7,  refMax: 56, tier: 'T1' },
    { name: 'Creatinine', value: 78, unit: 'µmol/L', refMin: 53, refMax: 115, tier: 'T1' },
    { name: 'CRP',        value: overall === 'mixed' ? 3.2 : 0.6, unit: 'mg/L', refMin: 0, refMax: 3, tier: overall === 'mixed' ? 'T2' : 'T1' },
    { name: 'Testosterone', value: 18.5, unit: 'nmol/L', refMin: 10, refMax: 28, tier: 'T1' },
  ]
  return base
}

async function main() {
  console.log('▶ seeding demo account…')

  const passwordHash = await bcrypt.hash(PASSWORD, 10)

  // Idempotent — wipe child rows then upsert the user so re-runs are safe.
  const existing = await prisma.user.findUnique({ where: { email: EMAIL } })
  if (existing) {
    console.log('  · existing demo user found, refreshing data…')
    await prisma.$transaction([
      prisma.dailyCheckin.deleteMany({ where: { userId: existing.id } }),
      prisma.bloodResult.deleteMany({ where: { userId: existing.id } }),
      prisma.healthScore.deleteMany({ where: { userId: existing.id } }),
      prisma.pattern.deleteMany({ where: { userId: existing.id } }),
      prisma.consent.deleteMany({ where: { userId: existing.id } }),
    ])
  }

  const user = await prisma.user.upsert({
    where: { email: EMAIL },
    update: {
      password: passwordHash,
      name: NAME,
      ageVerified: true,
      hasConsented: true,
      onboardingDone: true,
      goalType: 'PERFORMANCE',
      goalText: 'Run a sub-3h30 marathon by spring while staying healthy.',
      age: 34,
      allergies: [],
      conditions: [],
      lifestyle: 'Active — runs 4× a week, lifts 2× a week. Office job. Two coffees a day.',
      preferences: ['Plant-forward diet', 'Strength training', 'Cold exposure'],
    },
    create: {
      email: EMAIL,
      password: passwordHash,
      name: NAME,
      ageVerified: true,
      hasConsented: true,
      onboardingDone: true,
      goalType: 'PERFORMANCE',
      goalText: 'Run a sub-3h30 marathon by spring while staying healthy.',
      age: 34,
      allergies: [],
      conditions: [],
      lifestyle: 'Active — runs 4× a week, lifts 2× a week. Office job. Two coffees a day.',
      preferences: ['Plant-forward diet', 'Strength training', 'Cold exposure'],
    },
  })

  // 14 days of check-ins (slightly varied for trends).
  const checkins = []
  for (let i = 13; i >= 0; i--) {
    const energy = rand(5, 9)
    const sleep  = rand(5, 9)
    const mood   = rand(6, 9)
    const stress = rand(2, 6)
    checkins.push(
      prisma.dailyCheckin.create({
        data: { userId: user.id, date: daysAgo(i), energy, sleep, mood, stress },
      }),
    )
    // Composite health score: heavier weight on energy + sleep, inverse stress.
    const score = Math.round(
      ((energy + sleep + mood) / 3 * 10 + (10 - stress) * 4) / 1.4,
    )
    checkins.push(
      prisma.healthScore.create({
        data: {
          userId: user.id,
          date: daysAgo(i),
          score,
          breakdown: { energy, sleep, mood, stress: 10 - stress },
        },
      }),
    )
  }
  await prisma.$transaction(checkins)

  // 3 blood tests — most recent first.
  await prisma.bloodResult.create({
    data: {
      userId: user.id,
      drawDate: daysAgo(10),
      markers: buildMarkers({ overall: 'good' }),
      aiSummary:
        'Strong overall profile. Cardiometabolic markers continue to improve since the previous draw. Vitamin D has moved out of the action zone but still sits below the optimal target — keep up the sun + supplementation routine.',
    },
  })
  await prisma.bloodResult.create({
    data: {
      userId: user.id,
      drawDate: daysAgo(70),
      markers: buildMarkers({ overall: 'mixed' }),
      aiSummary:
        'Mixed picture. LDL and total cholesterol have crept up — likely diet-driven. Ferritin is low for a training load like yours; consider iron-rich foods or a low-dose supplement. Inflammation marker (CRP) is mildly elevated.',
    },
  })
  await prisma.bloodResult.create({
    data: {
      userId: user.id,
      drawDate: daysAgo(130),
      markers: buildMarkers({ overall: 'improving' }),
      aiSummary:
        'Baseline draw. Most markers are in healthy range. The areas to watch over the coming months: vitamin D and inflammation.',
    },
  })

  // A couple of discovered patterns to populate the Insights page.
  await prisma.pattern.createMany({
    data: [
      {
        userId: user.id,
        type: 'recovery',
        description: 'Energy is consistently higher on days following 7.5h+ sleep — average +1.8 points vs. shorter nights.',
        confidence: 'HIGH',
        scoreImpact: 8,
      },
      {
        userId: user.id,
        type: 'training',
        description: 'Mood dips by 1.2 points the day after long runs >15km — recovery routine may need tuning.',
        confidence: 'MEDIUM',
        scoreImpact: -4,
      },
    ],
  })

  // Consent log
  await prisma.consent.create({
    data: {
      userId: user.id,
      tcVersion: '1.0',
      privacyVersion: '1.0',
      consentVersion: '1.0',
      dataConsentFlag: true,
    },
  })

  console.log(`✔ demo user ready`)
  console.log(`  email:    ${EMAIL}`)
  console.log(`  password: ${PASSWORD}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
