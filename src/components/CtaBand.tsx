import { Button } from './Button'
import { company } from '../data/site'

interface Props {
  eyebrow?: string
  title?: string
  body?: string
  image?: string
}

export function CtaBand({
  eyebrow = 'Free estimate',
  title = 'Tell us what needs doing.',
  body = 'Send the details and we will get you a written number, usually inside a day. No pressure, no subscription to a sales sequence.',
  image = 'night-garage-glow',
}: Props) {
  return (
    <section className="cta">
      <div className="cta__media">
        <img src={`/media/work/${image}-1600.webp`} alt="" aria-hidden="true" loading="lazy" />
      </div>
      <div className="shell cta__inner">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display display--md">{title}</h2>
          <p className="lede" style={{ marginTop: '1.5rem' }}>{body}</p>
        </div>
        <div className="hero__actions" style={{ marginTop: 0 }}>
          <Button href="/estimate" variant="primary" large>Get a Free Estimate</Button>
          <Button href={company.phoneHref} variant="ghost" large arrow={false}>Call {company.phone}</Button>
        </div>
      </div>
    </section>
  )
}
