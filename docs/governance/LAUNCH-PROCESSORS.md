# Launch processors — for CFD-D03 Privacy Notice

Accepted 3 September 2026. Not blockers.

**OpenAI.** AI features send prompts/content to OpenAI. Completions are requested with `store: false` (not stored for OpenAI dashboard/distillation). Org-level training/retention must still be set in the OpenAI account. Provider logs may exist outside BioSense storage; the Privacy Notice must say so.

**Neon.** Production database on AWS us-east-1. Account deletion removes BioSense application data. Backups/PITR expire with the Neon plan. Deleted users must not be restored into live production from backup.

**Stripe.** Subscription cancelled on account deletion. Customer/payment records may be retained for accounting, tax, fraud, disputes, or legal duty.

**Terra.** Wearable connection deauthenticated on disconnect and on account deletion where a Terra user id is held.
