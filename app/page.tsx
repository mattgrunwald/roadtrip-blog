import { getAllMarkers } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import PostContent from '@/components/PostContent'

const notFoundPost = allPosts.find((post) => post.path === 'posts/notfound')

const allMarkers = getAllMarkers(allPosts)

export default function Page() {
  const post =
    allPosts.find((post) => post.path === 'posts/home') || notFoundPost

  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <PostContent post={post!} allMarkers={allMarkers} showAllMarkersAlways>
      <div className="pb-2 mt-9">
        <MDXContent />
      </div>
      <Link href={'/day/1'}>
        <b>Jump In</b>
      </Link>
    </PostContent>
  )
}
