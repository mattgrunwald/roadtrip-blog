import { getWallImages } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import ImageWall from '@/components/ImageWall/ImageWall'

const allImages = getWallImages(allPosts)

export default function Page() {
  return (
    <div className="flex justify-center">
      <ImageWall images={allImages} />
    </div>
  )
}
