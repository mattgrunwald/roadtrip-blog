import { PropsWithChildren } from 'react'

const Post = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid max-md:grid-cols-1 max-2xl:grid-cols-[3fr,4fr,2fr] 2xl:flex 2xl:justify-center gap-x-8 gap-y-5">
      {children}
    </div>
  )
}

const Visual = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sm:col-span-1 md:order-first md:sticky md:top-16 md:max-h-[90vh] 2xl:w-[700px]">
      {children}
    </div>
  )
}

const Calendar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:ml-0 flex flex-col items-center max-md:mt-6 max-md:mb-10 md:sticky md:top-16 md:h-[90vh] max-w-[300px]">
      <div className="max-w-xs">{children}</div>
    </div>
  )
}

const Text = ({ children }: { children: React.ReactNode }) => {
  return <div className="prose dark:prose-invert mb-4">{children}</div>
}

const AboutText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="prose dark:prose-invert mb-4 [&>*]:scroll-m-20 xl:w-[650px]">
      {children}
    </div>
  )
}

const TableOfContents = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-md:hidden sticky col-start-1 top-20 h-max space-y-2 2xl:flex 2xl:justify-end">
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
  AboutText,
  TableOfContents,
  TableOfContentsPopover,
}
export default exports
