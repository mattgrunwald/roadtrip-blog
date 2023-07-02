import Link from 'next/link'
import { AboutDropdown } from './AboutDropdown'
import { ModeToggle } from '../ModeToggle'
import { ACCENT_TEXT_CLASS } from '@/util/consts'

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between">
        <b>Roadtrek Trip 2023</b>
        <div className="flex items-center justify-around">
          <nav className="ml-auto max-md:mr-4 md:mr-6 text-sm font-medium space-x-6 pr">
            <Link href="/" className={`hover:${ACCENT_TEXT_CLASS}`}>
              Home
            </Link>
          </nav>
          <span className="max-md:mr-4 md:mr-6 mr-6 text-sm font-medium">
            <AboutDropdown name="About">
              <Link href="/about/van" className={`hover:${ACCENT_TEXT_CLASS}`}>
                The Van
              </Link>
              <Link href="/about/site" className={`hover:${ACCENT_TEXT_CLASS}`}>
                This Site
              </Link>
            </AboutDropdown>
          </span>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
