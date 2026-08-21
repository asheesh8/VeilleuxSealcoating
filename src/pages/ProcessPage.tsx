import { PageHero } from '../components/PageHero'
import { ProcessGrid } from '../components/ProcessGrid'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { PageMeta } from '../components/PageMeta'
import { ArrowLink } from '../components/ArrowLink'

export default function ProcessPage() {
  return (
    <>
      <PageMeta
        title="Our Process — Veilleux Sealcoating"
        description="The six-step sealcoating process: clearing, crack filling, oil-spot priming, hand edging, and two coats of commercial-grade sealer."
      />
      <PageHero
        eyebrow="How we work"
        title={<>The part nobody<br />photographs.</>}
        lede="Sealcoating is not complicated. It is just sequential, and most of the sequence happens before the sealer comes off the truck. Here is the whole thing."
        image="edge-detail-lawn"
      />

      <section className="section">
        <div className="shell">
          <ProcessGrid />

          <Reveal className="after-grid">
            <ArrowLink href="/faq">Questions we get asked</ArrowLink>
            <ArrowLink href="/work">See the results</ArrowLink>
          </Reveal>
        </div>
      </section>

      <CtaBand image="seal-sweep-wide" />
    </>
  )
}
