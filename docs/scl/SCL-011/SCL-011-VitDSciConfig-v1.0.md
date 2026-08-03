# SCL-011 — VITAMIN D (25-HYDROXYVITAMIN D)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology (Context-First Framework, guideline-disagreement handling, cross-biomarker intelligence). No new methodology introduced.*

**Document ID:** SCL-011
**Biomarker:** Vitamin D — serum total 25-hydroxyvitamin D (25(OH)D; calcidiol)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Vitamin D reuses the existing frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), the four-level confidence hierarchy (SCL-010), multiple-explanations output (SCL-010), cross-biomarker intelligence (SCL-010), two-sided banding (SCL-004/009/010), and diagnostic-adjacency discipline (SCL-002/009) — introducing only vitamin-D-specific scientific content. All sections remain consistent with SCL-001 through SCL-010.

---

> **What this document is.** SCL-011 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for vitamin D (25(OH)D). It reuses existing
> BioSense methodology and does not redesign the Constitution, the ENG documents, the Blood Analysis
> Engine, or the SCL architecture. **No new methodology is introduced.**
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

## STRUCTURAL-FIT NOTE (Vitamin D vs SCL-001) — reuses frozen frameworks; no new pattern

Vitamin D is a two-sided, highly context-dependent marker whose recognised thresholds are subject to a
**genuine, unresolved guideline disagreement**. Every one of these characteristics is already representable
in frozen BioSense methodology, so SCL-011 **reuses** existing frameworks and introduces only
vitamin-D-specific scientific content:

1. **Guideline-disagreement handling — reused (SCL-003 method-aware posture).** The IOM (≥20 ng/mL) and the
   Endocrine Society (≥30 ng/mL, preferred 40–60) genuinely disagree, and the 2024 Endocrine Society
   revision declined to set optimal values for healthy adults. BioSense presents both as **differing
   frameworks, never averaged** (§10, §11, §23).
2. **Context-First Interpretation Framework — reused (SCL-010).** Season, latitude, skin pigmentation, age,
   obesity, sun exposure, sunscreen, supplementation, and pregnancy materially change interpretation, so the
   Context-First gate runs before banding (§8, §9, §12).
3. **Cross-biomarker intelligence — reused (SCL-010).** Vitamin D consumes **PTH and calcium** where
   available (the physiologically linked markers); where unavailable, this is a confidence limitation, not
   invented certainty (§9).
4. **Two-sided banding with a toxicity high-flag — reused (SCL-004/009/010).** Low signals a deficiency
   pattern; very high (>150 ng/mL) signals a toxicity pattern; an optimal middle (§11).
5. **Multiple-explanations output — reused (SCL-010).** A high 25(OH)D is usually supplementation, rarely
   toxicity; abnormal values get ranked possibilities (§11, §14).
6. **Diagnostic-adjacency discipline — reused (SCL-002/009).** BioSense never emits "deficiency,"
   "toxicity," "osteomalacia," or "rickets" as a diagnosis; it detects the pattern, routes calmly, and
   names nothing (§18, §19).

**Biomarker-specific content introduced:** the 25(OH)D thresholds and dual-framework display; the
liver→kidney activation pathway and the PTH/calcium relationships; the D2-vs-D3 and assay-variability
measurement notes; the toxicity thresholds; and the vitamin-D context modifiers. **No new methodology is
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

Vitamin D is one of the most requested wellness markers and one of the most genuinely contested. Expert
bodies do not agree on what "enough" means: the Institute of Medicine judges 20 ng/mL adequate for almost
everyone, while the Endocrine Society has favoured 30 ng/mL and a preferred range of 40–60 — and in 2024
the Endocrine Society declined to set optimal values for healthy adults at all, citing a lack of trial
evidence. BioSense treats that disagreement honestly: it shows both frameworks, never splits the
difference, and frames its own bands as a transparent wellness gradient rather than a settled truth. Vitamin
D is also deeply context-dependent — season, latitude, skin tone, age, body composition, sun habits, and
supplementation all move the number — so BioSense interprets it context-first. And because the marker is
two-sided, BioSense attends to both a low (deficiency) pattern and the rare high (toxicity) pattern, reading
it alongside its physiological partners, calcium and PTH, and naming no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as
the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate vitamin D (25(OH)D). Every value carries a source ID (V-series /
> R-series → §27) and a category tag. Canonical unit: ng/mL (store nmol/L in parallel). **Two-sided,
> context-first, dual-guideline-framework.**

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: ng/mL          # store nmol/L parallel
nmol/L = ng/mL × 2.496 ; ng/mL = nmol/L ÷ 2.496   (25(OH)D factor ≈ 2.5 — NOT 38.67 / 88.57 / 18.0)  [V6]
Always retain value_reported + unit_reported + available context. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  synthesis/context: season, latitude/geography, skin pigmentation, age, sun exposure, sunscreen, obesity/BMI; [V17-V21]
  intake: dietary intake, supplementation (dose/form D2 vs D3), recent high-dose/bolus;                    [V14]
  physiology/companions: PTH, calcium (and phosphate) where available;                                     [V10-V12]
  measurement: assay type (D2 under-detection), standardisation;                                            [V15]
  life-stage: pregnancy, malabsorption/bariatric, CKD/liver disease.                                        [V23,V25]
IF material context changes meaning → interpret 25(OH)D WITHIN that context.                                [R1]
IF companion markers (PTH/calcium) or key context unavailable → state as CONFIDENCE LIMITATION, not certainty. [R4]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors V1–V8) — TWO-SIDED
```
VITD_WELLNESS_BAND (ng/mL, general adult, primary prevention, not pregnant) — TWO-SIDED, after context gate:
  VERY_LOW               v < 12          # severe-deficiency consensus (rickets/osteomalacia risk) [V4]
  LOW                    12 <= v < 20    # below both frameworks' adequacy [V1][V3]
  BELOW_OPTIMAL          20 <= v < 30    # IOM-adequate but below ES sufficiency (the disagreement zone) [V1][V3]
  OPTIMAL_REFERENCE      30 <= v < 60    # ES sufficiency; ES historical preferred 40–60 sits inside this band (context) [V1][V2]
  HIGH_REFERENCE         60 <= v < 100   # BioSense deterministic start of High-Reference; still at/below ES safety UL (100) [V2][V8]
  ABOVE_REFERENCE_FLAG   100 <= v <= 150 # ES safety UL (100) to toxicity hallmark (150); BioSense review band [V8]
  VERY_HIGH_FLAG         v > 150         # toxicity hallmark (>375 nmol/L) [V7] → calm review; companion Ca/PTH
DIRECTION: TWO-SIDED (low = deficiency pattern; high = toxicity pattern). Optimal middle; not lower/higher-better. [R6]
nmol/L parallels (×2.496): 12≈30 | 20≈50 | 30≈75 | 60≈150 | 100≈250 | 150≈375
DUAL FRAMEWORK: show IOM (≥20 adequate) AND Endocrine Society (≥30 sufficient; preferred 40–60) — NEVER averaged. [B2][R5]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never a diagnostic label. [B][D]**

## 0.4 Dual-guideline-framework display — [C] — REUSED disagreement posture (SCL-003)
```
IOM/NAM framework:         ≥20 ng/mL (50 nmol/L) adequate for ~97.5% of population.                    [V3]
Endocrine Society framework: sufficiency >30 ng/mL; insufficiency 21–29; deficiency <20; preferred 40–60. [V1,V2]
2024 Endocrine Society:    declined to set optimal 25(OH)D values for healthy adults (trial evidence lacking). [V5]
RULE: present BOTH as differing frameworks; BioSense wellness gradient spans them; NEVER average the two;
      state the disagreement honestly (Category E).                                                    [R5][V5]
```

## 0.5 Toxicity / high-end handling — [A]+[C]
```
v > 150 ng/mL (>375 nmol/L): toxicity hallmark → VERY_HIGH_FLAG; calm review; companion calcium/PTH context. [V7]
100 <= v <= 150 ng/mL: at/above the ES safety upper limit (UL 100) and below the toxicity hallmark (150) →
   ABOVE_REFERENCE_FLAG (a BioSense-authored review band spanning the ES safety UL to the toxicity hallmark). [V8]
Toxicity biochemistry (context, not diagnosis): high 25(OH)D + high calcium + SUPPRESSED PTH.           [V9]
Sun exposure does NOT cause toxicity (skin degrades excess); toxicity is from prolonged high-dose intake. [V22]
HIGH → present multiple explanations (supplementation dose >> assay artefact >> rare true toxicity).    [R3]
```

## 0.6 Confidence hierarchy (four-level) — [C] — REUSED (SCL-010)
```
STANDARD          : within reference, no material context conflict, companions concordant/not required.
REDUCED           : single value / seasonal timing / assay-D2 uncertainty / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : material context likely changes meaning but unavailable (e.g. high value, no calcium/PTH;
                    or borderline value with unknown supplementation/season) — qualify or withhold; name needed context. [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / ineligible population — explained abstention. [R2]
Reduced confidence does NOT auto-block; significant contextual uncertainty MAY justify abstention.       [R2]
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  25(OH)D is NOT a diagnosis. NEVER emit "deficiency", "toxicity", "osteomalacia", or "rickets" as a label.
    Detect patterns; explain possibilities; identify uncertainty; route.                                 [R7]
S2  Interpret context-first; season/latitude/pigmentation/age/obesity/sun/supplementation materially matter. [R1]
S3  Present BOTH guideline frameworks (IOM & Endocrine Society); NEVER average them.                     [R5]
S4  Two-sided: low = deficiency pattern; >150 = toxicity pattern; optimal middle. Low is not "worse-is-lower-only". [R6]
S5  VERY_HIGH_FLAG (>150) / ABOVE_REFERENCE_FLAG (100–150) → calm review; companion calcium/PTH; name nothing. [V7,V8]
S6  HIGH → overload/toxicity NOT assumed; supplementation is the usual explanation; multiple explanations. [R3]
S7  Never recommend specific vitamin D doses or prescribe supplementation regimens.
S8  Companion markers (PTH/calcium) unavailable → confidence limitation, not invented certainty.         [R4]
S9  Never produce a numeric disease-risk % from 25(OH)D.
S10 On any medication/supplement/dose question → educational context + refer.
S11 Never present a BioSense band as a medical/diagnostic boundary.
S12 Abstain/steer to pregnancy-aware caution in pregnancy; do not band on general bands. Never infer context from the value. [V23]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & LIFESTYLE (context-appropriate):
   - low pattern → safe sun habits for one's skin tone/latitude/season; vitamin-D-containing foods
     (fatty fish, fortified foods); note season/sunscreen/obesity as modifiers.                          [V20,V21,V23]
   - the usual note: D3 tends to raise 25(OH)D more than D2 (educational, not a dose instruction).       [V14]
Tier 2 COMPANION MARKERS / CONTEXT: consider PTH & calcium where available; account for season, BMI,
   pigmentation, assay; a re-check in a different season may clarify a borderline value.                  [V11,V12,V21]
Tier 3 HEALTHCARE DISCUSSION (calm) when: VERY_LOW / persistent low pattern | ABOVE_REFERENCE_FLAG / VERY_HIGH |
   pregnancy / malabsorption / CKD / liver context | medical, supplement, or dose question.              [D]
NEVER a specific dose instruction or supplementation regimen at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → band → template; ALWAYS present both frameworks where relevant; possibilities where high.
OPTIMAL_REFERENCE / HIGH_REFERENCE → affirming (context-concordant).
BELOW_OPTIMAL (20–29)              → the disagreement zone: "adequate by one framework, below another"; NO diagnosis.
LOW / VERY_LOW                     → constructive low-pattern framing; context + companion markers; route if persistent/severe.
ABOVE_REFERENCE_FLAG / VERY_HIGH   → calm review; multiple explanations (supplementation >> assay >> rare toxicity); Ca/PTH.
context materially present         → interpret within it (season/obesity/pigmentation/supplementation).
companions/context unavailable     → confidence limitation; name what would clarify.
Never "normal/abnormal" as a verdict; never a diagnosis (deficiency/toxicity/osteomalacia/rickets).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Expert guidelines differ on the ideal vitamin D level — the IOM considers 20 ng/mL adequate, while the
      Endocrine Society has favoured 30+ (preferred 40–60). We show both rather than pick one."
CAV3 (reduced/context) name the context reducer(s) or missing companion (season, BMI, assay, PTH/calcium).
CAV4 (below-optimal 20–29) "Your level is adequate by one common framework and below another — it sits in the
      zone experts disagree about."
CAV5 (low/very-low) "This is a lower-than-typical vitamin D pattern; season, skin tone, body composition, and
      sun habits all affect it, and it's worth discussing with a healthcare professional if it persists."
CAV6 (high flag) "A higher vitamin D is usually explained by supplementation; true toxicity is uncommon and
      generally involves very high levels with raised calcium — worth reviewing intake with a professional."
CAV7 (companion/context unavailable) "We'd interpret this more confidently with {calcium / PTH / your season
      and supplement information}."
```

## 0.11 Source & version identifiers
```
config_id: SCL-011   config_version: 1.0
band_set_id: BIOSENSE_VITD_WELLNESS_BANDS_v1         (Category B; two-sided; anchors V1-V8)
dual_framework_id: SCL011_IOM_VS_ENDOCRINE_SOCIETY_v1 (V1,V2,V3,V5; reuses R5 disagreement posture)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1 (reused; R2)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1 (reused; R3)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1  (reused; R4 — PTH/calcium)
toxicity_model_id: SCL011_VITD_TOXICITY_v1           (V7,V8,V9)
safety_rules_id: SCL011_SAFETY_v1                    (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Vitamin D is a fat-soluble prohormone, and the blood test that reflects its status measures **total
25-hydroxyvitamin D (25(OH)D)** — the main circulating and storage form, with a half-life of about 2–3
weeks. <cite index="46-2">The major circulating form of vitamin D is 25-hydroxyvitamin D (25(OH)D); thus, the total serum 25(OH)D level is currently considered the best indicator of vitamin D supply to the body from cutaneous synthesis and nutritional intake.</cite> **[A][V13]**

Two features define how BioSense handles it. First, the "right" level is **genuinely contested**: the IOM
regards 20 ng/mL as adequate for almost everyone, while the Endocrine Society has favoured 30+ ng/mL — and
in 2024 declined to set an optimal value for healthy adults. **[A][V1][V3][V5]** Second, 25(OH)D is
**deeply context-dependent** — season, latitude, skin pigmentation, age, body composition, sun exposure,
sunscreen, and supplementation all move it — so BioSense interprets it **context-first** and reads it
alongside its physiological partners, calcium and parathyroid hormone. **[A][V17][V20]**

- **Official name:** Vitamin D — serum total 25-hydroxyvitamin D (25(OH)D; calcidiol)
- **Common abbreviation:** 25(OH)D
- **Reported in:** ng/mL and nmol/L (×2.496) **[A][V6]**
- **Direction:** two-sided, context-dependent **[A]**
- **BioSense role:** A context-first vitamin-D-status marker, shown against both guideline frameworks and read with calcium/PTH.

---

# 2. Physiological Function

Vitamin D supports calcium balance and bone health, and has wide-ranging roles across many tissues. It comes
from **skin synthesis** (UV-B converts 7-dehydrocholesterol to vitamin D3) and from **diet/supplements**
(D3 from animal sources, D2 from plants). <cite index="49-1">VitD2 and VitD3 are subsequently 25-hydroxylated in the liver to 25-OH-VitD... A fraction of circulating 25-OH-VitD is converted to its active metabolites... mainly by the kidneys. This process is regulated by parathyroid hormone (PTH).</cite> **[A][V10][V11]**

Two points shape interpretation **[A]**:
- **25(OH)D is a status *reservoir*, not the active hormone.** The active form (1,25-dihydroxyvitamin D) is
  made in the kidney under PTH/calcium control; BioSense interprets the **stored** 25(OH)D, read alongside
  calcium and PTH. **[A][V10][V11]**
- **It is produced, stored, and cleared in ways that depend on context.** Skin synthesis depends on sun,
  season, latitude, pigmentation, age, and sunscreen; adiposity sequesters it; intake and form (D2 vs D3)
  affect it. **[A][V17][V18][V19][V20]**

---

# 3. Scientific Background

25(OH)D is the accepted status indicator, but the thresholds that define "enough" are the subject of a
**genuine, unresolved disagreement**. The Institute of Medicine concluded that a level of 20 ng/mL meets
the needs of almost everyone: <cite index="23-1">practically all persons, 97.5% of the general population, are assured bone health when serum levels of serum 25OHD are 20 ng/ml (50 nmol/liter).</cite> **[A][V3]** The Endocrine Society has instead favoured higher targets — deficiency <20, insufficiency 21–29, sufficiency >30 ng/mL, with a preferred range of 40–60. **[A][V1][V2]** Tellingly, the 2024 Endocrine Society revision <cite index="24-1">did not provide reference values for optimal serum 25(OH)D concentrations and stated that "in healthy adults, 25(OH)D levels that provide outcome-specific benefits have not been established in clinical trials".</cite> **[A][V5]**

There is, however, firm consensus at the extremes. Very low levels (below ~10–12 ng/mL) carry a real risk
of bone disease, and **toxicity** is defined at the high end: <cite index="36-1">Serum 25-hydroxyvitamin D [25(OH)D] concentrations higher than 150 ng/ml (375 nmol/l) are the hallmark of VDT due to vitamin D overdosing.</cite> The original 2011 Endocrine Society guideline sets the safety ceiling in the same terms: <cite index="50-1">most studies in children and adults have suggested that the blood levels need to be above 150 ng/ml before there is any concern. Therefore, an UL of 100 ng/ml provides a safety margin in reducing risk of hypercalcemia.</cite> **[A][V4][V7][V8]**

**The wellness reading — [B]:** vitamin D is a contested, context-heavy status marker. BioSense shows both
frameworks honestly, interprets context-first, attends to both ends (deficiency and the rare toxicity
pattern), reads it with calcium/PTH, and names no condition.

**An honest boundary — [E]:** the optimal 25(OH)D level is genuinely unsettled (the 2024 Endocrine Society
declined to set one), thresholds vary by body and disease context, and assays vary — so BioSense leans on
context and companion markers rather than a single line. **[E][V5][V15][V25]**

---

# 4. Why Vitamin D Matters

**1. It is the accepted vitamin-D-status marker. [A][V13]** 25(OH)D reflects the body's supply from sun and
diet, with a stable 2–3-week half-life. **[A]**

**2. It is contested and context-dependent. [A][V5][V20]** Because experts disagree and context moves the
number, honest, context-first interpretation adds real value over a naive "normal/abnormal" read. **[A]**

**3. It is common and modifiable — at both ends. [A][V26]** Insufficiency affects over half the world, and
excess (from high-dose supplements) is increasingly seen — so both ends carry wellness meaning. **[A]**

**Why BioSense measures it — [C]:** vitamin D is a high-demand, modifiable, context-heavy status marker —
valuable when shown against both frameworks, interpreted context-first, and read with calcium/PTH.

---

# 5. Laboratory Measurement

Vitamin D status is measured as **serum total 25(OH)D** by immunoassay or LC-MS/MS. **[A][V13]**

- **Total 25(OH)D = 25(OH)D2 + 25(OH)D3.** Many assays report both; **D3** (skin/animal) and **D2** (plant/
  some prescriptions) both contribute. **[A][V14]**
- **Assay variability is real.** Some immunoassays under-detect 25-OH-D2, so results can mislead in people
  taking D2; external schemes (DEQAS) and standardisation exist, and LC-MS/MS is the reference method. <cite index="45-1">the Architect assay was significantly poorer at detecting 25-OH-D2 than Cobas... caution should be used in interpreting Architect 25-OH-D results in patients supplemented with Vitamin D2.</cite> **[A][V15]**
- **Reference range** commonly reported ~20–100 ng/mL, laboratory-variable. **[A][V16]**
- **Not on routine metabolic panels** — ordered separately; ideally read with calcium (and PTH). **[A][V24]**

---

# 6. Units

- **ng/mL** — standard in the US. **BioSense canonical unit.** **[A/C]**
- **nmol/L** — standard elsewhere. **[A]**
- Conversion factor **2.496 (≈2.5)** — a 25(OH)D-specific factor; **not** the cholesterol (38.67),
  triglyceride (88.57), or glucose (18.0) factor. **[A][V6]**

BioSense stores the reported value and unit unchanged and computes the parallel unit. **[C]**

---

# 7. Unit Conversion

```
nmol/L = ng/mL × 2.496   (≈ 2.5)
ng/mL  = nmol/L ÷ 2.496
```
Worked checks: 20 ng/mL ≈ 50 nmol/L; 30 ≈ 75; 60 ≈ 150; 150 ≈ 375 nmol/L. **[A][V6]**

**Safety rule [D]:** the 25(OH)D factor (2.496) is analyte-specific — never a lipid/glucose factor; a
unit-unknown value is displayed but not interpreted. **[D]**

---

# 8. Measurement Limitations & Context Dependence  *(Context-First basis — reused SCL-010)*

25(OH)D's interpretation is unusually context-dependent, which is why the Context-First gate (§0.2, §12)
runs first. **[A]**

## 8.1 Synthesis & storage context — [A]
Skin synthesis falls with **higher latitude, winter season, less sun exposure, sunscreen, darker skin
pigmentation, and older age**; **obesity/higher BMI** lowers 25(OH)D by sequestering vitamin D in adipose
tissue. <cite index="33-1">Vitamin D levels may decrease with age because skin synthesis declines. Sunscreen use and dark skin pigmentation also reduce skin synthesis of vitamin D.</cite> **[A][V17][V18][V19][V20]** A note on pigmentation: Black individuals tend to have lower **total** 25(OH)D but often similar **bioavailable** vitamin D, so a total-25(OH)D reading can understate status — a context nuance, not a diagnosis. **[A][E][V18]**

## 8.2 Intake & form — [A]
Dietary intake and supplementation raise 25(OH)D; **D3 tends to raise it more than D2**, though daily-dosing
differences are smaller. Form matters both biologically and for assay detection (§5). **[A][V14]**

## 8.3 Seasonality — [A]
25(OH)D varies seasonally; a spring reading (post-winter low) and a fall reading (post-summer high) can
differ materially, so a single value is a seasonal snapshot. <cite index="25-1">check the level of circulating vitamin D (25-hydroxyvitamin D) at least twice a year. Once in spring, reflecting low levels after winter, and once in fall, reflecting higher levels after summer.</cite> **[A][V21]**

## 8.4 Assay variability — [A]
Immunoassays differ (notably in D2 detection); standardisation schemes exist; LC-MS/MS is the reference.
A method change is a trend caveat, and D2 supplementation is an assay-context reducer. **[A][V15]**

## 8.5 Companion physiology — [A]
25(OH)D is best read with **calcium and PTH**: PTH rises as 25(OH)D falls, and toxicity shows high 25(OH)D
with high calcium and suppressed PTH (§9). **[A][V11][V12][V9]**

**How BioSense uses this — [C][D]:** the Context-First gate applies these modifiers before banding; missing
context or companions sets Reduced/Context-Required confidence; a borderline value in the disagreement zone
is framed honestly rather than forced to a verdict.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010)*

Vitamin D consumes its physiologically linked companions where available. **[A][C]**

- **Parathyroid hormone (PTH). [A]** Inversely related to 25(OH)D: as vitamin D falls, PTH rises; the level
  at which PTH plateaus has been used to define sufficiency (population-variable). A **low 25(OH)D with high
  PTH** strengthens a deficiency pattern; a **high 25(OH)D with suppressed PTH and high calcium** is the
  toxicity pattern. **[A][V11][V12][V9]**
- **Calcium. [A]** Vitamin D increases intestinal calcium absorption; toxicity manifests as hypercalcemia.
  Calcium is the key companion for interpreting a high 25(OH)D. **[A][V24][V9]**
- **Phosphate. [A]** Part of the same mineral-regulation axis; supporting context where available. **[A][V11]**
- **(Context, not a lab marker) kidney & liver function. [A]** Activation runs liver → 25(OH)D → kidney →
  1,25(OH)2D; liver or kidney disease alters the pathway and is material context (§15). **[A][V10]**

**Cross-biomarker rule [C] (reused R4):** where PTH/calcium are **available**, BioSense consumes them to
sharpen interpretation and confidence; where **unavailable**, it records a **confidence limitation** and
names what would clarify — never inventing certainty. **[C][R4]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **25(OH)D is the status marker** (2–3-week half-life; main circulating form). **[A][V13]**
- **Severe deficiency <10–12 ng/mL** carries bone-disease risk. **[A][V4]**
- **Toxicity hallmark >150 ng/mL** (with hypercalcemia, suppressed PTH); ES safety upper limit 100. **[A][V7][V8][V9]**
- **Activation:** liver → 25(OH)D → kidney → 1,25(OH)2D, PTH/calcium-regulated. **[A][V10][V11]**
- **Context matters:** season, latitude, pigmentation, age, obesity, sun, sunscreen, form. **[A][V17-V21]**

## 10.2 Where they differ — and why (the genuine disagreement)
- **Adequacy threshold: IOM ≥20 vs Endocrine Society ≥30 (preferred 40–60).** <cite index="24-1">The Institute of Medicine... considers the minimal 25(OH)D concentration of 20 ng/mL (50 nmol/L) as physiologically adequate for at least 97.5% of the population. The Endocrine Society, in 2011, recommended serum levels of >30 ng/mL (>75 nmol/L) as optimal.</cite> **[A][V1][V3]**
- **2024 Endocrine Society declined to set optimal values for healthy adults.** **[A][V5]**
- **Disease-specific frameworks differ again** (e.g. CKD/KDOQI use different cut-offs). **[A][V25]**
- **Why:** the IOM answers a population bone-health question; the Endocrine Society addressed at-risk
  evaluation/treatment; trial evidence for higher targets in healthy adults is lacking. BioSense therefore
  **presents both frameworks and never averages them** (reused disagreement posture, R5). **[A][E][V5]**

## 10.3 Strength of evidence
- **Severe-deficiency & toxicity extremes: established consensus.** **[A][V4][V7]**
- **Adequacy threshold (20 vs 30): genuinely contested.** **[A][E][V1][V3][V5]**
- **Activation & PTH/calcium relationships: established.** **[A][V10][V11]**
- **Context modifiers: established.** **[A][V17-V21]**
- **A single "optimal" for healthy adults: not established (per 2024 ES).** **[E][V5]**

## 10.4 Intended populations
Thresholds target general-adult status assessment. BioSense applies them context-first to general adults,
showing both frameworks, and abstaining or requiring context in pregnancy, malabsorption, CKD/liver disease,
and where material context or companions are unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. Vitamin D is TWO-SIDED and CONTEXT-GATED, and its adequacy
> threshold is genuinely CONTESTED: BioSense shows BOTH the IOM and Endocrine Society frameworks and never
> averages them.**

## 11.1 The interpretation bands (ng/mL; general adult, primary prevention, not pregnant; after context gate)

| BioSense Wellness Interpretation | Associated 25(OH)D (ng/mL) | ≈ nmol/L | Evidence anchor | Wellness meaning (context-first; no diagnostic label) |
|---|---|---|---|---|
| **Very Low** | v < 12 | < ~30 | Severe-deficiency consensus [V4] | A markedly low pattern; companion markers + route (esp. if persistent). |
| **Low** | 12 ≤ v < 20 | ~30–<50 | Below both frameworks [V1][V3] | Below adequacy on both frameworks; context + companion markers. |
| **Below Optimal** | 20 ≤ v < 30 | ~50–<75 | The disagreement zone [V1][V3] | Adequate by IOM, below Endocrine Society sufficiency — the contested zone. |
| **Optimal Reference** | 30 ≤ v < 60 | ~75–<150 | ES sufficiency; ES historical preferred 40–60 sits inside this band (context) [V1][V2] | Within a favourable range on the stricter framework. |
| **High Reference** | 60 ≤ v < 100 | ~150–247 | BioSense deterministic band start (60); at/below ES safety UL 100 [V2][V8] | Above the historical preferred range but at/below the ES safety upper limit. |
| **Above Reference — Flag** | 100 ≤ v ≤ 150 | ~250–375 | ES safety UL (100) to toxicity hallmark (150); BioSense review band [V8] | At/above the ES safety upper limit and below the toxicity hallmark; review intake; companion calcium/PTH. |
| **Very High — Flag** | v > 150 | > ~375 | Toxicity hallmark [V7] | Toxicity-pattern threshold; calm review; companion calcium/PTH. |

## 11.2 How the bands were derived — transparency [B]
- Boundaries map to recognised anchors: severe deficiency <12 (V4); the IOM ≥20 and Endocrine Society ≥30
  adequacy thresholds (V1, V3) framing the **Below Optimal disagreement zone**; the ES safety upper limit 100
  and the toxicity hallmark 150 (V7, V8).
- **The 60 ng/mL boundary.** The historical Endocrine Society **preferred range 40–60 ng/mL (V2)** is retained
  as *contextual evidence* and sits **inside** the Optimal Reference band (30 ≤ v < 60). BioSense uses **60 as
  the deterministic start of its High Reference interpretation band** (60 ≤ v < 100). The 60 value is therefore
  a **BioSense-authored deterministic boundary** (marking the top of the historical preferred range), not a
  guideline cut-point; it is chosen so the bands are contiguous and non-overlapping.
- **The 100–150 review band.** The 2011 Endocrine Society guideline defines sufficiency as 30–100 ng/mL and
  sets 100 as a safety upper limit below which there is a margin against hypercalcemia, with concern arising
  above 150 (V8). BioSense's **Above Reference — Flag (100 ≤ v ≤ 150)** is therefore a **BioSense-authored
  review band** spanning the ES safety UL (100) up to the toxicity hallmark (150) — presented as "worth
  reviewing", not as an ES-declared intoxication category.
- **Deterministic, half-open intervals.** All bands use half-open intervals (`≤ v <`) so no value is
  classified into two bands and no gap exists (Very-High is the single upper flag, v > 150).
- **The disagreement is shown, not resolved:** the 20–29 band is explicitly the zone where IOM and Endocrine
  Society differ, and both frameworks are displayed (§11.4). **No averaging.**
- **Two-sided:** low bands for the deficiency pattern; flagged high bands for the toxicity pattern. **[R6]**

## 11.3 Dual-framework display (reused disagreement posture) [B][C]
Every interpretation shows **both** frameworks: **IOM** (≥20 ng/mL adequate for ~97.5%) and **Endocrine
Society** (≥30 sufficient; preferred 40–60), and notes the **2024 Endocrine Society** position that optimal
values for healthy adults are not trial-established. BioSense's bands are a wellness gradient spanning both;
the two guideline numbers are **never averaged** (CAV2). **[B][C][V5]**

## 11.4 Context-gate precedence [D]
No band is emitted as a verdict without the Context-First evaluation (§0.2). Season, latitude, pigmentation,
age, obesity, sun/sunscreen, supplementation (and form), and pregnancy are applied first; a value is
interpreted **within** that context. **[D][R1]**

## 11.5 Two-sided direction [B][D]
Low signals a **deficiency pattern**; above ~100 (and especially >150) signals a **toxicity pattern**; the
middle is favourable. "Higher" is not simply "better", and a very high value is flagged, not celebrated. **[B][R6]**

## 11.6 Population caveat [E]
Bands assume a **general adult, primary prevention, not pregnant**, and a total-25(OH)D assay. Reference
ranges and adequacy thresholds are contested and vary by body, disease context (e.g. CKD), assay, and
population (e.g. total vs bioavailable in darker-skinned individuals). Not applied to children/adolescents
or pregnancy (§15). **[E][V18][V25]**

---

# 12. Interpretation Framework — CONTEXT-FIRST (reused from SCL-010)

> **This reuses the frozen BioSense Context-First Interpretation Framework (introduced in SCL-010). No new
> methodology is introduced; vitamin D supplies biomarker-specific context inputs.** **[C][R1]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1]
   gather materially-relevant context (season/latitude/pigmentation/age/obesity/sun/sunscreen/supplementation/
   form D2-D3/assay/pregnancy/malabsorption/CKD/liver); consume PTH & calcium where available.    [R4]
   → if material context changes meaning, interpret WITHIN it; if key context/companions unavailable, record
     a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit ng/mL; result final; assay known) → else display-only.
STEP 2 — ELIGIBILITY: general adult, not pregnant → else abstain/pregnancy-aware (§15).
STEP 3 — CONFIDENCE (four-level): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED (§0.6).        [R2]
STEP 4 — BAND: assign two-sided wellness interpretation (§11), qualified by context; show BOTH frameworks.  [R5]
STEP 5 — EXPLANATIONS: if abnormal + ≥2 plausible causes (esp. high) → Possible Explanation A/B/C, ranked.  [R3]
STEP 6 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); route where appropriate; no diagnosis. [R7]
```

**Core interpretive stance [B]:** vitamin D is a contested, context-first status marker — evaluate context,
show both frameworks honestly, attend to both ends, read calcium/PTH, and name no condition. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy — reused SCL-010)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear band away from the disagreement zone, no material context conflict, companions concordant/not required | Band normally (still show both frameworks) |
| **REDUCED** | Single seasonal value / D2-assay uncertainty / minor context (sunscreen, BMI) / value in the 20–29 disagreement zone | Band cautiously; name the reducer (CAV3/CAV4) |
| **CONTEXT_REQUIRED** | Material context likely changes meaning but unavailable (high value without calcium/PTH; borderline with unknown season/supplementation) | Qualify/withhold; name needed context (CAV7) |
| **ABSTAINED** | Significant contextual uncertainty / conflicting signals / ineligible population | Explained abstention; route |

Reducers/context inputs: season/latitude timing [V21]; skin pigmentation (total vs bioavailable) [V18];
age [V19]; obesity/BMI [V17]; sunscreen/sun exposure [V20]; supplementation & form (D2 vs D3) [V14];
assay D2 under-detection [V15]; missing PTH/calcium [R4]; pregnancy/malabsorption/CKD/liver context [V23,V25];
value near a band boundary or in the 20–29 disagreement zone.

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant contextual
uncertainty **may** justify abstention. **[R2]**

---

# 14. Wellness Interpretation  *(context-first; both frameworks; multiple explanations for high)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate. Wellness, not medical;
**never a diagnosis**; both frameworks shown. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal Reference / High Reference** *(30–99 ng/mL, context-concordant).*
  "Your vitamin D is in a favourable range on the stricter (Endocrine Society) framework, and comfortably
  adequate on the IOM framework. A good result." **[B]**
- **BioSense Wellness Interpretation: Below Optimal** *(20–29 — the disagreement zone).* "Your vitamin D is
  **adequate by the IOM framework (≥20) but below the Endocrine Society's sufficiency threshold (≥30)** — it
  sits in the zone experts genuinely disagree about. Whether to raise it is a personal, context-informed
  choice; season, skin tone, body composition, and sun habits all matter." Honest; **no diagnosis** (CAV2,
  CAV4). **[B][D]**
- **BioSense Wellness Interpretation: Low / Very Low** *(<20; <12 severe).* "This is a lower-than-typical
  vitamin D pattern. Safe sun habits for your skin tone, latitude and season, and vitamin-D-containing foods
  can help; if it persists — or is very low — it's worth discussing with a healthcare professional, who may
  look at calcium and PTH too." Constructive; **no 'deficiency' diagnosis** (CAV5). **[B][D]**
- **BioSense Wellness Interpretation: Above Reference — Flag / Very High — Flag** *(100–150 / >150).* Present
  a **context-first differential** (CAV6): "A higher vitamin D is **most often explained by supplementation**;
  occasionally it reflects an assay quirk; **true toxicity is uncommon** and generally involves very high
  levels (above ~150) together with raised calcium and suppressed PTH. Reviewing your intake — and checking
  calcium/PTH — would clarify." **No 'toxicity' diagnosis** (S6). **[B][D][V7][V9]**

**Context modifiers (applied first):** a value is interpreted within season/latitude/pigmentation/age/
obesity/sunscreen/supplementation context (e.g. a winter low in a high-latitude, darker-skinned person is
framed accordingly; a total-25(OH)D reading may understate bioavailable status). **[D][V17][V18][V20]**

**Companion/context-unavailable modifier:** where calcium/PTH or key context are missing, state the
confidence limitation and name what would clarify (CAV7); never invent certainty (S8). **[D][R4]**

Every interpretation pairs with context/lifestyle guidance (§17) and the mandatory caveats (§0.10). **None
diagnoses deficiency, toxicity, osteomalacia, or rickets, and none averages the two guideline frameworks.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for vitamin D).** Material context likely changes meaning but is
  unavailable (e.g. high value without calcium/PTH; borderline value with unknown season/supplementation) →
  qualify/withhold, state what's needed (§13, CAV7). **[D][R2]**
- **15.2 Pregnancy.** Vitamin D needs and handling differ; BioSense uses pregnancy-aware caution or abstains,
  deferring to a professional. **[D][V23]**
- **15.3 Children & adolescents.** Adult bands not applied; display, suggest professional interpretation. **[D]**
- **15.4 Malabsorption / bariatric surgery.** Absorption is impaired and requirements differ; interpret as
  context or abstain. **[D][V23]**
- **15.5 CKD / liver disease.** The activation pathway (liver → kidney) is altered and disease-specific
  frameworks differ (e.g. KDOQI); interpret within context or abstain. **[D][V10][V25]**
- **15.6 D2 supplementation with a D2-insensitive assay.** Assay may understate total 25(OH)D; reduced
  confidence or context-required. **[D][V15]**
- **15.7 Toxicity-pattern (>150) or flagged high with high calcium.** Calm firmer review; name nothing (S5). **[D]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Season-consistency matters most. [A][E]** A spring-vs-fall comparison can differ materially; BioSense
  compares like seasons where possible and frames a change against seasonal variation. **[V21]**
- **Assay-consistency matters. [A]** A method change (especially affecting D2 detection) is a trend caveat,
  not a true change. **[V15]**
- **Read trends with calcium/PTH where available. [A]** A rising 25(OH)D with rising calcium and falling PTH
  is a different trend from a rising 25(OH)D alone. **[V9][V11]**
- **Direction & framing. [B]** Movement into the favourable range is encouraging; movement toward Very Low is
  a constructive prompt; movement above the safety flag is a calm review prompt, not celebrated (two-sided). **[R6]**
- **Context/abstained points. [C]** Values that are context-required or from a different season/assay are
  tagged so they don't create a false trend signal.

---

# 17. Lifestyle & Context Guidance

For vitamin D, the first tier is **context and safe lifestyle**, always context-appropriate. **[A]/[B]**

## 17.1 Safe sun & season [A][V20][V21]
Sensible sun exposure appropriate to one's **skin tone, latitude, and season** supports vitamin D; BioSense
frames this safely (never encouraging burning) and notes that sunscreen, high latitude, winter, and older
age reduce synthesis. Sun exposure does **not** cause toxicity (the skin degrades excess). **[A][V22]**

## 17.2 Diet & form [A][V14]
Vitamin-D-containing foods (fatty fish, fortified foods) contribute; **D3 tends to raise 25(OH)D more than
D2** — shared as education, **not** a dose instruction. **[A]**

## 17.3 Body composition & absorption [A][V17]
Higher BMI lowers 25(OH)D (adipose sequestration); malabsorption reduces it — context for interpreting a low
value, not a prescription. **[A]**

## 17.4 Framing rules [B][D]
Context first; **no specific doses or supplementation regimens** (S7); both frameworks shown; calm,
evidence-informed language; never a diagnosis; companion markers (calcium/PTH) suggested where a value is
flagged.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain the band and what 25(OH)D is (status reservoir; liver→kidney activation) in
warm wellness language; run the context-first evaluation; show both guideline frameworks; present multiple
ranked explanations for a high value; name which companions (calcium/PTH) would clarify; express
context-required/abstention respectfully.

The AI layer **must never**:
- emit "deficiency", "toxicity", "osteomalacia", or "rickets" as a diagnosis — even to deny one (S1)
- interpret 25(OH)D independently when material context exists (S2)
- average the IOM and Endocrine Society frameworks, or present one as the settled truth (S3)
- treat "higher" as simply "better", or fail to flag the >150 toxicity pattern (S4)
- assume toxicity from a high value — supplementation is the usual cause (S6)
- recommend specific vitamin D doses or supplementation regimens (S7)
- invent certainty when calcium/PTH or key context are unavailable — state the limitation (S8)
- produce a numeric disease-risk % from 25(OH)D (S9)
- present a BioSense band as a medical/diagnostic boundary (S11)
- infer season, supplementation, pregnancy, or a condition from the value

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing deficiency/toxicity/
osteomalacia/rickets is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes
  patterns, never names deficiency / toxicity / osteomalacia / rickets (S1). **[D][R7]**
- **Honest about disagreement.** Both frameworks are shown; the 20–29 zone is framed as contested, not
  failed (S3, CAV2, CAV4). **[D][V5]**
- **Two-sided safety.** The >150 toxicity pattern (and the 100–150 flag) get calm review with calcium/PTH
  context; nothing named (S4, S5). **[D][V7]**
- **Toxicity not assumed.** A high value defaults to supplementation, not toxicity (S6). **[D]**
- **No dose guidance.** Dose/supplement questions → educational context + referral (S7, S10). **[D]**
- **Missing context/companions stated, not invented.** (S8). **[D][R4]**
- **Correct unit factor.** The engine applies the 25(OH)D factor (2.496), not a lipid/glucose factor. **[D][V6]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. **Very Low** (<12) or a persistent **Low** pattern — companion markers (calcium/PTH) and review help. **[V4]**
2. **Above Reference — Flag** (100–150) or **Very High — Flag** (>150) — review intake; calcium/PTH context. **[V7][V8]**
3. A value with **material context** that a professional should weigh (pregnancy, malabsorption, CKD/liver). **[V23][V25]**
4. **Conflicting signals** (e.g. low 25(OH)D with high calcium, or high 25(OH)D with normal calcium). **[R3]**
5. The user is in a **context-required / abstention** situation (pregnancy, missing companions). 
6. The user **asks a medical, supplement, or dose question** (S10).

All suggestions are wellness-framed, non-urgent, non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-011 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for 25(OH)D, plus assay/form metadata
  where available, and — as interpretation inputs — **PTH and calcium** (and phosphate), plus declared
  context (season, sun, sunscreen, supplementation, BMI, pregnancy). **[R4]**
- **Supplies (as CSL bindings):** the two-sided wellness bands (Category B), the **dual-guideline-framework
  display**, the reused Context-First gate, the reused four-level confidence hierarchy, the reused
  multiple-explanations output, the reused cross-biomarker (PTH/calcium) consumption with graceful
  degradation, the toxicity model, safety rules, context/lifestyle guidance, and narrative templates — each
  with value + source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, the confidence hierarchy, the
  multiple-explanations output, and cross-biomarker intelligence — all frozen from SCL-010 — and the
  guideline-disagreement posture (SCL-003) and diagnostic-adjacency discipline (SCL-002/009). **[C]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (companions inform, never averaged
  into a single verdict; guideline frameworks never averaged).
- **Uses the correct unit factor** (2.496) — a per-analyte configuration, not a lipid/glucose factor.
- **Score contribution:** vitamin D contributes to a nutrient/bone-metabolic wellness context as a
  **two-sided, context-gated** input; context-required/abstained values do not contribute a definite band;
  the guideline disagreement is surfaced, never averaged. Any weighting is a Category [C] product decision. **[C]**

---

# 22. Medication & Supplement Context (educational only)

Educational context only; BioSense does not instruct on dose or prescribe supplementation (S7, S10). **[D]**
- Vitamin D supplementation (D3 or D2), dosing, and the management of low or high levels are clinical
  decisions made on the full picture (25(OH)D + calcium + PTH + context); a person's level on supplementation
  reflects that intake. D3 generally raises 25(OH)D more than D2 (educational only). **[A][V14]**
- Combining calcium and vitamin D supplements can raise the risk of certain adverse effects — a reason
  BioSense reads vitamin D with calcium and defers dosing to professionals. **[A][V24]**
- Any supplement, dose, or medication question → educational context + suggestion to speak with a healthcare
  professional. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **The adequacy threshold is genuinely contested. [E]** IOM ≥20 vs Endocrine Society ≥30; the 2024
   Endocrine Society declined to set optimal values for healthy adults. BioSense shows both, never averages
   (CAV2). **[V1][V3][V5]**
2. **"Optimal" for non-bone outcomes is unproven. [E]** Some sources cite ≥40 for non-skeletal effects, but
   trial evidence is lacking; BioSense does not assert it. **[V5]**
3. **Total vs bioavailable 25(OH)D. [E]** Darker-skinned individuals may have lower total but similar
   bioavailable vitamin D; a total-25(OH)D reading can understate status. **[V18]**
4. **Assay variability. [E]** Immunoassays differ (notably D2 detection); LC-MS/MS is the reference;
   standardisation is ongoing. **[V15]**
5. **Disease-specific frameworks differ. [E]** CKD/other contexts use different thresholds; general-adult
   bands don't apply there. **[V25]**
6. **Companion-marker availability is data-dependent. [E]** Without calcium/PTH, high-value interpretation is
   a confidence limitation, not a certainty. **[R4]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**;
context-first; both frameworks; multiple explanations for high). **[B]/[D]** (Illustrative; exact copy owned
by BioSense.)

```
TEMPLATE: OPTIMAL_REFERENCE / HIGH_REFERENCE (context-concordant)
"Your vitamin D (25-hydroxyvitamin D) is {value} ng/mL ({nmol} nmol/L) — in a favourable range on the
 stricter framework and comfortably adequate on the IOM framework. A good result."  +CAV1 +CAV2

TEMPLATE: BELOW_OPTIMAL (20–29 — the disagreement zone)
"Your vitamin D is {value} ng/mL ({nmol} nmol/L). This is adequate by the IOM framework (20+) but below the
 Endocrine Society's sufficiency level (30+) — the zone experts genuinely disagree about. Whether to raise
 it is a personal, context-informed choice; season, skin tone, body composition and sun habits all matter."
 +CAV1 +CAV2 +CAV4

TEMPLATE: LOW / VERY_LOW (<20 ; <12 severe)
"Your vitamin D is {value} ng/mL ({nmol} nmol/L) — a lower-than-typical pattern. Safe sun habits for your
 skin tone, latitude and season, plus vitamin-D-containing foods, can help; if it persists or is very low
 it's worth discussing with a healthcare professional, who may also look at your calcium and PTH."  +CAV1 +CAV2 +CAV5

TEMPLATE: ABOVE_REFERENCE_FLAG / VERY_HIGH_FLAG (100–150 / >150 — MULTIPLE EXPLANATIONS)
"Your vitamin D is {value} ng/mL ({nmol} nmol/L) — higher than the usual range. A few possibilities, ordered
 by likelihood:
  A) Supplementation — by far the most common reason for a high vitamin D.
  B) Assay effect — some tests read differently, especially with D2 supplements.
  C) True toxicity — uncommon, generally above ~150 with raised calcium and suppressed PTH.
 Reviewing your intake and checking calcium/PTH would clarify."  +CAV1 +CAV2 +CAV6

MODIFIER: CONTEXT_PRESENT (season/latitude/pigmentation/age/obesity/sunscreen/supplementation) →
 interpret within that context (e.g. "a winter reading at your latitude is expected to be lower").  +CAV3

MODIFIER: COMPANION_UNAVAILABLE (no calcium/PTH) / CONTEXT_UNAVAILABLE →
 "We'd interpret this more confidently with {calcium / PTH / your season and supplement details}."  +CAV7

MODIFIER: D2_ASSAY_CAUTION → append CAV3 (assay may understate total with D2 supplementation).
```

**Absolute rules:** no template diagnoses deficiency / toxicity / osteomalacia / rickets, averages the two
guideline frameworks, presents "higher" as simply "better", or presents a band as a diagnosis. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal reference, context-concordant. [illustrative]**
```
Input: 25(OH)D 42 ng/mL, adult, summer, no flags.
Context-first: seasonally expected; concordant.
Band: OPTIMAL_REFERENCE | Confidence: STANDARD | frameworks shown (IOM adequate, ES sufficient/preferred)
Narrative: OPTIMAL_REFERENCE +CAV1+CAV2.
```

**Example 2 — Below optimal (disagreement zone). [illustrative]**
```
Input: 25(OH)D 24 ng/mL, adult, winter.
Band: BELOW_OPTIMAL | Confidence: REDUCED (disagreement zone + winter season) | NO diagnosis
Narrative: BELOW_OPTIMAL +CAV1+CAV2+CAV4 (adequate by IOM, below ES; winter context); Rec: Tier 1 context/lifestyle.  [S3]
```

**Example 3 — Low, with context. [illustrative]**
```
Input: 25(OH)D 14 ng/mL, adult, high latitude, darker skin, winter, sunscreen use.
Context-first: multiple synthesis-lowering factors → interpret within context; total may understate bioavailable.
Band: LOW | Confidence: STANDARD/REDUCED | NO "deficiency" diagnosis
Narrative: LOW +CAV1+CAV2+CAV5 + context modifier; suggest companion calcium/PTH; route if persistent.  [S1]
```

**Example 4 — Very high, multiple explanations. [illustrative]**
```
Input: 25(OH)D 165 ng/mL, adult; no calcium/PTH available.
Band: VERY_HIGH_FLAG | Confidence: CONTEXT_REQUIRED (no calcium/PTH) | toxicity NOT assumed
Narrative: VERY_HIGH_FLAG differential A(supplementation)/B(assay)/C(rare toxicity) +CAV6 +CAV7; calm review.  [S5,S6,S8]
```

**Example 5 — High with companion context (toxicity pattern). [illustrative]**
```
Input: 25(OH)D 190 ng/mL + calcium high + PTH suppressed.
Band: VERY_HIGH_FLAG | Context: toxicity-pattern companions present → calm firmer review; name nothing.  [S5]
Narrative: VERY_HIGH_FLAG +CAV1+CAV6 ; route (no "toxicity" label).
```

**Example 6 — Companion/context unavailable at borderline. [illustrative]**
```
Input: 25(OH)D 28 ng/mL, season/supplementation unknown, no PTH/calcium.
Band: BELOW_OPTIMAL | Confidence: CONTEXT_REQUIRED | Narrative: +CAV2+CAV4+CAV7 (name needed context); no invented certainty.  [S8]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, four-level confidence
  hierarchy, multiple-explanations output, and cross-biomarker intelligence.
- **SCL-003 (LDL-C)** — source of the reused guideline-disagreement / dual-framework posture (never average).
- **SCL-002 (HbA1c) / SCL-009 (Fasting Glucose)** — source of the reused diagnostic-adjacency discipline.
- **SCL-004 (HDL-C) / SCL-009** — precedent two-sided banding with flags.
- **Future PTH & Calcium SCLs** — the companion markers vitamin D consumes; where unavailable, a confidence
  limitation is recorded.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the V-series IDs in §0
> and the body. Developers finalising the pack should confirm exact page/table locators against the primary
> PDFs where required.

**Thresholds & the guideline disagreement (Category A anchors)**

1. Holick MF, et al. **Evaluation, Treatment, and Prevention of Vitamin D Deficiency: an Endocrine Society
   Clinical Practice Guideline.** *J Clin Endocrinol Metab* 2011;96(7):1911–1930. (Opened and verified.) —
   *deficiency <20, insufficiency 21–29, sufficiency 30–100 ng/mL; preferred 40–60; verbatim: "most studies
   in children and adults have suggested that the blood levels need to be above 150 ng/ml before there is any
   concern. Therefore, an UL of 100 ng/ml provides a safety margin in reducing risk of hypercalcemia." — the
   primary source for the 100 ng/mL safety UL and the 100–150 review-range framing (V1, V2, V8).*
2. StatPearls: **Vitamin D** (NBK441912) and **Vitamin D Deficiency** (NBK532266). — *ES thresholds;
   preferred 40–60; deficiency <12 (severe); toxicity >150 ng/mL; spring/fall testing; at-risk groups;
   sun-not-toxic (V1, V2, V4, V7, V20, V21, V22, V23).*
3. Institute of Medicine (Ross AC, et al.) DRIs for Calcium and Vitamin D (2011); **IOM committee response**
   (PMC5393439); **optimal-level meta-summary** (PMC12029153). — *IOM ≥20 ng/mL adequate for 97.5%; 16 ~half;
   2024 Endocrine Society declined optimal values; ng/mL→nmol/L ×2.5 (V3, V4, V5, V6).*

**Toxicity (Category A)**

4. **Vitamin D Toxicity — A Clinical Perspective** (PMC6158375); **MSD Manual: Vitamin D Toxicity**;
   StatPearls **Vitamin D Toxicity** (NBK557876); NIH ODS **Vitamin D Health Professional Fact Sheet**
   (ods.od.nih.gov); vitamin D replacement protocol NCT03686150 (labs use 100 ng/mL as the upper limit;
   intoxication does not occur until >150 ng/mL). — *>150 ng/mL (>375 nmol/L) toxicity hallmark; ES safety UL
   100 (primary source: ref 1, Holick 2011); hypercalcemia + suppressed PTH (V7, V8, V9). The 100 ng/mL UL is
   anchored to the original Endocrine Society guideline (ref 1); no tertiary encyclopaedic source is relied upon.*

**Metabolism, PTH/calcium, D2 vs D3, assay (Category A)**

5. MSD Manual (vitamin D metabolism); **Mayo Clinic Laboratories 25HDN**; Medscape **25-Hydroxyvitamin D
   Reference Range** (2088694). — *liver→25(OH)D→kidney→1,25(OH)2D; PTH/calcium regulation; context
   determinants; total 25(OH)D reference ~20–100; total vs bioavailable in Black individuals (V10, V11, V13,
   V16, V17, V18, V19, V20).*
6. Houghton LA, Vieth R. **The case against ergocalciferol (vitamin D2) as a vitamin supplement.** *Am J Clin
   Nutr* 2006;84(4):694–697; **Adv Nutr** D2-vs-D3 meta-analysis (2023); PMC5324269 (D2/D3 RCT). — *D3 more
   potent than D2 at raising 25(OH)D (V14).*
7. Efficacy of immunoassays to detect 25-OH-D2/D3 (PMC6695248). — *Architect under-detects 25-OH-D2; assay
   caution with D2 supplementation (V15).*

**PTH threshold, disease context, prevalence (Category A/P)**

8. **Threshold for the 25(OH)D–PTH relationship** (PMC8702147). — *PTH inverse; population-variable PTH
   plateau ~14–18 ng/mL (V12).*
9. K/DOQI / KDIGO CKD-MBD (via NCT05543928); dynapenia cohort (PMC9613743). — *CKD-specific thresholds;
   >half the world insufficient/deficient (V25, V26).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–4; they are
> BioSense Version 1 classifications, two-sided and context-gated, not attributable to any single reference
> as a diagnostic threshold, and **do not restate diagnostic labels.** The IOM and Endocrine Society
> frameworks are presented separately and **never averaged.**

---

# 28. Founder Decisions Required

The vitamin D methodology reuses frozen BioSense frameworks (Context-First interpretation, four-level
confidence, multiple explanations, cross-biomarker intelligence, guideline-disagreement handling, two-sided
banding, diagnostic-adjacency discipline) and follows directly from the evidence. Two optional presentation/
policy items remain: **[C][E]**

**D-1 — Confirm the two-sided band boundaries and the dual-framework display**, in particular the **Below
Optimal (20–29) disagreement zone** and the decision to show both IOM (≥20) and Endocrine Society (≥30,
preferred 40–60) without averaging. Confirmation requested that this honest dual-framework presentation is
the intended default. **Founder sign-off requested.**

**D-2 — Confirm the cross-biomarker consumption scope for V1.** SCL-011 is specified to consume **calcium and
PTH** where available (with graceful degradation to a confidence limitation when absent). **Founder decision
requested** on whether V1 activates vitamin D with 25(OH)D-only context (degrading gracefully) or waits for
the calcium/PTH packs to exist.

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-011 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/
reference figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. Vitamin
D reuses frozen BioSense methodology throughout — the Context-First Interpretation Framework, four-level
confidence hierarchy, multiple-explanations output, and cross-biomarker intelligence (all from SCL-010), the
guideline-disagreement / dual-framework posture (SCL-003), two-sided banding with flags (SCL-004/009/010),
and the diagnostic-adjacency discipline (SCL-002/009) — introducing only vitamin-D-specific scientific
content (the 25(OH)D thresholds and dual-framework display, the liver→kidney activation pathway and PTH/
calcium relationships, the D2-vs-D3 and assay-variability notes, the toxicity thresholds, and the vitamin-D
context modifiers). No new methodology was required; all structure remains consistent with SCL-001 through
SCL-010.*
