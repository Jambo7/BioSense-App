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

/** Default Terra data types we request on a recurring sync. */
export const TERRA_SYNC_TYPES = ['daily', 'sleep', 'activity', 'body'] as const

export interface TerraDataRequestResult {
  type: string
  status: number
  ok: boolean
  /**
   * Normalised records returned inline by Terra. Only populated when
   * `toWebhook: false` and Terra answered synchronously (200 with a `data`
   * array). Undefined for webhook-delivered requests or when Terra deferred
   * the response (e.g. 202 processing for cold/large ranges).
   */
  data?: unknown[]
}

/**
 * Asks Terra for a user's data over a date range.
 *
 * With `toWebhook: true`, Terra delivers the results asynchronously to our
 * webhook (app/api/wearables/terra/webhook). The downside: large data days can
 * exceed the host's inbound request-body limit (Vercel caps serverless bodies
 * at ~4.5 MB → HTTP 413), so those deliveries silently fail.
 *
 * With `toWebhook: false` (preferred for our ≤7-day syncs), Terra returns the
 * normalised data inline in the HTTP response, which we surface via
 * `result.data`. Reading a response body is not subject to the inbound
 * body-size limit, so this sidesteps the 413/503 problem entirely. Note Terra
 * only answers inline for ranges up to 28 days; longer ranges are forced async
 * regardless of this flag.
 *
 * A per-type non-2xx (e.g. Fitbit returning 424 for activity when there are no
 * workouts) is reported but does not throw, so one empty type never blocks the
 * others.
 */
export async function requestTerraUserData(params: {
  terraUserId: string
  startDate: Date
  endDate: Date
  types?: readonly string[]
  toWebhook?: boolean
}): Promise<TerraDataRequestResult[]> {
  const { devId, apiKey } = getTerraCredentials()
  const types = params.types ?? TERRA_SYNC_TYPES
  const toWebhook = params.toWebhook ?? true
  const fmt = (d: Date) => d.toISOString().split('T')[0]

  const headers = { 'dev-id': devId, 'x-api-key': apiKey }
  const results: TerraDataRequestResult[] = []

  for (const type of types) {
    const url =
      `${TERRA_API_BASE}/${type}?user_id=${encodeURIComponent(params.terraUserId)}` +
      `&start_date=${fmt(params.startDate)}&end_date=${fmt(params.endDate)}` +
      `&to_webhook=${toWebhook}`
    try {
      const res = await fetch(url, { headers })
      let data: unknown[] | undefined
      if (res.ok && !toWebhook) {
        try {
          const json = (await res.json()) as { data?: unknown }
          if (Array.isArray(json.data)) data = json.data
        } catch {
          // Non-JSON / empty body — leave data undefined, status still reported.
        }
      }
      results.push({ type, status: res.status, ok: res.ok, data })
    } catch {
      results.push({ type, status: 0, ok: false })
    }
  }

  return results
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

/** Asks Terra to drop the connection so they stop collecting for this user. */
export async function deauthenticateTerraUser(terraUserId: string): Promise<boolean> {
  const { devId, apiKey } = getTerraCredentials()
  const res = await fetch(
    `${TERRA_API_BASE}/auth/deauthenticateUser?user_id=${encodeURIComponent(terraUserId)}`,
    { method: 'DELETE', headers: { 'dev-id': devId, 'x-api-key': apiKey } },
  )
  return res.ok || res.status === 404
}

/** Resolves our internal User.id from a webhook payload, if present. */
export function getReferenceId(payload: TerraWebhookPayload): string | null {
  return payload.user?.reference_id ?? payload.reference_id ?? null
}
