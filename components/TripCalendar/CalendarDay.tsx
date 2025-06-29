import { ACCENT_BORDER_CLASS, ACCENT_TEXT_CLASS_HOVER } from '@/util/consts'
import clsx from 'clsx'
import { DayLink } from '../DayLink'

type CalendarDayProps = {
  date: Date
  currentDay: number
}

export const CalendarDay = ({ date, currentDay }: CalendarDayProps) => {
  const day = date.getMonth() === 4 ? date.getDate() - 26 : date.getDate() + 5
  const disabled = day < 1 || day > 30

  return (
    <div className="flex justify-center">
      {disabled ? (
        <span className="border-2 border-transparent text-slate-400 dark:text-slate-600">
          {date.getDate()}
        </span>
      ) : (
        <DayLink
          day={day}
          prefetch={false}
          className={clsx(
            'w-8 rounded border-2',
            day === currentDay && ACCENT_BORDER_CLASS,
            day !== currentDay &&
              clsx('border-transparent', ACCENT_TEXT_CLASS_HOVER),
          )}
        >
          {date.getDate()}
        </DayLink>
      )}
    </div>
  )
}
