# CFD D03 closure request — working answers

**Source:** `source/CFD-D03_BioSense_Privacy_Notice_Closure_Request_v1_0.docx`  
**Prepared for:** Eagle AI Labs  
**Company:** Origin BioSense Technologies FZCO  
**Launch scope:** UAE, iOS and Android  
**Date of this working copy:** 16 September 2026  
**Completion rule:** Eagle can draft after D03-01 to D03-06. Publication needs D03-07 and D03-08 evidenced.

This is a **working engineering copy**. Dashboard screenshots, restore tests, and store-listing URLs are still missing. It is not a publication pack.

Do not revisit: TSB-001, BAG-06, UAE-only launch, controller identity, consent structure, marketing choice, accepted providers (OpenAI, Neon, Terra, Stripe), BPriv2 retention periods, `bio-sense.ai/privacy` as the controlling public destination, essential-only cookies, tracking disabled for essential and product email.

---

## Honesty check (are we using the library correctly?)

**Taking them in:** yes for this file and the approved closed items (TSB, BAG, launch processors). The 29 Aug facts pack and the customer operating model are **not** a safe current source without this document.

**Using them properly:** not yet. Three product facts contradict the approved launch position:

1. Marketing site still loads **Google Fonts** from Google. Approved position is self-hosted fonts.
2. Contact form posts to **FormSubmit.co**. That is an extra processor, not on the accepted list.
3. Two Privacy Notices are still live (app 17 June 2026, generic “BioSense”; website 26 June 2026, Origin BioSense Technologies FZCO). D03-08 requires one controlling notice at `bio-sense.ai/privacy` and matching in-app / store links.

Until those are fixed, and until Neil supplies the remaining console facts, CFD D03 must not be treated as ready to publish. One further document is still expected.

---

## D03-01 Final launch provider and transfer inventory

**DRAFTING BLOCKER**

**Current production (code and live sites, 16 Sep 2026):**

| Provider | Purpose | Categories | Region / location | Health? | Deletion route | DPA |
|---|---|---|---|---|---|---|
| Vercel | App and marketing hosting | Account traffic, function logs, in-memory lab/meal images during request | Production builds have run in US East (`iad1`) | Transient in logs / request bodies | Platform log expiry. No BioSense log-delete API | Vercel DPA (account) |
| Neon | Primary database | Full account, health, wearable payloads, meal observations, consents | AWS **us-east-1** | Yes | `DELETE /api/account` → cascade + `VerificationToken` purge. `DeletionRecord` (email hash only) survives | Neon/AWS (account) |
| Terra | Wearable aggregator | Wearable tokens and normalised activity/health | Terra published US/UK/EU | Yes | Deauth on disconnect and on account delete where a Terra user id is held | https://tryterra.co/dpa |
| OpenAI | AI inference | Chat, learning, reports, blood/meal image prompts. `store: false` on Completions | OpenAI infrastructure (typically US). No regional pin | Yes | Not controllable by BioSense delete. Abuse-monitoring window on OpenAI side | Public DPA; **org execution not evidenced** |
| Resend | Transactional email | Email address; generic product mail | Resend platform | Identity; emails must stay generic | Resend dashboard / logs. No per-user wipe in our delete path | Resend (account) |
| Stripe | Payments | Customer/payment identity. App does not send health payloads | Stripe | No (billing) | Subscriptions cancelled on delete. Customer record **retained** | Stripe (account) |
| Zoho Mail | privacy@ / support / hello inboxes | Correspondence | Zoho | Possible if a person pastes health into mail | Mailbox retention unknown | Zoho (account) |
| Apple HealthKit | On-device ingest (including Dexcom via Apple Health) | Health samples on device; selected metrics synced into BioSense days | On device + then Neon if synced | Yes | Disconnect Apple Health in app; account delete removes Neon copies. Apple-side Health data remains on the phone | Apple Health / App Store rules |
| Capacitor / iOS WKWebView | Native shell loading production URL | Same as web app in the WebView | Device | Same as app | Uninstall + account delete | Apple |
| Google Fonts | Marketing site webfonts | Visitor IP to Google when loading `bio-sense.ai` pages | Google | No | N/A | **Not accepted.** Launch position is self-hosted |
| FormSubmit.co | Website contact form | Name, email, topic, message → forwards to support@bio-sense.ai | FormSubmit | Possible if user types health | FormSubmit account / inbox | **Not accepted.** Extra processor |

Explicitly **not** live: Sentry, PostHog, Mixpanel, Meta/Google Ads pixels, Intercom/Zendesk, APNs/FCM, Vercel Analytics/Speed Insights on shipped pages, Cloudflare R2 for lab files (client exists, upload path does not use it), Anthropic API (SDK in `package.json`, live AI is OpenAI), `web-push` (dependency only, no VAPID path).

**Launch position:** same accepted set (Neon, Vercel, Terra, OpenAI, Resend, Stripe, Zoho, Apple/Google platform services). Remove or replace FormSubmit before publication. Self-host marketing fonts. Do not add analytics, crash reporting, ads, extra AI, or remote push without a new acceptance.

**Owner, date, evidence:** Engineering for code inventory (this file). Neil for provider account list and DPA screenshots. Not closed.

---

## D03-02 OpenAI organisation settings

**DRAFTING BLOCKER**

**Current production:** Completions API, default model `gpt-4o` unless `OPENAI_MODEL` is set, `https://api.openai.com/v1`. Blood and meal photos as `image_url` data URLs. Requests set `store: false`. Anthropic is not the live path.

**Launch position:** same. Org-level sharing/training off; confirm DPA executed; record the abuse-monitoring text shown in the account; Zero Data Retention is **not** configured in code and was not available on last org check (Aug 2026).

**Owner, date, evidence:** Neil / whoever holds platform.openai.com. Redacted Data controls screenshot still required. Engineering cannot close this from the repo.

---

## D03-03 Neon recovery window and deletion after restore

**DRAFTING BLOCKER**

**Current production:** Neon, AWS us-east-1. Plan name and PITR days **not readable from code**. `DeletionRecord` stores a SHA-256 email hash plus processor results after a successful delete. There is **no** automated job that, after a restore, reads those records and re-deletes restored users.

**Launch position required by this request:** record deletions outside the restored dataset **and reapply them after every restore**, with an owner, failure handling, and a restore test showing a deleted test user is removed again before service resumes.

**Owner, date, evidence:** Neil for Neon plan/PITR screenshot. Engineering for restore-reapply (not implemented). Restore test not done. Not closed.

---

## D03-04 Complete deletion chain

**DRAFTING BLOCKER**

**Current production (`lib/account-deletion.ts` + `DELETE /api/account`):**

1. Load user and wearable sync JSON; collect Terra user ids.
2. Terra deauthenticate (best effort). Failure is recorded, not rolled back.
3. Stripe: cancel open subscriptions; **keep** the Stripe customer.
4. Delete `VerificationToken` rows for that email.
5. `prisma.user.delete` (cascade includes MealLog, check-ins, scores, blood markers, wearable days/syncs, chat, reports, consents, notification logs, goals, insights, learning).
6. Write `DeletionRecord` (email hash + processor map).

**Not completed by that path:** OpenAI copies; Resend/Zoho mail; Vercel logs; Neon backups until the PITR window expires; Stripe customer/payment objects; Terra remote data if deauth fails; Apple Health on the device.

**Success today:** local Neon delete plus best-effort Terra/Stripe. Partial processor failure does not block Neon delete. Consumer sees a successful account delete from the app; there is no separate “partial failure / retry” consumer message.

**Launch position:** same honesty in the notice (deletion ≠ every copy everywhere). Restore reapply still missing. End-to-end test with provider failure not evidenced.

**Owner, date, evidence:** Engineering for code. Test evidence outstanding.

---

## D03-05 Implementation of the approved retention schedule

**DRAFTING BLOCKER**

Policy is fixed in BPriv2. Do not propose replacement periods.

| Category (approved) | Enforced at launch? | How |
|---|---|---|
| Core account / health / lab / AI / insight / goal / context: account lifetime then delete | Partial | Held while the account exists. Deleted on account delete in Neon. Provider copies as D03-04 |
| Tokens: only while connected | Partial | Terra deauth on disconnect/delete. Wearable tokens in Neon are ordinary strings until then. No per-user encryption |
| Notification history: 12 months | **No** | `NotificationLog` has no scheduled purge |
| Routine configurable logs: 30 days | **Vendor only** | Vercel log retention is a platform setting, not a BioSense job |
| Closed support/privacy correspondence: 24 months | **Operational** | Zoho mailbox. No product job |
| Consent / rights / compliance evidence: 7 years | **No automated job** | Consents cascade-delete with the user. `DeletionRecord` is the only post-delete evidence in Neon |
| Billing/tax: 7 years after tax period | Stripe / accounting | Stripe customer retained. Not a BioSense job |
| Backups: provider recovery window only | Unverified days | Neon plan setting |
| Specific holds | **Not implemented** as a product flag | |

**Launch position:** state the approved policy and the vendor/operational limits above. Do not imply scheduled jobs that do not exist.

**Owner, date, evidence:** Engineering for jobs (not built). Neil for Neon/Vercel/Zoho/Resend actual retention settings.

---

## D03-06 Communications, logs, push and tracking

**DRAFTING BLOCKER**

**Current production:**

- Resend: send with `from`, `to`, `subject`, `html` only. Open/click tracking is a **dashboard** setting, unread from code. Message/log retention/region unknown.
- Vercel logs: function stdout/stderr. Retention unknown.
- Zoho: MX for bio-sense.ai. Mailbox retention unknown.
- Push: Capacitor **local** notifications only. No APNs/FCM. `web-push` unused.
- Email/lock-screen: weekly report mail is a link, not a health dump (operating model). Re-check templates before publication.
- App cookies: NextAuth `__Host-` / `__Secure-` session cookies only. No consent banner (essential-only position).
- Marketing site: **Google Fonts** still requested. Contact form posts to FormSubmit.
- No analytics, pixels, or crash reporting on shipped pages.

**Launch position:** disable Resend open/click tracking; keep messages generic; self-host fonts; no FormSubmit (or replace with a processor already accepted, e.g. Resend/Zoho only); no remote push unless newly accepted.

**Owner, date, evidence:** Engineering for fonts/FormSubmit. Neil for Resend/Zoho/Vercel screenshots. Browser storage test and launch network capture not yet redone against the frozen launch build.

---

## D03-07 Rights request and account lifecycle operation

**PUBLICATION BLOCKER**

**Current production:**

| Action | Route | Effect |
|---|---|---|
| Product export | Logged-in `GET /api/account/export` (JSON). Rate-limited. Includes profile, check-ins, scores, blood markers (no original file), bio-age, chat, consents, meals, wearable days, reports, prefs. Wearable **raw sync JSON/tokens excluded** from export select | Not the only formal access route in policy; in product it is the only automated one |
| Formal access without login | **Not implemented** | Policy: privacy@ email. No signed-out form, no documented identity-check SOP in product |
| Cancellation | Stripe Customer Portal / subscription fields. Not Apple IAP | Stops billing; does not delete the account |
| Source disconnect | Wearables page → Terra deauth or Apple Health disconnect | Stops that source; does not delete historic Neon days |
| Information deletion (subset) | Privacy tab can delete learning facts | Not full account wipe |
| Account deletion | In-app, password confirm, `DELETE /api/account` | See D03-04 |

**Launch position:** keep these actions separate in the notice and Data Rights page. Add a signed-out privacy request path (email SOP is acceptable if evidenced). Identity checks for lost-email cases are operational, not coded.

**Owner, date, evidence:** Engineering for export/delete screens. Neil for privacy@ SOP. Signed-out test not done.

---

## D03-08 Public routes, platform deletion, final accuracy review

**PUBLICATION BLOCKER**

**Current production:**

- Website notice: `https://bio-sense.ai/privacy` (Origin BioSense Technologies FZCO, last updated 26 June 2026).
- App notice: `https://bio-sense-app-navy.vercel.app/privacy` (Last updated 17 June 2026, legal name still generic “BioSense”). Signup and WHOOP page link here. Profile does not.
- These are **two different documents**. D03-08 requires CFD D03 as the **sole** controlling notice at `bio-sense.ai/privacy`, with website, app, and store listings changing together.
- Apple in-app account deletion: exists in the logged-in app (password confirm). Store-listing Privacy URL **not confirmed**.
- Android / Play path: not evidenced as a separate native listing.
- Named Eagle reviewer for frozen-build comparison: **not assigned in this repo**.

**Changes since the 29 Aug production-facts review (non-exhaustive):** MealLog observations; glucose via Apple Health; Terra deauth + Stripe cancel + VerificationToken purge + DeletionRecord on account delete; website contact form (FormSubmit); Terms and Data ethics pages; 21-day trial copy; header Meal Scanner.

**Launch position:** one notice, one URL, matching in-app links, App Store Connect and Play Console URLs when set, named technical sign-off.

**Owner, date, evidence:** Not closed. Wait for the remaining document (the drafted CFD D03) before swapping public copy.

---

## What James / Neil still have to supply (cannot be invented)

1. Neon plan name and PITR days, plus a restore test.
2. OpenAI org Data controls / DPA / abuse-monitoring / ZDR screenshots.
3. Stripe contracting entity on the live account.
4. Resend open/click tracking and log retention.
5. Zoho mailbox retention.
6. App Store Connect and Play Console Privacy Notice URLs.
7. Named Eagle reviewer for the frozen launch build.
8. The **next document** (expected: drafted CFD D03, possibly Data Rights).

## What engineering still has to do before publication (from this pack)

1. Self-host marketing fonts; stop Google Fonts.
2. Remove or replace FormSubmit so the contact form does not add a processor.
3. Point app `/privacy` at the same controlling notice as `bio-sense.ai/privacy` once Eagle issues CFD D03.
4. Neon restore-reapply against `DeletionRecord` (or an equivalent control) if launch will claim it.
5. Evidence pack: export test, signed-out privacy request, delete test, network capture.
