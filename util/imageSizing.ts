import { GalleryImageSource } from './contentlayer-helpers'

export type Size = [1, 1] | [2, 1] | [1, 2]
export type Sizes = { [k: string]: Size }

export const sizes: Sizes = {
  NORMAL: [1, 1],
  WIDE: [2, 1],
  TALL: [1, 2],
}

export type SizedImage = GalleryImageSource & {
  size: Size
}

type RowContent = SizedImage | 0 | null

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
    case sizes.NORMAL:
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
    case sizes.TALL: {
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
    case sizes.WIDE: {
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

export function fitToGrid(imgs: SizedImage[], numRows = 4) {
  const result: SizedImage[] = []
  const rowQueue: RowContent[][] = [newRow(numRows)]

  for (const image of imgs) {
    const [qRow, qCol] = findSpot(rowQueue, image.size, numRows)
    rowQueue[qRow][qCol] = image
  }
  result.push(
    ...(rowQueue
      .reverse()
      .flat()
      .filter((item) => item !== 0 && item !== null) as SizedImage[]),
  )
  return result
}

export function sizeImage(image: GalleryImageSource): SizedImage {
  let size
  if (image.ratio > 1) {
    size = sizes.TALL
  } else if (image.ratio < 0.5) {
    size = sizes.WIDE
  } else {
    size = sizes.NORMAL
  }
  return { ...image, size: size as Size }
}
