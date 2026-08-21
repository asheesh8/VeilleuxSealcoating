import { PageHero } from '../components/PageHero'
import { PageMeta } from '../components/PageMeta'
import { company } from '../data/site'

export default function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="Privacy — Veilleux Sealcoating"
        description="How Veilleux Sealcoating LLC handles the information you send through this website."
      />
      <PageHero eyebrow="Legal" title="Privacy" lede="Short version: we use what you send us to quote and schedule your job. That is all." />

      <section className="section">
        <div className="shell shell--narrow prose">
          <h2 className="display display--sm" style={{ margin: '0 0 1rem' }}>What we collect</h2>
          <p>
            When you submit the estimate or contact form we collect your name, phone number,
            email address, property address, the services you selected, your description of the
            job, and any photo you choose to attach.
          </p>

          <h2 className="display display--sm" style={{ margin: '2.5rem 0 1rem' }}>How we use it</h2>
          <p>
            To prepare your estimate, to contact you about it, and to schedule and carry out the
            work. We do not sell it, rent it, or trade it. We do not add you to a marketing list
            you did not ask to join.
          </p>

          <h2 className="display display--sm" style={{ margin: '2.5rem 0 1rem' }}>Text messages</h2>
          <p>
            If you check the SMS consent box, we may text you about your quote, your appointment,
            or your job. Message and data rates may apply. Reply STOP to opt out at any time, or
            HELP for assistance. Consent is not a condition of purchase.
          </p>

          <h2 className="display display--sm" style={{ margin: '2.5rem 0 1rem' }}>Photographs of completed work</h2>
          <p>
            We photograph finished jobs and may use those photographs on this site or on social
            media. Images show the property, never identifying details like house numbers where
            we can avoid it. If you would rather we did not photograph your property, tell us —
            that is a perfectly normal request and we will honor it.
          </p>

          <h2 className="display display--sm" style={{ margin: '2.5rem 0 1rem' }}>Retention and access</h2>
          <p>
            We keep job records for as long as we need them for business and tax purposes. If you
            want a copy of what we hold about you, or you want it deleted, email{' '}
            <a href={company.emailHref} style={{ color: 'var(--stripe)' }}>{company.email}</a>{' '}
            and we will take care of it.
          </p>

          <h2 className="display display--sm" style={{ margin: '2.5rem 0 1rem' }}>Contact</h2>
          <p>
            {company.legal} · {company.address} · {company.phone} ·{' '}
            <a href={company.emailHref} style={{ color: 'var(--stripe)' }}>{company.email}</a>
          </p>
        </div>
      </section>
    </>
  )
}
