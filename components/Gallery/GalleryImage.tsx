import { IMAGE_QUALITY } from '@/util/consts'
import { Size } from '@/util/types'
import Image from 'next/image'
import { MouseEventHandler, useMemo } from 'react'

export type GalleryImageProps = {
  src: string
  blurSrc: string
  isCurrent: boolean
  first: boolean
  isCloseToCurrent: boolean
  size: Size
  alt: string
  modal?: boolean
  onClick: MouseEventHandler
}

export const GalleryImage = ({
  src,
  blurSrc,
  onClick,
  isCurrent,
  isCloseToCurrent,
  first,
  size,
  alt,
  modal = false,
}: GalleryImageProps) => {
  const uniqueModalSize = useMemo(() => {
    switch (size) {
      case Size.Tall:
        return '(max-width: 2600px) 40vw, (max-width: 4100px) 33vw, 25vw'
      case Size.Wide:
        return '100vw'
      default:
        return '(max-width: 2600px) 80vw, (max-width: 4100px) 66vw, 50vw'
    }
  }, [size])

  const sizeSet = useMemo(
    () =>
      modal
        ? `(max-width: 400px) 400px, (max-width: 640px) 500px, ${uniqueModalSize}`
        : '(max-width: 400px) 350px, (max-width: 640px) 400px, (max-width: 1024px) 50%, (max-width: 1535px) 500px, 580px',
    [modal, uniqueModalSize],
  )

  const objectFit = useMemo(
    () =>
      !modal && size === Size.Normal
        ? 'object-contain max-md:object-cover xl:object-cover'
        : 'object-contain',
    [modal, size],
  )

  const sharedProps = useMemo(
    () => ({
      fill: true,
      sizes: sizeSet,
      quality: modal ? 100 : IMAGE_QUALITY,
      priority: first,
    }),
    [first, sizeSet, modal],
  )

  return (
    <>
      <Image
        src={src}
        className={`
          z-10
          my-0
          ${objectFit}
          ${isCurrent || isCloseToCurrent ? 'block' : 'hidden'}
          ${isCurrent ? 'visible' : 'invisible'}
          translate-x-0
          translate-y-0
          transform-gpu
        `}
        {...sharedProps}
        alt={alt}
        onClick={onClick}
        placeholder="blur"
        blurDataURL={blurSrc}
      />

      {!modal && (
        <Image
          src={src}
          className={`
            object-cover
            opacity-75
            blur-lg
          ${isCurrent ? 'block' : 'hidden'}
        `}
          alt="blurred image background"
          {...sharedProps}
        />
      )}
    </>
  )
}
