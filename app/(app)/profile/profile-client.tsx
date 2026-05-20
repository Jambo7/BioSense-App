'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  User,
  Target,
  HeartPulse,
  ShieldCheck,
  Download,
  Trash2,
  Pencil,
  Check,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'

const GOAL_OPTIONS = [
  { value: 'PERFORMANCE', label: 'Performance' },
  { value: 'HEALTH',      label: 'Longevity & Health' },
  { value: 'BODY_COMP',   label: 'Body Composition' },
  { value: 'WELLBEING',   label: 'Wellbeing' },
]

interface ProfileData {
  id: string
  name: string | null
  email: string
  age: number | null
  goalType: string | null
  goalText: string | null
  goalDeadline: string | null
  allergies: string[]
  conditions: string[]
  lifestyle: string | null
  subscriptionStatus: string
  createdAt: string
}

export function ProfileClient({ user }: { user: ProfileData }) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: user.name ?? '',
    age: user.age?.toString() ?? '',
    goalType: user.goalType ?? 'HEALTH',
    goalText: user.goalText ?? '',
    goalDeadline: user.goalDeadline ?? '',
    allergies: user.allergies.join(', '),
    conditions: user.conditions.join(', '),
    lifestyle: user.lifestyle ?? '',
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
          goalType: form.goalType,
          goalText: form.goalText,
          goalDeadline: form.goalDeadline || null,
          allergies: form.allergies.split(',').map((s) => s.trim()).filter(Boolean),
          conditions: form.conditions.split(',').map((s) => s.trim()).filter(Boolean),
          lifestyle: form.lifestyle,
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
    if (!window.confirm('Permanently delete your account and all data? This cannot be undone.'))
      return
    const res = await fetch('/api/account', { method: 'DELETE' })
    if (res.ok) window.location.href = '/login'
    else toast.error('Failed to delete account')
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
      </Card>

      {/* Goal */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <IconBadge icon={Target} tone="amber" size="sm" />
          <CardLabel className="mb-0">Your goal</CardLabel>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-eyebrow uppercase text-ink-3 mb-2">Goal type</label>
            <select
              value={form.goalType}
              onChange={(e) => setForm({ ...form, goalType: e.target.value })}
              disabled={!editing}
              className="w-full px-4 h-11 bg-white border border-line rounded-[10px] text-ink text-[14px] outline-none focus:border-[var(--a-ring)] focus:ring-2 focus:ring-[rgba(111,143,107,0.10)] disabled:opacity-60"
            >
              {GOAL_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <Textarea
            label="Goal description"
            rows={2}
            value={form.goalText}
            onChange={(e) => setForm({ ...form, goalText: e.target.value })}
            disabled={!editing}
          />
          <Input
            label="Target date"
            type="date"
            value={form.goalDeadline}
            onChange={(e) => setForm({ ...form, goalDeadline: e.target.value })}
            disabled={!editing}
          />
        </div>
      </Card>

      {/* Health context */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <IconBadge icon={HeartPulse} tone="rose" size="sm" />
          <CardLabel className="mb-0">Health context</CardLabel>
        </div>
        <div className="space-y-4">
          <Input
            label="Dietary restrictions / allergies"
            value={form.allergies}
            onChange={(e) => setForm({ ...form, allergies: e.target.value })}
            disabled={!editing}
            placeholder="Comma-separated"
          />
          <Input
            label="Conditions / family history"
            value={form.conditions}
            onChange={(e) => setForm({ ...form, conditions: e.target.value })}
            disabled={!editing}
            placeholder="Comma-separated"
          />
          <Input
            label="Lifestyle notes"
            value={form.lifestyle}
            onChange={(e) => setForm({ ...form, lifestyle: e.target.value })}
            disabled={!editing}
          />
        </div>
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

      {/* Data & privacy */}
      <Card variant="soft">
        <div className="flex items-center gap-2 mb-3">
          <IconBadge icon={ShieldCheck} tone="sage" size="sm" />
          <CardLabel className="mb-0">Data & privacy (UAE PDPL)</CardLabel>
        </div>
        <p className="text-body-sm text-ink-2 mb-4 leading-relaxed">
          Under UAE Federal Decree-Law No. 45 of 2021 (PDPL), you have the right to access,
          export, correct and delete your personal data at any time.
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
