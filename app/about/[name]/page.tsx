import { AboutPage, allAboutPages } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Container from 'util/containers'
import Icons from '@/components/Icons'
import { Image } from '@/util/Image'
import TableOfContents from '@/components/TableOfContents'

export async function generateStaticParams() {
  return allAboutPages.map((page) => ({
    name: page.path.replaceAll('about/', ''),
  }))
}

export default function Page({ params }: { params: { name: string } }) {
  const post = allAboutPages.find(
    (page: AboutPage) => page.name === params.name,
  )

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
      <div className="lg:col-start-2 mt-4 flex justify-center">
        <Container.AboutText>
          <MDXContent components={{ Icons, Image }} />
        </Container.AboutText>
      </div>
    </>
  )
}
