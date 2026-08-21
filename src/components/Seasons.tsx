import { Link } from 'wouter'
import { seasons } from '../data/site'

export function Seasons() {
  return (
    <div className="seasons">
      {seasons.map((s) => (
        <Link key={s.name} href={`/services/${s.slug}`} className="season">
          <span className="season__head">
            <span className="season__name">{s.name}</span>
            <span className="season__months">{s.months}</span>
          </span>
          <span className="season__lede">{s.lede}</span>
          <ul className="season__list">
            {s.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  )
}
