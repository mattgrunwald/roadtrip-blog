import Image from 'next/image'
import { MouseEventHandler, useMemo } from 'react'

export type GalleryImageProps = {
  src: string
  blurSrc: string
  isCurrent: boolean
  first: boolean
  isCloseToCurrent: boolean
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
  modal = false,
}: GalleryImageProps) => {
  const sizes = useMemo(
    () =>
      modal
        ? '100vh'
        : '(max-width: 400px) 350px, (max-width:640px) 400px, (max-width: 1535px) 500px, 700px',
    [modal],
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
      sizes={sizes}
      onClick={onClick}
      alt=""
      quality={65}
      priority={first}
      placeholder="blur"
      blurDataURL={blurSrc}
    />
  )
}
