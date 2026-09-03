import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { hitRateLimit } from '@/lib/rate-limit'
import { TSB } from '@/lib/security-baseline'

export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const limited = await hitRateLimit({
    key: `export:${authed.id}`,
    limit: TSB.exportPerUserPerHour,
    windowMs: 60 * 60 * 1000,
  })
  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Too many export requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSec) } },
    )
  }

  const [
    user,
    checkins,
    healthScores,
    bloodResults,
    biologicalAges,
    patterns,
    chatMessages,
    consents,
    learnedFacts,
    userGoals,
    insights,
    wearableDays,
    weeklyReports,
    monthlyReports,
    wearableSyncs,
    preferenceChanges,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: authed.id },
      select: {
        name: true,
        email: true,
        age: true,
        country: true,
        dob: true,
        biologicalSex: true,
        activityLevel: true,
        sleepQuality: true,
        energyLevel: true,
        baselineStress: true,
        goalType: true,
        goalText: true,
        goalDeadline: true,
        goals: true,
        allergies: true,
        conditions: true,
        lifestyle: true,
        preferences: true,
        notifyProductEmail: true,
        notifyMarketingEmail: true,
        subscriptionStatus: true,
        createdAt: true,
      },
    }),
    prisma.dailyCheckin.findMany({ where: { userId: authed.id } }),
    prisma.healthScore.findMany({ where: { userId: authed.id } }),
    prisma.bloodResult.findMany({
      where: { userId: authed.id },
      select: { drawDate: true, markers: true, aiSummary: true, createdAt: true },
    }),
    prisma.biologicalAge.findMany({
      where: { userId: authed.id },
      select: { date: true, bioAge: true, calendarAge: true, delta: true, drivers: true },
    }),
    prisma.pattern.findMany({ where: { userId: authed.id } }),
    prisma.chatMessage.findMany({ where: { userId: authed.id } }),
    prisma.consent.findMany({
      where: { userId: authed.id },
      select: {
        purpose: true,
        status: true,
        consentVersion: true,
        privacyVersion: true,
        tcVersion: true,
        createdAt: true,
        withdrawnAt: true,
      },
    }),
    prisma.learnedFact.findMany({
      where: { userId: authed.id },
      select: { section: true, text: true, confidence: true, createdAt: true },
    }),
    prisma.userGoal.findMany({ where: { userId: authed.id } }),
    prisma.insight.findMany({
      where: { userId: authed.id },
      select: { type: true, title: true, body: true, createdAt: true, savedAt: true },
    }),
    prisma.wearableDay.findMany({ where: { userId: authed.id } }),
    prisma.weeklyReport.findMany({
      where: { userId: authed.id },
      select: { period: true, content: true, generatedAt: true },
    }),
    prisma.monthlyReport.findMany({
      where: { userId: authed.id },
      select: { period: true, content: true, generatedAt: true },
    }),
    prisma.wearableSync.findMany({
      where: { userId: authed.id },
      select: { provider: true, lastSync: true, createdAt: true },
    }),
    prisma.preferenceChange.findMany({
      where: { userId: authed.id },
      select: { field: true, previous: true, next: true, source: true, createdAt: true },
    }),
  ])

  const exportData = {
    exportedAt: new Date().toISOString(),
    format: 'biosense-personal-data-v1',
    notes: [
      'Machine-readable export of personal data BioSense holds for this account.',
      'Wearable OAuth/HealthKit tokens and processor credentials are not included.',
      'Stripe customer identifiers are not included.',
    ],
    user,
    consents,
    emailPreferences: {
      notifyProductEmail: user?.notifyProductEmail,
      notifyMarketingEmail: user?.notifyMarketingEmail,
    },
    checkins,
    healthScores,
    bloodResults,
    biologicalAges,
    patterns,
    chatMessages,
    learnedFacts,
    userGoals,
    insights,
    wearableConnections: wearableSyncs,
    wearableDays,
    weeklyReports,
    monthlyReports,
    preferenceChanges,
  }

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="biosense-data-${authed.id}.json"`,
    },
  })
}
