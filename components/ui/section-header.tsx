import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconBadge } from './icon-badge'

interface SectionHeaderProps {
  icon?: LucideIcon
  title: string
  subtitle?: string
  eyebrow?: string
  iconTone?: 'sage' | 'rose' | 'amber' | 'ink' | 'sand'
  className?: string
  align?: 'left' | 'center'
  action?: React.ReactNode
}

/**
 * Recurring header pattern from the moodboard:
 *   [icon-badge]  Title
 *                 subtitle
 * Used at the top of cards, sections, and pages.
 */
export function SectionHeader({
  icon,
  title,
  subtitle,
  eyebrow,
  iconTone = 'sage',
  align = 'left',
  className,
  action,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-start gap-3', align === 'center' && 'justify-center text-center', className)}>
      {icon && <IconBadge icon={icon} tone={iconTone} size="md" />}
      <div className="flex-1 min-w-0">
        {eyebrow && (
          <div className="text-eyebrow uppercase text-ink-3 mb-1">{eyebrow}</div>
        )}
        <div className="text-h3 text-ink leading-tight">{title}</div>
        {subtitle && (
          <div className="text-body-sm text-ink-2 mt-1">{subtitle}</div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  action?: React.ReactNode
  className?: string
}

/**
 * Bigger top-of-page hero header. Title is display-weight, optional
 * italic-accent override available on the title via children mode.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  action,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex items-start gap-4', align === 'center' && 'justify-center text-center', className)}>
      <div className="flex-1 min-w-0">
        {eyebrow && (
          <div className="text-eyebrow uppercase text-sage-deep mb-2">{eyebrow}</div>
        )}
        <h1 className="text-h1 text-ink">{title}</h1>
        {subtitle && (
          <p className="text-body text-ink-2 mt-2 max-w-[58ch]">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
