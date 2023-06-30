'use client'
import { useState } from 'react'
import { GalleryImage } from './GalleryImage'
import { CarouselButton } from './CarouselButton'
import { mod } from '@/util/helpers'

export type GalleryProps = {
  urls: string[]
}

export default function Gallery({ urls }: GalleryProps) {
  const [current, setCurrent] = useState(0)
  const [nav, setNav] = useState(false)
  const hasImages = urls.length !== 0

  const nextImage = () => setCurrent(mod(current + 1, urls.length))
  const prevImage = () => setCurrent(mod(current - 1, urls.length))

  const showNav = () => setNav(true)
  const hideNav = () => setNav(false)

  const count = urls.length === 0 ? 0 : current + 1
  return (
    <div className="relative w-full">
      <span className="opacity-50 text-xs">{`${count} of ${urls.length}`}</span>
      <div className="relative overflow-hidden rounded-lg h-96">
        {hasImages &&
          urls.map((url, index) => (
            <GalleryImage
              key={url}
              src={`/images/${urls[current]}`}
              onMouseOut={hideNav}
              onMouseOver={showNav}
              onClick={nextImage}
              isCurrent={current === index}
              first={index === 0}
            />
          ))}
      </div>
      {hasImages && nav && urls.length > 1 && (
        <CarouselButton
          left
          onMouseOver={showNav}
          onMouseOut={hideNav}
          onClick={prevImage}
        />
      )}
      {hasImages && nav && urls.length > 1 && (
        <CarouselButton
          right
          onMouseOver={showNav}
          onMouseOut={hideNav}
          onClick={nextImage}
        />
      )}
    </div>
  )
}
