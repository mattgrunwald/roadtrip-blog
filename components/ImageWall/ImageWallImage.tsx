import { IndexedGalleryImageSource } from '@/util/contentlayer-helpers'
import Image from 'next/image'
import { useMemo } from 'react'

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
  const [rowSpan, colSpan] = useMemo(() => {
    if (image.ratio > 1) {
      return [2, 1]
    } else if (image.ratio < 0.5) {
      return [1, 2]
    } else {
      return [1, 1]
    }
  }, [image])

  return (
    // <div className="max-w-[25%]">
    <Image
      className={`align-middle hover: cursor-zoom-in object-contain row-span-${rowSpan} col-span-${colSpan}`}
      src={image.src}
      width={width * colSpan}
      height={width * image.ratio}
      placeholder="blur"
      blurDataURL={image.preview}
      alt=""
      quality={1}
      onClick={onClick}
      sizes="(max-width: 1024px) 50vw, 25vw"
    />
    // </div>
  )
}
