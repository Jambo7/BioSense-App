'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import {
  ExternalLink,
  CheckCircle2,
  Upload,
  Watch,
  Smartphone,
  Activity,
  Plug,
  Info,
  ChevronDown,
  HeartPulse,
  Footprints,
  Flame,
  Moon,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { cn } from '@/lib/utils'

const WEARABLES = [
  { id: 'oura',    name: 'Oura Ring',      Icon: Watch,      image: '/wearables/oura.png',    desc: 'Sleep, HRV, readiness, temperature',  type: 'oauth' },
  { id: 'whoop',   name: 'Whoop',          Icon: Watch,      image: '/wearables/whoop.png',   desc: 'Recovery, strain, sleep performance', type: 'oauth' },
  { id: 'garmin',  name: 'Garmin',         Icon: Watch,      image: '/wearables/garmin.png',  desc: 'Activity, HRV, steps, VO₂ max',       type: 'oauth' },
  { id: 'fitbit',  name: 'Fitbit',         Icon: Watch,      image: '/wearables/fitbit.png',  desc: 'Sleep, heart rate, steps, activity',  type: 'oauth' },
  { id: 'samsung', name: 'Samsung Health', Icon: Smartphone, image: '/wearables/samsung.png', desc: 'Steps, heart rate, sleep (Android)',  type: 'oauth' },
  { id: 'apple',   name: 'Apple Health',   Icon: Smartphone, image: '/wearables/apple.png',   desc: 'Upload Health Auto Export JSON',      type: 'upload' },
]

function WearableThumb({
  src,
  alt,
  fallbackIcon: Icon,
  connected,
}: {
  src?: string
  alt: string
  fallbackIcon: typeof Watch
  connected: boolean
}) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return <IconBadge icon={Icon} size="lg" tone={connected ? 'sage' : 'sand'} />
  }

  return (
    <div
      className={cn(
        'relative w-12 h-12 rounded-2xl overflow-hidden bg-white shrink-0',
        'ring-1 ring-inset',
        connected
          ? 'ring-[rgba(111,143,107,0.35)] shadow-[0_2px_6px_-2px_rgba(111,143,107,0.30)]'
          : 'ring-[rgba(26,28,26,0.06)]',
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="48px"
        className="object-contain p-1"
        onError={() => setErrored(true)}
      />
    </div>
  )
}

interface WearableSync {
  provider: string
  lastSync: string | null
}

interface PreviewMetrics {
  hrv?: number
  rhr?: number
  steps?: number
  activeMinutes?: number
  sleepScore?: number
}

interface PreviewData {
  provider: string
  connectedAt: string
  lastSync: string | null
  metrics: PreviewMetrics
}

type PreviewState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: PreviewData }

const METRIC_TILES: Array<{
  key: keyof PreviewMetrics
  label: string
  Icon: typeof Activity
  unit?: string
}> = [
  { key: 'hrv', label: 'HRV', Icon: Activity, unit: 'ms' },
  { key: 'rhr', label: 'Resting HR', Icon: HeartPulse, unit: 'bpm' },
  { key: 'sleepScore', label: 'Sleep', Icon: Moon },
  { key: 'steps', label: 'Steps', Icon: Footprints },
  { key: 'activeMinutes', label: 'Active', Icon: Flame, unit: 'min' },
]

function formatSync(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function WearablePreview({ state }: { state: PreviewState | undefined }) {
  if (!state || state.status === 'loading') {
    return (
      <div className="flex items-center gap-2 text-caption text-ink-3 py-2">
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        Loading your latest data…
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="text-caption text-ink-3 py-2">
        Couldn’t load a preview right now — please try again shortly.
      </div>
    )
  }

  const { metrics, lastSync } = state.data
  const tiles = METRIC_TILES.filter((t) => {
    const v = metrics[t.key]
    return typeof v === 'number' && Number.isFinite(v)
  })

  if (tiles.length === 0) {
    return (
      <div className="flex items-center gap-2 text-caption text-ink-3 py-2">
        <RefreshCw className="w-3.5 h-3.5" />
        Connected — syncing your first readings. Fresh data usually lands within a few hours.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div
            key={t.key}
            className="rounded-xl bg-[rgba(111,143,107,0.07)] ring-1 ring-inset ring-[rgba(111,143,107,0.16)] px-3 py-2.5"
          >
            <div className="flex items-center gap-1.5 text-micro text-sage-deep mb-1">
              <t.Icon className="w-3 h-3" />
              {t.label}
            </div>
            <div className="text-body-sm font-semibold text-ink tabular-nums">
              {Math.round(metrics[t.key] as number).toLocaleString('en-GB')}
              {t.unit && <span className="text-micro text-ink-3 font-normal ml-0.5">{t.unit}</span>}
            </div>
          </div>
        ))}
      </div>
      {lastSync && (
        <div className="text-micro text-ink-3">Latest reading · {formatSync(lastSync)}</div>
      )}
    </div>
  )
}

export default function WearablesPage() {
  const [connected, setConnected] = useState<WearableSync[]>([])
  const [loading, setLoading] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [previews, setPreviews] = useState<Record<string, PreviewState>>({})

  useEffect(() => {
    fetch('/api/wearables')
      .then((r) => r.json())
      .then(setConnected)
      .catch(() => {})
  }, [])

  async function loadPreview(id: string) {
    setPreviews((prev) => ({ ...prev, [id]: { status: 'loading' } }))
    try {
      const res = await fetch(`/api/wearables/${id}`)
      if (!res.ok) throw new Error('failed')
      const data: PreviewData = await res.json()
      setPreviews((prev) => ({ ...prev, [id]: { status: 'ready', data } }))
    } catch {
      setPreviews((prev) => ({ ...prev, [id]: { status: 'error' } }))
    }
  }

  function togglePreview(id: string) {
    setExpanded((cur) => {
      const next = cur === id ? null : id
      if (next && previews[id]?.status !== 'ready') void loadPreview(id)
      return next
    })
  }

  function isConnected(id: string) {
    return connected.some((c) => c.provider === id)
  }

  function lastSync(id: string) {
    const sync = connected.find((c) => c.provider === id)
    if (!sync?.lastSync) return null
    return new Date(sync.lastSync).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  async function handleConnect(id: string) {
    setLoading(id)
    try {
      const res = await fetch(`/api/wearables/terra/connect?provider=${id}`)
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else toast.error(data.error || 'Failed to start connection')
    } catch {
      toast.error('Connection failed')
    } finally {
      setLoading(null)
    }
  }

  async function handleAppleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading('apple')
    const fd = new FormData()
    fd.append('file', file)

    try {
      const res = await fetch('/api/wearables/apple/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) {
        toast.success(`Apple Health imported — ${data.recordCount} records`)
        const res2 = await fetch('/api/wearables')
        setConnected(await res2.json())
      } else {
        toast.error(data.error || 'Import failed')
      }
    } catch {
      toast.error('Upload failed')
    } finally {
      setLoading(null)
    }
  }

  async function handleDisconnect(id: string) {
    setLoading(id)
    try {
      await fetch(`/api/wearables/${id}`, { method: 'DELETE' })
      toast.success(`${id} disconnected`)
      setConnected((prev) => prev.filter((c) => c.provider !== id))
    } catch {
      toast.error('Failed to disconnect')
    } finally {
      setLoading(null)
    }
  }

  const connectedCount = connected.length

  return (
    <div className="max-w-2xl mx-auto fade-up space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <IconBadge icon={Activity} size="xl" tone="amber" />
          <div>
            <div className="text-eyebrow uppercase text-sage-deep mb-1">Data sources</div>
            <h1 className="font-sans text-h1 text-ink tracking-tight">
              Connect{' '}
              <span className="italic-accent">your wearables.</span>
            </h1>
            <p className="text-body text-ink-2 mt-2 leading-relaxed max-w-[58ch]">
              Auto-enrich your health score with real-time HRV, sleep, recovery and activity.
            </p>
          </div>
        </div>
      </header>

      <div className="flex items-center gap-2">
        <Pill tone={connectedCount > 0 ? 'soft-sage' : 'ink'} size="md">
          <Plug className="w-3.5 h-3.5" />
          {connectedCount} connected
        </Pill>
        {connectedCount > 0 && (
          <Pill tone="ink" size="sm">syncing automatically</Pill>
        )}
      </div>

      <div className="space-y-2.5">
        {WEARABLES.map((w) => {
          const conn = isConnected(w.id)
          const sync = lastSync(w.id)
          const isOpen = expanded === w.id

          return (
            <Card key={w.id} padding="md">
              <div
                className={cn('flex items-center gap-4', conn && 'cursor-pointer')}
                onClick={conn ? () => togglePreview(w.id) : undefined}
                role={conn ? 'button' : undefined}
                tabIndex={conn ? 0 : undefined}
                onKeyDown={
                  conn
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          togglePreview(w.id)
                        }
                      }
                    : undefined
                }
              >
                <WearableThumb
                  src={w.image}
                  alt={w.name}
                  fallbackIcon={w.Icon}
                  connected={conn}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-body-sm font-semibold text-ink">{w.name}</span>
                    {conn && (
                      <Pill tone="soft-sage" size="sm">
                        <CheckCircle2 className="w-3 h-3" /> Connected
                      </Pill>
                    )}
                  </div>
                  <div className="text-caption text-ink-2">
                    {conn ? 'Tap to view your latest readings' : w.desc}
                  </div>
                  {sync && <div className="text-micro text-ink-3 mt-0.5">Last sync · {sync}</div>}
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  {conn ? (
                    <>
                      <Button
                        variant="subtle"
                        size="sm"
                        loading={loading === w.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDisconnect(w.id)
                        }}
                      >
                        Disconnect
                      </Button>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 text-ink-3 transition-transform',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </>
                  ) : w.type === 'upload' ? (
                  <label className="cursor-pointer inline-block">
                    <input
                      type="file"
                      accept=".json,application/json"
                      className="hidden"
                      onChange={handleAppleUpload}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      loading={loading === w.id}
                      className="pointer-events-none"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload JSON
                    </Button>
                  </label>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    loading={loading === w.id}
                    onClick={() => handleConnect(w.id)}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Connect
                  </Button>
                )}
                </div>
              </div>

              {conn && isOpen && (
                <div className="mt-3 pt-3 border-t border-[rgba(26,28,26,0.06)] fade-up">
                  <WearablePreview state={previews[w.id]} />
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <Card variant="soft" padding="md">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-sage-deep" />
          <CardLabel className="mb-0">How it works</CardLabel>
        </div>
        <div className="space-y-3 text-body-sm text-ink-2 leading-relaxed">
          <p>
            <strong className="text-ink">Oura, Whoop, Garmin, Fitbit, Samsung</strong> — click Connect
            to authorise via OAuth. Data syncs automatically every few hours.
          </p>
          <p>
            <strong className="text-ink">Apple Health</strong> — install the{' '}
            <a
              href="https://www.healthautoexport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage-deep underline font-medium"
            >
              Health Auto Export
            </a>{' '}
            app, export as JSON, then upload here. Native HealthKit sync ships with the iOS app.
          </p>
        </div>
      </Card>
    </div>
  )
}
