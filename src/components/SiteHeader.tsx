import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { company, services } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'
import { Button } from './Button'

const nav = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/process', label: 'Process' },
  { href: '/service-area', label: 'Service Area' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [location] = useLocation()
  const [open, setOpen] = useState(false)
  const solid = useScrolled(24)

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? location === '/' : location.startsWith(href)

  return (
    <>
      <header className="header" data-solid={solid || open}>
        <div className="shell header__inner">
          <Link href="/" className="brand" aria-label={`${company.name} — home`}>
            <img
              src="/brand/veilleux-logo-transparent.png"
              alt={`${company.legal} logo`}
              className="brand__logo"
              width="2400"
              height="1136"
            />
          </Link>

          <nav className="nav" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav__link"
                data-active={isActive(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <a href={company.phoneHref} className="header__phone">
              {company.phone}
            </a>
            <Button href="/estimate" variant="primary" arrow={false}>
              Free Estimate
            </Button>
            <button
              className="burger"
              data-open={open}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="drawer" id="mobile-menu">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="drawer__link"
              data-active={isActive(item.href)}
            >
              {item.label}
            </Link>
          ))}
          <div className="drawer__foot">
            <Button href={company.phoneHref} variant="ghost" block arrow={false}>
              Call {company.phone}
            </Button>
            <Button href="/estimate" variant="primary" block>
              Get a Free Estimate
            </Button>
            <p className="consent" style={{ marginTop: '1rem' }}>
              {services.length} services, one crew. {company.address}.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
