import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { Card } from '@/components/ui/card'
import { PrivacyStrip } from '@/components/privacy-strip'

export default async function InsightItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const { id } = await params
  const { getIntelligenceFeed } = await import('@/lib/intelligence')
  const cards = await getIntelligenceFeed(session.user.id)
  const card = cards.find((c) => c.id === id)
  if (!card) notFound()

  return (
    <div className="max-w-xl mx-auto fade-up space-y-4">
      <Link href="/insights?tab=latest" className="text-[13px] text-sage-deep font-medium">
        ← Back
      </Link>
      <div className="text-eyebrow uppercase text-ink-3">{card.label}</div>
      <h1 className="font-sans text-[26px] font-bold text-ink tracking-tight leading-tight">
        {card.title}
      </h1>
      <Card padding="lg">
        <div className="text-[13px] font-semibold text-ink mb-1">What BioSense noticed</div>
        <p className="text-[14px] text-ink-2 leading-relaxed">{card.body}</p>
      </Card>
      <Card padding="lg">
        <div className="text-[13px] font-semibold text-ink mb-1">How to read this</div>
        <p className="text-[13px] text-ink-2 leading-relaxed">
          This is an observed pattern in your own data. It is educational, not a diagnosis
          or a rule you must follow. Many factors can influence the same signal.
        </p>
      </Card>
      <PrivacyStrip />
    </div>
  )
}
