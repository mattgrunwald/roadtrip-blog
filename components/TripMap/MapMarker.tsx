import { Marker } from 'react-simple-maps'
import { DayLink } from '../DayLink'

type MapMarkerProps = {
  coordinates: [number, number]
  color: string
  day?: number
  opacity?: string
  name?: string
  offset?: number
  className?: string
}
export const MapMarker = ({
  coordinates,
  day,
  color,
  opacity = '100%',
  name = '',
  offset = 0,
  className = '',
}: MapMarkerProps) => {
  return (
    <Marker coordinates={coordinates} className={className}>
      {day ? (
        <DayLink day={day} prefetch={false}>
          <Dot opacity={opacity} color={color} />
        </DayLink>
      ) : (
        <Dot opacity={opacity} color={color} />
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
  opacity: string
  color: string
}

const Dot = ({ opacity, color }: DotProps) => (
  <circle
    className={`opacity-${opacity} hover:opacity-100`}
    r={5}
    fill={color}
    strokeWidth={2}
  />
)
