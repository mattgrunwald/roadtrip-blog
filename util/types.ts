import { Marker } from '@/.contentlayer/generated'

export type MarkerWithDay = Marker & {
  day: number
}

export type Size = [1, 1] | [2, 1] | [1, 2]
export const sizes: { [k: string]: Size } = {
  NORMAL: [1, 1],
  WIDE: [2, 1],
  TALL: [1, 2],
}

export type GalleryImageSource = {
  src: string
  preview: string
  day: number
  /**
   * height / width
   */
  ratio: number
  size: Size
}

export type Heading = {
  level?: number
  text?: string
  slug?: string
}
