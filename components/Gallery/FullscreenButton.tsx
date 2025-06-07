import { MouseEventHandler } from 'react'

export default function FullscreenButton({
  onClick,
  modal = false,
}: {
  onClick: MouseEventHandler
  modal?: boolean
}) {
  const [path, fill, stroke, strokeWidth] = modal
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
      ]

  return (
    <button
      onClick={onClick}
      className={`group absolute right-0 z-10 focus:outline-none md:right-[1%] ${modal ? 'top-[-1%]' : 'bottom-[1%]'} `}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center xs:h-10 xs:w-10">
        <svg
          viewBox="0 0 24 24"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            modal ? 'text-gray-400/50' : 'text-white'
          } dark:text-white/50 ${
            modal ? 'sm:h-10 sm:w-10' : 'max-md:hidden md:h-6 md:w-6'
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
