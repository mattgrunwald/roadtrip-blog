'use client'
import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Calendar from 'react-calendar'
import { TileDisabledFunc, Value } from 'react-calendar/dist/cjs/shared/types'
import { ACCENT_BACKGROUND_CLASS } from '@/util/consts'

const MILLIS_IN_DAY = 1000 * 60 * 60 * 24

export type TripCalendarProps = {
  start: Date
  end: Date
  day: number
}

export default function TripCalendar({ start, end, day }: TripCalendarProps) {
  const router = useRouter()

  const onChange = (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const date = value as Date
    const day = Math.floor(
      (date.getTime() - start.getTime()) / MILLIS_IN_DAY + 1,
    )
    router.push(`/day/${day}`)
  }

  const tileDisabledMay: TileDisabledFunc = useCallback(
    ({ date }) => date.getDate() <= start.getDate(),
    [start],
  )

  const tileDisabledJune: TileDisabledFunc = useCallback(
    ({ date }) => date.getDate() > end.getDate(),
    [end],
  )

  const currentDayDate = useMemo(() => {
    const d = new Date(start)
    d.setDate(d.getDate() + day)
    return d
  }, [start, day])

  const tileClassName = useCallback(
    ({ date }: { date: Date }) => {
      if (day === 0) {
        return ''
      }
      if (
        date.getDate() === currentDayDate.getDate() &&
        date.getMonth() === currentDayDate.getMonth()
      ) {
        return `${ACCENT_BACKGROUND_CLASS} rounded-lg`
      }
    },
    [currentDayDate, day],
  )
  return (
    <>
      <div className="text-center">
        <b>May</b>
      </div>
      <Calendar
        onChange={onChange}
        value={start}
        tileDisabled={tileDisabledMay}
        minDate={new Date('2023-05-01')}
        minDetail="month"
        maxDetail="month"
        showNeighboringMonth={false}
        showNavigation={false}
        tileClassName={tileClassName}
      />
      <div className="text-center">
        <b>June</b>
      </div>
      <Calendar
        onChange={onChange}
        value={end}
        tileDisabled={tileDisabledJune}
        minDate={new Date('2023-06-01')}
        minDetail="month"
        maxDetail="month"
        showNeighboringMonth={false}
        showNavigation={false}
        tileClassName={tileClassName}
      />
    </>
  )
}
