'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Upload,
  FileText,
  Droplets,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function BloodUploadPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [drawDate, setDrawDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragActive(false)
    const f = e.dataTransfer.files[0]
    if (f?.type === 'application/pdf') setFile(f)
    else toast.error('Please drop a PDF file')
  }

  async function handleUpload() {
    if (!file) return toast.error('Please select a PDF file')
    setLoading(true)

    const fd = new FormData()
    fd.append('file', file)
    fd.append('drawDate', drawDate)

    try {
      const res = await fetch('/api/blood', { method: 'POST', body: fd })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Upload failed')
        return
      }

      toast.success(`Analysis complete — ${data.markerCount} biomarkers extracted`)
      // After a successful upload, return to the Insights hub so the user
      // sees the freshly-updated chart and tier breakdown.
      router.push('/blood')
    } catch {
      toast.error('Upload failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto fade-up space-y-5">
      {/* Back link */}
      <Link
        href="/blood"
        className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2 transition-colors"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to Insights
      </Link>

      {/* Page header */}
      <header className="flex items-start gap-4">
        <IconBadge icon={Droplets} size="xl" tone="rose" />
        <div className="flex-1">
          <div className="text-eyebrow uppercase text-sage-deep mb-1">Upload</div>
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1]">
            New <span className="italic-accent">lab result.</span>
          </h1>
          <p className="text-body-sm text-ink-2 mt-2 leading-relaxed max-w-[58ch]">
            Drop any blood test PDF. BioSense extracts your biomarkers, classifies them
            and tracks trends over time.
          </p>
        </div>
      </header>

      {/* Disclaimer chip */}
      <div className="flex items-start gap-2.5 rounded-card px-4 py-3 bg-amber-tint border border-[rgba(217,160,91,0.25)]">
        <AlertTriangle className="w-4 h-4 text-amber mt-0.5 shrink-0" />
        <p className="text-caption text-ink-2 leading-relaxed">
          <span className="text-ink font-semibold">Educational only.</span>{' '}
          AI-generated interpretations are not medical advice. Always consult a
          healthcare professional before acting on insights.
        </p>
      </div>

      <Card padding="lg">
        <CardLabel>Upload PDF</CardLabel>

        <div
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-card p-10 text-center cursor-pointer transition-all',
            file
              ? 'border-accent-ring bg-sage-wash'
              : dragActive
                ? 'border-sage bg-sage-wash'
                : 'border-line-2 bg-off-white hover:border-sage hover:bg-sage-wash',
          )}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />

          {file ? (
            <div className="flex flex-col items-center gap-3">
              <IconBadge icon={FileText} size="xl" tone="sage" />
              <div className="text-h3 text-ink">{file.name}</div>
              <div className="text-caption text-ink-2">
                {(file.size / 1024).toFixed(0)} KB · click to change
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <IconBadge icon={Upload} size="xl" tone="sand" />
              <div>
                <div className="text-h3 text-ink mb-1">Drop your PDF here</div>
                <div className="text-caption text-ink-2">
                  Any lab panel · max 10MB · text-based PDF only
                </div>
              </div>
              <Pill tone="ink" size="sm">or click to browse</Pill>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-end gap-3">
          <div className="flex-1">
            <Input
              label="Blood draw date"
              id="drawDate"
              type="date"
              value={drawDate}
              onChange={(e) => setDrawDate(e.target.value)}
            />
          </div>
          <Pill tone="soft-sage" size="md" className="mb-1">
            <CalendarDays className="w-3 h-3" />
            {new Date(drawDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })}
          </Pill>
        </div>

        <Button
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!file}
          onClick={handleUpload}
          fullWidth
          className="mt-6"
        >
          {loading ? 'Analysing…' : 'Upload & analyse'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  )
}
