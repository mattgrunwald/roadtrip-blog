import { GalleryImageSource, Size } from '@/util/types'
import Image from 'next/image'
import { DayLink } from './DayLink'
import { useMemo, useState } from 'react'

export type ImageWallImageProps = {
  image: GalleryImageSource
  baseWidth: number
  onClick: () => void
}

export default function ImageWallImage({
  image,
  baseWidth,
  onClick,
}: ImageWallImageProps) {
  const [loaded, setLoaded] = useState(false)

  const srcSizes = useMemo(() => {
    switch (image.size) {
      case Size.Wide:
        return '(max-width: 1024px) 100vw, 50vw'
      default:
        return '(max-width: 1024px) 50vw, 25vw'
    }
  }, [image])

  const [width, height] = useMemo(
    () => [baseWidth * image.colSpan, baseWidth * image.colSpan * image.ratio],
    [baseWidth, image.colSpan, image.ratio],
  )

  return (
    <div
      className={`flex justify-center relative row-span-${image.rowSpan} col-span-${image.colSpan}`}
    >
      {loaded && <DayLink day={image.day} />}
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
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  )
}
