import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, id, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-eyebrow uppercase text-ink-3 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={isPassword && showPassword ? 'text' : type}
            className={cn(
              'w-full px-4 h-11 bg-white border border-line rounded-[10px]',
              'text-ink text-[14px] placeholder:text-ink-4 outline-none',
              'transition-all duration-150',
              'hover:border-line-2',
              'focus:border-[var(--a-ring)] focus:ring-2 focus:ring-[rgba(111,143,107,0.10)]',
              error && 'border-rose hover:border-rose focus:ring-[rgba(201,122,122,0.10)]',
              isPassword && 'pr-11',
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-3 hover:text-ink-2 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
            </button>
          )}
        </div>
        {hint && !error && (
          <p className="mt-1.5 text-caption text-ink-3">{hint}</p>
        )}
        {error && <p className="mt-1.5 text-caption text-rose">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-eyebrow uppercase text-ink-3 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-3 bg-white border border-line rounded-[10px]',
            'text-ink text-[14px] placeholder:text-ink-4 outline-none',
            'transition-all duration-150 resize-y min-h-[88px]',
            'hover:border-line-2',
            'focus:border-[var(--a-ring)] focus:ring-2 focus:ring-[rgba(111,143,107,0.10)]',
            error && 'border-rose',
            className,
          )}
          {...props}
        />
        {hint && !error && <p className="mt-1.5 text-caption text-ink-3">{hint}</p>}
        {error && <p className="mt-1.5 text-caption text-rose">{error}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
