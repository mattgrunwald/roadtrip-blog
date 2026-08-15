import { allPosts } from 'contentlayer/generated'

import ImageWall from '@/components/ImageWall/ImageWall'
import { getWallImages } from '@/util/helpers'

const allImages = getWallImages(allPosts)

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="h-[90vh] w-full">
        <div className="max-lg:hidden">
          <ImageWall images={allImages} />
        </div>
        <div className="lg:hidden">
          <ImageWall images={allImages} colCount={2} />
        </div>
      </div>
    </div>
  )
}
