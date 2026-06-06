'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Droplets,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardLabel } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/icon-badge'
import { Pill } from '@/components/ui/pill'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const ACCEPT = '.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png'

function isImage(f: File) {
  return f.type.startsWith('image/') || /\.(jpe?g|png)$/i.test(f.name)
}

export default function BloodUploadPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [drawDate, setDrawDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [policyOpen, setPolicyOpen] = useState(false)
  const [policyAccepted, setPolicyAccepted] = useState(false)

  function addFiles(incoming: FileList | File[]) {
    const list = Array.from(incoming).filter(
      (f) => f.type === 'application/pdf' || f.name.endsWith('.pdf') || isImage(f),
    )
    if (list.length === 0) {
      toast.error('Please upload PDF or JPG/PNG images')
      return
    }
    setFiles((prev) => {
      const merged = [...prev, ...list]
      return merged.slice(0, 10)
    })
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragActive(false)
    addFiles(e.dataTransfer.files)
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  async function handleUpload() {
    if (!files.length) return toast.error('Please select at least one file')
    if (!policyAccepted) {
      setPolicyOpen(true)
      return
    }
    await doUpload()
  }

  async function doUpload() {
    setLoading(true)
    const fd = new FormData()
    files.forEach((f) => fd.append('files', f))
    fd.append('drawDate', drawDate)

    try {
      const res = await fetch('/api/blood', { method: 'POST', body: fd })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Upload failed')
        return
      }

      toast.success(`Analysis complete — ${data.markerCount} biomarkers extracted`)
      router.push('/blood')
    } catch {
      toast.error('Upload failed. Please try again.')
    } finally {
      setLoading(false)
      setPolicyOpen(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto fade-up space-y-5">
      <Link
        href="/blood"
        className="inline-flex items-center gap-1 text-caption text-ink-3 hover:text-ink-2 transition-colors"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to Biomarkers
      </Link>

      <header className="flex items-start gap-4">
        <IconBadge icon={Droplets} size="xl" tone="rose" />
        <div className="flex-1">
          <div className="text-eyebrow uppercase text-sage-deep mb-1">Upload</div>
          <h1 className="font-sans text-h1 text-ink tracking-tight leading-[1.1]">
            New <span className="italic-accent">lab result.</span>
          </h1>
          <p className="text-body-sm text-ink-2 mt-2 leading-relaxed max-w-[58ch]">
            Upload a PDF or multiple JPG screenshots. BioSense extracts your biomarkers,
            classifies them and tracks trends over time.
          </p>
        </div>
      </header>

      <div className="flex items-start gap-2.5 rounded-card px-4 py-3 bg-amber-tint border border-[rgba(217,160,91,0.25)]">
        <AlertTriangle className="w-4 h-4 text-amber mt-0.5 shrink-0" />
        <p className="text-caption text-ink-2 leading-relaxed">
          <span className="text-ink font-semibold">Educational only.</span>{' '}
          AI-generated interpretations are not medical advice. Always consult a
          healthcare professional before acting on insights.
        </p>
      </div>

      <Card padding="lg">
        <CardLabel>Upload files</CardLabel>

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
            files.length
              ? 'border-accent-ring bg-sage-wash'
              : dragActive
                ? 'border-sage bg-sage-wash'
                : 'border-line-2 bg-off-white hover:border-sage hover:bg-sage-wash',
          )}
        >
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPT}
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files)
              e.target.value = ''
            }}
          />

          {files.length > 0 ? (
            <div className="flex flex-col items-center gap-3">
              <IconBadge icon={FileText} size="xl" tone="sage" />
              <div className="text-h3 text-ink">{files.length} file{files.length === 1 ? '' : 's'} selected</div>
              <div className="text-caption text-ink-2">Click to add more</div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <IconBadge icon={Upload} size="xl" tone="sand" />
              <div>
                <div className="text-h3 text-ink mb-1">Drop files here</div>
                <div className="text-caption text-ink-2">
                  PDF or JPG screenshots · up to 10 files · max 10MB each
                </div>
              </div>
              <Pill tone="ink" size="sm">or click to browse</Pill>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((f, i) => (
              <div key={`${f.name}-${i}`} className="flex items-center gap-3 p-2.5 rounded-card tile">
                <IconBadge icon={isImage(f) ? ImageIcon : FileText} tone="sage" variant="tint" size="sm" />
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-[12.5px] font-medium text-ink truncate">{f.name}</div>
                  <div className="text-[10.5px] text-ink-3">{(f.size / 1024).toFixed(0)} KB</div>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-ink-3 hover:text-[#A85454]"
                  aria-label="Remove file"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2.25} />
                </button>
              </div>
            ))}
          </div>
        )}

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
          disabled={!files.length}
          onClick={handleUpload}
          fullWidth
          className="mt-6"
        >
          {loading ? 'Analysing…' : 'Upload & analyse'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>

      {policyOpen && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setPolicyOpen(false)}
            className="fixed inset-0 z-50 bg-[rgba(26,28,26,0.35)] backdrop-blur-[2px] cursor-default"
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-50 rounded-card bg-white shadow-float ring-1 ring-inset ring-[rgba(184,168,144,0.22)] p-5">
            <CardLabel className="mb-2">Policy acceptance</CardLabel>
            <p className="text-caption text-ink-2 leading-relaxed mb-4">
              By uploading blood test results, you confirm that the data is yours (or you have
              permission to use it), and you understand that BioSense provides educational
              insights only — not medical diagnosis or treatment advice.
            </p>
            <label className="flex items-start gap-2.5 mb-5 cursor-pointer">
              <input
                type="checkbox"
                checked={policyAccepted}
                onChange={(e) => setPolicyAccepted(e.target.checked)}
                className="mt-0.5 accent-sage-deep"
              />
              <span className="text-[12.5px] text-ink-2 leading-snug">
                I accept the upload policy and understand this is not medical advice.
              </span>
            </label>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="md"
                fullWidth
                disabled={!policyAccepted}
                loading={loading}
                onClick={doUpload}
              >
                Accept & upload
              </Button>
              <Button variant="ghost" size="md" onClick={() => setPolicyOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
