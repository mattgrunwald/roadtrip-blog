import { GalleryImageSource, Size } from '@/util/types'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { DayLink } from '../DayLink'
import Icons from '../Icons'
import { IMAGE_QUALITY } from '@/util/consts'

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
  const [isLoaded, setIsLoaded] = useState(false)
  const srcSizes = useMemo(
    () =>
      image.size === Size.Wide
        ? '(max-width: 1024px) 100vw, 50vw'
        : '(max-width: 1024px) 50vw, 25vw',
    [image],
  )
  const aspectRatio = useMemo(() => {
    switch (image.size) {
      case Size.Tall:
        return 'aspect-4/6'
      case Size.Wide:
        return 'aspect-8/3'
      default:
        return 'aspect-4/3'
    }
  }, [image.size])

  return (
    <div
      className={`
        relative flex
        justify-center
        row-span-${image.rowSpan} col-span-${image.colSpan} h-full w-full
        ${aspectRatio}
       `}
    >
      {isLoaded && (
        <DayLink
          day={image.day}
          prefetch={false}
          className="absolute right-[1%] top-[1%] z-10"
        >
          <Icons.Link stroke="currentColor" opacity={0.5} />
        </DayLink>
      )}
      <Image
        className="
          translate-x-0
          translate-y-0
          transform-gpu
          object-cover
          hover:cursor-zoom-in
        "
        src={image.src}
        fill
        placeholder="blur"
        blurDataURL={image.preview}
        alt={image.alt}
        onClick={onClick}
        sizes={srcSizes}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        quality={IMAGE_QUALITY}
      />
    </div>
  )
}
