import Gallery from '@/components/Gallery'
import TripCalendar from '@/components/TripCalendar'
import TripMap from '@/components/TripMap'
import Container from '@/util/containers'
import { allHighlights, allMarkers } from '@/util/helpers'
import { GalleryImageSource } from '@/util/types'
import { Marker, Post } from 'contentlayer/generated'
import { Highlights } from './Highlights'

export type PostContentProps = React.PropsWithChildren & {
  post: Post
  markers?: Marker[]
  showAllMarkersAlways?: boolean
}
export default function PostContent({
  post,
  markers,
  showAllMarkersAlways = false,
  children,
}: PostContentProps) {
  const sources: GalleryImageSource[] = post?.galleryImages || []
  return (
    <Container.Post>
      <div className="flex justify-center lg:hidden">
        <div className="w-full max-w-[65ch]">
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
        <Container.Highlights>
          <Highlights highlights={allHighlights} />
        </Container.Highlights>
      </Container.Calendar>
    </Container.Post>
  )
}
