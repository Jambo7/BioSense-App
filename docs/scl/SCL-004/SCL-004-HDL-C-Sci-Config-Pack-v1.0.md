# SCL-004 — HDL CHOLESTEROL (HDL-C)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology

**Document ID:** SCL-004
**Biomarker:** HDL Cholesterol (HDL-C; high-density lipoprotein cholesterol)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Structure preserved; only the sections requiring genuine structural difference were adapted.

---

> **What this document is.** SCL-004 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for HDL-C. It does not redesign
> the Constitution, the ENG documents, the Blood Analysis Engine, or the SCL architecture.
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

## STRUCTURAL-FIT NOTE (HDL-C vs SCL-001)

The overall structure, section order, content-classification scheme (A–E), confidence model,
safety posture, recommendation-ladder shape, narrative-contract approach, governance, and
cross-marker discipline were **preserved exactly**. Four areas required genuine adaptation and
only these were changed:

1. **Direction is non-monotonic / U-shaped (§11, §14) — the defining difference.** Unlike ApoB
   and LDL-C (lower-better), and unlike a naïve "higher-better," HDL-C carries signal at *both*
   ends: low HDL-C is unfavourable, and *very high* HDL-C is associated with higher mortality.
   Banding is therefore a favourable-*range* model with an upper-end flag.
2. **Sex-specificity (§11, §13, §15) — new.** Recognised thresholds differ by sex; sex is an
   interpretation input.
3. **Marker-not-target framing (§3, §4, §18, §19, §22) — critical safety adaptation.** The
   evidence shows that *raising* HDL-C pharmacologically does not reduce cardiovascular risk, and
   genetically raised HDL-C does not lower risk. BioSense therefore treats HDL-C as a contextual
   wellness marker and **never implies that raising HDL-C will lower risk.**
4. **Acute-phase behaviour (§8, §13) — new confidence reducer.** HDL-C falls during inflammation
   and acute illness, independent of baseline.

---

## CONTENT CLASSIFICATION KEY

- **[A]** Source-derived fact / recognised threshold.
- **[B]** BioSense Version 1 wellness interpretation (labelled).
- **[C]** Product-policy decision.
- **[D]** Safety / healthcare-review wording.
- **[E]** Area of uncertainty.

---

# SCIENTIFIC POSITION STATEMENT

BioSense is a premium wellness and preventative health-intelligence platform. It is not a
medical device. It does not diagnose disease, and it does not replace healthcare professionals.

HDL-C is often called "good cholesterol," and BioSense deliberately handles that popular framing
with care. The science has moved on: HDL-C is a useful *marker* of cardiovascular wellness, but
it is not a simple "higher is better" number, and interventions that raise HDL-C have not been
shown to reduce cardiovascular risk. BioSense therefore interprets HDL-C as informative context —
favourable within a healthy range, worth attention when low, and worth a neutral mention when
unusually high — without ever telling a user to "raise their HDL" to lower risk.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not
diagnostic criteria.** Every BioSense interpretation is version controlled, transparent, and
designed to evolve as the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate HDL-C. Every value carries a source ID (D-series → §27) and
> a category tag. Canonical unit: mg/dL (store mmol/L in parallel). **HDL-C is non-monotonic and
> sex-aware.**

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: mg/dL          # store mmol/L parallel
mg/dL = mmol/L × 38.67 ; mmol/L = mg/dL ÷ 38.67                                 [D13]
Always retain value_reported + unit_reported. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors D1–D6)
```
HDLC_WELLNESS_INTERPRETATION (mg/dL) — NON-MONOTONIC, SEX-AWARE, primary prevention, untreated:

  MALE:
    BELOW_OPTIMAL        < 40            # ATP III low-HDL (men) [D1]
    FAVOURABLE           40 – 59         # within/above reference; ≥40 out of low range [D1][D5]
    OPTIMAL_REFERENCE    60 – 80         # ≥60 protective anchor [D3]; within low-mortality band [D5]
    HIGH_MONITOR         81 – 90         # above reference; upper-end caution begins [D4]
    VERY_HIGH_FLAG       > 90            # very high; neutral flag, not "better" [D4][D6]

  FEMALE:
    BELOW_OPTIMAL        < 50            # ATP III low-HDL (women) [D2]
    FAVOURABLE           50 – 59         # out of low range [D2]
    OPTIMAL_REFERENCE    60 – 90         # ≥60 protective anchor [D3]; wider female reference [D6]
    HIGH_MONITOR         91 – 110        # above reference; upper-end caution begins [D6]
    VERY_HIGH_FLAG       > 110           # very high; neutral flag, not "better" [D6]

  UNKNOWN_SEX: use MALE thresholds as the more conservative low-end, tag sex_assumed, reduce confidence. [C]

DIRECTION: NON_MONOTONIC (favourable-range with low-end and high-end signal). NOT lower-better,
NOT simply higher-better.  [B][D4]
mmol/L parallels: 40≈1.0 | 50≈1.3 | 60≈1.55 | 80≈2.07 | 90≈2.33 | 110≈2.85
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. [B][D]**

## 0.3 Context / eligibility logic — [A]+[C]
```
DEFAULT = general adult, sex-aware, primary prevention, untreated.             [C: B2]
sex REQUIRED for correct banding; if unknown → MALE thresholds + sex_assumed + reduced confidence. [C]
ABSTAIN from banding (display value only) if: age<18 | pregnancy | acute illness/inflammation
  present (value may be transiently low) → explain, route if needed.           [D][D17]
IF on lipid-modifying therapy: frame as reflecting current management; never imply raising HDL-C. [D]
NEVER infer sex, pregnancy, illness, or therapy from the HDL-C value itself.    [D]
```

## 0.4 Confidence reducers — [A]/[D]
```
sex_unknown (sex_assumed) [C] | acute_illness_or_inflammation [D17] | non_fasting (minor) [D12] |
recent_major_diet/weight_change | on_lipid_therapy | high_triglycerides (assay/context) |
method_change_between_tests | value_near_a_band_boundary | single_value_no_prior
```

## 0.5 Deterministic safety & suppression rules — [D]
```
S1  HDL-C is NOT a diagnosis. Never state/imply disease.
S2  HDL-C is ONE contextual marker of cardiovascular wellness, never a risk score.
S3  NEVER imply that raising HDL-C will lower cardiovascular risk. Raising HDL-C has not been
    shown to reduce risk; HDL-C is a marker, not a validated target.            [D][D9][D10]
S4  VERY_HIGH_FLAG → neutral "worth mentioning" wording; NOT celebrated, NOT alarmed; no cause named. [D][D4]
S5  BELOW_OPTIMAL → constructive wellness framing (habits that associate with healthier HDL-C),
    without promising risk reduction from raising it (S3).                      [D]
S6  Never recommend starting/stopping/changing medication.
S7  Never produce a numeric cardiovascular risk % from HDL-C.
S8  Never suggest alcohol as a way to raise HDL-C (raises HDL-C but not recommended for it). [D][D16]
S9  Suppress interpretation during acute illness/inflammation or when sex is required-but-unusable. [D]
S10 Never present a BioSense band as a medical/diagnostic boundary.
S11 On any medication/therapy question → educational context + refer.
S12 Read HDL-C in lipid context (with ApoB/LDL-C/non-HDL-C); never in isolation as "good/bad." [D]
```

## 0.6 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 LIFESTYLE (associated with healthier HDL-C, framed WITHOUT risk-reduction promise, S3):
   regular aerobic activity; not smoking / smoking cessation; healthy weight; reduce refined
   carbohydrate; unsaturated fats.                                             [D16]
   (Do NOT suggest alcohol — S8.)
Tier 2 CONTEXT / TRACK: interpret alongside ApoB, LDL-C, non-HDL-C, triglycerides; track over time. [D14][S12]
Tier 3 HEALTHCARE DISCUSSION (calm) when: BELOW_OPTIMAL with metabolic clustering | VERY_HIGH_FLAG |
   acute-illness abstention | medical question.                               [D]
NEVER a medication instruction at any tier. NEVER a "raise your HDL to cut risk" message (S3).
```

## 0.7 Narrative selection rules — [B]/[D]
```
band → template (sex-aware); modulated by confidence + context.
FAVOURABLE / OPTIMAL_REFERENCE → affirming, maintain.
BELOW_OPTIMAL                  → constructive habits framing (no risk-reduction promise, S3).
HIGH_MONITOR                   → neutral, "in context" framing.
VERY_HIGH_FLAG                 → neutral "worth mentioning", not celebrated (S4).
acute-illness / sex-unusable   → abstain; explain; route if needed.
Never "good/bad cholesterol" as a verdict; never "raise your HDL to lower risk" (S3); never diagnosis.
```

## 0.8 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "HDL-C is one of several markers, best read alongside your other lipids."
CAV3 (reduced confidence) name reducer(s) — e.g. sex not specified, recent illness.
CAV4 (marker-not-target) "HDL-C is a marker; raising it hasn't been shown to lower risk on its own."
CAV5 (very high) "Unusually high HDL-C is worth mentioning to a healthcare professional."
CAV6 (acute illness) "Recent illness can temporarily lower HDL-C; a steady-state re-check is better."
```

## 0.9 Source & version identifiers
```
config_id: SCL-004   config_version: 1.0
band_set_id: BIOSENSE_HDLC_WELLNESS_BANDS_v1     (Category B; sex-aware, U-shaped; anchors D1-D6)
direction_model_id: SCL004_NONMONOTONIC_v1       (D4)
marker_not_target_id: SCL004_MARKER_NOT_TARGET_v1 (D9,D10,D11) — safety-critical
guideline_anchors_id: NCEP_ATP_III_HDL           (D1-D3)
lifestyle_evidence_id: SCL004_LIFESTYLE_v1        (D16)
safety_rules_id: SCL004_SAFETY_v1                (S1-S12)
Every row carries its D-source + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

HDL cholesterol (HDL-C) is the amount of cholesterol carried inside high-density lipoprotein
particles. **[A]** HDL particles participate in "reverse cholesterol transport" — carrying
cholesterol away from tissues back toward the liver — which is the biological basis for HDL-C's
long-standing reputation as "good cholesterol." **[A]**

That reputation needs careful handling, and BioSense provides it. HDL-C is a genuine and useful
marker: within a healthy range it is associated with favourable cardiovascular wellness. But it is
**not** a simple "more is better" number — very high HDL-C is associated with *higher* mortality,
not lower — and, importantly, raising HDL-C through medication has not reduced cardiovascular risk
in trials. BioSense therefore treats HDL-C as informative context, not a target to maximise. **[A]**

- **Official name:** High-density lipoprotein cholesterol
- **Common abbreviation:** HDL-C
- **Reported in:** mg/dL and mmol/L **[A]**
- **Direction:** non-monotonic (favourable within a range) **[A][D4]**
- **BioSense role:** A contextual cardiovascular-wellness marker, read alongside ApoB, LDL-C, and non-HDL-C.

---

# 2. Physiological Function

HDL particles collect excess cholesterol from cells and other lipoproteins and transport it toward
the liver for recycling or excretion — reverse cholesterol transport. **[A]** HDL also has
antioxidant and anti-inflammatory properties. These *functions* are thought to underlie whatever
protective role HDL plays. **[A]**

Two points shape interpretation **[A]**:
- **HDL-C measures cholesterol content, not HDL function.** Modern research emphasises that HDL
  *function* (e.g. cholesterol efflux capacity) matters more than the HDL-C concentration, and that
  HDL-C is a "crude" proxy for it. <cite index="51-1">these are crude measures and do not directly reflect the quality and function of HDL, including RCT efficiency, inflammation, redox conditions, or the proteomic cargo of HDL.</cite> **[A][D11]**
- **HDL-C is influenced by lifestyle, sex, and acute illness.** It differs by sex, falls during
  inflammation, and is associated with activity, body composition, and smoking status. **[A]**

---

# 3. Scientific Background

For decades, low HDL-C was recognised as associated with higher coronary risk — the Framingham
study found each 1% higher HDL corresponded to roughly a 2% lower coronary-event rate. **[A][D7]**
Observational data continue to show that higher HDL-C associates with lower coronary risk across the
usual range (about 15 mg/dL higher HDL-C ≈ 22% lower coronary risk). <cite index="50-1">Observational studies indicate that ∼15 mg/dl (0.4 mmol/l) higher HDL-C is associated with 22% lower CHD risk.</cite> **[A][D8]**

But two more recent bodies of evidence reshaped the picture, and they are central to how BioSense
frames HDL-C:

- **Raising HDL-C does not reduce risk.** Multiple drug classes (CETP inhibitors, niacin) raised
  HDL-C substantially without reducing cardiovascular events. <cite index="46-1">Decreased high-density lipoprotein (HDL) cholesterol levels constitute a major risk factor for coronary heart disease; however, there are no therapies that substantially raise HDL cholesterol levels.</cite> Mendelian-randomisation studies show genetically higher HDL-C does not lower heart-attack risk. <cite index="51-1">Mendelian randomization showed that variability at CETP and EL genes which raise HDL-C does not appear to reduce the risk of myocardial infarctions.</cite> **[A][D9][D10]**
- **Very high HDL-C is associated with higher mortality (U-shaped).** <cite index="41-1">Very high HDL-C levels (>80 mg/dL) were associated with increased risk of all-cause death (hazard ratio [HR], 1.96; 95% CI, 1.42-2.71) and cardiovascular death (HR, 1.71) compared with those with HDL-C levels in the range of 40 to 60 mg/dL.</cite> **[A][D4]**

**The wellness reading — [B]:** HDL-C is a helpful *marker* to understand, favourable within a
healthy range, but not a dial to turn up. BioSense frames it as context, never as a target, and
never implies that raising it will lower risk.

**An honest boundary — [E]:** the U-shaped mortality signal comes from observational cohorts and may
be partly confounded; BioSense uses it only to handle the upper end *neutrally and cautiously*, not
to claim that high HDL-C is harmful. **[E][D4]**

---

# 4. Why HDL-C Matters

**1. It is a well-established context marker. [A]** Low HDL-C is a recognised component of the
overall cardiovascular-wellness and metabolic picture (e.g. metabolic syndrome). **[A][D15]**

**2. It sharpens the lipid picture. [A]** HDL-C is needed to compute non-HDL-C and to interpret the
whole panel alongside ApoB and LDL-C. **[A][D14]**

**3. It corrects a common misconception. [A][B]** Because "good cholesterol" invites a "maximise it"
mindset that the evidence does not support, BioSense adds genuine value by framing HDL-C correctly —
favourable in range, not better without limit, and not a treatment target. **[A][D9]**

**Why BioSense measures it — [C]:** HDL-C is a standard, widely available lipid-panel component that
enriches the metabolic picture. BioSense's role is to interpret it accurately and calmly, avoiding
both false reassurance and the "raise it" fallacy.

---

# 5. Laboratory Measurement

HDL-C is measured directly using automated homogeneous assays on a standard lipid panel. **[A]**

- **Directly measured**, not calculated (unlike LDL-C). **[A]**
- **Fasting not required for HDL-C** — total cholesterol and HDL-C are usable non-fasting. <cite index="39-1">If the testing opportunity is nonfasting, only the values for total cholesterol and HDL cholesterol will be usable.</cite> **[A][D12]**
- **Standardised**, broadly comparable between laboratories, though method differences and very high
  triglycerides can affect some assays. **[A]**

---

# 6. Units

- **mg/dL** — standard in the US. **BioSense canonical unit.** **[A/C]**
- **mmol/L** — standard in much of the world. **[A]**
- Conversion: **mg/dL = mmol/L × 38.67.** **[A][D13]**

BioSense stores the reported value/unit unchanged and computes the parallel unit. **[C]**

---

# 7. Unit Conversion

```
mg/dL  = mmol/L × 38.67
mmol/L = mg/dL ÷ 38.67
```
Worked checks: 40 mg/dL ≈ 1.03 mmol/L; 60 mg/dL ≈ 1.55 mmol/L; 90 mg/dL ≈ 2.33 mmol/L. **[A]**

**Safety rule [D]:** BioSense never infers a unit from magnitude alone; the reported unit is always
retained; a missing unit means the value is displayed but not interpreted.

---

# 8. Measurement Limitations & Biological Variability  *(adapted: acute-phase + sex)*

- **Acute-phase behaviour. [A][E]** HDL-C falls during inflammation, infection, and acute illness,
  independent of a person's usual level. A value drawn during illness may understate the steady-state
  HDL-C; BioSense treats known acute illness/inflammation as an abstention or confidence reducer
  (§13, §15). **[A][D17]**
- **Sex differences. [A]** HDL-C distributions differ by sex, so interpretation is sex-aware (§11). **[A][D1][D2]**
- **Biological variation. [A]** Single values vary; small differences between tests may be noise. **[A]**
- **HDL-C ≠ HDL function. [A][E]** HDL-C does not capture HDL functional quality, which modern
  research considers more important; BioSense frames HDL-C as a proxy, not the whole story. **[A][D11]**
- **Assay/triglyceride effects. [A]** Very high triglycerides and method differences can affect some
  HDL-C assays; a method change is a trend caveat. **[A]**

**How BioSense uses this — [C][D]:** known acute illness/inflammation → abstain or reduce confidence
with a steady-state re-check suggestion (CAV6); sex-unknown → conservative thresholds + reduced
confidence; HDL-C always read in lipid context, never as a standalone "good/bad" verdict (S12).

---

# 9. Relationships With Other Biomarkers

- **Non-HDL-C. [A]** Non-HDL-C = total cholesterol − HDL-C; HDL-C is a direct input to this
  atherogenic-burden marker. **[A][D14]**
- **ApoB & LDL-C (SCL-001, SCL-003). [A]** HDL-C is *not* atherogenic; it provides context to the
  atherogenic markers. BioSense reads HDL-C alongside ApoB/LDL-C and never treats a high HDL-C as
  offsetting an elevated ApoB or LDL-C (S12). **[A]**
- **Triglycerides. [A]** Low HDL-C commonly co-occurs with high triglycerides and insulin
  resistance; the two together are more informative than either alone (metabolic clustering). **[A][D15]**
- **Total cholesterol. [A]** HDL-C is a component; a high total cholesterol driven by high HDL-C is a
  different picture from one driven by high LDL-C. **[A]**

**Engine implication [C]:** HDL-C enriches the metabolic/lipid picture; it is never used to cancel or
average against atherogenic markers, and low HDL-C with high triglycerides is surfaced as a metabolic
context signal (never a diagnosis).

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Low HDL-C is unfavourable.** ATP III defines low HDL-C categorically as <40 mg/dL (men) and
  treats <50 mg/dL (women) as low within metabolic-syndrome criteria; ≥60 mg/dL is a "negative"
  (protective) risk factor. <cite index="38-1">The United States National Cholesterol Education Program Adult Treatment Panel III guidelines describe a high-risk HDL cholesterol level as below 40 mg/dL (in men; less than 50 mg/dL in women), and a protective (negative risk) factor with levels above 60 mg/dL.</cite> **[A][D1][D2][D3]**
- **Higher HDL-C associates with lower coronary risk across the usual range** (observational). **[A][D7][D8]**
- **Raising HDL-C has not reduced cardiovascular events**, across CETP inhibitors and niacin, and
  genetically raised HDL-C does not lower risk. **[A][D9][D10]**
- **Very high HDL-C is associated with higher mortality (U-shaped).** **[A][D4]**
- **HDL function matters more than HDL-C quantity;** HDL-C is a crude proxy. **[A][D11]**

## 10.2 Where they differ — and why
- **The upper-end thresholds are not standardised.** The low-HDL cut-points (40/50) are well
  established; the *upper* threshold at which HDL-C becomes concerning is not fixed. Cohorts variously
  identify >80 mg/dL (mortality signal) or sex-specific "extremely high" points (e.g. >90 mg/dL men,
  >130 mg/dL women). <cite index="40-1">emphasizing sex-specific HDL-C references for males (optimal: 40–70 mg/dL, extremely high: >90 mg/dL) and females (optimal: 50–110 mg/dL, extremely high: >130 mg/dL).</cite> **[A][D4][D6]**
- **Why:** the low end has decades of consistent guideline treatment; the upper-end paradox is
  recent, observational, and sex-dependent, so no single guideline threshold exists yet. BioSense
  therefore treats the upper end as a *neutral flag*, not a hard boundary. **[A][E]**

## 10.3 Strength of evidence
- **Low-HDL thresholds (40/50): established / guideline.** **[A]**
- **≥60 protective anchor: established / guideline.** **[A]**
- **U-shaped upper-end mortality signal: emerging, consistent across several cohorts, observational.** **[A][E]**
- **HDL-C not a treatment target: strong (RCTs + Mendelian randomisation).** **[A][D9][D10]**
- **Upper-end thresholds: not standardised; sex-dependent.** **[E]**

## 10.4 Intended populations
Guideline low-HDL thresholds target general-adult risk assessment (sex-specific). The upper-end
signal derives from general and CAD cohorts. BioSense's sex-aware bands (§11) use the established low
anchors and the ≥60 protective anchor, with a cautious, non-standardised upper flag.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic
> boundaries, NOT medical cut-offs, and NOT universal truth. HDL-C is NON-MONOTONIC and SEX-AWARE:
> low is unfavourable, a healthy range is favourable, and very high is a neutral flag — never a
> "maximise it" target.**

## 11.1 The interpretation bands (mg/dL; general adult, sex-aware, primary prevention, untreated)

Each row states a **BioSense Wellness Interpretation** and the associated HDL-C range. Ranges are
anchored to recognised thresholds (low) and cohort evidence (upper flag); labels are BioSense's
wellness interpretation.

**Male**

| BioSense Wellness Interpretation | Associated HDL-C (mg/dL) | Evidence anchor | Wellness meaning |
|---|---|---|---|
| **Below Optimal** | < 40 | ATP III low-HDL, men [D1] | Below the favourable range; constructive habits framing (no risk-reduction promise). |
| **Favourable** | 40 – 59 | Out of low range [D1][D5] | A favourable range. |
| **Optimal Reference** | 60 – 80 | ≥60 protective anchor [D3]; low-mortality band [D5] | The reference range associated with the most favourable outcomes. |
| **High — In Context** | 81 – 90 | Above reference; upper-end signal begins [D4] | Higher than the reference range; read in context, not "better." |
| **Very High — Flag** | > 90 | Very high (sex-specific) [D4][D6] | Unusually high; a neutral "worth mentioning" flag, not a concern to alarm over. |

**Female**

| BioSense Wellness Interpretation | Associated HDL-C (mg/dL) | Evidence anchor | Wellness meaning |
|---|---|---|---|
| **Below Optimal** | < 50 | ATP III low-HDL, women [D2] | Below the favourable range; constructive habits framing. |
| **Favourable** | 50 – 59 | Out of low range [D2] | A favourable range. |
| **Optimal Reference** | 60 – 90 | ≥60 protective anchor [D3]; wider female reference [D6] | The reference range associated with the most favourable outcomes. |
| **High — In Context** | 91 – 110 | Above reference; upper-end signal begins [D6] | Higher than the reference range; read in context. |
| **Very High — Flag** | > 110 | Very high (sex-specific) [D6] | Unusually high; a neutral "worth mentioning" flag. |

## 11.2 How the bands were derived — transparency [B]
- **Low-end boundaries (40 men / 50 women)** are the recognised ATP III low-HDL thresholds (D1, D2).
- **The ≥60 "protective" anchor** (D3) opens the Optimal Reference range.
- **The upper flags (>90 men / >110 women)** derive from cohort evidence on the U-shaped mortality
  signal and sex-specific "extremely high" references (D4, D6). Because these are **not standardised
  guideline thresholds**, they trigger a *neutral flag*, never alarm (§10.2, §19). **[E]**
- **No number was averaged.** Sex-specific values are kept separate (D1/D2/D6).

## 11.3 Population caveat [E]
Bands assume a **general adult, not pregnant, not acutely ill, not on lipid-modifying therapy**, with
**sex known**. Not applied to children/adolescents, pregnancy, acute illness, or where sex is
required-but-unusable (§15).

## 11.4 Sex handling — [C]
Sex is required for correct banding. If **unknown**, BioSense uses the **male thresholds** (more
conservative at the low end), tags `sex_assumed`, and reduces confidence (CAV3). BioSense never infers
sex from the value. **[C]**

## 11.5 Never inferred [D]
Sex, pregnancy, acute illness, and therapy status come only from declared or accompanying data.
BioSense never infers them, or any diagnosis, from the HDL-C value.

## 11.6 Direction — non-monotonic *(structural difference)* [B][D]
HDL-C is **not** lower-better (ApoB/LDL-C) and **not** simply higher-better. It is a **favourable-range
marker**: low is unfavourable, a healthy range is favourable, and very high is a neutral flag. Critically,
**BioSense never implies that raising HDL-C reduces risk** (S3) — the evidence does not support it. **[D][D9]**

---

# 12. Interpretation Framework

Fixed deterministic order (consistent with the ENG four-state model), sex-aware, with an acute-illness
validity consideration. **[C]**

```
1. VALIDITY   — value interpretable? (unit known; result final; NOT drawn during known acute
                illness/inflammation) → if acute-illness, DISPLAY, prefer abstain/reduced + CAV6.
2. ELIGIBILITY— may we band? (general adult, not pregnant; sex usable) → else abstain (§15).
3. CONFIDENCE — sex_assumed, acute context, reducers (§13) → HIGH / REDUCED.
4. BAND       — assign sex-aware non-monotonic wellness interpretation (§11).
5. CONTEXT    — read with ApoB/LDL-C/non-HDL-C/triglycerides (§9); metabolic clustering note if low+high-TG.
6. NARRATIVE  — select wellness narrative (§24) + mandatory caveats (§0.8), incl. marker-not-target (CAV4).
```

**Core interpretive stance [B]:** HDL-C is a contextual wellness marker — favourable in range, worth
attention when low, worth a neutral mention when very high — and **never a target to maximise**. **[B][D]**

---

# 13. Confidence Assessment  *(adapted: sex + acute-phase)*

Start HIGH; reduce to REDUCED if any reducer present; name it (CAV3). Acute illness may instead trigger
abstention (§15). **[A]/[D]**

| Reducer | Why | Source |
|---|---|---|
| Sex unknown (sex_assumed) | Thresholds are sex-specific | [D1,D2,C] |
| Acute illness / inflammation | HDL-C transiently low | [D17] |
| Non-fasting (minor) | Small effect for HDL-C | [D12] |
| Recent major diet/weight change | Transient shift | [A] |
| On lipid-modifying therapy | Reflects treated state | [A] |
| High triglycerides | Assay/context effect | [A] |
| Method change between tests | Trend caution | [A] |
| Value near a band boundary | Small error reclassifies | [B] |
| Single value, no prior | Best read over time | [A] |

| Validity/eligibility abstention | Source |
|---|---|
| Known acute illness/inflammation (steady-state re-check preferred) | [D17] |
| Pregnancy / age <18 | [C] |
| Sex required-but-unusable in an edge case | [C] |

---

# 14. Wellness Interpretation

Interpretation-by-interpretation guidance, sex-aware. All wording is wellness, not medical, never
implies "raise HDL-C to lower risk," and never uses diagnostic labels. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal Reference** *(60–80 M / 60–90 F).* "Your HDL-C is in the
  reference range associated with the most favourable outcomes. A good result to maintain with your
  current habits." **[B]**
- **BioSense Wellness Interpretation: Favourable** *(40–59 M / 50–59 F).* "Your HDL-C is in a favourable
  range. Regular activity, not smoking, and a healthy weight are associated with healthier HDL-C." **[B]**
- **BioSense Wellness Interpretation: Below Optimal** *(<40 M / <50 F).* "Your HDL-C is below the
  favourable range. Habits like regular aerobic activity, not smoking, and a healthy weight are
  associated with healthier HDL-C. It's also worth looking at your HDL-C alongside your other lipids
  rather than on its own." Constructive — **without** promising that raising HDL-C lowers risk (S3). **[B][D]**
- **BioSense Wellness Interpretation: High — In Context** *(81–90 M / 91–110 F).* "Your HDL-C is higher
  than the reference range. HDL-C is best read in context — higher isn't automatically better — so we'd
  look at your whole lipid picture rather than this number alone." **[B][D]**
- **BioSense Wellness Interpretation: Very High — Flag** *(>90 M / >110 F).* "Your HDL-C is unusually
  high. This isn't something to be alarmed about, and it's simply worth mentioning to a healthcare
  professional at some point." Neutral, not celebrated, no cause named (S4, CAV5). **[B][D]**

**Marker-not-target modifier (always available):** where a user asks how to "raise their HDL" or treats
it as a score to maximise, the narrative gently explains HDL-C is a marker and that raising it hasn't
been shown to lower risk on its own (CAV4). **[D][D9]**

Every interpretation pairs the reading with the mandatory caveats (§0.8) and reads HDL-C in lipid
context. **None names a condition.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains from banding** where its bands don't apply or the value is unreliable. **[C]/[D]/[E]**

- **15.1 Children & adolescents.** Adult sex-bands not applied; display, suggest professional
  interpretation. **[D]**
- **15.2 Pregnancy.** Lipids shift physiologically; BioSense does not band, notes pregnancy affects
  lipids, defers to a professional. **[D]**
- **15.3 Acute illness / inflammation.** HDL-C is transiently low; BioSense prefers abstention or reduced
  confidence with a steady-state re-check suggestion (CAV6). **[D][D17]**
- **15.4 Sex unknown.** Uses male thresholds + `sex_assumed` + reduced confidence, or abstains in edge
  cases (§11.4). **[C]**
- **15.5 On lipid-modifying therapy.** Framed as reflecting current management; never implies raising
  HDL-C or changing treatment (S3, S6). **[D]**
- **15.6 Very high HDL-C.** Neutral flag, not celebrated, no cause named (S4). **[D]**

**Abstention is a first-class, non-error output**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **What counts as a real change. [A][E]** Small differences can be biological/assay variation; framed
  as meaningful only beyond normal variation and not explained by a method change.
- **Acute-illness points excluded. [A]** A value during illness/inflammation is tagged and excluded from
  trend so it doesn't create a false "your HDL dropped" signal. **[D17]**
- **Direction & framing. [B]** Movement *into* the reference range is framed positively; movement to the
  low end is a constructive prompt (no risk-reduction promise); movement to very high is a neutral flag,
  never celebrated. **Non-monotonic framing throughout (§11.6).** **[B][D]**
- **Context over time. [B]** HDL-C trends are read with the atherogenic markers; a rising HDL-C is never
  presented as offsetting a rising ApoB/LDL-C (S12).

---

# 17. Lifestyle Optimisation Guidance

Lifestyle is the first tier. Habits below are **associated with healthier HDL-C**, framed honestly:
these support overall cardiovascular wellness, but BioSense does **not** promise that raising HDL-C
itself lowers risk (S3). **[A]/[B]/[D]**

## 17.1 Physical activity [A][D16]
Regular aerobic activity is the most consistently HDL-C-associated lifestyle factor. Framed as a
whole-wellness habit. **[A]**

## 17.2 Not smoking [A][D16]
Smoking lowers HDL-C; not smoking / cessation is associated with healthier HDL-C and broad
cardiovascular wellness. **[A]**

## 17.3 Healthy weight & diet [A][D16]
Healthy body composition and reducing refined carbohydrate are associated with healthier HDL-C;
unsaturated fats support the overall lipid picture. **[A]**

## 17.4 Alcohol — explicitly not recommended to raise HDL-C [A][D][D16]
Although alcohol raises HDL-C, BioSense **never** suggests alcohol as a way to raise HDL-C (S8); the
wellness risks outweigh a marker change that isn't a validated benefit. **[D]**

## 17.5 Framing rules [B][D]
Lifestyle first; medication never suggested; **no "raise your HDL to cut risk" messaging** (S3); alcohol
never suggested for HDL-C (S8). Honest framing: these habits support cardiovascular wellness broadly;
the HDL-C number is context, not the goal.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain the band and what HDL-C is (including the marker-not-target nuance) in
warm wellness language; connect to whole-wellness habits; read HDL-C in lipid context; acknowledge a
favourable result; express abstention respectfully.

The AI layer **must never**:
- state or imply a diagnosis or condition (S1)
- **imply that raising HDL-C lowers cardiovascular risk** (S3) — the single most important HDL-C constraint
- present HDL-C as simply "higher is better," or celebrate a very high value (S4, §11.6)
- suggest alcohol to raise HDL-C (S8)
- present a very high HDL-C as offsetting elevated ApoB/LDL-C (S12)
- produce a numeric cardiovascular risk % from HDL-C (S7)
- recommend starting/stopping/changing medication (S6)
- present a BioSense band as a medical/diagnostic boundary (S10)
- interpret a value drawn during known acute illness without the caveat/abstention (S9)
- infer sex, pregnancy, illness, or therapy from the value

Enforcement is by output validation on rendered text, not by prompt alone. The claim "raising HDL-C
lowers risk" is a SAFETY_CLASS forbidden assertion. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis.** Every output carries CAV1. **[D]**
- **Marker, not target.** CAV4 and S3 ensure BioSense never implies raising HDL-C lowers risk. **[D][D9]**
- **No "higher is better."** The non-monotonic model and the neutral very-high flag prevent a
  maximise-it message; a very high value is never alarmed over and never celebrated (S4). **[D][D4]**
- **Read in context.** HDL-C is never presented as offsetting atherogenic markers (S12). **[D]**
- **No alcohol advice.** Alcohol is never suggested to raise HDL-C (S8). **[D]**
- **No medication guidance.** Medication questions → educational context + referral (S6, S11). **[D]**
- **No alarm.** All wording is calm and constructive. **[D]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. HDL-C is **Very High (flag)** — CAV5 neutral "worth mentioning." **[D4]**
2. HDL-C is **Below Optimal** *and* clusters with other signals (e.g. high triglycerides) — metabolic
   context worth professional review. **[D15]**
3. The value was drawn during **acute illness** — steady-state re-check (CAV6). **[D17]**
4. The user is in an **abstention population** (child/adolescent, pregnancy). 
5. The user **asks a medical or medication question**, or asks **how to raise HDL-C** (educational
   context + marker-not-target framing, CAV4). **[D]**

All suggestions are wellness-framed, non-urgent, non-diagnostic; no emergency instructions. **[D]**

---

# 21. BioSense Product Integration

How SCL-004 plugs into the existing platform (no architecture change): **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for HDL-C, plus sex, and
  available triglycerides/total cholesterol/ApoB/LDL-C for context.
- **Supplies (as CSL bindings):** the sex-aware non-monotonic wellness bands (Category B), the
  recognised anchors (Category A), the marker-not-target safety model, confidence reducers, safety
  rules, lifestyle evidence, and narrative templates — each with value + source-ID + category + version.
- **Respects:** every ENG platform invariant; the cross-marker discipline (HDL-C never averages against
  or offsets atherogenic markers).
- **Score contribution:** HDL-C contributes to the cardiovascular-wellness domain as a **non-monotonic,
  sex-aware, context** input — favourable in range, with no "maximise" incentive and a neutral very-high
  flag. It never offsets ApoB/LDL-C. Any score weighting is a Category [C] product decision. **[C]**

---

# 22. Medication Context (educational only)

Educational context only; BioSense does not instruct on medication (S6). **[D]**
- No medication is used in routine wellness to "raise HDL-C," and importantly, **drugs that raise HDL-C
  have not reduced cardiovascular events** — a key reason BioSense treats HDL-C as a marker, not a
  target. <cite index="47-1">Two large trials with the currently available major HDL‐C raising agent, niacin... failed to show significant cardiovascular benefit.</cite> **[A][D9]**
- Any medication question → educational context + suggestion to speak with a healthcare professional
  (S11). **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Upper thresholds are not standardised. [E]** The very-high flags (>90 M / >110 F) derive from
   observational cohorts, are sex-dependent, and vary between studies; BioSense uses them only for a
   *neutral* flag. **[D4][D6]**
2. **U-shaped mortality may be partly confounded. [E]** Used cautiously; BioSense does not claim very
   high HDL-C is harmful, only that it is not "better."
3. **HDL-C ≠ HDL function. [E]** HDL-C is a crude proxy for HDL functional quality, which BioSense cannot
   assess. **[D11]**
4. **Optimal Reference range is a BioSense synthesis. [E]** Anchored to ≥60 protective and low-mortality
   cohort bands, not a single guideline "optimal."
5. **Sex-assumption default (male) is a product choice. [C]** Conservative at the low end; flagged.

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; never "raise HDL to lower
risk"; never diagnostic labels; sex-aware ranges). **[B]/[D]** (Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL_REFERENCE
"Your HDL-C is {value} mg/dL ({mmol} mmol/L) — in the reference range associated with the most
 favourable outcomes. A good result to maintain."  +CAV1 +CAV2

TEMPLATE: FAVOURABLE
"Your HDL-C is {value} mg/dL ({mmol} mmol/L) — a favourable range. Regular activity, not smoking, and a
 healthy weight are associated with healthier HDL-C."  +CAV1 +CAV2

TEMPLATE: BELOW_OPTIMAL
"Your HDL-C is {value} mg/dL ({mmol} mmol/L) — below the favourable range. Habits like regular aerobic
 activity, not smoking, and a healthy weight are associated with healthier HDL-C, and it's best read
 alongside your other lipids rather than on its own."  +CAV1 +CAV2 +CAV4

TEMPLATE: HIGH_IN_CONTEXT
"Your HDL-C is {value} mg/dL ({mmol} mmol/L) — higher than the reference range. With HDL-C, higher isn't
 automatically better, so we'd look at your whole lipid picture rather than this number alone."  +CAV1 +CAV2

TEMPLATE: VERY_HIGH_FLAG
"Your HDL-C is {value} mg/dL ({mmol} mmol/L) — unusually high. This isn't a cause for alarm, and it's
 simply worth mentioning to a healthcare professional at some point."  +CAV1 +CAV2 +CAV5

MODIFIER: MARKER_NOT_TARGET (if user asks how to raise HDL / treats it as a score) →
 "It's worth knowing that HDL-C is a marker, not a dial to turn up — raising it on its own hasn't been
  shown to lower cardiovascular risk. The habits that support healthy HDL-C help your whole
  cardiovascular picture."  +CAV4

MODIFIER: REDUCED_CONFIDENCE → append CAV3, e.g.
 "We used general thresholds because sex wasn't specified — add it for a more precise reading."
 or "A recent illness can temporarily lower HDL-C, so consider a steady-state re-check."  (+CAV6)

MODIFIER: LIPID_CONTEXT (with ApoB/LDL-C) →
 "HDL-C is best read alongside your atherogenic markers; a favourable HDL-C doesn't offset an elevated
  ApoB or LDL-C."

MODIFIER: ABSTENTION (child / pregnancy / acute illness) →
 "Because {age / pregnancy / recent illness} affects how HDL-C should be interpreted, we're not scoring
  this one — it's best looked at with a healthcare professional."  +CAV1
```

**Absolute rules:** no template ever implies raising HDL-C lowers risk (S3), suggests alcohol (S8),
celebrates a very high value (S4), or names a condition. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal Reference, male, high confidence. [illustrative]**
```
Input: HDL-C 62 mg/dL, male, adult, no acute illness.
Band: OPTIMAL_REFERENCE (M) | Confidence: HIGH | Abstained: false
Narrative: OPTIMAL_REFERENCE +CAV1+CAV2 ; Rec: Tier 1 maintain; Tier 2 read in lipid context.
```

**Example 2 — Below Optimal, female, with high triglycerides. [illustrative]**
```
Input: HDL-C 44 mg/dL, female, TG 220, adult.
Band: BELOW_OPTIMAL (F) | Confidence: HIGH | metabolic_clustering: true
Narrative: BELOW_OPTIMAL +CAV1+CAV2+CAV4 + LIPID_CONTEXT ; Rec: Tier 1 activity/weight (no risk-reduction promise); Tier 3 calm review (low HDL + high TG).
NOTE: no "raise HDL to lower risk"; no alcohol suggestion.  [S3,S8]
```

**Example 3 — Very High, male. [illustrative]**
```
Input: HDL-C 98 mg/dL, male, adult.
Band: VERY_HIGH_FLAG (M) | Narrative: VERY_HIGH_FLAG +CAV1+CAV2+CAV5 (neutral; not celebrated; no cause named — S4)
```

**Example 4 — Sex unknown. [illustrative]**
```
Input: HDL-C 48 mg/dL, sex not specified, adult.
Band: FAVOURABLE (male thresholds) | Confidence: REDUCED (sex_assumed)
Narrative: FAVOURABLE +CAV1+CAV2 +CAV3("sex not specified") 
```

**Example 5 — Drawn during acute illness. [illustrative]**
```
Input: HDL-C 33 mg/dL, male, user notes current infection.
Band: (none) | Abstained: true (acute illness) | value displayed
Narrative: ABSTENTION + CAV1 + CAV6 (steady-state re-check)
```

**Example 6 — User asks "how do I raise my HDL?" [illustrative]**
```
Response uses MARKER_NOT_TARGET modifier + CAV4: explains HDL-C is a marker, raising it alone hasn't
been shown to lower risk; whole-wellness habits help the overall picture. No alcohol suggestion (S8).
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-001 (ApoB), SCL-003 (LDL-C)** — atherogenic markers HDL-C is read alongside; HDL-C never offsets
  or averages against them.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§0 Implementation Summary** — developer-facing activation values.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the D-series IDs in
> §0 and the body. Developers finalising the pack should confirm exact page/table locators against the
> primary PDFs where required.

**Guidelines & population thresholds (Category A anchors)**

1. Grundy SM, Cleeman JI, et al. **Third Report of the NCEP Expert Panel (ATP III), Final Report.**
   *Circulation* 2002;106(25):3143–3421. — *Low HDL-C <40 (men); <50 (women, metabolic syndrome);
   ≥60 "negative"/protective; non-fasting HDL usable (D1, D2, D3, D12, D14, D15).*
2. Rader DJ, et al. / Medscape review of hyper-/hypo-alphalipoproteinemia (ATP III synthesis). —
   *Sex-specific thresholds; ≥60 protective; U-shape nadir ~50–60 (D1–D3, D5).*

**U-shaped mortality & upper-end signal (Category A/P)**

3. Liu C, Dhindsa D, Quyyumi AA, et al. **Association Between High-Density Lipoprotein Cholesterol
   Levels and Adverse Cardiovascular Outcomes in High-risk Populations.** *JAMA Cardiology*
   2022;7(7):672–680 (PubMed 35583863). — *Very high HDL-C >80 mg/dL: all-cause death HR 1.96, CV death
   HR 1.71 vs 40–60; UK Biobank + Emory; men > women (D4, D5).*
4. Korean Genome and Epidemiology Study (KoGES-HEXA). **Extremely high HDL-C paradoxically increases
   all-cause mortality in non-diabetic males.** *Frontiers in Medicine* 2025;12:1534524. — *U-shaped;
   >80 mg/dL and <40 mg/dL both associated with higher mortality in males <60 (D4).*
5. Korean NHIS cohort (N=5,703,897). **Sex-Specific U-shaped HDL-C and 10-year outcomes.** *(PMC10744622.)*
   — *Sex-specific references: males optimal 40–70, extremely high >90; females optimal 50–110,
   extremely high >130 mg/dL (D6).*
6. Systematic review & meta-analysis. **Very high HDL-C (≥80 mg/dL) and mortality.** *(ScienceDirect
   S1933287424002034, 2024.)* — *Confirms very-high-HDL mortality association vs 40–60 reference (D4).*

**HDL-C as marker, not target (Category A/M)**

7. Barter P, et al. **Effects of Torcetrapib (CETP inhibitor) on HDL Cholesterol.** *NEJM*
   2004;350:1505–1515. — *CETP inhibition raises HDL-C; no established therapy raising HDL-C reduces
   events (D9).*
8. AIM-HIGH and HPS2-THRIVE investigators; **Re-examining the HDL hypothesis** *(PMC4931190)*. — *Niacin
   raised HDL-C without CV benefit (D9).*
9. Ference BA, et al. (CETP Mendelian randomisation); **CETP inhibitors review**, *Cardiovascular
   Research* 2022;118(14):2919 (doi:10.1093/cvr/cvab350). — *ASCVD benefit tracks LDL-C/apoB reduction,
   not HDL-C rise; genetically raised HDL-C does not lower MI risk (D9, D10).*
10. **CETP inhibition JACC Review Topic of the Week.** *JACC* 2018 (doi:10.1016/j.jacc.2018.10.072). —
    *~15 mg/dL (0.4 mmol/L) higher HDL-C ≈ 22% lower CHD risk observationally; raising HDL-C not
    beneficial in trials (D8, D9).*
11. **Emerging HDL-targeted therapies / HDL function reviews** *(IJCDW 2025; VHRM Dovepress).* — *HDL
    function > HDL-C quantity; HDL-C a crude measure (D11).*

**Measurement, units, lifestyle (Category A/S)**

12. NCEP ATP III measurement guidance; standard cholesterol molar factor 38.67. — *Direct homogeneous
    assay; non-fasting HDL usable; unit conversion (D12, D13).*
13. NCEP ATP III Therapeutic Lifestyle Changes; HDL-lifestyle reviews. — *Aerobic activity, smoking
    cessation, weight, refined-carb reduction associated with healthier HDL-C; alcohol raises HDL-C but
    not recommended for it (D16); HDL-C falls in acute-phase (D17).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–6; they are
> BioSense Version 1 classifications, not attributable to any single reference as a diagnostic
> threshold, sex-aware and non-monotonic, and do not restate diagnostic labels.

---

# 28. Founder Decisions Required

The core HDL-C methodology (sex-aware non-monotonic bands; marker-not-target framing; neutral very-high
flag) follows directly from the evidence and the established platform posture. Two optional
presentation/policy items remain: **[C][E]**

**D-1 — Confirm the sex-aware band boundaries**, in particular the **upper flag points** (>90 mg/dL men /
>110 mg/dL women), which are cohort-derived and not standardised. Confirmation requested that a *neutral
flag* (not a concern band) is the correct treatment. **Founder sign-off requested.**

**D-2 — Confirm the sex-unknown default** (use male thresholds + reduced confidence). Alternative: abstain
until sex is provided. **Founder decision requested.**

*(Both affect presentation/handling, not the underlying evidence.)*

---

**END OF SCL-004 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A]
guideline/cohort figure or a transparently-labelled Category [B] BioSense wellness interpretation. No
value was fabricated; every Category [A] number was retrieved and verified during authoring and traces
to §27. The non-monotonic sex-aware direction model, the marker-not-target safety framing, and the
acute-phase handling were adapted to HDL-C's genuine structural differences; all other structure follows
SCL-001 exactly.*
