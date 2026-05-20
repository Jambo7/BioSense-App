import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconBadgeProps {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'sage' | 'rose' | 'amber' | 'ink' | 'sand'
  variant?: 'tint' | 'solid' | 'gradient'
  className?: string
}

/**
 * Circular tinted badge with a centred line icon. Defaults to a soft
 * sage-tinted disc with a faint inner highlight for a glassy feel.
 *
 * Variants:
 *   tint     – soft translucent fill (default)
 *   solid    – flat tone fill, white icon
 *   gradient – top-light → bottom-deep gradient with inner highlight, white icon
 */
export function IconBadge({
  icon: Icon,
  size = 'md',
  tone = 'sage',
  variant = 'tint',
  className,
}: IconBadgeProps) {
  const dims = {
    sm: { box: 'w-7 h-7',   icon: 'w-3.5 h-3.5' },
    md: { box: 'w-9 h-9',   icon: 'w-[18px] h-[18px]' },
    lg: { box: 'w-11 h-11', icon: 'w-[22px] h-[22px]' },
    xl: { box: 'w-14 h-14', icon: 'w-7 h-7' },
  }[size]

  const tintTones = {
    sage:  'bg-[linear-gradient(180deg,rgba(168,191,163,0.30)_0%,rgba(111,143,107,0.18)_100%)] text-sage-deep ring-1 ring-inset ring-[rgba(168,191,163,0.35)]',
    rose:  'bg-[linear-gradient(180deg,rgba(233,201,201,0.40)_0%,rgba(201,122,122,0.20)_100%)] text-rose ring-1 ring-inset ring-[rgba(201,122,122,0.30)]',
    amber: 'bg-[linear-gradient(180deg,rgba(237,198,138,0.45)_0%,rgba(217,160,91,0.20)_100%)] text-[#A77530] ring-1 ring-inset ring-[rgba(217,160,91,0.30)]',
    ink:   'bg-[rgba(26,28,26,0.06)] text-ink ring-1 ring-inset ring-[rgba(26,28,26,0.08)]',
    sand:  'bg-[rgba(232,226,214,0.7)] text-ink-2 ring-1 ring-inset ring-[rgba(26,28,26,0.05)]',
  }

  const solidTones = {
    sage:  'bg-sage text-white shadow-[0_2px_6px_rgba(111,143,107,0.35)]',
    rose:  'bg-rose text-white shadow-[0_2px_6px_rgba(201,122,122,0.35)]',
    amber: 'bg-amber text-white shadow-[0_2px_6px_rgba(217,160,91,0.35)]',
    ink:   'bg-ink text-white shadow-[0_2px_6px_rgba(26,28,26,0.30)]',
    sand:  'bg-sand-deep text-ink-2',
  }

  const gradientTones = {
    sage:  'bg-grad-sage  text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_4px_12px_-2px_rgba(111,143,107,0.40)]',
    rose:  'bg-grad-rose  text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_4px_12px_-2px_rgba(201,122,122,0.40)]',
    amber: 'bg-grad-amber text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_4px_12px_-2px_rgba(217,160,91,0.40)]',
    ink:   'bg-gradient-to-b from-[#3A3C3A] to-[#1A1C1A] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.20),0_4px_12px_-2px_rgba(26,28,26,0.40)]',
    sand:  'bg-gradient-to-b from-[#F5F1EA] to-[#E8E2D6] text-ink-2',
  }

  const palette = variant === 'solid' ? solidTones : variant === 'gradient' ? gradientTones : tintTones

  return (
    <div
      className={cn(
        'rounded-full inline-flex items-center justify-center shrink-0',
        dims.box,
        palette[tone],
        className,
      )}
    >
      <Icon className={dims.icon} strokeWidth={1.85} />
    </div>
  )
}
