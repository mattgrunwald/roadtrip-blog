'use client'

import { useCallback, useState } from 'react'
import { GalleryDialog } from '../Gallery/GalleryDialog'
import ImageWallImage from './ImageWallImage'
import { SizedImage } from '@/util/imageSizing'

export type ImageWallProps = {
  images: SizedImage[]
  className?: string
}

export default function ImageWall({ images, className = '' }: ImageWallProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalStarter, setModalStarter] = useState(0)
  // const defaultColWidth = 300
  // const [colWidth, setColWidth] = useState(defaultColWidth)

  // const colDiv = useCallback((node: HTMLElement | null) => {
  //   if (node !== null) {
  //     const newColWidth = node.getBoundingClientRect().width - 8
  //     setColWidth(newColWidth > 0 ? newColWidth : defaultColWidth)
  //   }
  // }, [])

  //TODO set ref as first normal sized image because why not

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
      <div className="grid gap-x-2 gap-y-2 grid-cols-[1fr,1fr] md:grid-cols-[1fr,1fr,1fr,1fr]">
        {images.map((image, imageIndex) => (
          <ImageWallImage
            key={imageIndex}
            image={image}
            onClick={() => onOpenDialog(imageIndex)}
            width={360}
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
