'use client'

import { GalleryImageSource } from '@/util/contentlayer-helpers'
import { mod } from '@/util/helpers'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { GalleryDialog } from '../Gallery/GalleryDialog'

export type AllImagesProps = {
  images: GalleryImageSource[]
  numCols?: number
}

type IndexedGalleryImageSource = GalleryImageSource & {
  index: number
}

export default function AllImages({ images, numCols = 4 }: AllImagesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalStarter, setModalStarter] = useState(0)

  const onOpenDialog = (current: number) => {
    setModalStarter(current)
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
    setModalStarter(0)
  }
  const cols = useMemo(() => {
    const cols = Array(numCols)
      .fill([])
      .map((e) => [] as IndexedGalleryImageSource[])
    let index = 0
    for (const [totalIndex, image] of images.entries()) {
      cols[index].push({ ...image, index: totalIndex })
      index = mod(index + 1, numCols)
    }
    return cols
  }, [images, numCols])

  const [width, setWidth] = useState<number>(300)
  const div = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width - 8)
    }
  }, [])

  return (
    <>
      <div className="flex flex-wrap px-1 py-0 w-full h-[90vh]">
        {cols.map((col, colIndex) => (
          <div
            key={colIndex}
            ref={div}
            className="flex-50%] max-w-[50%] lg:flex-[25%] lg:max-w-[25%] px-1 py-0"
          >
            {col.map((image, imageIndex) => (
              <Image
                key={imageIndex}
                className="mt-2 align-middle w-full hover: cursor-zoom-in"
                src={image.src}
                width={width}
                height={width * image.ratio}
                placeholder="blur"
                blurDataURL={image.preview}
                alt=""
                quality={65}
                onClick={() => onOpenDialog(image.index)}
                sizes="(max-width: 1024px) 50%, 25%"
              />
            ))}
          </div>
        ))}
      </div>
      <GalleryDialog
        sources={images}
        isOpen={isOpen}
        onClose={onClose}
        startIndex={modalStarter}
      />
    </>
  )
}
