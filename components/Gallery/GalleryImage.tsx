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
    () => `
    (min-width: 1536px) ${modal ? '100vw' : '700px,'},
    (max-width: 1280px) ${modal ? '100vw' : '500px,'}, 
    (max-width:640px)   ${modal ? '100vw' : '400px'}, 
    (max-width: 400px)  ${modal ? '100vw' : '350px,'}
    `,
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
