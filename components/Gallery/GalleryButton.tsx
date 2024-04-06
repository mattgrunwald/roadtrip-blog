type GalleryButtonProps = {
  left?: boolean
  right?: boolean
  onClick: (e: any) => void
}

const rightData = 'M9 5l7 7-7 7'
const leftData = 'M15 19l-7-7 7-7'

export const GalleryButton = ({
  left = false,
  right = false,
  onClick,
}: GalleryButtonProps) => {
  const paths = left ? leftData : rightData

  return (
    <button
      onClick={onClick}
      className={`
        group
        absolute
        top-[calc(50%-1rem)]
        z-10
        focus:outline-none
        max-sm:hidden
        ${right ? 'right-[1%]' : 'left-[1%]'}`}
    >
      <span
        className={`
        ${right ? 'right-[1%]' : 'left-[1%]'}
        inline-flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        bg-gray-400/30
        group-hover:bg-gray-400/50
        group-focus:outline-none
        group-focus:ring-white
        sm:h-10
        sm:w-10
        dark:bg-gray-800/30
        dark:group-hover:bg-gray-800/60
        dark:group-focus:ring-gray-800/70
      `}
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
