import Image from 'next/image'

export type GalleryImageProps = {
  src: string
  blurSrc: string
  isCurrent: boolean
  first: boolean
  isCloseToCurrent: boolean
  modal?: boolean
  onClick: (e: any) => void
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
  const sizes = `(min-width: 1536px) ${
    modal ? '100vw' : '700px,'
  }, (max-width: 1280px) ${modal ? '100vw' : '500px,'}, (max-width:640px) ${
    modal ? '100vw' : '400px'
  }, (max-width: 400px) ${modal ? '100vw' : '350px,'}`
  return (
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
      onClick={onClick}
      alt="I'm still working on accessiblity for this site"
      quality={65}
      priority={first}
      placeholder="blur"
      blurDataURL={blurSrc}
    />
  )
}
