import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/ThemeProvider'
import Header from '@/components/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Roadtrip 2023',
  description: "Matt and Rainey's roadtrip blog",
}

interface RootLayoutProps {
  children: React.ReactNode
  gallery: React.ReactNode
}

export default function RootLayout({ children, gallery }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className=" mx-auto px-6">
            <Header />
            <main>{children}</main>
            {gallery}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
