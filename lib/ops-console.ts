import { prisma } from '@/lib/prisma'

export type OpsCounts = {
  meals: number
  mealsEdited: number
  blood: number
  learningSessions: number
  learningComplete: number
  goals: number
  contexts: number
  aiMessages: number
  insights: number
}

export type OpsMember = {
  id: string
  email: string
  name: string | null
  createdAt: string
  country: string | null
  subscriptionStatus: string
  cancelAtPeriodEnd: boolean
  onboardingDone: boolean
  tutorialDone: boolean
  hasConsented: boolean
  notifyProductEmail: boolean
  notifyMarketingEmail: boolean
  emailSuppressed: boolean
  connections: string[]
  counts: OpsCounts
  learning: { section: string; percent: number; status: string }[]
  lastActivityAt: string
  /** Whole days since the last recorded activity. */
  daysQuiet: number
  /** First incomplete step on the path into the app. */
  nextStep: string
  /** Audience ids this person currently sits in. */
  segments: string[]
}

export type OpsSegment = {
  id: string
  label: string
  detail: string
  count: number
  /** People in this list who opted in and are not suppressed. */
  mailable: number
}

const SEGMENTS: { id: string; label: string; detail: string; match: (m: OpsMember) => boolean }[] = [
  {
    id: 'no_consent',
    label: 'Signed up, no consent',
    detail: 'Account exists. They have not accepted the privacy and data consent step.',
    match: (m) => !m.hasConsented,
  },
  {
    id: 'onboarding_open',
    label: 'Onboarding not finished',
    detail: 'Consent is in. The setup questions are still open.',
    match: (m) => m.hasConsented && !m.onboardingDone,
  },
  {
    id: 'tutorial_open',
    label: 'Tutorial not finished',
    detail: 'Onboarding is done. They have not finished the in-app tour.',
    match: (m) => m.onboardingDone && !m.tutorialDone,
  },
  {
    id: 'no_membership',
    label: 'No paid membership',
    detail: 'Account is free. Useful for trial and join reminders.',
    match: (m) => m.subscriptionStatus === 'FREE' || m.subscriptionStatus === 'CANCELLED',
  },
  {
    id: 'past_due',
    label: 'Payment due',
    detail: 'Stripe marked the membership past due.',
    match: (m) => m.subscriptionStatus === 'PAST_DUE',
  },
  {
    id: 'cancelling',
    label: 'Set to cancel',
    detail: 'Membership is active but cancel-at-period-end is on.',
    match: (m) => m.cancelAtPeriodEnd,
  },
  {
    id: 'no_connection',
    label: 'No device connected',
    detail: 'No wearable or health platform is linked.',
    match: (m) => m.connections.length === 0,
  },
  {
    id: 'no_meals',
    label: 'Meal scanner unused',
    detail: 'No saved meal.',
    match: (m) => m.counts.meals === 0,
  },
  {
    id: 'no_blood',
    label: 'No blood results',
    detail: 'No lab upload on the account.',
    match: (m) => m.counts.blood === 0,
  },
  {
    id: 'learning_not_started',
    label: 'Learning mode not started',
    detail: 'No AI Learning session yet.',
    match: (m) => m.counts.learningSessions === 0,
  },
  {
    id: 'learning_open',
    label: 'Learning mode started, not finished',
    detail: 'At least one session exists, and none are marked complete.',
    match: (m) => m.counts.learningSessions > 0 && m.counts.learningComplete === 0,
  },
  {
    id: 'no_goals',
    label: 'No goals saved',
    detail: 'No goal row on the account.',
    match: (m) => m.counts.goals === 0,
  },
  {
    id: 'no_context',
    label: 'No daily context',
    detail: 'They have not logged how the day felt.',
    match: (m) => m.counts.contexts === 0,
  },
  {
    id: 'no_ai',
    label: 'Health AI unused',
    detail: 'No message sent to Health AI.',
    match: (m) => m.counts.aiMessages === 0,
  },
  {
    id: 'marketing_ok',
    label: 'Can receive marketing email',
    detail: 'Marketing opt-in is on and the address is not suppressed.',
    match: (m) => m.notifyMarketingEmail && !m.emailSuppressed,
  },
  {
    id: 'quiet_7d',
    label: 'Quiet for 7 days',
    detail: 'Last recorded activity is more than 7 days ago.',
    match: (m) => Date.now() - new Date(m.lastActivityAt).getTime() > 7 * 24 * 60 * 60 * 1000,
  },
]

function nextStep(m: {
  hasConsented: boolean
  onboardingDone: boolean
  tutorialDone: boolean
  subscriptionStatus: string
  connections: string[]
}): string {
  if (!m.hasConsented) return 'Consent'
  if (!m.onboardingDone) return 'Onboarding'
  if (!m.tutorialDone) return 'Tutorial'
  if (m.subscriptionStatus === 'FREE' || m.subscriptionStatus === 'CANCELLED') return 'Membership'
  if (m.connections.length === 0) return 'Connections'
  return 'In the app'
}

function maxIso(dates: Array<Date | null | undefined>): string {
  let best = 0
  for (const d of dates) {
    const t = d ? d.getTime() : 0
    if (t > best) best = t
  }
  return new Date(best || Date.now()).toISOString()
}

function countMap(
  rows: { userId: string; _count: { _all: number } }[],
): Map<string, number> {
  return new Map(rows.map((r) => [r.userId, r._count._all]))
}

export async function loadOpsConsole(userId?: string) {
  const since7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [
    users,
    meals,
    mealsEdited,
    blood,
    goals,
    contexts,
    insights,
    aiMessages,
    learningSessions,
    learningComplete,
    mealLast,
    bloodLast,
    contextLast,
    aiLast,
    learningLast,
  ] = await Promise.all([
    prisma.user.findMany({
      where: userId ? { id: userId } : undefined,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        country: true,
        subscriptionStatus: true,
        cancelAtPeriodEnd: true,
        onboardingDone: true,
        tutorialDone: true,
        hasConsented: true,
        notifyProductEmail: true,
        notifyMarketingEmail: true,
        emailSuppressedAt: true,
        wearableSyncs: { select: { provider: true, lastSync: true, createdAt: true } },
        learningProgress: { select: { section: true, percent: true, status: true } },
      },
    }),
    prisma.mealLog.groupBy({ by: ['userId'], where: userId ? { userId } : undefined, _count: { _all: true } }),
    prisma.mealLog.groupBy({
      by: ['userId'],
      where: userId ? { userId, adjusted: true } : { adjusted: true },
      _count: { _all: true },
    }),
    prisma.bloodResult.groupBy({ by: ['userId'], where: userId ? { userId } : undefined, _count: { _all: true } }),
    prisma.userGoal.groupBy({ by: ['userId'], where: userId ? { userId } : undefined, _count: { _all: true } }),
    prisma.dayContext.groupBy({ by: ['userId'], where: userId ? { userId } : undefined, _count: { _all: true } }),
    prisma.insight.groupBy({ by: ['userId'], where: userId ? { userId } : undefined, _count: { _all: true } }),
    prisma.chatMessage.groupBy({
      by: ['userId'],
      where: userId ? { userId, role: 'user' } : { role: 'user' },
      _count: { _all: true },
    }),
    prisma.learningSession.groupBy({ by: ['userId'], where: userId ? { userId } : undefined, _count: { _all: true } }),
    prisma.learningSession.groupBy({
      by: ['userId'],
      where: userId ? { userId, status: 'complete' } : { status: 'complete' },
      _count: { _all: true },
    }),
    prisma.mealLog.groupBy({ by: ['userId'], where: userId ? { userId } : undefined, _max: { loggedAt: true } }),
    prisma.bloodResult.groupBy({ by: ['userId'], where: userId ? { userId } : undefined, _max: { createdAt: true } }),
    prisma.dayContext.groupBy({ by: ['userId'], where: userId ? { userId } : undefined, _max: { updatedAt: true } }),
    prisma.chatMessage.groupBy({
      by: ['userId'],
      where: userId ? { userId, role: 'user' } : { role: 'user' },
      _max: { createdAt: true },
    }),
    prisma.learningSession.groupBy({ by: ['userId'], where: userId ? { userId } : undefined, _max: { updatedAt: true } }),
  ])

  const mealsN = countMap(meals)
  const mealsEditedN = countMap(mealsEdited)
  const bloodN = countMap(blood)
  const goalsN = countMap(goals)
  const contextsN = countMap(contexts)
  const insightsN = countMap(insights)
  const aiN = countMap(aiMessages)
  const learnN = countMap(learningSessions)
  const learnDoneN = countMap(learningComplete)
  const mealAt = new Map(mealLast.map((r) => [r.userId, r._max.loggedAt]))
  const bloodAt = new Map(bloodLast.map((r) => [r.userId, r._max.createdAt]))
  const contextAt = new Map(contextLast.map((r) => [r.userId, r._max.updatedAt]))
  const aiAt = new Map(aiLast.map((r) => [r.userId, r._max.createdAt]))
  const learnAt = new Map(learningLast.map((r) => [r.userId, r._max.updatedAt]))

  const members: OpsMember[] = users.map((u) => {
    const base = {
      id: u.id,
      email: u.email,
      name: u.name,
      createdAt: u.createdAt.toISOString(),
      country: u.country,
      subscriptionStatus: u.subscriptionStatus,
      cancelAtPeriodEnd: u.cancelAtPeriodEnd,
      onboardingDone: u.onboardingDone,
      tutorialDone: u.tutorialDone,
      hasConsented: u.hasConsented,
      notifyProductEmail: u.notifyProductEmail,
      notifyMarketingEmail: u.notifyMarketingEmail,
      emailSuppressed: Boolean(u.emailSuppressedAt),
      connections: u.wearableSyncs.map((w) => w.provider),
      counts: {
        meals: mealsN.get(u.id) ?? 0,
        mealsEdited: mealsEditedN.get(u.id) ?? 0,
        blood: bloodN.get(u.id) ?? 0,
        learningSessions: learnN.get(u.id) ?? 0,
        learningComplete: learnDoneN.get(u.id) ?? 0,
        goals: goalsN.get(u.id) ?? 0,
        contexts: contextsN.get(u.id) ?? 0,
        aiMessages: aiN.get(u.id) ?? 0,
        insights: insightsN.get(u.id) ?? 0,
      },
      learning: u.learningProgress.map((p) => ({
        section: p.section,
        percent: p.percent,
        status: p.status,
      })),
      lastActivityAt: maxIso([
        u.updatedAt,
        u.createdAt,
        ...u.wearableSyncs.map((w) => w.lastSync ?? w.createdAt),
        mealAt.get(u.id),
        bloodAt.get(u.id),
        contextAt.get(u.id),
        aiAt.get(u.id),
        learnAt.get(u.id),
      ]),
      daysQuiet: 0,
    }
    base.daysQuiet = Math.max(
      0,
      Math.floor((Date.now() - new Date(base.lastActivityAt).getTime()) / 86_400_000),
    )
    const member = { ...base, nextStep: nextStep(base), segments: [] as string[] }
    member.segments = SEGMENTS.filter((s) => s.match(member)).map((s) => s.id)
    return member
  })

  const total = members.length
  const used = (pred: (m: OpsMember) => boolean) => members.filter(pred).length

  const features = [
    { id: 'consent', label: 'Consent', used: used((m) => m.hasConsented) },
    { id: 'onboarding', label: 'Onboarding finished', used: used((m) => m.onboardingDone) },
    { id: 'tutorial', label: 'Tutorial finished', used: used((m) => m.tutorialDone) },
    {
      id: 'membership',
      label: 'Membership active',
      used: used((m) => m.subscriptionStatus === 'ACTIVE' || m.subscriptionStatus === 'PAST_DUE'),
    },
    { id: 'connections', label: 'A device connected', used: used((m) => m.connections.length > 0) },
    { id: 'meals', label: 'Meal scanner', used: used((m) => m.counts.meals > 0) },
    { id: 'blood', label: 'Blood results', used: used((m) => m.counts.blood > 0) },
    { id: 'learning', label: 'Learning mode', used: used((m) => m.counts.learningSessions > 0) },
    { id: 'goals', label: 'Goals', used: used((m) => m.counts.goals > 0) },
    { id: 'context', label: 'Daily context', used: used((m) => m.counts.contexts > 0) },
    { id: 'ai', label: 'Health AI', used: used((m) => m.counts.aiMessages > 0) },
  ].map((f) => ({
    ...f,
    never: total - f.used,
    pct: total === 0 ? 0 : Math.round((f.used / total) * 100),
  }))

  const funnelSteps = [
    { id: 'signup', label: 'Signed up', count: total },
    { id: 'consent', label: 'Consented', count: used((m) => m.hasConsented) },
    { id: 'onboarding', label: 'Finished onboarding', count: used((m) => m.onboardingDone) },
    { id: 'tutorial', label: 'Finished tutorial', count: used((m) => m.tutorialDone) },
    {
      id: 'member',
      label: 'Membership on',
      count: used((m) => m.subscriptionStatus === 'ACTIVE' || m.subscriptionStatus === 'PAST_DUE'),
    },
    { id: 'connected', label: 'Connected a device', count: used((m) => m.connections.length > 0) },
  ]

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      accounts: total,
      signups7d: members.filter((m) => new Date(m.createdAt) >= since7).length,
      signups30d: members.filter((m) => new Date(m.createdAt) >= since30).length,
      active: used((m) => m.subscriptionStatus === 'ACTIVE'),
      pastDue: used((m) => m.subscriptionStatus === 'PAST_DUE'),
      marketingOk: used((m) => m.notifyMarketingEmail && !m.emailSuppressed),
    },
    funnel: funnelSteps,
    features,
    segments: SEGMENTS.map((s) => {
      const rows = members.filter(s.match)
      return {
        id: s.id,
        label: s.label,
        detail: s.detail,
        count: rows.length,
        mailable: rows.filter((m) => m.notifyMarketingEmail && !m.emailSuppressed).length,
      }
    }) satisfies OpsSegment[],
    members,
  }
}
