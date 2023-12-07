import { PropsWithChildren } from 'react'
import { Averia_Serif_Libre } from 'next/font/google'

const averia = Averia_Serif_Libre({ weight: '400', subsets: ['latin'] })

const Post = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="
      grid gap-x-8 gap-y-0
      max-lg:grid-cols-1 max-lg:mb-8
      max-2xl:grid-cols-[3fr,4fr,2fr] 2xl:flex 2xl:justify-between
      3xl:justify-center 3xl:gap-x-24
      "
    >
      {children}
    </div>
  )
}

const VisImages = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        order-first lg:sticky lg:top-16 lg:max-h-[45vh]
        2xl:w-[580px]
        lg:flex lg:flex-col lg:justify-between
        "
    >
      {children}
    </div>
  )
}

const VisMap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        order-3 lg:order-4
        row-span-1
        lg:sticky lg:top-[55vh] lg:max-h-[45vh]
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
        md:w-full lg:row-span-3 order-4 lg:order-3
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

const Entry = ({ children }: { children: React.ReactNode }) => (
  <div className="sm:col-span-1 order-2 lg:row-span-3 sm:max-lg:flex sm:max-lg:justify-center">
    <Text>{children}</Text>
  </div>
)

const Text = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`
      prose dark:prose-invert
      text-lg max-w-[62ch] [&>h1]:mb-0 [&>*>h1]:mb-0
      prose-a:underline-offset-2 prose-a:font-bold
      ${averia.className}
      max-md:mx-2
      lg:mb-8
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
      text-lg max-w-[62ch] [&>h1]:mb-0 [&>h2]:mt-6
      prose-a:underline-offset-2 prose-a:decoration-0 prose-a:font-bold
      ${averia.className}
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
  // Visual,
  VisImages,
  VisMap,
  Calendar,
  Entry,
  Text,
  AboutText,
  TableOfContents,
  TableOfContentsPopover,
}
export default exports
