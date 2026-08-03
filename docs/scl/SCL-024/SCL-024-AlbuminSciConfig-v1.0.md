# SCL-024 — ALBUMIN
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. Albumin is a genuinely two-sided (low-dominant), context-first, long-half-life plasma protein reflecting protein status, hepatic synthetic function, hydration, inflammation, and chronic health — interpreted via the hs-CRP distinction and the wider liver/kidney/inflammation panel using the existing Cross-Biomarker Intelligence, Confidence Hierarchy, Confidence Inheritance, and Guideline-Disagreement frameworks. Never interpreted in isolation. Low albumin requires biological context; high albumin is primarily relative dehydration unless evidence suggests otherwise. Never a diagnosis of liver failure, nephrotic syndrome, malnutrition, chronic inflammatory disease, or cancer. No new methodology introduced.*

**Document ID:** SCL-024
**Biomarker:** Albumin (serum) — protein-status / hepatic-synthetic / hydration / inflammation / chronic-health marker; genuinely two-sided (low-dominant); context-first; pattern-based; sex/age/pregnancy-aware
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 3 August 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template, and aligned to the frozen two-sided packs Creatinine (SCL-016), Haemoglobin (SCL-019) and ALP (SCL-022), the pattern-layer packs GGT (SCL-021), ALP (SCL-022) and Bilirubin (SCL-023), and the inflammation pack hs-CRP (SCL-006). Albumin reuses the frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), cross-biomarker intelligence (SCL-010), the four-level confidence hierarchy (SCL-010), **confidence inheritance** (SCL-016/017/018/019/021/022/023), multiple-explanations output (SCL-010), two-sided banding (SCL-016/019/022), sex/age/pregnancy-aware banding (SCL-004/010/016/017/018/019/022/023), guideline-disagreement handling (SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/014/015/016/017/018/019/021/022/023) — introducing only Albumin-specific scientific content. All sections remain consistent with SCL-001 through SCL-023.

---

> **What this document is.** SCL-024 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for Albumin. It reuses existing
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

## STRUCTURAL-FIT NOTE (Albumin vs SCL-001, and its siblings SCL-006/016/022/023) — reuses frozen frameworks; no new pattern

Albumin presents the same structural characteristics BioSense has already solved for — a **two-sided marker
whose meaning is set by companion patterns** (as for Creatinine/SCL-016, Haemoglobin/SCL-019, ALP/SCL-022) and
whose interpretation turns on a **cross-biomarker distinction** (as bilirubin's fraction and ALP's GGT-
localisation) — and maps onto the frozen methodology without extension. Albumin is a **long-half-life plasma
protein reflecting protein status, hepatic synthetic function, hydration, inflammation, and chronic health**,
and its meaning is **inseparable from context**: a low value could reflect inflammation, impaired hepatic
synthesis, renal loss, or (less specifically) nutrition/distribution, and a high value is almost always relative
dehydration — and it is **hs-CRP, the liver panel, creatinine/eGFR, and hydration context** that tell you which.
So it reuses the Cross-Biomarker Intelligence and Context-First frameworks:

1. **Never-in-isolation interpretation — reused cross-biomarker intelligence (SCL-010) + multiple-explanations
   (SCL-010).** Albumin screens several systems, but the meaningful wellness read comes from albumin **plus its
   companions** — above all **hs-CRP (SCL-006)** (the inflammation-vs-nutrition/synthesis discriminator), then
   ALT (SCL-014), AST (SCL-015), GGT (SCL-021), ALP (SCL-022), Bilirubin (SCL-023) (hepatic synthesis),
   Creatinine/eGFR (SCL-016) (renal loss), and Haemoglobin (SCL-019) — which is exactly a consume-companions-and-
   rank-the-interpretation pattern (§0.5, §9). Albumin alone is a screen; the companions localise the mechanism.
   **Albumin is never interpreted in isolation.**
2. **Confidence inheritance — reused (SCL-016/017/018/019/021/022/023).** An albumin-plus-companion pattern
   **inherits the lower confidence** of its inputs; if the companions are unavailable, the read is confidence-
   limited, not asserted — and this is precisely how BioSense **distinguishes a hydration pattern from an
   inflammation, renal-loss, or hepatic-synthetic pattern** (§0.6, §13).
3. **Context-First — reused (SCL-010).** Albumin is interpreted only after context — hs-CRP, the liver panel,
   creatinine/eGFR, haemoglobin, and hydration status, illness, pregnancy, and nutritional status — evaluated
   **before** banding (§0.2, §8, §12).
4. **Genuinely two-sided (low-dominant) banding with flags — reused (SCL-016/019/022).** Albumin is meaningfully
   two-sided: the **low** direction (protein/synthesis/inflammation/renal-loss) is the clinically meaningful side
   (graded by severity) **and** a **high** direction that is almost always relative **dehydration/
   hemoconcentration** — each flagged. (This is an already-solved two-sided structure, not new methodology.)
   (§11).
5. **Sex/age/pregnancy-aware banding — reused (SCL-004/010/016/017/018/019/022/023).** Albumin **falls slightly
   with age** and is **decreased in pregnancy** (reduced production / plasma-volume expansion), so banding
   carries age and pregnancy overlays (§11).
6. **Guideline-disagreement handling — reused (SCL-003/011/012).** The adult reference ranges genuinely differ
   (3.5–5.0; 3.5–5.4; 3.4–5.4 g/dL; 35–50; 35–55 g/L) and the assay methods differ (BCG overestimates vs BCP) —
   presented as distinct frameworks, **never averaged** (§10, §11).
7. **Multiple-explanations output — reused (SCL-010).** An abnormal albumin gets **ranked patterns** — the five
   founder-named interpretation patterns (dehydration / inflammation / nutrition / hepatic-synthetic / renal-
   loss) — never a single certain cause (§11, §14).
8. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012/014/015/016/017/018/019/021/022/023).**
   BioSense never emits "liver failure," "nephrotic syndrome," "malnutrition," "chronic inflammatory disease,"
   or "cancer" as a diagnosis; it detects the pattern, routes, and names nothing (§18, §19).

**Biomarker-specific content introduced:** the albumin thresholds and their genuinely-two-sided (low-dominant)
structure; the g/dL and g/L units (1 g/dL = 10 g/L); the long half-life (medium-term, slow-to-respond, negative
acute-phase reactant); the five interpretation patterns; the **hs-CRP distinction** (inflammation vs nutrition/
synthesis); the high-albumin-is-dehydration default; the **not-a-standalone-nutrition-marker** nuance (ASPEN);
the reference-range and assay-method disagreements; and the age/pregnancy overlays. **No new methodology is
required.** **[C]**

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

Albumin is best understood as **a long-half-life plasma protein that reflects several physiological systems at
once — protein status, hepatic synthetic function, hydration, inflammation, and chronic health** — **not** a
standalone verdict and **not** a diagnosis. Made by the liver, it is the most abundant protein in blood, keeps
fluid inside the vessels (oncotic pressure), and ferries hormones, vitamins, and medications around the body.
Because it turns over slowly (a plasma half-life of about three weeks), it reflects the average of the last
several weeks rather than today — a steady, medium-term signal. And because it is a **negative acute-phase
reactant**, it **falls during inflammation** regardless of diet, which is why it is **not** a reliable
standalone nutrition marker.

So its meaning is inseparable from context. A **low** albumin is the clinically meaningful direction and could
reflect inflammation, impaired hepatic synthesis, renal loss, or (less specifically) nutrition or dilution — and
the single most useful next read is **hs-CRP**: low albumin with a **high** hs-CRP points to inflammation, while
low albumin with a **normal** hs-CRP points more toward a nutrition or synthesis picture. A **high** albumin, by
contrast, is almost always **relative dehydration** (hemoconcentration) rather than overproduction — the liver
does not make supranormal amounts.

So BioSense reads albumin **with its companions** — hs-CRP above all, then the liver panel, creatinine/eGFR, and
haemoglobin — **never in isolation**, begins with biological context (a mild dip during an acute illness is
expected and usually recovers; age lowers it slightly; pregnancy lowers it), ranks the plausible **patterns**
rather than asserting one, treats a high value as dehydration until shown otherwise, shows where reference ranges
and assay methods genuinely differ rather than splitting them, and names no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as the
evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate Albumin. Every value carries a source ID (A-series / R-series → §27) and a
> category tag. Canonical unit: g/dL (g/L supported; 1 g/dL = 10 g/L). **Genuinely two-sided (low-dominant: low
> is the meaningful direction; high is almost always dehydration), context-first, pattern-based; NEVER
> interpreted in isolation; the pattern verdict inherits lower input confidence and distinguishes hydration vs
> inflammation vs renal-loss vs hepatic-synthetic; NEVER a diagnosis of liver failure, nephrotic syndrome,
> malnutrition, chronic inflammatory disease, or cancer. NOT a standalone nutrition marker.**

## 0.1 Canonical units — [A]
```
canonical_unit: g/dL   (g/L supported)   [A2,A4]
conversion: 1 g/dL = 10 g/L   [A5]   # simple decimal factor; NOT the cholesterol (38.67)/triglyceride (88.57)/creatinine (88.4)/glucose (18.0)/25(OH)D (2.496)/B12 (0.738)/folate (2.266)/Free T4 (12.87)/bilirubin (17.1) factor; a protein MASS concentration, not an enzyme activity (unlike ALT/AST/GGT/ALP in U/L) and not a cell count (unlike WBC)
Always retain value + unit + sex + age(adult; older adults slightly lower) + pregnancy + companions(hs-CRP/ALT/AST/GGT/ALP/Bilirubin/Creatinine-eGFR/Haemoglobin) + context(hydration status/illness/nutritional status/IV fluids/tourniquet) + assay method(BCG/BCP where known). Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  companions (NEVER-IN-ISOLATION): hs-CRP (SCL-006, PRIMARY discriminator), ALT (SCL-014), AST (SCL-015), GGT (SCL-021), ALP (SCL-022), Bilirubin (SCL-023) [hepatic synthesis]; Creatinine/eGFR (SCL-016) [renal loss]; Haemoglobin (SCL-019); [A9,A15]
  hydration & pre-analytic: hydration status (high albumin → relative dehydration), IV fluids (dilute), diuretics/dehydration (concentrate), tourniquet artifact; [A10,A19]
  systemic: illness/acute inflammation (albumin falls — negative acute-phase reactant), chronic health; [A8,A14]
  life-stage/nutrition: age (falls slightly with age), pregnancy (decreased production), nutritional status (NOT a standalone nutrition marker). [A16,A17,A12]
CORE RULE (founder): albumin is a long-half-life plasma protein reflecting PROTEIN STATUS, HEPATIC SYNTHETIC FUNCTION, HYDRATION, INFLAMMATION & CHRONIC HEALTH; LOW requires context; HIGH is primarily relative DEHYDRATION unless evidence suggests otherwise; NOT a diagnosis. [A1,A7,A10][B3]
  → albumin alone = screen; the driver (dehydration/inflammation/nutrition/hepatic-synthetic/renal-loss) needs hs-CRP + LFT + creatinine + hydration context. [A9,A15]
  → hs-CRP KEY: low albumin + HIGH hs-CRP → inflammation-driven; low albumin + normal/low hs-CRP → nutrition/synthesis. [A9]
  → HIGH albumin → assume relative dehydration (hemoconcentration) unless evidence otherwise; check hydration/pre-analytic. [A10]
  → where several patterns fit an abnormal albumin, RANK them (§0.5); never assert one. [R3]
IF material context changes meaning → interpret WITHIN that context.                                          [R1]
IF companions / key context unavailable → CONFIDENCE LIMITATION (pattern confidence limited), not certainty.  [R4,R9]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors) — GENUINELY TWO-SIDED, LOW-DOMINANT
```
ALBUMIN_WELLNESS_BAND (g/dL, general non-pregnant adult; after context gate; ALWAYS read with hs-CRP + panel):  [A2,A3,A6,A10,A20]
 Uses an adult reference window (LRL_ref default 3.5 g/dL / 35 g/L; URL_ref default 5.0 g/dL / 50 g/L; lab's own preferred; frameworks never averaged). [A2,A4]
  MARKED_LOW_FLAG       v < 3.0                            # marked low — the more-urgent low zone (liver/kidney/chronic inflammation); read with hs-CRP/LFT/creatinine [A6]
  LOW_FLAG              3.0 <= v < 3.5                      # low (hypoalbuminaemia); protein/synthesis/inflammation/renal-loss direction; read with hs-CRP [A6]
  LOW_NORMAL_WATCH      3.5 <= v < 4.0                      # low-normal; esp. in older/chronically ill may signal a meaningful decline worth monitoring [A20]
  OPTIMAL_WELLNESS      4.0 <= v <= URL_ref                # wellness-optimal (healthy liver/nutrition/no inflammation) [A20]
  HIGH_WATCH_DEHYDRATION v > URL_ref                       # high — almost always relative dehydration/hemoconcentration (check hydration/pre-analytic); NOT overproduction [A10]
DIRECTION: GENUINELY TWO-SIDED, LOW-DOMINANT (low = protein/synthesis/inflammation/renal-loss direction — the clinically meaningful side, graded; high = dehydration/hemoconcentration flag). [R6]
AGE/PREGNANCY OVERLAY: albumin falls slightly with age (a low-normal in an older adult may be less concerning); decreased in pregnancy — interpret with these, don't over-flag. [A16,A17]
UNIT: g/dL (g/L = ×10). COMPANIONS (esp. hs-CRP) REQUIRED to resolve a low albumin's driver; if absent → screen-level read + reduced confidence. [A9][R9]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never in isolation; never a diagnostic label. [B][D]**

## 0.4 Reference, low-threshold & method frameworks (guideline-disagreement, never averaged) — [A]/[B]
```
ADULT REFERENCE RANGES (represent the relevant framework(s); NEVER average):   [A2,A3,A4]
  3.5–5.0 g/dL (35–50 g/L) — most commonly cited. [A2]
  3.5–5.4 g/dL (jinfiniti). [A3]
  3.4–5.4 g/dL (MDTools). [A3]
  35–55 g/L (Medscape) / 35–50 g/L (UK). [A4]
LOW THRESHOLDS (represent; NEVER average): <3.5 g/dL (<35 g/L) low & warrants follow-up; persistently <3.0 g/dL → closer look; the lower, the more urgent. [A6]
HIGH: >5.0–5.4 g/dL (>50 g/L) uncommon → almost always relative dehydration/hemoconcentration. [A10]
OPTIMAL (Category B target; evolving [E]): 4.0 g/dL and above within range (healthy liver/nutrition/no inflammation). [A20]
METHOD VARIATION: BCG (bromocresol green) OVERESTIMATES vs BCP (bromocresol purple, more specific); immunonephelometric most accurate but not routine — prefer the lab's own method/range. [A18]
DEFAULT: BioSense uses an adult window (LRL 3.5 / URL 5.0 g/dL) for banding when the lab's own range is unavailable; prefer the lab's own reference & method; show the framework used. [A2,A4]
```

## 0.5 Interpretation-pattern / companion hints — [A]+[C] — REUSED cross-biomarker (SCL-010) + inheritance (SCL-016/017/018/019/021/022/023)
```
FIVE INTERPRETATION PATTERNS (pattern hints, NOT diagnoses; require companions; confidence inherits lower input): [R3,R4,R9]
  DEHYDRATION (HIGH albumin, ± other proteins raised, hydration/pre-analytic context)   → relative-dehydration/hemoconcentration PATTERN (the default for high). [A10,A19]
  INFLAMMATION (LOW albumin + HIGH hs-CRP)                                               → inflammation-driven PATTERN (negative acute-phase; read with hs-CRP, SCL-006). [A8,A9]
  NUTRITION (LOW albumin + normal/low hs-CRP, dietary/context)                           → nutrition/synthesis PATTERN — BUT albumin is NOT a standalone nutrition marker (ASPEN). [A9,A12]
  HEPATIC-SYNTHETIC (LOW albumin + ALT↑/AST↑ or ALP↑/GGT↑/bilirubin↑)                    → impaired hepatic-synthesis PATTERN (read with the liver panel, SCL-014/015/021/022/023). [A15]
  RENAL-LOSS (LOW albumin + creatinine↑/eGFR↓)                                           → renal-protein-loss PATTERN (read with creatinine/eGFR, SCL-016). [A15]
INHERITANCE distinguishes HYDRATION vs INFLAMMATION vs NUTRITION vs HEPATIC-SYNTHETIC vs RENAL-LOSS; verdict inherits lower input confidence. [R9]
hs-CRP KEY: low albumin + HIGH hs-CRP → inflammation ; low albumin + normal hs-CRP → nutrition/synthesis. [A9]
GOVERNANCE: emit a pattern read ONLY with the relevant companions (esp. hs-CRP); else screen-level + confidence limitation. NEVER a diagnosis; RANK patterns (§0.2). [R7,R9]
NOTE: albumin does NOT diagnose; the PATTERN (not mere abnormality) carries the meaning; a single reading is a starting point; a mild low during acute illness is expected & often normalises. [A14]
NOT-A-NUTRITION-MARKER: albumin characterises inflammation/disease severity, not short-term nutrition; ASPEN says do NOT use it to diagnose malnutrition. [A12,A22]
```

## 0.6 Confidence hierarchy (four-level) + inheritance — [C] — REUSED (SCL-010 + SCL-016/017/018/019/021/022/023)
```
STANDARD          : clear albumin AND hs-CRP available (driver resolvable) AND key panel (LFT/creatinine) AND age/life-stage known AND no unexcluded pre-analytic confound.
REDUCED           : single value / near a boundary / method(BCG/BCP)-or-age overlay uncertain / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : low albumin with NO hs-CRP (driver not resolvable) OR high albumin with no hydration context OR unexcluded confound (acute illness / IV fluids / tourniquet) → screen-level + request hs-CRP/panel/hydration/repeat; name what's needed. [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / marked low needing evaluation / hepatic-synthetic or renal-loss pattern → explained abstention. [R2,A6]
INHERITANCE: the albumin+companion PATTERN verdict inherits the LOWER confidence of albumin and its companions; companions absent → pattern limited to a screen-level statement; this is HOW hydration/inflammation/nutrition/hepatic-synthetic/renal-loss are distinguished. [R9]
Reduced confidence does NOT auto-block; significant uncertainty MAY justify abstention. New abnormal value → prefer REPEAT (with hs-CRP; note hydration/illness), and because albumin is slow-moving, compare with the person's own prior values. [A7,A14]
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  Albumin is NOT a diagnosis. NEVER emit "liver failure", "cirrhosis", "nephrotic syndrome", "kidney failure", "malnutrition", "kwashiorkor", "chronic inflammatory disease", "inflammatory bowel disease", "sepsis", "cancer", or any condition as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  Albumin is a multi-system, long-half-life protein; an abnormal value REQUIRES context → interpret WITH hs-CRP + the LFT panel + creatinine/eGFR + hydration; NEVER in isolation. [B3][A9,A14]
S3  Emit an interpretation-pattern read ONLY with the relevant companions (esp. hs-CRP); else screen-level + confidence limitation (inheritance). [R9]
S4  On abnormal albumin with ≥2 plausible patterns → RANKED patterns (dehydration / inflammation / nutrition / hepatic-synthetic / renal-loss); NEVER assert one. [R3]
S5  HIGH albumin → treat as relative DEHYDRATION/hemoconcentration unless evidence suggests otherwise (check hydration/pre-analytic incl. tourniquet/IV fluids); do NOT interpret as overproduction. [A10,A19]
S6  Genuinely TWO-SIDED, LOW-dominant: LOW albumin is the clinically meaningful direction requiring context; grade severity (mild <3.5, marked <3.0) but never diagnose. [A6]
S7  NOT a standalone nutrition marker: NEVER diagnose malnutrition from albumin; it characterises inflammation/disease severity, not short-term nutrition (ASPEN); use hs-CRP to separate inflammation from nutrition/synthesis. [A12,A22]
S8  Life-stage aware: albumin falls slightly with age & is decreased in pregnancy → do NOT over-flag a low-normal in an older adult or a lower value in pregnancy. [A16,A17]
S9  New/isolated abnormal value → suggest REPEAT (with hs-CRP; note hydration/illness); a mild low during acute illness is expected & often normalises; albumin is slow-moving → compare with own prior values. [A14,A7]
S10 Companions (hs-CRP / LFT / creatinine / haemoglobin) unavailable → confidence limitation, not invented certainty. [R4]
S11 Never recommend treatments/medication changes/doses (e.g. albumin infusions, protein prescriptions, diuretic changes); never produce a numeric liver/kidney/mortality-risk %; medication/nutrition questions → educate + refer. [D]
S12 RED FLAGS (marked low albumin <3.0; low albumin with high hs-CRP (inflammation pattern); low albumin with a hepatic-synthetic or renal-loss pattern; low albumin with oedema/systemic symptoms) → calm prompt healthcare review; never emergency-diagnose. [A6,A9,A24][D]
S13 Never present a BioSense band, reference range, optimal target, or interpretation pattern as a medical/diagnostic boundary.
S14 Represent reference-range (3.5–5.0 / 3.5–5.4 / 3.4–5.4 g/dL; 35–50 / 35–55 g/L) and assay-method (BCG vs BCP) disagreement; NEVER average thresholds. [A2-A4,A18][R5]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & COMPANIONS (the key albumin move): ALWAYS read with hs-CRP (SCL-006, primary) + the LFT panel (ALT (SCL-014)/AST (SCL-015)/GGT (SCL-021)/ALP (SCL-022)/Bilirubin (SCL-023)) + creatinine/eGFR (SCL-016) + haemoglobin (SCL-019); check hydration/pre-analytic; for a NEW abnormal value, REPEAT (with hs-CRP; note hydration/illness), compare with own prior values. [A9,A15,A14]
Tier 2 LIFESTYLE (context-appropriate): general wellness (adequate hydration; balanced protein-containing nutrition; managing inflammation; supporting liver & kidney wellness) — framed as education, not treatment; note a mild low during acute illness is expected and usually recovers, and albumin is not a standalone nutrition marker. [A10,A12,A14]
Tier 3 HEALTHCARE DISCUSSION (calm) when: marked low (<3.0) | low albumin with high hs-CRP (inflammation pattern) | low albumin with a hepatic-synthetic or renal-loss pattern | low albumin with oedema/systemic symptoms. [A6,A9,A24][D]
NEVER a specific treatment, medication change, or dose at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → age/pregnancy overlay → albumin band (two-sided, low-dominant) + interpretation pattern (if companions) → template; RANKED patterns where abnormal; ALWAYS "read with hs-CRP & the wider picture".
OPTIMAL_WELLNESS (+ normal companions) → affirming, with the "screen + read with hs-CRP/panel" caveat.
LOW_NORMAL_WATCH → calm; low-normal; esp. older/chronically ill worth monitoring; context; repeat.
LOW_FLAG / MARKED_LOW_FLAG → constructive; read with hs-CRP (inflammation vs nutrition/synthesis) + LFT (hepatic) + creatinine (renal); ranked patterns; repeat; ALWAYS "not a diagnosis" & "not a standalone nutrition marker".
HIGH_WATCH_DEHYDRATION → calm; almost always relative dehydration; check hydration/pre-analytic; rehydrate & repeat.
inflammation pattern (low + high hs-CRP), hepatic-synthetic (low + LFT↑), renal-loss (low + creatinine↑), marked low, or oedema/systemic symptoms → calm prompt healthcare review; never alarm, never diagnose.
older adult / pregnancy → physiological lower albumin; reassure/route.
companions/hs-CRP unavailable → screen-level statement + confidence limitation; name that hs-CRP & the panel complete the picture.
Never "normal/abnormal" as a verdict; never a diagnosis (liver failure/nephrotic syndrome/malnutrition/chronic inflammatory disease/cancer).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Albumin is a slow-moving protein made by your liver that reflects several things at once — protein status,
      liver synthesis, hydration, and especially inflammation — so it's read together with hs-CRP (which tells
      inflammation apart from a nutrition or liver-synthesis picture) and your wider panel."
CAV3 (screen/no hs-CRP or companions) "On its own, a low albumin doesn't say why. hs-CRP is the usual next step
      — low albumin with a high hs-CRP points to inflammation, with a normal one points more to nutrition or
      liver synthesis — so we'd interpret this more confidently with it and your liver and kidney markers."
CAV4 (reduced/context) name the context reducer(s) or missing companion (hs-CRP, ALT, AST, GGT, ALP, bilirubin,
      creatinine/eGFR, haemoglobin, hydration status, illness, age, pregnancy, assay method).
CAV5 (new/abnormal) "Albumin moves slowly and shifts with hydration, a recent illness, pregnancy, age and lab
      method, so a single out-of-range value is best read with hs-CRP and repeated — ideally against your own
      previous results — before reading much into it."
CAV6 (abnormal, ranked) "Because a low albumin can come from inflammation, liver synthesis, kidney loss or
      nutrition, we've noted the more likely pattern for your context rather than pointing to one — best
      confirmed with a professional."
CAV7 (inflammation / hepatic-synthetic / renal-loss / marked low / oedema) "This pattern is worth a prompt,
      unhurried conversation with a healthcare professional."
CAV8 (high/dehydration) "A high albumin is almost always just relative dehydration — the blood is a little
      concentrated — rather than your body making too much; rehydrating and repeating usually settles it."
CAV9 (not-a-nutrition-marker) "Albumin isn't a reliable stand-alone nutrition marker — it drops with
      inflammation regardless of diet — so a low value doesn't by itself mean poor nutrition."
CAV10 (age/pregnancy) "Albumin naturally runs a little lower with age and in pregnancy, so a slightly low value
       in those contexts is read in that light."
CAV11 (reference/lab/method) "Albumin reference ranges and lab methods (BCG vs BCP) differ, so we compare
       against your own lab's range and, where possible, your own previous results."
```

## 0.11 Source & version identifiers
```
config_id: SCL-024   config_version: 1.0
band_id: BIOSENSE_ALBUMIN_TWOSIDED_LOWDOMINANT_BANDS_v1  (Category B; genuinely two-sided; low-dominant; high=dehydration; anchors A2,A3,A6,A10,A20)
reference_frameworks_id: SCL024_ALB_REFRANGES_v1         (adult ranges 3.5–5.0/3.5–5.4/3.4–5.4 g/dL; 35–50/35–55 g/L; low thresholds; method BCG/BCP; A2-A4,A6,A18; never averaged)
optimal_target_id: SCL024_ALB_OPTIMAL_v1                 (wellness-optimal ≥4.0 within range; evolving; A20)
interpretation_pattern_id: SCL024_ALB_PATTERNS_v1        (five patterns: dehydration/inflammation/nutrition/hepatic-synthetic/renal-loss; cross-biomarker + multiple-explanations; R3,R4; A9,A10,A15)
crp_distinction_ref: SCL024_ALB_CRP_DISTINCTION_v1       (low+high CRP=inflammation; low+normal CRP=nutrition/synthesis; A9)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1   (reused; R2)
confidence_inheritance_ref: SCL016_CONFIDENCE_INHERITANCE_v1 (reused SCL-016/017/018/019/021/022/023; R9 — distinguishes hydration/inflammation/nutrition/hepatic-synthetic/renal-loss)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1   (reused; R3 — ranked patterns)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1     (reused; R4 — hs-CRP/ALT/AST/GGT/ALP/Bilirubin/Creatinine-eGFR/Haemoglobin)
two_sided_precedent_ref: SCL016_CREATININE_v1 / SCL019_HAEMOGLOBIN_v1 / SCL022_ALP_v1  (reused genuinely-two-sided structure)
sex_age_preg_aware_ref: SCL004/010/016/017/018/019/022/023 posture  (reused; R8 — age/pregnancy)
guideline_disagreement_ref: SCL011/012 posture           (reused; R5 — reference ranges & methods; never averaged)
not_a_nutrition_marker_id: SCL024_ALB_NOT_NUTRITION_v1   (ASPEN; negative acute-phase; A12,A22)
safety_rules_id: SCL024_SAFETY_v1                        (S1-S14)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Albumin is the most abundant protein in blood, made by the liver. <cite index="23-1">Albumin is the most abundant protein in your blood, produced by your liver. It has two main jobs. First, it keeps fluid inside your blood vessels by maintaining what's called oncotic pressure... Second, it acts as a transport vehicle, carrying hormones, vitamins, medications, and potentially harmful biological waste products through your bloodstream.</cite> It reflects several systems at once: <cite index="23-1">albumin levels in your blood reflect how well your liver is working, whether your body is dealing with inflammation, and how effectively your kidneys are retaining protein.</cite> **[A][A1]**

The defining feature for interpretation is that albumin is a **slow-moving, multi-system** marker. Because <cite index="29-1">albumin has a long half-life in plasma (approximately 18–21 days), the serum albumin level reflects average protein synthesis and loss over the previous several weeks — not just today.</cite> And crucially it is a **negative acute-phase reactant**: <cite index="27-1">albumin is a negative acute-phase reactant, meaning levels fall during inflammation, infection, and critical illness.</cite> This is why the single most useful companion is hs-CRP: <cite index="29-1">albumin low + CRP high = inflammation-driven; albumin low + CRP normal/low = true nutritional deficit.</cite> Albumin is therefore read **with** hs-CRP and the wider panel, never alone. **[A][A7][A8][A9]**

Two directional rules complete the picture. A **low** albumin is the clinically meaningful side and <cite index="23-1">a single albumin reading is a starting point, not a diagnosis.</cite> A **high** albumin, by contrast, <cite index="26-1">is uncommon and essentially always reflects hemoconcentration from dehydration rather than true albumin overproduction. The liver does not upregulate albumin synthesis to supranormal levels.</cite> **[A][A14][A10]**

- **Reported in:** g/dL (g/L supported; 1 g/dL = 10 g/L). **[A][A2][A5]**
- **Nature:** multi-system (protein/hepatic-synthetic/hydration/inflammation/chronic-health) marker; **genuinely
  two-sided (low-dominant)**; **pattern-based**; **never in isolation**; **not a diagnosis**; **not a standalone
  nutrition marker** **[A][B3]**
- **Direction:** genuinely two-sided, low-dominant (low = protein/synthesis/inflammation/renal-loss; high =
  dehydration) **[A][R6][A10]**
- **Companions:** hs-CRP (SCL-006, **primary** discriminator), ALT (SCL-014), AST (SCL-015), GGT (SCL-021), ALP
  (SCL-022), Bilirubin (SCL-023), Creatinine/eGFR (SCL-016), Haemoglobin (SCL-019) **[A][A9][A15]**
- **BioSense role:** a context-first, hs-CRP-anchored multi-system wellness screen with age/pregnancy overlays.

---

# 2. Physiological Function

Albumin is synthesised in the liver (about 14 g a day in a healthy adult) and turns over slowly, with a plasma
half-life of roughly three weeks. **[A][A7]** It performs two main jobs: maintaining **oncotic pressure** (the
pull that keeps fluid inside the vessels — when albumin falls too low, fluid escapes into tissues, causing
oedema) and acting as a **transport protein** for hormones, vitamins, drugs, and waste. **[A][A1]** About 40% of
albumin sits in the bloodstream and 60% in the extravascular space. **[A][A8b]**

Two features define interpretation **[A]**:
- **It is slow-moving and multi-system.** The long half-life makes it a **medium-term** signal (weeks, not
  today) reflecting hepatic synthesis, plasma volume, inflammation, and losses together — so its meaning depends
  on which system is in play. **[A][A7]**
- **It is a negative acute-phase reactant.** Inflammation (via IL-6/TNF-α) suppresses hepatic albumin synthesis
  and leaks it into tissues, so albumin **falls with inflammation independent of diet** — which is why it is not
  a standalone nutrition marker and why hs-CRP is the key companion. **[A][A8][A12]**

---

# 3. Scientific Background

Three scientific themes shape how BioSense represents Albumin. **[A]**

**First, albumin means little without hs-CRP and the panel.** Because it is a negative acute-phase reactant, a
low value is ambiguous until inflammation is accounted for: <cite index="20-1">low albumin combined with elevated hs-CRP points toward inflammation as the driver; low albumin with low hs-CRP is more consistent with a nutrition or synthesis issue.</cite> The liver panel and kidney lens extend this: <cite index="31-1">low albumin alongside elevated ALT points toward impaired hepatic synthesis; low albumin combined with elevated ALP and GGT suggests cholestatic liver disease is impairing synthetic function</cite>, and creatinine flags possible renal loss. BioSense therefore treats albumin **plus its companions and context** as the unit of interpretation. **[A][A9][A15]**

**Second, albumin is not a nutrition marker — a crucial correction.** <cite index="32-1">Despite decades of misuse, albumin is a marker of inflammation and disease severity, not nutritional intake. ASPEN guidelines explicitly state albumin should not be used to diagnose malnutrition. It is a negative acute-phase reactant — levels drop in response to IL-6, regardless of diet.</cite> Serum albumin does not change with short-term nutrient intake. BioSense reflects this: a low albumin is never presented as proof of poor nutrition. **[A][A12][A22]**

**Third, the reference ranges and assay methods differ, and high means dehydration.** Adult ranges vary (3.5–5.0;
3.5–5.4; 3.4–5.4 g/dL; 35–50; 35–55 g/L), and <cite index="36-1">the bias between BCG and BCP results appears to be due to the nonspecific reactions of α-globulins (acute phase reactants) in the BCG method</cite> — so BCG **overestimates** albumin. Meanwhile <cite index="26-1">elevated serum albumin is uncommon and essentially always reflects hemoconcentration from dehydration.</cite> BioSense **presents the differing frameworks and never averages them**, and treats a high value as relative dehydration. **[A][A2][A3][A18][A10]**

**The wellness reading — [B]:** albumin is a context-first, hs-CRP-anchored, genuinely two-sided (low-dominant)
multi-system screen — read with hs-CRP, the liver panel, creatinine/eGFR, and haemoglobin, with age/pregnancy
overlays, the pattern (dehydration / inflammation / nutrition / hepatic-synthetic / renal-loss) ranked rather
than one asserted, high treated as dehydration, reference and method disagreement shown honestly, abnormal
values repeated (against the person's own history) before they count, no condition named, and never used to
diagnose malnutrition.

**An honest boundary — [E]:** ranges and methods are contested, albumin is slow-moving and non-specific
(inflammation dominates), and it is not a nutrition marker — so BioSense leans on hs-CRP and the panel and is
explicit about confidence. **[E][A25][A12]**

---

# 4. Why Albumin Matters

**1. It is a broad, medium-term wellness and chronic-health signal. [A][A7][A21]** A slow-moving protein that
integrates hepatic synthesis, hydration, inflammation, and losses over weeks — and a strong prognostic marker
(low albumin predicts poorer outcomes) — makes it a high-value longevity/chronic-health screen. **[A]**

**2. With hs-CRP, it separates inflammation from nutrition/synthesis. [A][A9]** The albumin+hs-CRP pair is one of
the most useful distinctions in routine interpretation — the difference between a bare number and an actionable
pattern. **[A]**

**3. It cross-reads the liver and kidney packs. [A][A15]** Low albumin with raised liver enzymes points to
hepatic synthesis; low albumin with raised creatinine points to renal loss — albumin ties the chronic-health
picture together across SCL-014/015/016/021/022/023. **[A]**

**Why BioSense measures it — [C]:** albumin is a high-value, multi-system, genuinely two-sided screen whose
meaning is companion-dependent — the ideal case for Context-First interpretation, cross-biomarker intelligence
(the hs-CRP distinction), confidence inheritance, sex/age/pregnancy-aware banding, ranked patterns, and
guideline-disagreement handling, all while never diagnosing liver failure, nephrotic syndrome, malnutrition, a
chronic inflammatory disease, or cancer.

---

# 5. Laboratory Measurement

Albumin is measured on an automated analyser (part of the liver-function / metabolic panel), reported in **g/dL**
(or g/L) as a **protein mass concentration**, most commonly by the **BCG** or **BCP** dye-binding method.
**[A][A1][A18]**

- **Units.** g/dL is canonical; g/L supported (1 g/dL = 10 g/L). A protein mass concentration, not an enzyme
  activity (unlike ALT/AST/GGT/ALP in U/L). **[A][A5]**
- **Read with hs-CRP.** The key companion: low albumin + high hs-CRP → inflammation; low albumin + normal hs-CRP
  → nutrition/synthesis. **[A][A9]**
- **Method matters.** BCG **overestimates** vs BCP (more specific); prefer the lab's own method/range. **[A][A18]**
- **Pre-analytic.** Prolonged tourniquet can falsely raise it; IV fluids dilute; diuretics/dehydration
  concentrate. **[A][A19]**
- **Slow-moving.** Long half-life (~18–21 days) → a medium-term signal; the person's **own prior values** are a
  useful comparison. **[A][A7]**
- **Companion panel.** Read with **hs-CRP** (inflammation), **ALT/AST/GGT/ALP/bilirubin** (hepatic synthesis),
  **creatinine/eGFR** (renal loss), and **haemoglobin**. **[A][A15]**

---

# 6. Units

- **g/dL** — standard; **BioSense canonical unit.** **[A/C]**
- **g/L** — SI/UK; **1 g/dL = 10 g/L.** **[A][A5]**
- **Simple decimal factor (×10)** — it is **not** the cholesterol (38.67), triglyceride (88.57), creatinine
  (88.4), glucose (18.0), 25(OH)D (2.496), B12 (0.738), folate (2.266), Free T4 (12.87), or bilirubin (17.1)
  factor; albumin is a **protein mass concentration**, not an enzyme activity (unlike ALT/AST/GGT/ALP, which are
  U/L) and not a cell count (unlike WBC). **[A][C]**

BioSense stores the reported value, unit, sex, age, pregnancy, assay method, and any companions unchanged, and
evaluates the pattern and overlays. **[C]**

---

# 7. Unit Conversion

```
albumin (g/L)  = albumin (g/dL) × 10          [A5]
albumin (g/dL) = albumin (g/L)  ÷ 10
(simple decimal factor; NOT an enzyme-activity unit like ALT/AST/GGT/ALP; NOT the lipid/glucose/vitamin/creatinine/thyroid/bilirubin factor)
```
Worked check: albumin 4.0 g/dL × 10 = 40 g/L. **[A][A5]**

**Safety rule [D]:** Albumin uses the simple g/dL↔g/L decimal factor (×10); never apply a lipid/glucose/vitamin/
creatinine/thyroid/bilirubin factor, and never treat it as an enzyme activity (U/L) or a cell count. A unit-
unknown value is displayed but not interpreted; a pattern read requires companions (esp. hs-CRP); age/pregnancy
overlays are applied before banding. **[D]**

---

# 8. Measurement Limitations & the Never-In-Isolation Principle  *(Context-First basis — reused SCL-010)*

Albumin's defining limitation is that **an abnormal value does not, on its own, reveal its driver** — it is
slow-moving, multi-system, and dominated by inflammation — which is why the Context-First gate (§0.2), the
pattern layer (§0.5), and the ranked-pattern output apply. **[A][B2]**

## 8.1 Albumin needs hs-CRP and the panel — [A]
A low value is a starting point; hs-CRP (primary), with the liver panel, creatinine/eGFR, and haemoglobin,
resolves the driver (inflammation vs nutrition/synthesis vs hepatic vs renal). Albumin is never interpreted in
isolation. **[A][A9][A14]**

## 8.2 It is not a nutrition marker — [A]
Albumin is a negative acute-phase reactant that falls with inflammation independent of diet; ASPEN says it must
not be used to diagnose malnutrition, and it does not track short-term intake. **[A][A12][A22]**

## 8.3 Ranges & methods are contested — [A]
Adult reference ranges differ (3.5–5.0 / 3.5–5.4 / 3.4–5.4 g/dL; 35–50 / 35–55 g/L); BCG overestimates vs BCP —
shown as frameworks, never averaged; own history is a useful comparison. **[A][A2][A18][A25]**

## 8.4 It is two-sided, low-dominant, and high = dehydration — [A]
A **low** albumin is the meaningful direction (context-dependent); a **high** albumin is almost always relative
**dehydration/hemoconcentration**, not overproduction. **[A][A6][A10]**

**How BioSense uses this — [C][D]:** the Context-First gate runs first; albumin is banded genuinely two-sided
(low-dominant, with a high/dehydration flag) with age/pregnancy overlays; the pattern is resolved only with
companions (esp. hs-CRP — else screen-level + limited confidence); plausible patterns are **ranked, not
asserted**; a high value is treated as dehydration; the not-a-nutrition-marker and slow-moving nuances are
surfaced; missing hs-CRP/context sets Context-Required/Reduced confidence; and no condition is ever named.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010; pattern inheritance via SCL-016/017/018/019/021/022/023)*

Albumin consumes its companion and context markers where available. **[A][C]**

- **hs-CRP (SCL-006) — the PRIMARY discriminator. [A]** Low albumin **with** a high hs-CRP → inflammation-driven;
  low albumin with a **normal** hs-CRP → nutrition/synthesis. This single pairing is the heart of albumin
  interpretation. **[A][A9]**
- **ALT (SCL-014) / AST (SCL-015) / GGT (SCL-021) / ALP (SCL-022) / Bilirubin (SCL-023) — hepatic-synthetic
  companions. [A]** Low albumin with raised liver enzymes (or a cholestatic ALP+GGT pattern) → an impaired
  hepatic-synthesis pattern. **[A][A15]**
- **Creatinine / eGFR (SCL-016) — the renal companion. [A]** Low albumin with raised creatinine / low eGFR → a
  possible renal-protein-loss pattern. **[A][A15]**
- **Haemoglobin (SCL-019). [A]** Chronic-health context (lower haemoglobin often accompanies lower albumin in
  chronic illness) — a supporting cross-read. **[A]**
- **(Context) hydration status, illness, pregnancy, nutritional status. [A]** Interpretation context that moves
  albumin (high → dehydration; acute illness → transient low; pregnancy/age → lower), never something BioSense
  advises changing beyond general wellness. **[A][A10][A16][A17]**

**Cross-biomarker rule [C] (reused R4/R9):** where these are **available**, BioSense consumes them (with the
pattern and confound caveats) to sharpen the read and confidence — and the **inheritance** is precisely how it
distinguishes a **hydration** pattern from an **inflammation**, **nutrition**, **hepatic-synthetic**, or
**renal-loss** pattern; where **unavailable** — especially **hs-CRP** (without which a low albumin's driver
cannot be resolved) — it records a **confidence limitation** and names what would clarify, never inventing
certainty. **[C][R4][R9]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Albumin is the most abundant plasma protein, liver-made; maintains oncotic pressure + transports.** **[A][A1]**
- **Long half-life (~18–21 days) → medium-term signal; negative acute-phase reactant (falls with inflammation).** **[A][A7][A8]**
- **hs-CRP distinguishes inflammation (low alb + high CRP) from nutrition/synthesis (low alb + normal CRP).** **[A][A9]**
- **High albumin almost always = relative dehydration (hemoconcentration), not overproduction.** **[A][A10]**
- **Albumin is NOT a standalone nutrition marker (ASPEN); a single value is not a diagnosis.** **[A][A12][A14]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **Adult reference ranges: 3.5–5.0; 3.5–5.4; 3.4–5.4 g/dL; 35–50; 35–55 g/L.** **[A][A2][A3][A4]**
- **Low thresholds: <3.5 g/dL (<35 g/L) low; <3.0 g/dL more urgent.** **[A][A6]**
- **Assay methods: BCG overestimates vs BCP (more specific); immunonephelometric most accurate.** **[A][A18]**
- **Why:** methods (BCG/BCP), populations, and age affect the numbers, and "optimal" wellness targets are newer
  than the diagnostic ranges. BioSense **presents the differing frameworks and never averages them** (reused R5).
  **[A][A25]**

## 10.3 Strength of evidence
- **Physiology, half-life, negative acute-phase status, the hs-CRP distinction, high=dehydration, not-a-nutrition-
  marker: established.** **[A][A7][A8][A9][A10][A12]**
- **Reference ranges & assay methods: established as variation.** **[A][A2][A18]**
- **Optimal/longevity targets; mortality associations: evolving.** **[E][A20][A21]**
- **Age/pregnancy effects: established.** **[A][A16][A17]**

## 10.4 Intended populations
Thresholds target general **non-pregnant adults**, with **age** and **pregnancy** overlays. BioSense applies them
context-first, treats high as dehydration, abstains or routes in inflammation/hepatic-synthetic/renal-loss
patterns and marked-low values, and reduces confidence where hs-CRP or context is unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. Albumin is GENUINELY TWO-SIDED and LOW-DOMINANT (the LOW
> direction — protein / hepatic-synthesis / inflammation / renal-loss — is the clinically meaningful side, graded
> by severity; the HIGH direction is almost always relative DEHYDRATION / hemoconcentration, not overproduction),
> CONTEXT-GATED, PATTERN-BASED, and NEVER interpreted in isolation: an abnormal value is a screen whose driver is
> set by hs-CRP and the wider panel, and where several patterns fit they are RANKED, not asserted. Adult
> reference ranges and assay methods (BCG vs BCP) genuinely DIFFER and are shown, never averaged. Albumin is NOT
> a standalone nutrition marker. Never a diagnosis of liver failure, nephrotic syndrome, malnutrition, chronic
> inflammatory disease, or cancer.**

## 11.1 The albumin wellness bands (g/dL; general non-pregnant adult; after context gate; read with hs-CRP)

Bands use an **adult reference window** (LRL_ref default 3.5 g/dL / 35 g/L; URL_ref default 5.0 g/dL / 50 g/L;
the lab's own range/method is preferred where available; frameworks never averaged). The **low** side carries a
graded flag (the clinically meaningful direction), mirroring the two-sided Creatinine/Haemoglobin/ALP structure;
the **high** side carries a dehydration flag.

| BioSense Wellness Interpretation | Albumin (g/dL) | Evidence anchor | Wellness meaning (context-first, hs-CRP-anchored; no diagnostic label) |
|---|---|---|---|
| **Marked Low — Flag** | < 3.0 | More-urgent low [A6] | Marked low; read with hs-CRP (inflammation), LFT (hepatic), creatinine (renal); route. |
| **Low — Flag** | 3.0 – < 3.5 | Low (hypoalbuminaemia) [A6] | Low; protein/synthesis/inflammation/renal-loss direction; read with hs-CRP. |
| **Low-Normal — Watch** | 3.5 – < 4.0 | Low end of range [A20] | Low-normal; esp. in older/chronically ill may signal a meaningful decline worth monitoring. |
| **Optimal (Wellness)** | 4.0 – URL_ref | Wellness-optimal [A20] | Wellness-optimal (healthy liver, nutrition, no inflammation). |
| **High — Watch (Dehydration)** | > URL_ref | High = dehydration [A10] | High — almost always relative dehydration/hemoconcentration; check hydration/pre-analytic; not overproduction. |

*(Genuinely two-sided, low-dominant: a graded low side AND a high/dehydration flag. Read with hs-CRP (primary)
+ the liver panel + creatinine/eGFR; the pattern sets the meaning (§11.4). Age/pregnancy overlays modify
interpretation (§11.2). Ranges & methods differ; shown, never averaged (§11.5). g/dL; g/L = ×10.)*

## 11.2 Age, pregnancy & method overlays [A][B]
- **Age:** albumin **falls slightly with age** — a low-normal value in an older adult may be less concerning
  than the same in a young adult. **[A][A16]**
- **Pregnancy:** albumin production is **decreased in pregnancy** (with plasma-volume expansion) → a lower value
  is physiological; do not over-flag. **[A][A17]**
- **Assay method:** **BCG overestimates** vs **BCP**; use the lab's own method/range where provided. **[A][A18]**
- **Pre-analytic:** prolonged tourniquet falsely raises; IV fluids dilute; diuretics/dehydration concentrate. **[A][A19]**

## 11.3 How the bands were derived — transparency [B]
- The bands use an **adult reference window** (LRL 3.5 / URL 5.0 default) with a **wellness-optimal** zone
  (≥4.0), a **graded low side** (low-normal watch 3.5–<4.0; low 3.0–<3.5; marked low <3.0, reflecting the
  more-urgent threshold), and a **high/dehydration flag** (>URL). **[A2][A6][A10][A20]**
- **No number was averaged.** The differing reference-range and method frameworks are presented distinctly
  (§11.5). **[R5]**
- Albumin is **genuinely two-sided, low-dominant**: the low side carries the graded clinical signal; the high
  side is a dehydration flag. **[A6][A10]**

## 11.4 The interpretation-pattern (companion) layer (the unit of interpretation) [A][B]
| Albumin | Companion pattern | Pattern hint (NOT a diagnosis) | Anchor |
|---|---|---|---|
| high | ± other proteins raised; hydration/pre-analytic context | Relative-dehydration/hemoconcentration pattern (the default for high) | A10, A19 |
| low | + HIGH hs-CRP | Inflammation-driven pattern (negative acute-phase) | A8, A9 |
| low | + normal/low hs-CRP | Nutrition/synthesis pattern — but NOT a standalone nutrition marker (ASPEN) | A9, A12 |
| low | + ALT↑/AST↑ or ALP↑/GGT↑/bilirubin↑ | Impaired hepatic-synthesis pattern | A15 |
| low | + creatinine↑ / eGFR↓ | Renal-protein-loss pattern | A15 |

The pattern is emitted **only with the relevant companions** (hs-CRP unavailable → driver unresolved, screen-
level), inherits the lower input confidence, **distinguishes hydration vs inflammation vs nutrition vs hepatic-
synthetic vs renal-loss**, ranks patterns first, and **names no condition** (§0.5, §12). **[A][B][R4][R9]**

## 11.5 Guideline-disagreement display (reused posture) [B][C]
Where relevant, BioSense shows the differing adult reference ranges (3.5–5.0 / 3.5–5.4 / 3.4–5.4 g/dL; 35–50 /
35–55 g/L), the low thresholds (<3.5; <3.0), and the assay methods (BCG vs BCP) as distinct frameworks — **never
averaged** (CAV11). **[B][C][R5][A2][A18]**

## 11.6 Context-gate precedence [D]
No band or pattern is emitted as a verdict without the Context-First evaluation (§0.2). hs-CRP, the panel,
hydration/pre-analytic status, age/pregnancy, and assay method are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general non-pregnant adult**, read **with hs-CRP**. Reference ranges and assay methods are
contested; albumin is slow-moving and non-specific (inflammation dominates), not a nutrition marker, and lower
with age/pregnancy. **[E][A25][A12]**

---

# 12. Interpretation Framework — CONTEXT-FIRST + NEVER-IN-ISOLATION (reused SCL-010 cross-biomarker + SCL-016/017/018/019/021/022/023 inheritance)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010), cross-biomarker
> intelligence (SCL-010), and confidence inheritance (SCL-016/017/018/019/021/022/023), and follows the frozen
> pattern logic (GGT/ALP/Bilirubin) and two-sided precedent (SCL-016/019/022). Albumin is interpreted as a
> context-dependent, hs-CRP-anchored multi-system screen, never a diagnosis, and never in isolation. No new
> methodology is introduced.** **[C][R1][R4][R9]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1][B3]
   gather context (companions: hs-CRP (SCL-006, PRIMARY), ALT (SCL-014), AST (SCL-015), GGT (SCL-021), ALP
   (SCL-022), Bilirubin (SCL-023) [hepatic]; Creatinine/eGFR (SCL-016) [renal]; Haemoglobin (SCL-019); hydration
   status; illness; pregnancy; nutritional status; assay method).                                   [R4]
   → if material context changes meaning, interpret WITHIN it; if hs-CRP/companions unavailable, record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit g/dL [g/L]; result final; method noted) → else display-only/flag.
STEP 2 — ELIGIBILITY / LIFE-STAGE: non-pregnant adult → apply bands; older adult → age overlay (slightly lower); pregnancy → decreased-production overlay + route context. [A16,A17]
STEP 3 — CONFIDENCE (four-level + inheritance): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED; pattern inherits lower of albumin/companions; distinguishes hydration/inflammation/nutrition/hepatic-synthetic/renal-loss (§0.6). [R2,R9]
STEP 4 — BAND: assign the genuinely two-sided (low-dominant) band (§11.1) with age/pregnancy overlay. [R6,R8]
STEP 5 — PATTERN: if companions present, resolve the pattern (§11.4 — dehydration / inflammation / nutrition / hepatic-synthetic / renal-loss); else screen-level statement. [R4]
STEP 6 — RANKED PATTERNS: abnormal with ≥2 plausible patterns → Possible Explanation A/B/C, ranked (the five patterns; high → dehydration default). [R3]
STEP 7 — REPEAT: new abnormal value → suggest REPEAT (with hs-CRP; note hydration/illness); compare to the person's own prior values (slow-moving). [A14,A7]
STEP 8 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); not-a-nutrition-marker framing where relevant; route where appropriate; NO diagnosis. [R7]
```

**Core interpretive stance [B]:** albumin is a context-first, hs-CRP-anchored, genuinely two-sided (low-dominant)
multi-system screen — read with hs-CRP, the liver panel, creatinine/eGFR, and haemoglobin, with age/pregnancy
overlays, the pattern ranked rather than one asserted, high treated as dehydration, reference and method
disagreement shown honestly, abnormal values repeated (against the person's own history) before they count, no
condition named, and never used to diagnose malnutrition. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy + inheritance — reused SCL-010 + SCL-016/017/018/019/021/022/023)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear albumin AND hs-CRP available (driver resolvable) AND key panel (LFT/creatinine) AND age/life-stage known AND no unexcluded pre-analytic confound | Band + pattern + ranked patterns normally |
| **REDUCED** | Single value / near a boundary / method(BCG/BCP)-or-age overlay uncertain / minor context | Band cautiously; prefer repeat; name the reducer (CAV4/CAV5) |
| **CONTEXT_REQUIRED** | Low albumin with no hs-CRP (driver unresolved) OR high albumin with no hydration context OR unexcluded confound (acute illness / IV fluids / tourniquet) | Screen-level + request hs-CRP/panel/hydration/repeat; name needed context (CAV3/CAV6) |
| **ABSTAINED** | Significant uncertainty / conflicting signals / marked low / hepatic-synthetic or renal-loss pattern | Explained abstention; route |

**Inheritance (reused SCL-016/017/018/019/021/022/023):** the albumin+companion pattern verdict inherits the
**lower** confidence of its inputs, and this is exactly **how a hydration pattern is distinguished from an
inflammation, nutrition, hepatic-synthetic, or renal-loss pattern**; if hs-CRP/companions are unavailable,
albumin is limited to a **screen-level** statement, not asserted. **[R9]**

Reducers/context inputs: hs-CRP absent (driver unresolved) [A9]; single value / slow-moving [A7]; method
uncertainty (BCG/BCP) [A18]; pre-analytic (tourniquet/IV fluids) [A19]; acute illness (transient low) [A14];
age/pregnancy overlay [A16][A17]; near a band boundary. **[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant uncertainty
**may** justify abstention; a new abnormal value prefers a **repeat** framing (with hs-CRP; against the person's
own prior results). **[R2][A7]**

---

# 14. Wellness Interpretation  *(context-first, hs-CRP-anchored, two-sided low-dominant, ranked patterns)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate. Wellness, not medical;
**never a diagnosis**; always **read with hs-CRP & the wider picture**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal (Wellness)** *(≥4.0; normal companions).* "Your albumin — a
  slow-moving protein made by your liver that reflects protein status, liver synthesis, hydration and
  inflammation — sits in a favourable range, and read with hs-CRP there's nothing here that stands out. It's a
  medium-term signal, and this looks settled." **[B]**
- **BioSense Wellness Interpretation: Low-Normal — Watch** *(3.5–<4.0).* "Your albumin is at the low end. Often
  that's nothing — but especially with age or a recent illness it's worth reading alongside hs-CRP and keeping
  an eye on over time." Calm; context; **no diagnosis** (CAV5, CAV10). **[B][D][A20]**
- **BioSense Wellness Interpretation: Low / Marked Low — Flag** *(<3.5).* "Your albumin is low. Because that can
  come from inflammation, liver synthesis, kidney loss or (less specifically) nutrition, the key next read is
  hs-CRP: raised alongside points to inflammation, normal points more to a nutrition or liver-synthesis picture.
  We've noted the more likely pattern for your context, and reading it with your liver and kidney markers and
  repeating it is sensible." Constructive; **no diagnosis**; **not a nutrition verdict** (CAV3, CAV6, CAV9).
  **[B][D][A9][A12]**
- **BioSense Wellness Interpretation: High — Watch (Dehydration)** *(>URL).* "A high albumin is almost always
  just relative dehydration — the blood is a little concentrated — rather than your body making too much.
  Rehydrating and repeating (and checking the sample wasn't affected by a long tourniquet) usually settles it."
  Calm; **no diagnosis** (CAV8). **[B][D][A10]**
- **BioSense Wellness Interpretation: inflammation (low + high hs-CRP) / hepatic-synthetic (low + LFT↑) /
  renal-loss (low + creatinine↑) / marked low / oedema.** Calm routing: "This pattern is worth a prompt,
  unhurried conversation with a healthcare professional, who can look at the fuller picture. The numbers alone
  don't diagnose anything." **No alarm, no diagnosis** (CAV7). **[B][D][A9][A15]**
- **Older adult / pregnancy.** "Albumin naturally runs a little lower with age and in pregnancy, so a slightly
  low value in those contexts is read in that light." Reassure/route (CAV10). **[B][D][A16][A17]**

**Pattern modifier:** where companions are available, present the pattern (dehydration / inflammation /
nutrition / hepatic-synthetic / renal-loss) as **context**, distinguishing the drivers; where hs-CRP/companions
are absent, give a **screen-level** statement and name that hs-CRP & the panel complete the picture (CAV3). The
pattern confidence **inherits the lower** input (§0.6). **[D][R4][R9]**

**Ranked-patterns modifier (reused):** on any abnormal albumin with ≥2 plausible patterns, present **Possible
Explanation A/B/C** ordered by evidence + context (the five patterns; high → dehydration default) — never a
single certain cause, never a named condition. **[D][R3]**

**Not-a-nutrition-marker modifier:** a low albumin is never presented as proof of poor nutrition; hs-CRP
separates inflammation from a nutrition/synthesis picture, and ASPEN cautions against using albumin to diagnose
malnutrition (CAV9). **[D][A12]**

**Age/pregnancy overlay modifier:** apply the age (slightly lower) and pregnancy (decreased production) context;
never over-flag physiological variation (CAV10). **[D][A16][A17]**

**Context-unavailable modifier:** where **hs-CRP** (or the panel / hydration / age / pregnancy context) is
missing, state the confidence limitation and name what would clarify (CAV3/CAV4); never invent certainty (S10).
**[D][R4]**

Every interpretation pairs the band and pattern with context guidance (§17) and the mandatory caveats (§0.10).
**None diagnoses liver failure, nephrotic syndrome, malnutrition, a chronic inflammatory disease, or cancer,
none asserts a single cause, none treats a BioSense band or pattern as a medical boundary, and none uses albumin
to judge nutrition on its own.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for albumin).** Low albumin with **no hs-CRP** (driver unresolved), high
  albumin with **no hydration context**, or an unexcluded confound (acute illness / IV fluids / tourniquet) →
  screen-level + request hs-CRP/panel/hydration/repeat; state what's needed (§13, CAV3/CAV6). **[D][R2]**
- **15.2 Acute illness.** A mild low during an acute illness (pneumonia, autoimmune flare) is **expected** and
  often normalises on recovery — interpret as a transient inflammation-related dip, not disease. **[D][A14]**
- **15.3 Older adults.** Albumin falls slightly with age; a low-normal value may be less concerning — apply the
  age overlay, don't over-flag. **[D][A16]**
- **15.4 Pregnancy.** Albumin production is decreased in pregnancy → a lower value is physiological; route
  context, don't over-flag. **[D][A17]**
- **15.5 High albumin (dehydration).** Treat as relative dehydration/hemoconcentration unless evidence otherwise;
  check hydration and pre-analytic (tourniquet/IV fluids); rehydrate & repeat. **[D][A10][A19]**
- **15.6 Inflammation / hepatic-synthetic / renal-loss patterns.** Low albumin with high hs-CRP, raised liver
  enzymes, or raised creatinine → route the relevant pattern context; don't diagnose. **[D][A9][A15]**
- **15.7 Nutrition context.** A low albumin is **not** proof of malnutrition (ASPEN); use hs-CRP to separate
  inflammation from a nutrition/synthesis picture; never diagnose malnutrition. **[D][A12][A22]**
- **15.8 Red flags.** Marked low (<3.0); low albumin with high hs-CRP; low albumin with a hepatic-synthetic or
  renal-loss pattern; low albumin with oedema/systemic symptoms → calm prompt healthcare review regardless of
  band. **[D][A6][A9][A24]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Own-history comparison suits a slow-moving marker. [A]** Because albumin turns over slowly (~3-week
  half-life) and varies by method, the person's **own prior values by the same method** are often the most
  useful reference. **[A7][A25]**
- **Repeat abnormal values with hs-CRP. [A]** A new abnormal value is repeated **with hs-CRP** (and hydration/
  illness noted) before it means anything; a mild low during acute illness is expected and often normalises. **[A14]**
- **Direction of change matters. [A]** A **falling** albumin with a **rising** hs-CRP suggests worsening
  inflammation; a recovering albumin after an illness suggests resolving inflammation rather than improved
  nutrition. **[A9]**
- **Slow to respond. [A]** Albumin is a medium-term signal — it will not shift day-to-day; prealbumin responds
  faster but is also a negative acute-phase reactant. **[A7][A13]**
- **Context/abstained points. [C]** Acute illness, IV fluids, tourniquet, pregnancy, and context-required
  (no-hs-CRP) points are tagged so they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For albumin, the first tier is **hs-CRP and the panel**, then context-appropriate lifestyle. **[A]/[B]**

## 17.1 hs-CRP & panel first [A][A9][A15]
Where albumin is abnormal, the clarifying steps are **hs-CRP** (inflammation vs nutrition/synthesis), the **liver
panel** (ALT/AST/GGT/ALP/bilirubin — hepatic synthesis), **creatinine/eGFR** (renal loss), the **hydration/
pre-analytic review** (for a high value), and — for a new value — a **repeat with hs-CRP** (against the person's
own history). **[A]**

## 17.2 General wellness context [A][A10][A14]
General wellness — **adequate hydration** (a high albumin usually just means drink more water), **balanced
protein-containing nutrition**, **managing inflammation**, and supporting **liver and kidney wellness** — is
relevant context; a mild low during an acute illness is expected and usually recovers. Framed as **education, not
treatment**. **[A]**

## 17.3 Not-a-nutrition-marker context [A][A12][A22]
Albumin is **not** a reliable standalone nutrition marker — it falls with inflammation regardless of diet — so a
low value is **not** presented as proof of poor nutrition; hs-CRP is used to separate the two. **[A]**

## 17.4 Framing rules [B][D]
hs-CRP and panel first (repeat for new abnormal, with hs-CRP); **no specific treatments, medication changes, or
doses** (S11); reference-range and method disagreement shown, never averaged; high treated as dehydration; never
a diagnosis; never a malnutrition verdict; calm, evidence-informed language; the hs-CRP-anchored (CAV2),
screen-only (CAV3), dehydration (CAV8), not-a-nutrition-marker (CAV9), age/pregnancy (CAV10), and reference
(CAV11) caveats attached where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain that albumin is a slow-moving, multi-system protein read **with** hs-CRP and the
panel; run the context-first evaluation; assign the genuinely two-sided (low-dominant) band with age/pregnancy
overlays; resolve the pattern (with inherited confidence, distinguishing hydration/inflammation/nutrition/
hepatic-synthetic/renal-loss) when companions are present; integrate hs-CRP, the liver panel, creatinine/eGFR and
haemoglobin; present **ranked** patterns for an abnormal value; treat a high value as dehydration; recommend a
repeat (with hs-CRP, against the person's own history); name which companions would clarify; express context-
required/abstention respectfully.

The AI layer **must never**:
- emit "liver failure", "cirrhosis", "nephrotic syndrome", "kidney failure", "malnutrition", "kwashiorkor", "chronic inflammatory disease", "inflammatory bowel disease", "sepsis", or "cancer" as a diagnosis — even to deny one (S1)
- interpret albumin in isolation, or emit a pattern read without the relevant companions (esp. hs-CRP) (S2, S3)
- assert a single pattern/cause for an abnormal albumin when ≥2 are plausible — rank them (S4)
- interpret a HIGH albumin as overproduction — treat it as relative dehydration/hemoconcentration unless evidence otherwise (S5)
- diagnose malnutrition from albumin, or present a low albumin as proof of poor nutrition — it is not a standalone nutrition marker (ASPEN) (S7)
- ignore life-stage (albumin falls slightly with age & is decreased in pregnancy; don't over-flag) (S8)
- treat a transient low during acute illness as chronic disease (S9)
- load interpretation onto a new/isolated abnormal value without a repeat and hs-CRP (S9)
- recommend treatments, medication changes, or doses (albumin infusions, protein prescriptions, diuretic changes); produce a liver/kidney/mortality-risk % (S11)
- invent certainty when hs-CRP/companions are unavailable — state the limitation and inherit confidence (S10)
- fail to route red flags (marked low; low + high hs-CRP; hepatic-synthetic or renal-loss pattern; oedema/systemic symptoms) calmly and promptly (S12)
- present a BioSense band, range, optimal target, or pattern as a medical/diagnostic boundary (S13)
- average contested reference ranges or assay methods (S14)

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any liver, kidney,
nutritional, inflammatory, or malignant condition is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes patterns,
  never names liver failure/nephrotic syndrome/malnutrition/chronic inflammatory disease/cancer (S1). **[D][R7]**
- **Never-in-isolation honesty.** Albumin is presented as a screen whose driver depends on hs-CRP and the panel;
  pattern reads only with companions, else screen-level + inherited confidence (S2, S3, CAV2, CAV3). **[D][B2]**
- **Ranked, not asserted.** Where several patterns fit, they are ranked by evidence + context, never reduced to
  one (S4, CAV6). **[D][R3]**
- **High = dehydration.** A high albumin is treated as relative dehydration/hemoconcentration, not overproduction
  (S5, CAV8). **[D][A10]**
- **Not a nutrition marker.** A low albumin is never presented as proof of poor nutrition; malnutrition is never
  diagnosed (S7, CAV9). **[D][A12]**
- **Two-sided, low-dominant.** The low side is the graded clinical direction (mild <3.5, marked <3.0); the high
  side is a dehydration flag (S6). **[D][A6]**
- **Life-stage aware.** Albumin falls slightly with age & is decreased in pregnancy; don't over-flag (S8, CAV10).
  **[D][A16][A17]**
- **Repeat-first + own-history + transient-illness reassurance.** New abnormal → repeat with hs-CRP; a mild low
  during acute illness is expected and usually recovers; slow-moving → compare own prior values (S9, CAV5). **[D][A14]**
- **Calm red-flag routing.** Marked low, low + high hs-CRP, hepatic-synthetic or renal-loss pattern, or oedema/
  systemic symptoms → prompt, unhurried review; never emergency-diagnose (S12, CAV7). **[D][A6][A9]**
- **No treatment/medication guidance.** Never advise albumin infusions, protein prescriptions, or diuretic
  changes; educate + refer (S11). **[D]**
- **Missing hs-CRP/companions stated, not invented** (S10). **[D][R4]**
- **Correct unit handling.** g/dL with the simple ×10 g/L factor (a protein mass concentration, not an enzyme
  activity, not a cell count); pattern requires companions. **[D][A5]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. Albumin is **marked low** (<3.0 g/dL). **[A6]**
2. Low albumin with a **high hs-CRP** (inflammation pattern) that persists. **[A9]**
3. Low albumin with a **hepatic-synthetic** (raised liver enzymes) or **renal-loss** (raised creatinine)
   pattern. **[A15]**
4. Low albumin with **oedema or systemic symptoms**. **[A24]**
5. An abnormal value **persists** after a repeat (with hs-CRP and hydration accounted for). **[A14]**
6. The user **asks a medical/medication/nutrition question** (S11). **[D]**

All suggestions are wellness-framed, non-urgent (unless red flags), non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-024 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for albumin (g/dL [g/L]) plus sex, age,
  pregnancy, assay-method (BCG/BCP), and pre-analytic (tourniquet/IV-fluid) metadata, and — as interpretation
  inputs — **hs-CRP (SCL-006, primary discriminator), ALT (SCL-014), AST (SCL-015), GGT (SCL-021), ALP
  (SCL-022), Bilirubin (SCL-023)** [hepatic], **Creatinine/eGFR (SCL-016)** [renal], and **Haemoglobin
  (SCL-019)**, plus declared context (hydration status, illness, nutritional status). **[R4]**
- **Supplies (as CSL bindings):** the genuinely two-sided (low-dominant) albumin bands (Category B), the
  **interpretation-pattern layer** (the five patterns), the reused Context-First gate, the reused four-level
  confidence hierarchy **with inheritance** (distinguishing hydration/inflammation/nutrition/hepatic-synthetic/
  renal-loss), the reused ranked multiple-explanations output, the reused cross-biomarker consumption (with
  graceful degradation to a screen-level read), the reference-range and assay-method disagreement display, the
  high-is-dehydration default, the not-a-nutrition-marker rule, the age/pregnancy overlays, safety rules, context
  guidance, and narrative templates — each with value + source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, cross-biomarker intelligence, the
  confidence hierarchy, and the multiple-explanations output (all frozen from SCL-010); **confidence inheritance
  (SCL-016/017/018/019/021/022/023)** for the pattern layer; the **genuinely-two-sided structure (SCL-016/019/
  022)**; sex/age/pregnancy-aware banding (SCL-004/010/016/017/018/019/022/023); the guideline-disagreement
  posture (SCL-003/011/012); and the diagnostic-adjacency discipline (SCL-002/009/011/012/014/015/016/017/018/
  019/021/022/023). **The never-in-isolation, hs-CRP-anchored interpretation is represented within cross-
  biomarker intelligence + inheritance — the same pattern logic already built for GGT/ALP/Bilirubin — not as a
  new methodology.** **[C][R1][R4][R9]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (hs-CRP anchors the driver, the
  pattern inherits confidence — never averaged into a single verdict; contested reference ranges & methods never
  averaged; albumin never interpreted in isolation; high treated as dehydration; malnutrition never diagnosed;
  physiological age/pregnancy variation never over-flagged).
- **Uses the correct unit handling** (g/dL; g/L = ×10; a protein mass concentration, not an enzyme activity or a
  cell count) — a per-analyte configuration.
- **Score contribution:** albumin contributes to a **chronic-health / liver-kidney-inflammation-wellness**
  context as a sex/age/pregnancy-aware, context-gated, hs-CRP-anchored input — the interpretation pattern
  (governed by inheritance) as the headline and albumin alone as a screen-level signal — with abnormal values
  expressed as ranked-pattern context rather than a verdict; context-required/abstained values do not contribute
  a definite verdict; a high value is scored as dehydration, not a benefit or a deficit. Any weighting is a
  Category [C] product decision. **[C]**

---

# 22. Medication, Hydration & Exposure Context (educational only)

Educational context only; BioSense does not instruct on treatment, dose, or medication changes (S11). **[D]**
- **Hydration:** a high albumin usually just reflects being a little dehydrated (hemoconcentration); IV fluids
  dilute it, diuretics/dehydration concentrate it — context, not a diagnosis. **[A][A10][A19]**
- **Acute illness / inflammation:** transiently lowers albumin (negative acute-phase reactant) — expected,
  usually recovers. **[A][A8][A14]**
- **Pregnancy / age:** lower albumin is physiological — context, not a flag. **[A][A16][A17]**
- **Assay method (BCG/BCP):** can shift the number; prefer the lab's own method/range. **[A][A18]**
- **Albumin infusions / protein prescriptions / diuretics:** clinical treatments outside BioSense's scope;
  mentioned only as context, never recommended. **[A][A11]**
- Any medication, hydration, or nutrition question → educational context + suggestion to speak with a healthcare
  professional; BioSense never advises starting, stopping, or changing a medication or prescribing nutrition.
  **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Albumin needs hs-CRP and the panel. [E]** Alone it is a screen; the pattern + inheritance handle this. **[A9][A14]**
2. **Reference ranges & methods are contested. [E]** BCG overestimates vs BCP; ranges differ; shown, never
   averaged. **[A18][A25]**
3. **Optimal & risk targets are evolving. [E]** Optimal ≥4.0; mortality associations observational — shown as
   evolving. **[A20][A21]**
4. **It is slow-moving and non-specific. [E]** Inflammation dominates; a medium-term signal; repeat + own-history
   mitigate. **[A7][A8]**
5. **It is NOT a nutrition marker. [E]** ASPEN; never diagnose malnutrition; hs-CRP separates inflammation from
   nutrition/synthesis. **[A12][A22]**
6. **High = dehydration. [E]** Almost always hemoconcentration, not overproduction. **[A10]**
7. **Companion/hs-CRP availability is data-dependent. [E]** Without hs-CRP/the panel, only a screen-level
   statement is possible; the pattern degrades to a confidence limitation, not certainty. **[R4][R9]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**; hs-CRP-
anchored; context-first; two-sided low-dominant; ranked patterns; high=dehydration; not-a-nutrition-marker;
age/pregnancy overlays). **[B]/[D]**
(Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL_WELLNESS (>= 4.0 ; normal companions)
"Your albumin is {value} g/dL — a favourable range — and read with hs-CRP there's nothing here that stands out.
 It's a slow-moving, medium-term signal, and this looks settled."  +CAV1 +CAV2

TEMPLATE: LOW_NORMAL_WATCH (3.5–<4.0)
"Your albumin is {value} g/dL — at the low end. Often that's nothing, but especially with age or a recent
 illness it's worth reading alongside hs-CRP and keeping an eye on over time."  +CAV1 +CAV2 +CAV5 +CAV10

TEMPLATE: LOW / MARKED_LOW_FLAG (<3.5)
"Your albumin is {value} g/dL — low. Because that can come from inflammation, liver synthesis, kidney loss or
 (less specifically) nutrition, the key next read is hs-CRP: raised alongside points to inflammation, normal
 points more to a nutrition or liver-synthesis picture. Here are the more likely patterns for your context
 rather than one: {ranked A/B/C}. Reading it with your liver and kidney markers and repeating it is sensible."
 +CAV1 +CAV2 +CAV3 +CAV6 +CAV9

TEMPLATE: HIGH_WATCH_DEHYDRATION (> URL)
"Your albumin is {value} g/dL — high. That's almost always just relative dehydration — the blood is a little
 concentrated — rather than your body making too much. Rehydrating and repeating usually settles it."  +CAV1 +CAV8

TEMPLATE: RED_FLAG (marked low ; low + high hs-CRP ; hepatic-synthetic ; renal-loss ; oedema — CALM ROUTING)
"This pattern is worth a prompt, unhurried conversation with a healthcare professional, who can look at the
 fuller picture. The numbers alone don't diagnose anything."  +CAV1 +CAV2 +CAV7

MODIFIER: PATTERN (companions present) →
 "With hs-CRP and your panel, the pattern reads as {relative-dehydration | inflammation | nutrition/synthesis |
  hepatic-synthetic | renal-loss} context — a hint, not a diagnosis, read with your wider picture."  +CAV2

MODIFIER: SCREEN_ONLY (no hs-CRP/companions) →
 "On its own, a low albumin doesn't say why. hs-CRP is the usual next step — raised alongside points to
  inflammation, normal points more to nutrition or liver synthesis — so we'd interpret this more confidently with
  it and your liver and kidney markers."  +CAV3

MODIFIER: RANKED_PATTERNS (abnormal, ≥2) →
 "Most-to-least likely for your context: A {…}, B {…}, C {…} — best confirmed with a professional."  +CAV6

MODIFIER: NOT_NUTRITION → "Albumin isn't a reliable stand-alone nutrition marker — it drops with inflammation regardless of diet — so a low value doesn't by itself mean poor nutrition."  +CAV9
MODIFIER: AGE_PREGNANCY → "Albumin naturally runs a little lower with age and in pregnancy, so a slightly low value in those contexts is read in that light."  +CAV10
MODIFIER: REFERENCE → "Albumin reference ranges and lab methods (BCG vs BCP) differ, so we compare against your own lab's range."  +CAV11
```

**Absolute rules:** no template diagnoses liver failure/nephrotic syndrome/malnutrition/chronic inflammatory
disease/cancer, asserts a single cause, emits a pattern read without companions, interprets albumin in
isolation, interprets a high value as overproduction, presents a low value as proof of poor nutrition,
over-flags an age/pregnancy physiological value, treats a band/pattern as a diagnostic boundary, alarms, or
averages reference ranges. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, normal hs-CRP. [illustrative]**
```
Input: albumin 4.4 g/dL (adult), hs-CRP normal.
Band: OPTIMAL_WELLNESS | Pattern: none | Confidence: STANDARD
Narrative: OPTIMAL +CAV1+CAV2.  [A20]
```

**Example 2 — Low albumin + high hs-CRP (inflammation). [illustrative]**
```
Input: albumin 3.2 g/dL, hs-CRP raised.
Band: LOW_FLAG + pattern (inflammation) | Confidence: STANDARD→route
Narrative: inflammation-driven context (negative acute-phase; read with hs-CRP, SCL-006) +CAV2 +CAV9 ; NO "chronic inflammatory disease" diagnosis.  [A8,A9,S1]
```

**Example 3 — Low albumin, no hs-CRP. [illustrative]**
```
Input: albumin 3.3 g/dL, no hs-CRP/panel.
Band: LOW_FLAG | Pattern: driver NOT resolvable | Confidence: CONTEXT_REQUIRED
Narrative: screen-only +CAV3 ; request hs-CRP + liver/kidney markers ; +CAV6 ; NO diagnosis ; NOT a nutrition verdict +CAV9.  [A9,R9,S3]
```

**Example 4 — Low albumin + raised creatinine (renal-loss). [illustrative]**
```
Input: albumin 3.0 g/dL, creatinine raised / eGFR low.
Band: MARKED_LOW/LOW + pattern (renal-loss) | Confidence: STANDARD→route
Narrative: renal-protein-loss context (read with creatinine/eGFR, SCL-016) +CAV7 ; NO "nephrotic syndrome" diagnosis.  [A15,S1]
```

**Example 5 — High albumin. [illustrative]**
```
Input: albumin 5.3 g/dL (URL 5.0).
Band: HIGH_WATCH_DEHYDRATION | Pattern: relative dehydration | Confidence: REDUCED→rehydrate/repeat
Narrative: dehydration/hemoconcentration +CAV8 ; check hydration/tourniquet ; NOT overproduction ; rehydrate + repeat.  [A10,A19,S5]
```

**Example 6 — Low-normal in an older adult. [illustrative]**
```
Input: albumin 3.6 g/dL, age 82, hs-CRP normal.
Band: LOW_NORMAL_WATCH + age overlay | Confidence: REDUCED (age)
Narrative: low-normal, age-adjusted +CAV10 ; monitor over time ; NO flag/diagnosis.  [A16,A20,S8]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-006 (hs-CRP)** — the **primary discriminator**; the albumin+hs-CRP pair (low + high CRP → inflammation;
  low + normal CRP → nutrition/synthesis) is the heart of albumin interpretation.
- **SCL-014 (ALT) / SCL-015 (AST) / SCL-021 (GGT) / SCL-022 (ALP) / SCL-023 (Bilirubin)** — the hepatic-synthetic
  companions; low albumin with a hepatocellular or cholestatic pattern → impaired hepatic synthesis.
- **SCL-016 (Creatinine + eGFR)** — the renal companion; low albumin with raised creatinine → a renal-loss
  pattern; and precedent for the reused two-sided structure and confidence inheritance.
- **SCL-019 (Haemoglobin)** — chronic-health cross-read; and precedent for two-sided/context-first banding.
- **SCL-010 (Ferritin)** — source of the reused Context-First Interpretation Framework, cross-biomarker
  intelligence, four-level confidence hierarchy, and multiple-explanations output.
- **SCL-022 (ALP) / SCL-023 (Bilirubin)** — precedent for the reused companion-pattern layer with confidence
  inheritance.
- **SCL-011 (Vitamin D) / SCL-012 (B12)** — precedent for guideline-disagreement / multi-framework display.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the A-series IDs in §0 and
> the body. Developers finalising the pack should confirm exact page/table locators against the primary sources
> where required.

**Definition, ranges, physiology (Category A anchors)**

1. **Biology Insights (What Do Albumin Levels Indicate).** — *albumin most abundant plasma protein, made by
   liver; oncotic pressure + transport; reflects liver, inflammation, kidney protein retention; normal 3.5–5.0
   g/dL; a single reading is a starting point not a diagnosis; mild low during acute illness expected & often
   normalises; persistently <3.0 warrants closer look; high → often just dehydration (A1, A2, A6, A14).*
2. **Superpower (Albumin biomarker guide).** — *reference 3.5–5.0 g/dL; <3.5 low & warrants follow-up; low + high
   hs-CRP → inflammation, low + low hs-CRP → nutrition/synthesis; liver disease reduces synthesis, kidney disease
   increases loss, IV fluids dilute, diuretics/dehydration concentrate; ALT↑/ALP↑+GGT↑/creatinine↑ cross-reads;
   low-end values in older/chronically ill worth monitoring (A2, A6, A9, A11, A15, A20).*
3. **MDTools (Albumin Levels).** — *normal 3.4–5.4 g/dL; high (>5.4) essentially always hemoconcentration from
   dehydration (liver doesn't upregulate to supranormal); albumin NOT a nutrition marker (ASPEN — do not use to
   diagnose malnutrition); negative acute-phase reactant (IL-6); BCG vs BCP method; tourniquet artifact; prealbumin
   half-life 2–3 days also negative acute-phase; anion-gap correction (A3, A10, A12, A13, A18, A19, A23).*
4. **Medscape (Albumin: Reference Range, Interpretation).** — *adults 3.5–5.0 g/dL or 35–55 g/L; ~40%
   intravascular / 60% extravascular; albumin production decreased in pregnancy; large IV fluids → inaccurate;
   severe dehydration → high; persistent hyperalbuminaemia undocumented (A4, A8b, A10, A17).*
5. **Lola Health (Albumin) & Medichecks (What Is Albumin) & Kingsley Clinic & jinfiniti (Albumin Blood Test).**
   — *35–50 g/L (3.5–5 g/dL); <35 g/L low, >50 usually dehydration; negative acute-phase reactant; falls slightly
   with age (34 g/L in an 80-yr-old less concerning than in a 30-yr-old); pre-surgical low predicts complications/
   mortality; monitors cirrhosis/IBD/CKD; high 3.5–5.4; optimal indicates healthy liver/nutrition/no inflammation;
   longevity biomarker (A2, A3, A4, A6, A8, A16, A20, A21).*

**Half-life, hs-CRP distinction, negative acute-phase, method (Category A)**

6. **myhealthcare (Albumin Test).** — *long plasma half-life ~18–21 days → medium-term nutritional/hepatic
   indicator, slow-to-respond acute marker; albumin low + CRP high = inflammation-driven, albumin low + CRP
   normal/low = true nutritional deficit; prealbumin (15–36 mg/dL; <11 severe) faster; ICU: virtually every
   critically ill patient hypoalbuminaemic (A7, A9, A13).*
7. **PMC7416942 (albumin & mortality, SCD) & PMC4630897 (perioperative albumin/CRP).** — *liver produces ~14 g
   albumin/day; total half-life ~21 days; determined by synthesis, degradation, intra/extravascular distribution;
   <35 g/L low; negative acute-phase protein (transcapillary escape rises >300% in septic shock);
   hypoalbuminaemia a risk factor for mortality/complications; age, inflammation, chronic renal disease predictors
   (A7, A8, A8b, A21).*
8. **MDTools (Albumin — method) & Oxford Lab Med (BCG vs BCP, Ueno et al).** — *BCG overestimates albumin vs BCP
   due to non-specific reaction with α-globulins (acute-phase reactants); BCP more specific, may underestimate;
   immunonephelometric most accurate but not routine (A18).*
9. **PMC7409314 (hypoalbuminaemia, inflammation & nutrition in colorectal cancer) & PMC10470798 (albumin–CRP in
   older adults) & journals.lww (albumin–CRP association) & med.virginia ASPEN (serum proteins as nutrition
   markers).** — *serum albumin does not change with short-term nutrient intake; systemic inflammation reduces
   albumin independent of intake (hepatic reprioritisation); albumin characterises inflammation rather than
   nutrition; hypoalbuminaemia + raised CRP linked to poor outcomes independent of tumour stage; ASPEN cautions
   against albumin/prealbumin as standalone nutrition markers (A12, A22, A21).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–9; they are BioSense
> Version 1 classifications, genuinely two-sided (a graded low side plus a high/dehydration flag) and
> context-gated with age/pregnancy overlays, not attributable to any single reference as a diagnostic threshold,
> and **do not restate diagnostic labels.** The differing adult reference ranges, low thresholds, and assay
> methods (BCG vs BCP) are shown separately and **never averaged**; albumin is presented as an hs-CRP-anchored
> screen, never in isolation, never a diagnosis of liver failure/nephrotic syndrome/malnutrition/chronic
> inflammatory disease/cancer, and never a standalone nutrition verdict; a high value is treated as relative
> dehydration; the pattern is a hint whose confidence inherits the lower input.

---

# 28. Founder Decisions Required

The Albumin methodology reuses frozen BioSense frameworks and represents Albumin via the existing Context-First,
cross-biomarker (hs-CRP-anchored), confidence-inheritance, and guideline-disagreement frameworks, following the
frozen pattern logic and the two-sided precedents. Two optional presentation/policy items remain: **[C][E]**

**D-1 — Confirm the genuinely-two-sided (low-dominant) band structure and the reference/optimal/high presentation.**
SCL-024 bands albumin genuinely two-sided and low-dominant (Marked-Low <3.0; Low 3.0–<3.5; Low-Normal-Watch
3.5–<4.0; Optimal 4.0–URL; High-Watch-Dehydration >URL; LRL_ref 3.5 / URL_ref 5.0 g/dL default, lab's own/method
preferred), with the **low side graded** as the clinically meaningful direction and the **high side treated as
relative dehydration**, the differing adult reference ranges and assay methods (BCG vs BCP) shown side by side and
never averaged, and age (slightly lower) and pregnancy (decreased production) overlays. Confirmation requested
that this genuinely-two-sided, low-dominant presentation (with the wellness-optimal target shown as evolving) is
the intended default. **Founder sign-off requested.**

**D-2 — Confirm the hs-CRP-anchored pattern activation, the not-a-nutrition-marker posture, and the companion-
dependency scope for V1.** SCL-024 emits an **interpretation-pattern read only when the relevant companions
(hs-CRP primary, plus the liver panel and creatinine/eGFR) are available** (else a screen-level statement with
inherited/limited confidence), uses **confidence inheritance to distinguish hydration vs inflammation vs
nutrition vs hepatic-synthetic vs renal-loss patterns**, treats a **high value as relative dehydration**, and
**never uses albumin to diagnose malnutrition** (ASPEN; not a standalone nutrition marker). **Founder decision
requested** on whether V1 activates albumin now — noting that all five patterns are **activatable immediately**
because hs-CRP (SCL-006), ALT (SCL-014), AST (SCL-015), GGT (SCL-021), ALP (SCL-022), Bilirubin (SCL-023),
Creatinine/eGFR (SCL-016) and Haemoglobin (SCL-019) already exist (albumin degrades gracefully to a screen-level
read whenever hs-CRP/the panel is absent).

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-024 v1.0**

*Authored on the frozen SCL-001 template and aligned to the frozen two-sided packs Creatinine (SCL-016),
Haemoglobin (SCL-019) and ALP (SCL-022), the pattern-layer packs GGT (SCL-021), ALP (SCL-022) and Bilirubin
(SCL-023), and the inflammation pack hs-CRP (SCL-006). Every numeric value is either a cited Category [A]
guideline/reference figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. Albumin
reuses frozen BioSense methodology throughout — the Context-First Interpretation Framework, cross-biomarker
intelligence, the four-level confidence hierarchy, and the multiple-explanations output (all from SCL-010),
confidence inheritance (SCL-016/017/018/019/021/022/023, for the pattern layer, distinguishing hydration vs
inflammation vs nutrition vs hepatic-synthetic vs renal-loss), the genuinely-two-sided structure (SCL-016/019/
022), sex/age/pregnancy-aware banding (SCL-004/010/016/017/018/019/022/023), the guideline-disagreement posture
(SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/014/015/016/017/018/019/021/022/
023) — introducing only Albumin-specific scientific content (the thresholds and their genuinely-two-sided
low-dominant structure; the g/dL and g/L units with the ×10 factor; the long half-life and negative acute-phase
status; the five interpretation patterns; the hs-CRP distinction; the high-is-dehydration default; the
not-a-standalone-nutrition-marker nuance; the reference-range and assay-method disagreements; and the age/
pregnancy overlays). Albumin is represented as a long-half-life plasma protein reflecting protein status, hepatic
synthetic function, hydration, inflammation and chronic health — a context-first, hs-CRP-anchored screen whose
low value requires biological context and whose high value is primarily relative dehydration, never interpreted
in isolation, and never a diagnosis of liver failure, nephrotic syndrome, malnutrition, chronic inflammatory
disease, or cancer. No new methodology was required; all structure remains consistent with SCL-001 through
SCL-023.*
