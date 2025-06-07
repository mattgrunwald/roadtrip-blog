import { IMAGE_QUALITY } from '@/util/consts'
import { GalleryImageSource, Size } from '@/util/types'
import Image from 'next/image'
import { useState } from 'react'
import { DayLink } from '../DayLink'
import { LinkIcon } from '../Icons'

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
  const srcSizes =
    image.size === Size.Wide
      ? '(max-width: 1024px) 100vw, 50vw'
      : '(max-width: 1024px) 50vw, 25vw'
  let aspectRatio = 'aspect-4/3'
  if (image.size === Size.Tall) {
    aspectRatio = 'aspect-4/6'
  } else if (image.size === Size.Wide) {
    aspectRatio = 'aspect-8/3'
  }

  return (
    <div
      className={`relative flex justify-center row-span-${image.rowSpan} col-span-${image.colSpan} h-full w-full ${aspectRatio} `}
    >
      {isLoaded && (
        <DayLink
          day={image.day}
          prefetch={false}
          className="absolute right-[1%] top-[1%] z-10"
        >
          <LinkIcon stroke="currentColor" opacity={0.5} />
        </DayLink>
      )}
      <Image
        className="translate-x-0 translate-y-0 transform-gpu object-cover hover:cursor-zoom-in"
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
