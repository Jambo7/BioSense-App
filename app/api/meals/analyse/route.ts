import { NextRequest, NextResponse } from 'next/server'
import { getRequestUser } from '@/lib/api-auth'
import { hitRateLimit, clientIp } from '@/lib/rate-limit'
import { analyseMealPhoto } from '@/lib/meals'

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/jpg'])

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
  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Please add a photo of the meal.' }, { status: 400 })
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'Photo must be under 8MB.' }, { status: 400 })
  }

  const mime = file.type || 'image/jpeg'
  if (!IMAGE_TYPES.has(mime) && !/\.(jpe?g|png|webp)$/i.test(file.name)) {
    return NextResponse.json(
      { error: 'Please use a JPG or PNG photo of the plate.' },
      { status: 400 },
    )
  }

  const note = typeof form.get('note') === 'string' ? String(form.get('note')) : ''

  try {
    const analysis = await analyseMealPhoto({
      buffer: Buffer.from(await file.arrayBuffer()),
      mime,
      note,
    })
    return NextResponse.json(analysis)
  } catch (err) {
    console.error('Meal photo analysis failed:', err)
    return NextResponse.json(
      { error: 'Could not read that photo just now. Please try again.' },
      { status: 502 },
    )
  }
}
