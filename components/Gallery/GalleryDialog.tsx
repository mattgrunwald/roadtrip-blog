import { GalleryImageSource } from '@/util/types'
import { Dialog } from '@headlessui/react'
import Gallery from './Gallery'

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
      <div className="lg:h-fill lg:w-fill fixed inset-0 z-30 flex items-center justify-center p-4 backdrop-blur">
        <Dialog.Panel className="h-5/6 w-full lg:h-full">
          <Gallery
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
