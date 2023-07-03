import Link from 'next/link'
import { AboutDropdown } from './AboutDropdown'
import { ModeToggle } from '../ModeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 pt-4 z-10 bg-white dark:bg-slate-950">
      <div className="flex items-center justify-between">
        <b>Roadtrek Trip 2023</b>
        <div className="flex items-center justify-around">
          <nav className="ml-auto max-md:mr-4 md:mr-6 text-sm font-medium space-x-6 pr">
            <Link href="/" className="hover:text-red-400">
              Home
            </Link>
          </nav>
          <span className="max-md:mr-4 md:mr-6 mr-6 text-sm font-medium">
            <AboutDropdown name="About">
              <Link href="/about/van" className="hover:text-red-400">
                The Van
              </Link>
              <Link href="/about/site" className="hover:text-red-400">
                This Site
              </Link>
            </AboutDropdown>
          </span>
          <ModeToggle />
        </div>
      </div>
      <hr className="my-4" />
    </header>
  )
}
