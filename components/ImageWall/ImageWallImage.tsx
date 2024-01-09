import { GalleryImageSource, Size } from '@/util/types'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { DayLink } from '../DayLink'
import Icons from '../Icons'

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
  return (
    <div
      className={`
        relative flex
        justify-center
        row-span-${image.rowSpan} col-span-${image.colSpan} h-full w-full
        ${
          image.size === Size.Tall
            ? 'min-h-[72vw] lg:min-h-[36vw] 3xl:min-h-[620px]'
            : 'min-h-[36vw] lg:min-h-[18vw] 3xl:min-h-[310px]'
        }`}
    >
      {isLoaded && (
        <DayLink day={image.day} className="absolute right-[1%] top-[1%] z-10">
          <Icons.Link stroke="currentColor" opacity={0.5} />
        </DayLink>
      )}
      <Image
        className={`object-cover hover:cursor-zoom-in`}
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
  )
}
