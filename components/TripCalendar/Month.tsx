import React from 'react'

export const Month = ({
  name,
  children,
}: React.PropsWithChildren & { name: string }) => (
  <div className="max-w-xs">
    <div className="prose dark:prose-invert text-center mb-2">
      <b>{name}</b>
    </div>
    {children}
  </div>
)
