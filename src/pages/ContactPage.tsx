import { PageHero } from '../components/PageHero'
import { EstimateForm } from '../components/EstimateForm'
import { Reveal } from '../components/Reveal'
import { PageMeta } from '../components/PageMeta'
import { company, serviceArea } from '../data/site'

export default function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact — Veilleux Sealcoating"
        description={`Call ${company.phone} or email ${company.email}. Veilleux Sealcoating LLC, ${company.address}.`}
      />
      <PageHero
        eyebrow="Contact"
        title={<>Get in touch.</>}
        lede="Questions, scheduling, or a job you want a number on. However you want to reach us."
        image="seal-gray-house"
      />

      <section className="section">
        <div className="shell">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <p className="eyebrow">Direct</p>
              <ul className="footer__list" style={{ gap: '1.5rem' }}>
                <li>
                  <a href={company.phoneHref} className="display display--sm" style={{ color: 'var(--chalk)' }}>
                    {company.phone}
                  </a>
                </li>
                <li>
                  <a href={company.emailHref} style={{ fontSize: '1.05rem' }}>{company.email}</a>
                </li>
                <li><span style={{ fontSize: '1.05rem' }}>{company.address}</span></li>
              </ul>

              <p className="eyebrow eyebrow--plain" style={{ marginTop: '3rem' }}>Social</p>
              <ul className="footer__list">
                <li><a href={company.facebook} target="_blank" rel="noreferrer noopener">Facebook</a></li>
                <li><a href={company.instagram} target="_blank" rel="noreferrer noopener">Instagram</a></li>
              </ul>

              <p className="eyebrow eyebrow--plain" style={{ marginTop: '3rem' }}>Service area</p>
              <p className="lede" style={{ marginTop: '1.25rem', fontSize: '1rem' }}>
                {serviceArea.extended}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p className="eyebrow">Send a message</p>
              <div style={{ marginTop: '1.75rem' }}>
                <EstimateForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
