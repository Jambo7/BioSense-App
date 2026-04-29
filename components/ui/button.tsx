import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'subtle' | 'soft' | 'danger' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', loading, fullWidth, children, disabled, ...props },
    ref,
  ) => {
    const base =
      'group relative inline-flex items-center justify-center gap-2 font-medium rounded-pill transition-all duration-200 ' +
      'disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer overflow-hidden ' +
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--a-ring)] ' +
      'active:scale-[0.97]'

    const variants = {
      primary:
        'text-white bg-grad-sage shadow-button hover:shadow-[var(--shadow-button-hover)]',
      soft:
        'bg-sage-tint text-sage-deep hover:bg-[rgba(111,143,107,0.18)]',
      ghost:
        'bg-white/60 backdrop-blur-md border border-line-2 text-ink hover:bg-white hover:border-accent-ring',
      subtle:
        'bg-white/70 backdrop-blur-md border border-line text-ink-2 hover:text-ink hover:border-line-2',
      glass:
        'glass text-ink hover:bg-white/85',
      danger:
        'bg-grad-rose text-white shadow-[0_4px_14px_-2px_rgba(201,122,122,0.4)] hover:brightness-[1.05]',
    }

    const sizes = {
      sm: 'text-[12.5px] px-3.5 py-1.5 h-8',
      md: 'text-[13.5px] px-5 py-2.5 h-10',
      lg: 'text-[14px] px-7 py-3 h-12 font-semibold',
    }

    const isPrimary = variant === 'primary' || variant === 'danger'

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shimmer sweep on hover for primary actions */}
        {isPrimary && <span className="shimmer-overlay" />}

        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="relative">{children}</span>
          </>
        ) : (
          <span className="relative inline-flex items-center gap-2">{children}</span>
        )}
      </button>
    )
  },
)
Button.displayName = 'Button'
