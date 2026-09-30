import { prisma } from '@/lib/prisma'

export function markerArrayLength(raw: unknown): number {
  return Array.isArray(raw) ? raw.length : 0
}

/** Newest saved panel that actually contains markers. Empty uploads are skipped. */
export async function latestBloodWithMarkers(userId: string) {
  const rows = await prisma.bloodResult.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 12,
  })
  return rows.find((row) => markerArrayLength(row.markers) > 0) ?? null
}
