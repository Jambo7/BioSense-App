import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { ChevronLeft, ListChecks, Upload, CheckCircle2, AlertTriangle } from 'lucide-react'

interface BloodMarkerRecord {
  name: string
  value: number
  unit?: string
  refMin?: number
  refMax?: number
  tier: 'T1' | 'T2' | 'T3'
}

const TIER_META = {
  T1: { label: 'In range', tone: 'sage'  as const, color: '#6F8F6B', icon: CheckCircle2 },
  T2: { label: 'Watch',    tone: 'amber' as const, color: '#D9A05B', icon: AlertTriangle },
  T3: { label: 'Action',   tone: 'rose'  as const, color: '#C97A7A', icon: AlertTriangle },
}

export default async function MarkersPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const latest = await prisma.bloodResult.findFirst({
    where: { userId: session.user.id },
    orderBy: { drawDate: 'desc' },
  })

  const markers = (latest?.markers as unknown as BloodMarkerRecord[] | null) ?? []

  // Sort: out-of-range first (T3, then T2), then in-range (T1) alphabetised
  // within each tier so the user sees what needs attention up top.
  const tierOrder = { T3: 0, T2: 1, T1: 2 } as const
  const sorted = [...markers].sort((a, b) => {
    const t = tierOrder[a.tier] - tierOrder[b.tier]
    if (t !== 0) return t
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="max-w-2xl mx-auto fade-up space-y-5">
      <Link
        href="/blood"
        className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2 transition-colors"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to Insights
      </Link>

      <header className="flex items-start gap-4">
        <IconBadge icon={ListChecks} size="xl" tone="rose" />
        <div className="flex-1">
          <div className="text-eyebrow uppercase text-sage-deep mb-1">Biomarkers</div>
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1]">
            Latest <span className="italic-accent">panel.</span>
          </h1>
          {latest && (
            <p className="text-body-sm text-ink-2 mt-1.5">
              {markers.length} markers · drawn{' '}
              {new Date(latest.drawDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </header>

      {!latest || markers.length === 0 ? (
        <EmptyMarkers />
      ) : (
        <Card padding="md">
          <CardLabel>Sorted: action → watch → in range</CardLabel>
          <ul className="divide-y divide-line">
            {sorted.map((m, i) => (
              <MarkerRow key={`${m.name}-${i}`} marker={m} />
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}

function MarkerRow({ marker }: { marker: BloodMarkerRecord }) {
  const meta = TIER_META[marker.tier] ?? TIER_META.T1
  const Icon = meta.icon

  // Position the value on the reference range as a 0-100% along a track
  // — gives a quick visual sense of where the marker sits.
  let positionPct: number | null = null
  if (
    typeof marker.refMin === 'number' &&
    typeof marker.refMax === 'number' &&
    marker.refMax > marker.refMin
  ) {
    const span = marker.refMax - marker.refMin
    // Pad the visual range a little so out-of-range values still show
    const lo = marker.refMin - span * 0.25
    const hi = marker.refMax + span * 0.25
    const raw = ((marker.value - lo) / (hi - lo)) * 100
    positionPct = Math.max(2, Math.min(98, raw))
  }

  return (
    <li className="py-3 flex items-center gap-3">
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: `${meta.color}1f` }}
      >
        <Icon className="w-3.5 h-3.5" strokeWidth={2.25} style={{ color: meta.color }} />
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-body-sm font-semibold text-ink truncate">
            {marker.name}
          </span>
          <span className="text-body-sm tabular-nums text-ink shrink-0">
            {marker.value}
            {marker.unit && (
              <span className="text-ink-3 text-caption ml-0.5">{marker.unit}</span>
            )}
          </span>
        </div>

        {positionPct !== null ? (
          <div className="relative h-1.5 rounded-full bg-[rgba(26,28,26,0.05)] overflow-visible">
            {/* In-range band (the middle 60% of the visual track is the reference range) */}
            <div
              className="absolute top-0 bottom-0 rounded-full"
              style={{
                left: '20%',
                right: '20%',
                background: 'rgba(168,191,163,0.35)',
              }}
            />
            {/* The marker dot */}
            <span
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ring-2 ring-white"
              style={{
                left: `${positionPct}%`,
                transform: 'translate(-50%, -50%)',
                background: meta.color,
              }}
            />
          </div>
        ) : (
          <div className="text-caption text-ink-3">No reference range</div>
        )}
      </div>

      <Pill tone={meta.tone === 'sage' ? 'soft-sage' : meta.tone} size="sm">
        {meta.label}
      </Pill>
    </li>
  )
}

function EmptyMarkers() {
  return (
    <Card padding="lg" className="text-center">
      <IconBadge icon={ListChecks} tone="ink" size="xl" className="mx-auto mb-3" />
      <h2 className="font-sans text-h3 text-ink">No biomarkers yet</h2>
      <p className="text-caption text-ink-2 mt-1.5 max-w-[36ch] mx-auto">
        Upload your first lab PDF to start building your biomarker panel.
      </p>
      <Link
        href="/blood/upload"
        className="btn-sage mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-pill font-semibold text-caption"
      >
        <Upload className="w-4 h-4" strokeWidth={2.25} />
        Upload first lab
      </Link>
    </Card>
  )
}
