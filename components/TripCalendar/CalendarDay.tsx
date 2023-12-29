import { ACCENT_BORDER_CLASS } from '@/util/consts'
import { DayLink } from '../DayLink'

type CalendarDayProps = {
  date: Date
  currentDay: number
}

export const CalendarDay = ({ date, currentDay }: CalendarDayProps) => {
  const day = date.getMonth() === 4 ? date.getDate() - 26 : date.getDate() + 5
  const disabled = day < 1 || day > 30
  const className = `border-2 w-8 rounded ${
    day === currentDay ? ACCENT_BORDER_CLASS : 'border-transparent'
  }`

  return (
    <div className="flex justify-center">
      {disabled ? (
        <span className="text-slate-400 dark:text-slate-600 border-2 border-transparent">
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
