import { getWallImages, sizeImage, organize } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import ImageWall from '@/components/ImageWall/ImageWall'

const allImages = getWallImages(allPosts)

const sizedImages = allImages.map((image) => sizeImage(image))
const images = organize(sizedImages)

export default function Page() {
  return (
    <div className="flex justify-center">
      <ImageWall images={images} />
    </div>
  )
}
