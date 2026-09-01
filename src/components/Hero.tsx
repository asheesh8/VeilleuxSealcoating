import { useState } from 'react'
import { Button } from './Button'
import { company } from '../data/site'
import { useReducedMotion } from '../hooks/useReducedMotion'

const POSTER = '/media/hero/veilleux-hero-poster.webp'
const FILM = '/media/hero/veilleux-hero.mp4'

/**
 * Full-bleed opening. Plays the hero film when one is present and motion is
 * welcome; otherwise holds on the poster frame.
 */
export function Hero({ hasFilm = false }: { hasFilm?: boolean }) {
  const reduced = useReducedMotion()
  const [ended, setEnded] = useState(false)
  const showFilm = hasFilm && !reduced
  const showEndCard = !showFilm || ended

  return (
    <section className="hero" data-ended={showEndCard}>
      <h1 className="visually-hidden">
        {company.name} — {company.tagline}
      </h1>

      <div className="hero__media">
        {showFilm ? (
          <video
            autoPlay
            muted
            playsInline
            poster={POSTER}
            preload="metadata"
            aria-hidden="true"
            onPlay={() => setEnded(false)}
            onEnded={() => setEnded(true)}
            onError={() => setEnded(true)}
          >
            <source src={FILM} type="video/mp4" />
          </video>
        ) : (
          <img
            src={POSTER}
            alt="Aerial view of a freshly sealcoated school parking lot"
            width="2560"
            height="1440"
            fetchPriority="high"
          />
        )}
        <div className="hero__scrim" />
      </div>

      {showEndCard && (
        <div className="shell hero__endcard">
          <div className="hero__end-actions">
            <Button href="/work" variant="ghost" arrow={false}>
              View Our Work
            </Button>
            <Button href="/estimate" variant="primary" arrow={false}>
              Get an Estimate
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
