import { DayLink } from '@/components/DayLink'
import PostContent from '@/components/PostContent'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { notFound } from 'next/navigation'

export default function Page() {
  const post = allPosts.find((post) => post.path === 'posts/home')
  if (!post) notFound()
  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <PostContent post={post!} showAllMarkersAlways>
      <div className="mt-9 pb-2">
        <MDXContent />
      </div>
      <DayLink day={1}>
        <b>Jump In</b>
      </DayLink>
    </PostContent>
  )
}
