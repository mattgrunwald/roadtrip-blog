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
        ? '(max-width: 400px) 400px, (max-width:640px) 500px, 100vh'
        : '(max-width: 400px) 350px, (max-width:640px) 400px, (max-width: 1024px) 50%, (max-width: 1535px) 500px, 600px',
    [modal],
  )
  return (
    <Image
      src={src}
      className={`
      object-contain 
      ${isCurrent || isCloseToCurrent ? 'block' : 'hidden'} 
      ${isCurrent ? 'visible' : 'invisible'}
      ${!modal && 'bg-slate-100'}
      ${!modal && 'dark:bg-slate-900/50'}
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
