import Image from 'next/image'

export type GalleryImageProps = {
  src: string
  isCurrent: boolean
  first: boolean
  onMouseOver: () => void
  onMouseOut: () => void
  onClick: () => void
}

export const GalleryImage = ({
  src,
  onMouseOver,
  onMouseOut,
  onClick,
  isCurrent,
  first,
}: GalleryImageProps) => {
  return (
    <Image
      src={src}
      style={{
        objectFit: 'contain',
        height: '100%',
        width: '100%',
        display: isCurrent ? '' : 'none',
      }}
      height={384}
      width={475}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      alt="I'm still working on accessiblity for this site"
      quality={70}
      priority={first}
    />
  )
}
