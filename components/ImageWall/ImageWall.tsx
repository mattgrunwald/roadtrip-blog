'use client'

import { GalleryImageSource } from '@/util/contentlayer-helpers'
import { useState } from 'react'
import { GalleryDialog } from '../Gallery/GalleryDialog'
import ImageWallImage from './ImageWallImage'

export type ImageWallProps = {
  images: GalleryImageSource[]
  className?: string
}

export default function ImageWall({ images, className = '' }: ImageWallProps) {
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

  return (
    <div className={className}>
      <div className="grid gap-x-2 gap-y-2 grid-cols-[1fr,1fr] md:grid-cols-[1fr,1fr,1fr,1fr]">
        {images.map((image, imageIndex) => (
          <ImageWallImage
            key={imageIndex}
            image={{ ...image, index: imageIndex }}
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
