'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signupSchema, type SignupInput } from '@/lib/validations'

function Checkbox({
  id,
  checked,
  onChange,
  label,
  error,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  label: React.ReactNode
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={cn(
            'mt-0.5 w-[18px] h-[18px] rounded-[5px] flex-shrink-0 border flex items-center justify-center transition-all',
            checked
              ? 'bg-sage border-sage'
              : 'bg-white border-line-2 hover:border-sage',
          )}
        >
          {checked && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
        </button>
        <span className="text-body-sm text-ink-2 leading-relaxed">{label}</span>
      </label>
      {error && <p className="mt-1 ml-[30px] text-caption text-rose">{error}</p>}
    </div>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      ageVerified: undefined as unknown as true,
      tcAccepted: undefined as unknown as true,
      privacyAccepted: undefined as unknown as true,
      dataConsentAccepted: undefined as unknown as true,
    },
  })

  const [ageV, tcV, privV, dataV] = [
    watch('ageVerified'),
    watch('tcAccepted'),
    watch('privacyAccepted'),
    watch('dataConsentAccepted'),
  ]

  async function onSubmit(data: SignupInput) {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error || 'Failed to create account')
        setLoading(false)
        return
      }

      toast.success('Account created! Signing you in…')

      const { signIn } = await import('next-auth/react')
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      router.push('/consent')
      router.refresh()
    } catch {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[420px] w-full">
      <div className="text-eyebrow uppercase text-sage-deep mb-3">
        Create your account
      </div>
      <h2 className="font-sans text-[28px] font-bold text-ink mb-2 leading-[1.1] tracking-tight">
        Start your{' '}
        <span className="italic-accent">health journey.</span>
      </h2>
      <p className="text-body-sm text-ink-2 mb-7 leading-relaxed">
        Your data stays private. Educational insights only — never medical advice.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          id="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          {...register('name')}
          error={errors.name?.message}
        />
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
          placeholder="Min. 8 chars, 1 uppercase, 1 number"
          autoComplete="new-password"
          {...register('password')}
          error={errors.password?.message}
        />

        <div className="space-y-3 pt-5 mt-5 border-t border-line">
          <Checkbox
            id="age"
            checked={!!ageV}
            onChange={(v) => setValue('ageVerified', v as true, { shouldValidate: true })}
            error={errors.ageVerified?.message}
            label="I confirm I am 18 years of age or over"
          />
          <Checkbox
            id="tc"
            checked={!!tcV}
            onChange={(v) => setValue('tcAccepted', v as true, { shouldValidate: true })}
            error={errors.tcAccepted?.message}
            label={
              <>
                I agree to the{' '}
                <Link href="/terms" target="_blank" className="text-sage-deep underline font-medium">
                  Terms & Conditions
                </Link>
              </>
            }
          />
          <Checkbox
            id="priv"
            checked={!!privV}
            onChange={(v) => setValue('privacyAccepted', v as true, { shouldValidate: true })}
            error={errors.privacyAccepted?.message}
            label={
              <>
                I agree to the{' '}
                <Link href="/privacy" target="_blank" className="text-sage-deep underline font-medium">
                  Privacy Policy
                </Link>{' '}
                <span className="text-ink-3">(UAE PDPL compliant)</span>
              </>
            }
          />
          <Checkbox
            id="data"
            checked={!!dataV}
            onChange={(v) => setValue('dataConsentAccepted', v as true, { shouldValidate: true })}
            error={errors.dataConsentAccepted?.message}
            label="I consent to the processing of my personal and health data as described in the Privacy Policy"
          />
        </div>

        <Button type="submit" variant="primary" size="lg" loading={loading} fullWidth className="mt-7">
          Create account
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-caption text-ink-3 mt-5 leading-relaxed">
        Already have an account?{' '}
        <Link href="/login" className="text-sage-deep font-semibold hover:text-sage transition-colors">
          Sign in →
        </Link>
      </p>
    </div>
  )
}
