import Icons from '@/components/Icons'
import TableOfContents from '@/components/TableOfContents'
import { Image, NewTabLink } from '@/util/mdx'
import { AboutPage, allAboutPages } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import Container from 'util/containers'

export async function generateStaticParams() {
  return allAboutPages.map((page) => ({
    name: page.path.replaceAll('about/', ''),
  }))
}

export default function Page({ params }: { params: { name: string } }) {
  const post = allAboutPages.find(
    (page: AboutPage) => page.name === params.name,
  )

  if (!post) notFound()

  const MDXContent = useMDXComponent(post?.body.code || '')

  const headings = post?.headings || []

  return (
    <>
      {post?.toc && (
        <Container.TableOfContentsPopover>
          <TableOfContents headings={headings} popover />
        </Container.TableOfContentsPopover>
      )}
      {post?.toc && (
        <Container.TableOfContents>
          <TableOfContents headings={headings} />
        </Container.TableOfContents>
      )}
      <div className="mt-4 flex justify-center lg:col-start-2">
        <Container.AboutText>
          <MDXContent components={{ Icons, Image, a: NewTabLink }} />
        </Container.AboutText>
      </div>
    </>
  )
}
