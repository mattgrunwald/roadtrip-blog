import clsx from 'clsx'

export default function Counter({
  count,
  total,
}: {
  count: number
  total: number
}) {
  return (
    <div
      className={clsx(
        'absolute bottom-[2%] left-[50%] translate-x-[-50%]',
        'z-10 rounded-md p-1 text-xs',
        'bg-slate-50/70',
        'dark:bg-gray-800 dark:opacity-70',
      )}
    >
      {count} / {total}
    </div>
  )
}
