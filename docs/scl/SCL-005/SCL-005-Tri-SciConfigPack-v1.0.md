# SCL-005 — TRIGLYCERIDES (TG)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology

**Document ID:** SCL-005
**Biomarker:** Triglycerides (TG; serum/plasma triglycerides)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Structure preserved; only the sections requiring genuine structural difference were adapted.

---

> **What this document is.** SCL-005 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for triglycerides. It does not
> redesign the Constitution, the ENG documents, the Blood Analysis Engine, or the SCL architecture.
>
> **What BioSense is.** A premium wellness and preventative health-intelligence platform.
> **Not** a medical device. It does **not** diagnose disease, **not** replace clinicians,
> **not** prescribe. All content is written from a **wellness-optimisation** perspective.
>
> **On thresholds.** Recognised guideline numbers are reproduced faithfully and attributed
> (Category A). The BioSense Wellness Interpretation Bands are a transparent interpretation
> of that evidence for a general-adult wellness audience (Category B) — they are **BioSense
> Version 1 Wellness Interpretations, not diagnostic boundaries or universal medical truth.**

---

## STRUCTURAL-FIT NOTE (Triglycerides vs SCL-001)

The overall structure, section order, content-classification scheme (A–E), confidence model,
safety posture, recommendation-ladder shape, narrative-contract approach, governance, and the
lower-better-with-no-low-end-penalty direction (as ApoB/LDL-C) were **preserved exactly**. Four
areas required genuine adaptation:

1. **Fasting status is a first-class interpretation input (§8, §11, §12, §13) — new.** The
   recognised "optimal" differs between fasting (<100 mg/dL) and non-fasting (<150 mg/dL), and a
   raised non-fasting value prompts a fasting re-check. Fasting state therefore drives banding and
   confidence.
2. **Very-high / pancreatitis safety tier (§11, §15, §19, §20) — new.** Very high triglycerides
   (≥500, and especially ≥1000 mg/dL) carry acute (pancreatitis) relevance. BioSense handles this
   with firmer-but-calm healthcare-review wording — still non-diagnostic, still naming no condition.
3. **High biological/postprandial variability (§8, §16) — elevated.** Triglycerides vary
   substantially with meals and day-to-day, so trend and single-value handling are more cautious.
4. **Cross-marker role (§9) — TG degrades calculated LDL-C** (linking to SCL-003) and increases the
   weight given to ApoB/non-HDL-C, consistent with the frozen packs.

*(Unit note: triglycerides use the molar factor 88.57, not cholesterol's 38.67 — §7.)*

---

## CONTENT CLASSIFICATION KEY

- **[A]** Source-derived fact / recognised threshold.
- **[B]** BioSense Version 1 wellness interpretation (labelled).
- **[C]** Product-policy decision.
- **[D]** Safety / healthcare-review wording.
- **[E]** Area of uncertainty.

---

# SCIENTIFIC POSITION STATEMENT

BioSense is a premium wellness and preventative health-intelligence platform. It is not a medical
device. It does not diagnose disease, and it does not replace healthcare professionals.

Triglycerides are one of the most lifestyle-responsive numbers on a lipid panel, which makes them a
genuinely useful wellness signal — and BioSense treats them with the same care and precision as the
rest of the library. It reproduces recognised guideline figures faithfully and attributes them, and
it recognises two things the evidence is clear about: that triglycerides are interpreted against
*different* optimal levels depending on whether the sample was fasting, and that very high
triglycerides carry an acute health relevance that deserves a calm, clear route to a healthcare
professional. BioSense interprets triglycerides as a modifiable wellness gradient, read alongside
the other lipids, and never as a diagnosis.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not
diagnostic criteria.** Every BioSense interpretation is version controlled, transparent, and
designed to evolve as the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate triglycerides. Every value carries a source ID (T-series → §27)
> and a category tag. Canonical unit: mg/dL (store mmol/L in parallel). **Fasting status is a
> first-class input.**

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: mg/dL          # store mmol/L parallel
mg/dL = mmol/L × 88.57 ; mmol/L = mg/dL ÷ 88.57   (TRIGLYCERIDE factor — NOT cholesterol 38.67)  [T13]
Always retain value_reported + unit_reported + fasting_status. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors T1–T7)
```
TG_WELLNESS_BAND (mg/dL, general adult, primary prevention, untreated) — FASTING-AWARE:

  FASTING (preferred):
    OPTIMAL                 < 100          # AHA optimal fasting <100 [T5]
    FAVOURABLE              100 – 149      # below ATP III normal ceiling 150 [T1]
    ABOVE_OPTIMAL           150 – 199      # ATP III borderline high [T2]
    HIGH                    200 – 499      # ATP III high [T3]
    VERY_HIGH_FLAG          ≥ 500          # ATP III very high; pancreatitis relevance [T4][T10]
      (sub-flag) SEVERE_FLAG ≥ 1000        # Endocrine Society severe; stronger review [T9][T10]

  NON_FASTING:
    OPTIMAL                 < 150          # AHA optimal non-fasting <150 [T6]
    ABOVE_OPTIMAL           150 – 174      # approaching ACC non-fasting threshold [T7]
    HIGH_RECHECK            175 – 499      # ACC non-fasting ≥175; recommend fasting re-check [T7][T12]
    VERY_HIGH_FLAG          ≥ 500          # very high regardless of fasting; pancreatitis relevance [T4]
      (sub-flag) SEVERE_FLAG ≥ 1000        # [T9][T10]
    NON_FASTING ≥ 200 → recommend a fasting re-check within a few weeks [T12]

DIRECTION: LOWER_BETTER within range, no low-end wellness penalty (as ApoB/LDL-C).  [B][T21]
mmol/L parallels (×÷88.57): 100≈1.13 | 150≈1.7 | 200≈2.26 | 500≈5.65 | 1000≈11.3
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. [B][D]**

## 0.3 Context / eligibility logic — [A]+[C]
```
DEFAULT = general adult, fasting-aware, primary prevention, untreated.          [C: B2]
fasting_status REQUIRED for correct band selection; if unknown → use NON_FASTING
  (more conservative optimal), tag fasting_assumed, reduce confidence.          [C][T11]
ABSTAIN from banding (display value only) if: age<18 | pregnancy (lipids rise physiologically).
IF on lipid-modifying therapy: frame as reflecting current management; never imply change.  [D]
NEVER infer fasting status, pregnancy, or therapy from the TG value itself.     [D]
```

## 0.4 Confidence reducers — [A]/[D]
```
fasting_unknown (fasting_assumed) [C][T11] | recent_meal/alcohol before draw [T19][T22] |
acute_illness | recent_major_diet/weight_change | on_lipid_therapy |
method_change_between_tests | value_near_a_band_boundary | single_value_no_prior [T22]
```

## 0.5 Deterministic safety & suppression rules — [D]
```
S1  TG is NOT a diagnosis. Never state/imply disease (incl. pancreatitis, metabolic syndrome). [D]
S2  TG is ONE marker of metabolic/lipid wellness, read in context, never a standalone verdict. [D][T16]
S3  VERY_HIGH_FLAG (≥500) → firm-but-calm healthcare-review wording; ≥1000 → stronger review.
    Handle pancreatitis relevance by ROUTING, never by naming/diagnosing a condition.  [D][T4][T10]
S4  Never present a numeric cardiovascular or pancreatitis risk %.               [D]
S5  Low TG is NOT a wellness concern and NEVER penalised.                        [D][T21]
S6  Never recommend starting/stopping/changing medication (incl. omega-3 dosing as therapy). [D]
S7  Never suggest alcohol; note alcohol can raise TG and before-test alcohol distorts it.  [D][T19]
S8  On any medication/therapy question → educational context + refer.            [D]
S9  Suppress/abstain interpretation where fasting is required-but-unusable in edge cases, or pregnancy. [D]
S10 Never present a BioSense band as a medical/diagnostic boundary.              [D]
S11 Read TG with non-HDL-C/ApoB/LDL-C/HDL; note high TG reduces reliability of calculated LDL-C. [D][T14]
S12 eAG/ratio helpers (e.g. TG:HDL) are educational context, never a diagnosis.  [D][T20]
```

## 0.6 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 LIFESTYLE (always first; TG is highly lifestyle-responsive):
   reduce refined carbohydrate, added sugar & fructose; limit alcohol; weight management;
   physical activity; unsaturated fats; oily fish / dietary omega-3 (food-first).  [T17]
Tier 2 RE-MEASURE / TRACK (fasting): if non-fasting & ≥200, recommend a fasting re-check;
   TG varies day-to-day, so track the trend, not a single value.                 [T12][T22]
Tier 3 HEALTHCARE DISCUSSION (calm) when: VERY_HIGH_FLAG (≥500; firmer ≥1000) | high TG with
   metabolic clustering | fasting-required abstention | medical/omega-3-therapy question.  [D]
NEVER a medication instruction (incl. prescription omega-3 dosing) at any tier.  [D]
```

## 0.7 Narrative selection rules — [B]/[D]
```
band → template (fasting-aware); modulated by confidence + context.
OPTIMAL / FAVOURABLE       → affirming, maintain.
ABOVE_OPTIMAL              → constructive, optimisation-focused (TG responds well to lifestyle).
HIGH / HIGH_RECHECK        → constructive + (non-fasting) fasting-recheck suggestion.
VERY_HIGH_FLAG (≥500/≥1000)→ firm-but-calm healthcare-review [D]; route, name nothing.
Never "normal/abnormal"; never name a condition (pancreatitis/metabolic syndrome); never diagnosis.
```

## 0.8 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Triglycerides are one of several markers, best read alongside your other lipids."
CAV3 (reduced confidence) name reducer(s) — e.g. fasting status not specified, recent meal.
CAV4 (non-fasting ≥200 / HIGH_RECHECK) "A fasting sample gives a clearer triglyceride reading;
      consider re-checking after ~12 hours fasting."
CAV5 (very high ≥500) "This level is worth discussing with a healthcare professional soon."
CAV6 (fasting vs non-fasting shown) "Optimal levels differ for fasting vs non-fasting samples."
```

## 0.9 Source & version identifiers
```
config_id: SCL-005   config_version: 1.0
band_set_id: BIOSENSE_TG_WELLNESS_BANDS_v1        (Category B; fasting-aware; anchors T1-T7)
fasting_model_id: SCL005_FASTING_AWARE_v1         (T5,T6,T11,T12)
very_high_safety_id: SCL005_VERYHIGH_PANCREATITIS_v1 (T4,T9,T10) — safety-critical
guideline_anchors_id: NCEP_ATP_III / AHA_2011 / ACC_2021 / ENDOCRINE_SOC  (T1-T9)
lifestyle_evidence_id: SCL005_LIFESTYLE_v1        (T17,T18)
safety_rules_id: SCL005_SAFETY_v1                 (S1-S12)
Every row carries its T-source + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Triglycerides (TG) are the most common type of fat in the body and the blood. **[A]** They are how
the body stores and transports energy from food: unused calories are converted to triglycerides and
carried in triglyceride-rich lipoproteins (chylomicrons and VLDL). **[A]**

From a wellness perspective, triglycerides are especially valuable because they are one of the most
**lifestyle-responsive** items on a lipid panel — diet (particularly refined carbohydrate and
alcohol), weight, and activity move them substantially, often quickly. **[A]** They also carry two
interpretive subtleties BioSense handles carefully: they are read against different "optimal" levels
depending on whether the sample was taken fasting, and very high levels have an acute health
relevance beyond cardiovascular wellness. **[A]**

- **Official name:** Triglycerides
- **Common abbreviation:** TG (TGs, TAG)
- **Reported in:** mg/dL and mmol/L **[A]**
- **Fasting-sensitive:** yes — optimal differs fasting vs non-fasting **[A][T5][T6]**
- **BioSense role:** A modifiable metabolic/lipid-wellness marker, read alongside HDL-C, non-HDL-C, ApoB and LDL-C.

---

# 2. Physiological Function

Triglycerides store energy. After a meal, dietary fat is packaged into chylomicrons; between meals
and in response to excess carbohydrate, the liver produces VLDL carrying triglycerides to tissues for
energy or storage. **[A]** Because they rise after eating, triglyceride levels are meaningfully
affected by recent food and drink — the basis for the fasting convention (§8). **[A]**

Two points shape interpretation **[A]**:
- **Triglycerides are dynamic.** They vary with meals, alcohol, and day-to-day, more than cholesterol
  does — so a single value is a snapshot, and trends matter (§16). **[A][T22]**
- **Triglyceride-rich lipoproteins and their remnants are atherogenic.** Elevated triglycerides mark
  atherogenic remnant particles and associate independently with cardiovascular risk, which is why
  BioSense reads TG alongside the atherogenic markers (§9). **[A][T15]**

---

# 3. Scientific Background

Triglycerides have a well-established place in cardiovascular and metabolic wellness. Recognised
guidelines classify fasting triglycerides into normal, borderline-high, high, and very-high bands,
and these thresholds are broadly consistent across bodies. <cite index="58-1">The National Cholesterol Education Program Adult Treatment Panel III (NCEP ATP III) guidelines categorize triglyceride (TG) levels as normal (<150 mg/dL), borderline high (150-199 mg/dL), high (200-499 mg/dL, and very high (>500 mg/dL).</cite> <cite index="58-1">The threshold level of fasting triglyceride levels of 150 mg/dL (1.7 mmol/L) is accepted by all medical societies.</cite> **[A][T1-T4]**

Two features shape how BioSense frames triglycerides:
- **"Optimal" is lower than "normal," and is not a drug target.** The AHA proposed an optimal fasting
  level below 100 mg/dL, explicitly *not* as a therapeutic target. <cite index="70-1">the AHA recommends that 100 mg/dL replace 150 mg/dL as the upper limit for the "optimal level" for triglycerides. But... the cut point should not be used as a therapeutic target for drug therapy, "because there is insufficient evidence that lowering triglyceride levels" can improve risk.</cite> The same statement emphasised that <cite index="70-1">high triglycerides can, in large part, be reduced through major lifestyle changes</cite> — which aligns precisely with a wellness-optimisation platform. **[A][T5][T16][T17]**
- **Very high triglycerides carry pancreatitis relevance.** Beyond cardiovascular wellness, severe
  elevations raise the risk of acute pancreatitis, which is why the Endocrine Society defines severe
  (≥1000 mg/dL) categories and guidance prioritises lowering very high levels. **[A][T9][T10]**

**The wellness reading — [B]:** triglycerides are a highly modifiable wellness signal that responds
well to lifestyle. BioSense frames them as a gradient to optimise, read with the other lipids, with a
calm, clear escalation path when very high.

**An honest boundary — [E]:** guideline triglyceride numbers are diagnostic/treatment-adjacent and
fasting-dependent. BioSense uses them as the basis for a fasting-aware wellness gradient and never
converts a threshold into a diagnosis. **[E]**

---

# 4. Why Triglycerides Matter

**1. They are highly lifestyle-responsive. [A][T17]** More than most lipids, triglycerides respond to
diet (refined carbohydrate, alcohol), weight, and activity — making them an actionable, rewarding
wellness target. **[A]**

**2. They complete the lipid picture. [A]** Triglycerides are needed to compute non-HDL-C context,
they flag atherogenic remnant particles, and they signal when a calculated LDL-C may be unreliable
(§9). **[A][T14]**

**3. They add a metabolic dimension. [A][T15]** Elevated triglycerides commonly cluster with low
HDL-C and insulin resistance, giving a fuller metabolic-wellness view (without diagnosing a
syndrome). **[A]**

**Why BioSense measures it — [C]:** triglycerides are a standard, widely available, highly modifiable
lipid-panel component that aligns strongly with BioSense's optimisation philosophy — provided fasting
status and the very-high safety tier are handled rigorously.

---

# 5. Laboratory Measurement

Triglycerides are measured directly on a standard lipid panel via enzymatic assays. **[A]**

- **Directly measured**, standardised, broadly comparable between laboratories. **[A]**
- **Classically measured fasting (9–12 hours).** <cite index="55-1">You have to fast before blood can be drawn for an accurate triglyceride measurement.</cite> Non-fasting measurement is increasingly accepted, interpreted against non-fasting thresholds (§8). **[A][T11]**
- **Sensitive to recent food and alcohol**, so pre-analytic conditions matter more than for cholesterol. **[A][T19][T22]**

---

# 6. Units

- **mg/dL** — standard in the US. **BioSense canonical unit.** **[A/C]**
- **mmol/L** — standard in much of the world. **[A]**
- Conversion uses the **triglyceride** molar factor **88.57** (distinct from cholesterol's 38.67). **[A][T13]**

BioSense stores the reported value, unit, and fasting status unchanged and computes the parallel unit. **[C]**

---

# 7. Unit Conversion

```
mg/dL  = mmol/L × 88.57
mmol/L = mg/dL ÷ 88.57
```
Worked checks: 150 mg/dL ≈ 1.69 mmol/L; 500 mg/dL ≈ 5.65 mmol/L; 1000 mg/dL ≈ 11.3 mmol/L. **[A][T13]**

**Safety rules [D]:**
- The triglyceride factor (88.57) is **not** the cholesterol factor (38.67); the engine must apply the
  correct per-analyte factor. **[A]**
- BioSense never infers the unit from magnitude alone; the reported unit is retained; a missing unit
  means display-only, no interpretation. **[D]**

---

# 8. Measurement Limitations, Fasting Status & Variability  *(major structural adaptation)*

Triglycerides carry two interpretive subtleties larger than the other lipids: **fasting status** and
**variability.** **[A]**

## 8.1 Fasting vs non-fasting — [A]
The recognised "optimal" differs by fasting state: below 100 mg/dL fasting, below 150 mg/dL
non-fasting. <cite index="64-1">the recommendation is for an optimal fasting triglyceride level of less than 100 mg/dL and an optimal nonfasting triglyceride level of less than 150 mg/dL.</cite> **[A][T5][T6]** A raised non-fasting value should prompt a fasting re-check: <cite index="57-1">if nonfasting triglyceride levels equal or exceed 200 mg/dL, a fasting lipid panel is recommended within a reasonable (eg, 2 to 4 weeks) time frame.</cite> **[A][T12]** BioSense therefore treats fasting status as a first-class banding input; if unknown, it uses the more conservative non-fasting thresholds, tags the assumption, and reduces confidence (§13). **[C]**

## 8.2 Biological & postprandial variability — [A][E]
Triglycerides vary substantially with meals, alcohol, and day-to-day — more than cholesterol. **[A][T22]**
A single value is a snapshot; BioSense frames single values cautiously and emphasises the trend (§16).
Alcohol shortly before testing can elevate triglycerides. **[A][T19]**

## 8.3 Cross-marker measurement effect — [A]
High triglycerides degrade the accuracy of calculated LDL-C (Friedewald invalid at ≥400 mg/dL) and
even affect direct LDL-C assays. <cite index="69-1">use of the Friedewald estimation for LDL-C becomes increasingly problematic as triglyceride concentrations increase in the 100- to 400-mg/dL range. Unfortunately, homogeneous assays of LDL-C (so-called direct measurements of LDL-C) also lose accuracy in patients with HTG and in nonfasting samples.</cite> This links directly to SCL-003 (§9). **[A][T14]**

## 8.4 Other limitations — [A]
- **Acute illness** can transiently alter triglycerides. **[A]**
- **Method/biological variation** means small differences may be noise (trend caution, §16). **[A]**

**How BioSense uses this — [C][D]:** fasting status selects the band set and, when unknown, reduces
confidence; a raised non-fasting value triggers a fasting-recheck suggestion (CAV4); high triglycerides
flag reduced reliability of any calculated LDL-C (§9, S11); very high values escalate to a calm
healthcare-review (§11, §19).

---

# 9. Relationships With Other Biomarkers

- **HDL-C (SCL-004). [A]** Low HDL-C and high triglycerides commonly co-occur (insulin resistance,
  metabolic clustering); the TG:HDL ratio (<2.0 favourable) is a widely-cited context proxy, used
  educationally, never as a diagnosis. **[A][T20]**
- **LDL-C (SCL-003). [A]** High triglycerides reduce the reliability of calculated LDL-C (Friedewald
  invalid ≥400); BioSense surfaces this and leans on ApoB/non-HDL-C when triglycerides are high. **[A][T14]**
- **Non-HDL-C. [A]** Non-HDL-C captures triglyceride-rich remnant cholesterol and is a better
  atherogenic-burden marker when triglycerides are elevated. **[A][T15]**
- **ApoB (SCL-001). [A]** High triglycerides raise the interpretive weight of ApoB for particle
  burden (consistent with SCL-003's hierarchy). **[A]**
- **Glucose / HbA1c (SCL-002). [A]** High triglycerides cluster with insulin resistance; a fuller
  metabolic-wellness picture emerges when read together (without diagnosing). **[A]**

**Engine implication [C]:** high triglycerides increase the weight BioSense gives to ApoB/non-HDL-C,
flag calculated-LDL-C caution, and surface metabolic clustering as context — never as a diagnosis,
never averaged against other markers.

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Fasting classification (universal):** normal <150, borderline 150–199, high 200–499, very high
  ≥500 mg/dL. <cite index="62-1">2002 NCEP-ATP III: Normal <150, Borderline 150-199, High 200-499, Very High ≥500 (mg/dL, fasting).</cite> The 150 mg/dL threshold is accepted across societies. **[A][T1-T4]**
- **Optimal is below "normal," and not a drug target.** AHA optimal fasting <100 / non-fasting <150. **[A][T5][T6][T16]**
- **Lifestyle first, and highly effective** for lowering triglycerides. **[A][T17]**
- **Very high triglycerides carry pancreatitis risk**; lowering very high levels is prioritised. **[A][T10]**

## 10.2 Where they differ — and why
- **Upper/severe classifications differ.** ATP III caps "very high" at ≥500; the Endocrine Society
  distinguishes severe (1000–1999) and very severe (≥2000) to reflect pancreatitis risk. <cite index="62-1">2012 Endocrine Society: Normal <150, Mild 150-199, Moderate 200-999, Severe 1000-1999, Very Severe ≥2000.</cite> **[A][T9]**
- **Fasting vs non-fasting thresholds.** ACC 2021 uses fasting ≥150 or non-fasting ≥175 for
  mild-moderate elevation; ESC/EAS added a stringent optimal (<1.2 mmol/L ≈ 106). <cite index="67-1">TG elevation is defined as mild to moderate when fasting is ≥150 mg/dl or nonfasting is ≥175 mg/dl to <500 mg/dl, and severe as ≥500 mg/dl and especially ≥1000 mg/dl.</cite> **[A][T7][T8]**
- **Why:** the low/borderline bands are agreed and stable; the *upper* bands differ because bodies
  weight pancreatitis risk differently, and fasting/non-fasting thresholds reflect measurement
  context. BioSense adopts the agreed lower bands and a fasting-aware model, with a very-high safety
  tier. **[A][E]**

## 10.3 Strength of evidence
- **Fasting bands (150/200/500): established / universal.** **[A]**
- **Optimal <100 fasting / <150 non-fasting: established (AHA), not a drug target.** **[A][T5]**
- **Pancreatitis risk at very high TG: established.** **[A][T10]**
- **Lifestyle responsiveness: strong.** **[A][T17]**
- **A single "wellness optimal": reasoned (AHA optimal), fasting-dependent.** **[A/E]**

## 10.4 Intended populations
Guideline thresholds target general-adult risk assessment and treatment, fasting-based. BioSense's
fasting-aware bands (§11) use the agreed anchors for a general-adult wellness audience, abstaining in
pregnancy and under-18s, with a calm very-high escalation path.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic
> boundaries, NOT medical cut-offs, and NOT universal truth. Triglycerides are FASTING-AWARE: optimal
> differs between fasting and non-fasting samples, and very-high values carry a calm escalation path.**

## 11.1 The interpretation bands (mg/dL; general adult, primary prevention, untreated)

Each row states a **BioSense Wellness Interpretation** and the associated TG range. Ranges anchor to
recognised thresholds; labels are BioSense's wellness interpretation.

**Fasting sample (preferred)**

| BioSense Wellness Interpretation | Associated TG (mg/dL) | ≈ mmol/L | Evidence anchor | Wellness meaning |
|---|---|---|---|---|
| **Optimal** | < 100 | < ~1.13 | AHA optimal fasting <100 [T5] | The most favourable range. |
| **Favourable** | 100 – 149 | ~1.13–1.69 | Below ATP III normal ceiling 150 [T1] | Favourable, with simple habits to maintain. |
| **Above Optimal** | 150 – 199 | ~1.7–2.25 | ATP III borderline high [T2] | Above the wellness-desirable range; a modifiable opportunity. |
| **High** | 200 – 499 | ~2.26–5.64 | ATP III high [T3] | Notably above desirable; lifestyle focus and possible healthcare discussion. |
| **Very High — Flag** | ≥ 500 | ≥ ~5.65 | ATP III very high; pancreatitis relevance [T4][T10] | Well above the typical range; discuss with a healthcare professional soon [D]. |
| *(sub-flag) Severe* | ≥ 1000 | ≥ ~11.3 | Endocrine Society severe [T9][T10] | Stronger healthcare-review wording [D]. |

**Non-fasting sample**

| BioSense Wellness Interpretation | Associated TG (mg/dL) | Evidence anchor | Wellness meaning |
|---|---|---|---|
| **Optimal** | < 150 | AHA optimal non-fasting <150 [T6] | The most favourable non-fasting range. |
| **Above Optimal** | 150 – 174 | Approaching ACC non-fasting threshold [T7] | Slightly above; a fasting re-check clarifies. |
| **High — Recheck** | 175 – 499 | ACC non-fasting ≥175 [T7]; reflex-to-fasting [T12] | Above desirable; recommend a fasting re-check. |
| **Very High — Flag** | ≥ 500 | Very high regardless of fasting [T4] | Discuss with a healthcare professional soon [D]. |
| *(sub-flag) Severe* | ≥ 1000 | Endocrine Society severe [T9] | Stronger healthcare-review [D]. |
| *(rule)* Non-fasting ≥ 200 → recommend a fasting re-check within a few weeks [T12] | | | |

## 11.2 How the bands were derived — transparency [B]
- **Fasting bands** anchor to the AHA optimal (<100) and the universal ATP III thresholds
  (150/200/500). **Non-fasting bands** anchor to the AHA non-fasting optimal (<150) and the ACC
  non-fasting threshold (≥175), with a reflex-to-fasting rule at ≥200.
- **The ≥500 Very-High flag and ≥1000 Severe sub-flag** anchor to ATP III and the Endocrine Society,
  reflecting pancreatitis relevance — handled by *routing*, never diagnosis (§19).
- **No number was averaged.** Each boundary maps to a specific cited anchor; fasting and non-fasting
  sets are kept distinct.

## 11.3 Population caveat [E]
Bands assume a **general adult, not pregnant, not on lipid-modifying therapy**, with **fasting status
known**. Not applied to children/adolescents or pregnancy (§15).

## 11.4 Fasting handling — [C]
Fasting status selects the band set. If **unknown**, BioSense uses the **non-fasting** set (more
conservative optimal), tags `fasting_assumed`, and reduces confidence (CAV3). BioSense never infers
fasting status from the value. **[C]**

## 11.5 Never inferred [D]
Fasting status, pregnancy, and therapy come only from declared/lab data. BioSense never infers them —
or any diagnosis — from the TG value.

## 11.6 The low end — no wellness penalty [B][D]
As with ApoB and LDL-C, triglyceride banding is **monotonic, lower-better, with no low-end penalty.**
A low triglyceride value is never scored adverse or alarmed. **[D][T21]**

---

# 12. Interpretation Framework

Fixed deterministic order (consistent with the ENG four-state model), fasting-aware, with a very-high
safety escalation. **[C]**

```
1. VALIDITY   — value interpretable? (unit known via TG factor; result final) → else display-only.
2. ELIGIBILITY— may we band? (general adult, not pregnant) → else abstain (§15).
3. FASTING    — select band set by fasting_status; unknown → non-fasting set + fasting_assumed. [T11]
4. CONFIDENCE — reducers (§13: fasting unknown, recent meal/alcohol, single value) → HIGH / REDUCED.
5. BAND       — assign fasting-aware wellness interpretation (§11); apply VERY_HIGH / SEVERE flags.
6. CONTEXT    — cross-marker (§9): TG:HDL context, calculated-LDL-C caution, non-HDL-C/ApoB weighting.
7. NARRATIVE  — select wellness narrative (§24) + mandatory caveats (§0.8); very-high → healthcare-review.
```

**Core interpretive stance [B]:** triglycerides are a highly modifiable metabolic-wellness signal to
optimise and track, read with the other lipids, with a calm escalation path when very high — never a
diagnosis. **[B][D]**

---

# 13. Confidence Assessment  *(adapted: fasting + variability)*

Start HIGH; reduce to REDUCED if any reducer present; name it (CAV3). **[A]/[D]**

| Reducer | Why | Source |
|---|---|---|
| Fasting status unknown (fasting_assumed) | Optimal differs fasting vs non-fasting | [T11,C] |
| Recent meal / alcohol before draw | TG rises postprandially / with alcohol | [T19,T22] |
| Acute illness | Transient lipid perturbation | [A] |
| Recent major diet / weight change | Transient shift | [A] |
| On lipid-modifying therapy | Reflects treated state | [A] |
| Method change between tests | Trend caution | [A] |
| Value near a band boundary | Small error reclassifies | [B] |
| Single value, no prior | TG varies; trend is more reliable | [T22] |

| Abstention (display-only) | Source |
|---|---|
| Pregnancy / age <18 | [C] |

---

# 14. Wellness Interpretation

Interpretation-by-interpretation guidance, fasting-aware. Wellness, not medical; never names a
condition. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal** *(fasting <100 / non-fasting <150).* "Your triglycerides
  are in an optimal wellness range. A great result to maintain." **[B]**
- **BioSense Wellness Interpretation: Favourable** *(fasting 100–149).* "Your triglycerides are in a
  favourable range. Limiting refined carbohydrate and alcohol and staying active help keep them here." **[B]**
- **BioSense Wellness Interpretation: Above Optimal** *(fasting 150–199 / non-fasting 150–174).* "Your
  triglycerides are a little above the optimal range — and this is one of the most responsive markers to
  lifestyle. Reducing refined carbs, added sugar and alcohol, plus activity and weight management, can
  move them; tracking over time will show progress." Constructive, encouraging. **[B]**
- **BioSense Wellness Interpretation: High** *(fasting 200–499) / High — Recheck (non-fasting 175–499).*
  "Your triglycerides are notably above the desirable range. Lifestyle changes are impactful here, and it
  may be worth discussing your result with a healthcare professional. (If this was a non-fasting sample, a
  fasting re-check will give a clearer reading.)" Constructive + healthcare-review + recheck. **[B][D]**
- **BioSense Wellness Interpretation: Very High — Flag** *(≥500; Severe ≥1000).* "Your triglycerides are
  well above the typical range. It would be worth discussing this result with a healthcare professional
  soon." Firm-but-calm, non-alarming, non-diagnostic, no condition named (S3, CAV5). **[B][D]**

Every interpretation pairs the reading with a lifestyle lever (§17) and the mandatory caveats (§0.8).
**None names pancreatitis, metabolic syndrome, or any condition.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains from banding** where its bands don't apply. **[C]/[D]/[E]**

- **15.1 Children & adolescents.** Adult bands not applied; display, suggest professional interpretation. **[D]**
- **15.2 Pregnancy.** Triglycerides rise physiologically in pregnancy; BioSense does not band, notes this,
  defers to a professional. **[D]**
- **15.3 Fasting required-but-unusable (edge cases).** Where a reliable reading needs fasting and it can't
  be established, prefer the non-fasting set with reduced confidence, or abstain with a fasting-recheck
  suggestion (CAV4). **[D][T11]**
- **15.4 Markedly low triglycerides.** Never a wellness concern, never penalised (S5). **[D][T21]**
- **15.5 On lipid-modifying therapy.** Framed as reflecting current management; never implies change (S6). **[D]**
- **15.6 Very high (≥500 / ≥1000).** Calm healthcare-review, routing not diagnosis (S3). **[D]**

**Abstention is a first-class, non-error output**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour  *(adapted: high variability)*

- **What counts as a real change. [A][E]** Triglycerides vary substantially day-to-day and with meals;
  BioSense frames a change as meaningful only when it clearly exceeds this variation and fasting state is
  consistent between measurements. **[T22]**
- **Fasting-consistency matters. [A]** Comparing a fasting to a non-fasting value can create a false
  change; BioSense flags fasting mismatches and compares like with like. **[T11]**
- **Method changes. [A]** Flagged as possibly method-related, not a true change.
- **Direction & framing. [B]** Downward = improving (encouraged — TG responds well and often quickly to
  lifestyle); upward = a calm optimisation prompt. Low end has no penalty (§11.6).
- **Rapid responsiveness. [B]** Because triglycerides respond relatively quickly to lifestyle, BioSense can
  frame short-term improvement positively (a motivating feature of this marker), while still relying on the
  trend rather than a single reading.

---

# 17. Lifestyle Optimisation Guidance

Lifestyle is the first tier, and triglycerides are among the most lifestyle-responsive markers. **[A]/[B]**

## 17.1 Nutrition [A][T17]
- **Reduce refined carbohydrate, added sugar, and fructose** — the strongest dietary lever on
  triglycerides. **Strong evidence.** **[A]**
- **Limit alcohol** — a major, modifiable driver of high triglycerides. **[A][T19]**
- **Favour unsaturated fats; include oily fish / dietary omega-3 (food-first).** **[A][T17][T18]**

## 17.2 Physical activity [A][T17]
Regular activity lowers triglycerides and improves the overall metabolic picture. **Strong evidence.** **[A]**

## 17.3 Weight / body composition [A][T17]
Weight loss where relevant meaningfully lowers triglycerides. **Strong evidence.** **[A]**

## 17.4 Omega-3 context [A][T18]
Dietary omega-3 (oily fish) supports healthy triglycerides. **High-dose EPA/DHA (2–4 g/day) is a
medical management approach used under physician supervision** — BioSense may mention it as educational
context but never prescribes a dose or frames supplements as therapy (S6). **[A][D]**

## 17.5 Framing rules [B][D]
Lifestyle first; medication never suggested (including prescription-level omega-3 dosing); **alcohol
never suggested and noted as a driver of high TG** (S7). Honest framing: triglycerides respond well and
often quickly to lifestyle — a genuinely motivating feature.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain the band and what triglycerides are, in warm wellness language; connect to
lifestyle levers; explain the fasting/non-fasting distinction and the lipid-context relationships;
acknowledge progress; express abstention respectfully.

The AI layer **must never**:
- state or imply a diagnosis or condition, including **pancreatitis** or **metabolic syndrome** (S1)
- name a condition even when handling a very-high value — it routes, it does not diagnose (S3)
- produce a numeric cardiovascular or pancreatitis risk % (S4)
- recommend starting/stopping/changing medication, or prescribe an omega-3 therapy dose (S6)
- suggest alcohol (S7)
- present a very-high value alarmingly — firm but calm, non-catastrophising (S3)
- present a BioSense band as a medical/diagnostic boundary (S10)
- compare fasting and non-fasting values as if equivalent (§16)
- infer fasting status, pregnancy, or therapy from the value

Enforcement is by output validation on rendered text, not by prompt alone. Condition names
(pancreatitis, metabolic syndrome) as user-directed conclusions are SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations  *(heightened: very-high / pancreatitis tier)*

- **Not a diagnosis.** Every output carries CAV1; a very-high value is handled by *routing*, never by
  naming pancreatitis or any condition (S1, S3). **[D]**
- **Very-high escalation.** ≥500 → "discuss with a healthcare professional soon" (CAV5); ≥1000 → stronger
  review wording. Firm but calm, never alarmist, never an emergency instruction. **[D][T10]**
- **One factor among many.** CAV2 frames TG as one marker, read with the other lipids. **[D]**
- **No medication guidance.** Medication and omega-3-therapy questions → educational context + referral
  (S6, S8). **[D]**
- **No alcohol advice.** Alcohol never suggested; noted as a driver of high TG and a pre-test distorter
  (S7). **[D]**
- **Low values not pathologised.** Never penalised or alarmed (S5). **[D]**
- **Correct unit factor.** The engine applies the triglyceride factor (88.57), not cholesterol's. **[D]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. Triglycerides are **Very High (≥500)** — CAV5 "soon"; **≥1000** → stronger review. **[T4][T10]**
2. Triglycerides are **High (200–499)** and cluster with other signals (low HDL-C, high glucose) —
   metabolic context worth professional review. **[T15]**
3. A **non-fasting value ≥200** should be re-checked fasting (CAV4). **[T12]**
4. The user is in an **abstention population** (child/adolescent, pregnancy). 
5. The user **asks a medical or medication question** (including omega-3 therapy) (S8). **[D]**

All suggestions are wellness-framed and non-diagnostic. The very-high (≥500/≥1000) suggestion is
firm-but-calm ("soon"), still without naming a condition and without emergency instructions. **[D]**

---

# 21. BioSense Product Integration

How SCL-005 plugs into the existing platform (no architecture change): **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for triglycerides, plus fasting
  status, and available HDL-C/LDL-C/non-HDL-C/ApoB/glucose for context.
- **Supplies (as CSL bindings):** the fasting-aware wellness bands (Category B), recognised anchors
  (Category A), the very-high/pancreatitis safety model, confidence reducers, safety rules, lifestyle
  evidence, and narrative templates — each with value + source-ID + category + version.
- **Respects:** every ENG platform invariant; the cross-marker discipline (TG raises ApoB/non-HDL-C
  weighting and flags calculated-LDL-C caution, consistent with SCL-003; never averages markers).
- **Uses the correct unit factor** (88.57) — a per-analyte configuration value, not the cholesterol factor.
- **Score contribution:** triglycerides contribute to the metabolic/cardiovascular-wellness domain as a
  monotonic (lower-better) input, no low-end penalty; very-high values escalate to review rather than a
  risk number. Any score weighting is a Category [C] product decision. **[C]**

---

# 22. Medication Context (educational only)

Educational context only; BioSense does not instruct on medication (S6). **[D]**
- Triglycerides are generally **not** a primary drug target except when very high (≥500 mg/dL), where
  reducing them is prioritised to lower pancreatitis risk — a clinical decision. **[A][T16][T10]**
- **High-dose omega-3 (EPA/DHA, ~2–4 g/day)** is a physician-supervised medical management approach for
  high triglycerides, not a self-directed supplement regimen; BioSense mentions it only as educational
  context. **[A][T18]**
- Any medication or omega-3-therapy question → educational context + suggestion to speak with a
  healthcare professional (S8). **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Fasting vs non-fasting optimal differ. [E]** BioSense uses both anchor sets and treats unknown
   fasting conservatively; the "true" optimal for an individual non-fasting sample varies with the meal.
2. **Upper/severe classifications differ across bodies. [E]** ATP III caps very-high at ≥500; the
   Endocrine Society adds severe/very-severe. BioSense uses ≥500 and a ≥1000 sub-flag.
3. **TG:HDL ratio is context, not a validated diagnostic. [E]** Used educationally only. **[T20]**
4. **High biological variability. [E]** Single values are cautious; the trend is emphasised. **[T22]**
5. **Optimal <100 is not a treatment target. [E]** BioSense frames it as a wellness aspiration, not a goal
   to medicate toward. **[T5][T16]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; never names a condition;
fasting-aware). **[B]/[D]** (Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL
"Your triglycerides are {value} mg/dL ({mmol} mmol/L) — in an optimal wellness range. A wonderful result
 to maintain."  +CAV1 +CAV2

TEMPLATE: FAVOURABLE
"Your triglycerides are {value} mg/dL ({mmol} mmol/L) — a favourable range. Limiting refined carbs and
 alcohol and staying active help keep them here."  +CAV1 +CAV2

TEMPLATE: ABOVE_OPTIMAL
"Your triglycerides are {value} mg/dL ({mmol} mmol/L) — a little above the optimal range, and one of the
 most responsive markers to lifestyle. Reducing refined carbs, added sugar and alcohol, plus activity and
 weight management, can move them; tracking over time will show progress."  +CAV1 +CAV2

TEMPLATE: HIGH  (fasting 200–499)
"Your triglycerides are {value} mg/dL ({mmol} mmol/L) — notably above the desirable range. Lifestyle
 changes are impactful here, and it may be worth discussing your result with a healthcare professional."
 +CAV1 +CAV2 +CAV5(soft)

TEMPLATE: HIGH_RECHECK  (non-fasting 175–499)
"Your triglycerides are {value} mg/dL ({mmol} mmol/L), from what looks like a non-fasting sample. A fasting
 re-check will give a clearer reading, and reducing refined carbs and alcohol plus staying active all help."
 +CAV1 +CAV2 +CAV4

TEMPLATE: VERY_HIGH_FLAG  (≥500; stronger ≥1000)
"Your triglycerides are {value} mg/dL ({mmol} mmol/L) — well above the typical range. It would be worth
 discussing this result with a healthcare professional soon."  +CAV1 +CAV2 +CAV5
 (≥1000: stronger review wording; still calm, still names no condition — S3)

MODIFIER: FASTING_UNKNOWN → append CAV3 + CAV6, e.g.
 "We used non-fasting thresholds because fasting status wasn't specified; a fasting sample gives a clearer
  reading."

MODIFIER: LIPID_CONTEXT (high TG + other markers) →
 "High triglycerides can make a calculated LDL-C less reliable, so we lean on ApoB / non-HDL-C here; low
  HDL-C alongside high triglycerides is worth noting as part of your metabolic picture."

MODIFIER: ABSTENTION (child / pregnancy) →
 "Because {age / pregnancy} affects how triglycerides should be interpreted, we're not scoring this one —
  it's best looked at with a healthcare professional."  +CAV1
```

**Absolute rules:** no template names a condition (pancreatitis, metabolic syndrome), suggests alcohol
(S7), prescribes an omega-3 dose (S6), or presents a band as a diagnosis. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, fasting. [illustrative]**
```
Input: TG 82 mg/dL, fasting, adult, no declared conditions.
Band: OPTIMAL (fasting) | Confidence: HIGH | Abstained: false
Narrative: OPTIMAL +CAV1+CAV2 ; Rec: Tier 1 maintain; Tier 2 re-check ~12 months.
```

**Example 2 — Above Optimal, fasting, with low HDL-C. [illustrative]**
```
Input: TG 176 mg/dL, fasting, HDL-C 38 (male), adult.
Band: ABOVE_OPTIMAL (fasting) | metabolic_clustering: true
Narrative: ABOVE_OPTIMAL +CAV1+CAV2 + LIPID_CONTEXT ; Rec: Tier 1 (refined carbs, alcohol, activity).
```

**Example 3 — High, non-fasting → recheck. [illustrative]**
```
Input: TG 230 mg/dL, non-fasting, adult.
Band: HIGH_RECHECK (non-fasting) | Confidence: HIGH
Narrative: HIGH_RECHECK +CAV1+CAV2+CAV4 (fasting re-check) ; Rec: Tier 1 lifestyle; Tier 2 fasting panel.
```

**Example 4 — Very high. [illustrative]**
```
Input: TG 640 mg/dL, fasting, adult.
Band: VERY_HIGH_FLAG | Narrative: VERY_HIGH_FLAG +CAV1+CAV2+CAV5 ("discuss soon")
NOTE: no "pancreatitis" named; no risk %; routes, does not diagnose.  [S1,S3,S4]
```

**Example 5 — Severe. [illustrative]**
```
Input: TG 1180 mg/dL, fasting, adult.
Band: VERY_HIGH_FLAG (SEVERE ≥1000) | Narrative: stronger healthcare-review wording, still calm, no condition named.
```

**Example 6 — Fasting unknown. [illustrative]**
```
Input: TG 165 mg/dL, fasting status not specified, adult.
Band: ABOVE_OPTIMAL (non-fasting set) | Confidence: REDUCED (fasting_assumed)
Narrative: ABOVE_OPTIMAL +CAV1+CAV2 +CAV3+CAV6
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-001 (ApoB), SCL-003 (LDL-C), SCL-004 (HDL-C)** — high TG raises ApoB/non-HDL-C weighting, flags
  calculated-LDL-C caution (SCL-003), and clusters with low HDL-C (SCL-004).
- **SCL-002 (HbA1c)** — triglyceride elevation clusters with insulin resistance.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§0 Implementation Summary** — developer-facing activation values.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the T-series IDs in §0
> and the body. Developers finalising the pack should confirm exact page/table locators against the primary
> PDFs where required.

**Guidelines & classifications (Category A anchors)**

1. Grundy SM, Cleeman JI, et al. **Third Report of the NCEP Expert Panel (ATP III), Final Report.**
   *Circulation* 2002;106(25):3143–3421. — *TG normal <150 / borderline 150–199 / high 200–499 / very
   high ≥500; non-HDL-C secondary target (T1–T4, T16).*
2. Miller M, Stone NJ, et al. **Triglycerides and Cardiovascular Disease: AHA Scientific Statement.**
   *Circulation* 2011;123(20):2292–2333. — *Optimal fasting <100 / non-fasting <150 (not a drug target);
   non-fasting ≥200 → fasting re-check; lifestyle emphasis (T5, T6, T12, T16, T17).*
3. Virani SS, Morris PB, et al. **2021 ACC Expert Consensus Decision Pathway on ASCVD Risk Reduction in
   Persistent Hypertriglyceridemia.** *J Am Coll Cardiol* 2021;78(9):960–993. — *Mild-moderate: fasting
   ≥150 or non-fasting ≥175 to <500; severe ≥500, especially ≥1000; lifestyle first (T7, T10, T17).*
4. Berglund L, et al. **Evaluation and Treatment of Hypertriglyceridemia: Endocrine Society Clinical
   Practice Guideline.** *J Clin Endocrinol Metab* 2012;97(9):2969–2989. — *Normal/mild/moderate/severe
   (1000–1999)/very severe (≥2000); pancreatitis focus (T9, T10).*
5. Mach F, et al. **2019 ESC/EAS Guidelines for the management of dyslipidaemias.** *Eur Heart J*
   2020;41(1):111–188; and EAS 2021 remnant/TG-rich lipoprotein consensus. — *Fasting <1.7 mmol/L (150)
   desirable; ≥1.7 ↑ASCVD; EAS optimal <1.2 mmol/L (~106) (T8, T15).*

**Pancreatitis, remnants & measurement (Category A)**

6. Endotext (Feingold KR, ed.). **Risk of Fasting and Non-Fasting Hypertriglyceridemia in CVD and
   Pancreatitis** (NBK513129); Hypertriglyceridemia-Induced Pancreatitis review. — *NLA: reduce to <500
   when >1000 to prevent pancreatitis; ATP III bands; TG an independent risk factor (T4, T10, T15).*
7. Skulas-Ray AC, et al. **Omega-3 Fatty Acids for the Management of Hypertriglyceridemia: AHA Science
   Advisory.** *Circulation* 2019;140(12):e673–e691. — *High TG degrades calculated & direct LDL-C;
   EPA/DHA 2–4 g/day for HTG (supervised); lifestyle (T14, T17, T18).*

**Measurement, units, lifestyle (Category A/S)**

8. NCEP ATP III & AHA measurement guidance; standard triglyceride molar factor 88.57. — *Fasting 9–12 h;
   non-fasting acceptance; unit conversion (T11, T13, T22).*
9. AHA/ACC lifestyle management guidance; NEJM CardioExchange (AHA optimal). — *Refined carb/added
   sugar/fructose reduction, alcohol limitation, weight, activity, omega-3; alcohol raises TG (T17, T19).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–5; they are
> BioSense Version 1 classifications, fasting-aware, not attributable to any single reference as a
> diagnostic threshold, and do not restate diagnostic labels.

---

# 28. Founder Decisions Required

The core triglyceride methodology (fasting-aware bands; very-high/pancreatitis routing; lower-better with
no low-end penalty) follows directly from the evidence and the established platform posture. Two optional
presentation/policy items remain: **[C][E]**

**D-1 — Confirm the fasting-aware band boundaries**, in particular using the **AHA optimal <100 (fasting)**
as the Optimal anchor rather than the ATP III normal <150. Confirmation requested that the more aspirational
AHA optimal is the correct wellness anchor. **Founder sign-off requested.**

**D-2 — Confirm the very-high escalation wording strength** at ≥500 ("soon") and ≥1000 (stronger), ensuring
it is firm enough to be responsible while remaining calm and non-diagnostic. **Founder decision requested.**

*(Both affect presentation/handling, not the underlying evidence.)*

---

**END OF SCL-005 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A]
guideline figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. The
fasting-aware banding, the very-high/pancreatitis safety tier, the variability-aware trend handling, and the
triglyceride-specific unit factor were adapted to triglycerides' genuine structural differences; all other
structure follows SCL-001 exactly.*
