'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { GalleryDialog } from '../Gallery/GalleryDialog'
import ImageWallImage from './ImageWallImage'
import { GalleryImageSource } from '@/util/types'

export type ImageWallProps = {
  images: GalleryImageSource[]
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
  const defaultColWidth = 400
  const [colWidth, setColWidth] = useState(defaultColWidth)

  const container = useRef<HTMLDivElement>(null)
  const grid = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const newColWidth = node.getBoundingClientRect().width / colCount
      setColWidth(newColWidth > 0 ? newColWidth : defaultColWidth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const resize = () => {
      if (container && container.current) {
        const newColWidth =
          container.current.getBoundingClientRect().width / colCount
        setColWidth(newColWidth > 0 ? newColWidth : defaultColWidth)
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
    <div ref={container} className={className}>
      <div
        ref={grid}
        className="grid gap-x-2 gap-y-2 grid-cols-[1fr,1fr] lg:grid-cols-[1fr,1fr,1fr,1fr]"
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
