# SCL-013 — FOLATE (VITAMIN B9)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. Serum-concentration-vs-functional/tissue-adequacy represented via the existing Context-First Framework. No new methodology introduced.*

**Document ID:** SCL-013
**Biomarker:** Folate (Vitamin B9) — serum folate (primary), with RBC folate as tissue-store context
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Folate reuses the frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), the four-level confidence hierarchy (SCL-010), multiple-explanations output (SCL-010), cross-biomarker intelligence (SCL-010), two-sided banding (SCL-004/009/010/011/012), guideline-disagreement handling (SCL-003/011/012), the concentration-vs-functional two-layer pattern (SCL-012), and the diagnostic-adjacency discipline (SCL-002/009/011/012) — introducing only folate-specific scientific content. All sections remain consistent with SCL-001 through SCL-012.

---

> **What this document is.** SCL-013 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for folate. It reuses existing BioSense
> methodology and does not redesign the Constitution, the ENG documents, the Blood Analysis Engine, or the
> SCL architecture. **No new methodology is introduced.**
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

## STRUCTURAL-FIT NOTE (Folate vs SCL-001) — reuses frozen frameworks; no new pattern

Folate presents the same structural characteristics BioSense has already solved for, and maps onto the
frozen methodology without extension:

1. **Concentration-vs-functional/tissue two-layer — reused (SCL-012 pattern, via Context-First).** Serum
   folate reflects **recent intake** and is an unreliable index of tissue stores; **RBC folate** reflects
   **tissue stores (a 3–4-month average)**; **homocysteine** is the functional marker. BioSense reports (1)
   the circulating (serum) concentration and (2) the functional/tissue adequacy, exactly as it does for B12
   (§8, §11, §12).
2. **Cross-biomarker intelligence — reused (SCL-010).** Folate consumes **vitamin B12 (SCL-012),
   homocysteine, haemoglobin/CBC (especially MCV), and renal function** where available (§9).
3. **A folate-specific safety point handled by existing rules: B12 masking.** High or normal folate does
   **not** reassure about B12, and high folic acid can mask/worsen the neurological damage of a concurrent
   B12 deficiency — represented with the diagnostic-adjacency discipline and cross-biomarker pairing, not a
   new mechanism (§0.6, §9, §19).
4. **Guideline-disagreement handling — reused (SCL-003/011/012).** The lower reference limit genuinely
   varies (≈2.0–7.0 ng/mL), the post-fortification reference is debated, and the neural-tube-defect
   thresholds are a separate (reproductive-age) framework — presented as differing frameworks, never
   averaged (§10, §11).
5. **Two-sided banding with flags — reused; low-dominant.** The clinically meaningful end is **low**
   (deficiency); the high end is **essentially non-toxic** but flags supplementation / unmetabolised folic
   acid / possible masked B12 (§11).
6. **Multiple-explanations output — reused (SCL-010).** High and discordant results get ranked possibilities
   (§11, §14).
7. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012).** BioSense never emits "deficiency,"
   "megaloblastic anaemia," or "neural tube defect risk" as a diagnosis; it detects the pattern, routes, and
   names nothing (§18, §19).

**Biomarker-specific content introduced:** the folate thresholds and the serum-vs-RBC distinction; the
homocysteine functional link and its confounders; the B12-masking safety point; the NTD reproductive-age
context; the high-folate/unmetabolised-folic-acid handling; and the folate context modifiers. **No new
methodology is required.** **[C]**

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

Folate carries two subtleties that BioSense treats with care. First, like B12, the serum number and the
body's real folate status can diverge: serum folate rises and falls with **recent meals and supplements**,
while the **red-cell folate** and the functional marker **homocysteine** reflect what tissues actually
have. BioSense therefore reports two layers — the circulating concentration and the functional/tissue
adequacy — rather than reading the serum number alone. Second, folate and vitamin B12 are metabolically
entwined: a high or even normal folate can *mask* the blood signs of a B12 deficiency while its
neurological damage continues, so BioSense never lets a reassuring folate number stand in for B12, and
pairs the two whenever a deficiency pattern is possible. It shows the genuinely differing folate thresholds
rather than splitting them, treats the low end as the meaningful one while flagging what a high folate
usually means, and names no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as
the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate folate. Every value carries a source ID (F-series / R-series → §27)
> and a category tag. Canonical unit: ng/mL serum (store nmol/L in parallel; RBC folate held separately).
> **Two-layer (concentration + functional/tissue adequacy), low-dominant two-sided, context-first.**

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: ng/mL (serum folate)   # store nmol/L parallel ; RBC folate held as separate tissue-store input
nmol/L = ng/mL × 2.266 ; ng/mL = nmol/L × 0.441   (folate factor, MW ~441 — NOT 38.67/88.57/18.0/2.496/0.738)  [F14]
Always retain value_reported + unit_reported + sample_type (serum vs RBC) + available context. Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding; expresses serum≠functional/tissue
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1][R8]
  FUNCTIONAL/TISSUE markers: RBC folate (tissue stores, 3–4 mo avg), homocysteine (functional);            [F8,F12]
  co-marker (CRITICAL): vitamin B12 (SCL-012) — folate & B12 interlinked; B12-masking risk;                [F16,F19]
  haematology: haemoglobin / CBC / MCV (SCL-019, future CBC) — megaloblastic overlap;                      [F19]
  renal: creatinine/eGFR (confounds homocysteine);                                                         [F13]
  intake/absorption: dietary intake, supplementation (folic acid), alcohol, malabsorption (celiac/Crohn),
     GI/bariatric surgery, medications affecting folate;                                                   [F20,F21,F23]
  life-stage/other: pregnancy (NTD context), liver disease, MTHFR/methylation context.                     [F22,F26,F27]
CORE RULE: serum folate reflects RECENT INTAKE and is an unreliable index of tissue stores.                [F8,F9][R8]
  → report TWO layers: (1) circulating (serum) concentration band (§0.3); (2) functional/tissue adequacy (§0.4).
IF material context / functional markers change meaning → interpret WITHIN that context.                    [R1]
IF functional markers (RBC folate / homocysteine) or B12 or key context unavailable → CONFIDENCE LIMITATION, not certainty. [R4]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands (serum concentration) — [B] (synthesis of [A] anchors F1-F5,F17) — LOW-DOMINANT TWO-SIDED
```
FOLATE_SERUM_CONCENTRATION_BAND (ng/mL, general adult, primary prevention, not pregnant) — after context gate:
  DEFICIENT              v < 3           # serum deficiency (<6.7 nmol/L) [F1][F2]
  INSUFFICIENT           3 <= v < 4      # insufficiency / low (<~7 nmol/L decision zone) [F1]
  LOW_BORDERLINE         4 <= v < 6      # below the homocysteine-effect decision zone lower end; watch [F6]
  ADEQUATE_REFERENCE     6 <= v <= 20    # within a favourable reference range [F4]
  HIGH                   20 < v <= 40    # above reference; usually supplementation (UMFA context) [F5][F17]
  HIGH_FLAG              v > 40          # markedly high (>~40 nmol equiv often supplementation); check B12/UMFA context [F17][F18]
DIRECTION: LOW-DOMINANT TWO-SIDED (low = deficiency pattern = the meaningful end; high = essentially non-toxic but flags supplementation / possible masked B12). [R6][F15]
nmol/L parallels (×2.266): 3≈6.8 | 4≈9.1 | 6≈13.6 | 20≈45.3 | 40≈90.6
UNIT: serum ng/mL canonical; nmol/L ×2.266. RBC folate held SEPARATELY (tissue-store input, §0.4).  [F14]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never a diagnostic label. [B][D]**

## 0.4 Functional/tissue-adequacy layer — [C] — via Context-First (R8), the serum≠tissue distinction
```
FUNCTIONAL_TISSUE_ADEQUACY (a SEPARATE output from the serum concentration band; never conflated):
  drivers: serum band + RBC folate + homocysteine + B12 + context.
  RBC folate adequate AND homocysteine normal → tissue stores adequate → LIKELY_ADEQUATE (higher confidence). [F8,F12]
  RBC folate low (<140 ng/mL) → depleted tissue stores even if serum recently normalised → TISSUE_DEPLETION_PATTERN. [F7,F8]
  homocysteine elevated with NORMAL MMA (folate-pattern, not B12) → functional folate shortfall. [F12]
  serum normal/high but RBC unavailable AND recent supplementation → serum may reflect recent intake, not stores → UNCERTAIN / CONTEXT_REQUIRED. [F8,F24][R4]
NEVER equate: normal/high serum folate = definite tissue adequacy ; serum recently supplemented = resolved deficiency.  [F9][R8]
Explain the DEGREE OF CONFIDENCE from context; missing RBC folate / homocysteine / B12 = confidence limitation, not certainty. [R4]
```

## 0.5 B12-masking & discordance handling — [A]+[C] — folate-specific safety, via existing cross-marker discipline
```
B12-MASKING (safety-critical): high or normal folate NEVER reassures about B12; folic acid can mask the
  haematological signs while B12 neurological damage progresses → where a B12-deficiency pattern is possible,
  PAIR with B12 (SCL-012) and route; never imply folate adequacy resolves a B12 question.                   [F16,F19]
MEGALOBLASTIC OVERLAP: folate and B12 deficiency both cause megaloblastic/macrocytic changes (indistinguishable
  on CBC alone) → measure BOTH; MCV is downstream and non-specific.                                          [F19]
DISCORDANCE (surface, never average): high serum + low RBC → recent supplementation not yet in RBCs, OR a
  B12 block of methionine synthase → check B12/MMA; normal folate + high homocysteine → possible functional/
  MTHFR block → present as possibilities.                                                                    [F25,F26][R3]
```

## 0.6 Confidence hierarchy (four-level) — [C] — REUSED (SCL-010)
```
STANDARD          : clear serum band AND (RBC/homocysteine concordant OR clearly not needed) AND no B12-masking concern.
REDUCED           : single value / assay uncertainty / recent supplementation / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : serum normal/high but RBC/homocysteine unavailable and stores in question; or possible B12-masking
                    without B12 available → functional/tissue layer withheld or qualified; name what's needed.  [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / ineligible population — explained abstention. [R2]
Reduced confidence does NOT auto-block; significant contextual uncertainty MAY justify abstention.           [R2]
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  Folate is NOT a diagnosis. NEVER emit "deficiency", "megaloblastic anaemia", "pernicious anaemia", or
    "neural tube defect risk" as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  Serum folate reflects RECENT INTAKE, NOT tissue stores; report the two layers separately.                [F8,F9][R8]
S3  NEVER equate normal/high serum folate = definite tissue adequacy, or a recently supplemented serum = resolved deficiency. [F9]
S4  B12-MASKING: high/normal folate NEVER reassures about B12; pair with B12 where a deficiency pattern is possible; route. [F16]
S5  Functional marker homocysteine is confounded (B12, B6, renal, MTHFR, liver) — qualify; folate-pattern needs normal MMA. [F12,F13]
S6  HIGH / HIGH_FLAG → NOT a toxicity finding (folate essentially non-toxic); flags supplementation / UMFA / possible masked B12. [F15,F16]
S7  Never recommend specific folate/folic-acid doses or supplementation regimens.
S8  Cross-markers (RBC folate/homocysteine/B12/MCV/eGFR) unavailable → confidence limitation, not invented certainty. [R4]
S9  Never produce a numeric disease-risk % from folate.
S10 On any medication/supplement question → educational context + refer (esp. methotrexate/anticonvulsants — never advise changes). [F21]
S11 Never present a BioSense band as a medical/diagnostic boundary.
S12 Pregnancy/reproductive-age NTD thresholds are a SEPARATE context framework (RBC ≥400 ng/mL); pregnancy-aware; never infer context from the value. [F10,F22]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & COMPANION MARKERS (the key folate move): where serum is low/borderline OR stores are in question,
   consider RBC folate (tissue stores) and homocysteine; ALWAYS consider B12 where a deficiency pattern is possible. [F8,F12,F16]
Tier 2 LIFESTYLE (context-appropriate): folate-rich foods (leafy greens, legumes, fortified foods); note alcohol,
   malabsorption, GI surgery, and folate-affecting medications as context (food-first framing).             [F20,F21,F23]
Tier 3 HEALTHCARE DISCUSSION (calm) when: DEFICIENT / INSUFFICIENT | tissue-depletion or functional-shortfall pattern |
   possible B12-masking | pregnancy/reproductive-age planning | medication (e.g. methotrexate) or supplement question. [F22][D]
NEVER a specific dose or regimen at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → serum concentration band + functional/tissue adequacy layer → template; possibilities where discordant/high.
ADEQUATE_REFERENCE (markers concordant/not needed) → affirming, with the serum≠tissue caveat where relevant.
DEFICIENT / INSUFFICIENT / LOW_BORDERLINE → constructive; RBC folate/homocysteine clarify; ALWAYS consider B12; route if symptomatic; NEVER assert deficiency.
HIGH / HIGH_FLAG → calm; usually supplementation; NOT toxicity; consider UMFA & possible masked B12; check B12.
functional/tissue markers present → integrate (RBC folate, homocysteine), with confounders; B12 paired.
markers / context unavailable → state confidence limitation; name what would clarify.
Never "normal/abnormal" as a verdict; never a diagnosis (deficiency/megaloblastic/NTD).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Serum folate reflects your recent intake more than your body's stores — red-cell folate and homocysteine
      give a better picture of tissue status, so this is best read alongside them and your wider context."
CAV3 (reduced/context) name the context reducer(s) or missing marker (RBC folate, homocysteine, B12, MCV, eGFR).
CAV4 (B12-masking, safety) "Folate and vitamin B12 are linked: a normal or high folate doesn't rule out a B12
      problem, and can even hide its blood signs — so it's important to check B12 too where relevant."
CAV5 (low pattern) "This is a lower-than-typical folate pattern; if you drink regularly, have absorption issues,
      are pregnant or planning pregnancy, or take certain medications, it's worth discussing with a professional."
CAV6 (high) "A high folate is usually from supplements or fortified foods and isn't considered toxic; it's still
      worth making sure B12 is adequate and reviewing very high supplement doses with a professional."
CAV7 (markers unavailable) "We'd interpret this more confidently with red-cell folate, homocysteine, and vitamin B12."
CAV8 (homocysteine confounder) "Homocysteine is also affected by B12, kidney function and genetics, so it's read with those in mind."
CAV9 (pregnancy/NTD context) "Around pregnancy, folate targets are higher and measured differently — this is best guided by a professional."
```

## 0.11 Source & version identifiers
```
config_id: SCL-013   config_version: 1.0
serum_band_id: BIOSENSE_FOLATE_SERUM_BANDS_v1            (Category B; low-dominant two-sided; anchors F1-F5,F17)
functional_tissue_id: SCL013_FUNCTIONAL_TISSUE_ADEQUACY_v1  (serum≠tissue via Context-First; R8; F8,F9,F24)
b12_masking_rule_id: SCL013_B12_MASKING_SAFETY_v1        (F16,F19 — safety-critical)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1   (reused; R2)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1   (reused; R3)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1     (reused; R4 — B12/homocysteine/Hb-CBC-MCV/eGFR/RBC-folate)
guideline_disagreement_ref: SCL011/012 posture          (reused; R5)
ntd_context_id: SCL013_NTD_REPRODUCTIVE_CONTEXT_v1       (F10,F11,F22 — separate context framework)
safety_rules_id: SCL013_SAFETY_v1                        (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Folate (vitamin B9) is a water-soluble B vitamin essential for DNA synthesis, red blood cell formation, and
— critically — one-carbon metabolism, where it works hand-in-hand with vitamin B12. **[A]** The common test
is **serum folate**; its defining subtlety, and the reason BioSense reports it in two layers, is that serum
folate largely reflects **recent dietary intake** and is an unreliable index of tissue stores. <cite index="0-2">Serum folate is not a good indicator of tissue folate stores because it reflects recent dietary intake.</cite> **[A][F8][F9]** **Red-cell (RBC) folate** reflects **tissue stores** — a 3–4-month average — and **homocysteine** is the functional marker that rises when folate (or B12) is functionally short. **[A][F8][F12]**

Folate is also inseparable from **vitamin B12**: the two share the one-carbon pathway, both deficiencies
cause the same megaloblastic blood picture, and — importantly for safety — a high or normal folate can
**mask** the blood signs of a B12 deficiency while its neurological damage continues. So BioSense always
pairs folate with B12 where a deficiency pattern is possible and never lets a reassuring folate stand in
for B12. **[A][F16][F19]**

- **Official name:** Folate (vitamin B9); folic acid is the synthetic supplement form
- **Common abbreviation:** folate
- **Reported in:** ng/mL and nmol/L (×2.266); serum (primary) and RBC (tissue stores) **[A][F14]**
- **Key distinction:** circulating (serum) concentration ≠ functional/tissue adequacy **[A][F8][F9]**
- **Direction:** low-dominant two-sided (low is the meaningful end; high essentially non-toxic) **[A][F15]**
- **BioSense role:** A context-first marker reported in two layers, read with B12, homocysteine, RBC folate, and CBC/MCV.

---

# 2. Physiological Function

Folate donates one-carbon units for making DNA bases and for **remethylating homocysteine to methionine** —
a step that also requires vitamin B12. **[A][F12]** When folate is functionally short, DNA synthesis in
fast-dividing cells (like red-cell precursors) falters, producing large, immature cells (megaloblastic
change), and homocysteine rises. **[A][F19]** Because that final remethylation step needs both folate and
B12, the two vitamins are metabolically entwined — the basis of both the megaloblastic overlap and the
B12-masking concern. **[A][F16]**

Two points define interpretation **[A]**:
- **Serum vs stores.** Serum folate tracks recent intake; RBC folate tracks tissue stores; homocysteine
  tracks function. BioSense reports the concentration and the functional/tissue layers separately. **[A][F8]**
- **Folate–B12 coupling.** A folate result is never interpreted in isolation from B12 where a deficiency
  pattern is possible. **[A][F16]**

---

# 3. Scientific Background

Serum folate thresholds are recognised but genuinely contested, and the reference limits shifted after
population folic-acid fortification. Deficiency is commonly flagged below ~3–4 ng/mL, but the lower
reference limit reported across sources ranges widely. <cite index="0-2">The lower reference limit for serum folate has been reported to range from 2.0 to 7.0 ng/mL, and there is no consensus on the appropriate cutoff.</cite> **[A][F1][F3]** Post-fortification, a higher adult reference (≈5.8–32.8 ng/mL) and even a revised lower limit near 13 ng/mL have been proposed. **[A][F5]**

The central scientific point mirrors B12: **serum folate is an unreliable index of tissue stores**, so RBC
folate and homocysteine are used to assess true status. **[A][F8][F9]** For **reproductive-age women**, a
distinct framework applies — the WHO neural-tube-defect-prevention target of **RBC folate ≥400 ng/mL (906
nmol/L)** (serum equivalent ≈24.3–25.5 nmol/L) — which is a *preventive* threshold, not a general adequacy
cut-off. **[A][F10][F11]**

At the high end, folate is **essentially non-toxic** — hypervitaminosis is not documented. <cite index="0-2">There are no known ill-effects from consuming excessive amounts of folate.</cite> **[A][F15]** But a high folate is not meaningless: excess synthetic folic acid can leave **unmetabolised folic acid** in circulation and can **mask** a concurrent B12 deficiency, so a high folate prompts a B12 check rather than reassurance. **[A][F16][F18]**

**The wellness reading — [B]:** folate is a modifiable, context-first marker best reported in two layers
(serum concentration + functional/tissue adequacy), always read alongside B12, shown against differing
thresholds, and never named as a diagnosis.

**An honest boundary — [E]:** the serum thresholds are contested and fortification-shifted, serum is an
imperfect standalone marker, and the functional marker (homocysteine) is confounded — so BioSense leans on
context and companion markers and is explicit about confidence. **[E][F3][F13]**

---

# 4. Why Folate Matters

**1. It is essential, and its shortage is consequential. [A][F19][F22]** Folate supports blood formation and
DNA synthesis; deficiency causes megaloblastic anaemia, and low folate around conception is linked to
neural-tube defects — making it a high-value preventive marker, especially in reproductive-age women. **[A]**

**2. Serum ≠ tissue/function. [A][F8][F9]** Because serum can mislead (it tracks recent intake), honest
two-layer, context-first interpretation adds real value over a naive "normal/abnormal" read. **[A]**

**3. It is inseparable from B12 — with a safety twist. [A][F16]** A reassuring folate can hide a B12 problem;
pairing the two is a genuine wellness-safety contribution. **[A]**

**Why BioSense measures it — [C]:** folate is a modifiable, high-value marker whose serum-vs-tissue subtlety
and B12 coupling are exactly what the Context-First and cross-biomarker frameworks are for — reported in two
layers, read with B12/homocysteine/RBC folate, and interpreted honestly.

---

# 5. Laboratory Measurement

Folate status is measured as **serum folate** (primary) and, for tissue stores, **RBC folate**. **[A]**

- **Reported in ng/mL and nmol/L** (×2.266). **[A][F14]**
- **Serum vs RBC.** Serum reflects recent intake (drops first in early depletion); **RBC folate reflects
  tissue stores (3–4-month average)** and is the more accurate status marker — the two are best ordered
  together. **[A][F8][F24]**
- **Fasting preferred** for serum status assessment. **[A][F28]**
- **Assay/reference variability.** Reference limits vary by method and shifted after fortification; the lab's
  range and method matter. **[A][F3][F5]**
- **Functional confirmation.** Homocysteine (with normal MMA) supports a folate-pattern functional shortfall;
  it is confounded by B12/B6/renal/MTHFR/liver. **[A][F12][F13]**

---

# 6. Units

- **ng/mL** — standard in the US. **BioSense canonical unit (serum).** **[A/C]**
- **nmol/L** — SI unit, standard elsewhere. **[A]**
- Conversion factor **2.266** (ng/mL → nmol/L; ×0.441 reverse), from folate's molecular weight (~441 g/mol) —
  **not** the cholesterol (38.67), triglyceride (88.57), glucose (18.0), 25(OH)D (2.496), or B12 (0.738)
  factor. **[A][F14]**
- **RBC folate** is reported in the same units but held **separately** as a tissue-store input (not banded on
  the serum bands). **[C]**

BioSense stores the reported value, unit, and sample type (serum vs RBC) unchanged and computes the parallel
unit. **[C]**

---

# 7. Unit Conversion

```
nmol/L = ng/mL × 2.266
ng/mL  = nmol/L × 0.441
```
Worked checks: 3 ng/mL ≈ 6.8 nmol/L; 4 ≈ 9.1; 6 ≈ 13.6; 20 ≈ 45.3 nmol/L. **[A][F14]**

**Safety rule [D]:** the folate factor (2.266) is analyte-specific — never a lipid/glucose/vitamin-D/B12
factor; a unit-unknown value is displayed but not interpreted; serum and RBC folate are never conflated. **[D]**

---

# 8. Measurement Limitations & the Serum-vs-Tissue Distinction  *(Context-First basis — reused SCL-010)*

Folate's defining limitation is that a **serum concentration does not, on its own, establish tissue/functional
status** — which is why the Context-First gate (§0.2) and the two-layer output (§0.3–§0.4) apply. **[A]**

## 8.1 Serum vs tissue — [A]
Serum folate reflects **recent intake** and is an unreliable index of tissue stores; **RBC folate** reflects
tissue stores (3–4-month average). A recently supplemented serum can look adequate while stores are still
low. **[A][F8][F9][F24]**

## 8.2 The functional marker and its confounders — [A]
**Homocysteine** rises when folate is functionally short; a folate pattern shows **elevated homocysteine with
normal MMA** (B12 raises both). Homocysteine is confounded by **B12, B6, renal insufficiency, MTHFR
genetics, and liver disease**. **[A][F12][F13]**

## 8.3 The B12 coupling (safety) — [A]
Folate and B12 share the one-carbon pathway; both deficiencies cause the same megaloblastic picture, and
high folic acid can **mask/worsen** a concurrent B12 deficiency. A folate result is therefore always
interpreted with B12 in mind where a deficiency pattern is possible (§9, §19). **[A][F16][F19]**

## 8.4 Assay/reference variability & fortification — [A]
Reference limits vary by method and shifted after population fortification; the lower reference limit has no
consensus (≈2.0–7.0 ng/mL). Method context is a confidence input. **[A][F3][F5]**

## 8.5 Reproductive-age NTD context — [A]
A separate preventive framework applies for reproductive-age women (RBC folate ≥400 ng/mL / serum ≈24.3–25.5
nmol/L); it is context, not a general adequacy band. **[A][F10][F11]**

**How BioSense uses this — [C][D]:** the Context-First gate runs first; the serum concentration band and the
functional/tissue-adequacy layer are reported **separately**; B12 is paired where a deficiency pattern is
possible; missing markers set Context-Required/Reduced confidence; and neither "normal serum = tissue
adequacy" nor "high folate = reassurance about B12" is ever asserted.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010)*

Folate consumes its functional, co-, and companion markers where available. **[A][C]**

- **Vitamin B12 (SCL-012). [A]** The critical companion. Folate and B12 are metabolically interlinked; both
  cause megaloblastic anaemia; **high/normal folate never reassures about B12** and folic acid can mask a B12
  deficiency — so BioSense **pairs folate with B12** wherever a deficiency pattern is possible (§19). **[A][F16][F19]**
- **Homocysteine. [A]** The functional marker: elevated homocysteine with **normal MMA** supports a
  folate-pattern shortfall; confounded by B12/B6/renal/MTHFR/liver. **[A][F12][F13]**
- **RBC folate. [A]** The tissue-store marker (3–4-month average) — the functional/tissue layer's primary
  input; low RBC folate signals depleted stores even if serum has recently normalised. **[A][F7][F8]**
- **Haemoglobin / CBC / MCV (SCL-019, future CBC). [A]** Macrocytosis (high MCV)/anaemia is the downstream
  consequence, shared with B12 and non-specific — supports pairing folate and B12. **[A][F19]**
- **Creatinine / eGFR. [A]** Renal function confounds homocysteine — read the functional marker with eGFR. **[A][F13]**
- **(Context) liver disease. [A]** Lowers serum folate and raises homocysteine — material context. **[A][F27]**

**Cross-biomarker rule [C] (reused R4):** where these are **available**, BioSense consumes them (with their
confounders and the B12 pairing) to sharpen both layers and confidence; where **unavailable**, it records a
**confidence limitation** and names what would clarify — never inventing certainty. **[C][R4]**

**Discordance (surface, never average) [C]:** high serum + low RBC folate → recent supplementation not yet in
red cells, **or** a B12 block of methionine synthase → check B12/MMA; normal folate + high homocysteine →
possible functional/MTHFR block → present as ranked possibilities (§14). **[C][F25][F26][R3]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Serum folate is an unreliable index of tissue stores** (reflects recent intake); RBC folate reflects
  stores. **[A][F8][F9]**
- **Deficiency is flagged low** (commonly <3–4 ng/mL / <7 nmol/L). **[A][F1][F2]**
- **Homocysteine is the functional marker** (folate pattern: high Hcy, normal MMA). **[A][F12]**
- **Folate & B12 both cause megaloblastic anaemia; measure both; folate can mask B12.** **[A][F16][F19]**
- **Folate is essentially non-toxic at the high end.** **[A][F15]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **The lower reference limit is contested** (≈2.0–7.0 ng/mL; no consensus), and **post-fortification**
  references (≈5.8–32.8 ng/mL, even a revised lower limit ~13) are debated. **[A][F3][F5]**
- **Decision limits for *function* differ from reference cut-offs** (e.g. <8 µg/L for homocysteine effect). **[A][F6]**
- **NTD thresholds are a separate reproductive-age framework** (RBC ≥400 ng/mL; serum ≈24.3–25.5 nmol/L). **[A][F10][F11]**
- **Why:** folate is a continuous, intake-sensitive, fortification-shifted marker with different purposes
  (deficiency screening vs functional decision vs NTD prevention). BioSense **presents the differing
  thresholds and never averages them** (reused R5). **[A][E]**

## 10.3 Strength of evidence
- **Serum≠tissue; RBC folate & homocysteine as status/functional markers: established.** **[A][F8][F12]**
- **Deficiency low cut-off (<3–4 ng/mL): established (with contested lower reference limit).** **[A][F1][F3]**
- **B12 coupling / masking / megaloblastic overlap: established.** **[A][F16][F19]**
- **Folate non-toxicity at high end: established; UMFA significance: evolving.** **[A][F15][F18]**
- **A single post-fortification "optimal": not established (contested/evolving).** **[E][F5]**

## 10.4 Intended populations
Thresholds target general-adult status assessment. BioSense applies them context-first in two layers,
abstaining or requiring context in pregnancy/reproductive-age NTD planning, liver/renal disease, and where
functional markers or B12 are unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. Folate is reported in TWO LAYERS (serum concentration +
> functional/tissue adequacy), is LOW-DOMINANT TWO-SIDED, is CONTEXT-GATED, and its lower reference limit is
> genuinely CONTESTED and FORTIFICATION-SHIFTED: the concentration band and the functional/tissue-adequacy
> layer are never conflated, and a folate result is never read in isolation from vitamin B12 where a
> deficiency pattern is possible.**

## 11.1 The serum concentration bands (ng/mL; general adult, primary prevention, not pregnant; after context gate)

| BioSense Wellness Interpretation | Associated serum folate (ng/mL) | ≈ nmol/L | Evidence anchor | Wellness meaning (context-first; two-layer; no diagnostic label) |
|---|---|---|---|---|
| **Deficient** | v < 3 | < ~6.8 | Serum deficiency [F1][F2] | A low-concentration pattern; companion markers + B12; route if symptomatic. |
| **Insufficient** | 3 ≤ v < 4 | ~6.8–<9.1 | Insufficiency [F1] | Below adequacy; RBC folate/homocysteine + B12 clarify. |
| **Low Borderline** | 4 ≤ v < 6 | ~9.1–<13.6 | Below functional decision zone [F6] | Watch zone; context + companion markers. |
| **Adequate Reference** | 6 ≤ v ≤ 20 | ~13.6–45.3 | Favourable reference [F4] | Within a favourable serum range (tissue status still read with context). |
| **High** | 20 < v ≤ 40 | ~45.3–90.6 | Above reference [F5][F17] | Above the usual range; commonly supplementation/fortification; not toxic. |
| **High — Flag** | v > 40 | > ~90.6 | Markedly high [F17][F18] | Usually supplementation; check B12 (masking) and consider unmetabolised folic acid. |

## 11.2 The functional/tissue-adequacy layer (separate output) [B][C]
Reported **alongside** (never merged into) the serum concentration band, driven by serum band + RBC folate +
homocysteine + B12 + context: **LIKELY_ADEQUATE** (RBC folate adequate, homocysteine normal);
**TISSUE_DEPLETION_PATTERN** (RBC folate low <140 ng/mL — even with a recently normalised serum);
**FUNCTIONAL_SHORTFALL_PATTERN** (homocysteine elevated with normal MMA — a folate pattern);
**UNCERTAIN / CONTEXT_REQUIRED** (serum normal/high but RBC/homocysteine unavailable and stores in
question). BioSense never equates a normal/high serum folate with definite tissue adequacy, nor a
recently-supplemented serum with a resolved deficiency. **[B][C][F8][F9]**

## 11.3 How the bands were derived — transparency [B]
- Serum boundaries map to recognised anchors: the ~3 ng/mL deficiency cut-off (F1, F2); the 3–4 insufficiency
  band (F1); a watch zone below the functional decision zone (F6); a favourable reference midrange (F4); and
  a high band reflecting supplementation (F5, F17).
- **The functional/tissue-adequacy layer is separate** and gated by RBC folate/homocysteine/B12 + context
  (§11.2), expressing the serum-vs-tissue distinction via the Context-First Framework — not a new methodology.
- **No number was averaged.** The contested lower reference limit (2.0–7.0), the post-fortification proposals,
  and the NTD thresholds are presented as differing frameworks (§10.2, §11.5), not merged.

## 11.4 Deterministic, half-open intervals [B]
All serum concentration bands use half-open intervals (`≤ v <`) so no value is classified into two bands and
no gap exists (High is bounded 20 < v ≤ 40; High-Flag is the single upper flag, v > 40). **[B]**

## 11.5 Guideline-disagreement & NTD-context display (reused posture) [B][C]
Where relevant, BioSense notes that the lower reference limit is contested and fortification-shifted, and
that a **separate reproductive-age NTD framework** (RBC folate ≥400 ng/mL / serum ≈24.3–25.5 nmol/L) applies
to pregnancy planning — shown as distinct frameworks, never averaged into the general bands (CAV9). **[B][C][R5][F10]**

## 11.6 Context-gate precedence [D]
No band or functional/tissue statement is emitted as a verdict without the Context-First evaluation (§0.2).
Diet, alcohol, malabsorption, GI surgery, medications, pregnancy, liver/renal context, B12, and the
functional markers are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general adult, primary prevention, not pregnant**, and a serum-folate assay. Reference
limits are contested and fortification-shifted; serum reflects recent intake (not stores); RBC folate is the
tissue-store marker held separately; reproductive-age NTD targets are a separate framework. Not applied to
children/adolescents or pregnancy (§15). **[E][F3][F5]**

---

# 12. Interpretation Framework — CONTEXT-FIRST, TWO-LAYER (reused from SCL-010/012)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010) and the
> concentration-vs-functional two-layer pattern (SCL-012). No new methodology is introduced.** **[C][R1][R8]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1]
   gather materially-relevant context (RBC folate; homocysteine; VITAMIN B12; Hb/CBC/MCV; creatinine/eGFR;
   diet; supplementation; alcohol; malabsorption; GI surgery; folate-affecting meds; pregnancy; liver).  [R4]
   → if material context/functional markers change meaning, interpret WITHIN it; if key context unavailable,
     record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit ng/mL; sample type serum vs RBC; result final) → else display-only.
STEP 2 — ELIGIBILITY: general adult, not pregnant → else abstain/pregnancy-aware (§15).
STEP 3 — CONFIDENCE (four-level): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED (§0.6).         [R2]
STEP 4 — LAYER 1 (SERUM CONCENTRATION): assign low-dominant two-sided serum band (§11.1).
STEP 5 — LAYER 2 (FUNCTIONAL/TISSUE ADEQUACY): assess from serum + RBC folate + homocysteine + B12 + context (§11.2);
         NEVER equate normal/high serum = tissue adequacy; serum normal/high + no RBC/Hcy + recent supp → CONTEXT_REQUIRED. [R8]
STEP 6 — B12 PAIRING: where a deficiency pattern is possible, pair with B12; high/normal folate never reassures about B12. [F16]
STEP 7 — EXPLANATIONS: if abnormal/discordant + ≥2 plausible causes → Possible Explanation A/B/C, ranked. [R3]
STEP 8 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); route where appropriate; no diagnosis. [R7]
```

**Core interpretive stance [B]:** folate is a context-first, two-layer marker — report the serum
concentration and, separately, the functional/tissue adequacy; read the functional markers with their
confounders; always pair with B12 where a deficiency pattern is possible; show contested thresholds honestly;
and name no condition. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy — reused SCL-010)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear serum band AND (RBC folate/homocysteine concordant or clearly not needed) AND no B12-masking concern | Band + functional/tissue layer normally |
| **REDUCED** | Single value / assay uncertainty / recent supplementation / near a band boundary | Band cautiously; name the reducer (CAV3) |
| **CONTEXT_REQUIRED** | Serum normal/high but RBC/homocysteine unavailable and stores in question; possible B12-masking without B12 available | Withhold/qualify the functional/tissue layer; name needed context (CAV4/CAV7) |
| **ABSTAINED** | Significant contextual uncertainty / conflicting signals / ineligible population | Explained abstention; route |

Reducers/context inputs: missing RBC folate/homocysteine [R4]; missing B12 where masking possible [F16];
recent supplementation (serum reflects intake) [F8]; renal impairment (confounds homocysteine) [F13]; assay/
reference/fortification variability [F3,F5]; MTHFR/methylation context [F26]; liver disease [F27]; alcohol/
malabsorption/GI surgery/meds context [F20,F21,F23]; value near a band boundary; pregnancy/reproductive-age. **[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant contextual
uncertainty **may** justify abstention. **[R2]**

---

# 14. Wellness Interpretation  *(context-first, two-layer, B12-paired, multiple explanations for high/discordant)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate, reporting both layers.
Wellness, not medical; **never a diagnosis**. **[B]/[D]**

- **BioSense Wellness Interpretation: Adequate Reference** *(6–20 ng/mL, markers concordant/not needed).*
  "Your serum folate is in a favourable range. Remember the serum number reflects recent intake more than
  your stores — but with no red flags, this is reassuring." **[B]**
- **BioSense Wellness Interpretation: Deficient / Insufficient / Low Borderline** *(<6).* "This is a
  lower-than-typical folate pattern. Red-cell folate and homocysteine help confirm whether your tissue stores
  are affected, and — because folate and B12 are linked — it's important to check B12 too. If you drink
  regularly, have absorption issues, are pregnant or planning pregnancy, or take certain medications, it's
  worth discussing with a professional." Constructive; **no 'deficiency' diagnosis** (CAV5, CAV4). **[B][D]**
- **BioSense Wellness Interpretation: High / High — Flag** *(>20 / >40).* Present a **context-first read**
  (CAV6): "A high folate is **usually from supplements or fortified foods** and **isn't considered toxic**.
  Two things are still worth noting: very high levels can leave unmetabolised folic acid in the blood, and a
  high folate can **mask** a vitamin B12 problem — so it's worth making sure **B12** is adequate and reviewing
  very high supplement doses with a professional." **No toxicity/'malignancy' framing** (S6). **[B][D][F15][F16]**

**Functional/tissue modifier (the key folate move):** where RBC folate/homocysteine are available, integrate
them — low RBC folate signals depleted stores even with a normal serum; elevated homocysteine with normal MMA
supports a folate-pattern shortfall — always noting the homocysteine confounders (CAV8). **[D][F7][F12][F13]**

**B12-pairing modifier (safety):** where a deficiency pattern is possible, pair with B12; a high or normal
folate never resolves a B12 question (CAV4). **[D][F16]**

**Discordance modifier (multiple explanations):** high serum + low RBC folate → recent supplementation not
yet in red cells, **or** a B12 block → check B12/MMA; normal folate + high homocysteine → possible functional/
MTHFR block → present as ranked possibilities. **[D][R3][F25][F26]**

**Context-unavailable modifier:** where functional markers or B12 are missing, state the confidence
limitation and name what would clarify (CAV7); never invent certainty (S8). **[D][R4]**

Every interpretation pairs both layers with context guidance (§17) and the mandatory caveats (§0.10). **None
diagnoses deficiency, megaloblastic anaemia, or neural-tube-defect risk, none equates a normal serum with
definite tissue adequacy, and none lets a folate result stand in for B12.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for folate).** Serum normal/high but RBC folate/homocysteine unavailable and
  stores in question, or a possible B12-masking situation without B12 available → withhold/qualify the
  functional/tissue layer, state what's needed (§13, CAV4/CAV7). **[D][R2]**
- **15.2 Pregnancy & reproductive-age planning.** Folate demand rises and a separate NTD framework applies
  (RBC ≥400 ng/mL); BioSense uses pregnancy-aware caution or abstains, deferring to a professional (CAV9). **[D][F10][F22]**
- **15.3 Possible B12 co-deficiency / masking.** Where a B12-deficiency pattern is possible, pair with B12 and
  route; do not let folate reassure (§19). **[D][F16]**
- **15.4 Children & adolescents.** Adult bands not applied; display, suggest professional interpretation. **[D]**
- **15.5 Liver / renal disease.** Liver disease lowers serum folate and raises homocysteine; renal impairment
  confounds homocysteine — interpret within context or abstain. **[D][F27][F13]**
- **15.6 Recent supplementation.** Serum reflects recent intake and can overstate stores; reduced confidence,
  framed accordingly (RBC folate clarifies). **[D][F8]**
- **15.7 Malabsorption / GI surgery / alcohol / folate-affecting meds.** Recognised contexts; interpret the
  low end with that in mind and route where a shortfall pattern appears. **[D][F20][F21][F23]**
- **15.8 MTHFR / methylation context.** Normal folate with high homocysteine may reflect a functional block →
  present as a possibility, not a certainty. **[D][F26]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Two-layer trend. [A][B]** BioSense trends the serum concentration and, where available, RBC folate and
  homocysteine separately; a rising serum after supplementation does not by itself prove tissue repletion
  (RBC folate lags by 3–4 months). **[F8]**
- **Assay-consistency matters. [A]** Comparing values across different assays/methods (and pre- vs
  post-fortification references) is a trend caveat, not a true change. **[F3][F5]**
- **Read with B12. [A]** A folate trend is interpreted alongside B12 where a deficiency pattern is possible;
  a rising folate does not resolve a B12 question. **[F16]**
- **Read homocysteine with confounders. [A]** A homocysteine trend is interpreted with B12, renal function,
  and MTHFR context. **[F13]**
- **Context/abstained points. [C]** Recently-supplemented, discordant, or context-required points are tagged
  so they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For folate, the first tier is **context and companion markers**, then context-appropriate lifestyle. **[A]/[B]**

## 17.1 Companion markers & context first [A][F8][F12][F16]
Where serum is low/borderline or stores are in question, the clarifying step is **RBC folate and
homocysteine**, and — because of the coupling — **vitamin B12**, plus the personal context (diet, alcohol,
absorption, medications). **[A]**

## 17.2 Diet [A][F20]
Folate comes from leafy greens, legumes, and fortified foods; a folate-poor diet, **alcohol**, and
**malabsorption** are recognised contributors to a low value. Framed as education, **not** a dose
instruction. **[A][F23]**

## 17.3 Medication & absorption context [A][F21]
Some medications (e.g. methotrexate, certain anticonvulsants, sulfasalazine, trimethoprim, metformin) affect
folate — useful context for a low value, **never** a prompt to change any medication (a clinician's
decision). **[A]**

## 17.4 Framing rules [B][D]
Context and companion markers (including B12) first; **no specific doses or regimens** (S7); contested
thresholds shown, never averaged; calm, evidence-informed language; never a diagnosis; the serum≠tissue
(CAV2) and B12-masking (CAV4) caveats attached where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain the two layers (serum concentration and functional/tissue adequacy) and what
folate is; run the context-first evaluation; integrate RBC folate/homocysteine with their confounders; pair
with B12; present multiple ranked explanations for a high or discordant value; name which markers would
clarify; express context-required/abstention respectfully.

The AI layer **must never**:
- emit "deficiency", "megaloblastic anaemia", "pernicious anaemia", or "neural tube defect risk" as a diagnosis — even to deny one (S1)
- equate a normal/high serum folate with definite tissue adequacy, or a recently-supplemented serum with a resolved deficiency (S3)
- conflate the serum concentration band and the functional/tissue layer (S2)
- let a high or normal folate reassure about B12 — pair with B12 where a deficiency pattern is possible (S4)
- interpret folate independently when material context/functional markers exist (S2)
- present a single certain explanation for an abnormal/discordant value (S6, discordance)
- frame a high folate as toxicity (folate is essentially non-toxic) (S6)
- ignore the homocysteine confounders (B12/B6/renal/MTHFR/liver) (S5)
- invent certainty when functional markers/B12/context are unavailable — state the limitation (S8)
- recommend specific folate/folic-acid doses or advise medication changes (S7, S10)
- produce a numeric disease-risk % from folate (S9)
- present a BioSense band as a medical/diagnostic boundary (S11)
- infer diet, medication, pregnancy, or a condition from the value

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing deficiency/megaloblastic
anaemia/NTD risk is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes
  patterns, never names deficiency / megaloblastic anaemia / NTD risk (S1). **[D][R7]**
- **Two-layer honesty.** The serum concentration and functional/tissue layers are reported separately;
  neither "normal serum = tissue adequacy" nor "recently supplemented = resolved" is asserted (S2, S3, CAV2). **[D][F8][F9]**
- **B12-masking (safety-critical).** High/normal folate never reassures about B12; folate is paired with B12
  wherever a deficiency pattern is possible, and masking is surfaced (S4, CAV4). **[D][F16][F19]**
- **High not pathologised.** Folate is essentially non-toxic; a high value defaults to supplementation, with
  a B12 check and an unmetabolised-folic-acid note — not toxicity (S6, CAV6). **[D][F15]**
- **Confounders respected.** Homocysteine confounders (B12/B6/renal/MTHFR/liver) are always noted (S5, CAV8). **[D][F13]**
- **No dose/medication guidance.** Supplement/medication questions → educational context + referral; never
  advise changing methotrexate/anticonvulsants (S7, S10). **[D][F21]**
- **Missing markers/context stated, not invented.** (S8). **[D][R4]**
- **Correct unit factor & sample type.** The engine applies the folate factor (2.266) and never conflates
  serum with RBC folate. **[D][F14]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. **Deficient / Insufficient**, or a **tissue-depletion / functional-shortfall pattern** (low RBC folate, or
   elevated homocysteine with normal MMA). **[F7][F12]**
2. A **possible B12-masking** situation — low/borderline **or** high folate where a B12-deficiency pattern is
   possible. **[F16]**
3. **Pregnancy or reproductive-age planning** (separate NTD framework). **[F22]**
4. **Discordant results** (e.g. high serum + low RBC folate; normal folate + high homocysteine). **[F25][F26]**
5. **Relevant context** (alcohol, malabsorption, GI surgery, folate-affecting medications, liver/renal
   disease). **[F20][F21][F27]**
6. The user is in a **context-required / abstention** situation, or **asks a medical/supplement/medication
   question** (S10).

All suggestions are wellness-framed, non-urgent, non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-013 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for serum folate (and RBC folate as a
  separate tissue-store input), plus assay/sample-type metadata, and — as interpretation inputs — **vitamin
  B12 (SCL-012), homocysteine, haemoglobin/CBC/MCV (SCL-019, future CBC), and creatinine/eGFR**, plus declared
  context (diet, alcohol, malabsorption, GI surgery, folate-affecting meds, pregnancy, liver). **[R4]**
- **Supplies (as CSL bindings):** the low-dominant two-sided serum bands (Category B), the **functional/tissue
  adequacy layer**, the **B12-masking safety rule**, the reused Context-First gate, the reused four-level
  confidence hierarchy, the reused multiple-explanations output, the reused cross-biomarker consumption with
  graceful degradation, the guideline-disagreement and NTD-context display, safety rules, context guidance,
  and narrative templates — each with value + source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, the confidence hierarchy, the
  multiple-explanations output, and cross-biomarker intelligence (all frozen from SCL-010); the
  concentration-vs-functional two-layer pattern (SCL-012); the guideline-disagreement posture (SCL-003/011/012);
  two-sided banding (SCL-004/009/010/011/012); and the diagnostic-adjacency discipline (SCL-002/009/011/012).
  **The serum-vs-tissue distinction is represented within Context-First — not as a new methodology.** **[C][R8]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (companions inform and pair, never
  averaged into a single verdict; contested thresholds never averaged; serum and RBC folate never conflated).
- **Uses the correct unit factor** (2.266) — a per-analyte configuration.
- **Score contribution:** folate contributes to a nutrient/haematologic-wellness context as a **two-layer,
  low-dominant two-sided, context-gated** input, always B12-paired where a deficiency pattern is possible;
  context-required/abstained values do not contribute a definite verdict; the serum and functional/tissue
  layers are kept distinct. Any weighting is a Category [C] product decision. **[C]**

---

# 22. Medication & Supplement Context (educational only)

Educational context only; BioSense does not instruct on dose or prescribe supplementation (S7, S10). **[D]**
- Folate/folic-acid supplementation and the management of low folate are clinical decisions made on the full
  picture (serum + RBC folate + homocysteine + **B12** + cause). A person's serum folate on supplements
  reflects recent intake and can overstate tissue repletion. **[A][F8]**
- Several medications affect folate (e.g. **methotrexate**, certain **anticonvulsants**, sulfasalazine,
  trimethoprim, metformin, some oral contraceptives) — context for interpretation, **never** a prompt to
  change any medication, which is a clinician's decision. **[A][F21]**
- Because folic acid can **mask** a B12 deficiency, supplementation questions are always framed with the B12
  pairing in mind. **[A][F16]**
- Any supplement or medication question → educational context + suggestion to speak with a healthcare
  professional. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Serum folate is an imperfect standalone marker. [E]** Concentration and tissue/function diverge; the
   two-layer, Context-First approach addresses this, but RBC folate/homocysteine are needed to resolve
   status. **[F8][F9]**
2. **The lower reference limit is genuinely contested. [E]** ≈2.0–7.0 ng/mL with no consensus; BioSense shows
   the frameworks, never averages. **[F3]**
3. **Post-fortification references are evolving. [E]** Higher adult reference (≈5.8–32.8) and a proposed
   revised lower limit (~13) are debated. **[F5]**
4. **Functional & NTD thresholds differ from reference cut-offs. [E]** Decision limit <8 µg/L; NTD RBC ≥400
   ng/mL — separate frameworks. **[F6][F10]**
5. **Homocysteine is confounded. [E]** B12/B6/renal/MTHFR/liver — read with those. **[F13]**
6. **Unmetabolised folic acid significance is evolving. [E]** High folic-acid intake and UMFA effects are an
   active area; BioSense flags rather than asserts. **[F18]**
7. **Companion/marker availability is data-dependent. [E]** Without RBC folate/homocysteine/B12, the
   functional/tissue layer degrades to a confidence limitation, not a certainty. **[R4]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**;
context-first; two-layer; B12-paired; multiple explanations for high/discordant). **[B]/[D]** (Illustrative;
exact copy owned by BioSense.)

```
TEMPLATE: ADEQUATE_REFERENCE (markers concordant/not needed)
"Your serum folate is {value} ng/mL ({nmol} nmol/L) — in a favourable range. Remember the serum number
 reflects recent intake more than your stores; with no red flags, this is reassuring."  +CAV1 +CAV2

TEMPLATE: DEFICIENT / INSUFFICIENT / LOW_BORDERLINE (<6)
"Your serum folate is {value} ng/mL ({nmol} nmol/L) — a lower-than-typical pattern. Red-cell folate and
 homocysteine help show whether your tissue stores are affected, and because folate and vitamin B12 are
 linked, it's important to check B12 too. If you drink regularly, have absorption issues, are pregnant or
 planning pregnancy, or take certain medications, it's worth discussing with a professional."  +CAV1 +CAV2 +CAV4 +CAV5

TEMPLATE: HIGH / HIGH_FLAG (>20 / >40 — CONTEXT-FIRST, NOT TOXICITY)
"Your serum folate is {value} ng/mL ({nmol} nmol/L) — higher than the usual range. A high folate is usually
 from supplements or fortified foods and isn't considered toxic. Two things are still worth noting: very high
 levels can leave unmetabolised folic acid in the blood, and a high folate can mask a vitamin B12 problem — so
 it's worth making sure B12 is adequate and reviewing very high supplement doses with a professional."  +CAV1 +CAV2 +CAV6

MODIFIER: FUNCTIONAL_TISSUE_MARKERS_PRESENT →
 integrate RBC folate/homocysteine: "Your red-cell folate is {adequate/low} and homocysteine is {normal/
 elevated}, which {supports adequate stores / suggests your tissue folate may be low} — read alongside your
 B12 and kidney function."  +CAV8

MODIFIER: TISSUE_DEPLETION_PATTERN (RBC folate low, any serum) →
 "Even though your serum folate looks {normal/low}, your red-cell folate is low, which can indicate depleted
  stores — worth discussing with a professional."  +CAV1 +CAV2

MODIFIER: B12_PAIRING (deficiency pattern possible) → append CAV4 (folate doesn't rule out a B12 problem).

MODIFIER: DISCORDANCE (high serum + low RBC ; or normal folate + high homocysteine) →
 present ranked possibilities (recent supplementation / B12 block / MTHFR functional block); check B12/MMA.  +CAV8

MODIFIER: CONTEXT_UNAVAILABLE (no RBC folate/homocysteine/B12) →
 "We'd interpret this more confidently with red-cell folate, homocysteine, and vitamin B12."  +CAV7

MODIFIER: PREGNANCY/REPRODUCTIVE-AGE → append CAV9 (higher targets, measured differently; professional-guided).
```

**Absolute rules:** no template diagnoses deficiency / megaloblastic anaemia / NTD risk, equates a normal/high
serum with tissue adequacy, lets folate reassure about B12, frames a high folate as toxicity, conflates the
two layers, or presents a band as a diagnosis. **[D]**

---

# 25. Example Outputs

**Example 1 — Adequate serum, markers concordant. [illustrative]**
```
Input: serum folate 12 ng/mL, RBC folate adequate, homocysteine normal, B12 adequate.
Layer1: ADEQUATE_REFERENCE | Layer2: LIKELY_ADEQUATE | Confidence: STANDARD
Narrative: ADEQUATE_REFERENCE +CAV1+CAV2 + FUNCTIONAL_TISSUE_MARKERS_PRESENT.  [F8,F12]
```

**Example 2 — Low serum, vegan, no companion markers. [illustrative]**
```
Input: serum folate 2.5 ng/mL, vegan, no RBC/Hcy/B12.
Layer1: DEFICIENT | Layer2: functional confirmation advised | Confidence: REDUCED (no companion markers)
Narrative: DEFICIENT +CAV1+CAV2+CAV4(B12)+CAV5 ; suggest RBC folate/homocysteine/B12; route if symptomatic; NO diagnosis.  [S1,S4,S8]
```

**Example 3 — Normal serum BUT low RBC folate (tissue depletion). [illustrative]**
```
Input: serum folate 8 ng/mL (recently supplemented), RBC folate 120 ng/mL.
Layer1: ADEQUATE_REFERENCE | Layer2: TISSUE_DEPLETION_PATTERN | Confidence: STANDARD/REDUCED
Narrative: + TISSUE_DEPLETION_PATTERN ; serum reflects recent intake, stores still low; route; NO diagnosis.  [S2,S3]
```

**Example 4 — Low folate, possible B12 masking. [illustrative]**
```
Input: serum folate 3.5 ng/mL, macrocytosis on CBC, B12 not available.
Layer1: INSUFFICIENT | B12 pairing REQUIRED (megaloblastic overlap) | Confidence: CONTEXT_REQUIRED
Narrative: INSUFFICIENT +CAV1+CAV2+CAV4 ; pair with B12; NO "deficiency"/"megaloblastic" diagnosis.  [S1,S4]
```

**Example 5 — High folate, supplementing (not toxicity). [illustrative]**
```
Input: serum folate >40 ng/mL, taking folic acid; B12 not checked.
Layer1: HIGH_FLAG | NOT toxicity | B12-masking note | Confidence: STANDARD/REDUCED
Narrative: HIGH_FLAG +CAV1+CAV2+CAV6 ; reassure non-toxic; recommend checking B12; UMFA note.  [S6,F15,F16]
```

**Example 6 — Discordance (high serum + low RBC). [illustrative]**
```
Input: serum folate 22 ng/mL, RBC folate 130 ng/mL.
Layer1: HIGH | Layer2: discordant → ranked possibilities (recent supplementation / B12 block) | Confidence: CONTEXT_REQUIRED
Narrative: DISCORDANCE modifier +CAV8 ; check B12/MMA; present as possibilities, not a single cause.  [R3,S8]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, four-level confidence
  hierarchy, multiple-explanations output, and cross-biomarker intelligence.
- **SCL-012 (Vitamin B12)** — the critical companion (paired for masking/megaloblastic overlap) and the source
  of the reused concentration-vs-functional two-layer pattern.
- **SCL-011 (Vitamin D)** — precedent for guideline-disagreement / dual-framework display and two-sided
  context-gated banding.
- **SCL-019 (Haemoglobin) & future CBC (esp. MCV)** — downstream haematologic context (megaloblastic overlap);
  consumed where available.
- **Future Homocysteine, MMA, Creatinine/eGFR, RBC-Folate SCLs** — the functional/tissue and renal markers
  folate consumes; where unavailable, a confidence limitation is recorded.
- **SCL-002 (HbA1c) / SCL-009 (Fasting Glucose)** — source of the reused diagnostic-adjacency discipline.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the F-series IDs in §0
> and the body. Developers finalising the pack should confirm exact page/table locators against the primary
> sources where required.

**Thresholds, serum-vs-RBC & functional markers (Category A anchors)**

1. Medscape: **Folate (Folic Acid) — reference range / interpretation** (article 2085523). — *serum
   deficiency <3–4 ng/mL; lower reference limit 2.0–7.0 (no consensus); post-fortification 5.8–32.8; RBC
   folate <140 ng/mL; serum unreliable index of stores; WHO NTD RBC ≥400 ng/mL, serum ~25.5 nmol/L (F1, F3,
   F5, F7, F9, F10, F11).*
2. **Merck Manual (Professional): Folate Deficiency.** — *serum deficiency likely <7 nmol/L (<3 mcg/L); RBC
   folate <140 ng/mL inadequate; homocysteine confounders; measure B12 too (F2, F7, F13, F19).*
3. **Biomarkers/laboratory assessment of folate status** — *ScienceDirect / PMC5597708.* — *lower reference
   limit range 2.0–7.0; proposed revision to 13 ng/mL; folate essentially non-toxic; B12-masking; conversion
   factor (F3, F5, F15, F16, F14).*
4. Serum folate depletion & decision limits — *PubMed 24351103.* — *serum <8 µg/L depletion (homocysteine
   effect); <6 µg/L affects RBC indices; fasting preferred (F6, F28).*
5. **WHO guideline: optimal serum & RBC folate concentrations for NTD prevention** (PMC6356991); UK NTD serum
   threshold study (PMC12414022). — *RBC ≥400 ng/mL (906 nmol/L); serum ~24.3 nmol/L; high serum >40 nmol/L
   supplementation (F10, F11, F17, F22).*

**Serum-vs-RBC, functional, discordance (Category A)**

6. HealthRX; Metropolis; **PMC11265046** (RBC vs serum folate). — *RBC folate = tissue stores / 3–4-month
   average; serum = recent intake; order both; discordance scenarios; homocysteine (folate pattern: high Hcy,
   normal MMA) (F8, F12, F24, F25).*
7. OptimalDX (folate interpretation; Pagana 2021; Bailey 2015). — *low-folate causes (diet, alcohol,
   malabsorption, pregnancy); folate-affecting medications; UMFA/functional folate context (F18, F20, F21, F23).*

**Units, megaloblastic overlap, liver, MTHFR (Category A/S)**

8. Unit converters & references: **UNITSLAB**, mmol/L converter, Metropolis. — *ng/mL → nmol/L ×2.266 (×0.441
   reverse), MW ~441; megaloblastic overlap (measure both); B12-masking; MTHFR context (F14, F16, F19, F26).*
9. **Folate & homocysteine in liver disease** (PMC8943167). — *liver disease lowers serum folate, raises
   homocysteine; homocysteine confounders (F13, F27).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–5; they are BioSense
> Version 1 classifications, low-dominant two-sided and context-gated, not attributable to any single reference
> as a diagnostic threshold, and **do not restate diagnostic labels.** The serum-concentration-vs-functional/
> tissue-adequacy distinction is represented via the reused Context-First Framework; contested thresholds and
> the NTD framework are shown and **never averaged.**

---

# 28. Founder Decisions Required

The folate methodology reuses frozen BioSense frameworks and represents the serum-vs-tissue distinction via
the existing Context-First Framework. Two optional presentation/policy items remain: **[C][E]**

**D-1 — Confirm the serum concentration band boundaries and the two-layer presentation**, in particular the
low-dominant band structure and the decision to report the **functional/tissue adequacy** (RBC folate/
homocysteine) as a separate layer from the serum concentration band, and to treat the high end as non-toxic
with a B12-masking note. Confirmation requested that this two-layer, context-first, B12-paired presentation is
the intended default. **Founder sign-off requested.**

**D-2 — Confirm the cross-biomarker consumption scope for V1.** SCL-013 is specified to consume **vitamin B12
(SCL-012), homocysteine, RBC folate, haemoglobin/CBC/MCV (SCL-019), and creatinine/eGFR** where available
(with graceful degradation to a confidence limitation when absent). **Founder decision requested** on whether
V1 activates folate with serum-concentration-only context (degrading gracefully, but always surfacing the B12
pairing) or waits for the companion packs to exist.

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-013 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/
reference figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. Folate
reuses frozen BioSense methodology throughout — the Context-First Interpretation Framework, four-level
confidence hierarchy, multiple-explanations output, and cross-biomarker intelligence (all from SCL-010), the
concentration-vs-functional two-layer pattern (SCL-012), the guideline-disagreement posture (SCL-003/011/012),
two-sided banding with flags (SCL-004/009/010/011/012), and the diagnostic-adjacency discipline
(SCL-002/009/011/012) — introducing only folate-specific scientific content (the folate thresholds and the
serum-vs-RBC distinction; the homocysteine functional link and its confounders; the B12-masking safety point;
the NTD reproductive-age context; the high-folate/unmetabolised-folic-acid handling; and the folate context
modifiers). No new methodology was required; all structure remains consistent with SCL-001 through SCL-012.*
