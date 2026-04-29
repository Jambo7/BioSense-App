import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'sage' | 'rose' | 'amber' | 'ink' | 'sand' | 'soft-sage'
  size?: 'sm' | 'md'
}

/**
 * Small status / tag chip. Used for impact tiers ("High impact",
 * "Medium"), score states ("Optimal", "Good"), etc.
 */
export function Pill({
  className,
  tone = 'sage',
  size = 'sm',
  children,
  ...props
}: PillProps) {
  const tones = {
    sage:        'bg-sage text-white',
    'soft-sage': 'bg-[rgba(168,191,163,0.55)] text-sage-deep',
    rose:        'bg-rose-soft text-[#7A4949]',
    amber:       'bg-[rgba(217,160,91,0.20)] text-[#7A5A2C]',
    ink:         'bg-[rgba(26,28,26,0.08)] text-ink-2',
    sand:        'bg-sand-deep text-ink-2',
  }

  const sizes = {
    sm: 'text-micro px-2.5 py-0.5 font-medium',
    md: 'text-caption px-3 py-1 font-medium',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill whitespace-nowrap',
        tones[tone],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
