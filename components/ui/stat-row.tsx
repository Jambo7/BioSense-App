import { LucideIcon, TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconBadge } from './icon-badge'

interface StatRowProps {
  icon: LucideIcon
  label: string
  value: string | number
  delta?: { value: string; direction: 'up' | 'down' | 'flat'; tone?: 'positive' | 'negative' | 'neutral' }
  iconTone?: 'sage' | 'rose' | 'amber' | 'ink'
  className?: string
}

/**
 * Single stat row, e.g. "What Changed" cards on the weekly report:
 *   [icon] Energy            ↓ 21%
 */
export function StatRow({
  icon,
  label,
  value,
  delta,
  iconTone = 'sage',
  className,
}: StatRowProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3 py-2', className)}>
      <div className="flex items-center gap-3 min-w-0">
        <IconBadge icon={icon} tone={iconTone} size="sm" />
        <span className="text-body-sm text-ink truncate">{label}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {delta && <DeltaIndicator {...delta} />}
        {!delta && <span className="text-body-sm text-ink-2">{value}</span>}
      </div>
    </div>
  )
}

interface DeltaProps {
  value: string
  direction: 'up' | 'down' | 'flat'
  tone?: 'positive' | 'negative' | 'neutral'
}

export function DeltaIndicator({ value, direction, tone }: DeltaProps) {
  // Auto-derive tone if unspecified: up = positive (sage), down = negative (rose), flat = neutral
  const resolved =
    tone ?? (direction === 'up' ? 'positive' : direction === 'down' ? 'negative' : 'neutral')

  const colors = {
    positive: 'text-sage-deep',
    negative: 'text-rose',
    neutral:  'text-ink-2',
  }
  const Icon = direction === 'up' ? TrendingUp : direction === 'down' ? TrendingDown : Minus
  return (
    <span className={cn('inline-flex items-center gap-1 text-body-sm font-medium', colors[resolved])}>
      <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
      {value}
    </span>
  )
}

interface StatTileProps {
  icon: LucideIcon
  label: string
  value: string | number
  unit?: string
  state?: string
  iconTone?: 'sage' | 'rose' | 'amber' | 'ink'
  className?: string
}

/**
 * Compact stat tile used on dashboards / overview cards:
 *   [icon] HRV
 *          72ms
 *          Optimal
 */
export function StatTile({
  icon,
  label,
  value,
  unit,
  state,
  iconTone = 'sage',
  className,
}: StatTileProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center gap-2">
        <IconBadge icon={icon} tone={iconTone} size="sm" />
        <span className="text-caption text-ink-2">{label}</span>
      </div>
      <div className="text-h2 text-ink leading-none">
        {value}
        {unit && <span className="text-body-sm text-ink-3 font-normal ml-0.5">{unit}</span>}
      </div>
      {state && <span className="text-micro text-ink-3">{state}</span>}
    </div>
  )
}
