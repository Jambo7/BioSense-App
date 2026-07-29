# Canonical Scientific Library (CSL) — Data & Anchoring Guide

This folder holds the **scientific content** the engine runs on. It is *data, not
code*. Every value the engine uses to make a clinical decision lives here as a
**CSL claim** and is switched off until it is anchored (PI-5).

This is the file BioSense (the founder / clinical owner) fills in. Engineering
does not need to touch it, and no code changes are required when the science
changes — you edit the JSON, the feature turns on.

## How a claim works

Each claim in `apob.json` looks like this while unanchored:

```json
{
  "claim_id": "APOB_LOW_INVESTIGATION_THRESHOLD",
  "assertion": "ApoB value below which the low-ApoB investigation pathway activates.",
  "value": null,
  "unit": "mg/dL",
  "version": "0.0.0",
  "effective_date": null,
  "author": null,
  "provenance": null,
  "evidence_grade": null,
  "review_status": "DECLARED"
}
```

While `review_status` is `DECLARED` (or the value is `null`), the engine leaves
the dependent feature **disabled** — it shows the value and says "can't
interpret this yet". To turn the feature on, anchor the claim:

```json
{
  "claim_id": "APOB_LOW_INVESTIGATION_THRESHOLD",
  "assertion": "ApoB value below which the low-ApoB investigation pathway activates.",
  "value": 40,
  "unit": "mg/dL",
  "version": "1.0.0",
  "effective_date": "2026-08-01",
  "author": "Dr … , BioSense clinical lead",
  "provenance": "Ref: … (guideline / paper / consensus)",
  "evidence_grade": "B",
  "review_status": "ANCHORED"
}
```

The moment that's saved and deployed, the low-ApoB pathway is live. No
engineering ticket, no code review of logic — only a review of the *number and
its provenance*, which is exactly where clinical review belongs.

The five constitutional audit fields (`version`, `effective_date`, `author`,
`provenance`, `review_status`) are **required** for any anchored claim, and this
is *enforced*: a claim that says `ANCHORED` but is missing an author, provenance,
effective date or a real version number is refused at load, demoted back to
`DECLARED`, and recorded in the library audit. Its feature stays off. A claim
marked `ANCHORED` with a null value likewise stays disabled by design.

### One extra claim the spec implies but doesn't name

`APOB_SCORE_GAP_SCALE` — the gap-to-target at which the score contribution
reaches zero. Amendment A-001 replaced the band-keyed score with a *continuous*
function of gap-to-target, and a continuous function needs a scale. Rather than
invent a number, it is declared here like any other scientific value, so the
score contribution stays disabled until it is anchored.

## Mapping to Neil's five deliverables

Neil's email lists five deliverables. They are exactly the CSL content, expressed
as claims:

| Neil's deliverable | Where it lands here |
|---|---|
| **1. Canonical Scientific Library v1** | One claim per biomarker interpretation fact. `BIOSENSE_APOB_THRESHOLD_SET` is the ApoB banding entry; each new biomarker adds its own claims file (e.g. `ferritin.json`). |
| **2. Safety Rule Set v1** | The two lexicon claims (`BIOSENSE_PROHIBITED_CONDITION_LEXICON`, `BIOSENSE_LIPID_DRUG_LEXICON`) plus threshold-driven escalation claims (`APOB_FH_PATTERN_THRESHOLD`). |
| **3. Health Score Specification v1** | A `health_score.json` claims file: one claim per pillar weight (see the app's `lib/score.ts` weights — those move here once specified). |
| **4. Biological Age Specification v1** | A `bio_age.json` claims file: one claim per input weight + expected-value curve. |
| **5. Confidence Calibration v1** | The confidence reducers already live in code as *structure*; the *thresholds* (e.g. extraction-confidence floor, staleness windows) become claims here. |

The engine's own view of what is anchored versus disabled is available
programmatically via `auditLibrary()`, which also lists any refused anchoring
attempts — this is the evidence for the spec's release gate ("every constant
ANCHORED, or its feature provably DISABLED").

**Only one deliverable is a genuine blocker for interpretation: #1 (the
threshold set).** Until `BIOSENSE_APOB_THRESHOLD_SET` is anchored, ApoB shows
values and abstains — which is the correct, safe behaviour, not a bug.

## Two items only a founder can decide (not engineering, not a number to look up)

- `APOB_FH_PATTERN_THRESHOLD` — the familial-hypercholesterolaemia detection
  threshold. This is a sensitivity/specificity trade-off with asymmetric harm
  (a missed inherited disorder is unrecoverable; a false alert is bounded). The
  architect recommends a high-sensitivity bias with clinical input. (BLOCKER-009
  / Decision Ledger DL-6.1.)
- Pregnancy-status collection policy — whether to collect a sensitive attribute
  to stop physiologically-normal results firing false alerts. A privacy/regulatory
  call. (BLOCKER-014 / DL-7.3.)

See `apob.example-anchored.json` for a fully-worked (illustrative, **not
clinically reviewed**) example of what an anchored file looks like.
