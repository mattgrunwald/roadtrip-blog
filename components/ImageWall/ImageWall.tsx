'use client'

import { fitToGrid } from '@/util/imagePlacement'
import { GalleryImageSource } from '@/util/types'
import { useState } from 'react'
import { GalleryDialog } from '../Gallery/GalleryDialog'
import ImageWallImage from './ImageWallImage'

export type ImageWallProps = {
  images: GalleryImageSource[]
  colCount?: number
}

export default function ImageWall({ images, colCount = 4 }: ImageWallProps) {
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

  const gridImages = fitToGrid(images, colCount)

  return (
    <>
      <div className={`grid gap-x-1 gap-y-1 grid-cols-${colCount}`}>
        {gridImages.map((image, imageIndex) => (
          <ImageWallImage
            key={imageIndex}
            image={image}
            priority={imageIndex < 8}
            onClick={() => onOpenDialog(imageIndex)}
          />
        ))}
      </div>
      <GalleryDialog
        sources={gridImages}
        isOpen={isOpen}
        onClose={onClose}
        startIndex={modalStarter}
      />
    </>
  )
}
