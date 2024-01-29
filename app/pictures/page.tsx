import ImageWall from '@/components/ImageWall/ImageWall'
import { getWallImages } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'

const allImages = getWallImages(allPosts)

export default function Page() {
  return (
    <>
      <div className="max-lg:hidden">
        <ImageWall images={allImages} />
      </div>
      <div className="lg:hidden">
        <ImageWall images={allImages} colCount={2} />
      </div>
    </>
  )
}
