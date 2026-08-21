import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Not found — Veilleux Sealcoating" description="That page does not exist." />
      <section className="page-hero" style={{ minHeight: '70svh', display: 'grid', alignItems: 'center' }}>
        <div className="shell">
          <p className="eyebrow">404</p>
          <h1 className="display display--lg" style={{ maxWidth: '18ch' }}>
            This one's a dead end.
          </h1>
          <p className="lede" style={{ marginTop: '1.75rem' }}>
            The page you were after is not here. The driveway, however, is still worth sealing.
          </p>
          <div className="hero__actions">
            <Button href="/" variant="primary">Back to home</Button>
            <Button href="/services" variant="ghost">Browse services</Button>
          </div>
        </div>
      </section>
    </>
  )
}
