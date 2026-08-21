import { Link, useParams } from 'wouter'
import { PageHero } from '../components/PageHero'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { ArrowLink } from '../components/ArrowLink'
import { PageMeta } from '../components/PageMeta'
import NotFoundPage from './NotFoundPage'
import { serviceBySlug, services, work } from '../data/site'

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = serviceBySlug(slug)

  if (!service) return <NotFoundPage />

  const others = services.filter((s) => s.slug !== service.slug)
  const related = work
    .filter((w) => {
      if (service.slug === 'sealcoating') return w.category === 'sealcoating'
      if (service.slug === 'winter') return w.category === 'winter'
      if (service.slug === 'grounds') return w.category === 'grounds' || w.category === 'commercial'
      if (service.slug === 'junk-removal') return w.category === 'hauling'
      if (service.slug === 'handyman') return w.category === 'handyman'
      return w.category === 'grounds'
    })
    .slice(0, 3)

  return (
    <>
      <PageMeta
        title={`${service.name} — Veilleux Sealcoating`}
        description={service.summary}
      />
      <PageHero
        eyebrow={service.season}
        title={service.name}
        lede={service.summary}
        image={service.image}
      />

      <section className="section">
        <div className="shell">
          <div className="split">
            <Reveal>
              <h2 className="display display--sm" style={{ marginBottom: '2rem', maxWidth: '18ch' }}>
                {service.statement}
              </h2>
              <div className="prose">
                {service.body.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <ul className="spec">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={110} className="frame frame--tall">
              <img
                src={`/media/work/${service.detailImage}-1600.webp`}
                alt={`${service.name} detail`}
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--slab">
          <div className="shell">
            <Reveal className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">From the field</p>
                <h2 className="display display--md">{service.short} work.</h2>
              </div>
              <ArrowLink href="/work">All work</ArrowLink>
            </Reveal>
            <div className="gallery">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 55}>
                  <Link href="/work" className="shot">
                    <img src={`/media/work/${item.slug}-900.webp`} alt={item.caption} loading="lazy" />
                    <span className="shot__cap">{item.caption}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--tight">
        <div className="shell">
          <Reveal>
            <p className="eyebrow eyebrow--plain">Also available</p>
            <ul className="other-services">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow={service.short}
        title="Want a number on this?"
        body="Send the address and a couple of details. We will get back to you with a written estimate, usually within a day."
        image={service.image}
      />
    </>
  )
}
