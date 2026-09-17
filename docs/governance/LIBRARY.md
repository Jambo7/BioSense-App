# Launch document library (canonical)

Use this folder as the live control set. Do not invent missing policy. Latest **approved** document wins. Working drafts and unanswered dashboard facts stay unanswered.

## Series (privacy / CFD D03)

| Order | Document | Status in this repo | How we use it |
|---|---|---|---|
| 1 | Governance framework zip (`docs/governance-framework`) | Unpacked. Binding per Neil 1 Sep 2026: GOV-001A; GOV-P “Approved for Ratification”; PBS “Approved for Implementation” with launch-safe simplifications | Product and operating rules. Not the Privacy Notice. |
| 2 | TSB-001 | Approved 3 Sep 2026. Closed. | Security baseline in code (`lib/security-baseline.ts`). Do not reopen. |
| 3 | BAG-06 | Approved 3 Sep 2026. Closed. | Wellness-estimate language for Biological Age. Do not reopen. |
| 4 | Privacy Notice production facts (29 Aug 2026) | `docs/privacy-notice-facts-2026-08-29.md` | Snapshot of production at that date. **Stale in places.** Do not quote as current without checking this folder. |
| 5 | Data flow | `docs/data-flow.md` (25 Aug 2026) | Partner / WHOOP / UAE questionnaire. Hosting picture. Needs a pass against launch inventory. |
| 6 | Customer operating model | `docs/customer-operating-model.md` | As-is ops. Deletion row was stale; see CFD-D03 status. |
| 7 | Eagle facts and launch-actions request + filled response | Scripts under `scripts/make-privacy-eagle-response-docx.py` | Gap pack that led to this closure request. |
| 8 | Launch processors | `LAUNCH-PROCESSORS.md` | OpenAI, Neon, Stripe, Terra accepted 3 Sep 2026. Not a complete inventory. |
| 9 | **CFD D03 Privacy Notice Closure Request v1.0** | Source: `source/CFD-D03_BioSense_Privacy_Notice_Closure_Request_v1_0.docx`. Working answers: `CFD-D03-CLOSURE-STATUS.md` | Facts Eagle needs to **draft** the notice. Does not reopen TSB, BAG, UAE-only, controller, BPriv2 periods, or `bio-sense.ai/privacy` as the public destination. |
| 10 | **Still expected** | Not received | The drafted CFD D03 notice in English and Arabic (and possibly Data Rights). Neil cannot write that until we return one completed copy of this closure request. |

## WhatsApp thread (do not repeat the old mistake)

We told Neil (3 Sep): TSB-001 and BAG-06 recorded as approved; OpenAI/Neon/Stripe accepted; OpenAI `store: false`; remaining document from his side: CFD-D03; no other founder decision needed.

Neil replied: he cannot do the privacy policy (CFD-D03) because a few pieces of info are still missing; then he can draft English and Arabic. He sent this closure request as that missing-info list, and later chased whether anything was back.

**Correct ownership:** we fill D03-01 to D03-08 (current vs launch, honest gaps). He then drafts CFD-D03. Console items still on him: Neon PITR, OpenAI org/DPA, Stripe entity, Resend tracking, store Privacy URLs.

## Rules for using these

- CFD D03 can be **drafted** after D03-01 to D03-06 have honest answers.
- CFD D03 cannot be **approved for publication** until D03-07 and D03-08 are verified.
- If a control is not implemented, say so. Do not write the notice as if it exists.
- Do not send credentials, tokens, or identifiable health information in any Eagle pack.
- Product work (website Word briefs, meal scanner, wearables) must not silently add processors or tracking that contradict the accepted position.
