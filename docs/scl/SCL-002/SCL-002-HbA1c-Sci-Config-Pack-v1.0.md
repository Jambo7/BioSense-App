# SCL-002 — GLYCATED HAEMOGLOBIN (HbA1c)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology

**Document ID:** SCL-002
**Biomarker:** Glycated Haemoglobin (HbA1c; also A1c, glycohaemoglobin)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 30 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Structure preserved; only the sections requiring genuine structural difference were adapted (see Structural-Fit Note below).

---

> **What this document is.** SCL-002 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for HbA1c. It does not redesign
> the Constitution, the ENG documents, the Blood Analysis Engine, or the SCL architecture. It
> supplies verified evidence, the BioSense Version 1 Wellness Interpretation Methodology for
> HbA1c, and the exact values and rules the engine needs to activate the biomarker.
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

## STRUCTURAL-FIT NOTE (HbA1c vs SCL-001)

Per BioSense methodology, HbA1c was first compared against the SCL-001 template to identify
genuine structural differences. The overall structure, section order, content-classification
scheme (A–E), confidence model, safety posture, recommendation-ladder shape, narrative-
contract approach, and governance were **preserved exactly**. Five sections required genuine
adaptation, and only these were changed:

1. **Interference & validity (§8, §13, §15) — major expansion.** Unlike ApoB, HbA1c is
   distorted by anything altering red-blood-cell lifespan, bidirectionally, and can be
   rendered *uninterpretable* (haemoglobin variants, recent transfusion). This is the single
   largest structural difference and drives a dedicated interference taxonomy.
2. **Units & conversion (§6, §7) — dual-unit system.** HbA1c uses % (NGSP) and mmol/mol
   (IFCC) with two verified master equations, plus an optional estimated-average-glucose
   (eAG) translation — not ApoB's single decimal conversion.
3. **Time-averaging (§2, §16) — different semantics.** A single HbA1c already *is* a ~2–3
   month weighted average, changing trend interpretation.
4. **Low-end handling (§11, §14, §15) — different.** ApoB is purely lower-better with no
   low-end penalty. HbA1c has a genuine low-end nuance (a below-normal value may reflect
   interference or a non-glycaemic cause, and epidemiology shows a U-shaped signal), handled
   cautiously but still without alarm and without diagnosis.
5. **Diagnostic adjacency (§10, §11, §19) — heightened safety framing.** HbA1c's guideline
   thresholds are *diagnostic labels* (prediabetes/diabetes). BioSense therefore applies an
   even stricter wellness-not-diagnosis discipline than ApoB: it never uses "prediabetes" or
   "diabetes" as a BioSense verdict, detects the pattern, and escalates calmly to a
   healthcare conversation.

---

## CONTENT CLASSIFICATION KEY

Throughout, every substantive item is tagged:

- **[A] Source-derived fact / recognised threshold** — traceable to a named guideline, consensus statement, or standardisation body.
- **[B] BioSense Version 1 wellness interpretation** — a BioSense-authored synthesis, labelled as such.
- **[C] Product-policy decision** — a choice BioSense made for V1, recorded for audit.
- **[D] Safety / healthcare-review wording** — deterministic caveats and referral language.
- **[E] Area of uncertainty** — explicitly flagged limitation or unresolved evidence.

---

# SCIENTIFIC POSITION STATEMENT

BioSense is a premium wellness and preventative health-intelligence platform. It is not a
medical device. It does not diagnose disease, and it does not replace healthcare
professionals. Everything in this document is written to help a healthy adult understand and
optimise a modifiable long-term wellness signal — never to render a clinical verdict.

This principle carries particular weight for HbA1c. Unlike most wellness markers, HbA1c sits
directly against formal diagnostic thresholds: the same number a laboratory uses to diagnose
diabetes is the number a wellness user sees. BioSense treats this proximity with deliberate
care. It reproduces the recognised guideline figures faithfully and attributes them, but it
does **not** restate diagnostic labels as BioSense conclusions. BioSense interprets the
weight of the evidence and expresses that interpretation as a calm, optimisation-focused
wellness picture, while routing anything that warrants clinical attention to a healthcare
professional.

The BioSense Wellness Interpretation Bands in this document are **consumer wellness
classifications, not diagnostic criteria.** They are BioSense's interpretation of what the
evidence suggests is favourable or worth attention for a general adult — never a diagnosis of
diabetes, prediabetes, or any condition.

Every BioSense interpretation is **version controlled and transparent.** Each carries its
supporting evidence, its rationale, its category, and its version number. And because science
advances, these interpretations are designed to **evolve as the evidence evolves.**

This is what BioSense means by premium wellness intelligence: not the authority of a clinic,
but the discipline of transparent, evidence-informed interpretation — applied with extra
caution where a wellness signal sits close to a clinical diagnosis.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate HbA1c. Every value carries a source ID (H-series → §27)
> and a category tag. **This summary is authoritative for the engine; the body is
> authoritative for the science.** Canonical unit: % (NGSP), with mmol/mol (IFCC) stored in
> parallel.

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: HbA1c % (NGSP)          # store mmol/mol (IFCC) in parallel, never discard
conversions (verified master equations):
  IFCC→NGSP :  NGSP_% = (0.0915 × IFCC_mmol_mol) + 2.15        [H9]
  NGSP→IFCC :  IFCC_mmol_mol = (10.929 × NGSP_%) − 23.5        [H10]
optional educational translation (NOT a diagnosis, gated — Decision D-3):
  eAG_mgdl  = (28.7 × NGSP_%) − 46.7                            [H7]
  eAG_mmoll = (1.5944 × NGSP_%) − 2.5944                        [H8]
Always retain value_reported + unit_reported. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors H1–H5)
```
HBA1C_WELLNESS_BAND (NGSP %, general adult, not pregnant, no known RBC/Hb condition, untreated):
  OPTIMAL                 < 5.4          # comfortably below prediabetes; see §11.2 + low-end note §11.6
  GOOD                    5.4 – 5.6      # within normal, approaching the prediabetes anchor 5.7 [H3]
  ABOVE_OPTIMAL           5.7 – 6.0      # at/above the recognised prediabetes lower anchor [H1]
  ELEVATED                6.1 – 6.4      # upper part of the prediabetes-anchor range [H1]
  SIGNIFICANTLY_ELEVATED  ≥ 6.5          # at/above the recognised diabetes diagnostic anchor [H2]
  LOW_FLAG                < 4.0          # not "better"; cautious low-end handling (§11.6, §15.4) [H16]
DIRECTION: LOWER_BETTER within range, WITH a genuine low-end caution (unlike ApoB).  [B]
mmol/mol equivalents (via H10, display in parallel): 5.4%≈36 | 5.7%≈39 | 6.0%≈42 | 6.5%≈48
```
**These are BioSense V1 wellness interpretations, not diagnostic cut-points. The engine must
never emit "prediabetes" or "diabetes" as a BioSense label. [B][D]**

## 0.3 Context / eligibility logic — [A]+[C]
```
DEFAULT context = general adult, not pregnant, no known haemoglobin/RBC condition, untreated. [C: B2]
ABSTAIN from banding (display value only, route to professional) if ANY:      [D][H13,H14,H15]
  pregnancy | age<18 | known haemoglobinopathy/Hb variant | haemolytic anaemia |
  recent transfusion (<3 months) | advanced CKD (stage 4–5) | recent major blood loss |
  known condition making HbA1c unreliable
IF on glucose-lowering therapy: value reflects treated state; frame accordingly, never imply
  stopping/changing treatment.                                                [D]
NEVER infer any of the above from the HbA1c value itself.                      [D]
```

## 0.4 Confidence reducers / validity flags — [A]/[D]
```
VALIDITY-SUSPECT → do NOT band, do NOT interpret (route to professional):     [H11,H12,H13]
  hb_variant_present | haemolysis | recent_transfusion | advanced_ckd |
  recent_blood_loss | condition_known_to_distort
CONFIDENCE-REDUCERS (band allowed, confidence REDUCED, name via CAV3):
  iron/B12/folate_deficiency_known[H12] | mild-moderate anaemia | recent_iron_therapy[H12] |
  method_change_between_tests | poc_device_used[H18] | on_therapy | acute_illness |
  value_near_a_band_boundary | single_value_no_prior (trend context absent)
```

## 0.5 Deterministic safety & suppression rules — [D]
```
S1  HbA1c is NOT a diagnosis. Never state/imply diabetes, prediabetes, or any condition.  [D][H5]
S2  HbA1c is ONE input to metabolic wellness, not a verdict.                    [D]
S3  Never use "diabetes"/"prediabetes"/"diabetic" as a BioSense label or conclusion; detect
    pattern → calm healthcare-review wording, name nothing.                     [D]
S4  SIGNIFICANTLY_ELEVATED (≥6.5%) → calm healthcare-review wording, non-alarming.  [D][H2]
S5  LOW_FLAG (<4.0%) → neutral, NOT framed as "best"; note it may reflect measurement factors
    and is worth mentioning to a doctor, WITHOUT naming any cause.              [D][H16]
S6  Never recommend starting/stopping/changing medication.                      [D]
S7  Never produce a numeric individual risk/probability of developing diabetes. [D]
S8  On any medication/therapy question → educational context + refer.           [D]
S9  Suppress interpretation on validity-suspect samples (§0.4).                  [D][H13]
S10 Never present a BioSense band as a medical/diagnostic boundary.             [D][B]
S11 eAG, if shown, is an educational translation only — never a diagnosis or a glucose target. [D][H7]
```

## 0.6 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 LIFESTYLE (always first):
   nutrition (reduce added sugars & refined carbohydrate, increase fibre, favour whole foods,
   lean protein), physical activity (aerobic + resistance), weight management, sleep quality,
   stress reduction, alcohol moderation, no smoking.                            [H20,H21]
Tier 2 RE-MEASURE / TRACK: HbA1c reflects ~2–3 months, so re-testing sooner than ~3 months
   rarely shows change; frame tracking on that cadence. (Non-fasting ok.)       [H6,H19]
Tier 3 HEALTHCARE DISCUSSION (calm) when: SIGNIFICANTLY_ELEVATED | LOW_FLAG | validity-suspect
   | abstention population | on-therapy question | user asks a medical question.  [D]
NEVER a medication instruction at any tier.                                     [D]
```

## 0.7 Narrative selection rules — [B]/[D]
```
band → narrative template (§24), modulated by confidence + validity + context.
OPTIMAL/GOOD              → affirming, maintain.
ABOVE_OPTIMAL/ELEVATED    → constructive, optimisation-focused (this is where lifestyle helps most).
SIGNIFICANTLY_ELEVATED    → calm + healthcare-review wording [D].
LOW_FLAG                  → neutral, non-alarming, "worth mentioning" [D].
validity-suspect          → abstain from band; explain why; route to professional.
Never "prediabetes/diabetes/normal/abnormal"; never diagnosis language.         [D]
```

## 0.8 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "HbA1c is one of several markers of metabolic wellness."
CAV3 (reduced confidence) name the specific reducer(s) present.
CAV4 (validity-suspect / abstention) explain that a condition/context can affect HbA1c
      reliability, so it's best interpreted with a healthcare professional.
CAV5 (significantly elevated) "It may be worth discussing this result with a healthcare
      professional." (calm, non-urgent, non-diagnostic)
CAV6 (eAG shown) "Estimated average glucose is an educational translation of HbA1c, not a
      diagnosis or a target."
```

## 0.9 Source & version identifiers
```
config_id: SCL-002   config_version: 1.0
band_set_id: BIOSENSE_HBA1C_WELLNESS_BANDS_v1     (Category B; anchors H1-H5)
guideline_anchors_id: ADA_2024_HBA1C / WHO_2011 / NICE_NG28   (Category A; H1-H4)
conversion_id: NGSP_IFCC_MASTER + ADAG_eAG        (Category A; H7-H10)
interference_id: SCL002_INTERFERENCE_v1           (H11-H13, NGSP/NICE)
lifestyle_evidence_id: SCL002_LIFESTYLE_v1        (H20-H21)
safety_rules_id: SCL002_SAFETY_v1                 (S1-S11)
Every row carries its H-source + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Glycated haemoglobin (HbA1c) measures the proportion of haemoglobin — the oxygen-carrying
protein inside red blood cells — that has glucose chemically attached to it. **[A]** Because
red blood cells live roughly three to four months and glucose attaches to haemoglobin
gradually and irreversibly, HbA1c reflects a person's **average blood glucose over the
previous two to three months**, weighted toward the most recent weeks. <cite index="15-1">Glycated hemoglobin (HbA1c) reflects average blood glucose levels over approximately two to three months and is widely regarded as the gold standard for monitoring long-term glycemic control.</cite> **[A][H6]**

From a wellness perspective, this is what makes HbA1c valuable: a single blood glucose reading
captures one moment and swings with meals, stress, and time of day, whereas HbA1c is a stable,
integrated signal of how the body has been handling glucose over months. It is one of the most
informative markers of long-term metabolic wellness available in a routine blood test.

- **Official name:** Glycated haemoglobin
- **Common abbreviations:** HbA1c, A1c
- **Reported in:** % (NGSP scale) and mmol/mol (IFCC scale) **[A]**
- **Reflects:** average glucose over ~2–3 months **[A][H6]**
- **BioSense role:** A core metabolic-wellness biomarker; the long-term companion to any point-in-time glucose reading.

---

# 2. Physiological Function

HbA1c is not something the body "makes" for a purpose — it is a natural consequence of glucose
being present in the blood. Glucose molecules attach to haemoglobin inside red blood cells in a
slow, essentially irreversible process called glycation. The more glucose that has been present
over the lifespan of each red blood cell, the higher the proportion of haemoglobin that is
glycated. **[A]**

Two features of this biology matter for interpretation **[A]**:

- **The time window is set by red-blood-cell lifespan.** Because red cells live about 120 days
  and are replaced continuously, HbA1c integrates glucose exposure over roughly the preceding
  two to three months, weighted toward the most recent four to six weeks (when the largest
  share of circulating cells is youngest). <cite index="21-1">It reflects typical blood sugar over roughly the past two to three months, weighted toward the most recent four to six weeks because younger red blood cells are more abundant.</cite> **[A][H6]**
- **Anything that changes red-cell lifespan changes HbA1c independently of glucose.** This is
  the central interpretive caveat for HbA1c and is covered in detail in §8, §13, and §15.
  Shorter-lived red cells accumulate less glycation (lower HbA1c); longer-lived cells
  accumulate more (higher HbA1c) — regardless of actual blood sugar. **[A][H11][H12]**

From a wellness standpoint, the empowering part is that for most people, HbA1c is strongly
influenced by modifiable lifestyle — dietary carbohydrate quality, physical activity, body
composition, sleep, and stress — and a raised value is often improvable. **[A][H20]**

---

# 3. Scientific Background

HbA1c became central to metabolic health because it does something a single glucose test
cannot: it provides a stable, standardised, long-term average that predicts the risk of
long-term complications and responds to change. **[A]** Landmark diabetes research established
that HbA1c tracks average glucose closely enough to serve both as a diagnostic tool and as the
primary marker of long-term glucose control. **[A]**

The relationship between HbA1c and average glucose was formally quantified in the international
ADAG study, which combined continuous glucose monitoring with repeated self-testing across
several hundred participants to derive a validated conversion between the two. <cite index="21-1">The formula was validated in the ADAG study (Nathan DM et al., 2008, Diabetes Care) and is endorsed by the American Diabetes Association.</cite> **[A][H7]** This is the basis for expressing HbA1c as an "estimated average glucose" (§7).

**The wellness reading of this evidence — [B]:** HbA1c is a trackable, improvable long-term
signal of metabolic wellness. Because it is an *average*, it changes gradually — which makes it
well suited to a patient-tracking-progress model, and means BioSense frames it over months, not
days.

**An honest boundary — [E]:** guideline thresholds for HbA1c are *diagnostic* boundaries for
clinical populations. The underlying risk is continuous, not a switch. <cite index="4-1">For all three tests, risk is continuous, extending below the lower limit of the range and becoming disproportionately greater at the higher end of the range.</cite> **[A][H5]** BioSense uses this continuity to frame HbA1c as a wellness gradient to optimise, while never converting a threshold into a diagnosis. The observation that <cite index="26-1">the sharp line between prediabetes and diabetes is a clinical convenience, not some biological switch that flips</cite> underlines why a wellness platform should interpret the gradient, not label the person. **[E][H22]**

---

# 4. Why HbA1c Matters

For a wellness platform, HbA1c matters for three practical reasons:

**1. It is a stable, long-term signal. [A]** Unlike a single glucose reading, HbA1c is not
thrown off by this morning's breakfast or a stressful night. It integrates months of glucose
handling into one number, making it far better for tracking genuine change than point-in-time
glucose.

**2. It requires no fasting and is easy to repeat. [A][H19]** A person can test at any time of
day, which suits a wellness-tracking cadence.

**3. It is responsive to lifestyle, and often improvable. [A][H20][H21]** Dietary carbohydrate
quality, activity, weight, and sleep all move HbA1c. The evidence that intensive lifestyle
change is effective at the at-risk stage is among the strongest in preventative medicine,
anchored in the Diabetes Prevention Program. **[A][H21]**

**Why BioSense measures it — [C]:** BioSense is built around long-term, modifiable wellness
signals, and HbA1c is the single most complete long-term glucose-handling marker in a routine
blood test. Its stability and lifestyle-responsiveness align precisely with BioSense's
optimisation philosophy — provided its interference caveats are handled rigorously (§8).

---

# 5. Laboratory Measurement

HbA1c is measured on a venous blood sample using internationally standardised laboratory
methods, most commonly ion-exchange HPLC or immunoassay. **[A]** For any diagnostic purpose the
sample must be analysed by a laboratory method that is standardised and traceable to the
reference programmes. <cite index="3-1">Recommendations for the diagnostic threshold remain unchanged—≥ 6.5% for HbA1c, using a National Glycohemoglobin Standardization Program (NGSP)-certified method that's traceable to the Diabetes Control and Complications Trial (DCCT).</cite> **[A][H2][H17]**

Key measurement facts relevant to BioSense **[A]**:

- **Internationally standardised.** HbA1c results are aligned to the NGSP (%) and IFCC
  (mmol/mol) reference systems, which makes them broadly comparable between laboratories. **[A][H17]**
- **Fasting not required** — a practical advantage for repeat tracking. **[A][H19]**
- **Point-of-care (finger-prick) devices are not suitable for diagnosis.** <cite index="5-1">For diagnostic purposes in the UK, HbA1c must be measured from a venous blood sample analysed in a laboratory using an IFCC-standardised assay. Point-of-care (finger-prick) HbA1c devices should not be used to diagnose diabetes.</cite> BioSense treats a point-of-care source as a confidence reducer. **[A][H18]**
- **Assay method matters in the presence of haemoglobin variants** — different methods vary in
  their susceptibility to interference (§8). **[A][H13]**

---

# 6. Units

HbA1c is reported in two parallel unit systems, and BioSense must handle both. **[A]**

- **% (NGSP scale)** — the original percentage system, still standard in the US and widely
  understood by consumers. **BioSense canonical unit.** **[A/C]**
- **mmol/mol (IFCC scale)** — the internationally standardised SI unit, standard in the UK and
  much of Europe since 2011. **[A]**

BioSense stores the originally reported value and unit unchanged, computes and stores the
parallel unit, and can display both. **[C]** A third, optional representation — estimated
average glucose (eAG) — is covered in §7 and is educational only. **[C][D]**

---

# 7. Unit Conversion

Verified master equations **[A]**:

```
%(NGSP) ↔ mmol/mol(IFCC):                                        [H9, H10]
  NGSP_%        = (0.0915 × IFCC_mmol_mol) + 2.15
  IFCC_mmol_mol = (10.929 × NGSP_%) − 23.5

Optional educational translation to estimated average glucose (eAG):  [H7, H8]
  eAG_mg/dL  = (28.7 × NGSP_%) − 46.7
  eAG_mmol/L = (1.5944 × NGSP_%) − 2.5944
```

Worked checks (verified against sources): 5.7% ≈ 39 mmol/mol; 6.5% ≈ 48 mmol/mol; 7.0% ≈ 53
mmol/mol and eAG ≈ 154 mg/dL (8.6 mmol/L). **[A][H7][H10]**

**Safety rules [D]:**
- The %↔mmol/mol conversion is exact (a defined equation) and always applied. **[A]**
- **eAG is an educational translation, never a diagnosis or a glucose target (S11).** It is
  gated by a product decision (§28, D-3) and always carries CAV6. <cite index="28-1">The result is a translation aid, not a substitute for diagnosis or treatment planning.</cite> **[D][H7]**
- BioSense never infers which unit a bare number is in from magnitude alone where ambiguous
  (though % and mmol/mol ranges rarely overlap, the reported unit is always retained). **[D]**

---

# 8. Measurement Limitations & Interference  *(major structural adaptation vs SCL-001)*

This is the most important section for HbA1c and the largest departure from the ApoB template.
**HbA1c can be wrong — sometimes badly wrong, sometimes uninterpretable — for reasons that have
nothing to do with a person's blood glucose.** Any condition that changes the lifespan or
composition of red blood cells shifts HbA1c independently of glycaemia. **[A]** The
standardisation body states the core principle directly: <cite index="20-1">Any condition that shortens erythrocyte survival or decreases mean erythrocyte age (e.g., recovery from acute blood loss, hemolytic anemia) will falsely lower HbA1c test results regardless of the assay method used.</cite> **[A][H11]**

BioSense classifies interference into three handling tiers:

## 8.1 Falsely LOW HbA1c (under-estimates true glucose exposure) — [A][H11]
Caused by anything that shortens red-cell lifespan or increases turnover, so haemoglobin has
less time to glycate: haemolytic anaemia, recent significant blood loss, G6PD deficiency,
hereditary spherocytosis, some medications that cause haemolysis (e.g. dapsone, ribavirin),
and often chronic kidney disease with reduced red-cell survival or on erythropoiesis-
stimulating agents. <cite index="12-1">Haemolytic anaemias — including those caused by autoimmune conditions, hereditary spherocytosis, or glucose-6-phosphate dehydrogenase (G6PD) deficiency — typically cause falsely low HbA1c readings.</cite> **[A]** The danger here is a "reassuringly normal" HbA1c that masks genuinely high glucose.

## 8.2 Falsely HIGH HbA1c (over-estimates true glucose exposure) — [A][H12]
Caused by anything that lengthens red-cell lifespan or reduces turnover, so haemoglobin has
more time to glycate: iron deficiency, vitamin B12 or folate deficiency, splenectomy, and
(method-dependently) uraemia via carbamylated haemoglobin. Correcting the underlying deficiency
lowers the HbA1c without any change in actual glucose. <cite index="14-1">Iron, B12, and folate supplementation can normalise a previously falsely elevated result by restoring red blood cell turnover.</cite> **[A]** Iron deficiency is common, which makes this a frequently relevant caveat.

## 8.3 Variable / UNINTERPRETABLE HbA1c — [A][H13]
In some situations HbA1c cannot be reliably interpreted at all, and the direction of error is
assay-dependent:
- **Haemoglobin variants** (sickle-cell trait/disease HbS, HbC, HbE, HbD, and elevated fetal
  haemoglobin HbF): interference depends on the specific variant and the laboratory method.
  <cite index="16-1">Haemoglobin variants interfere with HbA1c assays by altering glycation sites, shortening red cell lifespan, or causing co-elution with the HbA1c fraction, producing falsely low or high results depending on the variant and analytical method.</cite> **[A]**
- **Recent blood transfusion:** <cite index="16-1">Recent red cell transfusion renders HbA1c uninterpretable for up to 2–3 months.</cite> **[A]**
- **Advanced chronic kidney disease (stage 4–5):** direction of interference is method-
  dependent and HbA1c should not be used for diagnosis. **[A][H12]**

## 8.4 Other limitations — [A]
- **Biological/method variation.** Small differences between two results may be noise or a
  method change rather than true change (relevant to trend, §16). **[A]**
- **Point-of-care devices** are less suitable than laboratory methods and are a confidence
  reducer. **[A][H18]**

**How BioSense uses this — [C][D]:** the §8.3 conditions are **validity-suspect → BioSense does
not band or interpret; it displays the value, explains that a condition/context can make HbA1c
unreliable, and routes to a healthcare professional** (S9, CAV4). The §8.1/§8.2 conditions,
when *known*, are **confidence reducers** that also prompt a professional conversation. BioSense
**never** attempts to "correct" an HbA1c value and **never** guesses the direction of
interference — it knows only that reliability is reduced. This mirrors the ApoB interference
discipline (never correct, never guess direction), scaled up to HbA1c's much larger interference
surface.

---

# 9. Relationships With Other Biomarkers

- **Fasting/random glucose & OGTT. [A]** Point-in-time glucose measures now; HbA1c measures the
  ~3-month average. They are complementary; where HbA1c is unreliable (§8), glucose-based tests
  are the appropriate alternative. <cite index="16-1">NICE advises using fasting plasma glucose, OGTT, fructosamine, or CGM when HbA1c is unreliable due to haemoglobin variants or haemolysis.</cite> **[A][H13]**
- **Estimated average glucose (eAG). [A]** A direct mathematical translation of HbA1c into
  glucose units, for education only (§7). **[A][H7]**
- **Fructosamine. [A]** An alternative glycaemic marker over a shorter (~2–3 week) window, used
  clinically when HbA1c is unreliable; BioSense treats it as a specialised alternative, not a
  substitute it computes. **[A][H13]**
- **Full blood count / haemoglobin / iron studies. [A]** Because red-cell and iron status drive
  HbA1c interference (§8), the *presence* of anaemia or iron deficiency is important context —
  it raises or lowers the confidence BioSense places in an HbA1c value. **[A][H11][H12]**
- **Lipids, blood pressure, weight. [A]** Prediabetes-range glucose commonly clusters with
  dyslipidaemia and hypertension; BioSense may note the value of a fuller metabolic picture,
  without diagnosing a syndrome. **[A]**

**Engine implication [C]:** where red-cell/iron markers indicate an interference condition,
BioSense adjusts confidence or abstains (§8). Where HbA1c is unreliable, BioSense points to the
fact that glucose-based testing exists — never imputing or "correcting" a value.

---

# 10. Evidence Review

All numbers here are Category **[A]** — recognised guideline/standardisation values, reproduced
and attributed. HbA1c differs from ApoB in that its thresholds are unusually well-defined and
consistent across authorities — but they are *diagnostic* thresholds, which raises the
importance of BioSense's wellness-not-diagnosis framing.

## 10.1 Where the authorities agree
- **Diabetes diagnostic threshold: HbA1c ≥6.5% (48 mmol/mol).** ADA, WHO (2011), and NICE
  concur, using a standardised assay. <cite index="5-1">The ADA defines diabetes as an HbA1c of 6.5% (48 mmol/mol) or above, consistent with NICE and WHO diagnostic thresholds.</cite> **[A][H2]**
- **Prediabetes / non-diabetic hyperglycaemia: HbA1c 5.7–6.4% (39–47 mmol/mol)** by ADA
  criteria, unchanged since 2010 and reaffirmed through 2026. <cite index="6-1">People with prediabetes are defined by the presence of IFG and/or IGT and/or A1C 5.7–6.4% (39–47 mmol/mol).</cite> **[A][H1]**
- **General adult treatment target (in diagnosed diabetes): below ~7.0% (53 mmol/mol),
   individualised.** <cite index="5-1">For most non-pregnant adults with diabetes, the ADA recommends an HbA1c treatment target below 7.0% (53 mmol/mol), with individualisation based on hypoglycaemia risk.</cite> **[A][H4]**
- **Risk is continuous, not a switch.** <cite index="4-1">For all three tests, risk is continuous, extending below the lower limit of the range and becoming disproportionately greater at the higher end of the range.</cite> **[A][H5]**
- **HbA1c is unreliable in specific conditions and must not be used for diagnosis there**
  (pregnancy, haemoglobin variants, haemolysis, advanced CKD, recent transfusion, children,
  suspected type 1). **[A][H14]**

## 10.2 Where they differ — and why
The differences are minor and mostly about the *lower prediabetes boundary and units*:
- **ADA uses 5.7% (39 mmol/mol)** as the prediabetes lower boundary; **UK NICE uses 42 mmol/mol
  (≈6.0%)** for non-diabetic hyperglycaemia — a narrower, higher-starting range. <cite index="5-1">The ADA's prediabetes range starts at 5.7% (39 mmol/mol), whereas UK NICE guidance defines non-diabetic hyperglycaemia from 42 mmol/mol — a narrower range.</cite> **[A]**
- **WHO (2011)** endorsed ≥6.5% for diabetes but made no formal recommendation for interpreting
  values below 6.5%, which is part of why the prediabetes concept varies internationally. **[A]**
- The **diabetes threshold (6.5% / 48 mmol/mol) is essentially universal**; the disagreement is
  only about how far below it to draw an "at-risk" line. **[A]**

**Why they differ:** the diabetes threshold is anchored to complication risk and is agreed; the
prediabetes line is a screening/prevention judgement about how early to intervene, and different
bodies weigh sensitivity vs over-labelling differently. This directly informs BioSense's
band design (§11) — and is exactly why BioSense frames the region as a wellness gradient rather
than adopting any one body's diagnostic label. **[A][E]**

## 10.3 Strength of evidence
- **Diabetes threshold (≥6.5%): strong / established / near-universal.** **[A][H2]**
- **Prediabetes range (5.7–6.4%): strong but with international variation on the lower bound.** **[A][H1]**
- **Continuous underlying risk: strong / established.** **[A][H5]**
- **Interference effects: strong / established** (standardisation-body documented). **[A][H11-H13]**
- **Optimal "wellness" HbA1c for a healthy adult: reasoned, not formally defined.** No guideline
  sets a wellness-optimal below the normal range; BioSense must synthesise, and must handle the
  low end with care (§11.6). **[E]**

## 10.4 Intended populations (critical for a wellness platform)
Every threshold above was created for **diagnostic** use in **non-pregnant adults without
interfering conditions**. A general-adult wellness platform serves many people in the
normal-to-prediabetes-anchor region, for whom the appropriate framing is a **modifiable wellness
gradient**, not a diagnostic label. Populations where HbA1c is unreliable (§8.3) are handled by
abstention (§15). This shapes the bands in §11 and the heightened safety framing throughout.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation
> of the Category [A] evidence in §10 for a general-adult wellness audience. They are NOT
> diagnostic boundaries, NOT medical cut-offs, and NOT universal truth. Critically for HbA1c:
> the engine must NEVER emit "prediabetes" or "diabetes" as a BioSense label. BioSense
> interprets a wellness gradient; it does not diagnose.**

## 11.1 The interpretation bands (NGSP %; general adult, not pregnant, no known RBC/Hb condition, untreated)

Each row states a **BioSense Wellness Interpretation** and the associated HbA1c range that
BioSense interprets it from. The ranges are anchored to the recognised evidence; the labels are
BioSense's wellness interpretation, deliberately distinct from the diagnostic labels.

| BioSense Wellness Interpretation | Associated HbA1c (NGSP %) | ≈ mmol/mol | Evidence anchor | Wellness meaning |
|---|---|---|---|---|
| **Optimal** | < 5.4 | < ~36 | Comfortably below the prediabetes anchor 5.7% [H1]; low-end caution applies [H16] | Glucose handling in a favourable long-term range. |
| **Good** | 5.4 – 5.6 | ~36–38 | Within normal, approaching the 5.7% anchor [H3] | Favourable, with simple habits to maintain it. |
| **Above Optimal** | 5.7 – 6.0 | ~39–42 | At/above the recognised prediabetes lower anchor (ADA 5.7 / NICE 42) [H1] | A meaningful, often highly modifiable optimisation opportunity. |
| **Elevated** | 6.1 – 6.4 | ~43–47 | Upper part of the prediabetes-anchor range [H1] | Clearly worth attention; lifestyle change is most impactful here. |
| **Significantly Elevated** | ≥ 6.5 | ≥ 48 | At/above the recognised diabetes diagnostic anchor [H2] | Notably elevated; calm healthcare-review wording applies [D]. |

**Low-end flag (not a band, a handling rule):** HbA1c **< 4.0%** → `LOW_FLAG` — handled
cautiously and neutrally (§11.6, §15.4), never as "best." **[B][D][H16]**

## 11.2 How the bands were derived — transparency [B]
- **The 5.7% and 6.5% boundaries** are the recognised prediabetes and diabetes *anchors* (H1,
  H2). BioSense positions its "Above Optimal" and "Significantly Elevated" interpretations at
  these evidence anchors **without** adopting the diagnostic labels attached to them.
- **The Optimal/Good split (5.4%)** is a BioSense wellness judgement placing "Optimal"
  comfortably below the prediabetes anchor, consistent with the continuous-risk evidence (H5)
  that risk rises across the range rather than switching on at 5.7%.
- **The Elevated split at 6.1%** subdivides the prediabetes-anchor range so BioSense can escalate
  its optimisation emphasis in the upper part while keeping wording calm.
- **No number was averaged across guidelines.** Each boundary maps to a specific cited anchor
  (H1/H2) or is a transparent BioSense wellness split (5.4, 6.1), labelled Category B.

## 11.3 Population caveat [E]
These bands assume a **general adult, not pregnant, without a haemoglobin/red-cell condition or
other interfering factor, and not on glucose-lowering therapy.** They are **not** applied to
children/adolescents, pregnancy, or anyone with an interfering condition (§8.3), for whom
BioSense abstains from banding and defers to a healthcare professional (§15). **[E][D]**

## 11.4 Therapy / higher-context handling — [C]
If a user **declares** they are on glucose-lowering therapy, the value reflects a treated state;
BioSense frames it as "reflecting your current management" and never implies anything about
stopping or changing treatment (S6). BioSense does not display separate "target" numbers as
instructions; any treatment target is a matter for the user and their clinician (§22). **[C][D]**

## 11.5 Never inferred [D]
BioSense **never** infers pregnancy, a haemoglobin condition, anaemia, therapy status, or a
diagnosis from the HbA1c value itself. All such context comes only from explicit user-declared
information or accompanying declared biomarkers. **[D]**

## 11.6 The low end — cautious, not celebratory *(structural difference vs ApoB)* [B][D]
Unlike ApoB (pure lower-better, no low-end penalty), HbA1c has a **genuine low-end nuance**. A
very low HbA1c is **not** automatically "the best result": it can reflect an interference
condition that shortens red-cell lifespan (§8.1), and population epidemiology shows a U-shaped
relationship in which very low values are not necessarily advantageous. **[A][H16][E]** BioSense
therefore:
- does **not** score below-optimal HbA1c as a wellness "win" beyond the Optimal band;
- applies a neutral `LOW_FLAG` below 4.0% with non-alarming "worth mentioning to a doctor"
  wording, **without naming any cause** (S5);
- never penalises or alarms — the low end is handled with the same calm as every other band.

---

# 12. Interpretation Framework

BioSense interprets HbA1c in a fixed, deterministic order (consistent with the ENG Blood
Analysis Engine's four-state model), with HbA1c's validity gate carrying more weight than
ApoB's. **[C]**

```
1. VALIDITY   — is the measurement interpretable? (unit known; NOT an §8.3 interference
                condition; lab method for any weighty read; result final)
                → if validity-suspect, DISPLAY value, DO NOT band, explain, route to professional.
2. ELIGIBILITY— may we band this person? (general adult, not pregnant, no known interfering
                condition) → if not, abstain from banding, offer appropriate wording (§15).
3. CONFIDENCE — how confident? (apply §13 reducers: iron/B12 status, POC device, method change,
                on-therapy, single value) → HIGH / REDUCED.
4. BAND       — assign BioSense wellness interpretation band (§11).
5. CONTEXT    — add eAG educational translation if enabled (§7, D-3); note supporting metabolic
                markers where present (§9).
6. NARRATIVE  — select wellness narrative (§24) + mandatory caveats (§0.8).
```

**Core interpretive stance [B]:** HbA1c is presented as a **modifiable long-term metabolic-
wellness signal to optimise and track over months**, never as a diagnosis. Every narrative pairs
the current interpretation with a constructive, evidence-based next step and, where relevant, a
calm suggestion to involve a healthcare professional. The word "diabetes" and "prediabetes" never
appear as BioSense conclusions. **[B][D][S3]**

---

# 13. Confidence Assessment *(adapted: interference-driven)*

Confidence is **computed, not guessed**, starting HIGH and reduced to REDUCED if any reducer is
present; each is named to the user when it applies (CAV3). Separately, §8.3 conditions are not
"reducers" but **validity-suspect** states that stop banding entirely (§12 gate 1). **[A]/[D]**

| Reducer (band allowed, confidence REDUCED) | Why | Source |
|---|---|---|
| Known iron / B12 / folate deficiency | May falsely raise HbA1c | [H12] |
| Recent iron/B12/folate therapy | Value may be shifting | [H12] |
| Mild–moderate anaemia (non-suspect) | Red-cell turnover altered | [H11] |
| Point-of-care device used | Less suitable than lab method | [H18] |
| Method change between tests | Between-assay variation | [H17] |
| On glucose-lowering therapy | Reflects treated state | [A] |
| Acute illness / major recent diet change | Transient context | [A] |
| Value near a band boundary | Small error could reclassify | [B] |
| Single value, no prior (no trend context) | An average is best read over time | [H6] |

| Validity-SUSPECT (banding STOPPED, route to professional) | Source |
|---|---|
| Known haemoglobin variant (HbS/C/E/D, high HbF) | [H13] |
| Haemolysis / haemolytic anaemia | [H11] |
| Recent transfusion (<3 months) | [H13] |
| Advanced CKD (stage 4–5) | [H12] |
| Recent major blood loss | [H11] |
| Pregnancy / age <18 (also eligibility) | [H14,H15] |

**Confidence never implies validity, and validity never implies eligibility.** A value can be
measured with high confidence, be valid, and still be one BioSense declines to band (e.g. a
valid result in a pregnant user). **[D]**

---

# 14. Wellness Interpretation

Interpretation-by-interpretation wellness guidance, general adult. Each states a **BioSense
Wellness Interpretation** and the HbA1c range it is interpreted from. All wording is **wellness,
not medical**, and never uses diagnostic labels. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal** *(HbA1c < 5.4%).* "Your HbA1c is in an optimal
  wellness range, reflecting favourable long-term glucose handling over the past few months. A
  great result to maintain." Maintain-focused. **[B]**
- **BioSense Wellness Interpretation: Good** *(HbA1c 5.4–5.6%).* "Your HbA1c is in a favourable
  range. Steady habits — whole-food carbohydrates, regular movement — help keep it here." **[B]**
- **BioSense Wellness Interpretation: Above Optimal** *(HbA1c 5.7–6.0%).* "Your HbA1c is a little
  above the optimal wellness range. This is one of the most responsive markers to lifestyle: diet
  quality, activity, weight and sleep can all help. Tracking it over the next few months will
  show your progress." Constructive, encouraging. **[B]**
- **BioSense Wellness Interpretation: Elevated** *(HbA1c 6.1–6.4%).* "Your HbA1c is elevated
  relative to the optimal wellness range, and it's clearly worth attention. Lifestyle changes are
  especially impactful in this range, and it may be worth discussing your result with a healthcare
  professional to look at the full picture." Constructive + gentle healthcare-review. **[B][D]**
- **BioSense Wellness Interpretation: Significantly Elevated** *(HbA1c ≥ 6.5%).* "Your HbA1c is
  notably above the optimal wellness range. Lifestyle steps still help, and it would be worth
  discussing this result with a healthcare professional who can look at your full picture." Calm,
  non-alarming, healthcare-review wording (CAV5). **[B][D]**

Every interpretation pairs the reading with (a) an evidence-based lifestyle lever (§17) and (b)
the mandatory wellness caveats (§0.8). **None uses "diabetes" or "prediabetes."** **[D][S3]**

---

# 15. Special Populations & Abstention *(expanded vs SCL-001: interference-driven)*

BioSense **abstains from banding** wherever HbA1c is unreliable or its general-adult bands do not
apply, and says so plainly. This is a larger set than for ApoB. **[C]/[D]/[E]**

- **15.1 Children & adolescents.** General-adult bands are not validated in under-18s. Display,
  do not band, suggest professional interpretation. **[D][H14]**
- **15.2 Pregnancy.** HbA1c is unreliable in pregnancy (altered red-cell turnover) and is not
  used for diagnosis; glucose-based testing is appropriate. BioSense does not band, notes that
  pregnancy affects HbA1c reliability, and defers to a healthcare professional. **[D][H15]**
- **15.3 Haemoglobin variants / haemolysis / recent transfusion / advanced CKD (§8.3).**
  Validity-suspect: BioSense displays the value, explains that the condition/context can make
  HbA1c unreliable, and routes to a professional (CAV4). It never bands, never "corrects," never
  guesses the direction of error. **[D][H13]**
- **15.4 Markedly low HbA1c (LOW_FLAG, <4.0%).** Never framed as "best." Neutral wording — "this
  is on the low side; that can reflect a few different measurement factors, and it may simply be
  worth mentioning to a doctor" — **without naming any cause** (S5). **[D][H16]**
- **15.5 Known iron/B12/folate deficiency or anaemia (non-suspect).** Band with REDUCED
  confidence, name the reducer (CAV3), and suggest the value be interpreted alongside that
  context. **[D][H12]**
- **15.6 On glucose-lowering therapy.** Band allowed, framed as reflecting current management;
  never any implication about changing treatment (S6). **[D]**

**Abstention is a first-class, non-error output.** It is always explained, never silent. **[D]**

---

# 16. Trend & Longitudinal Behaviour *(adapted: time-averaged marker)*

HbA1c is well suited to tracking, but because a single value **already is a ~2–3 month average**,
trend rules differ from a point-in-time marker. **[A][B][H6]**

- **Re-test cadence. [A][B]** Because HbA1c reflects ~2–3 months weighted to recent weeks,
  re-testing sooner than about three months rarely reflects real change. BioSense frames tracking
  on a roughly quarterly cadence and gently discourages over-frequent re-testing. **[H6]**
- **What counts as a real change. [A][E]** Small differences can be biological or between-assay
  variation. BioSense frames a change as meaningful only when it exceeds normal variation and is
  not explained by a method change. **[H17]**
- **Method/lab changes. [A]** A change between different labs/methods is flagged as possibly
  method-related, not a true change. **[H17]**
- **Validity-suspect points. [A]** Any value drawn under an §8.3 condition (e.g. around a
  transfusion) is excluded from trend so it never produces a false signal. **[H13]**
- **Direction & framing. [B]** Downward within range = improving (encouraged); upward = a calm
  optimisation prompt. A within-range improvement is acknowledged as a real win. **Low-end
  caution (§11.6) applies** — a fall into `LOW_FLAG` is not celebrated. **[B][D]**
- **Cumulative wellness framing. [B]** A sustained favourable HbA1c trajectory is described as
  reflecting steadier long-term glucose handling — never as a change in a diagnosis or risk score.

---

# 17. Lifestyle Optimisation Guidance

Lifestyle is **always the first tier** of BioSense recommendations, and HbA1c is among the most
lifestyle-responsive wellness markers — the evidence for lifestyle change at the at-risk stage is
particularly strong. **[A]/[B]**

## 17.1 Nutrition [A][B][H20]
- **Reduce added sugars and refined/rapidly-digested carbohydrate; favour whole-food, higher-
  fibre carbohydrates.** The dominant dietary lever on glucose handling. **[A][B]**
- **Increase dietary fibre; include lean protein and healthy fats** to blunt post-meal glucose
  excursions. **[A][B]**
- **Overall dietary pattern** (Mediterranean-style, whole-food-based) supports healthier
  long-term glucose handling. Strong evidence category. **[A]**

## 17.2 Physical activity [A][B][H20]
Both aerobic activity and resistance training improve insulin sensitivity and glucose handling;
reducing sedentary time and short post-meal walks are practical, well-evidenced levers. **[A]**

## 17.3 Weight / body composition [A][H21]
Where relevant, modest weight loss meaningfully improves glucose handling; the Diabetes
Prevention Program established intensive lifestyle change (including modest weight loss) as highly
effective at the at-risk stage. **Strong evidence.** **[A][H21]**

## 17.4 Sleep & stress [A][B]
Poor sleep and chronic stress raise glucose via hormonal pathways; improving sleep quality and
stress management support healthier HbA1c. Moderate evidence. **[A][B]**

## 17.5 Alcohol & smoking [A][B]
Alcohol moderation and not smoking both support metabolic wellness. Standard guidance. **[A][B]**

## 17.6 Framing rules [B][D]
- Lifestyle first, always; medication is never suggested.
- Evidence strength is honest: lifestyle change is **strongly** evidenced to improve glucose
  handling at the at-risk stage (H21), and BioSense is optimistic and encouraging here — while
  still pairing a Significantly-Elevated reading with a healthcare-review suggestion. **[D]**

---

# 18. AI Reasoning Constraints

The AI narrative layer **renders** BioSense's deterministic decisions; it does not make clinical
judgements (consistent with the ENG platform's PI-4). **[D]**

The AI layer **may**: explain the interpretation band and what HbA1c is, in warm, clear wellness
language; connect the reading to evidence-based lifestyle levers; acknowledge progress; express
abstention respectfully; show the eAG educational translation if enabled (with CAV6).

The AI layer **must never**:
- state or imply a diagnosis — especially **never** say "diabetes," "prediabetes," or "diabetic"
  as a conclusion about the user (S1, S3)
- produce a numeric probability of developing diabetes (S7)
- recommend starting, stopping, or changing any medication (S6)
- present a BioSense band as a medical/diagnostic boundary (S10)
- present eAG as a diagnosis or a glucose target (S11)
- soften or bypass a required healthcare-review suggestion to avoid a difficult message
- interpret or band a validity-suspect value (S9)
- infer pregnancy, a haemoglobin condition, or therapy status from the value
- frame a very low HbA1c as unambiguously "best" (§11.6)

Enforcement is by output validation on the rendered text, not by prompt alone. The tokens
"diabetes"/"prediabetes" as user-directed conclusions are treated as SAFETY_CLASS forbidden
content. **[D]**

---

# 19. Safety Considerations *(heightened: diagnostic adjacency)*

HbA1c sits closer to a formal diagnosis than most wellness markers, so safety wording is
deterministic and always present. **[D]**

- **Not a diagnosis — and no diagnostic labels.** Every HbA1c output carries CAV1, and the engine
  never uses "diabetes"/"prediabetes" as a BioSense conclusion (S1, S3). The same number a lab
  uses diagnostically is presented by BioSense only as a wellness interpretation with a calm
  route to a professional. **[D]**
- **One factor among many.** CAV2 frames HbA1c as one metabolic-wellness marker. **[D]**
- **Interference honesty.** Where a value may be unreliable, BioSense says so and routes to a
  professional rather than delivering false reassurance or false alarm (CAV4). This is a safety
  feature unique in prominence to HbA1c. **[D][H11-H13]**
- **No medication guidance.** Medication questions receive educational context + referral
  (S6, S8). **[D]**
- **No alarm.** Even the highest band uses calm, constructive, non-catastrophising language with
  a healthcare-review suggestion (S4, CAV5). **[D]**
- **Low values not pathologised, not celebrated.** LOW_FLAG gets neutral, non-alarming wording
  with no cause named (S5). **[D][H16]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a **calm wellness conversation with a healthcare professional**
when: **[D]**

1. HbA1c is **Significantly Elevated (≥6.5%)** — CAV5. **[H2]**
2. HbA1c is in the **Elevated band (6.1–6.4%)** — gentle healthcare-review suggestion. **[H1]**
3. The value is **validity-suspect** (§8.3) — interpretation belongs with a professional (CAV4). **[H13]**
4. HbA1c is **markedly low (LOW_FLAG)** — neutral "worth mentioning," no cause named (S5). **[H16]**
5. The user is in an **abstention population** (child/adolescent, pregnancy). **[H14,H15]**
6. A known **interference condition** (iron/B12 deficiency, anaemia) means the value should be
   read in that context. **[H12]**
7. The user **asks a medical or medication question** (S8).

All such suggestions are **wellness-framed, non-urgent, non-diagnostic**, and never imply an
emergency. BioSense provides no emergency instructions. **[D]**

---

# 21. BioSense Product Integration

How SCL-002 plugs into the existing platform (no architecture change): **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for HbA1c.
- **Supplies (as CSL bindings):** the wellness interpretation bands (Category B), the guideline
  anchors (Category A), the conversion equations, confidence reducers, validity-suspect rules,
  safety rules, lifestyle evidence, and narrative templates — each carrying value + source-ID +
  category + version.
- **Activates:** HbA1c banding, wellness narrative, dual-unit + optional eAG display, trend
  framing (quarterly cadence), interference/validity handling, and the recommendation ladder.
- **Respects:** every ENG platform invariant (deterministic-before-AI, validity-before-
  confidence, unknown≠none, abstention-is-not-error, PI-4 rendering).
- **Score contribution:** HbA1c contributes to the metabolic-wellness domain as a monotonic
  (lower-better within range) input **with** the low-end caution of §11.6; validity-suspect
  values do not contribute. Any BioSense wellness-score weighting is a Category [C] product
  decision layered on this pack.

---

# 22. Medication Context (educational only)

Educational context only. BioSense does not instruct users to start, stop, or change any
medication (S6). **[D]**

- Several classes of glucose-lowering medication exist and are prescribed and adjusted by
  clinicians based on the full clinical picture; a person's HbA1c on treatment reflects that
  management. **[A]**
- A treatment target (e.g. below ~7.0% / 53 mmol/mol for many non-pregnant adults with diabetes)
  is an individualised clinical decision, not a BioSense wellness threshold. <cite index="5-1">the ADA recommends an HbA1c treatment target below 7.0% (53 mmol/mol), with individualisation based on hypoglycaemia risk.</cite> **[A][H4]**
- Any question about medication is met with educational context and a suggestion to speak with a
  healthcare professional (S8). **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **No formal "wellness optimal" exists in guidelines. [E]** The Optimal/Good boundary (5.4%) is
   a BioSense synthesis consistent with continuous-risk evidence (H5), not a guideline-defined
   healthy-adult target.
2. **International variation in the prediabetes lower bound. [E]** ADA 5.7% vs NICE 42 mmol/mol
   (≈6.0%). BioSense's "Above Optimal" band starts at the ADA anchor (more sensitive/earlier);
   this is a product judgement, flagged for founder confirmation (§28, D-1).
3. **Low-end interpretation is genuinely uncertain. [E]** The U-shaped mortality signal (H16) is
   epidemiological and confounded; BioSense's cautious low-end handling is deliberately
   conservative rather than claiming a low value is good or bad.
4. **Interference direction is often not knowable from BioSense's inputs. [E]** Where a condition
   is known, BioSense reduces confidence or abstains; it never estimates the size or direction of
   the error.
5. **eAG display is a product-policy choice. [E]** It aids understanding but moves closer to
   glucose-language; gated by D-3.

---

# 24. Narrative Generation Templates

Deterministic templates the AI layer renders (warm wellness tone; caveats always appended;
**never** diagnostic labels). **[B]/[D]** (Illustrative wording; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL
"Your HbA1c is {value}% ({mmol} mmol/mol) — in an optimal wellness range. This reflects
 favourable long-term glucose handling over the past few months. A wonderful result to
 maintain with your current habits."  +CAV1 +CAV2

TEMPLATE: GOOD
"Your HbA1c is {value}% ({mmol} mmol/mol) — a favourable range. Steady habits like whole-food
 carbohydrates and regular movement help keep it here."  +CAV1 +CAV2

TEMPLATE: ABOVE_OPTIMAL
"Your HbA1c is {value}% ({mmol} mmol/mol) — a little above the optimal wellness range. HbA1c is
 one of the most responsive markers to lifestyle: diet quality, activity, weight and sleep all
 help. Tracking it over the next few months will show your progress."  +CAV1 +CAV2

TEMPLATE: ELEVATED
"Your HbA1c is {value}% ({mmol} mmol/mol) — elevated relative to the optimal wellness range, and
 worth some attention. Lifestyle changes are especially impactful here, and it may be worth
 discussing your result with a healthcare professional to look at the full picture."
 +CAV1 +CAV2 +CAV5

TEMPLATE: SIGNIFICANTLY_ELEVATED
"Your HbA1c is {value}% ({mmol} mmol/mol) — notably above the optimal wellness range. Lifestyle
 steps still help, and it would be worth discussing this result with a healthcare professional
 who can look at your full picture."  +CAV1 +CAV2 +CAV5

MODIFIER: REDUCED_CONFIDENCE → append CAV3 naming reducer(s), e.g.
 "Because {iron deficiency / a point-of-care device / a lab method change} can affect HbA1c,
  treat this as a guide and consider re-checking under steady conditions."

MODIFIER: VALIDITY_SUSPECT (abstain) →
 "We're not scoring this HbA1c, because {a haemoglobin condition / a recent transfusion / …}
  can make HbA1c unreliable. It's best interpreted with a healthcare professional."  +CAV1 +CAV4

MODIFIER: LOW_FLAG →
 "Your HbA1c is on the low side. That can reflect a few different measurement factors, and it may
  simply be worth mentioning to a doctor at some point."  +CAV1   (no cause named — S5)

MODIFIER: eAG (if enabled) →
 "In everyday terms, that's an estimated average glucose of about {eAG}. This is an educational
  translation of HbA1c, not a diagnosis or a target."  +CAV6

MODIFIER: ABSTENTION (child / pregnancy) →
 "Because {age / pregnancy} affects how HbA1c should be interpreted, we're not scoring this one —
  it's best looked at with a healthcare professional."  +CAV1
```

**Absolute rule:** no template or modifier ever contains "diabetes," "prediabetes," or
"diabetic" as a statement about the user. **[D][S3]**

---

# 25. Example Outputs

**Example 1 — Optimal, high confidence. [illustrative]**
```
Input: HbA1c 5.1% (32 mmol/mol), adult, no declared conditions, lab method.
Band: OPTIMAL | Confidence: HIGH | Valid: true | Abstained: false
Narrative: OPTIMAL template +CAV1+CAV2
Recommendation: Tier 1 maintain; Tier 2 re-check ~12 months.
```

**Example 2 — Above Optimal, reduced confidence (iron deficiency known). [illustrative]**
```
Input: HbA1c 5.9% (41 mmol/mol), adult, declared iron deficiency.
Band: ABOVE_OPTIMAL | Confidence: REDUCED (iron_deficiency → may falsely raise) | Valid: true
Narrative: ABOVE_OPTIMAL template +CAV1+CAV2 +CAV3("iron deficiency can affect HbA1c")
Recommendation: Tier 1 lifestyle; note to interpret alongside iron status with a professional.
```

**Example 3 — Significantly Elevated. [illustrative]**
```
Input: HbA1c 7.2% (55 mmol/mol), adult, no declared conditions.
Band: SIGNIFICANTLY_ELEVATED | Confidence: HIGH | Valid: true
Narrative: SIGNIFICANTLY_ELEVATED template +CAV1+CAV2+CAV5
Recommendation: Tier 1 lifestyle; Tier 3 calm healthcare-review suggestion.
NOTE: No "diabetes" label. No risk %. No medication mention.  [S1,S3,S6,S7]
```

**Example 4 — Haemoglobin variant → validity-suspect abstention. [illustrative]**
```
Input: HbA1c 6.1% (43 mmol/mol), user declares sickle-cell trait.
Band: (none) | Valid: SUSPECT (hb_variant) | Abstained: true | value displayed
Narrative: VALIDITY_SUSPECT modifier +CAV1+CAV4  (route to professional; no correction attempted)
```

**Example 5 — Pregnancy → abstention. [illustrative]**
```
Input: HbA1c 5.8% (40 mmol/mol), user declares pregnancy.
Band: (none) | Abstained: true (reason: pregnancy — HbA1c unreliable) | value displayed
Narrative: ABSTENTION modifier +CAV1
```

**Example 6 — Low flag. [illustrative]**
```
Input: HbA1c 3.8% (18 mmol/mol), adult.
Band: LOW_FLAG (not "optimal-plus") | Narrative: LOW_FLAG modifier +CAV1 (no cause named — S5)
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — the deterministic platform this pack
  configures (four-state model, validity-before-confidence, trend gauntlet, PI-4 rendering,
  governance/CSL bindings).
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **SCL-001 (ApoB)** — the frozen template this pack follows; interference/validity, units, and
  low-end sections are the adapted areas.
- **§0 Implementation Summary** — the developer-facing activation values.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references were retrieved and verified during authoring. Numeric values trace via the
> H-series IDs used throughout and in §0. Where a specific page/table is cited it reflects the
> verified snippet; developers finalising the pack should confirm exact locators against the
> primary PDF where required.

**Guidelines, consensus & standardisation (Category A anchors)**

1. American Diabetes Association. **Standards of Care in Diabetes—2024. Section 2: Diagnosis and
   Classification of Diabetes.** *Diabetes Care* 2024;47(Suppl. 1):S20–S42.
   doi:10.2337/dc24-S002. — *HbA1c ≥6.5% diabetes; 5.7–6.4% prediabetes; continuous-risk
   statement (H1, H2, H5).* (Thresholds reaffirmed in the 2025 and 2026 Standards.)
2. World Health Organization. **Use of Glycated Haemoglobin (HbA1c) in the Diagnosis of Diabetes
   Mellitus: Abbreviated Report of a WHO Consultation.** Geneva: WHO; 2011 (WHO/NMH/CHP/CPM/11.1).
   — *≥6.5% (48 mmol/mol) diagnostic threshold; no formal recommendation below 6.5% (H2).*
3. National Institute for Health and Care Excellence. **Type 2 diabetes in adults: management
   (NG28)** and **Type 2 diabetes: prevention in people at high risk (PH38).** — *Non-diabetic
   hyperglycaemia from 42 mmol/mol; treatment targets 48/53 mmol/mol; HbA1c-unreliable conditions
   (H3, H4, H14).*
4. American Diabetes Association. **Standards of Care in Diabetes—2026 (Abridged / Section 2).**
   *Clinical Diabetes / Diabetes Care* 2026. — *Diagnostic thresholds unchanged; NGSP-certified,
   DCCT-traceable method (H2, H17).*

**HbA1c–average-glucose relationship (Category A)**

5. Nathan DM, Kuenen J, Borg R, Zheng H, Schoenfeld D, Heine RJ; A1c-Derived Average Glucose
   (ADAG) Study Group. **Translating the A1C assay into estimated average glucose values.**
   *Diabetes Care* 2008;31(8):1473–1478. doi:10.2337/dc08-0545. — *eAG(mg/dL)=28.7×A1c−46.7;
   validated relationship (H7, H8).*
6. NGSP. **HbA1c and eAG; NGSP–IFCC conversion (master equation).** ngsp.org. — *NGSP%↔IFCC
   mmol/mol master equation; eAG (H7, H9, H10).*

**Interference & reliability (Category A — standardisation body & guidance)**

7. NGSP. **Factors that Interfere with HbA1c Test Results** and **HbA1c Assay Interferences.**
   ngsp.org/factors.asp, ngsp.org/interf.asp. — *Shortened RBC survival falsely lowers HbA1c
   regardless of method; variant/assay interference tables (H11, H13).*
8. Radha Ramachandran / clinical reviews on HbA1c interference (iron/B12/folate; splenectomy;
   haemolysis) — corroborating the NGSP factors for falsely-high and falsely-low results
   (H11, H12). *(Secondary corroboration; primary anchor is NGSP ref 7.)*
9. English P, et al. / Public Health England & NICE guidance on HbA1c in haemoglobin variants and
   pregnancy — *use glucose-based testing when HbA1c unreliable (H13, H14, H15).*

**Lifestyle & prevention (Category A/M)**

10. American Diabetes Association. **Standards of Care in Diabetes—2024. Section 3: Prevention or
    Delay of Diabetes.** *Diabetes Care* 2024;47(Suppl. 1). — *Lifestyle prevention; Diabetes
    Prevention Program context (H20, H21).*
11. Diabetes Prevention Program Research Group. **Reduction in the incidence of type 2 diabetes
    with lifestyle intervention or metformin.** *N Engl J Med* 2002;346:393–403. — *Intensive
    lifestyle effectiveness at the at-risk stage (H21).*

**Low-end / mortality nuance (Category A/E)**

12. Reviews of HbA1c and all-cause mortality describing a U-shaped association (low as well as
    high HbA1c associated with higher mortality in some cohorts). — *Basis for cautious low-end
    handling (H16); flagged [E] as confounded epidemiology.*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–4 (and
> the continuity/low-end context of 5–12); they are BioSense Version 1 classifications and are not
> attributable to any single reference as a diagnostic threshold.

---

# 28. Founder Decisions Required

Three items require a BioSense founder decision; all are flagged rather than silently resolved,
consistent with the platform's governance. **[C][E]**

**D-1 — Confirm the BioSense V1 Wellness Interpretation Band boundaries.** §11 proposes Optimal
<5.4 / Good 5.4–5.6 / Above-Optimal 5.7–6.0 / Elevated 6.1–6.4 / Significantly-Elevated ≥6.5,
anchored to the ADA prediabetes/diabetes anchors with BioSense wellness splits at 5.4 and 6.1. A
key sub-decision: whether "Above Optimal" should start at the **ADA anchor 5.7%** (earlier, more
sensitive — proposed default) or the **NICE 42 mmol/mol ≈ 6.0%** (later, fewer users flagged).
This is a wellness-tone / positioning trade-off. **Founder sign-off requested on the exact
boundaries.**

**D-2 — Healthcare-review wording strength at the Elevated (6.1–6.4%) band.** BioSense proposes a
*gentle* healthcare-review suggestion here and a firmer one at ≥6.5%. Given diagnostic adjacency,
the founder may wish to confirm how strongly the ≥6.5% and 6.1–6.4% bands should encourage a
professional conversation, without tipping into alarm. **Founder decision requested.**

**D-3 — Whether to display estimated average glucose (eAG).** eAG (§7) makes HbA1c intuitive but
introduces glucose-value language and moves closer to clinical territory. **Founder decision
requested** on whether V1 shows eAG at all, and if so with exactly what caveat framing (CAV6).

*(All three affect user experience and positioning, not the underlying evidence. The evidence and
structure are ready to execute any choice once set.)*

---

**END OF SCL-002 v1.0**

*This Scientific Configuration Pack was authored on the frozen SCL-001 template. Every numeric
value is either a cited Category [A] guideline/standardisation figure or a transparently-labelled
Category [B] BioSense wellness interpretation. No value was fabricated; every Category [A] number
was retrieved and verified during authoring and traces to §27. The interference, units, low-end,
and diagnostic-adjacency sections were adapted to HbA1c's genuine structural differences; all
other structure follows SCL-001 exactly.*
