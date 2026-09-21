'use client'

import { useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { ArrowRight, CreditCard, LogOut, Smartphone } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardLabel } from '@/components/ui/card'
import { Pill } from '@/components/ui/pill'
import { loginSchema, type LoginInput } from '@/lib/validations'

type AccountUser = {
  name: string | null
  email: string
  subscriptionStatus: string
  hasBillingAccount: boolean
  cancelAtPeriodEnd: boolean
}

export function AccountClient({
  user,
  billingEnabled,
  appStoreUrl,
  playStoreUrl,
}: {
  user?: AccountUser
  billingEnabled: boolean
  appStoreUrl: string
  playStoreUrl: string
}) {
  if (!user) {
    return (
      <AccountLogin
        appStoreUrl={appStoreUrl}
        playStoreUrl={playStoreUrl}
      />
    )
  }

  return (
    <AccountHome
      user={user}
      billingEnabled={billingEnabled}
      appStoreUrl={appStoreUrl}
      playStoreUrl={playStoreUrl}
    />
  )
}

function AccountLogin({
  appStoreUrl,
  playStoreUrl,
}: {
  appStoreUrl: string
  playStoreUrl: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
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
      router.replace('/account')
      router.refresh()
    } catch {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="text-eyebrow uppercase text-sage-deep mb-3">Your account</div>
      <h1 className="font-sans text-[30px] font-bold text-ink mb-2 leading-[1.1] tracking-tight">
        Manage your membership.
      </h1>
      <p className="text-body-sm text-ink-2 mb-8 leading-relaxed">
        Sign in with the same email and password you use in the BioSense app.
        This page is for billing, cancellation and downloads only. It is not
        the BioSense app.
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
        <div className="flex justify-end -mt-1">
          <Link
            href="/forgot-password"
            className="text-caption text-sage-deep font-medium hover:text-sage transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" variant="primary" size="lg" loading={loading} fullWidth className="mt-6">
          Sign in
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-caption text-ink-3 mt-6 leading-relaxed">
        New to BioSense?{' '}
        <a
          href="https://bio-sense.ai/pricing"
          className="text-sage-deep font-semibold hover:text-sage transition-colors"
        >
          Start your 21-day trial
        </a>
      </p>

      <DownloadApps appStoreUrl={appStoreUrl} playStoreUrl={playStoreUrl} />
    </div>
  )
}

function AccountHome({
  user,
  billingEnabled,
  appStoreUrl,
  playStoreUrl,
}: {
  user: AccountUser
  billingEnabled: boolean
  appStoreUrl: string
  playStoreUrl: string
}) {
  const [billingBusy, setBillingBusy] = useState(false)
  const [planBusy, setPlanBusy] = useState<'monthly' | 'annual' | null>(null)

  const isActive = user.subscriptionStatus === 'ACTIVE'
  const isPastDue = user.subscriptionStatus === 'PAST_DUE'
  const hasMembership = isActive || isPastDue

  async function openPortal() {
    setBillingBusy(true)
    try {
      const res = await fetch('/api/billing/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ returnTo: '/account' }),
      })
      const json = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !json.url) throw new Error(json.error || 'Could not open billing')
      window.location.href = json.url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not open billing')
      setBillingBusy(false)
    }
  }

  async function startPlan(plan: 'monthly' | 'annual') {
    setPlanBusy(plan)
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, returnTo: 'account' }),
      })
      const json = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !json.url) throw new Error(json.error || 'Checkout unavailable')
      window.location.href = json.url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Checkout unavailable')
      setPlanBusy(null)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="text-eyebrow uppercase text-sage-deep mb-3">Your account</div>
        <h1 className="font-sans text-[30px] font-bold text-ink mb-2 leading-[1.1] tracking-tight">
          {user.name ?? 'Membership'}
        </h1>
        <p className="text-body-sm text-ink-2 leading-relaxed">{user.email}</p>
      </div>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardLabel className="mb-1">Membership</CardLabel>
            <div className="flex flex-wrap gap-2 mb-3">
              <Pill tone={isPastDue ? 'rose' : isActive ? 'soft-sage' : 'ink'} size="md">
                {isPastDue
                  ? 'Payment due'
                  : isActive
                    ? user.cancelAtPeriodEnd
                      ? 'Cancels at period end'
                      : 'Active'
                    : user.subscriptionStatus === 'CANCELLED'
                      ? 'Cancelled'
                      : 'No membership'}
              </Pill>
            </div>
            <p className="text-caption text-ink-3 leading-relaxed max-w-[42ch]">
              {isPastDue
                ? 'Update your card to keep app access. You can also change plan or cancel here.'
                : hasMembership
                  ? 'Change plan, update your card, view invoices or cancel. The BioSense app is where your health data lives.'
                  : 'Choose a plan to start or restart your membership. Then download the app on your phone.'}
            </p>
          </div>
          <CreditCard className="w-5 h-5 text-sage-deep shrink-0 mt-0.5" />
        </div>

        {billingEnabled && hasMembership && user.hasBillingAccount && (
          <Button
            className="mt-5"
            variant="primary"
            size="lg"
            fullWidth
            loading={billingBusy}
            onClick={() => void openPortal()}
          >
            Manage subscription
          </Button>
        )}

        {billingEnabled && !hasMembership && (
          <div className="grid gap-3 mt-5">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={planBusy === 'monthly'}
              disabled={Boolean(planBusy)}
              onClick={() => void startPlan('monthly')}
            >
              Monthly · AED 149 / month
            </Button>
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              loading={planBusy === 'annual'}
              disabled={Boolean(planBusy)}
              onClick={() => void startPlan('annual')}
            >
              Annual · AED 1,499 / year · Save 16%
            </Button>
            <a
              href="https://bio-sense.ai/pricing"
              className="text-center text-caption text-sage-deep font-medium hover:text-sage"
            >
              See full pricing
            </a>
          </div>
        )}
      </Card>

      <DownloadApps appStoreUrl={appStoreUrl} playStoreUrl={playStoreUrl} />

      <Button
        variant="subtle"
        size="lg"
        fullWidth
        onClick={() => void signOut({ callbackUrl: '/account' })}
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </Button>
    </div>
  )
}

function DownloadApps({
  appStoreUrl,
  playStoreUrl,
}: {
  appStoreUrl: string
  playStoreUrl: string
}) {
  return (
    <Card className="mt-8">
      <div className="flex items-start gap-3 mb-4">
        <Smartphone className="w-5 h-5 text-sage-deep shrink-0 mt-0.5" />
        <div>
          <CardLabel className="mb-1">Get the BioSense app</CardLabel>
          <p className="text-caption text-ink-3 leading-relaxed">
            Insights, wearables, meals and Health AI are in the app, not here.
          </p>
        </div>
      </div>
      <div className="grid gap-2">
        <StoreLink href={appStoreUrl} label="Download on the App Store" pending="iPhone listing coming soon" />
        <StoreLink href={playStoreUrl} label="Get it on Google Play" pending="Android listing coming soon" />
      </div>
    </Card>
  )
}

function StoreLink({
  href,
  label,
  pending,
}: {
  href: string
  label: string
  pending: string
}) {
  if (!href) {
    return (
      <div className="rounded-pill border border-line bg-white/70 px-5 py-3 text-center text-[13.5px] text-ink-3">
        {pending}
      </div>
    )
  }
  return (
    <a
      href={href}
      className="rounded-pill border border-line-2 bg-white px-5 py-3 text-center text-[13.5px] font-semibold text-ink hover:border-accent-ring transition-colors"
    >
      {label}
    </a>
  )
}
