import { GalleryImageSource, Size } from './types'

enum Spot {
  AVAILABLE = 0,
  TAKEN,
}

type RowContent = GalleryImageSource | Spot

/**
 * @returns [numColumns, startColumn]
 */
export function findConsecutiveFreeSpaces(row: RowContent[], goal: number) {
  let count = 0
  let startingIndex = -1
  for (const [index, item] of row.entries()) {
    if (item === Spot.AVAILABLE) {
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
    if (top[index] === Spot.AVAILABLE && bottom[index] === Spot.AVAILABLE) {
      return index
    }
  }
  return null
}

function newRow(cols: number): RowContent[] {
  return Array(cols).fill(Spot.AVAILABLE)
}

/**
 * @returns `[row, column]` of next available spot of that size
 */
export function findSpot(
  rowQueue: RowContent[][],
  size: Size,
  numCols: number,
) {
  switch (size) {
    case Size.Normal: {
      // find a spot in one existing row
      for (let rowIndex = rowQueue.length - 1; rowIndex >= 0; rowIndex--) {
        const column = findConsecutiveFreeSpaces(rowQueue[rowIndex], 1)
        if (column !== null) {
          return [rowIndex, column]
        }
      }
      // all rows full, add to start of new row
      rowQueue.unshift(newRow(numCols))
      return [0, 0]
    }
    case Size.Tall: {
      // try to find space in two existing rows
      for (let rowIndex = rowQueue.length - 1; rowIndex > 0; rowIndex--) {
        const colIndex = findTallSpot(
          rowQueue[rowIndex],
          rowQueue[rowIndex - 1],
        )
        if (colIndex !== null) {
          rowQueue[rowIndex - 1][colIndex] = Spot.TAKEN
          return [rowIndex, colIndex]
        }
      }
      // need at least one new row
      const column = findConsecutiveFreeSpaces(rowQueue[0], 1)
      if (column !== null) {
        rowQueue.unshift(newRow(numCols))
        rowQueue[0][column] = Spot.TAKEN
        return [1, column]
      }
      // need two new rows
      rowQueue.unshift(newRow(numCols), newRow(numCols))
      rowQueue[0][0] = Spot.TAKEN
      return [1, 0]
    }
    case Size.Wide: {
      // try to find two spaces in existing rows
      for (let rowIndex = rowQueue.length - 1; rowIndex >= 0; rowIndex--) {
        const startingColumn = findConsecutiveFreeSpaces(rowQueue[rowIndex], 2)
        if (startingColumn !== null) {
          rowQueue[rowIndex][startingColumn + 1] = Spot.TAKEN
          return [rowIndex, startingColumn]
        }
      }
      // add to new row
      rowQueue.unshift(newRow(numCols))
      rowQueue[0][1] = Spot.TAKEN
      return [0, 0]
    }
    default:
      throw new Error(`${size} is not a valid size`)
  }
}

export function fitToGrid(imgs: GalleryImageSource[], numCols: number) {
  const rowQueue: RowContent[][] = [newRow(numCols)]

  for (const image of imgs) {
    const [qRow, qCol] = findSpot(rowQueue, image.size, numCols)
    rowQueue[qRow][qCol] = image
  }

  return rowQueue
    .reverse()
    .flat()
    .filter(
      (item) => item !== Spot.AVAILABLE && item !== Spot.TAKEN,
    ) as GalleryImageSource[]
}