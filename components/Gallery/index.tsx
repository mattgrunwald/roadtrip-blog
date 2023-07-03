'use client'
import { useState } from 'react'
import { GalleryDialog } from './GalleryDialog'
import PageGallery from './Gallery'
import { GalleryImageSource } from '@/util/contentlayer-helpers'

type GalleryProps = {
  sources: GalleryImageSource[]
}

export default function Gallery({ sources }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalStarter, setModalStarter] = useState(0)

  const onOpenDialog = (current: number) => {
    setModalStarter(current)
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
    setModalStarter(0)
  }
  return (
    <>
      <PageGallery sources={sources} onDialogOpen={onOpenDialog} />
      <GalleryDialog
        sources={sources}
        isOpen={isOpen}
        onClose={onClose}
        startIndex={modalStarter}
      />
    </>
  )
}
