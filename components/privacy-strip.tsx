import Link from 'next/link'
import { Lock } from 'lucide-react'

export function PrivacyStrip({
  body = 'Your data stays private and secure. Insights are based on your data only, never compared to others.',
}: {
  body?: string
}) {
  return (
    <div className="rounded-[20px] px-4 py-3.5 bg-[rgba(232,224,242,0.55)] ring-1 ring-inset ring-[rgba(120,96,150,0.12)] flex items-start gap-3">
      <Lock className="w-4 h-4 text-[#6B5A7A] mt-0.5 shrink-0" strokeWidth={2.25} />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-ink">Your privacy, our priority</div>
        <p className="text-[12px] text-ink-2 leading-snug mt-0.5">{body}</p>
      </div>
      <Link
        href="/privacy"
        className="text-[12px] font-medium text-sage-deep whitespace-nowrap shrink-0"
      >
        Learn how
      </Link>
    </div>
  )
}
