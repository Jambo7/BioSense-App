# BIO-001 — Engineering Response

**Re:** BioSense Blood Analysis Engine V1 package (README, Consolidated Spec,
Implementation Appendix, Developer Handover, and the four supporting registers).

**Date:** 29 July 2026

---

## The question you asked

> "Is there anything left that genuinely blocks implementation, or are all
> remaining blockers simply missing configuration values?"

**Answer: nothing blocks engineering.** The architecture is frozen and buildable
exactly as specified. Every one of the 14 open items is either:

1. **A missing anchored number/lexicon** you supply as *data* (the CSL claims), or
2. **One of two founder decisions** that only you can make (they are not numbers
   to look up).

There is no missing piece of software design. We have started building against
the spec as-is.

## What the two non-engineering decisions are

These are the only items that are not "engineering" and not "look up a value".
The spec's Decision Ledger reserves them for you:

1. **FH-pattern detection threshold** (`APOB_FH_PATTERN_THRESHOLD`, BLOCKER-009 /
   DL-6.1). This is a sensitivity/specificity trade-off with asymmetric harm — a
   missed inherited disorder is unrecoverable and invisible; a false alert is
   bounded and anxiety-inducing but recoverable. The architect specified both
   branches and recommends a **high-sensitivity bias with clinical input**, but
   will not set the number. This gates the entire FH pathway.
2. **Pregnancy-status collection policy** (BLOCKER-014 / DL-7.3). Whether to
   collect a sensitive attribute so physiologically-normal results don't fire
   false adverse-trend alerts. A privacy/regulatory call. The engine's anti-
   inference posture forbids *inferring* it; recommended posture is explicit
   optional collection with purpose limitation.

Everything else is a value + provenance you drop into the Canonical Scientific
Library.

## What we have built so far (this pass)

A faithful, compiling skeleton of the **generic engine**, with ApoB wired in and
shipping in the correct "display value, abstain on interpretation" state the spec
mandates until anchoring:

- **Platform invariants as types (PI-1…PI-5)** — trust-from-origin, no biomarker
  prefix on generic infrastructure, the fixed four-state pipeline, AI-renders-only,
  and no-constant-without-anchoring.
- **The Canonical Observation contract** and generic **ingestion** (unit
  normalisation from config; trust derived from measurement origin, never
  channel; a missing unit is never guessed).
- **The four-gate state machine** — Validity → Interpretability → Confidence →
  Assembly — with first-class `abstain()` and the rule that abstention never
  suppresses a safety pathway.
- **The confidence engine** — HIGH/REDUCED from the explicit reducer set;
  NOT_ASSESSABLE kept distinct.
- **The CSL anchoring layer (PI-5)** — every scientific value is a claim with the
  five constitutional audit fields; unanchored claims leave their feature
  disabled automatically. Anchoring a claim turns its feature on with **no code
  change**.
- **The ApoB config** — allowlisted recommendation classes, the prohibited
  (non-constructible) classes, and all thirteen **structural nulls** from
  Appendix C-5 (the permanently-null fields that keep the engine from ever
  producing a risk score, naming a condition, or reporting a corrected value).
- **Safety scaffolding** — the SAFETY_CLASS forbidden-token set, two-sided
  narrative validation (lexicon + surface-form), and a guaranteed deterministic
  safe template for every payload state.
- **The complete Gate-4 assembly** — stratum and therapy resolution (never
  inferred, always flagged when assumed), banding against BioSense thresholds,
  gap-to-target, the continuous monotonic score from amendment A-001, the five
  concordance states including the reassurance-failure case, the recommendation
  engine (allowlist, frozen priority ladder, consolidation, routing, and the
  acknowledgement floor at HIGH), and the ordered five-class trend suppression
  gauntlet.
- **A standing safety suite** (`npm run test:engine`) — 81 checks, each asserting
  a frozen rule from the spec. It verifies both the current abstaining ship state
  and, by registering a test claim source, that every feature activates correctly
  once anchored.

One addition worth flagging: **anchoring is now enforced, not trusted.** A claim
that declares itself `ANCHORED` but carries no author, provenance, effective date
or real version number is refused at registration and demoted to `DECLARED`, so
its feature stays disabled and the refusal is recorded in an audit. This means
"anchored" cannot come to mean "someone typed a number in", which we read as the
intent behind the constitutional audit fields.

We also had to declare one constant the spec implies but does not name:
`APOB_SCORE_GAP_SCALE`, the gap-to-target at which the score contribution reaches
zero. Amendment A-001 replaced the band-keyed score with a *continuous* function
of gap-to-target, and a continuous function needs a scale. Rather than invent
one, we declared it as an un-anchored CSL claim like every other scientific
value — so the score stays disabled until it is anchored. **This is a small new
item for your list.**

Location: `lib/bio-engine/`. It type-checks, lints and tests clean, and does not
touch the current live upload flow.

## What you (BioSense) can start on now, in parallel

Your five deliverables *are* the CSL content. In priority order for a shippable
ApoB v1:

1. **`BIOSENSE_APOB_THRESHOLD_SET`** — the stratum-keyed target thresholds. This
   is the single biggest unlock: it enables banding, gap-to-target, score
   contribution and discordance in one go.
2. **The two safety lexicons** — `BIOSENSE_PROHIBITED_CONDITION_LEXICON` and
   `BIOSENSE_LIPID_DRUG_LEXICON`. Short lists; they make the "never name a
   condition / never name a drug" prohibitions testable.
3. **The FH-pattern threshold + the pregnancy policy** — the two founder decisions
   above.
4. The remaining anchoring values (significant-change, acute window,
   lifestyle-gap ceiling, low-investigation threshold, and the score gap scale
   noted above).

The exact format, a worked example, and the fill-in process are in
`lib/bio-engine/csl-data/README.md`. You edit JSON (or hand us the values and
provenance and we place them); features light up as each claim anchors.

## What we build next, without waiting on you

Observation persistence with the versioned supersession model, the AI renderer
integration (which replaces the current upload flow's "AI interprets the report"
behaviour with render-only), the semantic half of the narrative validator, and
wiring the engine into the live blood-upload route. None of these depend on the
missing science — they read whatever the CSL provides and stay disabled
per-feature until it's anchored.

## Bottom line

The spec did its job: it separated *what is true* (yours, as versioned data)
from *how the machine behaves* (ours, as code). The machine can be built now. The
science can be filled in as it's ready. Neither blocks the other, and the app is
safe at every stage in between because an un-anchored feature abstains rather
than guesses.
