import clsx from 'clsx'
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
      type="button"
      onClick={onClick}
      className={clsx(
        'group absolute right-0 z-20 focus:outline-hidden',
        'md:right-[1%]',
        'hover:cursor-pointer',
        modal ? 'top-[-1%]' : 'bottom-[1%]',
      )}
    >
      <span
        className={clsx(
          'inline-flex items-center justify-center',
          'h-8 w-8',
          'xs:h-10 xs:w-10',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            'dark:text-white/50',
            modal
              ? 'text-gray-400/50 sm:h-10 sm:w-10'
              : 'text-white max-md:hidden md:h-6 md:w-6',
          )}
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
