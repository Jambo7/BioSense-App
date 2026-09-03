/**
 * BAG-06 — Biological Age (launch).
 * Approved by Neil 3 Sep 2026. Wellness estimate only — not GSC-002 full engine.
 */
export const BAG_06 = {
  id: 'BAG-06',
  status: 'APPROVED' as const,
  approvedAt: '2026-09-03',
  productClass: 'wellness_estimate',
  userLabel: 'Biological age estimate',
  disclaimer:
    'A wellness estimate from your available health and wearable signals (such as HRV, resting heart rate, fitness and sleep). Not a clinical test, diagnosis, or medical age assessment.',
} as const
