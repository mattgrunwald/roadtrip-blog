import { junieImages } from '@/util/helpers'
import Gallery from './Gallery'

export const JunieGallery = () => (
  <div className="mt-4">
    <Gallery sources={junieImages} />
  </div>
)
