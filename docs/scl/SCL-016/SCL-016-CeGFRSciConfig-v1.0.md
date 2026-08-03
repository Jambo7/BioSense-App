# SCL-016 — CREATININE (measured) + eGFR (governed derived estimate)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. Creatinine and eGFR form a governed measured/derived pair: creatinine is the measured observation; eGFR is a governed derived estimate (CKD-EPI 2021) interpreted via the existing Derived Biomarker Governance and Context-First Framework. Neither is a diagnosis of kidney disease. No new methodology introduced.*

**Document ID:** SCL-016
**Biomarkers:** Creatinine (serum, measured) + Estimated Glomerular Filtration Rate (eGFR, derived estimate)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 1 August 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. This pair reuses the frozen methodology throughout — **Derived Biomarker Governance (SCL-007)** for eGFR, the Context-First Interpretation Framework (SCL-010), the four-level confidence hierarchy (SCL-010), multiple-explanations output (SCL-010), cross-biomarker intelligence (SCL-010), two-sided banding (SCL-004/009/010/011/012/014/015), sex-aware banding (SCL-004/010/014/015), guideline-disagreement handling (SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/014/015) — introducing only Creatinine/eGFR-specific scientific content. All sections remain consistent with SCL-001 through SCL-015.

---

> **What this document is.** SCL-016 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for Creatinine and eGFR. It reuses existing
> BioSense methodology and does not redesign the Constitution, the ENG documents, the Blood Analysis Engine,
> or the SCL architecture. **No new methodology is introduced.**
>
> **What BioSense is.** A premium wellness and preventative health-intelligence platform.
> **Not** a medical device. It does **not** diagnose disease, **not** replace clinicians,
> **not** prescribe. All content is written from a **wellness-optimisation** perspective.
>
> **On thresholds & equations.** Recognised guideline numbers and the adopted estimating equation are
> reproduced faithfully and attributed (Category A). The BioSense Wellness Interpretation Bands are a
> transparent interpretation of that evidence for a general-adult wellness audience (Category B) — they are
> **BioSense Version 1 Wellness Interpretations, not diagnostic boundaries or universal medical truth.**

---

## STRUCTURAL-FIT NOTE (Creatinine + eGFR vs SCL-001) — reuses frozen frameworks; no new pattern

This pair presents the same structural characteristics BioSense has already solved for, and maps onto the
frozen methodology without extension. Per the founder's Measured/Derived-Pair decision, **creatinine is the
measured observation and eGFR is a governed derived estimate**, clearly distinguished, and **neither is
presented as a diagnosis of kidney disease**:

1. **Measured/derived pair via Derived Biomarker Governance — reused (SCL-007).** eGFR is a **governed derived
   biomarker**: it declares its accepted estimating equation (CKD-EPI 2021 race-free creatinine), equation
   versioning, provenance, parent observations (creatinine + age + sex), calculation eligibility, confidence
   inheritance, validity propagation, abstention rules, and audit history; the engine **never silently
   substitutes one equation for another** (§0.5, §9). This reuses SCL-007 governance — extended in scope from
   a subtraction to a validated equation, **not a new methodology**.
2. **Context-First — reused (SCL-010).** Both are interpreted only after context — age, sex, muscle mass, body
   composition, hydration, recent strenuous exercise, high meat intake, creatine supplementation, pregnancy,
   acute illness, nephrotoxic medications, blood pressure, diabetes, and future urine albumin/cystatin C —
   evaluated **before** banding (§0.2, §8, §12).
3. **Cross-biomarker intelligence — reused (SCL-010).** The pair consumes **fasting glucose (SCL-009), HbA1c
   (SCL-002), and future blood pressure, urine albumin, cystatin C, and electrolytes**, where available (§9).
4. **Sex-aware banding — reused (SCL-004/010/014/015).** Creatinine ranges are sex-specific, and **sex is also
   a parent input to the eGFR equation** (§11).
5. **Guideline/equation-disagreement handling — reused (SCL-003/011/012).** Different validated equations
   (CKD-EPI 2021 vs EKFC vs regional) and differing reference ranges are presented as distinct frameworks,
   **never averaged** (§10, §11).
6. **Two-sided banding with flags — reused.** Creatinine is two-sided (high = filtration/production context;
   low = muscle/malnutrition flag); **eGFR is low-dominant** (lower = reduced estimated filtration = the
   meaningful end) (§11).
7. **Multiple-explanations output — reused (SCL-010).** An abnormal value gets **ranked possibilities**
   (muscle mass, diet, creatine, hydration, medications, genuine filtration change) — never a single certain
   cause (§11, §14).
8. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012/014/015).** BioSense never emits "chronic
   kidney disease," "kidney failure," or "acute kidney injury" as a diagnosis; it detects the pattern, routes,
   and names nothing (§18, §19).

**Biomarker-specific content introduced:** the creatinine thresholds and their sex-specificity; the CKD-EPI
2021 equation and its governance; the KDIGO GFR-category mapping; the estimate-not-measured framing; the
lagging-indicator and persistence caveats; and the muscle/diet/hydration/drug context modifiers. **No new
methodology is required.** **[C]**

---

## CONTENT CLASSIFICATION KEY

- **[A]** Source-derived fact / recognised threshold / adopted equation.
- **[B]** BioSense Version 1 wellness interpretation (labelled).
- **[C]** Product-policy decision.
- **[D]** Safety / healthcare-review wording.
- **[E]** Area of uncertainty.

---

# SCIENTIFIC POSITION STATEMENT

BioSense is a premium wellness and preventative health-intelligence platform. It is not a medical device.
It does not diagnose disease, and it does not replace healthcare professionals.

Creatinine and eGFR are best understood as a **pair**, and the founder's Measured/Derived-Pair decision is
central to how BioSense treats them. **Creatinine is a measured laboratory observation** — a muscle waste
product whose blood level reflects **both** how well the kidneys filter **and** how much creatinine the body
produces (largely a function of muscle mass). **eGFR is a governed derived estimate** of kidney filtration,
calculated from creatinine together with age and sex using a validated, versioned equation (CKD-EPI 2021).
**Neither is a diagnosis of kidney disease**, and BioSense is explicit that **eGFR is an estimate, not a
directly measured physiological quantity**.

Because creatinine is shaped by muscle, diet, hydration, and certain medications as well as by filtration,
BioSense always begins with context, reads the two together, treats eGFR as a **governed** derived biomarker
(declaring its equation, version, parents, eligibility, and confidence inheritance, and never silently
swapping equations), and — where several explanations fit an abnormal value — **ranks them by the evidence**
rather than asserting one. It uses sex-aware handling, shows that reference ranges and estimating equations
genuinely differ rather than splitting them, notes that creatinine is a **lagging** indicator and that a low
eGFR is meaningful only when it **persists**, and names no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as the
evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values, the adopted equation, and rules to activate Creatinine + eGFR. Every value carries a source
> ID (K/G-series / R-series → §27) and a category tag. Canonical units: creatinine mg/dL (×88.4 → µmol/L);
> eGFR mL/min/1.73m². **Measured/derived pair; eGFR governed (CKD-EPI 2021); sex-aware; creatinine two-sided,
> eGFR low-dominant; context-first; NEVER a kidney-disease diagnosis; eGFR is an ESTIMATE.**

## 0.1 Canonical units — [A]
```
creatinine_unit: mg/dL   (SI: µmol/L = mg/dL × 88.4; reverse µmol/L ÷ 88.4)   [K5]   # creatinine-specific factor; do NOT apply 38.67/88.57/18.0/2.496/0.738/2.266
eGFR_unit: mL/min/1.73m² (body-surface-area standardised; a DERIVED ESTIMATE, not measured)   [G1]
Always retain creatinine value+unit, age, sex, and available context. Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  demographics/body: age, biological sex (BOTH are eGFR equation parents), muscle mass, body composition;   [K7,G3]
  behaviour/intake: hydration/dehydration, recent strenuous exercise, high meat intake, creatine supplementation; [K8,K9,G13]
  physiology/state: pregnancy (eGFR NOT valid), acute illness/possible AKI (eGFR NOT valid), rhabdomyolysis; [K12,K15,G9]
  medications: nephrotoxic or secretion-inhibiting drugs (trimethoprim/cimetidine/NSAIDs raise creatinine w/o changing true GFR); [K10]
  metabolic/vascular: blood pressure, diabetes (fasting glucose SCL-009, HbA1c SCL-002);                     [R4]
  companion kidney markers: future urine albumin (kidney-damage marker), future cystatin C (accuracy), electrolytes. [G6,G10]
CORE RULE (founder): creatinine = measured marker influenced by kidney filtration AND creatinine production; eGFR = ESTIMATE of filtration; NEITHER is a kidney-disease diagnosis. [K2,G1][B3]
  → creatinine is a LAGGING indicator (may be "normal" with early function loss); eGFR meaningful as a trend + only if LOW persists >3 months. [K6,G7]
  → where several explanations fit an abnormal value, RANK them (§0.5); never assert one.
IF material context changes meaning → interpret WITHIN that context.                                          [R1]
IF companion markers / key context unavailable → CONFIDENCE LIMITATION, not certainty.                       [R4]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors) — Creatinine two-sided; eGFR low-dominant
```
CREATININE_WELLNESS_BAND (mg/dL, general adult; SEX-AWARE; after context gate):   [K3,K4]
  MALE:    LOW_CONTEXT_FLAG v<0.7 | OPTIMAL 0.7–1.3 | HIGH_NORMAL_WATCH >1.3–1.5 | ELEVATED_CONTEXT >1.5   [K3]
  FEMALE:  LOW_CONTEXT_FLAG v<0.6 | OPTIMAL 0.6–1.1 | HIGH_NORMAL_WATCH >1.1–1.3 | ELEVATED_CONTEXT >1.3    [K3]
  (ranges lab-dependent & vary across sources — shown as frameworks, NEVER averaged; use lab's own range where provided) [K4,R5]
  DIRECTION: TWO-SIDED (high = filtration/production context; low = muscle/malnutrition context flag). [R6]

eGFR_WELLNESS_BAND (mL/min/1.73m²; DERIVED via CKD-EPI 2021; mapped to KDIGO GFR categories):   [G5]
  OPTIMAL_G1        v >= 90          # normal filtration estimate (CKD only if a kidney-damage marker also present) [G5,G6]
  MILD_REDUCTION_G2 60–89           # mildly reduced estimate (CKD only if damage marker present) [G5,G6]
  MODERATE_G3a      45–59           # moderately reduced [G5]
  MODERATE_G3b      30–44           # moderately-severely reduced [G5]
  SEVERE_G4         15–29           # severely reduced [G5]
  KIDNEY_FAILURE_RANGE_G5 v < 15    # KDIGO G5 range (wellness context ONLY — never a diagnosis) [G5]
  DIRECTION: LOW-DOMINANT (lower = reduced estimated filtration = meaningful end). [R6]
  PERSISTENCE: eGFR <60 is wellness-meaningful only if PERSISTENT >3 months (single low value → repeat). [G7]
UNIT: creatinine mg/dL (×88.4 µmol/L); eGFR mL/min/1.73m². Sex REQUIRED (band + eGFR parent); if sex/age unknown → eGFR not computed + reduced confidence. [G3][R8]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. eGFR is an ESTIMATE. Context-first; never a diagnostic label. [B][D]**

## 0.4 eGFR = governed derived biomarker — [A]+[C] — REUSED Derived Biomarker Governance (SCL-007)
```
eGFR GOVERNANCE (id=SCL016_EGFR_CKDEPI2021_v1; derived; parents = creatinine (measured) + age + sex):   [R9]
  ACCEPTED EQUATION: CKD-EPI 2021 race-free creatinine (current international standard; replaced MDRD & 2009 CKD-EPI; endorsed KDIGO/NKF/NICE/ASN). [G2]
  FORM: eGFR = 142 × min(Scr/κ,1)^α × max(Scr/κ,1)^(−1.200) × 0.9938^Age × (1.012 if female);  κ=0.7(F)/0.9(M); α=−0.241(F)/−0.302(M); Scr in mg/dL. [G3]
  VERSIONING: record equation id + version used; NEVER silently substitute one equation for another; where equation version materially affects interpretation, record the version. [founder][R9]
  PROVENANCE: store parent creatinine value/unit/assay + age + sex + equation id/version + timestamp (audit history). [R9]
  ELIGIBILITY: adults ≥18; NOT computed (ABSTAIN) in pregnancy, extremes of muscle mass, acute illness/possible AKI, children <18. [G9]
  CONFIDENCE INHERITANCE: eGFR confidence ≤ parent creatinine confidence; muscle/diet/drug context that biases creatinine propagates to eGFR. [R9,K7-K10]
  VALIDITY PROPAGATION: if creatinine invalid/out-of-measuring-interval → eGFR invalid or reported as </> boundary; do not emit a spuriously precise eGFR. [G14]
  RECONCILIATION: if a lab-reported eGFR differs from BioSense-computed, surface BOTH with equation provenance; never silently overwrite. [R9]
  FUTURE: cystatin C / combined Cr+CysC equation (KDIGO 2024, higher accuracy) reserved as a governed future equation version. [G10]
```

## 0.5 Multiple-explanations (ranked) — [C] — REUSED (SCL-010)
```
On any abnormal creatinine/eGFR (or discordant pattern), when ≥2 causes plausible, output RANKED possibilities by evidence + context: [R3][B5]
  HIGH creatinine / LOW eGFR weight by: muscle mass (commonest non-renal in young adults) [K7]; recent high meat intake (+0.1–0.3) [K8];
                     creatine supplement / strenuous exercise [K9]; dehydration [K9,G13]; secretion-inhibiting drugs (trimethoprim/cimetidine/NSAIDs) [K10];
                     genuine filtration reduction (esp. if persistent, with diabetes/BP/albuminuria) [K15,R4].
  LOW creatinine weight by: low muscle mass / sarcopenia / malnutrition / weight loss [K11]; pregnancy [K12]; (elderly → may MASK low GFR → rely on eGFR) [K13].
NEVER present a single certain cause; NEVER name a diagnosis; explain uncertainty. [R7]
```

## 0.6 Confidence hierarchy (four-level) — [C] — REUSED (SCL-010)
```
STANDARD          : clear creatinine AND age+sex known (eGFR computable & eligible) AND sufficient context AND not obviously confounded.
REDUCED           : single value / muscle-mass or diet/creatine/hydration/drug confound / lab-range variation / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : abnormal value with NO context (muscle mass/hydration/drugs) and NO companions (albumin/cystatin C) → rank-with-limitation or request repeat; name what's needed. [R2,R4]
ABSTAINED         : eGFR ineligible (pregnancy/muscle-extremes/AKI/<18) OR significant contextual uncertainty OR conflicting signals — explained abstention. [R2,G9]
Reduced confidence does NOT auto-block; ineligibility/significant uncertainty MAY justify abstention. New low eGFR → prefer REPEAT (persistence >3 months). [G7]
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  NOT a diagnosis. NEVER emit "chronic kidney disease/CKD", "kidney failure", "acute kidney injury/AKI", "renal failure", or any condition as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  Creatinine = measured marker of filtration AND production; eGFR = ESTIMATE of filtration; NEITHER is a kidney-disease diagnosis; interpret via context, never in isolation. [B3][K2,G1]
S3  eGFR is an ESTIMATE, not a measured quantity — always framed as such. [G1]
S4  eGFR GOVERNED: compute via CKD-EPI 2021 (id/version); parents creatinine+age+sex; never silently substitute equation; record version; abstain where ineligible. [R9,G9]
S5  On abnormal value with ≥2 plausible causes → RANKED possibilities; NEVER assert a single cause. [R3]
S6  Sex/age-aware: required for creatinine band + eGFR; if missing → reduced confidence, eGFR not computed. [G3]
S7  Creatinine is a LAGGING indicator; a "normal" creatinine does not exclude early reduction — rely on eGFR + context. [K6]
S8  New/isolated low eGFR → PERSISTENCE framing (repeat; <60 meaningful only if >3 months); consider confounds (dehydration/diet/exercise/drugs). [G7,G13]
S9  Context that biases creatinine (muscle mass/meat/creatine/drugs) propagates to eGFR → surface and reduce confidence. [K7-K10,R9]
S10 Cross-markers (albumin/cystatin C/glucose/HbA1c/BP/electrolytes) unavailable → confidence limitation, not invented certainty. [R4]
S11 Never recommend treatments/medication changes/doses; never produce a numeric kidney-disease-risk %; medication questions → educate + refer. [D]
S12 RED FLAGS (rapid creatinine rise / sharp eGFR drop; eGFR in G4/G5 range; possible AKI; pregnancy with high creatinine + hypertension) → calm prompt healthcare review; never emergency-diagnose. [K15,G9,K12][D]
S13 Never present a BioSense band, reference range, GFR category, or equation output as a medical/diagnostic boundary.
S14 Represent reference-range and estimating-equation disagreement (CKD-EPI 2021 vs EKFC vs regional); NEVER average thresholds or equations. [G11][R5]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & COMPANION MARKERS (the key move): read creatinine WITH eGFR and context (muscle mass/diet/creatine/hydration/drugs); and where relevant fasting glucose, HbA1c, BP, future urine albumin (damage marker) and cystatin C (accuracy); for a NEW low eGFR, REPEAT (persistence >3 months) with normal hydration. [G7,G13,R4]
Tier 2 LIFESTYLE (context-appropriate): general kidney-friendly wellness (hydration, blood-pressure & glucose awareness, sensible protein/supplement/NSAID use) — framed as education, not treatment; note age-related decline (~1 mL/min/yr after 30) is normal. [G8]
Tier 3 HEALTHCARE DISCUSSION (calm) when: persistent eGFR <60 (>3 months) | eGFR G4/G5 range | rapid creatinine rise (possible AKI) | diabetes/BP with a kidney-damage marker | pregnancy with high creatinine | discordant creatinine vs cystatin C. [K15,G7,G9][D]
NEVER a specific treatment, medication change, or dose at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → sex-aware creatinine band + governed eGFR (if eligible) → template; RANKED possibilities where abnormal/discordant; ALWAYS "eGFR is an estimate".
CREATININE OPTIMAL + eGFR G1/G2 (no damage marker) → affirming, "estimate + single snapshot" caveat.
CREATININE HIGH-NORMAL/ELEVATED → context-first (muscle/diet/creatine/hydration/drugs ranked); lagging-indicator note; never a diagnosis.
eGFR G3a/G3b → calm; persistence framing; companion markers (albumin/cystatin C) named; context; never a diagnosis.
eGFR G4/G5 range → calm prompt healthcare review; estimate caveat; never alarm, never diagnose.
CREATININE LOW → gentle; muscle/malnutrition context; in elderly note eGFR may tell a clearer story.
eGFR ineligible (pregnancy/muscle-extremes/AKI/<18) → abstain + explain; creatinine shown with heavy caveat.
companion markers unavailable → confidence limitation; name what would clarify (albumin/cystatin C).
Never "normal/abnormal" as a verdict; never a diagnosis (CKD/kidney failure/AKI); always estimate-not-measured for eGFR.
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Creatinine reflects both how well the kidneys filter and how much your muscles produce, so it's read
      alongside eGFR and your wider context (muscle mass, diet, hydration, medications) — not on its own."
CAV3 "eGFR is an estimate of kidney filtration calculated from creatinine, age and sex — not a directly
      measured value — so it's best read as a trend and with clinical context."
CAV4 (reduced/context) name the context reducer(s) or missing marker (muscle mass, hydration, drugs, urine albumin, cystatin C, age/sex).
CAV5 (new/isolated low eGFR) "A single lower eGFR is often temporary — hydration, a hard workout, a high-meat
      meal or certain medicines can nudge it. A low eGFR is usually only meaningful if it persists (over about
      three months), so repeating the test is the sensible next step."
CAV6 (abnormal, ranked) "Because several things affect these numbers, we've noted the more likely explanations
      given your context rather than pointing to one — best confirmed with a professional."
CAV7 (G3b/G4/G5 range or rapid rise) "This degree of change, or these accompanying signs, is worth a prompt,
      unhurried conversation with a healthcare professional."
CAV8 (markers unavailable) "We'd interpret this more confidently with a urine albumin test (a kidney-damage
      marker) and, where accuracy matters, cystatin C — plus your blood pressure and glucose picture."
CAV9 (lagging indicator) "Creatinine can look normal even when filtration has changed a little, which is why
      eGFR and the trend over time matter more than a single creatinine number."
CAV10 (equation/version) "eGFR depends on which validated equation is used; we use the current race-free
       CKD-EPI 2021 equation and note the version, since different equations can give slightly different numbers."
```

## 0.11 Source & version identifiers
```
config_id: SCL-016   config_version: 1.0
creatinine_band_id: BIOSENSE_CREATININE_SEXAWARE_BANDS_v1     (Category B; two-sided; sex-aware; anchors K3,K4)
egfr_band_id: BIOSENSE_EGFR_KDIGO_BANDS_v1                    (Category B; low-dominant; KDIGO G1–G5 map; G5)
egfr_equation_id: SCL016_EGFR_CKDEPI2021_v1                   (governed derived; CKD-EPI 2021 race-free; parents creatinine+age+sex; R9; G2,G3)
derived_governance_ref: SCL007_DERIVED_GOVERNANCE_v1          (reused; R9 — equation id/version/provenance/eligibility/confidence-inheritance/validity-propagation/abstention/audit)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1   (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1        (reused; R2)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1        (reused; R3 — ranked causes)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1          (reused; R4 — glucose/HbA1c/BP/urine-albumin/cystatin-C/electrolytes)
sex_aware_ref: SCL004_SEX_AWARE_BANDS (reused; R8)
guideline_disagreement_ref: SCL011/012 posture               (reused; R5 — reference ranges + equations)
safety_rules_id: SCL016_SAFETY_v1                            (S1-S14)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

**Creatinine** is a waste product of creatine, the compound muscles use for energy; it is released into the
blood at a fairly steady rate, filtered by the kidneys, and excreted in urine. **[A][K1]** Its blood level is
a widely used window on kidney filtration — but the founder's Measured/Derived-Pair decision frames it
precisely: **creatinine reflects both how well the kidneys filter and how much creatinine the body produces**,
the latter driven largely by muscle mass. <cite index="29-1">Elevated creatinine indicates that kidney filtration capacity is reduced relative to creatinine production from muscle.</cite> So a raised creatinine can mean reduced filtration **or** simply more muscle, more dietary meat, a creatine supplement, dehydration, or certain medications. **[A][K2][K7][K8]**

**eGFR** (estimated glomerular filtration rate) is a **governed derived estimate** of kidney filtration,
calculated from creatinine together with age and sex using a validated equation. <cite index="23-1">eGFR is an estimate. Not validated in pregnancy, extremes of muscle mass, acute kidney injury or children under 18.</cite> BioSense adopts the **CKD-EPI 2021 race-free creatinine equation** — <cite index="23-1">the current international standard, replacing both the older MDRD equation and the original 2009 CKD-EPI equation</cite> — and treats it as a governed derived biomarker with a declared version and provenance. **[A][G1][G2]**

**Neither is a diagnosis of kidney disease.** BioSense reads the two together, in context, ranks the plausible
explanations for an abnormal value, and names no condition. **[B][B3]**

- **Creatinine reported in:** mg/dL (SI µmol/L = mg/dL × 88.4). **[A][K5]**
- **eGFR reported in:** mL/min/1.73m² (a derived **estimate**, not a measurement). **[A][G1]**
- **Nature:** measured marker (creatinine) + governed derived estimate (eGFR); **neither a kidney-disease diagnosis** **[A][B3]**
- **Direction:** creatinine two-sided; **eGFR low-dominant** (lower = reduced estimated filtration) **[A][R6]**
- **Sex/age:** sex-specific creatinine ranges; **sex and age are eGFR equation parents** **[A][G3]**
- **BioSense role:** a context-first governed measured/derived pair, read with glucose, HbA1c, and future BP/urine albumin/cystatin C.

---

# 2. Physiological Function

The kidneys filter blood at the glomeruli; **glomerular filtration rate (GFR)** is the volume filtered per
minute and is the best overall index of kidney function. Because GFR is hard to measure directly, it is
**estimated** from an endogenous filtration marker — creatinine — that the body produces at a relatively
steady rate and the kidneys clear. **[A]** As filtration falls, creatinine accumulates; as it rises (e.g. in
pregnancy), creatinine falls. **[A][K12]**

Two features define interpretation **[A]**:
- **Creatinine has two drivers.** Its level reflects filtration **and** production (muscle mass, diet,
  supplements) — so it is never read in isolation. **[A][K2]**
- **eGFR is an estimate.** It converts creatinine (plus age and sex) into a standardised filtration estimate,
  which adjusts for the fact that the same creatinine means different filtration in a muscular young man and a
  frail older woman. **[A][G1][K13]** Two physiological caveats: creatinine is a **lagging** indicator (it may
  stay "normal" until ~50% of function is lost), and ~10–15% of urinary creatinine comes from tubular
  secretion, so creatinine-based estimates have inherent limits. **[A][K6][K14]**

---

# 3. Scientific Background

Three scientific themes shape how BioSense represents this pair. **[A]**

**First, creatinine is production-dependent, so context is decisive.** High muscle mass is the commonest
non-renal cause of a raised creatinine in younger adults; a high-meat meal can transiently add 0.1–0.3 mg/dL;
creatine supplements, strenuous exercise, and dehydration raise it; and trimethoprim, cimetidine, and NSAIDs
raise **measured** creatinine by blocking tubular secretion **without changing true filtration**. <cite index="29-1">High muscle mass: the most common non-renal cause of elevated creatinine in younger adults; creatinine of 1.3 to 1.5 mg/dL in a highly muscular man with normal cystatin C reflects physiology, not kidney disease.</cite> **[A][K7][K8][K9][K10]**

**Second, eGFR is a governed, versioned estimate — and the equation matters.** The field moved from MDRD to
the 2009 CKD-EPI to the **2021 race-free CKD-EPI** equation, which the NKF/ASN Task Force recommended after
reviewing more than 20 approaches, removing the race coefficient. <cite index="21-1">The NKF/ASN Task Force recommended implementation of the CKD-EPI 2021 equation for eGFR using creatinine and expanded utilization of cystatin C testing.</cite> Different validated equations (CKD-EPI 2021, EKFC, regional equations) can reclassify GFR categories differently, so the equation used must be declared and never silently swapped. **[A][G2][G4][G11]**

**Third, eGFR categories and the meaning of "low" follow KDIGO — with persistence.** KDIGO GFR categories run
G1 (≥90) to G5 (<15); G1/G2 indicate CKD only if a kidney-damage marker (e.g. albuminuria) is present; and a
low eGFR defines CKD only when it **persists beyond three months**. <cite index="24-1">Persistently low eGFR (<60 for >3 months) defines chronic kidney disease; staging combines eGFR and albuminuria.</cite> eGFR also declines naturally with age (~1 mL/min/1.73m² per year after 30). **[A][G5][G6][G7][G8]**

**The wellness reading — [B]:** creatinine and eGFR are a context-first, sex-aware, governed measured/derived
pair — read together, with eGFR as a versioned estimate, plausible explanations ranked rather than one
asserted, persistence and lagging-indicator caveats honoured, and no condition named.

**An honest boundary — [E]:** reference ranges and estimating equations genuinely differ, creatinine is
production-dependent and lagging, and eGFR is not valid in several states — so BioSense leans on context and
companion markers (and, in time, cystatin C) and is explicit about confidence. **[E][K4][G9][G11]**

---

# 4. Why Creatinine + eGFR Matter

**1. Together they estimate the kidney's overall function. [A][G1]** GFR is the best single index of kidney
function, and the creatinine→eGFR pair is the standard, accessible way to estimate it. **[A]**

**2. Interpreted well, they separate physiology from filtration. [A][K7]** The context-first, ranked-cause
approach distinguishes a muscular athlete's high creatinine from a true filtration change — and avoids
implying a disease that isn't established. **[A]**

**3. They anchor metabolic/vascular wellness. [A][R4]** Kidney filtration integrates with glucose, HbA1c, and
blood pressure; with future urine albumin and cystatin C, the pair becomes a richer kidney-wellness picture —
exactly what cross-biomarker intelligence is for. **[A]**

**Why BioSense measures them — [C]:** a modifiable, high-value measured/derived pair whose meaning is
context-dependent and whose derived member needs governance — the ideal case for Derived Biomarker Governance,
Context-First interpretation, sex-aware banding, ranked explanations, and companion-marker integration, all
while never diagnosing kidney disease.

---

# 5. Laboratory Measurement

Creatinine is measured on a standard serum/plasma chemistry panel (mg/dL; SI µmol/L), and eGFR is **computed**
from it. **[A][K5][G1]**

- **Creatinine unit & factor.** mg/dL is canonical; µmol/L = mg/dL × 88.4. This is a **creatinine-specific**
  factor. **[A][K5]**
- **Assay note.** Creatinine is measured by enzymatic or Jaffe methods; standardisation (IDMS-traceable)
  matters because the CKD-EPI 2021 equation assumes standardised creatinine. **[A][G3]**
- **Sex & age.** Reference ranges are sex-specific; **sex and age are equation parents** for eGFR, so both are
  required to compute it. **[A][K3][G3]**
- **Lab/assay variability.** Reference ranges vary by lab, method, age, and muscle mass — the lab's own range
  and prior results matter. **[A][K4]**
- **Confounds.** Dehydration, recent strenuous exercise, high meat intake, creatine supplements, and
  secretion-inhibiting drugs (trimethoprim/cimetidine/NSAIDs) shift **measured** creatinine — often without a
  true filtration change; a new value is repeated after normal hydration. **[A][K8][K9][K10][G13]**
- **Companion panel.** Read with **eGFR**, and where available **urine albumin** (kidney-damage marker),
  **cystatin C** (accuracy, esp. muscular individuals), **glucose/HbA1c**, **blood pressure**, and
  **electrolytes**. **[A][G6][G10][R4]**

---

# 6. Units

- **Creatinine — mg/dL** — standard; **BioSense canonical.** **[A/C]**
- **Creatinine — µmol/L** — SI; = mg/dL × 88.4 (reverse ÷ 88.4). **[A][K5]**
- **eGFR — mL/min/1.73m²** — body-surface-area-standardised derived **estimate**. **[A][G1]**
- **Creatinine factor is 88.4** — distinct from cholesterol (38.67), triglycerides (88.57), glucose (18.0),
  25(OH)D (2.496), B12 (0.738), folate (2.266), and from the enzymes ALT/AST (no factor). Note 88.4 (creatinine)
  ≠ 88.57 (triglycerides): they are different constants and must not be interchanged. **[A][C]**

BioSense stores the reported creatinine value, unit, age, and sex unchanged, computes the optional µmol/L
display, and computes the **governed** eGFR (CKD-EPI 2021) with its version and provenance. **[C]**

---

# 7. Unit Conversion

```
µmol/L = mg/dL × 88.4      (creatinine; reverse: mg/dL = µmol/L ÷ 88.4)   [K5]
eGFR   = CKD-EPI 2021 race-free (see §0.4 for full form)  → mL/min/1.73m²  [G3]
```
Worked check: creatinine 1.0 mg/dL = 88.4 µmol/L; 0.9 mg/dL = 79.6 µmol/L. eGFR is computed by the governed
equation, not a linear conversion. **[A][K5][G3]**

**Safety rule [D]:** the creatinine factor (88.4) must never be confused with the triglyceride factor (88.57)
or any other analyte factor. eGFR is **not** a unit conversion of creatinine — it is a governed derived
estimate; a creatinine that is unit-unknown or out of the measuring interval yields no valid eGFR (report
</> boundary). Sex and age are required to compute eGFR. **[D][G14]**

---

# 8. Measurement Limitations & the Measured/Derived Principle  *(Context-First basis — reused SCL-010)*

The defining limitations are that **creatinine is production-dependent and lagging**, and that **eGFR is an
estimate** — which is why the Context-First gate (§0.2), the governed equation (§0.4), and the ranked-cause
output apply. **[A][B3]**

## 8.1 Creatinine has two drivers — [A]
Its level reflects filtration **and** production (muscle mass, diet, supplements, drugs); a high value is not
automatically reduced filtration. **[A][K2][K7]**

## 8.2 Creatinine is a lagging indicator — [A]
It may stay within the reference range until ~50% of function is lost; early reduction can hide behind a
"normal" creatinine — so eGFR and the trend matter more than a single value. **[A][K6]**

## 8.3 eGFR is an estimate, not a measurement — [A]
It is computed from creatinine + age + sex; it is standardised to body-surface area, has inherent error, and
is **not valid** in pregnancy, extremes of muscle mass, acute illness/AKI, or under-18s. **[A][G1][G9]**

## 8.4 The equation is governed and versioned — [A]
Different validated equations (CKD-EPI 2021, EKFC, regional) reclassify differently; the equation used is
declared and never silently swapped; cystatin C improves accuracy where it matters. **[A][G10][G11]**

## 8.5 Confounds & persistence — [A]
Dehydration/diet/exercise/drugs shift measured creatinine; a low eGFR is wellness-meaningful only when it
**persists >3 months**, so single values are repeated. **[A][G7][G13]**

**How BioSense uses this — [C][D]:** the Context-First gate runs first; creatinine is banded sex-aware and
eGFR is computed under governance (or abstained where ineligible); plausible causes are **ranked, not
asserted**; the estimate, lagging-indicator, and persistence caveats are attached; missing companion markers
set Context-Required/Reduced confidence; and no condition is ever named.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010; eGFR governed via SCL-007)*

The pair consumes its parents and companion markers where available. **[A][C]**

- **eGFR ← Creatinine + age + sex (governed parent relationship). [A]** eGFR is **derived** from creatinine
  under CKD-EPI 2021 governance; the parents' validity and confidence propagate to the estimate (§0.4). **[A][R9][G3]**
- **Fasting glucose (SCL-009) & HbA1c (SCL-002). [A]** Diabetes is a major context for kidney-filtration
  wellness; read together where available. **[A][R4]**
- **Future blood pressure. [A]** Hypertension is a major context for filtration; integrates when available. **[A]**
- **Future urine albumin (ACR). [A]** The key **kidney-damage marker**: G1/G2 indicate CKD only **with**
  albuminuria, and staging combines eGFR + albuminuria — so urine albumin materially sharpens interpretation. **[A][G6]**
- **Future cystatin C. [A]** A filtration marker independent of muscle mass; combined Cr+CysC eGFR is more
  accurate (KDIGO 2024), especially in muscular individuals or when creatinine-based estimates seem off. **[A][G10]**
- **Future electrolytes. [A]** Part of a fuller kidney-wellness panel. **[A]**

**Cross-biomarker rule [C] (reused R4):** where these are **available**, BioSense consumes them (with the
governed eGFR and the albuminuria/cystatin-C caveats) to sharpen the ranked explanations and confidence; where
**unavailable** — especially **urine albumin** (needed to distinguish reduced eGFR from CKD) and **cystatin C**
(needed when muscle mass biases creatinine) — it records a **confidence limitation** and names what would
clarify, never inventing certainty. **[C][R4]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Creatinine reflects filtration AND production** (muscle mass, diet, drugs). **[A][K2][K7]**
- **Creatinine is a lagging indicator** (may be normal until ~50% function lost). **[A][K6]**
- **eGFR is an estimate**, computed from creatinine + age + sex; **not valid** in pregnancy/muscle-extremes/
  AKI/<18. **[A][G1][G9]**
- **CKD-EPI 2021 race-free is the current standard equation** (replaced MDRD & 2009 CKD-EPI; KDIGO/NKF/NICE/
  ASN). **[A][G2]**
- **KDIGO GFR categories G1–G5**, with CKD requiring persistence >3 months and (for G1/G2) a damage marker. **[A][G5][G6][G7]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **Reference ranges for creatinine vary** by lab/method/population (e.g. M 0.7–1.3 vs 0.74–1.35; F 0.6–1.1 vs
  0.59–1.04). **[A][K3][K4]**
- **Estimating equations differ:** CKD-EPI 2021 vs EKFC vs regional (e.g. Pakistani CKD-EPI) reclassify GFR
  categories differently and perform differently across populations. **[A][G11]**
- **Purpose differs:** CKD-EPI eGFR for staging/monitoring vs Cockcroft-Gault for some drug dosing;
  cystatin C / combined for accuracy. **[A][G10][G12]**
- **Why:** GFR is estimated, not measured; reference populations, assays, and equations vary. BioSense
  **presents the differing ranges/equations and never averages them** (reused R5). **[A][E]**

## 10.3 Strength of evidence
- **Creatinine physiology (two drivers, lagging, tubular secretion): established.** **[A][K2][K6][K14]**
- **CKD-EPI 2021 adoption; KDIGO categories; persistence rule: established.** **[A][G2][G5][G7]**
- **Race-free rationale: established (2021).** **[A][G4]**
- **Cystatin C / combined equations (KDIGO 2024): established and expanding (evolving in routine use).** **[A][E][G10]**
- **Equation choice across populations (EKFC/regional): evolving.** **[E][G11]**

## 10.4 Intended populations
Thresholds and the equation target general **adults ≥18**, sex-stratified. BioSense applies them context-first
and **abstains from eGFR** in pregnancy, extremes of muscle mass, acute illness/AKI, and under-18s, and
reduces confidence where creatinine is confounded or companion markers are unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. Creatinine is SEX-AWARE and TWO-SIDED; eGFR is a GOVERNED
> DERIVED ESTIMATE mapped to KDIGO GFR categories and LOW-DOMINANT; both are CONTEXT-GATED; reference ranges
> and estimating equations genuinely DIFFER (shown, never averaged); and NEITHER is a diagnosis of kidney
> disease. eGFR is an ESTIMATE, meaningful (when low) only if PERSISTENT >3 months.**

## 11.1 Creatinine — sex-aware wellness bands (mg/dL; general adult; after context gate)

| BioSense Wellness Interpretation | Male (mg/dL) | Female (mg/dL) | Evidence anchor | Wellness meaning (context-first; no diagnostic label) |
|---|---|---|---|---|
| **Low — Context Flag** | < 0.7 | < 0.6 | Low-creatinine context [K11] | Gently noted; muscle-mass/malnutrition context; in older adults eGFR may tell a clearer story. |
| **Optimal** | 0.7 – 1.3 | 0.6 – 1.1 | Reference range [K3] | Within a favourable, sex-typical range. |
| **High-Normal — Watch** | > 1.3 – 1.5 | > 1.1 – 1.3 | Upper reference / muscle context [K3][K7] | Above the sex-typical range; often muscle mass/diet/hydration; read with eGFR and context. |
| **Elevated — Context** | > 1.5 | > 1.3 | Elevated context [K7][K15] | Read with eGFR; ranked context (muscle/diet/creatine/hydration/drugs vs filtration); persistence/trend matters. |

*(Ranges are lab-dependent and vary across sources; shown as frameworks, never averaged; use the lab's own
range where provided.)* **[K4][R5]**

## 11.2 eGFR — governed derived bands mapped to KDIGO GFR categories (mL/min/1.73m²)

| BioSense Wellness Interpretation | eGFR | KDIGO category | Wellness meaning (estimate; context-first; no diagnostic label) |
|---|---|---|---|
| **Optimal filtration estimate** | ≥ 90 | G1 | Normal estimate (CKD only if a kidney-damage marker is also present). [G5][G6] |
| **Mildly reduced estimate** | 60 – 89 | G2 | Mildly reduced estimate (CKD only with a damage marker; common with age). [G5][G6][G8] |
| **Moderately reduced estimate** | 45 – 59 | G3a | Moderately reduced; persistence + companion markers matter. [G5] |
| **Moderately–severely reduced** | 30 – 44 | G3b | Calm review context; persistence + companions. [G5] |
| **Severely reduced estimate** | 15 – 29 | G4 | Calm prompt healthcare review. [G5] |
| **Kidney-failure range** | < 15 | G5 | KDIGO G5 **range** — wellness context only, never a diagnosis; prompt healthcare review. [G5] |

**Persistence:** a low eGFR (<60) is wellness-meaningful only if it **persists >3 months**; a single low value
prompts a repeat. **[G7]** **eGFR is an ESTIMATE**, computed under governance (§0.4), and is **not computed**
where ineligible (§15). **[G1][G9]**

## 11.3 How the bands were derived — transparency [B]
- Creatinine bands use the **sex-specific reference ranges** (M 0.7–1.3, F 0.6–1.1) with a high-normal watch
  zone and an elevated-context zone; eGFR bands map **directly to the KDIGO GFR categories** (G1–G5). **[K3][G5]**
- **No number was averaged.** Varying creatinine ranges and varying equations are presented as frameworks
  (§11.5). **[R5]**
- The **low-creatinine flag** is a gentle context marker (muscle/malnutrition), never alarming. **[K11]**

## 11.4 Deterministic, ordered intervals [B]
Creatinine bands are contiguous and non-overlapping per sex (Low <lower; Optimal lower–upper; High-Normal
upper–+0.2; Elevated above). eGFR bands partition the KDIGO categories with consistent operators (≥90; 60–89;
45–59; 30–44; 15–29; <15) so no value falls into two bands. Sex/age are required for the creatinine band and
to compute eGFR; if missing, confidence is reduced and eGFR is not computed. **[B][G3]**

## 11.5 Guideline/equation-disagreement display (reused posture) [B][C]
Where relevant, BioSense notes that creatinine reference ranges differ and that **estimating equations differ**
(CKD-EPI 2021 vs EKFC vs regional), showing the value/estimate against the recognised frameworks rather than a
single line — as distinct frameworks, **never averaged**, with the equation version recorded (CAV10). **[B][C][R5][G11]**

## 11.6 Context-gate precedence [D]
No band, category, or eGFR statement is emitted as a verdict without the Context-First evaluation (§0.2).
Muscle mass/diet/creatine/hydration/drugs, eligibility (pregnancy/muscle-extremes/AKI/<18), persistence
(repeat), and companion markers (albumin/cystatin C) are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general adult ≥18**, sex-stratified. Ranges are lab-dependent; creatinine is
production-dependent and lagging; **eGFR is an estimate** and **not valid** in pregnancy/muscle-extremes/AKI/
<18; equations differ. Not applied to children/adolescents; eGFR abstained in the ineligible states (§15). **[E][G9]**

---

# 12. Interpretation Framework — CONTEXT-FIRST + GOVERNED MEASURED/DERIVED PAIR (reused SCL-010 + SCL-007)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010) and Derived Biomarker
> Governance (SCL-007, for eGFR). Per the founder's Measured/Derived-Pair decision, creatinine is the measured
> observation and eGFR is a governed derived estimate, clearly distinguished; neither is a kidney-disease
> diagnosis. No new methodology is introduced.** **[C][R1][R9]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1][B3]
   gather context (age, sex — BOTH eGFR parents; muscle mass; body composition; hydration; recent exercise;
   meat intake; creatine; pregnancy; acute illness/AKI; nephrotoxic/secretion-inhibiting drugs; BP; diabetes;
   future urine albumin; future cystatin C).                                                       [R4]
   → if material context changes meaning, interpret WITHIN it; if key context unavailable, record a confidence limitation.
STEP 1 — VALIDITY: creatinine interpretable? (unit mg/dL; within measuring interval; standardised assay) → else display-only/flag. [G14]
STEP 2 — ELIGIBILITY (eGFR): adults ≥18, NOT pregnancy/muscle-extremes/AKI → else ABSTAIN from eGFR (creatinine shown w/ caveat). [G9]
STEP 3 — DERIVE eGFR (GOVERNED): if eligible & age+sex present, compute CKD-EPI 2021 (id/version); store provenance; else no eGFR. [R9,G3]
STEP 4 — CONFOUND/PERSISTENCE CHECK: creatinine confounds (muscle/diet/creatine/hydration/drugs)? new low eGFR → prefer REPEAT (persistence >3 months). [K7-K10,G7]
STEP 5 — CONFIDENCE (four-level): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED (§0.6).         [R2]
STEP 6 — BAND: sex-aware creatinine band (§11.1); eGFR KDIGO band (§11.2) if computed.              [R8]
STEP 7 — RANKED EXPLANATIONS: abnormal/discordant with ≥2 causes → Possible Explanation A/B/C, ranked by evidence + context. [R3][B5]
STEP 8 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10, incl. estimate/persistence/lagging); route where appropriate; NO diagnosis. [R7]
```

**Core interpretive stance [B]:** creatinine and eGFR are a context-first, sex-aware, governed measured/
derived pair — read together, with eGFR as a versioned estimate, plausible causes ranked rather than one
asserted, reference-range/equation disagreement shown honestly, persistence and lagging-indicator caveats
honoured, and no condition named. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy — reused SCL-010)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear creatinine AND age+sex known (eGFR computable & eligible) AND sufficient context AND not obviously confounded | Bands + governed eGFR + ranked explanations normally |
| **REDUCED** | Single value / muscle-mass or diet/creatine/hydration/drug confound / lab-range variation / minor context | Band cautiously; prefer repeat; name the reducer (CAV4/CAV5) |
| **CONTEXT_REQUIRED** | Abnormal value with no context and no companions (albumin/cystatin C) | Rank-with-limitation or request repeat/companions; name needed context (CAV6/CAV8) |
| **ABSTAINED** | eGFR ineligible (pregnancy/muscle-extremes/AKI/<18) OR significant contextual uncertainty OR conflicting signals | Explained abstention; creatinine shown with heavy caveat; route |

Reducers/context inputs: age/sex unknown (no eGFR) [G3]; single value / possible confound (muscle/diet/
creatine/hydration/drugs) [K7-K10]; missing companions (urine albumin/cystatin C/glucose/HbA1c/BP) [R4];
lab-range/equation variability [K4][G11]; lagging-indicator uncertainty [K6]; value near a band boundary. **[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; **ineligibility** or
significant uncertainty **may** justify abstention; a new low eGFR prefers a **persistence/repeat** framing. **[R2][G7]**

---

# 14. Wellness Interpretation  *(context-first, sex-aware, governed eGFR, ranked explanations)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate. Wellness, not medical;
**never a diagnosis**; eGFR **always** framed as an estimate. **[B]/[D]**

- **Creatinine Optimal + eGFR G1/G2 (no damage marker).** "Your creatinine sits in a favourable range for
  {sex}, and your estimated filtration (eGFR) looks normal. Remember eGFR is an estimate and a single
  snapshot, but there's nothing here that stands out." **[B]**
- **Creatinine High-Normal / Elevated — Context.** "Your creatinine is a little above the typical range for
  {sex}. Because creatinine reflects muscle and diet as well as filtration, here are the more likely
  explanations for your context — muscle mass, a recent high-meat meal, a creatine supplement, dehydration, or
  certain medicines — rather than pointing to one. It's best read with your eGFR and trend." Constructive; **no
  diagnosis** (CAV2, CAV6, CAV9). **[B][D]**
- **eGFR G3a / G3b (moderately reduced estimate).** "Your estimated filtration is moderately reduced. A single
  lower eGFR is often temporary, and it's usually only meaningful if it persists (over about three months), so
  repeating the test — with normal hydration — is the sensible step. A urine albumin test and, where accuracy
  matters, cystatin C would sharpen the picture." Calm; persistence + companions; **no diagnosis** (CAV3, CAV5,
  CAV8). **[B][D][G7]**
- **eGFR G4 / G5 range (severely reduced / kidney-failure range).** Calm routing: "This degree of change in
  the estimate is worth a prompt, unhurried conversation with a healthcare professional, who can look at the
  fuller picture. eGFR is an estimate, and the number alone doesn't diagnose anything." **No alarm, no
  diagnosis** (CAV7). **[B][D][G5]**
- **Creatinine Low — Context Flag.** "Your creatinine is on the low side, which usually reflects lower muscle
  mass or nutrition rather than a kidney issue. In older adults especially, eGFR tells a clearer story." **[B][K11][K13]**

**Governed-eGFR modifier:** eGFR is presented **as an estimate**, computed by the recorded CKD-EPI 2021
version; where a lab-reported eGFR differs, both are surfaced with equation provenance, never silently
overwritten (CAV10). **[D][R9]**

**Ranked-explanations modifier (founder decision):** on any abnormal value with ≥2 plausible causes, present
**Possible Explanation A/B/C** ordered by evidence + context — never a single certain cause, never a named
condition. **[D][R3][B5]**

**Persistence/lagging modifier:** new low eGFR → persistence/repeat framing (CAV5); "normal" creatinine does
not exclude early reduction → rely on eGFR + trend (CAV9). **[D][G7][K6]**

**Context-unavailable modifier:** where urine albumin or cystatin C (or age/sex for eGFR) are missing, state
the confidence limitation and name what would clarify (CAV8); never invent certainty (S10). **[D][R4]**

Every interpretation pairs the bands with context guidance (§17) and the mandatory caveats (§0.10). **None
diagnoses chronic kidney disease, kidney failure, or acute kidney injury, none asserts a single cause, none
presents eGFR as a measured quantity, and none treats a BioSense band, reference range, GFR category, or
equation output as a medical boundary.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 eGFR-ineligible states (ABSTAIN from eGFR).** Pregnancy, extremes of muscle mass (very high or very
  low), acute illness/possible AKI, and children/adolescents <18 → eGFR **not computed**; creatinine shown
  with a heavy caveat and routed. **[D][G9]**
- **15.2 Context-required (common).** Abnormal value with no context and no companions (albumin/cystatin C) →
  rank-with-limitation or request a repeat/companions; state what's needed (§13, CAV6/CAV8). **[D][R2]**
- **15.3 Confounded creatinine.** Muscle mass, high meat intake, creatine, dehydration, or secretion-inhibiting
  drugs → surface as context; suggest a repeat after normal hydration; cystatin C clarifies where muscle mass
  biases creatinine. **[D][K7-K10][G10]**
- **15.4 Elderly / low muscle mass.** A "normal" creatinine may mask a low GFR; eGFR is the clearer story. **[D][K13]**
- **15.5 Pregnancy.** Creatinine is normally **lower**; eGFR is not valid; a **high** creatinine with
  hypertension is a professional matter (pre-eclampsia context) — abstain from eGFR and route. **[D][K12][G9]**
- **15.6 Diabetes / hypertension context.** Read with glucose/HbA1c/BP and (future) urine albumin as a
  kidney-wellness context; never diagnose diabetic/hypertensive kidney disease. **[D][R4]**
- **15.7 Red flags.** Rapid creatinine rise / sharp eGFR drop (possible AKI), eGFR in the G4/G5 range, or
  pregnancy with high creatinine + hypertension → calm prompt healthcare review regardless of band. **[D][K15][G9]**
- **15.8 Sex/age unknown.** eGFR not computed; creatinine banded with reduced confidence; note that age/sex are
  needed for the estimate. **[D][G3]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Persistence defines meaning. [A]** A low eGFR is wellness-meaningful only if it **persists >3 months**;
  the primary longitudinal move is a repeat (with normal hydration) before reading a trend. **[G7][G13]**
- **Trend beats single values. [A]** Because creatinine is production-dependent and lagging, the **trend** in
  creatinine/eGFR (and a rapid rise from baseline) carries more signal than one reading. **[K6][K15]**
- **Hold the equation constant. [A]** Trends must compare like-with-like: the same equation version and, ideally,
  the same assay/lab; an equation change is recorded (governance) so it isn't mistaken for a real change. **[R9][G11]**
- **Age drift is expected. [A]** eGFR declines ~1 mL/min/1.73m² per year after 30; a gentle downward drift with
  age is normal context, not a finding. **[G8]**
- **Context/abstained points. [C]** Confounded, ineligible, or context-required points are tagged so they don't
  create a false trend.

---

# 17. Lifestyle & Context Guidance

For this pair, the first tier is **context and companion markers** (and, for a new low eGFR, a repeat), then
context-appropriate lifestyle. **[A]/[B]**

## 17.1 Companion markers & context first [A][G6][G10][R4]
Where creatinine is high or eGFR low, the clarifying steps are **eGFR + the trend**, the **confound review**
(muscle/diet/creatine/hydration/drugs), a **repeat** (persistence, normal hydration), and companion markers —
**urine albumin** (damage marker), **cystatin C** (accuracy), **glucose/HbA1c**, and **blood pressure**. **[A]**

## 17.2 Kidney-friendly wellness context [A][G8]
General kidney-friendly wellness — good hydration, blood-pressure and glucose awareness, and sensible protein/
creatine/NSAID use — is relevant context; a gentle age-related eGFR decline (~1 mL/min/yr after 30) is normal.
Framed as **education, not treatment**. **[A]**

## 17.3 Confound & exposure context [A][K8][K10]
High meat intake, creatine supplements, intense exercise, dehydration, and secretion-inhibiting drugs
(trimethoprim/cimetidine/NSAIDs) are recognised context/confounds for a raised creatinine — useful for
interpretation, **never** a prompt to change any medication. **[A]**

## 17.4 Framing rules [B][D]
Context and companion markers first (repeat for new low eGFR); **no specific treatments, medication changes, or
doses** (S11); reference-range/equation disagreement shown, never averaged; eGFR always framed as an estimate;
calm, evidence-informed language; never a diagnosis; the measured/derived (CAV2/CAV3), lagging-indicator
(CAV9), and equation-version (CAV10) caveats attached where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain that creatinine is a measured marker of filtration **and** production and that
eGFR is a governed **estimate**; run the context-first evaluation; assign the sex-aware creatinine band; present
the governed eGFR (with version/provenance) and its KDIGO-mapped band; integrate glucose/HbA1c (and future BP/
urine albumin/cystatin C); present **ranked** explanations for an abnormal value; recommend a repeat/persistence
check; name which markers would clarify (albumin/cystatin C); express context-required/abstention respectfully.

The AI layer **must never**:
- emit "chronic kidney disease/CKD", "kidney failure", "acute kidney injury/AKI", "renal failure", or any condition as a diagnosis — even to deny one (S1)
- present eGFR as a measured quantity rather than an estimate (S3)
- interpret creatinine in isolation or as filtration alone (ignoring production/context) (S2)
- compute eGFR without age+sex, silently substitute an equation, or omit the version (S4)
- compute/emit an eGFR where ineligible (pregnancy/muscle-extremes/AKI/<18) — abstain (S4)
- assert a single cause for an abnormal value when ≥2 are plausible — rank them (S5)
- treat a "normal" creatinine as excluding early reduction (lagging indicator) (S7)
- load meaning onto a new/isolated low eGFR without a persistence/repeat framing (S8)
- ignore creatinine confounds propagating to eGFR (S9)
- recommend treatments, medication changes, or doses; produce a kidney-disease-risk % (S11)
- invent certainty when companion markers/context are unavailable — state the limitation (S10)
- fail to route red flags (rapid rise / G4-G5 range / possible AKI / pregnancy+high creatinine+hypertension) calmly and promptly (S12)
- present a BioSense band, reference range, GFR category, or equation output as a medical/diagnostic boundary (S13)
- average contested reference ranges or estimating equations (S14)

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any kidney condition is
SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes
  patterns, never names CKD/kidney failure/AKI (S1). **[D][R7]**
- **Measured/derived honesty.** Creatinine = measured marker of filtration **and** production; eGFR = governed
  **estimate**; neither read in isolation; eGFR always framed as an estimate (S2, S3, CAV2, CAV3). **[D][B3]**
- **Governed equation.** eGFR computed via CKD-EPI 2021 (recorded version/provenance), never silently swapped,
  abstained where ineligible (S4, CAV10). **[D][R9][G9]**
- **Ranked, not asserted.** Where several explanations fit, they are ranked by evidence + context, never
  reduced to one (S5, CAV6). **[D][R3]**
- **Lagging indicator + persistence.** "Normal" creatinine doesn't exclude early reduction; a low eGFR matters
  only if it persists >3 months (S7, S8, CAV5, CAV9). **[D][K6][G7]**
- **Confounds propagate.** Muscle/diet/creatine/hydration/drug context that biases creatinine is surfaced and
  lowers confidence (S9). **[D][K7-K10]**
- **Calm red-flag routing.** Rapid creatinine rise / sharp eGFR drop / G4-G5 range / pregnancy-high-creatinine-
  with-hypertension → prompt, unhurried review; never emergency-diagnose (S12, CAV7). **[D][K15][K12]**
- **No treatment/medication guidance.** Medication/exposure questions → educational context + referral (S11). **[D]**
- **Missing markers/context stated, not invented.** (S10). **[D][R4]**
- **Correct unit handling.** Creatinine ×88.4 (not 88.57); eGFR is not a unit conversion; sex+age required to
  compute eGFR. **[D][K5]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. eGFR is **persistently <60** (>3 months) on repeat. **[G7]**
2. eGFR is in the **G4/G5 range** (<30). **[G5]**
3. A **rapid creatinine rise** / sharp eGFR drop (possible AKI). **[K15]**
4. **Diabetes or hypertension** context with a **kidney-damage marker** (e.g. urine albumin). **[G6][R4]**
5. **Pregnancy** with a high creatinine (± hypertension). **[K12]**
6. **Discordant** creatinine vs cystatin C (muscle-mass effect), or the user **asks a medical/medication
   question** (S11). **[G10]**

All suggestions are wellness-framed, non-urgent (unless red flags), non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-016 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for creatinine (mg/dL) plus assay/lab-
  range, **age, and sex** metadata (parents for eGFR), and — as interpretation inputs — **fasting glucose
  (SCL-009), HbA1c (SCL-002), and future blood pressure, urine albumin, cystatin C, and electrolytes**, plus
  declared context (muscle mass, body composition, hydration, exercise, meat intake, creatine, pregnancy,
  acute illness, nephrotoxic drugs). **[R4]**
- **Derives (governed):** **eGFR** via the CKD-EPI 2021 race-free equation (id/version, parents creatinine+age+
  sex, eligibility, confidence inheritance, validity propagation, abstention, audit) — reusing Derived
  Biomarker Governance (SCL-007). **[R9]**
- **Supplies (as CSL bindings):** the sex-aware creatinine bands and the KDIGO-mapped eGFR bands (Category B),
  the governed eGFR equation, the reused Context-First gate, the reused four-level confidence hierarchy, the
  reused ranked multiple-explanations output, the reused cross-biomarker consumption (with graceful
  degradation), the reference-range/equation-disagreement display, the persistence/lagging/estimate caveats,
  safety rules, context guidance, and narrative templates — each with value + source-ID + category + version.
- **Reuses (does not redefine):** **Derived Biomarker Governance (SCL-007)**; the Context-First Interpretation
  Framework, the confidence hierarchy, the multiple-explanations output, and cross-biomarker intelligence (all
  frozen from SCL-010); sex-aware banding (SCL-004/010/014/015); the guideline-disagreement posture (SCL-003/
  011/012); two-sided banding (SCL-004/009/010/011/012/014/015); and the diagnostic-adjacency discipline
  (SCL-002/009/011/012/014/015). **The measured/derived-pair interpretation is represented within Context-First
  + Derived Governance — not as a new methodology.** **[C][R1][R9]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (companions inform and rank, the
  equation is governed and versioned — never averaged; contested ranges/equations never averaged).
- **Uses the correct unit handling** (creatinine ×88.4; eGFR is derived, not converted) — a per-analyte
  configuration.
- **Score contribution:** the pair contributes to a **kidney-wellness / metabolic-vascular** context as a
  sex-aware, context-gated input — eGFR (governed, low-dominant) as the headline estimate and creatinine
  (two-sided) as its measured parent, with abnormal values expressed as ranked-possibility context rather than
  a verdict; ineligible/context-required values do not contribute a definite verdict. Any weighting is a
  Category [C] product decision. **[C]**

---

# 22. Medication & Exposure Context (educational only)

Educational context only; BioSense does not instruct on treatment, dose, or medication changes (S11). **[D]**
- Some medications raise **measured** creatinine without changing true filtration — **trimethoprim** and
  **cimetidine** inhibit tubular secretion; **NSAIDs** can raise creatinine — important context when
  interpreting a value. Any decision about a medication belongs to the prescriber. **[A][K10]**
- Many drugs (e.g. metformin, DOACs, gadolinium contrast) carry **eGFR cut-offs** for safe use; BioSense may
  note that eGFR is used for such decisions but **never** advises on dosing — that is a clinician's role. **[A][G5]**
- Any medication or exposure question → educational context + suggestion to speak with a healthcare
  professional; BioSense never advises starting, stopping, or changing a medication. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **eGFR is an estimate. [E]** Computed from creatinine + age + sex; standardised, with inherent error and
   ineligible states; framed as an estimate throughout. **[G1][G9]**
2. **Creatinine is production-dependent and lagging. [E]** Muscle/diet/drugs shift it; it may be "normal" with
   early reduction; context and eGFR/trend handle this. **[K2][K6]**
3. **Reference ranges differ. [E]** Lab/method/population-dependent; shown, never averaged. **[K4]**
4. **Estimating equations differ. [E]** CKD-EPI 2021 vs EKFC vs regional reclassify differently; governed and
   versioned, never averaged. **[G11]**
5. **Cystatin C is expanding. [E]** Combined Cr+CysC (KDIGO 2024) is more accurate; reserved as a governed
   future equation version. **[G10]**
6. **Persistence is required. [E]** A single low eGFR is often transient; >3 months defines meaning. **[G7]**
7. **Companion availability is data-dependent. [E]** Without urine albumin (damage marker) or cystatin C
   (accuracy), interpretation degrades to a confidence limitation, not certainty. **[R4]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**; eGFR
**always** an estimate; context-first; sex-aware; governed eGFR; ranked explanations; persistence for new low
eGFR). **[B]/[D]** (Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: CREATININE_OPTIMAL + eGFR_G1/G2 (no damage marker)
"Your creatinine is {cr} mg/dL — a favourable range for {sex} — and your estimated filtration (eGFR {egfr}) looks
 normal. eGFR is an estimate and a single snapshot, but nothing here stands out."  +CAV1 +CAV3

TEMPLATE: CREATININE_HIGH_NORMAL/ELEVATED (context)
"Your creatinine is {cr} mg/dL, a little above the typical range for {sex}. Creatinine reflects muscle and diet
 as well as filtration, so here are the more likely explanations for your context rather than one: {ranked A/B/C}.
 It's best read with your eGFR and trend."  +CAV1 +CAV2 +CAV6 +CAV9

TEMPLATE: eGFR_G3a/G3b (moderately reduced estimate)
"Your estimated filtration (eGFR {egfr}) is moderately reduced. A single lower eGFR is often temporary and is
 usually only meaningful if it persists over about three months, so repeating the test with normal hydration is
 the sensible step. A urine albumin test, and cystatin C where accuracy matters, would sharpen the picture."  +CAV1 +CAV3 +CAV5 +CAV8

TEMPLATE: eGFR_G4/G5_range (CALM ROUTING, NOT ALARM)
"Your estimated filtration (eGFR {egfr}) is in a lower range. This is worth a prompt, unhurried conversation with
 a healthcare professional, who can look at the fuller picture. eGFR is an estimate, and the number alone doesn't
 diagnose anything."  +CAV1 +CAV3 +CAV7

TEMPLATE: CREATININE_LOW (context flag)
"Your creatinine is on the low side at {cr} mg/dL, which usually reflects lower muscle mass or nutrition rather
 than a kidney issue. In older adults especially, eGFR tells a clearer story."  +CAV1

TEMPLATE: eGFR_INELIGIBLE (pregnancy/muscle-extremes/AKI/<18)
"We're not showing an eGFR here, because the standard estimate isn't reliable in this situation. Your creatinine
 is {cr} mg/dL, best interpreted with a healthcare professional in context."  +CAV1 +CAV3

MODIFIER: RANKED_EXPLANATIONS (abnormal, ≥2 causes) →
 "Possible explanations, most-to-least likely for your context: A {…}, B {…}, C {…} — best confirmed with a professional."  +CAV6

MODIFIER: GOVERNED_EQUATION → "We use the current race-free CKD-EPI 2021 equation and note its version; different
 equations can give slightly different numbers."  +CAV10

MODIFIER: CONTEXT_UNAVAILABLE (no albumin/cystatin C / no age-sex) →
 "We'd interpret this more confidently with a urine albumin test and, where accuracy matters, cystatin C."  +CAV8

MODIFIER: RED_FLAGS (rapid rise / G4-G5 / possible AKI / pregnancy+high creatinine+hypertension) → calm prompt review.  +CAV7
```

**Absolute rules:** no template diagnoses a kidney condition, asserts a single cause, presents eGFR as a
measured value, treats a band/range/category/equation output as a diagnostic boundary, omits sex-awareness,
alarms, or averages ranges/equations. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal pair, male. [illustrative]**
```
Input: creatinine 1.0 mg/dL, male, age 40; eGFR (CKD-EPI 2021) ~99.
Creatinine band: OPTIMAL (0.7–1.3 M) | eGFR band: OPTIMAL_G1 | Confidence: STANDARD
Narrative: OPTIMAL pair +CAV1+CAV3 ; eGFR framed as estimate.  [K3,G3,G5]
```

**Example 2 — High creatinine, muscular. [illustrative]**
```
Input: creatinine 1.4 mg/dL, male, age 30, highly muscular, no cystatin C; eGFR ~62.
Creatinine band: HIGH_NORMAL_WATCH | eGFR band: MILD_REDUCTION_G2 | Confidence: REDUCED (muscle-mass confound; no cystatin C)
Narrative: ranked A(high muscle mass — physiology) B(diet/creatine) C(filtration) +CAV6+CAV9 ; suggest cystatin C +CAV8 ; NO "CKD".  [K7,G10,S5]
```

**Example 3 — Low eGFR, new, isolated. [illustrative]**
```
Input: creatinine 1.3 mg/dL, female, age 55; eGFR ~48; single reading, hot day.
Creatinine band: HIGH_NORMAL_WATCH (F) | eGFR band: MODERATE_G3a | Confidence: REDUCED (single value; possible dehydration)
Narrative: persistence/repeat +CAV5 (rehydrated, >3 months) ; +CAV8 (urine albumin/cystatin C) ; ranked ; NO "CKD".  [G7,G13,S8]
```

**Example 4 — Pregnancy (eGFR ineligible). [illustrative]**
```
Input: creatinine 0.6 mg/dL, female, pregnant.
Creatinine: shown (normally lower in pregnancy) | eGFR: ABSTAINED (ineligible) | Confidence: ABSTAINED (eGFR)
Narrative: eGFR_INELIGIBLE template +CAV3 ; route ; NO eGFR number ; NO diagnosis.  [K12,G9,S4]
```

**Example 5 — Severe reduction. [illustrative]**
```
Input: creatinine 3.2 mg/dL, male, age 60; eGFR ~20.
Creatinine band: ELEVATED_CONTEXT | eGFR band: SEVERE_G4 | Confidence: STANDARD
Narrative: calm prompt review +CAV7 ; estimate caveat +CAV3 ; persistence + companions ; NO diagnosis.  [G5,S12]
```

**Example 6 — Age/sex missing. [illustrative]**
```
Input: creatinine 1.1 mg/dL, sex/age unknown.
Creatinine band: shown with reduced confidence | eGFR: NOT computed (parents missing) | Confidence: REDUCED
Narrative: +CAV4 (age/sex needed for eGFR) ; +CAV8 ; NO eGFR ; NO diagnosis.  [G3,S6]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-007 (non-HDL-C)** — source of the reused **Derived Biomarker Governance** applied to eGFR (equation
  id/version, parent provenance, eligibility, confidence inheritance, validity propagation, abstention, audit;
  never silently recalculated/substituted).
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, four-level confidence
  hierarchy, multiple-explanations output, and cross-biomarker intelligence.
- **SCL-009 (Fasting Glucose) & SCL-002 (HbA1c)** — metabolic companions (diabetes context for kidney wellness).
- **SCL-004 (HDL-C) / SCL-010 / SCL-014 / SCL-015** — precedent for the reused sex-aware banding.
- **SCL-011 (Vitamin D) / SCL-012 (B12)** — precedent for guideline-disagreement / multi-framework display.
- **Future Blood Pressure, Urine Albumin (ACR), Cystatin C, Electrolytes** — companion kidney/vascular markers
  the pair consumes; urine albumin is the key damage marker and cystatin C the key accuracy add (future
  governed equation version); where unavailable, a confidence limitation is recorded.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value and the adopted equation.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values and the adopted equation trace via
> the K/G-series IDs in §0 and the body. Developers finalising the pack should confirm exact page/table
> locators and the equation coefficients against the primary sources (Levey et al., NEJM 2021; KDIGO) before
> release.

**eGFR equation, race-free adoption, KDIGO categories (Category A anchors)**

1. **Inker/Levey et al., New creatinine- and cystatin C–based equations to estimate GFR without race. NEJM
   2021 (DOI 10.1056/NEJMoa2102953)**, via **NKF CKD-EPI 2021 implementation guidance**. — *CKD-EPI 2021
   race-free creatinine equation; SI factor creatinine ×88.4; report eGFRcr as </> when creatinine out of
   measuring interval (G2, G3, K5, G14).*
2. **PMC10797164 / PubMed 38250300: The 2021 CKD-EPI Race-Free eGFR Equations.** — *NKF/ASN Task Force
   (2020–21) reviewed >20 approaches, recommended CKD-EPI 2021 + expanded cystatin C; removed race coefficient
   (G2, G4, G10).*
3. **MedDraftPro / drishlabs eGFR calculators (CKD-EPI 2021, KDIGO 2024).** — *equation form (142 × min/max ×
   0.9938^age × 1.012 if female; κ 0.7/0.9; α −0.241/−0.302); replaced MDRD & 2009; KDIGO G1–G5 (≥90/60–89/
   45–59/30–44/15–29/<15); G1/G2 need damage marker; CKD = eGFR<60 >3 months; eGFR is an estimate, not valid in
   pregnancy/muscle-extremes/AKI/<18; ~1 mL/min/yr decline; combined Cr+CysC gold standard; Cockcroft-Gault for
   some dosing (G1, G3, G5, G6, G7, G8, G9, G10, G12, G13).*
4. **PMC10956795: EKFC vs Pakistani CKD-EPI vs 2021 CKD-EPI in South Asian CKD.** — *validated equations
   reclassify GFR categories differently; regional performance varies; endogenous markers creatinine + cystatin
   C (G11).*

**Creatinine physiology, ranges, confounds (Category A)**

5. **HealthMatters.io (Creatinine/CMP); Medical News Today; SingleCare; Kidney Hypertension Clinic; Acibadem;
   Doctronic; MDTools; NCT02081183.** — *creatinine = creatine waste, filtered by kidneys; sex-specific ranges
   (M ~0.7–1.3, F ~0.6–1.1; sources vary); ×88.4 SI; lab/age/muscle dependence; creatine/exercise/dehydration/
   meat raise it; drugs (trimethoprim/cimetidine/NSAIDs) raise measured creatinine via secretion inhibition;
   low creatinine from low muscle/malnutrition; pregnancy lowers it (K1, K3, K4, K5, K8, K9, K10, K11, K12).*
6. **MDTools (Creatinine levels); Lamkin Clinic (Creatinine).** — *lagging indicator (~50% function before
   rise); high muscle mass commonest non-renal cause; high-meat meal +0.1–0.3; tubular secretion 10–15%
   (clearance overestimates GFR); elderly "normal" creatinine may mask low GFR → calculate eGFR; rapid rise =
   AKI signal (K2, K6, K7, K8, K13, K14, K15).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–6; they are BioSense
> Version 1 classifications, sex-aware and context-gated, not attributable to any single reference as a
> diagnostic threshold, and **do not restate diagnostic labels.** Creatinine reference ranges and estimating
> equations are shown as separate frameworks and **never averaged**; eGFR is a governed derived **estimate**,
> never a measurement; and neither creatinine nor eGFR is presented as a diagnosis of kidney disease.

---

# 28. Founder Decisions Required

The Creatinine/eGFR methodology reuses frozen BioSense frameworks and represents the founder's Measured/
Derived-Pair decision via the existing Derived Biomarker Governance and Context-First Framework. Two optional
presentation/policy items remain: **[C][E]**

**D-1 — Confirm the adopted estimating equation and version policy.** SCL-016 adopts the **CKD-EPI 2021
race-free creatinine** equation as the governed default (id `SCL016_EGFR_CKDEPI2021_v1`), records the version,
never silently substitutes, and reserves **cystatin C / combined Cr+CysC** (KDIGO 2024) as a governed future
equation version. Confirmation requested that CKD-EPI 2021 is the intended V1 default and that cystatin C is
deferred to a future governed version. **Founder sign-off requested.**

**D-2 — Confirm the eGFR eligibility/abstention scope and the persistence policy for V1.** SCL-016 **abstains
from computing eGFR** in pregnancy, extremes of muscle mass, acute illness/possible AKI, and under-18s, and
treats a low eGFR as wellness-meaningful only when **persistent >3 months** (single low value → repeat).
**Founder decision requested** on whether V1 activates with this abstention set and persistence policy as
specified (with graceful degradation to creatinine-plus-context where eGFR is abstained).

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-016 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/
reference figure or the adopted Category [A] estimating equation, or a transparently-labelled Category [B]
BioSense wellness interpretation. No value was fabricated; every Category [A] number and the equation were
retrieved and verified during authoring and trace to §27. Creatinine and eGFR reuse frozen BioSense
methodology throughout — Derived Biomarker Governance (SCL-007, for eGFR), the Context-First Interpretation
Framework, four-level confidence hierarchy, multiple-explanations output, and cross-biomarker intelligence
(all from SCL-010), sex-aware banding (SCL-004/010/014/015), the guideline-disagreement posture (SCL-003/011/
012), two-sided banding with flags (SCL-004/009/010/011/012/014/015), and the diagnostic-adjacency discipline
(SCL-002/009/011/012/014/015) — introducing only Creatinine/eGFR-specific scientific content (the creatinine
thresholds and their sex-specificity; the CKD-EPI 2021 equation and its governance; the KDIGO GFR-category
mapping; the estimate-not-measured framing; the lagging-indicator and persistence caveats; and the muscle/
diet/hydration/drug context modifiers). Per the founder's Measured/Derived-Pair decision, creatinine is
represented as the measured observation and eGFR as a governed derived estimate — clearly distinguished, and
neither presented as a diagnosis of kidney disease. No new methodology was required; all structure remains
consistent with SCL-001 through SCL-015.*
