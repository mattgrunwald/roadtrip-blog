import { MouseEventHandler, useMemo } from 'react'

export default function FullscreenButton({
  onClick,
  modal = false,
}: {
  onClick: MouseEventHandler
  modal?: boolean
}) {
  const [path, fill, stroke, strokeWidth] = useMemo(
    () =>
      modal
        ? [
            'M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16',
            'none',
            'currentColor',
            '1',
          ]
        : [
            'M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z',
            'currentColor',
            'none',
            '2',
          ],
    [modal],
  )

  return (
    <button
      onClick={onClick}
      className={`
        absolute 
        group 
        focus:outline-none 
        md:right-[1%]
        right-0
        ${modal ? 'top-[-1%]' : 'bottom-[1%] 2xl:bottom-[5%]'}
        `}
    >
      <span
        className="
        inline-flex 
        items-center 
        justify-center 
        w-8 
        h-8 
        xs:w-10 
        xs:h-10
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          className={`text-gray-400/50 dark:text-white/50 ${
            modal ? 'sm:w-10 sm:h-10' : 'max-md:hidden md:w-6 md:h-6'
          }`}
        >
          <path
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            d={path}
          />
        </svg>
        <span className="sr-only">Fullscreen</span>
      </span>
    </button>
  )
}
