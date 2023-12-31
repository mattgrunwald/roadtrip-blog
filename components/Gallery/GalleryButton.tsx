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
        absolute
        top-[calc(50%-1rem)]
        group
        focus:outline-none
        z-10
        max-sm:hidden
        ${right ? 'right-[1%]' : 'left-[1%]'}`}
    >
      <span
        className={`
        ${right ? 'right-[1%]' : 'left-[1%]'}
        inline-flex
        items-center
        justify-center
        w-8
        h-8
        rounded-full
        sm:w-10
        sm:h-10
        bg-gray-400/30
        dark:bg-gray-800/30
        group-hover:bg-gray-400/50
        dark:group-hover:bg-gray-800/60
        group-focus:ring-white
        dark:group-focus:ring-gray-800/70
        group-focus:outline-none
      `}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-white dark:opacity-50 sm:w-6 sm:h-6"
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
