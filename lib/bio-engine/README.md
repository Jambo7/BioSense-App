# BIO-001 — Generic Biomarker Engine

Reference implementation of the BioSense Blood Analysis Engine (BIO-001 spec).
The engine is **generic**: it is built once, and each biomarker is added as
configuration, never new engine code (spec HANDOVER §H). ApoB is the first
tenant.

## The one rule that shapes everything

> Clinical meaning is computed **deterministically from versioned scientific
> data first**. The AI layer runs **last** and only renders the already-decided
> result. It never sees raw values and can never override a decision (PI-4).

This is the opposite of a "let the model read the report and explain it"
approach, and it is the core safety property of the product.

## Pipeline

```
RawResult ──ingest()──▶ CanonicalObservation ──interpret()──▶ OutputPayload
                                                                   │
                                              ┌────────────────────┘
                                              ▼
                          narrative contract (required/forbidden tokens)
                                              │
                                     AI renderer (renders only)
                                              │
                              validateNarrative() ── SAFETY fail ─▶ deterministicTemplate()
                                              ▼
                                     always-safe user output
```

`interpret()` runs four fixed gates in order (PI-3):

1. **Validity** — interference/sample-suspect values are not interpreted at any
   confidence, never corrected (Ch.7).
2. **Interpretability** — eligibility: in-scope population, unit resolved, status
   not cancelled, **and thresholds anchored**. Failure → first-class abstention;
   non-interpretive safety pathways still run (DR-10.2-B).
3. **Confidence** — `HIGH`/`REDUCED` from explicit reducers; `NOT_ASSESSABLE`
   for states that never reach this gate (Appendix C-4).
4. **Assembly** — band, gap, score, discordance, flags, trend, narrative gates.

## PI-5: nothing is guessed

Every scientific value is a **CSL claim** (`./csl-data`). Until a claim is
anchored (value supplied + `review_status: ANCHORED` + provenance), the engine
leaves its feature **disabled** — it records the value and abstains. This is why
ApoB currently ships with banding, scoring, discordance, trend-significance and
the FH pathway off. Anchoring a claim turns its feature on with **zero code
change**. See `./csl-data/README.md`.

## Files

| File | Role |
|---|---|
| `types.ts` | Generic contracts + enums (no biomarker prefix, PI-2). |
| `csl.ts` + `csl-data/` | Canonical Scientific Library; constant resolution (PI-5). |
| `config.ts` | `BiomarkerConfig` contract + tenant registry. |
| `apob-config.ts` | ApoB tenant config (constants by claim-id; structural nulls). |
| `ingest.ts` | Raw → `CanonicalObservation`; trust from origin (PI-1); no unit guessing. |
| `confidence.ts` | Gate-3 reducer composition. |
| `engine.ts` | Four-gate state machine; `interpret()`, `abstain()`; Gate-4 assembly. |
| `interpretation.ts` | Gate 4a–4c: stratum/therapy, banding, gap, continuous score. |
| `concordance.ts` | Gate 4d: the five concordance states (Ch.4 / Appendix C-2). |
| `recommendations.ts` | Gate 4f: allowlist, ladder, consolidation, routing (Ch.12). |
| `trend.ts` | Gate 4g: the ordered five-class suppression gauntlet (Ch.8). |
| `safety.ts` | Two-sided narrative validation; deterministic safe templates. |
| `tests/safety-suite.ts` | Standing CI safety suite. `npm run test:engine`. |
| `index.ts` | Public API. |

## Tests

`npm run test:engine` runs the standing safety suite. It is **append-only**:
cases are added, never removed or weakened, because each one asserts a frozen
rule from the spec. It covers both the current unanchored ship state and — by
registering a test claim source — proves each feature activates correctly once
anchored.

## Status vs spec

**Built:** platform invariants as types; ingestion contract; the four-state
machine; the confidence engine; the CSL anchoring layer with enforced audit
fields; structural nulls; the ApoB config; the full Gate-4 assembly (stratum and
therapy resolution, banding, gap-to-target, the continuous monotonic score,
concordance/discordance, flags, the recommendation engine, and the trend
suppression gauntlet); narrative-contract assembly; the standing safety suite.

**Not yet built:** DB persistence of observations with the versioned supersession
model, the AI renderer integration (and replacing the current upload flow's
AI-interprets behaviour with render-only), the semantic half of the narrative
validator, and wiring the engine into the live blood-upload route.

None of the remaining work is blocked by missing science. Every scientific value
it needs is already declared as a CSL claim and its feature stays disabled until
anchored.
