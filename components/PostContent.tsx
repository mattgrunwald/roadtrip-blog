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
      <Container.VisImages>
        <Gallery sources={sources} />
      </Container.VisImages>
      <Container.Entry>{children}</Container.Entry>
      <Container.VisMap>
        <TripMap
          showAllMarkersAlways={showAllMarkersAlways}
          allMarkers={allMarkers}
          markers={markers}
        />
      </Container.VisMap>
      <Container.Calendar>
        <TripCalendar day={post.day} />
      </Container.Calendar>
    </Container.Post>
  )
}
