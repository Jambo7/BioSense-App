# SCL-020 — WHITE BLOOD CELL COUNT (WBC)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. White Blood Cell Count is a two-sided, context-first marker of immune-system activity interpreted alongside inflammatory markers, haemoglobin, and the future differential using the existing Cross-Biomarker Intelligence, Confidence Hierarchy, Confidence Inheritance, and Guideline-Disagreement frameworks. Never interpreted in isolation. Never a diagnosis of infection, malignancy, or immune disease. No new methodology introduced.*

**Document ID:** SCL-020
**Biomarker:** White Blood Cell Count (WBC, leukocyte count) — marker of immune-system activity; two-sided; context-first; age/pregnancy/ancestry-aware
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 2 August 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. WBC reuses the frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), cross-biomarker intelligence (SCL-010), the four-level confidence hierarchy (SCL-010), **confidence inheritance** (SCL-016/017/018/019), multiple-explanations output (SCL-010), two-sided banding (SCL-004/009/010/011/012/016/017/018/019), sex/age/pregnancy-aware banding (SCL-004/010/016/017/018/019), guideline-disagreement handling (SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/016/017/018/019) — introducing only WBC-specific scientific content. All sections remain consistent with SCL-001 through SCL-019.

---

> **What this document is.** SCL-020 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for White Blood Cell Count. It reuses existing
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

## STRUCTURAL-FIT NOTE (WBC vs SCL-001) — reuses frozen frameworks; no new pattern

White Blood Cell Count presents the same structural characteristics BioSense has already solved for, and maps
onto the frozen methodology without extension. WBC is a measure of **immune-system activity**, and its meaning
is **inseparable from the differential and surrounding context** — which subtype is driving a change, and
whether a recent infection, vaccination, medication, or physiological state explains it — so it reuses the
Cross-Biomarker Intelligence and Context-First frameworks:

1. **Never-in-isolation interpretation — reused cross-biomarker intelligence (SCL-010) + multiple-explanations
   (SCL-010).** The total WBC screens immune activity, but the meaningful wellness read comes from WBC **plus
   its companions** — the differential (future neutrophils, lymphocytes, eosinophils, monocytes), hs-CRP
   (SCL-006), ferritin (SCL-010), and haemoglobin (SCL-019) — which is exactly a consume-companions-and-rank-
   the-interpretation pattern (§0.5, §9). The total is a screen; the differential and inflammatory context
   explain *why* it is high or low. **WBC is never interpreted in isolation.**
2. **Confidence inheritance — reused (SCL-016/017/018/019).** A WBC-plus-companion pattern **inherits the lower
   confidence** of its inputs; if the differential/context are unavailable, the read is confidence-limited, not
   asserted (§0.6, §13).
3. **Context-First — reused (SCL-010).** WBC is interpreted only after context — recent infection, vaccination,
   surgery/trauma, acute stress, smoking, obesity, pregnancy/labour, medications, corticosteroids, chemotherapy,
   chronic inflammation, and ancestry (benign ethnic neutropenia) — evaluated **before** banding (§0.2, §8, §12).
4. **Two-sided banding with flags — reused.** WBC is meaningfully two-sided: **low** (a leukopenia direction) and
   **high** (a leukocytosis direction), each flagged, with a severity gradient on the high side (§11).
5. **Sex/age/pregnancy-aware banding — reused (SCL-004/010/016/017/018/019).** WBC ranges differ by **age**
   (newborns/children higher), rise in **pregnancy/labour**, and carry an **ancestry** overlay (benign ethnic
   neutropenia), so banding carries age, pregnancy, and ancestry overlays (§11).
6. **Guideline-disagreement handling — reused (SCL-003/011/012).** The range boundaries (lower limit 4.0 vs 4.5
   vs 5.0; upper limit 10.0 vs 11.0 ×10⁹/L) and the benign-ethnic-neutropenia baseline variation are presented
   as distinct frameworks, **never averaged** (§10, §11).
7. **Multiple-explanations output — reused (SCL-010).** An abnormal WBC gets **ranked possibilities** (infection,
   inflammation, stress/steroids/smoking, a reactive post-event shift, obesity-related inflammatory burden, a
   marrow-related pattern) — never a single certain cause (§11, §14).
8. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012/016/017/018/019).** BioSense never emits
   "infection," "leukaemia," "immune deficiency," or "inflammatory disease" as a diagnosis; it detects the
   pattern, routes, and names nothing (§18, §19).

**Biomarker-specific content introduced:** the WBC thresholds and their two-sided/severity structure; the
×10⁹/L ≡ ×10³/µL units; the pregnancy/labour and ancestry overlays; the range-boundary and benign-ethnic-
neutropenia disagreements; the differential-hint layer (via the future differential + hs-CRP); the reactive-
shift and percentage-without-total confounds; and the trend/repeat behaviour. **No new methodology is
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

White Blood Cell Count is best understood as **a marker of immune-system activity** — a snapshot of whether the
body is mounting a response, under stress, or under-producing defensive cells — **not** as a standalone verdict
and **not** as a diagnosis. Its meaning is inseparable from the **differential** (which of the five subtypes is
driving a change) and from context: the same total WBC reads very differently depending on a recent infection,
a vaccination, surgery, acute stress, smoking, obesity, pregnancy, a medication such as a corticosteroid, or a
person's baseline (some ancestries run lower neutrophil counts with no increased risk). A high count with a
neutrophil predominance points one way; a high count with a lymphocyte predominance another; a low count on
chemotherapy another again; and a mildly high count after a recent infection or a stressful event may simply be
reactive.

So BioSense reads WBC **with its companions** (the differential, hs-CRP, ferritin, haemoglobin), **never in
isolation**, begins with biological context — recent events, medications, physiological state, and ancestry all
move WBC — ranks the plausible explanations for an abnormal value rather than asserting one, shows where
reference ranges and baselines genuinely differ rather than splitting them, and names no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as the
evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate WBC. Every value carries a source ID (W-series / R-series → §27) and a
> category tag. Canonical unit: ×10⁹/L (≡ ×10³/µL ≡ K/µL ≡ cells/µL ÷ 1000). **Two-sided, context-first,
> age/pregnancy/ancestry-aware; NEVER interpreted in isolation; companion/differential-pattern verdict inherits
> lower input confidence; NEVER a diagnosis of infection, malignancy, or immune disease.**

## 0.1 Canonical units — [A]
```
canonical_unit: ×10⁹/L   (≡ ×10³/µL ≡ K/µL ≡ cells/µL ÷ 1000; e.g. 7.5 ×10⁹/L = 7,500/µL)   [W6]   # NO analyte-specific conversion factor — do NOT apply 38.67/88.57/88.4/18.0/2.496/0.738/2.266/12.87
Always retain value + unit + age + sex + pregnancy/labour + ancestry(where declared) + recent events(infection/vaccination/surgery) + medications(corticosteroids/chemo) + available companions(differential/hs-CRP/ferritin/Hb). Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  companions (NEVER-IN-ISOLATION): differential (future neutrophils/lymphocytes/eosinophils/monocytes), hs-CRP (SCL-006), ferritin (SCL-010), Hb (SCL-019); [W5,W15,W19]
  recent events: infection, vaccination, surgery/trauma, acute physical stress (reactive shifts);              [W25]
  behaviour/state: smoking, obesity (inflammatory burden);                                                     [W13,W20]
  life-stage: age (newborns/children higher), pregnancy/labour (WBC rises to mid-teens; postpartum 20–30);     [W16,W21]
  medications: corticosteroids (raise WBC), chemotherapy (lower WBC), other marrow-affecting drugs;            [W13,W14]
  inflammation & ancestry: chronic inflammatory conditions; benign ethnic neutropenia (African/Middle-Eastern/West-Indian ancestry → lower baseline neutrophils, not increased risk). [W17,W18,W20]
CORE RULE (founder): WBC is a marker of IMMUNE-SYSTEM ACTIVITY (a screen; the differential carries the meaning) → interpret WITH companions/context; NOT a diagnosis. [W1,W5][B3]
  → total WBC alone = screen; the cause (infection/inflammation/stress/steroids/reactive/marrow) requires the differential + context. [W5,W23]
  → where several explanations fit an abnormal WBC, RANK them (§0.5); never assert one.
IF material context changes meaning → interpret WITHIN that context.                                          [R1]
IF differential / key context unavailable → CONFIDENCE LIMITATION (pattern confidence limited), not certainty. [R4,R9]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors) — TWO-SIDED
```
WBC_WELLNESS_BAND (×10⁹/L, general non-pregnant adult; after context gate; ALWAYS read with differential/context): [W2,W7,W8,W9]
  LOW_FLAG              v < 4.0               # leukopenia direction; read with differential (esp. neutrophils/ANC) + context [W9,W10]
  LOW_NORMAL_WATCH      4.0 <= v < 4.5        # low end / range-boundary-disagreement zone (some labs set lower limit 4.5) [W3]
  OPTIMAL_REFERENCE     4.5 <= v <= 10.0      # squarely within adult reference (overlap of the cited ranges) [W2,W3]
  UPPER_NORMAL_WATCH    > 10.0 <= 11.0        # upper reference / range-boundary-disagreement zone (some labs 10.0, others 11.0) [W3,W7]
  MILD_HIGH_FLAG        > 11.0 <= 15.0        # leukocytosis; often mild/reactive (infection/inflammation/stress/steroids) [W7,W8]
  HIGH_FLAG             > 15.0 <= 30.0        # more strongly infection/inflammation/steroids/stress; read with differential [W8]
  MARKED_HIGH_FLAG      > 30.0               # prompt review; >50 raises leukemoid/leukaemia questions; >100 hyperleukocytosis [W8,W7]
DIRECTION: TWO-SIDED (low = leukopenia direction; high = leukocytosis direction, with severity gradient). [R6]
ANC OVERLAY (low side): leukopenia is usually neutropenia — read with ANC where available: <1.5 neutropenia; <0.5 severe (emergency if febrile); <0.2 agranulocytosis. [W10,W11,W12]
PREGNANCY/LABOUR OVERLAY: physiological rise to mid-teens (postpartum 20–30) — do NOT read as leukocytosis; route/repeat. [W16]
ANCESTRY OVERLAY: benign ethnic neutropenia — lower baseline neutrophils/WBC without increased risk; do NOT over-flag. [W17,W18]
UNIT: ×10⁹/L. DIFFERENTIAL/CONTEXT REQUIRED to move from screen to interpretation; if absent → screen-level read + reduced pattern confidence. [W5,W23][R9]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never in isolation; never a diagnostic label. [B][D]**

## 0.4 Life-stage, ancestry & ANC overlays (guideline-disagreement, never averaged) — [A]/[B]
```
PREGNANCY & LABOUR (physiological rise):   [W16]
  WBC rises into the mid-teens in pregnancy/labour; postpartum may briefly reach 20–30 ×10⁹/L WITHOUT infection → do NOT apply non-pregnant leukocytosis reading; route. [W16][D]
ANCESTRY (benign ethnic neutropenia, BEN):   [W17,W18]
  People of African, Middle-Eastern, West-Indian ancestry (Duffy-null) often have ANC <1500/µL (baseline neutrophils ~1,200–2,500/µL) WITHOUT increased infection risk; ANC "normal" ranges were historically defined on white individuals → do NOT over-flag a low count that reflects baseline. [W17,W18]
PAEDIATRIC/NEONATAL: newborns 9,000–30,000/µL; children ≤2 6,200–17,000/µL; adults & children >2 lower → age-specific ranges; adult bands NOT applied to children. [W21]
RANGE-BOUNDARY DISAGREEMENT (represent, NEVER average): lower limit 4.0 (kantesti/Medscape) vs 4.5 (preventivemedicinedaily) vs 5.0 (Biology Insights) vs 4.4 (ASH); upper limit 10.0 (Medscape/Biology Insights) vs 11.0 (Ada/kantesti). [W3]
ANC SEVERITY (low side, where ANC available): neutropenia <1.5; mild 1.0–1.5; moderate 0.5–1.0; severe <0.5; agranulocytosis <0.2 ×10⁹/L. [W11]
```

## 0.5 Differential / companion pattern hints — [A]+[C] — REUSED cross-biomarker (SCL-010) + inheritance (SCL-016/017/018/019)
```
COMPANION-PATTERN INTERPRETATION (pattern hints, NOT diagnoses; require the differential/companions; confidence inherits lower input): [R4,R9]
  HIGH WBC + neutrophil predominance (future) [± hs-CRP↑]  → bacterial-infection-or-inflammation-direction PATTERN. [W15,W19]
  HIGH WBC + lymphocyte predominance (future)             → viral-direction PATTERN (or, if persistent ALC >5.0 ×3mo, evaluate). [W15,W22]
  HIGH WBC + eosinophil predominance (future)             → allergic/parasitic-direction PATTERN. [W15]
  HIGH WBC + monocyte predominance (future)               → chronic-inflammation-direction PATTERN. [W15]
  HIGH WBC (mild) + recent infection/vaccination/surgery/stress/steroids/smoking context → REACTIVE PATTERN (exclude before other reads). [W13,W25]
  LOW WBC + low neutrophils/ANC (future)                  → neutropenia-direction PATTERN (chemo/medication/viral/autoimmune/marrow; or benign ethnic baseline). [W10,W14,W17]
  chronic HIGH-NORMAL WBC + obesity/smoking/chronic inflammation (± hs-CRP↑) → inflammatory-burden PATTERN (wellness context, not disease). [W20]
GOVERNANCE: emit a companion/differential-pattern read ONLY with the relevant companions; else screen-level + confidence limitation. NEVER a diagnosis; RANK confounds first (§0.2). [R7,R9]
NOTE: percentages WITHOUT the total count are commonly misread → always use absolute counts (e.g. ANC), not % alone. [W23]
```

## 0.6 Confidence hierarchy (four-level) + inheritance — [C] — REUSED (SCL-010 + SCL-016/017/018/019)
```
STANDARD          : clear WBC AND differential (or ANC) available AND age/life-stage/ancestry known AND no unexcluded reactive/medication confound.
REDUCED           : single value / near a boundary / range-boundary-or-pregnancy-or-ancestry overlay uncertain / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : abnormal WBC with NO differential (no pattern) OR unexcluded confound (recent infection/vaccination/surgery/stress/steroids/pregnancy) → screen-level + request differential/repeat; name what's needed. [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / pregnancy-labour physiological rise / likely reactive or medication effect / suspected benign ethnic neutropenia — explained abstention. [R2,W16,W25]
INHERITANCE: the WBC+differential/CRP pattern verdict inherits the LOWER confidence of WBC and its companions; companions absent → pattern limited to a screen-level statement. [R9]
Reduced confidence does NOT auto-block; significant uncertainty MAY justify abstention. New borderline value → prefer REPEAT (with differential).
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  WBC is NOT a diagnosis. NEVER emit "infection", "sepsis", "leukaemia", "leukemoid reaction", "immune deficiency", "immunodeficiency", "inflammatory disease", "myelodysplastic syndrome", "neutropenia/neutropenic" as a diagnosis, or any condition as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  WBC is a marker of immune-system ACTIVITY (a screen; the differential carries the meaning) → interpret WITH companions/context; NEVER in isolation. [B3][W1,W5]
S3  Emit a companion/differential-pattern read ONLY with the relevant companions (differential/hs-CRP/ferritin/Hb); else screen-level + confidence limitation (inheritance). [R9]
S4  On abnormal WBC with ≥2 plausible causes → RANKED possibilities (infection, inflammation, stress/steroids/smoking, reactive post-event, obesity-related burden, marrow-related); NEVER assert one. [R3]
S5  Life-stage/ancestry aware: apply PREGNANCY/LABOUR physiological rise; ANCESTRY (benign ethnic neutropenia) baseline; age-specific ranges for children; never over-flag physiological variation. [W16,W17,W21]
S6  Use ABSOLUTE counts, not percentages alone (ANC = WBC × neutrophil%); a high % with a low total may not be dangerous. [W23]
S7  New/isolated abnormal value → suggest REPEAT (with differential); exclude recent infection/vaccination/surgery/stress/medication first (reactive shifts are transient). [W25]
S8  Companions (differential/hs-CRP/ferritin/Hb) unavailable → confidence limitation, not invented certainty. [R4]
S9  Never recommend treatments/medication changes/doses (e.g. antibiotics, steroids, G-CSF, chemotherapy changes); never produce a numeric infection/leukaemia-risk %; medication questions → educate + refer. [D]
S10 RED FLAGS (very high WBC >30 ×10⁹/L, esp. >50; very low WBC with severe neutropenia ANC <0.5, esp. with fever = febrile neutropenia; persistent lymphocytosis ALC >5.0 for ~3 months; abnormal WBC with systemic symptoms) → calm prompt healthcare review; febrile severe neutropenia is urgent. Never emergency-diagnose. [W8,W12,W22][D]
S11 Never present a BioSense band, reference range, or companion pattern as a medical/diagnostic boundary.
S12 Represent range-boundary disagreement (4.0/4.5/5.0 lower; 10.0/11.0 upper) and benign-ethnic-neutropenia baseline variation; NEVER average thresholds. [W3,W17][R5]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & COMPANIONS (the key WBC move): ALWAYS read with the differential (future neutrophils/lymphocytes/eosinophils/monocytes) + hs-CRP (SCL-006) / ferritin (SCL-010) / Hb (SCL-019); apply pregnancy/labour & ancestry overlays; exclude recent infection/vaccination/surgery/stress/medication; for a NEW abnormal value, REPEAT (with differential). [W5,W15,W25]
Tier 2 LIFESTYLE (context-appropriate): general immune-wellness (balanced nutrition, sleep, stress management, not smoking, healthy weight) — framed as education, not treatment; note recent events/medications/pregnancy shift WBC physiologically; chronic high-normal WBC with obesity/smoking reflects inflammatory burden. [W13,W20]
Tier 3 HEALTHCARE DISCUSSION (calm) when: WBC well above/below the reference with a discordant or unexplained differential | very high (>30, esp. >50) | severe neutropenia (ANC <0.5), esp. with fever | persistent lymphocytosis | pregnancy with an unexplained high count. [W8,W12,W22][D]
NEVER a specific treatment, medication change, or dose at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → pregnancy/ancestry overlay → WBC band + differential pattern (if differential) → template; RANKED confounds where abnormal; ALWAYS "read with the differential".
OPTIMAL_REFERENCE (+ unremarkable context) → affirming, with the "screen + read with the differential" caveat.
LOW_NORMAL_WATCH / UPPER_NORMAL_WATCH → calm; near reference / range-boundary-disagreement zone; context; repeat if borderline.
MILD_HIGH_FLAG → calm; often reactive; exclude recent infection/vaccination/surgery/stress/steroids; repeat with differential.
LOW_FLAG / HIGH_FLAG / MARKED_HIGH_FLAG → constructive; differential pattern; ranked confounds; repeat; ALWAYS "not a diagnosis".
severe neutropenia (ANC<0.5, esp. febrile), very high (>30/>50), persistent lymphocytosis → calm prompt healthcare review (febrile severe neutropenia urgent); never alarm, never diagnose.
pregnancy/labour → physiological rise; route.
differential unavailable → screen-level statement + confidence limitation; name that the differential completes the picture.
Never "normal/abnormal" as a verdict; never a diagnosis (infection/leukaemia/immune deficiency/inflammatory disease).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "White blood cell count reflects your immune-system activity, so it's read together with the breakdown of
      your white-cell types and markers like hs-CRP — the same total can mean different things depending on
      them — and alongside your wider context."
CAV3 (screen/no differential) "A total white cell count on its own is a screen. The breakdown into cell types
      (the differential) is what turns it into a fuller picture, so we'd interpret this more confidently with it."
CAV4 (reduced/context) name the context reducer(s) or missing companion (the differential, hs-CRP, ferritin, Hb, age, pregnancy, ancestry, recent events, medications).
CAV5 (new/borderline) "White cell count shifts with recent infections, vaccinations, surgery, stress, smoking,
      pregnancy and some medicines without any disease being present — so a single out-of-range value is usually
      best repeated (with the differential) before reading much into it."
CAV6 (abnormal, ranked) "Because several things affect white cell count, we've noted the more likely
      explanations given your context rather than pointing to one — best confirmed with a professional."
CAV7 (severe neutropenia / very high / persistent lymphocytosis) "This pattern is worth a prompt, unhurried
      conversation with a healthcare professional." (Add for febrile severe neutropenia: "and shouldn't wait.")
CAV8 (mild high) "A mildly raised white cell count is often just a reaction — to a recent infection, a
      vaccination, stress, or a medicine like a steroid — rather than anything ongoing, so that's checked first."
CAV9 (pregnancy/labour) "In pregnancy and around labour, white cell count naturally rises, so pregnancy results
      are read in that light and best interpreted with a professional."
CAV10 (ancestry/lab) "Reference ranges differ between labs, and some people naturally run lower white-cell or
       neutrophil counts without any increased risk, so we compare against your own lab's range and your own baseline."
```

## 0.11 Source & version identifiers
```
config_id: SCL-020   config_version: 1.0
band_id: BIOSENSE_WBC_TWOSIDED_BANDS_v1                 (Category B; two-sided; severity gradient; anchors W2,W7,W8,W9)
anc_overlay_id: SCL020_WBC_ANC_v1                       (low-side neutropenia severity; W10,W11,W12)
pregnancy_overlay_id: SCL020_WBC_PREGNANCY_LABOUR_v1    (physiological rise; W16)
ancestry_overlay_id: SCL020_WBC_BEN_v1                  (benign ethnic neutropenia baseline; W17,W18)
differential_pattern_id: SCL020_WBC_DIFFERENTIAL_PATTERN_v1  (cross-biomarker + multiple-explanations; parents WBC+future neutrophils/lymphocytes/eosinophils/monocytes+hs-CRP; R4; W15,W19)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1   (reused; R2)
confidence_inheritance_ref: SCL016_CONFIDENCE_INHERITANCE_v1 (reused SCL-016/017/018/019; R9)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1   (reused; R3 — ranked confounds/causes)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1     (reused; R4 — hs-CRP/ferritin/Hb/future differential)
sex_age_preg_aware_ref: SCL004/010/016/017/018/019 posture (reused; R8)
guideline_disagreement_ref: SCL011/012 posture           (reused; R5 — range boundaries; benign ethnic neutropenia; never averaged)
safety_rules_id: SCL020_SAFETY_v1                        (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

White Blood Cell Count (WBC, leukocyte count) is the number of infection-fighting white cells in the blood.
<cite index="3-1">This number gives your doctor a snapshot of your immune system's activity, flagging whether your body is fighting something off, under stress, or potentially not producing enough defense cells.</cite> There are <cite index="1-1">several kinds of white blood cells, including neutrophils, eosinophils, lymphocytes, monocytes and basophils.</cite> **[A][W1][W4]**

The defining feature for interpretation is that the **total** WBC is only a starting point; the **differential**
carries the meaning. <cite index="3-1">A total WBC count tells you the overall number of white blood cells in your blood. It's a useful screening tool, but it only tells part of the story.</cite> And the specific pattern points to different causes: <cite index="2-1">elevated neutrophils suggest bacterial infection, elevated lymphocytes indicate viral infection or certain leukemias, elevated eosinophils point to allergic reactions or parasitic infections, and elevated monocytes may signal chronic inflammatory conditions.</cite> This is precisely why <cite index="15-1">a differential should always be obtained when an elevated white count is found</cite>, and why WBC is read **with** the differential, hs-CRP, ferritin, and haemoglobin — never alone. **[A][W5][W15][W19]**

WBC is also strongly **context-dependent**: recent infections, vaccinations, surgery, stress, smoking,
pregnancy, and medications all move it, and some people run a lower baseline with no added risk. So BioSense
reads WBC **with its companions**, in context, and names no condition. **[B][B2]**

- **Reported in:** ×10⁹/L (≡ ×10³/µL ≡ K/µL ≡ cells/µL ÷ 1000). **[A][W6]**
- **Nature:** immune-activity screen; **two-sided**; **never in isolation**; **not a diagnosis** **[A][B3]**
- **Direction:** two-sided (low = leukopenia direction; high = leukocytosis direction, with severity gradient) **[A][R6]**
- **Companions:** the differential (future neutrophils/lymphocytes/eosinophils/monocytes), hs-CRP (SCL-006),
  ferritin (SCL-010), haemoglobin (SCL-019) **[A][W5][W15]**
- **BioSense role:** a context-first, differential-paired immune-activity screen with pregnancy/labour and
  ancestry overlays.

---

# 2. Physiological Function

White blood cells are the immune system's workforce: <cite index="3-1">produced in your bone marrow, they patrol your bloodstream looking for bacteria, viruses, parasites, and damaged cells, and when they detect a threat they mount a targeted response to neutralize it.</cite> The total count reflects the sum of five functionally distinct subtypes, each of which rises or falls in different circumstances — so the total is a composite whose meaning depends on **which subtype** is driving it. **[A][W1][W4]**

Two features define interpretation **[A]**:
- **The total is a composite; the differential localises the cause.** Neutrophils track bacterial infection/
  inflammation/stress, lymphocytes track viral responses, eosinophils track allergy/parasites, monocytes track
  chronic inflammation — so the differential (and absolute counts such as the ANC) is essential. **[A][W15][W23]**
- **WBC is highly reactive and context-sensitive.** Recent infection, vaccination, surgery, stress, smoking,
  obesity, pregnancy/labour, and medications (corticosteroids up, chemotherapy down) all move it, and baseline
  varies by ancestry — so context is essential before interpretation. **[A][W13][W16][W17][W25]**

---

# 3. Scientific Background

Three scientific themes shape how BioSense represents WBC. **[A]**

**First, WBC means little in isolation.** The total is a screen; <cite index="2-1">CBC with differential proves far more diagnostically useful than total WBC count alone because specific patterns of elevation or reduction in different white blood cell types point toward particular diagnoses</cite>, and a common error is reading percentages without the absolute total — <cite index="9-1">a neutrophil percentage of 82% looks dramatic, but if the total WBC is only 2.0, the ANC is 1.64 and may not represent dangerous neutropenia; percentages without the total count are one of the commonest ways a CBC gets misread.</cite> BioSense therefore treats WBC **plus its differential and context** as the unit of interpretation. **[A][W5][W23]**

**Second, the thresholds and baselines genuinely differ.** The adult range is cited variously — <cite index="1-1">4,000 to 11,000 per microliter</cite>, <cite index="3-1">5,000 to 10,000</cite>, and others — and <cite index="9-1">leukocytosis usually starts above 11.0, values above 15.0 more strongly suggest infection/inflammation/steroids/stress, above 30.0 needs prompt review, and above 50.0 raises leukemoid reaction or leukemia questions.</cite> Baselines vary by ancestry: <cite index="15-1">these "normal" neutrophil counts are defined in the United States based historically on white individuals, and ANC reference ranges in Africa recognize that an ANC of <1500 cells per μL is common and usually normal.</cite> BioSense **presents these frameworks side by side and never averages them.** **[A][W3][W8][W17][W18]**

**Third, WBC is easily confounded.** <cite index="9-1">Pregnancy and labor can physiologically raise WBC into the mid-teens, and postpartum counts may briefly reach 20-30 without infection</cite>; recent infection, vaccination, surgery, stress, smoking, and medications all shift it; and <cite index="1-1">in most cases an elevated WBC count will result in no symptoms.</cite> A single value is best read with the differential and, if borderline, repeated. **[A][W16][W24][W25]**

**The wellness reading — [B]:** WBC is a context-first, differential-paired, two-sided immune-activity screen —
read with the differential/hs-CRP/ferritin/Hb, with pregnancy/labour and ancestry overlays, plausible confounds
ranked rather than one asserted, guideline and baseline disagreement shown honestly, borderline values repeated
before they count, and no condition named.

**An honest boundary — [E]:** ranges and baselines are contested (source-dependent limits; ancestry-based
variation), WBC is highly reactive to recent events and medications, and the total obscures the subtype — so
BioSense leans on the differential and context and is explicit about confidence. **[E][W3][W17]**

---

# 4. Why White Blood Cell Count Matters

**1. It screens immune-system activity. [A][W1]** WBC flags whether the body is mounting a response, under
stress, or under-producing — a core screen of immune-wellness. **[A]**

**2. Read with the differential, it localises the driver. [A][W15]** Neutrophil/lymphocyte/eosinophil/monocyte
predominance separates bacterial from viral from allergic-parasitic from chronic-inflammatory patterns — the
difference between a bare number and an interpretation. **[A]**

**3. Interpreted in context, it avoids over-flagging. [A][W25]** Recent events, medications, pregnancy/labour,
and ancestry all move WBC physiologically — context prevents mislabelling normal variation. **[A]**

**Why BioSense measures it — [C]:** WBC is a high-value, context-rich, differential-dependent screen whose
meaning is multi-marker — the ideal case for Context-First interpretation, cross-biomarker intelligence,
confidence inheritance, pregnancy/ancestry-aware banding, ranked explanations, and guideline-disagreement
handling, all while never diagnosing infection, malignancy, or immune disease.

---

# 5. Laboratory Measurement

WBC is measured on an automated haematology analyser (part of the CBC/FBC), reported in **×10⁹/L (≡ ×10³/µL)**,
ideally **with a differential**. **[A][W1][W6]**

- **Units.** ×10⁹/L is canonical; ×10⁹/L ≡ ×10³/µL ≡ K/µL ≡ cells/µL ÷ 1000. No lipid/glucose/vitamin/
  creatinine/thyroid analyte factor applies. **[A][W6]**
- **Read with the differential.** The total is interpreted with the five-part differential (and absolute counts
  such as the ANC), hs-CRP, ferritin, and haemoglobin — never in isolation. **[A][W5][W15]**
- **Absolute over percentage.** Absolute counts (e.g. ANC = WBC × neutrophil%) are used, not percentages alone,
  which are commonly misread. **[A][W23]**
- **Context matters.** Recent infection/vaccination/surgery/stress, smoking, obesity, pregnancy/labour,
  medications, and ancestry all shift WBC. **[A][W13][W16][W25]**
- **Companion panel.** Read with **hs-CRP** (inflammation), **ferritin** (inflammation/iron context),
  **haemoglobin** (SCL-019), and the future **differential** (neutrophils/lymphocytes/eosinophils/monocytes). **[A][W19]**

---

# 6. Units

- **×10⁹/L** — SI; **BioSense canonical unit.** **[A/C]**
- **×10³/µL ≡ K/µL ≡ cells/µL ÷ 1000** — equivalent conventional expressions; 7.5 ×10⁹/L = 7,500/µL. **[A][W6]**
- **No analyte-specific conversion factor** of the lipid/glucose/vitamin/creatinine/thyroid kind applies — WBC
  unit changes are simple order-of-magnitude equivalences, distinct from cholesterol (38.67), triglyceride
  (88.57), creatinine (88.4), glucose (18.0), 25(OH)D (2.496), B12 (0.738), folate (2.266), and Free T4 (12.87);
  and unlike Haemoglobin (g/dL↔g/L↔mmol/L), WBC is a cell **count**, not a mass concentration. **[A][C]**

BioSense stores the reported value, unit, age, sex, pregnancy/labour, ancestry (where declared), recent events,
medications, and any companions/differential unchanged, and evaluates the differential pattern and overlays. **[C]**

---

# 7. Unit Conversion

```
×10⁹/L  ≡  ×10³/µL  ≡  K/µL  ≡  (cells/µL ÷ 1000)      [W6]
e.g. 7.5 ×10⁹/L = 7,500 cells/µL ; 4.0 ×10⁹/L = 4,000/µL ; 11.0 ×10⁹/L = 11,000/µL
(no analyte-specific factor; the differential subtypes are separate counts in the same unit — future SCLs)
```
Worked check: WBC 6.0 ×10⁹/L = 6,000/µL. **[A][W6]**

**Safety rule [D]:** WBC uses simple ×10⁹/L ≡ ×10³/µL equivalences; never apply a lipid/glucose/vitamin/
creatinine/thyroid analyte factor, and never confuse a cell count with a mass concentration. A unit-unknown
value is displayed but not interpreted; a differential-pattern read requires the differential; pregnancy/
ancestry overlays are applied before banding. **[D]**

---

# 8. Measurement Limitations & the Never-In-Isolation Principle  *(Context-First basis — reused SCL-010)*

WBC's defining limitation is that **the total does not, on its own, define immune status** — which is why the
Context-First gate (§0.2), the differential-pattern layer (§0.5), and the ranked-confound output apply. **[A][B2]**

## 8.1 WBC needs the differential — [A]
A high (or low) total is a starting point; the differential (and absolute counts such as the ANC) localises the
driver. WBC is never interpreted in isolation, and percentages are never used without the total. **[A][W5][W23]**

## 8.2 It is highly reactive — [A]
Recent infection, vaccination, surgery, stress, smoking, pregnancy/labour, and medications shift WBC transiently;
context and repeat are essential. **[A][W16][W25]**

## 8.3 Ranges & baselines are contested — [A]
Source-dependent reference limits; ancestry-based baseline variation (benign ethnic neutropenia); ANC reference
historically white-based — shown as frameworks, never averaged. **[A][W3][W17][W18]**

## 8.4 The total obscures the subtype — [A]
Different subtypes carry different meanings; a normal total can hide an abnormal differential, and vice versa —
so the differential is essential. **[A][W15]**

**How BioSense uses this — [C][D]:** the Context-First gate runs first; WBC is banded two-sided with pregnancy/
ancestry overlays; the differential pattern is emitted only with the differential (else screen-level + limited
confidence); plausible confounds are **ranked, not asserted**; reactive/medication/physiological possibilities
and the repeat discipline are surfaced; missing differential/context sets Context-Required/Reduced confidence;
and no condition is ever named.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010; pattern inheritance via SCL-016/017/018/019)*

WBC consumes its differential and context markers where available. **[A][C]**

- **The differential (future neutrophils/lymphocytes/eosinophils/monocytes) — the key companion. [A]** The
  subtype predominance sets the pattern (bacterial/viral/allergic-parasitic/chronic-inflammatory); the ANC
  governs the low side. **[A][W15][W11]**
- **hs-CRP (SCL-006). [A]** Corroborates an inflammatory/infective direction when WBC is high; a raised WBC with
  a raised hs-CRP strengthens an inflammation-direction read (as context, not a diagnosis). **[A][W19][W20]**
- **Ferritin (SCL-010). [A]** An acute-phase reactant; supports an inflammatory-context read alongside WBC and
  hs-CRP. **[A][W20]**
- **Haemoglobin (SCL-019). [A]** Read together as part of the CBC; a low Hb with an abnormal WBC broadens the
  haematological picture (context, routed, not diagnosed). **[A][W19]**
- **(Context) recent events, medications, pregnancy/labour, ancestry. [A]** These are interpretation context
  that move WBC physiologically, never something BioSense advises changing beyond general wellness. **[A][W25]**

**Cross-biomarker rule [C] (reused R4/R9):** where these are **available**, BioSense consumes them (with the
differential-pattern and confound caveats) to sharpen the read and confidence; where **unavailable** —
especially the **differential** (without which only a screen-level statement is possible) — it records a
**confidence limitation** and names what would clarify, never inventing certainty. **[C][R4][R9]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **WBC is the leukocyte count; a screen of immune-system activity.** **[A][W1]**
- **The differential (five subtypes) is more informative than the total; a differential should be obtained for
  an elevated count.** **[A][W4][W5]**
- **Leukocytosis is broadly >11.0 (or >10.0) ×10⁹/L; leukopenia <4.0; neutropenia ANC <1.5.** **[A][W7][W9][W11]**
- **A severity gradient exists on the high side (mild/reactive → prompt review → leukaemia questions).** **[A][W8]**
- **Pregnancy/labour raise WBC physiologically; recent events/medications shift it.** **[A][W16][W25]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **Lower reference limit: 4.0 vs 4.5 vs 5.0 vs 4.4 ×10⁹/L (source/lab-dependent).** **[A][W3]**
- **Upper reference limit: 10.0 vs 11.0 ×10⁹/L.** **[A][W3]**
- **Ancestry baseline: benign ethnic neutropenia — ANC <1500/µL common and usually normal in some ancestries;
  ANC reference historically white-based.** **[A][W17][W18]**
- **ANC neutropenia cut-off: 1.5 (most) vs 1.8 (some) ×10⁹/L.** **[A][W11][W14]**
- **Why:** WBC distributions vary by population/ancestry/lab and the "normal" reference was historically
  narrow; guidelines and baselines evolve. BioSense **presents the differing frameworks and never averages
  them** (reused R5). **[A][E]**

## 10.3 Strength of evidence
- **Physiology, differential, leukocytosis/leukopenia/neutropenia thresholds, severity gradient: established.** **[A][W1][W7][W11]**
- **Pregnancy/labour rise; reactive shifts; benign ethnic neutropenia: established.** **[A][W16][W17][W25]**
- **Exact reference-range boundaries; optimal within-range targets; inflammatory-burden/NLR: evolving/contested.** **[E][W3][W20]**
- **Extreme-elevation implications (>50 leukaemia question): established as a review trigger.** **[A][W8]**

## 10.4 Intended populations
Thresholds target general **non-pregnant adults**, with **pregnancy/labour**, **paediatric/neonatal**, and
**ancestry** (benign ethnic neutropenia) overlays. BioSense applies them context-first, abstains or routes in
pregnancy/labour, likely reactive shifts, and suspected benign ethnic neutropenia, and reduces confidence where
the differential or context is unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. WBC is TWO-SIDED (low = leukopenia direction; high =
> leukocytosis direction, with a severity gradient), CONTEXT-GATED, and NEVER interpreted in isolation: the
> total is a screen whose meaning is set by the differential and biological context, and where several
> explanations fit they are RANKED, not asserted. Reference-range boundaries and ancestry baselines genuinely
> DIFFER and are shown, never averaged. Never a diagnosis of infection, malignancy, or immune disease.**

## 11.1 The WBC wellness bands (×10⁹/L; general non-pregnant adult; after context gate; read with the differential)

| BioSense Wellness Interpretation | WBC ×10⁹/L | Evidence anchor | Wellness meaning (context-first, differential-paired; no diagnostic label) |
|---|---|---|---|
| **Low — Flag** | < 4.0 | Leukopenia threshold [W9][W10] | Leukopenia direction; read with the differential (esp. neutrophils/ANC) and context; rank causes. |
| **Low-Normal — Watch** | 4.0 – < 4.5 | Range-boundary disagreement [W3] | Low end; some labs set the lower limit at 4.5 — a guideline-difference zone; read with the differential. |
| **Optimal Reference** | 4.5 – 10.0 | Reference overlap [W2][W3] | Squarely within the adult reference range (where the cited ranges overlap). |
| **Upper-Normal — Watch** | > 10.0 – 11.0 | Range-boundary disagreement [W3][W7] | Some labs call >10.0 high, others >11.0 — a guideline-difference zone; context. |
| **Mild High — Flag** | > 11.0 – 15.0 | Mild/reactive leukocytosis [W7][W8] | Leukocytosis, often mild and reactive (recent infection/vaccination/surgery/stress/steroids/smoking). |
| **High — Flag** | > 15.0 – 30.0 | Stronger leukocytosis [W8] | More strongly infection/inflammation/steroids/stress; read with the differential. |
| **Marked High — Flag** | > 30.0 | Prompt-review / high-elevation [W8][W7] | Prompt review; >50 raises leukemoid/leukaemia questions; >100 hyperleukocytosis. |

*(Read with the differential (future neutrophils/lymphocytes/eosinophils/monocytes) + hs-CRP/ferritin/Hb; the
differential pattern sets the meaning (§11.4). ANC overlay governs the low side; pregnancy/labour and ancestry
overlays modify interpretation (§11.2). Reference boundaries differ; shown, never averaged (§11.5).)*

## 11.2 Life-stage, ancestry & ANC overlays [A][B]
- **ANC (low side):** leukopenia is usually neutropenia — read with the absolute neutrophil count where
  available: **<1.5** neutropenia; **1.0–1.5** mild; **0.5–1.0** moderate; **<0.5** severe (emergency if
  febrile); **<0.2** agranulocytosis. **[A][W10][W11][W12]**
- **Pregnancy & labour:** physiological rise into the mid-teens (postpartum 20–30 ×10⁹/L) — do **not** read as
  leukocytosis; route/repeat. **[A][W16]**
- **Ancestry (benign ethnic neutropenia):** African/Middle-Eastern/West-Indian ancestry (Duffy-null) often runs
  a **lower baseline** (ANC <1500/µL) without increased risk — do **not** over-flag; compare to the person's own
  baseline. **[A][W17][W18]**
- **Paediatric/neonatal:** newborns 9–30 ×10⁹/L; children ≤2 6.2–17 ×10⁹/L; adult bands not applied. **[A][W21]**

## 11.3 How the bands were derived — transparency [B]
- The bands use the **overlap of the cited adult ranges** (4.5–10.0) as Optimal, the **range-boundary
  disagreements** (4.0–4.5 low; 10.0–11.0 upper) as watch zones, the **leukopenia threshold** (<4.0) as the low
  flag, and the **leukocytosis severity gradient** (11–15 mild; 15–30; >30) as the high flags. **[W2][W3][W7][W8][W9]**
- **No number was averaged.** The differing reference-limit frameworks and the benign-ethnic-neutropenia
  baseline are presented distinctly (§11.5). **[R5]**
- The **low and high flags** are two-sided context markers; meaning is completed by the differential. **[W5]**

## 11.4 The differential (companion) pattern (the unit of interpretation) [A][B]
| WBC | Differential / companion | Pattern hint (NOT a diagnosis) | Anchor |
|---|---|---|---|
| High | neutrophil predominance (± hs-CRP↑) | Bacterial-infection-or-inflammation-direction pattern | W15, W19 |
| High | lymphocyte predominance | Viral-direction pattern (persistent ALC >5.0 ×3mo → evaluate) | W15, W22 |
| High | eosinophil predominance | Allergic/parasitic-direction pattern | W15 |
| High | monocyte predominance | Chronic-inflammation-direction pattern | W15 |
| High (mild) | recent infection/vaccination/surgery/stress/steroids/smoking | Reactive pattern (exclude first) | W13, W25 |
| Low | low neutrophils / ANC (chemo/med/viral/autoimmune/marrow, or ethnic baseline) | Neutropenia-direction pattern | W10, W14, W17 |
| High-normal (chronic) | obesity/smoking/chronic inflammation (± hs-CRP↑) | Inflammatory-burden pattern (wellness context) | W20 |

The pattern is emitted **only with the differential/companions**, inherits the lower input confidence, ranks
confounds first, uses **absolute counts** (not % alone), and **names no condition** (§0.5, §12). **[A][B][R4][R9][W23]**

## 11.5 Guideline-disagreement display (reused posture) [B][C]
Where relevant, BioSense shows the differing reference-range limits (4.0/4.5/5.0 lower; 10.0/11.0 upper), the
ANC neutropenia cut-off variation (1.5 vs 1.8), and the benign-ethnic-neutropenia baseline as distinct
frameworks — **never averaged** (CAV10). **[B][C][R5][W3][W17]**

## 11.6 Context-gate precedence [D]
No band or pattern is emitted as a verdict without the Context-First evaluation (§0.2). Recent events,
medications, pregnancy/labour, ancestry, and the differential are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general non-pregnant adult**, read **with the differential**, with **ancestry** and
**pregnancy/labour** overlays. Reference limits are contested and lab/ancestry-dependent; WBC is highly reactive
to recent events and medications. Pregnancy/labour and paediatric/neonatal use separate handling (§11.2). **[E][W3]**

---

# 12. Interpretation Framework — CONTEXT-FIRST + NEVER-IN-ISOLATION (reused SCL-010 cross-biomarker + SCL-016/017/018/019 inheritance)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010), cross-biomarker
> intelligence (SCL-010), and confidence inheritance (SCL-016/017/018/019). WBC is interpreted as a
> context-dependent, differential-paired immune-activity screen, never a diagnosis, and never in isolation. No
> new methodology is introduced.** **[C][R1][R4][R9]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1][B3]
   gather context (differential (future neutrophils/lymphocytes/eosinophils/monocytes), hs-CRP (SCL-006), ferritin
   (SCL-010), Hb (SCL-019); age; pregnancy/labour; ancestry (benign ethnic neutropenia); recent infection/
   vaccination/surgery/stress; smoking; obesity; medications; corticosteroids; chemotherapy; chronic inflammation). [R4]
   → if material context changes meaning, interpret WITHIN it; if key context/differential unavailable, record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit ×10⁹/L [×10³/µL]; result final) → else display-only/flag.
STEP 2 — ELIGIBILITY / LIFE-STAGE / ANCESTRY: non-pregnant adult → apply bands; pregnancy/labour → physiological-rise handling + route; paediatric → age-specific + route; benign ethnic neutropenia → baseline-aware, do not over-flag; likely reactive/medication → defer/repeat. [W16,W17,W21,W25]
STEP 3 — CONFIDENCE (four-level + inheritance): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED; pattern inherits lower of WBC/companions (§0.6). [R2,R9]
STEP 4 — BAND: assign two-sided band (§11.1) with pregnancy/ancestry overlay + ANC overlay (low side).  [R6,R8]
STEP 5 — DIFFERENTIAL PATTERN: if differential present, resolve the pattern (§11.4) using absolute counts; else screen-level statement. [R4,W23]
STEP 6 — RANKED CONFOUNDS/CAUSES: abnormal with ≥2 plausible causes → Possible Explanation A/B/C, ranked (infection, inflammation, stress/steroids/smoking, reactive post-event, obesity-related burden, marrow-related). [R3]
STEP 7 — REPEAT: new abnormal value → suggest REPEAT (with differential) after excluding recent infection/vaccination/surgery/stress/medication. [W25]
STEP 8 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); route where appropriate; NO diagnosis. [R7]
```

**Core interpretive stance [B]:** WBC is a context-first, differential-paired, two-sided immune-activity screen
— read with the differential/hs-CRP/ferritin/Hb, with pregnancy/labour and ancestry overlays, plausible
confounds ranked rather than one asserted, guideline and baseline disagreement shown honestly, borderline
values repeated before they count, and no condition named. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy + inheritance — reused SCL-010 + SCL-016/017/018/019)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear WBC AND differential (or ANC) available AND age/life-stage/ancestry known AND no unexcluded reactive/medication confound | Band + differential pattern + ranked confounds normally |
| **REDUCED** | Single value / near a boundary / range-boundary-or-pregnancy-or-ancestry overlay uncertain / minor context | Band cautiously; prefer repeat; name the reducer (CAV4/CAV5) |
| **CONTEXT_REQUIRED** | Abnormal WBC with no differential (no pattern) OR unexcluded confound (recent infection/vaccination/surgery/stress/steroids/pregnancy) | Screen-level + request differential/repeat; name needed context (CAV3/CAV6) |
| **ABSTAINED** | Significant uncertainty / conflicting signals / pregnancy-labour physiological rise / likely reactive or medication effect / suspected benign ethnic neutropenia | Explained abstention; route |

**Inheritance (reused SCL-016/017/018/019):** the WBC+differential/CRP pattern verdict inherits the **lower**
confidence of its inputs; if the differential is unavailable, WBC is limited to a **screen-level** statement,
not asserted. **[R9]**

Reducers/context inputs: differential absent (no pattern) [W5]; single value / reactivity [W25]; possible
reactive shift (recent infection/vaccination/surgery/stress) [W25]; medication effect (steroids/chemo) [W13][W14];
pregnancy/labour rise [W16]; suspected benign ethnic neutropenia [W17]; near a band boundary. **[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant uncertainty
**may** justify abstention; a new abnormal value prefers a **repeat** framing (with the differential). **[R2]**

---

# 14. Wellness Interpretation  *(context-first, differential-paired, two-sided, ranked confounds)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate. Wellness, not medical;
**never a diagnosis**; always **read with the differential**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal Reference** *(4.5–10.0; unremarkable context).* "Your white blood
  cell count — a snapshot of your immune-system activity — sits in a favourable range, and there's nothing here
  that stands out. It's a single snapshot, and it's best read with the breakdown of your white-cell types, but
  this looks settled." **[B]**
- **BioSense Wellness Interpretation: Low-Normal / Upper-Normal — Watch** *(4.0–<4.5, or >10.0–11.0).* "Your
  count is within the usual range but toward the {low / upper} end — and labs differ slightly on where the line
  sits. That's often just context, so it's read with your differential and, if borderline, repeated." Calm;
  context; **no diagnosis** (CAV2, CAV5, CAV10). **[B][D]**
- **BioSense Wellness Interpretation: Mild High — Flag** *(>11.0–15.0).* "A mildly raised count is often just a
  reaction — to a recent infection, a vaccination, surgery, stress, smoking, or a medicine like a steroid —
  rather than anything ongoing. That's checked first, and it's read with your differential." Calm; **no
  diagnosis** (CAV8). **[B][D][W8]**
- **BioSense Wellness Interpretation: Low — Flag / High — Flag / Marked High** *(<4.0; >15.0; >30.0).* "This is
  {below / well above} the usual range. Because white cell count has several possible explanations, we read it
  with your differential (using absolute counts), and we've noted the more likely causes for your context —
  infection, inflammation, stress or a medicine, a reactive shift, or something to look at further — rather than
  pointing to one. A repeat with the differential is often sensible." Constructive; **no diagnosis** (CAV3,
  CAV5, CAV6). **[B][D]**
- **BioSense Wellness Interpretation: severe neutropenia / very high / persistent lymphocytosis.** Calm routing:
  "This pattern is worth a prompt, unhurried conversation with a healthcare professional, who can look at the
  fuller picture. The numbers alone don't diagnose anything." For **febrile severe neutropenia** add that it
  **shouldn't wait**. **No alarm, no diagnosis** (CAV7). **[B][D][W12][W22]**
- **Pregnancy/labour.** "In pregnancy and around labour, white cell count naturally rises, so this is read in
  that light and best interpreted with a professional." Route (CAV9). **[B][D][W16]**

**Differential-pattern modifier:** where the differential is available, present the pattern (bacterial/viral/
allergic-parasitic/chronic-inflammatory/reactive/neutropenia/inflammatory-burden) as **context**, using
absolute counts; where it is absent, give a **screen-level** statement and name that the differential completes
the picture (CAV3). The pattern confidence **inherits the lower** input (§0.6). **[D][R4][R9][W23]**

**Ranked-confounds modifier (reused):** on any abnormal WBC with ≥2 plausible causes, present **Possible
Explanation A/B/C** ordered by evidence + context (infection, inflammation, stress/steroids/smoking, reactive
post-event, obesity-related burden, marrow-related) — never a single certain cause, never a named condition. **[D][R3]**

**Life-stage/ancestry overlay modifier:** apply the pregnancy/labour physiological-rise handling, the ancestry
(benign ethnic neutropenia) baseline, and age-specific handling for children; never over-flag physiological
variation (CAV9, CAV10). **[D][W16][W17]**

**Context-unavailable modifier:** where the **differential** (or life-stage/ancestry/recent-events/medication
context) is missing, state the confidence limitation and name what would clarify (CAV3/CAV4); never invent
certainty (S8). **[D][R4]**

Every interpretation pairs the band and pattern with context guidance (§17) and the mandatory caveats (§0.10).
**None diagnoses infection, leukaemia, immune deficiency, or inflammatory disease, none asserts a single cause,
and none treats a BioSense band or pattern as a medical boundary.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for WBC).** Abnormal WBC with **no differential** (no pattern) or an
  unexcluded confound (recent infection/vaccination/surgery/stress/steroids) → screen-level + request
  differential/repeat; state what's needed (§13, CAV3/CAV6). **[D][R2]**
- **15.2 Reactive shifts.** Recent infection, vaccination, surgery/trauma, or acute stress transiently raise
  WBC → treat as reactive; exclude before other reads; repeat. **[D][W25]**
- **15.3 Pregnancy & labour.** Physiological rise into the mid-teens (postpartum 20–30) → do not read as
  leukocytosis; route — immune status in pregnancy is a professional matter. **[D][W16]**
- **15.4 Benign ethnic neutropenia.** African/Middle-Eastern/West-Indian ancestry (Duffy-null) may run a lower
  baseline without increased risk → baseline-aware; do not over-flag; compare to the person's own trend. **[D][W17][W18]**
- **15.5 On WBC-affecting medication.** Corticosteroids raise WBC (demargination); chemotherapy and some drugs
  lower it → interpret as context; never advise changing a dose. **[D][W13][W14]**
- **15.6 Chronic inflammation / obesity / smoking.** A chronic high-normal or mildly raised WBC may reflect
  inflammatory burden (read with hs-CRP) — a wellness-context read, not a disease label. **[D][W20]**
- **15.7 Children, adolescents & newborns.** Age-specific/neonatal ranges are markedly higher; adult bands not
  applied — display, suggest professional interpretation. **[D][W21]**
- **15.8 Red flags.** Very high WBC (>30, esp. >50 ×10⁹/L); severe neutropenia (ANC <0.5), especially with
  fever (febrile neutropenia, urgent); persistent lymphocytosis (ALC >5.0 for ~3 months); an abnormal WBC with
  systemic symptoms → calm prompt healthcare review (febrile severe neutropenia shouldn't wait). **[D][W8][W12][W22]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Trend beats a single value. [A]** WBC is highly reactive (recent events, stress, medications, physiological
  state), so a within-person **trend** (read with the differential) is more informative than one reading. **[W25]**
- **Repeat abnormal values with the differential. [A]** A new abnormal value is repeated **with** the
  differential (and ANC), after excluding recent infection/vaccination/surgery/stress/medication, before it
  means anything. **[W25][W5]**
- **Persistence matters. [A]** A **persistent** lymphocytosis (ALC >5.0 for ~3 months) or a **sustained**
  unexplained elevation is what warrants evaluation, distinct from a transient reactive shift. **[W22]**
- **Compare to the person's own baseline. [A]** Because baselines vary (including benign ethnic neutropenia),
  the person's own trend is often more informative than a population cut-off. **[W17]**
- **Context/abstained points. [C]** Reactive shifts, pregnancy/labour, medication, and context-required points
  are tagged so they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For WBC, the first tier is **context and the differential** (and inflammatory markers), then context-appropriate
lifestyle. **[A]/[B]**

## 17.1 Differential & context first [A][W5][W15]
Where WBC is abnormal, the clarifying steps are the **differential** (neutrophils/lymphocytes/eosinophils/
monocytes, using absolute counts), **hs-CRP/ferritin/Hb**, the **context review** (recent events, medications,
pregnancy/labour, ancestry), and — for a new abnormal value — a **repeat with the differential**. **[A]**

## 17.2 Immune-wellness context [A][W20]
General immune-wellness — balanced nutrition, adequate sleep, stress management, **not smoking**, and a healthy
weight — is relevant context; a chronic high-normal WBC with obesity/smoking reflects inflammatory burden.
Framed as **education, not treatment**. **[A]**

## 17.3 Confound & exposure context [A][W13][W25]
Recent infection/vaccination/surgery/stress, smoking, obesity, pregnancy/labour, corticosteroids, and
chemotherapy are recognised context/confounds for an abnormal WBC — useful for interpretation, **never** a
prompt to change any medication (antibiotics/steroids/chemotherapy) without professional advice. **[A]**

## 17.4 Framing rules [B][D]
Differential and context first (repeat for new abnormal); **no specific treatments, medication changes, or
doses** (S9); range-boundary and ancestry-baseline disagreement shown, never averaged; calm, evidence-informed
language; never a diagnosis; the differential-paired (CAV2), screen-only (CAV3), mild-high (CAV8), pregnancy
(CAV9), and ancestry/lab (CAV10) caveats attached where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain that WBC is a marker of immune-system activity read **with** the differential; run
the context-first evaluation; assign the two-sided band with pregnancy/ancestry and ANC overlays; resolve the
differential pattern (with inherited confidence, using absolute counts) when the differential is present;
integrate hs-CRP/ferritin/Hb; present **ranked** confounds for an abnormal value; recommend a repeat (with the
differential); name which companions would clarify; express context-required/abstention respectfully.

The AI layer **must never**:
- emit "infection", "sepsis", "leukaemia", "leukemoid reaction", "immune deficiency", "immunodeficiency", "inflammatory disease", "myelodysplastic syndrome", or "neutropenia/neutropenic" as a diagnosis — even to deny one (S1)
- interpret WBC in isolation, or emit a differential-pattern read without the differential/companions (S2, S3)
- assert a single cause for an abnormal WBC when ≥2 are plausible — rank them (S4)
- ignore life-stage/ancestry (apply pregnancy/labour handling; benign-ethnic-neutropenia baseline; age-specific ranges for children; never over-flag physiological variation) (S5)
- read percentages without the absolute total (use ANC = WBC × neutrophil%) (S6)
- load interpretation onto a new/isolated abnormal value without a repeat and reactive/medication exclusion (S7)
- interpret a likely reactive, pregnancy/labour, or medication-driven value as a disease pattern (S5, S7)
- recommend treatments, medication changes, or doses (antibiotics/steroids/G-CSF/chemotherapy); produce an infection/leukaemia-risk % (S9)
- invent certainty when the differential/context is unavailable — state the limitation and inherit confidence (S8)
- fail to route red flags (very high >30/>50; severe neutropenia ANC <0.5, esp. febrile; persistent lymphocytosis) calmly and promptly (S10)
- present a BioSense band, range, or differential pattern as a medical/diagnostic boundary (S11)
- average contested reference limits (4.0/4.5/5.0; 10.0/11.0) or the benign-ethnic-neutropenia baseline (S12)

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any infection, malignancy,
or immune/inflammatory disease is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes patterns,
  never names infection/leukaemia/immune deficiency/inflammatory disease (S1). **[D][R7]**
- **Never-in-isolation honesty.** WBC is presented as a screen whose meaning depends on the differential;
  differential-pattern reads only with the differential, else screen-level + inherited confidence (S2, S3, CAV2,
  CAV3). **[D][B2]**
- **Absolute-count discipline.** Absolute counts (ANC), not percentages alone, are used; a high % with a low
  total is not over-read (S6, W23). **[D]**
- **Ranked, not asserted.** Where several causes fit, they are ranked by evidence + context, never reduced to
  one (S4, CAV6). **[D][R3]**
- **Life-stage/ancestry aware.** Pregnancy/labour physiological rise; benign-ethnic-neutropenia baseline;
  age-specific ranges; never over-flag physiological variation (S5, CAV9, CAV10). **[D][W16][W17]**
- **Repeat-first + reactive exclusion.** New abnormal → repeat with the differential after excluding recent
  infection/vaccination/surgery/stress/medication (S7, CAV5). **[D][W25]**
- **Calm red-flag routing.** Very high (>30/>50), severe neutropenia (ANC <0.5, esp. febrile — urgent), and
  persistent lymphocytosis → prompt, unhurried review; febrile severe neutropenia shouldn't wait; never
  emergency-diagnose (S10, CAV7). **[D][W12][W22]**
- **No treatment/medication guidance.** Antibiotic/steroid/G-CSF/chemotherapy questions → educate + refer (S9). **[D]**
- **Missing differential/context stated, not invented.** (S8). **[D][R4]**
- **Correct unit handling.** ×10⁹/L ≡ ×10³/µL (no analyte factor; a count, not a mass); differential pattern
  requires the differential. **[D][W6]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. WBC is **well above or below** the reference with a **discordant or unexplained differential**. **[W5]**
2. WBC is **very high** (>30, especially >50 ×10⁹/L). **[W8]**
3. **Severe neutropenia** (ANC <0.5 ×10⁹/L), especially with **fever** (febrile neutropenia — urgent, shouldn't
   wait). **[W12]**
4. **Persistent lymphocytosis** (ALC >5.0 ×10⁹/L for ~3 months). **[W22]**
5. **Pregnancy** with an unexplained high count, or an abnormal WBC with **systemic symptoms**. **[W16][W24]**
6. The user **asks a medical/medication question** (S9). **[D]**

All suggestions are wellness-framed, non-urgent (unless red flags such as febrile severe neutropenia),
non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-020 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for WBC (×10⁹/L [×10³/µL]) plus age, sex,
  pregnancy/labour, ancestry (where declared), recent-events, and medication metadata, and — as interpretation
  inputs — the **future differential (neutrophils/lymphocytes/eosinophils/monocytes), hs-CRP (SCL-006), ferritin
  (SCL-010), and haemoglobin (SCL-019)**, plus declared context (recent infection/vaccination/surgery, smoking,
  obesity, corticosteroids, chemotherapy, chronic inflammation). **[R4]**
- **Supplies (as CSL bindings):** the two-sided WBC bands with pregnancy/ancestry and ANC overlays (Category B),
  the **differential (companion) pattern**, the reused Context-First gate, the reused four-level confidence
  hierarchy **with inheritance**, the reused ranked multiple-explanations output, the reused cross-biomarker
  consumption (with graceful degradation to a screen-level read), the range-boundary and benign-ethnic-
  neutropenia disagreement display, the repeat/trend behaviour, safety rules, context guidance, and narrative
  templates — each with value + source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, cross-biomarker intelligence, the
  confidence hierarchy, and the multiple-explanations output (all frozen from SCL-010); **confidence inheritance
  (SCL-016/017/018/019)** for the differential pattern; sex/age/pregnancy-aware banding (SCL-004/010/016/017/018/
  019); the guideline-disagreement posture (SCL-003/011/012); two-sided banding (SCL-004/009/010/011/012/016/017/
  018/019); and the diagnostic-adjacency discipline (SCL-002/009/011/012/016/017/018/019). **The never-in-
  isolation, differential-paired interpretation is represented within cross-biomarker intelligence + inheritance
  — not as a new methodology.** **[C][R1][R4][R9]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (the differential completes the read,
  the pattern inherits confidence — never averaged into a single verdict; contested reference limits and
  baselines never averaged; WBC never interpreted in isolation; absolute counts over percentages).
- **Uses the correct unit handling** (×10⁹/L ≡ ×10³/µL; no analyte factor) — a per-analyte configuration.
- **Score contribution:** WBC contributes to an **immune-wellness / inflammatory-context** as an age/pregnancy/
  ancestry-aware, context-gated, differential-paired input — the differential pattern (governed by inheritance)
  as the headline and the total WBC alone as a screen-level signal — with abnormal values expressed as
  ranked-confound context rather than a verdict; context-required/abstained values do not contribute a definite
  verdict. Any weighting is a Category [C] product decision. **[C]**

---

# 22. Medication & Exposure Context (educational only)

Educational context only; BioSense does not instruct on treatment, dose, or medication changes (S9). **[D]**
- **Corticosteroids:** raise WBC (neutrophil demargination) — important context for a mildly high count; never
  a prompt to change a dose. **[A][W13]**
- **Chemotherapy / immunosuppressants:** lower WBC (and ANC) — key context for a low count and neutropenia
  direction; managed entirely by the treating team. **[A][W14]**
- **Recent infection / vaccination / surgery / stress:** transiently raise WBC (reactive) — context for a mildly
  high value; repeat. **[A][W25]**
- **Smoking / obesity:** raise WBC (inflammatory burden) — wellness context; general wellness supports not
  smoking and a healthy weight. **[A][W20]**
- **G-CSF / other haematological agents:** clinical treatments outside BioSense's scope; mentioned only as
  context, never recommended. **[A]**
- Any medication or exposure question → educational context + suggestion to speak with a healthcare
  professional; BioSense never advises starting, stopping, or changing a medication. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **WBC needs the differential. [E]** The total alone is a screen; the differential pattern and confidence
   inheritance handle this. **[W5]**
2. **Reference limits are contested. [E]** Lower 4.0/4.5/5.0; upper 10.0/11.0; shown, never averaged. **[W3]**
3. **Baselines vary by ancestry. [E]** Benign ethnic neutropenia — lower baseline without increased risk; ANC
   reference historically white-based. **[W17][W18]**
4. **WBC is highly reactive. [E]** Recent events, stress, and medications move it; repeat mitigates. **[W25]**
5. **The total obscures the subtype. [E]** A normal total can hide an abnormal differential; the differential is
   essential. **[W15]**
6. **Optimal within-range targets / inflammatory burden. [E]** Chronic high-normal WBC as inflammatory burden
   (NLR) is evolving; shown as wellness context, not a cut-off. **[W20]**
7. **Companion availability is data-dependent. [E]** Without the differential, only a screen-level statement is
   possible; the pattern degrades to a confidence limitation, not certainty. **[R4][R9]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**;
differential-paired; context-first; two-sided; pregnancy/ancestry overlays; ranked confounds; repeat with the
differential; absolute counts). **[B]/[D]**
(Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL_REFERENCE (4.5–10.0 ; unremarkable context)
"Your white blood cell count is {value} ×10⁹/L — a favourable range — and there's nothing here that stands out.
 It's a single snapshot, best read with the breakdown of your white-cell types, but this looks settled."  +CAV1 +CAV2

TEMPLATE: LOW_NORMAL_WATCH / UPPER_NORMAL_WATCH (4.0–<4.5 ; or >10.0–11.0)
"Your count is {value} ×10⁹/L — within the usual range but toward the {low/upper} end, and labs differ slightly
 on where the line sits. That's often just context, so it's read with your differential and, if borderline, repeated."  +CAV1 +CAV2 +CAV10

TEMPLATE: MILD_HIGH_FLAG (>11.0–15.0)
"Your count is {value} ×10⁹/L — mildly raised. That's often just a reaction — to a recent infection, a
 vaccination, surgery, stress, smoking, or a medicine like a steroid — rather than anything ongoing, so that's
 checked first, and it's read with your differential."  +CAV1 +CAV2 +CAV8

TEMPLATE: LOW_FLAG / HIGH_FLAG / MARKED_HIGH_FLAG (<4.0 ; >15.0 ; >30.0)
"Your count is {value} ×10⁹/L — {below/well above} the usual range. Because there are several possible
 explanations, we read it with your differential (using absolute counts), and here are the more likely causes
 for your context rather than one: {ranked A/B/C}. A repeat with the differential is often sensible."  +CAV1 +CAV2 +CAV3 +CAV5 +CAV6

TEMPLATE: RED_FLAG (severe neutropenia ANC<0.5 ; very high >30/>50 ; persistent lymphocytosis — CALM ROUTING)
"This pattern is worth a prompt, unhurried conversation with a healthcare professional, who can look at the
 fuller picture. The numbers alone don't diagnose anything."  (+for febrile severe neutropenia: "and it shouldn't wait.")  +CAV1 +CAV2 +CAV7

TEMPLATE: PREGNANCY_LABOUR
"In pregnancy and around labour, white cell count naturally rises, so this is read in that light and best
 interpreted with a professional."  +CAV1 +CAV9

MODIFIER: DIFFERENTIAL_PATTERN (differential present) →
 "With your differential, the pattern reads as {bacterial/inflammation | viral | allergic/parasitic |
  chronic-inflammation | reactive | neutropenia-direction | inflammatory-burden} context — a hint, not a
  diagnosis, read with your wider picture."  +CAV2

MODIFIER: SCREEN_ONLY (no differential) →
 "A total white cell count on its own is a screen — the breakdown into cell types is what turns it into a fuller
  picture, so we'd interpret this more confidently with it."  +CAV3

MODIFIER: RANKED_CONFOUNDS (abnormal, ≥2 causes) →
 "Possible explanations, most-to-least likely for your context: A {…}, B {…}, C {…} — best confirmed with a professional."  +CAV6

MODIFIER: ANCESTRY_BASELINE → "Some people naturally run lower white-cell or neutrophil counts without any increased risk, so we compare to your own baseline."  +CAV10
```

**Absolute rules:** no template diagnoses infection/leukaemia/immune deficiency/inflammatory disease, asserts a
single cause, emits a differential-pattern read without the differential, interprets WBC in isolation, reads
percentages without the absolute total, treats a band/pattern as a diagnostic boundary, over-flags a
pregnancy/labour or benign-ethnic-neutropenia value, alarms, or averages reference limits. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, with differential. [illustrative]**
```
Input: WBC 6.5 ×10⁹/L, normal differential, age 40.
Band: OPTIMAL_REFERENCE | Pattern: none | Confidence: STANDARD
Narrative: OPTIMAL +CAV1+CAV2.  [W2]
```

**Example 2 — Mild high, recent infection (reactive). [illustrative]**
```
Input: WBC 12.8 ×10⁹/L, neutrophil predominance, cold 5 days ago.
Band: MILD_HIGH_FLAG | Pattern: reactive (± bacterial/inflammation) | Confidence: REDUCED→repeat
Narrative: MILD_HIGH +CAV8 ; exclude reactive first ; repeat with differential +CAV5 ; NO "infection".  [W8,W25,S1]
```

**Example 3 — High WBC, no differential. [illustrative]**
```
Input: WBC 16.0 ×10⁹/L, no differential.
Band: HIGH_FLAG | Pattern: NOT computable (no differential) | Confidence: CONTEXT_REQUIRED
Narrative: screen-only +CAV3 ; request differential ; +CAV6 ; NO diagnosis.  [W5,R9,S3]
```

**Example 4 — Low WBC with low ANC on chemotherapy. [illustrative]**
```
Input: WBC 2.2 ×10⁹/L, ANC 0.4 ×10⁹/L, on chemotherapy, febrile.
Band: LOW_FLAG + ANC overlay (severe neutropenia <0.5) | Pattern: neutropenia-direction (chemo) | Confidence: STANDARD→urgent route
Narrative: RED_FLAG calm-but-prompt +CAV7 ("shouldn't wait") ; NO "neutropenia" as a diagnosis label ; educate+refer.  [W11,W12,S10]
```

**Example 5 — Low count, benign ethnic neutropenia. [illustrative]**
```
Input: WBC 3.6 ×10⁹/L, ANC 1.3 ×10⁹/L, African ancestry, well, stable for years.
Band: LOW_FLAG + ancestry overlay | Pattern: baseline (benign ethnic neutropenia) — do not over-flag | Confidence: REDUCED
Narrative: baseline-aware +CAV10 ; compare to own trend ; NO diagnosis ; route only if new/symptomatic.  [W17,W18,S5]
```

**Example 6 — Very high WBC. [illustrative]**
```
Input: WBC 52 ×10⁹/L.
Band: MARKED_HIGH_FLAG (>50 leukaemia question) | Pattern: needs differential | Confidence: STANDARD→route
Narrative: RED_FLAG calm prompt review +CAV7 ; NO "leukaemia" diagnosis ; differential essential.  [W8,S10]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-006 (hs-CRP)** — inflammation companion; corroborates an inflammatory/infective direction.
- **SCL-010 (Ferritin)** — acute-phase / iron companion; source of the reused Context-First Interpretation
  Framework, cross-biomarker intelligence, four-level confidence hierarchy, and multiple-explanations output.
- **SCL-019 (Haemoglobin)** — CBC companion; read together for the haematological picture; source (with
  SCL-016/017/018) of the reused **confidence inheritance** principle applied to the differential pattern.
- **SCL-016 (Creatinine + eGFR) / SCL-017 (TSH) / SCL-018 (Free T4)** — further precedent for the reused
  confidence inheritance and sex/age/pregnancy-aware banding.
- **SCL-011 (Vitamin D) / SCL-012 (B12)** — precedent for guideline-disagreement / multi-framework display
  (here: reference-range limits; benign ethnic neutropenia baseline).
- **Future neutrophils / lymphocytes / eosinophils / monocytes** — the differential subtypes WBC consumes for
  its pattern; where unavailable, a confidence limitation is recorded.
- **SCL-009 (Fasting Glucose) / SCL-002 (HbA1c)** — metabolic context; and source of the reused diagnostic-
  adjacency discipline.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the W-series IDs in §0 and
> the body. Developers finalising the pack should confirm exact page/table locators against the primary sources
> where required.

**Definition, ranges, units, differential (Category A anchors)**

1. **Biology Insights (What Is WBC in Blood?).** — *WBC = immune-activity snapshot; produced in marrow, patrol
   for bacteria/viruses/parasites; normal adult 5,000–10,000/µL; newborns 9,000–30,000; children ≤2 6,200–
   17,000; units 5.0–10.0 (thousands) ≡ 5–10 ×10⁹/L; >10,000 = leukocytosis; total is a screen, differential
   breaks it down; neutrophils→bacterial, lymphocytes→viral, eosinophils→allergy/parasites (W1, W3, W4, W5, W6, W15, W21).*
2. **Ada (White Blood Count) & preventivemedicinedaily (WBC Normal Range).** — *healthy adult 4,000–11,000/µL
   (Ada) / 4,500–11,000 (preventivemedicinedaily); leukocytosis = abnormally high; most elevations symptomless;
   five subtypes; CBC-with-differential more useful than total; neutrophils→bacterial, lymphocytes→viral/certain
   leukaemias, eosinophils→allergic/parasitic, monocytes→chronic inflammation; leukopenia from chemo/autoimmune/
   meds/marrow/viral (W1, W3, W4, W5, W13, W14, W15, W24).*
3. **kantesti.net (WBC Normal Range by Age).** — *adult 4.0–11.0 ×10⁹/L (4,000–11,000/µL); leukocytosis >11.0;
   11.1–15.0 mild/reactive; >15.0 stronger; >30.0 prompt review; >50.0 leukemoid/leukaemia; leukopenia <4.0;
   pregnancy/labour mid-teens, postpartum 20–30; persistent lymphocytosis ALC >5.0 ×3mo; percentages without
   total commonly misread (82%×WBC2.0→ANC1.64) (W2, W7, W8, W9, W16, W22, W23, W25).*

**Thresholds, ANC, ethnic variation, disagreement (Category A)**

4. **Medscape (Leukocyte Count: Reference Range) — emedicine 2054452.** — *leukopenia <4 ×10⁹/L; leukocytosis
   >10 ×10⁹/L; leukopenia most often neutropenia, characteristically neutrophil count <1.5 ×10⁹/L; reactive
   leukocytosis from infection/stress/trauma/inflammation (W2, W7, W9, W10, W25).*
5. **StatPearls (Leukocytosis) — NBK560882.** — *WBC >11,000/µL = leukocytosis; >100,000 = hyperleukocytosis;
   thresholds vary by age/pregnancy; differential helps identify aetiology (eosinophilia→allergic/parasitic,
   lymphocytosis→viral/autoimmune); infection/inflammation/allergy/malignancy/hereditary causes (W7, W13, W15, W25).*
6. **ASH Blood (How I manage quantitative neutrophil abnormalities) — Blood 142(9):786.** — *ANC neutropenia
   <1500/µL: mild 1000–1500, moderate 500–1000, severe <500, agranulocytosis <200; WBC ~4400–11,000/µL
   (lab-dependent); differential should always be obtained for an elevated count; ANC "normal" historically
   defined on white individuals; African ANC <1500 common and usually normal (W5, W11, W17, W18).*
7. **Cleveland Clinic (Neutropenia) & Apex Blood (Neutrophils) & PMC5340092 (ANC prognostic cutoff, African
   Americans).** — *neutropenia mild 1000–1500, moderate 500–1000, severe <500 (some cut-off 1800); benign
   ethnic neutropenia (African/Middle-Eastern/West-Indian, Duffy-null) ANC <1500 without increased infection
   risk; WBC read alongside other cell types + hs-CRP + context; chronic elevation = inflammatory burden; NLR
   optimal ~1–3 (W11, W12, W14, W17, W19, W20).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–7; they are BioSense
> Version 1 classifications, two-sided and context-gated with pregnancy/labour and ancestry overlays, not
> attributable to any single reference as a diagnostic threshold, and **do not restate diagnostic labels.** The
> differing reference-range limits, the ANC neutropenia cut-off variation, and the benign-ethnic-neutropenia
> baseline are shown separately and **never averaged**; WBC is presented as a differential-paired screen, never
> in isolation, never a diagnosis of infection/malignancy/immune disease; the differential pattern is a hint
> whose confidence inherits the lower input, never a standalone verdict.

---

# 28. Founder Decisions Required

The WBC methodology reuses frozen BioSense frameworks and represents WBC via the existing Context-First,
cross-biomarker (differential-paired), confidence-inheritance, and guideline-disagreement frameworks. Two
optional presentation/policy items remain: **[C][E]**

**D-1 — Confirm the two-sided band structure with the severity gradient and range-boundary presentation.**
SCL-020 uses the overlap of the cited adult ranges (4.5–10.0) as Optimal, the range-boundary disagreements
(4.0–4.5 low; 10.0–11.0 upper) as watch zones, the leukopenia threshold (<4.0) as the low flag, and the
leukocytosis severity gradient (11–15 mild; 15–30; >30 marked) as the high flags, with an **ANC overlay** on the
low side and **benign-ethnic-neutropenia** and **pregnancy/labour** overlays. Confirmation requested that this
two-sided, severity-graded, overlay-based presentation (with contested reference limits shown side by side and
never averaged) is the intended default. **Founder sign-off requested.**

**D-2 — Confirm the differential-pairing activation and CBC-dependency scope for V1.** SCL-020 emits a
**differential-pattern read only when the differential (future neutrophils/lymphocytes/eosinophils/monocytes)
and/or hs-CRP are available** (else a screen-level statement with inherited/limited confidence), uses **absolute
counts** (ANC) rather than percentages alone, and applies the pregnancy/labour and ancestry overlays. **Founder
decision requested** on whether V1 activates WBC now (degrading gracefully to a screen-level read until the
differential subtypes are authored, while already consuming hs-CRP (SCL-006), ferritin (SCL-010) and haemoglobin
(SCL-019) for inflammatory/haematological context) — noting that the inflammatory-context and screen-level
behaviours are activatable now, with the future neutrophil/lymphocyte/eosinophil/monocyte SCLs enriching the
differential-pattern layer when authored.

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-020 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/reference
figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was fabricated; every
Category [A] number was retrieved and verified during authoring and traces to §27. WBC reuses frozen BioSense
methodology throughout — the Context-First Interpretation Framework, cross-biomarker intelligence, the four-level
confidence hierarchy, and the multiple-explanations output (all from SCL-010), confidence inheritance (SCL-016/
017/018/019, for the differential pattern), sex/age/pregnancy-aware banding (SCL-004/010/016/017/018/019), the
guideline-disagreement posture (SCL-003/011/012), two-sided banding with flags (SCL-004/009/010/011/012/016/017/
018/019), and the diagnostic-adjacency discipline (SCL-002/009/011/012/016/017/018/019) — introducing only
WBC-specific scientific content (the thresholds and their two-sided/severity structure; the ×10⁹/L ≡ ×10³/µL
units; the pregnancy/labour and ancestry overlays; the range-boundary and benign-ethnic-neutropenia
disagreements; the differential-hint layer; the reactive-shift and percentage-without-total confounds; and the
trend/repeat behaviour). WBC is represented as a marker of immune-system activity — a context-first,
differential-paired screen, never interpreted in isolation, and never a diagnosis of infection, malignancy, or
immune disease. No new methodology was required; all structure remains consistent with SCL-001 through SCL-019.*
