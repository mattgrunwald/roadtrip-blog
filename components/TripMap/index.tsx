'use client'
import { Marker as GeneratedMarker } from '@/.contentlayer/generated'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { MapMarker } from './MapMarker'

import { Placeholder } from '@/geo/Placeholder'
import { ACCENT_COLOR_DARK, ACCENT_COLOR_LIGHT } from '@/util/consts'
import { MarkerWithDay } from '@/util/types'
import usGeo from 'geo/us-albers.json'

export type TripMapProps = {
  allMarkers: MarkerWithDay[]
  showAllMarkersAlways?: boolean
  markers?: GeneratedMarker[]
}

export default function TripMap({
  allMarkers,
  showAllMarkersAlways = false,
  markers,
}: TripMapProps) {
  const { resolvedTheme } = useTheme()

  const [hideMap, setHideMap] = useState(true)
  const [showAllMarkers, setShowAllMarkers] = useState(showAllMarkersAlways)

  const showAll = () => setShowAllMarkers(true)
  const hideAll = () => showAllMarkersAlways || setShowAllMarkers(false)

  const [fill, stroke, accentColor] = useMemo(() => {
    switch (resolvedTheme) {
      case 'light':
        return ['#e5e7eb', '#999', ACCENT_COLOR_LIGHT]
      case 'dark':
        return ['#374151', '#bbb', ACCENT_COLOR_DARK]
      default:
        return ['', '#bbb', ACCENT_COLOR_DARK]
    }
  }, [resolvedTheme])

  const opacity = resolvedTheme ? 1 : 0

  const allMarkerOpacity = showAllMarkersAlways ? '100' : '50'

  // Showing a placeholder map then immediately re-rendering without prevents
  // the whole map from 'blinking' when navigating to a new page
  useEffect(() => {
    setHideMap(false)
  }, [hideMap])

  const UnnamedMarkers = () =>
    showAllMarkers &&
    allMarkers.map(({ coordinates, day }) => (
      <MapMarker
        key={coordinates[0]}
        coordinates={coordinates as [number, number]}
        opacity={allMarkerOpacity}
        color={accentColor}
        day={day}
      />
    ))

  const NamedMarkers = () =>
    markers?.map(({ name, coordinates, markerOffset }) => (
      <MapMarker
        key={name || coordinates[0]}
        coordinates={coordinates as [number, number]}
        name={name}
        color={accentColor}
        offset={markerOffset}
      />
    ))

  return (
    <>
      {hideMap && <Placeholder stroke={'#bbb'} fill={fill} opacity={opacity} />}
      <ComposableMap
        projection="geoAlbers"
        onMouseEnter={showAll}
        onMouseLeave={hideAll}
        className={hideMap ? 'hidden' : ''}
      >
        <Geographies geography={usGeo}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="fill-gray-200 focus:outline-none dark:fill-gray-700"
                stroke={stroke}
              />
            ))
          }
        </Geographies>
        <UnnamedMarkers />
        <NamedMarkers />
      </ComposableMap>
    </>
  )
}
