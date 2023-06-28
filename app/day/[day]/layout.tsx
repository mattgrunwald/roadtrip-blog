import TripCalendar from "@/components/TripCalendar"
import TripMap from "@/components/TripMap"
import { allPosts } from 'contentlayer/generated'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post._raw.flattenedPath,
  }))
}

const notFoundPost = allPosts.find(post => post._raw.flattenedPath === 'notfound')

const TOTAL_DAYS = 30

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    day: string
  }
}) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.day) || notFoundPost

  const start = new Date('2023-05-27')
  const end = new Date('2023-06-26')

  const markers = post?.markers || []
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <div className="col-span-1">
        <TripCalendar start={start} end={end} />
        <TripMap day={params.day} markers={markers} />
      </div>
      <div className="col-span-2 pl-6">
        {children}
      </div>
    </div>
  )
}