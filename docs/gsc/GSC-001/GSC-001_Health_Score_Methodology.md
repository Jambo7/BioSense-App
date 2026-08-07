BioSense
Engineering Library · Global Scientific Configuration
GSC-001
Health Score Methodology
The governed method by which validated science becomes a single measure of present health
Document ID  GSC-001
Version  1.0 (Freeze Candidate — Pre-Freeze Revision applied)
Status  Ready for Founder Review
Layer  Global Scientific Configuration (Level 3.5) — methodology consumed by Engineering
Authority  BioSense Intelligence Constitution (1A–1C) and GSC-000; subordinate to the Canonical Scientific Library
Consumes  GSC-004 (weighting), GSC-003 (confidence), GSC-008 (freshness); references GSC-005, GSC-006, GSC-009
Executed by  ENG-001 Health Score Engine (HEALTH_SCORE_METHOD_VERSION), grounded in ENG-008
Owner  BioSense Scientific & Data-Science Authoring (Origin BioSense Technologies FZCO)
Classification  Confidential — Internal Engineering Specification
Revision note  This freeze candidate incorporates the accepted findings of the independent Pre-Freeze Architectural Review: reproducibility reconciled with temporal state, baseline ownership clarified, a dual-reference drift safeguard, a named canonical composition form, a governed domain-extensibility procedure, and supporting terminology. No structure or scope was changed.
This document defines methodology, weighting philosophy, configuration, calibration philosophy, mathematical framework and governance. It contains no software code, no prompt logic and no user-interface behaviour. Every calculation is performed by Engineering (ENG-001). This document consumes validated science; it never creates, reinterprets or overrides it.

Contents
1.  Purpose, Status & How to Read This Document
2.  The Philosophy of the Health Score
3.  Architectural Position & the GSC-000 Boundary
4.  Constitutional & Scientific Foundations
5.  The Scoring Domains
6.  The Mathematical Framework
7.  Weighting Philosophy & Hierarchy
8.  Domain Contribution Methodology
9.  Positive & Negative Evidence
10.  Confidence Integration
11.  Freshness & Recency Integration
12.  Cross-Domain Combination
13.  Personalisation
14.  Explainability
15.  Stability & Anti-Oscillation
16.  Longitudinal Behaviour
17.  Missing & Degraded Data
18.  Relationship to Recommendations & Behaviour
19.  Failure Modes & Safeguards
20.  Relationship to Biological Age (GSC-002)
21.  Validation & Calibration Philosophy
22.  Governance
23.  Constraints & Scope Boundaries
24.  Design-Decision Register
25.  A Worked Longitudinal Scenario
26.  Domain Reference Summary
27.  Glossary of Methodological Terms
28.  Completion
1.  Purpose, Status & How to Read This Document
1.1  Objective
GSC-001 defines the complete methodology by which BioSense composes, governs, calibrates and maintains its Health Score. It is the first methodology document of the Global Scientific Configuration Library and one of the core intellectual-property documents of BioSense. It specifies the method — the philosophy, the mathematical framework, the weighting philosophy, the configuration, the calibration philosophy and the governance — by which validated understanding across many domains becomes a single, coherent, explainable measure of how healthy a person’s biology currently appears to be.
It does not compute anything. Every calculation is performed by the Engineering layer, specifically the Health Score Engine defined in ENG-001. GSC-001 is the named, versioned method that engine executes; the engine is the machinery that runs it. This separation is not incidental — it is the architectural discipline established by GSC-000 and inherited without exception here.
1.2  What this document is — and is not
This is a production engineering specification.  It is written to the same standard as the ENG and SCL libraries and is intended for permanent inclusion in the BioSense Engineering Library, suitable for Founder approval and direct engineering reference.
It is methodology, not implementation.  It is configuration, methodology, weighting philosophy, a mathematical framework, a calibration philosophy and a governance model. It is not executable code, not prompt logic and not user-interface behaviour.
1.3  Authority and precedence
GSC-001 derives its authority from, and is fully subordinate to, the BioSense Intelligence Constitution (Documents 1A–1C) and GSC-000, the Global Scientific Configuration Architecture. It is subordinate to the Canonical Scientific Library in every matter of scientific truth. Where this document and the Scientific Configuration Library appear to disagree about what any biomarker or physiological signal means, the Scientific Configuration Library prevails without exception. GSC-001 consumes validated science; it never establishes, reinterprets or overrides it.
The governing precedence rule inherited from GSC-000 is absolute: the Health Score never decides what is healthy, never reinterprets a biomarker, never overrides deterministic safety, never alters AI Behaviour, and never alters constitutional reasoning. It reflects underlying health as already understood by the system; it is a mirror of understanding, not a source of it.
1.4  How to read this document
Chapter 2 establishes the philosophy — what the score is, what it is not, and how it must be interpreted. Chapter 3 locates the methodology precisely against the GSC-000 boundary and defines the seam between method and computation. Chapter 4 records the constitutional and scientific foundations the method consumes. Chapters 5 through 12 develop the methodology itself: the domains, the mathematical framework, the weighting philosophy, domain contribution, the treatment of positive and negative evidence, and the integration of confidence, freshness and cross-domain combination. Chapters 13 through 18 govern personalisation, explainability, stability, longitudinal behaviour, missing data, and the relationship to recommendations. Chapters 19 and 20 address failure modes and safeguards and the relationship to Biological Age. Chapters 21 and 22 define validation, calibration and governance. Chapter 23 states the scope boundaries; Chapters 24 through 27 provide the design-decision register, a worked scenario, a domain reference and a glossary; and Chapter 28 records completion.
Throughout, the document defines principles rather than hard-coded numeric values, except where a specific value is architecturally necessary to make a principle unambiguous. Where a concrete parameter is stated, it is explicitly marked as a configurable default owned by this document and tunable under governance, never as a fixed constant of nature.
Reading convention.  Where this document says the method "moves", "damps", "resets" or otherwise acts on the score, it means the method specifies that the engine (ENG-001) shall do so. GSC-001 performs no computation and holds no runtime state; it defines the policy the engine executes. This convention applies throughout and is not repeated at each occurrence.
1.5  The method in brief
For orientation, the whole method can be stated in a paragraph. The Health Score is a single, bounded, present-tense measure of how healthy a person’s biology currently appears. It is composed, not calculated from raw data: the Dynamic Health Model’s validated understanding in each available domain becomes a signed, bounded contribution; each contribution is conditioned by its confidence (from GSC-003) and its freshness (from GSC-008); the conditioned contributions are combined under dynamic, biologically-relevant weights (from GSC-004) and a conflict-aware fused view (from GSC-009) into a composed value; and that value is expressed on a stable scale with an overall confidence and a complete explainability record. The method protects material bad news from being averaged away, refuses to impute missing data, moves gradually to avoid noise, personalises the reading without ever bending the science, and reflects health without ever issuing a recommendation. Everything after this section elaborates one part of that paragraph.
One-line statement.  The Health Score composes validated understanding across domains — conditioned by confidence and freshness, weighted by biological relevance, fused conflict-honestly — into a single, stable, explainable, present-tense measure of health that ENG-001 computes and this document governs.
2.  The Philosophy of the Health Score
Before any mathematics, the Health Score must be understood for what it is: a single, honest, explainable answer to one specific question the Constitution poses — how healthy does this person’s biology currently appear to be? Everything in the method serves that question, and nothing in the method is permitted to pretend to answer a different one.
2.1  The question the score answers
The Constitution deliberately separates two questions. The Health Score asks: "How healthy does your biology currently appear to be?" Biological Age asks: "How does your biology appear to be ageing over time?" The Health Score describes today; Biological Age describes the journey. GSC-001 owns only the first. The score is a present-tense expression of understanding — a considered reading of the person’s current physiological picture, assembled from everything the system validly knows, weighted by how much each piece matters and how sure the system is.
2.2  What the score represents
A composed reading of present health.  It integrates validated understanding across every available domain into one coherent measure, rather than presenting a scatter of disconnected metrics.
An expression of understanding, not a new fact.  It is derived from the Dynamic Health Model’s established understanding; it never analyses raw observations independently or generates new medical meaning.
A confidence-bearing estimate.  Every score carries its own confidence and uncertainty. A score built on rich, recent, convergent evidence is a different object from one built on thin or stale evidence, and the method treats them differently.
An explainable summary.  Every score can be decomposed into what contributed, what contributed most, what is uncertain, what is missing, and what recently changed.
2.3  What the score does not represent
Stating what the score is not is as important as stating what it is, because the value of a single number is easily misunderstood.
It is not a medical risk score.  It does not estimate the probability of any disease, event or outcome, and it must never be read as a clinical risk stratification. BioSense is a premium wellness and preventative-health platform, not a medical device, and does not diagnose.
It is not a diagnosis or a verdict.  It is a wellness-oriented reflection of present physiological understanding, never a statement that a person is or is not ill.
It is not a scientific finding.  It creates no science. Every input it consumes is already validated by the Scientific Configuration Library; the score neither adds to nor reinterprets that science.
It is not a recommendation.  The score reflects health; it never decides what a person should do. Prioritising and selecting interventions is owned entirely by GSC-005, and the score has no authority there.
It is not a precise instrument.  It does not claim false precision. Its movement is deliberately gradual and its confidence is always visible, because the goal is honest understanding, not the appearance of certainty.
2.4  Why the score exists
Modern individuals have more health data than ever and less understanding than ever. Many platforms present measurements, some present trends, and some produce scores, but very few answer the question that matters most: what does this actually mean for me? The Health Score exists to give a single, honest, at-a-glance answer to that question — a stable point of orientation that a person can return to over months and years, that reflects genuine change rather than noise, and that is always accompanied by the ability to understand why it reads as it does. It exists to turn a scatter of information into a coherent sense of where a person stands today.
2.5  How users should interpret it
The methodology is designed so that a correct interpretation is the natural one. A user should read the score as a considered, present-tense reflection of their current physiological picture — meaningful in its direction and its movement over time, honest about its own confidence, and always explainable. A single day’s reading matters less than its trend; a small movement matters less than a sustained one; and a score with modest confidence invites curiosity rather than alarm. The score is a starting point for understanding, never the end of one, and never a substitute for professional healthcare.
2.6  Why it differs from medical risk scores
Medical risk scores answer a fundamentally different question — the probability of a specific adverse outcome within a defined horizon — and are validated against clinical endpoints in defined populations. The Health Score makes no such claim. It is a wellness-first synthesis of present understanding, weighted dynamically by biological relevance, carrying explicit confidence, and designed for longitudinal self-understanding rather than clinical decision-making. It borrows the discipline of evidence-based reasoning without borrowing the clinical claim. This distinction is not cosmetic: it determines what the score may say, how it may be presented, and the care with which its limits are communicated.
Founder principle.  Health describes today. Biological Age describes the journey. The Health Score is a wellness-first reflection of present understanding — honest, explainable and confidence-bearing — never a medical risk score and never a diagnosis.
2.7  The score as a point of orientation
The deepest reason the Health Score exists is to give a person a stable point of orientation in a sea of data. Individual metrics rise and fall, devices produce endless streams, and a laboratory report can be bewildering; what a person most needs is a single, trustworthy answer to "where do I stand right now, overall?" that they can return to over time. The Health Score is designed to be that anchor: stable enough to trust, honest enough to respect, explainable enough to learn from, and consistent enough that its movement over months and years genuinely means something. It is not the whole of BioSense’s intelligence — the narratives, the trends and Biological Age all add dimensions — but it is the front door through which a person first understands where their health sits today.
2.8  What good interpretation looks like
Because a single number invites both over- and under-reading, the method is designed so that the healthiest way to interpret the score is also the most natural. A person interpreting the score well attends to its trend more than its absolute value, treats a small movement as noise until it persists, reads a lower-confidence score as an invitation to add data rather than a cause for alarm, and uses the explanation to understand what is driving the reading rather than fixating on the number alone. A person interpreting it poorly would chase daily movements, treat the number as a grade or a verdict, or read clinical meaning into a wellness signal. The method’s stability, confidence and explainability are precisely the properties that nudge every person toward the first reading and away from the second.
3.  Architectural Position & the GSC-000 Boundary
GSC-001 sits exactly where GSC-000 says it must: it is configuration and methodology, consumed by Engineering, subordinate to the Constitution and the Scientific Configuration Library. This chapter makes the boundary concrete for the Health Score specifically, so that no future reader can mistake method for machinery.
3.1  The seam between method and computation
The Health Score is, by the Engineering specification, a derived engine output: computed on demand from the Dynamic Health Model, carrying its own method version, cached under version-keyed invalidation rather than stored as a first-class belief. GSC-000 identifies this as the clean seam the Global Scientific Configuration layer is built for. GSC-001 owns one side of that seam and ENG-001 owns the other.
Concern
Owned by GSC-001 (this document)
Owned by ENG-001 (the engine)
Method
Defines the named, versioned method: philosophy, framework, weighting, contribution, calibration.
Executes the method as code.
Inputs
Specifies which classes of validated understanding are eligible to contribute and why.
Reads the actual DHM understanding at run time.
Composition
Defines how contributions combine, scale and aggregate as a framework.
Performs the arithmetic and produces the value.
Confidence
Defines that and how the score carries confidence (via GSC-003).
Computes the confidence object and attaches it.
Versioning
Owns the method version and its change under governance.
Records HEALTH_SCORE_METHOD_VERSION on every snapshot and caches it.
Persistence
Says nothing about storage — out of scope.
Caches, invalidates and records snapshots for history.

The one-sentence boundary.  GSC-001 defines the method; ENG-001 runs it. Every number in a delivered Health Score is produced by the engine executing this method at a specific method version, grounded in the Scientific Configuration Library through ENG-008.
3.2  What GSC-001 consumes, references and never touches
Consumes (hard dependencies)
The Scientific Configuration Library — the validated interpretation of every biomarker and physiological signal. The score is built only on already-validated understanding.
GSC-004 Cross-Domain Weighting — how domains are weighted relative to one another. The Health Score does not invent its own cross-domain weights; it consumes the weighting methodology GSC-004 owns.
GSC-003 Confidence Calibration — how confidence is composed and calibrated. The score carries confidence produced under GSC-003, not a bespoke confidence of its own.
GSC-008 Freshness Decay & Longitudinal Weighting — how the relevance of an observation decays with time. The score consumes this memory curve rather than defining its own.
References (without duplicating ownership)
GSC-005 Intervention Prioritisation — the score reflects health and never decides recommendations; what to surface is GSC-005’s alone.
GSC-006 Behavioural Capacity — realistic capacity to act personalises recommendations, not the score’s reading of present health.
GSC-009 Evidence Fusion & Conflict Resolution — where domains genuinely conflict, the score consumes the fused, conflict-aware view GSC-009 governs rather than resolving conflicts itself.
Never touches
Scientific truth (SCL/ENG-008), the deterministic safety floor (ENG-010), AI Behaviour and narrative (ENG-005), and constitutional reasoning (1A–1C). The score neither alters nor overrides any of these.
3.3  The score never decides; it reflects
This principle is important enough to state on its own. The Health Score is downstream of understanding and upstream of nothing that acts. It does not drive reasoning — the Constitution is explicit that derived indicators express understanding rather than dictate it. It does not drive recommendations — that authority belongs to GSC-005. It does not drive safety — the safety floor is set by ENG-010 and is never a function of a score. The Health Score is a considered reflection of where a person stands; it informs a person, and it informs the narrative that explains it, but it commands nothing.
4.  Constitutional & Scientific Foundations
The Health Score methodology is not invented from first principles; it is assembled from commitments the Constitution and the frozen architecture already make. This chapter records the foundations the method rests on, so that every later design choice can be traced to an existing, ratified principle rather than a new one.
4.1  The present-tense mandate
The Constitution defines the Health Score as the answer to "How healthy does your biology currently appear to be?" — a present-tense reading, distinct from Biological Age’s longitudinal one. This mandate shapes the entire method: the score privileges the current physiological picture, treats recent evidence as most relevant to "now," and expresses movement over time as a first-class output while never letting a single day’s noise dominate the reading.
4.2  Dynamic weighting, never fixed
The Constitution explicitly rejects fixed weighting. It states that not every source should contribute equally to every question, that the relevance of evidence depends on the question being asked, and that evidence should be weighted dynamically according to biological relevance. For the Health Score this means the contribution of each domain is not a static percentage but a context-sensitive weight — informed by GSC-004 — reflecting how much each domain genuinely informs present health for this person at this time. A method built on fixed domain percentages would contradict the Constitution; this method does not.
Constitutional anchor (1A §13.7).  "The Constitution therefore rejects fixed weighting. Evidence should be weighted dynamically according to biological relevance." The Health Score inherits this directly: domain contributions are dynamic, not hard-coded shares.
4.3  Multiple timescales
The Constitution recognises that biological systems operate across different timescales: blood biomarkers change over weeks or months, heart-rate variability fluctuates daily, sleep changes nightly, and body composition evolves gradually. The Health Score method must therefore treat a day of wearable data and a quarterly blood panel as evidence about different things moving at different speeds. This is why freshness and longitudinal weighting (GSC-008) are integral to the method rather than an afterthought: a signal’s contribution depends not only on what it is but on how recently it was observed relative to its own natural cadence.
4.4  Confidence as substance, not decoration
The Constitution requires that confidence never exist as a cosmetic score but function as a core architectural component, and that the Intelligence Engine always remain willing to change its mind as better evidence arrives. The Health Score honours this by carrying genuine, composed confidence (via GSC-003) that changes how the score behaves — not merely how it is labelled. A low-confidence score moves more cautiously, claims less, and is presented with more visible uncertainty than a high-confidence one.
4.5  Wellness-first, never diagnostic
The Constitution positions BioSense as a system that helps individuals understand their health through transparent, evidence-informed intelligence — not by diagnosing disease and not by creating unnecessary anxiety. The Health Score is therefore wellness-first by construction: it is framed around understanding and optimisation, it avoids the language and claims of clinical risk, and it is engineered to inform calmly rather than to alarm. This foundation constrains not just what the score computes but how its movements and its uncertainty are allowed to be expressed.
4.6  Inputs the method is entitled to consume
The Engineering specification for the Health Score Engine lists the classes of established understanding the score draws upon: Biological Identity, Health Narratives, Persistent Beliefs, Longitudinal Trends, Recovery, Behaviour and Biomarkers. Crucially, it requires that the engine never analyse observations independently — it consumes understanding already established by the Dynamic Health Model. GSC-001 respects this exactly: the method composes a score from validated, interpreted understanding, never from raw, uninterpreted data.
Established input (from the DHM)
What it contributes to present health
Biological Identity
The person’s stable physiological baseline and context against which current readings are understood.
Health Narratives
Validated, evidence-backed explanations of how multiple beliefs combine — coherent stories, not raw metrics.
Persistent Beliefs
Durable, validated understanding that has survived scrutiny over time.
Longitudinal Trends
The direction and persistence of change across timescales.
Recovery
Present physiological resilience and readiness.
Behaviour
Sustained behavioural patterns already interpreted for their physiological meaning.
Biomarkers
Validated interpretations of laboratory results from the Scientific Configuration Library.
5.  The Scoring Domains
The Health Score is composed from domains — coherent groupings of physiological understanding that each speak to present health in their own way and on their own timescale. This chapter defines the domains as a methodology of principles, not a fixed table of weights. Which domains are available for any given person depends on their data; the method is designed to compose a meaningful score from whatever subset is validly present.
5.1  What a domain is
A domain is a grouping of validated understanding that shares a physiological meaning and a characteristic timescale. Domains exist so that the score can reason about present health at the level of coherent systems rather than isolated measurements, and so that cross-domain weighting (GSC-004) has well-defined objects to weigh. A domain never contains raw data; it contains understanding the Dynamic Health Model has already established.
5.2  The domains
The following domains are recognised by the method. Each is described by the understanding it carries and the timescale on which it naturally moves. None is assigned a fixed share of the score; contribution is dynamic and governed by Chapters 7 and 8.
5.2.1  Blood biomarkers
Carries.  Validated interpretations of laboratory results as established by the Scientific Configuration Library — the deepest and most clinically meaningful physiological signals available to the score, spanning metabolic, cardiovascular, haematological, hormonal and inflammatory systems.
Timescale.  Weeks to months. A blood panel is a considered, slow-moving reading; its contribution persists but ages, and its recency is judged against a months-long cadence.
5.2.2  Wearable physiology
Carries.  Continuously observed physiological signals such as heart-rate variability, resting heart rate and respiratory measures, already interpreted for their physiological meaning by the model.
Timescale.  Daily. Highly responsive and information-rich, but individually noisy; the method values the trend far more than any single reading.
5.2.3  Sleep
Carries.  Validated understanding of sleep quantity, quality, consistency and architecture as it bears on present physiological restoration.
Timescale.  Nightly. Moves quickly and matters cumulatively; short runs of poor sleep are meaningful, a single night rarely is.
5.2.4  Recovery
Carries.  The model’s established reading of present physiological resilience and readiness — how well the body is currently coping with load.
Timescale.  Days. A present-tense domain by nature, closely tied to the "how healthy now" question, but still read as a short trend rather than a spot value.
5.2.5  Activity
Carries.  Interpreted physical-activity patterns — volume, intensity and consistency — as they inform present physiological condition.
Timescale.  Days to weeks. Sustained patterns inform present health; isolated sessions do not move the reading materially.
5.2.6  Body composition
Carries.  Validated understanding of composition measures such as lean mass, fat mass and their distribution, as they relate to present health.
Timescale.  Gradual (months). Slow-moving by nature; the method expects and requires slow movement here and treats sudden apparent shifts with suspicion.
5.2.7  Nutrition
Carries.  Interpreted nutritional patterns and their established physiological consequences, to the extent the model has validated understanding of them.
Timescale.  Weeks. Contributes through sustained pattern rather than individual intake, and often through its downstream effect on other domains.
5.2.8  Subjective wellbeing
Carries.  Validated understanding derived from the person’s own reported experience — energy, mood, symptoms — treated as genuine evidence about present health, with appropriate confidence.
Timescale.  Days. Immediate and personally meaningful; weighted with explicit confidence because it is self-reported, never dismissed and never over-trusted.
5.2.9  Behavioural history
Carries.  Durable, already-interpreted behavioural patterns — the sustained habits that shape physiology over time.
Timescale.  Months. Slow, persistent and stabilising; it anchors the score against transient fluctuation in faster domains.
5.2.10  Longitudinal trends
Carries.  The cross-cutting direction and persistence of change assembled across the other domains — not a separate measurement but the shape of movement over time.
Timescale.  Months to years. This domain expresses trajectory and is central to how the present score is contextualised, though the journey itself is Biological Age’s subject, not the score’s.
5.3  Domains are available, not guaranteed
No person will have every domain populated, and the method never assumes they do. A user with rich wearable data but no bloods, or a recent blood panel but no wearable, must still receive a meaningful and honest score. Which domains are present determines both the composition and the confidence of the score, as defined in Chapters 10 and 17. The domain model is therefore a menu of possible contributions, not a required checklist.
5.4  Why these domains
The domains are chosen to span the physiological systems that most inform present health while remaining coherent, interpretable and independently meaningful. Together they cover the deep clinical layer (blood biomarkers), the autonomic and cardiovascular layer (wearable physiology, recovery), the restorative layer (sleep), the musculoskeletal and structural layer (activity, body composition), the metabolic-input layer (nutrition), the lived-experience layer (subjective wellbeing), and the temporal layer (behavioural history, longitudinal trends). This spread is deliberate: it ensures the score can read present health from whatever combination of systems a person’s data illuminates, and it avoids both redundancy (domains that merely restate one another) and gaps (systems with no representation). The grouping is a methodological choice owned here and revisable under governance, not a claim that these are the only possible domains.
5.5  Domains interact; the score respects that
Domains are not independent silos. Poor sleep depresses recovery; sustained activity reshapes body composition; a metabolic shift in bloods may echo in wearable physiology. The Health Score does not model these interactions itself — that understanding belongs to the Dynamic Health Model and the science it rests on — but it respects them in two ways. First, it consumes already-interpreted understanding in which such interactions are reflected, so a domain’s reading already carries the influence of related systems. Second, it uses convergence (Chapter 10) to recognise when domains agree for genuinely related reasons, without double-counting correlated signals as if they were independent corroboration. The score thus honours the interconnected nature of physiology while leaving the modelling of those connections to the layers that own it.
5.6  Domain extensibility
The ten domains above are the initial set, not a closed one. Because the method composes over domains rather than over named biomarkers or specific devices, the arrival of new biomarkers, wearable integrations or entire new data classes is expected to populate existing or new domains rather than to restructure the method. To keep that growth orderly over the platform’s life, domains are an open but governed set, and a candidate domain is admitted only through the following criteria and procedure, under the governance of Chapter 22.
Admission criteria.  A candidate domain must have a coherent physiological meaning distinct from existing domains, a characteristic timescale (cadence) against which its freshness can be judged, and validated interpretation available from the Scientific Configuration Library. A candidate that merely restates an existing domain is rejected as redundant; one with no validated interpretation is deferred until the science exists.
Entry profile.  A new domain enters with an explicit cross-domain weighting profile (owned by GSC-004) and an explicit freshness profile (owned by GSC-008). It never enters with an ad-hoc weight decided inside this method.
Regression requirement.  The introduction of a new domain must be regression-tested against existing scores (Chapter 21) so that adding a domain does not silently shift every existing score. A change that fails regression is not released.
Versioning.  Admitting a domain is a material change to the methodology and produces a new method version under Chapter 22, with the usual change record and approval.
Some future data classes will not be present-state domains at all. Stable predispositions such as genetics, and drivers of state such as environmental exposures, inform the expected baseline and personalisation (Chapter 13) rather than contributing as present-health domains; episodic, high-dimensional modalities such as imaging or ECG contribute through the validated understanding they produce, once the Scientific Configuration Library has interpreted them, rather than as raw streams. The design-decision register (Chapter 24) records this intent so that future integrations inherit a considered position rather than an accidental one.
6.  The Mathematical Framework
This chapter defines the mathematical framework of the Health Score as a methodology — the shape of the model, the meaning of the scale, and the logic of aggregation — without writing software. It specifies how the pieces relate and what properties the composition must have, leaving the arithmetic to Engineering. No formula here is code; each is a statement of method.
6.1  The overall scoring model
The Health Score is a composition, not a calculation over raw data. In methodological terms it is built in four conceptual stages: each available domain yields a domain contribution derived from validated understanding; each contribution carries a confidence and a freshness; the contributions are combined under dynamic cross-domain weighting into a single composed value; and that value is expressed on a stable, bounded scale together with its own overall confidence. The model is deliberately layered so that each stage is independently explainable and independently governable.
Stage
Input
Method (defined here) → Output
1  Domain reading
Validated understanding in a domain
Express the domain’s present-health reading as a bounded, signed contribution with a confidence and a freshness.
2  Domain conditioning
Domain reading
Apply freshness (GSC-008) and confidence (GSC-003) so stale or weak readings contribute proportionately less.
3  Cross-domain composition
Conditioned domain readings
Combine under dynamic weights (GSC-004) into a single composed value, honouring the conflict-aware fused view (GSC-009).
4  Expression
Composed value
Map to the bounded score scale and attach an overall composed confidence and an explainability decomposition.
6.2  The scale and its philosophy
The score is expressed on a single bounded scale. The methodological requirements on that scale are what matter here, not the specific endpoints: the scale is bounded, so the score is always interpretable and never runs away; it is monotonic, so that better validated health always maps to a better score and never the reverse; it is stable, so that equal changes in understanding produce proportionate, non-jarring changes in the score; and it is calibrated, so that a given score means broadly the same thing across people and across time. A bounded scale of 0 to 100 is adopted as the configurable default expression because it is widely legible, but the endpoints are a presentation choice owned by this document, not a mathematical necessity.
Configurable default.  Scale endpoints (default 0–100) and the mapping curve are configurable defaults owned by GSC-001 and tunable under governance. They are not constants of nature and carry no clinical meaning.
6.3  Contribution framework
Each domain contributes a signed, bounded quantity representing how its present-health reading pushes the overall score relative to the person’s expected baseline: a well-functioning domain contributes positively, a deteriorating one negatively, and a domain at expected baseline contributes near zero. Contributions are signed so that improvement and deterioration are represented symmetrically and explainably (Chapter 9), and bounded so that no single domain can dominate or destabilise the composed score. A contribution is always accompanied by its confidence and freshness, which condition how much of it actually reaches the composition.
6.4  Aggregation methodology
Aggregation combines conditioned, weighted domain contributions into one composed value. The method requires that aggregation be weighted rather than a simple average — an unweighted mean would contradict the constitutional rejection of fixed weighting and would let an irrelevant domain dilute a decisive one. It requires that aggregation be confidence-aware, so that a highly uncertain contribution influences the result less than a confident one. It requires that aggregation be bounded and saturating, so that extreme readings in one domain move the score meaningfully without allowing a single outlier to capture it. And it requires that aggregation be order-independent and reproducible, so that the same understanding always yields the same score at a given method version.
6.4.1  Why not a simple weighted average
A plain weighted average has two failures the method must avoid: it treats a missing domain as if it were a domain scoring at the mean, silently inventing information; and it lets many mildly positive domains mask one seriously negative one, hiding exactly the signal a person most needs to understand. The aggregation methodology therefore combines a weighted central tendency with a saturating sensitivity to material negative findings, so that genuine deterioration in an important, high-confidence domain remains visible in the composed score rather than being averaged away. The precise combination is a configurable methodological form owned here and calibrated under Chapter 21; what is fixed is the requirement that meaningful bad news is never diluted into invisibility.
6.4.2  The canonical composition form
So that two independent implementations produce the same score from the same inputs, the method designates a single canonical composition form as its configurable default — the reference methodology ENG-001 implements and calibration tunes. The form is stated as a methodology, not as code, and has three parts applied in a fixed order. First, a confidence- and freshness-weighted central tendency of the conditioned domain contributions, combined under the dynamic weights from GSC-004, produces a base value; this is the "how is the person doing on balance" term. Second, a negative-protection term inspects the material, high-confidence negative contributions and pulls the composed value toward the most serious of them in proportion to its severity and confidence, so that a decisive bad finding is not averaged away; this is the "do not hide a real problem" term. Third, a bounded saturating transfer maps the combined result onto the expressed scale so that extremes move the score firmly but with diminishing marginal effect. The relative strength of the central-tendency and negative-protection terms, the saturation curve and the scale mapping are configurable defaults owned by this document and tuned under Chapter 21; the three-part structure and its order are fixed by this methodology and are not a tuning choice.
Why name the form.  Designating one canonical composition form — the BioSense present-health composition — removes the risk that two engineering teams satisfy the required properties with different functions and produce different scores, and it makes the method’s central behaviour a defined, versioned, defensible asset rather than an implementation detail. It remains methodology: no coefficients are fixed here, only the structure the engine must implement and calibration may tune.
6.5  Scaling philosophy
The mapping from the composed value to the expressed score is deliberately gentle. Equal increments of underlying change map to equal, modest increments of score, without cliffs or thresholds that would make the number lurch. The scaling is designed so that most people, most of the time, see a stable number that moves only when their validated understanding genuinely moves — which is the behavioural property Chapter 15 governs in full. The scaling curve is a configurable default owned by this document.
6.6  What the framework deliberately omits
No arithmetic constants, coefficients or code appear in this framework, by design. The specific weighting values live in GSC-004; the confidence composition lives in GSC-003; the freshness curve lives in GSC-008; and all executable computation lives in ENG-001. GSC-001 fixes the shape and the required properties of the composition and leaves every numeric value either to its dependency documents or to governed calibration. This is what it means for the Health Score to be a method rather than a machine.
6.7  A worked illustration of the framework
The following illustration is conceptual, not numerical: it shows how the four stages transform understanding into a score without asserting any specific value. Consider a person with a recent blood panel, three weeks of wearable data, consistent sleep tracking, and no body-composition data. At the domain-reading stage, the method forms a reading for each available domain: the blood domain reads slightly below the person’s baseline on a metabolic marker; wearable physiology reads at baseline; sleep reads modestly above baseline after a good run of nights; body composition has no reading. At the conditioning stage, the blood reading is fresh for its cadence and confident, so it passes through near full strength; the sleep reading is fresh but individually noisy, so it is attenuated somewhat by confidence; body composition contributes nothing. At the composition stage, the conditioned readings are weighted by biological relevance — here the metabolic blood finding is highly relevant to present health and is weighted accordingly — and combined under the bounded, negative-protecting rule. At the expression stage, the composed value is mapped to the score scale and given an overall confidence that reflects good-but-incomplete coverage. The person receives a score modestly below their recent norm, an explanation naming the metabolic finding as the main driver, and an honest note that body composition was unavailable.
Nothing in that illustration required a formula to be legible, and that is the point: the framework is a sequence of well-defined methodological transformations whose properties are specified here and whose arithmetic is performed by the engine.
6.8  Boundedness and saturation in more detail
Two framework properties deserve fuller treatment because they carry much of the method’s behavioural weight. Boundedness means each domain’s conditioned contribution is limited before composition, and the composed value is limited before expression, so the score can neither run away nor be captured by one domain. Saturation means the composition’s sensitivity to any single domain diminishes as that domain’s contribution grows extreme, so an outlier moves the score firmly but with decreasing marginal effect — the difference between a domain that is "somewhat below baseline" and "far below baseline" is real but compressed, preventing a single dramatic reading from dominating the whole. The one deliberate asymmetry, defined in Chapter 9, is that material high-confidence negative findings are protected from being saturated into invisibility, because the score exists to help people notice genuine problems.
6.9  Determinism and version-pinning of the framework
The framework is deterministic: given the same conditioned contributions, weights, configurable defaults and supplied prior state, it always yields the same composed value and the same expressed score. This determinism is what makes the score reproducible and auditable, and it is why the method version and the versions of GSC-003, GSC-004 and GSC-008 must all be pinned to any score. A score is meaningful only as the output of a specific method at specific dependency versions, and the framework is specified so that this pinning fully determines the result.
Two of the method’s behaviours — the stability mechanisms of Chapter 15 and the longitudinal behaviour of Chapter 16 — depend on the score’s own recent history, so the score is a function of present understanding together with a supplied prior state (the previous score, its direction of movement, and any smoothing memory). That prior state is held and evolved by ENG-001, not by the method; the method defines only the policy that operates on it. Reproducibility is therefore defined precisely as: the score is a pure function of present understanding, the ENG-001-supplied prior state, and the pinned method and dependency versions. Given identical values of all three, the score and its explanation are always identical. This preserves both the stability the Constitution requires and the reproducibility on which auditability and calibration depend, without either property undermining the other.
7.  Weighting Philosophy & Hierarchy
How much each domain counts is the heart of the Health Score, and it is where the Constitution is most insistent: weighting must be dynamic, driven by biological relevance, never fixed. This chapter defines the weighting philosophy the score applies, drawing its actual weights from GSC-004 rather than owning them, and establishes the hierarchy that decides which evidence counts most for the present-health question.
7.1  The principle: relevance, not rank
No domain holds a permanent seniority. The weight a domain carries depends on how much it genuinely informs present health for this person in this moment. Blood biomarkers may dominate when a metabolic or haematological signal is central; wearable physiology and recovery may dominate when the question is present resilience; body composition may barely move the score for one person and matter considerably for another. The method asks, for every score, "what most informs how this person’s biology currently appears?" and lets the answer set the weights. This is the constitutional rejection of fixed weighting, made operational.
7.2  Weighting is consumed from GSC-004, not owned here
Ownership boundary.  The methodology for computing cross-domain weights is owned by GSC-004. GSC-001 specifies how the Health Score uses those weights and what properties it needs from them; it does not define the weight values. This keeps a single source of truth for weighting across every derived indicator.
What GSC-001 requires from GSC-004 is a set of dynamic, per-domain weights that reflect biological relevance to the present-health question, that respond to context and confidence, that are bounded so no domain can wholly capture the score, and that are explainable so the score can report why a domain counted as much as it did. GSC-001 consumes these weights at the composition stage and applies them as defined in Chapter 6.
7.3  The weighting hierarchy
While no domain has fixed seniority, the method does define a hierarchy of considerations that shapes how relevance is judged. This hierarchy is not a weight table; it is the order in which the method reasons about how much evidence should count.
Biological relevance to present health.  How directly does this domain speak to how the person’s biology currently appears? The more direct, the more it counts.
Evidential strength and confidence.  How well-validated and how confident is the understanding in this domain? Weakly-supported understanding counts less, via GSC-003.
Freshness relative to the domain’s cadence.  How recent is the evidence relative to how fast this domain naturally moves? Stale evidence counts less, via GSC-008.
Convergence with other domains.  Does this domain agree with others? Genuine convergence of independent domains strengthens the reading; isolated signals are held more tentatively.
Personal relevance.  Does this domain matter more for this person given their baseline and context? Personalisation (Chapter 13) adjusts relevance without changing science.
7.4  Bounded influence
However relevant a domain is, its influence on the composed score is bounded. This is a stability requirement as much as a fairness one: an unbounded domain could make the score lurch whenever that domain moved, destroying the calm, gradual behaviour the Constitution requires. The bound ensures that even a decisive domain moves the score firmly but proportionately, and that the score always reflects a composition rather than a single dominant signal — except in the specific case of material, high-confidence negative findings, which Chapter 9 deliberately protects from being bounded into invisibility.
The precedence between the per-domain bound and the negative-protection exception is fixed to remove ambiguity on the most important cases. Where a material, high-confidence negative finding is present, the negative-protection term (Chapter 6.4.2) overrides the ordinary per-domain bound up to a defined, configurable protection ceiling — high enough that a severe, confirmed finding remains clearly visible in the score, but still bounded so that no single domain achieves unlimited capture. The ordinary bound governs all other cases; the exception governs material negatives up to the ceiling. This protection ceiling is the same bound applied to the negative-protection term of §6.4.2 — one ceiling described from two angles, not two independent limits. The ceiling itself is a configurable default owned by this document and tuned under Chapter 21.
7.5  Weighting is explainable
Every weight the score applies must be reportable in plain language. When the score explains itself (Chapter 14), it can say not only which domains contributed but why each counted as much as it did — because it was highly relevant to present health, because it was confident and fresh, because it converged with others, or the reverse. A weighting the method cannot explain is a weighting the method does not use.
7.6  A worked illustration of dynamic weighting
Consider the same physiological picture read for two different people. The first has a stable metabolic profile but reports persistent fatigue and shows a sustained decline in recovery; for this person, the recovery and subjective-wellbeing domains are highly relevant to present health and are weighted heavily, while a mildly imperfect body-composition reading is largely immaterial and weighted lightly. The second person feels well and recovers normally but shows a clear, confirmed shift in a metabolic biomarker; for them, the blood domain is decisive and dominates the weighting, while day-to-day recovery variation is contextual. The same domains, the same method, entirely different weights — because relevance to the present-health question differs. A fixed-weight method would misread at least one of these people; dynamic weighting reads both correctly. This is the constitutional rejection of fixed weighting doing real work.
7.7  What weighting must never do
Two prohibitions bound the weighting philosophy. First, weighting may never be used to discount a material or safety-relevant finding because it is inconvenient, off-goal or unwelcome; relevance is judged by biological bearing on present health, never by whether the finding is comfortable. Second, weighting may never override the science — a domain’s weight changes how much its validated reading counts, never what that reading means. These prohibitions keep dynamic weighting a tool for accuracy rather than a route to flattering or distorting the score.
8.  Domain Contribution Methodology
This chapter defines how a domain’s validated understanding becomes a signed, bounded, confidence-and-freshness-bearing contribution to the score. It is the bridge between the domains of Chapter 5 and the composition of Chapter 6, expressed as method.
8.1  From understanding to contribution
A domain contribution expresses how far the domain’s present-health reading departs from the person’s expected baseline, in a direction and by an amount the method can defend. The reading is derived from validated understanding — never from raw observation — so the contribution inherits the scientific grounding of the Scientific Configuration Library. The departure from baseline is what carries meaning: a domain sitting at its expected baseline contributes near zero, a domain reading better than baseline contributes positively, and a domain reading worse contributes negatively.
8.2  The baseline reference
Contribution is measured against an expected baseline rather than a population absolute, because the Health Score is a personal, present-tense reading. The baseline is the person’s own established physiological identity where one exists, and a population-appropriate expectation where it does not (the cold-start case, Chapter 17). Using a personal baseline is what lets the score recognise genuine change for this individual rather than merely restating where they sit in a population distribution. Personalisation of the baseline (age, sex, context) is governed in Chapter 13 and never alters the underlying science.
Ownership of the baseline.  The baseline is the person’s Biological Identity, which is owned, established and maintained by the Dynamic Health Model (ENG-001), not by this method. GSC-001 consumes the baseline as an input and never computes, stores or mutates it. Where this document describes the baseline being reset as an improvement persists (Chapter 16), it defines only the policy by which a persistent change should be treated as a new reference; the persistence assessment and the actual reset are effected in the Dynamic Health Model, which the method reads. This keeps a single source of truth for what "baseline" means and prevents duplicated ownership.
8.3  Signed and bounded
Every contribution is signed, so improvement and deterioration are represented symmetrically, and bounded, so no domain can single-handedly capture the composed score. The bound is applied per domain before composition. Signing is essential to explainability: the score can state, for each domain, whether it is currently helping or hurting the reading and by how much, which is the raw material of Chapter 14’s explanations.
8.4  Conditioned by confidence and freshness
A contribution is never used at face value. Before it reaches the composition it is conditioned by two factors: its confidence, consumed from GSC-003, which reflects how well-supported the underlying understanding is; and its freshness, consumed from GSC-008, which reflects how recent the evidence is relative to the domain’s natural cadence. A confident, fresh contribution reaches the composition close to its full magnitude; an uncertain or stale one is attenuated. This conditioning is what allows the score to remain honest when evidence is thin or old, rather than pretending to a precision it does not have.
The order in which these factors are applied is fixed by this methodology to keep the pipeline unambiguous and reproducible. As a configurable default, conditioning is multiplicative and is applied before cross-domain weighting: the signed, bounded contribution is first attenuated by its freshness, then by its confidence, yielding the conditioned contribution; the dynamic cross-domain weight from GSC-004 is then applied at the composition stage (Chapter 12), not before. The multiplicative form and this order are the reference methodology; the specific attenuation curves remain owned by GSC-008 and GSC-003 respectively. Fixing the order removes a source of divergence between implementations without constraining the dependency documents’ own methodologies.
Contribution property
Source
Effect on the score
Direction & magnitude
Validated understanding vs baseline (this document)
Sets whether and how far the domain moves the score.
Confidence
GSC-003
Attenuates uncertain contributions; low confidence → smaller, more tentative influence.
Freshness
GSC-008
Attenuates stale contributions relative to the domain’s cadence.
Weight
GSC-004
Sets how much the conditioned contribution counts against other domains.
Bound
This document
Prevents any single domain from capturing or destabilising the score.
8.5  Domains contribute understanding, never raw data
It bears repeating as a contribution rule: a domain contributes only understanding the Dynamic Health Model has already validated. If a domain holds only raw, uninterpreted observations, it has no contribution to make until the model has interpreted it. This guarantees that the score is always a composition of validated understanding and never a re-analysis of primary data — the line ENG-001 draws when it forbids the engine from analysing observations independently.
8.6  Worked contribution examples
The following conceptual examples show how a domain’s reading becomes a conditioned contribution. No numbers are asserted; the point is the shape of the reasoning.
A confident, fresh negative.  A recent blood panel shows a validated metabolic marker clearly below the person’s baseline. The reading is signed negative, sized by how far below baseline it sits, confident (well-validated science, good data) and fresh (within the blood cadence). It reaches the composition near full strength and, being material and confident, is protected from being averaged away.
An uncertain, fresh signal.  A single night of unusually poor sleep is fresh but individually noisy. The reading is signed negative but small, and confidence damping attenuates it heavily, so it barely moves the score — correctly, because one bad night is rarely meaningful.
A confident but stale reading.  A body-composition assessment from many months ago is confident but old for even its slow cadence. Freshness attenuates its contribution, and its influence has partly faded pending a newer measurement.
A domain at baseline.  Wearable physiology reads exactly at the person’s established baseline. Its contribution is near zero — not because it is absent, but because "no change from baseline" is genuine information that the domain is neither helping nor hurting present health.
These examples show the contribution framework doing its essential job: translating validated understanding into signed, bounded, conditioned quantities that the composition can combine honestly, with each domain’s influence proportioned to how much it truly informs present health right now.
8.7  The dual reference: guarding against normalised drift
Judging each domain against the person’s own baseline is the right choice for detecting personal change, but it carries a known risk. If a person’s physiology drifts slowly and uniformly in an adverse direction, and the personal baseline continually re-references to the drifting state, the method could normalise the decline — keeping the score stable while the person genuinely deteriorates. The persistence-driven baseline reset of Chapter 16 could, unchecked, amplify this. This is the mirror image of the acute-masking problem the method solves for sudden findings, and because it is gradual it is harder to see.
The method therefore uses a dual reference. Alongside the person’s personal baseline it retains a population-appropriate reference for each domain, consumed from the validated science, and it monitors the divergence between the two. A personal baseline that drifts steadily away from population-appropriate expectation is not silently accepted as the new normal: the sustained divergence is itself surfaced — as a reduction in the score’s overall confidence and as an explicit element of the explainability record (Chapter 14), which the narrative layer may then communicate — so that uniform adverse drift cannot be fully normalised out of the score. The personal baseline still governs sensitivity to change; the population reference acts as an anchor that prevents that sensitivity from erasing a slow, whole-person decline. This keeps the mechanism within what GSC-001 already owns — the score’s confidence and its explainability output — and introduces no new outbound dependency. The population anchor is used solely to detect and surface divergence for robustness; it is never used to assert that a person is clinically abnormal or at risk, preserving the wellness-first, non-diagnostic posture of Chapter 4.
Dual-reference principle.  The score reads change against the personal baseline but anchors against a population-appropriate reference. Sustained divergence between the two lowers confidence and is surfaced in the explainability record, never silently absorbed. The divergence is assessed over time using the same ENG-001-held prior state as the other longitudinal mechanisms (§15.2.7), so no new temporal state is introduced. Personal sensitivity without normalised decline is a deliberate, named property of the method.
9.  Positive & Negative Evidence
Health moves in both directions, and evidence about it is often incomplete or contradictory. The Health Score method must handle deterioration, improvement, conflict, absence, staleness and contradiction in ways that are honest, symmetric where appropriate and asymmetric where safety and meaning demand it. This chapter defines those treatments.
9.1  Deterioration
Throughout this chapter, a finding is "material" when it is significant enough to warrant negative protection — a function of its magnitude and its confidence. GSC-001 does not fix the materiality threshold itself; it requires that materiality be determined as a function of magnitude and confidence and treats the threshold as owned by GSC-004 (weighting), so that this document does not pre-empt a value that belongs to a sibling methodology. What GSC-001 fixes is the consequence: a material, high-confidence negative finding is protected as defined below.
Deterioration is a negative contribution: a domain reading worse than the person’s expected baseline pushes the score down in proportion to the magnitude, confidence and weight of the finding. The method deliberately protects material, high-confidence deterioration from being averaged away by many mildly positive domains — this is the saturating sensitivity of Chapter 6. Genuine bad news that the system is confident about must remain visible in the score, because the score exists precisely to help a person notice it. Deterioration is never dramatised, but it is never hidden.
9.2  Improvement
Improvement is a positive contribution, treated symmetrically to deterioration in its representation but subject to the same stability discipline. The method rewards genuine, sustained improvement and lets it raise the score, while resisting the temptation to reward transient upswings that have not yet proven durable. A person who has genuinely improved should see it reflected; a person having one good day should not see the score overreact. The balance between recognising improvement and requiring durability is governed by the longitudinal methodology in Chapter 16.
9.3  Conflicting evidence
When domains disagree — one improving while another deteriorates — the method does not silently pick a winner. It composes the conflicting contributions under their weights and confidences, and it consumes the conflict-aware fused view that GSC-009 governs so that genuine cross-domain conflict is represented rather than laundered. The resulting score reflects a real tension in the evidence, and the explainability layer (Chapter 14) surfaces that tension rather than hiding it behind a single confident number. A conflicted picture generally produces a more tentative score with lower confidence, which is the honest outcome.
9.4  Missing evidence
Missing evidence is not neutral evidence, and the method never treats an absent domain as if it were a domain reading at baseline. A missing domain simply does not contribute, and its absence lowers the confidence and, where appropriate, the completeness of the score rather than silently filling the gap with an assumption. The full treatment of missing and degraded data — how the score composes from a partial set of domains and how it communicates the limitation — is defined in Chapter 17.
9.5  Stale evidence
Evidence ages, and its relevance to present health decays at a rate set by the domain’s natural cadence. A blood panel remains informative for months; a single night’s sleep data is quickly superseded. Stale evidence is attenuated via GSC-008 rather than discarded outright, so that old-but-still-relevant understanding continues to contribute at a diminished weight until fresher evidence arrives. When all of a domain’s evidence is stale, that domain’s contribution fades and the score’s confidence reflects the loss of currency.
9.6  Contradictory evidence within a domain
Sometimes the contradiction is inside a single domain rather than between domains — two signals of the same kind pointing opposite ways. The method defers to the Scientific Configuration Library and ENG-008 for how such within-domain scientific conflict is represented, since resolving it is a scientific matter the score must not usurp. The score consumes the resulting, possibly lower-confidence, understanding and represents the increased uncertainty rather than manufacturing a confident reading from contradictory inputs.
The honest-uncertainty rule.  Conflict, absence, staleness and contradiction all move the score toward lower confidence and more visible uncertainty rather than toward a falsely precise number. The method never converts missing or conflicting evidence into confident-looking output.
10.  Confidence Integration
Every Health Score carries confidence, and that confidence changes how the score behaves — not merely how it is labelled. This chapter defines how the score integrates confidence, consuming the confidence methodology owned by GSC-003 rather than inventing its own.
10.1  The score carries confidence
A Health Score is never a bare number. It is a value accompanied by a confidence that expresses how much the system trusts the reading, given the strength, freshness, convergence and completeness of the evidence behind it. This confidence is a first-class output of the method, produced alongside the score and available to everything downstream — the narrative, the explanation, and the delivery layer. The Constitution’s requirement that confidence be substance rather than decoration is honoured by making the score genuinely behave differently at different confidence levels.
10.2  Confidence is composed by GSC-003, consumed here
Ownership boundary.  The composition and calibration of confidence — how data-confidence, scientific-confidence and personal-fit combine, the convergence factor, the uncertainty penalty and the weakest-link rule — are owned by GSC-003. GSC-001 consumes the resulting confidence and defines how the score responds to it.
GSC-001 requires from GSC-003 a composed confidence for each domain contribution and an overall composed confidence for the score. It requires that confidence be composed, not averaged, so that a single weak link appropriately limits the whole; that convergence of genuinely independent domains raises confidence while apparent agreement between dependent signals does not; and that confidence be calibrated against observed outcomes over time. The score uses these confidences at two points: to condition each domain contribution (Chapter 8) and to express an overall confidence on the composed score.
10.3  How low-confidence scores behave differently
A low-confidence score is a different object from a high-confidence one, and the method treats it so:
It moves more cautiously.  Low confidence damps the score’s responsiveness, so an uncertain reading does not swing the number; the score waits for confidence before committing to movement.
It claims less.  A low-confidence score is expressed with wider acknowledged uncertainty and is never presented as a precise verdict.
It leans on stable domains.  When fast, noisy domains are uncertain, the composition leans more on slower, better-validated understanding, so the score stays anchored.
It surfaces its limits.  The explainability layer makes the uncertainty and its causes visible, so a person understands why the reading is tentative.
10.4  Confidence and the overall score
The overall confidence on the composed score reflects the confidences of the contributing domains, their convergence, and the completeness of the domain set. A score built from many confident, fresh, convergent domains earns high confidence; a score built from a single stale domain, or from domains in conflict, earns low confidence. This overall confidence is what allows the same numeric score to be read appropriately — a 70 with high confidence and a 70 with low confidence are honestly different statements, and the method keeps them distinguishable rather than collapsing them into an identical-looking number.
10.5  The three inputs to confidence
Data-confidence, in particular, must reflect the provenance of an observation: directly measured understanding and understanding inferred by an AI-generated observation do not automatically merit equal confidence. Provenance is a legitimate input to confidence owned by GSC-003; the Health Score inherits whatever confidence GSC-003 assigns and never assumes parity between measured and inferred understanding. As AI-generated observations grow as a data class, this keeps the score from being biased toward whatever an observation-generator over-produces.
GSC-003 composes confidence from three conceptually distinct inputs, and the Health Score benefits from keeping them distinct in its reasoning even though it does not compute them. Data-confidence reflects how much and how good the underlying data is — a rich, clean signal versus a sparse, noisy one. Scientific-confidence reflects how strong the validated science behind the interpretation is — a well-established relationship versus a tentative one, graded on the same evidence hierarchy the Scientific Configuration Library uses. Personal-fit reflects how well the general science applies to this specific person given their context. A domain contribution is only as trustworthy as the weakest of these, which is why the composition is weakest-link rather than an average that could let one strong factor paper over a fatal weakness in another.
10.6  Convergence and independence
Confidence should rise when domains genuinely agree, but not when apparent agreement merely reflects several correlated views of the same underlying measurement. GSC-001 places one requirement on GSC-003: that composed confidence reflect genuine independence, so a reading corroborated by truly independent domains is held more firmly than one resting on a single source or on correlated signals. The assessment of independence and the mechanism by which convergence adjusts confidence are owned entirely by GSC-003; GSC-001 consumes the result and does not specify how it is computed.
10.7  Confidence is never used to hide bad news
Important asymmetry.  Low confidence damps score movement in general, but it must never be used to suppress a material, high-confidence negative finding. Where the evidence for deterioration is itself strong, that finding is confident by definition and is protected under Chapter 9. Confidence damping applies to uncertain signals, not to well-supported bad news.
11.  Freshness & Recency Integration
Present health is a present-tense question, so how recently evidence was observed matters as much as what it says. This chapter defines how the score integrates freshness, consuming the decay and longitudinal-weighting methodology owned by GSC-008.
11.1  Recency is intrinsic to a present-tense score
Because the Health Score answers "how healthy does your biology currently appear," older evidence is, all else equal, less relevant to the answer than newer evidence. But "older" is meaningful only relative to a domain’s natural cadence: a blood panel from six weeks ago is fresh, while wearable data from six weeks ago is stale. The method therefore never applies a single uniform notion of recency; it judges freshness per domain against that domain’s characteristic timescale.
11.2  Freshness is owned by GSC-008, consumed here
Ownership boundary.  The decay curves, half-lives and longitudinal-weighting policy — how fast each kind of evidence loses relevance and how recent evidence is weighted against older evidence — are owned by GSC-008. GSC-001 consumes that freshness signal and applies it to domain contributions.
GSC-001 requires from GSC-008 a freshness factor per domain that reflects how much a domain’s current evidence should still count given its age and the domain’s cadence, and a longitudinal-weighting policy that governs how recent readings are weighted against the domain’s recent history. The score applies the freshness factor when conditioning each contribution (Chapter 8), so that stale evidence contributes proportionately less without being abruptly discarded.
Where the line falls with Chapter 16.  GSC-008 owns the weighting of evidence over time — how much a past observation counts now. GSC-001 owns how the composed score is permitted to move once evidence is already weighted — the horizon expectations, recovery behaviour and persistence policy of Chapter 16. Chapter 16 consumes GSC-008’s longitudinal weighting and never redefines it: it describes the resulting behaviour of the score, not the decay of the evidence. This keeps a single owner for evidence-over-time weighting and prevents the two documents from holding divergent views of the same mechanism.
11.3  Graceful ageing, not sudden expiry
Evidence does not switch from relevant to irrelevant at a cliff edge. The method requires that relevance decay smoothly, so that a domain’s contribution fades gradually as its evidence ages and recovers smoothly as fresh evidence arrives. This smoothness is part of what keeps the score stable (Chapter 15): a score should not jump simply because a piece of evidence crossed an arbitrary age threshold overnight. When a domain’s evidence has fully aged out, the domain’s contribution approaches zero and the score’s confidence and completeness reflect the loss, exactly as for missing data.
11.4  Freshness interacts with confidence
Freshness and confidence are distinct but interacting. Stale evidence is both less relevant and, often, less certain as a description of the present, so a domain that has not been observed recently contributes less on both counts. The method keeps the two factors separate in its reasoning — one owned by GSC-008, the other by GSC-003 — but applies them together when conditioning a contribution, so the score reflects both how recent and how trustworthy each domain’s understanding is.
11.5  A worked illustration of per-domain freshness
Suppose a person has not synced their wearable for ten days but has a blood panel from six weeks ago. Ten days is many half-lives for a daily-cadence domain, so the wearable and recovery domains have largely aged out and contribute little; the score leans on the slower domains and its confidence reflects the lost currency of the fast ones. Six weeks, by contrast, is well within the informative window for blood biomarkers, so the blood domain contributes at close to full strength. A single uniform notion of recency would have treated both as "recent" or both as "old"; per-domain freshness treats each correctly against its own natural cadence. This is why freshness is judged relative to the domain, never in absolute calendar time.
11.6  Freshness and stability together
Freshness contributes directly to the stability the Constitution requires. Because relevance decays smoothly, a domain’s influence fades and returns without step changes, so the score does not jump when a piece of evidence crosses an age boundary. And because a newly-synced batch of data re-freshens a domain gradually rather than instantaneously, the arrival of new evidence updates the score smoothly rather than jerking it. Freshness is thus both a relevance mechanism and, alongside the mechanisms of Chapter 15, a stability mechanism.
12.  Cross-Domain Combination
The defining act of the Health Score is combining many domains into one. This chapter defines the cross-domain combination methodology, consuming the weighting owned by GSC-004 and the conflict-aware fusion owned by GSC-009, and specifying the properties the combination must hold.
12.1  Combination is weighted, conditioned and bounded
The composed value is formed by combining each domain’s conditioned contribution — already attenuated by confidence and freshness — under the dynamic weights supplied by GSC-004. The combination is bounded and saturating, so that the composed value stays within the interpretable scale and no single domain captures it, while material high-confidence negative findings remain visible as required by Chapter 9. The combination is reproducible: the same set of conditioned contributions and weights always yields the same composed value at a given method version.
12.2  Weighting from GSC-004
The relative weight of each domain is not decided here. GSC-001 consumes the dynamic, biologically-relevant weights that GSC-004 computes, and applies them at the composition stage. This division keeps weighting consistent across every derived indicator that uses it, so the Health Score and Biological Age reason about domain relevance through one shared methodology rather than two divergent ones. GSC-001’s only requirement on those weights is the set of properties named in Chapter 7: dynamic, relevance-driven, bounded and explainable.
12.3  Conflict-aware fusion from GSC-009
Where domains genuinely conflict, the composition must not resolve the conflict by quiet averaging. GSC-001 consumes the conflict-aware fused view that GSC-009 governs, so that real disagreement between domains is carried into the composition as genuine uncertainty rather than cancelled out. The practical effect is that a conflicted evidence picture produces a score with lower confidence and an explanation that names the tension, rather than a confident-looking number that hides it. Resolving or representing the conflict is GSC-009’s responsibility; the score’s responsibility is to consume that representation honestly.
12.4  The properties the combination must hold
Property
Why the method requires it
Weighted
A simple average would contradict the constitutional rejection of fixed weighting and dilute decisive domains.
Confidence-aware
Uncertain contributions must influence the result less than confident ones.
Freshness-aware
Stale contributions must count less than current ones, per domain cadence.
Bounded & saturating
No single domain may capture the score; extremes move it firmly but proportionately.
Negative-protecting
Material, high-confidence deterioration must remain visible and never be averaged away.
Conflict-honest
Genuine cross-domain conflict must lower confidence, not vanish into a confident number.
Reproducible
The same understanding must always yield the same score at a given method version.

Combination in one line.  Condition each domain by its confidence and freshness, weight the domains by biological relevance from GSC-004, fuse them conflict-honestly via GSC-009, and combine under a bounded, negative-protecting, reproducible rule into a single composed value and its overall confidence.
13.  Personalisation
The Health Score is a personal, present-tense reading, so it must be personalised — but personalisation must never bend the underlying science. This chapter defines what the method personalises, how, and the hard line it does not cross.
13.1  Personalisation changes relevance and baseline, never science
Personalisation operates on two things: the baseline against which a domain’s reading is judged, and the relevance a domain carries for this person. It never operates on what a biomarker means, what a band signifies, or any other scientific fact — those are fixed by the Scientific Configuration Library and are identical for everyone. Personalisation makes the score a fair reading of this person’s present health; it does not make the science personal.
The hard line.  Personalisation may change what is expected of this person and how much a domain matters for them. It may never change what the evidence scientifically means. Age, sex, goals, baseline, lifestyle and context adjust relevance and expectation, never scientific truth.
13.2  The personalisation factors
13.3  Personalisation is explainable and bounded
Every personalisation the score applies is explainable — the score can say that it judged a domain against the person’s own baseline, or weighted a domain more because of a stated goal — and bounded, so personalisation refines the reading without letting it drift away from the validated evidence. Personalisation that could not be explained, or that could override a material finding, is not permitted.
14.  Explainability
A Health Score that cannot be explained is not acceptable under this methodology. Every score must be decomposable into why it reads as it does and why it moved. This chapter defines the explainability the method must produce — the data of explanation, not its wording, which belongs to AI Behaviour.
14.1  Explainability is a requirement, not a feature
The Constitution’s commitment to transparency means the score must always be able to account for itself. The method therefore produces, alongside every score, a structured decomposition sufficient to answer a defined set of questions. This decomposition is a methodological output; how it is turned into calm, clear language for a person is owned by the AI Behaviour and delivery layers (ENG-005), which GSC-001 does not touch.
14.2  The questions every score must answer
Why did the score move?  Which changes in validated understanding since the last score are responsible for the movement, and in which direction.
What contributed?  Which domains contributed to the current score, with the direction and magnitude of each.
What contributed most?  Which domains and findings dominated the reading, so the person can see what is driving it.
How confident is it?  The overall confidence and the main reasons for it — convergence, strength, freshness, completeness.
What is uncertain?  Where the evidence is weak, conflicting or tentative, and how that limits the reading.
What is missing?  Which domains are absent or stale, and how their absence affects the score’s completeness and confidence.
What recently changed?  The recent evidence that is most responsible for the current reading and its movement.
14.3  Attribution methodology
Attribution decomposes the composed score into the contributions that produced it, so that "what contributed" and "what contributed most" have precise, reproducible answers. Because the composition is bounded, weighted and reproducible (Chapter 12), attribution is well-defined: each domain’s conditioned, weighted contribution is a share of the movement, and the method can rank those shares to identify the dominant drivers. Attribution respects confidence and freshness, so a domain that contributed little because it was uncertain or stale is explained as such rather than simply omitted.
14.4  Movement explanation
Explaining movement requires comparing the current composition to the previous one and attributing the difference. The method identifies which domains changed, by how much, and with what confidence, and reports the changes that account for the score’s movement. Because the score is deliberately stable (Chapter 15), most movements have a small number of identifiable causes, which keeps explanations honest and legible rather than diffuse.
14.5  Explainability and confidence are inseparable
An explanation that reported contributions without their confidence would be misleading. The method therefore always pairs attribution with confidence and uncertainty, so that a person is told not only what contributed but how sure the system is about each part. This is how the score stays honest: it never presents a confident-looking breakdown of an uncertain reading.
14.6  The explainability record
For every score, the method produces a structured explainability record sufficient to answer the seven questions. The record is a methodological output — a set of fields Engineering populates — not a piece of prose, and it contains, at minimum: the composed score and its overall confidence; the completeness of the domain set; the signed, weighted contribution of each domain with its confidence and freshness; the ranked dominant drivers; the movement since the previous score, decomposed into the domains responsible; the domains that were absent or stale; and the principal sources of uncertainty. From this record, the delivery layer can construct any explanation a person needs, at any level of detail, without the method having to anticipate the wording.
Record field
What it captures
Answers which question
Score & confidence
The composed score and its overall confidence.
How confident is it?
Completeness
How much of the domain picture was available.
What is missing?
Domain contributions
Each domain’s signed, weighted, conditioned contribution.
What contributed?
Dominant drivers
The ranked contributions that most shaped the score.
What contributed most?
Movement decomposition
The change since the last score, by domain.
Why did the score move?
Absent/stale domains
Domains that did not contribute and why.
What is missing?
Uncertainty sources
Where evidence was weak, conflicting or tentative.
What is uncertain?
Recent evidence
The recent changes most responsible for the reading.
What recently changed?
14.7  Explainability makes the score trustworthy
The deepest purpose of explainability is trust. A number a person cannot interrogate is a number they must either take on faith or ignore; a number they can decompose into honest, confidence-weighted reasons is one they can understand and rely on. By guaranteeing that every score carries a complete explainability record, the method ensures the Health Score is never a black box — it is always an open, accountable summary of validated understanding, which is exactly what the Constitution’s commitment to transparency requires.
15.  Stability & Anti-Oscillation
The Constitution requires the Health Score to change gradually, with daily fluctuations rarely altering it significantly. A score that flickered day to day would be worse than useless — it would train people to distrust it. This chapter defines the methodology that keeps the score stable without making it unresponsive to genuine change.
15.1  The stability mandate
Stability is a first-class design goal, not a side effect. The method must prevent daily oscillation, random movement, score flickering, overreaction to single readings, and false precision, while still allowing the score to move promptly when validated understanding genuinely changes. The tension between stability and responsiveness is resolved by making the score respond to changes in understanding rather than to changes in raw data, and by requiring changes to be sufficiently supported before they move the number.
15.2  The mechanisms of stability
Ownership of temporal state.  Confidence damping (15.2.2), hysteresis (15.2.5) and any smoothing memory operate on temporal state — the previous score, its direction of movement and recent history. That state is held and evolved by the Dynamic Health Model and its query engine (ENG-001) and is supplied to the method as an input; this document defines only the damping and hysteresis policy that operates on it. The score is therefore a pure function of present understanding, the supplied prior state and the pinned versions, which is what keeps the stability mechanisms compatible with the reproducibility guarantee of Chapters 6.9 and 21.4.
15.3  Stability is not inertia
The method is careful to distinguish stability from unresponsiveness. Genuine, confident, sustained change must move the score promptly — a person whose health has materially changed must see it. The anti-oscillation mechanisms are calibrated to suppress noise and churn, not to suppress signal. Chapter 16 defines how the score is expected to move over different time horizons, and Chapter 21 defines how the balance between stability and responsiveness is calibrated and validated.
15.4  No false precision
Stability also means refusing to imply more precision than the evidence supports. The method does not present or move the score at a granularity finer than the underlying understanding justifies, and it never expresses a change so small that it would imply the system can distinguish differences it cannot. A score that moved by trivial amounts in response to noise would be claiming false precision; the method forbids it.
15.5  A worked anti-oscillation scenario
Consider a person whose recovery readings swing up and down around a boundary from day to day — a common pattern in real wearable data. A naive method tracking the latest reading would send the score oscillating in step, up one day and down the next. The method here behaves differently at each mechanism. Confidence damping recognises that each individual swing is uncertain and attenuates it. Hysteresis requires a reversal to clear a higher bar than a continuation, so the score does not flip direction on every fluctuation. Bounded domain influence ensures that even if recovery did move, it could not by itself capture the score. Gentle scaling maps whatever residual movement survives into a small, proportionate change. The result is a calm score that holds steady through the noise and moves only if the swings resolve into a sustained, confident trend. The person sees stability where there is only noise, and movement only where there is signal.
15.6  The cost of getting stability wrong
Stability is not a cosmetic preference; it is essential to the score’s usefulness. A score that flickered would train people to ignore it, so that when it finally moved for a real reason they would not notice. A score that was too inert would hide genuine change until it was severe. The method’s stability mechanisms are therefore calibrated (Chapter 21) to sit at the honest point between these failures: as responsive as the evidence allows, as calm as the noise demands, and never either jumpy or asleep. This calibration is one of the most important ongoing responsibilities of the method’s stewards.
The stability principle.  The Health Score responds to confident changes in understanding, not to noise in data. It moves promptly for genuine, sustained, well-supported change and stays calm for everything else.
16.  Longitudinal Behaviour
Although the Health Score answers a present-tense question, its meaning is fullest over time. This chapter defines how the score is expected to move across horizons — day to day, month to month, and year to year — and how it handles recovery, persistence and trend.
16.1  Expected movement
This chapter defines how the composed score is permitted to move over time. It consumes the longitudinal weighting of evidence owned by GSC-008 (see §11.2) and does not redefine it: what follows describes the behaviour of the score given already-weighted evidence, not how evidence decays.
The score is expected to be stable over short horizons and expressive over long ones. Day to day it should barely move absent a genuine, confident change; week to week it may reflect sustained shifts in fast domains such as sleep and recovery; month to month it may reflect changes in slower domains such as blood biomarkers and body composition; and over quarters and years it should trace the real arc of a person’s present health as it evolves. This graduated expressiveness is what makes the score trustworthy as a longitudinal companion.
Horizon
Expected behaviour
Dominant domains
Day to day
Near-flat; moves only for confident, material change.
Recovery, sleep, subjective wellbeing (heavily damped).
Week to week
Small, meaningful movement for sustained shifts.
Sleep, recovery, activity trends.
Month to month
Clearer movement as slow domains update.
Blood biomarkers, body composition, behavioural history.
Quarter to year
Expresses the genuine arc of present health.
All domains via their longitudinal trends.
16.2  Short-term movement
Short-term movement is deliberately constrained. Fast domains are the most volatile and the least individually reliable, so their short-term influence is the most heavily damped by confidence and hysteresis. The method allows short-term movement when a fast-domain change is both large and confident — a clear, sustained collapse in recovery, for instance — but suppresses it when the change is small or uncertain. The default short-term behaviour of the score is calm.
16.3  Long-term movement
Long-term movement is where the score is most expressive and most meaningful. Sustained changes accumulate: a domain that improves and stays improved shifts the person’s baseline and raises the score durably; a domain that deteriorates and stays deteriorated lowers it. Because slow domains move on month-to-year cadences, their contributions to long-term movement are both the most stable and the most significant. The method is designed so that the long-run trajectory of the score reflects genuine, durable change rather than the accumulation of noise.
16.4  Recovery after deterioration
When a person recovers from a period of poor health, the score should recover too — but honestly. The method lets the score rise as validated understanding improves, subject to the same durability discipline that governs improvement generally (Chapter 9): a genuine, sustained recovery is reflected promptly once it is confident, while a fragile, unproven upswing is treated tentatively. Recovery is never gated so tightly that real improvement is hidden, nor so loosely that a single good week erases the memory of a genuine problem.
16.5  Persistent improvements
Persistence is what converts a movement into a new baseline. When an improvement endures, the method’s policy is that the improved state should become the new reference against which future readings are judged; the reset of the baseline itself is effected in the Dynamic Health Model (ENG-001), which owns Biological Identity, and is then consumed by the score. This prevents the score from endlessly rewarding a person for a gain they have already consolidated, and keeps the score focused on present health relative to who the person now is, not who they used to be. The safeguard against this normalising genuine decline is defined in §8.7.
16.6  Trend effects
The direction and persistence of change — the longitudinal-trends domain of Chapter 5 — informs the present score without becoming the score’s subject. A consistent improving trend lends confidence and context to the present reading; a consistent deteriorating trend does likewise in the other direction. The method consumes trend as one input to present health, while leaving the explicit measurement of the journey over time to Biological Age (GSC-002), with which the Health Score is complementary but never redundant.
17.  Missing & Degraded Data
Real people have incomplete data, and the score must degrade gracefully rather than break or mislead. This chapter defines how the method composes a meaningful, honest score from whatever subset of domains is validly present, and how it communicates the resulting limitations.
17.1  The graceful-degradation principle
The method is built to produce a meaningful score from a partial set of domains and to become more complete and more confident as more data arrives, never to fail because something is absent. A person with only wearable data, or only a blood panel, or a sparse history, still receives a score — one that is honest about what it could and could not see. Degradation lowers confidence and completeness; it does not fabricate the missing pieces.
17.2  The specific missing cases
17.3  Missing is never neutral
The method never imputes a missing domain as if it were reading at baseline, because that would silently invent good news. A missing domain contributes nothing and lowers completeness and confidence. This is the single most important discipline in degraded-data handling: the score would rather be honestly less confident than falsely complete.
17.4  Completeness as an explicit property
Alongside confidence, the score carries a notion of completeness — how much of the intended domain picture was actually available. Completeness is reported in the explainability decomposition (Chapter 14) so a person understands whether a modest score reflects genuine findings or simply a thin evidence base. A low-completeness score invites the person to add data rather than to worry, and the method is designed to make that improvement path clear.
17.5  Progressive enrichment
The method treats data as something that accumulates, and it is designed so that adding a domain improves the score’s confidence and completeness monotonically — more evidence never makes the score less trustworthy, only more so. When a person who had only wearable data adds a blood panel, the blood domain begins contributing, completeness rises, and confidence rises with it as the picture deepens. This progressive enrichment is important behaviourally: it rewards the person for engaging, it makes the value of adding data legible, and it means the score a person sees on day one and the score they see after months of data are the same kind of object, differing in confidence and completeness rather than in nature.
17.6  Degraded data never becomes degraded honesty
However sparse the data, the method’s honesty does not degrade. A score built on little evidence is still explainable, still confidence-weighted, still free of imputation, and still protected against masking a material finding in whatever domains are present. Graceful degradation means the score becomes less complete and less confident as data thins — never less honest. This is the final discipline of degraded-data handling and the one that most protects the person: a thin score tells the truth about being thin.
Degradation rule.  When data is missing, lower confidence and completeness — never fabricate a contribution. A partial score is honest; an imputed one is not.
18.  Relationship to Recommendations & Behaviour
The Health Score reflects health; it never decides what a person should do. This short but load-bearing chapter fixes the boundary between the score and the documents that own action, so no future reader mistakes a reflection for an instruction.
18.1  The score reflects; it does not recommend
The Health Score is a reading of present health. It is not a recommendation, a priority list, or a call to action. Deciding what is worth surfacing to a person today — which interventions to recommend, in what order, within what cognitive-load and communication budget — is owned entirely by GSC-005, Intervention Prioritisation. The score may be an input that GSC-005 considers, but the score itself holds no authority over what is recommended and must never be read as issuing recommendations.
18.2  Reference to GSC-005 without duplication
Ownership boundary.  GSC-001 defines the score. GSC-005 decides what to surface. The score never orders, selects, budgets or suppresses recommendations; that is GSC-005’s sole responsibility. This document references GSC-005 only to disclaim any authority over it.
18.3  Reference to GSC-006 without duplication
How realistically a person can act — their behavioural capacity — personalises what is recommended and how, and is owned by GSC-006. It does not personalise the score’s reading of present health. GSC-001 references GSC-006 only to make clear that behavioural capacity shapes action, not the score. A person’s limited capacity to act on a finding never softens the score’s honest reflection of that finding.
18.4  Why the separation matters
Keeping the score free of recommendation authority protects both the score and the person. It keeps the score an honest mirror rather than a persuasive instrument, so a person can trust that the number reflects their biology and not an attempt to nudge them. And it keeps recommendation logic in one governed place (GSC-005), where cognitive load, communication budget and suppression of low-value advice are handled with the care they require. A score that recommended would blur two responsibilities the architecture deliberately keeps apart.
19.  Failure Modes & Safeguards
A methodology of this importance must anticipate how it could go wrong and specify the safeguards that prevent it. This chapter enumerates the failure modes the method is designed to resist and the safeguard in each case. None of these safeguards is optional; together they define what it means for the method to behave responsibly.
19.1  Overreaction to noise
Failure mode.  A noisy reading in a fast domain causes the score to lurch, training the person to distrust it.
Safeguard.  Confidence damping, hysteresis and bounded domain influence (Chapter 15) suppress noise-driven movement; the score responds to changes in understanding, not to raw data. The composition’s breadth further dilutes any single volatile domain.
19.2  Masking of genuine deterioration
Failure mode.  Many mildly positive domains average away one serious, confident negative finding, so a person never sees a real problem.
Safeguard.  Negative protection (Chapters 6 and 9) exempts material, high-confidence deterioration from saturation, keeping it visible in the score and named in the explanation.
19.3  False confidence on thin evidence
Failure mode.  A score built on a single domain or stale data is presented as though it were well-supported.
Safeguard.  Composed confidence (GSC-003) and explicit completeness (Chapter 17) lower the score’s confidence when evidence is thin or stale, and the explainability layer surfaces the limitation rather than hiding it.
19.4  Silent imputation of missing data
Failure mode.  A missing domain is treated as if it were reading at baseline, inventing good news.
Safeguard.  The missing-is-not-neutral rule (Chapters 9 and 17) forbids imputation; missing domains contribute nothing and lower confidence and completeness.
19.5  Drift into clinical claims
Failure mode.  The score, or its presentation, begins to imply diagnosis or clinical risk.
Safeguard.  The wellness-first foundation (Chapter 4) and the scope constraints (Chapter 23) forbid clinical framing; governance review (Chapter 22) blocks any change that would introduce a clinical claim, and narrative framing is owned by AI Behaviour under its own constraints.
19.6  Personalisation flattering the person
Failure mode.  Goal-based or context-based personalisation quietly discounts an inconvenient but material finding.
Safeguard.  Personalisation is bounded and may never weight away a material or safety-relevant finding (Chapter 13); the hard line keeps personalisation on relevance and baseline, never on science.
19.7  Silent rewriting of history
Failure mode.  A method or dependency change retroactively alters past scores, corrupting the longitudinal record.
Safeguard.  Version pinning (Chapters 6 and 20) ties every score to the method and dependency versions that produced it; recalibration changes future scores only, and past scores remain reproducible.
19.8  Dependency contradiction
Failure mode.  A change in GSC-003, GSC-004 or GSC-008 interacts badly with the score, producing unexpected behaviour.
Safeguard.  Regression protection (Chapters 21 and 22) requires the reference and stability suites to continue holding when any dependency version changes; a combination that fails regression is not released.

The safeguard principle.  Every way the score could mislead — by overreacting, masking, over-claiming, imputing, drifting clinical, flattering, rewriting history or contradicting a dependency — has a named, non-optional safeguard. Honesty is engineered in, not hoped for.
20.  Relationship to Biological Age (GSC-002)
The Health Score and Biological Age are the two visible indicators of BioSense, and the Constitution deliberately keeps them distinct. This chapter defines their relationship so that GSC-001 and GSC-002 remain complementary and never redundant or contradictory.
20.1  Two questions, deliberately separated
The Constitution assigns each indicator its own question. The Health Score asks how healthy the person’s biology currently appears; Biological Age asks how the person’s biology appears to be ageing over time. Health describes today; Biological Age describes the journey. Neither replaces the other, and together they give a richer picture than either alone. GSC-001 owns only the present-tense question and must never drift into estimating the journey — that is GSC-002’s sole responsibility.
20.2  Shared foundations, distinct methods
The two indicators share foundations: both are derived engine outputs computed by ENG-001 from Dynamic Health Model understanding; both carry their own method version; both consume cross-domain weighting from GSC-004, confidence from GSC-003 and freshness from GSC-008. But their methods differ in emphasis. The Health Score privileges present readings and treats trend as context; Biological Age privileges sustained trajectory and treats any single reading as almost irrelevant. The Constitution notes that Biological Age moves even more slowly than the Health Score, requiring months or years of evidence, and that transient events do not materially affect it.
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
20.3  Consistency without coupling
The two indicators should be broadly consistent — a person whose present health is durably poor will, over time, tend to show an older biological age — but they are not mechanically coupled. The Health Score does not compute Biological Age and Biological Age does not compute the Health Score; neither is an input to the other’s method. This independence is deliberate: coupling them would let a transient dip in one distort the other, violating the Constitution’s insistence that Biological Age ignore transient events. They converge because they read the same underlying understanding, not because one drives the other.
20.4  Why the separation is protected
Keeping the two methods separate protects the meaning of each. The Health Score can move for a genuine present change without implying the person has aged; Biological Age can hold steady through a temporary illness without implying present health is fine. A person reading both indicators receives two honest, non-redundant answers. GSC-001 therefore references GSC-002 only to disclaim overlap: it owns the present, leaves the journey to GSC-002, and never blurs the two.
21.  Validation & Calibration Philosophy
A method that produces a number people rely on must be validated, calibrated and reproducible, and it must be able to be recalibrated as understanding improves. This chapter defines the validation and calibration philosophy — the discipline, not the executable tests, which Engineering implements.
21.1  What calibration means for the Health Score
Calibration is the ongoing process of ensuring that a given score means broadly the same thing across people and across time, and that its confidence is honest — that scores presented with high confidence are in fact more reliable than those presented with low confidence. Because the Health Score makes no clinical-outcome claim, calibration is not against disease endpoints; it is against internal consistency, stability behaviour, and the correspondence between stated confidence and realised reliability, using the calibration loop that GSC-003 owns for the confidence component.
21.2  Calibration philosophy
Calibrate confidence against outcomes.  Stated confidence is checked against how reliably scores of that confidence held up as more evidence arrived, and the confidence composition (GSC-003) is tuned accordingly.
Calibrate stability against noise.  The anti-oscillation parameters are tuned so the score is as responsive as it can be to genuine change while remaining calm against noise — neither jumpy nor inert.
Calibrate scale for legibility.  The mapping from composed value to expressed score is tuned so that scores are consistently interpretable across the population, without implying clinical meaning.
Calibrate without changing science.  Calibration adjusts the method’s configuration, never the validated science it consumes. A recalibration never reinterprets a biomarker.
21.3  Testing philosophy
The method is specified so that Engineering can test it rigorously: with reference cases whose expected behaviour is known, with regression suites that guard against unintended movement when the method or its dependencies change, and with stability tests that confirm the score does not oscillate under noisy inputs. Testing verifies that the method behaves as specified; it is owned and executed by Engineering, but the properties it verifies — boundedness, negative-protection, reproducibility, graceful degradation, honest confidence — are defined here.
21.4  Reproducibility
Every score must be reproducible: the same validated understanding, together with the same ENG-001-supplied prior state, at the same method version and the same dependency versions, must always yield the same score and the same explanation. Reproducibility is what makes the score auditable and what makes calibration meaningful. It is guaranteed by the method being deterministic given its inputs — present understanding plus supplied prior state — and its pinned versions, and by ENG-001 recording the method version, dependency versions and the prior state on every snapshot. Because the prior state is recorded alongside each snapshot, a path-dependent score remains fully reproducible: the history that produced it is part of the audited input, not a hidden variable. A score that could not be reproduced could not be trusted or explained.
21.5  Explainability as a validation criterion
A score that cannot explain itself fails validation, regardless of how reasonable its number looks. The method therefore treats the completeness and honesty of the explainability decomposition (Chapter 14) as a first-class validation criterion: every score produced in testing must yield a decomposition that correctly attributes its value and movement, names its confidence and uncertainty, and identifies what was missing. Explainability is not validated after the fact; it is part of what "correct" means.
21.6  Future recalibration
The method is expected to be recalibrated over its lifetime as the population of users grows, as calibration data accumulates, and as the dependency methodologies (GSC-003, GSC-004, GSC-008) evolve. Recalibration is a governed change to configuration, carried out under Chapter 22, that produces a new method version. Because scores pin to the method version that produced them, recalibration never silently rewrites past scores; it changes how future scores are computed while preserving the reproducibility and explanation of past ones.
22.  Governance
GSC-001 is governed with the same discipline as GSC-000 and the Scientific Configuration Library, inheriting the governance model of the Global Scientific Configuration Architecture without alteration. This chapter records how the Health Score methodology is versioned, approved, reviewed and amended.
22.1  Versioning
The Health Score methodology carries a method version — the HEALTH_SCORE_METHOD_VERSION that ENG-001 records on every computed snapshot. Every material change to the methodology or its configurable defaults produces a new method version with a publication date, a change summary, a rationale, and a record of affected consumers and expected behavioural impact. Historical versions are retained permanently, so that any past score remains reproducible against the exact method that produced it. The method version is the join between this document and the engine, and it is never reused or overwritten.
22.2  Ownership
This document is owned by the BioSense Scientific and Data-Science Authoring function, which is responsible for the methodology, its configurable defaults and its calibration. Engineering owns the implementation that executes the method. The Scientific Configuration Library owns the science the method consumes. These ownerships are distinct and are not permitted to blur: a change to the method is not a code change, and a change to the science is not a method change.
22.3  Founder approval
Material changes to the Health Score methodology — anything that changes how the score is composed, weighted, conditioned, scaled or calibrated in a way that alters scores or their confidence — take effect only on written approval by the designated authority, recorded with the approving identity and date. Editorial clarifications that do not change behaviour follow the lighter path defined in the amendment procedure.
22.4  Scientific and clinical review
Because the score is consumed by users as a reflection of their health, changes that affect how it reads or how confident it appears undergo documented scientific review, and any change touching areas the medical advisory function oversees is reviewed by that function. The method may never be changed in a way that would cause it to imply clinical claims or to soften a material finding without that review.
22.5  Engineering implementation & regression protection
Approved methodology changes are implemented by ENG-001 as a new method version, never by ad-hoc adjustment of a running system. Every change is accompanied by regression protection: the reference and stability suites of Chapter 21 must continue to hold, so that a change intended to improve one behaviour cannot silently degrade another. A methodology change that fails regression is not released.
22.6  Backward compatibility & audit
Scores pin to the method version that produced them, so past scores and their explanations are never silently rewritten by a later version. The change log and audit history record every version, its rationale and its approver, so the evolution of the methodology is fully traceable. A person’s historical score is a fact about what BioSense understood then, and the governance model protects it as such.
22.7  Interaction with Engineering
Responsibility
GSC-001 (method)
ENG-001 (engine)
Define composition & framework
Yes
No
Own configurable defaults & calibration
Yes
No
Execute computation & caching
No
Yes
Record method version on snapshots
Defines the version
Records it
Guarantee reproducibility
Specifies the requirement
Implements it
Change under governance
Owns the methodology change
Implements the approved change
22.8  Amendment procedure
Amendments follow the GSC-000 procedure: a written proposal identifying the change and its rationale; classification as editorial, configuration-material or architecture-level; scientific and, where relevant, medical-advisory review for material changes; ratification by the designated authority; and publication under version control with superseded versions archived, never deleted. The Health Score methodology changes only through this procedure, and never through convenience, silence or engineering expedience.
23.  Constraints & Scope Boundaries
This chapter restates, as binding constraints, the boundaries that keep GSC-001 compliant with GSC-000 and the Constitution. They are collected here so that any future revision can be checked against them at a glance.
23.1  What GSC-001 does not do
It does not compute.  All calculation, caching and snapshotting are performed by ENG-001. This document contains no software code.
It does not invent or reinterpret science.  Every input is validated understanding from the Scientific Configuration Library; the method never creates, changes or overrides a scientific finding.
It does not own weighting, confidence or freshness.  Those methodologies belong to GSC-004, GSC-003 and GSC-008 respectively; GSC-001 consumes them.
It does not recommend.  What to surface is owned by GSC-005; the score reflects health and issues no recommendations.
It does not resolve cross-domain conflict.  That is owned by GSC-009; the score consumes the conflict-aware fused view.
It does not set safety.  The deterministic safety floor is owned by ENG-010 and is never a function of the score.
It does not write narrative or UI.  How the score is expressed is owned by AI Behaviour and delivery (ENG-005); this document produces only the score and its explainability data.
It does not diagnose.  The score is a wellness-first reflection of present health, never a clinical risk score or a diagnosis.
23.2  What GSC-001 does own
Within those boundaries, GSC-001 owns exactly one thing and owns it completely: the named, versioned method by which validated understanding across domains becomes a single, stable, explainable, confidence-bearing measure of present health — its philosophy, its mathematical framework, its weighting philosophy, its contribution methodology, its treatment of positive and negative evidence, its integration of confidence and freshness and cross-domain combination, its personalisation, explainability, stability and longitudinal behaviour, its handling of missing data, and its validation, calibration and governance. Everything the score is, as a method, is defined here; everything the score does, as a computation, is performed elsewhere.
23.3  Compliance statement
This document complies with GSC-000 in full.  It respects the constitutional hierarchy, the layer boundaries, and the ownership of Engineering, the Scientific Configuration Library, AI Behaviour and deterministic safety. It positions the Health Score as configuration and methodology at Level 3.5, consumed by Engineering, and it consumes its dependencies without duplicating their ownership. It creates no science and overrides no safety.
24.  Design-Decision Register
This register records the principal methodological decisions taken in GSC-001, each with the alternative considered and the reason for the choice. It exists so that future stewards can revisit a decision deliberately rather than by accident, and so that the rationale behind the method is preserved alongside the method itself.
24.1  Compose from understanding, not raw data
Decision.  The score is composed from validated understanding held in the Dynamic Health Model, never from raw observations.
Alternative considered.  Computing the score directly from raw signals for maximum responsiveness.
Rationale.  ENG-001 forbids the engine from analysing observations independently, and composing from understanding inherits the model’s stability and scientific grounding. Raw composition would reintroduce noise and risk creating science the SCL had not validated.
24.2  Dynamic weighting, not fixed shares
Decision.  Domain contributions are weighted dynamically by biological relevance, consumed from GSC-004.
Alternative considered.  Assigning each domain a fixed percentage of the score for simplicity and predictability.
Rationale.  The Constitution (13.7) explicitly rejects fixed weighting. Fixed shares would misread present health whenever the relevant domain differed from the assumed one, and would let irrelevant domains dilute decisive ones.
24.3  Protect material negative findings from saturation
Decision.  Material, high-confidence deterioration is protected from being averaged or saturated into invisibility.
Alternative considered.  Treating all domains symmetrically under a pure weighted mean.
Rationale.  The score exists to help people notice genuine problems. A pure mean would let many mildly positive domains mask one serious negative one — exactly the signal a person most needs to see.
24.4  Missing is not neutral
Decision.  A missing domain contributes nothing and lowers confidence and completeness; it is never imputed at baseline.
Alternative considered.  Imputing missing domains at the population or personal mean to keep the composition full.
Rationale.  Imputation silently invents good news and hides the thinness of the evidence base. Honest incompleteness is preferable to false completeness.
24.5  Confidence changes behaviour, not just labelling
Decision.  Low-confidence scores move more cautiously, claim less and lean on stable domains.
Alternative considered.  Attaching a confidence label while computing the score identically regardless of confidence.
Rationale.  The Constitution requires confidence to be substance, not decoration. A confidence that did not change behaviour would be cosmetic and would let the score overreach on thin evidence.
24.6  Personal baseline over population position
Decision.  Contributions are judged against the person’s own established baseline where one exists.
Alternative considered.  Scoring purely against population reference ranges.
Rationale.  The Health Score is a personal, present-tense reading. A personal baseline lets the score recognise genuine change for this individual rather than merely restating population position.
24.7  Stability via hysteresis and confidence damping
Decision.  The score resists reversing recent movements and damps low-confidence change to prevent oscillation.
Alternative considered.  Letting the score track the latest composition directly for maximum responsiveness.
Rationale.  The Constitution (16.13) requires gradual change and warns against daily fluctuation. Direct tracking would produce flicker that trains people to distrust the score.
24.8  No recommendation authority
Decision.  The score reflects health and issues no recommendations; what to surface is owned by GSC-005.
Alternative considered.  Letting the score drive or rank recommendations directly, since it summarises health.
Rationale.  Blurring reflection and recommendation would make the score a persuasive instrument and duplicate GSC-005’s ownership. Keeping them separate protects both the score’s honesty and the care GSC-005 applies to communication.
24.9  Dual reference: personal baseline plus population anchor
Decision.  The score reads change against the personal baseline but retains a population-appropriate anchor, and surfaces sustained divergence between the two — through its own confidence and explainability output — rather than absorbing it (§8.7).
Alternative considered.  Using the personal baseline alone, for maximum sensitivity to individual change.
Rationale.  A personal baseline alone can normalise slow, uniform, whole-person decline by continually re-referencing to the drifting state. The dual reference preserves personal sensitivity while preventing normalised decline — a safety-relevant robustness property that is also a distinctive, defensible element of the method.
24.10  Stable predispositions and exposures inform baseline, not domains
Decision.  Genetics and environmental exposures inform the expected baseline and personalisation rather than contributing as present-state scoring domains; episodic modalities contribute through validated understanding, not as raw streams (§5.6).
Alternative considered.  Admitting genetics, exposures and every new modality as present-state domains for completeness.
Rationale.  A lifetime-stable predisposition placed in a present-tense domain would either never move (adding noise to weighting) or move wrongly. Locating it in baseline/personalisation keeps each domain a genuine present-health reading and gives future integrations a considered home rather than an accidental one.
24.11  Temporal state owned by ENG-001; method owns only policy
Decision.  Stability and longitudinal mechanisms operate on prior state (previous score, direction, smoothing memory) held and evolved by ENG-001 and supplied to the method; GSC-001 defines only the policy (§6.9, §15.2.7, §21.4).
Alternative considered.  Letting the method hold and evolve its own temporal state for self-containment.
Rationale.  A method that held its own history would duplicate DHM state ownership and make the score path-dependent in a way that undermines the reproducibility guarantee. Placing state in ENG-001 and recording it on each snapshot preserves both stability and reproducibility.
25.  A Worked Longitudinal Scenario
This chapter traces a single person’s Health Score across a year to illustrate how the methodology behaves over time. It is conceptual and contains no computed values; its purpose is to show the method’s expected behaviour, not to assert numbers.
25.1  The starting point
A new user joins with a single blood panel and a wearable device. At onboarding the method has no personal baseline, so it judges the blood panel against population-appropriate expectations validated in the science and reads the first weeks of wearable data tentatively. The initial score is presented with modest confidence and low completeness, and its explanation makes clear that BioSense is still learning the person. The score is honest that it is an early estimate rather than a settled reading.
25.2  The first quarter — a baseline forms
As weeks of wearable and sleep data accumulate, a personal baseline forms and confidence rises. The score becomes steadier and its completeness improves. No single day moves it; instead it settles toward a stable reading of the person’s present health as the model’s understanding consolidates. If the person’s early weeks included a period of poor sleep that then resolved, the score reflects the resolution gradually rather than snapping between states.
25.3  A mid-year deterioration
Midway through the year the person develops a genuine metabolic change, visible in a follow-up blood panel and corroborated by a decline in recovery. Because the finding is material, confident and convergent across two domains, the negative-protection methodology ensures it moves the score down promptly and visibly, rather than being averaged away by unaffected domains. The explanation names the metabolic finding as the dominant driver and reports the corroborating recovery decline. The score does not plunge dramatically — it moves firmly and proportionately — but the person is left in no doubt that something meaningful has changed.
25.4  Recovery and consolidation
The person acts on the change and, over the following months, the metabolic marker improves and recovery returns to baseline. The score rises as the improvement proves durable, subject to the durability discipline that prevents a single good reading from prematurely erasing the earlier concern. Once the improvement persists, the Dynamic Health Model resets the person’s baseline to the improved state under the method’s policy, so the score reflects present health relative to who the person now is. By year end the score is stable, confident and complete, and its longitudinal explanation can recount the dip and the recovery as a coherent story.
25.5  What the scenario demonstrates
Graceful cold start.  The score was meaningful from day one and grew more confident and complete as evidence arrived.
Stability against noise.  No single day moved the score; only sustained, confident change did.
Visibility of genuine problems.  A material, confident, convergent deterioration moved the score promptly and was named in the explanation.
Honest recovery.  Improvement was reflected once durable, and the baseline reset so the score stayed focused on present health.
Explainability throughout.  At every stage the score could account for its value, its movement, its confidence and what was missing.
26.  Domain Reference Summary
This reference consolidates the domains of Chapter 5 with their characteristic timescales, their typical role in present health, and the dependency signals that most affect their contribution. It is a summary for engineering reference and does not introduce new methodology.

Domain
Timescale
Typical role in present health
Most affected by
Blood biomarkers
Weeks–months
Deepest clinical signals; often decisive when present.
Freshness (slow decay); confidence (high when validated).
Wearable physiology
Daily
Present resilience and autonomic state; trend over spot.
Confidence damping; freshness (fast decay).
Sleep
Nightly
Cumulative restoration; short runs meaningful.
Freshness; confidence for single nights.
Recovery
Days
Present readiness; closest to the "now" question.
Confidence; convergence with wearable.
Activity
Days–weeks
Sustained condition; pattern over sessions.
Freshness; longitudinal weighting.
Body composition
Months
Slow structural context; expects slow movement.
Stability rules; suspicion of sudden shifts.
Nutrition
Weeks
Pattern-level influence, often via other domains.
Confidence (varies with data quality).
Subjective wellbeing
Days
Personally meaningful lived experience.
Confidence (self-reported); freshness.
Behavioural history
Months
Durable stabilising context.
Longitudinal weighting; persistence.
Longitudinal trends
Months–years
Direction and persistence; contextualises the present.
Freshness across the trend; convergence.

Reference note.  Timescales are characteristic, not rigid, and are used by GSC-008 to judge freshness per domain. Roles describe typical contribution; actual weight is always dynamic and set by GSC-004 for the specific person and moment.
27.  Glossary of Methodological Terms
The following terms carry specific meanings within this methodology. They are collected here to keep the document precise and to give Engineering and future stewards a shared vocabulary.
Health Score  — A single, bounded, explainable, confidence-bearing measure of how healthy a person’s biology currently appears, composed from validated understanding across domains.
Domain  — A grouping of validated understanding sharing a physiological meaning and characteristic timescale; the unit the score reasons about and GSC-004 weights.
Domain contribution  — A signed, bounded quantity expressing how far a domain’s present-health reading departs from the person’s expected baseline, conditioned by confidence and freshness.
Baseline  — The expected physiological reference against which a domain’s reading is judged — the person’s own established identity where it exists, a population-appropriate expectation otherwise.
Expected baseline  — The specific reference a contribution is measured against: the person’s Biological Identity (owned by ENG-001) where established, otherwise a population-appropriate expectation validated in the science. GSC-001 consumes it and never computes or stores it.
Material (finding)  — A finding significant enough to trigger negative protection. Materiality is a function of the finding’s magnitude and its confidence; the threshold and its exact form are a requirement GSC-001 places on GSC-004, which owns weighting, rather than a value defined in this document. A material, high-confidence negative finding is protected from being averaged or bounded into invisibility.
Durability discipline  — The methodological requirement that improvement raise the score only once it has proven durable — a sustained, confident change rather than a single good reading — so that transient upswings are not prematurely rewarded and genuine recovery is not hidden. Governed by the longitudinal methodology of Chapter 16.
Prior state  — The temporal state supplied to the method by ENG-001 — the previous score, its direction of movement and any smoothing memory — on which the stability and longitudinal mechanisms operate. Held and evolved by ENG-001, not by the method; recorded on each snapshot so the score remains reproducible.
Dual reference  — The use of a personal baseline for sensitivity to change together with a retained population-appropriate anchor, with sustained divergence between them surfaced rather than normalised, so that slow whole-person drift cannot be silently absorbed (§8.7).
Conditioning  — The attenuation of a domain contribution by its confidence (GSC-003) and freshness (GSC-008) before composition.
Composition  — The weighted, bounded, negative-protecting combination of conditioned contributions into a single composed value.
Composed value  — The internal result of composition, before expression on the score scale.
Expression  — The mapping of the composed value to the bounded score scale, together with the attachment of overall confidence and explainability.
Confidence  — A composed, calibrated measure (owned by GSC-003) of how much the system trusts a contribution or the overall score; it changes the score’s behaviour, not just its label.
Freshness  — A per-domain measure (owned by GSC-008) of how much a domain’s evidence should still count given its age relative to the domain’s cadence.
Completeness  — How much of the intended domain picture was actually available for a given score; reported alongside confidence.
Negative protection  — The methodological guarantee that material, high-confidence deterioration remains visible in the score rather than being averaged or saturated away.
Hysteresis  — The resistance to reversing a recent score movement without sufficient new evidence, used to prevent oscillation.
Method version  — The named, versioned identifier (HEALTH_SCORE_METHOD_VERSION) of the methodology that produced a score; recorded by ENG-001 on every snapshot for reproducibility.
Reproducibility  — The property that the same understanding, at the same method and dependency versions, always yields the same score and explanation.
28.  Completion
GSC-001 defines the complete methodology of the BioSense Health Score: its philosophy and the question it answers; its architectural position and the seam between method and computation; the constitutional and scientific foundations it consumes; the scoring domains; the mathematical framework, weighting philosophy and domain-contribution methodology; the treatment of positive, negative, conflicting, missing and stale evidence; the integration of confidence, freshness and cross-domain combination; personalisation, explainability, stability and longitudinal behaviour; the handling of missing and degraded data; the relationship to recommendations and behaviour; and the validation, calibration and governance under which the method lives and evolves.
No software code, prompt logic or user-interface behaviour has been defined, by design. Every calculation is performed by ENG-001, executing this named, versioned method and recording its version on every snapshot. The method consumes validated science and never creates it, consumes weighting, confidence and freshness from GSC-004, GSC-003 and GSC-008, references GSC-005, GSC-006 and GSC-009 without duplicating their ownership, and overrides neither AI Behaviour nor the deterministic safety floor. It complies with GSC-000 in full.

Status
Ready for Founder Review.

END OF GSC-001

