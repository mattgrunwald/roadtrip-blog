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
        z-10
        translate-x-[-50%] rounded-md
        bg-gray-50/70
        p-1
        text-xs
        dark:bg-gray-800
        dark:opacity-70
        "
    >
      {count} / {total}
    </div>
  )
}
