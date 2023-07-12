import { Dialog } from '@headlessui/react'
import PageGallery from './Gallery'
import { GalleryImageSource } from '@/util/contentlayer-helpers'

export type DialogProps = {
  sources: GalleryImageSource[]
  isOpen: boolean
  startIndex: number
  onClose: () => void
}

const closeIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="dark:text-white sm:w-10 sm:h-10 text-gray-800"
  >
    <g id="Menu / Close_SM">
      <path
        id="Vector"
        d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

export function GalleryDialog({
  isOpen,
  onClose,
  sources,
  startIndex,
}: DialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center p-4 md:h-fill md:w-fill backdrop-blur z-20">
        <div
          onClick={onClose}
          className="absolute top-0 right-0 flex items-start justify-start h-1/6 px-4 opacity-50 cursor-pointer dark:prose-invert max-md:hidden z-30"
        >
          {closeIcon}
        </div>
        <Dialog.Panel className="w-full md:h-full h-[70vh] rounded ">
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
