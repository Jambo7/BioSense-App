BioSense
Engineering Library · Global Scientific Configuration
GSC-002
Biological Age Methodology
The governed method by which validated science estimates how a person’s biology is ageing over time
Document ID  GSC-002
Version  1.0 (Freeze Candidate — Pre-Freeze Revision applied)
Status  Freeze candidate — pre-freeze revision applied; independent re-review complete
Layer  Global Scientific Configuration (Level 3.5) — methodology consumed by Engineering
Authority  BioSense Intelligence Constitution (1A–1C, esp. §18) and GSC-000; subordinate to the Canonical Scientific Library
Consumes  the Scientific Configuration Library (ageing science, population reference, expected trajectory), GSC-004 (weighting), GSC-003 (confidence), GSC-008 (longitudinal weighting); references GSC-009, GSC-001
Executed by  ENG-001 Biological Age Engine (BIOLOGICAL_AGE_METHOD_VERSION), grounded in ENG-008
Owner  BioSense Scientific & Data-Science Authoring (Origin BioSense Technologies FZCO)
Classification  Confidential — Internal Engineering Specification
Revision note  This freeze candidate incorporates the accepted findings of the independent Pre-Freeze Architectural Review: sustained-evidence-gate durability thresholds assigned to GSC-008, reference pinning reframed onto the Library science version, a chronological-age low-confidence prior, person-relative ceiling and floor, and supporting terminology. No structure or scope was changed.
This document defines scientific methodology, weighting philosophy, configuration, calibration philosophy and governance. It contains no software code, no prompt logic and no user-interface behaviour. Every calculation is performed by Engineering (ENG-001). It consumes validated science and never creates, reinterprets or overrides it, and it never duplicates a methodology owned by another document.

Contents
1.  Purpose, Status & How to Read This Document
2.  The Scientific Philosophy of Biological Age
3.  Biological Age versus the Health Score
4.  Architectural Position & the GSC-000 Boundary
5.  Constitutional & Scientific Foundations
6.  The Ageing Domains
7.  The Estimation Framework
8.  Population Reference Methodology
9.  Personal Baseline Methodology
10.  The Expected Ageing Trajectory
11.  Biomarker Contribution Methodology
12.  Wearable Contribution Methodology
13.  Lifestyle Contribution Methodology
14.  Recovery Contribution Methodology
15.  Longitudinal Trend Contribution
16.  Cross-Domain Combination
17.  Confidence Handling
18.  Missing & Degraded Data
19.  Behaviour When Domains Disagree
20.  Positive Adaptation & Rejuvenation Detection
21.  Negative Adaptation & Accelerated-Ageing Detection
22.  Plateau, Ceiling & Floor Effects
23.  Biological Resilience
24.  Stability Requirements
25.  Explainability
26.  Relationship to the Health Score (GSC-001)
27.  Failure Modes & Safeguards
28.  Validation & Calibration Philosophy
29.  Governance & Versioning
30.  Developer Handover & Implementation Summary
31.  Constraints & Scope Boundaries
32.  Future Extensibility
33.  Design-Decision Register
34.  Glossary of Methodological Terms
35.  Completion
1.  Purpose, Status & How to Read This Document
1.1  Objective
GSC-002 defines the complete scientific methodology by which BioSense estimates a person’s Biological Age. It is the second methodology document of the Global Scientific Configuration Library and, alongside GSC-001, one of the two core intellectual-property documents that define the platform’s visible indicators. It specifies the method — the scientific philosophy, the estimation framework, the domain contributions, the population and personal references, the expected ageing trajectory, and the handling of adaptation, resilience, confidence, stability and explainability — by which validated understanding across many physiological systems becomes a single, explainable estimate of how a person’s biology is ageing over time.
It does not compute anything. Every calculation is performed by the Engineering layer, specifically the Biological Age Engine defined in ENG-001 §7.8. GSC-002 is the named, versioned method that engine executes; the engine is the machinery that runs it. This is the same method/computation discipline established by GSC-000 and applied in GSC-001, inherited here without exception.
The methodology is intended to be sufficiently complete that a competent engineering team could implement it without inventing any scientific logic. Where scientific truth is required, it is consumed from the Canonical Scientific Library; where a neighbouring methodology is required, it is consumed from the document that owns it; and where a concrete value would otherwise be needed, it is either delegated to that owner or marked explicitly as a configurable default tunable under governance.
1.2  What this document is — and is not
This is a production scientific specification.  It is written to the same standard as the ENG and SCL libraries and GSC-001, and is intended for permanent inclusion in the BioSense Engineering Library.
It is methodology, not implementation.  It is scientific methodology, weighting philosophy, configuration, calibration philosophy and governance. It is not executable code, not prompt logic and not user-interface behaviour, and it invents no scoring coefficients or algorithms.
1.3  Authority and precedence
GSC-002 derives its authority from, and is fully subordinate to, the BioSense Intelligence Constitution (Documents 1A–1C, and in particular Chapter 18, "Biological Age") and GSC-000, the Global Scientific Configuration Architecture. It is subordinate to the Canonical Scientific Library in every matter of scientific truth, including the science of ageing. Where this document and the Scientific Configuration Library appear to disagree about what any biomarker, physiological signal or ageing relationship means, the Scientific Configuration Library prevails without exception. GSC-002 consumes validated science; it never establishes, reinterprets or overrides it.
The governing precedence rule inherited from GSC-000 is absolute: Biological Age is an estimate, never a claim of fact; it never asserts a person’s chronological or clinical status, never diagnoses, never overrides deterministic safety, never alters AI Behaviour, and never alters constitutional reasoning. It expresses one dimension of understanding already held by the system; it is a considered estimate derived from understanding, not a source of it.
1.4  Reading convention
Reading convention.  Where this document says the method "moves", "resists", "resets", "reads", "consumes" or "expresses" — or otherwise acts on the estimate, a reference or an input — it means the method specifies that the engine (ENG-001) shall do so. GSC-002 performs no computation and holds no runtime state; it defines the policy the engine executes. This convention applies throughout and is not repeated at each occurrence.
1.5  How to read this document
Chapters 2 and 3 establish the scientific philosophy and the deliberate separation from the Health Score. Chapter 4 locates the methodology against the GSC-000 boundary and defines the seam with the Biological Age Engine. Chapter 5 records the constitutional and scientific foundations the method consumes. Chapters 6 through 16 develop the methodology itself: the ageing domains, the estimation framework, the population and personal references, the expected ageing trajectory, the per-domain contribution methodologies, and cross-domain combination. Chapters 17 through 25 govern confidence, missing data, disagreement, positive and negative adaptation, plateau and boundary effects, resilience, stability and explainability. Chapter 26 fixes the relationship to the Health Score. Chapters 27 through 29 cover failure modes, validation and governance. Chapter 30 is the developer handover and implementation summary. Chapters 31 through 35 state the scope boundaries, future extensibility, the design-decision register, the glossary and completion.
1.6  The method in brief
For orientation, the method can be stated in a paragraph. Biological Age is a single, explainable estimate of how a person’s physiology is ageing relative to expectation for their chronological age. It is estimated, not measured: the Dynamic Health Model’s validated understanding across multiple ageing-relevant domains is expressed, for each domain, as a departure from the expected ageing trajectory for that person; each departure is conditioned by its confidence (GSC-003) and by longitudinal weighting (GSC-008); the conditioned departures are combined under dynamic, biologically-relevant weights (GSC-004) into a composed ageing estimate; and that estimate is expressed as a Biological Age together with an explicit confidence and a complete explainability record. The method moves only on sustained, convincing evidence, treats temporary disruption as resilience rather than ageing, anchors against a population reference while reading change against the person’s own trajectory, and never presents itself as anything other than an estimate. Everything after this section elaborates one part of that paragraph.
One-line statement.  Biological Age composes validated, longitudinally-weighted understanding across ageing-relevant domains — conditioned by confidence, weighted by biological relevance — into a single, slow-moving, explainable estimate of how a person is ageing, which ENG-001 computes and this document governs.
2.  The Scientific Philosophy of Biological Age
Before any methodology, Biological Age must be understood for what the Constitution makes it: an estimate of how a person’s physiology compares with the expected biological characteristics of their chronological age — a longitudinal, motivational and educational construct, never a diagnosis and never a claim of fact.
2.1  The question Biological Age answers
The Constitution assigns Biological Age one question: "How does your biology appear to be ageing over time?" It is the companion to the Health Score’s present-tense question, and it is deliberately longitudinal. Its value lies in revealing the direction of biological ageing over years rather than days. Biological Age is therefore not a snapshot of current health, not a measure of daily readiness, not a statement of athletic performance and not an indicator of immediate illness; it is an estimate of the effect of time on a person’s physiology, and of how their lifestyle and long-term behaviour may be influencing that effect.
2.2  Chronological age measures time; Biological Age estimates its effect
The Constitution draws a sharp line: chronological age measures time and cannot be changed, whereas biological ageing can. The purpose of Biological Age is not to remind a person how old they are but to demonstrate how physiology, lifestyle and long-term behaviour may influence healthy ageing. This makes Biological Age a motivational and educational construct rather than a medical judgement. It should encourage healthier decisions and it must never create fear. Every design choice in this methodology serves that purpose: the estimate exists to help a person understand and improve their trajectory, not to alarm them about a number.
Constitutional principle (1A §18.2).  Chronological age measures time. Biological Age estimates the effect of time. It is a motivational and educational construct, never a medical diagnosis; it should encourage healthier decisions and never create fear.
2.3  Biological Age is an estimate, never a fact
The Constitution explicitly recognises that Biological Age cannot be directly measured; it is inferred. It represents the Intelligence Engine’s best estimate based on current scientific evidence, validated physiological observations, longitudinal understanding and the Dynamic Health Model. This has a decisive methodological consequence: Biological Age must always be expressed as an estimate rather than objective truth, must always carry its own confidence, and must always remain transparent about its limitations. A methodology that presented Biological Age as a precise fact would contradict the Constitution; this methodology never does.
2.4  Ageing is multi-system
No single biomarker, wearable or questionnaire determines Biological Age. The Constitution requires that it emerge from the interaction of multiple physiological domains — cardiovascular health, metabolic health, inflammation, body composition, recovery, sleep, physical activity, behavioural consistency, nutrition, and future validated ageing biomarkers. Which domains contribute is a scientific question, determined by validated ageing science and never by commercial convenience. This multi-system foundation is why the estimation framework (Chapter 7) composes across domains rather than privileging any one signal.
Founder principle (1A §18.4).  Ageing is multi-system. Biological Age should be too. Scientific evidence determines which domains contribute; commercial convenience never does.
2.5  Biological Age moves at the speed of biology
Biological ageing occurs slowly, so Biological Age must change slowly. The Constitution rejects rapidly fluctuating Biological Age calculations and states that a single poor night’s sleep, one difficult week, one isolated blood test or one stressful month should rarely influence the estimate independently. Sustained evidence is required before meaningful movement occurs. Stability is therefore not a tuning preference but a scientific commitment: the estimate is engineered to move at the speed of biology, not the speed of data. This principle shapes the longitudinal weighting, the adaptation methodology and the stability requirements throughout this document.
2.6  Biology is resilient
The Constitution recognises that biology demonstrates resilience: temporary disruption should not become permanent ageing. Temporary illness, travel, acute stress, short-term overtraining and a poor week of sleep should rarely produce substantial worsening of Biological Age, just as a single good week should not produce rejuvenation. This is a genuinely distinctive property of the Biological Age method relative to the Health Score, and it is developed as a first-class mechanism in Chapter 23. The estimate reflects long-term adaptation, not temporary perturbation.
2.7  Biological Age educates
The Constitution discourages displaying Biological Age as an isolated number and requires that every significant change be accompanied by education: what appears to be reducing biological ageing, what appears to be accelerating it, which behaviours have produced the greatest benefit, and which future opportunities exist. Every change in Biological Age should teach something meaningful. This is why explainability (Chapter 25) is not an add-on but a constitutional requirement, and why the method produces a structured explanatory record alongside every estimate.
3.  Biological Age versus the Health Score
Biological Age and the Health Score are the two visible indicators of BioSense, and the Constitution deliberately keeps them distinct. This chapter defines their relationship from the Biological Age side, mirroring exactly the account given in GSC-001 Chapter 20, so that the two documents remain complementary and never redundant or contradictory.
3.1  Two questions, deliberately separated
The Health Score asks: "How healthy does your biology currently appear to be?" Biological Age asks: "How does your biology appear to be ageing over time?" Health describes today; Biological Age describes the journey. Neither replaces the other, and together they give a richer picture than either alone. GSC-002 owns only the longitudinal question and must never drift into estimating present health — that is GSC-001’s sole responsibility. This reciprocal boundary is identical to the one GSC-001 states from its side.
Aspect
Health Score (GSC-001)
Biological Age (GSC-002)
Question
How healthy does your biology currently appear?
How is your biology ageing over time?
Tense
Present.
Longitudinal.
Dominant evidence
Current readings across domains.
Sustained multi-year trajectory.
Sensitivity to a single reading
Low but non-zero.
Effectively none.
Movement cadence
Gradual; months express change.
Very slow; years express change.
Relationship to the other
Provides present context.
Provides the journey.
This table is the exact reciprocal of the comparison in GSC-001 Chapter 20. The two documents are authored to agree on every row, and any future change to one must be mirrored in the other under governance.
3.2  Shared foundations, distinct methods
The two indicators share foundations: both are derived engine outputs computed by ENG-001 from Dynamic Health Model understanding; both carry their own method version; both consume cross-domain weighting from GSC-004, confidence from GSC-003 and longitudinal weighting from GSC-008; both are estimates that carry confidence and are fully explainable. Their methods differ in emphasis. The Health Score privileges present readings and treats trend as context; Biological Age privileges sustained trajectory and treats any single reading as effectively irrelevant. The Constitution notes that Biological Age moves even more slowly than the Health Score, requiring months or years of evidence, and that transient events do not materially affect it.
3.3  Consistency without coupling
The two indicators should be broadly consistent — a person whose present health is durably poor will, over time, tend to show an older biological age — but they are not mechanically coupled. Neither is an input to the other’s method: the Health Score does not compute Biological Age and Biological Age does not compute the Health Score. This independence is deliberate and is stated identically in GSC-001. Coupling them would let a transient dip in one distort the other, violating the Constitution’s insistence that Biological Age ignore transient events. They converge because they read the same underlying validated understanding, not because one drives the other.
Decoupling rule.  Biological Age and the Health Score share inputs but never share methods, and neither is an input to the other. They agree because they read the same understanding, not because either drives the other. This is stated identically in GSC-001 Chapter 20 and GSC-002 Chapter 3.
3.4  Why the separation is protected
Keeping the two methods separate protects the meaning of each. Biological Age can hold steady through a temporary illness without implying present health is fine; the Health Score can move for a genuine present change without implying the person has aged. A person reading both indicators receives two honest, non-redundant answers. GSC-002 therefore references GSC-001 only to disclaim overlap: it owns the journey, leaves present health to GSC-001, and never blurs the two.
4.  Architectural Position & the GSC-000 Boundary
GSC-002 sits exactly where GSC-000 places it: configuration and methodology, consumed by Engineering, subordinate to the Constitution and the Scientific Configuration Library. This chapter makes the boundary concrete for Biological Age, so that method is never mistaken for machinery.
4.1  The seam between method and computation
Biological Age is, by the Engineering specification, a derived engine output: computed on demand from the Dynamic Health Model, carrying its own method version, cached under version-keyed invalidation rather than stored as a first-class belief. GSC-000 identifies this as the clean seam the Global Scientific Configuration layer is built for. GSC-002 owns one side of that seam and ENG-001 §7.8, the Biological Age Engine, owns the other.
Concern
Owned by GSC-002 (this document)
Owned by ENG-001 §7.8 (the engine)
Method
Defines the named, versioned age-estimation method: philosophy, framework, contributions, references, calibration.
Executes the method as code.
Inputs
Specifies which classes of validated ageing-relevant understanding may contribute and why.
Reads the actual DHM understanding at run time.
Estimation
Defines how departures from expected ageing combine into an estimate, as a framework.
Performs the arithmetic and produces the value.
Confidence
Defines that and how the estimate carries confidence (via GSC-003).
Computes the Confidence Object and attaches it.
Versioning
Owns the method version and its change under governance.
Records BIOLOGICAL_AGE_METHOD_VERSION on every snapshot and caches it.
Persistence
Says nothing about storage — out of scope.
Caches, invalidates and records snapshots and their Confidence Objects.

The one-sentence boundary.  GSC-002 defines the method; ENG-001 §7.8 runs it. Every Biological Age value is produced by the Biological Age Engine executing this method at a specific method version, grounded in the Canonical Scientific Library through ENG-008, with the method version recorded on every snapshot.
4.2  What GSC-002 consumes, references and never touches
Consumes (hard dependencies)
The Scientific Configuration Library — the validated science of ageing: which markers and systems relate to biological ageing, in which direction, and with what evidence. The estimate is built only on already-validated understanding.
GSC-004 Cross-Domain Weighting — how ageing domains are weighted relative to one another. Biological Age does not invent its own cross-domain weights; it consumes the weighting methodology GSC-004 owns.
GSC-003 Confidence Calibration — how confidence is composed and calibrated. The estimate carries confidence produced under GSC-003, not a bespoke confidence of its own.
GSC-008 Freshness Decay & Longitudinal Weighting — how evidence is weighted over time. This dependency is central to Biological Age: the slow, sustained-evidence behaviour the Constitution requires is expressed through the longitudinal-weighting policy GSC-008 owns, which GSC-002 consumes rather than redefining.
References (without duplicating ownership)
GSC-001 Health Score Methodology — the sibling indicator; referenced only to fix the reciprocal boundary of Chapters 3 and 26.
GSC-009 Evidence Fusion & Conflict Resolution — where ageing domains genuinely conflict, the estimate consumes the conflict-aware fused view GSC-009 governs rather than resolving conflicts itself.
Never touches
Scientific truth (SCL/ENG-008), the deterministic safety floor (ENG-010), AI Behaviour and narrative (ENG-005), and constitutional reasoning (1A–1C). The estimate neither alters nor overrides any of these.
4.3  Biological Age never dictates; it expresses
The Constitution is explicit that Biological Age should emerge from the Dynamic Health Model and never exist independently, and that it must never dictate reasoning — it represents one expression of understanding, not the understanding itself. GSC-002 respects this exactly: the estimate is downstream of understanding and drives nothing. It does not steer reasoning, does not drive recommendations (that authority belongs to GSC-005, which the estimate never touches), and does not set safety. Biological Age informs a person and informs the narrative that explains it; it commands nothing.
5.  Constitutional & Scientific Foundations
The Biological Age methodology is assembled from commitments the Constitution and the frozen architecture already make, so that every later design choice traces to a ratified principle rather than a new one. This chapter records those foundations.
5.1  The longitudinal mandate
The Constitution defines Biological Age as a longitudinal estimate whose value lies in revealing the direction of ageing over years. This mandate shapes the entire method: it privileges sustained trajectory over present state, treats a single reading as effectively irrelevant, expresses movement over years as the primary output, and requires the estimate to move only on convincing, sustained evidence. Every mechanism in this document — longitudinal weighting, adaptation, resilience, stability — serves the longitudinal mandate.
5.2  Estimate, not measurement
Because Biological Age is inferred and never directly measured, the method treats every estimate as provisional and evidence-dependent, always accompanied by confidence, and always transparent about its limits. This is the same confidence-as-substance posture the Constitution requires of the Intelligence Engine generally, applied to ageing: a Biological Age with rich longitudinal evidence is a different object from one built on a single time-point, and the method keeps them distinguishable rather than presenting both as equally certain.
5.3  Multi-system emergence
The Constitution requires Biological Age to emerge from the interaction of multiple physiological domains, with scientific evidence — not commercial convenience — determining which domains contribute. The method therefore composes across ageing-relevant domains (Chapter 6), and it admits a domain only when validated ageing science supports its inclusion. This is why domain contribution is a scientific question routed through the Scientific Configuration Library, never a product decision made in this document.
5.4  Speed of biology, not speed of data
The Constitution rejects rapidly fluctuating Biological Age and requires sustained evidence before meaningful movement. This is operationalised through the longitudinal weighting of GSC-008 and the adaptation and stability methodologies of Chapters 20, 21 and 24. The estimate is engineered so that transient events are absorbed as resilience and only durable physiological change moves the number — the constitutional "speed of biology" made concrete.
Constitutional anchor (1A §18.5).  "Biological Age should move at the speed of biology, not the speed of data." Sustained evidence is required before meaningful movement; single events rarely influence the estimate independently.
5.5  Resilience over perturbation
The Constitution recognises biology’s resilience: temporary disruption should not become permanent ageing, and temporary improvement should not become premature rejuvenation. The method treats short-lived perturbations — illness, travel, acute stress, overtraining, a poor week — as evidence of resilience to be absorbed, not as ageing to be recorded. This symmetry (Chapter 23) is a defining scientific property of Biological Age.
5.6  Estimate carries confidence; every change educates
Two further constitutional requirements shape the method. First, confidence must accompany every estimate, so that two identical Biological Ages built on very different evidence are honestly distinguished (Chapter 17). Second, every change should teach something meaningful, so the method produces a structured explanation identifying which systems contributed, which observations carried greatest influence, which uncertainties remain, and which future information could improve the estimate (Chapter 25). Biological Age should never become a mysterious algorithm.
5.7  Inputs the method is entitled to consume
The Engineering specification for the Biological Age Engine (ENG-001 §7.8) lists the classes of established understanding the estimate draws upon, and requires that the engine consume interpreted inputs from the Dynamic Health Model rather than analysing observations independently. GSC-002 respects this exactly: the method composes an estimate from validated, interpreted understanding, never from raw data.
Established input (from the DHM, per ENG-001 §7.8)
What it contributes to the ageing estimate
Longitudinal biomarkers
Validated ageing-relevant laboratory trends over time — the deepest ageing signals.
Cardiovascular trends
Sustained cardiovascular function as it relates to ageing.
Metabolic profile
Validated metabolic health, a core ageing system.
Inflammation
Long-term inflammatory status, strongly related to biological ageing.
Recovery
Sustained physiological resilience and adaptive capacity over time.
Exercise
Long-term physical-activity patterns and their ageing-relevant effects.
Sleep
Sustained sleep quality as it bears on ageing, over months.
Behaviour
Durable behavioural consistency shaping the ageing trajectory.
Identity
The person’s Biological Identity and chronological reference, owned by the DHM.
These are interpreted understanding, not raw streams. Where a domain holds only uninterpreted data, it does not contribute until the Dynamic Health Model has validated it — the same discipline GSC-001 applies, and the line ENG-001 draws when it forbids the engine from analysing observations independently.
6.  The Ageing Domains
Biological Age is composed from ageing domains — coherent groupings of physiological understanding that each speak to biological ageing on their own timescale. This chapter defines the domains as a methodology of principles, drawn from the multi-system list the Constitution names, with scientific evidence determining inclusion.
6.1  What an ageing domain is
An ageing domain is a grouping of validated understanding that shares a physiological meaning and a characteristic ageing timescale. Domains exist so that the estimate can reason about ageing at the level of coherent systems rather than isolated measurements, and so that cross-domain weighting (GSC-004) has well-defined objects to weigh. An ageing domain never contains raw data; it contains understanding the Dynamic Health Model has already validated, interpreted specifically for its bearing on ageing.
6.2  The ageing domains
The following domains are recognised by the method, drawn from the multi-system list the Constitution names in §18.4. Each is described by the understanding it carries and its ageing timescale. None is assigned a fixed share of the estimate; contribution is dynamic and governed by Chapters 11 through 16. A domain is included only where validated ageing science supports it.
6.2.1  Cardiovascular health
Carries.  Validated understanding of cardiovascular function as it relates to biological ageing — the sustained trends the science associates with vascular and cardiac ageing.
Ageing timescale.  Years. A slow, deeply ageing-relevant system; its trajectory over years is far more meaningful than any single reading.
6.2.2  Metabolic health
Carries.  Validated metabolic understanding — glucose regulation, lipid and related metabolic systems as the ageing science interprets them.
Ageing timescale.  Months to years. A core ageing system whose sustained direction is central to the estimate.
6.2.3  Inflammation
Carries.  Long-term inflammatory status, which the ageing science strongly associates with biological ageing ("inflammageing" and related validated relationships).
Ageing timescale.  Months to years. Chronic, sustained inflammation is ageing-relevant; transient inflammation is not.
6.2.4  Body composition
Carries.  Validated understanding of composition measures as they relate to ageing — lean mass, adiposity and distribution, interpreted for ageing relevance.
Ageing timescale.  Months to years. Slow-moving and structural; the method expects and requires slow change here.
6.2.5  Recovery
Carries.  The model’s established understanding of sustained physiological resilience and adaptive capacity — how well the body recovers and adapts over time.
Ageing timescale.  Months. Read as a sustained trend, never as a single day’s reading; closely tied to resilience (Chapter 23).
6.2.6  Sleep
Carries.  Validated understanding of sustained sleep quality and consistency as it bears on ageing, aggregated over long periods.
Ageing timescale.  Months. Only sustained sleep patterns influence the estimate; single nights and short runs do not.
6.2.7  Physical activity
Carries.  Interpreted long-term activity patterns — volume, intensity and consistency — as the ageing science relates them to healthy ageing.
Ageing timescale.  Months to years. Sustained activity patterns matter; isolated sessions do not move the estimate.
6.2.8  Behavioural consistency
Carries.  Durable behavioural patterns — the sustained habits the ageing science associates with slower or faster biological ageing.
Ageing timescale.  Years. Slow, persistent and stabilising; it anchors the estimate against transient fluctuation in faster domains.
6.2.9  Nutrition
Carries.  Interpreted long-term nutritional patterns and their validated ageing-relevant physiological consequences.
Ageing timescale.  Months to years. Contributes through sustained pattern, often via its effect on metabolic and inflammatory domains.
6.2.10  Validated ageing biomarkers (present and future)
Carries.  Biomarkers the Scientific Configuration Library has validated as ageing-relevant, including future validated ageing biomarkers and dedicated ageing clocks as the science matures.
Ageing timescale.  Varies by marker. This domain is deliberately open so that new validated ageing science enters the estimate through the science, not through a change to the framework.
6.3  Domains are available, not guaranteed
No person will have every ageing domain populated, and the method never assumes they do. A user with rich longitudinal bloods but little wearable history, or extensive wearable data but few labs, must still receive a meaningful, honest estimate with appropriate confidence. Which domains are present determines both the composition and the confidence of the estimate, as defined in Chapters 17 and 18. The domain model is a menu of possible contributions, not a required checklist.
6.4  Scientific evidence determines inclusion
Inclusion rule.  A domain contributes to Biological Age only where validated ageing science supports its relevance, as established by the Scientific Configuration Library. Commercial convenience, data availability or product preference never determine inclusion. Adding a domain is a scientific decision routed through the science, governed under Chapters 29 and 32.
7.  The Estimation Framework
This chapter defines the estimation framework as a methodology — the shape of the model, the meaning of the estimate, and the logic of composition — without writing software or inventing coefficients. It specifies how the pieces relate and what properties the estimation must have, leaving the arithmetic to Engineering.
7.1  The overall estimation model
Biological Age is an estimate of departure from expected ageing, composed across domains. In methodological terms it is built in four conceptual stages: for each available domain, the person’s validated understanding is expressed as a departure from the expected ageing trajectory for someone of their chronological age and context (Chapters 8–10); each departure carries a confidence and a longitudinal weight; the departures are combined under dynamic cross-domain weighting into a single composed ageing departure; and that departure is expressed as a Biological Age — an age in years — together with its confidence and an explainability record. The model is layered so that each stage is independently explainable and governable, exactly as in GSC-001.
Stage
Input
Method (defined here) → Output
1  Domain departure
Validated ageing-relevant understanding in a domain
Express the domain’s departure from the expected ageing trajectory as a signed, bounded quantity with a confidence and a longitudinal weight.
2  Domain conditioning
Domain departure
Apply longitudinal weighting (GSC-008) and confidence (GSC-003) so unsustained or weak departures contribute proportionately less.
3  Cross-domain composition
Conditioned departures
Combine under dynamic weights (GSC-004) into a single composed ageing departure, honouring the conflict-aware fused view (GSC-009).
4  Expression
Composed departure
Map to an estimated Biological Age in years and attach an overall confidence and an explainability record.
7.2  What the estimate expresses
The estimate is expressed as a Biological Age in years, interpreted as the chronological age whose expected physiology best matches the person’s validated understanding. A Biological Age below chronological age indicates physiology that resembles a younger expected profile; above, an older one; equal, an on-trajectory profile. The estimate is always accompanied by its confidence and is always framed as an estimate, never as a measured fact. The methodological requirement is that the expression be monotonic (better validated ageing understanding never yields an older estimate), stable (small evidence changes produce small estimate changes), and bounded within a plausible range relative to chronological age (Chapter 22).
7.3  Departure from expected ageing, not an absolute score
The defining methodological choice of Biological Age is that each domain contributes a departure from expected ageing rather than an absolute health score. This is what makes Biological Age an age rather than a rating: a domain reading exactly as expected for the person’s chronological age contributes zero departure; a domain resembling a younger expected profile contributes a negative (younger) departure; an older-resembling domain contributes a positive (older) departure. The expected-ageing reference against which departure is measured is defined in Chapters 8 through 10.
7.4  The canonical estimation form
So that two independent implementations produce the same estimate from the same inputs, the method designates a single canonical estimation form as its configurable default — the reference methodology ENG-001 implements and calibration tunes. The form is stated as a methodology, not as code, and has three parts applied in a fixed order. First, a longitudinally-weighted, confidence-weighted central tendency of the conditioned domain departures, combined under the dynamic weights from GSC-004, produces a composed ageing departure. Second, a sustained-evidence gate ensures that only departures supported by sufficient longitudinal evidence contribute materially, so that transient signals cannot move the estimate — the mechanism by which the Constitution’s "speed of biology" is enforced. Third, a bounded mapping converts the composed departure into an estimated Biological Age within the plausible range relative to chronological age (Chapter 22). The relative weights and the mapping are configurable defaults owned by this document and tuned under Chapter 28; the durability thresholds the gate applies — how sustained a trend must be to count — are consumed from GSC-008 (longitudinal weighting), not owned here, so there is a single owner for how evidence is weighted over time. The three-part structure and its order are fixed by this methodology and are not a tuning choice.
Why name the form.  Designating one canonical estimation form — the BioSense biological-ageing composition — removes the risk that two engineering teams satisfy the required properties with different functions and produce different estimates, and makes the method’s central behaviour a defined, versioned, defensible asset rather than an implementation detail. It remains methodology: no coefficients are fixed here, only the structure the engine must implement and calibration may tune.
Ownership of the sustained-evidence gate.  GSC-008 owns how evidence is weighted over time, including the durability thresholds that decide how sustained a trend must be to count. GSC-002 owns the gate as a policy that consumes those thresholds and decides how a gated departure is permitted to move the estimate. This is the same seam GSC-001 draws with GSC-008; the two documents must not both claim the durability thresholds. Every later reference to the gate in this document (including the adaptation methodologies of Chapters 20 and 21) consumes its thresholds from GSC-008.
7.5  Determinism and version-pinning
The framework is deterministic: given the same conditioned departures, weights, configurable defaults and supplied prior state, it always yields the same estimate and the same explanation. As in GSC-001, two of the method’s behaviours — the stability requirements of Chapter 24 and the longitudinal behaviour of the adaptation chapters — depend on the estimate’s own recent history, so the estimate is a function of present understanding together with a supplied prior state (the previous estimate, its direction, and any smoothing memory). That prior state is held and evolved by ENG-001, not by the method; the method defines only the policy that operates on it. Reproducibility is therefore defined as: the estimate is a pure function of present understanding, the ENG-001-supplied prior state, and the pinned method and dependency versions. Given identical values of all three, the estimate and its explanation are always identical, which preserves both the slow-movement stability the Constitution requires and the reproducibility on which auditability and calibration depend.
7.6  What the framework deliberately omits
No arithmetic constants, coefficients or code appear in this framework, by design. The specific weighting values live in GSC-004; the confidence composition lives in GSC-003; the longitudinal-weighting curve lives in GSC-008; and all executable computation lives in ENG-001. GSC-002 fixes the shape and required properties of the estimation and leaves every numeric value either to its dependency documents or to governed calibration. This is what it means for Biological Age to be a method rather than a machine.
8.  Population Reference Methodology
Biological Age is measured as a departure from what is expected, so the method needs a rigorous notion of "expected". This chapter defines the population reference — the expected physiology for a given chronological age — as a methodology that consumes validated science and never invents it.
8.1  What the population reference is
The population reference is the expected physiological profile, per domain, for a person of a given chronological age and relevant context. It is the yardstick against which departure is measured: a domain reading at the population reference for the person’s chronological age contributes zero ageing departure. The reference is not a target and carries no clinical judgement; it is a scientific expectation used solely to express ageing as a relative departure.
8.2  The reference is consumed from validated science
Ownership boundary.  The population reference is derived entirely from validated ageing science in the Scientific Configuration Library. GSC-002 specifies how the reference is used to express departure; it never defines the reference values themselves, which are scientific facts owned by the Library. Where the science provides age-and-context-specific expectations, the method consumes them; it never fabricates an expectation the science does not support.
8.3  Context-appropriate expectations
The population reference is context-appropriate where the validated science is context-specific — for example, sex-specific ageing expectations where the science distinguishes them. The method consumes such context-specific references from the Library rather than deriving them, so the estimate inherits, and never invents, scientifically-grounded distinctions. Contextual personalisation of the reference is governed in Chapter 9 and never alters the underlying science.
8.4  The reference never becomes a clinical claim
The population reference is used solely to express ageing as a relative departure. It is never used to assert that a person is clinically abnormal, at risk, or in need of intervention. A departure toward an older profile is an ageing signal for a motivational, educational estimate — not a diagnosis. This preserves the wellness-first, non-diagnostic posture the Constitution requires, and it mirrors the equivalent guard in GSC-001.
8.5  Reference stability and versioning
Because the population reference is scientific, it changes only when the underlying ageing science changes, under the Scientific Configuration Library’s own governance. The reference is versioned as part of the Scientific Configuration Library, and each estimate pins to the Library science version (the same mechanism grounded through ENG-008 by which every scientific claim is version-pinned), so a past estimate remains reproducible against the exact reference that produced it. The method introduces no separate reference-versioning object of its own; it relies on the Library’s science version. The method never silently adopts a changed reference; a reference change flows through governance (Chapter 29).
9.  Personal Baseline Methodology
The population reference says what is expected for a chronological age; the personal baseline says where this individual actually is and how they are moving. Biological Age uses both, in a dual reference that mirrors the technique proven in GSC-001, adapted to ageing.
9.1  What the personal baseline is
The personal baseline is the person’s own established ageing-relevant physiology and its trajectory over time — their Biological Identity as it pertains to ageing. It is what lets the estimate recognise genuine change for this individual: a person may sit above or below the population reference for their age, and what matters longitudinally is the direction and durability of their movement relative to their own established trajectory. The personal baseline is owned by the Dynamic Health Model, not by this method.
Ownership of the baseline.  The personal baseline is the person’s Biological Identity, owned, established and maintained by the Dynamic Health Model (ENG-001), and consumed by this method. GSC-002 never computes, stores or mutates the baseline. Where this document describes the baseline evolving as sustained change accrues, it defines only the policy; the persistence assessment and the update are effected in the Dynamic Health Model. This keeps a single source of truth for the baseline and prevents duplicated ownership — identical to the treatment in GSC-001.
9.2  The dual reference
Biological Age reads change against the personal baseline but anchors against the population reference. The population reference converts the person’s physiology into an age-equivalent departure (how their biology compares with chronological expectation); the personal baseline governs sensitivity to change (how they are moving relative to their own established trajectory). Using both is what allows the estimate to be simultaneously meaningful in absolute terms (an age) and honest about individual movement (a trajectory). This dual reference is the same technique GSC-001 uses for the Health Score, applied here to ageing.
Dual-reference principle.  The population reference expresses ageing as an age-equivalent departure; the personal baseline expresses movement relative to the individual’s own trajectory. Sustained divergence between a person’s trajectory and healthy expectation is surfaced through confidence and explainability, never silently absorbed. Personal sensitivity without losing the absolute ageing meaning is a deliberate property of the method.
9.3  Personalisation changes reference and sensitivity, never science
Personalisation operates on two things: the context-appropriate expectation the person is compared against (age, sex and other scientifically-grounded context), and the sensitivity of the estimate to their own trajectory. It never operates on what a biomarker or system means for ageing — that is fixed by the Scientific Configuration Library and is identical for everyone. Personalisation makes the estimate a fair reading of this individual’s ageing; it never makes the ageing science personal.
The hard line.  Personalisation may change what is expected of this person and how sensitive the estimate is to their movement. It may never change what the ageing evidence scientifically means. Age, sex, baseline and context adjust reference and sensitivity, never scientific truth.
9.4  Cold start: estimating before a personal baseline exists
Where the person has no established personal baseline — the cold-start case — the estimate is made against the population reference alone, with confidence held lower until a personal baseline forms, and with the estimate honestly framed as early. The method never fabricates a personal trajectory it has not observed; it estimates from population-appropriate expectation and states that it is still learning the individual. As longitudinal evidence accrues, the personal baseline forms and confidence rises. This mirrors the graceful cold-start behaviour of GSC-001, adapted to a longitudinal estimate that is necessarily lowest-confidence at first contact.
9.5  Chronological age as the low-confidence prior
Chronological age is the anchor of the estimate, and the method specifies its role explicitly so that the large population of users with limited longitudinal evidence behaves sensibly. Absent sufficient sustained evidence, the estimate defaults toward the person’s chronological age as a low-confidence prior — the honest starting position, since with no evidence of departure the best estimate of biological age is chronological age. The estimate departs from chronological age only as sustained, corroborated evidence accrues, and the magnitude of departure the evidence can justify grows with the depth and duration of that evidence. This makes the sparse-evidence case both scientifically sensible and buildable to a single interpretation, and it reinforces the estimate-not-fact posture: a thin estimate sits near chronological age with wide uncertainty, not at some divergent value it cannot support.
Chronological-age prior.  With no sufficient evidence, biological age defaults toward chronological age at low confidence. Departure grows only with sustained evidence. This is a named cold-start method element: it never presents a large departure the evidence cannot justify, and it prevents two implementations from diverging on the most common, lowest-evidence case. The prior and the dual-reference drift-guard (§9.2) are complementary and operate at different evidence levels: the prior governs low-evidence defaulting toward chronological age, while the drift-guard governs sustained divergence from healthy expectation once evidence is rich; they do not compete.
10.  The Expected Ageing Trajectory
Departure is measured not only against a static expectation for a chronological age, but against an expected trajectory — how a given person’s physiology would be expected to change over time absent intervention. This chapter defines the expected ageing trajectory as a methodology.
10.1  Why a trajectory, not a point
Biological ageing is a process, not a state, so the reference against which the estimate reads is itself a trajectory: the expected path of a person’s ageing-relevant physiology over time, given their chronological age, context and established baseline. Reading against a trajectory rather than a single point is what lets Biological Age distinguish a person who is ageing faster than expected from one who is simply older, and a person who is genuinely rejuvenating from one who is merely young. The trajectory is the backbone of the adaptation methodologies in Chapters 20 and 21.
10.2  The trajectory is scientific, consumed not invented
Ownership boundary.  The shape of the expected ageing trajectory — how each domain is expected to change with age — is validated ageing science owned by the Scientific Configuration Library. GSC-002 specifies how departures from that trajectory are read and combined; it never defines the trajectory’s shape. Where the science provides expected rates of age-related change, the method consumes them; it never fabricates a trajectory the science does not support.
10.3  On-trajectory, ahead, and behind
At any time, a person’s ageing-relevant physiology may be on its expected trajectory (contributing no net ageing departure beyond their established position), ahead of it (ageing more slowly than expected — a younger departure), or behind it (ageing faster than expected — an older departure). The method reads each domain’s position relative to the expected trajectory and composes these into the overall estimate. Because the trajectory is expected to change slowly, being ahead or behind is only meaningful when sustained — the same sustained-evidence requirement the Constitution demands.
10.4  Trajectory and personal baseline together
The expected trajectory and the personal baseline are complementary. The personal baseline says where the individual established themselves; the expected trajectory says how they would be expected to move from there. Genuine biological change shows up as sustained deviation of the person’s actual movement from their expected trajectory — the signal the adaptation methodologies detect. The method thus reads three things together: the population reference (absolute age-equivalence), the personal baseline (individual position), and the expected trajectory (individual expected movement).
11.  Biomarker Contribution Methodology
Biomarkers are the deepest ageing-relevant signals available to the estimate. This chapter defines how validated longitudinal biomarker understanding becomes an ageing departure, without inventing any biomarker science.
11.1  From validated biomarker understanding to ageing departure
A biomarker contributes to Biological Age through its validated ageing-relevant interpretation, as established by the Scientific Configuration Library, expressed as a departure from the expected ageing trajectory. The method never reads a raw laboratory value and never assigns ageing meaning to a marker the science has not validated as ageing-relevant. It consumes the Library’s interpretation — what this marker, at this level, in this trend, means for biological ageing — and expresses it as a signed, bounded departure conditioned by confidence and longitudinal weight.
11.2  Longitudinal biomarkers dominate
Consistent with the longitudinal mandate, biomarker contribution is driven by sustained trends, not single results. A single blood test rarely influences Biological Age independently; a sustained biomarker trend over months carries real ageing weight. The method therefore privileges the trajectory of a biomarker over its latest value, and it treats an isolated abnormal result as low-weight until corroborated over time or across markers. This is the biomarker-level expression of "speed of biology, not speed of data."
11.3  Multi-marker and multi-system corroboration
Ageing signals are strongest when validated markers corroborate one another across systems — a sustained metabolic shift echoed in inflammation and cardiovascular trends, for example. The method benefits from such corroboration through confidence (Chapter 17) and cross-domain combination (Chapter 16), holding a multi-marker, multi-system ageing signal more firmly than an isolated one. It never manufactures corroboration from correlated views of the same measurement; genuine independence is assessed by GSC-003.
11.4  Biomarker science is never created here
Boundary.  Which biomarkers are ageing-relevant, in which direction, and with what strength, is validated science owned by the Scientific Configuration Library and grounded through ENG-008. GSC-002 consumes these facts and expresses them as ageing departures; it never decides, reinterprets or extends biomarker ageing science.
12.  Wearable Contribution Methodology
Wearable physiology contributes to Biological Age through sustained trends in validated ageing-relevant signals, never through daily fluctuation. This chapter defines that contribution.
12.1  Sustained wearable trends, not daily readings
Wearable signals — validated understanding of cardiovascular, autonomic and activity-related physiology — contribute to Biological Age only through their sustained trends over long periods. The daily and nightly fluctuation that is informative for the Health Score is, for Biological Age, noise to be averaged out: a single night’s recovery or one week’s activity has effectively no independent influence on the ageing estimate. The method consumes the DHM’s longitudinally-interpreted wearable understanding and expresses its sustained direction as an ageing departure.
12.2  What wearable data contributes to ageing
Where validated ageing science supports it, sustained wearable trends inform the cardiovascular, recovery and physical-activity ageing domains — for example, a sustained multi-month improvement in a validated cardiovascular-fitness indicator contributing a younger departure. The method never assigns ageing meaning to a wearable signal the science has not validated as ageing-relevant, and it always routes wearable interpretation through the DHM rather than reading raw device streams.
12.3  Wearable noise and confidence
Wearable data is information-rich but individually noisy, and its provenance and quality vary. The method inherits the confidence GSC-003 assigns to wearable-derived understanding, including any provenance or data-quality adjustment, so that a sustained trend from reliable, consistent data carries more ageing weight than a sparse or noisy one. Wearable contribution is thus both longitudinally-weighted (only sustained trends count) and confidence-weighted (reliable trends count more).
12.4  Continuous and high-frequency streams
Continuous, always-on wearable streams (for example, continuous cardiovascular or glucose monitoring where validated for ageing) present a specific consideration: they are effectively always fresh, so they must not gain disproportionate ageing influence merely by never being stale. The method requires that such streams enter with an explicit summarisation cadence in their GSC-008 longitudinal profile, so that their contribution reflects sustained ageing-relevant trend rather than the sheer volume of data. This keeps continuous streams consistent with the longitudinal mandate and is carried into the domain-extensibility procedure of Chapter 32.
13.  Lifestyle Contribution Methodology
Lifestyle — sustained behaviour, activity, sleep and nutrition patterns — is central to the Constitution’s vision of Biological Age as a demonstration of how long-term behaviour influences healthy ageing. This chapter defines its contribution.
13.1  Lifestyle as sustained pattern
Lifestyle contributes to Biological Age through durable, validated behavioural patterns — consistent physical activity, sustained sleep quality, long-term nutritional patterns and behavioural consistency — as the ageing science relates them to slower or faster biological ageing. Lifestyle is inherently longitudinal, so it fits the Biological Age method naturally: it is the accumulation of behaviour over months and years, not any single choice, that the estimate reads. The method consumes the DHM’s validated interpretation of these patterns and expresses their ageing-relevant direction as a departure.
13.2  Behavioural consistency is stabilising
Because behavioural consistency moves slowly and persistently, it acts as a stabilising anchor in the estimate, resisting transient fluctuation in faster domains. A person with a long, consistent record of ageing-favourable behaviour has a well-anchored estimate that a single difficult period cannot easily disturb — the methodological expression of the Constitution’s resilience principle at the lifestyle level.
13.3  Lifestyle informs, and is informed by, other domains
Lifestyle rarely contributes in isolation; its ageing relevance is often expressed through its validated effect on other domains — sustained activity improving cardiovascular and metabolic trends, sustained sleep reducing inflammation. The method respects these relationships by consuming already-interpreted understanding in which they are reflected, and it uses confidence and convergence (Chapter 17) to avoid double-counting a lifestyle factor and its downstream physiological consequences as independent ageing evidence.
13.4  Lifestyle science is never created here
Boundary.  Which lifestyle patterns influence biological ageing, and how, is validated science owned by the Scientific Configuration Library. GSC-002 consumes these relationships and expresses them as ageing departures; it never asserts a lifestyle–ageing relationship the science has not validated. Lifestyle also never enters as a moral judgement — only as validated physiological understanding.
14.  Recovery Contribution Methodology
Recovery — the body’s sustained physiological resilience and adaptive capacity — is both an ageing domain and a window onto biological resilience. This chapter defines its contribution to the estimate.
14.1  Recovery as sustained adaptive capacity
For Biological Age, recovery is read as sustained adaptive capacity over months — how well the body maintains and restores physiological resilience over time — rather than as day-to-day readiness, which belongs to the Health Score. A sustained decline in recovery capacity, corroborated across the relevant signals, can contribute an older ageing departure; a sustained improvement can contribute a younger one. The method consumes the DHM’s longitudinally-interpreted recovery understanding and expresses its sustained direction.
14.2  Recovery and resilience
Recovery is closely tied to biological resilience (Chapter 23): a person with strong sustained recovery capacity absorbs temporary perturbations without their Biological Age moving, whereas a sustained erosion of recovery capacity is itself an ageing-relevant signal. The method therefore reads recovery both as a contributing domain and as evidence of the resilience that governs how temporary disruptions are handled elsewhere in the estimate.
14.3  Recovery contributes only when sustained
Consistent with the longitudinal mandate, a single low-recovery period — after illness, travel or hard training — carries effectively no independent ageing weight. Only a sustained shift in recovery capacity, corroborated and durable, contributes materially. This prevents the estimate from mistaking a temporary training block or a stressful month for accelerated ageing, and it is enforced by the same sustained-evidence gate that governs every domain (Chapter 7).
15.  Longitudinal Trend Contribution
Longitudinal trend is not merely one domain among many for Biological Age — it is the axis along which the entire estimate is read. This chapter defines how trend contributes and how it is weighted, consuming the longitudinal-weighting methodology GSC-008 owns.
15.1  Trend is the substance of the estimate
Where the Health Score reads present state and treats trend as context, Biological Age reads trend as the substance of the estimate. The direction and persistence of change across every domain — sustained improvement or sustained deterioration relative to the expected trajectory — is what moves Biological Age. A domain’s contribution is therefore fundamentally a statement about its trajectory over time, not its latest value.
15.2  Longitudinal weighting is owned by GSC-008, consumed here
Ownership boundary.  How evidence is weighted over time — how sustained a trend must be to count, how recent and historical evidence are balanced, and the decay of relevance — is owned by GSC-008. GSC-002 consumes that longitudinal weighting and applies it to domain departures; it does not define the weighting curves. GSC-008 owns the weighting of evidence over time; GSC-002 owns how the composed estimate is permitted to move given already-weighted evidence. This is the same seam GSC-001 draws, and the two documents must not both claim it.
15.3  Sustained evidence before movement
The longitudinal-weighting policy consumed from GSC-008 is what operationalises the Constitution’s requirement that sustained evidence precede movement. A trend must persist and accumulate before it materially moves the estimate; an emerging trend is held tentatively, with low weight and lowered confidence, until it proves durable. This is the mechanism by which "speed of biology" is enforced at the level of evidence, complementing the sustained-evidence gate in the estimation form (Chapter 7).
15.4  Trend, not trajectory measurement, is owned here
GSC-002 reads trend as an input to the present estimate of ageing. It does not own the measurement of the person’s journey as a separate longitudinal product — the estimate is always a present best-estimate of biological age, informed by trend. The narrative of the journey over time (how the estimate has changed across years) is an explainability and delivery matter, drawing on the snapshot history ENG-001 records, not a separate methodology owned here.
16.  Cross-Domain Combination
The defining act of Biological Age is combining ageing departures from many systems into one estimate. This chapter defines the cross-domain combination methodology, consuming the weighting owned by GSC-004 and the conflict-aware fusion owned by GSC-009.
16.1  Combination is weighted, conditioned and bounded
The composed ageing departure is formed by combining each domain’s conditioned departure — already attenuated by longitudinal weight and confidence — under the dynamic weights supplied by GSC-004. The combination is bounded, so the estimate stays within the plausible range relative to chronological age defined in Chapter 22 and no single domain captures it; and it is reproducible, so the same conditioned departures and weights always yield the same estimate at a given method version. The combination honours the sustained-evidence gate, so transient departures do not move the composed estimate.
16.2  Weighting from GSC-004
The relative weight of each ageing domain is not decided here. GSC-002 consumes the dynamic, biologically-relevant weights that GSC-004 computes and applies them at the composition stage. This keeps weighting consistent across both derived indicators: the Health Score and Biological Age reason about domain relevance through one shared methodology rather than two divergent ones. GSC-002’s only requirement on those weights is that they be dynamic, ageing-relevance-driven, bounded and explainable, and that they reflect the ageing relevance of each domain rather than its present-health relevance.
16.3  Conflict-aware fusion from GSC-009
Where ageing domains genuinely conflict — one system ageing favourably while another ages adversely — the composition must not resolve the conflict by quiet averaging. GSC-002 consumes the conflict-aware fused view that GSC-009 governs, so that real cross-system disagreement is carried into the composition as genuine uncertainty rather than cancelled out. A conflicted ageing picture produces an estimate with lower confidence and an explanation that names the tension, rather than a confident-looking age that hides it. Resolving or representing the conflict is GSC-009’s responsibility; the estimate consumes that representation honestly.
16.4  The properties the combination must hold
Property
Why the method requires it
Weighted
A simple average would contradict the constitutional rejection of fixed weighting and dilute a decisive ageing system.
Longitudinally-gated
Only sustained departures may move the estimate; transient signals must not.
Confidence-aware
Uncertain departures must influence the estimate less than well-supported ones.
Bounded
The estimate must stay within a plausible range relative to chronological age; no single domain may capture it.
Conflict-honest
Genuine cross-system conflict must lower confidence, not vanish into a confident age.
Reproducible
The same understanding must always yield the same estimate at a given method version.

Combination in one line.  Condition each domain’s ageing departure by its longitudinal weight and confidence, weight the domains by ageing relevance from GSC-004, fuse them conflict-honestly via GSC-009, gate on sustained evidence, and combine under a bounded, reproducible rule into a single composed ageing departure and its overall confidence.
17.  Confidence Handling
The Constitution requires that confidence accompany every Biological Age estimate, so that two identical estimates built on very different evidence are honestly distinguished. This chapter defines how the estimate carries and responds to confidence, consuming the confidence methodology owned by GSC-003.
17.1  The estimate carries confidence
A Biological Age is never a bare number. It is an estimate accompanied by a confidence expressing how much the system trusts it, given the depth, duration, consistency and convergence of the longitudinal evidence behind it. Confidence is a first-class output, produced alongside the estimate and available to the narrative, the explanation and the delivery layer. The Constitution’s requirement that BioSense distinguish the estimated Biological Age from confidence in that estimate is honoured by making the estimate genuinely behave differently at different confidence levels.
17.2  Confidence is composed by GSC-003, consumed here
Ownership boundary.  The composition and calibration of confidence — how data-confidence, scientific-confidence and personal-fit combine, the convergence factor, the uncertainty penalty and the weakest-link rule — are owned by GSC-003. GSC-002 consumes the resulting confidence and defines how the estimate responds to it. It never defines a bespoke confidence of its own.
GSC-002 requires from GSC-003 a composed confidence for each domain departure and an overall composed confidence for the estimate, reflecting evidence depth and duration (a long longitudinal record earns more confidence than a single time-point), convergence across independent systems, and completeness of the domain set. Provenance of observations — measured versus inferred, including AI-generated observations — is a confidence input owned by GSC-003, which the estimate inherits rather than assuming parity.
17.3  How low-confidence estimates behave differently
They move even more cautiously.  Low confidence further damps the estimate’s already-slow movement, so an uncertain ageing signal does not shift the number until confidence accrues.
They claim less.  A low-confidence estimate is expressed with wider acknowledged uncertainty and is never presented as a precise age.
They lean on the most durable evidence.  When fast or sparse domains are uncertain, the estimate leans on the longest, most consistent longitudinal evidence, so it stays anchored.
They surface their limits.  The explainability record makes the uncertainty and its causes visible, so a person understands why the estimate is tentative and what would improve it.
17.4  Confidence and the overall estimate
The overall confidence reflects the confidences of the contributing domains, their convergence, the length and consistency of the longitudinal record, and the completeness of the domain set. An estimate built from many long, consistent, convergent domain records earns high confidence; one built from a single time-point or a short record earns low confidence. This allows two identical Biological Ages to be read honestly differently — precisely the distinction the Constitution requires — rather than collapsing them into an identical-looking number.
18.  Missing & Degraded Data
Real people have incomplete and irregular data, especially longitudinally. The estimate must degrade gracefully rather than break or mislead. This chapter defines how the method estimates from whatever ageing-relevant evidence is present, and how it communicates the resulting limits.
18.1  The graceful-degradation principle
The method produces a meaningful estimate from a partial set of domains and a partial longitudinal record, and it becomes more confident and complete as more evidence accrues — never failing because something is absent. A person with only longitudinal bloods, or only a wearable history, or a short record, still receives a Biological Age, honestly framed for what it could and could not see. Degradation lowers confidence and completeness; it never fabricates the missing evidence.
18.2  The specific missing cases
18.3  Missing is never neutral
The method never imputes a missing domain as if it were ageing exactly as expected, because that would silently invent a favourable trajectory. A missing domain contributes nothing and lowers completeness and confidence. This is the single most important discipline in degraded-data handling, inherited directly from GSC-001: the estimate would rather be honestly less confident than falsely complete.
18.4  Completeness as an explicit property
Alongside confidence, the estimate carries a completeness property — how much of the intended ageing-domain picture, over how long a record, was actually available. Completeness is reported in the explainability record (Chapter 25) so a person understands whether an estimate reflects rich longitudinal evidence or a thin one, and what would improve it. A low-completeness estimate invites the person to add data and time rather than to over-read the number.
19.  Behaviour When Domains Disagree
Ageing systems do not always move together: a person may show cardiovascular improvement alongside metabolic deterioration. The method must handle such disagreement honestly rather than averaging it into a falsely confident age.
19.1  Disagreement is represented, not hidden
When ageing domains disagree, the method does not silently pick a winner. It composes the conflicting departures under their weights, confidences and longitudinal weights, and it consumes the conflict-aware fused view GSC-009 governs so that genuine cross-system conflict is represented rather than laundered. The resulting estimate reflects a real tension in the ageing evidence, and the explainability layer surfaces which systems are ageing favourably and which adversely, rather than hiding the split behind a single number.
19.2  Disagreement lowers confidence
A conflicted ageing picture generally produces a more tentative estimate with lower confidence, which is the honest outcome. Where systems genuinely diverge, the method does not manufacture a confident age; it presents a wider-uncertainty estimate and an explanation that names the divergence. This is the same honest-uncertainty posture GSC-001 applies, adapted to ageing.
19.3  Persistent divergence is itself a signal
Sustained divergence between systems — one durably ageing faster than others — is not merely noise to be absorbed; it is an ageing-relevant signal in its own right, surfaced through the explainability record and available to the narrative. A person whose metabolic system is durably ageing ahead of their cardiovascular system benefits from understanding that split, which is exactly the education the Constitution requires every significant change to carry.
19.4  Within-domain conflict defers to the science
Where the conflict is within a single domain — two ageing-relevant signals of the same kind pointing opposite ways — the method defers to the Scientific Configuration Library and ENG-008 for how that scientific conflict is represented, since resolving it is a scientific matter the estimate must not usurp. The estimate consumes the resulting, possibly lower-confidence, understanding and reflects the increased uncertainty rather than manufacturing a confident reading from contradictory inputs.
20.  Positive Adaptation & Rejuvenation Detection
The Constitution makes Biological Age a demonstration that biological ageing can be influenced. Detecting genuine positive adaptation — a person ageing more slowly, or biologically rejuvenating — is therefore a core purpose of the method, and it must be done rigorously so that only real, sustained improvement is rewarded.
20.1  What positive adaptation is
Positive adaptation is a sustained improvement in ageing-relevant physiology relative to the expected trajectory: sustained cardiovascular improvement, improved metabolic markers, long-term reduction in inflammation, meaningful body-composition improvement, consistent exercise, improved sleep over many months, improved nutrition, or durable behavioural consistency. When such improvement is genuine and sustained, it contributes a younger departure and, over time, a lower Biological Age. This is the estimate delivering on its motivational purpose.
20.2  Rejuvenation requires convincing, sustained evidence
Constitutional requirement (1A §18.6).  Improvement in Biological Age must require convincing evidence. The engine must resist rewarding temporary improvement and instead recognise sustained physiological adaptation. A single good week, month or test never produces rejuvenation.
The method therefore gates rejuvenation on sustained, convincing, corroborated evidence. An emerging improvement is recognised tentatively — held at low weight and lowered confidence — and is allowed to move the estimate only as it proves durable across time and, ideally, across corroborating systems. This prevents the estimate from over-rewarding a burst of enthusiasm that does not last, while ensuring that genuine, consolidated improvement is reflected and celebrated.
20.3  Rejuvenation detection methodology
Rejuvenation is detected as sustained deviation of the person’s actual ageing-relevant movement below their expected trajectory, corroborated across the evidence and persistent over the timescale appropriate to each domain. The method reads the personal baseline, the expected trajectory and the population reference together (Chapter 10): genuine rejuvenation is movement that is both favourable relative to expectation and durable relative to the person’s own established trajectory. The detection inherits its sustained-evidence thresholds from the longitudinal weighting (GSC-008) and its confidence from GSC-003; the method defines the policy, not the numeric thresholds.
20.4  Positive adaptation is explained and attributed
Because every change should educate, detected positive adaptation is accompanied by attribution: which behaviours and systems appear to be reducing biological ageing, and which future opportunities exist. The method produces this attribution as part of the explainability record (Chapter 25); how it is communicated is owned by the narrative layer. Attribution is expressed as validated association, never as a causal or clinical claim.
21.  Negative Adaptation & Accelerated-Ageing Detection
Detecting genuine accelerated ageing is the counterpart to rejuvenation detection, and it carries a special duty of care: it must be rigorous, sustained-evidence-based, and framed to motivate rather than frighten, consistent with the Constitution’s insistence that Biological Age never create fear.
21.1  What negative adaptation is
Negative adaptation is a sustained deterioration in ageing-relevant physiology relative to the expected trajectory: sustained adverse cardiovascular or metabolic trends, long-term rising inflammation, adverse body-composition change, sustained inactivity, or durably worsening sleep. When such deterioration is genuine and sustained, it contributes an older departure and, over time, a higher Biological Age. The estimate must be willing to reflect genuine accelerated ageing — hiding it would fail the person — while never overstating it.
21.2  Deterioration requires sustained evidence
Constitutional requirement (1A §18.7).  Deterioration must also require sustained evidence. Temporary illness, travel, acute stress, short-term overtraining and a poor week of sleep should rarely produce substantial worsening. Temporary disruption should not become permanent ageing.
The method gates accelerated-ageing detection on sustained, corroborated evidence, exactly as it gates rejuvenation. An emerging deterioration is recognised tentatively and allowed to move the estimate only as it proves durable. This symmetry with positive adaptation is deliberate: the estimate is equally slow to record ageing as to record rejuvenation, so that neither direction is driven by transient events.
21.3  Accelerated-ageing detection methodology
Accelerated ageing is detected as sustained deviation of the person’s actual movement above their expected trajectory, corroborated and persistent. As with rejuvenation, the method reads the personal baseline, expected trajectory and population reference together, inherits its sustained-evidence thresholds from GSC-008 and its confidence from GSC-003, and defines the policy rather than the numeric thresholds. Genuine, durable accelerated ageing is reflected; transient perturbation is absorbed as resilience (Chapter 23).
21.4  Framed to motivate, never to frighten
Duty of care.  Detected accelerated ageing is surfaced as an educational, motivational signal — what appears to be accelerating ageing, and which opportunities exist to change it — never as a diagnosis or a source of fear. The estimate never asserts clinical risk. The methodology produces the finding and its attribution; the wellness-first framing of its communication is enforced by the AI Behaviour layer, which this document does not own but whose posture it respects.
21.5  Accelerated ageing never triggers safety on its own
Biological Age is a longitudinal, motivational estimate and is never a safety trigger. A rising estimate does not, by itself, invoke any escalation; the deterministic safety floor is owned entirely by ENG-010 and is driven by validated present findings, not by a slow-moving ageing estimate. The estimate may make an adverse trajectory visible, but it never sets, raises or substitutes for safety logic.
22.  Plateau, Ceiling & Floor Effects
A biological-age estimate must behave sensibly at the edges of its range and when a person’s physiology stops changing. This chapter defines plateau handling and the ceiling and floor effects that keep the estimate honest and bounded.
22.1  Plateau handling
A plateau occurs when a person’s ageing-relevant physiology stabilises — neither improving nor deteriorating relative to expectation — often after a period of change. The method handles a plateau by allowing the estimate to settle and hold: once change ceases, the estimate stops moving and reflects the new stable position, rather than continuing to drift on momentum. A plateau is a legitimate, common state and is never mistaken for either continued improvement or emerging deterioration. The estimate resumes movement only when sustained new evidence of change appears.
A plateau after improvement is a particularly important case: once a person has consolidated a gain, the method allows the improved state to become their established baseline (via the DHM), so the estimate does not endlessly reward a gain already banked, and future movement is read relative to the new, healthier trajectory. This mirrors the persistence-reset policy of GSC-001, effected in the Dynamic Health Model.
22.2  Ceiling effects
The estimate is bounded above so that it never expresses an implausible biological age or an unbounded penalty for adverse ageing. Plausibility is judged relative to chronological age, not only against an absolute human range: the estimate is limited to a bounded maximum acceleration beyond the person’s chronological age, so that a single extreme domain cannot push the estimate to a value implausible for that individual. As a person’s physiology departs further into an older-resembling profile, the estimate’s sensitivity saturates: additional deterioration continues to raise the estimate but with diminishing marginal effect. The ceiling keeps the estimate within a plausible range relative to chronological age and prevents alarming, non-credible outputs. The specific ceiling and saturation curve are configurable defaults owned by this document and tuned under Chapter 28.
22.3  Floor effects
Symmetrically, the estimate is bounded below, and again relative to chronological age rather than only to an absolute human range. However favourable a person’s ageing-relevant physiology, the method never expresses an implausibly young biological age or an unbounded rejuvenation: the estimate is limited to a bounded maximum reduction below the person’s chronological age, so that (for example) a seventy-year-old is never estimated at a biological age of twenty-five however good their profile. As physiology departs into a younger-resembling profile, sensitivity saturates so that additional improvement continues to lower the estimate with diminishing marginal effect, within that person-relative floor. This prevents the estimate from making non-credible claims that would undermine trust and breach the estimate-not-fact principle.
22.4  Boundaries are scientific and plausible, not arbitrary
Boundary rule.  The ceiling and floor express the plausible range of biological ageing relative to the person’s chronological age that the ageing science supports; they are not arbitrary caps chosen for presentation. Their values are configurable defaults, informed by the Scientific Configuration Library’s validated bounds where available, and tuned under governance. The estimate never presents a value the science could not plausibly support for a person of that chronological age.
23.  Biological Resilience
Resilience — the capacity of biology to absorb temporary disruption without lasting change — is the mechanism that most distinguishes Biological Age from a naive longitudinal average. The Constitution requires that temporary disruption not become permanent ageing; this chapter defines how resilience is realised.
23.1  Resilience as a first-class mechanism
The method treats resilience as a first-class property, not a side effect. Temporary perturbations — illness, travel, acute stress, short-term overtraining, a poor week or month of sleep — are absorbed rather than recorded as ageing, because biology demonstrably recovers from them. Equally, a brief favourable spell is absorbed rather than recorded as rejuvenation. Resilience is therefore symmetric: it protects the estimate from being moved by transient events in either direction, so that only durable physiological change alters Biological Age.
23.2  How resilience is realised
Resilience is realised through the same machinery that enforces the longitudinal mandate, applied deliberately: the sustained-evidence gate (Chapter 7) requires durability before movement; longitudinal weighting (GSC-008) discounts short-lived departures; and the adaptation methodologies (Chapters 20–21) recognise change only once it is corroborated and persistent. A temporary perturbation therefore never accumulates enough sustained weight to move the estimate before it resolves. The method does not need a separate "ignore this event" rule; resilience emerges from requiring sustained evidence.
23.3  Recovery capacity as measured resilience
Beyond absorbing perturbations, the method reads a person’s sustained recovery capacity (Chapter 14) as evidence of their resilience itself. Strong, sustained recovery capacity indicates a biology that absorbs disruption well; a durable erosion of recovery capacity is an ageing-relevant signal in its own right. Resilience is thus both a property of the method (how it handles transient events) and a property of the person (how well their biology adapts), and the estimate reflects the latter while embodying the former.
23.4  Resilience has limits
Resilience is not denial. When a "temporary" disruption proves not to be temporary — when a perturbation persists and becomes a sustained trend — the method must and does allow it to move the estimate. The distinction is duration and corroboration, not the label an event is given at onset. The method treats every departure as potentially transient until it proves durable, and potentially durable once it persists; resilience governs the former, adaptation governs the latter, and the boundary between them is the sustained-evidence threshold owned by GSC-008.
Founder principle (1A §18.7).  Temporary disruption should not become permanent ageing — and, symmetrically, temporary improvement should not become premature rejuvenation. Resilience protects the estimate in both directions, but never hides a disruption that has become durable.
24.  Stability Requirements
The Constitution requires Biological Age to move at the speed of biology, not the speed of data, and to reject rapid fluctuation. Stability is therefore a scientific requirement of the estimate, even more stringent than for the Health Score. This chapter defines the stability requirements and the mechanisms that meet them.
24.1  The stability mandate
Biological Age must change slowly and smoothly, moving only on sustained, convincing evidence and never on transient events. It must not fluctuate day to day or week to week; meaningful movement should require months or years of evidence. This is a stricter mandate than the Health Score’s gradual-change requirement, reflecting that biological ageing itself is slower than present-health change. Stability here is a scientific commitment, not merely a presentation preference.
24.2  The mechanisms of stability
24.3  Ownership of temporal state
As in GSC-001, the stability mechanisms operate on temporal state — the previous estimate, its direction and any smoothing memory — which is held and evolved by the Dynamic Health Model and its query engine (ENG-001) and supplied to the method as an input. GSC-002 defines only the damping, gating and smoothing policy that operates on it. The estimate is therefore a pure function of present understanding, the supplied prior state and the pinned versions, which keeps the stability mechanisms compatible with the reproducibility guarantee of Chapter 7.5.
24.4  Stability is not denial of change
Stability must not become inertia. Genuine, sustained, convincing change must move the estimate — a person who has truly aged faster, or genuinely rejuvenated, must see it over the appropriate timescale. The stability mechanisms suppress noise and transient events, not signal. The method is calibrated (Chapter 28) to sit at the honest point between a jittery estimate that moves on noise and an inert one that hides real ageing, biased deliberately toward slowness because biology is slow.
25.  Explainability
The Constitution makes explainability a requirement, not a feature: Biological Age should never become a mysterious algorithm, and every significant change should teach something meaningful. This chapter defines the explainability the method must produce.
25.1  Explainability is constitutionally required
The method produces, alongside every estimate, a structured explanation sufficient to answer the questions the Constitution names: why the estimate exists, which physiological systems contributed most, which observations carried greatest influence, which uncertainties remain, and which future information could improve confidence. This explanation is a methodological output — a set of fields Engineering populates — not a piece of prose; how it is turned into calm, educational language is owned by the AI Behaviour and delivery layers (ENG-005), which GSC-002 does not touch.
25.2  The questions every estimate must answer
Why does the estimate exist, and what is it?  That Biological Age is an estimate of ageing relative to expectation, with its current value and confidence.
Which systems contributed most?  Which ageing domains drove the estimate, with the direction (younger or older) and magnitude of each.
Which observations carried greatest influence?  Which sustained trends and validated findings most shaped the estimate.
What is reducing ageing, and what is accelerating it?  The favourable and adverse contributions, so the person understands both directions.
How confident is it, and what is uncertain?  The overall confidence, its main drivers, and where the evidence is weak, short or conflicting.
What future information would improve it?  Which additional data or elapsed time would raise confidence or sharpen the estimate.
Why did it change?  For a moved estimate, which sustained changes since the previous estimate are responsible.
25.3  The explainability record
For every estimate, the method produces a structured explainability record containing, at minimum: the estimated Biological Age and its overall confidence; the completeness and length of the longitudinal record; each domain’s signed departure (younger or older) with its confidence and longitudinal weight; the ranked dominant contributors; the favourable and adverse drivers separately; the change since the previous estimate decomposed by domain; the domains absent or short on history; the principal uncertainties; and the future information that would most improve the estimate. From this record the delivery layer can construct any explanation and any educational message a person needs, without the method anticipating the wording.
Record field
What it captures
Constitutional question served
Estimate & confidence
The Biological Age and its overall confidence.
Estimate vs confidence in it (§18.8).
Record depth
How long and complete the longitudinal record is.
Which uncertainties remain (§18.9).
Domain departures
Each domain’s younger/older departure, with confidence and weight.
Which systems contributed most (§18.9).
Dominant contributors
The ranked systems that most shaped the estimate.
Which observations carried greatest influence (§18.9).
Favourable vs adverse
What is reducing vs accelerating ageing.
Educate on both directions (§18.10).
Change decomposition
The sustained changes responsible for movement.
Every change teaches something (§18.10).
Absent/short domains
Domains missing or short on history.
Which future information would help (§18.9).
Improvement opportunities
What data or time would improve the estimate.
Future opportunities (§18.10).
25.4  Explainability and confidence are inseparable
An explanation that reported contributions without their confidence would mislead. The method always pairs attribution with confidence and uncertainty, so a person is told not only which systems drove the estimate but how sure the system is about each. This keeps the estimate honest and educational rather than authoritative, and it is what prevents Biological Age from ever becoming the mysterious algorithm the Constitution forbids.
26.  Relationship to the Health Score (GSC-001)
Chapter 3 established the conceptual separation of the two indicators. This chapter fixes the architectural relationship, so GSC-001 and GSC-002 remain complementary, non-duplicative and non-contradictory throughout their joint lifetime.
26.1  Shared dependencies, distinct methods
Both indicators consume the same governing methodologies — GSC-004 (weighting), GSC-003 (confidence), GSC-008 (longitudinal weighting) — and both are computed by ENG-001 from Dynamic Health Model understanding. They differ only in how they use those shared dependencies: the Health Score weights domains for present-health relevance and reads present state; Biological Age weights domains for ageing relevance and reads sustained trajectory. Sharing the dependencies is deliberate and prevents the two indicators from drifting apart on weighting or confidence philosophy.
26.2  No shared method, no coupling
The reciprocal decoupling.  Neither indicator is an input to the other, and neither shares the other’s method. This is stated identically in GSC-001 Chapter 20 and here. Any future change to the relationship must be made in both documents together, under governance, so they can never diverge.
26.3  Consistency expectations
The two indicators should be broadly consistent over the long run — durably poor present health tends to accompany accelerated ageing — but short-term consistency is neither required nor expected. A person can have a temporarily depressed Health Score (a rough month) with an unchanged Biological Age, or an improving Biological Age (consolidating a year of good habits) with a Health Score that reflects a passing illness. These are not contradictions; they are the two indicators correctly answering their different questions. The method never adjusts Biological Age to agree with the Health Score, or vice versa.
26.4  Division of explanatory labour
When both indicators are shown together, the Health Score explains how the person is doing now and Biological Age explains where their trajectory is heading. The explainability records of the two documents are designed to complement rather than duplicate: the Health Score attributes present state; Biological Age attributes sustained trajectory and its drivers. The narrative layer composes them into one coherent story, but the two methodologies produce distinct, non-overlapping explanatory material.
27.  Failure Modes & Safeguards
A methodology this consequential must anticipate how it could go wrong and specify the safeguard in each case. None of these safeguards is optional; together they define what it means for the estimate to behave responsibly.
27.1  Reacting to transient events
Failure mode.  A temporary illness, travel or hard month moves the estimate, recording ageing that is not real.
Safeguard.  Sustained-evidence gating, longitudinal weighting and resilience (Chapters 7, 15, 23) absorb transient events; only durable, corroborated change moves the estimate.
27.2  Rewarding unsustained improvement
Failure mode.  A brief burst of good behaviour produces premature rejuvenation.
Safeguard.  Rejuvenation is gated on sustained, corroborated evidence (Chapter 20); emerging improvement is held tentatively until durable.
27.3  Presenting the estimate as fact
Failure mode.  Biological Age is displayed as a precise, certain measurement rather than an estimate.
Safeguard.  The estimate always carries confidence (Chapter 17), is always framed as an estimate (Chapter 2), and is bounded to plausible values (Chapter 22). The Constitution’s estimate-not-fact principle is enforced structurally.
27.4  Creating fear
Failure mode.  Accelerated-ageing detection alarms or frightens the person.
Safeguard.  Adverse findings are framed as motivational and educational, never diagnostic (Chapter 21); the estimate never triggers safety (Chapter 21.5) and never asserts clinical risk.
27.5  Silent imputation of missing data
Failure mode.  A missing domain is treated as ageing exactly as expected, inventing a favourable trajectory.
Safeguard.  The missing-is-not-neutral rule (Chapter 18) forbids imputation; missing domains lower confidence and completeness.
27.6  Normalising slow decline
Failure mode.  A personal baseline that re-references to a slowly declining state normalises genuine accelerated ageing.
Safeguard.  The dual reference (Chapter 9) anchors against the population reference and expected trajectory, and surfaces sustained divergence through confidence and explainability, so uniform slow decline is not silently absorbed.
27.7  Inventing ageing science
Failure mode.  The method assigns ageing meaning to a marker or behaviour the science has not validated.
Safeguard.  All ageing relevance is consumed from the Scientific Configuration Library (Chapters 6, 8, 10, 11, 13); the method never creates, extends or reinterprets ageing science.
27.8  Duplicating or contradicting a dependency
Failure mode.  The method redefines weighting, confidence or longitudinal weighting and diverges from GSC-004/003/008.
Safeguard.  Those methodologies are consumed, never redefined (Chapters 15, 16, 17); regression protection (Chapter 28) guards against incompatible dependency changes.

The safeguard principle.  Every way the estimate could mislead — reacting to transients, rewarding unsustained change, over-claiming certainty, frightening, imputing, normalising decline, inventing science, or contradicting a dependency — has a named, non-optional safeguard. Honest, slow, educational ageing estimation is engineered in, not hoped for.
28.  Validation & Calibration Philosophy
An estimate people rely on must be validated, calibrated and reproducible, and able to be recalibrated as ageing science advances. This chapter defines the validation and calibration philosophy — the discipline, not the executable tests, which Engineering implements.
28.1  What calibration means for Biological Age
Calibration ensures that a given Biological Age means broadly the same thing across people and over time, that its confidence is honest, and that its movement tracks genuine ageing rather than noise. Because Biological Age is an estimate rather than a clinical prediction, calibration is against internal consistency, the correspondence between stated confidence and realised reliability, the plausibility of the estimate against validated ageing science, and the requirement that the estimate move only on sustained evidence. Confidence calibration itself is owned by GSC-003; GSC-002 calibrates how the estimate uses it.
28.2  Calibration philosophy
Calibrate against the ageing science.  The mapping from composed departure to Biological Age is calibrated so that estimates are plausible and consistent against validated ageing expectations, never implying more precision than the science supports.
Calibrate stability against noise.  The sustained-evidence thresholds and damping are tuned so the estimate is as responsive as genuine ageing allows while remaining immovable by transient events — biased toward slowness.
Calibrate confidence honesty.  Stated confidence is checked (via GSC-003) against how reliably estimates of that confidence held up as more longitudinal evidence arrived.
Calibrate without changing science.  Calibration adjusts the method’s configuration, never the validated ageing science it consumes. A recalibration never reinterprets a biomarker or an ageing relationship.
28.3  Testing philosophy
The method is specified so Engineering can test it rigorously: reference cases whose expected ageing behaviour is known; longitudinal simulations confirming that transient events do not move the estimate while sustained trends do; stability tests confirming the estimate does not fluctuate on noise; boundary tests confirming plausible ceiling and floor behaviour; and regression suites guarding against unintended movement when the method or a dependency changes. Testing verifies that the method behaves as specified; the properties it verifies — sustained-evidence gating, resilience, boundedness, honest confidence, graceful degradation, reproducibility — are defined here.
28.4  Reproducibility
Every estimate must be reproducible: the same validated understanding, together with the same ENG-001-supplied prior state, at the same method version, the same dependency versions and the same Scientific Configuration Library science version, must always yield the same estimate and the same explanation. Reproducibility is guaranteed by the method being deterministic given its inputs and pinned versions, and by ENG-001 recording the method version, dependency versions, the Library science version and prior state on every snapshot and its Confidence Object. Because prior state and the Library science version are recorded, a slow-moving, path-dependent estimate remains fully reproducible; the history that produced it is part of the audited input, not a hidden variable.
28.5  Future recalibration
The method is expected to be recalibrated over its lifetime as the ageing science matures, as validated ageing biomarkers and clocks become available, as the user population grows, and as the dependency methodologies (GSC-003, GSC-004, GSC-008) evolve. Recalibration is a governed change to configuration (Chapter 29) producing a new method version. Because estimates pin to the method version and the Library science version that produced them, recalibration never silently rewrites past estimates; it changes future estimation while preserving the reproducibility and explanation of past estimates.
29.  Governance & Versioning
GSC-002 is governed with the same discipline as GSC-000, GSC-001 and the Scientific Configuration Library, inheriting the governance model of the Global Scientific Configuration Architecture without alteration.
29.1  Versioning
The Biological Age methodology carries a method version — the BIOLOGICAL_AGE_METHOD_VERSION that ENG-001 records on every computed snapshot and its Confidence Object. Every material change to the methodology or its configurable defaults produces a new method version with a publication date, a change summary, a rationale, and a record of affected consumers and expected behavioural impact. Because estimates also depend on the population and trajectory references, the Scientific Configuration Library science version is recorded alongside the method version. Historical versions are retained permanently, so any past estimate remains reproducible against the exact method and Library science version that produced it.
29.2  Ownership
This document is owned by the BioSense Scientific and Data-Science Authoring function, responsible for the methodology, its configurable defaults and its calibration. Engineering owns the implementation that executes the method. The Scientific Configuration Library owns the ageing science the method consumes, including the population and trajectory references. These ownerships are distinct and must not blur: a change to the method is not a code change, and a change to the ageing science is not a method change.
29.3  Founder approval and scientific review
Material changes to the methodology — anything that changes how the estimate is composed, referenced, gated, bounded or calibrated in a way that alters estimates or their confidence — take effect only on written approval by the designated authority, recorded with the approving identity and date. Because the estimate is consumed by users as a reflection of their ageing, changes that affect how it reads or how confident it appears undergo documented scientific review, and any change touching areas the medical advisory function oversees is reviewed by that function. The method may never be changed in a way that would cause it to imply clinical claims, create fear, or present itself as fact.
29.4  Engineering implementation & regression protection
Approved changes are implemented by ENG-001 as a new method version, never by ad-hoc adjustment of a running system. Every change is accompanied by regression protection: the reference, longitudinal, stability and boundary suites of Chapter 28 must continue to hold, so a change intended to improve one behaviour cannot silently degrade another. A change that fails regression is not released.
29.5  Backward compatibility & audit
Estimates pin to the method version and the Library science version that produced them, so past estimates and their explanations are never silently rewritten by a later version. The change log and audit history record every version, its rationale and its approver, so the evolution of the methodology is fully traceable. A person’s historical Biological Age is a fact about what BioSense estimated then, and the governance model protects it as such.
29.6  Interaction with Engineering
Responsibility
GSC-002 (method)
ENG-001 §7.8 (engine)
Define estimation framework & references-usage
Yes
No
Own configurable defaults & calibration
Yes
No
Execute computation & caching
No
Yes
Record method version & Library science version on snapshots
Defines the method version
Records method, dependency & science versions
Hold and evolve prior state
Defines the policy
Holds the state
Guarantee reproducibility
Specifies the requirement
Implements it
Change under governance
Owns the methodology change
Implements the approved change
29.7  Amendment procedure
Amendments follow the GSC-000 procedure: a written proposal identifying the change and its rationale; classification as editorial, configuration-material or architecture-level; scientific and, where relevant, medical-advisory review for material changes; ratification by the designated authority; and publication under version control with superseded versions archived, never deleted. The methodology changes only through this procedure, and never through convenience, silence or engineering expedience.
30.  Developer Handover & Implementation Summary
This chapter gives an engineering team what it needs to implement Biological Age without inventing scientific logic. It summarises the method as an implementation sequence, states the architectural ownership, and lists the dependencies and contracts the engine must honour. It defines consumption, not code.
30.1  Implementation summary
The Biological Age Engine (ENG-001 §7.8) implements the method by executing the following sequence for each estimate, reading configuration and science rather than inventing them:
Step 1.  Retrieve the person’s validated ageing-relevant understanding per domain from the Dynamic Health Model (never raw observations).
Step 2.  For each domain, express a signed departure from the expected ageing trajectory, using the population reference and expected trajectory consumed from the Scientific Configuration Library and the personal baseline consumed from the DHM.
Step 3.  Condition each departure by its longitudinal weight (GSC-008) and confidence (GSC-003), applying the fixed multiplicative order defined in the estimation framework.
Step 4.  Apply the sustained-evidence gate so only durable departures contribute materially.
Step 5.  Combine the conditioned departures under dynamic ageing-relevance weights (GSC-004), honouring the conflict-aware fused view (GSC-009), into a composed ageing departure.
Step 6.  Map the composed departure to an estimated Biological Age within the plausible bounded range (ceiling/floor), applying the canonical estimation form.
Step 7.  Attach the overall confidence (GSC-003) and produce the explainability record.
Step 8.  Record BIOLOGICAL_AGE_METHOD_VERSION, dependency versions, the Library science version and prior state on the snapshot and its Confidence Object; cache under version-keyed invalidation.
30.2  Architectural ownership at a glance
Concern
Owner
GSC-002 role
Ageing science, references, trajectory
Scientific Configuration Library / ENG-008
Consume; never define.
Cross-domain weighting
GSC-004
Consume ageing-relevance weights.
Confidence composition & calibration
GSC-003
Consume; define response.
Longitudinal weighting
GSC-008
Consume; define permitted movement.
Evidence fusion / conflict
GSC-009
Consume fused view.
Computation, caching, prior state
ENG-001 §7.8
Define method & policy.
Safety floor
ENG-010
Never touch.
Narrative & framing
ENG-005
Provide record; never write words.
The estimation method itself
GSC-002 (this document)
Own in full.
30.3  Contracts the engine must honour
Version pinning.  Every snapshot records the method version, dependency versions, the Library science version and prior state, guaranteeing reproducibility.
Interpreted inputs only.  The engine consumes DHM understanding, never analysing observations independently.
Estimate, not fact.  Every output carries confidence and is bounded to plausible values; no output is presented as measured truth.
No safety, no recommendation.  The estimate never triggers safety and never issues recommendations.
Explainability record.  Every estimate is accompanied by the structured record of Chapter 25.
30.4  What the engineering team does not decide
The team implements the method exactly as specified and decides none of the following: which domains are ageing-relevant (science), the weighting values (GSC-004), the confidence composition (GSC-003), the longitudinal-weighting curves (GSC-008), the population and trajectory references (science), or the framing of the output (AI Behaviour). Where a configurable default is named in this document, it is tuned under governance (Chapter 29), not chosen by implementation. If any required scientific logic appears to be missing, the correct response is to raise it with the method owner, never to invent it.
31.  Constraints & Scope Boundaries
This chapter restates, as binding constraints, the boundaries that keep GSC-002 compliant with GSC-000, GSC-001 and the Constitution.
31.1  What GSC-002 does not do
It does not compute.  All calculation, caching and snapshotting are performed by ENG-001 §7.8. This document contains no software code.
It does not invent or reinterpret science.  All ageing science, references and trajectories are consumed from the Scientific Configuration Library; the method never creates, changes or overrides an ageing fact.
It does not own weighting, confidence or longitudinal weighting.  Those belong to GSC-004, GSC-003 and GSC-008; GSC-002 consumes them.
It does not estimate present health.  Present health is owned by GSC-001; Biological Age owns only the ageing question.
It does not recommend.  What to surface is owned by GSC-005; the estimate reflects ageing and issues no recommendations.
It does not resolve cross-domain conflict.  That is owned by GSC-009; the estimate consumes the conflict-aware fused view.
It does not set safety.  The deterministic safety floor is owned by ENG-010 and is never a function of the estimate.
It does not write narrative or UI.  How the estimate is expressed and framed is owned by AI Behaviour and delivery (ENG-005).
It does not diagnose or invent coefficients.  The estimate is a wellness-first, educational construct; it defines no scoring coefficients, algorithms or implementation code.
31.2  What GSC-002 does own
Within those boundaries, GSC-002 owns exactly one thing and owns it completely: the named, versioned method by which validated understanding across ageing-relevant domains becomes a single, slow-moving, explainable, confidence-bearing estimate of biological ageing — its scientific philosophy, its estimation framework, its use of population and personal references and the expected trajectory, its per-domain contribution methodologies, its treatment of confidence, missing data and disagreement, its positive and negative adaptation and rejuvenation and accelerated-ageing detection, its plateau, ceiling and floor behaviour, its resilience and stability, its explainability, and its validation, calibration and governance. Everything the estimate is, as a method, is defined here; everything the estimate does, as a computation, is performed elsewhere.
31.3  Compliance statement
This document complies with GSC-000, GSC-001 and the Constitution in full.  It respects the constitutional hierarchy, the layer boundaries, and the ownership of Engineering, the Scientific Configuration Library, AI Behaviour and deterministic safety. It positions Biological Age as configuration and methodology at Level 3.5, consumed by Engineering, consumes its dependencies without duplicating their ownership, mirrors the reciprocal boundary GSC-001 sets, creates no science and overrides no safety.
32.  Future Extensibility
Biological Age must remain valid as ageing science advances and new data classes arrive. This chapter defines how the method grows without restructuring.
32.1  Domains are an open, governed set
Because the method composes over ageing domains rather than named markers or devices, new validated ageing science enters by populating existing or new domains, not by changing the framework. A candidate ageing domain is admitted only where it has a coherent physiological meaning distinct from existing domains, a characteristic ageing timescale, and validated ageing-relevant interpretation in the Scientific Configuration Library. It enters with an explicit GSC-004 weighting profile and GSC-008 longitudinal profile, is regression-tested against existing estimates, and is admitted as a material, versioned change under Chapter 29.
32.2  New ageing biomarkers and clocks
The validated-ageing-biomarkers domain (§6.2.10) is deliberately open so that emerging ageing biomarkers and dedicated ageing clocks — once validated by the Scientific Configuration Library — enter the estimate through the science rather than through a framework change. A validated ageing clock becomes a contributing signal weighted for its ageing relevance like any other, never a replacement for the multi-system method the Constitution requires. The method is designed so that no single clock, however powerful, can become the sole determinant of Biological Age.
32.3  New data classes
Continuous streams (continuous glucose, continuous cardiovascular monitoring), high-dimensional modalities (imaging, ECG), and future classes (genetics, microbiome, environmental exposures, clinician inputs) are accommodated on the same terms as in GSC-001: stable predispositions such as genetics inform the reference and personalisation rather than contributing as a present-trajectory domain; exposures inform expected trajectory; episodic modalities contribute through the validated understanding they produce; and continuous streams enter with an explicit summarisation cadence so they do not gain influence merely by never being stale. Each is routed through validated science before it can contribute. A fixed, high-certainty predisposition input such as genetics informs the reference against which departure is measured, but it does not, by its own permanence and certainty, raise confidence in the longitudinal estimate: confidence in a moving estimate depends on sustained observed evidence of movement, not on an unchanging input, so a genetically-informed reference never makes a thinly-evidenced trajectory appear better supported than it is.
32.4  Extensibility never weakens the invariants
Extensibility rule.  No extension may weaken the method’s invariants: multi-system emergence, sustained-evidence movement, estimate-not-fact, resilience, explainability and the never-touch boundaries. A new domain, biomarker or data class is admitted only if the estimate continues to honour all of them.
33.  Design-Decision Register
This register records the principal methodological decisions in GSC-002, each with the alternative considered and the reason for the choice, so future stewards can revisit a decision deliberately rather than by accident.
33.1  Departure from expected ageing, not an absolute score
Decision.  Each domain contributes a departure from the expected ageing trajectory, expressed ultimately as an age in years.
Alternative considered.  Producing an abstract ageing score on an arbitrary scale.
Rationale.  Biological Age must be an age to be meaningful and motivational. Departure-from-expectation is what makes the output an age rather than a rating, and it aligns with the Constitution’s definition (§18.1).
33.2  Dual reference (population + personal)
Decision.  The estimate uses a population reference for absolute age-equivalence and a personal baseline for individual movement, surfacing sustained divergence.
Alternative considered.  Population reference alone, or personal baseline alone.
Rationale.  Population-only loses individual sensitivity; personal-only can normalise slow decline. The dual reference — proven in GSC-001 — gives both absolute meaning and honest individual movement.
33.3  Sustained-evidence gating as the core stability mechanism
Decision.  Only durable, corroborated departures move the estimate; transient events are absorbed.
Alternative considered.  Tracking the latest composed departure for responsiveness.
Rationale.  The Constitution requires movement at the speed of biology (§18.5) and treats temporary disruption as resilience (§18.7). Gating on sustained evidence is the direct expression of both.
33.4  Symmetric resilience
Decision.  Temporary disruption is not recorded as ageing, and temporary improvement is not recorded as rejuvenation.
Alternative considered.  Absorbing only adverse transients (protecting against fear) while rewarding favourable ones quickly.
Rationale.  Asymmetry would bias the estimate optimistically and violate the even-handed sustained-evidence requirement (§18.6–§18.7). Symmetry keeps the estimate honest in both directions.
33.5  Estimate always carries confidence and is bounded
Decision.  Every estimate carries composed confidence and is bounded to a plausible range relative to chronological age.
Alternative considered.  Presenting a single precise number for simplicity.
Rationale.  The Constitution requires estimate-not-fact and confidence alongside every estimate (§18.3, §18.8). Confidence and bounding enforce this structurally.
33.6  Multi-system emergence; no single determinant
Decision.  Biological Age emerges from multiple domains; no single biomarker, clock or device determines it.
Alternative considered.  Adopting a single validated ageing clock as the estimate.
Rationale.  The Constitution requires multi-system emergence (§18.4). A single clock, however good, would make the estimate fragile and reductive; clocks contribute as weighted signals.
33.7  Temporal state owned by ENG-001; method owns policy
Decision.  Stability and adaptation operate on prior state held by ENG-001; GSC-002 defines only the policy.
Alternative considered.  The method holding its own history for self-containment.
Rationale.  Consistent with GSC-001 and GSC-000: the method holding state would duplicate DHM ownership and make the estimate non-reproducible-as-stated. State in ENG-001, recorded on snapshots, preserves reproducibility.
33.8  Never a safety trigger
Decision.  A rising Biological Age never invokes escalation; safety is owned by ENG-010 and driven by present findings.
Alternative considered.  Using accelerated ageing as an early-warning safety signal.
Rationale.  Biological Age is slow, motivational and educational; wiring it to safety would both create fear and usurp ENG-010. Safety must be driven by validated present findings, not a longitudinal estimate.
33.9  Sustained-evidence-gate thresholds owned by GSC-008
Decision.  The gate’s durability thresholds (how sustained a trend must be) are consumed from GSC-008; GSC-002 owns the gate as a policy and its mapping-side defaults.
Alternative considered.  Owning the gate thresholds within GSC-002 for self-containment.
Rationale.  Owning them here would duplicate GSC-008’s ownership of evidence-over-time weighting and could let the two documents diverge on the method’s central stability parameter. Consuming them keeps a single owner, consistent with the GSC-001/GSC-008 seam.
33.10  Chronological age as the low-confidence prior
Decision.  Absent sufficient evidence, the estimate defaults toward chronological age at low confidence and departs only as sustained evidence accrues; ceiling and floor are plausible departures relative to chronological age.
Alternative considered.  Defaulting sparse-evidence estimates toward a population mean, or bounding only against an absolute human range.
Rationale.  Chronological age is the honest prior with no evidence of departure, makes the largest (sparse-evidence) population buildable to a single interpretation, keeps bounds person-plausible, and reinforces estimate-not-fact.
34.  Glossary of Methodological Terms
These terms carry specific meanings within this methodology, collected here for a shared vocabulary across Engineering and future stewards.
Biological Age  — A single, bounded, explainable, confidence-bearing estimate of how a person’s physiology is ageing relative to expectation for their chronological age; an estimate, never a measured fact.
Ageing domain  — A grouping of validated ageing-relevant understanding sharing a physiological meaning and characteristic ageing timescale; the unit the estimate reasons about and GSC-004 weights.
Ageing departure  — A signed, bounded quantity expressing how far a domain’s ageing-relevant reading departs from the expected ageing trajectory — younger (negative) or older (positive) — conditioned by confidence and longitudinal weight.
Material (departure)  — A departure significant enough to move the estimate through the sustained-evidence gate. Materiality is a function of the departure’s magnitude, its confidence and its sustained duration; the magnitude-and-confidence threshold is owned by GSC-004 (weighting) and the durability component is consumed from GSC-008, consistent with GSC-001. GSC-002 does not define the threshold value.
Corroborated  — Supported by agreement across independent markers, systems or time-points, with genuine independence assessed by GSC-003 (so correlated views of the same measurement do not count as corroboration). Rejuvenation and accelerated-ageing detection require corroboration before the estimate moves.
Population reference  — The expected physiological profile, per domain, for a person of a given chronological age and context; consumed from validated ageing science, used only to express relative departure, never as a clinical claim.
Personal baseline  — The person’s established ageing-relevant physiology and trajectory (Biological Identity), owned by ENG-001 and consumed by the method; governs sensitivity to individual change.
Expected ageing trajectory  — The scientifically-expected path of a person’s ageing-relevant physiology over time; consumed from the Scientific Configuration Library; the reference against which sustained deviation is read.
Dual reference  — The joint use of the population reference (absolute age-equivalence) and the personal baseline/trajectory (individual movement), with sustained divergence surfaced rather than normalised.
Sustained-evidence gate  — The methodological requirement that only durable, corroborated departures move the estimate, enforcing the Constitution’s "speed of biology" and resilience principles.
Resilience  — The method’s absorption of temporary perturbations (in both directions) so that only durable change moves the estimate; also the person’s own sustained adaptive capacity, itself an ageing signal.
Positive adaptation / rejuvenation  — Sustained improvement in ageing-relevant physiology relative to expectation, gated on convincing evidence, contributing a younger departure over time.
Negative adaptation / accelerated ageing  — Sustained deterioration relative to expectation, gated on sustained evidence, contributing an older departure, framed to motivate and never to frighten.
Plateau  — A state in which ageing-relevant physiology has stabilised; the estimate settles and holds rather than drifting on momentum.
Ceiling / floor effects  — The bounded, saturating behaviour that keeps the estimate within a plausible range relative to chronological age at both extremes.
Method version  — The named, versioned identifier (BIOLOGICAL_AGE_METHOD_VERSION) of the methodology that produced an estimate; recorded by ENG-001 on every snapshot with dependency versions, the Library science version and prior state.
Prior state  — The temporal state (previous estimate, direction, smoothing memory) supplied by ENG-001 on which stability and adaptation operate; held by ENG-001, not the method; recorded for reproducibility.
Reproducibility  — The property that the same understanding, supplied prior state, method version, dependency versions and Library science version always yield the same estimate and explanation.
35.  Completion
GSC-002 defines the complete scientific methodology of BioSense Biological Age: its scientific philosophy and the longitudinal question it answers; its deliberate separation from the Health Score; its architectural position and the seam with the Biological Age Engine; the constitutional and scientific foundations it consumes; the ageing domains; the estimation framework; the population reference, personal baseline and expected ageing trajectory; the biomarker, wearable, lifestyle, recovery and longitudinal-trend contribution methodologies; cross-domain combination; confidence, missing-data and disagreement handling; positive and negative adaptation with rejuvenation and accelerated-ageing detection; plateau, ceiling and floor effects; biological resilience; stability; explainability; the relationship to the Health Score; failure modes; validation and calibration; governance; the developer handover; and the scope, extensibility, design decisions and glossary under which the method lives and evolves.
No software code, prompt logic, user-interface behaviour or scoring coefficients have been defined, by design. Every calculation is performed by ENG-001 §7.8, executing this named, versioned method and recording its version on every snapshot. The method consumes validated ageing science and never creates it, consumes weighting, confidence and longitudinal weighting from GSC-004, GSC-003 and GSC-008, references GSC-009 and GSC-001 without duplicating their ownership, mirrors the reciprocal boundary GSC-001 sets, and overrides neither AI Behaviour nor the deterministic safety floor. It complies with GSC-000, GSC-001 and the Constitution in full.

Status
Version 1.0 — Ready for Freeze.

END OF GSC-002

