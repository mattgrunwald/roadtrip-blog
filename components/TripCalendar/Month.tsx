import React from 'react'

export const Month = ({
  name,
  children,
}: React.PropsWithChildren & { name: string }) => (
  <div className="max-w-xs max-sm:w-full">
    <div className="prose mb-2 text-center dark:prose-invert">
      <b>{name}</b>
    </div>
    {children}
  </div>
)
