import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'
import { AboutPopover } from './AboutPopover'
import { ACCENT_BACKGROUND_CLASS, ACCENT_TEXT_CLASS } from '@/util/consts'

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between">
        <b>Roadtrek Trip 2023</b>
        <div className="flex items-center justify-around">
          <nav className="ml-auto mr-6 text-sm font-medium space-x-6 pr">
            <Link href="/" className={`hover:${ACCENT_TEXT_CLASS}`}>
              Home
            </Link>
            {/* <Link href="/about">About</Link> */}
          </nav>
          <span className="mr-6 text-sm font-medium">
            <AboutPopover name="About">
              <Link href="/about/van" className={`hover:${ACCENT_TEXT_CLASS}`}>
                The Van
              </Link>
              <hr className={`${ACCENT_BACKGROUND_CLASS} h-0.5`} />
              <Link href="/about/site" className={`hover:${ACCENT_TEXT_CLASS}`}>
                This Site
              </Link>
            </AboutPopover>
          </span>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
