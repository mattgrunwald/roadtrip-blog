import ImageWall from '@/components/ImageWall/ImageWall'
import { junieImages } from '@/util/helpers'

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="h-[90vh] w-full">
        <div className="max-lg:hidden">
          <ImageWall images={junieImages} />
        </div>
        <div className="lg:hidden">
          <ImageWall images={junieImages} colCount={2} />
        </div>
      </div>
    </div>
  )
}
