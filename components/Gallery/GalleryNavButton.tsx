import clsx from 'clsx'

type GalleryButtonProps = {
  left?: boolean
  right?: boolean
  onClick: (e: any) => void
}

const rightData = 'M9 5l7 7-7 7'
const leftData = 'M15 19l-7-7 7-7'

export const GalleryNavButton = ({
  left = false,
  right = false,
  onClick,
}: GalleryButtonProps) => {
  const paths = left ? leftData : rightData

  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        'group absolute top-[calc(50%-1rem)] z-10 focus:outline-hidden',
        'hover:cursor-pointer',
        'max-sm:hidden',
        right ? 'right-[1%]' : 'left-[1%]',
      )}
    >
      <span
        className={clsx(
          'inline-flex items-center justify-center',
          'h-8 w-8 rounded-full group-focus:outline-hidden sm:h-10 sm:w-10',
          'bg-gray-400/30 group-hover:bg-gray-400/50',
          'group-focus:ring-white',
          'dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60',
          'dark:group-focus:ring-gray-800/70',
          right ? 'right-[1%]' : 'left-[1%]',
        )}
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-white sm:h-6 sm:w-6 dark:opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={paths}
          ></path>
        </svg>
        <span className="sr-only">{left ? 'Previous' : 'Next'}</span>
      </span>
    </button>
  )
}
