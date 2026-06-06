'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { ChevronLeft, Trash2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardLabel } from '@/components/ui/card'
import { ScoreRing } from '@/components/ui/score-ring'

type Goal = {
  id: string
  title: string
  description: string | null
  pillars: string | null
  targetDate: string | null
  progress: number
  status: string
}

export default function GoalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [goal, setGoal] = useState<Goal | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [pillars, setPillars] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/goals/${id}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setGoal(data.goal)
        setTitle(data.goal.title)
        setDescription(data.goal.description ?? '')
        setPillars(data.goal.pillars ?? '')
      } catch {
        toast.error('Goal not found')
        router.push('/reports')
      } finally {
        setLoading(false)
      }
    })()
  }, [id, router])

  async function save() {
    setSaving(true)
    try {
      const res = await fetch(`/api/goals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, pillars }),
      })
      if (!res.ok) throw new Error()
      toast.success('Goal updated')
    } catch {
      toast.error('Could not save')
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (!confirm('Delete this goal?')) return
    try {
      const res = await fetch(`/api/goals/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Goal deleted')
      router.push('/reports')
    } catch {
      toast.error('Could not delete')
    }
  }

  if (loading || !goal) {
    return <p className="text-caption text-ink-3 text-center py-16">Loading goal…</p>
  }

  return (
    <div className="max-w-xl mx-auto fade-up space-y-5">
      <Link href="/reports" className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2">
        <ChevronLeft className="w-3.5 h-3.5" /> Back to Trends
      </Link>

      <div className="flex items-start gap-4">
        <ScoreRing value={goal.progress} size={80} thickness={7} tone="sage" centerSize={24} />
        <div>
          <CardLabel className="mb-0.5">{goal.status}</CardLabel>
          <h1 className="font-sans text-h2 text-ink tracking-tight">{goal.title}</h1>
          {goal.pillars && (
            <p className="text-caption text-ink-3 mt-1">{goal.pillars}</p>
          )}
        </div>
      </div>

      <Card padding="lg">
        <CardLabel className="mb-3">Edit goal</CardLabel>
        <div className="space-y-4">
          <Input label="Title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div>
            <label htmlFor="desc" className="text-caption font-medium text-ink-2 mb-1.5 block">Description</label>
            <textarea
              id="desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-card bg-white ring-1 ring-line p-3 text-[13px] text-ink outline-none focus:ring-2 focus:ring-[rgba(111,143,107,0.45)]"
            />
          </div>
          <Input label="Focus areas" id="pillars" value={pillars} onChange={(e) => setPillars(e.target.value)} />
        </div>
        <div className="flex gap-2 mt-6">
          <Button variant="primary" size="md" loading={saving} onClick={save}>
            <Save className="w-4 h-4" /> Save
          </Button>
          <Button variant="ghost" size="md" onClick={remove}>
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </Card>

      <Card padding="md" variant="soft">
        <CardLabel className="mb-2">Data helping this goal</CardLabel>
        <ul className="text-caption text-ink-2 space-y-1.5 leading-snug">
          <li>Daily check-ins — energy, sleep, mood and stress</li>
          <li>Wearable sync — recovery, activity and sleep patterns</li>
          <li>Learning Mode — lifestyle context and priorities</li>
          <li>Blood results — biomarker trends where relevant</li>
        </ul>
      </Card>
    </div>
  )
}
