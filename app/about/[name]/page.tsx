import { AboutPage, allAboutPages } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { notFound } from 'next/navigation'
import { use } from 'react'

import {
  ContentlayerIcon,
  GithubIcon,
  LinkIcon,
  NextJsIcon,
  TailwindIcon,
  VercelIcon,
} from '@/components/Icons'
import { ContentLink, Image } from '@/components/mdx'
import TableOfContents from '@/components/TableOfContents'
import Container from '@/util/containers'

export async function generateStaticParams() {
  return allAboutPages.map((page) => ({
    name: page.path.replaceAll('about/', ''),
  }))
}

export default function Page(props: { params: Promise<{ name: string }> }) {
  const params = use(props.params)
  const post = allAboutPages.find(
    (page: AboutPage) => page.name === params.name,
  )

  if (!post) notFound()

  const renderMdx = useMDXComponent(post?.body.code || '')

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
          {renderMdx({
            components: {
              GithubIcon,
              TailwindIcon,
              NextJsIcon,
              ContentlayerIcon,
              VercelIcon,
              LinkIcon,
              Image,
              a: ContentLink,
            },
          })}
        </Container.AboutText>
      </div>
    </>
  )
}
