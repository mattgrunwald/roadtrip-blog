'use client'
import Calendar, { CalendarProps } from 'react-calendar'
import { CalendarDay } from './CalendarDay'
import { Month } from './Month'

export type TripCalendarProps = {
  day: number
}

export default function TripCalendar({ day }: TripCalendarProps) {
  const sharedProps: CalendarProps = {
    calendarType: 'gregory',
    minDetail: 'month',
    maxDetail: 'month',
    showNeighboringMonth: false,
    showNavigation: false,
    tileContent: ({ date }) => <CalendarDay date={date} currentDay={day} />,
    className: 'mb-4',
  }

  return (
    <>
      <Month name="May">
        <Calendar
          value={new Date('2023-05-27')}
          minDate={new Date('2023-05-01')}
          {...sharedProps}
        />
      </Month>
      <Month name="June">
        <Calendar
          value={new Date('2023-06-25')}
          minDate={new Date('2023-06-01')}
          {...sharedProps}
        />
      </Month>
    </>
  )
}
