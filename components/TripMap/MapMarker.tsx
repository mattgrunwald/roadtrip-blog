import clsx from 'clsx'
import { Marker } from 'react-simple-maps'
import { DayLink } from '../DayLink'

type MapMarkerProps = {
  coordinates: [number, number]
  color: string
  day?: number
  translucent?: boolean
  name?: string
  offset?: number
  className?: string
}
export const MapMarker = ({
  coordinates,
  day,
  color,
  translucent = true,
  name = '',
  offset = 0,
  className = '',
}: MapMarkerProps) => {
  return (
    <Marker coordinates={coordinates} className={className}>
      {day ? (
        <DayLink day={day} prefetch={false}>
          <Dot translucent={translucent} color={color} />
        </DayLink>
      ) : (
        <Dot translucent={translucent} color={color} />
      )}
      <text
        textAnchor="middle"
        y={offset}
        className="-z-10 fill-gray-700 font-semibold dark:fill-gray-200"
      >
        {name || ''}
      </text>
    </Marker>
  )
}

type DotProps = {
  translucent: boolean
  color: string
}

const Dot = ({ translucent, color }: DotProps) => (
  <circle
    className={clsx('hover:opacity-100', translucent && 'opacity-50')}
    r={5}
    fill={color}
    strokeWidth={2}
  />
)
