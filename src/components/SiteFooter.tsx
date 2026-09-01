import { Link } from 'wouter'
import { company, services } from '../data/site'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div className="footer__brand">
            <img
              src="/brand/veilleux-original-logo.png"
              alt={`${company.legal} logo`}
              className="footer__lockup"
              width="2400"
              height="1136"
            />
            <p className="footer__blurb">
              Sealcoating, pavement repair, winter plowing, grounds, hauling, and handyman work.
              Based in {company.address}, working across {company.territory}.
            </p>
          </div>

          <div>
            <h2 className="footer__h">Services</h2>
            <ul className="footer__list">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.short}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__h">Company</h2>
            <ul className="footer__list">
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/process">Process</Link></li>
              <li><Link href="/faq">Questions</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/service-area">Service Area</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/estimate">Free Estimate</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer__h">Get in touch</h2>
            <ul className="footer__list">
              <li><a href={company.phoneHref}>{company.phone}</a></li>
              <li><a href={company.emailHref}>{company.email}</a></li>
              <li><span>{company.address}</span></li>
              <li>
                <a href={company.facebook} target="_blank" rel="noreferrer noopener">Facebook</a>
              </li>
              <li>
                <a href={company.instagram} target="_blank" rel="noreferrer noopener">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          <span>© {year} {company.legal}. All rights reserved.</span>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}
