'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { ArrowRight, MailCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) })

  async function onSubmit(data: ForgotPasswordInput) {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="max-w-[400px] w-full">
        <div className="w-12 h-12 rounded-full bg-sage-wash border border-accent-ring flex items-center justify-center mb-5">
          <MailCheck className="w-5 h-5 text-sage-deep" strokeWidth={2.25} />
        </div>
        <h2 className="font-sans text-[28px] font-bold text-ink mb-2 leading-[1.1] tracking-tight">
          Check your inbox.
        </h2>
        <p className="text-body-sm text-ink-2 mb-6 leading-relaxed">
          If an account exists for{' '}
          <span className="text-ink font-medium">{getValues('email')}</span>, we&apos;ve sent a
          link to reset your password. It expires in 1 hour.
        </p>
        <p className="text-caption text-ink-3 leading-relaxed">
          Didn&apos;t get it? Check spam, or{' '}
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-sage-deep font-semibold hover:text-sage transition-colors"
          >
            try again
          </button>
          .
        </p>
        <p className="text-caption text-ink-3 mt-6">
          <Link href="/login" className="text-sage-deep font-semibold hover:text-sage transition-colors">
            ← Back to sign in
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-[400px] w-full">
      <div className="text-eyebrow uppercase text-sage-deep mb-3">Account recovery</div>
      <h2 className="font-sans text-[28px] font-bold text-ink mb-2 leading-[1.1] tracking-tight">
        Forgot your <span className="italic-accent">password?</span>
      </h2>
      <p className="text-body-sm text-ink-2 mb-7 leading-relaxed">
        Enter the email you signed up with and we&apos;ll send you a secure link to reset it.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Button type="submit" variant="primary" size="lg" loading={loading} fullWidth className="mt-2">
          Send reset link
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-caption text-ink-3 mt-6">
        Remembered it?{' '}
        <Link href="/login" className="text-sage-deep font-semibold hover:text-sage transition-colors">
          Sign in →
        </Link>
      </p>
    </div>
  )
}
