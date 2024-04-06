import { DayLink } from '@/components/DayLink'
import PostContent from '@/components/PostContent'
import { ContentLink, Image } from '@/components/mdx'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useMemo } from 'react'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post.path.replaceAll('posts/', ''),
  }))
}

export default function Page({ params }: { params: { day: string } }) {
  const post = useMemo(
    () => allPosts.find((post) => post.path === `posts/${params.day}`),
    [params.day],
  )

  if (!post) notFound()

  const day = useMemo(() => Number(params.day), [params.day])
  const previousDay = useMemo(() => day - 1, [day])
  const nextDay = useMemo(() => day + 1, [day])
  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <PostContent post={post!} markers={post?.markers}>
      <div className="flex flex-row justify-between pb-2">
        <div>
          {previousDay >= 1 && (
            <DayLink day={previousDay}>Day {previousDay}</DayLink>
          )}
        </div>
        <div>
          {nextDay <= 30 && <DayLink day={nextDay}>Day {nextDay}</DayLink>}
          {day === 30 && (
            <Link href={'/epilogue'} aria-label="Go to epilogue">
              Epilogue
            </Link>
          )}
        </div>
      </div>
      <MDXContent components={{ Image, a: ContentLink }} />
    </PostContent>
  )
}
