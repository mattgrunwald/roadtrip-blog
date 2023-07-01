import { Dialog } from '@headlessui/react'
import PageGallery, { closeIcon } from './Gallery'

export type DialogProps = {
  urls: string[]
  isOpen: boolean
  startIndex: number
  onClose: () => void
}

export function GalleryDialog({
  isOpen,
  onClose,
  urls,
  startIndex,
}: DialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div
        onClick={onClose}
        className="fixed inset-0 flex items-center justify-center p-4 md:h-fill md:w-fill backdrop-blur"
      >
        <Dialog.Panel className="w-full h-full rounded ">
          <div
            onClick={onClose}
            className="absolute top-0 right-0 flex items-start justify-start h-full px-4 opacity-50 cursor-pointer dark:prose-invert z-20"
          >
            {closeIcon}
          </div>
          <PageGallery urls={urls} startIndex={startIndex} modal />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
