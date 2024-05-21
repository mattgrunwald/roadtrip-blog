import { DayLink } from '@/components/DayLink'
import PostContent from '@/components/PostContent'
import { ContentLink, Image } from '@/components/mdx'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post.path.replaceAll('posts/', ''),
  }))
}

export default function Page({ params }: { params: { day: string } }) {
  const post = allPosts.find((post) => post.path === `posts/${params.day}`)

  if (!post) notFound()

  const day = Number(params.day)
  const previousDay = day - 1
  const nextDay = day + 1
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
