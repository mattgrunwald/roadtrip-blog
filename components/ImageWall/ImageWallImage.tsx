import { SizedImage, sizes } from '@/util/imageSizing'
import Image from 'next/image'
import { useMemo } from 'react'

export type ImageWallImageProps = {
  image: SizedImage
  width: number
  onClick: () => void
}
export default function ImageWallImage({
  image,
  width,
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

  return (
    <div
      className={`flex justify-center row-span-${rowSpan} col-span-${colSpan}`}
    >
      <Image
        className={`hover:cursor-zoom-in object-cover`}
        src={image.src}
        width={width * colSpan}
        height={width * image.ratio}
        placeholder="blur"
        blurDataURL={image.preview}
        alt={`${image.ratio}, ${image.size}`}
        quality={25}
        onClick={onClick}
        sizes={srcSizes}
      />
    </div>
  )
}
