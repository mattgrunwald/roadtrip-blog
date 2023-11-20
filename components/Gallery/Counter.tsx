import { MouseEventHandler, useMemo } from 'react'

export default function Counter({
  count,
  total,
}: {
  count: number
  total: number
}) {
  return (
    <div
      className="
        absolute
        bottom-[2%]
        left-[50%]
        translate-x-[-50%]
        bg-slate-50/70 dark:bg-gray-800
        p-1
        text-xs
        dark:opacity-70
        rounded-md
        "
    >
      {count} / {total}
    </div>
  )
}
