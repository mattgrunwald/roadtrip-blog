import { PropsWithChildren } from 'react'

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
  return <div className="prose dark:prose-invert lg:mb-8">{children}</div>
}

const AboutText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="prose dark:prose-invert mb-8 [&>*]:scroll-m-20 xl:w-[650px] max-lg:w-full">
      {children}
    </div>
  )
}

const TableOfContents = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-lg:hidden sticky col-start-1 top-20 h-max space-y-2 2xl:flex 2xl:justify-end">
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
