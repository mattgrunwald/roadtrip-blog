import { IMAGE_QUALITY } from '@/util/consts'
import { GalleryImageSource, Size } from '@/util/types'
import clsx from 'clsx'
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

  return (
    <div
      className={clsx(
        'relative flex h-full w-full justify-center',
        image.rowSpan === 1 && 'row-span-1',
        image.rowSpan === 2 && 'row-span-2',
        image.colSpan === 1 && 'col-span-1',
        image.colSpan === 2 && 'col-span-2',
        image.size === Size.Normal && 'aspect-4/3',
        image.size === Size.Wide && 'aspect-8/3',
        image.size === Size.Tall && 'aspect-4/6',
      )}
    >
      {isLoaded && (
        <DayLink
          day={image.day}
          prefetch={false}
          className="absolute top-[1%] right-[1%] z-10"
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
        unoptimized={image.src.endsWith('.gif')}
      />
    </div>
  )
}
