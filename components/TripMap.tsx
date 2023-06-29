'use client'
import { Marker as MapMarker } from '@/.contentlayer/generated'
import React, { useEffect, useState } from 'react'
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
import { MarkerWithDay, sleep } from '@/util/helpers'
import { useRouter } from 'next/navigation'

const circleColor = '#f87171'

export default function TripMap(params: { markers: MapMarker[], allMarkers: MarkerWithDay[] }) {
  const router = useRouter()

  const routeToDay = (day: number) => {
    router.push(`/day/${day}`)
  }

  const { theme } = useTheme()
  const [fontColor, setFontColor] = useState('')
  const [stateColor, setStateColor] = useState('')

  const [hideMap, setHideMap] = useState(true)
  const [showAllMarkers, setShowAllMarkers] = useState(false)

  const showAll = () => setShowAllMarkers(true)
  const hideAll = () => setShowAllMarkers(false)

  useEffect(() => {
    const showMapPreview = async () => {
      await sleep(0)
      setHideMap(false)
    }
    showMapPreview()
  },
    [hideMap]
  )

  useEffect(() => {
    setStateColor(theme === 'light' ? '#e5e7eb' : '#374151')
    setFontColor(theme === 'dark' ? '#e5e7eb' : '#374151')
  }, [theme])

  return (
    <>
      {hideMap && <Placeholder dark={theme === 'dark'} />}
      <ComposableMap projection="geoAlbers" onMouseOver={showAll} onMouseOut={hideAll}>
        <Geographies geography={usGeo} className={hideMap ? 'hidden' : ''}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={stateColor}
                stroke="#bbb"
              />
            ))
          }
        </Geographies>
        {params.markers.map(({ name, coordinates, markerOffset }) => (
          <Marker
            onClick={() => console.log(coordinates)}
            key={name || coordinates[0]}
            coordinates={coordinates as [number, number]}
          >
            <circle r={5} fill={circleColor} strokeWidth={2} />
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: 'system-ui', fill: fontColor }}
            >
              {name || ''}
            </text>
          </Marker>
        ))}
        {showAllMarkers && params.allMarkers.map(({ coordinates, markerOffset, day }) => (
          <Marker
            key={coordinates[0]}
            coordinates={coordinates as [number, number]}
            className="hover:cursor-pointer"
            onClick={() => routeToDay(day)}
          >
            <circle r={5} fill={circleColor} strokeWidth={2} opacity='75%' />
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fill: fontColor }}
            >
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </>
  )

}

function Placeholder({ dark }: { dark: boolean }) {
  const src = dark ? placeholderSrcDark : placeholderSrc
  return (
    <Image src={src} alt="Map of the USA" />
  )
}
