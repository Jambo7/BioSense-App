/**
 * Terra API integration — unified wearable aggregator.
 *
 * Terra connects to 500+ wearables/health apps on our behalf and pushes
 * normalised data to our webhook (app/api/wearables/terra/webhook). We
 * authenticate users via a hosted "widget session" and never call Terra
 * from the browser (credentials must stay server-side).
 *
 * Docs: https://docs.tryterra.co
 */
import { createHmac, timingSafeEqual } from 'crypto'

const TERRA_API_BASE = 'https://api.tryterra.co/v2'

/** Reads the active Terra credentials (testing/staging/prod via env). */
export function getTerraCredentials(): { devId: string; apiKey: string } {
  const devId = process.env.TERRA_DEV_ID ?? ''
  const apiKey = process.env.TERRA_API_KEY ?? ''
  if (!devId || !apiKey) {
    throw new Error('Terra is not configured — set TERRA_DEV_ID and TERRA_API_KEY')
  }
  return { devId, apiKey }
}

/**
 * Verifies a Terra webhook signature.
 *
 * The `terra-signature` header looks like `t=<unix>,v1=<hex>,v0=<hex>`.
 * We rebuild `${timestamp}.${rawBody}`, HMAC-SHA256 it with the signing
 * secret, and constant-time compare against the `v1` scheme only.
 *
 * IMPORTANT: pass the RAW request body string — any reserialisation
 * (e.g. JSON.parse then JSON.stringify) will change bytes and fail.
 */
export function verifyTerraSignature(
  rawBody: string,
  signatureHeader: string | null,
  signingSecret: string,
): boolean {
  if (!signatureHeader) return false

  const parts: Record<string, string> = {}
  for (const segment of signatureHeader.split(',')) {
    const idx = segment.indexOf('=')
    if (idx === -1) continue
    const key = segment.slice(0, idx).trim()
    const value = segment.slice(idx + 1).trim()
    parts[key] = value
  }

  const timestamp = parts['t']
  const v1 = parts['v1']
  if (!timestamp || !v1) return false

  const signedPayload = `${timestamp}.${rawBody}`
  const expected = createHmac('sha256', signingSecret).update(signedPayload).digest('hex')

  try {
    const expectedBuf = Buffer.from(expected, 'hex')
    const receivedBuf = Buffer.from(v1, 'hex')
    if (expectedBuf.length !== receivedBuf.length) return false
    return timingSafeEqual(expectedBuf, receivedBuf)
  } catch {
    return false
  }
}

export interface TerraWidgetSession {
  url: string
  sessionId: string
  expiresIn: number
}

/**
 * Creates a Terra authentication widget session. Returns a hosted URL to
 * open in a new tab / in-app browser where the user picks their device and
 * logs in. `referenceId` should be our internal User.id so Terra echoes it
 * back on every webhook.
 */
export async function generateWidgetSession(params: {
  referenceId: string
  successRedirectUrl: string
  failureRedirectUrl: string
  /** Optional list of Terra provider slugs to restrict the picker, e.g. ['OURA','GARMIN']. */
  providers?: string[]
  language?: string
}): Promise<TerraWidgetSession> {
  const { devId, apiKey } = getTerraCredentials()

  const res = await fetch(`${TERRA_API_BASE}/auth/generateWidgetSession`, {
    method: 'POST',
    headers: {
      'dev-id': devId,
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reference_id: params.referenceId,
      auth_success_redirect_url: params.successRedirectUrl,
      auth_failure_redirect_url: params.failureRedirectUrl,
      language: params.language ?? 'en',
      ...(params.providers?.length ? { providers: params.providers.join(',') } : {}),
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Terra widget session failed (${res.status}): ${detail}`)
  }

  const json = (await res.json()) as { url: string; session_id: string; expires_in: number }
  return { url: json.url, sessionId: json.session_id, expiresIn: json.expires_in }
}

/** A connected Terra account, as echoed back on webhook payloads. */
export interface TerraUser {
  user_id: string
  provider?: string
  reference_id?: string | null
  last_webhook_update?: string | null
  scopes?: string | null
}

/**
 * A Terra webhook payload. `type` discriminates the event:
 *  - auth events: 'auth', 'user_reauth', 'deauth', 'access_revoked', 'connection_error'
 *  - data events: 'sleep', 'daily', 'activity', 'body', 'nutrition', 'athlete', ...
 *  - infra: 'healthcheck'
 */
export interface TerraWebhookPayload {
  type: string
  user?: TerraUser
  reference_id?: string | null
  status?: string
  message?: string
  widget_session_id?: string | null
  data?: unknown[]
  [key: string]: unknown
}

/** Resolves our internal User.id from a webhook payload, if present. */
export function getReferenceId(payload: TerraWebhookPayload): string | null {
  return payload.user?.reference_id ?? payload.reference_id ?? null
}
