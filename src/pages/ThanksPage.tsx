import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'
import { company } from '../data/site'

export default function ThanksPage() {
  return (
    <>
      <PageMeta title="Thank you — Veilleux Sealcoating" description="Your request has been received." />
      <section className="page-hero" style={{ minHeight: '70svh', display: 'grid', alignItems: 'center' }}>
        <div className="shell">
          <p className="eyebrow">Received</p>
          <h1 className="display display--lg" style={{ maxWidth: '16ch' }}>
            Got it. We'll be in touch.
          </h1>
          <p className="lede" style={{ marginTop: '1.75rem' }}>
            Your request is in. We usually reply within one business day. If it is urgent —
            a storm, a lot that has to open tomorrow — call {company.phone} directly.
          </p>
          <div className="hero__actions">
            <Button href="/" variant="primary">Back to home</Button>
            <Button href="/work" variant="ghost">See the work</Button>
          </div>
        </div>
      </section>
    </>
  )
}
