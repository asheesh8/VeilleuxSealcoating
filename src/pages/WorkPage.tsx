import { useEffect, useMemo, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { PageMeta } from '../components/PageMeta'
import { Button } from '../components/Button'
import { work, workCategories, type WorkCategory } from '../data/site'

const PAGE = 12

export default function WorkPage() {
  const [filter, setFilter] = useState<WorkCategory | 'all'>('all')
  const [limit, setLimit] = useState(PAGE)

  const matching = useMemo(
    () => (filter === 'all' ? work : work.filter((w) => w.category === filter)),
    [filter],
  )

  // a new filter should start at the top of its own set
  useEffect(() => setLimit(PAGE), [filter])

  const shown = matching.slice(0, limit)
  const remaining = matching.length - shown.length

  return (
    <>
      <PageMeta
        title="Work — Veilleux Sealcoating"
        description="Driveways, commercial lots, winter routes, grounds, carpentry, and hauling. Photographs from real Veilleux Sealcoating jobs across northern Vermont."
      />
      <PageHero
        eyebrow="The work"
        title={<>Forty-one jobs,<br />no stock photos.</>}
        lede="Every photograph on this site is a property we actually worked on. Nothing here was bought from a library or borrowed from a supplier's brochure."
        image="night-commercial-lot"
      />

      <section className="section section--tight">
        <div className="shell">
          <div className="filters">
            {workCategories.map((c) => {
              const count =
                c.id === 'all' ? work.length : work.filter((w) => w.category === c.id).length
              return (
                <button
                  key={c.id}
                  className="filter"
                  data-active={filter === c.id}
                  onClick={() => setFilter(c.id)}
                >
                  {c.label}
                  <span className="filter__count">{count}</span>
                </button>
              )
            })}
          </div>

          <div className="gallery">
            {shown.map((item, i) => (
              <Reveal key={item.slug} delay={Math.min(i % PAGE, 8) * 45}>
                <figure className="shot" style={{ margin: 0 }}>
                  <img
                    src={`/media/work/${item.slug}-900.webp`}
                    alt={item.caption}
                    loading="lazy"
                  />
                  <figcaption className="shot__cap">{item.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {remaining > 0 && (
            <div className="load-more">
              <Button variant="ghost" onClick={() => setLimit((n) => n + PAGE)} arrow={false}>
                Show {Math.min(remaining, PAGE)} more
              </Button>
              <span className="load-more__count">
                {shown.length} of {matching.length}
              </span>
            </div>
          )}

          {matching.length === 0 && <p className="center-note">Nothing in this category yet.</p>}
        </div>
      </section>

      <CtaBand
        eyebrow="Your property next"
        title="Want yours to look like this?"
        image="seal-colonial-tape"
      />
    </>
  )
}
