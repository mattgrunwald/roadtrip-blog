'use client'

import { useCallback, useMemo, useState } from 'react'
import { GalleryDialog } from '../Gallery/GalleryDialog'
import ImageWallImage from './ImageWallImage'
import { SizedImage } from '@/util/imageSizing'

export type ImageWallProps = {
  images: SizedImage[]
  colCount?: number
  className?: string
}

export default function ImageWall({
  images,
  colCount = 4,
  className = '',
}: ImageWallProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalStarter, setModalStarter] = useState(0)
  const defaultColWidth = useMemo(() => colCount * 100, [colCount])
  const [colWidth, setColWidth] = useState(defaultColWidth)

  const grid = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const newColWidth = node.getBoundingClientRect().width / colCount
      setColWidth(newColWidth > 0 ? newColWidth : defaultColWidth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onOpenDialog = (current: number) => {
    setModalStarter(current)
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
    setModalStarter(0)
  }

  return (
    <div className={className}>
      <div
        ref={grid}
        className="grid gap-x-2 gap-y-2 grid-cols-[1fr,1fr] md:grid-cols-[1fr,1fr,1fr,1fr]"
      >
        {images.map((image, imageIndex) => (
          <ImageWallImage
            key={imageIndex}
            image={image}
            onClick={() => onOpenDialog(imageIndex)}
            baseWidth={colWidth}
          />
        ))}
      </div>
      <GalleryDialog
        sources={images}
        isOpen={isOpen}
        onClose={onClose}
        startIndex={modalStarter}
      />
    </div>
  )
}
