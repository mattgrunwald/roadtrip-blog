import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { notFound } from 'next/navigation'

import { DayLink } from '@/components/DayLink'
import PostContent from '@/components/PostContent'

export default function Page() {
  const post = allPosts.find((post) => post.path === 'posts/home')
  if (!post) notFound()
  const renderMdx = useMDXComponent(post?.body.code || '')

  return (
    <PostContent post={post!} showAllMarkersAlways>
      <div className="mt-9 pb-2">{renderMdx({})}</div>
      <DayLink day={1}>
        <b>Jump In</b>
      </DayLink>
    </PostContent>
  )
}
