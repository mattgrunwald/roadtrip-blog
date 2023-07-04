type GalleryButtonProps = {
  left?: boolean
  right?: boolean
  modal?: boolean
  onMouseOver: () => void
  onMouseOut: () => void
  onClick: (e: any) => void
}

const rightData = 'M9 5l7 7-7 7'
const leftData = 'M15 19l-7-7 7-7'

export const GalleryButton = ({
  left = false,
  right = false,
  modal = false,
  onMouseOver,
  onMouseOut,
  onClick,
}: GalleryButtonProps) => {
  const rightStyle = `absolute top-0 right-0 flex items-center justify-center ${
    modal ? 'h-5/6' : 'h-full'
  } px-4 cursor-pointer group focus:outline-none z-10 max-md:hidden`
  const leftStyle = `absolute top-0 left-0  flex items-center justify-center ${
    modal ? 'h-5/6' : 'h-full'
  } px-4 cursor-pointer group focus:outline-none z-10 max-md:hidden`

  const [styling, paths] = left
    ? [leftStyle, leftData]
    : [rightStyle, rightData]

  return (
    <button
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      type="button"
      className={styling}
    >
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-400/30 dark:bg-gray-800/30 group-hover:bg-gray-400/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-white sm:w-6 sm:h-6"
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
        <span className="sr-only">Previous</span>
      </span>
    </button>
  )
}
