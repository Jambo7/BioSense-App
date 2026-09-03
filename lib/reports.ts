/**
 * Report generation — adapted from JARVIS generateWeeklyReport/generateDailyBriefing
 * All prompts enforce App 5 language constraints
 */
import { callClaude, BIOSENSE_SYSTEM_PROMPT } from './claude'
import { getWeeklyStats } from './patterns'
import { prisma } from './prisma'
import { outputViolatesSafety, safetyTemplate } from './safety-gate'
import {
  aggregateWearableMetrics,
  formatWearableMetricsSummary,
} from './wearable-metrics'

function sanitizeReportContent(content: object): object {
  try {
    if (outputViolatesSafety(JSON.stringify(content))) {
      return { summary: safetyTemplate('OUTPUT_PROHIBITED') }
    }
  } catch {
    return { summary: safetyTemplate('OUTPUT_PROHIBITED') }
  }
  return content
}

const WEEKLY_REPORT_PROMPT = `${BIOSENSE_SYSTEM_PROMPT}

Generate a weekly health report in JSON format with these exact fields:
{
  "headline": "one sentence summarising the week",
  "whatChanged": "2-3 sentences on key changes",
  "whyItHappened": "2-3 sentences on educational context for the changes",
  "actions": ["action 1", "action 2", "action 3"],
  "effortVsImpact": [{"action": "...", "effort": "low|medium|high", "impact": "low|medium|high"}],
  "insightYouDidntKnow": "one interesting educational insight from the data",
  "patternSnapshot": "brief pattern summary",
  "consistencyNote": "note on check-in consistency"
}

Use only approved language. No medical advice. No diagnoses.`

const MONTHLY_REPORT_PROMPT = `${BIOSENSE_SYSTEM_PROMPT}

Generate a monthly health report in JSON format:
{
  "summary": "2-3 sentence month summary",
  "progress": "description of overall progress",
  "keyPatterns": ["pattern 1", "pattern 2", "pattern 3"],
  "personalDrivers": {
    "positive": ["top positive driver 1", "top positive driver 2"],
    "negative": ["top negative driver 1", "top negative driver 2"]
  },
  "realWins": ["win 1", "win 2"],
  "healthTrajectory": "assessment of current trajectory",
  "cohortNote": "general comparison context (e.g. check-in consistency relative to typical users)"
}

Use only approved language. No medical advice. No diagnoses.`

export async function generateWeeklyReport(userId: string, period: string) {
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - 7)

  const [checkins, score, patterns, wearables, blood] = await Promise.all([
    prisma.dailyCheckin.findMany({
      where: { userId, date: { gte: weekStart } },
      orderBy: { date: 'asc' },
    }),
    prisma.healthScore.findFirst({ where: { userId }, orderBy: { date: 'desc' } }),
    prisma.pattern.findMany({ where: { userId }, orderBy: { discoveredAt: 'desc' }, take: 5 }),
    prisma.wearableSync.findMany({
      where: { userId },
      select: { provider: true, lastSync: true, data: true },
    }),
    prisma.bloodResult.findFirst({
      where: { userId },
      orderBy: { drawDate: 'desc' },
      select: { drawDate: true, aiSummary: true },
    }),
  ])

  const stats = getWeeklyStats(
    checkins.map((c) => ({
      date: c.date.toISOString().split('T')[0],
      energy: c.energy,
      sleep: c.sleep,
      mood: c.mood,
      stress: c.stress,
    })),
  )

  if (!stats || checkins.length < 3) return null

  const metrics = aggregateWearableMetrics(wearables)
  const wearableLine = formatWearableMetricsSummary(metrics)
  const providers = wearables.map((w) => w.provider).join(', ') || 'none'

  const context = `
Week: ${period}
Check-ins: ${stats.checkinsCompleted}/7
Average energy: ${stats.avgEnergy.toFixed(1)}/10
Average sleep: ${stats.avgSleep.toFixed(1)}/10
Average mood: ${stats.avgMood.toFixed(1)}/10
Average stress: ${stats.avgStress.toFixed(1)}/10
Best day: ${stats.bestDay}
Worst day: ${stats.worstDay}
Current health score: ${score?.score ?? 'N/A'}
Connected wearables: ${providers}
Latest wearable metrics: ${wearableLine}
Latest blood: ${
    blood
      ? `${blood.drawDate.toISOString().split('T')[0]} — ${(blood.aiSummary ?? '').slice(0, 240)}`
      : 'none'
  }
Top patterns: ${patterns.map((p) => p.description).join(' | ') || 'none yet'}`

  const response = await callClaude(
    WEEKLY_REPORT_PROMPT,
    `Generate weekly report for:\n${context}`,
    1500,
  )

  let content: object = {}
  try {
    const match = response.match(/\{[\s\S]*\}/)
    if (match) content = sanitizeReportContent(JSON.parse(match[0]))
  } catch {
    content = sanitizeReportContent({ summary: response })
  }

  const report = await prisma.weeklyReport.upsert({
    where: { userId_period: { userId, period } },
    create: {
      userId,
      period,
      content,
      bestDay: stats.bestDay,
      worstDay: stats.worstDay,
      checkinsCompleted: stats.checkinsCompleted,
    },
    update: { content },
  })

  return report
}

export async function generateMonthlyReport(userId: string, period: string) {
  const monthStart = new Date()
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)

  const [checkins, bloodResults, patterns, bioAge, wearables, score] = await Promise.all([
    prisma.dailyCheckin.findMany({
      where: { userId, date: { gte: monthStart } },
      orderBy: { date: 'asc' },
    }),
    prisma.bloodResult.findMany({
      where: { userId },
      orderBy: { drawDate: 'desc' },
      take: 2,
    }),
    prisma.pattern.findMany({ where: { userId }, orderBy: { discoveredAt: 'desc' }, take: 5 }),
    prisma.biologicalAge.findFirst({ where: { userId }, orderBy: { date: 'desc' } }),
    prisma.wearableSync.findMany({
      where: { userId },
      select: { provider: true, lastSync: true, data: true },
    }),
    prisma.healthScore.findFirst({ where: { userId }, orderBy: { date: 'desc' } }),
  ])

  const stats = getWeeklyStats(
    checkins.map((c) => ({
      date: c.date.toISOString().split('T')[0],
      energy: c.energy,
      sleep: c.sleep,
      mood: c.mood,
      stress: c.stress,
    })),
  )

  const metrics = aggregateWearableMetrics(wearables)
  const wearableLine = formatWearableMetricsSummary(metrics)

  const context = `
Month: ${period}
Total check-ins: ${checkins.length}
${stats ? `Average scores — energy: ${stats.avgEnergy.toFixed(1)}, sleep: ${stats.avgSleep.toFixed(1)}, mood: ${stats.avgMood.toFixed(1)}, stress: ${stats.avgStress.toFixed(1)}` : ''}
Health score: ${score?.score ?? 'N/A'}
Wearables: ${wearables.map((w) => w.provider).join(', ') || 'none'} (${wearableLine})
Blood uploads (recent): ${bloodResults.length}
Biological age (wellness estimate) vs calendar: ${bioAge ? `${bioAge.delta > 0 ? '+' : ''}${bioAge.delta.toFixed(1)} years` : 'Not unlocked / not calculated'}
Key patterns: ${patterns.map((p) => `${p.description} (${p.confidence})`).join(' | ') || 'none yet'}`

  const response = await callClaude(
    MONTHLY_REPORT_PROMPT,
    `Generate monthly report for:\n${context}`,
    1800,
  )

  let content: object = {}
  try {
    const match = response.match(/\{[\s\S]*\}/)
    if (match) content = sanitizeReportContent(JSON.parse(match[0]))
  } catch {
    content = sanitizeReportContent({ summary: response })
  }

  const report = await prisma.monthlyReport.upsert({
    where: { userId_period: { userId, period } },
    create: { userId, period, content },
    update: { content },
  })

  return report
}
