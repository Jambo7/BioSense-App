'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginSchema, type LoginInput } from '@/lib/validations'

const isDev = process.env.NODE_ENV !== 'production'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [devLoading, setDevLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Invalid email or password')
        setLoading(false)
        return
      }

      // Let the root page handle routing based on session state
      router.push('/')
      router.refresh()
    } catch {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  async function onDevBypass() {
    setDevLoading(true)
    try {
      const result = await signIn('dev-bypass', { redirect: false })
      if (result?.error) {
        toast.error('Dev bypass failed (provider only enabled in dev mode).')
        setDevLoading(false)
        return
      }
      router.push('/')
      router.refresh()
    } catch {
      toast.error('Dev bypass failed.')
      setDevLoading(false)
    }
  }

  return (
    <div className="max-w-[380px] w-full">
      <div className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-t3 mb-4">
        Member dashboard access
      </div>
      <h2 className="font-serif text-[26px] font-bold tracking-[-0.02em] text-t1 mb-1.5 leading-tight">
        Welcome back.
      </h2>
      <p className="text-[13px] text-t2 mb-8 leading-relaxed">
        Sign in to access your results, insights, and{' '}
        <strong className="text-t1">BioSense AI</strong>.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email address"
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          {...register('password')}
          error={errors.password?.message}
        />

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-6">
          Sign in <span className="ml-1">→</span>
        </Button>
      </form>

      {isDev && (
        <div className="mt-4 p-3 rounded-lg border border-dashed border-[var(--b2)] bg-[rgba(110,155,94,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[11px] text-t3 leading-tight">
              <span className="font-semibold text-t2">Dev mode</span>
              <br />
              Skip auth & jump straight to the dashboard.
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              loading={devLoading}
              onClick={onDevBypass}
            >
              Skip login
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px" style={{ background: 'rgba(26,26,22,0.07)' }} />
        <span className="text-[11px] text-t4">or</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(26,26,22,0.07)' }} />
      </div>

      <p className="text-[11px] text-t4 leading-relaxed">
        <span className="text-t3">New to BioSense?</span>{' '}
        <Link href="/signup" className="text-accent font-semibold hover:brightness-110">
          Apply for access →
        </Link>
      </p>
    </div>
  )
}
