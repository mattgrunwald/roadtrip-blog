'use client'

import { GalleryImageSource } from '@/util/contentlayer-helpers'
import { columnify } from '@/util/helpers'
import { useMemo, useState } from 'react'
import { GalleryDialog } from '../Gallery/GalleryDialog'
import ImageWallColumns from './ImageWallColumns'

export type AllImagesProps = {
  images: GalleryImageSource[]
  numCols?: number
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

  const [wideCols, narrowCols] = useMemo(() => {
    return [columnify(images, numCols), columnify(images, 2)]
  }, [images, numCols])

  return (
    <>
      <div className="flex flex-wrap px-1 py-0 w-full 3xl:w-[calc(600px+650px+320px+12rem)] h-[90vh]">
        <ImageWallColumns
          cols={wideCols}
          className="hidden lg:block lg:flex-[25%] lg:max-w-[25%] px-1 py-0"
          onClick={onOpenDialog}
        />
        <ImageWallColumns
          cols={narrowCols}
          className="flex-[50%] max-w-[50%] lg:hidden px-1 py-0"
          onClick={onOpenDialog}
        />
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
