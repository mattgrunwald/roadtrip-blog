'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Calendar from 'react-calendar'
import { TileDisabledFunc } from 'react-calendar/dist/cjs/shared/types'
import { ACCENT_BACKGROUND_CLASS } from '@/util/consts'

export type TripCalendarProps = {
  day: number
}

const Month = ({ children }: React.PropsWithChildren) => (
  <div className="text-center mb-2">
    <b>{children}</b>
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
    if (day === 0) {
      return ''
    }
    if (
      date.getDate() === currentDayDate.getDate() &&
      date.getMonth() === currentDayDate.getMonth()
    ) {
      return `${ACCENT_BACKGROUND_CLASS} rounded-lg`
    }
  }

  useEffect(() => {
    const d = new Date('2023-05-27')
    d.setDate(d.getDate() + day)
    setCurrentDayDate(d)
  }, [day])

  return (
    <>
      <Month>May</Month>
      <Calendar
        onChange={(value) => onChange(value as Date, 'may')}
        value={new Date('2023-05-27')}
        tileDisabled={tileDisabledMay}
        minDate={new Date('2023-05-01')}
        minDetail="month"
        maxDetail="month"
        showNeighboringMonth={false}
        showNavigation={false}
        tileClassName={tileClassName}
        className="mb-4"
      />
      <Month>June</Month>
      <Calendar
        onChange={(value) => onChange(value as Date, 'june')}
        value={new Date('2023-06-25')}
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
