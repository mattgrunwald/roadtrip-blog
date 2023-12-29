import { ACCENT_BACKGROUND_CLASS } from '@/util/consts'
import { DayLink } from '../DayLink'

type CalendarDayProps = {
  date: Date
  currentDay: number
}

export const CalendarDay = ({ date, currentDay }: CalendarDayProps) => {
  const day = date.getMonth() === 4 ? date.getDate() - 26 : date.getDate() + 5
  const disabled = day < 1 || day > 30
  const background = day === currentDay ? ACCENT_BACKGROUND_CLASS : ''

  return (
    <div className="my-[0.0625rem] flex justify-center">
      {disabled ? (
        <span className="text-slate-500">{date.getDate()}</span>
      ) : (
        <DayLink day={day} className={`${background} w-8 rounded-lg`}>
          {date.getDate()}
        </DayLink>
      )}
    </div>
  )
}
