import { mod } from '@/util/helpers'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { GalleryButton } from './GalleryButton'
import { GalleryImage } from './GalleryImage'
import {
  useSwipeable,
  SwipeEventData,
  LEFT,
  RIGHT,
  UP,
  DOWN,
} from 'react-swipeable'
import { GalleryImageSource } from '@/util/contentlayer-helpers'

export type GalleryProps = {
  sources: GalleryImageSource[]
  onDialogOpen?: (current: number) => void
  onClose?: () => void
  startIndex?: number
  modal?: boolean
}

export default function Gallery({
  sources,
  onDialogOpen = () => {},
  onClose = () => {},
  startIndex = 0,
  modal = false,
}: GalleryProps) {
  const [current, setCurrent] = useState(startIndex)
  const [nav, setNav] = useState(false)
  const hasImages = sources.length !== 0

  const calcIndex = useCallback(
    (index: number) => mod(index, sources.length),
    [sources],
  )

  const nextIndex = useMemo(() => calcIndex(current + 1), [current, calcIndex])

  const prevIndex = useMemo(() => calcIndex(current - 1), [current, calcIndex])

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setCurrent(nextIndex)
    },
    [nextIndex],
  )
  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setCurrent(prevIndex)
    },
    [prevIndex],
  )

  const showNav = () => setNav(true)
  const hideNav = () => setNav(false)

  const count = useMemo(
    () => (sources.length === 0 ? 0 : current + 1),
    [sources, current],
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

  const imageOnDeck = useCallback(
    (index: number) =>
      index === nextIndex ||
      index === prevIndex ||
      index === calcIndex(nextIndex + 1) ||
      index === calcIndex(prevIndex - 1),
    [nextIndex, prevIndex, calcIndex],
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
        <div className="opacity-50 text-xs max-md:mb-4 2xl:mb-4">{`${count} of ${sources.length}`}</div>
        <div
          className={`${
            modal ? '' : 'relative xs:h-96 md:min-h-[40vh]'
          } xl:max-2xl:max-h-[45vh]`}
          {...handlers}
        >
          {hasImages &&
            sources.map((source, index) => (
              <GalleryImage
                key={source.src}
                src={source.src}
                blurSrc={source.preview}
                onMouseOut={hideNav}
                onMouseOver={showNav}
                onClick={(e) => {
                  e.stopPropagation()
                  if (!modal) {
                    onDialogOpen(current)
                  }
                }}
                isCurrent={current === index}
                isCloseToCurrent={imageOnDeck(index)}
                first={index === 0}
                modal={modal}
              />
            ))}
        </div>
        {hasImages && nav && sources.length > 1 && (
          <GalleryButton
            left
            modal={modal}
            onMouseOver={showNav}
            onMouseOut={hideNav}
            onClick={prevImage}
          />
        )}
        {hasImages && nav && sources.length > 1 && (
          <GalleryButton
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
