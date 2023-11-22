import { Post } from '@/.contentlayer/generated'
import { MarkerWithDay } from './types'
import { GalleryImageSource, Indexed } from './contentlayer-helpers'

export function getAllMarkers(posts: Post[]) {
  const markers: Record<string, MarkerWithDay> = {}
  for (const post of posts) {
    if (!post.markers || post.day === 0) {
      break
    }
    for (const marker of post.markers) {
      if (
        marker.name &&
        (!(marker.name in markers) || post.day < markers[marker.name].day)
      ) {
        markers[marker.name || 'unknown'] = { ...marker, day: post.day }
      }
    }
  }
  return Object.values(markers)
}

export function getWallImages(posts: Post[]): GalleryImageSource[] {
  const pics = []
  for (const post of posts.sort((a, b) => a.day - b.day)) {
    if (post.day > 2 && post.day < 31) {
      pics.push(...post.galleryImages)
    }
  }
  return pics
}

/**
 * @returns `n` mod `m`
 */
export const mod = (n: number, m: number) => ((n % m) + m) % m

export type Size = [1, 1] | [2, 1] | [1, 2]

export const Sizes = {
  NORMAL: [1, 1],
  WIDE: [2, 1],
  TALL: [1, 2],
}

type WallImage = GalleryImageSource & {
  size: Size
}

type RowContent = WallImage | 0 | null

/**
 *
 * @returns [numColumns, startColumn]
 */
export function findConsecutiveFreeSpaces(row: RowContent[], goal: number) {
  let count = 0
  let startingIndex = -1
  for (const [index, item] of row.entries()) {
    if (item === 0) {
      count++
      if (count === 1) {
        startingIndex = index
      }
      if (count === goal) {
        return startingIndex
      } else {
      }
    } else {
      count = 0
    }
  }
  return null
}

export function findTallSpot(top: RowContent[], bottom: RowContent[]) {
  for (const i in top) {
    const index = Number(i)
    if (top[index] === 0 && bottom[index] === 0) {
      return index
    }
  }
  return null
}

function newRow(cols: number): RowContent[] {
  return Array(cols).fill(0)
}

/**
 * @returns `[row, column]` of next available spot of that size
 */
export function findSpot(
  rowQueue: RowContent[][],
  size: Size,
  numRows: number,
) {
  switch (size) {
    case Sizes.NORMAL:
      // find a spot in one existing row
      for (let rowIndex = rowQueue.length - 1; rowIndex >= 0; rowIndex--) {
        const column = findConsecutiveFreeSpaces(rowQueue[rowIndex], 1)
        if (column !== null) {
          return [rowIndex, column]
        }
      }
      // all rows full, add to start of new row
      rowQueue.unshift(newRow(numRows))
      return [0, 0]
    case Sizes.TALL: {
      // try to find space in two existing rows
      for (let rowIndex = rowQueue.length - 1; rowIndex > 0; rowIndex--) {
        const colIndex = findTallSpot(
          rowQueue[rowIndex],
          rowQueue[rowIndex - 1],
        )
        if (colIndex !== null) {
          rowQueue[rowIndex - 1][colIndex] = null
          return [rowIndex, colIndex]
        }
      }
      // need at least one new row
      const column = findConsecutiveFreeSpaces(rowQueue[0], 1)
      if (column !== null) {
        rowQueue.unshift(newRow(numRows))
        rowQueue[0][column] = null
        return [1, column]
      } else {
        // need two new rows
        rowQueue.unshift(newRow(numRows), newRow(numRows))
        rowQueue[0][0] = null
        return [1, 0]
      }
    }
    case Sizes.WIDE: {
      // try to find two spaces in existing rows
      for (let rowIndex = rowQueue.length - 1; rowIndex >= 0; rowIndex--) {
        const startingColumn = findConsecutiveFreeSpaces(rowQueue[rowIndex], 2)
        if (startingColumn !== null) {
          rowQueue[rowIndex][startingColumn + 1] = null
          return [rowIndex, startingColumn]
        }
      }
      // add to new row
      rowQueue.unshift(newRow(numRows))
      rowQueue[0][1] = null
      return [0, 0]
    }
    default:
      throw new Error('Not a size')
  }
}

export function organize(imgs: WallImage[], numRows = 4) {
  const result: WallImage[] = []
  const rowQueue: RowContent[][] = [newRow(numRows)]

  for (const image of imgs) {
    const [qRow, qCol] = findSpot(rowQueue, image.size, numRows)
    rowQueue[qRow][qCol] = image
  }
  result.push(
    ...(rowQueue
      .reverse()
      .flat()
      .filter((item) => item !== 0 && item !== null) as WallImage[]),
  )
  return result
}

export function sizeImage(image: GalleryImageSource): WallImage {
  let size
  if (image.ratio > 1) {
    size = Sizes.TALL
  } else if (image.ratio < 0.5) {
    size = Sizes.WIDE
  } else {
    size = Sizes.NORMAL
  }
  return { ...image, size: size as Size }
}
