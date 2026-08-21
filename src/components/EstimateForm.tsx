import { useState, type FormEvent } from 'react'
import { useLocation } from 'wouter'
import { company, services } from '../data/site'
import { Button } from './Button'

type Status = 'idle' | 'sending' | 'error'

/**
 * Estimate request, posted to the Vercel function at /api/estimate.
 *
 * Photos are deliberately not uploaded here — handling multipart in a
 * serverless function means adding storage, and a contractor would rather get
 * them by text anyway. The form asks people to text them instead.
 */
export function EstimateForm() {
  const [, navigate] = useLocation()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email'),
          address: data.get('address'),
          idealStart: data.get('ideal-start'),
          services: data.getAll('services'),
          details: data.get('details'),
          smsConsent: data.get('sms-consent') === 'yes',
          companyWebsite: data.get('company-website'),
        }),
      })

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error || 'Something went wrong on our end.')
      }

      form.reset()
      navigate('/thanks')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong on our end.')
    }
  }

  return (
    <form className="form" name="estimate" method="POST" onSubmit={onSubmit} noValidate={false}>
      <p className="hp" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="company-website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="field--row">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(802) 000-0000"
          />
        </div>
      </div>

      <div className="field--row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="field">
          <label htmlFor="start">Ideal start</label>
          <input id="start" name="ideal-start" type="date" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="address">Property address</label>
        <input
          id="address"
          name="address"
          required
          autoComplete="street-address"
          placeholder="Street, town, VT"
        />
      </div>

      <fieldset>
        <legend className="legend">What do you need? Check all that apply.</legend>
        <div className="checks">
          {services.map((s) => (
            <label key={s.slug} className="check">
              <input type="checkbox" name="services" value={s.name} />
              <span>{s.name}</span>
            </label>
          ))}
          <label className="check">
            <input type="checkbox" name="services" value="Something else" />
            <span>Something else</span>
          </label>
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="details">Tell us about the job</label>
        <textarea
          id="details"
          name="details"
          required
          placeholder="Rough size, current condition, anything you have already noticed — cracks, low spots, drainage, whatever is on your mind."
        />
      </div>

      <p className="consent">
        Got photos? Text them to{' '}
        <a href={company.phoneHref} style={{ color: 'var(--stripe)' }}>
          {company.phone}
        </a>
        . Easier than uploading, and it reaches the same place.
      </p>

      <label className="check">
        <input type="checkbox" name="sms-consent" value="yes" />
        <span className="consent">
          I consent to receive text messages from Veilleux Sealcoating about this request —
          quotes, scheduling, and job updates. Message and data rates may apply. Reply STOP to
          opt out.
        </span>
      </label>

      {status === 'error' && (
        <div className="form-error" role="alert">
          <p>{error}</p>
          <p>
            Reach us directly:{' '}
            <a href={company.phoneHref}>{company.phone}</a> or{' '}
            <a href={company.emailHref}>{company.email}</a>.
          </p>
        </div>
      )}

      <div style={{ marginTop: '0.5rem' }}>
        <Button type="submit" variant="primary" block large disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Estimate Request'}
        </Button>
      </div>

      <p className="consent" style={{ textAlign: 'center' }}>
        We usually reply within one business day. No mailing list, no sales sequence.
      </p>
    </form>
  )
}
