'use client'
import { Marker as GeneratedMarker } from '@/.contentlayer/generated'
import { useTheme } from 'next-themes'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { MapMarker } from './MapMarker'

import { ACCENT_COLOR_DARK, ACCENT_COLOR_LIGHT } from '@/util/consts'
import { MarkerWithDay } from '@/util/types'
import clsx from 'clsx'
import usGeo from 'geo/us-albers.json'

export type TripMapProps = {
  allMarkers: MarkerWithDay[]
  showAllMarkersAlways?: boolean
  markers?: GeneratedMarker[]
}

function UnnamedMarkers({
  allMarkers,
  showAllMarkersAlways,
  accentColor,
}: {
  allMarkers: MarkerWithDay[]
  showAllMarkersAlways: boolean
  accentColor: string
}) {
  return allMarkers.map(({ coordinates, day }) => (
    <MapMarker
      key={coordinates[0]}
      coordinates={coordinates as [number, number]}
      translucent={!showAllMarkersAlways}
      color={accentColor}
      day={day}
      className={clsx(showAllMarkersAlways || 'hidden group-hover:block')}
    />
  ))
}

function NamedMarkers({
  markers,
  accentColor,
}: {
  markers?: GeneratedMarker[]
  accentColor: string
}) {
  return markers?.map(({ name, coordinates, markerOffset }) => (
    <MapMarker
      key={name || coordinates[0]}
      coordinates={coordinates as [number, number]}
      name={name}
      color={accentColor}
      offset={markerOffset}
      className="block"
    />
  ))
}

export default function TripMap({
  allMarkers,
  showAllMarkersAlways = false,
  markers,
}: TripMapProps) {
  const { resolvedTheme } = useTheme()
  const [stroke, accentColor] =
    resolvedTheme === 'light'
      ? ['#999', ACCENT_COLOR_LIGHT]
      : ['#bbb', ACCENT_COLOR_DARK]

  return (
    <ComposableMap projection="geoAlbers" className="group">
      <Geographies geography={usGeo}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              className="fill-gray-200 focus:outline-hidden dark:fill-gray-700"
              stroke={stroke}
            />
          ))
        }
      </Geographies>
      <UnnamedMarkers
        allMarkers={allMarkers}
        showAllMarkersAlways={showAllMarkersAlways}
        accentColor={accentColor}
      />
      <NamedMarkers markers={markers} accentColor={accentColor} />
    </ComposableMap>
  )
}
