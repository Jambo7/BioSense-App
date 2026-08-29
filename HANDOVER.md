# BioSense — Project Handover & Status

> Living context doc for collaborators (human or AI agents) working across multiple
> machines. Read this first to get up to speed, and update the **Recent changes** and
> **Open items** sections as work progresses. **Last updated: 2026-07-30.**

---

## 1. What this is

BioSense is a continuous, personalised health-intelligence web app. Users upload blood
results, connect wearables, and complete daily check-ins; the app computes a health score
and turns the data into educational insights and AI chat.

- **Live app:** https://bio-sense-app-navy.vercel.app
- **GitHub:** https://github.com/Jambo7/BioSense-App (private — clone requires GitHub auth)
- **Marketing site:** https://bio-sense.ai (separate)

---

## 2. Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| UI | React 19, Tailwind CSS v4 |
| Database | PostgreSQL (hosted on **Neon**) via Prisma ORM v7 |
| Auth | NextAuth.js v4 (credentials + JWT). Dual auth: cookie sessions (web) + bearer tokens (mobile) |
| AI | **OpenAI** (default `gpt-4o`) via `lib/claude.ts` (legacy filename; calls OpenAI) |
| Wearables | **Terra API** (unified aggregator — Oura, Whoop, Garmin, Fitbit, Samsung, +) |
| File storage | Cloudflare R2 (blood-test PDFs) |
| Email | Resend |
| Payments | Stripe |
| Deployment | **Vercel** — pushing to `main` auto-deploys to production |

---

## 3. Getting set up on a machine

1. Install **Git** and **Node.js 20+**.
2. `git clone https://github.com/Jambo7/BioSense-App.git && cd BioSense-App`
3. **Get the secrets** — the real `.env` is gitignored and NOT in GitHub. Instead an
   **encrypted** copy travels in the repo as `.env.enc`. Decrypt it with the shared
   passphrase:
   ```bash
   npm install        # need deps first; also runs prisma generate
   npm run unlock     # enter the shared passphrase → regenerates local .env
   ```
   (If you don't have the passphrase, ask the project owner — it is never stored in
   the repo. Without it the app can't run.)
4. `npm run dev` → http://localhost:3000

### Secret handling — lock / unlock
- The plaintext `.env` **never** goes through git; only the AES-256-GCM–encrypted
  `.env.enc` blob does (`scripts/env-crypto.mjs`, committed via `.gitattributes` as
  binary so line endings are preserved).
- **After changing `.env`:** run `npm run lock` (enter the passphrase) to refresh
  `.env.enc`, then commit it — otherwise other machines pull stale secrets.
- **On another machine / after pulling a new `.env.enc`:** run `npm run unlock`.
- Lose the passphrase → no recovery; just re-`lock` from a machine that still has a
  good `.env`. Share the passphrase out-of-band (password manager), never in the repo.

The database is the shared **Neon** cloud instance (per `DATABASE_URL`), so no local
Postgres/Docker is needed and all machines share the same data. The schema is already
pushed to Neon — only run `npx prisma db push` after editing `prisma/schema.prisma`.

### Multi-machine workflow
- `git pull` **before** starting work; commit + `git push` **when done**.
- Work on only one machine at a time between pulls/pushes to avoid divergence.

---

## 4. How key systems work

- **Wearables (Terra):** Users connect a device via a hosted Terra "widget session"
  (`/api/wearables/terra/connect`). Terra pushes normalised data to our webhook
  (`/api/wearables/terra/webhook`), which verifies the HMAC signature, stores the payload
  on `WearableSync` (keyed by userId+provider), and triggers a health-score recalc.
  - `lib/terra.ts` — Terra client + signature verification.
  - `lib/wearable-metrics.ts` — extracts HRV / resting HR / steps / active minutes /
    sleep score from Terra payloads. **NOTE:** field paths follow Terra's documented
    schema but are not yet validated against a real Fitbit payload.
  - Wearables UI: `app/(app)/wearables/page.tsx`. Connected devices are tap-to-expand
    with a live metrics preview (`GET /api/wearables/[provider]`).
- **Health score:** `lib/score.ts` (pure calc) + `lib/health-score.ts` (recalc + persist).
  Combines today's check-in with aggregated wearable metrics. Recalculated on check-in
  submit AND on fresh wearable data.
- **Mobile / iOS:** Backend dual auth is ready (`lib/api-auth.ts` Bearer + cookies;
  `/api/auth/mobile/{login,refresh}` + JSON APIs). The **iOS TestFlight shell** lives in
  `mobile/` (Capacitor → production URL). See `mobile/README.md` for Xcode / TestFlight
  steps. Bundle ID: `ai.biosense.app`. Needs a Mac to Archive; Windows can sync only.

---

## 5. Current status

- ✅ Web app live on Vercel; core features working (auth, onboarding, check-ins, health
  score, blood upload + analysis, AI chat, reports, billing, push/email).
- ✅ Terra wearable integration live. **Fitbit** added and successfully connected by the
  client. Tap-to-preview window shipped.
- ✅ Backend prepared for iOS/Android (dual auth + JSON endpoints) without breaking web.
- ✅ Public privacy policy page (`app/privacy`) for wearable-provider approvals.
- 🔶 Terra is running in the **Testing** environment. Confirm the live Vercel app uses the
  matching Terra keys (`TERRA_DEV_ID` etc.) and that `TERRA_SIGNING_SECRET` is set on
  Vercel (otherwise the webhook rejects events in production).

---

## 6. Open items / TODO

- [ ] **⚠️ REMINDER (James): set `CRON_SECRET` in Vercel for proper cron auth.** The daily
      wearable-sync cron currently authorises Vercel's scheduler via its `vercel-cron/1.0`
      user-agent (so it works with no secret), but that endpoint is therefore triggerable by
      anyone who finds the URL (harmless — only forces a data refresh, no data exposed).
      Adding a `CRON_SECRET` env var in Vercel locks it down; the code already prefers it
      when present. Low priority, not urgent.
- [ ] **Validate Fitbit data mapping** against a real stored payload once data syncs
      (check `lib/wearable-metrics.ts` paths match what Fitbit actually sends).
- [ ] **Confirm Vercel ⇄ Terra environment alignment** (Testing vs Production keys).
- [ ] **Whoop integration** — needs the client's own Whoop developer app credentials
      ("Add Credentials" in Terra) + a DNS CNAME; gated on company incorporation +
      finalised privacy policy.
- [ ] **Company incorporation** before finalising the privacy policy for provider submission.
- [ ] **Custom-domain email** (e.g. hello@bio-sense.ai) — Google Workspace recommended.
- [ ] **TestFlight upload** — iOS Capacitor shell is in `mobile/`; Neil creates the App Store
      Connect app + signs in Xcode on a Mac, then Archive → TestFlight (see `mobile/README.md`).
      **Build 2** adds HealthKit + local reminders — must re-Archive.
- [ ] **Remote APNs** — daily reminders are on-device local notifications. Server-pushed alerts
      still need an Apple Push key.

---

## 7. Environment variables (see `.env.example`)

Required to run: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
Wearables: `TERRA_DEV_ID`, `TERRA_API_KEY`, `TERRA_SIGNING_SECRET` (use the **Testing**
environment keys for dev). AI: `OPENAI_API_KEY` (optional in dev). Stripe / Resend / R2
keys are optional locally — those features skip gracefully when blank.

> Never commit `.env`. Never paste real keys into chat/email/issues. Secrets travel only
> as the encrypted `.env.enc` blob — see "Secret handling — lock / unlock" above.

---

## 8. Recent changes (most recent first)

- 2026-08-25 — Wrote docs/data-flow.md: current hosting / subprocessors statement for
  partner questionnaires (Neon us-east-1, Vercel, Terra, OpenAI, Resend; R2 unused).
- 2026-08-07 — Ingested GSC-000/001/002 (architecture + Health Score + Biological Age
  methodologies) into docs/gsc + lib/gsc pins. Full score/bio-age rewrite still blocked on
  GSC-003/004/008/009 (no numeric weights in 001/002 by design). Interim engines remain.
- 2026-08-03 — Imported SCL-001…024 scientific config packs into CSL data + biomarker
  registry. ApoB banding live from Neil’s pack (optimal &lt;65 / above ≥80). Score/FH/RCV
  claims still DECLARED where the packs left them unspecified.
- 2026-07-30 — Capacitor iOS shell (`mobile/`) for TestFlight; loads production web app.
  App icon + camera/photo usage strings. Web viewport / apple-web-app meta for the shell.
- 2026-06-26 — Added `npm run lock`/`unlock` secret workflow; secrets now travel as an
  encrypted `.env.enc` blob in the repo.
- 2026-06-22 — Tap-to-preview live metrics window for connected wearables.
- 2026-06-20 — Added Fitbit to the wearables connect list.
- (earlier) — iOS-readiness: dual web/mobile auth + JSON API endpoints; public privacy
  policy page; Terra wearable integration.
