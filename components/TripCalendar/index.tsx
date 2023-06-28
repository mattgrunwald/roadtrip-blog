'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Calendar from "react-calendar"
import { TileDisabledFunc, Value } from "react-calendar/dist/cjs/shared/types"

const MILLIS_IN_DAY = 1000 * 60 * 60 * 24

export type TripCalendarProps = {
  start: Date
  end: Date
}
export default function TripCalendar({ start, end }: TripCalendarProps) {
  const router = useRouter()

  const onChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    const date = value as Date
    const day = Math.floor((date.getTime() - start.getTime()) / MILLIS_IN_DAY + 1)
    router.push(`/day/${day}`)
  }

  const tileDisabled: TileDisabledFunc = ({ date }) => {
    return date.getTime() < start.getTime() || date.getTime() > end.getTime()
  }
  return (
    <Calendar
      onChange={onChange}
      value={start}
      tileDisabled={tileDisabled}
      minDate={start}
      maxDate={end}
      showDoubleView
      minDetail="month"
    />
  )
}