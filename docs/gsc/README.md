# Global Scientific Configuration (GSC)

Neil’s GSC packs. Architecture + methodologies for Health Score and Biological Age.

| Doc | Role | In repo |
|---|---|---|
| GSC-000 | Architecture | yes |
| GSC-001 | Health Score methodology (form only) | yes |
| GSC-002 | Biological Age methodology (form only) | yes |
| GSC-003 | Confidence calibration | **pending** |
| GSC-004 | Cross-domain weighting | **pending** |
| GSC-008 | Freshness / longitudinal | **pending** |
| GSC-009 | Evidence fusion / conflict | **pending** |

Machine-readable pins: `lib/gsc/`.

**Important:** GSC-001/002 deliberately publish **no numeric weights**. Full replacement of `lib/score.ts` / `lib/bio-age.ts` waits on GSC-003/004/008/009.
