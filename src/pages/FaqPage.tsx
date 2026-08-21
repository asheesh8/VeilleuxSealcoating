import { PageHero } from '../components/PageHero'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { PageMeta } from '../components/PageMeta'
import { ArrowLink } from '../components/ArrowLink'
import { faqs } from '../data/faq'

export default function FaqPage() {
  return (
    <>
      <PageMeta
        title="Questions — Veilleux Sealcoating"
        description="Straight answers about sealcoating: how often to seal, cure times, weather windows, crack filling, tracking, and commercial contracts."
      />
      <PageHero
        eyebrow="Straight answers"
        title={<>Questions we<br />get asked.</>}
        lede="No hedging and no upsell built into the answer. If sealing is the wrong call for your driveway, we would rather tell you now."
        image="edge-detail-drive"
      />

      <section className="section">
        <div className="shell shell--narrow">
          <dl className="faq">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={Math.min(i, 6) * 45}>
                <dt>{f.q}</dt>
                <dd>
                  {f.a.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal className="after-grid">
            <ArrowLink href="/process">How the work actually goes</ArrowLink>
            <ArrowLink href="/estimate">Get a written number</ArrowLink>
          </Reveal>
        </div>
      </section>

      <CtaBand image="seal-sweep-wide" />
    </>
  )
}
