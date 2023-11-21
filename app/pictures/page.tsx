import { getWallImages, sizeImage, organize } from '@/util/helpers'
import { allPosts } from 'contentlayer/generated'
import ImageWall from '@/components/ImageWall/ImageWall'

const allImages = getWallImages(allPosts)

const images = organize(allImages.map((image) => sizeImage(image)))

export default function Page() {
  return (
    <div className="flex justify-center">
      <ImageWall images={images} />
    </div>
  )
}
