import { NextRequest, NextResponse } from 'next/server'
import { getRequestUser } from '@/lib/api-auth'
import { hitRateLimit, clientIp } from '@/lib/rate-limit'
import { analyseMealPhotos } from '@/lib/meals'

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/jpg'])
const MAX_FILES = 6

function isAllowedImage(file: File): boolean {
  const mime = file.type || 'image/jpeg'
  return IMAGE_TYPES.has(mime) || /\.(jpe?g|png|webp)$/i.test(file.name)
}

export async function POST(req: NextRequest) {
  const authed = await getRequestUser(req)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const limited = await hitRateLimit({
    key: `meal-photo:${authed.id}:${clientIp(req)}`,
    limit: 20,
    windowMs: 60 * 60 * 1000,
  })
  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Too many meal photos this hour. Try again a little later.' },
      { status: 429 },
    )
  }

  const form = await req.formData()
  const mode = form.get('mode') === 'ingredients' ? 'ingredients' : 'plate'
  const files: File[] = []
  for (const value of form.getAll('files')) {
    if (value instanceof File) files.push(value)
  }
  const single = form.get('file')
  if (single instanceof File) files.push(single)

  if (files.length === 0) {
    return NextResponse.json({ error: 'Please add a photo of the meal or an ingredient.' }, { status: 400 })
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: 'You can add up to 6 ingredient photos.' }, { status: 400 })
  }

  const notes = form.getAll('notes').map((value) => (typeof value === 'string' ? value : ''))
  while (notes.length < files.length) notes.push('')

  const images: { buffer: Buffer; mime: string }[] = []
  for (const file of files) {
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: `${file.name || 'A photo'} must be under 8MB.` }, { status: 400 })
    }
    if (!isAllowedImage(file)) {
      return NextResponse.json(
        { error: 'Please use JPG or PNG photos of the plate or pack.' },
        { status: 400 },
      )
    }
    images.push({
      buffer: Buffer.from(await file.arrayBuffer()),
      mime: file.type || 'image/jpeg',
    })
  }

  try {
    const analysis = await analyseMealPhotos({ mode, images, notes })
    return NextResponse.json(analysis)
  } catch (err) {
    console.error('Meal photo analysis failed:', err)
    return NextResponse.json(
      { error: 'Could not read those photos just now. Please try again.' },
      { status: 502 },
    )
  }
}
