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
