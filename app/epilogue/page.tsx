import { getAllMarkers } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import { Image, NewTabLink } from '@/util/mdx'
import PostContent from '@/components/PostContent'
import { DayLink } from '@/components/DayLink'

const notFoundPost = allPosts.find((post) => post.path === 'posts/notfound')

const allMarkers = getAllMarkers(allPosts)

export default function Page() {
  const post =
    allPosts.find((post) => post.path === 'posts/epilogue') || notFoundPost

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
