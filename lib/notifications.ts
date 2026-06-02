/**
 * Notification delivery — Web Push + Resend email fallback
 */
import { Resend } from 'resend'

// Lazily construct the client so simply importing this module never throws
// when RESEND_API_KEY is absent (e.g. during build/page-data collection).
let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

export interface NotificationPayload {
  title: string
  body: string
  url?: string
  tag?: string
}

export async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Resend not configured — skipping email')
    return
  }

  await getResend().emails.send({
    from: process.env.EMAIL_FROM ?? 'BioSense <noreply@biosense.app>',
    to,
    subject,
    html,
  })
}

/**
 * Branded welcome email — sent once when a user completes account creation.
 * Copy is the client-approved text; {{FirstName}} is substituted from `name`.
 * Light, calm, sage-accented template that matches the in-app brand.
 */
export async function sendWelcomeEmail(to: string, firstName: string) {
  const appUrl = process.env.NEXTAUTH_URL ?? 'https://biosense.app'
  const name = firstName?.trim() || 'there'

  const steps: { title: string; body: string }[] = [
    {
      title: 'Connect your wearables',
      body: 'Automatic synchronisation with leading wearables and devices to help BioSense understand your sleep, recovery, stress, activity and long-term trends over time.',
    },
    {
      title: 'Explore Learning Mode',
      body: 'A short conversational experience that helps BioSense better understand your routines, behaviours and goals.',
    },
    {
      title: 'Upload blood results anytime',
      body: 'Unlock deeper biomarker analysis, personalised trend tracking and clear explanations of what your biomarkers mean, why they matter and how they may relate to your health.',
    },
    {
      title: 'Complete your Daily Check-ins',
      body: 'Help BioSense understand how you actually feel, not just what your wearable data says.',
    },
  ]

  const stepRows = steps
    .map(
      (s, i) => `
      <tr>
        <td style="padding:14px 18px;border:1px solid #E7E9E2;border-radius:14px;background:#FBFCFA;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="34" valign="top" style="padding-right:12px;">
                <div style="width:30px;height:30px;border-radius:999px;background:linear-gradient(180deg,#9DBE96 0%,#6F8F6B 100%);color:#ffffff;font-size:13px;font-weight:700;text-align:center;line-height:30px;">${i + 1}</div>
              </td>
              <td valign="top">
                <div style="font-size:15px;font-weight:700;color:#1A1A16;margin-bottom:3px;">${s.title}</div>
                <div style="font-size:13px;line-height:1.6;color:#5B6158;">${s.body}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td style="height:10px;line-height:10px;font-size:10px;">&nbsp;</td></tr>`,
    )
    .join('')

  const html = `
  <div style="background:#F4F6F2;padding:28px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:20px;border:1px solid #E7E9E2;overflow:hidden;">
      <tr>
        <td style="padding:30px 30px 6px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6F8F6B;">BioSense</div>
          <h1 style="font-size:26px;line-height:1.2;font-weight:700;color:#1A1A16;margin:14px 0 0;">Welcome to <span style="font-style:italic;color:#6F8F6B;">BioSense</span>.</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 30px 0;">
          <p style="font-size:15px;line-height:1.7;color:#3A3F37;margin:0 0 14px;">Hi ${name},</p>
          <p style="font-size:14px;line-height:1.75;color:#3A3F37;margin:0 0 14px;">Welcome to BioSense. You&rsquo;ve already taken the first step towards building a clearer understanding of your health.</p>
          <p style="font-size:14px;line-height:1.75;color:#3A3F37;margin:0 0 14px;">As BioSense learns more about you, your Health Score becomes increasingly personalised around the factors that matter most to your body and goals. Over time, you&rsquo;ll begin uncovering patterns and correlations that are difficult to spot through isolated data alone, helping you better understand how areas like sleep, stress, nutrition, recovery and lifestyle may be influencing how you feel day to day.</p>
          <p style="font-size:14px;line-height:1.75;color:#3A3F37;margin:0 0 6px;font-weight:600;">Here are the best next steps to get the most from your experience:</p>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 30px 4px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${stepRows}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:6px 30px 4px;">
          <p style="font-size:14px;line-height:1.75;color:#3A3F37;margin:0 0 18px;">Your journey is just getting started. We&rsquo;re excited to have you with us.</p>
          <a href="${appUrl}/dashboard" style="display:inline-block;padding:12px 24px;background:linear-gradient(180deg,#7DA277 0%,#6F8F6B 100%);color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;border-radius:999px;">Open my dashboard &rarr;</a>
          <p style="font-size:13px;color:#5B6158;margin:20px 0 0;">&ndash; Team BioSense</p>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 30px 28px;">
          <div style="border-top:1px solid #E7E9E2;padding-top:16px;">
            <p style="font-size:11px;line-height:1.6;color:#8A8F84;margin:0;">BioSense provides educational insights only and is not medical advice. Always consult a qualified healthcare professional before making any changes.</p>
          </div>
        </td>
      </tr>
    </table>
  </div>`

  await sendEmail(to, 'Welcome to BioSense', html)
}

/**
 * Branded password-reset email. `url` is a one-time, time-limited link.
 */
export async function sendPasswordResetEmail(to: string, name: string, url: string) {
  const firstName = name?.trim().split(' ')[0] || 'there'
  const html = `
  <div style="background:#F4F6F2;padding:28px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:20px;border:1px solid #E7E9E2;overflow:hidden;">
      <tr>
        <td style="padding:30px 30px 6px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6F8F6B;">BioSense</div>
          <h1 style="font-size:24px;line-height:1.2;font-weight:700;color:#1A1A16;margin:14px 0 0;">Reset your password</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 30px 0;">
          <p style="font-size:14px;line-height:1.7;color:#3A3F37;margin:0 0 14px;">Hi ${firstName},</p>
          <p style="font-size:14px;line-height:1.7;color:#3A3F37;margin:0 0 18px;">We received a request to reset your BioSense password. Click the button below to choose a new one. This link expires in 1 hour.</p>
          <a href="${url}" style="display:inline-block;padding:12px 24px;background:linear-gradient(180deg,#7DA277 0%,#6F8F6B 100%);color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;border-radius:999px;">Reset my password &rarr;</a>
          <p style="font-size:12px;line-height:1.6;color:#8A8F84;margin:20px 0 0;">If you didn&rsquo;t request this, you can safely ignore this email — your password won&rsquo;t change.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 30px 28px;">
          <div style="border-top:1px solid #E7E9E2;padding-top:14px;">
            <p style="font-size:11px;line-height:1.6;color:#8A8F84;margin:0;word-break:break-all;">If the button doesn&rsquo;t work, paste this link into your browser:<br/>${url}</p>
          </div>
        </td>
      </tr>
    </table>
  </div>`

  await sendEmail(to, 'Reset your BioSense password', html)
}

export async function sendWeeklyReportEmail(
  to: string,
  name: string,
  reportContent: Record<string, unknown>,
) {
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #030508; color: #1A1A16; padding: 32px; border-radius: 12px;">
      <div style="margin-bottom: 24px;">
        <span style="font-size: 11px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; color: #4f6b57;">Weekly Health Report</span>
        <h1 style="font-size: 24px; font-weight: bold; color: #1A1A16; margin: 8px 0 4px;">${reportContent.headline ?? 'Your weekly health summary'}</h1>
        <p style="color: #90ae9a; font-size: 13px;">Hi ${name}, here's your personalised health intelligence for this week.</p>
      </div>

      ${reportContent.whatChanged ? `
      <div style="background: #0c1210; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
        <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.08em; color: #4f6b57; margin-bottom: 8px;">What Changed</div>
        <p style="color: #1A1A16; font-size: 13px; line-height: 1.7;">${reportContent.whatChanged}</p>
      </div>` : ''}

      ${reportContent.actions ? `
      <div style="background: #0c1210; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
        <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.08em; color: #4f6b57; margin-bottom: 8px;">3 Actions This Week</div>
        ${(reportContent.actions as string[]).map((a, i) => `<div style="color: #1A1A16; font-size: 13px; padding: 6px 0; border-bottom: 1px solid rgba(26,26,22,0.07);">${i + 1}. ${a}</div>`).join('')}
      </div>` : ''}

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(26,26,22,0.07);">
        <p style="font-size: 11px; color: #2c4132; line-height: 1.6;">This report is for educational purposes only and is not medical advice. BioSense does not provide diagnoses or treatment recommendations. Always consult a qualified healthcare professional.</p>
        <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display: inline-block; margin-top: 16px; padding: 10px 20px; background: #4dc88c; color: #030508; font-weight: bold; font-size: 13px; text-decoration: none; border-radius: 8px;">View full dashboard →</a>
      </div>
    </div>
  `

  await sendEmail(to, `Your weekly BioSense report`, html)
}
