'use client'
import { Marker as MapMarker } from '@/.contentlayer/generated'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { useTheme } from 'next-themes'

import usGeo from 'geo/us-albers.json'
import placeholderSrc from 'geo/placeholder.svg'
import placeholderSrcDark from 'geo/placeholder-dark.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MarkerWithDay } from '@/util/types'

const circleColor = '#f87171'

export type TripMapParams = {
  allMarkers: MarkerWithDay[]
  showAlways?: boolean
  markers?: MapMarker[]
}

export default function TripMap({
  allMarkers,
  showAlways = false,
  markers,
}: TripMapParams) {
  const router = useRouter()

  const routeToDay = useCallback(
    (day: number) => router.push(`/day/${day}`),
    [router],
  )

  const { theme } = useTheme()

  const [hideMap, setHideMap] = useState(true)
  const [showAllMarkers, setShowAllMarkers] = useState(showAlways)

  const showAll = () => setShowAllMarkers(true)
  const hideAll = useCallback(
    () => showAlways || setShowAllMarkers(false),
    [showAlways],
  )

  const allMarkerOpacity = useMemo(
    () => (showAlways ? '100%' : '50%'),
    [showAlways],
  )

  useEffect(() => {
    setHideMap(false)
  }, [hideMap])

  const UnnamedMarkers = () =>
    showAllMarkers &&
    allMarkers.map(({ coordinates, day }) => (
      <Marker
        key={coordinates[0]}
        coordinates={coordinates as [number, number]}
        className={`hover:cursor-pointer ${hideMap ? 'hidden' : ''}`}
        onClick={() => routeToDay(day)}
      >
        <circle
          r={5}
          fill={circleColor}
          strokeWidth={2}
          opacity={allMarkerOpacity}
          className={hideMap ? 'hidden' : ''}
        />
      </Marker>
    ))

  const NamedMarkers = () =>
    markers?.map(({ name, coordinates, markerOffset }) => (
      <Marker
        key={name || coordinates[0]}
        coordinates={coordinates as [number, number]}
      >
        <circle
          r={5}
          fill={circleColor}
          strokeWidth={2}
          className={hideMap ? 'hidden' : ''}
        />
        <text
          textAnchor="middle"
          y={markerOffset}
          className={`font-semibold ${
            hideMap && 'hidden'
          } dark:fill-gray-200 fill-gray-700`}
          style={{ fontFamily: 'system-ui', zIndex: -1 }}
        >
          {name || ''}
        </text>
      </Marker>
    ))

  return (
    <>
      {hideMap && <Placeholder dark={theme === 'dark'} />}
      <ComposableMap
        projection="geoAlbers"
        onMouseEnter={showAll}
        onMouseLeave={hideAll}
        className={hideMap ? 'hidden' : ''}
      >
        <Geographies geography={usGeo} className={hideMap ? 'hidden' : ''}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="dark:fill-gray-700 fill-gray-200"
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

function Placeholder({ dark }: { dark: boolean }) {
  const src = dark ? placeholderSrcDark : placeholderSrc
  return (
    <div className="3xl:hidden">
      <Image src={src} alt="Map of the USA" />
    </div>
  )
}
