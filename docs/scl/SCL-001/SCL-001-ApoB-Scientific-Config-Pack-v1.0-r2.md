# SCL-001 — APOLIPOPROTEIN B
# SCIENTIFIC CONFIGURATION PACK
### Version 1.0 · BioSense Version 1 Wellness Methodology

**Document ID:** SCL-001
**Biomarker:** Apolipoprotein B (ApoB)
**Status:** Version 1.0 — evidence-anchored, developer-activatable
**Owner:** BioSense Scientific Authoring (Origin BioSense Technologies FZCO)
**Date:** 26 July 2026
**Template status:** This document is the reference template for every future BioSense biomarker SCL pack.

---

> **What this document is.** SCL-001 populates the scientific knowledge layer that the
> (already-complete) BioSense engineering platform consumes. It does not redesign the
> Constitution, the ENG documents, the Blood Analysis Engine, or the SCL architecture. It
> supplies verified evidence, the BioSense Version 1 Wellness Methodology, and the exact
> values and rules the engine needs to activate ApoB.
>
> **What BioSense is.** A premium wellness and preventative health-intelligence platform.
> **Not** a medical device. It does **not** diagnose disease, **not** replace clinicians,
> **not** prescribe. All content is written from a **wellness-optimisation** perspective.
>
> **On thresholds.** Recognised guideline numbers are reproduced faithfully and attributed
> (Category A). The BioSense Wellness Interpretation Bands are a transparent interpretation
> of that evidence for a general-adult wellness audience (Category B) — they are **BioSense
> Version 1 Wellness Interpretations, not diagnostic boundaries or universal medical truth.**

---

# SCIENTIFIC POSITION STATEMENT

BioSense is a premium wellness and preventative health-intelligence platform. It is not a
medical device. It does not diagnose disease, and it does not replace healthcare
professionals. Everything in this document is written to help a healthy adult understand and
optimise a modifiable long-term wellness signal — never to render a clinical verdict.

BioSense builds its guidance the way a serious scientific organisation would. Before forming
any position, BioSense reviews the current scientific evidence and the recognised
international guidelines for a biomarker. It reproduces those guideline figures faithfully
and attributes them to their source. Only then does BioSense create its own **Version 1
Wellness Interpretation Methodology** — a considered interpretation of that evidence, framed
for a general-adult consumer wellness audience.

This distinction is the heart of BioSense's identity, and it is deliberate. The numbers
published by clinical guideline bodies were created to stratify and treat patients. BioSense
does not restate them as if they were consumer wellness targets, and it does not invent
medical reference ranges of its own. Instead, BioSense **interprets** the weight of the
evidence and expresses that interpretation as a clear, calm, optimisation-focused wellness
picture.

Accordingly, the BioSense Wellness Interpretation Bands in this document are **consumer
wellness classifications, not diagnostic criteria.** They are BioSense's interpretation of
what the evidence suggests is favourable, near-favourable, or worth attention for a general
adult — nothing more, and they should never be read as a medical diagnosis or a treatment
threshold.

Every BioSense interpretation is **version controlled and transparent.** Each carries its
supporting evidence, its rationale, its category, and its version number, so the reasoning
behind every classification is fully auditable. And because science advances, these
interpretations are designed to **evolve as the evidence evolves** — each future revision
re-examines the guidelines and literature and updates the methodology accordingly, with a
documented history of what changed and why.

This is what BioSense means by premium wellness intelligence: not the authority of a clinic,
but the discipline of transparent, evidence-informed interpretation, offered to help people
understand and improve their long-term health.

---

## CONTENT CLASSIFICATION KEY

Throughout, every substantive item is tagged:

- **[A] Source-derived fact / recognised threshold** — traceable to a named guideline, consensus statement, or primary source.
- **[B] BioSense Version 1 wellness classification** — a BioSense-authored synthesis, labelled as such.
- **[C] Product-policy decision** — a choice BioSense made for V1, recorded for audit.
- **[D] Safety / healthcare-review wording** — deterministic caveats and referral language.
- **[E] Area of uncertainty** — explicitly flagged limitation or unresolved evidence.

---

# 0. IMPLEMENTATION SUMMARY (developer-facing, near the front by design)

> This section contains the exact values and rules needed to activate ApoB. Every value
> carries a source ID (E-series → §27 references) and a category tag. Full rationale is in
> the body. **This summary is authoritative for the engine; the body is authoritative for
> the science.**

## 0.1 Canonical units & conversion — [A]
```
canonical_unit: mg/dL
accepted_inbound → canonical:
  g/L   → mg/dL : value × 100        # 1 g/L = 100 mg/dL              [E13]
  mg/L  → mg/dL : value ÷ 10
  mg/dL → mg/dL : identity
Always retain value_reported + unit_reported. Never guess a missing unit.  [ENG platform rule]
```

## 0.2 BioSense Version 1 Wellness Bands — [B] (synthesis of [A] anchors E1–E7)
```
APOB_WELLNESS_BAND (canonical mg/dL, general adult, untreated, primary-prevention default):
  OPTIMAL                <  65      # aligns with ESC/EAS very-high-risk goal E1; ~5–9th %ile E7
  NEAR_OPTIMAL           65 – 79    # ESC/EAS high-risk goal region E2
  ABOVE_TARGET           80 – 89    # approaching NLA primary-prevention <90 ceiling E4
  ELEVATED               90 – 129   # ≥90 above NLA desirable E4; up toward ~90th %ile E5
  SIGNIFICANTLY_ELEVATED ≥ 130      # ≈90th population %ile / risk-enhancer, NLA E5
DIRECTION: LOWER_BETTER. No low-end wellness penalty (see 0.6 + §11.6).  [B]
```
**These are BioSense V1 wellness bands, not diagnostic cut-points. [B][D]**

## 0.3 Risk-group / contextual target logic — [A]+[C]
```
DEFAULT context = general adult, primary prevention, untreated.          [C: B2]
IF user DECLARES an established higher-risk context (known ASCVD, diabetes,
   familial hypercholesterolaemia), engine MAY display the recognised
   guideline goal ALONGSIDE the wellness band, clearly attributed:
     very-high-risk goal  ApoB < 65 mg/dL   (ESC/EAS 2019)   [E1]
     high-risk goal       ApoB < 80 mg/dL   (ESC/EAS 2019)   [E2]
   These are shown as GUIDELINE GOALS (Category A), never recomputed as
   BioSense bands, never as instructions. Higher-risk display is a
   product-policy decision → see §11.4 / Decision D-2.       [C]
NEVER infer risk group from the ApoB value itself.                        [D]
```

## 0.4 Confidence reducers — [A]/[D] (each reduces interpretation confidence)
```
non_fasting_sample            # minor for apoB; still a reducer          [E11]
sample_age_old / stale        # per platform freshness policy
missing_supporting_lipids     # no LDL-C / non-HDL-C for concordance      [E18]
contradictory_lipids          # apoB/LDL-C discordance present           [E18]
poor_lab_quality / non_std    # assay not standardised / high imprecision [E9,E10]
active_inflammation_illness   # acute-phase lipid perturbation
recent_major_diet_change      # transient shift
on_lipid_lowering_therapy     # value reflects treated state
high_triglycerides           # affects some direct assays / discordance  [E10]
pregnancy                     # physiological lipid shift
unknown_risk_context          # default assumed, tag applied             [C]
```

## 0.5 Deterministic safety & suppression rules — [D]
```
S1  ApoB is NOT a diagnosis. Never state or imply disease.               [D]
S2  ApoB is ONE input to cardiovascular wellness, never a risk score.    [D][E17]
S3  Never name or imply familial hypercholesterolaemia (or any condition)
    to the user. FH has NO apoB diagnostic cut-point; FH is LDL-C +
    clinical/genetic defined. Detect-pattern → refer, name nothing.      [D][E15]
S4  SIGNIFICANTLY_ELEVATED (≥130) → wellness "healthcare-review" wording,
    calm, non-alarming, non-diagnostic. (Threshold ≈90th %ile.)          [D][E5]
S5  Very low ApoB is NOT a wellness concern and NEVER penalised; if
    markedly low and untreated, offer neutral "worth mentioning to a
    doctor" wording WITHOUT naming any cause.                            [D][E14]
S6  Never recommend starting/stopping/changing medication.               [D]
S7  Never produce a numeric cardiovascular risk % from ApoB.             [D][E17]
S8  On any medication/therapy question → educational context + refer.    [D]
S9  Suppress interpretation on validity-suspect samples (per ENG engine).
S10 Never present a BioSense band as a medical/diagnostic boundary.      [D][B]
```

## 0.6 Recommendation ladder (wellness-first) — [A]/[B]
```
Tier 1 LIFESTYLE (always first):
   nutrition (soluble fibre, reduce saturated fat, unsaturated fats,
   plant proteins), physical activity, weight management, sleep,
   alcohol moderation, no smoking.                                       [E19-E22]
Tier 2 RE-MEASURE / TRACK: confirm trend over time (apoB non-fasting ok). [E11]
Tier 3 HEALTHCARE DISCUSSION: calm suggestion to discuss with a doctor,
   triggered by SIGNIFICANTLY_ELEVATED, or discordance, or user context. [D]
NEVER a medication instruction at any tier.                              [D]
```

## 0.7 Narrative selection rules — [B]/[D]
```
band → narrative template (see §24), modulated by confidence + context.
OPTIMAL/NEAR_OPTIMAL      → affirming, maintain.
ABOVE_TARGET/ELEVATED     → constructive, optimisation-focused.
SIGNIFICANTLY_ELEVATED    → calm + healthcare-review wording [D].
Any low-confidence        → add the relevant confidence caveat.
Never "normal"/"abnormal"; never diagnosis language.                     [D]
```

## 0.8 Mandatory caveats — [D]
```
CAV1 "This is wellness information, not a medical diagnosis."
CAV2 "ApoB is one of several factors in cardiovascular wellness."
CAV3 (low confidence) name the specific reducer(s) present.
CAV4 (higher-risk guideline goal shown) "Guideline goal shown for context;
      discuss your personal targets with your doctor."
CAV5 (significantly elevated) "It may be worth discussing this with a
      healthcare professional." (calm, non-urgent, non-diagnostic)
```

## 0.9 Source & version identifiers for every implemented rule
```
config_id: SCL-001
config_version: 1.0
band_set_id: BIOSENSE_APOB_WELLNESS_BANDS_v1   (Category B; anchors E1-E7)
guideline_goals_id: ESC_EAS_2019_APOB_GOALS    (Category A; E1-E3)
                    NLA_2024_APOB_PERCENTILES   (Category A; E4-E5)
lifestyle_evidence_id: SCL001_LIFESTYLE_v1      (E19-E22)
safety_rules_id: SCL001_SAFETY_v1               (S1-S10)
Every band/goal/rule row above carries its E-source and category into the engine's
CSLBinding (per ENG governance): value + source + category + version.
```

---

# 1. Biomarker Overview

Apolipoprotein B (ApoB) is the structural protein that forms the backbone of every
atherogenic lipoprotein particle in the blood — LDL, VLDL, IDL, and lipoprotein(a). **[A]**
Because each of these particles carries exactly one ApoB molecule, a single ApoB
measurement counts the total number of atherogenic particles circulating in the
bloodstream. **[A]** <cite index="53-1">Apo B is a component of all atherogenic lipoproteins and each atherogenic particle contains one molecule of apo B; therefore apo B concentration provides a direct estimate of the number of atherogenic lipoprotein particles in the blood.</cite>

From a wellness perspective, this is what makes ApoB uniquely useful: standard cholesterol
tests measure the *cargo* (how much cholesterol the particles carry), while ApoB measures
the *particle count* itself. Two people with identical LDL cholesterol can have very
different particle numbers, and it is the particle number that more closely tracks
long-term cardiovascular wellness. **[A]**

- **Official name:** Apolipoprotein B
- **Common abbreviation:** ApoB (also apo B, apoB)
- **Principal circulating form measured:** ApoB-100 **[A][E12]**
- **Molecular class:** Apolipoprotein (structural, non-exchangeable)
- **BioSense role:** A core cardiovascular-wellness biomarker; the particle-count companion to a standard lipid panel.

---

# 2. Physiological Function

ApoB performs one central job: it provides the structural scaffold that lets the body
package and transport fats (which do not dissolve in water) through the watery bloodstream.
**[A]** Without ApoB, the liver and intestine could not export lipids into circulation.

Two forms exist in humans **[A][E12]**:

- **ApoB-100** — made by the **liver**, it is the form found on VLDL, IDL, LDL, and Lp(a). <cite index="51-1">Hepatic ApoB has a molecular mass of 540000 Da.</cite> This is the form standard ApoB tests measure.
- **ApoB-48** — made by the **intestine**, it is found on chylomicrons that carry dietary fat. <cite index="51-1">Intestinal ApoB, which is present in chylomicrons, has a molecular mass of 48% of that of hepatic ApoB.</cite>

Each atherogenic particle carries exactly one ApoB molecule, and ApoB stays with its
particle from creation until the particle is cleared from the blood. This one-to-one
relationship is the biological basis for using ApoB as a particle counter. **[A]**

From a wellness standpoint, the relevant physiology is simple and empowering: the number of
these particles in your blood is influenced meaningfully by daily lifestyle — what you eat,
how much you move, your body composition, and your sleep — as well as by genetics. **[A]**

---

# 3. Scientific Background

The scientific case for paying attention to ApoB rests on an unusually strong and
consistent body of evidence. Three independent lines of research converge on the same
conclusion — that the atherogenic (ApoB-containing) particles are causally involved in the
long-term development of arterial plaque, not merely associated with it: **[A]**

- **Population studies** consistently link higher ApoB-particle burden with higher long-term cardiovascular risk. **[A]**
- **Human genetic studies (Mendelian randomisation)** show that people who inherit genetically lower ApoB-particle levels have lower lifetime cardiovascular risk. **[A]**
- **Randomised trials** of therapies that lower these particles show reduced cardiovascular events across several distinct drug mechanisms. **[A]**

The European Atherosclerosis Society Consensus Panel reviewed the totality of this evidence
and concluded it satisfies the formal criteria for causality. <cite index="77-1">The prospective epidemiologic studies, Mendelian randomization studies, and randomized intervention trials all demonstrate a remarkably consistent dose-dependent log-linear association between the absolute magnitude of exposure to LDL-C and the risk of ASCVD, and together demonstrate that the effect increases with increasing duration of exposure.</cite> **[A]** (Ference et al., *Eur Heart J* 2017 — E17)

**The wellness reading of this evidence — [B]:** because the relationship is *cumulative
over time*, small sustained improvements in ApoB-particle burden, maintained over years,
are the meaningful lever. BioSense frames ApoB not as a verdict but as a trackable,
improvable long-term wellness signal.

**An honest boundary — [E]:** "causal at the population level" is not a prediction about
any single individual. A given ApoB value does not determine that a specific person will or
will not develop disease. BioSense never converts population evidence into individual
prophecy.

---

# 4. Why ApoB Matters

For a wellness platform, ApoB matters for three practical reasons, each evidence-backed:

**1. It sees what cholesterol tests can miss. [A]** Standard LDL cholesterol can read
"normal" while the underlying particle count is high — a mismatch called *discordance*. When
the two disagree, long-term risk tracks the ApoB. <cite index="78-1">High variability of apoB at individual levels of LDL-C, non-HDL-C, and triglycerides coupled with meaningful differences in 10-year ASCVD rates demonstrate that LDL-C, non-HDL-C, and triglycerides are not adequate proxies for apoB.</cite> (E18)

**2. It is a single, clean number. [A]** One measurement integrates all atherogenic
particles. It does not require fasting, which makes it convenient for repeat tracking.
<cite index="51-1">An additional advantage to measuring Apo B as opposed to the standard lipid profile is that a fasting specimen is not required.</cite> (E11)

**3. It is responsive to lifestyle. [A][B]** Diet, body composition, and activity all move
ApoB, which makes it an actionable target for a wellness-optimisation programme rather than
a fixed trait.

**Why BioSense measures it — [C]:** BioSense is built around long-term, modifiable wellness
signals. ApoB is the single most complete lipid-particle wellness marker available in a
routine blood test, and its responsiveness to lifestyle aligns with BioSense's optimisation
philosophy.

---

# 5. Laboratory Measurement

ApoB is measured directly in blood using automated immunoassays — either
**immunoturbidimetric** or **immunonephelometric** methods. **[A]** <cite index="51-1">Currently available methods for apo B measurement include automated immunoassays. Reference material is available that has allowed for the standardization of Apo B measurements. The bias and imprecision for 22 immunonephelometric and immunoturbidimetric assays were usually below 5%.</cite> (E9)

Key measurement facts relevant to BioSense **[A]**:

- **Directly measured**, not calculated — unlike LDL cholesterol, which is often estimated by a formula. This means ApoB carries no calculation error.
- **Standardised internationally.** <cite index="50-1">In 1994, the International Federation of Clinical Chemistry and the World Health Organization (WHO/IFCC) endorsed the standardization of the measurement of apoB.</cite> (E10) Standardisation means results are broadly comparable between laboratories — though not perfectly identical.
- **Fasting not required** — a practical advantage for repeat tracking. (E11)
- **Measures total ApoB**, which in a fasting or typical sample is overwhelmingly ApoB-100 (the liver form). Standard assays do not separate the two isoforms. **[A]**

---

# 6. Units

- **Canonical BioSense unit: mg/dL** (milligrams per decilitre) — the unit used by most
  clinical guidelines cited in this pack. **[A/C]**
- **Also commonly reported: g/L** (grams per litre), especially outside North America. **[A]**
- Some laboratories report **mg/L**. **[A]**

BioSense stores the originally reported value and unit unchanged, and additionally stores a
canonical mg/dL value for interpretation. **[C]**

---

# 7. Unit Conversion

Verified conversions **[A][E13]**:

```
1 g/L  = 100 mg/dL      →  mg/dL = g_per_L × 100
1 mg/L = 0.1 mg/dL      →  mg/dL = mg_per_L ÷ 10
mg/dL                   →  identity
```

Worked check: a lab reporting **0.95 g/L** → **95 mg/dL**; **1.2 g/L** → **120 mg/dL**
(a value commonly cited as a typical laboratory upper-reference figure — E14). **[A]**

**Safety rule [D]:** BioSense never infers a unit from the magnitude of a number alone. A
value of "0.95" is a plausible g/L result and an implausible mg/dL result; if the unit is
missing, the value is displayed but not interpreted.

---

# 8. Measurement Limitations

- **Between-method variation. [A][E]** Standardisation reduces but does not eliminate
  differences between laboratories and platforms. Values are broadly comparable, not
  identical — so BioSense treats a lab or method change as a reason to interpret a trend
  cautiously.
- **Very high triglycerides. [A][E10]** <cite index="50-1">High triglycerides >200 mg/dL, diabetes, and other disorders associated with abnormal lipid profiles cause unacceptable between-method variability and bias with most direct assays, particularly at low concentrations.</cite> This is a confidence reducer.
- **Biological variation. [A]** Any single measurement is one sample from a person's natural
  range; small differences between two tests may be noise rather than true change.
- **Isoform non-separation. [A]** Standard assays report total ApoB, not ApoB-100 vs
  ApoB-48 separately. For fasting/typical samples this is overwhelmingly ApoB-100 and does
  not affect wellness interpretation.
- **Acute states. [A]** Illness, inflammation, recent surgery, or pregnancy can transiently
  shift lipid levels; a value drawn during these states may not reflect the stable baseline.

---

# 9. Relationships With Other Biomarkers

- **LDL cholesterol (LDL-C). [A]** ApoB counts particles; LDL-C weighs their cholesterol
  cargo. They usually agree but can diverge (*discordance*), and when they do, ApoB is the
  more complete wellness signal. (E18) BioSense treats ApoB as the primary particle marker
  and LDL-C as complementary context — never averaging or blending the two.
- **Non-HDL cholesterol. [A]** A close companion to ApoB; both capture atherogenic burden
  better than LDL-C alone. Useful supporting context when ApoB is present.
- **Triglycerides. [A]** High triglycerides raise the likelihood of ApoB/LDL-C discordance
  (more, smaller, cholesterol-poor particles) and are also a measurement caveat. Their
  presence *raises the value* of having an ApoB measurement.
- **HDL cholesterol. [A]** Not atherogenic; provides context on the overall lipid picture.
- **Lipoprotein(a). [A]** An ApoB-containing particle carrying independent genetic risk;
  a specialised marker BioSense treats separately.

**Engine implication [C]:** where ApoB and LDL-C are both present, BioSense computes a
concordance view for context and uses ApoB as the primary particle-wellness signal. Where
ApoB is absent but triglycerides are high or LDL-C is present, BioSense may suggest that an
ApoB measurement would add value — never imputing an ApoB number.

---

# 10. Evidence Review

This section compares the major sources of ApoB guidance, their agreements and
disagreements, the strength of evidence, and the populations each addresses. **All numbers
here are Category [A] — recognised guideline/consensus values, reproduced and attributed.**

## 10.1 Where the authorities agree
- **ApoB is causal and clinically useful.** The EAS/ESC, the National Lipid Association
  (NLA), and the Canadian Cardiovascular Society (CCS) all endorse ApoB as a valid — often
  superior — measure of atherogenic burden. (E17, E5, E8) <cite index="35-1">ApoB has been shown to be superior to LDL-C in risk assessment both before and during treatment with lipid-lowering therapy.</cite>
- **Lower particle burden is better, across the studied range.** No authority describes a
  threshold below which lowering ApoB becomes harmful in the general population. (E17)
- **ApoB is especially informative when LDL-C may mislead** — high triglycerides, diabetes,
  obesity, metabolic syndrome, or very low LDL-C. (E5) <cite index="16-1">ApoB, if available, can be used as an alternative to LDL-C as the primary measurement and may be preferred over non-HDL-C in people with high TG, diabetes, obesity, or very low LDL-C.</cite>

## 10.2 Where they differ — and why
The disagreement is **not about the science of ApoB** but about **how to set targets and
for whom**. Three distinct approaches exist:

**a) Risk-stratified treatment goals (ESC/EAS 2019). [A][E1-E3]** The European guidelines
set ApoB *secondary goals* by cardiovascular risk category:
<cite index="18-1">The 2019 ESC/EAS guideline establishes secondary apoB goals of <65, <80, and <100 mg/dL for very-high–risk, high-risk, and moderate-risk patients, respectively, which corresponded to LDL-C targets of <55, <70, and <100 mg/dL.</cite>
These are *treatment goals for risk-stratified patients*, not universal thresholds for a
general adult.

**b) Population-percentile framing (NLA 2024). [A][E4-E5]** The National Lipid Association
frames ApoB against the untreated general-population distribution: an ApoB around
**130 mg/dL sits at roughly the 90th percentile** and is a risk-enhancing level warranting a
clinician discussion, while it reiterated targets of **<80 mg/dL (high risk)** and
**<90 mg/dL (primary prevention)**. (E4, E5) This percentile framing is the most relevant
to a general-adult wellness audience because it describes untreated people, not patients.

**c) Percentile-derived treatment triggers (CCS 2021). [A][E8]** The Canadian guideline
derived ApoB triggers from population percentiles — e.g. considering therapy at ApoB
**≥105 mg/dL** in intermediate-risk or lower-risk individuals with other risk factors, and
**≥145 mg/dL** in low-risk individuals. (E8)

**Why they differ:** ESC/EAS answers "how low should a *patient at known risk* go?"; NLA and
CCS answer "where does an *untreated person* sit relative to the population, and when should
that prompt a conversation?" These are different questions with different intended
populations — they should not be collapsed into one number. **[A][E]**

## 10.3 Strength of evidence
- **Causality of ApoB-containing particles: strong / established.** Triangulated across
  study designs. (E17)
- **ApoB superior to LDL-C in discordance: strong / established.** (E18)
- **Specific numeric targets: moderate and context-dependent.** Targets are risk-stratified
  and differ by guideline; there is no single universal ApoB number. **[E]**
- **Optimal level for a healthy general adult: reasoned, not formally defined.** No guideline
  sets a "wellness optimal" for healthy adults; this is where BioSense must synthesise. **[E]**

## 10.4 Intended populations (critical for a wellness platform)
Every guideline number above was created for a **clinical** population — patients being
risk-stratified or treated. A general-adult wellness platform serves mostly **untreated
people without known disease**, for whom the **population-percentile framing (NLA)** is the
most appropriate anchor, supplemented by the ESC/EAS goals as *context* for users who
declare a known higher-risk condition. This directly shapes the BioSense V1 bands in §11.

---

# 11. Threshold Structure — BioSense Version 1 Wellness Interpretation Bands

> **[B] These are BioSense Version 1 Wellness Interpretations — a transparent interpretation
> of the Category [A] evidence in §10 for a general-adult wellness audience. They are NOT
> diagnostic boundaries, NOT medical cut-offs, and NOT universal truth. They exist to help a
> healthy adult understand and optimise a modifiable wellness signal.**

## 11.1 The interpretation bands (canonical mg/dL; general adult, untreated, primary-prevention default)

Each row states a **BioSense Wellness Interpretation** and the associated ApoB range that
BioSense interprets it from. The ranges are unchanged from the evidence anchors; the labels
are BioSense's interpretation, not medical categories.

| BioSense Wellness Interpretation | Associated ApoB range (mg/dL) | Evidence anchor | Wellness meaning |
|---|---|---|---|
| **Optimal** | < 65 | ESC/EAS very-high-risk goal <65 [E1]; ≈5–9th population %ile [E7] | Particle burden in the range associated with the lowest long-term risk in the evidence base. |
| **Near Optimal** | 65 – 79 | ESC/EAS high-risk goal region <80 [E2] | Very favourable; a small, achievable step from optimal. |
| **Above Target** | 80 – 89 | Approaching NLA primary-prevention ceiling <90 [E4] | Good, with clear room to optimise toward optimal. |
| **Elevated** | 90 – 129 | ≥90 above NLA desirable [E4]; rising toward ~90th %ile [E5] | Above the wellness-desirable range; a meaningful optimisation opportunity. |
| **Significantly Elevated** | ≥ 130 | ≈90th population %ile / NLA risk-enhancing level [E5] | Notably above the population's typical range; wellness healthcare-review wording applies [D]. |

## 11.2 How the bands were derived — transparency [B]
- **Optimal <65** anchors to the strongest low-risk reference in the evidence base: the
  ESC/EAS very-high-risk *goal* (E1) and the ~5–9th population percentile (E7). BioSense uses
  it as the "best-in-population" wellness aspiration, not as a treatment target.
- **The 80 and 90 boundaries** anchor to the ESC/EAS high-risk goal (E2) and the NLA
  primary-prevention figure of <90 (E4) — the most population-appropriate desirable ceiling.
- **130** anchors to the NLA percentile framing where ~130 mg/dL ≈ 90th percentile and is
  explicitly a risk-enhancing level warranting discussion (E5).
- **No number was averaged across guidelines.** Each boundary maps to a specific, cited
  anchor, chosen for a general-adult untreated population.

## 11.3 Population caveat [E]
These bands assume a **general adult, not on lipid-lowering therapy, without a declared
higher-risk condition or pregnancy**. They are **not validated for children/adolescents,
pregnancy, or people on therapy**, for whom BioSense abstains from banding and defers to a
healthcare professional (see §15, §20).

## 11.4 Higher-risk context display — [C] Decision D-2
If a user **declares** an established higher-risk condition (known cardiovascular disease,
diabetes, or a diagnosed inherited lipid condition), the engine **may additionally display
the recognised guideline goal** for context — e.g. **ApoB <65 mg/dL (very-high risk)** or
**<80 mg/dL (high risk)**, ESC/EAS 2019 (E1, E2) — clearly labelled as a **guideline goal
(Category A)** with caveat CAV4. The BioSense Wellness Interpretation is still shown; the
guideline goal is context, never an instruction, and is never recomputed as a BioSense
interpretation. **[C][D]**

## 11.5 Never inferred [D]
Risk context is **only** taken from explicit user-declared information. BioSense **never**
infers a risk category from the ApoB value itself (that would be circular), from age alone,
or from any single input.

## 11.6 The low end — no wellness penalty [B][D]
ApoB banding is **monotonic (lower is better)** with **no low-end wellness penalty**. A low
ApoB is never scored as adverse and never reduces a wellness score. (E7 shows no harm
threshold in the general population across the studied range.) Handling of *markedly* low
values is a neutral, non-alarming information pathway — see §15.4 and §20. **[D]**

---

# 12. Interpretation Framework

BioSense interprets ApoB in a fixed, deterministic order (consistent with the ENG Blood
Analysis Engine's four-state model). **[C]**

```
1. VALIDITY   — is the measurement trustworthy? (unit known, sample not
                interference-flagged, result final)  → if not, display, do not interpret.
2. ELIGIBILITY— may we band this person? (general adult, not pregnant, thresholds apply)
                → if not, abstain from banding, offer appropriate wording (§15).
3. CONFIDENCE — how confident is interpretation? (apply §13 reducers) → HIGH / REDUCED.
4. BAND       — assign BioSense wellness band (§11).
5. CONTEXT    — add discordance view (§9), declared risk-context goal (§11.4).
6. NARRATIVE  — select wellness narrative (§24) + mandatory caveats (§0.8).
```

**Core interpretive stance [B]:** ApoB is presented as a **modifiable wellness signal to
optimise and track over time**, never as a verdict. The narrative always pairs the current
band with a constructive, evidence-based next step and, where relevant, a calm suggestion to
involve a healthcare professional.

---

# 13. Confidence Assessment

Confidence is **computed, not guessed**, starting at HIGH and reduced to REDUCED if any
reducer is present. Each reducer is named to the user when it applies (CAV3). **[A]/[D]**

| Reducer | Why it lowers confidence | Source |
|---|---|---|
| Non-fasting sample | Minor for ApoB, but still a reducer | [E11] |
| Stale / old sample | May not reflect current state | policy |
| Missing supporting lipids (no LDL-C/non-HDL-C) | No concordance context | [E18] |
| ApoB/LDL-C discordance present | Signal needs careful framing | [E18] |
| Non-standardised / high-imprecision lab | Between-method variability | [E9,E10] |
| High triglycerides (>200 mg/dL) | Assay variability + discordance likelihood | [E10] |
| Active illness / inflammation | Transient lipid perturbation | [A] |
| Recent major diet change | Transient shift | [A] |
| On lipid-lowering therapy | Reflects treated state, not baseline | [A] |
| Pregnancy | Physiological lipid shift | [A] |
| Unknown risk context | Default assumed, must be tagged | [C] |

**Confidence never implies eligibility.** A value can be measured with high confidence and
still be one BioSense declines to band (e.g. a valid result in a pregnant user). **[D]**

---

# 14. Wellness Interpretation

Interpretation-by-interpretation wellness guidance, general adult. Each states a **BioSense
Wellness Interpretation** and the ApoB range it is interpreted from. All wording is
**wellness, not medical**. **[B]/[D]**

- **BioSense Wellness Interpretation: Optimal** *(ApoB < 65).* "Your ApoB is in the optimal
  wellness range — the particle burden associated with the most favourable long-term
  cardiovascular wellness in the research. This is a great result to maintain."
  Maintain-focused. **[B]**
- **BioSense Wellness Interpretation: Near Optimal** *(ApoB 65–79).* "Your ApoB is in a very
  favourable range, just a small step from optimal. Simple lifestyle habits can help you
  maintain or gently improve it." **[B]**
- **BioSense Wellness Interpretation: Above Target** *(ApoB 80–89).* "Your ApoB is good, with
  clear room to optimise. This is a responsive marker — lifestyle changes can move it."
  Constructive. **[B]**
- **BioSense Wellness Interpretation: Elevated** *(ApoB 90–129).* "Your ApoB is above the
  wellness-desirable range. This is a meaningful and modifiable opportunity: nutrition,
  activity, and body-composition changes all influence ApoB. Tracking it over time will show
  your progress." Optimisation-focused, encouraging. **[B]**
- **BioSense Wellness Interpretation: Significantly Elevated** *(ApoB ≥ 130).* "Your ApoB is
  notably above the typical population range. Alongside lifestyle steps, it may be worth
  discussing this result with a healthcare professional." Calm, non-alarming,
  healthcare-review wording (CAV5). **[B][D]**

Every band's narrative pairs the reading with (a) an evidence-based lifestyle lever (§17)
and (b) the mandatory wellness caveats (§0.8).

---

# 15. Special Populations & Abstention

BioSense **abstains from banding** where its general-adult bands do not apply, and says so
plainly rather than forcing an inappropriate interpretation. **[C]/[D]/[E]**

- **15.1 Children & adolescents.** General-adult bands are not validated in under-18s.
  BioSense does not band; it displays the value and suggests any interpretation be done with
  a healthcare professional. **[D][E]**
- **15.2 Pregnancy.** Lipids shift physiologically in pregnancy. BioSense does not band a
  pregnant user's ApoB and notes that pregnancy affects lipid levels; defer to a healthcare
  professional. **[D][E]**
- **15.3 On lipid-lowering therapy.** A value on therapy reflects the treated state. BioSense
  may display and track it but frames it as "reflecting your current management" and never
  implies anything about stopping or changing treatment (S6). **[D]**
- **15.4 Markedly low ApoB (untreated).** Never a wellness concern and never penalised (§11.6).
  If markedly low in an untreated person, BioSense offers neutral wording — "this is unusually
  low; from a cardiovascular-wellness view that's favourable, and it may simply be worth
  mentioning to a doctor at some point" — **without naming any cause** (S5). **[D]**
- **15.5 Higher-risk declared context.** Band still shown; guideline goal added as context
  (§11.4). **[C]**

**Abstention is a first-class, non-error output.** It is always explained, never silent. **[D]**

---

# 16. Trend & Longitudinal Behaviour

ApoB is well suited to tracking (no fasting needed), and because the underlying biology is
*cumulative*, trends matter more than any single reading. **[A][B]**

- **What counts as a real change. [A][E]** Small differences can be biological noise or
  between-lab variation. BioSense only frames a change as meaningful when it exceeds normal
  variation and is not explained by a lab/method change. (E10; ENG trend engine.)
- **Lab/method changes. [A]** A change between measurements taken at different labs or by
  different methods is flagged as possibly method-related, not treated as a true change.
- **Acute states. [A]** A value taken during illness/inflammation/pregnancy is tagged and
  excluded from trend-significance so it never produces a false "you changed" signal.
- **Direction & framing. [B]** Downward = improving (encouraged, celebrated in wellness
  terms); upward = an optimisation prompt, never alarm. A within-range improvement is still
  a real improvement and is acknowledged.
- **Cumulative wellness framing. [B]** A sustained downward ApoB trajectory is described as
  reducing accumulated particle exposure over time — the core long-term wellness win — never
  as a change in medical risk score.

---

# 17. Lifestyle Optimisation Guidance

Lifestyle is **always the first tier** of BioSense recommendations, and the levers below are
evidence-backed for lowering ApoB / atherogenic-particle burden. Effect sizes are given
honestly. **[A]/[B]**

## 17.1 Nutrition
- **Soluble (viscous) fibre. [A][E19-E20]** The best-evidenced dietary lever. A large RCT
  meta-analysis found soluble-fibre supplementation significantly lowered ApoB. <cite index="66-1">There was a significant reduction in LDL cholesterol (MD −8.28 mg/dL) and apolipoprotein B (Apo-B) (MD −44.99 mg/L) after soluble fiber supplementation.</cite> (≈4.5 mg/dL ApoB; ≈8 mg/dL LDL-C — meaningful, dose-responsive.) Sources: oats, barley, psyllium, legumes, pectin-rich fruit.
- **Reduce saturated fat; favour unsaturated fats. [A][E21]** Reducing saturated fat lowers
  LDL-C and ApoB-particle burden; replacing it with unsaturated fat is associated with lower
  cardiovascular risk. <cite index="69-1">Dietary recommendations to reduce saturated fatty acids intake result in a significant clinically meaningful lowering of LDL-C; a meta-analysis reported a 19% risk reduction in coronary heart disease per replacement with polyunsaturated fats.</cite>
- **Emphasise plant proteins, viscous fibres, unsaturated fats** as a dietary pattern. **[A]**

## 17.2 Physical activity [A][B]
Regular aerobic activity and reduced sedentary time support healthier lipid-particle
profiles and body composition, which in turn lowers ApoB. Framed as a sustainable habit, not
a prescription.

## 17.3 Weight / body composition [A][E22]
Where relevant, modest fat-loss improves atherogenic-particle burden. Soluble-fibre intake
also modestly supports weight management. <cite index="70-1">Participants with dietary fibre supplementation showed a significantly higher reduction in body weight (MD −1.25 kg) accompanied by a significant decrease in BMI and waist circumference.</cite>

## 17.4 Sleep, alcohol, smoking [A][B]
Adequate sleep, alcohol moderation, and not smoking each support cardiovascular wellness and
a healthier lipid-particle profile. Standard wellness guidance.

## 17.5 Framing rules [B][D]
- Lifestyle first, always; medication is never suggested.
- Effect sizes are honest: lifestyle produces **meaningful but modest** ApoB reductions;
  BioSense never implies lifestyle alone will match pharmacological effects, and where a
  reading is Significantly Elevated it pairs lifestyle guidance with a healthcare-review
  suggestion. **[D]**

---

# 18. AI Reasoning Constraints

The AI narrative layer **renders** BioSense's deterministic decisions; it does not make
clinical judgements. (Consistent with the ENG platform's PI-4.) **[D]**

The AI layer **may**: explain the band and what ApoB is, in warm, clear, wellness language;
connect the reading to evidence-based lifestyle levers; acknowledge progress; express
abstention respectfully.

The AI layer **must never**:
- state or imply a diagnosis or disease (S1)
- name any medical condition, including familial hypercholesterolaemia — even to deny it (S3)
- produce a numeric cardiovascular risk figure from ApoB (S7)
- recommend starting, stopping, or changing any medication (S6)
- present a BioSense band as a medical/diagnostic boundary (S10)
- soften or bypass a required healthcare-review suggestion to avoid a difficult message
- reinterpret a value the engine marked validity-suspect or abstained (S9)
- infer risk context from the ApoB value

Enforcement is by output validation on the rendered text, not by prompt alone. **[D]**

---

# 19. Safety Considerations

BioSense is a wellness platform, not a medical device; safety wording is deterministic and
always present. **[D]**

- **Not a diagnosis.** Every ApoB output carries CAV1 ("wellness information, not a medical
  diagnosis"). **[D]**
- **One factor among many.** CAV2 frames ApoB as one input to cardiovascular wellness, never
  the whole picture. **[D][E17]**
- **No medication guidance.** BioSense never advises on drugs; medication questions receive
  educational context plus a referral (S6, S8). **[D]**
- **No alarm.** Even the highest band uses calm, constructive, non-catastrophising language
  with a healthcare-review suggestion (S4, CAV5). **[D]**
- **No condition-naming.** BioSense never labels a user with FH or any condition (S3). **[D]**
- **Low values not pathologised.** Markedly low ApoB gets neutral, non-alarming wording
  (S5). **[D]**

---

# 20. Healthcare Provider Review Triggers

BioSense suggests (never mandates) a **calm wellness conversation with a healthcare
professional** when: **[D]**

1. ApoB is **Significantly Elevated (≥130 mg/dL)** — CAV5. (E5)
2. ApoB and LDL-C are **markedly discordant**, so the picture benefits from professional
   interpretation. (E18)
3. ApoB is **markedly low in an untreated person** — neutral "worth mentioning" wording,
   no cause named (S5).
4. The user is in an **abstention population** (child/adolescent, pregnancy) where
   interpretation belongs with a professional. (§15)
5. The user **declares a higher-risk condition** and would benefit from personalised targets
   (CAV4).
6. The user **asks a medical or medication question** (S8).

All such suggestions are **wellness-framed, non-urgent, non-diagnostic**, and never imply an
emergency. BioSense provides no emergency instructions. **[D]**

---

# 21. BioSense Product Integration

How SCL-001 plugs into the existing platform (no architecture change): **[C]**

- **Consumes:** the ENG Blood Analysis Engine's `CanonicalObservation` for ApoB.
- **Supplies (as CSL bindings):** the wellness interpretation bands (Category B), the guideline goals
  (Category A), confidence reducers, safety rules, lifestyle evidence, and narrative
  templates — each carrying value + source-ID + category + version.
- **Activates:** ApoB banding, wellness narrative, trend framing, discordance context, and
  recommendation ladder — all previously "declared, awaiting scientific population."
- **Respects:** every ENG platform invariant (deterministic-before-AI, validity-before-
  confidence, unknown≠none, abstention-is-not-error, PI-4 rendering).
- **Score contribution:** ApoB contributes to the cardiovascular-wellness domain as a
  monotonic (lower-better) input; low values never penalised. Any BioSense wellness-score
  weighting is a Category [C] product decision layered on this pack.

---

# 22. Versioning & Provenance

- **This pack:** SCL-001 v1.0. **[C]**
- **Every value carries:** its numeric value, its source (E-series → §27), its category
  (A/B/C/D/E), and this version. **[C]**
- **Category A** values are updated only when the underlying guideline/consensus updates
  (e.g. a future ESC/EAS revision) — with a version bump and re-review. **[C]**
- **Category B** bands are BioSense-owned and may be refined in a future version with
  documented rationale; changes are versioned and never silent. **[C]**
- **Reproducibility:** any ApoB output is reconstructable from the observation + this pack's
  version. **[C]**
- **Known update horizon [E]:** a 2025 ESC/EAS focused update exists; it **maintained** the
  2019 LDL-C/ApoB goal structure (E1 context), so v1.0 bands remain current. Future SCL-001
  revisions should re-verify against the latest guideline text.

---

# 23. Open Questions & Areas of Uncertainty [E]

Flagged honestly, not hidden:

1. **No formal "wellness optimal" exists in guidelines. [E]** The Optimal <65 band is a
   BioSense synthesis (E1/E7), reasonable but not a guideline-defined healthy-adult target.
2. **Target numbers are context-dependent. [E]** ApoB targets are risk-stratified; a single
   universal number does not exist. BioSense's default-population choice (§11) is a product
   decision, not a scientific certainty.
3. **Population percentiles are US-derived (NHANES). [E]** ApoB distributions vary by country
   (E-sources note international variation); V1 uses the best available (NLA/NHANES) anchor.
4. **Lifestyle effect sizes are averages. [E]** Individual response to fibre/diet varies; the
   cited magnitudes (E19-E22) are population means with confidence intervals.
5. **FH detection without diagnosis. [E]** ApoB has no formal FH cut-point; BioSense's
   pattern-referral approach (S3) is deliberately conservative and may under- or over-prompt
   until the founder threshold decision (see §28) is set.

---

# 24. Narrative Generation Templates

Deterministic templates the AI layer renders (warm wellness tone; caveats always appended).
**[B]/[D]** (Illustrative wording; exact copy owned by BioSense content.)

```
TEMPLATE: OPTIMAL
"Your ApoB is {value} mg/dL — in the optimal wellness range. This reflects a
 low atherogenic-particle burden, associated with the most favourable long-term
 cardiovascular wellness in the research. Wonderful result to maintain with your
 current habits."  +CAV1 +CAV2

TEMPLATE: NEAR_OPTIMAL
"Your ApoB is {value} mg/dL — a very favourable range, just a small step from
 optimal. Steady habits like soluble fibre and regular activity help keep it here."
 +CAV1 +CAV2

TEMPLATE: ABOVE_TARGET
"Your ApoB is {value} mg/dL — good, with clear room to optimise. ApoB responds
 well to lifestyle: soluble fibre, less saturated fat, and regular movement all help."
 +CAV1 +CAV2

TEMPLATE: ELEVATED
"Your ApoB is {value} mg/dL — above the wellness-desirable range, and a meaningful,
 modifiable opportunity. Nutrition, activity and body-composition changes all
 influence ApoB; tracking it over time will show your progress."  +CAV1 +CAV2

TEMPLATE: SIGNIFICANTLY_ELEVATED
"Your ApoB is {value} mg/dL — notably above the typical population range. Lifestyle
 steps still help, and it may be worth discussing this result with a healthcare
 professional to look at your full picture."  +CAV1 +CAV2 +CAV5

MODIFIER: LOW_CONFIDENCE  → append CAV3 naming reducer(s), e.g.
 "This reading was taken {non-fasting / during illness / …}, so treat it as a guide
  and consider re-checking under steady conditions."

MODIFIER: DISCORDANCE_CONTEXT → 
 "Your ApoB and LDL cholesterol don't fully agree here; ApoB gives the more complete
  particle picture, which is why we lead with it."

MODIFIER: HIGHER_RISK_DECLARED → append guideline goal + CAV4.

MODIFIER: ABSTENTION (child / pregnancy) →
 "Because {age / pregnancy} affects how ApoB should be interpreted, we're not scoring
  this one — it's best looked at with a healthcare professional."  +CAV1
```

---

# 25. Example Outputs

**Example 1 — Optimal, high confidence, fasted, primary prevention. [illustrative]**
```
Input: ApoB 58 mg/dL, fasted, adult, no declared risk context, LDL-C present concordant.
Band: OPTIMAL | Confidence: HIGH | Abstained: false
Narrative: OPTIMAL template +CAV1+CAV2
Recommendation: Tier 1 maintain (fibre, activity); Tier 2 re-check in 12 months.
```

**Example 2 — Elevated, reduced confidence (non-fasting + high TG). [illustrative]**
```
Input: ApoB 112 mg/dL, non-fasting, TG 260 mg/dL, adult.
Band: ELEVATED | Confidence: REDUCED (non_fasting, high_TG) | Abstained: false
Narrative: ELEVATED template +CAV1+CAV2 +CAV3("non-fasting, high triglycerides")
Recommendation: Tier 1 lifestyle (soluble fibre, reduce saturated fat); Tier 2 re-check fasted.
```

**Example 3 — Significantly elevated. [illustrative]**
```
Input: ApoB 141 mg/dL, fasted, adult, no declared risk context.
Band: SIGNIFICANTLY_ELEVATED | Confidence: HIGH | Abstained: false
Narrative: SIGNIFICANTLY_ELEVATED template +CAV1+CAV2+CAV5
Recommendation: Tier 1 lifestyle; Tier 3 calm healthcare-review suggestion.
NOTE: No condition named. No risk %. No medication mention.  [S1,S3,S6,S7]
```

**Example 4 — Pregnancy → abstention. [illustrative]**
```
Input: ApoB 96 mg/dL, user declares pregnancy.
Band: (none) | Abstained: true (reason: pregnancy) | value displayed
Narrative: ABSTENTION modifier +CAV1
```

**Example 5 — Markedly low, untreated. [illustrative]**
```
Input: ApoB 28 mg/dL, untreated adult.
Band: OPTIMAL (no low-end penalty) | low_value_note: true
Narrative: "Your ApoB is unusually low. From a cardiovascular-wellness view that's
 favourable, and there's no wellness concern here. It may simply be worth mentioning
 to a doctor at some point."  +CAV1   (no cause named — S5)
```

---

# 26. Cross-References

- **ENG Blood Analysis Engine / Consolidated Spec** — the deterministic platform this pack
  configures (four-state model, trend gauntlet, PI-4 rendering, governance/CSL bindings).
- **BioSense Constitution (Vol 1A–1C)** — wellness-not-medical positioning, safety posture.
- **SCL architecture** — this pack is the first populated biomarker in the Canonical
  Scientific Library; it is the reference template for Ferritin, Vitamin D, HbA1c, LDL-C,
  ApoA1, CRP and future packs.
- **§0 Implementation Summary** — the developer-facing activation values.
- **§27 References** — the evidence base for every Category [A] value.

---

# 27. References & Bibliography

> All references below were retrieved and verified during authoring. Numeric values in this
> pack trace to these via the E-series IDs in the §0 evidence anchors and throughout the body.
> Where a specific page/figure is cited it reflects the verified snippet; developers finalising
> the pack should confirm exact page numbers against the primary PDF where required.

**Guidelines & consensus statements (Category A anchors)**

1. Mach F, Baigent C, Catapano AL, et al. **2019 ESC/EAS Guidelines for the management of
   dyslipidaemias: lipid modification to reduce cardiovascular risk.** *European Heart Journal*
   2020;41(1):111–188. doi:10.1093/eurheartj/ehz455. — *ApoB secondary goals <65/<80/<100
   mg/dL for very-high/high/moderate risk (E1–E3).*
2. Soffer DE, Marston NA, Maki KC, Jacobson TA, Bittner VA, Peña JM, et al. **Role of
   apolipoprotein B in the clinical management of cardiovascular risk in adults: An Expert
   Clinical Consensus from the National Lipid Association.** *Journal of Clinical Lipidology*
   2024;18(5):e645–e661. doi:10.1016/j.jacl.2024.08.013. — *Population percentiles (NHANES
   2005–2016, n=12,696); ~130 mg/dL ≈ 90th percentile / risk-enhancing; primary-prevention
   <90 (E4–E5, E18).*
3. Pearson GJ, Thanassoulis G, Anderson TJ, et al. **2021 Canadian Cardiovascular Society
   Guidelines for the Management of Dyslipidemia.** *Canadian Journal of Cardiology* 2021;
   37(8):1129–1150. (Percentile-derived ApoB triggers ≥105 / ≥145 mg/dL, via E8 review.)
4. Wilson PWF, Jacobson TA, Martin SS, et al. **Lipid measurements in the management of
   cardiovascular diseases: NLA scientific statement.** *Journal of Clinical Lipidology* 2021.
   (NLA ApoB guidance context, E4.)

**Causality, discordance & prognosis (Category A)**

5. Ference BA, Ginsberg HN, Graham I, et al. **Low-density lipoproteins cause atherosclerotic
   cardiovascular disease. 1. Evidence from genetic, epidemiologic, and clinical studies. A
   consensus statement from the European Atherosclerosis Society Consensus Panel.** *European
   Heart Journal* 2017;38(32):2459–2472. doi:10.1093/eurheartj/ehx144. — *Causality,
   triangulated evidence (E17).*
6. Sniderman AD, Thanassoulis G, Glavinovic T, et al. **Apolipoprotein B particles and
   cardiovascular disease: a narrative review.** *JAMA Cardiology* 2019;4(12):1287–1295. (E17.)
7. Marston NA, et al. **Discordance among apoB, non-HDL-C, and triglycerides: implications for
   cardiovascular prevention.** *European Heart Journal* 2024;45(27):2410. doi:10.1093/
   eurheartj/ehae280. — *Discordance; risk follows apoB (E18).*
8. Behbodikhah J, et al. **Apolipoprotein B: Bridging the Gap Between Evidence and Clinical
   Practice.** *Circulation* 2024. doi:10.1161/CIRCULATIONAHA.124.068885. — *Population
   percentile equivalences (E7); CCS percentile method (E8).*

**Measurement, standardisation & biology (Category A)**

9. Marcovina SM, Albers JJ. **Apolipoprotein / lipoprotein standardization; IFCC reference
   materials.** *(IFCC / eJIFCC; PMC6222398.)* — *WHO/IFCC standardisation, secondary reference
   materials (E10).*
10. Cobbaert CM, Langlois MR, et al. **Standardization of Apolipoprotein B, LDL-Cholesterol,
    and Non-HDL-Cholesterol.** *Journal of the American Heart Association* 2023;12(15):e030405.
    doi:10.1161/JAHA.123.030405. — *WHO/IFCC 1994 standardisation; assay caveats at high TG
    (E10).*
11. Feingold KR, et al. **Biochemistry, Apolipoprotein B.** *StatPearls* (NCBI Bookshelf
    NBK538139). — *Immunoassay methods; bias/imprecision usually <5%; fasting not required;
    ApoB-100 vs ApoB-48 biology (E9, E11, E12).*

**Population reference data (Category A/P)**

12. Bachorik PS, et al. **Apolipoprotein B and AI distributions in the United States (NHANES
    III).** *(Population percentile context, E6, E14.)*
13. Contois JH, et al. **Apolipoprotein B reference intervals (Framingham Offspring).** *(Lab
    reference-interval basis ~120 mg/dL upper; via E14.)*

**Lifestyle evidence (Category A/M)**

14. Ghavami A, et al. **Soluble Fiber Supplementation and Serum Lipid Profile: A Systematic
    Review and Dose-Response Meta-Analysis of Randomized Controlled Trials.** *Advances in
    Nutrition* 2023;14(3):465–474. doi:10.1016/j.advnut.2023.01.005 (PMID 36796439). — *181
    RCTs, n=14,505; ApoB MD −44.99 mg/L, LDL-C MD −8.28 mg/dL (E19, E20).*
15. Brown L, Rosner B, Willett WW, Sacks FM. **Cholesterol-lowering effects of dietary fiber:
    a meta-analysis.** *American Journal of Clinical Nutrition* 1999;69(1):30–42. (E20 context.)
16. **GET-READI feeding trial / DELTA trials** — saturated-fat reduction lowers LDL-C;
    PUFA-replacement CHD benefit. *Journal of Lipid Research* 2023 (PMC10445453). (E21.)
17. **Isolated soluble dietary fibre supplementation and body weight: systematic review &
    meta-analysis of RCTs.** (PMC9268533.) — *Weight −1.25 kg (E22).*

**Familial hypercholesterolaemia context (Category A — LDL-C/clinical defined)**

18. **Simon Broome Register diagnostic criteria for heterozygous FH.** (Adult LDL-C >190 mg/dL
    / 4.9 mmol/L; child >155 mg/dL; plus clinical/genetic criteria.) — *Basis for S3: FH has
    no ApoB cut-point (E15).*
19. **Population genomic screening / FH epidemiology.** *(Prevalence ~1 in 250; ASCVD risk
    3–10×; medRxiv 2025; PMC6361766.)* (E16.)

> **Category B (BioSense Wellness Interpretation Bands)** are a synthesis of references 1–8 and 11–13; they
> are BioSense Version 1 classifications and are not attributable to any single reference as a
> diagnostic threshold.

---

# 28. Founder Decisions Required

Two items require a BioSense founder decision; both are flagged rather than silently resolved,
consistent with the platform's governance. **[C][E]**

**D-1 — Confirm the BioSense V1 Wellness Interpretation Band boundaries.** §11 proposes Optimal <65 /
Near-Optimal 65–79 / Above-Target 80–89 / Elevated 90–129 / Significantly-Elevated ≥130,
synthesised from cited evidence. These are defensible and transparent, but the exact cut
points (especially the Optimal ceiling and the Elevated/Significantly-Elevated boundary) are
a **product-positioning choice** with a wellness-tone trade-off: lower boundaries flag more
users toward optimisation (more engaged, potentially more anxious); higher boundaries are
more reassuring but less proactive. **Founder sign-off requested on the exact numbers.**

**D-2 — Higher-risk guideline-goal display policy.** §11.4 proposes that when a user *declares*
an established higher-risk condition, BioSense may show the recognised guideline goal (e.g.
ApoB <65 / <80) as context alongside the wellness interpretation. This improves usefulness for those
users but moves closer to clinical-target territory. **Founder decision requested** on whether
V1 displays guideline goals at all, and if so with exactly what caveat framing (CAV4).

*(Both decisions affect user experience and product positioning, not the underlying evidence.
The evidence and structure are ready to execute either way once set.)*

---

**END OF SCL-001 v1.0**

*This Scientific Configuration Pack is the reference template for all future BioSense
biomarker packs. Every numeric value is either a cited Category [A] guideline/consensus figure
or a transparently-labelled Category [B] BioSense wellness synthesis. No value was fabricated;
every Category [A] number was retrieved and verified during authoring and traces to §27.*
