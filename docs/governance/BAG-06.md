# BAG-06 — Biological Age (launch approval)

**Status:** APPROVED  
**Approved:** 3 September 2026 (Neil)  
**Closes** the outstanding BAG-06 Board / Scientific Governance item for commercial launch.

## Decision

Biological Age is a **wellness estimate**, not a clinical, diagnostic or medical age assessment.

Launch calculation may use BioSense inputs including HRV, resting heart rate, VO₂ / cardiorespiratory fitness, and sleep.

## Required product behaviour

- Presented as an **estimate**
- Not represented as a clinical test, diagnosis, or medical assessment
- Must not claim to determine a user’s true physiological or clinical age
- Must communicate that it is derived from available health and wearable signals
- Subject to normal BioSense AI, evidence, wellness-language and safety controls
- Marketing must not materially overstate scientific certainty

## Relationship to GSC-002

GSC-002 remains the **target-state methodology**. Launch uses the interim engine in `lib/bio-age.ts` under this BAG-06 framing. Full GSC-002 composition still waits on GSC-003 / 004 / 008 / 009.

Code constant: `lib/bag-06.ts`.
