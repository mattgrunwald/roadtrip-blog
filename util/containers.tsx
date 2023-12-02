import { PropsWithChildren } from 'react'
import { Quattrocento } from 'next/font/google'

const quattro = Quattrocento({ weight: '400', subsets: ['latin'] })

const Post = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="
      grid gap-x-8 gap-y-4
      max-lg:grid-cols-1 max-lg:mb-8
      max-2xl:grid-cols-[3fr,4fr,2fr] 2xl:flex 2xl:justify-between
      3xl:justify-center 3xl:gap-x-24
      "
    >
      {children}
    </div>
  )
}

const Visual = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        sm:col-span-1
        lg:order-first lg:sticky lg:top-16 lg:max-h-[90vh]
        2xl:w-[580px]
        lg:flex lg:flex-col lg:justify-between
        "
    >
      {children}
    </div>
  )
}

const Calendar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        md:w-full
        lg:ml-0 lg:sticky lg:top-16 lg:h-[90vh] lg:max-w-[320px]
      "
    >
      <div
        className="
          flex flex-col items-center justify-evenly
          sm:max-lg:flex-row
          lg:max-w-xs
        "
      >
        {children}
      </div>
    </div>
  )
}

const Text = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`
      prose dark:prose-invert
      text-lg max-w-[56ch] [&>h1]:mb-0 
      prose-a:underline-offset-2 prose-a:decoration-0 prose-a:font-bold
      ${quattro.className}
      lg:max-xl:mb-8
      `}
    >
      {children}
    </div>
  )
}

const AboutText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`
      prose dark:prose-invert 
      text-lg max-w-[56ch] [&>h1]:mb-0 [&>h2]:mt-6 
      prose-a:underline-offset-2 prose-a:decoration-0 prose-a:font-bold
      ${quattro.className} 
      [&>*]:scroll-m-20 
      mb-8
      max-lg:w-full
      xl:w-[650px]
      `}
    >
      {children}
    </div>
  )
}

const TableOfContents = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
      sticky 
      col-start-1 
      top-20 
      h-max 
      space-y-2
      max-lg:hidden  
      2xl:flex 2xl:justify-end"
    >
      {children}
    </div>
  )
}

const TableOfContentsPopover = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <div className="lg:hidden fixed right-4">{children}</div>
}

const exports = {
  Post,
  Visual,
  Calendar,
  Text,
  AboutText,
  TableOfContents,
  TableOfContentsPopover,
}
export default exports
