'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { GalleryDialog } from '../Gallery/GalleryDialog'
import ImageWallImage from './ImageWallImage'
import { GalleryImageSource } from '@/util/types'

export type ImageWallProps = {
  wideImages: GalleryImageSource[]
  narrowImages: GalleryImageSource[]
  wideColCount?: number
  narrowColCount?: number
}

export default function ImageWall({
  wideImages,
  narrowImages,
  wideColCount = 4,
  narrowColCount = 2,
}: ImageWallProps) {
  const defaultColWidth = 400
  const wideBreakpoint = 1024

  const [isOpen, setIsOpen] = useState(false)
  const [modalStarter, setModalStarter] = useState(0)
  const [colWidth, setColWidth] = useState(defaultColWidth)
  const [colCount, setColCount] = useState(wideColCount)
  const [isLoaded, setIsLoaded] = useState(false)
  const [images, setImages] = useState(wideImages)

  const container = useRef<HTMLDivElement>(null)

  const updateWidth = (node: HTMLElement) => {
    const width = node.getBoundingClientRect().width
    const newColCount = width >= wideBreakpoint ? wideColCount : narrowColCount
    setColCount(newColCount)
    const newColWidth = width / newColCount
    setColWidth(newColWidth > 0 ? newColWidth : defaultColWidth)
    const newImages = width >= wideBreakpoint ? wideImages : narrowImages
    setImages(newImages)
    console.log(newColCount, newColWidth, width >= wideBreakpoint)
  }
  const grid = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      updateWidth(node)
      setIsLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const resize = () => {
      if (container && container.current) {
        updateWidth(container.current)
      }
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
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
    <>
      <div
        ref={isLoaded ? container : grid}
        className={`grid gap-x-2 gap-y-2 grid-cols-${colCount}`}
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
    </>
  )
}
