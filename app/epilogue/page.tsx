import { getAllMarkers } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import { Image } from '@/util/Image'
import PostContent from '@/components/PostContent'

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
          <Link href={'/day/30'} aria-label="Go to previous day">
            Day 30
          </Link>
        </div>
      </div>
      <MDXContent components={{ Image }} />
    </PostContent>
  )
}
