import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconBadgeProps {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'sage' | 'rose' | 'amber' | 'ink' | 'sand'
  className?: string
}

/**
 * Circular tinted badge with a centred line icon. The most-used
 * UI atom in the moodboard — used for category labels, section
 * headers, status indicators, etc.
 */
export function IconBadge({
  icon: Icon,
  size = 'md',
  tone = 'sage',
  className,
}: IconBadgeProps) {
  const dims = {
    sm: { box: 'w-7 h-7',   icon: 'w-3.5 h-3.5' },
    md: { box: 'w-9 h-9',   icon: 'w-[18px] h-[18px]' },
    lg: { box: 'w-11 h-11', icon: 'w-[22px] h-[22px]' },
    xl: { box: 'w-14 h-14', icon: 'w-7 h-7' },
  }[size]

  const tones = {
    sage:  'bg-sage-tint text-sage-deep',
    rose:  'bg-rose-tint text-rose',
    amber: 'bg-amber-tint text-amber',
    ink:   'bg-[rgba(26,28,26,0.06)] text-ink',
    sand:  'bg-sand-deep text-ink-2',
  }

  return (
    <div
      className={cn(
        'rounded-full inline-flex items-center justify-center shrink-0',
        dims.box,
        tones[tone],
        className,
      )}
    >
      <Icon className={dims.icon} strokeWidth={1.75} />
    </div>
  )
}
