'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Calendar, { CalendarProps } from 'react-calendar'
import { TileDisabledFunc } from 'react-calendar/dist/cjs/shared/types'
import { ACCENT_BACKGROUND_CLASS } from '@/util/consts'

export type TripCalendarProps = {
  day: number
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

export default function TripCalendar({ day }: TripCalendarProps) {
  const router = useRouter()

  const onChange = (date: Date, month: 'may' | 'june') => {
    let day = date.getDate()
    switch (month) {
      case 'may':
        router.push(`/day/${day - 26}`)
        break
      case 'june':
        router.push(`/day/${day + 5}`)
        break
    }
  }

  const [currentDayDate, setCurrentDayDate] = useState(new Date())

  const tileClassName = ({ date }: { date: Date }) => {
    let className = 'my-[0.0625rem]'
    if (
      day !== 0 &&
      date.getDate() === currentDayDate.getDate() &&
      date.getMonth() === currentDayDate.getMonth()
    ) {
      className = `${className} ${ACCENT_BACKGROUND_CLASS} rounded-lg`
    }

    return className
  }

  // Forces calendar to recalculate the current day date on the client side.
  // For some reason calculating the dates client side caused weird bugs in production
  useEffect(() => {
    const d = new Date('2023-05-27')
    d.setDate(d.getDate() + day)
    setCurrentDayDate(d)
  }, [day])

  const sharedProps: CalendarProps = {
    calendarType: 'gregory',
    minDetail: 'month',
    maxDetail: 'month',
    showNeighboringMonth: false,
    showNavigation: false,
    tileClassName,
  }

  return (
    <>
      <Month name="May">
        <Calendar
          onChange={(value) => onChange(value as Date, 'may')}
          value={new Date('2023-05-27')}
          tileDisabled={tileDisabledMay}
          minDate={new Date('2023-05-01')}
          className="mb-4"
          {...sharedProps}
        />
      </Month>
      <Month name="June">
        <Calendar
          onChange={(value) => onChange(value as Date, 'june')}
          value={new Date('2023-06-25')}
          tileDisabled={tileDisabledJune}
          minDate={new Date('2023-06-01')}
          {...sharedProps}
        />
      </Month>
    </>
  )
}
