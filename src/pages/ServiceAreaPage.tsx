import { useState } from 'react'
import { PageHero } from '../components/PageHero'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { PageMeta } from '../components/PageMeta'
import { TerritoryMap } from '../components/TerritoryMap'
import { counties, towns, type County } from '../data/territory'
import { company } from '../data/site'

export default function ServiceAreaPage() {
  const [county, setCounty] = useState<County | null>(null)
  const [town, setTown] = useState<string | null>(null)

  const shown = county ? counties.filter((c) => c === county) : counties

  return (
    <>
      <PageMeta
        title="Service Area — Veilleux Sealcoating"
        description="Serving Chittenden, Franklin, Grand Isle, Lamoille, Washington, and Addison counties from Essex, Vermont, with commercial winter routes into upstate New York."
      />
      <PageHero
        eyebrow="Service area"
        title={<>All over northern<br />Vermont.</>}
        lede="Essex is where the trucks start the day, not the edge of the map. If you are anywhere in the northern half of the state, you are almost certainly on the route."
        image="seal-wooded-curve"
      />

      <section className="section">
        <div className="shell">
          <div className="area">
            <Reveal className="territory-panel">
              <TerritoryMap
                activeCounty={county}
                hoveredTown={town}
                onHoverTown={setTown}
              />
            </Reveal>

            <Reveal delay={100}>
              <p className="eyebrow">Six counties</p>
              <h2 className="display display--md" style={{ marginBottom: '1.5rem' }}>
                Find your town.
              </h2>
              <p className="lede" style={{ marginBottom: '2rem' }}>
                Hover a town to place it on the map. Not listed? Ask anyway — commercial work
                travels further than residential, and the winter routes run into upstate
                New York.
              </p>

              <div className="county-filters">
                <button
                  className="filter"
                  data-active={county === null}
                  onClick={() => setCounty(null)}
                >
                  All counties
                </button>
                {counties.map((c) => (
                  <button
                    key={c}
                    className="filter"
                    data-active={county === c}
                    onClick={() => setCounty(county === c ? null : c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="town-index">
                {shown.map((c) => (
                  <div key={c} className="town-group">
                    <h3 className="town-group__name">{c} County</h3>
                    <ul>
                      {towns
                        .filter((t) => t.county === c)
                        .map((t) => (
                          <li
                            key={t.name}
                            data-on={town === t.name}
                            onMouseEnter={() => setTown(t.name)}
                            onMouseLeave={() => setTown(null)}
                          >
                            {t.name}
                            {t.base && ' ★'}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--slab section--tight">
        <div className="shell">
          <div className="split">
            <Reveal>
              <p className="eyebrow">Beyond the line</p>
              <h2 className="display display--sm" style={{ marginBottom: '1.25rem' }}>
                Commercial travels further.
              </h2>
              <p className="lede" style={{ fontSize: '1rem' }}>
                Residential sealcoating stays close to home because the crew has to come back
                to check the cure. Commercial pavement, plowing, mowing, and hauling all run a
                wider radius — including winter routes into {company.territory.split('&')[1].trim()}.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <p className="eyebrow">Not sure?</p>
              <h2 className="display display--sm" style={{ marginBottom: '1.25rem' }}>
                One call settles it.
              </h2>
              <p className="lede" style={{ fontSize: '1rem' }}>
                Send the address with your estimate request, or call{' '}
                <a href={company.phoneHref} style={{ color: 'var(--stripe)' }}>
                  {company.phone}
                </a>
                . We will tell you straight away whether we can get to you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Check your address"
        title="Tell us where you are."
        body="Send the address with your request and we will confirm whether you are on the route."
        image="plow-truck-night"
      />
    </>
  )
}
