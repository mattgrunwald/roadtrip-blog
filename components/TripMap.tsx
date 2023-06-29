'use client'
import { Marker as MapMarker } from "@/.contentlayer/generated";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useTheme } from 'next-themes'

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json";


export default function TripMap(params: { markers: MapMarker[] }) {
  const { theme } = useTheme()

  const stateColor = theme === 'light' ? '#e5e7eb' : '#374151'
  const fontColor = theme === 'dark' ? '#e5e7eb' : '#374151'

  return (
    <ComposableMap projection="geoAlbers">
      <Geographies geography={geoUrl}>
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
        <Marker key={name} coordinates={coordinates as [number, number]}>
          <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: fontColor }}
          >
            {name || ''}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
}