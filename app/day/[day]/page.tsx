import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import { useMemo } from 'react'
import Container from 'util/containers'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post.path.replaceAll('posts/', ''),
  }))
}

const notFoundPost = allPosts.find((post) => post.path === 'posts/notfound')

export default function Page({ params }: { params: { day: string } }) {
  const post = useMemo(
    () =>
      allPosts.find((post) => post.path === `posts/${params.day}`) ||
      notFoundPost,
    [params.day],
  )
  const day = useMemo(() => Number(params.day), [params.day])

  const previousDay = useMemo(() => day - 1, [day])
  const nextDay = useMemo(() => day + 1, [day])
  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <Container.Text>
      <div className="flex flex-row justify-between pb-2">
        <div>
          {previousDay >= 1 && (
            <Link href={`/day/${previousDay}`}>Day {previousDay}</Link>
          )}
        </div>
        <div>
          {nextDay <= 30 && <Link href={`/day/${nextDay}`}>Day {nextDay}</Link>}
          {day === 30 && <Link href={'/epilogue'}>Epilogue</Link>}
        </div>
      </div>
      <MDXContent />
    </Container.Text>
  )
}
