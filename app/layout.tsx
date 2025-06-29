import Header from '@/components/Header/Header'
import { SpeedInsights } from '@vercel/speed-insights/next'
import clsx from 'clsx'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/ThemeProvider'
import './globals.css'

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          'antialiased',
          'bg-slate-50 text-slate-900',
          'dark:bg-slate-950 dark:text-slate-50',
          inter.className,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="content-width mx-auto px-4 lg:px-8">{children}</main>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
