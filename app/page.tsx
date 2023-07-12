import Gallery from '@/components/Gallery'
import TripCalendar from '@/components/TripCalendar'
import TripMap from '@/components/TripMap'
import { GalleryImageSource } from '@/util/contentlayer-helpers'
import { getAllMarkers } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import { useMemo } from 'react'
import Container from 'util/containers'

const notFoundPost = allPosts.find((post) => post.path === 'posts/notfound')

const allMarkers = getAllMarkers(allPosts)

export default function Page() {
  const post =
    allPosts.find((post) => post.path === 'posts/home') || notFoundPost

  const sources: GalleryImageSource[] = useMemo(
    () => post?.galleryImages || [],
    [post],
  )
  const MDXContent = useMDXComponent(post?.body.code || '')

  return (
    <Container.Post>
      <Container.Visual>
        <Gallery sources={sources} />
        <TripMap showAllMarkersAlways allMarkers={allMarkers} />
      </Container.Visual>
      <div className="sm:col-span-1 sm:max-md:flex sm:max-md:justify-center">
        <Container.Text>
          <div className="pb-2 mt-9">
            <MDXContent />
          </div>
          <Link href={'/day/1'}>
            <b>Jump In</b>
          </Link>
        </Container.Text>
      </div>
      <Container.Calendar>
        <TripCalendar day={0} />
      </Container.Calendar>
    </Container.Post>
  )
}
