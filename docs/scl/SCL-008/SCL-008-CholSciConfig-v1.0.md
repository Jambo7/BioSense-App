# SCL-008 — TOTAL CHOLESTEROL (TC)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Standalone wellness marker + first governed Parent-Observation pack (consumed by SCL-007)*

**Document ID:** SCL-008
**Biomarker:** Total Cholesterol (TC; total serum/plasma cholesterol)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Structure preserved; the limited-standalone framing and the parent-observation governance are genuine structural adaptations required by the founder decision. All unaffected sections remain consistent with SCL-001 through SCL-007.

---

> **What this document is.** SCL-008 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for total cholesterol. It also defines
> total cholesterol as a **governed parent observation** for the SCL-007 non-HDL-C derivation. It does not
> redesign the Constitution, the ENG documents, the Blood Analysis Engine, or the SCL architecture.
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

## STRUCTURAL-FIT NOTE (Total Cholesterol vs SCL-001)

Total cholesterol has a **dual role** and is the **weakest standalone marker** in the lipid panel — two
facts that shape this pack. The overall structure, section order, content-classification scheme (A–E),
safety posture, recommendation-ladder shape, narrative-contract, governance/versioning, and the
lower-better-with-no-low-end-penalty direction were **preserved exactly**. The following required genuine
adaptation (founder decision §1–§9):

1. **Limited-standalone framing (§1, §11, §14, §18, §19) — safety-critical.** Total cholesterol sums
   cholesterol carried in *both* atherogenic and non-atherogenic (HDL) fractions, so a high value can be
   favourable or unfavourable depending on which fraction drives it. TC **alone** is never a complete
   cardiovascular-wellness verdict. An isolated TC value is banded but **capped at REDUCED confidence**
   with a **mandatory component-context caveat**.
2. **Component-routing interpretation (§9, §14) — central.** Interpretation is always routed toward the
   components (LDL-C, HDL-C, non-HDL-C, ApoB); where components are present, BioSense identifies which
   fraction drives the total, prioritises ApoB/non-HDL-C/LDL-C for atherogenic burden, keeps HDL-C as
   separate context, and never averages or merges bands.
3. **Parent-observation governance (§5, §8, §21, App-4) — new.** TC is defined as the validated **parent
   observation** SCL-007 consumes: units/normalisation, sample/panel identity, lab-value retention,
   validity rules, limitations, confidence reducers, final-result status, correction behaviour, and the
   provenance fields required downstream. *Reduced propagates; invalidity blocks.*
4. **TC/HDL-ratio containment (§9, §22, §23) — new guardrail.** The ratio is not auto-introduced as a
   primary target; if ever used it must be a separately governed derived metric with its own equation
   id/version, kept strictly secondary to ApoB/non-HDL-C/LDL-C, and never overriding them.

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

Total cholesterol is the most familiar cholesterol number and a useful screening and historical marker —
but it is also the least specific, and BioSense is deliberately honest about that. A single total figure
sums cholesterol carried by very different particles: the atherogenic ones (LDL, VLDL, remnants) and the
non-atherogenic HDL. A "high" total can therefore reflect a favourable HDL just as easily as an
unfavourable atherogenic burden, and the total alone cannot tell them apart. BioSense bands total
cholesterol on the recognised categories, but never lets it stand as a complete verdict: an isolated
total is treated as lower-confidence and always routed toward its components — HDL-C, LDL-C, non-HDL-C,
and ApoB — which carry the real interpretive weight. Total cholesterol also does quiet structural work as
the governed parent of the non-HDL-C calculation.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as
the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate total cholesterol. Every value carries a source ID (C-series /
> F-series → §27) and a category tag. Canonical unit: mg/dL (store mmol/L in parallel). **TC is a limited
> standalone marker AND a governed parent observation.**

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: mg/dL          # store mmol/L parallel
mg/dL = mmol/L × 38.67 ; mmol/L = mg/dL ÷ 38.67   (cholesterol factor)          [C9]
Always retain value_reported + unit_reported. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors C1–C3)
```
TC_WELLNESS_BAND (mg/dL, general adult, primary prevention, untreated):
  DESIRABLE        < 200            # NCEP "desirable" [C1]
  BORDERLINE_HIGH  200 – 239        # NCEP "borderline high" [C2]
  HIGH             ≥ 240            # NCEP "high" [C3]
DIRECTION: LOWER_BETTER generally, no low-end penalty (as ApoB/LDL-C/non-HDL-C).  [B][C13]
mmol/L parallels: 200≈5.17 | 240≈6.20
LIMITED STANDALONE: TC is NOT a complete verdict; always route to components (§0.4).  [F1]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. [B][D]**

## 0.3 Standalone confidence policy (Option A — founder §2) — [C]
```
IF component markers (HDL-C / LDL-C / non-HDL-C / ApoB) are UNAVAILABLE:
  assign the TC band (§0.2);
  CAP confidence at REDUCED (never STANDARD/HIGH for isolated TC);              [F2]
  attach MANDATORY component-context caveat (CAV2);                            [F2][§3]
  explain TC cannot show which fraction drives the total;
  encourage review of HDL-C / LDL-C / non-HDL-C / ApoB where available.
  DO NOT abstain solely because components are unavailable.                     [F2]
```

## 0.4 Component-context interpretation (founder §4) — [A]+[C]
```
IF component markers ARE available:
  assign TC band; interpret IN CONTEXT of components;
  identify which fraction primarily drives the total;                          [F3]
  PRIORITISE ApoB, non-HDL-C, LDL-C for atherogenic burden; keep HDL-C as SEPARATE context;
  NEVER average/merge component bands;                                          [F3]
  IF TC elevated mainly because HDL-C is favourable → do NOT frame TC as adverse;   [F4]
  IF TC elevated alongside elevated LDL-C / non-HDL-C / ApoB → state the COMPONENT PATTERN
     is the more informative finding.                                          [F4]
```

## 0.5 Parent-observation governance for SCL-007 (founder §6, §7) — [C]
```
TC_PARENT_VALIDITY (SCL-008 authoritative):
  VALID + eligible for non-HDL-C derivation IFF: unit-known + normalised + final laboratory result +
     same sample/panel as HDL-C + passes analytical/pre-analytical checks.      [F6]
  provenance fields for downstream: obs_id | value_reported+unit | normalised_value | sample_date |
     panel_id | final_status | analytical_flags | confidence_state.             [F6]
PROPAGATION into SCL-007 (reduced propagates / invalidity blocks):              [F7]
  TC valid but REDUCED → SCL-007 may derive; non-HDL-C inherits reduced + the specific TC reducer.
  TC invalid / missing / unit-unknown / mismatched-sample / not-final → SCL-007 must NOT derive → abstain.
  SCL-007 authoritative for the equation; SCL-008 authoritative for TC-parent validity/eligibility.
CORRECTION: if TC corrected/replaced/invalidated → SCL-007 recalculates per its §16 audit rules.
```

## 0.6 Deterministic safety & suppression rules — [D] (founder §5)
```
S1  TC is NOT a diagnosis. Never state/imply disease.
S2  TC alone is NEVER a complete cardiovascular-wellness verdict; always route to components.  [F1]
S3  Isolated TC → REDUCED confidence + mandatory component caveat; NEVER STANDARD/HIGH.  [F2]
S4  TC alone must NOT trigger a strong healthcare-review recommendation.        [F5]
S5  TC alone must NOT drive medication-related language.                        [F5]
S6  TC alone must NOT determine a cardiovascular-risk category or produce a risk %.  [F5]
S7  TC must NOT override ApoB / LDL-C / non-HDL-C; components carry greater weight.  [F5][F3]
S8  Never recommend starting/stopping/changing medication.
S9  Never present a BioSense band as a medical/diagnostic boundary.
S10 High TC driven by favourable HDL-C → do NOT frame as adverse.               [F4]
S11 TC/HDL ratio is NOT auto-primary; only as a separately governed, secondary, non-overriding metric. [F8]
S12 As a parent: never derive non-HDL-C from an invalid/ineligible TC; reduced TC → propagate reducer. [F7]
```

## 0.7 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 LIFESTYLE (always first, general): reduce saturated & trans fat; increase soluble fibre;
   unsaturated fats; activity; weight management — cholesterol-lowering levers.   [C16]
Tier 2 COMPONENT REVIEW (the key TC move): review HDL-C / LDL-C / non-HDL-C / ApoB to see what drives
   the total; a fasting panel is suggested if TC>200 came from a non-fasting sample.  [C5][C7]
Tier 3 HEALTHCARE DISCUSSION (calm) — driven by COMPONENTS, not TC alone: when ApoB/non-HDL-C/LDL-C are
   elevated, or a medical question arises.                                       [D][F5]
NEVER a medication instruction at any tier. TC alone never triggers a strong review (S4).
```

## 0.8 Narrative selection rules — [B]/[D]
```
band → template; ALWAYS with component-routing; modulated by standalone-vs-component state.
DESIRABLE                 → affirming, but still "read with components".
BORDERLINE_HIGH / HIGH    → constructive + component-review (which fraction?); calm.
isolated (no components)  → band + REDUCED confidence + mandatory component caveat (CAV2).
high-TC-from-favourable-HDL → explicitly NOT adverse; the pattern is favourable.
high-TC-with-atherogenic  → the component pattern (ApoB/non-HDL-C/LDL-C) is the finding.
Never "normal/abnormal" as a verdict; never diagnosis; never a strong review from TC alone.
```

## 0.9 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 (MANDATORY for isolated TC) "Total cholesterol combines several different cholesterol-carrying
      particles. This result is more useful when read alongside HDL cholesterol, LDL cholesterol,
      non-HDL cholesterol and ApoB."                                            [§3 mandatory meaning]
CAV3 (reduced confidence) name the reducer(s) (e.g. components unavailable; non-fasting).
CAV4 (high-TC-from-HDL) "Your total is higher partly because your HDL is favourable — not a concern in itself."
CAV5 (component pattern elevated) "The more informative finding here is your {ApoB/non-HDL-C/LDL-C}."
CAV6 (screening framing) "Total cholesterol is a useful overview and screening marker; your components tell the fuller story."
```

## 0.10 Source & version identifiers
```
config_id: SCL-008   config_version: 1.0
band_set_id: BIOSENSE_TC_WELLNESS_BANDS_v1              (Category B; anchors C1-C3)
standalone_policy_id: SCL008_LIMITED_STANDALONE_v1      (founder §1-§3; F1,F2)
component_routing_id: SCL008_COMPONENT_ROUTING_v1       (founder §4; F3,F4)
parent_observation_id: SCL008_TC_PARENT_OBSERVATION_v1  (founder §6,§7; F6,F7 — consumed by SCL-007)
ratio_guardrail_id: SCL008_TCHDL_RATIO_CONTAINMENT_v1   (founder §8; F8)
guideline_anchors_id: NCEP_ATP_III                      (Category A; C1-C3)
safety_rules_id: SCL008_SAFETY_v1                       (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Total cholesterol (TC) is the overall amount of cholesterol circulating in the blood, summed across all
lipoprotein particles. <cite index="98-1">This is a measure of the total amount of cholesterol in your blood. It includes both low-density lipoprotein (LDL) cholesterol and high-density lipoprotein (HDL) cholesterol.</cite> **[A][C6]**

That sum is exactly why TC is a **limited standalone marker**: it adds together cholesterol carried by
particles with opposite implications — the atherogenic LDL/VLDL/remnant cholesterol and the
non-atherogenic HDL cholesterol. <cite index="99-1">Knowing which biomarker (or combination of the three) is responsible for the skew of your total cholesterol number is more important than the total cholesterol value itself.</cite> A higher total can be driven by a favourable HDL, an unfavourable atherogenic burden, or both — and the total alone cannot distinguish them. **[A][C7]**

TC is nonetheless genuinely useful as a **screening and historical overview**, widely available and
long-tracked, and it plays a structural role in BioSense as the governed **parent** of the non-HDL-C
calculation (§5, §21).

- **Official name:** Total cholesterol
- **Common abbreviation:** TC
- **Reported in:** mg/dL and mmol/L **[A]**
- **Standalone specificity:** limited — always read with components **[A][C6][C7]**
- **BioSense role:** A useful but non-specific screening overview, always routed to its components; and a governed parent observation for non-HDL-C.

---

# 2. Physiological Function

Cholesterol is essential — for cell membranes, hormones, and vitamin D — and is carried through the blood
inside lipoproteins. **[A]** Total cholesterol simply measures how much cholesterol is present across all
those carriers combined. **[A]** Because HDL particles (which carry cholesterol *away* from tissues) and
atherogenic particles (which can deposit cholesterol *in* artery walls) both contribute to the total, the
same TC value can describe very different underlying pictures. **[A][C6][C7]**

Two points shape interpretation **[A]**:
- **TC is a composite, not a fraction.** Its wellness meaning depends entirely on its components (§9). **[A][C8]**
- **TC is lifestyle-responsive and lower-better *in general*,** but only the atherogenic components carry
  the risk that lowering addresses. **[A][C13][C16]**

---

# 3. Scientific Background

Total cholesterol was the first widely used lipid screening number, and its recognised categories are
stable and universal. <cite index="90-1">The NCEP considers total cholesterol <200 mg/dL to be desirable, total cholesterol between 200-239 mg/dL to be borderline high and cholesterol levels ≥ 240 mg/dL to be high.</cite> **[A][C1-C3]** At the population level a higher total tracks higher risk — roughly, a total of 240 carries about twice the heart-attack risk of 200 <cite index="88-1">human beings who have a total cholesterol level of 240 mg/dL have twice the risk of having a heart attack as human beings that have a total cholesterol level of 200 mg/dL.</cite> — but this is a population average that says nothing about an individual's fraction mix. **[A][C4]**

The science has since moved decisively toward the components. LDL-C is the primary target of therapy, and
ApoB and non-HDL-C are more specific measures of atherogenic burden. Importantly, the practice of leaning
on cholesterol *ratios* has itself been questioned: <cite index="105-1">The continued widespread practice of calculating the ratio of LDL-C to HDL-C is not useful, because high HDL-C is not associated with reduced risk, so that a combination of high LDL-C and HDL-C may lead to the wrong conclusion that risk is not elevated.</cite> This directly supports keeping the TC/HDL ratio strictly secondary and non-overriding (§9, §22). **[A][C12][C17]**

**The wellness reading — [B]:** TC is a useful screening overview whose meaning lives in its components.
BioSense bands it, but always routes interpretation to LDL-C, HDL-C, non-HDL-C, and ApoB, and never lets
the total stand as a verdict.

**An honest boundary — [E]:** because TC combines opposing fractions, an isolated TC is genuinely
low-information; BioSense reflects that by capping isolated-TC confidence and requiring the component
caveat (§0.3, §11). **[E]**

---

# 4. Why Total Cholesterol Matters (and its limits)

**1. It is a useful screening and historical marker. [A][C14]** Cheap, ubiquitous, long-tracked — good
for a first look and for trends over years. **[A]**

**2. Its meaning is in its components. [A][C7]** TC's wellness value is unlocked only by seeing the
fractions; alone, it can mislead in either direction. **[A]**

**3. It is less specific than ApoB/non-HDL-C/LDL-C. [A][C17]** For atherogenic burden, the components —
especially ApoB — carry greater weight. **[A]**

**Why BioSense includes it — [C]:** TC is a familiar, widely available screening overview and the governed
parent of non-HDL-C — valuable when interpreted honestly (with components) and governed properly (as a
parent observation).

---

# 5. Measurement & Parent-Observation Definition  *(dual-role adaptation — founder §6)*

## 5.1 Measurement — [A]
TC is measured directly by enzymatic assay on the standard lipid panel (or reported as part of a panel),
standardised and broadly comparable between laboratories. **[A][C15]** Fasting is not required for TC
itself, though a raised screening TC on a non-fasting sample prompts a fasting panel. <cite index="87-1">If the testing sample was non-fasting, only values of total cholesterol (TC) and HDL should be considered evaluable. If abnormal (TC > 200 mg/dL or HDL < 40 mg/dL), then a repeat fasting lipoprotein profile should be done.</cite> **[A][C5]**

## 5.2 TC as a governed parent observation (consumed by SCL-007) — [C]
SCL-008 is **authoritative for whether a TC observation is valid and eligible** to be a parent of the
non-HDL-C derivation. A TC observation is a valid, eligible parent **iff**: **[C][F6]**
- its **unit is known** and it is **normalised** to mg/dL;
- it is a **final laboratory result** (not preliminary);
- it shares the **same sample / panel / date** as the HDL-C parent;
- it passes the analytical and pre-analytical checks (§8);
- its **lab-reported value is retained** unchanged with provenance.

Provenance fields supplied downstream: `obs_id`, `value_reported + unit`, `normalised_value`,
`sample_date`, `panel_id`, `final_status`, `analytical_flags`, `confidence_state`. **[C][F6]** SCL-007
remains authoritative for the equation and derived-observation governance; SCL-008 governs the TC parent's
validity/eligibility and confidence. **[C]**

---

# 6. Units

- **mg/dL** — standard in the US. **BioSense canonical unit.** **[A/C]**
- **mmol/L** — standard elsewhere. **[A]**
- Cholesterol conversion factor **38.67** (same as LDL-C/HDL-C/non-HDL-C; **not** the triglyceride 88.57). **[A][C9]**

BioSense stores the reported value and unit unchanged; a unit-unknown TC cannot be a valid parent (§5.2). **[C]**

---

# 7. Unit Conversion

```
mg/dL  = mmol/L × 38.67
mmol/L = mg/dL ÷ 38.67
```
Worked checks: 200 mg/dL ≈ 5.17 mmol/L; 240 mg/dL ≈ 6.20 mmol/L. **[A]**

**Safety rule [D]:** the cholesterol factor (38.67) applies — never the triglyceride factor; a unit-unknown
TC is displayed but not interpreted, and cannot serve as a derivation parent (§5.2). **[D]**

---

# 8. Measurement Limitations, Analytical & Pre-analytical Checks  *(also the parent validity basis)*

## 8.1 The core interpretive limitation — [A]
TC's dominant limitation is not analytical but **interpretive**: it combines atherogenic and
non-atherogenic cholesterol, so it cannot, alone, show what drives the value (§1, §9). This is why isolated
TC is capped at REDUCED confidence (§0.3). **[A][C6][C7]**

## 8.2 Analytical performance — [A]
TC assays are well standardised; the NCEP analytical total-error goal is ≤8.9% (bias ≤3%, CV ≤3%). **[A][C10]**
This is the same figure that anchors the SCL-007 reconciliation tolerance — kept consistent here. **[A]**

## 8.3 Pre-analytical — [A]
- **Fasting not required for TC**, but a raised screening TC prompts a fasting panel (§5.1). **[A][C5]**
- **Acute illness** can transiently alter cholesterol; a confidence reducer. **[A]**
- **Method/biological variation** means small differences may be noise (trend caution, §16). **[A]**

## 8.4 Parent-validity checks — [C]
For its parent role, a TC observation must be unit-known, normalised, final, and same-sample as HDL-C
(§5.2). Failing any of these makes it **ineligible** as a parent → SCL-007 abstains (§0.5, §21). **[C][F6][F7]**

**How BioSense uses this — [C][D]:** standalone confidence is capped and caveated (§0.3); as a parent,
validity/eligibility is gated (§5.2) and confidence propagates into non-HDL-C (reduced propagates,
invalidity blocks).

---

# 9. Relationships With Other Biomarkers  *(component-routing — founder §4, §8)*

TC is **defined by** its components, so this section is central rather than supplementary. **[A][C]**

- **HDL-C (SCL-004). [A]** A *non-atherogenic* component. A high TC driven by a favourable HDL-C is **not**
  adverse (CAV4, S10). HDL-C is preserved as **separate** context, never merged into the TC verdict. **[A][F4]**
- **LDL-C (SCL-003). [A]** The main atherogenic component and primary therapy target; a high TC with high
  LDL-C means the **component pattern** is the informative finding (CAV5). **[A][C17][F4]**
- **Non-HDL-C (SCL-007). [A]** `non-HDL-C = TC − HDL-C`; TC is its **parent**. Non-HDL-C captures all
  atherogenic cholesterol and is prioritised over TC. **[A][C8][F3]**
- **ApoB (SCL-001). [A]** The most specific atherogenic-burden marker; **prioritised** over TC and weighted
  for particle number. **[A][C17][F3]**
- **Triglycerides (SCL-005). [A]** Contribute to TC via VLDL cholesterol; high TG shifts weight to
  non-HDL-C/ApoB. **[A]**

**TC/HDL ratio — contained (founder §8) [C].** BioSense does **not** auto-introduce the TC/HDL ratio as a
primary interpretation target merely because both inputs exist. If ever used, it must be a **separately
governed derived metric** with its own equation id/version, evidence-anchored, **secondary** to
ApoB/non-HDL-C/LDL-C, and **never overriding** them — and the evidence itself cautions that cholesterol
ratios can mislead when HDL-C is high (C12). SCL-008 must not silently create a ratio engine outside the
established derived-biomarker governance. **[C][F8][C12]**

**Engine implication [C]:** interpretation is always routed to components; ApoB/non-HDL-C/LDL-C carry
greater weight; HDL-C is separate; bands are never averaged or merged; the ratio is contained.

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **TC categories:** desirable <200, borderline-high 200–239, high ≥240 mg/dL. <cite index="87-1">Total Cholesterol <200 Desirable · 200-239 Borderline high · ≥240 High.</cite> **[A][C1-C3]**
- **TC is a composite** of atherogenic and non-atherogenic cholesterol; components carry the meaning. **[A][C6][C7]**
- **LDL-C is the primary target; ApoB/non-HDL-C more specific** for atherogenic burden. **[A][C17]**
- **Higher TC tracks higher population risk** (≈2× at 240 vs 200), but not fraction-specifically. **[A][C4]**
- **Lower is better generally; no formal lower limit** for TC/LDL/VLDL. **[A][C13]**

## 10.2 Where they differ — and why
- **Cholesterol ratios are debated.** Some references present TC/HDL risk bands (C11); others caution the
  LDL-C/HDL-C ratio is "not useful" because high HDL-C isn't protective (C12). BioSense resolves this by
  **containing** the ratio (§9). **[A][E]**
- **Screening vs diagnostic emphasis.** TC is a screening overview; modern practice interprets via
  components. **[A]**
- **Why:** TC's composite nature is settled; the disagreement is about how much weight a *single composite
  number* or a *ratio* deserves — which is exactly why BioSense keeps TC and the ratio subordinate to the
  components. **[A][E]**

## 10.3 Strength of evidence
- **TC categories: established / universal.** **[A]**
- **Composite-limitation & component priority: established.** **[A][C7][C17]**
- **Population risk gradient: established.** **[A][C4]**
- **TC/HDL ratio: mixed / cautioned** → contained. **[E][C11][C12]**
- **Analytical goal (parent role): established / standardisation.** **[A][C10]**

## 10.4 Intended populations
TC categories target general-adult screening. BioSense applies them to a general-adult wellness audience
with the limited-standalone confidence cap and component-routing, and defines TC's parent validity for the
SCL-007 derivation.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. Total cholesterol is a LIMITED STANDALONE marker: these
> bands are always read alongside the components, and an isolated total is lower-confidence.**

## 11.1 The interpretation bands (mg/dL; general adult, primary prevention, untreated)

| BioSense Wellness Interpretation | Associated TC (mg/dL) | ≈ mmol/L | Evidence anchor | Wellness meaning (always read with components) |
|---|---|---|---|---|
| **Desirable** | < 200 | < ~5.2 | NCEP "desirable" [C1] | A desirable overall cholesterol total — check components to confirm the picture. |
| **Borderline High** | 200 – 239 | ~5.2–6.2 | NCEP "borderline high" [C2] | Slightly above desirable; the components show whether this is favourable (HDL) or not (atherogenic). |
| **High** | ≥ 240 | ≥ ~6.2 | NCEP "high" [C3] | Above desirable; the component pattern (ApoB/non-HDL-C/LDL-C vs HDL-C) is the informative finding. |

## 11.2 How the bands were derived — transparency [B]
- Each boundary maps directly to a recognised NCEP TC category (C1–C3). BioSense adopts the categories and
  applies wellness labels, without restating any diagnostic interpretation.
- **No band, on its own, is a verdict.** Every TC interpretation routes to the components (§0.4, §14).
- **No number was averaged.** The NCEP categories are reproduced faithfully.

## 11.3 The standalone confidence cap (Option A — founder §2) [C][D]
When component markers are unavailable, BioSense **still bands** TC (it does not abstain), but **caps
confidence at REDUCED** and attaches the **mandatory component-context caveat** (CAV2), explaining the
total cannot show which fraction drives it. An isolated TC is **never** assigned STANDARD or HIGH
confidence. **[C][F2]**

## 11.4 Component-context interpretation [C]
When components are present, the band is interpreted in their context: BioSense identifies the driving
fraction, prioritises ApoB/non-HDL-C/LDL-C, keeps HDL-C separate, and never averages bands (§14). A high
TC driven by favourable HDL-C is not framed as adverse; a high TC with elevated atherogenic components is
described as a component-pattern finding. **[C][F3][F4]**

## 11.5 Population caveat [E]
These bands assume a **general adult, primary prevention, not on lipid-lowering therapy**. Not applied to
children/adolescents or pregnancy (§15). The bands are a screening overview, not a fraction-specific
assessment.

## 11.6 The low end — no wellness penalty [B][D]
As with ApoB/LDL-C/non-HDL-C, TC banding is **monotonic, lower-better, with no low-end penalty**; there is
no formal lower limit for total cholesterol. A low TC is never scored adverse or alarmed. **[D][C13]**

---

# 12. Interpretation Framework

Fixed deterministic order (consistent with the ENG four-state model), with a **standalone-vs-component**
branch and the parent-observation role. **[C]**

```
1. VALIDITY   — value interpretable? (unit known/normalised; result final) → else display-only.
2. ELIGIBILITY— may we band? (general adult, not pregnant) → else abstain (§15).
3. COMPONENTS?— are HDL-C/LDL-C/non-HDL-C/ApoB available?
     NO  → band + CAP confidence at REDUCED + mandatory component caveat (CAV2).        [F2]
     YES → band + interpret in component context; identify driving fraction; prioritise ApoB/non-HDL-C/LDL-C;
           HDL-C separate; never average bands.                                          [F3,F4]
4. CONFIDENCE — standalone: REDUCED (capped); with-components: up to STANDARD (still component-led).
5. BAND       — assign BioSense wellness interpretation (§11).
6. PARENT     — (if part of a panel with HDL-C) expose TC parent validity/provenance to SCL-007 (§5.2). [F6]
7. NARRATIVE  — select wellness narrative (§24) + mandatory caveats (§0.9); never a verdict from TC alone.
```

**Core interpretive stance [B]:** TC is a useful screening overview whose meaning lives in its components —
band it, cap it when isolated, always route to the fractions, and never let it drive a verdict. **[B][D]**

---

# 13. Confidence Assessment  *(adapted: standalone cap + parent propagation)*

Standalone TC confidence is **capped at REDUCED** (founder §2); with components it may reach STANDARD but
interpretation remains component-led. **[C][F2]**

| Confidence input | Effect | Source |
|---|---|---|
| Components UNAVAILABLE (isolated TC) | Confidence CAPPED at REDUCED + mandatory caveat | [F2] |
| Components available | Up to STANDARD; interpretation component-led | [F3] |
| Non-fasting screening TC >200 | REDUCED + fasting-panel suggestion | [C5] |
| Acute illness | REDUCED | [A] |
| On lipid-lowering therapy | REDUCED (treated state) | [A] |
| Method change between tests | REDUCED (trend caution) | [A] |
| Value near a band boundary | REDUCED | [B] |

**Parent propagation into non-HDL-C (SCL-007):** reduced propagates, invalidity blocks. **[F7]**

| Parent-validity BLOCK (SCL-007 must not derive) | Source |
|---|---|
| TC invalid / missing / unit-unknown / not-final | [F6] |
| TC from mismatched sample/date vs HDL-C | [F6] |

---

# 14. Wellness Interpretation  *(always component-routed — founder §4)*

Interpretation-by-interpretation guidance, always routed to components. Wellness, not medical; never
diagnostic labels; TC alone never a verdict. **[B]/[D]**

- **BioSense Wellness Interpretation: Desirable** *(<200 mg/dL).* "Your total cholesterol is in the
  desirable range — a good overall screening result. To confirm the full picture, it's worth looking at
  your HDL, LDL, non-HDL and ApoB." **[B]**
- **BioSense Wellness Interpretation: Borderline High** *(200–239).* "Your total cholesterol is a little
  above desirable. Because the total combines different particles, the components tell you whether this is
  favourable or worth optimising — a higher total driven by a strong HDL is a different story from one
  driven by higher LDL or ApoB." **[B]**
- **BioSense Wellness Interpretation: High** *(≥240).* "Your total cholesterol is above the desirable
  range. The most useful next step is to look at the components: if your ApoB, non-HDL-C or LDL-C are
  elevated, that's the informative finding and where optimisation focuses; if the total is high mainly
  because your HDL is favourable, that's a different and less concerning pattern." Constructive,
  component-led. **[B]**

**Isolated-TC modifier (mandatory):** when components are unavailable, every interpretation carries the
mandatory component caveat (CAV2) and REDUCED confidence, and encourages obtaining the components. **[D][F2]**

**High-TC-from-favourable-HDL modifier:** where components show the total is elevated mainly because HDL-C
is favourable, the narrative explicitly frames this as **not adverse** (CAV4, S10). **[D][F4]**

**Component-pattern modifier:** where ApoB/non-HDL-C/LDL-C are elevated, the narrative states the
**component pattern** is the more informative finding (CAV5). **[D][F4]**

Every interpretation pairs the reading with a lifestyle lever (§17) and the mandatory caveats (§0.9).
**None names a condition, and none lets TC alone drive a strong review or verdict (S2, S4).** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains** where its bands don't apply — but note that, per founder §2, **unavailable components
is NOT a reason to abstain** (it caps confidence instead). **[C]/[D]/[E]**

- **15.1 Components unavailable.** **Not** an abstention — band at REDUCED confidence + mandatory caveat
  (§0.3, §11.3). **[C][F2]**
- **15.2 Children & adolescents.** Adult bands not applied; display, suggest professional interpretation. **[D]**
- **15.3 Pregnancy.** Lipids shift physiologically; BioSense does not band, notes this, defers to a
  professional. **[D]**
- **15.4 Markedly low TC.** Never a concern, never penalised (no formal lower limit); neutral wording
  without naming a cause. **[D][C13]**
- **15.5 On lipid-lowering therapy.** Band allowed, framed as reflecting current management; never any
  implication about changing treatment (S8). **[D]**
- **15.6 Parent-role ineligibility.** If TC is invalid/ineligible as a parent, SCL-007 abstains from
  deriving non-HDL-C (a *derivation* abstention, governed there); TC itself may still be shown standalone. **[C][F7]**

**Abstention is a first-class, non-error output**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **What counts as a real change. [A][E]** Small differences can be biological/analytical variation; framed
  as meaningful only beyond that.
- **Trend is component-aware. [B]** A moving total is only interpreted through its components — a rising TC
  driven by rising HDL is a different trend from one driven by rising LDL/ApoB (§14).
- **Parent-correction propagation. [C]** If a TC value is corrected/replaced/invalidated, any non-HDL-C
  derived from it is recalculated under SCL-007's audit rules; historical provenance is never mutated. **[F7]**
- **Direction & framing. [B]** Downward (in atherogenic-driven totals) = improving; low-end has no penalty
  (§11.6). A total that is "high" only because HDL is favourable is not framed as a problem to fix.
- **Method changes. [A]** Flagged as possibly method-related, not a true change.

---

# 17. Lifestyle Optimisation Guidance

Lifestyle is the first tier; the levers are the cholesterol-lowering ones shared with LDL-C/non-HDL-C.
**[A]/[B]**

## 17.1 Nutrition [A][C16]
- **Reduce saturated and trans fat; replace with unsaturated fats** — the primary dietary lever on
  atherogenic cholesterol. **Strong.** **[A]**
- **Soluble fibre and a whole-food (Mediterranean-style) pattern** support a healthier lipid profile. **[A]**

## 17.2 Physical activity, weight [A][C16]
Regular activity and healthy body composition improve the overall lipid profile. **[A]**

## 17.3 Framing rules [B][D]
Lifestyle first; medication never suggested. Honest framing: lifestyle targets the atherogenic components
that matter — and because a favourable HDL can raise the total, "lowering total cholesterol" is never the
goal in itself; optimising the components is.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain the band and what TC is (a composite screening overview); always route to
the components; explain which fraction drives the total when components are present; acknowledge progress;
explain the isolated-TC caveat and the parent role respectfully.

The AI layer **must never**:
- present TC alone as a complete cardiovascular-wellness verdict (S2)
- assign STANDARD/HIGH confidence to an isolated TC, or omit the mandatory component caveat (S3)
- let TC alone trigger a strong healthcare-review, drive medication language, determine a risk category,
  or produce a risk % (S4, S5, S6)
- let TC override ApoB/LDL-C/non-HDL-C (S7)
- frame a high TC driven by favourable HDL-C as adverse (S10)
- introduce the TC/HDL ratio as a primary target or let it override components (S11)
- state or imply a diagnosis or condition (S1)
- recommend starting/stopping/changing medication (S8)
- present a BioSense band as a medical/diagnostic boundary (S9)
- derive non-HDL-C from an invalid/ineligible TC parent (S12)

Enforcement is by output validation on rendered text, not by prompt alone. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; not a standalone verdict.** Every output carries CAV1; isolated TC carries the
  mandatory component caveat (CAV2) at REDUCED confidence (S2, S3). **[D]**
- **Components drive strength.** TC alone never triggers a strong review, medication language, a risk
  category, or a risk % — any stronger recommendation is driven by the components, declared context, or a
  separately governed risk methodology (S4–S7). **[D][F5]**
- **Favourable-HDL totals not pathologised.** A high total driven by favourable HDL-C is explicitly not
  framed as adverse (S10, CAV4). **[D][F4]**
- **Ratio contained.** The TC/HDL ratio is never an auto-primary or overriding signal (S11). **[D][F8]**
- **No medication guidance.** Medication questions → educational context + referral (S8). **[D]**
- **Low values not pathologised.** Neutral wording; no formal lower limit (§11.6). **[D]**
- **Parent integrity.** An invalid/ineligible TC never feeds a non-HDL-C derivation (S12). **[D][F7]**

---

# 20. Healthcare Provider Review Triggers  *(component-driven, not TC-driven — founder §5)*

TC **alone** never triggers a strong review. BioSense suggests (never mandates) a calm wellness
conversation with a healthcare professional when **the components or declared context** warrant it: **[D][F5]**
1. **ApoB / non-HDL-C / LDL-C are elevated** (per their own frozen packs) — the component pattern, not the
   total, drives this. **[C17]**
2. A **non-fasting screening TC >200** would benefit from a fasting panel (a re-test suggestion, not a
   strong review). **[C5]**
3. The user is in an **abstention population** (child/adolescent, pregnancy). 
4. The user **asks a medical or medication question** (S8).

All suggestions are wellness-framed, non-urgent, non-diagnostic. A "High" TC by itself yields
component-review guidance, **not** a strong healthcare-review recommendation. **[D][F5]**

---

# 21. BioSense Product Integration & Parent-Observation Role  *(founder §6, §7)*

How SCL-008 plugs into the existing platform (no architecture change), in both its roles: **[C]**

**Standalone marker:**
- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for TC, plus any available
  components (HDL-C/LDL-C/non-HDL-C/ApoB) for routing.
- **Supplies (as CSL bindings):** the wellness bands (Category B), the limited-standalone confidence cap,
  the component-routing logic, safety rules, lifestyle evidence, and narrative templates — each with value
  + source-ID + category + version.
- **Score contribution:** TC contributes to the cardiovascular-wellness domain **only weakly and
  component-mediated** — never overriding ApoB/non-HDL-C/LDL-C; isolated TC contributes at reduced
  confidence. Any weighting is a Category [C] product decision. **[C][F5]**

**Governed parent observation (for SCL-007):**
- **Authoritative for TC-parent validity/eligibility** (§5.2): unit-known + normalised + final +
  same-sample/panel as HDL-C + analytical checks. **[F6]**
- **Provenance supplied downstream:** obs_id, value_reported+unit, normalised_value, sample_date, panel_id,
  final_status, analytical_flags, confidence_state. **[F6]**
- **Confidence propagation:** reduced propagates, invalidity blocks (§0.5, §13). **[F7]**
- **Correction behaviour:** a corrected/replaced/invalidated TC triggers SCL-007 recalculation and audit;
  historical provenance never mutated. **[F7]**
- **Boundary of authority:** SCL-007 owns the non-HDL-C equation and derived-observation governance;
  SCL-008 owns whether the TC parent is valid and eligible. **[C]**

- **TC/HDL ratio:** **not** created here as an engine; any future ratio must be a separately governed
  derived metric under the SCL-007 pattern (§9, §22). **[F8]**

---

# 22. Medication & Ratio Context (educational only)

Educational context only; BioSense does not instruct on medication (S8). **[D]**
- Total cholesterol is a **screening** number; treatment decisions are driven by components (LDL-C primary;
  ApoB/non-HDL-C for residual burden) and overall risk — clinical decisions, not BioSense thresholds. **[A][C17]**
- **TC/HDL ratio:** if a future BioSense version surfaces it, it must be a **separately governed derived
  metric** (own equation id/version, evidence-anchored, secondary to ApoB/non-HDL-C/LDL-C, non-overriding),
  and the evidence caution that cholesterol ratios can mislead when HDL-C is high must be respected. It is
  **not** created by SCL-008. **[C][F8][C11][C12]**
- Any medication question → educational context + suggestion to speak with a healthcare professional. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **TC is intrinsically low-information alone. [E]** The confidence cap and component caveat reflect this;
   it is a feature, not a defect, of the policy.
2. **TC/HDL ratio evidence is mixed. [E]** Risk bands exist (C11) but ratios can mislead when HDL-C is high
   (C12); BioSense contains the ratio rather than adopting it. **[F8]**
3. **"Desirable <200" is a screening anchor. [E]** A reasonable, universal category, not a
   fraction-specific wellness target.
4. **Standalone confidence cap is a product policy. [E][C]** Option A (band + REDUCED + caveat) per founder
   §2; alternatives (context-only, or normal banding) were considered and not chosen.
5. **Parent same-sample enforcement depends on panel metadata. [E]** Where sample/panel identity is
   ambiguous, TC is ineligible as a parent and SCL-007 abstains.

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; never diagnostic labels; TC
never a standalone verdict). **[B]/[D]** (Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: DESIRABLE (with components)
"Your total cholesterol is {value} mg/dL ({mmol} mmol/L) — in the desirable range. Your components fill in
 the picture: {component summary}."  +CAV1

TEMPLATE: DESIRABLE (isolated)  [MANDATORY CAV2 + REDUCED]
"Your total cholesterol is {value} mg/dL ({mmol} mmol/L) — in the desirable range as a screening overview.
 Total cholesterol combines several different cholesterol-carrying particles, so this is more useful read
 alongside your HDL, LDL, non-HDL and ApoB."  +CAV1 +CAV2

TEMPLATE: BORDERLINE_HIGH / HIGH (with components)
"Your total cholesterol is {value} mg/dL ({mmol} mmol/L) — above the desirable range. The informative part
 is what's driving it: {if atherogenic elevated → 'your {ApoB/non-HDL-C/LDL-C} is the finding to focus on'}
 {if HDL-favourable → 'this is largely because your HDL is favourable, which isn't a concern in itself'}."
 +CAV1 (+CAV5 or +CAV4 as applicable)

TEMPLATE: BORDERLINE_HIGH / HIGH (isolated)  [MANDATORY CAV2 + REDUCED]
"Your total cholesterol is {value} mg/dL ({mmol} mmol/L) — above the desirable range as a screening
 overview. On its own, a total can't show whether this is driven by favourable HDL or by atherogenic
 particles, so it's best read alongside your HDL, LDL, non-HDL and ApoB."  +CAV1 +CAV2

MODIFIER: NON_FASTING_SCREEN (>200) → suggest a fasting panel (re-test, not a strong review).  +CAV3

MODIFIER: HIGH_TC_FROM_HDL → CAV4 (not adverse).
MODIFIER: COMPONENT_PATTERN_ELEVATED → CAV5 (component is the finding).
MODIFIER: LOW (markedly low) → "Your total cholesterol is on the low side, which isn't a wellness concern."  +CAV1
MODIFIER: SCREENING_FRAME → CAV6 (useful overview; components tell the fuller story).
```

**Absolute rules:** no template presents TC alone as a verdict, assigns STANDARD/HIGH confidence to an
isolated TC, omits CAV2 when isolated, frames favourable-HDL-driven totals as adverse, elevates the
TC/HDL ratio above components, or names a condition. **[D]**

---

# 25. Example Outputs

**Example 1 — Desirable, with components. [illustrative]**
```
Input: TC 185, HDL-C 60, LDL-C 105, non-HDL-C 125, ApoB 80. Components available.
Band: DESIRABLE | Confidence: STANDARD (component-led) | Isolated: false
Narrative: DESIRABLE (with components) +CAV1 ; Rec: Tier 1 maintain.
```

**Example 2 — Isolated TC, borderline high. [illustrative]**
```
Input: TC 225. No components available.
Band: BORDERLINE_HIGH | Confidence: REDUCED (capped, components unavailable)
Narrative: BORDERLINE_HIGH (isolated) +CAV1 +CAV2(mandatory) ; Rec: Tier 2 obtain components.
NOTE: no strong review; no medication language; no risk %.  [S3,S4,S5,S6]
```

**Example 3 — High TC driven by favourable HDL. [illustrative]**
```
Input: TC 245, HDL-C 85, LDL-C 130, non-HDL-C 160, ApoB 90.
Band: HIGH | Interpretation: HDL-favourable contributor identified; atherogenic components moderate.
Narrative: HIGH (with components) + HIGH_TC_FROM_HDL (CAV4) + note LDL/non-HDL for optimisation.
NOTE: total NOT framed as inherently adverse.  [S10]
```

**Example 4 — High TC with elevated atherogenic components. [illustrative]**
```
Input: TC 250, HDL-C 40, LDL-C 175, non-HDL-C 210, ApoB 140.
Band: HIGH | Interpretation: component pattern (ApoB/non-HDL-C/LDL-C) is the finding.
Narrative: HIGH (with components) + COMPONENT_PATTERN_ELEVATED (CAV5) ; review driven by COMPONENTS not TC.  [F5]
```

**Example 5 — Parent role: TC feeds non-HDL-C. [illustrative]**
```
Input: TC 210 (valid, final, same panel), HDL-C 50 (valid). 
Parent status: TC VALID + ELIGIBLE → SCL-007 derives non-HDL-C = 160; provenance incl. TC obs_id.
If TC were unit-unknown → INELIGIBLE → SCL-007 abstains.  [F6,F7,S12]
```

**Example 6 — Markedly low TC. [illustrative]**
```
Input: TC 140, components available and unremarkable.
Band: DESIRABLE | Narrative: neutral; low TC not a concern; no cause named.  [C13]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, discordance discipline, PI-4 rendering, governance).
- **SCL-001 (ApoB), SCL-003 (LDL-C), SCL-004 (HDL-C), SCL-005 (Triglycerides)** — the components TC is
  routed to; ApoB/non-HDL-C/LDL-C carry greater weight; HDL-C is separate context.
- **SCL-007 (non-HDL-C)** — consumes TC as a governed **parent**; owns the equation and derived-observation
  governance; SCL-008 owns TC-parent validity/eligibility and confidence propagation.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§0 Implementation Summary / §21** — developer-facing activation values and the parent-observation role.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the C-series/F-series
> IDs in §0 and the body. Developers finalising the pack should confirm exact page/table locators against
> the primary PDFs where required.

**Guidelines & categories (Category A anchors)**

1. Grundy SM, Cleeman JI, et al. **Third Report of the NCEP Expert Panel (ATP III), Final Report.**
   *Circulation* 2002;106(25):3143–3421. — *TC categories: desirable <200 / borderline-high 200–239 /
   high ≥240 mg/dL; non-fasting TC>200 or HDL<40 → repeat fasting panel; LDL-C primary target (C1–C3, C5, C17).*
2. American Diagnostic / ADLM (AACC) routine lipid testing summary (myadlm.org). — *TC categories confirmed;
   analytical error goals (C1–C3, C10).*
3. American Heart Association; CDC; MedlinePlus; Cleveland Clinic. — *TC combines atherogenic +
   non-atherogenic cholesterol; HDL "good", LDL "bad"; lower-better generally with no formal lower limit;
   screening cadence (C6, C7, C13, C14).*
4. InsideTracker / URMC patient references. — *A high total can be driven by high HDL or high LDL; which
   fraction drives the total matters more than the total (C7); TC/HDL ratio (C11).*

**Risk gradient & ratio (Category A/P)**

5. NIH/NCEP patient-education materials (via USPTO 8173160). — *TC 240 ≈ 2× heart-attack risk vs 200 (C4).*
6. Standard TC/HDL ratio risk bands (via USPTO 8598320; URMC). — *ratio risk categories (C11).*
7. Sundfør TM/März W et al.; **HDL-C reappraisal review** (PMC5565659). — *LDL-C/HDL-C ratio "not useful";
   high HDL-C not protective; ratios can mislead → supports ratio containment (C12).*

**Composition, measurement, analytical (Category A/S)**

8. MedlinePlus; NCEP ATP III. — *TC = HDL-C + LDL-C + VLDL-C; non-HDL-C = TC − HDL-C (C8).*
9. NCEP/CDC CRMLN Total Cholesterol certification protocols; ADLM guidance; Clinical Chemistry 2023;69(10):1145.
   — *TC analytical total-error goal ≤8.9–9% (bias ≤3%, CV ≤3%) — parent-role QA (C10).*

**Lifestyle (Category A)**

10. NCEP ATP III Therapeutic Lifestyle Changes; AHA lifestyle guidance. — *Saturated/trans fat reduction,
    fibre, activity, weight lower atherogenic cholesterol (C16).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–2; they are
> BioSense Version 1 classifications, not attributable to any single reference as a diagnostic threshold,
> and do not restate diagnostic labels. **Total cholesterol is treated as a limited standalone marker,
> always routed to its components.**

---

# 28. Founder Decisions Required

The Total Cholesterol role and parent-observation governance were resolved by founder decision (Option A;
§1–§9) and are implemented in this pack. Two optional presentation/policy items remain: **[C][E]**

**D-1 — Confirm the BioSense V1 Wellness Interpretation Band boundaries.** §11 adopts the NCEP categories
(200/240). Confirmation requested that these screening categories are the correct wellness anchors for the
general-adult default. **Founder sign-off requested.**

**D-2 — Confirm the TC/HDL-ratio posture.** §9/§22 contain the ratio (not surfaced in V1; if ever used, a
separately governed, secondary, non-overriding derived metric). **Founder decision requested** on whether
V1 surfaces the ratio at all, and if so under what governance.

*(Both affect presentation/handling, not the underlying evidence or the resolved governance.)*

---

**END OF SCL-008 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/
analytical figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. The
limited-standalone confidence cap, the mandatory component-context caveat, the component-routing
interpretation, the parent-observation governance (validity, provenance, confidence propagation into
SCL-007), and the TC/HDL-ratio containment were adapted per the founder decision; all other structure
follows SCL-001 exactly and remains consistent with SCL-001 through SCL-007.*
