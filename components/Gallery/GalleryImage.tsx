import Image from 'next/image'

export type GalleryImageProps = {
  src: string
  isCurrent: boolean
  first: boolean
  modal?: boolean
  onMouseOver: () => void
  onMouseOut: () => void
  onClick: (e: any) => void
}

export const GalleryImage = ({
  src,
  onMouseOver,
  onMouseOut,
  onClick,
  isCurrent,
  first,
  modal = false,
}: GalleryImageProps) => {
  return (
    <div>
      <Image
        src={src}
        style={{
          objectFit: 'contain',
          height: '100%',
          width: '100%',
          display: isCurrent ? '' : 'none',
          cursor: modal ? 'arrow' : 'pointer',
        }}
        height={modal ? undefined : 384}
        width={modal ? undefined : 475}
        fill={modal}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
        alt="I'm still working on accessiblity for this site"
        quality={70}
        priority={first}
      />
    </div>
  )
}
