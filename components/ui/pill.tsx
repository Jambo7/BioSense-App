import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'sage' | 'rose' | 'amber' | 'ink' | 'sand' | 'soft-sage' | 'glass'
  size?: 'sm' | 'md'
}

export function Pill({
  className,
  tone = 'sage',
  size = 'sm',
  children,
  ...props
}: PillProps) {
  const tones = {
    sage:        'bg-grad-sage text-white shadow-[0_2px_6px_-1px_rgba(111,143,107,0.35)]',
    'soft-sage': 'bg-[linear-gradient(180deg,rgba(168,191,163,0.35)_0%,rgba(111,143,107,0.18)_100%)] text-sage-deep ring-1 ring-inset ring-[rgba(168,191,163,0.40)]',
    rose:        'bg-rose-soft text-[#7A4949] ring-1 ring-inset ring-[rgba(201,122,122,0.20)]',
    amber:       'bg-[rgba(217,160,91,0.18)] text-[#7A5A2C] ring-1 ring-inset ring-[rgba(217,160,91,0.30)]',
    ink:         'bg-[rgba(26,28,26,0.06)] text-ink-2 ring-1 ring-inset ring-[rgba(26,28,26,0.08)]',
    sand:        'bg-sand-deep text-ink-2',
    glass:       'glass text-ink',
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
