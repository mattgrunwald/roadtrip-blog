import { getWallImages, sizeImage, organize } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import ImageWall from '@/components/ImageWall/ImageWall'

const allImages = getWallImages(allPosts)

const sizedImages = allImages.map((image) => sizeImage(image))
const images = organize(sizedImages)
const smallImages = organize(sizedImages, 2)

export default function Page() {
  return (
    <div className="flex justify-center">
      <ImageWall
        images={images}
        className="hidden lg:block w-full 3xl:w-[calc(600px+650px+320px+12rem)] h-[90vh]"
      />
      <ImageWall images={smallImages} className="lg:hidden w-full h-[90vh]" />
    </div>
  )
}
