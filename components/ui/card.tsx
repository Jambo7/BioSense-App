import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'glass-strong' | 'glass-sage' | 'plain' | 'soft' | 'sage' | 'rose' | 'amber'
  padding?: 'sm' | 'md' | 'lg' | 'none'
  accent?: boolean
}

/**
 * Universal floating surface. Defaults to glassy translucent white that lets
 * the ambient sage backdrop bleed through subtly. Use `variant="plain"` for
 * the rare case you need an opaque card on top of another card.
 */
export function Card({
  className,
  variant = 'glass',
  padding = 'md',
  accent,
  children,
  ...props
}: CardProps) {
  const variants = {
    'glass':         'glass',
    'glass-strong':  'glass-strong',
    'glass-sage':    'glass-sage',
    'plain':         'bg-white border border-line shadow-float',
    'soft':          'bg-off-white border border-line',
    'sage':          'glass-sage',
    'rose':          'bg-rose-tint border border-[rgba(201,122,122,0.20)] shadow-float',
    'amber':         'bg-amber-tint border border-[rgba(217,160,91,0.20)] shadow-float',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6 sm:p-7',
  }

  return (
    <div
      className={cn(
        'rounded-card relative',
        variants[variant],
        paddings[padding],
        accent && 'border-accent-ring',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardLabel({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('text-eyebrow uppercase text-ink-3 mb-3', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-h3 text-ink', className)} {...props}>
      {children}
    </h3>
  )
}
