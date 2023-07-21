import { allPosts } from '@/.contentlayer/generated'
import GalleryDialog from '@/components/Gallery/GalleryDialog'
import { GalleryImageSource } from '@/util/contentlayer-helpers'
import { useMemo } from 'react'

export async function generateStaticParams() {
  return allPosts.flatMap((post) =>
    post.galleryImages.flatMap((image: any, index: number) => ({
      _day: post.path.replaceAll('posts/', ''),
      index: index.toString(),
    })),
  )
}

export default function Page({
  params,
}: {
  params: { _day: string | number; index: string | number }
}) {
  const post = useMemo(
    () => allPosts.find((post) => post.path === `posts/${params._day}`),
    [params],
  )
  const sources: GalleryImageSource[] = useMemo(
    () => post?.galleryImages || [],
    [post],
  )
  return <GalleryDialog sources={sources} startIndex={Number(params.index)} />
}
