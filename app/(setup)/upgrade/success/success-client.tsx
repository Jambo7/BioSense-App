'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export function SuccessClient({ next }: { next: string }) {
  const router = useRouter()
  const { update } = useSession()

  useEffect(() => {
    let cancelled = false
    void (async () => {
      await update({ refresh: true })
      if (cancelled) return
      router.replace(next)
      router.refresh()
    })()
    return () => {
      cancelled = true
    }
  }, [next, router, update])

  return (
    <div className="max-w-[440px] mx-auto fade-up">
      <div className="text-eyebrow uppercase text-sage-deep mb-3">Membership</div>
      <h1 className="font-sans text-[28px] font-bold text-ink mb-3 leading-[1.1] tracking-tight">
        You are in.
      </h1>
      <p className="text-body text-ink-2 leading-relaxed">
        Confirming your membership, then taking you through.
      </p>
    </div>
  )
}
