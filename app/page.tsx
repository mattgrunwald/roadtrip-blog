import Gallery from '@/components/Gallery'
import TripCalendar from '@/components/TripCalendar'
import TripMap from '@/components/TripMap'
import { getAllMarkers } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post._raw.flattenedPath,
  }))
}

const notFoundPost = allPosts.find(
  (post) => post._raw.flattenedPath === 'notfound',
)

const allMarkers = getAllMarkers(allPosts)

export default function Page() {
  const post =
    allPosts.find((post) => post._raw.flattenedPath === 'posts/home') ||
    notFoundPost

  const start = new Date('2023-05-27')
  const end = new Date('2023-06-26')

  const markers = post?.markers || []
  const urls = post?.carouselImages || []
  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <div className="grid lg:grid-cols-9 sm:grid-cols-1 gap-8">
      <div className="md:col-span-3 sm:col-span-1 md:order-first">
        <Gallery urls={urls} />
        <TripMap showAlways allMarkers={allMarkers} />
      </div>
      <div className="md:col-span-4 sm:col-span-1 sm:order-first sm:max-md:flex sm:max-md:justify-center">
        <div className="prose dark:prose-invert">
          <div className="pb-2 mt-9">
            <MDXContent />
          </div>
          <Link href={'/day/1'}>Jump In</Link>
        </div>
      </div>
      <div className="md:col-span-2 sm:col-span-1 sm:ml-16 md:ml-0 mb-6">
        <TripCalendar start={start} end={end} day={0} />
      </div>
    </div>
  )
}
