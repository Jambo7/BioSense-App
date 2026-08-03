# SCL-003 — LDL CHOLESTEROL (LDL-C)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology

**Document ID:** SCL-003
**Biomarker:** LDL Cholesterol (LDL-C; low-density lipoprotein cholesterol)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Structure preserved; only the sections requiring genuine structural difference were adapted (see Structural-Fit Note).

---

> **What this document is.** SCL-003 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for LDL-C. It does not redesign
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

## STRUCTURAL-FIT NOTE (LDL-C vs SCL-001)

The overall structure, section order, content-classification scheme (A–E), confidence model,
safety posture, recommendation-ladder shape, narrative-contract approach, governance, and
low-end handling philosophy (lower-better, no low-end penalty — as ApoB) were **preserved
exactly**. Three areas required genuine adaptation and only these were changed:

1. **Calculation-method-aware validity & confidence (§8, §12, §13) — new.** Unlike directly-
   measured ApoB, LDL-C is frequently *calculated* from a lipid panel, and the calculation
   method (Martin/Hopkins, Sampson/NIH, Friedewald, direct, or unknown) materially affects
   accuracy. Method becomes a first-class validity and confidence input, per the founder
   decision.
2. **Triglyceride-driven rules (§8, §11, §15) — new.** Triglyceride concentration governs the
   validity of calculated LDL-C (Friedewald is invalid at TG ≥400 mg/dL / ≥4.5 mmol/L) and
   graduates confidence below that.
3. **Cross-biomarker hierarchy with ApoB & non-HDL-C (§9, §14) — new emphasis.** LDL-C is
   independently bandable, but where ApoB is available the pack compares them, never averages
   or substitutes, and gives ApoB greater interpretive weight for atherogenic particle burden
   in high-triglyceride, metabolic, very-low-LDL-C, or discordant settings — consistent with
   SCL-001.

---

## CONTENT CLASSIFICATION KEY

- **[A]** Source-derived fact / recognised threshold — traceable to a named guideline, consensus, standardisation body, or validation study.
- **[B]** BioSense Version 1 wellness interpretation — a BioSense-authored synthesis, labelled as such.
- **[C]** Product-policy decision — a choice BioSense made for V1, recorded for audit.
- **[D]** Safety / healthcare-review wording — deterministic caveats and referral language.
- **[E]** Area of uncertainty — explicitly flagged limitation or unresolved evidence.

---

# SCIENTIFIC POSITION STATEMENT

BioSense is a premium wellness and preventative health-intelligence platform. It is not a
medical device. It does not diagnose disease, and it does not replace healthcare
professionals. Everything in this document is written to help a healthy adult understand and
optimise a modifiable long-term wellness signal — never to render a clinical verdict.

LDL-C is one of the most recognised numbers in preventative health, and BioSense treats it
with both respect and precision. It reproduces the recognised guideline figures faithfully and
attributes them, but it does not restate diagnostic or treatment thresholds as BioSense
conclusions. It also recognises something the science is now explicit about: LDL-C measures the
cholesterol *mass* carried inside LDL particles, while ApoB more directly reflects the *number*
of atherogenic particles — and the two can disagree. BioSense therefore interprets LDL-C as a
genuine, independently meaningful wellness signal, while giving ApoB greater weight where the
evidence says particle number matters more.

The BioSense Wellness Interpretation Bands in this document are **consumer wellness
classifications, not diagnostic criteria.** Every BioSense interpretation is version controlled,
transparent, and designed to evolve as the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate LDL-C. Every value carries a source ID (L-series → §27)
> and a category tag. **This summary is authoritative for the engine; the body is authoritative
> for the science.** Canonical unit: mg/dL (store mmol/L in parallel).

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: mg/dL          # store mmol/L in parallel, never discard
conversion:  mg/dL = mmol/L × 38.67 ;  mmol/L = mg/dL ÷ 38.67   (cholesterol factor)
Always retain value_reported + unit_reported. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors L1–L5)
```
LDLC_WELLNESS_BAND (mg/dL, general adult, primary prevention, untreated):
  OPTIMAL                 < 100          # ATP III "optimal" [L1]
  ABOVE_OPTIMAL           100 – 129      # ATP III "near/above optimal" [L2]
  ELEVATED                130 – 159      # ATP III "borderline high" [L3]
  HIGH                    160 – 189      # ATP III "high" [L4]
  SIGNIFICANTLY_ELEVATED  ≥ 190          # ATP III "very high"; FH-pattern relevance [L5][L23]
DIRECTION: LOWER_BETTER, no low-end wellness penalty (as ApoB; see §11.6).  [B]
mmol/L equivalents (parallel display): 100≈2.6 | 130≈3.4 | 160≈4.1 | 190≈4.9
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. [B][D]**

## 0.3 Method-aware validity & confidence — [A]+[C] (founder decision)
```
LDLC_METHOD ∈ {MARTIN_HOPKINS, SAMPSON_NIH, FRIEDEWALD, DIRECT, UNKNOWN}

VALIDITY (abstain from banding when invalid):                                  [L11]
  FRIEDEWALD AND TG >= 400 mg/dL (>=4.5 mmol/L)  → INVALID → abstain, explain calmly.
  any method with an independent validity failure (unit unknown, non-final)    → abstain.

CONFIDENCE by method (band allowed; start HIGH, apply reducers):
  MARTIN_HOPKINS : standard confidence                                          [L13,L14]
  SAMPSON_NIH    : standard confidence                                          [L15]
  FRIEDEWALD     : REDUCED, graded by TG and LDL-C:                             [L11,L12]
        TG 150–399 mg/dL         → reducer (accuracy declines)
        LDL-C < 70 mg/dL         → reducer (underestimation)
        BOTH present             → stronger reducer (may compound)
        TG >= 400                → INVALID (see validity)
  DIRECT         : bandable if lab reports valid; do NOT auto-upgrade vs calculated [L16]
        apply any lab-flagged assay/context limitation as a reducer.
  UNKNOWN        : provisionally bandable + "method unknown" reducer;            [C]
        if TG >= 400 OR another validity concern → escalate reducer or abstain.
NEVER silently recalculate or replace the lab-reported LDL-C value.             [C: engineering req]
```

## 0.4 Cross-biomarker hierarchy (ApoB / non-HDL-C) — [A]+[C]
```
non_HDL_C = total_cholesterol − HDL_C   (corroborating context)                [L18]
IF ApoB available:
  compute concordance (LDL-C band vs ApoB band from SCL-001); DO NOT average/merge. [SCL-001]
  give ApoB GREATER interpretive weight for atherogenic particle burden when ANY:  [L21]
     TG elevated | metabolic dysfunction declared | LDL-C very low |
     LDL-C and ApoB materially disagree.
  on discordance → surface it; explain related-but-different; never substitute silently.
IF ApoB absent but TG elevated / metabolic context / LDL-C unexpectedly low:
  reduce reliance on LDL-C alone; give non-HDL-C corroborating weight; may suggest ApoB adds value.
NEVER suppress the LDL-C result unless its own validity rule requires abstention.  [C]
```

## 0.5 Deterministic safety & suppression rules — [D]
```
S1  LDL-C is NOT a diagnosis. Never state/imply disease.
S2  LDL-C is ONE input to cardiovascular wellness, never a risk score.
S3  Never name or imply familial hypercholesterolaemia (or any condition). ≥190 mg/dL is a
    pattern → calm healthcare-review, name nothing (consistent with SCL-001 FH discipline). [L23]
S4  SIGNIFICANTLY_ELEVATED (≥190) → calm healthcare-review wording.             [L5]
S5  Low LDL-C is NOT a wellness concern and NEVER penalised; if markedly low + untreated,
    neutral "worth mentioning" wording without naming a cause.
S6  Never recommend starting/stopping/changing medication.
S7  Never produce a numeric cardiovascular risk % from LDL-C.
S8  On any medication/therapy question → educational context + refer.
S9  Suppress interpretation when the method-validity rule invalidates the value (§0.3).
S10 Never present a BioSense band as a medical/diagnostic boundary.
S11 Never silently recalculate/replace lab-reported LDL-C (§0.3).
S12 On ApoB/LDL-C discordance, never average or substitute; surface and explain.  [SCL-001]
```

## 0.6 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 LIFESTYLE (always first): reduce saturated & trans fat; increase soluble fibre
   (~10–25 g/day) and plant stanols/sterols (~2 g/day); unsaturated fats; activity; weight
   management; limit alcohol; no smoking.                                       [L24]
Tier 2 RE-MEASURE / TRACK: confirm trend; where a calculated method was low-confidence,
   suggest a fasting sample or a preferred method/direct measure may clarify.    [L10-L16]
Tier 3 HEALTHCARE DISCUSSION (calm) when: SIGNIFICANTLY_ELEVATED | validity-abstention |
   marked ApoB/LDL-C discordance | markedly low | medical question.             [D]
NEVER a medication instruction at any tier.
```

## 0.7 Narrative selection rules — [B]/[D]
```
band → template; modulated by method-confidence, validity, and cross-marker context.
OPTIMAL/ABOVE_OPTIMAL     → affirming / gently constructive.
ELEVATED/HIGH             → constructive, optimisation-focused.
SIGNIFICANTLY_ELEVATED    → calm + healthcare-review [D].
validity-abstain          → explain the estimate may be unreliable in this sample; route.
discordance-with-ApoB     → explain related-but-different; ApoB weighted for particle burden.
Never "normal/abnormal"; never diagnosis language.
```

## 0.8 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "LDL-C is one of several markers of cardiovascular wellness."
CAV3 (reduced confidence) name the specific reducer(s) — e.g. calculation method + triglycerides.
CAV4 (validity-abstain) "This LDL-C estimate may not be reliable in this sample (e.g. high
      triglycerides with a calculated method); it's best interpreted with a healthcare professional."
CAV5 (significantly elevated) "It may be worth discussing this result with a healthcare professional."
CAV6 (ApoB available/discordant) "LDL-C and ApoB describe related but different aspects of your
      cholesterol-carrying particles; where they differ, ApoB better reflects particle number."
```

## 0.9 Source & version identifiers
```
config_id: SCL-003   config_version: 1.0
band_set_id: BIOSENSE_LDLC_WELLNESS_BANDS_v1     (Category B; anchors L1-L5)
method_model_id: SCL003_METHOD_CONFIDENCE_v1     (L10-L17; founder decision)
hierarchy_id: SCL003_APOB_NONHDL_HIERARCHY_v1    (L18-L21; founder decision + SCL-001)
guideline_goals_id: ESC_EAS_2019 / ACC_AHA_2018_2026  (Category A; L6-L9)
lifestyle_evidence_id: SCL003_LIFESTYLE_v1       (L24)
safety_rules_id: SCL003_SAFETY_v1                (S1-S12)
Every row carries its L-source + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

LDL cholesterol (LDL-C) is the amount of cholesterol carried inside low-density lipoprotein
(LDL) particles — the main cholesterol-carrying particles associated with the long-term
build-up of arterial plaque. **[A]** It is the single most familiar number in cardiovascular
prevention and a central component of the standard lipid panel.

From a wellness perspective, LDL-C is valuable because it is widely available, inexpensive,
well-studied, and responsive to lifestyle. It is important to understand what it does and does
not measure: LDL-C quantifies the cholesterol *mass* being carried, not the *number* of
particles carrying it. Usually these track together; sometimes they diverge, which is why
BioSense reads LDL-C alongside ApoB where available (§9). **[A]**

- **Official name:** Low-density lipoprotein cholesterol
- **Common abbreviation:** LDL-C
- **Reported in:** mg/dL and mmol/L **[A]**
- **Often calculated** from total cholesterol, HDL-C, and triglycerides, rather than measured directly (§8). **[A][L10]**
- **BioSense role:** A core cardiovascular-wellness biomarker; the cholesterol-mass companion to ApoB's particle-count.

---

# 2. Physiological Function

LDL particles transport cholesterol from the liver to the body's tissues, where cholesterol is
used for cell membranes, hormones, and other essential functions. **[A]** Cholesterol is vital;
the wellness question is not whether cholesterol is present but how much is being carried in the
atherogenic LDL fraction over time, because sustained higher LDL-C is associated with greater
long-term arterial plaque development. **[A]**

Two points shape interpretation **[A]**:
- **LDL-C is a concentration of cholesterol, not a particle count.** Two people with the same
  LDL-C can carry it in different numbers of particles; the particle number (reflected by ApoB)
  is the more direct measure of atherogenic burden (§9). **[A][L21]**
- **LDL-C is strongly modifiable.** Dietary fats, fibre, body composition, and activity all move
  it, which makes it an actionable wellness target. **[A][L24]**

---

# 3. Scientific Background

LDL-C sits on one of the strongest evidence bases in preventative medicine: lowering LDL-C
lowers cardiovascular event risk, consistently, across many trials and mechanisms, in a
dose-and-duration-dependent way. **[A]** This is the same causal atherogenic-lipoprotein
evidence base described in SCL-001, of which LDL-C is the classic cholesterol-mass marker. **[A]**

Modern guidelines have progressively lowered LDL-C goals for higher-risk groups as the evidence
for "lower for longer" has strengthened. <cite index="26-1">To prevent a first heart attack or stroke, the LDL-C goal should be less than 100 mg/dL for those at borderline or intermediate risk and less than 70 mg/dL in those at high risk.</cite> **[A][L7][L8]** The most recent guidance also explicitly recognises that ApoB may be a more accurate risk marker than LDL-C in specific groups. <cite index="26-1">Measuring apoB may be used to assess any residual ASCVD risk... apoB may be a more accurate risk marker than LDL-C in these groups of people.</cite> **[A][L21]**

**The wellness reading — [B]:** LDL-C is a well-validated, modifiable, long-term wellness signal.
BioSense frames it as a gradient to optimise over time, read in the context of ApoB and
non-HDL-C, and always as wellness information rather than a diagnosis.

**An honest boundary — [E]:** guideline LDL-C numbers are risk-stratified clinical goals and
diagnostic-adjacent thresholds (e.g. ≥190 mg/dL). BioSense uses the recognised population
categories as the basis for a wellness gradient, and never converts a threshold into a diagnosis.

---

# 4. Why LDL-C Matters

**1. It is the most studied, most available lipid marker. [A]** Decades of trials tie LDL-C
lowering to reduced cardiovascular events, and nearly every lipid panel reports it.

**2. It is highly responsive to lifestyle. [A][L24]** Saturated-fat reduction, soluble fibre,
plant stanols, activity, and weight all move LDL-C — making it a practical optimisation target.

**3. It is most informative when read with its companions. [A][L21]** LDL-C measures cholesterol
mass; ApoB measures particle number; non-HDL-C captures all atherogenic cholesterol. Read
together they give a fuller, safer picture than any one alone — which is the core of BioSense's
approach.

**Why BioSense measures it — [C]:** LDL-C is the most recognised, most available, most lifestyle-
responsive cholesterol marker, and it anchors a lipid picture that BioSense enriches with ApoB
and non-HDL-C. It aligns directly with BioSense's optimisation philosophy.

---

# 5. Laboratory Measurement

LDL-C reaches BioSense in one of several ways, and *how it was produced* matters (§8). **[A]**

- **Calculated LDL-C** — derived from total cholesterol, HDL-C, and triglycerides using an
  equation (Friedewald, Martin/Hopkins, or Sampson/NIH). Most lipid panels report a calculated
  value. **[A][L10]**
- **Directly measured LDL-C** — a specific assay measuring LDL-C without an equation. Useful when
  calculation is unreliable, but direct assays have their own standardisation limitations and are
  **not automatically a gold standard.** <cite index="12-1">these direct assays lack standardization, are time consuming and costly.</cite> **[A][L16]**
- **Reference method** — beta-quantification / ultracentrifugation, used in validation studies,
  not routine care. **[A][L17]**

BioSense records the reported method and value exactly as received and never silently
recalculates or replaces them (§8, §21). **[C]**

---

# 6. Units

- **mg/dL** — standard in the US. **BioSense canonical unit.** **[A/C]**
- **mmol/L** — standard in much of the world. **[A]**
- Conversion factor for cholesterol: **mg/dL = mmol/L × 38.67.** **[A]**

BioSense stores the originally reported value and unit unchanged and computes the parallel unit
for display. **[C]**

---

# 7. Unit Conversion

```
mg/dL  = mmol/L × 38.67
mmol/L = mg/dL ÷ 38.67
```
Worked checks: 100 mg/dL ≈ 2.59 mmol/L; 190 mg/dL ≈ 4.91 mmol/L. **[A]**

**Safety rule [D]:** BioSense never infers a unit from magnitude alone; the reported unit is
always retained. Where a unit is missing, the value is displayed but not interpreted.

---

# 8. Measurement Method, Limitations & Interference  *(major structural adaptation)*

This is the largest departure from the ApoB template. **A calculated LDL-C is only as good as
the equation used and the triglyceride level it was calculated at.** BioSense therefore treats
the calculation method as a first-class input to validity and confidence, per the founder
methodology decision. **[A][C]**

## 8.1 The methods, ranked by accuracy — [A]
- **Martin/Hopkins** uses an adjustable triglyceride:VLDL ratio and is the most accurate across
  most of the clinically relevant range, especially at low LDL-C and moderately high
  triglycerides. <cite index="13-1">The Sampson and Martin LDL estimating equations are more accurate than Friedewald... New equations by Martin (LDL-M) and Sampson (LDL-S) have improved accuracy relative to LDL-F for samples with high triglycerides (TG) or low LDL-C.</cite> At very high triglycerides (400–799 mg/dL), the extended Martin/Hopkins method is the most accurate of the three. <cite index="11-1">estimation of LDL-C with the extended Martin/Hopkins equation was most accurate (62.1%) compared with the Friedewald (19.3%) and Sampson (40.4%) equations.</cite> **[A][L13][L14]**
- **Sampson/NIH (equation 2)** was designed to estimate LDL-C at triglycerides up to 800 mg/dL
  and performs strongly at low LDL-C with high triglycerides. **[A][L15]**
- **Friedewald** is the classic equation (LDL = TC − HDL − TG/5) and remains widely used, but its
  fixed triglyceride:cholesterol assumption breaks down as triglycerides rise. <cite index="16-1">the Friedewald equation is not reliable when TGs are >400 mg/dl.</cite> It also loses accuracy at triglycerides ≥150 mg/dL or LDL-C <70 mg/dL. **[A][L11][L12]**

## 8.2 BioSense method-confidence rules — [A][C] (founder decision)
- **Martin/Hopkins or Sampson/NIH:** standard confidence when the result otherwise passes
  validity. Preferred methods. **[L13-L15]**
- **Friedewald:** bandable only when valid; apply a **triglyceride-and-LDL-C-graded confidence
  reducer** (TG 150–399, or LDL-C <70, each reduce confidence; both together compound it).
  **Invalid — do not band — at TG ≥400 mg/dL (≥4.5 mmol/L).** **[L11][L12]**
- **Direct LDL-C:** bandable if the lab reports a valid result; **not automatically upgraded**
  above a calculated value; record the method and apply any lab-flagged assay/context limitation
  as a reducer. **[L16]**
- **Method unknown:** provisionally bandable with a "method unknown" confidence reducer; if
  triglycerides are ≥400 mg/dL or another validity concern exists, escalate the reducer or
  abstain. **[C]**

## 8.3 Triglyceride & fasting effects — [A]
- **Triglycerides drive calculated-LDL-C validity** (the whole of §8.2). **[A][L11]**
- **Fasting** classically mattered for Friedewald because triglycerides are higher post-meal; a
  non-fasting sample with elevated triglycerides is a confidence reducer for calculated LDL-C.
  **[A][L22]**

## 8.4 Other limitations — [A]
- **Direct-assay standardisation** varies between manufacturers (§5). **[A][L16]**
- **Biological/method variation** means small differences between results may be noise or a
  method change rather than true change (relevant to trend, §16). **[A]**

**How BioSense uses this — [C][D]:** the method + triglyceride state deterministically sets
confidence or, where an equation is invalid, triggers **abstention with a calm explanation that
the LDL-C estimate may not be reliable in this sample** (CAV4). BioSense **never** silently
recalculates the value to "fix" it — if BioSense ever computes LDL-C itself, that must be a
separately governed, versioned, validated derived-biomarker service (§21, §23). **[C]**

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker hierarchy — founder decision)*

- **ApoB (SCL-001). [A]** ApoB counts atherogenic particles; LDL-C weighs their cholesterol
  cargo. They usually agree but can be **discordant**, and where they disagree, ApoB more directly
  reflects atherogenic particle burden. <cite index="26-1">apoB may be a more accurate risk marker than LDL-C</cite> in people with high triglycerides, type 2 diabetes, cardiovascular-kidney-metabolic syndrome, or established disease. **[A][L21]** BioSense compares the two, never averages or substitutes them, and gives ApoB greater interpretive weight in high-triglyceride, metabolic, very-low-LDL-C, or discordant settings (§14). **[C]**
- **Non-HDL-C. [A]** Calculated as total cholesterol minus HDL-C, it captures cholesterol across
  *all* atherogenic lipoproteins (LDL, VLDL, IDL, Lp(a)). <cite index="33-1">The non-HDL-C level includes cholesterol carried in several atherogenic lipoproteins, such as LDL, very low-density lipoprotein (VLDL), intermediate-density lipoprotein (IDL), and lipoprotein(a).</cite> BioSense uses it as corroborating context, especially when triglycerides are elevated. Its goal runs 30 mg/dL above the corresponding LDL-C goal. **[A][L18][L19][L20]**
- **Triglycerides. [A]** Central to calculated-LDL-C validity (§8) and to discordance; high
  triglycerides raise the value of ApoB and non-HDL-C over LDL-C alone. **[A][L11]**
- **HDL-C. [A]** Not atherogenic; needed to compute non-HDL-C and for overall lipid context. **[A]**
- **Total cholesterol. [A]** A component of the panel and of the non-HDL-C calculation. **[A]**

**Engine implication [C]:** where ApoB is present, BioSense computes concordance and applies the
hierarchy above; where ApoB is absent but triglycerides are high or LDL-C is unexpectedly low,
BioSense leans on non-HDL-C corroboration and may note that ApoB would add value — never imputing
or substituting a value.

---

# 10. Evidence Review

All numbers here are Category **[A]** — recognised guideline/validation values, reproduced and
attributed.

## 10.1 Where the authorities agree
- **Population LDL-C categories (ATP III):** <100 optimal; 100–129 near/above optimal; 130–159
  borderline high; 160–189 high; ≥190 very high. <cite index="27-1">for persons with no risk factors, LDL cholesterol below 100 mg/dL is optimal, between 100 and 129 mg/dL is near optimal, between 130-159 mg/dL is borderline high, between 160 and 189 mg/dL is high and > 190 mg/dL is considered very high.</cite> **[A][L1-L5]**
- **Lower LDL-C is better across the studied range;** no general-population threshold below which
  lowering becomes harmful. **[A]**
- **Modern calculation equations (Martin/Hopkins, Sampson/NIH) are preferred over Friedewald,**
  which is unreliable at high triglycerides. <cite index="8-1">Recent guidelines recommend the use of "modern" equations such as Martin/Hopkins and Sampson/NIH equations which account for variations in TG and non-HDL-C.</cite> **[A][L11][L13]**
- **ApoB and non-HDL-C add value beyond LDL-C**, especially at high triglycerides / metabolic
  risk. **[A][L21][L20]**

## 10.2 Where they differ — and why
- **Risk-stratified goals differ by body and risk group.** ESC/EAS 2019 and ACC/AHA set goals of
  <55 (very-high), <70 (high), <100 (moderate/intermediate), <116 (low, ESC). <cite index="22-1">the LDL-C target is ≥50% reduction... goal <55 mg/dl [very-high]... target LDL-C is <70 mg/dl [high]... target LDL-C <100 mg/dl [moderate]... low risk a goal of <116 mg/dl.</cite> These are *treatment goals for risk-stratified patients*, not universal wellness targets. **[A][L6-L9]**
- **US vs European very-high-risk goal:** historically <70 (US) vs <55 (Europe), now converging as
  ACC/AHA 2026 also uses <55 for very-high-risk secondary prevention. **[A][L6]**
- **Why:** goals answer "how low should a *patient at known risk* go?"; the ATP III categories
  describe where an *untreated person* sits. Different questions, different populations — not to be
  collapsed. This is why BioSense anchors its wellness bands to the population categories (§11).
  **[A][E]**

## 10.3 Strength of evidence
- **LDL-C causality & benefit of lowering: strong / established.** **[A]**
- **Population categories (ATP III): long-established, widely used.** **[A][L1-L5]**
- **Equation accuracy hierarchy: strong (multiple large validation studies).** **[A][L11-L15]**
- **ApoB superiority in specific groups: strong and now guideline-endorsed.** **[A][L21]**
- **A single "wellness optimal" for healthy adults: reasoned, not formally defined** — BioSense
  synthesises from the ATP III "optimal <100." **[E]**

## 10.4 Intended populations
Guideline goals target risk-stratified/treated patients; the ATP III categories describe general
adults and are the appropriate anchor for a wellness platform, supplemented by ApoB/non-HDL-C
context and the method-aware confidence model. Populations where the calculated value is invalid
(Friedewald at TG ≥400) are handled by abstention (§15).

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of
> the Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic
> boundaries, NOT medical cut-offs, and NOT universal truth.**

## 11.1 The interpretation bands (mg/dL; general adult, primary prevention, untreated)

Each row states a **BioSense Wellness Interpretation** and the associated LDL-C range that
BioSense interprets it from. Ranges are anchored to the recognised population categories; the
labels are BioSense's wellness interpretation.

| BioSense Wellness Interpretation | Associated LDL-C (mg/dL) | ≈ mmol/L | Evidence anchor | Wellness meaning |
|---|---|---|---|---|
| **Optimal** | < 100 | < ~2.6 | ATP III "optimal" [L1] | Cholesterol-mass burden in the most favourable long-term range. |
| **Above Optimal** | 100 – 129 | ~2.6–3.3 | ATP III "near/above optimal" [L2] | Good, with clear room to optimise. |
| **Elevated** | 130 – 159 | ~3.4–4.1 | ATP III "borderline high" [L3] | Above the wellness-desirable range; a meaningful optimisation opportunity. |
| **High** | 160 – 189 | ~4.1–4.9 | ATP III "high" [L4] | Notably above desirable; lifestyle focus and possible healthcare discussion. |
| **Significantly Elevated** | ≥ 190 | ≥ ~4.9 | ATP III "very high"; earlier-review relevance [L5][L23] | Well above the typical range; calm healthcare-review wording applies [D]. |

## 11.2 How the bands were derived — transparency [B]
- Each boundary maps directly to a recognised ATP III population category (L1–L5). BioSense adopts
  the population category structure and applies its own wellness labels, **without** restating any
  diagnostic or treatment interpretation.
- **≥190 mg/dL** is positioned as "Significantly Elevated" and triggers calm healthcare-review
  wording; consistent with SCL-001, BioSense detects the pattern and **names no condition** (§19).
- **No number was averaged across guidelines.** Risk-stratified treatment goals (L6–L9) are held
  separately as context (§11.4), never merged into the wellness bands.

## 11.3 Population caveat [E]
These bands assume a **general adult, primary prevention, not on lipid-lowering therapy**, and a
**valid LDL-C result** under the method rules (§8). They are not applied to children/adolescents,
pregnancy, or where the calculated value is invalid, for whom BioSense abstains (§15).

## 11.4 Risk-stratified goal display — [C]
If a user **declares** an established higher-risk condition, the engine **may** additionally
display the recognised guideline goal for context — e.g. LDL-C **<55** (very-high) or **<70**
(high) mg/dL, ESC/EAS 2019 & ACC/AHA (L6, L7) — clearly labelled a **guideline goal (Category A)**
with CAV5-style framing. The BioSense wellness band is still shown; the goal is context, never an
instruction, never recomputed as a band. **[C][D]**

## 11.5 Never inferred [D]
Risk context, therapy status, pregnancy, and calculation method (where derivable) come only from
declared or lab-reported data. BioSense **never** infers risk category or a diagnosis from the
LDL-C value itself.

## 11.6 The low end — no wellness penalty [B][D]
As with ApoB (and unlike HbA1c), LDL-C banding is **monotonic, lower-better, with no low-end
wellness penalty.** A low LDL-C is never scored adverse or alarmed. A markedly low untreated value
receives neutral "worth mentioning" wording without naming a cause (S5). **[D]**

---

# 12. Interpretation Framework

BioSense interprets LDL-C in a fixed, deterministic order (consistent with the ENG four-state
model), with a method-and-triglyceride validity gate specific to LDL-C. **[C]**

```
1. VALIDITY   — is the value interpretable? (unit known; result final; and the METHOD-VALIDITY
                rule §8.2: Friedewald + TG>=400 → INVALID) → if invalid, DISPLAY, do NOT band,
                explain calmly (CAV4), route to professional.
2. ELIGIBILITY— may we band this person? (general adult, not pregnant, primary-prevention default)
                → if not, abstain, offer appropriate wording (§15).
3. CONFIDENCE — method-aware (§8.2) + reducers (§13) → HIGH / REDUCED.
4. BAND       — assign BioSense wellness interpretation band (§11).
5. CONTEXT    — cross-marker hierarchy (§9): ApoB concordance/weighting, non-HDL-C corroboration;
                declared risk-goal display (§11.4).
6. NARRATIVE  — select wellness narrative (§24) + mandatory caveats (§0.8).
```

**Core interpretive stance [B]:** LDL-C is a modifiable long-term cardiovascular-wellness signal
to optimise and track, read in the context of ApoB and non-HDL-C, never a diagnosis. **[B][D]**

---

# 13. Confidence Assessment  *(adapted: method- and triglyceride-aware)*

Confidence is computed, not guessed, starting HIGH; the method sets the baseline and reducers
lower it. Each applied reducer is named (CAV3). Separately, the §8.2 invalidity rule stops banding
(a validity failure, not a reducer). **[A]/[D]**

| Confidence input | Effect | Source |
|---|---|---|
| Method = Martin/Hopkins or Sampson/NIH | Standard confidence (preferred) | [L13-L15] |
| Method = Friedewald, TG 150–399 mg/dL | REDUCED | [L11,L12] |
| Method = Friedewald, LDL-C <70 mg/dL | REDUCED (underestimation) | [L12] |
| Method = Friedewald, both above present | REDUCED (compounded) | [L11,L12] |
| Method = Direct | Bandable; not auto-upgraded; apply lab-flagged limits | [L16] |
| Method = Unknown | REDUCED ("method unknown"); escalate/abstain if TG≥400 | [C] |
| Non-fasting sample with elevated TG (calculated) | REDUCED | [L22] |
| Method change between tests | REDUCED (trend caution) | [A] |
| On lipid-lowering therapy | REDUCED (treated state) | [A] |
| ApoB/LDL-C discordance present | REDUCED for LDL-C-alone reliance; weight ApoB | [L21] |
| Value near a band boundary | REDUCED | [B] |

| Validity-INVALID (banding STOPPED) | Source |
|---|---|
| Friedewald AND TG ≥400 mg/dL (≥4.5 mmol/L) | [L11] |
| Unit unknown / result non-final | [ENG] |

---

# 14. Wellness Interpretation

Interpretation-by-interpretation wellness guidance, general adult, for a **valid** LDL-C. All
wording is wellness, not medical, and never uses diagnostic labels. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal** *(LDL-C < 100 mg/dL).* "Your LDL-C is in an optimal
  wellness range — a favourable cholesterol-mass burden for long-term cardiovascular wellness. A
  great result to maintain." **[B]**
- **BioSense Wellness Interpretation: Above Optimal** *(100–129).* "Your LDL-C is good, with clear
  room to optimise. Diet quality, fibre, and activity all help move it." **[B]**
- **BioSense Wellness Interpretation: Elevated** *(130–159).* "Your LDL-C is above the
  wellness-desirable range — a meaningful, modifiable opportunity. Reducing saturated fat and
  adding soluble fibre are among the most effective steps; tracking over time will show progress." **[B]**
- **BioSense Wellness Interpretation: High** *(160–189).* "Your LDL-C is notably above the desirable
  range. Lifestyle changes are impactful here, and it may be worth discussing your result with a
  healthcare professional to look at your full picture." Constructive + gentle healthcare-review. **[B][D]**
- **BioSense Wellness Interpretation: Significantly Elevated** *(≥190).* "Your LDL-C is well above
  the typical range. Alongside lifestyle steps, it would be worth discussing this result with a
  healthcare professional who can look at your full picture." Calm, non-alarming, healthcare-review
  (CAV5). **[B][D]**

**Cross-marker modifier (when ApoB present):** where LDL-C and ApoB are **discordant**, the
narrative explains they describe related-but-different things and that ApoB better reflects
particle number — giving ApoB greater weight in high-triglyceride, metabolic, or very-low-LDL-C
settings (CAV6). Never averaged, never substituted silently (S12). **[D][L21]**

Every interpretation pairs the reading with a lifestyle lever (§17) and the mandatory caveats
(§0.8). **None names a condition.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains from banding** where its general-adult bands don't apply or the value is
invalid, and says so plainly. **[C]/[D]/[E]**

- **15.1 Children & adolescents.** General-adult bands not applied; display, suggest professional
  interpretation. **[D]**
- **15.2 Pregnancy.** Lipids shift physiologically; BioSense does not band, notes pregnancy affects
  lipid levels, defers to a professional. **[D]**
- **15.3 Invalid calculated value (Friedewald + TG ≥400).** Validity-abstain: display the value,
  explain the estimate may be unreliable in this sample, route to a professional (CAV4). Never
  "corrected," never silently recalculated. **[D][L11]**
- **15.4 Markedly low LDL-C (untreated).** Never a wellness concern, never penalised; neutral
  "worth mentioning" wording without naming a cause (S5). **[D]**
- **15.5 On lipid-lowering therapy.** Band allowed, framed as reflecting current management; never
  any implication about changing treatment (S6). **[D]**
- **15.6 Higher-risk declared context.** Band shown; guideline goal added as context (§11.4). **[C]**

**Abstention is a first-class, non-error output**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **What counts as a real change. [A][E]** Small differences can be biological or between-method
  variation; BioSense frames a change as meaningful only when it exceeds normal variation and isn't
  explained by a method change.
- **Method changes matter especially for LDL-C. [A]** A change between a Friedewald result and a
  Martin/Hopkins or direct result may be method-driven, not a true change; flagged, not treated as
  real. **[L13]**
- **Validity-invalid points excluded. [A]** An invalid calculated value (§8.2) is excluded from
  trend so it never produces a false signal. **[L11]**
- **Direction & framing. [B]** Downward = improving (encouraged); upward = a calm optimisation
  prompt. Within-range improvement is acknowledged. Low-end has no penalty (§11.6).
- **Cumulative wellness framing. [B]** A sustained favourable LDL-C trajectory is described as
  reducing long-term cholesterol-mass exposure — never as a change in a risk score.

---

# 17. Lifestyle Optimisation Guidance

Lifestyle is always the first tier, and LDL-C is highly lifestyle-responsive. **[A]/[B]**

## 17.1 Nutrition [A][L24]
- **Reduce saturated and trans fat; replace with unsaturated fats** — the primary dietary lever on
  LDL-C. **Strong evidence.** **[A]**
- **Soluble (viscous) fibre ~10–25 g/day** and **plant stanols/sterols ~2 g/day** meaningfully
  lower LDL-C. <cite index="29-1">Consider increased viscous (soluble) fiber (10-25 g/day) and plant stanols/sterols (2g/day) as therapeutic options to enhance LDL lowering.</cite> **Strong evidence.** **[A]**
- **Whole-food dietary pattern** (Mediterranean-style) supports lower LDL-C. **[A]**

## 17.2 Physical activity [A][B]
Regular activity supports healthier lipid profiles and body composition. Moderate evidence for
direct LDL-C effect; strong for overall cardiovascular wellness.

## 17.3 Weight / body composition [A]
Where relevant, fat loss improves the lipid profile. **[A]**

## 17.4 Sleep, alcohol, smoking [A][B]
Adequate sleep, alcohol moderation, and not smoking support cardiovascular wellness. Standard
guidance.

## 17.5 Framing rules [B][D]
Lifestyle first; medication never suggested. Effect sizes honest: lifestyle produces meaningful
but modest LDL-C reductions; at Significantly Elevated, pair with a healthcare-review suggestion.

---

# 18. AI Reasoning Constraints

The AI narrative layer **renders** deterministic decisions; it does not make clinical judgements
(PI-4). **[D]**

The AI layer **may**: explain the band and what LDL-C is, in warm wellness language; connect to
lifestyle levers; explain the ApoB/LDL-C/non-HDL-C relationship at a wellness level; acknowledge
progress; express abstention respectfully.

The AI layer **must never**:
- state or imply a diagnosis or condition, including familial hypercholesterolaemia — even to deny
  it (S1, S3)
- produce a numeric cardiovascular risk % from LDL-C (S7)
- recommend starting/stopping/changing medication (S6)
- present a BioSense band as a medical/diagnostic boundary (S10)
- average or substitute LDL-C and ApoB, or silently recalculate LDL-C (S11, S12)
- interpret or band an invalid calculated value (S9)
- infer risk context, therapy, or pregnancy from the value

Enforcement is by output validation on rendered text, not by prompt alone. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis.** Every output carries CAV1; ≥190 mg/dL is a pattern → calm healthcare-review,
  **no condition named** (S3, consistent with SCL-001 FH discipline). **[D][L23]**
- **One factor among many.** CAV2 frames LDL-C as one cardiovascular-wellness marker, read with
  ApoB and non-HDL-C. **[D]**
- **Method honesty.** Where a calculated value is unreliable/invalid, BioSense says so and routes
  to a professional rather than delivering false reassurance or alarm (CAV4). **[D][L11]**
- **No medication guidance.** Medication questions → educational context + referral (S6, S8). **[D]**
- **No alarm.** Even the highest band uses calm, constructive language with a healthcare-review
  suggestion (S4, CAV5). **[D]**
- **Low values not pathologised.** Neutral wording, no cause named (S5). **[D]**
- **No silent recalculation.** BioSense preserves the lab-reported value (S11). **[D]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional
when: **[D]**
1. LDL-C is **Significantly Elevated (≥190 mg/dL)** — CAV5. **[L5]**
2. LDL-C is **High (160–189)** — gentle healthcare-review suggestion. **[L4]**
3. The calculated value is **invalid** (§8.2) — interpretation belongs with a professional (CAV4). **[L11]**
4. **Marked ApoB/LDL-C discordance** — the picture benefits from professional interpretation. **[L21]**
5. LDL-C is **markedly low** in an untreated person — neutral "worth mentioning," no cause named (S5).
6. The user is in an **abstention population** (child/adolescent, pregnancy). 
7. The user **declares higher risk** and would benefit from personalised goals (§11.4).
8. The user **asks a medical or medication question** (S8).

All suggestions are wellness-framed, non-urgent, non-diagnostic; no emergency instructions. **[D]**

---

# 21. BioSense Product Integration

How SCL-003 plugs into the existing platform (no architecture change): **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for LDL-C, plus available
  triglycerides, HDL-C/total cholesterol (for non-HDL-C), ApoB, method, and fasting status.
- **Preserves (engineering requirement, founder decision):** the raw lab-reported LDL-C value, the
  reported method, triglyceride concentration, fasting status, direct-vs-calculated status,
  confidence reducers, bandability status, abstention reason, and cross-marker discordance state.
  **The engine never silently recalculates or replaces the lab-reported LDL-C.** **[C]**
- **Supplies (as CSL bindings):** the wellness interpretation bands (Category B), guideline goals
  (Category A), the method-confidence model, the ApoB/non-HDL-C hierarchy, safety rules, lifestyle
  evidence, and narrative templates — each with value + source-ID + category + version.
- **Respects:** every ENG platform invariant; the SCL-001 discordance discipline (never average,
  never substitute).
- **Future derived-LDL-C service:** if BioSense ever calculates LDL-C itself, that must be a
  **separately governed, versioned, validated derived-biomarker implementation** with its own
  equation version, inputs, validation, and provenance (§23). **[C]**
- **Score contribution:** LDL-C contributes to the cardiovascular-wellness domain as a monotonic
  (lower-better) input, no low-end penalty; invalid values do not contribute; where ApoB is
  present and discordant, weighting follows the hierarchy (§9). **[C]**

---

# 22. Medication Context (educational only)

Educational context only; BioSense does not instruct on starting, stopping, or changing
medication (S6). **[D]**
- Several classes of lipid-lowering medication exist and are prescribed/adjusted by clinicians on
  the full clinical picture; a person's LDL-C on treatment reflects that management. **[A]**
- Risk-stratified LDL-C goals (e.g. <55/<70/<100 mg/dL by risk) are individualised clinical
  decisions, not BioSense wellness thresholds. **[A][L6-L8]**
- Any medication question → educational context + suggestion to speak with a healthcare
  professional (S8). **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **No formal "wellness optimal" for healthy adults. [E]** The Optimal <100 band adopts the ATP
   III "optimal," a reasonable, widely-used anchor rather than a wellness-specific target.
2. **Direct-assay standardisation varies. [E]** Direct LDL-C is not automatically a reference; its
   confidence is not auto-upgraded (§8.2). **[L16]**
3. **Equation performance varies by assay and population. [E]** The method hierarchy reflects
   large validation studies but individual-lab performance differs; BioSense uses confidence
   reducers rather than claiming a single universally correct equation. **[L11-L15]**
4. **Non-HDL-C thresholds not separately banded in V1. [E]** Used as corroborating context (+30
   mg/dL relationship), not as an independent band set in this pack.
5. **Discordance weighting is qualitative in V1. [E]** BioSense surfaces discordance and weights
   ApoB, but does not compute a numeric combined score.

---

# 24. Narrative Generation Templates

Deterministic templates the AI layer renders (warm wellness tone; caveats appended; never
diagnostic labels). **[B]/[D]** (Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL
"Your LDL-C is {value} mg/dL ({mmol} mmol/L) — in an optimal wellness range, a favourable
 cholesterol-mass burden for long-term cardiovascular wellness. A wonderful result to maintain."
 +CAV1 +CAV2

TEMPLATE: ABOVE_OPTIMAL
"Your LDL-C is {value} mg/dL ({mmol} mmol/L) — good, with clear room to optimise. Diet quality,
 soluble fibre, and activity all help."  +CAV1 +CAV2

TEMPLATE: ELEVATED
"Your LDL-C is {value} mg/dL ({mmol} mmol/L) — above the wellness-desirable range, and a
 meaningful, modifiable opportunity. Reducing saturated fat and adding soluble fibre are among
 the most effective steps; tracking over time will show your progress."  +CAV1 +CAV2

TEMPLATE: HIGH
"Your LDL-C is {value} mg/dL ({mmol} mmol/L) — notably above the desirable range. Lifestyle
 changes are impactful here, and it may be worth discussing your result with a healthcare
 professional to look at the full picture."  +CAV1 +CAV2 +CAV5

TEMPLATE: SIGNIFICANTLY_ELEVATED
"Your LDL-C is {value} mg/dL ({mmol} mmol/L) — well above the typical range. Alongside lifestyle
 steps, it would be worth discussing this result with a healthcare professional who can look at
 your full picture."  +CAV1 +CAV2 +CAV5

MODIFIER: REDUCED_CONFIDENCE → append CAV3 naming reducer(s), e.g.
 "This LDL-C was calculated with the Friedewald method at a higher triglyceride level, which can
  reduce its accuracy — treat it as a guide and consider re-checking."

MODIFIER: VALIDITY_ABSTAIN (Friedewald + TG>=400) →
 "We're not scoring this LDL-C: it was calculated in a sample with high triglycerides, where this
  estimate may not be reliable. It's best interpreted with a healthcare professional."  +CAV1 +CAV4

MODIFIER: DISCORDANCE_WITH_APOB →
 "Your LDL-C and ApoB describe related but different things — cholesterol carried versus the number
  of particles carrying it. Where they differ, ApoB better reflects particle number, so we give it
  more weight here."  +CAV6

MODIFIER: LOW (markedly low, untreated) →
 "Your LDL-C is on the low side. From a cardiovascular-wellness view that's favourable, and it may
  simply be worth mentioning to a doctor at some point."  +CAV1   (no cause named — S5)

MODIFIER: HIGHER_RISK_DECLARED → append guideline goal + context framing.
```

**Absolute rule:** no template or modifier ever names a condition (including FH) or presents a
band as a diagnosis. **[D][S3]**

---

# 25. Example Outputs

**Example 1 — Optimal, Martin/Hopkins, high confidence. [illustrative]**
```
Input: LDL-C 88 mg/dL, method Martin/Hopkins, TG 90, adult, no declared risk.
Band: OPTIMAL | Method-confidence: standard | Confidence: HIGH | Valid: true
Narrative: OPTIMAL +CAV1+CAV2 ; Rec: Tier 1 maintain; Tier 2 re-check ~12 months.
```

**Example 2 — Elevated, Friedewald + moderate TG → reduced confidence. [illustrative]**
```
Input: LDL-C 142 mg/dL, method Friedewald, TG 260, adult.
Band: ELEVATED | Confidence: REDUCED (Friedewald + TG 150–399) | Valid: true
Narrative: ELEVATED +CAV1+CAV2 +CAV3("Friedewald at higher triglycerides"); Rec: Tier 1 lifestyle; re-check.
```

**Example 3 — Friedewald + TG ≥400 → validity abstain. [illustrative]**
```
Input: LDL-C 96 mg/dL (Friedewald), TG 520, adult.
Band: (none) | Valid: INVALID (Friedewald + TG>=400) | Abstained: true | value displayed
Narrative: VALIDITY_ABSTAIN +CAV1+CAV4  (route to professional; no recalculation)
```

**Example 4 — Discordance with ApoB. [illustrative]**
```
Input: LDL-C 105 mg/dL (Above Optimal), ApoB 130 mg/dL (SCL-001 Significantly Elevated), TG 210.
Band: ABOVE_OPTIMAL (LDL-C) | Discordance: true → ApoB weighted
Narrative: ABOVE_OPTIMAL + DISCORDANCE_WITH_APOB modifier +CAV6  (never averaged; ApoB surfaced)
```

**Example 5 — Significantly elevated. [illustrative]**
```
Input: LDL-C 205 mg/dL, method direct, adult, no declared risk.
Band: SIGNIFICANTLY_ELEVATED | Confidence: HIGH | Valid: true
Narrative: SIGNIFICANTLY_ELEVATED +CAV1+CAV2+CAV5
NOTE: no condition named; no risk %; no medication mention.  [S1,S3,S6,S7]
```

**Example 6 — Method unknown. [illustrative]**
```
Input: LDL-C 120 mg/dL, method UNKNOWN, TG 130, adult.
Band: ABOVE_OPTIMAL | Confidence: REDUCED ("method unknown") | Valid: true
Narrative: ABOVE_OPTIMAL +CAV1+CAV2 +CAV3("calculation method not specified")
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, discordance discipline, PI-4 rendering, governance).
- **SCL-001 (ApoB)** — the frozen template and the primary particle-burden marker; the ApoB/LDL-C
  discordance hierarchy in §9/§14 is consistent with SCL-001.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§0 Implementation Summary** — developer-facing activation values.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the L-series IDs
> in §0 and the body. Developers finalising the pack should confirm exact page/table locators
> against the primary PDFs where required.

**Guidelines & population categories (Category A anchors)**

1. Grundy SM, Cleeman JI, et al. **Third Report of the National Cholesterol Education Program (NCEP)
   Expert Panel (ATP III), Final Report.** *Circulation* 2002;106(25):3143–3421. — *LDL-C categories
   <100 optimal / 100–129 / 130–159 / 160–189 / ≥190; non-HDL-C = TC − HDL, goal +30 mg/dL
   (L1–L5, L18, L19).*
2. Mach F, Baigent C, Catapano AL, et al. **2019 ESC/EAS Guidelines for the management of
   dyslipidaemias.** *European Heart Journal* 2020;41(1):111–188. doi:10.1093/eurheartj/ehz455. —
   *Risk-stratified LDL-C goals <55 / <70 / <100 / <116 mg/dL (L6–L9).*
3. Grundy SM, Stone NJ, et al. **2018 AHA/ACC/Multisociety Cholesterol Guideline.** *Circulation*
   2019;139(25):e1082–e1143. — *LDL-C goals <100/<70/<55; ≥190 statin; earlier intervention (L5–L8, L23).*
4. American College of Cardiology / American Heart Association. **2026 Guideline for the Management
   of Dyslipidemia** (issued March 2026). — *LDL-C goals <100/<70/<55 mg/dL; ApoB may be a more
   accurate risk marker than LDL-C in high-TG/T2D/CKM/known CVD; ≥190 earlier pharmacotherapy
   (L6–L8, L21, L23).*

**Calculation-method accuracy (Category A/M — validation studies)**

5. Friedewald WT, Levy RI, Fredrickson DS. **Estimation of LDL-C without use of the preparative
   ultracentrifuge.** *Clin Chem* 1972;18(6):499–502. — *Friedewald equation (L10).*
6. Martin SS, Blaha MJ, et al. **Comparison of a novel method vs the Friedewald equation for
   estimating LDL-C.** *JAMA* 2013;310(19):2061–2068; and Martin/Hopkins validation series. —
   *Martin/Hopkins accuracy, esp. low LDL-C / moderate TG (L13).*
7. Sampson M, Ling C, et al. **A new equation for calculation of LDL-C in patients with
   normolipidemia and/or hypertriglyceridemia (up to 800 mg/dL).** *JAMA Cardiology*
   2020;5(5):540–548. — *Sampson/NIH equation 2 (L15).*
8. Sajja A, Park J, et al. **Comparison of Methods to Estimate LDL-C in Patients With High
   Triglyceride Levels (400–799 mg/dL).** *JAMA Network Open* 2021;4(10):e2128817. — *Extended
   Martin/Hopkins most accurate at TG 400–799 (62.1% vs Sampson 40.4% vs Friedewald 19.3%);
   VLDoL n=111,939 (L14).*
9. Wolska A, Remaley AT, et al. **LDL-C calculated by Friedewald, Martin-Hopkins, or NIH equation 2
   vs beta-quantification: pooled alirocumab trials.** *Journal of Lipid Research* 2022;63(1). —
   *Friedewald unreliable at TG >400; accuracy loss at TG ≥150 / LDL-C <70 (L11, L12, L17).*
10. Comparative validation studies of Friedewald/Martin-Hopkins/Sampson (PMC9106156; PMC11433184;
    ScienceDirect S000991202200176X; AJCP 2024;162 Suppl_1:S168). — *Method hierarchy; direct-assay
    standardisation limitation; underestimation at low LDL-C (L13–L16).*

**Non-HDL-C & ApoB context (Category A)**

11. NCEP ATP III non-HDL-C guidance; PCNA LDL vs non-HDL-C calculator; Virani SS et al. reviews of
    non-HDL-C as a quality metric. — *Non-HDL-C definition, +30 mg/dL goal, atherogenic-lipoprotein
    coverage (L18–L20).*
12. Sniderman AD, et al.; NLA 2024 (per SCL-001) and ACC/AHA 2026 — *ApoB > LDL-C in specific groups
    (L21).*

**Lifestyle (Category A)**

13. NCEP ATP III Therapeutic Lifestyle Changes; 2018/2026 ACC/AHA lifestyle recommendations. —
    *Saturated/trans fat reduction; soluble fibre 10–25 g/day; plant stanols 2 g/day; activity;
    weight (L24).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–4; they
> are BioSense Version 1 classifications, not attributable to any single reference as a diagnostic
> threshold, and do not restate diagnostic/treatment labels.

---

# 28. Founder Decisions Required

The core LDL-C methodology was resolved by founder decision (method-aware validity/confidence;
ApoB/non-HDL-C hierarchy; no silent recalculation) and is implemented in this pack. Two residual
presentation/policy items remain optional: **[C][E]**

**D-1 — Confirm the BioSense V1 Wellness Interpretation Band boundaries.** §11 adopts the ATP III
population categories (100/130/160/190). Confirmation requested that these population categories
(rather than the lower risk-stratified treatment goals) are the correct wellness anchor for the
general-adult default. **Founder sign-off requested.**

**D-2 — Risk-stratified goal display policy.** §11.4 proposes showing recognised LDL-C goals
(<55/<70/<100) as context for users who declare higher risk. **Founder decision requested** on
whether V1 displays these and with what framing.

*(Both affect presentation/positioning, not the underlying evidence or the resolved methodology.)*

---

**END OF SCL-003 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A]
guideline/validation figure or a transparently-labelled Category [B] BioSense wellness
interpretation. No value was fabricated; every Category [A] number was retrieved and verified
during authoring and traces to §27. The method-aware validity/confidence model, triglyceride
rules, and ApoB/non-HDL-C hierarchy were adapted per the founder decision; all other structure
follows SCL-001 exactly.*
