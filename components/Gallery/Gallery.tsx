import { mod } from '@/util/helpers'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { CarouselButton } from './CarouselButton'
import { GalleryImage } from './GalleryImage'

export type GalleryProps = {
  urls: string[]
  onDialogOpen?: (current: number) => void
  startIndex?: number
  modal?: boolean
}

export const closeIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="dark:text-white sm:w-10 sm:h-10 text-gray-800"
  >
    <g id="Menu / Close_SM">
      <path
        id="Vector"
        d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

export default function Gallery({
  urls,
  onDialogOpen = () => {},
  startIndex = 0,
  modal = false,
}: GalleryProps) {
  const [current, setCurrent] = useState(startIndex)
  const [nav, setNav] = useState(false)
  const hasImages = urls.length !== 0

  const nextImage = useCallback(
    (e?: any) => {
      e?.stopPropagation()
      setCurrent(mod(current + 1, urls.length))
    },
    [current, urls],
  )
  const prevImage = useCallback(
    (e?: any) => {
      e?.stopPropagation()
      setCurrent(mod(current - 1, urls.length))
    },
    [current, urls],
  )

  const showNav = () => setNav(true)
  const hideNav = () => setNav(true)

  const count = useMemo(
    () => (urls.length === 0 ? 0 : current + 1),
    [urls, current],
  )

  const handleKeyDown = useCallback(
    (e: any): void => {
      switch (e.key) {
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
      }
    },
    [prevImage, nextImage],
  )

  useEffect(() => {
    if (modal) {
      document.body.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (modal) {
        document.body.removeEventListener('keydown', handleKeyDown)
      }
    }
  })

  return (
    <>
      <div className={`relative w-full ${modal ? 'h-full' : ''} `}>
        {/* <div className="flexs flex-rows"> */}
        <span className="opacity-50 text-xs">{`${count} of ${urls.length}`}</span>
        {/* <span className="cursor-pointer opacity-20 z-20 dark:prose-invert">{modal ? closeIcon : ''}</span> */}
        {/* </div> */}
        <div
          className={`overflow-hidden rounded-lg ${
            modal ? '' : 'relative h-96'
          }`}
        >
          {hasImages &&
            urls.map((url, index) => (
              <GalleryImage
                key={url}
                src={`/images/${urls[current]}`}
                onMouseOut={hideNav}
                onMouseOver={showNav}
                // onClick={nextImage}
                onClick={(e) => {
                  e.stopPropagation()
                  onDialogOpen(current)
                }}
                isCurrent={current === index}
                first={index === 0}
                modal={modal}
              />
            ))}
        </div>
        {hasImages && nav && urls.length > 1 && (
          <CarouselButton
            left
            modal={modal}
            onMouseOver={showNav}
            onMouseOut={hideNav}
            onClick={prevImage}
          />
        )}
        {hasImages && nav && urls.length > 1 && (
          <CarouselButton
            right
            modal={modal}
            onMouseOver={showNav}
            onMouseOut={hideNav}
            onClick={nextImage}
          />
        )}
      </div>
    </>
  )
}
