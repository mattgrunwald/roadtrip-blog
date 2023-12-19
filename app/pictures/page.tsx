import { getWallImages } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import ImageWall from '@/components/ImageWall/ImageWall'

const allImages = getWallImages(allPosts)

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="w-full 3xl:w-[calc(600px+650px+320px+12rem)] h-[90vh]">
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
