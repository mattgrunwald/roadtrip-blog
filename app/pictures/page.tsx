import { getWallImages } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import ImageWall from '@/components/ImageWall/ImageWall'
import { fitToGrid } from '@/util/imagePlacement'

const allImages = getWallImages(allPosts)

const wideImages = fitToGrid(allImages)
const narrowImages = fitToGrid(allImages, 2)

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="w-full 3xl:w-[calc(600px+650px+320px+12rem)] h-[90vh]">
        <ImageWall wideImages={wideImages} narrowImages={narrowImages} />
      </div>
    </div>
  )
}
