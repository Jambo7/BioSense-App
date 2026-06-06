# BioSense

A continuous, personalised health intelligence platform. Upload blood results, connect wearables, complete daily check-ins — BioSense learns your biology and turns your data into clear, educational insights.

**Live app:** https://bio-sense-app-navy.vercel.app

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Database | PostgreSQL 15 via Prisma ORM |
| Auth | NextAuth.js v4 (credentials + JWT) |
| AI | Anthropic Claude |
| PDF processing | pdf-parse |
| File storage | Cloudflare R2 |
| Wearables | Oura, Whoop, Garmin, Apple Health |
| Email | Resend |
| Payments | Stripe |
| Deployment | Vercel (production) |

---

## Local development

### 1. Clone and install

```bash
git clone https://github.com/Shift-ai-tech-ORG/BioSense-App.git
cd BioSense-App
npm install          # also runs prisma generate via postinstall
```

### 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and fill in at minimum:

| Variable | Required to run locally | Where to get it |
|----------|------------------------|-----------------|
| `DATABASE_URL` | Yes | See step 3 |
| `NEXTAUTH_SECRET` | Yes | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes | `http://localhost:3000` |
| `ANTHROPIC_API_KEY` | For AI features | [console.anthropic.com](https://console.anthropic.com) |
| `STRIPE_*` | For billing only | [dashboard.stripe.com](https://dashboard.stripe.com) |
| `RESEND_API_KEY` | For emails only | [resend.com](https://resend.com) |
| `R2_*` | For PDF uploads only | Cloudflare dashboard |
| Wearable OAuth keys | For wearable connect | Each provider's dev portal |

All third-party keys can be left blank for a basic local preview — those features will gracefully fail or be skipped.

### 3. Start Postgres

**Option A — Docker (recommended, no account needed):**

```bash
docker compose up -d
# DATABASE_URL in .env.example already points to this instance
```

**Option B — Neon / Supabase (free hosted Postgres):**

Create a free database at [neon.tech](https://neon.tech) and paste the connection string as `DATABASE_URL` in your `.env`.

### 4. Push the schema

```bash
npx prisma db push
```

### 5. Run

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Deployment

The app runs on **Vercel** at [bio-sense-app-navy.vercel.app](https://bio-sense-app-navy.vercel.app). Pushing to `main` on GitHub triggers a production deploy automatically via Vercel's GitHub integration.

Database: **Neon** (PostgreSQL). After schema changes, run `npx prisma db push` against the production `DATABASE_URL`.

To deploy manually via CLI:

```bash
vercel --prod
```

Legacy GCP Cloud Run setup is documented in [`GCP_DEPLOY.md`](GCP_DEPLOY.md) but is not the active production environment.

---

## Features

| Phase | Features | Status |
|-------|----------|--------|
| 1 | Auth, legal consent, onboarding | ✅ |
| 2 | Daily check-in, health score, dashboard | ✅ |
| 3 | Blood PDF upload, Claude analysis, biomarker tiers | ✅ |
| 4 | Wearable OAuth (Oura/Whoop/Garmin), Apple Health JSON | ✅ |
| 5 | Ask Anything AI, weekly/monthly reports, pattern detection | ✅ |
| 6 | Stripe billing, Web Push, Resend email | ✅ |

---

## Legal compliance

- **T&Cs / Age gate:** Enforced at signup (18+)
- **Privacy (UAE PDPL):** Data export, deletion, consent withdrawal in profile
- **Medical disclaimer:** Persistent footer on all app pages
- **User consent:** Hard-block on first login
- **AI behaviour:** Claude system prompt enforces prohibited/approved language (App 5 policy)
- **Red flag biomarkers:** T1/T2/T3 tier system with trend-based escalation

---

## Notes

- Wearable OAuth requires redirect URIs in each provider's dev portal: `https://yourdomain.com/api/wearables/{provider}/callback`
- Stripe webhooks: `https://yourdomain.com/api/billing/webhook`
- Apple Health requires the [Health Auto Export](https://www.healthautoexport.com) app for JSON export
