'use client'
import { useState } from 'react'
import { GalleryDialog } from './GalleryDialog'
import PageGallery from './Gallery'

type GalleryProps = {
  urls: string[]
}

export default function Gallery({ urls }: GalleryProps) {
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
      <PageGallery urls={urls} onDialogOpen={onOpenDialog} />
      <GalleryDialog
        urls={urls}
        isOpen={isOpen}
        onClose={onClose}
        startIndex={modalStarter}
      />
    </>
  )
}
