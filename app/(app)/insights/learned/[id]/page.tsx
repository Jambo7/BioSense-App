import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Watch, Moon, Heart, RefreshCw, Sun } from 'lucide-react'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/card'
import { PrivacyStrip } from '@/components/privacy-strip'
import { IconBadge } from '@/components/ui/icon-badge'

export default async function LearnedDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const { id } = await params
  const fact = await prisma.learnedFact.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!fact) notFound()

  const first = fact.createdAt.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })

  return (
    <div className="max-w-xl mx-auto fade-up space-y-4">
      <Link href="/insights?tab=learned" className="text-[13px] text-sage-deep font-medium">
        ← Learned Intelligence
      </Link>
      <div className="text-eyebrow uppercase text-sage-deep">Learned Intelligence</div>
      <h1 className="font-sans text-[26px] font-bold text-ink tracking-tight leading-tight">
        {fact.text}
      </h1>
      <p className="text-[13px] text-ink-2">
        This discovery was first identified in {first} and remains supported by your recent data
        unless it has faded.
      </p>
      <div className="flex flex-wrap gap-2 text-[12px] text-ink-2">
        <span className="rounded-pill tile px-2.5 h-7 inline-flex items-center">Status: Active</span>
        <span className="rounded-pill tile px-2.5 h-7 inline-flex items-center">
          First discovered {first}
        </span>
        <span className="rounded-pill tile px-2.5 h-7 inline-flex items-center capitalize">
          {fact.section.replace(/_/g, ' ')}
        </span>
        <span className="rounded-pill tile px-2.5 h-7 inline-flex items-center">
          {fact.confidence} confidence
        </span>
      </div>
      <Card padding="lg">
        <div className="text-[13px] font-semibold text-ink mb-1">What BioSense learned</div>
        <p className="text-[14px] text-ink-2 leading-relaxed">{fact.text}</p>
      </Card>
      <Card padding="lg">
        <div className="text-[13px] font-semibold text-ink mb-1">How this changed over time</div>
        <p className="text-[13px] text-ink-2 leading-relaxed">
          First noted {first}. We keep this here while your own data still supports it.
        </p>
      </Card>
      <Card padding="lg">
        <div className="text-[13px] font-semibold text-ink mb-1">Why this stays here</div>
        <p className="text-[13px] text-ink-2 leading-relaxed">
          Learned Intelligence is the long-term home for things that remain useful. Newer
          items on Home do not remove these unless they stop being supported by your data.
        </p>
      </Card>
      <Card padding="lg">
        <div className="text-[13px] font-semibold text-ink mb-3">Signals behind this discovery</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: Watch, label: 'Wearable data', hint: 'Always on' },
            { icon: Moon, label: 'Sleep timing', hint: 'Bedtime patterns' },
            { icon: Heart, label: 'HRV', hint: 'Nightly measures' },
            { icon: RefreshCw, label: 'Recovery', hint: 'Next-day scores' },
            { icon: Sun, label: "Today's Context", hint: 'Activity, stress, readiness' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="flex justify-center mb-1.5">
                <IconBadge icon={s.icon} tone="sage" variant="tint" size="md" />
              </div>
              <div className="text-[12px] font-semibold text-ink">{s.label}</div>
              <div className="text-[11px] text-ink-3">{s.hint}</div>
            </div>
          ))}
        </div>
      </Card>
      <PrivacyStrip />
    </div>
  )
}
