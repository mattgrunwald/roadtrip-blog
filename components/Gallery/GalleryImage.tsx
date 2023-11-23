import { Size, sizes } from '@/util/types'
import Image from 'next/image'
import { MouseEventHandler, useMemo } from 'react'

export type GalleryImageProps = {
  src: string
  blurSrc: string
  isCurrent: boolean
  first: boolean
  isCloseToCurrent: boolean
  size: Size
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
  modal = false,
}: GalleryImageProps) => {
  const sizeSet = useMemo(
    () =>
      modal
        ? `(max-width: 400px) 400px, (max-width:640px) 500px, ${
            size === sizes.WIDE ? '100vw' : '100vh'
          }`
        : '(max-width: 400px) 350px, (max-width:640px) 400px, (max-width: 1024px) 50%, (max-width: 1535px) 500px, 580px',
    [modal, size],
  )
  return (
    <Image
      src={src}
      className={`
      object-contain
      ${isCurrent || isCloseToCurrent ? 'block' : 'hidden'}
      ${isCurrent ? 'visible' : 'invisible'}
      `}
      fill
      sizes={sizeSet}
      onClick={onClick}
      alt=""
      quality={65}
      priority={first}
      placeholder="blur"
      blurDataURL={blurSrc}
    />
  )
}
