import { ACCENT_TEXT_CLASS_HOVER } from '@/util/consts'
import { DayLink } from './DayLink'

export type HighlightsProps = { highlights: { text: string; day: number }[] }
export const Highlights = ({ highlights }: HighlightsProps) => {
  return (
    <>
      <div className="text-center font-bold ">Highlights</div>
      <div className="prose text-sm dark:prose-invert">
        <ul className="[&>*>a]:no-underline">
          {highlights.map((item) => (
            <li key={item.day}>
              <DayLink
                day={item.day}
                prefetch={false}
                className={ACCENT_TEXT_CLASS_HOVER}
              >
                {item.text}
              </DayLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
