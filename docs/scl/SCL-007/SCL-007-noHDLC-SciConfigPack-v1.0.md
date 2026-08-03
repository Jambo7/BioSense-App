# SCL-007 — NON-HDL CHOLESTEROL (non-HDL-C)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *First BioSense Derived-Biomarker Pack — establishes the derived-biomarker governance pattern*

**Document ID:** SCL-007
**Biomarker:** Non-HDL Cholesterol (non-HDL-C) — **derived** (Total Cholesterol − HDL-C)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Structure preserved; the derivation/governance sections are a genuine structural adaptation required by the founder decision, and establish the reusable BioSense derived-biomarker pattern. All unaffected sections remain consistent with SCL-001 through SCL-006.

---

> **What this document is.** SCL-007 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for non-HDL-C. It also establishes the
> **BioSense derived-biomarker governance pattern** for future derived markers. It does not redesign the
> Constitution, the ENG documents, the Blood Analysis Engine, or the SCL architecture.
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

## STRUCTURAL-FIT NOTE (non-HDL-C vs SCL-001) — the largest adaptation in the library so far

non-HDL-C is the first biomarker in the library that is **not independently measured**. It is
**derived** from two parent observations: Total Cholesterol and HDL-C. This is exactly the case the
frozen SCL-003 founder decision reserved for a *"separately governed, versioned, validated
derived-biomarker implementation with its own equation version, inputs, validation and provenance."*
SCL-007 is that implementation, and it establishes the reusable pattern.

The overall structure, section order, content-classification scheme (A–E), safety posture,
recommendation-ladder shape, narrative-contract, governance/versioning, and the
lower-better-with-no-low-end-penalty direction were **preserved exactly**. The following required
genuine adaptation (founder decision §1–§7):

1. **Derivation & provenance (§5, §8, §21, App-4) — new.** Eligibility, the versioned equation, full
   parent-observation provenance, rounding/normalisation.
2. **Reported-vs-derived reconciliation (§8, §23, App-4) — new.** Preserve any lab-reported non-HDL-C,
   derive independently, use the derived value as canonical, treat reported as corroboration, and raise
   a **discrepancy state** with reduced confidence when they disagree beyond a governed, analytically
   anchored tolerance.
3. **Confidence inheritance & validity propagation (§13, §15) — new.** *Reduced confidence propagates;
   invalidity blocks.* non-HDL-C inherits the lower parent confidence and abstains if either parent is
   invalid/missing/ineligible.
4. **Recalculation & audit (§16, §21, App-4) — new.** Recompute on parent correction; retain superseded
   derived observations; never mutate historical provenance.
5. **ApoB relationship (§9, §14) — emphasis.** Independently bandable; ApoB weighted for particle
   number; never averaged.

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

Non-HDL-C is one of the most useful numbers in preventative lipidology, and it is the first that
BioSense *computes* rather than receives. That distinction matters, and BioSense treats it with
engineering rigour: non-HDL-C is derived only from valid, same-sample parent measurements, with a
versioned equation and full provenance; a lab-reported non-HDL-C is preserved and used as corroboration
rather than silently overwritten; and the derived value is only ever as trustworthy as its parents, so
its confidence is inherited from them. Scientifically, non-HDL-C captures the cholesterol carried across
*all* the atherogenic lipoproteins, which makes it a strong, stable measure of cholesterol burden — read
alongside ApoB, never merged with it.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as
the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate non-HDL-C. Every value carries a source ID (N-series / G-series →
> §27) and a category tag. Canonical unit: mg/dL (store mmol/L in parallel). **non-HDL-C is a governed
> derived biomarker.**

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: mg/dL          # store mmol/L parallel
mg/dL = mmol/L × 38.67 ; mmol/L = mg/dL ÷ 38.67   (cholesterol factor)          [N12]
Always retain parent value_reported + unit_reported. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 Derivation (governed) — [A]+[C] (founder §1)
```
EQUATION: non_HDL_C = Total_Cholesterol − HDL_C                                  [N1]
equation_id: BIOSENSE_NON_HDL_C_EQUATION_v1   (final id per ENG naming conventions)
ELIGIBILITY: derive ONLY when BOTH parents are valid, unit-known, final, and from the SAME sample/panel.
  NEVER derive from guessed / imputed / unit-unknown inputs.                      [G1]
PROVENANCE (retain on the derived observation):                                  [G2]
  equation_id + version | TC_parent_obs_id | HDLC_parent_obs_id |
  parent original values+units | normalised values used | sample_date + panel_id |
  calculation_timestamp | config_version | rounding_policy_applied
ROUNDING: normalise parents to canonical unit; compute; round to reporting precision (1 mg/dL); record policy.
```

## 0.3 Reported-vs-derived reconciliation — [C] (founder §2)
```
IF lab also reports non-HDL-C:
  preserve reported value+unit+provenance unchanged; derive independently; DERIVED = CANONICAL for interpretation;
  REPORTED = corroboration. NEVER average. NEVER silently overwrite/discard.      [G3]
COMPARISON TOLERANCE (BioSense V1 calc-QA policy, analytically anchored — G4):
  material_disagreement IF |reported − derived| > max(15 mg/dL, 10% of derived).
  (Floor derived from NCEP analytical total error TC≤8.9% ⊕ HDL≤15% combined in quadrature ≈ 19 mg/dL
   at typical values; 15 mg/dL is a conservative rounded floor; 10% scales upward.) [N13,N14]
  within tolerance → reported = corroborating; use derived.
  beyond tolerance → DISCREPANCY state: preserve both; reduce confidence; state calmly they don't align;
     imply neither is certainly correct; suggest checking the lab report / discussing.  [G3][D]
```

## 0.4 Confidence inheritance & validity propagation — [C] (founder §3, §4)
```
RULE: reduced-confidence PROPAGATES; invalidity BLOCKS.                          [G5]
both parents valid + standard-confidence → derive; band; confidence = STANDARD.
one/both parents valid but reduced-confidence → derive; inherit LOWEST parent confidence; band cautiously;
   carry EVERY applicable parent reducer into the non-HDL-C result + narrative.   [G5]
either parent invalid / missing / unit-unknown / validity-suspect-to-abstention / mismatched sample-date /
   not-final → DO NOT derive/band → explained ABSTENTION naming the blocking parent.  [G5]
ACUTE-ILLNESS HDL-C (SCL-004): if HDL-C parent remains valid+bandable → derive + reduce confidence + caveat;
   if SCL-004 REQUIRES abstention for that HDL-C → do NOT derive. Parent's validity decision is authoritative. [G6]
```

## 0.5 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors N3–N5)
```
NONHDLC_WELLNESS_BAND (mg/dL, general adult, primary prevention, untreated, valid derivation):
  OPTIMAL                 < 130          # primary-prevention target; LDL<100 +30 [N3][N4]
  ABOVE_OPTIMAL           130 – 159      # between primary and intermediate goal [N3][N5]
  ELEVATED                160 – 189      # intermediate-risk goal boundary (LDL<130 +30) [N5]
  HIGH                    190 – 219      # lower-risk goal boundary (LDL<160 +30) [N5]
  SIGNIFICANTLY_ELEVATED  ≥ 220          # well above lower-risk goal [N5]
DIRECTION: LOWER_BETTER, no low-end penalty (as ApoB/LDL-C).  [B][N19]
mmol/L parallels: 130≈3.4 | 160≈4.1 | 190≈4.9 | 220≈5.7
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. [B][D]**

## 0.6 Deterministic safety & suppression rules — [D]
```
S1  non-HDL-C is NOT a diagnosis. Never state/imply disease.
S2  non-HDL-C is ONE marker of atherogenic cholesterol burden, never a risk score.
S3  SIGNIFICANTLY_ELEVATED (≥220) → calm healthcare-review wording.
S4  Low non-HDL-C is NOT a concern and NEVER penalised.
S5  Never recommend starting/stopping/changing medication.
S6  Never produce a numeric cardiovascular risk % from non-HDL-C.
S7  On any medication/therapy question → educational context + refer.
S8  ABSTAIN (never derive) if either parent is invalid/missing/ineligible; explain which parent.  [G5]
S9  Never present a BioSense band as a medical/diagnostic boundary.
S10 Never silently overwrite/discard a lab-reported non-HDL-C; never average reported & derived.  [G3]
S11 On reported-vs-derived discrepancy, state calmly, imply neither is certainly correct, reduce confidence. [G3]
S12 On ApoB/non-HDL-C discordance, never average or substitute; surface; ApoB weighted for particle number. [G6-role]
```

## 0.7 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 LIFESTYLE (always first): reduce saturated & trans fat; increase soluble fibre; unsaturated fats;
   activity; weight management — the same cholesterol-lowering levers as LDL-C.   [N18]
Tier 2 CONTEXT / TRACK: read with ApoB/LDL-C/triglycerides; especially informative when TG ≥200 or LDL-C
   calculation is unreliable (ties SCL-003/SCL-005); confirm derivation validity.  [N8]
Tier 3 HEALTHCARE DISCUSSION (calm) when: SIGNIFICANTLY_ELEVATED | reported-vs-derived discrepancy |
   marked ApoB/non-HDL-C discordance | parent-abstention | medical question.       [D]
NEVER a medication instruction at any tier.
```

## 0.8 Narrative selection rules — [B]/[D]
```
band → template; modulated by inherited confidence + derivation/reconciliation state.
OPTIMAL/ABOVE_OPTIMAL     → affirming / gently constructive.
ELEVATED/HIGH             → constructive, optimisation-focused.
SIGNIFICANTLY_ELEVATED    → calm + healthcare-review [D].
parent-abstention         → explain which parent prevented the calculation; route.
discrepancy               → calmly note reported & calculated don't align; reduced confidence.
discordance-with-ApoB     → related-but-different; ApoB weighted for particle number.
Never "normal/abnormal"; never diagnosis language.
```

## 0.9 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Non-HDL-C reflects cholesterol across all your atherogenic particles; it's one of several markers."
CAV3 (inherited reduced confidence) name the parent reducer(s) carried through (e.g. HDL-C drawn during illness).
CAV4 (parent abstention) "We couldn't calculate your non-HDL-C because {parent} wasn't available/valid."
CAV5 (significantly elevated) "It may be worth discussing this result with a healthcare professional."
CAV6 (reported-vs-derived discrepancy) "Your lab's non-HDL-C and our calculated value don't fully align;
      it's worth checking the original report."
CAV7 (ApoB available/discordant) "Non-HDL-C and ApoB describe related but different things; where they
      differ, ApoB better reflects particle number."
```

## 0.10 Source & version identifiers
```
config_id: SCL-007   config_version: 1.0
equation_id: BIOSENSE_NON_HDL_C_EQUATION_v1                (Category A derivation; N1)
band_set_id: BIOSENSE_NONHDLC_WELLNESS_BANDS_v1           (Category B; anchors N3-N5)
derivation_governance_id: SCL007_DERIVED_BIOMARKER_PATTERN_v1  (founder §1-§7; G1-G7)
reconciliation_id: SCL007_REPORTED_VS_DERIVED_v1          (G3; tolerance G4 from N13,N14)
confidence_model_id: SCL007_CONFIDENCE_INHERITANCE_v1     (G5,G6)
guideline_targets_id: NCEP_ATP_III / ESC_EAS_2019         (Category A; N3-N7)
safety_rules_id: SCL007_SAFETY_v1                         (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Non-HDL cholesterol (non-HDL-C) is the total cholesterol carried by all the atherogenic ("bad")
lipoproteins together — everything except HDL. **[A]** It is obtained by subtracting HDL-C from total
cholesterol. <cite index="87-1">You can calculate it by subtracting your HDL from your total cholesterol. For example, if your total cholesterol is 180 and your HDL is 60, then your non-HDL is 120.</cite> **[A][N1]**

Because it sums the cholesterol in LDL, VLDL, IDL, remnant particles, and Lp(a), non-HDL-C gives a
fuller picture of atherogenic cholesterol burden than LDL-C alone, and it is a strong, stable predictor
of cardiovascular outcomes. <cite index="83-1">Non-HDL cholesterol represents the total atherogenic cholesterol burden, capturing all lipoproteins except HDL—including LDL, VLDL, remnant lipoproteins, and lipoprotein(a)—making it a powerful independent predictor of cardiovascular events.</cite> **[A][N2][N17]**

For BioSense, non-HDL-C is also significant as the **first derived biomarker**: it is computed from two
parent measurements under formal governance, not measured directly. That governance — eligibility,
versioned equation, provenance, confidence inheritance, reconciliation, recalculation, audit — is the
reusable pattern this pack establishes.

- **Official name:** Non-HDL cholesterol
- **Common abbreviation:** non-HDL-C
- **Reported in:** mg/dL and mmol/L **[A]**
- **Derived:** non-HDL-C = Total Cholesterol − HDL-C **[A][N1]**
- **BioSense role:** A derived, independently bandable measure of atherogenic cholesterol burden, read alongside ApoB and LDL-C.

---

# 2. Physiological Function

Cholesterol is carried through the blood inside lipoproteins. HDL particles are involved in returning
cholesterol toward the liver and are not atherogenic; every other cholesterol-carrying particle — LDL,
VLDL, IDL, remnants, Lp(a) — can contribute to arterial plaque. **[A]** Non-HDL-C simply adds up the
cholesterol in all of those atherogenic particles, which is why it tracks cardiovascular risk well and
is especially informative when triglyceride-rich particles are elevated. **[A][N2][N8]**

Two points shape interpretation **[A]**:
- **It is a cholesterol *mass* measure across particles**, not a particle *count* — that is ApoB's role
  (§9). **[A][N11]**
- **It is stable and lifestyle-responsive.** It changes little with fasting and responds to the same
  cholesterol-lowering habits as LDL-C. **[A][N10][N18]**

---

# 3. Scientific Background

Non-HDL-C entered guidelines as a secondary lipid target, defined simply and consistently. Its goals are
set a fixed distance above the corresponding LDL-C goals. <cite index="85-1">According to cholesterol guidelines, your non-HDL cholesterol level goal should be 30 mg/dL higher than your LDL cholesterol level goal. For example, if you are aiming for an LDL cholesterol level of less than 100 mg/dL, then your goal for non-HDL would be less than 130 mg/dL.</cite> **[A][N3][N4]** The relationship holds across risk categories: <cite index="83-1">The treatment targets are consistently set 30 mg/dL higher than corresponding LDL-C goals across all risk categories.</cite> **[A][N5]**

Non-HDL-C is particularly valuable in exactly the situations where LDL-C is least reliable. <cite index="84-1">Particularly valuable in patients with elevated triglycerides (>200 mg/dL), metabolic syndrome, or diabetes where LDL-C calculation may be inaccurate.</cite> This ties directly to the frozen SCL-003 (calculated-LDL-C caution) and SCL-005 (high triglycerides). **[A][N8]**

**The wellness reading — [B]:** non-HDL-C is a strong, stable, lifestyle-responsive measure of
atherogenic cholesterol burden. BioSense frames it as a gradient to optimise, read with ApoB and LDL-C,
computed under governance and never mistaken for a diagnosis.

**An honest boundary — [E]:** guideline non-HDL-C numbers are risk-stratified treatment goals; BioSense
uses the primary-prevention structure as a wellness gradient and never converts a goal into a diagnosis.
And because non-HDL-C is derived, its trustworthiness is bounded by its parents (§8, §13). **[E]**

---

# 4. Why non-HDL-C Matters

**1. It captures total atherogenic cholesterol burden. [A][N2]** One number for all the atherogenic
particles' cholesterol — a fuller picture than LDL-C alone. **[A]**

**2. It is robust where LDL-C is weak. [A][N8]** When triglycerides are high or LDL-C is calculated,
non-HDL-C stays informative — a natural complement to the frozen lipid packs. **[A]**

**3. It is free and stable. [A][N9][N10]** Derived from the standard panel at no extra cost, minimally
affected by fasting. **[A]**

**Why BioSense derives it — [C]:** non-HDL-C adds strong, stable atherogenic-burden information from data
BioSense already holds — provided it is computed under proper governance, which this pack establishes.

---

# 5. Derivation & Measurement  *(reframed for a derived biomarker — founder §1)*

non-HDL-C is **not measured**; it is **derived** under governance. **[A][C]**

## 5.1 The equation — [A]
`non_HDL_C = Total_Cholesterol − HDL_C` (both normalised to mg/dL). **[A][N1]** Equation id
**`BIOSENSE_NON_HDL_C_EQUATION_v1`** (final id per ENG naming). **[C]**

## 5.2 Parent observations — [A]
- **Total Cholesterol** and **HDL-C**, from the **same blood sample / laboratory panel**. **[C][G1]**
- Both directly measured on the standard lipid panel; HDL-C is governed by SCL-004, and total cholesterol
  by the platform's standard validity rules. **[A]**

## 5.3 Eligibility & provenance — [C] (founder §1)
Derive **only** when both parents are valid, unit-known, final, and same-sample. **Never** derive from
guessed, imputed, or unit-unknown inputs. The derived observation retains the full provenance set (§0.2:
equation id/version, both parent obs IDs, original values/units, normalised values, sample date + panel
id, calculation timestamp, config version, rounding policy). **[C][G1][G2]**

## 5.4 Lab-reported non-HDL-C — [C] (founder §2)
If the lab also reports non-HDL-C, preserve it unchanged, derive independently, use the **derived** value
as canonical, and treat the reported value as corroboration — reconciled under the tolerance in §8.3.
Never average; never silently overwrite. **[C][G3]**

---

# 6. Units

- **mg/dL** — standard in the US. **BioSense canonical unit.** **[A/C]**
- **mmol/L** — standard elsewhere. **[A]**
- Cholesterol conversion factor **38.67** (same as TC/LDL-C/HDL-C; **not** the triglyceride 88.57). **[A][N12]**

Parents are normalised to the canonical unit before derivation; the reported unit of each parent is
retained. **[C]**

---

# 7. Unit Conversion

```
mg/dL  = mmol/L × 38.67
mmol/L = mg/dL ÷ 38.67
```
Worked checks: 130 mg/dL ≈ 3.36 mmol/L; 220 mg/dL ≈ 5.69 mmol/L. **[A]**

**Safety rule [D]:** both parents must be in a known unit before derivation; a unit-unknown parent blocks
derivation (§8, §13). The cholesterol factor (38.67) applies — never the triglyceride factor. **[D]**

---

# 8. Derivation Validity, Reconciliation & Discrepancy  *(major structural adaptation — founder §2, §3)*

This section replaces the usual "measurement limitations" with the governance that a derived biomarker
requires. **[A][C]**

## 8.1 Derivation validity gate — [C]
Derive only if **both** parents pass validity (valid, unit-known, final, same sample/date). If either
parent is invalid, missing, unit-unknown, validity-suspect to the point of its own abstention, from a
mismatched sample/date, or not final → **do not derive** → explained abstention naming the blocking
parent (§13, §15). **[C][G5]**

## 8.2 Confidence inheritance — [C]
non-HDL-C inherits the **lowest** parent confidence: *reduced propagates, invalidity blocks* (§13). Every
applicable parent reducer is carried into the non-HDL-C result and narrative (CAV3). **[C][G5]**

## 8.3 Reported-vs-derived reconciliation — [A][C]
When the lab also reports non-HDL-C, BioSense compares it to the derived value under a governed,
analytically anchored tolerance (a **BioSense V1 calculation-QA policy**, since no universal
reported-vs-derived tolerance exists in guidelines): **[C][G3][G4]**

- **Tolerance:** material disagreement when `|reported − derived| > max(15 mg/dL, 10% of derived)`.
- **Basis:** NCEP analytical total-error goals — Total Cholesterol ≤8.9% and HDL-C ≤15% <cite index="76-1">the NCEP established the following total error (bias ± 2SD) goals for the lipid panel tests: TC to ≤9%, LDL-C to ≤12%, and HDL-C to ≤15%.</cite> — propagate through the subtraction; combined in quadrature at typical values (~200/50) this is ≈19 mg/dL, and BioSense adopts a conservative rounded floor of 15 mg/dL with a 10% scale for higher values. **[A][N13][N14]**
- **Within tolerance:** mark the reported value **corroborating**; use the **derived** value for
  interpretation. **[C]**
- **Beyond tolerance:** raise a **discrepancy state** — preserve both values, reduce confidence, state
  calmly that the reported and calculated values do not align, imply **neither is certainly correct**,
  and suggest checking the original lab report or discussing it (CAV6). **[C][D][G3]**

## 8.4 Rounding & normalisation — [C]
Parents are normalised to mg/dL; the difference is computed and rounded to 1 mg/dL reporting precision;
the rounding policy is recorded in provenance. Comparisons use the governed tolerance, not exact
equality. **[C][G2]**

**How BioSense uses this — [C][D]:** the derivation gate + inheritance decide whether and how confidently
to band; reconciliation decides whether a lab-reported value corroborates or triggers a discrepancy
state; all of it is provenance-tagged and auditable (§21).

---

# 9. Relationships With Other Biomarkers

- **ApoB (SCL-001). [A]** non-HDL-C and ApoB both capture atherogenic burden, but non-HDL-C is a
  cholesterol-mass sum while ApoB counts particles. They are **complementary, not interchangeable**; where
  both are available BioSense compares them, preserves both, flags concordance/discordance, and gives
  **ApoB greater interpretive weight for particle number** — never averaging or merging categories
  (founder §6). **[A][N11][G6-role]**
- **LDL-C (SCL-003). [A]** non-HDL-C = LDL-C + the cholesterol in triglyceride-rich/remnant particles; it
  is especially useful when calculated LDL-C is unreliable (high TG). **[A][N8]**
- **Triglycerides (SCL-005). [A]** High triglycerides raise the value of non-HDL-C over LDL-C alone. **[A][N8]**
- **HDL-C & Total Cholesterol (SCL-004). [A]** The two **parents** of the derivation; their validity and
  confidence propagate directly into non-HDL-C (§8, §13). **[A][G5]**

**Engine implication [C]:** non-HDL-C is independently bandable and, where ApoB is present, compared under
the same discordance discipline used across the library — surfaced, never averaged, ApoB weighted for
particle number.

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Definition:** non-HDL-C = total cholesterol − HDL-C, capturing all atherogenic lipoproteins. **[A][N1][N2]**
- **+30 relationship:** non-HDL-C goal = LDL-C goal + 30 mg/dL across risk categories. **[A][N3]**
- **Primary/high-risk target <130 mg/dL**; intermediate <160; lower-risk <190; very-high <100. **[A][N4-N6]**
- **Especially valuable at high TG / metabolic risk / unreliable LDL-C.** **[A][N8]**
- **Strong independent predictor of cardiovascular events.** **[A][N17]**
- **Lower is better; no low-end harm threshold.** **[A][N19]**

## 10.2 Where they differ — and why
- **Risk-stratified goals differ by risk group** (<100 to <190). These are treatment goals for
  risk-stratified patients, not universal wellness targets. **[A][N5][N6]**
- **"Desirable" is a percentile construct.** <cite index="88-1">desirable has been mostly defined between the 50th and 75th percentiles of healthy populations, thus a relatively large proportion of patients will be abnormal.</cite> **[A][N16]**
- **Why:** goals answer "how low should a patient at known risk go?"; BioSense anchors its wellness bands
  to the primary-prevention target structure (§11), holding the stricter risk goals as context. **[A][E]**

## 10.3 Strength of evidence
- **Definition & +30 relationship: established / universal.** **[A]**
- **Targets (<130 etc.): established / guideline.** **[A][N4]**
- **Prognostic value: strong.** **[A][N17]**
- **Analytical total-error goals (for the reconciliation tolerance): established / standardisation.** **[A][N13-N15]**
- **A single "wellness optimal": reasoned (primary-prevention <130), percentile-based.** **[E][N16]**

## 10.4 Intended populations
Guideline goals target risk-stratified patients; the primary-prevention <130 structure is the appropriate
wellness anchor for a general-adult audience. Where either parent doesn't qualify (invalid/missing), the
derivation abstains (§15).

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. They apply to a VALID derivation (both parents valid).**

## 11.1 The interpretation bands (mg/dL; general adult, primary prevention, untreated)

| BioSense Wellness Interpretation | Associated non-HDL-C (mg/dL) | ≈ mmol/L | Evidence anchor | Wellness meaning |
|---|---|---|---|---|
| **Optimal** | < 130 | < ~3.4 | Primary-prevention target; LDL<100 +30 [N3][N4] | Atherogenic cholesterol burden in the most favourable range. |
| **Above Optimal** | 130 – 159 | ~3.4–4.1 | Between primary & intermediate goal [N3][N5] | Good, with room to optimise. |
| **Elevated** | 160 – 189 | ~4.1–4.9 | Intermediate-risk goal boundary (LDL<130 +30) [N5] | Above the wellness-desirable range; a meaningful opportunity. |
| **High** | 190 – 219 | ~4.9–5.7 | Lower-risk goal boundary (LDL<160 +30) [N5] | Notably above desirable; lifestyle focus and possible healthcare discussion. |
| **Significantly Elevated** | ≥ 220 | ≥ ~5.7 | Well above lower-risk goal [N5] | Well above the typical range; calm healthcare-review wording applies [D]. |

## 11.2 How the bands were derived — transparency [B]
- The **Optimal <130** boundary is the recognised primary-prevention non-HDL-C target (the LDL-C <100
  goal + 30 mg/dL). Subsequent boundaries follow the risk-tiered +30 structure (160, 190) and extend to a
  Significantly-Elevated band at ≥220. **[N3-N5]**
- **≥220** is positioned as Significantly Elevated and triggers calm healthcare-review wording.
- **No number was averaged.** Each boundary maps to a specific +30-derived goal; the stricter risk-group
  goals (<100 very-high) are held as context (§11.4), not merged into the wellness bands.

## 11.3 Population caveat [E]
These bands assume a **general adult, primary prevention, not on lipid-lowering therapy**, and a **valid
derivation** (§8). Not applied to children/adolescents, pregnancy, or where either parent doesn't qualify
(§15). "Desirable" is percentile-based (§10.2), so many people sit above Optimal. **[E]**

## 11.4 Risk-stratified goal display — [C]
If a user **declares** an established higher-risk condition, the engine **may** additionally display the
recognised guideline non-HDL-C goal for context — e.g. **<100** (very-high) or **<130** (high) mg/dL
(N4, N6) — clearly labelled a **guideline goal (Category A)**. The BioSense wellness band is still shown;
the goal is context, never an instruction. **[C][D]**

## 11.5 Never inferred [D]
Risk context, therapy status, and pregnancy come only from declared/lab data. BioSense never infers risk
category or a diagnosis from the non-HDL-C value. **[D]**

## 11.6 The low end — no wellness penalty [B][D]
As with ApoB and LDL-C, non-HDL-C banding is **monotonic, lower-better, with no low-end penalty.** A low
non-HDL-C is never scored adverse or alarmed. **[D][N19]**

---

# 12. Interpretation Framework

Fixed deterministic order (consistent with the ENG four-state model), with a **derivation gate** and
**confidence inheritance** specific to a derived biomarker. **[C]**

```
0. DERIVE      — both parents valid/unit-known/final/same-sample? → if not, ABSTAIN naming the parent (§15). [G5]
1. VALIDITY    — derived value interpretable (unit known; within reconciliation handling)? 
2. RECONCILE   — if lab-reported non-HDL-C exists: compare under tolerance (§8.3) → corroborating OR discrepancy.
3. CONFIDENCE  — INHERIT lowest parent confidence (reduced propagates); apply discrepancy reducer if any. [G5]
4. BAND        — assign BioSense wellness interpretation band (§11) on the derived value.
5. CONTEXT     — cross-marker (§9): ApoB concordance/weighting; LDL-C/TG context; declared risk-goal display.
6. NARRATIVE   — select wellness narrative (§24) + mandatory caveats (§0.9), incl. inherited reducers & discrepancy.
```

**Core interpretive stance [B]:** non-HDL-C is a derived, independently bandable measure of atherogenic
cholesterol burden — optimise and track it, read it with ApoB, and always as wellness information whose
trustworthiness is bounded by its parents. **[B][D]**

---

# 13. Confidence Assessment  *(reframed: inheritance — founder §3, §4)*

Confidence is **inherited**, not independently assessed: *reduced propagates, invalidity blocks.* **[C][G5]**

| Inheritance / reducer | Effect | Source |
|---|---|---|
| Both parents valid + standard-confidence | non-HDL-C = STANDARD confidence | [G5] |
| One/both parents reduced-confidence | non-HDL-C inherits LOWEST parent confidence; carry every parent reducer (CAV3) | [G5] |
| HDL-C parent reduced by acute illness (still valid+bandable, SCL-004) | derive + REDUCED + acute caveat | [G6] |
| Reported-vs-derived discrepancy (§8.3) | REDUCED + discrepancy caveat (CAV6) | [G3] |
| Derived value near a band boundary | REDUCED | [B] |
| On lipid-lowering therapy | REDUCED (treated state) | [A] |
| ApoB/non-HDL-C discordance present | REDUCED for non-HDL-C-alone reliance; weight ApoB | [N11] |

| Validity-BLOCK (do NOT derive/band → abstain) | Source |
|---|---|
| Either parent invalid / missing / unit-unknown / not-final | [G5] |
| Parent validity-suspect to the point of its own abstention (e.g. SCL-004 HDL-C abstention) | [G6] |
| Mismatched sample / date between parents | [G5] |

---

# 14. Wellness Interpretation

Interpretation-by-interpretation guidance for a **valid derivation**. Wellness, not medical; never
diagnostic labels. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal** *(<130 mg/dL).* "Your non-HDL cholesterol — the total
  cholesterol across all your atherogenic particles — is in an optimal wellness range. A great result to
  maintain." **[B]**
- **BioSense Wellness Interpretation: Above Optimal** *(130–159).* "Your non-HDL-C is good, with room to
  optimise. The same habits that lower LDL cholesterol help here." **[B]**
- **BioSense Wellness Interpretation: Elevated** *(160–189).* "Your non-HDL-C is above the
  wellness-desirable range — a meaningful, modifiable opportunity. Reducing saturated fat and adding
  soluble fibre are effective; tracking over time shows progress." **[B]**
- **BioSense Wellness Interpretation: High** *(190–219).* "Your non-HDL-C is notably above the desirable
  range. Lifestyle changes are impactful, and it may be worth discussing your result with a healthcare
  professional." Constructive + gentle review. **[B][D]**
- **BioSense Wellness Interpretation: Significantly Elevated** *(≥220).* "Your non-HDL-C is well above the
  typical range. Alongside lifestyle steps, it would be worth discussing this with a healthcare
  professional who can look at your full picture." Calm, non-alarming (CAV5). **[B][D]**

**Cross-marker modifier (ApoB present):** where non-HDL-C and ApoB are **discordant**, explain they
describe related-but-different things and that ApoB better reflects particle number (CAV7); never averaged
or substituted (S12). **[D][N11]**

**Reconciliation modifier (discrepancy):** where a lab-reported non-HDL-C and the derived value disagree
beyond tolerance, note it calmly, reduce confidence, imply neither is certainly correct (CAV6). **[D][G3]**

Every interpretation pairs the reading with a lifestyle lever (§17) and the mandatory caveats (§0.9).
**None names a condition.** **[D]**

---

# 15. Special Populations & Abstention  *(includes parent-driven abstention — founder §3)*

BioSense **abstains** where its bands don't apply or the derivation can't be trusted. **[C]/[D]/[E]**

- **15.1 Parent-driven abstention (the defining case).** If either parent (TC, HDL-C) is invalid, missing,
  unit-unknown, not-final, from a mismatched sample, or itself abstained (e.g. SCL-004 HDL-C abstention in
  acute illness/pregnancy), BioSense **does not derive** and returns an explained abstention naming the
  blocking parent (CAV4). **[D][G5][G6]**
- **15.2 Children & adolescents.** Adult bands not applied; display, suggest professional interpretation. **[D]**
- **15.3 Pregnancy.** Lipids shift physiologically; if HDL-C/TC handling abstains, non-HDL-C is not derived;
  otherwise not banded, deferring to a professional. **[D]**
- **15.4 Markedly low non-HDL-C.** Never a concern, never penalised (S4). **[D][N19]**
- **15.5 On lipid-lowering therapy.** Band allowed, framed as reflecting current management; never any
  implication about changing treatment (S5). **[D]**
- **15.6 Higher-risk declared context.** Band shown; guideline goal added as context (§11.4). **[C]**

**Abstention is a first-class, non-error output**, always explained — and for non-HDL-C it specifically
names which parent prevented the calculation. **[D]**

---

# 16. Trend, Longitudinal Behaviour, Recalculation & Audit  *(adapted — founder §5)*

- **Recalculation on parent change. [C]** If a parent is corrected, replaced, or invalidated, non-HDL-C is
  **recalculated** using the applicable equation version; the superseded derived observation is **retained
  in audit history**; historical provenance is **never silently mutated**. Historical interpretations stay
  linked to the equation and config version used at the time. **[C][G7]**
- **Version-linked history. [C]** Every derived value carries its equation/config version, so trends across
  a version change are interpreted with that in mind. **[C][G7]**
- **What counts as a real change. [A][E]** Small differences can be parent-measurement or rounding noise;
  a change is framed as meaningful only beyond that.
- **Direction & framing. [B]** Downward = improving (encouraged); upward = a calm optimisation prompt.
  Low-end has no penalty (§11.6).
- **Discrepancy/abstention points. [C]** Values from a discrepancy state are shown with reduced confidence;
  abstained points are excluded from trend so they never create a false signal.

---

# 17. Lifestyle Optimisation Guidance

Lifestyle is the first tier; the levers are the cholesterol-lowering ones shared with LDL-C. **[A]/[B]**

## 17.1 Nutrition [A][N18]
- **Reduce saturated and trans fat; replace with unsaturated fats** — the primary dietary lever. **Strong.** **[A]**
- **Soluble fibre and a whole-food (Mediterranean-style) pattern** support lower non-HDL-C. **[A]**

## 17.2 Physical activity, weight [A][N18]
Regular activity and healthy body composition improve the whole lipid profile, including non-HDL-C. **[A]**

## 17.3 Framing rules [B][D]
Lifestyle first; medication never suggested. Honest framing: non-HDL-C responds to the same habits as
LDL-C; at Significantly Elevated, pair with a healthcare-review suggestion.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain the band and what non-HDL-C is (including that it's calculated from total and
HDL cholesterol) in warm wellness language; connect to lifestyle levers; explain the ApoB/LDL-C
relationships; acknowledge progress; explain a parent-driven abstention or a reported-vs-derived
discrepancy respectfully.

The AI layer **must never**:
- state or imply a diagnosis or condition (S1)
- produce a numeric cardiovascular risk % from non-HDL-C (S6)
- recommend starting/stopping/changing medication (S5)
- present a BioSense band as a medical/diagnostic boundary (S9)
- silently overwrite/discard a lab-reported non-HDL-C, or average reported & derived (S10)
- imply either value is certainly correct in a discrepancy (S11)
- average or substitute non-HDL-C and ApoB (S12)
- interpret or band a value when a parent blocks derivation (S8)
- infer risk context, therapy, or pregnancy from the value

Enforcement is by output validation on rendered text, not by prompt alone. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis.** Every output carries CAV1; ≥220 mg/dL → calm healthcare-review, no condition named. **[D]**
- **One factor among many.** CAV2 frames non-HDL-C as one atherogenic-burden marker, read with ApoB/LDL-C. **[D]**
- **Derivation honesty.** A parent problem yields a clear abstention naming the parent, not a guessed value
  (S8, CAV4); a reported-vs-derived discrepancy is stated calmly with neither value asserted correct
  (S11, CAV6). **[D]**
- **No medication guidance.** Medication questions → educational context + referral (S5, S7). **[D]**
- **No alarm.** Even the highest band uses calm, constructive language (S3, CAV5). **[D]**
- **Low values not pathologised.** Neutral wording (S4). **[D]**
- **No silent overwrite.** A lab-reported non-HDL-C is preserved, never overwritten or averaged (S10). **[D]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. non-HDL-C is **Significantly Elevated (≥220 mg/dL)** — CAV5. **[N5]**
2. non-HDL-C is **High (190–219)** — gentle healthcare-review. **[N5]**
3. A **reported-vs-derived discrepancy** persists — worth checking the original report (CAV6). **[G3]**
4. **Marked ApoB/non-HDL-C discordance** — benefits from professional interpretation. **[N11]**
5. A **parent-driven abstention** leaves non-HDL-C uncomputable — the underlying parent result is best
   reviewed. **[G5]**
6. The user **declares higher risk** and would benefit from personalised goals (§11.4).
7. The user **asks a medical or medication question** (S7).

All suggestions are wellness-framed, non-urgent, non-diagnostic. **[D]**

---

# 21. BioSense Product Integration & Derived-Biomarker Governance Pattern  *(founder §7)*

SCL-007 establishes the reusable **BioSense derived-biomarker governance pattern**. Future derived markers
(e.g. remnant cholesterol, ratios) should follow it. **[C]**

- **Consumes:** the ENG Blood Analysis Engine's validated `CanonicalObservation`s for the two parents
  (Total Cholesterol, HDL-C), plus any lab-reported non-HDL-C, and available ApoB/LDL-C/TG for context.
- **Derivation eligibility:** both parents valid, unit-known, final, same sample/panel; never guessed/
  imputed/unit-unknown (§5, §8). **[G1]**
- **Equation versioning:** `BIOSENSE_NON_HDL_C_EQUATION_v1`; every derived value carries equation + config
  version. **[G2]**
- **Parent-observation provenance:** both parent obs IDs, original + normalised values/units, sample date,
  panel id, calculation timestamp, rounding policy (§0.2). **[G2]**
- **Confidence inheritance & validity propagation:** reduced propagates, invalidity blocks (§13). **[G5]**
- **Reported-vs-derived reconciliation:** derived canonical, reported corroborating, governed tolerance,
  discrepancy state (§8.3). **[G3][G4]**
- **Recalculation & audit-history preservation:** recompute on parent change; retain superseded derived
  observations; never mutate historical provenance; interpretations linked to the version used (§16). **[G7]**
- **Rounding & unit-normalisation:** normalise parents to mg/dL, compute, round to 1 mg/dL, record policy
  (§8.4). **[G2]**
- **Respects:** every ENG platform invariant; the SCL-001 discordance discipline (never average/substitute).
- **Score contribution:** non-HDL-C contributes to the cardiovascular-wellness domain as a monotonic
  (lower-better) input at its inherited confidence; abstained/blocked derivations do not contribute; where
  ApoB is present and discordant, ApoB is weighted (§9). **[C]**

---

# 22. Medication Context (educational only)

Educational context only; BioSense does not instruct on medication (S5). **[D]**
- non-HDL-C is a recognised **secondary** lipid target used by clinicians, especially with elevated
  triglycerides or diabetes; its goals (<100 to <130 by risk) are individualised clinical decisions, not
  BioSense wellness thresholds. **[A][N4][N6]**
- Any medication question → educational context + suggestion to speak with a healthcare professional (S7). **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Reported-vs-derived tolerance is a BioSense V1 calc-QA policy. [E]** No universal guideline tolerance
   exists; BioSense's `max(15 mg/dL, 10%)` is anchored to NCEP analytical total error (TC ≤8.9%, HDL ≤15%),
   labelled Version 1, and revisable. **[N13][N14]**
2. **"Desirable" is percentile-based. [E]** Many healthy people sit above Optimal; the band is a wellness
   gradient, not a pass/fail line. **[N16]**
3. **Wellness "optimal" adopts the primary-prevention <130. [E]** A reasoned anchor, not a
   wellness-specific derivation.
4. **Confidence inheritance is qualitative in V1. [E]** BioSense propagates the lowest parent confidence
   and carries reducers; it does not compute a numeric composite uncertainty.
5. **Parent unit mismatch / same-sample enforcement depends on panel metadata. [E]** Where panel identity
   or sample date is ambiguous, BioSense errs toward abstention.

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; never diagnostic labels).
**[B]/[D]** (Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL
"Your non-HDL cholesterol is {value} mg/dL ({mmol} mmol/L) — the total cholesterol across all your
 atherogenic particles — in an optimal wellness range. A wonderful result to maintain."  +CAV1 +CAV2

TEMPLATE: ABOVE_OPTIMAL
"Your non-HDL-C is {value} mg/dL ({mmol} mmol/L) — good, with room to optimise. The habits that lower LDL
 cholesterol help here too."  +CAV1 +CAV2

TEMPLATE: ELEVATED
"Your non-HDL-C is {value} mg/dL ({mmol} mmol/L) — above the wellness-desirable range, and a meaningful,
 modifiable opportunity. Reducing saturated fat and adding soluble fibre are effective; tracking over time
 will show your progress."  +CAV1 +CAV2

TEMPLATE: HIGH
"Your non-HDL-C is {value} mg/dL ({mmol} mmol/L) — notably above the desirable range. Lifestyle changes are
 impactful, and it may be worth discussing your result with a healthcare professional."  +CAV1 +CAV2 +CAV5

TEMPLATE: SIGNIFICANTLY_ELEVATED
"Your non-HDL-C is {value} mg/dL ({mmol} mmol/L) — well above the typical range. Alongside lifestyle steps,
 it would be worth discussing this with a healthcare professional who can look at your full picture."
 +CAV1 +CAV2 +CAV5

MODIFIER: INHERITED_REDUCED_CONFIDENCE → append CAV3 naming the parent reducer, e.g.
 "This is calculated from your total and HDL cholesterol; because your HDL-C reading was taken during a
  recent illness, we've treated the result as lower-confidence."

MODIFIER: PARENT_ABSTENTION →
 "We couldn't calculate your non-HDL-C this time because your {total cholesterol / HDL-C} result wasn't
  {available / valid}. Once that's in place, we can calculate it."  +CAV1 +CAV4

MODIFIER: REPORTED_VS_DERIVED_DISCREPANCY →
 "Your lab's reported non-HDL-C and our calculated value don't fully line up. We're flagging this and
  treating it as lower-confidence — it's worth checking the original lab report."  +CAV1 +CAV6

MODIFIER: DISCORDANCE_WITH_APOB →
 "Non-HDL-C and ApoB describe related but different things — cholesterol carried versus the number of
  particles. Where they differ, ApoB better reflects particle number, so we give it more weight."  +CAV7

MODIFIER: LOW (markedly low) →
 "Your non-HDL-C is on the low side, which from a cardiovascular-wellness view is favourable."  +CAV1
```

**Absolute rules:** no template names a condition, presents a band as a diagnosis, asserts either value in
a discrepancy, or averages non-HDL-C with ApoB. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, both parents standard confidence. [illustrative]**
```
Input: TC 180 (valid), HDL-C 55 (valid), same panel. Derived non-HDL-C = 125 mg/dL.
Band: OPTIMAL | Confidence: STANDARD | Derived: true | Abstained: false
Provenance: eqn BIOSENSE_NON_HDL_C_EQUATION_v1; parents {TC_obs, HDLC_obs}; rounded 1 mg/dL.
Narrative: OPTIMAL +CAV1+CAV2 ; Rec: Tier 1 maintain.
```

**Example 2 — Inherited reduced confidence (HDL-C drawn during illness). [illustrative]**
```
Input: TC 205 (valid), HDL-C 42 (valid but SCL-004 acute-illness reducer). Derived = 163 mg/dL.
Band: ELEVATED | Confidence: REDUCED (inherited HDL-C acute reducer)
Narrative: ELEVATED +CAV1+CAV2 + INHERITED_REDUCED_CONFIDENCE (CAV3) ; Rec: Tier 1; re-check when well.
```

**Example 3 — Parent abstention (HDL-C invalid). [illustrative]**
```
Input: TC 210 (valid), HDL-C unit-unknown → invalid.
Result: ABSTAIN (do not derive) | blocking_parent: HDL_C
Narrative: PARENT_ABSTENTION +CAV1+CAV4 (names HDL-C). No band produced.  [S8]
```

**Example 4 — Reported-vs-derived discrepancy. [illustrative]**
```
Input: TC 220, HDL-C 45 → derived 175; lab-reported non-HDL-C = 150. |175−150| = 25 > max(15, 17.5).
State: DISCREPANCY | both preserved | Confidence: REDUCED
Narrative: HIGH band on derived + REPORTED_VS_DERIVED_DISCREPANCY (CAV6); neither asserted correct.  [S10,S11]
```

**Example 5 — Discordance with ApoB. [illustrative]**
```
Input: non-HDL-C 128 (Optimal) derived; ApoB 130 (SCL-001 Significantly Elevated), TG 210.
Band: OPTIMAL (non-HDL-C) | Discordance: true → ApoB weighted
Narrative: OPTIMAL + DISCORDANCE_WITH_APOB (CAV7); never averaged.  [S12]
```

**Example 6 — Significantly elevated, valid. [illustrative]**
```
Input: TC 265, HDL-C 40 → derived 225 mg/dL, both valid.
Band: SIGNIFICANTLY_ELEVATED | Confidence: STANDARD
Narrative: SIGNIFICANTLY_ELEVATED +CAV1+CAV2+CAV5. No condition named; no risk %.  [S1,S3,S6]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, discordance discipline, PI-4 rendering, governance).
- **SCL-001 (ApoB)** — the frozen template and the particle-number marker; the ApoB/non-HDL-C hierarchy in
  §9/§14 is consistent with SCL-001.
- **SCL-003 (LDL-C)** — the +30 relationship and the derived-biomarker reservation that SCL-007 fulfils;
  non-HDL-C is most useful where calculated LDL-C is unreliable.
- **SCL-004 (HDL-C)** — a **parent**; its validity/confidence (incl. acute-illness abstention) propagates.
- **SCL-005 (Triglycerides)** — high TG raises the value of non-HDL-C.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§0 Implementation Summary / §21** — developer-facing activation values and the derived-biomarker pattern.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the N-series/G-series IDs
> in §0 and the body. Developers finalising the pack should confirm exact page/table locators against the
> primary PDFs where required.

**Guidelines & targets (Category A anchors)**

1. Grundy SM, Cleeman JI, et al. **Third Report of the NCEP Expert Panel (ATP III), Final Report.**
   *Circulation* 2002;106(25):3143–3421. — *non-HDL-C = TC − HDL-C; secondary target; goal = LDL-C goal +30;
   risk-tiered goals <130/<160/<190 (N1, N3, N4, N5).*
2. Mach F, et al. **2019 ESC/EAS Guidelines for the management of dyslipidaemias.** *Eur Heart J*
   2020;41(1):111–188. — *non-HDL-C alternative goal; high risk <130 (~3.3 mmol/L); very-high <100
   (~2.6 mmol/L) (N4, N6, N7).*
3. Cleveland Clinic; University of Rochester Medical Center; Abbott/Acare patient references. — *Definition,
   +30 rule, <130 primary target, less fasting-dependent (N1, N3, N9, N10).*
4. DrOracle clinical references (2026). — *Risk-tiered non-HDL-C goals; especially valuable at TG >200 /
   metabolic syndrome / diabetes / unreliable LDL-C; independent predictor (N4, N5, N8, N17).*
5. Very-high-risk composite targets (non-HDL-C <100). *(PMC3315574.)* — *very-high-risk goal (N6).*

**Prognostic & real-world (Category A/P)**

6. Southeast Asian real-world lipid study (PMC10879277); Swedish National Diabetes Register analyses. —
   *non-HDL-C target attainment and outcome associations (N17).*

**Analytical performance — basis for the reconciliation tolerance (Category A/S)**

7. NCEP / CDC Cholesterol Reference Method Laboratory Network (CRMLN) Total Cholesterol certification
   protocols. — *Total Cholesterol allowable total error ≤8.9% (bias ≤3%, CV ≤3%) (N13).*
8. Langlois MR, et al. **ADLM (AACC) guidance on measurement and reporting of lipids and lipoproteins**
   (myadlm.org); Clinical Chemistry 2023;69(10):1145. — *NCEP total-error goals: TC ≤9%, LDL-C ≤12%, HDL-C
   ≤15%, TG ≤13%; "desirable" ~50th–75th percentile; non-HDL-C ~95th percentile (N13, N14, N15, N16).*

**Lifestyle (Category A)**

9. NCEP ATP III Therapeutic Lifestyle Changes; ACC/AHA lifestyle guidance (as SCL-003). — *Saturated/trans
   fat reduction, fibre, activity, weight lower non-HDL-C (N18).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–4; they are
> BioSense Version 1 classifications, not attributable to any single reference as a diagnostic threshold,
> and do not restate diagnostic labels. **The reported-vs-derived tolerance (§8.3) is a labelled BioSense
> Version 1 calculation-QA policy anchored to the analytical total-error goals in references 7–8.**

---

# 28. Founder Decisions Required

The derived-biomarker governance (derivation, provenance, reconciliation, confidence inheritance,
recalculation, audit) was resolved by founder decision (§1–§7) and is implemented in this pack. Two
residual presentation/policy items remain optional: **[C][E]**

**D-1 — Confirm the BioSense V1 Wellness Interpretation Band boundaries.** §11 adopts the primary-prevention
<130 target and the +30-derived structure (130/160/190/220). Confirmation requested that these are the
correct wellness anchors for the general-adult default. **Founder sign-off requested.**

**D-2 — Confirm the reported-vs-derived tolerance policy.** §8.3 sets material disagreement at
`|reported − derived| > max(15 mg/dL, 10% of derived)`, anchored to NCEP analytical total error. Confirmation
requested on this Version 1 calc-QA tolerance and whether to surface the corroboration status to users.

*(Both affect presentation/handling, not the underlying evidence or the resolved governance.)*

---

**END OF SCL-007 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/
analytical figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. The
derived-biomarker governance — derivation eligibility, equation versioning, parent provenance, confidence
inheritance, validity propagation, reported-vs-derived reconciliation with an analytically anchored
tolerance, discrepancy handling, recalculation, and audit-history preservation — was adapted per the
founder decision and establishes the reusable BioSense derived-biomarker pattern; all other structure
follows SCL-001 exactly and remains consistent with SCL-001 through SCL-006.*
