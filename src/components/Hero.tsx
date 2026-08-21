import { Button } from './Button'
import { company, facts } from '../data/site'
import { useReducedMotion } from '../hooks/useReducedMotion'

const POSTER = '/media/hero/veilleux-hero-poster.webp'
const FILM = '/media/hero/veilleux-hero.mp4'

/**
 * Full-bleed opening. Plays the hero film when one is present and motion is
 * welcome; otherwise holds on the poster frame.
 */
export function Hero({ hasFilm = false }: { hasFilm?: boolean }) {
  const reduced = useReducedMotion()
  const showFilm = hasFilm && !reduced

  return (
    <section className="hero">
      <div className="hero__media">
        {showFilm ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={POSTER}
            preload="metadata"
            aria-hidden="true"
          >
            <source src={FILM} type="video/mp4" />
          </video>
        ) : (
          <img
            src={POSTER}
            alt="A freshly sealcoated driveway at night, the cured surface mirroring the garage lights"
            width="2560"
            height="1920"
            fetchPriority="high"
          />
        )}
        <div className="hero__scrim" />
      </div>

      <div className="shell hero__body">
        <p className="eyebrow">Sealcoating &amp; property services · {company.address}</p>

        <h1 className="display display--xl hero__title">
          Anyone can<br />spray it <em>black.</em>
        </h1>

        <p className="hero__lede">
          Sealcoat is the last ten percent of the job. We do the ninety percent first —
          the blowing, the edging, the wire-brushing, the crack filling — because that
          is what decides whether your driveway still looks like this next spring.
        </p>

        <div className="hero__actions">
          <Button href="/estimate" variant="primary" large>
            Get a Free Estimate
          </Button>
          <Button href="/process" variant="ghost" large>
            See how we do it
          </Button>
        </div>

        <dl className="hero__meta">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <span className="hero__scroll" aria-hidden="true">Scroll</span>
    </section>
  )
}
