import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getRequestUser } from '@/lib/api-auth'
import { callClaude, BLOOD_ANALYSIS_PROMPT } from '@/lib/claude'
import { categoryForMarker } from '@/lib/biomarkers'
import OpenAI from 'openai'

async function parsePdf(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse')
  const result = await pdfParse(buffer)
  return result.text
}

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/') || /\.(jpe?g|png)$/i.test(file.name)
}

async function analyseImage(buffer: Buffer, mime: string): Promise<string> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? 'placeholder' })
  const b64 = buffer.toString('base64')
  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o',
    max_tokens: 2000,
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

      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const pdfText = await parsePdf(buffer)
        if (pdfText?.trim()) combinedText += `\n${pdfText}`
      } else if (isImageFile(file)) {
        const mime = file.type || 'image/jpeg'
        const resp = await analyseImage(buffer, mime)
        imageResponses.push(resp)
      } else {
        return NextResponse.json({ error: `${file.name}: must be PDF or JPG/PNG` }, { status: 400 })
      }
    }

    let aiResponse = ''
    if (combinedText.trim().length >= 50) {
      aiResponse = await callClaude(
        BLOOD_ANALYSIS_PROMPT,
        `Analyse this blood test result and extract all biomarkers:\n\n${combinedText.slice(0, 8000)}`,
        2000,
      )
    } else if (imageResponses.length > 0) {
      aiResponse = imageResponses.join('\n')
    } else {
      return NextResponse.json(
        { error: 'Could not extract text from files. Ensure PDFs are text-based or images are clear.' },
        { status: 422 },
      )
    }

    let markers: object[] = []
    let aiSummary = ''
    let t1Count = 0
    let t2Count = 0
    let t3Count = 0

    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        markers = enrichMarkers(parsed.markers ?? [])
        aiSummary = parsed.summary ?? ''
        t1Count = parsed.t1Count ?? 0
        t2Count = parsed.t2Count ?? 0
        t3Count = parsed.t3Count ?? 0
      }
    } catch {
      aiSummary = aiResponse
    }

    const blood = await prisma.bloodResult.create({
      data: {
        userId: authed.id,
        drawDate: drawDate ? new Date(drawDate) : new Date(),
        markers,
        pdfUrl: null,
        aiSummary,
      },
    })

    if (markers.length > 0) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const latestCheckin = await prisma.dailyCheckin.findFirst({
        where: { userId: authed.id },
        orderBy: { date: 'desc' },
      })

      const { calcHealthScore } = await import('@/lib/score')
      const { score, breakdown } = calcHealthScore({
        checkin: latestCheckin
          ? {
              energy: latestCheckin.energy,
              sleep: latestCheckin.sleep,
              mood: latestCheckin.mood,
              stress: latestCheckin.stress,
            }
          : undefined,
        blood: { t1Count, t2Count, t3Count },
      })

      await prisma.healthScore.upsert({
        where: { userId_date: { userId: authed.id, date: today } },
        create: {
          userId: authed.id,
          date: today,
          score,
          breakdown: breakdown as unknown as import('@prisma/client').Prisma.InputJsonValue,
        },
        update: {
          score,
          breakdown: breakdown as unknown as import('@prisma/client').Prisma.InputJsonValue,
        },
      })
    }

    return NextResponse.json({
      success: true,
      bloodId: blood.id,
      markerCount: markers.length,
      t1Count,
      t2Count,
      t3Count,
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
