# SCL-015 — ASPARTATE AMINOTRANSFERASE (AST)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. AST is the companion biomarker to ALT — a tissue-injury marker interpreted via the existing Context-First Framework, never liver disease in isolation. The De Ritis (AST:ALT) ratio is a governed companion metric. No new methodology introduced.*

**Document ID:** SCL-015
**Biomarker:** Aspartate Aminotransferase (AST) — a multi-tissue enzyme; companion to ALT; marker of tissue injury
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 1 August 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. AST reuses the frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), the four-level confidence hierarchy (SCL-010), multiple-explanations output (SCL-010), cross-biomarker intelligence (SCL-010), derived-metric governance (SCL-007, for the De Ritis ratio), two-sided banding (SCL-004/009/010/011/012/014), sex-aware banding (SCL-004/010/014), guideline-disagreement handling (SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/014) — introducing only AST-specific scientific content. All sections remain consistent with SCL-001 through SCL-014.

---

> **What this document is.** SCL-015 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for AST. It reuses existing BioSense
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

## STRUCTURAL-FIT NOTE (AST vs SCL-001) — reuses frozen frameworks; no new pattern

AST presents the same structural characteristics BioSense has already solved for, and maps onto the frozen
methodology without extension. Per the founder's Companion-Organ decision, **AST is the companion biomarker
to ALT and must never be read as liver disease in isolation** — it is a **multi-tissue enzyme whose meaning
depends on surrounding biological context**, so it reuses the Context-First Framework:

1. **Companion-organ / Context-First — reused (SCL-010).** AST is a marker of **tissue injury**, not a
   diagnosis, and is **not liver-specific**: it sits in liver, skeletal muscle, cardiac muscle, kidney,
   brain, and erythrocytes. Interpretation **begins by determining the surrounding context** — ALT/De Ritis,
   hs-CRP, ferritin, alcohol, exercise, muscle injury, haemolysis, cardiac context, and future GGT/ALP/
   bilirubin — evaluated **before** banding (§0.2, §8, §12).
2. **De Ritis (AST:ALT) as a governed companion metric — reused (SCL-007).** The ratio is **derived** from
   AST and ALT, carries an id/version and parent provenance, requires elevated absolute enzymes to be
   meaningful, and is a **pattern indicator, never a standalone diagnosis** (§0.5, §9).
3. **Cross-biomarker intelligence — reused (SCL-010).** AST consumes **ALT (SCL-014), the De Ritis ratio,
   hs-CRP (SCL-006), ferritin (SCL-010), and future GGT/ALP/bilirubin**, plus CK/troponin context, where
   available (§9).
4. **Sex-aware banding — reused (SCL-004/010/014).** AST runs higher in men (and normally ≈0.8× ALT) (§11).
5. **Guideline-disagreement handling — reused (SCL-003/011/012).** Laboratory reference ranges vary and there
   is **no universal De Ritis cutoff** — presented as differing frameworks, **never averaged** (§10, §11).
6. **Two-sided banding with flags — reused; high-dominant.** The meaningful end is **high** (tissue injury),
   graded by **multiples of the ULN**; the low end is a gentle context flag (§11).
7. **Multiple-explanations output — reused (SCL-010).** An elevation gets **ranked possible sources**
   (hepatocellular, strenuous exercise, skeletal-muscle injury, alcohol-related, haemolysis, cardiac) — never
   a single certain cause (§11, §14).
8. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012/014).** BioSense never emits "liver
   disease," "cirrhosis," "myocardial infarction," "rhabdomyolysis," or "muscle disease" as a diagnosis; it
   detects the pattern, routes, and names nothing (§18, §19).

**Biomarker-specific content introduced:** the AST thresholds and their sex-specificity; the multi-tissue
source list and source-ranking; the governed De Ritis ratio; the multiples-of-ULN severity structure; the
kinetics/transience behaviour; and the extrahepatic (muscle/cardiac/haemolysis) modifiers. **No new
methodology is required.** **[C]**

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

AST is best understood as **ALT's companion**, and the founder's Companion-Organ decision is central to how
BioSense treats it: **AST is a marker of tissue injury, not a diagnosis of liver disease — and it is not
liver-specific.** The same enzyme lives in the liver, skeletal muscle, heart, kidney, brain, and red blood
cells, so a raised AST says *some AST-rich tissue has been stressed*, not *which one*. A hard workout or a
muscle strain, a haemolysed sample, alcohol, a recent viral illness, or a cardiac event can all move it. So
BioSense always begins with context, reads AST **alongside ALT** — including the **De Ritis (AST:ALT) ratio**,
which it treats as a **governed companion metric** (a pattern hint that only means something when the enzymes
are actually elevated, never a diagnosis on its own) — grades an elevation gently by how many times above the
usual ceiling it sits, and where several tissue sources are plausible it **ranks them by the evidence** rather
than asserting one. It uses sex-aware handling, shows that laboratory ranges and ratio cut-offs genuinely
differ rather than splitting them, and names no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as the
evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate AST. Every value carries a source ID (T-series / R-series → §27) and a
> category tag. Canonical unit: U/L (≡ IU/L; no conversion factor). **Companion-to-ALT, sex-aware,
> high-dominant two-sided, severity-by-multiples-of-ULN, context-first; tissue-injury marker, NOT
> liver-specific, NEVER liver disease in isolation; De Ritis is a governed companion metric.**

## 0.1 Canonical units — [A]
```
canonical_unit: U/L  (U/L ≡ IU/L; μkat/L = U/L × 0.0167 optional display)   # NO analyte conversion factor — do NOT apply 38.67/88.57/18.0/2.496/0.738/2.266 [T30]
Always retain value_reported + unit_reported + sex + available context. Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First (Companion-Organ) Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST / COMPANION-ORGAN): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  companion enzyme (CENTRAL): ALT (SCL-014) + De Ritis AST:ALT ratio (governed metric, §0.5);              [T18,T24]
  liver/biliary: future GGT, future ALP, future bilirubin (hepatocellular vs cholestatic; ischaemic);      [T12,T13]
  inflammation/iron/metabolic: hs-CRP (SCL-006), ferritin (SCL-010), obesity/metabolic syndrome;           [T28]
  MUSCLE source: recent strenuous exercise, skeletal-muscle injury/rhabdomyolysis (AST>ALT → check CK), IM injections; [T14,T32]
  CARDIAC source: cardiac context (troponin is the primary cardiac marker, not AST);                        [T15]
  HAEMOLYSIS: haemolytic states OR haemolysed sample (pre-analytical);                                      [T16,T32]
  behaviour/exposure: alcohol intake, medications; recent viral illness (may cause rhabdomyolysis);         [T17,T22]
  life-stage: pregnancy (generally lowers aminotransferases; HELLP/pre-eclampsia exception).                [T29]
CORE RULE (founder Companion-Organ): AST = tissue-INJURY marker, NOT liver-specific, NEVER liver disease in isolation; elevation may arise from MULTIPLE tissue sources. [T1,T2][B2]
  → RANK plausible sources by evidence + context (§0.5); never assert one; interpretation BEGINS with context.
IF material context changes meaning → interpret WITHIN that context.                                          [R1]
IF ALT / companion markers / key context unavailable → CONFIDENCE LIMITATION, not certainty.                 [R4]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands (sex-aware) — [B] (synthesis of [A] anchors T4-T11,T26) — HIGH-DOMINANT TWO-SIDED
```
AST_WELLNESS_BAND (U/L, general adult; SEX-AWARE; after context gate). ULN_ref = sex upper anchor:
  MALE   ULN_ref = 35 U/L (men run higher; lab ranges ~8–40; AST≈0.8×ALT)   [T4,T6]
  FEMALE ULN_ref = 30 U/L (women lower; lab ranges ~8–40)                    [T4,T6,T7]
  (conventional lab ULN ~40 U/L shown as context; severity multiples use 40 as the anchor)   [T4]

  LOW_CONTEXT_FLAG        v < 10                         # gentle low-end context flag (B6 deficiency/CKD, EVOLVING; usually not significant) [T27]
  OPTIMAL                 10 <= v <= ULN_ref             # within a favourable range for sex [T4,T6]
  HIGH_NORMAL_WATCH       ULN_ref < v <= 40              # above sex anchor but within conventional lab ULN — watch/context [T4,T28]
  BORDERLINE_ELEVATED     40 < v <= 80                   # borderline (<2× conventional ULN); very common, context-driven [T26]
  MILD_ELEVATED           80 < v <= 200                  # mild (2–5× ULN) [T26]
  MODERATE_ELEVATED       200 < v <= 600                 # moderate (5–15× ULN) [T26]
  SEVERE_ELEVATED         v > 600                        # severe/massive (>15× ULN; acute viral 1,000–10,000; ischaemic >50×) [T11,T13,T26]
DIRECTION: HIGH-DOMINANT TWO-SIDED (high = tissue-injury pattern = meaningful end, graded by multiples of ULN; low = gentle context flag). [R6]
SEVERITY uses conventional ULN 40 as the multiples anchor; sex ULN_ref (M35/F30) drives OPTIMAL vs HIGH_NORMAL_WATCH. Both shown, NEVER averaged. [R5]
UNIT: U/L (≡ IU/L). Sex REQUIRED for OPTIMAL/HIGH_NORMAL_WATCH boundary; if sex unknown → REDUCED confidence, use conventional 40. [T6][R8]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never a diagnostic label. [B][D]**

## 0.4 Severity-by-multiples-of-ULN (wellness context, not diagnosis) — [A]/[B]
```
SEVERITY_CONTEXT (multiples of conventional ULN ~40; wellness framing only): [T11,T26]
  BORDERLINE  <2× ULN  : very common; context-driven (metabolic/muscle/alcohol/haemolysis/normal fluctuation).
  MILD        2–5× ULN : unhurried review; source depends on De Ritis + context. [T26]
  MODERATE    5–15× ULN: acute viral/autoimmune/drug/ischaemic-early patterns — calm prompt review.
  SEVERE      >15× ULN : acute viral (1,000–10,000), toxin, ischaemic (>50× ULN) patterns — prompt review; peak ≠ prognosis. [T11,T13]
Pattern hints (WITH absolute levels + De Ritis, never alone): alcoholic AST>8×ULN & ALT>5×ULN; NAFLD both >4×ULN; acute viral both ~25×ULN; ischaemic >50×ULN. [T26]
Severity is wellness CONTEXT, never a diagnosis or a specific cause. [R7]
```

## 0.5 De Ritis (AST:ALT) ratio — governed companion metric — [A]+[C] — REUSED derived-governance (SCL-007)
```
DE_RITIS_RATIO (governed derived metric; id=SCL015_DE_RITIS_v1; parents = AST (this) + ALT (SCL-014)):   [R9]
  compute ONLY when BOTH AST and ALT available; ratio = AST ÷ ALT (rounded 2dp); store parents + provenance. [T18]
  GOVERNANCE: meaningful ONLY when absolute enzymes are ELEVATED; if both normal → ratio NOT clinically significant → suppress/annotate. [T24]
  PATTERN HINTS (context, NOT a verdict; interpret WITH absolutes, GGT, CK, alcohol, muscle context):     [T19-T22,T24]
    < 1        : ALT-predominant — metabolic/NAFLD or viral/acute-injury context. [T19]
    ~1 (0.7–1.2): commonly seen in healthy individuals. [T20]
    1 – 2      : may reflect fibrosis/cirrhosis/NASH context. [T21]
    > 2        : classic alcoholic-injury context (B6 depletion suppresses ALT); ALSO muscle injury / advanced fibrosis. [T22,T23]
    > 8 (rare) : suggests a NON-alcoholic or mixed cause. [T22]
  NO universal cutoff (age/sex/body-composition/training/lab shift baseline) → represent as pattern, NEVER average. [T25][R5]
NEVER present the ratio as a standalone diagnosis; it SUPPORTS interpretation without implying certainty. [B3][D]
```

## 0.6 Confidence hierarchy (four-level) — [C] — REUSED (SCL-010)
```
STANDARD          : clear value AND sex known AND ALT available (De Ritis computable) AND sufficient context AND not obviously transient/haemolysed.
REDUCED           : single value / sex unknown / lab variation / possible transient (recent exercise-illness) / possible haemolysed sample / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : elevation with NO ALT (no De Ritis) and NO source context (muscle/cardiac/haemolysis/metabolic) → rank-with-limitation or request repeat/companions; name what's needed. [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / ineligible population — explained abstention. [R2]
Reduced confidence does NOT auto-block; significant contextual uncertainty MAY justify abstention. New elevation → prefer REPEAT (kinetics: peak 24–36h, normalises 3–7d). [T9]
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  AST is NOT a diagnosis. NEVER emit "liver disease", "cirrhosis", "hepatitis", "myocardial infarction/heart attack", "rhabdomyolysis", "muscle disease", or any condition as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  AST is a tissue-INJURY marker, NOT liver-specific; NEVER interpret as liver disease in isolation; interpretation BEGINS with context. [B2][T2]
S3  On elevation with ≥2 plausible tissue sources → RANKED possibilities (hepatocellular/exercise/muscle/alcohol/haemolysis/cardiac); NEVER assert a single source. [R3]
S4  De Ritis ratio is a GOVERNED companion metric: compute only with ALT; meaningful only with elevated absolutes; pattern-hint NOT a verdict; never standalone. [R9][T24]
S5  Sex-aware: use sex-specific ULN_ref; if sex unknown → REDUCED confidence + conventional ULN 40. [T6]
S6  New/isolated elevation → suggest REPEAT (kinetics transient; peak 24–36h); consider haemolysed-sample and recent-exercise/IM-injection confounds. [T9,T32]
S7  MUSCLE source: if AST elevated with normal/mildly-raised ALT → suggest CK context; CARDIAC context → note troponin is the primary marker (BioSense does not assess cardiac events). [T14,T15]
S8  Cross-markers (ALT/GGT/ALP/bilirubin/ferritin/hs-CRP) unavailable → confidence limitation, not invented certainty. [R4]
S9  Never produce a numeric disease-risk % from AST; never recommend treatments/medication changes/doses. [D]
S10 RED FLAGS (jaundice, ascites, encephalopathy; synthetic dysfunction — low albumin/high INR/high bilirubin; severe >15× ULN; pregnancy + markedly high AST + hypertension) → calm prompt healthcare review; never emergency-diagnose. [T13,T29][D]
S11 Never present a BioSense band, ULN, severity multiple, or De Ritis cutoff as a medical/diagnostic boundary.
S12 Represent lab-range and De Ritis-cutoff disagreement; NEVER average thresholds or ratio cut-offs. [T25][R5]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & COMPANION MARKERS (the key AST move): ALWAYS read with ALT (De Ritis ratio); and where relevant hs-CRP, ferritin, future GGT/ALP/bilirubin; consider muscle (CK), cardiac (troponin), haemolysis, alcohol, metabolic context; for a NEW elevation, REPEAT (kinetics). [T14,T18,T24]
Tier 2 LIFESTYLE (context-appropriate): where a metabolic pattern is plausible (read via ALT/De Ritis), general liver-friendly wellness; note strenuous exercise/muscle context — framed as education, not treatment. [T14,T28]
Tier 3 HEALTHCARE DISCUSSION (calm) when: persistent elevation on repeat | moderate/severe (≥5× ULN) | red flags | De Ritis pattern suggesting alcoholic/fibrosis context | AST-dominant with muscle/cardiac context | pregnancy with high AST. [T13,T22,T29][D]
NEVER a specific treatment, medication change, or dose at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate (companion-organ) first → sex-aware band + severity context + De Ritis (if computable) → template; RANKED sources where elevated/discordant.
OPTIMAL (context concordant/not needed) → affirming, with the "read with ALT/context" caveat where relevant.
HIGH_NORMAL_WATCH → calm; above sex anchor but within conventional range; note metabolic/muscle context.
BORDERLINE / MILD → constructive; very common; REPEAT suggested (kinetics); ranked sources; De Ritis pattern as context; ALWAYS "not a diagnosis".
MODERATE / SEVERE → calm prompt healthcare review; ranked sources; never alarm, never diagnose; peak ≠ prognosis.
LOW_CONTEXT_FLAG → gentle; evolving B6/CKD context; never alarming.
ALT present → integrate De Ritis (governed); muscle/haemolysis/cardiac context caveats.
markers / context unavailable → state confidence limitation; name what would clarify (esp. ALT for De Ritis); prefer repeat.
Never "normal/abnormal" as a verdict; never a diagnosis (liver disease/cirrhosis/MI/rhabdomyolysis/muscle disease).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "AST sits in several tissues — liver, muscle, heart, kidney, and red blood cells — so a raised value points
      to cell stress somewhere, not to a specific diagnosis. It's read alongside ALT and your wider context."
CAV3 (reduced/context) name the context reducer(s) or missing marker (ALT/De Ritis, ferritin, hs-CRP, GGT, ALP, bilirubin, sex, CK).
CAV4 (new/isolated) "AST rises and falls over hours to days, so a single value is best repeated before reading
      too much into it — and a hard workout, an injection, or a haemolysed sample can nudge it."
CAV5 (elevated, ranked) "Because several tissues contain AST, we've noted the more likely sources given your
      context (for example liver, muscle, or red-cell related) rather than pointing to one — best confirmed with a professional."
CAV6 (moderate/severe or red flags) "This degree of change, or these accompanying signs, is worth a prompt,
      unhurried conversation with a healthcare professional."
CAV7 (ALT/markers unavailable) "We'd interpret this more confidently with ALT (to calculate the AST:ALT pattern),
      and in time GGT, ALP and bilirubin, plus ferritin and hs-CRP."
CAV8 (De Ritis, governed) "The AST:ALT pattern is a helpful hint, not a diagnosis — it only means something when
      the enzymes are actually raised, and it's read with your other results."
CAV9 (muscle/cardiac context) "If AST is up but ALT isn't, a muscle source (a hard workout or strain) is worth
      considering — a muscle enzyme called CK helps sort that out; troponin, not AST, is the marker for the heart."
```

## 0.11 Source & version identifiers
```
config_id: SCL-015   config_version: 1.0
band_id: BIOSENSE_AST_SEXAWARE_BANDS_v1                  (Category B; high-dominant two-sided; sex-aware; anchors T4-T11,T26)
severity_id: SCL015_SEVERITY_MULTIPLES_v1               (borderline/mild/moderate/severe by ×ULN; T11,T26)
de_ritis_id: SCL015_DE_RITIS_v1                          (governed derived companion metric; parents AST+ALT; R9; T18-T25)
companion_organ_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1 — founder Companion-Organ decision)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1   (reused; R2)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1   (reused; R3 — ranked tissue sources)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1     (reused; R4 — ALT/De-Ritis/hs-CRP/ferritin/GGT/ALP/bilirubin)
derived_governance_ref: SCL007_DERIVED_GOVERNANCE_v1     (reused; R9 — De Ritis)
sex_aware_ref: SCL004_SEX_AWARE_BANDS (reused; R8)
guideline_disagreement_ref: SCL011/012 posture          (reused; R5 — lab ranges + De Ritis cutoffs)
safety_rules_id: SCL015_SAFETY_v1                        (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Aspartate aminotransferase (AST), formerly SGOT, is an enzyme of amino-acid metabolism that transfers an
amino group from aspartate to α-ketoglutarate, feeding the citric-acid cycle and gluconeogenesis. **[A]** Like
ALT it leaks into the blood when the cells that hold it are injured, so a raised AST signals **tissue
injury**. <cite index="20-1">The aminotransferases may be elevated as a result of hepatocyte necrosis induced by a number of infectious, inflammatory, or metabolic disorders or by drug toxicity.</cite> **[A][T1]** But — and this is the founder's Companion-Organ decision — **AST is not liver-specific.** <cite index="26-1">AST is expressed in mitochondria of the liver and cytosol of red blood cells and muscles; thus it is not specific for liver injury.</cite> **[A][T3]** Its highest concentrations span **liver, heart, skeletal muscle, kidney, brain, and red blood cells**, which makes it less liver-specific than ALT. **[A][T2]**

So BioSense treats AST as **ALT's companion**: a raised value says *some AST-rich tissue is stressed*, not
*which one*. It reads AST alongside ALT — including the **De Ritis (AST:ALT) ratio**, governed as a companion
metric — grades an elevation by multiples of the usual ceiling, and where several tissue sources fit, ranks
them by the evidence rather than asserting one. **[B][B2]**

- **Official name:** Aspartate aminotransferase (AST); formerly SGOT
- **Reported in:** U/L (≡ IU/L); μkat/L optional (×0.0167). No analyte conversion factor. **[A][T30]**
- **Nature:** multi-tissue enzyme (liver, heart, skeletal muscle, kidney, brain, erythrocytes); **tissue-injury marker, NOT liver-specific, NEVER liver disease in isolation** **[A][B2]**
- **Direction:** high-dominant two-sided (high = injury pattern, graded by ×ULN; low = gentle context flag) **[A][R6]**
- **Companion:** to ALT (SCL-014); the **De Ritis (AST:ALT) ratio** is a governed companion metric **[A][T18]**
- **BioSense role:** a context-first companion-organ marker, read with ALT/De Ritis, ferritin, hs-CRP, and future GGT/ALP/bilirubin.

---

# 2. Physiological Function

AST catalyses the reversible transfer of an amino group between aspartate and α-ketoglutarate (producing
oxaloacetate and glutamate), linking amino-acid and energy metabolism. **[A]** It exists in two cellular
compartments — **mitochondrial** and **cytosolic** — and across many tissues, so its release into serum
reflects injury to **any** AST-rich tissue, not the liver alone. **[A][T3]** Because ALT is far more
concentrated in the liver, an ALT rise points more specifically to the liver, whereas an AST rise is a
broader signal that must be placed in context. **[A][T2]**

Two points define interpretation **[A]**:
- **Tissue-injury marker, not a cause.** A raised AST reflects injury to some AST-rich tissue; it does not
  name the tissue or the process. **[A][B2]**
- **Read with ALT.** AST is normally ≈0.8× ALT; the **AST:ALT (De Ritis) ratio** is the key contextual lens,
  governed as a companion metric (§9). **[A][T6][T18]**

---

# 3. Scientific Background

AST has been a standard liver-panel enzyme for decades, but three scientific themes shape how BioSense
represents it. **[A]**

**First, AST is genuinely multi-tissue.** Its highest concentrations are in heart, liver, skeletal muscle,
kidney, brain, and red cells; an elevation can originate from a myocardial event, from skeletal muscle
(rhabdomyolysis, extreme exercise), or from haemolysis, as readily as from the liver. <cite index="21-1">This broader distribution means that while AST elevation can indicate liver damage, it is less liver-specific than ALT.</cite> **[A][T2][T14][T16]** This is exactly why the founder's decision forbids reading AST as liver disease in isolation.

**Second, the AST:ALT (De Ritis) ratio is a pattern hint, not a verdict.** Below 1 it is ALT-predominant
(metabolic/NAFLD or viral); around 1 it is common in health; 1–2 can reflect fibrosis/cirrhosis context;
above 2 is the classic alcoholic-injury pattern (alcohol depletes vitamin B6, which ALT needs more), though
muscle injury and advanced fibrosis also raise it. <cite index="32-1">Today the De Ritis ratio is used primarily to help differentiate causes of liver enzyme elevation — distinguishing alcoholic from non-alcoholic liver injury when both AST and ALT are elevated.</cite> Crucially, <cite index="28-1">the ratio is most useful as a pattern indicator interpreted alongside absolute enzyme levels and other markers — not as a standalone verdict.</cite> There is **no universal cutoff**. **[A][T19][T22][T24][T25]**

**Third, AST is kinetic and easily confounded.** It rises within hours of injury, peaks at 24–36 hours, and
normalises within 3–7 days (half-life ~17 hours), with 5–10% day-to-day variation; haemolysed samples,
recent strenuous exercise, and intramuscular injections can all skew it — so single values are often
repeated. **[A][T9][T32]**

**The wellness reading — [B]:** AST is a context-first, sex-aware companion-organ marker — a signal of
possible tissue injury, read with ALT and the governed De Ritis ratio, graded gently by multiples of the
usual ceiling, with plausible tissue sources ranked rather than one asserted, and never named as a diagnosis.

**An honest boundary — [E]:** AST is not liver-specific, lab ranges and ratio cut-offs differ, and many
transient/extrahepatic factors move it — so BioSense leans on context and companion markers and is explicit
about confidence. **[E][T2][T25]**

---

# 4. Why AST Matters

**1. It completes the ALT picture. [A][T18]** AST's chief wellness value is as ALT's companion — the AST:ALT
ratio narrows the likely source of an enzyme elevation more precisely than either marker alone. **[A]**

**2. It widens the lens beyond the liver. [A][T2]** Because AST is multi-tissue, it can surface a muscle,
haemolytic, or (rarely) cardiac context that ALT alone would miss — provided it is read in context and never
mistaken for a liver diagnosis. **[A]**

**3. Interpreted well, it adds signal; interpreted naively, it misleads. [A][B2]** The companion-organ,
ranked-source approach adds value over a blunt "normal/abnormal" read and avoids implying a disease that
isn't established. **[A]**

**Why BioSense measures it — [C]:** AST is a modifiable, multi-tissue companion marker whose meaning is
context-dependent — the ideal case for Context-First interpretation, sex-aware banding, a governed De Ritis
metric, ranked sources, and companion-marker integration, all while never diagnosing liver or muscle disease.

---

# 5. Laboratory Measurement

AST is measured on a standard serum/plasma chemistry panel, reported in **U/L (≡ IU/L)**. **[A][T30]**

- **No unit conversion factor.** U/L and IU/L are equivalent; μkat/L (×0.0167) is an optional SI display. No
  lipid/glucose/vitamin conversion factor applies. **[A][T30]**
- **Sex matters.** AST runs higher in men (and is normally ≈0.8× ALT), so handling is sex-aware. **[A][T6]**
- **Lab/assay variability.** Reference ranges are lab-derived (local mean ±2SD) and vary (e.g. 8–33, 0–41,
  5–40, 10–40 U/L); "healthy" reference populations may include unrecognised NAFLD, inflating ranges. **[A][T4][T5]**
- **Kinetics & pre-analytics.** AST peaks 24–36h after injury and clears in 3–7 days; **haemolysed samples**,
  recent **strenuous exercise**, and **intramuscular injections** can skew results — a new value is often
  repeated. **[A][T9][T32]**
- **Companion panel.** AST is interpreted **with ALT** (De Ritis ratio) and, where available, GGT, ALP,
  bilirubin, ferritin, and hs-CRP; a muscle source is checked with **CK**, a cardiac context with
  **troponin** (the primary cardiac marker). **[A][T14][T15][T24]**

---

# 6. Units

- **U/L** — standard. **BioSense canonical unit.** **[A/C]**
- **IU/L** — equivalent to U/L. **[A]**
- **μkat/L** — SI catalytic unit; U/L × 0.0167. Optional display. **[A][T30]**
- **No analyte conversion factor applies** — unlike cholesterol (38.67), triglycerides (88.57), glucose
  (18.0), 25(OH)D (2.496), B12 (0.738), or folate (2.266). AST values are used as-is in U/L. **[A][C]**

BioSense stores the reported value, unit, and sex unchanged and computes the optional μkat/L display and the
governed De Ritis ratio (when ALT is present). **[C]**

---

# 7. Unit Conversion

```
U/L  ≡  IU/L        (no conversion)
μkat/L = U/L × 0.0167    (optional SI display only)
De Ritis ratio = AST(U/L) ÷ ALT(U/L)   (governed derived metric; §0.5, §9)
```
Worked check: 35 U/L ≈ 0.58 μkat/L; AST 68 ÷ ALT 30 = 2.27 (De Ritis). **[A][T30][T18]**

**Safety rule [D]:** AST carries **no** analyte conversion factor; never apply a lipid/glucose/vitamin factor.
A unit-unknown value is displayed but not interpreted; the De Ritis ratio is computed only when ALT is
present and is meaningful only with elevated absolutes; sex is required for the Optimal/High-Normal boundary. **[D]**

---

# 8. Measurement Limitations & the Companion-Organ Principle  *(Context-First basis — reused SCL-010)*

AST's defining limitation is that **a value does not, on its own, identify a tissue source** — which is why
the Context-First (Companion-Organ) gate (§0.2), the governed De Ritis ratio (§0.5), and the ranked-source
output apply. **[A][B2]**

## 8.1 Not liver-specific — [A]
AST spans liver, heart, skeletal muscle, kidney, brain, and red cells; an elevation can come from any of
them, so it is never read as liver disease in isolation. **[A][T2][T3]**

## 8.2 Tissue-source differential — [A]
Muscle (rhabdomyolysis, extreme exercise — AST>ALT, check CK), cardiac (MI — troponin is primary),
haemolysis (RBC AST; haemolysed sample), and viral-illness rhabdomyolysis are recognised non-hepatic
sources. **[A][T14][T15][T16][T17]**

## 8.3 The De Ritis ratio is governed — [A]
The AST:ALT ratio is meaningful only when the absolute enzymes are elevated, has no universal cutoff, and is
a pattern hint read with GGT/CK/alcohol/muscle context — never a standalone verdict. **[A][T24][T25]**

## 8.4 Kinetic & pre-analytical variability — [A]
AST peaks 24–36h and clears in days; haemolysed samples, exercise, and IM injections skew it, so single
values are often repeated. **[A][T9][T32]**

## 8.5 Lab-dependent ranges & sex — [A]
Reference ranges are lab-derived and vary; AST runs higher in men (≈0.8× ALT). Method/sex context is a
confidence input. **[A][T4][T6]**

**How BioSense uses this — [C][D]:** the Companion-Organ gate runs first; AST is banded sex-aware and graded
by multiples of ULN; the De Ritis ratio is computed and governed; plausible tissue sources are **ranked, not
asserted**; muscle/cardiac/haemolysis and transience possibilities are surfaced; missing ALT/companion
markers set Context-Required/Reduced confidence; and no condition is ever named.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010; De Ritis governed via SCL-007)*

AST consumes its companion enzymes and context markers where available. **[A][C]**

- **ALT (SCL-014) — the central companion. [A]** AST is always read with ALT. The **De Ritis (AST:ALT)
  ratio** is a **governed derived metric** (id/version, parents AST+ALT): computed only when both are present,
  meaningful only when absolutes are elevated, and a **pattern hint, never a verdict** — <1 metabolic/viral,
  ~1 healthy, 1–2 fibrosis context, >2 alcoholic/muscle context. **[A][T18][T22][T24][R9]**
- **hs-CRP (SCL-006). [A]** Systemic-inflammation/metabolic context. **[A][T28]**
- **Ferritin (SCL-010). [A]** Iron/metabolic context (raised in metabolic and some hepatic states). **[A]**
- **Future GGT. [A]** Supports an alcohol context and helps localise a hepatobiliary source alongside a high
  De Ritis. **[A][T22]**
- **Future ALP & bilirubin. [A]** Distinguish hepatocellular from cholestatic patterns; bilirubin flags
  severity; a rapid AST rise-and-fall can indicate a biliary obstruction context. **[A][T12]**
- **(Context) CK for muscle; troponin for cardiac; vitamin B6. [A]** Where a muscle source is plausible (AST
  up, ALT normal), **CK** clarifies; for cardiac context, **troponin** is the primary marker (BioSense does
  not assess cardiac events); low AST may reflect **B6** deficiency. **[A][T14][T15][T27]**

**Cross-biomarker rule [C] (reused R4):** where these are **available**, BioSense consumes them (with the
governed De Ritis ratio and extrahepatic caveats) to sharpen the ranked sources and confidence; where
**unavailable** — especially **ALT** (without which the De Ritis ratio cannot be computed) — it records a
**confidence limitation** and names what would clarify, never inventing certainty. **[C][R4]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **AST rises with tissue injury** (enzyme leaks from injured cells). **[A][T1]**
- **AST is multi-tissue, NOT liver-specific** (liver, heart, muscle, kidney, brain, RBC); less specific than
  ALT. **[A][T2][T3]**
- **Elevations are graded by multiples of ULN; magnitude parallels damage.** **[A][T10][T26]**
- **The AST:ALT (De Ritis) ratio is a pattern hint, meaningful only with elevated absolutes, not a verdict.** **[A][T24]**
- **AST is kinetic (peak 24–36h) and easily confounded** (haemolysis, exercise, IM injections). **[A][T9][T32]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **Laboratory reference ranges vary** (8–33, 0–41, 5–40, 10–40 U/L) and are population-derived. **[A][T4][T5]**
- **There is no universal De Ritis cutoff** (age/sex/body-composition/training/lab shift the baseline);
  reported thresholds (>1, >1.5, >2, >3, >8) mark different contexts. **[A][T22][T25]**
- **Why:** AST is a continuous, multi-tissue, kinetic marker whose reference populations, sex-handling, and
  ratio-context vary. BioSense **presents the differing ranges/cutoffs and never averages them** (reused R5). **[A][E]**

## 10.3 Strength of evidence
- **AST as a multi-tissue injury marker; severity-by-multiples; kinetics: established.** **[A][T2][T9][T26]**
- **Sex-difference; AST≈0.8×ALT: established.** **[A][T6]**
- **De Ritis pattern associations: established as patterns, not diagnoses; no universal cutoff (evolving on cutpoints).** **[A][E][T24][T25]**
- **Extrahepatic/haemolysis/exercise sources: established.** **[A][T14][T16]**
- **Low-AST (B6/CKD) association: evolving.** **[E][T27]**

## 10.4 Intended populations
Thresholds target general-adult interpretation, sex-stratified, always with ALT. BioSense applies them
context-first, abstaining or requiring context in pregnancy (HELLP context), likely-transient/haemolysed
states pending repeat, and where ALT/companion markers are unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. AST is SEX-AWARE, HIGH-DOMINANT TWO-SIDED, graded by
> MULTIPLES OF THE ULN, CONTEXT-GATED, and NOT liver-specific: the value is read as a tissue-injury signal
> in context (never liver disease in isolation), always alongside ALT, and where several tissue sources are
> plausible they are RANKED, not asserted. The De Ritis (AST:ALT) ratio is a governed companion metric.**

## 11.1 The sex-aware wellness bands (U/L; general adult; after Companion-Organ gate)

`ULN_ref` = the sex-specific upper anchor: **Male 35 U/L**, **Female 30 U/L** (men run higher; AST ≈0.8× ALT).
The conventional lab ULN (~40 U/L) is shown as context and is the anchor for the severity multiples. Both are
shown; **neither is averaged** (§11.5). **[A][T4][T6]**

| BioSense Wellness Interpretation | Associated AST (U/L) | Evidence anchor | Wellness meaning (context-first; no diagnostic label) |
|---|---|---|---|
| **Low — Context Flag** | v < 10 | Low-end context [T27] | Gently noted; evolving B6/kidney context; usually not significant. |
| **Optimal** | 10 ≤ v ≤ ULN_ref (M 35 / F 30) | Favourable range for sex [T4][T6] | Within a favourable range. |
| **High-Normal — Watch** | ULN_ref < v ≤ 40 | Above sex anchor, within conventional [T4][T28] | Above the sex anchor but within conventional lab range; note metabolic/muscle context. |
| **Borderline Elevated** | 40 < v ≤ 80 (<2× ULN) | Borderline [T26] | Very common, context-driven; repeat suggested; ranked sources; De Ritis as context. |
| **Mild Elevated** | 80 < v ≤ 200 (2–5× ULN) | Mild [T26] | Unhurried review; source depends on De Ritis + context; ranked. |
| **Moderate Elevated** | 200 < v ≤ 600 (5–15× ULN) | Moderate [T26] | Calm prompt review; acute viral/autoimmune/drug/ischaemic-early patterns; ranked. |
| **Severe Elevated** | v > 600 (>15× ULN) | Severe/massive [T11][T13] | Prompt review; acute viral (1,000–10,000)/toxin/ischaemic (>50× ULN); peak ≠ prognosis. |

*(Severity multiples use the conventional ULN ~40 as the anchor. The sex-specific ULN_ref (35/30) drives the
Optimal vs High-Normal boundary. Both are shown; never averaged.)*

## 11.2 Severity-by-multiples (wellness context, not diagnosis) [A][B]
Borderline (<2×), Mild (2–5×), Moderate (5–15×), Severe (>15×) of ULN describe **magnitude**, which parallels
the extent of injury and shifts the *likely* context — read **with the De Ritis ratio and absolute ALT**.
Pattern hints (never alone): alcoholic AST >8× ULN & ALT >5× ULN; NAFLD both >4× ULN; acute viral both ~25×
ULN; ischaemic >50× ULN. All are **wellness context, never a diagnosis or a specific cause**. **[A][T11][T26][R7]**

## 11.3 How the bands were derived — transparency [B]
- The Optimal ceiling uses the **sex-specific** anchor (M 35 / F 30, reflecting men-higher and AST≈0.8×ALT);
  **High-Normal — Watch** spans up to the conventional ~40; the elevated bands map to the recognised
  **multiples-of-ULN** grades. **[T4][T6][T26]**
- **No number was averaged.** The varying lab ranges and the varying De Ritis cut-offs are presented as
  differing frameworks (§11.5). **[R5]**
- The **low-end flag** is a gentle, evolving-evidence context marker, never alarming. **[T27]**

## 11.4 Deterministic, ordered intervals [B]
Bands are contiguous and non-overlapping across the range (Low-flag <10; Optimal 10–ULN_ref; High-Normal
ULN_ref–40; then 40–80, 80–200, 200–600, >600). Boundaries use consistent operators so no value falls into
two bands. Sex sets the Optimal/High-Normal boundary; if sex is unknown, confidence is reduced and the
conventional ULN 40 is used. **[B][T6]**

## 11.5 Guideline-disagreement display (reused posture) [B][C]
Where relevant, BioSense notes that laboratory ranges differ and that the De Ritis ratio has **no universal
cutoff**, showing the value and ratio against their recognised context bands rather than a single line — as
distinct frameworks, **never averaged** (CAV8). **[B][C][R5][T25]**

## 11.6 Context-gate precedence [D]
No band, severity, or ratio statement is emitted as a verdict without the Companion-Organ evaluation (§0.2).
ALT/De Ritis, muscle (CK)/cardiac (troponin)/haemolysis context, metabolic context, and transience (repeat)
are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general adult**, sex-stratified, read **with ALT**. Ranges are lab-dependent; AST is not
liver-specific, is kinetic/transiently movable, and is easily confounded (haemolysis/exercise/IM injection);
the low-end flag is evolving. Not applied to children/adolescents or, without care, to pregnancy (§15). **[E][T4]**

---

# 12. Interpretation Framework — COMPANION-ORGAN / CONTEXT-FIRST (reused from SCL-010; De Ritis governed via SCL-007)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010) and derived-metric
> governance (SCL-007, for the De Ritis ratio). Per the founder's Companion-Organ decision, AST is
> interpreted as a context-dependent tissue-injury marker, never liver disease in isolation, always with ALT.
> No new methodology is introduced.** **[C][R1][R9]**

```
STEP 0 — CONTEXT-FIRST / COMPANION-ORGAN (before anything else):                                   [R1][B2]
   INTERPRETATION BEGINS WITH CONTEXT. gather materially-relevant context (ALT/De Ritis; hs-CRP; ferritin;
   future GGT/ALP/bilirubin; alcohol; recent strenuous exercise/muscle injury (CK); cardiac context (troponin);
   haemolysis/haemolysed sample; recent viral illness; medications; pregnancy).                    [R4]
   → if material context changes meaning, interpret WITHIN it; if key context unavailable, record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit U/L; result final; not obviously haemolysed) → else display-only/flag. [T32]
STEP 2 — ELIGIBILITY: general adult → else abstain/age-or-pregnancy-aware (§15).
STEP 3 — KINETICS/TRANSIENCE CHECK: new/isolated value or recent exercise/illness/IM-injection/possible haemolysis → prefer REPEAT (peak 24–36h, clears 3–7d). [T9]
STEP 4 — CONFIDENCE (four-level): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED (§0.6).         [R2]
STEP 5 — BAND: assign sex-aware, high-dominant band (§11.1); if sex unknown → conventional ULN 40 + reduced confidence. [R8]
STEP 6 — SEVERITY CONTEXT: grade by multiples of ULN (§11.2) as wellness context, not diagnosis.
STEP 7 — DE RITIS (governed): if ALT present, compute ratio (§0.5); meaningful only with elevated absolutes; pattern-hint, not verdict. [R9]
STEP 8 — RANKED SOURCES: on elevation/discordance with ≥2 plausible sources → Possible Source A/B/C, ranked by evidence + context (De Ritis, muscle/CK, cardiac, haemolysis, alcohol, metabolic). [R3][B2]
STEP 9 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); route where appropriate; NO diagnosis. [R7]
```

**Core interpretive stance [B]:** AST is a context-first, sex-aware companion-organ marker — a signal of
possible tissue injury read with ALT and the governed De Ritis ratio, graded by multiples of the usual
ceiling, with plausible tissue sources ranked rather than one asserted, lab-range and ratio disagreement
shown honestly, and no condition named. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy — reused SCL-010)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear value AND sex known AND ALT available (De Ritis computable) AND sufficient context AND not obviously transient/haemolysed | Band + severity + governed De Ritis + ranked sources normally |
| **REDUCED** | Single value / sex unknown / lab variation / possible transient (exercise/illness) / possible haemolysed sample / minor context | Band cautiously; prefer repeat; name the reducer (CAV3/CAV4) |
| **CONTEXT_REQUIRED** | Elevation with no ALT (no De Ritis) and no source context (muscle/cardiac/haemolysis/metabolic) | Rank-with-limitation or request repeat/companions; name needed context (CAV5/CAV7) |
| **ABSTAINED** | Significant contextual uncertainty / conflicting signals / ineligible population | Explained abstention; route |

Reducers/context inputs: sex unknown [T6]; single value / kinetics (possible transient) [T9]; possible
haemolysed sample or recent exercise/IM injection [T32]; missing ALT (no De Ritis) or other companions [R4];
lab-range/ratio-cutoff variability [T4][T25]; muscle/cardiac/haemolysis possibility [T14][T15][T16];
pregnancy; value near a band boundary. **[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant contextual
uncertainty **may** justify abstention; a new elevation prefers a **repeat-test** framing (kinetics). **[R2][T9]**

---

# 14. Wellness Interpretation  *(companion-organ, sex-aware, governed De Ritis, ranked sources)*

Interpretation-by-interpretation guidance, applied **after** the Companion-Organ gate. Wellness, not medical;
**never a diagnosis**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal** *(10–ULN_ref; context concordant).* "Your AST sits in a
  favourable range for {sex}, and reads well alongside your ALT. It's a single snapshot in context, but
  nothing here stands out." **[B]**
- **BioSense Wellness Interpretation: High-Normal — Watch** *(ULN_ref–40).* "Your AST is within the
  conventional lab range but a little above the typical level for {sex}. That's not a problem in itself; read
  with your ALT and any metabolic or muscle context, it's a gentle nudge to keep an eye on things." **[B][D]**
- **BioSense Wellness Interpretation: Borderline / Mild Elevated** *(40–200; <2×–5× ULN).* "This is a mild
  elevation. Because AST sits in several tissues, we've noted the more likely sources for your context —
  liver, muscle, or red-cell related — rather than pointing to one, and the AST:ALT pattern helps here.
  AST also rises and falls over hours to days, so repeating the test is often sensible." Constructive; **no
  diagnosis** (CAV4, CAV5, CAV8). **[B][D]**
- **BioSense Wellness Interpretation: Moderate / Severe Elevated** *(>200; >5×–>15× ULN).* Calm routing:
  "This degree of change is worth a prompt, unhurried conversation with a healthcare professional, who can
  look at the fuller picture with ALT and other markers. The number alone doesn't tell us the tissue or the
  cause." **No alarm, no diagnosis; peak ≠ prognosis** (CAV6). **[B][D][T13]**
- **BioSense Wellness Interpretation: Low — Context Flag** *(<10).* "Your AST is on the low side. This is
  usually not significant; occasionally it's linked with low vitamin B6 or kidney context, so it's simply
  noted." (evolving) **[B][T27]**

**De Ritis modifier (governed companion metric):** where ALT is available and the absolutes are elevated,
present the AST:ALT pattern as **context** — <1 (metabolic/viral), 1–2 (fibrosis context), >2 (alcoholic/
muscle context) — always as a **hint, never a verdict** (CAV8). Where both enzymes are normal, the ratio is
not clinically meaningful and is suppressed/annotated. **[D][T22][T24][R9]**

**Ranked-sources modifier (founder decision):** on any elevation with ≥2 plausible tissue sources, present
**Possible Source A/B/C** ordered by evidence + context (hepatocellular, strenuous exercise, skeletal-muscle
injury, alcohol-related, haemolysis, cardiac) — never a single certain source, never a named condition. **[D][R3][B2]**

**Muscle/cardiac/haemolysis modifier:** AST up with normal ALT → suggest a **muscle** context (CK); a
**cardiac** context is flagged only to note that **troponin**, not AST, is the marker (BioSense does not
assess cardiac events); a **haemolysed sample** is a pre-analytical possibility (CAV9). **[D][T14][T15][T16]**

**Context-unavailable modifier:** where **ALT** (needed for De Ritis) or other companions are missing, state
the confidence limitation and name what would clarify (CAV7); never invent certainty (S8). **[D][R4]**

Every interpretation pairs the band, severity, and governed ratio with context guidance (§17) and the
mandatory caveats (§0.10). **None diagnoses liver disease, cirrhosis, a heart attack, rhabdomyolysis, or
muscle disease, none asserts a single source, and none treats a BioSense band, ULN, or De Ritis cut-off as a
medical boundary.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for AST).** Elevation with **no ALT** (no De Ritis) and no source context →
  rank-with-limitation or request a repeat/companions; state what's needed (§13, CAV5/CAV7). **[D][R2]**
- **15.2 Likely-transient/confounded states.** Recent strenuous exercise, IM injection, a possibly haemolysed
  sample, or a recent viral illness → prefer the repeat-test framing before interpretation (kinetics). **[D][T9][T32]**
- **15.3 Possible muscle source.** AST elevated with normal/mildly-raised ALT → surface a muscle context and
  the **CK** clarifier; never diagnose rhabdomyolysis/muscle disease. **[D][T14]**
- **15.4 Possible cardiac context.** Note that **troponin** is the primary cardiac marker; BioSense does not
  assess cardiac events and routes calmly if a cardiac context is raised. **[D][T15]**
- **15.5 Children & adolescents.** Age-specific AST ranges differ; adult bands not applied — display, suggest
  professional interpretation. **[D]**
- **15.6 Pregnancy.** Aminotransferases are generally **lower** in pregnancy; a markedly **high** AST with
  hypertension is a professional matter (HELLP/pre-eclampsia context) — BioSense interprets with care/abstains
  and routes. **[D][T29]**
- **15.7 Red flags.** Jaundice, ascites, encephalopathy, synthetic-dysfunction signs (low albumin, high INR,
  high bilirubin), or severe >15× ULN → calm prompt healthcare review regardless of band. **[D][T13]**
- **15.8 Sex unknown.** Use conventional ULN 40 with reduced confidence; note that sex refines the range. **[D][T6]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Repeat-first for new elevation. [A]** AST is kinetic (peak 24–36h, clears 3–7d); the primary
  longitudinal move is a repeat before reading a trend, especially with exercise/haemolysis confounds. **[T9]**
- **Persistence matters. [A]** A persistent elevation suggests ongoing/chronic tissue injury and is what
  warrants unhurried evaluation — persistence, not a single value, is the signal. **[T10]**
- **Trend the ratio too. [A]** The De Ritis ratio is trended (when governed/meaningful); a rising ratio can
  shift the ranked sources (e.g. toward a fibrosis or alcoholic context) — as context, not a verdict. **[T21][T22]**
- **Assay/lab consistency. [A]** Comparing values across labs/methods (differing ranges) is a trend caveat,
  not a true change; day-to-day variation is 5–10%. **[T4][T9]**
- **Context/abstained points. [C]** Likely-transient, haemolysed, discordant, or context-required points are
  tagged so they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For AST, the first tier is **context and companion markers** (ALT/De Ritis above all), then context-appropriate
lifestyle. **[A]/[B]**

## 17.1 Companion markers & context first [A][T14][T18][T24]
Where AST is raised, the clarifying steps are **ALT (for the De Ritis pattern)**, the **muscle** context
(CK), **cardiac** context (troponin — clinician-led), **haemolysis** check, and — in time — GGT/ALP/
bilirubin, ferritin, hs-CRP; and, for a new value, a **repeat**. **[A]**

## 17.2 Metabolic & lifestyle context [A][T28]
Where a metabolic pattern is plausible (read via ALT/De Ritis), general liver-friendly wellness — weight,
alcohol moderation, activity — is relevant context. Note that **strenuous exercise** itself can raise AST
transiently. Framed as **education, not treatment**. **[A][T14]**

## 17.3 Exposure & confound context [A][T32]
Alcohol, medications, recent intense exercise, IM injections, and haemolysed samples are recognised context/
confounds for an AST elevation — useful for interpretation, **never** a prompt to change any medication. **[A]**

## 17.4 Framing rules [B][D]
Context and companion markers first (repeat for new elevation); **no specific treatments, medication changes,
or doses** (S9); lab-range/ratio disagreement shown, never averaged; calm, evidence-informed language; never a
diagnosis; the companion-organ (CAV2), governed-ratio (CAV8), and muscle/cardiac (CAV9) caveats attached where
relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain that AST is a context-dependent, multi-tissue injury marker and ALT's companion;
run the companion-organ evaluation; assign the sex-aware band and severity context; compute and present the
**governed** De Ritis ratio as a pattern hint; integrate ferritin/hs-CRP (and future GGT/ALP/bilirubin) with
muscle/cardiac/haemolysis caveats; present **ranked** tissue sources for an elevation; recommend a repeat for a
new value; name which markers would clarify (especially ALT); express context-required/abstention respectfully.

The AI layer **must never**:
- emit "liver disease", "cirrhosis", "hepatitis", "myocardial infarction/heart attack", "rhabdomyolysis", "muscle disease", or any condition as a diagnosis — even to deny one (S1)
- interpret AST as liver disease in isolation, or as liver-specific (S2)
- assert a single tissue source for an elevation when ≥2 are plausible — rank them (S3)
- present the De Ritis ratio as a standalone diagnosis, compute it without ALT, or treat it as meaningful when absolutes are normal (S4)
- ignore sex (use sex-specific ULN_ref; sex unknown → reduced confidence + conventional 40) (S5)
- load interpretation onto a new/isolated or possibly-confounded value without preferring a repeat (S6)
- ignore muscle (CK)/cardiac (troponin)/haemolysis possibilities (S7)
- recommend treatments, medication changes, or doses; produce a disease-risk % (S9)
- invent certainty when ALT/companion markers/context are unavailable — state the limitation (S8)
- fail to route red flags, severe elevations, or a pregnancy-high-AST-with-hypertension context calmly and promptly (S10)
- present a BioSense band, ULN, severity multiple, or De Ritis cutoff as a medical/diagnostic boundary (S11)
- average contested ranges or ratio cut-offs (S12)

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any liver, cardiac, or
muscle condition is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes
  patterns, never names liver disease/cirrhosis/MI/rhabdomyolysis/muscle disease (S1). **[D][R7]**
- **Companion-organ honesty.** AST is presented as a context-dependent, multi-tissue injury marker, never
  liver-specific or liver disease in isolation; interpretation begins with context (S2, CAV2). **[D][B2]**
- **Ranked, not asserted.** Where several tissue sources fit, they are ranked by evidence + context, never
  reduced to one (S3, CAV5). **[D][R3]**
- **Governed De Ritis.** The ratio is computed only with ALT, meaningful only with elevated absolutes, and a
  pattern hint — never a standalone verdict (S4, CAV8). **[D][R9][T24]**
- **Repeat-first for new/confounded values.** Kinetics and confounds (haemolysis/exercise/IM injection) lead
  to a repeat framing (S6, CAV4). **[D][T9][T32]**
- **Muscle/cardiac/haemolysis awareness.** AST-up-ALT-normal → CK/muscle context; cardiac context → troponin
  is primary; haemolysed-sample possibility surfaced (S7, CAV9). **[D][T14][T15][T16]**
- **Calm red-flag routing.** Jaundice/ascites/encephalopathy, synthetic-dysfunction signs, severe >15× ULN, or
  pregnancy-high-AST-with-hypertension → prompt, unhurried review; never emergency-diagnose; peak ≠ prognosis
  (S10, CAV6). **[D][T13][T29]**
- **No treatment/medication guidance.** (S9). **[D]**
- **Missing markers/context stated, not invented.** (S8). **[D][R4]**
- **Correct unit handling.** U/L used as-is (no analyte conversion factor); De Ritis computed only with ALT;
  sex required for the Optimal/High-Normal boundary. **[D][T30]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. An elevation is **persistent on repeat** testing. **[T10]**
2. The value is **moderate or severe** (≥5× ULN). **[T26]**
3. **Red flags** are present — jaundice, ascites, encephalopathy, or synthetic-dysfunction signs. **[T13]**
4. The **De Ritis pattern** (with elevated absolutes) suggests an **alcoholic** or **fibrosis** context. **[T22]**
5. **AST-dominant** with a plausible **muscle** context (AST up, ALT normal, CK relevant), or any **cardiac**
   context (troponin-led). **[T14][T15]**
6. **Pregnancy** with a markedly high AST (± hypertension), or the user **asks a medical/medication question**
   (S9). **[T29]**

All suggestions are wellness-framed, non-urgent (unless red flags), non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-015 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for AST (U/L) plus assay/lab-range and
  sex metadata, and — as interpretation inputs — **ALT (SCL-014; for the governed De Ritis ratio), hs-CRP
  (SCL-006), ferritin (SCL-010), and future GGT/ALP/bilirubin**, plus declared context (alcohol, recent
  exercise/muscle injury, cardiac context, haemolysis, medications, viral illness, pregnancy). **[R4]**
- **Supplies (as CSL bindings):** the sex-aware high-dominant bands (Category B), the severity-by-multiples
  context, the **governed De Ritis (AST:ALT) metric**, the reused Companion-Organ/Context-First gate, the
  reused four-level confidence hierarchy, the reused ranked multiple-explanations (tissue-source) output, the
  reused cross-biomarker consumption (with graceful degradation), the lab-range/ratio-disagreement display, the
  kinetics/repeat behaviour, safety rules, context guidance, and narrative templates — each with value +
  source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, the confidence hierarchy, the
  multiple-explanations output, and cross-biomarker intelligence (all frozen from SCL-010); **derived-metric
  governance (SCL-007) for the De Ritis ratio**; sex-aware banding (SCL-004/010/014); the guideline-
  disagreement posture (SCL-003/011/012); two-sided banding (SCL-004/009/010/011/012/014); and the
  diagnostic-adjacency discipline (SCL-002/009/011/012/014). **The companion-organ interpretation is
  represented within Context-First — not as a new methodology.** **[C][R1][R9]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (companions inform, rank, and the
  ratio is governed — never averaged into a single verdict; contested ranges/cutoffs never averaged).
- **Uses the correct unit handling** (U/L as-is; no analyte factor) — a per-analyte configuration.
- **Score contribution:** AST contributes to a metabolic/hepatic-wellness context **as ALT's companion** — a
  sex-aware, high-dominant, context-gated input whose elevations are expressed as ranked-source context (with
  the governed De Ritis pattern) rather than a verdict; likely-transient/context-required values do not
  contribute a definite verdict. Any weighting is a Category [C] product decision. **[C]**

---

# 22. Medication & Exposure Context (educational only)

Educational context only; BioSense does not instruct on treatment, dose, or medication changes (S9). **[D]**
- Many medications and alcohol are recognised context for an AST elevation; AST is also an accepted DILI
  biomarker (alongside ALT), though less sensitive. A raised AST on medication is interpreted **with** that
  context, but any decision about a medication belongs to the prescriber. **[A][T31]**
- **Muscle-active contexts** (e.g. intense training, IM injections, and — rarely — statin-related myopathy)
  can raise AST via muscle; this is surfaced as context (with CK), never as a medication instruction. **[A][T14]**
- Any medication or exposure question → educational context + suggestion to speak with a healthcare
  professional; BioSense never advises starting, stopping, or changing a medication. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **AST is not liver-specific. [E]** Multi-tissue origin (liver/muscle/cardiac/kidney/brain/RBC); the
   companion-organ, ranked-source approach and the governed De Ritis ratio handle this. **[T2]**
2. **Lab ranges differ. [E]** Reference ranges are population-derived and vary; BioSense shows the frameworks,
   never averages. **[T4][T5]**
3. **No universal De Ritis cutoff. [E]** Age/sex/body-composition/training/lab shift the baseline; the ratio
   is a governed pattern hint, not a verdict. **[T25]**
4. **AST is kinetic and easily confounded. [E]** Peak 24–36h; haemolysis/exercise/IM injection skew it;
   repeat mitigates. **[T9][T32]**
5. **Severity multiples use a convention. [E]** The ×ULN grades use the conventional ~40 anchor; the sex
   anchor differs — both shown, never merged. **[T26][R5]**
6. **Low-AST (B6/CKD) association is evolving. [E]** Represented as a gentle context flag. **[T27]**
7. **Companion availability is data-dependent. [E]** Without ALT the De Ritis ratio cannot be computed;
   ranked sources then degrade to a confidence limitation, not certainty. **[R4]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**;
companion-organ; sex-aware; governed De Ritis; ranked sources; repeat-first for new/confounded). **[B]/[D]**
(Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL (context concordant/not needed)
"Your AST is {value} U/L — in a favourable range for {sex}, and it reads well alongside your ALT. A single
 snapshot in context, but nothing here stands out."  +CAV1 +CAV2

TEMPLATE: HIGH_NORMAL_WATCH (ULN_ref–40)
"Your AST is {value} U/L — within the conventional lab range but a touch above the typical level for {sex}.
 Read with your ALT and any metabolic or muscle context, it's a gentle nudge to keep an eye on things."  +CAV1 +CAV2

TEMPLATE: BORDERLINE / MILD_ELEVATED (40–200 ; <2×–5× ULN)
"Your AST is {value} U/L — a mild elevation. Because AST sits in several tissues, here are the more likely
 sources for your context rather than a single answer: {ranked A/B/C}. The AST:ALT pattern helps, and since
 AST changes over hours to days, repeating the test is often sensible."  +CAV1 +CAV2 +CAV4 +CAV5 +CAV8

TEMPLATE: MODERATE / SEVERE_ELEVATED (>200 ; >5×–>15× ULN — CALM ROUTING, NOT ALARM)
"Your AST is {value} U/L — a more marked change. This is worth a prompt, unhurried conversation with a
 healthcare professional, who can look at the fuller picture with ALT and other markers; the number alone
 doesn't tell us the tissue or the cause."  +CAV1 +CAV2 +CAV6

TEMPLATE: LOW_CONTEXT_FLAG (<10)
"Your AST is on the low side at {value} U/L. This is usually not significant; occasionally it's linked with
 low vitamin B6 or kidney context, so it's simply noted."  +CAV1

MODIFIER: DE_RITIS_PRESENT (ALT available, absolutes elevated) →
 "With your ALT, the AST:ALT pattern is {ratio} — leaning toward {metabolic/viral | fibrosis | alcoholic/muscle}
  context. That's a hint, not a diagnosis, and it's read with your other results."  +CAV8

MODIFIER: RANKED_SOURCES (elevation, ≥2 sources) →
 "Possible sources, most-to-least likely for your context: A {…}, B {…}, C {…} — best confirmed with a professional."  +CAV5

MODIFIER: MUSCLE_CARDIAC_HAEMOLYSIS →
 "If AST is up but ALT isn't, a muscle source is worth considering (a muscle enzyme, CK, helps). Troponin, not
  AST, is the marker for the heart; and a haemolysed sample can nudge AST too."  +CAV9

MODIFIER: TRANSIENCE (new/isolated ; recent exercise/IM injection/possible haemolysis) → lead with repeat-test framing.  +CAV4

MODIFIER: CONTEXT_UNAVAILABLE (no ALT → no De Ritis) →
 "We'd interpret this more confidently with ALT (to calculate the AST:ALT pattern), and in time GGT, ALP and bilirubin."  +CAV7

MODIFIER: RED_FLAGS / PREGNANCY_HIGH_AST → calm prompt review.  +CAV6
```

**Absolute rules:** no template diagnoses a liver/cardiac/muscle condition, asserts a single source, presents
the De Ritis ratio as a verdict (or computes it without ALT), treats a band/ULN/cutoff as a diagnostic
boundary, omits sex-awareness, alarms, or averages ranges/cutoffs. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, male, with ALT. [illustrative]**
```
Input: AST 26 U/L, male, ALT 24 (both normal).
Band: OPTIMAL (≤35 M) | De Ritis: 1.08 but absolutes normal → NOT clinically significant (suppress/annotate) | Confidence: STANDARD
Narrative: OPTIMAL +CAV1+CAV2 ; ratio annotated as not-meaningful.  [T20,T24,R9]
```

**Example 2 — Mild, AST-dominant, muscle context. [illustrative]**
```
Input: AST 150 U/L, ALT 45, recent heavy resistance training, no CK.
Band: MILD_ELEVATED | De Ritis 3.3 (elevated absolutes) → pattern hint | Confidence: REDUCED (transient/muscle; no CK)
Narrative: ranked A(skeletal-muscle/exercise — AST>ALT, suggest CK) B(hepatocellular) C(other) +CAV5+CAV9 ; repeat +CAV4 ; De Ritis +CAV8 ; NO "rhabdomyolysis" diagnosis.  [T14,T22,S3,S4]
```

**Example 3 — Mild, alcoholic-pattern context. [illustrative]**
```
Input: AST 160 U/L, ALT 70 (De Ritis 2.29), alcohol context, GGT context.
Band: MILD_ELEVATED | De Ritis >2 → alcoholic-injury CONTEXT (not verdict) | Confidence: STANDARD
Narrative: ranked A(alcohol-related) B(metabolic) C(other) +CAV5 ; De Ritis +CAV8 (hint, not diagnosis) ; calm review ; NO "alcoholic liver disease" diagnosis.  [T22,T23,R7,R9]
```

**Example 4 — Elevation, no ALT available. [illustrative]**
```
Input: AST 90 U/L, sex unknown, ALT not available.
Band: BORDERLINE (conventional ULN 40) | De Ritis: NOT computable (no ALT) | Confidence: CONTEXT_REQUIRED / REDUCED (sex unknown)
Narrative: repeat-first +CAV4 ; +CAV7 (name ALT for De Ritis; GGT/ALP/bilirubin) ; +CAV3 (sex refines range) ; NO diagnosis.  [T6,R4,S4,S8]
```

**Example 5 — Severe elevation. [illustrative]**
```
Input: AST 1500 U/L, ALT 1800 (De Ritis 0.83).
Band: SEVERE_ELEVATED | De Ritis <1 (hepatocellular/viral/ischaemic context) | Confidence: STANDARD
Narrative: calm prompt healthcare review +CAV6 ; ranked A(acute viral) B(toxin/drug) C(ischaemic) ; peak≠prognosis ; NO diagnosis.  [T11,T13,S10]
```

**Example 6 — Possible haemolysed sample. [illustrative]**
```
Input: AST 70 U/L, ALT 25, sample flagged possible haemolysis.
Band: BORDERLINE | De Ritis 2.8 but haemolysis confound | Confidence: REDUCED
Narrative: repeat-first +CAV4 ; +CAV9 (haemolysed sample can nudge AST) ; ratio hint held lightly +CAV8 ; NO diagnosis.  [T16,T32,S6]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-014 (ALT)** — the central companion; AST is co-reported with ALT and the **De Ritis (AST:ALT) ratio**
  is derived from the two.
- **SCL-007 (non-HDL-C)** — source of the reused **derived-metric governance** applied to the De Ritis ratio
  (id/version, parent provenance, never silently recalculated, never a standalone verdict).
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, four-level confidence
  hierarchy, multiple-explanations output, and cross-biomarker intelligence; and the iron/ferritin companion.
- **SCL-006 (hs-CRP)** — systemic-inflammation context.
- **SCL-004 (HDL-C) / SCL-010 / SCL-014** — precedent for the reused sex-aware banding.
- **SCL-011 (Vitamin D) / SCL-012 (B12)** — precedent for guideline-disagreement / dual-framework display.
- **Future GGT, ALP, Bilirubin SCLs** — companion hepatobiliary markers AST consumes; where unavailable, a
  confidence limitation is recorded.
- **SCL-002 (HbA1c) / SCL-009 (Fasting Glucose)** — source of the reused diagnostic-adjacency discipline.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the T-series IDs in §0 and
> the body. Developers finalising the pack should confirm exact page/table locators against the primary
> sources where required.

**Distribution, mechanism, kinetics, ranges (Category A anchors)**

1. Medscape: **Aspartate Aminotransferase — Reference Range / Interpretation** (article 2087224). — *AST in
   liver, heart, muscle, RBC, pancreas, kidney, brain; not exclusive to liver; kinetics (rise hours, peak
   24–36h, normalise 3–7d); parallels damage; acute hepatitis up to 20× ULN; biliary ~10×; low-AST B6/CKD
   (T2, T9, T10, T11, T12, T27).*
2. **Cleveland Clinic: Aspartate Transferase (AST).** — *AST in liver, heart, pancreas, muscle and other
   tissues; ALT more liver-specific; reference ~8–33 U/L; range varies by lab (T2, T4).*
3. **ScienceDirect Topics: Aspartate Aminotransferase (overview & blood level).** — *AST in mitochondria of
   liver + cytosol of RBC/muscle → not liver-specific; AST≈0.8×ALT; men higher; half-life 17±5h; day-to-day
   5–10%; ranges = local mean ±2SD (may include NAFLD); viral illness rhabdomyolysis; haemolysis; DILI
   biomarker (T3, T5, T6, T7, T8, T9, T16, T17, T31).*
4. **Lola Health (2026): AST explained.** — *highest in heart, liver, skeletal muscle, kidney, brain, RBC;
   less liver-specific; muscle/rhabdomyolysis (check CK); MI 6–8h (troponin primary); haemolysis; ischaemic;
   De Ritis pattern & B6 mechanism (T2, T14, T15, T16, T13, T22, T23).*

**De Ritis (AST:ALT) ratio — governed companion metric (Category A)**

5. **HealthMatters.io: AST/ALT ratio & AST (SGOT).** — *ratio = AST÷ALT, calculated not measured; <1 NAFLD/
   viral; ~1 (0.7–1.2) healthy; 1–2 cirrhosis/NASH; >2 alcoholic (also muscle/cirrhosis); >3 high-specificity
   alcoholic; >8 rare (non-alcoholic/mixed); meaningful only with elevated absolutes; interpret with GGT/CK
   (T18, T19, T20, T21, T22, T24, T26).*
6. **Superpower: De Ritis (AST:ALT) ratio guides** & **OptimalDX: AST/ALT De Ritis.** — *no universal cutoff
   (age/sex/body-composition/training/lab); pattern indicator not standalone verdict; muscle/exercise confound
   (CK); B6 depletion mechanism; pregnancy lowers aminotransferases (HELLP/pre-eclampsia exception); confounds
   (haemolysis, exercise, IM injections, meds) (T22, T23, T24, T25, T29, T32).*

**Severity patterns & metabolic context (Category A)**

7. **USPTO 12252728 (liver-enzyme systems).** — *severity/pattern multiples: alcoholic AST >8× ULN & ALT >5×
   ULN; NAFLD both >4×; acute viral both ~25×; chronic HCV 2–10×; ischaemic >50× ULN (T26).*
8. **PMC7141677 (MetS within normal ALT range)** & clinical-trial AST ranges (**NCT00855465 0–41; NCT03722576
   5–40; NCT00656292 10–40 U/L**). — *higher aminotransferase within normal range associates with metabolic
   syndrome; lab reference ranges (T28, T4).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–8; they are BioSense
> Version 1 classifications, sex-aware and high-dominant, context-gated, not attributable to any single
> reference as a diagnostic threshold, and **do not restate diagnostic labels.** Lab ranges and De Ritis
> cut-offs are shown as separate frameworks and **never averaged**; AST is presented as a multi-tissue
> injury marker, never liver disease in isolation; the De Ritis ratio is a governed companion metric, never a
> standalone verdict.

---

# 28. Founder Decisions Required

The AST methodology reuses frozen BioSense frameworks and represents the founder's Companion-Organ decision
via the existing Context-First Framework, with the De Ritis ratio under derived-metric governance. Two
optional presentation/policy items remain: **[C][E]**

**D-1 — Confirm the sex-aware band anchoring and the governed De Ritis presentation.** SCL-015 anchors
**Optimal** to sex-specific upper limits (M 35 / F 30), spans **High-Normal — Watch** to the conventional
~40, grades elevations by multiples of the conventional ULN, and presents the **De Ritis (AST:ALT) ratio** as
a governed companion metric (computed only with ALT, meaningful only with elevated absolutes, pattern-hint not
verdict). Confirmation requested that this sex-aware, governed-ratio presentation is the intended default.
**Founder sign-off requested.**

**D-2 — Confirm the cross-biomarker consumption scope for V1.** SCL-015 is specified to consume **ALT
(SCL-014; De Ritis), hs-CRP (SCL-006), ferritin (SCL-010), and future GGT/ALP/bilirubin** where available
(with graceful degradation to a confidence limitation, a repeat preference for new/confounded values, and
CK/troponin surfaced as context). **Founder decision requested** on whether V1 activates AST with ALT +
hs-CRP/ferritin context (degrading gracefully; De Ritis only when ALT present) or waits for the GGT/ALP/
bilirubin packs to exist.

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-015 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/
reference figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. AST
reuses frozen BioSense methodology throughout — the Context-First Interpretation Framework, four-level
confidence hierarchy, multiple-explanations output, and cross-biomarker intelligence (all from SCL-010),
derived-metric governance (SCL-007, for the De Ritis ratio), sex-aware banding (SCL-004/010/014), the
guideline-disagreement posture (SCL-003/011/012), two-sided banding with flags (SCL-004/009/010/011/012/014),
and the diagnostic-adjacency discipline (SCL-002/009/011/012/014) — introducing only AST-specific scientific
content (the thresholds and their sex-specificity; the multi-tissue source list and source-ranking; the
governed De Ritis ratio; the multiples-of-ULN severity structure; the kinetics/transience behaviour; and the
extrahepatic muscle/cardiac/haemolysis modifiers). Per the founder's Companion-Organ decision, AST is
represented as ALT's companion — a context-dependent tissue-injury marker, never liver-specific and never
liver disease in isolation, and never a diagnosis. No new methodology was required; all structure remains
consistent with SCL-001 through SCL-014.*
