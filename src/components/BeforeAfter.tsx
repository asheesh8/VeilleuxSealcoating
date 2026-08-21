import { useRef, useState, type CSSProperties } from 'react'
import { Drag } from './Icons'

interface Props {
  /** Slugs in /media/work, without the size suffix. */
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
}

/**
 * Drag-to-compare slider.
 *
 * NOTE: this is deliberately not used anywhere on the live site yet — Veilleux's
 * existing photo library has no matched before/after pair of the same property,
 * and pairing two different driveways would be a false claim. The moment Matt
 * shoots one job from a fixed position before and after, drop the two slugs in
 * and place this on the Sealcoating page.
 *
 * Keyboard accessible via the range input, which sits invisibly over the frame.
 */
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: Props) {
  const [pos, setPos] = useState(50)
  const frame = useRef<HTMLDivElement>(null)

  const moveTo = (clientX: number) => {
    const box = frame.current?.getBoundingClientRect()
    if (!box) return
    const next = ((clientX - box.left) / box.width) * 100
    setPos(Math.max(0, Math.min(100, next)))
  }

  return (
    <div
      className="ba"
      ref={frame}
      style={{ '--pos': `${pos}%` } as CSSProperties}
      onPointerMove={(e) => {
        if (e.pressure > 0 || e.buttons === 1) moveTo(e.clientX)
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        moveTo(e.clientX)
      }}
    >
      <img src={`/media/work/${before}-1600.webp`} alt={beforeAlt} loading="lazy" />
      <img
        className="ba__after"
        src={`/media/work/${after}-1600.webp`}
        alt={afterAlt}
        loading="lazy"
      />

      <span className="ba__tag ba__tag--before">{beforeLabel}</span>
      <span className="ba__tag ba__tag--after">{afterLabel}</span>

      <span className="ba__handle" aria-hidden="true">
        <span className="ba__grip">
          <Drag />
        </span>
      </span>

      <input
        className="ba__range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Reveal slider: ${beforeLabel} versus ${afterLabel}`}
      />
    </div>
  )
}
