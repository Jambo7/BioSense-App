'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import {
  ExternalLink,
  CheckCircle2,
  Watch,
  Smartphone,
  Activity,
  Plug,
  ChevronDown,
  Heart,
  HeartPulse,
  Moon,
  Footprints,
  RefreshCw,
  TrendingUp,
  Link2,
  Star,
  Leaf,
  Shield,
  Droplets,
  Utensils,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Pill } from '@/components/ui/pill'
import { cn } from '@/lib/utils'
import { syncAppleHealthKit } from '@/lib/native/apple-sync'
import { isNativeAndroid } from '@/lib/native/healthkit'
import { CONNECT_GROUPS, CONNECTABLES, connectionIdFor, type Connectable } from '@/lib/connectables'

function iconFor(id: string): typeof Watch {
  if (id === 'dexcom') return Droplets
  if (id === 'myfitnesspal' || id === 'cronometer') return Utensils
  if (id === 'flo') return Heart
  if (id === 'strava' || id === 'peloton' || id === 'wahoo') return Activity
  if (id === 'apple' || id === 'samsung') return Smartphone
  return Watch
}

const PRIMARY_ROLE: Record<string, string> = Object.fromEntries(
  CONNECTABLES.map((c) => [c.id, c.role]),
)

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
    return (
      <div className="w-14 h-14 rounded-full bg-[#E8E2D6] flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-ink-3" strokeWidth={1.6} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative w-14 h-14 rounded-full overflow-hidden bg-[#E8E2D6] shrink-0',
        connected ? 'ring-1 ring-inset ring-[rgba(111,143,107,0.28)]' : '',
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="56px"
        className="object-contain p-1.5"
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
  historyDays: number
  coverage: {
    sleep: string
    hrv: string
    recovery: string
    activity: string
  }
}

type PreviewState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: PreviewData }

function formatSync(iso: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
  return `${date} at ${time}`
}

function WearablePreview({
  state,
  provider,
}: {
  state: PreviewState | undefined
  provider: string
}) {
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
        Couldn&apos;t load a preview right now. Please try again shortly.
      </div>
    )
  }

  const { historyDays, coverage } = state.data
  const coverageTiles = [
    { icon: Moon, label: 'Sleep', value: coverage.sleep },
    { icon: HeartPulse, label: 'HRV', value: coverage.hrv },
    { icon: Heart, label: 'Recovery', value: coverage.recovery },
    { icon: Footprints, label: 'Activity', value: coverage.activity },
  ]

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[12px] text-ink-2">BioSense has analysed</div>
        <div className="italic-accent text-[28px] sm:text-[32px] text-sage-deep leading-tight mt-0.5">
          {historyDays > 0
            ? `${historyDays} day${historyDays === 1 ? '' : 's'} of history`
            : 'history still landing'}
        </div>
      </div>

      <div>
        <div className="text-[12px] text-ink-3 mb-2">Coverage quality</div>
        <div className="grid grid-cols-4 gap-2">
          {coverageTiles.map((t) => (
            <div
              key={t.label}
              className="rounded-[16px] bg-[rgba(255,255,255,0.72)] ring-1 ring-inset ring-[rgba(111,143,107,0.16)] px-2 py-2 flex items-start gap-1.5"
            >
              <t.icon className="w-3.5 h-3.5 text-sage-deep mt-0.5 shrink-0" strokeWidth={2} />
              <div className="min-w-0">
                <div className="text-[11px] text-ink-2 leading-tight">{t.label}</div>
                <div className="text-[11px] font-semibold text-sage-deep leading-tight">{t.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[12px] text-ink-3 mb-2">Used by BioSense</div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { icon: Star, label: 'Health Score' },
            { icon: Leaf, label: 'Readiness' },
            { icon: Link2, label: 'Connections' },
            { icon: TrendingUp, label: 'Predictions' },
          ].map((x) => (
            <span
              key={x.label}
              className="inline-flex items-center gap-1 h-7 px-2.5 rounded-pill bg-white/70 ring-1 ring-inset ring-[rgba(111,143,107,0.22)] text-[11.5px] text-sage-deep"
            >
              <x.icon className="w-3 h-3 text-sage-deep" strokeWidth={2.2} />
              {x.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-[12.5px] text-sage-deep">
        <Shield className="w-3.5 h-3.5 text-sage-deep" strokeWidth={2.2} />
        <span>
          {provider === 'dexcom'
            ? 'Comes through Apple Health. Share Dexcom with Health, then Sync.'
            : `Primary role: ${PRIMARY_ROLE[provider] ?? 'Health data source'}`}
        </span>
      </div>
    </div>
  )
}

export default function WearablesPage() {
  const [connected, setConnected] = useState<WearableSync[]>([])
  const [loading, setLoading] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [previews, setPreviews] = useState<Record<string, PreviewState>>({})

  useEffect(() => {
    const load = () =>
      fetch('/api/wearables', { cache: 'no-store' })
        .then((r) => r.json())
        .then((rows: WearableSync[]) => {
          setConnected(rows)
          setExpanded((cur) => {
            if (cur) return cur
            return rows[0]?.provider ?? null
          })
        })
        .catch(() => {})

    load()
    const t = setTimeout(load, 6000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!expanded) return
    if (previews[expanded]) return
    void loadPreview(expanded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded])

  async function loadPreview(id: string) {
    setPreviews((prev) => ({ ...prev, [id]: { status: 'loading' } }))
    try {
      const res = await fetch(`/api/wearables/${connectionIdFor(id)}`, { cache: 'no-store' })
      if (!res.ok) throw new Error('failed')
      const data: PreviewData = await res.json()
      setPreviews((prev) => ({ ...prev, [id]: { status: 'ready', data } }))
    } catch {
      setPreviews((prev) => ({ ...prev, [id]: { status: 'error' } }))
    }
  }

  function togglePreview(id: string) {
    setExpanded((cur) => (cur === id ? null : id))
  }

  function isConnected(id: string) {
    return connected.some((c) => c.provider === connectionIdFor(id))
  }

  function lastSync(id: string) {
    const sync = connected.find((c) => c.provider === connectionIdFor(id))
    return formatSync(sync?.lastSync ?? null)
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

  async function handleAppleHealthKit(sourceId = 'apple') {
    if (isNativeAndroid()) {
      toast.error(
        'Apple Health is iPhone only. On Android, Dexcom will use a Dexcom login once that is set up.',
      )
      return
    }
    setLoading(sourceId)
    try {
      const result = await syncAppleHealthKit(14)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success(
        result.dayCount > 0
          ? `Apple Health synced, ${result.dayCount} day${result.dayCount === 1 ? '' : 's'}`
          : 'Apple Health connected. If you use Dexcom, share it with Health and sync again after a few readings.',
      )
      const res2 = await fetch('/api/wearables', { cache: 'no-store' })
      setConnected(await res2.json())
    } catch {
      toast.error('Apple Health sync failed')
    } finally {
      setLoading(null)
    }
  }

  async function handleDisconnect(id: string) {
    setLoading(id)
    try {
      await fetch(`/api/wearables/${id}`, { method: 'DELETE' })
      toast.success(`${CONNECTABLES.find((c) => c.id === id)?.name ?? id} disconnected`)
      setConnected((prev) => prev.filter((c) => c.provider !== id))
      setExpanded((cur) => (cur === id ? null : cur))
    } catch {
      toast.error('Failed to disconnect')
    } finally {
      setLoading(null)
    }
  }

  const connectedCount = connected.length

  return (
    <div className="max-w-xl mx-auto fade-up space-y-5">
      <header className="text-center pt-1">
        <h1 className="italic-accent text-[32px] sm:text-[38px] text-sage-deep leading-none">
          wearables.
        </h1>
        <p className="text-[14px] text-ink-2 mt-3 leading-relaxed max-w-[40ch] mx-auto">
          Auto-enrich your health score with real-time HRV, sleep, recovery and activity.
        </p>
      </header>

      <div className="flex items-center justify-center gap-2">
        <Pill tone="soft-sage" size="md">
          <Plug className="w-3.5 h-3.5" />
          {connectedCount} connected
        </Pill>
        {connectedCount > 0 && (
          <Pill tone="ink" size="md">syncing automatically</Pill>
        )}
      </div>

      {CONNECT_GROUPS.map((group) => (
        <section key={group.id} className="space-y-3">
          <div className="text-eyebrow uppercase text-sage-deep px-0.5">{group.label}</div>
          {group.items.map((w) => {
            const conn = isConnected(w.id)
            const sync = lastSync(w.id)
            const isOpen = expanded === w.id

            return (
              <ConnectableRow
                key={w.id}
                item={w}
                connected={conn}
                syncLabel={sync}
                isOpen={isOpen}
                loading={loading}
                preview={previews[w.id]}
                onToggle={() => togglePreview(w.id)}
                onConnect={() => handleConnect(w.id)}
                onApple={() => void handleAppleHealthKit(w.id)}
                onDisconnect={() => handleDisconnect(w.id)}
              />
            )
          })}
        </section>
      ))}
    </div>
  )
}

function ConnectableRow({
  item,
  connected,
  syncLabel,
  isOpen,
  loading,
  preview,
  onToggle,
  onConnect,
  onApple,
  onDisconnect,
}: {
  item: Connectable
  connected: boolean
  syncLabel: string | null
  isOpen: boolean
  loading: string | null
  preview: PreviewState | undefined
  onToggle: () => void
  onConnect: () => void
  onApple: () => void
  onDisconnect: () => void
}) {
  return (
    <Card variant="plain" padding="sm">
      <div
        className={cn('flex items-center gap-3', connected && 'cursor-pointer')}
        onClick={connected ? onToggle : undefined}
        role={connected ? 'button' : undefined}
        tabIndex={connected ? 0 : undefined}
        onKeyDown={
          connected
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onToggle()
                }
              }
            : undefined
        }
      >
        <WearableThumb
          src={item.image}
          alt={item.name}
          fallbackIcon={iconFor(item.id)}
          connected={connected}
        />

        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold text-ink">{item.name}</div>
          <div className="text-[12.5px] text-ink-2 mt-0.5 leading-snug">
            {connected ? (syncLabel ? `Last sync · ${syncLabel}` : 'Waiting for the first sync') : item.desc}
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-1.5">
          {connected ? (
            <>
              <Pill tone="soft-sage" size="sm">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </Pill>
              {item.kind === 'healthkit' && (
                <Button
                  variant="ghost"
                  size="sm"
                  loading={loading === item.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    onApple()
                  }}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Sync
                </Button>
              )}
              {!item.viaApple && (
                <Button
                  variant="ghost"
                  size="sm"
                  loading={loading === item.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDisconnect()
                  }}
                >
                  Disconnect
                </Button>
              )}
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-ink-3 transition-transform',
                  isOpen && 'rotate-180',
                )}
              />
            </>
          ) : item.kind === 'healthkit' ? (
            <Button
              variant="ghost"
              size="sm"
              loading={loading === item.id}
              onClick={onApple}
            >
              {item.connectLabel ?? 'Connect'}
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              loading={loading === item.id}
              onClick={onConnect}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Connect
            </Button>
          )}
        </div>
      </div>

      {connected && isOpen && (
        <div className="mt-4 pt-3 border-t border-[rgba(26,28,26,0.06)] fade-up">
          <WearablePreview state={preview} provider={item.id} />
        </div>
      )}
    </Card>
  )
}
