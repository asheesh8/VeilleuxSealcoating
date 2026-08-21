import { Hero } from '../components/Hero'
import { ServiceGrid } from '../components/ServiceGrid'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { ArrowLink } from '../components/ArrowLink'
import { PageMeta } from '../components/PageMeta'
import { Star } from '../components/Icons'
import { testimonials } from '../data/site'

const lead = testimonials[0]

/**
 * Deliberately short. Everything that used to live below the fold here — the
 * process, the gallery, the seasons, the map — has its own route now, and the
 * home page just points at them.
 */
export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Veilleux Sealcoating — Essex, Vermont"
        description="Sealcoating, crack filling, line striping, snow plowing, grounds maintenance, junk removal, and handyman services across northern Vermont and upstate New York."
      />

      <Hero />

      {/* ---------------------------------------------------------- statement */}
      <section className="statement">
        <div className="shell statement__inner">
          <Reveal>
            <p className="eyebrow">Why this matters</p>
            <h2 className="display display--md">
              A bad seal looks perfect<br />for about six weeks.
            </h2>
          </Reveal>
          <Reveal delay={120} className="prose">
            <p>
              Sealer is not paint. It has to bond to the asphalt underneath it, and it cannot
              bond through dirt, sand, oil, or a shoulder of grass that has crept two inches
              over the edge.
            </p>
            <p>
              <strong>
                We spend most of the day on the part you will never see, and about an hour on
                the part you will.
              </strong>
            </p>
            <ArrowLink href="/process">See the six-step process</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- services */}
      <section className="section">
        <div className="shell">
          <Reveal className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">What we do</p>
              <h2 className="display display--md">Six services.<br />One crew.</h2>
            </div>
            <p className="lede" style={{ maxWidth: '36ch' }}>
              Most clients start with a driveway and end up handing us the whole property. One
              number to call, one crew that already knows the site.
            </p>
          </Reveal>
          <ServiceGrid />

          <Reveal className="after-grid">
            <ArrowLink href="/work">See the work</ArrowLink>
            <ArrowLink href="/service-area">Check your town</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- proof */}
      <section className="section section--slab section--tight">
        <div className="shell shell--narrow">
          <Reveal className="proof">
            <span className="quote__stars" aria-label="Five out of five stars">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={17} />
              ))}
            </span>
            <blockquote className="proof__text">{lead.quote}</blockquote>
            <div className="proof__by">
              <span className="quote__name">{lead.name}</span>
              <span className="quote__detail">{lead.detail}</span>
            </div>
            <ArrowLink href="/about">Read more from clients</ArrowLink>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
