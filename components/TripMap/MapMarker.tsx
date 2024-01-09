import { Marker } from 'react-simple-maps'
import { DayLink } from '../DayLink'

type MapMarkerProps = {
  coordinates: [number, number]
  color: string
  day?: number
  opacity?: string
  name?: string
  offset?: number
}
export const MapMarker = ({
  coordinates,
  day,
  color,
  opacity = '100%',
  name = '',
  offset = 0,
}: MapMarkerProps) => {
  return (
    <Marker coordinates={coordinates}>
      {day ? (
        <DayLink day={day}>
          <Dot opacity={opacity} color={color} />
        </DayLink>
      ) : (
        <Dot opacity={opacity} color={color} />
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
