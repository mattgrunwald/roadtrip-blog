import { allPosts } from '@/.contentlayer/generated'
import { GalleryDialog } from '@/components/Gallery/GalleryDialog'
import { GalleryImageSource } from '@/util/contentlayer-helpers'
import { useMemo } from 'react'

export async function generateStaticParams() {
  return allPosts.flatMap((post) =>
    post.galleryImages.flatMap((image: any, index: number) => ({
      day: post.path.replaceAll('posts/', ''),
      index: index,
    })),
  )
}

export default function Page({
  params,
}: {
  params: { day: string; index: string }
}) {
  const post = useMemo(
    () => allPosts.find((post) => post.path === `posts/${params.day}`),
    [params],
  )
  const sources: GalleryImageSource[] = useMemo(
    () => post?.galleryImages || [],
    [post],
  )
  return <GalleryDialog sources={sources} startIndex={Number(params.index)} />
  // return <div>hello</div>
}
