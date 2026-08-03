# SCL-010 — FERRITIN
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Interpretation Methodology
### *Introduces the BioSense Context-First Interpretation Framework (a permanent, reusable methodology extension)*

**Document ID:** SCL-010
**Biomarker:** Ferritin (serum ferritin)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 31 July 2026
**Template basis:** Authored on the SCL-001 (ApoB) frozen template. The Context-First Interpretation Framework is an intentional structural extension required by the founder decision; it becomes part of BioSense scientific methodology and is reusable by future context-heavy biomarkers. All unaffected sections remain consistent with SCL-001 through SCL-009.

---

> **What this document is.** SCL-010 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes, for ferritin. It also **establishes the
> BioSense Context-First Interpretation Framework** — a permanent methodology extension for biomarkers
> whose meaning depends heavily on surrounding biological context. It does not redesign the Constitution,
> the ENG documents, the Blood Analysis Engine, or the SCL architecture.
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

## STRUCTURAL-FIT NOTE (Ferritin vs SCL-001) — introduces the Context-First Interpretation Framework

Ferritin is the first BioSense biomarker that **must not be interpreted independently when materially
relevant contextual information exists.** It has a dual identity — an **iron-storage** biomarker *and* an
**acute-phase reactant** — so a high or low value has no single explanation. This pack therefore
introduces the **Context-First Interpretation Framework**, a permanent extension of BioSense methodology.

The overall structure, section order, content-classification scheme (A–E), safety posture,
recommendation-ladder shape, narrative-contract, and governance were **preserved exactly**. The following
are genuine structural adaptations (founder decision):

1. **Context-First interpretation order (§8, §9, §11, §12) — new & central.** Before assigning a wellness
   interpretation, BioSense evaluates whether relevant context (hs-CRP, recent infection/vaccination/
   surgery, inflammatory/liver disease, alcohol, obesity, metabolic syndrome, pregnancy, menstruation,
   blood donation, iron supplementation, transfusion, endurance training, haemoglobin, CBC, ALT, AST)
   changes the meaning of the result.
2. **Four-level confidence hierarchy (§13) — new.** Standard → Reduced → **Context-Required** →
   Interpretation-Abstained. Reduced confidence does not automatically block interpretation; significant
   contextual uncertainty may justify abstention.
3. **Multiple-explanations output (§11, §14, §24) — new.** An abnormal ferritin is presented as ranked
   **Possible Explanation A / B / C** (ordered by evidence and context), never a single cause.
4. **Cross-biomarker consumption (§9, §21) — new dependency.** Ferritin is the first biomarker that
   actively **consumes** other SCL documents (SCL-006 hs-CRP, SCL-014 ALT, SCL-015 AST, SCL-019
   haemoglobin, future CBC); where unavailable, this is stated as a confidence limitation, not invented
   certainty.
5. **Two-sided, sex-aware banding (§11) — like HDL/glucose.** Low signals iron-store concern; high opens
   an inflammation/metabolic/liver/overload differential.

**The Context-First Interpretation Framework is documented here as reusable** by future biomarkers that
depend heavily on surrounding biological context (§12). **[C]**

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

Ferritin is deceptively simple to read and easy to read wrongly, and BioSense treats that difficulty as
a first-class design problem. Ferritin reflects the body's iron stores — but it also rises with
inflammation, infection, metabolic strain, and liver stress, so the same number can mean very different
things depending on what else is going on. A "normal" or "high" ferritin can sit on top of genuinely low
iron when inflammation is present; a "high" ferritin is far more often metabolic or inflammatory than a
sign of true iron overload. BioSense therefore interprets ferritin **context-first**: it looks at the
surrounding picture — inflammatory markers, liver markers, blood counts, and life context — before
saying what the number is likely to mean, presents more than one possible explanation when the picture is
genuinely uncertain, and names no condition. This context-first discipline is a permanent part of BioSense
methodology introduced here.

The BioSense Wellness Interpretation Bands here are **consumer wellness classifications, not diagnostic
criteria.** Every BioSense interpretation is version controlled, transparent, and designed to evolve as
the evidence evolves.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> Exact values and rules to activate ferritin. Every value carries a source ID (K-series / CF-series →
> §27) and a category tag. Canonical unit: µg/L (≡ ng/mL). **Context-first, two-sided, sex-aware.**

## 0.1 Canonical units — [A]
```
canonical_unit: µg/L   (µg/L ≡ ng/mL, numerically identical, 1:1 — no conversion)          [K19]
Always retain value_reported + unit_reported + available context. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 Context-First Interpretation gate (founder decision) — [C] — RUNS BEFORE BANDING
```
STEP 0 (CONTEXT-FIRST): before assigning a wellness interpretation, evaluate materially-relevant context: [CF1]
  inflammation signals: hs-CRP (SCL-006), recent infection, vaccination, surgery, inflammatory disease;   [CF3]
  liver signals: ALT (SCL-014), AST (SCL-015), liver disease, alcohol;
  iron-store context: haemoglobin (SCL-019), CBC, TSAT (if available), menstruation, pregnancy,
     blood donation, recent iron supplementation, recent transfusion, endurance training, obesity,
     metabolic syndrome.
IF material context changes meaning → interpret ferritin WITHIN that context (not independently).  [CF1,CF2]
IF supporting biomarkers unavailable → state as a CONFIDENCE LIMITATION, do not invent certainty.  [CF6]
Ferritin alone does NOT reliably indicate iron status (storage marker AND acute-phase reactant).   [CF2]
```

## 0.3 BioSense Version 1 Wellness Interpretation Bands — [B] (synthesis of [A] anchors K1–K12) — CONTEXT-GATED
```
FERRITIN_WELLNESS_BAND (µg/L, general adult, sex-aware, primary prevention) — TWO-SIDED, applied AFTER context gate:

  FEMALE (pre-menopausal reference-informed):
    LOW_STORAGE         < 15            # WHO ID / anaemia threshold [K4]
    BELOW_OPTIMAL        15 – 29        # depleted/low stores; symptom-relevant [K3][K17]
    OPTIMAL_REFERENCE    30 – 150       # within favourable reference [K1][K17]
    ABOVE_REFERENCE      151 – 200      # upper reference; context review [K1]
    HIGH_FLAG            > 200          # hyperferritinemia flag [K9] → CONTEXT-FIRST differential
  MALE:
    LOW_STORAGE         < 30            # low stores (male ID threshold) [K3]
    BELOW_OPTIMAL        30 – 49        # low-normal; context-relevant [K17]
    OPTIMAL_REFERENCE    50 – 250       # within favourable reference [K1][K17]
    ABOVE_REFERENCE      251 – 300      # upper reference; context review [K1]
    HIGH_FLAG            > 300          # hyperferritinemia flag [K9] → CONTEXT-FIRST differential
  UNKNOWN_SEX: use FEMALE thresholds (more conservative low end) + sex_assumed + reduced confidence.  [C]
  VERY_HIGH sub-flag: > 1000 µg/L (either sex) → firmer calm review (liver/severe-process context). [K12]

DIRECTION: TWO-SIDED (low = iron-store concern; high = inflammation/metabolic/liver/overload differential). [B]
UNIT: µg/L ≡ ng/mL. No conversion.  [K19]
```
**BioSense V1 wellness interpretations, not diagnostic cut-points. Context-first; never a diagnostic label. [B][D]**

## 0.4 Acute-phase / inflammation handling — [A]+[C] (defining)
```
IF inflammation present (hs-CRP > 5 mg/L [SCL-006], or recent infection/surgery/vaccination/flare):     [K7]
  ferritin may be FALSELY ELEVATED ~30–50% (or 2–5 fold) vs true iron stores;                           [K7,K8]
  → a "normal"/"high" ferritin does NOT rule out low iron stores;
  → inflammation-adjusted ID thresholds apply (<45, or <100 with low TSAT) rather than <30;              [K6]
  → set CONTEXT_REQUIRED or REDUCED confidence; present multiple explanations (§0.5).                    [CF4,CF5]
IF high ferritin: overload is NOT assumed — <10% of high ferritin is true iron overload;                [K11]
  present inflammation / metabolic-syndrome / fatty-liver / alcohol / overload as ordered possibilities. [K11,K13]
```

## 0.5 Multiple-explanations output (founder decision) — [C]
```
WHEN ferritin abnormal AND ≥2 plausible causes exist:
  present Possible Explanation A / B / C, ORDERED by evidence + supporting context;                      [CF5]
  never imply certainty; never present a single cause;
  identify which additional markers (hs-CRP/TSAT/ALT/AST/Hb/CBC) would clarify.                          [CF6]
```

## 0.6 Confidence hierarchy (founder decision) — [C]
```
STANDARD          : within reference, sex-known, no material context conflict, supporting markers concordant.
REDUCED           : minor context uncertainty / single value / sex_assumed / mild inflammation — band cautiously. [CF4]
CONTEXT_REQUIRED  : material context likely changes meaning but is unavailable (e.g. high ferritin, no hs-CRP);
                    band withheld or heavily qualified; state exactly what context is needed.            [CF4,CF6]
ABSTAINED         : significant contextual uncertainty / conflicting signals / ineligible population;
                    explained abstention, route to professional.                                        [CF4]
Reduced confidence does NOT automatically block interpretation; significant uncertainty MAY justify abstention. [CF4]
```

## 0.7 Deterministic safety & suppression rules — [D] (founder wellness position)
```
S1  Ferritin is NOT a diagnosis. NEVER diagnose iron deficiency, haemochromatosis, liver disease, or
    inflammatory disease. Describe patterns; explain possibilities; identify uncertainty; route.         [CF7]
S2  Ferritin ALONE does not reliably indicate iron status; always context-first.                        [CF2]
S3  Interpret context-first: evaluate inflammation/liver/iron-store context BEFORE banding.              [CF1]
S4  Abnormal ferritin → present MULTIPLE possible explanations (A/B/C), never a single certain cause.    [CF5]
S5  Inflammation (hs-CRP>5 / recent infection/surgery) → high/normal ferritin may MASK low iron; qualify. [K7]
S6  HIGH_FLAG → overload NOT assumed (<10%); present inflammation/metabolic/liver/alcohol/overload options. [K11]
S7  VERY_HIGH (>1000) → firmer calm healthcare-review; name nothing.                                     [K12]
S8  LOW_STORAGE → calm, constructive; iron-store depletion pattern; route if symptomatic; never diagnose. [CF7]
S9  Never recommend starting/stopping/changing medication or prescribe iron doses.
S10 Cross-biomarker unavailable → state as confidence limitation, not invented certainty.                [CF6]
S11 Never present a BioSense band as a medical/diagnostic boundary.
S12 On any medication/therapy/supplement question → educational context + refer.
```

## 0.8 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 CONTEXT & COMPANION MARKERS (the key ferritin move): check hs-CRP (SCL-006) for inflammation;
   consider TSAT / iron studies, ALT/AST (SCL-014/015), haemoglobin/CBC (SCL-019) to clarify meaning.    [K7,K14,CF6]
Tier 2 LIFESTYLE (context-appropriate):
   - low stores → iron-rich foods (with vitamin C), address heavy menstrual loss/donation frequency (food-first);
   - high + metabolic → the metabolic-wellness levers (weight, activity, alcohol reduction).             [K13,K20]
Tier 3 HEALTHCARE DISCUSSION (calm) when: HIGH_FLAG / VERY_HIGH | LOW_STORAGE (esp. symptomatic) |
   inflammation-masked pattern | conflicting context | medical/supplement question.                       [D]
NEVER a medication instruction or iron-dose prescription at any tier.
```

## 0.9 Narrative selection rules — [B]/[D]
```
context-gate first → band → template; ALWAYS present possibilities where abnormal + uncertain.
OPTIMAL_REFERENCE          → affirming (context-concordant).
BELOW_OPTIMAL / LOW_STORAGE→ constructive iron-store framing; companion markers; route if symptomatic; NO diagnosis.
ABOVE_REFERENCE / HIGH_FLAG→ CONTEXT-FIRST differential: Possible Explanation A/B/C; overload not assumed.
VERY_HIGH (>1000)          → calm firmer review; name nothing.
inflammation present       → qualify: ferritin may not reflect true iron stores; multiple explanations.
context unavailable        → state confidence limitation; name what would clarify.
Never "normal/abnormal" as a verdict; never a diagnosis (iron deficiency/haemochromatosis/liver/inflammatory).
```

## 0.10 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "Ferritin reflects iron stores but also rises with inflammation, so it's best read alongside markers
      like hs-CRP and your wider context."
CAV3 (reduced/context) name the context reducer(s) or the missing companion marker(s).
CAV4 (inflammation present) "Because there are signs of inflammation, this ferritin may read higher than
      your true iron stores — a low-iron pattern can be masked."
CAV5 (high flag) "A higher ferritin has several possible explanations — inflammation and metabolic factors
      are the most common; true iron overload is uncommon — so it's worth looking at the fuller picture."
CAV6 (low storage) "This pattern suggests low iron stores; if you have fatigue, hair changes, or feel
      run-down, it's worth discussing with a healthcare professional."
CAV7 (context unavailable) "We'd interpret this more confidently with {hs-CRP / iron studies / CBC}."
```

## 0.11 Source & version identifiers
```
config_id: SCL-010   config_version: 1.0
band_set_id: BIOSENSE_FERRITIN_WELLNESS_BANDS_v1     (Category B; sex-aware, two-sided; anchors K1-K12)
context_first_framework_id: BIOSENSE_CONTEXT_FIRST_INTERPRETATION_v1  (founder — permanent, reusable; CF1-CF8)
acute_phase_model_id: SCL010_ACUTE_PHASE_FERRITIN_v1 (K7,K8 — ties SCL-006)
multi_explanation_id: SCL010_MULTIPLE_EXPLANATIONS_v1 (CF5; K11,K13)
confidence_hierarchy_id: SCL010_CONTEXT_CONFIDENCE_v1 (CF4)
cross_biomarker_id: SCL010_CROSS_SCL_CONSUMPTION_v1  (CF6; SCL-006/014/015/019/CBC)
guideline_anchors_id: FERRITIN_REFERENCE_ID_THRESHOLDS (Category A; K1-K12)
safety_rules_id: SCL010_SAFETY_v1                    (S1-S12)
Every row carries its source-ID + category into the engine's CSLBinding.
```

---

# 1. Biomarker Overview

Ferritin is the body's primary iron-storage protein; the small fraction circulating in the blood is what a
ferritin test measures, and it broadly reflects total iron stores. **[A]** It is the **earliest** marker to
fall as iron stores deplete — often well before haemoglobin drops — which makes it valuable for spotting
low iron early. **[A][K15]**

But ferritin has a **dual identity**, and this defines how BioSense handles it. It is also an **acute-phase
reactant**: inflammation, infection, surgery, metabolic strain, and liver stress raise it independently of
iron. <cite index="61-1">In the setting of inflammation, ferritin rises as an acute-phase reactant and can read as normal or even elevated while true iron stores are depleted. Always interpret ferritin alongside CRP.</cite> A high ferritin is therefore far more often inflammatory or metabolic than a sign of true iron overload, and a "normal" ferritin can hide genuine iron deficiency when inflammation is present. **[A][K7][K11]** This is exactly why BioSense interprets ferritin **context-first**.

- **Official name:** Ferritin (serum ferritin)
- **Common abbreviation:** ferritin
- **Reported in:** µg/L (≡ ng/mL) **[A][K19]**
- **Dual identity:** iron-storage biomarker **and** acute-phase reactant **[A][K7]**
- **Direction:** two-sided, sex-aware, context-dependent **[A]**
- **BioSense role:** A context-first iron-store/inflammation marker, read alongside hs-CRP, liver markers, and blood counts.

---

# 2. Physiological Function

Ferritin stores iron safely inside cells (each molecule can hold thousands of iron atoms) and releases it
as the body needs it for red-blood-cell production, energy metabolism, and many other functions. **[A]** A
small amount circulates in serum in rough proportion to total stores — the basis for the test. **[A]**

Two points define interpretation **[A]**:
- **Serum ferritin tracks stores *and* inflammation.** The same protein rises during the acute-phase
  response, so a serum value reflects both iron status and inflammatory state. **[A][K7]**
- **Iron matters at both ends.** Too little impairs energy, cognition, exercise capacity, and immunity;
  too much (genuine overload) can deposit iron in organs. Ferritin is therefore a **two-sided** marker. **[A][K15]**

---

# 3. Scientific Background

Ferritin's reference ranges are sex-aware and laboratory-variable, typically around 30–300 µg/L in men and
15–200 µg/L in women. **[A][K1]** Below the range signals depleted stores: a ferritin under 30 µg/L is a
sensitive and specific marker of iron deficiency, and under 15 µg/L is the classic WHO anaemia threshold. <cite index="59-1">Ferritin <30 ng/mL generally reflects low body iron stores and has high specificity and sensitivity for diagnosing iron deficiency in adults... Iron deficiency is defined as serum ferritin ≤15 μg/L in some studies.</cite> **[A][K3][K4]**

The interpretation becomes context-dependent at both ends. Under **inflammation**, the usual low threshold
no longer holds — <cite index="60-1">The standard threshold for iron deficiency (<30 μg/L) therefore does not apply</cite> and higher inflammation-adjusted thresholds (e.g. <45, or <100 with low transferrin saturation) are used instead. **[A][K6]** At the **high** end, elevation is usually *not* iron overload: <cite index="76-1">Less than 10% of cases of hyperferritinaemia are due to iron overload.</cite> — inflammation, metabolic syndrome, fatty liver, and alcohol are far more common, and a genuine overload work-up needs transferrin saturation above ~45% with ferritin above the sex threshold. **[A][K10][K11]**

**The wellness reading — [B]:** ferritin is a valuable but context-sensitive iron-store signal. BioSense
frames it context-first, presents multiple explanations where the picture is uncertain, reads it with
hs-CRP and companion markers, and never names a condition.

**An honest boundary — [E]:** ferritin thresholds are laboratory- and population-variable (East Asian
populations run higher; "optimal" functional targets are debated), and ferritin alone is only a screening
signal. BioSense reflects this with the context-first gate, the confidence hierarchy, and companion-marker
routing. **[E][K5][K16]**

---

# 4. Why Ferritin Matters

**1. It is the earliest iron-store signal. [A][K15]** Ferritin drops before anaemia, giving an early
window to address low iron. **[A]**

**2. It is genuinely informative — with context. [A][K7]** Read alongside hs-CRP and iron studies, it
distinguishes low stores, inflammation, and overload; read alone, it can mislead. **[A]**

**3. It is two-sided and common. [A][K22]** Iron deficiency is the most common nutritional deficiency
worldwide, and iron excess (metabolic or genetic) is also common — so both ends carry wellness meaning. **[A]**

**Why BioSense measures it — [C]:** ferritin is a widely available, early, high-value iron-store marker —
provided it is interpreted context-first, which is the framework this pack introduces.

---

# 5. Laboratory Measurement

Ferritin is measured from serum by immunoassay. **[A]**

- **Reported in µg/L (≡ ng/mL)** — numerically identical, no conversion. **[A][K19]**
- **Reference ranges are sex-aware and laboratory-variable**; upper limits in particular differ between
  methods and populations (East Asian populations run ~1.5–2× higher). **[A][K1][K16]**
- **No fasting required.** **[A]**
- **A screening test, not a standalone answer:** interpretation sharpens with hs-CRP, transferrin
  saturation, and a blood count. **[A][K14]**

---

# 6. Units

- **µg/L** — micrograms per litre. **BioSense canonical unit.** **[A/C]**
- **ng/mL** — numerically identical to µg/L (1:1). **[A][K19]**
- **No conversion factor** — unlike the lipids/glucose, ferritin needs none. **[A]**

BioSense stores the reported value and unit unchanged. **[C]**

---

# 7. Unit Conversion

```
None. µg/L ≡ ng/mL (numerically identical, 1:1).                                [K19]
The engine MUST NOT apply any conversion factor (e.g. 38.67 / 88.57 / 18.0).
```

**Safety rule [D]:** a value in any other unit is a data error, not something to convert; ferritin is
displayed in µg/L or flagged, never transformed by a lipid/glucose factor. **[D]**

---

# 8. Measurement Limitations & the Acute-Phase Problem  *(the core of Context-First)*

Ferritin's defining limitation is that a single value has **no single meaning**. **[A]**

## 8.1 The dual identity — [A]
Ferritin reflects iron stores **and** rises as an acute-phase reactant. When inflammation is present,
ferritin can be **falsely elevated by ~30–50%** (or 2–5 fold in infection/surgery) relative to true iron
stores, so a normal or high value can mask genuine iron deficiency. <cite index="61-1">If CRP exceeds 5 mg/L, ferritin may be falsely elevated by 30 to 50% relative to actual stores.</cite> **[A][K7][K8]**

## 8.2 Context that changes the meaning — [A]
Ferritin interpretation is materially changed by: inflammation (hs-CRP, recent infection, vaccination,
surgery, inflammatory disease); liver signals (ALT, AST, liver disease, alcohol); and iron-store context
(haemoglobin, CBC, transferrin saturation, menstruation, pregnancy, blood donation, iron supplementation,
transfusion, endurance training, obesity, metabolic syndrome). **[A][K13][K20][K21]** These are the inputs
to the **Context-First gate** (§0.2, §12).

## 8.3 Companion markers sharpen it — [A]
Transferrin saturation <20% supports low iron even when ferritin looks normal; >45% supports overload;
hs-CRP indicates whether inflammation is inflating ferritin; haemoglobin/CBC and ALT/AST add the blood and
liver picture. <cite index="63-1">Ferritin alone is a screening test. Interpretation sharpens when paired with related markers.</cite> **[A][K14]**

## 8.4 Population & assay variation — [A][E]
Reference ranges vary by laboratory, sex, age (elderly run lower), and ancestry (East Asian higher).
"Optimal" functional targets (~70–125 µg/L) are cited in wellness contexts but are not formal guideline
thresholds. **[A][K16][K17][K18]**

**How BioSense uses this — [C][D]:** the **Context-First gate runs before banding** (§0.2); inflammation
sets Context-Required/Reduced confidence and triggers the multiple-explanations output; missing companion
markers are stated as a confidence limitation (never invented certainty).

---

# 9. Relationships With Other Biomarkers  *(Ferritin actively CONSUMES other SCLs — founder decision)*

Ferritin is the first BioSense biomarker that **actively consumes** other SCL documents as interpretation
inputs. **[A][C]**

- **hs-CRP (SCL-006). [A]** The primary inflammation gate. hs-CRP >5 mg/L (or a High band) means ferritin
  may not reflect true iron stores; BioSense qualifies the reading and uses inflammation-adjusted logic. **[A][K7]**
- **Haemoglobin / CBC (SCL-019, future CBC). [A]** Distinguishes iron-store depletion with vs without
  anaemia; low ferritin + low Hb is a different pattern from low ferritin + normal Hb. **[A][K15]**
- **ALT / AST (SCL-014 / SCL-015). [A]** Liver signals; elevated liver enzymes with high ferritin shift the
  differential toward fatty liver / liver stress / alcohol. **[A][K12][K13]**
- **Transferrin saturation / iron studies. [A]** Where available, TSAT <20% (low iron) or >45% (overload)
  is decisive context; BioSense notes when it would clarify. **[A][K14]**
- **Metabolic markers (triglycerides SCL-005, glucose SCL-009, HDL-C SCL-004). [A]** A metabolic-syndrome
  pattern is a common driver of modestly high ferritin. **[A][K11][K13]**

**Cross-biomarker rule [C]:** where a supporting biomarker is **available**, BioSense consumes it to sharpen
interpretation and confidence; where **unavailable**, it states this as a **confidence limitation** and
names what would clarify — it never invents certainty (CF6). **[C]**

---

# 10. Evidence Review

All numbers here are Category **[A]**.

## 10.1 Where the authorities agree
- **Ferritin reflects iron stores and is the earliest marker of depletion.** **[A][K15]**
- **Ferritin is an acute-phase reactant; inflammation inflates it and can mask iron deficiency.** **[A][K7]**
- **Low thresholds:** <30 µg/L sensitive/specific for iron deficiency; <15 the WHO anaemia threshold;
  inflammation-adjusted <45 / <100 (with TSAT). **[A][K3][K4][K6]**
- **High thresholds:** >300 (men) / >200 (women) prompt an overload work-up **with** TSAT >45%; but <10% of
  high ferritin is true overload. **[A][K9][K10][K11]**
- **Companion markers (hs-CRP, TSAT, CBC) are needed to interpret.** **[A][K14]**

## 10.2 Where they differ — and why
- **Low-end thresholds are debated.** WHO uses <15 (women) / <12 (children); contemporary immunoassay
  analyses suggest higher (<25 / <20); functional-wellness sources cite even higher "optimal" (~70–125). <cite index="74-1">Current WHO serum ferritin thresholds... higher thresholds (children, <20 μg/L; women, <25 μg/L) were identified from physiologically based analyses.</cite> **[A][K5][K17]**
- **Upper reference varies by lab, age, sex, ancestry.** East Asian populations run ~1.5–2× higher. **[A][K16]**
- **Why:** ferritin is a continuous, context-modulated marker rather than a clean cut-point test. BioSense
  anchors conservative, widely-used thresholds and leans on context and companion markers rather than a
  single line. **[A][E]**

## 10.3 Strength of evidence
- **Acute-phase behaviour: established.** **[A][K7]**
- **Low thresholds (<15/<30): established (with low-end debate).** **[A][K3][K4][K5]**
- **High thresholds & overload work-up (TSAT): established.** **[A][K9][K10]**
- **<10% of high ferritin = overload: established.** **[A][K11]**
- **"Optimal" functional targets: not guideline-established.** **[E][K17]**

## 10.4 Intended populations
Reference thresholds target general-adult iron-status assessment, sex-aware. BioSense applies them
context-first to general adults, abstaining or requiring context in pregnancy, acute illness, and where
material context is unavailable.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation of the
> Category [A] evidence in §10 for a general-adult wellness audience. They are NOT diagnostic boundaries,
> NOT medical cut-offs, and NOT universal truth. Ferritin is TWO-SIDED, SEX-AWARE, and CONTEXT-GATED: the
> Context-First gate (§0.2, §12) runs BEFORE these bands are applied.**

## 11.1 The interpretation bands (µg/L; general adult, sex-aware, applied after the context gate)

**Female**

| BioSense Wellness Interpretation | Associated ferritin (µg/L) | Evidence anchor | Wellness meaning (context-first; no diagnostic label) |
|---|---|---|---|
| **Low Storage** | < 15 | WHO ID/anaemia threshold [K4] | Iron-store depletion pattern; companion markers + route if symptomatic. |
| **Below Optimal** | 15 – 29 | Low stores; symptom-relevant [K3][K17] | Lower-than-favourable iron stores; worth attention. |
| **Optimal Reference** | 30 – 150 | Favourable reference [K1][K17] | Within a favourable iron-store range. |
| **Above Reference** | 151 – 200 | Upper reference [K1] | Above reference; context review (inflammation? metabolic?). |
| **High — Flag** | > 200 | Hyperferritinemia flag [K9] | Context-first differential; overload uncommon (<10%). |

**Male**

| BioSense Wellness Interpretation | Associated ferritin (µg/L) | Evidence anchor | Wellness meaning |
|---|---|---|---|
| **Low Storage** | < 30 | Male ID threshold [K3] | Iron-store depletion pattern; companion markers + route if symptomatic. |
| **Below Optimal** | 30 – 49 | Low-normal stores [K17] | Lower-than-favourable iron stores; worth attention. |
| **Optimal Reference** | 50 – 250 | Favourable reference [K1][K17] | Within a favourable iron-store range. |
| **Above Reference** | 251 – 300 | Upper reference [K1] | Above reference; context review. |
| **High — Flag** | > 300 | Hyperferritinemia flag [K9] | Context-first differential; overload uncommon (<10%). |

**Both sexes:** **Very High** sub-flag **> 1000 µg/L** → firmer calm review (liver/severe-process context). **[K12]**

## 11.2 How the bands were derived — transparency [B]
- Low boundaries map to recognised iron-deficiency thresholds (15 women / 30 men, K3–K4); upper flags to
  the hyperferritinemia thresholds (>200 women / >300 men, K9); the >1000 sub-flag to the very-high context
  (K12). The optimal-reference midranges reflect favourable reference/functional ranges (K1, K17).
- **The Context-First gate precedes banding** (§0.2, §12): where inflammation or other material context is
  present, the band is qualified or a multiple-explanation output replaces a single reading.
- **No number was averaged.** Sex-specific thresholds kept separate; low-end debate (WHO vs contemporary)
  noted as context (§10.2).

## 11.3 Two-sided, sex-aware direction [B][D]
Ferritin is **two-sided**: low signals iron-store depletion, high opens an inflammation/metabolic/liver/
overload differential. It is **sex-aware** (different thresholds), and **not** simply lower- or
higher-better. **[B]**

## 11.4 Sex handling — [C]
Sex is required for correct banding; if unknown, BioSense uses the **female** thresholds (more conservative
low end), tags `sex_assumed`, and reduces confidence. Never infers sex from the value. **[C]**

## 11.5 Context-gate precedence [D]
No band is emitted as a verdict without the Context-First evaluation (§0.2). A high or low value with
material context present is interpreted **within** that context, with multiple explanations where
warranted (§14). **[D][CF1]**

## 11.6 Population caveat [E]
Bands assume a **general adult, sex-aware, not pregnant, not acutely ill**. Reference ranges vary by lab,
age (elderly lower), and ancestry (East Asian ~1.5–2× higher, K16). "Optimal" functional targets (K17) are
wellness heuristics, not guideline thresholds. Not applied to children/adolescents or pregnancy (§15). **[E]**

---

# 12. Interpretation Framework — CONTEXT-FIRST (the reusable methodology extension)

> **This is the BioSense Context-First Interpretation Framework, introduced by SCL-010 as a permanent,
> reusable part of BioSense methodology (founder decision). It applies to ferritin and to future biomarkers
> whose meaning depends heavily on surrounding biological context.** **[C]**

```
STEP 0 — CONTEXT-FIRST (before anything else):                                                    [CF1]
   gather materially-relevant context (inflammation / liver / iron-store / life-context, §0.2);
   consume available SCLs (hs-CRP SCL-006, ALT SCL-014, AST SCL-015, Hb SCL-019, CBC, TSAT).       [CF6]
   → if material context changes meaning, interpret WITHIN it; if key context is unavailable, record
     a confidence limitation.
STEP 1 — VALIDITY: value interpretable? (unit µg/L; result final) → else display-only.
STEP 2 — ELIGIBILITY: general adult, not pregnant, not acutely ill → else abstain (§15).
STEP 3 — CONFIDENCE (four-level): STANDARD / REDUCED / CONTEXT_REQUIRED / ABSTAINED (§0.6).         [CF4]
STEP 4 — BAND: assign sex-aware two-sided wellness interpretation (§11), qualified by context.
STEP 5 — EXPLANATIONS: if abnormal + ≥2 plausible causes → Possible Explanation A/B/C, ranked.     [CF5]
STEP 6 — NARRATIVE: wellness narrative (§24) + mandatory caveats (§0.10); route where appropriate; no diagnosis.
```

**Reusability [C]:** future context-heavy biomarkers may invoke this framework — the pattern is
*context-before-interpretation, four-level confidence, multiple-explanations, cross-SCL consumption with
graceful degradation, and no diagnosis.* **[C][CF8]**

**Core interpretive stance [B]:** ferritin is a context-first iron-store/inflammation signal — evaluate the
surrounding picture, present honest possibilities, read companion markers, and never name a condition. **[B][D]**

---

# 13. Confidence Assessment  *(four-level hierarchy — founder decision)*

Ferritin uses a **four-level** hierarchy (not the prior two-level + abstain). **[C][CF4]**

| Level | When | Behaviour |
|---|---|---|
| **STANDARD** | Within reference, sex-known, no material context conflict, companion markers concordant | Band normally |
| **REDUCED** | Single value / sex_assumed / mild inflammation / minor context uncertainty | Band cautiously; name the reducer (CAV3) |
| **CONTEXT_REQUIRED** | Material context likely changes meaning but is unavailable (e.g. high ferritin, no hs-CRP) | Withhold or heavily qualify the band; state exactly what context is needed (CAV7) |
| **ABSTAINED** | Significant contextual uncertainty / conflicting signals / ineligible population | Explained abstention; route |

Reducers/context inputs: inflammation present (hs-CRP>5 / infection / surgery / vaccination / flare) [K7];
single value; sex unknown; missing companion markers (hs-CRP/TSAT/ALT/AST/Hb) [CF6]; pregnancy/menstruation/
donation/iron-supp/transfusion/endurance context [K20,K21]; East-Asian/elderly reference variation [K16,K18];
value near a band boundary.

**Rule:** reduced confidence does **not** automatically block interpretation; significant contextual
uncertainty **may** justify abstention. **[CF4]**

---

# 14. Wellness Interpretation  *(context-first, multiple-explanations)*

Interpretation-by-interpretation guidance, applied **after** the Context-First gate. Wellness, not medical;
**never a diagnosis**; multiple explanations where uncertain. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal Reference** *(30–150 F / 50–250 M µg/L, context-concordant).*
  "Your ferritin is in a favourable iron-store range. A good result." **[B]**
- **BioSense Wellness Interpretation: Below Optimal / Low Storage** *(<30 F-tiers / <50 M-tiers).* "This
  pattern suggests your iron stores are on the low side. Iron-rich foods (with vitamin C to aid absorption)
  help, and if you have fatigue, hair changes, or feel run-down — or if you menstruate heavily or donate
  blood often — it's worth discussing with a healthcare professional. Checking a blood count and iron
  studies would clarify the picture." Constructive; **no "iron deficiency" diagnosis** (CAV6). **[B][D]**
- **BioSense Wellness Interpretation: Above Reference / High — Flag** *(>200 F / >300 M).* Present a
  **context-first differential** (CAV5): "A higher ferritin has several possible explanations, ordered by
  what's most likely given your other markers:
  - **Possible Explanation A — inflammation:** if there are signs of inflammation (e.g. a raised hs-CRP,
    recent infection or surgery), ferritin often rises independently of iron.
  - **Possible Explanation B — metabolic factors / fatty liver / alcohol:** common drivers of a modestly
    higher ferritin, especially with metabolic-syndrome markers or raised liver enzymes.
  - **Possible Explanation C — true iron overload:** less common (under 1 in 10 of high ferritins) and
    usually needs a high transferrin saturation to suggest it.
  Looking at hs-CRP, iron studies (transferrin saturation), and liver markers would clarify which fits."
  **No haemochromatosis/liver diagnosis.** **[B][D][K11]**
- **BioSense Wellness Interpretation: Very High** *(>1000 µg/L).* "This is well above the typical range and
  worth discussing with a healthcare professional, who can look at the fuller picture." Calm, firmer; name
  nothing (S7). **[B][D]**

**Inflammation modifier (always checked first):** where inflammation is present, every low/normal reading is
qualified — ferritin may not reflect true iron stores, and a low-iron pattern can be masked (CAV4). **[D][K7]**

**Context-unavailable modifier:** where key companion markers are missing, state the confidence limitation
and name what would clarify (CAV7); never invent certainty (S10). **[D][CF6]**

Every interpretation pairs with companion-marker/lifestyle guidance (§17) and the mandatory caveats (§0.10).
**None diagnoses iron deficiency, haemochromatosis, liver disease, or inflammatory disease.** **[D]**

---

# 15. Special Populations & Abstention

BioSense **abstains or requires context** where its bands don't apply or the picture is too uncertain. **[C]/[D]/[E]**

- **15.1 Context-required (the defining case).** Material context likely changes meaning but is unavailable
  (e.g. high ferritin with no inflammatory markers) → withhold/qualify the band, state what context is
  needed (§13, CAV7). **[D][CF4]**
- **15.2 Acute illness / recent surgery / active inflammation.** Ferritin is unreliable as an iron-store
  marker; interpret within context or abstain, with a re-check-when-well suggestion. **[D][K7]**
- **15.3 Pregnancy.** Iron demands and dilution shift ferritin; BioSense uses pregnancy-aware caution or
  abstains, deferring to a professional. **[D]**
- **15.4 Children & adolescents.** Adult bands not applied; display, suggest professional interpretation. **[D]**
- **15.5 Sex unknown.** Female thresholds + `sex_assumed` + reduced confidence, or abstain in edge cases. **[C]**
- **15.6 Conflicting signals.** e.g. low ferritin with strong inflammation, or high ferritin with low TSAT —
  present as multiple explanations or abstain; route. **[D][CF5]**

**Abstention and Context-Required are first-class, non-error outputs**, always explained. **[D]**

---

# 16. Trend & Longitudinal Behaviour

- **Context-consistency matters most. [A][E]** A ferritin change is only meaningful if inflammatory state
  is comparable between measurements; a rise during an infection is not a true store change. **[K7]**
- **Read trends with hs-CRP and companion markers. [A]** A falling ferritin with stable hs-CRP suggests
  declining stores; a rising ferritin with rising hs-CRP suggests inflammation, not iron gain. **[K7][K14]**
- **Acute-phase / abstained points excluded. [C]** Values during inflammation or context-required states are
  tagged and excluded from store-trend so they don't create a false signal.
- **Direction & framing. [B]** Movement into the optimal-reference range is encouraged; movement toward
  Low-Storage is a constructive prompt; a high flag is framed as a context-first differential, never as
  progression of a named disease.
- **Companion-marker trends. [A]** Where available, TSAT and Hb trends contextualise the ferritin trend. **[K14]**

---

# 17. Lifestyle & Companion-Marker Guidance

For ferritin, the first tier is **context and companion markers**, then context-appropriate lifestyle. **[A]/[B]**

## 17.1 Companion markers first [A][K14][CF6]
Check **hs-CRP** (inflammation), **transferrin saturation / iron studies**, **haemoglobin / CBC**, and
**ALT/AST** where available — these determine what the ferritin means before any lifestyle advice. **[A]**

## 17.2 Low iron stores [A][K20]
Iron-rich foods (lean red meat, legumes, leafy greens) with vitamin C to aid absorption; be mindful of
heavy menstrual loss and frequent blood donation; food-first. **BioSense does not prescribe iron doses**
(S9) — supplementation is a clinical decision. **[A][D]**

## 17.3 High ferritin with metabolic pattern [A][K13]
Where a metabolic/fatty-liver pattern is likely, the metabolic-wellness levers apply: weight management,
activity, reducing alcohol and refined carbohydrate. **[A]**

## 17.4 Framing rules [B][D]
Companion markers first; medication and iron doses never prescribed; multiple explanations where uncertain;
calm, evidence-informed language; never a diagnosis.

---

# 18. AI Reasoning Constraints

The AI layer **renders** deterministic decisions; it does not make clinical judgements (PI-4). **[D]**

The AI layer **may**: explain the band and what ferritin is (storage + acute-phase) in warm wellness
language; run the context-first evaluation; present multiple ranked explanations; name which companion
markers would clarify; express context-required/abstention respectfully.

The AI layer **must never**:
- diagnose iron deficiency, haemochromatosis, liver disease, or inflammatory disease — even to deny one (S1)
- interpret ferritin independently when material context exists (S2, S3)
- present a single certain explanation for an abnormal ferritin (S4)
- treat a normal/high ferritin as ruling out low iron when inflammation is present (S5)
- assume iron overload from a high ferritin (S6)
- invent certainty when companion markers are unavailable — state the limitation (S10)
- recommend medication or prescribe iron doses (S9, S12)
- present a BioSense band as a medical/diagnostic boundary (S11)
- infer pregnancy, inflammation, or a condition from the value

Enforcement is by output validation on rendered text, not by prompt alone. Diagnosing any of the four named
conditions is SAFETY_CLASS forbidden content. **[D]**

---

# 19. Safety Considerations

- **Not a diagnosis; four named conditions never diagnosed.** Every output carries CAV1; BioSense describes
  patterns and possibilities, never names iron deficiency / haemochromatosis / liver disease / inflammatory
  disease (S1). **[D][CF7]**
- **Context-first honesty.** Ferritin alone is not treated as iron status; inflammation-masking is flagged
  (S5, CAV4). **[D][K7]**
- **Multiple explanations.** Abnormal ferritin yields ranked possibilities, not false certainty (S4). **[D]**
- **Overload not assumed.** A high ferritin defaults to the common explanations, not haemochromatosis (S6). **[D][K11]**
- **Very high routes calmly.** >1000 gets firmer calm review, nothing named (S7). **[D][K12]**
- **No medication / iron-dose guidance.** Supplement/medication questions → educational context + referral
  (S9, S12). **[D]**
- **Missing context is stated, not invented.** (S10). **[D][CF6]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a calm wellness conversation with a healthcare professional when: **[D]**
1. **High — Flag** (>200 F / >300 M) or **Very High** (>1000) — a context-first differential benefits from
   professional work-up (incl. iron studies). **[K9][K12]**
2. **Low Storage / Below Optimal**, especially with symptoms (fatigue, hair changes) or heavy menstrual
   loss / frequent donation. **[K3][K20]**
3. **Inflammation-masked pattern** — a normal/high ferritin with signs of inflammation and possible low iron. **[K7]**
4. **Conflicting signals** (e.g. low ferritin + strong inflammation; high ferritin + low TSAT). **[CF5]**
5. The user is in a **context-required / abstention** situation (pregnancy, acute illness, missing key
   markers). 
6. The user **asks a medical, medication, or iron-supplement question** (S12).

All suggestions are wellness-framed, non-urgent, non-diagnostic, and name no condition. **[D]**

---

# 21. BioSense Product Integration & Cross-Biomarker Consumption

How SCL-010 plugs into the existing platform (no architecture change): **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for ferritin, plus sex, and — as
  interpretation inputs — **hs-CRP (SCL-006), ALT (SCL-014), AST (SCL-015), haemoglobin (SCL-019), future
  CBC, and transferrin saturation / iron studies** where available. **[CF6]**
- **Supplies (as CSL bindings):** the sex-aware two-sided wellness bands (Category B), the **Context-First
  Interpretation Framework** (reusable), the acute-phase model, the multiple-explanations output, the
  four-level confidence hierarchy, the cross-SCL consumption rules with graceful degradation, safety rules,
  companion-marker guidance, and narrative templates — each with value + source-ID + category + version.
- **Cross-biomarker consumption pattern (new):** where a supporting SCL is available, its band/value/
  confidence is consumed to sharpen ferritin interpretation; where unavailable, a **confidence limitation**
  is recorded and surfaced (CF6). This is the first SCL to depend on others in this direction. **[C]**
- **Respects:** every ENG platform invariant; the SCL-006 acute-phase discipline; the cross-marker
  discipline (companion markers inform, never averaged into a single ferritin verdict).
- **Score contribution:** ferritin contributes to iron-status / metabolic-wellness context as a
  **context-gated, two-sided** input; context-required/abstained values do not contribute a definite band.
  Any weighting is a Category [C] product decision. **[C]**
- **Framework reuse:** the Context-First Interpretation Framework is exposed as a reusable methodology for
  future context-heavy biomarkers (CF8). **[C]**

---

# 22. Medication & Supplement Context (educational only)

Educational context only; BioSense does not instruct on medication or prescribe iron (S9, S12). **[D]**
- Iron supplementation, IV iron, and iron-overload treatments (e.g. phlebotomy, chelation) are clinical
  decisions made on the full picture (ferritin + TSAT + symptoms + cause); a person's ferritin on iron
  therapy or after transfusion reflects that context. **[A][K21]**
- Any supplement or medication question → educational context + suggestion to speak with a healthcare
  professional. **[D]**

---

# 23. Open Questions & Areas of Uncertainty [E]

1. **Low-end thresholds are debated. [E]** WHO <15 vs contemporary <25 (women); functional "optimal"
   (~70–125) is a wellness heuristic, not a guideline. BioSense uses conservative anchors + context. **[K5][K17]**
2. **Reference ranges vary by lab / age / ancestry. [E]** East Asian ~1.5–2× higher; elderly lower. **[K16][K18]**
3. **Ferritin alone is only a screening signal. [E]** Companion markers (hs-CRP, TSAT, CBC, ALT/AST) are
   often needed; when unavailable, confidence is limited (never invented). **[CF6]**
4. **Multiple explanations are the norm at the high end. [E]** BioSense presents A/B/C rather than a single
   cause. **[K11]**
5. **Cross-SCL availability is data-dependent. [E]** The Context-First framework degrades gracefully to a
   confidence limitation when companion SCLs are absent. **[CF6]**

---

# 24. Narrative Generation Templates

Deterministic templates the AI renders (warm wellness tone; caveats appended; **never a diagnosis**;
context-first; multiple explanations where uncertain). **[B]/[D]** (Illustrative; exact copy owned by
BioSense.)

```
TEMPLATE: OPTIMAL_REFERENCE (context-concordant)
"Your ferritin is {value} µg/L — in a favourable iron-store range. A good result."  +CAV1 +CAV2

TEMPLATE: BELOW_OPTIMAL / LOW_STORAGE
"Your ferritin is {value} µg/L — a pattern that suggests your iron stores are on the low side. Iron-rich
 foods with vitamin C help; if you feel fatigued or run-down, or menstruate heavily / donate blood often,
 it's worth discussing with a healthcare professional. A blood count and iron studies would clarify."  +CAV1 +CAV2 +CAV6

TEMPLATE: HIGH_FLAG (context-first differential — MULTIPLE EXPLANATIONS)
"Your ferritin is {value} µg/L — higher than the reference range. There are a few possible explanations,
 ordered by what's most likely given your other markers:
  A) Inflammation — ferritin rises with inflammation (a raised hs-CRP, recent infection or surgery).
  B) Metabolic factors / fatty liver / alcohol — common drivers of a modestly higher ferritin.
  C) True iron overload — less common (under 1 in 10 of high ferritins), usually needs a high transferrin
     saturation to suggest it.
 Looking at hs-CRP, iron studies and liver markers would show which fits."  +CAV1 +CAV2 +CAV5

TEMPLATE: VERY_HIGH (>1000)
"Your ferritin is {value} µg/L — well above the typical range and worth discussing with a healthcare
 professional, who can look at the fuller picture."  +CAV1 +CAV2   (name nothing — S7)

MODIFIER: INFLAMMATION_PRESENT (hs-CRP>5 / recent infection/surgery) →
 "Because there are signs of inflammation, this ferritin may read higher than your true iron stores — a
  low-iron pattern can be masked."  +CAV4

MODIFIER: CONTEXT_REQUIRED / CONTEXT_UNAVAILABLE →
 "We'd interpret this more confidently with {hs-CRP / iron studies / a blood count}. Without it, we're
  keeping this reading tentative."  +CAV7

MODIFIER: SEX_ASSUMED → append CAV3 ("we used general thresholds because sex wasn't specified").
```

**Absolute rules:** no template diagnoses iron deficiency / haemochromatosis / liver disease / inflammatory
disease, presents a single certain cause for an abnormal value, or presents a band as a diagnosis. **[D]**

---

# 25. Example Outputs

**Example 1 — Optimal reference, context-concordant. [illustrative]**
```
Input: ferritin 90 µg/L (female), hs-CRP 0.8 (SCL-006 low), no flags.
Context-first: no inflammation → ferritin reflects stores.
Band: OPTIMAL_REFERENCE | Confidence: STANDARD
Narrative: OPTIMAL_REFERENCE +CAV1+CAV2.
```

**Example 2 — Low storage, no inflammation. [illustrative]**
```
Input: ferritin 12 µg/L (female), hs-CRP 0.5, Hb available.
Band: LOW_STORAGE | Confidence: STANDARD | NO "iron deficiency" diagnosis
Narrative: LOW_STORAGE +CAV1+CAV2+CAV6 ; Rec: iron-rich foods; companion markers; route if symptomatic.  [S1]
```

**Example 3 — Normal ferritin BUT inflammation present (masking). [illustrative]**
```
Input: ferritin 60 µg/L (female), hs-CRP 12 (SCL-006 High), fatigue.
Context-first: inflammation → ferritin may overstate stores.
Confidence: CONTEXT_REQUIRED/REDUCED | Narrative: OPTIMAL_REFERENCE + INFLAMMATION_PRESENT (CAV4);
present possibility that low iron is masked; suggest iron studies (TSAT).  [S5]
```

**Example 4 — High flag, multiple explanations. [illustrative]**
```
Input: ferritin 420 µg/L (male), hs-CRP 8, ALT mildly up, metabolic markers present.
Band: HIGH_FLAG | Confidence: CONTEXT_REQUIRED | overload NOT assumed
Narrative: HIGH_FLAG differential A(inflammation)/B(metabolic-fatty-liver)/C(overload) +CAV5 ; suggest hs-CRP/TSAT/liver markers.  [S4,S6]
```

**Example 5 — Very high. [illustrative]**
```
Input: ferritin 1300 µg/L (male).
Band: VERY_HIGH (>1000) | Narrative: firmer calm review +CAV1+CAV2 ; name nothing.  [S7]
```

**Example 6 — Companion markers unavailable. [illustrative]**
```
Input: ferritin 260 µg/L (male), no hs-CRP, no iron studies.
Band: ABOVE_REFERENCE | Confidence: CONTEXT_REQUIRED (missing hs-CRP/TSAT)
Narrative: ABOVE_REFERENCE + CONTEXT_UNAVAILABLE (CAV7); confidence limitation stated, not invented certainty.  [S10]
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — deterministic platform (four-state model,
  validity-before-confidence, cross-marker discipline, PI-4 rendering, governance).
- **SCL-006 (hs-CRP)** — the primary inflammation gate ferritin consumes; acute-phase discipline shared.
- **SCL-014 (ALT), SCL-015 (AST)** — liver-signal inputs (future packs); consumed where available.
- **SCL-019 (Haemoglobin) & future CBC** — iron-store/anaemia context; consumed where available.
- **SCL-004/005/009 (HDL-C/Triglycerides/Glucose)** — metabolic-pattern context for high ferritin.
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **§12 Context-First Interpretation Framework** — the reusable methodology extension introduced here.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references retrieved and verified during authoring. Numeric values trace via the K-series IDs in §0
> and the body. Developers finalising the pack should confirm exact page/table locators against the primary
> PDFs where required.

**Reference ranges & thresholds (Category A anchors)**

1. DrOracle clinical references (2025–2026): ferritin reference ranges & iron-deficiency thresholds. —
   *Men 20–250/30–300, women 15–200; <30 (~79% sens/98% spec); <15; inflammation-adjusted <45 (92% spec);
   elderly means (K1, K3, K4, K6, K18).*
2. Evergreen Doctors; Superpower; Lamkin Clinic (2026). — *30–200 (F)/30–300 (M); functional "optimal"
   70–125; high >200 (F)/>300 (M); high-ferritin drivers; ferritin the earliest marker to drop (K1, K9,
   K13, K15, K17).*
3. HealthRX ferritin guides (by-sex-hormones; how-to-interpret). — *CRP>5 → false elevation 30–50%; 2–5 fold
   in infection/surgery; TSAT <20% (ID) / >45% (overload); companion tests; ID prevalence 1.2B (K7, K8,
   K14, K22).*

**Acute-phase & iron-deficiency-in-inflammation (Category A)**

4. Dignass A, et al. **Limitations of Serum Ferritin in Diagnosing Iron Deficiency in Inflammatory
   Conditions.** *Int J Chronic Dis* (PMC5878890). — *<30 doesn't apply in inflammation; <100 + TSAT<20% in
   CHF/CKD/IBD (K6).*
5. NCT04253626 (antepartum IDA protocol). — *<30 confirms ID in women; borderline 30–40 with chronic illness
   (acute-phase) (K3).*

**Hyperferritinemia & overload (Category A)**

6. **Hyperferritinemia.** *CMAJ* 2021;193(39):E1534. — *TSAT>45% + ferritin >300 (M)/>200 (W) → genetic
   testing; chronic-condition elevation confounds (K9, K10).*
7. Medscape Hemochromatosis Workup; BC Guidelines (High Ferritin & Iron Overload); Australian Red Cross
   Lifeblood (PMC12009596). — *>300 (M)/>200 (W); >1000 liver fibrosis; <10% of high ferritin is overload;
   East Asian 1.5–2×; donor reference 15–400 (F)/30–500 (M) (K2, K9, K11, K12, K16).*
8. PMC7117746 (Korean cohort, hyperferritinemia >300); PMC3124123 (Still's ≥1000); PMC8666385 (>1000
   hyperferritinemia). — *high thresholds & very-high context (K12).*

**Low-end debate & population (Category A/P)**

9. Mei Z, et al. **WHO ferritin thresholds vs physiologically based thresholds (NHANES III).** (PMC10472073).
   — *WHO <15 (women)/<12 (children); contemporary <25/<20 (K5).*

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–8; they are
> BioSense Version 1 classifications, sex-aware and two-sided and **context-gated**, not attributable to any
> single reference as a diagnostic threshold, and **do not restate diagnostic labels.** The Context-First
> Interpretation Framework is a BioSense methodology extension (founder decision).

---

# 28. Founder Decisions Required

The Context-First Interpretation Framework and ferritin methodology were resolved by founder decision
(context-first order; four-level confidence; multiple explanations; cross-SCL consumption; never diagnose)
and are implemented in this pack. Two optional presentation/policy items remain: **[C][E]**

**D-1 — Confirm the sex-aware band boundaries**, in particular the low-end anchors (female <15 / male <30)
given the WHO-vs-contemporary debate, and the functional "optimal-reference" midranges. Confirmation
requested that the conservative recognised anchors are the intended wellness gradient. **Founder sign-off
requested.**

**D-2 — Confirm the cross-biomarker consumption scope for V1.** SCL-010 consumes hs-CRP (SCL-006) now and is
specified to consume ALT/AST/Hb/CBC (SCL-014/015/019) when those packs exist. **Founder decision requested**
on whether V1 activates ferritin with hs-CRP-only context (degrading gracefully) or waits for the liver/CBC
packs.

*(Both affect presentation/handling, not the underlying evidence or the resolved framework.)*

---

**END OF SCL-010 v1.0**

*Authored on the frozen SCL-001 template. Every numeric value is either a cited Category [A] guideline/
reference figure or a transparently-labelled Category [B] BioSense wellness interpretation. No value was
fabricated; every Category [A] number was retrieved and verified during authoring and traces to §27. The
Context-First Interpretation Framework — context-before-interpretation, four-level confidence hierarchy,
multiple-explanations output, cross-SCL consumption with graceful degradation, and never diagnosing iron
deficiency / haemochromatosis / liver disease / inflammatory disease — is an intentional, reusable structural
extension per the founder decision; all other structure follows SCL-001 exactly and remains consistent with
SCL-001 through SCL-009 (and the SCL-006 acute-phase discipline).*
