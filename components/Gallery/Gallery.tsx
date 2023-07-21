'use client'

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
import { useRouter } from 'next/navigation'

export type GalleryProps = {
  sources: GalleryImageSource[]
  startIndex?: number
  modal?: boolean
  prefix?: string
}

export default function Gallery({
  sources,
  startIndex = 0,
  modal = false,
  prefix = '',
}: GalleryProps) {
  const [current, setCurrent] = useState(startIndex)
  const [nav, setNav] = useState(false)
  const hasImages = sources.length !== 0
  const router = useRouter()

  const close = useCallback(() => router.back(), [router])

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
        case 'Escape':
          close()
          break
      }
    },
    [prevImage, nextImage, close],
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
          router.back()
          break
        case DOWN:
          if (modal) {
            router.back()
          }
          break
      }
    },
  })

  const shouldShowNav = useMemo(
    () => (hasImages && nav && sources.length > 1) || modal,
    [hasImages, nav, sources.length, modal],
  )

  return (
    <>
      <div className={`relative w-full ${modal ? 'h-full' : ''}`}>
        <div className="opacity-50 text-xs max-lg:mb-4 2xl:mb-4">{`${count} of ${sources.length}`}</div>
        <div
          className={`
            xl:max-2xl:max-h-[45vh]
          ${
            modal
              ? ''
              : 'relative max-md:h-96 md:h-[max(40vh,350px)] lg:min-h-[40vh]'
          } `}
          {...handlers}
        >
          {hasImages &&
            sources.map((source, index) => {
              const href = modal ? '' : `/photo/${prefix}/${index}`
              return (
                <GalleryImage
                  key={index}
                  src={source.src}
                  blurSrc={source.preview}
                  onMouseOut={hideNav}
                  onMouseOver={showNav}
                  isCurrent={current === index}
                  isCloseToCurrent={imageOnDeck(index)}
                  first={index === 0}
                  href={href}
                  modal={modal}
                />
              )
            })}
        </div>
        {shouldShowNav && (
          <GalleryButton
            left
            modal={modal}
            onMouseOver={showNav}
            onMouseOut={hideNav}
            onClick={prevImage}
          />
        )}
        {shouldShowNav && (
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
