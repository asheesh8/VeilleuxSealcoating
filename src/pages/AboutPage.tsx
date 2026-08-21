import { PageHero } from '../components/PageHero'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { Quotes } from '../components/Quotes'
import { PageMeta } from '../components/PageMeta'
import { company, facts } from '../data/site'

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About — Veilleux Sealcoating"
        description={`${company.owner} founded ${company.legal} in ${company.address}. Sealcoating, pavement, winter, grounds, hauling, and handyman services.`}
      />
      <PageHero
        eyebrow="About"
        title={<>One name on<br />the truck.</>}
        lede={`${company.owner} started ${company.legal} in ${company.address}. He still walks most estimates himself.`}
        image="truck-residential"
      />

      <section className="section">
        <div className="shell">
          <div className="split">
            <Reveal className="prose">
              <h2 className="display display--sm" style={{ marginBottom: '2rem', maxWidth: '20ch' }}>
                Every job is a reflection of the pride I take in my work.
              </h2>
              <p>
                Hi, I'm Matthew Veilleux, owner of Veilleux Sealcoating LLC. For me, every job is
                more than just a task. I've built this business on precision, reliability, and
                quality — from the smallest driveway to the largest parking lot.
              </p>
              <p>
                What that means in practice is that I focus on the details that make the
                difference. The edging. The brushing. The crack filling that happens before a
                drop of sealer comes off the truck. Those are the things that decide whether a
                surface is smooth, durable, and still looks right two years from now.
              </p>
              <p>
                Customer satisfaction is the whole point. I believe in building lasting
                relationships through clear communication and dependable service, and in making
                sure every client feels heard. When you call, you get me — not a dispatcher, and
                not a subcontractor who has never seen your property.
              </p>
              <p>
                <strong>
                  When you choose Veilleux Sealcoating, you're choosing a company that cares
                  about the result and about the experience of getting there.
                </strong>
              </p>
            </Reveal>

            <Reveal delay={110} className="frame frame--tall">
              <img
                src="/media/work/seal-drive-approach-1600.webp"
                alt="A completed Veilleux Sealcoating driveway approaching a Vermont home"
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--slab">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">The short version</p>
          </Reveal>
          <dl className="hero__meta" style={{ marginTop: '2rem', borderTop: 0, paddingTop: 0 }}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">In their words</p>
              <h2 className="display display--md">Clients on the difference.</h2>
            </div>
          </Reveal>
          <Quotes />
        </div>
      </section>

      <CtaBand image="seal-wooded-curve" />
    </>
  )
}
