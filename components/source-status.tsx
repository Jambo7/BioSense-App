import { Check, FlaskConical, GraduationCap, Sun, User, Watch, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SourceState = 'done' | 'building' | 'optional' | 'missing'

function stateLabel(state: SourceState, doneLabel: string) {
  if (state === 'done') return doneLabel
  if (state === 'building') return 'Building'
  if (state === 'optional') return 'Optional'
  return 'Not added yet'
}

export function SourceRow({
  icon: Icon,
  title,
  hint,
  state,
  doneLabel = 'Connected',
  compact = false,
}: {
  icon: LucideIcon
  title: string
  hint: string
  state: SourceState
  doneLabel?: string
  compact?: boolean
}) {
  const label = stateLabel(state, doneLabel)
  const tone =
    state === 'done'
      ? 'text-sage-deep'
      : state === 'building'
        ? 'text-[#7A6490]'
        : 'text-ink-3'

  if (compact) {
    return (
      <div className="flex flex-col items-center text-center px-1 py-1 min-w-0">
        <div className="w-10 h-10 rounded-full bg-[rgba(168,191,163,0.18)] flex items-center justify-center">
          <Icon className="w-4 h-4 text-sage-deep" strokeWidth={2} />
        </div>
        <div className="text-[12px] font-semibold text-ink mt-1.5 leading-tight">{title}</div>
        <div className={cn('text-[11px] font-medium mt-0.5', tone)}>
          {state === 'done' && <Check className="w-3 h-3 inline mr-0.5" strokeWidth={2.5} />}
          {label}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="w-9 h-9 rounded-full bg-[rgba(168,191,163,0.18)] flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-sage-deep" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-ink leading-tight">{title}</div>
        <div className="text-[12px] text-ink-3 leading-snug">{hint}</div>
      </div>
      <span className={cn('text-[11px] font-semibold shrink-0', tone)}>
        {state === 'done' && <Check className="w-3.5 h-3.5 inline mr-1" strokeWidth={2.5} />}
        {label}
      </span>
    </div>
  )
}

export const SOURCE_ICONS = {
  wearable: Watch,
  profile: User,
  learning: GraduationCap,
  blood: FlaskConical,
  context: Sun,
}
