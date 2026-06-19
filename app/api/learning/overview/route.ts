import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { computeProgress } from '@/lib/learning'
import {
  GOAL_LABEL,
  ACTIVITY_LABEL,
  SLEEP_LABEL,
  ENERGY_LABEL,
} from '@/lib/registration'

export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = authed.id

  const [user, facts, activeSession] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        goals: true,
        activityLevel: true,
        sleepQuality: true,
        energyLevel: true,
        baselineStress: true,
        age: true,
        country: true,
        registrationNotes: true,
      },
    }),
    prisma.learnedFact.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { id: true, section: true, text: true, confidence: true, source: true, updatedAt: true },
    }),
    prisma.learningSession.findFirst({
      where: { userId, status: 'active' },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, section: true },
    }),
  ])

  const counts: Record<string, number> = {}
  for (const f of facts) counts[f.section] = (counts[f.section] ?? 0) + 1
  const progress = computeProgress(counts)

  const snapshot = {
    topPriorities: (user?.goals ?? []).map((g) => GOAL_LABEL[g] ?? g),
    activity: user?.activityLevel ? ACTIVITY_LABEL[user.activityLevel] : null,
    sleep: user?.sleepQuality ? SLEEP_LABEL[user.sleepQuality] : null,
    energy: user?.energyLevel ? ENERGY_LABEL[user.energyLevel] : null,
    stress: user?.baselineStress != null ? `${user.baselineStress}/10 on average` : null,
    age: user?.age ?? null,
    country: user?.country ?? null,
    notes: user?.registrationNotes ?? null,
  }

  return NextResponse.json({
    name: user?.name ?? null,
    facts,
    factCount: facts.length,
    progress,
    snapshot,
    activeSession,
  })
}
