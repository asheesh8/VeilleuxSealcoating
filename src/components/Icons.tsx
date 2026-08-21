export function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

export function Star({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0l2.06 5.1L15.5 5.6l-4.1 3.63 1.24 5.37L8 11.8 3.36 14.6l1.24-5.37L.5 5.6l5.44-.5z" />
    </svg>
  )
}

export function Drag({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 5L3 10l4 5M13 5l4 5-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}

/** The brand mark: split chevron, ink limb + striping-yellow limb. */
export function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true" className="brand__mark">
      <path d="M8,12 L32,12 L50,64 L50,90 L42,90 Z" fill="currentColor" />
      <path d="M68,12 L92,12 L58,90 L50,90 L50,64 Z" fill="#F2C511" />
    </svg>
  )
}
