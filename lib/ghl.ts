/**
 * GoHighLevel contact sync.
 * Sends name, email, country, and audience tags. Never health content.
 * Tags we own start with "bs-". Tags added by hand in the CRM are left alone.
 */
import { loadOpsConsole, type OpsMember } from '@/lib/ops-console'

const API = 'https://services.leadconnectorhq.com'
const TAG_PREFIX = 'bs-'

export function ghlConfigured(): boolean {
  return Boolean(process.env.GHL_TOKEN && process.env.GHL_LOCATION_ID)
}

export function tagsForMember(member: OpsMember): string[] {
  const fromSegments = member.segments.map((id) => `${TAG_PREFIX}${id.replace(/_/g, '-')}`)
  return [`${TAG_PREFIX}member`, ...fromSegments]
}

function splitName(name: string | null): { firstName?: string; lastName?: string } {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return {}
  if (parts.length === 1) return { firstName: parts[0] }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

async function ghl(path: string, method: string, body?: unknown): Promise<Record<string, unknown>> {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.GHL_TOKEN}`,
      Version: '2021-07-28',
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`GHL ${method} ${path} ${res.status} ${text.slice(0, 180)}`)
  }
  if (!text) return {}
  return JSON.parse(text) as Record<string, unknown>
}

async function pushMember(member: OpsMember): Promise<void> {
  const names = splitName(member.name)
  const upserted = await ghl('/contacts/upsert', 'POST', {
    locationId: process.env.GHL_LOCATION_ID,
    email: member.email,
    ...names,
    ...(member.name ? { name: member.name } : {}),
    ...(member.country ? { country: member.country } : {}),
    source: 'BioSense',
  })
  const contact = upserted.contact as { id?: string; tags?: string[] } | undefined
  const contactId = contact?.id
  if (!contactId) throw new Error('GHL upsert returned no contact id')

  const current = Array.isArray(contact?.tags) ? contact.tags : []
  const want = new Set(tagsForMember(member))
  const managed = current.filter((tag) => tag.startsWith(TAG_PREFIX))
  const remove = managed.filter((tag) => !want.has(tag))
  const add = [...want].filter((tag) => !current.includes(tag))
  if (add.length > 0) await ghl(`/contacts/${contactId}/tags`, 'POST', { tags: add })
  if (remove.length > 0) await ghl(`/contacts/${contactId}/tags`, 'DELETE', { tags: remove })
}

export async function syncUserToGhl(userId: string): Promise<'synced' | 'skipped' | 'missing'> {
  if (!ghlConfigured()) return 'skipped'
  const { members } = await loadOpsConsole(userId)
  const member = members[0]
  if (!member) return 'missing'
  await pushMember(member)
  return 'synced'
}

export function queueGhlSync(userId: string): void {
  if (!ghlConfigured()) return
  void syncUserToGhl(userId).catch((err) => {
    const message = err instanceof Error ? err.message : 'sync failed'
    console.error('[ghl]', userId, message)
  })
}

export async function syncAllToGhl(): Promise<{ skipped: boolean; synced: number; failed: number }> {
  if (!ghlConfigured()) return { skipped: true, synced: 0, failed: 0 }
  const { members } = await loadOpsConsole()
  let synced = 0
  let failed = 0
  for (const member of members) {
    try {
      await pushMember(member)
      synced += 1
    } catch (err) {
      failed += 1
      const message = err instanceof Error ? err.message : 'sync failed'
      console.error('[ghl]', member.id, message)
    }
  }
  return { skipped: false, synced, failed }
}

/** Remove the CRM contact when the BioSense account is deleted. */
export async function removeGhlContact(email: string): Promise<'ok' | 'skipped' | 'missing' | 'failed'> {
  if (!ghlConfigured()) return 'skipped'
  try {
    const locationId = process.env.GHL_LOCATION_ID
    const found = await ghl(
      `/contacts/search/duplicate?locationId=${encodeURIComponent(locationId ?? '')}&email=${encodeURIComponent(email)}`,
      'GET',
    )
    const contact = found.contact as { id?: string } | undefined
    const contactId = contact?.id
    if (!contactId) return 'missing'
    await ghl(`/contacts/${contactId}`, 'DELETE')
    return 'ok'
  } catch (err) {
    const message = err instanceof Error ? err.message : 'delete failed'
    console.error('[ghl] delete', message)
    return 'failed'
  }
}
