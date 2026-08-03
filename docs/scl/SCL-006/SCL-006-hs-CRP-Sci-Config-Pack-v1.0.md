# SCL-006 — HIGH-SENSITIVITY C-REACTIVE PROTEIN (hs-CRP)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology

**Document ID:** SCL-006
**Biomarker:** High-sensitivity C-Reactive Protein (hs-CRP)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Structure preserved; only the sections requiring genuine structural difference were adapted.

---

> **What this document is.** SCL-006 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for hs-CRP. It does not redesign the
> Constitution, the ENG documents, the Blood Analysis Engine, or the SCL architecture.
>
> **What BioSense is.** A premium wellness and preventative health-intelligence platform.
> **Not** a medical device. It does **not** diagnose disease, **not** replace clinicians,
> **not** prescribe. All content is written from a **wellness-optimisation** perspective.
>
> **On thresholds.** Recognised guideline numbers are reproduced faithfully and attributed
> (Category A). The BioSense Wellness Interpretation Bands are a transparent interpretation of that
> evidence for a general-adult wellness audience (Category B) — they are **BioSense Version 1
> Wellness Interpretations, not diagnostic boundaries or universal medical truth.**

---

## STRUCTURAL-FIT NOTE (hs-CRP vs SCL-001)

The overall structure, section order, content-classification scheme (A–E), confidence model, safety
posture, recommendation-ladder shape, narrative-contract approach, governance, and the
lower-better-with-no-low-end-penalty direction were **preserved exactly**. Five areas required genuine
adaptation:

1. **Acute-phase behaviour is the defining feature (§8, §11, §13, §15) — new and central.** hs-CRP
   rises sharply and transiently with infection, injury, recent vigorous exercise, vaccination, or
   dental work, and **cannot be interpreted for cardiovascular wellness during acute inflammation.** A
   value **>10 mg/L is discarded** for wellness purposes and repeated later; recent transient causes
   trigger a re-check.
2. **Two-measurement, averaged protocol (§5, §8, §13, §16) — new.** Cardiovascular interpretation uses
   two readings ~2 weeks apart, averaged; a single value is reduced-confidence.
3. **Non-specific, risk-enhancer, not-for-monitoring framing (§9, §18, §19) — safety-critical.**
   hs-CRP is a non-specific marker of inflammation and a *risk enhancer*, not a diagnosis and not a
   treatment-monitoring tool.
4. **Units: mg/L only, one decimal, no unit conversion (§6, §7) — new.** Unlike the lipids, hs-CRP has
   a single unit and **no conversion factor** — the engine must not apply a lipid factor.
5. **Active low-end reassurance (§11, §14, §19) — specific.** A low hs-CRP is favourable and must be
   explicitly reassured as *not* indicating a "weak immune system."

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

hs-CRP is a window onto low-grade, whole-body inflammation, and it is one of the more nuanced markers
in the library. BioSense handles that nuance deliberately. It reproduces the recognised risk tertiles
faithfully and attributes them, and it respects two things the evidence is emphatic about: that hs-CRP
is *non-specific* — a raised value points to inflammation somewhere, not to any particular condition —
and that it is only meaningful for cardiovascular wellness when acute causes have been excluded and the
reading is confirmed. BioSense interprets hs-CRP as a modifiable inflammation signal and a
risk-enhancer, read in context, and never as a diagnosis.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as
the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate hs-CRP. Every value carries a source ID (R-series → §27) and a
> category tag. Canonical unit: **mg/L (one decimal, no conversion factor).** **Acute-phase handling is
> central.**

## 0.1 Canonical units — [A]
```
canonical_unit: mg/L   (report to 1 decimal place)                              [R6]
NO unit conversion factor exists for hs-CRP; NEVER apply a lipid factor.        [R6]
Distinguish hs-CRP from standard CRP (different scale); do not use interchangeably. [R20]
Always retain value_reported + unit_reported. Never guess/convert a missing unit.  [ENG platform rule]
```

## 0.2 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors R1–R4)
```
HSCRP_WELLNESS_BAND (mg/L, general adult, primary prevention, no acute cause):
  LOW_FAVOURABLE   < 1.0            # CDC/AHA low CV risk tertile [R1]; low is favourable [R19]
  AVERAGE          1.0 – 3.0        # CDC/AHA average CV risk tertile [R2]
  HIGH             > 3.0 and ≤ 10.0 # CDC/AHA high CV risk tertile [R3]
  ACUTE_EXCLUDE    > 10.0           # NOT a wellness signal — discard for CV, repeat later [R4]

DIRECTION: LOWER_BETTER, no low-end penalty; low hs-CRP is favourable and NOT "weak immunity". [B][R19]
UNIT: mg/L only, 1 decimal. NO conversion.  [R6]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. hs-CRP is non-specific. [B][D]**

## 0.3 Acute-phase & measurement protocol — [A]+[C] (defining feature)
```
ACUTE_EXCLUDE rule: value > 10.0 mg/L → DO NOT band for wellness/CV; display, explain it likely
  reflects a temporary/acute cause, recommend repeat after clinical resolution (~2 weeks). [R4]
TRANSIENT-CAUSE screen (declared): recent infection/illness, injury, vigorous exercise, vaccination,
  dental/medical procedure, flare of known inflammatory condition → abstain or reduced confidence;
  suggest re-check when well.                                                    [R14][R8]
CONFIRMATION protocol: CV interpretation ideally uses TWO readings ~2 weeks apart, AVERAGED.  [R5]
  single value → REDUCED confidence + suggest a confirmatory repeat.            [R5]
ABSTAIN from banding if: age<18 | pregnancy | active acute illness/injury | known inflammatory-disease flare. [D]
NEVER infer an acute cause, pregnancy, or a condition from the hs-CRP value itself.  [D]
```

## 0.4 Confidence reducers — [A]/[D]
```
single_value_no_confirmation [R5] | recent_vigorous_exercise [R14] | recent_minor_illness/cold [R14] |
recent_injury/vaccine/dental [R14] | value_near_a_band_boundary | on_anti-inflammatory/statin_therapy [R15] |
method_change_between_tests | (context) sex/population_distribution_note [R12]
```

## 0.5 Deterministic safety & suppression rules — [D]
```
S1  hs-CRP is NOT a diagnosis. It is NON-SPECIFIC — never name or imply a condition (infection,
    autoimmune disease, cancer, cardiovascular disease).                        [D][R8]
S2  hs-CRP is ONE risk-ENHANCER marker of inflammation, read in context, never a risk score.  [D][R11]
S3  ACUTE_EXCLUDE (>10 mg/L) → do NOT interpret for wellness; explain likely temporary cause; repeat later. [D][R4]
S4  Never use/imply serial hs-CRP to "monitor" a condition or treatment (Class III).  [D][R9]
S5  Low hs-CRP is favourable and NEVER a concern; explicitly reassure low ≠ weak immune system.  [D][R19]
S6  Never recommend starting/stopping/changing medication (incl. statins/anti-inflammatories).  [D]
S7  Never produce a numeric cardiovascular risk % from hs-CRP.                   [D]
S8  On any medical/medication question → educational context + refer.            [D]
S9  Suppress/abstain during acute illness/injury, pregnancy, or inflammatory flare.  [D][R8]
S10 Never present a BioSense band as a medical/diagnostic boundary.              [D]
S11 Read hs-CRP in context (lifestyle, lipids, glucose); a high value points to inflammation, not a cause. [D]
S12 mg/L only, 1 decimal; never apply a unit conversion; distinguish from standard CRP.  [D][R6][R20]
```

## 0.6 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 LIFESTYLE (associated with lower inflammation):
   regular activity (≥150 min/wk moderate); healthy weight (5–10% loss if relevant); not smoking;
   anti-inflammatory dietary pattern (whole foods, less ultra-processed); good sleep; stress management. [R16][R17][R18][R13]
Tier 2 CONFIRM / CONTEXT: if single/elevated & no acute cause, suggest a confirmatory repeat (~2 weeks);
   read alongside lipids, glucose/HbA1c, blood pressure.                        [R5][R11]
Tier 3 HEALTHCARE DISCUSSION (calm) when: confirmed HIGH without an obvious lifestyle cause |
   ACUTE_EXCLUDE persists on repeat | user in an abstention population | medical question.  [D]
NEVER a medication instruction at any tier.
```

## 0.7 Narrative selection rules — [B]/[D]
```
band → template; modulated by confirmation status + acute context.
LOW_FAVOURABLE   → affirming; reassure low is good and not "weak immunity".
AVERAGE          → constructive anti-inflammatory-habits framing.
HIGH (≤10)       → constructive + confirm-with-repeat + calm context; exclude acute causes first.
ACUTE_EXCLUDE    → do NOT interpret for CV; explain temporary cause; repeat when well.
Never name a condition (non-specific); never "monitor your CRP"; never diagnosis.
```

## 0.8 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "hs-CRP is a general, non-specific marker of inflammation — it doesn't point to a specific cause."
CAV3 (single value) "For cardiovascular wellness, hs-CRP is best confirmed with a repeat ~2 weeks apart."
CAV4 (acute >10 or transient cause) "This level likely reflects a temporary cause (recent illness,
      injury, intense exercise, vaccine or dental work); re-check once you're well."
CAV5 (confirmed high) "A confirmed higher hs-CRP is worth discussing with a healthcare professional in
      the context of your other results."
CAV6 (low reassurance) "A low hs-CRP is favourable and does not mean a weak immune system."
```

## 0.9 Source & version identifiers
```
config_id: SCL-006   config_version: 1.0
band_set_id: BIOSENSE_HSCRP_WELLNESS_BANDS_v1     (Category B; anchors R1-R4)
acute_phase_model_id: SCL006_ACUTE_EXCLUDE_v1     (R4,R14) — safety-critical
confirmation_protocol_id: SCL006_TWO_MEASURE_AVG_v1 (R5)
guideline_anchors_id: CDC_AHA_2003 / ACC_AHA_RISK_ENHANCER  (R1-R11)
lifestyle_evidence_id: SCL006_LIFESTYLE_v1        (R16-R18)
safety_rules_id: SCL006_SAFETY_v1                 (S1-S12)
Every row carries its R-source + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

High-sensitivity C-reactive protein (hs-CRP) measures very low concentrations of C-reactive protein, a
protein the liver produces in response to inflammation. **[A]** The "high-sensitivity" assay detects
the small differences in the low range that matter for cardiovascular wellness — a finer scale than the
standard CRP test used for obvious acute infection. **[A][R20]**

From a wellness perspective, hs-CRP is valuable because it reflects **low-grade, whole-body
inflammation**, which is associated with long-term cardiovascular risk and is influenced by modifiable
factors such as body composition, activity, smoking, sleep, and diet. **[A][R13]** Two features define
how it must be interpreted: it is **non-specific** (a raised value signals inflammation somewhere, not a
particular cause) and it is **transiently reactive** (it spikes with infection, injury, or even recent
intense exercise), so a single raised reading is often not a person's baseline. **[A][R8][R14]**

- **Official name:** High-sensitivity C-reactive protein
- **Common abbreviation:** hs-CRP
- **Reported in:** mg/L (one decimal) — **no unit conversion** **[A][R6]**
- **Direction:** lower is better; no "too low" concern **[A][R19]**
- **BioSense role:** A non-specific inflammation / cardiovascular risk-enhancer marker, read in context and confirmed before interpretation.

---

# 2. Physiological Function

C-reactive protein is an acute-phase reactant: the liver increases production in response to
inflammatory signals (notably interleukin-6). **[A]** In a health emergency like a bacterial infection,
CRP rises dramatically; in everyday life, small differences in the baseline low-grade level reflect the
body's ongoing inflammatory "tone." **[A]** hs-CRP measures that low-grade tone. **[A]**

Two points shape interpretation **[A]**:
- **It is fast and reactive.** With a half-life around 19 hours, hs-CRP responds quickly to
  inflammatory and anti-inflammatory changes, which is why a recent cold, injury, vaccine, or dental
  procedure can move a single reading. **[A][R21][R14]**
- **It is non-specific.** hs-CRP indicates that inflammation is present, not where or why. It is not a
  test for any specific disease. **[A][R8]**

---

# 3. Scientific Background

hs-CRP earned its place in cardiovascular wellness through large studies showing that low-grade
inflammation, measured by hs-CRP, predicts cardiovascular events independently of cholesterol. The
CDC and AHA formalised three cardiovascular risk tertiles in a 2003 consensus statement. <cite index="72-1">On the basis of the CRP population distributions, the following tertiles are recommended for categorizing patients: low risk, <1.0 mg/L; average risk, 1.0 to 3.0 mg/L; and high risk, >3.0 mg/L.</cite> **[A][R1-R3]** The same statement set the ground rules BioSense follows: two averaged measurements, and discarding very high readings as acute. <cite index="72-1">To obtain a CRP concentration in metabolically stable patients, 2 measurements, fasting or nonfasting, should be made (optimally 2 weeks apart) and the results averaged. If the CRP level is >10 mg/L, then the test should be repeated and the patient examined for sources of infection or inflammation.</cite> **[A][R4][R5]**

Intervention evidence shows inflammation is modifiable and matters. In the JUPITER trial, a statin
lowered hs-CRP and cardiovascular events in people with elevated hs-CRP but ordinary cholesterol, and
the best outcomes went to those who reached both a low LDL and a low hs-CRP. <cite index="88-1">Rosuvastatin treatment lowered LDL-C levels by 50% and hs-CRP levels by 37%, accompanied by a 44% relative risk reduction.</cite> **[A][R15]** Lifestyle also lowers hs-CRP: a meta-analysis found aerobic exercise reduced it by a meaningful margin, and weight loss and not smoking help too. **[A][R16][R17][R18]**

**The wellness reading — [B]:** hs-CRP is a modifiable inflammation signal and a cardiovascular
risk-enhancer. BioSense frames it as something to understand and, where elevated and confirmed,
improve through lifestyle — never as a diagnosis, and only after acute causes are excluded.

**An honest boundary — [E]:** the evidence is graded and non-specific, hs-CRP cannot be interpreted
during acute inflammation, and it should not be used to monitor treatment. BioSense builds all three
constraints into its logic. **[E][R8][R9]**

---

# 4. Why hs-CRP Matters

**1. It adds an inflammation dimension. [A][R11]** hs-CRP captures a risk pathway (inflammation) that
cholesterol markers miss, refining the wellness picture — and it can be elevated even when cholesterol
is normal. **[A]**

**2. It is modifiable. [A][R16][R17]** Activity, weight, not smoking, sleep, and diet all lower
inflammation, making hs-CRP an actionable wellness target. **[A]**

**3. It is a risk-enhancer, used judiciously. [A][R10][R11]** Current guidance uses hs-CRP to refine
risk near decision thresholds — informative context, not a standalone verdict. **[A]**

**Why BioSense measures it — [C]:** hs-CRP is a widely available, modifiable, inflammation-focused
complement to the lipid and metabolic markers, aligning with BioSense's optimisation philosophy —
provided the acute-phase and confirmation rules are enforced rigorously.

---

# 5. Laboratory Measurement

hs-CRP is measured from blood using a high-sensitivity immunoassay. **[A]**

- **Reported in mg/L to one decimal place.** <cite index="72-1">CRP results should be expressed only as milligrams per liter and expressed to 1 decimal point.</cite> **[A][R6]**
- **No fasting required**; hs-CRP is pre-analytically stable, with a half-life around 19 hours. **[A][R21]**
- **Confirmation matters.** For cardiovascular wellness, two measurements ~2 weeks apart, averaged, are
  recommended in metabolically stable people. **[A][R5]**
- **Distinct from standard CRP.** The high-sensitivity assay reads the low range relevant to
  cardiovascular wellness; standard CRP is used for overt inflammation and should not be used
  interchangeably. **[A][R20]**

---

# 6. Units

- **mg/L — the only unit, reported to one decimal place. BioSense canonical unit.** **[A/C][R6]**
- **No alternative unit and no conversion factor exist for hs-CRP** — unlike the lipids, nothing is
  converted. **[A]**

BioSense stores the reported value and unit unchanged. **[C]**

---

# 7. Unit Conversion

```
None. hs-CRP is reported in mg/L only (1 decimal).                              [R6]
The engine MUST NOT apply any conversion factor (e.g. the cholesterol 38.67 or triglyceride 88.57).
```

**Safety rule [D]:** because there is no conversion, a value arriving in any other unit is a data error,
not something to convert; hs-CRP is displayed in mg/L or flagged, never transformed by a lipid factor.
hs-CRP and standard CRP must be distinguished (§5). **[D][R20]**

---

# 8. Measurement Limitations, Acute-Phase Behaviour & Confirmation  *(major structural adaptation)*

This is the defining section for hs-CRP. **hs-CRP cannot be interpreted for cardiovascular wellness
during acute inflammation, and a single reading is often not a person's baseline.** **[A]**

## 8.1 The acute-phase exclusion — [A]
A value **>10 mg/L is discarded** for cardiovascular purposes and repeated after the acute cause
resolves. <cite index="72-1">If the CRP level is >10 mg/L, then the test should be repeated and the patient examined for sources of infection or inflammation.</cite> **[A][R4]** hs-CRP <cite index="80-1">is not specific for atherosclerosis and cannot be interpreted in the setting of acute inflammation.</cite> **[A][R8]**

## 8.2 Transient causes — [A]
Recent infection or minor illness, injury, vigorous exercise, vaccination, and dental or medical
procedures all transiently raise hs-CRP. **[A][R14]** BioSense screens declared transient causes and,
if present, abstains or reduces confidence with a re-check-when-well suggestion. **[C][D]**

## 8.3 The confirmation (two-measurement) protocol — [A]
For cardiovascular wellness, hs-CRP is ideally two measurements ~2 weeks apart, averaged, in a
metabolically stable person. **[A][R5]** A single value is treated as reduced-confidence with a
confirmatory-repeat suggestion (CAV3). **[C]**

## 8.4 Population distribution & other limitations — [A]
- **Distribution differs by sex and population.** hs-CRP tends to run higher in women than men and
  varies by ancestry; the tertile cut-points are applied uniformly by guideline but BioSense notes this
  as context. **[A][R12]**
- **Not for treatment monitoring.** Serial hs-CRP should not be used to monitor a condition or therapy
  (Class III). **[A][R9]**
- **Biological/method variation** means small differences may be noise (trend caution, §16). **[A]**

**How BioSense uses this — [C][D]:** >10 mg/L → `ACUTE_EXCLUDE` (display, explain, repeat later, no CV
interpretation); a declared transient cause → abstain or reduced confidence; a single value → reduced
confidence + confirmatory-repeat suggestion; and hs-CRP is never used to "monitor" anything (S4).

---

# 9. Relationships With Other Biomarkers

- **Lipids (ApoB, LDL-C, HDL-C, triglycerides; SCL-001/003/004/005). [A]** hs-CRP adds an inflammation
  dimension independent of cholesterol; the JUPITER evidence shows the best outcomes when both LDL and
  hs-CRP are low. BioSense reads hs-CRP alongside the lipids, never as a substitute or an offset. **[A][R15]**
- **Glucose / HbA1c (SCL-002). [A]** Inflammation clusters with insulin resistance and visceral
  adiposity; a fuller metabolic-wellness picture emerges when read together (without diagnosing). **[A][R13]**
- **Standard CRP. [A]** A different scale for overt inflammation; not interchangeable with hs-CRP. **[A][R20]**
- **Blood pressure, weight, lifestyle markers. [A]** hs-CRP is part of a broader inflammation/
  cardiometabolic context rather than a standalone signal. **[A]**

**Engine implication [C]:** hs-CRP refines the cardiovascular/metabolic picture as a risk-enhancer; it
is never averaged against other markers, and a raised value is surfaced as "inflammation present,"
never attributed to a named cause.

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Three cardiovascular risk tertiles: <1.0 low, 1.0–3.0 average, >3.0 high mg/L.** <cite index="80-1">High risk: >3.0 mg/L (associated with 2-fold increased relative cardiovascular risk compared to low-risk tertile)... These cutpoints apply regardless of sex and race.</cite> **[A][R1-R3][R7]**
- **>10 mg/L is discarded for cardiovascular purposes and repeated.** **[A][R4]**
- **Two averaged measurements; report mg/L to one decimal.** **[A][R5][R6]**
- **hs-CRP is non-specific and cannot be interpreted during acute inflammation.** **[A][R8]**
- **Not for serial monitoring of treatment (Class III); a risk-enhancer, not a risk score.** **[A][R9][R11]**
- **Low is better; there is no "too low."** **[A][R19]**

## 10.2 Where they differ — and why
- **Race/sex-specific cut-points debated but not adopted.** hs-CRP distributions differ by sex and
  ancestry; the MESA study suggested group-specific cut-points could improve prediction, but the
  CDC/AHA thresholds have not been officially revised. <cite index="73-1">race- and sex-specific cutpoints may improve risk prediction, though the AHA/CDC thresholds have not been officially revised.</cite> **[A][R12]**
- **Role in guidelines has evolved** from a standalone stratifier toward a *risk-enhancer* used near
  decision thresholds. **[A][R10][R11]**
- **Why:** the tertiles are a stable population-based consensus; refinements reflect ongoing research on
  population differences and appropriate use. BioSense uses the established uniform tertiles and notes
  population variation as context. **[A][E]**

## 10.3 Strength of evidence
- **Tertiles & the >10 acute rule: established / consensus.** **[A]**
- **Two-measurement protocol: established / consensus.** **[A][R5]**
- **Inflammation modifiable (exercise, weight, smoking, statin): strong.** **[A][R15-R18]**
- **Non-specificity & no-serial-monitoring: established (Class III).** **[A][R9]**
- **Population-specific cut-points: unresolved.** **[E][R12]**

## 10.4 Intended populations
The tertiles target general-adult cardiovascular risk refinement, best used in intermediate-risk people
where the result would change a decision. BioSense applies them to a general-adult wellness audience
with the acute-exclusion and confirmation rules, abstaining in pregnancy, under-18s, and acute
illness/injury.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic
> boundaries, NOT medical cut-offs, and NOT universal truth. hs-CRP is NON-SPECIFIC, requires acute
> causes to be excluded, and is best confirmed with a repeat measurement.**

## 11.1 The interpretation bands (mg/L, one decimal; general adult, primary prevention, no acute cause)

Each row states a **BioSense Wellness Interpretation** and the associated hs-CRP range. Ranges anchor to
the CDC/AHA tertiles; labels are BioSense's wellness interpretation.

| BioSense Wellness Interpretation | Associated hs-CRP (mg/L) | Evidence anchor | Wellness meaning |
|---|---|---|---|
| **Low — Favourable** | < 1.0 | CDC/AHA low CV risk tertile [R1] | Low inflammatory tone — favourable. (Low is good; not a sign of weak immunity.) |
| **Average** | 1.0 – 3.0 | CDC/AHA average CV risk tertile [R2] | A typical range; anti-inflammatory habits can help move it lower. |
| **High** | > 3.0 to ≤ 10.0 | CDC/AHA high CV risk tertile [R3] | Above the favourable range; confirm with a repeat (acute causes excluded), then optimise. |
| **Acute — Not Interpreted** | > 10.0 | CDC/AHA acute rule [R4] | Not a cardiovascular-wellness signal — likely a temporary cause; re-check when well. |

## 11.2 How the bands were derived — transparency [B]
- **The 1.0 and 3.0 boundaries** are the recognised CDC/AHA cardiovascular tertiles (R1–R3), applied
  uniformly (the guideline applies them regardless of sex/race, with population variation noted as
  context, §8.4).
- **The 10.0 boundary** is the recognised acute-exclusion threshold (R4): above it, hs-CRP is not
  interpreted for cardiovascular wellness and is repeated later.
- **No number was averaged.** The tertiles are a single consensus, reproduced faithfully.

## 11.3 Population caveat [E]
Bands assume a **general adult, not pregnant, not acutely ill/injured, without an active inflammatory
flare**, and are most meaningful on a **confirmed** (repeated, averaged) measurement. Not applied to
children/adolescents, pregnancy, or acute states (§15). Distribution varies by sex/ancestry (§8.4). **[E]**

## 11.4 Confirmation & acute handling — [C]
A single value is banded with **reduced confidence** and a confirmatory-repeat suggestion (CAV3); a value
**>10 mg/L** is **not banded** for wellness (`ACUTE_EXCLUDE`) and repeated when well (CAV4); a declared
transient cause triggers abstention or reduced confidence. **[C][R4][R5][R14]**

## 11.5 Never inferred [D]
Acute causes, pregnancy, therapy, and any specific condition come only from declared/lab data. BioSense
never infers them — or a diagnosis — from the hs-CRP value. A high value means "inflammation present,"
never a named cause. **[D][R8]**

## 11.6 The low end — favourable, with active reassurance [B][D]
hs-CRP is **lower-better with no low-end penalty.** A low hs-CRP is favourable, and BioSense explicitly
reassures that it does **not** indicate a weak immune system — a common misconception. **[D][R19]**

---

# 12. Interpretation Framework

Fixed deterministic order (consistent with the ENG four-state model), with an acute-phase validity gate
and a confirmation dimension. **[C]**

```
1. VALIDITY   — value interpretable? (unit mg/L; result final; NOT >10 acute; no declared transient
                cause) → if >10 or acute cause, DISPLAY, do NOT band (ACUTE_EXCLUDE), explain, repeat later.
2. ELIGIBILITY— may we band? (general adult, not pregnant, not acutely ill) → else abstain (§15).
3. CONFIRMATION/CONFIDENCE — single value → REDUCED + confirmatory-repeat; two averaged → HIGH; reducers (§13).
4. BAND       — assign wellness interpretation (§11) on the confirmed/averaged value.
5. CONTEXT    — read with lipids/glucose (§9); note it is non-specific (inflammation present, no cause).
6. NARRATIVE  — select wellness narrative (§24) + mandatory caveats (§0.8); low → reassurance (CAV6).
```

**Core interpretive stance [B]:** hs-CRP is a modifiable, non-specific inflammation / risk-enhancer
marker — favourable when low, worth confirming and optimising when elevated, and never interpreted during
acute inflammation. Never a diagnosis. **[B][D]**

---

# 13. Confidence Assessment  *(adapted: confirmation + acute-phase)*

Start HIGH (for a confirmed, averaged value); reduce to REDUCED if any reducer present; name it (CAV3).
A >10 value or declared acute cause triggers abstention (§15), not merely reduced confidence. **[A]/[D]**

| Reducer (band allowed, REDUCED) | Why | Source |
|---|---|---|
| Single value (no confirmatory repeat) | CV interpretation prefers 2 averaged | [R5] |
| Recent vigorous exercise | Transient rise | [R14] |
| Recent minor illness / cold | Transient rise | [R14] |
| Recent injury / vaccine / dental work | Transient rise | [R14] |
| On statin / anti-inflammatory therapy | Value reflects treated state | [R15] |
| Value near a band boundary | Small error reclassifies | [B] |
| Method change between tests | Trend caution | [A] |

| Validity/eligibility abstention | Source |
|---|---|
| hs-CRP > 10 mg/L (acute) | [R4] |
| Active acute illness/injury / inflammatory flare | [R8] |
| Pregnancy / age <18 | [C] |

---

# 14. Wellness Interpretation

Interpretation-by-interpretation guidance. Wellness, not medical; never names a condition (non-specific). **[B]/[D]**

- **BioSense Wellness Interpretation: Low — Favourable** *(<1.0 mg/L).* "Your hs-CRP is low, which
  reflects a low level of general inflammation — a favourable result. (A low hs-CRP is good, and it
  does not mean a weak immune system.)" Reassuring (CAV6). **[B][D]**
- **BioSense Wellness Interpretation: Average** *(1.0–3.0 mg/L).* "Your hs-CRP is in a typical range.
  Anti-inflammatory habits — regular activity, a healthy weight, good sleep, not smoking — are
  associated with lower inflammation over time." Constructive. **[B]**
- **BioSense Wellness Interpretation: High** *(>3.0 to ≤10.0 mg/L).* "Your hs-CRP is above the
  favourable range. Because a single reading can be affected by a recent cold, injury, intense
  exercise, vaccine or dental work, it's best confirmed with a repeat about two weeks apart. If it
  stays elevated, anti-inflammatory lifestyle steps help, and it's worth discussing with a healthcare
  professional in the context of your other results." Constructive + confirm + calm review. **[B][D]**
- **BioSense Wellness Interpretation: Acute — Not Interpreted** *(>10.0 mg/L).* "This hs-CRP is high
  enough that it most likely reflects a temporary cause rather than your baseline. We're not scoring it
  for cardiovascular wellness — it's best re-checked once you're well." Non-alarming, non-diagnostic
  (S3, CAV4). **[B][D]**

Every interpretation pairs the reading with the mandatory caveats (§0.8) and notes hs-CRP is
non-specific. **None names a condition.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains from banding** where hs-CRP is unreliable or its bands don't apply. **[C]/[D]/[E]**

- **15.1 Children & adolescents.** Adult tertiles not applied; display, suggest professional
  interpretation. **[D]**
- **15.2 Pregnancy.** Inflammation markers shift; BioSense does not band, notes this, defers to a
  professional. **[D]**
- **15.3 Acute illness / injury / inflammatory flare, or hs-CRP >10.** `ACUTE_EXCLUDE`: display, explain
  it likely reflects a temporary/acute cause, recommend a repeat once resolved (~2 weeks). Never
  interpreted for cardiovascular wellness. **[D][R4][R8]**
- **15.4 Declared transient cause (recent exercise/illness/injury/vaccine/dental).** Abstain or reduced
  confidence with a re-check-when-well suggestion (CAV4). **[D][R14]**
- **15.5 Single unconfirmed value.** Band with reduced confidence + confirmatory-repeat suggestion
  (CAV3). **[D][R5]**
- **15.6 Low hs-CRP.** Favourable; reassure it is not a concern or a sign of weak immunity (S5). **[D][R19]**

**Abstention is a first-class, non-error output**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour  *(adapted: confirmation, not monitoring)*

- **Confirm, don't "monitor." [A][D]** BioSense may show hs-CRP change over time as wellness feedback on
  lifestyle, but it **never** frames serial hs-CRP as monitoring a condition or treatment (Class III). **[R9]**
- **Acute/transient points excluded. [A]** Any >10 value or one with a declared transient cause is tagged
  and excluded from trend, so it never creates a false signal. **[R4][R14]**
- **What counts as a real change. [A][E]** hs-CRP is variable; a change is framed as meaningful only when
  it exceeds normal variation and both readings were free of acute causes. **[R14]**
- **Direction & framing. [B]** Downward = improving (encouraged — inflammation responds to lifestyle);
  upward without an acute cause = a calm prompt to confirm and review habits. Low end has no penalty
  (§11.6).
- **Two-reading baseline. [A]** BioSense frames the baseline as the average of two readings ~2 weeks
  apart, consistent with the protocol. **[R5]**

---

# 17. Lifestyle Optimisation Guidance

Lifestyle is the first tier, and inflammation is genuinely modifiable. **[A]/[B]**

## 17.1 Physical activity [A][R16]
Regular aerobic activity lowers hs-CRP; a meta-analysis of many trials found a meaningful average
reduction, with ≥150 minutes/week of moderate activity a reasonable target and a larger effect at higher
baseline. **Strong evidence.** **[A]**

## 17.2 Healthy weight / body composition [A][R17]
Visceral fat is pro-inflammatory; even modest weight loss (5–10% of body weight) significantly lowers
hs-CRP. **Strong evidence.** **[A]**

## 17.3 Not smoking [A][R18]
Smoking raises inflammation; cessation lowers hs-CRP over time. **[A]**

## 17.4 Diet, sleep, stress [A][R13]
An anti-inflammatory dietary pattern (whole foods, less ultra-processed), good sleep, and stress
management are associated with lower inflammation. Moderate evidence. **[A]**

## 17.5 Framing rules [B][D]
Lifestyle first; medication never suggested (including statins/anti-inflammatories); anti-inflammatory
habits are framed as supporting whole-body wellness. Honest framing: inflammation responds well to
sustained lifestyle change — a motivating, modifiable target.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain the band and what hs-CRP is (including its non-specificity and the
confirm/acute rules) in warm wellness language; connect to anti-inflammatory lifestyle levers; reassure
about low values; express abstention respectfully.

The AI layer **must never**:
- state or imply a diagnosis or a specific cause — hs-CRP is **non-specific** (S1, S11)
- name any condition (infection, autoimmune disease, cancer, cardiovascular disease) from an hs-CRP value
- interpret a value >10 mg/L, or one with a declared acute/transient cause, for cardiovascular wellness (S3, S9)
- frame serial hs-CRP as "monitoring" a condition or treatment (Class III) (S4)
- present a low hs-CRP as concerning or as "weak immunity" (S5)
- produce a numeric cardiovascular risk % from hs-CRP (S7)
- recommend starting/stopping/changing medication (S6)
- present a BioSense band as a medical/diagnostic boundary (S10)
- apply any unit conversion, or confuse hs-CRP with standard CRP (S12)

Enforcement is by output validation on rendered text, not by prompt alone. Naming a specific condition
from an hs-CRP value is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; non-specific.** Every output carries CAV1 and CAV2; a raised value means
  "inflammation present," never a named cause (S1, S11). **[D][R8]**
- **Acute exclusion.** >10 mg/L or a declared acute/transient cause → not interpreted for wellness,
  re-check when well (S3, CAV4). **[D][R4]**
- **Not for monitoring.** Serial hs-CRP is never framed as monitoring a condition/treatment (S4). **[D][R9]**
- **Low is reassured.** A low value is favourable and explicitly not "weak immunity" (S5, CAV6). **[D][R19]**
- **No medication guidance.** Medication questions → educational context + referral (S6, S8). **[D]**
- **No alarm.** All wording is calm and constructive. **[D]**
- **Correct unit.** mg/L only, one decimal, no conversion; distinguished from standard CRP (S12). **[D][R6][R20]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. hs-CRP is **confirmed High (>3.0 to ≤10)** without an obvious lifestyle explanation — worth reviewing
   in context. **[R3]**
2. hs-CRP is **>10 (ACUTE_EXCLUDE)** and remains elevated on a repeat once well. **[R4]**
3. hs-CRP is High **and clusters** with other signals (lipids, glucose) — metabolic/inflammatory context. **[R11]**
4. The user is in an **abstention population** (child/adolescent, pregnancy) or has an active inflammatory
   condition. 
5. The user **asks a medical or medication question** (S8). **[D]**

All suggestions are wellness-framed, non-urgent, non-diagnostic; no emergency instructions. **[D]**

---

# 21. BioSense Product Integration

How SCL-006 plugs into the existing platform (no architecture change): **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for hs-CRP, plus declared
  acute/transient-cause context, prior hs-CRP (for the two-reading average), and lipids/glucose for context.
- **Supplies (as CSL bindings):** the wellness tertile bands + the ACUTE_EXCLUDE rule (Category B/A), the
  two-measurement confirmation protocol, confidence reducers, safety rules, lifestyle evidence, and
  narrative templates — each with value + source-ID + category + version.
- **Respects:** every ENG platform invariant; the cross-marker discipline (hs-CRP refines but never
  averages against other markers).
- **Unit handling:** mg/L only, one decimal, **no conversion factor** — a per-analyte configuration the
  engine must honour (distinct from the lipid factors).
- **Score contribution:** hs-CRP contributes to the cardiovascular/inflammation-wellness domain as a
  monotonic (lower-better) **risk-enhancer** input, no low-end penalty; ACUTE_EXCLUDE and unconfirmed
  values do not contribute (or contribute at reduced confidence). Any score weighting is a Category [C]
  product decision. **[C]**

---

# 22. Medication Context (educational only)

Educational context only; BioSense does not instruct on medication (S6). **[D]**
- Some cardiovascular medications (e.g. statins) lower hs-CRP as part of a broader anti-inflammatory
  effect, and trials suggest inflammation reduction contributes to their benefit — but this is a clinical
  decision, and hs-CRP is **not** used to self-direct or monitor such therapy (S4). **[A][R15]**
- Any medication question → educational context + suggestion to speak with a healthcare professional
  (S8). **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Population-specific cut-points unresolved. [E]** hs-CRP distributions differ by sex and ancestry;
   group-specific cut-points are debated but not adopted, so BioSense applies the uniform tertiles with a
   context note. **[R12]**
2. **Non-specificity is inherent. [E]** hs-CRP cannot identify the source of inflammation; BioSense never
   attributes a cause. **[R8]**
3. **Single-reading uncertainty. [E]** A confirmed (averaged) value is more reliable; single values are
   reduced-confidence. **[R5]**
4. **Acute threshold is a practical cut. [E]** >10 mg/L is the recognised acute-exclusion line, but
   values between 3 and 10 can also reflect resolving transient causes — hence the confirm step. **[R4][R14]**
5. **Evidence is graded (moderate). [E]** hs-CRP is a risk-enhancer with graded association, not a
   deterministic predictor. **[R7]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; never names a condition;
non-specific framing). **[B]/[D]** (Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: LOW_FAVOURABLE
"Your hs-CRP is {value} mg/L — low, reflecting a low level of general inflammation. That's a favourable
 result. A low hs-CRP is good, and it doesn't mean a weak immune system."  +CAV1 +CAV2 +CAV6

TEMPLATE: AVERAGE
"Your hs-CRP is {value} mg/L — in a typical range. Anti-inflammatory habits like regular activity, a
 healthy weight, good sleep and not smoking are associated with lower inflammation over time."  +CAV1 +CAV2

TEMPLATE: HIGH  (>3.0 to <=10)
"Your hs-CRP is {value} mg/L — above the favourable range. Because a single reading can be affected by a
 recent cold, injury, intense exercise, vaccine or dental work, it's best confirmed with a repeat about
 two weeks apart. If it stays elevated, anti-inflammatory lifestyle steps help, and it's worth discussing
 with a healthcare professional alongside your other results."  +CAV1 +CAV2 +CAV3 +CAV5

TEMPLATE: ACUTE_EXCLUDE  (>10)
"Your hs-CRP is {value} mg/L — high enough that it most likely reflects a temporary cause (like a recent
 illness, injury, or intense exercise) rather than your baseline. We're not scoring it for cardiovascular
 wellness; it's best re-checked once you're feeling well."  +CAV1 +CAV4

MODIFIER: SINGLE_VALUE → append CAV3 (confirm with a repeat ~2 weeks apart).

MODIFIER: TRANSIENT_CAUSE (declared) → append CAV4 (re-check when well).

MODIFIER: LOW_REASSURANCE → CAV6 (low is good; not weak immunity).

MODIFIER: CONTEXT (with lipids/glucose) →
 "hs-CRP is a general, non-specific marker of inflammation, best read alongside your other results
  rather than on its own."

MODIFIER: ABSTENTION (child / pregnancy / acute illness) →
 "Because {age / pregnancy / a recent acute cause} affects how hs-CRP should be interpreted, we're not
  scoring this one — it's best looked at with a healthcare professional."  +CAV1
```

**Absolute rules:** no template names a condition, attributes a cause, frames serial testing as
monitoring, or presents a band as a diagnosis. **[D]**

---

# 25. Example Outputs

**Example 1 — Low, confirmed. [illustrative]**
```
Input: hs-CRP 0.6 mg/L (avg of two readings), adult, no acute cause.
Band: LOW_FAVOURABLE | Confidence: HIGH | Abstained: false
Narrative: LOW_FAVOURABLE +CAV1+CAV2+CAV6 ; Rec: Tier 1 maintain.
```

**Example 2 — High, single value. [illustrative]**
```
Input: hs-CRP 4.2 mg/L, single reading, adult, no declared acute cause.
Band: HIGH | Confidence: REDUCED (single value)
Narrative: HIGH +CAV1+CAV2+CAV3+CAV5 ; Rec: confirm repeat ~2 weeks; Tier 1 anti-inflammatory habits.
```

**Example 3 — Acute exclude. [illustrative]**
```
Input: hs-CRP 14 mg/L, adult.
Band: (none) ACUTE_EXCLUDE | Abstained: true | value displayed
Narrative: ACUTE_EXCLUDE +CAV1+CAV4 (temporary cause; re-check when well). No condition named.  [S1,S3]
```

**Example 4 — High with declared recent illness. [illustrative]**
```
Input: hs-CRP 5.0 mg/L, user notes a cold last week.
Band: (none)/REDUCED — transient cause | Narrative: TRANSIENT_CAUSE modifier +CAV1+CAV4 (re-check when well).
```

**Example 5 — Average, with context. [illustrative]**
```
Input: hs-CRP 2.1 mg/L (avg), adult, ApoB elevated.
Band: AVERAGE | Narrative: AVERAGE +CAV1+CAV2 + CONTEXT modifier (read alongside lipids; non-specific).
```

**Example 6 — Low, user worried it's "too low." [illustrative]**
```
Response: LOW_REASSURANCE (CAV6): a low hs-CRP is favourable and does not indicate a weak immune system.
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-001..005 (ApoB, HbA1c, LDL-C, HDL-C, Triglycerides)** — hs-CRP adds an inflammation dimension
  read alongside these; never averaged or offset.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§0 Implementation Summary** — developer-facing activation values.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the R-series IDs in §0
> and the body. Developers finalising the pack should confirm exact page/table locators against the
> primary PDFs where required.

**Guidelines & consensus (Category A anchors)**

1. Pearson TA, Mensah GA, Alexander RW, et al. **Markers of Inflammation and Cardiovascular Disease:
   Application to Clinical and Public Health Practice — A Statement for Healthcare Professionals From the
   CDC and the AHA.** *Circulation* 2003;107(3):499–511. — *Tertiles <1.0 / 1.0–3.0 / >3.0 mg/L; >10 →
   repeat/exclude acute; two measurements 2 weeks apart averaged; report mg/L to 1 decimal
   (R1–R6, R8).*
2. Ridker PM, et al.; and current ACC/AHA cholesterol guidance. **hs-CRP as a risk-enhancing factor.** —
   *hs-CRP used to refine risk near decision thresholds; ~2-fold RR upper vs lower tertile; not for serial
   monitoring / ACS / secondary-prevention decisions (Class III) (R7, R9, R10, R11).*

**Intervention evidence (Category A/M)**

3. Ridker PM, Danielson E, Fonseca FAH, et al. (JUPITER). **Rosuvastatin to Prevent Vascular Events in
   Men and Women with Elevated C-Reactive Protein.** *N Engl J Med* 2008;359(21):2195–2207. — *Statin
   lowered hs-CRP 37% & LDL 50%; 44% RRR in MACE; LDL<70 + hs-CRP<1 best prognosis (R15).*
4. Meta-analysis of aerobic exercise and inflammatory markers (83 trials). — *Aerobic exercise lowered
   hs-CRP by a mean of ~0.63 mg/L; ≥150 min/week; larger effect at higher baseline (R16).*
5. Reviews of weight loss and smoking cessation on hs-CRP. — *Modest weight loss (5–10%) and smoking
   cessation lower hs-CRP (R17, R18).*

**Population, measurement & low-end (Category A/P/S)**

6. MESA study (N=6,814) and NHANES 2021–2023 distributions. — *hs-CRP higher in women than men and by
   ancestry; population medians; group-specific cut-points debated, not adopted (R12).*
7. hs-CRP interpretation references (CDC/AHA-based clinical summaries). — *No fasting; ~19h half-life;
   transient causes (illness, injury, exercise, vaccine, dental); standard CRP vs hs-CRP distinction;
   low is favourable, no "too low," low ≠ weak immunity (R13, R14, R19, R20, R21, R22).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–2; they are
> BioSense Version 1 classifications, not attributable to any single reference as a diagnostic threshold,
> and do not restate diagnostic labels. hs-CRP is treated as a non-specific risk-enhancer.

---

# 28. Founder Decisions Required

The core hs-CRP methodology (CDC/AHA tertiles; ACUTE_EXCLUDE at >10; two-measurement confirmation;
non-specific, not-for-monitoring framing; active low-end reassurance) follows directly from the evidence
and the established platform posture. Two optional presentation/policy items remain: **[C][E]**

**D-1 — Confirm the two-measurement confirmation policy for banding.** BioSense bands a single value at
reduced confidence with a confirmatory-repeat suggestion, and reserves full confidence for a two-reading
average (~2 weeks apart). Confirmation requested that banding a single value (rather than withholding a
band until confirmed) is the preferred product behaviour. **Founder sign-off requested.**

**D-2 — Confirm population-distribution handling.** BioSense applies the uniform CDC/AHA tertiles and notes
sex/ancestry distribution variation as context, rather than adopting group-specific cut-points (which are
not officially established). **Founder decision requested** on whether to surface the distribution note to
users at all.

*(Both affect presentation/handling, not the underlying evidence.)*

---

**END OF SCL-006 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline
figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was fabricated;
every Category [A] number was retrieved and verified during authoring and traces to §27. The acute-phase
exclusion, the two-measurement confirmation protocol, the non-specific/not-for-monitoring safety framing,
the mg/L-no-conversion unit handling, and the active low-end reassurance were adapted to hs-CRP's genuine
structural differences; all other structure follows SCL-001 exactly.*
