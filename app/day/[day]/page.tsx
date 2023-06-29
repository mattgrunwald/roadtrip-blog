import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post._raw.flattenedPath.replaceAll('posts/', ''),
  }))
}

const notFoundPost = allPosts.find(
  (post) => post._raw.flattenedPath === 'posts/notfound',
)

export default function Page({ params }: { params: { day: string } }) {
  const post =
    allPosts.find(
      (post) =>
        post._raw.flattenedPath ===
        `posts/${params.day.replaceAll('posts%2F', '')}`,
    ) || notFoundPost

  const previousDay = Number(params.day) - 1
  const nextDay = Number(params.day) + 1
  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <div className="prose dark:prose-invert">
      <div className="flex flex-row justify-between pb-2">
        <div className="w-14">
          {previousDay >= 1 && (
            <Link href={`/day/${previousDay}`}>Day {previousDay}</Link>
          )}
        </div>
        <div className="w-14">
          {nextDay <= 30 && <Link href={`/day/${nextDay}`}>Day {nextDay}</Link>}
        </div>
      </div>
      <MDXContent />
    </div>
  )
}
