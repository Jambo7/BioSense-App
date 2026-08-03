# SCL-019 — HAEMOGLOBIN (Hb)
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Reuses frozen BioSense methodology. Haemoglobin is a two-sided, context-first oxygen-carrying biomarker interpreted alongside iron, B12, folate, kidney function, and future CBC indices using the existing Cross-Biomarker Intelligence, Confidence Hierarchy, Confidence Inheritance, and Guideline-Disagreement frameworks. Never interpreted in isolation. Never a diagnosis of blood disease. No new methodology introduced.*

**Document ID:** SCL-019
**Biomarker:** Haemoglobin (Hb) — oxygen-carrying protein; two-sided; context-first; sex/age/pregnancy-aware
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 2 August 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. Haemoglobin reuses the frozen methodology throughout — the Context-First Interpretation Framework (SCL-010), cross-biomarker intelligence (SCL-010), the four-level confidence hierarchy (SCL-010), **confidence inheritance** (SCL-016/017/018), multiple-explanations output (SCL-010), two-sided banding (SCL-004/009/010/011/012/016/017/018), sex/age/pregnancy-aware banding (SCL-004/010/016/017/018), guideline-disagreement handling (SCL-003/011/012), and the diagnostic-adjacency discipline (SCL-002/009/011/012/016/017/018) — introducing only Haemoglobin-specific scientific content. All sections remain consistent with SCL-001 through SCL-018.

---

> **What this document is.** SCL-019 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for Haemoglobin. It reuses existing BioSense
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

## STRUCTURAL-FIT NOTE (Haemoglobin vs SCL-001) — reuses frozen frameworks; no new pattern

Haemoglobin presents the same structural characteristics BioSense has already solved for, and maps onto the
frozen methodology without extension. Haemoglobin is a measure of the blood's **oxygen-carrying capacity**, and
its meaning is **inseparable from surrounding biological context** — iron stores, B12/folate, kidney function,
hydration, altitude, pregnancy, and the red-cell indices — so it reuses the Cross-Biomarker Intelligence and
Context-First frameworks:

1. **Never-in-isolation interpretation — reused cross-biomarker intelligence (SCL-010) + multiple-explanations
   (SCL-010).** Haemoglobin screens oxygen-carrying capacity, but the meaningful wellness read comes from
   Haemoglobin **plus its companions** — ferritin (SCL-010), B12 (SCL-012), folate (SCL-013), creatinine/eGFR
   (SCL-016), white cell count (SCL-020), and the future red-cell indices (MCV/MCH/RDW) — which is exactly a
   consume-companions-and-rank-the-interpretation pattern (§0.5, §9). Haemoglobin alone is a screen; its
   companions explain *why* it is high or low. **Haemoglobin is never interpreted in isolation.**
2. **Confidence inheritance — reused (SCL-016/017/018).** An Haemoglobin-plus-companion pattern **inherits the
   lower confidence** of its inputs; if the companions are unavailable, the read is confidence-limited, not
   asserted (§0.6, §13).
3. **Context-First — reused (SCL-010).** Haemoglobin is interpreted only after context — sex, age, pregnancy/
   trimester, hydration, altitude, smoking, recent donation, recent bleeding, endurance training, chronic
   inflammation, and kidney function — evaluated **before** banding (§0.2, §8, §12).
4. **Two-sided banding with flags — reused.** Haemoglobin is meaningfully two-sided: **low** (a reduced-oxygen-
   carrying-capacity direction) and **high** (an elevated direction), each flagged and sex-specific (§11).
5. **Sex/age/pregnancy-aware banding — reused (SCL-004/010/016/017/018).** Haemoglobin ranges differ by **sex**,
   drop in **pregnancy** (haemodilution, trimester-specific), and are **altitude/smoking-adjusted**, so banding
   carries sex, pregnancy, and altitude overlays (§11).
6. **Guideline-disagreement handling — reused (SCL-003/011/012).** The WHO cutoff (13.0 g/dL men) vs some US
   labs (13.5), the WHO 2024 revisions vs prior, the Beutler/Braat statistical thresholds, and the polycythaemia
   2016-vs-2008 thresholds are presented as distinct frameworks, **never averaged** (§10, §11).
7. **Multiple-explanations output — reused (SCL-010).** An abnormal Haemoglobin gets **ranked possibilities**
   (iron deficiency, B12/folate, kidney-related, blood loss, haemodilution/hydration, altitude/training, a
   marrow-related pattern) — never a single certain cause (§11, §14).
8. **Diagnostic-adjacency discipline — reused (SCL-002/009/011/012/016/017/018).** BioSense never emits
   "anaemia," "polycythaemia," "bleeding disorder," or "bone-marrow disease" as a diagnosis; it detects the
   pattern, routes, and names nothing (§18, §19).

**Biomarker-specific content introduced:** the Haemoglobin thresholds and their two-sided/sex-specific structure;
the g/dL↔g/L↔mmol/L units; the pregnancy and altitude overlays; the WHO-2024/US-lab/Beutler/PV disagreements;
the morphology-hint layer (via future MCV/MCH/RDW + iron/B12/folate); the spurious-high and haemodilution
confounds; and the trend/repeat behaviour. **No new methodology is required.** **[C]**

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

Haemoglobin is best understood as **a marker of the blood's oxygen-carrying capacity** — the iron-rich protein
in red cells that ferries oxygen from the lungs to the tissues — **not** as a standalone verdict and **not** as
a direct measure of red-cell mass. Its meaning is inseparable from context: the same Haemoglobin reads very
differently depending on **sex**, **pregnancy**, **altitude**, **hydration**, and — crucially — the **companion
markers** that explain it. A low Haemoglobin with low ferritin points one way; a low Haemoglobin with low B12 or
folate another; a low Haemoglobin with reduced kidney function another again; and a high Haemoglobin may simply
reflect dehydration, altitude, or smoking rather than anything about the marrow.

So BioSense reads Haemoglobin **with its companions** (ferritin, B12, folate, kidney function, white cells, and
the future red-cell indices), **never in isolation**, begins with biological context — sex, age, pregnancy,
hydration, altitude, smoking, recent donation or bleeding, endurance training, and inflammation all move
Haemoglobin — ranks the plausible explanations for an abnormal value rather than asserting one, shows where
guidelines genuinely differ (including the WHO 2024 revisions and the WHO-vs-US-lab cutoff difference) rather
than splitting them, and names no condition.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as the
evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate Haemoglobin. Every value carries a source ID (N-series / R-series → §27)
> and a category tag. Canonical unit: g/dL (SI g/L = g/dL × 10; mmol/L = g/dL ÷ 1.611). **Two-sided,
> context-first, sex/age/pregnancy/altitude-aware; NEVER interpreted in isolation; companion-pattern verdict
> inherits lower input confidence; NEVER a blood-disease diagnosis.**

## 0.1 Canonical units — [A]
```
canonical_unit: g/dL   (SI: g/L = g/dL × 10; mmol/L = g/dL ÷ 1.611 ≈ × 0.6206)   [N5]   # NOT an analyte-specific conversion like lipids/glucose — do NOT apply 38.67/88.57/88.4/18.0/2.496/0.738/2.266/12.87
Always retain value + unit + sex + age + pregnancy/trimester + altitude/smoking + hydration + available companions (ferritin/B12/folate/eGFR/WBC/MCV...). Never guess a missing unit. [ENG platform rule]
```

## 0.2 Context-First Interpretation gate — [C] — REUSED (SCL-010), runs BEFORE banding
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [R1]
  companions (NEVER-IN-ISOLATION): ferritin (SCL-010), B12 (SCL-012), folate (SCL-013), creatinine/eGFR (SCL-016), WBC (SCL-020), future MCV/MCH/RDW; [N14,N15,N16]
  sex: sex-specific ranges (testosterone ↑; menstruation ↓);                                                   [N4]
  life-stage: age, pregnancy + trimester (haemodilution → Hb naturally drops; trimester thresholds);           [N6]
  environment: altitude & smoking (raise Hb → WHO downward adjustment before cutoffs);                         [N8,N8b]
  volume/behaviour: hydration/plasma volume (relative anaemia/polycythaemia), recent blood donation, recent bleeding, endurance training; [N12,N23]
  inflammation & kidney: chronic inflammation, kidney function (CKD lowers Hb via reduced EPO);                [N14]
  assay: spurious HIGH Hb from turbidity (hyperlipidaemia, high leukocytes, haemolysis, abnormal proteins, nucleated RBCs). [N13]
CORE RULE (founder): Hb is a marker of OXYGEN-CARRYING CAPACITY (not RBC mass; relative vs absolute) → interpret WITH companions/context; NOT a blood-disease diagnosis. [N1,N12][B3]
  → Hb alone = screen; the cause (iron/B12/folate/CKD/blood loss/haemodilution/altitude) requires companions + context. [N14,N15]
  → where several explanations fit an abnormal Hb, RANK them (§0.5); never assert one.
IF material context changes meaning → interpret WITHIN that context.                                          [R1]
IF companions / key context unavailable → CONFIDENCE LIMITATION (pattern confidence limited), not certainty.  [R4,R9]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors) — TWO-SIDED, SEX-SPECIFIC
```
Hb_WELLNESS_BAND (g/dL [g/L], general non-pregnant adult; after context gate; ALWAYS read with companions):   [N2,N3,N9,N10]
 MALE:
  LOW_FLAG              v < 13.0   [<130]              # below WHO anaemia cutoff (men); reduced-capacity direction [N2]
  LOW_NORMAL_WATCH      13.0 <= v < 13.5   [130–<135]  # WHO-normal but below some US-lab lower limit (guideline-difference zone) [N19]
  OPTIMAL_REFERENCE     13.5 <= v <= 16.5   [135–165]  # within standard male reference [N3]
  UPPER_WATCH           > 16.5 <= 18.5   [>165–185]    # above 2016-PV male flag (16.5) up to 2008 flag (18.5) — watch/exclude relative causes [N10,N9]
  HIGH_FLAG             v > 18.5   [>185]              # markedly elevated (2008 PV male threshold) [N9]
 FEMALE (non-pregnant):
  LOW_FLAG              v < 12.0   [<120]              # below WHO anaemia cutoff (women); reduced-capacity direction [N2]
  LOW_NORMAL_WATCH      12.0 <= v < 12.3   [120–<123]  # low end of reference (lab-dependent) [N3]
  OPTIMAL_REFERENCE     12.3 <= v <= 15.5   [123–155]  # within standard female reference [N3]
  UPPER_WATCH           > 15.5 <= 16.5   [>155–165]    # upper part; approaching high flags — watch/exclude relative causes [N3,N10]
  HIGH_FLAG             v > 16.5   [>165]              # markedly elevated (2016-PV female threshold) [N10]
DIRECTION: TWO-SIDED (low = reduced-oxygen-carrying-capacity direction; high = elevated direction). SEX-SPECIFIC. [R6,R8]
PREGNANCY OVERLAY: use trimester thresholds (§0.4); do NOT apply the non-pregnant bands. [N6]
ALTITUDE/SMOKING OVERLAY: apply WHO downward adjustment to measured Hb BEFORE banding. [N8,N8b]
UNIT: g/dL [g/L]. COMPANIONS (ferritin/B12/folate/eGFR/MCV) REQUIRED to move from screen to interpretation; if absent → screen-level read + reduced pattern confidence. [N14,N15][R9]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never in isolation; never a diagnostic label. [B][D]**

## 0.4 Pregnancy, altitude & high-Hb overlays (guideline-disagreement, never averaged) — [A]/[B]
```
PREGNANCY (physiological haemodilution → Hb naturally drops; trimester thresholds):   [N6]
  anaemia-direction flag: <11.0 g/dL T1 & T3; <10.5 g/dL T2 (WHO 2024). Do NOT apply non-pregnant bands; route (professional matter). [N6][D]
ALTITUDE & SMOKING (raise Hb):   [N8,N8b]
  apply WHO 2024 (BRINDA-based) downward adjustment to measured Hb before applying cutoffs; adjustment lowers cutoffs >3000m, raises <3000m. [N8]
HIGH-Hb / ELEVATED-DIRECTION (guideline disagreement, represent BOTH, NEVER average):   [N9,N10,N11]
  WHO 2008 polycythaemia: >18.5 g/dL men, >16.5 g/dL women. [N9]
  WHO 2016 PV revision (lowered): >16.5 g/dL men, >16.0 g/dL women. [N10]
  Alt criterion: >17 men / >15 women WITH sustained ≥2 g/dL rise from baseline (not iron-deficiency correction). [N11]
  → exclude RELATIVE (haemodilution/dehydration) & spurious-high before reading an elevated Hb; route. [N12,N13]
GUIDELINE DISAGREEMENT (low-direction, represent, NEVER average): WHO men <13.0 vs some US labs <13.5; Beutler/Braat statistical <13.7 (men 20–60)/<13.2 (older men)/<12.2 (women). WHO 2024 statistical-percentile approach is contested. [N19,N20,N21]
```

## 0.5 Companion-pattern (morphology) hints — [A]+[C] — REUSED cross-biomarker (SCL-010) + inheritance (SCL-016/017/018)
```
COMPANION-PATTERN INTERPRETATION (pattern hints, NOT diagnoses; require companions; confidence inherits lower input): [R4,R9]
  LOW Hb + low ferritin (SCL-010) [± low MCV future]  → iron-deficient PATTERN (most common low-Hb cause). [N14,N16,N15]
  LOW Hb + low B12 (SCL-012) / low folate (SCL-013) [± high MCV future] → B12/folate PATTERN (macrocytic direction). [N14,N15]
  LOW Hb + reduced eGFR (SCL-016)                     → kidney-related PATTERN (reduced EPO). [N14]
  LOW Hb + normal companions / acute drop            → blood-loss or dilutional PATTERN (recent bleeding/donation/pregnancy haemodilution). [N6,N12]
  LOW Hb + low MCV + RBC >5.0 (future)               → thalassaemia-trait-more-likely-than-iron PATTERN hint. [N17]
  HIGH Hb + dehydration/altitude/smoking context      → RELATIVE / adaptive PATTERN (exclude before elevated-direction read). [N12,N23]
  HIGH Hb + no relative cause + sustained rise        → elevated-direction PATTERN (route; do NOT name). [N10,N11]
GOVERNANCE: emit a companion-pattern read ONLY with the relevant companions; else screen-level + confidence limitation. NEVER a diagnosis; RANK confounds first (§0.2). [R7,R9]
NOTE: haemodilution / dehydration / spurious-high / recent donation-or-bleeding can produce discordant patterns → exclude before interpreting (defer/repeat). [N12,N13]
```

## 0.6 Confidence hierarchy (four-level) + inheritance — [C] — REUSED (SCL-010 + SCL-016/017/018)
```
STANDARD          : clear Hb AND key companions available (≥ ferritin, or MCV/iron studies) AND sex/life-stage known AND no acute-volume/spurious/altitude confound.
REDUCED           : single value / near a boundary / sex-or-trimester-or-altitude overlay uncertain / minor context — band cautiously. [R2]
CONTEXT_REQUIRED  : abnormal Hb with NO companions (no pattern) OR unexcluded confound (haemodilution/dehydration/spurious-high/recent bleeding) → screen-level + request companions/repeat; name what's needed. [R2,R4]
ABSTAINED         : significant contextual uncertainty / conflicting signals / pregnancy needing professional ranges / likely acute bleeding or spurious result — explained abstention. [R2,N12,N13]
INHERITANCE: the Hb+companion pattern verdict inherits the LOWER confidence of Hb and its companions; companions absent → pattern limited to a screen-level statement. [R9]
Reduced confidence does NOT auto-block; significant uncertainty MAY justify abstention. New borderline value → prefer REPEAT (with companions).
```

## 0.7 Deterministic safety & suppression rules — [D]
```
S1  Hb is NOT a diagnosis. NEVER emit "anaemia", "polycythaemia", "polycythaemia vera", "erythrocytosis", "bleeding disorder", "bone-marrow disease/failure", "leukaemia", "thalassaemia", or any condition as a label. Detect patterns; explain possibilities; identify uncertainty; route. [R7]
S2  Hb is a marker of oxygen-carrying capacity (not RBC mass) → interpret WITH companions/context; NEVER in isolation. [B3][N1,N12]
S3  Emit a companion-pattern read ONLY with the relevant companions (ferritin/B12/folate/eGFR/MCV); else screen-level + confidence limitation (inheritance). [R9]
S4  On abnormal Hb with ≥2 plausible causes → RANKED possibilities (iron, B12/folate, kidney, blood loss, haemodilution/hydration, altitude/training, marrow-related); NEVER assert one. [R3]
S5  Sex/life-stage/environment aware: apply SEX-specific bands; PREGNANCY trimester thresholds; ALTITUDE/SMOKING adjustment; never non-pregnant/unadjusted bands where these apply. [N4,N6,N8]
S6  HIGH Hb → exclude RELATIVE (dehydration/haemodilution) and SPURIOUS-HIGH (turbidity) before an elevated-direction read; then route. [N12,N13]
S7  New/isolated borderline value → suggest REPEAT (with companions); exclude acute bleeding, donation, hydration, and spurious causes first. [N12,N13]
S8  Companions (ferritin/B12/folate/eGFR/MCV/WBC) unavailable → confidence limitation, not invented certainty. [R4]
S9  Never recommend treatments/medication changes/doses (e.g. iron, B12, EPO, transfusion); never produce a numeric blood-disease-risk %; medication/supplement questions → educate + refer. [D]
S10 RED FLAGS (very low Hb with symptoms of poor oxygen delivery; rapid/acute drop suggesting active bleeding; very high Hb with sustained rise; pregnancy with abnormal Hb) → calm prompt healthcare review; never emergency-diagnose. [N18,N24][D]
S11 Never present a BioSense band, reference range, or companion pattern as a medical/diagnostic boundary.
S12 Represent WHO-vs-US-lab, WHO-2024-vs-prior, Beutler/Braat, and PV-2016-vs-2008 disagreement; NEVER average thresholds. [N19,N20,N10][R5]
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & COMPANIONS (the key Hb move): ALWAYS read with ferritin (SCL-010) / B12 (SCL-012) / folate (SCL-013) / eGFR (SCL-016) / WBC (SCL-020) / future MCV-MCH-RDW; apply sex, pregnancy & altitude overlays; exclude haemodilution / dehydration / spurious-high / recent bleeding-or-donation; for a NEW borderline value, REPEAT (with companions). [N14,N15,N12]
Tier 2 LIFESTYLE (context-appropriate): general blood-health wellness (iron-, B12-, folate-rich balanced diet, hydration, not smoking) — framed as education, not treatment; note altitude/training/pregnancy shift Hb physiologically. [N8b,N14]
Tier 3 HEALTHCARE DISCUSSION (calm) when: Hb below the sex/pregnancy cutoff (esp. with symptoms) | rapid/acute drop | very high Hb with sustained rise | discordant companion pattern | pregnancy with abnormal Hb. [N2,N10,N18][D]
NEVER a specific treatment, supplement dose, or transfusion recommendation at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → sex/pregnancy/altitude overlay → Hb band + companion pattern (if companions) → template; RANKED confounds where abnormal; ALWAYS "read with companions".
OPTIMAL_REFERENCE (+ normal companions) → affirming, with the "screen + read with companions" caveat.
LOW_NORMAL_WATCH / UPPER_WATCH → calm; within/near reference; context (sex/pregnancy/altitude/hydration); repeat if borderline.
LOW_FLAG / HIGH_FLAG → constructive; companion pattern; ranked confounds; repeat; ALWAYS "not a diagnosis".
low with symptoms, or acute drop, or high with sustained rise → calm prompt healthcare review; never alarm, never diagnose.
high Hb → exclude relative/spurious first; do NOT read as elevated-direction until context excluded.
pregnancy → trimester thresholds; route.
companions unavailable → screen-level statement + confidence limitation; name that companions complete the picture.
Never "normal/abnormal" as a verdict; never a diagnosis (anaemia/polycythaemia/bleeding disorder/bone-marrow disease).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Haemoglobin reflects your blood's oxygen-carrying capacity, so it's read together with your iron, B12,
      folate, kidney and red-cell markers — the same number can mean different things depending on them — and
      alongside your wider context."
CAV3 (screen/no companions) "Haemoglobin on its own is a screen. Markers like ferritin, B12, folate and the
      red-cell indices are what turn it into a fuller picture, so we'd interpret this more confidently with them."
CAV4 (reduced/context) name the context reducer(s) or missing companion (ferritin, B12, folate, kidney function, MCV, sex, trimester, altitude, hydration).
CAV5 (new/borderline) "Haemoglobin shifts with hydration, altitude, smoking, pregnancy, recent blood donation
      and lab method without any disease being present — so a single mildly out-of-range value is usually best
      repeated (with companions) before reading much into it."
CAV6 (abnormal, ranked) "Because several things affect Haemoglobin, we've noted the more likely explanations
      given your context rather than pointing to one — best confirmed with a professional."
CAV7 (low+symptoms / acute drop / high+sustained rise) "This pattern is worth a prompt, unhurried conversation
      with a healthcare professional."
CAV8 (high Hb) "A higher Haemoglobin is often just concentration — dehydration, altitude or smoking — rather
      than the marrow making too much, so that's checked first before reading anything into it."
CAV9 (pregnancy) "In pregnancy, Haemoglobin naturally falls as blood volume expands, so pregnancy results use
      trimester-specific thresholds and are best interpreted with a professional."
CAV10 (guideline/lab) "Anaemia cutoffs differ slightly between the WHO and some labs, so we compare against your
       own lab's reference range wherever possible and show where guidance differs."
```

## 0.11 Source & version identifiers
```
config_id: SCL-019   config_version: 1.0
band_id: BIOSENSE_HB_TWOSIDED_SEX_BANDS_v1              (Category B; two-sided; sex-specific; anchors N2,N3,N9,N10)
pregnancy_overlay_id: SCL019_HB_PREGNANCY_v1           (trimester thresholds; haemodilution; N6)
altitude_overlay_id: SCL019_HB_ALTITUDE_SMOKING_v1     (WHO 2024 BRINDA adjustment; N8,N8b)
high_hb_overlay_id: SCL019_HB_HIGH_v1                  (PV 2016 vs 2008; relative/spurious exclusion; N9,N10,N11; never averaged)
companion_pattern_id: SCL019_HB_COMPANION_PATTERN_v1   (cross-biomarker + multiple-explanations; parents Hb+ferritin/B12/folate/eGFR/MCV; R4; N14-N17)
context_first_ref: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (reused from SCL-010; R1)
confidence_hierarchy_ref: SCL010_CONTEXT_CONFIDENCE_v1   (reused; R2)
confidence_inheritance_ref: SCL016_CONFIDENCE_INHERITANCE_v1 (reused SCL-016/017/018; R9)
multi_explanation_ref: SCL010_MULTIPLE_EXPLANATIONS_v1   (reused; R3 — ranked confounds/causes)
cross_biomarker_ref: SCL010_CROSS_SCL_CONSUMPTION_v1     (reused; R4 — ferritin/B12/folate/eGFR/WBC/future MCV-MCH-RDW)
sex_age_preg_aware_ref: SCL004/010/016/017/018 posture   (reused; R8)
guideline_disagreement_ref: SCL011/012 posture           (reused; R5 — WHO/US-lab/Beutler/PV; never averaged)
safety_rules_id: SCL019_SAFETY_v1                        (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Haemoglobin (Hb) is the iron-rich protein inside red blood cells that carries oxygen from the lungs to the rest
of the body; <cite index="9-1">when it drops too low, tissues receive less oxygen — which is why fatigue and breathlessness are the classic signs</cite>. Its concentration <cite index="3-3">reflects the total amount of Hb present in peripheral blood and serves as an indirect measure of the number of circulating red blood cells</cite>. **[A][N1]**

The defining feature for interpretation is that Haemoglobin is **a concentration, not a red-cell mass**, and its
meaning depends entirely on context and companions. <cite index="3-3">Factors that cause changes in the plasma volume, without changes in the overall RBC mass, can also affect Hb and may lead to the presence of relative anemia or relative polycythemia.</cite> And the causes of a low value are several: <cite index="7-1">the most common cause is iron deficiency, but it can also result from vitamin B12 or folate deficiency, chronic kidney disease, blood loss, or bone marrow conditions</cite> — which is precisely why Haemoglobin is read **with** ferritin, B12, folate, kidney function, and the red-cell indices, never alone. **[A][N12][N14]**

Haemoglobin is also strongly **context-dependent**: <cite index="4-1">hydration, altitude, smoking, pregnancy, and lab methods can shift hemoglobin without reflecting a disease process</cite>. So BioSense reads Haemoglobin **with its companions**, in context, and names no condition. **[B][B2]**

- **Reported in:** g/dL (SI g/L = g/dL × 10; mmol/L = g/dL ÷ 1.611). **[A][N5]**
- **Nature:** oxygen-carrying protein concentration; **two-sided**; **sex-specific**; **never in isolation**;
  **not a blood-disease diagnosis** **[A][B3]**
- **Direction:** two-sided (low = reduced-capacity direction; high = elevated direction) **[A][R6]**
- **Companions:** ferritin (SCL-010), B12 (SCL-012), folate (SCL-013), creatinine/eGFR (SCL-016), WBC
  (SCL-020), future MCV/MCH/RDW **[A][N14][N15]**
- **BioSense role:** a context-first, companion-paired oxygen-carrying-capacity screen with sex, pregnancy, and
  altitude overlays.

---

# 2. Physiological Function

Haemoglobin sits inside red cells and binds oxygen in the lungs, releasing it in the tissues; its concentration
therefore sets the blood's **oxygen-carrying capacity**. Because it is expressed per volume of blood, it is
sensitive to **plasma volume** as well as to red-cell production — dehydration concentrates it, fluid overload
and pregnancy's plasma expansion dilute it. **[A][N1][N12]** Red-cell production depends on iron (for haem),
B12 and folate (for DNA synthesis in precursors), erythropoietin from the kidneys, and a healthy marrow — so a
change in Haemoglobin can arise anywhere along that chain. **[A][N14]**

Two features define interpretation **[A]**:
- **Haemoglobin is a concentration, not a mass.** Plasma-volume shifts cause *relative* highs and lows
  independent of red-cell mass, so hydration/pregnancy/altitude context is essential. **[A][N12]**
- **Its causes are multi-marker.** Iron, B12, folate, kidney function, blood loss, and marrow all feed into it,
  so companions (ferritin, B12, folate, eGFR, and the red-cell indices) localise *why* it moved. **[A][N14][N15]**

---

# 3. Scientific Background

Three scientific themes shape how BioSense represents Haemoglobin. **[A]**

**First, Haemoglobin means little in isolation.** A low value is only a starting point — <cite index="8-1">the MCV, RDW, and red blood cell count tell you why</cite>, and ferritin, B12, folate and kidney function separate the common causes (iron deficiency, B12/folate deficiency, chronic kidney disease, blood loss, marrow-related). BioSense therefore treats Haemoglobin **plus its companions** as the unit of interpretation. **[A][N14][N15]**

**Second, the thresholds are genuinely contested.** The WHO anaemia cutoffs are <cite index="9-1">below 13.0 g/dL in adult men, below 12.0 g/dL in non-pregnant women, and below 11.0 g/dL during pregnancy</cite>, and the <cite index="9-1">2024 review kept the adult thresholds unchanged, adjusting only the values for young children and the second trimester of pregnancy</cite>. Yet <cite index="2-1">WHO uses 13.0 g/dL for men; some US labs use 13.5 g/dL as the lower male limit</cite>, statistical proposals put the male threshold higher still, and the WHO 2024 statistical-percentile method is itself disputed. On the high side, <cite index="16-1">hemoglobin thresholds for men and women were lowered in the 2016 revision to the WHO diagnostic criteria (16.5 g/dL for men or 16 g/dL for women) to include most cases of masked PV that were missed by the 2008 WHO criteria (18.5 g/dL for men and 16.5 g/dL for women)</cite>. BioSense **presents these frameworks side by side and never averages them.** **[A][N2][N7][N19][N10]**

**Third, Haemoglobin is easily confounded.** Plasma-volume shifts, altitude, smoking, and lab method move it
without disease; <cite index="3-3">erroneously high results may be seen with increased sample turbidity due to hyperlipidemia, abnormal plasma proteins, large numbers of leukocytes, hemolysis, abnormal Hb, or nucleated RBCs</cite>; and the risk relationship is <cite index="6-1">non-linear ... with increased risk at extremes of both low and high concentrations</cite>. A single value is best read with companions and, if borderline, repeated. **[A][N13][N18][N23]**

**The wellness reading — [B]:** Haemoglobin is a context-first, companion-paired, two-sided oxygen-carrying-
capacity screen — read with iron/B12/folate/kidney/red-cell markers, with sex, pregnancy and altitude overlays,
plausible confounds ranked rather than one asserted, guideline disagreement shown honestly, borderline values
repeated before they count, and no condition named.

**An honest boundary — [E]:** thresholds are contested (WHO vs labs vs statistical proposals; the WHO 2024
method is disputed), Haemoglobin is a concentration confounded by volume/altitude/assay, and the risk curve is
U-shaped — so BioSense leans on companions and context and is explicit about confidence. **[E][N19][N21]**

---

# 4. Why Haemoglobin Matters

**1. It sets oxygen-carrying capacity. [A][N1]** Haemoglobin determines how much oxygen the blood delivers;
low values reduce delivery (fatigue, breathlessness), and the marker is a core screen of blood-health wellness. **[A]**

**2. Read with companions, it localises the cause. [A][N14][N15]** Ferritin, B12, folate, kidney function and
the red-cell indices separate iron deficiency from B12/folate, kidney-related, blood-loss, and marrow-related
patterns — the difference between a bare number and an interpretation. **[A]**

**3. Interpreted in context, it avoids over-flagging. [A][N23]** Sex, pregnancy, altitude, hydration, smoking,
donation and training all move Haemoglobin physiologically — context prevents mislabelling normal variation. **[A]**

**Why BioSense measures it — [C]:** Haemoglobin is a high-value, context-rich, companion-dependent screen whose
meaning is multi-marker — the ideal case for Context-First interpretation, cross-biomarker intelligence,
confidence inheritance, sex/pregnancy/altitude-aware banding, ranked explanations, and guideline-disagreement
handling, all while never diagnosing blood disease.

---

# 5. Laboratory Measurement

Haemoglobin is measured spectrophotometrically on an automated haematology analyser (part of the CBC/FBC),
reported in **g/dL (SI g/L; mmol/L)**. **[A][N1][N5]**

- **Units.** g/dL is canonical; g/L = g/dL × 10; mmol/L = g/dL ÷ 1.611. No lipid/glucose/vitamin/creatinine/
  thyroid analyte factor applies. **[A][N5]**
- **Read with companions.** Haemoglobin is interpreted with ferritin, B12, folate, kidney function, white cells,
  and the red-cell indices — never in isolation. **[A][N14][N15]**
- **Context matters.** Sex-specific ranges; pregnancy haemodilution (trimester thresholds); altitude/smoking
  adjustment; hydration/plasma volume. **[A][N4][N6][N8]**
- **Assay interference.** Spuriously **high** Haemoglobin can arise from sample turbidity (hyperlipidaemia,
  abnormal proteins, high leukocytes, haemolysis, abnormal Hb, nucleated RBCs) — considered before acting on a
  high value. **[A][N13]**
- **Companion panel.** Read with **ferritin** (iron stores), **B12/folate** (macrocytic direction),
  **creatinine/eGFR** (kidney-related), **WBC**, and the future **MCV/MCH/RDW** (morphology). **[A][N15][N16]**

---

# 6. Units

- **g/dL** — standard; **BioSense canonical unit.** **[A/C]**
- **g/L** — SI; = g/dL × 10. **[A][N5]**
- **mmol/L** — = g/dL ÷ 1.611 (≈ × 0.6206); 1 g/dL ≈ 0.155 mmol/L. **[A][N5]**
- **No analyte-specific conversion factor** of the lipid/glucose/vitamin/creatinine/thyroid kind applies —
  Haemoglobin unit changes are simple decimal/molar conversions, distinct from cholesterol (38.67), triglyceride
  (88.57), creatinine (88.4), glucose (18.0), 25(OH)D (2.496), B12 (0.738), folate (2.266), and Free T4 (12.87). **[A][C]**

BioSense stores the reported value, unit, sex, age, pregnancy/trimester, altitude/smoking, hydration, and any
companions unchanged, and evaluates the companion pattern and overlays. **[C]**

---

# 7. Unit Conversion

```
g/L   = g/dL × 10           [N5]
mmol/L = g/dL ÷ 1.611  (≈ g/dL × 0.6206; 1 g/dL ≈ 0.155 mmol/L)   [N5]
(no analyte-specific factor; companions are separate markers in their own units — see SCL-010/012/013/016)
```
Worked check: Hb 14.5 g/dL = 145 g/L ≈ 9.0 mmol/L. **[A][N5]**

**Safety rule [D]:** Haemoglobin uses simple g/dL↔g/L↔mmol/L conversions; never apply a lipid/glucose/vitamin/
creatinine/thyroid analyte factor. A unit-unknown value is displayed but not interpreted; a companion-pattern
read requires companions; sex/pregnancy/altitude overlays are applied before banding. **[D]**

---

# 8. Measurement Limitations & the Never-In-Isolation Principle  *(Context-First basis — reused SCL-010)*

Haemoglobin's defining limitation is that **a value does not, on its own, define blood-health status** — which
is why the Context-First gate (§0.2), the companion-pattern layer (§0.5), and the ranked-confound output apply. **[A][B2]**

## 8.1 Haemoglobin needs companions — [A]
A low (or high) value is a starting point; ferritin, B12, folate, kidney function, and the red-cell indices
localise the cause. Haemoglobin is never interpreted in isolation. **[A][N14][N15]**

## 8.2 It is a concentration, not a mass — [A]
Plasma-volume shifts (dehydration, pregnancy haemodilution, fluid overload) cause relative highs and lows;
hydration/pregnancy/altitude context is essential. **[A][N12][N23]**

## 8.3 Thresholds are contested — [A]
WHO vs US-lab cutoffs; WHO 2024 vs prior; Beutler/Braat statistical thresholds; PV 2016 vs 2008 — shown as
frameworks, never averaged. **[A][N19][N20][N10]**

## 8.4 Assay & confounds — [A]
Spuriously high values from turbidity; altitude/smoking raise Haemoglobin; the risk curve is U-shaped; a
borderline value is repeated with companions. **[A][N13][N8b][N18]**

**How BioSense uses this — [C][D]:** the Context-First gate runs first; Haemoglobin is banded two-sided and
sex-specific with pregnancy/altitude overlays; the companion pattern is emitted only with companions (else
screen-level + limited confidence); plausible confounds are **ranked, not asserted**; relative/spurious/acute-
bleeding possibilities and the repeat discipline are surfaced; missing companions/context sets Context-Required/
Reduced confidence; and no condition is ever named.

---

# 9. Relationships With Other Biomarkers  *(cross-biomarker intelligence — reused SCL-010; pattern inheritance via SCL-016/017/018)*

Haemoglobin consumes its companion and context markers where available. **[A][C]**

- **Ferritin (SCL-010) — the key iron companion. [A]** Low Haemoglobin with low ferritin points to an
  iron-deficient pattern (the commonest low-Hb cause); ferritin can flag depleted stores before Haemoglobin
  falls far. **[A][N14][N16]**
- **Vitamin B12 (SCL-012) & Folate (SCL-013). [A]** Low Haemoglobin with low B12 or folate points to a
  macrocytic-direction pattern (confirmed by a high MCV when available). **[A][N14][N15]**
- **Creatinine/eGFR (SCL-016). [A]** Reduced kidney function lowers Haemoglobin (reduced erythropoietin) — a
  kidney-related pattern. **[A][N14]**
- **White cell count (SCL-020) & future MCV/MCH/RDW. [A]** The red-cell indices give morphology (microcytic vs
  macrocytic); RBC count and RDW refine the pattern (e.g. thalassaemia trait vs iron deficiency); white cells
  add marrow/inflammation context. **[A][N15][N17]**
- **(Context) hydration, altitude, smoking, donation, bleeding, training, inflammation. [A]** These are
  interpretation context that move Haemoglobin physiologically, never something BioSense advises changing
  beyond general wellness. **[A][N23]**

**Cross-biomarker rule [C] (reused R4/R9):** where these are **available**, BioSense consumes them (with the
companion-pattern and confound caveats) to sharpen the read and confidence; where **unavailable** — especially
the iron/B12/folate/eGFR/MCV companions (without which only a screen-level statement is possible) — it records a
**confidence limitation** and names what would clarify, never inventing certainty. **[C][R4][R9]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Haemoglobin is the oxygen-carrying protein; its concentration is an indirect RBC measure.** **[A][N1]**
- **WHO anaemia cutoffs: men <13.0, non-pregnant women <12.0, pregnancy <11.0 g/dL.** **[A][N2]**
- **Ranges are sex-specific and context-influenced (age, altitude, pregnancy).** **[A][N3][N4]**
- **Low Haemoglobin has several causes (iron, B12/folate, CKD, blood loss, marrow); the red-cell indices explain
  why.** **[A][N14][N15]**
- **Plasma-volume shifts cause relative highs/lows; spurious-high from turbidity; altitude/smoking raise Hb.** **[A][N12][N13][N8b]**

## 10.2 Where they differ — and why (genuine disagreement, not averaged)
- **WHO men <13.0 vs some US labs <13.5.** **[A][N19]**
- **WHO 2024 revisions (children 6–23 months, 2nd-trimester, altitude/smoking) vs prior thresholds.** **[A][N7][N8]**
- **Beutler/Braat statistical thresholds (<13.7 men 20–60, <13.2 older men, <12.2 women).** **[A][N20]**
- **Polycythaemia: WHO 2016 (>16.5 men / >16.0 women) vs 2008 (>18.5 / >16.5).** **[A][N10][N9]**
- **The WHO 2024 statistical-percentile method is itself disputed.** **[A][E][N21]**
- **Why:** Haemoglobin distributions vary by population/altitude/method and guidelines evolve; the "healthy
  subset" statistical approach is contested. BioSense **presents the differing frameworks and never averages
  them** (reused R5). **[A][E]**

## 10.3 Strength of evidence
- **Physiology, WHO cutoffs, sex-specificity, companion causes: established.** **[A][N1][N2][N14]**
- **Pregnancy/altitude adjustment; spurious-high; U-shaped risk: established.** **[A][N6][N13][N18]**
- **Optimal within-range targets; the WHO 2024 statistical method: evolving/contested.** **[E][N21]**
- **PV thresholds: changed 2008→2016 (established as a change).** **[A][N10]**

## 10.4 Intended populations
Thresholds target general **non-pregnant adults**, **sex-specific**, with **altitude/smoking** adjustment and
separate **pregnancy** (trimester) and **paediatric/neonatal** handling. BioSense applies them context-first,
abstains or routes in pregnancy, likely acute bleeding, and suspected spurious results, and reduces confidence
where companions or context are unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. Haemoglobin is TWO-SIDED (low = reduced-oxygen-carrying-
> capacity direction; high = elevated direction), SEX-SPECIFIC, CONTEXT-GATED, and NEVER interpreted in
> isolation: the value is a screen whose meaning is set by companions and biological context, and where several
> explanations fit they are RANKED, not asserted. WHO vs US-lab cutoffs, the WHO 2024 revisions, the Beutler/
> Braat statistical thresholds, and the PV 2016-vs-2008 thresholds genuinely DIFFER and are shown, never
> averaged. Never a diagnosis of blood disease.**

## 11.1 The Haemoglobin wellness bands (g/dL [g/L]; general non-pregnant adult; after context gate; read with companions)

**Male:**

| BioSense Wellness Interpretation | Hb g/dL [g/L] | Evidence anchor | Wellness meaning (context-first, companion-paired; no diagnostic label) |
|---|---|---|---|
| **Low — Flag** | < 13.0 [<130] | WHO anaemia cutoff, men [N2] | Reduced-capacity direction; read with ferritin/B12/folate/eGFR; rank causes. |
| **Low-Normal — Watch** | 13.0 – < 13.5 [130 – <135] | WHO-normal vs US-lab lower limit [N19] | WHO-normal but below some labs' lower male limit — a guideline-difference zone; read with companions. |
| **Optimal Reference** | 13.5 – 16.5 [135 – 165] | Standard male reference [N3] | Within the standard male reference range. |
| **Upper — Watch** | > 16.5 – 18.5 [>165 – 185] | PV 2016 (16.5) → 2008 (18.5) flags [N10][N9] | Above the 2016 male flag toward the 2008 flag — exclude relative/spurious causes; context. |
| **High — Flag** | > 18.5 [>185] | WHO 2008 male threshold [N9] | Markedly elevated; exclude relative/spurious; route. |

**Female (non-pregnant):**

| BioSense Wellness Interpretation | Hb g/dL [g/L] | Evidence anchor | Wellness meaning |
|---|---|---|---|
| **Low — Flag** | < 12.0 [<120] | WHO anaemia cutoff, women [N2] | Reduced-capacity direction; read with companions; rank causes. |
| **Low-Normal — Watch** | 12.0 – < 12.3 [120 – <123] | Low end of reference (lab-dependent) [N3] | Low end of the female reference; read with companions. |
| **Optimal Reference** | 12.3 – 15.5 [123 – 155] | Standard female reference [N3] | Within the standard female reference range. |
| **Upper — Watch** | > 15.5 – 16.5 [>155 – 165] | Upper reference → PV 2016 flag [N3][N10] | Upper part approaching the high flag — exclude relative/spurious; context. |
| **High — Flag** | > 16.5 [>165] | PV 2016 female threshold [N10] | Markedly elevated; exclude relative/spurious; route. |

*(Read with companions (ferritin/B12/folate/eGFR/WBC/future MCV-MCH-RDW); the companion pattern sets the meaning
(§11.4). Pregnancy and altitude overlays modify the boundaries (§11.2). Cutoffs differ across guidelines; shown,
never averaged (§11.5). g/L via ×10; mmol/L via ÷1.611.)*

## 11.2 Life-stage & environment overlays (pregnancy, altitude/smoking) [A][B]
- **Pregnancy (haemodilution → Hb naturally drops):** use **trimester thresholds** — anaemia-direction flag
  <11.0 g/dL (T1 & T3), <10.5 g/dL (T2, WHO 2024) — **not** the non-pregnant bands; route. **[A][N6]**
- **Altitude & smoking (raise Hb):** apply the **WHO 2024 (BRINDA-based) downward adjustment** to measured Hb
  **before** banding (lowers cutoffs >3000m, raises <3000m). **[A][N8][N8b]**
- **Paediatric/neonatal:** age-specific ranges differ (newborns 14–24 → dip ~10–11 by 6–8 weeks); adult bands
  not applied. **[A][N22]**

## 11.3 How the bands were derived — transparency [B]
- The bands use the **WHO anaemia cutoffs** (men <13.0; women <12.0) as the low flags, the **standard sex-
  specific ranges** as Optimal, and the **PV 2016/2008 thresholds** as the high flags, with a **guideline-
  difference watch zone** at the male WHO-vs-US-lab gap (13.0–13.5). **[N2][N3][N9][N10][N19]**
- **No number was averaged.** The WHO/US-lab, WHO-2024/prior, Beutler/Braat, and PV-2016/2008 frameworks are
  presented distinctly (§11.5). **[R5]**
- The **low and high flags** are two-sided, sex-specific context markers; meaning is completed by companions. **[N14]**

## 11.4 The companion (morphology) pattern (the unit of interpretation) [A][B]
| Haemoglobin | Companions | Pattern hint (NOT a diagnosis) | Anchor |
|---|---|---|---|
| Low | low ferritin (± low MCV) | Iron-deficient pattern (commonest) | N14, N16, N15 |
| Low | low B12 / low folate (± high MCV) | B12/folate (macrocytic-direction) pattern | N14, N15 |
| Low | reduced eGFR | Kidney-related pattern (reduced EPO) | N14 |
| Low | normal companions / acute drop | Blood-loss or dilutional pattern | N6, N12 |
| Low | low MCV + RBC >5.0 | Thalassaemia-trait-more-likely-than-iron hint | N17 |
| High | dehydration/altitude/smoking context | Relative/adaptive pattern (exclude first) | N12, N23 |
| High | no relative cause + sustained rise | Elevated-direction pattern (route) | N10, N11 |

The pattern is emitted **only with companions**, inherits the lower input confidence, ranks confounds first, and
**names no condition** (§0.5, §12). **[A][B][R4][R9]**

## 11.5 Guideline-disagreement display (reused posture) [B][C]
Where relevant, BioSense shows the WHO cutoff vs the US-lab lower limit, the WHO 2024 revisions vs prior, the
Beutler/Braat statistical thresholds, and the PV 2016 vs 2008 thresholds as distinct frameworks — **never
averaged** (CAV10). **[B][C][R5][N19][N10]**

## 11.6 Context-gate precedence [D]
No band or pattern is emitted as a verdict without the Context-First evaluation (§0.2). Sex, pregnancy/altitude
overlays, hydration, spurious-high exclusion, recent bleeding/donation, and companions are applied first. **[D][R1]**

## 11.7 Population caveat [E]
Bands assume a **general non-pregnant adult**, **sex-specific**, read **with companions**, **altitude/smoking-
adjusted**. Cutoffs are contested and population/method-dependent; Haemoglobin is a concentration confounded by
volume/altitude/assay. Pregnancy and paediatric/neonatal use separate ranges (§11.2). **[E][N21]**

---

# 12. Interpretation Framework — CONTEXT-FIRST + NEVER-IN-ISOLATION (reused SCL-010 cross-biomarker + SCL-016/017/018 inheritance)

> **This reuses the frozen BioSense Context-First Interpretation Framework (SCL-010), cross-biomarker
> intelligence (SCL-010), and confidence inheritance (SCL-016/017/018). Haemoglobin is interpreted as a
> context-dependent, companion-paired oxygen-carrying-capacity screen, never a blood-disease diagnosis, and
> never in isolation. No new methodology is introduced.** **[C][R1][R4][R9]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [R1][B3]
   gather context (companions: ferritin (SCL-010), B12 (SCL-012), folate (SCL-013), eGFR (SCL-016), WBC (SCL-020),
   future MCV/MCH/RDW; sex; age; pregnancy/trimester; altitude/smoking; hydration; recent donation/bleeding;
   endurance training; chronic inflammation; kidney function).                                     [R4]
   → if material context changes meaning, interpret WITHIN it; if key context/companions unavailable, record a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit g/dL [g/L/mmol/L]; result final; no spurious-high turbidity flag) → else display-only/flag. [N13]
STEP 2 — ELIGIBILITY / LIFE-STAGE / ENVIRONMENT: non-pregnant adult → apply SEX bands + ALTITUDE/SMOKING adjustment; pregnancy → trimester thresholds + route; paediatric → age-specific + route; likely acute bleeding/spurious → defer/repeat. [N4,N6,N8,N13]
STEP 3 — CONFIDENCE (four-level + inheritance): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED; pattern inherits lower of Hb/companions (§0.6). [R2,R9]
STEP 4 — BAND: assign two-sided sex-specific band (§11.1) with pregnancy/altitude overlay.          [R6,R8]
STEP 5 — COMPANION PATTERN: if companions present, resolve the pattern (§11.4); else screen-level statement. [R4]
STEP 6 — RANKED CONFOUNDS/CAUSES: abnormal with ≥2 plausible causes → Possible Explanation A/B/C, ranked (iron, B12/folate, kidney, blood loss, haemodilution/hydration, altitude/training, marrow-related). [R3]
STEP 7 — REPEAT: new borderline value → suggest REPEAT (with companions) after excluding acute bleeding/hydration/spurious. [N12,N13]
STEP 8 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); route where appropriate; NO diagnosis. [R7]
```

**Core interpretive stance [B]:** Haemoglobin is a context-first, companion-paired, two-sided oxygen-carrying-
capacity screen — read with its companions, with sex, pregnancy and altitude overlays, plausible confounds
ranked rather than one asserted, guideline disagreement shown honestly, borderline values repeated before they
count, and no condition named. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy + inheritance — reused SCL-010 + SCL-016/017/018)*

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Clear Hb AND key companions available (≥ ferritin, or MCV/iron studies) AND sex/life-stage known AND no acute-volume/spurious/altitude confound | Band + companion pattern + ranked confounds normally |
| **REDUCED** | Single value / near a boundary / sex-or-trimester-or-altitude overlay uncertain / minor context | Band cautiously; prefer repeat; name the reducer (CAV4/CAV5) |
| **CONTEXT_REQUIRED** | Abnormal Hb with no companions (no pattern) OR unexcluded confound (haemodilution/dehydration/spurious/recent bleeding) | Screen-level + request companions/repeat; name needed context (CAV3/CAV6) |
| **ABSTAINED** | Significant uncertainty / conflicting signals / pregnancy needing professional ranges / likely acute bleeding or spurious result | Explained abstention; route |

**Inheritance (reused SCL-016/017/018):** the Haemoglobin+companion pattern verdict inherits the **lower**
confidence of its inputs; if companions are unavailable, Haemoglobin is limited to a **screen-level** statement,
not asserted. **[R9]**

Reducers/context inputs: companions absent (no pattern) [N14]; single value / physiological variability [N23];
possible haemodilution/dehydration [N12]; spurious-high turbidity [N13]; altitude/trimester overlay uncertainty
[N8][N6]; recent bleeding/donation; near a band boundary. **[R2]**

**Rule (reused):** reduced confidence does **not** automatically block interpretation; significant uncertainty
**may** justify abstention; a new borderline value prefers a **repeat** framing (with companions). **[R2]**

---

# 14. Wellness Interpretation  *(context-first, companion-paired, two-sided, ranked confounds)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate. Wellness, not medical;
**never a diagnosis**; always **read with companions**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal Reference** *(within sex range; normal companions).* "Your
  Haemoglobin — your blood's oxygen-carrying capacity — sits in a favourable range for your sex, and read with
  your iron and red-cell markers there's nothing here that stands out. It's a single snapshot, but this looks
  settled." **[B]**
- **BioSense Wellness Interpretation: Low-Normal — Watch / Upper — Watch** *(near either boundary).* "Your
  Haemoglobin is within range but toward the {low / upper} end. That's often just context — sex, a recent
  illness, hydration, altitude, or the particular lab — so it's read with your companions and, if borderline,
  repeated." Calm; context; **no diagnosis** (CAV2, CAV5, CAV10). **[B][D]**
- **BioSense Wellness Interpretation: Low — Flag** *(below the sex cutoff).* "This is below the usual range for
  your sex. Because Haemoglobin has several possible explanations, we read it with your iron, B12, folate and
  kidney markers, and we've noted the more likely causes for your context — iron, B12/folate, a kidney-related
  pattern, blood loss, or simple dilution — rather than pointing to one. A repeat with those companions is
  often sensible." Constructive; **no diagnosis** (CAV3, CAV5, CAV6). **[B][D]**
- **BioSense Wellness Interpretation: High — Flag** *(above the sex high flag).* "A higher Haemoglobin is often
  just concentration — dehydration, altitude or smoking — rather than the marrow making too much, so that's
  checked first. If it stays high without such a cause, a calm conversation with a professional is worth having."
  Exclude relative/spurious; **no diagnosis** (CAV8). **[B][D][N12]**
- **BioSense Wellness Interpretation: low + symptoms / acute drop / high + sustained rise.** Calm routing: "This
  pattern is worth a prompt, unhurried conversation with a healthcare professional, who can look at the fuller
  picture. The numbers alone don't diagnose anything." **No alarm, no diagnosis** (CAV7). **[B][D][N18][N24]**
- **Pregnancy.** "In pregnancy, Haemoglobin naturally falls as blood volume expands, so this uses trimester-
  specific thresholds and is best interpreted with a professional." Route (CAV9). **[B][D][N6]**

**Companion-pattern modifier:** where companions are available, present the pattern (iron / B12-folate / kidney-
related / blood-loss-dilutional / thalassaemia-hint / relative-high) as **context**; where companions are
absent, give a **screen-level** statement and name that companions complete the picture (CAV3). The pattern
confidence **inherits the lower** input (§0.6). **[D][R4][R9]**

**Ranked-confounds modifier (reused):** on any abnormal Haemoglobin with ≥2 plausible causes, present **Possible
Explanation A/B/C** ordered by evidence + context (iron, B12/folate, kidney, blood loss, haemodilution/hydration,
altitude/training, marrow-related) — never a single certain cause, never a named condition. **[D][R3]**

**Sex/pregnancy/altitude overlay modifier:** apply the sex-specific bands, the pregnancy trimester thresholds,
and the altitude/smoking adjustment; never apply non-pregnant/unadjusted bands where these apply (CAV9). **[D][N4][N6][N8]**

**Context-unavailable modifier:** where **companions** (or sex/life-stage/altitude/hydration context) are
missing, state the confidence limitation and name what would clarify (CAV3/CAV4); never invent certainty (S8). **[D][R4]**

Every interpretation pairs the band and pattern with context guidance (§17) and the mandatory caveats (§0.10).
**None diagnoses anaemia, polycythaemia, a bleeding disorder, or bone-marrow disease, none asserts a single
cause, and none treats a BioSense band or pattern as a medical boundary.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (common for Hb).** Abnormal Haemoglobin with **no companions** (no pattern) or an
  unexcluded confound (haemodilution/dehydration/spurious/recent bleeding) → screen-level + request companions/
  repeat; state what's needed (§13, CAV3/CAV6). **[D][R2]**
- **15.2 Suspected relative or spurious result.** High Haemoglobin with dehydration/altitude/smoking, or a
  turbidity flag (hyperlipidaemia/high leukocytes/haemolysis) → treat as relative/spurious; exclude before an
  elevated-direction read. **[D][N12][N13]**
- **15.3 Pregnancy.** Use **trimester** thresholds (haemodilution) and route — blood health in pregnancy is a
  professional matter. **[D][N6]**
- **15.4 Altitude / smoking.** Apply the WHO 2024 adjustment before banding; a raised Haemoglobin at altitude or
  in a smoker may be adaptive, not disease. **[D][N8][N8b]**
- **15.5 Recent blood donation / bleeding / endurance training.** These move Haemoglobin physiologically
  (donation and bleeding lower it; training can lower it via plasma expansion) → interpret as context; repeat. **[D][N23]**
- **15.6 Chronic inflammation / kidney impairment.** Inflammation and reduced eGFR lower Haemoglobin (anaemia-of-
  inflammation / reduced EPO patterns) → read with eGFR/inflammation context. **[D][N14]**
- **15.7 Children, adolescents & newborns.** Age-specific/neonatal ranges differ markedly; adult bands not
  applied — display, suggest professional interpretation. **[D][N22]**
- **15.8 Red flags.** Very low Haemoglobin with poor-oxygen-delivery symptoms; a rapid/acute drop suggesting
  active bleeding; a very high Haemoglobin with a sustained rise; pregnancy with abnormal Haemoglobin → calm
  prompt healthcare review regardless of band. **[D][N18][N24]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Trend beats a single value. [A]** Haemoglobin shifts with hydration, altitude, smoking, pregnancy, donation
  and lab method, so a within-person **trend** (read with companions) is more informative than one reading. **[N23]**
- **Repeat borderline values with companions. [A]** A new borderline value is repeated **with** ferritin/B12/
  folate/eGFR/red-cell indices, after excluding acute bleeding/hydration/spurious, before it means anything. **[N12][N13]**
- **Watch the rate of change. [A]** A **rapid/acute drop** is a distinct red flag (possible active bleeding)
  separate from a slow decline; a **sustained rise** is what matters for an elevated-direction pattern. **[N11][N18]**
- **Hold the method constant. [A]** Because lab method can shift Haemoglobin, trends compare like-with-like
  (same lab/analyser); a method change is noted so it isn't mistaken for a real change. **[N23]**
- **Context/abstained points. [C]** Dehydration, altitude, pregnancy, donation, spurious, and context-required
  points are tagged so they don't create a false trend.

---

# 17. Lifestyle & Context Guidance

For Haemoglobin, the first tier is **context and companions** (iron/B12/folate/kidney/red-cell markers above
all), then context-appropriate lifestyle. **[A]/[B]**

## 17.1 Companions & context first [A][N14][N15]
Where Haemoglobin is abnormal, the clarifying steps are the **companions** (ferritin, B12, folate, eGFR, MCV/
MCH/RDW), the **context review** (sex, pregnancy, altitude, hydration, donation, bleeding, training,
inflammation, kidney), and — for a new borderline value — a **repeat with companions**. **[A]**

## 17.2 Blood-health wellness context [A][N14]
General blood-health wellness — an **iron-, B12- and folate-rich** balanced diet, adequate **hydration**, and
**not smoking** — is relevant context; altitude, training and pregnancy shift Haemoglobin physiologically.
Framed as **education, not treatment**. **[A]**

## 17.3 Confound & exposure context [A][N12][N13][N23]
Dehydration/haemodilution, altitude, smoking, recent donation or bleeding, endurance training, and assay
turbidity are recognised context/confounds for an abnormal Haemoglobin — useful for interpretation, **never** a
prompt to change any medication or supplement (iron/B12/EPO) without professional advice. **[A]**

## 17.4 Framing rules [B][D]
Companions and context first (repeat for new borderline); **no specific treatments, supplement doses, iron/B12/
EPO, or transfusion** (S9); WHO/US-lab/Beutler/PV disagreement shown, never averaged; calm, evidence-informed
language; never a diagnosis; the companion-paired (CAV2), screen-only (CAV3), high-Hb (CAV8), pregnancy (CAV9),
and guideline (CAV10) caveats attached where relevant.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain that Haemoglobin is a marker of oxygen-carrying capacity read **with** its
companions; run the context-first evaluation; assign the two-sided sex-specific band with pregnancy/altitude
overlays; resolve the companion pattern (with inherited confidence) when companions are present; integrate
ferritin/B12/folate/eGFR/WBC and the future red-cell indices; present **ranked** confounds for an abnormal
value; recommend a repeat (with companions); name which companions would clarify; express context-required/
abstention respectfully.

The AI layer **must never**:
- emit "anaemia", "polycythaemia", "polycythaemia vera", "erythrocytosis", "bleeding disorder", "bone-marrow disease/failure", "leukaemia", "thalassaemia", or any condition as a diagnosis — even to deny one (S1)
- interpret Haemoglobin in isolation, or emit a companion-pattern read without the relevant companions (S2, S3)
- assert a single cause for an abnormal Haemoglobin when ≥2 are plausible — rank them (S4)
- ignore sex/life-stage/environment (apply sex bands; pregnancy trimester thresholds; altitude/smoking adjustment; never non-pregnant/unadjusted bands where these apply) (S5)
- read a high Haemoglobin as elevated-direction without excluding relative (dehydration/haemodilution) and spurious-high (turbidity) causes (S6)
- load interpretation onto a new/isolated borderline value without a repeat and confound exclusion (S7)
- interpret a likely haemodilution/dehydration/spurious/recent-bleeding value as a disease pattern (S6, S7)
- recommend treatments, supplements, doses (iron/B12/EPO), or transfusion; produce a blood-disease-risk % (S9)
- invent certainty when companions/context are unavailable — state the limitation and inherit confidence (S8)
- fail to route red flags (very low + symptoms; acute drop; high + sustained rise; pregnancy) calmly and promptly (S10)
- present a BioSense band, range, or companion pattern as a medical/diagnostic boundary (S11)
- average contested cutoffs (WHO vs US-lab; WHO 2024 vs prior; Beutler/Braat; PV 2016 vs 2008) (S12)

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any blood condition is
SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; named conditions never diagnosed.** Every output carries CAV1; BioSense describes patterns,
  never names anaemia/polycythaemia/bleeding disorder/bone-marrow disease (S1). **[D][R7]**
- **Never-in-isolation honesty.** Haemoglobin is presented as a screen whose meaning depends on companions;
  companion-pattern reads only with companions, else screen-level + inherited confidence (S2, S3, CAV2, CAV3). **[D][B2]**
- **Relative/spurious caution.** A high Haemoglobin is checked for dehydration/altitude/smoking and turbidity
  before an elevated-direction read (S6, CAV8). **[D][N12][N13]**
- **Ranked, not asserted.** Where several causes fit, they are ranked by evidence + context, never reduced to
  one (S4, CAV6). **[D][R3]**
- **Sex/life-stage/environment aware.** Sex bands, pregnancy trimester thresholds, altitude/smoking adjustment;
  never non-pregnant/unadjusted bands where these apply (S5, CAV9). **[D][N4][N6][N8]**
- **Repeat-first + confound exclusion.** New borderline → repeat with companions after excluding acute bleeding/
  hydration/spurious (S7, CAV5). **[D][N12][N13]**
- **Calm red-flag routing.** Very low + symptoms, acute drop (possible active bleeding), high + sustained rise,
  and pregnancy abnormalities → prompt, unhurried review; never emergency-diagnose (S10, CAV7). **[D][N18][N24]**
- **No treatment/supplement guidance.** Iron/B12/EPO/transfusion questions → educate + refer (S9). **[D]**
- **Missing companions/context stated, not invented.** (S8). **[D][R4]**
- **Correct unit handling.** g/dL↔g/L↔mmol/L simple conversions (no analyte factor); companion pattern requires
  companions. **[D][N5]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. Haemoglobin is **below the sex/pregnancy cutoff**, especially with symptoms of poor oxygen delivery. **[N2][N24]**
2. A **rapid/acute drop** suggests active bleeding. **[N18]**
3. Haemoglobin is **markedly high** with a **sustained rise** (no relative/spurious cause). **[N10][N11]**
4. The **companion pattern is discordant** or points to a kidney-related/marrow-related picture. **[N14]**
5. **Pregnancy** with an abnormal Haemoglobin (trimester thresholds, professional matter). **[N6]**
6. The user **asks a medical/supplement/transfusion question** (S9). **[D]**

All suggestions are wellness-framed, non-urgent (unless red flags), non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration

How SCL-019 plugs into the existing platform (no architecture change), reusing frozen frameworks: **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for Haemoglobin (g/dL [g/L/mmol/L]) plus
  sex, age, pregnancy/trimester, altitude/smoking, and hydration metadata, and — as interpretation inputs —
  **ferritin (SCL-010), B12 (SCL-012), folate (SCL-013), creatinine/eGFR (SCL-016), white cell count (SCL-020),
  and the future MCV/MCH/RDW**, plus declared context (recent donation/bleeding, endurance training, chronic
  inflammation). **[R4]**
- **Supplies (as CSL bindings):** the two-sided sex-specific Haemoglobin bands with pregnancy/altitude overlays
  (Category B), the **companion (morphology) pattern**, the reused Context-First gate, the reused four-level
  confidence hierarchy **with inheritance**, the reused ranked multiple-explanations output, the reused cross-
  biomarker consumption (with graceful degradation to a screen-level read), the WHO/US-lab/Beutler/PV
  disagreement display, the repeat/trend behaviour, safety rules, context guidance, and narrative templates —
  each with value + source-ID + category + version.
- **Reuses (does not redefine):** the Context-First Interpretation Framework, cross-biomarker intelligence, the
  confidence hierarchy, and the multiple-explanations output (all frozen from SCL-010); **confidence inheritance
  (SCL-016/017/018)** for the companion pattern; sex/age/pregnancy-aware banding (SCL-004/010/016/017/018); the
  guideline-disagreement posture (SCL-003/011/012); two-sided banding (SCL-004/009/010/011/012/016/017/018); and
  the diagnostic-adjacency discipline (SCL-002/009/011/012/016/017/018). **The never-in-isolation, companion-
  paired interpretation is represented within cross-biomarker intelligence + inheritance — not as a new
  methodology.** **[C][R1][R4][R9]**
- **Respects:** every ENG platform invariant; the cross-marker discipline (companions complete the read, the
  pattern inherits confidence — never averaged into a single verdict; contested cutoffs never averaged;
  Haemoglobin never interpreted in isolation).
- **Uses the correct unit handling** (g/dL↔g/L↔mmol/L; no analyte factor) — a per-analyte configuration.
- **Score contribution:** Haemoglobin contributes to a **blood-health/oxygen-carrying** wellness context as a
  sex/age/pregnancy/altitude-aware, context-gated, companion-paired input — the companion pattern (governed by
  inheritance) as the headline and Haemoglobin alone as a screen-level signal — with abnormal values expressed
  as ranked-confound context rather than a verdict; context-required/abstained values do not contribute a
  definite verdict. Any weighting is a Category [C] product decision. **[C]**

---

# 22. Medication, Supplement & Exposure Context (educational only)

Educational context only; BioSense does not instruct on treatment, dose, or supplement/medication changes (S9). **[D]**
- **Iron / B12 / folate supplements:** relevant to iron- or macrocytic-direction patterns, but any dose or
  decision belongs to a professional after companion testing — BioSense educates, never prescribes. **[A][N14]**
- **Erythropoiesis-stimulating agents / transfusion:** clinical treatments outside BioSense's scope; mentioned
  only as context, never recommended. **[A]**
- **Smoking & altitude:** raise Haemoglobin (CO / adaptive) — interpretation context; general wellness supports
  not smoking. **[A][N8b]**
- **Recent blood donation / bleeding:** lower Haemoglobin transiently — context for a low value; repeat. **[A][N23]**
- Any medication, supplement, or exposure question → educational context + suggestion to speak with a healthcare
  professional; BioSense never advises starting, stopping, or changing a medication or supplement. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Haemoglobin needs companions. [E]** Alone it is a screen; the companion pattern and confidence inheritance
   handle this. **[N14]**
2. **Cutoffs are contested. [E]** WHO vs US-lab; Beutler/Braat statistical; shown, never averaged. **[N19][N20]**
3. **The WHO 2024 statistical method is disputed. [E]** Percentile "healthy-subset" approach may misfire where
   anaemia is common; shown as evolving. **[N21]**
4. **It is a concentration, not a mass. [E]** Plasma-volume shifts cause relative highs/lows; context mitigates. **[N12]**
5. **High-Hb thresholds changed. [E]** PV 2016 vs 2008; relative/spurious excluded first. **[N10][N9]**
6. **U-shaped risk. [E]** Both extremes carry risk; BioSense flags both directions calmly. **[N18]**
7. **Companion availability is data-dependent. [E]** Without companions, only a screen-level statement is
   possible; the pattern degrades to a confidence limitation, not certainty. **[R4][R9]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**; companion-
paired; context-first; two-sided; sex/pregnancy/altitude overlays; ranked confounds; repeat with companions). **[B]/[D]**
(Illustrative; exact copy owned by BioSense.)

```
TEMPLATE: OPTIMAL_REFERENCE (within sex range ; normal companions)
"Your Haemoglobin is {value} g/dL — a favourable range for your sex — and read with your iron and red-cell
 markers there's nothing here that stands out. It's a single snapshot, but this looks settled."  +CAV1 +CAV2

TEMPLATE: LOW_NORMAL_WATCH / UPPER_WATCH (near either boundary)
"Your Haemoglobin is {value} g/dL — within range but toward the {low/upper} end. That's often just context —
 sex, hydration, altitude, a recent illness, or the particular lab — so it's read with your companions and, if
 borderline, repeated."  +CAV1 +CAV2 +CAV10

TEMPLATE: LOW_FLAG (below sex cutoff)
"Your Haemoglobin is {value} g/dL — below the usual range for your sex. Because there are several possible
 explanations, we read it with your iron, B12, folate and kidney markers, and here are the more likely causes
 for your context rather than one: {ranked A/B/C}. A repeat with those companions is often sensible."  +CAV1 +CAV2 +CAV3 +CAV5 +CAV6

TEMPLATE: HIGH_FLAG (above sex high flag)
"Your Haemoglobin is {value} g/dL — above the usual range. A higher value is often just concentration —
 dehydration, altitude or smoking — rather than the marrow making too much, so that's checked first. If it
 stays high without such a cause, a calm conversation with a professional is worth having."  +CAV1 +CAV2 +CAV8

TEMPLATE: RED_FLAG (low+symptoms ; acute drop ; high+sustained rise — CALM ROUTING)
"This pattern is worth a prompt, unhurried conversation with a healthcare professional, who can look at the
 fuller picture. The numbers alone don't diagnose anything."  +CAV1 +CAV2 +CAV7

TEMPLATE: PREGNANCY
"In pregnancy, Haemoglobin naturally falls as blood volume expands, so this uses trimester-specific thresholds
 and is best interpreted with a professional."  +CAV1 +CAV9

MODIFIER: COMPANION_PATTERN (companions present) →
 "With your companions, the pattern reads as {iron-deficient | B12/folate | kidney-related | blood-loss/dilutional
  | thalassaemia-trait hint | relative/adaptive high} context — a hint, not a diagnosis, read with your wider picture."  +CAV2

MODIFIER: SCREEN_ONLY (no companions) →
 "Haemoglobin on its own is a screen — markers like ferritin, B12, folate and the red-cell indices turn it into
  a fuller picture, so we'd interpret this more confidently with them."  +CAV3

MODIFIER: RANKED_CONFOUNDS (abnormal, ≥2 causes) →
 "Possible explanations, most-to-least likely for your context: A {…}, B {…}, C {…} — best confirmed with a professional."  +CAV6

MODIFIER: ALTITUDE_OVERLAY → "Haemoglobin runs higher at altitude and in smokers, which we adjust for."  +CAV8
MODIFIER: GUIDELINE → "Anaemia cutoffs differ slightly between the WHO and some labs, so we compare against your own lab's range."  +CAV10
```

**Absolute rules:** no template diagnoses a blood condition, asserts a single cause, emits a companion-pattern
read without companions, interprets Haemoglobin in isolation, reads a high value as elevated-direction without
excluding relative/spurious causes, treats a band/pattern as a diagnostic boundary, applies non-pregnant/
unadjusted bands where pregnancy/altitude apply, alarms, or averages cutoffs. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal, with companions. [illustrative]**
```
Input: Hb 14.6 g/dL (male), ferritin normal, age 40.
Band: OPTIMAL_REFERENCE (male) | Pattern: none | Confidence: STANDARD
Narrative: OPTIMAL +CAV1+CAV2.  [N3]
```

**Example 2 — Low Hb + low ferritin (iron-deficient pattern). [illustrative]**
```
Input: Hb 10.8 g/dL (female), ferritin 8 ng/mL, age 34.
Band: LOW_FLAG (female) | Pattern: iron-deficient | Confidence: STANDARD
Narrative: LOW_FLAG + companion pattern +CAV6 ; ranked (iron»other) ; repeat +CAV5 ; NO "anaemia".  [N2,N14,N16,S1]
```

**Example 3 — Low Hb, no companions. [illustrative]**
```
Input: Hb 11.5 g/dL (female), no ferritin/B12/folate/MCV.
Band: LOW_FLAG (female) | Pattern: NOT computable (no companions) | Confidence: CONTEXT_REQUIRED
Narrative: screen-only +CAV3 ; request companions ; +CAV6 ; NO diagnosis.  [N14,R9,S3]
```

**Example 4 — High Hb with dehydration/altitude. [illustrative]**
```
Input: Hb 17.2 g/dL (male), lives at altitude / dehydrated.
Band: UPPER_WATCH (male) | Pattern: relative/adaptive (exclude first) | Confidence: REDUCED
Narrative: HIGH context +CAV8 ; apply altitude adjustment ; exclude relative/spurious ; NO "polycythaemia".  [N8,N12,S6]
```

**Example 5 — Very high Hb, sustained rise, no relative cause. [illustrative]**
```
Input: Hb 19.0 g/dL (male), sustained rise, well-hydrated, sea level.
Band: HIGH_FLAG (male) | Pattern: elevated-direction (route) | Confidence: STANDARD→route
Narrative: RED_FLAG calm review +CAV7 ; NO "polycythaemia vera" diagnosis.  [N9,N10,N11,S10]
```

**Example 6 — Pregnancy. [illustrative]**
```
Input: Hb 10.7 g/dL, second trimester.
Band: pregnancy overlay → T2 threshold <10.5 (10.7 above flag) ; NOT non-pregnant bands | Confidence: ABSTAINED→route
Narrative: pregnancy template +CAV9 ; trimester thresholds ; route ; NO diagnosis.  [N6,S5]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-010 (Ferritin)** — the key iron companion; source of the reused Context-First Interpretation Framework,
  cross-biomarker intelligence, four-level confidence hierarchy, and multiple-explanations output.
- **SCL-012 (Vitamin B12) / SCL-013 (Folate)** — macrocytic-direction companions.
- **SCL-016 (Creatinine + eGFR)** — kidney-related companion (reduced EPO); source of the reused **confidence
  inheritance** principle applied to the companion pattern.
- **SCL-020 (White Blood Cell Count)** — haematology companion (marrow/inflammation context).
- **SCL-017 (TSH) / SCL-018 (Free T4)** — further precedent for the reused confidence inheritance and
  sex/age/pregnancy-aware banding.
- **SCL-004 (HDL-C) / SCL-010** — precedent for the reused sex-aware banding.
- **SCL-011 (Vitamin D) / SCL-012 (B12)** — precedent for guideline-disagreement / multi-framework display
  (here: WHO vs US-lab; WHO 2024 vs prior; Beutler/Braat; PV 2016 vs 2008).
- **Future MCV / MCH / RDW** — red-cell indices Haemoglobin consumes for morphology; where unavailable, a
  confidence limitation is recorded.
- **SCL-009 (Fasting Glucose) / SCL-002 (HbA1c)** — metabolic context; and source of the reused diagnostic-
  adjacency discipline.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the N-series IDs in §0 and
> the body. Developers finalising the pack should confirm exact page/table locators against the primary sources
> where required.

**Definition, ranges, units, WHO cutoffs (Category A anchors)**

1. **mymedicineadvisor.com (Low Hemoglobin / anaemia).** — *Hb = iron-rich oxygen-carrying protein; WHO anaemia
   men <13.0, non-pregnant women <12.0, pregnancy <11.0 g/dL; WHO 2024 review kept adult thresholds unchanged,
   adjusting only young children and the 2nd trimester; typical ranges men 13–18, women 12–16; labs set their
   own intervals (N1, N2, N7, N24).*
2. **HealthMatters.io (Hemoglobin) & healthcalculatoronline.com (Hb calculator).** — *g/dL×10 = g/L; ÷1.611 =
   mmol/L; 1 g/dL ≈ 0.155 mmol/L; sex differences (testosterone/menstruation); WHO uses 13.0 for men, some US
   labs 13.5; WHO severity bands; hydration/altitude/smoking/pregnancy/lab method shift Hb without disease;
   paediatric cutoffs; pregnancy 11.0 (N2, N4, N5, N19, N23, N25).*
3. **Medscape (Hemoglobin Concentration reference range) — emedicine.medscape.com/article/2085614.** — *males
   13.5–17.5, females 12.0–15.7 g/dL; pregnancy haemodilution; polycythaemia WHO >18.5 men / >16.5 women, or
   >17/>15 with sustained ≥2 g/dL rise; relative vs absolute; spurious-high from turbidity (hyperlipidaemia,
   leukocytes, haemolysis, abnormal proteins, nucleated RBCs) (N3, N9, N11, N12, N13).*
4. **scienceinsights.org (What is g/dL) & kantesti.net (Hb normal range).** — *standard ranges; pregnancy
   trimester thresholds (<11 T1/T3, <10.5 T2); low-Hb causes (iron/B12/folate/CKD/blood loss/marrow); MCV <80
   microcytic, high MCV macrocytic; ferritin <30 depleted iron; RBC >5.0 + low MCV → thalassaemia trait;
   newborn 14–24 → dip 10–11; symptoms (N3, N6, N14, N15, N16, N17, N22, N24).*

**WHO 2024 update, altitude/smoking, PV thresholds, disagreement (Category A)**

5. **StatPearls (Anemia) — NCBI NBK499994 & PubMed 38910369 (Revised WHO 2024).** — *WHO 2024 = first major
   update since 1968; reaffirmed most values; changed children 6–23 months, 2nd-trimester (<10.5), and altitude;
   pregnancy <11.0 T1/T3, <10.5 T2 (N6, N7).*
6. **Lancet Haematology 2024 (WHO Hb guidelines) & 2024/2026 (altitude/smoking adjustment).** — *2024 revised
   altitude & smoking adjustments (BRINDA); earlier 1989 adjustments demographically limited; children 6–23
   months cutoffs reduced 5 g/L; statistical 5th-centile basis (N7, N8, N8b).*
7. **The Blood Project — Polycythemia Vera Diagnostic Criteria & Definition of Anemia (Hb Thresholds).** — *WHO
   2016 PV lowered Hb to >16.5 men / >16.0 women (from 2008 >18.5 / >16.5); Beutler/Braat statistical <13.7
   (men 20–60), <13.2 (older men), <12.2 (women) (N10, N20).*
8. **PMC12377884 & PMC12923139 & medrxiv 2024.05.28 (WHO 2024 implications).** — *WHO 2024 statistical-
   percentile "healthy subset" approach contested; may fail where anaemia causes common/not excludable; altitude
   equation change non-linear; evidence base ~11% world population (N21).*
9. **PMC2858127 (anaemia & outcome after stroke).** — *non-linear (U-shaped) relationship: increased risk at
   both low and high Hb extremes (N18).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–9; they are BioSense
> Version 1 classifications, two-sided and sex-specific and context-gated with pregnancy/altitude overlays, not
> attributable to any single reference as a diagnostic threshold, and **do not restate diagnostic labels.** WHO
> vs US-lab cutoffs, the WHO 2024 revisions, the Beutler/Braat statistical thresholds, and the PV 2016-vs-2008
> thresholds are shown separately and **never averaged**; Haemoglobin is presented as a companion-paired screen,
> never in isolation, never a blood-disease diagnosis; the companion pattern is a hint whose confidence inherits
> the lower input, never a standalone verdict.

---

# 28. Founder Decisions Required

The Haemoglobin methodology reuses frozen BioSense frameworks and represents Haemoglobin via the existing
Context-First, cross-biomarker (companion-paired), confidence-inheritance, and guideline-disagreement
frameworks. Two optional presentation/policy items remain: **[C][E]**

**D-1 — Confirm the two-sided sex-specific band structure and the guideline-difference presentation.** SCL-019
uses the WHO anaemia cutoffs (men <13.0, women <12.0) as low flags, the standard sex-specific ranges as Optimal,
and the PV 2016/2008 thresholds as high flags, with a male WHO-vs-US-lab **guideline-difference watch zone**
(13.0–13.5) and the Beutler/Braat statistical thresholds shown as an alternative framework (never averaged),
plus **pregnancy trimester** and **altitude/smoking** overlays. Confirmation requested that this two-sided,
sex-specific, overlay-based presentation (with contested cutoffs shown side by side) is the intended default.
**Founder sign-off requested.**

**D-2 — Confirm the companion-pairing activation and CBC-dependency scope for V1.** SCL-019 emits a **companion-
pattern read only when the relevant companions (ferritin/B12/folate/eGFR and, in future, MCV/MCH/RDW) are
available** (else a screen-level statement with inherited/limited confidence), and in **pregnancy/altitude**
applies the trimester thresholds / adjustment and routes. **Founder decision requested** on whether V1 activates
Haemoglobin now (degrading gracefully to a screen-level read until the iron/B12/folate companions and the future
CBC indices are present, and routing in pregnancy) — noting that ferritin (SCL-010), B12 (SCL-012), folate
(SCL-013) and eGFR (SCL-016) already exist, so the core iron/macrocytic/kidney patterns are activatable now,
with MCV/MCH/RDW and WBC (SCL-020) enriching the morphology layer when authored.

*(Both affect presentation/handling, not the underlying evidence or the reused frozen frameworks.)*

---

**END OF SCL-019 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/reference
figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was fabricated; every
Category [A] number was retrieved and verified during authoring and traces to §27. Haemoglobin reuses frozen
BioSense methodology throughout — the Context-First Interpretation Framework, cross-biomarker intelligence, the
four-level confidence hierarchy, and the multiple-explanations output (all from SCL-010), confidence inheritance
(SCL-016/017/018, for the companion pattern), sex/age/pregnancy-aware banding (SCL-004/010/016/017/018), the
guideline-disagreement posture (SCL-003/011/012), two-sided banding with flags (SCL-004/009/010/011/012/016/017/
018), and the diagnostic-adjacency discipline (SCL-002/009/011/012/016/017/018) — introducing only Haemoglobin-
specific scientific content (the thresholds and their two-sided/sex-specific structure; the g/dL↔g/L↔mmol/L
units; the pregnancy and altitude overlays; the WHO-2024/US-lab/Beutler/PV disagreements; the companion
morphology-hint layer; the spurious-high and haemodilution confounds; and the trend/repeat behaviour).
Haemoglobin is represented as a marker of oxygen-carrying capacity — a context-first, companion-paired screen,
never interpreted in isolation, and never a diagnosis of blood disease. No new methodology was required; all
structure remains consistent with SCL-001 through SCL-018.*
