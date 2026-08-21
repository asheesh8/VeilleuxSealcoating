import type { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  lede?: string
  image?: string
  children?: ReactNode
}

export function PageHero({ eyebrow, title, lede, image, children }: Props) {
  return (
    <section className="page-hero">
      {image && (
        <div className="page-hero__media">
          <img src={`/media/work/${image}-1600.webp`} alt="" aria-hidden="true" loading="eager" />
        </div>
      )}
      <div className="shell page-hero__body">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display display--lg">{title}</h1>
        {lede && <p className="lede page-hero__lede">{lede}</p>}
        {children}
      </div>
    </section>
  )
}
