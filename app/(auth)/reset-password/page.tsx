'use client'

import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations'

function ResetPasswordInner() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token') ?? ''
  const email = params.get('email') ?? ''
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) })

  const linkValid = token.length > 0 && email.length > 0

  async function onSubmit(data: ResetPasswordInput) {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password: data.password }),
      })
      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error || 'Could not reset your password.')
        setLoading(false)
        return
      }
      toast.success('Password updated. You can sign in now.')
      router.push('/login')
    } catch {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (!linkValid) {
    return (
      <div className="max-w-[400px] w-full">
        <h2 className="font-sans text-[28px] font-bold text-ink mb-2 leading-[1.1] tracking-tight">
          Link expired or invalid.
        </h2>
        <p className="text-body-sm text-ink-2 mb-6 leading-relaxed">
          This reset link is missing or no longer valid. Please request a fresh one.
        </p>
        <Link href="/forgot-password">
          <Button variant="primary" size="lg">
            Request a new link
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[400px] w-full">
      <div className="text-eyebrow uppercase text-sage-deep mb-3">Account recovery</div>
      <h2 className="font-sans text-[28px] font-bold text-ink mb-2 leading-[1.1] tracking-tight">
        Choose a new <span className="italic-accent">password.</span>
      </h2>
      <p className="text-body-sm text-ink-2 mb-7 leading-relaxed">
        Resetting the password for <span className="text-ink font-medium">{email}</span>.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="New password"
          id="password"
          type="password"
          placeholder="Min. 8 chars, 1 uppercase, 1 number"
          autoComplete="new-password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" variant="primary" size="lg" loading={loading} fullWidth className="mt-2">
          Update password
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-caption text-ink-3 mt-6">
        <Link href="/login" className="text-sage-deep font-semibold hover:text-sage transition-colors">
          ← Back to sign in
        </Link>
      </p>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="max-w-[400px] w-full text-caption text-ink-3">Loading…</div>}>
      <ResetPasswordInner />
    </Suspense>
  )
}
