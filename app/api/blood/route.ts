import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { callClaude, BLOOD_ANALYSIS_PROMPT } from '@/lib/claude'
import { categoryForMarker } from '@/lib/biomarkers'
import { recountTiers, sanitizeBloodMarkers, type SanitizedBloodMarker } from '@/lib/blood-sanity'
import { recalculateHealthScore } from '@/lib/health-score'
import { enforceOutputSafety } from '@/lib/safety-gate'
import OpenAI from 'openai'

export const maxDuration = 60

const MAX_PDF_PAGES = 4

type PdfParser = {
  getText: (params?: { pageJoiner?: string }) => Promise<{ text?: string }>
  getScreenshot: (params?: {
    first?: number
    imageBuffer?: boolean
    imageDataUrl?: boolean
    desiredWidth?: number
  }) => Promise<{ pages: Array<{ data?: Uint8Array }> }>
  destroy: () => Promise<void>
}

function openPdf(buffer: Buffer): PdfParser {
  // pdf-parse v2 exports a class. The old function call throws before any reading starts.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PDFParse } = require('pdf-parse') as {
    PDFParse: new (opts: { data: Uint8Array }) => PdfParser
  }
  return new PDFParse({ data: new Uint8Array(buffer) })
}

async function parsePdf(buffer: Buffer): Promise<string> {
  const parser = openPdf(buffer)
  try {
    const result = await parser.getText({ pageJoiner: '\n' })
    return result.text ?? ''
  } finally {
    await parser.destroy().catch(() => {})
  }
}

async function pdfPageImages(buffer: Buffer): Promise<Buffer[]> {
  const parser = openPdf(buffer)
  try {
    const shot = await parser.getScreenshot({
      first: MAX_PDF_PAGES,
      imageBuffer: true,
      imageDataUrl: false,
      desiredWidth: 1400,
    })
    const images: Buffer[] = []
    for (const page of shot.pages) {
      if (page.data && page.data.byteLength > 0) images.push(Buffer.from(page.data))
    }
    return images
  } finally {
    await parser.destroy().catch(() => {})
  }
}

function isPdf(file: File, buffer: Buffer): boolean {
  return (
    file.type === 'application/pdf' ||
    file.name.toLowerCase().endsWith('.pdf') ||
    buffer.subarray(0, 5).toString('utf8') === '%PDF-'
  )
}

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/') || /\.(jpe?g|png)$/i.test(file.name)
}

function parseDrawDate(drawDate: string | null): Date {
  if (drawDate && /^\d{4}-\d{2}-\d{2}$/.test(drawDate)) {
    return new Date(`${drawDate}T12:00:00.000Z`)
  }
  return new Date()
}

async function analysePdfDocument(buffer: Buffer): Promise<string> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? 'placeholder' })
  const b64 = buffer.toString('base64')
  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o',
    max_tokens: 2500,
    store: false,
    messages: [
      { role: 'system', content: BLOOD_ANALYSIS_PROMPT },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Extract all biomarker names, values, units and reference ranges from this blood test PDF. Return JSON with a markers array and a summary.',
          },
          {
            type: 'file',
            file: {
              filename: 'lab.pdf',
              file_data: `data:application/pdf;base64,${b64}`,
            },
          },
        ],
      },
    ],
  })
  return res.choices[0]?.message?.content ?? ''
}

async function analyseImage(buffer: Buffer, mime: string): Promise<string> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? 'placeholder' })
  const b64 = buffer.toString('base64')
  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o',
    max_tokens: 2000,
    store: false,
    messages: [
      { role: 'system', content: BLOOD_ANALYSIS_PROMPT },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Extract all biomarker names, values, units and reference ranges from this blood test image. Return JSON with markers array and summary.',
          },
          {
            type: 'image_url',
            image_url: { url: `data:${mime};base64,${b64}` },
          },
        ],
      },
    ],
  })
  return res.choices[0]?.message?.content ?? ''
}

function enrichMarkers(markers: object[]): object[] {
  return markers.map((m) => {
    const marker = m as { name?: string; [key: string]: unknown }
    if (marker.name) {
      return { ...marker, category: categoryForMarker(marker.name) }
    }
    return marker
  })
}

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const drawDate = formData.get('drawDate') as string | null

    const uploaded: File[] = []
    const multi = formData.getAll('files')
    if (multi.length > 0) {
      for (const f of multi) if (f instanceof File) uploaded.push(f)
    }
    const single = formData.get('file')
    if (single instanceof File) uploaded.push(single)

    if (uploaded.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    let combinedText = ''
    const imageResponses: string[] = []

    for (const file of uploaded) {
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: `${file.name} must be under 10MB` }, { status: 400 })
      }

      const buffer = Buffer.from(await file.arrayBuffer())

      if (isPdf(file, buffer)) {
        let pdfText = ''
        try {
          pdfText = await parsePdf(buffer)
        } catch (err) {
          const name = err instanceof Error ? err.name : ''
          if (name === 'PasswordException') {
            return NextResponse.json(
              { error: `${file.name} is password protected. Upload an unlocked PDF or a photo of the pages.` },
              { status: 422 },
            )
          }
          console.error('[blood] pdf text failed:', err)
        }
        if (pdfText.trim().length >= 40) {
          combinedText += `\n${pdfText}`
        } else {
          const pages = await pdfPageImages(buffer).catch((err) => {
            console.error('[blood] pdf screenshot failed:', err)
            return [] as Buffer[]
          })
          if (pages.length > 0) {
            for (const page of pages) {
              imageResponses.push(await analyseImage(page, 'image/png'))
            }
          } else {
            imageResponses.push(await analysePdfDocument(buffer))
          }
        }
      } else if (isImageFile(file)) {
        const mime = file.type || 'image/jpeg'
        imageResponses.push(await analyseImage(buffer, mime))
      } else {
        return NextResponse.json({ error: `${file.name}: must be PDF or JPG/PNG` }, { status: 400 })
      }
    }

    const aiChunks: string[] = []
    if (combinedText.trim().length >= 40) {
      aiChunks.push(
        await callClaude(
          BLOOD_ANALYSIS_PROMPT,
          `Analyse this blood test result and extract all biomarkers:\n\n${combinedText.slice(0, 12000)}`,
          2500,
        ),
      )
    }
    aiChunks.push(...imageResponses.filter((chunk) => chunk.trim().length > 0))

    if (aiChunks.length === 0) {
      return NextResponse.json(
        { error: 'Could not read these files. Use a text PDF, or a clear photo of each page.' },
        { status: 422 },
      )
    }

    const markers: SanitizedBloodMarker[] = []
    const summaries: string[] = []
    let rejectedMarkers = 0

    for (const chunk of aiChunks) {
      const jsonMatch = chunk.match(/\{[\s\S]*\}/)
      if (!jsonMatch) continue
      try {
        const parsed = JSON.parse(jsonMatch[0]) as {
          markers?: object[]
          summary?: string
        }
        const sanitized = sanitizeBloodMarkers(enrichMarkers(parsed.markers ?? []))
        markers.push(...sanitized.markers)
        rejectedMarkers += sanitized.rejected
        if (parsed.summary) summaries.push(enforceOutputSafety(parsed.summary))
      } catch {
        // One bad page should not drop the rest of the panel.
      }
    }

    const tiers = recountTiers(markers)
    const aiSummary = summaries.join(' ')

    if (markers.length === 0) {
      return NextResponse.json(
        {
          error:
            'Could not extract any plausible biomarker values from this upload. Try a clearer PDF or photo.',
          rejectedMarkers,
        },
        { status: 422 },
      )
    }

    const blood = await prisma.bloodResult.create({
      data: {
        userId: authed.id,
        drawDate: parseDrawDate(drawDate),
        markers: JSON.parse(JSON.stringify(markers)),
        pdfUrl: null,
        aiSummary,
      },
    })

    if (markers.length > 0) {
      try {
        await recalculateHealthScore(authed.id)
      } catch (scoreErr) {
        console.error('[blood] health score recalc failed:', scoreErr)
      }
    }

    revalidatePath('/blood')
    revalidatePath('/blood/history')
    revalidatePath('/dashboard')

    return NextResponse.json({
      success: true,
      bloodId: blood.id,
      markerCount: markers.length,
      rejectedMarkers,
      t1Count: tiers.t1Count,
      t2Count: tiers.t2Count,
      t3Count: tiers.t3Count,
      aiSummary,
    })
  } catch (err) {
    console.error('Blood upload error:', err)
    return NextResponse.json({ error: 'Failed to process blood results' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const results = await prisma.bloodResult.findMany({
    where: { userId: authed.id },
    orderBy: { drawDate: 'desc' },
    select: {
      id: true,
      drawDate: true,
      markers: true,
      aiSummary: true,
      createdAt: true,
    },
  })

  return NextResponse.json(results)
}
