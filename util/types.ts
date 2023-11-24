import { Marker } from '@/.contentlayer/generated'

export type MarkerWithDay = Marker & {
  day: number
}

export enum Size {
  Normal,
  Wide,
  Tall,
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
