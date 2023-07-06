import { AboutPage, allAboutPages } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Container from 'util/containers'
import Icons from '@/components/Icons'
import { Image } from '@/util/Image'

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

  return (
    <div className="max-w-2xl mx-auto py-4">
      <Container.Text>
        <MDXContent components={{ Icons, Image }} />
      </Container.Text>
    </div>
  )
}
