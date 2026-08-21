import type { ReactNode } from 'react'
import { Link } from 'wouter'
import { ArrowRight } from './Icons'

/** Two stacked arrows: the first leaves right, its twin arrives from the left. */
export function SwapArrow() {
  return (
    <span className="swap" aria-hidden="true">
      <ArrowRight />
      <ArrowRight />
    </span>
  )
}

type Variant = 'primary' | 'ghost'

interface Props {
  children: ReactNode
  variant?: Variant
  /** Internal route, external URL, or tel:/mailto: link. Omit for a <button>. */
  href?: string
  type?: 'button' | 'submit'
  block?: boolean
  large?: boolean
  arrow?: boolean
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  block = false,
  large = false,
  arrow = true,
  className = '',
  disabled = false,
  onClick,
}: Props) {
  const cls = [
    'btn',
    `btn--${variant}`,
    block && 'btn--block',
    large && 'btn--lg',
    disabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span>{children}</span>
      {arrow && <SwapArrow />}
    </>
  )

  // tel:, mailto:, and absolute URLs bypass the router
  const isExternal = href ? /^(https?:|tel:|mailto:)/.test(href) : false

  if (href && isExternal) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {inner}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  )
}
