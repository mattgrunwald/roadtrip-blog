import { Post, allPosts } from '@/.contentlayer/generated'
import { GalleryImageSource, MarkerWithDay } from './types'

function getAllMarkers(posts: Post[]) {
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

export const allMarkers = getAllMarkers(allPosts)
export const allPostsSorted = allPosts.sort((a, b) => a.day - b.day)

export function getWallImages(posts: Post[]): GalleryImageSource[] {
  const pics = []
  for (const post of posts.sort((a, b) => a.day - b.day)) {
    if (post.day > 2 && post.day < 31) {
      pics.push(post.galleryImages)
    }
  }
  return pics.flat()
}

/**
 * @returns `n` mod `m`
 */
export const mod = (n: number, m: number) => ((n % m) + m) % m

export const junieImages = allPostsSorted
  .filter((p) => p.day > 1 && p.day < 31)
  .map((p) =>
    (p.galleryImages as GalleryImageSource[]).filter((img) =>
      /junie/.test(img.alt),
    ),
  )
  .flat()
