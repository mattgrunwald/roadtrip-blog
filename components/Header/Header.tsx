import Link from 'next/link'
import { AboutDropdown } from './AboutDropdown'
import { ModeToggle } from '../ModeToggle'
import { ACCENT_TEXT_CLASS } from '@/util/consts'

export default function Header() {
  return (
    <header className="sticky top-0 pt-4 z-30 bg-slate-50 dark:bg-slate-950">
      <div className="flex items-center justify-between mx-auto px-4 lg:px-8">
        <Link href="/" aria-label="Go to homepage">
          <b>Roadtrek Trip 2023</b>
        </Link>
        <div className="flex items-center justify-around">
          <nav className="ml-auto max-lg:mr-4 lg:mr-6 text-sm font-medium space-x-6">
            <Link
              href="/"
              className={`hover:${ACCENT_TEXT_CLASS}`}
              aria-label="Go to homepage"
            >
              Home
            </Link>
          </nav>
          <nav className="ml-auto max-lg:mr-4 lg:mr-6 text-sm font-medium space-x-6">
            <Link
              href="/pictures"
              className={`hover:${ACCENT_TEXT_CLASS}`}
              aria-label="See all images from the trip"
            >
              Pictures
            </Link>
          </nav>
          <span className="max-lg:mr-4 lg:mr-6 mr-6 text-sm font-medium">
            <AboutDropdown name="About">
              <Link
                href="/about/van"
                className={`hover:${ACCENT_TEXT_CLASS}`}
                aria-label="Read more about the van"
              >
                The Van
              </Link>
              <Link
                href="/about/site"
                className={`hover:${ACCENT_TEXT_CLASS}`}
                aria-label="Read more about this site"
              >
                This Site
              </Link>
            </AboutDropdown>
          </span>
          <ModeToggle />
        </div>
      </div>
      <hr className="my-4 dark:border-slate-50/20 " />
    </header>
  )
}
