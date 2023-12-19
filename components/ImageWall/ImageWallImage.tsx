import { GalleryImageSource, Size } from '@/util/types'
import Image from 'next/image'
import { DayLink } from './DayLink'
import { useState, useMemo } from 'react'

export type ImageWallImageProps = {
  image: GalleryImageSource
  priority: boolean
  onClick: () => void
}

export default function ImageWallImage({
  image,
  priority,
  onClick,
}: ImageWallImageProps) {
  const [isLoaded, setIsLoaded] = useState(true)
  const srcSizes = useMemo(
    () =>
      image.size === Size.Wide
        ? '(max-width: 1024px) 100vw, 50vw'
        : '(max-width: 1024px) 50vw, 25vw',
    [image],
  )
  return (
    <div
      className={`flex justify-center relative row-span-${image.rowSpan} col-span-${image.colSpan}`}
    >
      <div
        className={`
          relative h-full w-full
          ${
            image.size === Size.Tall
              ? 'min-h-[72vw] lg:min-h-[36vw]'
              : 'min-h-[36vw] lg:min-h-[18vw]'
          }
        `}
      >
        {isLoaded && <DayLink day={image.day} />}
        <Image
          className={`hover:cursor-zoom-in object-cover`}
          src={image.src}
          fill
          placeholder="blur"
          blurDataURL={image.preview}
          alt={image.alt}
          onClick={onClick}
          sizes={srcSizes}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  )
}
