# BioSense customer operating model

As-is plus the pieces just added. Not a future Retool/CRM design.

```
Member app  →  BioSense backend  →  Neon (customer file)
                      │
                      ├─ Stripe (money) ← webhooks → subscription fields on User
                      ├─ Resend (send email only) ← bounce webhook → suppress
                      ├─ iPhone local reminders (not APNs yet)
                      └─ /ops lookup (founder, secret)     Zoho = human mail
```

## Implementation table

| Component | Exists now? | Work needed | Owner | Launch critical? |
|---|---|---|---|---|
| Neon ownership/access | Yes, one production Neon (us-east-1). Org login is with engineering until BioSense is added as admin. No separate staging DB. | Add BioSense as Neon org admin; decide staging later | Engineering + Neil | Yes |
| Customer/account schema | Yes (User + related tables) | Done for launch: product/marketing email prefs, bounce suppress, cancel-at-period-end | Engineering | Yes |
| Stripe webhooks | Yes: checkout completed, subscription updated/deleted. Now also payment_failed, cancel-at-period-end, duplicate event ids | Confirm live endpoint + events in Stripe Dashboard | Engineering + Neil | Yes |
| Subscription state | Yes on User (`subscriptionStatus`, Stripe ids) | Keep Stripe as money source; BioSense copies operational state | Engineering | Yes |
| Communication preferences | Yes: service always on; product email default on; marketing default off. Profile toggles + audit log | Push prefs later with real APNs | Engineering | Yes |
| Resend integration | Yes, via one send module (`lib/comms.ts`) | Put `OPS_SECRET` / Resend webhook secret on Vercel | Engineering | Should |
| Resend webhooks | Route exists: `/api/webhooks/resend` | Turn on in Resend dashboard (bounce/complaint) | Neil + engineering | Should |
| Push integration | iPhone local 9:00 reminder only. No APNs/FCM from server | APNs/FCM if we want remote alerts | Engineering | Can follow |
| Communication event log | Yes (`NotificationLog`: why sent / suppressed / failed, Resend id) | Keep using it; do not build a warehouse | Engineering | Should |
| Suppression rules | Bounce/complaint suppress; product/marketing opt-out; service still sends unless bounced | Trial/billing reminder jobs not built yet | Engineering | Billing jobs: should |
| Admin console | Simple founder lookup at `/ops` (secret). Not Retool | Retool later if needed. Do not edit Neon by hand | Engineering | Should |
| Account closure/deletion | Member can delete account (Neon cascade, VerificationToken purge, DeletionRecord). Terra deauth + Stripe subscription cancel are best-effort. Stripe customer retained. OpenAI/logs/backups not wiped | Neon restore-reapply still missing. See CFD-D03-CLOSURE-STATUS | Engineering | Yes |
| iOS / Android billing | Stripe Checkout in the browser / WebView. Not Apple IAP / Play Billing | Confirm store rules before locking | Neil + legal | Yes to decide, not to rebuild today |

## Health boundary (current)

Stripe, Resend and `/ops` do not receive wearable samples, blood markers or chat. Weekly “report ready” email is a link only.
