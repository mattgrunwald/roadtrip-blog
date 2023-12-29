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
  const sizeSet = useMemo(
    () =>
      modal
        ? `(max-width: 400px) 400px, (max-width:640px) 500px, ${
            size === Size.Wide ? '100vw' : '100vh'
          }`
        : '(max-width: 400px) 350px, (max-width:640px) 400px, (max-width: 1024px) 50%, (max-width: 1535px) 500px, 580px',
    [modal, size],
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
      quality: 65,
      priority: first,
    }),
    [first, sizeSet],
  )

  return (
    <>
      <Image
        src={src}
        className={`
          z-10
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
            blur-lg
            opacity-75
          ${isCurrent ? 'block' : 'hidden'}
        `}
          alt="blurred image background"
          {...sharedProps}
        />
      )}
    </>
  )
}
