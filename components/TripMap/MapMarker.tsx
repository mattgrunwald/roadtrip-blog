import { Marker } from 'react-simple-maps'
import { ACCENT_COLOR } from '@/util/consts'
import Link from 'next/link'
import { useMemo, useState } from 'react'

type MapMarkerProps = {
  coordinates: [number, number]
  day?: number
  opacity?: string
  name?: string
  offset?: number
  forCurrentDay?: boolean
}
export const MapMarker = ({
  coordinates,
  day,
  opacity = '100%',
  name = '',
  offset = -15,
  forCurrentDay = false,
}: MapMarkerProps) => {
  const [showLabel, setShowLabel] = useState(false)
  const onMouseEnter = useMemo(
    () => (forCurrentDay ? undefined : () => setShowLabel(true)),
    [forCurrentDay],
  )
  const onMouseLeave = useMemo(
    () => (forCurrentDay ? undefined : () => setShowLabel(false)),
    [forCurrentDay],
  )
  const [href, label] =
    day !== undefined ? [`/day/${day}`, `Go to day ${day}`] : ['', '']
  return (
    <Marker coordinates={coordinates}>
      {day ? (
        <Link href={href} aria-label={label}>
          <Dot
            opacity={opacity}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </Link>
      ) : (
        <Dot opacity={opacity} />
      )}
      {(forCurrentDay || showLabel) && (
        <text
          textAnchor="middle"
          y={offset}
          className="font-semibold dark:fill-gray-200 fill-gray-700 -z-10"
        >
          {name || ''}
        </text>
      )}
    </Marker>
  )
}

type DotProps = {
  opacity: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const Dot = ({ opacity, onMouseEnter, onMouseLeave }: DotProps) => (
  <circle
    className={`opacity-${opacity} hover:opacity-100`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    r={5}
    fill={ACCENT_COLOR}
    strokeWidth={2}
  />
)
