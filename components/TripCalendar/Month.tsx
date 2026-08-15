import React from 'react'

export const Month = ({
  name,
  children,
}: React.PropsWithChildren & { name: string }) => (
  <div className="max-w-xs max-sm:w-full">
    <div className="prose dark:prose-invert mb-2 text-center">
      <b>{name}</b>
    </div>
    {children}
  </div>
)
