'use client'

import { GalleryImageSource } from '@/util/contentlayer-helpers'
import { useState } from 'react'
import { GalleryDialog } from '../Gallery/GalleryDialog'
import ImageWallImage from './ImageWallImage'

export type AllImagesProps = {
  images: GalleryImageSource[]
  numCols?: number
}

export default function AllImages({ images }: AllImagesProps) {
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
    <>
      <div className="grid gap-x-2 gap-y-2 grid-cols-[1fr,1fr] md:grid-cols-[1fr,1fr,1fr,1fr] w-full 3xl:w-[calc(600px+650px+320px+12rem)] h-[90vh]">
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
    </>
  )
}
