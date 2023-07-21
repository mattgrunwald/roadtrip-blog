import { allPosts } from 'contentlayer/generated'
import { useMemo } from 'react'
import { GalleryImageSource } from '@/util/contentlayer-helpers'
import Image from 'next/image'

export default function Layout({
  params,
}: {
  params: {
    _day: string | number
    index: string | number
  }
}) {
  const post = useMemo(
    () => allPosts.find((post) => post.path === `posts/${params._day}`),
    [params._day],
  )

  const sources: GalleryImageSource[] = useMemo(
    () => post?.galleryImages || [],
    [post],
  )

  return (
    <div className=" fixed inset-0 flex items-center justify-center m-4 lg:h-fill lg:w-fill bg-black z-20">
      <Image
        src={sources[Number(params.index)].src}
        fill
        className="object-contain"
        sizes="(max-width: 400px) 100vh"
        alt=""
      />
    </div>
  )
}
