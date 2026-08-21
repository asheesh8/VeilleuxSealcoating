/**
 * Estimate request handler (Vercel Function).
 *
 * Delivers the form to the shop inbox. Email goes out through Resend, chosen
 * because it is a plain REST call with no SDK and works on either runtime.
 *
 * Required environment variables:
 *   RESEND_API_KEY   — from resend.com
 *   ESTIMATE_TO      — where requests land (defaults to the Yahoo address)
 *   ESTIMATE_FROM    — a verified sender on your Resend domain
 *
 * With no key configured the endpoint returns 503 and the form falls back to
 * showing the phone number, so an unconfigured deploy still gives people a way
 * through instead of silently swallowing the request.
 */

const TO = process.env.ESTIMATE_TO || 'veilleuxsealcoating@yahoo.com'
const FROM = process.env.ESTIMATE_FROM || 'Veilleux Website <onboarding@resend.dev>'

interface Payload {
  name?: string
  phone?: string
  email?: string
  address?: string
  idealStart?: string
  services?: string[]
  details?: string
  smsConsent?: boolean
  /** honeypot — real people never fill this */
  companyWebsite?: string
}

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let body: Payload
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Malformed request.' }, 400)
  }

  // Bots fill every field they find. Accept it silently so they stop retrying.
  if (body.companyWebsite) return json({ ok: true })

  const name = (body.name || '').trim()
  const phone = (body.phone || '').trim()
  const details = (body.details || '').trim()
  if (!name || !phone || !details) {
    return json({ error: 'Name, phone, and job details are required.' }, 400)
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    return json(
      { error: 'The request form is not connected yet. Please call or email us instead.' },
      503,
    )
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Phone', phone],
    ['Email', (body.email || '').trim() || '—'],
    ['Address', (body.address || '').trim() || '—'],
    ['Ideal start', (body.idealStart || '').trim() || '—'],
    ['Services', (body.services || []).join(', ') || '—'],
    ['SMS consent', body.smsConsent ? 'Yes' : 'No'],
  ]

  const html = `
    <h2 style="font-family:sans-serif">New estimate request</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 14px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`,
        )
        .join('')}
    </table>
    <h3 style="font-family:sans-serif">Details</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${esc(details)}</p>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: body.email || undefined,
        subject: `Estimate request — ${name}`,
        html,
      }),
    })

    if (!res.ok) {
      console.error('resend failed', res.status, await res.text())
      return json({ error: 'We could not send that. Please call or email us instead.' }, 502)
    }
  } catch (err) {
    console.error('resend threw', err)
    return json({ error: 'We could not send that. Please call or email us instead.' }, 502)
  }

  return json({ ok: true })
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
