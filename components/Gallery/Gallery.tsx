import { mod } from '@/util/helpers'
import { GalleryImageSource } from '@/util/types'
import clsx from 'clsx'
import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { LEFT, RIGHT, SwipeEventData, useSwipeable } from 'react-swipeable'
import Counter from './Counter'
import FullscreenButton from './FullscreenButton'
import { GalleryImage } from './GalleryImage'
import { GalleryNavButton } from './GalleryNavButton'

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
  const hasImages = sources.length !== 0

  const calcIndex = useCallback(
    (index: number) => mod(index, sources.length),
    [sources],
  )

  const nextIndex = calcIndex(current + 1)
  const prevIndex = calcIndex(current - 1)

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

  const count = sources.length === 0 ? 0 : current + 1

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

  const imageOnDeck = (index: number) =>
    index === nextIndex ||
    index === prevIndex ||
    index === calcIndex(nextIndex + 1) ||
    index === calcIndex(prevIndex - 1)

  useEffect(() => {
    if (modal) {
      document.body.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      if (modal) {
        document.body.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [handleKeyDown, modal])

  const handlers = useSwipeable({
    onSwiped: (eventData: SwipeEventData) => {
      switch (eventData.dir) {
        case LEFT:
          nextImage()
          break
        case RIGHT:
          prevImage()
          break
      }
    },
  })

  const onImageClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    if (!modal) {
      onDialogOpen(current)
    }
  }

  const onClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    if (!modal) {
      onDialogOpen(current)
    } else {
      onClose()
    }
  }

  return (
    <>
      <div className={clsx('relative w-full', modal && 'h-full')}>
        {modal && (
          <div className="mb-2 text-xs opacity-50">{`${count} of ${sources.length}`}</div>
        )}
        <div
          className={clsx(
            modal ||
              clsx(
                'relative aspect-4/3 w-full overflow-hidden max-md:h-[70vw]',
                'md:bg-gray-100 dark:md:bg-gray-900',
              ),
          )}
          {...handlers}
        >
          {hasImages &&
            sources.map((source, index) => (
              <GalleryImage
                key={source.src}
                src={source.src}
                blurSrc={source.preview}
                onClick={onImageClick}
                isCurrent={current === index}
                isCloseToCurrent={imageOnDeck(index)}
                first={index === 0}
                modal={modal}
                size={source.size}
                alt={source.alt}
              />
            ))}
        </div>
        {hasImages && (
          <>
            {sources.length > 1 && (
              <>
                <GalleryNavButton left onClick={prevImage} />
                <GalleryNavButton right onClick={nextImage} />
              </>
            )}
            {!modal && <Counter count={count} total={sources.length} />}
          </>
        )}
        {hasImages && <FullscreenButton onClick={onClick} modal={modal} />}
      </div>
    </>
  )
}
