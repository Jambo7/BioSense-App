# SCL-014 — ALANINE AMINOTRANSFERASE (ALT)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. ALT interpreted as a hepatocellular-injury marker via the existing Context-First Framework — never as a liver-disease diagnosis. No new methodology introduced.*

**Document ID:** SCL-014
**Biomarker:** Alanine Aminotransferase (ALT) — a liver-predominant enzyme; marker of hepatocellular injury
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 1 August 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. ALT reuses the frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), the four-level confidence hierarchy (SCL-010), multiple-explanations output (SCL-010), cross-biomarker intelligence (SCL-010), two-sided banding (SCL-004/009/010/011/012), sex-aware banding (SCL-004/010), guideline-disagreement handling (SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012) — introducing only ALT-specific scientific content. All sections remain consistent with SCL-001 through SCL-013.

---

> **What this document is.** SCL-014 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for ALT. It reuses existing BioSense
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

## STRUCTURAL-FIT NOTE (ALT vs SCL-001) — reuses frozen frameworks; no new pattern

ALT presents the same structural characteristics BioSense has already solved for, and maps onto the frozen
methodology without extension. Per the founder's Organ-Context decision, **ALT is never interpreted as an
isolated "liver disease" marker** — it is a **liver-predominant enzyme whose meaning depends on surrounding
biological context**, so it reuses the Context-First Framework:

1. **Organ-context / Context-First — reused (SCL-010).** ALT is a marker of **hepatocellular injury**, not a
   diagnosis. Its interpretation depends on context — AST, hs-CRP, ferritin, alcohol, obesity/metabolic
   syndrome, recent strenuous exercise, muscle injury, medications, viral illness, pregnancy, known liver
   conditions, and future GGT/ALP/bilirubin — evaluated **before** banding (§0.2, §8, §12).
2. **Cross-biomarker intelligence — reused (SCL-010).** ALT consumes **AST (SCL-015), ferritin (SCL-010),
   hs-CRP (SCL-006), and future GGT/ALP/bilirubin**, including the **De Ritis (AST:ALT) ratio** as a context
   input, where available (§9).
3. **Sex-aware banding — reused (SCL-004/010).** ALT runs higher in men; thresholds are sex-specific (§11).
4. **Guideline-disagreement handling — reused (SCL-003/011/012).** The conventional lab ULN (~40 U/L) and the
   lower "true healthy" thresholds (Prati 30/19; AASLD 2018 35/25; ACG 29–33/19–25) are presented as differing
   frameworks, **never averaged** (§10, §11).
5. **Two-sided banding with flags — reused; high-dominant.** The meaningful end is **high** (hepatocellular
   injury), graded by **multiples of the ULN**; the low end is a gentle context flag (§11).
6. **Multiple-explanations output — reused (SCL-010).** An elevation gets **ranked possibilities** (NAFLD/
   metabolic, alcohol, medications, viral, muscle/exercise, thyroid, celiac, iron) — never a single certain
   cause (§11, §14).
7. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012).** BioSense never emits "liver disease,"
   "hepatitis," "cirrhosis," "NAFLD/fatty liver," or "drug-induced liver injury" as a diagnosis; it detects
   the pattern, routes, and names nothing (§18, §19).

**Biomarker-specific content introduced:** the ALT thresholds and their sex-specificity; the multiples-of-ULN
severity structure; the hepatocellular-injury framing; the extrahepatic/context modifiers; the De Ritis ratio;
the transience/repeat-test behaviour; and the red-flag routing. **No new methodology is required.** **[C]**

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

ALT is one of the body's most useful windows on the liver — but the founder's Organ-Context decision is
central to how BioSense treats it: **ALT is a marker of hepatocellular injury, not a diagnosis of liver
disease.** When liver cells are stressed or damaged, ALT leaks into the blood, so a raised value is a
meaningful signal that something is happening — but it does **not**, on its own, identify a cause. The same
elevation can arise from many biological processes: fatty-liver/metabolic change, alcohol, medications, a
recent viral illness, a hard workout or muscle strain, thyroid or coeliac issues, or iron overload. BioSense
therefore evaluates the surrounding context first, reads ALT alongside its companion markers (AST, hs-CRP,
ferritin, and — in time — GGT, ALP, bilirubin), grades an elevation gently by how many times above the usual
range it sits, and where several explanations are plausible it **ranks them by the available evidence**
rather than asserting one. It uses sex-specific thresholds, shows the genuinely differing "healthy" cut-offs
rather than splitting them, and names no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as the
evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate ALT. Every value carries a source ID (A-series / R-series → §27) and a
> category tag. Canonical unit: U/L (≡ IU/L; no conversion factor). **Sex-aware, high-dominant two-sided,
> severity-by-multiples-of-ULN, context-first; hepatocellular-injury marker, NEVER a liver-disease diagnosis.**

## 0.1 Canonical units — [A]
```
canonical_unit: U/L  (U/L ≡ IU/L; μkat/L = U/L × 0.0167 optional display)   # NO analyte conversion factor — do NOT apply 38.67/88.57/18.0/2.496/0.738/2.266 [A24]
Always retain value_reported + unit_reported + sex + available context. Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First (Organ-Context) Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST / ORGAN-CONTEXT): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  companion liver/enzyme markers: AST (SCL-015; De Ritis AST:ALT ratio), future GGT, future ALP, future bilirubin; [A15,A22]
  inflammation/iron: hs-CRP (SCL-006), ferritin (SCL-010; iron overload — earliest ALT abnormality);              [A19]
  metabolic: obesity, metabolic syndrome, insulin resistance (NAFLD/MASLD — commonest mild-elevation context);    [A13,A14]
  exposure/behaviour: alcohol intake, medications (statins/NSAIDs/antiepileptics/others), recent strenuous exercise, muscle injury; [A13,A16,A17]
  transient/acute: recent viral illness; new value → REPEAT before workup (transient elevations common);          [A18]
  extrahepatic: muscle disorders (check CK — AST>ALT), thyroid disease, coeliac, haemolysis;                       [A16,A23]
  life-stage/history: pregnancy where relevant, known liver conditions.
CORE RULE (founder Organ-Context): ALT = hepatocellular-INJURY marker, NOT a liver-disease diagnosis; elevation may arise from MULTIPLE processes. [A1,A2][B2]
  → where several explanations are plausible, RANK them by evidence + context (§0.5); never assert one cause.
IF material context changes meaning → interpret WITHIN that context.                                               [R1]
IF companion markers / key context unavailable → CONFIDENCE LIMITATION, not certainty.                            [R4]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands (sex-aware) — [B] (synthesis of [A] anchors A3-A11) — HIGH-DOMINANT TWO-SIDED
```
ALT_WELLNESS_BAND (U/L, general adult; SEX-AWARE; after context gate). ULN_ref = sex "true-healthy" upper anchor:
  MALE   ULN_ref = 30 U/L (Prati "true healthy" anchor; conventional lab ULN ~40 shown as context)   [A5]
  FEMALE ULN_ref = 19 U/L (Prati "true healthy" anchor; conventional lab ULN ~40 shown as context)   [A5]

  LOW_CONTEXT_FLAG        v < 10                         # gentle low-end context flag (frailty/sarcopenia/aging, EVOLVING) [A27]
  OPTIMAL                 10 <= v <= ULN_ref             # within a favourable, metabolically-healthy range [A5,A7]
  HIGH_NORMAL_WATCH       ULN_ref < v <= 40              # above "true healthy" but within conventional lab ULN — watch/context [A3,A5,A9]
  BORDERLINE_ELEVATED     40 < v <= 2×40 (<=80)          # borderline (<2× conventional ULN); very common, often benign [A11,A12]
  MILD_ELEVATED           2×40 < v <= 5×40 (>80–<=200)   # mild (2–5× ULN) [A11]
  MODERATE_ELEVATED       5×40 < v <= 15×40 (>200–<=600) # moderate (5–15× ULN) [A11]
  SEVERE_ELEVATED         v > 15×40 (>600)               # severe/massive (>15× ULN; may exceed 1000) [A11,A21]
DIRECTION: HIGH-DOMINANT TWO-SIDED (high = hepatocellular-injury pattern = meaningful end, graded by multiples of ULN; low = gentle context flag). [R6]
SEVERITY uses conventional ULN 40 as the multiples anchor (A11 convention); "true healthy" ULN_ref (30/19) drives OPTIMAL vs HIGH_NORMAL_WATCH. Both frameworks shown, NEVER averaged. [R5]
UNIT: U/L (≡ IU/L). Sex REQUIRED for OPTIMAL/HIGH_NORMAL_WATCH boundary; if sex unknown → REDUCED confidence, use conventional 40. [A10][R8]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never a diagnostic label. [B][D]**

## 0.4 Severity-by-multiples-of-ULN (wellness context, not diagnosis) — [A]/[B]
```
SEVERITY_CONTEXT (multiples of conventional ULN ~40; wellness framing only): [A11,A21,A25]
  BORDERLINE  <2× ULN  : extremely common (~8% population); often benign; commonly metabolic/alcohol/medication/normal fluctuation. [A12,A13]
  MILD        2–5× ULN : warrants unhurried review; NAFLD/alcohol/medications/chronic viral common. [A13]
  MODERATE    5–15× ULN: acute viral, autoimmune, drug-induced patterns typical — calm prompt review. [A11]
  SEVERE      >15× ULN : acute viral/toxin(e.g. acetaminophen)/ischaemic patterns — prompt healthcare review; peak ≠ prognosis. [A21]
DILI-context (drug): ALT ≥5× ULN, or ALT ≥3× ULN with bilirubin >2× ULN (Hy's-law pattern) → prompt review; never advise medication change. [A25]
Severity is wellness CONTEXT, never a diagnosis or a specific cause. [R7]
```

## 0.5 Multiple-explanations (ranked) — [C] — REUSED (SCL-010), central to founder decision
```
On any elevation (or discordant pattern), when ≥2 causes are plausible, output RANKED possibilities by evidence + context: [R3][B2]
  weight by: severity band (multiples); De Ritis AST:ALT ratio (>2 alcoholic / <1 NAFLD / >1 viral — CONTEXT not verdict); [A15]
             metabolic context (obesity/metabolic syndrome → NAFLD/MASLD); alcohol; medications; recent viral illness;
             recent strenuous exercise / muscle injury (AST>ALT, check CK); thyroid; coeliac; ferritin (iron). [A13,A14,A16,A19,A23]
NEVER present a single certain cause; NEVER name a diagnosis; explain uncertainty. [R7]
```

## 0.6 Confidence hierarchy (four-level) — [C] — REUSED (SCL-010)
```
STANDARD          : clear value AND sex known AND sufficient context (companion markers or clear metabolic/behavioural context) AND not obviously transient.
REDUCED           : single value / sex unknown / assay-lab variation / recent exercise-illness-alcohol (possible transient) / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : elevation with NO companion markers (AST/GGT/ALP/bilirubin/ferritin) and NO metabolic/behavioural context → rank-with-limitation or request repeat; name what's needed. [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / ineligible population — explained abstention. [R2]
Reduced confidence does NOT auto-block; significant contextual uncertainty MAY justify abstention. New mild elevation → prefer REPEAT (2–4 wks) framing. [A18]
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  ALT is NOT a diagnosis. NEVER emit "liver disease", "hepatitis", "cirrhosis", "NAFLD/fatty liver", "drug-induced liver injury", or any condition as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  ALT is a hepatocellular-INJURY marker whose interpretation depends on CONTEXT; never interpret as an isolated liver-disease marker. [B2][A1,A2]
S3  On elevation with ≥2 plausible causes → RANKED possibilities; NEVER assert a single cause. [R3]
S4  Sex-aware: use sex-specific ULN_ref; if sex unknown → REDUCED confidence + conventional ULN 40. [A10]
S5  New/isolated mild elevation → suggest REPEAT testing (2–4 wks) before implying anything; transient causes common (exercise/illness/alcohol). [A18]
S6  Extrahepatic elevation possible (muscle/exercise/thyroid/coeliac/haemolysis) — consider; muscle → AST>ALT, suggest CK context. [A16,A23]
S7  Never recommend specific treatments, medication changes, or doses; medication questions → educate + refer (never advise changing statins/antiepileptics/etc). [A16,A25]
S8  Cross-markers (AST/ferritin/hs-CRP/GGT/ALP/bilirubin) unavailable → confidence limitation, not invented certainty. [R4]
S9  Never produce a numeric liver-disease-risk % from ALT.
S10 RED FLAGS (jaundice, ascites, encephalopathy; or synthetic dysfunction — low albumin/high INR/high bilirubin; or severe >15× ULN) → calm prompt healthcare review; never emergency-diagnose. [A20,A21][D]
S11 Never present a BioSense band, ULN, or severity multiple as a medical/diagnostic boundary.
S12 Represent guideline disagreement (conventional 40 vs true-healthy 30/19, 35/25, 29–33/19–25); NEVER average thresholds. [A5,A6,A7][R5]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & COMPANION MARKERS (the key ALT move): read with AST (De Ritis ratio), and where relevant hs-CRP, ferritin, and future GGT/ALP/bilirubin; consider metabolic/alcohol/medication/exercise context; for a NEW mild value, REPEAT in 2–4 weeks. [A15,A18,A22]
Tier 2 LIFESTYLE (context-appropriate): where a metabolic pattern is plausible, general liver-friendly wellness (weight, alcohol moderation, activity) — framed as education, not treatment; note that weight loss ~7%+ can improve metabolic steatosis context. [A14]
Tier 3 HEALTHCARE DISCUSSION (calm) when: persistent elevation on repeat | moderate/severe (≥5× ULN) | red flags | possible DILI pattern | discordant companion markers | known liver condition. [A20,A25,A28][D]
NEVER a specific treatment, medication change, or dose at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate (organ-context) first → sex-aware band + severity context → template; RANKED possibilities where elevated/discordant.
OPTIMAL (context concordant/not needed) → affirming, with the "single value, read in context" caveat where relevant.
HIGH_NORMAL_WATCH → calm; above "true healthy" but within conventional range; note metabolic risk factors; context.
BORDERLINE / MILD → constructive; very common; REPEAT suggested; ranked possibilities; ALWAYS "not a diagnosis".
MODERATE / SEVERE → calm prompt healthcare review; ranked possibilities; never alarm, never diagnose; peak ≠ prognosis.
LOW_CONTEXT_FLAG → gentle; evolving frailty/muscle context; never alarming.
companion markers present → integrate (AST/De Ritis, ferritin, hs-CRP), with extrahepatic caveats.
markers / context unavailable → state confidence limitation; name what would clarify; prefer repeat for new mild.
Never "normal/abnormal" as a verdict; never a diagnosis (liver disease/hepatitis/cirrhosis/NAFLD).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "ALT is a marker of possible liver-cell stress, not a diagnosis — a raised value can come from many things
      (metabolic or fatty-liver changes, alcohol, medications, a recent illness, a hard workout or muscle strain,
      thyroid or coeliac issues), so it's best read alongside your wider context and companion markers."
CAV3 (reduced/context) name the context reducer(s) or missing marker (AST, ferritin, hs-CRP, GGT, ALP, bilirubin, sex).
CAV4 (new/isolated mild) "A single mildly-raised ALT is common and often temporary — repeating the test in a few
      weeks is usually the sensible next step before reading too much into it."
CAV5 (elevated, ranked) "Because several things can raise ALT, we've noted the more likely explanations given your
      context rather than pointing to one — this is best confirmed with a professional."
CAV6 (moderate/severe or red flags) "This degree of change, or these accompanying signs, is worth a prompt,
      unhurried conversation with a healthcare professional."
CAV7 (markers unavailable) "We'd interpret this more confidently with AST (and, in time, GGT, ALP and bilirubin),
      plus ferritin and hs-CRP."
CAV8 (extrahepatic) "Some non-liver factors — a recent hard workout, muscle strain, thyroid or coeliac issues —
      can also nudge these enzymes, so they're read with that in mind."
CAV9 (threshold context) "Labs differ on the 'normal' ceiling for ALT; some experts use lower, sex-specific
      'healthy' limits, so we show your value against both rather than a single line."
```

## 0.11 Source & version identifiers
```
config_id: SCL-014   config_version: 1.0
band_id: BIOSENSE_ALT_SEXAWARE_BANDS_v1                  (Category B; high-dominant two-sided; sex-aware; anchors A3-A11)
severity_id: SCL014_SEVERITY_MULTIPLES_v1               (borderline/mild/moderate/severe by ×ULN; A11,A21,A25)
organ_context_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1 — founder Organ-Context decision)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1   (reused; R2)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1   (reused; R3 — ranked causes)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1     (reused; R4 — AST/ferritin/hs-CRP/GGT/ALP/bilirubin)
de_ritis_ref: SCL014_AST_ALT_RATIO_CONTEXT_v1           (A15 — context ratio, consumed from SCL-015)
sex_aware_ref: SCL004_SEX_AWARE_BANDS (reused; R8)
guideline_disagreement_ref: SCL011/012 posture          (reused; R5 — conventional 40 vs true-healthy)
safety_rules_id: SCL014_SAFETY_v1                        (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Alanine aminotransferase (ALT) is an enzyme concentrated in liver cells, where it helps transfer an amino
group from alanine in amino-acid metabolism. **[A]** Its value as a blood marker comes from a simple fact:
when liver cells (hepatocytes) are stressed, injured, or die, ALT leaks out into the bloodstream, so a
raised level signals **hepatocellular injury**. <cite index="4-1">Serum ALT levels rise when liver parenchymal cells are injured or diseased as the enzyme leaks into the bloodstream following hepatocellular damage.</cite> **[A][A1]** ALT is **liver-predominant** — the liver holds by far the highest concentration, with only small amounts in muscle and kidney — which makes it relatively specific for the liver, more so than AST. **[A][A2]**

But — and this is the founder's Organ-Context decision — **ALT is a marker of hepatocellular injury, not a
diagnosis of liver disease.** A raised ALT says *something is happening*, not *what*. The same elevation can
come from metabolic/fatty-liver change, alcohol, medications, a recent viral illness, a hard workout or
muscle strain, thyroid or coeliac issues, or iron overload. **[A][A13][A16]** So BioSense reads ALT in
context, alongside its companion markers, grades an elevation by multiples of the usual ceiling, and — where
several explanations fit — ranks them by the evidence rather than asserting one. **[B][B2]**

- **Official name:** Alanine aminotransferase (ALT); formerly SGPT
- **Reported in:** U/L (≡ IU/L); μkat/L optional (×0.0167). No analyte conversion factor. **[A][A24]**
- **Nature:** liver-predominant enzyme; **marker of hepatocellular injury, not a liver-disease diagnosis** **[A][B2]**
- **Direction:** high-dominant two-sided (high = injury pattern, graded by ×ULN; low = gentle context flag) **[A][R6]**
- **Sex:** runs higher in men; sex-specific thresholds **[A][A10]**
- **BioSense role:** a context-first organ-context marker, read with AST (De Ritis), ferritin, hs-CRP, and future GGT/ALP/bilirubin.

---

# 2. Physiological Function

ALT catalyses the transfer of an amino group from alanine to α-ketoglutarate, producing pyruvate and
glutamate — a link between amino-acid and energy metabolism, concentrated in the liver. **[A]** Because the
enzyme normally sits **inside** hepatocytes at low serum concentrations, the bloodstream sees little of it
until cells are injured; hepatocellular stress or death releases ALT and the serum level rises. **[A][A1]**
Its liver-predominance is what makes an isolated ALT rise point **towards** the liver rather than bone,
biliary tract, or (mostly) muscle — though not exclusively so. **[A][A2]**

Two points define interpretation **[A]**:
- **Injury marker, not a cause.** A raised ALT reflects hepatocellular injury; it does not name the process
  driving it. **[A][B2]**
- **Context decides meaning.** Metabolic state, alcohol, medications, recent illness or exercise, and
  companion enzymes shape what an ALT value means (§8, §9). **[A][A13]**

---

# 3. Scientific Background

ALT has been used for decades as the workhorse marker of liver-cell health, but two scientific themes shape
how BioSense represents it. **[A]**

**First, the "normal" ceiling is genuinely contested.** Conventional laboratory upper limits sit around
40 U/L (and many labs report ranges as wide as ~7–56 U/L), and some guidelines — e.g. APASL 2016 — retain
40 U/L. **[A][A3][A4][A9]** But a large body of work argues the conventional ceiling is too high because the
reference populations included undiagnosed fatty-liver disease. In a landmark study, Prati and colleagues
proposed "true healthy" upper limits of **30 U/L for men and 19 U/L for women**; subsequent bodies proposed
their own — **AASLD 2018: 35 (M)/25 (F)**; **ACG: 29–33 (M)/19–25 (F)**; NHANES-derived 29 (M)/22 (F);
biopsy-proven donors 33 (M)/25 (F). <cite index="6-1">In a landmark study, Prati et al. was the first to report that ALT ULNs in healthy populations without viral hepatitis or metabolic disease should be 30 U/L in men and 19 U/L in women.</cite> **[A][A5][A6][A7][A8]** These are **genuinely differing frameworks**, and BioSense shows them side by side rather than averaging them. **[A][E]**

**Second, ALT elevations are graded by magnitude and are frequently benign at the low end.** Slight
elevations (<2× ULN) occur in roughly 8% of the population and are commonly explained by fatty-liver change,
alcohol, or medications; transient rises from exercise or minor illness are common, so repeat testing is the
usual first step. <cite index="12-1">Slightly elevated AST and ALT, defined as levels less than 2 times the upper limit of normal, are found in approximately 8% of the general population and are frequently benign.</cite> **[A][A11][A12][A18]** Larger elevations (moderate 5–15× ULN, severe >15× ULN, occasionally >1000 U/L) shift the likely explanations toward acute viral, drug/toxin, autoimmune, or ischaemic processes and warrant prompter review. **[A][A21]**

**The wellness reading — [B]:** ALT is a context-first, sex-aware organ-context marker — a signal of possible
hepatocellular injury, graded gently by multiples of the usual ceiling, read with companion markers, with
plausible explanations ranked rather than one asserted, and never named as a diagnosis.

**An honest boundary — [E]:** the "healthy" ceiling is contested, thresholds are lab- and
population-dependent, and many benign/transient and extrahepatic factors move ALT — so BioSense leans on
context and companion markers and is explicit about confidence. **[E][A9][A16]**

---

# 4. Why ALT Matters

**1. It's a sensitive early window on liver-cell health. [A][A14]** ALT is among the most sensitive markers
of hepatocellular injury, and a mildly raised value is increasingly recognised as an early signal of
metabolic (fatty-liver) change and insulin resistance — often before other markers move. **[A]**

**2. Interpreted well, it's high-value; interpreted naively, it misleads. [A][B2]** Because the same number
can mean very different things, the organ-context, ranked-explanation approach adds real value over a blunt
"normal/abnormal" read — and avoids the harm of implying a disease that isn't established. **[A]**

**3. It anchors a companion panel. [A][A22]** ALT is read most usefully with AST (De Ritis ratio), and with
GGT, ALP, bilirubin, ferritin and hs-CRP — exactly what the cross-biomarker framework is for. **[A]**

**Why BioSense measures it — [C]:** ALT is a modifiable, high-value, liver-predominant marker whose meaning
is context-dependent — the ideal case for Context-First interpretation, sex-aware banding, ranked
explanations, and companion-marker integration, all while never diagnosing liver disease.

---

# 5. Laboratory Measurement

ALT is measured on a standard serum/plasma chemistry panel, reported in **U/L (≡ IU/L)**. **[A][A24]**

- **No unit conversion factor.** U/L and IU/L are equivalent; μkat/L (×0.0167) is an optional SI display. No
  lipid/glucose/vitamin conversion factor applies. **[A][A24]**
- **Sex matters.** ALT runs higher in men (hormonal and muscle-mass differences), so thresholds are
  sex-specific; applying a male cut-off to a woman can mask an early rise. **[A][A10]**
- **Lab/assay variability.** Reported ULNs vary widely between laboratories (≈35–79 U/L men, ≈31–55 U/L
  women in some surveys), so the lab's own range and method matter. **[A][A9]**
- **Transient movement.** Recent strenuous exercise (especially resistance training), minor illness, or
  recent alcohol can transiently raise ALT (often resolving within ~7 days), so a new mild elevation is
  usually repeated in 2–4 weeks. **[A][A17][A18]**
- **Companion panel.** ALT is interpreted with AST (De Ritis ratio) and, where available, GGT, ALP,
  bilirubin, ferritin/transferrin saturation, and hs-CRP; a muscle source is checked with CK. **[A][A16][A22]**

---

# 6. Units

- **U/L** — standard. **BioSense canonical unit.** **[A/C]**
- **IU/L** — equivalent to U/L. **[A]**
- **μkat/L** — SI catalytic unit; U/L × 0.0167 (e.g. 29–33 U/L ≈ 0.48–0.55 μkat/L). Optional display. **[A][A24]**
- **No analyte conversion factor applies** — unlike cholesterol (38.67), triglycerides (88.57), glucose
  (18.0), 25(OH)D (2.496), B12 (0.738), or folate (2.266). ALT values are used as-is in U/L. **[A][C]**

BioSense stores the reported value, unit, and sex unchanged and computes the optional μkat/L display only. **[C]**

---

# 7. Unit Conversion

```
U/L  ≡  IU/L        (no conversion)
μkat/L = U/L × 0.0167    (optional SI display only)
```
Worked check: 30 U/L ≈ 0.50 μkat/L; 40 U/L ≈ 0.67 μkat/L. **[A][A24]**

**Safety rule [D]:** ALT carries **no** analyte conversion factor; never apply a lipid/glucose/vitamin
factor. A unit-unknown value is displayed but not interpreted; sex is required for the OPTIMAL/HIGH-NORMAL
boundary (else reduced confidence + conventional ULN 40). **[D]**

---

# 8. Measurement Limitations & the Organ-Context Principle  *(Context-First basis — reused SCL-010)*

ALT's defining limitation is that **a value does not, on its own, identify a cause** — which is why the
Context-First (Organ-Context) gate (§0.2) and the ranked-explanation output (§0.5) apply. **[A][B2]**

## 8.1 Injury marker, not a diagnosis — [A]
A raised ALT indicates hepatocellular injury but not its process; the same elevation spans fatty-liver/
metabolic change, alcohol, medications, viral illness, and more. **[A][A1][A13]**

## 8.2 Not exclusively hepatic — [A]
Though liver-predominant, ALT can rise from **extrahepatic** sources — muscle disorders and strenuous
exercise, thyroid disease, coeliac disease, haemolysis. A muscle source typically raises AST more than ALT
and is checked with CK. **[A][A16][A23]**

## 8.3 Contested, lab-dependent thresholds — [A]
The "healthy" ceiling is genuinely disputed (conventional ~40 vs true-healthy 30/19, 35/25, 29–33/19–25) and
varies by lab and population; method context is a confidence input. **[A][A5][A9]**

## 8.4 Transience — [A]
Exercise, minor illness, and recent alcohol cause transient rises; a new mild elevation is usually repeated
in 2–4 weeks before any interpretation is loaded onto it. **[A][A17][A18]**

## 8.5 Sex-dependence — [A]
ALT runs higher in men; a sex-blind threshold can both over-flag men and miss early rises in women. **[A][A10]**

**How BioSense uses this — [C][D]:** the Organ-Context gate runs first; ALT is banded sex-aware and graded by
multiples of ULN; plausible causes are **ranked, not asserted**; extrahepatic and transient possibilities are
surfaced; missing companion markers set Context-Required/Reduced confidence; and no condition is ever named.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010)*

ALT consumes its companion enzymes and context markers where available. **[A][C]**

- **AST (SCL-015). [A]** The primary companion. The **De Ritis ratio (AST:ALT)** is a context input: **>2**
  is associated with alcoholic patterns, **<1** with NAFLD/metabolic patterns, **>1** with viral hepatitis —
  used as **context, never a standalone verdict**. A muscle source raises AST more than ALT. **[A][A15][A16]**
- **Ferritin (SCL-010). [A]** Iron overload/haemochromatosis can present with a mild ALT rise as the earliest
  abnormality; ferritin (with transferrin saturation) is a companion screen. **[A][A19]**
- **hs-CRP (SCL-006). [A]** Systemic inflammation context; read alongside where a metabolic/inflammatory
  picture is relevant. **[A]**
- **Future GGT. [A]** Helps localise a hepatobiliary vs other source and supports an alcohol context. **[A][A22]**
- **Future ALP & bilirubin. [A]** Distinguish a hepatocellular from a cholestatic pattern (ALP/bilirubin
  rise with biliary obstruction); bilirubin with ALT (Hy's-law context) flags severity. **[A][A20][A22]**
- **(Context) CK for muscle; TSH for thyroid; coeliac serology. [A]** Where an extrahepatic source is
  plausible, these clarify — named as context, not ordered by BioSense. **[A][A16][A23]**

**Cross-biomarker rule [C] (reused R4):** where these are **available**, BioSense consumes them (with the
De Ritis ratio and extrahepatic caveats) to sharpen the ranked explanations and confidence; where
**unavailable**, it records a **confidence limitation** and names what would clarify — never inventing
certainty. **[C][R4]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **ALT rises with hepatocellular injury** (enzyme leaks from injured cells). **[A][A1]**
- **ALT is liver-predominant / relatively specific**, but not exclusively hepatic. **[A][A2][A16]**
- **Elevations are graded by multiples of ULN** (borderline <2×, mild 2–5×, moderate 5–15×, severe >15×). **[A][A11]**
- **Mild elevations are common and often benign; repeat testing is the first step.** **[A][A12][A18]**
- **The De Ritis (AST:ALT) ratio adds context.** **[A][A15]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **The "healthy" ULN is contested:** conventional ~40 U/L (APASL 2016) vs "true healthy" **Prati 30 (M)/
  19 (F)**, **AASLD 2018 35 (M)/25 (F)**, **ACG 29–33 (M)/19–25 (F)**, and other population-derived values. **[A][A5][A6][A7][A9]**
- **Threshold purpose differs:** a screening ceiling, a "true healthy" optimum, and a treatment-decision
  threshold (e.g. >2× ULN to consider antiviral therapy in CHB) are different things. **[A][A26]**
- **Why:** ALT is a continuous marker whose reference populations, sex-handling, and clinical purpose vary.
  BioSense **presents the differing thresholds and never averages them** (reused R5). **[A][E]**

## 10.3 Strength of evidence
- **ALT as a hepatocellular-injury marker; severity-by-multiples: established.** **[A][A1][A11]**
- **Sex-specificity; De Ritis ratio: established.** **[A][A10][A15]**
- **"True healthy" lower ULN (Prati/AASLD/ACG): established as proposals, not universally adopted (evolving).** **[A][E][A5]**
- **Extrahepatic/transient causes: established.** **[A][A16][A18]**
- **Low-ALT/frailty association: evolving.** **[E][A27]**

## 10.4 Intended populations
Thresholds target general-adult interpretation, sex-stratified. BioSense applies them context-first,
abstaining or requiring context in pregnancy, known liver disease, likely-transient states pending repeat,
and where companion markers are unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. ALT is SEX-AWARE, HIGH-DOMINANT TWO-SIDED, graded by
> MULTIPLES OF THE ULN, CONTEXT-GATED, and its "healthy" ceiling is genuinely CONTESTED: the value is read
> as a hepatocellular-injury signal in context, never as a liver-disease diagnosis, and where several
> explanations are plausible they are RANKED, not asserted.**

## 11.1 The sex-aware wellness bands (U/L; general adult; after Organ-Context gate)

`ULN_ref` = the sex-specific "true healthy" upper anchor (Prati): **Male 30 U/L**, **Female 19 U/L**. The
conventional lab ULN (~40 U/L) is shown as context and is the anchor for the severity multiples. Both
frameworks are shown; **neither is averaged** (§11.5). **[A][A5]**

| BioSense Wellness Interpretation | Associated ALT (U/L) | Evidence anchor | Wellness meaning (context-first; no diagnostic label) |
|---|---|---|---|
| **Low — Context Flag** | v < 10 | Low-end context [A27] | Gently noted; evolving frailty/muscle-reserve context; not alarming. |
| **Optimal** | 10 ≤ v ≤ ULN_ref (M 30 / F 19) | "True healthy" [A5][A7] | Within a favourable, metabolically-healthy range. |
| **High-Normal — Watch** | ULN_ref < v ≤ 40 | Above true-healthy, within conventional [A3][A5] | Above the stricter "healthy" line but within conventional lab range; note risk factors; context. |
| **Borderline Elevated** | 40 < v ≤ 80 (<2× ULN) | Borderline [A11][A12] | Very common, often benign; repeat suggested; ranked possibilities. |
| **Mild Elevated** | 80 < v ≤ 200 (2–5× ULN) | Mild [A11] | Unhurried review; NAFLD/alcohol/medication/viral common; ranked. |
| **Moderate Elevated** | 200 < v ≤ 600 (5–15× ULN) | Moderate [A11] | Calm prompt review; acute viral/autoimmune/drug patterns typical; ranked. |
| **Severe Elevated** | v > 600 (>15× ULN) | Severe/massive [A11][A21] | Prompt healthcare review; acute viral/toxin/ischaemic patterns; peak ≠ prognosis. |

*(Severity multiples use the conventional ULN ~40 as the anchor, per the cited severity convention [A11]. The
sex-specific ULN_ref (30/19) drives the Optimal vs High-Normal boundary. Both are shown; never averaged.)*

## 11.2 Severity-by-multiples (wellness context, not diagnosis) [A][B]
Borderline (<2×), Mild (2–5×), Moderate (5–15×), Severe (>15×) of ULN describe **magnitude**, which shifts the
*likelihood* of different explanations (benign/metabolic at the low end; acute viral/toxin/ischaemic at the
high end) — as **wellness context, never a diagnosis or a specific cause**. A drug context adds the DILI
pattern (ALT ≥5× ULN, or ALT ≥3× ULN with bilirubin >2× ULN) as a prompt-review flag, never a medication
instruction. **[A][A11][A21][A25][R7]**

## 11.3 How the bands were derived — transparency [B]
- The Optimal ceiling uses the sex-specific **"true healthy"** anchor (Prati 30 M / 19 F); **High-Normal —
  Watch** spans the gap up to the conventional ~40; the elevated bands map directly to the recognised
  **multiples-of-ULN** severity grades. **[A5][A11]**
- **No number was averaged.** The conventional 40 and the true-healthy 30/19 (and 35/25, 29–33/19–25) are
  presented as differing frameworks (§11.5). **[R5]**
- The **low-end flag** is a gentle, evolving-evidence context marker, never alarming. **[A27]**

## 11.4 Deterministic, ordered intervals [B]
Bands are contiguous and non-overlapping across the range (Low-flag <10; Optimal 10–ULN_ref; High-Normal
ULN_ref–40; then 40–80, 80–200, 200–600, >600). Boundaries use consistent operators so no value falls into
two bands. Sex sets the Optimal/High-Normal boundary; if sex is unknown, confidence is reduced and the
conventional ULN 40 is used. **[B][A10]**

## 11.5 Guideline-disagreement display (reused posture) [B][C]
Where relevant, BioSense notes that the "healthy" ceiling is contested and shows the value against **both**
the conventional (~40) and the stricter sex-specific "healthy" limits (Prati 30/19; AASLD 2018 35/25; ACG
29–33/19–25) — as distinct frameworks, **never averaged** (CAV9). **[B][C][R5][A5][A6][A7]**

## 11.6 Context-gate precedence [D]
No band or severity statement is emitted as a verdict without the Organ-Context evaluation (§0.2). AST/De
Ritis, ferritin, hs-CRP, metabolic/alcohol/medication/exercise context, transience (repeat), and extrahepatic
possibilities are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general adult**, sex-stratified. Thresholds are contested and lab-dependent; ALT is
transiently movable and not exclusively hepatic; the low-end flag is evolving. Not applied to children/
adolescents (age-specific ranges) or, without care, to pregnancy or known liver disease (§15). **[E][A9]**

---

# 12. Interpretation Framework — ORGAN-CONTEXT / CONTEXT-FIRST (reused from SCL-010)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010). Per the founder's
> Organ-Context decision, ALT is interpreted as a context-dependent hepatocellular-injury marker, never an
> isolated liver-disease marker. No new methodology is introduced.** **[C][R1]**

```
STEP 0 — CONTEXT-FIRST / ORGAN-CONTEXT (before anything else):                                    [R1][B2]
   gather materially-relevant context (AST/De Ritis; hs-CRP; ferritin; future GGT/ALP/bilirubin; alcohol;
   obesity/metabolic syndrome; recent strenuous exercise/muscle injury; medications; recent viral illness;
   pregnancy; known liver conditions; extrahepatic — thyroid/coeliac/haemolysis/CK).                [R4]
   → if material context changes meaning, interpret WITHIN it; if key context unavailable, record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit U/L; result final) → else display-only.
STEP 2 — ELIGIBILITY: general adult → else abstain/age-or-pregnancy-aware (§15).
STEP 3 — TRANSIENCE CHECK: new/isolated mild value or recent exercise/illness/alcohol → prefer REPEAT (2–4 wks) framing. [A18]
STEP 4 — CONFIDENCE (four-level): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED (§0.6).         [R2]
STEP 5 — BAND: assign sex-aware, high-dominant band (§11.1); if sex unknown → conventional ULN 40 + reduced confidence. [R8]
STEP 6 — SEVERITY CONTEXT: grade by multiples of ULN (§11.2) as wellness context, not diagnosis.
STEP 7 — RANKED EXPLANATIONS: on elevation/discordance with ≥2 plausible causes → Possible Explanation A/B/C, ranked by evidence + context (De Ritis, metabolic, alcohol, meds, viral, muscle/exercise, thyroid, coeliac, iron). [R3][B2]
STEP 8 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); route where appropriate; NO diagnosis. [R7]
```

**Core interpretive stance [B]:** ALT is a context-first, sex-aware organ-context marker — a signal of
possible hepatocellular injury, graded by multiples of the usual ceiling, read with companion markers, with
plausible causes ranked rather than one asserted, contested thresholds shown honestly, and no condition
named. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy — reused SCL-010)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear value AND sex known AND sufficient context (companion markers or clear metabolic/behavioural context) AND not obviously transient | Band + severity context + ranked explanations normally |
| **REDUCED** | Single value / sex unknown / lab-assay variation / possible transient (recent exercise-illness-alcohol) / minor context | Band cautiously; prefer repeat for new mild; name the reducer (CAV3/CAV4) |
| **CONTEXT_REQUIRED** | Elevation with no companion markers and no metabolic/behavioural context | Rank-with-limitation or request repeat; name needed context (CAV5/CAV7) |
| **ABSTAINED** | Significant contextual uncertainty / conflicting signals / ineligible population | Explained abstention; route |

Reducers/context inputs: sex unknown [A10]; single value / possible transient [A18]; missing companion markers
(AST/GGT/ALP/bilirubin/ferritin/hs-CRP) [R4]; lab/assay/threshold variability [A9]; extrahepatic possibility
(muscle/exercise/thyroid/coeliac) [A16]; pregnancy/known liver disease; value near a band boundary. **[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant contextual
uncertainty **may** justify abstention; a new mild elevation prefers a **repeat-test** framing. **[R2][A18]**

---

# 14. Wellness Interpretation  *(organ-context, sex-aware, ranked explanations)*

Interpretation-by-interpretation guidance, applied **after** the Organ-Context gate. Wellness, not medical;
**never a diagnosis**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal** *(10–ULN_ref; context concordant).* "Your ALT sits in a
  favourable, metabolically-healthy range. It's a single snapshot read in context, but there's nothing here
  that stands out." **[B]**
- **BioSense Wellness Interpretation: High-Normal — Watch** *(ULN_ref–40).* "Your ALT is within the
  conventional lab range but above the stricter 'healthy' line some liver specialists use. That's not a
  problem in itself; if you carry metabolic risk factors (weight, blood sugar, alcohol), it's a gentle nudge
  to keep an eye on liver-friendly habits." (CAV9) **[B][D]**
- **BioSense Wellness Interpretation: Borderline / Mild Elevated** *(40–200; <2×–5× ULN).* "This is a mild
  elevation — very common, and often temporary. Repeating the test in a few weeks is usually the sensible
  next step. Because several things can raise ALT (metabolic/fatty-liver change, alcohol, medications, a
  recent illness, or even a hard workout or muscle strain), we've noted the more likely explanations for your
  context rather than pointing to one." Constructive; **no diagnosis** (CAV4, CAV5). **[B][D]**
- **BioSense Wellness Interpretation: Moderate / Severe Elevated** *(>200; >5×–>15× ULN).* Calm routing:
  "This degree of change is worth a prompt, unhurried conversation with a healthcare professional, who can
  look at the fuller picture. It doesn't tell us the cause by itself." **No alarm, no diagnosis; peak ≠
  prognosis** (CAV6). **[B][D][A21]**
- **BioSense Wellness Interpretation: Low — Context Flag** *(<10).* "Your ALT is on the low side. This is
  usually nothing to worry about; in some research it's linked with lower muscle reserve or frailty in older
  adults, so it's simply noted." (evolving) **[B][A27]**

**Companion-marker modifier (the key ALT move):** where AST/De Ritis, ferritin, or hs-CRP are available,
integrate them — a De Ritis ratio >2 (alcoholic context), <1 (metabolic/NAFLD context), or >1 (viral
context) shapes the ranked explanations; a raised ferritin adds an iron context; always with the extrahepatic
caveat (CAV8). **[D][A15][A19]**

**Ranked-explanations modifier (founder decision):** on any elevation with ≥2 plausible causes, present
**Possible Explanation A/B/C** ordered by evidence + context — never a single certain cause, never a named
condition. **[D][R3][B2]**

**Transience modifier:** for a new/isolated mild elevation or a recent exercise/illness/alcohol context,
lead with the **repeat-test** framing (CAV4). **[D][A18]**

**Context-unavailable modifier:** where companion markers are missing, state the confidence limitation and
name what would clarify (CAV7); never invent certainty (S8). **[D][R4]**

Every interpretation pairs the band and severity with context guidance (§17) and the mandatory caveats
(§0.10). **None diagnoses liver disease, hepatitis, cirrhosis, NAFLD/fatty liver, or drug-induced liver
injury, none asserts a single cause, and none treats a BioSense band or ULN as a medical boundary.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for ALT).** Elevation with no companion markers and no metabolic/behavioural
  context → rank-with-limitation or request a repeat; state what's needed (§13, CAV5/CAV7). **[D][R2]**
- **15.2 Likely-transient states.** Recent strenuous exercise, minor illness, or recent alcohol → prefer the
  repeat-test framing before interpretation (§0.6). **[D][A18]**
- **15.3 Known liver conditions.** Where a liver condition is already known/under care, BioSense frames ALT as
  monitoring context for the person's clinician, not a new interpretation. **[D]**
- **15.4 Children & adolescents.** Age-specific ALT ranges differ; adult bands not applied — display, suggest
  professional interpretation. **[D]**
- **15.5 Pregnancy.** Interpret with care/abstain; new or significant elevation in pregnancy is a
  professional matter (BioSense does not assess pregnancy-specific liver conditions). **[D]**
- **15.6 Possible extrahepatic source.** Muscle disorders/strenuous exercise (AST>ALT, CK context), thyroid
  disease, coeliac, haemolysis → surface as context, route where a shortfall/pattern appears. **[D][A16][A23]**
- **15.7 Red flags.** Jaundice, ascites, encephalopathy, or synthetic-dysfunction signs (low albumin, high
  INR, high bilirubin), or severe >15× ULN → calm prompt healthcare review regardless of band. **[D][A20][A21]**
- **15.8 Sex unknown.** Use conventional ULN 40 with reduced confidence; note that sex refines the range. **[D][A10]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Repeat-first for new mild. [A]** A single mildly-raised ALT is often transient; the primary longitudinal
  move is a repeat in 2–4 weeks before reading a trend. **[A18]**
- **Persistence matters. [A]** A mild elevation **confirmed on repeat** is what warrants structured,
  unhurried evaluation — persistence, not a single value, is the signal. **[A28]**
- **Assay/lab consistency. [A]** Comparing values across labs/methods (with differing ULNs) is a trend caveat,
  not a true change. **[A9]**
- **Read with companions over time. [A]** ALT trends are interpreted with AST (De Ritis), and where available
  GGT/ALP/bilirubin/ferritin; a change in the ratio can shift the ranked explanations. **[A15][A22]**
- **Context/abstained points. [C]** Likely-transient, discordant, or context-required points are tagged so
  they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For ALT, the first tier is **context and companion markers** (and, for new mild values, a repeat), then
context-appropriate lifestyle. **[A]/[B]**

## 17.1 Companion markers & context first [A][A15][A18][A22]
Where ALT is raised, the clarifying steps are the **companion enzymes** (AST/De Ritis; in time GGT/ALP/
bilirubin), **ferritin** and **hs-CRP**, the **metabolic/alcohol/medication/exercise** context, and — for a
new mild value — a **repeat test**. **[A]**

## 17.2 Metabolic & lifestyle context [A][A14]
Where a metabolic (fatty-liver) pattern is plausible, general liver-friendly wellness — weight, alcohol
moderation, physical activity — is relevant context; research links ~7%+ weight loss with improvement in
metabolic steatosis. Framed as **education, not treatment**. **[A]**

## 17.3 Medication & exposure context [A][A16][A25]
Some medications (e.g. statins, NSAIDs, antiepileptics, and others) and alcohol are recognised context for an
elevation — useful for interpretation, **never** a prompt to change any medication (a clinician's decision). **[A]**

## 17.4 Framing rules [B][D]
Context and companion markers first (repeat for new mild); **no specific treatments, medication changes, or
doses** (S7); contested thresholds shown, never averaged; calm, evidence-informed language; never a diagnosis;
the organ-context (CAV2) and extrahepatic (CAV8) caveats attached where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain that ALT is a context-dependent hepatocellular-injury marker; run the
organ-context evaluation; assign the sex-aware band and severity context; integrate AST/De Ritis, ferritin,
hs-CRP (and future GGT/ALP/bilirubin) with extrahepatic caveats; present **ranked** explanations for an
elevation; recommend a repeat for a new mild value; name which markers would clarify; express
context-required/abstention respectfully.

The AI layer **must never**:
- emit "liver disease", "hepatitis", "cirrhosis", "NAFLD/fatty liver", "drug-induced liver injury", or any condition as a diagnosis — even to deny one (S1)
- interpret ALT as an isolated liver-disease marker rather than a context-dependent injury marker (S2)
- assert a single cause for an elevation when ≥2 are plausible — rank them (S3)
- ignore sex (use sex-specific ULN_ref; sex unknown → reduced confidence + conventional 40) (S4)
- load interpretation onto a new/isolated mild elevation without preferring a repeat (S5)
- ignore extrahepatic/transient possibilities (muscle/exercise/thyroid/coeliac/haemolysis) (S6)
- recommend treatments, medication changes, or doses (S7)
- invent certainty when companion markers/context are unavailable — state the limitation (S8)
- produce a numeric liver-disease-risk % from ALT (S9)
- fail to route red flags or severe elevations calmly and promptly (S10)
- present a BioSense band, ULN, or severity multiple as a medical/diagnostic boundary (S11)
- average contested thresholds (S12)

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any liver condition is
SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes
  patterns, never names liver disease/hepatitis/cirrhosis/NAFLD/DILI (S1). **[D][R7]**
- **Organ-context honesty.** ALT is presented as a context-dependent hepatocellular-injury marker, never an
  isolated liver-disease marker; multiple processes can raise it (S2, CAV2). **[D][B2]**
- **Ranked, not asserted.** Where several explanations fit, they are ranked by evidence + context, never
  reduced to one certain cause (S3, CAV5). **[D][R3]**
- **Repeat-first for new mild.** New/isolated mild elevations lead with a repeat-test framing; transient
  causes are common (S5, CAV4). **[D][A18]**
- **Extrahepatic awareness.** Muscle/exercise/thyroid/coeliac/haemolysis possibilities are surfaced (S6,
  CAV8). **[D][A16]**
- **Calm red-flag routing.** Jaundice/ascites/encephalopathy, synthetic-dysfunction signs, or severe >15× ULN
  → prompt, unhurried healthcare review; never emergency-diagnose; peak ≠ prognosis (S10, CAV6). **[D][A20][A21]**
- **No treatment/medication guidance.** Medication/exposure questions → educational context + referral; never
  advise changing medications (S7). **[D][A16]**
- **Missing markers/context stated, not invented.** (S8). **[D][R4]**
- **Correct unit handling.** U/L used as-is (no analyte conversion factor); sex required for the Optimal/
  High-Normal boundary. **[D][A24]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. A mild elevation is **persistent on repeat** testing. **[A28]**
2. The value is **moderate or severe** (≥5× ULN). **[A11]**
3. **Red flags** are present — jaundice, ascites, encephalopathy, or synthetic-dysfunction signs (low
   albumin, high INR, high bilirubin). **[A20]**
4. A **possible DILI pattern** (ALT ≥5× ULN, or ALT ≥3× ULN with bilirubin >2× ULN). **[A25]**
5. **Discordant companion markers** (e.g. a De Ritis ratio suggesting an alcoholic pattern; a raised ferritin
   with ALT). **[A15][A19]**
6. A **known liver condition**, **pregnancy**, or the user **asks a medical/medication question** (S7).

All suggestions are wellness-framed, non-urgent (unless red flags), non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-014 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for ALT (U/L) plus assay/lab-range and
  sex metadata, and — as interpretation inputs — **AST (SCL-015; De Ritis ratio), ferritin (SCL-010), hs-CRP
  (SCL-006), and future GGT/ALP/bilirubin**, plus declared context (alcohol, obesity/metabolic syndrome,
  recent exercise/muscle injury, medications, viral illness, pregnancy, known liver conditions). **[R4]**
- **Supplies (as CSL bindings):** the sex-aware high-dominant bands (Category B), the severity-by-multiples
  context, the reused Organ-Context/Context-First gate, the reused four-level confidence hierarchy, the reused
  ranked multiple-explanations output, the reused cross-biomarker consumption (with the De Ritis ratio and
  graceful degradation), the guideline-disagreement display, the transience/repeat behaviour, safety rules,
  context guidance, and narrative templates — each with value + source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, the confidence hierarchy, the
  multiple-explanations output, and cross-biomarker intelligence (all frozen from SCL-010); sex-aware banding
  (SCL-004/010); the guideline-disagreement posture (SCL-003/011/012); two-sided banding
  (SCL-004/009/010/011/012); and the diagnostic-adjacency discipline (SCL-002/009/011/012). **The
  organ-context interpretation is represented within Context-First — not as a new methodology.** **[C][R1]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (companions inform and rank, never
  averaged into a single verdict; contested thresholds never averaged).
- **Uses the correct unit handling** (U/L as-is; no analyte factor) — a per-analyte configuration.
- **Score contribution:** ALT contributes to a metabolic/hepatic-wellness context as a **sex-aware,
  high-dominant, context-gated** input, with elevations expressed as ranked-possibility context rather than a
  verdict; likely-transient/context-required values do not contribute a definite verdict. Any weighting is a
  Category [C] product decision. **[C]**

---

# 22. Medication & Exposure Context (educational only)

Educational context only; BioSense does not instruct on treatment, dose, or medication changes (S7). **[D]**
- Many common medications (e.g. statins, NSAIDs, antiepileptics, some antibiotics) and alcohol are recognised
  context for an ALT elevation. A raised ALT on medication is interpreted **with** that context, but any
  decision about a medication belongs to the prescriber. **[A][A16]**
- The **DILI pattern** (ALT ≥5× ULN, or ALT ≥3× ULN with bilirubin >2× ULN — a Hy's-law-type context) is a
  **prompt-review flag**, never a medication instruction. **[A][A25]**
- Any medication or exposure question → educational context + suggestion to speak with a healthcare
  professional; BioSense never advises starting, stopping, or changing a medication. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **The "healthy" ceiling is genuinely contested. [E]** Conventional ~40 vs true-healthy 30/19, 35/25,
   29–33/19–25; BioSense shows the frameworks, never averages. **[A5][A9]**
2. **Thresholds are lab- and population-dependent. [E]** ULNs vary widely by laboratory and reference
   population; method context is a confidence input. **[A9]**
3. **ALT is not exclusively hepatic. [E]** Extrahepatic (muscle/exercise/thyroid/coeliac/haemolysis) sources
   exist; ranked explanations and CK/TSH/coeliac context handle this. **[A16][A23]**
4. **Transience complicates single readings. [E]** Exercise/illness/alcohol cause transient rises; repeat
   testing is the mitigation. **[A18]**
5. **Severity multiples use a convention. [E]** The ×ULN grades use the conventional ~40 anchor; the "true
   healthy" anchor differs — both shown, never merged. **[A11][R5]**
6. **The low-ALT/frailty association is evolving. [E]** Represented as a gentle context flag, not a finding. **[A27]**
7. **Companion availability is data-dependent. [E]** Without AST/GGT/ALP/bilirubin/ferritin, the ranked
   explanations degrade to a confidence limitation, not certainty. **[R4]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**;
organ-context; sex-aware; ranked explanations; repeat-first for new mild). **[B]/[D]** (Illustrative; exact
copy owned by BioSense.)

```
TEMPLATE: OPTIMAL (context concordant/not needed)
"Your ALT is {value} U/L — in a favourable, metabolically-healthy range for {sex}. It's a single snapshot
 read in context, but nothing here stands out."  +CAV1 +CAV2

TEMPLATE: HIGH_NORMAL_WATCH (ULN_ref–40)
"Your ALT is {value} U/L — within the conventional lab range but a little above the stricter 'healthy' line
 some liver specialists use for {sex}. That isn't a problem in itself; if you carry metabolic risk factors,
 it's a gentle nudge toward liver-friendly habits."  +CAV1 +CAV2 +CAV9

TEMPLATE: BORDERLINE / MILD_ELEVATED (40–200 ; <2×–5× ULN)
"Your ALT is {value} U/L — a mild elevation, which is very common and often temporary. Repeating the test in
 a few weeks is usually the sensible next step. Several things can raise ALT, so here are the more likely
 explanations for your context rather than a single answer: {ranked A/B/C}."  +CAV1 +CAV2 +CAV4 +CAV5

TEMPLATE: MODERATE / SEVERE_ELEVATED (>200 ; >5×–>15× ULN — CALM ROUTING, NOT ALARM)
"Your ALT is {value} U/L — a more marked change. This is worth a prompt, unhurried conversation with a
 healthcare professional, who can look at the fuller picture; the number alone doesn't tell us the cause."  +CAV1 +CAV2 +CAV6

TEMPLATE: LOW_CONTEXT_FLAG (<10)
"Your ALT is on the low side at {value} U/L. This is usually nothing to worry about; in some research it's
 linked with lower muscle reserve, so it's simply noted."  +CAV1

MODIFIER: COMPANION_MARKERS_PRESENT →
 integrate AST/De Ritis, ferritin, hs-CRP: "Alongside your AST, the AST:ALT pattern leans toward {context},
 which we've factored into the explanations above."  +CAV8

MODIFIER: RANKED_EXPLANATIONS (elevation, ≥2 causes) →
 "Possible explanations, most-to-least likely for your context: A {…}, B {…}, C {…} — best confirmed with a professional."  +CAV5

MODIFIER: TRANSIENCE (new/isolated mild ; recent exercise/illness/alcohol) → lead with repeat-test framing.  +CAV4

MODIFIER: EXTRAHEPATIC_POSSIBLE (muscle/exercise/thyroid/coeliac) → +CAV8 (non-liver factors; CK/TSH context).

MODIFIER: CONTEXT_UNAVAILABLE (no AST/GGT/ALP/bilirubin/ferritin) →
 "We'd interpret this more confidently with AST (and, in time, GGT, ALP and bilirubin), plus ferritin and hs-CRP."  +CAV7

MODIFIER: RED_FLAGS (jaundice/ascites/encephalopathy ; low albumin/high INR/high bilirubin) → calm prompt review.  +CAV6
```

**Absolute rules:** no template diagnoses a liver condition, asserts a single cause, treats a band/ULN/multiple
as a diagnostic boundary, omits sex-awareness, alarms, or averages thresholds. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, male, context concordant. [illustrative]**
```
Input: ALT 24 U/L, male, no risk factors, AST normal.
Band: OPTIMAL (≤30 M) | Severity: n/a | Confidence: STANDARD
Narrative: OPTIMAL +CAV1+CAV2.  [A5]
```

**Example 2 — High-normal, female, metabolic risk. [illustrative]**
```
Input: ALT 28 U/L, female (ULN_ref 19; conventional 40), obesity noted.
Band: HIGH_NORMAL_WATCH (19<v≤40) | Confidence: STANDARD
Narrative: HIGH_NORMAL_WATCH +CAV1+CAV2+CAV9 ; note metabolic context; NO diagnosis.  [A5,R5]
```

**Example 3 — Borderline, new, isolated. [illustrative]**
```
Input: ALT 62 U/L (<2× ULN 40), no companion markers, recent gym session.
Band: BORDERLINE_ELEVATED | Confidence: REDUCED (transient possible; no companions)
Narrative: repeat-first +CAV4 ; ranked A(metabolic) B(recent exercise/muscle) C(alcohol/meds) +CAV5+CAV8 ; NO diagnosis.  [A11,A17,A18,S3,S5]
```

**Example 4 — Mild, with AST/De Ritis. [illustrative]**
```
Input: ALT 140 U/L (2–5× ULN), AST 300 (De Ritis ~2.1), alcohol context.
Band: MILD_ELEVATED | Severity: mild | Confidence: STANDARD
Narrative: ranked A(alcoholic pattern — De Ritis >2, CONTEXT not verdict) B(metabolic) C(other) +CAV5 ; calm review; NO "alcoholic liver disease" diagnosis.  [A15,R3,R7]
```

**Example 5 — Severe elevation. [illustrative]**
```
Input: ALT 900 U/L (>15× ULN).
Band: SEVERE_ELEVATED | Severity: severe/massive | Confidence: STANDARD
Narrative: calm prompt healthcare review +CAV6 ; ranked A(acute viral) B(toxin/drug) C(ischaemic) ; peak≠prognosis; NO diagnosis.  [A21,S10]
```

**Example 6 — Elevation, no context/markers. [illustrative]**
```
Input: ALT 75 U/L, sex unknown, no companion markers, no context.
Band: BORDERLINE (conventional ULN 40) | Confidence: CONTEXT_REQUIRED / REDUCED (sex unknown)
Narrative: repeat-first +CAV4 ; +CAV7 (name AST/GGT/ALP/bilirubin/ferritin) ; +CAV3 (sex refines range) ; NO diagnosis.  [A10,R4,S4,S8]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, four-level confidence
  hierarchy, multiple-explanations output, and cross-biomarker intelligence; and the iron/ferritin companion.
- **SCL-015 (AST)** — the primary companion; the **De Ritis (AST:ALT) ratio** is consumed from here as a
  context input.
- **SCL-006 (hs-CRP)** — systemic-inflammation context.
- **SCL-004 (HDL-C) / SCL-010 (Ferritin)** — precedent for the reused sex-aware banding.
- **SCL-011 (Vitamin D) / SCL-012 (B12)** — precedent for guideline-disagreement / dual-framework display.
- **Future GGT, ALP, Bilirubin SCLs** — companion hepatobiliary markers ALT consumes (hepatocellular vs
  cholestatic pattern; Hy's-law context); where unavailable, a confidence limitation is recorded.
- **SCL-002 (HbA1c) / SCL-009 (Fasting Glucose)** — source of the reused diagnostic-adjacency discipline.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the A-series IDs in §0 and
> the body. Developers finalising the pack should confirm exact page/table locators against the primary
> sources where required.

**Reference ranges, thresholds & guideline disagreement (Category A anchors)**

1. Medscape: **Alanine Aminotransferase — Reference Range / Interpretations** (article 2087247). — *ALT rises
   on hepatocellular injury; liver-predominant; Asian donor ULN 34 (M)/22 (F); De Ritis ratio; very-high
   causes; peak ≠ prognosis (A1, A2, A8, A15, A21).*
2. **StatPearls (NCBI Bookshelf NBK482489): Liver Function Tests.** — *severity by multiples of ULN (mild
   <5×, moderate 5–15×); common causes by band; extrahepatic (muscle/thyroid) (A11, A13, A16).*
3. **AAFP (2017): Mildly Elevated Liver Transaminase Levels.** — *normal ALT 29–33 (M)/19–25 (F); AST:ALT
   ratio interpretation; extrahepatic (thyroid, coeliac, haemolysis, muscle); μkat conversion (A7, A15, A16,
   A24).*
3. **AASLD: How to approach elevated liver enzymes (Liver Fellow Network).** — *initial workup panel (CBC,
   AST/ALT, ALP, bilirubin, PT/INR, hepatitis panel, iron studies, US); severity-guided management; acute
   liver failure red flags (A20, A22).*
5. Prati et al. / **PMC6780691 (Low ALT cut-off cohort)** & **PMC3433469 (Chinese Han ULN)**. — *Prati "true
   healthy" 30 (M)/19 (F); ACG 29–33/19–25; NHANES 29/22; donors 33/25; Han 35 (M)/23 (F); ULN varies 35–79
   (M)/31–55 (F); conventional <40 (A5, A7, A8, A9).*
6. **PMC10973120 (High-normal ALT, CHB).** — *APASL 2016 ULN 40; AASLD 2016 30 (M)/19 (F); AASLD 2018 35 (M)/
   25 (F); threshold purpose varies (A4, A5, A6, A26).*

**Elevation causes, severity, transience, extrahepatic (Category A)**

7. **wellally: Slightly Elevated ALT/AST — When to Worry.** — *<2× ULN in ~8% population, frequently benign;
   NAFLD/alcohol/meds >80%; repeat 2–4 wks; persistence → structured evaluation; red flags; thyroid/coeliac/
   iron (A11, A12, A13, A18, A19, A20, A23, A28).*
8. **Lola Health (2026): ALT explained** & **ScienceInsights: Elevated AST and ALT.** — *conventional/lab
   ranges; strenuous exercise transient (resolves ~7 d); muscle (AST>ALT, CK); borderline/mild grading;
   severe >1000 in acute viral (A3, A11, A16, A17, A21).*
9. **Lamkin Clinic: ALT optimal levels** & **droracle (164369/399545).** — *NAFLD commonest mild–moderate
   cause (25–30% adults); Prati anchors; ALT specificity; 29–33/19–25 (A5, A7, A13, A14).*
10. **NCT06192589 (DILI assessment appendix)** & **NCT01522625 (CHB mild-ALT trial).** — *DILI thresholds
    ALT ≥5× ULN or ALT ≥3× ULN + bilirubin >2× ULN; treatment thresholds (>2× ULN) illustrate purpose (A25,
    A26).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–10; they are
> BioSense Version 1 classifications, sex-aware and high-dominant, context-gated, not attributable to any
> single reference as a diagnostic threshold, and **do not restate diagnostic labels.** The conventional and
> "true healthy" ULNs are shown as separate frameworks and **never averaged**; ALT is presented as a
> hepatocellular-injury marker, never a liver-disease diagnosis.

---

# 28. Founder Decisions Required

The ALT methodology reuses frozen BioSense frameworks and represents the founder's Organ-Context decision via
the existing Context-First Framework. Two optional presentation/policy items remain: **[C][E]**

**D-1 — Confirm the sex-aware band anchoring and the dual-threshold display.** SCL-014 anchors **Optimal** to
the sex-specific "true healthy" ULN (Prati 30 M / 19 F), spans **High-Normal — Watch** up to the conventional
~40, and grades elevations by multiples of the conventional ULN — showing both frameworks and never averaging
them. Confirmation requested that this dual-threshold, sex-aware presentation (rather than a single ULN) is
the intended default. **Founder sign-off requested.**

**D-2 — Confirm the cross-biomarker consumption scope for V1.** SCL-014 is specified to consume **AST
(SCL-015; De Ritis ratio), ferritin (SCL-010), hs-CRP (SCL-006), and future GGT/ALP/bilirubin** where
available (with graceful degradation to a confidence limitation, and a repeat-test preference for new mild
values). **Founder decision requested** on whether V1 activates ALT with ALT-only + AST/ferritin/hs-CRP
context (degrading gracefully) or waits for the GGT/ALP/bilirubin packs to exist.

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-014 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/
reference figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. ALT
reuses frozen BioSense methodology throughout — the Context-First Interpretation Framework, four-level
confidence hierarchy, multiple-explanations output, and cross-biomarker intelligence (all from SCL-010),
sex-aware banding (SCL-004/010), the guideline-disagreement posture (SCL-003/011/012), two-sided banding with
flags (SCL-004/009/010/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012) — introducing
only ALT-specific scientific content (the thresholds and their sex-specificity; the multiples-of-ULN severity
structure; the hepatocellular-injury framing; the extrahepatic/context modifiers; the De Ritis ratio; the
transience/repeat behaviour; and the red-flag routing). Per the founder's Organ-Context decision, ALT is
represented as a context-dependent hepatocellular-injury marker — never an isolated liver-disease marker or a
diagnosis. No new methodology was required; all structure remains consistent with SCL-001 through SCL-013.*
