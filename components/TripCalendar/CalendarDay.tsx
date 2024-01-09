import { ACCENT_BORDER_CLASS, ACCENT_TEXT_CLASS_HOVER } from '@/util/consts'
import { DayLink } from '../DayLink'

type CalendarDayProps = {
  date: Date
  currentDay: number
}

export const CalendarDay = ({ date, currentDay }: CalendarDayProps) => {
  const day = date.getMonth() === 4 ? date.getDate() - 26 : date.getDate() + 5
  const disabled = day < 1 || day > 30
  const className = `border-2 w-8 rounded ${
    day === currentDay
      ? ACCENT_BORDER_CLASS
      : `border-transparent ${ACCENT_TEXT_CLASS_HOVER}`
  }`

  return (
    <div className="flex justify-center">
      {disabled ? (
        <span className="border-2 border-transparent text-slate-400 dark:text-slate-600">
          {date.getDate()}
        </span>
      ) : (
        <DayLink day={day} className={className}>
          {date.getDate()}
        </DayLink>
      )}
    </div>
  )
}
