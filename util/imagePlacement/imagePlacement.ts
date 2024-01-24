import { GalleryImageSource, Size } from '../types'

enum Spot {
  AVAILABLE = 0,
  TAKEN,
}

type RowContent = GalleryImageSource | Spot
type Row = RowContent[]

/**
 * @returns [numColumns, startColumn]
 */
export function findConsecutiveFreeSpaces(row: Row | undefined, goal: number) {
  if (row === undefined) {
    return null
  }
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
      }
    } else {
      count = 0
    }
  }
  return null
}

function newRow(cols: number): RowContent[] {
  return Array(cols).fill(Spot.AVAILABLE)
}

export function findNormalSpot(rowQueue: Row[], numCols: number) {
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

export function findTallSpot(rowQueue: Row[], numCols: number) {
  // try to find space in two existing rows
  for (let rowIndex = rowQueue.length - 1; rowIndex > 0; rowIndex--) {
    const top = rowQueue[rowIndex]
    const bottom = rowQueue[rowIndex - 1]
    for (const i in top) {
      const colIndex = Number(i)
      if (
        top[colIndex] === Spot.AVAILABLE &&
        bottom[colIndex] === Spot.AVAILABLE
      ) {
        rowQueue[rowIndex - 1][colIndex] = Spot.TAKEN
        return [rowIndex, colIndex]
      }
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

export function findWideSpot(rowQueue: Row[], numCols: number) {
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
      return findNormalSpot(rowQueue, numCols)
    }
    case Size.Tall: {
      return findTallSpot(rowQueue, numCols)
    }
    case Size.Wide: {
      return findWideSpot(rowQueue, numCols)
    }
    default:
      throw new Error(`${size} is not a valid size`)
  }
}

export function fitToGrid(imgs: GalleryImageSource[], numCols: number) {
  if (numCols === 1) {
    return imgs
  }
  const rowQueue: Row[] = [newRow(numCols)]
  const result: Row[] = []

  for (const image of imgs) {
    const [qRow, qCol] = findSpot(rowQueue, image.size, numCols)
    rowQueue[qRow][qCol] = image
    if (
      rowQueue.length > 0 &&
      rowQueue[rowQueue.length - 1].filter((col) => col === Spot.AVAILABLE)
        .length === 0
    )
      result.push(rowQueue.pop() as Row)
  }
  result.push(...rowQueue.reverse())

  return result
    .flat()
    .filter(
      (item) => item !== Spot.AVAILABLE && item !== Spot.TAKEN,
    ) as GalleryImageSource[]
}
