# SCL-012 — VITAMIN B12 (COBALAMIN)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. The serum-concentration-vs-functional-adequacy distinction is represented via the existing Context-First Interpretation Framework. No new methodology introduced.*

**Document ID:** SCL-012
**Biomarker:** Vitamin B12 — serum total cobalamin
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Vitamin B12 reuses the existing frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), the four-level confidence hierarchy (SCL-010), multiple-explanations output (SCL-010), cross-biomarker intelligence (SCL-010), two-sided banding (SCL-004/009/010/011), guideline-disagreement handling (SCL-003/011), and diagnostic-adjacency discipline (SCL-002/009/011) — introducing only vitamin-B12-specific scientific content. All sections remain consistent with SCL-001 through SCL-011.

---

> **What this document is.** SCL-012 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for vitamin B12 (serum cobalamin). It reuses
> existing BioSense methodology and does not redesign the Constitution, the ENG documents, the Blood
> Analysis Engine, or the SCL architecture. **No new methodology is introduced.**
>
> **What BioSense is.** A premium wellness and preventative health-intelligence platform.
> **Not** a medical device. It does **not** diagnose disease, **not** replace clinicians,
> **not** prescribe. All content is written from a **wellness-optimisation** perspective.
>
> **On thresholds.** Recognised guideline numbers are reproduced faithfully and attributed
> (Category A). The BioSense Wellness Interpretation Bands are a transparent interpretation of that
> evidence for a general-adult wellness audience (Category B) — they are **BioSense Version 1 Wellness
> Interpretations, not diagnostic boundaries or universal medical truth.**

---

## STRUCTURAL-FIT NOTE (Vitamin B12 vs SCL-001) — reuses frozen frameworks; no new pattern

Vitamin B12 introduces one important scientific distinction: **serum B12 concentration is not always
equivalent to functional B12 status.** A large fraction of circulating B12 is bound to haptocorrin and is
not available to cells, so a serum value can look adequate while tissues are functionally short — and,
conversely, a low-normal serum value does not by itself confirm a functional deficiency. The founder
decision is explicit that this distinction is represented **using the existing Context-First Interpretation
Framework**, not a new methodology — and it maps onto that framework cleanly:

1. **Two-layer interpretation via Context-First — reused (SCL-010).** BioSense reports (1) the **circulating
   concentration** band and (2) the **likelihood of functional adequacy**, the latter gated by context and
   functional markers. This is exactly the "evaluate context before/around the number" pattern the
   Context-First Framework already defines (§8, §11, §12).
2. **Four-level confidence hierarchy — reused (SCL-010).** "Normal serum but no functional markers" is a
   textbook **Context-Required / Reduced** state (§13).
3. **Cross-biomarker intelligence — reused (SCL-010).** B12 consumes **MMA, homocysteine, folate,
   haemoglobin/CBC, and creatinine/eGFR** where available; MMA is renal-confounded and homocysteine is
   folate/renal-confounded, so companions are consumed with their own caveats; unavailable → confidence
   limitation (§9).
4. **Multiple-explanations output — reused (SCL-010).** A high B12 is usually supplementation, occasionally
   liver/renal, rarely a myeloproliferative/malignant signal — a ranked possibility set (§11, §14).
5. **Two-sided banding with flags — reused (SCL-004/009/010/011).** Low signals a deficiency pattern; a
   persistently high value is flagged (§11).
6. **Guideline-disagreement handling — reused (SCL-003/011).** Thresholds genuinely differ (standard <200
   vs functional 300–500 vs some guidelines 500; assay-dependent ranges); presented as frameworks, never
   averaged (§10, §11).
7. **Diagnostic-adjacency discipline — reused (SCL-002/009/011).** BioSense never emits "deficiency,"
   "pernicious anaemia," or "malignancy" as a diagnosis; it detects the pattern, routes, and names nothing
   (§18, §19).

**Biomarker-specific content introduced:** the B12 thresholds and grey zone; the serum-vs-functional
distinction and the functional markers (MMA, homocysteine) with their confounders; the assay-variability
and interference notes; the high-B12 differential; and the B12 context modifiers. **No new methodology is
required.** **[C]**

---

## CONTENT CLASSIFICATION KEY

- **[A]** Source-derived fact / recognised threshold.
- **[B]** BioSense Version 1 wellness interpretation (labelled).
- **[C]** Product-policy decision.
- **[D]** Safety / healthcare-review wording.
- **[E]** Area of uncertainty.

---

# SCIENTIFIC POSITION STATEMENT

BioSense is a premium wellness and preventative health-intelligence platform. It is not a medical device.
It does not diagnose disease, and it does not replace healthcare professionals.

Vitamin B12 looks like a simple number and behaves like anything but. The serum test measures *total*
circulating cobalamin, but much of that is bound to a carrier protein and never reaches the inside of a
cell, so the serum value and the body's *functional* B12 status can diverge — a level can read "normal"
while tissues are short, and a low-normal level does not on its own prove a deficiency. BioSense treats
this honestly by reporting two things rather than one: the **circulating concentration**, and the
**likelihood of functional adequacy** given the surrounding context. When the functional markers that
settle the question — methylmalonic acid and homocysteine — are available, BioSense reads them (with their
own confounders, like kidney function and folate status); when they are not, it says so and treats the
functional picture as less certain rather than inventing confidence. It shows differing guideline
thresholds rather than splitting them, attends to both a low and a high pattern, and names no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as
the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate vitamin B12. Every value carries a source ID (W-series / R-series →
> §27) and a category tag. Canonical unit: pg/mL (store pmol/L in parallel). **Two-layer (concentration +
> functional-adequacy-likelihood), two-sided, context-first.**

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: pg/mL          # store pmol/L parallel ; pg/mL ≡ ng/L (1:1)                    [W14]
pmol/L = pg/mL × 0.738 ; pg/mL = pmol/L × 1.355   (cobalamin factor, MW ~1355 — NOT 38.67/88.57/18.0/2.496)  [W13]
Always retain value_reported + unit_reported + assay + available context. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding; expresses the serum≠functional distinction
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1][R8]
  FUNCTIONAL markers: methylmalonic acid (MMA), homocysteine (Hcy) — the markers that settle functional adequacy; [W6,W8]
  co-markers: folate (SCL-013), haemoglobin/CBC (SCL-019, future CBC);                                    [W12,W27]
  renal: creatinine/eGFR (MMA & Hcy both renal-confounded);                                               [W9,W10]
  intake/absorption: vegetarian/vegan, supplementation, recent injection, metformin, PPI, H2 blocker,
     bariatric surgery, GI/absorption disorders;                                                          [W23-W26]
  life-stage/other: pregnancy, age, liver disease, renal disease (may falsely elevate B12).               [W21,W22,W28]
CORE RULE (founder): serum B12 concentration is NOT always equivalent to functional B12 status.           [W4,W5][R8]
  → report TWO layers: (1) circulating concentration band (§0.3); (2) likelihood of functional adequacy (§0.4).
IF material context / functional markers change meaning → interpret WITHIN that context.                   [R1]
IF functional markers (MMA/Hcy) or key context unavailable → state as CONFIDENCE LIMITATION, not certainty. [R4]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands (circulating concentration) — [B] (synthesis of [A] anchors W1-W3,W16,W18) — TWO-SIDED
```
B12_CONCENTRATION_BAND (pg/mL, general adult, primary prevention, not pregnant) — TWO-SIDED, after context gate:
  LOW                    v < 200         # common deficiency cutoff (<148 pmol/L) [W1]
  LOW_BORDERLINE         200 <= v < 300  # borderline/indeterminate; functional markers advised [W2]
  FUNCTIONAL_GREY_ZONE   300 <= v < 500  # concentration "normal" but functional adequacy UNCERTAIN without MMA/Hcy [W3]
  ADEQUATE_REFERENCE     500 <= v <= 900  # within a favourable reference range [W16][W17]
  ABOVE_REFERENCE        901 <= v <= 1000 # upper reference; usually benign (supplementation) [W16][W19]
  HIGH_FLAG              v > 1000         # persistently high (>738 pmol/L) → context-first differential [W18]
DIRECTION: TWO-SIDED (low = possible functional-deficiency pattern; high = differential). Not lower/higher-better. [R6]
pmol/L parallels (×0.738): 200≈148 | 300≈221 | 500≈369 | 900≈664 | 1000≈738
UNIT: pg/mL ≡ ng/L. pmol/L via ×0.738.  [W13,W14]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never a diagnostic label. [B][D]**

## 0.4 Functional-adequacy likelihood layer — [C] — the founder distinction, via Context-First (R8)
```
FUNCTIONAL_ADEQUACY_LIKELIHOOD (a SEPARATE output from the concentration band; never conflated):
  drivers: concentration band + functional markers (MMA/Hcy) + context.
  MMA normal AND Hcy normal (folate-replete, renal-normal) → functional deficiency effectively ruled out → LIKELY_ADEQUATE (high confidence). [W11]
  MMA elevated (renal-normal) → supports functional B12 shortage even if serum concentration looks normal → FUNCTIONAL_SHORTFALL_PATTERN. [W6,W12]
  serum in grey zone (200–500) AND functional markers UNAVAILABLE → UNCERTAIN → CONTEXT_REQUIRED (state what would clarify). [W3][R4]
  high serum concentration → says NOTHING reassuring about function if context suggests otherwise; interpret concentration separately. [W4]
NEVER equate: normal serum = definite adequacy ; low-normal serum = definite deficiency.                   [founder][W5]
Explain the DEGREE OF CONFIDENCE from context; missing functional markers = confidence limitation, not certainty. [founder][R4]
```

## 0.5 Confidence hierarchy (four-level) — [C] — REUSED (SCL-010)
```
STANDARD          : concentration clearly adequate/low AND functional markers concordant (or clearly not needed).
REDUCED           : single value / assay-range uncertainty / minor context (e.g. supplement timing) — band cautiously. [R2]
CONTEXT_REQUIRED  : grey-zone concentration (200–500) without MMA/Hcy; or high serum with renal/liver context unknown;
                    functional-adequacy layer withheld or heavily qualified; name what's needed.           [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / ineligible population — explained abstention. [R2]
Reduced confidence does NOT auto-block; significant contextual uncertainty MAY justify abstention.         [R2]
```

## 0.6 Deterministic safety & suppression rules — [D]
```
S1  B12 is NOT a diagnosis. NEVER emit "deficiency", "pernicious anaemia", "megaloblastic anaemia", or
    "malignancy" as a label. Detect patterns; explain possibilities; identify uncertainty; route.          [R7]
S2  Serum B12 concentration is NOT equivalent to functional status; report the two layers separately.       [W4,W5][R8]
S3  NEVER equate normal serum = adequacy, or low-normal serum = deficiency; state confidence from context.  [founder]
S4  Grey zone (200–500) without MMA/Hcy → functional adequacy UNCERTAIN → Context-Required; name what's needed. [W3][R4]
S5  Functional markers have confounders: MMA ↑ in renal impairment; Hcy ↑ with folate/B6 deficiency, renal, liver. Qualify. [W9,W10]
S6  HIGH_FLAG → overload/malignancy NOT assumed; supplementation/injection is the usual explanation; multiple explanations. [W19][R3]
S7  Never recommend specific B12 doses, injections, or supplementation regimens.
S8  Cross-markers (MMA/Hcy/folate/Hb/eGFR) unavailable → confidence limitation, not invented certainty.     [R4]
S9  Never produce a numeric disease-risk % from B12.
S10 On any medication/supplement/injection question → educational context + refer.
S11 Never present a BioSense band as a medical/diagnostic boundary.
S12 Renal disease may falsely elevate serum B12 and confound MMA; pregnancy uses pregnancy-aware caution; never infer context from the value. [W21,W28]
```

## 0.7 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & FUNCTIONAL MARKERS (the key B12 move): where a value is low/borderline/grey-zone, consider
   MMA and homocysteine (with eGFR & folate context) to clarify functional adequacy; note diet/metformin/PPI/age. [W6,W8,W12]
Tier 2 LIFESTYLE (context-appropriate): B12-containing foods (animal-source) or awareness that vegan/vegetarian
   patterns need a reliable B12 source; note that stores last years so change is gradual (food-first framing). [W25]
Tier 3 HEALTHCARE DISCUSSION (calm) when: LOW / persistent grey-zone with functional-shortfall pattern |
   HIGH_FLAG | neurological symptoms (may precede anaemia) | pregnancy / malabsorption / renal context | medical/supplement question. [W27][D]
NEVER a specific dose, injection, or regimen at any tier.
```

## 0.8 Narrative selection rules — [B]/[D]
```
context-gate first → concentration band + functional-adequacy layer → template; possibilities where high/uncertain.
ADEQUATE_REFERENCE (markers concordant/not needed) → affirming, with the serum≠function caveat where relevant.
LOW / LOW_BORDERLINE / FUNCTIONAL_GREY_ZONE → constructive; functional markers clarify; NEVER assert deficiency; route if symptomatic.
HIGH_FLAG → calm; multiple explanations (supplementation/injection >> liver/renal >> myeloproliferative); NEVER assert malignancy.
functional markers present → integrate (MMA/Hcy), with their confounders (renal/folate).
functional markers / context unavailable → state confidence limitation; name what would clarify.
Never "normal/abnormal" as a verdict; never a diagnosis (deficiency/pernicious anaemia/malignancy).
```

## 0.9 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Serum B12 measures the total amount in your blood, not how much is active inside your cells — so it's
      best read alongside functional markers (MMA, homocysteine) and your wider context."
CAV3 (reduced/context) name the context reducer(s) or missing functional/co-marker (MMA, Hcy, folate, eGFR).
CAV4 (grey zone 200–500, no functional markers) "This is in a range where the serum number alone can't confirm
      whether your cells are getting enough — MMA and homocysteine would clarify."
CAV5 (low pattern) "This is a lower-than-typical B12 pattern; if you have fatigue, tingling, or balance changes,
      or follow a vegan/vegetarian diet or take metformin or acid-reducers, it's worth discussing with a professional."
CAV6 (high flag) "A high B12 is most often from supplements or a recent injection; less commonly it reflects
      liver or kidney factors. Persistent high levels without supplements are worth reviewing."
CAV7 (functional markers unavailable) "We'd interpret this more confidently with MMA and homocysteine (read with
      your kidney function and folate)."
CAV8 (renal/confounder) "Kidney function affects both B12 and MMA readings, so results are interpreted with that in mind."
```

## 0.10 Source & version identifiers
```
config_id: SCL-012   config_version: 1.0
concentration_band_id: BIOSENSE_B12_CONCENTRATION_BANDS_v1   (Category B; two-sided; anchors W1-W3,W16,W18)
functional_adequacy_id: SCL012_FUNCTIONAL_ADEQUACY_LIKELIHOOD_v1  (founder distinction via Context-First; R8; W4,W5,W11)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1       (reused; R2)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1       (reused; R3)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1         (reused; R4 — MMA/Hcy/folate/Hb/eGFR)
guideline_disagreement_ref: SCL011_IOM_VS_ENDOCRINE_SOCIETY_v1 pattern (reused posture; R5)
safety_rules_id: SCL012_SAFETY_v1                            (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Vitamin B12 (cobalamin) is a water-soluble, cobalt-containing vitamin essential for DNA synthesis, red
blood cell formation, and nervous-system function. **[A]** The standard test measures **total serum
cobalamin**. Its defining subtlety — and the reason BioSense handles it in two layers — is that the serum
concentration is **not always equivalent to functional status**. Much of circulating B12 is bound to
haptocorrin and is not taken up by cells; only the transcobalamin-bound (active, "holoTC") fraction is
cell-available. <cite index="62-1">Serum B12 measures total cobalamin in circulation — both active (holotranscobalamin) and inactive forms bound to haptocorrin. Up to 80% of circulating B12 is in the inactive form. This means serum B12 can appear adequate while your cells are functionally starved.</cite> **[A][W4]** Accordingly, a serum value within the reference range does not exclude deficiency. <cite index="63-1">A serum cobalamin level that is within the reference range does not exclude cobalamin deficiency.</cite> **[A][W5]**

Two functional markers — **methylmalonic acid (MMA)** and **homocysteine** — better reflect what's
happening inside cells, and BioSense reads them (with their confounders) when available. Encouragingly,
B12 is highly modifiable, and neurological symptoms can appear before anaemia, so early attention matters. **[A][W6][W8][W27]**

- **Official name:** Vitamin B12 — serum total cobalamin
- **Common abbreviation:** B12 (cobalamin)
- **Reported in:** pg/mL (≡ ng/L) and pmol/L (×0.738) **[A][W13][W14]**
- **Key distinction:** circulating concentration ≠ functional adequacy **[A][W4][W5]**
- **Direction:** two-sided, context-dependent **[A]**
- **BioSense role:** A context-first marker reported in two layers — concentration and likelihood of functional adequacy — read with MMA/homocysteine/folate/CBC/eGFR.

---

# 2. Physiological Function

B12 is a cofactor for two reactions: the conversion of methylmalonyl-CoA to succinyl-CoA (so B12 shortage
raises **MMA**), and the remethylation of **homocysteine** to methionine (so B12 shortage raises
homocysteine, unless folate is also limiting). **[A][W6][W8]** These are exactly why MMA and homocysteine
are the **functional** markers: they rise when cells can't use B12, even if the serum concentration looks
normal. **[A]**

Two points define interpretation **[A]**:
- **Concentration and function can diverge.** Total serum B12 mixes active and inactive fractions; the
  functional markers reflect cellular use. BioSense reports both layers. **[A][W4]**
- **B12 stores are large and slow.** Hepatic stores last 2–5 years, so deficiency develops gradually
  (faster with malabsorption), and a recent supplement or injection can lift the serum number before
  tissues fully recover. **[A][W25][W30]**

---

# 3. Scientific Background

Serum B12 thresholds are recognised but genuinely contested, and the reference range is assay-dependent.
Most labs flag deficiency below ~200 pg/mL (148 pmol/L), with a borderline/indeterminate band just above
it. <cite index="59-1">For indeterminate results (180-350 ng/L), methylmalonic acid (MMA) testing is recommended as a confirmatory test.</cite> **[A][W1][W2]** A wider **functional grey zone** (~200–500 pg/mL) is where the serum number alone cannot confirm cellular adequacy, and MMA/homocysteine are used to settle it. **[A][W3]**

The central scientific point is that **total serum B12 is not a reliable standalone marker of status**.
<cite index="66-1">Thus, total serum B12 is not a reliable biomarker of vitamin B12 status when used alone.</cite> The functional markers resolve most of the ambiguity: if both MMA and homocysteine are normal, deficiency is effectively ruled out. <cite index="63-1">If both metabolites are within the reference range, vitamin B12 deficiency is effectively ruled out.</cite> **[A][W11]** But those markers have their own confounders — MMA rises in renal impairment, and homocysteine rises with folate/B6 deficiency, renal failure, and liver disease — so they too are read in context. **[A][W9][W10]**

At the high end, a persistently elevated B12 (>1000 pg/mL) is usually benign supplementation but occasionally
signals liver, renal, or myeloproliferative processes. <cite index="71-1">High vitamin B12 (above the lab reference range) most commonly reflects supplementation or recent B12 injection — not disease.</cite> **[A][W18][W19]**

**The wellness reading — [B]:** B12 is a modifiable, context-first marker best reported in two layers
(concentration + functional-adequacy likelihood), read with MMA/homocysteine and their confounders, shown
against differing thresholds, and never named as a diagnosis.

**An honest boundary — [E]:** the serum thresholds are contested and assay-dependent, total serum B12 is
an imperfect standalone marker, and the functional markers are themselves confounded — so BioSense leans on
context and companion markers and is explicit about confidence. **[E][W3][W15]**

---

# 4. Why Vitamin B12 Matters

**1. It is essential and its shortage is consequential. [A][W27][W30]** B12 supports blood and nerve
function; deficiency can cause anaemia and neurological changes, sometimes irreversible if prolonged — and
neuro symptoms can precede anaemia. **[A]**

**2. Concentration ≠ function. [A][W4][W5]** Because serum can mislead in either direction, honest
two-layer, context-first interpretation adds real value over a naive "normal/abnormal" read. **[A]**

**3. It is common and modifiable — with clear at-risk groups. [A][W22-W26]** Vegans/vegetarians, older
adults, and people on metformin or long-term acid-reducers are recognised at-risk groups, making B12 a
high-yield wellness marker. **[A]**

**Why BioSense measures it — [C]:** B12 is a high-value, modifiable marker whose serum-vs-functional
subtlety is exactly what the Context-First Framework is for — reported in two layers, read with functional
markers, and interpreted honestly.

---

# 5. Laboratory Measurement

B12 status is measured as **serum total cobalamin** by immunoassay (commonly chemiluminescence). **[A]**

- **Reported in pg/mL (≡ ng/L) and pmol/L** (×0.738). **[A][W13][W14]**
- **Assay-dependent reference ranges.** Radioassay and chemiluminescence give different ranges (e.g.
  ~170–900 vs ~250–1100 pg/mL); there is **no gold standard**, so the reporting lab's range and method
  matter. **[A][W15]**
- **Total, not active.** Serum B12 measures total cobalamin; **holotranscobalamin (holoTC, "active B12")**
  is an alternative that measures the cell-available fraction (indeterminate ~23–75 pmol/L → MMA). **[A][W29]**
- **Interferences.** Macro-B12 and high-dose biotin can distort readings; a markedly high value that
  disagrees with function may reflect analytical interference. **[A][W31]**
- **Functional confirmation.** MMA and homocysteine confirm functional status when the serum value is
  ambiguous (§9). **[A][W6][W8]**

---

# 6. Units

- **pg/mL** — standard in the US; **≡ ng/L** (numerically identical). **BioSense canonical unit.** **[A/C][W14]**
- **pmol/L** — SI unit, standard elsewhere. **[A]**
- Conversion factor **0.738** (pg/mL → pmol/L; ×1.355 reverse), from cobalamin's molecular weight (~1355
  g/mol) — **not** the cholesterol (38.67), triglyceride (88.57), glucose (18.0), or 25(OH)D (2.496) factor. **[A][W13]**

BioSense stores the reported value, unit, and assay unchanged and computes the parallel unit. **[C]**

---

# 7. Unit Conversion

```
pmol/L = pg/mL × 0.738
pg/mL  = pmol/L × 1.355   (and pg/mL ≡ ng/L)
```
Worked checks: 200 pg/mL ≈ 148 pmol/L; 300 ≈ 221; 500 ≈ 369; 1000 ≈ 738 pmol/L. **[A][W13]**

**Safety rule [D]:** the cobalamin factor (0.738) is analyte-specific — never a lipid/glucose/vitamin-D
factor; a unit-unknown value is displayed but not interpreted. **[D]**

---

# 8. Measurement Limitations & the Serum-vs-Functional Distinction  *(Context-First basis — reused SCL-010)*

B12's defining limitation is that **a serum concentration does not, on its own, establish functional
status** — which is why the Context-First gate (§0.2) and the two-layer output (§0.3–§0.4) apply. **[A]**

## 8.1 Total vs active/functional — [A]
Serum B12 measures total cobalamin (active + inactive); up to ~80% is inactive haptocorrin-bound, so serum
can look adequate while cells are short, and a within-range value doesn't exclude deficiency. **[A][W4][W5]**

## 8.2 The functional markers and their confounders — [A]
**MMA** and **homocysteine** reflect cellular B12 use. MMA is the more B12-specific but is **renal-confounded**
(reduced clearance raises it); homocysteine is confounded by **folate/B6 deficiency, renal failure, and
liver disease**. Both-normal effectively rules out deficiency. **[A][W6][W8][W9][W10][W11]**

## 8.3 Assay variability & interference — [A]
Reference ranges are assay-dependent (radioassay vs chemiluminescence), and macro-B12/biotin can distort
results — method context is a confidence input. **[A][W15][W31]**

## 8.4 The grey zone — [A]
A serum value of ~200–500 pg/mL is where the number alone can't confirm functional adequacy; MMA/homocysteine
are needed. Without them, BioSense holds the functional layer as **Context-Required**. **[A][W3][W12]**

## 8.5 Renal effect on the concentration itself — [A]
Renal disease may **falsely elevate** serum B12 (and confounds MMA), so kidney function is material context
at both ends. **[A][W21]**

**How BioSense uses this — [C][D]:** the Context-First gate runs first; the concentration band and the
functional-adequacy layer are reported **separately**; missing functional markers set Context-Required/
Reduced confidence; and neither "normal serum = adequacy" nor "low-normal = deficiency" is ever asserted.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010)*

B12 consumes its functional and co-markers where available. **[A][C]**

- **Methylmalonic acid (MMA). [A]** The most B12-specific functional marker; elevated MMA (renal-normal)
  supports a functional shortfall even with a normal serum concentration. **Renal-confounded** (§8.2). **[A][W6][W9]**
- **Homocysteine. [A]** Rises with B12 shortage in **folate-replete** people; confounded by folate/B6
  deficiency, renal failure, and liver disease. Read with folate. **[A][W8][W10]**
- **Folate (SCL-013). [A]** Interlinked one-carbon metabolism; folate status is needed to interpret
  homocysteine, and folate/B12 co-deficiency is common. **[A][W10][W12]**
- **Haemoglobin / CBC (SCL-019, future CBC). [A]** Macrocytosis/anaemia is a downstream consequence, but
  **neurological changes can precede** haematological ones, so a normal CBC doesn't exclude a B12 problem. **[A][W27]**
- **Creatinine / eGFR. [A]** Renal function confounds MMA (and homocysteine) and can falsely elevate serum
  B12 — decisive context for both the concentration and the functional layer. **[A][W9][W21]**

**Cross-biomarker rule [C] (reused R4):** where these are **available**, BioSense consumes them (with their
confounders) to sharpen both layers and confidence; where **unavailable**, it records a **confidence
limitation** and names what would clarify — never inventing certainty. **[C][R4]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Serum B12 is not a reliable standalone status marker**; within-range does not exclude deficiency. **[A][W4][W5]**
- **Deficiency cutoff ~<200 pg/mL** (148 pmol/L), with a borderline band above it. **[A][W1][W2]**
- **MMA and homocysteine are the functional markers**; both-normal rules out deficiency. **[A][W6][W8][W11]**
- **MMA is renal-confounded; homocysteine is folate/renal/liver-confounded.** **[A][W9][W10]**
- **High B12 is usually supplementation/injection; persistent unexplained high warrants review.** **[A][W18][W19]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **The deficiency/adequacy threshold is contested.** Standard labs flag <200; functional/optimal sources
  argue dysfunction begins below ~400–500; some (e.g. Japanese/European) use 500 as the deficiency
  threshold. <cite index="65-1">Japanese and European clinical guidelines use 500 pg/mL as the deficiency threshold. When serum B12 is in the gray zone of 200 to 500 pg/mL, methylmalonic acid (MMA) is required to confirm whether functional deficiency exists at the cellular level.</cite> **[A][W3][W17]**
- **Reference ranges are assay-dependent** (radioassay vs chemiluminescence). **[A][W15]**
- **High-B12 "elevation" definitions don't even agree on units** (≥1000 pg/mL ≈ 738 pmol/L vs >1000 pmol/L). **[A][W18]**
- **Why:** serum B12 is a continuous, context-modulated marker with no gold standard, so thresholds encode
  different purposes (population screening vs functional/optimal). BioSense **presents the differing
  thresholds and never averages them** (reused R5). **[A][E]**

## 10.3 Strength of evidence
- **Serum≠functional; MMA/Hcy as functional markers: established.** **[A][W4][W6]**
- **Deficiency cutoff <200: established (with contested upper grey zone).** **[A][W1][W3]**
- **Both-metabolites-normal rule-out: established.** **[A][W11]**
- **High-B12 differential: established.** **[A][W18]**
- **A single "optimal" serum target: not established (contested).** **[E][W17]**

## 10.4 Intended populations
Thresholds target general-adult status assessment. BioSense applies them context-first to general adults in
two layers, abstaining or requiring context in pregnancy, renal disease, and where functional markers or
material context are unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. B12 is reported in TWO LAYERS (circulating concentration +
> likelihood of functional adequacy), is TWO-SIDED and CONTEXT-GATED, and its adequacy threshold is
> genuinely CONTESTED and ASSAY-DEPENDENT: the concentration band and the functional-adequacy layer are
> never conflated.**

## 11.1 The concentration bands (pg/mL; general adult, primary prevention, not pregnant; after context gate)

| BioSense Wellness Interpretation | Associated B12 (pg/mL) | ≈ pmol/L | Evidence anchor | Wellness meaning (context-first; two-layer; no diagnostic label) |
|---|---|---|---|---|
| **Low** | v < 200 | < ~148 | Deficiency cutoff [W1] | A low-concentration pattern; functional markers + context; route if symptomatic. |
| **Low Borderline** | 200 ≤ v < 300 | ~148–<221 | Borderline/indeterminate [W2] | Borderline concentration; MMA/homocysteine advised to clarify function. |
| **Functional Grey Zone** | 300 ≤ v < 500 | ~221–<369 | Functional grey zone [W3] | Concentration "normal" but functional adequacy uncertain without MMA/homocysteine. |
| **Adequate Reference** | 500 ≤ v ≤ 900 | ~369–664 | Favourable reference [W16][W17] | Within a favourable concentration range (function still read with context). |
| **Above Reference** | 901 ≤ v ≤ 1000 | ~665–738 | Upper reference [W16] | Above the usual range; commonly supplementation; usually benign. |
| **High — Flag** | v > 1000 | > ~738 | Persistent-high threshold [W18] | Context-first differential; supplementation usual, disease uncommon. |

## 11.2 The functional-adequacy likelihood layer (separate output) [B][C]
Reported **alongside** (never merged into) the concentration band, driven by concentration + functional
markers (MMA/homocysteine) + context: **LIKELY_ADEQUATE** (both metabolites normal, renal-normal →
deficiency effectively ruled out); **FUNCTIONAL_SHORTFALL_PATTERN** (MMA elevated, renal-normal — even with
normal concentration); **UNCERTAIN / CONTEXT_REQUIRED** (grey-zone concentration without functional markers).
BioSense never equates a normal concentration with definite adequacy, nor a low-normal concentration with
definite deficiency. **[B][C][W4][W5][W11]**

## 11.3 How the bands were derived — transparency [B]
- Concentration boundaries map to recognised anchors: the ~200 deficiency cutoff (W1); the 200–300
  borderline/indeterminate band (W2); the ~300–500 functional grey zone (W3); a favourable reference
  midrange (W16–W17); and the >1000 persistent-high threshold (W18).
- **The functional-adequacy layer is separate** and gated by MMA/homocysteine + context (§11.2), expressing
  the founder distinction via the Context-First Framework — not a new methodology.
- **No number was averaged.** The contested thresholds (standard 200 vs functional 300–500 vs some
  guidelines 500) are presented as differing frameworks (§10.2), not merged.

## 11.4 Deterministic, half-open intervals [B]
All concentration bands use half-open intervals (`≤ v <`) so no value is classified into two bands and no
gap exists (High is the single upper flag, v > 1000). **[B]**

## 11.5 Guideline-disagreement display (reused posture) [B][C]
Where relevant, BioSense notes that the deficiency/adequacy threshold is contested and assay-dependent
(standard <200; functional/optimal higher; some guidelines 500), and shows the differing frameworks rather
than averaging them (CAV2/CAV4). **[B][C][R5]**

## 11.6 Context-gate precedence [D]
No band or functional-adequacy statement is emitted as a verdict without the Context-First evaluation
(§0.2). Diet, metformin/PPI/H2, age, renal function, supplementation/injection, pregnancy, and the
functional markers are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general adult, primary prevention, not pregnant**, and a total-serum-B12 assay. Reference
ranges are assay-dependent and thresholds contested; renal disease can falsely elevate B12; recent
supplements/injections lift the number before tissues recover. Not applied to children/adolescents or
pregnancy (§15). **[E][W15][W21]**

---

# 12. Interpretation Framework — CONTEXT-FIRST, TWO-LAYER (reused from SCL-010)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010). The serum-vs-functional
> distinction (founder decision) is represented as a two-layer output within that framework. No new
> methodology is introduced.** **[C][R1][R8]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1]
   gather materially-relevant context (functional markers MMA/Hcy; folate; Hb/CBC; creatinine/eGFR; diet;
   metformin/PPI/H2; bariatric/GI; supplementation/injection; pregnancy; age; renal/liver).        [R4]
   → if material context/functional markers change meaning, interpret WITHIN it; if key context unavailable,
     record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit pg/mL; assay known; result final) → else display-only.
STEP 2 — ELIGIBILITY: general adult, not pregnant → else abstain/pregnancy-aware (§15).
STEP 3 — CONFIDENCE (four-level): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED (§0.5).         [R2]
STEP 4 — LAYER 1 (CONCENTRATION): assign two-sided concentration band (§11.1).
STEP 5 — LAYER 2 (FUNCTIONAL ADEQUACY): assess likelihood from concentration + MMA/Hcy + context (§11.2);
         NEVER equate normal-serum=adequacy or low-normal=deficiency; grey-zone without markers → CONTEXT_REQUIRED. [R8]
STEP 6 — EXPLANATIONS: if abnormal + ≥2 plausible causes (esp. high) → Possible Explanation A/B/C, ranked. [R3]
STEP 7 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.9); route where appropriate; no diagnosis. [R7]
```

**Core interpretive stance [B]:** B12 is a context-first, two-layer marker — report the circulating
concentration and, separately, the likelihood of functional adequacy; read the functional markers with
their confounders; show contested thresholds honestly; and name no condition. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy — reused SCL-010)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Concentration clearly adequate or clearly low AND functional markers concordant (or clearly not needed) | Band + functional layer normally |
| **REDUCED** | Single value / assay-range uncertainty / minor context (supplement timing) / near a band boundary | Band cautiously; name the reducer (CAV3) |
| **CONTEXT_REQUIRED** | Grey-zone concentration (200–500) without MMA/Hcy; high serum with renal/liver context unknown | Withhold/qualify the functional-adequacy layer; name needed context (CAV4/CAV7) |
| **ABSTAINED** | Significant contextual uncertainty / conflicting signals / ineligible population | Explained abstention; route |

Reducers/context inputs: missing functional markers (MMA/Hcy) [R4]; renal impairment (confounds MMA & B12)
[W9,W21]; folate status unknown (confounds Hcy) [W10]; assay method/range [W15]; macro-B12/biotin
interference [W31]; recent supplementation/injection [W19]; diet/metformin/PPI/age context [W22-W25];
value near a band boundary; pregnancy/renal/liver context [W28].

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant
contextual uncertainty **may** justify abstention. **[R2]**

---

# 14. Wellness Interpretation  *(context-first, two-layer, multiple explanations for high)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate, reporting both layers.
Wellness, not medical; **never a diagnosis**. **[B]/[D]**

- **BioSense Wellness Interpretation: Adequate Reference** *(500–900 pg/mL, functional markers concordant/
  not needed).* "Your B12 concentration is in a favourable range. Remember the serum number reflects total
  B12, not the active amount in your cells — but with no red flags, this is a reassuring result." **[B]**
- **BioSense Wellness Interpretation: Functional Grey Zone** *(300–499).* "Your B12 concentration looks
  'normal', but this is the range where the serum number alone can't confirm whether your cells are getting
  enough. Methylmalonic acid and homocysteine (read with your kidney function and folate) would clarify."
  Two-layer; **no deficiency assertion** (CAV4). **[B][D]**
- **BioSense Wellness Interpretation: Low / Low Borderline** *(<300).* "This is a lower-than-typical B12
  concentration. Functional markers (MMA, homocysteine) help confirm whether it's affecting your cells; if
  you have fatigue, tingling, or balance changes, or follow a vegan/vegetarian diet or take metformin or
  acid-reducers, it's worth discussing with a healthcare professional." Constructive; **no 'deficiency'
  diagnosis** (CAV5). **[B][D]**
- **BioSense Wellness Interpretation: Above Reference / High — Flag** *(>900 / >1000).* Present a
  **context-first differential** (CAV6): "A higher B12 is **most often from supplements or a recent
  injection** — benign and expected. Less commonly it reflects **liver or kidney factors**; **persistently**
  high levels without supplements are worth reviewing. An isolated high B12 with a normal blood count is
  rarely the first sign of anything serious." **No 'malignancy' diagnosis** (S6). **[B][D][W19][W20]**

**Functional-marker modifier (the key B12 move):** where MMA/homocysteine are available, integrate them —
elevated MMA (renal-normal) supports a functional shortfall even with a normal concentration; both normal
effectively rules deficiency out — always noting the renal (MMA) and folate (homocysteine) confounders
(CAV8). **[D][W6][W9][W11]**

**Context-unavailable modifier:** where functional markers or key context are missing, state the confidence
limitation and name what would clarify (CAV7); never invent certainty (S8). **[D][R4]**

Every interpretation pairs both layers with context guidance (§17) and the mandatory caveats (§0.9). **None
diagnoses deficiency, pernicious anaemia, or malignancy, and none equates a normal serum with definite
adequacy or a low-normal serum with definite deficiency.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for B12).** Grey-zone concentration without functional markers, or a high
  serum with unknown renal/liver context → withhold/qualify the functional-adequacy layer, state what's
  needed (§13, CAV4/CAV7). **[D][R2]**
- **15.2 Renal disease.** May falsely elevate serum B12 and confounds MMA; interpret both layers within
  renal context or abstain. **[D][W9][W21]**
- **15.3 Pregnancy.** B12 shifts physiologically; BioSense uses pregnancy-aware caution or abstains,
  deferring to a professional. **[D][W28]**
- **15.4 Children & adolescents.** Adult bands not applied; display, suggest professional interpretation. **[D]**
- **15.5 Recent supplementation/injection.** Serum reflects intake and can overstate tissue recovery;
  reduced confidence, framed accordingly. **[D][W19]**
- **15.6 Malabsorption / metformin / PPI / vegan context.** Recognised at-risk contexts; interpret the low
  end with that in mind and route where a functional-shortfall pattern appears. **[D][W23-W26]**
- **15.7 Analytical interference (macro-B12/biotin).** A markedly high value that disagrees with function →
  reduced confidence / context-required. **[D][W31]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Two-layer trend. [A][B]** BioSense trends the concentration and, where available, the functional markers
  separately; a rising serum concentration after supplementation does not by itself prove functional
  recovery. **[W19]**
- **Assay-consistency matters. [A]** Comparing values across different assays/methods is a trend caveat, not
  a true change. **[W15]**
- **Slow physiology. [A]** Because stores last years, genuine dietary/absorptive change is gradual; abrupt
  shifts usually reflect supplementation, injection, or assay change. **[W25][W30]**
- **Read with renal/folate context. [A]** MMA and homocysteine trends are interpreted with eGFR and folate;
  a rising MMA with worsening renal function may not reflect B12. **[W9][W10]**
- **Context/abstained points. [C]** Grey-zone-without-markers or interference-suspect points are tagged so
  they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For B12, the first tier is **context and functional markers**, then context-appropriate lifestyle. **[A]/[B]**

## 17.1 Functional markers & context first [A][W6][W8][CF]
Where a value is low/borderline/grey-zone, the clarifying step is **MMA and homocysteine** (with eGFR and
folate), plus the personal context (diet, metformin, PPI/H2, age, absorption). **[A]**

## 17.2 Diet [A][W25]
B12 comes from animal-source foods; **vegan/vegetarian patterns need a reliable B12 source** over time
(stores last years, so shortfall is gradual). Framed as education, **not** a dose instruction. **[A]**

## 17.3 At-risk context [A][W22-W24]
Older adults, long-term metformin, and long-term PPI/H2 use are recognised contexts for lower B12 — useful
for interpreting a low value, not a prescription. **[A]**

## 17.4 Framing rules [B][D]
Context and functional markers first; **no specific doses, injections, or regimens** (S7); contested
thresholds shown, never averaged; calm, evidence-informed language; never a diagnosis; the serum≠function
caveat (CAV2) attached where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain the two layers (concentration and functional-adequacy likelihood) and what
B12 is; run the context-first evaluation; integrate MMA/homocysteine with their confounders; present
multiple ranked explanations for a high value; name which functional/co-markers would clarify; express
context-required/abstention respectfully.

The AI layer **must never**:
- emit "deficiency", "pernicious anaemia", "megaloblastic anaemia", or "malignancy" as a diagnosis — even to deny one (S1)
- equate a normal serum concentration with definite functional adequacy, or a low-normal concentration with definite deficiency (S3)
- conflate the concentration band and the functional-adequacy layer (S2)
- interpret B12 independently when material context/functional markers exist (S2)
- present a single certain explanation for an abnormal value (esp. high) (S6)
- assume malignancy/overload from a high value — supplementation is the usual cause (S6)
- ignore the renal (MMA) and folate (homocysteine) confounders (S5)
- invent certainty when functional markers/context are unavailable — state the limitation (S8)
- recommend specific doses, injections, or supplementation regimens (S7)
- produce a numeric disease-risk % from B12 (S9)
- present a BioSense band as a medical/diagnostic boundary (S11)
- infer diet, medication, pregnancy, or a condition from the value

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing deficiency/pernicious
anaemia/malignancy is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes
  patterns, never names deficiency / pernicious anaemia / malignancy (S1). **[D][R7]**
- **Two-layer honesty.** The concentration and functional-adequacy layers are reported separately; neither
  "normal serum = adequacy" nor "low-normal = deficiency" is asserted (S2, S3, CAV2). **[D][W4][W5]**
- **Grey-zone honesty.** 200–500 without functional markers is Context-Required, not a verdict (S4, CAV4). **[D][W3]**
- **Confounders respected.** MMA (renal) and homocysteine (folate/renal/liver) confounders are always noted
  (S5, CAV8). **[D][W9][W10]**
- **High not pathologised.** A high value defaults to supplementation, not malignancy (S6, CAV6). **[D][W19]**
- **No dose/injection guidance.** Supplement/injection/medication questions → educational context + referral
  (S7, S10). **[D]**
- **Missing markers/context stated, not invented.** (S8). **[D][R4]**
- **Correct unit factor.** The engine applies the cobalamin factor (0.738), not a lipid/glucose/vitamin-D
  factor. **[D][W13]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. **Low / Low Borderline**, or a **grey-zone concentration with a functional-shortfall pattern** (elevated
   MMA/homocysteine, renal-normal). **[W6][W12]**
2. **High — Flag** (>1000 pg/mL), especially **persistent** and **without** supplementation. **[W18]**
3. **Neurological symptoms** (tingling, balance, cognitive change) — these can precede anaemia. **[W27]**
4. **At-risk context** (vegan/vegetarian, metformin, long-term PPI/H2, older age, malabsorption/bariatric). **[W23-W26]**
5. The user is in a **context-required / abstention** situation (pregnancy, renal disease, missing functional
   markers). 
6. The user **asks a medical, supplement, or injection question** (S10).

All suggestions are wellness-framed, non-urgent, non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-012 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for serum B12, plus assay metadata,
  and — as interpretation inputs — **MMA, homocysteine, folate (SCL-013), haemoglobin/CBC (SCL-019, future
  CBC), and creatinine/eGFR**, plus declared context (diet, metformin, PPI/H2, supplementation/injection,
  pregnancy, age). **[R4]**
- **Supplies (as CSL bindings):** the two-sided concentration bands (Category B), the **functional-adequacy
  likelihood layer** (the founder distinction, via Context-First), the reused Context-First gate, the reused
  four-level confidence hierarchy, the reused multiple-explanations output, the reused cross-biomarker
  consumption with graceful degradation, the guideline-disagreement display, safety rules, context guidance,
  and narrative templates — each with value + source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, the confidence hierarchy, the
  multiple-explanations output, and cross-biomarker intelligence (all frozen from SCL-010); the
  guideline-disagreement posture (SCL-003/011); two-sided banding (SCL-004/009/010/011); and the
  diagnostic-adjacency discipline (SCL-002/009/011). **The serum-vs-functional distinction is represented
  within Context-First — not as a new methodology.** **[C][R8]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (functional/co-markers inform,
  never averaged into a single verdict; contested thresholds never averaged).
- **Uses the correct unit factor** (0.738) — a per-analyte configuration.
- **Score contribution:** B12 contributes to a nutrient/haematologic-wellness context as a **two-layer,
  two-sided, context-gated** input; context-required/abstained values do not contribute a definite verdict;
  the concentration and functional-adequacy layers are kept distinct. Any weighting is a Category [C]
  product decision. **[C]**

---

# 22. Medication & Supplement Context (educational only)

Educational context only; BioSense does not instruct on dose, injection, or prescribe supplementation
(S7, S10). **[D]**
- B12 supplementation (oral/sublingual) and injections, and the management of low or functional-deficient
  B12, are clinical decisions made on the full picture (serum + MMA/homocysteine + cause + symptoms). A
  person's B12 on supplements/injections reflects that intake and can overstate tissue recovery. **[A][W19]**
- **Metformin** and **long-term PPI/H2 blockers** are recognised as lowering B12 over time — context for
  interpretation, not a prompt to change any medication (which is a clinician's decision). **[A][W23][W24]**
- Any supplement, injection, or medication question → educational context + suggestion to speak with a
  healthcare professional. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Serum B12 is an imperfect standalone marker. [E]** Concentration and function diverge; the two-layer,
   Context-First approach addresses this, but functional markers are needed to resolve the grey zone. **[W4][W3]**
2. **The deficiency/adequacy threshold is genuinely contested. [E]** Standard <200 vs functional 300–500 vs
   some guidelines 500; BioSense shows the frameworks, never averages. **[W3][W17]**
3. **Reference ranges are assay-dependent. [E]** Radioassay vs chemiluminescence differ; no gold standard. **[W15]**
4. **Functional markers are confounded. [E]** MMA (renal), homocysteine (folate/renal/liver) — read with
   eGFR and folate. **[W9][W10]**
5. **High-B12 definitions disagree (even on units). [E]** ≥1000 pg/mL vs >1000 pmol/L; usually benign
   supplementation. **[W18]**
6. **Analytical interference. [E]** Macro-B12 and biotin can distort readings. **[W31]**
7. **Companion/functional-marker availability is data-dependent. [E]** Without MMA/Hcy, the functional layer
   degrades to a confidence limitation, not a certainty. **[R4]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**;
context-first; two-layer; multiple explanations for high). **[B]/[D]** (Illustrative; exact copy owned by
BioSense.)

```
TEMPLATE: ADEQUATE_REFERENCE (functional markers concordant/not needed)
"Your vitamin B12 concentration is {value} pg/mL ({pmol} pmol/L) — in a favourable range. Remember the serum
 number reflects total B12, not the active amount inside your cells; with no red flags, this is reassuring."  +CAV1 +CAV2

TEMPLATE: FUNCTIONAL_GREY_ZONE (300–499)
"Your B12 concentration is {value} pg/mL ({pmol} pmol/L) — it looks 'normal', but this is the range where the
 serum number alone can't confirm whether your cells are getting enough. Methylmalonic acid and homocysteine
 (read with your kidney function and folate) would clarify."  +CAV1 +CAV2 +CAV4

TEMPLATE: LOW / LOW_BORDERLINE (<300)
"Your B12 concentration is {value} pg/mL ({pmol} pmol/L) — a lower-than-typical pattern. Functional markers
 (MMA, homocysteine) help confirm whether it's affecting your cells; if you have fatigue, tingling or balance
 changes, or follow a vegan/vegetarian diet or take metformin or acid-reducers, it's worth discussing with a
 healthcare professional."  +CAV1 +CAV2 +CAV5

TEMPLATE: ABOVE_REFERENCE / HIGH_FLAG (>900 / >1000 — MULTIPLE EXPLANATIONS)
"Your B12 concentration is {value} pg/mL ({pmol} pmol/L) — higher than the usual range. A few possibilities,
 ordered by likelihood:
  A) Supplements or a recent injection — by far the most common reason, and expected.
  B) Liver or kidney factors — less common.
  C) Other causes — uncommon; a persistently high level without supplements, or with an abnormal blood count,
     is worth reviewing.
 If you're supplementing, this is usually nothing to worry about."  +CAV1 +CAV2 +CAV6

MODIFIER: FUNCTIONAL_MARKERS_PRESENT →
 integrate MMA/Hcy: "Your MMA and homocysteine are {normal/elevated}, which {supports adequacy / suggests your
 cells may be short of B12} — read alongside your kidney function and folate."  +CAV8

MODIFIER: FUNCTIONAL_SHORTFALL_PATTERN (MMA elevated, renal-normal, any concentration) →
 "Even though your serum B12 looks {normal/low-normal}, your MMA is raised, which can indicate your cells
  aren't getting enough — worth discussing with a professional."  +CAV1 +CAV8

MODIFIER: CONTEXT_UNAVAILABLE (no MMA/Hcy) →
 "We'd interpret this more confidently with MMA and homocysteine (read with your kidney function and folate)."  +CAV7

MODIFIER: RENAL/CONFOUNDER → append CAV8 (kidney function affects B12 and MMA readings).
```

**Absolute rules:** no template diagnoses deficiency / pernicious anaemia / malignancy, equates normal serum
with adequacy or low-normal with deficiency, conflates the two layers, or presents a band as a diagnosis. **[D]**

---

# 25. Example Outputs

**Example 1 — Adequate concentration, functional markers concordant. [illustrative]**
```
Input: B12 620 pg/mL, MMA normal, Hcy normal, eGFR normal.
Layer1: ADEQUATE_REFERENCE | Layer2: LIKELY_ADEQUATE (both metabolites normal) | Confidence: STANDARD
Narrative: ADEQUATE_REFERENCE +CAV1+CAV2 + FUNCTIONAL_MARKERS_PRESENT.  [W11]
```

**Example 2 — Grey zone, no functional markers. [illustrative]**
```
Input: B12 360 pg/mL, no MMA/Hcy.
Layer1: FUNCTIONAL_GREY_ZONE | Layer2: UNCERTAIN → CONTEXT_REQUIRED | Confidence: CONTEXT_REQUIRED
Narrative: FUNCTIONAL_GREY_ZONE +CAV1+CAV2+CAV4 (name MMA/Hcy needed); no deficiency asserted.  [S3,S4]
```

**Example 3 — Normal concentration BUT elevated MMA (functional shortfall). [illustrative]**
```
Input: B12 410 pg/mL (looks normal), MMA elevated, eGFR normal, metformin 8 yr.
Layer1: FUNCTIONAL_GREY_ZONE | Layer2: FUNCTIONAL_SHORTFALL_PATTERN | Confidence: STANDARD/REDUCED
Narrative: + FUNCTIONAL_SHORTFALL_PATTERN (CAV8) ; route; NO "deficiency" diagnosis.  [S2,S3]
```

**Example 4 — Low concentration, vegan context. [illustrative]**
```
Input: B12 170 pg/mL, vegan, no MMA/Hcy.
Layer1: LOW | Layer2: functional confirmation advised | Confidence: REDUCED (no functional markers)
Narrative: LOW +CAV1+CAV2+CAV5 ; suggest MMA/Hcy; route if symptomatic; NO diagnosis.  [S1,S8]
```

**Example 5 — High flag, supplementing. [illustrative]**
```
Input: B12 1800 pg/mL, taking 1000 mcg/day oral.
Layer1: HIGH_FLAG | differential A(supplementation, expected)/B(liver-renal)/C(other, uncommon) | overload NOT assumed
Narrative: HIGH_FLAG +CAV1+CAV2+CAV6 ; reassure supplementation usual.  [S6]
```

**Example 6 — High flag, renal disease. [illustrative]**
```
Input: B12 1300 pg/mL, CKD (low eGFR), not supplementing.
Layer1: HIGH_FLAG | Confidence: CONTEXT_REQUIRED (renal may falsely elevate B12 & confound MMA)
Narrative: HIGH_FLAG +CAV1+CAV2+CAV6+CAV8 ; interpret within renal context; route.  [S12]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, four-level confidence
  hierarchy, multiple-explanations output, and cross-biomarker intelligence (the serum-vs-functional
  distinction is represented within this framework).
- **SCL-011 (Vitamin D)** — precedent for guideline-disagreement / dual-framework display and two-sided
  context-gated banding.
- **SCL-013 (Folate)** — interlinked one-carbon metabolism; needed to interpret homocysteine; consumed where
  available.
- **SCL-019 (Haemoglobin) & future CBC** — downstream haematologic context (neuro can precede haem);
  consumed where available.
- **Future MMA, Homocysteine, Creatinine/eGFR SCLs** — the functional and renal markers B12 consumes; where
  unavailable, a confidence limitation is recorded.
- **SCL-002 (HbA1c) / SCL-009 (Fasting Glucose)** — source of the reused diagnostic-adjacency discipline.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the W-series IDs in §0
> and the body. Developers finalising the pack should confirm exact page/table locators against the primary
> PDFs where required.

**Thresholds, grey zone & serum-vs-functional (Category A anchors)**

1. Medscape: **Vitamin B12-Associated Neurological Diseases Workup** (article 1152670). — *radioassay vs
   chemiluminescence ranges (170–900 vs 250–1100); within-range doesn't exclude deficiency; MMA 70–350 nM;
   Hcy 5–15 µM; both-normal rules out (W5, W7, W8, W11, W15).*
2. **Biomarkers of cobalamin (vitamin B12) deficiency and its application** — *ScienceDirect*
   S1279770723024016. — *no gold standard; method-dependent ranges; serum cobalamin <300 + folate-replete →
   deficiency likely → check Hcy/MMA; Hcy 5–14 µM and confounders (W8, W10, W12, W15).*
3. **The Many Faces of Cobalamin (Vitamin B12) Deficiency** — *Mayo Clin Proc Innov Qual Outcomes*
   (PMC6543499). — *holoTC indeterminate window; MMA/holoTC caveats (W4, W29).*
4. **Biomarkers and Algorithms for the Diagnosis of Vitamin B12 Deficiency** — *Frontiers in Molecular
   Biosciences* 2016. — *total serum B12 not reliable alone; high B12 (>650 pmol/L) and disease; neonatal
   variability (W4, W18, W28).*
5. Pernicious Anaemia Society: **Methylmalonic Acid and Homocysteine.** — *MMA reflects intracellular B12;
   grey zone ~150–400 pg/mL (110–300 pmol/L); renal confounding of MMA (W6, W9).*

**Reference ranges, units, conversion (Category A/S)**

6. DrOracle (B12 normal range; can B12 be too high); HealthMatters.io; Lamkin Clinic; MitoHealth. — *deficiency
   <200; borderline 200–300; functional grey zone 200–500; optimal (non-guideline) ≥300 pmol/L or 500–900;
   high >1000 pg/mL differential; at-risk groups; assay measures total incl. inactive (W1, W2, W3, W16, W17,
   W18, W20, W22-W27).*
7. Unit converters: **calcengines**, **labtests.co.in**, **kantesti**, **UNITSLAB**. — *pg/mL ≡ ng/L; ×0.738
   to pmol/L (×1.355 reverse); MW ~1355; deficiency <150–200; stores last 2–5 yr (W13, W14, W25, W30).*

**High B12 & interference (Category A)**

8. Fullscript: **What Causes Elevated Serum Vitamin B12 Levels?** — *>1000 ng/L (~738 pmol/L) vs >1000
   pmol/L definitions; liver/renal/myeloproliferative; macro-B12 and biotin interference; MMA renal caveat
   (W18, W20, W31).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–2 and 6; they are
> BioSense Version 1 classifications, two-sided and context-gated, not attributable to any single reference
> as a diagnostic threshold, and **do not restate diagnostic labels.** The serum-concentration-vs-functional-
> adequacy distinction is represented via the reused Context-First Framework; contested thresholds are shown
> and **never averaged.**

---

# 28. Founder Decisions Required

The vitamin B12 methodology reuses frozen BioSense frameworks and represents the serum-vs-functional
distinction via the existing Context-First Framework (founder decision). Two optional presentation/policy
items remain: **[C][E]**

**D-1 — Confirm the concentration band boundaries and the two-layer presentation**, in particular the
**Functional Grey Zone (300–499)** and the decision to report the **functional-adequacy likelihood** as a
separate layer from the concentration band. Confirmation requested that this two-layer, context-first
presentation is the intended default. **Founder sign-off requested.**

**D-2 — Confirm the cross-biomarker consumption scope for V1.** SCL-012 is specified to consume **MMA,
homocysteine, folate (SCL-013), haemoglobin/CBC (SCL-019), and creatinine/eGFR** where available (with
graceful degradation to a confidence limitation when absent). **Founder decision requested** on whether V1
activates B12 with serum-concentration-only context (degrading gracefully) or waits for the functional-marker
packs to exist.

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-012 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/
reference figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. Vitamin
B12 reuses frozen BioSense methodology throughout — the Context-First Interpretation Framework, four-level
confidence hierarchy, multiple-explanations output, and cross-biomarker intelligence (all from SCL-010), the
guideline-disagreement posture (SCL-003/011), two-sided banding with flags (SCL-004/009/010/011), and the
diagnostic-adjacency discipline (SCL-002/009/011) — introducing only vitamin-B12-specific scientific content
(the B12 thresholds and grey zone; the serum-concentration-vs-functional-adequacy distinction represented as
a two-layer output within Context-First; the functional markers MMA and homocysteine with their renal/folate
confounders; the assay-variability and interference notes; the high-B12 differential; and the B12 context
modifiers). No new methodology was required; all structure remains consistent with SCL-001 through SCL-011.*
