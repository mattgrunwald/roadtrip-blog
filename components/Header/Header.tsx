import { ACCENT_TEXT_CLASS_HOVER } from '@/util/consts'
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'
import { AboutDropdown } from './AboutDropdown'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-gray-50 pt-4 dark:bg-gray-950">
      <div className="mx-auto flex items-center justify-between px-4 lg:px-8">
        <Link href="/" aria-label="Roadtrek Trip 2023">
          <b>Roadtrek Trip 2023</b>
        </Link>
        <div className="flex items-center justify-around">
          <nav className="ml-auto space-x-6 text-sm font-medium max-lg:mr-4 lg:mr-6">
            <Link
              href="/"
              className={ACCENT_TEXT_CLASS_HOVER}
              aria-label="Go to homepage"
            >
              Home
            </Link>
          </nav>
          <nav className="ml-auto space-x-6 text-sm font-medium max-lg:mr-4 lg:mr-6">
            <Link
              href="/pictures"
              className={ACCENT_TEXT_CLASS_HOVER}
              aria-label="See all pictures from the trip"
            >
              Pictures
            </Link>
          </nav>
          <span className="mr-6 text-sm font-medium max-lg:mr-4 lg:mr-6">
            <AboutDropdown name="About">
              <Link
                href="/about/van"
                className={ACCENT_TEXT_CLASS_HOVER}
                aria-label="Read more about the van"
              >
                The Van
              </Link>
              <Link
                href="/about/site"
                className={ACCENT_TEXT_CLASS_HOVER}
                aria-label="Read more about this site"
              >
                This Site
              </Link>
            </AboutDropdown>
          </span>
          <ModeToggle />
        </div>
      </div>
      <hr className="my-4 dark:border-gray-50/20 " />
    </header>
  )
}
