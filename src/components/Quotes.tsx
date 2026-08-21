import { testimonials } from '../data/site'
import { Star } from './Icons'

export function Quotes() {
  return (
    <div className="quotes">
      {testimonials.map((t) => (
        <figure key={t.name} className="quote">
          <span className="quote__stars" aria-label="Five out of five stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} />
            ))}
          </span>
          <blockquote className="quote__text">{t.quote}</blockquote>
          <figcaption className="quote__by">
            <span className="quote__name">{t.name}</span>
            <span className="quote__detail">{t.detail}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
