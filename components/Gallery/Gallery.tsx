import { mod } from '@/util/helpers'
import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  MouseEventHandler,
} from 'react'
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
import { GalleryImageSource } from '@/util/types'
import FullscreenButton from './FullscreenButton'
import Counter from './Counter'

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

  const onImageClick: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation()
      if (!modal) {
        onDialogOpen(current)
      }
    },
    [current, modal, onDialogOpen],
  )

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation()
      if (!modal) {
        onDialogOpen(current)
      } else {
        onClose()
      }
    },
    [current, modal, onClose, onDialogOpen],
  )

  return (
    <>
      <div className={`relative w-full ${modal ? 'h-full' : ''}`}>
        {modal && (
          <div className="opacity-50 text-xs mb-2">{`${count} of ${sources.length}`}</div>
        )}
        <div
          className={
            modal
              ? ''
              : `
                relative
                overflow-hidden
                max-md:h-96 md:h-[max(40vh,350px)]
                lg:min-h-[42vh]
                xl:max-2xl:max-h-[45vh]
                2xl:min-h-[45vh]
                3xl:min-h-[34vh] 3xl:h-96
                dark:md:bg-gray-900
                md:bg-gray-100
                mt-5
                `
          }
          {...handlers}
        >
          {hasImages &&
            sources.map((source, index) => (
              <>
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
                />
              </>
            ))}
        </div>
        {hasImages && sources.length > 1 && (
          <>
            <GalleryButton left onClick={prevImage} />
            <GalleryButton right onClick={nextImage} />
            {!modal && <Counter count={count} total={sources.length} />}
          </>
        )}
        {hasImages && <FullscreenButton onClick={onClick} modal={modal} />}
      </div>
    </>
  )
}
