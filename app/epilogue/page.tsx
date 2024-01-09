import { DayLink } from '@/components/DayLink'
import PostContent from '@/components/PostContent'
import { getAllMarkers } from '@/util/helpers'
import { Image, NewTabLink } from '@/util/mdx'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'

const allMarkers = getAllMarkers(allPosts)

export default function Page() {
  const post = allPosts.find((post) => post.path === 'posts/epilogue')

  if (!post) notFound()

  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <PostContent post={post!} allMarkers={allMarkers} showAllMarkersAlways>
      <div className="flex flex-row justify-between pb-2">
        <div className="w-18">
          <DayLink day={30}>Day {30}</DayLink>
        </div>
      </div>
      <MDXContent components={{ Image, a: NewTabLink }} />
    </PostContent>
  )
}
