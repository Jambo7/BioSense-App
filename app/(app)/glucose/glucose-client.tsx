'use client'

import Link from 'next/link'
import { Droplets, Moon, Utensils } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { formatGlucose } from '@/lib/glucose'

type Tracking = 'NONE' | 'CGM' | 'OTHER' | 'PREFER_NOT'

export function GlucoseClient({
  tracking,
  appleConnected,
  lastSync,
  days,
}: {
  tracking: Tracking
  appleConnected: boolean
  lastSync: string | null
  days: { date: string; glucoseMgdl: number | null; sleepHours: number | null }[]
}) {
  const latest = [...days].reverse().find((d) => d.glucoseMgdl != null)
  const usesCgm = tracking === 'CGM' || appleConnected

  return (
    <div className="max-w-xl mx-auto fade-up space-y-5">
      <header className="text-center pt-1">
        <h1 className="italic-accent text-[32px] sm:text-[38px] text-sage-deep leading-none">
          glucose.
        </h1>
        <p className="text-[14px] text-ink-2 mt-3 leading-relaxed max-w-[42ch] mx-auto">
          How glucose sits alongside sleep, meals and activity. Educational only, not a
          diabetes management tool.
        </p>
      </header>

      <Card padding="lg">
        <div className="flex items-start gap-3">
          <IconBadge icon={Droplets} tone="teal" variant="tint" size="md" />
          <div className="min-w-0">
            <div className="text-[12px] text-ink-3">Latest daily average</div>
            <div className="italic-accent text-[32px] sm:text-[36px] text-sage-deep leading-tight mt-0.5">
              {latest?.glucoseMgdl != null ? formatGlucose(latest.glucoseMgdl) : 'Waiting for data'}
            </div>
            <p className="text-[12.5px] text-ink-2 mt-1 leading-snug">
              {latest
                ? `From ${new Date(latest.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}.`
                : usesCgm
                  ? 'Share Dexcom with Apple Health, then connect Apple Health and sync. Glucose arrives with that sync.'
                  : 'If you use Dexcom, share it with Apple Health and connect Apple Health in Connections.'}
            </p>
          </div>
        </div>
      </Card>

      {days.length > 0 && (
        <Card padding="md">
          <div className="text-eyebrow uppercase text-ink-3 mb-3">Recent days</div>
          <div className="space-y-2">
            {[...days].reverse().map((d) => (
              <div key={d.date} className="flex items-center justify-between gap-3">
                <span className="text-[13px] text-ink-2">
                  {new Date(d.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
                <span className="text-[13px] font-semibold text-ink">
                  {d.glucoseMgdl != null ? formatGlucose(d.glucoseMgdl) : '—'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/meals">
          <Card padding="md" className="h-full tile-hover">
            <IconBadge icon={Utensils} tone="amber" variant="tint" size="sm" />
            <div className="text-[13.5px] font-semibold text-ink mt-2">Meals</div>
            <p className="text-[12px] text-ink-2 leading-snug mt-0.5">
              Log a meal so BioSense can start relating food to glucose.
            </p>
          </Card>
        </Link>
        <Link href="/wearables">
          <Card padding="md" className="h-full tile-hover">
            <IconBadge icon={Moon} tone="violet" variant="tint" size="sm" />
            <div className="text-[13.5px] font-semibold text-ink mt-2">Connections</div>
            <p className="text-[12px] text-ink-2 leading-snug mt-0.5">
              {appleConnected
                ? lastSync
                  ? 'Coming through Apple Health. Sleep and activity stay in Home as usual.'
                  : 'Apple Health is connected. Waiting for the first sync.'
                : 'Share Dexcom with Apple Health, then connect Apple Health.'}
            </p>
          </Card>
        </Link>
      </div>

      {!appleConnected && (
        <div className="flex justify-center">
          <Link
            href="/wearables"
            className="inline-flex items-center justify-center h-12 px-7 rounded-pill text-[14px] font-semibold text-white bg-grad-sage shadow-button"
          >
            Connect Apple Health
          </Link>
        </div>
      )}
    </div>
  )
}
