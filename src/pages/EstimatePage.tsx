import { PageHero } from '../components/PageHero'
import { EstimateForm } from '../components/EstimateForm'
import { Reveal } from '../components/Reveal'
import { PageMeta } from '../components/PageMeta'
import { company, process } from '../data/site'

export default function EstimatePage() {
  return (
    <>
      <PageMeta
        title="Free Estimate — Veilleux Sealcoating"
        description="Request a free written estimate for sealcoating, plowing, grounds maintenance, junk removal, or handyman work in Vermont."
      />
      <PageHero
        eyebrow="Free estimate"
        title={<>Tell us what<br />needs doing.</>}
        lede="Fill this out and you will get a written number, usually within a business day. If it is easier, just call."
        image="seal-newbuild"
      />

      <section className="section">
        <div className="shell">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <EstimateForm />
            </Reveal>

            <Reveal delay={120}>
              <div style={{ position: 'sticky', top: '110px' }}>
                <p className="eyebrow eyebrow--plain">Or reach us directly</p>
                <ul className="footer__list" style={{ marginBottom: '3rem' }}>
                  <li>
                    <a href={company.phoneHref} style={{ fontSize: '1.35rem', color: 'var(--chalk)', fontWeight: 600 }}>
                      {company.phone}
                    </a>
                  </li>
                  <li><a href={company.emailHref}>{company.email}</a></li>
                  <li><span>{company.address}</span></li>
                </ul>

                <p className="eyebrow eyebrow--plain">What happens next</p>
                <ol style={{ listStyle: 'none', margin: '1.5rem 0 0', padding: 0, display: 'grid', gap: '1.25rem' }}>
                  {[
                    'We read it and call or email you back, usually inside a business day.',
                    'For anything but the simplest job, we come out and walk the property with you.',
                    'You get a written number. Not a range, not a verbal.',
                    'If you want to go ahead, we put you on the schedule and tell you the week.',
                  ].map((step, i) => (
                    <li key={step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--display)', fontSize: '1.2rem', color: 'var(--stripe)', lineHeight: 1.2, flex: 'none' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ color: 'var(--gravel)', fontSize: '0.92rem', lineHeight: 1.6 }}>{step}</span>
                    </li>
                  ))}
                </ol>

                <p className="consent" style={{ marginTop: '2.5rem' }}>
                  Curious what we actually do on site? The {process.length}-step process is
                  written out in full on the Process page.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
