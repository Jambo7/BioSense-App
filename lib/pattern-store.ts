/**
 * Persist lag-analysis patterns onto the Pattern table so chat, insights,
 * and reports can read real rows instead of an empty set.
 */
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { MATURITY } from '@/lib/maturity-config'
import { runLagAnalysis, type CheckinPoint } from '@/lib/patterns'

export async function refreshUserPatterns(userId: string): Promise<number> {
  const checkins = await prisma.dailyCheckin.findMany({
    where: { userId },
    orderBy: { date: 'asc' },
    take: 60,
  })

  const points: CheckinPoint[] = checkins.map((c) => ({
    date: c.date.toISOString().split('T')[0],
    energy: c.energy,
    sleep: c.sleep,
    mood: c.mood,
    stress: c.stress,
  }))

  const detected = runLagAnalysis(points).slice(0, MATURITY.PATTERN_MAX_STORED)
  const detectedTypes = new Set(detected.map((p) => p.type))

  const existing = await prisma.pattern.findMany({
    where: { userId },
    select: { id: true, type: true },
  })

  for (const p of detected) {
    const prev = existing.find((e) => e.type === p.type)
    const data = {
      description: p.description,
      confidence: p.confidence,
      scoreImpact: p.scoreImpact ?? null,
      relatedActions: (p.relatedActions ?? null) as Prisma.InputJsonValue,
      isNew: !prev,
    }
    if (prev) {
      await prisma.pattern.update({ where: { id: prev.id }, data })
    } else {
      await prisma.pattern.create({
        data: { userId, type: p.type, ...data },
      })
    }
  }

  const staleIds = existing.filter((e) => !detectedTypes.has(e.type)).map((e) => e.id)
  if (staleIds.length > 0) {
    await prisma.pattern.deleteMany({ where: { id: { in: staleIds } } })
  }

  return detected.length
}
