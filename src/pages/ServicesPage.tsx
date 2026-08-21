import { PageHero } from '../components/PageHero'
import { ServiceGrid } from '../components/ServiceGrid'
import { Seasons } from '../components/Seasons'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { PageMeta } from '../components/PageMeta'

export default function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Services — Veilleux Sealcoating"
        description="Sealcoating and pavement repair, snow plowing, commercial mowing, spring cleanup, junk removal, and handyman services across Vermont and upstate New York."
      />
      <PageHero
        eyebrow="Services"
        title={<>Everything a property<br />needs, all year.</>}
        lede="Six services under one name. Same crew, same standard, whether it is a 2,800 square foot driveway in July or a commercial lot at two in the morning in February."
        image="seal-tree-curve"
      />

      <section className="section section--tight">
        <div className="shell">
          <ServiceGrid />
        </div>
      </section>

      <section className="section section--slab">
        <div className="shell">
          <Reveal className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">By season</p>
              <h2 className="display display--md">When to book what.</h2>
            </div>
            <p className="lede" style={{ maxWidth: '34ch' }}>
              Sealcoating has a real weather window. Plowing has a real deadline. Booking early
              is not an upsell, it is the difference between getting on the schedule and not.
            </p>
          </Reveal>
          <Seasons />
        </div>
      </section>

      <CtaBand image="seal-newbuild" />
    </>
  )
}
