'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { ChevronLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardLabel } from '@/components/ui/card'

export default function NewGoalPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [pillars, setPillars] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!title.trim()) return toast.error('Please enter a goal title')
    setLoading(true)
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          pillars: pillars.trim() || undefined,
          targetDate: targetDate || undefined,
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      toast.success('Goal created')
      router.push(`/reports/goals/${data.goal.id}`)
    } catch {
      toast.error('Could not create goal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto fade-up space-y-5">
      <Link href="/reports" className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2">
        <ChevronLeft className="w-3.5 h-3.5" /> Back to Trends
      </Link>

      <header>
        <CardLabel className="mb-1">New goal</CardLabel>
        <h1 className="font-sans text-h1 text-ink tracking-tight">
          What do you want to <span className="italic-accent">achieve?</span>
        </h1>
        <p className="text-body-sm text-ink-2 mt-2">
          Tell BioSense what matters most so we can personalise your insights and track progress.
        </p>
      </header>

      <Card padding="lg">
        <div className="space-y-4">
          <Input
            label="Goal title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Improve sleep consistency"
          />
          <div>
            <label htmlFor="description" className="text-caption font-medium text-ink-2 mb-1.5 block">
              Why does this matter to you?
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A sentence or two about what success looks like…"
              className="w-full rounded-card bg-white ring-1 ring-line p-3 text-[13px] text-ink outline-none focus:ring-2 focus:ring-[rgba(111,143,107,0.45)]"
            />
          </div>
          <Input
            label="Focus areas (optional)"
            id="pillars"
            value={pillars}
            onChange={(e) => setPillars(e.target.value)}
            placeholder="e.g. Sleep · Routine · Recovery"
          />
          <Input
            label="Target date (optional)"
            id="targetDate"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onClick={handleSubmit}
          className="mt-6"
        >
          Create goal <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  )
}
