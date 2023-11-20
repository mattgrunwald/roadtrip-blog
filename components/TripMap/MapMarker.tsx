import { Marker } from 'react-simple-maps'
import { ACCENT_COLOR } from '@/util/consts'

type MapMarkerProps = {
  coordinates: [number, number]
  opacity?: string
  name?: string
  offset?: number
  onClick?: () => void
}
export const MapMarker = ({
  coordinates,
  opacity = '100%',
  name = '',
  offset = 0,
  onClick = () => {},
}: MapMarkerProps) => (
  <Marker coordinates={coordinates} onClick={onClick}>
    <circle
      r={5}
      className={name === '' ? 'hover:cursor-pointer' : ''}
      fill={ACCENT_COLOR}
      strokeWidth={2}
      opacity={opacity}
    />
    <text
      textAnchor="middle"
      y={offset}
      className="font-semibold dark:fill-gray-200 fill-gray-700 -z-10"
    >
      {name || ''}
    </text>
  </Marker>
)
