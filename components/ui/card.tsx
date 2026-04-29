import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'soft' | 'sage' | 'rose' | 'amber'
  padding?: 'sm' | 'md' | 'lg' | 'none'
  accent?: boolean
}

export function Card({
  className,
  variant = 'default',
  padding = 'md',
  accent,
  children,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white border border-line',
    soft:    'bg-off-white border border-line',
    sage:    'bg-sage-wash border border-accent-ring',
    rose:    'bg-rose-tint border border-[rgba(201,122,122,0.25)]',
    amber:   'bg-amber-tint border border-[rgba(217,160,91,0.25)]',
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
        'rounded-card',
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
