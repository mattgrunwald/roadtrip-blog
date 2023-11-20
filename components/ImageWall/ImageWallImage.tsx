import { IndexedGalleryImageSource } from '@/util/contentlayer-helpers'
import Image from 'next/image'
import { DayLink } from './DayLink'

export type ImageWallImageProps = {
  image: IndexedGalleryImageSource
  width: number
  onClick: () => void
}
export default function ImageWallImage({
  image,
  width,
  onClick,
}: ImageWallImageProps) {
  return (
    <div className="relative">
      <Image
        className="mt-2 align-middle w-full hover: cursor-zoom-in"
        src={image.src}
        width={width}
        height={width * image.ratio}
        placeholder="blur"
        blurDataURL={image.preview}
        alt=""
        quality={1}
        onClick={onClick}
        sizes="(max-width: 1024px) 50vw, 25vw"
      />
      <DayLink day={image.day} />
    </div>
  )
}
