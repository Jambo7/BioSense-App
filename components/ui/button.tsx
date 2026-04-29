import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'subtle' | 'soft' | 'danger'
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
      'inline-flex items-center justify-center gap-2 font-medium rounded-pill transition-all duration-150 ' +
      'disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ' +
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--a-ring)] ' +
      'active:scale-[0.98]'

    const variants = {
      primary:
        'bg-sage text-white hover:bg-sage-deep shadow-pill',
      soft:
        'bg-sage-tint text-sage-deep hover:bg-[rgba(111,143,107,0.16)]',
      ghost:
        'bg-transparent border border-line-2 text-ink hover:bg-sage-wash hover:border-accent-ring',
      subtle:
        'bg-off-white border border-line text-ink-2 hover:text-ink hover:border-line-2',
      danger:
        'bg-rose text-white hover:brightness-95',
    }

    const sizes = {
      sm: 'text-[12.5px] px-3.5 py-1.5 h-8',
      md: 'text-[13.5px] px-5 py-2.5 h-10',
      lg: 'text-[14px] px-7 py-3 h-12 font-semibold',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    )
  },
)
Button.displayName = 'Button'
