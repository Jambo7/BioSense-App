import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import {
  GOAL_LABEL,
  ACTIVITY_LABEL,
  SLEEP_LABEL,
  ENERGY_LABEL,
} from '@/lib/registration'
import { z } from 'zod'

const schema = z.object({
  goals: z.array(z.string()).min(1, 'Select at least one goal'),
  dob: z.string().nullable().optional(),
  biologicalSex: z.enum(['MALE', 'FEMALE', 'UNDISCLOSED']).nullable().optional(),
  activityLevel: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']).nullable().optional(),
  sleepQuality: z.enum(['GREAT', 'OKAY', 'POOR']).nullable().optional(),
  energyLevel: z.enum(['HIGH', 'VARIABLE', 'LOW']).nullable().optional(),
  baselineStress: z.number().int().min(1).max(10).nullable().optional(),
  registrationNotes: z.string().max(250).nullable().optional(),
})

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = schema.parse(body)

    const goalLabels = data.goals.map((g) => GOAL_LABEL[g] ?? g)
    const goalText = goalLabels.join(', ')

    // Derive calendar age from DOB so existing age-aware features keep working.
    let age: number | undefined
    if (data.dob) {
      const d = new Date(data.dob)
      if (!Number.isNaN(d.getTime())) {
        const now = new Date()
        let a = now.getFullYear() - d.getFullYear()
        const m = now.getMonth() - d.getMonth()
        if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--
        if (a >= 0 && a < 130) age = a
      }
    }

    await prisma.user.update({
      where: { id: authed.id },
      data: {
        goals: data.goals,
        goalText,
        dob: data.dob ? new Date(data.dob) : null,
        age: age ?? null,
        biologicalSex: data.biologicalSex ?? null,
        activityLevel: data.activityLevel ?? null,
        sleepQuality: data.sleepQuality ?? null,
        energyLevel: data.energyLevel ?? null,
        baselineStress: data.baselineStress ?? null,
        registrationNotes: data.registrationNotes ?? null,
        onboardingDone: true,
      },
    })

    // Seed initial "learned facts" from registration so Learning Mode,
    // Preferences and Memory have meaningful content from day one. Wipe any
    // prior registration-sourced facts first so re-runs stay idempotent.
    const seeds: { section: string; text: string; confidence: string }[] = []
    if (goalLabels.length) {
      seeds.push({
        section: 'goals',
        text: `Top priorities: ${goalLabels.join(', ')}.`,
        confidence: 'High',
      })
    }
    if (data.activityLevel) {
      seeds.push({ section: 'exercise', text: ACTIVITY_LABEL[data.activityLevel], confidence: 'High' })
    }
    if (data.sleepQuality) {
      seeds.push({ section: 'sleep', text: SLEEP_LABEL[data.sleepQuality], confidence: 'High' })
    }
    if (data.energyLevel) {
      seeds.push({ section: 'energy', text: ENERGY_LABEL[data.energyLevel], confidence: 'High' })
    }
    if (data.baselineStress != null) {
      seeds.push({
        section: 'stress',
        text: `Self-rated stress is ${data.baselineStress}/10 on average.`,
        confidence: 'High',
      })
    }
    if (data.registrationNotes) {
      seeds.push({ section: 'lifestyle', text: data.registrationNotes, confidence: 'Medium' })
    }

    await prisma.learnedFact.deleteMany({
      where: { userId: authed.id, source: 'registration' },
    })
    if (seeds.length) {
      await prisma.learnedFact.createMany({
        data: seeds.map((s) => ({
          userId: authed.id,
          section: s.section,
          text: s.text,
          confidence: s.confidence,
          source: 'registration',
        })),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? 'Validation error' }, { status: 400 })
    }
    console.error('Onboarding error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
