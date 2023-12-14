import { GalleryImageSource, Size } from '@/util/types'
import Image from 'next/image'
import { DayLink } from './DayLink'

export type ImageWallImageProps = {
  image: GalleryImageSource
  onClick: () => void
}

export default function ImageWallImage({
  image,
  onClick,
}: ImageWallImageProps) {
  const srcSizes =
    image.size === Size.Wide
      ? '(max-width: 1024px) 100vw, 50vw'
      : '(max-width: 1024px) 50vw, 25vw'
  return (
    <div
      className={`flex justify-center relative row-span-${image.rowSpan} col-span-${image.colSpan}`}
    >
      <div
        className={`${
          image.size === Size.Tall
            ? 'min-h-[72vw] lg:min-h-[36vw]'
            : 'min-h-[36vw] lg:min-h-[18vw]'
        }`}
      >
        <DayLink day={image.day} />
        <Image
          className={`hover:cursor-zoom-in object-cover`}
          src={image.src}
          fill
          placeholder="blur"
          blurDataURL={image.preview}
          alt=""
          onClick={onClick}
          sizes={srcSizes}
        />
      </div>
    </div>
  )
}
