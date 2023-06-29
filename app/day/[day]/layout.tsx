import Gallery from '@/components/Gallery'
import TripCalendar from '@/components/TripCalendar'
import TripMap from '@/components/TripMap'
import { allPosts } from 'contentlayer/generated'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post._raw.flattenedPath.replaceAll('posts/', ''),
  }))
}

const notFoundPost = allPosts.find(
  (post) => post._raw.flattenedPath === 'posts/notfound',
)

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    day: string
  }
}) {
  const post =
    allPosts.find(
      (post) =>
        post._raw.flattenedPath ===
        `posts/${params.day.replaceAll('posts%2F', '')}`,
    ) || notFoundPost
  const start = new Date('2023-05-27')
  const end = new Date('2023-06-26')

  const markers = post?.markers || []
  const urls = post?.carouselImages || []
  return (
    <div className="grid md:grid-cols-9 sm:grid-cols-1 gap-8">
      <div className="md:col-span-4 sm:col-span-1 sm:max-md:order-first sm:max-md:flex sm:justify-center">
        {children}
      </div>
      <div className="md:col-span-3 sm:col-span-1 md:order-first">
        <Gallery urls={urls} />
        <TripMap markers={markers} />
      </div>
      <div className="md:col-span-2 sm:col-span-1 sm:ml-16 md:ml-0 mb-6">
        <TripCalendar start={start} end={end} day={Number(params.day)} />
      </div>
    </div>
  )
}
