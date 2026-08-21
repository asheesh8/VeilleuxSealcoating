import { useId, useState } from 'react'
import {
  CHAMPLAIN,
  MAP_H,
  MAP_W,
  VERMONT,
  base,
  project,
  towns,
  type County,
} from '../data/territory'
import { peaks, trees } from '../data/terrain'

const path = (pts: [number, number][]) =>
  pts
    .map(([lat, lon], i) => {
      const [x, y] = project(lat, lon)
      return `${i === 0 ? 'M' : 'L'}${x},${y}`
    })
    .join(' ') + ' Z'

const VT_PATH = path(VERMONT)
const LAKE_PATH = path(CHAMPLAIN)

const [BX, BY] = project(base.lat, base.lon)

/** A conifer: stacked boughs on a short trunk. */
function Fir({ x, y, sc }: { x: number; y: number; sc: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${sc})`} className="tree tree--fir">
      <path className="tree__trunk" d="M-0.5,0 h1 v2 h-1 Z" />
      <path className="tree__body" d="M0,-9 L3.1,-3.4 L1.5,-3.4 L3.9,0.2 L-3.9,0.2 L-1.5,-3.4 L-3.1,-3.4 Z" />
      <path className="tree__light" d="M0,-9 L3.1,-3.4 L1.5,-3.4 L3.9,0.2 L0,0.2 Z" />
    </g>
  )
}

/** A sugar maple: round canopy, short trunk. Tone drives autumn colour. */
function Maple({ x, y, sc, tone }: { x: number; y: number; sc: number; tone: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${sc})`} className="tree tree--maple" data-tone={tone}>
      <path className="tree__trunk" d="M-0.55,0 h1.1 v3.4 h-1.1 Z" />
      <path
        className="tree__body"
        d="M0,-8 C2,-8.6 4.2,-7 4.2,-4.6 C4.2,-2.2 2.4,-0.6 0,-0.6 C-2.4,-0.6 -4.2,-2.2 -4.2,-4.6 C-4.2,-7 -2,-8.6 0,-8 Z"
      />
      <path
        className="tree__light"
        d="M0,-8 C2,-8.6 4.2,-7 4.2,-4.6 C4.2,-3 3.4,-1.7 2.2,-1 C3.1,-3.4 2.1,-6.3 0,-8 Z"
      />
    </g>
  )
}

/** A summit: shaded rock face, snowcap on the high ones. */
function Peak({ x, y, s, on }: { x: number; y: number; s: number; on?: boolean }) {
  const w = 4.5 + s * 7.5
  const h = 4 + s * 10.5
  const snow = s > 0.7
  return (
    <g transform={`translate(${x} ${y})`} className="peak" data-on={on || undefined}>
      <path className="peak__dark" d={`M0,${-h} L${w},3 L${-w},3 Z`} />
      <path className="peak__light" d={`M0,${-h} L${w},3 L0,3 Z`} />
      {snow && (
        <path
          className="peak__snow"
          d={`M0,${-h} L${w * 0.36},${-h * 0.42} L${w * 0.17},${-h * 0.5} L0,${-h * 0.3}
             L${-w * 0.19},${-h * 0.5} L${-w * 0.36},${-h * 0.42} Z`}
        />
      )}
    </g>
  )
}

interface Props {
  activeCounty?: County | null
  onHoverTown?: (name: string | null) => void
  hoveredTown?: string | null
}

/**
 * Northern Vermont drawn the way it actually looks: the Green Mountain spine
 * running the length of the state, sugar maples turning in the valleys, and
 * Lake Champlain along the west. Every town on the route is marked; Essex is
 * the yard, not the boundary.
 */
export function TerritoryMap({ activeCounty = null, onHoverTown, hoveredTown = null }: Props) {
  const raw = useId()
  const uid = raw.replace(/:/g, '')
  const [local, setLocal] = useState<string | null>(null)
  const activeName = hoveredTown ?? local
  const active = towns.find((t) => t.name === activeName) ?? null

  const setHover = (name: string | null) => {
    setLocal(name)
    onHoverTown?.(name)
  }

  return (
    <svg
      className="territory"
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      role="img"
      aria-label="Illustrated map of Vermont showing the Green Mountains and the towns Veilleux Sealcoating serves across the northern counties"
    >
      <defs>
        {/* the land itself, warmer through the valleys */}
        <linearGradient id={`${uid}-land`} x1="0" y1="0" x2="0.55" y2="1">
          <stop offset="0" stopColor="#0C1B14" />
          <stop offset="0.45" stopColor="#0F2319" />
          <stop offset="1" stopColor="#091510" />
        </linearGradient>

        <linearGradient id={`${uid}-lake`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#0A1C27" />
          <stop offset="1" stopColor="#123449" />
        </linearGradient>

        {/* service coverage, centred on the yard */}
        <radialGradient
          id={`${uid}-wash`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${BX} ${BY}) scale(205)`}
        >
          <stop offset="0" stopColor="#FFE6A0" stopOpacity="0.11" />
          <stop offset="0.55" stopColor="#FFE6A0" stopOpacity="0.05" />
          <stop offset="1" stopColor="#FFE6A0" stopOpacity="0" />
        </radialGradient>

        <clipPath id={`${uid}-clip`}>
          <path d={VT_PATH} />
        </clipPath>
      </defs>

      {/* ---------------------------------------------------------- the land */}
      <path d={VT_PATH} fill={`url(#${uid}-land)`} />

      <g clipPath={`url(#${uid}-clip)`}>
        <rect width={MAP_W} height={MAP_H} fill={`url(#${uid}-wash)`} />

        {/* the working radius, as a surveyed boundary rather than a colour wash */}
        <circle className="territory__radius" cx={BX} cy={BY} r="152" />

        {/* one depth-sorted pass, so a nearer ridge occludes the forest behind it */}
        <g className="territory__terrain">
          {[
            ...peaks.map((p) => ({ y: p.y, node: <Peak key={`p-${p.name}`} x={p.x} y={p.y} s={p.s} /> })),
            ...trees.map((t, i) => ({
              y: t.y,
              node:
                t.k === 'fir' ? (
                  <Fir key={`t-${i}`} x={t.x} y={t.y} sc={t.sc} />
                ) : (
                  <Maple key={`t-${i}`} x={t.x} y={t.y} sc={t.sc} tone={t.t} />
                ),
            })),
          ]
            .sort((a, b) => a.y - b.y)
            .map((d) => d.node)}
        </g>
      </g>

      {/* ---------------------------------------------------------- the lake */}
      <path className="territory__lake" d={LAKE_PATH} fill={`url(#${uid}-lake)`} />

      {/* ------------------------------------------------------- the outline */}
      <path className="territory__border" d={VT_PATH} />

      {/* place names, set the way a printed map would set them */}
      <g className="territory__places" aria-hidden="true">
        <text className="territory__range" transform="translate(111 292) rotate(-79)">
          GREEN MOUNTAINS
        </text>
        <text className="territory__water" transform="translate(21 200) rotate(-85)">
          LAKE CHAMPLAIN
        </text>
      </g>

      {/* ----------------------------------------------------------- towns */}
      {towns.map((t) => {
        const [x, y] = project(t.lat, t.lon)
        const dimmed = activeCounty ? t.county !== activeCounty : false
        return (
          <g
            key={t.name}
            className="territory__town"
            data-base={t.base || undefined}
            data-dim={dimmed || undefined}
            data-on={activeName === t.name || undefined}
            onMouseEnter={() => setHover(t.name)}
            onMouseLeave={() => setHover(null)}
          >
            {t.base && <circle className="territory__halo" cx={x} cy={y} r="13" />}
            <circle className="territory__pin" cx={x} cy={y} r={t.base ? 6 : 4.2} />
            <circle className="territory__dot" cx={x} cy={y} r={t.base ? 3.2 : 2.3} />
            <circle className="territory__hit" cx={x} cy={y} r="7.5" />
          </g>
        )
      })}

      {/* callout for the active town, drawn last so nothing covers it */}
      {active &&
        (() => {
          const [x, y] = project(active.lat, active.lon)
          const flip = x > MAP_W - 86
          const dir = flip ? -1 : 1
          return (
            <g className="territory__callout" aria-hidden="true">
              <circle className="territory__callout-ring" cx={x} cy={y} r="10" />
              <line x1={x + dir * 10} y1={y} x2={x + dir * 26} y2={y} />
              <text x={x + dir * 31} y={y + 1} textAnchor={flip ? 'end' : 'start'}>
                {active.name}
              </text>
            </g>
          )
        })()}

      {/* ---------------------------------------------------------- legend */}
      <g className="territory__legend" aria-hidden="true">
        <circle cx="60" cy="398" r="5.4" className="territory__legend-pin" />
        <circle cx="60" cy="398" r="3" className="territory__legend-core" />
        <text x="75" y="398">ESSEX — THE YARD</text>

        <circle cx="60" cy="418" r="3.9" className="territory__legend-pin" />
        <circle cx="60" cy="418" r="1.9" className="territory__legend-core" />
        <text x="75" y="418">TOWNS ON THE ROUTE</text>

        <line x1="54" y1="442" x2="152" y2="442" className="territory__legend-rule" />
        <text x="54" y="458" className="territory__legend-note">WINTER ROUTES CONTINUE</text>
        <text x="54" y="470" className="territory__legend-note">INTO UPSTATE NEW YORK</text>
      </g>
    </svg>
  )
}
