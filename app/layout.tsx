import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/ThemeProvider'
import { ModeToggle } from '../components/ModeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Roadtrip 2023',
  description: "Matt and Rainey's roadtrip blog",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased max-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className=" mx-auto py-4 px-8 h-screen">
            <header>
              <div className="flex items-center justify-between">
                <b>Roadtrek Trip 2023</b>
                <div className="flex items-center justify-around">
                  <nav className="ml-auto mr-4 text-sm font-medium space-x-6">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                  </nav>
                  <ModeToggle />
                </div>
              </div>
            </header>
            <hr className="my-4" />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
