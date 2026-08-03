# SCL-023 — BILIRUBIN
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. Bilirubin is a high-dominant, context-first marker of haem metabolism, hepatic processing, and biliary excretion whose elevated value REQUIRES biological context — interpreted via direct/indirect fractionation and the wider liver panel and haemolysis companions using the existing Cross-Biomarker Intelligence, Confidence Hierarchy, Confidence Inheritance, and Guideline-Disagreement frameworks. Never interpreted in isolation. Never a diagnosis of Gilbert syndrome, liver disease, biliary obstruction, haemolysis, hepatitis, or cancer. No new methodology introduced.*

**Document ID:** SCL-023
**Biomarker:** Bilirubin (Total, with direct/indirect fractionation) — haem-metabolism / hepatic-processing / biliary-excretion marker; high-dominant; context-first; fractionation/pattern-based; sex/pregnancy-aware where stratified
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 3 August 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template, and aligned to the frozen liver-panel packs GGT (SCL-021), ALP (SCL-022), ALT (SCL-014) and AST (SCL-015) and the haemoglobin pack (SCL-019). Bilirubin reuses the frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), cross-biomarker intelligence (SCL-010), the four-level confidence hierarchy (SCL-010), **confidence inheritance** (SCL-016/017/018/019/021/022), multiple-explanations output (SCL-010), high-dominant banding (SCL-021), sex/age/pregnancy-aware banding (SCL-004/010/016/017/018/019/022), guideline-disagreement handling (SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/014/015/016/017/018/019/021/022) — introducing only Bilirubin-specific scientific content. All sections remain consistent with SCL-001 through SCL-022.

---

> **What this document is.** SCL-023 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for Bilirubin. It reuses existing
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

## STRUCTURAL-FIT NOTE (Bilirubin vs SCL-001, and its liver-panel siblings SCL-021/022) — reuses frozen frameworks; no new pattern

Bilirubin presents the same structural characteristics BioSense has already solved for — in particular the
**fractionation-and-panel-based pattern interpretation** already built for GGT's LFT pattern (SCL-021) and ALP's
source-localisation (SCL-022) — and maps onto the frozen methodology without extension. Bilirubin is a marker of
**haem metabolism, hepatic processing, and biliary excretion**, and its meaning is **inseparable from its
fraction (direct vs indirect) and the wider context**: an elevated total could reflect increased production
(haemolysis → indirect), impaired hepatic processing (hepatocellular → mixed), or blocked biliary excretion
(cholestasis → direct), and it is the **fraction split plus the LFT panel and haemolysis companions** that tells
you which. So it reuses the Cross-Biomarker Intelligence and Context-First frameworks:

1. **Never-in-isolation interpretation — reused cross-biomarker intelligence (SCL-010) + multiple-explanations
   (SCL-010).** An elevated total bilirubin screens haem/hepatic/biliary activity, but the meaningful wellness
   read comes from bilirubin **plus its companions** — the **direct/indirect fractionation**, then ALT (SCL-014),
   AST (SCL-015), GGT (SCL-021), ALP (SCL-022), and the haemolysis markers haemoglobin (SCL-019), future LDH and
   future reticulocytes — which is exactly a consume-companions-and-rank-the-interpretation pattern (§0.5, §9).
   Bilirubin alone is a screen; the fraction and companions localise the mechanism. **Bilirubin is never
   interpreted in isolation.**
2. **Confidence inheritance — reused (SCL-016/017/018/019/021/022).** A bilirubin-plus-companion pattern (e.g.
   the cholestatic or the haemolysis pattern) **inherits the lower confidence** of its inputs; if the companions
   are unavailable, the read is confidence-limited, not asserted — and this is precisely how BioSense
   **distinguishes a hepatobiliary pattern from a haem-production pattern** (§0.6, §13).
3. **Context-First — reused (SCL-010).** Bilirubin is interpreted only after context — the fraction, the LFT
   panel, the haemolysis companions, and fasting status, recent illness, alcohol, medications, and pregnancy —
   evaluated **before** banding (§0.2, §8, §12).
4. **High-dominant banding with flags — reused (SCL-021).** Bilirubin is meaningfully **high-dominant**: the
   elevated direction (haem-production / hepatic-processing / biliary-excretion) carries the signal; a **low**
   bilirubin is not clinically significant (§11).
5. **Sex/age/pregnancy-aware banding — reused (SCL-004/010/016/017/018/019/022).** Bilirubin is interpreted in
   the **adult** wellness scope (the neonatal range is a separate, higher-range clinical domain), with fasting
   and pregnancy as context (§11, §15).
6. **Guideline-disagreement handling — reused (SCL-003/011/012).** The adult reference ranges genuinely differ
   (0.1–1.2; 0.2–1.3; 0.2–1.0 mg/dL) and the fraction cut-offs vary (direct >0.4 mg/dL or >20–30%; conjugated
   >50%) — presented as distinct frameworks, **never averaged** (§10, §11).
7. **Multiple-explanations output — reused (SCL-010).** An elevated bilirubin gets **ranked patterns** — the
   five founder-named interpretation patterns (isolated / hepatocellular / cholestatic / possible haemolysis /
   fasting-Gilbert-type) — never a single certain cause (§11, §14).
8. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012/014/015/016/017/018/019/021/022).** BioSense
   never emits "Gilbert syndrome," "liver disease," "biliary obstruction," "haemolysis," "hepatitis," or
   "cancer" as a diagnosis; it detects the pattern, routes, and names nothing (§18, §19).

**Biomarker-specific content introduced:** the bilirubin thresholds and their high-dominant structure; the
mg/dL and µmol/L units (1 mg/dL = 17.1 µmol/L); the **direct/indirect fractionation** logic; the five
interpretation patterns; the reference-range and fraction-cut-off disagreements; the jaundice threshold; the
fasting/Gilbert-type and transient-context nuances; the haemolysis-companion layer; the **evolving antioxidant/
cardiovascular-protection science** (represented as evolving, not established); and the adult-scope (neonatal-
separate) boundary. **No new methodology is required.** **[C]**

---

## CONTENT CLASSIFICATION KEY

- **[A]** Source-derived fact / recognised threshold.
- **[B]** BioSense Version 1 wellness interpretation (labelled).
- **[C]** Product-policy decision.
- **[D]** Safety / healthcare-review wording.
- **[E]** Area of uncertainty / evolving science.

---

# SCIENTIFIC POSITION STATEMENT

BioSense is a premium wellness and preventative health-intelligence platform. It is not a medical device.
It does not diagnose disease, and it does not replace healthcare professionals.

Bilirubin is best understood as **a marker of haem metabolism, hepatic processing, and biliary excretion** — a
physiological yellow pigment produced when haem (mostly from the haemoglobin of red blood cells) is broken down,
then taken up, conjugated, and excreted by the liver and bile — **not** a standalone verdict and **not** a
diagnosis. Because a raised total could reflect three very different things — increased **production**
(red-cell breakdown), impaired hepatic **processing**, or blocked biliary **excretion** — its meaning is
inseparable from its **fraction** and its **context**: the split between **indirect (unconjugated)** and
**direct (conjugated)** bilirubin, read with the liver panel (ALT, AST, GGT, ALP) and the haemolysis markers
(haemoglobin, and in future LDH and reticulocytes), is what points toward a mechanism. A predominantly
**indirect** rise points pre-hepatic (haemolysis, or the common and benign fasting/Gilbert-type pattern); a
predominantly **direct** rise points hepatic or biliary.

So BioSense reads bilirubin **with its fraction and companions** — **never in isolation** — begins with
biological context (fasting, a recent illness, a new medicine, or alcohol can all nudge it; a mild isolated
indirect rise is very common and usually benign), ranks the plausible **patterns** rather than asserting one,
shows where reference ranges and fraction cut-offs genuinely differ rather than splitting them, and names no
condition. It also treats the emerging science on mildly elevated bilirubin — the idea that, as a circulating
antioxidant, it may be associated with cardiovascular protection — as **evolving science, not established
clinical fact**, and never as a reason to want a higher bilirubin.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as the
evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate Bilirubin. Every value carries a source ID (Q-series / R-series → §27) and
> a category tag. Canonical unit: mg/dL (µmol/L supported; 1 mg/dL = 17.1 µmol/L). **High-dominant, context-
> first, fractionation/pattern-based; NEVER interpreted in isolation; the pattern verdict inherits lower input
> confidence and distinguishes hepatobiliary vs haem-production patterns; NEVER a diagnosis of Gilbert syndrome,
> liver disease, biliary obstruction, haemolysis, hepatitis, or cancer. Adult wellness scope (neonatal is a
> separate clinical domain).**

## 0.1 Canonical units — [A]
```
canonical_unit: mg/dL   (µmol/L supported)   [Q3,Q4]
conversion: 1 mg/dL = 17.1 µmol/L   [Q6]   # bilirubin-specific factor (17.1); NOT the cholesterol (38.67)/triglyceride (88.57)/creatinine (88.4)/glucose (18.0)/25(OH)D (2.496)/B12 (0.738)/folate (2.266)/Free T4 (12.87)/haemoglobin (÷1.611) factor; and NOT an enzyme-activity unit (unlike ALT/AST/GGT/ALP which are U/L) — bilirubin is a mass concentration
Always retain total value + unit + fraction(direct/indirect, if available) + sex + age(adult scope; neonatal separate) + pregnancy + fasting status + companions(ALT/AST/GGT/ALP/Hb/future LDH/future reticulocytes) + context(recent illness/alcohol/medications). Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  fraction (the key split): direct (conjugated) vs indirect (unconjugated); UCB normally ~70–85% of total; [Q7,Q8]
  companions (NEVER-IN-ISOLATION): ALT (SCL-014), AST (SCL-015), GGT (SCL-021), ALP (SCL-022) [hepatobiliary]; Haemoglobin (SCL-019), future LDH, future Reticulocyte Count [haem-production]; [Q10,Q15]
  context: fasting status (fasting raises indirect), recent illness, alcohol exposure, medications, pregnancy; [Q12,Q18]
  scope: ADULT wellness interpretation only — neonatal bilirubin is a separate, higher-range clinical domain (NOT interpreted here). [Q24]
CORE RULE (founder): bilirubin is a marker of HAEM METABOLISM, HEPATIC PROCESSING & BILIARY EXCRETION; an ELEVATED value REQUIRES biological context; NOT a diagnosis. [Q1,Q10,Q20][B3]
  → bilirubin alone = screen; the mechanism (production/hepatic/biliary) needs the FRACTION + LFT panel + haemolysis markers. [Q8,Q10]
  → predominantly INDIRECT → pre-hepatic (haemolysis / fasting-Gilbert-type); predominantly DIRECT → hepatic or biliary. [Q8]
  → where several patterns fit an elevated bilirubin, RANK them (§0.5); never assert one. [R3]
IF material context changes meaning → interpret WITHIN that context.                                          [R1]
IF fraction / companions / key context unavailable → CONFIDENCE LIMITATION (pattern confidence limited), not certainty. [R4,R9]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors) — HIGH-DOMINANT (total)
```
BILIRUBIN_TOTAL_WELLNESS_BAND (mg/dL, general adult; after context gate; ALWAYS read with fraction + panel):   [Q3,Q4,Q5,Q11,Q13,Q23]
 Uses an adult total reference (ULN_ref default 1.2 mg/dL / 20.5 µmol/L; lab's own preferred; frameworks never averaged). [Q3,Q5]
  OPTIMAL_WELLNESS       v <= 1.0                          # most healthy adults 0.3–1.0 mg/dL [Q3]
  WITHIN_REFERENCE       1.0 < v <= ULN_ref                # within standard reference (ULN ~1.2–1.3) [Q3,Q5]
  MILD_HIGH_WATCH        ULN_ref < v <= 3.0                # mild elevation; VERY common; often isolated indirect (fasting/Gilbert-type) & benign; fractionate [Q5,Q11]
  ELEVATED_FLAG          3.0 < v <= 5.0                    # clearer elevation; fractionate + read the pattern (indirect vs direct) [Q8,Q11]
  HIGH_FLAG              5.0 < v <= 10.0                   # marked; pattern (hepatocellular/cholestatic/haemolysis) + route [Q8,Q17]
  MARKED_HIGH_FLAG       v > 10.0                          # markedly elevated; pattern + prompt review [Q8]
JAUNDICE NOTE: visible jaundice appears ~2–3 mg/dL (~35–50 µmol/L; varies with skin pigmentation) — a routing cue, not a band boundary. [Q13]
DIRECTION: HIGH-DOMINANT (high = haem-production/hepatic-processing/biliary-excretion direction; LOW not clinically significant — no low flag). [R6,Q23]
FRACTION OVERLAY (the pattern layer): predominantly indirect → pre-hepatic (haemolysis / fasting-Gilbert-type); predominantly direct (>0.4 mg/dL or >20–30% of total; conjugated >50% → obstruction) → hepatic/biliary. [Q8,Q9]
UNIT: mg/dL (µmol/L ×17.1). COMPANIONS (fraction + LFT + haemolysis markers) REQUIRED to move from screen to pattern; if absent → screen-level read + reduced confidence. [Q8,Q19][R9]
SCOPE: ADULT. Neonatal bilirubin is a separate, higher-range clinical domain — NOT interpreted by these bands. [Q24]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never in isolation; never a diagnostic label. [B][D]**

## 0.4 Reference, fraction & jaundice frameworks (guideline-disagreement, never averaged) — [A]/[B]
```
ADULT TOTAL REFERENCE RANGES (represent the relevant framework(s); NEVER average):   [Q3,Q4,Q5]
  0.1–1.2 mg/dL (MDTools, Tietz-based). [Q3]
  0.2–1.3 mg/dL (Cleveland, children & adults). [Q3]
  0.2–1.0 mg/dL (with ~0.0–0.2 conjugated) (Tietz/USPTO). [Q4]
  0–1.2 mg/dL (0–20.52 µmol/L) (HealthMatters); most healthy adults 0.3–1.0. [Q5]
FRACTION CUT-OFFS (represent; NEVER average):   [Q7,Q8,Q9]
  UCB (indirect) normally ~70–85% of total; conjugated averages ~3.6% in health. [Q7]
  DIRECT (conjugated) elevation significant at >0.4 mg/dL OR >20–30% of total → hepatic/biliary. [Q8]
  Conjugated >1.0 mg/dL OR >50% of total → obstruction/hepatobiliary. [Q9]
GILBERT-TYPE (indirect, benign): total typically 1.2–3.0 mg/dL (rarely >4–5), UCB 90–99% of total; 5–10% prevalence. [Q11]
JAUNDICE (routing cue, not a band): visible ~2–3 mg/dL (~35–50 µmol/L; varies with skin pigmentation). [Q13]
CONVERSION: 1 mg/dL = 17.1 µmol/L. [Q6]
DEFAULT: BioSense uses an adult total reference (ULN_ref 1.2 mg/dL) for banding when the lab's own range is unavailable; prefer the lab's own reference & fractions; show the framework used. [Q3,Q5]
```

## 0.5 Interpretation-pattern / companion hints — [A]+[C] — REUSED cross-biomarker (SCL-010) + inheritance (SCL-016/017/018/019/021/022)
```
FIVE INTERPRETATION PATTERNS (pattern hints, NOT diagnoses; require fraction + companions; confidence inherits lower input): [R3,R4,R9]
  ISOLATED bilirubin elevation (mild total ↑, normal ALT/AST/GGT/ALP, no anaemia)   → isolated-elevation PATTERN; often benign; fractionate. [Q11,Q20]
  HEPATOCELLULAR (bilirubin ↑ + ALT↑/AST↑, mixed fraction)                          → hepatocellular-direction PATTERN (read with ALT/AST, SCL-014/015). [Q17]
  CHOLESTATIC (DIRECT ↑ + ALP↑/GGT↑, ± pruritus)                                    → cholestatic-direction PATTERN (read with ALP/GGT, SCL-022/021). [Q16]
  POSSIBLE HAEMOLYSIS (INDIRECT ↑ + low haemoglobin ± high LDH/reticulocytes)        → haem-production PATTERN (read with Hb/SCL-019, future LDH, future retics). [Q14,Q15]
  FASTING / GILBERT-TYPE (mild INDIRECT ↑, normal LFTs & Hb, worsened by fasting/stress/illness) → benign isolated-indirect PATTERN. [Q11,Q12]
INHERITANCE distinguishes HEPATOBILIARY (LFT: ALT/AST/GGT/ALP) vs HAEM-PRODUCTION (Hb/LDH/retics) patterns; verdict inherits lower input confidence. [R9]
FRACTION KEY: predominantly indirect → pre-hepatic (haemolysis/Gilbert); predominantly direct (>0.4 mg/dL or >20–30%) → hepatic/biliary; conjugated >50% → obstruction. [Q8,Q9]
GOVERNANCE: emit a pattern read ONLY with the fraction + relevant companions; else screen-level + confidence limitation. NEVER a diagnosis; RANK patterns (§0.2). [R7,R9]
NOTE: bilirubin does NOT diagnose; the FRACTION + pattern (not mere elevation) carries the meaning; total is the screen, fractionation is ordered when confirmed. [Q19,Q20]
```

## 0.6 Confidence hierarchy (four-level) + inheritance — [C] — REUSED (SCL-010 + SCL-016/017/018/019/021/022)
```
STANDARD          : clear total AND fraction (direct/indirect) available AND key companions (LFT and/or Hb) AND no unexcluded confound (recent fasting/illness/alcohol/new medication).
REDUCED           : single value / near a boundary / fraction-or-context uncertain / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : elevated total with NO fraction and/or NO companions (pattern not resolvable) OR unexcluded confound (fasting/recent illness/new medication) → screen-level + request fractionation/LFT/Hb/repeat; name what's needed. [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / suspected cholestatic or haemolysis pattern needing evaluation / hepatocellular pattern with high ALT/AST → explained abstention. [R2,Q16,Q14]
INHERITANCE: the bilirubin+companion PATTERN verdict inherits the LOWER confidence of bilirubin and its companions; companions absent → pattern limited to a screen-level statement; this is HOW hepatobiliary vs haem-production patterns are distinguished. [R9]
Reduced confidence does NOT auto-block; significant uncertainty MAY justify abstention. New mild elevation → prefer FRACTIONATE + REPEAT (fasting-state noted), an isolated indirect rise is common. [Q11,Q19]
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  Bilirubin is NOT a diagnosis. NEVER emit "Gilbert syndrome/Gilbert's", "liver disease", "cirrhosis", "hepatitis", "biliary obstruction/cholestasis", "gallstones", "PBC/PSC", "haemolysis/haemolytic anaemia", "cancer", or any condition as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  Bilirubin is a marker of haem metabolism, hepatic processing & biliary excretion; an elevated value REQUIRES biological context → interpret WITH the fraction + LFT panel + haemolysis markers; NEVER in isolation. [B3][Q10,Q20]
S3  Emit an interpretation-pattern read ONLY with the fraction and/or relevant companions; else screen-level + confidence limitation (inheritance). [R9]
S4  On elevated bilirubin with ≥2 plausible patterns → RANKED patterns (isolated / hepatocellular / cholestatic / possible haemolysis / fasting-Gilbert-type); NEVER assert one. [R3]
S5  ADULT scope only: neonatal bilirubin is a separate, higher-range clinical domain — do NOT apply adult wellness bands to neonatal values; route neonatal contexts. [Q24]
S6  HIGH-DOMINANT: a LOW bilirubin is not clinically significant — do not flag or over-interpret it. [Q23]
S7  New/isolated mild elevation → FRACTIONATE + suggest REPEAT (note fasting state); an isolated indirect (fasting/Gilbert-type) elevation is very common and usually benign. [Q11,Q12,Q19]
S8  Fraction / companions (LFT / Hb / LDH / reticulocytes) unavailable → confidence limitation, not invented certainty. [R4]
S9  Never recommend treatments/medication changes/doses; never produce a numeric liver/haemolysis-risk %; medication/alcohol questions → educate + refer. [D]
S10 RED FLAGS (markedly elevated bilirubin; visible jaundice; a cholestatic pattern (direct↑ + ALP/GGT↑); a hepatocellular pattern with high ALT/AST; a possible-haemolysis pattern with low haemoglobin) → calm prompt healthcare review; never emergency-diagnose. [Q13,Q16,Q14][D]
S11 Never present a BioSense band, reference range, fraction cut-off, jaundice threshold, or interpretation pattern as a medical/diagnostic boundary.
S12 Represent reference-range and fraction-cut-off disagreement (0.1–1.2 / 0.2–1.3 / 0.2–1.0 mg/dL; direct >0.4/>20–30%; conjugated >50%); NEVER average thresholds. [Q3-Q9][R5]
S13 EVOLVING SCIENCE: represent the antioxidant / cardiovascular-protection association of mildly elevated bilirubin as EVOLVING (observational) science, explicitly NOT established clinical fact; NEVER as a health claim and NEVER as advice to raise bilirubin. [Q21,Q22][E]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & COMPANIONS (the key bilirubin move): ALWAYS read with the FRACTION (direct/indirect) + the LFT panel (ALT (SCL-014)/AST (SCL-015)/GGT (SCL-021)/ALP (SCL-022)) + haemolysis markers (Haemoglobin (SCL-019)/future LDH/future reticulocytes); note fasting status; for a NEW mild elevation, FRACTIONATE + REPEAT. [Q8,Q15,Q19]
Tier 2 LIFESTYLE (context-appropriate): general liver-wellness (moderating alcohol, healthy weight, hydration; noting that fasting/illness can transiently raise indirect bilirubin) — framed as education, not treatment; note a mild isolated indirect elevation (fasting/Gilbert-type) is common and benign. [Q12,Q18,Q11]
Tier 3 HEALTHCARE DISCUSSION (calm) when: markedly elevated / visible jaundice | a cholestatic pattern (direct↑ + ALP/GGT↑) | a hepatocellular pattern with high ALT/AST | a possible-haemolysis pattern with low haemoglobin. [Q13,Q16,Q14][D]
NEVER a specific treatment, medication change, or dose at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → fraction (direct/indirect) → total band (high-dominant) + interpretation pattern (if companions) → template; RANKED patterns where elevated; ALWAYS "read with the fraction & the liver/haemolysis picture".
OPTIMAL_WELLNESS / WITHIN_REFERENCE (+ normal companions) → affirming, with the "screen + read with the panel" caveat.
MILD_HIGH_WATCH → calm; very common; often isolated indirect (fasting/Gilbert-type) & benign; fractionate; repeat.
ELEVATED_FLAG / HIGH_FLAG / MARKED_HIGH_FLAG → constructive; fraction + pattern; ranked patterns; route; ALWAYS "not a diagnosis".
cholestatic (direct↑ + ALP/GGT↑), hepatocellular (high ALT/AST), possible haemolysis (low Hb), or visible jaundice → calm prompt healthcare review; never alarm, never diagnose.
fasting/Gilbert-type context → benign isolated-indirect; fasting/stress/illness triggers; reassure + fractionate.
companions/fraction unavailable → screen-level statement + confidence limitation; name that the fraction & panel complete the picture.
evolving antioxidant/CVD science → present as EVOLVING (observational), NOT established; never a health claim or a reason to want higher bilirubin.
Never "normal/abnormal" as a verdict; never a diagnosis (Gilbert syndrome/liver disease/biliary obstruction/haemolysis/hepatitis/cancer).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Bilirubin comes from the normal breakdown of red blood cells and is processed by your liver, so it's read
      together with its two fractions (direct and indirect) and your other liver markers (ALT, AST, GGT, ALP)
      and blood count — because the same number means different things depending on them."
CAV3 (screen/no fraction or companions) "On its own, a raised total bilirubin doesn't say why. Splitting it into
      direct and indirect, and reading it with your liver panel and blood count, is what turns it into a fuller
      picture — so we'd interpret this more confidently with them."
CAV4 (reduced/context) name the context reducer(s) or missing companion (the fraction, ALT, AST, GGT, ALP,
      haemoglobin, LDH, reticulocytes, fasting status, recent illness, alcohol, medications, pregnancy).
CAV5 (new/mild) "Bilirubin shifts with fasting, a recent illness, alcohol, some medicines and lab method, and a
      mild isolated rise is very common and usually harmless — so a single result is best split into its
      fractions and repeated before reading much into it."
CAV6 (elevated, ranked) "Because several patterns can raise bilirubin, we've noted the more likely ones for your
      context rather than pointing to one — best confirmed with a professional."
CAV7 (cholestatic / hepatocellular / possible haemolysis / jaundice) "This pattern is worth a prompt, unhurried
      conversation with a healthcare professional."
CAV8 (fasting/Gilbert-type) "A mild rise in the indirect fraction, especially after fasting, stress or a minor
      illness, is a very common and benign pattern — it tends to come and go."
CAV9 (evolving science) "There's growing but still-evolving research suggesting mildly raised bilirubin may act
      as an antioxidant with possible cardiovascular associations — this is emerging observational science, not
      an established health benefit, and not a reason to want a higher level."
CAV10 (reference/lab) "Bilirubin reference ranges and fraction cut-offs differ between labs and methods, so we
       compare against your own lab's range wherever possible."
```

## 0.11 Source & version identifiers
```
config_id: SCL-023   config_version: 1.0
band_id: BIOSENSE_BILIRUBIN_HIGHDOMINANT_BANDS_v1        (Category B; high-dominant total; anchors Q3,Q4,Q5,Q11,Q13,Q23)
reference_frameworks_id: SCL023_BILI_REFRANGES_v1        (adult total ranges 0.1–1.2/0.2–1.3/0.2–1.0; fraction cut-offs; Q3-Q9; never averaged)
fraction_logic_id: SCL023_BILI_FRACTIONATION_v1          (direct/indirect; predominantly indirect → pre-hepatic; direct >0.4/>20–30% → hepatic/biliary; Q7,Q8,Q9)
interpretation_pattern_id: SCL023_BILI_PATTERNS_v1       (five patterns: isolated/hepatocellular/cholestatic/possible-haemolysis/fasting-Gilbert; cross-biomarker + multiple-explanations; R3,R4; Q11,Q14,Q16,Q17)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1   (reused; R2)
confidence_inheritance_ref: SCL016_CONFIDENCE_INHERITANCE_v1 (reused SCL-016/017/018/019/021/022; R9 — distinguishes hepatobiliary vs haem-production patterns)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1   (reused; R3 — ranked patterns)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1     (reused; R4 — ALT/AST/GGT/ALP/Hb/future LDH/future reticulocytes)
high_dominant_precedent_ref: SCL021_GGT_v1               (reused high-dominant structure)
sex_age_preg_aware_ref: SCL004/010/016/017/018/019/022 posture  (reused; R8 — adult scope; neonatal separate)
guideline_disagreement_ref: SCL011/012 posture           (reused; R5 — reference ranges & fraction cut-offs; never averaged)
evolving_science_id: SCL023_BILI_ANTIOXIDANT_EVOLVING_v1 (Category E; antioxidant/CVD-protection; NOT established; Q21,Q22)
safety_rules_id: SCL023_SAFETY_v1                        (S1-S13)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Bilirubin is a yellow pigment produced by the breakdown of haem. <cite index="17-1">Bilirubin is produced by the breakdown of heme, a component mostly derived from the hemoglobin of red blood cells or from other hemoproteins, such as myoglobin, cytochromes, and catalase.</cite> Once formed, it is carried to the liver, taken up, conjugated, and excreted in bile — so it reflects a chain of **production → hepatic processing → biliary excretion**. **[A][Q1]**

The defining feature for interpretation is that a total bilirubin measures the **sum** of two fractions whose
balance points to the mechanism. <cite index="8-1">"Total bilirubin" refers to the total amount of both conjugated and unconjugated bilirubin in a sample; "direct bilirubin" refers to the amount of conjugated bilirubin.</cite> The direct/indirect split is the practical tool: <cite index="4-1">predominantly elevated indirect bilirubin points toward pre-hepatic causes such as hemolysis, Gilbert's syndrome, or inherited disorders of bilirubin conjugation, while predominantly elevated direct bilirubin points toward hepatic injury or bile duct disease.</cite> This is exactly why bilirubin is read **with** its fraction and the wider panel, never alone — <cite index="10-1">total bilirubin is the standard screening value; fractionation (direct vs indirect) is ordered when elevation is confirmed to determine the mechanism.</cite> **[A][Q2][Q8][Q19]**

Bilirubin is also strongly **context-dependent** and usually benign when mildly raised: <cite index="4-1">Gilbert's syndrome deserves special mention as the most common cause of mildly elevated total bilirubin in otherwise healthy adults — a benign genetic condition affecting 5–10% of the population.</cite> A separate note of scope: neonatal bilirubin is its own, higher-range clinical domain and is not part of this adult wellness interpretation. **[A][B2][Q11][Q24]**

- **Reported in:** mg/dL (µmol/L supported; 1 mg/dL = 17.1 µmol/L). **[A][Q3][Q6]**
- **Nature:** haem-metabolism / hepatic-processing / biliary-excretion marker; **high-dominant**; **fractionation/
  pattern-based**; **never in isolation**; **not a diagnosis** **[A][B3]**
- **Direction:** high-dominant (high = production/processing/excretion direction; low not clinically
  significant) **[A][R6][Q23]**
- **Companions:** the direct/indirect **fraction**; ALT (SCL-014), AST (SCL-015), GGT (SCL-021), ALP (SCL-022);
  Haemoglobin (SCL-019), future LDH, future reticulocytes **[A][Q8][Q15]**
- **BioSense role:** a context-first, fraction- and panel-based haem/hepatic/biliary screen (adult scope).

---

# 2. Physiological Function

Bilirubin is the end-product of haem catabolism. When red blood cells are broken down, haem is converted to
**unconjugated (indirect)** bilirubin — fat-soluble and carried in blood bound to albumin. The liver takes it
up and **conjugates** it (via UGT1A1) into water-soluble **conjugated (direct)** bilirubin, which is excreted in
bile. **[A][Q1][Q2]** So the total reflects the balance of three steps — **production** (red-cell breakdown),
**hepatic processing** (uptake/conjugation), and **biliary excretion** — and the fraction that predominates
points to which step is stressed. **[A][Q10]**

Two features define interpretation **[A]**:
- **The fraction carries the mechanism.** A predominantly **indirect** rise implies increased production
  (haemolysis) or reduced conjugation (the benign Gilbert/fasting pattern); a predominantly **direct** rise
  implies impaired hepatic processing or blocked biliary excretion. **[A][Q8]**
- **Bilirubin is strongly context-dependent and high-dominant.** Fasting, illness, alcohol, and some medicines
  transiently raise it; a mild isolated indirect rise is very common and usually benign; and a **low** value is
  not clinically significant. **[A][Q12][Q18][Q23]**

---

# 3. Scientific Background

Three scientific themes shape how BioSense represents Bilirubin. **[A]**

**First, bilirubin means little without its fraction and the panel.** The three mechanisms — <cite index="4-1">excess production of bilirubin from increased red blood cell breakdown (hemolysis), impaired processing by liver cells (hepatocellular disease), or blocked excretion through the bile ducts (cholestasis or obstruction)</cite> — are separated by the fraction: <cite index="4-1">the direction of elevation in the direct and indirect bilirubin fractions is the most practical tool for distinguishing between these mechanisms.</cite> Predominantly direct elevation, <cite index="4-1">above 0.4 mg/dL or more than 20–30% of total, points toward hepatic injury or bile duct disease</cite>, and <cite index="5-1">conjugated levels >1.0 mg/dL (or >50% of total) are commonly caused by gallstones, tumors, inflammation, scarring, or obstruction of the extrahepatic ducts.</cite> BioSense therefore treats bilirubin **plus its fraction and companions** as the unit of interpretation. **[A][Q8][Q9][Q10]**

**Second, mild elevation is common and usually benign — and the reference ranges differ.** <cite index="10-1">Gilbert's syndrome affects approximately 5 to 10% of the Western population and is the most common cause of mildly elevated total bilirubin (typically 1.2 to 3.0 mg/dL) in otherwise healthy individuals.</cite> Its episodes are <cite index="17-1">triggered by a wide range of circumstances such as exercise, fasting, and intercurrent illness.</cite> Meanwhile the adult reference ranges vary by lab and method (0.1–1.2; 0.2–1.3; 0.2–1.0 mg/dL), and <cite index="6-1">jaundice typically becomes visible when total bilirubin exceeds 35–40 µmol/L.</cite> BioSense **presents these frameworks side by side and never averages them.** **[A][Q11][Q12][Q3][Q13]**

**Third, there is a genuine but still-evolving story about mildly elevated bilirubin as an antioxidant.** <cite index="11-1">Unconjugated bilirubin is an endogenous circulating antioxidant, bound to albumin; current evidence indicates mildly elevated bilirubin is associated with protection from cardiovascular disease and all-cause mortality in adults.</cite> BioSense represents this as **evolving, observational science — not established clinical fact**, and never as a reason to want a higher bilirubin. **[A][E][Q21][Q22]**

**The wellness reading — [B]:** bilirubin is a context-first, fraction- and panel-based, high-dominant haem/
hepatic/biliary screen — read with the direct/indirect split, the LFT panel, and the haemolysis companions, with
the plausible patterns ranked rather than one asserted, reference and fraction disagreement shown honestly, mild
elevations fractionated and repeated before they count, no condition named, and the antioxidant story flagged as
evolving.

**An honest boundary — [E]:** ranges and fraction cut-offs are contested and method-dependent, bilirubin is
context-sensitive (fasting/illness/alcohol/medications), and the antioxidant/CVD association is observational
and evolving — so BioSense leans on the fraction and panel and is explicit about confidence. **[E][Q25][Q21]**

---

# 4. Why Bilirubin Matters

**1. It completes the liver panel and localises jaundice. [A][Q10]** With the fraction and the LFT panel,
bilirubin distinguishes pre-hepatic, hepatic, and post-hepatic mechanisms — the difference between a bare number
and an interpretation. **[A]**

**2. It adds the haemolysis dimension. [A][Q14]** A predominantly indirect rise with a low haemoglobin (and, in
future, high LDH/reticulocytes) points to a haem-production pattern — a valuable cross-read with haemoglobin
(SCL-019). **[A]**

**3. Mild elevation is common, benign, and — as evolving science — possibly protective. [A][E][Q11][Q21]** The
fasting/Gilbert-type pattern is common and harmless, and mildly elevated bilirubin is being studied as an
antioxidant associated with cardiovascular protection — useful wellness context, held as evolving. **[A][E]**

**Why BioSense measures it — [C]:** bilirubin is a high-value, fraction-based, high-dominant screen whose meaning
is multi-marker — the ideal case for Context-First interpretation, cross-biomarker intelligence, confidence
inheritance (distinguishing hepatobiliary from haem-production patterns), ranked patterns, and guideline-
disagreement handling, all while never diagnosing Gilbert syndrome, liver disease, a biliary obstruction,
haemolysis, hepatitis, or cancer.

---

# 5. Laboratory Measurement

Bilirubin is measured on an automated analyser (part of the liver-function panel), reported as **total** in
**mg/dL** (or µmol/L), with **direct (conjugated)** measured and **indirect (unconjugated)** calculated as the
difference. **[A][Q2][Q3]**

- **Units.** mg/dL is canonical; µmol/L supported (1 mg/dL = 17.1 µmol/L). Bilirubin is a **mass concentration**,
  not an enzyme activity (unlike ALT/AST/GGT/ALP in U/L). **[A][Q6]**
- **Fractionate on elevation.** Total is the screen; when raised, direct/indirect fractionation is ordered to
  determine the mechanism (direct is not always an exact proxy for conjugated in unclear cases). **[A][Q19]**
- **Read with the panel.** Interpreted with ALT/AST/GGT/ALP (hepatobiliary) and haemoglobin/future LDH/future
  reticulocytes (haem-production) — never in isolation. **[A][Q10][Q15]**
- **Context matters.** Fasting (raises indirect), recent illness, alcohol, medications, and pregnancy are
  context; a mild isolated indirect rise is common and benign. **[A][Q12][Q18]**
- **Scope.** Adult wellness interpretation only; neonatal bilirubin is a separate, higher-range clinical domain.
  **[A][Q24]**
- **Companion panel.** Read with **ALT/AST** (hepatocellular), **GGT/ALP** (cholestatic; SCL-021/022),
  **haemoglobin** (haemolysis; SCL-019), and the future **LDH / reticulocytes**. **[A][Q15]**

---

# 6. Units

- **mg/dL** — standard; **BioSense canonical unit.** **[A/C]**
- **µmol/L** — SI; **1 mg/dL = 17.1 µmol/L.** **[A][Q6]**
- **Bilirubin-specific conversion factor (17.1)** — it is **not** the cholesterol (38.67), triglyceride (88.57),
  creatinine (88.4), glucose (18.0), 25(OH)D (2.496), B12 (0.738), folate (2.266), or Free T4 (12.87) factor,
  and **not** a haemoglobin decimal/molar factor; bilirubin is a **mass concentration**, not an enzyme activity
  (unlike ALT/AST/GGT/ALP, which are U/L) and not a cell count (unlike WBC). **[A][C][Q6]**

BioSense stores the reported total, unit, fraction (direct/indirect), fasting state, and any companions
unchanged, and evaluates the fraction and patterns. **[C]**

---

# 7. Unit Conversion

```
total (µmol/L) = total (mg/dL) × 17.1          [Q6]
total (mg/dL)  = total (µmol/L) ÷ 17.1
(bilirubin-specific mass-concentration factor; NOT an enzyme-activity unit like ALT/AST/GGT/ALP; NOT the lipid/glucose/vitamin/creatinine/thyroid factor)
```
Worked check: total bilirubin 1.2 mg/dL × 17.1 = 20.5 µmol/L. **[A][Q6]**

**Safety rule [D]:** Bilirubin uses its own mass-concentration factor (17.1 mg/dL↔µmol/L); never apply a lipid/
glucose/vitamin/creatinine/thyroid factor, never treat it as an enzyme activity (U/L) or a cell count. A unit-
unknown value is displayed but not interpreted; a pattern read requires the fraction and/or companions; adult
scope only. **[D]**

---

# 8. Measurement Limitations & the Never-In-Isolation Principle  *(Context-First basis — reused SCL-010)*

Bilirubin's defining limitation is that **a total value does not, on its own, reveal its mechanism** — which is
why the Context-First gate (§0.2), the fraction/pattern layer (§0.5), and the ranked-pattern output apply.
**[A][B2]**

## 8.1 Bilirubin needs its fraction and the panel — [A]
A raised total is a starting point; the direct/indirect split, with ALT/AST/GGT/ALP and haemoglobin/LDH/
reticulocytes, localises the mechanism (pre-hepatic vs hepatic vs post-hepatic). Bilirubin is never interpreted
in isolation. **[A][Q8][Q10]**

## 8.2 It is context-sensitive and often benign — [A]
Fasting, illness, alcohol, and medications transiently raise it; a mild isolated indirect rise (fasting/Gilbert-
type) is very common and benign; context and fractionation are essential. **[A][Q12][Q11]**

## 8.3 Ranges & fraction cut-offs are contested — [A]
Adult reference ranges differ by lab/method (0.1–1.2 / 0.2–1.3 / 0.2–1.0 mg/dL); fraction cut-offs differ
(direct >0.4 mg/dL or >20–30%; conjugated >50%); jaundice threshold varies with pigmentation — shown as
frameworks, never averaged. **[A][Q3][Q8][Q13]**

## 8.4 It is high-dominant; low is not significant — [A]
Only the elevated direction carries a signal; a **low** bilirubin is not clinically significant and is not
flagged. **[A][Q23]**

**How BioSense uses this — [C][D]:** the Context-First gate runs first; bilirubin is banded high-dominant on the
total with the fraction as the pattern layer; the interpretation pattern is emitted only with the fraction/
companions (else screen-level + limited confidence); plausible patterns are **ranked, not asserted**; the
fasting/Gilbert-type, transient-context, and adult-scope nuances are surfaced; the antioxidant story is flagged
as evolving; missing fraction/companions/context sets Context-Required/Reduced confidence; and no condition is
ever named.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010; pattern inheritance via SCL-016/017/018/019/021/022)*

Bilirubin consumes its fraction and companion markers where available. **[A][C]**

- **The direct/indirect fraction — the primary discriminator. [A]** Predominantly indirect → pre-hepatic
  (haemolysis / fasting-Gilbert-type); predominantly direct → hepatic or biliary. This split is the heart of
  bilirubin interpretation. **[A][Q8]**
- **ALT (SCL-014) / AST (SCL-015) — hepatocellular companions. [A]** A mixed rise with raised ALT/AST → a
  hepatocellular-direction pattern. **[A][Q17]**
- **GGT (SCL-021) / ALP (SCL-022) — cholestatic companions. [A]** A direct rise with raised ALP/GGT → a
  cholestatic-direction pattern; bilirubin completes the cholestatic picture that GGT/ALP begin. **[A][Q16]**
- **Haemoglobin (SCL-019) — the haemolysis companion. [A]** An indirect rise with a **low** haemoglobin →
  a possible haem-production (haemolysis) pattern; a valuable cross-read with the haemoglobin pack. **[A][Q14]**
- **Future LDH / future reticulocytes. [A]** Strengthen a haemolysis pattern (high LDH, high reticulocytes, with
  low haptoglobin) — context, routed, not diagnosed. **[A][Q15]**
- **(Context) fasting status, recent illness, alcohol, medications, pregnancy. [A]** Interpretation context that
  moves bilirubin, never something BioSense advises changing beyond general wellness. **[A][Q12][Q18]**

**Cross-biomarker rule [C] (reused R4/R9):** where these are **available**, BioSense consumes them (with the
fraction and confound caveats) to sharpen the read and confidence — and the **inheritance** is precisely how it
distinguishes a **hepatobiliary** pattern (from the LFT companions) from a **haem-production** pattern (from the
haemoglobin/LDH/reticulocyte companions); where **unavailable** — especially the **fraction** (without which
only a screen-level statement is possible) — it records a **confidence limitation** and names what would clarify,
never inventing certainty. **[C][R4][R9]**

---

# 10. Evidence Review

All numbers here are Category **[A]** (except the evolving-science items, flagged **[E]**).

## 10.1 Where the authorities agree
- **Bilirubin is a haem-breakdown product; total = unconjugated (indirect) + conjugated (direct).** **[A][Q1][Q2]**
- **The fraction discriminates: indirect → pre-hepatic; direct → hepatic/biliary.** **[A][Q8]**
- **Three mechanisms: production (haemolysis), hepatic processing, biliary excretion.** **[A][Q10]**
- **Gilbert's (5–10%) is the commonest cause of mild indirect elevation; benign; triggered by fasting/stress/
  illness.** **[A][Q11][Q12]**
- **Bilirubin alone does not diagnose; fractionation is ordered when elevation is confirmed.** **[A][Q19][Q20]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **Adult total reference ranges: 0.1–1.2; 0.2–1.3; 0.2–1.0 mg/dL (0–20.5 µmol/L).** **[A][Q3][Q4][Q5]**
- **Fraction cut-offs: direct >0.4 mg/dL or >20–30% of total; conjugated >1.0 mg/dL or >50%.** **[A][Q8][Q9]**
- **Jaundice threshold: ~35–50 µmol/L (~2–3 mg/dL), varying with pigmentation.** **[A][Q13]**
- **Why:** assays (diazo vs others), populations, and fraction definitions differ, and the jaundice threshold is
  a clinical-visibility estimate. BioSense **presents the differing frameworks and never averages them** (reused
  R5). **[A][Q25]**

## 10.3 Strength of evidence
- **Physiology, fractionation logic, the three mechanisms, Gilbert/fasting pattern, haemolysis companions:
  established.** **[A][Q1][Q8][Q11][Q15]**
- **Reference ranges & fraction cut-offs: established as variation.** **[A][Q3][Q8]**
- **Antioxidant / cardiovascular-protection association of mildly elevated bilirubin: EVOLVING (observational).**
  **[E][Q21][Q22]**
- **Neonatal domain: established as separate/out-of-scope here.** **[A][Q24]**

## 10.4 Intended populations
Thresholds target general **adults** (the neonatal range is separate), with **fasting** and **pregnancy** as
context. BioSense applies them context-first, abstains or routes in cholestatic/haemolysis/hepatocellular
patterns, and reduces confidence where the fraction or companions are unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. Bilirubin is HIGH-DOMINANT (the elevated direction — haem
> production / hepatic processing / biliary excretion — carries the signal; a low value is not clinically
> significant), CONTEXT-GATED, FRACTIONATION/PATTERN-BASED, and NEVER interpreted in isolation: the total is a
> screen whose meaning is set by its DIRECT/INDIRECT fraction and the wider panel, and where several patterns fit
> they are RANKED, not asserted. Adult reference ranges and fraction cut-offs genuinely DIFFER across labs/methods
> and are shown, never averaged. This is the ADULT wellness scope — neonatal bilirubin is a separate clinical
> domain. Never a diagnosis of Gilbert syndrome, liver disease, biliary obstruction, haemolysis, hepatitis, or
> cancer.**

## 11.1 The bilirubin (total) wellness bands (mg/dL; general adult; after context gate; read with fraction + panel)

Bands use an **adult total reference** (ULN_ref default 1.2 mg/dL / 20.5 µmol/L; the lab's own range is preferred
where available; frameworks never averaged). Bilirubin is banded **high-dominant** on the **total**, with the
**direct/indirect fraction** as the pattern layer (§11.4).

| BioSense Wellness Interpretation | Total bilirubin (mg/dL) | Evidence anchor | Wellness meaning (context-first, fraction/pattern-based; no diagnostic label) |
|---|---|---|---|
| **Optimal (Wellness)** | ≤ 1.0 | Healthy-adult range [Q3] | Wellness-optimal zone (most healthy adults 0.3–1.0). |
| **Within Reference** | > 1.0 – ULN_ref | Standard reference [Q3][Q5] | Within the standard adult reference (ULN ~1.2–1.3). |
| **Mild High — Watch** | > ULN_ref – 3.0 | Mild-elevation / Gilbert zone [Q5][Q11] | Mild elevation; very common; often isolated indirect (fasting/Gilbert-type) and benign; fractionate. |
| **Elevated — Flag** | > 3.0 – 5.0 | Clearer elevation [Q8][Q11] | Clearer elevation; fractionate and read the pattern (indirect vs direct). |
| **High — Flag** | > 5.0 – 10.0 | Marked elevation [Q8][Q17] | Marked; resolve the pattern (hepatocellular / cholestatic / haemolysis); route. |
| **Marked High — Flag** | > 10.0 | High elevation [Q8] | Markedly elevated; pattern + prompt review. |

*(High-dominant: no low flag — a low bilirubin is not clinically significant. Read with the direct/indirect
fraction and the panel; the fraction + pattern set the meaning (§11.4). Jaundice becomes visible ~2–3 mg/dL
(~35–50 µmol/L) — a routing cue, not a band boundary. Ranges & fraction cut-offs differ across labs/methods;
shown, never averaged (§11.5). Adult scope — neonatal separate. mg/dL; µmol/L = ×17.1.)*

## 11.2 Scope, sex, pregnancy & reference overlays [A][B]
- **Adult scope:** these bands are for adults. **Neonatal** bilirubin is a separate, higher-range clinical domain
  (physiological neonatal jaundice; kernicterus risk at very high unconjugated levels) and is **not** interpreted
  by these bands. **[A][Q24]**
- **Fasting/pregnancy context:** fasting raises the indirect fraction (a Gilbert-type trigger); pregnancy is
  context — interpret with these, don't over-flag. **[A][Q12]**
- **Sex:** modest differences may exist by lab; use the lab's own range where provided. **[A][Q25]**

## 11.3 How the bands were derived — transparency [B]
- The bands use an **adult total reference** (ULN 1.2 mg/dL default) as the ceiling, a **wellness-optimal** zone
  (≤1.0), a **mild-elevation watch** to 3.0 mg/dL (covering the common, benign Gilbert/fasting range), and a
  graded high side (3–5 elevated; 5–10 high; >10 marked). **[Q3][Q5][Q11]**
- **No number was averaged.** The differing reference-range and fraction-cut-off frameworks are presented
  distinctly (§11.5). **[R5]**
- Bilirubin is **high-dominant**: only the elevated direction carries a signal; there is **no low flag**. **[Q23]**

## 11.4 The interpretation-pattern (fraction + companion) layer (the unit of interpretation) [A][B]
| Bilirubin | Fraction + companion pattern | Pattern hint (NOT a diagnosis) | Anchor |
|---|---|---|---|
| mild total ↑ | isolated (normal ALT/AST/GGT/ALP, no anaemia) | Isolated-elevation pattern; often benign; fractionate | Q11, Q20 |
| ↑ | mixed, + ALT↑/AST↑ | Hepatocellular-direction pattern | Q17 |
| ↑ | DIRECT ↑, + ALP↑/GGT↑ (± pruritus) | Cholestatic-direction pattern | Q16 |
| ↑ | INDIRECT ↑, + low haemoglobin (± high LDH/reticulocytes) | Possible haem-production (haemolysis) pattern | Q14, Q15 |
| mild ↑ | INDIRECT ↑, normal LFTs & Hb, worse with fasting/stress/illness | Fasting / Gilbert-type (benign isolated-indirect) pattern | Q11, Q12 |

The pattern is emitted **only with the fraction and the relevant companions**, inherits the lower input
confidence, **distinguishes hepatobiliary (LFT) from haem-production (Hb/LDH/retics) patterns**, ranks patterns
first, and **names no condition** (§0.5, §12). **[A][B][R4][R9]**

## 11.5 Guideline-disagreement display (reused posture) [B][C]
Where relevant, BioSense shows the differing adult reference ranges (0.1–1.2 / 0.2–1.3 / 0.2–1.0 mg/dL), the
fraction cut-offs (direct >0.4 mg/dL or >20–30%; conjugated >50%), and the jaundice threshold as distinct
frameworks — **never averaged** (CAV10). **[B][C][R5][Q3][Q8]**

## 11.6 Context-gate precedence [D]
No band or pattern is emitted as a verdict without the Context-First evaluation (§0.2). The fraction, the LFT/
haemolysis companions, fasting status, and adult scope are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general adult**, read **with the fraction and the panel**. Reference ranges and fraction cut-
offs are contested and method-dependent; bilirubin is context-sensitive (fasting/illness/alcohol/medications);
neonatal values are out of scope; and the antioxidant/CVD association is evolving. **[E][Q25][Q21]**

---

# 12. Interpretation Framework — CONTEXT-FIRST + NEVER-IN-ISOLATION (reused SCL-010 cross-biomarker + SCL-016/017/018/019/021/022 inheritance)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010), cross-biomarker
> intelligence (SCL-010), and confidence inheritance (SCL-016/017/018/019/021/022), and follows the frozen
> fraction/panel pattern logic (GGT/SCL-021, ALP/SCL-022) and high-dominant precedent (SCL-021). Bilirubin is
> interpreted as a context-dependent, fraction- and panel-based haem/hepatic/biliary screen, never a diagnosis,
> and never in isolation. No new methodology is introduced.** **[C][R1][R4][R9]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1][B3]
   gather context (fraction: direct/indirect; companions: ALT (SCL-014), AST (SCL-015), GGT (SCL-021), ALP
   (SCL-022) [hepatobiliary]; Haemoglobin (SCL-019), future LDH, future Reticulocyte Count [haem-production];
   context: fasting status, recent illness, alcohol, medications, pregnancy; scope: adult).           [R4]
   → if material context changes meaning, interpret WITHIN it; if fraction/companions unavailable, record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit mg/dL [µmol/L]; result final) → else display-only/flag.
STEP 2 — ELIGIBILITY / SCOPE: adult → apply bands; neonatal → separate clinical domain, do NOT apply adult bands, route; fasting/pregnancy → context. [Q24,Q12]
STEP 3 — CONFIDENCE (four-level + inheritance): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED; pattern inherits lower of bilirubin/companions; distinguishes hepatobiliary vs haem-production (§0.6). [R2,R9]
STEP 4 — BAND: assign high-dominant total band (§11.1). [R6]
STEP 5 — FRACTION + PATTERN: if fraction/companions present, resolve the pattern (§11.4 — isolated / hepatocellular / cholestatic / possible-haemolysis / fasting-Gilbert-type); else screen-level statement. [R4]
STEP 6 — RANKED PATTERNS: elevated with ≥2 plausible patterns → Possible Explanation A/B/C, ranked (the five patterns). [R3]
STEP 7 — FRACTIONATE + REPEAT: new mild elevation → fractionate + suggest REPEAT (note fasting state); an isolated indirect rise is common. [Q11,Q19]
STEP 8 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); evolving-science framing where relevant; route where appropriate; NO diagnosis. [R7]
```

**Core interpretive stance [B]:** bilirubin is a context-first, fraction- and panel-based, high-dominant haem/
hepatic/biliary screen — read with the direct/indirect split, the LFT panel, and the haemolysis companions, with
the plausible patterns ranked rather than one asserted, reference and fraction disagreement shown honestly, mild
elevations fractionated and repeated before they count, no condition named, and the antioxidant story held as
evolving. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy + inheritance — reused SCL-010 + SCL-016/017/018/019/021/022)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear total AND fraction available AND key companions (LFT and/or Hb) AND no unexcluded confound | Band + pattern + ranked patterns normally |
| **REDUCED** | Single value / near a boundary / fraction-or-context uncertain / minor context | Band cautiously; prefer fractionate + repeat; name the reducer (CAV4/CAV5) |
| **CONTEXT_REQUIRED** | Elevated total with no fraction and/or no companions (pattern unresolvable) OR unexcluded confound (fasting / recent illness / new medication) | Screen-level + request fractionation/LFT/Hb/repeat; name needed context (CAV3/CAV6) |
| **ABSTAINED** | Significant uncertainty / conflicting signals / suspected cholestatic or haemolysis pattern / hepatocellular pattern with high ALT/AST | Explained abstention; route |

**Inheritance (reused SCL-016/017/018/019/021/022):** the bilirubin+companion pattern verdict inherits the
**lower** confidence of its inputs, and this is exactly **how a hepatobiliary pattern (LFT companions) is
distinguished from a haem-production pattern (haemoglobin/LDH/reticulocyte companions)**; if the fraction/
companions are unavailable, bilirubin is limited to a **screen-level** statement, not asserted. **[R9]**

Reducers/context inputs: fraction absent (mechanism unresolvable) [Q8]; companions absent (no pattern) [Q15];
single value / context sensitivity (fasting/illness) [Q12]; new medication / alcohol [Q18]; near a band boundary.
**[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant uncertainty
**may** justify abstention; a new mild elevation prefers a **fractionate + repeat** framing (fasting-state
noted). **[R2]**

---

# 14. Wellness Interpretation  *(context-first, fraction/pattern-based, high-dominant, ranked patterns)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate. Wellness, not medical;
**never a diagnosis**; always **read with the fraction & the liver/haemolysis picture**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal (Wellness) / Within Reference** *(≤ ULN; normal companions).*
  "Your bilirubin — a normal product of red-cell breakdown that your liver clears — sits in a favourable range,
  and read with your other liver markers there's nothing here that stands out. It's a single snapshot, but this
  looks settled." **[B]**
- **BioSense Wellness Interpretation: Mild High — Watch** *(ULN–3.0).* "Your total bilirubin is mildly raised.
  On its own that's very common and usually harmless — most often it's the benign 'indirect' pattern that comes
  and goes with fasting, stress or a minor illness. Splitting it into its direct and indirect fractions, reading
  it with your liver markers, and repeating it is the sensible next step." Calm; **no diagnosis** (CAV5, CAV8).
  **[B][D][Q11]**
- **BioSense Wellness Interpretation: Elevated / High / Marked High — Flag** *(>3.0).* "This is more clearly
  raised. Because several patterns can lift bilirubin, we read it with its fraction and your ALT, AST, GGT, ALP
  and blood count, and we've noted the more likely patterns for your context — an isolated/benign pattern, a
  hepatocellular pattern, a cholestatic pattern, or a possible red-cell-breakdown pattern — rather than pointing
  to one. A repeat with fractionation and the full panel is sensible." Constructive; **no diagnosis** (CAV3,
  CAV6, CAV7). **[B][D]**
- **BioSense Wellness Interpretation: cholestatic (direct↑ + ALP/GGT↑) / hepatocellular (high ALT/AST) /
  possible haemolysis (low Hb) / visible jaundice.** Calm routing: "This pattern is worth a prompt, unhurried
  conversation with a healthcare professional, who can look at the fuller picture. The numbers alone don't
  diagnose anything." **No alarm, no diagnosis** (CAV7). **[B][D][Q16][Q14]**
- **Fasting / Gilbert-type context.** "A mild rise in the indirect fraction, especially after fasting, stress or
  a minor illness, is a very common and benign pattern — it tends to come and go." Reassure + fractionate
  (CAV8). **[B][D][Q11][Q12]**
- **Evolving antioxidant science.** "There's growing but still-evolving research suggesting mildly raised
  bilirubin may act as an antioxidant with possible cardiovascular associations — this is emerging observational
  science, not an established benefit, and not a reason to want a higher level." (CAV9). **[B][E][Q21]**

**Fraction/pattern modifier:** where the fraction and companions are available, present the pattern (isolated /
hepatocellular / cholestatic / possible-haemolysis / fasting-Gilbert-type) as **context**, distinguishing
hepatobiliary from haem-production; where the fraction/companions are absent, give a **screen-level** statement
and name that the fraction & panel complete the picture (CAV3). The pattern confidence **inherits the lower**
input (§0.6). **[D][R4][R9]**

**Ranked-patterns modifier (reused):** on any elevated bilirubin with ≥2 plausible patterns, present **Possible
Explanation A/B/C** ordered by evidence + context (the five patterns) — never a single certain cause, never a
named condition. **[D][R3]**

**Scope modifier:** adult interpretation only; a neonatal context is routed to the separate clinical domain,
never read against adult wellness bands. **[D][Q24]**

**Context-unavailable modifier:** where the **fraction** or **companions** (or fasting/illness/medication
context) are missing, state the confidence limitation and name what would clarify (CAV3/CAV4); never invent
certainty (S8). **[D][R4]**

Every interpretation pairs the band and pattern with context guidance (§17) and the mandatory caveats (§0.10).
**None diagnoses Gilbert syndrome, liver disease, a biliary obstruction, haemolysis, hepatitis, or cancer, none
asserts a single cause, none treats a BioSense band or pattern as a medical boundary, and none presents the
evolving antioxidant association as an established benefit.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for bilirubin).** Elevated total with **no fraction** and/or **no companions**
  (pattern unresolvable) or an unexcluded confound (fasting / recent illness / new medication) → screen-level +
  request fractionation/LFT/Hb/repeat; state what's needed (§13, CAV3/CAV6). **[D][R2]**
- **15.2 Neonatal (out of scope).** Neonatal bilirubin is a separate, higher-range clinical domain
  (physiological neonatal jaundice; kernicterus risk) — do **not** apply adult wellness bands; route. **[D][Q24]**
- **15.3 Fasting / Gilbert-type.** A mild isolated indirect rise, worse with fasting/stress/illness, is common
  and benign; fractionate and reassure; never label "Gilbert's". **[D][Q11][Q12]**
- **15.4 Cholestatic pattern (direct↑ + ALP/GGT↑).** → biliary/cholestatic-pattern context that warrants
  professional review; route, don't diagnose. **[D][Q16]**
- **15.5 Possible haemolysis pattern (indirect↑ + low Hb).** → haem-production-pattern context (read with
  haemoglobin/SCL-019, future LDH/reticulocytes); route, don't diagnose. **[D][Q14]**
- **15.6 Hepatocellular pattern (mixed↑ + high ALT/AST).** → hepatocellular-pattern context; route. **[D][Q17]**
- **15.7 On bilirubin-affecting context.** Fasting, alcohol, and some medications move bilirubin → context;
  never advise changing a prescribed medicine. **[D][Q18]**
- **15.8 Red flags.** Markedly elevated bilirubin; visible jaundice; a cholestatic pattern; a hepatocellular
  pattern with high ALT/AST; a possible-haemolysis pattern with low haemoglobin → calm prompt healthcare review
  regardless of band. **[D][Q13][Q16][Q14]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Fraction & trend beat a single total. [A]** Because bilirubin is context-sensitive, the direct/indirect
  split and a within-person trend are more informative than one total. **[Q8][Q12]**
- **Fractionate + repeat mild elevations. [A]** A new mild elevation is fractionated and repeated (fasting-state
  noted) before it means anything; an isolated indirect rise is common and benign. **[Q11][Q19]**
- **Fasting/illness fluctuation. [A]** Gilbert-type indirect bilirubin rises with fasting/stress/illness and
  settles afterwards — an expected fluctuation, not a trend to alarm over. **[Q12]**
- **Pattern direction matters. [A]** A rising direct fraction with raised ALP/GGT (cholestatic), or an indirect
  rise with a falling haemoglobin (possible haemolysis), is what warrants review — distinct from a stable mild
  indirect value. **[Q16][Q14]**
- **Context/abstained points. [C]** Fasting, recent illness, new medications, alcohol, and context-required
  (no-fraction) points are tagged so they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For bilirubin, the first tier is **the fraction and the panel**, then context-appropriate lifestyle. **[A]/[B]**

## 17.1 Fraction & panel first [A][Q8][Q15]
Where bilirubin is elevated, the clarifying steps are the **fraction** (direct/indirect), the **LFT panel**
(ALT/AST/GGT/ALP), the **haemolysis markers** (haemoglobin, and future LDH/reticulocytes), the **context review**
(fasting, recent illness, alcohol, medications), and — for a new mild elevation — a **fractionate + repeat**
(fasting-state noted). **[A]**

## 17.2 Liver-wellness context [A][Q12][Q18]
General liver-wellness — moderating **alcohol**, a **healthy weight**, **hydration**, and recognising that
**fasting or a minor illness** can transiently raise the indirect fraction — is relevant context; a mild
isolated indirect elevation is common and benign. Framed as **education, not treatment**. **[A]**

## 17.3 Evolving-science context [E][Q21][Q22]
The emerging research that mildly elevated bilirubin may act as an **antioxidant** with **possible
cardiovascular associations** is genuine but **evolving observational science** — represented as such, never as
an established benefit and never as a reason to want a higher bilirubin. **[E]**

## 17.4 Framing rules [B][D]
Fraction and panel first (fractionate + repeat for new mild elevation); **no specific treatments, medication
changes, or doses** (S9); reference-range and fraction-cut-off disagreement shown, never averaged; the evolving
antioxidant story clearly labelled evolving (never a health claim); calm, evidence-informed language; never a
diagnosis; adult scope; the fraction/panel-paired (CAV2), screen-only (CAV3), fasting/Gilbert-type (CAV8),
evolving-science (CAV9), and reference (CAV10) caveats attached where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain that bilirubin is a marker of haem metabolism, hepatic processing and biliary
excretion read **with** its fraction and the panel; run the context-first evaluation; assign the high-dominant
total band; resolve the interpretation pattern (with inherited confidence, distinguishing hepatobiliary from
haem-production) when the fraction/companions are present; integrate ALT/AST/GGT/ALP and haemoglobin/future LDH/
future reticulocytes; present **ranked** patterns for an elevated value; recommend fractionation + repeat; name
which companions would clarify; present the antioxidant association as evolving science; express context-
required/abstention respectfully.

The AI layer **must never**:
- emit "Gilbert syndrome/Gilbert's", "liver disease", "cirrhosis", "hepatitis", "biliary obstruction/cholestasis", "gallstones", "PBC/PSC", "haemolysis/haemolytic anaemia", or "cancer" as a diagnosis — even to deny one (S1)
- interpret bilirubin in isolation, or emit an interpretation-pattern read without the fraction and/or relevant companions (S2, S3)
- assert a single pattern/cause for an elevated bilirubin when ≥2 are plausible — rank them (S4)
- apply adult wellness bands to a neonatal value — neonatal bilirubin is a separate clinical domain (S5)
- flag or over-interpret a LOW bilirubin (high-dominant; low is not clinically significant) (S6)
- load interpretation onto a new/isolated mild elevation without fractionation and a repeat (S7)
- treat an isolated indirect (fasting/Gilbert-type) elevation as significant disease (S6, S7)
- recommend treatments, medication changes, or doses; produce a liver/haemolysis-risk % (S9)
- invent certainty when the fraction/companions are unavailable — state the limitation and inherit confidence (S8)
- fail to route red flags (markedly elevated; visible jaundice; cholestatic pattern; hepatocellular pattern with high ALT/AST; possible-haemolysis pattern with low haemoglobin) calmly and promptly (S10)
- present a BioSense band, range, fraction cut-off, jaundice threshold, or pattern as a medical/diagnostic boundary (S11)
- average contested reference ranges or fraction cut-offs (S12)
- present the evolving antioxidant / cardiovascular association as established clinical fact, a health claim, or a reason to raise bilirubin (S13)

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any liver, biliary,
haemolytic, or malignant condition is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes patterns,
  never names Gilbert syndrome/liver disease/biliary obstruction/haemolysis/hepatitis/cancer (S1). **[D][R7]**
- **Never-in-isolation honesty.** Bilirubin is presented as a screen whose meaning depends on the fraction and
  the panel; pattern reads only with companions, else screen-level + inherited confidence (S2, S3, CAV2, CAV3).
  **[D][B2]**
- **Ranked, not asserted.** Where several patterns fit, they are ranked by evidence + context, never reduced to
  one (S4, CAV6). **[D][R3]**
- **Adult scope.** Neonatal bilirubin is a separate clinical domain; adult wellness bands are never applied to
  neonatal values (S5). **[D][Q24]**
- **High-dominant.** A low bilirubin is not clinically significant and is not flagged (S6). **[D][Q23]**
- **Fractionate-first + benign-mild reassurance.** New mild elevation → fractionate + repeat; an isolated
  indirect (fasting/Gilbert-type) elevation is very common and benign (S7, CAV5, CAV8). **[D][Q11]**
- **Calm red-flag routing.** Markedly elevated, visible jaundice, cholestatic pattern, hepatocellular pattern
  with high ALT/AST, or possible-haemolysis pattern with low haemoglobin → prompt, unhurried review; never
  emergency-diagnose (S10, CAV7). **[D][Q16][Q14]**
- **Evolving science handled honestly.** The antioxidant/CVD association is represented as evolving observational
  science, never an established benefit or a reason to want a higher bilirubin (S13, CAV9). **[D][E][Q21]**
- **No treatment/medication guidance.** Never advise changing a prescribed medicine; educate + refer (S9). **[D]**
- **Missing fraction/companions stated, not invented** (S8). **[D][R4]**
- **Correct unit handling.** mg/dL with the bilirubin-specific 17.1 mg/dL↔µmol/L factor (a mass concentration,
  not an enzyme activity, not a cell count); pattern requires the fraction/companions. **[D][Q6]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. Bilirubin is **markedly elevated** or there is **visible jaundice**. **[Q13]**
2. A **cholestatic pattern** (direct↑ + ALP/GGT↑) is present. **[Q16]**
3. A **hepatocellular pattern** (bilirubin with high ALT/AST) is present. **[Q17]**
4. A **possible-haemolysis pattern** (indirect↑ + low haemoglobin) is present. **[Q14]**
5. A mild elevation **persists** after fractionation and a repeat, or the picture is unclear. **[Q19]**
6. The user **asks a medical/medication question** (S9). **[D]**

All suggestions are wellness-framed, non-urgent (unless red flags), non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-023 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for total bilirubin (mg/dL [µmol/L]) and
  its **direct/indirect fraction** where available, plus sex, age (adult scope), pregnancy, and fasting-status
  metadata, and — as interpretation inputs — **ALT (SCL-014), AST (SCL-015), GGT (SCL-021), ALP (SCL-022)**
  [hepatobiliary] and **haemoglobin (SCL-019), the future LDH and future reticulocyte count** [haem-production],
  plus declared context (recent illness, alcohol, medications). **[R4]**
- **Supplies (as CSL bindings):** the high-dominant total bilirubin bands (Category B), the **fraction +
  interpretation-pattern layer** (the five patterns), the reused Context-First gate, the reused four-level
  confidence hierarchy **with inheritance** (distinguishing hepatobiliary vs haem-production), the reused ranked
  multiple-explanations output, the reused cross-biomarker consumption (with graceful degradation to a screen-
  level read), the reference-range and fraction-cut-off disagreement display, the fasting/Gilbert-type and
  transient-context handling, the adult-scope boundary, the evolving-antioxidant-science labelling, safety rules,
  context guidance, and narrative templates — each with value + source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, cross-biomarker intelligence, the
  confidence hierarchy, and the multiple-explanations output (all frozen from SCL-010); **confidence inheritance
  (SCL-016/017/018/019/021/022)** for the pattern layer (distinguishing hepatobiliary from haem-production); the
  **high-dominant structure (SCL-021)**; sex/age/pregnancy-aware banding (SCL-004/010/016/017/018/019/022); the
  guideline-disagreement posture (SCL-003/011/012); and the diagnostic-adjacency discipline (SCL-002/009/011/012/
  014/015/016/017/018/019/021/022). **The never-in-isolation, fraction-and-panel interpretation is represented
  within cross-biomarker intelligence + inheritance — the same pattern logic already built for GGT/ALP — not as
  a new methodology.** **[C][R1][R4][R9]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (the fraction + panel set the pattern,
  the pattern inherits confidence — never averaged into a single verdict; contested reference ranges & fraction
  cut-offs never averaged; bilirubin never interpreted in isolation; neonatal values never read against adult
  bands; the antioxidant association never presented as established).
- **Uses the correct unit handling** (mg/dL; µmol/L = ×17.1; a mass concentration, not an enzyme activity or a
  cell count) — a per-analyte configuration.
- **Score contribution:** bilirubin contributes to a **liver / haem-wellness** context as an adult-scope,
  context-gated, fraction/panel-based input — the interpretation pattern (governed by inheritance) as the
  headline and bilirubin alone as a screen-level signal — with elevated values expressed as ranked-pattern
  context rather than a verdict; context-required/abstained values do not contribute a definite verdict; the
  evolving antioxidant association is not scored as a benefit. Any weighting is a Category [C] product decision.
  **[C]**

---

# 22. Medication, Fasting & Exposure Context (educational only)

Educational context only; BioSense does not instruct on treatment, dose, or medication changes (S9). **[D]**
- **Fasting:** raises the indirect fraction (a Gilbert-type trigger) — a common, benign transient effect. **[A][Q12]**
- **Alcohol / a high dose:** can temporarily stress the liver and raise total bilirubin — context, not a
  diagnosis. **[A][Q18]**
- **Medications:** some medicines raise bilirubin (by various mechanisms) — context, never a prompt to stop a
  prescribed medicine. **[A][Q18]**
- **Recent illness / exercise / dehydration:** Gilbert-type triggers for a mild indirect rise. **[A][Q12]**
- **Evolving science:** mildly elevated bilirubin as an antioxidant with possible cardiovascular associations —
  emerging observational science, not a benefit to act on. **[E][Q21][Q22]**
- Any medication, alcohol, or exposure question → educational context + suggestion to speak with a healthcare
  professional; BioSense never advises starting, stopping, or changing a medication. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Bilirubin needs its fraction and the panel. [E]** Alone it is a screen; the fraction + pattern + confidence
   inheritance handle this. **[Q8][Q20]**
2. **Reference ranges & fraction cut-offs are contested. [E]** Method-dependent; shown, never averaged. **[Q3][Q8]**
3. **It is context-sensitive. [E]** Fasting, illness, alcohol, medications move it; fractionation + repeat
   mitigate. **[Q12][Q18]**
4. **Mild elevation is usually benign. [E]** The fasting/Gilbert-type indirect pattern is common and harmless. **[Q11]**
5. **The antioxidant / CVD-protection association is EVOLVING. [E]** Observational; represented as evolving
   science, never an established benefit or a target. **[Q21][Q22]**
6. **Neonatal bilirubin is out of scope. [E]** A separate, higher-range clinical domain. **[Q24]**
7. **Companion/fraction availability is data-dependent. [E]** Without the fraction/panel, only a screen-level
   statement is possible; the pattern degrades to a confidence limitation, not certainty. **[R4][R9]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**; fraction/
panel-based; context-first; high-dominant; ranked patterns; fractionate + repeat; evolving science labelled;
adult scope). **[B]/[D]**
(Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL_WELLNESS / WITHIN_REFERENCE (<= ULN ; normal companions)
"Your total bilirubin is {value} mg/dL — a favourable range — and read with your other liver markers there's
 nothing here that stands out. It's a single snapshot, but this looks settled."  +CAV1 +CAV2

TEMPLATE: MILD_HIGH_WATCH (ULN–3.0)
"Your total bilirubin is {value} mg/dL — mildly raised. On its own that's very common and usually harmless:
 most often it's the benign 'indirect' pattern that comes and goes with fasting, stress or a minor illness.
 Splitting it into its direct and indirect fractions, reading it with your liver markers, and repeating it is
 the sensible next step."  +CAV1 +CAV2 +CAV5 +CAV8

TEMPLATE: ELEVATED / HIGH / MARKED_HIGH_FLAG (>3.0)
"Your total bilirubin is {value} mg/dL — more clearly raised. Because several patterns can lift it, we read it
 with its fraction and your ALT, AST, GGT, ALP and blood count, and here are the more likely patterns for your
 context rather than one: {ranked A/B/C}. A repeat with fractionation and the full panel is sensible."
 +CAV1 +CAV2 +CAV3 +CAV6

TEMPLATE: RED_FLAG (cholestatic direct↑+ALP/GGT↑ ; hepatocellular high ALT/AST ; possible haemolysis low Hb ; visible jaundice — CALM ROUTING)
"This pattern is worth a prompt, unhurried conversation with a healthcare professional, who can look at the
 fuller picture. The numbers alone don't diagnose anything."  +CAV1 +CAV2 +CAV7

MODIFIER: FRACTION_PATTERN (fraction + companions present) →
 "With its fractions and your panel, the pattern reads as {isolated/benign | hepatocellular | cholestatic |
  possible red-cell-breakdown (haemolysis) | fasting/indirect} context — a hint, not a diagnosis, read with your
  wider picture."  +CAV2

MODIFIER: SCREEN_ONLY (no fraction/companions) →
 "On its own, a raised total bilirubin doesn't say why. Splitting it into direct and indirect and reading it
  with your liver panel and blood count is what turns it into a fuller picture, so we'd interpret this more
  confidently with them."  +CAV3

MODIFIER: RANKED_PATTERNS (elevated, ≥2) →
 "Possible patterns, most-to-least likely for your context: A {…}, B {…}, C {…} — best confirmed with a professional."  +CAV6

MODIFIER: FASTING_GILBERT → "A mild rise in the indirect fraction, especially after fasting, stress or a minor illness, is a very common and benign pattern that tends to come and go."  +CAV8
MODIFIER: EVOLVING_SCIENCE → "There's growing but still-evolving research suggesting mildly raised bilirubin may act as an antioxidant with possible cardiovascular associations — emerging observational science, not an established benefit, and not a reason to want a higher level."  +CAV9
MODIFIER: REFERENCE → "Bilirubin reference ranges and fraction cut-offs differ between labs and methods, so we compare against your own lab's range."  +CAV10
```

**Absolute rules:** no template diagnoses Gilbert syndrome/liver disease/biliary obstruction/haemolysis/
hepatitis/cancer, asserts a single cause, emits a pattern read without the fraction/companions, interprets
bilirubin in isolation, applies adult bands to a neonatal value, flags a low bilirubin, treats a band/fraction/
pattern as a diagnostic boundary, presents the antioxidant association as established, alarms, or averages
reference ranges. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, normal panel. [illustrative]**
```
Input: total bilirubin 0.7 mg/dL (adult), ALT/AST/GGT/ALP normal.
Band: OPTIMAL_WELLNESS | Pattern: none | Confidence: STANDARD
Narrative: OPTIMAL +CAV1+CAV2.  [Q3]
```

**Example 2 — Mild elevation, indirect predominant (fasting/Gilbert-type). [illustrative]**
```
Input: total 1.9 mg/dL, indirect predominant, normal ALT/AST/GGT/ALP & Hb, fasted sample.
Band: MILD_HIGH_WATCH | Pattern: fasting/Gilbert-type (benign isolated-indirect) | Confidence: REDUCED→repeat
Narrative: MILD +CAV8 (fasting/indirect, benign) ; fractionate + repeat +CAV5 ; NO "Gilbert's" label.  [Q11,Q12,S1]
```

**Example 3 — Elevated total, no fraction. [illustrative]**
```
Input: total 4.2 mg/dL, no fraction, no LFT/Hb.
Band: ELEVATED_FLAG | Pattern: NOT resolvable (no fraction/companions) | Confidence: CONTEXT_REQUIRED
Narrative: screen-only +CAV3 ; request fractionation + panel ; +CAV6 ; NO diagnosis.  [Q19,R9,S3]
```

**Example 4 — Direct↑ with ALP/GGT↑ (cholestatic). [illustrative]**
```
Input: total 3.5 mg/dL, direct predominant, ALP & GGT raised.
Band: HIGH_FLAG + pattern (cholestatic) | Confidence: STANDARD→route
Narrative: RED_FLAG calm review +CAV7 ; cholestatic-direction context (read with ALP/GGT, SCL-022/021) ; NO "biliary obstruction" diagnosis.  [Q16,S10]
```

**Example 5 — Indirect↑ with low haemoglobin (possible haemolysis). [illustrative]**
```
Input: total 3.0 mg/dL, indirect predominant, haemoglobin low.
Band: MILD/ELEVATED + pattern (possible haemolysis) | Confidence: STANDARD→route
Narrative: haem-production-direction context (read with Hb/SCL-019, future LDH/retics) +CAV7 ; NO "haemolysis" diagnosis.  [Q14,Q15]
```

**Example 6 — Low bilirubin. [illustrative]**
```
Input: total 0.2 mg/dL (adult).
Band: within optimal (high-dominant: low not flagged) | Confidence: STANDARD
Narrative: no low-flag ; low bilirubin not clinically significant ; NO workup implied.  [Q23,S6]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-021 (GGT) / SCL-022 (ALP)** — the cholestatic companions; bilirubin completes the cholestatic picture
  (direct↑ + ALP/GGT↑) that GGT/ALP begin; source of the reused high-dominant (GGT) and fraction/panel pattern
  (GGT/ALP) logic.
- **SCL-014 (ALT) / SCL-015 (AST)** — hepatocellular companions; a mixed rise with high ALT/AST → hepatocellular
  pattern.
- **SCL-019 (Haemoglobin)** — the haemolysis companion; an indirect rise with a low haemoglobin → a possible
  haem-production pattern; and precedent for two-sided/context-first banding.
- **Future LDH / future reticulocyte count** — strengthen the haemolysis pattern (high LDH, high reticulocytes,
  low haptoglobin).
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, cross-biomarker
  intelligence, four-level confidence hierarchy, and multiple-explanations output.
- **SCL-016 (Creatinine + eGFR) / SCL-017 (TSH) / SCL-018 (Free T4)** — precedent for the reused confidence
  inheritance.
- **SCL-011 (Vitamin D) / SCL-012 (B12)** — precedent for guideline-disagreement / multi-framework display.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the Q-series IDs in §0 and
> the body. Developers finalising the pack should confirm exact page/table locators against the primary sources
> where required.

**Definition, fractions, ranges, mechanisms (Category A anchors)**

1. **Cleveland Clinic (Bilirubin).** — *total bilirubin 0.2–1.3 mg/dL (children & adults); conjugated (direct)
   high if the body struggles to clear it (biliary/gallstone disease); conditions affecting the liver's
   processing raise both types; something temporarily stressing the liver (a new medicine, a high dose of
   alcohol) can raise total bilirubin; an ALP/bilirubin test alone cannot diagnose (Q3, Q17, Q18, Q20).*
2. **MDTools (Bilirubin Levels).** — *normal total 0.1–1.2 mg/dL; 1 mg/dL = 17.1 µmol/L; direct-vs-indirect
   points to pre-hepatic (production) / hepatic (conjugation) / post-hepatic (excretion); Gilbert's 5–10%, mild
   fluctuating indirect (1–4 mg/dL), worsened by fasting/stress/illness, benign; haemolytic anaemias (sickle
   cell, spherocytosis, G6PD, autoimmune) raise unconjugated; low bilirubin generally not clinically significant
   (Q3, Q6, Q8, Q10, Q11, Q14, Q23).*
3. **HealthMatters.io (Total Bilirubin).** — *elevated total (>~1.2 mg/dL) reflects hemolysis, hepatocellular
   disease, or cholestasis/obstruction; direct/indirect direction is the practical discriminator; direct >0.4
   mg/dL or >20–30% of total → hepatic/bile-duct; Gilbert's 5–10% benign; most healthy adults 0.3–1.0; optimal
   0–1.2 mg/dL (0–20.52 µmol/L); mild 1.2–3.0 common/benign (Q4, Q5, Q8, Q10, Q11).*
4. **Lamkin Clinic (Total Bilirubin).** — *direct elevation → hepatocellular or biliary; indirect → haemolysis
   or impaired conjugation (Gilbert's); total is the screening value, fractionation ordered when confirmed;
   Gilbert's 5–10%, typically 1.2–3.0 mg/dL, benign (Q8, Q11, Q19).*
5. **Lola Health (Bilirubin ; Bilirubin Total).** — *total = unconjugated + conjugated; fraction distinguishes
   pre-hepatic / hepatic / post-hepatic; jaundice visible >35–40 µmol/L (~35–50); Gilbert's usually 21–70
   µmol/L predominantly unconjugated; haemolysis releases haemoglobin → unconjugated rises; bilirubin a potent
   antioxidant, mildly elevated associated with reduced CVD/cancer risk (evolving) (Q13, Q14, Q16, Q21, Q22).*

**Fractionation, mechanism thresholds, haemolysis, evolving science (Category A / E)**

6. **Medscape (Bilirubin: Reference Range, Interpretation).** — *UCB (indirect) 70–85% of total under
   physiological conditions; direct/conjugated hyperbilirubinaemia = conjugated >1.0 mg/dL (>50% of total) →
   gallstones, tumours, inflammation, scarring, extrahepatic obstruction (Q7, Q9).*
7. **droracle (indirect/unconjugated reference) & PMC11807629 (direct vs conjugated).** — *conjugated fraction
   averages ~3.6% of total in health; unconjugated <20–30% of total as conjugated suggests Gilbert's rather than
   hepatobiliary disease; conjugated >35% indicates true conjugated hyperbilirubinaemia; direct is not an exact
   proxy for conjugated (delta/fractionation in unclear cases) (Q7, Q8, Q19).*
8. **USPTO 6326208 (assay for total & direct bilirubin) & Tietz-based ranges.** — *total = conjugated +
   unconjugated; healthy adult total ~0.2–1.0 mg/dL (~0.0–0.2 conjugated, rest unconjugated); elevated in
   haemolytic disorders, biliary obstruction, cholestasis, hepatitis, cirrhosis, decreased conjugation;
   neonatal unconjugated rises to 4–5 mg/dL (68–85 µmol/L), a separate domain (Q2, Q4, Q24).*
9. **ScienceDirect (Gilbert's Syndrome overview) & PMC6337523 (bilirubin as CV protector).** — *Gilbert's =
   benign non-haemolytic unconjugated hyperbilirubinaemia (UGT1A1 promoter); mildly elevated antioxidant
   capacity; CVD risk/mortality reduced; serum bilirubin 1–5 mg/dL; episodes triggered by exercise, fasting,
   intercurrent illness (Q11, Q12, Q21, Q22).*
10. **PubMed 24761005; PMC9686784; PMC12841692; PMC4174976; USPTO 6720189 (bilirubin antioxidant / CVD / lipid /
    mortality — EVOLVING).** — *unconjugated bilirubin an endogenous circulating antioxidant (albumin-bound);
    mildly elevated bilirubin associated (observational) with protection from CVD, all-cause mortality, kidney
    disease; inverse association with hyperlipidaemia; antithrombotic/anti-inflammatory; mechanisms (PPAR
    signalling, platelet inhibition) proposed — represented as EVOLVING science, not established clinical fact
    (Q21, Q22).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–10; they are BioSense
> Version 1 classifications, high-dominant on the total with the direct/indirect fraction as the pattern layer,
> not attributable to any single reference as a diagnostic threshold, and **do not restate diagnostic labels.**
> The differing adult reference ranges, fraction cut-offs, and jaundice thresholds are shown separately and
> **never averaged**; bilirubin is presented as a fraction- and panel-based screen, never in isolation, never a
> diagnosis of Gilbert syndrome/liver disease/biliary obstruction/haemolysis/hepatitis/cancer; neonatal values
> are out of scope; the pattern is a hint whose confidence inherits the lower input; and the antioxidant /
> cardiovascular association is represented as **evolving observational science, not an established benefit**.

---

# 28. Founder Decisions Required

The Bilirubin methodology reuses frozen BioSense frameworks and represents Bilirubin via the existing Context-
First, cross-biomarker (fraction/panel-based), confidence-inheritance, and guideline-disagreement frameworks,
following the frozen GGT/ALP pattern logic and the high-dominant precedent. Two optional presentation/policy
items remain: **[C][E]**

**D-1 — Confirm the high-dominant total band structure, the fraction pattern layer, and the reference/jaundice
presentation.** SCL-023 bands bilirubin **high-dominant on the total** (Optimal ≤1.0; Within-Reference to
ULN_ref; Mild-High-Watch to 3.0 covering the common benign Gilbert/fasting range; Elevated 3–5; High 5–10;
Marked-High >10 mg/dL; ULN_ref default 1.2, lab's own preferred), with the **direct/indirect fraction as the
pattern layer**, the jaundice threshold (~2–3 mg/dL) shown as a routing cue not a band boundary, and the
differing adult reference ranges and fraction cut-offs shown side by side and never averaged. Confirmation
requested that this high-dominant total + fraction-pattern presentation is the intended default. **Founder
sign-off requested.**

**D-2 — Confirm the fraction/pattern activation, the evolving-science handling, and the adult-scope boundary for
V1.** SCL-023 emits an **interpretation-pattern read only when the fraction and/or the relevant companions are
available** (else a screen-level statement with inherited/limited confidence), uses **confidence inheritance to
distinguish hepatobiliary (ALT/AST/GGT/ALP) from haem-production (haemoglobin/future LDH/future reticulocytes)
patterns**, represents the **antioxidant / cardiovascular-protection association as evolving observational
science** (never an established benefit or a reason to raise bilirubin), and treats **neonatal bilirubin as a
separate clinical domain** out of the adult wellness scope. **Founder decision requested** on whether V1
activates bilirubin now — noting that the cholestatic (GGT/ALP), hepatocellular (ALT/AST), and possible-
haemolysis (haemoglobin) patterns are **activatable immediately** because GGT (SCL-021), ALP (SCL-022), ALT
(SCL-014), AST (SCL-015) and haemoglobin (SCL-019) already exist, with the haemolysis pattern further enriched
when LDH and the reticulocyte count are authored (bilirubin degrades gracefully to a screen-level read whenever
the fraction/companions are absent).

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-023 v1.0**

*Authored on the frozen SCL-001 template and aligned to the frozen liver-panel packs GGT (SCL-021), ALP
(SCL-022), ALT (SCL-014) and AST (SCL-015) and the haemoglobin pack (SCL-019). Every numeric value is either a
cited Category [A] guideline/reference figure or a transparently-labelled Category [B] BioSense wellness
interpretation, with the antioxidant/cardiovascular association explicitly held as Category [E] evolving science.
No value was fabricated; every Category [A] number was retrieved and verified during authoring and traces to
§27. Bilirubin reuses frozen BioSense methodology throughout — the Context-First Interpretation Framework,
cross-biomarker intelligence, the four-level confidence hierarchy, and the multiple-explanations output (all from
SCL-010), confidence inheritance (SCL-016/017/018/019/021/022, for the fraction/pattern layer, distinguishing
hepatobiliary from haem-production patterns), the high-dominant structure (SCL-021), sex/age/pregnancy-aware
banding (SCL-004/010/016/017/018/019/022), the guideline-disagreement posture (SCL-003/011/012), and the
diagnostic-adjacency discipline (SCL-002/009/011/012/014/015/016/017/018/019/021/022) — introducing only
Bilirubin-specific scientific content (the thresholds and their high-dominant structure; the mg/dL and µmol/L
units with the 17.1 factor; the direct/indirect fractionation logic; the five interpretation patterns; the
reference-range and fraction-cut-off disagreements; the jaundice threshold; the fasting/Gilbert-type and
transient-context nuances; the haemolysis-companion layer; the evolving antioxidant/cardiovascular-protection
science; and the adult-scope, neonatal-separate boundary). Bilirubin is represented as a marker of haem
metabolism, hepatic processing and biliary excretion — a context-first, fraction- and panel-based screen whose
elevated value requires biological context, never interpreted in isolation, and never a diagnosis of Gilbert
syndrome, liver disease, biliary obstruction, haemolysis, hepatitis, or cancer. No new methodology was required;
all structure remains consistent with SCL-001 through SCL-022.*
