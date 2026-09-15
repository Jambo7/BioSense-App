'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function UpgradeClient({
  email,
  joinUrl,
}: {
  email: string
  joinUrl: string
}) {
  const router = useRouter()
  const { update } = useSession()
  const [refreshing, setRefreshing] = useState(false)

  async function refreshMembership() {
    setRefreshing(true)
    try {
      await update({ refresh: true })
      router.replace('/')
      router.refresh()
    } finally {
      setRefreshing(false)
    }
  }

  function openPricing() {
    const a = document.createElement('a')
    a.href = joinUrl
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.click()
  }

  return (
    <div className="max-w-[480px] mx-auto fade-up">
      <div className="text-eyebrow uppercase text-sage-deep mb-3">Membership</div>
      <h1 className="font-sans text-[28px] font-bold text-ink mb-3 leading-[1.1] tracking-tight">
        Join on bio-sense.ai, then come back here.
      </h1>
      <p className="text-body text-ink-2 mb-6 leading-relaxed">
        Membership is billed on the BioSense website, not in the app. Use{' '}
        <span className="text-ink font-medium">{email}</span> when you join so this
        account unlocks when you return.
      </p>

      <Card padding="lg" className="mb-6">
        <p className="text-body-sm text-ink-2 leading-relaxed">
          The app and the website do not share a login. After you pay, sign in here
          with the same email, or tap below if you already joined.
        </p>
      </Card>

      <Button variant="primary" size="lg" fullWidth type="button" onClick={openPricing}>
        Join on bio-sense.ai
        <ArrowRight className="w-4 h-4" />
      </Button>
      <div className="h-3" />
      <Button
        variant="ghost"
        size="lg"
        fullWidth
        loading={refreshing}
        onClick={() => void refreshMembership()}
      >
        I have already joined
      </Button>
    </div>
  )
}
