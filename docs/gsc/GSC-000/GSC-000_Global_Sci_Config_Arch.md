BioSense
Engineering Library · Phase 3
GSC-000
Global Scientific Configuration Architecture
The master architectural specification governing the Global Scientific Configuration Library
Document ID  GSC-000
Version  1.1 (Ratified architectural revision — Ready for Founder Review)
Status  Ready for Founder Review
Layer  Global Scientific Configuration (Level 4.5 — configuration above the Scientific Configuration Library)
Authority  BioSense Intelligence Constitution (1A–1C); subordinate to the Canonical Scientific Library
Owner  BioSense Scientific & Data-Science Authoring (Origin BioSense Technologies FZCO)
Classification  Confidential — Internal Engineering Specification
Revision note  v1.1 folds the previously proposed GSC-010 (Insight Selection & Cognitive-Load Governance) into GSC-005. The Global Scientific Configuration Library is now frozen at ten documents (GSC-000 through GSC-009). No other architecture is changed.
This document defines architecture only. It does not define mathematical algorithms, scoring formulae, weightings or calculations. Those belong to the individual Global Scientific Configuration methodology documents (GSC-001 onward) and are explicitly out of scope here.

Contents
1.  Purpose, Status & How to Read This Document
2.  Why the Global Scientific Configuration Layer Exists
3.  Architectural Position in the BioSense Hierarchy
4.  Architectural Boundaries — Who Owns What
5.  Interaction With Existing Systems
6.  The Global Scientific Configuration in the Reasoning Pipeline
7.  The Proposed Global Scientific Configuration Library
8.  Critical Architecture Review
9.  Permanent Architectural Principles
10.  The Complete BioSense Intelligence Pipeline
11.  Governance
12.  Engineering Consumption Guidance
13.  Constraints & Founder Decisions Requested
14.  Completion
1.  Purpose, Status & How to Read This Document
1.1  Objective
GSC-000 is the founding architectural specification of the Global Scientific Configuration Library. It occupies, for the Global Scientific Configuration layer, the same role that SCL-001 occupies for the Scientific Configuration Library: it establishes the permanent architecture, responsibilities, governance, document standards, interactions and implementation boundaries that every future Global Scientific Configuration document must obey. It is the master document that all of GSC-001 through GSC-009 (and any successor) inherit from and remain subordinate to.
The purpose of this document is deliberately narrow and deliberately permanent. It defines where the Global Scientific Configuration layer sits, what it is allowed to own, what it must never own, how it relates to every neighbouring system, and how it is governed. It does not define a single algorithm, weighting, score or formula. Those are the responsibility of the individual methodology documents that this architecture will later govern.
1.2  What this document is — and is not
This is a permanent engineering specification.  It is written for Founder approval and direct engineering reference, and is intended for permanent inclusion in the BioSense Engineering Library.
It is not a discussion document, a draft to be re-opened casually, an outline, or brainstorming notes. Once ratified and frozen it changes only through the governance procedure defined in Chapter 12.
1.3  Authority and precedence
GSC-000 derives its authority from, and is subordinate to, the BioSense Intelligence Constitution (Documents 1A–1C) and the Canonical Scientific Library. It sits beneath scientific truth and the Constitution, alongside and beneath the Reasoning Architecture, and above prompt engineering and software implementation only in the specific sense that it supplies the versioned configuration those layers consume. The precise position of the Global Scientific Configuration layer in the constitutional hierarchy of authority is defined in Chapter 3 and must be read as binding.
The single most important precedence rule in this document is this: the Global Scientific Configuration layer never establishes, overrides or reinterprets scientific truth. It governs how already-validated science is prioritised, weighted, given confidence, synthesised, ordered and turned into intelligence. Where this document and the Scientific Configuration Library appear to disagree about what is scientifically true, the Scientific Configuration Library prevails without exception.
1.4  How to read this document
Chapters 2 and 3 establish why the layer exists and where it sits. Chapter 4 draws the architectural boundaries between every layer of BioSense so that no responsibility is duplicated or moved. Chapters 5 and 6 describe the interactions with existing systems and the complete reasoning pipeline. Chapter 7 reviews the proposed Global Scientific Configuration Library document-by-document. Chapter 8 critically evaluates whether that proposed structure is optimal and records the recommended changes. Chapters 9 through 13 define the permanent architectural principles, governance, engineering-consumption guidance, constraints and the founder decisions requested. Chapter 14 records completion status.
2.  Why the Global Scientific Configuration Layer Exists
BioSense already knows what is scientifically true, and already has the engines to execute. What it does not yet have, as a governed and versioned artefact, is the layer of judgement that decides how that truth is weighted, prioritised, given confidence and synthesised into intelligence. That layer exists today only implicitly, scattered across prompts, code and the reasoning architecture. GSC makes it explicit.
2.1  The problem this layer solves
The Scientific Configuration Library answers the question "what is true about this biomarker?" with rigour and discipline. The Engineering layer answers the question "how do we execute reasoning reliably at scale?" The AI Behaviour layer answers "how should this be said?" Between the science and the execution there is a third question that no existing layer owns cleanly:
"Given everything we now validly know across every domain, how much should each signal count, how confident should we be, what matters most for this person today, and how do we combine it all into a single coherent picture?"
This is the question of prioritisation, weighting, confidence, synthesis, ordering and presentation. The Reasoning Architecture (Document 1B) repeatedly identifies the parameters that answer it — the significance threshold, the durability threshold, the per-metric expected-variation bands, the confidence-calculus weights, the convergence factor, the cold-start baseline sizes, the escalation floor — and states plainly that these are "versioned configuration owned by the medical/data-science function, not values the model produces at runtime." Today that configuration has a mandated existence but no permanent home, no numbering, no governance and no document standard. The Global Scientific Configuration layer is that home.
2.2  Why it must be separate from the Scientific Configuration Library
The Scientific Configuration Library is the permanent scientific source of truth. It is authored to a claim-first, quote-or-discard evidentiary standard, and it is deliberately conservative: a Scientific Configuration Pack changes only when the underlying science changes. Prioritisation, weighting and confidence configuration change for a different reason and on a different cadence — they are tuned as the product learns, as calibration data accumulates, and as founder priorities evolve. Binding these two together would either freeze configuration that needs to move, or destabilise science that must not. They are separated so that each can change at its own correct speed under its own correct governance.
A second reason is evidentiary hygiene. The Scientific Configuration Library must never contain a product decision dressed as a scientific fact. By placing every weighting, priority and confidence parameter in a separate, clearly-labelled configuration layer, BioSense guarantees that a reader can always tell the difference between "this is what the evidence says" and "this is how BioSense has chosen to weigh it."
2.3  Why it must be separate from Engineering
Engineering owns the machinery: the Dynamic Health Model, the observation store, the confidence engine, the decision engine, the orchestration workflow, the safety engine. That machinery must be able to run unchanged while its configuration is retuned, and its configuration must be able to be reviewed, versioned and approved without a code release. If weighting and confidence parameters lived inside engine code, every scientific or product adjustment would become a software change, auditable only by reading source. Separating configuration from machinery lets the medical and data-science function govern the numbers while engineering governs the execution — each auditable in its own right.
2.4  Why it must be separate from AI Behaviour
The AI Behaviour layer decides how understanding is expressed — tone, narrative, empathy, restraint. Those are taught behaviours, verified in Constitutional Review. Prioritisation and confidence must be computed, deterministic and identical regardless of which model generates the final words. If the weighting of a signal or the confidence in a hypothesis were left to the narrative model, two runs could disagree, and the system would become quietly overconfident in exactly the way the Constitution forbids. The Global Scientific Configuration layer holds these decisions as configuration precisely so that they are model-independent and reproducible.
2.5  Why it becomes the intelligence engine of BioSense
Individually, a validated biomarker interpretation is information. Intelligence is what emerges when many validated interpretations across many domains are weighted against one another, reconciled where they conflict, ranked by what matters for this person, decayed by age, and fused into a single coherent understanding with a defensible confidence. Every one of those verbs — weight, reconcile, rank, decay, fuse — is a configuration decision. The Global Scientific Configuration layer is where those decisions live. It is, in a precise sense, the configured judgement that turns BioSense from a system that reports science into a system that generates intelligence — while never itself deciding what the science is.
3.  Architectural Position in the BioSense Hierarchy
3.1  The constitutional hierarchy of authority
The BioSense Intelligence Constitution establishes a six-level hierarchy of authority. Each lower level remains subordinate to those above it, and no lower level may override a higher one. GSC-000 does not alter this hierarchy; it locates the Global Scientific Configuration layer precisely within it.
Level
Authority
Role
1
Scientific Truth
The ultimate constraint. Provisional and evolving; governs the Constitution only through amendment, never by direct override.
2
BioSense Intelligence Constitution
The supreme operational authority — values, reasoning philosophy, safety posture, governance.
3
Canonical Scientific Library (SCL)
The permanent scientific source of truth, per biomarker and domain.
3.5
Global Scientific Configuration (GSC)
Versioned configuration of prioritisation, weighting, confidence, synthesis and ordering. Consumes the SCL; never overrides it.
4
Reasoning Architecture
The state machine, Dynamic Health Model and deterministic subsystems that execute reasoning.
5
Prompt Engineering
Model conditioning and taught behaviours.
6
Software Implementation
The running system.

Placement rule.  The Global Scientific Configuration layer is inserted as Level 3.5: strictly beneath Scientific Truth, the Constitution and the Scientific Configuration Library, and strictly above the mechanisms that consume it. It is configuration, not science and not machinery. It may never be used to set aside a scientific interpretation, a constitutional principle or the deterministic safety floor.
3.2  Configuration, not science and not machinery
The Reasoning Architecture states that certain values — the significance threshold, the durability threshold, per-metric expected-variation bands, confidence-calculus weights and the convergence factor — are "configuration, not model output," owned by the medical and data-science function. It also states that confidence is "computed, never asserted." The Global Scientific Configuration layer is the governed, versioned, documented home for exactly this class of value. It does not compute anything at runtime and it contains no executable logic; it is the specification the engines read.
3.3  The relationship to derived indicators
Two of BioSense’s most visible outputs — the Health Score and Biological Age — are, by the Engineering specification, derived engine outputs computed on demand from the Dynamic Health Model, each carrying its own method version and cached rather than stored as first-class beliefs. This is the clean seam the Global Scientific Configuration layer is built for. The methodology — how the score is composed, how biological age is estimated, which domains contribute and how much — is Global Scientific Configuration (GSC-001, GSC-002). The computation, caching and version-keyed invalidation of the resulting value is Engineering (ENG-001 and its query engine). The two are versioned independently and joined only by the method-version stamp each computed snapshot records.
4.  Architectural Boundaries — Who Owns What
The central discipline of this document is that no responsibility is duplicated and no responsibility is moved. Each layer owns one kind of question. The boundaries below are drawn from a complete review of the frozen Constitution (1A–1C) and the Engineering Library (ENG-001 through ENG-014), and are binding on every future Global Scientific Configuration document.
4.1  The ownership map
Layer
Owns the question
Examples of what it owns
Scientific Configuration Library
What is scientifically true?
Reference ranges, bands, interpretation patterns, per-biomarker cross-references, evidence and its grade.
Cross-Biomarker Intelligence
What do these markers mean together, scientifically?
Recognised biomarker–biomarker relationships and the scientific rules for reading one in the light of another.
Deterministic Safety Engine (ENG-010)
What must never be allowed to happen?
The escalation floor, red-flag combinations, clinical-governance rules. A hard floor the model may exceed but never lower.
AI Behaviour
How should this be said?
Narrative, tone, empathy, restraint, curiosity — taught, then checked in Constitutional Review.
Learning Mode (ENG-006)
What should we ask, and what have we learned?
Directed questioning, adaptive personalisation, acquisition of new information.
Engineering (ENG-001…014)
How is reasoning executed reliably at scale?
The Dynamic Health Model, observation store, confidence engine, decision engine, orchestration, computation and caching.
Global Scientific Configuration
How is validated science prioritised, weighted, given confidence and synthesised into intelligence?
Cross-domain weights, confidence-calculus parameters, significance and durability thresholds, prioritisation ordering, freshness decay, evidence-fusion policy, score and biological-age methodology.
4.2  The four boundaries stated as rules
Science boundary.  The Global Scientific Configuration layer consumes the Scientific Configuration Library and never edits, contradicts or re-grades it. If a weighting appears to require a different scientific fact, the correct response is a Scientific Configuration Library change, not a configuration workaround.
Safety boundary.  The Global Scientific Configuration layer never touches the deterministic safety floor. It may raise the salience of a safety-relevant finding through prioritisation, but it can never lower, delay or suppress an escalation the Safety Engine mandates.
Machinery boundary.  The Global Scientific Configuration layer contains no executable logic. It specifies parameters and policies; the engines execute them. A Global Scientific Configuration document is read by an engine, never run as one.
Expression boundary.  The Global Scientific Configuration layer decides what matters and how confident to be; the AI Behaviour layer decides how it is expressed. Confidence and priority are computed from configuration and are identical regardless of which model writes the final sentence.
4.3  What the Global Scientific Configuration layer must never own
Scientific truth or evidence grading — owned by the Scientific Configuration Library and ENG-008.
The deterministic safety floor and clinical-governance rules — owned by ENG-010.
The reasoning state machine, belief store and truth-maintenance machinery — owned by ENG-001 and ENG-009.
Narrative, tone and the wording of any user-facing message — owned by the AI Behaviour and delivery layers (ENG-005).
Grounding, retrieval and version pinning of scientific claims — owned by ENG-008 and the Reasoning Architecture.
Any runtime computation — owned by the engines. Configuration is read, not executed.
5.  Interaction With Existing Systems
The Global Scientific Configuration layer is a configuration provider. Every interaction below is one of two kinds: a system reads Global Scientific Configuration to obtain a versioned parameter or policy, or a governance process writes Global Scientific Configuration under review. No engine ever writes configuration at runtime, and Global Scientific Configuration never writes to an engine.
5.1  The Scientific Configuration Library (SCL)
The Scientific Configuration Library is the upstream source of truth. The Global Scientific Configuration layer consumes the outputs of the Scientific Configuration Library — the interpretations, bands, patterns and their evidence grades — and applies weighting, confidence and prioritisation configuration to them. The relationship is strictly one-directional: the Scientific Configuration Library informs the Global Scientific Configuration layer; the Global Scientific Configuration layer never informs the Scientific Configuration Library. When a Scientific Configuration Pack is versioned, any Global Scientific Configuration parameter that references it records the version it was tuned against.
5.2  The Confidence & Evidence Evaluation Engine (ENG-003)
The confidence engine computes confidence for every hypothesis and derived value. The Reasoning Architecture mandates that confidence is composed — not averaged — from data-confidence, scientific-confidence and personal-fit, with a convergence factor and an uncertainty penalty, using weakest-link composition, and that it is calibrated against observed outcomes. Every parameter in that sentence — the composition weights, the convergence factor, the uncertainty penalty, the independence assumptions, the calibration policy — is Global Scientific Configuration. GSC-003 supplies them; ENG-003 executes with them. The engine owns the calculus; the configuration owns the constants.
5.3  The Decision Intelligence & Intervention Engine (ENG-004)
The decision engine converts validated understanding into prioritised, proportionate recommendations following the constitutional recommendation hierarchy. The order in which competing findings are surfaced, the weighting of a person’s goals against scientific salience, the burden and behavioural-capacity adjustments that make a recommendation realistic — these are configuration. GSC-005, GSC-006 and GSC-007 supply the prioritisation, capacity and burden configuration the decision engine consumes. The engine still owns the hierarchy gate and the proportionality logic; the configuration owns the weights and orderings within it.
5.4  The Predictive & Longitudinal Engine (ENG-007)
Forecasting and trend analysis depend on how much recent observations count relative to older ones, how quickly a signal’s relevance decays, and how longitudinal consistency is rewarded. Those decay constants and longitudinal-weighting policies are Global Scientific Configuration (GSC-008). The engine performs the forecast; the configuration governs the memory curve it forecasts along.
5.5  The Scientific Knowledge & Evidence Intelligence Engine (ENG-008)
ENG-008 owns retrieval and grounding against the Canonical Scientific Library, including the representation of conflicting evidence. The Global Scientific Configuration layer does not retrieve or ground; it governs how already-retrieved, already-graded evidence from different domains is fused into a cross-domain picture and how genuine conflicts are resolved into a coherent intelligence output (GSC-009). Per-entry evidence grading stays with the Library and ENG-008; cross-domain fusion policy is Global Scientific Configuration.
5.6  The Orchestration Engine (ENG-009)
The orchestration engine runs the constitutional reasoning pipeline end to end. It reads Global Scientific Configuration at the stages that require configured judgement — significance gating, confidence assessment, belief-update thresholds, prioritisation and insight selection — and applies the versioned parameters it finds. Orchestration owns sequencing and enforcement; the Global Scientific Configuration layer owns the parameters those enforced stages apply.
5.7  The Safety Engine (ENG-010) — a one-way, floor-only relationship
The Global Scientific Configuration layer has no authority over safety.  ENG-010 sets a deterministic escalation floor reviewed by the medical advisory function. The Global Scientific Configuration layer may raise the priority of a safety-relevant finding so that it is surfaced first, but it can never lower an escalation, delay it, or weight it out of existence. On any conflict between a prioritisation configuration and the safety floor, the safety floor wins automatically and the conflict is logged.
5.8  The Personalisation & Learning Engine (ENG-006)
Learning Mode acquires new information and adapts personalisation. The Global Scientific Configuration layer does not decide what to ask, but it governs how newly learned information is weighted once acquired, and how personal-fit enters the confidence calculus. Acquisition is ENG-006; the weighting of what is acquired is Global Scientific Configuration.
5.9  The Dynamic Health Model & Health Record (ENG-001, ENG-011)
The Dynamic Health Model holds the belief state and event log; the Health Record holds longitudinal memory. Both are machinery. The Global Scientific Configuration layer supplies the significance threshold that decides when an observation changes understanding, the durability threshold that governs biological identity, and the freshness and longitudinal weighting applied to memory. The stores execute; the configuration governs the thresholds at which they act.
6.  The Global Scientific Configuration in the Reasoning Pipeline
The Constitutional Reasoning Pipeline defines fifteen stages every observation passes through. The Global Scientific Configuration layer does not own any stage; it supplies the configured judgement several stages require. The table below maps each pipeline stage to the Global Scientific Configuration it consumes, if any.

Pipeline stage
GSC consumed
What the configuration governs
1 Observation
—
None. Raw intake.
2 Validation
—
None. Trust checks owned by ingestion and safety.
3 Canonical Translation
—
None. Schema owned by Engineering.
4 Scientific Understanding
None (reads SCL)
The science is the Scientific Configuration Library’s; GSC does not intervene here.
5 Personal Context
GSC-006
How personal factors and behavioural capacity are weighted.
6 Relationship Analysis
GSC-004, GSC-009
Cross-domain weighting and evidence-fusion policy.
7 Health Hypotheses
GSC-004
How competing signals are weighted when forming hypotheses.
8 Confidence Assessment
GSC-003
The confidence-calculus parameters, convergence factor and calibration policy.
9 Dynamic Health Model Update
GSC-003, GSC-008
The significance and durability thresholds; freshness and longitudinal weighting.
10 Prioritisation
GSC-005
What matters most today, including insight selection and the cognitive-load and communication budget.
11 Recommendation Framework
GSC-005, GSC-006, GSC-007
Prioritisation order, behavioural capacity and intervention burden.
12 Constitutional Review
—
Review is enforcement; it verifies, it does not consume weighting config.
13 Communication
—
Expression is AI Behaviour.
14 Learning
GSC-003
Calibration: (stated confidence, observed outcome) feeds the confidence policy.
15 Updated DHM
GSC-001, GSC-002
Health Score and Biological Age methodology when a snapshot is computed.

Reading rule.  The Global Scientific Configuration layer is concentrated in the middle of the pipeline — stages 5 through 11, plus calibration at 14 and the derived indicators at 15. It is absent from intake, validation, translation, review and communication by design. This is the signature of a configuration layer: it shapes judgement, not intake and not expression.
7.  The Proposed Global Scientific Configuration Library
The Founder has proposed an initial Global Scientific Configuration Library of nine methodology documents. This chapter reviews each in turn: its responsibility, the boundary that keeps it clean, the systems that consume it, and its principal dependencies. Chapter 8 then evaluates whether this structure is optimal and records the recommended changes. No document below defines any algorithm here; each is scoped as a future methodology specification that GSC-000 governs.

GSC-001  Health Score Methodology
Responsibility.  Defines how a single, coherent health score is composed from validated understanding across domains — which domains contribute, how they are combined, how the score responds to change, and how its own confidence is expressed. It specifies methodology only; the arithmetic belongs to the GSC-001 methodology document, and the computation belongs to the engine.
Boundary.  It never decides what is healthy — that is scientific truth from the Scientific Configuration Library. It never computes or caches the score — that is ENG-001. It defines only the governed method by which validated inputs become a score.
Consumed by.  ENG-001 (computation and caching of the derived value), the delivery layer (for display).
Principal dependencies.  GSC-004 cross-domain weighting; GSC-003 confidence; the Scientific Configuration Library for the validated inputs.
GSC-002  Biological Age Methodology
Responsibility.  Defines how biological age is estimated as a multi-domain indicator that moves only on genuine biological change — which domains contribute, how improvement and deterioration are handled, and how its confidence and explainability are governed.
Boundary.  It never asserts a person’s chronological facts and never claims diagnostic meaning. It is an explainable estimate, governed as configuration and computed by the engine.
Consumed by.  ENG-001 (on-demand computation, method-version stamping, caching), the delivery layer.
Principal dependencies.  GSC-004 cross-domain weighting; GSC-008 longitudinal weighting; GSC-003 confidence; the Scientific Configuration Library.
GSC-003  Confidence Calibration
Responsibility.  Defines the parameters and policy of the confidence calculus: how data-confidence, scientific-confidence and personal-fit compose, the convergence factor and its independence assumptions, the uncertainty penalty, weakest-link composition, and the standing calibration loop that checks stated confidence against observed outcomes.
Boundary.  It never asserts a confidence value at runtime — confidence is computed by ENG-003. It supplies the constants and the calibration policy the engine applies; it does not perform the computation.
Consumed by.  ENG-003 (the confidence engine), and through it every stage that carries confidence.
Principal dependencies.  The Scientific Configuration Library evidence grades; the Reasoning Architecture confidence mandate (ER-16, ER-17).
GSC-004  Cross-Domain Weighting
Responsibility.  Defines how signals from different domains — bloods, wearables, body composition, lifestyle, subjective check-ins — are weighted relative to one another when they are combined into hypotheses, scores and narratives.
Boundary.  It never re-grades the evidence within a domain — that is the Scientific Configuration Library. It governs only the relative weight between domains once each is validly interpreted.
Consumed by.  ENG-003, ENG-004, ENG-007; and GSC-001/GSC-002 as a dependency.
Principal dependencies.  The Scientific Configuration Library; per-source reliability from the ingestion layer.
GSC-005  Intervention Prioritisation
Responsibility.  The single document governing what BioSense decides is worth surfacing to a user today. It owns intervention prioritisation and ordering, insight selection, cognitive-load management, the communication budget, the recommendation budget, the maximum number of surfaced recommendations, the suppression of low-value recommendations, the prioritisation thresholds, and recommendation sequencing. It combines scientific salience, personal goals, safety relevance and expected benefit to decide what is surfaced first, what waits, and what is withheld so the person is never overwhelmed.
Boundary.  It never lowers a safety escalation — the safety floor is absolute and owned by ENG-010. It orders, budgets and suppresses only within what is permitted, never beneath the floor, and suppression never applies to a safety-relevant finding.
Consumed by.  ENG-004 (the decision engine), ENG-009 (prioritisation stage), ENG-005 (delivery honours the budget).
Principal dependencies.  GSC-006 behavioural capacity; GSC-007 intervention burden; the constitutional recommendation hierarchy, cognitive-respect budget and communication-decision threshold; the goal domain.
GSC-006  Behavioural Capacity
Responsibility.  Defines how BioSense represents a person’s realistic capacity to act — their demonstrated ability to adopt and sustain change — so that recommendations are calibrated to what they can actually do.
Boundary.  It never overrides scientific need and never becomes an excuse to withhold a safety-relevant recommendation. It shapes how, not whether, a permitted recommendation is offered.
Consumed by.  ENG-004 via GSC-005; ENG-006 (personalisation).
Principal dependencies.  The learning history and goal domain; GSC-007 (the paired burden question).
GSC-007  Intervention Burden
Responsibility.  Defines how the cost of an intervention to the person — effort, disruption, financial and cognitive load — is represented, so that the least-necessary-intervention principle can be applied with a real notion of cost.
Boundary.  It never trades away a safety-relevant intervention on cost grounds. It informs proportionality within the permitted set.
Consumed by.  ENG-004 via GSC-005.
Principal dependencies.  GSC-006 behavioural capacity (its paired half); the constitutional least-necessary-intervention principle.
GSC-008  Freshness Decay & Longitudinal Weighting
Responsibility.  Defines how the relevance of an observation decays with time, how recent evidence is weighted against older evidence, and how longitudinal consistency is rewarded — the memory curve along which trends, scores and forecasts are computed.
Boundary.  It never deletes or rewrites history — retention and immutability are Engineering and governance concerns. It governs only how much past observations count, not whether they are kept.
Consumed by.  ENG-007 (forecasting), ENG-001 (belief update), GSC-001/002.
Principal dependencies.  The per-metric expected-variation bands; the Reasoning Architecture significance and durability thresholds.
GSC-009  Evidence Fusion & Conflict Resolution
Responsibility.  Defines how validated, graded evidence from different domains is fused into a single cross-domain understanding, and how genuine conflicts between domains are resolved into a coherent output while preserving, not laundering, the underlying uncertainty.
Boundary.  It never resolves a scientific conflict inside a single domain — that conflict is represented by the Scientific Configuration Library and ENG-008 and surfaced, not hidden. GSC-009 governs cross-domain fusion, downstream of per-entry grading.
Consumed by.  ENG-008 (as the downstream fusion policy), ENG-003, ENG-004.
Principal dependencies.  GSC-004 cross-domain weighting; GSC-003 confidence; the Scientific Configuration Library conflict representation.
8.  Critical Architecture Review
This chapter evaluates the proposed nine-document structure against the frozen architecture and recommends changes only where a change is genuinely justified. Where the structure is already correct, that is stated plainly rather than manufactured into a change. The review asks four questions: should any documents merge, should any split, is the numbering logical, and is anything missing or unnecessary.
8.1  Should any documents merge?
One pairing is a genuine merge candidate and deserves an explicit decision: GSC-006 (Behavioural Capacity) and GSC-007 (Intervention Burden). They are the two halves of a single question — "can this person realistically do this, and what does it cost them?" — they share inputs from the learning and goal history, and they are consumed together, only by GSC-005.
Recommendation: keep them separate, and document the coupling. Capacity is a statement about ability; burden is a statement about cost. They draw on different evidence, they will be tuned on different signals, and the Constitution explicitly values modularity and independent versioning. Collapsing them would save one document at the price of entangling two parameters that should be able to move independently. The correct architectural treatment is to keep two documents and record, in both, that they are a paired input to GSC-005 and must be read together. No other pair in the proposed library is a merge candidate.
8.2  Should any documents split?
No proposed document should be split. Each of the nine addresses a single coherent configuration concern at an appropriate grain. GSC-003 (Confidence Calibration) is the largest in scope, since it carries both the composition parameters and the calibration policy, but these are two aspects of one subject — the trustworthiness of a confidence number — and separating them would fragment a single governance responsibility. It remains one document.
8.3  Is the numbering logical?
The numbering is acceptable and should be retained, with one relationship documented explicitly. GSC-001 and GSC-002 are the visible outputs (Health Score, Biological Age); GSC-003 through GSC-009 are the governing mechanisms beneath them. A reader might expect the mechanisms to precede the outputs they produce. In particular, GSC-004 (Cross-Domain Weighting) is a dependency of both GSC-001 and GSC-002 — the scores cannot be composed without it.
Recommendation: retain the numbering, and record the dependency direction. Leading with the two visible indicators is defensible: they are what the library exists to produce, and readers orient to them fastest. The dependency (GSC-004 feeds GSC-001 and GSC-002; GSC-003 feeds almost everything) is documented in each document’s dependency block and in the map at Chapter 7, so the numbering order never misleads an implementer about build order. Renumbering for its own sake would break references for no architectural gain.
8.4  Is anything missing?
One concern deserved explicit attention. The Constitution establishes a cognitive-respect budget — a discipline that BioSense must not overwhelm a person with insights, and must choose the few things worth saying today — and the Reasoning Architecture makes the communication-decision threshold a deterministic gate where silence is the default. That gate needs configuration: how many insights, chosen how, against what budget. An earlier draft considered homing this in a separate document. On review, this is resolved differently and more cleanly.
Resolution — fold cognitive-load governance into GSC-005.  Deciding what to recommend and deciding how much to surface are the same act of prioritisation viewed from two angles, consumed at the same pipeline stage (10) by the same engine. Splitting them into two documents would separate a single decision that is always made together. GSC-005 is therefore expanded to own intervention prioritisation and ordering, insight selection, cognitive-load management, the communication and recommendation budgets, the maximum number of surfaced recommendations, the suppression of low-value recommendations, the prioritisation thresholds, and recommendation sequencing. It becomes the single document governing what BioSense decides is worth surfacing to a user today. No separate document is created.
Goal and direction weighting is a second candidate a reviewer might raise, since the Constitution gives goals a role in prioritisation. It likewise does not warrant its own document: it is a weighting input to GSC-005. Both concerns fold into GSC-005 rather than expanding the library, so the numbered set of methodology documents is unchanged.
8.5  Is anything unnecessary?
No proposed document is unnecessary. Each maps to a configuration responsibility the frozen Reasoning Architecture explicitly mandates but does not home: confidence composition and calibration (GSC-003), significance and durability thresholds and longitudinal weighting (GSC-008), cross-domain weighting (GSC-004), prioritisation and proportionality (GSC-005/006/007), cross-domain fusion (GSC-009), and the derived-indicator methodologies (GSC-001/002). Removing any of them would leave a mandated parameter without a governed home.
8.6  Where the structure is already optimal
It is worth stating plainly: the library is well-formed and now complete. The separation of the two visible indicators from the seven governing mechanisms is sound. The scope of each document is coherent and non-overlapping. The dependency structure is clean and acyclic. With the conclusions above — keep GSC-006 and GSC-007 separate but document their coupling, fold cognitive-load governance into GSC-005, and retain the numbering — the library is complete and correctly bounded. No forced merges, no forced splits, no renumbering, and no additional documents are warranted. The Global Scientific Configuration Library architecture is now considered complete.
8.7  Final architectural conclusions
#
Conclusion
Type
Rationale
1
Keep GSC-006 and GSC-007 separate; document the coupling in both.
Confirm + annotate
Ability and cost are distinct, independently-tuned parameters; modularity is a constitutional value.
2
Fold cognitive-load governance into GSC-005.
Fold
Deciding what to recommend and how much to surface is one act of prioritisation, made together at pipeline stage 10.
3
Retain existing numbering; record the GSC-004 → GSC-001/002 dependency.
Confirm + annotate
Leading with visible outputs is defensible; build order is documented, so order never misleads.
4
No further additions; no merges, no splits, nothing removed.
Confirm
Each document maps to a mandated configuration responsibility at the right grain.
5
Library architecture now considered complete.
Freeze
With cognitive-load folded into GSC-005, every mandated configuration responsibility has a governed home.
9.  Permanent Architectural Principles
These principles are binding on every Global Scientific Configuration document. They are the constant against which future methodology documents are reviewed, and they change only through the governance procedure in Chapter 12.
Scientific integrity.  The layer configures how validated science is used; it never decides what the science is. No weighting, priority or confidence parameter may contradict the Scientific Configuration Library.
Configuration, never computation.  The layer contains parameters and policies, never executable logic. Engines execute; configuration is read.
Explainability.  Every parameter must be explainable in plain language: what it governs, why it holds its value, and what changes if it moves. An unexplainable parameter is not permitted.
Transparency of judgement.  A reader must always be able to distinguish a scientific fact from a configured product decision. The two never blur.
Auditability.  Every parameter is versioned, dated, attributed and reviewable. The value in force on any past date is recoverable.
Confidence over certainty.  Configuration expresses and calibrates uncertainty; it never manufactures false precision. Convergence increases confidence only where source independence is genuine.
Determinism where it matters.  Weighting, confidence and priority are computed from configuration and are identical regardless of which model runs. They are never left to generative variation.
Safety is never configurable downward.  The layer may raise the salience of a safety finding; it can never lower, delay or suppress an escalation. The safety floor is outside its authority.
Modularity and independent versioning.  Each document governs one concern and versions independently, so a change to one parameter never forces an unrelated change elsewhere.
Scientific traceability.  Every parameter tuned against a Scientific Configuration Pack records the pack version it was tuned against, so the configuration and the science it rests on stay linked.
Founder governance.  Material configuration changes are ratified under the governance procedure. Expediency, silence or engineering convenience never constitute a change.
Future scalability.  The architecture accommodates new domains and new indicators by adding configuration, not by restructuring. New data sources enter through new weighting entries, not new layers.
Wellness-first framing.  BioSense is a premium wellness and preventative-health platform, not a medical device, and never diagnoses. Configuration serves optimisation and understanding, never diagnosis.
10.  The Complete BioSense Intelligence Pipeline
The Global Scientific Configuration layer is best understood by tracing a single observation from raw data to a user-facing insight, and marking where configuration shapes the journey. This is the reasoning pipeline viewed as a flow of intelligence, separating scientific interpretation from engine behaviour from user presentation.
10.1  The flow, stage by stage
User Data.  An observation enters — a blood result, a night of wearable data, a check-in. It is validated for trust and translated into the canonical schema. No configuration acts here; this is intake and machinery.
Scientific Configuration Library.  The observation is interpreted against validated science: what this marker means, its bands, its recognised relationships, its evidence grade. This is scientific truth. The Global Scientific Configuration layer does not intervene; it only consumes the result.
Cross-Biomarker Intelligence.  The interpretation is read in the light of related markers. The scientific relationships are the Library’s; how much each related signal weighs, and how conflicts across domains are fused, is Global Scientific Configuration (GSC-004, GSC-009).
Global Scientific Configuration.  Now the configured judgement acts. Signals are weighted across domains, a composed and calibrated confidence is attached, the significance threshold decides whether understanding has changed, freshness decay sets how much history counts, and prioritisation decides what matters most today within a cognitive-load budget. This is where information becomes intelligence.
AI Narrative.  Only now is anything expressed. The AI Behaviour layer turns the prioritised, confidence-bearing understanding into calm, clear, humble language, checked in Constitutional Review. Configuration decided what to say and how sure to be; it never decided the words.
User Experience.  The insight, score or recommendation reaches the person — proportionate, explainable, and honest about its confidence. The interaction becomes new evidence, feeding calibration (GSC-003) and the next cycle.
10.2  The three separations
Concern
Owned by
Never owned by GSC
Scientific interpretation
Scientific Configuration Library
GSC never decides what is true.
Engine behaviour
Engineering (ENG-001…014)
GSC never executes; it configures.
User presentation
AI Behaviour & delivery (ENG-005)
GSC never writes the words.
Configured judgement
Global Scientific Configuration
This is the one thing GSC does own.

The pipeline in one sentence.  Science decides what is true, Engineering decides how it runs, AI Behaviour decides how it is said, and the Global Scientific Configuration layer decides how validated truth is weighted, trusted, ordered and fused into the intelligence that sits between them.
11.  Governance
The Global Scientific Configuration layer is governed with the same discipline as the Constitution and the Scientific Configuration Library, adapted to configuration. Governance exists so that configuration changes through disciplined review rather than convenience.
11.1  Version control
Every Global Scientific Configuration document and every material parameter within it carries a version number, a publication date, a change summary, a rationale, a record of affected consumers, and a record of implementation implications. Historical versions are archived permanently, never deleted, so the configuration in force on any past date is recoverable and every past interpretation remains explainable.
11.2  Founder approval
Material configuration changes — any change that alters how science is weighted, how confident the system is, what is prioritised, or how a derived indicator is composed — take effect only on written approval by the designated authority (the Founder or a nominated steward). The approving authority and the date of approval are recorded with the change.
11.3  Scientific and clinical review
Where a configuration change affects reasoning, confidence, prioritisation or safety-adjacent salience, it undergoes documented scientific review, and where it touches anything the medical advisory function oversees, that function reviews it. Configuration never silently changes the effective meaning of a safety-relevant output without review.
11.4  Engineering implementation and regression protection
Once a configuration change is approved, engineering implements it by updating the versioned configuration the engines read — never by embedding the value in code. Every change is accompanied by regression protection: a body of expected behaviours that must continue to hold, so that retuning one parameter cannot silently degrade an unrelated output. A change that fails regression is not released.
11.5  Change logs, audit history and backward compatibility
Every change is logged with its version, rationale and approver. Because interpretations pin to the configuration version that produced them, a past insight is never silently rewritten by a later configuration change; superseding a parameter creates a new version and retains the old. Where a change would alter the meaning of previously-produced outputs, that impact is recorded and, where it matters, surfaced rather than hidden.
11.6  Document freezing
A Global Scientific Configuration document, once ratified, is frozen. A frozen document is authoritative and is not re-opened for casual editing. It changes only by producing a new version through the amendment procedure below. This is the same freeze-before-build discipline the Scientific Configuration Library already follows.
11.7  Amendment procedure
The amendment procedure mirrors the Constitution’s, adapted to configuration:
Proposal.  Any steward may propose a change in writing, identifying the parameter or policy affected, the proposed value or wording, and the scientific, product or ethical rationale.
Classification.  The proposal is classified by impact: editorial, configuration-material, or architecture-level. Architecture-level changes to GSC-000 itself require the highest scrutiny.
Review.  Material and architecture-level changes require documented scientific review, and medical-advisory review where reasoning, confidence or safety salience is affected.
Ratification.  The change takes effect only on written approval by the designated authority, whose identity and approval date are recorded.
Record.  The ratified change is published under version control with a change summary, rationale, affected consumers and implementation implications. Superseded values are archived, never deleted.
12.  Engineering Consumption Guidance
This chapter tells engineers how to consume the Global Scientific Configuration layer without violating its boundaries. It is guidance on consumption, not a data-format specification; the concrete schema is an engineering concern owned by the consuming engines.
12.1  Configuration is read, never executed
Every Global Scientific Configuration document resolves, for engineering purposes, to versioned configuration: parameters, weightings, thresholds and policies that an engine reads at the point of use. An engine never treats configuration as code to run, and never writes configuration back at runtime. The direction of flow is always configuration → engine.
12.2  Separate the seven things that must stay separate
The frozen architecture depends on keeping distinct concerns distinct. Engineers consuming the Global Scientific Configuration layer must preserve these separations rather than collapse them for convenience:
Scientific methodology (what the Scientific Configuration Library validated) is separate from configuration (how it is weighted).
Configuration (the versioned parameters, from GSC) is separate from algorithms (the engine logic that applies them).
Algorithms (engine logic) are separate from weightings (the values the logic uses).
Weightings are separate from AI prompts (which express, and never compute, weighting).
AI prompts are separate from presentation logic (how a result is displayed).
Presentation logic is separate from deterministic rules (the safety floor and grounding checks).
Deterministic rules are separate from configuration: the safety floor is owned by ENG-010 and is never a GSC parameter.
12.3  Consume by version, and pin
Every engine reads a specific, versioned configuration and records which version it used. Because interpretations pin to the configuration that produced them, a later configuration change never silently alters a past output. When a Global Scientific Configuration document is superseded, engines move to the new version deliberately, under change control, not automatically.
12.4  Consume modularly
Each Global Scientific Configuration document is versioned independently. An engine consumes only the documents relevant to its stage — the confidence engine consumes GSC-003, the decision engine consumes GSC-005/006/007, the forecasting engine consumes GSC-008 — and a change to one is expected not to force a change in another. Where two documents are a paired input (GSC-006 and GSC-007 into GSC-005), the consuming engine reads them together but still versions them separately.
12.5  Respect the safety floor unconditionally
No configuration an engine reads from the Global Scientific Configuration layer may lower a safety escalation.  If a prioritisation or weighting parameter would ever have the effect of suppressing or delaying an escalation the Safety Engine mandates, the engine follows the safety floor and logs the conflict. Configuration orders and weights within what safety permits; it never reaches beneath the floor.
13.  Constraints & Founder Decisions Requested
13.1  Scope constraints
This document defines architecture only. The following are explicitly out of scope for GSC-000 and belong to the individual methodology documents it governs:
Any Health Score calculation, composition formula or domain weighting (GSC-001).
Any Biological Age estimation method or domain contribution (GSC-002).
Any confidence formula, composition weight, convergence factor or calibration algorithm (GSC-003).
Any cross-domain weighting values (GSC-004).
Any prioritisation ordering, scoring or goal-weighting values (GSC-005).
Any behavioural-capacity or intervention-burden representation or values (GSC-006, GSC-007).
Any freshness-decay constants or longitudinal-weighting curves (GSC-008).
Any evidence-fusion or conflict-resolution algorithm (GSC-009).

Constraint restated.  GSC-000 contains no algorithm, formula, weighting or calculation, and defines none. It defines where such things will live, who owns them, how they are governed and how they are consumed. The methodologies themselves are authored later, each in its own document, each under the governance this document establishes.
13.2  Founder decisions — ratified in v1.1
The architecture-level decisions raised at v1.0 have been reviewed and ratified. They are recorded here as resolved; none remains open.
GSC-006 and GSC-007 — ratified separate.  Behavioural Capacity and Intervention Burden remain two separate documents, with their coupling documented in both. Separation, not merger, is the confirmed structure.
Cognitive-load governance — ratified into GSC-005.  Insight selection, cognitive-load management, the communication and recommendation budgets, the maximum surfaced recommendations, and the suppression of low-value recommendations are folded into GSC-005. No separate document is created; the library remains the ten documents GSC-000 through GSC-009.
Numbering and goal weighting — ratified unchanged.  The existing numbering is retained (visible indicators first, mechanisms beneath), and goal/direction weighting is folded into GSC-005 rather than given a separate document. The library architecture is now considered complete; no further Global Scientific Configuration documents are to be created unless explicitly instructed by the Founder.
14.  Completion
GSC-000 establishes the permanent architecture of the Global Scientific Configuration Library. It defines why the layer exists, where it sits in the constitutional hierarchy of authority, the boundaries that keep it distinct from science, machinery, safety and expression, its interaction with every existing system, its place in the reasoning pipeline, a document-by-document review of the proposed library, a critical evaluation of that library with justified recommendations, the permanent architectural principles, the governance model, engineering-consumption guidance, and the scope constraints that keep this document architectural.
No algorithm, formula, weighting or calculation has been defined, by design. The methodology documents GSC-001 through GSC-009 will be authored subsequently, each under the governance this document establishes, and each subordinate to it. With cognitive-load governance folded into GSC-005, the Global Scientific Configuration Library is frozen at ten documents (GSC-000 through GSC-009) and its architecture is considered complete; no further documents are to be created unless explicitly instructed by the Founder.

Status
Ready for Founder Review.

END OF GSC-000

