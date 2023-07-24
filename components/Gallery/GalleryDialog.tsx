import { Dialog } from '@headlessui/react'
import PageGallery from './Gallery'
import { GalleryImageSource } from '@/util/contentlayer-helpers'

export type DialogProps = {
  sources: GalleryImageSource[]
  isOpen: boolean
  startIndex: number
  onClose: () => void
}

export function GalleryDialog({
  isOpen,
  onClose,
  sources,
  startIndex,
}: DialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center p-4 lg:h-fill lg:w-fill backdrop-blur z-20">
        <Dialog.Panel className="w-full lg:h-full h-[max(70vh,350px)] rounded ">
          <PageGallery
            sources={sources}
            startIndex={startIndex}
            onClose={onClose}
            modal
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
