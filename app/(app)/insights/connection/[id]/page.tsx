import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Watch, Moon, Heart, Gauge, Sun } from 'lucide-react'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/card'
import { PrivacyStrip } from '@/components/privacy-strip'
import { IconBadge } from '@/components/ui/icon-badge'

function confLabel(c: string) {
  if (c === 'HIGH') return 'Strong'
  if (c === 'MEDIUM') return 'Moderate'
  return 'Emerging'
}

export default async function ConnectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const { id } = await params
  const pattern = await prisma.pattern.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!pattern) notFound()

  const noticed = pattern.discoveredAt.toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="max-w-xl mx-auto fade-up space-y-4">
      <Link href="/insights?tab=patterns" className="text-[13px] text-sage-deep font-medium">
        ← Patterns & Connections
      </Link>
      <div className="text-eyebrow uppercase text-sage-deep">Patterns & Connections</div>
      <h1 className="font-sans text-[26px] font-bold text-ink tracking-tight leading-tight">
        {pattern.description}
      </h1>
      <div className="flex flex-wrap gap-2 text-[12px] text-ink-2">
        <span className="rounded-pill tile px-2.5 h-7 inline-flex items-center">
          {confLabel(pattern.confidence)} connection
        </span>
        <span className="rounded-pill tile px-2.5 h-7 inline-flex items-center">
          First noticed {noticed}
        </span>
        <span className="rounded-pill tile px-2.5 h-7 inline-flex items-center">
          Confidence: {confLabel(pattern.confidence)}
        </span>
      </div>
      <Card padding="lg">
        <div className="text-[13px] font-semibold text-ink mb-1">What BioSense noticed</div>
        <p className="text-[14px] text-ink-2 leading-relaxed">{pattern.description}</p>
        <p className="text-[12px] text-ink-3 mt-2">
          Detail builds as this connection is seen on more of your days.
        </p>
      </Card>
      <Card padding="lg">
        <div className="text-[13px] font-semibold text-ink mb-1">How to read this</div>
        <p className="text-[13px] text-ink-2 leading-relaxed">
          This is an observed association in your data. It means these things have often
          moved together for you, not that one causes the other. Use it as one signal among
          several when you make choices.
        </p>
      </Card>
      <Card padding="lg">
        <div className="text-[13px] font-semibold text-ink mb-3">Signals behind this connection</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: Watch, label: 'Wearable data', hint: 'Heart rate, HRV, movement' },
            { icon: Moon, label: 'Sleep timing', hint: 'Bedtime and sleep duration' },
            { icon: Heart, label: 'HRV', hint: 'Next-day recovery signal' },
            { icon: Gauge, label: 'Readiness', hint: 'Readiness score' },
            { icon: Sun, label: "Today's Context", hint: 'Environment and lifestyle' },
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
      <Card padding="lg">
        <div className="text-[13px] font-semibold text-ink mb-1">What to try</div>
        <p className="text-[13px] text-ink-2 leading-relaxed">
          If this relationship matters to a goal you care about, try one small consistent
          change for a week and watch whether your own data still supports it.
        </p>
      </Card>
      <PrivacyStrip />
    </div>
  )
}
