# SCL-017 — THYROID STIMULATING HORMONE (TSH)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. TSH is a two-sided, context-first marker interpreted alongside Free T4 (SCL-018) via the existing Cross-Biomarker Intelligence, Confidence Hierarchy, Confidence Inheritance, and Guideline-Disagreement frameworks. Never a diagnosis of thyroid disease. No new methodology introduced.*

**Document ID:** SCL-017
**Biomarker:** Thyroid Stimulating Hormone (TSH, thyrotropin) — pituitary hormone; two-sided; FT4-paired
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 1 August 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. TSH reuses the frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), cross-biomarker intelligence (SCL-010), the four-level confidence hierarchy (SCL-010), **confidence inheritance** (SCL-007/016), multiple-explanations output (SCL-010), two-sided banding (SCL-004/009/010/011/012/016), sex/age/pregnancy-aware banding (SCL-004/010/016), guideline-disagreement handling (SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/016) — introducing only TSH-specific scientific content. All sections remain consistent with SCL-001 through SCL-016.

---

> **What this document is.** SCL-017 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for TSH. It reuses existing BioSense
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

## STRUCTURAL-FIT NOTE (TSH vs SCL-001) — reuses frozen frameworks; no new pattern

TSH presents the same structural characteristics BioSense has already solved for, and maps onto the frozen
methodology without extension. TSH is the pituitary's feedback signal about thyroid hormone, so its meaning is
**inseparable from Free T4** and from biological context — it therefore reuses the Cross-Biomarker Intelligence
and Context-First frameworks:

1. **FT4-paired interpretation — reused cross-biomarker intelligence (SCL-010) + multiple-explanations
   (SCL-010).** TSH screens thyroid status, but the meaningful wellness read comes from the **TSH × Free T4
   combination** — subclinical vs overt, primary vs central — which is exactly a consume-FT4-and-rank-the-
   interpretation pattern (§0.5, §9). TSH alone is a screen; FT4 (SCL-018) completes it.
2. **Confidence inheritance — reused (SCL-007/016).** The TSH×FT4 combination verdict **inherits the lower
   confidence** of its inputs; if FT4 is unavailable, the combination read is confidence-limited, not asserted
   (§0.6, §13).
3. **Context-First — reused (SCL-010).** TSH is interpreted only after context — age, sex, pregnancy/trimester,
   acute (non-thyroidal) illness, thyroid-affecting medications, iodine status where supported, and future
   thyroid biomarkers — evaluated **before** banding (§0.2, §8, §12).
4. **Two-sided banding with flags — reused.** TSH is meaningfully two-sided: **high** (an underactive-direction
   pattern) and **low** (an overactive-direction pattern), the low end graded (0.1–0.4 vs <0.1) (§11).
5. **Sex/age/pregnancy-aware banding — reused (SCL-004/010/016).** TSH drifts **higher with age** and shifts
   **lower in pregnancy** (trimester-specific), so banding carries age and pregnancy overlays (§11).
6. **Guideline-disagreement handling — reused (SCL-003/011/012).** The standard range vs the debated "optimal"
   target, and the **pregnancy ATA 2011 vs 2017** change, and age-specific elderly ranges, are presented as
   distinct frameworks, **never averaged** (§10, §11).
7. **Multiple-explanations output — reused (SCL-010).** An abnormal TSH gets **ranked possibilities**
   (non-thyroidal illness, medication/iodine/biotin, transient thyroiditis, a genuine thyroid-axis shift) —
   never a single certain cause (§11, §14).
8. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012/016).** BioSense never emits
   "hypothyroidism," "hyperthyroidism," "Graves' disease," "Hashimoto's," or "thyrotoxicosis" as a diagnosis;
   it detects the pattern, routes, and names nothing (§18, §19).

**Biomarker-specific content introduced:** the TSH thresholds and their two-sided/graded structure; the
TSH×FT4 combination grid; the age and pregnancy overlays; the ATA 2011→2017 pregnancy disagreement; the
non-thyroidal-illness, medication, iodine, and biotin confounds; and the repeat/persistence behaviour. **No
new methodology is required.** **[C]**

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

TSH is best understood as **the pituitary's feedback signal about thyroid hormone**, not a thyroid diagnosis.
When thyroid hormone runs low, the pituitary raises TSH to push the thyroid harder; when thyroid hormone runs
high, it lowers TSH. Because that feedback is amplified — a small change in Free T4 produces a larger change in
TSH — TSH is a sensitive early screen, **but it is only half the picture**. The same TSH means different things
depending on **Free T4**: a high TSH with normal FT4 reads very differently from a high TSH with low FT4, and a
low TSH with high FT4 differently again. So BioSense always reads TSH **with Free T4** (the TSH × FT4
combination), begins with biological context — **age, pregnancy, acute illness, and medications all move TSH** —
grades the two directions gently, ranks the plausible explanations for an abnormal value rather than asserting
one, shows where guidelines genuinely differ (including the change in pregnancy guidance between 2011 and 2017)
rather than splitting them, and names no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as the
evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate TSH. Every value carries a source ID (H-series / R-series → §27) and a
> category tag. Canonical unit: mIU/L (≡ µIU/mL ≡ mU/L; no conversion factor). **Two-sided, FT4-paired,
> context-first, sex/age/pregnancy-aware; combination verdict inherits lower input confidence; NEVER a thyroid
> diagnosis.**

## 0.1 Canonical units — [A]
```
canonical_unit: mIU/L  (≡ µIU/mL ≡ mU/L; numerically equivalent)   # NO analyte conversion factor — do NOT apply 38.67/88.57/88.4/18.0/2.496/0.738/2.266 [H29]
Always retain value + unit + age + sex + pregnancy/trimester + available context + paired FT4 (if any). Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  paired hormone (CENTRAL): Free T4 (SCL-018) — and where available FT3 / TPO-antibodies (future);           [H5,H8]
  life-stage: age (TSH drifts HIGHER with age), pregnancy + trimester (TSH shifts LOWER; ranges differ);     [H15,H18]
  acute state: non-thyroidal (sick-euthyroid) illness — acute/chronic illness disrupts TFTs → defer/repeat;  [H22]
  medications: levothyroxine/liothyronine (over-replacement suppresses TSH), lithium & amiodarone (hypo; amiodarone also hyper), excess iodine/contrast; [H23]
  assay: high-dose biotin supplements interfere with immunoassays → spurious TSH/FT4 (hold biotin);          [H28]
  iodine status where supported; future thyroid biomarkers.                                                   [H23]
CORE RULE (founder context): TSH is the pituitary feedback signal, NOT a thyroid diagnosis; its meaning depends on Free T4 → interpret the TSH×FT4 COMBINATION. [H1,H5][B2]
  → TSH alone = screen; subclinical vs overt, primary vs central require FT4.                                  [H5,H10]
  → where several explanations fit an abnormal TSH, RANK them (§0.5); never assert one.
IF material context changes meaning → interpret WITHIN that context.                                          [R1]
IF FT4 / key context unavailable → CONFIDENCE LIMITATION (combination confidence limited), not certainty.     [R4,R9]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors) — TWO-SIDED
```
TSH_WELLNESS_BAND (mIU/L, general non-pregnant adult; after context gate; ALWAYS read with FT4):   [H3,H11]
  SUPPRESSED_LOW_FLAG     v < 0.1                 # low-direction, more marked (Grade II low-TSH); read with FT4 [H11]
  LOW_WATCH               0.1 <= v < 0.4          # low-direction, mild (Grade I low-TSH); read with FT4 [H11]
  OPTIMAL_REFERENCE       0.4 <= v <= 2.5         # within reference; ~1.0–2.5 is a commonly-cited (debated) optimal zone [H3,H4]
  UPPER_REFERENCE         > 2.5 <= 4.0            # still within standard reference (0.4–4.0); upper part, watch with context [H3,H4]
  ABOVE_REFERENCE_WATCH   > 4.0 <= 10.0           # above standard reference; high-direction (with normal FT4 = subclinical-hypo pattern) [H3,H6,H14]
  HIGH_FLAG               v > 10.0                # markedly above reference; high-direction, stronger [H14]
DIRECTION: TWO-SIDED (high = underactive-direction pattern; low = overactive-direction pattern). Meaning is set by FT4 (§0.5). [R6]
AGE OVERLAY: in older adults the upper reference drifts higher (97.5th pct ~5.5 at 65–70, ~5.9 at 71–80, ~6.7 at >80) → avoid over-flagging elderly. [H15,H17]
PREGNANCY OVERLAY: use trimester/population-specific ranges (§0.4); do NOT apply the non-pregnant bands. [H18-H21]
UNIT: mIU/L. FT4 REQUIRED to move from screen to interpretation; if FT4 absent → screen-level read + reduced combination confidence. [H5][R9]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; FT4-paired; never a diagnostic label. [B][D]**

## 0.4 Pregnancy & age overlays (guideline-disagreement, never averaged) — [A]/[B]
```
PREGNANCY (trimester-specific; hCG lowers TSH):   [H18-H21]
  Typical ranges: T1 ~0.1–2.5 | T2 ~0.2–3.0 | T3 ~0.3–3.0 mIU/L (illustrative). [H18]
  GUIDELINE DISAGREEMENT (represent BOTH, NEVER average):
    ATA 2011: trimester-specific upper limits T1 2.5, T2/T3 3.0 mIU/L → later found to OVERDIAGNOSE. [H19]
    ATA 2017: prefer population/trimester-specific ranges; if unavailable, use ~4.0 mIU/L upper limit in early pregnancy. [H20]
  Population-measured ranges vary (e.g. Nanjing T1 0.02–3.78; T2 0.47–3.89; T3 0.55–4.91). [H21]
  → In pregnancy, prefer population/trimester-specific ranges; show the 2011↔2017 difference; route (thyroid function in pregnancy is a professional matter). [D]
AGE (non-pregnant): elderly upper reference drifts higher (to ~6.0–6.7); using the non-age-specific range over-flags older adults. [H15,H16,H17]
```

## 0.5 TSH × Free T4 combination grid — [A]+[C] — REUSED cross-biomarker (SCL-010) + inheritance (SCL-016)
```
COMBINATION INTERPRETATION (pattern hints, NOT diagnoses; require FT4 from SCL-018; confidence inherits lower input): [R4,R9]
  HIGH TSH  + NORMAL FT4  → subclinical-hypothyroid PATTERN (repeat 2–3 months; TPO-Ab context future). [H6,H24]
  HIGH TSH  + LOW FT4     → primary underactive-thyroid PATTERN (overt). [H7]
  LOW TSH   + NORMAL FT4  → subclinical-hyperthyroid PATTERN (consider FT3 for T3-toxicosis; grade by <0.1 vs 0.1–0.4). [H8,H11]
  LOW TSH   + HIGH FT4    → overt overactive-thyroid PATTERN (thyrotoxicosis; higher-risk context — AF/osteoporosis). [H9,H26]
  LOW/NORMAL TSH + LOW FT4 → central (pituitary/hypothalamic) PATTERN — TSH-only screening MISSES this; FT4 essential. [H10]
  NORMAL TSH + NORMAL FT4 → euthyroid screen (no pattern). [H30]
GOVERNANCE: emit a combination read ONLY with FT4; else screen-level + confidence limitation. NEVER a diagnosis; RANK confounds first (§0.2). [R7,R9]
NOTE: acute illness / medications / biotin can produce ANY discordant pattern → exclude before interpreting (defer/repeat). [H22,H23,H28]
```

## 0.6 Confidence hierarchy (four-level) + inheritance — [C] — REUSED (SCL-010 + SCL-016)
```
STANDARD          : clear TSH AND FT4 available AND life-stage known (age/pregnancy) AND no acute-illness/biotin/med confound.
REDUCED           : single value / near a boundary / age or trimester overlay uncertain / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : abnormal TSH with NO FT4 (no combination) OR unexcluded confound (acute illness/medication/biotin) → screen-level + request FT4/repeat; name what's needed. [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / pregnancy needing professional ranges / likely non-thyroidal illness — explained abstention. [R2,H22]
INHERITANCE: the TSH×FT4 combination verdict inherits the LOWER confidence of TSH and FT4; FT4 absent → combination limited to a screen-level statement. [R9]
Reduced confidence does NOT auto-block; significant uncertainty MAY justify abstention. New subclinical pattern → prefer REPEAT (2–3 months). [H24]
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  TSH is NOT a diagnosis. NEVER emit "hypothyroidism", "hyperthyroidism", "Graves' disease", "Hashimoto's", "thyroiditis", "thyrotoxicosis", or any condition as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  TSH is the pituitary feedback signal; its meaning depends on Free T4 → interpret the TSH×FT4 COMBINATION, never TSH in isolation beyond a screen. [B2][H5]
S3  Emit a combination read ONLY with FT4 (SCL-018); else screen-level + confidence limitation (inheritance). [R9]
S4  On abnormal TSH with ≥2 plausible causes → RANKED possibilities (non-thyroidal illness, medication/iodine/biotin, transient thyroiditis, genuine axis shift); NEVER assert one. [R3]
S5  Life-stage aware: apply AGE overlay (elderly higher) and PREGNANCY trimester ranges; never apply non-pregnant bands in pregnancy. [H15,H18]
S6  New/isolated subclinical pattern → suggest REPEAT (2–3 months); exclude non-thyroidal illness, medication/iodine, and biotin first. [H22,H24,H28]
S7  Pregnancy: prefer population/trimester-specific ranges; show ATA 2011 vs 2017; route (professional matter). [H20][D]
S8  Cross-markers (FT4/FT3/TPO-Ab) unavailable → confidence limitation, not invented certainty. [R4]
S9  Never recommend treatments/medication changes/doses (e.g. levothyroxine); never produce a numeric thyroid-disease-risk %; medication questions → educate + refer. [D]
S10 RED FLAGS (very suppressed TSH + high FT4 = thyrotoxicosis pattern, AF/osteoporosis risk; markedly high TSH + low FT4; pregnancy with abnormal TSH; symptomatic + low FT4 central pattern) → calm prompt healthcare review; never emergency-diagnose. [H26,H10][D]
S11 Never present a BioSense band, reference range, optimal target, or combination pattern as a medical/diagnostic boundary.
S12 Represent reference-range, optimal-target, and pregnancy (2011 vs 2017) and age-specific disagreement; NEVER average thresholds. [H4,H19,H20][R5]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & PAIRED MARKER (the key TSH move): ALWAYS read with Free T4 (SCL-018); and where relevant FT3 / TPO-Ab (future); apply age & pregnancy overlays; exclude non-thyroidal illness / medication / iodine / biotin; for a NEW subclinical pattern, REPEAT (2–3 months). [H5,H22,H24]
Tier 2 LIFESTYLE (context-appropriate): general thyroid-friendly wellness (balanced iodine/selenium via diet, sleep, stress) — framed as education, not treatment; note age-related upward TSH drift is normal. [H15,H23]
Tier 3 HEALTHCARE DISCUSSION (calm) when: persistent abnormal TSH on repeat | high TSH + low FT4 or low TSH + high FT4 (overt patterns) | very suppressed TSH (<0.1) | pregnancy with abnormal TSH | symptomatic with a central pattern | on thyroid-affecting medication. [H7,H9,H10,H26][D]
NEVER a specific treatment, medication change, or dose at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → life-stage overlay (age/pregnancy) → TSH band + FT4 combination (if FT4) → template; RANKED confounds where abnormal; ALWAYS "read with Free T4".
OPTIMAL_REFERENCE (+ normal FT4) → affirming, with the "screen + read with FT4" caveat.
UPPER_REFERENCE / LOW_WATCH → calm; within/near reference; context (age/pregnancy/illness/meds); repeat if borderline.
ABOVE_REFERENCE_WATCH / SUPPRESSED_LOW_FLAG / HIGH_FLAG → constructive; FT4 combination; ranked confounds; repeat (2–3 months); ALWAYS "not a diagnosis".
overt patterns (high TSH+low FT4; low TSH+high FT4) or central pattern → calm prompt healthcare review; never alarm, never diagnose.
pregnancy → trimester/population ranges + ATA 2011 vs 2017; route.
FT4 unavailable → screen-level statement + confidence limitation; name that FT4 completes the picture.
Never "normal/abnormal" as a verdict; never a diagnosis (hypo/hyperthyroidism/Graves/Hashimoto/thyrotoxicosis).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "TSH is the pituitary's signal to the thyroid, so it's read together with Free T4 — the same TSH can mean
      different things depending on your thyroid hormone level — and alongside your wider context."
CAV3 (screen/no FT4) "TSH on its own is a screen. Free T4 is what turns a TSH result into a fuller picture, so
      we'd interpret this more confidently with Free T4 (and, where relevant, thyroid antibodies)."
CAV4 (reduced/context) name the context reducer(s) or missing marker (Free T4, age, trimester, illness, medication, biotin).
CAV5 (new/subclinical, borderline) "TSH varies over time and around a personal set-point, and illness, some
      medicines, or a biotin supplement can nudge it — so a single mildly out-of-range value is usually best
      repeated in a couple of months before reading much into it."
CAV6 (abnormal, ranked) "Because several things affect TSH, we've noted the more likely explanations given your
      context rather than pointing to one — best confirmed with a professional."
CAV7 (overt/central/very-suppressed or red flags) "This pattern is worth a prompt, unhurried conversation with a
      healthcare professional."
CAV8 (age overlay) "TSH tends to sit a little higher with age, so an older adult's 'normal' upper limit is
      higher than a younger adult's — we take that into account."
CAV9 (pregnancy) "In pregnancy, thyroid ranges differ by trimester and guidance has changed over the years,
      so pregnancy results are best interpreted with population/trimester-specific ranges and a professional."
```

## 0.11 Source & version identifiers
```
config_id: SCL-017   config_version: 1.0
band_id: BIOSENSE_TSH_TWOSIDED_BANDS_v1                  (Category B; two-sided; anchors H3,H4,H11,H14)
age_overlay_id: SCL017_TSH_AGE_OVERLAY_v1               (elderly upper drift; H15-H17)
pregnancy_overlay_id: SCL017_TSH_PREGNANCY_v1           (trimester ranges + ATA 2011 vs 2017; H18-H21; never averaged)
ft4_combination_id: SCL017_TSH_FT4_GRID_v1              (cross-biomarker + multiple-explanations; parents TSH+FT4/SCL-018; R4; H5-H10)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1   (reused; R2)
confidence_inheritance_ref: SCL016_CONFIDENCE_INHERITANCE_v1 (reused; R9 — combination inherits lower input confidence)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1   (reused; R3 — ranked confounds/causes)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1     (reused; R4 — FT4/FT3/TPO-Ab/future)
sex_age_aware_ref: SCL004_SEX_AWARE_BANDS / SCL016 age posture (reused; R8)
guideline_disagreement_ref: SCL011/012 posture           (reused; R5 — adult range/optimal target/pregnancy 2011 vs 2017/age-specific)
safety_rules_id: SCL017_SAFETY_v1                        (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Thyroid stimulating hormone (TSH, thyrotropin) is made by the anterior pituitary and tells the thyroid how much
thyroid hormone (T4 and T3) to produce; a negative-feedback loop keeps the system balanced. **[A][H1]** The
defining feature for interpretation is that the loop is **amplified**: <cite index="6-1">a subtle decrease in free T4 levels can result in a greater rise in the corresponding TSH values</cite>, which makes TSH a sensitive early screen — but also means TSH must be read **with** Free T4 to know what it signifies. **[A][H2]**

That pairing is the heart of TSH interpretation. <cite index="16-1">While testing TSH alone is sufficient for general screening, both FT4 and TSH assays are needed for diagnosing subclinical thyroid dysfunction, central hypothyroidism, drug effects, and hospitalized patients, as well for accurate assessment of treatment effects.</cite> **[A][H5]** A high TSH with **normal** Free T4 reads as an underactive-direction *subclinical* pattern; a high TSH with **low** FT4 as an overt one; a low TSH with **high** FT4 as an overactive (thyrotoxic) pattern; and a low-or-normal TSH with **low** FT4 as a *central* pattern that TSH-only testing would miss. **[A][H6-H10]**

TSH is also strongly **context-dependent**: it drifts higher with age, shifts lower in pregnancy, and is
disturbed by acute illness, several medications, iodine, and even biotin supplements. So BioSense reads TSH
**with Free T4**, in context, and names no condition. **[B][B2]**

- **Reported in:** mIU/L (≡ µIU/mL ≡ mU/L). No conversion factor. **[A][H29]**
- **Nature:** pituitary feedback hormone; **two-sided**; **FT4-paired**; **not a thyroid diagnosis** **[A][B2]**
- **Direction:** two-sided (high = underactive-direction; low = overactive-direction) **[A][R6]**
- **Paired marker:** Free T4 (SCL-018); FT3/TPO-Ab (future) **[A][H5]**
- **BioSense role:** a context-first, FT4-paired thyroid-wellness screen with age and pregnancy overlays.

---

# 2. Physiological Function

The hypothalamic–pituitary–thyroid axis works by feedback: the hypothalamus releases TRH, the pituitary
releases **TSH**, and TSH drives the thyroid to secrete T4 (and some T3). Circulating thyroid hormone then
feeds back to suppress TRH and TSH. **[A]** Because the pituitary is exquisitely sensitive to Free T4, TSH
moves **inversely and log-linearly** with it — small dips or rises in FT4 cause proportionally larger swings
in TSH. **[A][H2]**

Two features define interpretation **[A]**:
- **TSH is a signal, not the hormone.** It reflects how hard the pituitary is pushing the thyroid; the actual
  thyroid-hormone status is read from **Free T4** (and FT3). So TSH is interpreted **with** FT4. **[A][H5]**
- **The axis is context-sensitive.** Age raises the TSH set-point; pregnancy (via hCG) lowers it; acute
  illness, dopamine/steroids, levothyroxine, lithium, amiodarone, iodine, and biotin all perturb it — so
  context is evaluated before meaning is assigned. **[A][H15][H18][H22][H23]**

---

# 3. Scientific Background

Three scientific themes shape how BioSense represents TSH. **[A]**

**First, TSH means little without Free T4.** The clinically meaningful states are **combinations**: high TSH +
normal FT4 (subclinical hypo), high TSH + low FT4 (overt hypo), low TSH + normal FT4 (subclinical hyper), low
TSH + high FT4 (overt hyper/thyrotoxicosis), and low-or-normal TSH + low FT4 (central). <cite index="13-1">Inappropriately normal TSH with low free T4 is most consistent with hypothalamic dysfunction while low TSH with low free T4 is rare and suggests a primary pituitary abnormality.</cite> This is why BioSense treats the **TSH × FT4 grid** as the unit of interpretation. **[A][H6-H10]**

**Second, the thresholds are genuinely contested.** The standard adult range is ~0.4–4.0 mIU/L, yet some
advocate a narrower "optimal" ~1.0–2.5; in pregnancy the ATA **changed its guidance** — <cite index="8-1">in 2011 the American Thyroid Association recommended trimester-specific upper reference limits for TSH (first trimester, 2.5 mIU/L; second and third trimester 3.0 mIU/L)</cite>, but <cite index="8-1">in 2017 the ATA encouraged using TSH reference ranges obtained for the pregnant local population, and proposed that when these are not available, 4 mIU/L be used as a TSH upper reference limit in early pregnancy</cite>. And TSH rises with age: elderly 97.5th-percentile limits reach ~5.5–6.7 mIU/L. BioSense **presents these frameworks side by side and never averages them.** **[A][H3][H4][H15][H19][H20]**

**Third, TSH is easily confounded and best repeated.** Non-thyroidal (sick-euthyroid) illness, several
medications, iodine, and biotin can produce misleading values; a subclinical abnormality is <cite index="17-1">usually repeated in 2–3 months to rule out a transient abnormality</cite> before it means anything. TSH also has a **narrow individual set-point**, so the population range overstates within-person variation. **[A][H22][H24][H25]**

**The wellness reading — [B]:** TSH is a context-first, FT4-paired, two-sided thyroid-wellness screen — read
with Free T4, with age and pregnancy overlays, plausible confounds ranked rather than one asserted, guideline
disagreement shown honestly, subclinical patterns repeated before they count, and no condition named.

**An honest boundary — [E]:** thresholds are contested, ranges shift with age and pregnancy, and many
transient factors move TSH — so BioSense leans on FT4 and context and is explicit about confidence. **[E][H4][H22]**

---

# 4. Why TSH Matters

**1. It's the best first-line thyroid screen. [A][H30]** TSH is the recommended initial test for thyroid
dysfunction, sensitive to small shifts in thyroid hormone. **[A]**

**2. Paired with FT4, it separates subclinical from overt, primary from central. [A][H5]** The combination
grid is what gives TSH its wellness value — and what stops a bare number from being over-read. **[A]**

**3. Interpreted in context, it avoids over-flagging. [A][H15]** Age and pregnancy overlays, and the
confound/repeat discipline, prevent mislabelling normal physiology or transient states as problems. **[A]**

**Why BioSense measures it — [C]:** TSH is a high-value, modifiable-context, paired screen whose meaning is
combination- and context-dependent — the ideal case for Context-First interpretation, cross-biomarker (FT4)
intelligence, confidence inheritance, age/pregnancy-aware banding, ranked explanations, and guideline-
disagreement handling, all while never diagnosing thyroid disease.

---

# 5. Laboratory Measurement

TSH is measured on a serum immunoassay, reported in **mIU/L (≡ µIU/mL ≡ mU/L)**. **[A][H29]**

- **No unit conversion factor.** The units are numerically equivalent; no lipid/glucose/vitamin/creatinine
  factor applies. **[A][H29]**
- **Paired with Free T4.** TSH is a screen; FT4 (SCL-018) is needed for subclinical/central/drug/monitoring
  interpretation, so BioSense reads them together. **[A][H5]**
- **Life-stage matters.** Age raises the reference upper limit; pregnancy lowers TSH and uses trimester/
  population-specific ranges. **[A][H15][H18]**
- **Assay interference.** High-dose **biotin** supplements can distort immunoassay TSH (and FT4) — held before
  testing. **[A][H28]**
- **Confounds.** Non-thyroidal (sick-euthyroid) illness and medications (levothyroxine, lithium, amiodarone,
  iodine/contrast) perturb TSH — a new subclinical value is repeated after 2–3 months. **[A][H22][H23][H24]**
- **Companion panel.** Read with **FT4**, and where available **FT3** (to exclude T3-toxicosis when TSH is
  low) and **TPO antibodies** (autoimmune context, future). **[A][H8]**

---

# 6. Units

- **mIU/L** — standard. **BioSense canonical unit.** **[A/C]**
- **µIU/mL** and **mU/L** — numerically equivalent to mIU/L. **[A][H29]**
- **No analyte conversion factor applies** — unlike cholesterol (38.67), triglycerides (88.57), creatinine
  (88.4), glucose (18.0), 25(OH)D (2.496), B12 (0.738), or folate (2.266). TSH values are used as-is. **[A][C]**

BioSense stores the reported value, unit, age, sex, pregnancy/trimester, and any paired FT4 unchanged, and
evaluates the TSH×FT4 combination and overlays. **[C]**

---

# 7. Unit Conversion

```
mIU/L ≡ µIU/mL ≡ mU/L        (no conversion)   [H29]
(no analyte factor; FT4 is a separate marker in its own units — see SCL-018)
```
Worked check: TSH 2.1 mIU/L = 2.1 µIU/mL = 2.1 mU/L. **[A][H29]**

**Safety rule [D]:** TSH carries **no** analyte conversion factor; never apply a lipid/glucose/vitamin/
creatinine factor. A unit-unknown value is displayed but not interpreted; a combination read requires FT4;
life-stage (age/pregnancy) overlays are applied before banding. **[D]**

---

# 8. Measurement Limitations & the FT4-Paired Principle  *(Context-First basis — reused SCL-010)*

TSH's defining limitation is that **a value does not, on its own, define thyroid status** — which is why the
Context-First gate (§0.2), the TSH×FT4 grid (§0.5), and the ranked-confound output apply. **[A][B2]**

## 8.1 TSH needs Free T4 — [A]
TSH screens; the subclinical/overt and primary/central distinctions require FT4. TSH-only testing misses
central patterns. **[A][H5][H10]**

## 8.2 Context shifts the number — [A]
Age raises the set-point; pregnancy lowers it (trimester-specific); acute illness, medications, and iodine
perturb it. **[A][H15][H18][H22][H23]**

## 8.3 Thresholds are contested — [A]
Standard range vs debated optimal target; pregnancy ATA 2011 vs 2017; age-specific elderly ranges — shown as
frameworks, never averaged. **[A][H4][H19][H20]**

## 8.4 Assay & transience — [A]
Biotin distorts immunoassays; non-thyroidal illness produces transient abnormalities; a subclinical value is
repeated at 2–3 months; TSH has a narrow individual set-point. **[A][H22][H24][H25][H28]**

**How BioSense uses this — [C][D]:** the Context-First gate runs first; TSH is banded two-sided with age/
pregnancy overlays; the TSH×FT4 combination is emitted only with FT4 (else screen-level + limited confidence);
plausible confounds are **ranked, not asserted**; transient/biotin/illness possibilities and the repeat
discipline are surfaced; missing FT4/context sets Context-Required/Reduced confidence; and no condition is
ever named.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010; combination inheritance via SCL-016)*

TSH consumes its paired hormone and context markers where available. **[A][C]**

- **Free T4 (SCL-018) — the essential pair. [A]** TSH is always read with FT4; the **TSH×FT4 combination**
  (subclinical vs overt, primary vs central) is the unit of interpretation, and its confidence **inherits the
  lower** of the two inputs (§0.5, §0.6). **[A][H5][H10][R4][R9]**
- **Free T3 (future). [A]** When TSH is low with normal FT4, FT3 helps exclude T3-toxicosis. **[A][H8]**
- **TPO antibodies (future). [A]** Autoimmune context; anti-TPO positivity raises the rate at which a
  subclinical pattern progresses — relevant background, not a diagnosis. **[A][H13]**
- **Metabolic context (glucose SCL-009 / HbA1c SCL-002 / lipids). [A]** Thyroid status interacts with metabolic
  and lipid wellness; read as supporting context. **[A]**
- **(Context) medications, iodine, biotin. [A]** Levothyroxine/lithium/amiodarone/iodine and biotin are
  interpretation context, never something BioSense advises changing. **[A][H23][H28]**

**Cross-biomarker rule [C] (reused R4/R9):** where these are **available**, BioSense consumes them (with the
combination grid and confound caveats) to sharpen the read and confidence; where **unavailable** — especially
**Free T4** (without which only a screen-level statement is possible) — it records a **confidence limitation**
and names what would clarify, never inventing certainty. **[C][R4][R9]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **TSH is the best first-line thyroid screen; FT4 is needed for subclinical/central/drug/monitoring reads.** **[A][H5][H30]**
- **TSH moves inversely and log-linearly with Free T4** (amplified feedback). **[A][H2]**
- **The five TSH×FT4 combinations map to recognised patterns** (subclinical/overt hypo, subclinical/overt
  hyper, central). **[A][H6-H10]**
- **TSH drifts higher with age and lower in pregnancy.** **[A][H15][H18]**
- **Non-thyroidal illness, medications, iodine, and biotin confound TSH; subclinical values are repeated.** **[A][H22][H23][H24][H28]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **Standard range (0.4–4.0) vs debated "optimal" (~1.0–2.5).** **[A][H3][H4]**
- **Pregnancy: ATA 2011 (T1 2.5, T2/T3 3.0) vs ATA 2017 (population-specific; ~4.0 if unavailable).** **[A][H19][H20]**
- **Age-specific elderly ranges (to ~6.0–6.7) vs a single adult range.** **[A][H15][H17]**
- **Treatment-threshold debate in subclinical hypothyroidism (10 vs treating >4.5–<10).** **[A][H14]**
- **Why:** TSH has a narrow individual set-point but a wide, context-dependent population range; guidelines
  evolve. BioSense **presents the differing frameworks and never averages them** (reused R5). **[A][E][H25]**

## 10.3 Strength of evidence
- **TSH physiology, FT4 pairing, combination grid: established.** **[A][H2][H5]**
- **Age drift; pregnancy shift; confounds; repeat discipline: established.** **[A][H15][H22][H24]**
- **Optimal target; treatment threshold; age/outcome link: evolving/contested.** **[E][H4][H14][H27]**
- **Pregnancy guidance: changed 2011→2017 (established as a change).** **[A][H19][H20]**

## 10.4 Intended populations
Thresholds target general **non-pregnant adults**, with **age** overlays and separate **pregnancy** (trimester/
population-specific) handling. BioSense applies them context-first, abstains or routes in pregnancy and likely
non-thyroidal illness, and reduces confidence where FT4 or context is unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. TSH is TWO-SIDED (high = underactive-direction; low =
> overactive-direction), CONTEXT-GATED, FT4-PAIRED, and SEX/AGE/PREGNANCY-AWARE: the value is a screen whose
> meaning is set by Free T4 and biological context, and where several explanations fit they are RANKED, not
> asserted. Reference ranges, the "optimal" target, and pregnancy (2011 vs 2017) and age-specific ranges
> genuinely DIFFER and are shown, never averaged. Never a diagnosis of thyroid disease.**

## 11.1 The TSH wellness bands (mIU/L; general non-pregnant adult; after context gate; read with FT4)

| BioSense Wellness Interpretation | Associated TSH (mIU/L) | Evidence anchor | Wellness meaning (context-first, FT4-paired; no diagnostic label) |
|---|---|---|---|
| **Suppressed — Low Flag** | < 0.1 | Grade II low-TSH [H11] | Low-direction, more marked; read with FT4 (normal → subclinical-hyper pattern; high → overt); exclude illness/meds. |
| **Low — Watch** | 0.1 – < 0.4 | Grade I low-TSH [H11] | Low-direction, mild; read with FT4; often repeated in 6–12 months. |
| **Optimal Reference** | 0.4 – 2.5 | Reference / debated optimal [H3][H4] | Within reference; ~1.0–2.5 is a commonly-cited (debated) optimal zone. |
| **Upper Reference** | > 2.5 – 4.0 | Standard reference upper part [H3][H4] | Still within the standard 0.4–4.0 range; upper part — watch with context (age/pregnancy/illness/meds). |
| **Above Reference — Watch** | > 4.0 – 10.0 | Above reference [H3][H6][H14] | High-direction; with normal FT4 = subclinical-hypo pattern; repeat 2–3 months; TPO-Ab context (future). |
| **High — Flag** | > 10.0 | Markedly above reference [H14] | High-direction, stronger; read with FT4 (low → overt pattern); calm review. |

*(Read with Free T4 (SCL-018); the combination sets the meaning (§11.4). Age and pregnancy overlays modify the
boundaries (§11.2). Ranges/targets differ across guidelines; shown, never averaged (§11.5).)*

## 11.2 Life-stage overlays (age & pregnancy) [A][B]
- **Age (non-pregnant):** the upper reference drifts higher with age — elderly 97.5th-percentile ~5.5 (65–70),
  ~5.9 (71–80), ~6.7 (>80) mIU/L; applying the non-age-specific range **over-flags** older adults, so the
  Above-Reference boundary is raised with age. **[A][H15][H16][H17]**
- **Pregnancy:** use **trimester/population-specific** ranges (typical T1 ~0.1–2.5, T2 ~0.2–3.0, T3 ~0.3–3.0),
  **not** the non-pregnant bands; and show the **ATA 2011 (T1 2.5, T2/T3 3.0) vs 2017 (~4.0/population-
  specific)** difference; route (professional matter). **[A][H18][H19][H20][H21]**

## 11.3 How the bands were derived — transparency [B]
- The bands use the **standard adult range (0.4–4.0)** with the low direction **graded** (0.1–0.4 vs <0.1) and
  the high direction split at the **treatment-threshold-debate** point (~10); the **debated optimal** (~1.0–
  2.5) is shown as a zone, not a cutoff. **[H3][H4][H11][H14]**
- **No number was averaged.** Varying ranges/targets and pregnancy (2011 vs 2017) and age-specific frameworks
  are presented distinctly (§11.5). **[R5]**
- The **low and high flags** are two-sided context markers; meaning is completed by FT4. **[H5]**

## 11.4 The TSH × Free T4 combination (the unit of interpretation) [A][B]
| TSH | Free T4 | Pattern hint (NOT a diagnosis) | Anchor |
|---|---|---|---|
| High | Normal | Subclinical underactive-direction pattern (repeat 2–3 months) | H6, H24 |
| High | Low | Primary (overt) underactive-direction pattern | H7 |
| Low | Normal | Subclinical overactive-direction pattern (FT3 for T3-toxicosis; grade <0.1 vs 0.1–0.4) | H8, H11 |
| Low | High | Overt overactive-direction pattern (thyrotoxicosis; higher-risk context) | H9, H26 |
| Low/Normal | Low | Central (pituitary/hypothalamic) pattern — TSH-only misses this | H10 |
| Normal | Normal | Euthyroid screen (no pattern) | H30 |

The combination is emitted **only with FT4**, inherits the lower input confidence, ranks confounds first, and
**names no condition** (§0.5, §12). **[A][B][R4][R9]**

## 11.5 Guideline-disagreement display (reused posture) [B][C]
Where relevant, BioSense shows the standard range vs the debated optimal, the pregnancy **ATA 2011 vs 2017**
change, and age-specific ranges as distinct frameworks — **never averaged** (CAV8, CAV9). **[B][C][R5][H19][H20]**

## 11.6 Context-gate precedence [D]
No band or combination is emitted as a verdict without the Context-First evaluation (§0.2). FT4, age/pregnancy
overlays, non-thyroidal illness, medication/iodine/biotin, and repeat are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general non-pregnant adult**, read **with FT4**, with **age** overlays. Ranges are contested
and life-stage-dependent; TSH is confounded by illness/medication/iodine/biotin and has a narrow individual
set-point. Pregnancy uses separate ranges (§11.2); not applied to children/adolescents. **[E][H25]**

---

# 12. Interpretation Framework — CONTEXT-FIRST + FT4-PAIRED (reused SCL-010 cross-biomarker + SCL-016 inheritance)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010), cross-biomarker
> intelligence (SCL-010), and confidence inheritance (SCL-016). TSH is interpreted as a context-dependent,
> FT4-paired thyroid-wellness screen, never a thyroid diagnosis. No new methodology is introduced.** **[C][R1][R4][R9]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1][B2]
   gather context (Free T4 (SCL-018) — CENTRAL; age; pregnancy/trimester; non-thyroidal illness; medications
   levothyroxine/lithium/amiodarone/iodine; biotin; future FT3/TPO-Ab).                            [R4]
   → if material context changes meaning, interpret WITHIN it; if key context unavailable, record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit mIU/L; result final; no known biotin interference) → else display-only/flag. [H28]
STEP 2 — ELIGIBILITY / LIFE-STAGE: non-pregnant adult → apply AGE overlay; pregnancy → trimester/population ranges + route; likely non-thyroidal illness → defer/repeat. [H15,H18,H22]
STEP 3 — CONFIDENCE (four-level + inheritance): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED; combination inherits lower of TSH/FT4 (§0.6). [R2,R9]
STEP 4 — BAND: assign two-sided band (§11.1) with age/pregnancy overlay.                            [R6,R8]
STEP 5 — COMBINATION: if FT4 present, resolve the TSH×FT4 grid (§11.4); else screen-level statement. [R4]
STEP 6 — RANKED CONFOUNDS/CAUSES: abnormal with ≥2 plausible causes → Possible Explanation A/B/C, ranked (non-thyroidal illness, medication/iodine/biotin, transient thyroiditis, genuine axis shift). [R3]
STEP 7 — REPEAT/PERSISTENCE: new subclinical pattern → suggest REPEAT (2–3 months) after excluding confounds. [H24]
STEP 8 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); route where appropriate; NO diagnosis. [R7]
```

**Core interpretive stance [B]:** TSH is a context-first, FT4-paired, two-sided thyroid-wellness screen — read
with Free T4, with age and pregnancy overlays, plausible confounds ranked rather than one asserted, guideline
disagreement shown honestly, subclinical patterns repeated before they count, and no condition named. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy + inheritance — reused SCL-010 + SCL-016)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear TSH AND FT4 available AND life-stage known AND no acute-illness/biotin/med confound | Band + FT4 combination + ranked confounds normally |
| **REDUCED** | Single value / near a boundary / age or trimester overlay uncertain / minor context | Band cautiously; prefer repeat; name the reducer (CAV4/CAV5) |
| **CONTEXT_REQUIRED** | Abnormal TSH with no FT4 (no combination) OR unexcluded confound (illness/medication/biotin) | Screen-level + request FT4/repeat; name needed context (CAV3/CAV6) |
| **ABSTAINED** | Significant uncertainty / conflicting signals / pregnancy needing professional ranges / likely non-thyroidal illness | Explained abstention; route |

**Inheritance (reused SCL-016):** the TSH×FT4 combination verdict inherits the **lower** confidence of its
inputs; if FT4 is unavailable, the combination is limited to a **screen-level** statement, not asserted. **[R9]**

Reducers/context inputs: FT4 absent (no combination) [H5]; single value / narrow set-point (possible transient)
[H25]; possible non-thyroidal illness [H22]; medication/iodine/biotin confound [H23][H28]; age/trimester
overlay uncertainty [H15][H18]; near a band boundary. **[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant uncertainty
**may** justify abstention; a new subclinical pattern prefers a **repeat** framing (2–3 months). **[R2][H24]**

---

# 14. Wellness Interpretation  *(context-first, FT4-paired, two-sided, ranked confounds)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate. Wellness, not medical;
**never a diagnosis**; always **read with Free T4**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal Reference** *(0.4–2.5; normal FT4).* "Your TSH sits in a
  favourable range, and read with your Free T4 there's nothing here that stands out. TSH is a screen and a
  single snapshot, but this looks settled." **[B]**
- **BioSense Wellness Interpretation: Upper Reference / Low — Watch** *(>2.5–4.0, or 0.1–<0.4).* "Your TSH is
  within the standard range but toward the {upper / lower} end. That's often just context — age, a recent
  illness, a medicine, or normal variation — so it's read with your Free T4 and, if borderline, repeated."
  Calm; context; **no diagnosis** (CAV2, CAV5, CAV8). **[B][D]**
- **BioSense Wellness Interpretation: Above Reference — Watch / Suppressed — Low Flag** *(>4.0–10, or <0.1).*
  "This is {above / below} the usual range. Because TSH means different things depending on your Free T4, we
  read the two together, and we've noted the more likely explanations for your context — illness, a medicine,
  iodine or a biotin supplement, or a genuine thyroid shift — rather than pointing to one. A repeat in a couple
  of months is often sensible." Constructive; **no diagnosis** (CAV3, CAV5, CAV6). **[B][D]**
- **BioSense Wellness Interpretation: High — Flag / overt or central patterns** *(TSH >10; or high TSH + low
  FT4; low TSH + high FT4; low/normal TSH + low FT4).* Calm routing: "This pattern — read across TSH and Free
  T4 — is worth a prompt, unhurried conversation with a healthcare professional, who can look at the fuller
  picture. The numbers alone don't diagnose anything." **No alarm, no diagnosis** (CAV7). **[B][D][H10][H26]**
- **Pregnancy.** "In pregnancy, thyroid ranges differ by trimester and the guidance has changed over the
  years, so this is best interpreted with population/trimester-specific ranges and a professional." Route
  (CAV9). **[B][D][H20]**

**FT4-combination modifier:** where FT4 is available, present the TSH×FT4 pattern (subclinical/overt, primary/
central) as **context**; where FT4 is absent, give a **screen-level** statement and name that FT4 completes the
picture (CAV3). The combination confidence **inherits the lower** input (§0.6). **[D][R4][R9]**

**Ranked-confounds modifier (reused):** on any abnormal TSH with ≥2 plausible causes, present **Possible
Explanation A/B/C** ordered by evidence + context (non-thyroidal illness, medication/iodine/biotin, transient
thyroiditis, genuine axis shift) — never a single certain cause, never a named condition. **[D][R3]**

**Age/pregnancy overlay modifier:** apply the elderly upper-drift and the pregnancy trimester/population ranges;
never apply non-pregnant bands in pregnancy (CAV8, CAV9). **[D][H15][H18]**

**Context-unavailable modifier:** where **FT4** (or life-stage/illness/medication context) is missing, state
the confidence limitation and name what would clarify (CAV3/CAV4); never invent certainty (S8). **[D][R4]**

Every interpretation pairs the band and combination with context guidance (§17) and the mandatory caveats
(§0.10). **None diagnoses hypothyroidism, hyperthyroidism, Graves' disease, Hashimoto's, or thyrotoxicosis,
none asserts a single cause, and none treats a BioSense band, range, target, or combination as a medical
boundary.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for TSH).** Abnormal TSH with **no FT4** (no combination) or an unexcluded
  confound (illness/medication/biotin) → screen-level + request FT4/repeat; state what's needed (§13, CAV3/CAV6). **[D][R2]**
- **15.2 Non-thyroidal (sick-euthyroid) illness.** Acute/chronic illness disrupts TFTs (often low TSH) → defer/
  repeat once recovered; do not interpret as a thyroid pattern. **[D][H22]**
- **15.3 Pregnancy.** Use **trimester/population-specific** ranges, show ATA 2011 vs 2017, and route — thyroid
  status in pregnancy is a professional matter. **[D][H18][H20]**
- **15.4 On thyroid-affecting medication.** Levothyroxine/liothyronine (suppression/over-replacement), lithium,
  amiodarone, iodine/contrast → interpret as context; never advise changing a dose. **[D][H23]**
- **15.5 Biotin supplementation.** High-dose biotin can distort the assay → flag and suggest re-testing off
  biotin; do not over-read. **[D][H28]**
- **15.6 Older adults.** Apply the **age overlay** (higher upper limit); avoid over-flagging a mildly raised
  TSH as abnormal. **[D][H15][H17]**
- **15.7 Children & adolescents.** Age-specific paediatric ranges differ; adult bands not applied — display,
  suggest professional interpretation. **[D]**
- **15.8 Red flags.** Very suppressed TSH + high FT4 (thyrotoxicosis pattern; AF/osteoporosis risk); markedly
  high TSH + low FT4; central pattern (low/normal TSH + low FT4) with symptoms; pregnancy with abnormal TSH →
  calm prompt healthcare review regardless of band. **[D][H26][H10]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Repeat-first for new subclinical patterns. [A]** A subclinical abnormality is repeated at **2–3 months** to
  exclude a transient cause before it means anything; confirmed subclinical is monitored 6–12 months. **[H24]**
- **Narrow individual set-point. [A]** TSH varies little around a person's own set-point, so a within-person
  **trend** is more informative than a single value against the wide population range. **[H25]**
- **Trend TSH with FT4. [A]** The combination trend (e.g. a rising TSH with a falling FT4) is what shifts a
  pattern — as context, not a verdict; hold assay/lab constant. **[H2][H5]**
- **Age drift is expected. [A]** A gentle upward drift with age is normal context, not a finding. **[H15]**
- **Context/abstained points. [C]** Illness, biotin, medication-change, pregnancy, and context-required points
  are tagged so they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For TSH, the first tier is **context and the paired marker** (Free T4 above all), then context-appropriate
lifestyle. **[A]/[B]**

## 17.1 Paired marker & context first [A][H5][H24]
Where TSH is abnormal, the clarifying steps are **Free T4** (and, where relevant, FT3/TPO-Ab), the **confound
review** (illness/medication/iodine/biotin), the **age/pregnancy overlay**, and — for a new subclinical pattern
— a **repeat** at 2–3 months. **[A]**

## 17.2 Thyroid-friendly wellness context [A][H23]
General thyroid-friendly wellness — adequate but not excessive **iodine** and **selenium** via a balanced diet,
sleep, and stress management — is relevant context; a gentle age-related upward TSH drift is normal. Framed as
**education, not treatment**. **[A]**

## 17.3 Confound & exposure context [A][H22][H23][H28]
Acute illness, thyroid-affecting medications (levothyroxine/lithium/amiodarone), iodine/contrast, and biotin
supplements are recognised context/confounds for an abnormal TSH — useful for interpretation, **never** a
prompt to change any medication or supplement without professional advice. **[A]**

## 17.4 Framing rules [B][D]
Paired marker and context first (repeat for new subclinical); **no specific treatments, medication changes, or
doses** (S9); range/target/pregnancy/age disagreement shown, never averaged; calm, evidence-informed language;
never a diagnosis; the FT4-paired (CAV2), screen-only (CAV3), age (CAV8), and pregnancy (CAV9) caveats attached
where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain that TSH is the pituitary's feedback signal read **with** Free T4; run the
context-first evaluation; assign the two-sided band with age/pregnancy overlays; resolve the TSH×FT4 combination
(with inherited confidence) when FT4 is present; integrate FT3/TPO-Ab and metabolic context (future/where
available); present **ranked** confounds for an abnormal value; recommend a repeat (2–3 months); name which
markers would clarify (especially FT4); express context-required/abstention respectfully.

The AI layer **must never**:
- emit "hypothyroidism", "hyperthyroidism", "Graves' disease", "Hashimoto's", "thyroiditis", "thyrotoxicosis", or any condition as a diagnosis — even to deny one (S1)
- interpret TSH in isolation beyond a screen, or emit a combination read without FT4 (S2, S3)
- assert a single cause for an abnormal TSH when ≥2 are plausible — rank them (S4)
- ignore life-stage (apply age overlay; use pregnancy trimester/population ranges; never non-pregnant bands in pregnancy) (S5)
- load interpretation onto a new/isolated subclinical value without a repeat and confound exclusion (S6)
- interpret a likely non-thyroidal-illness or biotin-affected value as a thyroid pattern (S6)
- recommend treatments, medication changes, or doses (e.g. levothyroxine); produce a thyroid-disease-risk % (S9)
- invent certainty when FT4/context is unavailable — state the limitation and inherit confidence (S8)
- fail to route red flags (thyrotoxicosis/overt/central patterns; pregnancy) calmly and promptly (S10)
- present a BioSense band, range, optimal target, or combination as a medical/diagnostic boundary (S11)
- average contested ranges/targets or the pregnancy (2011 vs 2017) or age-specific frameworks (S12)

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any thyroid condition is
SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes
  patterns, never names hypo/hyperthyroidism/Graves/Hashimoto/thyrotoxicosis (S1). **[D][R7]**
- **FT4-paired honesty.** TSH is presented as a screen whose meaning depends on Free T4; combination reads only
  with FT4, else screen-level + inherited confidence (S2, S3, CAV2, CAV3). **[D][B2]**
- **Ranked, not asserted.** Where several confounds/causes fit, they are ranked by evidence + context, never
  reduced to one (S4, CAV6). **[D][R3]**
- **Life-stage aware.** Age overlay and pregnancy trimester/population ranges applied; never non-pregnant bands
  in pregnancy (S5, CAV8, CAV9). **[D][H15][H18]**
- **Repeat-first + confound exclusion.** New subclinical → repeat 2–3 months after excluding illness/medication/
  iodine/biotin (S6, CAV5). **[D][H22][H24][H28]**
- **Calm red-flag routing.** Thyrotoxicosis (very suppressed TSH + high FT4; AF/osteoporosis risk), overt, and
  central patterns, and pregnancy abnormalities → prompt, unhurried review; never emergency-diagnose (S10, CAV7). **[D][H26][H10]**
- **No treatment/medication guidance.** Levothyroxine/dose questions → educate + refer (S9). **[D]**
- **Missing markers/context stated, not invented.** (S8). **[D][R4]**
- **Correct unit handling.** mIU/L used as-is (no analyte conversion factor); combination requires FT4. **[D][H29]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. An abnormal TSH is **persistent on repeat** (2–3 months). **[H24]**
2. The **combination is overt** — high TSH + low FT4, or low TSH + high FT4. **[H7][H9]**
3. TSH is **very suppressed** (<0.1) or **markedly high** (>10). **[H11][H14]**
4. A **central pattern** — low/normal TSH + low FT4 — especially with symptoms. **[H10]**
5. **Pregnancy** with an abnormal TSH (trimester/population ranges, professional matter). **[H18][H20]**
6. On **thyroid-affecting medication**, or a **thyrotoxicosis** pattern (AF/osteoporosis risk), or the user
   **asks a medical/medication question** (S9). **[H23][H26]**

All suggestions are wellness-framed, non-urgent (unless red flags), non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-017 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for TSH (mIU/L) plus age, sex, and
  pregnancy/trimester metadata, and — as interpretation inputs — **Free T4 (SCL-018; the paired marker), future
  FT3/TPO antibodies, and metabolic context (glucose SCL-009/HbA1c SCL-002/lipids)**, plus declared context
  (acute illness, thyroid-affecting medications, iodine, biotin). **[R4]**
- **Supplies (as CSL bindings):** the two-sided TSH bands with age/pregnancy overlays (Category B), the
  **TSH×FT4 combination grid**, the reused Context-First gate, the reused four-level confidence hierarchy **with
  inheritance**, the reused ranked multiple-explanations output, the reused cross-biomarker consumption (with
  graceful degradation to a screen-level read), the range/target/pregnancy/age disagreement display, the
  repeat/persistence behaviour, safety rules, context guidance, and narrative templates — each with value +
  source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, cross-biomarker intelligence, the
  confidence hierarchy, and the multiple-explanations output (all frozen from SCL-010); **confidence inheritance
  (SCL-016/007)** for the TSH×FT4 combination; sex/age/pregnancy-aware banding (SCL-004/010/016); the guideline-
  disagreement posture (SCL-003/011/012); two-sided banding (SCL-004/009/010/011/012/016); and the diagnostic-
  adjacency discipline (SCL-002/009/011/012/016). **The FT4-paired interpretation is represented within
  cross-biomarker intelligence + inheritance — not as a new methodology.** **[C][R1][R4][R9]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (FT4 completes the read, the
  combination inherits confidence — never averaged into a single verdict; contested ranges/targets/pregnancy/
  age frameworks never averaged).
- **Uses the correct unit handling** (mIU/L as-is; no analyte factor) — a per-analyte configuration.
- **Score contribution:** TSH contributes to a **thyroid/metabolic-wellness** context as a sex/age/pregnancy-
  aware, context-gated, FT4-paired input — the combination (governed by inheritance) as the headline and TSH
  alone as a screen-level signal — with abnormal values expressed as ranked-confound context rather than a
  verdict; context-required/abstained values do not contribute a definite verdict. Any weighting is a Category
  [C] product decision. **[C]**

---

# 22. Medication & Exposure Context (educational only)

Educational context only; BioSense does not instruct on treatment, dose, or medication changes (S9). **[D]**
- **Levothyroxine / liothyronine:** over-replacement suppresses TSH; under-replacement raises it — key context
  when interpreting a treated individual's TSH, but any dose decision belongs to the prescriber. **[A][H23]**
- **Lithium & amiodarone:** commonly disturb thyroid function (lithium → goitre/hypothyroidism; amiodarone →
  hypo or hyper); interpreted as context. **[A][H23]**
- **Iodine / contrast agents:** excess iodine can over- or under-stimulate the thyroid; recent imaging contrast
  is relevant context. **[A][H23]**
- **Biotin supplements:** high-dose biotin distorts the immunoassay → suggest re-testing off biotin, never
  over-read. **[A][H28]**
- Any medication or exposure question → educational context + suggestion to speak with a healthcare
  professional; BioSense never advises starting, stopping, or changing a medication or supplement. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **TSH needs Free T4. [E]** TSH alone is a screen; the combination grid and confidence inheritance handle
   this. **[H5]**
2. **Thresholds are contested. [E]** Standard range vs debated optimal; shown, never averaged. **[H4]**
3. **Pregnancy guidance changed. [E]** ATA 2011 vs 2017; population/trimester-specific preferred; shown, never
   averaged. **[H19][H20]**
4. **Age shifts the range. [E]** Elderly upper limit drifts higher; age overlay avoids over-flagging. **[H15]**
5. **TSH is easily confounded. [E]** Non-thyroidal illness, medication, iodine, biotin; repeat mitigates. **[H22][H28]**
6. **Treatment-threshold & outcome debates. [E]** SCH treatment threshold (10 vs >4.5–<10) and age/outcome links
   are unsettled; BioSense stays wellness-framed and non-prescriptive. **[H14][H27]**
7. **Paired-marker availability is data-dependent. [E]** Without FT4, only a screen-level statement is possible;
   the combination degrades to a confidence limitation, not certainty. **[R4][R9]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**; FT4-paired;
context-first; two-sided; age/pregnancy overlays; ranked confounds; repeat for new subclinical). **[B]/[D]**
(Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL_REFERENCE (0.4–2.5 ; normal FT4)
"Your TSH is {value} mIU/L — a favourable range — and read with your Free T4 there's nothing here that stands
 out. TSH is a screen and a single snapshot, but this looks settled."  +CAV1 +CAV2

TEMPLATE: UPPER_REFERENCE / LOW_WATCH (>2.5–4.0 ; or 0.1–<0.4)
"Your TSH is {value} mIU/L — within the standard range but toward the {upper/lower} end. That's often just
 context — age, a recent illness, a medicine, or normal variation — so it's read with your Free T4 and, if
 borderline, repeated."  +CAV1 +CAV2 +CAV8

TEMPLATE: ABOVE_REFERENCE_WATCH / SUPPRESSED_LOW_FLAG (>4.0–10 ; or <0.1)
"Your TSH is {value} mIU/L — {above/below} the usual range. Because TSH means different things depending on your
 Free T4, we read them together, and here are the more likely explanations for your context rather than one:
 {ranked A/B/C}. A repeat in a couple of months is often sensible."  +CAV1 +CAV2 +CAV3 +CAV5 +CAV6

TEMPLATE: HIGH_FLAG / OVERT_OR_CENTRAL (TSH>10 ; or high TSH+low FT4 ; low TSH+high FT4 ; low/normal TSH+low FT4 — CALM ROUTING)
"Read across your TSH ({value}) and Free T4, this pattern is worth a prompt, unhurried conversation with a
 healthcare professional, who can look at the fuller picture. The numbers alone don't diagnose anything."  +CAV1 +CAV2 +CAV7

TEMPLATE: PREGNANCY
"In pregnancy, thyroid ranges differ by trimester and the guidance has changed over the years, so this is best
 interpreted with population/trimester-specific ranges and a professional."  +CAV1 +CAV9

MODIFIER: FT4_COMBINATION (FT4 present) →
 "With your Free T4, the pattern reads as {subclinical/overt underactive | subclinical/overt overactive | central}
  context — a hint, not a diagnosis, read with your wider picture."  +CAV2

MODIFIER: SCREEN_ONLY (no FT4) →
 "TSH on its own is a screen — Free T4 is what turns it into a fuller picture, so we'd interpret this more
  confidently with Free T4."  +CAV3

MODIFIER: RANKED_CONFOUNDS (abnormal, ≥2 causes) →
 "Possible explanations, most-to-least likely for your context: A {…}, B {…}, C {…} — best confirmed with a professional."  +CAV6

MODIFIER: AGE_OVERLAY → "TSH tends to sit a little higher with age, which we take into account."  +CAV8
MODIFIER: CONFOUND (illness/biotin/med) → note exclude-and-repeat.  +CAV5
```

**Absolute rules:** no template diagnoses a thyroid condition, asserts a single cause, emits a combination read
without FT4, treats a band/range/target/combination as a diagnostic boundary, applies non-pregnant bands in
pregnancy, alarms, or averages ranges/targets/frameworks. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, with FT4. [illustrative]**
```
Input: TSH 1.8 mIU/L, FT4 normal, age 40, not pregnant.
Band: OPTIMAL_REFERENCE | Combination: euthyroid screen | Confidence: STANDARD
Narrative: OPTIMAL +CAV1+CAV2.  [H3,H30]
```

**Example 2 — Above reference, normal FT4 (subclinical-hypo pattern). [illustrative]**
```
Input: TSH 6.2 mIU/L, FT4 normal, age 45; single reading.
Band: ABOVE_REFERENCE_WATCH | Combination: subclinical underactive pattern | Confidence: REDUCED (single value)
Narrative: ranked A(normal variation/transient) B(early axis shift) C(illness/med) +CAV6 ; repeat 2–3 months +CAV5 ; NO "hypothyroidism".  [H6,H24,S6]
```

**Example 3 — Above reference in an older adult (age overlay). [illustrative]**
```
Input: TSH 5.4 mIU/L, FT4 normal, age 82.
Band: with age overlay → within age-specific reference (97.5th pct ~6.7 at >80) | Confidence: STANDARD
Narrative: OPTIMAL/UPPER for age +CAV8 (age drift) ; avoid over-flagging ; NO diagnosis.  [H15,H17,S5]
```

**Example 4 — Suppressed TSH, no FT4. [illustrative]**
```
Input: TSH 0.05 mIU/L, FT4 not available, age 50.
Band: SUPPRESSED_LOW_FLAG | Combination: NOT computable (no FT4) | Confidence: CONTEXT_REQUIRED
Narrative: screen-only +CAV3 ; exclude illness/meds/biotin +CAV5 ; grade Grade II (<0.1) ; NO "hyperthyroidism".  [H11,R9,S3]
```

**Example 5 — Low TSH + high FT4 (thyrotoxicosis pattern). [illustrative]**
```
Input: TSH <0.01 mIU/L, FT4 high.
Band: SUPPRESSED_LOW_FLAG | Combination: overt overactive pattern (higher-risk context) | Confidence: STANDARD
Narrative: calm prompt review +CAV7 (AF/osteoporosis context) ; ranked ; NO "Graves/thyrotoxicosis" diagnosis.  [H9,H26,S10]
```

**Example 6 — Pregnancy. [illustrative]**
```
Input: TSH 3.6 mIU/L, first trimester.
Band: pregnancy overlay → show ATA 2011 (T1 2.5) vs 2017 (~4.0/population); NOT non-pregnant bands | Confidence: ABSTAINED→route
Narrative: pregnancy template +CAV9 ; population/trimester ranges ; route ; NO diagnosis.  [H18,H19,H20,S7]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-018 (Free T4)** — the essential paired marker; TSH is interpreted via the **TSH×FT4 combination**, and
  the combination confidence inherits the lower input.
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, cross-biomarker
  intelligence, four-level confidence hierarchy, and multiple-explanations output.
- **SCL-016 (Creatinine + eGFR) / SCL-007 (non-HDL-C)** — source of the reused **confidence inheritance**
  principle applied to the TSH×FT4 combination.
- **SCL-004 (HDL-C) / SCL-010 / SCL-016** — precedent for the reused sex/age/pregnancy-aware banding.
- **SCL-011 (Vitamin D) / SCL-012 (B12)** — precedent for guideline-disagreement / multi-framework display
  (here: adult range vs optimal target; pregnancy 2011 vs 2017; age-specific).
- **Future Free T3, TPO antibodies** — companion thyroid markers TSH consumes; where unavailable, a confidence
  limitation is recorded.
- **SCL-009 (Fasting Glucose) / SCL-002 (HbA1c)** — metabolic context; and source of the reused diagnostic-
  adjacency discipline.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the H-series IDs in §0 and
> the body. Developers finalising the pack should confirm exact page/table locators against the primary
> sources where required.

**Physiology, ranges, first-line status (Category A anchors)**

1. **HealthMatters.io: TSH (Thyroid Panel).** — *TSH from pituitary; high TSH ~ underactive-direction; standard
   adult 0.4–4.0 mIU/L; some suggest ≤2.5 optimal; low-TSH causes (over-replacement, iodine/contrast, non-
   thyroidal illness); units (H1, H3, H4, H22, H23, H29).*
2. **Doctronic: Normal TSH Levels by Age (2026).** — *standard 0.4–4.0; optimal 1.0–2.5; <60 follow-up >4.0–4.5;
   >60 up to ~6.0; pregnancy T1 0.1–2.5, T2 0.2–3.0, T3 0.3–3.0; TSH trends higher with age (H3, H4, H17, H18).*
3. **Ann Lab Med 2019 (Laboratory Testing in Thyroid Conditions).** — *TSH first-line; FT4+TSH needed for
   subclinical dysfunction, central hypothyroidism, drug effects, hospitalised, monitoring; subclinical hyper =
   low/suppressed TSH + normal FT4, test FT3 (H5, H8, H30).*

**TSH × FT4 combinations, subclinical grading, central pattern (Category A)**

4. **PMC11581835 (Subclinical hypothyroidism, TSH >4.5 <10).** — *high TSH + normal FT4 = SCH; log-linear
   amplification; treatment-threshold-10 debate; narrow individual set-point (H2, H6, H14, H25).*
5. **PMC10826222 (Etiology of abnormal TSH, VA).** — *mildly suppressed TSH + normal FT4 = subclinical hyper;
   markedly suppressed + high FT4 = overt hyper; high TSH + low FT4 = overt hypo; age/outcome uncertainty (H6,
   H7, H8, H9, H27).*
6. **PMC3693616 (Management of Subclinical Hyperthyroidism).** — *low-TSH grades: Grade I 0.1–0.4, Grade II <0.1;
   progression rates; exclude non-thyroidal illness/drug suppression/pregnancy before interpreting (H11, H12,
   H22).*
7. **PMC9155938 (Central hypothyroidism case) & PMC8195777 (low FT4, normal TSH algorithm).** — *low/normal TSH
   + low FT4 = central; TSH-only misses central hypothyroidism; FT4 essential (H10).*
8. **Hospital Handbook (UCSF) & NBT Clinical Biochemistry TFT strategy.** — *high TSH + low FT4 = primary hypo;
   SCH progression 2–6%/yr (higher if anti-TPO); repeat TSH+FT4 in 2–3 months; monitor 6–12 months; low-TSH
   management, lithium/illness caveats; thyrotoxicosis risks (AF/osteoporosis) (H7, H13, H24, H26).*

**Age-specific & pregnancy ranges, guideline change (Category A)**

9. **PMC9719481 (Age-specific TSH reference range, elderly).** — *97.5th pct 5.51 (65–70), 5.89 (71–80), 6.70
   (>80); age-specific vs lab range changes SCH prevalence (10.28% vs 3.74%) (H15, H16).*
10. **PMC8001256 (Cut-off for TSH / SCH in pregnancy) & PMC6358369 (Trimester-specific ranges, Nanjing).** —
    *ATA 2011 (T1 2.5, T2/T3 3.0) → overdiagnosis; ATA 2017 population-specific, ~4.0 if unavailable; measured
    trimester ranges vary (Nanjing T1 0.02–3.78, T2 0.47–3.89, T3 0.55–4.91); units µIU/L (H19, H20, H21, H29).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–10; they are BioSense
> Version 1 classifications, two-sided and context-gated with age/pregnancy overlays, not attributable to any
> single reference as a diagnostic threshold, and **do not restate diagnostic labels.** Reference ranges, the
> optimal target, and the pregnancy (2011 vs 2017) and age-specific frameworks are shown separately and **never
> averaged**; TSH is presented as an FT4-paired screen, never a thyroid diagnosis; the TSH×FT4 combination is a
> pattern hint whose confidence inherits the lower input, never a standalone verdict.

---

# 28. Founder Decisions Required

The TSH methodology reuses frozen BioSense frameworks and represents TSH via the existing Context-First, cross-
biomarker (FT4-paired), confidence-inheritance, and guideline-disagreement frameworks. Two optional
presentation/policy items remain: **[C][E]**

**D-1 — Confirm the two-sided band structure and the debated-optimal presentation.** SCL-017 uses the standard
adult range (0.4–4.0) with a graded low direction (0.1–0.4 vs <0.1) and a high split at the treatment-threshold-
debate point (~10), and shows the **debated ~1.0–2.5 "optimal" zone** as a reference band (not a cutoff),
alongside **age** and **pregnancy** overlays. Confirmation requested that this two-sided, overlay-based
presentation (with the optimal zone shown but not treated as a target) is the intended default. **Founder
sign-off requested.**

**D-2 — Confirm the FT4-pairing activation and pregnancy-handling scope for V1.** SCL-017 emits a **combination
read only when Free T4 (SCL-018) is available** (else a screen-level statement with inherited/limited
confidence), and in **pregnancy** prefers population/trimester-specific ranges while showing the ATA 2011 vs
2017 difference and routing. **Founder decision requested** on whether V1 activates TSH now (degrading
gracefully to a screen-level read until SCL-018 exists, and routing in pregnancy) or waits for SCL-018 (Free
T4) to be authored so the combination grid is fully active from launch.

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-017 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/
reference figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. TSH
reuses frozen BioSense methodology throughout — the Context-First Interpretation Framework, cross-biomarker
intelligence, the four-level confidence hierarchy, and the multiple-explanations output (all from SCL-010),
confidence inheritance (SCL-016/007, for the TSH×FT4 combination), sex/age/pregnancy-aware banding (SCL-004/
010/016), the guideline-disagreement posture (SCL-003/011/012), two-sided banding with flags (SCL-004/009/010/
011/012/016), and the diagnostic-adjacency discipline (SCL-002/009/011/012/016) — introducing only TSH-specific
scientific content (the thresholds and their two-sided/graded structure; the TSH×FT4 combination grid; the age
and pregnancy overlays; the ATA 2011→2017 pregnancy disagreement; the non-thyroidal-illness, medication,
iodine, and biotin confounds; and the repeat/persistence behaviour). TSH is represented as the pituitary's
FT4-paired feedback signal — a context-first thyroid-wellness screen, never a diagnosis of thyroid disease. No
new methodology was required; all structure remains consistent with SCL-001 through SCL-016.*
