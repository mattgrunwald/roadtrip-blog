import { Post } from '@/.contentlayer/generated'
import { MarkerWithDay } from './types'
import { GalleryImageSource } from './contentlayer-helpers'

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

export const getHighlightDays = (posts: Post[]) =>
  new Set(posts.filter((p) => p.highlight).map((p) => p.day))

/**
 * @returns `n` mod `m`
 */
export const mod = (n: number, m: number) => ((n % m) + m) % m

export function getTripDay(date: Date) {
  switch (date.getMonth()) {
    case 4:
      return date.getDate() - 26
    case 5:
      return date.getDate() + 5
    default:
      throw new Error('Failed to calculate trip day')
  }
}
