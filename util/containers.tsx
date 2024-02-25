import { Averia_Serif_Libre } from 'next/font/google'
import { PropsWithChildren } from 'react'

const averia = Averia_Serif_Libre({ weight: '400', subsets: ['latin'] })

const Post = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="
      max-4xl:grid
      max-4xl:gap-x-8
      max-xl:grid-cols-[max(min(400px,60vh),400px),auto,320px]
      max-xl:gap-y-4
      max-lg:mb-8
      max-lg:grid-cols-1
      xl:max-4xl:grid-cols-[minmax(min(500px,60vh),580px),auto,320px]
      2xl:justify-between
      4xl:flex
      4xl:justify-center
      4xl:gap-x-20
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
        w-full
        max-lg:px-4
        sm:col-span-1
        lg:sticky
        lg:top-16
        lg:order-first
        lg:flex
        lg:max-h-[90vh]
        lg:flex-col
        lg:justify-between
        xl:min-w-[max(min(400px,60vh),400px)]
        2xl:w-[minmax(min(500px,60vh),580px)]
        3xl:mt-2
        4xl:w-[580px]
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
        flex w-full
        flex-col
        items-center
        sm:max-lg:flex-row
        sm:max-lg:justify-around
        lg:sticky
        lg:top-16
        lg:h-[90vh]
        4xl:w-[320px]
      "
    >
      {children}
    </div>
  )
}

const Entry = ({ children }: { children: React.ReactNode }) => (
  <div className="flex sm:col-span-1 sm:justify-center sm:max-lg:flex">
    <Text>{children}</Text>
  </div>
)

const Text = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`
      prose
      max-w-[62ch]
      text-lg
      dark:prose-invert
      prose-a:font-bold
      prose-a:underline-offset-2
      [&>*>h1]:mb-0 [&>h1]:mb-0
      ${averia.className}
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
      "
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
