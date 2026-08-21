import { process } from '../data/site'
import { Reveal } from './Reveal'

export function ProcessGrid() {
  return (
    <div className="process">
      {process.map((p, i) => (
        <Reveal key={p.step} className="process__step" delay={i * 55}>
          <span className="process__n">{p.step}</span>
          <h3 className="process__name">{p.name}</h3>
          <p className="process__body">{p.body}</p>
        </Reveal>
      ))}
    </div>
  )
}
