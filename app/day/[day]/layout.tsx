import Gallery from "@/components/Gallery"
import TripCalendar from "@/components/TripCalendar"
import TripMap from "@/components/TripMap"
import { allPosts, Marker } from 'contentlayer/generated'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    day: post._raw.flattenedPath,
  }))
}

const notFoundPost = allPosts.find(post => post._raw.flattenedPath === 'notfound')

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
  // const coordinates: any = {}
  // allPosts.forEach(post => {
  //   if (post.markers && post.markers.length > 0) {
  //     post.markers.forEach(marker => {
  //       const name = marker.name || 'butt'
  //       coordinates[name] = marker.coordinates
  //     })
  //   }
  // })
  // console.log(Object.values(coordinates).map(coordinates => {
  //   return {
  //     markerOffset: 0,
  //     coordinates
  //   } as Marker
  // }));

  const markers = post?.markers || []
  const urls = post?.carouselImages || []
  return (
    <div className="grid grid-cols-9 gap-8">
      <div className="col-span-3">
        <Gallery urls={urls} />
        <TripMap markers={markers} />
      </div>
      <div className="col-span-4">
        {children}
      </div>
      <div className="col-span-2">
        <TripCalendar start={start} end={end} day={Number(params.day)} />
      </div>
    </div>
  )
}