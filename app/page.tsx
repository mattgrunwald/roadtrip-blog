import { getAllMarkers } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import PostContent from '@/components/PostContent'
import { DayLink } from '@/components/DayLink'

const notFoundPost = allPosts.find((post) => post.path === 'posts/notfound')

const allMarkers = getAllMarkers(allPosts)

export default function Page() {
  const post =
    allPosts.find((post) => post.path === 'posts/home') || notFoundPost

  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <PostContent post={post!} allMarkers={allMarkers} showAllMarkersAlways>
      <div className="mt-9 pb-2">
        <MDXContent />
      </div>
      <DayLink day={1}>
        <b>Jump In</b>
      </DayLink>
    </PostContent>
  )
}
