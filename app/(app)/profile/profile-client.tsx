'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import {
  User,
  ShieldCheck,
  Download,
  Trash2,
  Pencil,
  Check,
  X,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'

/**
 * /profile is the user's ACCOUNT page only (per v6 brief).
 *
 *   Includes:  name, email, age, member-since pill, sign-out, data export,
 *              data deletion (PDPL).
 *
 *   Does NOT include:  goals, health context, allergies, conditions,
 *                      lifestyle. Those are personalisation FEATURES and
 *                      now live in `AI → Preferences`.
 */
interface ProfileData {
  id: string
  name: string | null
  email: string
  age: number | null
  subscriptionStatus: string
  createdAt: string
  notifyProductEmail: boolean
  notifyMarketingEmail: boolean
}

export function ProfileClient({ user }: { user: ProfileData }) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const [notifyProductEmail, setNotifyProductEmail] = useState(user.notifyProductEmail)
  const [notifyMarketingEmail, setNotifyMarketingEmail] = useState(user.notifyMarketingEmail)
  const [prefBusy, setPrefBusy] = useState(false)

  const [form, setForm] = useState({
    name: user.name ?? '',
    age: user.age?.toString() ?? '',
  })

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          age: form.age ? parseInt(form.age) : null,
        }),
      })
      if (!res.ok) throw new Error()
      toast.success('Profile updated')
      setEditing(false)
    } catch {
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  async function savePrefs(next: { notifyProductEmail?: boolean; notifyMarketingEmail?: boolean }) {
    setPrefBusy(true)
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      })
      if (!res.ok) throw new Error()
      if (next.notifyProductEmail != null) setNotifyProductEmail(next.notifyProductEmail)
      if (next.notifyMarketingEmail != null) setNotifyMarketingEmail(next.notifyMarketingEmail)
      toast.success('Email preferences saved')
    } catch {
      toast.error('Could not save preferences')
    } finally {
      setPrefBusy(false)
    }
  }

  async function handleExport() {
    const res = await fetch('/api/account/export')
    if (!res.ok) return toast.error('Export failed')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `biosense-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleDeleteAccount() {
    if (!window.confirm('Permanently delete your account and BioSense-held data? This cannot be undone.'))
      return
    const password = window.prompt('Enter your password to confirm deletion')
    if (!password) return
    const res = await fetch('/api/account', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) window.location.href = '/login'
    else {
      const body = (await res.json().catch(() => null)) as { error?: string } | null
      toast.error(body?.error ?? 'Failed to delete account')
    }
  }

  const initials = (user.name ?? user.email)
    .split(' ')
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const isActive = user.subscriptionStatus === 'ACTIVE'

  return (
    <div className="max-w-2xl mx-auto fade-up space-y-5">
      {/* Hero header */}
      <Card padding="lg" className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-sage-tint border-2 border-accent-ring flex items-center justify-center text-h1 font-bold text-sage-deep shrink-0 mx-auto sm:mx-0">
          {initials}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="font-sans text-h2 text-ink tracking-tight">{user.name ?? 'Your account'}</h1>
          <div className="text-body-sm text-ink-2 mt-0.5">{user.email}</div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
            <Pill tone={isActive ? 'soft-sage' : 'ink'} size="md">
              {isActive ? 'Active' : user.subscriptionStatus}
            </Pill>
            <Pill tone="ink" size="md">
              Member since{' '}
              {new Date(user.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </Pill>
          </div>
        </div>
      </Card>

      {/* Personal details */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IconBadge icon={User} tone="sage" size="sm" />
            <CardLabel className="mb-0">Personal details</CardLabel>
          </div>
          {!editing && (
            <Button variant="subtle" size="sm" onClick={() => setEditing(true)}>
              <Pencil className="w-3 h-3" />
              Edit
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <Input
            label="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            disabled={!editing}
          />
          <Input
            label="Email"
            value={user.email}
            disabled
            hint="Contact support to change your email."
          />
          <Input
            label="Age"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            disabled={!editing}
            placeholder="e.g. 34"
          />
        </div>

        <p className="mt-4 text-caption text-ink-3 leading-relaxed">
          Looking for your goals, dietary preferences and health context? They
          now live in <span className="text-sage-deep font-medium">AI → Preferences</span>{' '}
          so the assistant can use them directly.
        </p>
      </Card>

      {editing && (
        <div className="flex gap-3 sticky bottom-24 lg:bottom-4 z-10 bg-sand/90 backdrop-blur-sm rounded-pill p-2">
          <Button variant="ghost" size="md" onClick={() => setEditing(false)} fullWidth>
            <X className="w-4 h-4" /> Cancel
          </Button>
          <Button variant="primary" size="md" loading={saving} onClick={handleSave} fullWidth>
            <Check className="w-4 h-4" /> Save changes
          </Button>
        </div>
      )}

      {/* Sign out — promoted because we removed it from the top nav. */}
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardLabel className="mb-0.5">Session</CardLabel>
            <p className="text-caption text-ink-3">
              Signed in as <span className="text-ink-2">{user.email}</span>
            </p>
          </div>
          <Button
            variant="subtle"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </Button>
        </div>
      </Card>

      {/* Email preferences */}
      <Card variant="soft">
        <CardLabel className="mb-2">Emails</CardLabel>
        <p className="text-caption text-ink-2 mb-3 leading-relaxed">
          Account, billing and security emails always send. You can turn optional product and
          marketing mail off.
        </p>
        <label className="flex items-start gap-2 text-body-sm text-ink mb-2">
          <input
            type="checkbox"
            className="mt-1"
            checked={notifyProductEmail}
            disabled={prefBusy}
            onChange={(e) => void savePrefs({ notifyProductEmail: e.target.checked })}
          />
          Product emails (weekly report ready, similar alerts)
        </label>
        <label className="flex items-start gap-2 text-body-sm text-ink">
          <input
            type="checkbox"
            className="mt-1"
            checked={notifyMarketingEmail}
            disabled={prefBusy}
            onChange={(e) => void savePrefs({ notifyMarketingEmail: e.target.checked })}
          />
          Marketing and offers
        </label>
      </Card>

      {/* Data & privacy */}
      <Card variant="soft">
        <div className="flex items-center gap-2 mb-3">
          <IconBadge icon={ShieldCheck} tone="sage" size="sm" />
          <CardLabel className="mb-0">Data & privacy (UAE PDPL)</CardLabel>
        </div>
        <p className="text-body-sm text-ink-2 mb-4 leading-relaxed">
          Under UAE Federal Decree-Law No. 45 of 2021 (PDPL), you have the right to access,
          export, correct and delete your personal data at any time. Withdrawing service
          consent ends the account (use Delete). Marketing can be turned off above.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="subtle" size="sm" onClick={handleExport}>
            <Download className="w-3.5 h-3.5" /> Export my data
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className="text-rose hover:bg-rose-tint hover:border-rose"
            onClick={handleDeleteAccount}
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete account
          </Button>
        </div>
      </Card>
    </div>
  )
}
