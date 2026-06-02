import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'glass'
    | 'glass-strong'
    | 'glass-sage'
    | 'premium'
    | 'plain'
    | 'soft'
    | 'sage'
    | 'rose'
    | 'amber'
  padding?: 'sm' | 'md' | 'lg' | 'none'
  accent?: boolean
}

/**
 * Universal floating surface. Defaults to glassy translucent white that lets
 * the page texture bleed through subtly while still sitting on a real lifted
 * shadow.
 *
 * Variants:
 *   glass        – default. Soft glass over the page texture.
 *   glass-strong – higher opacity for content-heavy cards.
 *   glass-sage   – sage-tinted glass for accent / suggestion cards.
 *   premium      – hero cards (Health Score, AI Insight). Bigger radius,
 *                  warm-cream tint, deeper multi-layer shadow.
 *   plain        – opaque white surface (rarely needed; use for nested cards).
 *   soft         – flat off-white panel, no shadow.
 *   sage/rose/amber – tonal accent cards.
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
    'glass':         'glass rounded-card',
    'glass-strong':  'glass-strong rounded-card',
    'glass-sage':    'glass-sage rounded-card',
    'premium':       'glass-premium rounded-[32px]',
    'plain':         'bg-white border border-line shadow-float rounded-card',
    'soft':          'bg-off-white border border-line rounded-card',
    'sage':          'glass-sage rounded-card',
    'rose':          'bg-rose-tint border border-[rgba(201,122,122,0.20)] shadow-float rounded-card',
    'amber':         'bg-amber-tint border border-[rgba(217,160,91,0.20)] shadow-float rounded-card',
  }

  // Padding tokens bumped to give cards more breathing room — premium feel
  // requires that contents are NOT pressed against card edges.
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-7 sm:p-8',
  }

  return (
    <div
      className={cn(
        'relative',
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
