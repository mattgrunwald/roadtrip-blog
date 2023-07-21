import Gallery from '@/components/Gallery'
import PageGallery from '@/components/Gallery/Gallery'
import TripCalendar from '@/components/TripCalendar'
import TripMap from '@/components/TripMap'
import { getAllMarkers } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import Container from '@/util/containers'
import { useMemo } from 'react'
import { GalleryImageSource } from '@/util/contentlayer-helpers'

const notFoundPost = allPosts.find((post) => post.path === 'posts/notfound')

const allMarkers = getAllMarkers(allPosts)

export default function Layout({
  params,
  gallery,
  text,
}: {
  children: React.ReactNode
  params: {
    day: string
  }
  gallery: React.ReactNode
  text: React.ReactNode
}) {
  const post = useMemo(
    () =>
      allPosts.find((post) => post.path === `posts/${params.day}`) ||
      notFoundPost,
    [params.day],
  )

  const markers = useMemo(() => post?.markers || [], [post])
  const sources: GalleryImageSource[] = useMemo(
    () => post?.galleryImages || [],
    [post],
  )

  return (
    <>
      <Container.Post>
        <div className="sm:col-span-1 sm:max-lg:order-first sm:max-lg:flex sm:justify-center">
          {text}
        </div>
        <Container.Visual>
          {/* <Gallery sources={sources} /> */}
          <PageGallery sources={sources} prefix={`${params.day}`} />
          <TripMap markers={markers} allMarkers={allMarkers} />
        </Container.Visual>
        <Container.Calendar>
          <TripCalendar day={Number(params.day)} />
        </Container.Calendar>
      </Container.Post>
      {gallery}
    </>
  )
}
