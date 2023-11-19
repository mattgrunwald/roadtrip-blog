import { IndexedGalleryImageSource } from '@/util/contentlayer-helpers'
import ImageWallImage from './ImageWallImage'
import { useCallback, useState } from 'react'

export type ImageWallColumnsProps = {
  cols: IndexedGalleryImageSource[][]
  className: string
  onClick: (current: number) => void
}

export default function ImageWallColumns({
  cols,
  className,
  onClick,
}: ImageWallColumnsProps) {
  const defaultColWidth = 300
  const [colWidth, setColWidth] = useState(defaultColWidth)

  const colDiv = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const newColWidth = node.getBoundingClientRect().width - 8
      setColWidth(newColWidth > 0 ? newColWidth : defaultColWidth)
    }
  }, [])

  return cols.map((col, colIndex) => (
    <div
      key={colIndex}
      ref={colIndex === 0 ? colDiv : undefined}
      className={className}
    >
      {col.map((image, imageIndex) => (
        <ImageWallImage
          key={imageIndex}
          image={image}
          width={colWidth}
          onClick={() => onClick(image.index)}
        />
      ))}
    </div>
  ))
}
