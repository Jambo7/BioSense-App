# BioSense — production facts for Privacy Notice and cookie inventory

**As of 29 August 2026.** Snapshot only. For current vs launch answers use `docs/governance/CFD-D03-CLOSURE-STATUS.md`. Do not treat this file as the live inventory.

Production app: `https://bio-sense-app-navy.vercel.app`  
Marketing site: `https://bio-sense.ai` (separate static site on Vercel)

---

## Still for you (not in this pack)

Engineering cannot see these account screens. Copy each answer (or a screenshot) into the Privacy Notice pack. Until then, those five questions are **unanswered**.

| # | What Neil asked | Where to look | What to write down |
|---|---|---|---|
| 1 | Neon plan, and exact backup / point-in-time recovery window | [Neon console](https://console.neon.tech) → this BioSense project → Settings / Restore | Plan name (e.g. Launch / Scale) and the number of days of PITR / backup retention |
| 2 | Stripe contracting entity on the production account | Stripe Dashboard → Settings → Business / account details | Legal company name Stripe shows as the contracting party |
| 3 | OpenAI agreement / DPA executed, sharing & training, abuse-monitoring days, any zero-retention endpoint | [platform.openai.com](https://platform.openai.com) → Organisation → Data controls / Compliance | Confirm DPA accepted; sharing still off; the retention text shown; ZDR yes/no |
| 4 | Resend email open or click tracking | Resend dashboard → domain / tracking settings | On or off |
| 5 | Privacy Notice URL on App Store / Play listings | App Store Connect (and Google Play if listed) → App Privacy / store listing | Exact URL, or “not set” |

Everything else in this document is from the live product and code.

---

## A. Platform declarations

### 1. Neon deletion and backups

**Plan / PITR window:** Not readable from application code or the public app. Neon backup and point-in-time recovery length is a **project plan setting** in the Neon console (same AWS region as the database: **us-east-1**, Virginia, USA). Someone with Neon access must copy the exact plan name and restore window from Console → Project.

**When a user account is deleted:** `DELETE /api/account` runs `prisma.user.delete` for that user id. PostgreSQL cascade then **physically deletes** (from the live database) the related rows:

- NextAuth `Account`, `Session`
- `DailyCheckin`, `HealthScore`, `BloodResult`, `BiologicalAge`
- `WearableSync` (including stored wearable tokens and JSON payloads)
- `ChatMessage`, `WeeklyReport`, `MonthlyReport`, `Pattern`, `Consent`
- `NotificationLog`, `UserGoal`, `Insight`, `WearableDay`
- `LearningSession`, `LearnedFact`, `LearningProgress`

**Not deleted by that path:**

- `VerificationToken` rows (password-reset tokens keyed by **email**, no `userId` / no cascade)
- Stripe customer / subscription objects (only `stripeCustomerId` on the User row is removed with the user)
- Terra-side end-user / provider connection (no Terra delete API call on account delete)
- OpenAI copies of prompts/images within their abuse-monitoring window
- Vercel logs, Resend message logs, browser copies

**Per-user encryption:** **No.** There is no application-level per-user data encryption and **no per-user encryption key**. Passwords are stored as **bcrypt hashes**. Wearable `accessToken` / `refreshToken` are ordinary strings in Neon. Neon/AWS provide **disk encryption at rest** for the database as a platform feature (not a BioSense-managed key per member).

**Key destruction:** **Not implemented** (there is no per-user key to destroy).

**Restoration after delete:** A Neon PITR / backup restore of the project **can restore deleted rows** for any user whose data was still inside the backup window. BioSense does not run a post-restore scrub. Prevention of reappearance is therefore **only** (a) expiry of Neon’s backup window, and (b) operational discipline not to restore over a deletion without a further purge. There is no cryptographic shredding.

---

### 2. Terra processing

**DPA:** https://tryterra.co/dpa  

**Subprocessors:** https://tryterra.co/privacy/subprocessors (list **effective 10 February 2026** at time of fetch)

**Countries / regions (from Terra’s published list, not a BioSense pin):**

- End-user health/activity data: **AWS**, **GCP**, **ClickHouse Cloud** — locations stated as **United States, UK, EU**
- Monitoring / support that may see end-user data: **HyperDX, Zendesk, Anthropic, OpenAI** — **United States** (Terra states AI support payloads are sanitised; customers may opt out via Terra support)
- Terra’s own business/marketing subprocessors (US unless noted): Close, Discord, Google Ads, Google Analytics, PostHog, SendGrid, Stripe, plus AWS also for customer account data (US/UK/EU)

**BioSense regional restriction:** **None.** Widget session creation posts to `https://api.tryterra.co/v2` with `reference_id`, redirect URLs, language `en`, and optional provider list. No residency / region field is set.

Auth happens on **Terra-hosted** pages; the app only opens the returned URL then returns to `/wearables`.

---

### 3. OpenAI contractual and retention position

**Governing documents (public API / platform terms; no signed enterprise PDF is in this repo):**

- Services Agreement: https://openai.com/policies/services-agreement/
- Data Processing Addendum (effective 1 January 2026 on OpenAI’s site): https://openai.com/policies/data-processing-addendum/  
  PDF: https://cdn.openai.com/pdf/openai-data-processing-addendum.pdf
- API data usage / privacy: https://openai.com/policies/api-data-usage-policies  
  (and related Business/API privacy pages on openai.com)

Whether Origin BioSense Technologies FZCO has **executed** the DPA in the OpenAI dashboard is **not visible from code**. Legal should confirm the signed DPA in platform.openai.com for the production organisation.

**Production traffic:** **OpenAI API only** for live AI (chat, learning, reports, blood extraction). The Anthropic SDK is in `package.json` but production calls go through the OpenAI client in `lib/claude.ts` and `app/api/blood/route.ts`. There is **no ChatGPT consumer UI** in the product.

**Model and endpoint:** Default model **`gpt-4o`** unless env `OPENAI_MODEL` overrides it. SDK default base URL **`https://api.openai.com/v1`**. Method: **Chat Completions** (`chat.completions.create`). Blood photos are sent as `image_url` data URLs on the same Completions API. No Azure OpenAI / regional base URL is configured in code.

**Input/output sharing and training:** Not a code flag. Last production organisation check (this project, August 2026): **data sharing for model improvement = Disabled**. Re-confirm in OpenAI org **Data controls** before the notice is finalised.

**Abuse monitoring / ZDR:** Last production organisation check: **Zero Data Retention is not available** on this org (no ZDR / modified-retention endpoint control). Standard **API abuse-monitoring retention** therefore applies (OpenAI’s published default is typically **up to 30 days**, then deletion). Re-read the exact wording in the OpenAI org UI when finalising the notice. No BioSense endpoint is configured for zero retention in code.

---

### 4. Current Privacy Notice

**Yes, notices are public — there are currently two different documents.**

| Surface | URL | Dates / entity | Linked from |
|---|---|---|---|
| **Logged-in / app (this repo)** | https://bio-sense-app-navy.vercel.app/privacy | **Last updated 17 June 2026.** Legal name in the page is still generic **“BioSense”** (comment in source: replace with registered entity). Contact `privacy@bio-sense.ai` | Signup checkbox (`/signup` → `/privacy`). WHOOP API explainer (`/whoop`). **Not** linked from Profile (Profile has export/delete only). Login page has **no** privacy link. |
| **Marketing website** | https://bio-sense.ai/privacy (serves `privacy.html`) | **Effective 10 June 2026.** **Last updated 26 June 2026.** Controller: **Origin BioSense Technologies FZCO**, IFZA Freezone, Dubai. Contact `privacy@bio-sense.ai` | Footer **Privacy** on the marketing site. |

**App Store / Play listings:** Privacy URL in App Store Connect / Google Play **cannot be confirmed from this repository**. Check each listing’s Privacy Policy URL field.

**In-app “Privacy” tab** (`/chat` → Privacy) is a **data-control UI** (learning facts delete), not the legal notice.

---

### 5. Supporting inventory (production)

**Cookies / browser storage / SDKs / scripts:** see Section B.

**Hosting / compute:** App and marketing site: **Vercel**. Database: **Neon (AWS us-east-1)**. Email send: **Resend** API. Payments: **Stripe** Checkout + Customer Portal (hosted by Stripe). Wearables: **Terra**. AI: **OpenAI**. Optional unused: Cloudflare R2 client in code, **not** used for lab file storage.

**Logging:** Application `console.log` / `console.error` on Vercel (platform logs). No Sentry, Datadog, PostHog, or similar in the app. Terra webhooks may log identifiers. No dedicated customer-support SaaS (Intercom/Zendesk) in the app.

**Privacy / support inboxes:** MX for **bio-sense.ai** is **Zoho** (`mx.zoho.com`, `mx2.zoho.com`, `mx3.zoho.com`). Addresses in production copy: **privacy@bio-sense.ai**, marketing contact **hello@bio-sense.ai**. Inbox product is therefore **Zoho Mail** (or Zoho-hosted mail) for that domain, not Google Workspace.

**Stripe contracting entity:** **Not in code.** Must be copied from Stripe Dashboard → Settings → Business / legal entity (Neil’s account). Currency in code is AED.

---

## B. Cookie and browser-storage inventory

### 1. Cookies set by BioSense (app domain)

Observed on live `https://bio-sense-app-navy.vercel.app` (NextAuth v4, HTTPS):

| Name | Purpose | Provider | Domain | 1P / 3P | Expiry |
|---|---|---|---|---|---|
| `__Host-next-auth.csrf-token` | CSRF protection for NextAuth | BioSense (NextAuth) | host-only (`__Host-`) | First-party | Session (no Max-Age on Set-Cookie from `/api/auth/session`) |
| `__Secure-next-auth.callback-url` | Post-login redirect target | BioSense (NextAuth) | host-prefixed | First-party | Session |
| `__Secure-next-auth.session-token` | JWT login session (httpOnly) | BioSense (NextAuth) | host-prefixed | First-party | **30 days** (`session.maxAge` in `lib/auth.ts`) — set **after successful sign-in**, not on anonymous `/login` |

All of the above: **HttpOnly, Secure, SameSite=Lax, Path=/**.

Anonymous `/login` HTML response itself sets **no** cookies. CSRF/callback cookies appear when NextAuth session endpoints are hit.

Vercel may set platform cookies on some routes (preview/auth); none were required for the public login HTML. **No** `_va` / Speed Insights cookies were present in live first-party `document.cookie` on `/login`.

### 2. localStorage / sessionStorage / IndexedDB

**App:**

- `localStorage` key **`nextauth.message`** — NextAuth client broadcast helper (seen on live `/login`). Not a tracking pixel.
- `sessionStorage` key **`biosense.tour`** — onboarding tour resume (`components/tour/tour-context.tsx`). Only while a tour is active / after a hard refresh mid-tour.
- **IndexedDB:** not used in application source.

**Marketing site (live homepage):** `document.cookie` empty; **no** localStorage or sessionStorage keys.

### 3. How login sessions are stored

**Web:** NextAuth **JWT strategy** (not database sessions for the live token). The session is the **httpOnly JWT cookie** `__Secure-next-auth.session-token`, 30 days. Prisma `Session` table exists for the adapter schema but production auth is JWT.

**iOS Capacitor shell:** same origin as the web app in the WebView **or** `Authorization: Bearer` JWT from `/api/auth/mobile/*` (same `NEXTAUTH_SECRET`). Bearer token is held by the native client, not as a BioSense first-party cookie on bio-sense.ai.

### 4. Vercel Analytics / Speed Insights

**Not** in `package.json`, **not** in `app/layout.tsx`, **not** in live `/login` HTML. No `@vercel/analytics` / Speed Insights scripts. A Vercel **project dashboard** toggle cannot be ruled out from code alone; the **shipped page has no those scripts**.

### 5. Stripe embed vs hosted

Checkout and billing portal return a **Stripe-hosted URL**; the browser **navigates away**. **No** Stripe.js / Elements embed on BioSense pages. Stripe cookies are set on **Stripe’s domains** after redirect, **not** by BioSense code on the app origin. They do not appear on BioSense pages until/unless Stripe third-party cookies are set during a Checkout visit (standard Stripe Checkout behaviour).

### 6. Terra on BioSense pages

Terra auth is **off-site**. BioSense does not load Terra JS or set Terra cookies on the app origin. After connect, the user returns to `/wearables` with query params (`connected=1` / error). Any Terra cookies exist on **Terra / provider** hosts during OAuth.

### 7. Resend open / click tracking

`emails.send` is called with `from`, `to`, `subject`, `html` only — **no** tracking flags in code. Whether the **Resend dashboard** has open/click tracking enabled for the domain is **not readable from code**.

### 8. Advertising / attribution / social pixels

**None** in app or marketing site source. No Meta, Google Ads, TikTok, LinkedIn, affiliate, or referral cookies in BioSense code. Live marketing homepage: only first-party `assets/main.js` plus **Google Fonts** CSS.

### 9. Cookie-consent tool

**None** on the app or the marketing site.

### 10. Marketing vs logged-in app

**Different stacks.**

- **App:** Next.js on `bio-sense-app-navy.vercel.app`; NextAuth cookies; Next.js self-hosted font files (no Google Fonts request on `/login`).
- **Marketing:** static HTML on `bio-sense.ai`; **no first-party cookies** observed; **Google Fonts** (`fonts.googleapis.com` / `fonts.gstatic.com`); local `assets/main.js` (nav, FAQ, video loop — **no** analytics). Footer Privacy / Terms: Terms and Data ethics links are currently **`href="#"`** (placeholders), Privacy is a real page.

---

## Also not a “console” item, but still for Neil / legal

The app and the website currently publish **two different Privacy Notices** (different dates and legal-entity wording). That is recorded in section 4. Align them before calling one notice final. This pack does not choose which text wins.
