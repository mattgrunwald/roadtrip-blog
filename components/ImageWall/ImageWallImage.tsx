import { SizedImage, sizes } from '@/util/imageSizing'
import Image from 'next/image'
import { useMemo } from 'react'

export type ImageWallImageProps = {
  image: SizedImage
  baseWidth: number
  onClick: () => void
}

export default function ImageWallImage({
  image,
  baseWidth,
  onClick,
}: ImageWallImageProps) {
  const [colSpan, rowSpan] = image.size

  const srcSizes = useMemo(() => {
    switch (image.size) {
      case sizes.WIDE:
        return '(max-width: 1024px) 100vw, 50vw'
      default:
        return '(max-width: 1024px) 50vw, 25vw'
    }
  }, [image])

  const [width, height] = useMemo(
    () => [baseWidth * colSpan, baseWidth * colSpan * image.ratio],
    [baseWidth, colSpan, image.ratio],
  )

  return (
    <div
      className={`flex justify-center row-span-${rowSpan} col-span-${colSpan}`}
    >
      <Image
        className={`hover:cursor-zoom-in object-cover`}
        src={image.src}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={image.preview}
        alt=""
        onClick={onClick}
        sizes={srcSizes}
      />
    </div>
  )
}
