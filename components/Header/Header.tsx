import Link from 'next/link'
import { AboutDropdown } from './AboutDropdown'
import { ModeToggle } from '../ModeToggle'
import { ACCENT_TEXT_CLASS_HOVER } from '@/util/consts'
import { Hamburger } from './Hamburger'

export default function Header() {
  const HomeLink = (
    <Link
      href="/"
      className={ACCENT_TEXT_CLASS_HOVER}
      aria-label="Go to homepage"
    >
      Home
    </Link>
  )

  const PicsLink = (
    <Link
      href="/pictures"
      className={ACCENT_TEXT_CLASS_HOVER}
      aria-label="See all pictures from the trip"
    >
      Pictures
    </Link>
  )

  const VanLink = (
    <Link
      href="/about/van"
      className={ACCENT_TEXT_CLASS_HOVER}
      aria-label="Read more about the van"
    >
      The Van
    </Link>
  )

  const SiteLink = (
    <Link
      href="/about/site"
      className={ACCENT_TEXT_CLASS_HOVER}
      aria-label="Read more about this site"
    >
      This Site
    </Link>
  )

  return (
    <header className="sticky top-0 pt-4 z-30 bg-slate-50 dark:bg-slate-950">
      <div className="flex items-center justify-between mx-auto px-4 lg:px-8">
        <Link href="/" aria-label="Roadtrek Trip 2023">
          <b className="max-md:text-2xl">Roadtrek Trip 2023</b>
        </Link>
        <div className="flex items-center justify-around max-md:hidden">
          <nav className="ml-auto max-lg:mr-4 lg:mr-6 text-sm font-medium space-x-6">
            {HomeLink}
          </nav>
          <nav className="ml-auto max-lg:mr-4 lg:mr-6 text-sm font-medium space-x-6">
            {PicsLink}
          </nav>
          <span className="max-lg:mr-4 lg:mr-6 mr-6 text-sm font-medium">
            <AboutDropdown name="About">
              {VanLink}
              {SiteLink}
            </AboutDropdown>
          </span>
          <ModeToggle />
        </div>
        <div className="flex items-center justify-around md:hidden">
          <Hamburger>
            {HomeLink}
            {PicsLink}
            {VanLink}
            {SiteLink}
            <div className="pt-2">
              <ModeToggle xl />
            </div>
          </Hamburger>
        </div>
      </div>
      <hr className="my-4 dark:border-slate-50/20 " />
    </header>
  )
}
