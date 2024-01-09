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
      <div className="fixed inset-0 flex items-center justify-center p-4 lg:h-fill lg:w-fill backdrop-blur z-30">
        <Dialog.Panel className="w-full lg:h-full h-5/6">
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
