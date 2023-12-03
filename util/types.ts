import { Marker } from '@/.contentlayer/generated'

export type MarkerWithDay = Marker & {
  day: number
}

export enum Size {
  Normal,
  Wide,
  Tall,
}

type WallPosition = [1, 1] | [1, 2] | [2, 1]

export const sizes: { [k in Size]: WallPosition } = {
  [Size.Normal]: [1, 1],
  [Size.Tall]: [1, 2],
  [Size.Wide]: [2, 1],
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
  rowSpan: number
  colSpan: number
  alt: string
}

export type Heading = {
  level?: number
  text?: string
  slug?: string
}
