import { mod } from '@/util/helpers'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { CarouselButton } from './CarouselButton'
import { GalleryImage } from './GalleryImage'
import {
  useSwipeable,
  SwipeEventData,
  LEFT,
  RIGHT,
  UP,
  DOWN,
} from 'react-swipeable'

export type GalleryProps = {
  urls: string[]
  onDialogOpen?: (current: number) => void
  onClose?: () => void
  startIndex?: number
  modal?: boolean
}

export default function Gallery({
  urls,
  onDialogOpen = () => {},
  onClose = () => {},
  startIndex = 0,
  modal = false,
}: GalleryProps) {
  const [current, setCurrent] = useState(startIndex)
  const [nav, setNav] = useState(false)
  const hasImages = urls.length !== 0

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setCurrent(mod(current + 1, urls.length))
    },
    [current, urls],
  )
  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setCurrent(mod(current - 1, urls.length))
    },
    [current, urls],
  )

  const showNav = () => setNav(true)
  const hideNav = () => setNav(false)

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

  const handlers = useSwipeable({
    onSwiped: (eventData: SwipeEventData) => {
      switch (eventData.dir) {
        case LEFT:
          nextImage()
          break
        case RIGHT:
          prevImage()
          break
        case UP:
          onClose()
          break
        case DOWN:
          onClose()
          break
      }
    },
  })

  return (
    <>
      <div className={`relative w-full ${modal ? 'h-full' : ''}`}>
        <div className="opacity-50 text-xs max-md:mb-4">{`${count} of ${urls.length}`}</div>
        <div
          className={`overflow-hidden rounded-lg ${
            modal ? '' : 'relative h-96'
          }`}
          {...handlers}
        >
          {hasImages &&
            urls.map((url, index) => (
              <GalleryImage
                key={url}
                src={`/images/${urls[current]}`}
                onMouseOut={hideNav}
                onMouseOver={showNav}
                onClick={(e) => {
                  e.stopPropagation()
                  if (!modal) {
                    onDialogOpen(current)
                  }
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
