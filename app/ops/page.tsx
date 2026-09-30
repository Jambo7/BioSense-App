'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardLabel } from '@/components/ui/card'

type OpsMember = {
  id: string
  email: string
  name: string | null
  createdAt: string
  country: string | null
  subscriptionStatus: string
  cancelAtPeriodEnd: boolean
  onboardingDone: boolean
  tutorialDone: boolean
  hasConsented: boolean
  notifyProductEmail: boolean
  notifyMarketingEmail: boolean
  emailSuppressed: boolean
  connections: string[]
  counts: {
    meals: number
    mealsEdited: number
    blood: number
    learningSessions: number
    learningComplete: number
    goals: number
    contexts: number
    aiMessages: number
    insights: number
  }
  learning: { section: string; percent: number; status: string }[]
  lastActivityAt: string
  daysQuiet: number
  nextStep: string
  segments: string[]
}

type ConsoleData = {
  generatedAt: string
  totals: {
    accounts: number
    signups7d: number
    signups30d: number
    active: number
    pastDue: number
    marketingOk: number
  }
  funnel: { id: string; label: string; count: number }[]
  features: { id: string; label: string; used: number; never: number; pct: number }[]
  segments: { id: string; label: string; detail: string; count: number; mailable: number }[]
  members: OpsMember[]
}

const HIDE_KEY = 'biosense-ops-hide'

function when(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function canMail(m: OpsMember) {
  return m.notifyMarketingEmail && !m.emailSuppressed
}

function reached(m: OpsMember, id: string) {
  if (id === 'signup') return true
  if (id === 'consent') return m.hasConsented
  if (id === 'onboarding') return m.onboardingDone
  if (id === 'tutorial') return m.tutorialDone
  if (id === 'member') return m.subscriptionStatus === 'ACTIVE' || m.subscriptionStatus === 'PAST_DUE'
  if (id === 'connected') return m.connections.length > 0
  return false
}

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`
}

export default function OpsPage() {
  const [secret, setSecret] = useState('')
  const [data, setData] = useState<ConsoleData | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState('all')
  const [sort, setSort] = useState<'quiet' | 'newest' | 'active'>('quiet')
  const [hideText, setHideText] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const [copied, setCopied] = useState('')
  const [ghlMsg, setGhlMsg] = useState('')
  const loadGen = useRef(0)

  useEffect(() => {
    setHideText(window.localStorage.getItem(HIDE_KEY) ?? '')
  }, [])

  async function load() {
    const gen = ++loadGen.current
    const res = await fetch('/api/ops/console', { cache: 'no-store' })
    if (gen !== loadGen.current) return false
    if (res.status === 401) {
      setData(null)
      return false
    }
    if (!res.ok) {
      setError('Could not load the console.')
      return false
    }
    setData(await res.json())
    setSecret('')
    setError('')
    return true
  }

  useEffect(() => {
    void load()
  }, [])

  async function syncGhl() {
    setBusy(true)
    setGhlMsg('')
    setError('')
    const res = await fetch('/api/ops/ghl', { method: 'POST' })
    setBusy(false)
    if (res.status === 401) {
      setData(null)
      return
    }
    if (!res.ok) {
      setError('Could not update GoHighLevel.')
      return
    }
    const body = (await res.json()) as { skipped?: boolean; synced?: number; failed?: number }
    if (body.skipped) {
      setGhlMsg('GoHighLevel is not connected yet. The token and location ID are missing.')
      return
    }
    setGhlMsg(`Updated ${body.synced ?? 0} contacts. ${body.failed ?? 0} failed.`)
  }

  async function login() {
    setBusy(true)
    setError('')
    const res = await fetch('/api/ops/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret }),
    })
    if (!res.ok) {
      setBusy(false)
      setError('Wrong secret, or OPS_SECRET is not set on the server.')
      return
    }
    const before = loadGen.current
    const ok = await load()
    if (loadGen.current !== before + 1) return
    setBusy(false)
    if (!ok) setError('The password was accepted, but the live accounts did not load. Try again.')
  }

  async function logout() {
    await fetch('/api/ops/logout', { method: 'POST' })
    setData(null)
  }

  const hideNeedles = useMemo(
    () =>
      hideText
        .split(',')
        .map((part) => part.trim().toLowerCase())
        .filter((part) => part.length > 1),
    [hideText],
  )

  function hidden(m: OpsMember) {
    if (hideNeedles.length === 0) return false
    const email = m.email.toLowerCase()
    return hideNeedles.some((part) => email.includes(part))
  }

  const visible = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    const rows = data.members.filter((m) => {
      if (hidden(m)) return false
      if (segment.startsWith('reached:')) {
        if (!reached(m, segment.slice('reached:'.length))) return false
      } else if (segment !== 'all' && !m.segments.includes(segment)) {
        return false
      }
      if (!q) return true
      return (
        m.email.toLowerCase().includes(q) ||
        (m.name ?? '').toLowerCase().includes(q) ||
        m.connections.some((c) => c.includes(q))
      )
    })
    rows.sort((a, b) => {
      if (sort === 'newest') return +new Date(b.createdAt) - +new Date(a.createdAt)
      if (sort === 'active') return +new Date(b.lastActivityAt) - +new Date(a.lastActivityAt)
      return b.daysQuiet - a.daysQuiet || +new Date(b.createdAt) - +new Date(a.createdAt)
    })
    return rows
  }, [data, query, segment, sort, hideNeedles])

  function showList(id: string) {
    setSegment(id)
    document.getElementById('ops-people')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function copyEmails(id: string) {
    if (!data) return
    const pool = id === 'visible' ? visible : data.members.filter((m) => m.segments.includes(id) && !hidden(m))
    const rows = pool.filter(canMail)
    const skipped = pool.length - rows.length
    const text = rows.map((m) => m.email).join('\n')
    if (!text) {
      setCopied(pool.length === 0 ? 'No addresses in that list.' : 'Nobody in that list has opted in to marketing email.')
      return
    }
    await navigator.clipboard.writeText(text)
    const skippedNote = skipped > 0 ? ` Left out ${skipped} who cannot be mailed.` : ''
    setCopied(`Copied ${rows.length} opted-in email${rows.length === 1 ? '' : 's'}.${skippedNote}`)
  }

  function downloadEmails() {
    const rows = visible.filter(canMail)
    if (rows.length === 0) {
      setCopied('Nobody in this view has opted in to marketing email.')
      return
    }
    const lines = [
      'name,email,next step,quiet days,signed up',
      ...rows.map((m) =>
        [m.name || '', m.email, m.nextStep, String(m.daysQuiet), m.createdAt.slice(0, 10)].map(csvCell).join(','),
      ),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'biosense-opted-in.csv'
    link.click()
    URL.revokeObjectURL(url)
    setCopied(`Downloaded ${rows.length} opted-in email${rows.length === 1 ? '' : 's'}.`)
  }

  function rememberHide(value: string) {
    setHideText(value)
    window.localStorage.setItem(HIDE_KEY, value)
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-sand px-4 py-10">
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="font-sans text-h1 text-ink">BioSense console</h1>
          <p className="text-body-sm text-ink-2 leading-relaxed">
            Admin view of live accounts. Signups, feature use, and where people stop.
            No blood results, meals, or chat text.
          </p>
          <Card padding="md">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void login()
              }}
            >
              <CardLabel>Admin password</CardLabel>
              <Input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="mt-2 mb-3"
                autoComplete="current-password"
              />
              <Button type="submit" size="sm" loading={busy}>
                {busy ? 'Opening live accounts…' : 'Open console'}
              </Button>
            </form>
          </Card>
          {error && <p className="text-caption text-rose">{error}</p>}
        </div>
      </main>
    )
  }

  const first = data.funnel[0]?.count ?? 0

  return (
    <main className="min-h-screen bg-sand px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-sans text-h1 text-ink">BioSense console</h1>
            <p className="text-caption text-ink-3 mt-1">
              Live data, refreshed {when(data.generatedAt)}. Open this page in a browser.
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="subtle" onClick={() => void syncGhl()} loading={busy}>
              Update GoHighLevel
            </Button>
            <Button size="sm" variant="subtle" onClick={() => void load()}>
              Refresh
            </Button>
            <Button size="sm" variant="ghost" onClick={() => void logout()}>
              Sign out
            </Button>
          </div>
        </header>
        {ghlMsg && <p className="text-caption text-ink-2">{ghlMsg}</p>}

        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            ['Accounts', data.totals.accounts],
            ['Signups, 7 days', data.totals.signups7d],
            ['Signups, 30 days', data.totals.signups30d],
            ['Active memberships', data.totals.active],
            ['Payment due', data.totals.pastDue],
            ['Marketing opt-in', data.totals.marketingOk],
          ].map(([label, n]) => (
            <Card key={String(label)} padding="sm">
              <div className="text-[11px] uppercase tracking-wide text-ink-3">{label}</div>
              <div className="font-sans text-[28px] font-bold text-ink leading-none mt-2">{n}</div>
            </Card>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-4">
          <Card padding="md">
            <CardLabel>Path into the app</CardLabel>
            <p className="text-caption text-ink-3 mt-1 mb-4">
              Each step is people who have actually reached it.
            </p>
            <ol className="space-y-3">
              {data.funnel.map((step, i) => {
                const prev = i === 0 ? step.count : data.funnel[i - 1].count
                const fromStart = first === 0 ? 0 : Math.round((step.count / first) * 100)
                const fromPrev = prev === 0 ? 0 : Math.round((step.count / prev) * 100)
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      className="flex w-full justify-between text-[13px] text-ink mb-1 text-left"
                      onClick={() => showList(`reached:${step.id}`)}
                    >
                      <span>{step.label}</span>
                      <span className="font-semibold">{step.count}</span>
                    </button>
                    <div className="h-2 rounded-full bg-[rgba(111,143,107,0.15)] overflow-hidden">
                      <div className="h-full bg-sage" style={{ width: `${fromStart}%` }} />
                    </div>
                    <div className="text-[11px] text-ink-3 mt-1">
                      {fromStart}% of signups
                      {i > 0 ? ` · ${fromPrev}% of the previous step` : ''}
                    </div>
                  </li>
                )
              })}
            </ol>
          </Card>

          <Card padding="md">
            <CardLabel>Features used</CardLabel>
            <p className="text-caption text-ink-3 mt-1 mb-4">
              Used means at least one real record. Never means the rest of the accounts.
            </p>
            <ul className="space-y-2.5">
              {data.features.map((f) => (
                <li key={f.id} className="grid grid-cols-[140px_1fr_auto] gap-2 items-center text-[12.5px]">
                  <span className="text-ink">{f.label}</span>
                  <span className="h-2 rounded-full bg-[rgba(111,143,107,0.15)] overflow-hidden">
                    <span className="block h-full bg-sage" style={{ width: `${f.pct}%` }} />
                  </span>
                  <span className="text-ink-3 tabular-nums">
                    {f.used} used · {f.never} never
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section>
          <h2 className="font-sans text-[20px] font-semibold text-ink mb-1">Email sequences</h2>
          <p className="text-caption text-ink-3 mb-3">
            These are the people sitting in each gap right now. Copy and download include only people who opted in.
          </p>
          {copied && <p className="text-caption text-sage-deep mb-3">{copied}</p>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.segments.filter((s) => s.count > 0).map((s) => (
              <Card key={s.id} padding="sm" className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-[14px] font-semibold text-ink">{s.label}</div>
                  <div className="text-right">
                    <div className="font-sans text-[20px] font-bold text-sage-deep leading-none">{s.count}</div>
                    <div className="text-[11px] text-ink-3 mt-1">{s.mailable} can be emailed</div>
                  </div>
                </div>
                <p className="text-[12.5px] text-ink-2 leading-relaxed flex-1">{s.detail}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="subtle" onClick={() => void copyEmails(s.id)}>
                    Copy opted-in
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => showList(s.id)}>
                    Show people
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="ops-people">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
            <div>
              <h2 className="font-sans text-[20px] font-semibold text-ink">People</h2>
              <p className="text-caption text-ink-3">
                {visible.length} shown
                {segment.startsWith('reached:')
                  ? ` · ${data.funnel.find((s) => s.id === segment.slice('reached:'.length))?.label ?? 'This step'}`
                  : ''}
                . Quiet is days since the last recorded activity.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                className="h-10 rounded-pill border border-line bg-white px-3 text-[13px] text-ink"
                value={segment.startsWith('reached:') ? 'all' : segment}
                onChange={(e) => setSegment(e.target.value)}
              >
                <option value="all">All accounts</option>
                {data.segments.filter((s) => s.count > 0).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <select
                className="h-10 rounded-pill border border-line bg-white px-3 text-[13px] text-ink"
                value={sort}
                onChange={(e) => setSort(e.target.value as 'quiet' | 'newest' | 'active')}
              >
                <option value="quiet">Quietest first</option>
                <option value="newest">Newest signup</option>
                <option value="active">Latest activity</option>
              </select>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, device"
                className="w-56"
              />
              <Input
                value={hideText}
                onChange={(e) => rememberHide(e.target.value)}
                placeholder="Hide emails containing"
                className="w-52"
              />
              <Button size="sm" variant="subtle" onClick={() => void copyEmails('visible')}>
                Copy opted-in
              </Button>
              <Button size="sm" variant="ghost" onClick={downloadEmails}>
                Download CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-card bg-white/80 ring-1 ring-line">
            <table className="w-full text-left text-[13px]">
              <thead className="text-[11px] uppercase tracking-wide text-ink-3">
                <tr>
                  <th className="px-3 py-2 font-medium">Person</th>
                  <th className="px-3 py-2 font-medium">Signed up</th>
                  <th className="px-3 py-2 font-medium">Next step</th>
                  <th className="px-3 py-2 font-medium">Quiet</th>
                  <th className="px-3 py-2 font-medium">Marketing</th>
                  <th className="px-3 py-2 font-medium">Membership</th>
                  <th className="px-3 py-2 font-medium">Devices</th>
                  <th className="px-3 py-2 font-medium">Meals</th>
                  <th className="px-3 py-2 font-medium">Blood</th>
                  <th className="px-3 py-2 font-medium">Learning</th>
                  <th className="px-3 py-2 font-medium">AI</th>
                  <th className="px-3 py-2 font-medium">Last activity</th>
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={12} className="px-3 py-6 text-ink-3">
                      No accounts match this view.
                    </td>
                  </tr>
                )}
                {visible.map((m) => (
                  <Fragment key={m.id}>
                    <tr
                      className="border-t border-line cursor-pointer hover:bg-[rgba(111,143,107,0.06)]"
                      onClick={() => setOpenId((cur) => (cur === m.id ? null : m.id))}
                    >
                      <td className="px-3 py-2">
                        <div className="font-medium text-ink">{m.name || 'No name'}</div>
                        <div className="text-ink-3">{m.email}</div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">{when(m.createdAt)}</td>
                      <td className="px-3 py-2">{m.nextStep}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{m.daysQuiet}d</td>
                      <td className="px-3 py-2">{canMail(m) ? 'Yes' : 'No'}</td>
                      <td className="px-3 py-2">
                        {m.subscriptionStatus}
                        {m.cancelAtPeriodEnd ? ' · cancels' : ''}
                      </td>
                      <td className="px-3 py-2">{m.connections.join(', ') || 'none'}</td>
                      <td className="px-3 py-2">{m.counts.meals}</td>
                      <td className="px-3 py-2">{m.counts.blood}</td>
                      <td className="px-3 py-2">
                        {m.counts.learningComplete}/{m.counts.learningSessions}
                      </td>
                      <td className="px-3 py-2">{m.counts.aiMessages}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{when(m.lastActivityAt)}</td>
                    </tr>
                    {openId === m.id && (
                      <tr className="border-t border-line bg-[rgba(250,250,248,0.9)]">
                        <td colSpan={12} className="px-3 py-3 text-[12.5px] text-ink-2">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                            <div>Country: {m.country || 'not set'}</div>
                            <div>Consent: {m.hasConsented ? 'yes' : 'no'}</div>
                            <div>Onboarding: {m.onboardingDone ? 'done' : 'open'}</div>
                            <div>Tutorial: {m.tutorialDone ? 'done' : 'open'}</div>
                            <div>Goals saved: {m.counts.goals}</div>
                            <div>Daily context logs: {m.counts.contexts}</div>
                            <div>Meals edited after scan: {m.counts.mealsEdited}</div>
                            <div>Insights on file: {m.counts.insights}</div>
                            <div>Product email: {m.notifyProductEmail ? 'on' : 'off'}</div>
                            <div>Marketing email: {m.notifyMarketingEmail ? 'on' : 'off'}</div>
                            <div>Email suppressed: {m.emailSuppressed ? 'yes' : 'no'}</div>
                            <div>Learning sections: {m.learning.length || 'none'}</div>
                          </div>
                          {m.learning.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {m.learning.map((s) => (
                                <li key={s.section}>
                                  {s.section}: {s.percent}% · {s.status}
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
