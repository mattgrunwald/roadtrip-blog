import { PropsWithChildren } from 'react'

const Post = ({ children }: PropsWithChildren) => {
  return (
    <div className="sm:max-3xl:grid md:grid-cols-9 sm:grid-cols-1 gap-8 3xl:flex 3xl:justify-around 3xl:px-48">
      {children}
    </div>
  )
}

const Visual = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:col-span-3 sm:col-span-1 md:order-first 3xl:w-5/12 md:sticky md:top-16 md:max-h-[90vh]">
      {children}
    </div>
  )
}

const Calendar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:col-span-2 xs:col-span-1 md:ml-0 flex flex-col items-center max-md:mt-6 max-md:mb-10 md:sticky md:top-16 md:h-[90vh]">
      <div className="max-w-xs">{children}</div>
    </div>
  )
}

const Text = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="prose dark:prose-invert mb-4 [&>*]:scroll-m-20">
      {children}
    </div>
  )
}

const TableOfContents = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-md:hidden sticky col-start-1 gap-x-10  xl:row-span-6 top-20 h-max space-y-2 3xl:flex 3xl:justify-end">
      {children}
    </div>
  )
}

const TableOfContentsPopover = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <div className="md:hidden fixed right-4">{children}</div>
}

const exports = {
  Post,
  Visual,
  Calendar,
  Text,
  TableOfContents,
  TableOfContentsPopover,
}
export default exports
