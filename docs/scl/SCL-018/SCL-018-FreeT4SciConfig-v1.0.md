# SCL-018 — FREE THYROXINE (Free T4 / FT4)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. Free T4 is the measured companion hormone to TSH (SCL-017); the two are interpreted together via the TSH × Free T4 matrix using the existing Cross-Biomarker Intelligence, Confidence Hierarchy, Confidence Inheritance, and Guideline-Disagreement frameworks. Never used in isolation where TSH is available. Never a diagnosis of thyroid disease. No new methodology introduced.*

**Document ID:** SCL-018
**Biomarker:** Free Thyroxine (Free T4, FT4) — measured unbound thyroid hormone; companion to TSH; two-sided
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 1 August 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Free T4 reuses the frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), cross-biomarker intelligence (SCL-010), the four-level confidence hierarchy (SCL-010), **confidence inheritance** (SCL-016/017), multiple-explanations output (SCL-010), two-sided banding (SCL-004/009/010/011/012/016/017), sex/age/pregnancy-aware banding (SCL-004/010/016/017), guideline-disagreement handling (SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/016/017) — introducing only Free T4-specific scientific content. All sections remain consistent with SCL-001 through SCL-017.

---

> **What this document is.** SCL-018 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for Free T4. It reuses existing BioSense
> methodology and does not redesign the Constitution, the ENG documents, the Blood Analysis Engine, or the
> SCL architecture. **No new methodology is introduced.**
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

## STRUCTURAL-FIT NOTE (Free T4 vs SCL-001) — reuses frozen frameworks; no new pattern

Free T4 presents the same structural characteristics BioSense has already solved for, and maps onto the frozen
methodology without extension. Free T4 is the **measured companion hormone to TSH (SCL-017)** — the actual
thyroid-hormone level that TSH is signalling about — so its meaning is realised through the **TSH × Free T4
matrix**, and it reuses the Cross-Biomarker Intelligence and Context-First frameworks:

1. **TSH-paired interpretation — reused cross-biomarker intelligence (SCL-010) + multiple-explanations
   (SCL-010).** Free T4 confirms and classifies what TSH screens; the meaningful wellness read comes from the
   **TSH × FT4 combination** — primary vs central, subclinical vs overt, and the rare/interference patterns —
   which is exactly a consume-TSH-and-rank-the-interpretation pattern (§0.5, §9). This is the mirror of
   SCL-017's grid, constructed from the FT4 side. **Free T4 is never used in isolation where TSH is available.**
2. **Confidence inheritance — reused (SCL-016/017).** The TSH×FT4 combination verdict **inherits the lower
   confidence** of its inputs; if TSH is unavailable, the FT4-alone read is confidence-limited, not asserted
   (§0.6, §13).
3. **Context-First — reused (SCL-010).** Free T4 is interpreted only after context — TSH (primary companion),
   pregnancy/trimester, age, acute (non-thyroidal) illness, thyroid-affecting medications, thyroid-binding
   abnormalities where supported, biotin/heterophile interference, and future FT3/antibodies — evaluated
   **before** banding (§0.2, §8, §12).
4. **Two-sided banding with flags — reused.** Free T4 is meaningfully two-sided: **low** (an underactive-
   direction pattern) and **high** (an overactive-direction pattern), with a low-normal watch (the lowest-
   quartile signal) (§11).
5. **Sex/age/pregnancy-aware banding — reused (SCL-004/010/016/017).** Free T4 shifts in pregnancy (trimester-
   specific; higher in the first trimester) and is assay/lab-specific, so banding carries pregnancy and
   assay overlays (§11).
6. **Guideline-disagreement handling — reused (SCL-003/011/012).** The standard range vs the debated "optimal"
   (mid vs upper-half) target, the **assay-specific/non-standardised** ranges, and pregnancy trimester ranges
   are presented as distinct frameworks, **never averaged** (§10, §11).
7. **Multiple-explanations output — reused (SCL-010).** An abnormal Free T4 gets **ranked possibilities**
   (non-thyroidal illness, medication, binding abnormality, biotin/heterophile interference, a genuine thyroid
   shift) — never a single certain cause (§11, §14).
8. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012/016/017).** BioSense never emits
   "hypothyroidism," "hyperthyroidism," "Graves' disease," "thyroiditis," or "pituitary disease" as a
   diagnosis; it detects the pattern, routes, and names nothing (§18, §19).

**Biomarker-specific content introduced:** the Free T4 thresholds and their two-sided structure; the SI factor
(×12.87) and the free-vs-total distinction; the TSH×FT4 matrix from the FT4 side; the pregnancy and assay
overlays; the optimal-target and assay-standardisation disagreements; the non-thyroidal-illness, medication,
binding-abnormality, and biotin/heterophile confounds; and the trend/repeat behaviour. **No new methodology is
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

Free T4 is best understood as **the measured, biologically active thyroid hormone** — the small unbound fraction
of thyroxine that actually reaches tissues — and as **the companion to TSH**. Where TSH is the pituitary's
*signal* about thyroid status, Free T4 is the *hormone itself*: it confirms and classifies what TSH screens.
The two only make full sense **together**. The same Free T4 means different things depending on TSH: a low Free
T4 with a high TSH reads as a primary (thyroid-gland) underactive pattern, a low Free T4 with a low-or-normal
TSH as a central (pituitary/hypothalamic) pattern that TSH alone would miss, a high Free T4 with a suppressed
TSH as an overactive (thyrotoxic) pattern, and a high Free T4 with a normal-or-high TSH as an unusual pattern
that points to assay interference or a rare cause rather than a simple verdict.

So BioSense reads Free T4 **with TSH** (the TSH × FT4 matrix), **never in isolation where TSH is available**,
begins with biological context — pregnancy, age, acute illness, medications, binding proteins, and biotin all
move Free T4 or its measurement — ranks the plausible explanations for an abnormal value rather than asserting
one, shows where guidelines and assays genuinely differ rather than splitting them, and names no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as the
evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate Free T4. Every value carries a source ID (F-series / R-series → §27) and a
> category tag. Canonical unit: ng/dL (SI pmol/L = ng/dL × 12.87). **Measured hormone; two-sided; TSH-paired
> (TSH×FT4 matrix); context-first; sex/age/pregnancy-aware; combination verdict inherits lower input
> confidence; NEVER used in isolation where TSH is available; NEVER a thyroid diagnosis.**

## 0.1 Canonical units — [A]
```
canonical_unit: ng/dL   (SI: pmol/L = ng/dL × 12.87; reverse ng/dL = pmol/L ÷ 12.87)   [F3]   # FT4-specific factor
UNIT SAFETY: do NOT use the Free T3 factor for Free T4 (different molecular weights); do NOT mix Free T4 with Total T4 ranges/units; do NOT apply 38.67/88.57/88.4/18.0/2.496/0.738/2.266. [F4]
Always retain value + unit + age + sex + pregnancy/trimester + available context + paired TSH (if any). Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  paired hormone (PRIMARY companion): TSH (SCL-017) — and where available FT3 / thyroid antibodies (future);   [F6,F8]
  life-stage: age, pregnancy + trimester (FT4 shifts; higher in T1; ranges narrower/trimester-specific);       [F16]
  acute state: non-thyroidal (sick-euthyroid) illness — FT4 may fall with a structurally normal thyroid → defer/repeat; [F17]
  medications: levothyroxine (monitor 6–8 wk after change; draw pre-dose), liothyronine/NDT (FT4 may run low), amiodarone/heparin; [F20,F21]
  binding & assay: thyroid-binding abnormalities where supported (FDH → spurious high on some assays); high-dose biotin & heterophile antibodies interfere; [F23,F24]
  assay/lab: FT4 not standardised → prefer lab's own reference range.                                          [F18]
CORE RULE (founder): FT4 is a MEASURED hormone (unbound, active, binding-protein independent); its meaning depends on TSH → interpret the TSH×FT4 MATRIX; NOT a thyroid diagnosis. [F1,F5,F6][B3]
  → FT4 NEVER used in isolation where TSH is available; FT4 completes/classifies what TSH screens (primary vs central, subclinical vs overt, rare/interference). [F6-F12]
  → where several explanations fit an abnormal FT4, RANK them (§0.5); never assert one.
IF material context changes meaning → interpret WITHIN that context.                                          [R1]
IF TSH / key context unavailable → CONFIDENCE LIMITATION (FT4-alone read limited), not certainty.             [R4,R9]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors) — TWO-SIDED
```
FT4_WELLNESS_BAND (ng/dL [pmol/L], general non-pregnant adult; after context gate; ALWAYS read with TSH):   [F2,F13]
  LOW_FLAG              v < 0.8   [<10]              # low-direction; read with TSH (high TSH → primary; low/normal TSH → central pattern) [F2,F7,F8]
  LOW_NORMAL_WATCH      0.8 <= v < 0.9   [10–<11.5]  # low end of reference; lowest-quartile signal for emerging underactive pattern when TSH raised [F13]
  OPTIMAL_REFERENCE     0.9 <= v <= 1.5   [11.5–19]  # mid/upper reference; commonly-cited (debated) optimal zone (upper half) [F14,F15]
  UPPER_REFERENCE       > 1.5 <= 1.8   [>19–23]      # upper part of standard reference; watch with context (pregnancy/assay/meds) [F2]
  HIGH_FLAG             v > 1.8   [>23]              # above reference; high-direction (suppressed TSH → overt; normal/high TSH → interference/rare) [F2,F9,F10]
DIRECTION: TWO-SIDED (low = underactive-direction pattern; high = overactive-direction pattern). Meaning is set by TSH (§0.5). [R6]
ASSAY/LAB OVERLAY: FT4 NOT standardised → prefer the reporting lab's own reference range; treat inter-assay differences as genuine (e.g. 10–23 vs 12–22 pmol/L). [F18,F26]
PREGNANCY OVERLAY: use trimester-specific ranges (narrower; higher in T1) (§0.4); do NOT apply the non-pregnant bands. [F16]
UNIT: ng/dL [pmol/L]. TSH REQUIRED to move from a measured value to interpretation; if TSH absent → FT4-alone read + reduced combination confidence. [F6][R9]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; TSH-paired; never a diagnostic label. [B][D]**

## 0.4 Pregnancy & assay overlays (guideline-disagreement, never averaged) — [A]/[B]
```
PREGNANCY (trimester-specific; generally narrower than standard adult; FT4 higher in T1):   [F16]
  Use trimester/assay-specific ranges; thyroid hormone requirements rise ~25–50% in pregnancy → FT4 monitoring matters. [F16]
  → In pregnancy, prefer trimester/assay-specific ranges; do NOT apply non-pregnant bands; route (thyroid in pregnancy is a professional matter). [D]
ASSAY / STANDARDISATION (non-pregnant):   [F18,F26]
  FT4 assays are NOT standardised; inter-method differences are significant → prefer the reporting lab's own reference range.
  GUIDELINE/ASSAY DISAGREEMENT (represent, NEVER average): e.g. 0.8–1.8 ng/dL (10–23 pmol/L) typical vs 12–22 pmol/L validated in some populations; assay-specific target ranges required. [F18,F26]
OPTIMAL-TARGET DEBATE: some target the UPPER HALF (~1.0–1.5 ng/dL), others the MIDDLE of the range; central-hypothyroid dosing debated — show as a debated zone, never a cutoff, never averaged. [F14,F15]
```

## 0.5 TSH × Free T4 matrix — [A]+[C] — REUSED cross-biomarker (SCL-010) + inheritance (SCL-016/017)
```
MATRIX INTERPRETATION (pattern hints, NOT diagnoses; primary companion = TSH/SCL-017; confidence inherits lower input): [R4,R9]
  LOW FT4  + HIGH TSH        → primary underactive-thyroid PATTERN (thyroid-gland origin). [F7]
  LOW FT4  + LOW/NORMAL TSH  → central (pituitary/hypothalamic) PATTERN — TSH alone MISSES this; FT4 essential. [F8,F27]
  HIGH FT4 + SUPPRESSED TSH  → overt overactive-thyroid PATTERN (thyrotoxicosis; higher-risk context). [F9,F22]
  HIGH FT4 + NORMAL/HIGH TSH → UNUSUAL → assay interference (biotin/heterophile), binding abnormality (FDH), rare TSH-secreting adenoma or hormone resistance → investigate, do NOT read as simple overactive. [F10,F23,F24]
  NORMAL FT4 + HIGH TSH      → subclinical underactive PATTERN (repeat; differentials incl. NTI recovery, interference). [F11]
  NORMAL FT4 + LOW TSH       → subclinical overactive PATTERN (FT3 for T3-toxicosis; drug/recent-treatment differentials). [F12]
  NORMAL FT4 + NORMAL TSH    → euthyroid screen (no pattern). [F6]
GOVERNANCE: emit a matrix read using TSH as the primary companion; FT4 NEVER in isolation where TSH available; TSH absent → FT4-alone screen-level + confidence limitation. NEVER a diagnosis; RANK confounds first (§0.2). [R7,R9]
NOTE: acute illness / medications / binding abnormality / biotin can produce discordant patterns → exclude before interpreting (defer/repeat). [F17,F23,F24]
```

## 0.6 Confidence hierarchy (four-level) + inheritance — [C] — REUSED (SCL-010 + SCL-016/017)
```
STANDARD          : clear FT4 AND TSH available AND life-stage known (age/pregnancy) AND no acute-illness/biotin/binding/med confound AND lab range known.
REDUCED           : single value / near a boundary / assay-range or trimester overlay uncertain / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : abnormal FT4 with NO TSH (no matrix) OR unexcluded confound (illness/medication/binding/biotin) → FT4-alone screen-level + request TSH/repeat; name what's needed. [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals (e.g. high FT4 + normal TSH suggesting interference) / pregnancy needing professional ranges / likely non-thyroidal illness — explained abstention. [R2,F10,F17]
INHERITANCE: the TSH×FT4 combination verdict inherits the LOWER confidence of TSH and FT4; TSH absent → FT4-alone limited to a screen-level statement. [R9]
Reduced confidence does NOT auto-block; significant uncertainty MAY justify abstention. New subclinical/discordant pattern → prefer REPEAT (with TSH; exclude interference). [F11,F23]
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  FT4 is NOT a diagnosis. NEVER emit "hypothyroidism", "hyperthyroidism", "Graves' disease", "thyroiditis", "Hashimoto's", "pituitary disease/tumour", "thyrotoxicosis", or any condition as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  FT4 is a MEASURED hormone; its meaning depends on TSH → interpret the TSH×FT4 MATRIX; NEVER use FT4 in isolation where TSH is available. [B3][F6]
S3  Emit a matrix read using TSH (SCL-017) as primary companion; TSH absent → FT4-alone screen-level + confidence limitation (inheritance). [R9]
S4  On abnormal FT4 with ≥2 plausible causes → RANKED possibilities (non-thyroidal illness, medication, binding abnormality, biotin/heterophile interference, genuine thyroid shift); NEVER assert one. [R3]
S5  Life-stage aware: apply PREGNANCY trimester ranges (never non-pregnant bands in pregnancy); prefer the lab's own ASSAY range (FT4 not standardised). [F16,F18]
S6  HIGH FT4 + NORMAL/HIGH TSH → treat as UNUSUAL: suspect assay interference (biotin/heterophile), binding abnormality (FDH), or rare cause; investigate/repeat, do NOT read as simple overactive. [F10,F23,F24]
S7  New/isolated discordant or subclinical pattern → suggest REPEAT (with TSH); exclude non-thyroidal illness, medication, binding abnormality, and biotin first. [F11,F17,F23]
S8  Cross-markers (TSH/FT3/antibodies) unavailable → confidence limitation, not invented certainty. [R4]
S9  Never recommend treatments/medication changes/doses (e.g. levothyroxine); never produce a numeric thyroid-disease-risk %; medication questions → educate + refer. [D]
S10 RED FLAGS (very high FT4 + suppressed TSH = thyrotoxicosis; FT4 >5.0 ng/dL = thyroid-storm concern; low FT4 + low/normal TSH central pattern with symptoms; pregnancy with abnormal FT4) → calm prompt healthcare review; never emergency-diagnose. [F22,F8][D]
S11 Never present a BioSense band, reference range, optimal target, or matrix pattern as a medical/diagnostic boundary.
S12 Represent reference-range, optimal-target (mid vs upper-half), assay-specific, and pregnancy disagreement; NEVER average thresholds. [F14,F18,F26][R5]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & PAIRED MARKER (the key FT4 move): ALWAYS read with TSH (SCL-017); and where relevant FT3 / thyroid antibodies (future); apply pregnancy & assay overlays; exclude non-thyroidal illness / medication / binding abnormality / biotin; for a NEW discordant/subclinical pattern, REPEAT (with TSH). [F6,F17,F23]
Tier 2 LIFESTYLE (context-appropriate): general thyroid-friendly wellness (balanced iodine/selenium via diet, sleep, stress) — framed as education, not treatment; note FT4 fluctuates with stress/illness/medication and trends beat single values. [F19]
Tier 3 HEALTHCARE DISCUSSION (calm) when: low FT4 + high TSH, or high FT4 + suppressed TSH (overt patterns) | low FT4 + low/normal TSH (central pattern) | high FT4 + normal/high TSH (interference/rare) | FT4 >5.0 ng/dL | pregnancy with abnormal FT4 | on thyroid-affecting medication. [F7,F8,F9,F10,F22][D]
NEVER a specific treatment, medication change, or dose at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → assay/pregnancy overlay → FT4 band + TSH matrix (if TSH) → template; RANKED confounds where abnormal; ALWAYS "read with TSH".
OPTIMAL_REFERENCE (+ normal TSH) → affirming, with the "measured hormone, read with TSH" caveat.
LOW_NORMAL_WATCH / UPPER_REFERENCE → calm; within/near reference; context (pregnancy/assay/illness/meds); repeat if borderline (with TSH).
LOW_FLAG / HIGH_FLAG → constructive; TSH matrix; ranked confounds; repeat; ALWAYS "not a diagnosis".
overt patterns (low FT4+high TSH; high FT4+suppressed TSH) or central pattern (low FT4+low/normal TSH) → calm prompt healthcare review; never alarm, never diagnose.
high FT4 + normal/high TSH → flag as unusual → suspect interference/rare; investigate/repeat; do NOT read as simple overactive.
pregnancy → trimester/assay ranges; route.
TSH unavailable → FT4-alone screen-level + confidence limitation; name that TSH completes the picture.
Never "normal/abnormal" as a verdict; never a diagnosis (hypo/hyperthyroidism/Graves/thyroiditis/pituitary disease).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Free T4 is the active thyroid hormone itself, and it's read together with TSH — the same Free T4 can mean
      different things depending on your TSH — and alongside your wider context."
CAV3 (screen/no TSH) "Free T4 is best read with TSH. On its own it's only part of the picture, so we'd interpret
      this more confidently with your TSH (and, where relevant, Free T3 or thyroid antibodies)."
CAV4 (reduced/context) name the context reducer(s) or missing marker (TSH, trimester, illness, medication, binding abnormality, biotin, lab range).
CAV5 (new/borderline/discordant) "Free T4 varies with stress, illness, some medicines, and natural variation, and
      assays differ between labs — so a single out-of-range value is usually best repeated (with TSH) before reading much into it."
CAV6 (abnormal, ranked) "Because several things affect Free T4 and its measurement, we've noted the more likely
      explanations given your context rather than pointing to one — best confirmed with a professional."
CAV7 (overt/central or red flags) "This pattern — read across Free T4 and TSH — is worth a prompt, unhurried
      conversation with a healthcare professional."
CAV8 (high FT4 + normal/high TSH) "This particular combination is unusual and often reflects the test itself
      (for example a biotin supplement or an antibody quirk) rather than a thyroid problem, so it's worth
      re-checking before reading anything into it."
CAV9 (pregnancy) "In pregnancy, thyroid ranges differ by trimester and by lab, so pregnancy results are best
      interpreted with trimester- and assay-specific ranges and a professional."
CAV10 (assay/lab) "Free T4 tests aren't fully standardised between labs, so we compare against your own lab's
       reference range wherever possible."
```

## 0.11 Source & version identifiers
```
config_id: SCL-018   config_version: 1.0
band_id: BIOSENSE_FT4_TWOSIDED_BANDS_v1                  (Category B; two-sided; anchors F2,F13)
assay_overlay_id: SCL018_FT4_ASSAY_OVERLAY_v1           (non-standardised; prefer lab range; F18,F26)
pregnancy_overlay_id: SCL018_FT4_PREGNANCY_v1           (trimester ranges; higher T1; F16)
tsh_matrix_id: SCL018_TSH_FT4_MATRIX_v1                 (cross-biomarker + multiple-explanations; primary companion TSH/SCL-017; R4; F6-F12)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1   (reused; R2)
confidence_inheritance_ref: SCL016_CONFIDENCE_INHERITANCE_v1 (reused SCL-016/017; R9 — combination inherits lower input confidence)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1   (reused; R3 — ranked confounds/causes)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1     (reused; R4 — TSH primary companion; FT3/antibodies future)
sex_age_preg_aware_ref: SCL004/010/016/017 posture       (reused; R8)
guideline_disagreement_ref: SCL011/012 posture           (reused; R5 — range/optimal target/assay-specific/pregnancy)
safety_rules_id: SCL018_SAFETY_v1                        (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Free thyroxine (Free T4, FT4) is the small, **unbound** fraction of the thyroid hormone thyroxine — <cite index="6-1">the 0.02 to 0.03% of total circulating T4 that is not bound to transport proteins</cite> — and it is <cite index="6-1">the only portion available to enter cells and drive metabolic activity</cite>. Because it is measured directly and is **not affected by binding-protein changes**, it is the preferred measure of functional thyroid-hormone status: <cite index="4-1">Free T4 is generally preferred because it is not affected by changes in binding protein levels, which can shift due to pregnancy, medications, or liver conditions.</cite> **[A][F1][F5]**

The defining feature for interpretation is that Free T4 is **the companion to TSH**. <cite index="6-1">Free T4 paired with TSH forms the standard initial thyroid panel</cite>, and Free T4's job is to confirm and classify what TSH screens. The meaningful states are **combinations**: a low Free T4 with a high TSH reads as a primary (thyroid-gland) underactive pattern; <cite index="9-1">when Free T4 is low with normal or low TSH, secondary hypothyroidism from pituitary or hypothalamic dysfunction is suggested — this distinction is critical and cannot be made from TSH alone</cite>; a high Free T4 with a suppressed TSH reads as an overactive (thyrotoxic) pattern; and a high Free T4 with a normal-or-high TSH is unusual and points to assay interference or a rare cause. **[A][F6][F7][F8][F9][F10]**

So BioSense reads Free T4 **with TSH**, in context, and names no condition. **[B][B2]**

- **Reported in:** ng/dL (SI pmol/L = ng/dL × 12.87). **[A][F3]**
- **Nature:** measured, unbound, active thyroid hormone; **two-sided**; **TSH-paired**; **not a thyroid diagnosis** **[A][B3]**
- **Direction:** two-sided (low = underactive-direction; high = overactive-direction) **[A][R6]**
- **Primary companion:** TSH (SCL-017); FT3/antibodies (future) **[A][F6]**
- **BioSense role:** the measured companion hormone that completes the TSH × FT4 thyroid-wellness matrix.

---

# 2. Physiological Function

The thyroid secretes mostly T4 (thyroxine), which circulates almost entirely bound to transport proteins
(thyroxine-binding globulin, transthyretin, albumin); only the tiny **free** fraction is biologically active
and available to tissues, where much of it is converted to the more active T3. **[A][F1]** Measuring the *free*
hormone rather than total T4 avoids the distortion that binding-protein changes (pregnancy, oestrogen, liver
disease, nephrotic syndrome, genetic variants) would otherwise cause. **[A][F5]**

Two features define interpretation **[A]**:
- **Free T4 is the hormone; TSH is the signal.** Free T4 is read **with** TSH because the pituitary sets TSH in
  response to Free T4 through an amplified, log-linear feedback loop — so the pair localises where any shift
  arises (thyroid vs pituitary). **[A][F25][F6]**
- **Free T4 is measurement-sensitive.** Its assays are **not standardised** (inter-method differences are
  significant), and binding abnormalities, biotin, and heterophile antibodies can distort results — so the
  reporting lab's own range and the confound review matter. **[A][F18][F23][F24]**

---

# 3. Scientific Background

Three scientific themes shape how BioSense represents Free T4. **[A]**

**First, Free T4 means little without TSH.** The clinically meaningful states are **combinations** read across
the TSH × FT4 matrix — primary underactive (low FT4 + high TSH), central (low FT4 + low/normal TSH), overt
overactive (high FT4 + suppressed TSH), the rare/interference pattern (high FT4 + normal/high TSH), and the
subclinical patterns (normal FT4 + abnormal TSH). Free T4 is **essential** where TSH is normal: <cite index="13-1">for central hypothyroidism and rare thyroid hormone receptor and transporter defects a free thyroxine measurement is essential for the diagnosis because TSH is usually normal.</cite> This is why BioSense treats the **TSH × FT4 matrix** as the unit of interpretation and never uses Free T4 in isolation where TSH is available. **[A][F7][F8][F10][F11]**

**Second, the thresholds and assays genuinely differ.** The standard adult range is ~0.8–1.8 ng/dL (10–23
pmol/L), but <cite index="14-1">reference ranges have been validated per population, e.g. FT4 12–22 pmol/L in one hospital population</cite>, and <cite index="5-1">FT4 reference intervals show significant inter-method difference, so assay-specific target ranges are required until FT4 assay standardisation is realised.</cite> On top of that, the "optimal" target is debated — <cite index="5-1">some authors suggest a target FT4 in the middle of the reference interval while others advocate the upper half.</cite> BioSense **presents these frameworks side by side and never averages them.** **[A][F2][F14][F18][F26]**

**Third, Free T4 is easily confounded — including at the assay.** Non-thyroidal (sick-euthyroid) illness lowers
it; several medications and T3-containing therapies shift it; and <cite index="15-1">high free T4 with a normal TSH is an unusual pattern that demands investigation for assay interference</cite> such as biotin or heterophile antibodies, binding abnormalities (FDH), or rare causes. A single value is best read with TSH and, if discordant, repeated. **[A][F17][F21][F23][F24]**

**The wellness reading — [B]:** Free T4 is a context-first, TSH-paired, two-sided thyroid-wellness hormone —
read with TSH, with pregnancy and assay overlays, plausible confounds ranked rather than one asserted, guideline
and assay disagreement shown honestly, discordant patterns repeated before they count, and no condition named.

**An honest boundary — [E]:** ranges vary by assay and are not standardised, the optimal target is debated, and
many factors (illness, medication, binding, biotin) move Free T4 or its measurement — so BioSense leans on TSH
and context and is explicit about confidence. **[E][F14][F18]**

---

# 4. Why Free T4 Matters

**1. It's the active hormone — the classifier after TSH. [A][F6]** Free T4 confirms and classifies thyroid
status once TSH flags a question, and is essential where TSH is normal (central patterns). **[A]**

**2. Paired with TSH, it localises the shift. [A][F8]** The matrix separates thyroid-gland from pituitary/
hypothalamic patterns, and overt from subclinical — a distinction that cannot be made from TSH alone. **[A]**

**3. Binding-protein independence makes it robust. [A][F5]** Unlike total T4, Free T4 is not thrown off by
pregnancy, oestrogen, or liver disease — so it's a cleaner functional read (assay caveats aside). **[A]**

**Why BioSense measures it — [C]:** Free T4 is the measured companion that completes the thyroid pair — the
ideal case for Context-First interpretation, cross-biomarker (TSH) intelligence, confidence inheritance,
pregnancy/assay-aware banding, ranked explanations, and guideline/assay-disagreement handling, all while never
diagnosing thyroid disease.

---

# 5. Laboratory Measurement

Free T4 is measured on a serum immunoassay (or, in reference settings, by equilibrium dialysis/LC-MS/MS),
reported in **ng/dL (SI pmol/L)**. **[A][F1][F3]**

- **Unit & factor.** ng/dL is canonical; pmol/L = ng/dL × 12.87. This is an **FT4-specific** factor — not the
  FT3 factor, and Free T4 ranges/units must not be mixed with Total T4. **[A][F3][F4]**
- **Free vs total.** Free T4 measures only the unbound active fraction and is preferred over total T4 because it
  is binding-protein independent. **[A][F5]**
- **Paired with TSH.** Free T4 is read **with** TSH (SCL-017) — the standard initial panel — and is never used
  in isolation where TSH is available. **[A][F6]**
- **Assay non-standardisation.** FT4 assays differ significantly between methods and are not standardised → use
  the reporting lab's own reference range. **[A][F18]**
- **Interference.** High-dose **biotin** and **heterophile antibodies** distort immunoassay FT4; **binding
  abnormalities** (FDH) can raise FT4 on some assays — considered before acting on discordant results. **[A][F23][F24]**
- **Confounds & timing.** Non-thyroidal illness lowers FT4; on levothyroxine, check 6–8 weeks after a dose
  change and draw before the morning dose; on T3-containing therapy FT4 may run low. **[A][F17][F20][F21]**
- **Companion panel.** Read with **TSH**, and where available **FT3** (active hormone / T3-toxicosis) and
  **thyroid antibodies** (autoimmune context, future). **[A][F6]**

---

# 6. Units

- **ng/dL** — standard; **BioSense canonical unit.** **[A/C]**
- **pmol/L** — SI; = ng/dL × 12.87 (reverse ÷ 12.87). **[A][F3]**
- **FT4 factor is 12.87** — do **not** use the Free T3 factor (different molecular weight), and do **not** mix
  Free T4 and Total T4 ranges/units. It is also distinct from cholesterol (38.67), triglycerides (88.57),
  creatinine (88.4), glucose (18.0), 25(OH)D (2.496), B12 (0.738), folate (2.266), and from the factor-free
  TSH. **[A][F3][F4][C]**

BioSense stores the reported value, unit, age, sex, pregnancy/trimester, lab reference range, and any paired
TSH unchanged, and evaluates the TSH×FT4 matrix and overlays. **[C]**

---

# 7. Unit Conversion

```
pmol/L = ng/dL × 12.87       (Free T4; reverse: ng/dL = pmol/L ÷ 12.87)   [F3]
(FT4-specific factor; NOT the Free T3 factor; do NOT mix with Total T4 — see SCL-017 for TSH, which has no factor)
```
Worked check: FT4 1.2 ng/dL ≈ 15.4 pmol/L; 15 pmol/L ≈ 1.17 ng/dL. **[A][F3]**

**Safety rule [D]:** the Free T4 factor (12.87) must never be confused with the Free T3 factor or any other
analyte factor, and Free T4 must not be interpreted against Total T4 ranges. A unit-unknown value is displayed
but not interpreted; a matrix read requires TSH; pregnancy/assay overlays are applied before banding. **[D][F4]**

---

# 8. Measurement Limitations & the TSH-Paired Principle  *(Context-First basis — reused SCL-010)*

Free T4's defining limitations are that **its meaning depends on TSH** and that **its measurement is assay-
sensitive** — which is why the Context-First gate (§0.2), the TSH×FT4 matrix (§0.5), and the ranked-confound
output apply. **[A][B3]**

## 8.1 Free T4 needs TSH — [A]
The primary/central and overt/subclinical distinctions require the pair; Free T4 is essential where TSH is
normal (central patterns), and is never used in isolation where TSH is available. **[A][F6][F8]**

## 8.2 Assays are not standardised — [A]
Inter-method differences are significant; the reporting lab's own range is used, and inter-assay differences
are treated as genuine, not averaged. **[A][F18][F26]**

## 8.3 Interference & binding — [A]
Biotin and heterophile antibodies distort FT4; binding abnormalities (FDH) can raise it on some assays — a high
FT4 with a normal/high TSH is treated as unusual and investigated. **[A][F23][F24][F10]**

## 8.4 Confounds & variation — [A]
Non-thyroidal illness lowers FT4; medications and T3-therapy shift it; FT4 fluctuates with stress/illness — so
trends beat single values and discordant results are repeated with TSH. **[A][F17][F19][F21]**

**How BioSense uses this — [C][D]:** the Context-First gate runs first; Free T4 is banded two-sided with
pregnancy/assay overlays; the TSH×FT4 matrix is emitted with TSH as the primary companion (else FT4-alone +
limited confidence); plausible confounds are **ranked, not asserted**; interference/illness possibilities and
the repeat discipline are surfaced; missing TSH/context sets Context-Required/Reduced confidence; and no
condition is ever named.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010; combination inheritance via SCL-016/017)*

Free T4 consumes its paired hormone and context markers where available. **[A][C]**

- **TSH (SCL-017) — the primary companion. [A]** Free T4 is always read with TSH; the **TSH×FT4 matrix**
  (primary vs central, subclinical vs overt, rare/interference) is the unit of interpretation, and its
  confidence **inherits the lower** of the two inputs (§0.5, §0.6). **Free T4 is never used in isolation where
  TSH is available.** **[A][F6][F8][R4][R9]**
- **Free T3 (future). [A]** When TSH is low with normal FT4, FT3 helps identify T3-toxicosis; on T3-containing
  therapy FT4 may run low and FT3/clinical response weigh more. **[A][F21]**
- **Thyroid antibodies (future). [A]** Autoimmune context for an underactive-direction pattern; background, not
  a diagnosis. **[A]**
- **Metabolic context (glucose SCL-009 / HbA1c SCL-002 / lipids). [A]** Thyroid status interacts with metabolic
  and lipid wellness; read as supporting context. **[A]**
- **(Context) medications, binding proteins, biotin. [A]** Levothyroxine/liothyronine/amiodarone/heparin,
  binding abnormalities, and biotin are interpretation context, never something BioSense advises changing. **[A][F20][F21][F23]**

**Cross-biomarker rule [C] (reused R4/R9):** where these are **available**, BioSense consumes them (with the
matrix and confound caveats) to sharpen the read and confidence; where **unavailable** — especially **TSH**
(without which only an FT4-alone statement is possible) — it records a **confidence limitation** and names what
would clarify, never inventing certainty. **[C][R4][R9]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Free T4 is the unbound, active fraction; preferred over total T4 (binding-protein independent).** **[A][F1][F5]**
- **Free T4 is paired with TSH as the standard initial panel; FT4 classifies after TSH and is essential for
  central patterns.** **[A][F6][F8]**
- **The TSH×FT4 combinations map to recognised patterns** (primary/central hypo, subclinical/overt hyper, rare/
  interference). **[A][F7-F12]**
- **Free T4 shifts in pregnancy (trimester-specific) and falls in non-thyroidal illness.** **[A][F16][F17]**
- **Biotin/heterophile interference and binding abnormalities can distort FT4; a high FT4 + normal/high TSH is
  unusual and investigated.** **[A][F10][F23][F24]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **Standard range (0.8–1.8 ng/dL / 10–23 pmol/L) vs assay/population-specific (e.g. 12–22 pmol/L).** **[A][F2][F26]**
- **Optimal target: middle of the range vs the upper half (~1.0–1.5 ng/dL).** **[A][F14][F15]**
- **FT4 assays are not standardised → assay-specific ranges/targets required.** **[A][F18]**
- **Pregnancy: trimester-specific (narrower; higher in T1) vs the non-pregnant range.** **[A][F16]**
- **Why:** Free T4 assays measure a tiny fraction differently across platforms and are not harmonised; targets
  and populations vary. BioSense **presents the differing frameworks and never averages them** (reused R5). **[A][E]**

## 10.3 Strength of evidence
- **Free T4 physiology, TSH pairing, matrix, binding-independence: established.** **[A][F1][F6]**
- **Pregnancy shift; non-thyroidal illness; interference; repeat/trend: established.** **[A][F16][F17][F23]**
- **Optimal target; assay standardisation: evolving/contested.** **[E][F14][F18]**
- **Rare patterns (TSH-secreting adenoma, hormone resistance, FDH): established but rare.** **[A][E][F10][F24]**

## 10.4 Intended populations
Thresholds target general **non-pregnant adults**, **assay/lab-specific**, with separate **pregnancy**
(trimester-specific) handling. BioSense applies them context-first, abstains or routes in pregnancy, likely
non-thyroidal illness, and suspected interference, and reduces confidence where TSH or context is unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. Free T4 is TWO-SIDED (low = underactive-direction; high =
> overactive-direction), CONTEXT-GATED, TSH-PAIRED, and SEX/AGE/PREGNANCY/ASSAY-AWARE: the value is a measured
> hormone whose meaning is set by TSH and biological context, and where several explanations fit they are
> RANKED, not asserted. Reference ranges, the "optimal" target, assay-specific ranges, and pregnancy ranges
> genuinely DIFFER and are shown, never averaged. Free T4 is NEVER used in isolation where TSH is available.
> Never a diagnosis of thyroid disease.**

## 11.1 The Free T4 wellness bands (ng/dL [pmol/L]; general non-pregnant adult; after context gate; read with TSH)

| BioSense Wellness Interpretation | Free T4 ng/dL [pmol/L] | Evidence anchor | Wellness meaning (context-first, TSH-paired; no diagnostic label) |
|---|---|---|---|
| **Low — Flag** | < 0.8 [<10] | Below reference [F2][F7][F8] | Low-direction; read with TSH (high TSH → primary pattern; low/normal TSH → central pattern); exclude illness/meds. |
| **Low-Normal — Watch** | 0.8 – < 0.9 [10 – <11.5] | Lowest-quartile signal [F13] | Low end of reference; when TSH is raised, the lowest quartile can signal an emerging underactive pattern; read with TSH. |
| **Optimal Reference** | 0.9 – 1.5 [11.5 – 19] | Reference / debated optimal [F14][F15] | Mid/upper reference; the upper half (~1.0–1.5) is a commonly-cited (debated) optimal zone. |
| **Upper Reference** | > 1.5 – 1.8 [>19 – 23] | Standard reference upper part [F2] | Upper part of the standard range; watch with context (pregnancy/assay/medication). |
| **High — Flag** | > 1.8 [>23] | Above reference [F2][F9][F10] | High-direction; with suppressed TSH → overt pattern; with normal/high TSH → unusual (interference/rare), investigate. |

*(Read with TSH (SCL-017); the matrix sets the meaning (§11.4). Pregnancy and assay overlays modify the
boundaries (§11.2). Ranges/targets/assays differ; shown, never averaged (§11.5). pmol/L via ×12.87.)*

## 11.2 Life-stage & assay overlays [A][B]
- **Assay/lab (non-pregnant):** Free T4 assays are **not standardised** and differ significantly between
  methods; the reporting **lab's own reference range** is preferred, and inter-assay differences (e.g. 10–23 vs
  12–22 pmol/L) are treated as genuine, not averaged. **[A][F18][F26]**
- **Pregnancy:** use **trimester-specific** ranges (generally narrower than standard; FT4 higher in the first
  trimester), **not** the non-pregnant bands; route (professional matter). **[A][F16]**

## 11.3 How the bands were derived — transparency [B]
- The bands use the **standard adult range (0.8–1.8 ng/dL / 10–23 pmol/L)** with a **low-normal watch** at the
  lowest quartile (the emerging-underactive signal) and the **debated optimal** (~upper half, 1.0–1.5) shown as
  a zone, not a cutoff. **[F2][F13][F14]**
- **No number was averaged.** Varying ranges/targets/assays and pregnancy frameworks are presented distinctly
  (§11.5). **[R5]**
- The **low and high flags** are two-sided context markers; meaning is completed by TSH. **[F6]**

## 11.4 The TSH × Free T4 matrix (the unit of interpretation) [A][B]
| Free T4 | TSH | Pattern hint (NOT a diagnosis) | Anchor |
|---|---|---|---|
| Low | High | Primary (thyroid-gland) underactive-direction pattern | F7 |
| Low | Low / Normal | Central (pituitary/hypothalamic) pattern — TSH alone misses this | F8, F27 |
| High | Suppressed | Overt overactive-direction pattern (thyrotoxicosis; higher-risk context) | F9, F22 |
| High | Normal / High | **Unusual** → assay interference (biotin/heterophile), binding abnormality (FDH), or rare cause — investigate, not a simple verdict | F10, F23, F24 |
| Normal | High | Subclinical underactive-direction pattern (repeat) | F11 |
| Normal | Low | Subclinical overactive-direction pattern (FT3 for T3-toxicosis) | F12 |
| Normal | Normal | Euthyroid screen (no pattern) | F6 |

The matrix uses **TSH as the primary companion**, inherits the lower input confidence, ranks confounds first,
and **names no condition** (§0.5, §12). Free T4 is **never used in isolation where TSH is available**. **[A][B][R4][R9]**

## 11.5 Guideline/assay-disagreement display (reused posture) [B][C]
Where relevant, BioSense shows the standard range vs the debated optimal (mid vs upper-half), the **assay-
specific/non-standardised** ranges, and the pregnancy trimester ranges as distinct frameworks — **never
averaged** (CAV9, CAV10). **[B][C][R5][F18]**

## 11.6 Context-gate precedence [D]
No band or matrix read is emitted as a verdict without the Context-First evaluation (§0.2). TSH, pregnancy/
assay overlays, non-thyroidal illness, medication/binding/biotin, and repeat are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general non-pregnant adult**, read **with TSH**, **assay/lab-specific**. Ranges are contested
and assay-dependent; Free T4 is confounded by illness/medication/binding/biotin and fluctuates. Pregnancy uses
separate ranges (§11.2); not applied to children/adolescents (paediatric assay-specific ranges differ). **[E][F18]**

---

# 12. Interpretation Framework — CONTEXT-FIRST + TSH-PAIRED (reused SCL-010 cross-biomarker + SCL-016/017 inheritance)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010), cross-biomarker
> intelligence (SCL-010), and confidence inheritance (SCL-016/017). Free T4 is interpreted as a measured,
> context-dependent, TSH-paired thyroid-wellness hormone, never a thyroid diagnosis, and never in isolation
> where TSH is available. No new methodology is introduced.** **[C][R1][R4][R9]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1][B3]
   gather context (TSH (SCL-017) — PRIMARY companion; age; pregnancy/trimester; non-thyroidal illness;
   medications levothyroxine/liothyronine/amiodarone/heparin; binding abnormality where supported; biotin/
   heterophile interference; lab reference range; future FT3/antibodies).                          [R4]
   → if material context changes meaning, interpret WITHIN it; if key context unavailable, record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit ng/dL [pmol/L]; not Total T4; result final; no known biotin/heterophile interference; lab range known) → else display-only/flag. [F4,F23]
STEP 2 — ELIGIBILITY / LIFE-STAGE: non-pregnant adult → apply ASSAY/lab range; pregnancy → trimester/assay ranges + route; likely non-thyroidal illness → defer/repeat. [F16,F17,F18]
STEP 3 — CONFIDENCE (four-level + inheritance): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED; combination inherits lower of TSH/FT4 (§0.6). [R2,R9]
STEP 4 — BAND: assign two-sided band (§11.1) with pregnancy/assay overlay.                          [R6,R8]
STEP 5 — MATRIX: if TSH present, resolve the TSH×FT4 matrix (§11.4); else FT4-alone screen-level statement. [R4]
STEP 6 — RANKED CONFOUNDS/CAUSES: abnormal with ≥2 plausible causes → Possible Explanation A/B/C, ranked (non-thyroidal illness, medication, binding abnormality, biotin/heterophile, genuine shift). [R3]
STEP 7 — REPEAT: new discordant/subclinical pattern → suggest REPEAT (with TSH) after excluding confounds/interference. [F11,F23]
STEP 8 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); route where appropriate; NO diagnosis. [R7]
```

**Core interpretive stance [B]:** Free T4 is a context-first, TSH-paired, two-sided thyroid-wellness hormone —
read with TSH, with pregnancy and assay overlays, plausible confounds ranked rather than one asserted, guideline
and assay disagreement shown honestly, discordant patterns repeated before they count, and no condition named. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy + inheritance — reused SCL-010 + SCL-016/017)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear FT4 AND TSH available AND life-stage known AND no illness/biotin/binding/med confound AND lab range known | Band + TSH matrix + ranked confounds normally |
| **REDUCED** | Single value / near a boundary / assay-range or trimester overlay uncertain / minor context | Band cautiously; prefer repeat; name the reducer (CAV4/CAV5) |
| **CONTEXT_REQUIRED** | Abnormal FT4 with no TSH (no matrix) OR unexcluded confound (illness/medication/binding/biotin) | FT4-alone screen-level + request TSH/repeat; name needed context (CAV3/CAV6) |
| **ABSTAINED** | Significant uncertainty / conflicting signals (e.g. high FT4 + normal TSH → interference) / pregnancy needing professional ranges / likely non-thyroidal illness | Explained abstention; route |

**Inheritance (reused SCL-016/017):** the TSH×FT4 combination verdict inherits the **lower** confidence of its
inputs; if TSH is unavailable, Free T4 is limited to an **FT4-alone screen-level** statement, not asserted. **[R9]**

Reducers/context inputs: TSH absent (no matrix) [F6]; single value / fluctuation [F19]; possible non-thyroidal
illness [F17]; medication/binding/biotin confound [F21][F23][F24]; assay/trimester overlay uncertainty [F16][F18];
near a band boundary. **[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant uncertainty
**may** justify abstention; a new discordant/subclinical pattern prefers a **repeat** (with TSH) framing. **[R2][F11]**

---

# 14. Wellness Interpretation  *(context-first, TSH-paired, two-sided, ranked confounds)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate. Wellness, not medical;
**never a diagnosis**; always **read with TSH**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal Reference** *(0.9–1.5 ng/dL; normal TSH).* "Your Free T4 — the
  active thyroid hormone — sits in a favourable range, and read with your TSH there's nothing here that stands
  out. It's a single snapshot, but this looks settled." **[B]**
- **BioSense Wellness Interpretation: Low-Normal — Watch / Upper Reference** *(0.8–<0.9, or >1.5–1.8).* "Your
  Free T4 is within the standard range but toward the {low / upper} end. That's often just context — a recent
  illness, a medicine, pregnancy, or the particular assay — so it's read with your TSH and, if borderline,
  repeated." Calm; context; **no diagnosis** (CAV2, CAV5, CAV10). **[B][D]**
- **BioSense Wellness Interpretation: Low — Flag / High — Flag** *(<0.8, or >1.8).* "This is {below / above} the
  usual range. Because Free T4 means different things depending on your TSH, we read the two together, and we've
  noted the more likely explanations for your context — illness, a medicine, a binding-protein quirk, a biotin
  supplement, or a genuine thyroid shift — rather than pointing to one. A repeat with TSH is often sensible."
  Constructive; **no diagnosis** (CAV3, CAV5, CAV6). **[B][D]**
- **BioSense Wellness Interpretation: overt or central patterns** *(low FT4 + high TSH; high FT4 + suppressed
  TSH; low FT4 + low/normal TSH).* Calm routing: "This pattern — read across Free T4 and TSH — is worth a
  prompt, unhurried conversation with a healthcare professional, who can look at the fuller picture. The numbers
  alone don't diagnose anything." **No alarm, no diagnosis** (CAV7). **[B][D][F8][F9]**
- **BioSense Wellness Interpretation: high FT4 + normal/high TSH (unusual).** "This particular combination is
  unusual and often reflects the test itself — for example a biotin supplement or an antibody quirk — rather
  than a thyroid problem, so it's worth re-checking before reading anything into it." Investigate/repeat; **no
  diagnosis** (CAV8). **[B][D][F10][F23]**
- **Pregnancy.** "In pregnancy, thyroid ranges differ by trimester and by lab, so this is best interpreted with
  trimester- and assay-specific ranges and a professional." Route (CAV9). **[B][D][F16]**

**TSH-matrix modifier:** where TSH is available, present the TSH×FT4 pattern (primary/central, subclinical/overt,
rare/interference) as **context**; where TSH is absent, give an **FT4-alone** statement and name that TSH
completes the picture (CAV3). The combination confidence **inherits the lower** input (§0.6). **[D][R4][R9]**

**Ranked-confounds modifier (reused):** on any abnormal Free T4 with ≥2 plausible causes, present **Possible
Explanation A/B/C** ordered by evidence + context (non-thyroidal illness, medication, binding abnormality,
biotin/heterophile, genuine shift) — never a single certain cause, never a named condition. **[D][R3]**

**Assay/pregnancy overlay modifier:** prefer the lab's own range; apply pregnancy trimester ranges; never apply
non-pregnant bands in pregnancy (CAV9, CAV10). **[D][F16][F18]**

**Context-unavailable modifier:** where **TSH** (or life-stage/illness/medication/lab-range context) is missing,
state the confidence limitation and name what would clarify (CAV3/CAV4); never invent certainty (S8). **[D][R4]**

Every interpretation pairs the band and matrix with context guidance (§17) and the mandatory caveats (§0.10).
**None diagnoses hypothyroidism, hyperthyroidism, Graves' disease, thyroiditis, or pituitary disease, none
asserts a single cause, and none treats a BioSense band, range, target, or matrix as a medical boundary.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for FT4).** Abnormal Free T4 with **no TSH** (no matrix) or an unexcluded
  confound (illness/medication/binding/biotin) → FT4-alone screen-level + request TSH/repeat; state what's
  needed (§13, CAV3/CAV6). **[D][R2]**
- **15.2 High FT4 + normal/high TSH (suspected interference/rare).** Treat as **unusual**: suspect biotin/
  heterophile interference, binding abnormality (FDH), or a rare cause; investigate/repeat; do not read as
  simple overactive. **[D][F10][F23][F24]**
- **15.3 Non-thyroidal (sick-euthyroid) illness.** Free T4 may fall with a structurally normal thyroid → defer/
  repeat once recovered; do not interpret as a thyroid pattern. **[D][F17]**
- **15.4 Pregnancy.** Use **trimester/assay-specific** ranges (higher in T1; generally narrower) and route —
  thyroid status in pregnancy is a professional matter; requirements rise ~25–50%. **[D][F16]**
- **15.5 On thyroid-affecting medication.** Levothyroxine (check 6–8 wk after change; pre-dose draw),
  liothyronine/NDT (FT4 may run low), amiodarone/heparin → interpret as context; never advise changing a dose. **[D][F20][F21]**
- **15.6 Binding abnormalities & biotin.** FDH and high-dose biotin can distort FT4 → flag and suggest
  re-testing (off biotin / assay-aware); do not over-read. **[D][F23][F24]**
- **15.7 Children & adolescents.** Assay- and age-specific paediatric ranges differ; adult bands not applied —
  display, suggest professional interpretation. **[D][F18]**
- **15.8 Red flags.** Very high FT4 + suppressed TSH (thyrotoxicosis); **FT4 >5.0 ng/dL** (thyroid-storm
  concern); central pattern (low FT4 + low/normal TSH) with symptoms; pregnancy with abnormal FT4 → calm prompt
  healthcare review regardless of band. **[D][F22][F8]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Trends beat single values. [A]** Free T4 fluctuates with stress, illness, medications, and natural
  variation, so a within-person **trend** (read with TSH) is more informative than one reading. **[F19]**
- **Repeat discordant/subclinical patterns. [A]** A new discordant or subclinical pattern is repeated **with
  TSH**, after excluding interference/illness, before it means anything. **[F11][F23]**
- **Hold the assay constant. [A]** Because FT4 assays are not standardised, trends must compare like-with-like
  (same assay/lab); an assay change is noted so it isn't mistaken for a real change. **[F18]**
- **Medication timing. [A]** On levothyroxine, re-check 6–8 weeks after a dose change and draw before the
  morning dose; on T3-therapy FT4 may run low by design. **[F20][F21]**
- **Context/abstained points. [C]** Illness, biotin, medication-change, pregnancy, suspected-interference, and
  context-required points are tagged so they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For Free T4, the first tier is **context and the paired marker** (TSH above all), then context-appropriate
lifestyle. **[A]/[B]**

## 17.1 Paired marker & context first [A][F6][F23]
Where Free T4 is abnormal, the clarifying steps are **TSH** (and, where relevant, FT3/antibodies), the
**confound review** (illness/medication/binding/biotin), the **assay/pregnancy overlay**, and — for a new
discordant/subclinical pattern — a **repeat with TSH**. **[A]**

## 17.2 Thyroid-friendly wellness context [A]
General thyroid-friendly wellness — adequate but not excessive **iodine** and **selenium** via a balanced diet,
sleep, and stress management — is relevant context; FT4 naturally fluctuates. Framed as **education, not
treatment**. **[A]**

## 17.3 Confound & exposure context [A][F17][F23]
Non-thyroidal illness, thyroid-affecting medications, binding-protein changes, and high-dose biotin are
recognised context/confounds for an abnormal Free T4 (or its measurement) — useful for interpretation,
**never** a prompt to change any medication or supplement without professional advice. **[A]**

## 17.4 Framing rules [B][D]
Paired marker and context first (repeat with TSH for new discordant/subclinical); **no specific treatments,
medication changes, or doses** (S9); range/target/assay/pregnancy disagreement shown, never averaged; calm,
evidence-informed language; never a diagnosis; the TSH-paired (CAV2), FT4-alone (CAV3), assay (CAV10), and
pregnancy (CAV9) caveats attached where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain that Free T4 is the measured active thyroid hormone read **with** TSH; run the
context-first evaluation; assign the two-sided band with pregnancy/assay overlays; resolve the TSH×FT4 matrix
(with inherited confidence) when TSH is present; integrate FT3/antibodies and metabolic context (future/where
available); present **ranked** confounds for an abnormal value; recommend a repeat (with TSH); name which
markers would clarify (especially TSH); express context-required/abstention respectfully.

The AI layer **must never**:
- emit "hypothyroidism", "hyperthyroidism", "Graves' disease", "thyroiditis", "Hashimoto's", "pituitary disease/tumour", "thyrotoxicosis", or any condition as a diagnosis — even to deny one (S1)
- use Free T4 in isolation where TSH is available, or emit a matrix read without TSH (S2, S3)
- assert a single cause for an abnormal Free T4 when ≥2 are plausible — rank them (S4)
- ignore life-stage/assay (prefer the lab's own range; use pregnancy trimester ranges; never non-pregnant bands in pregnancy) (S5)
- read a high FT4 + normal/high TSH as simple overactive — treat as unusual and investigate interference/rare (S6)
- load interpretation onto a new/isolated discordant or subclinical value without a repeat and confound exclusion (S7)
- interpret a likely non-thyroidal-illness or biotin/binding-affected value as a thyroid pattern (S6, S7)
- confuse the Free T4 factor (12.87) with the Free T3 factor, or read Free T4 against Total T4 ranges (S5)
- recommend treatments, medication changes, or doses (e.g. levothyroxine); produce a thyroid-disease-risk % (S9)
- invent certainty when TSH/context is unavailable — state the limitation and inherit confidence (S8)
- fail to route red flags (thyrotoxicosis; FT4 >5.0; central pattern; pregnancy) calmly and promptly (S10)
- present a BioSense band, range, optimal target, or matrix as a medical/diagnostic boundary (S11)
- average contested ranges/targets/assay-specific or pregnancy frameworks (S12)

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any thyroid condition is
SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes
  patterns, never names hypo/hyperthyroidism/Graves/thyroiditis/pituitary disease (S1). **[D][R7]**
- **TSH-paired honesty.** Free T4 is presented as a measured hormone whose meaning depends on TSH; matrix reads
  use TSH as the primary companion, else FT4-alone + inherited confidence; never used in isolation where TSH is
  available (S2, S3, CAV2, CAV3). **[D][B3]**
- **Unusual-pattern caution.** A high FT4 with a normal/high TSH is treated as unusual (interference/rare),
  investigated, not read as simple overactive (S6, CAV8). **[D][F10][F23]**
- **Ranked, not asserted.** Where several confounds/causes fit, they are ranked by evidence + context, never
  reduced to one (S4, CAV6). **[D][R3]**
- **Life-stage & assay aware.** Prefer the lab's own range; pregnancy trimester ranges; never non-pregnant bands
  in pregnancy (S5, CAV9, CAV10). **[D][F16][F18]**
- **Repeat-first + confound exclusion.** New discordant/subclinical → repeat with TSH after excluding illness/
  medication/binding/biotin (S7, CAV5). **[D][F17][F23]**
- **Calm red-flag routing.** Thyrotoxicosis (high FT4 + suppressed TSH; FT4 >5.0 = storm concern), central
  patterns, and pregnancy abnormalities → prompt, unhurried review; never emergency-diagnose (S10, CAV7). **[D][F22][F8]**
- **No treatment/medication guidance.** Levothyroxine/dose questions → educate + refer (S9). **[D]**
- **Missing markers/context stated, not invented.** (S8). **[D][R4]**
- **Correct unit handling.** ng/dL [pmol/L] via ×12.87 (not the FT3 factor; not Total T4 ranges); matrix
  requires TSH. **[D][F3][F4]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. An abnormal Free T4 is **persistent on repeat** (with TSH). **[F19]**
2. The **matrix is overt** — low FT4 + high TSH, or high FT4 + suppressed TSH. **[F7][F9]**
3. A **central pattern** — low FT4 + low/normal TSH — especially with symptoms. **[F8]**
4. **High FT4 + normal/high TSH** (unusual → interference/rare) that persists on re-check. **[F10]**
5. **FT4 >5.0 ng/dL** (thyroid-storm concern) or a **thyrotoxicosis** pattern. **[F22]**
6. **Pregnancy** with an abnormal Free T4, or on **thyroid-affecting medication**, or the user **asks a medical/
   medication question** (S9). **[F16][F20]**

All suggestions are wellness-framed, non-urgent (unless red flags), non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-018 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for Free T4 (ng/dL [pmol/L]) plus age,
  sex, pregnancy/trimester, and lab-reference-range metadata, and — as interpretation inputs — **TSH (SCL-017;
  the primary companion), future Free T3/thyroid antibodies, and metabolic context (glucose SCL-009/HbA1c
  SCL-002/lipids)**, plus declared context (acute illness, thyroid-affecting medications, binding abnormality,
  biotin). **[R4]**
- **Supplies (as CSL bindings):** the two-sided Free T4 bands with pregnancy/assay overlays (Category B), the
  **TSH×FT4 matrix** (from the FT4 side, mirroring SCL-017), the reused Context-First gate, the reused four-level
  confidence hierarchy **with inheritance**, the reused ranked multiple-explanations output, the reused
  cross-biomarker consumption (with graceful degradation to an FT4-alone read), the range/target/assay/pregnancy
  disagreement display, the repeat/trend behaviour, safety rules, context guidance, and narrative templates —
  each with value + source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, cross-biomarker intelligence, the
  confidence hierarchy, and the multiple-explanations output (all frozen from SCL-010); **confidence inheritance
  (SCL-016/017)** for the TSH×FT4 matrix; sex/age/pregnancy-aware banding (SCL-004/010/016/017); the guideline-
  disagreement posture (SCL-003/011/012); two-sided banding (SCL-004/009/010/011/012/016/017); and the
  diagnostic-adjacency discipline (SCL-002/009/011/012/016/017). **The TSH-paired interpretation is represented
  within cross-biomarker intelligence + inheritance — not as a new methodology.** **[C][R1][R4][R9]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (TSH is the primary companion, the
  matrix inherits confidence — never averaged into a single verdict; contested ranges/targets/assay/pregnancy
  frameworks never averaged; FT4 never used in isolation where TSH is available).
- **Uses the correct unit handling** (ng/dL [pmol/L] via ×12.87; not the FT3 factor; not Total T4) — a
  per-analyte configuration.
- **Score contribution:** Free T4 contributes to a **thyroid/metabolic-wellness** context as a sex/age/
  pregnancy/assay-aware, context-gated, TSH-paired input — the TSH×FT4 matrix (governed by inheritance) as the
  headline and Free T4 alone as a limited signal — with abnormal values expressed as ranked-confound context
  rather than a verdict; context-required/abstained values do not contribute a definite verdict. Any weighting
  is a Category [C] product decision. **[C]**

---

# 22. Medication & Exposure Context (educational only)

Educational context only; BioSense does not instruct on treatment, dose, or medication changes (S9). **[D]**
- **Levothyroxine (T4):** Free T4 is the direct measure of T4 replacement; check 6–8 weeks after a dose change
  and draw before the morning dose to avoid the post-absorption peak — key context, but any dose decision
  belongs to the prescriber. **[A][F20]**
- **Liothyronine / NDT (T3-containing):** Free T4 may run **lower** than expected because exogenous T3
  suppresses TSH before FT4 rises; FT3 and clinical response weigh more — interpreted as context. **[A][F21]**
- **Amiodarone / heparin:** can shift thyroid tests / Free T4 (assay and physiological effects) — relevant
  context. **[A][F10]**
- **Biotin & binding abnormalities:** high-dose biotin and FDH/binding variants distort FT4 → suggest
  re-testing (off biotin / assay-aware), never over-read. **[A][F23][F24]**
- Any medication or exposure question → educational context + suggestion to speak with a healthcare
  professional; BioSense never advises starting, stopping, or changing a medication or supplement. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Free T4 needs TSH. [E]** FT4 alone is only part of the picture; the matrix and confidence inheritance
   handle this. **[F6]**
2. **Assays are not standardised. [E]** Inter-method differences are significant; the lab's own range is
   preferred; ranges shown, never averaged. **[F18]**
3. **Thresholds/targets are contested. [E]** Standard range vs debated optimal (mid vs upper-half); shown, never
   averaged. **[F14]**
4. **Pregnancy shifts the range. [E]** Trimester-specific (narrower; higher T1); route. **[F16]**
5. **Free T4 is easily confounded. [E]** Non-thyroidal illness, medication, binding, biotin/heterophile; repeat
   with TSH mitigates. **[F17][F23]**
6. **Rare/interference patterns. [E]** High FT4 + normal/high TSH (TSH-secreting adenoma, hormone resistance,
   FDH, interference) is unusual and investigated, not verdicted. **[F10][F24]**
7. **Paired-marker availability is data-dependent. [E]** Without TSH, only an FT4-alone statement is possible;
   the matrix degrades to a confidence limitation, not certainty. **[R4][R9]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**; TSH-paired;
context-first; two-sided; pregnancy/assay overlays; ranked confounds; repeat with TSH). **[B]/[D]**
(Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL_REFERENCE (0.9–1.5 ng/dL ; normal TSH)
"Your Free T4 — the active thyroid hormone — is {value} ng/dL, a favourable range, and read with your TSH there's
 nothing here that stands out. It's a single snapshot, but this looks settled."  +CAV1 +CAV2

TEMPLATE: LOW_NORMAL_WATCH / UPPER_REFERENCE (0.8–<0.9 ; or >1.5–1.8)
"Your Free T4 is {value} ng/dL — within the standard range but toward the {low/upper} end. That's often just
 context — a recent illness, a medicine, pregnancy, or the particular assay — so it's read with your TSH and, if
 borderline, repeated."  +CAV1 +CAV2 +CAV10

TEMPLATE: LOW_FLAG / HIGH_FLAG (<0.8 ; or >1.8)
"Your Free T4 is {value} ng/dL — {below/above} the usual range. Because Free T4 means different things depending
 on your TSH, we read them together, and here are the more likely explanations for your context rather than one:
 {ranked A/B/C}. A repeat with TSH is often sensible."  +CAV1 +CAV2 +CAV3 +CAV5 +CAV6

TEMPLATE: OVERT_OR_CENTRAL (low FT4+high TSH ; high FT4+suppressed TSH ; low FT4+low/normal TSH — CALM ROUTING)
"Read across your Free T4 ({value}) and TSH, this pattern is worth a prompt, unhurried conversation with a
 healthcare professional, who can look at the fuller picture. The numbers alone don't diagnose anything."  +CAV1 +CAV2 +CAV7

TEMPLATE: UNUSUAL (high FT4 + normal/high TSH)
"This particular combination — a higher Free T4 with a TSH that isn't low — is unusual, and often reflects the
 test itself (for example a biotin supplement or an antibody quirk) rather than a thyroid problem, so it's worth
 re-checking before reading anything into it."  +CAV1 +CAV8

TEMPLATE: PREGNANCY
"In pregnancy, thyroid ranges differ by trimester and by lab, so this is best interpreted with trimester- and
 assay-specific ranges and a professional."  +CAV1 +CAV9

MODIFIER: TSH_MATRIX (TSH present) →
 "With your TSH, the pattern reads as {primary underactive | central | overt overactive | subclinical | unusual}
  context — a hint, not a diagnosis, read with your wider picture."  +CAV2

MODIFIER: FT4_ALONE (no TSH) →
 "Free T4 is best read with TSH — on its own it's only part of the picture, so we'd interpret this more
  confidently with your TSH."  +CAV3

MODIFIER: RANKED_CONFOUNDS (abnormal, ≥2 causes) →
 "Possible explanations, most-to-least likely for your context: A {…}, B {…}, C {…} — best confirmed with a professional."  +CAV6

MODIFIER: ASSAY_OVERLAY → "Free T4 tests aren't fully standardised, so we compare against your own lab's range."  +CAV10
```

**Absolute rules:** no template diagnoses a thyroid condition, asserts a single cause, emits a matrix read
without TSH, uses Free T4 in isolation where TSH is available, reads a high FT4 + normal/high TSH as simple
overactive, treats a band/range/target/matrix as a diagnostic boundary, applies non-pregnant bands in pregnancy,
alarms, or averages ranges/targets/frameworks. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, with TSH. [illustrative]**
```
Input: FT4 1.2 ng/dL, TSH normal, age 40, not pregnant.
Band: OPTIMAL_REFERENCE | Matrix: euthyroid screen | Confidence: STANDARD
Narrative: OPTIMAL +CAV1+CAV2.  [F2,F6]
```

**Example 2 — Low FT4 + high TSH (primary-underactive pattern). [illustrative]**
```
Input: FT4 0.6 ng/dL, TSH 12 mIU/L, age 50.
Band: LOW_FLAG | Matrix: primary underactive pattern | Confidence: STANDARD
Narrative: calm prompt review +CAV7 ; ranked ; NO "hypothyroidism/Hashimoto".  [F7,S10]
```

**Example 3 — Low FT4 + normal TSH (central pattern). [illustrative]**
```
Input: FT4 0.6 ng/dL, TSH 1.5 mIU/L (normal), symptoms.
Band: LOW_FLAG | Matrix: central pattern (TSH alone misses) | Confidence: STANDARD→route
Narrative: OVERT_OR_CENTRAL +CAV7 ; FT4 essential here ; NO "pituitary disease".  [F8,F27,S10]
```

**Example 4 — High FT4 + normal TSH (unusual/interference). [illustrative]**
```
Input: FT4 2.4 ng/dL, TSH normal, on high-dose biotin.
Band: HIGH_FLAG | Matrix: UNUSUAL (interference/rare) | Confidence: CONTEXT_REQUIRED
Narrative: UNUSUAL template +CAV8 ; re-check off biotin ; NOT simple overactive ; NO "Graves".  [F10,F23,S6]
```

**Example 5 — High FT4 + suppressed TSH, very high. [illustrative]**
```
Input: FT4 5.6 ng/dL, TSH <0.01 mIU/L.
Band: HIGH_FLAG | Matrix: overt overactive pattern (storm concern >5.0) | Confidence: STANDARD
Narrative: calm prompt review +CAV7 (storm-range context) ; NO "thyrotoxicosis/Graves" diagnosis.  [F9,F22,S10]
```

**Example 6 — FT4 without TSH. [illustrative]**
```
Input: FT4 0.85 ng/dL, TSH not available.
Band: LOW_NORMAL_WATCH | Matrix: NOT computable (no TSH) | Confidence: CONTEXT_REQUIRED
Narrative: FT4_ALONE +CAV3 ; name TSH completes picture ; +CAV10 (assay) ; NO diagnosis.  [F6,R9,S3]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-017 (TSH)** — the primary companion; Free T4 is interpreted via the **TSH×FT4 matrix**, mirroring
  SCL-017's grid from the FT4 side, and the combination confidence inherits the lower input. **Free T4 is never
  used in isolation where TSH is available.**
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, cross-biomarker
  intelligence, four-level confidence hierarchy, and multiple-explanations output.
- **SCL-016 (Creatinine + eGFR) / SCL-017 (TSH)** — source of the reused **confidence inheritance** principle
  applied to the TSH×FT4 matrix.
- **SCL-004 (HDL-C) / SCL-010 / SCL-016 / SCL-017** — precedent for the reused sex/age/pregnancy-aware banding.
- **SCL-011 (Vitamin D) / SCL-012 (B12)** — precedent for guideline-disagreement / multi-framework display
  (here: standard range vs optimal target; assay-specific; pregnancy).
- **Future Free T3, thyroid antibodies** — companion thyroid markers Free T4 consumes; where unavailable, a
  confidence limitation is recorded.
- **SCL-009 (Fasting Glucose) / SCL-002 (HbA1c)** — metabolic context; and source of the reused diagnostic-
  adjacency discipline.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the F-series IDs in §0 and
> the body. Developers finalising the pack should confirm exact page/table locators against the primary sources
> where required.

**Definition, ranges, units, free-vs-total (Category A anchors)**

1. **HealthRX.com (Free T4: what it measures / when to order).** — *FT4 = unbound active fraction (~0.02–0.03%
   of total T4); standard adult 0.8–1.8 ng/dL (10–23 pmol/L); paired with TSH = standard initial panel (ATA);
   preferred over total T4 (binding-protein independent); LT4 monitoring 6–8 wk / pre-dose; T3-therapy FT4 runs
   low; high FT4 + suppressed TSH = hyperthyroid pattern; high FT4 + normal TSH = interference/rare; FT4 >5.0 =
   storm concern; Graves' often >2.5 (F1, F2, F5, F6, F9, F10, F20, F21, F22, F23).*
2. **Superpower (Free T4 guide) & LabResult.MD (Free T4 levels).** — *0.8–1.8 ng/dL (10–23 pmol/L); lab-
   dependent; trends > single measurements; pregnancy trimester-specific (narrower); low FT4 + high TSH =
   primary hypothyroid hallmark (F2, F16, F19).*
3. **convertmedunits (Free T4 unit calculator).** — *pmol/L = ng/dL × 12.87 (÷12.87 reverse); 1.2 ng/dL ≈ 15.4
   pmol/L; 15 pmol/L ≈ 1.17 ng/dL; do NOT use FT3 factor; do NOT mix FT4 and Total T4 ranges/units (F3, F4).*
4. **Lamkin Clinic (Free T4 optimal levels).** — *upper-half "optimal" (debated); free-vs-total; low FT4 + high
   TSH = primary; low FT4 + normal/low TSH = secondary/central; sick-euthyroid lowers FT4; pregnancy needs +25–
   50% hormone; use lab-specific range (F5, F7, F8, F14, F16, F17).*

**TSH × FT4 matrix, central pattern, interference, targets (Category A)**

5. **PMC8195777 (low FT4 & normal TSH, children) & PMC4686635 (FTI in central hypothyroidism) & PMC9155938
   (central case).** — *central hypothyroidism/rare defects: TSH usually normal (can be low/normal/slightly
   high), FT4 essential; low FT4 + low/normal TSH; FT4 low-normal can still be central (F8, F27).*
6. **Pathology Outlines (Thyroid function panel).** — *matrix differentials: normal FT4 + high TSH = subclinical
   hypo (NTI recovery, TSH resistance, heterophile/macroTSH, poor LT4 absorption); normal FT4 + low TSH =
   subclinical hyper (recent treatment, interference, steroid/dopamine); high FT4 + normal/high TSH = FDH, TSH-
   secreting adenoma, hormone resistance, interference, amiodarone/heparin (F10, F11, F12, F24).*
7. **PMC8931280 (BLSA; FT4 distinguishes SCH from aging changes).** — *in isolated high TSH, FT4 <0.89 ng/dL
   (~11.45 pmol/L; 24th pct) predicts emerging hypothyroid phenotype (F13).*
8. **PMC6910984 (FT4 reference intervals for children on thyroxine; assay-specific) & PMC12520876 (validated
   FT4 12–22 pmol/L population).** — *significant inter-method FT4 differences → assay-specific target ranges
   required until standardisation; optimal target debated (middle vs upper half); log-linear TSH↔FT4; range
   varies by population/assay (F14, F15, F18, F25, F26).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–8; they are BioSense
> Version 1 classifications, two-sided and context-gated with pregnancy/assay overlays, not attributable to any
> single reference as a diagnostic threshold, and **do not restate diagnostic labels.** Reference ranges, the
> optimal target, and the assay-specific and pregnancy frameworks are shown separately and **never averaged**;
> Free T4 is presented as a measured hormone read with TSH (never in isolation where TSH is available), never a
> thyroid diagnosis; the TSH×FT4 matrix is a pattern hint whose confidence inherits the lower input, never a
> standalone verdict.

---

# 28. Founder Decisions Required

The Free T4 methodology reuses frozen BioSense frameworks and represents Free T4 via the existing Context-First,
cross-biomarker (TSH-paired), confidence-inheritance, and guideline-disagreement frameworks. Two optional
presentation/policy items remain: **[C][E]**

**D-1 — Confirm the two-sided band structure and the debated-optimal/assay presentation.** SCL-018 uses the
standard adult range (0.8–1.8 ng/dL / 10–23 pmol/L) with a low-normal watch at the lowest quartile and the
debated ~upper-half (1.0–1.5) "optimal" zone shown as a reference band (not a cutoff), and **prefers the
reporting lab's own range** because FT4 assays are not standardised. Confirmation requested that this two-sided,
assay-aware presentation (with the optimal zone shown but not treated as a target, and lab-range preference) is
the intended default. **Founder sign-off requested.**

**D-2 — Confirm the TSH-pairing activation and the completed thyroid pair.** SCL-018 emits a **matrix read using
TSH (SCL-017) as the primary companion** (else an FT4-alone screen-level statement with inherited/limited
confidence), completing the TSH ⇄ Free T4 thyroid pair from both sides (SCL-017 built the grid from the TSH
side; SCL-018 mirrors it from the FT4 side). **Founder decision requested** on whether V1 activates the full
TSH×FT4 matrix now that both markers exist (with graceful degradation where either is missing), and whether
pregnancy is handled by routing with trimester/assay-specific ranges as specified.

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-018 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/reference
figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was fabricated; every
Category [A] number was retrieved and verified during authoring and traces to §27. Free T4 reuses frozen
BioSense methodology throughout — the Context-First Interpretation Framework, cross-biomarker intelligence, the
four-level confidence hierarchy, and the multiple-explanations output (all from SCL-010), confidence inheritance
(SCL-016/017, for the TSH×FT4 matrix), sex/age/pregnancy-aware banding (SCL-004/010/016/017), the guideline-
disagreement posture (SCL-003/011/012), two-sided banding with flags (SCL-004/009/010/011/012/016/017), and the
diagnostic-adjacency discipline (SCL-002/009/011/012/016/017) — introducing only Free T4-specific scientific
content (the thresholds and their two-sided structure; the SI factor ×12.87 and the free-vs-total distinction;
the TSH×FT4 matrix from the FT4 side; the pregnancy and assay overlays; the optimal-target and assay-
standardisation disagreements; the non-thyroidal-illness, medication, binding-abnormality, and biotin/
heterophile confounds; and the trend/repeat behaviour). Free T4 is represented as the measured companion hormone
to TSH — interpreted via the TSH×FT4 matrix, never in isolation where TSH is available, and never a diagnosis of
thyroid disease. No new methodology was required; all structure remains consistent with SCL-001 through
SCL-017.*
