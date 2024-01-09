import { Averia_Serif_Libre } from 'next/font/google'
import { PropsWithChildren } from 'react'

const averia = Averia_Serif_Libre({ weight: '400', subsets: ['latin'] })

const Post = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="
      grid gap-x-8 gap-y-4
      max-2xl:grid-cols-[3fr,4fr,2fr] max-lg:mb-8
      max-lg:grid-cols-1 2xl:flex 2xl:justify-between
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
        lg:sticky lg:top-16 lg:order-first lg:flex
        lg:max-h-[90vh]
        lg:flex-col lg:justify-between 2xl:w-[580px]
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
        lg:sticky lg:top-16 lg:ml-0 lg:h-[90vh] lg:max-w-[320px]
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
  <div className="sm:col-span-1 sm:max-lg:flex sm:max-lg:justify-center">
    <Text>{children}</Text>
  </div>
)

const Text = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`
      prose max-w-[62ch]
      text-lg dark:prose-invert prose-a:font-bold prose-a:underline-offset-2
      [&>*>h1]:mb-0 [&>h1]:mb-0
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
      prose max-w-[62ch]
      text-lg dark:prose-invert prose-a:font-bold prose-a:decoration-0
      prose-a:underline-offset-2 [&>h1]:mb-0 [&>h2]:mt-6
      ${averia.className}
      mb-8
      max-lg:w-full
      xl:w-[650px]
      [&>*]:scroll-m-20
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
      top-20 
      col-start-1 
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
  return <div className="fixed right-4 lg:hidden">{children}</div>
}

const exports = {
  Post,
  Visual,
  Calendar,
  Entry,
  Text,
  AboutText,
  TableOfContents,
  TableOfContentsPopover,
}
export default exports
