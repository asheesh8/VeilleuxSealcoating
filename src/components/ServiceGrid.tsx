import type { CSSProperties } from 'react'
import { Link } from 'wouter'
import { services } from '../data/site'
import { ArrowRight } from './Icons'

/** Service cards. The photograph lives on ::before and fades in on hover. */
export function ServiceGrid() {
  return (
    <div className="svc-grid">
      {services.map((s, i) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}`}
          className="svc"
          style={{ '--img': `url(/media/work/${s.image}-900.webp)` } as CSSProperties}
        >
          <span className="svc__index">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="svc__name">{s.name}</h3>
          <p className="svc__summary">{s.summary}</p>
          <span className="svc__foot">
            <span className="svc__season">{s.season}</span>
            <span className="svc__go"><ArrowRight /></span>
          </span>
        </Link>
      ))}
    </div>
  )
}
