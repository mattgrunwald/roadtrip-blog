import { DayLink } from '@/components/DayLink'
import PostContent from '@/components/PostContent'
import { ContentLink, Image } from '@/components/mdx'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'

export default function Page() {
  const post = allPosts.find((post) => post.path === 'posts/epilogue')

  if (!post) notFound()

  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <PostContent post={post!} showAllMarkersAlways>
      <div className="flex flex-row justify-between pb-2">
        <div className="w-18">
          <DayLink day={30}>Day {30}</DayLink>
        </div>
      </div>
      <MDXContent components={{ Image, a: ContentLink }} />
    </PostContent>
  )
}
