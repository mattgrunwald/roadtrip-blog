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

/**
 * Maps a list into `numCols` sublists which when used as a matrix has a
 * transpose can be read in original order.
 *
 * Example:
 * `columnify([1...10], 3) -> [[1,4,7,10], [2,5,8], [3,6,9]]`
 */
export function columnify<T>(data: T[], numCols: number): Indexed<T>[][] {
  const cols = Array(numCols)
    .fill([])
    .map((_) => [] as Indexed<T>[])
  let index = 0
  for (const [totalIndex, item] of data.entries()) {
    cols[index].push({ ...item, index: totalIndex })
    index = mod(index + 1, numCols)
  }
  return cols
}

// 4 cols.
// pics are either 1 row 2 col, 2 row 1 col, or 1 row 1 col
// represent this as [col, row]
// goal is array of rows of [1,1,1,1]
// start with [0,0,0,0]
// while slots are available, take in the next image
// if an image is [1,1], add it to the next available row slot (have queue of rows) on deck
// if an image is [2,1] (wide), add it to current row if possible, else make it start next row
// if an image is [1,2] (tall), add it to same col in next row
// for all queued rows, fill them

type NORMAL = [1, 1]
type WIDE = [2, 1]
type TALL = [1, 2]

type Size = NORMAL | WIDE | TALL

const Sizes = {
  NORMAL: [1, 1],
  WIDE: [2, 1],
  TALL: [1, 2],
}
type Img = GalleryImageSource & {
  size: Size
}

type RowContent = Img | 0 | null

function mostConsecutiveFreeSpaces(row: RowContent[]) {
  let count = 0
  let mcfsIndex = -1
  row.forEach((item, index) => {
    if (item === 0) {
      count++
      if (count === 1) {
        mcfsIndex = index
      }
    } else {
      count = count === 0 ? 0 : count - 1
    }
  })
  return [count, mcfsIndex]
}

function findTallSpot(top: RowContent[], bottom: RowContent[]) {
  for (const i in top) {
    const index = Number(i)
    if (top[index] === 0 && bottom[index] === 0) {
      return index
    }
  }
  return null
}

export function organize(imgs: Img[], numRows = 4) {
  // const images = imgs.map((img) => ({ ...img, available: true }))
  const result: Img[] = []
  const rowQueue: RowContent[][] = []
  // while (images.filter((image) => image.available).length > 0) {
  //   const availableImages = images.filter((image) => image.available).length > 0
  //   const row = rowQueue.length > 0 ? rowQueue[0] : [0, 0, 0, 0]
  // }
  let currentRow: RowContent[] = [0, 0, 0, 0]

  function findSpot(size: Size) {
    // returns [row, column of next available spot of that size]
    const empty = rowQueue.length === 0
    switch (size) {
      case Sizes.NORMAL:
        // if (empty) {
        //   rowQueue.push([0, 0, 0, 0])
        //   return [0, 0]
        // }
        for (let i = rowQueue.length - 1; i >= 0; i--) {
          const [_, column] = mostConsecutiveFreeSpaces(rowQueue[i])
          if (column != -1) {
            return [i, column]
          }
        }
      case Sizes.TALL: {
        // if (empty) {
        //   rowQueue.push([0, 0, 0, 0], [0, 0, 0, 0])
        //   return [1, 0]
        // }
        for (let rowIndex = rowQueue.length - 1; rowIndex >= 1; rowIndex--) {
          const colIndex = findTallSpot(
            rowQueue[rowIndex],
            rowQueue[rowIndex - 1],
          )
          if (colIndex !== null) {
            return [rowIndex, colIndex]
          } else {
            const [_, lastRowFreeIndex] = mostConsecutiveFreeSpaces(rowQueue[0])
            if (lastRowFreeIndex !== -1) {
              rowQueue.push([0, 0, 0, 0])
              return [1, lastRowFreeIndex]
            } else {
              rowQueue.push([0, 0, 0, 0], [0, 0, 0, 0])
              return [1, 0]
            }
          }
        }
      }
      case Sizes.WIDE: {
        // if (empty) {
        //   rowQueue.push([0, 0, 0, 0])
        //   return [0, 0]
        // }
        for (let rowIndex = rowQueue.length - 1; rowIndex >= 1; rowIndex--) {
          const [spots, colIndex] = mostConsecutiveFreeSpaces(
            rowQueue[rowIndex],
          )
          if (spots > 1) {
            return [rowIndex, colIndex]
          }
        }
        rowQueue.push([0, 0, 0, 0])
        return [0, 0]
      }
      default:
        throw new Error('Not a size')
    }
  }

  for (const image of imgs) {
    if (currentRow.filter((item) => item !== 0).length === 0) {
      // console.log('got here at beginning')
      result.push(
        ...(currentRow.filter((item) => item !== 0 && item !== null) as Img[]),
      )
      currentRow = (
        rowQueue.length === 0 ? [0, 0, 0, 0] : rowQueue.pop()
      ) as RowContent[]
    }
    const [numFree, freeIndex] = mostConsecutiveFreeSpaces(currentRow)
    // image fits on current row
    if (numFree >= Number(image.size[0])) {
      currentRow[freeIndex] = image
      switch (image.size) {
        case Sizes.WIDE:
          currentRow[freeIndex + 1] = null
          break
        case Sizes.TALL:
          // add to next row in queue
          if (rowQueue.length === 0) {
            rowQueue.push([0, 0, 0, 0])
          }
          // check if this is actually free
          if (rowQueue[0][freeIndex] !== 0) {
            console.log('you done goofed')
          }
          rowQueue[rowQueue.length - 1][freeIndex] = null
          break
      }
    } else {
      // add to new row
      if (rowQueue.length === 0) {
        rowQueue.push([0, 0, 0, 0])
        rowQueue[0][freeIndex] = image
        if (image.size === Sizes.TALL) {
          rowQueue.push([0, 0, 0, 0])
          rowQueue[0][freeIndex] = null
        } else if (image.size === Sizes.WIDE) {
          rowQueue[0][1] = null
        }
      } else {
        const [qRow, qCol] = findSpot(image.size)
        rowQueue[qRow][qCol] = image
      }
    }
    // result.push(
    //   ...(currentRow.filter((item) => item !== 0 && item !== null) as Img[]),
    // )
    // currentRow = (
    //   rowQueue.length === 0 ? [0, 0, 0, 0] : rowQueue.pop()
    // ) as RowContent[]
  }

  console.log(rowQueue.length)

  result.push(
    ...(rowQueue.flat().filter((item) => item !== 0 && item !== null) as Img[]),
  )

  console.log(imgs.length, result.length)
  return result
}

export function sizeImage(image: GalleryImageSource): Img {
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
