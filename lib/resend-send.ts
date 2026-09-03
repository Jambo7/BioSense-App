import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

/** Delivery only. Callers that decide *whether* to send must use lib/comms.ts */
export async function sendRawEmail(to: string, subject: string, html: string): Promise<string | null> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Resend not configured — skipping email')
    return null
  }

  const { data, error } = await getResend().emails.send({
    from: process.env.EMAIL_FROM ?? 'BioSense <noreply@biosense.app>',
    to,
    subject,
    html,
  })
  if (error) throw new Error(error.message)
  return data?.id ?? null
}
