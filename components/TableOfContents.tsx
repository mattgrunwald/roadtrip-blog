import { AboutPage } from '@/.contentlayer/generated'

export default function TableOfContents({ post }: { post: AboutPage }) {
  return (
    <>
      <div className="text-xs uppercase opacity-50">On this page</div>
      <div className="text-sm opacity-75">
        {post?.headings.map(
          (heading: { text: string; level: number; slug: string }) => {
            return (
              <div
                key={`#${heading.slug}`}
                className={`mb-2 hover:underline  ${
                  heading.level === 2
                    ? 'ml-4'
                    : heading.level === 3
                    ? 'ml-8'
                    : heading.level === 4
                    ? 'ml-12'
                    : heading.level === 5
                    ? 'ml-16'
                    : ''
                }`}
              >
                <a href={`#${heading.slug}`}>{heading.text}</a>
              </div>
            )
          },
        )}
      </div>
    </>
  )
}
