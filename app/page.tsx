import Gallery from "@/components/Gallery"
import TripCalendar from "@/components/TripCalendar"
import TripMap from "@/components/TripMap"
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from "next-contentlayer/hooks"
import Link from "next/link"

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post._raw.flattenedPath,
  }))
}

const notFoundPost = allPosts.find(post => post._raw.flattenedPath === 'notfound')

export default function Page() {
  const post = allPosts.find((post) => post._raw.flattenedPath === 'home') || notFoundPost

  const start = new Date('2023-05-27')
  const end = new Date('2023-06-26')

  const markers = post?.markers || []
  const urls = post?.carouselImages || []
  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <div className="grid grid-cols-9 gap-8">
      <div className="col-span-3">
        <Gallery urls={urls} />
        <TripMap markers={markers} />
      </div>
      <div className="col-span-4">
        <div className="prose dark:prose-invert">
          <div className="my-2">
            <MDXContent />
          </div>
          <Link href={'/day/1'}>Jump In</Link>
        </div>
      </div>
      <div className="col-span-2">
        <TripCalendar start={start} end={end} day={0} />
      </div>
    </div>
  )
}