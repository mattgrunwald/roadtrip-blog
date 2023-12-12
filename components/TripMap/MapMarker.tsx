import { Marker } from 'react-simple-maps'
import { ACCENT_COLOR } from '@/util/consts'
import Link from 'next/link'

type MapMarkerProps = {
  coordinates: [number, number]
  day?: number
  opacity?: string
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
  const Dot = () => (
    <circle
      className={`opacity-${opacity} hover:opacity-100`}
      r={5}
      fill={ACCENT_COLOR}
      strokeWidth={2}
    />
  )

  return (
    <Marker coordinates={coordinates}>
      {day ? (
        <Link href={day !== undefined ? `/day/${day}` : ''}>
          <Dot />
        </Link>
      ) : (
        <Dot />
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
