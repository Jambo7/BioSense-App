import { NextResponse } from 'next/server'
import { OPS_COOKIE, opsSecretConfigured, opsSecretMatches } from '@/lib/ops-auth'

export async function POST(req: Request) {
  if (!opsSecretConfigured()) {
    return NextResponse.json({ error: 'Ops access is not configured' }, { status: 404 })
  }
  const body = (await req.json().catch(() => ({}))) as { secret?: string }
  if (!opsSecretMatches(body.secret ?? '')) {
    return NextResponse.json({ error: 'Wrong secret' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(OPS_COOKIE, body.secret!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  })
  return res
}
