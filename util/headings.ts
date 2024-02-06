import { AboutPage } from '@/.contentlayer/generated'
import GithubSlugger from 'github-slugger'

export async function generateHeadings(doc: AboutPage) {
  const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
  // rehypeSlug plugin for contentlayer uses GithubSlugger under the hood,
  // so the generated slugs here will match the contentlayer generated slugs
  const slugger = new GithubSlugger()
  const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
    ({ groups }) => {
      const flag = groups?.flag
      const content = groups?.content
      return {
        level: flag?.length,
        text: content,
        slug: content ? slugger.slug(content) : undefined,
      }
    },
  )
  return headings
}
