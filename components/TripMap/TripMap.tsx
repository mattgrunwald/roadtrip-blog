'use client'
import { Marker as GeneratedMarker } from '@/.contentlayer/generated'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { MapMarker } from './MapMarker'

import { MarkerWithDay } from '@/util/types'
import { Placeholder } from 'geo/placeholder'
import usGeo from 'geo/us-albers.json'
import { ACCENT_COLOR_DARK, ACCENT_COLOR_LIGHT } from '@/util/consts'

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

  const [fill, accentColor] = useMemo(() => {
    switch (resolvedTheme) {
      case 'light':
        return ['#e5e7eb', ACCENT_COLOR_LIGHT]
      case 'dark':
        return ['#374151', ACCENT_COLOR_DARK]
      default:
        return ['', ACCENT_COLOR_DARK]
    }
  }, [resolvedTheme])

  const opacity = useMemo(() => (resolvedTheme ? 1 : 0), [resolvedTheme])

  const [hideMap, setHideMap] = useState(true)
  const [showAllMarkers, setShowAllMarkers] = useState(showAllMarkersAlways)

  const showAll = () => setShowAllMarkers(true)
  const hideAll = useCallback(
    () => showAllMarkersAlways || setShowAllMarkers(false),
    [showAllMarkersAlways],
  )

  const allMarkerOpacity = useMemo(
    () => (showAllMarkersAlways ? '100' : '50'),
    [showAllMarkersAlways],
  )

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
    <div className="md:flex md:justify-center md:items-center lg:h-full">
      <div className="w-full md:max-w-[580px] md:max-h-[450px]">
        {hideMap && (
          <Placeholder stroke={'#bbb'} fill={fill} opacity={opacity} />
        )}
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
                  className="dark:fill-gray-700 fill-gray-200 focus:outline-none"
                  stroke="#bbb"
                />
              ))
            }
          </Geographies>
          <UnnamedMarkers />
          <NamedMarkers />
        </ComposableMap>
      </div>
    </div>
  )
}
