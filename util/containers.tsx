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
    <div className="md:col-span-3 sm:col-span-1 md:order-first 3xl:w-5/12">
      {children}
    </div>
  )
}

const Calendar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:col-span-2 xs:col-span-1 md:ml-0 mb-8 flex flex-col items-center">
      <div className="max-w-xs">{children}</div>
    </div>
  )
}

const Text = ({ children }: { children: React.ReactNode }) => {
  return <div className="prose dark:prose-invert mb-4">{children}</div>
}

const exports = { Post, Visual, Calendar, Text }
export default exports