import Gallery from '@/components/Gallery'
import TripCalendar from '@/components/TripCalendar'
import TripMap from '@/components/TripMap/TripMap'
import { Marker, Post } from 'contentlayer/generated'
import Container from '@/util/containers'
import { useMemo } from 'react'
import { GalleryImageSource, MarkerWithDay } from '@/util/types'

export type PostContentProps = React.PropsWithChildren & {
  post: Post
  allMarkers: MarkerWithDay[]
  markers?: Marker[]
  showAllMarkersAlways?: boolean
}
export default function PostContent({
  post,
  allMarkers,
  markers,
  showAllMarkersAlways = false,
  children,
}: PostContentProps) {
  const sources: GalleryImageSource[] = useMemo(
    () => post?.galleryImages || [],
    [post],
  )

  return (
    <Container.Post>
      <div className="flex justify-center lg:hidden">
        <div className=" block w-[700px] h-full">
          <Gallery sources={sources} />
        </div>
      </div>
      <Container.Entry>{children}</Container.Entry>
      <Container.Visual>
        <div className="max-lg:hidden">
          <Gallery sources={sources} />
        </div>
        <TripMap
          showAllMarkersAlways={showAllMarkersAlways}
          allMarkers={allMarkers}
          markers={markers}
        />
      </Container.Visual>
      <Container.Calendar>
        <TripCalendar day={post.day} />
      </Container.Calendar>
    </Container.Post>
  )
}
