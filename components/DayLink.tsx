import Link from 'next/link'
import React from 'react'

export type DayLinkProps = React.PropsWithChildren & {
  day: number
  className?: string
}

export function DayLink({ day, children, className = '' }: DayLinkProps) {
  return (
    <Link
      className={className}
      href={`/day/${day}`}
      aria-label={`Go to day ${day}`}
    >
      {children}
    </Link>
  )
}
