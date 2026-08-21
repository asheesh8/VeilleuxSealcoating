import type { ReactNode } from 'react'
import { Link } from 'wouter'
import { SwapArrow } from './Button'

interface Props {
  href: string
  children: ReactNode
  className?: string
}

export function ArrowLink({ href, children, className = '' }: Props) {
  return (
    <Link href={href} className={`arrow-link ${className}`.trim()}>
      <span>{children}</span>
      <SwapArrow />
    </Link>
  )
}
