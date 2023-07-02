import Gallery from '@/components/Gallery'
import TripCalendar from '@/components/TripCalendar'
import TripMap from '@/components/TripMap'
import { getAllMarkers } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import Container from '@/util/containers'
import { useMemo } from 'react'
import { START_DATE, END_DATE } from '@/util/consts'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post._raw.flattenedPath.replaceAll('posts/', ''),
  }))
}

const notFoundPost = allPosts.find(
  (post) => post._raw.flattenedPath === 'posts/notfound',
)

const allMarkers = getAllMarkers(allPosts)

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    day: string
  }
}) {
  const post = useMemo(
    () =>
      allPosts.find(
        (post) =>
          post._raw.flattenedPath ===
          `posts/${params.day.replaceAll('posts%2F', '')}`,
      ) || notFoundPost,
    [params.day],
  )

  const markers = useMemo(() => post?.markers || [], [post])
  const urls = useMemo(() => post?.carouselImages || [], [post])
  return (
    <Container.Post>
      <div className="md:col-span-4 sm:col-span-1 sm:max-md:order-first sm:max-md:flex sm:justify-center">
        {children}
      </div>
      <Container.Visual>
        <Gallery urls={urls} />
        <TripMap markers={markers} allMarkers={allMarkers} />
      </Container.Visual>
      <Container.Calendar>
        <TripCalendar
          start={START_DATE}
          end={END_DATE}
          day={Number(params.day)}
        />
      </Container.Calendar>
    </Container.Post>
  )
}
