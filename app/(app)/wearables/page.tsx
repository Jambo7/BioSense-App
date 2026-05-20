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

export default function WearablesPage() {
  const [connected, setConnected] = useState<WearableSync[]>([])
  const [loading, setLoading] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/wearables')
      .then((r) => r.json())
      .then(setConnected)
      .catch(() => {})
  }, [])

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
      const res = await fetch(`/api/wearables/${id}/auth`)
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else toast.error(data.error || 'Failed to start OAuth')
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

          return (
            <Card key={w.id} padding="md" className="flex items-center gap-4">
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
                <div className="text-caption text-ink-2">{w.desc}</div>
                {sync && <div className="text-micro text-ink-3 mt-0.5">Last sync · {sync}</div>}
              </div>

              <div className="shrink-0">
                {conn ? (
                  <Button
                    variant="subtle"
                    size="sm"
                    loading={loading === w.id}
                    onClick={() => handleDisconnect(w.id)}
                  >
                    Disconnect
                  </Button>
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
            <strong className="text-ink">Oura, Whoop, Garmin, Samsung</strong> — click Connect to
            authorise via OAuth. Data syncs automatically every few hours.
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
