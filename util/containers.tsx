import { Averia_Serif_Libre } from 'next/font/google'
import React, { PropsWithChildren } from 'react'

const averia = Averia_Serif_Libre({ weight: '400', subsets: ['latin'] })

const Post = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="
      max-4xl:grid
      max-4xl:gap-x-8
      max-xl:grid-cols-[minmax(200px,min(400px,60vh)),auto,280px]
      max-xl:gap-y-4
      max-lg:mb-8
      max-lg:grid-cols-1
      xl:max-4xl:grid-cols-[minmax(300px,min(580px,60vh)),auto,320px]
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

const Visual = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="
        col-span-1
        w-full
        max-xl:max-h-[800px]
        md:max-lg:px-4
        lg:sticky
        lg:top-16
        lg:order-first
        lg:flex
        lg:flex-col
        lg:justify-between
        xl:max-h-[90vh]
        3xl:mt-2
        4xl:w-[580px]
      "
    >
      {children}
    </div>
  )
}

const Map = ({ children }: PropsWithChildren) => (
  <div
    className="
        items-center
        md:flex
        md:justify-center
        lg:h-full
      "
  >
    <div className="w-full md:max-h-[450px] md:max-w-[580px]">{children}</div>
  </div>
)

const Calendar = ({ children }: PropsWithChildren) => {
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

const Entry = ({ children }: PropsWithChildren) => (
  <div className="row-span-2 flex sm:col-span-1 sm:justify-center sm:max-lg:flex">
    <Text>{children}</Text>
  </div>
)

const Text = ({ children }: PropsWithChildren) => {
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

const AboutText = ({ children }: PropsWithChildren) => {
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

const TableOfContents = ({ children }: PropsWithChildren) => {
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

const TableOfContentsPopover = ({ children }: PropsWithChildren) => {
  return <div className="fixed right-4 lg:hidden">{children}</div>
}

const exports = {
  Post,
  Visual,
  Map,
  Calendar,
  Entry,
  Text,
  AboutText,
  TableOfContents,
  TableOfContentsPopover,
}
export default exports
