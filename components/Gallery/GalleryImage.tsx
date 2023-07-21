import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

export type GalleryImageProps = {
  src: string
  blurSrc: string
  isCurrent: boolean
  first: boolean
  isCloseToCurrent: boolean
  href: string
  modal?: boolean
  onMouseOver: () => void
  onMouseOut: () => void
}

export const GalleryImage = ({
  src,
  blurSrc,
  onMouseOver,
  onMouseOut,
  isCurrent,
  isCloseToCurrent,
  first,
  href,
  modal = false,
}: GalleryImageProps) => {
  const sizes = `(min-width: 1536px) ${
    modal ? '100vw' : '700px,'
  }, (max-width: 1280px) ${modal ? '100vw' : '500px,'}, (max-width:640px) ${
    modal ? '100vw' : '400px'
  }, (max-width: 400px) ${modal ? '100vw' : '350px,'}`

  return (
    <Link href={href}>
      <Image
        src={src}
        className={`object-contain ${
          isCurrent || isCloseToCurrent ? 'block' : 'hidden'
        } 
        ${isCurrent ? 'visible' : 'invisible'}
        ${modal ? 'cursor-auto' : 'cursor-zoom-in'}
      `}
        fill
        sizes={sizes}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        alt="I'm still working on accessiblity for this site"
        quality={65}
        priority={first}
        placeholder="blur"
        blurDataURL={blurSrc}
      />
    </Link>
  )
}
