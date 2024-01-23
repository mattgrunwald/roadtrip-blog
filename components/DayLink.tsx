import Link from 'next/link'
import React from 'react'

export type DayLinkProps = React.PropsWithChildren & {
  day: number
  prefetch?: boolean
  className?: string
}

export function DayLink({
  day,
  children,
  prefetch = true,
  className = '',
}: DayLinkProps) {
  return (
    <Link
      className={className}
      href={`/day/${day}`}
      aria-label={`Go to day ${day}`}
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
}
