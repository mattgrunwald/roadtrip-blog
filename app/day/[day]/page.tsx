import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'


export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post._raw.flattenedPath,
  }))
}

const notFoundPost = allPosts.find(post => post._raw.flattenedPath === 'notfound')

export default function Page({ params }: { params: { day: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.day) || notFoundPost

  const previousDay = Number(params.day) - 1
  const nextDay = Number(params.day) + 1
  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <div className="py-6 prose dark:prose-invert">
      <div className="flex flex-row justify-between">
        <div className="w-14">
          {previousDay >= 1 && <Link href={`/day/${previousDay}`}>Day {previousDay}</Link>}
        </div>
        <div className="w-14">
          {nextDay <= 30 && <Link href={`/day/${nextDay}`}>Day {nextDay}</Link>}
        </div>
      </div>
      <MDXContent />
    </div>
  )
}