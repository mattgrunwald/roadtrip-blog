'use client'
import { Marker as GeneratedMarker } from '@/.contentlayer/generated'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { useTheme } from 'next-themes'

import usGeo from 'geo/us-albers.json'
import { Placeholder } from 'geo/placeholder'
import { useRouter } from 'next/navigation'
import { MarkerWithDay } from '@/util/types'
import { ACCENT_COLOR } from '@/util/consts'

type MapMarkerProps = {
  coordinates: [number, number]
  opacity?: string
  name?: string
  offset?: number
  onClick?: () => void
}
const MapMarker = ({
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
      className={`font-semibold dark:fill-gray-200 fill-gray-700 -z-10`}
    >
      {name || ''}
    </text>
  </Marker>
)

export type TripMapParams = {
  allMarkers: MarkerWithDay[]
  showAllMarkersAlways?: boolean
  markers?: GeneratedMarker[]
}

export default function TripMap({
  allMarkers,
  showAllMarkersAlways = false,
  markers,
}: TripMapParams) {
  const router = useRouter()

  const routeToDay = useCallback(
    (day: number) => router.push(`/day/${day}`),
    [router],
  )

  const { theme } = useTheme()

  const fill = useMemo(
    () => (theme === 'light' ? '#e5e7eb' : '#374151'),
    [theme],
  )

  const [hideMap, setHideMap] = useState(true)
  const [showAllMarkers, setShowAllMarkers] = useState(showAllMarkersAlways)

  const showAll = () => setShowAllMarkers(true)
  const hideAll = useCallback(
    () => showAllMarkersAlways || setShowAllMarkers(false),
    [showAllMarkersAlways],
  )

  const allMarkerOpacity = useMemo(
    () => (showAllMarkersAlways ? '100%' : '50%'),
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
        onClick={() => routeToDay(day)}
      />
    ))

  const NamedMarkers = () =>
    markers?.map(({ name, coordinates, markerOffset }) => (
      <MapMarker
        key={name || coordinates[0]}
        coordinates={coordinates as [number, number]}
        name={name}
        offset={markerOffset}
      />
    ))

  return (
    <>
      {hideMap && <Placeholder stroke={'#bbb'} fill={fill} />}
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
    </>
  )
}
