import { allDefaultPages } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

export default function Page() {
  const post = allDefaultPages.find(
    (page: any) => page._raw.flattenedPath === 'other/about',
  )
  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="prose dark:prose-invert">
        <MDXContent />
      </div>
    </div>
  )
}
