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
}: GalleryImageProps) => (
  <div>
    <Image
      src={src}
      style={{
        objectFit: 'contain',
        height: '100%',
        width: '100%',
        visibility: isCurrent ? 'visible' : 'hidden',
        cursor: modal ? 'arrow' : 'pointer',
      }}
      fill
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      alt="I'm still working on accessiblity for this site"
      quality={modal ? 50 : 1}
      priority={first}
      placeholder="blur"
      blurDataURL={blurSrc}
      loading="eager"
    />
  </div>
)
