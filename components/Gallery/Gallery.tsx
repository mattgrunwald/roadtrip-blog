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

  const nextIndex = useMemo(
    () => mod(current + 1, sources.length),
    [current, sources],
  )

  const prevIndex = useMemo(
    () => mod(current - 1, sources.length),
    [current, sources],
  )

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
    (index: number) => index === nextIndex || index === prevIndex,
    [nextIndex, prevIndex],
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
        <div className="opacity-50 text-xs max-md:mb-4">{`${count} of ${sources.length}`}</div>
        <div
          className={`overflow-hidden rounded-lg ${
            modal ? '' : 'relative h-96'
          }`}
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
