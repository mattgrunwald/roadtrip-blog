'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Calendar from "react-calendar"
import { TileDisabledFunc, Value } from "react-calendar/dist/cjs/shared/types"

const MILLIS_IN_DAY = 1000 * 60 * 60 * 24

export type TripCalendarProps = {
  start: Date
  end: Date
  day: number
}
export default function TripCalendar({ start, end, day }: TripCalendarProps) {
  const router = useRouter()

  const onChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    const date = value as Date
    const day = Math.floor((date.getTime() - start.getTime()) / MILLIS_IN_DAY + 1)
    router.push(`/day/${day}`)
  }

  const tileDisabledMay: TileDisabledFunc = ({ date }) => {
    return date.getDate() <= start.getDate()
  }

  const tileDisabledJune: TileDisabledFunc = ({ date }) => {
    return date.getDate() > end.getDate()
  }

  const currentDayDate = new Date(start)
  currentDayDate.setDate(currentDayDate.getDate() + (day))

  function tileClassName({ date }: { date: Date }) {
    if (day === 0) {
      return ''
    }
    if (date.getDate() === currentDayDate.getDate() && date.getMonth() === currentDayDate.getMonth()) {
      return 'bg-red-400';
    }
  }
  return (
    <>
      <div className="text-center"><b>May</b></div>
      {/* <hr className="my-1" /> */}
      <Calendar
        onChange={onChange}
        value={start}
        tileDisabled={tileDisabledMay}
        minDate={new Date('2023-05-01')}
        minDetail="month"
        maxDetail='month'
        showNeighboringMonth={false}
        showNavigation={false}
        tileClassName={tileClassName}
      />
      <div className="text-center"><b>June</b></div>
      {/* <hr className="my-1" /> */}
      <Calendar
        onChange={onChange}
        value={end}
        tileDisabled={tileDisabledJune}
        minDate={new Date('2023-06-01')}
        minDetail="month"
        maxDetail='month'
        showNeighboringMonth={false}
        showNavigation={false}
        tileClassName={tileClassName}
      />
    </>
  )
}