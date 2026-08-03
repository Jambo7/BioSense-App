# SCL-022 — ALKALINE PHOSPHATASE (ALP)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. Alkaline Phosphatase is a genuinely two-sided, context-first marker of hepatobiliary and bone physiology whose elevated value REQUIRES source localisation — achieved by pairing with GGT (and the wider liver panel and bone/mineral context) using the existing Cross-Biomarker Intelligence, Confidence Hierarchy, Confidence Inheritance, and Guideline-Disagreement frameworks. Never interpreted in isolation. Never a diagnosis of liver disease, biliary obstruction, bone disease, Paget disease, or metastatic disease. No new methodology introduced.*

**Document ID:** SCL-022
**Biomarker:** Alkaline Phosphatase (ALP, Alk Phos) — hepatobiliary & bone-physiology marker; genuinely two-sided; context-first; source-localised via GGT; sex/age/pregnancy-aware
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 2 August 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template, and aligned to the frozen liver-enzyme packs GGT (SCL-021), ALT (SCL-014) and AST (SCL-015) and the two-sided packs Creatinine (SCL-016) and Haemoglobin (SCL-019). ALP reuses the frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), cross-biomarker intelligence (SCL-010), the four-level confidence hierarchy (SCL-010), **confidence inheritance** (SCL-016/017/018/019/021), multiple-explanations output (SCL-010), two-sided banding with a ×ULN high-side severity gradient (SCL-016/019 two-sided + SCL-014/015/021 ×ULN), sex/age/pregnancy-aware banding (SCL-004/010/016/017/018/019), guideline-disagreement handling (SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/014/015/016/017/018/019/021) — introducing only ALP-specific scientific content. All sections remain consistent with SCL-001 through SCL-021.

---

> **What this document is.** SCL-022 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for Alkaline Phosphatase. It reuses existing
> BioSense methodology and does not redesign the Constitution, the ENG documents, the Blood Analysis Engine, or
> the SCL architecture. **No new methodology is introduced.**
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

## STRUCTURAL-FIT NOTE (ALP vs SCL-001, and its liver-enzyme sibling SCL-021) — reuses frozen frameworks; no new pattern

Alkaline Phosphatase presents the same structural characteristics BioSense has already solved for — in
particular the **GGT-paired source-localisation** already specified in the frozen GGT pack (SCL-021), which
described exactly the ALP+GGT logic from the GGT side — and maps onto the frozen methodology without extension.
ALP is a marker of **hepatobiliary and bone physiology**, and its meaning is **inseparable from source
localisation**: an elevated total ALP could come from the liver/bile ducts or from bone (or, physiologically,
from growth or the placenta), and it is GGT — with ALT/AST, bilirubin, vitamin D and bone/mineral context —
that tells you which. So it reuses the Cross-Biomarker Intelligence and Context-First frameworks:

1. **Never-in-isolation interpretation — reused cross-biomarker intelligence (SCL-010) + multiple-explanations
   (SCL-010).** An elevated ALP screens hepatobiliary/bone activity, but the meaningful wellness read comes from
   ALP **plus its companions** — above all **GGT (SCL-021)**, then ALT (SCL-014), AST (SCL-015), the future
   Bilirubin (SCL-023), vitamin D (SCL-011), and the future calcium/phosphate — which is exactly a
   consume-companions-and-rank-the-interpretation pattern (§0.5, §9). ALP alone is a screen whose **source is
   unknown**; the companions localise it. **ALP is never interpreted in isolation.**
2. **Confidence inheritance — reused (SCL-016/017/018/019/021).** The ALP source-localisation (ALP+GGT)
   **inherits the lower confidence** of its inputs; if GGT is unavailable, the localisation is confidence-
   limited (with 5-nucleotidase / isoenzymes / vitamin D noted), not asserted (§0.6, §13).
3. **Context-First — reused (SCL-010).** ALP is interpreted only after context — GGT/ALT/AST/bilirubin,
   pregnancy, adolescence/growth, ageing, bone turnover, vitamin D, calcium/phosphate, recent fracture, and
   medications — evaluated **before** banding (§0.2, §8, §12).
4. **Genuinely two-sided banding with flags — reused (SCL-016/019 two-sided; SCL-014/015/021 ×ULN).** ALP is
   meaningfully two-sided: the **elevated** direction (hepatobiliary/bone-turnover, graded by severity as ×ULN)
   **and** a genuinely meaningful **low** direction (hypophosphatasia, zinc/magnesium deficiency, hypothyroidism,
   malnutrition) — each flagged. (This differs from GGT, which is high-dominant; ALP needs **both** flags — an
   already-solved two-sided structure, not new methodology.) (§11).
5. **Sex/age/pregnancy-aware banding — reused (SCL-004/010/016/017/018/019).** ALP varies **dramatically** with
   age (children 2–5× adults during growth; puberty peaks) and rises **2–3×** in pregnancy (placental ALP), with
   sex differences — so banding carries strong age and pregnancy overlays (§11).
6. **Guideline-disagreement handling — reused (SCL-003/011/012).** The adult reference ranges genuinely differ
   (44–147; 35–125; 40–129 men / 35–104 women; 38–113 IFCC) and optimal/low targets vary — presented as distinct
   frameworks, **never averaged** (§10, §11).
7. **Multiple-explanations output — reused (SCL-010).** An abnormal ALP gets **ranked possibilities** — first
   **which source** (hepatobiliary vs bone vs physiological), then the likely causes within it — never a single
   certain cause (§11, §14).
8. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012/014/015/016/017/018/019/021).** BioSense
   never emits "liver disease," "biliary obstruction," "bone disease," "Paget disease," or "metastatic disease"
   as a diagnosis; it detects the pattern, routes, and names nothing (§18, §19).

**Biomarker-specific content introduced:** the ALP thresholds and their genuinely-two-sided structure (a ×ULN
high-side gradient plus a low flag); the IU/L ≡ U/L enzyme-activity unit; the strong age/growth and pregnancy
overlays; the reference-range disagreements; the **GGT-localisation (source) layer** (hepatobiliary vs bone,
with 5-NT/isoenzyme/vitamin D fallbacks); the intestinal/post-meal, medication, and low-ALP (mineral/thyroid)
nuances; and the trend behaviour. **No new methodology is required.** **[C]**

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

Alkaline Phosphatase is best understood as **a marker of hepatobiliary and bone physiology** — a physiological
enzyme that comes predominantly from two places, the **liver / bile ducts** and **bone** (with smaller
contributions from intestine, kidney, and, in pregnancy, the placenta) — **not** a standalone verdict and
**not** a diagnosis. Because a standard test measures **total** ALP without distinguishing the source, an
elevated value's meaning is inseparable from **source localisation**: it is **GGT** — supported by ALT, AST,
bilirubin, vitamin D, and bone/mineral context — that tells you whether a raised ALP is coming from the
hepatobiliary system or from bone. The rule is simple and central: a raised ALP **with** a raised GGT points to
the **liver/bile ducts**; a raised ALP with a **normal** GGT points to **bone**. And ALP is genuinely
**two-sided** — a **low** value carries its own meaning (a mineralisation, mineral-deficiency, or thyroid
direction).

So BioSense reads ALP **with its companions** — GGT above all — **never in isolation**, begins with biological
context (a child's growth or a pregnancy raises ALP entirely normally; vitamin D, bone turnover, medications,
and even a recent meal all move it), ranks first **which source** and then the plausible explanations rather
than asserting one, shows where reference ranges genuinely differ rather than splitting them, and names no
condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as the
evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate ALP. Every value carries a source ID (P-series / R-series → §27) and a
> category tag. Canonical unit: U/L (≡ IU/L; enzyme activity; no mass factor). **Genuinely two-sided (a ×ULN
> high-side gradient plus a low flag), context-first, sex/age/pregnancy-aware; NEVER interpreted in isolation;
> the source-localisation (ALP+GGT) verdict inherits lower input confidence; NEVER a diagnosis of liver disease,
> biliary obstruction, bone disease, Paget disease, or metastatic disease.**

## 0.1 Canonical units — [A]
```
canonical_unit: U/L   (≡ IU/L; enzyme activity = amount catalysing 1 µmol substrate/min per L)   [P8]   # NO analyte-specific mass factor — do NOT apply 38.67/88.57/88.4/18.0/2.496/0.738/2.266/12.87/1.611; same enzyme-activity unit as GGT/ALT/AST (SCL-021/014/015)
Always retain value + unit + sex + age(child/adolescent/adult/older) + pregnancy/trimester + available companions(GGT/ALT/AST/future Bilirubin/vitamin D/future calcium/phosphate) + context(bone turnover/recent fracture/medications/fasting state). Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  companions (NEVER-IN-ISOLATION; source localisation): GGT (SCL-021, PRIMARY), ALT (SCL-014), AST (SCL-015), future Bilirubin (SCL-023), vitamin D (SCL-011), future calcium, future phosphate; [P9,P10,P19]
  life-stage (major physiological drivers): pregnancy/trimester (placental ALP 2–3×), adolescence & growth (children 2–5× adults; puberty peaks), ageing; [P11,P12,P13]
  bone context: bone turnover, recent fracture (transient rise), vitamin D status (deficiency → bone-source rise); [P15,P19]
  other: medications (enzyme-inducers; oral contraceptives; anabolic steroids), fasting state (food → intestinal ALP, esp. blood types B/O). [P22,P24]
CORE RULE (founder): ALP is a marker of HEPATOBILIARY & BONE PHYSIOLOGY; an ELEVATED ALP REQUIRES SOURCE LOCALISATION through context; total ALP does NOT distinguish source; NOT a diagnosis. [P1,P2,P20][B3]
  → ALP alone = screen with UNKNOWN source; localisation needs GGT (primary) + ALT/AST/Bilirubin/vitamin D + life-stage. [P9,P20]
  → GGT AVAILABLE: ALP↑ + GGT↑ → hepatobiliary source; ALP↑ + normal GGT → bone source. [P9]
  → GGT UNAVAILABLE: localisation confidence REDUCES (note 5-nucleotidase / ALP isoenzymes / vitamin D as alternatives); never imply certainty. [P10,R9]
  → where several explanations fit an abnormal ALP, RANK them (source first, then cause) (§0.5); never assert one.
IF material context changes meaning → interpret WITHIN that context.                                          [R1]
IF companions / key context unavailable → CONFIDENCE LIMITATION (pattern confidence limited), not certainty.  [R4,R9]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors) — GENUINELY TWO-SIDED
```
ALP_WELLNESS_BAND (U/L, general non-pregnant adult; after context gate; ALWAYS read with GGT/source context):  [P3,P4,P5,P6,P7,P18]
 Uses an adult reference window (ULN_ref default 120 U/L; LRL_ref default 40 U/L; lab's own preferred; frameworks never averaged). [P3,P4,P5,P7]
  LOW_FLAG              v < 30                            # low direction — hypophosphatasia/zinc-magnesium/hypothyroidism/malnutrition; read with context [P17,P18]
  LOW_NORMAL_WATCH      30 <= v < 40                      # low end / low-threshold-disagreement zone (30 vs 40) [P18]
  OPTIMAL_WELLNESS      40 <= v <= 100                    # wellness-optimal window (normal GGT → healthy bile-duct function) [P6]
  WITHIN_REFERENCE      > 100 <= ULN_ref                  # upper reference (ULN differs by lab: ~113–147) [P3,P4,P7]
  BORDERLINE_HIGH_WATCH ULN_ref < v <= 1.5×ULN_ref        # mild elevation; localise (GGT); ACG: >1.5×ULN + GGT↑ → imaging route [P16]
  ELEVATED_FLAG         1.5×ULN_ref < v <= 3×ULN_ref      # clearer elevation; localise source; rank causes [P14,P15]
  HIGH_FLAG             3×ULN_ref < v <= 5×ULN_ref        # marked; hepatobiliary (obstruction) or bone (Paget) pattern; route [P14,P15]
  MARKED_HIGH_FLAG      v > 5×ULN_ref                     # markedly elevated (Paget 5–25×; obstruction 10–20×); localise + prompt review [P15,P14]
DIRECTION: GENUINELY TWO-SIDED (low = mineralisation/mineral/thyroid direction — flagged; high = hepatobiliary/bone-turnover direction — severity by ×ULN). [R6]
LIFE-STAGE OVERLAY: children/adolescents (2–5× adults; use age-specific paediatric ranges) & pregnancy (2–3× placental) → physiological; do NOT apply adult high bands. [P11,P12,P13]
SOURCE: GGT (primary) localises high ALP (hepatobiliary vs bone); if GGT absent → localisation limited (5-NT/isoenzyme/vitamin D). [P9,P10]
UNIT: U/L (≡ IU/L). COMPANIONS (esp. GGT) REQUIRED to localise a high ALP; if absent → screen-level (source-unknown) read + reduced confidence. [P9][R9]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never in isolation; never a diagnostic label. [B][D]**

## 0.4 Life-stage, reference & low-threshold frameworks (guideline-disagreement, never averaged) — [A]/[B]
```
ADULT REFERENCE RANGES (represent the relevant framework(s); NEVER average):   [P3,P4,P5,P7]
  44–147 IU/L (widely-used lab range). [P3]
  35–125 IU/L (NCBI most-commonly-used method). [P4]
  men 40–129 / women 35–104 U/L (sex-specific). [P5]
  38–113 IU/L (IFCC adult, >18y). [P7]
OPTIMAL/FUNCTIONAL (Category B target; evolving [E]): 50–100 U/L with normal GGT (Apex); optimal <80 U/L (Lamkin). [P6]
LOW THRESHOLDS (represent; NEVER average): below 40 U/L (Apex); persistently below 30 IU/L (HealthRX). [P18]
PAEDIATRIC/GROWTH (age-specific; do NOT apply adult bands): 2–5× adult during growth; e.g. (IFCC) 1–5y 140–420; 6–10y 158–490; puberty peaks (11–12y ~525 M); →38–113 by >18y; girls peak earlier. [P11,P13]
PREGNANCY: 2–3× elevation in 2nd & 3rd trimesters (placental ALP) → physiological. [P12]
DEFAULT: BioSense uses an adult reference window (ULN_ref 120 / LRL_ref 40 U/L) for banding when the lab's own range is unavailable; prefer the lab's own reference; show the framework used. [P3,P4,P5,P7]
```

## 0.5 Source-localisation / companion hints — [A]+[C] — REUSED cross-biomarker (SCL-010) + inheritance (SCL-016/017/018/019/021)
```
SOURCE-LOCALISATION INTERPRETATION (pattern hints, NOT diagnoses; require companions; confidence inherits lower input): [R4,R9]
  ALP↑ + GGT↑                                         → HEPATOBILIARY-source PATTERN (cholestatic direction; ACG: >1.5×ULN + GGT↑ → imaging route). [P9,P16]
  ALP↑ + normal GGT                                   → BONE-source PATTERN (high ALP + normal GGT essentially excludes liver/bile-duct; check vitamin D). [P9,P19]
  ALP↑ + ALT↑/AST↑ (hepatocellular context)           → mixed/hepatocellular context — read with GGT and the R-ratio (via SCL-021). [P14]
  ALP↑ + normal GGT + low vitamin D                   → bone-turnover (vitamin D-related) direction PATTERN. [P19]
  ALP↑ in a child/adolescent or pregnancy             → PHYSIOLOGICAL (growth / placental) PATTERN — reassure/route; do NOT over-flag. [P11,P12]
  ALP LOW (< low threshold)                           → mineralisation/mineral/thyroid direction PATTERN (hypophosphatasia / zinc-magnesium / hypothyroidism / malnutrition). [P17]
GGT UNAVAILABLE: localisation limited → note 5-nucleotidase (5-NT) or ALP isoenzyme fractionation (liver vs bone vs intestine vs placenta) or vitamin D as clarifiers; reduce confidence. [P10]
GOVERNANCE: emit a source-localisation read ONLY with the relevant companions (esp. GGT); else screen-level (source-unknown) + confidence limitation. NEVER a diagnosis; RANK source then cause (§0.2). [R7,R9]
NOTE: ALP alone cannot diagnose a condition; it is a physiological enzyme whose SOURCE, not mere elevation, carries the meaning. [P20]
```

## 0.6 Confidence hierarchy (four-level) + inheritance — [C] — REUSED (SCL-010 + SCL-016/017/018/019/021)
```
STANDARD          : clear ALP AND GGT available (source localisable) AND age/life-stage known AND no unexcluded physiological/pre-analytic confound.
REDUCED           : single value / near a boundary / low-threshold-or-reference overlay uncertain / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : elevated ALP with NO GGT (source not localisable) OR unexcluded confound (child growth / pregnancy / recent meal / recent fracture) → screen-level (source-unknown) + request GGT/vitamin D/repeat; name what's needed. [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / physiological growth or pregnancy rise / suspected bone vs liver unresolved without GGT → explained abstention. [R2,P11,P12]
INHERITANCE: the ALP source-localisation (ALP+GGT) verdict inherits the LOWER confidence of ALP and GGT; GGT absent → localisation limited to a screen-level statement (5-NT/isoenzyme/vitamin D noted). [R9]
Reduced confidence does NOT auto-block; significant uncertainty MAY justify abstention. New borderline value → prefer REPEAT (with GGT), using the person's own prior values by the same method where possible. [P23]
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  ALP is NOT a diagnosis. NEVER emit "liver disease", "cirrhosis", "biliary obstruction", "cholestasis", "PBC/PSC", "gallstones", "bone disease", "Paget disease", "osteomalacia", "rickets", "hyperparathyroidism", "bone metastases/metastatic disease", "cancer", or any condition as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  ALP is a marker of hepatobiliary & bone PHYSIOLOGY; an elevated value REQUIRES source localisation; total ALP does NOT distinguish source → interpret WITH GGT/context; NEVER in isolation. [B3][P2,P20]
S3  Emit a source-localisation read ONLY with the relevant companions (esp. GGT); else screen-level (source-unknown) + confidence limitation (inheritance). [R9]
S4  On abnormal ALP with ≥2 plausible explanations → RANK source first (hepatobiliary vs bone vs physiological), then cause; NEVER assert one. [R3]
S5  Life-stage aware: apply PAEDIATRIC/GROWTH (2–5×; age-specific) and PREGNANCY (2–3× placental) physiological handling; never over-flag a child's or pregnancy's high ALP; apply age-specific LOWER limits in children (low ALP can hide in the adult range). [P11,P12,P13]
S6  Genuinely TWO-SIDED: flag LOW ALP (mineralisation/mineral/thyroid direction) as well as high; low ALP should not be ignored (esp. with unexplained fractures). [P17,P18]
S7  New/isolated abnormal value → suggest REPEAT (with GGT), after excluding physiological (growth/pregnancy), pre-analytic (recent meal), and recent-fracture confounds; use the person's own prior values by the same method. [P22,P23]
S8  Companions (GGT/ALT/AST/Bilirubin/vitamin D) unavailable → confidence limitation, not invented certainty; note 5-NT/isoenzyme/vitamin D as clarifiers. [R4,P10]
S9  Never recommend treatments/medication changes/doses (e.g. UDCA, bisphosphonates, vitamin D dosing, stopping a prescribed medicine); never produce a numeric liver/bone-disease-risk %; medication questions → educate + refer. [D]
S10 RED FLAGS (markedly elevated ALP, esp. >1.5×ULN localised to liver by GGT; a hepatobiliary/cholestatic pattern (ALP+GGT); a bone pattern with very high ALP (Paget-range); ALP with jaundice or systemic symptoms; persistent low ALP with fractures) → calm prompt healthcare review (ACG: ALP >1.5×ULN + GGT↑ → ultrasound); never emergency-diagnose. [P16,P15,P18][D]
S11 Never present a BioSense band, reference range, optimal target, or source pattern as a medical/diagnostic boundary.
S12 Represent reference-range disagreement (44–147 / 35–125 / 40–129 M–35–104 F / 38–113) and low-threshold (30 vs 40) disagreement; NEVER average thresholds. [P3-P7,P18][R5]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & COMPANIONS (the key ALP move): ALWAYS localise with GGT (SCL-021, primary) + ALT (SCL-014) / AST (SCL-015) / future Bilirubin (SCL-023) / vitamin D (SCL-011) / future calcium/phosphate; apply life-stage (growth/pregnancy) & bone-context overlays; for a NEW borderline value, REPEAT (with GGT) after excluding physiological/pre-analytic confounds. [P9,P19,P23]
Tier 2 LIFESTYLE (context-appropriate): general liver- & bone-wellness (vitamin D sufficiency, nutrition incl. zinc/magnesium, weight-bearing activity, not smoking) — framed as education, not treatment; note children's/pregnancy's high ALP is normal, and a mild isolated elevation is often benign once localised. [P19,P11,P12]
Tier 3 HEALTHCARE DISCUSSION (calm) when: ALP >1.5×ULN localised to liver by GGT (ACG imaging route) | a cholestatic (ALP+GGT) pattern | a very high (Paget-range) bone pattern | ALP with jaundice/systemic symptoms | persistent low ALP (esp. with fractures). [P16,P15,P18][D]
NEVER a specific treatment, medication change, or dose at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → life-stage (growth/pregnancy) overlay → ALP band (two-sided; ×ULN high) + source localisation (if GGT) → template; RANKED source-then-cause where abnormal; ALWAYS "read with GGT/the liver & bone picture".
OPTIMAL_WELLNESS / WITHIN_REFERENCE (+ normal GGT) → affirming, with the "screen + localise with GGT" caveat.
LOW_NORMAL_WATCH / BORDERLINE_HIGH_WATCH → calm; near reference / threshold-disagreement zone; localise/context; repeat if borderline.
LOW_FLAG → constructive; low direction (mineralisation/mineral/thyroid); don't ignore (esp. with fractures); context.
ELEVATED_FLAG / HIGH_FLAG / MARKED_HIGH_FLAG → constructive; localise source (GGT); ranked causes; repeat; ALWAYS "not a diagnosis".
hepatobiliary pattern (ALP+GGT), very high bone pattern, jaundice/systemic symptoms, persistent low with fractures → calm prompt healthcare review; never alarm, never diagnose.
child/adolescent or pregnancy → physiological (growth/placental) rise; reassure/route.
GGT unavailable → source-unknown screen-level statement + confidence limitation; name that GGT (or 5-NT/isoenzyme/vitamin D) localises it.
Never "normal/abnormal" as a verdict; never a diagnosis (liver disease/biliary obstruction/bone disease/Paget/metastatic disease).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "ALP comes mainly from your liver and your bones, and a standard test can't tell which — so it's read
      together with GGT (which points to liver when it's also raised, and to bone when it's normal) and your
      wider context."
CAV3 (screen/no GGT) "On its own, a raised ALP doesn't say whether it's coming from your liver or your bones.
      GGT is the usual next step to localise it (5-nucleotidase, ALP isoenzymes or vitamin D can help too), so
      we'd interpret this more confidently with it."
CAV4 (reduced/context) name the context reducer(s) or missing companion (GGT, ALT, AST, bilirubin, vitamin D, age/life-stage, pregnancy, recent fracture, fasting state).
CAV5 (new/borderline) "ALP shifts with growth, pregnancy, a recent meal, a healing fracture, vitamin D and lab
      method, so a single out-of-range value is usually best repeated (with GGT), ideally compared to your own
      previous results, before reading much into it."
CAV6 (abnormal, ranked) "Because a raised ALP can come from either the liver or bone, we've noted the more
      likely source and explanations for your context rather than pointing to one — best confirmed with a professional."
CAV7 (cholestatic / very-high bone / jaundice / persistent low) "This pattern is worth a prompt, unhurried
      conversation with a healthcare professional."
CAV8 (child/adolescent) "In children and teenagers, ALP is naturally much higher because bones are growing, so
      a high result at that age is usually expected rather than a concern."
CAV9 (pregnancy) "In pregnancy, ALP naturally rises — often two to three times — because the placenta makes it,
      so pregnancy results are read in that light."
CAV10 (low ALP) "A low ALP is worth noting too — it can relate to minerals like zinc or magnesium, thyroid, or
       bone-mineral handling — and it shouldn't simply be ignored, especially alongside unexplained fractures."
CAV11 (reference/lab) "ALP reference ranges differ a lot between labs, methods and ages, so we compare against
       your own lab's range and, where possible, your own previous results."
```

## 0.11 Source & version identifiers
```
config_id: SCL-022   config_version: 1.0
band_id: BIOSENSE_ALP_TWOSIDED_BANDS_v1                 (Category B; genuinely two-sided; ×ULN high-side; low flag; anchors P3,P4,P5,P6,P7,P18)
reference_frameworks_id: SCL022_ALP_REFRANGES_v1        (adult reference ranges 44–147/35–125/40–129 M–35–104 F/38–113; low thresholds 30/40; P3-P7,P18; never averaged)
optimal_target_id: SCL022_ALP_OPTIMAL_v1               (wellness-optimal 50–100 / <80; evolving; P6)
lifestage_overlay_id: SCL022_ALP_LIFESTAGE_v1           (paediatric/growth 2–5×; pregnancy 2–3× placental; P11,P12,P13)
source_localisation_id: SCL022_ALP_SOURCE_LOCALISATION_v1  (cross-biomarker; parents ALP+GGT(primary)/ALT/AST/future Bilirubin/vitamin D; GGT-localisation; R4; P9,P10,P19)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1   (reused; R2)
confidence_inheritance_ref: SCL016_CONFIDENCE_INHERITANCE_v1 (reused SCL-016/017/018/019/021; R9)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1   (reused; R3 — ranked source then cause)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1     (reused; R4 — GGT/ALT/AST/future Bilirubin/vitamin D/future calcium/phosphate)
two_sided_precedent_ref: SCL016_CREATININE_v1 / SCL019_HAEMOGLOBIN_v1  (reused genuinely-two-sided structure)
enzyme_severity_precedent_ref: SCL014_ALT_v1 / SCL015_AST_v1 / SCL021_GGT_v1  (reused ×ULN high-side severity)
sex_age_preg_aware_ref: SCL004/010/016/017/018/019 posture  (reused; R8)
guideline_disagreement_ref: SCL011/012 posture           (reused; R5 — reference ranges; low thresholds; never averaged)
safety_rules_id: SCL022_SAFETY_v1                        (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Alkaline Phosphatase (ALP, Alk Phos) is <cite index="3-1">a group of phosphomonoesterases that hydrolyze phosphate esters</cite> found throughout the body, whose serum activity <cite index="3-1">is derived predominantly from hepatic, osseous, and reticuloendothelial sources.</cite> In practice, <cite index="9-1">although ALP exists throughout your body, the two main sources of ALP in your blood are your liver and bones.</cite> **[A][P1][P2]**

The defining feature for interpretation is that a standard test measures **total** ALP without saying where it
comes from — so an elevated value **requires source localisation**. Different tissues make different isoforms,
<cite index="7-1">though standard laboratory assays measure total ALP without distinguishing between sources</cite>, and the practical rule is: <cite index="6-1">a GGT test distinguishes the two: if GGT is also high, the liver is the source; if GGT is normal, bone is the source.</cite> This is exactly why ALP is read **with** GGT (and the wider liver panel, vitamin D, and bone/mineral context), never alone — an <cite index="9-1">ALP test alone cannot diagnose a condition.</cite> **[A][P2][P9][P20]**

ALP is also strongly **life-stage dependent**: <cite index="3-1">physiologic bone growth in children increases serum activity to 2 to 5 times the levels observed in adults, and placental ALP causes 2- to 3-fold elevations during the second and third trimesters of normal pregnancy.</cite> And it is genuinely **two-sided** — a low value carries its own meaning. So BioSense reads ALP **with its companions**, in context, localises the source, and names no condition. **[B][B2][P11][P12]**

- **Reported in:** U/L (≡ IU/L; enzyme activity; no mass factor — as for GGT/ALT/AST). **[A][P8]**
- **Nature:** hepatobiliary & bone-physiology marker; **genuinely two-sided**; **source-localised**; **never in
  isolation**; **not a diagnosis** **[A][B3]**
- **Direction:** genuinely two-sided (high = hepatobiliary/bone-turnover, severity by ×ULN; low = mineralisation/
  mineral/thyroid direction) **[A][R6]**
- **Companions:** GGT (SCL-021, **primary** localiser), ALT (SCL-014), AST (SCL-015), future Bilirubin
  (SCL-023), vitamin D (SCL-011), future calcium/phosphate **[A][P9][P19]**
- **BioSense role:** a context-first, GGT-localised hepatobiliary/bone screen with strong age/pregnancy overlays.

---

# 2. Physiological Function

ALP is a membrane-bound enzyme that removes phosphate groups from molecules at an alkaline pH. Its two main
serum sources are the **biliary epithelium** of the liver — where ALP synthesis rises when bile flow is impeded
— and the **osteoblasts** of bone, where ALP is essential to bone mineralisation, so it rises whenever bone
formation/turnover increases (growth, healing, high-turnover states). Smaller amounts come from the intestine,
kidney, and — in pregnancy — the placenta. **[A][P1][P2]**

Two features define interpretation **[A]**:
- **Total ALP hides its source.** Because standard assays sum all isoforms, an elevated total does not say
  whether it is liver/biliary or bone — GGT (raised in hepatobiliary, not bone) is the primary localiser, with
  5-nucleotidase or isoenzyme fractionation as alternatives. **[A][P2][P9][P10]**
- **ALP is strongly physiological and life-stage-driven.** Growing children run 2–5× adult levels, pregnancy
  raises it 2–3× (placental), and even a recent meal adds intestinal ALP — so life-stage and context are
  essential before interpretation. **[A][P11][P12][P22]**

---

# 3. Scientific Background

Three scientific themes shape how BioSense represents ALP. **[A]**

**First, ALP means little without source localisation.** <cite index="2-1">ALP exists in multiple distinct isoforms produced by different tissues; in most clinical situations, checking GGT alongside ALP is sufficient to determine whether the source is hepatic or bone.</cite> The rule is central: <cite index="2-1">high ALP with normal GGT essentially rules out a liver or bile duct source</cite>, pointing instead to bone (where the practical first step is often <cite index="2-1">checking 25-OH vitamin D</cite>). Where GGT is unavailable or ambiguous, <cite index="2-1">5-nucleotidase is another liver-specific enzyme that, like GGT, is not elevated in bone disease.</cite> BioSense therefore treats ALP **plus its localising companions and context** as the unit of interpretation. **[A][P9][P10][P19]**

**Second, the reference ranges genuinely differ.** The <cite index="3-1">most commonly used method produces a reference range of 35 to 125 IU per liter in an adult population</cite>, while other labs cite <cite index="1-1">44–147 IU/L</cite>, sex-specific <cite index="4-1">40-129 U/L for men, 35-104 U/L for women</cite>, and the IFCC adult range 38–113. Crucially, <cite index="3-1">reference ranges vary widely with methodology</cite> and <cite index="3-1">comparison with preestablished values by the same method in an individual may be the most useful reference.</cite> BioSense **presents these frameworks side by side and never averages them.** **[A][P3][P4][P5][P7][P25]**

**Third, ALP is genuinely two-sided and easily confounded.** On the high side, <cite index="6-1">a high ALP most commonly indicates either cholestatic liver disease or increased bone turnover</cite>; on the low side, <cite index="6-1">persistently low ALP (below 30 IU/L in adults) may indicate zinc or magnesium deficiency, hypothyroidism, pernicious anemia, celiac disease, Wilson disease, or hypophosphatasia</cite>, and <cite index="6-1">low ALP should not be ignored, especially in patients with unexplained fractures.</cite> A single value is best read with GGT and, if borderline, repeated against the person's own prior results. **[A][P17][P18][P23]**

**The wellness reading — [B]:** ALP is a context-first, GGT-localised, genuinely two-sided hepatobiliary/bone
screen — read with GGT (primary), ALT/AST/future bilirubin, and vitamin D/bone context, with strong age/growth
and pregnancy overlays, the source ranked before the cause, reference disagreement shown honestly, borderline
values repeated (ideally against the person's own history) before they count, and no condition named.

**An honest boundary — [E]:** ranges are contested and method/age-dependent, total ALP hides its source, and it
is strongly physiological (growth, pregnancy, meals) — so BioSense leans on GGT-localisation and context and is
explicit about confidence. **[E][P25][P2]**

---

# 4. Why ALP Matters

**1. It screens two systems at once — hepatobiliary and bone. [A][P2]** A single enzyme that reflects bile-duct
health and bone turnover is a high-value, dual-purpose wellness screen. **[A]**

**2. Localised with GGT, it separates liver from bone. [A][P9]** The ALP+GGT pair is one of the most useful
localisation steps in routine biochemistry — the difference between a bare number and an interpretation. **[A]**

**3. Read in context, it reflects growth, pregnancy, vitamin D and mineral status. [A][P11][P19]** ALP tracks
normal growth and pregnancy, flags vitamin D-related bone turnover, and — on the low side — mineral/thyroid/
mineralisation status; rich wellness context when read correctly. **[A][P17]**

**Why BioSense measures it — [C]:** ALP is a high-value, dual-source, genuinely two-sided screen whose meaning is
multi-marker and life-stage-dependent — the ideal case for Context-First interpretation, cross-biomarker
intelligence (GGT-localisation), confidence inheritance, sex/age/pregnancy-aware banding, ranked explanations,
and guideline-disagreement handling, all while never diagnosing liver disease, a biliary obstruction, bone
disease, Paget disease, or metastatic disease.

---

# 5. Laboratory Measurement

ALP is measured on an automated analyser (part of the liver-function panel and metabolic panels), reported in
**U/L (≡ IU/L)** as an **enzyme activity**. **[A][P1][P8]**

- **Units.** U/L is canonical; U/L ≡ IU/L (activity, not mass) — the same enzyme-activity unit as GGT/ALT/AST;
  no lipid/glucose/vitamin/creatinine/thyroid/haemoglobin factor applies. **[A][P8]**
- **Localise with GGT.** An elevated ALP is interpreted with **GGT** (primary) — and, where needed, 5-NT or ALP
  isoenzyme fractionation — plus ALT/AST, bilirubin, and vitamin D; never in isolation. **[A][P9][P10]**
- **Life-stage matters.** Children/adolescents run 2–5× adult levels (age-specific ranges); pregnancy 2–3×
  (placental) — physiological, not flagged as disease. **[A][P11][P12][P13]**
- **Pre-analytic.** Fasting is preferred (food stimulates intestinal ALP, especially blood types B/O). **[A][P22]**
- **Trend.** Intra-individual variation is much smaller than inter-individual, so the person's **own prior
  values by the same method** are often the most useful comparison. **[A][P23]**
- **Companion panel.** Read with **GGT** (liver-vs-bone localisation), **ALT/AST** (hepatocellular context), the
  future **Bilirubin** (cholestasis/jaundice), **vitamin D** (bone-turnover context), and the future **calcium/
  phosphate** (bone-mineral context). **[A][P9][P19]**

---

# 6. Units

- **U/L** — standard; **BioSense canonical unit.** **[A/C]**
- **IU/L** — international units; **U/L ≡ IU/L** (enzyme activity = amount catalysing 1 µmol substrate/min per L). **[A][P8]**
- **No analyte-specific mass-conversion factor** applies — ALP is an **enzyme activity**, like GGT, ALT and AST
  (SCL-021/014/015); it carries **no** factor of the cholesterol (38.67), triglyceride (88.57), creatinine
  (88.4), glucose (18.0), 25(OH)D (2.496), B12 (0.738), folate (2.266), Free T4 (12.87), or haemoglobin
  (÷1.611) kind, and is not a cell count (unlike WBC). **[A][C]**

BioSense stores the reported value, unit, sex, age/life-stage, pregnancy/trimester, and any companions
unchanged, and evaluates the source localisation and overlays. **[C]**

---

# 7. Unit Conversion

```
U/L  ≡  IU/L            [P8]   (enzyme activity; no mass conversion)
(no analyte-specific factor; the companion enzymes GGT/ALT/AST are separate activities in the same U/L unit — SCL-021/014/015)
```
Worked check: ALP 90 U/L = 90 IU/L. **[A][P8]**

**Safety rule [D]:** ALP uses the U/L ≡ IU/L enzyme-activity equivalence; never apply a lipid/glucose/vitamin/
creatinine/thyroid/haemoglobin factor, and never treat it as a mass concentration or a cell count. A unit-
unknown value is displayed but not interpreted; a source-localisation read requires companions (esp. GGT);
life-stage overlays are applied before banding. **[D]**

---

# 8. Measurement Limitations & the Never-In-Isolation Principle  *(Context-First basis — reused SCL-010)*

ALP's defining limitation is that **a total value does not, on its own, reveal its source** — which is why the
Context-First gate (§0.2), the source-localisation layer (§0.5), and the ranked source-then-cause output apply.
**[A][B2]**

## 8.1 ALP needs source localisation — [A]
A raised total is a starting point; GGT (primary), with 5-NT/isoenzymes/ALT/AST/bilirubin/vitamin D, localises
it (hepatobiliary vs bone). ALP is never interpreted in isolation. **[A][P9][P10]**

## 8.2 It is strongly physiological — [A]
Growth (children 2–5×), pregnancy (2–3× placental), and even a recent meal (intestinal ALP) raise it entirely
normally; life-stage and context are essential. **[A][P11][P12][P22]**

## 8.3 Ranges are contested — [A]
Adult reference ranges differ by method/lab/age; low thresholds differ (30 vs 40) — shown as frameworks, never
averaged; the person's own prior values by the same method are often the best comparison. **[A][P4][P18][P23]**

## 8.4 It is genuinely two-sided — [A]
Both a **high** ALP (hepatobiliary/bone-turnover) and a **low** ALP (mineralisation/mineral/thyroid) are
meaningful; low ALP should not be ignored, especially with unexplained fractures. **[A][P17][P18]**

**How BioSense uses this — [C][D]:** the Context-First gate runs first; ALP is banded genuinely two-sided (a
×ULN high-side gradient plus a low flag) with life-stage overlays; the source is localised only with companions
(esp. GGT — else screen-level, source-unknown, + limited confidence); plausible explanations are **ranked
(source then cause), not asserted**; the physiological (growth/pregnancy), pre-analytic (meal), and low-ALP
nuances are surfaced; missing GGT/context sets Context-Required/Reduced confidence; and no condition is ever
named.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010; pattern inheritance via SCL-016/017/018/019/021)*

ALP consumes its localising and context markers where available. **[A][C]**

- **GGT (SCL-021) — the PRIMARY localiser. [A]** A raised ALP **with** a raised GGT → hepatobiliary source; a
  raised ALP with a **normal** GGT → bone source. This single pairing is the heart of ALP interpretation, and it
  is the same ALP+GGT logic already specified from the GGT side in SCL-021. **[A][P9]**
- **ALT (SCL-014) / AST (SCL-015). [A]** Hepatocellular context; help place an ALP+GGT hepatobiliary pattern
  (cholestatic vs mixed) and the R-ratio (via SCL-021). **[A][P14]**
- **Future Bilirubin (SCL-023). [A]** Adds the cholestatic/jaundice dimension to an ALP+GGT hepatobiliary
  pattern — context, routed, not diagnosed. **[A][P14]**
- **Vitamin D (SCL-011). [A]** For a high-ALP/normal-GGT **bone** pattern, low vitamin D (increased bone
  turnover) is the common practical explanation — the first thing BioSense reads alongside. **[A][P19]**
- **Future calcium / phosphate. [A]** Bone-mineral context for a bone-source or low-ALP (mineralisation)
  pattern. **[A][P15][P17]**
- **(Context) life-stage, recent fracture, medications, fasting state. [A]** Interpretation context that moves
  ALP physiologically, never something BioSense advises changing beyond general wellness. **[A][P11][P22]**

**Cross-biomarker rule [C] (reused R4/R9):** where these are **available**, BioSense consumes them (with the
source-localisation and confound caveats) to sharpen the read and confidence; where **unavailable** — especially
**GGT** (without which the source cannot be confidently localised) — it records a **confidence limitation**,
notes 5-NT/isoenzymes/vitamin D as clarifiers, and names what would help, never inventing certainty. **[C][R4][R9]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **ALP's two main serum sources are liver (biliary epithelium) and bone (osteoblasts); total ALP doesn't
  distinguish them.** **[A][P2]**
- **GGT localises a raised ALP: raised GGT → liver; normal GGT → bone (5-NT/isoenzymes as alternatives).** **[A][P9][P10]**
- **Children run 2–5× adult ALP (growth); pregnancy 2–3× (placental) — physiological.** **[A][P11][P12]**
- **High ALP → cholestatic liver or increased bone turnover; low ALP is genuinely meaningful.** **[A][P14][P15][P17]**
- **ALP alone cannot diagnose a condition.** **[A][P20]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **Adult reference ranges: 44–147; 35–125 (most-common method); 40–129 M / 35–104 F; 38–113 (IFCC).** **[A][P3][P4][P5][P7]**
- **Optimal/functional targets: 50–100 U/L / <80 U/L.** **[A][E][P6]**
- **Low thresholds: below 40 U/L / below 30 IU/L.** **[A][P18]**
- **Why:** ALP methods, substrates and buffers (AMP vs others) differ, ranges are strongly age/sex-dependent, and
  wellness targets are newer than the diagnostic ranges. BioSense **presents the differing frameworks and never
  averages them** (reused R5). **[A][E][P25]**

## 10.3 Strength of evidence
- **Sources/isoforms, GGT-localisation, paediatric/growth & pregnancy rises, high/low cause lists: established.** **[A][P2][P9][P11][P17]**
- **ACG >1.5×ULN + GGT → ultrasound; Paget/obstruction severity (×ULN): established.** **[A][P16][P15]**
- **Exact reference-range boundaries; optimal/low targets: evolving/method-dependent.** **[E][P4][P18]**
- **Intra-individual < inter-individual variability (own-history comparison): established.** **[A][P23]**

## 10.4 Intended populations
Thresholds target general **non-pregnant adults**, with strong **paediatric/growth**, **pregnancy**, and
**sex/age** overlays. BioSense applies them context-first, abstains or routes in growth/pregnancy physiological
rises and unlocalised elevations (no GGT), and reduces confidence where GGT or context is unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. ALP is GENUINELY TWO-SIDED (a low flag — mineralisation/mineral/
> thyroid direction — AND a high side graded by severity as a multiple of the upper reference limit —
> hepatobiliary/bone-turnover direction), CONTEXT-GATED, and NEVER interpreted in isolation: a raised total is a
> screen whose SOURCE (liver vs bone) is set by GGT and biological context, and where several explanations fit
> they are RANKED — source first, then cause — not asserted. Adult reference ranges genuinely DIFFER across
> methods/labs/ages and are shown, never averaged. Never a diagnosis of liver disease, biliary obstruction, bone
> disease, Paget disease, or metastatic disease.**

## 11.1 The ALP wellness bands (U/L; general non-pregnant adult; after context gate; read with GGT)

Bands use an **adult reference window** (ULN_ref default 120 U/L; LRL_ref default 40 U/L; the lab's own range is
preferred where available; frameworks never averaged). High-side severity is expressed as a **multiple of
ULN_ref (×ULN)**, mirroring the frozen GGT/ALT/AST structure; the low side carries a genuine flag, mirroring the
two-sided Creatinine/Haemoglobin structure.

| BioSense Wellness Interpretation | ALP (U/L) | Evidence anchor | Wellness meaning (context-first, source-localised; no diagnostic label) |
|---|---|---|---|
| **Low — Flag** | < 30 | Low direction [P17][P18] | Mineralisation/mineral/thyroid direction (hypophosphatasia / zinc-magnesium / hypothyroidism / malnutrition); don't ignore, esp. with fractures. |
| **Low-Normal — Watch** | 30 – < 40 | Low-threshold disagreement [P18] | Low end; labs differ on the lower limit (30 vs 40); read with context. |
| **Optimal (Wellness)** | 40 – 100 | Wellness-optimal [P6] | Wellness-optimal window (with normal GGT → healthy bile-duct function). |
| **Within Reference** | > 100 – ULN_ref | Upper reference [P3][P4][P7] | Upper reference (ULN differs by lab, ~113–147). |
| **Borderline High — Watch** | > ULN_ref – 1.5×ULN_ref | Mild elevation [P16] | Mild elevation; localise with GGT (ACG: >1.5×ULN + GGT↑ → imaging route). |
| **Elevated — Flag** | > 1.5×ULN_ref – 3×ULN_ref | Clearer elevation [P14][P15] | Localise source (hepatobiliary vs bone); rank causes. |
| **High — Flag** | > 3×ULN_ref – 5×ULN_ref | Marked elevation [P14][P15] | Hepatobiliary (obstruction) or bone (Paget) pattern; route. |
| **Marked High — Flag** | > 5×ULN_ref | High elevation [P15][P14] | Markedly elevated (Paget 5–25×; obstruction 10–20×); localise + prompt review. |

*(Genuinely two-sided: a low flag AND a graded high side. Read with GGT (primary localiser) + ALT/AST/future
bilirubin/vitamin D; the source sets the meaning (§11.4). Life-stage overlays (children 2–5×; pregnancy 2–3×)
modify interpretation (§11.2). Ranges differ across methods/labs/ages; shown, never averaged (§11.5). U/L ≡
IU/L.)*

## 11.2 Life-stage, sex & reference overlays [A][B]
- **Children & adolescents:** ALP runs **2–5× adult** during growth (peaks in infancy and puberty); use
  **age-specific paediatric ranges**, never adult high bands; and apply **age-specific lower limits** (a low ALP
  in a child can sit inside the adult range). **[A][P11][P13]**
- **Pregnancy:** **2–3×** rise in the 2nd/3rd trimesters (placental ALP) → physiological; do not read as
  hepatobiliary/bone disease. **[A][P12]**
- **Sex:** modest sex differences in adults (e.g. men 40–129 / women 35–104 U/L); use the sex-specific range
  where the lab provides it. **[A][P5]**
- **Ageing / bone turnover:** ALP may run a little higher with age-related bone turnover — context, not
  automatically a flag. **[A][P23]**

## 11.3 How the bands were derived — transparency [B]
- The bands use an **adult reference window** (LRL 40 / ULN 120 default) with a **wellness-optimal** zone
  (40–100), a **low flag** (<30, with a 30–40 watch reflecting the threshold disagreement), and a **×ULN high-
  side gradient** (>1.5× borderline/ACG-imaging; 1.5–3× elevated; 3–5× high; >5× marked, spanning the Paget
  5–25× and obstruction 10–20× ranges). **[P3][P4][P6][P15][P16][P18]**
- **No number was averaged.** The differing reference-range frameworks and low thresholds are presented
  distinctly (§11.5). **[R5]**
- ALP is **genuinely two-sided** — unlike the high-dominant GGT, it carries **both** a low flag and a graded high
  side. **[P17]**

## 11.4 The source-localisation (companion) pattern (the unit of interpretation) [A][B]
| ALP | Companion pattern | Pattern hint (NOT a diagnosis) | Anchor |
|---|---|---|---|
| ↑ | + GGT↑ | Hepatobiliary-source (cholestatic direction); >1.5×ULN → imaging route (ACG) | P9, P16 |
| ↑ | + normal GGT | Bone-source (high ALP + normal GGT excludes liver/bile duct); check vitamin D | P9, P19 |
| ↑ | + ALT↑/AST↑ | Mixed/hepatocellular context — read with GGT & the R-ratio (SCL-021) | P14 |
| ↑ | + normal GGT + low vitamin D | Bone-turnover (vitamin D-related) direction | P19 |
| ↑ | child/adolescent OR pregnancy | Physiological (growth / placental) — reassure/route | P11, P12 |
| low | (< low threshold) | Mineralisation/mineral/thyroid direction (hypophosphatasia / zinc-magnesium / hypothyroidism / malnutrition) | P17 |

The pattern is emitted **only with the relevant companions** (GGT unavailable → localisation limited, note
5-NT/isoenzyme/vitamin D), inherits the lower input confidence, ranks source then cause, and **names no
condition** (§0.5, §12). **[A][B][R4][R9]**

## 11.5 Guideline-disagreement display (reused posture) [B][C]
Where relevant, BioSense shows the differing adult reference ranges (44–147 / 35–125 / 40–129 M–35–104 F /
38–113), the optimal targets (50–100 / <80), and the low thresholds (30 vs 40) as distinct frameworks — **never
averaged** (CAV11). **[B][C][R5][P3][P18]**

## 11.6 Context-gate precedence [D]
No band or source pattern is emitted as a verdict without the Context-First evaluation (§0.2). Life-stage
(growth/pregnancy), GGT-localisation, vitamin D/bone context, and pre-analytic state are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general non-pregnant adult**, read **with GGT**. Reference limits are contested and method/lab/
age-dependent; ALP is strongly physiological (growth, pregnancy, meals) and total ALP hides its source.
Paediatric/growth and pregnancy use separate handling (§11.2). **[E][P25][P2]**

---

# 12. Interpretation Framework — CONTEXT-FIRST + NEVER-IN-ISOLATION (reused SCL-010 cross-biomarker + SCL-016/017/018/019/021 inheritance)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010), cross-biomarker
> intelligence (SCL-010), and confidence inheritance (SCL-016/017/018/019/021), and follows the frozen GGT
> localisation logic (SCL-021) and two-sided precedent (SCL-016/019). ALP is interpreted as a context-dependent,
> GGT-localised hepatobiliary/bone screen, never a diagnosis, and never in isolation. No new methodology is
> introduced.** **[C][R1][R4][R9]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1][B3]
   gather context (companions: GGT (SCL-021, PRIMARY), ALT (SCL-014), AST (SCL-015), future Bilirubin (SCL-023),
   vitamin D (SCL-011), future calcium/phosphate; life-stage: pregnancy/trimester, adolescence/growth, ageing;
   bone turnover; recent fracture; medications; fasting state).                                     [R4]
   → if material context changes meaning, interpret WITHIN it; if key context/GGT unavailable, record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit U/L [IU/L]; result final) → else display-only/flag.
STEP 2 — ELIGIBILITY / LIFE-STAGE / SEX: non-pregnant adult → apply bands; child/adolescent → age-specific paediatric ranges (2–5×) + route; pregnancy → placental-rise handling (2–3×) + route; use sex-specific range where provided. [P11,P12,P13]
STEP 3 — CONFIDENCE (four-level + inheritance): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED; source-localisation inherits lower of ALP/GGT (§0.6). [R2,R9]
STEP 4 — BAND: assign the genuinely two-sided band (low flag + ×ULN high side, §11.1) with life-stage/sex overlay. [R6,R8]
STEP 5 — SOURCE LOCALISATION: if GGT present, localise (hepatobiliary vs bone, §11.4); else screen-level (source-unknown) + note 5-NT/isoenzyme/vitamin D. [R4,P9,P10]
STEP 6 — RANKED SOURCE-THEN-CAUSE: abnormal with ≥2 plausible explanations → Possible Explanation A/B/C, ranked (source first: hepatobiliary vs bone vs physiological; then cause). [R3]
STEP 7 — REPEAT: new abnormal value → suggest REPEAT (with GGT) after excluding physiological (growth/pregnancy), pre-analytic (meal), and recent-fracture confounds; compare to the person's own prior values. [P22,P23]
STEP 8 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); route where appropriate; NO diagnosis. [R7]
```

**Core interpretive stance [B]:** ALP is a context-first, GGT-localised, genuinely two-sided hepatobiliary/bone
screen — read with GGT (primary), ALT/AST/future bilirubin and vitamin D/bone context, with strong age/growth
and pregnancy overlays, the source ranked before the cause, reference disagreement shown honestly, borderline
values repeated (ideally against the person's own history) before they count, and no condition named. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy + inheritance — reused SCL-010 + SCL-016/017/018/019/021)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear ALP AND GGT available (source localisable) AND age/life-stage known AND no unexcluded physiological/pre-analytic confound | Band + source localisation + ranked source-then-cause normally |
| **REDUCED** | Single value / near a boundary / low-threshold-or-reference overlay uncertain / minor context | Band cautiously; prefer repeat; name the reducer (CAV4/CAV5) |
| **CONTEXT_REQUIRED** | Elevated ALP with no GGT (source not localisable) OR unexcluded confound (child growth / pregnancy / recent meal / recent fracture) | Screen-level (source-unknown) + request GGT/vitamin D/repeat; name needed context (CAV3/CAV6) |
| **ABSTAINED** | Significant uncertainty / conflicting signals / physiological growth or pregnancy rise / bone-vs-liver unresolved without GGT | Explained abstention; route |

**Inheritance (reused SCL-016/017/018/019/021):** the ALP source-localisation (ALP+GGT) verdict inherits the
**lower** confidence of its inputs; if GGT is unavailable, ALP is limited to a **screen-level (source-unknown)**
statement (5-NT/isoenzyme/vitamin D noted), not asserted. **[R9]**

Reducers/context inputs: GGT absent (source not localisable) [P9]; single value / method variability [P25];
physiological rise (growth/pregnancy) [P11][P12]; recent meal (intestinal ALP) [P22]; recent fracture [P15];
near a band boundary. **[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant uncertainty
**may** justify abstention; a new abnormal value prefers a **repeat** framing (with GGT, ideally against the
person's own prior results). **[R2][P23]**

---

# 14. Wellness Interpretation  *(context-first, GGT-localised, two-sided, ranked source-then-cause)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate. Wellness, not medical;
**never a diagnosis**; always **read with GGT / the liver & bone picture**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal (Wellness) / Within Reference** *(40–ULN; normal GGT).* "Your ALP
  — an enzyme from your liver and bones — sits in a favourable range, and with a normal GGT there's nothing here
  that stands out. It's a single snapshot, best read with GGT, but this looks settled." **[B]**
- **BioSense Wellness Interpretation: Low-Normal / Borderline High — Watch** *(30–<40, or ULN–1.5×ULN).* "Your
  ALP is {toward the low end / mildly raised}, and labs differ a little on where the lines sit. That's often just
  context — for a mild rise we'd localise it with GGT; for a low value we'd note minerals and thyroid — and
  repeat if borderline." Calm; context; **no diagnosis** (CAV2, CAV5, CAV11). **[B][D]**
- **BioSense Wellness Interpretation: Low — Flag** *(<30).* "Your ALP is on the low side. That's worth noting —
  it can relate to minerals like zinc or magnesium, thyroid, nutrition, or bone-mineral handling — and it
  shouldn't simply be ignored, especially alongside unexplained fractures." Constructive; **no diagnosis**
  (CAV10). **[B][D][P17][P18]**
- **BioSense Wellness Interpretation: Elevated / High / Marked High — Flag** *(>1.5×ULN).* "This is more clearly
  raised. Because a raised ALP can come from either your liver or your bones, the key step is GGT: raised
  alongside points to the liver, normal points to bone (where vitamin D is often the thing to check). We've noted
  the more likely source and explanations for your context rather than one, and a repeat with GGT is sensible."
  Constructive; **no diagnosis** (CAV3, CAV6, CAV7). **[B][D]**
- **BioSense Wellness Interpretation: hepatobiliary (ALP+GGT) / very-high bone pattern / jaundice / persistent
  low.** Calm routing: "This pattern is worth a prompt, unhurried conversation with a healthcare professional,
  who can look at the fuller picture. The numbers alone don't diagnose anything." **No alarm, no diagnosis**
  (CAV7). **[B][D][P15][P16]**
- **Child / adolescent.** "In children and teenagers, ALP is naturally much higher because bones are growing, so
  a high result at that age is usually expected." Reassure/route (CAV8). **[B][D][P11]**
- **Pregnancy.** "In pregnancy, ALP naturally rises — often two to three times — because the placenta makes it,
  so pregnancy results are read in that light." Route (CAV9). **[B][D][P12]**

**Source-localisation modifier:** where GGT is available, present the source (hepatobiliary vs bone) as
**context**; where GGT is absent, give a **screen-level (source-unknown)** statement and name that GGT (or
5-NT/isoenzyme/vitamin D) localises it (CAV3). The localisation confidence **inherits the lower** input (§0.6).
**[D][R4][R9]**

**Ranked source-then-cause modifier (reused):** on any abnormal ALP with ≥2 plausible explanations, present
**Possible Explanation A/B/C** ordered by evidence + context — **source first** (hepatobiliary vs bone vs
physiological), then cause — never a single certain cause, never a named condition. **[D][R3]**

**Life-stage/sex overlay modifier:** apply the paediatric/growth (2–5×; age-specific), pregnancy (2–3×
placental), and sex-specific handling; never over-flag physiological variation, and apply age-specific lower
limits in children (CAV8, CAV9). **[D][P11][P12]**

**Context-unavailable modifier:** where **GGT** (or life-stage/vitamin D/pre-analytic context) is missing, state
the confidence limitation and name what would clarify (CAV3/CAV4); never invent certainty (S8). **[D][R4]**

Every interpretation pairs the band and source with context guidance (§17) and the mandatory caveats (§0.10).
**None diagnoses liver disease, a biliary obstruction, bone disease, Paget disease, or metastatic disease, none
asserts a single cause, and none treats a BioSense band or source pattern as a medical boundary.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for ALP).** Elevated ALP with **no GGT** (source not localisable) or an
  unexcluded confound (child growth / pregnancy / recent meal / recent fracture) → screen-level (source-unknown)
  + request GGT/vitamin D/repeat; state what's needed (§13, CAV3/CAV6). **[D][R2]**
- **15.2 Children & adolescents.** ALP runs 2–5× adult during growth (age-specific ranges); a high result is
  usually physiological — do not apply adult bands; and use age-specific **lower** limits (a low ALP can hide in
  the adult range). **[D][P11][P13]**
- **15.3 Pregnancy.** Placental ALP raises it 2–3× in the 2nd/3rd trimesters → physiological; a value read
  against non-pregnant bands would over-flag — route. **[D][P12]**
- **15.4 Unlocalised elevation (no GGT).** Without GGT, a raised ALP's source is unknown → screen-level; note
  GGT (primary), 5-NT, ALP isoenzymes, or vitamin D as the localising steps. **[D][P9][P10]**
- **15.5 Bone-turnover / vitamin D context.** A high-ALP/normal-GGT bone pattern with low vitamin D → a bone-
  turnover (vitamin D-related) wellness context, not a disease label. **[D][P19]**
- **15.6 Low ALP.** A genuinely meaningful low direction (hypophosphatasia / zinc-magnesium deficiency /
  hypothyroidism / malnutrition / pernicious anaemia) → context; don't ignore, especially with unexplained
  fractures. **[D][P17][P18]**
- **15.7 On ALP-affecting medication.** Enzyme-inducers, oral contraceptives, anabolic steroids, and some
  antibiotics can raise ALP → interpret as context; never advise changing a dose. **[D][P14][P24]**
- **15.8 Red flags.** ALP >1.5×ULN localised to liver by GGT (ACG imaging route); a cholestatic (ALP+GGT)
  pattern; a very high (Paget-range) bone pattern; ALP with jaundice/systemic symptoms; persistent low ALP with
  fractures → calm prompt healthcare review regardless of band. **[D][P16][P15][P18]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Own-history comparison beats a population range. [A]** Because intra-individual ALP variation is much
  smaller than inter-individual, the person's **own prior values by the same method** are often the most useful
  reference. **[P23]**
- **Repeat abnormal values with GGT. [A]** A new abnormal value is repeated **with GGT** (to localise), after
  excluding physiological (growth/pregnancy), pre-analytic (meal), and recent-fracture confounds, before it
  means anything. **[P22][P23]**
- **Direction of change matters. [A]** A rising ALP localised to the liver (with GGT), or a very high/rising
  bone-source value, is what warrants review — distinct from a stable within-window value. **[P16][P15]**
- **Physiological trajectories. [A]** In children, ALP falls toward adult levels after puberty; in pregnancy it
  rises then settles postpartum — expected trends, not flags. **[P11][P12]**
- **Context/abstained points. [C]** Growth, pregnancy, recent meals, recent fractures, and context-required
  (no-GGT) points are tagged so they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For ALP, the first tier is **context and localisation** (GGT above all), then context-appropriate lifestyle.
**[A]/[B]**

## 17.1 Localisation & context first [A][P9][P19]
Where ALP is abnormal, the clarifying steps are **GGT** (primary localiser; 5-NT/isoenzymes where needed),
**vitamin D** (for a bone pattern), the **liver panel** (ALT/AST/future bilirubin), the **life-stage/pre-analytic
review** (growth, pregnancy, recent meal, recent fracture), and — for a new value — a **repeat with GGT**,
ideally against the person's own history. **[A]**

## 17.2 Liver- & bone-wellness context [A][P19]
General liver- and bone-wellness — **vitamin D sufficiency**, balanced **nutrition** (including zinc and
magnesium, relevant to low ALP), **weight-bearing activity**, and **not smoking** — is relevant context; a mild
isolated elevation is often benign once localised, and children's/pregnancy's high ALP is normal. Framed as
**education, not treatment**. **[A]**

## 17.3 Confound & exposure context [A][P22][P24]
Life-stage (growth/pregnancy), a recent meal (intestinal ALP), a healing fracture, and some medications
(enzyme-inducers, oral contraceptives, anabolic steroids, some antibiotics) are recognised context/confounds for
an abnormal ALP — useful for interpretation, **never** a prompt to stop or change a prescribed medication without
professional advice. **[A]**

## 17.4 Framing rules [B][D]
Localisation and context first (repeat for new abnormal, with GGT); **no specific treatments, medication
changes, or doses** (S9); reference-range and low-threshold disagreement shown, never averaged; calm,
evidence-informed language; never a diagnosis; the GGT-localised (CAV2), source-unknown (CAV3), child (CAV8),
pregnancy (CAV9), low-ALP (CAV10), and reference (CAV11) caveats attached where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain that ALP is a marker of hepatobiliary & bone physiology whose elevated value needs
**source localisation**; run the context-first evaluation; assign the genuinely two-sided band (low flag + ×ULN
high side) with life-stage/sex overlays; resolve the source (with inherited confidence) when GGT is present;
integrate ALT/AST/future bilirubin/vitamin D/future calcium-phosphate; present **ranked source-then-cause** for
an abnormal value; recommend a repeat (with GGT, against the person's own history); name which companions would
localise it; express context-required/abstention respectfully.

The AI layer **must never**:
- emit "liver disease", "cirrhosis", "biliary obstruction", "cholestasis", "PBC/PSC", "gallstones", "bone disease", "Paget disease", "osteomalacia", "rickets", "hyperparathyroidism", "bone metastases/metastatic disease", or "cancer" as a diagnosis — even to deny one (S1)
- interpret ALP in isolation, or emit a source-localisation read without the relevant companions (esp. GGT) (S2, S3)
- assert a single explanation for an abnormal ALP when ≥2 are plausible — rank source then cause (S4)
- ignore life-stage (apply paediatric/growth 2–5× and pregnancy 2–3× handling; age-specific ranges incl. lower limits; never over-flag physiological variation) (S5)
- treat a physiological (growth/pregnancy) or pre-analytic (recent meal) rise as disease (S5, S7)
- ignore a LOW ALP — flag the mineralisation/mineral/thyroid direction, especially with unexplained fractures (S6)
- load interpretation onto a new/isolated abnormal value without a repeat and confound exclusion (S7)
- recommend treatments, medication changes, or doses (UDCA/bisphosphonates/vitamin D dosing/stopping a medicine); produce a liver/bone-disease-risk % (S9)
- invent certainty when GGT/context is unavailable — state the limitation, note 5-NT/isoenzyme/vitamin D, inherit confidence (S8)
- fail to route red flags (ALP >1.5×ULN localised to liver by GGT; cholestatic pattern; very high bone pattern; jaundice; persistent low with fractures) calmly and promptly (S10)
- present a BioSense band, range, optimal target, or source pattern as a medical/diagnostic boundary (S11)
- average contested reference ranges (44–147/35–125/40–129 M–35–104 F/38–113) or low thresholds (30 vs 40) (S12)

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any liver, biliary, bone,
or malignant condition is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes patterns,
  never names liver disease/biliary obstruction/bone disease/Paget/metastatic disease (S1). **[D][R7]**
- **Never-in-isolation honesty.** ALP is presented as a screen whose **source** must be localised; source reads
  only with companions (esp. GGT), else screen-level (source-unknown) + inherited confidence (S2, S3, CAV2,
  CAV3). **[D][B2]**
- **Source-first ranking.** Where several explanations fit, the **source** (hepatobiliary vs bone vs
  physiological) is ranked before the cause, never reduced to one (S4, CAV6). **[D][R3]**
- **Life-stage aware.** Paediatric/growth (2–5×; age-specific, incl. lower limits) and pregnancy (2–3× placental)
  physiological handling; never over-flag (S5, CAV8, CAV9). **[D][P11][P12]**
- **Genuinely two-sided.** A **low** ALP is flagged (mineralisation/mineral/thyroid direction) and not ignored,
  especially with unexplained fractures (S6, CAV10). **[D][P17][P18]**
- **Repeat-first + own-history.** New abnormal → repeat with GGT after excluding physiological/pre-analytic/
  fracture confounds, ideally against the person's own prior results (S7, CAV5). **[D][P22][P23]**
- **Calm red-flag routing.** ALP >1.5×ULN localised to liver by GGT (ACG imaging), cholestatic pattern, very
  high bone pattern, jaundice, or persistent low with fractures → prompt, unhurried review; never emergency-
  diagnose (S10, CAV7). **[D][P16][P15][P18]**
- **No treatment/medication guidance.** Never advise UDCA/bisphosphonates/vitamin D dosing or stopping a
  prescribed medicine; educate + refer (S9). **[D]**
- **Missing GGT/context stated, not invented** (note 5-NT/isoenzyme/vitamin D). (S8). **[D][R4][P10]**
- **Correct unit handling.** U/L ≡ IU/L enzyme activity (no mass factor; not a count); source localisation
  requires companions. **[D][P8]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. ALP is **>1.5× ULN and localised to the liver by GGT** (ACG: abdominal ultrasound as initial imaging). **[P16]**
2. A **cholestatic (ALP+GGT) pattern** is present. **[P9][P14]**
3. A **very high (Paget-range) bone pattern** is present. **[P15]**
4. ALP is accompanied by **jaundice or systemic symptoms**. **[P14]**
5. **Persistent low ALP**, especially with **unexplained fractures**. **[P18]**
6. The user **asks a medical/medication question** (S9). **[D]**

All suggestions are wellness-framed, non-urgent (unless red flags), non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-022 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for ALP (U/L [IU/L]) plus sex, age/life-
  stage, pregnancy/trimester, and pre-analytic (fasting) metadata, and — as interpretation inputs — **GGT
  (SCL-021, primary localiser), ALT (SCL-014), AST (SCL-015), the future Bilirubin (SCL-023), vitamin D
  (SCL-011), and the future calcium/phosphate**, plus declared context (bone turnover, recent fracture,
  medications). **[R4]**
- **Supplies (as CSL bindings):** the genuinely two-sided ALP bands (low flag + ×ULN high side, Category B), the
  **source-localisation (companion) pattern**, the reused Context-First gate, the reused four-level confidence
  hierarchy **with inheritance**, the reused ranked multiple-explanations output (source-then-cause), the reused
  cross-biomarker consumption (with graceful degradation to a source-unknown screen-level read), the reference-
  range and low-threshold disagreement display, the life-stage overlays, the repeat/own-history behaviour, safety
  rules, context guidance, and narrative templates — each with value + source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, cross-biomarker intelligence, the
  confidence hierarchy, and the multiple-explanations output (all frozen from SCL-010); **confidence inheritance
  (SCL-016/017/018/019/021)** for the source localisation; the **genuinely-two-sided structure (SCL-016/019)**
  and the **×ULN high-side severity (SCL-014/015/021)**; sex/age/pregnancy-aware banding (SCL-004/010/016/017/
  018/019); the guideline-disagreement posture (SCL-003/011/012); and the diagnostic-adjacency discipline
  (SCL-002/009/011/012/014/015/016/017/018/019/021). **The never-in-isolation, GGT-localised interpretation is
  represented within cross-biomarker intelligence + inheritance — the same ALP+GGT logic already specified in
  SCL-021 — not as a new methodology.** **[C][R1][R4][R9]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (GGT localises the source, the pattern
  inherits confidence — never averaged into a single verdict; contested reference ranges never averaged; ALP
  never interpreted in isolation; physiological life-stage rises never over-flagged).
- **Uses the correct unit handling** (U/L ≡ IU/L; no mass factor) — a per-analyte configuration shared with GGT/
  ALT/AST.
- **Score contribution:** ALP contributes to a **liver / bone-wellness** context as a sex/age/pregnancy-aware,
  context-gated, GGT-localised input — the source pattern (governed by inheritance) as the headline and ALP alone
  as a source-unknown screen-level signal — with abnormal values expressed as ranked source-then-cause context
  rather than a verdict; context-required/abstained values do not contribute a definite verdict. Any weighting is
  a Category [C] product decision. **[C]**

---

# 22. Medication & Exposure Context (educational only)

Educational context only; BioSense does not instruct on treatment, dose, or medication changes (S9). **[D]**
- **Enzyme-inducing medications** (phenytoin, carbamazepine, rifampin, and others): can induce ALP synthesis —
  context for a raised value; never a prompt to stop a prescribed medicine. **[A][P24]**
- **Oral contraceptives / anabolic steroids / some antibiotics:** can cause drug-induced cholestasis raising ALP
  (with GGT) — hepatobiliary context, managed by the prescriber. **[A][P14]**
- **Vitamin D status:** deficiency raises ALP via bone turnover (bone source) — the common practical
  explanation for a high-ALP/normal-GGT pattern; general wellness supports vitamin D sufficiency. **[A][P19]**
- **Zinc / magnesium:** ALP is zinc-dependent; deficiency can lower it — context for a low ALP. **[A][P17]**
- **Bisphosphonates / UDCA:** clinical treatments (bone / PBC) outside BioSense's scope; mentioned only as
  context, never recommended. **[A][P21]**
- Any medication or exposure question → educational context + suggestion to speak with a healthcare
  professional; BioSense never advises starting, stopping, or changing a medication. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **ALP needs source localisation. [E]** Alone it is a screen with unknown source; GGT-localisation and
   confidence inheritance handle this. **[P9][P20]**
2. **Reference ranges are contested. [E]** Method/lab/age-dependent (44–147 / 35–125 / 40–129 M–35–104 F /
   38–113); shown, never averaged. **[P4][P25]**
3. **Optimal & low targets are evolving. [E]** 50–100 / <80; low 30 vs 40 — shown as targets/frameworks, not
   fixed cut-offs. **[P6][P18]**
4. **ALP is strongly physiological. [E]** Growth, pregnancy, and meals move it; life-stage overlays and repeat
   mitigate. **[P11][P12][P22]**
5. **Total ALP hides its source. [E]** GGT (or 5-NT/isoenzymes) is required to localise. **[P2][P10]**
6. **It is genuinely two-sided. [E]** A low ALP is meaningful (mineral/thyroid/mineralisation) and not to be
   ignored. **[P17][P18]**
7. **Companion availability is data-dependent. [E]** Without GGT, only a source-unknown screen-level statement is
   possible; the localisation degrades to a confidence limitation, not certainty. **[R4][R9]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**; GGT-
localised; context-first; genuinely two-sided; life-stage overlays; ranked source-then-cause; repeat with GGT).
**[B]/[D]**
(Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL_WELLNESS / WITHIN_REFERENCE (40–ULN ; normal GGT)
"Your ALP is {value} U/L — a favourable range — and with a normal GGT there's nothing here that stands out.
 It's a single snapshot, best read with GGT, but this looks settled."  +CAV1 +CAV2

TEMPLATE: LOW_NORMAL_WATCH / BORDERLINE_HIGH_WATCH (30–<40 ; or ULN–1.5×ULN)
"Your ALP is {value} U/L — {toward the low end / mildly raised}, and labs differ a little on where the lines
 sit. That's often just context — a mild rise we'd localise with GGT; a low value we'd read with minerals and
 thyroid — and repeat if borderline."  +CAV1 +CAV2 +CAV5 +CAV11

TEMPLATE: LOW_FLAG (<30)
"Your ALP is {value} U/L — on the low side. That's worth noting: it can relate to minerals like zinc or
 magnesium, thyroid, nutrition, or bone-mineral handling, and it shouldn't simply be ignored, especially
 alongside unexplained fractures."  +CAV1 +CAV10

TEMPLATE: ELEVATED / HIGH / MARKED_HIGH_FLAG (>1.5×ULN)
"Your ALP is {value} U/L — more clearly raised. Because a raised ALP can come from your liver or your bones, the
 key step is GGT: raised alongside points to the liver, normal points to bone (where vitamin D is often worth
 checking). Here are the more likely source and explanations for your context rather than one: {ranked A/B/C}. A
 repeat with GGT is sensible."  +CAV1 +CAV2 +CAV3 +CAV6

TEMPLATE: RED_FLAG (ALP+GGT cholestatic ; very-high bone pattern ; jaundice ; persistent low with fractures — CALM ROUTING)
"This pattern is worth a prompt, unhurried conversation with a healthcare professional, who can look at the
 fuller picture. The numbers alone don't diagnose anything."  +CAV1 +CAV2 +CAV7

TEMPLATE: CHILD_ADOLESCENT
"In children and teenagers, ALP is naturally much higher because bones are growing, so a high result at that age
 is usually expected rather than a concern."  +CAV1 +CAV8

TEMPLATE: PREGNANCY
"In pregnancy, ALP naturally rises — often two to three times — because the placenta makes it, so pregnancy
 results are read in that light."  +CAV1 +CAV9

MODIFIER: SOURCE_LOCALISATION (GGT present) →
 "With GGT, the pattern reads as {hepatobiliary (liver/bile-duct) | bone-source | mixed/hepatocellular |
  bone-turnover (vitamin D-related)} context — a hint, not a diagnosis, read with your wider picture."  +CAV2

MODIFIER: SOURCE_UNKNOWN (no GGT) →
 "On its own, a raised ALP doesn't say whether it's from your liver or your bones — GGT is the usual next step to
  localise it (5-nucleotidase, ALP isoenzymes or vitamin D can help too), so we'd interpret this more confidently
  with it."  +CAV3

MODIFIER: RANKED_SOURCE_THEN_CAUSE (abnormal, ≥2) →
 "Most-to-least likely for your context — source first, then cause: A {…}, B {…}, C {…} — best confirmed with a professional."  +CAV6
```

**Absolute rules:** no template diagnoses liver disease/biliary obstruction/bone disease/Paget/metastatic
disease, asserts a single cause, emits a source-localisation read without companions, interprets ALP in
isolation, over-flags a child/adolescent or pregnancy physiological rise, ignores a low ALP, treats a band/
source/target as a diagnostic boundary, alarms, or averages reference ranges. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, normal GGT. [illustrative]**
```
Input: ALP 85 U/L (adult), GGT normal, age 40.
Band: OPTIMAL_WELLNESS | Source: (normal — bile-duct function reassuring) | Confidence: STANDARD
Narrative: OPTIMAL +CAV1+CAV2.  [P6]
```

**Example 2 — Mildly raised, GGT raised (hepatobiliary). [illustrative]**
```
Input: ALP 190 U/L (ULN 120 → ~1.6×), GGT raised.
Band: BORDERLINE/ELEVATED_FLAG + source (hepatobiliary) | Confidence: STANDARD→route
Narrative: ELEVATED ; hepatobiliary source ; ACG >1.5×ULN+GGT↑ → imaging route +CAV7 ; NO "biliary obstruction" diagnosis.  [P9,P16,S1]
```

**Example 3 — Raised ALP, no GGT. [illustrative]**
```
Input: ALP 210 U/L, no GGT.
Band: ELEVATED_FLAG | Source: NOT localisable | Confidence: CONTEXT_REQUIRED
Narrative: source-unknown +CAV3 ; request GGT (or 5-NT/isoenzyme/vitamin D) ; +CAV6 ; NO diagnosis.  [P9,R9,S3]
```

**Example 4 — Raised ALP, normal GGT, low vitamin D (bone). [illustrative]**
```
Input: ALP 175 U/L, GGT normal, 25-OH vitamin D low.
Band: ELEVATED_FLAG + source (bone; vitamin D-related) | Confidence: STANDARD
Narrative: bone-source, vitamin D context ; +CAV2 ; NO "bone disease/osteomalacia" diagnosis ; general wellness.  [P9,P19,S1]
```

**Example 5 — Child. [illustrative]**
```
Input: ALP 320 U/L, age 9 (paediatric range 158–490).
Band: paediatric physiological (NOT adult bands) | Confidence: REDUCED (life-stage)
Narrative: CHILD +CAV8 ; growth-related, expected ; NO flag ; route only if outside age-specific range.  [P11,P13,S5]
```

**Example 6 — Low ALP. [illustrative]**
```
Input: ALP 24 U/L (adult).
Band: LOW_FLAG | Source: mineralisation/mineral/thyroid direction | Confidence: STANDARD
Narrative: LOW +CAV10 ; minerals (zinc/magnesium)/thyroid/nutrition context ; don't ignore, esp. with fractures ; NO diagnosis.  [P17,P18,S6]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-021 (GGT)** — the **primary localiser**; the ALP+GGT logic (raised GGT → liver; normal GGT → bone) is
  the same cross-biomarker pattern already specified from the GGT side, reused here from the ALP side.
- **SCL-014 (ALT) / SCL-015 (AST)** — hepatocellular context; source of the reused **×ULN high-side enzyme
  severity** structure; help place a hepatobiliary ALP+GGT pattern.
- **Future Bilirubin (SCL-023)** — cholestatic/jaundice companion to an ALP+GGT hepatobiliary pattern.
- **SCL-011 (Vitamin D)** — the practical first companion for a high-ALP/normal-GGT bone pattern; and precedent
  for guideline-disagreement / multi-framework display.
- **Future calcium / phosphate** — bone-mineral companions for a bone-source or low-ALP pattern.
- **SCL-016 (Creatinine + eGFR) / SCL-019 (Haemoglobin)** — precedent for the reused **genuinely-two-sided**
  band structure (a low flag as well as a high side).
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, cross-biomarker
  intelligence, four-level confidence hierarchy, and multiple-explanations output.
- **SCL-017 (TSH) / SCL-018 (Free T4)** — thyroid context (hypothyroidism can lower ALP); precedent for reused
  confidence inheritance.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the P-series IDs in §0 and
> the body. Developers finalising the pack should confirm exact page/table locators against the primary sources
> where required.

**Definition, sources, units, ranges (Category A anchors)**

1. **NCBI Clinical Methods — Alkaline Phosphatase and Gamma Glutamyltransferase (NBK203).** — *ALP = group of
   phosphomonoesterases hydrolysing phosphate esters (pH ~10); IU = amount catalysing 1 µmol substrate/min;
   most-commonly-used method reference 35–125 IU/L in adults; ranges vary widely with methodology; serum
   activity predominantly hepatic, osseous & reticuloendothelial; children 2–5× adults (bone growth); placental
   ALP 2–3× in 2nd/3rd trimesters; intra-individual < inter-individual variability (P1, P4, P8, P11, P12, P23,
   P25).*
2. **Cleveland Clinic (Alkaline Phosphatase / ALP).** — *two main blood sources liver & bones; high ALP may
   indicate liver disease or bone disorders but an ALP test alone cannot diagnose a condition; liver damage
   makes a different ALP than bone; isoenzyme test to determine source (P2, P20).*
3. **HealthMatters.io (ALP: liver vs bone, ALP+GGT pattern).** — *high ALP + high GGT = cholestatic/liver
   source; high ALP + normal GGT essentially rules out liver/bile-duct → bone (check 25-OH vitamin D, Paget,
   healing fracture, bone mets); 5-nucleotidase alternative when GGT unavailable; isoenzyme fractionation for
   unclear cases; bone-specific ALP for monitoring (P9, P10, P19).*
4. **HealthRX.com (ALP interpretation) — ACG guideline (Kwo).** — *GGT distinguishes source (high → liver;
   normal → bone); drug-induced cholestasis (amoxicillin-clavulanate, anabolic steroids, phenytoin); ACG: ALP
   >1.5× ULN with co-elevated GGT → abdominal ultrasound; isolated ALP elevation should not be dismissed; Paget
   often 5–20× normal; persistent low ALP <30 IU/L → zinc/magnesium deficiency, hypothyroidism, pernicious
   anaemia, coeliac, Wilson, hypophosphatasia; low ALP not to be ignored, esp. with fractures (P9, P16, P17,
   P18, P24).*
5. **Lamkin Clinic (ALP) & Apex Blood Labs (ALP).** — *ALP predominantly biliary epithelium, osteoblasts,
   intestinal brush border, kidney tubular cells, placenta; standard assays measure total ALP without
   distinguishing sources; optimal 50–100 U/L with normal GGT / optimal <80; low ALP <40 U/L (hypothyroidism,
   zinc deficiency, pernicious anaemia); obstruction highest values 10–20×; GGT normal in bone-source; PBC
   monitoring target ALP <1.5× normal with UDCA; fasting preferred (intestinal ALP) (P2, P5, P6, P14, P15, P18,
   P21, P22).*

**Ranges, causes, paediatric/low-ALP (Category A)**

6. **MDTools (ALP levels) & SiPhox (ALP by age) & Lola Health (ALP ranges).** — *adult 44–147 IU/L; sex-specific
   men 40–129 / women 35–104 U/L; Paget dramatically elevated (>1,000 in severe; 10–25× normal); bone mets
   (prostate/breast/lung); healing fracture transient; osteomalacia/rickets (vitamin D); hyperparathyroidism;
   low ALP: hypophosphatasia, zinc/magnesium deficiency, malnutrition, hypothyroidism; ALP varies by several
   hundred units between childhood and adulthood (P3, P5, P14, P15, P17).*
7. **PMC3065317 (paediatric ALP reference) & PMC9659844 (children 1–18y) & PMC12590921 (low ALP in children;
   IFCC age/sex table).** — *ALP tetraphasic with infancy & puberty peaks; no sex difference until puberty;
   IFCC age-/sex-specific paediatric ranges (e.g. 1–5y 140–420; 6–10y 158–490; 11–12y up to ~525 M; girls peak
   earlier; >18y 38–113 IU/L); abnormally low ALP in children often falls within the adult range → age-specific
   lower limits needed (P7, P11, P13).*
8. **Mito Health (ALP explained) & PMC (patient-derived reference intervals, PMID 38809761).** — *NAFLD (~25%
   adults) mild ALP rise; medications (antibiotics, anti-seizure, statins); Paget 5–10× ULN; fracture healing
   transient; osteomalacia/rickets; age- & sex-specific reference intervals essential to identify hypophosphatasia
   (low ALP) and avoid unnecessary isoenzyme analysis (P14, P15, P24, P25).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–8; they are BioSense
> Version 1 classifications, genuinely two-sided (a low flag plus a ×ULN high side) and context-gated with
> life-stage overlays, not attributable to any single reference as a diagnostic threshold, and **do not restate
> diagnostic labels.** The differing adult reference ranges, optimal targets, and low thresholds are shown
> separately and **never averaged**; ALP is presented as a GGT-localised screen (source unknown until
> localised), never in isolation, never a diagnosis of liver disease/biliary obstruction/bone disease/Paget/
> metastatic disease; the source-localisation is a hint whose confidence inherits the lower input, never a
> standalone verdict.

---

# 28. Founder Decisions Required

The ALP methodology reuses frozen BioSense frameworks and represents ALP via the existing Context-First,
cross-biomarker (GGT-localised), confidence-inheritance, and guideline-disagreement frameworks, following the
frozen GGT localisation logic and the two-sided/×ULN precedents. Two optional presentation/policy items remain:
**[C][E]**

**D-1 — Confirm the genuinely-two-sided band structure (low flag + ×ULN high side) and the reference/optimal/low
presentation.** SCL-022 uses an adult reference window (default ULN 120 / LRL 40 U/L; lab's own preferred) with a
wellness-optimal zone (40–100 U/L), a **low flag** (<30, with a 30–40 watch reflecting the 30-vs-40
disagreement), and a **×ULN high-side gradient** (>1.5× borderline/ACG-imaging; 1.5–3× elevated; 3–5× high; >5×
marked, spanning the Paget and obstruction ranges), with the differing adult reference ranges shown side by side
and never averaged, and strong paediatric/growth (2–5×) and pregnancy (2–3×) overlays. Confirmation requested
that this genuinely-two-sided, ×ULN presentation (with the wellness-optimal and low targets shown as evolving)
is the intended default. **Founder sign-off requested.**

**D-2 — Confirm the GGT-localisation activation and companion-dependency scope for V1.** SCL-022 emits a
**source-localisation read only when GGT (primary) is available** (else a screen-level, source-unknown statement
with inherited/limited confidence, noting 5-nucleotidase / ALP isoenzymes / vitamin D as clarifiers), reads a
high-ALP/normal-GGT bone pattern **with vitamin D (SCL-011)**, and applies the paediatric/growth and pregnancy
overlays. **Founder decision requested** on whether V1 activates ALP now — noting that the GGT-localisation is
**activatable immediately** because GGT (SCL-021), ALT (SCL-014), AST (SCL-015) and vitamin D (SCL-011) already
exist, with the cholestatic/jaundice dimension (future Bilirubin/SCL-023) and the bone-mineral dimension (future
calcium/phosphate) enriching the source layer when those packs are authored (ALP degrades gracefully to a
source-unknown screen-level read whenever GGT is absent).

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-022 v1.0**

*Authored on the frozen SCL-001 template and aligned to the frozen liver-enzyme packs GGT (SCL-021), ALT
(SCL-014) and AST (SCL-015) and the two-sided packs Creatinine (SCL-016) and Haemoglobin (SCL-019). Every
numeric value is either a cited Category [A] guideline/reference figure or a transparently-labelled Category [B]
BioSense wellness interpretation. No value was fabricated; every Category [A] number was retrieved and verified
during authoring and traces to §27. ALP reuses frozen BioSense methodology throughout — the Context-First
Interpretation Framework, cross-biomarker intelligence, the four-level confidence hierarchy, and the
multiple-explanations output (all from SCL-010), confidence inheritance (SCL-016/017/018/019/021, for the source
localisation), the genuinely-two-sided structure (SCL-016/019) and the ×ULN high-side severity (SCL-014/015/021),
sex/age/pregnancy-aware banding (SCL-004/010/016/017/018/019), the guideline-disagreement posture (SCL-003/011/
012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/014/015/016/017/018/019/021) — introducing
only ALP-specific scientific content (the thresholds and their genuinely-two-sided structure; the U/L ≡ IU/L
enzyme-activity unit; the strong age/growth and pregnancy overlays; the reference-range disagreements; the
GGT-localisation source layer with 5-NT/isoenzyme/vitamin D fallbacks; the intestinal/post-meal, medication, and
low-ALP nuances; and the trend/own-history behaviour). ALP is represented as a marker of hepatobiliary and bone
physiology — a context-first, GGT-localised screen whose elevated value requires source localisation, never
interpreted in isolation, and never a diagnosis of liver disease, biliary obstruction, bone disease, Paget
disease, or metastatic disease. No new methodology was required; all structure remains consistent with SCL-001
through SCL-021.*
