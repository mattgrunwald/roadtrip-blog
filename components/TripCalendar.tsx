'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Calendar, { CalendarProps } from 'react-calendar'
import { TileDisabledFunc } from 'react-calendar/dist/cjs/shared/types'
import { ACCENT_BACKGROUND_CLASS, ACCENT_BORDER_CLASS } from '@/util/consts'
import { getTripDay } from '@/util/helpers'

export type TripCalendarProps = {
  currentDay: number
  highlightDays: Set<number>
}

const Month = ({
  name,
  children,
}: React.PropsWithChildren & { name: string }) => (
  <div className="max-w-xs">
    <div className="prose dark:prose-invert text-center mb-2">
      <b>{name}</b>
    </div>
    {children}
  </div>
)

const tileDisabledMay: TileDisabledFunc = ({ date }) => date.getDate() < 27
const tileDisabledJune: TileDisabledFunc = ({ date }) => date.getDate() > 25

export default function TripCalendar({
  currentDay,
  highlightDays,
}: TripCalendarProps) {
  const router = useRouter()

  const onChange = (date: Date) => {
    router.push(`/day/${getTripDay(date)}`)
  }

  const [currentDayDate, setCurrentDayDate] = useState(new Date())

  const tileClassName = ({ date }: { date: Date }) => {
    let className = 'my-[0.0625rem] rounded-lg'
    if (
      currentDay !== 0 &&
      date.getDate() === currentDayDate.getDate() &&
      date.getMonth() === currentDayDate.getMonth()
    ) {
      className = `${className} ${ACCENT_BACKGROUND_CLASS}`
    }

    if (highlightDays.has(getTripDay(date))) {
      className = `${className} border-2 border-solid ${ACCENT_BORDER_CLASS}/50`
    }

    return className
  }

  // Forces calendar to recalculate the current day date on the client side.
  // For some reason calculating the dates client side caused weird bugs in production
  useEffect(() => {
    const d = new Date('2023-05-27')
    d.setDate(d.getDate() + currentDay)
    setCurrentDayDate(d)
  }, [currentDay])

  const sharedProps: CalendarProps = {
    calendarType: 'gregory',
    minDetail: 'month',
    maxDetail: 'month',
    showNeighboringMonth: false,
    showNavigation: false,
    tileClassName,
    className: 'mb-4',
    onChange: (value) => onChange(value as Date),
  }

  return (
    <>
      <Month name="May">
        <Calendar
          value={new Date('2023-05-27')}
          tileDisabled={tileDisabledMay}
          minDate={new Date('2023-05-01')}
          {...sharedProps}
        />
      </Month>
      <Month name="June">
        <Calendar
          value={new Date('2023-06-25')}
          tileDisabled={tileDisabledJune}
          minDate={new Date('2023-06-01')}
          {...sharedProps}
        />
      </Month>
    </>
  )
}
