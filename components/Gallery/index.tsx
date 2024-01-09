'use client'
import { GalleryImageSource } from '@/util/types'
import { useState } from 'react'
import PageGallery from './Gallery'
import { GalleryDialog } from './GalleryDialog'

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
