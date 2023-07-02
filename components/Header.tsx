import Link from 'next/link'
import { ModeToggle } from './ModeToggle'

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between">
        <b>Roadtrek Trip 2023</b>
        <div className="flex items-center justify-around">
          <nav className="ml-auto mr-6 text-sm font-medium space-x-6 pr">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
