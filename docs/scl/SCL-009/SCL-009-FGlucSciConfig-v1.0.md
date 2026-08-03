# SCL-009 — FASTING PLASMA GLUCOSE (FPG)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology

**Document ID:** SCL-009
**Biomarker:** Fasting Plasma Glucose (FPG; fasting blood glucose / fasting blood sugar)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Structure preserved; the diagnostic-adjacency, two-sided-range, and fasting-dependency adaptations are genuine structural differences (mirroring the SCL-002 HbA1c discipline). All unaffected sections remain consistent with SCL-001 through SCL-008.

---

> **What this document is.** SCL-009 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for fasting glucose. It does not redesign
> the Constitution, the ENG documents, the Blood Analysis Engine, or the SCL architecture.
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

## STRUCTURAL-FIT NOTE (Fasting Glucose vs SCL-001)

Fasting glucose is the most **diagnosis-laden** marker in the library so far — its thresholds *are* the
diabetes and prediabetes diagnostic criteria — and it behaves differently from the lipids. The overall
structure, section order, content-classification scheme (A–E), safety posture, recommendation-ladder
shape, narrative-contract, and governance were **preserved exactly**. The following required genuine
adaptation (mirroring the frozen SCL-002 HbA1c approach where relevant):

1. **Heightened diagnostic adjacency (§0, §11, §18, §19) — safety-critical.** FPG cut-points are formal
   diabetes/prediabetes criteria. BioSense bands them in wellness language but **never emits "diabetes,"
   "prediabetes," or "impaired fasting glucose" as a user-facing label** — it detects the pattern, routes
   calmly, and names nothing (consistent with SCL-002).
2. **Two-sided range with a hypoglycemia low-flag (§11, §14) — new vs the lipids.** Unlike the
   lower-better lipid markers, fasting glucose has an *optimal band* with signal at **both** ends: a low
   flag below 70 mg/dL and a rising gradient above ~100.
3. **Fasting-dependency (§0, §8, §11, §13) — validity input.** A valid interpretation requires a
   genuine ≥8-hour fast; a non-fasting sample is not banded on the fasting bands.
4. **FPG↔HbA1c discordance (§9, §14) — cross-marker discipline.** FPG and HbA1c estimate glycemia
   differently and are frequently discordant; BioSense surfaces discordance, never averages, and (per
   NICE) treats the discordant result as one to repeat rather than resolve.

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

Fasting glucose is one of the most recognised numbers in preventative health — and one of the most
diagnosis-laden, since its thresholds are the formal criteria for prediabetes and diabetes. BioSense
handles it with particular care. It reproduces the recognised categories faithfully and attributes them,
but it never restates a diagnostic label to a user: where a fasting glucose sits in a range that a
clinician would investigate, BioSense detects that pattern, frames it calmly as a wellness signal, routes
toward a healthcare professional, and names no condition. Glucose is also unlike the lipids in shape — it
has a healthy middle, with meaning at both the low and high ends — and it must be read on a genuine fast,
alongside its complementary marker HbA1c. Encouragingly, an elevated fasting glucose is one of the most
modifiable signals in wellness.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as
the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate fasting glucose. Every value carries a source ID (P-series → §27)
> and a category tag. Canonical unit: mg/dL (store mmol/L in parallel). **Two-sided range, fasting-
> required, heightened diagnostic adjacency.**

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: mg/dL          # store mmol/L parallel
mg/dL = mmol/L × 18.0 ; mmol/L = mg/dL × 0.0555 (÷18.0)   (GLUCOSE factor — NOT 38.67 / 88.57)  [P7]
Always retain value_reported + unit_reported + fasting_status. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors P1–P4)
```
FPG_WELLNESS_BAND (mg/dL, general adult, fasting ≥8h, primary prevention, untreated) — TWO-SIDED:
  LOW_FLAG               < 70             # hypoglycemia flag [P4]; calm safety wording, route
    (sub-flag) VERY_LOW  < 54             # clinically significant low [P4]; firmer calm routing
  OPTIMAL                70 – 89          # within-normal, most favourable part of normal [P1]
  GOOD                   90 – 99          # still within normal (<100) [P1]
  ABOVE_OPTIMAL          100 – 109        # lower half of IFG range [P2]  (NO label emitted)
  ELEVATED               110 – 125        # upper IFG range [P2]          (NO label emitted)
  SIGNIFICANTLY_ELEVATED ≥ 126            # diabetes-range pattern [P3]   (NO label emitted) → calm review
DIRECTION: TWO-SIDED (optimal band; low-flag below 70; rising gradient above 100). NOT simple lower-better.  [B][P4]
mmol/L parallels (×0.0555): 70≈3.9 | 100≈5.6 | 126≈7.0 | 54≈3.0
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. NEVER emit diabetes/prediabetes/IFG label. [B][D]**

## 0.3 Fasting & validity logic — [A]+[C]
```
fasting_status REQUIRED for these bands (genuine ≥8h fast).                      [P6]
  non-fasting / unknown-fasting → do NOT band on fasting bands; display + explain a fasting sample is needed
     (or route to HbA1c which is fasting-independent, per SCL-002).             [C][P6]
ABSTAIN from banding if: age<18 | pregnancy (use pregnancy-specific pathways) | acute illness (transient). [D][P13]
declared transient cause (acute stress/illness, steroids/mTOR, very recent exercise) → reduced confidence or abstain. [P12][P13]
NEVER infer fasting status, pregnancy, medication, or a diagnosis from the glucose value itself.  [D]
```

## 0.4 Confidence reducers — [A]/[D]
```
non_fasting_or_unknown_fasting [P6] | single_value_no_confirmation [P5,P11] | acute_illness/stress [P13] |
steroid/mTOR/other_hyperglycemic_med [P13] | recent_vigorous_exercise | dawn_phenomenon_window [P12] |
capillary_vs_venous_or_delayed_processing [P18] | value_near_a_band_boundary | FPG/HbA1c_discordance [P8-P10]
```

## 0.5 Deterministic safety & suppression rules — [D]
```
S1  FPG is NOT a diagnosis. NEVER emit "diabetes", "prediabetes", or "impaired fasting glucose" as a label. [D][P2,P3]
S2  FPG is ONE marker of glucose-metabolic wellness, read with HbA1c/context, never a standalone diagnosis.
S3  SIGNIFICANTLY_ELEVATED (≥126) → calm healthcare-review; detect pattern, name nothing.  [D][P3]
S4  LOW_FLAG (<70) → calm safety wording + route; VERY_LOW (<54) → firmer calm routing; never alarmist. [D][P4]
S5  Never produce a numeric diabetes-risk % from FPG.
S6  Never recommend starting/stopping/changing medication (incl. insulin/oral agents).
S7  Non-fasting/unknown-fasting → do NOT band on fasting bands; explain a fast is needed.  [P6]
S8  On any medication/therapy question → educational context + refer.
S9  Suppress/abstain in pregnancy, age<18, acute illness.  [D]
S10 Never present a BioSense band as a medical/diagnostic boundary.
S11 On FPG/HbA1c discordance, never average; surface; suggest repeating the discordant test (calmly).  [P10]
S12 Two-sided: low is NOT "better"; there is an optimal band, and a low flag below 70.  [P4]
```

## 0.6 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 LIFESTYLE (always first; glucose is highly modifiable):
   reduce refined carbohydrate & added sugar; physical activity (post-meal walks help); weight management;
   fibre; sleep; stress management.                                             [P15]
Tier 2 CONFIRM / CONTEXT: single or borderline value → confirm on a genuine fast; read with HbA1c (2–3 mo view);
   a non-fasting sample → suggest a fasting re-check.                            [P5][P8][P6]
Tier 3 HEALTHCARE DISCUSSION (calm) when: SIGNIFICANTLY_ELEVATED (≥126) | LOW_FLAG (<70) | FPG/HbA1c
   discordance | abstention population | medical question.                      [D]
NEVER a medication instruction at any tier.
```

## 0.7 Narrative selection rules — [B]/[D]
```
band → template; modulated by fasting/confirmation state + HbA1c context.
OPTIMAL / GOOD            → affirming, maintain.
ABOVE_OPTIMAL / ELEVATED → constructive, optimisation-focused (highly modifiable); confirm on a fast; NO label.
SIGNIFICANTLY_ELEVATED   → calm + healthcare-review [D]; NO "diabetes" label.
LOW_FLAG / VERY_LOW      → calm safety wording + route; not alarmist.
non-fasting / unknown    → not banded on fasting bands; explain fast needed / consider HbA1c.
FPG/HbA1c discordance    → surface calmly; suggest repeating the discordant test.
Never "normal/abnormal" as a verdict; NEVER a diagnostic label; never diagnosis.
```

## 0.8 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Fasting glucose is one marker of glucose metabolism, best read alongside HbA1c and your wider context."
CAV3 (reduced confidence) name the reducer(s) — e.g. non-fasting, recent illness, single value.
CAV4 (non-fasting/unknown fast) "For a fasting-glucose reading, an 8-hour fast is needed; otherwise HbA1c
      (which doesn't need fasting) may be a better view."
CAV5 (significantly elevated ≥126) "It would be worth discussing this result with a healthcare professional."
CAV6 (low flag <70) "Low readings are worth mentioning to a healthcare professional, especially if you feel
      shaky, sweaty, or unwell." (calm, non-alarmist)
CAV7 (FPG/HbA1c discordance) "Your fasting glucose and HbA1c don't fully agree; repeating the out-of-step
      test is usually more useful than relying on either alone."
```

## 0.9 Source & version identifiers
```
config_id: SCL-009   config_version: 1.0
band_set_id: BIOSENSE_FPG_WELLNESS_BANDS_v1        (Category B; two-sided; anchors P1-P4)
diagnostic_adjacency_id: SCL009_NO_DIAGNOSTIC_LABEL_v1  (P2,P3 — safety-critical; mirrors SCL-002)
fasting_model_id: SCL009_FASTING_REQUIRED_v1       (P6)
hypoglycemia_safety_id: SCL009_LOW_FLAG_v1         (P4)
hba1c_discordance_id: SCL009_FPG_HBA1C_DISCORDANCE_v1  (P8-P10; ties SCL-002)
guideline_anchors_id: ADA_STANDARDS_2026           (Category A; P1-P4)
safety_rules_id: SCL009_SAFETY_v1                  (S1-S12)
Every row carries its P-source + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Fasting plasma glucose (FPG) is the concentration of glucose in the blood after a period without food —
the body's baseline blood-sugar level. **[A]** Measured after an 8-hour fast, it reflects how well the
body maintains glucose in the absence of a recent meal, and it is a cornerstone of metabolic wellness
assessment. **[A][P6]**

Two features define how BioSense handles it. First, its thresholds are **diagnostic criteria** for
prediabetes and diabetes, so BioSense treats it with the same discipline as HbA1c: band it in wellness
terms, but never restate a diagnostic label. **[A][P2][P3]** Second, unlike the lipids, glucose is
**two-sided** — there is a healthy middle, a low flag below 70 mg/dL, and a rising gradient above ~100 —
so "lower" is not simply "better." **[A][P4]** Encouragingly, fasting glucose is highly modifiable, and an
elevated value is one of wellness's most actionable signals. **[A][P15]**

- **Official name:** Fasting plasma glucose (fasting blood glucose / fasting blood sugar)
- **Common abbreviation:** FPG (FBG, FBS)
- **Reported in:** mg/dL and mmol/L **[A]**
- **Fasting-required:** yes (≥8 hours) **[A][P6]**
- **Direction:** two-sided (optimal band; low flag; high gradient) **[A][P4]**
- **BioSense role:** A modifiable glucose-metabolic wellness marker, read on a genuine fast and alongside HbA1c.

---

# 2. Physiological Function

Glucose is the body's primary circulating fuel, and its level is tightly regulated by insulin (which
lowers it) and counter-regulatory hormones like glucagon and cortisol (which raise it). **[A]** After an
overnight fast, a healthy body holds glucose in a narrow range; a fasting value that is persistently
elevated suggests the regulatory system — particularly insulin sensitivity and the liver's glucose output
— is under strain. **[A]**

Two points shape interpretation **[A]**:
- **Fasting glucose is dynamic and context-sensitive.** It rises physiologically in the early morning
  (the dawn phenomenon) and with stress, acute illness, and certain medications, so a single value is a
  snapshot. **[A][P12][P13]**
- **It changes relatively late.** People can be well along the path toward type 2 diabetes before fasting
  glucose shifts, which is why it is read alongside HbA1c and post-meal measures. **[A][P16]**

---

# 3. Scientific Background

Fasting glucose sits on one of the most standardised evidence bases in medicine. The ADA's current
Standards of Care define impaired fasting glucose and the diabetes threshold precisely. <cite index="48-1">IFG is defined as FPG levels from 100 to 125 mg/dL (from 5.6 to 6.9 mmol/L) and IGT as 2-h PG levels during 75-g OGTT from 140 to 199 mg/dL.</cite> A normal fasting glucose is below 100 mg/dL, and a value of 126 mg/dL or higher (confirmed) is the diabetes threshold. **[A][P1][P2][P3]** Below the normal range, a reading under 70 mg/dL is treated as hypoglycemia and under 54 mg/dL as clinically significant. **[A][P4]**

Two features shape BioSense's framing. First, fasting glucose and HbA1c measure different aspects of
glycemia and are frequently **discordant** — a large population study found only moderate agreement
(kappa ≈ 0.55) and that fasting glucose can underestimate dysglycemia relative to HbA1c. <cite index="51-1">These data indicate that there is a significant discordance in the diagnosis of diabetes between FPG and HbA1c measurements... FPG appears to underestimate the burden of undiagnosed diabetes.</cite> **[A][P8][P9]** Second, elevated fasting glucose is substantially **modifiable** — prediabetes is often reversible with lifestyle change. **[A][P15]**

**The wellness reading — [B]:** fasting glucose is a modifiable, actionable glucose-metabolic signal.
BioSense frames it as a two-sided gradient to optimise, read on a genuine fast and alongside HbA1c, and
always as wellness information rather than a diagnosis.

**An honest boundary — [E]:** fasting glucose thresholds are diagnostic and fasting-dependent, it is a
single-snapshot marker with real biological variability, and it can lag other signals. BioSense reflects
all three with confidence reducers, the fasting gate, and the no-diagnostic-label rule. **[E]**

---

# 4. Why Fasting Glucose Matters

**1. It is a standardised, widely available metabolic marker. [A]** A cornerstone of metabolic-wellness
screening, cheap and ubiquitous. **[A]**

**2. It is highly modifiable. [A][P15]** Diet, activity, weight, and sleep move it, often quickly —
making it one of the most rewarding wellness targets. **[A]**

**3. It is most informative with HbA1c and context. [A][P8]** Because the two markers can diverge,
reading them together gives a fuller, safer picture than either alone. **[A]**

**Why BioSense measures it — [C]:** fasting glucose is a standard, modifiable, high-value glucose-
metabolic marker that pairs naturally with HbA1c — provided the fasting gate and the no-diagnostic-label
discipline are enforced.

---

# 5. Laboratory Measurement

Fasting glucose is measured from a blood sample drawn after an 8-hour fast. **[A][P6]**

- **Fasting definition:** no caloric intake for at least 8 hours (usually overnight, drawn in the
  morning). **[A][P6]**
- **Method:** enzymatic (e.g. hexokinase) on plasma; standardised. **[A][P18]**
- **Pre-analytical care:** glucose continues to be metabolised in an untreated tube, which can lower the
  measured value if the sample is not promptly processed or drawn into a glycolysis-inhibiting tube. **[A][P18]**
- **Not the same as HbA1c:** fasting glucose is a point-in-time snapshot; HbA1c reflects a 2–3-month
  average and needs no fasting (SCL-002). **[A][P8]**

---

# 6. Units

- **mg/dL** — standard in the US. **BioSense canonical unit.** **[A/C]**
- **mmol/L** — standard in much of the world. **[A]**
- Glucose conversion factor **18.0** (mg/dL = mmol/L × 18.0), i.e. mmol/L = mg/dL × 0.0555 — **not** the
  cholesterol (38.67) or triglyceride (88.57) factor. **[A][P7]**

BioSense stores the reported value, unit, and fasting status unchanged and computes the parallel unit. **[C]**

---

# 7. Unit Conversion

```
mg/dL  = mmol/L × 18.0
mmol/L = mg/dL × 0.0555   (i.e. ÷ 18.0)
```
Worked checks: 100 mg/dL ≈ 5.6 mmol/L; 126 mg/dL ≈ 7.0 mmol/L; 70 mg/dL ≈ 3.9 mmol/L. **[A][P7]**

**Safety rule [D]:** the glucose factor (18.0) is analyte-specific — never the lipid factors; a
unit-unknown glucose is displayed but not interpreted. **[D]**

---

# 8. Measurement Limitations, Fasting Status & Variability  *(major structural adaptation)*

Fasting glucose carries three interpretive subtleties that shape its handling. **[A]**

## 8.1 Fasting status — [A]
A valid FPG interpretation requires a genuine ≥8-hour fast. <cite index="41-1">an accurate fasting plasma glucose measurement must be drawn after an 8-hour fast, usually first thing in the morning.</cite> A non-fasting or unknown-fasting sample is **not banded** on the fasting bands; BioSense explains a fast is needed, or points to HbA1c (which needs no fasting). **[A][P6][C]**

## 8.2 Biological variability & confounders — [A][E]
Fasting glucose is a single snapshot with real day-to-day variability. **[A][P11]** It rises
physiologically in the early morning (the **dawn phenomenon**), and with acute **stress, illness**, and
some **medications** (e.g. steroids, mTOR inhibitors). <cite index="48-1">Hyperglycemia occurs in 15–50% of people receiving systemic anticancer treatment... or the frequently associated glucocorticoid treatment.</cite> These are confidence reducers or grounds for abstention (§13, §15). **[A][P12][P13]**

## 8.3 It can lag other signals — [A]
Fasting glucose often changes **late** relative to post-meal glucose and HbA1c; a normal FPG does not rule
out early dysglycemia, which is why it is read with HbA1c (§9). **[A][P16]**

## 8.4 Pre-analytical handling — [A]
In-tube glycolysis can lower an unprocessed sample; a method change is a trend caveat. **[A][P18]**

**How BioSense uses this — [C][D]:** the fasting gate decides whether the fasting bands apply; confounders
and single-snapshot status set confidence; and a normal FPG is never presented as a clean bill of
metabolic health on its own (read with HbA1c).

---

# 9. Relationships With Other Biomarkers

- **HbA1c (SCL-002). [A]** The complementary glucose marker — a 2–3-month average that needs no fasting.
  FPG and HbA1c correlate but are frequently **discordant** (kappa ≈ 0.55); BioSense surfaces discordance,
  never averages the two, and — per NICE — treats the discordant result as one to **repeat** rather than
  resolve (CAV7). Where they disagree, the pair is more informative than either alone. **[A][P8][P9][P10]**
- **Triglycerides (SCL-005) & HDL-C (SCL-004). [A]** High glucose clusters with high triglycerides and low
  HDL-C (insulin resistance / metabolic pattern); BioSense surfaces the metabolic context without
  diagnosing a syndrome. **[A]**
- **ApoB / non-HDL-C / LDL-C. [A]** Dysglycemia amplifies atherogenic risk; glucose adds a metabolic
  dimension read alongside the atherogenic markers. **[A][P20]**
- **hs-CRP (SCL-006). [A]** Inflammation and dysglycemia co-travel; complementary context. **[A]**

**Engine implication [C]:** FPG is read with HbA1c as its primary companion (discordance surfaced, never
averaged, repeat-the-discordant), and contributes to a metabolic-wellness picture with triglycerides/HDL-C
— never a diagnosis.

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **FPG categories:** normal <100, IFG 100–125, diabetes ≥126 mg/dL (confirmed). **[A][P1-P3]**
- **Hypoglycemia:** <70 mg/dL (significant <54). **[A][P4]**
- **Fasting = ≥8 hours; two abnormal tests (or one + symptoms) to diagnose.** **[A][P5][P6]**
- **FPG and HbA1c are complementary and often discordant.** **[A][P8]**
- **Prediabetes is common and often reversible with lifestyle.** **[A][P14][P15]**

## 10.2 Where they differ — and why
- **IFG lower bound.** The ADA uses 100 mg/dL; the WHO uses 110 mg/dL (6.1 mmol/L) for IFG. <cite index="52-1">the WHO defines impaired fasting glucose (IFG) as FPG 6.1–6.9 mmol/L; the NHS DPP uses a lower FPG entry threshold of 5.5 mmol/L.</cite> **[A][P2]** BioSense uses the ADA 100 mg/dL anchor and notes the variation. **[E]**
- **FPG vs HbA1c prevalence.** The two identify overlapping but different populations; FPG can
  underestimate (P9). **[A]**
- **Why:** the diabetes threshold (126/7.0) is universal; the *prediabetes* lower bound and screening
  entry points vary by body and purpose (diagnosis vs prevention programme). BioSense anchors to ADA and
  keeps prevention thresholds as context. **[A][E]**

## 10.3 Strength of evidence
- **Diabetes threshold (126): established / universal.** **[A]**
- **IFG range (100–125, ADA): established (with WHO variation).** **[A][E]**
- **Hypoglycemia flags (70/54): established.** **[A]**
- **FPG↔HbA1c discordance: strong (population studies).** **[A][P8]**
- **Modifiability: strong.** **[A][P15]**

## 10.4 Intended populations
The thresholds target general-adult screening/diagnosis. BioSense applies them as a wellness gradient to
general adults on a genuine fast, abstaining in pregnancy, under-18s, and acute illness, and never
emitting a diagnostic label.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. Fasting glucose is TWO-SIDED and DIAGNOSIS-ADJACENT:
> BioSense NEVER emits "diabetes", "prediabetes", or "impaired fasting glucose" as a user label.**

## 11.1 The interpretation bands (mg/dL; general adult, fasting ≥8h, primary prevention, untreated)

| BioSense Wellness Interpretation | Associated FPG (mg/dL) | ≈ mmol/L | Evidence anchor | Wellness meaning (no diagnostic label) |
|---|---|---|---|---|
| **Low — Flag** | < 70 | < ~3.9 | Hypoglycemia [P4] | Below the healthy range; calm safety wording + route (firmer if <54). |
| **Optimal** | 70 – 89 | ~3.9–4.9 | Within-normal, favourable [P1] | The most favourable part of the normal range. |
| **Good** | 90 – 99 | ~5.0–5.5 | Within-normal (<100) [P1] | Still in the normal range; simple habits keep it here. |
| **Above Optimal** | 100 – 109 | ~5.6–6.0 | Lower IFG range [P2] | Slightly above the wellness-desirable range; highly modifiable. *(No label.)* |
| **Elevated** | 110 – 125 | ~6.1–6.9 | Upper IFG range [P2] | Above desirable; a meaningful, modifiable opportunity; confirm on a fast. *(No label.)* |
| **Significantly Elevated** | ≥ 126 | ≥ ~7.0 | Diabetes-range pattern [P3] | Well above the typical range; calm healthcare-review applies [D]. *(No label.)* |

## 11.2 How the bands were derived — transparency [B]
- The boundaries map to the recognised ADA anchors (70 hypoglycemia; 100 and 126 the IFG and diabetes
  thresholds). BioSense splits the normal range into Optimal/Good and the IFG range into Above-Optimal/
  Elevated for a wellness gradient, **without** emitting any diagnostic label.
- **≥126** is positioned as Significantly Elevated and triggers calm healthcare-review; the pattern is
  detected, **nothing is named** (§19, consistent with SCL-002).
- **No number was averaged.** The ADA anchors are reproduced faithfully; the WHO 110 IFG variant is noted
  as context (§10.2), not merged.

## 11.3 Two-sided direction *(structural difference)* [B][D]
Unlike the lower-better lipids, fasting glucose has an **optimal band** with a **low flag** below 70 and a
**rising gradient** above 100. "Lower" is not simply "better": a value below 70 is flagged, not
celebrated. **[D][P4]**

## 11.4 Fasting requirement — [C]
These bands apply only to a genuine ≥8-hour fasting sample. A **non-fasting or unknown-fasting** value is
**not banded** here; BioSense explains a fast is needed or points to HbA1c (CAV4). **[C][P6]**

## 11.5 Diagnostic-adjacency discipline — [D]
BioSense **never** emits "diabetes," "prediabetes," or "impaired fasting glucose" as a user-facing label.
It detects the pattern, frames it as a wellness signal, routes calmly, and names nothing (consistent with
SCL-002 HbA1c). **[D][P2][P3]**

## 11.6 Population caveat [E]
Bands assume a **general adult, genuinely fasting, not pregnant, not acutely ill, not on glucose-raising
medication**. Not applied to children/adolescents, pregnancy, or acute illness (§15). The IFG lower bound
follows ADA (100); WHO uses 110 (§10.2). **[E]**

---

# 12. Interpretation Framework

Fixed deterministic order (consistent with the ENG four-state model), with a **fasting gate** and the
**two-sided** structure. **[C]**

```
1. VALIDITY   — value interpretable? (unit known; result final; glycolysis-handled) → else display-only.
2. FASTING    — genuine ≥8h fast? → if not, do NOT band on fasting bands; explain / route to HbA1c (CAV4). [P6]
3. ELIGIBILITY— may we band? (general adult, not pregnant, not acutely ill) → else abstain (§15).
4. CONFIDENCE — reducers (§13: single value, confounders, discordance) → HIGH / REDUCED.
5. BAND       — assign TWO-SIDED wellness interpretation (§11); low-flag if <70; NO diagnostic label.
6. CONTEXT    — read with HbA1c (discordance surfaced, never averaged, repeat-the-discordant); metabolic cluster.
7. NARRATIVE  — select wellness narrative (§24) + mandatory caveats (§0.8); calm review if ≥126 or <70.
```

**Core interpretive stance [B]:** fasting glucose is a modifiable, two-sided glucose-metabolic signal to
optimise and track — read on a genuine fast, alongside HbA1c, never named as a diagnosis. **[B][D]**

---

# 13. Confidence Assessment  *(adapted: fasting + confounders + discordance)*

Start HIGH; reduce to REDUCED if any reducer present; name it (CAV3). A non-fasting sample, acute illness,
or pregnancy may instead trigger the fasting gate / abstention (§12, §15). **[A]/[D]**

| Reducer | Why | Source |
|---|---|---|
| Non-fasting / unknown fasting | Fasting bands don't apply | [P6] |
| Single value, no confirmation | Snapshot; confirm on a fast | [P5,P11] |
| Acute illness / stress | Transient rise | [P13] |
| Steroid / mTOR / other hyperglycemic medication | Drug-induced rise | [P13] |
| Recent vigorous exercise / dawn-phenomenon window | Physiological shift | [P12] |
| Delayed processing / capillary vs venous | Pre-analytical effect | [P18] |
| Value near a band boundary | Small error reclassifies | [B] |
| FPG/HbA1c discordance | Markers disagree | [P8-P10] |

| Fasting-gate / abstention | Source |
|---|---|
| Non-fasting/unknown → not banded on fasting bands | [P6] |
| Pregnancy / age <18 / acute illness | [P13] |

---

# 14. Wellness Interpretation

Interpretation-by-interpretation guidance, two-sided, for a genuinely fasting sample. Wellness, not
medical; **never a diagnostic label**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal** *(70–89 mg/dL).* "Your fasting glucose is in an optimal
  wellness range — a favourable baseline for glucose metabolism. A great result to maintain." **[B]**
- **BioSense Wellness Interpretation: Good** *(90–99).* "Your fasting glucose is in the normal range.
  Simple habits — activity, limiting refined carbs — help keep it here." **[B]**
- **BioSense Wellness Interpretation: Above Optimal** *(100–109).* "Your fasting glucose is a little above
  the wellness-desirable range — and this is one of the most modifiable markers. Reducing refined carbs
  and added sugar, activity (a post-meal walk helps), and weight management all move it; HbA1c gives a
  complementary longer-term view." Constructive; **no label**. **[B]**
- **BioSense Wellness Interpretation: Elevated** *(110–125).* "Your fasting glucose is above the desirable
  range — a meaningful, modifiable opportunity. It's worth confirming on another genuine fast and reading
  it alongside your HbA1c; lifestyle changes are impactful here." Constructive + confirm; **no label**. **[B]**
- **BioSense Wellness Interpretation: Significantly Elevated** *(≥126).* "Your fasting glucose is well
  above the typical range. Alongside lifestyle steps, it would be worth discussing this result with a
  healthcare professional who can look at your full picture." Calm, non-alarming (CAV5); **no label**. **[B][D]**
- **BioSense Wellness Interpretation: Low — Flag** *(<70).* "Your fasting glucose is below the healthy
  range. Low readings are worth mentioning to a healthcare professional, especially if you feel shaky,
  sweaty, or unwell." Calm safety wording (CAV6); firmer if <54; never alarmist. **[B][D]**

**HbA1c-context modifier:** where FPG and HbA1c are **discordant**, the narrative surfaces it and suggests
repeating the out-of-step test, without averaging the two (CAV7, S11). **[D][P10]**

Every interpretation pairs the reading with a lifestyle lever (§17) and the mandatory caveats (§0.8).
**None names diabetes, prediabetes, or IFG.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains from banding** where its bands don't apply or the value can't be trusted. **[C]/[D]/[E]**

- **15.1 Non-fasting / unknown fasting.** Not banded on the fasting bands; explain a fast is needed or
  point to HbA1c (CAV4). **[D][P6]**
- **15.2 Children & adolescents.** Adult bands not applied; display, suggest professional interpretation. **[D]**
- **15.3 Pregnancy.** Glucose handling changes and pregnancy uses specific diagnostic pathways; BioSense
  does not band, notes this, defers to a professional. **[D]**
- **15.4 Acute illness / stress / glucose-raising medication.** Transient elevation; abstain or reduced
  confidence with a re-check-when-well suggestion. **[D][P13]**
- **15.5 Low flag (<70 / <54).** Calm safety wording + route; never alarmist; never penalised as
  "failure" (S4). **[D][P4]**
- **15.6 On glucose-lowering therapy.** Band framed as reflecting current management; never implies
  changing treatment (S6). **[D]**

**Abstention is a first-class, non-error output**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **What counts as a real change. [A][E]** Fasting glucose varies day-to-day and with confounders; a
  change is framed as meaningful only beyond that variation and with consistent fasting. **[P11]**
- **Fasting-consistency matters. [A]** Comparing a fasting to a non-fasting value creates a false change;
  BioSense compares like with like. **[P6]**
- **Read trends with HbA1c. [A]** A fasting-glucose trend is interpreted alongside the HbA1c trend; a
  divergence is surfaced, not averaged. **[P8]**
- **Direction & framing. [B]** Movement into the optimal band is encouraged; upward movement is a calm,
  modifiable prompt; a low flag is a calm safety note, not celebrated (two-sided, §11.3).
- **Confounded/abstained points. [C]** Non-fasting, acute-illness, or medication-affected points are
  tagged and excluded from trend so they don't create a false signal.

---

# 17. Lifestyle Optimisation Guidance

Lifestyle is the first tier, and fasting glucose is among the most modifiable markers. **[A]/[B]**

## 17.1 Nutrition [A][P15]
- **Reduce refined carbohydrate and added sugar** — the strongest dietary lever on glucose. **Strong.** **[A]**
- **Fibre, whole foods, balanced meals** blunt glucose excursions. **[A]**

## 17.2 Physical activity [A][P15]
Regular activity improves insulin sensitivity; a short **post-meal walk** measurably lowers glucose
excursions. **Strong evidence.** **[A]**

## 17.3 Weight, sleep, stress [A][P15]
Weight management, good sleep, and stress reduction all support healthier fasting glucose. **[A]**

## 17.4 Framing rules [B][D]
Lifestyle first; medication never suggested. Honest, encouraging framing: fasting glucose and prediabetes
patterns are often **reversible** with sustained lifestyle change — one of the most motivating facts in
metabolic wellness — while never naming a condition.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain the band and what fasting glucose is, in warm wellness language; connect to
lifestyle levers; explain the fasting requirement and the HbA1c relationship; reassure within the optimal
band; express abstention and low-flag routing respectfully.

The AI layer **must never**:
- emit "diabetes", "prediabetes", or "impaired fasting glucose" as a label — even to deny one (S1)
- state or imply any diagnosis or condition
- produce a numeric diabetes-risk % from FPG (S5)
- interpret a non-fasting/unknown-fasting value on the fasting bands (S7)
- present a low value (<70) alarmingly, or a low value as "better" (S4, S12)
- average FPG and HbA1c, or resolve a discordance rather than surfacing it (S11)
- recommend starting/stopping/changing medication (S6)
- present a BioSense band as a medical/diagnostic boundary (S10)
- infer fasting status, pregnancy, medication, or a diagnosis from the value

Enforcement is by output validation on rendered text, not by prompt alone. Emitting a diabetes/prediabetes
label is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; no label.** Every output carries CAV1; ≥126 is handled by *routing*, never by naming
  diabetes or prediabetes (S1, S3). **[D][P3]**
- **Two-sided safety.** A low flag (<70; firmer <54) gets calm safety wording and routing, never alarm
  (S4). **[D][P4]**
- **Fasting honesty.** A non-fasting value is not scored on the fasting bands; BioSense says so and can
  point to HbA1c (S7, CAV4). **[D][P6]**
- **One marker among several.** CAV2 frames FPG as one glucose marker, read with HbA1c (S2). **[D]**
- **No medication guidance.** Medication questions → educational context + referral (S6, S8). **[D]**
- **No alarm.** Even the highest band uses calm, constructive language (CAV5). **[D]**
- **Correct unit factor.** The engine applies the glucose factor (18.0), not a lipid factor (S? — §7). **[D]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. Fasting glucose is **Significantly Elevated (≥126 mg/dL)** — CAV5; pattern detected, nothing named. **[P3]**
2. Fasting glucose is **Low (<70; firmer <54 mg/dL)** — CAV6 calm safety routing. **[P4]**
3. **FPG and HbA1c are discordant** — repeating the out-of-step test benefits from professional input. **[P10]**
4. Fasting glucose is **Elevated (110–125)** and clusters with other signals (high TG, low HDL-C) —
   metabolic context worth review. **[P20]**
5. The user is in an **abstention population** (child/adolescent, pregnancy) or is acutely ill. 
6. The user **asks a medical or medication question** (S8).

All suggestions are wellness-framed, non-urgent, non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-009 plugs into the existing platform (no architecture change): **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for fasting glucose, plus fasting
  status, and available HbA1c/triglycerides/HDL-C for context.
- **Supplies (as CSL bindings):** the two-sided wellness bands (Category B), the ADA anchors (Category A),
  the no-diagnostic-label rule, the fasting gate, the hypoglycemia low-flag, the FPG↔HbA1c discordance
  handling, confidence reducers, safety rules, lifestyle evidence, and narrative templates — each with
  value + source-ID + category + version.
- **Respects:** every ENG platform invariant; the SCL-002 diagnostic-adjacency discipline; the cross-marker
  discipline (FPG/HbA1c surfaced, never averaged).
- **Uses the correct unit factor** (18.0) — a per-analyte configuration, not a lipid factor.
- **Score contribution:** fasting glucose contributes to the glucose-metabolic-wellness domain as a
  **two-sided** input (optimal band; low-flag; high gradient); non-fasting/abstained values do not
  contribute; discordance with HbA1c is surfaced. Any weighting is a Category [C] product decision. **[C]**

---

# 22. Medication Context (educational only)

Educational context only; BioSense does not instruct on medication (S6). **[D]**
- Glucose-lowering medications exist and are prescribed/adjusted by clinicians on the full picture; a
  person's fasting glucose on treatment reflects that management. The ADA fasting **treatment target**
  (80–130 mg/dL for people with diabetes) is an individualised clinical target, **not** a BioSense wellness
  band. **[A][P17]**
- Any medication question → educational context + suggestion to speak with a healthcare professional. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **IFG lower bound varies (ADA 100 vs WHO 110). [E]** BioSense uses the ADA 100 anchor and notes the
   variation; the Above-Optimal band spans the difference. **[P2]**
2. **Single-snapshot variability. [E]** Fasting glucose varies day-to-day and with confounders; confirmed
   and HbA1c-contextualised values are more reliable. **[P11]**
3. **FPG can lag. [E]** A normal FPG does not exclude early dysglycemia; read with HbA1c. **[P16]**
4. **FPG↔HbA1c discordance is common. [E]** Surfaced and repeat-tested, never averaged. **[P8]**
5. **Optimal sub-banding (70–89 / 90–99) is a BioSense wellness choice. [E][C]** Within the single ADA
   "normal <100," offered as a gradient, not a guideline distinction.

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnostic
label**; two-sided). **[B]/[D]** (Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL
"Your fasting glucose is {value} mg/dL ({mmol} mmol/L) — in an optimal wellness range, a favourable
 baseline for glucose metabolism. A wonderful result to maintain."  +CAV1 +CAV2

TEMPLATE: GOOD
"Your fasting glucose is {value} mg/dL ({mmol} mmol/L) — in the normal range. Activity and limiting refined
 carbs help keep it here."  +CAV1 +CAV2

TEMPLATE: ABOVE_OPTIMAL  (100–109)
"Your fasting glucose is {value} mg/dL ({mmol} mmol/L) — a little above the wellness-desirable range, and
 one of the most modifiable markers. Reducing refined carbs and added sugar, a post-meal walk, and weight
 management all help; your HbA1c adds a longer-term view."  +CAV1 +CAV2   (NO label)

TEMPLATE: ELEVATED  (110–125)
"Your fasting glucose is {value} mg/dL ({mmol} mmol/L) — above the desirable range and a meaningful,
 modifiable opportunity. It's worth confirming on another genuine fast and reading it alongside your HbA1c;
 lifestyle changes are impactful here."  +CAV1 +CAV2 +CAV3(confirm)   (NO label)

TEMPLATE: SIGNIFICANTLY_ELEVATED  (≥126)
"Your fasting glucose is {value} mg/dL ({mmol} mmol/L) — well above the typical range. Alongside lifestyle
 steps, it would be worth discussing this result with a healthcare professional who can look at your full
 picture."  +CAV1 +CAV2 +CAV5   (NO "diabetes" label — S1)

TEMPLATE: LOW_FLAG  (<70; firmer <54)
"Your fasting glucose is {value} mg/dL ({mmol} mmol/L) — below the healthy range. Low readings are worth
 mentioning to a healthcare professional, especially if you feel shaky, sweaty, or unwell."  +CAV1 +CAV6
 (<54: firmer calm routing)

MODIFIER: NON_FASTING / UNKNOWN_FAST →
 "This doesn't look like a fasting sample, so we're not scoring it on the fasting-glucose scale. An 8-hour
  fast gives a clearer reading — or HbA1c, which doesn't need fasting, may be a better view."  +CAV1 +CAV4

MODIFIER: FPG_HBA1C_DISCORDANCE →
 "Your fasting glucose and HbA1c don't fully agree. Repeating the out-of-step test is usually more useful
  than relying on either alone."  +CAV7

MODIFIER: CONFOUNDER (illness/stress/medication) → append CAV3 (temporary cause; re-check when well).
```

**Absolute rules:** no template emits "diabetes", "prediabetes", or "impaired fasting glucose", presents a
low value as better, averages FPG and HbA1c, or presents a band as a diagnosis. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, fasting confirmed. [illustrative]**
```
Input: FPG 84 mg/dL, fasting 10h, adult, no confounders.
Band: OPTIMAL | Confidence: HIGH | Abstained: false
Narrative: OPTIMAL +CAV1+CAV2 ; Rec: Tier 1 maintain.
```

**Example 2 — Above Optimal, single value. [illustrative]**
```
Input: FPG 104 mg/dL, fasting, single reading, adult.
Band: ABOVE_OPTIMAL | Confidence: REDUCED (single value) | NO label
Narrative: ABOVE_OPTIMAL +CAV1+CAV2+CAV3 ; Rec: Tier 1 lifestyle; confirm on a fast; read with HbA1c.
```

**Example 3 — Significantly elevated. [illustrative]**
```
Input: FPG 138 mg/dL, fasting, adult.
Band: SIGNIFICANTLY_ELEVATED | Confidence: HIGH | NO "diabetes" label
Narrative: SIGNIFICANTLY_ELEVATED +CAV1+CAV2+CAV5 (calm review). Pattern detected; nothing named.  [S1,S3]
```

**Example 4 — Low flag. [illustrative]**
```
Input: FPG 63 mg/dL, fasting, adult.
Band: LOW_FLAG | Narrative: LOW_FLAG +CAV1+CAV6 (calm safety routing; not alarmist).  [S4]
```

**Example 5 — Non-fasting. [illustrative]**
```
Input: glucose 118 mg/dL, non-fasting (ate 1h ago), adult.
Band: (none) — not banded on fasting bands | Narrative: NON_FASTING modifier +CAV1+CAV4 (fast or HbA1c).  [S7]
```

**Example 6 — FPG/HbA1c discordance. [illustrative]**
```
Input: FPG 98 mg/dL (Good) but HbA1c 6.2% (SCL-002 Elevated).
Band: GOOD (FPG) | Discordance: true → surface, repeat discordant, never average.
Narrative: GOOD + FPG_HBA1C_DISCORDANCE (CAV7).  [S11]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, diagnostic-adjacency discipline, cross-marker discipline, PI-4 rendering,
  governance).
- **SCL-002 (HbA1c)** — the complementary glucose marker and the source of the diagnostic-adjacency
  discipline (never emit a diagnostic label); FPG/HbA1c discordance surfaced, never averaged.
- **SCL-005 (Triglycerides), SCL-004 (HDL-C)** — metabolic-cluster context (insulin resistance pattern).
- **SCL-001/003/007 (ApoB/LDL-C/non-HDL-C), SCL-006 (hs-CRP)** — dysglycemia amplifies atherogenic and
  inflammatory context.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§0 Implementation Summary** — developer-facing activation values.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the P-series IDs in §0
> and the body. Developers finalising the pack should confirm exact page/table locators against the primary
> PDFs where required.

**Guidelines & thresholds (Category A anchors)**

1. American Diabetes Association. **2. Diagnosis and Classification of Diabetes: Standards of Care in
   Diabetes—2026.** *Diabetes Care* 2026;49(Suppl 1):S27–S49. — *IFG 100–125 mg/dL (5.6–6.9 mmol/L); IGT
   140–199; diabetes FPG ≥126 (7.0); confounders (steroids/mTOR) (P1–P3, P13, P19).*
2. American Diabetes Association Standards of Care — hypoglycemia classification. — *Level 1 <70 mg/dL
   (3.9 mmol/L); Level 2 <54 mg/dL (3.0 mmol/L) (P4).*
3. Cleveland Clinic (prediabetes; fasting requirement); Dexcom; Diabetes Self-Management; Eureka Health;
   HealthMatters. — *Normal <100; IFG 100–125; diabetes ≥126; hypoglycemia <70; 8-hour fast; two abnormal
   tests; treatment target 80–130; unit factor 0.0555 (P1–P7, P14, P17).*

**FPG↔HbA1c relationship & discordance (Category A/P)**

4. Nguyen TT, et al. **Discordance in the diagnosis of diabetes: HbA1c vs FPG.** *PLOS One*
   2017;12(8):e0182192 (PMC5560685). — *Kappa ≈ 0.55; FPG underestimates vs HbA1c; most discordance in the
   prediabetes group (P8, P9).*
5. Bolt Pharmacy UK clinical guide (NICE-aligned); ScienceDirect S016882271830473X. — *FPG–HbA1c
   correlation (PCC 0.68–0.80); repeat the discordant test rather than auto-diagnose; WHO IFG 6.1–6.9 mmol/L
   (P8, P10, §10.2).*

**Physiology, limitations, modifiability (Category A/G)**

6. Liv Hospital diabetes-criteria summaries. — *Dawn phenomenon; ADA diagnostic criteria (P12).*
7. USPTO 12320798 / 12427161 (ADA-cited). — *IFG/IGT associated with CVD risk; FPG changes late; OGTT/IGT
   context (P16, P19, P20).*
8. Cleveland Clinic prediabetes; ADA Diabetes Prevention Program context; HealthMatters. — *Prediabetes
   common (~1 in 3 US adults) and often reversible; lifestyle lowers FPG (P14, P15).*
9. PMC5560685 (methods); lab standardisation literature. — *Hexokinase/enzymatic measurement; in-tube
   glycolysis pre-analytical effect (P18).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–3; they are
> BioSense Version 1 classifications, two-sided and fasting-dependent, not attributable to any single
> reference as a diagnostic threshold, and **do not restate diagnostic labels.**

---

# 28. Founder Decisions Required

The core fasting-glucose methodology (two-sided ADA-anchored bands; no-diagnostic-label discipline; fasting
gate; hypoglycemia low-flag; FPG↔HbA1c discordance handling) follows directly from the evidence and the
established platform posture (mirroring SCL-002). Two optional presentation/policy items remain: **[C][E]**

**D-1 — Confirm the two-sided band boundaries**, in particular the Optimal/Good split within normal
(70–89 / 90–99) and the Above-Optimal/Elevated split within IFG (100–109 / 110–125). Confirmation requested
that these wellness sub-bands (within the single ADA categories) are the intended gradient. **Founder
sign-off requested.**

**D-2 — Confirm the non-fasting handling.** SCL-009 does not band a non-fasting value on the fasting bands
and points to HbA1c. **Founder decision requested** on whether a non-fasting glucose should be shown with
any (clearly separate, non-diagnostic) context band or held entirely for HbA1c.

*(Both affect presentation/handling, not the underlying evidence.)*

---

**END OF SCL-009 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline
figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was fabricated;
every Category [A] number was retrieved and verified during authoring and traces to §27. The
diagnostic-adjacency discipline (never emit a diabetes/prediabetes/IFG label), the two-sided range with a
hypoglycemia low-flag, the fasting-requirement gate, the glucose-specific unit factor, and the FPG↔HbA1c
discordance handling were adapted to fasting glucose's genuine structural differences; all other structure
follows SCL-001 exactly and remains consistent with SCL-001 through SCL-008 (and the SCL-002 diagnostic-
adjacency discipline).*
