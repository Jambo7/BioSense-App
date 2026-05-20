'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { ArrowRight, Sparkles } from 'lucide-react'
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
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

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
    <div className="max-w-[400px] w-full">
      <div className="text-eyebrow uppercase text-sage-deep mb-3">
        Member access
      </div>
      <h2 className="font-sans text-[30px] font-bold text-ink mb-2 leading-[1.1] tracking-tight">
        Welcome back.
      </h2>
      <p className="text-body-sm text-ink-2 mb-8 leading-relaxed">
        Sign in to access your insights, results and{' '}
        <span className="text-ink font-medium">BioSense AI</span>.
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
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          {...register('password')}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          fullWidth
          className="mt-6"
        >
          Sign in
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      {isDev && (
        <div className="mt-4 p-3.5 rounded-card bg-sage-wash border border-dashed border-accent-ring">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Sparkles className="w-4 h-4 text-sage-deep shrink-0" />
              <div className="min-w-0">
                <div className="text-caption font-semibold text-sage-deep">Dev mode</div>
                <div className="text-micro text-ink-3 leading-snug">
                  Skip auth & jump to dashboard
                </div>
              </div>
            </div>
            <Button
              type="button"
              variant="soft"
              size="sm"
              loading={devLoading}
              onClick={onDevBypass}
            >
              Skip login
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-line" />
        <span className="text-micro text-ink-3">or</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <p className="text-caption text-ink-3 leading-relaxed">
        New to BioSense?{' '}
        <Link
          href="/signup"
          className="text-sage-deep font-semibold hover:text-sage transition-colors"
        >
          Apply for access →
        </Link>
      </p>
    </div>
  )
}
