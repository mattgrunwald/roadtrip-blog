import { Post } from '@/.contentlayer/generated'
import { MarkerWithDay } from './types'

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

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const mod = (n: number, m: number) => ((n % m) + m) % m
