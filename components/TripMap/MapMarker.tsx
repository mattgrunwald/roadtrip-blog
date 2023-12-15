import { Marker } from 'react-simple-maps'
import { ACCENT_COLOR } from '@/util/consts'
import Link from 'next/link'

type MapMarkerProps = {
  coordinates: [number, number]
  day?: number
  opacity: string
  name?: string
  offset?: number
}
export const MapMarker = ({
  coordinates,
  day,
  opacity = '100%',
  name = '',
  offset = 0,
}: MapMarkerProps) => {
  const [href, label] =
    day !== undefined ? [`/day/${day}`, `Go to day ${day}`] : ['', '']
  return (
    <Marker coordinates={coordinates}>
      {day ? (
        <Link href={href} aria-label={label}>
          <Dot opacity={opacity} />
        </Link>
      ) : (
        <Dot opacity={opacity} />
      )}
      <text
        textAnchor="middle"
        y={offset}
        className="font-semibold dark:fill-gray-200 fill-gray-700 -z-10"
      >
        {name || ''}
      </text>
    </Marker>
  )
}

type DotProps = {
  opacity: string
}

const Dot = ({ opacity }: DotProps) => (
  <circle
    className={`opacity-${opacity} hover:opacity-100`}
    r={5}
    fill={ACCENT_COLOR}
    strokeWidth={2}
  />
)
