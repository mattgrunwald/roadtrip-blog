import Icons from '../Icons'
import Link from 'next/link'

export type DayLinkProps = {
  day: number
  className?: string
}

export function DayLink({
  day,
  className = 'absolute top-[1%] right-[1%]',
}: DayLinkProps) {
  return (
    <Link className={className} href={`/day/${day}`}>
      <Icons.Link stroke="currentColor" opacity={0.5} />
    </Link>
  )
}