import { getWallImages } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import ImageWall from '@/components/ImageWall/ImageWall'
import { fitToGrid, sizeImage } from '@/util/imageSizing'

const allImages = getWallImages(allPosts)

const sizedImages = allImages.map((image) => sizeImage(image))
const images = fitToGrid(sizedImages)
const smallImages = fitToGrid(sizedImages, 2)

export default function Page() {
  return (
    <div className="flex justify-center">
      <ImageWall
        images={images}
        className="max-lg:hidden w-full 3xl:w-[calc(600px+650px+320px+12rem)] h-[90vh]"
      />
      <ImageWall
        images={smallImages}
        colCount={2}
        className="lg:hidden w-full h-[90vh]"
      />
    </div>
  )
}
