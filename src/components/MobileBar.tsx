import { Link } from 'wouter'
import { company } from '../data/site'

/** Persistent call / estimate actions on small screens. */
export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a href={company.phoneHref}>Call</a>
      <Link href="/estimate">Free Estimate</Link>
    </div>
  )
}
