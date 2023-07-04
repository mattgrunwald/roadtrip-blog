import Image from 'next/image'

export type GalleryImageProps = {
  src: string
  blurSrc: string
  isCurrent: boolean
  first: boolean
  modal?: boolean
  onMouseOver: () => void
  onMouseOut: () => void
  onClick: (e: any) => void
}

export const GalleryImage = ({
  src,
  blurSrc,
  onMouseOver,
  onMouseOut,
  onClick,
  isCurrent,
  first,
  modal = false,
}: GalleryImageProps) => {
  const sizes = `(max-width: 1792px) ${modal ? '100vw' : '600px'}`
  return (
    <Image
      src={src}
      style={{
        objectFit: 'contain',
        visibility: isCurrent ? 'visible' : 'collapse',
        cursor: modal ? 'arrow' : 'pointer',
      }}
      fill
      sizes={sizes}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      alt="I'm still working on accessiblity for this site"
      quality={65}
      priority={first}
      placeholder="blur"
      blurDataURL={blurSrc}
    />
  )
}
